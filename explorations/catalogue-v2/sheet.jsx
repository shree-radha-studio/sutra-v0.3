/* THE BOARD · index.html. One page to browse every screen of Sutra as a live front-end mock-up.
   Reads the same registrations as board.jsx (window.SUTRA_MODULES, window.NEW_DRAFT_MODULES, FIN / WEB / BOARD) and
   never changes a screen; frame ids are exactly the ones board.html?m=<id> shows.

   In a browser:
   - Tabs: Overview (what Sutra is, one card per module) and one tab per module; inside a module, its sub-menus in the
     order a user meets them, Finals / Drafts, Phone / Web, light / dark.
   - Zoom: slider, − / +, Ctrl or ⌘ + scroll, trackpad pinch, or the keys + − 0. Every screen resizes at once, no
     frame is ever wider than the page, and the screen under the pointer stays put. Phones also keep native pinch.
   - Frames mount as they come near the screen (IntersectionObserver, so native pinch-zoom never leaves blanks) and
     stay mounted once drawn.
   - Tap a frame: it opens large; ← → or a swipe pages through the list; 100% shows it at full size; "Open alone"
     opens it by itself on board.html for inspecting the code.
   - + Compare pins screens from any module; Compare shows them side by side (the pins stay in this browser, and
     "Copy link" shares them).
   - Modules load on demand through loader.js: the Overview appears after the shared files, the rest arrives in the
     background, the open tab first.
   URL: ?m=<id> (tab) &sub=<sub-menu> &v=finals|drafts &s=<zoom> &cmp=<module>:<id>[:d],… (open Compare with these)

   Headless (the contact-sheet script; no bar, nothing lazy, fixed scale), unchanged since 21 Sep:
   ?m=<id>|all &ui=0 · &sub= · &ids=n-3,nwd-7 · &sample=1|2 · &s=0.4 · &v=finals. When rendered, #root carries
   data-frames, data-subs (pipe-separated) and data-h; the title reads "Sutra · <module> · sheet · <n> frames".
   Everything sits inside one function scope: the module files share the page's global scope (Sheet, Device, Body …
   are primitives there), so nothing here may leak a name. */
