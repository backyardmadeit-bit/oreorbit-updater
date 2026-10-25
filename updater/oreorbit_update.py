#!/usr/bin/env python3
"""
OreOrbit free updater.

Fetches the atlas's live feeds from free public sources and sends them to the website's update.php,
in the same formats the page already reads. Runs on GitHub Actions on a schedule, so it needs no
Claude plan at all.

Safety rules:
  * a feed that fails, or returns too little, is NOT uploaded: the website keeps its last good file,
    and the data health panel shows its age;
  * every file is first read back from the website, and fields this script does not produce are kept;
  * files that did not change are not sent again.

Environment:
  ATLAS_BASE      the atlas address, default https://bohemiadefense.com/atlas/
  ATLAS_KEY       the update key whose SHA-256 is in update-config.php (without it: dry run)
  FIRMS_MAP_KEY   NASA FIRMS key (heat at the plants)          optional
  FRED_API_KEY    FRED key (prices)                            optional
  AISSTREAM_KEY   AISStream.io key (ships near chokepoints)    optional
  FORCE=1         refresh every feed now, ignoring its interval
  ONLY=a,b        run only these feeds
  DRY_RUN=1       fetch and write to ./out/ but upload nothing
"""
import asyncio
import csv
import datetime as dt
import hashlib
import io
import json
import math
import os
import sys
import time
import traceback
import urllib.error
import urllib.parse
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
CFG = json.load(open(os.path.join(HERE, "config.json"), encoding="utf-8"))
BASE = (os.environ.get("ATLAS_BASE") or "https://bohemiadefense.com/atlas/").rstrip("/") + "/"
KEY = os.environ.get("ATLAS_KEY", "").strip()
DRY = os.environ.get("DRY_RUN") == "1" or not KEY
FORCE = os.environ.get("FORCE") == "1"
ONLY = {x.strip() for x in os.environ.get("ONLY", "").split(",") if x.strip()}
UA = "OreOrbit-updater/1.0 (+https://bohemiadefense.com/atlas)"
NOW = dt.datetime.now(dt.timezone.utc).replace(microsecond=0)
TODAY = NOW.date()


def iso(t=None):
    return (t or NOW).strftime("%Y-%m-%dT%H:%M:%SZ")


def parse_iso(s):
    try:
        return dt.datetime.strptime(str(s)[:19], "%Y-%m-%dT%H:%M:%S").replace(tzinfo=dt.timezone.utc)
    except Exception:
        return None


def log(*a):
    print(*a, flush=True)


# ---------------------------------------------------------------- HTTP

def http(url, data=None, headers=None, timeout=60, method=None):
    h = {"User-Agent": UA, "Accept": "*/*"}
    h.update(headers or {})
    if isinstance(data, (dict, list)):
        data = json.dumps(data).encode("utf-8")
        h.setdefault("Content-Type", "application/json")
    req = urllib.request.Request(url, data=data, headers=h, method=method)
    last = None
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=timeout) as r:
                return r.read()
        except urllib.error.HTTPError as e:
            last = e
            if e.code in (429, 500, 502, 503, 504) and attempt < 2:
                time.sleep(6 * (attempt + 1))
                continue
            raise
        except (urllib.error.URLError, TimeoutError, ConnectionError) as e:
            last = e
            if attempt < 2:
                time.sleep(6 * (attempt + 1))
                continue
            raise
    raise last


def jget(url, **kw):
    return json.loads(http(url, **kw).decode("utf-8"))


def km(lat1, lng1, lat2, lng2):
    p = math.pi / 180
    a = math.sin((lat2 - lat1) * p / 2) ** 2 + math.cos(lat1 * p) * math.cos(lat2 * p) * math.sin((lng2 - lng1) * p / 2) ** 2
    return 12742 * math.asin(min(1, math.sqrt(a)))


# ---------------------------------------------------------------- the website

REMOTE = {}


def remote_listing():
    """What update.php already has (names and md5), so unchanged files are not re-sent."""
    global REMOTE
    if DRY:
        return
    try:
        j = json.loads(http(BASE + "update.php", headers={"X-Atlas-Key": KEY}, timeout=60).decode("utf-8"))
        REMOTE = j.get("files", {}) if j.get("ok") else {}
        if j.get("pruned"):
            log("server removed old files:", ", ".join(j["pruned"]))
    except urllib.error.HTTPError as e:
        if e.code == 403:
            sys.exit("update.php refused the key (403). Check the ATLAS_KEY secret against update-config.php.")
        log("could not read the file list:", e)


def current(path):
    """The file as the website serves it now, or None."""
    try:
        return json.loads(http(BASE + path + "?u=" + str(int(time.time())), timeout=30).decode("utf-8"))
    except Exception:
        return None


