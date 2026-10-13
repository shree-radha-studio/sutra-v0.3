/* NEW DRAFTS · Dispatch · Ready in the airy Desk density (13 Oct 2026, review 2 · provisional, pending decision 5).
   The exemplar that answers the owner's "crowded" at its source: the structured Ready (nw-24 and its phone twin) redrawn
   ruled and boxed WITH AIR, on the shared chrome. Phone: frameF + the shared Dispatch module header (DHeader: lockup,
   role, LIVE, menu, search island, sub-menu scroller) + the dock. Web: WebShell3 + DISP_SEG + D_TABS3 + LIVE, pane 310.
   Two control rows, six columns, 44+ px rows, status as words, photo beside every design number, no money (packer).
   The one maroon line in content is the primary action (Start packing / Pack next). Prefix Dd. */

const ddDate = d => { const b = new Date(2026, 8, 8 + d); const p = n => String(n).padStart(2, '0'); return `${p(b.getDate())}/${p(b.getMonth() + 1)}`; };
const DdUp = (T, extra) => ({ fontFamily: T.fontUI, fontSize: 11, letterSpacing: '.07em', textTransform: 'uppercase', color: T.ink3, whiteSpace: 'nowrap', ...extra });
const DdTag = ({ T, tone, h = 22, children }) => { const c = tone === 'danger' ? T.danger : tone === 'warn' ? T.warn : T.ink2; return <span style={{ display: 'inline-flex', alignItems: 'center', height: h, padding: '0 7px', borderRadius: 3, border: `1px solid ${tone ? c : T.line2}`, color: c, fontFamily: T.fontUI, fontSize: 10, fontWeight: 600, letterSpacing: '.07em', textTransform: 'uppercase', whiteSpace: 'nowrap', flex: 'none' }}>{children}</span>; };
const DdBtn = ({ T, icon, children, fill, h = 40, style }) => <span className="press" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, height: h, padding: '0 16px', borderRadius: 3, border: `1px solid ${fill ? T.accent : T.ink}`, background: fill ? T.accent : 'transparent', color: fill ? T.onAccent : T.ink, fontFamily: T.fontUI, fontSize: 13.5, fontWeight: fill ? 600 : 500, whiteSpace: 'nowrap', boxSizing: 'border-box', ...style }}>{icon && <Ic name={icon} size={16} />}{children}</span>;
const DdDesign = ({ T, code, colour, w = 28, h = 35, size = 16 }) => <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, flex: 'none' }}><Thumb T={T} d={dOf(code, colour)} w={w} h={h} r={3} /><span style={{ fontFamily: T.fontDisplay, fontSize: size, fontWeight: 600, color: T.ink, fontVariantNumeric: 'tabular-nums' }}>{code}</span></span>;
/* a customer's ready book: due first, then priority */
const DD_READY = [DC[2], DC[0], DC[1], DC[3], DC[4], DC[5]].map(c => { const due = Math.min(...c.orders.map(o => o.due)); const pcs = dpcs(c), pk = dpack(c); return { c, due, pcs, pk, lines: c.orders.flatMap(o => o.lines), sos: c.orders.map(o => o.no) }; }).sort((a, b) => a.due - b.due);
const ddState = r => r.due < 0 ? ['Overdue', 'danger'] : r.pk < r.pcs ? ['Partial', 'warn'] : ['Ready', null];

