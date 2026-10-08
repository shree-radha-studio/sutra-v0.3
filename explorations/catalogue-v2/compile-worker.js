/* Background compiler for loader.js: JSX -> plain JS with the vendored Babel, the same options text/babel used. */
importScripts('vendor/babel.min.js');
onmessage = function (e) {
  var d = e.data;
  try {
    var code = Babel.transform(d.text, { presets: d.presets, filename: d.path.split('/').pop(), sourceType: 'script', compact: false, comments: false }).code;
    postMessage({ id: d.id, code: code });
  } catch (err) {
    postMessage({ id: d.id, error: String((err && err.message) || err) });
  }
};
