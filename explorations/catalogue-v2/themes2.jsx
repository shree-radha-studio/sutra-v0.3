/* Catalogue explorations v2 — theme layer.
   1a′ / 1b′  Gallery / Atelier with the audit fixes.
   3a Editorial · 3b Studio: two ground-up directions, both mature: neutral palettes, one accent, rounded everywhere,
   glass for anything that floats. Each theme exposes: colours · fonts · radii · Btn · Chip · Tag · Step · Bars ·
   TopBar · Cats · GridCard · Dock, and optionally Header (grid top composition), Hero (product page photo). */

const NAV4 = [['house', 'Home'], ['layout-grid', 'Catalogue'], ['shopping-bag', 'Carts'], ['users', 'CRM']];
const NAV5 = [...NAV4, ['message-circle', 'Chat']];
const REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Material: one translucent layer, bright top edge (light catching the surface). */
const glass = (T, o) => ({ background: T.glass, backdropFilter: 'blur(22px) saturate(1.35)', WebkitBackdropFilter: 'blur(22px) saturate(1.35)', border: `1px solid ${T.glassEdge}`, boxShadow: `inset 0 1px 0 ${T.glassHi}, ${T.shadow}`, ...o });
/* Glass over a photo, regardless of theme: dark smoke with a hairline, white type. */
const smoke = o => ({ background: 'rgba(20,18,17,.42)', backdropFilter: 'blur(18px) saturate(1.2)', WebkitBackdropFilter: 'blur(18px) saturate(1.2)', border: '1px solid rgba(255,255,255,.18)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.22)', color: '#fff', ...o });
/* Size-specific tracking: large display tightens, small caps loosen, body stays at zero. */
const track = px => px >= 28 ? '-.02em' : px >= 20 ? '-.01em' : px <= 11 ? '.08em' : '0';

