/* NEW DRAFTS · Dispatch · web (8 Sep 2026). Laptop 1280 × 800 on the new chrome from mod-appshell.jsx (Rail2, TabStrip,
   WebHeader2, SubBar with the Dispatch nodes, RightPane). The search pane is the common right pane; every screen here
   has its own module pane. Shared Dispatch components come from mod-dispatch.jsx. */

const D_TABS = [{ icon: 'house', pinned: true }, { icon: 'layout-grid', label: 'Catalogue' }, { icon: 'package', label: 'Dispatch · Ready', on: true }, { icon: 'file-text', label: 'SI-2288 · Ambika Enterprises' }, { icon: 'users', label: 'CRM · Today' }];
const D_NODES = [['package-check', 'Ready', 6], ['package', 'Packing', 8], ['receipt', 'Billed'], ['warehouse', 'Stock'], ['package-x', 'Out of stock', 14], ['rotate-ccw', 'Sale return', 2]];
function DShell({ T, node = 'Ready', tab, crumb = [], children, pane, paneTitle, paneCollapsed, paneWidth, overlay, subRight, subSuffix }) {
  const tabs = D_TABS.map(t => t.on ? { ...t, label: 'Dispatch · ' + (tab || node) } : t);
  return <div style={{ position: 'relative', height: '100%', background: T.bg, color: T.ink, fontFamily: T.fontUI, overflow: 'hidden' }}>
    <div style={{ position: 'absolute', inset: 0, background: T.depth, pointerEvents: 'none' }} />
    <Rail2 T={T} active="Dispatch" />
    <div style={{ position: 'absolute', left: 84, top: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column' }}>
      <TabStrip T={T} tabs={tabs} />
      <WebHeader2 T={T} title="Dispatch" crumb={['Dispatch', node, ...crumb]} right={<LiveChip T={T} />} menu={<SubBar T={T} items={D_NODES} active={node} />} />
      {subRight && <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 20px 0', flex: 'none' }}><span style={{ fontFamily: T.fontUI, fontSize: 12, color: T.ink3 }}>{subSuffix}</span><span style={{ flex: 1 }} />{subRight}</div>}
      <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>
        <div style={{ flex: 1, minWidth: 0, minHeight: 0, overflow: 'hidden', position: 'relative', display: 'flex' }}>{children}</div>
        {pane && <RightPane T={T} title={paneTitle} collapsed={paneCollapsed} width={paneWidth}>{pane}</RightPane>}
      </div>
    </div>
    {overlay}
  </div>;
}
const Main = ({ children, style, pad = '12px 20px 20px' }) => <div style={{ flex: 1, minWidth: 0, minHeight: 0, overflow: 'hidden', padding: pad, ...style }}>{children}</div>;
const Pane = ({ children, style }) => <div style={{ padding: 14, height: '100%', overflow: 'hidden', ...style }}>{children}</div>;
const Bar = ({ T, children, right, style }) => <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10, overflow: 'hidden', ...style }}>{children}<span style={{ flex: 1 }} />{right}</div>;
const IconBtn = ({ T, icon, on }) => <Hit T={T} icon={icon} size={34} iconSize={16} style={{ background: on ? T.ink : T.chipBg, color: on ? T.bg : T.ink }} />;
const THead = ({ T, cols, lead = 34, pad = '4px 12px' }) => <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: pad }}><span style={{ width: lead, flex: 'none' }} />{cols.map(([l, w, align]) => <span key={l} style={{ width: w, flex: w ? 'none' : 1, textAlign: align || (w ? 'right' : 'left'), fontFamily: T.fontUI, fontSize: 10, letterSpacing: '.06em', textTransform: 'uppercase', color: T.ink3, whiteSpace: 'nowrap' }}>{l}</span>)}</div>;
const Radio = ({ T, on, children }) => <span className="press" style={{ display: 'flex', alignItems: 'center', gap: 8, height: 26, fontFamily: T.fontUI, fontSize: 12, color: on ? T.ink : T.ink2, fontWeight: on ? 600 : 400 }}><span style={{ width: 14, height: 14, borderRadius: 7, border: `1.5px solid ${on ? T.accent : T.line2}`, display: 'grid', placeItems: 'center' }}>{on && <span style={{ width: 7, height: 7, borderRadius: 4, background: T.accent }} />}</span>{children}</span>;
/* Queue rail: sort + filters + active chips + live count. URL-persisted. */
function QueueRail({ T, count = '6 customers · 71 pcs', sorts = ['Due days · oldest first', 'Priority', 'Packable pcs', 'Total pcs', 'Customer score'], sort = 0, quick = [['Due ≤ 2 d', false], ['Fully packable', false], ['Partial', false], ['P1 / P2', false], ['In-stock only', true]], groups = [['Created before', ['This week', 'Last 30 d', 'Older']], ['Tier', ['Platinum', 'Gold', 'Silver']], ['Priority', ['P1', 'P2', 'P3', 'P4', 'P5']], ['Total pcs', ['< 10', '< 25', '25 +']]] }) {
  const Lab = ({ children, right }) => <div style={{ display: 'flex', alignItems: 'baseline', fontFamily: T.fontUI, fontSize: 10, letterSpacing: '.06em', textTransform: 'uppercase', color: T.ink3, marginBottom: 5 }}>{children}<span style={{ flex: 1 }} />{right}</div>;
  return <div style={{ width: 214, flex: 'none', borderRight: `1px solid ${T.line}`, background: T.surface, padding: '12px 14px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 16, fontWeight: 600, color: T.ink, flex: 1 }}>Queue</span><Hit T={T} icon="chevrons-down-up" size={26} iconSize={13} style={{ background: T.chipBg }} /><Hit T={T} icon="chevrons-up-down" size={26} iconSize={13} style={{ background: T.chipBg }} /></div>
    <Meta T={T} style={{ display: 'block', marginTop: 2 }}>{count} · live</Meta>
    <div style={{ marginTop: 12 }}><Lab>Sort</Lab>{sorts.map((s, i) => <Radio key={s} T={T} on={i === sort}>{s}</Radio>)}</div>
    <div style={{ marginTop: 10 }}><Lab>Quick</Lab><div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>{quick.map(([l, on]) => <T.Chip key={l} on={on} outline={!on} x={on} style={{ height: 26, fontSize: 11.5, padding: '0 9px' }}>{l}</T.Chip>)}</div></div>
    {groups.map(([g, opts]) => <div key={g} style={{ marginTop: 10 }}><Lab right={<Ic name="chevron-down" size={11} />}>{g}</Lab><div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>{opts.map(o => <T.Chip key={o} outline style={{ height: 24, fontSize: 11, padding: '0 8px' }}>{o}</T.Chip>)}</div></div>)}
    <span style={{ flex: 1 }} />
    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}><Meta T={T}>state in the URL</Meta><span style={{ flex: 1 }} /><OutBtn T={T} small>Reset</OutBtn></div>
  </div>;
}
const PendingPane = ({ T, money = true }) => <Pane style={{ padding: '8px 10px' }}><div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}><T.Chip icon="search" outline style={{ height: 28, flex: 1 }}>Customer or design</T.Chip><IconBtn T={T} icon="arrow-down-up" /></div><Meta T={T} style={{ display: 'block', margin: '0 6px 6px' }}>7 orders · 94 pcs · read-only · drag the edge to widen</Meta><PendingTree T={T} money={money} compact list={[DC[5], DC[2], DC[0], DC[1]]} /></Pane>;