(() => {
const Q = new URLSearchParams(location.search);
const MOD0 = Q.get('m') || 'all';
const SUB0 = (Q.get('sub') || '').trim();
const IDS = (Q.get('ids') || '').split(',').map(s => s.trim()).filter(Boolean);
const SAMPLE = Q.has('sample') ? Math.max(1, +Q.get('sample') || 1) : 0;
const V0 = Q.get('v') === 'finals' ? 'finals' : Q.get('v') === 'drafts' ? 'drafts' : '';
const UI = Q.get('ui') !== '0' && !IDS.length && !SAMPLE;
const LAZY = UI && Q.get('lazy') !== '0';
const MODULES = SUTRA_MODULES.modules;
const belongs = (moduleName, mod) => mod.names.some(n => moduleName === n || moduleName.startsWith(n + ' '));
const { useState, useMemo, useEffect, useLayoutEffect, useRef, useCallback, memo } = React;
const PW = 390, PHH = 844, WW = 1308, WH = 838, GAP = 12, ZMIN = 0.12, ZMAX = 1;
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
};
const loaded = id => !window.SutraLoad || SutraLoad.loaded(id);

/* Per module, in module-page terms: draft subs with page ids (n-/nd-/nw-/nwd- count within that module's page, in
   registration order) and final subs with the global f-/fd-/w-/wd- ids. Each entry carries its module id (mid). */
function moduleFrames(mod) {
  const drafts = (window.NEW_DRAFT_MODULES || []).filter(e => belongs(e.module, mod));
  let np = 0, nw = 0;
  const draftSubs = [];
  drafts.forEach(m => m.subs.forEach(s => draftSubs.push({
    module: m.module, name: s.name, flow: s.flow, kind: 'draft',
    phone: s.phone.map(([name, Scr]) => { np++; return { name, Scr, web: false, idL: 'n-' + np, idD: 'nd-' + np, mid: mod.id }; }),
    web: s.web.map(([name, Scr]) => { nw++; return { name, Scr, web: true, idL: 'nw-' + nw, idD: 'nwd-' + nw, mid: mod.id }; }),
  })));
  const finalSubs = [];
  BOARD.filter(b => b.id === mod.id).forEach(b => b.subs.forEach(s => finalSubs.push({
    module: b.module, name: s.name, flow: s.flow, kind: 'final',
    phone: s.phone.map(i => ({ name: FIN[i - 1][0], Scr: FIN[i - 1][1], web: false, idL: 'f-' + i, idD: 'fd-' + i, mid: mod.id })),
    web: s.web.map(i => ({ name: WEB[i - 1][0], Scr: WEB[i - 1][1], web: true, idL: 'w-' + i, idD: 'wd-' + i, mid: mod.id })),
  })));
  return { mod, draftSubs, finalSubs };
}
const modById = id => MODULES.find(x => x.id === id);
const framesOf = id => { const m = modById(id); return m ? moduleFrames(m) : null; };
const screensIn = subs => subs.reduce((a, s) => a + s.phone.length + s.web.length, 0);
const findEntry = (F, id) => { for (const s of [...F.finalSubs, ...F.draftSubs]) for (const e of [...s.phone, ...s.web]) if (e.idL === id) return { e, s }; return null; };

const Device = ({ web, T, Scr }) => web ? <LaptopDevice width={1280} height={800} dark={T.dark}><Scr T={T} /></LaptopDevice> : <IOSDevice width={390} height={844} dark={T.dark}><Scr T={T} /></IOSDevice>;

/* One screen as a light + dark pair (or one theme). Its size comes from CSS variables (--zp phone, --zw web), so a
   zoom change resizes every frame without re-rendering any of them. */
const Cell = memo(function Cell({ e, theme, single, idx, onOpen, pinned, onPin, lazy }) {
  const ref = useRef(null);
  const [on, setOn] = useState(!lazy);
  /* mount near the screen, unmount when far again (its size stays): a phone keeps only a few dozen live screens, which
     is what lets it zoom without blank tiles */
  useEffect(() => {
    if (!lazy) return;
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) { setOn(true); return; }
    const near = new IntersectionObserver(es => { if (es[es.length - 1].isIntersecting) setOn(true); }, { rootMargin: '1200px 400px' });
    const far = new IntersectionObserver(es => { if (!es[es.length - 1].isIntersecting) setOn(false); }, { rootMargin: '4000px 1500px' });
    near.observe(el); far.observe(el);
    return () => { near.disconnect(); far.disconnect(); };
  }, [lazy]);
  const themes = single ? [!!e.dark] : theme === 'both' ? [false, true] : [theme === 'dark'];
  const id = single ? e.id : theme === 'dark' ? e.idD : e.idL;
  return <div ref={ref} className={'sh-pair ' + (e.web ? 'is-web' : 'is-ph')} style={{ '--n': themes.length }}>
    <div className="sh-cap"><code>{id}</code><span className="nm" title={e.name}>{e.name}</span>
      {onPin ? <button type="button" className={'sh-pin' + (pinned ? ' on' : '')} onClick={() => onPin(e, theme === 'dark')} title={pinned ? 'Remove from Compare' : 'Add to Compare'}>{pinned ? '✓' : '+'}<span className="t">{pinned ? ' Comparing' : ' Compare'}</span></button>
        : <span className="ld">{single ? (e.dark ? 'dark' : 'light') : theme === 'both' ? 'light · dark' : theme}</span>}
    </div>
    <div className="sh-devs">
      {themes.map(dark => <div key={dark ? 'd' : 'l'} className={'sh-dev' + (onOpen ? ' press' : '')} onClick={onOpen ? () => onOpen(idx, dark) : undefined} title={onOpen ? 'Open large' : undefined}>
        {on ? <Device web={e.web} T={dark ? FINALD : FINAL} Scr={e.Scr} /> : <div className={'sh-ph ' + (e.web ? 'w' : 'p')} />}
      </div>)}
    </div>
  </div>;
});

/* a small live preview for the Overview cards: light theme, fixed scale, mounted when near the screen */
function Mini({ e, z }) {
  const ref = useRef(null);
  const [on, setOn] = useState(!LAZY);
  useEffect(() => {
    if (on) return;
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) { setOn(true); return; }
    const io = new IntersectionObserver(es => { if (es.some(x => x.isIntersecting)) { setOn(true); io.disconnect(); } }, { rootMargin: '600px' });
    io.observe(el); return () => io.disconnect();
  }, [on]);
  const w = e.web ? WW : PW, h = e.web ? WH : PHH;
  return <div ref={ref} className="ov-mini" style={{ width: w * z, height: h * z }}>
    <div style={{ zoom: z }}>{on ? <Device web={e.web} T={FINAL} Scr={e.Scr} /> : <div className={'sh-ph ' + (e.web ? 'w' : 'p')} />}</div>
  </div>;
}

