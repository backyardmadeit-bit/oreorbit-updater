---
name: atlas-release
description: Ship a change to the OreOrbit atlas (bohemiadefense.com/atlas, files in atlas/) as a new build. Covers the worktree, the build number and cache-busters, the build note, all checks including a headless render in English and Czech, the PR, and the live check after David merges. Use it whenever work in atlas/ is meant to go live, such as a copy fix, a data or deadline update, a new panel or a Czech wording fix, even when the request only says "udělej build", "nasaď", "vydej atlas", "oprav to na webu" or "ship it".
---

# Atlas release

The atlas is deployed by GitHub Actions the moment a PR is merged to `main`. A merge is the release, so everything below happens before the PR is opened. David merges; Claude prepares the branch, proves it works, and checks the live site afterwards.

Read `atlas/CLAUDE.md` first: it lists the files, the build history and the pitfalls this skill only names.

## 1. Branch

Several sessions share the main checkout, so never switch branches or stash there. Start a worktree from the current `main`:

```bash
git fetch origin && git worktree add .claude/worktrees/<topic> -b <topic> origin/main
```

Find the current build in the footer line of `atlas/atlas-v2.js` (`s.textContent = "build NN"`). The new build is NN + 1. One PR is one build. Two small fixes going out together share a number.

## 2. While changing the atlas

These have broken the live page before:
- The atlas rebuilds DOM it owns. Look elements up again each time, delegate clicks, and use `window.ooSetMy(list)` for the selection.
- The Czech translation pass re-applies old strings. Pin every new Czech text (v31 `pin()`). Translate text concatenated in JS at the source, because the pass never sees it.
- Changing the opening (hero, badge, CTAs) means three places: the JS, the static `index.html`, and the Czech swaps in `index.php`. Otherwise the page shifts or changes language after load.
- A MutationObserver must never react to its own writes.
- Never type a price. It comes from `config.js`.
- A moved deadline lives in three places: `DEADLINES`, `ROAD` (`atlas-main.js`), and `materials.*.deadlines` in `data/reference.json`. A moved deadline gets a new `id`.

## 3. Bump

Browsers and the server cache by URL, so every changed asset needs a new `?v=`. Without it visitors keep the old file for days.

| Changed file | Bump |
|---|---|
| `atlas-v2.css` | `atlas-v2.css?v=` in `index.html` |
| `config.js` | `config.js?v=` in `index.html` |
| `atlas-main.js` | `atlas-main.js?v=` in `index.html` |
| `atlas-v2.js` | `atlas-v2.js?v=` in `index.html` |
| `data/other-minerals.json` | `other-minerals.json?v=` in `atlas-v2.js` |

Also:
- **Build number:** the footer line in `atlas-v2.js`.
- **Build note:** add a short "Build NN" entry to "Done in earlier builds" in `atlas/CLAUDE.md`. Say what changed and any trap a later session must know.
- **Private notes:** if `~/.claude/CLAUDE.md` exists on this machine, update its build number and recent-builds list too.

## 4. Check

Run all of these from the worktree root. Fix anything that fails before going on.

```bash
for f in atlas/*.js; do node --check "$f" || echo "FAIL $f"; done
python3 -m py_compile updater/*.py tools/*.py
python3 .claude/skills/atlas-release/scripts/php_balance.py atlas/*.php
python3 tools/build_pages.py "$SCRATCH/pages" && python3 tools/consistency_scan.py --pages "$SCRATCH/pages"
```

`$SCRATCH` is the session scratchpad. If `php -l` is available, use it as well: CI has it, the Mac does not.

**Headless render.** Run this in a Python environment that has Playwright. It is not installed system-wide: reuse a venv that has it, or create one in the scratchpad with `python -m pip install playwright` and `python -m playwright install chromium`.

```bash
"$VENV/bin/python" .claude/skills/atlas-release/scripts/render_check.py atlas "$SCRATCH/shots" --build NN
```

The script serves `atlas/` locally. It loads `index.html?debug=1` in EN and CS, at desktop width and at 390 px. Each view must show:
- no `ooErrs` and no page errors
- the right `lang`
- no horizontal overflow
- exactly one `h1`
- the new build number

Open the screenshots and look at what you changed. Local runs have no `live-data/` (the robot owns it on the server), so empty live panels are expected.

Then check by hand in the CS render: the quick check result and This week show the same minerals.

**Depending on what changed:**
- **Visible counts** (minerals, sites, routes): run `tools/consistency_scan.py --remote` too. Re-render images that contain the counts, because text scans cannot read pixels.
- **Robot or emails:** dry-run `send_mail()` with stubbed SMTP (see `updater/CLAUDE.md`).
- **A deadline or the brief's wording:** the live brief keeps its old text until the robot runs. Note in the PR that a forced run is needed after merge.

## 5. Open the PR

1. Commit only the files you changed.
2. Push the branch.
3. Open the PR with `gh pr create`. In the body, list what changed, the checks you ran with their results, and whether a forced robot run is needed.

The PR's "Deploy atlas" check is read-only. It logs in to the server and lists exactly what the merge will upload. When CI reports, read that list once and confirm it matches your change; don't poll.

Then hand David the PR link. He merges.

## 6. After David merges

1. **Deploy run:** confirm it succeeded and uploaded what the PR check listed:
   ```bash
   gh run list --workflow deploy-atlas.yml --limit 3
   gh run view <id> --log | grep -E "Files to upload|put "
   ```
2. **Live files:** compare them with the repo. The script fetches with a cache-busting query and prints match or DIFF per file:
   ```bash
   python3 .claude/skills/atlas-release/scripts/live_md5.py atlas-main.js atlas-v2.js index.html
   ```
3. **Real page load:** run the render check against the live site. Live data is present there, so the live panels should fill.
   ```bash
   "$VENV/bin/python" .claude/skills/atlas-release/scripts/render_check.py https://bohemiadefense.com/atlas/ "$SCRATCH/live" --build NN
   ```
4. **Forced robot run:** if the PR needs one, ask David first, because a robot run can send email. Then start it with `gh workflow run update.yml -f force=true`.

The deploy never deletes. A file removed in git stays on the server until David removes it by hand, so tell him which one.

Report what is live and verified, and what is not.
