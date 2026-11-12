"""List every place a mineral lives, and whether a new mineral is there too.

Usage: touchpoints.py NEW [--like mn] [--en Copper] [--cs Měď] [--also ../madali.cz ...]

Uses a tracked mineral (--like, default mn: the most recent one added) as the template and scans the
tracked text files of this repo, plus any extra checkouts given with --also:

  * code lines that hold most mineral ids (lists, colour maps, allow-lists): NEW must be on the
    same line; lines with only a few ids (a group, a system's parts) are a "subset" to check;
  * table entries (STAGES, PROD, SITES, BUILD ...): NEW must appear in the same table block;
  * JSON files, by path: e.g. materials.{id}, order[*], sites[*].m, tracked.{id};
  * lines that name the template mineral (English and Czech, e.g. NEWS_GROUPS, the CS dictionary)
    and docs: listed for review.

Statuses: ok · MISSING (the template has exactly one entry there, NEW has none) · check (rows such
as sites or routes: the template has several, NEW none; decide whether NEW needs any) · review.
Exit code 1 if anything is MISSING. Run from the repo root. It is a map, not a proof: read the
template's entries and write NEW's by hand.
"""
import argparse
import collections
import json
import pathlib
import re
import subprocess
import sys

CODE = {".js", ".py", ".php", ".html", ".css", ".sh", ".yml", ".yaml", ".xml"}
DOCS = {".md", ".txt"}
SKIP = re.compile(r"^(atlas/vendor/|\.claude/|node_modules/)|(^|/)last-run\.txt$")
STR = re.compile(r'"(?:\\.|[^"\\])*"|\'(?:\\.|[^\'\\])*\'|`(?:\\.|[^`\\])*`')
DECL = re.compile(r"^\s*(?:(?:export\s+)?(?:const|let|var)\s+([A-Za-z_$][\w$]*)|\$([A-Za-z_]\w*)|([A-Za-z_][\w.]*))"
                  r"\s*(?::\s*[\w\[\], .|]+)?=(?![=>])")


def tok(i):
    i = re.escape(i)
    return re.compile(r"[\"']%s[\"']|(?<![\w.$-])%s\s*:(?!:)|--%s\b|^\s*%s\s*\(" % (i, i, i, i))


def word(i):
    return re.compile(r"(?<![\w-])%s(?![\w-])" % re.escape(i))


def stem(name):
    n = name.lower()
    return re.compile(r"(?<!\w)" + re.escape(n if len(n) <= 6 else n[:-1]), re.I)


def tracked(root):
    try:
        out = subprocess.run(["git", "-C", str(root), "ls-files"], capture_output=True, text=True, check=True).stdout.split("\n")
    except (OSError, subprocess.CalledProcessError):
        out = [str(p.relative_to(root)) for p in root.rglob("*") if p.is_file()]
    for rel in sorted(out):
        p = root / rel
        if rel and not SKIP.search(rel) and p.suffix.lower() in CODE | DOCS | {".json"} and p.is_file():
            yield rel, p, p.suffix.lower()


class Blocks:
    """Finds the declared table (const X = {, NAME = [, $x = [) that encloses a line."""

    def __init__(self, lines, ext):
        self.lines, self.depth, d = lines, [], 0
        for ln in lines:
            s = STR.sub("", ln)
            s = s.split("#")[0] if ext in (".py", ".sh", ".yml", ".yaml") else re.sub(r"(^|\s)//.*", "", s)
            d += sum(s.count(c) for c in "([{") - sum(s.count(c) for c in ")]}")
            self.depth.append(d)
        self.ends = {}

    def end(self, h):
        if h not in self.ends:
            d0 = self.depth[h - 1] if h else 0
            k = h
            while k < len(self.lines) - 1 and self.depth[k] > d0:
                k += 1
            self.ends[h] = k
        return self.ends[h]

    def group(self, n, limit=15):
        """The small bracket group a line belongs to (a map or list written over a few lines)."""
        last = len(self.lines) - 1
        d0 = self.depth[n - 1] if n else 0
        if self.depth[n] > d0:  # the line opens a group that stays open
            e = n
            while e < last and self.depth[e] > d0:
                e += 1
            if e - n <= limit:
                return n, e
        if d0 > 0:  # the line sits inside a group opened above
            k = n
            while k > 0 and self.depth[k - 1] >= d0:
                k -= 1
            e = n
            while e < last and self.depth[e] >= d0:
                e += 1
            if e - k <= limit:
                return k, e
        return n, n

    def of(self, n):
        for h in range(n, -1, -1):
            m = DECL.match(self.lines[h])
            if m and self.end(h) >= n:
                return (m.group(1) or m.group(2) or m.group(3)), h, self.end(h)
        return "(top level)", 0, len(self.lines) - 1


