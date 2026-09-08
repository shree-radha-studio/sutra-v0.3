/* NEW DRAFTS · Top bar v2 (8 Sep 2026, revised the same day). A cleaner web header, read from a new user's seat, with
   the three navigation levels named and kept apart:
     menu         = the module, on the rail (Home, Catalogue, CRM, Production, Dispatch, Hub, Studio, Channels)
     sub-menu     = the module's sections, as text buttons beside the page head, starting at a fixed x on every screen
                    (Catalogue: Catalogue · Carts · Sale orders; Dispatch: Ready · Pending · Packing · Billed · Stock ·
                    Out of stock · Sale return)
     sub-sub-menu = the views inside a section, as underline tabs at the top of the page (Sale orders: Raised …
                    Returns · Analytics; Analytics: Orders · Designs · Customers; Pending: Pending approval · Pending
                    dispatch · After 1st dispatch · After due date). Ready has none.
   Header: screen path in small text above the head (head 10% larger), buttons vertically centred on the head, actions
   out of the row (scan and recognise inside the search field, Customer mode a switch, LIVE in the tab strip). Tabs
   name the object that is open (SO-3455 · Preeti Fashion Hub), not only the screen.
   Loads after mod-dispatch-web.jsx and borrows Dispatch bodies (QueueRail, CustomerCard, DC …). */

