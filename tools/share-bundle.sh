#!/usr/bin/env bash
# Build the front-end pack: a self-contained, runnable copy of the whole design board for developers.
#   explorations/catalogue-v2/share/sutra-design-board.zip   (tracked, so GitHub Pages serves it; the board's
#                                                            Overview links to it under "For developers")
# Every screen as its React (JSX) source, the shared chrome and theme, tokens, photos, the vendored runtime and the
# loader. The recipient unzips it and serves the folder over http (any static server); no build step, no internet
# except the Google Fonts. Rebuild after screens change:  bash tools/share-bundle.sh
set -euo pipefail
P="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DS="$P/design-system"; PKG="$P/explorations/catalogue-v2/for-claude-design/catalogue-explorations"
OUT="$P/explorations/catalogue-v2/share"; NAME="sutra-design-board"; B="$OUT/$NAME"
bash "$P/tools/package-explorations.sh" >/dev/null
rm -rf "$OUT"; mkdir -p "$B/ui_kits/sutra-mobile" "$B/ui_kits/catalogue-explorations"
cp "$DS/styles.css" "$B/"; cp -r "$DS/tokens" "$B/tokens"; cp -r "$DS/assets" "$B/assets"
cp "$DS/ui_kits/data.js" "$B/ui_kits/"; cp "$DS/ui_kits/sutra-mobile/ios-frame.jsx" "$B/ui_kits/sutra-mobile/"
cp -r "$PKG"/* "$B/ui_kits/catalogue-explorations/"
cp "$P/design/SUTRA-DESIGN-SCHEMA.md" "$B/DESIGN-SCHEMA.md"; cp "$P/design/tokens-final.css" "$B/tokens/final.css"
STAMP="$(date -u +%d.%m.%Y) · commit $(git -C "$P" rev-parse --short HEAD 2>/dev/null || echo unknown)"
sed -e "s/@STAMP@/$STAMP/" -e "s/@NAME@/$NAME/g" "$P/tools/share-bundle-README.md" > "$B/README.md"
# zip only the pack folder (base_dir), written beside it
( cd "$OUT" && python3 -c "import shutil, sys; shutil.make_archive(sys.argv[1], 'zip', '.', sys.argv[1])" "$NAME" )
du -sh "$OUT/$NAME.zip" | cut -f1 | sed 's/^/zip: /'; echo "$OUT/$NAME.zip"
