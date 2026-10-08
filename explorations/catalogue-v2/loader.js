/* BOARD LOADER · replaces <script type="text/babel"> on index.html and board.html.
   The screens are JSX compiled in the browser. Compiling all of them takes seconds (minutes on a phone), so:
   - each file is compiled once and the result kept in the browser (IndexedDB), keyed by the file's own text, so a
     repeat visit runs at once and an edited file recompiles on its own;
   - compiling happens in a background worker (compile-worker.js), so the page stays responsive while it loads;
   - files still run strictly in the order given, in the page's one global scope, compiled exactly as text/babel did
     (presets react + es2015, the same as tools/precompile.js), so module files behave as before.
   Headless runs (automated Chrome, &ui=0, &ids=, &sample=) and ?nocache compile on the main thread with no cache,
   which is simpler to reason about under a virtual-time budget.
     SutraLoad.run(files)         compile + run the files in order; resolves when the last has run
     SutraLoad.module(id)         run the files of one module from modules.js (each file once); resolves when done
     SutraLoad.loaded(id)         true once that module's files have run
     SutraLoad.onProgress(fn)     fn({ done, total, file }) while files load
     SutraLoad.locate(name)       where a top-level component is defined: { file, line, endLine, code } (original JSX,
                                  found with Babel's parser), or null; the last file to define a name wins, as it does
                                  in the page
     SutraLoad.findText(s)        the first file and line holding the text s, e.g. a screen's caption
   Errors in a file are logged and collected in SutraLoad.errors; the rest of the page still loads. */
