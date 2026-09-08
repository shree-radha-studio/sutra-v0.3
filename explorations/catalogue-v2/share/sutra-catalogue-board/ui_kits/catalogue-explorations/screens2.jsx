/* v2 screens. Grid, product page, scan pop-up and viewer are re-composed here; cart card and side menu are new.
   Salesperson view, analytics and carts are reused from the originals: their content is dictated by the BRD and
   they pick up each theme's chrome (buttons, chips, steppers, radii, glass) automatically. */
const CATS2 = ['All', 'Samples', 'Lehenga', 'Saree', 'Plazo'];
const QTY = { '2798': 2, '6002': 1 };            /* active cart (A) quantities shown on the grid cards */
const CART_LINES2 = [['2798', 'Sky', 2], ['2798', 'Purple', 1], ['6002', 'Lilac', 1], ['3661', 'Peach', 2], ['1457', 'Firozi', 3], ['D9107', 'Lemon', 5]];
/* Side menu: every module and its sub-menus, from the BRD (Main tabs · Sub menus). */
const MENU = [
  ['house', 'Home', ['Dashboard', 'Notifications', 'Approvals', 'Gate pass hub', 'Manual gate token']],
  ['layout-grid', 'Catalogue', ['Carts', 'Sale orders', 'Direct scan', 'Recognise by image', 'Customer mode']],
  ['users', 'CRM', ['Sales CRM', 'Customer dossier', 'Share packets', 'Follow-ups & journeys', 'Payments CRM', 'Journey builder']],
  ['scissors', 'Production', ['Purchase orders', 'Purchase inward', 'Purchase return', 'Process setting (recipe · BOM)', 'Production lifecycle', 'Job cards', 'Costing', 'Karigar analytics', 'Samples']],
  ['package', 'Dispatch', ['Ready orders', 'Pending orders', 'Packing', 'Invoice review', 'Shipments', 'Billed', 'Out of stock', 'Warehouse stock', 'Sale return']],
  ['library', 'Hub', ['Master views · items', 'Master views · ledgers', 'Reports', 'Report builder', 'Product compare']],
  ['sparkles', 'Studio', ['Image upload centre', 'AI photoshoots', 'Stitch designer']],
  ['git-branch', 'Channels', ['Cross-firm transfers', 'Active permissions']],
];

/* Audit fix shared by every v2 row: section heads in the display face, sentence case, instead of tracked caps. */
if (typeof S !== 'undefined' && !S.__v2) {
  const h0 = S.h; S.__v2 = true;
  S.h = (T, txt, right) => T.sentenceHeads
    ? <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, padding: '0 20px', marginTop: 18 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 16, fontWeight: T.fontDisplay.includes('Manrope') ? 700 : 500, color: T.ink, whiteSpace: 'nowrap', letterSpacing: track(16) }}>{txt}</span><span style={{ flex: 1 }} />{right}</div>
    : h0(T, txt, right);
}

