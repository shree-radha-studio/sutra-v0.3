/* NEW DRAFTS · Dispatch (8 Sep 2026). Shared Dispatch components and the phone screens. Web screens live in
   mod-dispatch-web.jsx. Plan: plans/dispatch.md. Nothing here touches the Finals.
   Rules kept: sand canvas, one maroon line per screen (the primary button), photo beside every design number, the
   number is the head, Lucide only, money only for manager roles and only where the BRD allows. */

const DP_P = ['#B23A3A', '#C4762A', '#B8862B', '#7E6C62', '#BBAB9F']; /* --p1 … --p5 from design-system/tokens/colors.css */
const DC = XD.customers;
const dOf = (code, colour) => XD.byCode[code] || { code, name: 'Kurti set', cat: 'Kurti', price: 4495, colours: [colour || 'White'] };
const dpcs = c => c.orders.reduce((s, o) => s + o.lines.reduce((t, l) => t + l[2], 0), 0);
const dpack = c => c.orders.reduce((s, o) => s + o.lines.reduce((t, l) => t + (l[3] ? l[2] : 0), 0), 0);
const dueTxt = d => d < 0 ? `${-d} d over` : d === 0 ? 'due today' : `${d} d left`;
const DIN = (n) => '₹' + n.toLocaleString('en-IN');
/* Rupees in words, Indian grouping, for invoices and credit notes */
const inWords = n => { const a = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'], b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']; const two = x => x < 20 ? a[x] : b[Math.floor(x / 10)] + (x % 10 ? '-' + a[x % 10] : ''); const three = x => (x >= 100 ? a[Math.floor(x / 100)] + ' hundred' + (x % 100 ? ' ' : '') : '') + (x % 100 ? two(x % 100) : ''); let s = ''; const lakh = Math.floor(n / 100000), th = Math.floor((n % 100000) / 1000), rest = n % 1000; if (lakh) s += two(lakh) + ' lakh '; if (th) s += two(th) + ' thousand '; if (rest) s += three(rest); return 'Rupees ' + s.trim() + ' only'; };

/* ── atoms ───────────────────────────────────────────────────────────────── */
const Thumb = ({ T, d, w = 40, h = 50, r = 9 }) => <div style={{ width: w, height: h, borderRadius: r, overflow: 'hidden', background: T.photoBg, flex: 'none', position: 'relative' }}>{d.src ? <img src={d.src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /> : <span style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontFamily: T.fontMono, fontSize: Math.max(8, w * .22), color: T.ink3 }}>{d.code}</span>}</div>;
const Dot = ({ n, s = 8 }) => <span style={{ width: s, height: s, borderRadius: s / 2, background: XD.cols[n] || '#C9BFB4', flex: 'none', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.08)' }} />;
/* State pill: outline, semantic colour; filled only for danger (OOS · rejected) */
const Pill = ({ T, tone = 'muted', fill, children, small }) => { const c = tone === 'danger' ? T.danger : tone === 'ok' ? T.ok : tone === 'warn' ? T.warn : tone === 'blue' ? T.blue : tone === 'accent' ? T.accent : T.ink3; return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, height: small ? 20 : 22, padding: small ? '0 7px' : '0 9px', borderRadius: 999, border: `1px solid ${fill ? c : c + '66'}`, background: fill ? c : 'transparent', color: fill ? '#fff' : c, fontFamily: T.fontUI, fontSize: small ? 10 : 10.5, fontWeight: 600, letterSpacing: '.05em', textTransform: 'uppercase', whiteSpace: 'nowrap', flex: 'none' }}>{children}</span>; };
const DuePill = ({ T, d }) => { const hot = d <= 2; return <span style={{ display: 'inline-flex', alignItems: 'center', height: 20, padding: '0 8px', borderRadius: 999, background: hot ? T.danger : T.chipBg, color: hot ? '#fff' : T.ink2, fontFamily: T.fontUI, fontSize: 11, fontWeight: 600, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap', flex: 'none' }}>{dueTxt(d)}</span>; };
const PDisc = ({ p = 3, s = 18 }) => <span title={`Priority ${p}`} style={{ width: s, height: s, borderRadius: s / 2, background: DP_P[p - 1], color: '#fff', display: 'grid', placeItems: 'center', fontFamily: 'Jost', fontSize: s * .55, fontWeight: 600, flex: 'none' }}>{p}</span>;
const Mono = ({ T, children, size = 12.5, weight = 600, color }) => <span style={{ fontFamily: T.fontMono, fontSize: size, fontWeight: weight, color: color || T.ink, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{children}</span>;
const Num = ({ T, children, size = 18, color }) => <span style={{ fontFamily: T.fontDisplay, fontSize: size, fontWeight: 600, color: color || T.ink, fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{children}</span>;
const Meta = ({ T, children, style }) => <span style={{ fontFamily: T.fontUI, fontSize: 11.5, color: T.ink3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', ...style }}>{children}</span>;
const LiveChip = ({ T, off }) => <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 26, padding: '0 10px', borderRadius: 999, border: `1px solid ${T.line2}`, fontFamily: T.fontUI, fontSize: 11, fontWeight: 600, letterSpacing: '.06em', color: off ? T.danger : T.ok, whiteSpace: 'nowrap', flex: 'none' }}><span style={{ width: 7, height: 7, borderRadius: 4, background: off ? T.danger : T.ok, boxShadow: off ? 'none' : `0 0 0 3px ${T.ok}33` }} />{off ? 'OFFLINE' : 'LIVE'}</span>;
const CallChip = ({ T, icon = 'phone', children }) => <span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, height: 26, padding: '0 9px 0 7px', borderRadius: 999, background: T.chipBg, fontFamily: T.fontUI, fontSize: 11, color: T.ink2, whiteSpace: 'nowrap', flex: 'none', maxWidth: 150 }}><Ic name={icon} size={11} color={T.ink3} /><span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{children}</span></span>;
const GateToken = ({ T, n = 'GT-260908-014', done }) => <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, height: 22, padding: '0 8px', borderRadius: 7, border: `1px dashed ${T.line2}`, fontFamily: T.fontMono, fontSize: 10.5, color: T.ink2, whiteSpace: 'nowrap' }}><Ic name="ticket" size={11} color={T.ink3} />{n}{done && <Ic name="check" size={11} color={T.ok} />}</span>;
const Monogram = ({ T, c, s = 26 }) => <span style={{ width: s, height: s, borderRadius: 8, background: T.ink, color: T.bg, display: 'grid', placeItems: 'center', fontFamily: T.fontDisplay, fontSize: s * .45, fontWeight: 600, flex: 'none' }}>{c.name.split(' ').slice(0, 2).map(w => w[0]).join('')}</span>;
const Sect = ({ T, children, right, style }) => <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '14px 0 6px', ...style }}><span style={{ width: 3, height: 12, borderRadius: 2, background: T.accent, alignSelf: 'center' }} /><span style={{ fontFamily: T.fontDisplay, fontSize: 16, fontWeight: 600, color: T.ink }}>{children}</span><span style={{ flex: 1 }} />{right}</div>;
const Card = ({ T, children, style, alt, pad = 12 }) => <div style={{ padding: pad, borderRadius: 18, background: alt ? T.surface2 : T.surface, border: `1px solid ${T.line}`, boxShadow: T.dark || alt ? 'none' : '0 6px 18px -14px rgba(36,23,18,.25)', ...style }}>{children}</div>;
const OutBtn = ({ T, icon, children, small, style, on }) => <span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: small ? 30 : 36, padding: small ? '0 11px' : '0 14px', borderRadius: 999, border: `1px solid ${on ? T.ink : T.line2}`, background: on ? T.ink : 'transparent', color: on ? T.bg : T.ink, fontFamily: T.fontUI, fontSize: small ? 12 : 13, fontWeight: 500, whiteSpace: 'nowrap', flex: 'none', ...style }}>{icon && <Ic name={icon} size={small ? 13 : 15} />}{children}</span>;
const Toast = ({ T, kind = 'ok', title, sub, style }) => { const c = kind === 'danger' ? T.danger : kind === 'warn' ? T.warn : T.ok; const ic = kind === 'danger' ? 'circle-x' : kind === 'warn' ? 'triangle-alert' : 'circle-check'; return <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 14, background: kind === 'danger' ? c : T.surface, border: `1px solid ${kind === 'danger' ? c : c + '66'}`, color: kind === 'danger' ? '#fff' : T.ink, boxShadow: '0 16px 40px -20px rgba(0,0,0,.45)', ...style }}><Ic name={ic} size={18} color={kind === 'danger' ? '#fff' : c} /><span style={{ minWidth: 0, flex: 1 }}><div style={{ fontFamily: T.fontUI, fontSize: 13, fontWeight: 600 }}>{title}</div>{sub && <div style={{ fontFamily: T.fontUI, fontSize: 11.5, opacity: .85, marginTop: 1 }}>{sub}</div>}</span></div>; };
const Progress = ({ T, v, w = 60, tone }) => <span style={{ width: w, height: 4, borderRadius: 2, background: T.line2, display: 'inline-block', overflow: 'hidden', flex: 'none' }}><span style={{ display: 'block', width: `${Math.round(v * 100)}%`, height: 4, background: tone || T.ink2 }} /></span>;
/* ✗ / n⁄m / ✓ progress disc on packing lines */
const ProgDisc = ({ T, packed, planned, none }) => { const s = 30; if (none) return <span style={{ width: s, height: s, borderRadius: s / 2, border: `1.5px solid ${T.danger}66`, color: T.danger, display: 'grid', placeItems: 'center', flex: 'none' }}><Ic name="x" size={13} sw={2.2} /></span>; if (packed >= planned) return <span style={{ width: s, height: s, borderRadius: s / 2, background: T.ok + '22', color: T.ok, display: 'grid', placeItems: 'center', flex: 'none' }}><Ic name="check" size={14} sw={2.4} /></span>; return <span style={{ width: s, height: s, borderRadius: s / 2, border: `1.5px solid ${T.warn}`, color: T.warn, display: 'grid', placeItems: 'center', fontFamily: T.fontUI, fontSize: 9.5, fontWeight: 600, flex: 'none', fontVariantNumeric: 'tabular-nums' }}>{packed}/{planned}</span>; };