/* 44px hit target. `ring` = armed state, `count` = bubble. */
function Hit({ T, icon, ring, count, style, size = 44, iconSize = 20, children }) {
  return <span className="press" style={{ width: size, height: size, borderRadius: '50%', display: 'grid', placeItems: 'center', color: T.ink, position: 'relative', flex: 'none', boxShadow: ring ? `0 0 0 1.5px ${ring}` : 'none', ...style }}>
    {icon && <Ic name={icon} size={iconSize} />}{children}
    {count != null && <span style={{ position: 'absolute', top: 2, right: 2, minWidth: 16, height: 16, padding: '0 4px', borderRadius: 8, background: T.gold, color: '#fff', fontFamily: T.fontUI, fontSize: 9.5, fontWeight: 600, display: 'grid', placeItems: 'center' }}>{count}</span>}
  </span>;
}
/* Card stepper: the active cart's qty for this design, editable from the grid. 0 → a single "+". */
function CardQty({ T, qty, onPhoto }) {
  const base = onPhoto ? smoke({ boxShadow: 'none' }) : { background: T.surface, border: `1px solid ${T.line2}`, color: T.ink };
  if (!qty) return <span className="press" style={{ width: 40, height: 40, borderRadius: 20, display: 'grid', placeItems: 'center', ...base }}><Ic name="plus" size={18} sw={1.9} /></span>;
  return <span style={{ display: 'inline-flex', alignItems: 'center', height: 36, borderRadius: 18, padding: '0 2px', ...base }}>
    <span className="press" style={{ width: 32, height: 32, display: 'grid', placeItems: 'center', borderRadius: 16 }}><Ic name="minus" size={14} sw={2} /></span>
    <span style={{ minWidth: 18, textAlign: 'center', fontFamily: T.fontUI, fontSize: 14, fontWeight: 600 }}>{qty}</span>
    <span className="press" style={{ width: 32, height: 32, display: 'grid', placeItems: 'center', borderRadius: 16, background: onPhoto ? 'rgba(255,255,255,.92)' : T.ink, color: onPhoto ? '#1E1D1B' : T.bg }}><Ic name="plus" size={14} sw={2.2} /></span>
  </span>;
}
/* Cart chips strip: active cart filled, others quiet, "+" starts a new cart. Double tap opens the cart card. */
function CartChips({ T, cart = 'A', style }) {
  return <div style={{ display: 'flex', gap: 6, alignItems: 'center', overflow: 'hidden', ...style }}>
    {CARTS.map(c => { const on = c.k === cart; return <span key={c.k} className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 34, padding: on ? '0 12px 0 4px' : '0 10px 0 4px', borderRadius: 999, background: on ? T.accent : T.chipBg, color: on ? T.onAccent : T.ink, fontFamily: T.fontUI, fontSize: 12.5, fontWeight: 500, flex: 'none', whiteSpace: 'nowrap' }}>
      <span style={{ width: 26, height: 26, borderRadius: 13, background: on ? 'rgba(255,255,255,.2)' : T.bg2, display: 'grid', placeItems: 'center', fontFamily: T.fontDisplay, fontSize: 13, fontWeight: 600 }}>{c.k}</span>
      {on ? c.name : c.name.split(' ')[0]}<b style={{ fontWeight: 500, opacity: .7 }}>{c.n}</b>
    </span>; })}
    <span className="press" style={{ width: 34, height: 34, borderRadius: 17, border: `1px dashed ${T.line2}`, display: 'grid', placeItems: 'center', flex: 'none', color: T.ink2 }}><Ic name="plus" size={15} /></span>
  </div>;
}
/* Dock A: cart chips + labelled tabs in one glass capsule (1a′, 1b′, 3a). */
function Dock({ T, active = 'Catalogue', cart = 'A' }) {
  return <div style={{ position: 'absolute', left: 14, right: 14, bottom: 22, borderRadius: T.rDock, overflow: 'hidden', ...glass(T) }}>
    <CartChips T={T} cart={cart} style={{ padding: '8px 10px 0' }} />
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '6px 4px 8px' }}>
      {NAV5.map(([i, l]) => { const on = l === active; return <span key={l} className="press" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, width: 62, height: 50, borderRadius: T.rCtl, background: on ? T.accentSoft : 'transparent', color: on ? T.accent : T.ink2 }}><Ic name={i} size={21} sw={on ? 1.9 : 1.6} /><span style={{ fontFamily: T.fontUI, fontSize: 10, letterSpacing: '.02em', fontWeight: on ? 600 : 400 }}>{l}</span></span>; })}
    </div>
  </div>;
}
/* Dock B: island with a raised scan button in the centre; cart chips float above as their own strip (3b). */
function Island({ T, active = 'Catalogue', cart = 'A', scanOn }) {
  const tab = ([i, l]) => { const on = l === active; return <span key={l} className="press" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, width: 60, height: 52, color: on ? T.accent : T.ink2 }}><Ic name={i} size={21} sw={on ? 1.9 : 1.6} /><span style={{ fontFamily: T.fontUI, fontSize: 10, fontWeight: on ? 600 : 400 }}>{l}</span></span>; };
  return <div style={{ position: 'absolute', left: 14, right: 14, bottom: 22 }}>
    <CartChips T={T} cart={cart} style={{ padding: '0 6px 22px' }} />
    <div style={{ position: 'relative', height: 66, borderRadius: T.rDock, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px', ...glass(T) }}>
      {NAV4.slice(0, 2).map(tab)}
      <span style={{ width: 60 }} />
      {NAV4.slice(2).map(tab)}
      <span className="press" style={{ position: 'absolute', left: '50%', top: -12, transform: 'translateX(-50%)', width: 58, height: 58, borderRadius: 29, background: T.accent, color: T.onAccent, display: 'grid', placeItems: 'center', boxShadow: `0 10px 24px -8px rgba(0,0,0,.5)${scanOn ? `, 0 0 0 2px ${T.bg}, 0 0 0 4px ${T.ok}` : ''}` }}><Ic name="scan-line" size={24} sw={1.8} /></span>
    </div>
  </div>;
}

/* ───────────── 1a′ · GALLERY, refined ───────────── */
const GALLERY2 = { ...GALLERY, name: 'Gallery · refined', rPhoto: 10, rCard: 14, rCtl: 12, rDock: 26,
  glass: 'rgba(252,249,244,.74)', glassEdge: 'rgba(255,255,255,.55)', glassHi: 'rgba(255,255,255,.7)', chipBg: 'rgba(31,22,19,.06)', sentenceHeads: true, thumb: 'soft' };
GALLERY2.Btn = ({ kind = 'primary', children, icon, small, style }) => { const P = kind === 'primary', G = kind === 'ghost'; return <button className="press" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, height: small ? 36 : 48, padding: small ? '0 14px' : '0 22px', borderRadius: 999, border: P || G ? '1px solid transparent' : `1px solid ${GALLERY2.line2}`, background: P ? GALLERY2.accent : 'transparent', color: P ? GALLERY2.onAccent : G ? GALLERY2.ink2 : GALLERY2.ink, fontFamily: GALLERY2.fontUI, fontSize: small ? 12.5 : 14, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap', ...style }}>{icon && <Ic name={icon} size={small ? 14 : 16} />}{children}</button>; };
GALLERY2.Chip = ({ children, on, x, icon, style }) => <span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 32, padding: '0 12px', borderRadius: 999, border: `1px solid ${on ? GALLERY2.accent : GALLERY2.line2}`, background: on ? GALLERY2.accent : 'transparent', color: on ? GALLERY2.onAccent : GALLERY2.ink2, fontFamily: GALLERY2.fontUI, fontSize: 12.5, whiteSpace: 'nowrap', flex: 'none', ...style }}>{icon && <Ic name={icon} size={13} />}{children}{x && <Ic name="x" size={12} style={{ opacity: .6 }} />}</span>;
GALLERY2.Tag = ({ tone = 'accent', children }) => { const c = tone === 'danger' ? GALLERY2.danger : tone === 'ok' ? GALLERY2.ok : tone === 'gold' ? GALLERY2.gold : tone === 'muted' ? GALLERY2.ink3 : GALLERY2.accent; return <span style={{ fontFamily: GALLERY2.fontUI, fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 500, color: c, whiteSpace: 'nowrap' }}>{children}</span>; };
GALLERY2.Step = ({ v, big }) => { const s = big ? 44 : 32; const b = { width: s, height: s, borderRadius: '50%', border: `1px solid ${GALLERY2.line2}`, display: 'grid', placeItems: 'center', color: GALLERY2.ink }; return <span style={{ display: 'inline-flex', alignItems: 'center', gap: big ? 14 : 8 }}><span className="press" style={b}><Ic name="minus" size={big ? 16 : 13} /></span><span style={{ fontFamily: GALLERY2.fontUI, fontSize: big ? 20 : 14, fontWeight: 500, minWidth: 16, textAlign: 'center' }}>{v}</span><span className="press" style={{ ...b, background: GALLERY2.ink, color: GALLERY2.bg, border: 0 }}><Ic name="plus" size={big ? 16 : 13} /></span></span>; };
GALLERY2.TopBar = ({ scanOn, role }) => <div style={{ display: 'flex', alignItems: 'center', padding: '0 12px 0 18px', height: 52 }}>
  <img src={XD.A + 'logo/sutra-mark-gold.png'} style={{ height: 26 }} /><span style={{ width: 1, height: 18, background: GALLERY2.line2, margin: '0 12px' }} /><img src={XD.A + 'clients/srs-logo.png'} style={{ height: 22 }} />
  <span style={{ flex: 1 }} /><span style={{ fontFamily: GALLERY2.fontUI, fontSize: 12, color: GALLERY2.ink3, marginRight: 6 }}>{role}</span>
  <Hit T={GALLERY2} icon="search" /><Hit T={GALLERY2} icon="shopping-bag" count={8} /><Hit T={GALLERY2} icon="scan-line" ring={scanOn ? GALLERY2.ok : null} /><Hit T={GALLERY2} icon="ellipsis-vertical" />
