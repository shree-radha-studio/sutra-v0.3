/* NEW DRAFTS · Home (13 Oct 2026) · the landing, the approvals queue with the sale-order card (BRD F:46–56) and the
   gate pass hub (F:57). Plan: plans/home.md. Screens render through the theme object T (FINAL light, FINALD dark), so
   one function yields both. Component names start with Hm because every board file shares one script scope.
   Reuses from base: frameF, Hit, OutBtn, Pill, Meta, Mono, Thumb, CallChip, Sect, glass, PriceF, money, LineG, Legend,
   StatusPill, Ic, T.Btn, T.Chip, T.Kpi, T.Step, T.Tag, T.Island, WebShell3, ViewTabs (see COMPONENTS.md).
   Roles drawn: Sales (sale executive, no ₹ tile) on the phone landing, Sale manager (₹) on the web landing, sub-admin
   (cannot approve over the credit line) on the flagged card, Guard on the gate pass.
   Owner's rule (13 Oct): nothing stops a sale order at submission; the salesperson can edit or delete it while it waits;
   every reason not to approve shows on the approver's card as a flag, in words, with the fact beside it. */

/* ── module data (fictional; the board's own names and codes) ── */
const Hm_SEG = [['Home'], ['Notifications', 5], ['Approvals', 7, true], ['Gate pass']];   // web sub-menu buttons: [label, count, chevron]
const Hm_TABS = k => ({
  home: [{ icon: 'house', label: 'Home · Today', on: true }, { icon: 'layout-grid', label: 'Catalogue' }, { icon: 'receipt-text', label: 'Sale orders · Raised' }],
  appr: [{ icon: 'house', label: 'Home' }, { icon: 'clipboard-check', label: 'Approvals · Sale orders' }, { icon: 'receipt-text', label: 'SO-3456 · Ramleela Fashion', on: true }],
  gate: [{ icon: 'house', label: 'Home' }, { icon: 'ticket', label: 'Gate pass · Manual', on: true }],
}[k]);
const Hm_APPR_TABS = [['Sale orders', 4, 'receipt-text'], ['Returns', 1, 'rotate-ccw'], ['Purchase inwards', 1, 'package-plus'], ['Overages', 1, 'factory'], ['Costing', 0, 'calculator']];
const HM_C = { name: 'Ramleela Fashion', city: 'Surat', tier: 'Platinum', since: '30/08/24', phone: '98152 23366', broker: 'Deepak', agency: 'Raghani Co.', line: 120000 };
const HM_NOTE = '2018 ke red ka stock check karna hai';
/* the order the sell flow submitted (SO-3456, 13/10/26) · lines: design, rate, colours as [name, qty, in stock, at the last step] */
const HM_LINES = [
  { code: '2798', rate: 4995, cols: [['Sky', 2, 20, null, 4], ['Purple', 1, 2]] },   // 5th item: the qty it had before the edit
  { code: '6002', rate: 4995, cols: [['Lilac', 1, 12]] },
  { code: '3661', rate: 5995, cols: [['Peach', 2, 0, 8]] },
  { code: '1457', rate: 3995, cols: [['Firozi', 3, 9], ['Bottle', 1, 6]] },
];
const hmQty = l => l.cols.reduce((s, c) => s + c[1], 0);
const HM_PCS = HM_LINES.reduce((s, l) => s + hmQty(l), 0);                                  // 10
const HM_TOTAL = HM_LINES.reduce((s, l) => s + hmQty(l) * l.rate, 0);                       // 47,950
const HM_INSTOCK = HM_LINES.reduce((s, l) => s + l.cols.reduce((t, c) => t + Math.min(c[1], c[2]), 0), 0);   // 8
const HM_OPEN = { within: 64000, over: 82000 };   // open exposure of Ramleela: P3 fits the line, P4 crosses it
const HM_HIST = [['SO-3398', '24/08/26', '05/09/26'], ['SO-3302', '29/07/26', '14/08/26'], ['SO-3215', '02/07/26', '17/07/26']];
const HM_CH = { cust: { o: [38, 42, 35, 48, 52, 46, 58, 61, 54, 66, 72, 68], p: [30, 40, 34, 42, 45, 44, 50, 52, 49, 58, 60, 52] }, agency: { o: [210, 235, 198, 260, 284, 251, 312, 330, 298, 356, 372, 348], p: [190, 220, 190, 236, 262, 240, 280, 298, 270, 320, 330, 300] } };
/* sale orders waiting: flags in words (tone, text), flagged first (danger count, then warn count, then oldest) */
const HM_QUEUE = [
  { no: 'SO-3456', name: 'Ramleela Fashion', city: 'Surat', amt: HM_TOTAL, pcs: HM_PCS, flags: [['danger', 'Overdue ₹62,400'], ['warn', 'GR ratio 40 %'], ['warn', 'Edited after submit']], by: 'Rohan Mehta', on: '13/10/26', d: '2798' },
  { no: 'SO-3451', name: 'Preeti Fashion Hub', city: 'Ludhiana', amt: 39955, pcs: 9, flags: [['danger', 'Over credit line ₹14,200'], ['warn', 'Priority 1']], by: 'Rohan Mehta', on: '09/09/26', d: '2006' },
  { no: 'SO-3460', name: 'Kavya Silks', city: 'Jaipur', amt: 26970, pcs: 6, flags: [['warn', 'New customer']], by: 'Sunita Rao', on: '11/09/26', d: '2006' },
  { no: 'SO-3448', name: 'A V Creation', city: 'Ambala', amt: 19980, pcs: 4, flags: [], by: 'Sunita Rao', on: '08/09/26', d: '6002' },
];
/* sale return SR-0112 */
const HM_RET = { no: 'SR-0112', on: '12/09/26', by: 'Anil Verma · dispatch',
  c: { name: 'Nalli Fashion Mart', city: 'Chennai', market: 'T Nagar', tier: 'Platinum', since: '14/03/24', phone: '98400 11223', broker: 'Karthik S', agency: 'Karthik Agency' },
  lines: [['2798', 'Sky', 2, 'SI-2260', 4495], ['6002', 'Lilac', 1, 'SI-2263', 4000]],
  bills: [['SI-2260', '06/09/26', 9, 2], ['SI-2263', '06/09/26', 8, 1]] };
const HM_RET_TOTAL = HM_RET.lines.reduce((s, l) => s + l[2] * l[4], 0);   // 12,990
const HM_CH_RET = { cust: { o: [52, 58, 61, 55, 70, 74, 69, 82, 88, 79, 91, 96], p: [50, 56, 60, 54, 66, 72, 68, 80, 84, 77, 88, 90] }, agency: { o: [300, 320, 310, 340, 360, 372, 356, 400, 420, 398, 440, 452], p: [284, 310, 300, 328, 346, 360, 340, 384, 402, 380, 420, 430] } };
/* gate tokens */
const HM_KIND_IC = { 'Sale invoice': 'receipt', 'Production issue': 'scissors', 'Purchase inward': 'package-plus', 'Sale return': 'rotate-ccw' };
const HM_AUTO = [
  { no: 'GT-260912-014', kind: 'Sale invoice', party: 'Ambika Enterprises', parcels: 2, st: 'Verified by Ramesh 14:20', ok: true },
  { no: 'GT-260912-015', kind: 'Production issue', party: 'Noor Tailors', parcels: 3, st: 'Active' },
  { no: 'GT-260912-016', kind: 'Purchase inward', party: 'Surat Fabrics', parcels: 4, st: 'Active' },
  { no: 'GT-260912-017', kind: 'Sale invoice', party: 'Aneri Boutique', parcels: 1, st: 'Verified by Ramesh 12:05', ok: true },
  { no: 'GT-260912-020', kind: 'Sale invoice', party: 'Preeti Fashion Hub', parcels: 3, st: 'Active' },
];
const HM_MANUAL = [
  { no: 'GT-260912-021', kind: 'Sale return', party: 'Aneri Boutique', city: 'Anand', parcels: 1, stock: 'Finished goods', claimed: '2 pcs', st: 'Active', at: '14:05' },
  { no: 'GT-260912-019', kind: 'Purchase inward', party: 'Surat Fabrics', city: 'Surat', parcels: 4, stock: 'Material · no PO', claimed: '120 m', st: 'Entry made · GRN-0451', ok: true, at: '12:10' },
  { no: 'GT-260912-018', kind: 'Sale return', party: 'Nalli Fashion Mart', city: 'Chennai', parcels: 2, stock: 'Finished goods', claimed: '3 pcs', st: 'Entry made · SR-0112', ok: true, at: '11:40' },
  { no: 'GT-260911-017', kind: 'Purchase inward', party: 'Kiran Threads', city: 'Surat', parcels: 1, stock: 'Material · no PO', claimed: '20 cones', st: 'Active', at: '17:30' },
];

