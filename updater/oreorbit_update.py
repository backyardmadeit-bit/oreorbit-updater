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
START = time.time()
BUDGET = float(os.environ.get("TIME_BUDGET_MIN") or "22") * 60   # GitHub stops a run at 30 minutes
HEAVY = {"tenders", "clouds", "so2", "imagery", "radar", "memory"}


def time_left():
    return BUDGET - (time.time() - START)
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

def http(url, data=None, headers=None, timeout=60, method=None, tries=3):
    h = {"User-Agent": UA, "Accept": "*/*"}
    h.update(headers or {})
    if isinstance(data, (dict, list)):
        data = json.dumps(data).encode("utf-8")
        h.setdefault("Content-Type", "application/json")
    req = urllib.request.Request(url, data=data, headers=h, method=method)
    last = None
    for attempt in range(tries):
        try:
            with urllib.request.urlopen(req, timeout=timeout) as r:
                return r.read()
        except urllib.error.HTTPError as e:
            last = e
            if e.code in (429, 500, 502, 503, 504) and attempt < tries - 1:
                time.sleep(6 * (attempt + 1))
                continue
            raise
        except (urllib.error.URLError, TimeoutError, ConnectionError) as e:
            last = e
            if attempt < tries - 1:
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
    """The newest UCDP candidate files: this year's January-to-month file and any newer monthly files.
    Early in a year, before UCDP has published anything for it, last year's files are used instead.
    Returns (year used, [(file name, bytes)])."""
    base = "https://ucdp.uu.se/downloads/candidateged/"
    for year in (TODAY.year, TODAY.year - 1):
        yy, last_month = year % 100, (TODAY.month if year == TODAY.year else 12)
        got, upto = [], 0
        for mm in range(last_month, 0, -1):
            name = "GEDEvent_v%02d_01_%02d_%02d.csv" % (yy, yy, mm)
            try:
                got.append((name, http(base + name, timeout=180)))
                upto = mm
                break
            except urllib.error.HTTPError as e:
                if e.code != 404:
                    raise
        for mm in range(upto + 1, last_month + 1):
            name = "GEDEvent_v%02d_0_%d.csv" % (yy, mm)
            try:
                got.append((name, http(base + name, timeout=180)))
            except urllib.error.HTTPError as e:
                if e.code != 404:
                    raise
        if got:
            return year, got
    raise RuntimeError("no UCDP candidate file found for %d or %d at %s" % (TODAY.year, TODAY.year - 1, base))


def feed_conflict(prev):
    areas, rows, files = conflict_areas(), {}, []
    year, got = ucdp_files()
    for name, raw in got:
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
                "fetchedAt": iso(), "files": files, "from": "%d-01-01" % year, "to": max(dates) if dates else None,
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


SO2_FALLBACK = ["OMPS_NOAA20_SO2_Planetary_Boundary_Layer", "OMPS_SO2_Planetary_Boundary_Layer", "OMI_SO2_Planetary_Boundary_Layer", "OMPS_NOAA20_SO2_Lower_Troposphere"]
SO2_LABEL = {
    "OMPS_NOAA20_SO2_Planetary_Boundary_Layer": "NOAA-20 OMPS sulphur dioxide, planetary boundary layer (NASA GIBS imagery)",
    "OMI_SO2_Planetary_Boundary_Layer": "Aura OMI sulphur dioxide, planetary boundary layer (NASA GIBS imagery)",
    "OMPS_NOAA20_SO2_Lower_Troposphere": "NOAA-20 OMPS sulphur dioxide, lower troposphere (NASA GIBS imagery)",
    "OMPS_SO2_Planetary_Boundary_Layer": "Suomi NPP OMPS sulphur dioxide, planetary boundary layer (NASA GIBS imagery)",
}


COLORMAP_INDEX = {}


def colormap_index(ver):
    """File names in one of NASA GIBS's public colour-scale folders (v1.3, v1.2, v1.0)."""
    import re
    if ver not in COLORMAP_INDEX:
        try:
            html = http("https://gibs.earthdata.nasa.gov/colormaps/%s/" % ver, timeout=60).decode("utf-8", "replace")
            COLORMAP_INDEX[ver] = sorted(set(re.findall(r'href="(?:[^"]*/)?([A-Za-z0-9_.\-]+\.xml)"', html)))
        except Exception as e:
            log("  colour-scale folder %s: %s" % (ver, why(e)))
            COLORMAP_INDEX[ver] = []
    return COLORMAP_INDEX[ver]


def colormap_candidates(lid):
    """Colour-scale files whose names best match a layer: same instrument, a sulphur dioxide product, most words in common."""
    norm = lambda x: set(x.upper().replace("SULFUR_DIOXIDE", "SO2").replace("SULPHUR_DIOXIDE", "SO2").split("_"))
    toks, inst, out = norm(lid), lid.split("_")[0].upper(), []
    for ver in ("v1.3", "v1.2", "v1.0"):
        for f in colormap_index(ver):
            stem = f[:-4]
            ft = norm(stem)
            if stem.split("_")[0].upper() != inst or "SO2" not in ft:
                continue
            score = len(toks & ft) - 0.1 * len(ft - toks) + (5 if stem == lid else 0) + (0.3 if ver == "v1.3" else 0)
            out.append((score, "https://gibs.earthdata.nasa.gov/colormaps/%s/%s" % (ver, f)))
    return [u for _, u in sorted(out, reverse=True)]


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
        seen, urls = set(), []
        for u in maps + colormap_candidates(lid) + ["https://gibs.earthdata.nasa.gov/colormaps/v1.3/%s.xml" % lid]:
            if u not in seen:
                seen.add(u)
                urls.append(u)
        out.append((lid, urls))
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
    lid, colours, tried_layers, cmap_used = None, None, [], ""
    for cand, cmaps in so2_layers():
        try:
            colours = None
            for u in cmaps:
                try:
                    colours = so2_colours(http(u, timeout=60))
                    cmap_used = u.rsplit("/", 2)[-2] + "/" + u.rsplit("/", 1)[-1]
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
    out["colourScale"] = cmap_used
    return out, "ok (layer %s, colour scale %s, %d pictures read, %d sites)" % (lid, cmap_used, fetched, len(want))


# ---------------------------------------------------------------- part four: mine pictures and radar (Microsoft Planetary Computer)

PC_STAC = "https://planetarycomputer.microsoft.com/api/stac/v1/search"
PC_DATA = "https://planetarycomputer.microsoft.com/api/data/v1"
PC_FORM = []          # which crop address form this server answers, found on the first picture
CLEAR_SCL = {2, 4, 5, 6, 7}   # Sentinel-2 scene classes counted as clear ground or water


def upload_bytes(path, body):
    if DRY:
        out = os.path.join(os.getcwd(), "out", path)
        os.makedirs(os.path.dirname(out), exist_ok=True)
        open(out, "wb").write(body)
        return "dry run"
    if REMOTE.get(path, {}).get("md5") == hashlib.md5(body).hexdigest():
        return "unchanged"
    ctype = {"png": "image/png", "jpg": "image/jpeg", "html": "text/html; charset=utf-8", "xml": "application/xml"}[path.rsplit(".", 1)[-1]]
    r = json.loads(http(BASE + "update.php?f=" + urllib.parse.quote(path, safe="/"), data=body,
                        headers={"X-Atlas-Key": KEY, "Content-Type": ctype}, method="POST", timeout=120).decode("utf-8"))
    if not r.get("ok"):
        raise RuntimeError("update.php: " + str(r))
    return "uploaded"


