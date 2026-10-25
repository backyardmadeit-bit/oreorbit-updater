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
        gd = jget("https://www.gdacs.org/gdacsapi/api/events/geteventlist/MAP")
        alerts = []
        for f in gd.get("features", []):
            p, c = f.get("properties") or {}, (f.get("geometry") or {}).get("coordinates") or []
            t, lvl = str(p.get("eventtype", "")).upper(), str(p.get("alertlevel", "")).lower()
            if t not in GDACS_TYPES or lvl not in ("orange", "red") or len(c) < 2 or not isinstance(c[0], (int, float)):
                continue
            sev = p.get("severitydata") or {}
            url = (p.get("url") or {}).get("report") if isinstance(p.get("url"), dict) else p.get("url")
            alerts.append({"id": "%s%s" % (t, p.get("eventid")), "type": t, "lat": round(c[1], 4), "lng": round(c[0], 4),
                           "from": p.get("fromdate"), "to": p.get("todate"), "name": p.get("name") or p.get("eventname") or "",
                           "country": p.get("country") or "", "level": lvl, "severity": sev.get("severitytext") or "",
                           "url": url if isinstance(url, str) and url.startswith("https://") else None})
        out["alerts"] = alerts
        out["gdacsAt"] = iso()
        note += ", %d GDACS alerts" % len(alerts)
    except Exception as e:
        note += ", GDACS kept from last run (%s)" % str(e)[:60]
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


# ---------------------------------------------------------------- run

INTERVAL_H = {"orbits": 2.5, "hazards": 2.5, "scenes": 2.5, "ships": 2.5, "hotspots": 11, "prices": 23, "traffic": 144}


def main():
    log("OreOrbit updater %s · %s · %s" % (iso(), BASE, "DRY RUN" if DRY else "live"))
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
                     ("hotspots", feed_hotspots), ("prices", feed_prices), ("traffic", feed_traffic)]:
        st = dict(status.get(name) or {})
        st["checked"] = iso()
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
