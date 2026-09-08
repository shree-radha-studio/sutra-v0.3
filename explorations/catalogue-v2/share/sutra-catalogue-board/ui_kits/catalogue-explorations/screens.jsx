/* Catalogue module screens, built from the BRD, rendered through a theme T. */
const S = {
  photo: (T, d, colour, style) => { const primary = !colour || colour === d.colours[0]; return <div style={{ position: 'relative', overflow: 'hidden', background: primary ? T.photoBg : XD.cols[colour], ...style }}>{primary && d.src ? <img src={d.src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /> : <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontFamily: T.fontMono, fontSize: 11, color: primary ? T.ink3 : 'rgba(255,255,255,.9)' }}>{d.code}</div>}</div>; },
  h: (T, txt, right) => <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, padding: '0 20px', marginTop: 16 }}><span style={{ fontFamily: T.fontUI, fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: T.ink3, whiteSpace: 'nowrap' }}>{txt}</span><span style={{ flex: 1 }} />{right}</div>,
  card: (T, children, style) => <div style={{ margin: '10px 16px 0', padding: 14, borderRadius: T.rCard, background: T.surface, border: `1px solid ${T.line}`, ...style }}>{children}</div>,
  glassBtn: (T, icon) => <span style={{ width: 40, height: 40, borderRadius: T.dark ? 14 : '50%', background: T.dark ? 'rgba(23,17,14,.55)' : T.glass, backdropFilter: 'blur(14px)', border: T.dark ? '1px solid rgba(255,255,255,.08)' : '1px solid rgba(255,255,255,.6)', display: 'grid', placeItems: 'center', color: T.ink }}><Ic name={icon} size={18} /></span>,
  frame: (T, children, bottom) => <div style={{ position: 'relative', height: '100%', background: T.bg, color: T.ink, overflow: 'hidden', fontFamily: T.fontUI }}>{T.dark && <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 60% at 50% -10%, rgba(216,179,106,.10), transparent 60%)', pointerEvents: 'none' }} />}<div style={{ position: 'relative', height: '100%', overflow: 'hidden', paddingTop: 54 }}>{children}</div>{bottom}</div>,
};
const CATS = ['All', 'Samples', 'Lehenga', 'Saree', 'Plazo'];

function ScreenGrid({ T }) {
  const list = XD.designs.slice(0, 6); const inCart = { '2798': 2, '6002': 1 };
  return S.frame(T, <>
    <T.TopBar role="Sales" />
    <T.Cats items={CATS} active="All" title={T.dark ? 'Catalogue' : undefined} />
    <div style={{ display: 'flex', gap: 6, padding: '12px 20px 0', overflow: 'hidden' }}><T.Chip x>Top 30</T.Chip><T.Chip x>Delhi</T.Chip><T.Chip x>Zari work</T.Chip><T.Chip icon="sliders-horizontal">Filters</T.Chip><T.Chip icon="arrow-down-up">Featured</T.Chip></div>
    <div style={{ display: 'flex', alignItems: 'center', padding: '14px 20px 0' }}><span style={{ fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: T.ink3, whiteSpace: 'nowrap' }}>15 designs</span><span style={{ flex: 1 }} /><span style={{ display: 'inline-flex', gap: 14, color: T.ink3 }}><Ic name="layout-grid" size={16} color={T.ink} /><Ic name="list" size={16} /></span></div>
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: T.dark ? '14px 12px' : '20px 14px', padding: '12px 16px 260px', alignItems: 'start' }}>
      {list.map((d, i) => <div key={d.code} style={{ marginTop: T.dark && i % 2 ? 34 : 0 }}><T.GridCard d={d} inCart={inCart[d.code]} tall={T.dark && i % 2 === 0} /></div>)}
    </div>
  </>, <div style={{ position: 'absolute', left: 0, right: 0, bottom: 24, display: 'flex', flexDirection: 'column', gap: 12 }}><T.CartTray active="A" /><T.BottomBar active="Catalogue" /></div>);
}

