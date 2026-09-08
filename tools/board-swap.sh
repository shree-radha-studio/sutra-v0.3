#!/usr/bin/env bash
# One-shot swap to the per-module board (9 Sep 2026). Run once, when every drawing session is at a save point:
#   1. index.html (single-file board) -> legacy-index.html, kept for reference
#   2. hub.html -> index.html
#   3. the inline NEW_DRAFTS registrations that lived in index.html (App shell search pane, Catalogue sale orders,
#      Dispatch, Dispatch on the approved bar) are appended verbatim, as window.NEW_DRAFT_MODULES.push calls, to the
#      end of mod-appshell.jsx, mod-dispatch-web.jsx and mod-topbar2.jsx, so board.html?m=<id> finds them.
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/../explorations/catalogue-v2"
[[ -f hub.html ]] || { echo "hub.html missing; nothing to do"; exit 1; }
grep -q "NEW_DRAFT_MODULES.push({ module: 'Dispatch'" mod-dispatch-web.jsx && { echo "already swapped"; exit 0; }

extract() { # $1 = module label as written in index.html → prints that entry's lines (from "  { module: '<label>'" to its closing "  ] },")
  awk -v m="  { module: '$1'" 'index($0, m) == 1 { on = 1 } on { print } on && /^  \] },$/ { exit }' index.html
}
append() { # $1 = target file, $2.. = module labels
  local f="$1"; shift
  { printf '\n/* Board registration moved here from index.html on 9 Sep 2026 (the board is one page per module; see modules.js). */\n'
    for m in "$@"; do
      printf '(window.NEW_DRAFT_MODULES = window.NEW_DRAFT_MODULES || []).push('
      extract "$m" | sed -e '1s/^  { module:/{ module:/' -e '$s/^  \] },$/] });/'
    done
  } >> "$f"
  echo "appended to $f: $*"
}
append mod-appshell.jsx     'App shell · search pane' 'Catalogue · sale orders'
append mod-dispatch-web.jsx 'Dispatch'
append mod-topbar2.jsx      'Dispatch · on the approved bar'

sed -i '1s#^<!-- @dsCard.*#<!-- LEGACY · the single-file board as it stood before the split into per-module pages (9 Sep 2026). Kept for reference; it no longer receives new modules. The board is index.html (hub) + board.html?m=<id>. -->#' index.html
mv index.html legacy-index.html
mv hub.html index.html
echo "swapped: index.html is the hub, legacy-index.html is the old board"