/* ── atoms ── */
const HmCard = ({ T, children, style, alt, pad = 14 }) => <div style={{ padding: pad, borderRadius: T.rCard, background: alt ? T.surface2 : T.surface, border: `1px solid ${T.line}`, boxShadow: T.dark || alt ? 'none' : '0 6px 18px -14px rgba(36,23,18,.25)', ...style }}>{children}</div>;
/* the phone body: it scrolls (scrollbar hidden), pb clears whatever is docked at the foot */
const HmBody = ({ children, style, pb = 120, scroll }) => <div className="hm-scroll" ref={el => { if (el && scroll) el.scrollTop = scroll; }} style={{ flex: 1, minHeight: 0, overflowY: 'auto', overflowX: 'hidden', padding: `10px 14px ${pb}px`, scrollbarWidth: 'none', ...style }}><style>{'.hm-scroll::-webkit-scrollbar{display:none}'}</style>{children}</div>;
const hmLift = T => ({ flex: 'none', background: T.header, borderBottom: `1px solid ${T.line}`, boxShadow: T.headerShadow, marginTop: -54, paddingTop: 54 });
/* catalogue phone header: lockup · role · cart basket · menu, then the search island */
const HmHeader = ({ T }) => <div style={{ ...hmLift(T), paddingBottom: 8 }}><T.TopBar /><T.SearchBar view="list" /></div>;
/* page head on the lifted surface: back · display title · right slot, then anything under it */
const HmPageHead = ({ T, title, right, children, back = true }) => <div style={hmLift(T)}>
  <div style={{ display: 'flex', alignItems: 'center', gap: 6, height: 48, padding: '0 12px' }}>{back && <Hit T={T} icon="chevron-left" size={40} />}<span style={{ fontFamily: T.fontDisplay, fontSize: 26, fontWeight: 500, color: T.ink, marginLeft: back ? 0 : 6, whiteSpace: 'nowrap' }}>{title}</span><span style={{ flex: 1 }} />{right}</div>
  {children}
</div>;
/* scrolling underline tabs [label, count] with the fade at the right edge */
const HmTabsRow = ({ T, tabs, active }) => <div style={{ position: 'relative' }}>
  <div style={{ display: 'flex', gap: 2, padding: '0 10px', overflow: 'hidden' }}>{tabs.map(([t, n]) => { const on = t === active; return <span key={t} className="press" style={{ position: 'relative', flex: 'none', padding: '8px 10px 11px', fontFamily: T.fontUI, fontSize: 13.5, fontWeight: on ? 600 : 400, color: on ? T.ink : T.ink3, whiteSpace: 'nowrap' }}>{t} <span style={{ fontSize: 11.5, color: T.ink3, fontVariantNumeric: 'tabular-nums' }}>{n}</span>{on && <span style={{ position: 'absolute', left: 10, right: 10, bottom: 0, height: 2, background: T.accent, borderRadius: 1 }} />}</span>; })}</div>
  <span style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 56, background: `linear-gradient(90deg, transparent, ${T.bg} 70%)`, pointerEvents: 'none' }} />
</div>;
const HmSeg = ({ T, items, active }) => <span style={{ display: 'inline-flex', padding: 3, borderRadius: 999, background: T.bg2, flex: 'none' }}>{items.map(b => <span key={b} className="press" style={{ height: 26, padding: '0 11px', borderRadius: 999, display: 'grid', placeItems: 'center', fontFamily: T.fontUI, fontSize: 11.5, background: b === active ? T.surface : 'transparent', color: b === active ? T.ink : T.ink3 }}>{b}</span>)}</span>;