/* ───────────── headless contact sheet (the script's page; unchanged behaviour) ───────────── */
const viewOf = (M, v) => (v === 'finals' || (v !== 'drafts' && !M.draftSubs.length)) ? 'finals' : 'drafts';
const subsOf = (M, v) => viewOf(M, v) === 'finals' ? M.finalSubs : M.draftSubs;
function staticGroups(ALL) {
  if (IDS.length) {
    const M = ALL[0]; if (!M) return { groups: [], title: MOD0 };
    const lists = { n: [], nd: [], nw: [], nwd: [], f: [], fd: [], w: [], wd: [] };
    M.draftSubs.forEach(s => { s.phone.forEach(e => { lists.n.push(e); lists.nd.push(e); }); s.web.forEach(e => { lists.nw.push(e); lists.nwd.push(e); }); });
    M.finalSubs.forEach(s => { s.phone.forEach(e => { const i = +e.idL.split('-')[1] - 1; lists.f[i] = e; lists.fd[i] = e; }); s.web.forEach(e => { const i = +e.idL.split('-')[1] - 1; lists.w[i] = e; lists.wd[i] = e; }); });
    const phone = [], web = [], missing = [];
    IDS.forEach(id => { const [k, n] = id.split('-'); const e = lists[k] && lists[k][(+n || 1) - 1]; if (!e) { missing.push(id); return; } (e.web ? web : phone).push({ ...e, id, dark: /d$/.test(k) }); });
    return { title: M.mod.name, groups: [{ module: M.mod.name, name: 'Frames ' + IDS.join(', '), flow: missing.length ? 'not on this page: ' + missing.join(', ') : '', phone, web, single: true }] };
  }
  const groups = [];
  ALL.forEach(M => { /* the sampler: the signed-off screens are the reference where they exist */
    const subs = M.finalSubs.length ? M.finalSubs : M.draftSubs, phone = [], web = [];
    subs.forEach(s => { s.phone.forEach(e => { if (phone.length < SAMPLE) phone.push(e); }); s.web.forEach(e => { if (web.length < SAMPLE) web.push(e); }); });
    if (phone.length || web.length) groups.push({ module: M.mod.name, name: subs[0] ? subs[0].name : '', flow: 'board.html?m=' + M.mod.id + (subs === M.finalSubs ? '&v=finals' : ''), phone, web });
  });
  return { title: 'Sampler', groups };
}
function HeadlessSheet() {
  const ALL = (MOD0 === 'all' ? MODULES : MODULES.filter(x => x.id === MOD0)).map(moduleFrames);
  const S = Math.max(0.1, Math.min(1, +Q.get('s') || 0.4));
  const stat = IDS.length || SAMPLE ? staticGroups(ALL) : null;
  const want = SUB0.toLowerCase();
  const groups = stat ? stat.groups : [];
  if (!stat) ALL.forEach(M => subsOf(M, V0).forEach(s => { if (!want || s.name.toLowerCase().includes(want)) groups.push({ ...s, module: M.mod.name }); }));
  const title = stat ? stat.title : (MOD0 === 'all' ? 'Whole board' : (ALL[0] ? ALL[0].mod.name : MOD0));
  const count = groups.reduce((a, g) => a + (g.single ? g.phone.length + g.web.length : (g.phone.length + g.web.length) * 2), 0);
  useLayoutEffect(() => { const r = document.documentElement.style; r.setProperty('--zp', S); r.setProperty('--zw', S); }, []);
  useEffect(() => {
    const r = document.getElementById('root');
    r.dataset.frames = count; r.dataset.subs = groups.map(g => g.name).join('|');
    document.title = 'Sutra · ' + title + ' · sheet · ' + count + ' frames';
    const t = setTimeout(() => { r.dataset.h = Math.ceil(document.documentElement.scrollHeight); }, 0);
    return () => clearTimeout(t);
  }, []);
  const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  return <div className="bd-main headless">
    <div className="sh-head"><h1>{title}</h1><span className="n">contact sheet · {count} frames · scale {S}</span><span className="d">{date}</span></div>
    {!groups.length && <div className="sh-empty">Nothing to show. For a module: index.html?m=&lt;id&gt; (ids in modules.js: {MODULES.map(m => m.id).join(', ')}). Sampler: index.html?m=all&amp;sample=1.</div>}
    {groups.map((g, k) => <section key={k}>
      <div className="sh-band"><span className="mod">{g.module}</span><b>{g.name}</b><span className="flow">{g.flow}</span><span className="cnt">{g.phone.length} phone · {g.web.length} web</span></div>
      <div className="sh-row">{[...g.phone, ...g.web].map((e, i) => <Cell key={i} e={e} single={g.single} theme="both" lazy={false} />)}</div>
    </section>)}
  </div>;
}

/* ───────────── the browsing board ───────────── */
const Seg = ({ value, set, opts, label }) => <div className="bd-seg" role="group" aria-label={label}>{opts.map(([v, l]) => <button key={v} type="button" className={value === v ? 'on' : ''} onClick={() => set(v)}>{l}</button>)}</div>;

function Controls({ cls, view, setView, hasF, hasD, device, setDevice, theme, setTheme, s, zoomTo, canvas }) {
  return <div className={'bd-ctl ' + cls}>
    {hasF && hasD ? <Seg label="Finals or drafts" value={view} set={setView} opts={[['all', 'All'], ['finals', 'Finals'], ['drafts', 'Drafts']]} /> : null}
    <Seg label="Device" value={device} set={setDevice} opts={[['both', 'Phone + web'], ['phone', 'Phone'], ['web', 'Web']]} />
    <Seg label="Theme" value={theme} set={setTheme} opts={[['both', 'Light + dark'], ['light', 'Light'], ['dark', 'Dark']]} />
    <div className="bd-zoom" aria-label="Zoom">
      <button type="button" className="bd-ib" onClick={() => zoomTo(s / 1.2)} aria-label="Smaller">−</button>
      <input type="range" min={ZMIN} max={ZMAX} step="0.01" value={s} onChange={ev => zoomTo(+ev.target.value)} aria-label="Screen size" />
      <button type="button" className="bd-ib" onClick={() => zoomTo(s * 1.2)} aria-label="Larger">+</button>
      <span className="bd-pct">{Math.round(s * 100)}%</span>
    </div>
    <a className="bd-btn" href={canvas} title="This module as one pannable, zoomable table">Canvas ↗</a>
  </div>;
}