/* ── lines and rows ──────────────────────────────────────────────────────── */
/* Ready line: photo, design no head, colour dot, × qty, stock tick. Packing line adds "N in stock · M pending", progress disc, PACK › */
function PackLine({ T, code, colour, qty, ok, packed, planned, pack, stock, pending, compact }) {
  const d = dOf(code, colour);
  return <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: compact ? '5px 0' : '7px 0', borderTop: `1px solid ${T.line}` }}>
    <Thumb T={T} d={d} w={compact ? 34 : 40} h={compact ? 42 : 50} />
    <span style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><Num T={T} size={compact ? 16 : 18}>{code}</Num><span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: T.fontUI, fontSize: 12, color: T.ink2, whiteSpace: 'nowrap' }}><Dot n={colour} />{colour}</span>{pack && <span style={{ fontFamily: T.fontUI, fontSize: 12.5, color: T.ink, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>× {qty}</span>}</div>
      {stock != null && <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}><Meta T={T} style={{ flex: 1 }}>{stock} in stock · {pending} pending{stock === 0 && <span style={{ color: T.danger }}> · no stock</span>}</Meta>{pack && <span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 2, height: 24, padding: '0 6px 0 9px', borderRadius: 999, background: packed >= planned || stock === 0 ? T.chipBg : T.accentSoft, color: packed >= planned || stock === 0 ? T.ink3 : T.accent, fontFamily: T.fontUI, fontSize: 10.5, fontWeight: 600, letterSpacing: '.04em', flex: 'none' }}>PACK<Ic name="chevron-right" size={11} sw={2.2} /></span>}</div>}
    </span>
    {!pack && <span style={{ fontFamily: T.fontUI, fontSize: 13, color: T.ink, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>× {qty}</span>}
    {planned != null ? <ProgDisc T={T} packed={packed} planned={planned} none={stock === 0 && !packed} /> : <span style={{ width: 22, height: 22, borderRadius: 11, display: 'grid', placeItems: 'center', background: ok ? T.ok + '22' : T.danger + '1A', color: ok ? T.ok : T.danger, flex: 'none' }}><Ic name={ok ? 'check' : 'x'} size={12} sw={2.4} /></span>}
  </div>;
}
function OrderHead({ T, o, c, short, pcs, tight }) {
  const p = c.priority; const stock = o.lines.reduce((t, l) => t + (l[3] ? l[2] : 0), 0), total = o.lines.reduce((t, l) => t + l[2], 0);
  return <div style={{ paddingTop: tight ? 6 : 8 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap' }}><Mono T={T}>{o.no}</Mono><Meta T={T}>{o.date}</Meta><DuePill T={T} d={o.due} />{stock < total ? <Pill T={T} tone="warn" small>{stock}/{total} pcs in stock</Pill> : null}{short ? <Pill T={T} tone="danger" small>{total - stock} short</Pill> : null}<span style={{ flex: 1 }} /><PDisc p={p} /></div>
    {o.note && <div style={{ marginTop: 6, padding: '5px 9px', borderRadius: 9, background: T.chipBg, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2, fontStyle: 'italic' }}>Note · {o.note}</div>}
  </div>;
}
/* Ready customer card: priority ring, head, call chips, orders, footer. The whole card is the PACK target. */
function CustomerCard({ T, c, phone, planned, style }) {
  const pcs = dpcs(c), pk = dpack(c), full = pcs === pk;
  return <div className="press" style={{ borderRadius: 20, background: T.surface, border: `1px solid ${T.line}`, boxShadow: `0 0 0 2px ${DP_P[c.priority - 1]}${T.dark ? 'CC' : ''}, ${T.dark ? 'none' : '0 10px 24px -18px rgba(36,23,18,.35)'}`, padding: '12px 14px 12px', display: 'flex', flexDirection: 'column', minWidth: 0, ...style }}>
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}><span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontDisplay, fontSize: phone ? 21 : 19, fontWeight: 600, color: T.ink, lineHeight: 1.1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</div><Meta T={T} style={{ display: 'block', marginTop: 3 }}>{c.market ? c.market + ' · ' : ''}{c.city}</Meta></span><T.Tag tone={c.tier === 'Platinum' ? 'accent' : 'muted'}>{c.tier}</T.Tag></div>
    <div style={{ display: 'flex', gap: 5, marginTop: 8, overflow: 'hidden' }}><CallChip T={T}>{c.phone}</CallChip><CallChip T={T} icon="truck">{c.transport}</CallChip><CallChip T={T} icon="user">{c.broker}</CallChip></div>
    {c.orders.map(o => <div key={o.no}><OrderHead T={T} o={o} c={c} />{o.lines.map((l, i) => <PackLine key={i} T={T} code={l[0]} colour={l[1]} qty={l[2]} ok={l[3]} compact={!phone} />)}</div>)}
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10, paddingTop: 10, borderTop: `1px solid ${T.line2}` }}><span><Num T={T} size={20}>{pcs}</Num><Meta T={T} style={{ marginLeft: 5 }}>pcs · {pk} packable</Meta></span><span style={{ flex: 1 }} />{planned || full ? <Pill T={T} tone="ok">Fully planned</Pill> : null}<T.Btn small icon="chevron-right" style={{ height: phone ? 40 : 36, letterSpacing: '.06em' }}>PACK</T.Btn></div>
  </div>;
}
/* All pending orders: customer chip → customer → order → lines. money = show ₹ (manager roles) */
function PendingTree({ T, money, open = 'c6', openOrder = 'SO-2607', compact, list = DC }) {
  return <div>{list.map(c => { const on = c.id === open; const pcs = dpcs(c); const mx = Math.min(...c.orders.map(o => o.due));
    return <div key={c.id} style={{ borderRadius: 16, background: on ? T.surface : 'transparent', border: `1px solid ${on ? T.line : 'transparent'}`, marginBottom: 4, padding: on ? '8px 12px 10px' : '0 6px' }}>
      <div className="press" style={{ display: 'flex', alignItems: 'center', gap: 8, height: 38 }}><Ic name={on ? 'chevron-down' : 'chevron-right'} size={14} color={T.ink3} /><span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 16.5, fontWeight: 600, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</div><Meta T={T} style={{ display: 'block' }}>{c.orders.length} order{c.orders.length > 1 ? 's' : ''} · {pcs} pcs{on ? ` · ${c.tier} · ${c.market ? c.market + ' · ' : ''}${c.city}` : ''}</Meta></span><DuePill T={T} d={mx} /></div>
      {on && <>
        <div style={{ display: 'flex', gap: 5, overflow: 'hidden', marginBottom: 6 }}><CallChip T={T}>{c.phone}</CallChip><CallChip T={T} icon="truck">{c.transport}</CallChip><CallChip T={T} icon="user">{c.broker}</CallChip></div>
        {c.orders.map(o => { const oo = o.no === openOrder; const total = o.lines.reduce((t, l) => t + l[2], 0), stock = o.lines.reduce((t, l) => t + (l[3] ? l[2] : 0), 0); const amt = o.lines.reduce((t, l) => t + l[2] * (dOf(l[0], l[1]).price || 0), 0);
          return <div key={o.no} style={{ borderTop: `1px solid ${T.line}`, paddingTop: 6 }}>
            <div className="press" style={{ display: 'flex', alignItems: 'center', gap: 7, height: 30 }}><Ic name={oo ? 'chevron-down' : 'chevron-right'} size={13} color={T.ink3} /><Mono T={T}>{o.no}</Mono><Meta T={T}>{o.date}</Meta>{total - stock > 0 && <Pill T={T} tone="danger" small>{total - stock} short</Pill>}<span style={{ flex: 1 }} /><PDisc p={c.priority} s={16} /><Meta T={T}>{total} pcs</Meta></div>
            {oo && <div style={{ paddingBottom: 4 }}>{o.lines.map((l, i) => { const d = dOf(l[0], l[1]); return <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '5px 0', borderTop: `1px solid ${T.line}` }}><Thumb T={T} d={d} w={30} h={38} r={7} /><span style={{ flex: 1, minWidth: 0 }}><div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}><Num T={T} size={15}>{l[0]}</Num><span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11.5, color: T.ink2 }}><Dot n={l[1]} s={7} />{l[1]}</span></div>{!l[3] && <Meta T={T} style={{ display: 'block', color: T.warn }}>{Math.min(l[2], 4)} of this design at the last step</Meta>}</span><span style={{ textAlign: 'right', fontFamily: T.fontUI, fontSize: 12, color: T.ink, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{money ? <>{l[2]} × {DIN(d.price)}<div style={{ fontFamily: T.fontSerif, fontSize: 13.5, fontWeight: 600 }}>{DIN(l[2] * d.price)}</div></> : <>× {l[2]}</>}</span></div>; })}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, paddingTop: 6, borderTop: `1px solid ${T.line2}` }}><Meta T={T}>Order · {total} pcs</Meta><span style={{ flex: 1 }} />{money ? <span style={{ fontFamily: T.fontSerif, fontSize: 16, fontWeight: 600, color: T.ink }}>{DIN(amt)}</span> : <Meta T={T}>amounts hidden for your role</Meta>}</div></div>}
          </div>; })}
      </>}
    </div>; })}</div>;
}
/* Packing master selector chip */
function CustomerChip({ T, c, on, packed, ordered, oos, inv, floor, all, style }) {
  return <span className="press" style={{ display: 'inline-flex', flexDirection: 'column', gap: 4, minWidth: 128, padding: '7px 10px 7px', borderRadius: 13, background: on ? T.ink : T.surface, border: `1px solid ${on ? T.ink : T.line2}`, color: on ? T.bg : T.ink, flex: 'none', ...style }}>
    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>{!all && <Monogram T={T} c={c} s={18} />}<span style={{ fontFamily: T.fontUI, fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 130 }}>{all ? 'All parcels' : c.name}</span></span>
    {all ? <span style={{ fontFamily: T.fontUI, fontSize: 10.5, opacity: .7 }}>every customer · 48 boxes</span> : <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: T.fontUI, fontSize: 10.5, opacity: .85, fontVariantNumeric: 'tabular-nums' }}><span>{inv}/{floor} boxes</span><Progress T={T} v={packed / ordered} w={40} tone={on ? T.bg : T.ink2} /><span>{packed}/{ordered}</span>{oos ? <span style={{ color: on ? '#FFC7C7' : T.danger }}>{oos} OOS</span> : null}</span>}
  </span>;
}
/* Parcel card: monogram bar, code, status pill, PACKING INTO, lines with stepper and remove, Add line, Close parcel */
function ParcelCard({ T, p, c, active, phone, review, greyed, ticked, select, style }) {
  const pcs = p.lines.reduce((s, l) => s + l[2], 0); const st = p.status; const done = st !== 'OPEN';
  const tone = st === 'OPEN' ? 'warn' : st === 'PACKED' ? 'blue' : 'ok';
  return <div style={{ borderRadius: 18, background: T.surface, border: `1px solid ${active ? T.accentLine : T.line}`, boxShadow: active ? `0 0 0 2px ${T.accentSoft}` : 'none', opacity: greyed ? .62 : 1, overflow: 'hidden', position: 'relative', ...style }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px 8px', borderLeft: `5px solid ${T.ink}` }}>
      {select && <span style={{ width: 18, height: 18, borderRadius: 5, border: `1.5px solid ${ticked ? T.accent : T.line2}`, background: ticked ? T.accent : 'transparent', display: 'grid', placeItems: 'center', color: '#fff', flex: 'none' }}>{ticked && <Ic name="check" size={12} sw={3} />}</span>}
      <Monogram T={T} c={c} s={24} /><span style={{ flex: 1, minWidth: 0 }}><div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><Num T={T} size={19}>{p.code}</Num><Meta T={T}>{c.name}</Meta></div></span>
      {active && <Pill T={T} tone="accent" fill small>Packing into</Pill>}<Pill T={T} tone={tone} small>{greyed ? 'Awaiting shipment' : st.toLowerCase()}</Pill>
    </div>
    <div style={{ padding: '0 12px' }}>{p.lines.map((l, i) => { const d = dOf(l[0], l[1]); return <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '6px 0', borderTop: `1px solid ${T.line}` }}><Thumb T={T} d={d} w={32} h={40} r={7} /><span style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap' }}><Num T={T} size={16}>{l[0]}</Num><span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: T.fontUI, fontSize: 12, color: T.ink2 }}><Dot n={l[1]} s={7} />{l[1]}</span><Meta T={T}>× {l[2]}{l[3] > l[2] ? ` of ${l[3]}` : ''}</Meta></span>{done ? <Meta T={T}>{l[2]} pcs</Meta> : <><T.Step v={l[2]} /><span className="press" style={{ width: 28, height: 28, borderRadius: 14, display: 'grid', placeItems: 'center', color: T.ink3 }}><Ic name="x" size={14} /></span></>}</div>; })}
      {!p.lines.length && <div style={{ padding: '14px 0', textAlign: 'center', fontFamily: T.fontUI, fontSize: 12, color: T.ink3, borderTop: `1px solid ${T.line}` }}>Empty box · scan pieces into it or add a line</div>}
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px 10px', borderTop: `1px solid ${T.line2}` }}><Num T={T} size={17}>{pcs}</Num><Meta T={T}>pcs</Meta>{done && p.inv && <Mono T={T} size={11} weight={500} color={T.ink2}>{p.inv}</Mono>}<span style={{ flex: 1 }} />
      {st === 'OPEN' ? <><OutBtn T={T} small icon="plus">Add line</OutBtn>{active || phone ? <T.Btn small style={{ height: 32, letterSpacing: '.05em' }}>Close parcel</T.Btn> : <OutBtn T={T} small>Close parcel</OutBtn>}</> : st === 'PACKED' ? <OutBtn T={T} small icon="receipt" on={review}>Review invoice</OutBtn> : <OutBtn T={T} small icon="printer">Print A4</OutBtn>}
    </div>
  </div>;
}
/* Live invoice: letterhead building itself. state = live · review · done */
const INV_LINES = [['1243', 'Mehroon', 1, 'SO-3034'], ['D9107', 'White', 1, 'SO-3034']];
function InvoiceSheet({ T, state = 'live', lines = INV_LINES, compact, phone, money = true }) {
  const rows = lines.map(l => ({ d: dOf(l[0], l[1]), col: l[1], q: l[2], so: l[3] })); const sub = rows.reduce((s, r) => s + r.q * r.d.price, 0); const tax = Math.round(sub * .06); const grand = sub + tax * 2; const pcs = rows.reduce((s, r) => s + r.q, 0);
  const cell = { fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2, padding: '5px 0', fontVariantNumeric: 'tabular-nums' };
  return <div style={{ fontFamily: T.fontUI }}>
    {state === 'review' && <div style={{ padding: '8px 11px', borderRadius: 12, background: T.warn + '1F', border: `1px solid ${T.warn}66`, fontSize: 12, color: T.ink, marginBottom: 10 }}><b>Review</b> · fix qty and rate, then confirm. Nothing reaches accounts until you do.</div>}
    {state === 'done' && <div style={{ padding: '8px 11px', borderRadius: 12, background: T.ok + '1A', border: `1px solid ${T.ok}66`, fontSize: 12, color: T.ink, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}><Ic name="circle-check" size={15} color={T.ok} /><span><b>SI-2288</b> pushed to accounts · print flagged</span></div>}
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><img src={XD.A + 'logo/sutra-mark-gold.png'} style={{ height: 18 }} /><span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 17, fontWeight: 600, color: T.ink, lineHeight: 1 }}>Shree Radha Studio</div><Meta T={T} style={{ display: 'block', marginTop: 2 }}>9/112 Gandhi Nagar, Delhi · GSTIN 07AEZPA2938L2ZX</Meta></span><Pill T={T} tone={state === 'done' ? 'ok' : state === 'review' ? 'warn' : 'muted'} small>{state === 'live' ? 'Live' : state}</Pill></div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 10px', marginTop: 10, padding: '8px 10px', borderRadius: 12, background: T.surface2, border: `1px solid ${T.line}` }}>
      <span><Meta T={T} style={{ display: 'block', fontSize: 10 }}>Bill to</Meta><span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: T.ink, fontWeight: 500 }}>Ambika Enterprises{state === 'review' && <Ic name="chevron-down" size={12} color={T.ink3} />}</span>{state === 'review' && <Meta T={T} style={{ display: 'block' }}>or Ambika · Karol Bagh gaddi · + add new</Meta>}</span>
      <span><Meta T={T} style={{ display: 'block', fontSize: 10 }}>Goods for</Meta><span style={{ fontSize: 12.5, color: T.ink, fontWeight: 500 }}>Ambika Enterprises, Delhi</span></span>
      <span><Meta T={T} style={{ display: 'block', fontSize: 10 }}>Parcel · orders</Meta><span style={{ fontSize: 12, color: T.ink }}>P00035 · SO-3034</span></span>
      <span><Meta T={T} style={{ display: 'block', fontSize: 10 }}>{state === 'done' ? 'Invoice' : 'Date'}</Meta><span style={{ fontSize: 12, color: T.ink }}>{state === 'done' ? 'SI-2288 · 08/09/26' : '08/09/26 · book SI'}</span></span>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: money ? '1.4fr 1fr .5fr .8fr .9fr' : '1.6fr 1.2fr .6fr', gap: 6, marginTop: 10, borderBottom: `1px solid ${T.line2}`, paddingBottom: 4 }}>{(money ? ['Title', 'Colour', 'Qty', 'Rate', 'Amount'] : ['Title', 'Colour', 'Qty']).map((h, i) => <Meta key={h} T={T} style={{ fontSize: 10, letterSpacing: '.06em', textTransform: 'uppercase', textAlign: i > 1 ? 'right' : 'left' }}>{h}</Meta>)}</div>
    {rows.length ? rows.map((r, i) => <div key={i} style={{ display: 'grid', gridTemplateColumns: money ? '1.4fr 1fr .5fr .8fr .9fr' : '1.6fr 1.2fr .6fr', gap: 6, alignItems: 'center', borderBottom: `1px solid ${T.line}` }}>
      <span style={{ ...cell, display: 'flex', alignItems: 'center', gap: 6 }}><Thumb T={T} d={r.d} w={20} h={25} r={4} /><span><Num T={T} size={14}>{r.d.code}</Num><Meta T={T} style={{ display: 'block', fontSize: 10 }}>{r.so} · HSN —</Meta></span></span>
      <span style={{ ...cell, display: 'flex', alignItems: 'center', gap: 5 }}><Dot n={r.col} s={7} />{r.col}</span>
      <span style={{ ...cell, textAlign: 'right' }}>{state === 'review' ? <span style={{ padding: '2px 6px', borderRadius: 6, border: `1px solid ${T.line2}`, background: T.surface }}>{r.q}</span> : r.q}</span>
      {money && <span style={{ ...cell, textAlign: 'right' }}>{state === 'review' ? <span style={{ padding: '2px 6px', borderRadius: 6, border: `1px solid ${T.line2}`, background: T.surface }}>{r.d.price.toLocaleString('en-IN')}</span> : r.d.price.toLocaleString('en-IN')}</span>}
      {money && <span style={{ ...cell, textAlign: 'right', color: T.ink, fontFamily: T.fontSerif, fontSize: 13.5, fontWeight: 600 }}>{DIN(r.q * r.d.price)}</span>}
    </div>) : <div style={{ padding: '18px 0', textAlign: 'center', fontSize: 12, color: T.ink3 }}>Nothing packed yet · scans land here in real time.</div>}
    {money ? <div style={{ marginTop: 8, display: 'grid', gridTemplateColumns: '1fr auto', gap: '3px 12px', fontSize: 11.5, color: T.ink2, fontVariantNumeric: 'tabular-nums' }}>
      <span>Taxable value</span><span style={{ textAlign: 'right' }}>{DIN(sub)}</span>
      <span>CGST 6% · place of supply Delhi</span><span style={{ textAlign: 'right' }}>{DIN(tax)}</span>
      <span>SGST 6%</span><span style={{ textAlign: 'right' }}>{DIN(tax)}</span>
      <span>Rounding</span><span style={{ textAlign: 'right' }}>₹0</span>
      <span style={{ fontFamily: T.fontUI, color: T.ink, fontWeight: 600, paddingTop: 4, borderTop: `1px solid ${T.line2}` }}>{pcs} pcs · grand total</span><span style={{ textAlign: 'right', paddingTop: 4, borderTop: `1px solid ${T.line2}` }}><PriceF v={grand} size={compact ? 18 : 22} font={T.fontSerif} color={T.ink} dim={T.ink3} /></span>
      <span style={{ gridColumn: '1 / -1', fontSize: 10.5, color: T.ink3, fontStyle: 'italic' }}>{inWords(grand)}</span>
    </div> : <div style={{ marginTop: 8, display: 'flex', alignItems: 'baseline', gap: 8, fontSize: 12, color: T.ink2 }}><b style={{ color: T.ink }}>{pcs} pcs</b><span style={{ flex: 1 }} /><Meta T={T}>amounts hidden for your role</Meta></div>}
    {state === 'review' && <T.Btn icon="check" style={{ width: '100%', marginTop: 12, height: 44 }}>Confirm · cut invoice</T.Btn>}
    {state === 'done' && <div style={{ display: 'flex', gap: 8, marginTop: 12 }}><OutBtn T={T} icon="printer" style={{ flex: 1, justifyContent: 'center' }}>Print A4</OutBtn><OutBtn T={T} icon="share-2" style={{ flex: 1, justifyContent: 'center' }}>WhatsApp PDF</OutBtn><GateToken T={T} /></div>}
  </div>;
}
/* Out of stock: colour matrix */
const OOS_ROWS = [['Sky', 12, 4, 30, 14, ['04/09', 14, '24/09', 16]], ['Purple', 9, 0, 0, 0, null], ['Seagreen', 4, 4, 10, 6, ['04/09', 6, '—', 4]]];
function ColourMatrix({ T, rows = OOS_ROWS, phone }) {
  const H = ['Colour', 'Needed', 'Last step', 'In order', 'Received', 'Due 1', 'Pcs', 'Due 2', 'Pcs'];
  const c = (v, danger) => <span style={{ fontFamily: T.fontUI, fontSize: 11.5, color: danger ? '#fff' : T.ink, background: danger ? T.danger : 'transparent', borderRadius: 5, padding: danger ? '1px 6px' : 0, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap', textAlign: 'center' }}>{v}</span>;
  return <div style={{ overflow: 'hidden', borderRadius: 12, border: `1px solid ${T.line}`, background: T.surface2 }}><div style={{ minWidth: phone ? 520 : 0 }}>
    <div style={{ display: 'grid', gridTemplateColumns: '72px repeat(8, 1fr)', gap: 4, padding: '6px 10px', borderBottom: `1px solid ${T.line}` }}>{H.map((h, i) => <Meta key={i} T={T} style={{ fontSize: 9.5, letterSpacing: '.06em', textTransform: 'uppercase', textAlign: i ? 'center' : 'left' }}>{h}</Meta>)}</div>
    {rows.map(r => <div key={r[0]} style={{ display: 'grid', gridTemplateColumns: '72px repeat(8, 1fr)', gap: 4, padding: '5px 10px', alignItems: 'center', borderBottom: `1px solid ${T.line}` }}><span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, color: T.ink }}><Dot n={r[0]} s={8} />{r[0]}</span>{c(r[1])}{c(r[2] || 'Nil', !r[2])}{c(r[3] || 'Nil', !r[3])}{c(r[4] || 'Nil', !r[4])}{r[5] ? <>{c(r[5][0])}{c(r[5][1])}{c(r[5][2])}{c(r[5][3])}</> : <>{c('Nil', true)}{c('Nil', true)}{c('Nil', true)}{c('Nil', true)}</>}</div>)}
  </div>{phone && <div style={{ margin: '6px 10px 8px', height: 3, borderRadius: 2, background: T.line }}><span style={{ display: 'block', width: '55%', height: 3, borderRadius: 2, background: T.ink3 }} /></div>}</div>;
}
const KarigarPill = ({ T, name = 'Saleem Creation', score = 78 }) => <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 28, padding: '0 4px 0 10px', borderRadius: 999, border: `1px solid ${T.line2}`, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink, whiteSpace: 'nowrap', flex: 'none' }}><Ic name="hammer" size={12} color={T.ink3} />{name}<span style={{ fontWeight: 600, color: score >= 70 ? T.ok : T.warn }}>{score}</span><span className="press" style={{ width: 22, height: 22, borderRadius: 11, background: T.chipBg, display: 'grid', placeItems: 'center', color: T.ink2 }}><Ic name="phone" size={11} /></span></span>;
/* Out-of-stock card: ORDER kind (short against orders) and RESTOCK kind (demand engine) */
function OOSCard({ T, code = '2798', kind = 'order', phone, sourcing = 'now', style }) {
  const d = dOf(code); const src = sourcing === 'now' ? ['ok', 'Sourceable now'] : sourcing === 'prod' ? ['blue', 'In production, not last step'] : ['danger', 'Nothing in production'];
  return <Card T={T} style={style}>
    <div style={{ display: 'flex', gap: 12 }}><Thumb T={T} d={d} w={phone ? 64 : 56} h={phone ? 80 : 70} r={12} /><span style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}><Num T={T} size={24}>{d.code}</Num><Meta T={T}>{d.cat} · {d.name}</Meta><span style={{ flex: 1 }} /><Pill T={T} tone={src[0]} fill={src[0] === 'danger'} small>{src[1]}</Pill></div>
      {kind === 'order' ? <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 6, fontFamily: T.fontUI, fontSize: 12, color: T.ink2 }}><span><Num T={T} size={18}>25</Num> pcs short</span><span>· 3 orders · earliest due <b style={{ color: T.danger }}>2 d</b></span></div>
        : <div style={{ marginTop: 6, fontFamily: T.fontUI, fontSize: 12, color: T.ink2 }}>selling <b style={{ color: T.ink }}>4/day</b> · <b style={{ color: T.ink }}>22 d</b> cover · <b style={{ color: T.ink }}>18</b> free · score <b style={{ color: T.ink }}>61</b> <Meta T={T}>· below lead time (45 d)</Meta></div>}
      <div style={{ display: 'flex', gap: 6, marginTop: 8, overflow: 'hidden' }}><KarigarPill T={T} /><KarigarPill T={T} name="Rafiq Bhai" score={64} />{!phone && <CallChip T={T} icon="external-link">Product page</CallChip>}</div>
    </span></div>
    {kind === 'order' && <div style={{ marginTop: 10 }}><ColourMatrix T={T} phone={phone} /></div>}
  </Card>;
}
/* Warehouse stock rows */
const FG_ROWS = [['3661', 'Peach', 3, 12, 20, 'LOW'], ['2798', 'Purple', 0, 9, 0, 'OUT'], ['6002', 'Blush', 0, 5, 24, 'OUT'], ['3661', 'Pista', 5, 2, 40, 'LOW'], ['2798', 'Sky', 20, 5, 30, null], ['1457', 'Firozi', 18, 4, 0, null], ['2006', 'Lavender', 41, 6, 0, null]];
const MAT_ROWS = [['BKS-01', 'Butta kaam satin', 'Ivory', '10 pc', '40 pc', '18 pc', '25 pc', 'Surat Textiles', 'LOW'], ['NET-04', 'Soft net', 'Sky', '0 m', '120 m', '64 m', '50 m', 'Mumbai Fabrics', 'OUT'], ['SAN-02', 'Santoon', 'Peach', '50 m', '—', '22 m', '30 m', 'Local market', null], ['ZR-11', 'Zari thread', 'Gold', '2.4 kg', '5 kg', '1.1 kg', '2 kg', 'Surat Textiles', null]];
const WIP_ROWS = [['2798', 'Sky', 'Embroidery', 'Saleem Creation', 30, 12], ['2798', 'Purple', 'Dyeing', 'Rafiq Bhai', 9, 38], ['6002', 'Blush', 'Stitching', 'Noor Tailors', 24, 5], ['3661', 'Peach', 'Embroidery', 'Saleem Creation', 60, 21]];
const StockPill = ({ T, s }) => s ? <Pill T={T} tone={s === 'OUT' ? 'danger' : 'warn'} fill={s === 'OUT'} small>{s === 'OUT' ? 'Out of stock' : 'Low'}</Pill> : null;
function StockRow({ T, kind = 'fg', r, phone, on }) {
  const base = { display: 'flex', alignItems: 'center', gap: 10, padding: phone ? '8px 0' : '6px 12px', borderTop: `1px solid ${T.line}`, background: on ? T.accentSoft : 'transparent' };
  const n = (v, w = 56, tone) => <span style={{ width: w, textAlign: 'right', fontFamily: T.fontUI, fontSize: 12.5, color: tone || T.ink, fontVariantNumeric: 'tabular-nums', flex: 'none' }}>{v}</span>;
  if (kind === 'fg') { const d = dOf(r[0], r[1]); return <div style={base}><Thumb T={T} d={d} w={34} h={42} r={8} /><span style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'baseline', gap: 7, flexWrap: 'wrap' }}><Num T={T} size={17}>{r[0]}</Num><span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, color: T.ink2 }}><Dot n={r[1]} s={7} />{r[1]}</span>{phone && <StockPill T={T} s={r[5]} />}</span>{phone ? <span style={{ textAlign: 'right', fontSize: 11.5, color: T.ink2, fontVariantNumeric: 'tabular-nums', lineHeight: 1.3 }}><b style={{ color: T.ink, fontSize: 14 }}>{r[2]}</b> free<br />{r[3]} reserved · {r[4]} coming</span> : <>{n(r[2], 48, r[2] === 0 ? T.danger : null)}{n(r[3])}{n(r[2] + r[3], 48)}{n(r[4], 64)}<span style={{ width: 96, flex: 'none', textAlign: 'right' }}><StockPill T={T} s={r[5]} /></span></>}</div>; }
  if (kind === 'mat') return <div style={base}><span style={{ width: 34, height: 42, borderRadius: 8, background: XD.cols[r[2]] || T.chipBg, flex: 'none', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.08)' }} /><span style={{ flex: 1, minWidth: 0 }}><div style={{ display: 'flex', alignItems: 'baseline', gap: 7 }}><Num T={T} size={15}>{r[0]}</Num><span style={{ fontSize: 12, color: T.ink2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r[1]} · {r[2]}</span>{phone && <StockPill T={T} s={r[8]} />}</div>{phone && <Meta T={T} style={{ display: 'block' }}>{r[7]} · reorder at {r[6]}</Meta>}</span>{phone ? <span style={{ textAlign: 'right', fontSize: 11.5, color: T.ink2, lineHeight: 1.3 }}><b style={{ color: r[3].startsWith('0') ? T.danger : T.ink, fontSize: 14 }}>{r[3]}</b> on hand<br />{r[4]} on order</span> : <>{n(r[3], 56, r[3].startsWith('0') ? T.danger : null)}{n(r[4])}{n(r[5], 64)}{n(r[6], 60)}<span style={{ width: 110, fontSize: 11.5, color: T.ink2, textAlign: 'right', flex: 'none', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r[7]}</span><span style={{ width: 96, flex: 'none', textAlign: 'right' }}><StockPill T={T} s={r[8]} /></span></>}</div>;
  const d = dOf(r[0], r[1]); return <div style={base}><Thumb T={T} d={d} w={34} h={42} r={8} /><span style={{ flex: 1, minWidth: 0 }}><div style={{ display: 'flex', alignItems: 'baseline', gap: 7 }}><Num T={T} size={17}>{r[0]}</Num><span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, color: T.ink2 }}><Dot n={r[1]} s={7} />{r[1]}</span></div><Meta T={T} style={{ display: 'block' }}>{r[2]} · with {r[3]}</Meta></span>{phone ? <span style={{ textAlign: 'right', fontSize: 11.5, color: T.ink2, lineHeight: 1.3 }}><b style={{ color: T.ink, fontSize: 14 }}>{r[4]}</b> pcs<br /><span style={{ color: r[5] > 20 ? T.warn : T.ink2 }}>{r[5]} d at step</span></span> : <>{n(r[4], 48)}{n(`${r[5]} d`, 56, r[5] > 20 ? T.warn : null)}<span style={{ width: 96, flex: 'none', textAlign: 'right' }}>{r[5] > 20 && <Pill T={T} tone="warn" small>Aged</Pill>}</span></>}</div>;
}
/* Sale return: step rail, lines, credit note */
const RET_STEPS = ['Customer', 'Pieces', 'Preview', 'Credit note'];
function StepRail({ T, step, phone }) {
  return <div style={{ display: 'flex', alignItems: 'center', gap: phone ? 4 : 8, padding: phone ? '0 16px' : 0 }}>{RET_STEPS.map((s, i) => { const n = i + 1; const on = n === step, done = n < step; return <React.Fragment key={s}><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, flex: 'none' }}><span style={{ width: 22, height: 22, borderRadius: 11, background: on ? T.ink : done ? T.ok : T.chipBg, color: on || done ? T.bg : T.ink3, display: 'grid', placeItems: 'center', fontFamily: T.fontUI, fontSize: 11, fontWeight: 600 }}>{done ? <Ic name="check" size={12} sw={2.6} /> : n}</span>{(!phone || on) && <span style={{ fontFamily: T.fontUI, fontSize: phone ? 12.5 : 12.5, fontWeight: on ? 600 : 400, color: on ? T.ink : T.ink3, whiteSpace: 'nowrap' }}>{s}</span>}</span>{i < 3 && <span style={{ flex: 1, height: 1, background: done ? T.ok : T.line2, minWidth: 8 }} />}</React.Fragment>; })}</div>;
}
const RET_BILLS = [['SI-2271', '24/08/26', 'P00031', 6, 26970], ['SI-2265', '21/08/26', 'P00028 · P00029', 9, 39955], ['SI-2240', '12/08/26', 'P00019', 4, 17980]];
const RET_LINES_D = [['6002', 'Lilac', 1, 'SI-2271', 4995], ['2006', 'Lavender', 2, 'SI-2271', 4995], ['1457', 'Firozi', 1, 'SI-2265', 3995]];
function ReturnLines({ T, money, lines = RET_LINES_D, phone, edit, quiet }) {
  const total = lines.reduce((s, l) => s + l[2] * l[4], 0), pcs = lines.reduce((s, l) => s + l[2], 0);
  return <div>{lines.map((l, i) => { const d = dOf(l[0], l[1]); return <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderTop: `1px solid ${T.line}` }}><Thumb T={T} d={d} w={36} h={45} r={8} /><span style={{ flex: 1, minWidth: 0 }}><div style={{ display: 'flex', alignItems: 'baseline', gap: 7 }}><Num T={T} size={17}>{l[0]}</Num><span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, color: T.ink2 }}><Dot n={l[1]} s={7} />{l[1]}</span></div><Meta T={T} style={{ display: 'block' }}>from {l[3]}{money ? ` · at ${DIN(l[4])}` : ''}</Meta></span>{edit ? <T.Step v={l[2]} /> : <span style={{ fontSize: 13, color: T.ink, fontVariantNumeric: 'tabular-nums' }}>× {l[2]}</span>}{money && !edit && <span style={{ width: 70, textAlign: 'right', fontFamily: T.fontSerif, fontSize: 14, fontWeight: 600, color: T.ink }}>{DIN(l[2] * l[4])}</span>}</div>; })}
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, paddingTop: 8, borderTop: `1px solid ${T.line2}` }}><span style={{ fontSize: 12, color: T.ink2 }}><b style={{ color: T.ink }}>{pcs} pcs</b> · 2 bills · 1 box</span><span style={{ flex: 1 }} />{money ? <PriceF v={total} size={phone ? 20 : 22} font={T.fontSerif} color={T.ink} dim={T.ink3} /> : quiet ? null : <Meta T={T}>amounts hidden for your role</Meta>}</div>
  </div>;
}
function CreditNote({ T, money, phone }) {
  return <Card T={T}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><img src={XD.A + 'logo/sutra-mark-gold.png'} style={{ height: 18 }} /><span style={{ flex: 1 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 17, fontWeight: 600, color: T.ink, lineHeight: 1 }}>Credit note</div><Meta T={T} style={{ display: 'block', marginTop: 2 }}>Shree Radha Studio · book CN</Meta></span><Pill T={T} tone="warn" small>Stock on approval</Pill></div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 10px', marginTop: 10 }}>{[['Credit note', 'CN-260908-0003'], ['Return no', 'SR-0117'], ['Customer', 'Aneri Boutique, Anand'], ['Against', 'SI-2271 · SI-2265'], ['Boxes accepted', '1 of 1'], ['Status', 'Sent to accounts · not in Busy yet']].map(([k, v]) => <span key={k}><Meta T={T} style={{ display: 'block', fontSize: 10 }}>{k}</Meta><span style={{ fontFamily: k === 'Credit note' || k === 'Return no' ? T.fontMono : T.fontUI, fontSize: 12.5, color: T.ink, fontWeight: 500 }}>{v}</span></span>)}</div>
    <div style={{ marginTop: 8 }}><ReturnLines T={T} money={money} phone={phone} /></div>
    <div style={{ display: 'flex', gap: 8, marginTop: 12, alignItems: 'center' }}><OutBtn T={T} icon="printer" style={{ flex: 1, justifyContent: 'center' }}>Print</OutBtn><OutBtn T={T} icon="share-2" style={{ flex: 1, justifyContent: 'center' }}>WhatsApp</OutBtn><GateToken T={T} n="GT-260908-021" /></div>
    <Meta T={T} style={{ display: 'block', marginTop: 8, whiteSpace: 'normal' }}>Pieces re-enter finished goods only when accounts approves the return. Until then they sit as "stock on approval".</Meta>
  </Card>;
}
const RECENT_CN = [['CN-260908-0002', 'Rangoli Ethnic Wear', 2, 'Pending accounts'], ['CN-260906-0001', 'Preeti Fashion Hub', 4, 'Approved'], ['CN-260904-0004', 'Nalli Fashion Mart', 1, 'Approved']];
const RecentNotes = ({ T }) => <div>{RECENT_CN.map(r => <div key={r[0]} style={{ display: 'flex', alignItems: 'center', gap: 8, height: 36, borderTop: `1px solid ${T.line}` }}><Mono T={T} size={11.5}>{r[0]}</Mono><span style={{ flex: 1, minWidth: 0, fontSize: 12, color: T.ink2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r[1]} · {r[2]} pcs</span><Pill T={T} tone={r[3] === 'Approved' ? 'ok' : 'warn'} small>{r[3]}</Pill></div>)}</div>;
/* FG inward (the last process's receive, counted at the warehouse) */
const FGI_JOBS = [['PO-1187', '2798', 'Stitching · last', 'Noor Tailors', [['Sky', 14, 14], ['Seagreen', 6, 5]]], ['PO-1174', '3661', 'Stitching · last', 'Saleem Creation', [['Peach', 20, 20]]]];
/* Phone sheet + scan chrome */
const Sheet = ({ T, h = 520, title, children, foot }) => <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: h, borderRadius: '26px 26px 0 0', display: 'flex', flexDirection: 'column', ...glass(T, { background: T.dark ? 'rgba(28,21,18,.92)' : 'rgba(252,250,246,.94)', boxShadow: '0 -20px 60px -20px rgba(0,0,0,.4)' }) }}><span style={{ width: 36, height: 4, borderRadius: 2, background: T.line2, margin: '8px auto 0' }} />{title && <div style={{ display: 'flex', alignItems: 'center', padding: '10px 18px 6px' }}><span style={{ fontFamily: T.fontDisplay, fontSize: 20, fontWeight: 600, color: T.ink, flex: 1 }}>{title}</span><Hit T={T} icon="x" size={34} iconSize={16} style={{ background: T.chipBg }} /></div>}<div style={{ flex: 1, minHeight: 0, overflow: 'hidden', padding: '0 18px' }}>{children}</div>{foot && <div style={{ padding: '10px 18px 22px', borderTop: `1px solid ${T.line}` }}>{foot}</div>}</div>;
const ScanCam = ({ T, h = 300, children }) => <div style={{ position: 'relative', height: h, background: 'linear-gradient(180deg,#2A2320,#171311)', overflow: 'hidden' }}><img src={XD.byCode['2798'].src} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: .55, filter: 'saturate(.6)' }} /><div style={{ position: 'absolute', inset: 0, background: 'rgba(15,12,10,.35)' }} /><div style={{ position: 'absolute', left: 60, right: 60, top: h * .28, height: h * .42, borderRadius: 18, boxShadow: '0 0 0 2000px rgba(10,8,7,.45)', border: '1.5px solid rgba(255,255,255,.65)' }} /><div style={{ position: 'absolute', left: 60, right: 60, top: h * .5, height: 1.5, background: `${T.accent}CC`, boxShadow: `0 0 12px ${T.accent}` }} />{children}</div>;

