# CLAUDE.md — OreOrbit / Bohemia Defense / madali.cz

This repo is **public**. Keep personal, sales and account details out of it, and out of every file Claude writes here.

This file is the hub. More detail loads when you work in a folder:
- [`atlas/CLAUDE.md`](atlas/CLAUDE.md): atlas files, PHP endpoints, build notes 47–58, Czech wording rules, atlas pitfalls.
- [`updater/CLAUDE.md`](updater/CLAUDE.md): robot feeds, emails, mail safety net, library pages, SEO/GEO.
- `docs/wordpress/README.md`: WordPress pages and the site-wide JSON-LD.
- `docs/sales/README.md`: the sales guide PDF.

Owner: David Madali, Prague, a sole trader (IČO 22229957, not a VAT payer). Bohemia Defense is a **project/brand, not a company**.
Reply to David in Czech unless he writes in English. Be technical and brief.

## Working rules (non-negotiable)
- **Every change goes through a PR branch.**
  - Validate the whole update (checks below).
  - Claude pushes the branch and opens the PR with `gh`; David merges. Never push straight to `main`.
  - Several sessions may share one checkout: work in a worktree, never switch branches or stash there, and commit only your own files.
- **Never commit secrets.** Keys live in GitHub Secrets and in server-only PHP files (see `atlas/CLAUDE.md`). Never print them in chat or logs.
- **Verify, don't assume.** Before claiming "done", run the checks, render the page, and scan the *built output* (not just the source) for stale numbers.
- After any change to visible counts (minerals, sites, routes), run the consistency scan (see Checks) across all three sites **and images**: OG images contain text.

## The three sites
| Site | Stack | Hosting / deploy |
|---|---|---|
| `bohemiadefense.com/atlas` (OreOrbit) | static HTML/JS (three.js globe) + small PHP endpoints | WEDOS shared hosting, folder `/www/domains/bohemiadefense.com/atlas`. Source is `atlas/` in this repo, auto-deployed over FTPS after merge (see Atlas deploy). |
| `bohemiadefense.com` | WordPress (Elementor, Rank Math, W3 Total Cache) | WEDOS. HTML is pasted by hand into the home pages (EN/CS) and the founder pages `david-madali` and `david-madali-cz`. Root files (`llms.txt`) go up via WebFTP. See `docs/wordpress/`. |
| `madali.cz` | static HTML (EN `index.html`, CS `cs/index.html`) | GitHub Pages, repo `backyardmadeit-bit/madali.cz` |

Robot:
- Python in `updater/`, workflow `.github/workflows/update.yml`, cron **every 3 hours**.
- A daily heartbeat commit (`last-run.txt`) keeps the schedule alive: GitHub disables schedules after 60 days without repo activity in public repos.

## Atlas deploy (since 2026-11-04)
- The source of truth for hand-written atlas files is `atlas/` in this repo. **Do not edit the atlas via WebFTP any more**: the next deploy overwrites server files with the repo version.
- Workflow `.github/workflows/deploy-atlas.yml` + `.github/scripts/deploy-atlas.sh` (lftp over FTPS, certificate verified, temp file + rename):
  - **PR:** read-only check. It logs in, verifies that `index.html`, `atlas-main.js` and `update.php` exist (the login must land in the atlas folder), and lists what the merge would upload.
  - **Push to `main`:** uploads only the atlas files changed in that push. **It never deletes** on the server: files removed in git are reported as a notice and must be removed by hand.
  - **Manual run** (Actions → Deploy atlas → Run workflow, `full`): uploads every tracked atlas file.
- A dedicated FTP account is chrooted to the atlas folder, so remote paths are relative to `atlas/`.
  - Credentials: GitHub Secrets `FTP_HOST`, `FTP_USER`, `FTP_PASS`.
  - Optional repo variable `FTP_VERIFY_CERT=no`, if the certificate ever stops matching.
