/* NEW DRAFTS · app shell and sale-orders revisions (8 Sep 2026). The tab strip, search field, rail, sidebar and greeting
   were approved and moved into web.jsx (finals); the header/sub-menu here (WebHeader2, SubBar) is the earlier draft kept
   for the Dispatch drafts built on it. WebShell2 now renders on the approved bar.
   Web chrome: a Chrome-style tab strip for open screens · header with path + page head on the left and the search
   field beside the orb on the right (no profile dropdown) · sub-menu hard buttons with floating sub-sub menus ·
   rail / sidebar with a larger mark, "RM · Hi Rohan!" in white and the firm's white logo where log-out was.
   Search: a right-side search pane dropping from the field (scope buttons, recents, habits → sectioned matches
   with its own filter & sort chooser). Sale orders: full-width table, grouped column chooser, Returns tab. */


/* ── 2. Header: path + page head on the left, search beside the orb on the right. ── */
function WebHeader2({ T, title, crumb = [], searchOn, query, right, voice, menu }) {
  return <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 56, padding: '0 14px 0 20px', borderBottom: `1px solid ${T.line}`, background: T.surface, flex: 'none', position: 'relative', zIndex: 5 }}>
    <span style={{ minWidth: 0, flex: 'none', marginRight: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 3, fontFamily: T.fontUI, fontSize: 10.5, color: T.ink3, whiteSpace: 'nowrap' }}>{crumb.map((c, i) => <React.Fragment key={i}>{i > 0 && <Ic name="chevron-right" size={9} color={T.ink3} />}<span className="press" style={{ color: i === crumb.length - 1 ? T.ink2 : T.ink3 }}>{c}</span></React.Fragment>)}</div>
      <div style={{ fontFamily: T.fontDisplay, fontSize: 21, fontWeight: 500, color: T.ink, lineHeight: 1.05, marginTop: 1, whiteSpace: 'nowrap' }}>{title}</div>
    </span>
    {menu}
    <span style={{ flex: 1 }} />
    {right}
    <Hit T={T} icon="bell" size={34} iconSize={16} /><CartIcon T={T} size={34} />
    <SearchField T={T} on={searchOn} query={query} width={216} />
    <span className="press" style={{ width: 38, height: 38, display: 'grid', placeItems: 'center' }}><Orb T={T} on={voice} size={32} /></span>
  </div>;
}
/* ── 3. Sub-menu hard buttons: the module's sub-menus as pills; those with sub-suites open a floating menu. ── */
const CAT_SUBS = [['layout-grid', 'Catalogue'], ['shopping-basket', 'Carts', 3], ['receipt-text', 'Sale orders', null, true], ['scan-line', 'Direct scan'], ['camera', 'Recognise by image'], ['user-round', 'Customer mode', null, false, 'toggle']];
function SubBar({ T, items = CAT_SUBS, active = 'Catalogue', open }) {
  return <div style={{ display: 'flex', alignItems: 'center', gap: 2, position: 'relative' }}>
    {items.map(([ic, l, n, menu, kind]) => { const on = l === active; const isOpen = open === l; return <span key={l} style={{ position: 'relative' }}>
      <span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, height: 34, padding: '0 11px', borderRadius: 10, background: on || isOpen ? T.chipBg : 'transparent', color: on ? T.ink : T.ink2, fontFamily: T.fontUI, fontSize: 13, fontWeight: on ? 600 : 400, whiteSpace: 'nowrap', letterSpacing: '.005em' }}>
        {kind === 'toggle' && <span style={{ width: 7, height: 7, borderRadius: 4, border: `1.5px solid ${T.ink3}`, marginRight: 2 }} />}{l}{n != null && <span style={{ fontSize: 11, color: T.ink3, fontVariantNumeric: 'tabular-nums' }}>{n}</span>}{menu && <Ic name="chevron-down" size={12} color={T.ink3} style={{ marginLeft: -1 }} />}
      </span>
      {isOpen && <SubMenuFloat T={T} groups={SO_FLOAT} />}
    </span>; })}
  </div>;
}
/* ── 5. The shell: rail · tab strip · header · sub-menu bar · main + collapsible right pane ── */
const SO_TABS_STRIP = [{ icon: 'layout-grid', label: 'Catalogue' }, { icon: 'receipt-text', label: 'Sale orders · Raised', on: true }, { icon: 'file-text', label: 'SO-3455 · Preeti Fashion Hub' }, { icon: 'bar-chart-3', label: 'Analytics · Orders' }];
function WebShell2({ T, title, crumb, tabs = SO_TABS_STRIP, active = 'Catalogue', sub = 'Catalogue', subOpen, children, pane, paneTitle, paneCollapsed, sidebar, voice, headerRight, searchOn, query, overlay }) {
  /* drafts now render on the approved top bar (WebShell3 in web.jsx); kept as a thin wrapper so the search, table and returns frames keep their props */
  return <WebShell3 T={T} module={active} crumb={crumb} section={title} seg={CAT_SEG} active={sub} subOpen={subOpen} mode="Customer mode" tabs={tabs} sidebar={sidebar} voice={voice} searchOn={searchOn} query={query} headerRight={headerRight} pane={pane} paneTitle={paneTitle} paneCollapsed={paneCollapsed} overlay={overlay}>{children}</WebShell3>;
}