/* ── phone chrome: top bar with LIVE chip, search island, node scroller ────── */
const D_NODES_P = [['list-checks', 'Pending', 7], ['package-check', 'Ready', 6], ['package', 'Packing', 8], ['receipt', 'Billed', null], ['warehouse', 'Stock', null], ['package-x', 'Out of stock', 14], ['rotate-ccw', 'Sale return', 2]];
function DTop({ T, title, back, role = 'Dispatch' }) {
  return <div style={{ display: 'flex', alignItems: 'center', padding: '0 10px 0 12px', height: 44, gap: 4 }}>{back ? <Hit T={T} icon="chevron-left" size={40} /> : null}{title ? <span style={{ fontFamily: T.fontDisplay, fontSize: 22, fontWeight: 500, color: T.ink, marginLeft: back ? 0 : 6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</span> : <T.Lockup compact />}<span style={{ flex: 1 }} /><span style={{ fontFamily: T.fontUI, fontSize: 12, color: T.ink3, marginRight: 4 }}>{role}</span><LiveChip T={T} /><Hit T={T} icon="ellipsis-vertical" size={40} /></div>;
}
function DSearch({ T, placeholder = 'Customer, order no, design' }) {
  return <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0 12px' }}><Hit T={T} icon="sliders-horizontal" size={38} iconSize={17} style={{ background: T.surface, border: `1px solid ${T.line2}` }} /><div style={{ flex: 1, minWidth: 0, height: 40, borderRadius: 20, background: T.surface, border: `1px solid ${T.line2}`, display: 'flex', alignItems: 'center', gap: 6, padding: '0 12px 0 3px' }}><span className="press" style={{ width: 32, height: 32, borderRadius: 16, background: T.accent, color: T.onAccent, display: 'grid', placeItems: 'center', flex: 'none' }}><Ic name="scan-line" size={17} sw={1.9} /></span><span style={{ flex: 1, minWidth: 0, fontFamily: T.fontUI, fontSize: 13, color: T.ink3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingLeft: 4 }}>{placeholder}</span><Ic name="search" size={16} color={T.ink2} /></div></div>;
}
function DNodes({ T, active = 'Pending' }) {
  return <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 4, padding: '8px 36px 0 12px', overflow: 'hidden' }}>{D_NODES_P.map(([ic, l, n]) => { const on = l === active; return <span key={l} className="press" style={{ flex: 'none', display: 'inline-flex', alignItems: 'center', gap: 5, padding: on ? '4px 12px' : '4px 8px', borderRadius: 999, background: on ? T.ink : 'transparent', color: on ? T.bg : T.ink2, fontFamily: T.fontDisplay, fontSize: 16.5, fontWeight: 500, whiteSpace: 'nowrap' }}>{l}{n != null && <span style={{ fontFamily: T.fontUI, fontSize: 10.5, fontWeight: 600, padding: '1px 6px', borderRadius: 999, background: on ? 'rgba(255,255,255,.18)' : T.chipBg, color: on ? T.bg : T.ink2 }}>{n}</span>}</span>; })}<span style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 60, background: `linear-gradient(90deg, transparent, ${T.bg} 60%)`, pointerEvents: 'none' }} /><span className="press" style={{ position: 'absolute', right: 10, top: 12, width: 24, height: 24, borderRadius: 12, background: T.chipBg, color: T.ink2, display: 'grid', placeItems: 'center' }}><Ic name="chevron-right" size={13} sw={2.2} /></span></div>;
}
function DHeader({ T, node, chips, count, placeholder, title, back }) {
  return <div style={{ background: T.header, borderBottom: `1px solid ${T.line}`, boxShadow: T.headerShadow, paddingBottom: 8, marginTop: -54, paddingTop: 54, flex: 'none' }}><DTop T={T} title={title} back={back} /><DSearch T={T} placeholder={placeholder} />{node && <DNodes T={T} active={node} />}{chips && <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 12px 0', overflow: 'hidden' }}>{count && <span style={{ fontFamily: T.fontUI, fontSize: 12, color: T.ink3, whiteSpace: 'nowrap', flex: 'none', marginRight: 2 }}>{count}</span>}{chips.map(([l, on, x]) => <T.Chip key={l} on={on} outline={!on} x={x} style={{ height: 28 }}>{l}</T.Chip>)}</div>}</div>;
}
const Body = ({ children, style }) => <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', padding: '10px 14px 110px', ...style }}>{children}</div>;
const dock = (T) => <T.Dock active="Dispatch" noCart />;
const Offline = ({ T }) => <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', borderRadius: 10, background: T.warn + '1F', border: `1px solid ${T.warn}55`, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink, marginBottom: 8 }}><Ic name="wifi-off" size={13} color={T.warn} />Showing the last loaded list · 09:41</div>;

/* ── phone screens ───────────────────────────────────────────────────────── */
/* Ready orders */
function ScreenDReady({ T }) {
  return frameF(T, <><DHeader T={T} node="Ready" count="6 customers · 71 pcs" chips={[['Due ≤ 2 d', true], ['Fully packable', false], ['Partial', false], ['P1 / P2', false], ['In-stock only', true, true]]} /><Body><CustomerCard T={T} c={DC[2]} phone /><div style={{ height: 10 }} /><CustomerCard T={T} c={DC[0]} phone /></Body></>, dock(T));
}
function ScreenDReadyFilters({ T }) {
  const G = ({ t, opts, on = [] }) => <div style={{ marginTop: 12 }}><Meta T={T} style={{ display: 'block', fontSize: 10.5, letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 6 }}>{t}</Meta><div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{opts.map(o => <T.Chip key={o} on={on.includes(o)} outline={!on.includes(o)} style={{ height: 30 }}>{o}</T.Chip>)}</div></div>;
  return frameF(T, <><DHeader T={T} node="Ready" /><Body><CustomerCard T={T} c={DC[2]} phone /></Body></>, <>{scrimF(T)}<Sheet T={T} h={640} title="Sort & filter" foot={<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><OutBtn T={T}>Reset</OutBtn><span style={{ flex: 1 }} /><T.Btn style={{ height: 44 }}>Show 6 customers · 71 pcs</T.Btn></div>}>
    <G t="Sort" opts={['Due days · oldest first', 'Priority', 'Packable pcs', 'Total pcs', 'Customer score', 'Created · oldest', 'Created · newest']} on={['Due days · oldest first']} />
    <G t="Due days left" opts={['≤ 2 d', '≤ 7 d', 'Overdue', 'Any']} on={['Any']} />
    <G t="Stock" opts={['In-stock only', 'Fully packable', 'Partial', 'Fully short']} on={['In-stock only']} />
    <G t="Priority" opts={['P1', 'P2', 'P3', 'P4', 'P5']} />
    <G t="Tier" opts={['Platinum', 'Gold', 'Silver']} />
    <G t="Created before · total pcs" opts={['This week', 'Last 30 d', 'Older', 'Under 10 pcs', 'Under 25 pcs']} />
  </Sheet></>);
}
/* All pending orders: the phone's default node. money = manager roles */
function ScreenDPending({ T, money = true }) {
  return frameF(T, <><DHeader T={T} node="Pending" count="7 orders · 94 pcs" chips={[['Due ≤ 2 d', false], ['Fully short', false], ['Has final-step qty', true], ['P1 / P2', false]]} /><Body><PendingTree T={T} money={money} /></Body></>, dock(T));
}
const ScreenDPendingPacker = ({ T }) => <ScreenDPending T={T} money={false} />;
/* Packing companion */
function ScreenDPicker({ T }) {
  const c = DC[2];
  return frameF(T, <><DHeader T={T} node="Packing" placeholder="Customer or box code" /><Body>
    <Sect T={T} right={<Meta T={T}>8 live · tap one</Meta>}>Customers on the floor</Sect>
    <div style={{ display: 'flex', gap: 6, overflow: 'hidden', paddingBottom: 2 }}><CustomerChip T={T} c={DC[2]} on packed={5} ordered={12} inv={1} floor={3} /><CustomerChip T={T} c={DC[0]} packed={0} ordered={9} inv={0} floor={1} /><CustomerChip T={T} c={DC[5]} packed={12} ordered={20} inv={2} floor={1} oos={5} /></div>
    <Sect T={T} right={<Meta T={T}>{c.city} · {c.phone}</Meta>}>{c.name}</Sect>
    {XD.parcels.slice(0, 3).map((p, i) => <div key={p.code} className="press" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 16, background: T.surface, border: `1px solid ${i === 0 ? T.accentLine : T.line}`, boxShadow: i === 0 ? `0 0 0 2px ${T.accentSoft}` : 'none', marginBottom: 8 }}><Monogram T={T} c={c} /><span style={{ flex: 1, minWidth: 0 }}><div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><Num T={T} size={20}>{p.code}</Num><Meta T={T}>{p.lines.reduce((s, l) => s + l[2], 0)} pcs · {p.lines.length} lines</Meta></div><Meta T={T} style={{ display: 'block', marginTop: 2 }}>{p.status === 'OPEN' ? 'open · desk or phone can scan' : p.status === 'PACKED' ? 'packed · with the desk for invoice' : 'invoiced · awaiting shipment'}</Meta></span><Pill T={T} tone={p.status === 'OPEN' ? 'warn' : p.status === 'PACKED' ? 'blue' : 'ok'} small>{p.status.toLowerCase()}</Pill>{p.status === 'OPEN' && <Ic name="chevron-right" size={16} color={T.ink3} />}</div>)}
    <OutBtn T={T} icon="plus" style={{ width: '100%', justifyContent: 'center', height: 44, borderStyle: 'dashed' }}>New box for {c.name.split(' ')[0]}</OutBtn>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink3 }}><Ic name="lock" size={13} />Screen stays awake while a box is open · no rates on this phone</div>
  </Body></>, dock(T));
}
function ScanShell({ T, children, tally = 12, box = 'P00059', flash, strip }) {
  return <div style={{ position: 'relative', height: '100%', background: '#100D0B', color: '#fff', overflow: 'hidden', fontFamily: T.fontUI }}>
    <ScanCam T={T} h={470}>
      <div style={{ position: 'absolute', left: 12, right: 12, top: 58, display: 'flex', alignItems: 'center', gap: 8 }}><Hit T={T} icon="chevron-left" style={{ ...veil(), color: '#fff' }} /><span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 36, padding: '0 12px', borderRadius: 18, ...veil(), fontSize: 12.5 }}><Monogram T={{ ...T, ink: '#fff', bg: '#100D0B' }} c={DC[2]} s={20} />Ambika Enterprises · <b>{box}</b></span><span style={{ flex: 1 }} /><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 30, padding: '0 10px', borderRadius: 15, ...veil(), fontSize: 11, fontWeight: 600, letterSpacing: '.06em' }}><span style={{ width: 7, height: 7, borderRadius: 4, background: T.ok }} />LIVE</span></div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 118, textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,.8)' }}>Hold the barcode in the frame · the desk cannot scan while this phone holds the box</div>
      <div style={{ position: 'absolute', left: 16, right: 16, bottom: 14, display: 'flex', alignItems: 'flex-end', gap: 12 }}><span style={{ flex: 1 }}><div style={{ fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', opacity: .75 }}>In this box</div><div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 84, fontWeight: 600, lineHeight: .95, color: flash ? T.ok : '#fff', textShadow: flash ? `0 0 30px ${T.ok}88` : 'none', transition: 'color .2s' }}>{tally}</span><span style={{ fontSize: 16, opacity: .8 }}>pcs</span></div></span><span style={{ textAlign: 'right', fontSize: 11.5, opacity: .8 }}>order SO-3034<br />12 of 12 planned</span></div>
    </ScanCam>
    {strip}
    <div style={{ padding: '10px 16px 0' }}>{children}</div>
    <div style={{ position: 'absolute', left: 14, right: 14, bottom: 22, display: 'flex', gap: 8 }}><OutBtn T={T} icon="keyboard" style={{ flex: 1, justifyContent: 'center', height: 48, color: '#fff', borderColor: 'rgba(255,255,255,.3)' }}>Type serial</OutBtn><T.Btn icon="check" style={{ flex: 1.4, height: 48 }}>Review box</T.Btn></div>
  </div>;
}
function ScreenDScan({ T }) {
  return <ScanShell T={T} flash strip={<div style={{ padding: '10px 16px 0' }}><Toast T={T} kind="ok" title="1243 · Mehroon accepted" sub="serial PC-8841-0032 · line now 3 of 3" style={{ background: 'rgba(255,255,255,.06)', color: '#fff', borderColor: T.ok + '99' }} /></div>}>
    <div style={{ fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', opacity: .7, marginBottom: 6 }}>Last scans</div>
    {[['1243', 'Mehroon', '3 / 3', 'ok'], ['3661', 'Peach', '1 / 4', 'ok'], ['2798', 'Sky', '1 / 5 · stock exhausted after this', 'warn']].map((l, i) => { const d = dOf(l[0], l[1]); return <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', borderTop: '1px solid rgba(255,255,255,.08)' }}><Thumb T={T} d={d} w={30} h={38} r={7} /><span style={{ flex: 1, display: 'flex', alignItems: 'baseline', gap: 6 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 17, fontWeight: 600 }}>{l[0]}</span><span style={{ fontSize: 12, opacity: .8, display: 'inline-flex', alignItems: 'center', gap: 4 }}><Dot n={l[1]} s={7} />{l[1]}</span></span><span style={{ fontSize: 11.5, color: l[3] === 'warn' ? T.warn : 'rgba(255,255,255,.8)', whiteSpace: 'nowrap' }}>{l[2]}</span></div>; })}
  </ScanShell>;
}
function ScreenDScanRejected({ T }) {
  return <ScanShell T={T} strip={<div style={{ padding: '10px 16px 0' }}><Toast T={T} kind="danger" title="Rejected · not in this order" sub="6002 · Lilac is not on any open order of Ambika Enterprises. Tally unchanged." /></div>}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 14, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)' }}><Thumb T={T} d={dOf('6002')} w={36} h={45} r={8} /><span style={{ flex: 1 }}><div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 18, fontWeight: 600 }}>6002</span><span style={{ fontSize: 12, opacity: .8 }}>Lilac Court · serial PC-6002-0417</span></div><div style={{ fontSize: 11.5, opacity: .75, marginTop: 2 }}>Known serial · in stock · not eligible for this parcel's customer</div></span></div>
    <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>{['Duplicate', 'Not in this order', 'Line full', 'Parcel closed', 'Unknown serial'].map((r, i) => <span key={r} style={{ height: 24, padding: '0 9px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', fontSize: 10.5, letterSpacing: '.04em', textTransform: 'uppercase', fontWeight: 600, background: i === 1 ? T.danger : 'rgba(255,255,255,.08)', color: i === 1 ? '#fff' : 'rgba(255,255,255,.55)' }}>{r}</span>)}</div>
    <div style={{ fontSize: 11.5, opacity: .7, marginTop: 10 }}>The same five reasons show on the desk. Scan again or put the piece back on the rack.</div>
  </ScanShell>;
}
function ScreenDReview({ T }) {
  const p = XD.parcels[0]; const c = DC[2];
  return frameF(T, <><DHeader T={T} title="Review box" back placeholder="Scan or type a serial" /><Body>
    <ParcelCard T={T} p={p} c={c} phone active />
    <Card T={T} alt style={{ marginTop: 10 }}><div style={{ display: 'flex', gap: 10 }}><Ic name="triangle-alert" size={18} color={T.warn} /><span style={{ fontFamily: T.fontUI, fontSize: 12.5, color: T.ink }}><b>Remove 1 × 3661 Peach?</b><div style={{ color: T.ink2, marginTop: 2 }}>The piece becomes scannable elsewhere. Stepper and remove both ask this.</div><div style={{ display: 'flex', gap: 8, marginTop: 8 }}><OutBtn T={T} small>Keep</OutBtn><OutBtn T={T} small on>Remove</OutBtn></div></span></div></Card>
    <Meta T={T} style={{ display: 'block', marginTop: 10, whiteSpace: 'normal' }}>Close parcel hands the box to the desk. The desk reviews qty and rate and cuts the invoice; you will see it here as invoiced.</Meta>
  </Body></>, dock(T));
}
function ScreenDInvoiced({ T }) {
  const p = { ...XD.parcels[2], status: 'INVOICED', inv: 'SI-2288' }; const c = DC[2];
  return frameF(T, <><DHeader T={T} title="Box invoiced" back placeholder="Customer or box code" /><Body>
    <Card T={T}><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ width: 44, height: 44, borderRadius: 22, background: T.ok + '22', color: T.ok, display: 'grid', placeItems: 'center' }}><Ic name="circle-check" size={24} /></span><span style={{ flex: 1 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 20, fontWeight: 600, color: T.ink }}>P00035 is invoiced</div><Meta T={T} style={{ display: 'block' }}>SI-2288 · cut at the desk 11:02 · awaiting shipment</Meta></span></div><div style={{ display: 'flex', gap: 8, marginTop: 12 }}><GateToken T={T} /><Pill T={T} tone="ok" small>Invoiced</Pill><Pill T={T} tone="muted" small>Awaiting shipment</Pill></div></Card>
    <div style={{ height: 10 }} /><ParcelCard T={T} p={p} c={c} phone greyed />
    <Meta T={T} style={{ display: 'block', marginTop: 10, whiteSpace: 'normal' }}>2 pcs · amounts are on the desk and the A4, not on this phone. Stick the token on the box and put it on the shipment rack.</Meta>
    <div style={{ display: 'flex', gap: 8, marginTop: 12 }}><OutBtn T={T} icon="chevron-left" style={{ flex: 1, justifyContent: 'center', height: 44 }}>Back to boxes</OutBtn><T.Btn icon="plus" style={{ flex: 1, height: 44 }}>Next box</T.Btn></div>
  </Body></>, dock(T));
}
/* Billed */
const BILLED = [{ c: DC[2], orders: [{ no: 'SO-3034', inv: 'SI-2288', created: '01/09/26', delivered: '11/09/26 (est.)', days: 7, lines: [['1243', 'Mehroon', 1], ['D9107', 'White', 1]], pcs: 2, amt: 9490 }], pending: 10 }, { c: DC[4], orders: [{ no: 'SO-3036', inv: 'SI-2271', created: '01/09/26', delivered: '27/08/26', days: 6, lines: [['2006', 'Lavender', 6]], pcs: 6, amt: 26970 }], pending: 2 }];
function BilledGroup({ T, g, money, phone, open, invoiceOn }) {
  const total = g.orders.reduce((s, o) => s + o.amt, 0), pcs = g.orders.reduce((s, o) => s + o.pcs, 0);
  return <Card T={T} pad={phone ? 12 : 14} style={{ marginBottom: 10 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Monogram T={T} c={g.c} /><span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 18, fontWeight: 600, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{g.c.name}</div><Meta T={T} style={{ display: 'block' }}>{g.c.city} · {g.c.tier} · {g.c.transport}</Meta></span><Pill T={T} tone="warn" small>still pending {g.pending} pcs</Pill></div>
    {g.orders.map(o => <div key={o.no} style={{ marginTop: 10, paddingTop: 8, borderTop: `1px solid ${T.line}`, background: invoiceOn === o.inv ? T.accentSoft : 'transparent', borderRadius: 10, padding: invoiceOn === o.inv ? '8px 8px 4px' : '8px 0 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap' }}><Mono T={T}>{o.inv}</Mono><Meta T={T}>for {o.no}</Meta><span style={{ flex: 1 }} /><Meta T={T} style={{ whiteSpace: 'normal', textAlign: 'right', maxWidth: phone ? 190 : undefined }}>created {o.created} · delivered {o.delivered} · {o.days} d</Meta></div>
      {(open || !phone) && o.lines.map((l, i) => { const d = dOf(l[0], l[1]); return <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '5px 0', borderTop: `1px solid ${T.line}`, marginTop: i ? 0 : 6 }}><Thumb T={T} d={d} w={28} h={35} r={6} /><span style={{ flex: 1, display: 'flex', alignItems: 'baseline', gap: 6 }}><Num T={T} size={15}>{l[0]}</Num><span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11.5, color: T.ink2 }}><Dot n={l[1]} s={7} />{l[1]}</span></span><span style={{ fontSize: 12, color: T.ink2, fontVariantNumeric: 'tabular-nums' }}>{money ? `${l[2]} × ${DIN(d.price)} = ` : `× ${l[2]}`}{money && <b style={{ color: T.ink }}>{DIN(l[2] * d.price)}</b>}</span></div>; })}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}><Meta T={T}>{o.pcs} pcs</Meta><span style={{ flex: 1 }} />{money && <span style={{ fontFamily: T.fontSerif, fontSize: 15, fontWeight: 600, color: T.ink }}>{DIN(o.amt)}</span>}<OutBtn T={T} small icon="rotate-ccw">Return</OutBtn><Hit T={T} icon="printer" size={30} iconSize={14} style={{ background: T.chipBg }} /></div>
    </div>)}
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${T.line2}` }}><Meta T={T}>Customer · {pcs} pcs today</Meta><span style={{ flex: 1 }} />{money ? <PriceF v={total} size={18} font={T.fontSerif} color={T.ink} dim={T.ink3} /> : <Meta T={T}>amounts hidden for your role</Meta>}</div>
  </Card>;
}
function ScreenDBilled({ T, money = true }) {
  return frameF(T, <><DHeader T={T} node="Billed" count="2 customers · 8 pcs" chips={[['Today', true], ['Tier ▾', false], ['Transport ▾', false], ['Return initiated', false], ['Unshipped parcels', false]]} placeholder="Invoice, order or customer" /><Body>{BILLED.map((g, i) => <BilledGroup key={i} T={T} g={g} money={money} phone open={i === 0} />)}</Body></>, dock(T));
}
const ScreenDBilledPacker = ({ T }) => <ScreenDBilled T={T} money={false} />;
function ScreenDInvoiceSheet({ T, money = true }) {
  return frameF(T, <><DHeader T={T} node="Billed" placeholder="Invoice, order or customer" /><Body>{BILLED.map((g, i) => <BilledGroup key={i} T={T} g={g} money={money} phone />)}</Body></>, <>{scrimF(T)}<Sheet T={T} h={640} title="SI-2288" foot={<div style={{ display: 'flex', gap: 8 }}><OutBtn T={T} icon="rotate-ccw" style={{ flex: 1, justifyContent: 'center', height: 44 }}>Return</OutBtn><T.Btn icon="printer" style={{ flex: 1, height: 44 }}>Re-print A4</T.Btn></div>}>
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 2 }}>{[['Customer score', '74'], ['Last broker', 'Suman Traders'], ['Last purchase', '27/08/26'], ['Voucher', 'SI-2288 · Busy'], ['Delivered', '11/09/26 (est.)']].map(([k, v]) => <span key={k} style={{ padding: '6px 10px', borderRadius: 12, background: T.surface2, border: `1px solid ${T.line}` }}><Meta T={T} style={{ display: 'block', fontSize: 10 }}>{k}</Meta><span style={{ fontFamily: T.fontUI, fontSize: 12.5, fontWeight: 500, color: T.ink }}>{v}</span></span>)}</div>
    <div style={{ marginTop: 10 }}><InvoiceSheet T={T} state="done" compact phone money={money} /></div>
  </Sheet></>);
}
const ScreenDInvoiceSheetPacker = ({ T }) => <ScreenDInvoiceSheet T={T} money={false} />;
const SHIPS = [['SH-0412', '08/09/26', 'Ambika Enterprises', 'Local delivery', 'Suman Traders', 2, 8, 'SI-2288 · SI-2287', 'GT-260908-014'], ['SH-0411', '08/09/26', 'Aneri Boutique', 'SNS Express', 'Kishore Nathani', 1, 6, 'SI-2271', 'GT-260908-011'], ['SH-0409', '06/09/26', 'Nalli Fashion Mart', 'Sri Balaji Travels', 'Karthik S', 3, 27, 'SI-2260 · SI-2261 · SI-2263', 'GT-260906-031']];
function ShipmentRow({ T, s, phone, open, on }) {
  return <div style={{ padding: phone ? '10px 0' : '8px 12px', borderTop: `1px solid ${T.line}`, background: on ? T.accentSoft : 'transparent' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}><Mono T={T}>{s[0]}</Mono><Meta T={T}>{s[1]}</Meta><span style={{ fontFamily: T.fontUI, fontSize: 13, color: T.ink, fontWeight: 500, flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s[2]}</span><Meta T={T}>{s[5]} parcels · {s[6]} pcs</Meta>{!phone && <GateToken T={T} n={s[8]} done />}<Hit T={T} icon="printer" size={28} iconSize={13} style={{ background: T.chipBg }} /></div>
    <Meta T={T} style={{ display: 'block', marginTop: 3 }}><Ic name="truck" size={11} style={{ verticalAlign: -1, marginRight: 4 }} />{s[3]} · broker {s[4]} · {s[7]}</Meta>
    {open && <div style={{ marginTop: 6, display: 'flex', gap: 6, flexWrap: 'wrap' }}>{['P00035 · 2 pcs · SI-2288', 'P00036 · 6 pcs · SI-2287'].map(x => <span key={x} style={{ height: 26, padding: '0 9px', borderRadius: 999, background: T.chipBg, display: 'inline-flex', alignItems: 'center', fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2 }}>{x}</span>)}{phone && <GateToken T={T} n={s[8]} done />}</div>}
  </div>;
}
function ScreenDShipments({ T }) {
  return frameF(T, <><DHeader T={T} node="Billed" count="3 shipments today" chips={[['Invoices', false], ['Shipments', true], ['Transport ▾', false], ['Unshipped parcels', false]]} placeholder="Shipment, invoice or consignee" /><Body><Card T={T} pad={0} style={{ padding: '0 12px' }}>{SHIPS.map((s, i) => <ShipmentRow key={s[0]} T={T} s={s} phone open={i === 0} />)}</Card></Body></>, dock(T));
}
/* Out of stock */
function ScreenDOOS({ T }) {
  return frameF(T, <><DHeader T={T} node="Out of stock" count="14 designs" chips={[['Order shortages', true], ['Restock', false], ['Sourceable now', false], ['Nothing in production', false], ['At last step', false]]} placeholder="Design no or karigar" /><Body>
    <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}><T.Kpi small label="To produce" value="118" sub="pcs" /><T.Kpi small label="Sourceable now" value="42" sub="at last step" /><T.Kpi small label="In production" value="51" sub="not last step" /><T.Kpi small label="Nothing" value="25" sub="→ Production" tone="danger" /></div>
    <OOSCard T={T} phone /><div style={{ height: 10 }} /><OOSCard T={T} code="3661" kind="restock" phone sourcing="prod" />
  </Body></>, dock(T));
}
function ScreenDOOSFilters({ T }) {
  const G = ({ t, opts, on = [] }) => <div style={{ marginTop: 12 }}><Meta T={T} style={{ display: 'block', fontSize: 10.5, letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 6 }}>{t}</Meta><div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{opts.map(o => <T.Chip key={o} on={on.includes(o)} outline={!on.includes(o)} style={{ height: 30 }}>{o}</T.Chip>)}</div></div>;
  return frameF(T, <><DHeader T={T} node="Out of stock" /><Body><OOSCard T={T} phone /></Body></>, <>{scrimF(T)}<Sheet T={T} h={600} title="Sort & filter" foot={<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><OutBtn T={T}>Reset</OutBtn><span style={{ flex: 1 }} /><T.Btn style={{ height: 44 }}>Show 14 designs · 118 pcs</T.Btn></div>}>
    <G t="Show" opts={['Sourceable now', 'Everything short']} on={['Everything short']} />
    <G t="Restock suggestions" opts={['On', 'Off']} on={['On']} />
    <G t="Sort" opts={['Customer due soonest', 'Short qty highest', 'Demand priority', 'Sourceable first', 'Production ETA']} on={['Customer due soonest']} />
    <G t="Karigar" opts={['Saleem Creation', 'Rafiq Bhai', 'Noor Tailors', 'Unassigned']} />
    <G t="Production" opts={['At last step', 'Not last step', 'Nothing in production', 'Priority Production']} />
  </Sheet></>);
}
/* Warehouse stock */
const StockTabs = ({ T, tab }) => <div style={{ display: 'flex', gap: 4, padding: 3, borderRadius: 999, background: T.bg2, marginBottom: 10 }}>{['Finished goods', 'Material', 'Work in progress'].map(t => <span key={t} className="press" style={{ flex: 1, height: 32, borderRadius: 999, display: 'grid', placeItems: 'center', background: t === tab ? T.surface : 'transparent', boxShadow: t === tab ? '0 1px 4px rgba(0,0,0,.08)' : 'none', fontFamily: T.fontUI, fontSize: 12.5, fontWeight: t === tab ? 600 : 400, color: t === tab ? T.ink : T.ink2, whiteSpace: 'nowrap' }}>{t}</span>)}</div>;
function ScreenDStockFG({ T }) {
  return frameF(T, <><DHeader T={T} node="Stock" count="4,010 SKUs" chips={[['Out', false], ['Low', true], ['In production', false], ['Reserved', false], ['Free > 0', false]]} placeholder="Design no or colour" /><Body><StockTabs T={T} tab="Finished goods" />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 10 }}><T.Kpi small label="Low" value="212" sub="SKUs · whole set" tone="warn" /><T.Kpi small label="Out of stock" value="87" sub="SKUs · whole set" tone="danger" /></div>
    <Card T={T} pad={0} style={{ padding: '0 12px' }}>{FG_ROWS.map((r, i) => <StockRow key={i} T={T} r={r} phone />)}</Card><Meta T={T} style={{ display: 'block', textAlign: 'center', marginTop: 8 }}>7 of 299 · scarcity first</Meta></Body></>, dock(T));
}
function ScreenDStockMat({ T }) {
  return frameF(T, <><DHeader T={T} node="Stock" count="612 materials" chips={[['Low', true], ['Out', false], ['On order', false], ['Used by active job', false]]} placeholder="Material code or shade" /><Body><StockTabs T={T} tab="Material" />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 10 }}><T.Kpi small label="Below reorder" value="38" sub="materials" tone="warn" /><T.Kpi small label="On order" value="21" sub="arriving this week" /></div>
    <Card T={T} pad={0} style={{ padding: '0 12px' }}>{MAT_ROWS.map((r, i) => <StockRow key={i} T={T} kind="mat" r={r} phone />)}</Card></Body></>, dock(T));
}
function ScreenDStockWIP({ T }) {
  return frameF(T, <><DHeader T={T} node="Stock" count="1,240 pcs in WIP" chips={[['Waiting on floor', false], ['With karigar', true], ['Aged', false], ['Next process ready', false], ['Stuck', false]]} placeholder="Design, process or karigar" /><Body><StockTabs T={T} tab="Work in progress" />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 10 }}><T.Kpi small label="With karigars" value="1,022" sub="pcs" /><T.Kpi small label="Aged > 20 d" value="140" sub="pcs" tone="warn" /></div>
    <Card T={T} pad={0} style={{ padding: '0 12px' }}>{WIP_ROWS.map((r, i) => <StockRow key={i} T={T} kind="wip" r={r} phone />)}</Card></Body></>, dock(T));
}
function FGInwardCard({ T, j, on, phone }) {
  const d = dOf(j[1]); const got = j[4].reduce((s, c) => s + c[2], 0), exp = j[4].reduce((s, c) => s + c[1], 0);
  return <Card T={T} style={{ marginBottom: 10, border: `1px solid ${on ? T.accentLine : T.line}`, boxShadow: on ? `0 0 0 2px ${T.accentSoft}` : undefined }}>
    <div style={{ display: 'flex', gap: 10 }}><Thumb T={T} d={d} w={48} h={60} r={10} /><span style={{ flex: 1, minWidth: 0 }}><div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><Num T={T} size={22}>{j[1]}</Num><Mono T={T} size={11.5} weight={500} color={T.ink2}>{j[0]}</Mono></div><Meta T={T} style={{ display: 'block' }}>{j[2]} · from {j[3]}</Meta><div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>{j[4].map(c => <span key={c[0]} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, height: 28, padding: '0 8px', borderRadius: 999, background: T.chipBg, fontFamily: T.fontUI, fontSize: 12, color: T.ink }}><Dot n={c[0]} s={8} />{c[0]}{on ? <T.Step v={c[2]} /> : <b style={{ fontVariantNumeric: 'tabular-nums' }}>{c[2]} / {c[1]}</b>}</span>)}</div></span></div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10, paddingTop: 8, borderTop: `1px solid ${T.line2}` }}><Num T={T} size={17}>{got}</Num><Meta T={T}>of {exp} pcs received{got < exp ? ` · ${exp - got} short` : ''}</Meta><span style={{ flex: 1 }} />{on ? <T.Btn small icon="check" style={{ height: 34 }}>Verify into stock</T.Btn> : <Pill T={T} tone="ok" small>Verified 09:12</Pill>}</div>
  </Card>;
}
function ScreenDFGInward({ T }) {
  return frameF(T, <><DHeader T={T} node="Stock" count="2 jobs at the gate" chips={[['Arrived today', true], ['Waiting count', false], ['Short', false], ['Verified', false]]} placeholder="Job, design or karigar" /><Body>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 12, background: T.surface2, border: `1px solid ${T.line}`, marginBottom: 10, fontFamily: T.fontUI, fontSize: 12, color: T.ink2 }}><Ic name="ticket" size={14} color={T.ink3} />Gate token <b style={{ color: T.ink, fontFamily: T.fontMono, fontSize: 11.5 }}>GT-260908-009</b> · Noor Tailors · 2 bundles claimed</div>
    <Sect T={T} right={<Meta T={T}>last process only</Meta>}>Finished goods inward</Sect>
    <FGInwardCard T={T} j={FGI_JOBS[0]} on phone /><FGInwardCard T={T} j={FGI_JOBS[1]} phone />
  </Body></>, dock(T));
}
/* Sale return wizard (phone) */
function RetFrame({ T, step, children, foot }) {
  return frameF(T, <><DHeader T={T} title="Sale return" back placeholder={step === 2 ? 'Scan or search a design' : 'Customer or bill no'} /><div style={{ padding: '10px 0 4px', background: T.header, borderBottom: `1px solid ${T.line}` }}><StepRail T={T} step={step} phone /></div><Body>{children}</Body>{foot && <div style={{ position: 'absolute', left: 14, right: 14, bottom: 100, display: 'flex', gap: 8 }}>{foot}</div>}</>, dock(T));
}
function ScreenDRet1({ T }) {
  const c = DC[4];
  return <RetFrame T={T} step={1} foot={<><OutBtn T={T} style={{ flex: 1, justifyContent: 'center', height: 46 }}>Save draft</OutBtn><T.Btn icon="chevron-right" style={{ flex: 1.4, height: 46 }}>Pieces · 1 box</T.Btn></>}>
    <Card T={T}><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Monogram T={T} c={c} s={34} /><span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 19, fontWeight: 600, color: T.ink }}>{c.name}</div><Meta T={T} style={{ display: 'block' }}>{c.city} · {c.tier} · score {c.score} · GR ratio 4%</Meta></span><Ic name="chevron-down" size={16} color={T.ink3} /></div></Card>
    <Sect T={T}>Boxes at the counter</Sect>
    <Card T={T} alt><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ flex: 1, fontFamily: T.fontUI, fontSize: 13, color: T.ink }}>Parcels accepted<Meta T={T} style={{ display: 'block' }}>count them first · one credit note per box or per bill, you choose at step 4</Meta></span><T.Step v={1} big /></div></Card>
    <Sect T={T} right={<Meta T={T}>dispatched or invoiced · pick many</Meta>}>Bills being credited</Sect>
    {RET_BILLS.map((b, i) => <div key={b[0]} className="press" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 14, background: T.surface, border: `1px solid ${i < 2 ? T.accentLine : T.line}`, marginBottom: 6 }}><span style={{ width: 20, height: 20, borderRadius: 6, border: `1.5px solid ${i < 2 ? T.accent : T.line2}`, background: i < 2 ? T.accent : 'transparent', color: '#fff', display: 'grid', placeItems: 'center', flex: 'none' }}>{i < 2 && <Ic name="check" size={12} sw={3} />}</span><span style={{ flex: 1, minWidth: 0 }}><div style={{ display: 'flex', alignItems: 'baseline', gap: 7 }}><Mono T={T}>{b[0]}</Mono><Meta T={T}>{b[1]} · {b[2]}</Meta></div><Meta T={T} style={{ display: 'block' }}>{b[3]} pcs · delivered</Meta></span><Ic name="chevron-right" size={15} color={T.ink3} /></div>)}
  </RetFrame>;
}
function ScreenDRet2({ T }) {
  return <RetFrame T={T} step={2} foot={<><OutBtn T={T} icon="search" style={{ flex: 1, justifyContent: 'center', height: 46 }}>Search design</OutBtn><T.Btn icon="chevron-right" style={{ flex: 1.4, height: 46 }}>Preview · 4 pcs</T.Btn></>}>
    <div style={{ borderRadius: 18, overflow: 'hidden', marginBottom: 10 }}><ScanCam T={T} h={190}><div style={{ position: 'absolute', left: 12, top: 10, display: 'inline-flex', alignItems: 'center', gap: 8, height: 30, padding: '0 10px', borderRadius: 15, ...veil(), fontFamily: T.fontUI, fontSize: 12 }}>Box 1 of 1 · Aneri Boutique</div><div style={{ position: 'absolute', right: 12, top: 10 }}><Toast T={T} kind="ok" title="2006 · Lavender · 2" sub="from SI-2271 at ₹4,995" style={{ padding: '5px 10px', ...veil(), borderColor: T.ok + '99' }} /></div></ScanCam></div>
    <Sect T={T} right={<Meta T={T}>repeat scans bump · 0 removes</Meta>}>Pieces in this box</Sect>
    <Card T={T}><ReturnLines T={T} money={false} phone edit quiet /></Card>
    <div style={{ display: 'flex', gap: 6, marginTop: 10, overflow: 'hidden' }}><Meta T={T} style={{ alignSelf: 'center' }}>Or tap a colour of 6002:</Meta>{['Lilac', 'Blush'].map(n => <T.Chip key={n} outline style={{ height: 28 }}><Dot n={n} s={8} />{n}</T.Chip>)}</div>
  </RetFrame>;
}
function ScreenDRet3({ T, money = true }) {
  return <RetFrame T={T} step={3} foot={<><OutBtn T={T} style={{ flex: 1, justifyContent: 'center', height: 46 }}>Back</OutBtn><T.Btn icon="check" style={{ flex: 1.6, height: 46 }}>Raise credit note</T.Btn></>}>
    <Card T={T}><ReturnLines T={T} money={money} phone /></Card>
    <Card T={T} alt style={{ marginTop: 10 }}><Meta T={T} style={{ display: 'block', fontSize: 10.5, letterSpacing: '.06em', textTransform: 'uppercase' }}>Note</Meta><div style={{ fontFamily: T.fontUI, fontSize: 13, color: T.ink, marginTop: 3 }}>Lilac colour mismatch · customer kept 1 of 2 · Kishore bhai informed</div></Card>
    <Card T={T} style={{ marginTop: 10, borderColor: T.warn + '66' }}><div style={{ display: 'flex', gap: 8 }}><Ic name="triangle-alert" size={16} color={T.warn} /><span style={{ fontFamily: T.fontUI, fontSize: 12.5, color: T.ink }}><b>Before you can submit</b><div style={{ color: T.ink2, marginTop: 3 }}>· SI-2265 is from a shipment not yet marked delivered · confirm receipt or drop the 1457 line</div><div style={{ color: T.ink2 }}>· 1 box accepted, 2 bills credited · fine, one note per bill will be raised</div></span></div></Card>
  </RetFrame>;
}
const ScreenDRet3Packer = ({ T }) => <ScreenDRet3 T={T} money={false} />;
function ScreenDRet4({ T, money = true }) {
  return <RetFrame T={T} step={4} foot={<><OutBtn T={T} icon="plus" style={{ flex: 1, justifyContent: 'center', height: 46 }}>Next return</OutBtn><T.Btn icon="printer" style={{ flex: 1.2, height: 46 }}>Print note</T.Btn></>}>
    <CreditNote T={T} money={money} phone />
    <Sect T={T} right={<Meta T={T}>your audit trail</Meta>}>Recent notes</Sect><Card T={T} pad={0} style={{ padding: '0 12px' }}><RecentNotes T={T} /></Card>
  </RetFrame>;
}
const ScreenDRet4Packer = ({ T }) => <ScreenDRet4 T={T} money={false} />;

Object.assign(window, { DP_P, DC, dOf, dpcs, dpack, dueTxt, DIN, inWords, Thumb, Dot, Pill, DuePill, PDisc, Mono, Num, Meta, LiveChip, CallChip, GateToken, Monogram, Sect, DCard: Card, OutBtn, Toast, Progress, ProgDisc, PackLine, OrderHead, CustomerCard, PendingTree, CustomerChip, ParcelCard, InvoiceSheet, INV_LINES, ColourMatrix, KarigarPill, OOSCard, FG_ROWS, MAT_ROWS, WIP_ROWS, StockPill, StockRow, StepRail, RET_BILLS, RET_LINES_D, ReturnLines, CreditNote, RecentNotes, FGI_JOBS, FGInwardCard, Sheet, ScanCam, BILLED, BilledGroup, SHIPS, ShipmentRow, StockTabs, Offline, D_NODES_P,
  ScreenDReady, ScreenDReadyFilters, ScreenDPending, ScreenDPendingPacker, ScreenDPicker, ScreenDScan, ScreenDScanRejected, ScreenDReview, ScreenDInvoiced, ScreenDBilled, ScreenDBilledPacker, ScreenDInvoiceSheet, ScreenDInvoiceSheetPacker, ScreenDShipments, ScreenDOOS, ScreenDOOSFilters, ScreenDStockFG, ScreenDStockMat, ScreenDStockWIP, ScreenDFGInward, ScreenDRet1, ScreenDRet2, ScreenDRet3, ScreenDRet3Packer, ScreenDRet4, ScreenDRet4Packer });
