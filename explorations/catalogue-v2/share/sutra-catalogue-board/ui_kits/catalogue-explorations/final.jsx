/* FINAL rows (phone). One set of screens, two token sets: FINAL (light) and FINALD (dark). */

const veil = o => ({ background: 'rgba(20,18,17,.30)', backdropFilter: 'blur(14px) saturate(1.2)', WebkitBackdropFilter: 'blur(14px) saturate(1.2)', color: '#fff', ...o });
function PriceF({ v, size = 16, font, color, dim, weight = 500, style }) {
  if (v == null) return <span style={{ fontFamily: font, fontSize: size, color: dim, fontWeight: weight, ...style }}>TBD</span>;
  const s = v.toLocaleString('en-IN'); const m = s.match(/^(\d)(.*)$/);
  return <span style={{ display: 'inline-flex', alignItems: 'baseline', fontFamily: font, fontSize: Math.round(size * .95), lineHeight: 1, color, fontWeight: weight, whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums', ...style }}><span style={{ fontSize: Math.round(size * .68), marginRight: 2, color: dim }}>₹</span><span style={{ fontSize: Math.round(size * 1.08) }}>{m[1]}</span>{m[2]}</span>;
}
const LISTS = [['All', 'default'], ['Samples', 'default'], ['Materials', 'default'], ['Lehenga', 'default'], ['Saree', 'default'], ['Delhi picks', 'custom'], ['Wedding ’26', 'custom']];
const NAVF = [['house', 'Home'], ['layout-grid', 'Catalogue'], ['users', 'CRM'], ['package', 'Dispatch'], ['scissors', 'Production'], ['grip', 'More']];
const CART_GROUPS = [['2798', [['Sky', 2], ['Purple', 1]]], ['6002', [['Lilac', 1]]], ['3661', [['Peach', 2]]], ['1457', [['Firozi', 3], ['Bottle', 1]]]];
const agencyOf = c => c.broker.split(' ')[0] + ' Agency';
const ORDERS_F = [
  { no: 'SO-3455', c: XD.customers[0], date: '10/09/26', pcs: 5, designs: 3, bill: 24975, status: 'Raised' },
  { no: 'SO-3451', c: XD.customers[3], date: '09/09/26', pcs: 9, designs: 2, bill: 39955, status: 'Raised' },
  { no: 'SO-3448', c: XD.customers[0], date: '08/09/26', pcs: 4, designs: 2, bill: 19980, status: 'Raised' },
  { no: 'SO-3433', c: XD.customers[5], date: '02/09/26', pcs: 12, designs: 4, bill: 58940, status: 'Approved' },
  { no: 'SO-3401', c: XD.customers[2], date: '28/08/26', pcs: 4, designs: 2, bill: 17980, status: 'Approved' },
  { no: 'SO-3390', c: XD.customers[1], date: '26/08/26', pcs: 7, designs: 3, bill: 31965, status: 'Dispatched' },
  { no: 'SO-3372', c: XD.customers[4], date: '21/08/26', pcs: 6, designs: 2, bill: 26970, status: 'Dispatched' },
  { no: 'SO-3360', c: XD.customers[3], date: '18/08/26', pcs: 3, designs: 1, bill: 11985, status: 'Cancelled' },
];
const money = n => '₹' + n.toLocaleString('en-IN');
const lakh = n => '₹' + (n / 100000).toFixed(1) + 'L';

const FINAL = { ...base, name: 'Final · light', dark: false, ok: '#3F7D5A', warn: '#B8862B', danger: '#B23A3A', blue: '#5B6C7A',
  bg: '#F4EFE8', bg2: '#ECE6DE', surface: '#FCFAF6', surface2: '#F6F2EC', line: 'rgba(36,23,18,.08)', line2: 'rgba(36,23,18,.16)',
  ink: '#241712', ink2: '#65524A', ink3: '#9C8B80', accent: '#561C24', accentSoft: 'rgba(86,28,36,.09)', accentLine: 'rgba(86,28,36,.28)', gold: '#C0953F', onAccent: '#FDFBF7', custom: '#8F6A2B',
  fontDisplay: '"Cormorant Garamond", Georgia, serif', fontSerif: '"Cormorant Garamond", serif', fontUI: '"Jost", sans-serif', fontMono: '"IBM Plex Mono", monospace',
  rPhoto: 16, rCard: 22, rCtl: 14, rDock: 33, glass: 'rgba(252,250,246,.78)', glassEdge: 'rgba(255,255,255,.65)', glassHi: 'rgba(255,255,255,.8)', strip: 'rgba(252,250,246,.55)', chipBg: 'rgba(36,23,18,.06)', shadow: '0 18px 44px -14px rgba(36,23,18,.28)', photoBg: 'linear-gradient(180deg,#ECE6DE,#DDD3C7)',
  header: 'rgba(255,255,255,.55)', headerShadow: '0 8px 24px -18px rgba(36,23,18,.35)', rail: '#241712', railInk: '#F4EFE8', railInk2: 'rgba(244,239,232,.55)',
  depth: 'linear-gradient(180deg, rgba(255,255,255,.55) 0%, rgba(255,255,255,0) 30%, rgba(36,23,18,0) 70%, rgba(36,23,18,.05) 100%)', cardBottom: 158, sentenceHeads: true, final: true, viewerNoCart: true };
const FINALD = { ...FINAL, name: 'Final · dark', dark: true, ok: '#6FB58C', warn: '#D8B15A', danger: '#E48383', blue: '#8FB0D6',
  bg: '#140F0C', bg2: '#1C1512', surface: '#221A16', surface2: '#2C221D', line: 'rgba(250,247,242,.08)', line2: 'rgba(250,247,242,.16)',
  ink: '#FAF7F2', ink2: '#C8BDB3', ink3: '#8A7D74', accent: '#B24A5A', accentSoft: 'rgba(178,74,90,.18)', accentLine: 'rgba(178,74,90,.45)', gold: '#C0953F', onAccent: '#FAF7F2', custom: '#C8BDB3',
  glass: 'rgba(28,21,18,.62)', glassEdge: 'rgba(250,247,242,.10)', glassHi: 'rgba(250,247,242,.10)', strip: 'rgba(28,21,18,.45)', chipBg: 'rgba(250,247,242,.08)', shadow: '0 24px 50px -20px rgba(0,0,0,.7)', photoBg: 'linear-gradient(180deg,#2C221D,#1C1512)',
  header: 'rgba(250,247,242,.035)', headerShadow: '0 8px 24px -18px rgba(0,0,0,.6)', rail: '#0D0908', railInk: '#FAF7F2', railInk2: 'rgba(250,247,242,.5)',
  depth: 'radial-gradient(120% 50% at 50% -10%, rgba(250,247,242,.06), transparent 60%)' };

/* ── shared bits ── */
/* Agent mark: brow, two eyes, a stroke. Hollow orb around it. */
const AgentMark = ({ size = 16, color = 'currentColor' }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 7q3.5-3.5 7 0" /><circle cx="7.5" cy="10.5" r="1.4" fill={color} stroke="none" /><circle cx="16" cy="9.5" r="1.4" fill={color} stroke="none" /><path d="M14.5 12 8.5 19h5" /></svg>;
function Orb({ T, on, size = 34 }) { return <span className={'orb' + (on ? ' on' : '')} style={{ width: size, height: size, borderColor: T.ink, color: T.ink }}><AgentMark size={Math.round(size * .5)} /></span>; }
/* Cart icon that glows when carts are active */
const CartIcon = ({ T, active = true, count = 8, size = 44 }) => <span className="press" style={{ width: size, height: size, borderRadius: '50%', display: 'grid', placeItems: 'center', position: 'relative', color: active ? T.accent : T.ink, filter: active ? `drop-shadow(0 0 6px ${T.dark ? 'rgba(178,74,90,.9)' : 'rgba(86,28,36,.45)'})` : 'none', flex: 'none' }}><Ic name="shopping-basket" size={22} sw={1.8} />{count != null && <span style={{ position: 'absolute', top: 3, right: 2, minWidth: 16, height: 16, padding: '0 4px', borderRadius: 8, background: T.accent, color: T.onAccent, fontFamily: T.fontUI, fontSize: 9.5, fontWeight: 600, display: 'grid', placeItems: 'center', boxShadow: active ? `0 0 8px ${T.accent}` : 'none' }}>{count}</span>}</span>;
/* Camera with a magnifier inside: recognise a design by image */
const CamSearch = ({ size = 17, color }) => <span style={{ position: 'relative', display: 'inline-grid', placeItems: 'center', width: size, height: size }}><Ic name="camera" size={size} sw={1.7} color={color} /><Ic name="search" size={Math.round(size * .5)} sw={3} color={color} style={{ position: 'absolute', left: '50%', top: '56%', transform: 'translate(-50%,-50%)' }} /></span>;
const StatusPill = ({ T, s }) => { const c = s === 'Dispatched' ? T.ok : s === 'Approved' ? T.blue : s === 'Cancelled' ? T.ink3 : T.warn; return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, height: 22, padding: '0 8px', borderRadius: 999, background: T.chipBg, fontSize: 10.5, fontWeight: 600, letterSpacing: '.04em', textTransform: 'uppercase', color: c, whiteSpace: 'nowrap' }}><span style={{ width: 6, height: 6, borderRadius: 3, background: c }} />{s}</span>; };

/* ── data viz: sparse light grid behind every chart ── */
const GridBg = ({ w, h, T, cols = 6, rows = 3 }) => <g>{Array.from({ length: cols + 1 }, (_, i) => <line key={'v' + i} x1={i * w / cols} x2={i * w / cols} y1={0} y2={h} stroke={T.line} />)}{Array.from({ length: rows + 1 }, (_, i) => <line key={'h' + i} x1={0} x2={w} y1={i * h / rows} y2={i * h / rows} stroke={T.line} />)}</g>;
function LineG({ T, series, w = 300, h = 80, pad = 6, area }) {
  const all = series.flatMap(s => s.pts), max = Math.max(...all) * 1.05, min = 0;
  const X = (i, n) => pad + i * (w - pad * 2) / (n - 1), Y = v => h - pad - (v - min) / (max - min || 1) * (h - pad * 2);
  return <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ display: 'block', overflow: 'visible' }}>
    <GridBg w={w} h={h} T={T} />
    {series.map((s, k) => <g key={k}>{area && k === 0 && <polygon points={`${X(0, s.pts.length)},${h - pad} ` + s.pts.map((v, i) => X(i, s.pts.length) + ',' + Y(v)).join(' ') + ` ${X(s.pts.length - 1, s.pts.length)},${h - pad}`} fill={s.color} opacity=".08" />}<polyline points={s.pts.map((v, i) => X(i, s.pts.length) + ',' + Y(v)).join(' ')} fill="none" stroke={s.color} strokeWidth={s.width || 1.8} strokeLinejoin="round" strokeLinecap="round" strokeDasharray={s.dash ? '4 4' : 'none'} /><circle cx={X(s.pts.length - 1, s.pts.length)} cy={Y(s.pts[s.pts.length - 1])} r="3" fill={s.color} /></g>)}
  </svg>;
}
function BarsV({ T, data, w = 300, h = 90, color, labels }) {
  const max = Math.max(...data) || 1, n = data.length, bw = (w - 8) / n;
  return <svg width="100%" viewBox={`0 0 ${w} ${h + (labels ? 14 : 0)}`} style={{ display: 'block' }}>
    <GridBg w={w} h={h} T={T} cols={n} rows={3} />
    {data.map((v, i) => <rect key={i} x={4 + i * bw + bw * .2} y={h - v / max * (h - 6)} width={bw * .6} height={v / max * (h - 6)} rx="3" fill={Array.isArray(color) ? color[i] : color} />)}
    {labels && labels.map((l, i) => <text key={l} x={4 + i * bw + bw / 2} y={h + 11} fontSize="9" textAnchor="middle" fill={T.ink3} fontFamily="Jost">{l}</text>)}
  </svg>;
}
function Donut({ T, parts, size = 92, thick = 12, center }) {
  const r = (size - thick) / 2, C = 2 * Math.PI * r, total = parts.reduce((s, p) => s + p.v, 0); let acc = 0;
  return <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ flex: 'none' }}><circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={T.chipBg} strokeWidth={thick} />{parts.map((p, i) => { const len = p.v / total * C; const el = <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none" stroke={p.color} strokeWidth={thick} strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-acc + C / 4} strokeLinecap="butt" />; acc += len; return el; })}{center && <text x="50%" y="52%" textAnchor="middle" dominantBaseline="middle" fontSize="18" fontWeight="600" fontFamily="Cormorant Garamond" fill={T.ink}>{center}</text>}</svg>;
}
const Legend = ({ T, items }) => <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 12px', fontSize: 11, color: T.ink3 }}>{items.map(([l, c, v]) => <span key={l} style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><span style={{ width: 8, height: 8, borderRadius: 4, background: c }} />{l}{v != null && <b style={{ color: T.ink, fontWeight: 600 }}>{v}</b>}</span>)}</div>;
/* Stacked availability bar: free · reserved · coming */
const Stack = ({ T, f, r, p, max, h = 8 }) => { const w = v => Math.max(0, Math.round(v / (max || 1) * 100)) + '%'; return <span style={{ flex: 1, height: h, borderRadius: h / 2, background: T.chipBg, display: 'flex', overflow: 'hidden' }}><span style={{ width: w(f), background: T.ok }} /><span style={{ width: w(r), background: T.warn }} /><span style={{ width: w(p), background: T.blue, opacity: .6 }} /></span>; };

function attachFinal(T) {
  const P = T.dark ? { bg: T.ink, fg: T.bg } : { bg: T.accent, fg: T.onAccent };
  T.Btn = ({ kind = 'primary', children, icon, small, style }) => { const Pr = kind === 'primary', G = kind === 'ghost'; return <button className="press" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, height: small ? 36 : 48, padding: small ? '0 14px' : '0 22px', borderRadius: 999, border: Pr || G ? 0 : `1px solid ${T.line2}`, background: Pr ? P.bg : 'transparent', color: Pr ? P.fg : G ? T.ink2 : T.ink, fontFamily: T.fontUI, fontSize: small ? 12.5 : 14, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap', ...style }}>{icon && <Ic name={icon} size={small ? 14 : 16} />}{children}</button>; };
  T.Chip = ({ children, on, x, icon, outline, style }) => <span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 30, padding: '0 11px', borderRadius: 999, background: on ? T.ink : outline ? 'transparent' : T.chipBg, border: outline ? `1px solid ${T.line2}` : 0, color: on ? T.bg : T.ink, fontFamily: T.fontUI, fontSize: 12.5, whiteSpace: 'nowrap', flex: 'none', ...style }}>{icon && <Ic name={icon} size={13} />}{children}{x && <Ic name="x" size={12} style={{ opacity: .5 }} />}</span>;
  T.Tag = ({ tone = 'accent', children }) => { const c = tone === 'danger' ? T.danger : tone === 'ok' ? T.ok : tone === 'gold' ? T.gold : tone === 'muted' ? T.ink3 : T.accent; return <span style={{ fontFamily: T.fontUI, fontSize: 10.5, letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 500, color: c, whiteSpace: 'nowrap' }}>{children}</span>; };
  T.Step = ({ v, big }) => { const s = big ? 44 : 32; const b = { width: s, height: s, borderRadius: '50%', background: T.chipBg, display: 'grid', placeItems: 'center', color: T.ink }; return <span style={{ display: 'inline-flex', alignItems: 'center', gap: big ? 12 : 6 }}><span className="press" style={b}><Ic name="minus" size={big ? 16 : 13} /></span><span style={{ fontFamily: T.fontUI, fontSize: big ? 20 : 14, fontWeight: 500, minWidth: 16, textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>{v}</span><span className="press" style={{ ...b, background: T.ink, color: T.bg }}><Ic name="plus" size={big ? 16 : 13} /></span></span>; };
  T.Bars = ({ names, active, light }) => <span style={{ display: 'inline-flex', gap: 3, alignItems: 'flex-end' }}>{names.map(n => <span key={n} style={{ width: 4, height: n === active ? 26 : 20, borderRadius: 2, background: XD.cols[n], boxShadow: n === active ? `0 0 0 1.5px ${light ? '#fff' : T.ink}` : '0 1px 2px rgba(0,0,0,.35)' }} />)}</span>;
  T.PhotoQty = ({ qty }) => qty ? <span style={{ display: 'inline-flex', alignItems: 'center', height: 32, borderRadius: 16, padding: '0 3px', ...veil() }}><span className="press" style={{ width: 28, height: 28, display: 'grid', placeItems: 'center' }}><Ic name="minus" size={13} sw={2} /></span><span style={{ minWidth: 16, textAlign: 'center', fontFamily: T.fontUI, fontSize: 13.5, fontWeight: 600 }}>{qty}</span><span className="press" style={{ width: 26, height: 26, borderRadius: 13, display: 'grid', placeItems: 'center', background: 'rgba(255,255,255,.92)', color: '#241712' }}><Ic name="plus" size={13} sw={2.2} /></span></span>
    : <span className="press" style={{ width: 34, height: 34, borderRadius: 17, display: 'grid', placeItems: 'center', ...veil() }}><Ic name="plus" size={16} sw={1.9} /></span>;
  T.PhotoTag = ({ children, tone }) => <span style={{ padding: '3px 7px', borderRadius: 999, ...veil({ background: 'rgba(20,18,17,.22)' }), fontFamily: T.fontUI, fontSize: 9.5, letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 500, color: tone === 'danger' ? '#FFB3B3' : '#fff', whiteSpace: 'nowrap' }}>{children}</span>;
  /* Logos on a sleek tinted box; cart glows when carts are active */
  T.Lockup = ({ compact }) => <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9, height: compact ? 30 : 32, padding: '0 10px 0 7px', borderRadius: 10, background: T.accentSoft, border: `1px solid ${T.accentLine}` }}><img src={XD.A + 'logo/sutra-mark-gold.png'} style={{ height: 22 }} /><span style={{ width: 1, height: 14, background: T.accentLine }} /><img src={XD.A + (T.dark ? 'clients/srs-dress-only.png' : 'clients/srs-logo.png')} style={{ height: T.dark ? 16 : 19 }} /></span>;
  T.TopBar = ({ title, back }) => <div style={{ display: 'flex', alignItems: 'center', padding: '0 10px 0 12px', height: 44 }}>
    {back ? <Hit T={T} icon="chevron-left" size={40} /> : null}
    {title ? <span style={{ fontFamily: T.fontDisplay, fontSize: 24, fontWeight: 500, color: T.ink, marginLeft: back ? 0 : 6 }}>{title}</span> : <T.Lockup />}
    <span style={{ flex: 1 }} /><span style={{ fontFamily: T.fontUI, fontSize: 12, color: T.ink3 }}>Sales</span>
    <CartIcon T={T} /><Hit T={T} icon="ellipsis-vertical" size={40} />
  </div>;
  /* Search island: [view toggle] [filters] [ (scan)(recognise) ...... search ] all outlined, 40 tall */
  T.SearchBar = ({ view = 'grid' }) => { const ob = { background: T.surface, border: `1px solid ${T.line2}`, width: 38, height: 38 }; return <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0 12px' }}>
    <Hit T={T} icon={view === 'grid' ? 'list' : 'layout-grid'} size={38} iconSize={17} style={ob} />
    <Hit T={T} icon="sliders-horizontal" size={38} iconSize={17} style={ob} />
    <div style={{ flex: 1, minWidth: 0, height: 40, borderRadius: 20, background: T.surface, border: `1px solid ${T.line2}`, display: 'flex', alignItems: 'center', gap: 6, padding: '0 12px 0 3px' }}>
      <span className="press" style={{ width: 32, height: 32, borderRadius: 16, background: T.accent, color: T.onAccent, display: 'grid', placeItems: 'center', flex: 'none' }}><Ic name="scan-line" size={17} sw={1.9} /></span>
      <span className="press" style={{ width: 32, height: 32, borderRadius: 16, border: `1.5px solid ${T.accentLine}`, color: T.accent, display: 'grid', placeItems: 'center', flex: 'none' }}><CamSearch size={16} color={T.accent} /></span>
      <span style={{ flex: 1, minWidth: 0, fontFamily: T.fontUI, fontSize: 13, color: T.ink3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingLeft: 4 }}>Design no, name, barcode</span>
      <Ic name="search" size={16} color={T.ink2} />
    </div>
  </div>; };
  T.Lists = ({ active = 'All', count = 15 }) => <div style={{ marginTop: 8 }}>
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 6, padding: '0 36px 0 12px', overflow: 'hidden' }}>
      {LISTS.map(([l, k]) => { const on = l === active; return <span key={l} className="press" style={{ flex: 'none', padding: on ? '3px 12px' : '3px 7px', borderRadius: 999, background: on ? T.ink : 'transparent', color: on ? T.bg : k === 'custom' ? T.custom : T.ink2, fontFamily: T.fontDisplay, fontSize: 17, fontWeight: 500, fontStyle: k === 'custom' ? 'italic' : 'normal', whiteSpace: 'nowrap', lineHeight: 1.25 }}>{l}</span>; })}
      <span style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 60, background: `linear-gradient(90deg, transparent, ${T.bg} 60%)`, pointerEvents: 'none' }} />
      <span className="press" style={{ position: 'absolute', right: 10, top: 5, width: 24, height: 24, borderRadius: 12, background: T.chipBg, color: T.ink2, display: 'grid', placeItems: 'center' }}><Ic name="chevron-right" size={13} sw={2.2} /></span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 12px 0', overflow: 'hidden' }}>
      <span style={{ fontFamily: T.fontUI, fontSize: 12, color: T.ink3, whiteSpace: 'nowrap', flex: 'none', marginRight: 2 }}>{count} designs</span>
      <T.Chip x>Top 30</T.Chip><T.Chip x>Delhi</T.Chip><T.Chip x>Zari work</T.Chip><T.Chip x>Wine</T.Chip>
    </div>
    <div style={{ margin: '6px 12px 0', height: 2, borderRadius: 1, background: T.line }}><span style={{ display: 'block', width: '38%', height: 2, borderRadius: 1, background: T.accent }} /></div>
  </div>;
  T.Header = ({ view }) => <div style={{ background: T.header, borderBottom: `1px solid ${T.line}`, boxShadow: T.headerShadow, paddingBottom: 6, marginTop: -54, paddingTop: 54 }}><T.TopBar /><T.SearchBar view={view} /><T.Lists /></div>;
  T.GridCard = ({ d, qty, mode = 'cart' }) => <div>
    <div style={{ position: 'relative', aspectRatio: '4/5', borderRadius: T.rPhoto, overflow: 'hidden', background: T.photoBg, boxShadow: T.dark ? 'none' : '0 6px 18px -10px rgba(36,23,18,.35)' }}>
      {d.src ? <img src={d.src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /> : <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontFamily: T.fontDisplay, fontSize: 30, color: T.ink3 }}>{d.code}</div>}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '30%', background: 'linear-gradient(180deg, rgba(20,18,17,0), rgba(20,18,17,.42))', pointerEvents: 'none' }} />
      {(d.tag || d.note) && <div style={{ position: 'absolute', top: 7, left: 7, display: 'flex', gap: 4, flexWrap: 'wrap' }}>{d.tag && <T.PhotoTag>{d.tag}</T.PhotoTag>}{d.note && <T.PhotoTag tone="danger">{d.note}</T.PhotoTag>}</div>}
      <span style={{ position: 'absolute', left: 9, bottom: 9, display: 'flex' }}><T.Bars names={d.colours} /></span>
      {mode === 'cart' && <span style={{ position: 'absolute', right: 7, bottom: 7 }}><T.PhotoQty qty={qty} /></span>}
    </div>
    <div style={{ padding: '6px 3px 0' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 19, fontWeight: 600, color: T.ink, letterSpacing: '.01em', fontVariantNumeric: 'tabular-nums', lineHeight: 1.1 }}>{d.code}</span><span style={{ flex: 1 }} /><PriceF v={d.price} size={16} font={T.fontSerif} color={T.ink} dim={T.ink3} /></div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, marginTop: 2, lineHeight: 1.15, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.cat}<span style={{ opacity: .6 }}>·</span><span style={{ color: T.ink2 }}>{d.name}</span></div>
    </div>
  </div>;
  T.ListRow = ({ d, qty }) => <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 0', borderTop: `1px solid ${T.line}` }}>
    <div style={{ position: 'relative', width: 62, height: 78, borderRadius: 12, overflow: 'hidden', background: T.photoBg, flex: 'none' }}>{d.src ? <img src={d.src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /> : <span style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontFamily: T.fontMono, fontSize: 10, color: T.ink3 }}>{d.code}</span>}</div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 20, fontWeight: 600, color: T.ink, fontVariantNumeric: 'tabular-nums' }}>{d.code}</span>{d.tag && <T.Tag tone={d.tagTone === 'gold' ? 'gold' : 'accent'}>{d.tag}</T.Tag>}{d.note && <T.Tag tone="danger">{d.note}</T.Tag>}</div>
      <div style={{ marginTop: 2, fontSize: 12, color: T.ink3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.cat} · <span style={{ color: T.ink2 }}>{d.name}</span></div>
      <div style={{ marginTop: 6, display: 'flex', alignItems: 'flex-end', gap: 3 }}>{d.colours.map(n => <span key={n} style={{ width: 4, height: 14, borderRadius: 2, background: XD.cols[n] }} />)}<span style={{ fontSize: 11, color: T.ink3, marginLeft: 4 }}>{d.colours.length} colours</span></div>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}><PriceF v={d.price} size={17} font={T.fontSerif} color={T.ink} dim={T.ink3} /><T.Step v={qty || 0} /></div>
  </div>;
  T.CartStrip = ({ cart = 'A' }) => <div style={{ position: 'absolute', left: 14, right: 14, bottom: 98, padding: '6px 8px', borderRadius: 24, background: T.strip, backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: `1px solid ${T.glassEdge}` }}><CartChips T={T} cart={cart} /></div>;
  T.Island = ({ active = 'Catalogue', voice }) => <div style={{ position: 'absolute', left: 14, right: 14, bottom: 22, height: 66, borderRadius: 33, display: 'flex', alignItems: 'center', padding: '0 8px 0 2px', ...glass(T) }}>
    {NAVF.map(([i, l]) => { const on = l === active; return <span key={l} className="press" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, flex: 1, height: 52, borderRadius: T.rCtl, background: on ? T.accentSoft : 'transparent', color: on ? T.accent : T.ink2 }}><Ic name={i} size={20} sw={on ? 1.9 : 1.6} /><span style={{ fontFamily: T.fontUI, fontSize: 9, fontWeight: on ? 600 : 400, letterSpacing: '.01em' }}>{l}</span></span>; })}
    <span className="press" style={{ width: 48, height: 52, display: 'grid', placeItems: 'center', flex: 'none' }}><Orb T={T} on={voice} size={34} /></span>
  </div>;
  T.Dock = ({ active, cart, voice, noCart }) => <>{!noCart && <T.CartStrip cart={cart} />}<T.Island active={active} voice={voice} /></>;
  T.Hero = ({ d, colour, h = 548 }) => <div style={{ position: 'relative', height: h, borderRadius: '0 0 30px 30px', overflow: 'hidden', background: T.photoBg }}>
    <img src={d.src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    <div style={{ position: 'absolute', left: 12, right: 12, top: 58, display: 'flex', gap: 6 }}><Hit T={T} icon="chevron-left" style={veil()} /><span style={{ flex: 1 }} /><Hit T={T} icon="maximize-2" style={veil()} /><Hit T={T} icon="share-2" style={veil()} /></div>
    <div style={{ position: 'absolute', left: 12, bottom: 12, display: 'flex', gap: 10, alignItems: 'center', padding: '7px 12px 7px 10px', borderRadius: 16, ...veil(), fontFamily: T.fontUI, fontSize: 12.5 }}><T.Bars names={d.colours} active={colour} light />{colour} · 1 of {d.colours.length}</div>
    {d.tag && <span style={{ position: 'absolute', right: 12, bottom: 14 }}><T.PhotoTag>{d.tag}</T.PhotoTag></span>}
  </div>;
  /* Section head with an accent tick, cards alternate two surfaces for contrast */
  T.H = ({ children, right, tone }) => <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, padding: '0 20px', marginTop: 16 }}><span style={{ width: 3, height: 14, borderRadius: 2, background: tone === 'gold' ? T.gold : T.accent, alignSelf: 'center' }} /><span style={{ fontFamily: T.fontDisplay, fontSize: 17, fontWeight: 600, color: T.ink, whiteSpace: 'nowrap' }}>{children}</span><span style={{ flex: 1 }} />{right}</div>;
  T.Card = ({ children, style, alt }) => <div style={{ margin: '8px 16px 0', padding: 14, borderRadius: T.rCard, background: alt ? T.surface2 : T.surface, border: `1px solid ${T.line}`, boxShadow: T.dark || alt ? 'none' : '0 6px 18px -14px rgba(36,23,18,.25)', ...style }}>{children}</div>;
  T.Kpi = ({ label, value, sub, tone, small }) => <div style={{ flex: 1, minWidth: 0, padding: small ? '8px 10px' : '10px 12px', borderRadius: 16, background: T.surface2, border: `1px solid ${T.line}` }}><div style={{ fontFamily: T.fontUI, fontSize: 10.5, color: T.ink3, whiteSpace: 'nowrap' }}>{label}</div><div style={{ fontFamily: T.fontDisplay, fontSize: small ? 20 : 24, fontWeight: 600, color: tone === 'danger' ? T.danger : tone === 'ok' ? T.ok : T.ink, marginTop: 2, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{value}</div>{sub && <div style={{ fontSize: 10.5, color: T.ink3, marginTop: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sub}</div>}</div>;
  return T;
}
attachFinal(FINAL); attachFinal(FINALD);

const frameF = (T, children, bottom) => <div style={{ position: 'relative', height: '100%', background: T.bg, color: T.ink, overflow: 'hidden', fontFamily: T.fontUI }}>
  <div style={{ position: 'absolute', inset: 0, background: T.depth, pointerEvents: 'none' }} />
  <div style={{ position: 'relative', height: '100%', overflow: 'hidden', paddingTop: 54, display: 'flex', flexDirection: 'column' }}>{children}</div>{bottom}
</div>;
const scrimF = T => <div style={{ position: 'absolute', inset: 0, background: T.dark ? 'rgba(0,0,0,.5)' : 'rgba(36,23,18,.30)', backdropFilter: 'blur(3px)' }} />;

function FGridBody({ T, mode = 'cart' }) {
  const list = XD.designs.slice(0, 6);
  return <>
    <T.Header view={mode === 'list' ? 'list' : 'grid'} />
    {mode === 'list'
      ? <div style={{ padding: '4px 16px 260px' }}>{list.map(d => <T.ListRow key={d.code} d={d} qty={QTY[d.code]} />)}</div>
      : <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '12px 10px', padding: '10px 12px 270px', alignItems: 'start' }}>{list.map(d => <T.GridCard key={d.code} d={d} qty={QTY[d.code]} mode={mode} />)}</div>}
  </>;
}
function ScreenFGrid({ T }) { return frameF(T, <FGridBody T={T} />, <T.Dock active="Catalogue" cart="A" />); }
function ScreenFGridNoCart({ T }) { return frameF(T, <FGridBody T={T} mode="nocart" />, <T.Dock active="Catalogue" noCart />); }
function ScreenFList({ T }) { return frameF(T, <FGridBody T={T} mode="list" />, <T.Dock active="Catalogue" cart="A" />); }
/* Listening: orb active, aura breathing behind the island, one subtle centred dictation line */
function ScreenFVoice({ T }) {
  return frameF(T, <FGridBody T={T} />, <>
    <T.CartStrip cart="A" />
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 300, pointerEvents: 'none', overflow: 'hidden' }}>
      <span className="glow-a" style={{ position: 'absolute', left: '-10%', bottom: 10, width: 280, height: 170, borderRadius: '50%', background: '#E0507A', filter: 'blur(34px)', opacity: .9 }} />
      <span className="glow-b" style={{ position: 'absolute', left: '34%', bottom: -20, width: 260, height: 170, borderRadius: '50%', background: '#6E7BFF', filter: 'blur(34px)', opacity: .85 }} />
      <span className="glow-c" style={{ position: 'absolute', left: '62%', bottom: 26, width: 240, height: 160, borderRadius: '50%', background: '#FFB347', filter: 'blur(34px)', opacity: .85 }} />
      <span className="glow-d" style={{ position: 'absolute', left: '20%', bottom: 60, width: 220, height: 120, borderRadius: '50%', background: '#4FD1C5', filter: 'blur(40px)', opacity: .55 }} />
    </div>
    <div style={{ position: 'absolute', left: 34, right: 34, bottom: 150, height: 40, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', ...glass(T, { boxShadow: 'none', background: T.dark ? 'rgba(20,15,12,.55)' : 'rgba(252,250,246,.7)' }) }}>
      <span style={{ fontFamily: T.fontUI, fontWeight: 300, fontSize: 15.5, color: T.ink, letterSpacing: '.01em', whiteSpace: 'nowrap' }}>wine lehenga under five thousand</span><span className="aura-dot" style={{ width: 2, height: 16, background: T.accent, marginLeft: 3, borderRadius: 1 }} />
    </div>
    <T.Island active="Catalogue" voice />
  </>);
}
function ScreenFProduct({ T }) {
  const d = XD.designs[0]; const colour = 'Sky';
  return frameF(T, <div style={{ height: '100%', overflow: 'hidden', marginTop: -54 }}>
    <T.Hero d={d} colour={colour} h={548} />
    <div style={{ padding: '14px 20px 0' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 30, fontWeight: 600, letterSpacing: '.01em', color: T.ink, fontVariantNumeric: 'tabular-nums' }}>{d.code}</span><span style={{ fontFamily: T.fontUI, fontSize: 13, color: T.ink3, flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.cat} · <span style={{ color: T.ink2 }}>{d.name}</span> · {d.colours.length} colours</span><PriceF v={d.price} size={28} font={T.fontSerif} color={T.ink} dim={T.ink3} /></div>
      <div style={{ display: 'flex', gap: 10, marginTop: 12, alignItems: 'flex-start' }}>{d.colours.map(n => { const on = n === colour; return <div key={n} className="press" style={{ width: 58, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: 58, height: 72, borderRadius: 12, overflow: 'hidden', background: n === d.colours[0] ? T.photoBg : XD.cols[n], opacity: on ? 1 : .85 }}>{n === d.colours[0] && d.src ? <img src={d.src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /> : <span style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontFamily: T.fontMono, fontSize: 10, color: 'rgba(255,255,255,.9)' }}>{d.code}</span>}</div>
        <span style={{ width: 5, height: 5, borderRadius: 3, background: on ? T.accent : 'transparent', marginTop: 5 }} /><div style={{ fontSize: 11, marginTop: 1, color: on ? T.ink : T.ink3, fontWeight: on ? 600 : 400 }}>{n}</div>
      </div>; })}<span style={{ flex: 1 }} />{d.note && <T.Tag tone="danger">{d.note}</T.Tag>}</div>
    </div>
    <div style={{ position: 'absolute', left: 14, right: 14, bottom: 22, display: 'flex', alignItems: 'center', gap: 8, padding: 8, borderRadius: T.rDock, ...glass(T) }}>
      <span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, height: 40, padding: '0 8px 0 4px', borderRadius: 20, background: T.chipBg, flex: 'none' }}><span style={{ width: 30, height: 30, borderRadius: 15, background: T.accent, color: T.onAccent, display: 'grid', placeItems: 'center', fontFamily: T.fontDisplay, fontSize: 14, fontWeight: 600 }}>A</span><span style={{ fontSize: 12, lineHeight: 1.15, color: T.ink }}>Ramleela<br /><span style={{ color: T.ink3, fontSize: 10 }}>4 pcs</span></span><Ic name="chevrons-up-down" size={12} color={T.ink3} /></span>
      <span style={{ flex: 1 }} /><T.Step v={2} /><T.Btn icon="plus" style={{ height: 40, padding: '0 14px', fontSize: 13.5 }}>Add {colour}</T.Btn>
    </div>
  </div>);
}