/* ── 6. Sale orders in the new shell: tabs now include Returns ── */
const RETURNS_F = [
  { no: 'SO-3390', cn: 'CN-0112', c: XD.customers[1], date: '04/09/26', inv: 'SI-2288', pcs: 2, of: 7, amount: 9990, reason: 'Colour mismatch · Lilac', stock: 'on approval', status: 'Returns' },
  { no: 'SO-3372', cn: 'CN-0109', c: XD.customers[4], date: '30/08/26', inv: 'SI-2271', pcs: 1, of: 6, amount: 4995, reason: 'Damaged in transit', stock: 'in stock', status: 'Returns' },
];
const RET_LINES = [['6002', [['Lilac', 1], ['Blush', 1]]]].map(([code, cols]) => ({ d: XD.byCode[code], cols }));
function SOTabs2({ T, tab, size = 14, pad = 12 }) { return <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>{SO_TABS2.map(([t, n]) => <span key={t} className="press" style={{ position: 'relative', padding: `8px ${pad}px 10px`, fontFamily: T.fontUI, fontSize: size, fontWeight: t === tab ? 600 : 400, color: t === tab ? T.ink : T.ink3, whiteSpace: 'nowrap' }}>{t} <span style={{ fontSize: size - 2.5, color: T.ink3 }}>{n}</span>{t === tab && <span style={{ position: 'absolute', left: pad, right: pad, bottom: 0, height: 2, background: T.accent, borderRadius: 1 }} />}</span>)}</div>; }
function SOWebHead2({ T, tab = 'Raised', view = 'cards', grouping, columns }) {
  return <div style={{ padding: '10px 24px 0' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><SOTabs2 T={T} tab={tab} /><span style={{ flex: 1 }} /><span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 34, padding: '0 12px', borderRadius: 999, border: `1px solid ${T.line2}`, fontSize: 12.5, fontWeight: 500 }}><Ic name="bar-chart-3" size={15} />Analytics</span><span style={{ display: 'inline-flex', padding: 3, borderRadius: 999, background: T.bg2, marginLeft: 8 }}>{[['layout-list', 'cards'], ['table-2', 'table']].map(([ic, v]) => <span key={v} className="press" style={{ width: 34, height: 28, borderRadius: 999, display: 'grid', placeItems: 'center', background: v === view ? T.surface : 'transparent', color: v === view ? T.ink : T.ink3 }}><Ic name={ic} size={15} /></span>)}</span></div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10 }}><T.Chip icon="search" outline>Order, customer, agent</T.Chip><T.Chip icon="calendar" x outline>This month</T.Chip>{view === 'table' ? <><T.Chip icon="group" on={grouping} outline={!grouping}>Group by</T.Chip><T.Chip icon="columns-3" on={columns} outline={!columns}>Columns · 13 of 34</T.Chip></> : <T.Chip icon="arrow-down-up" outline>Newest</T.Chip>}<span style={{ flex: 1 }} /><Hit T={T} icon="printer" size={34} iconSize={16} style={{ background: T.chipBg }} /><Hit T={T} icon="download" size={34} iconSize={16} style={{ background: T.chipBg }} /></div>
  </div>;
}
const SOCard = ({ T, x, i, first }) => <div key={x.no} style={{ padding: '12px 14px', borderRadius: 18, background: T.surface, border: `1px solid ${first ? T.accentLine : T.line}`, boxShadow: first ? `0 0 0 2px ${T.accentSoft}` : 'none' }}>
  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ fontFamily: T.fontMono, fontSize: 13, fontWeight: 600 }}>{x.no}</span><StatusPill T={T} s={x.status} /><span style={{ flex: 1 }} /><span style={{ fontSize: 11.5, color: T.ink3 }}>{x.date}</span></div>
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 19, fontWeight: 500, flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{x.c.name}</span><span style={{ fontFamily: T.fontSerif, fontSize: 18, fontWeight: 600 }}>{money(x.bill)}</span></div>
  <div style={{ fontSize: 11.5, color: T.ink3, marginTop: 2 }}>{x.c.city} · {x.c.tier} · {x.pcs} pcs · {x.designs} designs</div>
  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10 }}><T.Chip icon="user" style={{ height: 26, fontSize: 11 }}>{x.c.broker}</T.Chip><span style={{ flex: 1 }} /><Hit T={T} icon="printer" size={30} iconSize={14} style={{ background: T.chipBg }} /><Hit T={T} icon="share-2" size={30} iconSize={14} style={{ background: T.chipBg }} /></div>
