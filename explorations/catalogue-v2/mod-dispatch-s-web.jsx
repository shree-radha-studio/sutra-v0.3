/* NEW DRAFTS · Dispatch · STRUCTURED · web (6 Oct 2026). The warehouse look the owner asked for: rectangular (4px panes,
   3px tags), 1px rules in T.line, no shadows, sand + espresso + one maroon line per screen; T.danger only for blocked /
   short / overdue, T.warn only for due-soon. Same chrome as mod-topbar2.jsx (WebShell3 + DISP_SEG + D_TABS3); data from
   mod-dispatch.jsx (DC, XD.parcels, dOf, dueTxt, DIN). Every identifier here is prefixed DsW. ₹ only on manager rows. */

const DsWUp = (T, extra) => ({ fontFamily: T.fontUI, fontSize: 11, letterSpacing: '.07em', textTransform: 'uppercase', color: T.ink3, whiteSpace: 'nowrap', ...extra });
const DsWNumStyle = (T, size = 13, color) => ({ fontFamily: T.fontUI, fontSize: size, fontWeight: 600, color: color || T.ink, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap', textAlign: 'right' });
const DsWDueTone = (T, d) => d < 0 ? T.danger : d <= 2 ? T.warn : T.ink2;
/* Rectangular outlined status tag · short uppercase text · 3px radius */
const DsWTag = ({ T, tone = 'muted', fill, children, style }) => { const c = tone === 'danger' ? T.danger : tone === 'warn' ? T.warn : tone === 'accent' ? T.accent : tone === 'ink' ? T.ink : T.ink3; return <span style={{ display: 'inline-flex', alignItems: 'center', height: 20, padding: '0 6px', borderRadius: 3, border: `1px solid ${c}`, background: fill ? c : 'transparent', color: fill ? T.bg : c, fontFamily: T.fontUI, fontSize: 10, fontWeight: 600, letterSpacing: '.07em', textTransform: 'uppercase', whiteSpace: 'nowrap', flex: 'none', lineHeight: 1, ...style }}>{children}</span>; };
/* Big count cell for the node strip */
const DsWCount = ({ T, n, label, tone, on, first, icon }) => <div className="press" style={{ flex: 1, minWidth: 0, padding: '10px 14px 9px', borderLeft: first ? 'none' : `1px solid ${T.line}`, borderBottom: on ? `2px solid ${T.accent}` : '2px solid transparent', background: on ? T.surface : 'transparent' }}><div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>{icon && <Ic name={icon} size={13} color={T.ink3} />}<span style={DsWUp(T, { overflow: 'hidden', textOverflow: 'ellipsis', color: on ? T.ink : T.ink3 })}>{label}</span></div><div style={{ fontFamily: T.fontDisplay, fontSize: 30, fontWeight: 600, lineHeight: 1, color: tone || T.ink, fontVariantNumeric: 'tabular-nums', marginTop: 6 }}>{n == null ? '—' : n}</div></div>;
const DSW_NODES = [['package-check', 'Ready', 6], ['clock', 'Pending', 42], ['package', 'Packing', 8], ['receipt', 'Billed', 4], ['warehouse', 'Stock', 612], ['package-x', 'Out of stock', 14, 'danger'], ['rotate-ccw', 'Sale return', 2]];
const DsWStrip = ({ T, on = 'Ready' }) => <div style={{ display: 'flex', borderBottom: `1px solid ${T.line2}`, background: T.bg2 || T.bg, flex: 'none' }}>{DSW_NODES.map(([ic, l, n, tone], i) => <DsWCount key={l} T={T} icon={ic} label={l} n={n} first={i === 0} on={on === l} tone={tone === 'danger' ? T.danger : undefined} />)}</div>;
/* Flat 4px panel with a ruled header bar */
const DsWPanel = ({ T, title, right, children, style, flat }) => <div style={{ borderRadius: 4, border: `1px solid ${T.line}`, background: T.surface, overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 0, ...style }}>{title && <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 36, padding: '0 12px', borderBottom: `1px solid ${T.line}`, flex: 'none' }}><span style={{ fontFamily: T.fontUI, fontSize: 13, fontWeight: 600, color: T.ink, whiteSpace: 'nowrap' }}>{title}</span><span style={{ flex: 1 }} />{right}</div>}<div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>{children}</div></div>;
/* Ruled table: cols = [label, width?, align?] · rows render themselves at 44px */
const DsWHead = ({ T, cols, pad = '0 12px', h = 30 }) => <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: h, padding: pad, borderBottom: `1px solid ${T.line2}`, background: T.surface2 }}>{cols.map(([l, w, align], i) => <span key={l + i} style={{ ...DsWUp(T), width: w, flex: w ? 'none' : 1, textAlign: align || (w ? 'right' : 'left'), overflow: 'hidden', textOverflow: 'ellipsis' }}>{l}</span>)}</div>;
const DsWRow = ({ T, children, h = 44, on, style, press = true, indent = 0 }) => <div className={press ? 'press' : undefined} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: h, padding: `0 12px 0 ${12 + indent}px`, borderBottom: `1px solid ${T.line}`, background: on ? T.surface2 : 'transparent', ...style }}>{children}</div>;
const DsWCell = ({ T, w, align, children, num, style }) => <span style={{ width: w, flex: w ? 'none' : 1, minWidth: 0, textAlign: align || (w ? 'right' : 'left'), fontFamily: T.fontUI, fontSize: 13, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontVariantNumeric: num ? 'tabular-nums' : undefined, ...style }}>{children}</span>;
const DsWTable = ({ T, cols, children, style }) => <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, ...style }}><DsWHead T={T} cols={cols} /><div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>{children}</div></div>;
/* Design cell: photo beside the number, the number is the head, colour as text */
const DsWDesign = ({ T, code, colour, w = 28, h = 35, size = 14 }) => <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, minWidth: 0 }}><Thumb T={T} d={dOf(code, colour)} w={w} h={h} r={3} /><span style={{ minWidth: 0 }}><div style={{ fontFamily: T.fontDisplay, fontSize: size, fontWeight: 600, color: T.ink, lineHeight: 1.1, whiteSpace: 'nowrap' }}>{code}</div><div style={{ fontFamily: T.fontUI, fontSize: 11, color: T.ink3, whiteSpace: 'nowrap' }}>{colour}</div></span></span>;
/* Buttons: primary = the one maroon line, outline = ink rule */
const DsWBtn = ({ T, children, icon, primary, small, style, on }) => <span className="press" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, height: small ? 30 : 36, padding: small ? '0 10px' : '0 14px', borderRadius: 3, border: `1px solid ${primary ? T.accent : on ? T.ink : T.line2}`, background: primary ? T.accent : on ? T.ink : 'transparent', color: primary || on ? T.bg : T.ink, fontFamily: T.fontUI, fontSize: small ? 12 : 13, fontWeight: 600, letterSpacing: primary ? '.06em' : 0, whiteSpace: 'nowrap', flex: 'none', ...style }}>{icon && <Ic name={icon} size={small ? 13 : 15} />}{children}</span>;
/* Flat tabs: uppercase, 2px underline in T.accent on the active one */
const DsWTabs = ({ T, items, on, style }) => <div style={{ display: 'flex', borderBottom: `1px solid ${T.line2}`, flex: 'none', ...style }}>{items.map(([l, n, tone]) => { const a = l === on; return <span key={l} className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 40, padding: '0 14px', borderBottom: `2px solid ${a ? T.accent : 'transparent'}`, marginBottom: -1, ...DsWUp(T, { fontSize: 11.5, fontWeight: a ? 600 : 500, color: a ? T.ink : T.ink2 }) }}>{l}{n != null && <span style={{ fontFamily: T.fontUI, fontSize: 11, fontWeight: 600, color: tone || T.ink3, fontVariantNumeric: 'tabular-nums' }}>{n}</span>}</span>; })}</div>;
const DsWMeta = ({ T, children, style }) => <span style={{ fontFamily: T.fontUI, fontSize: 11.5, color: T.ink3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', ...style }}>{children}</span>;
const DsWField = ({ T, icon, children, w }) => <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 32, padding: '0 10px', width: w, borderRadius: 3, border: `1px solid ${T.line2}`, fontFamily: T.fontUI, fontSize: 12.5, color: T.ink3, whiteSpace: 'nowrap' }}><Ic name={icon} size={13} />{children}</span>;
const DsWKv = ({ T, k, v, tone }) => <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, padding: '7px 0', borderBottom: `1px solid ${T.line}` }}><span style={DsWUp(T, { fontSize: 10.5 })}>{k}</span><span style={{ flex: 1 }} /><span style={{ fontFamily: T.fontUI, fontSize: 12.5, fontWeight: 500, color: tone || T.ink, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{v}</span></div>;
const DsWMain = ({ children, pad = '12px 20px 16px', style }) => <div style={{ flex: 1, minWidth: 0, minHeight: 0, overflow: 'hidden', padding: pad, display: 'flex', flexDirection: 'column', ...style }}>{children}</div>;
const DsWPane = ({ children, style }) => <div style={{ padding: '10px 12px', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', ...style }}>{children}</div>;
const dswPcs = o => o.lines.reduce((t, l) => t + l[2], 0), dswStock = o => o.lines.reduce((t, l) => t + (l[3] ? l[2] : 0), 0), dswAmt = o => o.lines.reduce((t, l) => t + l[2] * (dOf(l[0], l[1]).price || 0), 0);
const dswCust = c => ({ pcs: dpcs(c), pk: dpack(c), due: Math.min(...c.orders.map(o => o.due)) });

/* ── Pending book pane (right pane on Ready) ─────────────────────────────── */
function DsWPendingPane({ T, money = false, list = [DC[5], DC[2], DC[0], DC[1], DC[3], DC[4]], open = 'c6' }) {
  return <DsWPane style={{ padding: 0 }}>
    <div style={{ display: 'flex', gap: 6, padding: '8px 10px', borderBottom: `1px solid ${T.line}` }}><DsWField T={T} icon="search" w="100%">Customer or design</DsWField></div>
    <DsWHead T={T} cols={[['Customer'], ['Pcs', 36], ['Due', 58]]} pad="0 10px" />
    <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>{list.map(c => { const { pcs, pk, due } = dswCust(c); const on = c.id === open; return <div key={c.id}>
      <DsWRow T={T} on={on} style={{ padding: '0 10px' }}><Ic name={on ? 'chevron-down' : 'chevron-right'} size={14} color={T.ink3} /><DsWCell T={T}><div style={{ fontWeight: 600 }}>{c.name}</div><DsWMeta T={T} style={{ display: 'block' }}>{c.orders.length} order{c.orders.length > 1 ? 's' : ''} · {pcs - pk} short</DsWMeta></DsWCell><DsWCell T={T} w={36} num>{pcs}</DsWCell><DsWCell T={T} w={58} num style={{ color: DsWDueTone(T, due), fontWeight: 600, fontSize: 12 }}>{dueTxt(due)}</DsWCell></DsWRow>
      {on && c.orders.map(o => { const t = dswPcs(o), s = dswStock(o); return <DsWRow key={o.no} T={T} h={40} indent={18} style={{ padding: '0 10px 0 28px', background: T.surface }}><Mono T={T} size={12}>{o.no}</Mono><DsWMeta T={T}>{o.date}</DsWMeta>{t - s > 0 ? <DsWTag T={T} tone="danger">{t - s} short</DsWTag> : <DsWTag T={T}>Stock</DsWTag>}<span style={{ flex: 1 }} /><DsWCell T={T} w={money ? 72 : 36} num>{money ? DIN(dswAmt(o)) : t}</DsWCell></DsWRow>; })}
    </div>; })}</div>
    <div style={{ padding: '8px 10px', borderTop: `1px solid ${T.line}` }}><DsWMeta T={T}>42 orders · read-only · approval happens upstream</DsWMeta></div>
  </DsWPane>;
}

/* ── 1 · Ready: node strip → ruled table → PACK ──────────────────────────── */
const DSW_READY = [DC[2], DC[0], DC[3], DC[1], DC[5], DC[4]];
function WebDsReady({ T }) {
  return <WebShell3 T={T} module="Dispatch" crumb={['Dispatch', 'Ready orders']} section="Ready orders" seg={DISP_SEG} active="Ready" tabs={D_TABS3('Dispatch · Ready')} stripRight={<LiveChip T={T} />} paneTitle="Pending book · 42" paneWidth={330} pane={<DsWPendingPane T={T} />}>
    <DsWStrip T={T} on="Ready" />
    <DsWMain>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, flex: 'none' }}><span style={{ fontFamily: T.fontDisplay, fontSize: 18, fontWeight: 600, color: T.ink }}>Ready to pack</span><DsWMeta T={T}>6 customers · 71 pcs · only orders with at least one line in stock · no rates here</DsWMeta><span style={{ flex: 1 }} /><DsWField T={T} icon="search" w={220}>Customer or design no</DsWField><DsWBtn T={T} small icon="arrow-down-up">Due · oldest first</DsWBtn><DsWBtn T={T} small icon="filter">In-stock only</DsWBtn></div>
      <DsWPanel T={T} style={{ flex: 1 }}>
        <DsWTable T={T} cols={[['Customer'], ['Order', 150, 'left'], ['Pcs', 44], ['In stock', 64], ['Short', 52], ['Due', 86], ['Priority', 70, 'center'], ['', 92]]}>
          {DSW_READY.map((c, i) => { const { pcs, pk, due } = dswCust(c); const short = pcs - pk; return <DsWRow key={c.id} T={T} on={i === 0}>
            <DsWCell T={T}><div style={{ fontWeight: 600 }}>{c.name}</div><DsWMeta T={T} style={{ display: 'block' }}>{c.city} · {c.transport}</DsWMeta></DsWCell>
            <DsWCell T={T} w={150} align="left"><Mono T={T} size={12}>{c.orders.map(o => o.no).join(' · ')}</Mono><DsWMeta T={T} style={{ display: 'block' }}>{c.orders[0].date}</DsWMeta></DsWCell>
            <DsWCell T={T} w={44} num style={{ fontWeight: 600 }}>{pcs}</DsWCell>
            <DsWCell T={T} w={64} num>{pk}</DsWCell>
            <DsWCell T={T} w={52} num style={{ color: short ? T.danger : T.ink3, fontWeight: short ? 600 : 400 }}>{short || '—'}</DsWCell>
            <DsWCell T={T} w={86} num style={{ color: DsWDueTone(T, due), fontWeight: 600 }}>{dueTxt(due)}</DsWCell>
            <DsWCell T={T} w={70} align="center"><DsWTag T={T} tone={c.priority <= 2 ? 'ink' : 'muted'} fill={c.priority === 1}>P{c.priority}</DsWTag></DsWCell>
            <DsWCell T={T} w={92} align="right"><DsWBtn T={T} small primary={i === 0} on={false} icon="chevron-right" style={{ width: 84 }}>PACK</DsWBtn></DsWCell>
          </DsWRow>; })}
        </DsWTable>
      </DsWPanel>
      <div style={{ display: 'flex', gap: 14, marginTop: 8, flex: 'none' }}><DsWMeta T={T}>Short = ordered minus in stock · PACK opens the terminal for that customer · updated just now</DsWMeta></div>
    </DsWMain>
  </WebShell3>;
}

/* ── 2 · Pending: four situations as flat tabs · customer → order → lines · ₹ for the manager ── */
const DSW_SITUATIONS = [['Overdue', 3, 'danger'], ['Due soon', 2, 'warn'], ['Short', 4], ['Packable', 3]];
function DsWOrderPane({ T, c = DC[5], o, money = true }) {
  o = o || c.orders[0]; const t = dswPcs(o), s = dswStock(o);
  return <DsWPane>
    <div style={{ fontFamily: T.fontDisplay, fontSize: 18, fontWeight: 600, color: T.ink, lineHeight: 1.1 }}>{c.name}</div><DsWMeta T={T} style={{ display: 'block', marginTop: 2 }}>{c.market} · {c.city} · {c.tier} · score {c.score}</DsWMeta>
    <div style={{ marginTop: 8 }}><DsWKv T={T} k="Order" v={o.no + ' · ' + o.date} /><DsWKv T={T} k="Due" v={dueTxt(o.due)} tone={DsWDueTone(T, o.due)} /><DsWKv T={T} k="Pieces" v={`${t} ordered · ${s} in stock`} /><DsWKv T={T} k="Short" v={t - s ? `${t - s} pcs` : 'none'} tone={t - s ? T.danger : undefined} />{money && <DsWKv T={T} k="Order value" v={DIN(dswAmt(o))} />}<DsWKv T={T} k="Transport" v={c.transport} /><DsWKv T={T} k="Broker" v={c.broker} /><DsWKv T={T} k="Phone" v={c.phone} /></div>
    <div style={DsWUp(T, { margin: '12px 0 4px' })}>What is short</div>
    {o.lines.filter(l => !l[3]).length ? o.lines.filter(l => !l[3]).map((l, i) => <DsWRow key={i} T={T} h={44} press={false} style={{ padding: 0 }}><DsWDesign T={T} code={l[0]} colour={l[1]} /><span style={{ flex: 1 }} /><DsWCell T={T} w={40} num>× {l[2]}</DsWCell><DsWTag T={T} tone="danger">Short</DsWTag></DsWRow>) : <DsWMeta T={T}>Nothing short · fully packable</DsWMeta>}
    <span style={{ flex: 1 }} />
    <div style={{ display: 'flex', gap: 6, marginTop: 10 }}><DsWBtn T={T} small icon="package-x" style={{ flex: 1 }}>Out of stock</DsWBtn><DsWBtn T={T} small icon="external-link" style={{ flex: 1 }}>Dossier</DsWBtn></div>
  </DsWPane>;
}
function WebDsPending({ T, money = true, open = 'c6', openOrder = 'SO-2607' }) {
  const list = [DC[5], DC[2], DC[0], DC[1], DC[3], DC[4]];
  return <WebShell3 T={T} module="Dispatch" crumb={['Dispatch', 'Pending orders', 'Overdue']} section="Pending orders" seg={DISP_SEG} active="Pending" tabs={D_TABS3('Dispatch · Pending', [{ icon: 'file-text', label: 'SO-2607 · Nalli Fashion Mart' }])} stripRight={<LiveChip T={T} />} paneTitle="SO-2607" paneWidth={330} pane={<DsWOrderPane T={T} c={DC[5]} money={money} />}>
    <DsWStrip T={T} on="Pending" />
    <DsWMain>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flex: 'none' }}><span style={{ fontFamily: T.fontDisplay, fontSize: 18, fontWeight: 600, color: T.ink }}>Pending orders</span><DsWMeta T={T}>every approved order, in stock or not{money ? ' · rates for manager roles' : ' · no rates on this side'}</DsWMeta><span style={{ flex: 1 }} /><DsWField T={T} icon="search" w={220}>Customer, order or design</DsWField><DsWBtn T={T} small icon="arrow-down-up">Due · oldest first</DsWBtn></div>
      <DsWPanel T={T} style={{ flex: 1 }}>
        <DsWTabs T={T} items={DSW_SITUATIONS.map(([l, n, tone]) => [l, n, tone === 'danger' ? T.danger : tone === 'warn' ? T.warn : undefined])} on="Overdue" />
        <DsWTable T={T} cols={[['Customer · order · line'], ['Pcs', 48], ['In stock', 64], ['Short', 52], ['Due', 86], ...(money ? [['Value', 96]] : []), ['Status', 92, 'center']]}>
          {list.map(c => { const { pcs, pk, due } = dswCust(c); const on = c.id === open; return <div key={c.id}>
            <DsWRow T={T} on={on}><Ic name={on ? 'chevron-down' : 'chevron-right'} size={14} color={T.ink3} /><DsWCell T={T}><span style={{ fontWeight: 600 }}>{c.name}</span><DsWMeta T={T} style={{ marginLeft: 8 }}>{c.city} · {c.orders.length} order{c.orders.length > 1 ? 's' : ''}</DsWMeta></DsWCell><DsWCell T={T} w={48} num style={{ fontWeight: 600 }}>{pcs}</DsWCell><DsWCell T={T} w={64} num>{pk}</DsWCell><DsWCell T={T} w={52} num style={{ color: pcs - pk ? T.danger : T.ink3 }}>{pcs - pk || '—'}</DsWCell><DsWCell T={T} w={86} num style={{ color: DsWDueTone(T, due), fontWeight: 600 }}>{dueTxt(due)}</DsWCell>{money && <DsWCell T={T} w={96} num>{DIN(c.orders.reduce((s, o) => s + dswAmt(o), 0))}</DsWCell>}<DsWCell T={T} w={92} align="center">{due < 0 ? <DsWTag T={T} tone="danger">Overdue</DsWTag> : due <= 2 ? <DsWTag T={T} tone="warn">Due soon</DsWTag> : pcs - pk ? <DsWTag T={T}>Short</DsWTag> : <DsWTag T={T} tone="ink">Packable</DsWTag>}</DsWCell></DsWRow>
            {on && c.orders.map(o => { const t = dswPcs(o), s = dswStock(o); const oo = o.no === openOrder; return <div key={o.no}>
              <DsWRow T={T} h={40} indent={22} style={{ background: T.surface }}><Ic name={oo ? 'chevron-down' : 'chevron-right'} size={13} color={T.ink3} /><DsWCell T={T}><Mono T={T} size={12}>{o.no}</Mono><DsWMeta T={T} style={{ marginLeft: 8 }}>{o.date}{o.note ? ' · ' + o.note : ''}</DsWMeta></DsWCell><DsWCell T={T} w={48} num>{t}</DsWCell><DsWCell T={T} w={64} num>{s}</DsWCell><DsWCell T={T} w={52} num style={{ color: t - s ? T.danger : T.ink3 }}>{t - s || '—'}</DsWCell><DsWCell T={T} w={86} num style={{ color: DsWDueTone(T, o.due) }}>{dueTxt(o.due)}</DsWCell>{money && <DsWCell T={T} w={96} num>{DIN(dswAmt(o))}</DsWCell>}<DsWCell T={T} w={92} align="center">{t - s ? <DsWTag T={T} tone="danger">{t - s} short</DsWTag> : <DsWTag T={T}>Stock</DsWTag>}</DsWCell></DsWRow>
              {oo && o.lines.map((l, i) => { const d = dOf(l[0], l[1]); return <DsWRow key={i} T={T} h={44} indent={44} press={false} style={{ background: T.surface }}><DsWCell T={T}><DsWDesign T={T} code={l[0]} colour={l[1]} /></DsWCell><DsWCell T={T} w={48} num>{l[2]}</DsWCell><DsWCell T={T} w={64} num>{l[3] ? l[2] : 0}</DsWCell><DsWCell T={T} w={52} num style={{ color: l[3] ? T.ink3 : T.danger }}>{l[3] ? '—' : l[2]}</DsWCell><DsWCell T={T} w={86} num style={{ color: T.ink3 }}>{money ? DIN(d.price || 0) + ' / pc' : ''}</DsWCell>{money && <DsWCell T={T} w={96} num>{DIN(l[2] * (d.price || 0))}</DsWCell>}<DsWCell T={T} w={92} align="center">{l[3] ? <DsWTag T={T}>In stock</DsWTag> : <DsWTag T={T} tone="danger">Short</DsWTag>}</DsWCell></DsWRow>; })}
            </div>; })}
          </div>; })}
        </DsWTable>
      </DsWPanel>
    </DsWMain>
  </WebShell3>;
}