def upload(path, obj):
    body = json.dumps(obj, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
    if DRY:
        out = os.path.join(os.getcwd(), "out", path)
        os.makedirs(os.path.dirname(out), exist_ok=True)
        open(out, "wb").write(body)
        return "dry run: written to out/" + path
    md5 = hashlib.md5(body).hexdigest()
    if REMOTE.get(path, {}).get("md5") == md5:
        return "unchanged"
    r = json.loads(http(BASE + "update.php?f=" + urllib.parse.quote(path, safe="/"), data=body,
                        headers={"X-Atlas-Key": KEY, "Content-Type": "application/json"}, method="POST", timeout=120).decode("utf-8"))
    if not r.get("ok"):
        raise RuntimeError("update.php: " + str(r))
    return "uploaded %d kB" % (len(body) // 1024)


# ---------------------------------------------------------------- feeds

def feed_orbits(prev):
    old = {s.get("norad"): s for s in (prev or {}).get("sats", []) if isinstance(s, dict)}
    sats, fresh = [], 0
    for s in CFG["sats"]:
        try:
            lines = [l.strip() for l in http("https://celestrak.org/NORAD/elements/gp.php?CATNR=%d&FORMAT=TLE" % s["norad"]).decode().splitlines() if l.strip()]
            l1 = next(l for l in lines if l.startswith("1 "))
            l2 = next(l for l in lines if l.startswith("2 "))
            sats.append({"id": s["id"], "l1": l1, "l2": l2, "name": s["name"], "norad": s["norad"]})
            fresh += 1
        except Exception as e:
            log("  orbit %s: %s" % (s["name"], e))
            if s["norad"] in old:
                sats.append(old[s["norad"]])
        time.sleep(1)
    if fresh < max(1, len(CFG["sats"]) // 2):
        raise RuntimeError("only %d of %d orbits fetched" % (fresh, len(CFG["sats"])))
    return {"fetchedAt": iso(), "sats": sats, "source": "CelesTrak"}, "ok (%d of %d)" % (fresh, len(CFG["sats"]))


GDACS_TYPES = {"EQ", "TC", "FL", "VO", "DR", "WF"}


GDACS_NS = {"gdacs": "http://www.gdacs.org", "geo": "http://www.w3.org/2003/01/geo/wgs84_pos#"}


def why(e):
    """A short reason for the log, with the start of the server's answer when there is one."""
    if isinstance(e, urllib.error.HTTPError):
        try:
            body = e.read()[:160].decode("utf-8", "replace").replace("\n", " ").strip()
        except Exception:
            body = ""
        return "HTTP %s%s" % (e.code, (": " + body) if body else "")
    return str(e)[:160]


def gdacs_from_features(gd, since):
    alerts, seen = [], set()
    for f in (gd or {}).get("features", []):
        p, c = f.get("properties") or {}, (f.get("geometry") or {}).get("coordinates") or []
        t, lvl = str(p.get("eventtype", "")).upper(), str(p.get("alertlevel", "")).lower()
        if t not in GDACS_TYPES or lvl not in ("orange", "red") or len(c) < 2 or not isinstance(c[0], (int, float)):
            continue
        if str(p.get("todate") or p.get("fromdate") or "")[:10] < since or (t, p.get("eventid")) in seen:
            continue
        seen.add((t, p.get("eventid")))
        sev = p.get("severitydata") or {}
        url = (p.get("url") or {}).get("report") if isinstance(p.get("url"), dict) else p.get("url")
        alerts.append({"id": "%s%s" % (t, p.get("eventid")), "type": t, "lat": round(c[1], 4), "lng": round(c[0], 4),
                       "from": p.get("fromdate"), "to": p.get("todate"), "name": p.get("name") or p.get("eventname") or "",
                       "country": p.get("country") or "", "level": lvl, "severity": sev.get("severitytext") or "",
                       "url": url if isinstance(url, str) and url.startswith("https://") else None})
    return alerts


def gdacs_from_rss(xml_bytes, since):
    import xml.etree.ElementTree as ET
    from email.utils import parsedate_to_datetime
    def when(txt):
        try:
            return parsedate_to_datetime(txt).astimezone(dt.timezone.utc).strftime("%Y-%m-%dT%H:%M:%S")
        except Exception:
            return None
    alerts, seen = [], set()
    for it in ET.fromstring(xml_bytes).iter("item"):
        g = lambda tag: (it.findtext(tag, default="", namespaces=GDACS_NS) or "").strip()
        t, lvl, eid = g("gdacs:eventtype").upper(), g("gdacs:alertlevel").lower(), g("gdacs:eventid")
        try:
            lat, lng = float(g("geo:Point/geo:lat")), float(g("geo:Point/geo:long"))
        except ValueError:
            continue
        frm, to = when(g("gdacs:fromdate")), when(g("gdacs:todate"))
        if t not in GDACS_TYPES or lvl not in ("orange", "red") or (t, eid) in seen or str(to or frm or "")[:10] < since:
            continue
        seen.add((t, eid))
        link = (it.findtext("link") or "").strip()
        alerts.append({"id": "%s%s" % (t, eid), "type": t, "lat": round(lat, 4), "lng": round(lng, 4), "from": frm, "to": to,
                       "name": g("gdacs:eventname") or (it.findtext("title") or "").strip(), "country": g("gdacs:country"),
                       "level": lvl, "severity": g("gdacs:severity"), "url": link if link.startswith("https://") else None})
    return alerts


def gdacs_alerts(since):
    """Tries GDACS's addresses in turn; returns (alerts, which one answered)."""
    q = "eventlist=EQ;TC;FL;VO;DR;WF&fromdate=%s&todate=%s&alertlevel=orange;red" % (since, TODAY.isoformat())
    tries = [
        ("search", "https://www.gdacs.org/gdacsapi/api/events/geteventlist/SEARCH?" + q),
        ("search2", "https://www.gdacs.org/gdacsapi/api/events/geteventlist/SEARCH?" + q.replace(";", "%3B")),
        ("app", "https://www.gdacs.org/gdacsapi/api/events/geteventlist/events4app"),
    ]
    errors = []
    for name, url in tries:
        try:
            raw = http(url, headers={"Accept": "application/json"}, timeout=90).decode("utf-8", "replace").strip()
            return gdacs_from_features(json.loads(raw) if raw else {"features": []}, since), name
        except Exception as e:
            errors.append("%s %s" % (name, why(e)))
    try:
        return gdacs_from_rss(http("https://www.gdacs.org/xml/rss.xml", timeout=90), since), "rss"
    except Exception as e:
        errors.append("rss " + why(e))
    raise RuntimeError("; ".join(errors))


def feed_hazards(prev):
    prev = prev or {}
    g = jget("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson")
    quakes = []
    for f in g.get("features", []):
        p, c = f.get("properties") or {}, (f.get("geometry") or {}).get("coordinates") or []
        if not isinstance(p.get("mag"), (int, float)) or p["mag"] < 5 or len(c) < 2:
            continue
        quakes.append({"alert": p.get("alert") or "green", "depth": round(c[2]) if len(c) > 2 and c[2] is not None else None,
                       "id": f.get("id"), "lat": round(c[1], 4), "lng": round(c[0], 4), "mag": round(p["mag"], 1),
                       "place": p.get("place") or "", "t": p.get("time"), "tsunami": p.get("tsunami") or 0, "url": p.get("url")})
    quakes.sort(key=lambda q: -(q["t"] or 0))
    out = dict(prev)
    out.update({"fetchedAt": iso(), "quakes": quakes[:150], "sources": ["USGS", "GDACS"]})
    note = "ok (%d quakes M5+)" % len(quakes)
    try:
        alerts, how = gdacs_alerts((TODAY - dt.timedelta(days=10)).isoformat())
        out["alerts"] = alerts
        out["gdacsAt"] = iso()
        note += ", %d GDACS alerts (%s)" % (len(alerts), how)
    except Exception as e:
        note += ", GDACS kept from last run (%s)" % str(e)[:400]
    return out, note


def feed_scenes(prev):
    prev = prev or {}
    sites = dict((prev.get("sites") or {}))
    start = (NOW - dt.timedelta(days=40)).strftime("%Y-%m-%dT%H:%M:%SZ")
    done = 0
    for s in CFG["sites"]:
        try:
            body = {"collections": ["sentinel-2-l2a"], "intersects": {"type": "Point", "coordinates": [s["lng"], s["lat"]]},
                    "datetime": start + "/" + iso(), "limit": 60,
                    "fields": {"include": ["properties.datetime", "properties.eo:cloud_cover", "properties.platform"], "exclude": ["assets", "links"]}}
            j = jget("https://earth-search.aws.element84.com/v1/search", data=body, timeout=90)
            items = []
            for f in j.get("features", []):
                p = f.get("properties") or {}
                if p.get("datetime"):
                    items.append((p["datetime"], p.get("eo:cloud_cover"), p.get("platform")))
            if not items:
                continue
            items.sort(reverse=True)
            d, cc, plat = items[0]
            clear = next((x[0][:10] for x in items if isinstance(x[1], (int, float)) and x[1] <= 20), None)
            rec = {"date": d[:16] + "Z", "cloud": round(cc) if isinstance(cc, (int, float)) else None,
                   "n40": len({x[0][:10] for x in items}), "platform": plat}
            if clear:
                rec["clearDate"] = clear
            elif sites.get(s["id"], {}).get("clearDate"):
                rec["clearDate"] = sites[s["id"]]["clearDate"]
            sites[s["id"]] = rec
            done += 1
        except Exception as e:
            log("  scenes %s: %s" % (s["id"], str(e)[:120]))
        time.sleep(0.5)
    if done < len(CFG["sites"]) // 3:
        raise RuntimeError("only %d sites answered" % done)
    return {"fetchedAt": iso(), "sites": sites}, "ok (%d sites)" % done


def feed_hotspots(prev, hist):
    key = os.environ.get("FIRMS_MAP_KEY", "").strip()
    if not key:
        return None, "skipped: no FIRMS_MAP_KEY"
    prev = prev or {}
    radius = CFG.get("hotspotRadiusKm", 6)
    sites = dict(prev.get("sites") or {})
    sources = ["VIIRS_SNPP_NRT", "VIIRS_NOAA20_NRT", "VIIRS_NOAA21_NRT"]
    calls_ok, fetched_days = 0, set()
    per_site = {}
    for s in CFG["sites"]:
        d = 0.12 / max(0.2, math.cos(s["lat"] * math.pi / 180))
        area = "%.3f,%.3f,%.3f,%.3f" % (s["lng"] - d, s["lat"] - 0.12, s["lng"] + d, s["lat"] + 0.12)
        days = {}
        ok_any = False
        for src in sources:
            try:
                txt = http("https://firms.modaps.eosdis.nasa.gov/api/area/csv/%s/%s/%s/2" % (key, src, area), timeout=60).decode("utf-8", "replace")
                if txt.lstrip().lower().startswith(("invalid", "error")):
                    raise RuntimeError(txt[:80])
                ok_any = True
                for row in csv.DictReader(io.StringIO(txt)):
                    try:
                        la, lo = float(row["latitude"]), float(row["longitude"])
                    except Exception:
                        continue
                    if km(s["lat"], s["lng"], la, lo) > radius:
                        continue
                    day = row.get("acq_date", "")[:10]
                    rec = days.setdefault(day, {"n": 0, "frp": 0.0})
                    rec["n"] += 1
                    try:
                        rec["frp"] += float(row.get("frp") or 0)
                    except ValueError:
                        pass
            except Exception as e:
                log("  FIRMS %s %s: %s" % (s["id"], src, str(e)[:100]))
            time.sleep(0.3)
        if not ok_any:
            continue
        calls_ok += 1
        per_site[s["id"]] = days
    if calls_ok < len(CFG["sites"]) // 2:
        raise RuntimeError("FIRMS answered for only %d sites" % calls_ok)
    covered = [(TODAY - dt.timedelta(days=i)).isoformat() for i in range(2)]
    for sid, days in per_site.items():
        rec = dict(sites.get(sid) or {})
        by = dict(rec.get("byDay") or {})
        for day in covered:
            v = days.get(day)
            by[day] = {"frp": round(v["frp"], 1), "n": v["n"]} if v else {"frp": 0, "n": 0}
            fetched_days.add(day)
        cut = (TODAY - dt.timedelta(days=34)).isoformat()
        by = {k: by[k] for k in sorted(by) if k >= cut}
        hot = lambda v: (v.get("n") or v.get("px") or 0) > 0
        d7, d30 = (TODAY - dt.timedelta(days=6)).isoformat(), (TODAY - dt.timedelta(days=29)).isoformat()
        rec["byDay"] = by
        rec["daysHot7"] = sum(1 for k, v in by.items() if k >= d7 and hot(v))
        rec["daysHot30"] = sum(1 for k, v in by.items() if k >= d30 and hot(v))
        rec["last"] = max([k for k, v in by.items() if hot(v)], default=rec.get("last"))
        sites[sid] = rec
        for day in covered:
            v = days.get(day)
            if v and v["n"] > 0:
                hist.setdefault(day, {}).setdefault("hot", {})[sid] = [v["n"], round(v["frp"], 1)]
            elif day in hist and "hot" in hist[day]:
                hist[day]["hot"].pop(sid, None)
    out = dict(prev)
    out.update({"fetchedAt": iso(), "radiusKm": radius, "sites": sites, "source": "NASA FIRMS (VIIRS 375 m, NRT)",
                "url": "https://firms.modaps.eosdis.nasa.gov",
                "note": prev.get("note") or "A detection is a pixel much hotter than its surroundings: a furnace, a flare or a fire."})
    lit = sum(1 for r in sites.values() if r.get("daysHot7"))
    return out, "ok (%d sites, %d hot this week)" % (calls_ok, lit)


def feed_prices(prev):
    key = os.environ.get("FRED_API_KEY", "").strip()
    if not key:
        return None, "skipped: no FRED_API_KEY"
    prev = prev or {}
    items = dict(prev.get("items") or {})
    start = (TODAY.replace(day=1) - dt.timedelta(days=3 * 366)).isoformat()
    done = 0
    for m, f in CFG["fred"].items():
        try:
            q = urllib.parse.urlencode({"series_id": f["series"], "api_key": key, "file_type": "json", "observation_start": start})
            obs = jget("https://api.stlouisfed.org/fred/series/observations?" + q).get("observations", [])
            ser = []
            for o in obs:
                try:
                    v = float(o["value"])
                except (ValueError, KeyError, TypeError):
                    continue
                ser.append([o["date"], round(v) if abs(v) >= 100 else round(v, 2)])
            if not ser:
                continue
            it = dict(items.get(m) or {})
            it.update({"asOf": ser[-1][0], "freq": f.get("freq") or it.get("freq") or "monthly", "price": ser[-1][1], "series": ser[-36:],
                       "source": f.get("source") or "FRED", "unit": f.get("unit") or it.get("unit"), "url": "https://fred.stlouisfed.org/series/" + f["series"]})
            items[m] = it
            done += 1
        except Exception as e:
            log("  FRED %s: %s" % (f["series"], str(e)[:120]))
    if not done:
        raise RuntimeError("no price series fetched")
    out = dict(prev)
    out.update({"fetchedAt": iso(), "items": items, "sources": ["FRED"]})
    return out, "ok (%d series)" % done


PW = "https://services9.arcgis.com/weJ1QsnbMYJlCHdG/arcgis/rest/services/%s/FeatureServer/0/query"


def pw_rows(service, portid, since):
    rows, offset = [], 0
    while True:
        q = urllib.parse.urlencode({"where": "portid='%s' AND date >= DATE '%s'" % (portid, since), "outFields": "*",
                                    "orderByFields": "date", "f": "json", "resultOffset": offset, "resultRecordCount": 2000})
        j = jget(PW % service + "?" + q, timeout=90)
        if j.get("error"):
            raise RuntimeError(str(j["error"])[:120])
        feats = j.get("features") or []
        rows += [f.get("attributes") or {} for f in feats]
        if not feats or not j.get("exceededTransferLimit"):
            return rows
        offset += len(feats)


def pw_day(v):
    if isinstance(v, (int, float)):
        return dt.datetime.fromtimestamp(v / 1000, dt.timezone.utc).date().isoformat()
    return str(v)[:10]


def pw_series(rows, fields):
    """Daily arrays from the first day to the last, gaps filled with 0."""
    by = {}
    for r in rows:
        d = pw_day(r.get("date"))
        by[d] = r
    if not by:
        return None
    days = sorted(by)
    d0, d1 = dt.date.fromisoformat(days[0]), dt.date.fromisoformat(days[-1])
    out = {"d0": days[0], "last": days[-1]}
    for name, keys in fields.items():
        key = next((k for k in keys if k in by[days[-1]]), None)
        if key is None:
            raise RuntimeError("PortWatch field missing: %s" % "/".join(keys))
        arr, d = [], d0
        while d <= d1:
            v = (by.get(d.isoformat()) or {}).get(key)
            arr.append(round(v) if isinstance(v, (int, float)) else 0)
            d += dt.timedelta(days=1)
        out[name] = arr
    return out


def feed_traffic(prev):
    prev = prev or {}
    since = (TODAY - dt.timedelta(days=425)).isoformat()
    cps, ports = dict(prev.get("chokepoints") or {}), dict(prev.get("ports") or {})
    ok = 0
    for k, pid in CFG["portwatch"]["chokepoints"].items():
        try:
            s = pw_series(pw_rows("Daily_Chokepoints_Data", pid, since), {"total": ["n_total"], "bulk": ["n_dry_bulk", "n_bulk"]})
            if s:
                s["id"] = pid
                cps[k] = s
                ok += 1
        except Exception as e:
            log("  PortWatch %s: %s" % (pid, str(e)[:120]))
    for k, p in CFG["portwatch"]["ports"].items():
        try:
            s = pw_series(pw_rows("Daily_Ports_Data", p["id"], since), {"calls": ["portcalls", "portcalls_total"], "export": ["export", "export_total"]})
            if s:
                s.update({"id": p["id"], "name": p["name"]})
                ports[k] = s
                ok += 1
        except Exception as e:
            log("  PortWatch %s: %s" % (p["id"], str(e)[:120]))
    if not ok:
        raise RuntimeError("PortWatch returned nothing usable")
    out = dict(prev)
    out.update({"fetchedAt": iso(), "chokepoints": cps, "ports": ports})
    out.setdefault("source", "IMF PortWatch (IMF, University of Oxford)")
    out.setdefault("url", "https://portwatch.imf.org")
    return out, "ok (%d series)" % ok


def in_box(b, lat, lng):
    (la1, lo1), (la2, lo2) = b["bbox"]
    return min(la1, la2) <= lat <= max(la1, la2) and min(lo1, lo2) <= lng <= max(lo1, lo2)


async def ais_listen(key, seconds):
    import websockets
    boxes = CFG["shipBoxes"]
    sub = {"APIKey": key, "BoundingBoxes": [b["bbox"] for b in boxes], "FilterMessageTypes": ["PositionReport", "ShipStaticData"]}
    pos, static = {}, {}
    end = time.time() + seconds
    async with websockets.connect("wss://stream.aisstream.io/v0/stream", open_timeout=30, max_size=2 ** 22) as ws:
        await ws.send(json.dumps(sub))
        while time.time() < end:
            try:
                raw = await asyncio.wait_for(ws.recv(), timeout=max(1, end - time.time()))
            except asyncio.TimeoutError:
                break
            try:
                m = json.loads(raw)
            except Exception:
                continue
            meta, typ = m.get("MetaData") or {}, m.get("MessageType")
            mmsi = meta.get("MMSI")
            if not mmsi:
                continue
            if typ == "PositionReport":
                p = (m.get("Message") or {}).get("PositionReport") or {}
                lat, lng = meta.get("latitude", p.get("Latitude")), meta.get("longitude", p.get("Longitude"))
                if not isinstance(lat, (int, float)) or not isinstance(lng, (int, float)):
                    continue
                pos[mmsi] = {"cog": p.get("Cog"), "hdg": p.get("TrueHeading"), "lat": round(lat, 4), "lng": round(lng, 4), "mmsi": mmsi,
                             "name": (meta.get("ShipName") or "").strip() or str(mmsi), "nav": p.get("NavigationalStatus"),
                             "sog": p.get("Sog"), "t": meta.get("time_utc")}
            elif typ == "ShipStaticData":
                s = (m.get("Message") or {}).get("ShipStaticData") or {}
                dim = s.get("Dimension") or {}
                ln = (dim.get("A") or 0) + (dim.get("B") or 0)
                static[mmsi] = {"type": s.get("Type"), "len": ln or None}
    return pos, static


def feed_ships(prev):
    key = os.environ.get("AISSTREAM_KEY", "").strip()
    if not key:
        return None, "skipped: no AISSTREAM_KEY"
    secs = int(os.environ.get("AIS_SECONDS", "90"))
    pos, static = asyncio.run(ais_listen(key, secs))
    boxes = CFG["shipBoxes"]
    ships, counts = [], {b["id"]: [0, 0] for b in boxes}
    for mmsi, s in pos.items():
        b = next((b for b in boxes if in_box(b, s["lat"], s["lng"])), None)
        if not b:
            continue
        s = dict(s, box=b["name"])
        st = static.get(mmsi) or {}
        if st.get("type") is not None:
            s["type"] = st["type"]
        if st.get("len"):
            s["len"] = st["len"]
        counts[b["id"]][0] += 1
        if isinstance(s.get("sog"), (int, float)) and s["sog"] >= 0.5:
            counts[b["id"]][1] += 1
        ships.append(s)
    if not ships:
        raise RuntimeError("no vessels heard in %d s" % secs)
    ships.sort(key=lambda s: (s["box"], -(s.get("len") or 0)))
    out = dict(prev or {})
    out.update({"boxes": boxes, "counts": counts, "fetchedAt": iso(), "seconds": secs, "ships": ships[:400], "source": "AISStream.io"})
    return out, "ok (%d vessels)" % len(ships)



# ---------------------------------------------------------------- part two: clouds, conflict, tenders

def need_pillow():
    """The robot installs its picture tool itself, so the workflow file does not have to change."""
    try:
        from PIL import Image  # noqa: F401
    except ImportError:
        import subprocess
        subprocess.run([sys.executable, "-m", "pip", "install", "--quiet", "pillow"], check=True)
    from PIL import Image, ImageChops
    return Image, ImageChops


GIBS_LAYERS = [("NOAA20", "VIIRS_NOAA20_CorrectedReflectance_TrueColor"), ("NOAA21", "VIIRS_NOAA21_CorrectedReflectance_TrueColor"),
               ("SNPP", "VIIRS_SNPP_CorrectedReflectance_TrueColor")]


def cloud_mask(img, Image, ImageChops):
    """White, colourless pixels become cloud (255); everything else, including the black gaps between passes, 0."""
    r, g, b = img.convert("RGB").split()
    lo = ImageChops.darker(ImageChops.darker(r, g), b)
    hi = ImageChops.lighter(ImageChops.lighter(r, g), b)
    sat = ImageChops.subtract(hi, lo)
    bright = lo.point(lambda v: 0 if v < 120 else 255 if v > 215 else int((v - 120) * 255 / 95))
    grey = sat.point(lambda v: 255 if v < 18 else 0 if v > 60 else int((60 - v) * 255 / 42))
    return ImageChops.multiply(bright, grey)


def data_url(img, quality=82):
    buf = io.BytesIO()
    img.save(buf, "JPEG", quality=quality, optimize=True)
    import base64
    return "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode("ascii")


def feed_clouds(prev):
    """Yesterday's cloud cover from NASA GIBS: clouds.json (1024 x 512) and cloudshi0-3.json (2048 x 1024 in four strips)."""
    day = (TODAY - dt.timedelta(days=1)).isoformat()
    if (prev or {}).get("date") == day and not FORCE:
        return None, "skipped: already has yesterday"
    Image, ImageChops = need_pillow()
    W, H = 2048, 1024
    mask, used, errors = None, [], []
    for name, layer in GIBS_LAYERS:
        url = ("https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi?SERVICE=WMS&REQUEST=GetMap&VERSION=1.3.0"
               "&LAYERS=%s&STYLES=&CRS=EPSG:4326&BBOX=-90,-180,90,180&WIDTH=%d&HEIGHT=%d&FORMAT=image/jpeg&TIME=%s" % (layer, W, H, day))
        try:
            raw = http(url, timeout=180)
            img = Image.open(io.BytesIO(raw))
            img.load()
            if img.size != (W, H):
                img = img.resize((W, H))
            m = cloud_mask(img, Image, ImageChops)
            mask = m if mask is None else ImageChops.lighter(mask, m)
            used.append(name)
        except Exception as e:
            errors.append("%s %s" % (name, why(e)))
    if mask is None:
        raise RuntimeError("; ".join(errors) or "no picture")
    files = {}
    base = {"date": day, "fetchedAt": iso()}
    lo = mask.resize((1024, 512), Image.LANCZOS)
    files["live-data/live/clouds.json"] = dict(base, **{
        "h": 512, "hi": 4, "image": data_url(lo), "w": 1024, "satellites": used,
        "note": "Bright white ground in that day's pictures: clouds, but also snow, ice and salt flats.",
        "source": "NASA GIBS: VIIRS corrected reflectance (true colour) from " + ", ".join(used), "url": "https://worldview.earthdata.nasa.gov"})
    for i in range(4):
        strip = mask.crop((i * 512, 0, (i + 1) * 512, H))
        files["live-data/live/cloudshi%d.json" % i] = dict(base, **{"H": H, "W": W, "h": H, "image": data_url(strip), "of": 4, "part": i, "w": 512, "x": i * 512})
    note = "ok (%s from %s)" % (day, ", ".join(used)) + ("; missing " + "; ".join(errors) if errors else "")
    return files, note


# conflict: the areas the atlas watches, as (centre points, radius in km)
def conflict_areas():
    areas = {s["id"]: ([(s["lat"], s["lng"])], 100) for s in CFG["sites"]}
    areas["choke:suez"] = ([(12.58, 43.33)], 400)
    areas["choke:malacca"] = ([(2.5, 101.4), (4.2, 99.6), (1.3, 103.8)], 150)
    areas["route:lobito"] = ([(-12.36, 13.54), (-12.77, 15.73), (-12.38, 16.93), (-11.78, 19.92), (-10.71, 22.22)], 100)
    areas["route:lobito-cd"] = ([(-10.70, 22.33), (-10.72, 25.47), (-10.98, 26.73), (-9.2, 25.85)], 120)
    return areas


def ucdp_files():
    """This year's UCDP candidate files: the newest January-to-month file, then any newer monthly files."""
    yy = TODAY.year % 100
    base = "https://ucdp.uu.se/downloads/candidateged/"
    got, upto = [], 0
    for mm in range(min(12, TODAY.month), 0, -1):
        name = "GEDEvent_v%02d_01_%02d_%02d.csv" % (yy, yy, mm)
        try:
            got.append((name, http(base + name, timeout=180)))
            upto = mm
            break
        except urllib.error.HTTPError as e:
            if e.code != 404:
                raise
    for mm in range(upto + 1, min(12, TODAY.month) + 1):
        name = "GEDEvent_v%02d_0_%d.csv" % (yy, mm)
        try:
            got.append((name, http(base + name, timeout=180)))
        except urllib.error.HTTPError as e:
            if e.code != 404:
                raise
    if not got:
        raise RuntimeError("no UCDP candidate file found for %d at %s" % (TODAY.year, base))
    return got


def feed_conflict(prev):
    areas, rows, files = conflict_areas(), {}, []
    for name, raw in ucdp_files():
        files.append(name)
        for r in csv.DictReader(io.StringIO(raw.decode("utf-8-sig", "replace"))):
            rows[r.get("id") or r.get("relid") or str(len(rows))] = r
    out_areas, clusters, recent = {}, {}, []
    for r in rows.values():
        try:
            la, lo, d = float(r["latitude"]), float(r["longitude"]), str(r.get("date_start", ""))[:10]
            deaths, typ = int(float(r.get("best") or 0)), str(r.get("type_of_violence") or "")
        except (KeyError, ValueError):
            continue
        best_w, best_km = None, None
        for w, (pts, rad) in areas.items():
            k = min(km(la, lo, a, b) for a, b in pts)
            if k <= rad and (best_km is None or k < best_km):
                best_w, best_km = w, k
        if not best_w:
            continue
        a = out_areas.setdefault(best_w, {"byMonth": {}, "deaths": 0, "first": d, "last": d, "n": 0, "types": {}})
        a["n"] += 1
        a["deaths"] += deaths
        a["byMonth"][d[:7]] = a["byMonth"].get(d[:7], 0) + 1
        a["types"][typ] = a["types"].get(typ, 0) + 1
        a["first"], a["last"] = min(a["first"], d), max(a["last"], d)
        where = (r.get("where_coordinates") or r.get("adm_1") or "").strip()
        c = clusters.setdefault((best_w, where), {"country": r.get("country", ""), "deaths": 0, "last": d, "lat": round(la, 3), "lng": round(lo, 3), "n": 0, "w": best_w, "where": where})
        c["n"] += 1
        c["deaths"] += deaths
        c["last"] = max(c["last"], d)
        recent.append({"a": r.get("side_a", ""), "b": r.get("side_b", ""), "country": r.get("country", ""), "d": d, "deaths": deaths,
                       "km": round(best_km), "lat": round(la, 3), "lng": round(lo, 3), "type": int(typ) if typ.isdigit() else None, "w": best_w, "where": where})
    if not rows:
        raise RuntimeError("the UCDP files were empty")
    for a in out_areas.values():
        a["byMonth"] = dict(sorted(a["byMonth"].items()))
        a["types"] = dict(sorted(a["types"].items()))
    recent.sort(key=lambda x: (x["d"], x["deaths"]), reverse=True)
    dates = [str(r.get("date_start", ""))[:10] for r in rows.values() if r.get("date_start")]
    out = dict(prev or {})
    out.update({"areas": out_areas, "clusters": sorted(clusters.values(), key=lambda c: (-c["n"], c["where"]))[:80],
                "fetchedAt": iso(), "files": files, "from": "%d-01-01" % TODAY.year, "to": max(dates) if dates else None,
                "recent": recent[:30], "source": "UCDP Candidate Events Dataset (Uppsala Conflict Data Program)", "url": "https://ucdp.uu.se/downloads/",
                "note": "Candidate events are preliminary and can change when UCDP finalises them. Type 1 = state-based, 2 = non-state, 3 = one-sided violence."})
    return out, "ok (%d events in the year, %d near the supply chain, files %s)" % (len(rows), sum(a["n"] for a in out_areas.values()), ", ".join(files))


TED_CPV = {
    "weapons": "35300000 35310000 35311000 35312000 35320000 35321000 35322000 35340000",
    "ammunition": "35330000 35331000 35332000 35333000 35334000 35335000",
    "explosives": "24610000 24611000 24612000 24613000",
}


TED_DROPPED = set()


def ted_count(codes, d0, d1):
    """How many notices TED published with these CPV codes between d0 and d1 (inclusive, YYYYMMDD).
    A code TED does not know is dropped (and remembered for the rest of the run), then the question is asked again."""
    import re
    for _ in range(12):
        use = [c for c in codes.split() if c not in TED_DROPPED]
        if not use:
            raise RuntimeError("TED accepted none of the codes")
        q = "classification-cpv IN (%s) AND publication-date>=%s AND publication-date<=%s" % (" ".join(use), d0, d1)
        body = {"query": q, "fields": ["publication-number"], "page": 1, "limit": 1, "scope": "ALL", "paginationMode": "PAGE_NUMBER"}
        try:
            j = jget("https://api.ted.europa.eu/v3/notices/search", data=body, timeout=90)
        except urllib.error.HTTPError as e:
            msg = why(e)
            m = re.search(r"Value '(\d+)' is not supported for search field 'classification-cpv'", msg)
            if e.code == 400 and m:
                TED_DROPPED.add(m.group(1))
                continue
            raise RuntimeError(msg)
        for k in ("totalNoticeCount", "total", "totalCount"):
            if isinstance(j.get(k), int):
                return j[k]
        raise RuntimeError("no count in the answer: " + str(list(j.keys()))[:120])
    raise RuntimeError("TED kept refusing codes: " + ", ".join(sorted(TED_DROPPED)))


def feed_tenders(prev):
    first = dt.date(TODAY.year, TODAY.month, 1)
    months = []
    for i in range(29, -1, -1):
        y, m = first.year, first.month - i
        while m <= 0:
            y, m = y - 1, m + 12
        months.append(dt.date(y, m, 1))
    series = {k: [] for k in TED_CPV}
    for d in months:
        nxt = dt.date(d.year + (d.month == 12), d.month % 12 + 1, 1)
        last = min(nxt - dt.timedelta(days=1), TODAY)
        for k, codes in TED_CPV.items():
            series[k].append(ted_count(codes, d.strftime("%Y%m%d"), last.strftime("%Y%m%d")))
            time.sleep(0.4)
    out = dict(prev or {})
    out.update({"fetchedAt": iso(), "months": [d.strftime("%Y-%m") for d in months], "series": series,
                "source": "TED, Tenders Electronic Daily (EU Publications Office)", "unit": "notices published (calls for tender and awards) per month",
                "url": "https://ted.europa.eu"})
    dropped = (" · codes TED does not know, left out: " + ", ".join(sorted(TED_DROPPED))) if TED_DROPPED else ""
    return out, "ok (%d months, last month: %s)%s" % (len(months), ", ".join("%s %d" % (k, v[-2]) for k, v in series.items()), dropped)


# ---------------------------------------------------------------- part three: EU imports (Comext) and sulphur dioxide

COMEXT = "https://ec.europa.eu/eurostat/api/comext/dissemination/statistics/1.0/data/DS-045409?"
EU27 = set("AT BE BG CY CZ DE DK EE ES FI FR GR EL HR HU IE IT LT LU LV MT NL PL PT RO SE SI SK".split())
TRADE_CODES = {
    "co": [("810520", "Cobalt mattes and unwrought cobalt"), ("282200", "Cobalt oxides and hydroxides")],
    "ga": [("81129289", "Unwrought gallium")], "ge": [("81129295", "Unwrought germanium")],
    "gr": [("380110", "Artificial graphite"), ("250410", "Natural flake graphite")],
    "li": [("283691", "Lithium carbonate"), ("282520", "Lithium oxide and hydroxide")],
    "ni": [("750210", "Unwrought nickel"), ("750110", "Nickel mattes")],
    "ree": [("850511", "Permanent magnets of metal"), ("284690", "Rare-earth compounds"), ("280530", "Rare-earth metals")],
    "sb": [("811010", "Unwrought antimony"), ("282580", "Antimony oxides")],
    "ti": [("810820", "Unwrought titanium (sponge)"), ("261400", "Titanium ores")],
    "w": [("810194", "Unwrought tungsten"), ("261100", "Tungsten ores")],
}


def jsonstat_rows(j):
    """Rows of a JSON-stat answer as ({dimension: code}, value)."""
    ids, sizes = j["id"], j["size"]
    cats = []
    for d in ids:
        idx = j["dimension"][d]["category"]["index"]
        if isinstance(idx, list):
            cats.append(idx)
        else:
            codes = [None] * len(idx)
            for c, pos in idx.items():
                codes[pos] = c
            cats.append(codes)
    vals = j.get("value") or {}
    for flat, v in (vals.items() if isinstance(vals, dict) else enumerate(vals)):
        if v is None:
            continue
        flat, coords = int(flat), []
        for size in reversed(sizes):
            coords.append(flat % size)
            flat //= size
        coords.reverse()
        yield {d: cats[i][coords[i]] for i, d in enumerate(ids)}, v


REPORTER = []


def comext(params):
    """One Comext question. Tries the EU reporter codes in turn, waits when Comext answers 'later'."""
    errors = []
    for rep in (REPORTER or ["EU27_2020", "EU"]):
        q = dict(params, format="JSON", lang="EN", reporter=rep, flow="1")
        url = COMEXT + urllib.parse.urlencode(q, doseq=True)
        for attempt in range(4):
            try:
                j = jget(url, timeout=180)
            except Exception as e:
                errors.append("%s %s" % (rep, why(e)))
                break
            if "value" in j and "id" in j:
                if not REPORTER:
                    REPORTER.append(rep)
                return j
            time.sleep(30)   # Comext prepares big answers in the background
        else:
            errors.append("%s: no data after waiting" % rep)
    raise RuntimeError(" | ".join(errors))


def is_ext(p):
    return isinstance(p, str) and len(p) == 2 and p not in EU27 and not (p.startswith("Q") and p != "QA")


def trade_one(code):
    y = TODAY.year
    tdim = lambda r: r.get("time") or r.get("TIME_PERIOD")
    # monthly, every partner, since January last year
    m = comext({"freq": "M", "product": code, "indicators": "VALUE_IN_EUROS", "sinceTimePeriod": "%d-01" % (y - 1)})
    cn, ext = {}, {}
    for r, v in jsonstat_rows(m):
        t, p = tdim(r), r.get("partner")
        if p == "CN":
            cn[t] = cn.get(t, 0) + v
        if is_ext(p):
            ext[t] = ext.get(t, 0) + v
    months = sorted(set(cn) | set(ext))
    if not months:
        raise RuntimeError("no monthly data for %s" % code)
    start, last = dt.date(y - 1, 1, 1), months[-1]
    seq, d = [], start
    while d.strftime("%Y-%m") <= last:
        seq.append(d.strftime("%Y-%m"))
        d = dt.date(d.year + (d.month == 12), d.month % 12 + 1, 1)
    monthly = {"cn": [round(cn.get(k, 0)) for k in seq], "ext": [round(ext.get(k, 0)) for k in seq], "from": seq[0]}
    # the last two full years, every partner, value and quantity
    a = comext({"freq": "A", "product": code, "indicators": ["VALUE_IN_EUROS", "QUANTITY_IN_100KG"],
                "sinceTimePeriod": str(y - 2), "untilTimePeriod": str(y - 1)})
    years = {}
    for r, v in jsonstat_rows(a):
        t, p, ind = str(tdim(r)), r.get("partner"), r.get("indicators")
        if not is_ext(p):
            continue
        yr = years.setdefault(t, {"cn": 0, "eur": 0, "t": 0, "_by": {}})
        if ind == "VALUE_IN_EUROS":
            yr["eur"] += v
            yr["_by"][p] = yr["_by"].get(p, 0) + v
            if p == "CN":
                yr["cn"] += v
        elif ind == "QUANTITY_IN_100KG":
            yr["t"] += v / 10
    for yr in years.values():
        yr["top"] = [[p, round(v)] for p, v in sorted(yr.pop("_by").items(), key=lambda x: -x[1])[:6]]
        yr["cn"], yr["eur"], yr["t"] = round(yr["cn"]), round(yr["eur"]), round(yr["t"], 1)
    return monthly, dict(sorted(years.items()))


def feed_trade(prev):
    prev = prev or {}
    mats = {k: list(v) for k, v in (prev.get("materials") or {}).items()}
    ok, errors = 0, []
    for m, codes in TRADE_CODES.items():
        rows = []
        for code, label in codes:
            old = next((r for r in mats.get(m, []) if r.get("code") == code), None)
            try:
                monthly, years = trade_one(code)
                rows.append({"code": code, "label": label, "monthly": monthly, "years": years})
                ok += 1
            except Exception as e:
                errors.append("%s %s" % (code, str(e)[:120]))
                if old:
                    rows.append(old)
            time.sleep(1)
        if rows:
            mats[m] = rows
    if not ok:
        raise RuntimeError("; ".join(errors[:3]))
    out = dict(prev)
    out.update({"fetchedAt": iso(), "materials": mats, "source": "Eurostat Comext, EU trade by CN8 (DS-045409)", "unit": "EUR; tonnes",
                "url": "https://ec.europa.eu/eurostat/comext/newxtweb/"})
    return out, "ok (%d of %d products%s)" % (ok, sum(len(v) for v in TRADE_CODES.values()), ("; failed: " + "; ".join(errors[:3])) if errors else "")


SO2_SITES = ["ganzhou", "imip", "kokkola", "norilsk", "panzhihua", "xikuangshan"]


SO2_FALLBACK = ["OMPS_NOAA20_SO2_Planetary_Boundary_Layer", "OMI_SO2_Planetary_Boundary_Layer", "OMPS_NOAA20_SO2_Lower_Troposphere"]
SO2_LABEL = {
    "OMPS_NOAA20_SO2_Planetary_Boundary_Layer": "NOAA-20 OMPS sulphur dioxide, planetary boundary layer (NASA GIBS imagery)",
    "OMI_SO2_Planetary_Boundary_Layer": "Aura OMI sulphur dioxide, planetary boundary layer (NASA GIBS imagery)",
    "OMPS_NOAA20_SO2_Lower_Troposphere": "NOAA-20 OMPS sulphur dioxide, lower troposphere (NASA GIBS imagery)",
}


def so2_layers():
    """Daily sulphur dioxide layers in NASA GIBS, best first, each with the colour-scale address GIBS itself gives:
    Sentinel-5P TROPOMI when listed, then the NOAA-20 OMPS planetary-boundary-layer product."""
    import re
    cap = http("https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/1.0.0/WMTSCapabilities.xml", timeout=180).decode("utf-8", "replace")
    ids = sorted(set(re.findall(r"<ows:Identifier>([^<]*(?:SO2|[Ss]ulfur|[Ss]ulphur|SULFUR)[^<]*)</ows:Identifier>", cap)))
    log("  SO2 layers in GIBS: " + ", ".join(ids))
    s5p = [i for i in ids if any(w in i.upper() for w in ("TROPOMI", "S5P", "SENTINEL"))]
    s5p.sort(key=lambda i: ("TOTAL" in i.upper()) or ("PLANETARY" in i.upper()), reverse=True)
    order = ([CFG["so2Layer"]] if CFG.get("so2Layer") else []) + s5p + [f for f in SO2_FALLBACK if f in ids]
    out = []
    for lid in order:
        block = re.search(r"<Layer>(?:(?!</Layer>).)*?<ows:Identifier>%s</ows:Identifier>(?:(?!</Layer>).)*?</Layer>" % re.escape(lid), cap, re.S)
        maps = re.findall(r'xlink:href="([^"]*colormaps[^"]*\.xml)"', block.group(0)) if block else []
        maps.sort(key=lambda u: ("v1.3" in u, "v1.2" in u), reverse=True)
        out.append((lid, maps + ["https://gibs.earthdata.nasa.gov/colormaps/v1.3/%s.xml" % lid]))
    if not out:
        raise RuntimeError("no daily SO2 layer found; GIBS lists: " + ", ".join(ids))
    return out


def so2_colours(xml_bytes):
    """[(r, g, b, DU)] from a GIBS colour map; the open lowest step counts as 1 DU, like the earlier data."""
    import re
    out = []
    for m in re.finditer(r'<ColorMapEntry\b([^>]*)/?>', xml_bytes.decode("utf-8", "replace")):
        a = dict(re.findall(r'(\w+)="([^"]*)"', m.group(1)))
        if a.get("transparent", "false").lower() == "true" or "rgb" not in a:
            continue
        nums = [float(x) for x in re.findall(r"-?\d+(?:\.\d+)?(?:[eE]-?\d+)?", a.get("value", ""))]
        txt = a.get("value", "")
        if len(nums) >= 2:
            du = (nums[0] + nums[1]) / 2
        elif len(nums) == 1:
            du = 1.0 if "-INF" in txt.upper() or txt.strip().startswith("(") and nums[0] <= 2.01 else nums[0]
        else:
            continue
        r, g, b = [int(x) for x in a["rgb"].split(",")[:3]]
        out.append((r, g, b, round(du, 2)))
    if len(out) < 5:
        raise RuntimeError("could not read the SO2 colour scale")
    return out


def so2_day(lid, colours, site, day, Image):
    """DU near the site (max and mean within 50 km) and the mean in a ring 150-270 km out, as the atlas describes it;
    None when there is no usable picture."""
    lat, lng = site["lat"], site["lng"]
    hlat = 2.6
    hlng = min(8.0, hlat / max(0.15, math.cos(lat * math.pi / 180)))
    h, w = 200, max(200, min(600, round(200 * hlng / hlat)))
    bbox = "%.4f,%.4f,%.4f,%.4f" % (lat - hlat, lng - hlng, lat + hlat, lng + hlng)
    url = ("https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi?SERVICE=WMS&REQUEST=GetMap&VERSION=1.3.0&LAYERS=%s&STYLES="
           "&CRS=EPSG:4326&BBOX=%s&WIDTH=%d&HEIGHT=%d&FORMAT=image/png&TRANSPARENT=true&TIME=%s" % (lid, bbox, w, h, day))
    img = Image.open(io.BytesIO(http(url, timeout=90))).convert("RGBA")
    if img.size != (w, h):
        img = img.resize((w, h), Image.NEAREST)
    data, cache = img.load(), {}
    near, ring = [], []
    for yy in range(h):
        la = lat + hlat - (yy + 0.5) * 2 * hlat / h
        for xx in range(w):
            r, g, b, a = data[xx, yy]
            if a < 128:
                continue
            k = km(lat, lng, la, lng - hlng + (xx + 0.5) * 2 * hlng / w)
            if k > 270 or 50 < k < 150:
                continue
            key = (r, g, b)
            if key not in cache:
                cache[key] = min(colours, key=lambda c: (c[0] - r) ** 2 + (c[1] - g) ** 2 + (c[2] - b) ** 2)[3]
            (near if k <= 50 else ring).append(cache[key])
    if not near:
        return None
    return {"d": day, "near": round(max(near), 2), "nearMean": round(sum(near) / len(near), 2), "ring": round(sum(ring) / len(ring), 2) if ring else None}


def feed_so2(prev):
    prev = prev or {}
    Image, _ = need_pillow()
    sites_cfg = {s["id"]: s for s in CFG["sites"]}
    want = [sid for sid in (list((prev.get("sites") or {}).keys()) or SO2_SITES) if sid in sites_cfg]
    lid, colours, tried_layers = None, None, []
    for cand, cmaps in so2_layers():
        try:
            colours = None
            for u in cmaps:
                try:
                    colours = so2_colours(http(u, timeout=60))
                    break
                except Exception as e:
                    tried_layers.append("%s colour scale %s" % (cand, why(e)))
            if not colours:
                continue
            # probe: the layer must give a usable picture for at least one of the last few days somewhere
            probe = [so2_day(cand, colours, sites_cfg[sid], (TODAY - dt.timedelta(days=k)).isoformat(), Image) for sid in want[:3] for k in (2, 3, 4)]
            if any(probe):
                lid = cand
                break
            tried_layers.append("%s gave no usable pictures" % cand)
        except Exception as e:
            tried_layers.append("%s %s" % (cand, why(e)))
    if not lid:
        raise RuntimeError("no SO2 layer worked: " + "; ".join(tried_layers))
    if tried_layers:
        log("  SO2 skipped: " + "; ".join(tried_layers))
    days = [(TODAY - dt.timedelta(days=i)).isoformat() for i in range(60, 1, -1)]   # up to two days ago
    same = prev.get("layer") == lid or (not prev.get("layer") and any(w in lid.upper() for w in ("TROPOMI", "S5P", "SENTINEL")))
    sites, fetched = (dict(prev.get("sites") or {}) if same else {}), 0
    if not same:
        log("  SO2: new layer %s, starting a fresh 60-day history" % lid)
    for sid in want:
        rec = dict(sites.get(sid) or {})
        tried, series = set(rec.get("tried") or []), {x["d"]: x for x in (rec.get("series") or []) if isinstance(x, dict) and x.get("d")}
        for day in days:
            if day in tried and day < (TODAY - dt.timedelta(days=5)).isoformat():
                continue
            try:
                v = so2_day(lid, colours, sites_cfg[sid], day, Image)
                fetched += 1
                tried.add(day)
                if v:
                    series[day] = v
            except Exception as e:
                log("  SO2 %s %s: %s" % (sid, day, why(e)))
            time.sleep(0.2)
        keep = set(days)
        ser = [series[d] for d in sorted(series) if d in keep]
        rec.update({"daysAbove2": sum(1 for x in ser if x["near"] >= 2), "daysSeen": len(ser), "maxDU": max([x["near"] for x in ser], default=0),
                    "series": ser, "tried": sorted(d for d in tried if d in keep)})
        sites[sid] = rec
    if not fetched:
        raise RuntimeError("no SO2 picture could be read")
    out = dict(prev)
    out.update({"days": 60, "fetchedAt": iso(), "radiusKm": 50, "sites": sites, "layer": lid, "unit": "DU",
                "source": SO2_LABEL.get(lid, "Copernicus Sentinel-5P TROPOMI sulphur dioxide, total column (NASA GIBS imagery)"), "url": "https://worldview.earthdata.nasa.gov",
                "note": "Values are read back from the published colour scale of the %s layer, in Dobson units (DU)." % lid})
    return out, "ok (layer %s, %d pictures read, %d sites)" % (lid, fetched, len(want))

# ---------------------------------------------------------------- run

INTERVAL_H = {"orbits": 2.5, "hazards": 2.5, "scenes": 2.5, "ships": 2.5, "hotspots": 11, "prices": 23, "traffic": 144,
              "clouds": 2.5, "conflict": 144, "tenders": 144, "trade": 144, "so2": 144}


def main():
    log("OreOrbit updater v1.7 · %s · %s · %s" % (iso(), BASE, "DRY RUN" if DRY else "live"))
    remote_listing()
    rs = current("live-data/live/runstatus.json") or {}
    status = dict(rs.get("sources") or {})
    hist_file = current("live-data/live/history.json") or {}
    hist = dict(hist_file.get("days") or {})
    ran_hist = False

    def due(name):
        if ONLY and name not in ONLY:
            return False
        if FORCE:
            return True
        ok = parse_iso((status.get(name) or {}).get("ok"))
        return not ok or (NOW - ok).total_seconds() >= INTERVAL_H[name] * 3600

    for name, fn in [("orbits", feed_orbits), ("hazards", feed_hazards), ("scenes", feed_scenes), ("ships", feed_ships),
                     ("hotspots", feed_hotspots), ("prices", feed_prices), ("traffic", feed_traffic),
                     ("clouds", feed_clouds), ("conflict", feed_conflict), ("tenders", feed_tenders),
                     ("trade", feed_trade), ("so2", feed_so2)]:
        st = dict(status.get(name) or {})
        st["checked"] = iso()
        if ONLY and name not in ONLY:
            log("%-9s not in this run" % name)
            continue
        if not due(name):
            st["status"] = "skipped: refreshed less than %s ago" % (("%d hours" % INTERVAL_H[name]) if INTERVAL_H[name] < 48 else "%d days" % (INTERVAL_H[name] // 24))
            status[name] = st
            log("%-9s %s" % (name, st["status"]))
            continue
        path = "live-data/live/%s.json" % name
        try:
            prev = current(path)
            if name == "hotspots":
                obj, note = fn(prev, hist)
                ran_hist = obj is not None
            else:
                obj, note = fn(prev)
            if obj is None:
                st["status"] = note
            elif name == "clouds":
                res = [upload(p, o) for p, o in obj.items()]
                st.update({"ok": iso(), "fails": 0, "status": note})
                for i in range(4):
                    status["cloudshi%d" % i] = {"checked": iso(), "fails": 0, "ok": iso(), "status": "ok"}
                note = note + " · " + ", ".join(sorted(set(res)))
            else:
                res = upload(path, obj)
                st.update({"ok": iso(), "fails": 0, "status": note})
                note = note + " · " + res
            log("%-9s %s" % (name, note))
        except Exception as e:
            st["fails"] = int(st.get("fails") or 0) + 1
            st["status"] = "failed: " + str(e)[:160]
            log("%-9s FAILED: %s" % (name, e))
            traceback.print_exc(limit=1)
        status[name] = st

    # the daily history: heat from FIRMS and the ship counts per sea area
    try:
        ships_now = current("live-data/live/ships.json") if not DRY else None
        if ships_now and isinstance(ships_now.get("counts"), dict) and str(ships_now.get("fetchedAt", ""))[:10] == TODAY.isoformat():
            hist.setdefault(TODAY.isoformat(), {})["ships"] = ships_now["counts"]
            ran_hist = True
        if ran_hist:
            cut = (TODAY - dt.timedelta(days=13)).isoformat()
            hist = {k: hist[k] for k in sorted(hist) if k >= cut}
            hf = dict(hist_file)
            hf.update({"days": hist, "fetchedAt": iso()})
            log("history   " + upload("live-data/live/history.json", hf))
    except Exception as e:
        log("history   FAILED: %s" % e)

    try:
        out = dict(rs)
        out.update({"fetchedAt": iso(), "run": iso(), "sources": status, "runner": "github-actions"})
        log("runstatus " + upload("live-data/live/runstatus.json", out))
    except Exception as e:
        log("runstatus FAILED: %s" % e)
    failed = [k for k, v in status.items() if str(v.get("status", "")).startswith("failed") and k in INTERVAL_H and (not ONLY or k in ONLY)]
    if failed:
        log("feeds that failed this run (their last good data stays online): " + ", ".join(failed))


if __name__ == "__main__":
    main()