def box(lat, lng, span_km):
    h = span_km / 2
    dlat, dlng = h / 111.32, h / (111.32 * max(0.2, math.cos(lat * math.pi / 180)))
    return (lng - dlng, lat - dlat, lng + dlng, lat + dlat)


def pc_search(collection, lat, lng, start, end, query=None, limit=40):
    body = {"collections": [collection], "intersects": {"type": "Point", "coordinates": [lng, lat]},
            "datetime": "%sT00:00:00Z/%sT23:59:59Z" % (start, end), "limit": limit,
            "sortby": [{"field": "properties.datetime", "direction": "desc"}]}
    if query:
        body["query"] = query
    feats = jget(PC_STAC, data=body, timeout=90).get("features", [])
    feats.sort(key=lambda f: (f.get("properties") or {}).get("datetime", ""), reverse=True)
    return feats


def pc_crop(collection, item, bbox, w, h, fmt, params):
    """A picture of one scene cut to a box. Tries the known address forms once, then keeps the one that works."""
    qs = urllib.parse.urlencode(dict(params, collection=collection, item=item), doseq=True)
    b = "%.6f,%.6f,%.6f,%.6f" % bbox
    forms = ["%s/item/bbox/%s/%dx%d.%s?%s" % (PC_DATA, b, w, h, fmt, qs), "%s/item/crop/%s/%dx%d.%s?%s" % (PC_DATA, b, w, h, fmt, qs),
             "%s/item/bbox/%s.%s?%s&width=%d&height=%d" % (PC_DATA, b, fmt, qs, w, h), "%s/item/crop/%s.%s?%s&width=%d&height=%d" % (PC_DATA, b, fmt, qs, w, h)]
    order = PC_FORM + [i for i in range(len(forms)) if i not in PC_FORM]
    errors = []
    for i in order:
        try:
            data = http(forms[i], timeout=150)
            if not PC_FORM:
                PC_FORM.append(i)
            return data
        except urllib.error.HTTPError as e:
            errors.append("form %d %s" % (i, why(e)))
            if PC_FORM or e.code not in (404, 405):
                break
    raise RuntimeError("; ".join(errors))


def grey(img, Image):
    """(values 0-255, alpha) lists from a picture the server returned (grey or grey+alpha)."""
    img = img.convert("LA")
    return list(img.getchannel(0).tobytes()), list(img.getchannel(1).tobytes())


def scl_values(item_id, bbox, size, Image):
    raw = pc_crop("sentinel-2-l2a", item_id, bbox, size, size, "png", {"assets": "SCL", "rescale": "0,255"})
    return grey(Image.open(io.BytesIO(raw)), Image)


def ndvi_values(item_id, bbox, size, Image):
    raw = pc_crop("sentinel-2-l2a", item_id, bbox, size, size, "png",
                  {"expression": "(B08-B04)/(B08+B04)", "asset_as_band": "True", "rescale": "-1,1"})
    v, a = grey(Image.open(io.BytesIO(raw)), Image)
    return [x / 127.5 - 1 for x in v], a


def s2_clear_scene(site, rec, Image):
    """The newest Sentinel-2 scene whose 7 km box is at least 90% clear, in the months the site allows."""
    months = set(rec.get("months") or range(1, 13))
    feats = pc_search("sentinel-2-l2a", site["lat"], site["lng"], (TODAY - dt.timedelta(days=150)).isoformat(), TODAY.isoformat(),
                      query={"eo:cloud_cover": {"lt": 40}})
    bbox = box(site["lat"], site["lng"], rec.get("spanKm") or 7.0)
    checked = 0
    for f in feats:
        d = (f.get("properties") or {}).get("datetime", "")[:10]
        if not d or int(d[5:7]) not in months:
            continue
        if checked >= 6:
            break
        checked += 1
        v, a = scl_values(f["id"], bbox, 120, Image)
        seen = [x for x, al in zip(v, a) if al > 0]
        if len(seen) > 0.8 * len(v) and sum(1 for x in seen if x in CLEAR_SCL) >= 0.9 * len(seen):
            return f, d, bbox
    return None, None, bbox