/* ── Home pieces ── */
function HmNeed({ T, icon, title, sub, tone, tag }) {
  const bad = tone === 'danger';
  return <div className="press" style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 48, padding: '5px 12px', borderRadius: 18, background: T.surface, border: `1px solid ${bad ? T.danger + '66' : T.line}`, boxShadow: T.dark ? 'none' : '0 6px 18px -14px rgba(36,23,18,.25)', minWidth: 0 }}>
    <span style={{ width: 38, height: 38, borderRadius: 13, background: bad ? T.danger + '1F' : T.chipBg, color: bad ? T.danger : T.ink2, display: 'grid', placeItems: 'center', flex: 'none' }}><Ic name={icon} size={19} sw={1.7} /></span>
    <span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 18, fontWeight: 600, color: T.ink, lineHeight: 1.1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</div><Meta T={T} style={{ display: 'block', marginTop: 2 }}>{sub}</Meta></span>
    {tag}<Ic name="chevron-right" size={16} color={T.ink3} />
  </div>;
}
const HmQuick = ({ T, icon, label, sub, h = 66 }) => <div className="press" style={{ height: h, borderRadius: 18, background: T.surface, border: `1px solid ${T.line}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, boxShadow: T.dark ? 'none' : '0 6px 18px -14px rgba(36,23,18,.25)' }}><Ic name={icon} size={22} sw={1.7} color={T.ink} /><span style={{ fontFamily: T.fontUI, fontSize: 12.5, color: T.ink2, fontWeight: 500 }}>{label}</span>{sub && <span style={{ fontFamily: T.fontUI, fontSize: 10.5, color: T.ink3, marginTop: -2 }}>{sub}</span>}</div>;
function HmNotice({ T, kind, icon, tone, text, time, first, compact }) {
  const bad = tone === 'danger';
  return <div className="press" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: compact ? '4px 0' : '9px 0', borderTop: first ? 0 : `1px solid ${T.line}` }}>
    <span style={{ width: compact ? 28 : 34, height: compact ? 28 : 34, borderRadius: 12, background: bad ? T.danger + '1F' : T.chipBg, color: bad ? T.danger : T.ink2, display: 'grid', placeItems: 'center', flex: 'none' }}><Ic name={icon} size={16} sw={1.7} /></span>
    <span style={{ flex: 1, minWidth: 0 }}><div style={{ lineHeight: 1 }}><T.Tag tone={bad ? 'danger' : 'muted'}>{kind}</T.Tag></div><div style={{ fontFamily: T.fontUI, fontSize: compact ? 12.5 : 13, color: T.ink, marginTop: 3, lineHeight: 1.25, ...(compact ? { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } : null) }}>{text}</div></span>
    <Meta T={T} style={{ flex: 'none' }}>{time}</Meta>
  </div>;
}
const HM_QUICK = [['layout-grid', 'Catalogue', '612 designs'], ['shopping-basket', 'Carts', '3 open'], ['receipt-text', 'Sale orders', '4 raised'], ['scan-line', 'Scan', null], ['users', 'Customers', null], ['phone-call', 'Follow-ups', '3 today']];

/* ── P1 · phone landing, sale executive ── */
function ScreenHmHome({ T }) {
  const sc = { margin: '8px 0 4px' };
  return frameF(T, <>
    <HmHeader T={T} />
    <HmBody pb={112} style={{ paddingTop: 4 }}>
      <Sect T={T} style={{ ...sc, marginTop: 4 }} right={<Meta T={T}>updated 11:20</Meta>}>Today</Sect>
      <div style={{ display: 'flex', gap: 8 }}>
        <T.Kpi small label="Orders today" value="7" sub="5 yesterday" />
        <T.Kpi small label="Pieces" value="68" sub="9.7 per order" />
        <T.Kpi small label="Approvals" value="3" sub="waiting · oldest 2 d" />
      </div>
      <Sect T={T} style={sc}>Needs you</Sect>
      <div style={{ display: 'grid', gap: 6 }}>
        <HmNeed T={T} icon="clipboard-check" title="3 approvals waiting" sub="SO-3456 · SO-3451 · SO-3448" />
        <HmNeed T={T} icon="shopping-basket" title="2 carts open since yesterday" sub="Ramleela Fashion · RL Fashion" />
        <HmNeed T={T} icon="octagon-alert" tone="danger" title="1 cart over the credit line" sub="RL Fashion · Meerut · will go up flagged" />
      </div>
      <Sect T={T} style={sc}>Quick links</Sect>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 6 }}>{HM_QUICK.map(([ic, l]) => <HmQuick key={l} T={T} icon={ic} label={l} h={46} />)}</div>
      <Sect T={T} style={sc} right={<span className="press" style={{ fontSize: 12, color: T.ink2, fontWeight: 500 }}>All 5</span>}>Notifications</Sect>
      <HmCard T={T} pad="0 12px">
        <HmNotice T={T} first compact kind="BAU" icon="circle-check" text="SO-3433 approved · Nalli Fashion Mart" time="10:42" />
        <HmNotice T={T} compact kind="Daily" icon="bar-chart-3" text="Yesterday 9 orders · 84 pcs" time="09:00" />
        <HmNotice T={T} compact kind="Red alert" tone="danger" icon="triangle-alert" text="SO-2607 Nalli Fashion Mart is 24 d late" time="08:15" />
      </HmCard>
    </HmBody>
  </>, <T.Island active="Home" />);
}

/* ── W1 · web landing, sale manager (₹ tile) ── */
function HmNoticePane({ T }) {
  const G = ({ t, n, children }) => <div style={{ marginBottom: 6 }}><div style={{ display: 'flex', alignItems: 'baseline', gap: 6, fontFamily: T.fontUI, fontSize: 10.5, letterSpacing: '.08em', textTransform: 'uppercase', color: T.ink3, padding: '8px 0 0' }}>{t}<span style={{ fontVariantNumeric: 'tabular-nums' }}>{n}</span></div>{children}</div>;
  return <div style={{ padding: '2px 16px 12px' }}>
    <G t="Red alerts" n={2}>
      <HmNotice T={T} first kind="Red alert" tone="danger" icon="triangle-alert" text="SO-2607 · Nalli Fashion Mart is 24 d past due" time="08:15" />
      <HmNotice T={T} kind="Red alert" tone="danger" icon="octagon-alert" text="RL Fashion cart is over the credit line" time="09:20" />
    </G>
    <G t="Daily" n={1}><HmNotice T={T} first kind="Daily" icon="bar-chart-3" text="Yesterday 9 orders · 84 pcs · ₹4,18,940 billed" time="09:00" /></G>
    <G t="Business as usual" n={2}>
      <HmNotice T={T} first kind="BAU" icon="circle-check" text="SO-3433 approved · Nalli Fashion Mart · 12 pcs" time="10:42" />
      <HmNotice T={T} kind="BAU" icon="calculator" text="Costing S-0412 approved by the owner" time="11:05" />
    </G>
    <T.Btn kind="secondary" small style={{ width: '100%', marginTop: 8, height: 38 }}>Open all notifications</T.Btn>
  </div>;
}
function WebHmHome({ T }) {
  const wk = [5, 8, 7, 9, 11, 4, 2];
  return <WebShell3 T={T} module="Home" crumb={['Home', 'Today']} section="Home" seg={Hm_SEG} active="Home" tabs={Hm_TABS('home')} paneTitle="Notifications" pane={<HmNoticePane T={T} />}>
    <div style={{ padding: '16px 24px 0', overflow: 'hidden', flex: 1, minHeight: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 20, fontWeight: 600, color: T.ink }}>Today</span><span style={{ fontSize: 12, color: T.ink3 }}>updated 11:20</span><span style={{ flex: 1 }} /><HmSeg T={T} items={['Day', 'Month', 'Year']} active="Day" /></div>
      <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
        <T.Kpi label="Orders today" value="7" sub="5 yesterday" />
        <T.Kpi label="Pieces" value="68" sub="9.7 per order" />
        <T.Kpi label="Approvals waiting" value="7" sub="oldest 2 d" />
        <T.Kpi label="Billed today" value="₹3,39,660" sub="avg ₹48,523 per order" tone="ok" />
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 20 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 20, fontWeight: 600, color: T.ink }}>Needs you</span><span style={{ fontSize: 12, color: T.ink3 }}>6 things</span></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
        <HmNeed T={T} icon="clipboard-check" title="4 sale orders to approve" sub="SO-3456 · SO-3451 · SO-3448 · SO-3460" />
        <HmNeed T={T} icon="rotate-ccw" title="1 sale return" sub="SR-0112 · Nalli Fashion Mart · ₹12,990" />
        <HmNeed T={T} icon="package-plus" title="1 purchase inward" sub="GRN-0451 · Surat Fabrics · ₹84,000" />
        <HmNeed T={T} icon="factory" title="1 production overage" sub="PO-1187 · Rahul (karigar) · +6 pcs" />
        <HmNeed T={T} icon="shopping-basket" title="2 carts open since yesterday" sub="Ramleela Fashion · RL Fashion" />
        <HmNeed T={T} icon="octagon-alert" tone="danger" title="1 cart over the credit line" sub="RL Fashion · Meerut · will go up flagged" />
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 20 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 20, fontWeight: 600, color: T.ink }}>Quick links</span></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, minmax(0,1fr))', gap: 10, marginTop: 10 }}>{HM_QUICK.map(([ic, l, s]) => <HmQuick key={l} T={T} icon={ic} label={l} sub={s} h={84} />)}</div>
      <HmCard T={T} pad="12px 16px 8px" style={{ marginTop: 16 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 16, fontWeight: 600, color: T.ink }}>Orders this week</span><span style={{ flex: 1 }} /><span style={{ fontSize: 11, color: T.ink3 }}>Friday is the busiest day</span></div>
        <BarsV T={T} data={wk} w={780} h={46} color={wk.map((v, i) => i === 4 ? T.accent : T.accentLine)} labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']} />
      </HmCard>
    </div>
  </WebShell3>;
}

/* ── Approvals pieces ── */
/* head: back · order no (mono) · RAISED pill, and the one-line facts under it */
const HmDocHead = ({ T, no, meta, note, pill = 'Raised' }) => <div style={{ ...hmLift(T), paddingBottom: 10 }}>
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 46, padding: '0 12px' }}><Hit T={T} icon="chevron-left" size={40} /><span style={{ fontFamily: T.fontMono, fontSize: 16, fontWeight: 600, color: T.ink }}>{no}</span><StatusPill T={T} s={pill} /><span style={{ flex: 1 }} /><Hit T={T} icon="printer" size={38} iconSize={17} style={{ background: T.chipBg }} /></div>
  <div style={{ padding: '0 16px', fontFamily: T.fontUI, fontSize: 12.5, color: T.ink3 }}>{meta}</div>
  {note && <div style={{ padding: '2px 16px 0', fontFamily: T.fontUI, fontSize: 12, color: T.ink2, lineHeight: 1.35 }}>{note}</div>}
</div>;
/* "Look twice": every reason not to approve, as a row of words with the fact beside it. Nothing here stops the order. */
const hmFlags = (over, open) => [
  ...(over > 0 ? [['danger', `Over the credit line by ${money(over)}`, `line ${money(HM_C.line)}, open ${money(open)}, this order ${money(HM_TOTAL)}`]] : []),
  ['danger', 'Overdue ₹62,400', '2 bills, oldest 41 d'],
  ['warn', 'GR ratio 40 %', 'goods returned, last 12 months'],
  ['warn', 'Edited after submit', '2 min ago · qty of 2798 Sky 4 → 2'],
];
function HmFlags({ T, flags, web }) {
  if (!flags.length) return null;
  const c = flags.some(f => f[0] === 'danger') ? T.danger : T.warn;
  return <div style={{ display: web ? 'flex' : 'block', gap: 14, padding: web ? '5px 14px' : '10px 12px 8px', borderRadius: 18, background: c + '14', border: `1px solid ${c}55` }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, ...(web ? { width: 124, flex: 'none', alignSelf: 'flex-start', paddingTop: 1 } : { marginBottom: 4 }) }}><Ic name="eye" size={16} color={c} /><span style={{ fontFamily: T.fontDisplay, fontSize: web ? 16 : 17, fontWeight: 600, color: T.ink }}>Look twice</span><span style={{ fontFamily: T.fontUI, fontSize: 11, fontWeight: 600, color: c, fontVariantNumeric: 'tabular-nums' }}>{flags.length}</span></div>
    <div style={{ flex: 1, minWidth: 0 }}>{flags.map(([tone, label, fact]) => <div key={label} style={{ display: 'flex', gap: 9, alignItems: 'flex-start', padding: web ? '0' : '4px 0' }}><span style={{ width: 7, height: 7, borderRadius: 4, background: tone === 'danger' ? T.danger : T.warn, flex: 'none', marginTop: web ? 6 : 6 }} /><span style={{ fontFamily: T.fontUI, fontSize: web ? 12 : 12.5, color: T.ink2, lineHeight: web ? 1.45 : 1.4 }}><b style={{ color: T.ink, fontWeight: 600 }}>{label}</b> · {fact}</span></div>)}</div>
  </div>;
}
/* the customer: name (display), where · tier · since, call chip, broker chip, purchase history */
function HmCustomer({ T, c = HM_C, web }) {
  if (web) return <HmCard T={T} pad="7px 14px 8px">
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 20, fontWeight: 600, color: T.ink, lineHeight: 1.1 }}>{c.name}</span><Meta T={T}>{c.city} · {c.tier} · since {c.since}</Meta></div>
    <div style={{ display: 'flex', gap: 6, marginTop: 6, overflow: 'hidden' }}><T.Chip icon="phone" style={{ height: 30 }}><span style={{ fontFamily: T.fontMono, fontSize: 12 }}>{c.phone}</span></T.Chip><T.Chip icon="user" style={{ height: 30 }}>{c.broker} · {c.agency}</T.Chip><span style={{ flex: 1 }} /></div>
  </HmCard>;
  return <HmCard T={T} pad={web ? '9px 14px 10px' : 14}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 20, fontWeight: 600, color: T.ink, lineHeight: 1.1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</div><Meta T={T} style={{ display: 'block', marginTop: 3 }}>{c.city} · {c.tier} · since {c.since}</Meta></span>
      <T.Chip icon="history" outline style={{ height: web ? 32 : 34 }}>Purchase history</T.Chip>
    </div>
    <div style={{ display: 'flex', gap: 6, marginTop: web ? 7 : 10, overflow: 'hidden' }}>
      <T.Chip icon="phone" style={{ height: web ? 32 : 34 }}><span style={{ fontFamily: T.fontMono, fontSize: 12 }}>{c.phone}</span></T.Chip>
      <T.Chip icon="user" style={{ height: web ? 32 : 34 }}>{c.broker} · {c.agency}</T.Chip>
    </div>
  </HmCard>;
}
/* standing strip: what we know about them (BRD F:47–53) */
const hmStanding = (open, c = HM_C) => [
  ['Payment score', '78', 'out of 100'],
  ['Customer score', '68', 'high band'],
  ['GR ratio', '40 %', 'goods returned', 'danger'],
  ['FY billing', money(450000), 'this year'],
  ['Overdue', money(62400), 'oldest 41 d', 'danger'],
  ['Open bills', '2', money(open) + ' open'],
];
const HmStanding = ({ T, items, cols = 3 }) => <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))`, gap: 8 }}>{items.map(([l, v, s, tone]) => <T.Kpi key={l} label={l} value={v} sub={s} tone={tone} small />)}</div>;
/* credit line: used · this order · free; the last segment turns danger when the sum crosses the line */
function HmCredit({ T, open, order = HM_TOTAL, line = HM_C.line, web }) {
  const total = open + order, over = total > line, free = Math.max(0, line - total), scale = Math.max(total, line);
  const w = v => (v / scale * 100) + '%';
  const b = { fontWeight: 600, color: T.ink };
  const dot = c => <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 4, background: c, margin: '0 3px 0 0' }} />;
  const cur = over ? T.danger : T.ink;
  return <HmCard T={T} pad={web ? '8px 14px 9px' : 14} style={over ? { borderColor: T.danger + '66' } : null}>
    <div style={{ fontFamily: T.fontUI, fontSize: web ? 12 : 11.5, color: T.ink3, lineHeight: 1.45, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Credit line <span style={b}>{money(line)}</span> · {dot(T.ink3)}open <span style={b}>{money(open)}</span> · {dot(cur)}this order <span style={{ ...b, color: cur }}>{money(order)}</span>{web && !over && <> · free <span style={b}>{money(free)}</span></>}</div>
    <div style={{ position: 'relative', marginTop: over ? (web ? 12 : 24) : (web ? 8 : 10) }}>
      <div style={{ height: 12, borderRadius: 6, background: T.chipBg, display: 'flex', overflow: 'hidden' }}><span style={{ width: w(open), background: T.ink3 }} /><span style={{ width: w(order), background: cur }} /></div>
      {over && <><span style={{ position: 'absolute', left: w(line), top: -6, bottom: -6, width: 2, marginLeft: -1, background: T.ink, borderRadius: 1 }} />{!web && <span style={{ position: 'absolute', left: w(line), top: -22, transform: 'translateX(-100%)', paddingRight: 5, fontFamily: T.fontUI, fontSize: 10.5, color: T.ink2, whiteSpace: 'nowrap' }}>line {money(line)}</span>}</>}
    </div>
    {!web && <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 8, fontFamily: T.fontUI, fontSize: 13, fontWeight: 600, color: over ? T.danger : T.ok }}><Ic name={over ? 'octagon-alert' : 'circle-check'} size={16} />{over ? `Over the line by ${money(total - line)} · admin clears it` : `Inside the line · ${money(free)} free after this order`}</div>}
  </HmCard>;
}
/* appetite: what they usually buy, by price tier (BRD F:54) */
function HmAppetite({ T, tiers = [['High', 67], ['Mid', 25], ['Low', 8]], web }) {
  const col = [T.ink, T.ink2, T.line2];
  return <HmCard T={T} pad={web ? '10px 14px 12px' : 14}>
    <div style={{ display: 'flex', height: 14, borderRadius: 7, overflow: 'hidden', background: T.chipBg, gap: 2 }}>{tiers.map(([t, v], i) => <span key={t} style={{ width: v + '%', background: col[i], display: 'grid', placeItems: 'center', fontFamily: T.fontUI, fontSize: 9.5, fontWeight: 600, color: T.dark ? T.bg : '#fff' }}>{v >= 20 ? v : ''}</span>)}</div>
    <div style={{ marginTop: 8 }}><Legend T={T} items={tiers.map(([t, v], i) => [t, col[i], v + ' %'])} /></div>
    {!web && <Meta T={T} style={{ display: 'block', marginTop: 5 }}>what they usually buy, by price tier</Meta>}
  </HmCard>;
}
/* order lines: photo, number head, a stepper per colour with "× rate" and the stock beside it */
function HmColRow({ T, c, rate, web }) {
  const [n, q, st, last, was] = c; const short = q > st;
  return <div style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: web ? 32 : 46, opacity: q ? 1 : .62 }}>
    <span style={{ width: 4, height: 20, borderRadius: 2, background: XD.cols[n], flex: 'none' }} />
    <span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontUI, fontSize: 13.5, fontWeight: 500, color: T.ink, lineHeight: 1.15 }}>{n}{was != null && <span style={{ marginLeft: 7, fontSize: 10.5, fontWeight: 600, color: T.warn }}>edited · was {was}</span>}</div><Meta T={T} style={{ display: 'block', fontSize: 11, color: short ? T.warn : T.ink3 }}>{st} in stock{last ? ` · at last step ${last}` : ''}</Meta></span>
    <T.Step v={q} />
    <span style={{ fontFamily: T.fontUI, fontSize: 12, color: T.ink2, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap', minWidth: 52, textAlign: 'right' }}>× {money(rate)}</span>
  </div>;
}
function HmLines({ T, web }) {
  return <HmCard T={T} pad={0} style={{ overflow: 'hidden' }}>
    {HM_LINES.map((l, i) => { const d = XD.byCode[l.code]; const q = hmQty(l);
      if (web) return <div key={l.code} style={{ display: 'flex', gap: 10, padding: '4px 14px', borderTop: i ? `1px solid ${T.line}` : 0 }}>
        <Thumb T={T} d={d} w={36} h={45} r={8} />
        <div style={{ width: 108, flex: 'none' }}><div style={{ fontFamily: T.fontDisplay, fontSize: 20, fontWeight: 600, color: T.ink, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{d.code}</div><Meta T={T} style={{ display: 'block', marginTop: 3, fontSize: 11 }}>{d.cat} · {d.name}</Meta><div style={{ marginTop: 4 }}><PriceF v={q * l.rate} size={15} font={T.fontSerif} color={T.ink} dim={T.ink3} /><span style={{ fontSize: 10.5, color: T.ink3, marginLeft: 5 }}>{q} pcs</span></div></div>
        <div style={{ flex: 1, minWidth: 0 }}>{l.cols.map(c => <HmColRow key={c[0]} T={T} c={c} rate={l.rate} web />)}</div>
      </div>;
      return <div key={l.code} style={{ borderTop: i ? `1px solid ${T.line}` : 0, padding: '12px 14px 8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Thumb T={T} d={d} w={56} h={70} r={12} />
          <span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 24, fontWeight: 600, color: T.ink, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{d.code}</div><Meta T={T} style={{ display: 'block', marginTop: 4 }}>{d.cat} · {d.name}</Meta></span>
          <span style={{ textAlign: 'right', flex: 'none' }}><PriceF v={q * l.rate} size={19} font={T.fontSerif} color={T.ink} dim={T.ink3} /><div style={{ fontSize: 10.5, color: T.ink3, marginTop: 3 }}>{q} pcs</div></span>
        </div>
        <div style={{ marginTop: 6 }}>{l.cols.map(c => <HmColRow key={c[0]} T={T} c={c} rate={l.rate} />)}</div>
      </div>; })}
    <div style={{ borderTop: `1px solid ${T.line2}`, padding: web ? '4px 14px' : '12px 14px', display: 'flex', alignItems: 'center', gap: 10, background: T.surface2 }}>
      <span style={{ flex: 1, minWidth: 0, display: web ? 'flex' : 'block', alignItems: 'center', gap: 8 }}><div style={{ fontSize: 12, color: T.ink3 }}>{HM_PCS} pcs · {HM_LINES.length} designs · GST extra</div><div style={{ marginTop: web ? 0 : 5 }}><Pill T={T} tone="warn" small>{HM_INSTOCK} of {HM_PCS} in stock</Pill></div></span>
      <PriceF v={HM_TOTAL} size={web ? 20 : 26} font={T.fontSerif} color={T.ink} dim={T.ink3} />
    </div>
  </HmCard>;
}
const HmNote = ({ T, by = 'Rohan Mehta', text = HM_NOTE, tight }) => <div style={{ display: 'flex', gap: 10, padding: tight ? '5px 12px' : '12px 14px', borderRadius: 16, background: T.chipBg, alignItems: tight ? 'center' : 'flex-start' }}><Ic name="message-square-text" size={16} color={T.ink3} style={{ marginTop: tight ? 0 : 2 }} />{tight
  ? <span style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap', minWidth: 0 }}><Meta T={T} style={{ flex: 'none' }}>Note with this order · {by}</Meta><span style={{ fontFamily: T.fontUI, fontSize: 13.5, fontStyle: 'italic', color: T.ink }}>“{text}”</span></span>
  : <span><Meta T={T} style={{ display: 'block' }}>Note with this order · {by}</Meta><div style={{ fontFamily: T.fontUI, fontSize: 14, fontStyle: 'italic', color: T.ink, marginTop: 3, lineHeight: 1.3 }}>“{text}”</div></span>}</div>;
/* the last three orders: tap Order, Invoice or Return to open that document */
const HmHistory = ({ T, rows = HM_HIST, tight }) => <HmCard T={T} pad={tight ? '2px 12px' : '2px 14px'}>{rows.map(([no, made, done], i) => <div key={no} style={{ padding: tight ? '6px 0' : '9px 0', borderTop: i ? `1px solid ${T.line}` : 0 }}>
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}><Mono T={T} size={13}>{no}</Mono><Meta T={T}>created {made}</Meta><span style={{ flex: 1 }} /><Meta T={T}>done {done}</Meta></div>
  <div style={{ display: 'flex', gap: 6, marginTop: tight ? 5 : 7 }}>{['Order', 'Invoice', 'Return'].map(k => <T.Chip key={k} outline style={{ height: tight ? 28 : 30, fontSize: 12, padding: '0 14px' }}>{k}</T.Chip>)}</div>
</div>)}</HmCard>;
/* orders vs payments: orders accent, payments ok dashed (BRD F:55–56) */
const HmChart = ({ T, title, d, h = 66, mini }) => <HmCard T={T} pad={mini ? '10px 10px 8px' : '12px 14px 10px'}>
  <div style={{ fontFamily: T.fontDisplay, fontSize: mini ? 14 : 16, fontWeight: 600, color: T.ink, lineHeight: 1.15 }}>{title}</div>
  {!mini && <div style={{ marginTop: 4 }}><Legend T={T} items={[['orders', T.accent], ['payments', T.ok]]} /></div>}
  <div style={{ marginTop: mini ? 6 : 8 }}><LineG T={T} series={[{ pts: d.o, color: T.accent, width: 2.2 }, { pts: d.p, color: T.ok, width: 2, dash: true }]} h={h} area /></div>
  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5, fontSize: 10, color: T.ink3 }}><span>Oct 25</span><span>Apr 26</span><span>Sep 26</span></div>
</HmCard>;
/* docked at the foot of the phone: the link to the owner, then Reject · Hold · the one maroon button */
const HmFoot = ({ T, primary = 'Approve', icon = 'check', note }) => <div style={{ position: 'absolute', left: 14, right: 14, bottom: 22, padding: '4px 8px 8px', borderRadius: T.rDock, ...glass(T) }}>
  {note && <div style={{ textAlign: 'center', paddingTop: 6, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink3 }}>{note}</div>}
  <div className="press" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, height: 32, fontFamily: T.fontUI, fontSize: 12.5, color: T.ink2, fontWeight: 500 }}>Mark for inspection<Ic name="arrow-right" size={13} />owner</div>
  <div style={{ display: 'flex', gap: 8 }}><T.Btn kind="secondary" style={{ padding: '0 16px', flex: 'none' }}>Reject</T.Btn><T.Btn kind="secondary" style={{ padding: '0 16px', flex: 'none' }}>Hold</T.Btn><T.Btn icon={icon} style={{ flex: 1, minWidth: 0 }}>{primary}</T.Btn></div>