</div>;
GALLERY2.Cats = ({ items, active }) => <div style={{ display: 'flex', gap: 24, padding: '2px 20px 0', borderBottom: `1px solid ${GALLERY2.line}` }}>{items.map(c => <span key={c} className="press" style={{ position: 'relative', padding: '10px 0 12px', fontFamily: GALLERY2.fontDisplay, fontSize: 17, color: c === active ? GALLERY2.ink : GALLERY2.ink3, whiteSpace: 'nowrap' }}>{c}{c === active && <span style={{ position: 'absolute', left: 0, right: 0, bottom: -1, height: 2, background: GALLERY2.accent }} />}</span>)}</div>;
GALLERY2.GridCard = ({ d, qty }) => <div>
  <div style={{ position: 'relative', aspectRatio: '4/5', borderRadius: GALLERY2.rPhoto, overflow: 'hidden', background: GALLERY2.photoBg }}>
    {d.src ? <img src={d.src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /> : <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontFamily: GALLERY2.fontDisplay, fontSize: 30, color: GALLERY2.ink3 }}>{d.code}</div>}
    {d.tag && <span style={{ position: 'absolute', top: 8, left: 8, padding: '5px 9px', borderRadius: 999, ...glass(GALLERY2, { boxShadow: 'none' }) }}><GALLERY2.Tag tone={d.tagTone === 'gold' ? 'gold' : 'accent'}>{d.tag}</GALLERY2.Tag></span>}
    <span style={{ position: 'absolute', left: 8, bottom: 8, padding: '7px 9px', borderRadius: 8, ...smoke({ boxShadow: 'none', display: 'flex' }) }}><GALLERY2.Bars names={d.colours} light /></span>
    <span style={{ position: 'absolute', right: 8, bottom: 8 }}><CardQty T={GALLERY2} qty={qty} onPhoto /></span>
  </div>
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 10 }}>
    <span style={{ fontFamily: GALLERY2.fontMono, fontSize: 11.5, color: GALLERY2.ink3 }}>{d.code}</span>
    <span style={{ fontFamily: GALLERY2.fontDisplay, fontSize: 16, color: GALLERY2.ink, flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.name}</span>
    <Price v={d.price} size={16} font={GALLERY2.fontSerif} color={GALLERY2.ink} dim={GALLERY2.ink3} />
  </div>
  {d.note && <div style={{ marginTop: 4 }}><GALLERY2.Tag tone="danger">{d.note}</GALLERY2.Tag></div>}
</div>;
GALLERY2.Dock = p => <Dock T={GALLERY2} {...p} />;

/* ───────────── 1b′ · ATELIER, refined ───────────── */
const ATELIER2 = { ...ATELIER, name: 'Atelier · refined', rPhoto: 20, rCard: 20, rCtl: 14, rDock: 30,
  glass: 'rgba(28,21,17,.62)', glassEdge: 'rgba(243,234,223,.10)', glassHi: 'rgba(243,234,223,.10)', chipBg: 'rgba(243,234,223,.08)', sentenceHeads: true, thumb: 'round', stagger: 16 };
ATELIER2.Btn = ({ kind = 'primary', children, icon, small, style }) => { const P = kind === 'primary', G = kind === 'ghost'; return <button className="press" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, height: small ? 36 : 50, padding: small ? '0 16px' : '0 24px', borderRadius: 999, border: 0, background: P ? ATELIER2.ink : G ? 'transparent' : ATELIER2.surface2, color: P ? ATELIER2.bg : G ? ATELIER2.ink2 : ATELIER2.ink, fontFamily: ATELIER2.fontUI, fontSize: small ? 13 : 15, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap', ...style }}>{icon && <Ic name={icon} size={small ? 14 : 17} />}{children}</button>; };
ATELIER2.Chip = ({ children, on, x, icon, style }) => <span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 36, padding: '0 14px', borderRadius: 999, background: on ? ATELIER2.ink : ATELIER2.surface, color: on ? ATELIER2.bg : ATELIER2.ink2, fontFamily: ATELIER2.fontUI, fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', flex: 'none', ...style }}>{icon && <Ic name={icon} size={13} />}{children}{x && <Ic name="x" size={12} style={{ opacity: .6 }} />}</span>;
ATELIER2.Step = ({ v, big }) => { const s = big ? 44 : 32; const b = { width: s, height: s, borderRadius: ATELIER2.rCtl, background: ATELIER2.surface2, display: 'grid', placeItems: 'center', color: ATELIER2.ink }; return <span style={{ display: 'inline-flex', alignItems: 'center', gap: big ? 14 : 8 }}><span className="press" style={b}><Ic name="minus" size={big ? 18 : 14} /></span><span style={{ fontFamily: ATELIER2.fontUI, fontSize: big ? 22 : 15, fontWeight: 500, minWidth: 18, textAlign: 'center' }}>{v}</span><span className="press" style={{ ...b, background: ATELIER2.ink, color: ATELIER2.bg }}><Ic name="plus" size={big ? 18 : 14} /></span></span>; };
ATELIER2.TopBar = ({ scanOn, role }) => <div style={{ display: 'flex', alignItems: 'center', height: 52, padding: '0 12px 0 20px' }}>
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, height: 36, padding: '0 12px 0 6px', borderRadius: 999, background: ATELIER2.surface }}><img src={XD.A + 'logo/sutra-mark-gold.png'} style={{ height: 22 }} /><span style={{ width: 1, height: 14, background: ATELIER2.line2 }} /><img src={XD.A + 'clients/srs-dress-only.png'} style={{ height: 18 }} /><span style={{ fontFamily: ATELIER2.fontUI, fontSize: 12, color: ATELIER2.ink2 }}>{role}</span></span>
  <span style={{ flex: 1 }} />
  <Hit T={ATELIER2} icon="search" style={{ background: ATELIER2.surface, borderRadius: ATELIER2.rCtl }} /><Hit T={ATELIER2} icon="shopping-bag" count={8} style={{ background: ATELIER2.surface, borderRadius: ATELIER2.rCtl, marginLeft: 6 }} /><Hit T={ATELIER2} icon="scan-line" ring={scanOn ? ATELIER2.ok : null} style={{ background: ATELIER2.surface, borderRadius: ATELIER2.rCtl, marginLeft: 6 }} /><Hit T={ATELIER2} icon="ellipsis-vertical" style={{ background: ATELIER2.surface, borderRadius: ATELIER2.rCtl, marginLeft: 6 }} />