function Lightbox({ list, i, dark, onNav, onTheme, onClose, pinned, onPin }) {
  const [full, setFull] = useState(false);
  const item = list[i], e = item.e;
  const sw = useRef(null);
  useEffect(() => {
    const k = ev => {
      if (ev.key === 'Escape') onClose();
      else if (ev.key === 'ArrowRight') onNav(1);
      else if (ev.key === 'ArrowLeft') onNav(-1);
      else if (ev.key === 'd' || ev.key === 'D') onTheme(!dark);
    };
    addEventListener('keydown', k); return () => removeEventListener('keydown', k);
  }, [dark, onNav, onTheme, onClose]);
  const w = e.web ? WW : PW, h = e.web ? WH : PHH;
  const fit = Math.min(1, (innerWidth - 24) / w, (innerHeight - 132) / h);
  const id = dark ? e.idD : e.idL;
  return <div className="sh-lb" role="dialog" aria-label={e.name}>
    <div className="sh-lb-bar">
      <code>{id}</code><span className="nm">{e.name}<small>{item.g.module} · {item.g.name}</small></span>
      <Seg label="Theme" value={dark ? 'd' : 'l'} set={v => onTheme(v === 'd')} opts={[['l', 'Light'], ['d', 'Dark']]} />
      <Seg label="Size" value={full ? 'full' : 'fit'} set={v => setFull(v === 'full')} opts={[['fit', 'Fit'], ['full', '100%']]} />
      <button type="button" className={'bd-btn light' + (pinned ? ' on' : '')} onClick={() => onPin(e, dark)}>{pinned ? 'Comparing' : '+ Compare'}</button>
      <a className="bd-btn light" href={'board.html?m=' + e.mid + '&only=' + id + '&z=1'} target="_blank" rel="noopener" title="This screen alone, for inspecting the front-end code">Open alone ↗</a>
      <button type="button" className="sh-x" onClick={onClose} aria-label="Close">×</button>
    </div>
    <div className={'sh-lb-stage' + (full ? ' full' : '')} onClick={ev => { if (ev.target === ev.currentTarget) onClose(); }}
      onPointerDown={ev => { if (ev.pointerType === 'touch' && !full) sw.current = { x: ev.clientX, y: ev.clientY }; }}
      onPointerUp={ev => { const a = sw.current; sw.current = null; if (!a) return; const dx = ev.clientX - a.x, dy = ev.clientY - a.y; if (Math.abs(dx) > 60 && Math.abs(dx) > 1.5 * Math.abs(dy)) onNav(dx < 0 ? 1 : -1); }}>
      <div className="sh-lb-frame" style={{ zoom: full ? 1 : fit }}><Device web={e.web} T={dark ? FINALD : FINAL} Scr={e.Scr} /></div>
    </div>
    <div className="sh-lb-nav">
      <button type="button" className="bd-btn light" onClick={() => onNav(-1)} disabled={i === 0}>‹ Previous</button>
      <span>{i + 1} / {list.length}</span>
      <button type="button" className="bd-btn light" onClick={() => onNav(1)} disabled={i === list.length - 1}>Next ›</button>
    </div>
  </div>;
}

