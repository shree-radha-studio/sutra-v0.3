#!/usr/bin/env bash
# Build explorations/catalogue-v2/for-artifact/ : the board as one flat folder for publishing as a Claude Artifact
# (the review copy the owner pins comments on). Root page = the contact sheet (index.html, a body fragment: the
# artifact host adds the document skeleton); board.html, hub.html and drafts-archive.html ride along as files.
# Every path is root-relative, the .jsx files are precompiled to .js (no Babel in the artifact), the design-system
# pieces the board needs are copied in, so nothing points outside the folder. Rebuild after any change, then publish.
set -euo pipefail
P="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DS="$P/design-system"; V2="$P/explorations/catalogue-v2"; OUT="$V2/for-artifact"
command -v node >/dev/null || { echo "node is needed to precompile the JSX"; exit 1; }
rm -rf "$OUT"; mkdir -p "$OUT/vendor" "$OUT/ui_kits/sutra-mobile" "$OUT/ui_kits/catalogue-explorations" "$OUT/assets"

# design-system pieces: styles + tokens, data, the device frame and the original exploration kit, assets
cp "$DS/styles.css" "$OUT/"; cp -r "$DS/tokens" "$OUT/tokens"; cp "$DS/ui_kits/data.js" "$OUT/ui_kits/"
cp -r "$DS/assets/." "$OUT/assets/"; [[ -d "$V2/assets" ]] && cp -r "$V2/assets/." "$OUT/assets/"
# runtime without Babel
cp "$V2"/vendor/react.production.min.js "$V2"/vendor/react-dom.production.min.js "$V2"/vendor/react.development.js "$V2"/vendor/react-dom.development.js "$V2"/vendor/lucide.min.js "$OUT/vendor/"
cp "$V2/board.css" "$V2/board-pan.js" "$OUT/"

# JSX → JS, same basenames
jsx() { node "$P/tools/precompile.js" "$1" "$2"; }
jsx "$DS/ui_kits/sutra-mobile/ios-frame.jsx" "$OUT/ui_kits/sutra-mobile/ios-frame.js"
for f in common themes screens; do jsx "$DS/ui_kits/catalogue-explorations/$f.jsx" "$OUT/ui_kits/catalogue-explorations/$f.js"; done
for f in "$V2"/*.jsx; do jsx "$f" "$OUT/$(basename "${f%.jsx}").js"; done

# modules.js: kit paths become root-relative, .jsx becomes .js
sed -e "s#'\.\./\.\./design-system/ui_kits/#'ui_kits/#g" -e "s#\.jsx'#.js'#g" "$V2/modules.js" > "$OUT/modules.js"

# html pages: root-relative paths, no Babel, plain script tags for the compiled files
export P
page() { python3 - "$1" "$2" "$3" <<'PY'
import re, sys
src, dst, fragment = sys.argv[1], sys.argv[2], sys.argv[3] == '1'
s = open(src, encoding='utf-8').read()
s = s.replace('../../design-system/styles.css', 'styles.css').replace('../../design-system/ui_kits/data.js', 'ui_kits/data.js')
s = s.replace("n='../../design-system/assets/'", "n='assets/'")
s = s.replace('../../design-system/ui_kits/', 'ui_kits/')
s = re.sub(r'<script src="vendor/babel\.min\.js"></script>\s*', '', s)
# inline JSX blocks (the drafts archive carries its renderer inline) are compiled the same way as the files
import subprocess, tempfile, os
def compile_inline(m):
    with tempfile.TemporaryDirectory() as d:
        i, o = os.path.join(d, 'inline.jsx'), os.path.join(d, 'inline.js')
        open(i, 'w', encoding='utf-8').write(m.group(1))
        subprocess.run(['node', os.path.join(os.environ['P'], 'tools', 'precompile.js'), i, o], check=True)
        return '<script>\n' + open(o, encoding='utf-8').read() + '\n</script>'
s = re.sub(r'<script type="text/babel">(.*?)</script>', compile_inline, s, flags=re.S)
s = s.replace(' type="text/babel"', '').replace("type=\"text/babel\" ", '')
s = re.sub(r'\.jsx(["\'])', r'.js\1', s)
s = s.replace("files.push('finals.jsx', 'board.jsx')", "files.push('finals.js', 'board.js')").replace("files.push('finals.jsx', 'sheet.jsx')", "files.push('finals.js', 'sheet.js')")
# Babel ran the JSX after the document was parsed; plain scripts must defer the same way, or #root does not exist yet
s = s.replace("document.write('<script src=\"' + f + '\"><\\/script>')", "document.write('<script defer src=\"' + f + '\"><\\/script>')")
s = s.replace('href="index.html"', 'href="hub.html"')
if fragment:  # the artifact root page: the host wraps it in its own skeleton, so keep title, links, styles, scripts, body content
    m = re.search(r'<head>(.*?)</head>\s*<body>(.*?)</body>', s, re.S)
    head, body = m.group(1), m.group(2)
    head = re.sub(r'<meta name="viewport"[^>]*>\s*', '', head)
    s = head.strip() + '\n' + body.strip() + '\n'
open(dst, 'w', encoding='utf-8', newline='\n').write(s)
PY
}
page "$V2/sheet.html" "$OUT/index.html" 1
page "$V2/board.html" "$OUT/board.html" 0
page "$V2/drafts-archive.html" "$OUT/drafts-archive.html" 0
page "$V2/index.html" "$OUT/hub.html" 0
# the hub's cards point at the board; add the sheet (root page) link on top
python3 - "$OUT/hub.html" <<'PY'
import sys; p = sys.argv[1]; s = open(p, encoding='utf-8').read()
s = s.replace('<div class="grid" id="modules"></div>', '<p class="sub"><a href="index.html" style="color:#5A1F27">← Contact sheet (the review page: every frame small, click to enlarge)</a></p>\n<div class="grid" id="modules"></div>')
open(p, 'w', encoding='utf-8', newline='\n').write(s)
PY

N=$(find "$OUT" -type f | wc -l | tr -d ' '); SZ=$(du -sh "$OUT" | cut -f1)
echo "Bundled: $OUT ($N files, $SZ)"
echo "Publish: page index.html, root $OUT, files = everything else in the folder (bash tools/artifact-bundle.sh --list prints the list)"
if [[ "${1:-}" == "--list" ]]; then (cd "$OUT" && find . -type f ! -name index.html | sed 's#^\./##' | sort); fi
