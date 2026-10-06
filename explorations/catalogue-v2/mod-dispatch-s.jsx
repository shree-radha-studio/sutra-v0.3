/* NEW DRAFTS · Dispatch · the "structured" look (6 Oct 2026). Phone screens only; web lives in mod-dispatch-s-web.jsx.
   Rectangular (4px panes, 3px tags and buttons), flat 1px-ruled header, sand + espresso + ONE maroon line per screen,
   danger only for overdue / blocked / rejected, warn only for due-soon, status as uppercase text in an outlined tag.
   Reuses the data (DC, dOf, dpcs, dueTxt, DIN, XD.parcels) and chrome (frameF, T.Island) from mod-dispatch.jsx / final.jsx.
   Every identifier is prefixed Ds. No registration here: mod-dispatch-s-web.jsx registers the module. */

/* ── helpers ────────────────────────────────────────────────────────────── */
const dsDate = d => { const b = new Date(2026, 8, 8 + d); const p = n => String(n).padStart(2, '0'); return `${p(b.getDate())}/${p(b.getMonth() + 1)}/${String(b.getFullYear()).slice(2)}`; };
const dsDueTone = (T, d) => d < 0 ? T.danger : d <= 2 ? T.warn : T.ink2;
/* Outlined rectangular status tag: short uppercase text, 3px radius. tone = muted · ink · danger · warn · accent */
const DsTag = ({ T, tone = 'muted', fill, children, style }) => { const c = tone === 'danger' ? T.danger : tone === 'warn' ? T.warn : tone === 'accent' ? T.accent : tone === 'ink' ? T.ink : T.ink3; return <span style={{ display: 'inline-flex', alignItems: 'center', height: 20, padding: '0 6px', borderRadius: 3, border: `1px solid ${c}`, background: fill ? c : 'transparent', color: fill ? T.bg : c, fontFamily: T.fontUI, fontSize: 10, fontWeight: 600, letterSpacing: '.07em', textTransform: 'uppercase', whiteSpace: 'nowrap', flex: 'none', lineHeight: 1, ...style }}>{children}</span>; };
/* Ruled list row: 56px on phone, 1px rule on top, 12px side gutter */
const DsRow = ({ T, children, h = 56, on, style, press = true }) => <div className={press ? 'press' : undefined} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: h, padding: '0 12px', borderTop: `1px solid ${T.line}`, background: on ? T.surface2 : 'transparent', ...style }}>{children}</div>;
/* Count cell for the node strip: big number, 11px uppercase label */
const DsCount = ({ T, n, label, tone, first }) => <div style={{ flex: 1, minWidth: 0, padding: '10px 10px 9px', borderLeft: first ? 'none' : `1px solid ${T.line}` }}><div style={{ fontFamily: T.fontDisplay, fontSize: 30, fontWeight: 600, lineHeight: 1, color: tone || T.ink, fontVariantNumeric: 'tabular-nums' }}>{n}</div><div style={{ fontFamily: T.fontUI, fontSize: 11, letterSpacing: '.07em', textTransform: 'uppercase', color: T.ink3, marginTop: 5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</div></div>;
/* Column heads: 11px uppercase, right-aligned for numbers */
const DsColHead = ({ T, cols, style }) => <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: 30, padding: '0 12px', borderTop: `1px solid ${T.line}`, background: T.surface2, ...style }}>{cols.map(([l, w, right]) => <span key={l} style={{ width: w, flex: w ? 'none' : 1, textAlign: right ? 'right' : 'left', fontFamily: T.fontUI, fontSize: 11, letterSpacing: '.07em', textTransform: 'uppercase', color: T.ink3, whiteSpace: 'nowrap' }}>{l}</span>)}</div>;
/* Numbers: right aligned, tabular */
const DsNum = ({ T, children, w = 56, size = 13, color, style }) => <span style={{ width: w, flex: 'none', textAlign: 'right', fontFamily: T.fontUI, fontSize: size, color: color || T.ink, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap', ...style }}>{children}</span>;
const DsMeta = ({ T, children, style }) => <span style={{ fontFamily: T.fontUI, fontSize: 11.5, color: T.ink3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', ...style }}>{children}</span>;
/* Primary button carries the screen's one maroon line; outline is ink on sand. 48px tall on phone. */
const DsBtn = ({ T, icon, children, kind = 'primary', h = 48, style }) => { const P = kind === 'primary'; return <span className="press" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, height: h, padding: '0 16px', borderRadius: 3, background: P ? T.accent : 'transparent', border: `1px solid ${P ? T.accent : T.ink}`, color: P ? T.onAccent : T.ink, fontFamily: T.fontUI, fontSize: 13, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', whiteSpace: 'nowrap', ...style }}>{icon && <Ic name={icon} size={16} sw={2} />}{children}</span>; };
/* Photo beside every design number: 3px radius */
const DsThumb = ({ T, d, w = 36, h = 45 }) => <Thumb T={T} d={d} w={w} h={h} r={3} />;
/* Design cell: photo, number as the head, colour name in plain text */
const DsDesign = ({ T, code, colour, sub, w = 36, h = 45, size = 17 }) => { const d = dOf(code, colour); return <><DsThumb T={T} d={d} w={w} h={h} /><span style={{ flex: 1, minWidth: 0 }}><div style={{ display: 'flex', alignItems: 'baseline', gap: 7 }}><Num T={T} size={size}>{code}</Num><span style={{ fontFamily: T.fontUI, fontSize: 12, color: T.ink2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{colour}</span></div>{sub && <DsMeta T={T} style={{ display: 'block', marginTop: 2 }}>{sub}</DsMeta>}</span></>; };

/* ── chrome: flat header bar, search, node strip ─────────────────────────── */
function DsTop({ T, title, back, role = 'Packer' }) {
  return <div style={{ display: 'flex', alignItems: 'center', gap: 4, height: 48, padding: '0 8px 0 4px' }}>{back ? <Hit T={T} icon="chevron-left" size={48} iconSize={22} /> : <span style={{ width: 8 }} />}{title ? <span style={{ fontFamily: T.fontDisplay, fontSize: 22, fontWeight: 600, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginLeft: back ? 0 : 8 }}>{title}</span> : <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginLeft: 8 }}><img src={XD.A + 'logo/sutra-mark-gold.png'} style={{ height: 20 }} /><span style={{ fontFamily: T.fontDisplay, fontSize: 22, fontWeight: 600, color: T.ink }}>Dispatch</span></span>}<span style={{ flex: 1 }} /><DsMeta T={T} style={{ marginRight: 6 }}>{role}</DsMeta><DsTag T={T}>Live</DsTag><Hit T={T} icon="ellipsis-vertical" size={48} iconSize={20} /></div>;
}
function DsSearch({ T, placeholder = 'Customer, order no, design' }) {
  return <div style={{ display: 'flex', gap: 8, padding: '0 12px 10px' }}><span className="press" style={{ width: 48, height: 44, borderRadius: 3, border: `1px solid ${T.line2}`, display: 'grid', placeItems: 'center', color: T.ink, flex: 'none' }}><Ic name="sliders-horizontal" size={18} /></span><div style={{ flex: 1, minWidth: 0, height: 44, borderRadius: 3, border: `1px solid ${T.line2}`, background: T.surface, display: 'flex', alignItems: 'center', gap: 8, padding: '0 10px' }}><Ic name="scan-line" size={18} color={T.ink} /><span style={{ flex: 1, minWidth: 0, fontFamily: T.fontUI, fontSize: 13, color: T.ink3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{placeholder}</span><Ic name="search" size={16} color={T.ink2} /></div></div>;
}
/* Node strip: flat tabs, counts in tabular text, the active one underlined. accent = this screen's maroon line lives here */
function DsNodes({ T, active = 'Pending', accent }) {
  return <div style={{ display: 'flex', alignItems: 'stretch', overflow: 'hidden', padding: '0 12px', borderTop: `1px solid ${T.line}` }}>{D_NODES_P.map(([ic, l, n]) => { const on = l === active; return <span key={l} className="press" style={{ flex: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, height: 44, padding: '0 10px', borderBottom: `2px solid ${on ? (accent ? T.accent : T.ink) : 'transparent'}`, color: on ? T.ink : T.ink2, fontFamily: T.fontUI, fontSize: 13, fontWeight: on ? 600 : 500, whiteSpace: 'nowrap', marginBottom: -1 }}>{l}{n != null && <span style={{ fontSize: 11.5, color: on ? T.ink : T.ink3, fontVariantNumeric: 'tabular-nums' }}>{n}</span>}</span>; })}</div>;
}
function DsHeader({ T, node, accent, title, back, placeholder, role }) {
  return <div style={{ background: T.bg, borderBottom: `1px solid ${T.line2}`, marginTop: -54, paddingTop: 54, flex: 'none' }}><DsTop T={T} title={title} back={back} role={role} /><DsSearch T={T} placeholder={placeholder} />{node && <DsNodes T={T} active={node} accent={accent} />}</div>;
}
const DsBody = ({ children, style }) => <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', padding: '0 0 110px', ...style }}>{children}</div>;
const DsFoot = ({ children }) => <div style={{ position: 'absolute', left: 12, right: 12, bottom: 100, display: 'flex', gap: 8 }}>{children}</div>;
/* Section label: 11px uppercase on a rule, optional right text */
const DsSect = ({ T, children, right, style }) => <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, padding: '14px 12px 6px', ...style }}><span style={{ fontFamily: T.fontUI, fontSize: 11, letterSpacing: '.07em', textTransform: 'uppercase', color: T.ink3, fontWeight: 600 }}>{children}</span><span style={{ flex: 1 }} />{right && <DsMeta T={T}>{right}</DsMeta>}</div>;
/* Flat camera band: no rounded viewfinder, a 1px frame rectangle and the scan line */
const DsCam = ({ T, h = 200, children }) => <div style={{ position: 'relative', height: h, background: '#171311', overflow: 'hidden' }}><img src={XD.byCode['2798'].src} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: .45, filter: 'saturate(.4)' }} /><div style={{ position: 'absolute', left: 48, right: 48, top: h * .26, height: h * .48, border: '1px solid rgba(255,255,255,.75)', boxShadow: '0 0 0 2000px rgba(10,8,7,.4)' }} /><div style={{ position: 'absolute', left: 48, right: 48, top: h * .5, height: 1, background: 'rgba(255,255,255,.85)' }} />{children}</div>;

/* ── Pending: the phone default node. money = manager variant ───────────── */
const DS_PENDING_COUNTS = [['Overdue', 3, 'danger'], ['Due soon', 2, 'warn'], ['Short', 4], ['Packable', 3]];
function DsPendingList({ T, money, open = 'c6', openOrder = 'SO-2607', list = DC }) {
  return <div>{list.map(c => { const on = c.id === open; const pcs = dpcs(c); const mx = Math.min(...c.orders.map(o => o.due));
    return <div key={c.id}>
      <DsRow T={T} on={on}><Ic name={on ? 'chevron-down' : 'chevron-right'} size={16} color={T.ink3} /><span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontUI, fontSize: 15, fontWeight: 600, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</div><DsMeta T={T} style={{ display: 'block', marginTop: 2 }}>{c.orders.length} order{c.orders.length > 1 ? 's' : ''} · {pcs} pcs · {c.city}</DsMeta></span><span style={{ textAlign: 'right', flex: 'none' }}><div style={{ fontFamily: T.fontUI, fontSize: 12.5, fontWeight: 600, color: dsDueTone(T, mx), fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{dueTxt(mx)}</div><DsMeta T={T} style={{ display: 'block', marginTop: 2 }}>P{c.priority} · {c.tier}</DsMeta></span></DsRow>
      {on && <div style={{ background: T.surface }}>
        <div style={{ display: 'flex', gap: 14, padding: '8px 12px 8px 38px', borderTop: `1px solid ${T.line}`, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2, overflow: 'hidden', whiteSpace: 'nowrap' }}><span><Ic name="phone" size={11} color={T.ink3} style={{ verticalAlign: -1, marginRight: 4 }} />{c.phone}</span><span><Ic name="truck" size={11} color={T.ink3} style={{ verticalAlign: -1, marginRight: 4 }} />{c.transport}</span><span><Ic name="user" size={11} color={T.ink3} style={{ verticalAlign: -1, marginRight: 4 }} />{c.broker}</span></div>
        {c.orders.map(o => { const oo = o.no === openOrder; const total = o.lines.reduce((t, l) => t + l[2], 0), stock = o.lines.reduce((t, l) => t + (l[3] ? l[2] : 0), 0); const amt = o.lines.reduce((t, l) => t + l[2] * (dOf(l[0], l[1]).price || 0), 0); const short = total - stock;
          return <div key={o.no}>
            <DsRow T={T} h={48} style={{ paddingLeft: 38 }}><Ic name={oo ? 'chevron-down' : 'chevron-right'} size={14} color={T.ink3} /><Mono T={T}>{o.no}</Mono><DsMeta T={T}>{o.date}</DsMeta>{short > 0 ? <DsTag T={T} tone="danger">{short} short</DsTag> : <DsTag T={T}>In stock</DsTag>}<span style={{ flex: 1 }} /><DsNum T={T} w={52}>{total} pcs</DsNum></DsRow>
            {oo && <div style={{ paddingLeft: 38 }}>
              <DsColHead T={T} cols={money ? [['Design'], ['Qty', 36, true], ['Rate', 60, true], ['Amount', 72, true]] : [['Design'], ['Qty', 40, true], ['Stock', 64, true]]} style={{ padding: '0 12px 0 0' }} />
              {o.lines.map((l, i) => { const d = dOf(l[0], l[1]); return <DsRow key={i} T={T} h={56} press={false} style={{ padding: '0 12px 0 0' }}><DsDesign T={T} code={l[0]} colour={l[1]} size={16} w={32} h={40} sub={!l[3] ? `${Math.min(l[2], 4)} at the last step` : null} /><DsNum T={T} w={money ? 36 : 40}>{l[2]}</DsNum>{money ? <><DsNum T={T} w={60} color={T.ink2}>{d.price.toLocaleString('en-IN')}</DsNum><DsNum T={T} w={72} style={{ fontWeight: 600 }}>{DIN(l[2] * d.price)}</DsNum></> : <DsNum T={T} w={64} color={l[3] ? T.ink2 : T.danger}>{l[3] ? 'ready' : 'short'}</DsNum>}</DsRow>; })}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, height: 40, padding: '0 12px 0 0', borderTop: `1px solid ${T.line2}` }}><DsMeta T={T}>Order · {total} pcs</DsMeta><span style={{ flex: 1 }} />{money ? <span style={{ fontFamily: T.fontUI, fontSize: 14, fontWeight: 600, color: T.ink, fontVariantNumeric: 'tabular-nums' }}>{DIN(amt)}</span> : <DsMeta T={T}>amounts hidden for your role</DsMeta>}</div>
            </div>}
          </div>; })}
      </div>}
    </div>; })}</div>;
}
function ScreenDsPending({ T, money = false }) {
  return frameF(T, <><DsHeader T={T} node="Pending" accent role={money ? 'Manager' : 'Packer'} /><DsBody>
    <div style={{ display: 'flex', borderBottom: `1px solid ${T.line2}`, background: T.surface }}>{DS_PENDING_COUNTS.map(([l, n, tone], i) => <DsCount key={l} T={T} n={n} label={l} first={i === 0} tone={tone === 'danger' ? T.danger : tone === 'warn' ? T.warn : null} />)}</div>
    <DsSect T={T} right="7 orders · 94 pcs · oldest due first">Customers</DsSect>
    <DsPendingList T={T} money={money} />
  </DsBody></>, <T.Island active="Dispatch" />);
}
const ScreenDsPendingMgr = ({ T }) => <ScreenDsPending T={T} money />;

/* ── Ready: customer rows with priority tag, due date, PACK ─────────────── */
function DsReadyRow({ T, c, open }) {
  const pcs = dpcs(c), pk = dpack(c); const o = c.orders[0]; const mx = Math.min(...c.orders.map(x => x.due));
  return <div style={{ background: open ? T.surface : 'transparent' }}>
    <DsRow T={T} h={64} press={false}><span style={{ flex: 1, minWidth: 0 }}><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><DsTag T={T} tone={c.priority <= 2 ? 'ink' : 'muted'} fill={c.priority === 1}>P{c.priority}</DsTag><span style={{ fontFamily: T.fontUI, fontSize: 15, fontWeight: 600, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</span></div><DsMeta T={T} style={{ display: 'block', marginTop: 3 }}>{c.city} · {c.orders.map(x => x.no).join(' · ')} · {c.transport}</DsMeta></span><span style={{ textAlign: 'right', flex: 'none' }}><div style={{ fontFamily: T.fontUI, fontSize: 12.5, fontWeight: 600, color: dsDueTone(T, mx), fontVariantNumeric: 'tabular-nums' }}>due {dsDate(mx)}</div><DsMeta T={T} style={{ display: 'block', marginTop: 2 }}>{dueTxt(mx)}</DsMeta></span></DsRow>
    {open && <>
      {o.lines.map((l, i) => <DsRow key={i} T={T} h={56} press={false}><DsDesign T={T} code={l[0]} colour={l[1]} w={34} h={42} size={16} /><DsNum T={T} w={44}>× {l[2]}</DsNum>{l[3] ? <DsTag T={T}>Stock</DsTag> : <DsTag T={T} tone="danger">Short</DsTag>}</DsRow>)}
      {o.note && <div style={{ padding: '8px 12px', borderTop: `1px solid ${T.line}`, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2 }}>Note · {o.note}</div>}
    </>}
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderTop: `1px solid ${T.line}` }}><span style={{ fontFamily: T.fontUI, fontSize: 12.5, color: T.ink2, fontVariantNumeric: 'tabular-nums' }}><b style={{ color: T.ink, fontFamily: T.fontDisplay, fontSize: 20 }}>{pcs}</b> pcs · {pk} packable</span>{pk === pcs ? <DsTag T={T}>Fully packable</DsTag> : <DsTag T={T} tone="danger">{pcs - pk} short</DsTag>}<span style={{ flex: 1 }} /><DsBtn T={T} icon="chevron-right" style={{ minWidth: 104 }}>Pack</DsBtn></div>
  </div>;
}
function ScreenDsReady({ T }) {
  return frameF(T, <><DsHeader T={T} node="Ready" /><DsBody>
    <div style={{ display: 'flex', borderBottom: `1px solid ${T.line2}`, background: T.surface }}>{[['Customers', 6], ['Pieces', 71], ['Due ≤ 2 d', 2, T.warn], ['Overdue', 3, T.danger]].map(([l, n, tone], i) => <DsCount key={l} T={T} n={n} label={l} first={i === 0} tone={tone} />)}</div>
    <DsSect T={T} right="due soonest first · in-stock only">Ready to pack</DsSect>
    <DsReadyRow T={T} c={DC[2]} open /><div style={{ height: 8, borderTop: `1px solid ${T.line}`, background: T.bg2 }} /><DsReadyRow T={T} c={DC[0]} /><div style={{ height: 8, borderTop: `1px solid ${T.line}`, background: T.bg2 }} /><DsReadyRow T={T} c={DC[3]} />
  </DsBody></>, <T.Island active="Dispatch" />);
}

/* ── Scan: packing, tally, last scanned piece, box list ────────────────── */
const DS_SCANS = [['1243', 'Mehroon', 'PC-8841-0032', '3 of 3', 'ok'], ['6002', 'Lilac', 'PC-6002-0417', 'not in this order', 'rej'], ['3661', 'Peach', 'PC-3661-0108', '1 of 4', 'ok']];
function ScreenDsScan({ T }) {
  const c = DC[2]; const boxes = XD.parcels.slice(0, 3);
  return frameF(T, <><DsHeader T={T} title="Packing" back placeholder="Scan or type a serial" /><DsBody>
    <DsCam T={T} h={168}><div style={{ position: 'absolute', left: 12, top: 10, right: 12, display: 'flex', alignItems: 'center', gap: 8, fontFamily: T.fontUI, fontSize: 12, color: '#fff' }}><span>{c.name} · <b>P00059</b> · SO-3034</span><span style={{ flex: 1 }} /><span style={{ fontSize: 10, letterSpacing: '.07em', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,.6)', padding: '2px 6px', borderRadius: 3 }}>Phone holds the box</span></div><div style={{ position: 'absolute', left: 0, right: 0, bottom: 8, textAlign: 'center', fontFamily: T.fontUI, fontSize: 11.5, color: 'rgba(255,255,255,.85)' }}>Hold the barcode in the frame</div></DsCam>
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, padding: '12px 12px 10px', borderBottom: `1px solid ${T.line2}`, background: T.surface }}><span style={{ flex: 1 }}><div style={{ fontFamily: T.fontUI, fontSize: 11, letterSpacing: '.07em', textTransform: 'uppercase', color: T.ink3 }}>In this box</div><div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 64, fontWeight: 600, lineHeight: .95, color: T.ink, fontVariantNumeric: 'tabular-nums' }}>12</span><span style={{ fontFamily: T.fontUI, fontSize: 14, color: T.ink2 }}>pcs</span></div></span><span style={{ textAlign: 'right', fontFamily: T.fontUI, fontSize: 12, color: T.ink2, fontVariantNumeric: 'tabular-nums', lineHeight: 1.5 }}>12 of 12 planned<br />3 lines · 0 short</span></div>
    <DsSect T={T} right="newest first">Last scanned</DsSect>
    {DS_SCANS.map((s, i) => <DsRow key={i} T={T} h={56} press={false} on={i === 0}><DsDesign T={T} code={s[0]} colour={s[1]} sub={`serial ${s[2]} · ${s[3]}`} /><DsTag T={T} tone={s[4] === 'rej' ? 'danger' : 'ink'} fill={s[4] === 'rej'}>{s[4] === 'rej' ? 'Rejected' : 'Accepted'}</DsTag></DsRow>)}
    <DsSect T={T} right={`${c.name} · 3 boxes`}>Boxes</DsSect>
    <DsColHead T={T} cols={[['Box'], ['Lines', 44, true], ['Pcs', 40, true], ['Status', 80, true]]} />
    {boxes.map((p, i) => { const pcs = p.lines.reduce((s, l) => s + l[2], 0); return <DsRow key={p.code} T={T} h={48} on={i === 0}><Mono T={T} size={13}>{p.code}</Mono>{i === 0 && <DsMeta T={T}>packing into</DsMeta>}<span style={{ flex: 1 }} /><DsNum T={T} w={44}>{p.lines.length}</DsNum><DsNum T={T} w={40}>{pcs}</DsNum><span style={{ width: 80, flex: 'none', display: 'flex', justifyContent: 'flex-end' }}><DsTag T={T} tone={p.status === 'OPEN' ? 'ink' : 'muted'}>{p.status}</DsTag></span></DsRow>; })}
  </DsBody><DsFoot><DsBtn T={T} kind="outline" icon="keyboard" style={{ flex: 1 }}>Type serial</DsBtn><DsBtn T={T} icon="check" style={{ flex: 1.4 }}>Review box</DsBtn></DsFoot></>, <T.Island active="Dispatch" />);
}

