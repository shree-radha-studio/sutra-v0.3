#!/usr/bin/env bash
# Rebuild explorations/catalogue-v2/for-claude-design/catalogue-explorations/ : a drop-in replacement for the
# Claude Design project's ui_kits/catalogue-explorations/ folder (hub + one page per module + drafts archive).
set -euo pipefail
P="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="$P/design-system/ui_kits/catalogue-explorations"; V2="$P/explorations/catalogue-v2"; OUT="$V2/for-claude-design/catalogue-explorations"
rm -rf "$V2/for-claude-design"; mkdir -p "$OUT"
cp "$SRC/common.jsx" "$SRC/themes.jsx" "$SRC/screens.jsx" "$OUT/"
cp "$V2/themes2.jsx" "$V2/screens2.jsx" "$V2/final.jsx" "$V2/web.jsx" "$V2"/mod-*.jsx "$V2/finals.jsx" "$V2/board.jsx" "$V2/board.css" "$V2/board-pan.js" "$V2/modules.js" "$V2/audit.md" "$OUT/"; [[ -d "$V2/assets" ]] && cp -r "$V2/assets" "$OUT/"; cp "$V2/README.claude-design.md" "$OUT/" 2>/dev/null || true
[[ -f "$OUT/README.claude-design.md" ]] && mv "$OUT/README.claude-design.md" "$OUT/README.md"
fix_paths() { python "$P/tools/fix-paths.py" "$1" "$2"; } # $1 = source html, $2 = destination
fix_paths "$V2/index.html" "$OUT/index.html"
fix_paths "$V2/board.html" "$OUT/board.html"
fix_paths "$V2/drafts-archive.html" "$OUT/drafts-archive.html"
fix_paths "$V2/legacy-index.html" "$OUT/legacy-index.html"
# modules.js base paths point into the snapshot; inside the kit the same files sit one level up
sed -i -e "s#'\.\./\.\./design-system/ui_kits/sutra-mobile/#'../sutra-mobile/#" -e "s#'\.\./\.\./design-system/ui_kits/catalogue-explorations/#'./#" "$OUT/modules.js"

# design-system update: the final design language, for the user to drop into the Claude Design project
DSU="$V2/for-claude-design/design-system-update"; mkdir -p "$DSU/guidelines" "$DSU/tokens"
cp "$P/design/SUTRA-DESIGN-SCHEMA.md" "$DSU/guidelines/final-design-language.md"
cp "$P/design/tokens-final.css" "$DSU/tokens/final.css"
cat > "$DSU/README.md" <<'EOF'
# Design system update · final design language

Drop these into the Claude Design project "Sutra Design System":

- `guidelines/final-design-language.md` → `guidelines/` (the language of the final rows; supersedes the exploration styling notes)
- `tokens/final.css` → `tokens/` (light on :root, dark under [data-theme="dark"]; `--f-*` variables)

Then tell Claude Design: "Adopt guidelines/final-design-language.md and tokens/final.css as the current design
language for every new screen; update readme.md and the token specimens accordingly."
EOF
echo "Packaged: $OUT"; ls "$OUT"
