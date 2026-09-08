#!/usr/bin/env bash
# Rebuild explorations/catalogue-v2/for-claude-design/catalogue-explorations/ : a drop-in replacement for the
# Claude Design project's ui_kits/catalogue-explorations/ folder (one canvas, all rows).
set -euo pipefail
P="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="$P/design-system/ui_kits/catalogue-explorations"; V2="$P/explorations/catalogue-v2"; OUT="$V2/for-claude-design/catalogue-explorations"
rm -rf "$V2/for-claude-design"; mkdir -p "$OUT"
cp "$SRC/common.jsx" "$SRC/themes.jsx" "$SRC/screens.jsx" "$OUT/"
cp "$V2/themes2.jsx" "$V2/screens2.jsx" "$V2/final.jsx" "$V2/web.jsx" "$V2"/mod-*.jsx "$V2/audit.md" "$OUT/"; [[ -d "$V2/assets" ]] && cp -r "$V2/assets" "$OUT/"; cp "$V2/README.claude-design.md" "$OUT/" 2>/dev/null || true
[[ -f "$OUT/README.claude-design.md" ]] && mv "$OUT/README.claude-design.md" "$OUT/README.md"
sed -e 's#\.\./\.\./design-system/styles\.css#../../styles.css#' \
    -e 's#\.\./\.\./design-system/ui_kits/data\.js#../data.js#' \
    -e 's#\.\./\.\./design-system/ui_kits/sutra-mobile/ios-frame\.jsx#../sutra-mobile/ios-frame.jsx#' \
    -e 's#\.\./\.\./design-system/ui_kits/catalogue-explorations/#./#' \
    "$V2/index.html" \
  | python -c "
import sys,re
s=sys.stdin.buffer.read().decode('utf-8')
s=re.sub(r'<script>/\* data\.js resolves.*?</script>\n','',s,flags=re.S)
s=re.sub(r'<!-- PATHS:.*?-->\n','',s,flags=re.S)
open(sys.argv[1],'w',encoding='utf-8').write(s)" "$OUT/index.html"

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
