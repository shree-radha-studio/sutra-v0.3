/* Background compiler for loader.js: JSX -> plain JS with the vendored Babel, the same options text/babel used. */
importScripts('vendor/babel.min.js');
/* the top-level declaration of a name, for the board's Code view (same code as spanIn in loader.js) */
function spanIn(text, name, path) {
  var body = Babel.transform(text, { presets: ['react'], ast: true, code: false, sourceType: 'script', filename: path.split('/').pop() }).ast.program.body;
  for (var i = 0; i < body.length; i++) {
    var n = body[i];
    if (n.type === 'FunctionDeclaration' && n.id && n.id.name === name) return { start: n.start, end: n.end, line: n.loc.start.line, endLine: n.loc.end.line };
    if (n.type === 'VariableDeclaration') for (var j = 0; j < n.declarations.length; j++) { var d = n.declarations[j]; if (d.id && d.id.name === name) return { start: n.start, end: n.end, line: n.loc.start.line, endLine: n.loc.end.line }; }
  }
  return null;
}
onmessage = function (e) {
  var d = e.data;
  if (d.type === 'locate') { try { postMessage({ id: d.id, code: spanIn(d.text, d.name, d.path) }); } catch (err) { postMessage({ id: d.id, error: String((err && err.message) || err) }); } return; }
  try {
    var code = Babel.transform(d.text, { presets: d.presets, filename: d.path.split('/').pop(), sourceType: 'script', compact: false, comments: false }).code;
    postMessage({ id: d.id, code: code });
  } catch (err) {
    postMessage({ id: d.id, error: String((err && err.message) || err) });
  }
};