/* ── 3 · Packing terminal: customer strip · order lines · boxes · live invoice ── */
const DSW_PACK = [[DC[2], 5, 12, 1], [DC[0], 0, 9, 0], [DC[5], 12, 20, 2], [DC[3], 7, 9, 1], [DC[1], 3, 3, 1], [DC[4], 2, 8, 0]];
const DSW_LINES = [['1243', 'Mehroon', 3, 3, 45], ['3661', 'Peach', 4, 1, 3], ['2798', 'Sky', 5, 1, 20]];
const DSW_INV_LINE = { code: 'P00036', status: 'INVOICED', inv: 'SI-2287', lines: [['3661', 'Peach', 2, 2]] };
function DsWBox({ T, p, active, greyed }) {
  const pcs = p.lines.reduce((s, l) => s + l[2], 0); const st = p.status;
  return <div style={{ borderRadius: 4, border: `1px solid ${active ? T.accent : T.line}`, background: T.surface, opacity: greyed ? .6 : 1, overflow: 'hidden' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 34, padding: '0 10px', borderBottom: `1px solid ${T.line}`, borderTop: active ? `2px solid ${T.accent}` : '2px solid transparent' }}><Ic name="package" size={14} color={T.ink3} /><Mono T={T} size={12.5}>{p.code}</Mono><DsWTag T={T} tone={st === 'OPEN' ? 'ink' : 'muted'} fill={st === 'OPEN'}>{st}</DsWTag>{p.inv && <DsWMeta T={T}>{p.inv}</DsWMeta>}<span style={{ flex: 1 }} /><span style={DsWNumStyle(T, 12.5)}>{pcs} pcs</span></div>
    {p.lines.map((l, i) => <DsWRow key={i} T={T} h={40} press={false} style={{ padding: '0 10px', borderBottom: i === p.lines.length - 1 ? 'none' : `1px solid ${T.line}` }}><DsWDesign T={T} code={l[0]} colour={l[1]} w={24} h={30} size={13} /><span style={{ flex: 1 }} /><DsWCell T={T} w={40} num>× {l[2]}</DsWCell>{st === 'OPEN' && <Ic name="x" size={13} color={T.ink3} />}</DsWRow>)}
    {st === 'OPEN' && <div style={{ display: 'flex', gap: 6, padding: 8, borderTop: `1px solid ${T.line}` }}><DsWBtn T={T} small icon="check" style={{ flex: 1 }}>Close box</DsWBtn><DsWBtn T={T} small icon="printer">Label</DsWBtn></div>}
  </div>;
}
function DsWLiveInvoice({ T }) {
  const rows = [['1243', 'Mehroon', 3, 4495], ['3661', 'Peach', 1, 4995], ['2798', 'Sky', 1, 4995]]; const sub = rows.reduce((s, r) => s + r[2] * r[3], 0); const gst = Math.round(sub * .05);
  return <DsWPane style={{ padding: 0 }}>
    <div style={{ padding: '10px 12px', borderBottom: `1px solid ${T.line}` }}><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ fontFamily: T.fontUI, fontSize: 13, fontWeight: 600, color: T.ink }}>Ambika Enterprises</span><DsWTag T={T} tone="ink">Live</DsWTag></div><DsWMeta T={T} style={{ display: 'block', marginTop: 2 }}>SO-3034 · builds as pieces land in boxes · SI number on close</DsWMeta></div>
    <DsWHead T={T} cols={[['Design'], ['Qty', 36], ['Rate', 60], ['Amount', 72]]} pad="0 12px" />
    {rows.map((r, i) => <DsWRow key={i} T={T} h={44} press={false}><DsWCell T={T}><DsWDesign T={T} code={r[0]} colour={r[1]} w={24} h={30} size={13} /></DsWCell><DsWCell T={T} w={36} num>{r[2]}</DsWCell><DsWCell T={T} w={60} num style={{ color: T.ink2 }}>{r[3].toLocaleString('en-IN')}</DsWCell><DsWCell T={T} w={72} num style={{ fontWeight: 600 }}>{(r[2] * r[3]).toLocaleString('en-IN')}</DsWCell></DsWRow>)}
    <div style={{ padding: '6px 12px' }}><DsWKv T={T} k="Pieces" v="5 of 12" /><DsWKv T={T} k="Subtotal" v={DIN(sub)} /><DsWKv T={T} k="GST 5%" v={DIN(gst)} /><div style={{ display: 'flex', alignItems: 'baseline', padding: '10px 0 4px' }}><span style={DsWUp(T)}>Total so far</span><span style={{ flex: 1 }} /><span style={{ fontFamily: T.fontDisplay, fontSize: 22, fontWeight: 600, color: T.ink, fontVariantNumeric: 'tabular-nums' }}>{DIN(sub + gst)}</span></div></div>
    <span style={{ flex: 1 }} />
    <div style={{ padding: 10, borderTop: `1px solid ${T.line}`, display: 'flex', gap: 6 }}><DsWBtn T={T} small icon="printer" style={{ flex: 1 }}>Preview</DsWBtn><DsWBtn T={T} small icon="receipt" style={{ flex: 1 }} on>Close & bill</DsWBtn></div>
  </DsWPane>;
}
function WebDsPacking({ T, scanOn = true }) {
  const c = DC[2]; const ps = XD.parcels;
  return <WebShell3 T={T} module="Dispatch" crumb={['Dispatch', 'Packing', c.name]} section="Packing" seg={DISP_SEG} active="Packing" tabs={D_TABS3('Dispatch · Packing', [{ icon: 'file-text', label: 'SO-3034 · Ambika Enterprises' }])} stripRight={<LiveChip T={T} />} paneTitle="Live invoice · manager" paneWidth={330} pane={<DsWLiveInvoice T={T} />}>
    <div style={{ display: 'flex', borderBottom: `1px solid ${T.line2}`, background: T.bg2 || T.bg, flex: 'none', overflow: 'hidden' }}>{DSW_PACK.map(([cc, pk, od, inv], i) => { const on = cc.id === c.id; return <div key={cc.id} className="press" style={{ flex: 1, minWidth: 0, padding: '8px 12px', borderLeft: i ? `1px solid ${T.line}` : 'none', borderBottom: on ? `2px solid ${T.accent}` : '2px solid transparent', background: on ? T.surface : 'transparent' }}><div style={{ fontFamily: T.fontUI, fontSize: 12.5, fontWeight: 600, color: on ? T.ink : T.ink2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{cc.name}</div><div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 3 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 20, fontWeight: 600, color: T.ink, fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{pk}<span style={{ fontSize: 12, color: T.ink3, fontWeight: 500 }}> / {od}</span></span><DsWMeta T={T}>{inv} inv</DsWMeta></div></div>; })}</div>
    <DsWMain pad="10px 20px 14px">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, flex: 'none' }}>
        <DsWBtn T={T} icon="scan-line" on={scanOn} style={{ height: 36 }}>{scanOn ? 'Scanning here · desk holds the scanner' : 'Scan here'}</DsWBtn>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginLeft: 6 }}><span style={DsWUp(T)}>Scanned</span><span style={{ fontFamily: T.fontDisplay, fontSize: 30, fontWeight: 600, color: T.ink, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>5</span><span style={{ fontFamily: T.fontUI, fontSize: 13, color: T.ink3 }}>of 12</span><DsWMeta T={T} style={{ marginLeft: 6 }}>last · PC-2798-0211 · 14:02</DsWMeta></div>
        <span style={{ flex: 1 }} /><DsWBtn T={T} small icon="boxes">Select for shipment</DsWBtn><DsWBtn T={T} small icon="truck">Close shipment</DsWBtn><DsWBtn T={T} small icon="plus">Add box</DsWBtn>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, flex: 1, minHeight: 0 }}>
        <DsWPanel T={T} title={`${c.name} · SO-3034`} right={<><DsWMeta T={T}>{c.market} · {c.city} · {c.transport}</DsWMeta><DsWTag T={T} tone="ink">5 / 12 pcs</DsWTag></>}>
          <DsWTable T={T} cols={[['Design'], ['Ordered', 60], ['Packed', 56], ['Stock', 50], ['', 70]]}>
            {DSW_LINES.map((l, i) => { const [code, colour, qty, pk, stock] = l; const full = pk >= qty; return <DsWRow key={i} T={T} h={48} press={false} on={i === 1}><DsWCell T={T}><DsWDesign T={T} code={code} colour={colour} w={32} h={40} size={15} /></DsWCell><DsWCell T={T} w={60} num>{qty}</DsWCell><DsWCell T={T} w={56} num style={{ fontWeight: 600, color: full ? T.ink : T.ink2 }}>{pk}</DsWCell><DsWCell T={T} w={50} num style={{ color: stock < qty - pk ? T.danger : T.ink3 }}>{stock}</DsWCell><DsWCell T={T} w={70} align="right">{full ? <DsWTag T={T}>Done</DsWTag> : <DsWBtn T={T} small icon="chevron-right" style={{ height: 28, width: 66, padding: 0 }}>PACK</DsWBtn>}</DsWCell></DsWRow>; })}
            <DsWRow T={T} h={40} press={false} style={{ borderBottom: 'none' }}><Ic name="chevron-right" size={13} color={T.ink3} /><Mono T={T} size={12}>SO-3041</Mono><DsWMeta T={T}>05/09/26 · next order of this customer</DsWMeta><span style={{ flex: 1 }} /><DsWCell T={T} w={80} num style={{ color: T.ink3 }}>0 / 6 pcs</DsWCell></DsWRow>
          </DsWTable>
          <div style={{ padding: '8px 12px', borderTop: `1px solid ${T.line}` }}><DsWMeta T={T}>PACK adds one piece to the open box for items that cannot be scanned · no rates on this side</DsWMeta></div>
        </DsWPanel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minHeight: 0, overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 'none' }}><span style={DsWUp(T)}>Boxes · 4</span><span style={{ flex: 1 }} /><DsWTabs T={T} items={[['All', 4], ['Open', 1], ['Packed', 1], ['Invoiced', 2]]} on="All" style={{ borderBottom: 'none' }} /></div>
          <DsWBox T={T} p={ps[0]} active />
          <DsWBox T={T} p={ps[1]} />
          <DsWBox T={T} p={ps[2]} greyed={ps[2].status === 'INVOICED'} />
          <DsWBox T={T} p={DSW_INV_LINE} greyed />
        </div>
      </div>
    </DsWMain>
  </WebShell3>;
}