function ScreenProductCustomer({ T }) {
  const d = XD.designs[0]; const colour = 'Sky';
  return S.frame(T, <div style={{ height: '100%', overflow: 'hidden', marginTop: -54 }}>
    <div style={{ position: 'relative', height: 462, borderRadius: T.dark ? `0 0 ${T.rPhoto + 10}px ${T.rPhoto + 10}px` : '0 0 28px 28px', overflow: 'hidden', background: T.photoBg }}>
      <img src={d.src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      <div style={{ position: 'absolute', left: 16, right: 16, top: 60, display: 'flex', gap: 8 }}>{S.glassBtn(T, 'chevron-left')}<span style={{ flex: 1 }} />{S.glassBtn(T, 'maximize-2')}{S.glassBtn(T, 'share-2')}</div>
      <div style={{ position: 'absolute', left: 16, bottom: 16, display: 'flex', gap: 8, alignItems: 'center', padding: '8px 12px', borderRadius: T.dark ? 14 : 8, background: 'rgba(31,22,19,.55)', backdropFilter: 'blur(10px)', color: '#fff', fontSize: 12 }}><T.Bars names={d.colours} active={colour} light />{colour}</div>
      <div style={{ position: 'absolute', right: 16, bottom: 16, display: 'flex', gap: 6 }}><span style={{ padding: '6px 10px', borderRadius: 999, background: T.dark ? T.ink : T.glass, backdropFilter: 'blur(10px)' }}><T.Tag>{d.tag}</T.Tag></span></div>
    </div>
    <div style={{ padding: '18px 20px 0' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}><span style={{ fontFamily: T.fontMono, fontSize: 13, color: T.ink3 }}>{d.code}</span><span style={{ fontFamily: T.fontDisplay, fontSize: T.dark ? 34 : 30, color: T.ink, flex: 1 }}>{d.name}</span><Price v={d.price} size={30} font={T.fontSerif} color={T.ink} dim={T.ink3} /></div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8, fontSize: 13, color: T.ink3 }}>{d.cat} · {d.colours.length} colours<span style={{ flex: 1 }} /><T.Tag tone="danger">{d.note}</T.Tag></div>
      <div style={{ display: 'flex', gap: 12, marginTop: 18 }}>{d.colours.map(n => <div key={n} style={{ width: 66 }}>{S.photo(T, d, n, { width: 66, height: 82, borderRadius: T.dark ? 16 : 8, boxShadow: n === colour ? `0 0 0 2px ${T.bg}, 0 0 0 3.5px ${T.dark ? T.ink : T.accent}` : 'none' })}<div style={{ fontSize: 11.5, textAlign: 'center', marginTop: 7, color: n === colour ? T.ink : T.ink3 }}>{n}</div></div>)}</div>
    </div>
    <div style={{ position: 'absolute', left: 16, right: 16, bottom: 24, display: 'flex', alignItems: 'center', gap: 12, padding: T.dark ? '10px 10px 10px 18px' : '10px 10px 10px 16px', borderRadius: T.dark ? 28 : 999, background: T.dark ? T.surface : T.glass, backdropFilter: 'blur(18px)', border: `1px solid ${T.dark ? T.line : 'rgba(255,255,255,.6)'}`, boxShadow: T.shadow }}>
      <span style={{ fontSize: 12, color: T.ink2, lineHeight: 1.3 }}>Cart A<br /><b style={{ fontWeight: 500, color: T.ink }}>Ramleela</b></span><span style={{ flex: 1 }} /><T.Step v={2} big /><T.Btn icon="plus">Add {colour}</T.Btn>
    </div>
  </div>);
}

