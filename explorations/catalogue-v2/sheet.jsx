/* CONTACT SHEET RENDERER · sheet.html. Reads the same registrations as board.jsx (window.SUTRA_MODULES,
   window.NEW_DRAFT_MODULES, FIN / WEB / BOARD) and lays every frame out small on one scrolling page: a band per
   sub-menu, phone pairs then web pairs, each pair light + dark under one caption carrying the frame id exactly as it
   reads on board.html?m=<id>. Nothing is lazy: every frame mounts, which is what a one-shot headless render wants.

   ?m=<id>|all   ?sub=<name>   ?ids=n-3,nwd-7   ?sample=1|2   ?s=0.4   ?v=finals
   When it has rendered, #root carries data-frames, data-subs (pipe-separated) and data-h (page height) for the
   headless script, and the title reads "Sutra · <module> · sheet · <n> frames".
   Everything sits inside one function scope: the module files share the page's global scope (Sheet, Device, Body …
   are primitives there), so nothing here may leak a name. */

(() => {
const Q = new URLSearchParams(location.search);
const MOD_ID = Q.get('m') || 'all';
const MODS = MOD_ID === 'all' ? SUTRA_MODULES.modules : SUTRA_MODULES.modules.filter(x => x.id === MOD_ID);
const S = Math.max(0.1, Math.min(1, +Q.get('s') || 0.4));
const SUB = (Q.get('sub') || '').trim().toLowerCase();
const IDS = (Q.get('ids') || '').split(',').map(s => s.trim()).filter(Boolean);
const SAMPLE = Q.has('sample') ? Math.max(1, +Q.get('sample') || 1) : 0;
const WANT_FINALS = Q.get('v') === 'finals';
const belongs = (moduleName, mod) => mod.names.some(n => moduleName === n || moduleName.startsWith(n + ' '));

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

/* what goes on the page: groups of { module, name, flow, phone: [entry], web: [entry], single?: bool } */
let GROUPS = [], TITLE = MOD_ID === 'all' ? 'Whole board' : (MODS[0] ? MODS[0].name : MOD_ID);
if (IDS.length) {
  /* explicit frames: one theme each, as listed; ids are read against the first module on the page */
  const M = ALL[0]; if (M) {
    const lists = { n: [], nd: [], nw: [], nwd: [], f: [], fd: [], w: [], wd: [] };
    M.draftSubs.forEach(s => { s.phone.forEach(e => { lists.n.push(e); lists.nd.push(e); }); s.web.forEach(e => { lists.nw.push(e); lists.nwd.push(e); }); });
    M.finalSubs.forEach(s => { s.phone.forEach(e => { lists.f[+e.idL.split('-')[1] - 1] = e; lists.fd[+e.idL.split('-')[1] - 1] = e; }); s.web.forEach(e => { lists.w[+e.idL.split('-')[1] - 1] = e; lists.wd[+e.idL.split('-')[1] - 1] = e; }); });
    const phone = [], web = [], missing = [];
    IDS.forEach(id => { const [k, n] = id.split('-'); const e = lists[k] && lists[k][(+n || 1) - 1]; if (!e) { missing.push(id); return; } const dark = /d$/.test(k); (e.web ? web : phone).push({ ...e, id, dark }); });
    GROUPS = [{ module: M.mod.name, name: 'Frames ' + IDS.join(', '), flow: missing.length ? 'not on this page: ' + missing.join(', ') : '', phone, web, single: true }];
  }
} else if (SAMPLE) {
  TITLE = 'Sampler';
  ALL.forEach(M => {
    const subs = M.finalSubs.length ? M.finalSubs : M.draftSubs; /* the signed-off screens are the reference where they exist */
    const phone = [], web = [];
    subs.forEach(s => { s.phone.forEach(e => { if (phone.length < SAMPLE) phone.push(e); }); s.web.forEach(e => { if (web.length < SAMPLE) web.push(e); }); });
    if (phone.length || web.length) GROUPS.push({ module: M.mod.name, name: subs[0] ? subs[0].name : '', flow: 'board.html?m=' + M.mod.id + (subs === M.finalSubs ? '&v=finals' : ''), phone, web });
  });
} else {
  ALL.forEach(M => {
    const subs = (WANT_FINALS || !M.draftSubs.length) ? M.finalSubs : M.draftSubs;
    subs.forEach(s => { if (!SUB || s.name.toLowerCase().includes(SUB)) GROUPS.push({ module: M.mod.name, ...s }); });
  });
}
const COUNT = GROUPS.reduce((a, g) => a + (g.single ? g.phone.length + g.web.length : (g.phone.length + g.web.length) * 2), 0);

const Device = ({ web, T, Scr }) => web ? <LaptopDevice width={1280} height={800} dark={T.dark}><Scr T={T} /></LaptopDevice> : <IOSDevice width={390} height={844} dark={T.dark}><Scr T={T} /></IOSDevice>;
/* CSS zoom scales the device and everything inside it, layout included, so the page flows at the small size */
const Cell = ({ e, single }) => <div className="sh-pair" style={{ width: single ? (e.web ? 1308 : 390) * S : ((e.web ? 1308 : 390) * 2 + 12) * S }}>
  <div className="sh-cap"><code>{single ? e.id : e.idL}</code><span>{e.name}</span><span className="ld">{single ? (e.dark ? 'dark' : 'light') : 'light · dark'}</span></div>
  <div className="sh-devs" style={{ zoom: S }}>
    {single ? <div className="sh-dev"><Device web={e.web} T={e.dark ? FINALD : FINAL} Scr={e.Scr} /></div>
      : <><div className="sh-dev"><Device web={e.web} T={FINAL} Scr={e.Scr} /></div><div className="sh-dev"><Device web={e.web} T={FINALD} Scr={e.Scr} /></div></>}
  </div>
</div>;

function ContactSheet() {
  React.useEffect(() => {
    const r = document.getElementById('root');
    r.dataset.frames = COUNT; r.dataset.subs = GROUPS.map(g => g.name).join('|'); r.dataset.h = Math.ceil(document.documentElement.scrollHeight);
    document.title = 'Sutra · ' + TITLE + ' · sheet · ' + COUNT + ' frames';
  }, []);
  const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  return <>
    <div className="sh-head"><h1>{TITLE}</h1><span className="n">contact sheet · {COUNT} frames · scale {S}</span><span className="d">{date}</span></div>
    {!GROUPS.length && <div className="sh-empty">Nothing to show. For a module: sheet.html?m=&lt;id&gt; (ids in modules.js: {SUTRA_MODULES.modules.map(m => m.id).join(', ')}). Sampler: sheet.html?m=all&amp;sample=1.</div>}
    {GROUPS.map((g, k) => <section key={k}>
      <div className="sh-band"><span className="mod">{g.module}</span><b>{g.name}</b><span className="flow">{g.flow}</span><span className="cnt">{g.phone.length} phone · {g.web.length} web</span></div>
      <div className="sh-row">{g.phone.map((e, i) => <Cell key={'p' + i} e={e} single={g.single} />)}{g.web.map((e, i) => <Cell key={'w' + i} e={e} single={g.single} />)}</div>
    </section>)}
  </>;
}
ReactDOM.createRoot(document.getElementById('root')).render(<ContactSheet />);
})();