/* ── Salesperson view (your 3a layout) in three frames with better viz ── */
const STOCK = { Sky: [20, 4, 30, '30/07'], Purple: [2, 0, 0, '—'], Seagreen: [5, 1, 10, '30/07'], Peach: [15, 0, 0, '—'] };
function SalesHead({ T }) {
  const d = XD.designs[0];
  return <>
    <div style={{ display: 'flex', alignItems: 'center', padding: '0 12px', height: 44, gap: 4 }}><Hit T={T} icon="chevron-left" size={40} /><span style={{ fontFamily: T.fontUI, fontSize: 12, color: T.ink3, flex: 1 }}>Salesperson view</span><span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, color: T.ink2 }}>Customer mode<span style={{ width: 34, height: 20, borderRadius: 10, background: T.chipBg, position: 'relative' }}><span style={{ position: 'absolute', left: 2, top: 2, width: 16, height: 16, borderRadius: 8, background: T.surface, boxShadow: '0 1px 2px rgba(0,0,0,.2)' }} /></span></span></div>
    <div style={{ display: 'flex', gap: 14, padding: '2px 20px 0' }}>
      <div style={{ width: 110, height: 140, borderRadius: 14, overflow: 'hidden', background: T.photoBg, flex: 'none' }}><img src={d.src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: T.fontDisplay, fontSize: 32, fontWeight: 600, color: T.ink, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{d.code}</div>
        <div style={{ fontSize: 12.5, color: T.ink3, marginTop: 4 }}>{d.cat} · <span style={{ color: T.ink2 }}>{d.name}</span></div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}><PriceF v={d.price} size={22} font={T.fontSerif} color={T.ink} dim={T.ink3} /><span style={{ fontSize: 11.5, color: T.ink3 }}>cost ₹2,610 · 40% GM</span></div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 8 }}><T.Tag>Top 30</T.Tag><T.Tag tone="danger">Low stock</T.Tag><T.Tag tone="gold">Priority sell</T.Tag><T.Tag tone="muted">Zari work</T.Tag><T.Tag tone="muted">Delhi · UP · MH</T.Tag><T.Tag tone="ok">Rank 12</T.Tag></div>
        <div style={{ display: 'flex', gap: 6, marginTop: 10 }}><T.Btn kind="secondary" small icon="upload" style={{ height: 32, fontSize: 12 }}>Media</T.Btn><T.Btn kind="secondary" small icon="tags" style={{ height: 32, fontSize: 12 }}>Set tag</T.Btn></div>
      </div>
    </div>
  </>;
}
const SalesTabs = ({ T, on }) => <div style={{ display: 'flex', gap: 4, padding: '12px 16px 0' }}>{['Stock & production', 'Recipe & media', 'Analytics & orders'].map(t => <span key={t} className="press" style={{ position: 'relative', padding: '6px 8px 8px', fontSize: 12.5, fontWeight: t === on ? 600 : 400, color: t === on ? T.ink : T.ink3, whiteSpace: 'nowrap' }}>{t}{t === on && <span style={{ position: 'absolute', left: 8, right: 8, bottom: 0, height: 2, background: T.accent, borderRadius: 1 }} />}</span>)}</div>;
function ScreenFSales1({ T }) {
  const d = XD.designs[0]; const max = Math.max(...Object.values(STOCK).map(r => r[0] + r[1] + r[2]));
  const tot = Object.values(STOCK).reduce((a, r) => [a[0] + r[0], a[1] + r[1], a[2] + r[2]], [0, 0, 0]);
  return frameF(T, <>
    <SalesHead T={T} /><SalesTabs T={T} on="Stock & production" />
    <T.H right={<Legend T={T} items={[['free', T.ok], ['reserved', T.warn], ['in prod', T.blue]]} />}>Stock by colour</T.H>
    <T.Card style={{ padding: '4px 14px 8px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '78px 1fr 44px 40px 40px 48px', gap: '0 6px', alignItems: 'center', padding: '6px 0 4px', fontSize: 10, letterSpacing: '.06em', textTransform: 'uppercase', color: T.ink3 }}><span /><span /><span style={{ textAlign: 'right' }}>Free</span><span style={{ textAlign: 'right' }}>Rsv</span><span style={{ textAlign: 'right' }}>Prod</span><span style={{ textAlign: 'right' }}>Due</span></div>
      {d.colours.map(n => { const [f, r, p, due] = STOCK[n]; return <div key={n} style={{ display: 'grid', gridTemplateColumns: '78px 1fr 44px 40px 40px 48px', gap: '0 6px', alignItems: 'center', padding: '7px 0', borderTop: `1px solid ${T.line}`, fontSize: 12.5 }}><span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, color: T.ink, fontWeight: 500 }}><span style={{ width: 4, height: 18, borderRadius: 2, background: XD.cols[n] }} />{n}</span><Stack T={T} f={f} r={r} p={p} max={max} /><span style={{ textAlign: 'right', fontWeight: 600, color: f < 5 ? T.danger : T.ink, fontVariantNumeric: 'tabular-nums' }}>{f}</span><span style={{ textAlign: 'right', color: r ? T.ink : T.ink3 }}>{r}</span><span style={{ textAlign: 'right', color: p ? T.blue : T.ink3 }}>{p}</span><span style={{ textAlign: 'right', color: T.ink3, fontSize: 11 }}>{due}</span></div>; })}
      <div style={{ display: 'grid', gridTemplateColumns: '78px 1fr 44px 40px 40px 48px', gap: '0 6px', padding: '8px 0 2px', borderTop: `1px solid ${T.line2}`, fontSize: 12.5, fontWeight: 600 }}><span>Total</span><span style={{ fontSize: 11, color: T.ok, fontWeight: 500 }}>{tot[0] - tot[1]} promisable now</span><span style={{ textAlign: 'right' }}>{tot[0]}</span><span style={{ textAlign: 'right' }}>{tot[1]}</span><span style={{ textAlign: 'right', color: T.blue }}>{tot[2]}</span><span /></div>
    </T.Card>
    <T.H tone="gold" right={<span style={{ fontSize: 11, color: T.ink3 }}>24 of 40 received</span>}>Production · PO-1187</T.H>
    <T.Card alt style={{ padding: '12px 14px' }}>
      <Timeline steps={['Dye', 'Embroidery', 'Stitching', 'Finishing']} done={2} active={2} T={T} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 10, color: T.ink3 }}><span>12/07</span><span>19/07</span><span>now · Rahul</span><span>due 30/07</span></div>
      <div style={{ marginTop: 10, height: 6, borderRadius: 3, background: T.chipBg }}><span style={{ display: 'block', width: '60%', height: 6, borderRadius: 3, background: T.ok }} /></div>
      <div style={{ display: 'flex', gap: 14, marginTop: 8, fontSize: 11.5, color: T.ink3 }}><span><b style={{ color: T.ink, fontWeight: 600 }}>24</b> received</span><span><b style={{ color: T.ink, fontWeight: 600 }}>16</b> with karigar</span><span><b style={{ color: T.warn, fontWeight: 600 }}>3 d</b> to due</span></div>
    </T.Card>
  </>, <T.Island active="Catalogue" />);
}
function ScreenFSales2({ T }) {
  const media = [['Primary · per colour', 4, 4, 'image'], ['Side profiles', 2, 4, 'images'], ['AI shoot', 0, 1, 'sparkles'], ['Model photoshoot', 1, 1, 'camera'], ['Video', 0, 1, 'video']];
  return frameF(T, <>
    <SalesHead T={T} /><SalesTabs T={T} on="Recipe & media" />
    <T.H right={<span style={{ fontSize: 11, color: T.ink3 }}>per pc · live godown stock</span>}>Recipe</T.H>
    <T.Card style={{ padding: '4px 14px' }}>{RECIPE.map(([m, q, st, ok], i) => { const need = [96, 200, 40, 60][i], have = [250, 50, 0, 0][i]; return <div key={m} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderTop: i ? `1px solid ${T.line}` : 0 }}>
      <span style={{ width: 36, height: 36, borderRadius: 8, background: T.photoBg, display: 'grid', placeItems: 'center', fontFamily: T.fontMono, fontSize: 8, color: T.ink3, flex: 'none' }}>MAT</span>
      <span style={{ flex: 1, minWidth: 0 }}><div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><span style={{ fontSize: 13.5, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m}</span><span style={{ fontSize: 11.5, color: T.ink3 }}>{q} / pc</span></div><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 5 }}><span style={{ flex: 1, height: 5, borderRadius: 3, background: T.chipBg }}><span style={{ display: 'block', width: Math.min(100, Math.round(have / need * 100)) + '%', height: 5, borderRadius: 3, background: ok ? T.ok : T.danger }} /></span><span style={{ fontSize: 10.5, color: T.ink3, whiteSpace: 'nowrap' }}>need {need} for PO</span></div></span>
      <span style={{ fontSize: 12.5, fontWeight: 600, minWidth: 46, textAlign: 'right', color: ok ? T.ok : T.danger }}>{st}</span>
    </div>; })}</T.Card>
    <T.H tone="gold" right={<span className="press" style={{ fontSize: 12, color: T.accent, fontWeight: 600 }}>Upload</span>}>Media centre · 7 of 12</T.H>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '8px 16px 0' }}>{media.map(([m, have, need, ic]) => { const done = have >= need; return <div key={m} style={{ padding: '10px 12px', borderRadius: 16, background: done ? T.surface : T.surface2, border: `1px solid ${done ? T.line : T.accentLine}` }}><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Ic name={ic} size={15} color={done ? T.ok : T.accent} /><span style={{ fontSize: 12, color: T.ink, flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m}</span></div><div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 8 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 22, fontWeight: 600, color: done ? T.ink : T.accent, lineHeight: 1 }}>{have}<span style={{ fontSize: 13, color: T.ink3, fontWeight: 400 }}> / {need}</span></span><span style={{ flex: 1 }} />{!done && <span style={{ fontSize: 10.5, color: T.accent, fontWeight: 600 }}>add</span>}</div></div>; })}</div>
  </>, <T.Island active="Catalogue" />);
}
function ScreenFSales3({ T }) {
  const d = XD.designs[0];
  return frameF(T, <>
    <SalesHead T={T} /><SalesTabs T={T} on="Analytics & orders" />
    <div style={{ display: 'flex', gap: 8, padding: '12px 16px 0', alignItems: 'stretch' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 16, background: T.surface2, border: `1px solid ${T.line}`, flex: 1.2 }}><Donut T={T} parts={[{ v: 78, color: T.accent }, { v: 22, color: 'transparent' }]} size={64} thick={7} center="78" /><span><div style={{ fontSize: 10.5, color: T.ink3 }}>Demand score</div><div style={{ fontSize: 12, color: T.ok, fontWeight: 600, marginTop: 2 }}>+12% month</div><div style={{ fontSize: 10.5, color: T.ink3, marginTop: 2 }}>rank 12 of 612</div></span></div>
      <T.Kpi label="Last month" value="28" sub="pcs · 3 open orders" small /><T.Kpi label="Lifelong" value="360" sub="pcs · ₹17.9L" small />
    </div>
    <T.H right={<Legend T={T} items={[['all', T.ink], ...d.colours.map(n => [n, XD.cols[n]])]} />}>Last 12 weeks · pcs</T.H>
    <T.Card style={{ padding: '10px 14px 8px' }}><LineG T={T} series={[{ pts: SERIES.month.all, color: T.ink, width: 2.2 }, ...d.colours.map(n => ({ pts: SERIES.month[n], color: XD.cols[n], width: 1.3 }))]} h={70} /></T.Card>
    <T.H tone="gold" right={<span style={{ fontSize: 11, color: T.ink3 }}>since launch</span>}>Lifelong</T.H>
    <T.Card alt style={{ padding: '10px 14px 6px' }}><LineG T={T} series={[{ pts: SERIES.life, color: T.gold, width: 2 }]} h={46} area /></T.Card>
    <T.H right={<span style={{ display: 'inline-flex', gap: 10 }}>{['All', 'Approved & pending', 'Dispatched'].map((t, i) => <span key={t} style={{ fontSize: 11, color: i === 0 ? T.ink : T.ink3, borderBottom: i === 0 ? `1.5px solid ${T.accent}` : '1.5px solid transparent', paddingBottom: 2 }}>{t}</span>)}</span>}>Sale orders</T.H>
    <T.Card style={{ padding: '2px 14px' }}>{ORDERS.map((o, i) => <div key={o[0]} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderTop: i ? `1px solid ${T.line}` : 0, fontSize: 12.5 }}><span style={{ fontFamily: T.fontMono, fontSize: 12, color: T.ink2 }}>{o[0]}</span><span style={{ flex: 1, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{o[1]}</span><span style={{ color: T.ink3, fontSize: 11 }}>{o[2]}</span><StatusPill T={T} s={o[3] === 'Pending' ? 'Raised' : o[3]} /><span style={{ fontWeight: 600, minWidth: 22, textAlign: 'right' }}>×{o[4]}</span></div>)}</T.Card>
  </>, <T.Island active="Catalogue" />);
}

