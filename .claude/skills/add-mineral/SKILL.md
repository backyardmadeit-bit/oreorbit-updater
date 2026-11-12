---
name: add-mineral
description: Add a new tracked mineral to OreOrbit end to end. That means the atlas tables, globe and 3D specimen, quick check, payments and emails, the robot's news and trade feeds, the library pages, the counts in the copy ("twelve" becomes "thirteen"), the WordPress pages, madali.cz and the OG image. Use it whenever a mineral joins or leaves the tracked list, even when the request only says "přidej měď", "sledujme i cín", "add copper", "nový minerál", "13. minerál", or asks to make a client's extra mineral a tracked one. Removing or renaming a mineral touches the same places, so use it for that too.
---

# Add a mineral

A tracked mineral lives in about forty places across three sites. The last two added were magnesium and manganese, in November 2026. **Use `mn` as the template:** find each of its entries, write the new mineral's entry beside it from sources, and never invent a figure.

The finished change ships as:
- one PR in this repo, which is one atlas build (follow the `atlas-release` skill for the build mechanics);
- one PR in the madali.cz repo;
- paste-ready WordPress HTML for David.

## 0. Agree the basics with David first

The change rewrites public copy on three sites, so confirm these before editing:
- **id**: lowercase element symbol where possible (`cu`). It becomes a URL slug, a CSV value and a Stripe reference, so it never changes later.
- **Names**: the EN name, and the CS name with its case forms (`v mědi`, `z mědi`).
- **Symbol and atomic number** for the globe (`ELEM`).
- **Colour**: a dark-theme colour and a darker light-theme colour (compare `--mn` in both `:root` blocks of `atlas/index.html`). It must differ clearly in hue from the twelve, and it must not be the signal green `#3ddc97` or a colour that reads as a state (red, amber). Mineral colours never mark state or buttons.
- **Why it matters for European defence and space**: the systems it goes into and its role in each.
- **The chain**: mine, refining and product stages, each with the top country's share, the year and the source.
- **The counts story**: the minerals count goes up by one. The concentrated count ("ten of the twelve") goes up only if one country holds more than 65 % of a stage.

Sources are the latest USGS Mineral Commodity Summaries and IEA Global Critical Minerals Outlook, plus named others where they are better (e.g. SMM for refined metal). Every figure carries its source and year, and disputed numbers are left out.

## 1. Branch

Start a worktree from `origin/main`, as in `atlas-release`. Find the current build in the `atlas-v2.js` footer; this change is the next one.

## 2. Data first

Add the mineral to `atlas/data/reference.json` before anything else:
- `order`: decide the position with David.
- `materials.<id>`: `info`, `stages`, `worst`, `deadlines`, `euSp`, in the same shape as `materials.mn`.
- `sites[]`: each new site, with `m` set to the id.

The file is compact single-line JSON. Edit it through Python so the format stays the same:

```python
d = json.load(open(p, encoding="utf-8"))
# ... change d ...
open(p, "w", encoding="utf-8").write(json.dumps(d, ensure_ascii=False, separators=(",", ":")))
```

Then build and scan:

```bash
python3 tools/build_pages.py "$SCRATCH/pages" && python3 tools/consistency_scan.py --pages "$SCRATCH/pages"
```

The scan computes the truth from `reference.json`, so it now flags every "twelve", "12", "dvanáct" and "z dvanácti" in the atlas, the robot and the built pages. That list is your work list for the counts. It goes to zero at the end.

## 3. Map every place

```bash
python3 .claude/skills/add-mineral/scripts/touchpoints.py <id> --en <Name> --cs <Název> --also ../madali.cz
```

The script scans every tracked text file. For each place that holds `mn` it reports whether the new id is there too:

| Status | Meaning | What to do |
|---|---|---|
| `MISSING` | A list or map that holds every mineral once (colours, allow-lists, `MAT_NAME`, `order`) | Add the new entry. |
| `check` | Rows that each name a mineral (sites, routes, deadlines, system parts, product mixes), or lines that name manganese in words | Decide whether the new mineral needs rows here. Usually it does. |
| `review` | Docs that mention `mn` | Read them and update them where they list the minerals. |

Rerun it after each round of edits. Finish with `MISSING` at 0 and every `check` decided.

It is a map, not a proof. It cannot see images or the pasted WordPress pages. Use the checklist below as well.

To remove a mineral, run it with the mineral as `--like` and a dummy new id (`touchpoints.py zz --like <old>`). Every place of the old mineral then shows up.

## 4. Checklist

**Atlas** (`atlas/`):
- `atlas-main.js`:
  - `GROUPS` (defence, space or batteries)
  - `PIN` colour
  - `MATERIALS`, `STAGES`, `STRATEGIC`, `PROD` (world output with source)
  - `ELEM`
  - the `SYSTEMS` parts pushes (`{ m: "mn", role: … }`): one per system that uses it
  - `SITES` and `ROUTES`, if the new mineral has any
  - `ROAD` and `DEADLINES`, if it has dated events
  - the Czech names in `CS_RX`, the `CS` dictionary and `TRADE_CS`
  - **`BUILD[id]`**: the 3D specimen. This is real modelling work: copy `mn(rnd)` and shape the new mineral's crystal habit and colour.