const frame2 = (T, children, bottom) => <div style={{ position: 'relative', height: '100%', background: T.bg, color: T.ink, overflow: 'hidden', fontFamily: T.fontUI }}>
  {T.dark && <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(120% 60% at 50% -10%, ${T.accentSoft}, transparent 60%)`, pointerEvents: 'none' }} />}
  <div style={{ position: 'relative', height: '100%', overflow: 'hidden', paddingTop: 54 }}>{children}</div>{bottom}
</div>;
const scrim = (T, extra) => <div style={{ position: 'absolute', inset: 0, background: T.dark ? 'rgba(0,0,0,.45)' : 'rgba(36,23,18,.30)', backdropFilter: 'blur(3px)', ...extra }} />;
const dispW = T => T.fontDisplay.includes('Manrope') ? 700 : 500;

/* Grid body (shared by grid, cart card and side menu screens) */
function GridBody({ T }) {
  if (T.final && window.FGridBody) return <window.FGridBody T={T} />;   /* final rows use the final header + grid */
  const list = XD.designs.slice(0, 6); const g = T.grid || { gap: T.dark ? '16px 12px' : '20px 14px', pad: '12px 16px 260px' };
  return <>
    {T.Header ? <T.Header cats={CATS2} active="All" count={15} /> : <>
      <T.TopBar role="Sales" />
      <T.Cats items={CATS2} active="All" title={T.dark ? 'Catalogue' : undefined} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 20px 0', overflow: 'hidden' }}><T.Chip x>Top 30</T.Chip><T.Chip x>Delhi</T.Chip><T.Chip x>Zari work</T.Chip><T.Chip icon="sliders-horizontal">Filters</T.Chip></div>
      <div style={{ display: 'flex', alignItems: 'center', padding: '12px 20px 0' }}><span style={{ fontFamily: T.fontUI, fontSize: 12.5, color: T.ink2 }}>15 designs · Featured first</span><span style={{ flex: 1 }} /><span style={{ display: 'inline-flex', gap: 14, color: T.ink3 }}><Ic name="layout-grid" size={16} color={T.ink} /><Ic name="list" size={16} /></span></div>
    </>}
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: g.gap, padding: g.pad, alignItems: 'start' }}>
      {list.map((d, i) => <div key={d.code} style={{ marginTop: T.stagger && i % 2 ? T.stagger : 0 }}><T.GridCard d={d} qty={QTY[d.code]} tall={!!T.stagger && i % 2 === 0} /></div>)}
    </div>
  </>;
}
/* 1 · Catalogue grid */
function ScreenGrid2({ T }) { return frame2(T, <GridBody T={T} />, <T.Dock active="Catalogue" cart="A" />); }

/* 2 · Product, customer view. Hero per theme; body = code, name, price (+5% lead digit), category, colours,
   manipulative tag, note, and the active cart's stepper. */
function ScreenProductCustomer2({ T }) {
  const d = XD.designs[0]; const colour = 'Sky';
  const thumbR = T.thumb === 'round' ? 16 : T.thumb === 'soft' ? 12 : 8;
  const ring = T.gold && T.accent === T.gold ? T.gold : T.accent;
  return frame2(T, <div style={{ height: '100%', overflow: 'hidden', marginTop: -54 }}>
    {T.Hero ? <T.Hero d={d} colour={colour} /> : <div style={{ position: 'relative', height: 470, borderRadius: `0 0 ${T.rPhoto + 12}px ${T.rPhoto + 12}px`, overflow: 'hidden', background: T.photoBg }}>
      <img src={d.src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      <div style={{ position: 'absolute', left: 12, right: 12, top: 58, display: 'flex', gap: 6 }}><Hit T={T} icon="chevron-left" style={smoke()} /><span style={{ flex: 1 }} /><Hit T={T} icon="maximize-2" style={smoke()} /><Hit T={T} icon="share-2" style={smoke()} /></div>
      <div style={{ position: 'absolute', left: 12, bottom: 12, display: 'flex', gap: 8, alignItems: 'center', padding: '8px 12px', borderRadius: 14, ...smoke(), fontSize: 12.5 }}><T.Bars names={d.colours} active={colour} light />{colour} · 1 of {d.colours.length}</div>
      {d.tag && <span style={{ position: 'absolute', right: 12, bottom: 12, padding: '7px 11px', borderRadius: 999, ...smoke() }}><span style={{ fontFamily: T.fontUI, fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 500 }}>{d.tag}</span></span>}
    </div>}
    <div style={{ padding: '18px 20px 0' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}><span style={{ fontFamily: T.fontMono, fontSize: 13, color: T.ink3 }}>{d.code}</span><span style={{ fontFamily: T.fontDisplay, fontSize: 30, fontWeight: dispW(T), letterSpacing: track(30), color: T.ink, flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.name}</span><Price v={d.price} size={28} font={T.fontSerif} color={T.ink} dim={T.ink3} weight={dispW(T)} /></div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8, fontSize: 13, color: T.ink3 }}>{d.cat} · {d.colours.length} colours<span style={{ flex: 1 }} />{d.note && <T.Tag tone="danger">{d.note}</T.Tag>}</div>
      <div style={{ display: 'flex', gap: 12, marginTop: 18 }}>{d.colours.map(n => { const on = n === colour; return <div key={n} className="press" style={{ width: 66 }}>
        <div style={{ position: 'relative', width: 66, height: 84, borderRadius: thumbR, overflow: 'hidden', background: n === d.colours[0] ? T.photoBg : XD.cols[n], boxShadow: on ? `0 0 0 2px ${T.bg}, 0 0 0 3.5px ${ring}` : 'none' }}>{n === d.colours[0] && d.src ? <img src={d.src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /> : <span style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontFamily: T.fontMono, fontSize: 10, color: 'rgba(255,255,255,.9)' }}>{d.code}</span>}</div>
        <div style={{ fontSize: 11.5, textAlign: 'center', marginTop: 7, color: on ? T.ink : T.ink3, fontWeight: on ? 600 : 400 }}>{n}</div>
      </div>; })}</div>
    </div>
    <div style={{ position: 'absolute', left: 14, right: 14, bottom: 22, display: 'flex', alignItems: 'center', gap: 12, padding: '10px 10px 10px 18px', borderRadius: T.rDock, ...glass(T) }}>
      <span style={{ fontSize: 12, color: T.ink2, lineHeight: 1.3 }}>Cart A<br /><b style={{ fontWeight: 600, color: T.ink }}>Ramleela</b></span><span style={{ flex: 1 }} /><T.Step v={2} big /><T.Btn icon="plus">Add {colour}</T.Btn>
    </div>
  </div>);
}

/* 5 · Scan, with the recognised-product pop-up (scan-to-add mode on). Camera behind a soft focus frame; the pop-up
   is ~2/3 of the screen, image card 3/5 of it, colours boxed on the image, then: go to product, cart tabs,
   four quick-add actions, per-colour qty. */
function ScreenScan2({ T }) {
  const d = XD.designs[1]; const qty = { Lilac: 1, Blush: 0 };
  const quick = [['Add pc', 'plus'], ['Add colour set', 'layers'], ['Pc to all carts', 'copy-plus'], ['Set to all carts', 'copy']];
  const r = T.rDock - 2;
  return <div style={{ position: 'relative', height: '100%', background: '#0B0A09', overflow: 'hidden', fontFamily: T.fontUI, color: T.ink }}>
    <img src={XD.A + 'samples/2006-lavender.jpg'} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: .5, filter: 'blur(1.5px)' }} />
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.5)' }} />
    <div style={{ position: 'absolute', left: 52, right: 52, top: 96, bottom: 96, borderRadius: 160, border: '1.5px solid rgba(255,255,255,.28)' }} />
    <div style={{ position: 'absolute', top: 62, left: 12 }}><Hit T={T} icon="chevron-left" style={smoke()} /></div>
    <div style={{ position: 'absolute', top: 66, left: '50%', transform: 'translateX(-50%)', display: 'inline-flex', alignItems: 'center', gap: 8, height: 36, padding: '0 14px', borderRadius: 999, ...smoke(), fontSize: 12.5, whiteSpace: 'nowrap' }}><span style={{ width: 7, height: 7, borderRadius: 4, background: '#5FCB8A' }} />Recognised · {d.code}</div>
    <div style={{ position: 'absolute', right: 14, bottom: 34, display: 'inline-flex', alignItems: 'center', gap: 8, height: 40, padding: '0 14px', borderRadius: 999, ...smoke({ boxShadow: `inset 0 1px 0 rgba(255,255,255,.22), 0 0 0 1.5px #5FCB8A` }), fontSize: 12.5, fontWeight: 500, whiteSpace: 'nowrap' }}><Ic name="plus-circle" size={15} color="#5FCB8A" />Scan to add · on</div>
    <div style={{ position: 'absolute', left: 20, right: 20, top: 118, bottom: 116, borderRadius: r, background: T.surface, boxShadow: '0 40px 80px -20px rgba(0,0,0,.8)', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: `1px solid ${T.line}` }}>
      <div style={{ position: 'relative', height: '55%', background: T.photoBg }}>
        <img src={d.src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', left: 10, right: 10, bottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '7px 11px', borderRadius: 12, ...smoke({ boxShadow: 'none' }), fontSize: 12 }}>{d.colours.map(n => <span key={n} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 5, height: 15, borderRadius: 2, background: XD.cols[n] }} />{n}</span>)}</span>
          <span style={{ flex: 1 }} /><span style={{ padding: '7px 10px', borderRadius: 12, ...smoke({ boxShadow: 'none' }), fontSize: 11.5, opacity: .95 }}>1 / 2</span>
        </div>
        {d.tag && <span style={{ position: 'absolute', top: 10, left: 10, padding: '5px 9px', borderRadius: 999, ...smoke({ boxShadow: 'none' }) }}><span style={{ fontSize: 10.5, letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 600 }}>{d.tag}</span></span>}
      </div>
      <div style={{ padding: '12px 14px 12px', display: 'flex', flexDirection: 'column', gap: 9, flex: 1, minHeight: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><span style={{ fontFamily: T.fontMono, fontSize: 12, color: T.ink3 }}>{d.code}</span><span style={{ fontFamily: T.fontDisplay, fontSize: 20, fontWeight: dispW(T), flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.name}</span><Price v={d.price} size={19} font={T.fontSerif} color={T.ink} dim={T.ink3} weight={dispW(T)} /></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: T.ink3 }}>{d.cat} · Godown 12 · Reserved 3<span style={{ flex: 1 }} /><span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 3, color: T.accent, fontSize: 12.5, fontWeight: 600 }}>Go to product<Ic name="chevron-right" size={13} sw={2.2} /></span></div>
        <div style={{ display: 'flex', gap: 6 }}>{CARTS.map(c => <T.Chip key={c.k} on={c.k === 'A'} style={{ height: 30, fontSize: 12 }}>{c.k} · {c.name.split(' ')[0]}</T.Chip>)}</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>{quick.map(([q, ic], i) => <T.Btn key={q} kind={i === 0 ? 'primary' : 'secondary'} small icon={ic} style={{ height: 36, fontSize: 12, padding: '0 10px', borderRadius: T.rCtl }}>{q}</T.Btn>)}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>{d.colours.map(n => <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}><span style={{ width: 10, height: 10, borderRadius: 5, background: XD.cols[n] }} />{n}<span style={{ flex: 1 }} /><T.Step v={qty[n]} /></div>)}</div>
      </div>
    </div>
  </div>;
}

