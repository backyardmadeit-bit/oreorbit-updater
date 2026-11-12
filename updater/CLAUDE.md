# updater/CLAUDE.md — the robot (GitHub Actions, every 3 hours)

The root `CLAUDE.md` covers the rules, minerals, business model, brand and checks. This file is robot detail.
- Workflow: `.github/workflows/update.yml`.
- Local build and checks: `tools/build_pages.py` and `tools/consistency_scan.py`.

## `oreorbit_update.py`
- Each feed has its own interval (`INTERVAL_H`):
  - orbits
  - hazards: GDACS, USGS quakes, and **river gauges** from PEGELONLINE (Kaub, Duisburg, Dresden)
  - scenes
  - ships: AISStream, cargo types 70–79 only, fair share per box
  - hotspots (FIRMS)
  - prices
  - traffic (PortWatch)
  - clouds
  - conflict (UCDP)
  - tenders (TED)
  - trade: Eurostat Comext, `TRADE_CODES`
  - so2
  - imagery: Sentinel-2 with cloud < 40, Landsat < 25
  - radar
  - news: RSS + GDELT `NEWS_GROUPS` + **US Federal Register BIS rules**
  - brief: the rule-based weekly brief
  - watch: rebuilds `live-data/watch.json` from the deadlines in `data/reference.json`. This is the dated list the atlas shows beside the news.
  - pages
  - social
- Every run uploads only changed files (md5) and writes `runstatus.json`.
- Imagery fallback for pictures over 30 days old: `s2_clear_scene(relaxed=True)`, which takes scenes < 80 % cloud with the box ≥ 75 % clear and stores `nowClearPct` (build 46).
- **Forced run:** the live brief keeps the text it was written with. After a wording change in `feed_brief`, or a deadline change, run Actions → Update with `force`, or wait for Monday. Merge changes that must reach the Monday emails before the first Monday run (00:17 UTC).

## Email (`send_mail()`)
- **Free Monday brief**, built for each subscriber's minerals and language.
- **Paid personal Monday edition**: status, "what it means", deadlines, what moved, rivers, other minerals, and a "Your question" section. The weekly CSV `_data_csv` is attached: monthly EU imports, daily heat and SO2 per site.
- **Same-day alerts:**
  - new news
  - deadline reminders at 30, 14, 7 and 1 days
  - river state changes
  - site alerts (`_site_events`)
  - other-mineral news via GDELT, once a day, at most 8 queries per run (`_other_terms`, `_other_news`). Quiet terms show "no news found in the last 14 days".
- **Welcome fallback** (`_welcome`) for anyone the website did not welcome.
- **Delivery log** in `state["log"]`, plus a Monday delivery report to David that lists quiet other-mineral terms (`state.other[term].first/hit`).
- **Mail safety net** (`_mail_step`):
  - The mail step's state goes into `runstatus.json` as source `mail`; `stats.php` shows it as an Emails row.
  - A run counts as a failure when `send_mail()` raises, the SMTP secrets are missing, or none of the emails went out.
  - 2 failures in a row turn the run red, so GitHub emails David. Data feeds turn red after 3.
  - Partial failures stay green and show in the Monday delivery report.

## Czech in the robot
- Plurals: `_cs_pl`, `_cs_days`.
- "z"/"ze" before a number: `_cs_z`.
- Months in the locative: `MONTH_CS_LOC`.
- Comext product names: `TRADE_CS`. A new `TRADE_CODES` label needs its Czech there.
- Word order is natural: no "v srpnu 2026 97 %".
- Satellite day counts say "dní s měřením" / "s platným měřením".
- The atlas side of these rules is in `atlas/CLAUDE.md` (build 56).

## `oreorbit_pages.py`
- Builds about 87 library pages (`p/*.html`, EN; CS for services, about and index), plus the sitemap, embeds and social cards.
- Meta descriptions go through `meta_desc()`: whole sentences up to 160 characters, otherwise cut at a word with "…". `og:description` keeps the full text.
- **The Dependency Index stays on the original ten** (`INDEX_TEN`). Mg and Mn are stored in `extra` beside it.
- Counts are computed, never typed: `counts()`, `w_en()`, `w_cs()`. The price comes from `config.js` (services pages are patched in `build()`).
- **SEO/GEO** (12 Nov 2026, atlas build 58):
  - **FAQ pages:** `p/faq.html` and `p/faq-cs.html`.
    - `faq_qas()` builds twelve answers computed from `reference.json` and live data. The visible text equals the `FAQPage` JSON-LD.
    - The anchors are stable (such as `#dependencies`, `#monitoring` / `#zavislosti`) because `llms.txt` links to them: do not rename them.
  - **Structured data:** `person_full()`, `org_full()` and `knows_ld()` (`KNOWS`: Wikidata and Wikipedia ids) feed the About and FAQ pages.
  - **Copied by hand:** the same `knowsAbout` is copied into `atlas/index.html`, `docs/wordpress/jsonld-sitewide.html` and madali.cz.
  - **The BD root `llms.txt`** lives in `docs/wordpress/llms.txt` and is uploaded by hand via WebFTP.
  - **Readiness review:** scoped and priced in a free 30-minute intro call everywhere, the sales guide PDF included (David, 12 Nov 2026).
  - **No degree or school** in public copy or JSON-LD (no `alumniOf`).

## `config.json`
- `sites`: 43, used for imagery, heat and SO2.
- `shipBoxes`: 23, with `mins` for mineral ports.
- `sats`.
- `fred`.
- `portwatch`.

## Secrets (GitHub)
- Robot: `ATLAS_KEY`, `FIRMS_MAP_KEY`, `FRED_API_KEY`, `AISSTREAM_KEY`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM`.
- Atlas deploy: `FTP_HOST`, `FTP_USER`, `FTP_PASS`.
- Never print their values.
