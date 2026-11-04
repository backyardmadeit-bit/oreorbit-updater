#!/usr/bin/env python3
"""Builds the library pages (updater/oreorbit_pages.build) into a folder, the way the robot does, and checks them.

Data: atlas/data/reference.json and atlas/config.js from this repo; the robot's live files from atlas/ when
they exist locally, otherwise from the live website (read-only GET). Every page must build and every JSON-LD
block must parse. Nothing is uploaded anywhere.

Usage: build_pages.py OUT_DIR
"""
import json
import os
import re
import sys
import urllib.request
from datetime import date

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = os.environ.get("ATLAS_BASE", "https://bohemiadefense.com/atlas/")
sys.path.insert(0, os.path.join(ROOT, "updater"))


def get(path, default):
    local = os.path.join(ROOT, "atlas", path)
    try:
        if os.path.exists(local):
            return json.load(open(local, encoding="utf-8"))
        req = urllib.request.Request(BASE + path, headers={"User-Agent": "oreorbit-build-check"})
        with urllib.request.urlopen(req, timeout=30) as r:
            return json.loads(r.read().decode("utf-8"))
    except Exception as ex:
        print("note: %s not available (%s), using empty data" % (path, ex))
        return default


def main():
    out_dir = sys.argv[1] if len(sys.argv) > 1 else "build-pages"
    import oreorbit_pages as P
    ref = json.load(open(os.path.join(ROOT, "atlas/data/reference.json"), encoding="utf-8"))
    live = {"trade": get("live-data/live/trade.json", {}), "imagery": get("data/imagery.json", {}),
            "extras": get("data/orbit-extras.json", {}), "hotspots": get("live-data/live/hotspots.json", {}),
            "so2": get("live-data/live/so2.json", {}), "conflict": get("live-data/live/conflict.json", {}),
            "news": get("live-data/news.json", []), "briefs": get("live-data/briefs.json", [])}
    txt = open(os.path.join(ROOT, "atlas/config.js"), encoding="utf-8").read()
    cfg = {k: v for k, v in re.findall(r'(\w+)\s*:\s*"([^"]*)"', txt) if v}
    pages = P.build(ref, live, cfg, date.today().isoformat())
    bad = 0
    for path, body in pages.items():
        if isinstance(body, bytes):
            data = body
        else:
            data = body.encode("utf-8")
            for i, block in enumerate(re.findall(r'<script type="application/ld\+json">(.*?)</script>', body, re.S)):
                try:
                    json.loads(block)
                except Exception as ex:
                    bad += 1
                    print("::error::%s: JSON-LD block %d does not parse (%s)" % (path, i + 1, ex))
        dest = os.path.join(out_dir, path)
        os.makedirs(os.path.dirname(dest) or ".", exist_ok=True)
        open(dest, "wb").write(data)
    print("Built %d files into %s, %d JSON-LD error(s)" % (len(pages), out_dir, bad))
    return 1 if bad or not pages else 0


if __name__ == "__main__":
    sys.exit(main())