/* ── web ──────────────────────────────────────────────────────────────────────────────────────────────────────────── */
const DD_COLS = [['Customer', null], ['Order', 88], ['Designs', 120], ['Pcs · packable', 96, true], ['Due', 84, true], ['Status', 96]];
function DdPane({ T, r }) {
  const o = r.c.orders[0];
  return <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
    <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', padding: '16px 18px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><DdTag T={T}>P{r.c.priority}</DdTag><Mono T={T}>{o.no}</Mono><span style={{ flex: 1 }} /><span style={{ fontSize: 12, color: T.ink3 }}>due {ddDate(r.due)}</span></div>
      <div style={{ fontFamily: T.fontDisplay, fontSize: 21, fontWeight: 600, color: T.ink, marginTop: 10 }}>{r.c.name}</div>
      <div style={{ fontSize: 12, color: T.ink3, marginTop: 2 }}>{r.c.city} · {r.c.transport}</div>
      <div style={{ display: 'flex', alignItems: 'center', height: 30, marginTop: 16, borderBottom: `1px solid ${T.line}`, ...DdUp(T) }}><span style={{ flex: 1 }}>Design · colour</span><span style={{ width: 36, textAlign: 'right' }}>Qty</span><span style={{ width: 78, textAlign: 'right' }}>Stock</span></div>
      {o.lines.map((l, i) => <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, height: 56, borderBottom: `1px solid ${T.line}` }}><DdDesign T={T} code={l[0]} colour={l[1]} w={32} h={40} /><span style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: T.ink2 }}><span style={{ width: 3, height: 12, borderRadius: 1, background: XD.cols[l[1]] }} />{l[1]}</span><span style={{ width: 36, textAlign: 'right', fontSize: 13.5, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{l[2]}</span><span style={{ width: 78, display: 'flex', justifyContent: 'flex-end' }}>{l[3] ? <DdTag T={T}>In stock</DdTag> : <DdTag T={T} tone="danger">Short</DdTag>}</span></div>)}
      <div style={{ display: 'flex', alignItems: 'baseline', height: 44, paddingTop: 12, fontSize: 12.5, color: T.ink2 }}><span style={{ flex: 1 }}>{o.lines.length} lines · all in stock</span><b style={{ color: T.ink, fontVariantNumeric: 'tabular-nums' }}>{r.pk} pcs</b></div>
    </div>
    <div style={{ padding: '12px 18px 16px', borderTop: `1px solid ${T.line}` }}><DdBtn T={T} fill icon="package" style={{ width: '100%' }}>Start packing</DdBtn></div>
  </div>;
}
function WebDdReady({ T }) {
  const sel = DD_READY.find(r => r.c.id === 'c3');
  const cell = (w, right, extra) => ({ width: w || undefined, flex: w ? 'none' : 1, minWidth: 0, textAlign: right ? 'right' : 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', ...extra });
  const pcs = DD_READY.reduce((s, r) => s + r.pk, 0);
  return <WebShell3 T={T} module="Dispatch" crumb={['Dispatch', 'Ready orders']} section="Ready orders" seg={DISP_SEG} active="Ready" tabs={D_TABS3('Dispatch · Ready')} stripRight={<LiveChip T={T} />} paneTitle={sel.c.name.split(' ')[0] + ' · ready'} paneWidth={310} pane={<DdPane T={T} r={sel} />}>
    <ViewTabs T={T} tabs={[['All', 6], ['Overdue', 2], ['Due ≤ 2 d', 0], ['Partial', 2]]} active="All" />
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 24px 0' }}><T.Chip icon="search" outline>Customer, order, design</T.Chip><T.Chip icon="sliders-horizontal" outline>Filters</T.Chip><T.Chip icon="arrow-down-up" outline>Due · oldest first</T.Chip><T.Chip on x>In-stock only</T.Chip><span style={{ flex: 1 }} /><span style={{ fontSize: 12, color: T.ink3 }}>{DD_READY.length} customers · {pcs} pcs packable</span></div>
    <div style={{ padding: '16px 24px 20px', minHeight: 0, overflow: 'hidden' }}>
      <div style={{ borderRadius: 4, border: `1px solid ${T.line2}`, background: T.surface, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, height: 38, padding: '0 20px', background: T.surface2, borderBottom: `1px solid ${T.line2}` }}>{DD_COLS.map(([l, w, r]) => <span key={l} style={{ ...cell(w, r), ...DdUp(T) }}>{l}</span>)}</div>
        {DD_READY.map(r => { const on = r === sel; const [st, tone] = ddState(r); const codes = [...new Set(r.lines.map(l => l[0]))]; return <div key={r.c.id} className="press" style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 20, height: 60, padding: '0 20px', borderBottom: `1px solid ${T.line}`, background: on ? T.bg2 : 'transparent', fontFamily: T.fontUI, fontSize: 13.5, color: T.ink2 }}>
          {on && <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2, background: T.ink }} />}
          <span style={{ ...cell(null), display: 'flex', alignItems: 'center', gap: 10 }}><DdTag T={T}>P{r.c.priority}</DdTag><span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}><span style={{ color: T.ink, fontWeight: 600 }}>{r.c.name}</span></span></span>
          <span style={cell(88, false, { fontFamily: T.fontMono, fontSize: 12.5, fontWeight: 600, color: T.ink })}>{r.sos[0]}{r.sos.length > 1 && <span style={{ fontFamily: T.fontUI, fontWeight: 400, color: T.ink3 }}> +{r.sos.length - 1}</span>}</span>
          <span style={{ ...cell(120), display: 'flex', alignItems: 'center', gap: 8 }}><DdDesign T={T} code={codes[0]} size={15} />{codes.length > 1 && <span style={{ fontSize: 12, color: T.ink3 }}>+{codes.length - 1}</span>}</span>
          <span style={cell(96, true, { fontVariantNumeric: 'tabular-nums', color: T.ink })}><b>{r.pk}</b><span style={{ color: T.ink3 }}> / {r.pcs}</span></span>
          <span style={cell(84, true, { fontVariantNumeric: 'tabular-nums', color: r.due < 0 ? T.danger : T.ink2 })}>{r.due < 0 ? `${-r.due} d over` : ddDate(r.due)}</span>
          <span style={cell(96)}><DdTag T={T} tone={tone}>{st}</DdTag></span>
        </div>; })}
        <div style={{ display: 'flex', alignItems: 'center', height: 44, padding: '0 20px', background: T.surface2, fontSize: 12, color: T.ink3 }}>Oldest due first · in-stock lines only · tap a row to see its lines</div>
      </div>
    </div>
  </WebShell3>;
}