/* 7 · Full-screen viewer. Opens from an image tap on the scan pop-up or either product page, or a double tap on a
   grid photo. Swipes the design's colours first, then its media. Everything that floats is dark glass, rounded.
   Real gesture: 1:1 drag with pointer capture, release velocity projected to the nearest slide, critically damped
   spring from the current value (interruptible), rubber-band at the ends, reduced-motion snaps. */
function ScreenViewer({ T }) {
  const d = XD.designs[0];
  const slides = [
    ...d.colours.map(n => ({ kind: 'colour', name: n, src: n === d.colours[0] ? d.src : null, fill: XD.cols[n] })),
    { kind: 'media', name: 'Video', src: XD.A + 'samples/2006-lavender.jpg', icon: 'play' },
    { kind: 'media', name: 'Photoshoot', src: XD.A + 'samples/6002-lilac.jpg', icon: 'camera' },
    { kind: 'media', name: 'Side profile', src: XD.A + 'samples/4566-blush.jpg', icon: 'camera' }];
  const W = 390, N = slides.length, NC = d.colours.length;
  const [i, setI] = React.useState(0);
  const trackEl = React.useRef(null); const st = React.useRef({ x: 0, v: 0, target: 0, drag: null, raf: 0, hist: [] });
  const apply = x => { if (trackEl.current) trackEl.current.style.transform = `translate3d(${x}px,0,0)`; };
  const settle = () => { const s = st.current; cancelAnimationFrame(s.raf); if (REDUCED) { s.x = s.target; s.v = 0; apply(s.x); return; }
    let last = performance.now(); const w = 2 * Math.PI / 0.36;
    const step = now => { const dt = Math.min(48, now - last) / 1000; last = now; const a = -w * w * (s.x - s.target) - 2 * w * s.v; s.v += a * dt; s.x += s.v * dt;
      if (Math.abs(s.x - s.target) < .3 && Math.abs(s.v) < 8) { s.x = s.target; s.v = 0; apply(s.x); return; } apply(s.x); s.raf = requestAnimationFrame(step); };
    s.raf = requestAnimationFrame(step); };
  const rubber = (over, dim = W, c = .55) => (over * dim * c) / (dim + c * Math.abs(over));
  const onDown = e => { const s = st.current; cancelAnimationFrame(s.raf); try { e.currentTarget.setPointerCapture(e.pointerId); } catch (_) { } s.drag = { x0: e.clientX, start: s.x }; s.hist = [[e.clientX, performance.now()]]; };
  const onMove = e => { const s = st.current; if (!s.drag) return; let nx = s.drag.start + (e.clientX - s.drag.x0); const min = -(N - 1) * W; if (nx > 0) nx = rubber(nx); else if (nx < min) nx = min + rubber(nx - min); s.x = nx; apply(nx); s.hist.push([e.clientX, performance.now()]); if (s.hist.length > 6) s.hist.shift(); };
  const onUp = () => { const s = st.current; if (!s.drag) return; s.drag = null; const h = s.hist; let vel = 0; if (h.length > 1) { const [x1, t1] = h[0], [x2, t2] = h[h.length - 1]; vel = (x2 - x1) / Math.max(1, t2 - t1) * 1000; }
    s.v = vel; const proj = s.x + (vel / 1000) * 0.998 / (1 - 0.998); const idx = Math.max(0, Math.min(N - 1, Math.round(-proj / W))); s.target = -idx * W; setI(idx); settle(); };
  const go = idx => { const s = st.current; s.target = -idx * W; setI(idx); settle(); };
  const cur = slides[i]; const isColour = cur.kind === 'colour';
  const R = T.rDock - 4;
  return <div style={{ position: 'relative', height: '100%', background: '#0B0A09', overflow: 'hidden', fontFamily: T.fontUI, color: '#fff', touchAction: 'pan-y', userSelect: 'none' }}>
    <div ref={trackEl} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: N * W, display: 'flex', willChange: 'transform', cursor: 'grab' }}>
      {slides.map((s, k) => <div key={k} style={{ width: W, height: '100%', position: 'relative', background: s.fill || '#0B0A09', flex: 'none' }}>
        {s.src ? <img draggable={false} src={s.src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }} /> : <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center' }}><div><div style={{ fontFamily: T.fontDisplay, fontSize: 44, fontWeight: dispW(T), color: 'rgba(255,255,255,.92)', letterSpacing: track(44) }}>{d.code}</div><div style={{ fontSize: 13, color: 'rgba(255,255,255,.75)', marginTop: 6 }}>{s.name} · photo pending</div></div></div>}
        {s.icon === 'play' && <span style={{ position: 'absolute', left: '50%', top: '44%', transform: 'translate(-50%,-50%)', width: 72, height: 72, borderRadius: '50%', ...smoke(), display: 'grid', placeItems: 'center' }}><Ic name="play" size={28} sw={2} /></span>}
      </div>)}
    </div>
    {/* position thread: one segment per slide; colour segments carry their colour, media segments are light */}
    <div style={{ position: 'absolute', left: 20, right: 20, top: 52, display: 'flex', gap: 4, height: 2 }}>{slides.map((s, k) => <span key={k} style={{ flex: 1, borderRadius: 2, background: s.fill || 'rgba(255,255,255,.9)', opacity: k === i ? 1 : .3 }} />)}</div>
    <div style={{ position: 'absolute', left: 14, top: 64 }}><Hit T={T} icon="chevron-left" style={smoke()} /></div>
    <div style={{ position: 'absolute', right: 14, top: 64, display: 'flex', flexDirection: 'column', gap: 8 }}><Hit T={T} icon="share-2" style={smoke()} /><Hit T={T} icon="shopping-bag" count={8} style={smoke()} /></div>
    <div style={{ position: 'absolute', left: 14, right: 14, bottom: 22, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, padding: '0 8px 2px', textShadow: '0 1px 10px rgba(0,0,0,.7)' }}>
        <span style={{ fontFamily: T.fontMono, fontSize: 12, opacity: .8 }}>{d.code}</span><span style={{ fontFamily: T.fontDisplay, fontSize: 21, fontWeight: dispW(T), letterSpacing: track(21) }}>{d.name}</span><span style={{ flex: 1 }} />
        <span style={{ fontSize: 12.5, opacity: .95, display: 'inline-flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap' }}><Ic name="check" size={12} sw={2.4} color="#8FD3A7" />{isColour ? `${cur.name} · ${i + 1} of ${NC} colours` : `${cur.name} · media ${i - NC + 1} of ${N - NC}`}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 8, borderRadius: R, ...smoke(T.viewerNoCart ? { background: 'rgba(20,18,17,.62)', border: '1px solid rgba(255,255,255,.14)' } : {}), overflow: 'hidden' }}>
        {slides.map((s, k) => { const on = k === i; const first = s.kind === 'media' && slides[k - 1].kind === 'colour'; return <React.Fragment key={k}>
          {first && <span style={{ width: 1, height: 40, background: 'rgba(255,255,255,.25)', flex: 'none', margin: '0 2px' }} />}
          <span className="press" onClick={() => go(k)} style={{ position: 'relative', width: on ? 52 : 40, height: on ? 64 : 50, borderRadius: 12, overflow: 'hidden', background: s.fill || '#333', flex: 'none', boxShadow: on ? '0 0 0 1.5px rgba(255,255,255,.95)' : 'none', opacity: on ? 1 : .8, transition: REDUCED ? 'none' : 'width 200ms cubic-bezier(.2,.7,.2,1), height 200ms cubic-bezier(.2,.7,.2,1)' }}>
            {s.src && <img src={s.src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
            {s.icon && <span style={{ position: 'absolute', right: 3, bottom: 3, width: 16, height: 16, borderRadius: 8, background: 'rgba(0,0,0,.6)', display: 'grid', placeItems: 'center' }}><Ic name={s.icon} size={9} sw={2.2} /></span>}
          </span>
        </React.Fragment>; })}
      </div>
      {!T.viewerNoCart && <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 8px 8px 18px', borderRadius: R, ...smoke() }}>
        <span style={{ fontSize: 12, opacity: .8, lineHeight: 1.3 }}>Cart A<br /><b style={{ fontWeight: 600, opacity: 1 }}>Ramleela</b></span><span style={{ flex: 1 }} />
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><span className="press" style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid rgba(255,255,255,.35)', display: 'grid', placeItems: 'center' }}><Ic name="minus" size={15} /></span><span style={{ fontFamily: T.fontDisplay, fontSize: 18, fontWeight: dispW(T), minWidth: 18, textAlign: 'center' }}>2</span><span className="press" style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,.18)', border: '1px solid rgba(255,255,255,.35)', display: 'grid', placeItems: 'center' }}><Ic name="plus" size={15} /></span></span>
        <button className="press" style={{ height: 44, padding: '0 18px', borderRadius: 999, border: 0, background: 'rgba(255,255,255,.92)', color: '#17171A', fontFamily: T.fontUI, fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: 6 }}><Ic name="plus" size={15} sw={2.2} />Add {isColour ? cur.name : d.colours[0]}</button>
      </div>}
    </div>
  </div>;
}