</div>;
ATELIER2.Cats = ({ items, active, title }) => <div>
  {title && <div style={{ padding: '8px 20px 0', fontFamily: ATELIER2.fontDisplay, fontSize: 34, color: ATELIER2.ink, letterSpacing: track(34) }}>{title}</div>}
  <div style={{ display: 'flex', gap: 6, padding: '12px 20px 0', overflow: 'hidden' }}>{items.map(c => <ATELIER2.Chip key={c} on={c === active}>{c}</ATELIER2.Chip>)}</div>
</div>;
ATELIER2.GridCard = ({ d, qty, tall }) => <div style={{ position: 'relative', borderRadius: ATELIER2.rPhoto, overflow: 'hidden', background: ATELIER2.photoBg, aspectRatio: tall ? '3/4.3' : '3/3.8' }}>
  {d.src ? <img src={d.src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /> : <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontFamily: ATELIER2.fontDisplay, fontSize: 34, color: ATELIER2.ink3 }}>{d.code}</div>}
  <div style={{ position: 'absolute', top: 10, left: 10, right: 10, display: 'flex', alignItems: 'center', gap: 6 }}>{d.tag && <ATELIER2.Tag tone={d.tagTone === 'gold' ? 'gold' : 'accent'}>{d.tag}</ATELIER2.Tag>}{d.note && <ATELIER2.Tag tone="danger">{d.note}</ATELIER2.Tag>}</div>
  <div style={{ position: 'absolute', left: 8, right: 8, bottom: 8, padding: '10px 10px 10px 12px', borderRadius: ATELIER2.rPhoto - 8, ...glass(ATELIER2, { boxShadow: 'none' }) }}>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}><span style={{ fontFamily: ATELIER2.fontDisplay, fontSize: 17, color: ATELIER2.ink, flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.name}</span><Price v={d.price} size={15} font={ATELIER2.fontUI} color={ATELIER2.ink} dim={ATELIER2.ink2} weight={500} /></div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}><span style={{ fontFamily: ATELIER2.fontMono, fontSize: 11, color: ATELIER2.ink2 }}>{d.code}</span><ATELIER2.Bars names={d.colours} /><span style={{ flex: 1 }} /><CardQty T={ATELIER2} qty={qty} onPhoto /></div>
  </div>
</div>;
ATELIER2.Dock = p => <Dock T={ATELIER2} {...p} />;

/* ───────────── 3a · EDITORIAL — ivory, serif-led, one maroon line ─────────────
   The design system's own palette, taken seriously: sand canvas, espresso ink, Cormorant for anything a customer
   reads (names, prices), Jost for the interface, maroon exactly once per screen (the active tab line / primary button).
   Rounded everywhere (18 / 22 / 14); every floating surface is glass. Search is a real field in the top bar (BRD),
   with the single Sort & filter control inside it. Signature: the grid card's stepper lives on the photo, so the
   salesperson never leaves the grid to add. */
const EDITORIAL = { ...base, name: 'Editorial', dark: false, ok: '#3F7D5A', warn: '#B8862B', danger: '#B23A3A', blue: '#5B6C7A',
  bg: '#F3ECE2', bg2: '#EAE0D3', surface: '#FDFBF7', surface2: '#F8F3EC', line: 'rgba(36,23,18,.08)', line2: 'rgba(36,23,18,.18)',
  ink: '#241712', ink2: '#65524A', ink3: '#9C8B80', accent: '#561C24', accentSoft: 'rgba(86,28,36,.08)', gold: '#C0953F', onAccent: '#FDFBF7',
  fontDisplay: '"Cormorant Garamond", Georgia, serif', fontSerif: '"Cormorant Garamond", serif', fontUI: '"Jost", sans-serif', fontMono: '"IBM Plex Mono", monospace',
  rPhoto: 18, rCard: 22, rCtl: 14, rDock: 30, rPill: 999, glass: 'rgba(253,251,247,.74)', glassEdge: 'rgba(255,255,255,.6)', glassHi: 'rgba(255,255,255,.75)', chipBg: 'rgba(36,23,18,.06)', shadow: '0 18px 44px -14px rgba(36,23,18,.30)', photoBg: 'linear-gradient(180deg,#EAE0D3,#DCCFBF)', sentenceHeads: true, thumb: 'soft' };
