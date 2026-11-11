#!/usr/bin/env python3
"""Consistency scan: finds stale counts of minerals, sites and trade routes.

Truth is computed, never typed in:
  minerals      len(reference.json order)
  sites         len(reference.json sites)
  routes        entries in ROUTES in atlas/atlas-main.js
  concentrated  minerals whose tightest stage has one country above 65 % ("ten of the twelve")

A number next to a minerals / sites / routes word (English or Czech, digits or words) is reported when it is
close to the truth but not equal to it (an old or a future total), so "3 minerals" in a product stays quiet
while "ten minerals" or "31 sites" does not. "<n> of the twelve" / "<n> z dvanácti" is checked exactly.

Usage:
  consistency_scan.py                 scan the repo sources (atlas/, updater/, README.md)
  consistency_scan.py --pages DIR     also scan built library pages in DIR
  consistency_scan.py --remote        also fetch the live WordPress pages and madali.cz (reported as warnings)
Exit code 1 when the repo or built pages contain a stale count. JSON-LD blocks (structured data for search engines)
are scanned too: they are invisible on the page but show up in search results.
"""
import argparse
import html
import json
import os
import re
import sys
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

EN = {"one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9, "ten": 10,
      "eleven": 11, "twelve": 12, "thirteen": 13, "fourteen": 14, "fifteen": 15, "sixteen": 16, "seventeen": 17,
      "eighteen": 18, "nineteen": 19, "twenty": 20}
CS = {}
for forms, n in [("jeden jedna jedno jednoho jedné", 1), ("dva dvě dvou dvěma", 2), ("tři tří třem třemi", 3),
                 ("čtyři čtyř čtyřem čtyřmi", 4), ("pět pěti", 5), ("šest šesti", 6), ("sedm sedmi", 7), ("osm osmi", 8),
                 ("devět devíti", 9), ("deset deseti", 10), ("jedenáct jedenácti", 11), ("dvanáct dvanácti", 12),
                 ("třináct třinácti", 13), ("čtrnáct čtrnácti", 14), ("patnáct patnácti", 15), ("šestnáct šestnácti", 16),
                 ("sedmnáct sedmnácti", 17), ("osmnáct osmnácti", 18), ("devatenáct devatenácti", 19), ("dvacet dvaceti", 20)]:
    for f in forms.split():
        CS[f] = n
WORDS = {**EN, **CS}
NUM = r"(?<![\w$.,])(\d{1,3}|" + "|".join(sorted(map(re.escape, WORDS), key=len, reverse=True)) + r")(?![\w%])"

NOUNS = {
    "minerals": r"(?:critical\s+)?(?:minerals?|materials?|raw\s+materials|surovin\w*|minerál\w*|kritických\s+surovin)",
    "sites": r"(?:sites?|mines?|locations?|lokalit\w*|nalezišť|naleziště|nalezištích|dolů|míst(?:ech)?)",
    "routes": r"(?:(?:trade\s+|shipping\s+)?routes?|lanes?|(?:obchodních\s+|námořních\s+)?tras\w*)",
}
# how far from the truth a number still looks like an old or future total
SPREAD = {"minerals": 3, "sites": 15, "routes": 4}
GAP = r"(?:\s+(?!(?:of|z|ze|and|a|or|nebo)\b)[\w\-–]+){0,3}?\s+"   # up to three words between number and noun

ALLOW = re.compile(r"index minerals|INDEX_TEN|ten index|deseti surovin\w* indexu|"
                   r"index materials|surovin\w* indexu|First version|První verze|original ten|původních deset|"
                   r"skóre z \d|score out of|out of \d+ by the|strategic projects|strategických projektů|"
                   r"China supplied more than half|Čína dodala víc než polovinu", re.I)
# built pages that archive what was true on their date: reported as notes, never rewritten
HISTORICAL = re.compile(r"^built:p/(brief-\d{4}-\d{2}-\d{2}|briefs)\.html$")

SRC_EXT = (".html", ".js", ".php", ".py", ".md", ".txt", ".xml")
SKIP_DIRS = {"vendor", "fonts", "textures", "img", "live-data", "p", "node_modules", ".git"}
SKIP_FILES = {"CLAUDE.md", "consistency_scan.py"}   # these quote stale numbers on purpose


def num(tok):
    return int(tok) if tok.isdigit() else WORDS[tok.lower()]


def truth():
    ref = json.load(open(os.path.join(ROOT, "atlas/data/reference.json"), encoding="utf-8"))
    order = ref["order"]
    conc = 0
    for m in order:
        w = (ref["materials"].get(m) or {}).get("worst") or {}
        x = w.get("x") or {}
        if isinstance(x.get("pct"), (int, float)) and x["pct"] > 65:
            conc += 1
    js = open(os.path.join(ROOT, "atlas/atlas-main.js"), encoding="utf-8").read()
    start = js.index("const ROUTES = [")
    end = js.index("\n];", start)
    routes = len(re.findall(r'^\s{2}\{\s*id:\s*"', js[start:end], re.M))
    return {"minerals": len(order), "sites": len(ref["sites"]), "routes": routes, "concentrated": conc}


def clean(line):
    line = line.replace("\\u00a0", " ").replace(" ", " ").replace("&nbsp;", " ")
    line = re.sub(r"<[^>]+>", " ", line)
    return html.unescape(line)