/* ── Review: box contents as a ruled table, Remove and Confirm ──────────── */
function ScreenDsReview({ T }) {
  const p = XD.parcels[0]; const c = DC[2]; const pcs = p.lines.reduce((s, l) => s + l[2], 0);
  return frameF(T, <><DsHeader T={T} title="Review box" back placeholder="Scan or type a serial" /><DsBody>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 12px', borderBottom: `1px solid ${T.line2}`, background: T.surface }}><span style={{ flex: 1, minWidth: 0 }}><div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><Num T={T} size={24}>{p.code}</Num><DsMeta T={T}>{c.name} · SO-3034</DsMeta></div><DsMeta T={T} style={{ display: 'block', marginTop: 3 }}>opened 08/09/26 11:02 · {c.transport} · no rates on this phone</DsMeta></span><DsTag T={T} tone="ink">Open</DsTag></div>
    <DsColHead T={T} cols={[['Design'], ['Planned', 56, true], ['Packed', 52, true], ['', 44]]} />
    {p.lines.map((l, i) => <DsRow key={i} T={T} h={56} press={false} on={i === 2}><DsDesign T={T} code={l[0]} colour={l[1]} /><DsNum T={T} w={56} color={T.ink2}>{l[3]}</DsNum><DsNum T={T} w={52} style={{ fontWeight: 600 }}>{l[2]}</DsNum><span className="press" style={{ width: 44, height: 44, flex: 'none', display: 'grid', placeItems: 'center', color: i === 2 ? T.ink : T.ink3, border: `1px solid ${i === 2 ? T.ink : 'transparent'}`, borderRadius: 3 }}><Ic name="x" size={16} /></span></DsRow>)}
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 44, padding: '0 12px', borderTop: `1px solid ${T.line2}`, borderBottom: `1px solid ${T.line}` }}><span style={{ fontFamily: T.fontUI, fontSize: 12.5, color: T.ink2 }}><b style={{ color: T.ink, fontFamily: T.fontDisplay, fontSize: 20 }}>{pcs}</b> pcs · {p.lines.length} lines</span><span style={{ flex: 1 }} /><DsMeta T={T}>2 short of plan</DsMeta></div>
    <div style={{ margin: '12px 12px 0', padding: 12, border: `1px solid ${T.line2}`, borderRadius: 4, background: T.surface }}><div style={{ display: 'flex', gap: 10 }}><Ic name="triangle-alert" size={18} color={T.ink} /><span style={{ flex: 1, fontFamily: T.fontUI, fontSize: 13, color: T.ink }}><b>Remove 1 × 3661 Peach?</b><div style={{ color: T.ink2, fontSize: 12, marginTop: 3 }}>The piece becomes scannable elsewhere. The desk sees the change at once.</div><div style={{ display: 'flex', gap: 8, marginTop: 10 }}><DsBtn T={T} kind="outline" style={{ flex: 1 }}>Keep</DsBtn><DsBtn T={T} kind="outline" icon="x" style={{ flex: 1 }}>Remove</DsBtn></div></span></div></div>
    <div style={{ padding: '12px 12px 0', fontFamily: T.fontUI, fontSize: 11.5, color: T.ink3 }}>Confirm hands the box to the desk. The desk checks qty and rate and cuts the invoice; it shows here as invoiced.</div>
  </DsBody><DsFoot><DsBtn T={T} kind="outline" icon="plus" style={{ flex: 1 }}>Add line</DsBtn><DsBtn T={T} icon="check" style={{ flex: 1.5 }}>Confirm · close box</DsBtn></DsFoot></>, <T.Island active="Dispatch" />);
}

Object.assign(window, { dsDate, dsDueTone, DsTag, DsRow, DsCount, DsColHead, DsNum, DsMeta, DsBtn, DsThumb, DsDesign, DsTop, DsSearch, DsNodes, DsHeader, DsBody, DsFoot, DsSect, DsCam, DS_PENDING_COUNTS, DsPendingList, DsReadyRow, DS_SCANS, ScreenDsPending, ScreenDsPendingMgr, ScreenDsReady, ScreenDsScan, ScreenDsReview });
