/* NEW DRAFTS · Dispatch · design drafts (13 Oct 2026). The owner's direction of 10 Oct drawn after review 2
   (plans/review-2-dispatch.md §5): Ready as a box board with sections, Packing with 3–4 customers on the floor and
   parcel boxes drawn as photo slots, the right panel as the selected parcel's invoice with its documents.
   This file: draft data, the box atoms and the phone screen. Web screens and the registration: mod-dispatch-dd-web.jsx.
   Look: fine corners (8 px boxes, 6 px photos and buttons), 1 px line2 borders, a surface2 head band, ink on sand,
   ONE maroon line per screen (the selected or active box), danger only for overdue, warn only for due ≤ 2 d.
   Every identifier is prefixed Dd. Reuses from base: frameF, Ic, Hit, ScanCam, veil, money, Journey, WebShell3. */

/* ── draft data: designs with real photos, so every box shows pictures ── */
const DD_D = {
  '8111': { name: 'Red bridal lehenga', price: 8995, hsn: '6204', src: 'assets/crm/8111.jpg', pos: '50% 22%' },
  '8190': { name: 'Peach gown', price: 9495, hsn: '6204', src: 'assets/crm/8190.jpg', pos: '50% 22%' },
  '8321': { name: 'Ivory bridal lehenga', price: 11495, hsn: '6204', src: 'assets/crm/8321.jpg', pos: '50% 22%' },
  '8337': { name: 'Rose lehenga', price: 10495, hsn: '6204', src: 'assets/crm/8337.jpg', pos: '50% 22%' },
  '8433': { name: 'Wine lehenga', price: 10995, hsn: '6204', src: 'assets/crm/8433.jpg', pos: '50% 22%' },
  '8477': { name: 'Sharara set', price: 5495, hsn: '6204', src: 'assets/crm/8477.jpg', pos: '50% 22%' },
  '2798': { name: 'Plazo set', price: 4995, hsn: '6204', src: XD.byCode['2798'].src, pos: '50% 20%' },
  '6002': { name: 'Lilac Court', price: 4995, hsn: '6204', src: XD.byCode['6002'].src, pos: '50% 20%' },
  '2006': { name: 'Lavender pallu', price: 4995, hsn: '5407', src: XD.byCode['2006'].src, pos: '50% 20%' },
  'D9121': { name: 'Lotus blouse', price: 2195, hsn: '6206', src: 'assets/studio/cut-03.jpg', pos: '50% 40%' },
  'D9124': { name: 'Halter blouse', price: 1895, hsn: '6206', src: 'assets/studio/cut-04.jpg', pos: '50% 40%' },
  'D9128': { name: 'Sweetheart blouse', price: 2395, hsn: '6206', src: 'assets/studio/cut-06.jpg', pos: '50% 40%' },
  'D9130': { name: 'Off-shoulder blouse', price: 1995, hsn: '6206', src: 'assets/studio/cut-08.jpg', pos: '50% 40%' },
  'D9133': { name: 'Keyhole blouse', price: 2295, hsn: '6206', src: 'assets/studio/cut-07.jpg', pos: '50% 40%' },
};
const ddD = code => DD_D[code] || { name: 'Design', price: 0, hsn: '—' };
const ddDue = d => d < 0 ? `${-d} d over` : d === 0 ? 'due today' : `${d} d left`;
const ddDueTone = (T, d) => d < 0 ? T.danger : d <= 2 ? T.warn : T.ink2;
const ddInitials = n => n.split(' ').slice(0, 2).map(w => w[0]).join('');