/* ── 4 · Billed: invoices table · invoice pane ───────────────────────────── */
const DSW_INVOICES = [['SI-2288', '08/09/26', DC[2], 'SO-3034', 2, 9490, 'Patel Parcel Service', 'Not shipped'], ['SI-2287', '08/09/26', DC[2], 'SO-3034', 2, 9990, 'Patel Parcel Service', 'Shipped'], ['SI-2271', '08/09/26', DC[4], 'SO-3036', 6, 26970, 'Punjab Freight', 'Delivered'], ['SI-2270', '08/09/26', DC[3], 'SO-3038', 4, 16890, 'Shree Transport', 'Shipped']];
function DsWInvoicePane({ T }) {
  const g = BILLED[0]; const o = g.orders[0]; const gst = Math.round(o.amt * .05);
  return <DsWPane>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 18, fontWeight: 600, color: T.ink }}>SI-2288</span><DsWTag T={T} tone="ink">Billed</DsWTag><span style={{ flex: 1 }} /><DsWMeta T={T}>{o.created}</DsWMeta></div>
    <DsWMeta T={T} style={{ display: 'block', marginTop: 2 }}>{g.c.name} · {g.c.city} · {o.no} · voucher ok in Busy</DsWMeta>
    <div style={{ marginTop: 8, borderRadius: 4, border: `1px solid ${T.line}`, overflow: 'hidden' }}><DsWHead T={T} cols={[['Design'], ['Qty', 36], ['Amount', 72]]} pad="0 10px" />{o.lines.map((l, i) => <DsWRow key={i} T={T} h={44} press={false} style={{ padding: '0 10px', borderBottom: i === o.lines.length - 1 ? 'none' : `1px solid ${T.line}` }}><DsWCell T={T}><DsWDesign T={T} code={l[0]} colour={l[1]} w={24} h={30} size={13} /></DsWCell><DsWCell T={T} w={36} num>{l[2]}</DsWCell><DsWCell T={T} w={72} num style={{ fontWeight: 600 }}>{(l[2] * (dOf(l[0], l[1]).price || 0)).toLocaleString('en-IN')}</DsWCell></DsWRow>)}</div>
    <div style={{ marginTop: 6 }}><DsWKv T={T} k="Subtotal" v={DIN(o.amt)} /><DsWKv T={T} k="GST 5%" v={DIN(gst)} /><DsWKv T={T} k="Total" v={DIN(o.amt + gst)} /><DsWKv T={T} k="Delivered" v={o.delivered} /><DsWKv T={T} k="Still pending" v={`${g.pending} pcs`} /><DsWKv T={T} k="Customer score" v={g.c.score} /></div>
    <span style={{ flex: 1 }} />
    <div style={{ display: 'flex', gap: 6, marginTop: 10 }}><DsWBtn T={T} small icon="printer" style={{ flex: 1 }}>Print</DsWBtn><DsWBtn T={T} small icon="rotate-ccw" style={{ flex: 1 }}>Return against this</DsWBtn><DsWBtn T={T} small icon="external-link">Dossier</DsWBtn></div>
  </DsWPane>;
}
function WebDsBilled({ T }) {
  return <WebShell3 T={T} module="Dispatch" crumb={['Dispatch', 'Billed', 'Today']} section="Billed" seg={DISP_SEG} active="Billed" tabs={D_TABS3('Dispatch · Billed')} stripRight={<LiveChip T={T} />} paneTitle="SI-2288" paneWidth={340} pane={<DsWInvoicePane T={T} />}>
    <DsWStrip T={T} on="Billed" />
    <DsWMain>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flex: 'none' }}><span style={{ fontFamily: T.fontDisplay, fontSize: 18, fontWeight: 600, color: T.ink }}>Sale invoices</span><DsWMeta T={T}>4 today · 14 pcs · ₹63,340 · GST extra</DsWMeta><span style={{ flex: 1 }} /><DsWField T={T} icon="search" w={220}>Invoice, order or customer</DsWField><DsWBtn T={T} small icon="calendar">Today</DsWBtn><DsWBtn T={T} small icon="download">Export</DsWBtn></div>
      <DsWPanel T={T} style={{ flex: 1 }}>
        <DsWTabs T={T} items={[['Sale invoices', 4], ['Shipments', 3]]} on="Sale invoices" />
        <DsWTable T={T} cols={[['Invoice', 90, 'left'], ['Date', 76, 'left'], ['Customer'], ['Order', 90, 'left'], ['Pcs', 44], ['Amount', 88], ['Transport', 150, 'left'], ['Status', 100, 'center']]}>
          {DSW_INVOICES.map(([no, date, c, so, pcs, amt, tr, st], i) => <DsWRow key={no} T={T} on={i === 0}><DsWCell T={T} w={90} align="left"><Mono T={T} size={12.5}>{no}</Mono></DsWCell><DsWCell T={T} w={76} align="left" num style={{ color: T.ink2 }}>{date}</DsWCell><DsWCell T={T}><span style={{ fontWeight: 600 }}>{c.name}</span><DsWMeta T={T} style={{ marginLeft: 8 }}>{c.city}</DsWMeta></DsWCell><DsWCell T={T} w={90} align="left"><Mono T={T} size={12} weight={500}>{so}</Mono></DsWCell><DsWCell T={T} w={44} num>{pcs}</DsWCell><DsWCell T={T} w={88} num style={{ fontWeight: 600 }}>{DIN(amt)}</DsWCell><DsWCell T={T} w={150} align="left" style={{ color: T.ink2 }}>{tr}</DsWCell><DsWCell T={T} w={100} align="center"><DsWTag T={T} tone={st === 'Not shipped' ? 'ink' : 'muted'}>{st}</DsWTag></DsWCell></DsWRow>)}
        </DsWTable>
      </DsWPanel>
      <div style={{ marginTop: 8, flex: 'none' }}><DsWMeta T={T}>Delivered on = dispatch + 3 days unless the customer confirms earlier · each row re-prints its invoice</DsWMeta></div>
    </DsWMain>
  </WebShell3>;
}

