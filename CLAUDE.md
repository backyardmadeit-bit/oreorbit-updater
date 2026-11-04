# CLAUDE.md — OreOrbit / Bohemia Defense / madali.cz

Owner: David Madali, Prague (sole trader, IČO 22229957, not a VAT payer). Bohemia Defense is a **project/brand, not a company**.
Mac user. Reply to David in Czech unless he writes in English. Be technical and brief.

## Working rules (non-negotiable)
- **Every change goes through a PR branch.** Validate the whole update (checks below), then merge to `main`. Never push straight to `main`.
- **Never commit secrets.** Keys live in GitHub Secrets and in server-only PHP files (see Secrets). Never print them in chat or logs.
- **Verify, don't assume.** Before claiming "done", run the checks, render the page, and scan the *built output* (not just source) for stale numbers.
- After any change to visible counts (minerals, sites, routes), run the consistency scan (see Checks) across all three sites **and images** (OG images contain text).

## The three sites
| Site | Stack | Hosting / deploy |
|---|---|---|
| `bohemiadefense.com/atlas` (OreOrbit) | static HTML/JS (three.js globe) + small PHP endpoints | WEDOS shared hosting, folder `/www/domains/bohemiadefense.com/atlas`; source in this repo (`atlas/`), auto-deployed over FTPS after merge (see Atlas deploy) |
| `bohemiadefense.com` | WordPress (Rank Math, W3 Total Cache); homepage + founder pages are Custom HTML blocks | WEDOS; HTML pasted into WP pages `home`, `cs`, `david-madali`, `david-madali-cz`; root files (`llms.txt`) via WebFTP |
| `madali.cz` | static HTML (EN `index.html`, CS `cs/index.html`) | GitHub Pages repo |

Robot: GitHub repo `oreorbit-updater` (Python), workflow `.github/workflows/update.yml`, cron **every 3 hours**, plus a daily heartbeat commit (`last-run.txt`) that keeps the schedule alive (GitHub disables schedules after 60 days without repo activity in public repos).

## Atlas deploy (since 2026-11-04)
- Source of truth for hand-written atlas files is `atlas/` in this repo. **Do not edit the atlas via WebFTP any more**: the next deploy overwrites server files with the repo version.
- Workflow `.github/workflows/deploy-atlas.yml` + `.github/scripts/deploy-atlas.sh` (lftp over FTPS, cert verified, temp file + rename):
  - **PR:** read-only check — logs in, verifies `index.html`, `atlas-main.js`, `update.php` exist (login must land in the atlas folder), lists what the merge would upload.
  - **Push to `main`:** uploads only atlas files changed in that push. **Never deletes** on the server (files removed in git are reported as a notice and must be removed by hand).
  - **Manual run** (Actions → Deploy atlas → Run workflow, `full`): uploads every tracked atlas file.