function ScreenProductSales({ T }) {
  const d = XD.designs[0];
  const stock = { Sky: [20, 4, 30, '30/07'], Purple: [2, 0, 0, '—'], Seagreen: [5, 1, 10, '30/07'], Peach: [15, 0, 0, '—'] };
  const cell = (v, danger) => <span style={{ textAlign: 'center', fontSize: 13, fontWeight: 500, color: v === 0 || v === '—' ? T.ink3 : danger ? T.danger : T.ink }}>{v}</span>;
  return S.frame(T, <>
    <div style={{ display: 'flex', alignItems: 'center', padding: '0 16px', height: 44, gap: 8 }}><span style={{ width: 36, height: 36, display: 'grid', placeItems: 'center', color: T.ink }}><Ic name="chevron-left" size={20} /></span><span style={{ fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: T.ink3, flex: 1 }}>Salesperson view</span><span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, color: T.ink2 }}>Customer mode<span style={{ width: 34, height: 20, borderRadius: 10, background: T.line2, position: 'relative' }}><span style={{ position: 'absolute', left: 2, top: 2, width: 16, height: 16, borderRadius: 8, background: T.surface }} /></span></span></div>
    <div style={{ display: 'flex', gap: 14, padding: '6px 20px 0' }}>
      {S.photo(T, d, null, { width: 118, height: 150, borderRadius: T.rPhoto, flex: 'none' })}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><span style={{ fontFamily: T.fontMono, fontSize: 12, color: T.ink3 }}>{d.code}</span><span style={{ fontFamily: T.fontDisplay, fontSize: 24, color: T.ink }}>{d.name}</span></div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 4 }}><Price v={d.price} size={22} font={T.fontSerif} color={T.ink} dim={T.ink3} lead={false} /><span style={{ fontSize: 12, color: T.ink3 }}>· cost ₹2,610 · 40% GM</span></div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}><T.Tag>Top 30</T.Tag><T.Tag tone="danger">Low stock</T.Tag><T.Tag tone="gold">Priority sell</T.Tag><T.Tag tone="muted">Zari work</T.Tag><T.Tag tone="muted">Delhi · UP · MH</T.Tag><T.Tag tone="ok">Rank 12</T.Tag></div>
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}><T.Btn kind="secondary" small icon="upload">Media</T.Btn><T.Btn kind="secondary" small icon="tags">Set tag</T.Btn></div>
      </div>
    </div>
    {S.h(T, 'Stock by colour', <span style={{ fontSize: 11, color: T.ink3, whiteSpace: 'nowrap' }}>godown · reserved · in prod · due</span>)}
    {S.card(T, <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr 1fr 1fr 1.1fr', rowGap: 6, alignItems: 'center' }}>
      {['', 'Stock', 'Rsv', 'Prod', 'Due'].map(h => <span key={h} style={{ fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: T.ink3, textAlign: h ? 'center' : 'left' }}>{h}</span>)}
      {d.colours.map(n => <React.Fragment key={n}><span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, color: T.ink }}><span style={{ width: 10, height: 10, borderRadius: T.dark ? 5 : 2, background: XD.cols[n] }} />{n}</span>{cell(stock[n][0], stock[n][0] < 5)}{cell(stock[n][1])}{cell(stock[n][2])}{cell(stock[n][3])}</React.Fragment>)}
    </div>)}
    {S.h(T, 'Production · PO-1187 · 40 pcs')}
    {S.card(T, <Timeline steps={['Dye', 'Embroidery', 'Stitching', 'Finishing']} done={2} active={2} T={T} />)}
    {S.h(T, 'Recipe · per pc', <span style={{ fontSize: 11, color: T.ink3 }}>live godown stock</span>)}
    {S.card(T, RECIPE.map(([m, q, st, ok], i) => <div key={m} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '7px 0', borderTop: i ? `1px solid ${T.line}` : 0 }}><span style={{ width: 34, height: 34, borderRadius: T.dark ? 10 : 6, background: T.photoBg, display: 'grid', placeItems: 'center', fontFamily: T.fontMono, fontSize: 8, color: T.ink3 }}>MAT</span><span style={{ flex: 1, fontSize: 13.5, color: T.ink }}>{m}</span><span style={{ fontSize: 12.5, color: T.ink2 }}>{q}</span><span style={{ fontSize: 12.5, fontWeight: 500, minWidth: 48, textAlign: 'right', color: ok ? T.ok : T.danger }}>{st}</span></div>), { paddingTop: 6, paddingBottom: 6 })}
  </>);
}