EDITORIAL.Btn = ({ kind = 'primary', children, icon, small, style }) => { const P = kind === 'primary', G = kind === 'ghost'; return <button className="press" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, height: small ? 36 : 48, padding: small ? '0 14px' : '0 22px', borderRadius: 999, border: P || G ? 0 : `1px solid ${EDITORIAL.line2}`, background: P ? EDITORIAL.accent : 'transparent', color: P ? EDITORIAL.onAccent : G ? EDITORIAL.ink2 : EDITORIAL.ink, fontFamily: EDITORIAL.fontUI, fontSize: small ? 12.5 : 14, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap', ...style }}>{icon && <Ic name={icon} size={small ? 14 : 16} />}{children}</button>; };
EDITORIAL.Chip = ({ children, on, x, icon, style }) => <span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 32, padding: '0 12px', borderRadius: 999, background: on ? EDITORIAL.ink : EDITORIAL.surface, border: `1px solid ${on ? EDITORIAL.ink : EDITORIAL.line2}`, color: on ? EDITORIAL.bg : EDITORIAL.ink, fontFamily: EDITORIAL.fontUI, fontSize: 12.5, whiteSpace: 'nowrap', flex: 'none', ...style }}>{icon && <Ic name={icon} size={13} />}{children}{x && <Ic name="x" size={12} style={{ opacity: .55 }} />}</span>;
EDITORIAL.Tag = ({ tone = 'accent', children }) => { const c = tone === 'danger' ? EDITORIAL.danger : tone === 'ok' ? EDITORIAL.ok : tone === 'gold' ? EDITORIAL.gold : tone === 'muted' ? EDITORIAL.ink3 : EDITORIAL.accent; return <span style={{ fontFamily: EDITORIAL.fontUI, fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 500, color: c, whiteSpace: 'nowrap' }}>{children}</span>; };
EDITORIAL.Step = ({ v, big }) => { const s = big ? 44 : 32; const b = { width: s, height: s, borderRadius: '50%', border: `1px solid ${EDITORIAL.line2}`, display: 'grid', placeItems: 'center', color: EDITORIAL.ink, background: EDITORIAL.surface }; return <span style={{ display: 'inline-flex', alignItems: 'center', gap: big ? 14 : 8 }}><span className="press" style={b}><Ic name="minus" size={big ? 16 : 13} /></span><span style={{ fontFamily: EDITORIAL.fontUI, fontSize: big ? 20 : 14, fontWeight: 500, minWidth: 16, textAlign: 'center' }}>{v}</span><span className="press" style={{ ...b, background: EDITORIAL.ink, color: EDITORIAL.bg, border: 0 }}><Ic name="plus" size={big ? 16 : 13} /></span></span>; };
EDITORIAL.Bars = ({ names, active, light }) => <span style={{ display: 'inline-flex', gap: 3, alignItems: 'flex-end' }}>{names.map(n => <span key={n} style={{ width: 5, height: n === active ? 16 : 12, borderRadius: 2, background: XD.cols[n], boxShadow: n === active ? `0 0 0 1.5px ${light ? '#fff' : EDITORIAL.ink}` : 'inset 0 0 0 1px rgba(0,0,0,.12)' }} />)}</span>;
EDITORIAL.TopBar = ({ scanOn, role }) => <div style={{ display: 'flex', alignItems: 'center', padding: '0 12px 0 18px', height: 52 }}>
  <img src={XD.A + 'logo/sutra-mark-gold.png'} style={{ height: 26 }} /><span style={{ width: 1, height: 18, background: EDITORIAL.line2, margin: '0 12px' }} /><img src={XD.A + 'clients/srs-logo.png'} style={{ height: 22 }} />
  <span style={{ flex: 1 }} /><span style={{ fontFamily: EDITORIAL.fontUI, fontSize: 12, color: EDITORIAL.ink3, marginRight: 4 }}>{role}</span>
  <Hit T={EDITORIAL} icon="shopping-bag" count={8} /><Hit T={EDITORIAL} icon="scan-line" ring={scanOn ? EDITORIAL.ok : null} /><Hit T={EDITORIAL} icon="ellipsis-vertical" />
</div>;
EDITORIAL.Cats = ({ items, active }) => <div style={{ display: 'flex', alignItems: 'baseline', gap: 22, padding: '0 20px', borderBottom: `1px solid ${EDITORIAL.line}`, overflow: 'hidden' }}>{items.map(c => <span key={c} className="press" style={{ position: 'relative', padding: '10px 0 12px', fontFamily: EDITORIAL.fontDisplay, fontSize: 18, fontWeight: 500, color: c === active ? EDITORIAL.ink : EDITORIAL.ink3, whiteSpace: 'nowrap' }}>{c}{c === active && <span style={{ position: 'absolute', left: 0, right: 0, bottom: -1, height: 2, background: EDITORIAL.accent }} />}</span>)}</div>;
EDITORIAL.Header = ({ scanOn, cats, active, count }) => <>
  <EDITORIAL.TopBar scanOn={scanOn} role="Sales" />
  <div style={{ margin: '2px 16px 0', height: 44, borderRadius: 22, background: EDITORIAL.surface, border: `1px solid ${EDITORIAL.line2}`, display: 'flex', alignItems: 'center', gap: 10, padding: '0 6px 0 16px', color: EDITORIAL.ink3, fontFamily: EDITORIAL.fontUI, fontSize: 14 }}><Ic name="search" size={17} /><span style={{ flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Design no, name, barcode</span><span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 32, padding: '0 12px 0 10px', borderRadius: 16, background: EDITORIAL.bg2, color: EDITORIAL.ink, fontSize: 12.5, fontWeight: 500, whiteSpace: 'nowrap', flex: 'none' }}><Ic name="sliders-horizontal" size={14} />Sort & filter<span style={{ minWidth: 18, height: 18, borderRadius: 9, background: EDITORIAL.accent, color: EDITORIAL.onAccent, fontSize: 10.5, display: 'grid', placeItems: 'center' }}>3</span></span></div>
  <div style={{ marginTop: 6 }}><EDITORIAL.Cats items={cats} active={active} /></div>
  <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px 0', overflow: 'hidden' }}><EDITORIAL.Chip x>Top 30</EDITORIAL.Chip><EDITORIAL.Chip x>Delhi</EDITORIAL.Chip><EDITORIAL.Chip x>Zari work</EDITORIAL.Chip><span style={{ flex: 1 }} /><span style={{ fontFamily: EDITORIAL.fontUI, fontSize: 12, color: EDITORIAL.ink3, whiteSpace: 'nowrap', flex: 'none' }}>{count} designs</span><span style={{ display: 'inline-flex', gap: 2, padding: 2, borderRadius: 999, background: EDITORIAL.bg2, flex: 'none' }}><span style={{ width: 28, height: 26, borderRadius: 13, display: 'grid', placeItems: 'center', background: EDITORIAL.surface, color: EDITORIAL.ink, boxShadow: '0 1px 2px rgba(36,23,18,.08)' }}><Ic name="layout-grid" size={14} /></span><span style={{ width: 28, height: 26, borderRadius: 13, display: 'grid', placeItems: 'center', color: EDITORIAL.ink3 }}><Ic name="list" size={14} /></span></span></div>
