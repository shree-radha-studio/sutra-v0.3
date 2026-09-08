#!/usr/bin/env bash
# Replace design-system/ with the newest "Sutra Design System.zip" export from ~/Downloads.
#
# Usage:  bash tools/refresh-design-system.sh            # newest zip in ~/Downloads
#         bash tools/refresh-design-system.sh path/to.zip
#
# design-system/ is a READ-ONLY snapshot of the Claude Design project. Never edit it here;
# edit in Claude Design, re-export (Share > Project HTML > Project archive), then run this.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEST="$ROOT/design-system"
STAMP="$ROOT/DESIGN-SYSTEM-SOURCE.md"
cd "$ROOT"   # never run with cwd inside design-system (Windows refuses to delete a busy dir)

if [[ $# -ge 1 ]]; then
  ZIP="$1"
else
  ZIP="$(ls -t "$HOME"/Downloads/"Sutra Design System"*.zip 2>/dev/null | head -1 || true)"
fi
[[ -n "${ZIP:-}" && -f "$ZIP" ]] || { echo "No 'Sutra Design System*.zip' found in ~/Downloads (or given path missing)"; exit 1; }

echo "Source zip : $ZIP"
echo "Zip mtime  : $(date -r "$ZIP" '+%Y-%m-%d %H:%M')"

TMP="$(mktemp -d)"
unzip -q "$ZIP" -d "$TMP"

# Clear contents rather than removing the directory itself: a junction
# (.claude/skills/sutra-design) points at it and an open shell may sit inside it.
mkdir -p "$DEST"
find "$DEST" -mindepth 1 -delete
cp -r "$TMP"/. "$DEST"/
rm -rf "$TMP"

FILES=$(find "$DEST" -type f | wc -l | tr -d ' ')
SIZE=$(du -sh "$DEST" | cut -f1)
EXPORTED="$(date -r "$ZIP" '+%Y-%m-%d %H:%M')"

# Rewrite the "Last export" block in the source-of-truth note.
if [[ -f "$STAMP" ]]; then
  python - "$STAMP" "$EXPORTED" "$FILES" "$SIZE" "$ZIP" <<'PY'
import re, sys
p, exported, files, size, zip_ = sys.argv[1:]
s = open(p, encoding="utf-8").read()
block = f"<!-- export-stamp -->\n- Last export: {exported}\n- Files: {files} ({size})\n- Zip: {zip_}\n<!-- /export-stamp -->"
pat = re.compile(r"<!-- export-stamp -->.*?<!-- /export-stamp -->", re.S)
s2 = pat.sub(block, s, count=1) if pat.search(s) else s.rstrip("\n") + "\n\n" + block + "\n"
open(p, "w", encoding="utf-8").write(s2)
PY
fi

echo "Refreshed  : $DEST  ($FILES files, $SIZE)"
