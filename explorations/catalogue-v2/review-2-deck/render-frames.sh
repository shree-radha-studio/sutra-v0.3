#!/usr/bin/env bash
# render-frames.sh <outdir> <module>:<view>:<id> ...   view = drafts | finals
set -uo pipefail
ROOT=/home/user/sutra-v0.3; OUT="$1"; shift; mkdir -p "$OUT"
CH="${PLAYWRIGHT_BROWSERS_PATH:-/opt/pw-browsers}/chromium"
PORT="$(python3 -c 'import socket;s=socket.socket();s.bind(("127.0.0.1",0));print(s.getsockname()[1]);s.close()')"
(cd "$ROOT" && python3 -m http.server "$PORT" --bind 127.0.0.1 >/dev/null 2>&1) & SRV=$!
trap 'kill $SRV 2>/dev/null' EXIT; sleep 1
PROF="$OUT/.profile-$$"
for spec in "$@"; do
  IFS=: read -r MOD VIEW ID <<<"$spec"
  case "$ID" in nw*|w*|wd*|nwd*) SIZE=1400,1000;; *) SIZE=480,940;; esac
  URL="http://127.0.0.1:$PORT/explorations/catalogue-v2/board.html?m=$MOD&v=$VIEW&only=$ID&z=1&t=1"
  PNG="$OUT/$MOD-$ID.png"
  timeout 150 "$CH" --headless=new --disable-gpu --no-sandbox --user-data-dir="$PROF" --window-size="$SIZE" --hide-scrollbars \
    --virtual-time-budget=15000 --screenshot="$PNG" --dump-dom "$URL" > "$OUT/.dom.html" 2>/dev/null
  T="$(grep -o '<title>[^<]*' "$OUT/.dom.html" | head -1 | sed 's/<title>//')"
  echo "$MOD $ID → $(basename "$PNG")  [$T]"
done
rm -rf "$PROF" "$OUT/.dom.html"
