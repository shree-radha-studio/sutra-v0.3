"""Rewrite a board html page for the Claude Design kit folder: snapshot paths become kit-relative, the data.js path
fix-up and the PATHS comment are dropped. Usage: python tools/fix-paths.py <source html> <destination html>"""
import re, sys
src, dst = sys.argv[1], sys.argv[2]
s = open(src, encoding='utf-8').read()
for a, b in [('../../design-system/styles.css', '../../styles.css'),
             ('../../design-system/ui_kits/data.js', '../data.js'),
             ('../../design-system/ui_kits/sutra-mobile/ios-frame.jsx', '../sutra-mobile/ios-frame.jsx'),
             ('../../design-system/ui_kits/catalogue-explorations/', './')]:
    s = s.replace(a, b)
s = re.sub(r'<script>/\* data\.js resolves.*?</script>\s*', '', s, flags=re.S)
s = re.sub(r'<!-- PATHS:.*?-->\s*', '', s, flags=re.S)
open(dst, 'w', encoding='utf-8', newline='\n').write(s)
