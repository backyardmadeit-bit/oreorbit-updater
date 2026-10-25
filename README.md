# OreOrbit free updater

Fetches the atlas's live data from free public sources every three hours and sends it to
`update.php` on the website, in the formats the page already reads. It runs on GitHub Actions,
so it keeps working on any Claude plan, including the free one.

A feed that fails is never uploaded: the website keeps its last good data and the Data health
panel shows its age.

## What it updates

| Feed | Source | How often | Needs a key |
|---|---|---|---|
| Satellite orbits | CelesTrak | every 3 h | no |
| Earthquakes and disaster alerts | USGS, GDACS | every 3 h | no |
| Newest Sentinel-2 passes | Earth Search | every 3 h | no |
| Ships near chokepoints | AISStream.io | every 3 h | `AISSTREAM_KEY` |
| Heat at the plants + daily history | NASA FIRMS | twice a day | `FIRMS_MAP_KEY` |
| Prices | FRED | daily | `FRED_API_KEY` |
| Chokepoint and port traffic | IMF PortWatch | weekly | no |

Not yet covered (they keep their last data until added): clouds, sulphur dioxide, mine images,
radar, EU tenders, EU imports, armed conflict, the news wire, the Monday brief and the weekly memory.

## Setup (about 20 minutes)

### 1. Get the free keys
- **NASA FIRMS:** https://firms.modaps.eosdis.nasa.gov/api/map_key/ (enter your email, the key arrives by mail)
- **FRED:** https://fred.stlouisfed.org/docs/api/api_key.html (free account, then "Request API key")
- **AISStream:** https://aisstream.io (sign in with GitHub, then "API Keys")

Feeds without a key are simply skipped.

### 2. The update key
Open `tools/make-key.html` on your computer (double-click it).
- If you can copy the key from your old scheduled task, use part **B** to check it. If it matches,
  use it and change nothing on the website.
- Otherwise use part **A**: put the new key into GitHub (step 4), and replace the contents of
  `atlas/update-config.php` in WebFTP with the one line it shows. The old task then stops writing.

### 3. Create the repository
On GitHub: **New repository** → name `oreorbit-updater` → **Public** → Create.
Then **Add file → Upload files** and drag in everything from this folder, including the
`.github` folder. If the `.github` folder does not come across, use **Add file → Create new file**,
type `.github/workflows/update.yml` as the name, and paste the file's contents.

### 4. Add the secrets
Repository **Settings → Secrets and variables → Actions → New repository secret**, one for each:
`ATLAS_KEY`, `FIRMS_MAP_KEY`, `FRED_API_KEY`, `AISSTREAM_KEY`.

### 5. First run
**Actions** tab → enable workflows if asked → **OreOrbit data** → **Run workflow** → tick
"Refresh every feed now" → Run. After 3 to 5 minutes, open the run and read the log: each feed
says `ok`, `skipped` or `FAILED`. Then check the Data health panel on the atlas.

From then on it runs by itself every three hours.

## Notes
- The repository is public so the scheduled runs are free. Only the code is visible; the keys stay
  in GitHub Secrets.
- GitHub pauses schedules in repositories with no activity for 60 days. The workflow saves the date
  in `.github/last-run.txt` once a day to stay active.
- Scheduled runs can start a few minutes late. That does not matter for these feeds.
- To test without touching the website: run `DRY_RUN=1 python updater/oreorbit_update.py`;
  it writes the files to `out/` instead.