</div>;

/* ── P2 · queue ── */
function HmQCard({ T, q, picked, web }) {
  const d = XD.byCode[q.d];
  const chips = q.flags.length > 0 && <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 7 }}>{q.flags.map(([tone, text]) => <Pill key={text} T={T} tone={tone} small>{text}</Pill>)}</div>;
  const by = <Meta T={T} style={{ display: 'block', marginTop: 6, fontSize: 11 }}>{q.by} · {q.on}</Meta>;
  const head = <div style={{ flex: 1, minWidth: 0 }}>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><span style={{ flex: 1, minWidth: 0, fontFamily: T.fontDisplay, fontSize: web ? 18 : 20, fontWeight: 600, color: T.ink, lineHeight: 1.1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{q.name}</span><PriceF v={q.amt} size={web ? 16 : 18} font={T.fontSerif} color={T.ink} dim={T.ink3} /></div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 7, marginTop: 4 }}><Mono T={T} size={12}>{q.no}</Mono><Meta T={T} style={{ flex: 1, minWidth: 0 }}>{q.city}</Meta><Meta T={T} style={{ flex: 'none' }}>{q.pcs} pcs</Meta></div>
  </div>;
  const frame = { borderRadius: 20, background: T.surface, border: `1px solid ${picked ? T.accent : T.line}`, boxShadow: T.dark || picked ? 'none' : '0 6px 18px -14px rgba(36,23,18,.25)', minWidth: 0 };
  if (web) return <div className="press" style={{ ...frame, padding: '9px 12px 8px' }}>
    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}><Thumb T={T} d={d} w={36} h={45} r={9} />{head}</div>{chips}{by}
  </div>;
  return <div className="press" style={{ ...frame, display: 'flex', gap: 12, padding: 12 }}>
    <Thumb T={T} d={d} w={52} h={65} r={10} />
    <div style={{ flex: 1, minWidth: 0 }}>{head}{chips}{by}</div>
  </div>;
}
function ScreenHmApprovals({ T }) {
  return frameF(T, <>
    <HmPageHead T={T} title="Approvals · 7" right={<Hit T={T} icon="sliders-horizontal" size={38} iconSize={17} style={{ background: T.surface, border: `1px solid ${T.line2}` }} />}>
      <HmTabsRow T={T} tabs={[['Sale orders', 4], ['Returns', 1], ['Purchase inwards', 1], ['Overages', 1], ['Costing', 0]]} active="Sale orders" />
    </HmPageHead>
    <HmBody pb={112}>
      <Meta T={T} style={{ display: 'block', margin: '2px 2px 8px' }}>4 sale orders · flagged first</Meta>
      <div style={{ display: 'grid', gap: 9 }}>{HM_QUEUE.map(q => <HmQCard key={q.no} T={T} q={q} />)}</div>
    </HmBody>
  </>, <T.Island active="Home" />);
}

