/* Pan / zoom for the board pages (board.html, drafts-archive.html). CSS zoom keeps the document scrollable at every level, so scrollbars,
   drag-to-pan and Ctrl+wheel all work. Skipped inside an iframe (Claude Design supplies its own controls). */
(function () {
  if (window.self !== window.top || new URLSearchParams(location.search).get('only')) return;
  var stage = document.getElementById('stage'), z = 1;
  var W = function () { return window.__W || 8400; }, H = function () { return window.__H || 17000; };
  var bar = document.createElement('div'); bar.id = 'zoom';
  bar.innerHTML = '<button data-z="fit">Fit row</button><button data-z="all">Fit all</button><button data-z="0.5">50%</button><button data-z="1">100%</button><button data-z="-">−</button><span class="pct">100%</span><button data-z="+">+</button>';
  document.body.appendChild(bar);
  function set(nz, cx, cy) { /* keep the point under (cx,cy) fixed */
    nz = Math.max(.1, Math.min(2, nz)); var sx = window.scrollX, sy = window.scrollY;
    if (cx == null) { cx = innerWidth / 2; cy = innerHeight / 2; }
    var dx = (sx + cx) / z, dy = (sy + cy) / z; z = nz; stage.style.zoom = z;
    window.scrollTo(dx * z - cx, dy * z - cy);
    bar.querySelector('.pct').textContent = Math.round(z * 100) + '%';
    bar.querySelectorAll('button').forEach(function (b) { b.classList.toggle('on', b.dataset.z === String(z)); });
  }
  bar.addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; var v = b.dataset.z;
    if (v === 'fit') set((innerWidth - 40) / W()); else if (v === 'all') set(Math.min((innerWidth - 40) / W(), (innerHeight - 40) / H())); else if (v === '+') set(z * 1.25); else if (v === '-') set(z / 1.25); else set(+v); });
  addEventListener('wheel', function (e) { if (!e.ctrlKey) return; e.preventDefault(); set(z * (e.deltaY < 0 ? 1.1 : 1 / 1.1), e.clientX, e.clientY); }, { passive: false });
  addEventListener('keydown', function (e) { if (!(e.ctrlKey || e.metaKey)) return; if (e.key === '=' || e.key === '+') { e.preventDefault(); set(z * 1.25); } else if (e.key === '-') { e.preventDefault(); set(z / 1.25); } else if (e.key === '0') { e.preventDefault(); set(1); } });
  /* drag the empty canvas to pan (phones keep their own gestures) */
  var pan = null;
  stage.addEventListener('mousedown', function (e) { if (e.button !== 0 || e.target.closest('.frame')) return; pan = { x: e.clientX, y: e.clientY, sx: window.scrollX, sy: window.scrollY }; document.body.classList.add('panning'); e.preventDefault(); });
  addEventListener('mousemove', function (e) { if (pan) window.scrollTo(pan.sx - (e.clientX - pan.x), pan.sy - (e.clientY - pan.y)); });
  addEventListener('mouseup', function () { pan = null; document.body.classList.remove('panning'); });
  /* open zoomed to the phone column (board.jsx sets __FIT after its first render); Fit row / Fit all are one click away */
  set(Math.min(1, (innerWidth - 40) / (window.__FIT || W())));
  addEventListener('sutra:fit', function () { set(Math.min(1, (innerWidth - 40) / (window.__FIT || W()))); });
})();