function Compare({ pins, setPins, onClose, ver }) {
  const [cz, setCz] = useState(() => Math.max(0.2, Math.min(1, (innerHeight - 170) / PHH)));
  const [copied, setCopied] = useState(false);
  useEffect(() => { const k = ev => { if (ev.key === 'Escape') onClose(); }; addEventListener('keydown', k); return () => removeEventListener('keydown', k); }, [onClose]);
  const items = pins.map(p => { const F = loaded(p.m) ? framesOf(p.m) : null; const hit = F && findEntry(F, p.id); return { p, hit }; });
  const link = () => {
    const url = location.origin + location.pathname + '?cmp=' + pins.map(p => p.m + ':' + p.id + (p.dark ? ':d' : '')).join(',');
    const done = () => { setCopied(true); setTimeout(() => setCopied(false), 1600); };
    try { navigator.clipboard.writeText(url).then(done, () => prompt('Copy this link', url)); } catch (e) { prompt('Copy this link', url); }
  };
  const set = (k, patch) => setPins(ps => ps.map((p, j) => j === k ? { ...p, ...patch } : p));
  const move = (k, d) => setPins(ps => { const a = ps.slice(), j = k + d; if (j < 0 || j >= a.length) return a; [a[k], a[j]] = [a[j], a[k]]; return a; });
  return <div className="cp" role="dialog" aria-label="Compare screens">
    <div className="cp-bar">
      <b className="cp-title">Compare <span>{pins.length} screen{pins.length === 1 ? '' : 's'} side by side</span></b>
      <div className="bd-zoom">
        <button type="button" className="bd-ib" onClick={() => setCz(z => Math.max(ZMIN, z / 1.2))} aria-label="Smaller">−</button>
        <input type="range" min={ZMIN} max={ZMAX} step="0.01" value={cz} onChange={ev => setCz(+ev.target.value)} aria-label="Screen size" />
        <button type="button" className="bd-ib" onClick={() => setCz(z => Math.min(ZMAX, z * 1.2))} aria-label="Larger">+</button>
        <span className="bd-pct">{Math.round(cz * 100)}%</span>
      </div>
      <button type="button" className="bd-btn" onClick={link} disabled={!pins.length}>{copied ? 'Link copied' : 'Copy link'}</button>
      <button type="button" className="bd-btn" onClick={() => setPins([])} disabled={!pins.length}>Clear</button>
      <button type="button" className="bd-btn dark" onClick={onClose}>Done</button>
    </div>
    {!pins.length ? <div className="sh-empty">Nothing pinned yet. Press <b>+ Compare</b> on any screen, in any module, then come back here to see them side by side.</div> :
      <div className="cp-row">{items.map(({ p, hit }, k) => <div key={p.m + p.id} className="cp-item">
        <div className="cp-cap">
          <code>{p.dark && hit ? hit.e.idD : p.id}</code>
          <span className="nm" title={hit ? hit.e.name : ''}>{hit ? hit.e.name : (loaded(p.m) ? 'not on the board any more' : 'loading…')}<small>{(modById(p.m) || {}).name}{hit ? ' · ' + hit.s.name : ''}</small></span>
        </div>
        <div className="cp-tools">
          <Seg label="Theme" value={p.dark ? 'd' : 'l'} set={v => set(k, { dark: v === 'd' })} opts={[['l', 'Light'], ['d', 'Dark']]} />
          <button type="button" className="bd-ib" onClick={() => move(k, -1)} disabled={k === 0} aria-label="Move left">‹</button>
          <button type="button" className="bd-ib" onClick={() => move(k, 1)} disabled={k === pins.length - 1} aria-label="Move right">›</button>
          <button type="button" className="bd-ib" onClick={() => setPins(ps => ps.filter((_, j) => j !== k))} aria-label="Remove">×</button>
        </div>
        <div className="cp-dev" style={{ width: (hit && hit.e.web ? WW : PW) * cz, height: (hit && hit.e.web ? WH : PHH) * cz }}>
          <div style={{ zoom: cz }}>{hit ? <Device web={hit.e.web} T={p.dark ? FINALD : FINAL} Scr={hit.e.Scr} /> : <div className="sh-ph p" />}</div>
        </div>
      </div>)}</div>}
  </div>;
}

function Overview({ ver, go }) {
  return <div className="bd-main ov">
    <section className="ov-hero">
      <h1>Sutra · design board</h1>
      <p>Sutra is the ERP for a fashion house that sells by pictures: designs are known by their photo before their number. Salespeople use it on phones in the showroom, packers and karigars on the floor, managers on desk screens. Every screen here is a live front-end mock-up, drawn for phone and web, in light and dark.</p>
    </section>
    <section className="ov-guide">
      <h2 className="ov-h">How to read this board</h2>
      <ul className="ov-how">
        <li><b>Tabs are the modules</b>Catalogue, CRM, Dispatch… Inside a module, the second row lists its sub-menus in the order a user meets them.</li>
        <li><b>Finals and drafts</b>Finals are signed off. Drafts are still being decided; a new take sits beside the screen it would replace.</li>
        <li><b>Open, page, compare</b>Tap a screen to open it large, then ← → or swipe to page through. <i>+ Compare</i> pins screens from any module to see them side by side.</li>
        <li><b>Zoom</b>The slider, Ctrl / ⌘ + scroll or a pinch resizes every screen at once. <i>Canvas</i> shows a module as one pannable table.</li>
        <li><b>Screen ids</b>f- / w- are finals (phone / web), n- / nw- drafts; a d after the letter means dark. Quote the id when asking for a change.</li>
      </ul>
    </section>
    <section className="ov-mods">
      <h2 className="ov-h">The modules</h2>
      <div className="ov-grid">{MODULES.map(m => <ModuleCard key={m.id} mod={m} go={go} ver={ver} />)}</div>
    </section>
    <p className="ov-more">Also: <a href="board.html?m=all">the whole board as one canvas</a> · <a href="hub.html">module pages</a> · <a href="drafts-archive.html">the first Catalogue explorations</a></p>
  </div>;
}
const ModuleCard = memo(function ModuleCard({ mod, go }) {
  const F = moduleFrames(mod), ok = loaded(mod.id);
  const subs = [...new Set([...F.finalSubs, ...F.draftSubs].map(s => s.name))];
  const ref = F.finalSubs.length ? F.finalSubs : F.draftSubs;
  const ph = ref.flatMap(s => s.phone)[0], wb = ref.flatMap(s => s.web)[0];
  const nF = screensIn(F.finalSubs), nD = screensIn(F.draftSubs);
  return <article className="ov-card" onClick={() => go(mod.id)} tabIndex={0} onKeyDown={ev => { if (ev.key === 'Enter') go(mod.id); }}>
    <div className="ov-prev">{ph ? <Mini e={ph} z={0.24} /> : null}{wb ? <Mini e={wb} z={0.17} /> : null}{!ph && !wb ? <span className="ov-wait">{ok ? 'No screens yet' : 'Loading screens…'}</span> : null}</div>
    <div className="ov-body">
      <h2>{mod.name}</h2>
      <p>{mod.about || mod.note}</p>
      <div className="ov-n">{ok ? (nF ? nF + ' final' + (nF > 1 ? 's' : '') + ' · ' : '') + nD + ' draft' + (nD === 1 ? '' : 's') + ' · ' + subs.length + ' sub-menus' : 'loading…'}</div>
      <div className="ov-subs">{subs.map(n => <button key={n} type="button" onClick={ev => { ev.stopPropagation(); go(mod.id, n); }}>{n}</button>)}</div>
    </div>
  </article>;
});