/* Ready board: one box per customer. lines = [design, pcs owed, in stock (default all)] */
const DD_WORKED = [
  { name: 'Nalli Fashion Mart', city: 'Chennai', tier: 'Platinum', p: 2, due: -24, times: 2, sent: 9, of: 17, last: 'last sent 11 d ago',
    orders: [{ no: 'SO-3391', date: '29/07/26', owed: 8, lines: [['8111', 2], ['8433', 3], ['6002', 2, 0], ['D9121', 1]] }], more: 'SO-3392 · 7 owed', owed: 15, pack: 11, value: 77940 },
  { name: 'Rangoli Ethnic Wear', city: 'Lucknow', tier: 'Platinum', p: 3, due: 2, times: 1, sent: 3, of: 6, last: 'last sent 7 d ago',
    orders: [{ no: 'SO-3398', date: '08/08/26', owed: 3, lines: [['6002', 3]] }], owed: 3, pack: 3, value: 14985 },
  { name: 'A V Creation', city: 'Ambala', tier: 'Platinum', p: 4, due: 12, times: 1, sent: 4, of: 9, last: 'last sent 11 d ago',
    orders: [{ no: 'SO-3402', date: '01/09/26', owed: 5, lines: [['8477', 2], ['D9124', 3]] }], owed: 5, pack: 5, value: 16675 },
];
const DD_NEW = [
  { name: 'Ambika Enterprises', city: 'Delhi', tier: 'Gold', p: 2, due: 18, last: 'approved 09/10 · 4 d ago',
    orders: [{ no: 'SO-3462', date: '08/10/26', owed: 11, lines: [['2798', 3], ['8190', 2], ['D9128', 4], ['2006', 2]] }], owed: 11, pack: 11, value: 62940 },
  { name: 'Aneri Boutique', city: 'Anand', tier: 'Silver', p: 3, due: 19, last: 'approved 10/10 · 3 d ago',
    orders: [{ no: 'SO-3470', date: '09/10/26', owed: 6, lines: [['8321', 1], ['D9130', 3], ['8337', 2, 0]] }], owed: 6, pack: 4, value: 38470 },
  { name: 'Kalpana Boutique', city: 'Indore', tier: 'Gold', p: 3, due: 20, last: 'approved 11/10 · 2 d ago',
    orders: [{ no: 'SO-3474', date: '10/10/26', owed: 7, lines: [['8477', 3], ['D9133', 4]] }], owed: 7, pack: 7, value: 25665 },
];
const DD_PACKING = [
  { name: 'Preeti Fashion Hub', city: 'Ludhiana', boxes: '2 boxes open', done: 17, of: 26, photos: ['8477', 'D9121', '8111', 'D9124', '2798', '8321'] },
  { name: 'Rajwadi Ethnic Emporium', city: 'Jaipur', boxes: '1 box open', done: 6, of: 19, photos: ['8433', '8190', 'D9130'] },
  { name: 'Meenakshi Silk House', city: 'Madurai', boxes: '1 box open', done: 3, of: 8, photos: ['2006', 'D9128'] },
];

/* Packing: Preeti's active box, ten pieces from two orders (lehenga and sets at 18 %, blouses at 5 %) */
const DD_BOX = ['8477', '8477', 'D9121', 'D9121', 'D9121', '8111', 'D9124', 'D9124', '2798', '8321'];
const DD_BOX_LINES = [['8477', 2, 'SO-3472'], ['D9121', 3, 'SO-3472'], ['8111', 1, 'SO-3480'], ['D9124', 2, 'SO-3480'], ['2798', 1, 'SO-3480'], ['8321', 1, 'SO-3480']];
const ddRate = code => ddD(code).price <= 2500 ? 5 : 18;   // garments: 5 % up to ₹2,500 a piece, 18 % above (from 22 Sep 2025)
const ddInvoice = (lines = DD_BOX_LINES) => {
  const rows = lines.map(([code, q, so]) => ({ code, q, so, d: ddD(code), amt: q * ddD(code).price, rate: ddRate(code) }));
  const slab = r => rows.filter(x => x.rate === r).reduce((s, x) => s + x.amt, 0);
  const b18 = slab(18), b5 = slab(5), t18 = b18 * .18, t5 = b5 * .05, raw = b18 + b5 + t18 + t5, grand = Math.round(raw);
  return { rows, b18, b5, t18, t5, taxable: b18 + b5, round: grand - raw, grand, pcs: rows.reduce((s, x) => s + x.q, 0) };
};
const ddRs = (n, dec) => '₹' + n.toLocaleString('en-IN', dec ? { minimumFractionDigits: 2, maximumFractionDigits: 2 } : { maximumFractionDigits: 0 });