</div>;
const SOPane = ({ T, o }) => <div style={{ padding: 12 }}><CustomerBar T={T} c={o.c} compact /><div style={{ marginTop: 10 }}><OrderLines T={T} o={o} lines={ORDER_LINES()} /></div><div style={{ display: 'flex', gap: 6, marginTop: 10 }}><Hit T={T} icon="printer" size={36} iconSize={16} style={{ background: T.chipBg }} /><Hit T={T} icon="share-2" size={36} iconSize={16} style={{ background: T.chipBg }} /><span style={{ flex: 1 }} /><T.Btn small icon="check" style={{ height: 36 }}>Approve</T.Btn></div></div>;
/* 1 · sale orders raised, sub-sub menu open under "Sale orders" */
function WebSO2({ T, subOpen = 'Sale orders', searchOn, query, overlay }) {
  const o = ORDERS_F[0];
  return <WebShell2 T={T} title="Sale orders" crumb={['Catalogue', 'Sale orders', 'Raised']} sub="Sale orders" subSuffix="Raised" subOpen={subOpen} paneTitle={o.no} pane={<SOPane T={T} o={o} />} searchOn={searchOn} query={query} overlay={overlay}>
    <SOWebHead2 T={T} />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 12, padding: '14px 24px' }}>{ORDERS_F.filter(x => x.status !== 'Cancelled').map((x, i) => <SOCard key={x.no} T={T} x={x} first={i === 0} />)}</div>
  </WebShell2>;
}
/* 2 · carts in the new shell */
function WebCarts2({ T }) {
  const groups = groupsOf(); const pcs = groups.reduce((s, g) => s + g.pcs, 0), total = groups.reduce((s, g) => s + g.pcs * (g.d.price || 0), 0);
  const tabs = [{ icon: 'layout-grid', label: 'Catalogue' }, { icon: 'shopping-basket', label: 'Carts · 3 active', on: true }, { icon: 'receipt-text', label: 'Sale orders · Raised' }];
  return <WebShell2 T={T} title="Carts" crumb={['Catalogue', 'Carts']} tabs={tabs} sub="Carts" paneTitle="Summary" pane={<div style={{ padding: 16 }}><div style={{ display: 'flex', gap: 8 }}><T.Kpi label="Pieces" value={pcs} small /><T.Kpi label="Designs" value={groups.length} small /></div><div style={{ marginTop: 12, padding: 14, borderRadius: 16, background: T.surface2, border: `1px solid ${T.line}` }}><div style={{ fontSize: 11, color: T.ink3 }}>Total · GST extra</div><PriceF v={total} size={30} font={T.fontSerif} color={T.ink} dim={T.ink3} style={{ marginTop: 4 }} /><div style={{ fontSize: 11.5, color: T.ink3, marginTop: 6 }}>due 20 d · credit 30 d · limit ₹1.2L</div></div><div style={{ marginTop: 12, fontSize: 12, color: T.ink3 }}>Sale book</div><span style={{ display: 'inline-flex', padding: 3, borderRadius: 999, background: T.bg2, marginTop: 6 }}>{['In-cabin', 'WhatsApp'].map((b, i) => <span key={b} style={{ height: 28, padding: '0 12px', borderRadius: 999, display: 'grid', placeItems: 'center', fontSize: 12, background: i === 0 ? T.surface : 'transparent', color: i === 0 ? T.ink : T.ink3 }}>{b}</span>)}</span><div style={{ marginTop: 12, padding: '10px 12px', borderRadius: 14, border: `1px dashed ${T.line2}`, fontSize: 12, color: T.ink3 }}>Note for approval · “2018 ke red ka stock check karna hai”</div><div style={{ marginTop: 14, display: 'flex', gap: 8 }}><T.Btn kind="secondary" small icon="trash-2">Clear</T.Btn><T.Btn icon="check" style={{ flex: 1, height: 44 }}>Submit for approval</T.Btn></div></div>}>
    <div style={{ padding: '14px 24px 0' }}><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CartChips T={T} cart="A" /><span style={{ flex: 1 }} /><T.Chip icon="user-plus" outline>New customer</T.Chip></div></div>
    <div style={{ margin: '14px 24px 0', borderRadius: 20, background: T.surface, border: `1px solid ${T.line}`, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px 12px' }}><span><div style={{ fontFamily: T.fontDisplay, fontSize: 22, fontWeight: 500 }}>Ramleela Fashion</div><div style={{ fontSize: 12, color: T.ink3, marginTop: 2 }}>Surat · Platinum · 30 days credit · {groups.length} designs · {pcs} pcs</div></span><span style={{ flex: 1 }} /><T.Chip icon="phone" outline>98152 23366</T.Chip><T.Chip icon="history" outline>Purchase history</T.Chip></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>{groups.map((g, i) => <div key={g.d.code} style={{ borderRight: i % 2 === 0 ? `1px solid ${T.line}` : 0 }}><CartGroups T={T} groups={[g]} photo={64} /></div>)}</div>
    </div>
  </WebShell2>;
}
/* 3 · sale order analytics in the new shell */
function WebAnalytics2({ T }) {
  const tabs = [{ icon: 'layout-grid', label: 'Catalogue' }, { icon: 'receipt-text', label: 'Sale orders · Raised' }, { icon: 'bar-chart-3', label: 'Analytics · Orders', on: true }];
  return <WebShell2 T={T} title="Sale order analytics" crumb={['Catalogue', 'Sale orders', 'Analytics', 'Orders']} tabs={tabs} sub="Sale orders" subSuffix="Analytics" paneTitle="Range & filters" pane={<AnalyticsPane T={T} level="orders" />}>
    <div style={{ padding: '10px 24px 0' }}><div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>{[['orders', 'Orders'], ['sku', 'Designs (SKU)'], ['cust', 'Customers']].map(([k, t]) => <span key={k} className="press" style={{ position: 'relative', padding: '8px 12px 10px', fontSize: 14, fontWeight: k === 'orders' ? 600 : 400, color: k === 'orders' ? T.ink : T.ink3 }}>{t}{k === 'orders' && <span style={{ position: 'absolute', left: 12, right: 12, bottom: 0, height: 2, background: T.accent, borderRadius: 1 }} />}</span>)}</div></div>
    <div style={{ display: 'flex', gap: 10, padding: '12px 24px 0' }}><T.Kpi label="Orders" value="46" sub="+18% vs prior" tone="ok" /><T.Kpi label="Pieces" value="312" sub="6.8 per order" /><T.Kpi label="Billed" value="₹14.2L" sub="avg ₹30.9k" /><T.Kpi label="Time to approve" value="2.1 d" sub="median" /><T.Kpi label="Cancelled" value="3" sub="6.5%" tone="danger" /></div>
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12, padding: '12px 24px 20px' }}>
      <WCard T={T} title="Orders vs dispatch · per day" right={<Legend T={T} items={[['orders', T.accent], ['dispatched', T.ok]]} />}><LineG T={T} series={[{ pts: A.days, color: T.accent, width: 2.2 }, { pts: A.disp, color: T.ok, width: 2, dash: true }]} w={520} h={120} area /></WCard>
      <WCard T={T} title="Pipeline" alt>{[['Raised', 9, T.warn], ['Approved', 14, T.blue], ['Dispatched', 23, T.ok], ['Cancelled', 3, T.ink3]].map(([s, n, c]) => <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', fontSize: 12.5 }}><span style={{ width: 78, color: T.ink2 }}>{s}</span><span style={{ flex: 1, height: 10, borderRadius: 5, background: T.chipBg }}><span style={{ display: 'block', width: Math.round(n / 23 * 100) + '%', height: 10, borderRadius: 5, background: c }} /></span><b style={{ width: 24, textAlign: 'right' }}>{n}</b></div>)}</WCard>
      <WCard T={T} title="By weekday"><BarsV T={T} data={A.week} w={520} h={70} color={A.week.map((v, i) => i === 4 ? T.accent : T.accentLine)} labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']} /></WCard>
      <WCard T={T} title="Top customers · bill">{[[XD.customers[5], 214000, 14], [XD.customers[0], 168000, 11], [XD.customers[3], 121000, 8]].map(([c, v, n], i) => <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', fontSize: 12 }}><span style={{ width: 16, color: T.ink3 }}>{i + 1}</span><span style={{ flex: 1, minWidth: 0 }}><div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</div><div style={{ height: 4, borderRadius: 2, background: T.chipBg, marginTop: 4 }}><span style={{ display: 'block', width: Math.round(v / 214000 * 100) + '%', height: 4, borderRadius: 2, background: T.accent }} /></div></span><b style={{ fontVariantNumeric: 'tabular-nums' }}>{money(v)}</b></div>)}</WCard>
    </div>
  </WebShell2>;
}
/* 4 · sidebar expanded in the new shell (catalogue grid behind) */
function WebSidebar2({ T }) {
  const list = XD.designs.slice(0, 8);
  const tabs = [{ icon: 'layout-grid', label: 'Catalogue · All', on: true }, { icon: 'receipt-text', label: 'Sale orders · Raised' }];
  return <WebShell2 T={T} title="Catalogue" crumb={['Catalogue', 'All']} tabs={tabs} sidebar paneTitle="Cart A" paneCollapsed pane={<span />}>
    <WebLists T={T} />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: '18px 14px', padding: '14px 24px 24px' }}>{list.map(d => <T.GridCard key={d.code} d={d} qty={QTY[d.code]} />)}</div>
  </WebShell2>;
}

/* ── 7. Search pane: drops from the search field; its own viewer over the main window ── */
const SCOPES = [['sparkles', 'All', true], ['shirt', 'Designs'], ['receipt-text', 'Sale orders'], ['file-text', 'Sale invoices'], ['scissors', 'Production orders'], ['package-check', 'Purchase invoices'], ['users', 'Customers'], ['hammer', 'Karigars'], ['layers', 'Materials']];
const SPanel = ({ T, title, right, children, style }) => <div style={{ marginTop: 14, ...style }}><div style={{ display: 'flex', alignItems: 'baseline', gap: 8, padding: '0 4px', marginBottom: 6 }}><span style={{ width: 3, height: 12, borderRadius: 2, background: T.accent, alignSelf: 'center' }} /><span style={{ fontFamily: T.fontDisplay, fontSize: 15, fontWeight: 600, color: T.ink }}>{title}</span><span style={{ flex: 1 }} />{right}</div>{children}</div>;
const SRow = ({ T, icon, main, meta, right, on }) => <div className="press" style={{ display: 'flex', alignItems: 'center', gap: 10, height: 38, padding: '0 10px', borderRadius: 12, background: on ? T.accentSoft : 'transparent', fontFamily: T.fontUI, fontSize: 12.5 }}><span style={{ width: 26, height: 26, borderRadius: 8, background: T.chipBg, display: 'grid', placeItems: 'center', color: T.ink2, flex: 'none' }}><Ic name={icon} size={13} /></span><span style={{ flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: T.ink }}>{main}{meta && <span style={{ color: T.ink3 }}> · {meta}</span>}</span>{right && <span style={{ fontSize: 11, color: T.ink3, whiteSpace: 'nowrap' }}>{right}</span>}</div>;
function SearchChooser({ T }) {
  return <div style={{ position: 'absolute', right: 16 + 478 + 12, top: 108, width: 250, padding: 12, borderRadius: 18, zIndex: 3, background: T.surface, border: `1px solid ${T.line2}`, boxShadow: '0 24px 50px -16px rgba(0,0,0,.45)' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, fontWeight: 600, color: T.ink }}>Filter & sort<span style={{ flex: 1 }} /><span style={{ fontSize: 11, color: T.accent }}>Clear</span></div>
    {[['Sort', ['Relevance', 'Newest', 'Most ordered']], ['Show', ['In stock', 'Samples', 'Archived']], ['Period', ['This month', 'FY 26', 'All time']]].map(([k, opts], g) => <div key={k}><div style={{ fontSize: 10.5, color: T.ink3, marginTop: g ? 10 : 8, letterSpacing: '.06em', textTransform: 'uppercase' }}>{k}</div><div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginTop: 5 }}>{opts.map((o, i) => <T.Chip key={o} on={i === 0 && k !== 'Show'} outline={!(i === 0 && k !== 'Show')} style={{ height: 26, fontSize: 11, padding: '0 9px' }}>{k === 'Show' && <span style={{ width: 12, height: 12, borderRadius: 3, border: `1.5px solid ${i === 0 ? T.accent : T.line2}`, background: i === 0 ? T.accent : 'transparent', display: 'grid', placeItems: 'center' }}>{i === 0 && <Ic name="check" size={9} color={T.onAccent} sw={3} />}</span>}{o}</T.Chip>)}</div></div>)}
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10 }}><span style={{ fontSize: 11, color: T.ink3 }}>Firm · Shree Radha Studio</span><span style={{ flex: 1 }} /><T.Btn small style={{ height: 30 }}>Apply</T.Btn></div>
  </div>;
}
function SearchPane({ T, stage = 1 }) {
  const q = stage === 2 ? '27' : '';
  const hits = [XD.byCode['2798'], XD.byCode['2006'], XD.byCode['1243']];
  return <><div style={{ position: 'absolute', right: 16, top: 101, bottom: 16, width: 478, borderRadius: 22, zIndex: 40, display: 'flex', flexDirection: 'column', overflow: 'hidden', ...glass(T, { boxShadow: `inset 0 1px 0 ${T.glassHi}, 0 40px 80px -30px rgba(0,0,0,.55)` }) }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 12px 0', position: 'relative' }}>
      <div style={{ flex: 1, height: 38, borderRadius: 19, background: T.surface, border: `1px solid ${T.accent}`, boxShadow: `0 0 0 3px ${T.accentSoft}`, display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px' }}><Ic name="search" size={15} color={T.ink2} /><span style={{ flex: 1, fontFamily: T.fontUI, fontSize: 13.5, color: q ? T.ink : T.ink3 }}>{q || 'Type a number, a name, a barcode…'}<span className="aura-dot" style={{ display: 'inline-block', width: 1.5, height: 15, background: T.accent, marginLeft: 1, verticalAlign: -2 }} /></span>{q && <Ic name="x" size={13} color={T.ink3} />}</div>
      <span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 36, padding: '0 11px', borderRadius: 999, border: `1px solid ${stage === 2 ? T.ink : T.line2}`, background: stage === 2 ? T.ink : 'transparent', color: stage === 2 ? T.bg : T.ink2, fontFamily: T.fontUI, fontSize: 12 }}><Ic name="sliders-horizontal" size={14} />Filter & sort</span>
    </div>
    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', padding: '10px 12px 0' }}>{SCOPES.map(([ic, l, on]) => <T.Chip key={l} icon={ic} on={on} outline={!on} style={{ height: 27, fontSize: 11.5, padding: '0 10px' }}>{l}</T.Chip>)}</div>
    <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', padding: '2px 12px 0' }}>
      {stage === 1 ? <>
        <SPanel T={T} title="Recent" right={<span style={{ fontSize: 11, color: T.ink3 }}>Clear</span>}>
          <SRow T={T} icon="receipt-text" main="SO-3455" meta="Preeti Fashion Hub · Raised" right="2 min ago" />
          <SRow T={T} icon="shirt" main="2798 · Sky" meta="Plazo set · 20 in stock" right="today" />
          <SRow T={T} icon="users" main="Rangoli Ethnic Wear" meta="Lucknow · Platinum" right="yesterday" />
          <SRow T={T} icon="file-text" main="SI-2288" meta="Sale invoice · ₹31,965" right="Mon" />
        </SPanel>
        <SPanel T={T} title="For you" right={<span style={{ fontSize: 11, color: T.ink3 }}>from your habits</span>}>
          <SRow T={T} icon="sunrise" main="Sale orders · Raised" meta="you open this every morning" right="open" />
          <SRow T={T} icon="package-x" main="Out of stock · Lehenga" meta="4 designs short today" right="open" />
          <SRow T={T} icon="bookmark" main="Delhi picks" meta="saved list · 18 designs" right="open" />
        </SPanel>
        <SPanel T={T} title="Quick actions"><div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', padding: '0 2px' }}><T.Chip icon="plus" outline>New sale order</T.Chip><T.Chip icon="scan-line" outline>Scan</T.Chip><T.Chip icon="user-plus" outline>New customer</T.Chip><T.Chip icon="printer" outline>Reprint last invoice</T.Chip></div></SPanel>
      </> : <>
        <SPanel T={T} title="Designs" right={<span style={{ fontSize: 11, color: T.accent, fontWeight: 600 }}>See all 6</span>}>
          <div style={{ display: 'flex', gap: 8 }}>{hits.map((d, i) => <div key={d.code} className="press" style={{ flex: 1, minWidth: 0, padding: 8, borderRadius: 14, background: i === 0 ? T.accentSoft : T.chipBg, display: 'flex', gap: 8 }}><div style={{ width: 46, height: 58, borderRadius: 8, overflow: 'hidden', background: T.photoBg, flex: 'none' }}>{d.src ? <img src={d.src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /> : <span style={{ display: 'grid', placeItems: 'center', height: '100%', fontFamily: T.fontMono, fontSize: 9, color: T.ink3 }}>{d.code}</span>}</div><span style={{ minWidth: 0 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 17, fontWeight: 600, color: T.ink, lineHeight: 1 }}><b style={{ color: T.accent }}>{d.code.slice(0, 2)}</b>{d.code.slice(2)}</div><div style={{ fontSize: 10.5, color: T.ink3, marginTop: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.cat} · {d.name}</div><div style={{ fontSize: 10.5, color: T.ink2, marginTop: 3 }}>{d.free} in stock</div><PriceF v={d.price} size={12} font={T.fontSerif} color={T.ink} dim={T.ink3} style={{ marginTop: 3 }} /></span></div>)}</div>
        </SPanel>
        <SPanel T={T} title="Sale orders" right={<span style={{ fontSize: 11, color: T.accent, fontWeight: 600 }}>See all 4</span>}>
          <SRow T={T} icon="receipt-text" main={<span>SO-34<b style={{ color: T.accent }}>27</b></span>} meta="Nalli Fashion Mart · Approved · ₹58,940" right="02/09/26" on />
          <SRow T={T} icon="receipt-text" main={<span>SO-3<b style={{ color: T.accent }}>27</b>2</span>} meta="Aneri Boutique · Dispatched · ₹26,970" right="21/08/26" />
        </SPanel>
        <SPanel T={T} title="Sale invoices" right={<span style={{ fontSize: 11, color: T.accent, fontWeight: 600 }}>See all 2</span>}>
          <SRow T={T} icon="file-text" main={<span>SI-2<b style={{ color: T.accent }}>27</b>1</span>} meta="Aneri Boutique · ₹26,970 · paid" right="24/08/26" />
        </SPanel>
        <SPanel T={T} title="Customers">
          <SRow T={T} icon="users" main="Ambika Enterprises" meta="Delhi · phone ends 76294 · matches 27 in ledger no." right="Gold" />
        </SPanel>
      </>}
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 16px 10px', borderTop: `1px solid ${T.line}`, fontFamily: T.fontUI, fontSize: 10.5, color: T.ink3 }}>{[['↵', 'open'], ['↑↓', 'move'], ['⇥', 'scope'], ['esc', 'close']].map(([k, v]) => <span key={k} style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><span style={{ fontFamily: T.fontMono, padding: '1px 5px', borderRadius: 5, background: T.chipBg, color: T.ink2 }}>{k}</span>{v}</span>)}<span style={{ flex: 1 }} />{stage === 2 ? '13 matches in 4 sections' : 'Searches this firm · switch with ⇥'}</div>
  </div>{stage === 2 && <SearchChooser T={T} />}</>;
}
const WebSearch1 = ({ T }) => <WebSO2 T={T} subOpen={null} searchOn overlay={<SearchPane T={T} stage={1} />} />;
const WebSearch2 = ({ T }) => <WebSO2 T={T} subOpen={null} searchOn query="27" overlay={<SearchPane T={T} stage={2} />} />;

/* ── 8. Sale orders table: full width, no group-by · grouped column chooser ── */
const inStock = o => `${Math.min(o.pcs, Math.round(o.pcs * .6))} / ${o.pcs}`;
const prodOf = o => o.status === 'Dispatched' ? 'Received' : o.status === 'Approved' ? 'Stitching' : o.pcs > 6 ? 'Cutting' : 'Not started';
const SO_COLS2 = [['Order', 84, o => o.no, 'mono'], ['Date', 82, o => o.date], ['Customer', 130, o => o.c.name], ['Status', 108, o => o.status, 'pill'], ['Due', 82, o => o.status === 'Dispatched' ? '—' : '24/09/26'], ['Pcs', 48, o => o.pcs, 'num'], ['In stock', 72, o => inStock(o), 'num'], ['Designs', 60, o => o.designs, 'num'], ['Bill', 88, o => money(o.bill), 'num'], ['Prod status', 92, o => prodOf(o)], ['Prod due', 84, o => o.status === 'Dispatched' ? '—' : '18/09 · ' + Math.round(o.pcs * .4) + ' pcs'], ['Invoices', 84, o => o.status === 'Dispatched' ? 'SI-22' + (70 + o.pcs) : '—', 'mono'], ['Agent', 96, o => o.c.broker]];
function SOTable2({ T, rows, cols = SO_COLS2, height, track }) {
  const head = <div style={{ display: 'flex', position: 'sticky', top: 0, zIndex: 3 }}>{cols.map(([c, w, , kind]) => <div key={c} style={{ flex: `${w} 1 0`, minWidth: w, boxSizing: 'border-box', padding: '9px 8px 9px 10px', borderBottom: `1px solid ${T.line2}`, borderRight: `1px solid ${T.line}`, background: T.surface2, display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, color: T.ink2, whiteSpace: 'nowrap', justifyContent: kind === 'num' ? 'flex-end' : 'flex-start' }}><Ic name="grip-vertical" size={11} color={T.ink3} /><span style={{ flex: kind === 'num' ? 'none' : 1 }}>{c}</span>{c === 'Date' && <Ic name="arrow-down" size={11} color={T.accent} />}<Ic name="filter" size={11} color={T.ink3} /></div>)}</div>;
  const line = (o, r) => <div key={o.no} style={{ display: 'flex', background: r % 2 ? T.bg2 : 'transparent' }}>{cols.map(([c, w, get, kind], i) => <div key={c} style={{ flex: `${w} 1 0`, minWidth: w, boxSizing: 'border-box', padding: '8px 8px 8px 10px', borderRight: `1px solid ${T.line}`, borderBottom: `1px solid ${T.line}`, fontSize: 12, color: i === 0 ? T.ink : T.ink2, fontFamily: kind === 'mono' ? T.fontMono : T.fontUI, fontWeight: i === 0 ? 600 : 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: kind === 'num' ? 'right' : 'left', fontVariantNumeric: 'tabular-nums' }}>{kind === 'pill' ? <StatusPill T={T} s={o.status} /> : get(o)}</div>)}</div>;
  return <div style={{ position: 'relative', borderRadius: 18, background: T.surface, border: `1px solid ${T.line}`, overflow: 'hidden', height, display: 'flex', flexDirection: 'column' }}>
    {track && <div style={{ height: 6, background: T.surface2, borderBottom: `1px solid ${T.line}`, position: 'relative', flex: 'none' }}><span style={{ position: 'absolute', left: 8, top: 1, width: '30%', height: 4, borderRadius: 2, background: T.accentLine }} /></div>}
    <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', position: 'relative' }}>{head}{rows.map((o, r) => line(o, r))}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', fontSize: 11.5, color: T.ink3, fontFamily: T.fontUI }}>{rows.length} {rows[0] && rows[0].cn ? 'credit notes' : 'orders'} · {rows.reduce((s, o) => s + o.pcs, 0)} pcs<span style={{ flex: 1 }} /><b style={{ color: T.ink, fontFamily: T.fontSerif, fontSize: 15 }}>{money(rows.reduce((s, o) => s + (o.bill != null ? o.bill : o.amount), 0))}</b></div>
    </div>
  </div>;
}
const COL_GROUPS = [
  ['Order', 'receipt-text', [['Order no', 1], ['Date', 1], ['Sale order status', 1], ['Sale order due date', 1], ['Sale book', 0], ['Raised by', 0], ['Approved by · on', 0], ['Note', 0]]],
  ['Customer', 'users', [['Customer', 1], ['Bill-to ledger', 0], ['Ship-to ledgers', 0, 'multi'], ['Phone', 0], ['City · market', 0], ['Tier', 0], ['Customer score', 0], ['Credit · overdue', 0, 'money']]],
  ['Agent', 'briefcase', [['Agent', 1], ['Agent no.', 0], ['Agency', 0], ['Commission slab', 0, 'money']]],
  ['Quantities', 'hash', [['Pcs', 1], ['In stock / total pcs', 1], ['Designs', 1], ['Colours', 0], ['Samples in order', 0]]],
  ['Money', 'wallet', [['Bill', 1, 'money'], ['GST', 0, 'money'], ['Discount', 0, 'money'], ['Amount received', 0, 'money']]],
  ['Production', 'scissors', [['Production status', 1], ['Process · current', 0], ['Issue date · pcs', 0], ['Receive date · pcs', 0], ['Production due · pcs', 1], ['Karigar', 0]]],
  ['Dispatch', 'package', [['Invoice numbers', 1, 'multi'], ['Parcels', 0], ['Dispatched on', 0], ['Transport · LR no.', 0], ['Gate token', 0]]],
];
function ColumnChooser({ T }) {
  const Box = ({ on }) => <span style={{ width: 15, height: 15, borderRadius: 4, border: `1.5px solid ${on ? T.accent : T.line2}`, background: on ? T.accent : 'transparent', display: 'grid', placeItems: 'center', flex: 'none' }}>{on ? <Ic name="check" size={10} color={T.onAccent} sw={3} /> : null}</span>;
  return <div style={{ position: 'absolute', left: 150, top: 78, width: 880, borderRadius: 20, zIndex: 20, background: T.surface, border: `1px solid ${T.line2}`, boxShadow: '0 30px 70px -20px rgba(0,0,0,.5)', overflow: 'hidden' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px 10px', borderBottom: `1px solid ${T.line}` }}><span style={{ fontFamily: T.fontDisplay, fontSize: 17, fontWeight: 600, color: T.ink }}>Columns</span><span style={{ fontSize: 11.5, color: T.ink3 }}>13 of 34 shown · drag to reorder</span><span style={{ flex: 1 }} /><div style={{ width: 190, height: 30, borderRadius: 15, background: T.chipBg, display: 'flex', alignItems: 'center', gap: 6, padding: '0 10px', fontSize: 11.5, color: T.ink3 }}><Ic name="search" size={12} />Find a column</div></div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 14px 0', fontSize: 11 }}><span style={{ color: T.ink3, marginRight: 4 }}>Presets</span>{['Default', 'Production', 'Accounts', 'Dispatch', 'Mine'].map((p, i) => <T.Chip key={p} on={i === 0} outline={i !== 0} style={{ height: 26, fontSize: 11, padding: '0 10px', fontStyle: p === 'Mine' ? 'italic' : 'normal' }}>{p}</T.Chip>)}<span style={{ flex: 1 }} /><span style={{ fontSize: 11, color: T.ink3 }}>money columns follow the role</span></div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '6px 10px', padding: '10px 14px 12px' }}>
      {COL_GROUPS.map(([g, ic, cols]) => <div key={g} style={{ padding: '8px 10px 6px', borderRadius: 14, background: T.surface2, border: `1px solid ${T.line}`, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', color: T.ink2, marginBottom: 4 }}><Ic name={ic} size={12} color={T.accent} />{g}<span style={{ flex: 1 }} /><span style={{ fontWeight: 400, color: T.ink3, letterSpacing: 0, textTransform: 'none' }}>{cols.filter(c => c[1]).length}/{cols.length}</span></div>
        {cols.map(([c, on, k]) => <div key={c} className="press" style={{ display: 'flex', alignItems: 'center', gap: 7, height: 23, fontSize: 11.5, color: on ? T.ink : T.ink2, whiteSpace: 'nowrap' }}><Ic name="grip-vertical" size={10} color={T.ink3} /><Box on={on} /><span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{c}</span>{k === 'multi' && <Ic name="layers" size={10} color={T.ink3} title="can hold several values" />}{k === 'money' && <Ic name="lock" size={10} color={T.ink3} />}</div>)}
      </div>)}
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px 12px', borderTop: `1px solid ${T.line}` }}><span style={{ fontSize: 11, color: T.ink3 }}><Ic name="layers" size={10} /> several values per order · <Ic name="lock" size={10} /> money, shown by role</span><span style={{ flex: 1 }} /><T.Btn kind="secondary" small style={{ height: 32 }}>Reset to default</T.Btn><T.Btn kind="secondary" small icon="bookmark" style={{ height: 32 }}>Save as preset</T.Btn><T.Btn small style={{ height: 32 }}>Apply</T.Btn></div>
  </div>;
}
const SO_TABLE_TABS = [{ icon: 'layout-grid', label: 'Catalogue' }, { icon: 'table-2', label: 'Sale orders · Raised · table', on: true }, { icon: 'file-text', label: 'SO-3455 · Preeti Fashion Hub' }];
/* 7 · full-width table, no group-by, pane collapsed */
function WebSalesTable2({ T, chooser }) {
  return <WebShell2 T={T} title="Sale orders" crumb={['Catalogue', 'Sale orders', 'Raised', 'Table']} tabs={SO_TABLE_TABS} sub="Sale orders" subSuffix="Raised" paneTitle="Order" paneCollapsed pane={<span />}>
    <SOWebHead2 T={T} view="table" columns={chooser} />
    <div style={{ padding: '12px 24px 20px', height: '100%', minHeight: 0, boxSizing: 'border-box' }}><SOTable2 T={T} rows={ORDERS_F} height="100%" /></div>
    {chooser && <ColumnChooser T={T} />}
  </WebShell2>;
}
const WebSalesTableFull = ({ T }) => <WebSalesTable2 T={T} />;
const WebSalesColumns = ({ T }) => <WebSalesTable2 T={T} chooser />;

/* ── 9. Returns tab: cards and table, phone and web ── */
const RetPill = ({ T, s }) => <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, height: 22, padding: '0 8px', borderRadius: 999, background: T.chipBg, fontSize: 10.5, fontWeight: 600, letterSpacing: '.04em', textTransform: 'uppercase', color: s === 'in stock' ? T.ok : T.warn, whiteSpace: 'nowrap' }}><span style={{ width: 6, height: 6, borderRadius: 3, background: s === 'in stock' ? T.ok : T.warn }} />{s === 'in stock' ? 'Back in stock' : 'Stock on approval'}</span>;
const RetCard = ({ T, r, first, web }) => <div style={{ padding: '12px 14px', borderRadius: web ? 18 : T.rCard, background: T.surface, border: `1px solid ${first && web ? T.accentLine : T.line}`, boxShadow: first && web ? `0 0 0 2px ${T.accentSoft}` : T.dark || web ? 'none' : '0 6px 18px -14px rgba(36,23,18,.25)' }}>
  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ fontFamily: T.fontMono, fontSize: 13, fontWeight: 600, color: T.ink, whiteSpace: 'nowrap' }}>{r.cn}</span><RetPill T={T} s={r.stock} /><span style={{ flex: 1 }} /><span style={{ fontSize: 11.5, color: T.ink3 }}>{r.date}</span></div>
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}><span style={{ fontFamily: T.fontDisplay, fontSize: web ? 19 : 20, fontWeight: 500, color: T.ink, flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.c.name}</span><span style={{ fontFamily: T.fontSerif, fontSize: 18, fontWeight: 600, color: T.ink, fontVariantNumeric: 'tabular-nums' }}>{money(r.amount)}</span></div>
  <div style={{ fontSize: 11.5, color: T.ink3, marginTop: 2 }}>{r.pcs} of {r.of} pcs returned · {r.reason}</div>
  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10 }}><T.Chip icon="receipt-text" style={{ height: 26, fontSize: 11 }}>{r.no}</T.Chip><T.Chip icon="file-text" style={{ height: 26, fontSize: 11 }}>{r.inv}</T.Chip><span style={{ flex: 1 }} /><Hit T={T} icon="printer" size={30} iconSize={14} style={{ background: T.chipBg }} /><Hit T={T} icon="share-2" size={30} iconSize={14} style={{ background: T.chipBg }} /></div>
