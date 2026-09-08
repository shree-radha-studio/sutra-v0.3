/* BOARD RENDERER · shared by every module page (board.html?m=<id>) and the whole-board page (board.html?m=all).
   Reads: window.SUTRA_MODULES (modules.js), window.NEW_DRAFT_MODULES (each module's self-registration),
   FIN / WEB / BOARD (finals.jsx). Three views per page (?v=): drafts, finals, or compare (both side by side); rows are
   modules and sub-menus, columns are phone (3 light + dark pairs per line) and web (2 pairs per line).

   Frames render lazily: a frame mounts its screen when it comes within about a viewport of the visible area and
   unmounts again when it leaves (tracked from scroll and zoom, not IntersectionObserver), so the page holds a few dozen live frames instead of hundreds. Placeholders keep
   the exact size, so ids, captions and scroll positions never move.

   Ids on a module page: n-<i> / nd-<i> (new-draft phone light / dark), nw-<i> / nwd-<i> (web), counted within
   that page only; f- / fd- / w- / wd- for finals are global indexes into FIN / WEB and never change.
   Single frame: board.html?m=crm&only=n-3&z=0.8 (&bare for no device frame). */

const Q = new URLSearchParams(location.search);
const MOD_ID = Q.get('m') || 'all';
const MODS = MOD_ID === 'all' ? SUTRA_MODULES.modules : SUTRA_MODULES.modules.filter(x => x.id === MOD_ID);
const belongs = (moduleName, mod) => mod.names.some(n => moduleName === n || moduleName.startsWith(n + ' '));
const NEW_DRAFTS = (window.NEW_DRAFT_MODULES || []).filter(e => MODS.some(mod => belongs(e.module, mod)));
const FINALS = BOARD.filter(b => MODS.some(mod => mod.id === b.id));
const PAGE_TITLE = MOD_ID === 'all' ? 'Whole board' : (MODS[0] ? MODS[0].name : MOD_ID);

/* flat lists for ?only= on new drafts */
const ND_PHONE = [], ND_WEB = []; NEW_DRAFTS.forEach(m => m.subs.forEach(s => { s.phone.forEach(e => ND_PHONE.push(e)); s.web.forEach(e => ND_WEB.push(e)); }));
const ONLY = { f: { T: FINAL, screens: FIN }, fd: { T: FINALD, screens: FIN }, w: { T: FINAL, screens: WEB, web: true }, wd: { T: FINALD, screens: WEB, web: true },
  n: { T: FINAL, screens: ND_PHONE }, nd: { T: FINALD, screens: ND_PHONE }, nw: { T: FINAL, screens: ND_WEB, web: true }, nwd: { T: FINALD, screens: ND_WEB, web: true } };

/* ── geometry (unchanged from the single-file board) ── */
const X0 = 60, GAP = 30, PAD = 24, CAP = 44, SECTION_GAP = 700;
const geo = r => r.web ? { dx: 1340, per: 3, lh: 900, w: 1280, h: 800 } : { dx: 460, per: 9, lh: 1000, w: 390, h: 844 };
const LBL = { x: X0, w: 300 };
const PH = { w: 390, h: 844, pair: 390 * 2 + GAP, per: 3, colGap: 44, lh: 844 + CAP + 40 };
PH.cellW = PAD * 2 + PH.per * PH.pair + (PH.per - 1) * PH.colGap; PH.x = LBL.x + LBL.w + GAP; PH.fx = PH.x + PAD;
const WB = { w: 1280, h: 800, outer: 1308, pair: 1308 * 2 + GAP, per: 2, colGap: 44, lh: 838 + CAP + 40 };
WB.cellW = PAD * 2 + WB.per * WB.pair + (WB.per - 1) * WB.colGap; WB.x = PH.x + PH.cellW + GAP; WB.fx = WB.x + PAD;
const BOARD_RIGHT = WB.x + WB.cellW;

const Device = ({ web, T, Scr }) => web ? <LaptopDevice width={1280} height={800} dark={T.dark}><Scr T={T} /></LaptopDevice> : <IOSDevice width={390} height={844} dark={T.dark}><Scr T={T} /></IOSDevice>;

/* Lazy frames without IntersectionObserver (which misbehaves under CSS zoom): the Canvas tracks the visible part of
   the stage in stage coordinates (scroll ÷ zoom), widened by ~one viewport on every side, and each frame compares its
   known rectangle against it. Mounted screens are memoised, so a scroll re-renders only the on/off decision. */