/* 8 · Cart card. Double tap on a cart chip opens the customer's cart as a floating card over the catalogue, never
   more than half the screen: compressed list rows (thumb, highlighted design no, colour, rate), a stepper and a
   clear button per line, totals, and the two cart actions. The list scrolls inside the card. */
function ScreenCartCard({ T }) {
  const lines = CART_LINES2.map(([c, col, q]) => ({ d: XD.byCode[c], col, q }));
  const pcs = lines.reduce((s, l) => s + l.q, 0), total = lines.reduce((s, l) => s + l.q * (l.d.price || 0), 0);
  const hi = { fontFamily: T.fontMono, fontSize: 12.5, fontWeight: 600, color: T.ink, background: T.accentSoft, padding: '2px 6px', borderRadius: 6 };
  return frame2(T, <GridBody T={T} />, <>
    {scrim(T)}
    <T.Dock active="Catalogue" cart="A" />
    <div style={{ position: 'absolute', left: 12, right: 12, bottom: T.cardBottom || (T.island ? 152 : 134), height: 396, borderRadius: T.rDock, background: T.surface, border: `1px solid ${T.line}`, boxShadow: '0 30px 60px -20px rgba(0,0,0,.55)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 14px 8px 16px' }}>
        <span style={{ width: 32, height: 32, borderRadius: 16, background: T.accent, color: T.onAccent, display: 'grid', placeItems: 'center', fontFamily: T.fontDisplay, fontSize: 15, fontWeight: 600 }}>A</span>
        <span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 18, fontWeight: dispW(T), color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Ramleela Fashion</div><div style={{ fontSize: 11.5, color: T.ink3, marginTop: 1 }}>Surat · In-cabin · {pcs} pcs · ₹{total.toLocaleString('en-IN')}</div></span>
        <Hit T={T} icon="x" size={36} iconSize={17} style={{ background: T.bg2 }} />
      </div>
      <div style={{ position: 'relative', flex: 1, minHeight: 0, overflow: 'hidden' }}>
        <div style={{ padding: '0 10px' }}>{lines.map((l, i) => <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 4px', borderTop: i ? `1px solid ${T.line}` : 0 }}>
          <div style={{ width: 34, height: 44, borderRadius: 8, overflow: 'hidden', flex: 'none', background: l.col === l.d.colours[0] ? T.photoBg : XD.cols[l.col] }}>{l.col === l.d.colours[0] && l.d.src && <img src={l.d.src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={hi}>{l.d.code}</span><span style={{ fontSize: 12.5, color: T.ink2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.d.name}</span></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4, fontSize: 11.5, color: T.ink3, whiteSpace: 'nowrap' }}><span style={{ width: 8, height: 8, borderRadius: 4, background: XD.cols[l.col] }} />{l.col}<span>· {l.d.price ? '₹' + l.d.price.toLocaleString('en-IN') : 'TBD'}</span></div>
          </div>
          <T.Step v={l.q} />
          <span className="press" style={{ width: 30, height: 30, borderRadius: 15, display: 'grid', placeItems: 'center', color: T.ink3 }}><Ic name="x" size={14} /></span>
        </div>)}</div>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 36, background: `linear-gradient(180deg, transparent, ${T.surface})`, pointerEvents: 'none' }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px 14px', borderTop: `1px solid ${T.line}` }}>
        <T.Btn kind="secondary" small icon="trash-2" style={{ height: 40 }}>Clear cart</T.Btn><span style={{ flex: 1 }} /><T.Btn small icon="check" style={{ height: 40 }}>Submit for approval</T.Btn>
      </div>
    </div>
  </>);
}