- `atlas-v2.js`: the quick check products `P` (which products need it, with an EN/CS role), and the names on the render line. The quick check score is out of 9; it is not a mineral count, so leave it.
- `index.html`:
  - the CSS variables in both themes
  - static SEO copy and names
  - the JSON-LD (`knowsAbout`, counts)
  - the `og:image` names
  - the `?v=` bumps
- `index.php`: the Czech swaps of names and counts, and the `$lib` links to the library pages.
- PHP allow-lists:
  - `go-pay.php` and `stripe-webhook.php` (`$allowed`); without the id there, payment for it fails
  - `mail-lib.php` names
- `data/other-minerals.json`:
  - Add `tracked.<id>` aliases.
  - If the mineral was a client extra, remove it from `other`, and bump `other-minerals.json?v=` in `atlas-v2.js`.
  - Paying clients who chose it as an extra still have it in their `other` column. Claude never opens `subs/`, so tell David, who decides how to move them.

**Robot** (`updater/`):
- `oreorbit_update.py`:
  - `TRADE_CODES` (Eurostat Comext CN codes; check that they return data) and `TRADE_CS`
  - `MAT_NAME`
  - `NEWS_Q`, `NEWS_KW` and `NEWS_GROUPS`
- `config.json`:
  - `sites` (imagery, heat and SO2 per site)
  - `shipBoxes[].mins` for the ports that ship it
- `oreorbit_pages.py`:
  - `SLUG`, `COL`, `MAT_CS`, `PRODUCTS`, `WHAT_CS`
  - the `T("…")` order lists and `czs`
  - `KNOWS`: the Wikidata id and Wikipedia title of the element
  - **`INDEX_TEN` stays on the original ten.** Like Mg and Mn, the new mineral goes into `extra` beside the Dependency Index. Changing the index itself is David's decision.

**Docs:**
- `docs/sales/build_manual.py` `WHAT_CS`. Then rebuild the sales guide in EN and CS; the build fails if a page overflows A4.
- `docs/wordpress/` (David pastes it into WordPress):
  - `home-en`/`home-cs` `.html` and `.txt`: site map, mineral list, `ORDER`
  - `jsonld-sitewide.html`
  - `llms.txt`
  - the README
- The minerals line in `CLAUDE.md`, `atlas/CLAUDE.md` and `updater/CLAUDE.md`. If `~/.claude/CLAUDE.md` exists on this machine, update its minerals list and counts too.

**madali.cz** (separate checkout and PR):
- `index.html` and `cs/index.html`:
  - the `data-m` buttons
  - `__D` names and sites
  - `COL` and `ORDER`
  - JSON-LD `knowsAbout`
- `llms.txt`

**Not text, so done by hand:**
- **OG image `og-oreorbit-v2.png`**: it is rendered from HTML and states the counts. Render a new one at 1200×630 under a new filename (`og-oreorbit-v3.png`). Then point `og:image`, `twitter:image` and the alt text at it in `atlas/index.html` and `updater/oreorbit_pages.py`. After the deploy, David re-scrapes it (LinkedIn Post Inspector, Facebook Sharing Debugger).
- **Brand book p. 11 and p. 21**: the mineral palette and list. It is David's file, so tell him.
- **Social cards**: the robot rebuilds them on its next run.

## 5. Counts

- **The minerals count** changes in every "twelve", "12", "dvanáct" and "dvanácti". The scan lists them. Mind the Czech forms: "ze třinácti", and the `zeZ` / `_cs_z` helpers in the code.
- **"Ten of the twelve"** becomes "N of the thirteen". The scan computes N from `worst`.
- **Sites and routes** counts change if you added any. Route ids in `reference.json` `routes` must match `ROUTES` in `atlas-main.js`, or the scan fails.
- **The Dependency Index** keeps saying ten.
- Text inside images is invisible to the scan, so check the OG image yourself.

## 6. Check

Run everything in `atlas-release` §4. Then also:
- `touchpoints.py` reports `MISSING` 0, and the consistency scan is clean.
- The built pages include the new library page (`p/<slug>.html`), and its JSON-LD parses.
- In the EN and CS renders, check that the new mineral shows up:
  - in the quick check, the monitoring picker and the globe legend
  - as a drawer with its specimen when picked
  - with proper Czech names
- Dry-run `send_mail()` with stubbed SMTP and a subscriber who picked only the new mineral, for the free brief and the paid edition (see `updater/CLAUDE.md`).

## 7. Ship

1. Open the PR in this repo and the PR in madali.cz. David merges.
2. After the atlas deploy, run `atlas-release` §6: the live md5 and the live render.
3. The new mineral's news, trade and imagery appear after the next robot run. Ask David before a forced run, because a run can send email.
4. Hand David the WordPress steps:
   - which page, widget and block each piece of HTML goes into
   - `llms.txt` via WebFTP
   - then W3TC → Purge All Caches, and Elementor → "Regenerovat soubory a data"
5. After his paste and the madali.cz merge, run `tools/consistency_scan.py --remote`.

Report what is live and verified, and what is still waiting for David: the paste, the OG re-scrape, the brand book.