function ScreenFScan({ T }) {
  const d = XD.designs[1]; const scanned = 'Lilac'; const qty = { Lilac: 1, Blush: 0 };
  const quick = [['Add pc', 'plus'], ['Add colour set', 'layers'], ['Pc to all carts', 'copy-plus'], ['Set to all carts', 'copy']];
  return <div style={{ position: 'relative', height: '100%', background: '#0B0A09', overflow: 'hidden', fontFamily: T.fontUI, color: T.ink }}>
    <img src={XD.A + 'samples/2006-lavender.jpg'} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: .5, filter: 'blur(1.5px)' }} />
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.5)' }} />
    <div style={{ position: 'absolute', left: 52, right: 52, top: 96, bottom: 96, borderRadius: 160, border: '1.5px solid rgba(255,255,255,.22)' }} />
    <div style={{ position: 'absolute', top: 62, left: 12 }}><Hit T={T} icon="chevron-left" style={veil()} /></div>
    <div style={{ position: 'absolute', top: 66, left: '50%', transform: 'translateX(-50%)', display: 'inline-flex', alignItems: 'center', gap: 8, height: 36, padding: '0 14px', borderRadius: 999, ...veil(), fontSize: 12.5, whiteSpace: 'nowrap' }}><span style={{ width: 7, height: 7, borderRadius: 4, background: '#5FCB8A' }} />Recognised · {d.code} · {scanned}</div>
    <div style={{ position: 'absolute', right: 14, bottom: 34, display: 'inline-flex', alignItems: 'center', gap: 8, height: 40, padding: '0 14px', borderRadius: 999, ...veil({ boxShadow: '0 0 0 1.5px #5FCB8A' }), fontSize: 12.5, fontWeight: 500, whiteSpace: 'nowrap' }}><Ic name="plus-circle" size={15} color="#5FCB8A" />Scan to add · on</div>
    <div style={{ position: 'absolute', left: 20, right: 20, top: 118, bottom: 116, borderRadius: 30, background: T.surface, boxShadow: '0 40px 80px -20px rgba(0,0,0,.8)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative', height: '54%', background: T.photoBg }}>
        <img src={d.src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '32%', background: 'linear-gradient(180deg, rgba(20,18,17,0), rgba(20,18,17,.5))' }} />
        <div style={{ position: 'absolute', left: 12, right: 12, bottom: 10, display: 'flex', alignItems: 'flex-end', gap: 10, color: '#fff', fontSize: 12 }}>{d.colours.map(n => <span key={n} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: n === scanned ? 600 : 400 }}><span style={{ width: 4, height: n === scanned ? 24 : 18, borderRadius: 2, background: XD.cols[n], boxShadow: n === scanned ? '0 0 0 1.5px #fff' : 'none' }} />{n}</span>)}<span style={{ flex: 1 }} /><span style={{ opacity: .85, fontSize: 11.5 }}>1 / 2</span></div>
        {d.tag && <span style={{ position: 'absolute', top: 10, left: 10 }}><T.PhotoTag>{d.tag}</T.PhotoTag></span>}
      </div>
      <div style={{ padding: '10px 14px 12px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1, minHeight: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 24, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{d.code}</span><span style={{ fontSize: 12, color: T.ink3, flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.cat} · <span style={{ color: T.ink2 }}>{d.name}</span></span><PriceF v={d.price} size={19} font={T.fontSerif} color={T.ink} dim={T.ink3} /></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: T.ink3 }}><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 9px 4px 6px', borderRadius: 999, background: T.accentSoft, color: T.ink, fontWeight: 500 }}><span style={{ width: 10, height: 10, borderRadius: 5, background: XD.cols[scanned] }} />Scanned · {scanned}</span>Godown 12 · Reserved 3<span style={{ flex: 1 }} /><span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 2, color: T.accent, fontSize: 12.5, fontWeight: 600 }}>Product<Ic name="chevron-right" size={13} sw={2.2} /></span></div>
        <div style={{ display: 'flex', gap: 6 }}>{CARTS.map(c => <T.Chip key={c.k} on={c.k === 'A'} style={{ height: 28, fontSize: 12 }}>{c.k} · {c.name.split(' ')[0]}</T.Chip>)}</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>{quick.map(([q, ic], i) => <T.Btn key={q} kind={i === 0 ? 'primary' : 'secondary'} small icon={ic} style={{ height: 36, fontSize: 12, padding: '0 10px', borderRadius: 14 }}>{i === 0 ? `Add pc · ${scanned}` : q}</T.Btn>)}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>{d.colours.map(n => <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, fontWeight: n === scanned ? 600 : 400 }}><span style={{ width: 10, height: 10, borderRadius: 5, background: XD.cols[n] }} />{n}<span style={{ flex: 1 }} /><T.Step v={qty[n]} /></div>)}</div>
      </div>
    </div>
  </div>;
}
function CartGroups({ T, groups, photo = 56 }) {
  return groups.map(g => <div key={g.d.code} style={{ borderTop: `1px solid ${T.line}`, padding: '12px 16px 6px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ width: photo, height: Math.round(photo * 1.25), borderRadius: 10, overflow: 'hidden', background: T.photoBg, flex: 'none' }}>{g.d.src && <img src={g.d.src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}</div>
      <span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 22, fontWeight: 600, color: T.ink, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{g.d.code}</div><div style={{ fontSize: 12, color: T.ink3, marginTop: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{g.d.cat} · <span style={{ color: T.ink2 }}>{g.d.name}</span></div><div style={{ fontSize: 11.5, color: T.ink3, marginTop: 3 }}>{g.pcs} pcs × {money(g.d.price || 0)}</div></span>
      <span style={{ textAlign: 'right' }}><div style={{ fontFamily: T.fontSerif, fontSize: 19, fontWeight: 600, color: T.ink, fontVariantNumeric: 'tabular-nums' }}>{money(g.pcs * (g.d.price || 0))}</div><div style={{ fontSize: 10.5, color: T.ink3, marginTop: 2 }}>total</div></span>
    </div>
    <div style={{ padding: `6px 0 0 ${photo + 12}px` }}>{g.cols.map(([n, q]) => <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 8, height: 40, fontSize: 13, color: T.ink }}><span style={{ width: 4, height: 18, borderRadius: 2, background: XD.cols[n] }} />{n}<span style={{ flex: 1 }} /><T.Step v={q} /><span className="press" style={{ width: 26, height: 26, borderRadius: 13, display: 'grid', placeItems: 'center', color: T.ink3 }}><Ic name="x" size={13} /></span></div>)}</div>
  </div>);
}
const groupsOf = () => CART_GROUPS.map(([c, cols]) => ({ d: XD.byCode[c], cols, pcs: cols.reduce((a, [, q]) => a + q, 0) }));
function ScreenFCarts({ T }) {
  const groups = groupsOf(); const pcs = groups.reduce((s, g) => s + g.pcs, 0), total = groups.reduce((s, g) => s + g.pcs * (g.d.price || 0), 0);
  return frameF(T, <>
    <div style={{ display: 'flex', alignItems: 'center', padding: '0 20px', height: 44 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 26, fontWeight: 500, color: T.ink }}>Carts</span><span style={{ flex: 1 }} /><T.Chip icon="user-plus">New customer</T.Chip></div>
    <div style={{ padding: '6px 16px 0' }}><CartChips T={T} cart="A" /></div>
    <div style={{ margin: '12px 14px 0', borderRadius: T.rCard, background: T.surface, border: `1px solid ${T.line}`, overflow: 'hidden', boxShadow: T.dark ? 'none' : '0 6px 18px -12px rgba(36,23,18,.25)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px 12px' }}><span style={{ minWidth: 0 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 20, fontWeight: 500, color: T.ink, whiteSpace: 'nowrap' }}>Ramleela Fashion</div><div style={{ fontSize: 12, color: T.ink3, marginTop: 2 }}>Surat · 30 days credit · {groups.length} designs · {pcs} pcs</div></span><span style={{ flex: 1 }} /><span style={{ display: 'inline-flex', padding: 3, borderRadius: 999, background: T.bg2, flex: 'none' }}>{['In-cabin', 'WhatsApp'].map((b, i) => <span key={b} className="press" style={{ height: 26, padding: '0 10px', borderRadius: 999, display: 'grid', placeItems: 'center', fontSize: 11.5, background: i === 0 ? T.surface : 'transparent', color: i === 0 ? T.ink : T.ink3 }}>{b}</span>)}</span></div>
      <CartGroups T={T} groups={groups} />
    </div>
  </>, <div style={{ position: 'absolute', left: 14, right: 14, bottom: 22, padding: 12, borderRadius: T.rDock, ...glass(T), display: 'flex', alignItems: 'center', gap: 14 }}>
    <span><div style={{ fontSize: 11.5, color: T.ink3, whiteSpace: 'nowrap' }}>{pcs} pcs · due 20 d</div><PriceF v={total} size={24} font={T.fontSerif} color={T.ink} dim={T.ink3} style={{ marginTop: 3 }} /></span><span style={{ flex: 1 }} /><T.Btn icon="check">Submit for approval</T.Btn>
  </div>);
}
function FilterGroups({ T }) {
  const G = ({ title, children }) => <div style={{ padding: '10px 0 2px' }}><div style={{ fontFamily: T.fontUI, fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', color: T.ink3, marginBottom: 8 }}>{title}</div><div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{children}</div></div>;
  return <>
    <G title="Recommended lists"><T.Chip icon="sparkles">Wedding season</T.Chip><T.Chip icon="sparkles">Under ₹5,000</T.Chip><T.Chip icon="sparkles">Moving fast in Delhi</T.Chip></G>
    <G title="Sort"><span style={{ display: 'inline-flex', padding: 3, borderRadius: 999, background: T.bg2 }}>{['Featured', 'New', 'Price ↑', 'Price ↓', 'Demand'].map((s, i) => <span key={s} className="press" style={{ height: 28, padding: '0 11px', borderRadius: 999, display: 'grid', placeItems: 'center', fontSize: 12, whiteSpace: 'nowrap', background: i === 0 ? T.surface : 'transparent', color: i === 0 ? T.ink : T.ink3 }}>{s}</span>)}</span></G>
    <G title="Category"><T.Chip on>Lehenga</T.Chip><T.Chip>Saree</T.Chip><T.Chip>Plazo set</T.Chip><T.Chip>Crop top</T.Chip><T.Chip>Blouse</T.Chip><T.Chip>Samples</T.Chip><T.Chip>Materials</T.Chip></G>
    <G title="Colour">{['Mehroon', 'Rani', 'Sky', 'Lilac', 'Firozi', 'Bottle', 'Peach', 'Lemon', 'White'].map(n => <span key={n} className="press" style={{ width: 30, height: 30, borderRadius: 15, background: XD.cols[n], boxShadow: n === 'Mehroon' ? `0 0 0 2px ${T.surface}, 0 0 0 3.5px ${T.ink}` : 'inset 0 0 0 1px rgba(0,0,0,.12)' }} />)}</G>
    <G title="Price"><T.Chip>Under ₹3k</T.Chip><T.Chip on>₹3k to ₹5k</T.Chip><T.Chip>₹5k to ₹8k</T.Chip><T.Chip>Over ₹8k</T.Chip></G>
    <G title="Tags"><T.Chip on>Top 30</T.Chip><T.Chip>Priority sell</T.Chip><T.Chip>New sample</T.Chip><T.Chip>Zari work</T.Chip><T.Chip>Trending</T.Chip></G>
    <G title="Stock"><T.Chip>In stock</T.Chip><T.Chip>Low stock</T.Chip><T.Chip>In production</T.Chip></G>
    <G title="Market"><T.Chip on>Delhi</T.Chip><T.Chip>Surat</T.Chip><T.Chip>Ludhiana</T.Chip><T.Chip>Chennai</T.Chip></G>
  </>;
}
function ScreenFFilters({ T }) {
  return frameF(T, <FGridBody T={T} />, <>
    {scrimF(T)}
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: 150, borderRadius: '30px 30px 0 0', background: T.surface, boxShadow: '0 -20px 60px -20px rgba(0,0,0,.5)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px 6px 20px' }}><span style={{ fontFamily: T.fontDisplay, fontSize: 24, fontWeight: 500, color: T.ink }}>Filters & sort</span><span style={{ flex: 1 }} /><T.Chip icon="bookmark">Save as list</T.Chip><Hit T={T} icon="x" size={36} iconSize={17} style={{ background: T.bg2 }} /></div>
      <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', padding: '0 20px' }}><FilterGroups T={T} /></div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px 26px', borderTop: `1px solid ${T.line}` }}><T.Btn kind="ghost" small>Reset</T.Btn><span style={{ flex: 1 }} /><T.Btn icon="check" style={{ height: 44 }}>Show 15 designs</T.Btn></div>
    </div>
  </>);
}