</>;
EDITORIAL.grid = { gap: '18px 12px', pad: '12px 16px 260px' };
EDITORIAL.GridCard = ({ d, qty }) => <div>
  <div style={{ position: 'relative', aspectRatio: '4/5', borderRadius: EDITORIAL.rPhoto, overflow: 'hidden', background: EDITORIAL.photoBg, boxShadow: '0 1px 2px rgba(36,23,18,.05)' }}>
    {d.src ? <img src={d.src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /> : <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontFamily: EDITORIAL.fontDisplay, fontSize: 32, color: EDITORIAL.ink3 }}>{d.code}</div>}
    {d.tag && <span style={{ position: 'absolute', top: 8, left: 8, padding: '5px 9px', borderRadius: 999, ...glass(EDITORIAL, { boxShadow: 'none' }) }}><EDITORIAL.Tag tone={d.tagTone === 'gold' ? 'gold' : 'accent'}>{d.tag}</EDITORIAL.Tag></span>}
    <span style={{ position: 'absolute', left: 8, bottom: 8, padding: '7px 9px', borderRadius: 10, ...smoke({ boxShadow: 'none', display: 'flex' }) }}><EDITORIAL.Bars names={d.colours} light /></span>
    <span style={{ position: 'absolute', right: 8, bottom: 8 }}><CardQty T={EDITORIAL} qty={qty} onPhoto /></span>
  </div>
  <div style={{ padding: '9px 4px 0' }}>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><span style={{ fontFamily: EDITORIAL.fontMono, fontSize: 11.5, color: EDITORIAL.ink3 }}>{d.code}</span><span style={{ fontFamily: EDITORIAL.fontDisplay, fontSize: 17, fontWeight: 500, color: EDITORIAL.ink, flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.name}</span><Price v={d.price} size={17} font={EDITORIAL.fontSerif} color={EDITORIAL.ink} dim={EDITORIAL.ink3} /></div>
    {d.note && <div style={{ marginTop: 3 }}><EDITORIAL.Tag tone="danger">{d.note}</EDITORIAL.Tag></div>}
  </div>
</div>;
EDITORIAL.Dock = p => <Dock T={EDITORIAL} {...p} />;
EDITORIAL.Hero = ({ d, colour }) => <div style={{ position: 'relative', height: 470, borderRadius: '0 0 30px 30px', overflow: 'hidden', background: EDITORIAL.photoBg }}>
  <img src={d.src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
  <div style={{ position: 'absolute', left: 12, right: 12, top: 58, display: 'flex', gap: 6 }}><Hit T={EDITORIAL} icon="chevron-left" style={smoke()} /><span style={{ flex: 1 }} /><Hit T={EDITORIAL} icon="maximize-2" style={smoke()} /><Hit T={EDITORIAL} icon="share-2" style={smoke()} /></div>
  <div style={{ position: 'absolute', left: 12, bottom: 12, display: 'flex', gap: 8, alignItems: 'center', padding: '8px 12px', borderRadius: 14, ...smoke(), fontFamily: EDITORIAL.fontUI, fontSize: 12.5 }}><EDITORIAL.Bars names={d.colours} active={colour} light />{colour} · 1 of {d.colours.length}</div>
  {d.tag && <span style={{ position: 'absolute', right: 12, bottom: 12, padding: '7px 11px', borderRadius: 999, ...smoke() }}><span style={{ fontFamily: EDITORIAL.fontUI, fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 500 }}>{d.tag}</span></span>}
</div>;

/* ───────────── 3b · STUDIO — graphite, sans-led, gold as the only accent ─────────────
   A neutral near-black (cool, not brown, so it reads as a different room from Atelier), ivory type, Manrope for
   everything with tabular figures, Sutra gold for the one active state and the cart. Photos are the only colour.
   Chrome: search field with the Sort & filter control inside; category text tabs with a gold line; card caption on
   a frosted strip that also carries the stepper; an island bar with the scan button raised in the centre and the
   cart chips floating above it. Rounded 20 / 24 / 16. */
const STUDIO = { ...base, name: 'Studio', dark: true, ok: '#6FB58C', warn: '#D8B15A', danger: '#E07E7E', blue: '#8FB0D6',
  bg: '#17171A', bg2: '#1F1F23', surface: '#232327', surface2: '#2C2C31', line: 'rgba(245,242,238,.08)', line2: 'rgba(245,242,238,.18)',
  ink: '#F2EFEA', ink2: '#B5B0A8', ink3: '#7D7872', accent: '#C9A45C', accentSoft: 'rgba(201,164,92,.14)', gold: '#C9A45C', onAccent: '#17171A',
  fontDisplay: '"Manrope", sans-serif', fontSerif: '"Manrope", sans-serif', fontUI: '"Manrope", sans-serif', fontMono: '"IBM Plex Mono", monospace',
  rPhoto: 20, rCard: 24, rCtl: 16, rDock: 32, rPill: 999, glass: 'rgba(23,23,26,.58)', glassEdge: 'rgba(255,255,255,.10)', glassHi: 'rgba(255,255,255,.12)', chipBg: 'rgba(245,242,238,.08)', shadow: '0 24px 50px -20px rgba(0,0,0,.7)', photoBg: 'linear-gradient(180deg,#2C2C31,#1F1F23)', sentenceHeads: true, thumb: 'round', island: true };
STUDIO.Btn = ({ kind = 'primary', children, icon, small, style }) => { const P = kind === 'primary', G = kind === 'ghost'; return <button className="press" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, height: small ? 36 : 50, padding: small ? '0 16px' : '0 24px', borderRadius: 999, border: P || G ? 0 : `1px solid ${STUDIO.line2}`, background: P ? STUDIO.ink : 'transparent', color: P ? STUDIO.bg : G ? STUDIO.ink2 : STUDIO.ink, fontFamily: STUDIO.fontUI, fontSize: small ? 13 : 14.5, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', ...style }}>{icon && <Ic name={icon} size={small ? 14 : 16} sw={1.9} />}{children}</button>; };
STUDIO.Chip = ({ children, on, x, icon, style }) => <span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 34, padding: '0 13px', borderRadius: 999, background: on ? STUDIO.ink : STUDIO.chipBg, color: on ? STUDIO.bg : STUDIO.ink, fontFamily: STUDIO.fontUI, fontSize: 12.5, fontWeight: 500, whiteSpace: 'nowrap', flex: 'none', ...style }}>{icon && <Ic name={icon} size={13} />}{children}{x && <Ic name="x" size={12} style={{ opacity: .55 }} />}</span>;
STUDIO.Tag = ({ tone = 'accent', children }) => { const c = tone === 'danger' ? STUDIO.danger : tone === 'ok' ? STUDIO.ok : tone === 'muted' ? STUDIO.ink3 : STUDIO.gold; return <span style={{ fontFamily: STUDIO.fontUI, fontSize: 10.5, letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 700, color: c, whiteSpace: 'nowrap' }}>{children}</span>; };
STUDIO.Step = ({ v, big }) => { const s = big ? 44 : 32; const b = { width: s, height: s, borderRadius: '50%', background: STUDIO.surface2, display: 'grid', placeItems: 'center', color: STUDIO.ink }; return <span style={{ display: 'inline-flex', alignItems: 'center', gap: big ? 14 : 8 }}><span className="press" style={b}><Ic name="minus" size={big ? 16 : 13} sw={2} /></span><span style={{ fontFamily: STUDIO.fontUI, fontSize: big ? 20 : 14, fontWeight: 700, minWidth: 18, textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>{v}</span><span className="press" style={{ ...b, background: STUDIO.ink, color: STUDIO.bg }}><Ic name="plus" size={big ? 16 : 13} sw={2.2} /></span></span>; };
STUDIO.Bars = ({ names, active, size = 'sm' }) => <span style={{ display: 'inline-flex', gap: 5 }}>{names.map(n => <span key={n} style={{ width: size === 'sm' ? 10 : 18, height: size === 'sm' ? 10 : 18, borderRadius: '50%', background: XD.cols[n], boxShadow: n === active ? `0 0 0 2px ${STUDIO.bg}, 0 0 0 3.5px ${STUDIO.gold}` : 'inset 0 0 0 1px rgba(0,0,0,.25)' }} />)}</span>;
STUDIO.TopBar = ({ role }) => <div style={{ display: 'flex', alignItems: 'center', height: 52, padding: '0 12px 0 20px' }}>
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, height: 36, padding: '0 12px 0 6px', borderRadius: 999, background: STUDIO.surface }}><img src={XD.A + 'logo/sutra-mark-gold.png'} style={{ height: 22 }} /><span style={{ width: 1, height: 14, background: STUDIO.line2 }} /><img src={XD.A + 'clients/srs-dress-only.png'} style={{ height: 18 }} /><span style={{ fontFamily: STUDIO.fontUI, fontSize: 12, color: STUDIO.ink2 }}>{role}</span></span>
  <span style={{ flex: 1 }} />
  <Hit T={STUDIO} icon="shopping-bag" count={8} style={{ background: STUDIO.surface }} /><Hit T={STUDIO} icon="ellipsis-vertical" style={{ background: STUDIO.surface, marginLeft: 6 }} />
</div>;
STUDIO.Cats = ({ items, active }) => <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, padding: '0 20px', borderBottom: `1px solid ${STUDIO.line}`, overflow: 'hidden' }}>{items.map(c => <span key={c} className="press" style={{ position: 'relative', padding: '10px 0 12px', fontFamily: STUDIO.fontUI, fontSize: 14, fontWeight: c === active ? 700 : 500, color: c === active ? STUDIO.ink : STUDIO.ink3, whiteSpace: 'nowrap' }}>{c}{c === active && <span style={{ position: 'absolute', left: 0, right: 0, bottom: -1, height: 2, background: STUDIO.gold }} />}</span>)}</div>;
STUDIO.Header = ({ scanOn, cats, active, count }) => <>
  <STUDIO.TopBar role="Sales" />
  <div style={{ margin: '2px 16px 0', height: 44, borderRadius: 22, background: STUDIO.surface, display: 'flex', alignItems: 'center', gap: 10, padding: '0 6px 0 16px', color: STUDIO.ink3, fontFamily: STUDIO.fontUI, fontSize: 13.5 }}><Ic name="search" size={17} /><span style={{ flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Design no, name, barcode</span><span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 32, padding: '0 12px 0 10px', borderRadius: 16, background: STUDIO.surface2, color: STUDIO.ink, fontSize: 12.5, fontWeight: 600, whiteSpace: 'nowrap', flex: 'none' }}><Ic name="sliders-horizontal" size={14} />Sort & filter<span style={{ minWidth: 18, height: 18, borderRadius: 9, background: STUDIO.gold, color: STUDIO.bg, fontSize: 10.5, display: 'grid', placeItems: 'center' }}>3</span></span></div>
  <div style={{ marginTop: 6 }}><STUDIO.Cats items={cats} active={active} /></div>
  <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px 0', overflow: 'hidden' }}><STUDIO.Chip x>Top 30</STUDIO.Chip><STUDIO.Chip x>Delhi</STUDIO.Chip><STUDIO.Chip x>Zari work</STUDIO.Chip><span style={{ flex: 1 }} /><span style={{ fontFamily: STUDIO.fontUI, fontSize: 12, color: STUDIO.ink3, whiteSpace: 'nowrap', flex: 'none', fontVariantNumeric: 'tabular-nums' }}>{count} designs</span><span style={{ display: 'inline-flex', gap: 2, padding: 2, borderRadius: 999, background: STUDIO.surface, flex: 'none' }}><span style={{ width: 28, height: 26, borderRadius: 13, display: 'grid', placeItems: 'center', background: STUDIO.surface2, color: STUDIO.ink }}><Ic name="layout-grid" size={14} /></span><span style={{ width: 28, height: 26, borderRadius: 13, display: 'grid', placeItems: 'center', color: STUDIO.ink3 }}><Ic name="list" size={14} /></span></span></div>