/* ── registration: guarded, a missing phone component never breaks the board ── */
const DsPick = l => l.filter(e => typeof e[1] === 'function');
(window.NEW_DRAFT_MODULES = window.NEW_DRAFT_MODULES || []).push({ module: 'Dispatch · structured', note: 'rectangular, ruled, two colours: the warehouse look (owner, 6 Oct) · drafts beside the 8 Sep band', subs: [
  { name: 'Structured · Ready', flow: 'node strip → ready table → PACK', phone: DsPick([['Ready · rows, priority tag, PACK', typeof ScreenDsReady === 'function' ? ScreenDsReady : null]]), web: DsPick([['Ready · node strip, ruled table, pending pane', WebDsReady]]) },
  { name: 'Structured · Pending', flow: 'four situations → customer → order → lines', phone: DsPick([['Pending · packer (no ₹)', typeof ScreenDsPending === 'function' ? ScreenDsPending : null], ['Pending · manager (₹)', typeof ScreenDsPendingMgr === 'function' ? ScreenDsPendingMgr : null]]), web: DsPick([['Pending · flat tabs, three-level table, order pane', WebDsPending]]) },
  { name: 'Structured · Packing', flow: 'terminal → scan → review', phone: DsPick([['Packing · scan, tally', typeof ScreenDsScan === 'function' ? ScreenDsScan : null], ['Packing · review box', typeof ScreenDsReview === 'function' ? ScreenDsReview : null]]), web: DsPick([['Packing · terminal, boxes, live invoice', WebDsPacking]]) },
  ...(typeof WebDsBilled === 'function' ? [{ name: 'Structured · Billed', flow: 'invoices → invoice pane', phone: [], web: [['Billed · invoices table, invoice pane', WebDsBilled]] }] : []),
] });