/* ── Sale orders ── */
const SO_TABS = [['Raised', 3], ['Approved', 2], ['Dispatched', 2], ['Cancelled', 1]];
const SO_COLS = [['Order', 88, o => o.no], ['Customer', 132, o => o.c.name], ['Date', 76, o => o.date], ['Pcs', 46, o => o.pcs], ['Designs', 62, o => o.designs], ['Bill', 84, o => money(o.bill)], ['Phone', 100, o => o.c.phone], ['Agent', 112, o => o.c.broker], ['Agent no.', 100, o => '98' + o.c.phone.slice(2)], ['Agency', 120, o => agencyOf(o.c)]];
function SOHeader({ T, tab = 'Raised', view = 'cards', analytics, grouping }) {
  return <>
    <div style={{ display: 'flex', alignItems: 'center', padding: '0 12px', height: 44, gap: 6 }}><Hit T={T} icon="chevron-left" size={40} /><span style={{ fontFamily: T.fontDisplay, fontSize: 24, fontWeight: 500, color: T.ink }}>Sale orders</span><span style={{ flex: 1 }} />
      <span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 34, padding: '0 12px', borderRadius: 999, border: `1px solid ${analytics ? T.accent : T.line2}`, background: analytics ? T.accent : 'transparent', color: analytics ? T.onAccent : T.ink, fontSize: 12.5, fontWeight: 500 }}><Ic name="bar-chart-3" size={15} />Analytics</span>
      {!analytics && <Hit T={T} icon={view === 'cards' ? 'table-2' : 'layout-list'} size={36} iconSize={17} style={{ background: T.surface, border: `1px solid ${T.line2}`, marginLeft: 6 }} />}</div>
    {!analytics && <>
      <div style={{ display: 'flex', gap: 2, padding: '2px 12px 0', overflow: 'hidden' }}>{SO_TABS.map(([t, n]) => <span key={t} className="press" style={{ position: 'relative', padding: '8px 8px 10px', fontFamily: T.fontUI, fontSize: 13, fontWeight: t === tab ? 600 : 400, color: t === tab ? T.ink : T.ink3, whiteSpace: 'nowrap' }}>{t} <span style={{ fontSize: 11, color: T.ink3 }}>{n}</span>{t === tab && <span style={{ position: 'absolute', left: 8, right: 8, bottom: 0, height: 2, background: T.accent, borderRadius: 1 }} />}</span>)}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px 0', overflow: 'hidden' }}><T.Chip icon="search" outline>Order, customer</T.Chip><T.Chip icon="calendar" x outline>This month</T.Chip>{view === 'table' && <><T.Chip icon="group" on={grouping} outline={!grouping}>Group by</T.Chip><T.Chip icon="columns-3" outline>Columns</T.Chip></>}{view !== 'table' && <T.Chip icon="arrow-down-up" outline>Newest</T.Chip>}</div>
    </>}
  </>;
}
function ScreenFSalesOrders({ T }) {
  const list = ORDERS_F.filter(o => o.status === 'Raised');
  return frameF(T, <>
    <SOHeader T={T} tab="Raised" view="cards" />
    <div style={{ padding: '12px 14px 120px', display: 'flex', flexDirection: 'column', gap: 10 }}>{list.map(o => <div key={o.no} style={{ padding: '12px 14px', borderRadius: T.rCard, background: T.surface, border: `1px solid ${T.line}`, boxShadow: T.dark ? 'none' : '0 6px 18px -14px rgba(36,23,18,.25)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ fontFamily: T.fontMono, fontSize: 13, fontWeight: 600, color: T.ink }}>{o.no}</span><StatusPill T={T} s={o.status} /><span style={{ flex: 1 }} /><span style={{ fontSize: 11.5, color: T.ink3 }}>{o.date}</span></div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 20, fontWeight: 500, color: T.ink, flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{o.c.name}</span><span style={{ fontFamily: T.fontSerif, fontSize: 19, fontWeight: 600, color: T.ink, fontVariantNumeric: 'tabular-nums' }}>{money(o.bill)}</span></div>
      <div style={{ fontSize: 12, color: T.ink3, marginTop: 2 }}>{o.c.city}{o.c.market ? ' · ' + o.c.market : ''} · {o.c.tier} · {o.pcs} pcs · {o.designs} designs</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10 }}><T.Chip icon="phone" style={{ height: 28, fontSize: 11.5 }}>{o.c.phone}</T.Chip><T.Chip icon="user" style={{ height: 28, fontSize: 11.5 }}>{o.c.broker}</T.Chip><span style={{ flex: 1 }} /><Hit T={T} icon="printer" size={34} iconSize={16} style={{ background: T.chipBg }} /><Hit T={T} icon="share-2" size={34} iconSize={16} style={{ background: T.chipBg }} /></div>
    </div>)}</div>
  </>, <T.Island active="Catalogue" />);
}
/* Table inside its own frame: heads with grips and filter icons, a horizontal scroll track under the heads,
   a vertical track on the right, sticky first column. `grouped` collapses Customer + Agency into group rows. */
