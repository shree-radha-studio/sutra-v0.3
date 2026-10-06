/* Compile one board .jsx file to plain .js with the vendored Babel, exactly as the browser does for
   <script type="text/babel"> (presets react + es2015, so top-level const becomes var and the files keep sharing
   one global scope). Used by tools/artifact-bundle.sh so the published board needs no Babel.
     node tools/precompile.js <in.jsx> <out.js>            */
const fs = require('fs'), path = require('path');
const Babel = require(path.join(__dirname, '..', 'explorations', 'catalogue-v2', 'vendor', 'babel.min.js'));
const [src, dst] = process.argv.slice(2);
if (!src || !dst) { console.error('usage: node tools/precompile.js <in.jsx> <out.js>'); process.exit(1); }
const code = fs.readFileSync(src, 'utf8');
const out = Babel.transform(code, { presets: ['react', 'es2015'], filename: path.basename(src), sourceType: 'script', compact: false, comments: false }).code;
fs.mkdirSync(path.dirname(dst), { recursive: true });
fs.writeFileSync(dst, out);
