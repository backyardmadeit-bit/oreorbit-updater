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
- `atlas-v2.js` — layered additions `v20 … v46` (UI redesigns, This week, plans, monitoring picker, Monday brief strip, focus label, pins, debug panel). Footer shows `build NN` (currently **46**). `?debug=1` shows a diagnostics panel; errors are counted via `count.php`.
- `atlas-v2.css` — styles, appended per version.
- `config.js` — public settings: `bookingUrl` (Calendly `https://calendly.com/david-madali/30min`), `monitoringPrice` "49", `monitoringPriceCzk` "1 200", `contactEmail`.
- `data/reference.json` — **single source of truth for the library pages**: `materials{info,stages,worst,deadlines,euSp,rir}`, `sites` (43), `order` (12), `routes` (11 ids, must match `ROUTES` in `atlas-main.js`; the scan fails otherwise), `scenarios`, `online`. Keep it in sync with `atlas-main.js` (extract via node, see Phase 4 history).
- `data/other-minerals.json` — allow-list of minerals a monitoring client can add beyond the tracked twelve (`other`: id, en, cs, news query `q`, aliases `aka`; `tracked`: aliases that map typed names to tracked ids; `max` 3). Read by the atlas autocomplete (v44), `other-lib.php` (`oo_other_ids()`, used by `go-pay.php` and `stripe-webhook.php`; only these ids pass) and the robot (`_other_terms`, `_other_news`). Clients' `other` column holds ids like `cu,sn`; older free text is matched by name or kept as typed.
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
Mg and Mn were added in Nov 2026 (USGS MCS 2026: Mg China 86% of primary metal; Mn ore South Africa 38%, Mn metal China >95% per SMM). Adding a mineral touches: atlas tables (all of them, incl. `STAGES`, `ELEM`, `BUILD`, CSS vars, quick check `P` in atlas-v2, `SYSTEMS.parts`), PHP allow-lists (`go-pay.php`, `stripe-webhook.php`, `mail-lib.php` names), `data/other-minerals.json` (`tracked` aliases; remove the mineral from `other` if it was there), robot (`MAT_NAME`, `NEWS_Q`, `NEWS_KW`, `NEWS_GROUPS`, `TRADE_CODES`, `config.json`), pages (`SLUG`, `COL`, `MAT_CS`, `PRODUCTS`), `reference.json`, BD homepage + founder pages, madali.cz (`COL`, buttons, names, `__D.sites`), brand book p.11/p.21, OG image, `llms.txt`.
Counts today: **12 minerals, 43 sites, 11 trade routes**. "Nine of the twelve" have a stage where one country holds >65%.

## Business model
Free (atlas, quick check, This week; with an email: Monday brief + all live-data panels in full) · **Monitoring €49/month** (Stripe, cancel anytime, 30-day money-back on request, refunds manual in Stripe): same-day alerts, personal Monday edition, deadline reminders, **site alerts** (`_site_events`: heat quiet 7 days after 4+ hot days / start-up / first SO2 > 2 DU in 30 days, for the sites of the client's minerals) and **a weekly CSV attached to the Monday edition** (`_data_csv`: monthly EU imports, daily heat and SO2 per site) · Readiness review (tailored, via 30-min call). Price comes from `config.js` everywhere (services pages are patched in `build()`; never type a price).
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
2. Build the library: `python3 tools/build_pages.py OUT` (reference/config from the repo, robot data from local `atlas/` or the live site); all pages build, JSON-LD parses. Runs in CI (`.github/workflows/checks.yml`).
3. Consistency scan: `python3 tools/consistency_scan.py --pages OUT [--remote]`. Truth is computed (minerals, sites, routes from `reference.json`; "nine of the twelve" = minerals whose `worst` stage is above 65 %). Flags numbers near minerals/sites/routes words (EN + CS, digits and words) that are close to the truth but wrong. Allow-list in the script (`ALLOW`: Dependency Index ten, score out of 9, EU strategic projects, changelog); archived briefs (`p/brief-*.html`, `p/briefs.html`) are notes only. Runs in CI on every PR and fails it; `--remote` scans the WordPress pages and madali.cz as warnings. Images are still not covered: re-render OG images by hand.
4. Headless render (Playwright) of atlas EN and CS (`?debug=1`): no `ooErrs`, quick check → This week sync, phone width 390 px without overflow.
5. Dry-run `send_mail()` with stubbed SMTP and subscribers for free, paid and alert paths.

## Open tasks (from the last brief)
1. ~~**Funnel**~~ done in build 43: quick check result → primary CTA "Get alerts for these N minerals" (`.qc-mon`, sets the plan via `window.ooMonSet`, scrolls to `#teams .pl3-b`, counts `act:qc-mon`), full review secondary, call as a text link.
2. ~~**Validation**~~ done in build 44: "Other minerals" = chips from `data/other-minerals.json` with autocomplete, inline error and payment blocked for unknown words, tracked names added to the selection; same allow-list in `go-pay.php`/webhook; robot shows "no news found in the last 14 days" per quiet term in the paid Monday edition and lists quiet terms in David's delivery report (`state.other[term].first/hit`).
3. ~~**Free vs paid**~~ done in build 45 (see Business model). Dead code in atlas-v2.js v25/v26 still has old €390 / analyst-note copy (not rendered; v27 `.pl3` replaces it).
4. ~~**Globe**~~ done in build 46: ships drawn after the clouds (`renderOrder 3/4`) with a neutral light-disc/dark-rim marker sized by zoom (`shipMarkTex`, hidden close in); site labels from `cam.dist < 2.45`, placed by priority (selected, hovered, filtered mineral, nearest centre) with collision boxes that also avoid ship and hazard labels, capped by zoom; robot `s2_clear_scene(relaxed=True)` for pictures over 30 days old (scenes < 80 % cloud, box ≥ 75 % clear, stores `nowClearPct`); drawer shows "Last clear view: date, N days ago" with a link to the radar view, or "Partly cloudy: X % clear".
5. **Content automation:** done for the robot (build 43+): library index, About EN/CS, social cards, brief lede, welcome fallbacks and `mail-lib.php` compute counts (`oreorbit_pages.counts()`, `w_en()`, `w_cs()`); consistency scan runs in CI. Still static (guarded by the scan, not computed): atlas `index.html`/`index.php` SEO copy and the atlas JS strings.
6. **Higher-value services:** data API/feed, multi-seat team alerts, BOM screening (see brief).