/* 1 · Ready board */
function WebDReady({ T }) {
  return <DShell T={T} node="Ready" crumb={[]} paneTitle="Pending orders · 42" pane={<PendingPane T={T} />}>
    <QueueRail T={T} />
    <Main><Bar T={T} right={<div style={{ display: 'flex', gap: 6, alignItems: 'center' }}><Meta T={T}>updated just now</Meta><T.Chip icon="search" outline style={{ height: 30, width: 220 }}>Customer or design no</T.Chip><IconBtn T={T} icon="refresh-cw" /></div>}><Meta T={T}>Only customers with at least one in-stock line. No rates on this board.</Meta></Bar>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}><CustomerCard T={T} c={DC[2]} /><CustomerCard T={T} c={DC[0]} /><CustomerCard T={T} c={DC[3]} /><CustomerCard T={T} c={DC[1]} planned /></div>
    </Main>
  </DShell>;
}
/* 2 · Pending orders · full node with the queue rail (money for manager roles) */
function WebDPending({ T }) {
  const c = DC[5];
  return <DShell T={T} node="Ready" tab="Pending orders" crumb={['Pending orders']} paneTitle={c.name} pane={<Pane>
    <Meta T={T} style={{ display: 'block' }}>{c.market} · {c.city} · {c.tier} · customer since 2019</Meta>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 10 }}><T.Kpi small label="Customer score" value={c.score} sub="payment 88" /><T.Kpi small label="Open book" value="41" sub="pcs · ₹1,88,830" /><T.Kpi small label="At last step" value="9" sub="pcs coming" /><T.Kpi small label="Overdue" value="₹0" sub="2 bills open" tone="ok" /></div>
    <div style={{ display: 'flex', gap: 5, marginTop: 10, flexWrap: 'wrap' }}><CallChip T={T}>{c.phone}</CallChip><CallChip T={T} icon="truck">{c.transport}</CallChip><CallChip T={T} icon="user">{c.broker}</CallChip></div>
    <Sect T={T} style={{ margin: '14px 0 4px' }}>What is short</Sect>
    {[['6002', 'Blush', 5, 'at last step · Noor Tailors · 12/09'], ['2798', 'Purple', 9, 'nothing in production']].map(l => <div key={l[0] + l[1]} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderTop: `1px solid ${T.line}` }}><Thumb T={T} d={dOf(l[0])} w={28} h={35} r={6} /><span style={{ flex: 1, minWidth: 0 }}><div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}><Num T={T} size={15}>{l[0]}</Num><span style={{ fontSize: 11.5, color: T.ink2, display: 'inline-flex', alignItems: 'center', gap: 4 }}><Dot n={l[1]} s={7} />{l[1]}</span></div><Meta T={T} style={{ display: 'block', color: l[3].startsWith('nothing') ? T.danger : T.ink3 }}>{l[2]} short · {l[3]}</Meta></span></div>)}
    <div style={{ display: 'flex', gap: 6, marginTop: 12 }}><OutBtn T={T} small icon="package-x">Out of stock</OutBtn><OutBtn T={T} small icon="external-link">Dossier</OutBtn></div>
  </Pane>}>
    <QueueRail T={T} count="7 orders · 94 pcs · ₹4.6L" sorts={['Due days · oldest first', 'Short pcs', 'Pending value', 'Priority', 'Customer score']} quick={[['Due ≤ 2 d', false], ['Fully short', false], ['Has final-step qty', true], ['P1 / P2', false], ['In-stock only', false]]} />
    <Main><Bar T={T} right={<Meta T={T}>approval happens upstream · this list informs</Meta>}><Meta T={T}>Every approved order, in stock or not. Rates and amounts for manager roles only.</Meta></Bar>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, alignItems: 'start' }}><div><PendingTree T={T} money list={[DC[5]]} /></div><div><PendingTree T={T} money list={[DC[2], DC[0], DC[1], DC[3], DC[4]]} open="c3" openOrder="SO-3034" /></div></div>
    </Main>
  </DShell>;
}
/* Packing terminal pieces */
const ChipsRow = ({ T, on = 'c3', bar }) => <div style={{ display: 'flex', gap: 6, overflow: 'hidden', paddingBottom: 2 }}><CustomerChip T={T} all /><CustomerChip T={T} c={DC[2]} on={on === 'c3'} packed={5} ordered={12} inv={1} floor={3} /><CustomerChip T={T} c={DC[0]} packed={0} ordered={9} inv={0} floor={1} /><CustomerChip T={T} c={DC[5]} packed={12} ordered={20} inv={2} floor={1} oos={5} /><CustomerChip T={T} c={DC[3]} packed={7} ordered={9} inv={1} floor={1} /><CustomerChip T={T} c={DC[1]} packed={3} ordered={3} inv={1} floor={0} /><CustomerChip T={T} c={DC[4]} packed={2} ordered={8} inv={0} floor={2} oos={2} /></div>;
function CurrentOrder({ T }) {
  const c = DC[2]; const o = c.orders[0];
  return <div style={{ width: 284, flex: 'none', borderRight: `1px solid ${T.line}`, background: T.surface, padding: '12px 12px', overflow: 'hidden' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 16, fontWeight: 600, color: T.ink, flex: 1 }}>Current order</span><span style={{ fontFamily: T.fontUI, fontSize: 11, fontWeight: 600, padding: '1px 7px', borderRadius: 999, background: T.chipBg, color: T.ink2 }}>12 pcs</span><Hit T={T} icon="chevron-left" size={26} iconSize={13} style={{ background: T.chipBg }} /></div>
    <div style={{ fontFamily: T.fontDisplay, fontSize: 19, fontWeight: 600, color: T.ink, marginTop: 8, lineHeight: 1.1 }}>{c.name}</div><Meta T={T} style={{ display: 'block' }}>{c.market} · {c.city}</Meta>
    <div style={{ display: 'flex', gap: 5, marginTop: 6, overflow: 'hidden' }}><CallChip T={T}>{c.phone}</CallChip><CallChip T={T} icon="truck">{c.transport}</CallChip></div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 12 }}><Ic name="chevron-down" size={13} color={T.ink3} /><Mono T={T}>{o.no}</Mono><Meta T={T}>{o.date}</Meta><span style={{ flex: 1 }} /><Meta T={T}><b style={{ color: T.ink }}>5</b> / 12 pcs</Meta></div>
    <PackLine T={T} code="1243" colour="Mehroon" qty={3} packed={3} planned={3} stock={45} pending={0} pack compact />
    <PackLine T={T} code="3661" colour="Peach" qty={4} packed={1} planned={4} stock={3} pending={3} pack compact />
    <PackLine T={T} code="2798" colour="Sky" qty={5} packed={1} planned={5} stock={20} pending={4} pack compact />
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10 }}><Ic name="chevron-right" size={13} color={T.ink3} /><Mono T={T}>SO-3041</Mono><Meta T={T}>05/09/26</Meta><span style={{ flex: 1 }} /><Meta T={T}><b style={{ color: T.ink }}>0</b> / 6 pcs</Meta></div>
    <Meta T={T} style={{ display: 'block', marginTop: 12, whiteSpace: 'normal' }}>PACK › adds one piece to the open box for items that cannot be scanned. No rates on this side.</Meta>
  </div>;
}
const P_INV = { code: 'P00036', status: 'INVOICED', inv: 'SI-2287', lines: [['3661', 'Peach', 2, 2]] };
function PackingBoard({ T, scanOn, active = 'P00059', review, greyed, select, toast, dialog, bar }) {
  const c = DC[2]; const ps = XD.parcels;
  return <Main pad="10px 20px 16px" style={{ position: 'relative' }}>
    <ChipsRow T={T} />
    <Bar T={T} style={{ marginTop: 10 }} right={<div style={{ display: 'flex', gap: 6, alignItems: 'center' }}><Meta T={T}>4 boxes</Meta><IconBtn T={T} icon="chevrons-down-up" /><IconBtn T={T} icon="arrow-down-up" /><T.Chip icon="filter" outline style={{ height: 30 }}>Open · packed · invoiced</T.Chip></div>}>
      <OutBtn T={T} icon="scan-line" on={scanOn} style={{ height: 34 }}>{scanOn ? 'Scanning here · desk holds the scanner' : 'Scan here'}</OutBtn>
      <OutBtn T={T} icon="boxes" on={select} style={{ height: 34 }}>Select for shipment</OutBtn>
      <OutBtn T={T} icon="truck" style={{ height: 34, opacity: select ? 1 : .6 }}>Close shipment{select ? ' · 2' : ''}</OutBtn>
    </Bar>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, alignItems: 'start' }}>
      <ParcelCard T={T} p={ps[0]} c={c} active={active === 'P00059'} select={select} />
      <ParcelCard T={T} p={ps[1]} c={c} active={active === 'P00060'} select={select} />
      <ParcelCard T={T} p={greyed ? { ...ps[2], status: 'INVOICED', inv: 'SI-2288' } : ps[2]} c={c} review={review} greyed={greyed} select={select} ticked={select} />
      <ParcelCard T={T} p={P_INV} c={c} greyed select={select} ticked={select} />
    </div>
    <div className="press" style={{ marginTop: 12, height: 44, borderRadius: 14, border: `1.5px dashed ${T.line2}`, display: 'grid', placeItems: 'center', fontFamily: T.fontUI, fontSize: 13, color: T.ink2 }}>+ Add parcel</div>
    {toast && <div style={{ position: 'absolute', left: 20, right: 20, bottom: 18 }}>{toast}</div>}
    {bar && <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: 18, display: 'flex', alignItems: 'center', gap: 12, height: 52, padding: '0 8px 0 18px', borderRadius: 26, ...glass(T) }}>{bar}</div>}
    {dialog}
  </Main>;
}
/* 3 · Packing terminal · live */
function WebDPacking({ T }) {
  return <DShell T={T} node="Packing" subSuffix="Ambika Enterprises" paneTitle="Live invoice" pane={<Pane><InvoiceSheet T={T} state="live" compact /></Pane>}>
    <CurrentOrder T={T} /><PackingBoard T={T} />
  </DShell>;
}
/* 4 · Scan armed · rejected scan · remove confirm */
function WebDPackingScan({ T }) {
  const dialog = <div style={{ position: 'absolute', left: '50%', top: '42%', transform: 'translate(-50%,-50%)', width: 360, padding: 16, borderRadius: 18, background: T.surface, border: `1px solid ${T.line2}`, boxShadow: '0 30px 60px -20px rgba(0,0,0,.5)', zIndex: 3 }}><div style={{ display: 'flex', gap: 10 }}><Ic name="triangle-alert" size={20} color={T.warn} /><span style={{ flex: 1 }}><div style={{ fontFamily: T.fontUI, fontSize: 14, fontWeight: 600, color: T.ink }}>Remove 1 × 3661 Peach from P00059?</div><div style={{ fontFamily: T.fontUI, fontSize: 12.5, color: T.ink2, marginTop: 4 }}>The piece becomes scannable elsewhere. Serial PC-3661-0088 goes back to free stock.</div><div style={{ display: 'flex', gap: 8, marginTop: 12, justifyContent: 'flex-end' }}><OutBtn T={T} small>Keep</OutBtn><OutBtn T={T} small on>Remove</OutBtn></div></span></div></div>;
  return <DShell T={T} node="Packing" subSuffix="Ambika Enterprises" paneTitle="Live invoice" pane={<Pane><InvoiceSheet T={T} state="live" compact /><div style={{ marginTop: 10 }}><Toast T={T} kind="warn" title="Accepted with warning" sub="2798 · Sky · stock exhausted after this piece" /></div></Pane>}>
    <CurrentOrder T={T} /><PackingBoard T={T} scanOn dialog={dialog} toast={<Toast T={T} kind="danger" title="Rejected · not in this order" sub="6002 · Lilac (PC-6002-0417) is on no open order of Ambika Enterprises. Duplicate · not in this order · line full · parcel closed · unknown serial are the five loud reasons." />} />
  </DShell>;
}
/* 5 · Invoice review */
function WebDInvoiceReview({ T }) {
  return <DShell T={T} node="Packing" tab="Invoice review" subSuffix="Ambika Enterprises" paneTitle="Invoice · review" paneWidth={380} pane={<Pane><InvoiceSheet T={T} state="review" compact /></Pane>}>
    <CurrentOrder T={T} /><PackingBoard T={T} active={null} review />
  </DShell>;
}
/* 6 · Invoice done · select for shipment */
function WebDInvoiceDone({ T }) {
  return <DShell T={T} node="Packing" subSuffix="Ambika Enterprises" paneTitle="Invoice · done" paneWidth={380} pane={<Pane><InvoiceSheet T={T} state="done" compact /></Pane>}>
    <CurrentOrder T={T} /><PackingBoard T={T} active={null} greyed select bar={<><span style={{ fontFamily: T.fontUI, fontSize: 13, color: T.ink }}><b>2 parcels · 8 pcs</b> · Ambika Enterprises</span><T.Btn small icon="truck" style={{ height: 36 }}>Create shipment</T.Btn></>} />
  </DShell>;
}
/* 7 · Close shipment sheet */
function WebDShipmentSheet({ T }) {
  const sheet = <><div style={{ position: 'absolute', inset: 0, background: T.dark ? 'rgba(0,0,0,.5)' : 'rgba(36,23,18,.30)', backdropFilter: 'blur(3px)', zIndex: 20 }} /><div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 520, zIndex: 21, display: 'flex', flexDirection: 'column', ...glass(T, { background: T.dark ? 'rgba(28,21,18,.94)' : 'rgba(252,250,246,.96)', borderRadius: '22px 0 0 22px', boxShadow: '-30px 0 80px -30px rgba(0,0,0,.5)' }) }}>
    <div style={{ display: 'flex', alignItems: 'center', padding: '18px 22px 10px' }}><span style={{ flex: 1 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 24, fontWeight: 600, color: T.ink }}>Close shipment</div><Meta T={T}>Ambika Enterprises · trip 08/09/26 · SH-0412</Meta></span><Hit T={T} icon="x" size={36} iconSize={16} style={{ background: T.chipBg }} /></div>
    <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', padding: '0 22px' }}>
      <Sect T={T}>Consignee · ship to</Sect>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{['Ambika Enterprises, Chandni Chowk', 'Ambika · Karol Bagh gaddi', 'Ambika · Ludhiana branch'].map((n, i) => <T.Chip key={n} on={i === 0} outline={i !== 0} style={{ height: 32 }}>{n}</T.Chip>)}<T.Chip icon="plus" outline style={{ height: 32 }}>Add new</T.Chip></div>
      <Meta T={T} style={{ display: 'block', marginTop: 6 }}>Ledgers interconnected to this customer. The document keeps a snapshot; re-linking later never rewrites it.</Meta>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>{[['Transporter', 'Local delivery', 'truck'], ['Broker', 'Suman Traders', 'user'], ['Vehicle · LR no', 'DL 1C 4421 · LR 8817', 'hash'], ['Gate token', 'GT-260908-014 · auto', 'ticket']].map(([k, v, ic]) => <div key={k} style={{ padding: '8px 10px', borderRadius: 12, background: T.surface, border: `1px solid ${T.line}` }}><Meta T={T} style={{ display: 'block', fontSize: 10 }}>{k}</Meta><span style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: T.fontUI, fontSize: 12.5, color: T.ink }}><Ic name={ic} size={13} color={T.ink3} />{v}<span style={{ flex: 1 }} /><Ic name="chevron-down" size={12} color={T.ink3} /></span></div>)}</div>
      <Sect T={T} right={<Meta T={T}>invoiced, not yet shipped · unticked stay for the next trip</Meta>}>Parcels on this trip</Sect>
      {[['P00035', 'SI-2288', 2, true], ['P00036', 'SI-2287', 6, true], ['P00031', 'SI-2280', 4, false]].map(p => <div key={p[0]} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderTop: `1px solid ${T.line}` }}><span style={{ width: 18, height: 18, borderRadius: 5, border: `1.5px solid ${p[3] ? T.accent : T.line2}`, background: p[3] ? T.accent : 'transparent', color: '#fff', display: 'grid', placeItems: 'center' }}>{p[3] && <Ic name="check" size={12} sw={3} />}</span><Num T={T} size={17}>{p[0]}</Num><Mono T={T} size={11.5} weight={500} color={T.ink2}>{p[1]}</Mono><span style={{ flex: 1 }} /><Meta T={T}>{p[2]} pcs</Meta></div>)}
      <Sect T={T}>Note</Sect><div style={{ height: 40, borderRadius: 12, border: `1px solid ${T.line2}`, background: T.surface, display: 'flex', alignItems: 'center', padding: '0 12px', fontFamily: T.fontUI, fontSize: 12.5, color: T.ink }}>Fragile · 2 boxes · deliver before 6 pm</div>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 22px 20px', borderTop: `1px solid ${T.line}` }}><span style={{ fontFamily: T.fontUI, fontSize: 13, color: T.ink, whiteSpace: 'nowrap' }}><b>2 parcels · 8 pcs</b> · 2 invoices</span><span style={{ flex: 1 }} /><OutBtn T={T}>Cancel</OutBtn><T.Btn icon="truck" style={{ height: 44 }}>Issue transport document</T.Btn></div>
  </div></>;
  return <DShell T={T} node="Packing" subSuffix="Ambika Enterprises" paneTitle="Invoice · done" pane={<Pane><InvoiceSheet T={T} state="done" compact /></Pane>} overlay={sheet}>
    <CurrentOrder T={T} /><PackingBoard T={T} active={null} greyed select />
  </DShell>;
}
/* 8 · Print preview · A4 sale invoice and transport document */
function A4({ T, w = 500 }) {
  const ink = '#241712', mute = '#65524A', line = 'rgba(36,23,18,.14)';
  const rows = INV_LINES.map(l => [l[0], l[1], l[3], l[2], dOf(l[0], l[1]).price]); const sub = rows.reduce((s, r) => s + r[3] * r[4], 0), tax = Math.round(sub * .06), grand = sub + tax * 2;
  return <div style={{ width: w, background: '#FFFFFF', color: ink, padding: 28, borderRadius: 4, boxShadow: '0 30px 60px -20px rgba(0,0,0,.5)', fontFamily: T.fontUI, fontSize: 11, flex: 'none' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><img src={XD.A + 'logo/sutra-mark-gold.png'} style={{ height: 26 }} /><span style={{ flex: 1 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 22, fontWeight: 600 }}>Shree Radha Studio</div><div style={{ color: mute }}>9/112 Gandhi Nagar, Delhi 110031 · GSTIN 07AEZPA2938L2ZX · 011 2204 8811</div></span><span style={{ textAlign: 'right' }}><div style={{ fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: mute }}>Tax invoice</div><div style={{ fontFamily: T.fontMono, fontSize: 14, fontWeight: 600 }}>SI-2288</div><div style={{ color: mute }}>08/09/26 · book SI</div></span></div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginTop: 16, paddingTop: 12, borderTop: `1px solid ${line}` }}>
      <span><div style={{ fontSize: 9.5, letterSpacing: '.08em', textTransform: 'uppercase', color: mute }}>Bill to</div><b>Ambika Enterprises</b><div style={{ color: mute }}>Chandni Chowk, Delhi 110006<br />GSTIN 07AABCA1234F1Z5</div></span>
      <span><div style={{ fontSize: 9.5, letterSpacing: '.08em', textTransform: 'uppercase', color: mute }}>Goods for</div><b>Ambika Enterprises</b><div style={{ color: mute }}>Chandni Chowk, Delhi<br />via Local delivery</div></span>
      <span><div style={{ fontSize: 9.5, letterSpacing: '.08em', textTransform: 'uppercase', color: mute }}>Reference</div><div>Orders SO-3034<br />Parcel P00035 · 2 pcs<br />Gate token GT-260908-014</div></span>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '.5fr 1.4fr 1fr .7fr .5fr .8fr .9fr', gap: 6, marginTop: 14, padding: '6px 0', borderTop: `1px solid ${ink}`, borderBottom: `1px solid ${line}`, fontSize: 9.5, letterSpacing: '.06em', textTransform: 'uppercase', color: mute }}>{['#', 'Title', 'Colour', 'HSN', 'Qty', 'Rate', 'Amount'].map((h, i) => <span key={h} style={{ textAlign: i > 3 ? 'right' : 'left' }}>{h}</span>)}</div>
    {rows.map((r, i) => <div key={i} style={{ display: 'grid', gridTemplateColumns: '.5fr 1.4fr 1fr .7fr .5fr .8fr .9fr', gap: 6, padding: '6px 0', borderBottom: `1px solid ${line}`, fontVariantNumeric: 'tabular-nums' }}><span>{i + 1}</span><span><b style={{ fontFamily: T.fontDisplay, fontSize: 13 }}>{r[0]}</b> <span style={{ color: mute }}>{r[2]}</span></span><span>{r[1]}</span><span style={{ color: mute }}>—</span><span style={{ textAlign: 'right' }}>{r[3]}</span><span style={{ textAlign: 'right' }}>{r[4].toLocaleString('en-IN')}</span><span style={{ textAlign: 'right', fontWeight: 600 }}>{(r[3] * r[4]).toLocaleString('en-IN')}</span></div>)}
    <div style={{ display: 'flex', marginTop: 12, gap: 20 }}><span style={{ flex: 1, color: mute, fontStyle: 'italic', alignSelf: 'flex-end' }}>{inWords(grand)}<br /><span style={{ fontStyle: 'normal' }}>Goods once sold will not be taken back without a return entry. Subject to Delhi jurisdiction.</span></span><span style={{ width: 200, display: 'grid', gridTemplateColumns: '1fr auto', gap: '3px 10px', fontVariantNumeric: 'tabular-nums' }}><span style={{ color: mute }}>Taxable value</span><span style={{ textAlign: 'right' }}>{sub.toLocaleString('en-IN')}</span><span style={{ color: mute }}>CGST 6%</span><span style={{ textAlign: 'right' }}>{tax.toLocaleString('en-IN')}</span><span style={{ color: mute }}>SGST 6%</span><span style={{ textAlign: 'right' }}>{tax.toLocaleString('en-IN')}</span><span style={{ color: mute }}>Round off</span><span style={{ textAlign: 'right' }}>0.00</span><span style={{ fontWeight: 600, paddingTop: 4, borderTop: `1px solid ${ink}` }}>Grand total · {rows.reduce((s, r) => s + r[3], 0)} pcs</span><span style={{ textAlign: 'right', fontWeight: 700, fontSize: 14, paddingTop: 4, borderTop: `1px solid ${ink}` }}>{DIN(grand)}</span></span></div>
    <div style={{ display: 'flex', marginTop: 22, alignItems: 'flex-end' }}><span style={{ flex: 1, color: mute }}>Received in good condition<br /><br />____________________<br />Customer</span><span style={{ textAlign: 'right', color: mute }}>For Shree Radha Studio<br /><br />____________________<br />Authorised signatory</span></div>
  </div>;
}
function TransportDoc({ T, w = 300 }) {
  const ink = '#241712', mute = '#65524A', line = 'rgba(36,23,18,.14)';
  return <div style={{ width: w, background: '#FFFFFF', color: ink, padding: 20, borderRadius: 4, boxShadow: '0 30px 60px -20px rgba(0,0,0,.5)', fontFamily: T.fontUI, fontSize: 11, flex: 'none', alignSelf: 'flex-start' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><img src={XD.A + 'logo/sutra-mark-gold.png'} style={{ height: 20 }} /><span style={{ flex: 1 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 16, fontWeight: 600 }}>Transport document</div><div style={{ color: mute }}>Shree Radha Studio · Delhi</div></span><span style={{ fontFamily: T.fontMono, fontSize: 13, fontWeight: 600 }}>SH-0412</span></div>
    <div style={{ marginTop: 12, paddingTop: 10, borderTop: `1px solid ${line}`, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 10px' }}>{[['Date', '08/09/26'], ['Consignee', 'Ambika Enterprises, Chandni Chowk'], ['Transporter', 'Local delivery'], ['Vehicle · LR', 'DL 1C 4421 · LR 8817'], ['Broker', 'Suman Traders'], ['Gate token', 'GT-260908-014']].map(([k, v]) => <span key={k}><div style={{ fontSize: 9, letterSpacing: '.08em', textTransform: 'uppercase', color: mute }}>{k}</div>{v}</span>)}</div>
    <div style={{ marginTop: 12, borderTop: `1px solid ${ink}` }}>{[['P00035', 'SI-2288', 2], ['P00036', 'SI-2287', 6]].map(p => <div key={p[0]} style={{ display: 'flex', gap: 8, padding: '6px 0', borderBottom: `1px solid ${line}` }}><b style={{ fontFamily: T.fontDisplay, fontSize: 13 }}>{p[0]}</b><span style={{ color: mute }}>{p[1]}</span><span style={{ flex: 1 }} /><span>{p[2]} pcs</span></div>)}<div style={{ display: 'flex', padding: '6px 0', fontWeight: 600 }}>2 parcels<span style={{ flex: 1 }} />8 pcs</div></div>
    <div style={{ marginTop: 16, color: mute }}>Note · Fragile · deliver before 6 pm<br /><br />Guard ____________ &nbsp; Driver ____________</div>
  </div>;
}
function WebDPrint({ T }) {
  const ov = <><div style={{ position: 'absolute', inset: 0, background: T.dark ? 'rgba(0,0,0,.6)' : 'rgba(36,23,18,.42)', backdropFilter: 'blur(4px)', zIndex: 20 }} /><div style={{ position: 'absolute', inset: 0, zIndex: 21, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 0 0', overflow: 'hidden' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: 860 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 20, fontWeight: 600, color: '#fff' }}>Print · SI-2288 and SH-0412</span><span style={{ flex: 1 }} /><OutBtn T={T} icon="share-2" style={{ color: '#fff', borderColor: 'rgba(255,255,255,.35)' }}>WhatsApp PDF</OutBtn><OutBtn T={T} icon="download" style={{ color: '#fff', borderColor: 'rgba(255,255,255,.35)' }}>PDF</OutBtn><T.Btn icon="printer" style={{ height: 40 }}>Print A4 · 2 pages</T.Btn><Hit T={T} icon="x" size={36} iconSize={16} style={{ background: 'rgba(255,255,255,.15)', color: '#fff' }} /></div>
    <div style={{ display: 'flex', gap: 24, marginTop: 14, alignItems: 'flex-start' }}><A4 T={T} /><TransportDoc T={T} /></div>
  </div></>;
  return <DShell T={T} node="Packing" subSuffix="Ambika Enterprises" paneTitle="Invoice · done" pane={<Pane><InvoiceSheet T={T} state="done" compact /></Pane>} overlay={ov}><CurrentOrder T={T} /><PackingBoard T={T} active={null} greyed /></DShell>;
}
/* 9 · Billed · sale invoices */
function WebDBilled({ T }) {
  return <DShell T={T} node="Billed" subSuffix="today" paneTitle="SI-2288" paneWidth={380} pane={<Pane>
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{[['Customer score', '74'], ['Last broker', 'Suman Traders'], ['Last purchase', '27/08/26 · ₹18,980'], ['Voucher', 'SI-2288 · Busy ok'], ['Delivered', '11/09/26 (est. +3 d)']].map(([k, v]) => <span key={k} style={{ padding: '6px 10px', borderRadius: 12, background: T.surface2, border: `1px solid ${T.line}` }}><Meta T={T} style={{ display: 'block', fontSize: 10 }}>{k}</Meta><span style={{ fontFamily: T.fontUI, fontSize: 12.5, fontWeight: 500, color: T.ink }}>{v}</span></span>)}</div>
    <div style={{ marginTop: 10 }}><InvoiceSheet T={T} state="done" compact /></div>
    <div style={{ display: 'flex', gap: 8, marginTop: 10 }}><OutBtn T={T} icon="rotate-ccw" style={{ flex: 1, justifyContent: 'center' }}>Return against this</OutBtn><OutBtn T={T} icon="external-link" style={{ flex: 1, justifyContent: 'center' }}>Customer dossier</OutBtn></div>
  </Pane>}>
    <Main><Bar T={T} right={<div style={{ display: 'flex', gap: 6 }}><T.Chip icon="search" outline style={{ height: 30, width: 220 }}>Invoice, order or customer</T.Chip><IconBtn T={T} icon="arrow-down-up" /><IconBtn T={T} icon="download" /></div>}>
      <div style={{ display: 'flex', gap: 2, padding: 3, borderRadius: 999, background: T.bg2 }}>{['Sale invoices', 'Shipments history'].map((t, i) => <span key={t} className="press" style={{ height: 28, padding: '0 14px', borderRadius: 999, display: 'grid', placeItems: 'center', background: !i ? T.surface : 'transparent', fontFamily: T.fontUI, fontSize: 12.5, fontWeight: !i ? 600 : 400, color: !i ? T.ink : T.ink2 }}>{t}</span>)}</div>
      <T.Chip on x style={{ height: 30 }}>Today</T.Chip><T.Chip outline style={{ height: 30 }}>Tier ▾</T.Chip><T.Chip outline style={{ height: 30 }}>Transport ▾</T.Chip><T.Chip outline style={{ height: 30 }}>Return initiated</T.Chip><T.Chip outline style={{ height: 30 }}>Unshipped parcels</T.Chip>
    </Bar>
      <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}><T.Kpi small label="Invoices today" value="4" sub="2 customers" /><T.Kpi small label="Pcs billed" value="14" sub="today" /><T.Kpi small label="Billed" value="₹63,340" sub="GST extra" /><T.Kpi small label="Still pending" value="12" sub="pcs for these customers" tone="warn" /></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, alignItems: 'start' }}>{BILLED.map((g, i) => <BilledGroup key={i} T={T} g={g} money invoiceOn={i === 0 ? 'SI-2288' : null} />)}</div>
    </Main>
  </DShell>;
}
/* 10 · Billed · shipments history */
function WebDShipments({ T }) {
  return <DShell T={T} node="Billed" tab="Shipments" subSuffix="shipments" paneTitle="SH-0412 · transport document" paneWidth={360} pane={<Pane style={{ display: 'flex', flexDirection: 'column', gap: 10 }}><div style={{ transform: 'scale(.92)', transformOrigin: 'top left', width: 300 }}><TransportDoc T={T} w={330} /></div><div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}><OutBtn T={T} icon="printer" style={{ flex: 1, justifyContent: 'center' }}>Re-print</OutBtn><OutBtn T={T} icon="share-2" style={{ flex: 1, justifyContent: 'center' }}>WhatsApp</OutBtn></div></Pane>}>
    <Main><Bar T={T} right={<div style={{ display: 'flex', gap: 6 }}><T.Chip icon="search" outline style={{ height: 30, width: 220 }}>Shipment, invoice, consignee</T.Chip><IconBtn T={T} icon="arrow-down-up" /><IconBtn T={T} icon="download" /></div>}>
      <div style={{ display: 'flex', gap: 2, padding: 3, borderRadius: 999, background: T.bg2 }}>{['Sale invoices', 'Shipments history'].map((t, i) => <span key={t} className="press" style={{ height: 28, padding: '0 14px', borderRadius: 999, display: 'grid', placeItems: 'center', background: i ? T.surface : 'transparent', fontFamily: T.fontUI, fontSize: 12.5, fontWeight: i ? 600 : 400, color: i ? T.ink : T.ink2 }}>{t}</span>)}</div>
      <T.Chip on x style={{ height: 30 }}>This week</T.Chip><T.Chip outline style={{ height: 30 }}>Transport ▾</T.Chip><T.Chip outline style={{ height: 30 }}>Broker ▾</T.Chip><T.Chip outline style={{ height: 30 }}>Not delivered yet</T.Chip>
    </Bar>
      <div style={{ borderRadius: 18, background: T.surface, border: `1px solid ${T.line}`, overflow: 'hidden' }}><THead T={T} lead={0} cols={[['Shipment · date · consignee'], ['Parcels · pcs', 110], ['Gate token', 130], ['', 40]]} />{SHIPS.map((s, i) => <ShipmentRow key={s[0]} T={T} s={s} open={i === 0} on={i === 0} />)}{[['SH-0408', '05/09/26', 'Preeti Fashion Hub', 'Punjab Freight', 'Harjeet Singh', 2, 9, 'SI-2252 · SI-2253', 'GT-260905-018'], ['SH-0407', '05/09/26', 'A V Creation', 'Patel Parcel Service', 'Shubham Marketing', 1, 7, 'SI-2250', 'GT-260905-012']].map(s => <ShipmentRow key={s[0]} T={T} s={s} />)}</div>
      <Meta T={T} style={{ display: 'block', marginTop: 8 }}>Delivered on = dispatch + 3 days unless the customer confirms earlier. Each row re-prints its transport document.</Meta>
    </Main>
  </DShell>;
}
/* 11 · Out of stock */
const WAITING = [['Nalli Fashion Mart', 'SO-2607', -24, 9, 'Purple', 'nothing in production'], ['Ambika Enterprises', 'SO-3034', 12, 4, 'Sky', 'Saleem Creation · at last step · 14 on 04/09'], ['Rangoli Ethnic Wear', 'SO-2631', 3, 6, 'Sky', 'Saleem Creation · at last step'], ['Aneri Boutique', 'SO-3036', 12, 6, 'Seagreen', 'Rafiq Bhai · due 24/09']];
function WebDOOS({ T }) {
  return <DShell T={T} node="Out of stock" subSuffix="14 designs" paneTitle="2798 · who is waiting" pane={<Pane>
    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}><Thumb T={T} d={dOf('2798')} w={48} h={60} r={10} /><span><Num T={T} size={22}>2798</Num><Meta T={T} style={{ display: 'block' }}>Plazo set · 25 pcs short · 3 orders</Meta><div style={{ display: 'flex', gap: 5, marginTop: 4 }}><Pill T={T} tone="ok" small>Sourceable now</Pill><Pill T={T} tone="warn" small>Priority Production</Pill></div></span></div>
    <Sect T={T} right={<Meta T={T}>due soonest first</Meta>}>Orders wanting it</Sect>
    {WAITING.map(w => <div key={w[1]} style={{ padding: '7px 0', borderTop: `1px solid ${T.line}` }}><div style={{ display: 'flex', alignItems: 'center', gap: 7 }}><span style={{ flex: 1, minWidth: 0, fontFamily: T.fontUI, fontSize: 12.5, fontWeight: 500, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{w[0]}</span><Mono T={T} size={11}>{w[1]}</Mono><DuePill T={T} d={w[2]} /></div><div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}><Dot n={w[4]} s={7} /><Meta T={T} style={{ flex: 1 }}>{w[3]} × {w[4]} · {w[5]}</Meta><span className="press" style={{ width: 24, height: 24, borderRadius: 12, background: T.chipBg, display: 'grid', placeItems: 'center', color: T.ink2 }}><Ic name="phone" size={11} /></span></div></div>)}
    <Sect T={T}>Call and promise</Sect>
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}><KarigarPill T={T} /><KarigarPill T={T} name="Rafiq Bhai" score={64} /></div>
    <div style={{ display: 'flex', gap: 6, marginTop: 10 }}><OutBtn T={T} small icon="calendar">Promise a date</OutBtn><OutBtn T={T} small icon="scissors">Open in Production</OutBtn></div>
  </Pane>}>
    <Main><Bar T={T} right={<div style={{ display: 'flex', gap: 6 }}><T.Chip icon="search" outline style={{ height: 30, width: 200 }}>Design no or karigar</T.Chip><T.Chip icon="arrow-down-up" outline style={{ height: 30 }}>Due soonest</T.Chip><T.Chip icon="hammer" outline style={{ height: 30 }}>Karigar ▾</T.Chip></div>}>
      <div style={{ display: 'flex', gap: 2, padding: 3, borderRadius: 999, background: T.bg2 }}>{['Order shortages · 9', 'Restock suggestions · 5'].map((t, i) => <span key={t} className="press" style={{ height: 28, padding: '0 14px', borderRadius: 999, display: 'grid', placeItems: 'center', background: !i ? T.surface : 'transparent', fontFamily: T.fontUI, fontSize: 12.5, fontWeight: !i ? 600 : 400, color: !i ? T.ink : T.ink2, whiteSpace: 'nowrap' }}>{t}</span>)}</div>
      <T.Chip outline style={{ height: 30 }}>Sourceable now</T.Chip><T.Chip outline style={{ height: 30 }}>Nothing in production</T.Chip><T.Chip outline style={{ height: 30 }}>At last step</T.Chip><T.Chip outline style={{ height: 30 }}>Priority Production</T.Chip><T.Chip on style={{ height: 30 }}>Everything short</T.Chip>
    </Bar>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}><T.Kpi small label="Pcs to produce" value="118" sub="owed or about to be" /><T.Kpi small label="Sourceable now" value="42" sub="at the last step with karigars" /><T.Kpi small label="In production" value="51" sub="not at the last step" /><T.Kpi small label="Nothing in production" value="25" sub="open in Production →" tone="danger" /></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, alignItems: 'start' }}><OOSCard T={T} style={{ boxShadow: `0 0 0 2px ${T.accentSoft}`, borderColor: T.accentLine }} /><div><OOSCard T={T} code="6002" sourcing="none" /><div style={{ height: 12 }} /><OOSCard T={T} code="3661" kind="restock" sourcing="prod" /></div></div>
    </Main>
  </DShell>;
}
/* 12–14 · Warehouse stock */
const StockBars = ({ T, free = 20, res = 5, coming = 30 }) => { const tot = free + res + coming; return <div><div style={{ display: 'flex', height: 10, borderRadius: 5, overflow: 'hidden', background: T.line }}><span style={{ width: `${free / tot * 100}%`, background: T.ok }} /><span style={{ width: `${res / tot * 100}%`, background: T.warn }} /><span style={{ width: `${coming / tot * 100}%`, background: T.blue, opacity: .6 }} /></div><div style={{ display: 'flex', gap: 10, marginTop: 6, fontFamily: T.fontUI, fontSize: 11, color: T.ink2 }}>{[[T.ok, `${free} free`], [T.warn, `${res} reserved`], [T.blue, `${coming} coming`]].map(([c, l]) => <span key={l} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: c }} />{l}</span>)}</div></div>; };
function StockShell({ T, tab, tiles, children, pane, paneTitle, chips, placeholder }) {
  return <DShell T={T} node="Stock" tab={tab} subSuffix={tab} paneTitle={paneTitle} pane={pane}>
    <Main><Bar T={T} right={<div style={{ display: 'flex', gap: 6 }}><T.Chip icon="search" outline style={{ height: 30, width: 210 }}>{placeholder}</T.Chip><T.Chip icon="arrow-down-up" outline style={{ height: 30 }}>Scarcity first</T.Chip><IconBtn T={T} icon="download" /></div>}>
      <div style={{ display: 'flex', gap: 2, padding: 3, borderRadius: 999, background: T.bg2 }}>{['Finished goods', 'Material', 'Work in progress', 'FG inward'].map(t => <span key={t} className="press" style={{ height: 28, padding: '0 14px', borderRadius: 999, display: 'grid', placeItems: 'center', background: t === tab ? T.surface : 'transparent', fontFamily: T.fontUI, fontSize: 12.5, fontWeight: t === tab ? 600 : 400, color: t === tab ? T.ink : T.ink2, whiteSpace: 'nowrap' }}>{t}</span>)}</div>
      {chips.map(([l, on]) => <T.Chip key={l} on={on} outline={!on} x={on} style={{ height: 30 }}>{l}</T.Chip>)}
    </Bar>
      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>{tiles.map(t => <T.Kpi key={t[0]} small label={t[0]} value={t[1]} sub={t[2]} tone={t[3]} />)}</div>
      {children}
    </Main>
  </DShell>;
}
function WebDStockFG({ T }) {
  return <StockShell T={T} tab="Finished goods" placeholder="Design no or colour" chips={[['Out', false], ['Low', true], ['In production', false], ['Reserved', false], ['Free > 0', false]]} tiles={[['SKUs in set', '4,010', 'whole filtered set, not the page'], ['Pcs in stock', '31,884', 'free + reserved'], ['Low', '212', 'SKUs', 'warn'], ['Out of stock', '87', 'SKUs', 'danger']]} paneTitle="3661 · Peach" pane={<Pane>
    <div style={{ display: 'flex', gap: 10 }}><Thumb T={T} d={dOf('3661')} w={56} h={70} r={10} /><span><Num T={T} size={22}>3661</Num><Meta T={T} style={{ display: 'block' }}>Drape saree · Peach · ₹5,995</Meta><div style={{ marginTop: 4 }}><Pill T={T} tone="warn" small>Low</Pill></div></span></div>
    <Sect T={T}>Stock by state</Sect><StockBars T={T} free={3} res={12} coming={20} />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 10 }}><T.Kpi small label="Last inward" value="20" sub="04/09 · PO-1174" /><T.Kpi small label="Days of cover" value="8" sub="selling 2/day" tone="warn" /><T.Kpi small label="Last sale" value="Today" sub="Ambika · 2 pcs" /><T.Kpi small label="Open orders" value="7" sub="pcs wanting it" /></div>
    <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}><OutBtn T={T} small icon="package-x">In Out of stock</OutBtn><OutBtn T={T} small icon="git-branch">Reserve for Raaslila</OutBtn><OutBtn T={T} small icon="external-link">Product page</OutBtn></div>
  </Pane>}>
    <div style={{ borderRadius: 18, background: T.surface, border: `1px solid ${T.line}`, overflow: 'hidden' }}><THead T={T} cols={[['Design · colour'], ['Free', 48], ['Reserved', 56], ['FG', 48], ['In prod.', 64], ['Status', 96]]} />{FG_ROWS.map((r, i) => <StockRow key={i} T={T} r={r} on={i === 0} />)}</div>
    <Meta T={T} style={{ display: 'block', marginTop: 8 }}>7 of 299 low or out · scarcity first · scrolls, never truncates the totals above.</Meta>
  </StockShell>;
}
function WebDStockMat({ T }) {
  return <StockShell T={T} tab="Material" placeholder="Material code or shade" chips={[['Low', true], ['Out', false], ['On order', false], ['Used by active job', false]]} tiles={[['Materials', '612', 'in set'], ['Below reorder', '38', 'materials', 'warn'], ['Out', '11', 'materials', 'danger'], ['On order', '21', 'arriving this week']]} paneTitle="NET-04 · Soft net · Sky" pane={<Pane>
    <div style={{ display: 'flex', gap: 10 }}><span style={{ width: 56, height: 70, borderRadius: 10, background: XD.cols.Sky, flex: 'none' }} /><span><Num T={T} size={20}>NET-04</Num><Meta T={T} style={{ display: 'block' }}>Soft net · Sky · metres</Meta><div style={{ marginTop: 4 }}><Pill T={T} tone="danger" fill small>Out of stock</Pill></div></span></div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 12 }}><T.Kpi small label="On hand" value="0 m" sub="reorder at 50 m" tone="danger" /><T.Kpi small label="On order" value="120 m" sub="PO-0921 · due 10/09" /><T.Kpi small label="Consumed" value="64 m" sub="this month" /><T.Kpi small label="Holding jobs" value="2" sub="2798 embroidery · 6002" tone="warn" /></div>
    <Sect T={T}>Supplier</Sect><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ flex: 1, fontFamily: T.fontUI, fontSize: 13, color: T.ink }}>Mumbai Fabrics<Meta T={T} style={{ display: 'block' }}>last GRN 21/08 · 200 m · ₹48/m</Meta></span><CallChip T={T}>98200 44110</CallChip></div>
    <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}><OutBtn T={T} small icon="plus">Purchase order</OutBtn><OutBtn T={T} small icon="external-link">Where used</OutBtn></div>
  </Pane>}>
    <div style={{ borderRadius: 18, background: T.surface, border: `1px solid ${T.line}`, overflow: 'hidden' }}><THead T={T} cols={[['Material · shade'], ['On hand', 56], ['On order', 56], ['Consumed', 64], ['Reorder', 60], ['Supplier', 110], ['Status', 96]]} />{MAT_ROWS.map((r, i) => <StockRow key={i} T={T} kind="mat" r={r} on={i === 1} />)}</div>
    <Meta T={T} style={{ display: 'block', marginTop: 8 }}>Reorder levels are new here: the Hub has none yet (U34).</Meta>
  </StockShell>;
}
function WebDStockWIP({ T }) {
  return <StockShell T={T} tab="Work in progress" placeholder="Design, process or karigar" chips={[['Waiting on floor', false], ['With karigar', true], ['Aged', false], ['Next process ready', false], ['Stuck', false]]} tiles={[['Pcs in WIP', '1,240', 'all steps'], ['With karigars', '1,022', 'pcs'], ['On our floor', '218', 'waiting for the next issue'], ['Aged > 20 d', '140', 'pcs', 'warn']]} paneTitle="Rafiq Bhai · dyeing" pane={<Pane>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ width: 44, height: 44, borderRadius: 22, background: T.chipBg, display: 'grid', placeItems: 'center', color: T.ink2 }}><Ic name="hammer" size={20} /></span><span style={{ flex: 1 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 18, fontWeight: 600, color: T.ink }}>Rafiq Bhai</div><Meta T={T} style={{ display: 'block' }}>Dyeing · score 64 · on time 71%</Meta></span><CallChip T={T}>98110 20031</CallChip></div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 12 }}><T.Kpi small label="With him" value="9" sub="pcs · 2798 Purple" tone="warn" /><T.Kpi small label="Days at step" value="38" sub="due was 12/08" tone="danger" /><T.Kpi small label="Material with him" value="₹4,120" sub="net · dye" /><T.Kpi small label="Open jobs" value="3" sub="1 delayed" /></div>
    <Sect T={T}>Next</Sect><Meta T={T} style={{ display: 'block', whiteSpace: 'normal' }}>2798 Purple dyed pieces go to embroidery at Saleem Creation. 9 pcs are wanted by Nalli Fashion Mart, 24 d over.</Meta>
    <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}><OutBtn T={T} small icon="scissors">Open job card</OutBtn><OutBtn T={T} small icon="message-circle">WhatsApp reminder</OutBtn></div>
  </Pane>}>
    <div style={{ borderRadius: 18, background: T.surface, border: `1px solid ${T.line}`, overflow: 'hidden' }}><THead T={T} cols={[['Design · colour · step · holder'], ['Pcs', 48], ['At step', 56], ['', 96]]} />{WIP_ROWS.map((r, i) => <StockRow key={i} T={T} kind="wip" r={r} on={i === 1} />)}</div>
  </StockShell>;
}
/* 15 · FG inward */
function WebDFGInward({ T }) {
  return <StockShell T={T} tab="FG inward" placeholder="Job, design or karigar" chips={[['Arrived today', true], ['Waiting count', false], ['Short', false], ['Verified', false]]} tiles={[['At the gate', '2', 'jobs · last process'], ['Pcs claimed', '40', 'by the karigars'], ['Counted', '39', 'so far'], ['Short', '1', 'pcs · Seagreen', 'warn']]} paneTitle="GT-260908-009 · gate token" pane={<Pane>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ width: 44, height: 44, borderRadius: 12, background: T.chipBg, display: 'grid', placeItems: 'center', color: T.ink2 }}><Ic name="ticket" size={20} /></span><span style={{ flex: 1 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 18, fontWeight: 600, color: T.ink }}>Noor Tailors</div><Meta T={T} style={{ display: 'block' }}>auto token · PO-1187 receive · 09:04 at the gate</Meta></span></div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 12 }}><T.Kpi small label="Claimed" value="2" sub="bundles · 20 pcs" /><T.Kpi small label="Counted" value="19" sub="1 short · Seagreen" tone="warn" /><T.Kpi small label="Job rate" value="₹110" sub="per pc · stitching" /><T.Kpi small label="Payment due" value="₹2,090" sub="on 19 pcs · 30 d" /></div>
    <Sect T={T}>What happens on verify</Sect><Meta T={T} style={{ display: 'block', whiteSpace: 'normal' }}>19 pcs enter finished goods for 2798 Sky and Seagreen, the karigar's due is raised for 19 pcs, the token closes, and Ready re-checks the pending orders wanting 2798.</Meta>
    <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}><OutBtn T={T} small icon="scissors">Open lifecycle</OutBtn><OutBtn T={T} small icon="printer">Receive sticker</OutBtn></div>
  </Pane>}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, alignItems: 'start' }}><FGInwardCard T={T} j={FGI_JOBS[0]} on /><FGInwardCard T={T} j={FGI_JOBS[1]} /></div>
    <Meta T={T} style={{ display: 'block', marginTop: 4 }}>The process marked "last" in Production arrives here, not as a production receive. This is where the count enters stock accounting.</Meta>
  </StockShell>;
}
/* 16–19 · Sale return wizard */
function RetShell({ T, step, children, pane, paneTitle, foot }) {
  return <DShell T={T} node="Sale return" subSuffix={`step ${step} of 4`} paneTitle={paneTitle} paneWidth={360} pane={pane}>
    <Main style={{ display: 'flex', flexDirection: 'column' }}><div style={{ padding: '2px 0 12px', borderBottom: `1px solid ${T.line}`, marginBottom: 12 }}><StepRail T={T} step={step} /></div><div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>{children}</div><div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 12, borderTop: `1px solid ${T.line}` }}>{foot}</div></Main>
  </DShell>;
}
const CounterPane = ({ T }) => { const c = DC[4]; return <Pane>
  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Monogram T={T} c={c} s={40} /><span style={{ flex: 1 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 18, fontWeight: 600, color: T.ink }}>{c.name}</div><Meta T={T} style={{ display: 'block' }}>{c.city} · {c.tier} · broker {c.broker}</Meta></span></div>
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 12 }}><T.Kpi small label="Customer score" value={c.score} sub="payment 71" /><T.Kpi small label="GR ratio" value="4%" sub="6 of 148 pcs · FY" tone="ok" /><T.Kpi small label="Overdue" value="₹26,970" sub="SI-2271 · 12 d" tone="warn" /><T.Kpi small label="Credit line" value="62%" sub="₹1.2L used of ₹2L" /></div>
  <Sect T={T} right={<Meta T={T}>tap to pick</Meta>}>Last bills</Sect>{RET_BILLS.map(b => <div key={b[0]} style={{ display: 'flex', alignItems: 'center', gap: 8, height: 36, borderTop: `1px solid ${T.line}` }}><Mono T={T} size={11.5}>{b[0]}</Mono><Meta T={T} style={{ flex: 1 }}>{b[1]} · {b[3]} pcs · {b[2]}</Meta><span style={{ fontFamily: T.fontSerif, fontSize: 13, fontWeight: 600, color: T.ink }}>{DIN(b[4])}</span></div>)}
  <Meta T={T} style={{ display: 'block', marginTop: 10, whiteSpace: 'normal' }}>Accounts approves the note after you raise it, seeing the same score, return ratio and bills.</Meta>
