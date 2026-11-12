#!/usr/bin/env bash
# Uploads atlas/ files to WEDOS over FTPS. Never deletes anything on the server.
#   MODE=check  -> connect, verify the account points at the atlas folder, list what would be uploaded
#   MODE=deploy -> upload the listed files (temp file + rename, so visitors never get a half-written file)
# Inputs (env): MODE, RANGE ("<base> <head>" or "all"), FTP_HOST, FTP_USER, LFTP_PASSWORD
set -euo pipefail

# Paths the deploy must never write: server-only secrets, personal data, stats, and everything the
# robot owns (see ALLOWED in atlas/update.php). Most are git-ignored; this is the safety net.
# CLAUDE.md files are notes for Claude: tracked in git, never uploaded.
PROTECTED='^atlas/((pay|mail|update)-config\.php$|.*\.example\.php$|subs/|stats/|live-data/|img/|p/|sitemap\.xml$|data/terrain/|data/(imagery|orbit-extras|timelapse|landsat|emit)\.json$|(.*/)?\.DS_Store$|(.*/)?CLAUDE\.md$)'

if [ "$RANGE" = "all" ]; then
  git ls-files -- atlas/ > /tmp/candidates
else
  read -r BASE HEAD <<<"$RANGE"
  git diff --name-only --diff-filter=ACMRT "$BASE" "$HEAD" -- atlas/ > /tmp/candidates
  git diff --name-only --diff-filter=D "$BASE" "$HEAD" -- atlas/ > /tmp/deleted || true
  if [ -s /tmp/deleted ]; then
    echo "::notice::Removed in git but left on the server (the deploy never deletes):"
    sed 's/^/  /' /tmp/deleted
  fi
fi
grep -Ev "$PROTECTED" /tmp/candidates > /tmp/upload || true
SKIPPED=$(grep -Ec "$PROTECTED" /tmp/candidates || true)

echo "Files to upload: $(wc -l < /tmp/upload | tr -d ' ')  (protected, skipped: ${SKIPPED:-0})"
sed 's/^/  /' /tmp/upload

{
  echo "set cmd:fail-exit yes"
  echo "set ftp:ssl-force yes"
  echo "set ftp:ssl-protect-data yes"
  echo "set ssl:verify-certificate ${FTP_VERIFY_CERT:-yes}"
  echo "set net:timeout 20"
  echo "set net:max-retries 2"
  echo "set net:reconnect-interval-base 5"
  echo "set xfer:use-temp-file yes"
  echo "open --env-password -u \"$FTP_USER\" \"$FTP_HOST\""
  # Refuse to touch anything unless the login lands in the atlas folder.
  echo "cls -1 index.html atlas-main.js update.php"
  if [ "$MODE" = "deploy" ]; then
    while IFS= read -r f; do
      rel="${f#atlas/}"
      dir=$(dirname "$rel")
      [ "$dir" != "." ] && echo "mkdir -p -f \"$dir\""
      echo "put \"$f\" -o \"$rel\""
    done < /tmp/upload
  fi
  echo "bye"
} > /tmp/lftp-script

if [ "$MODE" = "deploy" ] && [ ! -s /tmp/upload ]; then
  echo "Nothing to upload."
  exit 0
fi
lftp -f /tmp/lftp-script
echo "Done ($MODE)."