/* LEFT_W, SubMenu, ModeSwitch, Header3, ViewTabs, CAT_SEG, DISP_SEG and WebShell3 were approved and live in web.jsx now. */
/* 1 · Sale orders · Raised */
function WebSO3({ T }) {
  const o = ORDERS_F[0];
  const tabs = [{ icon: 'layout-grid', label: 'Catalogue' }, { icon: 'receipt-text', label: 'Sale orders · Raised', on: true }, { icon: 'file-text', label: 'SO-3455 · Preeti Fashion Hub' }];
  return <WebShell3 T={T} module="Catalogue" crumb={['Catalogue', 'Sale orders', 'Raised']} section="Sale orders" seg={CAT_SEG} active="Sale orders" mode="Customer mode" tabs={tabs} paneTitle={o.no} pane={<SOPane T={T} o={o} />}>
    <ViewTabs T={T} tabs={SO_TABS2} active="Raised" extra={[['Analytics', null, 'bar-chart-3']]} right={<span style={{ display: 'inline-flex', padding: 3, borderRadius: 999, background: T.bg2 }}>{[['layout-list', 'cards'], ['table-2', 'table']].map(([ic, v]) => <span key={v} className="press" style={{ width: 34, height: 26, borderRadius: 999, display: 'grid', placeItems: 'center', background: v === 'cards' ? T.surface : 'transparent', color: v === 'cards' ? T.ink : T.ink3 }}><Ic name={ic} size={15} /></span>)}</span>} />
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 24px 0' }}><T.Chip icon="search" outline>Order, customer, agent</T.Chip><T.Chip icon="calendar" x outline>This month</T.Chip><T.Chip icon="arrow-down-up" outline>Newest</T.Chip><span style={{ flex: 1 }} /><span style={{ fontSize: 12, color: T.ink3 }}>7 orders · ₹2,20,765</span><Hit T={T} icon="printer" size={34} iconSize={16} style={{ background: T.chipBg }} /><Hit T={T} icon="download" size={34} iconSize={16} style={{ background: T.chipBg }} /></div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 12, padding: '14px 24px' }}>{ORDERS_F.filter(x => x.status !== 'Cancelled').map((x, i) => <SOCard key={x.no} T={T} x={x} first={i === 0} />)}</div>
  </WebShell3>;
}
/* 2 · Sale order analytics · Orders (sub-sub-menu: Orders · Designs · Customers) */
function WebAnalytics3({ T }) {
  const tabs = [{ icon: 'layout-grid', label: 'Catalogue' }, { icon: 'receipt-text', label: 'Sale orders · Raised' }, { icon: 'bar-chart-3', label: 'Sale orders · Analytics · Orders', on: true }];
  return <WebShell3 T={T} module="Catalogue" crumb={['Catalogue', 'Sale orders', 'Analytics', 'Orders']} section="Sale orders" seg={CAT_SEG} active="Sale orders" mode="Customer mode" tabs={tabs} paneTitle="Range & filters" pane={<AnalyticsPane T={T} level="orders" />}>
    <ViewTabs T={T} back="Orders list" eyebrow="Analytics" tabs={[['Orders', null, 'receipt-text'], ['Designs', null, 'shirt'], ['Customers', null, 'users']]} active="Orders" right={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: T.ink3 }}><Ic name="calendar" size={13} />01/08/26 – 05/09/26 · vs prior period</span>} />
    <div style={{ display: 'flex', gap: 10, padding: '14px 24px 0' }}><T.Kpi label="Orders" value="46" sub="+18% vs prior" tone="ok" /><T.Kpi label="Pieces" value="312" sub="6.8 per order" /><T.Kpi label="Billed" value="₹14.2L" sub="avg ₹30.9k" /><T.Kpi label="Time to approve" value="2.1 d" sub="median" /><T.Kpi label="Cancelled" value="3" sub="6.5%" tone="danger" /></div>
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12, padding: '12px 24px 20px' }}>
      <WCard T={T} title="Orders vs dispatch · per day" right={<Legend T={T} items={[['orders', T.accent], ['dispatched', T.ok]]} />}><LineG T={T} series={[{ pts: A.days, color: T.accent, width: 2.2 }, { pts: A.disp, color: T.ok, width: 2, dash: true }]} w={520} h={120} area /></WCard>
      <WCard T={T} title="Pipeline" alt>{[['Raised', 9, T.warn], ['Approved', 14, T.blue], ['Dispatched', 23, T.ok], ['Cancelled', 3, T.ink3]].map(([s, n, c]) => <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', fontSize: 12.5 }}><span style={{ width: 78, color: T.ink2 }}>{s}</span><span style={{ flex: 1, height: 10, borderRadius: 5, background: T.chipBg }}><span style={{ display: 'block', width: Math.round(n / 23 * 100) + '%', height: 10, borderRadius: 5, background: c }} /></span><b style={{ width: 24, textAlign: 'right' }}>{n}</b></div>)}</WCard>
      <WCard T={T} title="By weekday"><BarsV T={T} data={A.week} w={520} h={70} color={A.week.map((v, i) => i === 4 ? T.accent : T.accentLine)} labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']} /></WCard>
      <WCard T={T} title="Top customers · bill">{[[XD.customers[5], 214000, 14], [XD.customers[0], 168000, 11], [XD.customers[3], 121000, 8]].map(([c, v, n], i) => <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', fontSize: 12 }}><span style={{ width: 16, color: T.ink3 }}>{i + 1}</span><span style={{ flex: 1, minWidth: 0 }}><div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</div><div style={{ height: 4, borderRadius: 2, background: T.chipBg, marginTop: 4 }}><span style={{ display: 'block', width: Math.round(v / 214000 * 100) + '%', height: 4, borderRadius: 2, background: T.accent }} /></div></span><b style={{ fontVariantNumeric: 'tabular-nums' }}>{money(v)}</b></div>)}</WCard>
    </div>
  </WebShell3>;
}

/* ── Dispatch · Ready and Pending ──
   Ready = fresh orders, "In stock" filter on by default (a toggle on the bar). Its right pane is either the whole
   pending book as a journey (default) or the order picked on the board, with an "All pending" way back.
   Pending = its own sub-menu: every open order in four situations (sub-sub-menu), grid or list, order pane. */
const STAGES = ['Pending approval', 'Pending dispatch', 'After 1st dispatch', 'After due date'];
const PEND = [
  ['SO-2607', 5, 0, 17, 9, 'After 1st dispatch', 'T Nagar silk counter'], ['SO-2608', 5, 0, 7, 0, 'After due date', null], ['SO-2613', 0, 0, 9, 0, 'After due date', 'Chaura Bazaar trial'], ['SO-2620', 1, 0, 3, 0, 'After due date', 'New design trial'],
  ['SO-3034', 2, 0, 12, 0, 'Pending dispatch', null], ['SO-3033', 3, 0, 9, 4, 'After 1st dispatch', 'Ready demo order'], ['SO-3036', 4, 0, 8, 0, 'Pending approval', null], ['SO-3455', 0, 0, 5, 0, 'Pending approval', null], ['SO-3448', 0, 0, 4, 0, 'Pending dispatch', null], ['SO-3451', 3, 0, 9, 0, 'Pending dispatch', null], ['SO-3433', 5, 0, 12, 6, 'After 1st dispatch', null], ['SO-3401', 2, 0, 4, 0, 'Pending dispatch', null],
].map(([no, ci, , pcs, disp, stage, note]) => { const c = DC[ci]; const o = (c.orders || []).find(x => x.no === no); const due = o ? o.due : (stage === 'After due date' ? -9 : 25 - (pcs % 7) * 3); return { no, c, date: o ? o.date : '0' + (1 + (pcs % 9)) + '/09/26', due, pcs, disp, stage, note: note || (o && o.note) || null, bill: pcs * 4995 }; });
const STAGE_N = STAGES.map(s => [s, PEND.filter(p => p.stage === s).length + (s === 'After due date' ? 12 : s === 'Pending dispatch' ? 8 : s === 'After 1st dispatch' ? 6 : 3)]);
/* journey track: raised → approved → 1st dispatch → done, a due tick that turns red once passed */
function Journey({ T, p, w = 120 }) {
  const step = p.stage === 'Pending approval' ? 0 : p.stage === 'Pending dispatch' ? 1 : 2; const late = p.due < 0;
  const dots = ['Raised', 'Approved', '1st dispatch', 'Done'];
  return <span title={p.stage} style={{ display: 'inline-flex', alignItems: 'center', width: w, flex: 'none', position: 'relative', height: 14 }}>
    {dots.map((d, i) => <React.Fragment key={d}>{i > 0 && <span style={{ flex: 1, height: 2, background: i <= step ? (late ? T.danger : T.ink2) : T.line2 }} />}<span style={{ width: i === step ? 10 : 7, height: i === step ? 10 : 7, borderRadius: 5, background: i < step ? (late ? T.danger : T.ink2) : i === step ? T.surface : T.surface, border: `2px solid ${i <= step ? (late ? T.danger : T.ink2) : T.line2}`, boxSizing: 'border-box', flex: 'none' }} /></React.Fragment>)}
    {late && <span style={{ position: 'absolute', right: -2, top: -2, width: 6, height: 6, borderRadius: 3, background: T.danger, boxShadow: `0 0 0 2px ${T.danger}33` }} />}
  </span>;
}
const StagePill = ({ T, s }) => <Pill T={T} small tone={s === 'After due date' ? 'danger' : s === 'After 1st dispatch' ? 'blue' : s === 'Pending approval' ? 'warn' : 'muted'} fill={s === 'After due date'}>{s}</Pill>;
/* Ready pane A: the whole pending book as a journey, by customer and situation */
function PendingJourneyPane({ T }) {
  const byC = []; PEND.forEach(p => { let g = byC.find(x => x.c === p.c); if (!g) byC.push(g = { c: p.c, os: [] }); g.os.push(p); });
  return <div style={{ padding: '8px 10px', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><T.Chip icon="search" outline style={{ height: 28, flex: 1 }}>Customer or order</T.Chip><IconBtn T={T} icon="arrow-down-up" /></div>
    <div style={{ display: 'flex', gap: 4, marginTop: 8, overflow: 'hidden' }}>{['All', 'Approval', 'Dispatch', 'After 1st', 'After due'].map((s, i) => <T.Chip key={s} on={i === 0} outline={i !== 0} style={{ height: 24, fontSize: 10.5, padding: '0 8px' }}>{s}</T.Chip>)}</div>
    <Meta T={T} style={{ display: 'block', margin: '8px 6px 4px' }}>42 orders · 7 customers · journey per order · ₹ for manager roles</Meta>
    <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>{byC.slice(0, 5).map(g => <div key={g.c.id} style={{ borderTop: `1px solid ${T.line}`, padding: '8px 4px 6px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 15, fontWeight: 600, color: T.ink, flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{g.c.name}</span><DuePill T={T} d={Math.min(...g.os.map(o => o.due))} /><Meta T={T}>{g.os.length} orders · {g.os.reduce((s, o) => s + o.pcs, 0)} pcs</Meta></div>
      {g.os.map(p => <div key={p.no} style={{ display: 'flex', alignItems: 'center', gap: 8, height: 30 }}><Mono T={T} size={11.5}>{p.no}</Mono><Journey T={T} p={p} w={96} /><span style={{ flex: 1 }} /><Meta T={T}>{p.disp ? `${p.disp}/${p.pcs} sent` : `${p.pcs} pcs`}</Meta><span style={{ fontFamily: T.fontSerif, fontSize: 13, fontWeight: 600, color: T.ink, fontVariantNumeric: 'tabular-nums', width: 62, textAlign: 'right' }}>{money(p.bill)}</span></div>)}
    </div>)}</div>
  </div>;
}
/* Ready pane B: the order picked on the board, with a way back to the whole book */
function OrderPane({ T, p, moneyOn, back = 'All pending' }) {
  const c = p.c; const o = (c.orders || [])[0] || { lines: [['2798', 'Sky', 3, true]] };
  return <div style={{ padding: '8px 12px', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, height: 28, padding: '0 10px 0 6px', borderRadius: 999, background: T.chipBg, fontFamily: T.fontUI, fontSize: 12, color: T.ink2 }}><Ic name="arrow-left" size={13} />{back}</span><span style={{ flex: 1 }} /><StagePill T={T} s={p.stage} /></div>
    <div style={{ marginTop: 10, fontFamily: T.fontDisplay, fontSize: 20, fontWeight: 600, color: T.ink, lineHeight: 1.1 }}>{c.name}</div>
    <Meta T={T} style={{ display: 'block', marginTop: 3 }}>{c.market ? c.market + ' · ' : ''}{c.city} · {c.tier} · score {c.score}</Meta>
    <div style={{ display: 'flex', gap: 5, marginTop: 8, overflow: 'hidden' }}><CallChip T={T}>{c.phone}</CallChip><CallChip T={T} icon="truck">{c.transport}</CallChip><CallChip T={T} icon="user">{c.broker}</CallChip></div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 12 }}><Mono T={T}>{p.no}</Mono><Meta T={T}>{p.date}</Meta><DuePill T={T} d={p.due} /><span style={{ flex: 1 }} /><PDisc p={c.priority} /></div>
    <div style={{ marginTop: 6 }}><Journey T={T} p={p} w={200} /><Meta T={T} style={{ display: 'block', marginTop: 4 }}>{p.disp ? `${p.disp} of ${p.pcs} pcs dispatched on 02/09/26` : 'nothing dispatched yet'} · due day 25</Meta></div>
    {p.note && <div style={{ marginTop: 8, padding: '5px 9px', borderRadius: 9, background: T.chipBg, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2, fontStyle: 'italic' }}>Note · {p.note}</div>}
    <div style={{ marginTop: 10, borderRadius: 14, background: T.surface2, border: `1px solid ${T.line}`, overflow: 'hidden' }}>{o.lines.map((l, i) => { const d = XD.byCode[l[0]] || { code: l[0], colours: [] }; return <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '7px 10px', borderTop: i ? `1px solid ${T.line}` : 0 }}><Thumb T={T} d={d} w={30} h={38} r={7} /><span style={{ fontFamily: T.fontDisplay, fontSize: 16, fontWeight: 600, color: T.ink, width: 56 }}>{l[0]}</span><Dot n={l[1]} /><span style={{ flex: 1, fontFamily: T.fontUI, fontSize: 12, color: T.ink2 }}>{l[1]}</span><Mono T={T} size={12}>× {l[2]}</Mono>{l[3] ? <Ic name="circle-check" size={15} color={T.ok} /> : <Ic name="circle-x" size={15} color={T.danger} />}</div>; })}</div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}><span><Num T={T} size={20}>{p.pcs}</Num><Meta T={T} style={{ marginLeft: 5 }}>pcs · {o.lines.filter(l => l[3]).reduce((s, l) => s + l[2], 0)} in stock</Meta></span><span style={{ flex: 1 }} />{moneyOn && <span style={{ fontFamily: T.fontSerif, fontSize: 18, fontWeight: 600, color: T.ink }}>{money(p.bill)}</span>}</div>
    <span style={{ flex: 1 }} />
    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}><Hit T={T} icon="printer" size={34} iconSize={15} style={{ background: T.chipBg }} /><Hit T={T} icon="message-circle" size={34} iconSize={15} style={{ background: T.chipBg }} /><span style={{ flex: 1 }} /><T.Btn small icon="chevron-right" style={{ height: 36, letterSpacing: '.06em' }}>PACK</T.Btn></div>
  </div>;
}
/* the queue rail folded to a strip so the board keeps two full cards beside the pane */
const QueueRailMini = ({ T }) => <div style={{ width: 44, flex: 'none', borderRight: `1px solid ${T.line}`, background: T.surface, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 12, gap: 10 }}><span className="press" style={{ width: 28, height: 28, borderRadius: 8, background: T.chipBg, display: 'grid', placeItems: 'center', color: T.ink2 }}><Ic name="sliders-horizontal" size={14} /></span><span style={{ writingMode: 'vertical-rl', fontFamily: T.fontUI, fontSize: 11, color: T.ink3, letterSpacing: '.08em' }}>Queue · due days · in stock only</span><span style={{ width: 18, height: 18, borderRadius: 9, background: T.accent, color: T.onAccent, fontSize: 10, fontWeight: 600, display: 'grid', placeItems: 'center', fontFamily: T.fontUI }}>2</span></div>;
const D_TABS3 = (on, extra) => [{ icon: 'layout-grid', label: 'Catalogue' }, { icon: 'package', label: on, on: true }, ...(extra || [{ icon: 'file-text', label: 'SI-2288 · Ambika Enterprises' }])];
function ReadyBar({ T, stockOn = true }) {
  return <Bar T={T} right={<div style={{ display: 'flex', gap: 6, alignItems: 'center' }}><Meta T={T}>updated just now</Meta><IconBtn T={T} icon="refresh-cw" /></div>}>
    <T.Chip icon="search" outline style={{ height: 32, width: 220 }}>Customer or design no</T.Chip>
    <T.Chip icon={stockOn ? 'check' : 'circle'} on={stockOn} outline={!stockOn} style={{ height: 32 }}>In stock</T.Chip>
    <Meta T={T} style={{ marginLeft: 6 }}>{stockOn ? '6 customers · 71 pcs packable now · no rates on this board' : '14 customers · everything fresh'}</Meta>
  </Bar>;
}
/* 3 · Ready · in-stock on · pane = the pending book as a journey */
function WebDReady3({ T }) {
  return <WebShell3 T={T} module="Dispatch" crumb={['Dispatch', 'Ready orders']} section="Ready orders" seg={DISP_SEG} active="Ready" tabs={D_TABS3('Dispatch · Ready')} stripRight={<LiveChip T={T} />} paneTitle="All pending · 42" paneWidth={310} pane={<PendingJourneyPane T={T} />}>
    <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>
      <QueueRailMini T={T} />
      <Main><ReadyBar T={T} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}><CustomerCard T={T} c={DC[2]} /><CustomerCard T={T} c={DC[0]} /><CustomerCard T={T} c={DC[3]} /><CustomerCard T={T} c={DC[1]} planned /></div>
      </Main>
    </div>
  </WebShell3>;
}
/* 4 · Ready · a card picked → pane shows that order, "All pending" goes back */
function WebDReadySel({ T }) {
  const p = PEND.find(x => x.no === 'SO-3033');
  return <WebShell3 T={T} module="Dispatch" crumb={['Dispatch', 'Ready orders', 'SO-3033']} section="Ready orders" seg={DISP_SEG} active="Ready" tabs={D_TABS3('Dispatch · Ready', [{ icon: 'file-text', label: 'SO-3033 · A V Creation' }])} stripRight={<LiveChip T={T} />} paneTitle="SO-3033" paneWidth={310} pane={<OrderPane T={T} p={p} />}>
    <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>
      <QueueRailMini T={T} />
      <Main><ReadyBar T={T} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}><CustomerCard T={T} c={DC[2]} /><CustomerCard T={T} c={DC[3]} style={{ boxShadow: `0 0 0 2px ${T.accent}, 0 10px 24px -18px rgba(36,23,18,.35)` }} /><CustomerCard T={T} c={DC[0]} /><CustomerCard T={T} c={DC[1]} planned /></div>
      </Main>
    </div>
  </WebShell3>;
}
/* 5 · Pending · sub-sub-menu of four situations · grid of orders · order pane */
const PendCard = ({ T, p, on }) => <div className="press" style={{ padding: '11px 13px', borderRadius: 18, background: T.surface, border: `1px solid ${on ? T.accentLine : T.line}`, boxShadow: on ? `0 0 0 2px ${T.accentSoft}` : 'none', minWidth: 0 }}>
  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}><Mono T={T}>{p.no}</Mono><Meta T={T}>{p.date}</Meta><span style={{ flex: 1 }} /><DuePill T={T} d={p.due} /><PDisc p={p.c.priority} s={16} /></div>
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 18, fontWeight: 600, color: T.ink, flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.c.name}</span><span style={{ fontFamily: T.fontSerif, fontSize: 16, fontWeight: 600, color: T.ink }}>{money(p.bill)}</span></div>
  <Meta T={T} style={{ display: 'block', marginTop: 2 }}>{p.c.city} · {p.c.tier} · {p.pcs} pcs{p.disp ? ` · ${p.disp} dispatched` : ''}</Meta>
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}><Journey T={T} p={p} w={130} /><span style={{ flex: 1 }} /><CallChip T={T} icon="user">{p.c.broker}</CallChip></div>
</div>;
function PendBar({ T, view }) {
  return <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 24px 0' }}><T.Chip icon="search" outline>Order, customer, agent</T.Chip><T.Chip icon="arrow-down-up" outline>Due soonest</T.Chip><T.Chip icon="sliders-horizontal" outline>Filters</T.Chip><T.Chip x outline>Platinum</T.Chip><span style={{ flex: 1 }} /><Meta T={T}>20 orders · 176 pcs · ₹8,79,120</Meta><span style={{ display: 'inline-flex', padding: 3, borderRadius: 999, background: T.bg2, marginLeft: 6 }}>{[['layout-grid', 'grid'], ['table-2', 'list']].map(([ic, v]) => <span key={v} className="press" style={{ width: 34, height: 26, borderRadius: 999, display: 'grid', placeItems: 'center', background: v === view ? T.surface : 'transparent', color: v === view ? T.ink : T.ink3 }}><Ic name={ic} size={15} /></span>)}</span></div>;
}
function WebDPendingGrid({ T }) {
  const list = PEND.filter(p => p.stage !== 'Pending approval'); const p = PEND.find(x => x.no === 'SO-3034');
  return <WebShell3 T={T} module="Dispatch" crumb={['Dispatch', 'Pending orders', 'Pending dispatch']} section="Pending orders" seg={DISP_SEG} active="Pending" tabs={D_TABS3('Dispatch · Pending', [{ icon: 'file-text', label: 'SO-3034 · Ambika Enterprises' }])} stripRight={<LiveChip T={T} />} paneTitle="SO-3034" paneWidth={310} pane={<OrderPane T={T} p={p} moneyOn back="Pending list" />}>
    <ViewTabs T={T} tabs={STAGE_N} active="Pending dispatch" right={<Meta T={T}>due day 25 by default · an order can sit in two situations</Meta>} />
    <PendBar T={T} view="grid" />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 10, padding: '12px 24px' }}>{list.slice(0, 9).map(x => <PendCard key={x.no} T={T} p={x} on={x.no === 'SO-3034'} />)}</div>
  </WebShell3>;
}
const PEND_COLS = [['Order', 88, p => p.no, 'mono'], ['Customer', 150, p => p.c.name], ['Date', 78, p => p.date], ['Due', 92, p => (p.due < 0 ? `${-p.due} d late` : `${p.due} d left`)], ['Pcs', 50, p => p.pcs, 'num'], ['Dispatched', 88, p => p.disp ? `${p.disp} / ${p.pcs}` : '—', 'num'], ['Journey', 150, p => <Journey T={FINAL} p={p} w={120} />, 'node'], ['Situation', 150, p => p.stage], ['Bill', 90, p => money(p.bill), 'num'], ['Transport', 120, p => p.c.transport], ['Agent', 110, p => p.c.broker]];
function WebDPendingList({ T }) {
  const p = PEND.find(x => x.no === 'SO-3034');
  const cols = PEND_COLS.map(c => c[3] === 'node' ? [c[0], c[1], x => <Journey T={T} p={x} w={120} />, 'node'] : c);
  return <WebShell3 T={T} module="Dispatch" crumb={['Dispatch', 'Pending orders', 'Pending dispatch', 'List']} section="Pending orders" seg={DISP_SEG} active="Pending" tabs={D_TABS3('Dispatch · Pending', [{ icon: 'file-text', label: 'SO-3034 · Ambika Enterprises' }])} stripRight={<LiveChip T={T} />} paneTitle="SO-3034" paneWidth={310} pane={<OrderPane T={T} p={p} moneyOn back="Pending list" />}>
    <ViewTabs T={T} tabs={STAGE_N} active="Pending dispatch" right={<Meta T={T}>due day 25 by default</Meta>} />
    <PendBar T={T} view="list" />
    <div style={{ padding: '12px 24px 20px', flex: 1, minHeight: 0, boxSizing: 'border-box' }}><SOTable2 T={T} rows={PEND.filter(x => x.stage !== 'Pending approval')} cols={cols} height="100%" /></div>
  </WebShell3>;
}
Object.assign(window, { WebSO3, WebAnalytics3, PEND, STAGES, Journey, StagePill, PendingJourneyPane, OrderPane, WebDReady3, WebDReadySel, WebDPendingGrid, WebDPendingList });