/* ── phone · packer: shared module header, one toolbar row, boxes with air, Pack next ─────────────────────────────── */
function DdBox({ T, r, open }) {
  const [st, tone] = ddState(r); const o = r.c.orders[0];
  return <div style={{ borderRadius: 4, border: `1px solid ${open ? T.ink : T.line2}`, background: T.surface }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 52, padding: '0 16px', borderBottom: open ? `1px solid ${T.line}` : 'none' }}><DdTag T={T} h={24}>P{r.c.priority}</DdTag><span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontUI, fontSize: 15, fontWeight: 600, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.c.name}</div><div style={{ fontSize: 12, color: T.ink3 }}>{r.c.city} · {r.pk} of {r.pcs} pcs · {r.due < 0 ? `${-r.due} d over` : `due ${ddDate(r.due)}`}</div></span><DdTag T={T} tone={tone} h={24}>{st}</DdTag></div>
    {open && <>{o.lines.map((l, i) => <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, height: 60, padding: '0 16px', borderBottom: `1px solid ${T.line}` }}><DdDesign T={T} code={l[0]} colour={l[1]} w={36} h={45} size={17} /><span style={{ flex: 1, minWidth: 0, fontSize: 13, color: T.ink2 }}>{l[1]}</span><span style={{ fontFamily: T.fontUI, fontSize: 15, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>× {l[2]}</span><DdTag T={T} h={24}>In stock</DdTag></div>)}
      <div style={{ display: 'flex', alignItems: 'center', height: 44, padding: '0 16px', fontSize: 12.5, color: T.ink2 }}><Mono T={T}>{o.no}</Mono><span style={{ flex: 1 }} />{r.c.transport}</div></>}
  </div>;
}
function ScreenDdReady({ T }) {
  const pcs = DD_READY.reduce((s, r) => s + r.pk, 0); const first = DD_READY.find(r => r.c.id === 'c3');
  return frameF(T, <><DHeader T={T} node="Ready" /><div style={{ flex: 1, minHeight: 0, overflow: 'hidden', padding: '12px 16px 170px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}><span style={{ fontSize: 12.5, color: T.ink2, fontVariantNumeric: 'tabular-nums' }}>{DD_READY.length} customers · {pcs} pcs</span><span style={{ flex: 1 }} /><T.Chip icon="arrow-down-up" outline style={{ height: 30 }}>Due first</T.Chip><T.Chip icon="sliders-horizontal" outline style={{ height: 30 }}>Filters</T.Chip></div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}><DdBox T={T} r={first} open />{DD_READY.filter(r => r !== first).slice(0, 2).map(r => <DdBox key={r.c.id} T={T} r={r} />)}</div>
  </div><div style={{ position: 'absolute', left: 16, right: 16, bottom: 100 }}><DdBtn T={T} fill icon="package" h={52} style={{ width: '100%' }}>Pack · {first.c.name} · {first.pk} pcs</DdBtn></div></>, dock(T));
}

Object.assign(window, { ddDate, DdUp, DdTag, DdBtn, DdDesign, DD_READY, ddState, DD_COLS, DdPane, WebDdReady, DdBox, ScreenDdReady });

(window.NEW_DRAFT_MODULES = window.NEW_DRAFT_MODULES || []).push({ module: 'Dispatch · Desk exemplar', note: 'Ready in the airy Desk density on the shared chrome, for compare with the structured Ready (review 2, 13 Oct) · provisional, pending decision 5', subs: [
  { name: 'Ready · Desk with air', flow: 'phone: shared header → boxes → Pack next · web: two control rows → six columns → pane 310', phone: [['Ready · packer, shared header, boxes with air, Pack next · provisional, pending decision 5', ScreenDdReady]], web: [['Ready · six columns, 60 px rows, pane 310, Start packing · provisional, pending decision 5', WebDdReady]] },
] });