</div>;
const RET_COLS = [['Credit note', 92, r => r.cn, 'mono'], ['Date', 78, r => r.date], ['Customer', 150, r => r.c.name], ['Order', 84, r => r.no, 'mono'], ['Invoice', 84, r => r.inv, 'mono'], ['Returned', 76, r => `${r.pcs} of ${r.of}`, 'num'], ['Amount', 90, r => money(r.amount), 'num'], ['Reason', 150, r => r.reason], ['Stock', 120, r => r.stock === 'in stock' ? 'Back in stock' : 'On approval'], ['Approved by', 100, r => r.stock === 'in stock' ? 'Accounts · SK' : '—']];
function SOHeader2({ T, tab = 'Returns', view = 'cards' }) {
  return <>
    <div style={{ display: 'flex', alignItems: 'center', padding: '0 12px', height: 44, gap: 6 }}><Hit T={T} icon="chevron-left" size={40} /><span style={{ fontFamily: T.fontDisplay, fontSize: 24, fontWeight: 500, color: T.ink }}>Sale orders</span><span style={{ flex: 1 }} />
      <span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 34, padding: '0 12px', borderRadius: 999, border: `1px solid ${T.line2}`, color: T.ink, fontSize: 12.5, fontWeight: 500 }}><Ic name="bar-chart-3" size={15} />Analytics</span>
      <Hit T={T} icon={view === 'cards' ? 'table-2' : 'layout-list'} size={36} iconSize={17} style={{ background: T.surface, border: `1px solid ${T.line2}`, marginLeft: 6 }} /></div>
    <div style={{ position: 'relative', overflow: 'hidden', padding: '2px 0 0 4px' }}><div style={{ display: 'flex', gap: 0, transform: 'translateX(-58px)' }}><SOTabs2 T={T} tab={tab} size={13} pad={8} /></div><span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 28, background: `linear-gradient(90deg, ${T.bg}, transparent)`, pointerEvents: 'none' }} /></div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px 0', overflow: 'hidden' }}><T.Chip icon="search" outline>Note, customer, invoice</T.Chip><T.Chip icon="calendar" x outline>This month</T.Chip>{view === 'table' ? <T.Chip icon="columns-3" outline>Columns</T.Chip> : <T.Chip icon="arrow-down-up" outline>Newest</T.Chip>}</div>
  </>;
}
function ScreenFReturns({ T }) {
  return frameF(T, <>
    <SOHeader2 T={T} />
    <div style={{ padding: '12px 14px 120px', display: 'flex', flexDirection: 'column', gap: 10 }}>{RETURNS_F.map(r => <RetCard key={r.cn} T={T} r={r} />)}
      <div style={{ padding: '12px 14px', borderRadius: T.rCard, border: `1px dashed ${T.line2}`, fontSize: 12, color: T.ink3, lineHeight: 1.5 }}>Returns are booked in Dispatch › Sale return. The credit note is issued at once; pieces re-enter stock only after accounts approve.</div>
    </div>
  </>, <T.Island active="Catalogue" />);
}
function ScreenFReturnsTable({ T }) {
  return frameF(T, <>
    <SOHeader2 T={T} view="table" />
    <div style={{ flex: 1, minHeight: 0, margin: '12px 14px 104px' }}><SOTable2 T={T} rows={RETURNS_F} cols={RET_COLS} height="100%" track /></div>
  </>, <T.Island active="Catalogue" />);
}
const RET_TABS = [{ icon: 'layout-grid', label: 'Catalogue' }, { icon: 'undo-2', label: 'Sale orders · Returns', on: true }, { icon: 'file-text', label: 'SO-3455 · Preeti Fashion Hub' }];
const RetPane = ({ T, r }) => <div style={{ padding: 12 }}><CustomerBar T={T} c={r.c} compact /><div style={{ marginTop: 10, padding: '10px 12px', borderRadius: 16, background: T.surface2, border: `1px solid ${T.line}` }}><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ fontFamily: T.fontMono, fontSize: 13, fontWeight: 600 }}>{r.cn}</span><RetPill T={T} s={r.stock} /><span style={{ flex: 1 }} /><span style={{ fontFamily: T.fontSerif, fontSize: 18, fontWeight: 600 }}>{money(r.amount)}</span></div><div style={{ fontSize: 11.5, color: T.ink3, marginTop: 4 }}>against {r.inv} · order {r.no} · {r.reason}</div></div>
  <div style={{ marginTop: 10, borderRadius: T.rCard, background: T.surface, border: `1px solid ${T.line}`, overflow: 'hidden' }}>{RET_LINES.map(l => <div key={l.d.code} style={{ padding: '10px 14px 6px' }}><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><div style={{ width: 44, height: 56, borderRadius: 8, overflow: 'hidden', background: T.photoBg, flex: 'none' }}>{l.d.src && <img src={l.d.src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}</div><span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 19, fontWeight: 600, color: T.ink, lineHeight: 1 }}>{l.d.code}</div><div style={{ fontSize: 11.5, color: T.ink3, marginTop: 3 }}>{l.d.cat} · {l.d.name}</div></span><span style={{ fontSize: 11.5, color: T.ink3 }}>{l.cols.reduce((a, [, q]) => a + q, 0)} pcs back</span></div><div style={{ padding: '4px 0 0 54px' }}>{l.cols.map(([n, q]) => <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 8, height: 26, fontSize: 12.5, color: T.ink2 }}><span style={{ width: 4, height: 14, borderRadius: 2, background: XD.cols[n] }} />{n}<span style={{ flex: 1 }} /><span>{q} × {money(l.d.price)}</span></div>)}</div></div>)}</div>
  <div style={{ display: 'flex', gap: 6, marginTop: 10 }}><Hit T={T} icon="printer" size={36} iconSize={16} style={{ background: T.chipBg }} /><Hit T={T} icon="external-link" size={36} iconSize={16} style={{ background: T.chipBg }} /><span style={{ flex: 1 }} /><T.Btn small icon="package-check" style={{ height: 36 }}>Approve to stock</T.Btn></div></div>;