</Pane>; };
function WebDRet1({ T }) {
  return <RetShell T={T} step={1} paneTitle="Customer at the counter" pane={<CounterPane T={T} />} foot={<><Meta T={T}>Draft saves itself · SR-0117</Meta><span style={{ flex: 1 }} /><OutBtn T={T}>Cancel</OutBtn><T.Btn icon="chevron-right" style={{ height: 44 }}>Pieces · box 1 of 1</T.Btn></>}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
      <div><Sect T={T} style={{ marginTop: 0 }}>Customer</Sect><div style={{ height: 44, borderRadius: 14, border: `1px solid ${T.accent}`, boxShadow: `0 0 0 3px ${T.accentSoft}`, background: T.surface, display: 'flex', alignItems: 'center', gap: 10, padding: '0 12px' }}><Monogram T={T} c={DC[4]} s={24} /><span style={{ flex: 1, fontFamily: T.fontUI, fontSize: 14, color: T.ink }}>Aneri Boutique, Anand</span><Ic name="chevron-down" size={14} color={T.ink3} /></div>
        <Sect T={T}>Boxes at the counter</Sect><div style={{ padding: 14, borderRadius: 16, background: T.surface2, border: `1px solid ${T.line}`, display: 'flex', alignItems: 'center', gap: 12 }}><span style={{ flex: 1, fontFamily: T.fontUI, fontSize: 13, color: T.ink }}>Parcels accepted<Meta T={T} style={{ display: 'block', whiteSpace: 'normal' }}>count first. A box may carry pieces from many bills; you choose one note per box or per bill at step 4.</Meta></span><T.Step v={1} big /></div>
        <Sect T={T}>Gate</Sect><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><GateToken T={T} n="GT-260908-021" /><Meta T={T}>manual token by the guard · 1 box · Aneri · matches</Meta></div></div>
      <div><Sect T={T} style={{ marginTop: 0 }} right={<Meta T={T}>dispatched or invoiced · pick many</Meta>}>Bills being credited</Sect>
        {RET_BILLS.map((b, i) => <div key={b[0]} className="press" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 14, background: T.surface, border: `1px solid ${i < 2 ? T.accentLine : T.line}`, marginBottom: 6 }}><span style={{ width: 20, height: 20, borderRadius: 6, border: `1.5px solid ${i < 2 ? T.accent : T.line2}`, background: i < 2 ? T.accent : 'transparent', color: '#fff', display: 'grid', placeItems: 'center', flex: 'none' }}>{i < 2 && <Ic name="check" size={12} sw={3} />}</span><span style={{ flex: 1, minWidth: 0 }}><div style={{ display: 'flex', alignItems: 'baseline', gap: 7 }}><Mono T={T}>{b[0]}</Mono><Meta T={T}>{b[1]} · parcels {b[2]}</Meta></div><Meta T={T} style={{ display: 'block' }}>{b[3]} pcs · delivered · {DIN(b[4])}</Meta></span><Pill T={T} tone={i === 1 ? 'warn' : 'ok'} small>{i === 1 ? 'in transit' : 'delivered'}</Pill></div>)}</div>
    </div>
  </RetShell>;
}
function WebDRet2({ T }) {
  return <RetShell T={T} step={2} paneTitle="Credit note · building" pane={<Pane><Meta T={T} style={{ display: 'block', marginBottom: 6 }}>Box 1 of 1 · rates at the order's price</Meta><ReturnLines T={T} money /><Sect T={T}>Split</Sect><div style={{ display: 'flex', gap: 6 }}><T.Chip on style={{ height: 28 }}>One note per bill</T.Chip><T.Chip outline style={{ height: 28 }}>One note per box</T.Chip></div><Meta T={T} style={{ display: 'block', marginTop: 8, whiteSpace: 'normal' }}>SI-2271 → CN-0003 · SI-2265 → CN-0004. Raised together at step 4.</Meta></Pane>} foot={<><OutBtn T={T} icon="plus">Next box</OutBtn><span style={{ flex: 1 }} /><OutBtn T={T}>Back</OutBtn><T.Btn icon="chevron-right" style={{ height: 44 }}>Preview · 4 pcs</T.Btn></>}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 14, alignItems: 'start' }}>
      <div><div style={{ borderRadius: 18, overflow: 'hidden' }}><ScanCam T={T} h={260}><div style={{ position: 'absolute', left: 12, top: 10, display: 'inline-flex', alignItems: 'center', gap: 8, height: 30, padding: '0 10px', borderRadius: 15, ...veil(), fontFamily: T.fontUI, fontSize: 12 }}>Desk scanner armed · box 1</div><div style={{ position: 'absolute', left: 12, right: 12, bottom: 12 }}><Toast T={T} kind="ok" title="2006 · Lavender · line now 2" sub="from SI-2271 at ₹4,995 · repeat scans bump the line" style={{ ...veil(), borderColor: T.ok + '99', color: '#fff' }} /></div></ScanCam></div>
        <Sect T={T}>Or search a design and tap a colour</Sect><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><T.Chip icon="search" outline style={{ height: 34, flex: 1 }}>6002</T.Chip><Thumb T={T} d={dOf('6002')} w={30} h={38} r={7} />{['Lilac', 'Blush'].map(n => <T.Chip key={n} outline style={{ height: 30 }}><Dot n={n} s={8} />{n}</T.Chip>)}</div></div>
      <div><Sect T={T} style={{ marginTop: 0 }} right={<Meta T={T}>qty editable · 0 removes</Meta>}>Pieces in box 1</Sect><div style={{ padding: '0 14px', borderRadius: 18, background: T.surface, border: `1px solid ${T.line}` }}><ReturnLines T={T} money={false} edit quiet /></div></div>
    </div>
  </RetShell>;
}
function WebDRet3({ T }) {
  return <RetShell T={T} step={3} paneTitle="Credit notes · 2" pane={<Pane>{[['CN-260908-0003', 'SI-2271', '3 pcs', 14985], ['CN-260908-0004', 'SI-2265', '1 pc', 3995]].map(n => <div key={n[0]} style={{ padding: '10px 0', borderTop: `1px solid ${T.line}` }}><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Mono T={T}>{n[0]}</Mono><Meta T={T}>against {n[1]} · {n[2]}</Meta><span style={{ flex: 1 }} /><span style={{ fontFamily: T.fontSerif, fontSize: 15, fontWeight: 600, color: T.ink }}>{DIN(n[3])}</span></div></div>)}<div style={{ display: 'flex', alignItems: 'baseline', gap: 8, paddingTop: 8, borderTop: `1px solid ${T.line2}` }}><Meta T={T}>Total credit</Meta><span style={{ flex: 1 }} /><PriceF v={18980} size={22} font={T.fontSerif} color={T.ink} dim={T.ink3} /></div><Meta T={T} style={{ display: 'block', marginTop: 10, whiteSpace: 'normal' }}>Both notes go to accounts approval, then to Busy. Stock stays "on approval" until then.</Meta></Pane>} foot={<><OutBtn T={T}>Back</OutBtn><span style={{ flex: 1 }} /><OutBtn T={T} icon="save">Save draft</OutBtn><T.Btn icon="check" style={{ height: 44, opacity: .55 }}>Raise credit notes</T.Btn></>}>
    <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 14, alignItems: 'start' }}>
      <div style={{ padding: '0 14px 10px', borderRadius: 18, background: T.surface, border: `1px solid ${T.line}` }}><Sect T={T}>Preview</Sect><ReturnLines T={T} money /></div>
      <div><div style={{ padding: 12, borderRadius: 16, background: T.surface2, border: `1px solid ${T.line}` }}><Meta T={T} style={{ display: 'block', fontSize: 10.5, letterSpacing: '.06em', textTransform: 'uppercase' }}>Note</Meta><div style={{ fontFamily: T.fontUI, fontSize: 13, color: T.ink, marginTop: 4 }}>Lilac colour mismatch · customer kept 1 of 2 · Kishore bhai informed</div></div>
        <div style={{ padding: 12, borderRadius: 16, background: T.surface, border: `1px solid ${T.warn}66`, marginTop: 10 }}><div style={{ display: 'flex', gap: 8 }}><Ic name="triangle-alert" size={16} color={T.warn} /><span style={{ fontFamily: T.fontUI, fontSize: 12.5, color: T.ink }}><b>Before you can submit</b><div style={{ color: T.ink2, marginTop: 4 }}>· SI-2265 is on shipment SH-0411, not yet marked delivered. Confirm receipt, or drop the 1457 line.</div><div style={{ color: T.ink2, marginTop: 2 }}>· 1 box counted at the gate (GT-260908-021) matches 1 box here.</div><div style={{ display: 'flex', gap: 6, marginTop: 8 }}><OutBtn T={T} small icon="check">Mark SH-0411 delivered</OutBtn><OutBtn T={T} small>Drop 1457</OutBtn></div></span></div></div></div>
    </div>
  </RetShell>;
}
function WebDRet4({ T }) {
  return <RetShell T={T} step={4} paneTitle="CN-260908-0003 · printed" pane={<Pane><div style={{ transform: 'scale(.86)', transformOrigin: 'top left', width: 340 }}><CreditNote T={T} money /></div></Pane>} foot={<><Meta T={T}>Return SR-0117 · 2 notes · sent to accounts 11:26</Meta><span style={{ flex: 1 }} /><OutBtn T={T} icon="share-2">WhatsApp both</OutBtn><OutBtn T={T} icon="printer">Print both</OutBtn><T.Btn icon="plus" style={{ height: 44 }}>Next return</T.Btn></>}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, alignItems: 'start' }}>
      <div><div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, borderRadius: 18, background: T.surface, border: `1px solid ${T.line}` }}><span style={{ width: 44, height: 44, borderRadius: 22, background: T.ok + '22', color: T.ok, display: 'grid', placeItems: 'center' }}><Ic name="circle-check" size={24} /></span><span style={{ flex: 1 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 20, fontWeight: 600, color: T.ink }}>Two credit notes raised</div><Meta T={T} style={{ display: 'block' }}>in the same transaction as the return · the customer leaves with the documents</Meta></span></div>
        {[['CN-260908-0003', 'SI-2271', '3 pcs', 14985], ['CN-260908-0004', 'SI-2265', '1 pc', 3995]].map((n, i) => <div key={n[0]} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 14, background: i ? T.surface : T.accentSoft, border: `1px solid ${i ? T.line : T.accentLine}`, marginTop: 8 }}><Mono T={T}>{n[0]}</Mono><Meta T={T}>against {n[1]} · {n[2]}</Meta><Pill T={T} tone="warn" small>Stock on approval</Pill><Pill T={T} tone="blue" small>Pending accounts</Pill><span style={{ flex: 1 }} /><span style={{ fontFamily: T.fontSerif, fontSize: 15, fontWeight: 600, color: T.ink }}>{DIN(n[3])}</span><Hit T={T} icon="printer" size={30} iconSize={14} style={{ background: T.chipBg }} /></div>)}</div>
      <div><Sect T={T} style={{ marginTop: 0 }} right={<div style={{ display: 'flex', gap: 4 }}>{['Pending accounts', 'Stock on approval', 'Approved', 'Recent'].map((c, i) => <T.Chip key={c} on={i === 3} outline={i !== 3} style={{ height: 24, fontSize: 11, padding: '0 8px' }}>{c}</T.Chip>)}</div>}>Recent notes</Sect><div style={{ padding: '0 14px', borderRadius: 18, background: T.surface, border: `1px solid ${T.line}` }}><RecentNotes T={T} /><div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 36, borderTop: `1px solid ${T.line}` }}><Mono T={T} size={11.5}>CN-260903-0007</Mono><span style={{ flex: 1, fontSize: 12, color: T.ink2 }}>Chhabra Sarees · 3 pcs</span><Pill T={T} tone="ok" small>Approved</Pill></div></div></div>
    </div>
  </RetShell>;
}