function SOTable({ T, rows, grouped, filterCard, height }) {
  const cols = grouped ? SO_COLS.filter(c => c[0] !== 'Customer' && c[0] !== 'Agency') : SO_COLS;
  const head = <div style={{ display: 'flex', width: 'max-content', position: 'sticky', top: 0, zIndex: 3 }}>{cols.map(([c, w], i) => <div key={c} style={{ width: w, flex: 'none', padding: '9px 8px 9px 10px', borderBottom: `1px solid ${T.line2}`, borderRight: `1px solid ${T.line}`, background: c === 'Customer' && filterCard ? T.accentSoft : T.surface2, display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, color: T.ink2, whiteSpace: 'nowrap', position: i === 0 ? 'sticky' : 'static', left: 0, zIndex: i === 0 ? 2 : 1 }}><Ic name="grip-vertical" size={11} color={T.ink3} /><span style={{ flex: 1 }}>{c}</span>{c === 'Date' && <Ic name="arrow-down" size={11} color={T.accent} />}<Ic name="filter" size={11} color={c === 'Customer' && filterCard ? T.accent : T.ink3} /></div>)}</div>;
  const line = (o, r, indent) => <div key={o.no} style={{ display: 'flex', width: 'max-content', background: r % 2 ? T.bg2 : 'transparent' }}>{cols.map(([c, w, get], i) => <div key={c} style={{ width: w, flex: 'none', padding: `8px 8px 8px ${i === 0 && indent ? 22 : 10}px`, borderRight: `1px solid ${T.line}`, borderBottom: `1px solid ${T.line}`, fontSize: 12, color: i === 0 ? T.ink : T.ink2, fontFamily: ['Order', 'Phone', 'Agent no.'].includes(c) ? T.fontMono : T.fontUI, fontWeight: i === 0 ? 600 : 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', position: i === 0 ? 'sticky' : 'static', left: 0, background: i === 0 ? (r % 2 ? T.bg2 : T.surface) : 'transparent', fontVariantNumeric: 'tabular-nums' }}>{get(o)}</div>)}</div>;
  let body;
  if (grouped) {
    const byC = {}; rows.forEach(o => { (byC[o.c.name] = byC[o.c.name] || []).push(o); });
    let r = 0; body = Object.entries(byC).map(([name, os]) => { const byA = {}; os.forEach(o => { (byA[agencyOf(o.c)] = byA[agencyOf(o.c)] || []).push(o); }); return <div key={name}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', background: T.accentSoft, borderBottom: `1px solid ${T.line}`, fontSize: 12.5, fontWeight: 600, color: T.ink, position: 'sticky', left: 0, width: 340 }}><Ic name="chevron-down" size={13} /><span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</span><span style={{ fontSize: 11, color: T.ink3, fontWeight: 400 }}>{os.length} orders · {money(os.reduce((s, o) => s + o.bill, 0))}</span></div>
      {Object.entries(byA).map(([ag, list]) => <div key={ag}><div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px 6px 22px', background: T.surface2, borderBottom: `1px solid ${T.line}`, fontSize: 11.5, color: T.ink2, position: 'sticky', left: 0, width: 340 }}><Ic name="chevron-down" size={12} /><span style={{ flex: 1 }}>{ag}</span><span style={{ fontSize: 10.5, color: T.ink3 }}>{list.length}</span></div>{list.map(o => line(o, r++, true))}</div>)}
    </div>; });
  } else body = rows.map((o, r) => line(o, r));
  return <div style={{ position: 'relative', borderRadius: 18, background: T.surface, border: `1px solid ${T.line}`, overflow: 'hidden', height, display: 'flex', flexDirection: 'column' }}>
    <div style={{ height: 6, background: T.surface2, borderBottom: `1px solid ${T.line}`, position: 'relative', flex: 'none' }}><span style={{ position: 'absolute', left: 8, top: 1, width: '34%', height: 4, borderRadius: 2, background: T.accentLine }} /></div>
    <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', position: 'relative' }}>
      <div style={{ overflow: 'hidden', position: 'absolute', inset: 0 }}>{head}{body}</div>
      <span style={{ position: 'absolute', right: 2, top: 44, width: 4, height: '30%', borderRadius: 2, background: T.accentLine }} />
      {filterCard && <div style={{ position: 'absolute', left: 82, top: 40, width: 232, borderRadius: 18, background: T.surface, border: `1px solid ${T.line2}`, boxShadow: '0 24px 50px -16px rgba(0,0,0,.45)', padding: 12, zIndex: 5 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, fontWeight: 600, color: T.ink }}>Customer<span style={{ flex: 1 }} /><span style={{ fontSize: 11, color: T.accent }}>Clear</span></div>
        <div style={{ marginTop: 8, height: 32, borderRadius: 16, background: T.chipBg, display: 'flex', alignItems: 'center', gap: 6, padding: '0 10px', fontSize: 12, color: T.ink3 }}><Ic name="search" size={13} />Search customers</div>
        <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>{['A → Z', 'Bill ↓', 'Tier'].map((s, i) => <T.Chip key={s} on={i === 0} style={{ height: 26, fontSize: 11 }}>{s}</T.Chip>)}</div>
        <div style={{ marginTop: 8 }}>{XD.customers.slice(0, 4).map((c, i) => <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 8, height: 30, fontSize: 12.5, color: T.ink }}><span style={{ width: 16, height: 16, borderRadius: 4, border: `1.5px solid ${i < 2 ? T.accent : T.line2}`, background: i < 2 ? T.accent : 'transparent', display: 'grid', placeItems: 'center' }}>{i < 2 && <Ic name="check" size={11} color={T.onAccent} sw={3} />}</span>{c.name}<span style={{ flex: 1 }} /><span style={{ fontSize: 11, color: T.ink3 }}>{c.tier}</span></div>)}</div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}><T.Btn small style={{ height: 32 }}>Apply</T.Btn></div>
      </div>}
    </div>
  </div>;
}
function ScreenFSalesTable({ T }) {
  return frameF(T, <>
    <SOHeader T={T} tab="Raised" view="table" />
    <div style={{ flex: 1, minHeight: 0, margin: '12px 14px 104px' }}><SOTable T={T} rows={ORDERS_F} filterCard height="100%" /></div>
  </>, <T.Island active="Catalogue" />);
}
/* Grouping island: chain columns by dragging chips; tap the arrow on a chip to flip its sort. */
function GroupIsland({ T, style }) {
  return <div style={{ padding: '10px 12px', borderRadius: 20, ...glass(T), ...style }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11.5, color: T.ink3 }}><Ic name="group" size={13} />Group by<span style={{ flex: 1 }} /><span style={{ fontSize: 11, color: T.accent, fontWeight: 600 }}>Clear</span></div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, overflow: 'hidden' }}>
      {[['Customer', 'arrow-down-a-z'], ['Agency', 'arrow-up-a-z']].map(([c, ic], i) => <React.Fragment key={c}>{i > 0 && <Ic name="chevron-right" size={13} color={T.ink3} />}<span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 32, padding: '0 8px 0 6px', borderRadius: 999, background: T.ink, color: T.bg, fontSize: 12.5, fontWeight: 500, whiteSpace: 'nowrap' }}><Ic name="grip-vertical" size={12} style={{ opacity: .6 }} />{c}<span style={{ width: 22, height: 22, borderRadius: 11, background: 'rgba(255,255,255,.16)', display: 'grid', placeItems: 'center' }}><Ic name={ic} size={12} /></span></span></React.Fragment>)}
      <span style={{ width: 30, height: 30, borderRadius: 15, border: `1px dashed ${T.line2}`, display: 'grid', placeItems: 'center', color: T.ink2 }}><Ic name="plus" size={14} /></span>
      <span style={{ fontSize: 10.5, color: T.ink3, whiteSpace: 'nowrap' }}>drag a column here</span>
    </div>
    <div style={{ display: 'flex', gap: 5, marginTop: 8, overflow: 'hidden' }}>{['Date', 'Agent', 'Status', 'Tier', 'City'].map(c => <T.Chip key={c} outline style={{ height: 26, fontSize: 11, padding: '0 9px' }}><Ic name="grip-vertical" size={10} />{c}</T.Chip>)}</div>
  </div>;
}
function ScreenFSalesGrouped({ T }) {
  return frameF(T, <>
    <SOHeader T={T} tab="Raised" view="table" grouping />
    <GroupIsland T={T} style={{ margin: '10px 14px 0' }} />
    <div style={{ flex: 1, minHeight: 0, margin: '10px 14px 104px' }}><SOTable T={T} rows={ORDERS_F.filter(o => o.status !== 'Cancelled')} grouped height="100%" /></div>
  </>, <T.Island active="Catalogue" />);
}
function CustomerBar({ T, c, compact }) {
  return <div style={{ padding: compact ? '10px 12px' : '12px 14px', borderRadius: T.rCard, background: T.surface, border: `1px solid ${T.line}` }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 22, fontWeight: 500, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</div><div style={{ fontSize: 12, color: T.ink3, marginTop: 2 }}>{c.city} · {c.market} · {c.tier} · score {c.score}</div></span><T.Chip icon="history" outline style={{ height: 32 }}>Purchase history</T.Chip></div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 12px', marginTop: 10, fontSize: 12 }}>
      {[['Phone', c.phone, 'phone'], ['Transport', c.transport, 'truck'], ['Broker', c.broker, 'user'], ['Agency', agencyOf(c), 'briefcase'], ['Payment score', '82 · 2 bills open', 'wallet'], ['Credit', '30 days · ₹1.2L limit', 'calendar']].map(([k, v, ic]) => <span key={k} style={{ display: 'flex', alignItems: 'center', gap: 7, minWidth: 0 }}><Ic name={ic} size={13} color={T.ink3} /><span style={{ minWidth: 0 }}><div style={{ fontSize: 10, color: T.ink3 }}>{k}</div><div style={{ color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v}</div></span></span>)}
    </div>
  </div>;
}
const ORDER_LINES = () => [['2798', [['Sky', 2], ['Purple', 1]]], ['6002', [['Lilac', 1]]], ['3661', [['Peach', 1]]]].map(([code, cols]) => ({ d: XD.byCode[code], cols }));
function OrderLines({ T, o, lines }) {
  return <div style={{ borderRadius: T.rCard, background: T.surface, border: `1px solid ${T.line}`, overflow: 'hidden' }}>
    {lines.map((l, i) => <div key={l.d.code} style={{ borderTop: i ? `1px solid ${T.line}` : 0, padding: '10px 14px 6px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><div style={{ width: 44, height: 56, borderRadius: 8, overflow: 'hidden', background: T.photoBg, flex: 'none' }}>{l.d.src && <img src={l.d.src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}</div><span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 19, fontWeight: 600, color: T.ink, lineHeight: 1 }}>{l.d.code}</div><div style={{ fontSize: 11.5, color: T.ink3, marginTop: 3 }}>{l.d.cat} · {l.d.name}</div></span><span style={{ fontFamily: T.fontSerif, fontSize: 17, fontWeight: 600, color: T.ink }}>{money(l.cols.reduce((a, [, q]) => a + q, 0) * l.d.price)}</span></div>
      <div style={{ padding: '4px 0 0 54px' }}>{l.cols.map(([n, q]) => <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 8, height: 28, fontSize: 12.5, color: T.ink2 }}><span style={{ width: 4, height: 14, borderRadius: 2, background: XD.cols[n] }} />{n}<span style={{ flex: 1 }} /><span style={{ fontVariantNumeric: 'tabular-nums' }}>{q} × {money(l.d.price)}</span></div>)}</div>
    </div>)}
    <div style={{ borderTop: `1px solid ${T.line2}`, padding: '10px 14px', display: 'flex', alignItems: 'baseline', gap: 10 }}><span style={{ fontSize: 12, color: T.ink3 }}>{o.pcs} pcs · {o.designs} designs · GST extra</span><span style={{ flex: 1 }} /><span style={{ fontFamily: T.fontSerif, fontSize: 22, fontWeight: 600, color: T.ink }}>{money(o.bill)}</span></div>
  </div>;
}
function ScreenFSalesOrder({ T }) {
  const o = ORDERS_F[0];
  return frameF(T, <>
    <div style={{ display: 'flex', alignItems: 'center', padding: '0 12px', height: 44, gap: 6 }}><Hit T={T} icon="chevron-left" size={40} /><span style={{ fontFamily: T.fontMono, fontSize: 15, fontWeight: 600, color: T.ink }}>{o.no}</span><StatusPill T={T} s={o.status} /><span style={{ flex: 1 }} /><span style={{ fontSize: 12, color: T.ink3 }}>{o.date}</span></div>
    <div style={{ margin: '4px 14px 0' }}><CustomerBar T={T} c={o.c} /></div>
    <div style={{ margin: '10px 14px 0' }}><OrderLines T={T} o={o} lines={ORDER_LINES()} /></div>
  </>, <div style={{ position: 'absolute', left: 14, right: 14, bottom: 22, display: 'flex', alignItems: 'center', gap: 8, padding: 8, borderRadius: T.rDock, ...glass(T) }}>
    <Hit T={T} icon="printer" size={40} iconSize={18} style={{ background: T.chipBg }} /><Hit T={T} icon="share-2" size={40} iconSize={18} style={{ background: T.chipBg }} /><span style={{ flex: 1 }} /><T.Btn kind="secondary" small style={{ height: 40 }}>Edit</T.Btn><T.Btn icon="check" style={{ height: 40, padding: '0 16px', fontSize: 13.5 }}>Approve</T.Btn>
  </div>);
}
/* ── analytics ── */
const A = { days: [3, 5, 4, 7, 6, 9, 8, 11, 7, 10, 12, 9, 13, 11], disp: [2, 3, 4, 5, 6, 6, 8, 8, 9, 8, 10, 10, 11, 12], week: [5, 8, 7, 9, 11, 4, 2], pay: [40, 55, 48, 62, 70, 66, 78, 84, 80, 90, 96, 104], sale: [60, 72, 70, 85, 92, 88, 100, 110, 104, 118, 125, 130] };
function RangeBar({ T, level }) {
  return <>
    <div style={{ display: 'flex', gap: 2, padding: '2px 12px 0', overflow: 'hidden' }}>{[['orders', 'Orders'], ['sku', 'Designs (SKU)'], ['cust', 'Customers']].map(([k, t]) => { const on = k === level; return <span key={k} className="press" style={{ position: 'relative', padding: '8px 9px 10px', fontSize: 13, fontWeight: on ? 600 : 400, color: on ? T.ink : T.ink3, whiteSpace: 'nowrap' }}>{t}{on && <span style={{ position: 'absolute', left: 9, right: 9, bottom: 0, height: 2, background: T.accent, borderRadius: 1 }} />}</span>; })}</div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px 0', overflow: 'hidden' }}>{['7 d', '30 d', '90 d'].map(r => <T.Chip key={r} on={r === '30 d'} style={{ height: 28, fontSize: 12 }}>{r}</T.Chip>)}<span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 28, padding: '0 10px', borderRadius: 999, border: `1px dashed ${T.line2}`, fontSize: 12, color: T.ink, whiteSpace: 'nowrap' }}><Ic name="calendar" size={13} />01/08/26 – 05/09/26</span></div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px 0', overflow: 'hidden' }}><T.Chip icon="sliders-horizontal" outline style={{ height: 28, fontSize: 12 }}>Filters <b style={{ fontWeight: 600 }}>2</b></T.Chip><T.Chip x style={{ height: 28, fontSize: 12 }}>Delhi</T.Chip><T.Chip x style={{ height: 28, fontSize: 12 }}>Lehenga</T.Chip><span style={{ flex: 1 }} /><T.Chip icon="arrow-down-up" outline style={{ height: 28, fontSize: 12 }}>{level === 'sku' ? 'Pcs' : 'Bill'}</T.Chip></div>
  </>;
}
function ScreenFSOAnalytics({ T }) {
  return frameF(T, <>
    <SOHeader T={T} analytics /><RangeBar T={T} level="orders" />
    <div style={{ display: 'flex', gap: 8, padding: '12px 16px 0' }}><T.Kpi label="Orders" value="46" sub="+18% vs prior" tone="ok" small /><T.Kpi label="Pieces" value="312" sub="6.8 per order" small /><T.Kpi label="Billed" value="₹14.2L" sub="avg ₹30.9k" small /><T.Kpi label="To approve" value="2.1 d" sub="median" small /></div>
    <T.H right={<Legend T={T} items={[['orders', T.accent], ['dispatched', T.ok]]} />}>Orders vs dispatch</T.H>
    <T.Card style={{ padding: '10px 14px 8px' }}><LineG T={T} series={[{ pts: A.days, color: T.accent, width: 2.2 }, { pts: A.disp, color: T.ok, width: 2, dash: true }]} h={84} area /><div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 10, color: T.ink3 }}><span>01/08</span><span>15/08</span><span>05/09</span></div></T.Card>
    <T.H tone="gold" right={<span style={{ fontSize: 11, color: T.ink3 }}>this range</span>}>Pipeline</T.H>
    <T.Card alt style={{ padding: '10px 14px' }}>{[['Raised', 9, T.warn], ['Approved', 14, T.blue], ['Dispatched', 23, T.ok], ['Cancelled', 3, T.ink3]].map(([s, n, c]) => <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '5px 0', fontSize: 12.5 }}><span style={{ width: 78, color: T.ink2 }}>{s}</span><span style={{ flex: 1, height: 10, borderRadius: 5, background: T.chipBg }}><span style={{ display: 'block', width: Math.round(n / 23 * 100) + '%', height: 10, borderRadius: 5, background: c }} /></span><span style={{ width: 26, textAlign: 'right', fontWeight: 600, color: T.ink, fontVariantNumeric: 'tabular-nums' }}>{n}</span></div>)}</T.Card>
    <T.H right={<span style={{ fontSize: 11, color: T.ink3 }}>orders</span>}>By weekday</T.H>
    <T.Card style={{ padding: '10px 14px 6px' }}><BarsV T={T} data={A.week} h={64} color={A.week.map((v, i) => i === 4 ? T.accent : T.accentLine)} labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']} /></T.Card>
  </>, <T.Island active="Catalogue" />);
}
function ScreenFSKUAnalytics({ T }) {
  const rows = [['2798', 64, 11, [22, 18, 14, 10], [4, 6, 5, 8, 7, 9, 12]], ['6002', 41, 9, [26, 15], [2, 3, 5, 4, 6, 7, 8]], ['3661', 33, 7, [20, 13], [3, 4, 4, 5, 6, 5, 7]], ['1457', 29, 6, [9, 8, 7, 5], [5, 4, 4, 3, 4, 5, 4]], ['2006', 18, 4, [8, 6, 4], [1, 2, 2, 3, 3, 4, 3]]].map(([c, pcs, n, split, tr]) => ({ d: XD.byCode[c], pcs, n, split, tr }));
  return frameF(T, <>
    <SOHeader T={T} analytics /><RangeBar T={T} level="sku" />
    <div style={{ display: 'flex', gap: 8, padding: '12px 16px 0', alignItems: 'stretch' }}>
      <T.Kpi label="Designs ordered" value="38" sub="of 612 · 6%" small /><T.Kpi label="Top design" value="2798" sub="64 pcs · 11 orders" small />
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 16, background: T.surface2, border: `1px solid ${T.line}` }}><Donut T={T} parts={[{ v: 46, color: XD.cols.Lilac }, { v: 28, color: XD.cols.Sky }, { v: 16, color: XD.cols.Peach }, { v: 10, color: XD.cols.Firozi }]} size={52} thick={7} /><span><div style={{ fontSize: 10.5, color: T.ink3 }}>By category</div><div style={{ fontSize: 11, color: T.ink, marginTop: 2, lineHeight: 1.3 }}>Lehenga 46%<br />Saree 28%</div></span></div>
    </div>
    <T.H right={<span style={{ fontSize: 11, color: T.ink3 }}>pcs · orders · colours · trend</span>}>Designs</T.H>
    <T.Card style={{ padding: '4px 14px' }}>{rows.map((r, i) => <div key={r.d.code} className="press" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderTop: i ? `1px solid ${T.line}` : 0 }}>
      <div style={{ width: 40, height: 50, borderRadius: 8, overflow: 'hidden', background: T.photoBg, flex: 'none' }}>{r.d.src ? <img src={r.d.src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /> : <span style={{ display: 'grid', placeItems: 'center', height: '100%', fontFamily: T.fontMono, fontSize: 9, color: T.ink3 }}>{r.d.code}</span>}</div>
      <span style={{ flex: 1, minWidth: 0 }}><div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 18, fontWeight: 600, color: T.ink }}>{r.d.code}</span><span style={{ fontSize: 11, color: T.ink3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.d.cat} · {r.d.name}</span></div><div style={{ display: 'flex', height: 6, borderRadius: 3, overflow: 'hidden', marginTop: 6, background: T.chipBg }}>{r.split.map((s, k) => <span key={k} style={{ width: Math.round(s / r.pcs * 100) + '%', background: XD.cols[r.d.colours[k]] }} />)}</div></span>
      <span style={{ width: 56, flex: 'none' }}><Line series={[{ pts: r.tr, color: T.accent, width: 1.5 }]} w={56} h={22} /></span>
      <span style={{ textAlign: 'right', flex: 'none', width: 48 }}><div style={{ fontFamily: T.fontSerif, fontSize: 19, fontWeight: 600, color: T.ink, lineHeight: 1 }}>{r.pcs}</div><div style={{ fontSize: 10.5, color: T.ink3, marginTop: 3 }}>{r.n} orders</div></span>
    </div>)}</T.Card>
  </>, <T.Island active="Catalogue" />);
}
function ScreenFCustAnalytics({ T }) {
  const top = [[XD.customers[5], 214000, 14, 0], [XD.customers[0], 168000, 11, 12000], [XD.customers[3], 121000, 8, 0], [XD.customers[2], 96000, 6, 31000], [XD.customers[1], 74000, 5, 0]];
  return frameF(T, <>
    <SOHeader T={T} analytics /><RangeBar T={T} level="cust" />
    <div style={{ display: 'flex', gap: 8, padding: '12px 16px 0' }}><T.Kpi label="Active" value="38" sub="6 new" small /><T.Kpi label="Repeat" value="71%" sub="ordered twice+" small /><T.Kpi label="Avg bill" value="₹30.9k" sub="+4% vs prior" tone="ok" small /><T.Kpi label="Overdue" value="₹1.8L" sub="4 customers" tone="danger" small /></div>
    <T.H right={<Legend T={T} items={[['sale', T.accent], ['payments', T.ok]]} />}>Sale vs payments · ₹k</T.H>
    <T.Card style={{ padding: '10px 14px 8px' }}><LineG T={T} series={[{ pts: A.sale, color: T.accent, width: 2.2 }, { pts: A.pay, color: T.ok, width: 2, dash: true }]} h={76} area /></T.Card>
    <div style={{ display: 'flex', gap: 8, padding: '8px 16px 0' }}>
      <div style={{ flex: 1, padding: '10px 12px', borderRadius: 16, background: T.surface2, border: `1px solid ${T.line}`, display: 'flex', alignItems: 'center', gap: 10 }}><Donut T={T} parts={[{ v: 52, color: T.accent }, { v: 30, color: T.gold }, { v: 18, color: T.ink3 }]} size={64} thick={9} center="38" /><Legend T={T} items={[['Platinum', T.accent, '52%'], ['Gold', T.gold, '30%'], ['Silver', T.ink3, '18%']]} /></div>
      <div style={{ flex: 1, padding: '10px 12px', borderRadius: 16, background: T.surface2, border: `1px solid ${T.line}` }}><div style={{ fontSize: 10.5, color: T.ink3 }}>Orders by city</div><BarsV T={T} data={[14, 9, 8, 6, 5]} h={44} color={T.accentLine} labels={['Delhi', 'Surat', 'Ldh', 'Chn', 'Amb']} /></div>
    </div>
    <T.H tone="gold" right={<span style={{ fontSize: 11, color: T.ink3 }}>bill · orders · overdue</span>}>Customers</T.H>
    <T.Card style={{ padding: '2px 14px' }}>{top.map(([c, v, n, od], i) => <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderTop: i ? `1px solid ${T.line}` : 0 }}><span style={{ width: 28, height: 28, borderRadius: 14, background: T.accentSoft, color: T.accent, display: 'grid', placeItems: 'center', fontFamily: T.fontDisplay, fontSize: 12, fontWeight: 600, flex: 'none' }}>{c.name[0]}</span><span style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 13, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</div><div style={{ fontSize: 10.5, color: T.ink3 }}>{c.tier} · {c.city} · score {c.score}</div></span><span style={{ textAlign: 'right', fontSize: 12.5, color: T.ink, fontVariantNumeric: 'tabular-nums' }}>{money(v)}<div style={{ fontSize: 10.5, color: od ? T.danger : T.ink3 }}>{od ? 'overdue ' + money(od) : n + ' orders'}</div></span></div>)}</T.Card>
  </>, <T.Island active="Catalogue" />);
}
Object.assign(window, { FINAL, FINALD, PriceF, veil, Orb, AgentMark, CartIcon, CamSearch, StatusPill, LineG, BarsV, Donut, Legend, Stack, FGridBody, SalesHead, SalesTabs, STOCK, CartGroups, groupsOf, FilterGroups, SOHeader, SOTable, GroupIsland, CustomerBar, OrderLines, ORDER_LINES, RangeBar, A, ORDERS_F, SO_TABS, SO_COLS, money, lakh, agencyOf, LISTS, NAVF,
  ScreenFGrid, ScreenFGridNoCart, ScreenFList, ScreenFVoice, ScreenFProduct, ScreenFSales1, ScreenFSales2, ScreenFSales3, ScreenFScan, ScreenFCarts, ScreenFFilters, ScreenFSalesOrders, ScreenFSalesTable, ScreenFSalesGrouped, ScreenFSalesOrder, ScreenFSOAnalytics, ScreenFSKUAnalytics, ScreenFCustAnalytics });