function WebReturns({ T }) {
  const r = RETURNS_F[0];
  return <WebShell2 T={T} title="Sale orders" crumb={['Catalogue', 'Sale orders', 'Returns']} tabs={RET_TABS} sub="Sale orders" subSuffix="Returns" paneTitle={r.cn} pane={<RetPane T={T} r={r} />}>
    <SOWebHead2 T={T} tab="Returns" />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 12, padding: '14px 24px' }}>{RETURNS_F.map((x, i) => <RetCard key={x.cn} T={T} r={x} first={i === 0} web />)}
      <div style={{ padding: '12px 14px', borderRadius: 18, border: `1px dashed ${T.line2}`, fontSize: 12, color: T.ink3, lineHeight: 1.5, alignSelf: 'start' }}>Returns are booked in Dispatch › Sale return. The credit note is issued at once; pieces re-enter finished goods only once accounts approve.</div></div>
  </WebShell2>;
}
function WebReturnsTable({ T }) {
  return <WebShell2 T={T} title="Sale orders" crumb={['Catalogue', 'Sale orders', 'Returns', 'Table']} tabs={RET_TABS} sub="Sale orders" subSuffix="Returns" paneTitle="Return" paneCollapsed pane={<span />}>
    <SOWebHead2 T={T} tab="Returns" view="table" />
    <div style={{ padding: '12px 24px 20px', height: '100%', minHeight: 0, boxSizing: 'border-box' }}><SOTable2 T={T} rows={RETURNS_F} cols={RET_COLS} height="100%" /></div>
  </WebShell2>;
}