/* ── the standing template (owner's rule, 13 Oct 15:30): the same eight tiles, in the same order, on every sale-order card.
   A tile that fails its rule is tinted on the tile itself (danger tint, value in danger, flag icon in the corner); no prose. ── */
const HM_RULES = { overdue: 0, gr: 25, credit: 100, score: 60 };   // fails when overdue > 0 · GR % above the limit · credit used above 100 % · score under the floor
function HmTile({ T, label, value, sub, bad, children, small }) {
  return <div style={{ position: 'relative', padding: '8px 9px 8px 10px', borderRadius: 16, background: bad ? T.danger + '1C' : T.surface, border: `1px solid ${bad ? T.danger + '66' : T.line}`, minWidth: 0 }}>
    {bad && <span style={{ position: 'absolute', top: 8, right: 9, color: T.danger, display: 'grid' }}><Ic name="flag" size={13} sw={2} /></span>}
    <Meta T={T} style={{ display: 'block', fontSize: 10.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: bad ? 14 : 0 }}>{label}</Meta>
    <div style={{ fontFamily: T.fontDisplay, fontSize: small ? 17 : 21, fontWeight: 600, color: bad ? T.danger : T.ink, lineHeight: 1.1, marginTop: 2, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{value}</div>
    {children}
    {sub && <Meta T={T} style={{ display: 'block', fontSize: 10.5, marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sub}</Meta>}
  </div>;
}
function HmTiles({ T, open, cols = 2 }) {
  const used = open + HM_TOTAL, pct = Math.round(used / HM_C.line * 100), overC = pct > HM_RULES.credit;
  const tiers = [['High', 67], ['Mid', 25], ['Low', 8]], tc = [T.ink, T.ink2, T.line2];
  const bar = (children) => <div style={{ display: 'flex', height: 8, borderRadius: 4, overflow: 'hidden', background: T.chipBg, gap: 1.5, margin: '5px 0 1px' }}>{children}</div>;
  return <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))`, gap: 7 }}>
    <HmTile small={cols > 2} T={T} label="Payment score" value="78" sub="out of 100" bad={78 < HM_RULES.score} />
    <HmTile small={cols > 2} T={T} label="Overdue" value="₹62,400" sub="2 bills · 41 d" bad />
    <HmTile small={cols > 2} T={T} label="GR ratio" value="40 %" sub="goods returned" bad={40 > HM_RULES.gr} />
    <HmTile small={cols > 2} T={T} label={cols > 2 ? "Credit used" : "Credit line used"} value={pct + ' %'} sub={`${money(used)} of ${money(HM_C.line)}`} bad={overC}>
      {bar(<><span style={{ width: Math.min(100, open / Math.max(used, HM_C.line) * 100) + '%', background: T.ink3 }} /><span style={{ width: (HM_TOTAL / Math.max(used, HM_C.line) * 100) + '%', background: overC ? T.danger : T.ink }} /></>)}
    </HmTile>
    <HmTile small={cols > 2} T={T} label="FY billing" value="₹4,50,000" sub="this year" />
    <HmTile small={cols > 2} T={T} label="Total pcs" value="92" sub="this year" />
    <HmTile small={cols > 2} T={T} label="Customer score" value="68" sub="high band" bad={68 < HM_RULES.score} />
    <HmTile small={cols > 2} T={T} label="Appetite" value={<span style={{ fontSize: 13, fontWeight: 600 }}>High 67 %</span>} sub="Mid 25 % · Low 8 %">{bar(tiers.map(([t, v], i) => <span key={t} style={{ width: v + '%', background: tc[i] }} />))}</HmTile>
  </div>;
}
/* the fixed flag vocabulary, rule-generated: OVERDUE ₹ · GR RATIO % · OVER CREDIT LINE ₹ · EDITED AFTER SUBMIT · NEW CUSTOMER · PRIORITY n */
const HmChips = ({ T, over }) => <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>{[...(over > 0 ? [['danger', `Over credit line ${money(over)}`]] : []), ['danger', 'Overdue ₹62,400'], ['warn', 'GR ratio 40 %'], ['warn', 'Edited after submit']].map(([tone, text]) => <Pill key={text} T={T} tone={tone} small>{text}</Pill>)}</div>;
/* a collapsed section, one tap away */
const HmFold = ({ T, icon, label, sub }) => <div className="press" style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 44, padding: '0 14px', borderRadius: T.rCard, background: T.surface, border: `1px solid ${T.line}` }}><Ic name={icon} size={16} color={T.ink2} /><span style={{ fontFamily: T.fontUI, fontSize: 13.5, fontWeight: 500, color: T.ink }}>{label}</span>{sub && <Meta T={T}>{sub}</Meta>}<span style={{ flex: 1 }} /><Ic name="chevron-right" size={16} color={T.ink3} /></div>;
const HM_ORDER_SUB = `${HM_PCS} pcs · ${HM_LINES.length} designs · ${money(HM_TOTAL)}`;
const HmCharts = ({ T, h = 56 }) => <div><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}><HmChart T={T} mini title="Ramleela Fashion" d={HM_CH.cust} h={h} /><HmChart T={T} mini title="Deepak · broker" d={HM_CH.agency} h={h} /></div><div style={{ marginTop: 6 }}><Legend T={T} items={[['orders', T.accent], ['payments', T.ok]]} /></div></div>;

/* ── P3 / P4 · the sale-order card ── */
function HmApprovalSO({ T, over: isOver, role = 'manager', scroll }) {
  const open = isOver ? HM_OPEN.over : HM_OPEN.within;
  const over = Math.max(0, open + HM_TOTAL - HM_C.line);
  const sub = role === 'subadmin', adm = role === 'admin';
  return frameF(T, <>
    <HmDocHead T={T} no="SO-3456" meta="13/10/26 · In-cabin · raised by Rohan Mehta" note={`${HM_PCS} pcs · ${money(HM_TOTAL)}`} />
    <HmBody pb={sub || adm ? 170 : 150} scroll={scroll}>
      <HmCustomer T={T} />
      <div style={{ height: 8 }} />
      <HmTiles T={T} open={open} />
      <div style={{ height: 9 }} /><HmChips T={T} over={over} />
      <div style={{ height: 10 }} /><HmCharts T={T} />
      {adm ? <Sect T={T}>Order</Sect> : <div style={{ height: 10 }} />}
      {adm ? <><HmLines T={T} /><div style={{ height: 8 }} /></> : null}
      {!adm && <HmFold T={T} icon="receipt-text" label="Order" sub={HM_ORDER_SUB} />}
      <div style={{ display: 'grid', gap: 7, marginTop: 7 }}><HmFold T={T} icon="message-square-text" label="Note" /><HmFold T={T} icon="history" label="History" sub="last 3 orders" /></div>
    </HmBody>
  </>, <HmFoot T={T} primary={sub ? 'Send to admin' : 'Approve'} icon={sub ? 'send' : 'check'} note={sub ? 'Over-the-line flags are cleared by admin' : adm && over ? 'Approving clears the over-the-line flag' : null} />);
}
const ScreenHmApproveSO = ({ T }) => <HmApprovalSO T={T} />;
const ScreenHmApproveSOFlagged = ({ T }) => <HmApprovalSO T={T} over role="subadmin" />;
const ScreenHmApproveSOAdmin = ({ T }) => <HmApprovalSO T={T} over role="admin" />;

/* ── P5 · sale return card ── */
function ScreenHmApproveReturn({ T, scroll }) {
  const r = HM_RET, c = r.c, pcs = r.lines.reduce((s, l) => s + l[2], 0);
  return frameF(T, <>
    <HmDocHead T={T} no={r.no} meta={`${r.on} · Sale return · raised by ${r.by}`} />
    <HmBody pb={146} scroll={scroll}>
      <HmCustomer T={T} c={c} />
      <Sect T={T}>Their record</Sect>
      <HmStanding T={T} items={[['Customer score', '95', 'high band'], ['Payment score', '88', 'out of 100'], ['GR ratio', '9 %', '11 % with this'], ['FY billing', money(680000), 'this year'], ['Overdue', '₹0', 'nothing due', 'ok'], ['Open bills', '1', money(48000) + ' open']]} />
      <Sect T={T} right={<Meta T={T}>tap to open the bill</Meta>}>Returned from</Sect>
      <HmCard T={T} pad="2px 14px">{r.bills.map(([no, on, billed, back], i) => <div key={no} className="press" style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 50, borderTop: i ? `1px solid ${T.line}` : 0 }}><Mono T={T} size={13.5}>{no}</Mono><span style={{ flex: 1, minWidth: 0 }}><Meta T={T} style={{ display: 'block' }}>{on} · {billed} pcs billed</Meta></span><span style={{ fontFamily: T.fontUI, fontSize: 12.5, color: T.ink, fontWeight: 500 }}>{back} back</span><Ic name="chevron-right" size={16} color={T.ink3} /></div>)}</HmCard>
      <Sect T={T}>Pieces coming back</Sect>
      <HmCard T={T} pad="2px 14px">
        {r.lines.map(([code, col, q, from, rate], i) => { const d = XD.byCode[code]; return <div key={code} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderTop: i ? `1px solid ${T.line}` : 0 }}>
          <Thumb T={T} d={d} w={56} h={70} r={12} />
          <span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 24, fontWeight: 600, color: T.ink, lineHeight: 1 }}>{code}</div><Meta T={T} style={{ display: 'block', marginTop: 4 }}>{d.cat} · {d.name}</Meta><div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4, fontSize: 12.5, color: T.ink2 }}><span style={{ width: 4, height: 14, borderRadius: 2, background: XD.cols[col] }} />{col}<span style={{ color: T.ink3 }}>· from {from}</span></div></span>
          <span style={{ textAlign: 'right', flex: 'none' }}><div style={{ fontFamily: T.fontUI, fontSize: 15, fontWeight: 600, color: T.ink }}>× {q}</div><div style={{ fontSize: 11, color: T.ink3, marginTop: 3, fontVariantNumeric: 'tabular-nums' }}>at {money(rate)}</div></span>
        </div>; })}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, padding: '10px 0 12px', borderTop: `1px solid ${T.line2}` }}><span style={{ fontSize: 12, color: T.ink3, flex: 1 }}>{pcs} pcs · 2 bills · 1 box</span><PriceF v={HM_RET_TOTAL} size={24} font={T.fontSerif} color={T.ink} dim={T.ink3} /></div>
      </HmCard>
      <div style={{ height: 10 }} />
      <HmCard T={T} alt pad="12px 14px"><div style={{ display: 'flex', gap: 10 }}><Ic name="package-check" size={18} color={T.warn} style={{ marginTop: 1 }} /><span><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Pill T={T} tone="warn" small>Stock on approval</Pill></div><div style={{ fontSize: 12.5, color: T.ink2, marginTop: 6, lineHeight: 1.35 }}>These {pcs} pcs go back to finished goods only when you approve. Until then they wait here.</div></span></div></HmCard>
      <Sect T={T}>Orders and payments</Sect>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}><HmChart T={T} mini title="Nalli Fashion Mart" d={HM_CH_RET.cust} h={56} /><HmChart T={T} mini title="Karthik Agency" d={HM_CH_RET.agency} h={56} /></div>
      <div style={{ marginTop: 6 }}><Legend T={T} items={[['orders', T.accent], ['payments', T.ok]]} /></div>
    </HmBody>
  </>, <HmFoot T={T} primary="Approve return" />);
}

/* ── W2 / W3 · web approvals: queue · the card · facts pane ── */
const HmLab = ({ T, children, right, style }) => <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '12px 0 6px', ...style }}><span style={{ width: 3, height: 12, borderRadius: 2, background: T.accent, alignSelf: 'center' }} /><span style={{ fontFamily: T.fontDisplay, fontSize: 15.5, fontWeight: 600, color: T.ink }}>{children}</span><span style={{ flex: 1 }} />{right}</div>;
function HmWebQueue({ T }) {
  return <div style={{ width: 300, flex: 'none', borderRight: `1px solid ${T.line}`, padding: '12px 12px 0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '0 2px 10px' }}><span style={{ fontFamily: T.fontDisplay, fontSize: 18, fontWeight: 600, color: T.ink }}>Sale orders</span><Meta T={T}>4 · flagged first</Meta><span style={{ flex: 1 }} /><Hit T={T} icon="sliders-horizontal" size={30} iconSize={14} style={{ background: T.chipBg, alignSelf: 'center' }} /></div>
    <div style={{ display: 'grid', gap: 8 }}>{HM_QUEUE.map(q => <HmQCard key={q.no} T={T} q={q} web picked={q.no === 'SO-3456'} />)}</div>
  </div>;
}
/* the card in the middle: the head, the standing tiles, the flag chips, the two charts, then the folds; the order lines live in the right pane */
function HmWebCard({ T, over: isOver, role = 'manager' }) {
  const open = isOver ? HM_OPEN.over : HM_OPEN.within, sub = role === 'subadmin', over = Math.max(0, open + HM_TOTAL - HM_C.line);
  return <div style={{ flex: 1, minWidth: 0, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
    <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', padding: '8px 16px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 26 }}><span style={{ fontFamily: T.fontMono, fontSize: 17, fontWeight: 600, color: T.ink }}>SO-3456</span><StatusPill T={T} s="Raised" /><span style={{ fontSize: 12, color: T.ink3, flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{HM_PCS} pcs · {money(HM_TOTAL)} · 13/10/26 · raised by Rohan Mehta</span><Hit T={T} icon="printer" size={28} iconSize={14} style={{ background: T.chipBg }} /></div>
      <div style={{ marginTop: 6 }}><HmCustomer T={T} web /></div>
      <div style={{ marginTop: 6 }}><HmTiles T={T} open={open} cols={4} /></div>
      <div style={{ marginTop: 7 }}><HmChips T={T} over={over} /></div>
      <div style={{ marginTop: 7 }}><HmCharts T={T} h={44} /></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7, marginTop: 7 }}><HmFold T={T} icon="message-square-text" label="Note" /><HmFold T={T} icon="history" label="History" sub="last 3 orders" /></div>
    </div>
    <div style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 8, padding: '4px 16px', borderTop: `1px solid ${T.line}`, background: T.surface }}>
      <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}><span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: T.fontUI, fontSize: 12.5, color: T.ink2, fontWeight: 500 }}>Mark for inspection<Ic name="arrow-right" size={13} />owner</span>{sub && <Meta T={T} style={{ fontSize: 11 }}>Over-the-line flags are cleared by admin</Meta>}</span>
      <span style={{ flex: 1 }} />
      <T.Btn kind="secondary" style={{ height: 36 }}>Reject</T.Btn><T.Btn kind="secondary" style={{ height: 36 }}>Hold</T.Btn>
      <T.Btn icon={sub ? 'send' : 'check'} style={{ height: 36, padding: '0 24px' }}>{sub ? 'Send to admin' : 'Approve'}</T.Btn>
    </div>
  </div>;
}
/* right pane: the order itself, lines with steppers, GST extra */
const HmOrderPane = ({ T }) => <div style={{ padding: '10px 14px', height: '100%', overflow: 'hidden' }}><HmLines T={T} web /><div style={{ marginTop: 8 }}><Meta T={T} style={{ display: 'block' }}>change a number with − and +</Meta></div></div>;
function HmWebApprovals({ T, over: isOver, role = 'manager' }) {
  const open = isOver ? HM_OPEN.over : HM_OPEN.within, over = Math.max(0, open + HM_TOTAL - HM_C.line);
  return <WebShell3 T={T} module="Home" crumb={['Home', 'Approvals', 'Sale orders', 'SO-3456']} section="Approvals" seg={Hm_SEG} active="Approvals" tabs={Hm_TABS('appr')} paneTitle={`Order · ${HM_ORDER_SUB}`} paneWidth={460} pane={<HmOrderPane T={T} />}>
    <ViewTabs T={T} tabs={Hm_APPR_TABS} active="Sale orders" />
    <div style={{ flex: 1, minHeight: 0, display: 'flex', marginTop: 6 }}><HmWebQueue T={T} /><HmWebCard T={T} over={isOver} role={role} /></div>
  </WebShell3>;
}
const WebHmApprovals = ({ T }) => <HmWebApprovals T={T} />;
const WebHmApproveFlagged = ({ T }) => <HmWebApprovals T={T} over role="subadmin" />;

/* ── gate pass: phone P6 · web W4 ── */
const HmKindDisc = ({ T, kind, s = 42 }) => <span style={{ width: s, height: s, borderRadius: 14, background: T.chipBg, color: T.ink2, display: 'grid', placeItems: 'center', flex: 'none' }}><Ic name={HM_KIND_IC[kind]} size={s * .45} sw={1.7} /></span>;
function HmTokenRow({ T, t }) {
  return <div className="press" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 12px', borderRadius: 18, background: T.surface, border: `1px solid ${T.line}`, boxShadow: T.dark ? 'none' : '0 6px 18px -14px rgba(36,23,18,.25)' }}>
    <HmKindDisc T={T} kind={t.kind} />
    <span style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Mono T={T} size={13}>{t.no}</Mono><span style={{ flex: 1 }} /><Meta T={T} style={{ flex: 'none' }}>{t.kind}</Meta></div>
      <div style={{ fontFamily: T.fontDisplay, fontSize: 19, fontWeight: 600, color: T.ink, lineHeight: 1.15, marginTop: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.party}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}><Meta T={T} style={{ flex: 'none' }}>{t.parcels} parcel{t.parcels > 1 ? 's' : ''}</Meta><span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: T.fontUI, fontSize: 11.5, fontWeight: 600, color: t.ok ? T.ok : T.warn, whiteSpace: 'nowrap' }}><Ic name={t.ok ? 'circle-check' : 'clock'} size={13} />{t.st}</span></div>
    </span>
    {!t.ok && <OutBtn T={T} small style={{ height: 36 }}>Verify</OutBtn>}
  </div>;
}
function ScreenHmGate({ T }) {
  return frameF(T, <>
    <div style={hmLift(T)}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '0 10px 0 12px', height: 44 }}><T.Lockup /><span style={{ flex: 1 }} /><span style={{ fontFamily: T.fontUI, fontSize: 12, color: T.ink3, marginRight: 4 }}>Guard</span><Hit T={T} icon="ellipsis-vertical" size={40} /></div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, padding: '4px 16px 0' }}><span style={{ fontFamily: T.fontDisplay, fontSize: 26, fontWeight: 500, color: T.ink }}>Gate pass</span><Meta T={T}>main gate · 12/09/26</Meta></div>
      <HmTabsRow T={T} tabs={[['Auto', 5], ['Manual', 4]]} active="Auto" />
    </div>
    <HmBody pb={118}>
      <Meta T={T} style={{ display: 'block', margin: '2px 2px 8px' }}>2 verified · 3 still to come through the gate</Meta>
      <div style={{ display: 'grid', gap: 9 }}>{HM_AUTO.map(t => <HmTokenRow key={t.no} T={T} t={t} />)}</div>
    </HmBody>
  </>, <div style={{ position: 'absolute', left: 14, right: 14, bottom: 22, display: 'flex', alignItems: 'center', gap: 10, padding: 8, borderRadius: T.rDock, ...glass(T) }}>
    <span style={{ paddingLeft: 10, flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 22, fontWeight: 600, color: T.ink, lineHeight: 1 }}>8</div><div style={{ fontSize: 11, color: T.ink3, marginTop: 2 }}>tokens today</div></span>
    <T.Btn icon="plus" style={{ height: 48 }}>New manual token</T.Btn>
  </div>);
}
const HM_COLS = [['Token', 142], ['Kind', 118], ['Party', 0], ['Parcels', 52], ['Claimed', 70], ['Status', 152], ['Time', 44]];
function HmTokenTable({ T, rows, pick }) {
  const cell = (w, style) => ({ width: w || undefined, flex: w ? 'none' : 1, minWidth: 0, ...style });
  return <div style={{ borderRadius: 18, background: T.surface, border: `1px solid ${T.line}`, overflow: 'hidden' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 14px', background: T.surface2, borderBottom: `1px solid ${T.line}` }}>{HM_COLS.map(([c, w]) => <span key={c} style={{ ...cell(w), fontFamily: T.fontUI, fontSize: 10, letterSpacing: '.06em', textTransform: 'uppercase', color: T.ink3, textAlign: c === 'Parcels' || c === 'Time' ? 'right' : 'left' }}>{c}</span>)}</div>
    {rows.map((t, i) => { const on = t.no === pick; return <div key={t.no} className="press" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', borderTop: i ? `1px solid ${T.line}` : 0, background: on ? T.accentSoft : 'transparent', boxShadow: on ? `inset 3px 0 0 ${T.accent}` : 'none' }}>
      <span style={{ ...cell(142), display: 'flex', alignItems: 'center', gap: 8 }}><HmKindDisc T={T} kind={t.kind} s={28} /><Mono T={T} size={12.5}>{t.no}</Mono></span>
      <span style={{ ...cell(118), fontSize: 12.5, color: T.ink2, lineHeight: 1.2 }}>{t.kind}{t.stock.includes('no PO') ? <div style={{ color: T.ink3, fontSize: 11 }}>no PO</div> : null}</span>
      <span style={cell(0)}><div style={{ fontFamily: T.fontDisplay, fontSize: 17, fontWeight: 600, color: T.ink, lineHeight: 1.1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.party}</div><Meta T={T}>{t.city}</Meta></span>
      <span style={{ ...cell(52), textAlign: 'right', fontSize: 13, color: T.ink, fontVariantNumeric: 'tabular-nums' }}>{t.parcels}</span>
      <span style={{ ...cell(70), fontSize: 12.5, color: T.ink2 }}>{t.claimed}</span>
      <span style={{ ...cell(152), display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600, color: t.ok ? T.ok : T.warn }}><Ic name={t.ok ? 'circle-check' : 'clock'} size={14} /><span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.st}</span></span>
      <span style={{ ...cell(44), textAlign: 'right', fontSize: 12, color: T.ink3, fontVariantNumeric: 'tabular-nums' }}>{t.at}</span>
    </div>; })}
  </div>;
}
/* the picked token, read-only: the fields the guard filled in */
function HmTokenPane({ T, t }) {
  const F = ({ k, v, icon, mono }) => <div style={{ display: 'flex', alignItems: 'center', gap: 8, minHeight: 46, borderTop: `1px solid ${T.line}` }}><span style={{ flex: 1, minWidth: 0 }}><Meta T={T} style={{ display: 'block', fontSize: 10.5 }}>{k}</Meta><div style={{ fontFamily: mono ? T.fontMono : T.fontUI, fontSize: 14, color: T.ink, fontWeight: 500, marginTop: 1 }}>{v}</div></span>{icon && <Ic name={icon} size={14} color={T.ink3} />}</div>;
  return <div style={{ padding: '12px 16px', height: '100%', overflow: 'hidden' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><HmKindDisc T={T} kind={t.kind} s={44} /><span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 21, fontWeight: 600, color: T.ink, lineHeight: 1.1 }}>{t.kind}</div><Meta T={T}>manual token · made by the guard</Meta></span><Pill T={T} tone={t.ok ? 'ok' : 'warn'}>{t.ok ? 'Done' : 'Active'}</Pill></div>
    <div style={{ marginTop: 12 }}>
      <F k="Party" v={`${t.party} · ${t.city}`} icon="chevrons-up-down" />
      <F k="Kind of entry" v={t.kind} icon="chevrons-up-down" />
      <F k="Parcels received" v={t.parcels} />
      <F k="Kind of stock" v={t.stock} icon="chevrons-up-down" />
      <F k="Claimed quantity" v={t.claimed} />
      <F k="Made by" v={`Ramesh (guard) · ${t.at}`} />
    </div>
    <div style={{ display: 'flex', gap: 10, padding: '10px 12px', borderRadius: 14, background: t.ok ? T.ok + '1A' : T.warn + '1A', border: `1px solid ${t.ok ? T.ok : T.warn}55`, marginTop: 10 }}><Ic name={t.ok ? 'circle-check' : 'clock'} size={17} color={t.ok ? T.ok : T.warn} style={{ marginTop: 1 }} /><span style={{ fontSize: 12.5, color: T.ink2, lineHeight: 1.35 }}>{t.ok ? <>Entry made in the ERP. <b style={{ color: T.ink, fontWeight: 600 }}>{t.st.split(' · ')[1]}</b></> : <>Stays <b style={{ color: T.ink, fontWeight: 600 }}>Active</b> until the {t.kind.toLowerCase()} is entered in the ERP.</>}</span></div>
    <div style={{ display: 'flex', gap: 8, marginTop: 12 }}><T.Btn kind="secondary" small icon="pencil" style={{ height: 38 }}>Edit token</T.Btn><T.Btn kind="secondary" small icon="printer" style={{ height: 38 }}>Print</T.Btn></div>
  </div>;
}
function WebHmGate({ T }) {
  const pick = HM_MANUAL[0];
  return <WebShell3 T={T} module="Home" crumb={['Home', 'Gate pass', 'Manual']} section="Gate pass" seg={Hm_SEG} active="Gate pass" tabs={Hm_TABS('gate')} paneTitle={pick.no} pane={<HmTokenPane T={T} t={pick} />}>
    <ViewTabs T={T} tabs={[['Auto', 5, 'zap'], ['Manual', 4, 'hand']]} active="Manual" />
    <div style={{ padding: '14px 24px 0', flex: 1, minHeight: 0, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}><T.Chip icon="search" outline>Token, party</T.Chip><T.Chip icon="calendar" x outline>Today</T.Chip><T.Chip on>Active 2</T.Chip><T.Chip outline>Done 2</T.Chip><span style={{ flex: 1 }} /><T.Btn icon="plus" style={{ height: 40 }}>New manual token</T.Btn></div>
      <HmTokenTable T={T} rows={HM_MANUAL} pick={pick.no} />
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '16px 2px 6px' }}><span style={{ width: 3, height: 12, borderRadius: 2, background: T.accent, alignSelf: 'center' }} /><span style={{ fontFamily: T.fontDisplay, fontSize: 16, fontWeight: 600, color: T.ink }}>Auto tokens still to come through the gate</span><span style={{ flex: 1 }} /><span className="press" style={{ fontSize: 12, color: T.ink2, fontWeight: 500 }}>Open Auto</span></div>
      <HmCard T={T} pad="2px 14px">{HM_AUTO.filter(t => !t.ok).map((t, i) => <div key={t.no} className="press" style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 48, borderTop: i ? `1px solid ${T.line}` : 0 }}><HmKindDisc T={T} kind={t.kind} s={30} /><Mono T={T} size={12.5}>{t.no}</Mono><span style={{ flex: 1, minWidth: 0, fontFamily: T.fontDisplay, fontSize: 16.5, fontWeight: 600, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.party}</span><Meta T={T}>{t.kind} · {t.parcels} parcels</Meta><span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600, color: T.warn, width: 62 }}><Ic name="clock" size={14} />Active</span></div>)}</HmCard>
      <Meta T={T} style={{ display: 'block', margin: '10px 4px 0', whiteSpace: 'normal' }}>A manual token stays Active until the entry is made in the ERP. Auto tokens are only verified at the gate.</Meta>
    </div>
  </WebShell3>;
}

/* ── board registration: captions and order are what the owner reads ── */
(window.NEW_DRAFT_MODULES = window.NEW_DRAFT_MODULES || []).push({ module: 'Home', note: 'landing · approvals with the sale-order card (BRD F:46–56) · gate pass (13 Oct, review 2)', subs: [
  { name: 'Home', flow: 'landing → quick links',
    phone: [['Home · sale executive landing', ScreenHmHome]],
    web: [['Home · landing on the web shell', WebHmHome]] },
  { name: 'Approvals', flow: 'queue → sale order card → over the credit line → sale return card',
    phone: [['Approvals · queue', ScreenHmApprovals], ['Approvals · sale order card · provisional, owner\'s rule of 13 Oct 15:30', ScreenHmApproveSO], ['Approvals · flagged, over the credit line (sub-admin) · provisional, owner\'s rule of 13 Oct 15:30', ScreenHmApproveSOFlagged], ['Approvals · flagged, admin approves · provisional, owner\'s rule of 13 Oct 15:30', ScreenHmApproveSOAdmin], ['Approvals · sale return card', ScreenHmApproveReturn]],
    web: [['Approvals · card, order pane · provisional, owner\'s rule of 13 Oct 15:30', WebHmApprovals], ['Approvals · flagged, over the credit line (sub-admin) · provisional, owner\'s rule of 13 Oct 15:30', WebHmApproveFlagged]] },
  { name: 'Gate pass', flow: 'tokens',
    phone: [['Gate pass · tokens', ScreenHmGate]],
    web: [['Gate pass · token list, token pane', WebHmGate]] },
] });

Object.assign(window, { Hm_SEG, Hm_TABS, Hm_APPR_TABS, HM_C, HM_LINES, HM_TOTAL, HM_PCS, HM_QUEUE, HM_RET, HM_AUTO, HM_MANUAL, HmCard, HmBody, HmHeader, HmPageHead, HmTabsRow, HmSeg, HmNeed, HmQuick, HmNotice, HmNoticePane, HmDocHead, HmFlags, HmCustomer, HmStanding, HmCredit, HmAppetite, HmColRow, HmLines, HmNote, HmHistory, HmChart, HmFoot, HmQCard, HmApprovalSO, HmLab, HmWebQueue, HmWebCard, HmOrderPane, HmTile, HmTiles, HmChips, HmFold, HmCharts, HmWebApprovals, HmKindDisc, HmTokenRow, HmTokenTable, HmTokenPane,
  ScreenHmHome, WebHmHome, ScreenHmApprovals, ScreenHmApproveSO, ScreenHmApproveSOFlagged, ScreenHmApproveSOAdmin, ScreenHmApproveReturn, WebHmApprovals, WebHmApproveFlagged, ScreenHmGate, WebHmGate });