/* ── atoms ── */
/* Photo: 6 px corners, real crop, optional qty on a veil and an out-of-stock dim */
const DdPhoto = ({ T, code, w = 44, h = 55, r = 6, qty, out, style }) => { const d = ddD(code); return <span style={{ position: 'relative', width: w, height: h, borderRadius: r, overflow: 'hidden', background: T.photoBg, flex: 'none', display: 'block', ...style }}>
  {d.src && <img src={d.src} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: d.pos || '50% 30%', display: 'block', opacity: out ? .45 : 1, filter: out ? 'grayscale(.6)' : 'none' }} />}
  {qty != null && <span style={{ position: 'absolute', right: 3, bottom: 3, height: 16, padding: '0 5px', borderRadius: 4, ...veil(), fontFamily: T.fontUI, fontSize: 10, fontWeight: 600, display: 'inline-flex', alignItems: 'center', fontVariantNumeric: 'tabular-nums' }}>×{qty}</span>}
  {out && <span title="0 in stock" style={{ position: 'absolute', left: 3, top: 3, height: 16, padding: '0 5px', borderRadius: 4, background: T.surface, color: T.ink, fontFamily: T.fontUI, fontSize: 9.5, fontWeight: 600, display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap' }}>{w >= 56 ? '0 in stock' : '0 left'}</span>}
</span>; };
/* Status tag: outline, 4 px, small caps. fill = the one solid tag on a box */
const DdTag = ({ T, children, tone, fill, style }) => { const c = tone === 'danger' ? T.danger : tone === 'warn' ? T.warn : tone === 'muted' ? T.ink3 : T.ink; return <span style={{ display: 'inline-flex', alignItems: 'center', height: 20, padding: '0 6px', borderRadius: 4, border: `1px solid ${fill ? c : tone === 'muted' ? T.line2 : c}`, background: fill ? c : 'transparent', color: fill ? T.bg : c, fontFamily: T.fontUI, fontSize: 9.5, fontWeight: 600, letterSpacing: '.07em', textTransform: 'uppercase', whiteSpace: 'nowrap', flex: 'none', lineHeight: 1, ...style }}>{children}</span>; };
/* Buttons with fine corners. kind: line (ink outline) · ink (filled ink) · accent (the screen's one maroon fill) · dash */
const DdBtn = ({ T, kind = 'line', icon, children, h = 32, style }) => { const ink = kind === 'ink', acc = kind === 'accent'; return <span className="press" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, height: h, padding: children ? '0 12px' : 0, width: children ? undefined : h, borderRadius: 6, border: kind === 'dash' ? `1px dashed ${T.line2}` : `1px solid ${acc ? T.accent : ink ? T.ink : T.line2}`, background: acc ? T.accent : ink ? T.ink : 'transparent', color: acc ? T.onAccent : ink ? T.bg : T.ink, fontFamily: T.fontUI, fontSize: h >= 44 ? 14 : 12.5, fontWeight: 500, whiteSpace: 'nowrap', flex: 'none', ...style }}>{icon && <Ic name={icon} size={h >= 44 ? 17 : 14} />}{children}</span>; };
const DdMono = ({ T, name, s = 28 }) => <span style={{ width: s, height: s, borderRadius: 6, background: T.ink, color: T.bg, display: 'grid', placeItems: 'center', fontFamily: T.fontDisplay, fontSize: s * .46, fontWeight: 600, flex: 'none' }}>{ddInitials(name)}</span>;
const DdMeta = ({ T, children, style }) => <span style={{ fontFamily: T.fontUI, fontSize: 11, color: T.ink3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', ...style }}>{children}</span>;
const DdNum = ({ T, children, size = 16, color, style }) => <span style={{ fontFamily: T.fontDisplay, fontSize: size, fontWeight: 600, color: color || T.ink, fontVariantNumeric: 'tabular-nums', lineHeight: 1, ...style }}>{children}</span>;

/* Parcel slot: a filled slot is the piece's photo with its design no; an empty slot is a dashed outline */
const DdSlot = ({ T, code, w, h, n, fresh, mini }) => code
  ? <span style={{ position: 'relative', width: w, height: h, flex: 'none', display: 'block' }}>
      <DdPhoto T={T} code={code} w={w} h={h} r={mini ? 3 : 5} />
      {!mini && <span style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: Math.max(13, h * .22), borderRadius: '0 0 5px 5px', ...veil(), fontFamily: T.fontDisplay, fontSize: Math.max(10, w * .2), fontWeight: 600, display: 'grid', placeItems: 'center', letterSpacing: '.01em' }}>{code}</span>}
      {fresh && <span style={{ position: 'absolute', inset: -3, borderRadius: 8, border: `2px solid ${T.ink}`, boxShadow: `0 0 0 3px ${T.bg}` }} />}
      {fresh && <span style={{ position: 'absolute', right: -6, top: -6, width: 18, height: 18, borderRadius: 9, background: T.ink, color: T.bg, display: 'grid', placeItems: 'center' }}><Ic name="check" size={11} sw={3} /></span>}
    </span>
  : <span style={{ width: w, height: h, flex: 'none', borderRadius: mini ? 3 : 5, border: `1px dashed ${T.line2}`, display: 'grid', placeItems: 'center', fontFamily: T.fontUI, fontSize: mini ? 0 : 10, color: T.ink3, boxSizing: 'border-box' }}>{mini ? null : n}</span>;
