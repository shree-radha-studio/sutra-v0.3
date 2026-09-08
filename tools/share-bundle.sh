#!/usr/bin/env bash
# Build a self-contained, shareable copy of the catalogue design board:
#   explorations/catalogue-v2/share/sutra-catalogue-board.zip
# Contains only what the board needs (styles, tokens, assets, data, device frame, the board files) plus a README.
# The recipient unzips it and serves the folder over http (any static server); no build step.
set -euo pipefail
P="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DS="$P/design-system"; PKG="$P/explorations/catalogue-v2/for-claude-design/catalogue-explorations"
OUT="$P/explorations/catalogue-v2/share"; B="$OUT/sutra-catalogue-board"
bash "$P/tools/package-explorations.sh" >/dev/null
rm -rf "$OUT"; mkdir -p "$B/ui_kits/sutra-mobile" "$B/ui_kits/catalogue-explorations"
cp "$DS/styles.css" "$B/"; cp -r "$DS/tokens" "$B/tokens"; cp -r "$DS/assets" "$B/assets"
cp "$DS/ui_kits/data.js" "$B/ui_kits/"; cp "$DS/ui_kits/sutra-mobile/ios-frame.jsx" "$B/ui_kits/sutra-mobile/"
cp "$PKG"/* "$B/ui_kits/catalogue-explorations/"
cp "$P/explorations/catalogue-v2/phone.html" "$B/ui_kits/catalogue-explorations/"
cp "$P/design/SUTRA-DESIGN-SCHEMA.md" "$B/DESIGN-SCHEMA.md"; cp "$P/design/tokens-final.css" "$B/tokens/final.css"
cat > "$B/README.md" <<'EOF'
# Sutra · catalogue design board

Open `ui_kits/catalogue-explorations/index.html` over http (the screens are JSX compiled in the browser, so file:// will not work):

    cd sutra-catalogue-board
    python -m http.server 8000
    # then open http://localhost:8000/ui_kits/catalogue-explorations/index.html

Any static server works (`npx serve .` too). Internet is needed once for fonts and React from CDNs.

- Board: Drafts (explorations) → New drafts (modules in planning) → Finals (table by module and sub-menu, light + dark pairs, phone and web).
- Single screens: `index.html?only=f-1` (phone, light), `fd-1` (dark), `w-1` / `wd-1` (web). Add `&bare` for a frameless render on a phone.
- On a phone: `phone.html` lists every screen.
- Design language: `DESIGN-SCHEMA.md`; tokens: `tokens/final.css`. Screen code: `ui_kits/catalogue-explorations/final.jsx` (phone) and `web.jsx` (laptop); shared chrome and theme objects are in those files.
EOF
( cd "$OUT" && rm -f sutra-catalogue-board.zip && python -c "import shutil; shutil.make_archive('sutra-catalogue-board','zip','.','sutra-catalogue-board')" )
du -sh "$OUT/sutra-catalogue-board.zip" | cut -f1 | sed 's/^/zip: /'; echo "$OUT/sutra-catalogue-board.zip"