</>;
STUDIO.grid = { gap: '14px 12px', pad: '12px 16px 280px' };
STUDIO.GridCard = ({ d, qty }) => <div style={{ position: 'relative', borderRadius: STUDIO.rPhoto, overflow: 'hidden', background: STUDIO.photoBg, aspectRatio: '3/4.2' }}>
  {d.src ? <img src={d.src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /> : <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontFamily: STUDIO.fontUI, fontSize: 28, fontWeight: 600, color: STUDIO.ink3 }}>{d.code}</div>}
  {(d.tag || d.note) && <div style={{ position: 'absolute', top: 8, left: 8, right: 52, display: 'flex', gap: 4, flexWrap: 'wrap' }}>{d.tag && <span style={{ padding: '5px 9px', borderRadius: 999, ...smoke({ boxShadow: 'none' }) }}><span style={{ fontFamily: STUDIO.fontUI, fontSize: 10.5, letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 700 }}>{d.tag}</span></span>}{d.note && <span style={{ padding: '5px 9px', borderRadius: 999, ...smoke({ boxShadow: 'none' }) }}><span style={{ fontFamily: STUDIO.fontUI, fontSize: 10.5, letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 700, color: '#F3A3A3' }}>{d.note}</span></span>}</div>}
  <span style={{ position: 'absolute', top: 8, right: 8 }}><CardQty T={STUDIO} qty={qty} onPhoto /></span>
  <div style={{ position: 'absolute', left: 6, right: 6, bottom: 6, padding: '9px 12px 9px', borderRadius: STUDIO.rPhoto - 8, ...smoke({ boxShadow: 'none' }) }}>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}><span style={{ fontFamily: STUDIO.fontUI, fontSize: 14.5, fontWeight: 700, flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.name}</span><Price v={d.price} size={14.5} font={STUDIO.fontUI} color="#fff" dim="rgba(255,255,255,.7)" weight={600} /></div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 5 }}><span style={{ fontFamily: STUDIO.fontMono, fontSize: 11, opacity: .8 }}>{d.code}</span><STUDIO.Bars names={d.colours} /></div>
  </div>