const LAZY = Q.get('lazy') !== '0';
const VisCtx = React.createContext(null);
const DeviceM = React.memo(Device);
const viewRect = () => { const z = window.__zoom || 1, w = innerWidth / z, h = innerHeight / z, mx = w * 0.75, my = h * 0.75; return { x0: scrollX / z - mx, y0: scrollY / z - my, x1: scrollX / z + w + mx, y1: scrollY / z + h + my }; };
function useVisibleRect() {
  const [v, setV] = React.useState(viewRect);
  React.useEffect(() => {
    let raf = 0; const on = () => { if (raf) return; raf = requestAnimationFrame(() => { raf = 0; setV(viewRect()); }); };
    addEventListener('scroll', on, { passive: true }); addEventListener('resize', on); addEventListener('sutra:view', on);
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on); removeEventListener('sutra:view', on); };
  }, []);
  return v;
}
function LazyFrame({ web, T, Scr, id, left, top, ox = 0 }) {
  const v = React.useContext(VisCtx);
  const w = web ? WB.outer : PH.w, h = web ? 838 : PH.h;
  const on = !LAZY || !v || (left + ox < v.x1 && left + ox + w > v.x0 && top < v.y1 && top + h > v.y0);
  return <div className="frame" id={id} style={{ left, top, width: w, height: h }}>{on ? <DeviceM web={web} T={T} Scr={Scr} /> : <div className="ph" style={{ width: w, height: h, borderRadius: web ? 18 : 54 }} />}</div>;
}

/* light + dark pair of one screen, with a big caption. entry = { name, Scr, idL, idD } */
function Pair({ web, entry, x, y, n, ox }) {
  const w = web ? WB.outer : PH.w;
  return <>
    <div className="capL" style={{ left: x, top: y - CAP, width: w * 2 + GAP }}><span className="num">{n}</span><span className="name">{entry.name}</span><span className="ld">{entry.idL} · light · dark</span></div>
    <LazyFrame web={web} T={FINAL} Scr={entry.Scr} id={entry.idL} left={x} top={y} ox={ox} />
    <LazyFrame web={web} T={FINALD} Scr={entry.Scr} id={entry.idD} left={x + w + GAP} top={y} ox={ox} />
  </>;
}
const resolveFinal = (web, idx) => { const [name, Scr] = (web ? WEB : FIN)[idx - 1]; const L = web ? 'w' : 'f'; return { name, Scr, idL: L + '-' + idx, idD: L + 'd-' + idx }; };
const resolveDraft = (web, e) => { const list = web ? ND_WEB : ND_PHONE; const i = list.indexOf(e) + 1; const L = web ? 'nw' : 'n'; return { name: e[0], Scr: e[1], idL: L + '-' + i, idD: L + 'd-' + i }; };
function layoutBoard(y0, defs, resolve) {
  let y = y0; const items = [];
  items.push({ type: 'head', y }); y += 70;
  defs.forEach(m => {
    items.push({ type: 'module', y, name: m.module, note: m.note }); y += 110;
    m.subs.forEach(s => {
      const pl = Math.ceil(s.phone.length / PH.per), wl = Math.ceil(s.web.length / WB.per);
      const h = PAD + CAP + Math.max(pl * PH.lh, wl * WB.lh, PH.lh) - 40 + PAD;
      items.push({ type: 'sub', y, h, name: s.name, flow: s.flow, module: m.module, np: s.phone.length, nw: s.web.length });
      const fy = y + PAD + CAP;
      s.phone.forEach((ref, i) => items.push({ type: 'pair', web: false, entry: resolve(false, ref), n: i + 1, x: PH.fx + (i % PH.per) * (PH.pair + PH.colGap), y: fy + Math.floor(i / PH.per) * PH.lh }));
      s.web.forEach((ref, i) => items.push({ type: 'pair', web: true, entry: resolve(true, ref), n: i + 1, x: WB.fx + (i % WB.per) * (WB.pair + WB.colGap), y: fy + Math.floor(i / WB.per) * WB.lh }));
      y += h + 24;
    });
    y += 40;
  });
  return { items, end: y };
}
function Table({ laid, ox = 0 }) {
  const cell = (x, w, y, h, extra) => <div className="cell" style={{ left: x, width: w, top: y, height: h, ...extra }} />;
  return <>{laid.items.map((it, k) => {
    if (it.type === 'head') return <React.Fragment key={k}><div className="th" style={{ left: LBL.x, width: LBL.w, top: it.y }}>Module › sub-menu</div><div className="th" style={{ left: PH.x, width: PH.cellW, top: it.y }}>Phone · 390 × 844 · light + dark</div><div className="th" style={{ left: WB.x, width: WB.cellW, top: it.y }}>Web · 1280 × 800 · light + dark</div></React.Fragment>;
    if (it.type === 'module') return <div key={k} className="module" style={{ top: it.y, width: BOARD_RIGHT - X0 }}><span className="badge new">{it.name[0]}</span>{it.name}<small>{it.note}</small></div>;
    if (it.type === 'sub') return <React.Fragment key={k}>
      {cell(LBL.x, LBL.w, it.y, it.h, { background: 'rgba(31,22,19,.05)' })}
      <div className="lbl" style={{ left: LBL.x, width: LBL.w, top: it.y, height: it.h }}><div className="lbl-mod">{it.module}</div><div className="lbl-sub">{it.name}</div><div className="lbl-flow">{it.flow}</div><div className="lbl-n">{it.np} phone · {it.nw} web</div></div>
      {cell(PH.x, PH.cellW, it.y, it.h)}
      {cell(WB.x, WB.cellW, it.y, it.h)}
    </React.Fragment>;
    return <Pair key={k} web={it.web} entry={it.entry} n={it.n} x={it.x} y={it.y} ox={ox} />;
  })}</>;
}