/* 9 · Side menu (top-right button). Every ERP module as a collapsible section with its sub-menus, from the BRD.
   Catalogue is open because that is where the user is; the bottom carries theme and profile (BRD side-pane bar). */
function ScreenSideMenu({ T }) {
  const open = 'Catalogue', here = 'Catalogue';
  return frame2(T, <GridBody T={T} />, <>
    {scrim(T)}
    <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 318, background: T.surface, borderRadius: '28px 0 0 28px', boxShadow: '-20px 0 60px -20px rgba(0,0,0,.5)', display: 'flex', flexDirection: 'column', paddingTop: 54, borderLeft: `1px solid ${T.line}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px 12px 18px' }}>
        <span style={{ width: 40, height: 40, borderRadius: 20, background: T.accentSoft, color: T.accent, display: 'grid', placeItems: 'center', fontFamily: T.fontDisplay, fontSize: 15, fontWeight: 600 }}>RM</span>
        <span style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 14.5, fontWeight: 600, color: T.ink }}>Rohan Mehta</div><div style={{ fontSize: 11.5, color: T.ink3, marginTop: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Sale manager · Shree Radha Studio</div></span>
        <Hit T={T} icon="x" size={36} iconSize={17} style={{ background: T.bg2 }} />
      </div>
      <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', padding: '0 10px' }}>
        {MENU.map(([ic, m, subs]) => { const isOpen = m === open; return <div key={m} style={{ borderRadius: T.rCtl, background: isOpen ? T.bg2 : 'transparent', marginBottom: isOpen ? 4 : 0, boxShadow: isOpen ? `inset 3px 0 0 ${T.accent}` : 'none' }}>
          <div className="press" style={{ display: 'flex', alignItems: 'center', gap: 12, height: 44, padding: '0 10px', color: T.ink }}>
            <Ic name={ic} size={18} sw={1.7} color={isOpen ? T.accent : T.ink2} /><span style={{ flex: 1, fontSize: 14, fontWeight: isOpen ? 600 : 500, color: isOpen ? T.accent : T.ink }}>{m}</span>
            {m === here && <span style={{ fontSize: 10.5, color: T.ink3, letterSpacing: '.06em', textTransform: 'uppercase' }}>here</span>}<span style={{ fontSize: 11, color: T.ink3, fontVariantNumeric: 'tabular-nums' }}>{subs.length}</span><Ic name={isOpen ? 'chevron-up' : 'chevron-down'} size={15} color={T.ink3} />
          </div>
          {isOpen && <div style={{ padding: '0 10px 8px 40px' }}>{subs.map(s => <div key={s} className="press" style={{ display: 'flex', alignItems: 'center', gap: 10, height: 36, fontSize: 13.5, color: T.ink, borderTop: `1px solid ${T.line}` }}>{s}<span style={{ flex: 1 }} /><Ic name="chevron-right" size={13} color={T.ink3} /></div>)}</div>}
        </div>; })}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px 26px 18px', borderTop: `1px solid ${T.line}` }}>
        <span style={{ display: 'inline-flex', padding: 2, borderRadius: 999, background: T.bg2 }}>{[['sun', !T.dark], ['moon', T.dark]].map(([ic, on]) => <span key={ic} className="press" style={{ width: 34, height: 28, borderRadius: 14, display: 'grid', placeItems: 'center', background: on ? T.surface : 'transparent', color: on ? T.ink : T.ink3, boxShadow: on ? '0 1px 2px rgba(0,0,0,.12)' : 'none' }}><Ic name={ic} size={15} /></span>)}</span>
        <T.Chip icon="user">Profile</T.Chip><Hit T={T} icon="settings" size={32} iconSize={16} style={{ background: T.bg2, color: T.ink2 }} /><span style={{ flex: 1 }} /><span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: T.ink3 }}><Ic name="log-out" size={14} />Sign out</span>
      </div>
    </div>
  </>);
}
Object.assign(window, { ScreenGrid2, ScreenProductCustomer2, ScreenScan2, ScreenViewer, ScreenCartCard, ScreenSideMenu, GridBody, CATS2, MENU });
