/* CONTACT SHEET RENDERER · sheet.html. Reads the same registrations as board.jsx (window.SUTRA_MODULES,
   window.NEW_DRAFT_MODULES, FIN / WEB / BOARD) and lays every frame out small on one scrolling page: a band per
   sub-menu, phone pairs then web pairs, each pair light + dark under one caption carrying the frame id exactly as it
   reads on board.html?m=<id>. Nothing is lazy: every frame mounts, which is what a one-shot headless render wants.

   In a browser the bar at the top switches module, sub-menu, drafts / finals, theme and scale without a reload, and a
   click on any frame opens it large (Esc closes). Query parameters set the starting state and drive the headless
   script, which never shows the bar:
   ?m=<id>|all   ?sub=<name>   ?ids=n-3,nwd-7   ?sample=1|2   ?s=0.4   ?v=finals   ?ui=0
   When it has rendered, #root carries data-frames, data-subs (pipe-separated) and data-h (page height) for the
   headless script, and the title reads "Sutra · <module> · sheet · <n> frames".
   Everything sits inside one function scope: the module files share the page's global scope (Sheet, Device, Body …
   are primitives there), so nothing here may leak a name. */
(() => {
const Q = new URLSearchParams(location.search);
const MOD_ID = Q.get('m') || 'all';
const MODS = MOD_ID === 'all' ? SUTRA_MODULES.modules : SUTRA_MODULES.modules.filter(x => x.id === MOD_ID);
const S0 = Math.max(0.1, Math.min(1, +Q.get('s') || 0.4));
const SUB0 = (Q.get('sub') || '').trim();
const IDS = (Q.get('ids') || '').split(',').map(s => s.trim()).filter(Boolean);
const SAMPLE = Q.has('sample') ? Math.max(1, +Q.get('sample') || 1) : 0;
const V0 = Q.get('v') === 'finals' ? 'finals' : Q.get('v') === 'drafts' ? 'drafts' : '';
const UI = Q.get('ui') !== '0' && !IDS.length && !SAMPLE;
const belongs = (moduleName, mod) => mod.names.some(n => moduleName === n || moduleName.startsWith(n + ' '));
const { useState, useMemo, useEffect } = React;

/* Per module, in module-page terms: draft subs with page ids (n-/nd-/nw-/nwd- count within that module's page,
   in registration order) and final subs with the global f-/fd-/w-/wd- ids. */
function moduleFrames(mod) {
  const drafts = (window.NEW_DRAFT_MODULES || []).filter(e => belongs(e.module, mod));
  let np = 0, nw = 0;
  const draftSubs = [];
  drafts.forEach(m => m.subs.forEach(s => draftSubs.push({
    module: m.module, name: s.name, flow: s.flow,
    phone: s.phone.map(([name, Scr]) => { np++; return { name, Scr, web: false, idL: 'n-' + np, idD: 'nd-' + np }; }),
    web: s.web.map(([name, Scr]) => { nw++; return { name, Scr, web: true, idL: 'nw-' + nw, idD: 'nwd-' + nw }; }),
  })));
  const finalSubs = [];
  BOARD.filter(b => b.id === mod.id).forEach(b => b.subs.forEach(s => finalSubs.push({
    module: b.module, name: s.name, flow: s.flow,
    phone: s.phone.map(i => ({ name: FIN[i - 1][0], Scr: FIN[i - 1][1], web: false, idL: 'f-' + i, idD: 'fd-' + i })),
    web: s.web.map(i => ({ name: WEB[i - 1][0], Scr: WEB[i - 1][1], web: true, idL: 'w-' + i, idD: 'wd-' + i })),
  })));
  return { mod, draftSubs, finalSubs };
}
const ALL = MODS.map(moduleFrames);
const byId = id => ALL.find(M => M.mod.id === id);
const viewOf = (M, v) => (v === 'finals' || (v !== 'drafts' && !M.draftSubs.length)) ? 'finals' : 'drafts';
const subsOf = (M, v) => viewOf(M, v) === 'finals' ? M.finalSubs : M.draftSubs;

/* groups of { module, name, flow, phone: [entry], web: [entry], single?: bool } */
function staticGroups() {
  if (IDS.length) {
    /* explicit frames: one theme each, as listed; ids are read against the first module on the page */
    const M = ALL[0]; if (!M) return { groups: [], title: MOD_ID };
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
function liveGroups(modId, sub, v) {
  const groups = [], want = sub.toLowerCase();
  (modId === 'all' ? ALL : [byId(modId)].filter(Boolean)).forEach(M => subsOf(M, v).forEach(s => { if (!want || s.name.toLowerCase().includes(want)) groups.push({ module: M.mod.name, ...s }); }));
  return groups;
}
const countOf = groups => groups.reduce((a, g) => a + (g.single ? g.phone.length + g.web.length : (g.phone.length + g.web.length) * 2), 0);

const Device = ({ web, T, Scr }) => web ? <LaptopDevice width={1280} height={800} dark={T.dark}><Scr T={T} /></LaptopDevice> : <IOSDevice width={390} height={844} dark={T.dark}><Scr T={T} /></IOSDevice>;
const W = e => e.web ? 1308 : 390;
/* CSS zoom scales the device and everything inside it, layout included, so the page flows at the small size */
function Cell({ e, single, s, theme, onOpen }) {
  const both = !single && theme === 'both';
  const themes = single ? [e.dark] : theme === 'both' ? [false, true] : [theme === 'dark'];
  return <div className="sh-pair" style={{ width: (W(e) * themes.length + (themes.length - 1) * 12) * s }}>
    <div className="sh-cap"><code>{single ? e.id : (theme === 'dark' ? e.idD : e.idL)}</code><span>{e.name}</span><span className="ld">{single ? (e.dark ? 'dark' : 'light') : both ? 'light · dark' : theme}</span></div>
    <div className="sh-devs" style={{ zoom: s }}>
      {themes.map(dark => <div key={dark ? 'd' : 'l'} className={'sh-dev' + (onOpen ? ' press' : '')} onClick={onOpen ? () => onOpen(e, dark) : undefined} title={onOpen ? 'Open large' : undefined}><Device web={e.web} T={dark ? FINALD : FINAL} Scr={e.Scr} /></div>)}
    </div>
  </div>;
}
const Chip = ({ on, onClick, children, small }) => <button type="button" className={'sh-chip' + (on ? ' on' : '') + (small ? ' small' : '')} onClick={onClick}>{children}</button>;

function Lightbox({ f, onClose, onTheme }) {
  useEffect(() => { const k = ev => { if (ev.key === 'Escape') onClose(); }; addEventListener('keydown', k); return () => removeEventListener('keydown', k); }, []);
  const e = f.e, w = e.web ? 1308 : 390, h = e.web ? 838 : 844;
  const z = Math.min(1, (innerWidth - 48) / w, (innerHeight - 120) / h);
  const id = f.dark ? e.idD : e.idL;
  return <div className="sh-lb" onClick={onClose}>
    <div className="sh-lb-bar" onClick={ev => ev.stopPropagation()}>
      <code>{id}</code><span className="nm">{e.name}</span>
      <Chip small on={!f.dark} onClick={() => onTheme(false)}>light</Chip><Chip small on={f.dark} onClick={() => onTheme(true)}>dark</Chip>
      <span className="hint">board.html?m=…&amp;only={id} · Esc closes</span>
      <button type="button" className="sh-x" onClick={onClose} aria-label="Close">×</button>
    </div>
    <div className="sh-lb-frame" style={{ zoom: z }} onClick={ev => ev.stopPropagation()}><Device web={e.web} T={f.dark ? FINALD : FINAL} Scr={e.Scr} /></div>
  </div>;
}

function ContactSheet() {
  const first = ALL[0] ? ALL[0].mod.id : 'all';
  const [mod, setMod] = useState(MOD_ID === 'all' && UI ? first : MOD_ID);
  const [sub, setSub] = useState(SUB0);
  const [v, setV] = useState(V0);
  const [s, setS] = useState(S0);
  const [theme, setTheme] = useState('both');
  const [focus, setFocus] = useState(null);
  const stat = useMemo(() => UI ? null : staticGroups(), []);
  const groups = useMemo(() => stat ? stat.groups : liveGroups(mod, sub, v), [stat, mod, sub, v]);
  const M = mod === 'all' ? null : byId(mod);
  const title = stat ? stat.title : (M ? M.mod.name : 'Whole board');
  const count = countOf(groups);
  useEffect(() => {
    const r = document.getElementById('root');
    r.dataset.frames = count; r.dataset.subs = groups.map(g => g.name).join('|');
    document.title = 'Sutra · ' + title + ' · sheet · ' + count + ' frames';
    const t = setTimeout(() => { r.dataset.h = Math.ceil(document.documentElement.scrollHeight); }, 0);
    return () => clearTimeout(t);
  }, [groups, s, theme]);
  const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const subs = M ? subsOf(M, v) : [];
  const hasBoth = M && M.draftSubs.length && M.finalSubs.length;
  const open = UI ? (e, dark) => setFocus({ e, dark }) : null;
  return <>
    {UI && <div className="sh-bar">
      <div className="sh-bar-row">
        {ALL.length > 1 && ALL.map(X => <Chip key={X.mod.id} on={mod === X.mod.id} onClick={() => { setMod(X.mod.id); setSub(''); setV(''); }}>{X.mod.name}</Chip>)}
        {ALL.length > 1 && <span className="sh-sep" />}
        {hasBoth ? <><Chip small on={viewOf(M, v) === 'drafts'} onClick={() => { setV('drafts'); setSub(''); }}>New drafts</Chip><Chip small on={viewOf(M, v) === 'finals'} onClick={() => { setV('finals'); setSub(''); }}>Finals</Chip><span className="sh-sep" /></> : null}
        <Chip small on={theme === 'both'} onClick={() => setTheme('both')}>light + dark</Chip><Chip small on={theme === 'light'} onClick={() => setTheme('light')}>light</Chip><Chip small on={theme === 'dark'} onClick={() => setTheme('dark')}>dark</Chip>
        <span className="sh-sep" />
        {[[0.3, "S"], [0.4, "M"], [0.55, "L"]].map(([z, l]) => <Chip key={l} small on={s === z} onClick={() => setS(z)}>{l}</Chip>)}
        <span className="sh-n">{count} frames · click a frame to open it large · <a href={'board.html?m=' + mod} target="_blank" rel="noopener">board ↗</a></span>
      </div>
      {subs.length > 1 && <div className="sh-bar-row subs"><Chip small on={!sub} onClick={() => setSub('')}>All</Chip>{subs.map(x => <Chip key={x.name} small on={sub === x.name} onClick={() => setSub(x.name)}>{x.name} <i>{(x.phone.length + x.web.length) * 2}</i></Chip>)}</div>}
    </div>}
    <div className="sh-head"><h1>{title}</h1><span className="n">contact sheet · {count} frames · scale {s}</span><span className="d">{date}</span></div>
    {!groups.length && <div className="sh-empty">Nothing to show. For a module: sheet.html?m=&lt;id&gt; (ids in modules.js: {SUTRA_MODULES.modules.map(m => m.id).join(', ')}). Sampler: sheet.html?m=all&amp;sample=1.</div>}
    {groups.map((g, k) => <section key={k}>
      <div className="sh-band"><span className="mod">{g.module}</span><b>{g.name}</b><span className="flow">{g.flow}</span><span className="cnt">{g.phone.length} phone · {g.web.length} web</span></div>
      <div className="sh-row">{g.phone.map((e, i) => <Cell key={'p' + i} e={e} single={g.single} s={s} theme={theme} onOpen={open} />)}{g.web.map((e, i) => <Cell key={'w' + i} e={e} single={g.single} s={s} theme={theme} onOpen={open} />)}</div>
    </section>)}
    {focus && <Lightbox f={focus} onClose={() => setFocus(null)} onTheme={dark => setFocus({ ...focus, dark })} />}
  </>;
}
ReactDOM.createRoot(document.getElementById('root')).render(<ContactSheet />);
})();