- **Never deployed** (skipped by the script's `PROTECTED` regex):
  - Also git-ignored:
    - server-only configs (the `*.example.php` templates are in the repo)
    - `subs/*` and `stats/*` (only their `.htaccess` is tracked)
    - everything the robot owns on the server via `update.php` `ALLOWED`: `live-data/`, `img/`, `p/`, `sitemap.xml`, `data/terrain/`, `data/{imagery,orbit-extras,timelapse,landsat,emit}.json`
  - Tracked but never uploaded: `atlas/CLAUDE.md` (notes for Claude).
  - If `ALLOWED` in `update.php` changes, update `PROTECTED` and `.gitignore` too.

## Minerals (12): ids, colours, order
`ree` Nd #a78bfa · `ti` Ti #fb923c · `w` W #facc15 · `sb` Sb #a9b8cc · `mg` Mg #2dd4bf · `mn` Mn #e879f9 · `ga` Ga #22d3ee · `ge` Ge #4ade80 · `li` Li #f472b6 · `co` Co #60a5fa · `ni` Ni #a3e635 · `gr` C #e4e4e7

Mg and Mn were added in Nov 2026. Sources: USGS MCS 2026 for Mg (China 86 % of primary metal) and Mn ore (South Africa 38 %); SMM for Mn metal (China >95 %).

**Adding a mineral touches:**
- atlas tables: all of them, incl. `STAGES`, `ELEM`, `BUILD`, the CSS vars, quick check `P` in atlas-v2 and `SYSTEMS.parts`
- PHP allow-lists: `go-pay.php`, `stripe-webhook.php`, `mail-lib.php` names
- `data/other-minerals.json`: `tracked` aliases; remove the mineral from `other` if it was there
- robot: `MAT_NAME`, `NEWS_Q`, `NEWS_KW`, `NEWS_GROUPS`, `TRADE_CODES`, `config.json`
- pages: `SLUG`, `COL`, `MAT_CS`, `PRODUCTS`
- `reference.json`
- BD homepage and founder pages
- madali.cz: `COL`, buttons, names, `__D.sites`
- brand book p. 11 and p. 21
- OG image
- `llms.txt`

**Counts today: 12 minerals, 43 sites, 11 trade routes.**
- "Ten of the twelve" have a stage where one country holds >65 %. China holds it in nine; for nickel it is Indonesia, 67 % of mine output.
- Since build 57 the atlas figures come from USGS MCS 2026 (2025 data) and IEA GCMO 2026.

## Business model
- **Free:** atlas, quick check, This week. With an email address: the Monday brief, plus all live-data panels in full.
- **Monitoring, €49/month** (Stripe):
  - Cancel anytime. 30-day money-back on request; refunds are done by hand in Stripe.
  - **One question a month, answered by David within two working days.** Clients ask by replying to any monitoring email.
  - Same-day alerts, personal Monday edition, deadline reminders.
  - **Site alerts** (`_site_events`), for the sites of the client's minerals: heat goes quiet for 7 days after 4+ hot days, a start-up, or the first SO2 > 2 DU in 30 days.
  - **A weekly CSV attached to the Monday edition** (`_data_csv`): monthly EU imports, daily heat and SO2 per site.
- **Readiness review:** tailored, scoped and priced in a free 30-minute intro call. **No published price**: the old €4,900 / €2,900 is void as of 2026-11-06.
- **The price comes from `config.js` everywhere.** The services pages are patched in `build()`. Never type a price.
- **Flow:** plans → `go-pay.php` → Stripe → webhook → `monitoring-active.txt` + welcome email → robot emails. Cancellation: Stripe portal → webhook removes the client.

## Brand & copy rules (brand book v1.1)
- Dark first: background #050607, paper #eceee9, one signal green #3ddc97 (small green text on light: #0f6b46). Fonts: Hanken Grotesk, DM Mono.
- Signet: planet outline, orbit at −28°, green satellite. The same mark and favicon everywhere.
- Labels in sentence case, no letter-spacing. Headlines are declarative sentences ending with a period. British English.
- Czech: a non-breaking space after single-letter words. Natural, not literal, translations.
- No hype words, emoji or exclamation marks in public copy.
- Mineral colours never mark state or buttons, and always sit next to a symbol or name.
- Public pages:
  - Never mention Claude/AI tooling, or data-source know-how beyond the required licence credits (Copernicus in the footer, the others on the legal page).
  - Show the IČO, never the home address.
  - No degree or school in public copy or JSON-LD (no `alumniOf`).

## Cross-site pitfalls
- Text inside **images** is invisible to text scans. Re-render OG images when counts change (`og-oreorbit-v2.png` is rendered from HTML with real site coordinates).
- Social platforms cache OG images by URL. Change the filename, then re-scrape (LinkedIn Post Inspector, Facebook Sharing Debugger).
- WEDOS SMTP from PHP can be slow or blocked. Always reply to the browser or Stripe first (`oo_reply_now`), then send mail. The robot re-sends welcome emails that did not go out.

## Checks before merge
0. **Atlas changes:** the PR's "Deploy atlas" check must pass (it also runs `node --check` on `atlas/*.js`). After merge, confirm that the deploy run succeeded and that the live files match the repo (md5 of a few changed files).
1. **Syntax:** `node --check` all JS; `python3 -m py_compile` the robot files; PHP bracket balance (no PHP CLI locally), or `php -l` if available.
2. **Build the library:** `python3 tools/build_pages.py OUT` (reference and config from the repo; robot data from local `atlas/` or the live site). All pages build and the JSON-LD parses. Runs in CI (`.github/workflows/checks.yml`).
3. **Consistency scan:** `python3 tools/consistency_scan.py --pages OUT [--remote]`.
   - The truth is computed: minerals, sites and routes from `reference.json`; "ten of the twelve" = minerals whose `worst` stage is above 65 %.
   - It flags numbers near minerals/sites/routes words (EN + CS, digits and words) that are close to the truth but wrong.
   - Allow-list in the script (`ALLOW`): Dependency Index ten, score out of 9, EU strategic projects, changelog.
   - Archived briefs (`p/brief-*.html`, `p/briefs.html`) are notes only.
   - JSON-LD blocks are scanned too, because search engines show them.
   - Files named `CLAUDE.md` are skipped, since they quote old numbers on purpose.
   - Runs in CI on every PR and fails it. `--remote` scans the WordPress pages and madali.cz as warnings. WordPress has a hand-made site-wide JSON-LD block (not Rank Math) with prices and counts: see `docs/wordpress/`.
   - Images are still not covered: re-render OG images by hand.
4. **Headless render** (Playwright) of the atlas in EN and CS (`?debug=1`): no `ooErrs`, quick check → This week sync, phone width 390 px without overflow.
5. **Dry-run `send_mail()`** with stubbed SMTP and subscribers, for the free, paid and alert paths.

## Open tasks (from the last brief)
1. ~~**Funnel**~~ done in build 43. Details in `atlas/CLAUDE.md`.
2. ~~**Validation**~~ done in build 44. Details in `atlas/CLAUDE.md`.
3. ~~**Free vs paid**~~ done in build 45 (see Business model). The old €390 / analyst-note copy in the unused v20–v26 layouts was replaced in build 55.
4. ~~**Globe**~~ done in build 46. Details in `atlas/CLAUDE.md`.
5. **Content automation:**
   - Done for the robot (build 43+): the library index, About EN/CS, social cards, the brief lede, welcome fallbacks and `mail-lib.php` compute counts (`oreorbit_pages.counts()`, `w_en()`, `w_cs()`). The consistency scan runs in CI.
   - Still static (guarded by the scan, not computed): atlas `index.html`/`index.php` SEO copy and the atlas JS strings.
6. **Higher-value services:** data API/feed, multi-seat team alerts, BOM screening (see the brief).