</div>;
STUDIO.Dock = p => <Island T={STUDIO} scanOn {...p} />;
STUDIO.Hero = ({ d, colour }) => <div style={{ position: 'relative', height: 470, borderRadius: '0 0 32px 32px', overflow: 'hidden', background: STUDIO.photoBg }}>
  <img src={d.src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
  <div style={{ position: 'absolute', left: 12, right: 12, top: 58, display: 'flex', gap: 6 }}><Hit T={STUDIO} icon="chevron-left" style={smoke()} /><span style={{ flex: 1 }} /><Hit T={STUDIO} icon="maximize-2" style={smoke()} /><Hit T={STUDIO} icon="share-2" style={smoke()} /></div>
  <div style={{ position: 'absolute', left: 12, bottom: 12, display: 'flex', gap: 8, alignItems: 'center', padding: '8px 12px', borderRadius: 16, ...smoke(), fontFamily: STUDIO.fontUI, fontSize: 12.5, fontWeight: 500 }}><STUDIO.Bars names={d.colours} active={colour} />{colour} · 1 of {d.colours.length}</div>
  {d.tag && <span style={{ position: 'absolute', right: 12, bottom: 12, padding: '7px 11px', borderRadius: 999, ...smoke() }}><span style={{ fontFamily: STUDIO.fontUI, fontSize: 10.5, letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 700 }}>{d.tag}</span></span>}
</div>;

Object.assign(window, { GALLERY2, ATELIER2, EDITORIAL, STUDIO, Dock, Island, Hit, CardQty, CartChips, glass, smoke, track, NAV4, NAV5, REDUCED });