def snippet(line, rx, width=46):
    m = rx.search(line)
    a = max(0, (m.start() if m else 0) - width)
    return re.sub(r"\s+", " ", line[a:a + 2 * width + 8]).strip()


def scan_code(rel, path, ext, like, new, ids, names_like, names_new, out):
    lines = path.read_text(encoding="utf-8", errors="replace").split("\n")
    tl, tn = tok(like), tok(new)
    others = [tok(i) for i in ids if i not in (like, new)]
    blocks = None
    entries = collections.OrderedDict()
    idlines, seen = set(), set()
    for n, ln in enumerate(lines):
        if not tl.search(ln):
            continue
        idlines.add(n)
        blocks = blocks or Blocks(lines, ext)
        name, h, e = blocks.of(n)
        g0, g1 = blocks.group(n)
        if (g0, g1) in seen:
            continue
        span = "\n".join(lines[g0:g1 + 1])
        counts = [len(o.findall(span)) for o in others]
        present = sum(1 for c in counts if c)
        if present:
            seen.add((g0, g1))
            full = present >= 0.7 * len(others)
            # rows that each name a mineral (deadlines, sites on a map, parts per system) repeat ids
            records = full and (max(counts + [len(tl.findall(span))]) > 1 or (g0 == g1 and len(ln) > 1500))
            status = "ok" if tn.search(span) else ("MISSING" if full and not records else "check")
            kind = "records" if records else ("list" if full else "subset")
            where = "%d" % (g0 + 1) if g0 == g1 else "%d-%d" % (g0 + 1, g1 + 1)
            out.append((rel, status, "%5d  %s %s (line %s): %s" % (n + 1, name, kind, where, snippet(ln, tl))))
        else:
            entries.setdefault((name, h, e), []).append(n)
    for (name, h, e), ns in entries.items():
        have = sum(1 for k in range(h, e + 1) if tn.search(lines[k]))
        status = "ok" if have else ("MISSING" if len(ns) == 1 else "check")
        where = ", ".join(str(k + 1) for k in ns[:6]) + (" ..." if len(ns) > 6 else "")
        out.append((rel, status, "%5d  %s: %s %d entr%s (line %s), %s %d" % (
            ns[0] + 1, name, like, len(ns), "y" if len(ns) == 1 else "ies", where, new, have)))
    # names
    if not names_like:
        return
    hits = collections.OrderedDict()
    for n, ln in enumerate(lines):
        if n not in idlines and any(r.search(ln) for r in names_like):
            blocks = blocks or Blocks(lines, ext)
            hits.setdefault(blocks.of(n), []).append(n)
    for (name, h, e), ns in hits.items():
        have = sum(1 for k in range(h, e + 1) if any(r.search(lines[k]) for r in names_new)) if names_new else None
        status = "review" if have is None else ("ok" if have else "check")
        where = ", ".join(str(k + 1) for k in ns[:6]) + (" ..." if len(ns) > 6 else "")
        out.append((rel, status, "%5d  %s: names the template on %d line%s (%s)%s" % (
            ns[0] + 1, name, len(ns), "" if len(ns) == 1 else "s", where, "" if have is None else ", new name %d" % have)))


def walk(node, path, x, ids, acc):
    if isinstance(node, dict):
        for k, v in node.items():
            if k == x:
                acc.append(path + ".{id}")
            else:
                walk(v, path + "." + ("{m}" if k in ids else k), x, ids, acc)
    elif isinstance(node, list):
        for v in node:
            walk(v, path + "[*]", x, ids, acc)
    elif node == x:
        acc.append(path + " = {id}")


