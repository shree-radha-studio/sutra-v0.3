#!/usr/bin/env bash
# Contact sheets of the Sutra board with headless Chrome: many frames small on one PNG, for bulk review and for
# checking that a formatting change landed on every screen. Renders sheet.html; writes .board-check/sheet-*.png.
#   bash .claude/skills/sutra-mockups/scripts/contact-sheet.sh                    sampler: first phone + web pair of every module
#   bash .claude/skills/sutra-mockups/scripts/contact-sheet.sh crm                every frame of CRM; one PNG per sub-menu when the page is too tall for one
#   bash .claude/skills/sutra-mockups/scripts/contact-sheet.sh crm payments       one sub-menu (name match)
#   bash .claude/skills/sutra-mockups/scripts/contact-sheet.sh crm n-3 nw-7 nd-3  the listed frames, ids as on board.html?m=crm
#   options before the module: --s 0.5 (scale, default 0.4) · --w 2200 (sheet width) · --sample 2 (frames per module in the sampler) · --finals
# Prints one line per PNG with its size and frame count. Starts its own static server on a free port and stops it afterwards.
set -uo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
OUT="$ROOT/.board-check"; mkdir -p "$OUT"
S=0.4; W=2200; SAMPLE=1; VIEW=""; MAXH=15000   # 2200 wide fits six phone pairs or two web pairs per row at scale 0.4
while [[ $# -gt 0 && "$1" == --* ]]; do case "$1" in
  --s) S="$2"; shift 2;; --w) W="$2"; shift 2;; --sample) SAMPLE="$2"; shift 2;; --finals) VIEW="&v=finals"; shift;; *) echo "unknown option $1"; exit 1;; esac; done
MOD="${1:-}"; shift || true

find_browser() {
  for c in "${PROGRAMFILES:-}/Google/Chrome/Application/chrome.exe" "/c/Program Files/Google/Chrome/Application/chrome.exe" \
           "/c/Program Files (x86)/Google/Chrome/Application/chrome.exe" "/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" \
           "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" "${PLAYWRIGHT_BROWSERS_PATH:-/opt/pw-browsers}/chromium" \
           google-chrome chromium chromium-browser microsoft-edge; do
    if [[ -x "$c" ]] || command -v "$c" >/dev/null 2>&1; then echo "$c"; return; fi
  done
}
CH="$(find_browser)"; [[ -n "$CH" ]] || { echo "no Chrome / Chromium / Edge found"; exit 1; }
PORT="$(python -c 'import socket;s=socket.socket();s.bind(("127.0.0.1",0));print(s.getsockname()[1]);s.close()')"
(cd "$ROOT" && python -m http.server "$PORT" --bind 127.0.0.1 >/dev/null 2>&1) & SRV=$!
trap 'kill $SRV 2>/dev/null' EXIT
sleep 1
BASE="http://127.0.0.1:$PORT/explorations/catalogue-v2/sheet.html"
PROF="$OUT/.profile-$$"

# $1 url · $2 window size · $3 png path or "" · $4 dom dump path
render() { local shot=(); [[ -n "$3" ]] && shot=(--screenshot="$3")
  timeout 300 "$CH" --headless=new --disable-gpu --no-sandbox --hide-scrollbars --user-data-dir="$PROF" --window-size="$2" \
    --virtual-time-budget=30000 "${shot[@]}" --dump-dom "$1" > "$4" 2>/dev/null; }
attr() { grep -o "data-$2=\"[^\"]*\"" "$1" | head -1 | sed 's/^[^"]*"//; s/"$//'; }
# one sheet: $1 query, $2 file stem. Pass 1 measures the page, pass 2 shoots it at that height.
sheet() { local url="$BASE?$1&s=$S$VIEW" dom="$OUT/$2.html" png="$OUT/$2.png"
  render "$url" "$W,1000" "" "$dom"
  local h n; h="$(attr "$dom" h)"; n="$(attr "$dom" frames)"
  if [[ -z "$h" ]]; then echo "sheet  $2: the page did not mount ($url&dev in a browser for the error)"; return 1; fi
  if [[ "${n:-0}" == "0" ]]; then echo "sheet  $2: no frames (${url})"; return 1; fi
  render "$url" "$W,$(( h > MAXH ? MAXH : h ))" "$png" "$dom"
  echo "sheet  $2 → .board-check/$2.png  ($n frames, ${W}×$h$( [[ $h -gt $MAXH ]] && echo ", cut at $MAXH: use a sub-menu or a smaller --s" ))"; }

if [[ -z "$MOD" ]]; then sheet "m=all&sample=$SAMPLE" "sheet-sampler"
elif [[ $# -gt 0 && "$1" == *-* ]]; then IDS="$(IFS=,; echo "$*")"; sheet "m=$MOD&ids=$IDS" "sheet-$MOD-frames"
elif [[ $# -gt 0 ]]; then sheet "m=$MOD&sub=$1" "sheet-$MOD-$(echo "$1" | tr 'A-Z ' 'a-z-')"
else
  # whole module: measure first; split by sub-menu when one page would be cut
  dom="$OUT/sheet-$MOD.html"; render "$BASE?m=$MOD&s=$S$VIEW" "$W,1000" "" "$dom"
  h="$(attr "$dom" h)"; subs="$(attr "$dom" subs)"
  if [[ -z "$h" ]]; then echo "sheet  $MOD: the page did not mount (sheet.html?m=$MOD&dev in a browser for the error)"; exit 1; fi
  if [[ "$h" -le "$MAXH" ]]; then sheet "m=$MOD" "sheet-$MOD"
  else echo "module $MOD is ${h}px tall at scale $S; one sheet per sub-menu"
    IFS='|' read -ra LIST <<< "$subs"
    for s in "${LIST[@]}"; do sheet "m=$MOD&sub=$(python -c 'import sys,urllib.parse;print(urllib.parse.quote(sys.argv[1]))' "$s")" "sheet-$MOD-$(echo "$s" | tr 'A-Z /·' 'a-z---' | tr -s '-' | sed 's/^-//; s/-$//')"; done
  fi
fi
rm -rf "$PROF"
