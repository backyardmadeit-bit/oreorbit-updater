"""Compare atlas files in the repo with the live server.

Usage: live_md5.py FILE [FILE ...]      (paths relative to atlas/, e.g. atlas-main.js data/reference.json)
Options: --base URL (default https://bohemiadefense.com/atlas/), --repo DIR (default ./atlas)

Fetches each file with a cache-busting query and prints "match" or "DIFF" with both md5 sums.
Exit code 1 if any file differs or cannot be fetched.
"""
import hashlib
import pathlib
import sys
import time
import urllib.request


def opt(name, default):
    if name in sys.argv:
        i = sys.argv.index(name)
        val = sys.argv[i + 1]
        del sys.argv[i:i + 2]
        return val
    return default


def main():
    base = opt("--base", "https://bohemiadefense.com/atlas/").rstrip("/") + "/"
    repo = pathlib.Path(opt("--repo", "atlas"))
    files = sys.argv[1:]
    if not files:
        sys.exit(__doc__)
    bad = 0
    stamp = int(time.time())
    for f in files:
        local = hashlib.md5((repo / f).read_bytes()).hexdigest()
        url = "%s%s?nc=%d" % (base, f, stamp)
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "atlas-release-check", "Cache-Control": "no-cache"})
            with urllib.request.urlopen(req, timeout=30) as r:
                live = hashlib.md5(r.read()).hexdigest()
        except Exception as e:  # noqa: BLE001
            print("%-28s ERROR  %s" % (f, e))
            bad += 1
            continue
        same = live == local
        bad += not same
        print("%-28s %s  repo %s  live %s" % (f, "match" if same else "DIFF ", local, live))
    sys.exit(1 if bad else 0)


if __name__ == "__main__":
    main()