(function () {
  var Q = new URLSearchParams(location.search);
  /* headless: the contact-sheet and board-check scripts (headless Chrome says HeadlessChrome in its user agent;
     automated browsers report navigator.webdriver) and the fixed sheet pages; ?worker=1 forces the browser path, for
     testing it under automation */
  var HEADLESS = !Q.has('worker') && (Q.get('ui') === '0' || Q.has('ids') || Q.has('sample') || Q.has('nocache') ||
    navigator.webdriver === true || /HeadlessChrome/.test(navigator.userAgent));
  var PRESETS = ['react', 'es2015'], TAG = 'babel-7.29.0|react,es2015|v1';
  var ran = {}, mods = {}, listeners = [], errors = [], chain = Promise.resolve(), sources = {}, order = [], located = {}, stats = { done: 0, total: 0, hits: 0, compiled: 0, msFetch: 0, msCompile: 0, msRun: 0, t0: performance.now() };

  function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0).toString(36) + '.' + s.length; }
  function progress(file) { listeners.forEach(function (fn) { try { fn({ done: stats.done, total: stats.total, file: file }); } catch (e) {} }); }

  /* ---- cache (IndexedDB; every call guarded, a missing or blocked store just means no cache) ---- */
  var dbp = null;
  function db() {
    if (HEADLESS || !window.indexedDB) return Promise.resolve(null);
    if (!dbp) dbp = new Promise(function (ok) {
      try { var r = indexedDB.open('sutra-board', 1); r.onupgradeneeded = function () { r.result.createObjectStore('js'); }; r.onsuccess = function () { ok(r.result); }; r.onerror = r.onblocked = function () { ok(null); }; }
      catch (e) { ok(null); }
    });
    return dbp;
  }
  function cacheGet(key) { return db().then(function (d) { if (!d) return null; return new Promise(function (ok) { try { var r = d.transaction('js').objectStore('js').get(key); r.onsuccess = function () { ok(r.result || null); }; r.onerror = function () { ok(null); }; } catch (e) { ok(null); } }); }); }
  function cachePut(key, code) { db().then(function (d) { if (!d) return; try { d.transaction('js', 'readwrite').objectStore('js').put(code, key); } catch (e) {} }); }

  /* ---- compilers: background worker(s) in a browser, Babel on the main thread for headless runs ---- */
  var workers = null, next = 0, pending = {}, seq = 0, mainBabel = null;
  function useWorkers() {
    if (HEADLESS || typeof Worker === 'undefined') return false;
    if (workers) return workers.length > 0;
    workers = [];
    var n = Math.max(1, Math.min(3, (navigator.hardwareConcurrency || 2) - 1));
    for (var i = 0; i < n; i++) {
      try {
        var w = new Worker('compile-worker.js');
        w.onmessage = function (e) { var p = pending[e.data.id]; if (!p) return; delete pending[e.data.id]; e.data.error ? p.no(new Error(e.data.error)) : p.ok(e.data.code); };
        w.onerror = function () { /* a worker that cannot start: fall back to the main thread for whatever it held */ Object.keys(pending).forEach(function (k) { var p = pending[k]; delete pending[k]; compileMain(p.path, p.text).then(p.ok, p.no); }); };
        workers.push(w);
      } catch (e) { /* file:// or a blocked worker: main thread */ }
    }
    return workers.length > 0;
  }
  function loadBabel() {
    if (!mainBabel) mainBabel = window.Babel ? Promise.resolve() : new Promise(function (ok, no) { var s = document.createElement('script'); s.src = 'vendor/babel.min.js'; s.onload = ok; s.onerror = function () { no(new Error('vendor/babel.min.js did not load')); }; document.head.appendChild(s); });
    return mainBabel;
  }
  function compileMain(path, text) {
    return loadBabel().then(function () { return Babel.transform(text, { presets: PRESETS, filename: path.split('/').pop(), sourceType: 'script', compact: false, comments: false }).code; });
  }
  function compile(path, text) {
    if (!useWorkers()) return compileMain(path, text);
    return new Promise(function (ok, no) { var id = ++seq; pending[id] = { ok: ok, no: no, path: path, text: text }; workers[(next++) % workers.length].postMessage({ id: id, path: path, text: text, presets: PRESETS }); });
  }
  /* the top-level declaration of a name, from Babel's parse of the original file (same code in compile-worker.js) */
  function spanIn(B, text, name, path) {
    var body = B.transform(text, { presets: ['react'], ast: true, code: false, sourceType: 'script', filename: path.split('/').pop() }).ast.program.body;
    for (var i = 0; i < body.length; i++) {
      var n = body[i];
      if (n.type === 'FunctionDeclaration' && n.id && n.id.name === name) return { start: n.start, end: n.end, line: n.loc.start.line, endLine: n.loc.end.line };
      if (n.type === 'VariableDeclaration') for (var j = 0; j < n.declarations.length; j++) { var d = n.declarations[j]; if (d.id && d.id.name === name) return { start: n.start, end: n.end, line: n.loc.start.line, endLine: n.loc.end.line }; }
    }
    return null;
  }
  function span(path, name) {
    var text = sources[path];
    if (!useWorkers()) return loadBabel().then(function () { return spanIn(Babel, text, name, path); });
    return new Promise(function (ok, no) { var id = ++seq; pending[id] = { ok: ok, no: no, path: path, text: text }; workers[(next++) % workers.length].postMessage({ id: id, type: 'locate', path: path, text: text, name: name }); });
  }
  /* the last file run that declares name at the top level, or null */
  function defines(name) {
    if (!name || !/^[A-Za-z_$][\w$]*$/.test(name)) return null;
    var re = new RegExp('(^|\\n)[ \\t]*(?:const|let|var|function)\\s+' + name.replace(/\$/g, '\\$') + '\\b');
    for (var i = order.length - 1; i >= 0; i--) if (sources[order[i]] && re.test(sources[order[i]])) return order[i];
    return null;
  }
  function locate(name) {
    if (located[name]) return located[name];
    var file = defines(name);
    if (!file) return Promise.resolve(null);
    located[name] = span(file, name).then(function (s) { return s ? { file: file, line: s.line, endLine: s.endLine, code: sources[file].slice(s.start, s.end) } : null; }, function () { return null; });
    return located[name];
  }
  function findText(s) {
    for (var i = 0; i < order.length; i++) { var t = sources[order[i]], k = t ? t.indexOf(s) : -1; if (k >= 0) return { file: order[i], line: t.slice(0, k).split('\n').length }; }
    return null;
  }

  /* fetch + compile start at once for every file; running waits its turn in the chain */
  function prepare(path) {
    var t0 = performance.now();
    return fetch(path, { cache: 'no-cache' }).then(function (r) { if (!r.ok) throw new Error(path + ': HTTP ' + r.status); return r.text(); }).then(function (text) {
      sources[path] = text;
      var key = TAG + '|' + path + '|' + hash(text), t1 = performance.now(); stats.msFetch += t1 - t0;
      return cacheGet(key).then(function (hit) {
        if (hit) { stats.hits++; return hit; }
        return compile(path, text).then(function (code) { stats.compiled++; stats.msCompile += performance.now() - t1; cachePut(key, code); return code; });
      });
    });
  }
  function exec(path, code) {
    var s = document.createElement('script');
    s.text = code + '\n//# sourceURL=' + location.href.replace(/[^/]*$/, '') + path;
    document.head.appendChild(s);
  }
  function run(files) {
    var todo = files.filter(function (f) { return !ran[f]; });
    todo.forEach(function (f) { ran[f] = 'queued'; });
    stats.total += todo.length;
    var jobs = todo.map(function (f) { return prepare(f).then(function (code) { return { f: f, code: code }; }, function (err) { return { f: f, err: err }; }); });
    jobs.forEach(function (j) {
      chain = chain.then(function () { return j; }).then(function (r) {
        if (r.err) { errors.push(r.f + ': ' + r.err.message); console.error('[board] ' + r.f, r.err); }
        else { var t = performance.now(); order.push(r.f); try { exec(r.f, r.code); } catch (e) { errors.push(r.f + ': ' + e.message); console.error('[board] ' + r.f, e); } stats.msRun += performance.now() - t; }
        ran[r.f] = true; stats.done++; progress(r.f);
      });
    });
    return chain;
  }
  function filesOf(id) { var m = (window.SUTRA_MODULES.modules || []).filter(function (x) { return x.id === id; })[0]; return m ? m.files.slice() : []; }
  function module(id) {
    if (!mods[id]) mods[id] = run(filesOf(id)).then(function () { mods[id] = true; mods[id + ':done'] = true; dispatchEvent(new CustomEvent('sutra:module', { detail: id })); });
    return mods[id] === true ? Promise.resolve() : mods[id];
  }
  window.SutraLoad = {
    run: run, module: module, locate: locate, findText: findText, defines: defines,
    source: function (path) { return sources[path] || null; },
    loaded: function (id) { return !!mods[id + ':done']; },
    onProgress: function (fn) { listeners.push(fn); },
    errors: errors, stats: stats, headless: HEADLESS,
  };
})();