def scan_text(name, text, t, out):
    lines = text.splitlines()
    for i, raw in enumerate(lines, 1):
        if ALLOW.search(" ".join(lines[max(0, i - 2):i + 2])):   # the line and its neighbours (built HTML splits sentences)
            continue
        line = clean(raw)
        low = line.lower()
        for kind, noun in NOUNS.items():
            for mm in re.finditer(NUM + GAP + noun + r"\b", low):
                n = num(mm.group(1))
                if n != t[kind] and abs(n - t[kind]) <= SPREAD[kind]:
                    out.append((name, i, mm.group(0).strip(), "%s should be %d" % (kind, t[kind])))
        # "<n> of the twelve" / "<n> z dvanácti": the total, and the concentrated count when 65 % is nearby
        tail = r"(?=\s*(?:[.,;:)]|$)|\s+(?:critical\s+)?(?:minerals?|materials?|surovin\w*|kritických)|\s+(?:have|has|hold|are|mají|má|ovládá))"
        for mm in re.finditer(NUM + r"\s+(?:of\s+the|of|z|ze)\s+" + NUM + tail, low):
            a, b = num(mm.group(1)), num(mm.group(2))
            if abs(b - t["minerals"]) <= SPREAD["minerals"] and b != t["minerals"]:
                out.append((name, i, mm.group(0), "minerals should be %d" % t["minerals"]))
            near = low[mm.end():mm.end() + 120]
            if b == t["minerals"] and re.search(r"65\s*%|65 per|65 procent", near) and a != t["concentrated"]:
                out.append((name, i, mm.group(0), "concentrated (>65 %%) should be %d" % t["concentrated"]))


def walk_sources():
    for top in ("atlas", "updater", "tools", "."):
        base = os.path.join(ROOT, top)
        if top == ".":
            for f in os.listdir(ROOT):
                if f.endswith(SRC_EXT) and f not in SKIP_FILES and os.path.isfile(os.path.join(ROOT, f)):
                    yield os.path.join(ROOT, f)
            continue
        for d, dirs, files in os.walk(base):
            dirs[:] = [x for x in dirs if x not in SKIP_DIRS]
            for f in files:
                if f.endswith(SRC_EXT) and f not in SKIP_FILES and not f.endswith(".example.php"):
                    yield os.path.join(d, f)


REMOTE = ["https://bohemiadefense.com/", "https://bohemiadefense.com/cs/", "https://bohemiadefense.com/david-madali/",
          "https://bohemiadefense.com/david-madali-cz/", "https://bohemiadefense.com/llms.txt",
          "https://madali.cz/", "https://madali.cz/cs/"]


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "oreorbit-consistency-scan"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8", "replace")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--pages", help="directory with built library pages")
    ap.add_argument("--remote", action="store_true", help="also scan the live WordPress pages and madali.cz (warnings)")
    a = ap.parse_args()
    t = truth()
    print("Truth: %(minerals)d minerals, %(sites)d sites, %(routes)d routes, %(concentrated)d with a stage above 65 %%" % t)
    errors = []
    for path in walk_sources():
        scan_text(os.path.relpath(path, ROOT), open(path, encoding="utf-8", errors="replace").read(), t, errors)
    if a.pages:
        for d, _, files in os.walk(a.pages):
            for f in files:
                if f.endswith((".html", ".xml", ".txt")):
                    p = os.path.join(d, f)
                    txt = open(p, encoding="utf-8", errors="replace").read()
                    txt = re.sub(r"<script\b(?![^>]*ld\+json)[^>]*>.*?</script>|<style\b[^>]*>.*?</style>", " ", txt, flags=re.S)
                    scan_text("built:" + os.path.relpath(p, a.pages), re.sub(r">\s*<", ">\n<", txt), t, errors)
    gh = os.environ.get("GITHUB_ACTIONS") == "true"
    notes = [x for x in errors if HISTORICAL.match(x[0])]
    errors = [x for x in errors if not HISTORICAL.match(x[0])]
    for name, i, found, why in notes:
        print("NOTE  %s:%d  \"%s\"  (archived brief, left as published)" % (name, i, found))
    for name, i, found, why in errors:
        print(("::error file=%s,line=%d::" % (name, i) if gh and not name.startswith("built:") else "ERROR ") + "%s:%d  \"%s\"  (%s)" % (name, i, found, why))
    warnings = []
    if a.remote:
        for url in REMOTE:
            try:
                txt = fetch(url)
            except Exception as ex:
                print(("::warning::" if gh else "WARN ") + "could not fetch %s (%s)" % (url, ex))
                continue
            txt = re.sub(r"<script\b(?![^>]*ld\+json)[^>]*>.*?</script>|<style\b[^>]*>.*?</style>", " ", txt, flags=re.S)
            scan_text(url, re.sub(r">\s*<", ">\n<", txt), t, warnings)
        for name, i, found, why in warnings:
            print(("::warning::" if gh else "WARN ") + "%s (line %d)  \"%s\"  (%s)" % (name, i, found, why))
    print("%d stale count(s) in the repo%s" % (len(errors), ", %d on the live sites outside the repo" % len(warnings) if a.remote else ""))
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
