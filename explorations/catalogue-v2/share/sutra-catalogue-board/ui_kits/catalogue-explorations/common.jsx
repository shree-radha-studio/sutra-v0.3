/* Shared helpers for the catalogue explorations (independent of the DS bundle on purpose). */
const D = window.SUTRA_DATA;
function Ic({ name, size = 18, sw = 1.6, style, color }) {
  const key = String(name).split('-').map(s => s[0].toUpperCase() + s.slice(1)).join('');
  let node = window.lucide && window.lucide.icons[key]; if (node && typeof node[0] === 'string') node = node[2];
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none', ...style }}>{node ? node.map((n, i) => React.createElement(n[0], { ...n[1], key: i })) : <circle cx="12" cy="12" r="9" />}</svg>;
}
/** Catalogue price: leading digit +5%, ₹ small and quiet. */
function Price({ v, size = 18, font, color, weight = 500, lead = true, dim, style }) {
  if (v == null) return <span style={{ fontFamily: font, fontSize: size, color: dim, fontWeight: weight, ...style }}>TBD</span>;
  const s = v.toLocaleString('en-IN'); const m = s.match(/^(\d)(.*)$/);
  return <span style={{ display: 'inline-flex', alignItems: 'baseline', fontFamily: font, fontSize: size, lineHeight: 1, color, fontWeight: weight, whiteSpace: 'nowrap', ...style }}><span style={{ fontSize: Math.round(size * .72), marginRight: Math.max(1, size * .06), color: dim }}>₹</span>{lead ? <><span style={{ fontSize: Math.round(size * 1.05) }}>{m[1]}</span>{m[2]}</> : s}</span>;
}
/** Small multi-series line chart. series: [{pts:number[], color, width}] */
function Line({ series, w = 300, h = 80, grid, pad = 4 }) {
  const all = series.flatMap(s => s.pts), max = Math.max(...all), min = Math.min(...all) * .9;
  const X = (i, n) => pad + i * (w - pad * 2) / (n - 1), Y = v => h - pad - (v - min) / (max - min || 1) * (h - pad * 2);
  return <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ display: 'block', overflow: 'visible' }}>
    {grid && [0.25, 0.5, 0.75].map(g => <line key={g} x1={pad} x2={w - pad} y1={h * g} y2={h * g} stroke={grid} strokeDasharray="2 4" />)}
    {series.map((s, k) => <polyline key={k} points={s.pts.map((v, i) => X(i, s.pts.length) + ',' + Y(v)).join(' ')} fill="none" stroke={s.color} strokeWidth={s.width || 1.5} strokeLinejoin="round" strokeLinecap="round" opacity={s.opacity == null ? 1 : s.opacity} />)}
    {series[0] && (() => { const s = series[0], i = s.pts.length - 1; return <circle cx={X(i, s.pts.length)} cy={Y(s.pts[i])} r="3" fill={s.color} />; })()}
  </svg>;
}
/** Process timeline: done green · active blue · not started grey. */
function Timeline({ steps, done, active, T }) {
  return <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>{steps.map((s, i) => { const st = i < done ? 'done' : i === active ? 'active' : 'todo'; const c = st === 'done' ? T.ok : st === 'active' ? T.blue : T.line; return <div key={s} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}><div style={{ height: 4, width: '100%', borderRadius: 2, background: c, boxShadow: st === 'active' ? `0 0 0 3px ${T.blue}33` : 'none' }} /><span style={{ fontFamily: T.fontUI, fontSize: 10, letterSpacing: '.04em', color: st === 'todo' ? T.ink3 : T.ink2, textTransform: 'uppercase' }}>{s}</span></div>; })}</div>;
}
const SERIES = { demand: [42, 48, 45, 56, 61, 58, 66, 72, 70, 78], month: { all: [8, 12, 9, 15, 14, 18, 22, 19, 25, 24, 30, 28], Sky: [4, 6, 5, 8, 7, 9, 12, 10, 13, 12, 15, 14], Purple: [2, 3, 2, 3, 3, 4, 5, 4, 6, 6, 7, 6], Seagreen: [1, 2, 1, 2, 2, 3, 3, 3, 4, 4, 5, 5], Peach: [1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3] }, life: [5, 18, 40, 62, 90, 120, 160, 210, 250, 300, 340, 360] };
const RECIPE = [['Mono net', '2.4 m', '250 m', true], ['Santoon', '5 m', '50 m', true], ['BKS 41 beads kali', '1 pc', '0 pc', false], ['Cancan', '1.5 m', '0 m', false]];
const MEDIA = [['Primary · per colour', '4/4', true], ['Side profiles', '2/4', false], ['AI shoot', '—', false], ['Model photoshoot', '1', true], ['Video', '—', false]];
const ORDERS = [['SO-3455', 'Ramleela Fashion', '10/09', 'Approved', 5], ['SO-3433', 'Nalli Fashion Mart', '02/09', 'Dispatched', 9], ['SO-3401', 'A V Creation', '28/08', 'Pending', 4]];
const CARTS = [{ k: 'A', name: 'Ramleela Fashion', city: 'Surat', n: 4, book: 'In-cabin' }, { k: 'B', name: 'RL Fashion', city: 'Meerut', n: 2, book: 'WhatsApp' }, { k: 'C', name: 'Nalli Fashion Mart', city: 'Chennai', n: 0, book: 'In-cabin' }];
const CART_LINES = [['2798', 'Sky', 2], ['2798', 'Purple', 1], ['6002', 'Lilac', 1]];
const NAV = [['house', 'Home'], ['layout-grid', 'Catalogue'], ['shopping-bag', 'Carts'], ['users', 'CRM'], ['warehouse', 'Godown'], ['message-circle', 'Chat']];
Object.assign(window, { Ic, Price, Line, Timeline, SERIES, RECIPE, MEDIA, ORDERS, CARTS, CART_LINES, NAV, XD: D });