function ScreenAnalytics({ T }) {
  const d = XD.designs[0]; const gridc = T.dark ? 'rgba(241,232,220,.12)' : 'rgba(31,22,19,.12)';
  const tabs = ['All', 'Approved & pending', 'Dispatched'];
  return S.frame(T, <>
    <div style={{ display: 'flex', alignItems: 'center', padding: '0 16px', height: 44, gap: 8 }}><span style={{ width: 36, height: 36, display: 'grid', placeItems: 'center', color: T.ink }}><Ic name="chevron-left" size={20} /></span><span style={{ fontFamily: T.fontDisplay, fontSize: 20, color: T.ink, whiteSpace: 'nowrap' }}>{d.name}</span><span style={{ fontFamily: T.fontMono, fontSize: 12, color: T.ink3 }}>{d.code}</span><span style={{ flex: 1 }} /><span style={{ fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: T.ink3 }}>Analytics</span></div>
    {S.h(T, 'Demand score', <span style={{ fontFamily: T.fontDisplay, fontSize: 22, color: T.ink }}>78</span>)}
    {S.card(T, <Line series={[{ pts: SERIES.demand, color: T.dark ? T.gold : T.accent, width: 2 }]} h={52} grid={gridc} />, { padding: '10px 14px 6px' })}
    {S.h(T, 'Last month · pcs', <span style={{ display: 'inline-flex', gap: 10 }}>{d.colours.map(n => <span key={n} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10.5, color: T.ink3 }}><span style={{ width: 8, height: 8, borderRadius: 4, background: XD.cols[n] }} />{n}</span>)}</span>)}
    {S.card(T, <Line series={[{ pts: SERIES.month.all, color: T.ink, width: 2.4 }, ...d.colours.map(n => ({ pts: SERIES.month[n], color: XD.cols[n], width: 1.4 }))]} h={76} grid={gridc} />, { padding: '10px 14px 6px' })}
    {S.h(T, 'Lifelong · 360 pcs · ₹17.9L')}
    {S.card(T, <Line series={[{ pts: SERIES.life, color: T.ink, width: 2 }]} h={44} grid={gridc} />, { padding: '10px 14px 6px' })}
    {S.h(T, 'Media centre', <span style={{ fontSize: 11, color: T.accent }}>Upload →</span>)}
    {S.card(T, <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{MEDIA.map(([m, c, ok]) => <span key={m} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 28, padding: '0 10px', borderRadius: 999, background: T.dark ? T.surface2 : T.bg2, fontSize: 12, color: ok ? T.ink : T.ink3 }}><Ic name={ok ? 'check' : 'circle-dashed'} size={12} color={ok ? T.ok : T.ink3} />{m} <b style={{ fontWeight: 500 }}>{c}</b></span>)}</div>, { padding: 12 })}
    {S.h(T, 'Sale orders', <span style={{ display: 'inline-flex', gap: 12 }}>{tabs.map((t, i) => <span key={t} style={{ fontSize: 11.5, color: i === 0 ? T.ink : T.ink3, borderBottom: i === 0 ? `1.5px solid ${T.accent}` : '1.5px solid transparent', paddingBottom: 3 }}>{t}</span>)}</span>)}
    {S.card(T, ORDERS.map((o, i) => <div key={o[0]} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderTop: i ? `1px solid ${T.line}` : 0, fontSize: 13 }}><span style={{ fontFamily: T.fontMono, fontSize: 12, color: T.ink2 }}>{o[0]}</span><span style={{ flex: 1, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{o[1]}</span><span style={{ color: T.ink3, fontSize: 12 }}>{o[2]}</span><T.Tag tone={o[3] === 'Dispatched' ? 'ok' : o[3] === 'Pending' ? 'gold' : 'muted'}>{o[3]}</T.Tag><span style={{ fontWeight: 500, minWidth: 22, textAlign: 'right' }}>×{o[4]}</span></div>), { paddingTop: 4, paddingBottom: 4 })}
  </>);
}