def feed_imagery(prev):
    """Fresh Sentinel-2 pictures of each mine and the map of ground cleared since the 2018 picture."""
    Image, _ = need_pillow()
    prev = prev or {}
    sites = {k: dict(v) for k, v in (prev.get("sites") or {}).items()}
    cfg = {s["id"]: s for s in CFG["sites"]}
    if not sites:
        raise RuntimeError("could not read data/imagery.json from the website, so nothing was changed")
    files, fresh, same, failed, done = {}, 0, 0, [], 0
    order = sorted(sites, key=lambda k: sites[k].get("checkedAt") or "")
    for sid in order:
        rec = sites[sid]
        if time_left() < 100:
            files["_partial"] = "%d of %d sites" % (done, len(order))
            break
        done += 1
        rec["checkedAt"] = iso()
        site = dict(cfg.get(sid) or {}, lat=rec.get("lat", (cfg.get(sid) or {}).get("lat")), lng=rec.get("lng", (cfg.get(sid) or {}).get("lng")))
        if site.get("lat") is None:
            continue
        try:
            f, d, bbox = s2_clear_scene(site, rec, Image)
            if not f:
                continue
            restyle = bool(rec.get("thenDate")) and not rec.get("noThen") and not (rec.get("change") or {}).get("method", "").endswith("isolated pixels removed")
            if rec.get("nowScene") == f["id"] and not restyle:
                same += 1
                continue
            size, ymd = 700, d.replace("-", "")
            jpg = pc_crop("sentinel-2-l2a", f["id"], bbox, size, size, "jpg", {"assets": "visual", "asset_bidx": "visual|1,2,3", "nodata": "0"})
            now_path = "img/%s-now-%s.jpg" % (sid, ymd)
            files[now_path] = jpg
            new = {"now": now_path, "nowDate": d, "nowScene": f["id"]}
            # the change map against the 2018 picture, when the 2018 scene can be found again
            if rec.get("thenDate") and not rec.get("noThen"):
                then = [g for g in pc_search("sentinel-2-l2a", site["lat"], site["lng"], rec["thenDate"], rec["thenDate"], limit=10)]
                if then:
                    n0, a0 = ndvi_values(then[0]["id"], bbox, size, Image)
                    n1, a1 = ndvi_values(f["id"], bbox, size, Image)
                    s0, sa0 = scl_values(then[0]["id"], bbox, size, Image)
                    s1, sa1 = scl_values(f["id"], bbox, size, Image)
                    valid = veg = 0
                    raw_lost = [False] * (size * size)
                    for i in range(size * size):
                        if not (a0[i] and a1[i] and sa0[i] and sa1[i] and s0[i] in CLEAR_SCL and s1[i] in CLEAR_SCL):
                            continue
                        valid += 1
                        if n0[i] >= 0.25:
                            veg += 1
                            if n1[i] < 0.15 and n0[i] - n1[i] >= 0.18:
                                raw_lost[i] = True
                    kept = clean_mask(raw_lost, size)
                    lost = sum(kept)
                    over = Image.new("RGBA", (size, size), (0, 0, 0, 0))
                    px = over.load()
                    for i, on in enumerate(kept):
                        if on:
                            px[i % size, i // size] = (255, 61, 127, 215)
                    buf = io.BytesIO()
                    over.save(buf, "PNG", optimize=True)
                    chg_path = "img/%s-change-%s.png" % (sid, ymd)
                    files[chg_path] = buf.getvalue()
                    m = (rec.get("spanKm") or 7.0) * 1000 / size
                    new["change"] = {"lostHa": round(lost * m * m / 10000), "validPct": round(100 * valid / (size * size)),
                                     "method": "NDVI fell by at least 0.18, from vegetated (>= 0.25) to bare ground or water (< 0.15); isolated pixels removed",
                                     "file": chg_path, "from": rec["thenDate"], "to": d, "vegPct": round(100 * veg / valid) if valid else 0}
            rec.update(new)
            sites[sid] = rec
            fresh += 1
        except Exception as e:
            failed.append("%s: %s" % (sid, str(e)[:140]))
            log("  imagery %s: %s" % (sid, str(e)[:200]))
    if failed and not fresh and not same:
        raise RuntimeError("; ".join(failed[:3]))
    out = dict(prev)
    out.update({"sites": sites, "generated": TODAY.isoformat(),
                "source": "Copernicus Sentinel-2 L2A via Microsoft Planetary Computer; elevation: Copernicus DEM GLO-30 (ESA, from TanDEM-X data acquired 2011-2015)"})
    files["data/imagery.json"] = out
    return files, "ok (%d new pictures, %d unchanged, %d failed)" % (fresh, same, len(failed))



HEAT_STOPS = [(4.0, (255, 107, 20, 40)), (6.0, (255, 107, 20, 90)), (9.0, (255, 107, 20, 255)), (12.5, (255, 215, 106, 255)), (16.0, (255, 246, 220, 255))]


def heat_colour(an):
    """The page's legend: a faint orange at +4 C, then orange, gold and cream at +16 C and above.
    Weak anomalies stay faint, because sunny slopes alone can be a few degrees warmer than the valley."""
    if an >= HEAT_STOPS[-1][0]:
        return HEAT_STOPS[-1][1]
    for (a0, c0), (a1, c1) in zip(HEAT_STOPS, HEAT_STOPS[1:]):
        if an < a1:
            t = (an - a0) / (a1 - a0)
            return tuple(round(c0[k] + (c1[k] - c0[k]) * t) for k in range(4))
    return HEAT_STOPS[0][1]


def clean_mask(mask, size, need=3):
    """Keeps a pixel only if at least `need` of its 8 neighbours are also set: removes specks from shadows and snow."""
    out = [False] * (size * size)
    for i, on in enumerate(mask):
        if not on:
            continue
        x, y = i % size, i // size
        n = 0
        for dy in (-1, 0, 1):
            yy = y + dy
            if yy < 0 or yy >= size:
                continue
            row = yy * size
            for dx in (-1, 0, 1):
                xx = x + dx
                if (dx or dy) and 0 <= xx < size and mask[row + xx]:
                    n += 1
        out[i] = n >= need
    return out


def sun_cos_grid(terrain, span_km, sun_az, sun_el):
    """How directly the sun hits each cell of the site's height model (cosine of the incidence angle)."""
    n, h = terrain["n"], terrain["h"]
    d = span_km * 1000 / (n - 1)                        # metres between grid points
    az, el = math.radians(sun_az), math.radians(sun_el)
    sx, sy, sz = math.sin(az) * math.cos(el), math.cos(az) * math.cos(el), math.sin(el)   # east, north, up
    out = [0.0] * (n * n)
    for r in range(n):
        for c in range(n):
            e = (h[r * n + min(n - 1, c + 1)] - h[r * n + max(0, c - 1)]) / 10 / (d * (min(n - 1, c + 1) - max(0, c - 1)))
            no = (h[max(0, r - 1) * n + c] - h[min(n - 1, r + 1) * n + c]) / 10 / (d * (min(n - 1, r + 1) - max(0, r - 1)))   # row 0 is north
            norm = math.sqrt(e * e + no * no + 1)
            out[r * n + c] = (-e * sx - no * sy + sz) / norm
    return out


def sample_smooth(grid, n, size):
    """The n x n grid stretched over size x size pixels, blending smoothly between grid points
    (one flat block per cell left a stair-step pattern in the heat maps)."""
    out, k = [0.0] * (size * size), (n - 1) / size
    for y in range(size):
        gy = min(n - 1.0001, (y + 0.5) * k)
        r0, fy = int(gy), gy - int(gy)
        for x in range(size):
            gx = min(n - 1.0001, (x + 0.5) * k)
            c0, fx = int(gx), gx - int(gx)
            a, b = grid[r0 * n + c0], grid[r0 * n + c0 + 1]
            c, d = grid[(r0 + 1) * n + c0], grid[(r0 + 1) * n + c0 + 1]
            out[y * size + x] = (a * (1 - fx) + b * fx) * (1 - fy) + (c * (1 - fx) + d * fx) * fy
    return out


def heat_for(lat, lng, span_km, rec_heat, Image, restyle=False, terrain=None):
    """Landsat 8/9 surface temperature in the same square as the mine photo. When the site's height model is known,
    the warmth that sunlit slopes get from the sun is removed first (a fit of temperature against how directly the sun
    hits each slope); then every pixel is compared with the median of the ground within about 1 km.
    Returns (record, png bytes) or (None, None) when nothing new."""
    feats = pc_search("landsat-c2-l2", lat, lng, (TODAY - dt.timedelta(days=60)).isoformat(), TODAY.isoformat(), limit=12,
                      query={"eo:cloud_cover": {"lt": 25}, "platform": {"in": ["landsat-8", "landsat-9"]}})
    bbox, size = box(lat, lng, span_km), 512
    for f in feats[:4]:
        if (rec_heat or {}).get("scene") == f["id"] and not restyle:
            return None, None          # the newest usable scene is the one already shown
        raw = pc_crop("landsat-c2-l2", f["id"], bbox, size, size, "png",
                      {"expression": "lwir11*0.00341802+149.0-273.15", "asset_as_band": "True", "rescale": "-40,80", "nodata": "0", "resampling": "bilinear"})
        v, a = grey(Image.open(io.BytesIO(raw)), Image)
        T = [x * 120 / 255 - 40 if al else None for x, al in zip(v, a)]
        temps = sorted(t for t in T if t is not None)
        if len(temps) < 0.8 * size * size:
            continue
        p = f.get("properties") or {}
        method = "local"
        # remove the sun's effect on slopes, if the height model and the sun's position are known
        sun_az, sun_el = p.get("view:sun_azimuth"), p.get("view:sun_elevation")
        if terrain and isinstance(terrain.get("h"), list) and len(terrain["h"]) == terrain.get("n", 0) ** 2 and sun_az is not None and sun_el:
            n = terrain["n"]
            cg = sun_cos_grid(terrain, span_km, float(sun_az), float(sun_el))
            ci = sample_smooth(cg, n, size)
            lo, hi = temps[int(len(temps) * 0.05)], temps[int(len(temps) * 0.95)]
            pts = [(ci[i], T[i]) for i in range(size * size) if T[i] is not None and lo <= T[i] <= hi]
            if len(pts) > 1000:
                mx, my = sum(x for x, _ in pts) / len(pts), sum(y for _, y in pts) / len(pts)
                sxx = sum((x - mx) ** 2 for x, _ in pts)
                sxy = sum((x - mx) * (y - my) for x, y in pts)
                syy = sum((y - my) ** 2 for _, y in pts)
                b = sxy / sxx if sxx else 0
                r2 = (sxy * sxy / (sxx * syy)) if sxx and syy else 0
                if b > 0 and r2 >= 0.05:
                    T = [t - b * (ci[i] - mx) if t is not None else None for i, t in enumerate(T)]
                    method = "local+terrain"
        # local reference: median of 16-pixel blocks, then the median of the blocks within about 1 km
        bs, nb = 16, size // 16
        blocks = [[None] * nb for _ in range(nb)]
        for by in range(nb):
            for bx in range(nb):
                vals = sorted(T[(by * bs + yy) * size + bx * bs + xx] for yy in range(bs) for xx in range(bs) if T[(by * bs + yy) * size + bx * bs + xx] is not None)
                blocks[by][bx] = vals[len(vals) // 2] if vals else None
        r = max(1, round(1000 / (span_km * 1000 / size) / bs))
        ref = [[None] * nb for _ in range(nb)]
        for by in range(nb):
            for bx in range(nb):
                near = sorted(blocks[y][x] for y in range(max(0, by - r), min(nb, by + r + 1)) for x in range(max(0, bx - r), min(nb, bx + r + 1)) if blocks[y][x] is not None)
                ref[by][bx] = near[len(near) // 2] if near else None
        over = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        px = over.load()
        hot = 0
        max_anom = -99.0
        for i in range(size * size):
            if T[i] is None:
                continue
            rf = ref[(i // size) // bs][(i % size) // bs]
            if rf is None:
                continue
            an = T[i] - rf
            max_anom = max(max_anom, an)
            if an > 8:
                hot += 1
            if an >= 4:
                px[i % size, i // size] = heat_colour(an)
        buf = io.BytesIO()
        over.save(buf, "PNG", optimize=True)
        m = span_km * 1000 / size
        rec = {"date": p.get("datetime", "")[:10], "scene": f["id"], "platform": p.get("platform"),
               "medianC": round(temps[len(temps) // 2], 1), "maxC": round(temps[-1], 1), "p995C": round(temps[int(len(temps) * 0.995) - 1], 1),
               "hotHa": round(hot * m * m / 10000, 1), "maxAnomC": round(max_anom, 1), "method": method, "time": p.get("datetime", "")[11:16]}
        return rec, buf.getvalue()
    return None, None


def feed_radar(prev):
    """The newest Sentinel-1 radar picture of each site (radar sees through cloud)."""
    Image, _ = need_pillow()
    prev = prev or {}
    sites = {k: dict(v) for k, v in (prev.get("sites") or {}).items()}
    img = current("data/imagery.json") or {}
    cfg = {s["id"]: s for s in CFG["sites"]}
    if not sites:
        raise RuntimeError("could not read data/orbit-extras.json from the website, so nothing was changed")
    files, fresh, same, failed, heat_new = {}, 0, 0, [], [0, 0]
    order, done = sorted(sites, key=lambda k: sites[k].get("checkedAt") or ""), 0
    for sid in order:
        if time_left() < 100:
            files["_partial"] = "%d of %d sites" % (done, len(order))
            break
        done += 1
        rec, irec = dict(sites[sid]), (img.get("sites") or {}).get(sid) or {}
        rec["checkedAt"] = iso()
        sites[sid] = rec
        lat, lng = irec.get("lat", (cfg.get(sid) or {}).get("lat")), irec.get("lng", (cfg.get(sid) or {}).get("lng"))
        if lat is None:
            continue
        try:
            changed = False
            feats = pc_search("sentinel-1-rtc", lat, lng, (TODAY - dt.timedelta(days=24)).isoformat(), TODAY.isoformat(), limit=10)
            if feats and (rec.get("radar") or {}).get("scene") != feats[0]["id"]:
                f = feats[0]
                p = f.get("properties") or {}
                d = p.get("datetime", "")[:10]
                jpg = pc_crop("sentinel-1-rtc", f["id"], box(lat, lng, irec.get("spanKm") or 7.0), 512, 512, "jpg", {"assets": "vv", "rescale": "0,0.35"})
                path = "img/%s-radar-%s.jpg" % (sid, d.replace("-", ""))
                files[path] = jpg
                rec["radar"] = {"file": path, "date": d, "scene": f["id"], "orbit": p.get("sat:orbit_state"), "platform": p.get("platform")}
                changed = True
            try:
                terrain = current(irec["terrain"]) if irec.get("terrain") else None
                hrec, png = heat_for(lat, lng, irec.get("spanKm") or 7.0, rec.get("heat"), Image, restyle=(rec.get("heat") or {}).get("style") != 5, terrain=terrain)
                if hrec:
                    path = "img/%s-heat-%s-5.png" % (sid, hrec["date"].replace("-", ""))   # a new name, so browsers cannot show an old copy
                    files[path] = png
                    rec["heat"] = dict(hrec, file=path, style=5)
                    heat_new[0] += 1
                    changed = True
            except Exception as e:
                log("  heat %s: %s" % (sid, str(e)[:200]))
                heat_new[1] += 1
            sites[sid] = rec
            if changed:
                fresh += 1
            else:
                same += 1
        except Exception as e:
            failed.append("%s: %s" % (sid, str(e)[:140]))
            log("  radar %s: %s" % (sid, str(e)[:200]))
    if failed and not fresh and not same:
        raise RuntimeError("; ".join(failed[:3]))
    out = dict(prev)
    srcs = dict(out.get("sources") or {})
    srcs["radar"] = "Copernicus Sentinel-1 RTC (Microsoft Planetary Computer)"
    srcs["heat"] = ("Landsat 8 and 9 Collection 2 Level-2 surface temperature, USGS (Microsoft Planetary Computer); "
                    "warmth from sunlit slopes removed using the Copernicus DEM, then each pixel compared with the median of the ground within about 1 km")
    out.update({"sites": sites, "generated": TODAY.isoformat(), "sources": srcs})
    files["data/orbit-extras.json"] = out
    return files, "ok (%d sites with new pictures, %d unchanged, %d failed; heat maps: %d new, %d failed)" % (fresh, same, len(failed), heat_new[0], heat_new[1])


# ---------------------------------------------------------------- part five: automatic news (GDELT) and the weekly summary

MAT_NAME = {"ree": ("Rare earths", "Vzácné zeminy"), "ti": ("Titanium", "Titan"), "w": ("Tungsten", "Wolfram"), "sb": ("Antimony", "Antimon"),
            "ga": ("Gallium", "Galium"), "ge": ("Germanium", "Germanium"), "li": ("Lithium", "Lithium"), "co": ("Cobalt", "Kobalt"),
            "ni": ("Nickel", "Nikl"), "gr": ("Graphite", "Grafit")}
NEWS_Q = {"ree": '("rare earth" OR "rare earths" OR neodymium OR dysprosium)', "ti": '("titanium sponge" OR "titanium supply" OR "titanium mine" OR "titanium export")',
          "w": "tungsten", "sb": "antimony", "ga": "gallium", "ge": "germanium",
          "li": '("lithium mine" OR "lithium supply" OR "lithium refinery" OR "lithium price" OR "lithium export")',
          "co": '("cobalt export" OR "cobalt supply" OR "cobalt mine" OR "cobalt price" OR "cobalt quota")',
          "ni": '("nickel mine" OR "nickel smelter" OR "nickel ore" OR "nickel price" OR "nickel supply")', "gr": "graphite"}
NEWS_KW = {"ree": r"rare[ -]?earth|neodymium|dysprosium|terbium|praseodymium", "ti": r"titanium", "w": r"tungsten", "sb": r"antimony",
           "ga": r"gallium", "ge": r"germanium", "li": r"lithium", "co": r"cobalt", "ni": r"nickel", "gr": r"graphite"}
NEWS_SPAM = (r"market (size|share|report|research|analysis|outlook|growth|trends|insights)|\bCAGR\b|forecast (to|till|period)|\b20\d\d\s*[-–]\s*20\d\d\b|"
             r"press release|sponsored|price target|stock (price|forecast|analysis)|shares? (rise|fall|jump|drop|surge|slump|soar|plunge)|\bETF\b|dividend|horoscope")
NEWS_BLOCK = ("openpr.", "einpresswire.", "globenewswire.", "prnewswire.", "digitaljournal.", "marketsandmarkets.", "taiwannews.", "newstrail.", "whatech.",
              "benzinga.", "fool.com", "zacks.", "marketbeat.", "tipranks.", "investorsobserver.", "stocktitan.")


NEWS_GROUPS = [   # GDELT refuses long questions: about five terms each
    '("rare earth" OR "rare earths" OR neodymium OR dysprosium OR tungsten)',
    '(antimony OR gallium OR germanium OR "titanium sponge" OR graphite)',
    '("lithium mine" OR "lithium supply" OR "lithium price" OR "lithium refinery" OR "lithium export")',
    '("nickel mine" OR "nickel smelter" OR "nickel price" OR "cobalt price" OR "cobalt export")',
]


def gdelt(q, span="3d"):
    """One GDELT question. GDELT allows one request every 5 seconds from an address, and GitHub's machines share
    addresses with many other users, so a 'slow down' answer gets one wait of 30 seconds and one more try."""
    url = "https://api.gdeltproject.org/api/v2/doc/doc?" + urllib.parse.urlencode(
        {"query": q + " sourcelang:english", "mode": "ArtList", "format": "json", "maxrecords": 250, "sort": "DateDesc", "timespan": span})
    for attempt in range(2):
        try:
            raw = http(url, timeout=30, tries=1).decode("utf-8", "replace").strip()
        except urllib.error.HTTPError as e:
            if e.code == 429 and attempt == 0:
                time.sleep(30)
                continue
            raise
        if raw.startswith("{"):
            return json.loads(raw).get("articles") or []
        if "limit requests" in raw.lower() and attempt == 0:
            time.sleep(30)
            continue
        raise RuntimeError("GDELT: " + raw[:120])
    return []


NEWS_RSS = [   # public feeds of mining, defence and space news sites; a feed that fails is skipped for that run
    ("mining.com", "https://www.mining.com/feed/"),
    ("mining-technology.com", "https://www.mining-technology.com/feed/"),
    ("northernminer.com", "https://www.northernminer.com/feed/"),
    ("breakingdefense.com", "https://breakingdefense.com/feed/"),
    ("defensenews.com", "https://www.defensenews.com/arc/outboundfeeds/rss/?outputType=xml"),
    ("spacenews.com", "https://spacenews.com/feed/"),
]


def rss_items(url):
    """Title, link and date of each item in an RSS or Atom feed."""
    import xml.etree.ElementTree as ET
    from email.utils import parsedate_to_datetime
    raw = http(url, timeout=30, tries=1)
    root = ET.fromstring(raw)
    out = []
    for it in root.iter():
        tag = it.tag.rsplit("}", 1)[-1]
        if tag not in ("item", "entry"):
            continue
        get = lambda name: next((c for c in it if c.tag.rsplit("}", 1)[-1] == name), None)
        t, l = get("title"), get("link")
        link = (l.get("href") if l is not None and l.get("href") else (l.text if l is not None else "")) or ""
        d = next((x for x in (get("pubDate"), get("published"), get("updated")) if x is not None), None)   # an element without children is falsy
        day = ""
        if d is not None and d.text:
            try:
                day = parsedate_to_datetime(d.text.strip()).date().isoformat()
            except (TypeError, ValueError):
                day = d.text.strip()[:10]
        out.append(((t.text or "").strip() if t is not None else "", link.strip(), day))
    return out


def feed_news(prev):
    """Recent English headlines for the ten materials from GDELT (two grouped questions), each sorted to its material(s)
    by the words in its title and marked as found automatically and not checked."""
    import re, html as H
    items = [x for x in (prev if isinstance(prev, list) else []) if isinstance(x, dict) and x.get("title")]
    have_url = {x.get("url") for x in items}
    norm = lambda t: re.sub(r"[^a-z0-9]+", " ", t.lower()).strip()
    have_title = {norm(x["title"]) for x in items}
    per_mat, added, errors, answered, throttled = {}, 0, [], 0, 0
    feeds_ok = 0

    def take(title, url, dom, day):
        nonlocal added
        title = H.unescape(title or "").strip()
        dom = (dom or "").lower()
        if not title or not url.startswith("https://") or url in have_url or norm(title) in have_title:
            return
        if re.search(NEWS_SPAM, title, re.I) or any(b in dom for b in NEWS_BLOCK):
            return
        mats = [k for k, kw in NEWS_KW.items() if re.search(kw, title, re.I)]
        if not mats or per_mat.get(mats[0], 0) >= 3:
            return
        if not re.match(r"^\d{4}-\d{2}-\d{2}$", day or "") or day < (TODAY - dt.timedelta(days=7)).isoformat():
            return
        items.append({"id": "%s-auto-%s" % (day, hashlib.md5(url.encode()).hexdigest()[:8]), "date": day, "title": title[:220], "url": url,
                      "source": dom[4:] if dom.startswith("www.") else dom, "materials": mats, "lang": "en", "auto": True, "foundAt": TODAY.isoformat()})
        have_url.add(url)
        have_title.add(norm(title))
        per_mat[mats[0]] = per_mat.get(mats[0], 0) + 1
        added += 1

    for dom, url in NEWS_RSS:
        try:
            for title, link, day in rss_items(url):
                take(title, link, dom, day)
            feeds_ok += 1
        except Exception as e:
            errors.append("%s %s" % (dom, why(e)[:60]))
    answered += feeds_ok
    first = int(time.time() // 3600) % len(NEWS_GROUPS)          # a different first question each run
    for k in range(min(2, len(NEWS_GROUPS))):
        gi = (first + k) % len(NEWS_GROUPS)
        q = NEWS_GROUPS[gi]
        if k:
            if time_left() < 150:
                errors.append("questions left for the next run")
                break
            time.sleep(20)
        try:
            arts = gdelt(q)
            answered += 1
        except Exception as e:
            msg = why(e)
            if "429" in msg or "limit requests" in msg.lower():
                throttled += 1
                msg = "busy"
            errors.append("question %d %s" % (gi + 1, msg))
            continue
        for a in arts:
            sd = str(a.get("seendate") or "")
            take(str(a.get("title") or ""), str(a.get("url") or ""), str(a.get("domain") or ""),
                 "%s-%s-%s" % (sd[0:4], sd[4:6], sd[6:8]) if len(sd) >= 8 else TODAY.isoformat())
    if not answered:
        last = parse_iso((current("live-data/meta/status.json") or {}).get("lastRun"))
        if throttled and last and (NOW - last).total_seconds() < 48 * 3600:
            return None, "skipped: GDELT asked to slow down; the next run tries again"
        raise RuntimeError("; ".join(errors[:4]))
    items.sort(key=lambda x: (str(x.get("date", "")), 0 if x.get("auto") else 1), reverse=True)
    cut = (TODAY - dt.timedelta(days=45)).isoformat()
    keep = [x for x in items if str(x.get("date", "")) >= cut]
    if len(keep) < 20:
        keep = items[:20]
    meta = current("live-data/meta/status.json") or {}
    meta = dict(meta, lastRun=iso(), news="GDELT, automatic")
    upload("live-data/meta/status.json", meta)
    return keep[:160], "ok (%d new stories: %s; %d of %d news feeds read%s)" % (added, ", ".join("%s %d" % (k, v) for k, v in sorted(per_mat.items())) or "none", feeds_ok, len(NEWS_RSS),
                                                       ("; " + "; ".join(errors[:2])) if errors else "")


MON_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
MON_CS = ["ledna", "února", "března", "dubna", "května", "června", "července", "srpna", "září", "října", "listopadu", "prosince"]
MONTH_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
MONTH_CS = ["leden", "únor", "březen", "duben", "květen", "červen", "červenec", "srpen", "září", "říjen", "listopad", "prosinec"]


def day_txt(d, cs):
    d = str(d)[:10]
    y, mo, dd = int(d[:4]), int(d[5:7]), int(d[8:10])
    return "%d. %s %d" % (dd, MON_CS[mo - 1], y) if cs else "%d %s %d" % (dd, MON_EN[mo - 1], y)


def deadlines_from_page():
    """The atlas's own list of upcoming deadlines, read from the page itself."""
    import re
    page = ""
    for f in ("index.html", "atlas-main.js"):      # the deadline list moved into atlas-main.js in v15.3
        try:
            page += http(BASE + f + "?u=%d" % time.time(), timeout=60).decode("utf-8", "replace") + "\n"
        except Exception:
            pass
    if not page:
        return []
    out = []
    for m in re.finditer(r'\{ date: "(\d{4}-\d{2}-\d{2})", materials: \[([^\]]*)\], title: "((?:[^"\\]|\\.)*)", title_cs: "((?:[^"\\]|\\.)*)"(?:, source: "((?:[^"\\]|\\.)*)")?(?:, url: "([^"]*)")?', page):
        un = lambda t: (t or "").replace("\\'", "'").replace('\\"', '"')
        out.append({"date": m.group(1), "materials": re.findall(r'"(\w+)"', m.group(2)), "title": un(m.group(3)), "title_cs": un(m.group(4)),
                    "source": un(m.group(5)), "url": m.group(6) or ""})
    return sorted(out, key=lambda x: x["date"])


AREA_NAME = {"choke:suez": ("the Bab-el-Mandeb strait", "úžiny Bab al-Mandab"), "choke:malacca": ("the Strait of Malacca", "Malacké úžiny"),
             "route:lobito": ("the Lobito corridor in Angola", "Lobitského koridoru v Angole"), "route:lobito-cd": ("the Lobito corridor in DR Congo", "Lobitského koridoru v DR Kongo")}


def feed_brief(prev):
    """Every Monday: a short summary of the week put together from the atlas's own data and headlines. No person or AI writes it."""
    briefs = [b for b in (prev if isinstance(prev, list) else []) if isinstance(b, dict)]
    monday = (TODAY - dt.timedelta(days=TODAY.weekday())).isoformat()
    this = next((b for b in briefs if b.get("week") == monday), None)
    if this and (not this.get("auto") or not FORCE):
        return None, "skipped: this week's brief exists"
    if TODAY.weekday() != 0 and not FORCE and any(b.get("week", "") >= (TODAY - dt.timedelta(days=7)).isoformat() for b in briefs):
        return None, "skipped: written on Mondays"
    names = {s["id"]: s["name"] for s in CFG["sites"]}
    smat = {s["id"]: s["m"] for s in CFG["sites"]}
    pts, watch_en, watch_cs = [], [], []
    # 1. the next deadline
    dls = [d for d in deadlines_from_page() if d["date"] >= TODAY.isoformat()]
    if dls:
        d = dls[0]
        n = (dt.date.fromisoformat(d["date"]) - TODAY).days
        mats_en = ", ".join(MAT_NAME[m][0] for m in d["materials"] if m in MAT_NAME) or "Deadline"
        mats_cs = ", ".join(MAT_NAME[m][1] for m in d["materials"] if m in MAT_NAME) or "Termín"
        pts.append({"materials": d["materials"], "source": d["source"] or "OreOrbit calendar", "url": d["url"],
                    "text": "%s: %s on %s, in %d days." % (mats_en, d["title"], day_txt(d["date"], False), n),
                    "text_cs": "%s: %s, %s, za %d dní." % (mats_cs, d["title_cs"] or d["title"], day_txt(d["date"], True), n)})
        for x in dls[:3]:
            if x["date"] <= (TODAY + dt.timedelta(days=90)).isoformat():
                watch_en.append("%s: %s" % (day_txt(x["date"], False), x["title"]))
                watch_cs.append("%s: %s" % (day_txt(x["date"], True), x["title_cs"] or x["title"]))
    # 2. heat at the plants
    hs = (current("live-data/live/hotspots.json") or {}).get("sites") or {}
    hot = sorted(((v.get("daysHot7") or 0, k) for k, v in hs.items() if v.get("daysHot7")), reverse=True)
    if hs:
        if hot:
            d7, sid = hot[0]
            pts.append({"materials": [smat.get(sid)] if smat.get(sid) else [], "source": "NASA FIRMS", "url": "https://firms.modaps.eosdis.nasa.gov",
                        "text": "Heat at the plants: %d of %d sites showed furnace-hot pixels in the last 7 days, %s the most often (%d of 7 days)." % (len(hot), len(hs), names.get(sid, sid), d7),
                        "text_cs": "Teplo v závodech: %d z %d lokalit mělo za posledních 7 dní pixely horké jako pec, nejčastěji %s (%d ze 7 dní)." % (len(hot), len(hs), names.get(sid, sid), d7)})
    # 3. sulphur dioxide
    so = current("live-data/live/so2.json") or {}
    wk = (TODAY - dt.timedelta(days=9)).isoformat()
    so_hi = sorted(((sum(1 for x in (v.get("series") or []) if x.get("d", "") >= wk and (x.get("near") or 0) >= 2), k) for k, v in (so.get("sites") or {}).items()), reverse=True)
    if so_hi and so_hi[0][0]:
        n, sid = so_hi[0]
        pts.append({"materials": [smat.get(sid)] if smat.get(sid) else [], "source": "NASA GIBS", "url": "https://worldview.earthdata.nasa.gov",
                    "text": "Sulphur dioxide: %s read above 2 Dobson units on %d of the days seen this week." % (names.get(sid, sid), n),
                    "text_cs": "Oxid siřičitý: %s měl nad 2 Dobsonovy jednotky %s tohoto týdne." % (names.get(sid, sid), "v 1 viděném dni" if n == 1 else "v %d viděných dnech" % n)})
    # 4. armed conflict
    cf = current("live-data/live/conflict.json") or {}
    if cf.get("areas") and cf.get("to"):
        mo = str(cf["to"])[:7]
        per = sorted(((v.get("byMonth") or {}).get(mo, 0), k) for k, v in cf["areas"].items())
        tot = sum(n for n, _ in per)
        if tot:
            n, w = per[-1]
            nm_en, nm_cs = AREA_NAME.get(w, (names.get(w, w), names.get(w, w)))
            y, mm = int(mo[:4]), int(mo[5:7])
            pts.append({"materials": [smat.get(w)] if smat.get(w) else [], "source": "UCDP", "url": "https://ucdp.uu.se/downloads/",
                        "text": "Armed conflict: %d events near the supply chain in %s %d, most of them around %s (%d)." % (tot, MONTH_EN[mm - 1], y, nm_en, n),
                        "text_cs": "Ozbrojené konflikty: %d událostí poblíž dodavatelského řetězce v měsíci %s %d, nejvíc v okolí %s (%d)." % (tot, MONTH_CS[mm - 1], y, nm_cs, n)})
    # 5. EU defence tenders
    td = current("live-data/live/tenders.json") or {}
    sr, mons = td.get("series") or {}, td.get("months") or []
    if sr and len(mons) >= 13:
        last = {k: v[-2] for k, v in sr.items() if len(v) >= 13}
        avg = {k: round(sum(v[-14:-2]) / 12) for k, v in sr.items() if len(v) >= 14}
        y, mm = int(mons[-2][:4]), int(mons[-2][5:7])
        if last and avg:
            pts.append({"materials": [], "source": "TED", "url": "https://ted.europa.eu",
                        "text": "EU defence tenders: %d weapons, %d ammunition and %d explosives notices in %s, against monthly averages of %d, %d and %d over the year before." % (
                            last.get("weapons", 0), last.get("ammunition", 0), last.get("explosives", 0), MONTH_EN[mm - 1], avg.get("weapons", 0), avg.get("ammunition", 0), avg.get("explosives", 0)),
                        "text_cs": "Obranné zakázky v EU: %d oznámení na zbraně, %d na munici a %d na výbušniny v měsíci %s, proti měsíčním průměrům %d, %d a %d za předchozí rok." % (
                            last.get("weapons", 0), last.get("ammunition", 0), last.get("explosives", 0), MONTH_CS[mm - 1], avg.get("weapons", 0), avg.get("ammunition", 0), avg.get("explosives", 0))})
    # 6. China's share of EU imports, the highest this month
    tr = (current("live-data/live/trade.json") or {}).get("materials") or {}
    best = None
    for m, rows in tr.items():
        for r in rows:
            mo = r.get("monthly") or {}
            cn, ext = mo.get("cn") or [], mo.get("ext") or []
            if cn and ext and ext[-1] and ext[-1] > 1e6:
                share = cn[-1] / ext[-1]
                if not best or share > best[0]:
                    best = (share, m, r.get("label", r.get("code")), mo.get("from"), len(ext))
    if best:
        share, m, label, frm, n = best
        y, mm = int(frm[:4]), int(frm[5:7]) + n - 1
        y, mm = y + (mm - 1) // 12, (mm - 1) % 12 + 1
        pts.append({"materials": [m], "source": "Eurostat Comext", "url": "https://ec.europa.eu/eurostat/comext/newxtweb/",
                    "text": "EU imports: China supplied %d%% of what the EU bought from outside the EU of %s (%s) in %s %d, the highest share among the products tracked." % (round(share * 100), label.lower(), MAT_NAME[m][0].lower(), MONTH_EN[mm - 1], y),
                    "text_cs": "Dovoz do EU: Čína dodala %d %% toho, co EU nakoupila mimo EU, u položky %s (%s) v měsíci %s %d, nejvyšší podíl ze sledovaných produktů." % (round(share * 100), label, MAT_NAME[m][1].lower(), MONTH_CS[mm - 1], y)})
    # 7. the week's headlines
    news = current("live-data/news.json") or []
    week_news = [x for x in news if isinstance(x, dict) and str(x.get("date", "")) >= (TODAY - dt.timedelta(days=7)).isoformat()]
    for x in week_news[:3]:
        pts.append({"materials": x.get("materials") or [], "source": "%s, %s" % (x.get("source", ""), day_txt(x.get("date", TODAY.isoformat()), False)[:-5]),
                    "url": x.get("url", ""), "text": x.get("title", ""), "text_cs": x.get("title_cs") or x.get("title", "")})
    counts = {}
    for x in week_news:
        for m in x.get("materials") or []:
            counts[m] = counts.get(m, 0) + 1
    top = sorted(counts.items(), key=lambda kv: -kv[1])[:2]
    if top:
        watch_en.append("Most covered this week: " + ", ".join("%s (%d stories)" % (MAT_NAME[m][0], n) for m, n in top if m in MAT_NAME))
        watch_cs.append("Nejvíc zpráv tento týden: " + ", ".join("%s (%d)" % (MAT_NAME[m][1], n) for m, n in top if m in MAT_NAME))
    alerts = len((current("live-data/live/hazards.json") or {}).get("alerts") or [])
    brief = {"id": monday, "week": monday, "auto": True, "writtenAt": TODAY.isoformat(),
             "title": "The week in data, %s" % day_txt(monday, False), "title_cs": "Týden v datech, %s" % day_txt(monday, True),
             "lede": "%d stories on the ten materials in the last 7 days, %d of %d plants with furnace-hot pixels, and %d serious disaster alerts worldwide." % (len(week_news), len(hot), len(hs) or 31, alerts),
             "lede_cs": "%d zpráv o deseti surovinách za posledních 7 dní, %d z %d závodů s pixely horkými jako pec a %d vážných výstrah před katastrofami ve světě." % (len(week_news), len(hot), len(hs) or 31, alerts),
             "points": pts[:8], "soWhat": "", "soWhat_cs": "", "watchNext": watch_en, "watchNext_cs": watch_cs}
    briefs = [b for b in briefs if b.get("week") != monday] + [brief]
    briefs.sort(key=lambda b: str(b.get("week") or b.get("id") or ""), reverse=True)
    return briefs[:12], "ok (week of %s, %d points)" % (monday, len(pts[:8]))


def feed_memory(prev):
    """Once a week: opens the live atlas in an invisible Chrome and saves the page's own snapshot of the state of
    every material (window.__atlasSnapshot), which the page compares week on week. This is what the Monday task did."""
    import subprocess
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        subprocess.run([sys.executable, "-m", "pip", "install", "--quiet", "playwright"], check=True, capture_output=True, timeout=180)
        from playwright.sync_api import sync_playwright

    def install(with_deps):
        """The browser alone (GitHub's machines already have nearly all its system libraries); the slower
        system-package step only if the browser cannot start without it. Both with a strict time limit."""
        cmd = [sys.executable, "-m", "playwright", "install"] + (["--with-deps"] if with_deps else []) + ["chromium"]
        limit = max(60, min(420 if with_deps else 240, int(time_left()) - 150))
        try:
            r = subprocess.run(cmd, capture_output=True, text=True, timeout=limit)
        except subprocess.TimeoutExpired:
            raise RuntimeError("installing the browser took longer than %d s; the next run tries again" % limit)
        if r.returncode:
            raise RuntimeError("could not install the browser: " + (r.stderr or r.stdout)[-300:])
    exe = os.environ.get("CHROMIUM_PATH") or None
    def snapshot():
        with sync_playwright() as p:
            b = p.chromium.launch(executable_path=exe, args=["--use-angle=swiftshader", "--enable-unsafe-swiftshader"])
            pg = b.new_page(viewport={"width": 1280, "height": 900})
            pg.goto(BASE + "?nobloom", wait_until="domcontentloaded", timeout=90000)
            pg.wait_for_function("typeof window.__atlasSnapshot === 'function'", timeout=90000)
            pg.wait_for_timeout(20000)                     # let the live data arrive
            snap = pg.evaluate("window.__atlasSnapshot()")
            b.close()
            return snap
    try:
        snap = snapshot()
    except Exception as e:
        if exe or ("Executable doesn't exist" not in str(e) and "playwright install" not in str(e)):
            raise
        install(False)
        try:
            snap = snapshot()
        except Exception as e2:
            if "shared librar" not in str(e2).lower() and "missing dependencies" not in str(e2).lower() and "install-deps" not in str(e2):
                raise
            if time_left() < 8 * 60:
                raise RuntimeError("the browser needs system libraries and too little time is left; the next run tries again")
            install(True)
            snap = snapshot()
    if not isinstance(snap, dict) or not isinstance(snap.get("mats"), dict) or len(snap["mats"]) < 5:
        raise RuntimeError("the page gave no usable snapshot")
    mem = [x for x in (prev if isinstance(prev, list) else []) if isinstance(x, dict) and x.get("date") != snap.get("date")]
    mem.append(snap)
    mem.sort(key=lambda x: str(x.get("date", "")), reverse=True)
    return mem[:12], "ok (snapshot of %s, %d materials, %d weeks kept)" % (snap.get("date"), len(snap["mats"]), len(mem[:12]))


# ---------------------------------------------------------------- part six: the readable pages (library, About, Legal, sitemap)

def feed_pages(prev):
    """Rebuilds the readable, citable pages from the same data as the atlas (see oreorbit_pages.py)."""
    import re
    import oreorbit_pages as P
    ref = current("data/reference.json")
    if not isinstance(ref, dict) or not ref.get("materials") or not ref.get("sites"):
        raise RuntimeError("could not read data/reference.json from the website")
    get = lambda path: current(path) or {}
    live = {"trade": get("live-data/live/trade.json"), "imagery": get("data/imagery.json"), "extras": get("data/orbit-extras.json"),
            "hotspots": get("live-data/live/hotspots.json"), "so2": get("live-data/live/so2.json"), "conflict": get("live-data/live/conflict.json"),
            "news": current("live-data/news.json") or []}
    cfg = {}
    try:
        txt = http(BASE + "config.js?u=%d" % time.time(), timeout=30).decode("utf-8", "replace")
        cfg = {k: v for k, v in re.findall(r'(\w+)\s*:\s*"([^"]*)"', txt) if v}
    except Exception:
        pass
    return P.build(ref, live, cfg, TODAY.isoformat()), "ok"



# ---------------------------------------------------------------- run

INTERVAL_H = {"orbits": 2.5, "hazards": 2.5, "scenes": 2.5, "ships": 2.5, "hotspots": 11, "prices": 23, "traffic": 144,
              "clouds": 2.5, "conflict": 144, "tenders": 144, "trade": 144, "so2": 144, "imagery": 144, "radar": 144, "news": 5.5, "brief": 2.5, "memory": 160, "pages": 20}


def main():
    log("OreOrbit updater v3.2 · %s · %s · %s" % (iso(), BASE, "DRY RUN" if DRY else "live"))
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
                     ("trade", feed_trade), ("so2", feed_so2), ("news", feed_news), ("brief", feed_brief), ("imagery", feed_imagery), ("radar", feed_radar), ("memory", feed_memory), ("pages", feed_pages)]:
        st = dict(status.get(name) or {})
        st["checked"] = iso()
        if ONLY and name not in ONLY:
            log("%-9s not in this run" % name)
            continue
        if name in HEAVY and time_left() < (8 if name == "memory" else 5) * 60:
            st["status"] = "postponed: this run's time was used up; it runs next time"
            status[name] = st
            log("%-9s %s" % (name, st["status"]))
            continue
        if not due(name):
            st["status"] = "skipped: refreshed less than %s ago" % (("%d hours" % INTERVAL_H[name]) if INTERVAL_H[name] < 48 else "%d days" % (INTERVAL_H[name] // 24))
            status[name] = st
            log("%-9s %s" % (name, st["status"]))
            continue
        path = {"imagery": "data/imagery.json", "radar": "data/orbit-extras.json", "news": "live-data/news.json", "brief": "live-data/briefs.json", "memory": "live-data/memory.json", "pages": "p/index.html"}.get(name, "live-data/live/%s.json" % name)
        t0 = time.time()
        try:
            prev = current(path)
            if name == "hotspots":
                obj, note = fn(prev, hist)
                ran_hist = obj is not None
            else:
                obj, note = fn(prev)
            if obj is None:
                st["status"] = note
            elif name in ("imagery", "radar"):
                partial = obj.pop("_partial", None)
                pics = [p for p in obj if p.startswith("img/")]
                for p in pics:
                    upload_bytes(p, obj[p])
                res = upload(path, obj[path])
                if partial:
                    note = note + " · partial: %s checked, the rest next run" % partial
                    st.update({"fails": 0, "status": note})       # not marked ok, so it continues next run
                else:
                    st.update({"ok": iso(), "fails": 0, "status": note})
                note = note + " · %d pictures sent · %s" % (len(pics), res)
            elif name == "pages":
                res = [upload_bytes(p, h.encode("utf-8")) for p, h in obj.items()]
                sent = sum(1 for r in res if r != "unchanged")
                st.update({"ok": iso(), "fails": 0, "status": "ok (%d pages)" % len(obj)})
                note = "ok (%d pages and the sitemap, %d changed)" % (len(obj) - 1, sent)
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
            log("%-9s %s (%ds)" % (name, note, time.time() - t0))
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
    stuck = [k for k, v in status.items() if k in INTERVAL_H and int(v.get("fails") or 0) >= 3]
    if stuck:
        log("feeds that have failed 3 runs or more in a row: %s. The run is marked as failed so GitHub emails you." % ", ".join(stuck))
        sys.exit(1)


if __name__ == "__main__":
    main()