Object.assign(window, { WebHeader2, SubBar, CAT_SUBS, WebShell2, RETURNS_F, SOTabs2, SOWebHead2, WebSO2, WebCarts2, WebAnalytics2, WebSidebar2, SearchPane, WebSearch1, WebSearch2, SOTable2, SO_COLS2, COL_GROUPS, ColumnChooser, WebSalesTableFull, WebSalesColumns, RetCard, SOHeader2, ScreenFReturns, ScreenFReturnsTable, WebReturns, WebReturnsTable });

/* Board registration moved here from index.html on 9 Sep 2026 (the board is one page per module; see modules.js). */
(window.NEW_DRAFT_MODULES = window.NEW_DRAFT_MODULES || []).push({ module: 'App shell · search pane', note: 'a right-side search pane dropping from the header field (8 Sep). The tab strip, header v2, sub-menu buttons, rail and sidebar were approved on 8 Sep and now live in the finals', subs: [
    { name: 'Search pane', flow: 'field focused → scope buttons, recents, habits → typing shows matches by section with the filter & sort chooser', phone: [], web: [['Search · stage 1 · scope, recent, for you', WebSearch1], ['Search · stage 2 · matches by section, filter & sort chooser', WebSearch2]] },
] });
(window.NEW_DRAFT_MODULES = window.NEW_DRAFT_MODULES || []).push({ module: 'Catalogue · sale orders', note: 'full-width table without group-by · grouped column chooser · Returns tab (8 Sep)', subs: [
    { name: 'Table', flow: 'full table, no group-by → column chooser open', phone: [], web: [['Sale orders · full table, no group-by', WebSalesTableFull], ['Sale orders · column chooser, grouped', WebSalesColumns]] },
    { name: 'Returns', flow: 'returns tab as cards → as a table', phone: [['Returns · cards', ScreenFReturns], ['Returns · table', ScreenFReturnsTable]], web: [['Returns · cards, credit note pane', WebReturns], ['Returns · table', WebReturnsTable]] },
] });