function ScreenScan({ T }) {
  const d = XD.designs[1]; const qty = { Lilac: 1, Blush: 0 };
  const quick = ['Add pc', 'Add colour set', 'Pc to all carts', 'Set to all carts'];
  return <div style={{ position: 'relative', height: '100%', background: '#0B0908', overflow: 'hidden', fontFamily: T.fontUI, color: T.ink }}>
    <img src={XD.A + 'samples/2006-lavender.jpg'} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: .55, filter: 'blur(1px)' }} />
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.55)' }} />
    <div style={{ position: 'absolute', top: 66, left: 16 }}>{S.glassBtn(GALLERY, 'chevron-left')}</div>
    <div style={{ position: 'absolute', right: 16, bottom: 40, display: 'inline-flex', alignItems: 'center', gap: 8, height: 40, padding: '0 14px', borderRadius: 999, border: '1.5px solid #4CCB7A', color: '#fff', fontSize: 12.5, background: 'rgba(0,0,0,.4)', whiteSpace: 'nowrap' }}><Ic name="plus-circle" size={15} color="#4CCB7A" />Scan to add · on</div>
    <div style={{ position: 'absolute', left: 26, right: 26, top: 118, bottom: 112, borderRadius: T.dark ? 30 : 22, background: T.bg, boxShadow: '0 40px 80px -20px rgba(0,0,0,.8)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative', height: '52%', background: T.photoBg }}>
        <img src={d.src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', left: 12, right: 12, bottom: 12, padding: '8px 12px', borderRadius: T.dark ? 14 : 8, background: 'rgba(0,0,0,.6)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', gap: 10, color: '#fff', fontSize: 12 }}>{d.colours.map(n => <span key={n} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 6, height: 16, borderRadius: 2, background: XD.cols[n] }} />{n}</span>)}<span style={{ flex: 1 }} /><span style={{ opacity: .7 }}>1 / 2 · swipe</span></div>
        <div style={{ position: 'absolute', top: 12, left: 12 }}><span style={{ padding: '6px 10px', borderRadius: 999, background: T.dark ? T.ink : T.glass }}><T.Tag>{d.tag}</T.Tag></span></div>
      </div>
      <div style={{ padding: '12px 16px 14px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><span style={{ fontFamily: T.fontMono, fontSize: 12, color: T.ink3 }}>{d.code}</span><span style={{ fontFamily: T.fontDisplay, fontSize: 20, flex: 1 }}>{d.name}</span><Price v={d.price} size={20} font={T.fontSerif} color={T.ink} dim={T.ink3} /></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: T.ink3 }}>{d.cat} · Godown 12 · Reserved 3<span style={{ flex: 1 }} /><span style={{ color: T.accent, fontSize: 12.5 }}>Go to product →</span></div>
        <div style={{ display: 'flex', gap: 6 }}>{CARTS.map(c => <T.Chip key={c.k} on={c.k === 'A'}>{c.k} · {c.name.split(' ')[0]}</T.Chip>)}</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>{quick.map((q, i) => <T.Btn key={q} kind={i === 0 ? 'primary' : 'secondary'} small style={{ height: 34, fontSize: 12 }}>{q}</T.Btn>)}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>{d.colours.map(n => <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}><span style={{ width: 10, height: 10, borderRadius: T.dark ? 5 : 2, background: XD.cols[n] }} />{n}<span style={{ flex: 1 }} /><T.Step v={qty[n]} /></div>)}</div>
      </div>
    </div>
  </div>;
}

function ScreenCarts({ T }) {
  const lines = CART_LINES.map(([c, col, q]) => ({ d: XD.byCode[c], col, q }));
  const total = lines.reduce((s, l) => s + l.q * l.d.price, 0), pcs = lines.reduce((s, l) => s + l.q, 0);
  return S.frame(T, <>
    <div style={{ display: 'flex', alignItems: 'center', padding: '0 20px', height: 44 }}><span style={{ fontFamily: T.fontDisplay, fontSize: T.dark ? 30 : 26, color: T.ink }}>Carts</span><span style={{ flex: 1 }} /><T.Chip icon="user-plus">New customer</T.Chip></div>
    <div style={{ display: 'flex', gap: 8, padding: '12px 20px 0', overflow: 'hidden' }}>{CARTS.map(c => <span key={c.k} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 40, padding: '0 14px 0 5px', borderRadius: 999, background: c.k === 'A' ? (T.dark ? T.gold : T.accent) : T.surface, color: c.k === 'A' ? (T.dark ? T.bg : T.onAccent) : T.ink, border: `1px solid ${c.k === 'A' ? 'transparent' : T.line2}`, fontSize: 12.5, whiteSpace: 'nowrap', flex: 'none' }}><span style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(0,0,0,.14)', display: 'grid', placeItems: 'center', fontFamily: T.fontDisplay, fontSize: 14 }}>{c.k}</span>{c.name.split(' ')[0]} <span style={{ opacity: .65 }}>{c.n}</span></span>)}</div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px 0' }}><span style={{ minWidth: 0 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 20, color: T.ink, whiteSpace: 'nowrap' }}>Ramleela Fashion</div><div style={{ fontSize: 12, color: T.ink3, marginTop: 2, whiteSpace: 'nowrap' }}>Surat · 30 days credit</div></span><span style={{ flex: 1 }} /><span style={{ display: 'inline-flex', padding: 3, borderRadius: 999, background: T.dark ? T.surface : T.bg2, flex: 'none' }}>{['In-cabin', 'WhatsApp'].map((b, i) => <span key={b} style={{ height: 28, padding: '0 12px', borderRadius: 999, display: 'grid', placeItems: 'center', fontSize: 12, whiteSpace: 'nowrap', background: i === 0 ? (T.dark ? T.ink : T.surface) : 'transparent', color: i === 0 ? (T.dark ? T.bg : T.ink) : T.ink3, boxShadow: i === 0 && !T.dark ? '0 1px 2px rgba(0,0,0,.08)' : 'none' }}>{b}</span>)}</span></div>
    <div style={{ padding: '14px 16px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>{lines.map((l, i) => <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: T.dark ? 10 : '10px 12px', borderRadius: T.rCard, background: T.surface, border: `1px solid ${T.line}` }}>
      {S.photo(T, l.d, l.col, { width: 56, height: 70, borderRadius: T.dark ? 14 : 6, flex: 'none' })}
      <div style={{ flex: 1, minWidth: 0 }}><div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><span style={{ fontFamily: T.fontMono, fontSize: 12, color: T.ink3 }}>{l.d.code}</span><span style={{ fontFamily: T.fontDisplay, fontSize: 17, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.d.name}</span></div><div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4, fontSize: 12.5, color: T.ink2, whiteSpace: 'nowrap' }}><span style={{ width: 9, height: 9, borderRadius: T.dark ? 5 : 2, background: XD.cols[l.col], flex: 'none' }} />{l.col}<span style={{ color: T.ink3, flex: 'none' }}>· ₹{l.d.price.toLocaleString('en-IN')}</span></div><div style={{ marginTop: 8 }}><T.Step v={l.q} /></div></div>
      <Price v={l.q * l.d.price} size={17} font={T.fontSerif} color={T.ink} dim={T.ink3} lead={false} />
    </div>)}</div>
    <div style={{ margin: '14px 16px 0', padding: '12px 14px', borderRadius: T.rCard, border: `1px dashed ${T.line2}`, fontSize: 12.5, color: T.ink3 }}>Note for approval · “2018 ke red ka stock check karna hai”</div>
  </>, <div style={{ position: 'absolute', left: 16, right: 16, bottom: 24, padding: 14, borderRadius: T.dark ? 28 : 20, background: T.dark ? T.surface : T.glass, backdropFilter: 'blur(18px)', border: `1px solid ${T.dark ? T.line : 'rgba(255,255,255,.6)'}`, boxShadow: T.shadow, display: 'flex', alignItems: 'center', gap: 14 }}>
    <span><div style={{ fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: T.ink3, whiteSpace: 'nowrap' }}>{pcs} pcs · due 20 d</div><Price v={total} size={26} font={T.fontSerif} color={T.ink} dim={T.ink3} lead={false} style={{ marginTop: 4 }} /></span><span style={{ flex: 1 }} /><T.Btn icon="check">Submit for approval</T.Btn>
  </div>);
}
Object.assign(window, { ScreenGrid, ScreenProductCustomer, ScreenProductSales, ScreenAnalytics, ScreenScan, ScreenCarts });