Object.assign(window, { DShell, D_NODES, QueueRail, PendingPane, WebDReady, WebDPending, WebDPacking, WebDPackingScan, WebDInvoiceReview, WebDInvoiceDone, WebDShipmentSheet, WebDPrint, A4, TransportDoc, WebDBilled, WebDShipments, WebDOOS, WebDStockFG, WebDStockMat, WebDStockWIP, WebDFGInward, WebDRet1, WebDRet2, WebDRet3, WebDRet4 });

/* Board registration moved here from index.html on 9 Sep 2026 (the board is one page per module; see modules.js). */
(window.NEW_DRAFT_MODULES = window.NEW_DRAFT_MODULES || []).push({ module: 'Dispatch', note: 'ready board · pending book · packing terminal with live invoice · billed · out of stock · warehouse stock with FG inward · sale return wizard (8 Sep). Money only for manager roles; phone shows both variants', subs: [
    { name: 'Ready orders', flow: 'board with priority ring and PACK ▸ → sort & filter', phone: [['Ready · customer cards, priority ring', ScreenDReady], ['Ready · sort & filter sheet', ScreenDReadyFilters]], web: [['Ready · queue rail, cards, pending pane', WebDReady]] },
    { name: 'Pending orders', flow: 'the phone default node · three levels · manager sees ₹, packer does not', phone: [['Pending · manager (₹)', ScreenDPending], ['Pending · packer (no ₹)', ScreenDPendingPacker]], web: [['Pending · full node, queue rail, customer pane', WebDPending]] },
    { name: 'Packing', flow: 'desk: terminal → scan armed, rejected → invoice review → done, select for shipment → close shipment → print · phone: picker → scan → rejected → review → invoiced', phone: [['Packing · picker (customer → box)', ScreenDPicker], ['Packing · scan, tally, accepted', ScreenDScan], ['Packing · scan rejected', ScreenDScanRejected], ['Packing · review box, remove confirm', ScreenDReview], ['Packing · box invoiced', ScreenDInvoiced]], web: [['Packing · terminal, live invoice', WebDPacking], ['Packing · scan armed, rejected, remove confirm', WebDPackingScan], ['Packing · invoice review (bill-to, GST)', WebDInvoiceReview], ['Packing · invoice done, select for shipment', WebDInvoiceDone], ['Packing · close shipment sheet', WebDShipmentSheet], ['Print · A4 invoice and transport document', WebDPrint]] },
    { name: 'Billed', flow: 'sale invoices → invoice view → shipments history', phone: [['Billed · invoices · manager (₹)', ScreenDBilled], ['Billed · invoices · packer', ScreenDBilledPacker], ['Billed · invoice sheet · manager', ScreenDInvoiceSheet], ['Billed · invoice sheet · packer', ScreenDInvoiceSheetPacker], ['Billed · shipments history', ScreenDShipments]], web: [['Billed · sale invoices, invoice pane', WebDBilled], ['Billed · shipments history, transport doc pane', WebDShipments]] },
    { name: 'Out of stock', flow: 'order shortages and restock → sort & filter', phone: [['Out of stock · order and restock cards', ScreenDOOS], ['Out of stock · sort & filter sheet', ScreenDOOSFilters]], web: [['Out of stock · counts, cards, who-is-waiting pane', WebDOOS]] },
    { name: 'Warehouse stock', flow: 'finished goods → material → work in progress → FG inward (last process)', phone: [['Stock · finished goods', ScreenDStockFG], ['Stock · material', ScreenDStockMat], ['Stock · work in progress', ScreenDStockWIP], ['Stock · FG inward, verify', ScreenDFGInward]], web: [['Stock · finished goods, SKU pane', WebDStockFG], ['Stock · material, supplier pane', WebDStockMat], ['Stock · WIP, karigar pane', WebDStockWIP], ['Stock · FG inward, gate token pane', WebDFGInward]] },
    { name: 'Sale return', flow: 'customer and boxes → pieces (scan) → preview with blockers → credit notes', phone: [['Return · 1 customer, boxes, bills', ScreenDRet1], ['Return · 2 pieces, scan', ScreenDRet2], ['Return · 3 preview · manager (₹)', ScreenDRet3], ['Return · 3 preview · packer', ScreenDRet3Packer], ['Return · 4 credit note · manager', ScreenDRet4], ['Return · 4 credit note · packer', ScreenDRet4Packer]], web: [['Return · 1 customer at the counter', WebDRet1], ['Return · 2 pieces, desk scanner', WebDRet2], ['Return · 3 preview, blockers, notes pane', WebDRet3], ['Return · 4 credit notes raised, recent notes', WebDRet4]] },
] });
