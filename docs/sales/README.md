# OreOrbit guide (sales PDF)

Seven A4 pages in English and Czech that explain the atlas, Free vs Monitoring, the Readiness review and how to start.

| File | What it is |
|---|---|
| `OreOrbit-guide-en.pdf`, `OreOrbit-pruvodce-cs.pdf` | the built guides, ready to attach |
| `build_manual.py` | builds both PDFs (HTML → PDF with Playwright/Chromium) |
| `manual.css` | layout and brand (brand book v1.1: dark cover and plans, light content pages, Hanken Grotesk + DM Mono, one green) |
| `img/{en,cs}-*.jpg` | screenshots of the live atlas; `img/shots.json` holds the date they were taken (printed in the footer) |
| `img/david-madali.jpg` | portrait for the contact page |

## Where the content comes from

Nothing countable is typed in the script:

- price, price in CZK, company name and IČO: `atlas/config.js`
- number of minerals, sites and routes, "ten of the twelve", each mineral's tightest stage and its source: `atlas/data/reference.json`
- mineral symbols: `ELEM` in `atlas/atlas-main.js`; mineral colours: CSS variables in `atlas/index.html` (dark palette for the chips, light palette for the bars); Czech names: `MAT_CS` in `updater/oreorbit_pages.py`

So after a price or count change, rebuilding is enough. The copy itself (EN and CS) is in `copy()` in `build_manual.py`.

## Build

Needs Python 3.9+ with `playwright` and Chromium (`pip install playwright && playwright install chromium`).

```bash
python3 docs/sales/build_manual.py              # both languages, existing screenshots
python3 docs/sales/build_manual.py --shots      # retake screenshots from the live atlas first
python3 docs/sales/build_manual.py --shots --from http://127.0.0.1:8765/   # screenshots from a local preview of an unmerged atlas branch
python3 docs/sales/build_manual.py --lang cs    # one language
python3 docs/sales/build_manual.py --html --out /tmp/guide   # also keep the HTML (for review or text scans)
```

`--shots` opens `https://bohemiadefense.com/atlas/` (and `?lang=cs`) in headless Chromium with software WebGL, takes the globe, the Mittersill site drawer, the gallium mineral drawer, the quick check for drones, This week and the live signals, and records the date. It prints the atlas error count (`window.ooErrs`); it should be 0. `--from URL` takes the screenshots from another copy of the atlas (for example a local server over `atlas/` of a branch that is not deployed yet, with `live-data/` taken from the live site); links in the PDF still point to the live atlas, and `img/shots.json` records where the screenshots came from.

The build fails (non-zero exit) if any page runs over its A4 height, so text changes cannot silently clip a page.

After a rebuild, run the consistency scan on the HTML copy too:

```bash
python3 docs/sales/build_manual.py --html --out /tmp/guide && python3 tools/consistency_scan.py --pages /tmp/guide
```

The screenshots of 11 November 2026 were taken from atlas build 56 (PR #24, Czech stage names and wording) before it was deployed, with the weekly brief rebuilt by that branch's robot and the other live data from the live site. Retake them from the live atlas once PR #24 is deployed and the robot has rewritten the brief (Actions → Update with `force`, or after Monday).
