#!/usr/bin/env bash
# Scaffold a module on the board: mod-<id>.jsx from the template (one phone screen, one sheet, one web screen,
# registration) and its one line in modules.js. Then open board.html?m=<id>.
#   bash .claude/skills/sutra-mockups/scripts/new-module.sh <id> "<Name>" "<Pfx>" ["<note for the hub card>"]
#   bash .claude/skills/sutra-mockups/scripts/new-module.sh home "Home" "Hm" "approvals · notifications · gate pass · quick links"
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
ID="${1:?module id (lowercase, e.g. home)}"; NAME="${2:?display name, e.g. Home}"; PFX="${3:?component prefix, e.g. Hm}"; NOTE="${4:-in planning}"
V2="$ROOT/explorations/catalogue-v2"; F="$V2/mod-$ID.jsx"; TPL="$ROOT/.claude/skills/sutra-mockups/assets/mod-template.jsx"
[[ -e "$F" ]] && { echo "$F exists; edit it instead"; exit 1; }
grep -q "id: '$ID'" "$V2/modules.js" && { echo "modules.js already has '$ID'"; exit 1; }
sed -e "s/__ID__/$ID/g" -e "s/__NAME__/$NAME/g" -e "s/__PFX__/$PFX/g" -e "s/__DATE__/$(date +%-d\ %b\ %Y)/g" "$TPL" > "$F"
python - "$V2/modules.js" "$ID" "$NAME" "$NOTE" <<'EOF'
import sys
p, mid, name, note = sys.argv[1:]
s = open(p, encoding='utf-8').read()
line = "    { id: '%s', name: '%s', note: '%s', names: ['%s'], files: ['mod-%s.jsx'] },\n" % (mid, name, note.replace("'", "\\'"), name, mid)
i = s.rindex('  ],')          # close of the modules array
s = s[:i] + line + s[i:]
open(p, 'w', encoding='utf-8', newline='\n').write(s)
EOF
echo "created explorations/catalogue-v2/mod-$ID.jsx and the modules.js line"
echo "open   explorations/catalogue-v2/board.html?m=$ID   (add mod-$ID-web.jsx to the files list when you split web screens out)"