const DdSlots = ({ T, pieces, cap = 12, w, h, gap = 4, fresh, mini }) => <div style={{ display: 'grid', gridTemplateColumns: `repeat(4, ${w}px)`, gap }}>{Array.from({ length: cap }, (_, i) => <DdSlot key={i} T={T} code={pieces[i]} w={w} h={h} n={i + 1} fresh={fresh && i === pieces.length - 1} mini={mini} />)}</div>;

/* ── phone · packer: scan drops the piece into the box ── */
function ScreenDdScan({ T }) {
  const pcs = DD_BOX; const slotW = 64, slotH = 80;
  return frameF(T, <>
    <div style={{ marginTop: -54, paddingTop: 54, background: T.header, borderBottom: `1px solid ${T.line}`, flex: 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, height: 50, padding: '0 10px 0 4px' }}>
        <Hit T={T} icon="chevron-left" size={40} />
        <DdMono T={T} name="Preeti Fashion Hub" s={30} />
        <span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 19, fontWeight: 600, color: T.ink, lineHeight: 1.1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Preeti Fashion Hub</div><DdMeta T={T} style={{ display: 'block' }}>Ludhiana · SO-3472 · SO-3480 · no rates on this phone</DdMeta></span>
        <LiveChip T={T} />
      </div>
    </div>
    <ScanCam T={T} h={132}>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 8, textAlign: 'center', fontFamily: T.fontUI, fontSize: 11.5, color: 'rgba(255,255,255,.85)' }}>Scan a piece, or a box label to switch box</div>
    </ScanCam>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px', borderBottom: `1px solid ${T.line}`, background: T.surface }}>
      <span style={{ width: 22, height: 22, borderRadius: 11, background: T.ink, color: T.bg, display: 'grid', placeItems: 'center', flex: 'none' }}><Ic name="check" size={13} sw={2.6} /></span>
      <span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontUI, fontSize: 13, fontWeight: 600, color: T.ink }}>8321 · Ivory bridal lehenga → slot 10</div><DdMeta T={T} style={{ display: 'block' }}>serial PC-8321-0044 · SO-3480 · 1 of 1</DdMeta></span>
    </div>
    <div style={{ padding: '12px 14px 0' }}>
      <div style={{ borderRadius: 8, border: `2px solid ${T.accent}`, background: T.surface, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 44, padding: '0 12px', background: T.surface2, borderBottom: `1px solid ${T.line}` }}>
          <Ic name="package-open" size={17} color={T.ink2} /><DdNum T={T} size={21}>P00081</DdNum><DdTag T={T} fill>Packing into</DdTag><span style={{ flex: 1 }} />
          <DdNum T={T} size={26}>{pcs.length}</DdNum><span style={{ fontFamily: T.fontUI, fontSize: 13, color: T.ink3 }}>/ 12</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0' }}><DdSlots T={T} pieces={pcs} w={slotW} h={slotH} gap={6} fresh /></div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
        <DdBtn T={T} kind="ink" h={36} style={{ gap: 6 }}><Ic name="package-open" size={14} />P00081 · 10/12</DdBtn>
        <DdBtn T={T} h={36}>P00082 · 3/12</DdBtn>
        <DdBtn T={T} kind="dash" icon="plus" h={36}>Box</DdBtn>
        <span style={{ flex: 1 }} />
      </div>
      <div className="press" style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, padding: '5px 8px 5px 10px', borderRadius: 8, border: `1px solid ${T.line2}`, background: T.surface }}>
        <span style={{ flex: 'none', fontFamily: T.fontUI, fontSize: 12.5, fontWeight: 600, color: T.ink }}>To bring · 9 pcs</span>
        <span style={{ flex: 1 }} />
        {[['8433', 1], ['8321', 2], ['D9124', 1], ['2798', 2]].map(([c, q]) => <DdPhoto key={c} T={T} code={c} w={28} h={35} r={4} qty={q} />)}
        <Ic name="chevron-right" size={16} color={T.ink3} />
      </div>
    </div>
    <div style={{ position: 'absolute', left: 14, right: 14, bottom: 22, display: 'flex', gap: 8 }}>
      <DdBtn T={T} icon="keyboard" h={48} style={{ flex: 1, background: T.surface }}>Type serial</DdBtn>
      <DdBtn T={T} kind="ink" icon="package-check" h={48} style={{ flex: 1.4 }}>Close box</DdBtn>
    </div>
  </>);
}

Object.assign(window, { DD_D, ddD, ddDue, ddDueTone, ddInitials, DD_WORKED, DD_NEW, DD_PACKING, DD_BOX, DD_BOX_LINES, ddRate, ddInvoice, ddRs, DdPhoto, DdTag, DdBtn, DdMono, DdMeta, DdNum, DdSlot, DdSlots, ScreenDdScan });