- FTP account `w366378_atlas`, chrooted to the atlas folder (remote paths are relative to `atlas/`). GitHub Secrets: `FTP_HOST`, `FTP_USER`, `FTP_PASS`; optional repo variable `FTP_VERIFY_CERT=no` if the certificate ever stops matching.
- **Not in the repo and never deployed** (git-ignored and skipped by the script's `PROTECTED` regex): server-only configs (templates `*.example.php` are in the repo), `subs/*`, `stats/*` (only their `.htaccess` is tracked), and everything the robot owns on the server via `update.php` `ALLOWED`: `live-data/`, `img/`, `p/`, `sitemap.xml`, `data/terrain/`, `data/{imagery,orbit-extras,timelapse,landsat,emit}.json`. If `ALLOWED` in `update.php` changes, update `PROTECTED` and `.gitignore` too.
- Pushing: `gh` is installed via Homebrew at `/opt/homebrew/bin/gh` (not on the default PATH; prefix `export PATH=/opt/homebrew/bin:$PATH`), logged in as `backyardmadeit-bit` with `repo` + `workflow` scopes; `git push` over HTTPS uses the macOS keychain. Claude pushes branches and opens PRs; David merges.
- Known harmless 404s: `textures/earth-day-hi.jpg`, `earth-night-hi.jpg` (never uploaded; the globe falls back to the normal textures).

## Atlas files (repo `atlas/` → WEDOS `atlas/`)
- `index.html` — page shell, CSS variables (mineral colours `--ree … --mn`), static SEO copy. Script tags carry `?v=` cache-busters: **bump them on every change**.
- `index.php` — serves `index.html` with a server-rendered news/brief block for crawlers; sends `Cache-Control: no-store`.
- `atlas-main.js` — core: data tables (`GROUPS/ORDER, PIN, MATERIALS, STAGES, STRATEGIC, SYSTEMS, SITES, ROUTES, PROD, CENTROID, ELEM, DEADLINES, CS` dictionary), globe, specimens (`BUILD[m]` 3D minerals), drawer, quick check, This week base. `T(en, cs)` and `trStr()` add Czech non-breaking spaces.
- `atlas-v2.js` — layered additions `v20 … v43` (UI redesigns, This week, plans, monitoring picker, Monday brief strip, focus label, pins, debug panel). Footer shows `build NN` (currently **43**). `?debug=1` shows a diagnostics panel; errors are counted via `count.php`.
- `atlas-v2.css` — styles, appended per version.
- `config.js` — public settings: `bookingUrl` (Calendly `https://calendly.com/david-madali/30min`), `monitoringPrice` "49", `monitoringPriceCzk` "1 200", `contactEmail`.
- `data/reference.json` — **single source of truth for the library pages**: `materials{info,stages,worst,deadlines,euSp,rir}`, `sites` (43), `order` (12), `scenarios`, `online`. Keep it in sync with `atlas-main.js` (extract via node, see Phase 4 history).
- PHP: `subscribe.php` (free brief sign-up → CSV, welcome email, replies before sending mail), `go-pay.php` (redirect to Stripe Payment Link, minerals hex-encoded in `client_reference_id` as `mins|other|lang`), `stripe-webhook.php` (activates/deactivates paid clients, welcome email, answers Stripe before emailing), `manage.php` (→ Stripe customer portal), `subs-export.php` (robot reads subscribers + state; same key as `update.php`), `unsubscribe.php`, `stats.php` (private, key-protected: traffic, data freshness from `live-data/live/runstatus.json`, subscriber list + CSV, paying-client delivery table), `mail-test.php`, `mail-lib.php` (branded HTML email, SMTP 465→587→`mail()` fallback, welcome emails, `oo_reply_now`), `count.php` (anonymous event counter, key format `^[a-z0-9:-]{1,40}$`).
- Server-only config (never commit, never show): `pay-config.php` (`payment_link`, `webhook_secret`, `portal_link`), `mail-config.php` (SMTP user/pass), `update-config.php` (key hash).
- `subs/` (not web-readable): `subscribers.csv` (`date, plan, email, minerals, product, lang, other`), `monitoring-active.txt` (paying emails, managed by the webhook), `state.json` (robot state + delivery log), `unsubscribed.txt`, `welcomed.txt`, `customers.json`.

## Robot (`updater/`)
- `oreorbit_update.py` — feeds with intervals (`INTERVAL_H`): orbits, hazards (GDACS, USGS quakes, **river gauges** PEGELONLINE: Kaub, Duisburg, Dresden), scenes, ships (AISStream; cargo types 70–79 only, fair share per box), hotspots (FIRMS), prices, traffic (PortWatch), clouds, conflict (UCDP), tenders (TED), trade (Eurostat Comext, `TRADE_CODES`), so2, imagery (Sentinel-2 cloud < 40, Landsat < 25), radar, news (RSS + GDELT `NEWS_GROUPS` + **US Federal Register BIS rules**), brief (rule-based weekly brief), pages, social. Uploads only changed files (md5) and writes `runstatus.json` every run.
- Email module `send_mail()`: free Monday brief (per subscriber minerals/language), paid personal Monday edition (status, "what it means", deadlines, what moved, rivers, other minerals), same-day alerts (new news, deadline reminders 30/14/7/1, river state changes, other-mineral news via GDELT once a day, max 8 queries/run), welcome fallback for anyone the website did not welcome, delivery log `state["log"]`, Monday delivery report to David.
- `oreorbit_pages.py` — builds ~87 library pages (`p/*.html`, EN; CS for services/about/index), sitemap, embeds, social cards. **Dependency Index stays on the original ten** (`INDEX_TEN`); Mg/Mn are stored in `extra` beside it.
- `config.json` — `sites` (43, for imagery/heat/SO2), `shipBoxes` (23, with `mins` for mineral ports), `sats`, `fred`, `portwatch`.
- Secrets (GitHub): `ATLAS_KEY`, `FIRMS_MAP_KEY`, `FRED_API_KEY`, `AISSTREAM_KEY`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM`; atlas deploy: `FTP_HOST`, `FTP_USER`, `FTP_PASS`.

## Minerals (12) — ids, colours, order
`ree` Nd #a78bfa · `ti` Ti #fb923c · `w` W #facc15 · `sb` Sb #a9b8cc · `mg` Mg #2dd4bf · `mn` Mn #e879f9 · `ga` Ga #22d3ee · `ge` Ge #4ade80 · `li` Li #f472b6 · `co` Co #60a5fa · `ni` Ni #a3e635 · `gr` C #e4e4e7
Mg and Mn were added in Nov 2026 (USGS MCS 2026: Mg China 86% of primary metal; Mn ore South Africa 38%, Mn metal China >95% per SMM). Adding a mineral touches: atlas tables (all of them, incl. `STAGES`, `ELEM`, `BUILD`, CSS vars, quick check `P` in atlas-v2, `SYSTEMS.parts`), PHP allow-lists (`go-pay.php`, `stripe-webhook.php`, `mail-lib.php` names), robot (`MAT_NAME`, `NEWS_Q`, `NEWS_KW`, `NEWS_GROUPS`, `TRADE_CODES`, `config.json`), pages (`SLUG`, `COL`, `MAT_CS`, `PRODUCTS`), `reference.json`, BD homepage + founder pages, madali.cz (`COL`, buttons, names, `__D.sites`), brand book p.11/p.21, OG image, `llms.txt`.
Counts today: **12 minerals, 43 sites, 11 trade routes**. "Nine of the twelve" have a stage where one country holds >65%.

## Business model
Free (atlas, quick check, This week, Monday brief by email) · **Monitoring €49/month** (Stripe, cancel anytime, 30-day money-back on request, refunds manual in Stripe) · Readiness review (tailored, via 30-min call).
Flow: plans → `go-pay.php` → Stripe → webhook → `monitoring-active.txt` + welcome → robot emails. Cancellation: Stripe portal → webhook removes client.

## Brand & copy rules (brand book v1.1)
- Dark first: bg #050607, paper #eceee9, single signal green #3ddc97 (small green text on light: #0f6b46). Fonts: Hanken Grotesk, DM Mono.
- Signet: planet outline, orbit −28°, green satellite. Same mark + favicon everywhere.
- Labels in sentence case, no letter-spacing. Headlines are declarative sentences ending with a period. British English. Czech: non-breaking space after single-letter words; natural, not literal translations. No hype words, emoji or exclamation marks in public copy.
- Mineral colours never mark state or buttons; always next to a symbol or name.
- Public pages: never mention Claude/AI tooling or data-source know-how beyond required licence credits (Copernicus in footer, others on the legal page). Show IČO, never the home address. Never mention the Ing. studies.

## Known pitfalls (learned the hard way)
- The atlas **rebuilds DOM it owns** (e.g. `#mon-pick`, the whole This week section in EN). Never keep element references; look up afresh (`PK()`), delegate clicks, and keep the 150 ms safety check. Use `window.ooSetMy(list)` to set the whole selection at once.
- The atlas's translation pass re-applies old CS strings after load; **pin** new texts (v31 `pin()` with canonical HTML, Czech spaces applied) or they revert.
- MutationObservers must not react to their own writes (caused page freezes twice).
- Text inside **images** is invisible to text scans — re-render OG images when counts change (`og-oreorbit-v2.png` is rendered from HTML with real site coordinates).
- Social platforms cache OG images by URL: change the filename, then re-scrape (LinkedIn Post Inspector, Facebook Sharing Debugger).
- WEDOS SMTP from PHP can be slow or blocked: always reply to the browser/Stripe first (`oo_reply_now`), then send mail; the robot re-sends welcomes that did not go out.

## Checks before merge
0. Atlas changes: the PR's "Deploy atlas" check must pass (it also runs `node --check` on `atlas/*.js`); after merge, confirm the deploy run succeeded and the live files match the repo (md5 of a few changed files).
1. `node --check` all JS; `python3 -m py_compile` robot files; PHP bracket balance (no PHP CLI locally) or `php -l` if available.
2. Build the library with `oreorbit_pages.build()` against local data; all pages build, JSON-LD parses.
3. Consistency scan of **built HTML + every source file on all three sites** for stale counts (regex on 31/9/10/ten/nine/deset/deseti/devíti near minerals/sites/routes words; allow-list: Dependency Index "ten index minerals", changelog "First version …"). Compare against computed truth: `len(order)`, `len(sites)`, route count.
4. Headless render (Playwright) of atlas EN and CS (`?debug=1`): no `ooErrs`, quick check → This week sync, phone width 390 px without overflow.
5. Dry-run `send_mail()` with stubbed SMTP and subscribers for free, paid and alert paths.

## Open tasks (from the last brief)
1. ~~**Funnel**~~ done in build 43: quick check result → primary CTA "Get alerts for these N minerals" (`.qc-mon`, sets the plan via `window.ooMonSet`, scrolls to `#teams .pl3-b`, counts `act:qc-mon`), full review secondary, call as a text link.
2. **Validation:** "Other minerals" field — allow-list + autocomplete, inline error for unknown terms, same allow-list server-side in `go-pay.php`; robot reports "no news found in 14 days" per term.
3. **Free vs paid:** define "full evidence data" (history + CSV + per-site alerts for paid) and update plans, services pages and emails consistently.
4. **Globe:** ship visibility (renderOrder, size with zoom, neutral high-contrast colour), site labels at lower zoom with collision handling (currently `cam.dist < 1.9` with a filter or `< 1.55`), imagery fallback (relax cloud cover, Sentinel-1 radar, "last clear view" date).
5. **Content automation:** replace hard-coded counts with values computed from `reference.json` in pages and atlas; add the consistency scan to CI.
6. **Higher-value services:** data API/feed, multi-seat team alerts, BOM screening (see brief).
