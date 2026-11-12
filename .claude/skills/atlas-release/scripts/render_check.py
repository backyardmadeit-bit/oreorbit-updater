"""Headless check of the OreOrbit atlas.

Usage: render_check.py ATLAS_DIR_OR_URL [OUT_DIR] [--build NN]

ATLAS_DIR is served on 127.0.0.1 (index.html, no PHP); a URL (e.g. https://bohemiadefense.com/atlas/)
is loaded as it is. Each view loads ?debug=1 in EN and CS at desktop and phone width, then reports
atlas errors (window.ooErrs), page errors, the document language, horizontal overflow, the number of
h1 elements and the footer build. Screenshots go to OUT_DIR. Exit code 1 if any view fails.
Needs Playwright with Chromium.
"""
import argparse
import functools
import http.server
import json
import pathlib
import socketserver
import sys
import threading

from playwright.sync_api import sync_playwright

VIEWS = [("en", 1440, 900), ("cs", 1440, 900), ("en", 390, 844), ("cs", 390, 844)]
GL = ["--use-gl=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"]
PROBE = """() => ({
  errs: (window.ooErrs || []).map(x => String(x).slice(0, 160)),
  lang: document.documentElement.lang || "",
  overflow: document.documentElement.scrollWidth - window.innerWidth,
  h1: document.querySelectorAll("h1").length,
  build: ((document.querySelector(".oo-build") || {}).textContent || "").trim()
})"""


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass


def main():
    ap = argparse.ArgumentParser(description="Headless check of the OreOrbit atlas.")
    ap.add_argument("target", help="atlas folder (served locally) or URL")
    ap.add_argument("out", nargs="?", default=".", help="folder for screenshots")
    ap.add_argument("--build", help="expected footer build number, e.g. 59")
    a = ap.parse_args()
    target = a.target
    want = "build " + a.build if a.build else None
    out = pathlib.Path(a.out).resolve()
    out.mkdir(parents=True, exist_ok=True)

    if target.startswith("http"):
        base = target if "?" in target else target + "?"
        tag = "live"
    else:
        root = pathlib.Path(target).resolve()
        if not (root / "index.html").is_file():
            sys.exit("no index.html in %s" % root)
        srv = socketserver.TCPServer(("127.0.0.1", 0), functools.partial(Quiet, directory=str(root)))
        threading.Thread(target=srv.serve_forever, daemon=True).start()
        base = "http://127.0.0.1:%d/index.html?" % srv.server_address[1]
        tag = "local"

    failed = 0
    with sync_playwright() as pw:
        browser = pw.chromium.launch(args=GL)
        for lang, w, h in VIEWS:
            page = browser.new_page(viewport={"width": w, "height": h})  # own context: no remembered language
            perr = []
            page.on("pageerror", lambda e, perr=perr: perr.append(str(e)[:160]))
            page.goto(base + "debug=1&lang=" + lang, wait_until="load", timeout=60000)
            page.wait_for_timeout(7000)
            r = page.evaluate(PROBE)
            problems = []
            if r["errs"]:
                problems.append("ooErrs %d" % len(r["errs"]))
            if perr:
                problems.append("page errors %d" % len(perr))
            if not r["lang"].startswith(lang):
                problems.append("lang %r" % r["lang"])
            if r["overflow"] > 1:
                problems.append("overflow %dpx" % r["overflow"])
            if r["h1"] != 1:
                problems.append("h1 x%d" % r["h1"])
            if want and r["build"] != want:
                problems.append("footer %r, expected %r" % (r["build"], want))
            shot = out / ("atlas-%s-%s-%d.png" % (tag, lang, w))
            page.screenshot(path=str(shot))
            print("%-4s %4d  %s  %s  [%s]" % (lang, w, "ok  " if not problems else "FAIL", r["build"] or "no build", ", ".join(problems) or "clean"))
            for e in (r["errs"] + perr)[:4]:
                print("      ", e)
            failed += bool(problems)
            page.close()
        browser.close()
    print("screenshots:", out)
    print(json.dumps({"views": len(VIEWS), "failed": failed}))
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