function initialPins() {
  const raw = Q.get('cmp');
  if (raw) return raw.split(',').map(x => x.split(':')).filter(a => a[0] && a[1]).map(([m, id, d]) => ({ m, id, dark: d === 'd' }));
  const p = store.get('sutra.board.pins', []);
  return Array.isArray(p) ? p : [];
}

function Board() {
  const narrow = useMemo(() => innerWidth < 760, []);
  const prefs = useMemo(() => store.get('sutra.board.prefs', {}), []);
  const [tab, setTab] = useState(MOD0 !== 'all' && modById(MOD0) ? MOD0 : 'overview');
  const [sub, setSub] = useState(SUB0);
  const [view, setView] = useState(V0 || 'all');
  const [device, setDevice] = useState(prefs.device || 'both');
  const [theme, setTheme] = useState(prefs.theme || (narrow ? 'light' : 'both'));
  const [s, setS] = useState(() => Math.max(ZMIN, Math.min(ZMAX, +Q.get('s') || prefs.s || (narrow ? 0.42 : 0.4))));
  const [ver, setVer] = useState(0);
  const [prog, setProg] = useState(null);
  const [focus, setFocus] = useState(null);
  const [pins, setPins] = useState(initialPins);
  const [cmp, setCmp] = useState(Q.has('cmp'));
  const sRef = useRef(s); sRef.current = s;
  const anchor = useRef(null), main = useRef(null);

  /* modules arrive in the background: the open tab and pinned modules first, then the rest in manifest order */
  useEffect(() => {
    const on = () => setVer(v => v + 1);
    addEventListener('sutra:module', on);
    if (window.SutraLoad) SutraLoad.onProgress(p => setProg(p.done < p.total ? { ...p } : null));
    let alive = true;
    (async () => {
      const order = [tab !== 'overview' ? tab : null, ...pins.map(p => p.m), ...MODULES.map(m => m.id)].filter(Boolean);
      for (const id of order) { if (!alive) return; if (window.SutraLoad) await SutraLoad.module(id); }
    })();
    return () => { alive = false; removeEventListener('sutra:module', on); };
  }, []);
  useEffect(() => { if (tab !== 'overview' && window.SutraLoad) SutraLoad.module(tab); }, [tab]);

  /* the tab, sub-menu and view live in the URL, so a link or a reload opens the same place; Back returns to the last tab */
  const lastTab = useRef(tab);
  useEffect(() => {
    const p = new URLSearchParams(location.search); /* keeps ?dev and the like; cmp was read at start */
    ['m', 'sub', 'v', 'cmp'].forEach(k => p.delete(k));
    if (tab !== 'overview') p.set('m', tab);
    if (sub) p.set('sub', sub);
    if (view !== 'all') p.set('v', view);
    const url = location.pathname + (p.toString() ? '?' + p : '');
    if (lastTab.current !== tab) history.pushState(null, '', url); else history.replaceState(null, '', url);
    lastTab.current = tab;
    document.title = tab === 'overview' ? 'Sutra · design board' : 'Sutra · ' + modById(tab).name + ' · design board';
  }, [tab, sub, view]);
  useEffect(() => {
    const pop = () => { const q = new URLSearchParams(location.search), m = q.get('m'); lastTab.current = m && modById(m) ? m : 'overview'; setTab(lastTab.current); setSub(q.get('sub') || ''); setView(q.get('v') === 'finals' || q.get('v') === 'drafts' ? q.get('v') : 'all'); };
    addEventListener('popstate', pop); return () => removeEventListener('popstate', pop);
  }, []);
  useEffect(() => { store.set('sutra.board.prefs', { device, theme, s }); }, [device, theme, s]);
  useEffect(() => { store.set('sutra.board.pins', pins); }, [pins]);

  /* zoom: two CSS variables size every frame; no frame gets wider than the page */
  const applyZoom = useCallback(() => {
    const cw = main.current ? main.current.clientWidth - 2 * parseFloat(getComputedStyle(main.current).paddingLeft || 0) : innerWidth - 32;
    const n = theme === 'both' ? 2 : 1, z = sRef.current;
    const r = document.documentElement.style;
    r.setProperty('--zp', Math.min(z, cw / (PW * n + GAP * (n - 1))));
    r.setProperty('--zw', Math.min(z, cw / (WW * n + GAP * (n - 1))));
  }, [theme]);
  useLayoutEffect(() => {
    applyZoom();
    const a = anchor.current; anchor.current = null;
    if (a && a.el.isConnected) window.scrollBy(0, a.el.getBoundingClientRect().top - a.top);
  }, [s, theme, device, tab, sub, view, ver, applyZoom]);
  useEffect(() => { addEventListener('resize', applyZoom); return () => removeEventListener('resize', applyZoom); }, [applyZoom]);
  const zoomTo = useCallback((ns, cx, cy) => {
    ns = Math.max(ZMIN, Math.min(ZMAX, Math.round(ns * 1000) / 1000));
    const x = cx == null ? innerWidth / 2 : cx, y = cy == null ? innerHeight / 2 : cy;
    const el = document.elementFromPoint(x, y), p = el && el.closest('.sh-pair');
    if (p) anchor.current = { el: p, top: p.getBoundingClientRect().top };
    setS(ns);
  }, []);
  const overlay = !!focus || cmp;
  useEffect(() => {
    const wheel = e => { if (!(e.ctrlKey || e.metaKey) || overlay || tab === 'overview') return; e.preventDefault(); zoomTo(sRef.current * Math.exp(-e.deltaY * 0.004), e.clientX, e.clientY); };
    const key = e => {
      if (overlay || tab === 'overview' || e.ctrlKey || e.metaKey || e.altKey || /input|textarea|select/i.test((e.target || {}).tagName || '')) return;
      if (e.key === '+' || e.key === '=') zoomTo(sRef.current * 1.15); else if (e.key === '-' || e.key === '_') zoomTo(sRef.current / 1.15); else if (e.key === '0') zoomTo(narrow ? 0.42 : 0.4);
    };
    addEventListener('wheel', wheel, { passive: false }); addEventListener('keydown', key);
    return () => { removeEventListener('wheel', wheel); removeEventListener('keydown', key); };
  }, [overlay, tab, zoomTo, narrow]);

  /* the open module's groups: finals first, then drafts; the sub-menu row filters, Phone / Web filters */
  const F = useMemo(() => tab === 'overview' ? null : framesOf(tab), [tab, ver]);
  const hasF = !!(F && F.finalSubs.length), hasD = !!(F && F.draftSubs.length);
  const vv = view === 'finals' && hasF ? 'finals' : view === 'drafts' && hasD ? 'drafts' : 'all';
  const subsAll = useMemo(() => !F ? [] : [...(vv !== 'drafts' ? F.finalSubs : []), ...(vv !== 'finals' ? F.draftSubs : [])], [F, vv]);
  const subNames = useMemo(() => { const m = new Map(); subsAll.forEach(g => m.set(g.name, (m.get(g.name) || 0) + g.phone.length + g.web.length)); return [...m]; }, [subsAll]);
  const groups = useMemo(() => {
    const exact = subsAll.some(g => g.name === sub), want = sub.toLowerCase();
    return subsAll.filter(g => !sub || (exact ? g.name === sub : g.name.toLowerCase().includes(want)))
      .map(g => ({ ...g, phone: device === 'web' ? [] : g.phone, web: device === 'phone' ? [] : g.web }))
      .filter(g => g.phone.length + g.web.length);
  }, [subsAll, sub, device]);
  const list = useMemo(() => groups.flatMap(g => [...g.phone, ...g.web].map(e => ({ e, g }))), [groups]);
  const listRef = useRef(list); listRef.current = list;
  const open = useCallback((idx, dark) => setFocus({ list: listRef.current, i: idx, dark }), []);
  const pinKeys = useMemo(() => new Set(pins.map(p => p.m + ':' + p.id)), [pins]);
  const pin = useCallback((e, dark) => setPins(ps => ps.some(p => p.m === e.mid && p.id === e.idL) ? ps.filter(p => !(p.m === e.mid && p.id === e.idL)) : [...ps, { m: e.mid, id: e.idL, dark }]), []);
  const counts = useMemo(() => Object.fromEntries(MODULES.map(m => { const X = moduleFrames(m); return [m.id, loaded(m.id) ? screensIn(X.finalSubs) + screensIn(X.draftSubs) : null]; })), [ver]);
  const go = useCallback((id, subName) => { setTab(id); setSub(subName || ''); setView('all'); setFocus(null); window.scrollTo(0, 0); }, []);
  const canvas = 'board.html?m=' + tab + '&v=' + (vv === 'finals' ? 'finals' : vv === 'drafts' ? 'drafts' : hasF && hasD ? 'compare' : hasF ? 'finals' : 'drafts');
  const frames = list.length * (theme === 'both' ? 2 : 1);
  useEffect(() => { const r = document.getElementById('root'); r.dataset.frames = frames; r.dataset.screens = list.length; r.dataset.subs = groups.map(g => g.name).join('|'); }, [frames, list, groups]);
  const errs = window.SutraLoad ? SutraLoad.errors : [];
  const ctl = { view: vv, setView: v => { setView(v); setSub(''); }, hasF, hasD, device, setDevice, theme, setTheme, s, zoomTo, canvas };
  const M = tab === 'overview' ? null : modById(tab);
  let idx = 0;

  return <>
    <header className="bd-head">
      <div className="bd-row">
        <button type="button" className="bd-brand" onClick={() => go('overview')} title="Overview">Sutra<small>design board</small></button>
        <nav className="bd-scroll bd-tabs" aria-label="Modules">
          <button type="button" className={'bd-tab' + (tab === 'overview' ? ' on' : '')} onClick={() => go('overview')}>Overview</button>
          {MODULES.map(m => <button key={m.id} type="button" className={'bd-tab' + (tab === m.id ? ' on' : '')} onClick={() => go(m.id)}>{m.name}<i>{counts[m.id] == null ? '…' : counts[m.id]}</i></button>)}
        </nav>
        <button type="button" className="bd-btn dark bd-cmp" onClick={() => setCmp(true)} title="See pinned screens side by side">Compare<b>{pins.length}</b></button>
      </div>
      {M && <div className="bd-row bd-row2">
        <nav className="bd-scroll bd-subs" aria-label="Sub-menus">
          <button type="button" className={'bd-sub' + (!sub ? ' on' : '')} onClick={() => setSub('')}>All<i>{subNames.reduce((a, x) => a + x[1], 0)}</i></button>
          {subNames.map(([n, c]) => <button key={n} type="button" className={'bd-sub' + (sub === n ? ' on' : '')} onClick={() => { setSub(n); window.scrollTo(0, 0); }}>{n}<i>{c}</i></button>)}
        </nav>
        <Controls cls="in-head" {...ctl} />
      </div>}
      {prog ? <div className="bd-prog" style={{ width: Math.round(100 * prog.done / Math.max(1, prog.total)) + '%' }} /> : null}
    </header>
    {errs.length ? <div className="bd-err">{errs.length} file{errs.length > 1 ? 's' : ''} did not load: {errs.join(' · ')}</div> : null}
    {!M ? <Overview ver={ver} go={go} /> :
      <main className="bd-main" ref={main}>
        <section className="bd-intro">
          <h1>{M.name}</h1>
          <p>{M.about || M.note}</p>
          <div className="bd-meta">{loaded(tab) ? `${counts[tab] || 0} screens · ${subNames.length} sub-menus${hasF ? ' · ' + screensIn(F.finalSubs) + ' signed off' : ''}${hasD ? ' · ' + screensIn(F.draftSubs) + ' in drafts' : ''}` : 'loading the screens…'}</div>
        </section>
        <Controls cls="in-body" {...ctl} />
        {!loaded(tab) && !groups.length ? <div className="sh-empty">Loading {M.name}… {prog ? prog.done + ' / ' + prog.total + ' files' : ''}</div> : null}
        {loaded(tab) && !groups.length ? <div className="sh-empty">No {device === 'both' ? '' : device + ' '}screens here yet.</div> : null}
        {groups.map((g, k) => <section key={g.kind + g.module + g.name + k} className="sh-sec">
          <div className="sh-band"><span className={'kind ' + g.kind}>{g.kind === 'final' ? 'Final' : 'Draft'}</span><b>{g.name}</b><span className="flow">{g.flow}</span><span className="cnt">{g.phone.length} phone · {g.web.length} web</span></div>
          <div className="sh-row">{[...g.phone, ...g.web].map(e => { const n = idx++; return <Cell key={e.idL} e={e} theme={theme} idx={n} onOpen={open} pinned={pinKeys.has(e.mid + ':' + e.idL)} onPin={pin} lazy={LAZY} />; })}</div>
        </section>)}
      </main>}
    {focus && <Lightbox list={focus.list} i={focus.i} dark={focus.dark}
      onNav={d => setFocus(f => ({ ...f, i: Math.max(0, Math.min(f.list.length - 1, f.i + d)) }))}
      onTheme={dark => setFocus(f => ({ ...f, dark }))} onClose={() => setFocus(null)}
      pinned={pinKeys.has(focus.list[focus.i].e.mid + ':' + focus.list[focus.i].e.idL)} onPin={pin} />}
    {cmp && <Compare pins={pins} setPins={setPins} onClose={() => setCmp(false)} ver={ver} />}
  </>;
}

ReactDOM.createRoot(document.getElementById('root')).render(UI ? <Board /> : <HeadlessSheet />);
})();