/* views: drafts (default when the module has drafts) · finals · compare (both tables side by side, same height).
   ?v=drafts|finals|compare. The archive of the old Catalogue explorations is its own page (drafts-archive.html). */
const VIEW = ['drafts', 'finals', 'compare'].includes(Q.get('v')) ? Q.get('v') : (NEW_DRAFTS.length ? 'drafts' : 'finals');
const TOP = 110, Y0 = TOP + 260, COMPARE_GAP = 400; /* TOP clears the fixed view bar */
const NEW_LAID = NEW_DRAFTS.length ? layoutBoard(Y0, NEW_DRAFTS, resolveDraft) : { items: [], end: Y0 + 260 };
const LAID = FINALS.length ? layoutBoard(Y0, FINALS, resolveFinal) : { items: [], end: Y0 + 260 };
const COUNTS = { np: ND_PHONE.length, nw: ND_WEB.length, fp: FINALS.reduce((a, m) => a + m.subs.reduce((b, s) => b + s.phone.length, 0), 0), fw: FINALS.reduce((a, m) => a + m.subs.reduce((b, s) => b + s.web.length, 0), 0) };
Object.assign(window, { ND_PHONE, ND_WEB, NEW_DRAFTS, FINALS, COUNTS, VIEW, __BOARD_FRAMES: (VIEW === 'finals' ? 0 : COUNTS.np + COUNTS.nw) * 2 + (VIEW === 'drafts' ? 0 : COUNTS.fp + COUNTS.fw) * 2 });