def scan_json(rel, path, like, new, ids, out):
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except ValueError as e:
        out.append((rel, "check", "      not valid JSON: %s" % e))
        return
    a, b = [], []
    walk(data, "", like, set(ids), a)
    walk(data, "", new, set(ids), b)
    ca, cb = collections.Counter(a), collections.Counter(b)
    for p, k in ca.items():
        status = "ok" if cb[p] else ("MISSING" if k == 1 else "check")
        out.append((rel, status, "      %s: %s %d, %s %d" % (p.lstrip(".") or "(root)", like, k, new, cb[p])))
    if any(p.startswith(".other") for p in cb):
        out.append((rel, "MISSING", "      other: %s is still listed as an extra mineral; remove its entry from 'other'" % new))


def scan_doc(rel, path, like, new, names_like, names_new, out):
    lines = path.read_text(encoding="utf-8", errors="replace").split("\n")
    wl, wn = word(like), word(new)
    ns = [n for n, ln in enumerate(lines) if wl.search(ln) or any(r.search(ln) for r in names_like)]
    if ns:
        have = sum(1 for ln in lines if wn.search(ln) or any(r.search(ln) for r in names_new))
        where = ", ".join(str(k + 1) for k in ns[:8]) + (" ..." if len(ns) > 8 else "")
        out.append((rel, "review", "      mentions %s on line %s; %s mentioned on %d line%s" % (
            like, where, new, have, "" if have == 1 else "s")))


def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("new", help="id of the new mineral, e.g. cu")
    ap.add_argument("--like", default="mn", help="tracked mineral to use as the template (default mn)")
    ap.add_argument("--en", help="English name of the new mineral")
    ap.add_argument("--cs", help="Czech name of the new mineral")
    ap.add_argument("--also", action="append", default=[], help="another checkout to scan, e.g. ../madali.cz")
    a = ap.parse_args()

    ref = json.loads(pathlib.Path("atlas/data/reference.json").read_text(encoding="utf-8"))
    ids = list(ref["order"]) + ([a.new] if a.new not in ref["order"] else [])
    if a.like not in ref["order"]:
        sys.exit("--like must be a tracked mineral: " + ", ".join(ref["order"]))
    like_en = ref["materials"][a.like]["info"]["name"]
    m = re.search(r"'%s'\s*=>\s*\['[^']+',\s*'([^']+)'\]" % re.escape(a.like), pathlib.Path("atlas/mail-lib.php").read_text(encoding="utf-8"))
    like_cs = m.group(1) if m else None
    names_like = [stem(n) for n in (like_en, like_cs) if n]
    names_new = [stem(n) for n in (a.en, a.cs) if n]
    print("Template %s (%s / %s) -> new %s (%s / %s)\n" % (a.like, like_en, like_cs or "?", a.new, a.en or "?", a.cs or "?"))

    out = []
    for root in [pathlib.Path(".")] + [pathlib.Path(p) for p in a.also]:
        for rel, path, ext in tracked(root):
            label = rel if root == pathlib.Path(".") else "%s/%s" % (root.name, rel)
            if ext == ".json":
                scan_json(label, path, a.like, a.new, ids, out)
            elif ext in CODE:
                scan_code(label, path, ext, a.like, a.new, ids, names_like, names_new, out)
            else:
                scan_doc(label, path, a.like, a.new, names_like, names_new, out)

    last = None
    for rel, status, text in out:
        if rel != last:
            print(rel)
            last = rel
        print("  %-8s %s" % (status, text))
    c = collections.Counter(s for _, s, _ in out)
    print("\n" + " · ".join("%s %d" % (k, c[k]) for k in ("ok", "MISSING", "check", "review") if c[k]))
    print("Not covered (no text to scan): brand book p. 11 and p. 21, OG images, the WordPress pages as pasted, Wikidata ids in KNOWS.")
    sys.exit(1 if c["MISSING"] else 0)


if __name__ == "__main__":
    main()
