#!/usr/bin/env bash
# Verify a module page of the Sutra board with headless Chrome, without the in-app browser (which times out on it).
#   bash .claude/skills/sutra-mockups/scripts/board-check.sh <module id> [frame id ...]
#   bash .claude/skills/sutra-mockups/scripts/board-check.sh crm n-3 nwd-7
# Prints: mount time, frame count, console errors. For each frame id, saves .board-check/<module>-<id>.png.
# Starts its own static server on a free port and stops it afterwards. Needs Google Chrome (or Chromium / Edge) and Python 3.
set -uo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
MOD="${1:?module id, e.g. crm}"; shift || true
OUT="$ROOT/.board-check"; mkdir -p "$OUT"

find_browser() {
  for c in "$PROGRAMFILES/Google/Chrome/Application/chrome.exe" "/c/Program Files/Google/Chrome/Application/chrome.exe" \
           "/c/Program Files (x86)/Google/Chrome/Application/chrome.exe" "/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" \
           "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" google-chrome chromium chromium-browser microsoft-edge; do
    if [[ -x "$c" ]] || command -v "$c" >/dev/null 2>&1; then echo "$c"; return; fi
  done
}
CH="$(find_browser)"; [[ -n "$CH" ]] || { echo "no Chrome / Chromium / Edge found"; exit 1; }

PORT="$(python -c 'import socket;s=socket.socket();s.bind(("127.0.0.1",0));print(s.getsockname()[1]);s.close()')"
(cd "$ROOT" && python -m http.server "$PORT" --bind 127.0.0.1 >/dev/null 2>&1) & SRV=$!
trap 'kill $SRV 2>/dev/null' EXIT
sleep 1
BASE="http://127.0.0.1:$PORT/explorations/catalogue-v2/board.html?m=$MOD"
PROF="$OUT/.profile-$$"

render() { # $1 url, $2 window size, $3 screenshot path or "", $4 dom path
  local shot=(); [[ -n "$3" ]] && shot=(--screenshot="$3")
  timeout 150 "$CH" --headless=new --disable-gpu --no-sandbox --user-data-dir="$PROF" --window-size="$2" \
    --virtual-time-budget=15000 --enable-logging=stderr --v=0 "${shot[@]}" --dump-dom "$1" > "$4" 2> "$4.log"
}

# whole page
render "$BASE&t=1" 1800,1000 "" "$OUT/$MOD.html"
TITLE="$(grep -o '<title>[^<]*' "$OUT/$MOD.html" | head -1 | sed 's/<title>//')"
FRAMES="$(grep -o 'class="frame"' "$OUT/$MOD.html" | wc -l | tr -d ' ')"
ERR="$(grep 'CONSOLE' "$OUT/$MOD.html.log" | grep -v -i 'parser-blocking\|Babel transformer\|preload\|font' | sed 's/.*CONSOLE[^"]*"//; s/", source.*//' | head -8)"
echo "page   $BASE"
echo "title  ${TITLE:-<none: the page did not mount; run with &dev in a browser>}"
echo "frames $FRAMES (light + dark pairs × 2)"
if [[ -n "$ERR" ]]; then echo "console errors:"; echo "$ERR" | sed 's/^/  /'; else echo "console clean"; fi

# single frames
for ID in "$@"; do
  case "$ID" in nw*|w*) SIZE=1400,900;; *) SIZE=480,940;; esac
  render "$BASE&only=$ID&z=1" "$SIZE" "$OUT/$MOD-$ID.png" "$OUT/$MOD-$ID.html"
  T2="$(grep -o '<title>[^<]*' "$OUT/$MOD-$ID.html" | head -1 | sed 's/<title>//')"
  if [[ "$T2" == *"no frame"* ]]; then echo "frame  $ID: not on this page"; rm -f "$OUT/$MOD-$ID.png"; elif [[ -f "$OUT/$MOD-$ID.png" ]]; then echo "frame  $ID → .board-check/$MOD-$ID.png  (${T2#*· })"; else echo "frame  $ID: no screenshot (page did not mount)"; fi
done
rm -rf "$PROF"