const W = BOARD_RIGHT - X0, COL_W = BOARD_RIGHT + 60;
const href = v => { const q = new URLSearchParams(location.search); q.set('v', v); return '?' + q.toString(); };
/* fixed bar: hub link · module · view switcher · archive in its own tab */
function ViewBar() {
  return <div id="views">
    <a className="lnk" href="index.html">← All modules</a>
    <span className="mod">{PAGE_TITLE}</span>
    <a className={'tab' + (VIEW === 'drafts' ? ' on' : '')} href={href('drafts')}>New drafts <small>{COUNTS.np + COUNTS.nw}</small></a>
    <a className={'tab' + (VIEW === 'finals' ? ' on' : '')} href={href('finals')}>Finals <small>{COUNTS.fp + COUNTS.fw}</small></a>
    <a className={'tab' + (VIEW === 'compare' ? ' on' : '')} href={href('compare')}>Compare</a>
    <a className="lnk" href="drafts-archive.html" target="_blank" rel="noopener">Old drafts ↗</a>
  </div>;
}
function DraftsCol({ ox = 0 }) {
  return <>
    <div className="section" style={{ top: TOP, width: W }}><div className="section-title">{PAGE_TITLE} · New drafts</div><div className="section-sub">Screens in planning, drawn in the final design language (light + dark, phone + web). A module moves to Finals once every screen is signed off. {COUNTS.np} phone · {COUNTS.nw} web.</div></div>
    {NEW_DRAFTS.length ? <Table laid={NEW_LAID} ox={ox} /> : <div className="empty" style={{ top: TOP + 200, left: X0, width: W }}>No draft screens registered for this page. A module registers from the end of its own mod-*.jsx via window.NEW_DRAFT_MODULES.push and one line in modules.js.</div>}
  </>;
}
function FinalsCol({ ox = 0 }) {
  return <>
    <div className="section" style={{ top: TOP, width: W }}><div className="section-title">{PAGE_TITLE} · Finals</div><div className="section-sub">The signed-off screens. Rows are modules and their sub-menus; columns are phone and web. Screens run in flow order, each as a light + dark pair. {COUNTS.fp} phone · {COUNTS.fw} web.</div></div>
    {FINALS.length ? <Table laid={LAID} ox={ox} /> : <div className="empty" style={{ top: TOP + 200, left: X0, width: W }}>Nothing signed off yet for this module. When the owner signs a module off, its screens are appended to FIN / WEB in finals.jsx and a BOARD entry with this module's id is added.</div>}
  </>;
}

function Canvas() {
  const only = Q.get('only');
  if (only) { const [rid, n] = only.split('-'); const r = ONLY[rid]; if (!r || !r.screens[(+n || 1) - 1]) return <div className="empty" style={{ left: 30, top: 30 }}>No frame {only} on this page. Ids here: {Object.keys(ONLY).join(' ')} · {ND_PHONE.length} draft phone · {ND_WEB.length} draft web · {FIN.length} final phone · {WEB.length} final web.</div>;
    const Scr = r.screens[(+n || 1) - 1][1]; const g = geo(r);
    if (Q.get('bare') != null) { /* no device frame: the screen fills the viewport */
      document.getElementById('stage').style.cssText = 'width:100vw;height:100dvh'; document.body.style.background = r.T.dark ? '#000' : r.T.bg; document.documentElement.style.overflow = 'hidden';
      return <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', paddingTop: 'env(safe-area-inset-top)' }}><Scr T={r.T} /></div>; }
    document.getElementById('stage').style.cssText = `width:${g.w + 80}px;height:${g.h + 90}px` + (Q.get('z') ? ';zoom:' + Q.get('z') : ''); document.body.style.background = r.T.dark ? '#0f0b09' : '#D9D0C5';
    return <div className="frame" style={{ left: 30, top: 30 }}><Device web={r.web} T={r.T} Scr={Scr} /></div>; }
  const vis = useVisibleRect();
  const cols = VIEW === 'compare' ? 2 : 1;
  const H = Math.max(VIEW === 'finals' ? 0 : NEW_LAID.end, VIEW === 'drafts' ? 0 : LAID.end) + 120;
  const SW = cols === 2 ? COL_W * 2 + COMPARE_GAP : COL_W;
  React.useEffect(() => { const st = document.getElementById('stage'); st.style.width = SW + 'px'; st.style.height = H + 'px'; window.__W = cols === 2 ? COL_W : SW; window.__H = H; window.__FIT = LBL.w + PH.cellW + 200; /* open zoomed to the phone column */ document.title = 'Sutra · ' + PAGE_TITLE + ' · ' + VIEW + (Q.has('t') ? ' · ' + Math.round(performance.now()) + 'ms' : ''); dispatchEvent(new Event('sutra:fit')); }, []);
  return <VisCtx.Provider value={vis}>
    <ViewBar />
    {VIEW === 'drafts' && <DraftsCol />}
    {VIEW === 'finals' && <FinalsCol />}
    {VIEW === 'compare' && <>
      <div className="col" style={{ left: 0 }}><DraftsCol /></div>
      <div className="vdiv" style={{ left: COL_W + COMPARE_GAP / 2, top: TOP, height: H - TOP - 60 }} />
      <div className="col" style={{ left: COL_W + COMPARE_GAP }}><FinalsCol ox={COL_W + COMPARE_GAP} /></div>
    </>}
  </VisCtx.Provider>;
}
ReactDOM.createRoot(document.getElementById('root')).render(<Canvas />);
