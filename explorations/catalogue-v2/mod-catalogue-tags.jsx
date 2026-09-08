/* Catalogue · tag system: chips on the grid, the sort & filter sheet, the "Why?" panel.
   Plan: design-system/guidelines/chips-filters-sorts.md (5 families · 1 action chip + 1 state pill per card ·
   4–6 quick chips · one sheet). Renders through FINAL / FINALD; phone via frameF, web via WebShell. */

/* ── tag registry (mock) ── action tags carry a tone; state pills carry a tone; promotional carry an icon */
const TAGS = {
  pp: { label: 'Priority production', tone: 'warn', why: 'Demand high, stock will run out before it can be remade' },
  hg: { label: 'High growth', tone: 'ok', why: 'New sample selling well above its price cohort' },
  rs: { label: 'Restock', tone: 'blue', why: 'Selling, cover below lead time' },
  ps: { label: 'Priority sale', tone: 'accent', why: 'Weak demand, over 60 days of cover, older than 45 days' },
};
const toneOf = (T, t) => t === 'warn' ? T.warn : t === 'ok' ? T.ok : t === 'blue' ? T.blue : t === 'danger' ? T.danger : t === 'accent' ? T.accent : T.ink3;
/* per-design chips for the mock: action (one, precedence already resolved for the selling surface), state, promo */
const CARD_TAGS = {
  '2798': { action: 'pp', n: 2, m: 4, state: ['Low', 'warn'] },
  '6002': { action: 'hg' },
  '4566': { sample: true, state: ['Reading 9/15', 'muted'] },
  '1243': { action: 'ps', state: ['-15%', 'muted'] },
  '3661': { action: 'rs', state: ['In production', 'blue'] },
  '2006': {},
  '1457': { action: 'ps', n: 1, m: 4 },
  'D9107': { action: 'ps' },
};
const PROMO = { '2798': ['Trending', 'trending-up'], '6002': ['Bestseller', 'award'], '1243': ['Low stock', 'flame'], '3661': ['Staff pick', 'sparkles'] };
const GRID6 = ['2798', '6002', '4566', '1243', '3661', '2006'];
const GRID8 = [...GRID6, '1457', 'D9107'];

/* ── chips ── */
/* Action chip on a photo: a veil pill with the tag's dot. Off the photo (sheet, why panel): chipBg with the dot. */
function ActionChip({ T, tag, n, m, on, x, photo, style }) {
  const t = TAGS[tag]; const c = toneOf(T, t.tone);
  if (photo) return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 8px 3px 6px', borderRadius: 999, ...veil({ background: 'rgba(20,18,17,.30)' }), fontFamily: T.fontUI, fontSize: 9.5, letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 500, whiteSpace: 'nowrap', ...style }}><span style={{ width: 6, height: 6, borderRadius: 3, background: c, boxShadow: `0 0 6px ${c}` }} />{t.label}{n != null && <span style={{ opacity: .7, letterSpacing: 0 }}>· {n}/{m}</span>}</span>;
  return <span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 30, padding: '0 11px 0 9px', borderRadius: 999, background: on ? T.ink : T.chipBg, color: on ? T.bg : T.ink, fontFamily: T.fontUI, fontSize: 12.5, whiteSpace: 'nowrap', flex: 'none', ...style }}><span style={{ width: 7, height: 7, borderRadius: 4, background: c }} />{t.label}{x && <Ic name="x" size={12} style={{ opacity: .5 }} />}</span>;
}
/* State pill on a photo: veil, tinted text for warn / danger, plain for the rest. Only exceptional states render. */
function StatePill({ T, s, tone, photo }) {
  const tint = tone === 'danger' ? '#FFB3B3' : tone === 'warn' ? '#F3D48A' : tone === 'blue' ? '#BFD3EA' : 'rgba(255,255,255,.85)';
  if (photo) return <span style={{ padding: '3px 7px', borderRadius: 999, ...veil({ background: 'rgba(20,18,17,.22)' }), fontFamily: T.fontUI, fontSize: 9.5, letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 500, color: tint, whiteSpace: 'nowrap' }}>{s}</span>;
  const c = toneOf(T, tone);
  return <span style={{ display: 'inline-flex', alignItems: 'center', height: 22, padding: '0 8px', borderRadius: 999, border: `1px solid ${tone === 'muted' ? T.line2 : c}`, color: tone === 'muted' ? T.ink2 : c, fontFamily: T.fontUI, fontSize: 10.5, fontWeight: 500, letterSpacing: '.04em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{s}</span>;
}
/* Promotional badge (customer-facing): veil with an icon; no colour, no gold, so it never reads as system truth */
const PromoBadge = ({ T, label, icon }) => <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 8px 3px 6px', borderRadius: 999, ...veil({ background: 'rgba(20,18,17,.30)' }), fontFamily: T.fontUI, fontSize: 9.5, letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 500, whiteSpace: 'nowrap' }}><Ic name={icon} size={11} sw={2} />{label}</span>;
/* Quick chip: a toggle (filled when on) or a caret chip that opens a mini-sheet and shows its value */
function QChip({ T, children, on, caret, x, icon }) {
  return <span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, height: 30, padding: caret ? '0 8px 0 11px' : '0 11px', borderRadius: 999, background: on ? T.ink : caret ? 'transparent' : T.chipBg, border: caret && !on ? `1px solid ${T.line2}` : 0, color: on ? T.bg : T.ink, fontFamily: T.fontUI, fontSize: 12.5, whiteSpace: 'nowrap', flex: 'none' }}>{icon && <Ic name={icon} size={13} />}{children}{caret && <Ic name="chevron-down" size={13} style={{ opacity: .6 }} />}{x && <Ic name="x" size={12} style={{ opacity: .5 }} />}</span>;
}
/* The quick-chip row under the lists bar. Active chips pin left; sheet-only filters appear as × chips; the rest scroll. */
function QuickRow({ T, count = 126, mode = 'staff', pad = 12 }) {
  const staff = <><QChip T={T} caret on>Lehenga</QChip><QChip T={T} on>In stock</QChip><QChip T={T} x>Wine</QChip><QChip T={T}>New</QChip><QChip T={T}>High growth</QChip><QChip T={T}>Priority sale</QChip><QChip T={T}>Discounted</QChip></>;
  const cust = <><QChip T={T} caret>Category</QChip><QChip T={T}>New</QChip><QChip T={T} caret>Price</QChip></>;
  return <>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: `9px ${pad}px 0`, overflow: 'hidden' }}>
      <span style={{ fontFamily: T.fontUI, fontSize: 12, color: T.ink3, whiteSpace: 'nowrap', flex: 'none', marginRight: 2 }}>{count} designs</span>
      {mode === 'customer' ? cust : staff}
    </div>
    <div style={{ margin: `6px ${pad}px 0`, height: 2, borderRadius: 1, background: T.line }}><span style={{ display: 'block', width: mode === 'customer' ? '100%' : '46%', height: 2, borderRadius: 1, background: T.accent }} /></div>
  </>;
}
/* Lists bar (reused look) + the quick row. Customer mode drops the saved lists. */
function TagLists({ T, mode = 'staff' }) {
  const lists = mode === 'customer' ? LISTS.filter(([, k]) => k === 'default').slice(0, 5) : LISTS;
  return <div style={{ marginTop: 8 }}>
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 6, padding: '0 36px 0 12px', overflow: 'hidden' }}>
      {lists.map(([l, k]) => { const on = l === 'All'; return <span key={l} className="press" style={{ flex: 'none', padding: on ? '3px 12px' : '3px 7px', borderRadius: 999, background: on ? T.ink : 'transparent', color: on ? T.bg : k === 'custom' ? T.custom : T.ink2, fontFamily: T.fontDisplay, fontSize: 17, fontWeight: 500, fontStyle: k === 'custom' ? 'italic' : 'normal', whiteSpace: 'nowrap', lineHeight: 1.25 }}>{l}</span>; })}
      <span style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 60, background: `linear-gradient(90deg, transparent, ${T.bg} 60%)`, pointerEvents: 'none' }} />
      <span className="press" style={{ position: 'absolute', right: 10, top: 5, width: 24, height: 24, borderRadius: 12, background: T.chipBg, color: T.ink2, display: 'grid', placeItems: 'center' }}><Ic name="chevron-right" size={13} sw={2.2} /></span>
    </div>
    <QuickRow T={T} mode={mode} count={mode === 'customer' ? 612 : 126} />
  </div>;
}
function TagHeader({ T, mode }) {
  return <div style={{ background: T.header, borderBottom: `1px solid ${T.line}`, boxShadow: T.headerShadow, paddingBottom: 6, marginTop: -54, paddingTop: 54 }}><T.TopBar /><T.SearchBar view="grid" /><TagLists T={T} mode={mode} /></div>;
}
/* Grid card with the tag system: one action chip + one state pill top-left (or promo badges in customer mode),
   sample ribbon, TBD price, ringed colour bars for the colours that matched. */
function TagCard({ T, d, qty, mode = 'staff', why }) {
  const t = CARD_TAGS[d.code] || {}; const promo = PROMO[d.code];
  const ringed = t.n != null ? d.colours.slice(0, t.n) : [];
  return <div style={{ position: 'relative' }}>
    <div style={{ position: 'relative', aspectRatio: '4/5', borderRadius: T.rPhoto, overflow: 'hidden', background: T.photoBg, boxShadow: T.dark ? 'none' : '0 6px 18px -10px rgba(36,23,18,.35)', outline: why ? `2px solid ${T.accent}` : 'none', outlineOffset: 2 }}>
      {d.src ? <img src={d.src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /> : <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontFamily: T.fontDisplay, fontSize: 30, color: T.ink3 }}>{d.code}</div>}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '30%', background: 'linear-gradient(180deg, rgba(20,18,17,0), rgba(20,18,17,.42))', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 7, left: 7, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
        {mode === 'customer'
          ? (promo && <PromoBadge T={T} label={promo[0]} icon={promo[1]} />)
          : <>{t.action && <ActionChip T={T} tag={t.action} n={t.n} m={t.m} photo />}{t.state && <StatePill T={T} s={t.state[0]} tone={t.state[1]} photo />}</>}
      </div>
      {t.sample && <span style={{ position: 'absolute', top: 7, right: 7 }}><T.PhotoTag>Sample</T.PhotoTag></span>}
      <span style={{ position: 'absolute', left: 9, bottom: 9, display: 'inline-flex', gap: 3, alignItems: 'flex-end' }}>{d.colours.map(n => <span key={n} style={{ width: 4, height: ringed.includes(n) ? 26 : 20, borderRadius: 2, background: XD.cols[n], boxShadow: ringed.includes(n) ? '0 0 0 1.5px #fff' : '0 1px 2px rgba(0,0,0,.35)' }} />)}</span>
      <span style={{ position: 'absolute', right: 7, bottom: 7 }}><T.PhotoQty qty={qty} /></span>
    </div>
    <div style={{ padding: '6px 3px 0' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 19, fontWeight: 600, color: T.ink, letterSpacing: '.01em', fontVariantNumeric: 'tabular-nums', lineHeight: 1.1 }}>{d.code}</span><span style={{ flex: 1 }} />{d.price ? <PriceF v={d.price} size={16} font={T.fontSerif} color={T.ink} dim={T.ink3} /> : <span style={{ fontFamily: T.fontSerif, fontSize: 15, color: T.ink3, letterSpacing: '.04em' }}>TBD</span>}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, marginTop: 2, lineHeight: 1.15, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.cat}<span style={{ opacity: .6 }}>·</span><span style={{ color: T.ink2 }}>{d.name}</span></div>
    </div>
  </div>;
}
/* "Why?" panel: the inputs that produced the chip, calculated at, rule version, then where to act */
function WhyPanel({ T, tag = 'pp', style, wide }) {
  const t = TAGS[tag]; const c = toneOf(T, t.tone);
  const Row = ({ l, v, tone }) => <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, padding: '5px 0', borderTop: `1px solid ${T.line}` }}><span style={{ fontFamily: T.fontUI, fontSize: 12, color: T.ink3, flex: 1 }}>{l}</span><span style={{ fontFamily: T.fontUI, fontSize: 12.5, fontWeight: 500, color: tone ? toneOf(T, tone) : T.ink, fontVariantNumeric: 'tabular-nums' }}>{v}</span></div>;
  return <div style={{ borderRadius: T.rCard, padding: '14px 16px 12px', ...glass(T), ...style }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 8, height: 8, borderRadius: 4, background: c, boxShadow: `0 0 8px ${c}` }} /><span style={{ fontFamily: T.fontDisplay, fontSize: 19, fontWeight: 600, color: T.ink }}>{t.label}</span><span style={{ flex: 1 }} /><span style={{ fontFamily: T.fontUI, fontSize: 11, color: T.ink3 }}>2798 · Sky, Peach</span></div>
    <div style={{ fontFamily: T.fontUI, fontSize: 12.5, color: T.ink2, margin: '4px 0 8px', lineHeight: 1.35 }}>{t.why}.</div>
    <div style={{ display: wide ? 'grid' : 'block', gridTemplateColumns: wide ? '1fr 1fr' : 'none', columnGap: 24 }}>
      <Row l="Demand score" v="78 · High" tone="ok" /><Row l="Selling" v="5.4 pcs/day" /><Row l="Free stock" v="18 pcs · 3 d cover" tone="warn" /><Row l="Lead time" v="31 d" /><Row l="Colours" v="2 of 4" /><Row l="Calculated" v="03:10 today · rule v3" />
    </div>
    <div style={{ display: 'flex', gap: 8, marginTop: 12 }}><T.Btn small icon="clipboard-list" style={{ height: 36 }}>Job cards</T.Btn><T.Btn kind="outline" small icon="arrow-up-right">Product</T.Btn><span style={{ flex: 1 }} /><T.Btn kind="ghost" small>Dismiss</T.Btn></div>
  </div>;
}

/* ── sort & filter sheet ── one component, phone and web */
const SORTS = ['Demand score', 'Newest', 'Price ↑', 'Price ↓', 'Best selling 30 d', 'Discount %'];
function SheetBody({ T, wide }) {
  const Head = ({ title, n, open, children }) => <div style={{ borderTop: `1px solid ${T.line}` }}>
    <div className="press" style={{ display: 'flex', alignItems: 'center', gap: 8, height: 44 }}><span style={{ fontFamily: T.fontUI, fontSize: 13.5, fontWeight: 500, color: T.ink }}>{title}</span>{n ? <span style={{ minWidth: 18, height: 18, padding: '0 5px', borderRadius: 9, background: T.accent, color: T.onAccent, fontFamily: T.fontUI, fontSize: 10.5, fontWeight: 600, display: 'grid', placeItems: 'center' }}>{n}</span> : null}<span style={{ flex: 1 }} />{children && open && <span style={{ fontFamily: T.fontUI, fontSize: 11.5, color: T.ink3 }}>Reset</span>}<Ic name={open ? 'chevron-up' : 'chevron-down'} size={15} color={T.ink3} /></div>
    {open && <div style={{ paddingBottom: 12 }}>{children}</div>}
  </div>;
  const Sub = ({ children }) => <div style={{ fontFamily: T.fontUI, fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', color: T.ink3, margin: '8px 0 6px' }}>{children}</div>;
  const wrap = { display: 'flex', gap: 6, flexWrap: 'wrap' };
  return <>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 38, borderRadius: 19, background: T.bg2, padding: '0 12px', margin: '2px 0 10px' }}><Ic name="search" size={15} color={T.ink3} /><span style={{ fontFamily: T.fontUI, fontSize: 13, color: T.ink3 }}>Search filters</span></div>
    <div style={{ paddingBottom: 12 }}><Sub>Sort</Sub><div style={wide ? wrap : { display: 'flex', gap: 6, overflow: 'hidden', whiteSpace: 'nowrap' }}>{SORTS.map((s, i) => <span key={s} className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 30, padding: '0 11px 0 8px', borderRadius: 999, background: i === 0 ? T.ink : T.chipBg, color: i === 0 ? T.bg : T.ink, fontFamily: T.fontUI, fontSize: 12.5, whiteSpace: 'nowrap' }}><span style={{ width: 12, height: 12, borderRadius: 6, border: `1.5px solid ${i === 0 ? T.bg : T.ink3}`, display: 'grid', placeItems: 'center' }}>{i === 0 && <span style={{ width: 6, height: 6, borderRadius: 3, background: T.bg }} />}</span>{s}</span>)}<span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, height: 30, padding: '0 6px', fontFamily: T.fontUI, fontSize: 12.5, color: T.ink3 }}>More sorts<Ic name="chevron-right" size={13} /></span></div></div>
    <Head title="Category & work" n={1} />
    <Head title="Colour" n={1} />
    <Head title="Price" />
    <Head title="Stock" n={1} />
    <Head title="Action tags" open>
      <div style={wrap}><ActionChip T={T} tag="pp" /><ActionChip T={T} tag="hg" /><ActionChip T={T} tag="rs" /><ActionChip T={T} tag="ps" /><T.Chip icon="refresh-cw">Re-reading</T.Chip></div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink3 }}><span>Colours</span><span style={{ display: 'inline-flex', padding: 2, borderRadius: 999, background: T.bg2 }}>{['Any', 'All', 'Selected'].map((s, i) => <span key={s} style={{ height: 22, padding: '0 9px', borderRadius: 999, display: 'grid', placeItems: 'center', fontSize: 11, background: i === 0 ? T.surface : 'transparent', color: i === 0 ? T.ink : T.ink3 }}>{s}</span>)}</span></div>
    </Head>
    <Head title="Demand" open>
      <Sub>Demand score</Sub>
      <div style={wrap}>{['Low', 'Med-low', 'Med', 'Med-high', 'High'].map((b, i) => <T.Chip key={b} on={i === 4}>{b}</T.Chip>)}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '12px 2px 4px' }}><span style={{ fontFamily: T.fontUI, fontSize: 11.5, color: T.ink3, fontVariantNumeric: 'tabular-nums', width: 18 }}>0</span><span style={{ flex: 1, height: 4, borderRadius: 2, background: T.chipBg, position: 'relative' }}><span style={{ position: 'absolute', left: '61%', right: 0, top: 0, bottom: 0, borderRadius: 2, background: T.accent }} /><span style={{ position: 'absolute', left: '61%', top: '50%', width: 20, height: 20, borderRadius: 10, background: T.surface, border: `1.5px solid ${T.ink}`, transform: 'translate(-50%,-50%)', boxShadow: '0 2px 6px rgba(0,0,0,.2)' }} /></span><span style={{ fontFamily: T.fontUI, fontSize: 11.5, color: T.ink, fontVariantNumeric: 'tabular-nums', fontWeight: 500 }}>61 to 100</span></div>
      <Sub>Growth week on week</Sub><div style={wrap}><T.Chip icon="trending-up">Rising</T.Chip><T.Chip icon="trending-down">Falling</T.Chip></div>
    </Head>
    <Head title="Rank & lifecycle" />
    <Head title="Production" />
    <Head title="Media" />
    <Head title="History" />
    <Head title="Channel" />
  </>;
}
const SheetFoot = ({ T, n = 126 }) => <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px 26px', borderTop: `1px solid ${T.line}` }}><T.Btn kind="ghost" small>Clear all</T.Btn><T.Btn kind="outline" small icon="bookmark">Save view</T.Btn><span style={{ flex: 1 }} /><T.Btn icon="check" style={{ height: 44 }}>Show {n} designs</T.Btn></div>;

/* ── phone screens ── */
function TagGridBody({ T, mode = 'staff', why }) {
  const list = GRID6.map(c => XD.byCode[c]);
  return <>
    <TagHeader T={T} mode={mode} />
    {mode === 'customer' && <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '8px 12px 0', height: 32, padding: '0 12px', borderRadius: 16, background: T.accentSoft, border: `1px solid ${T.accentLine}`, fontFamily: T.fontUI, fontSize: 12, color: T.accent }}><Ic name="eye-off" size={14} /><span style={{ flex: 1 }}>Customer mode · stock and tags hidden</span><span style={{ fontWeight: 600 }}>Exit</span></div>}
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '12px 10px', padding: '10px 12px 270px', alignItems: 'start' }}>{list.map(d => <TagCard key={d.code} d={d} qty={QTY[d.code]} T={T} mode={mode} why={why && d.code === '2798'} />)}</div>
  </>;
}
function ScreenTagGrid({ T }) { return frameF(T, <TagGridBody T={T} />, <T.Dock active="Catalogue" cart="A" />); }
function ScreenTagGridCustomer({ T }) { return frameF(T, <TagGridBody T={T} mode="customer" />, <T.Dock active="Catalogue" cart="A" />); }
function ScreenTagWhy({ T }) {
  return frameF(T, <TagGridBody T={T} why />, <>
    {scrimF(T)}
    <WhyPanel T={T} style={{ position: 'absolute', left: 14, right: 14, top: 396 }} />
    <T.Dock active="Catalogue" cart="A" />
  </>);
}
function ScreenTagSheet({ T }) {
  return frameF(T, <TagGridBody T={T} />, <>
    {scrimF(T)}
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: 96, borderRadius: '30px 30px 0 0', background: T.surface, boxShadow: '0 -20px 60px -20px rgba(0,0,0,.5)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px 8px 20px' }}><span style={{ fontFamily: T.fontDisplay, fontSize: 24, fontWeight: 500, color: T.ink }}>Sort & filter</span><span style={{ fontFamily: T.fontUI, fontSize: 12, color: T.ink3 }}>4 applied</span><span style={{ flex: 1 }} /><Hit T={T} icon="x" size={36} iconSize={17} style={{ background: T.bg2 }} /></div>
      <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', padding: '0 20px', position: 'relative' }}><SheetBody T={T} /><div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 40, background: `linear-gradient(180deg, transparent, ${T.surface})`, pointerEvents: 'none' }} /></div>
      <SheetFoot T={T} />
    </div>
  </>);
}

/* ── web screens ── */
function WebTagLists({ T, mode = 'staff' }) {
  return <div style={{ padding: '14px 24px 0' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      {LISTS.map(([l, k]) => { const on = l === 'All'; return <span key={l} className="press" style={{ padding: on ? '4px 14px' : '4px 9px', borderRadius: 999, background: on ? T.ink : 'transparent', color: on ? T.bg : k === 'custom' ? T.custom : T.ink2, fontFamily: T.fontDisplay, fontSize: 18, fontWeight: 500, fontStyle: k === 'custom' ? 'italic' : 'normal', whiteSpace: 'nowrap' }}>{l}</span>; })}
      <span className="press" style={{ width: 26, height: 26, borderRadius: 13, background: T.chipBg, display: 'grid', placeItems: 'center', color: T.ink2 }}><Ic name="plus" size={13} /></span>
      <span style={{ flex: 1 }} />
      <Hit T={T} icon="list" size={36} iconSize={16} style={{ background: T.surface, border: `1px solid ${T.line2}` }} /><Hit T={T} icon="sliders-horizontal" size={36} iconSize={16} style={{ background: T.surface, border: `1px solid ${T.line2}` }} />
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10 }}><span style={{ fontSize: 12, color: T.ink3, marginRight: 4 }}>126 designs</span><QChip T={T} caret on>Lehenga</QChip><QChip T={T} on>In stock</QChip><QChip T={T} x>Wine</QChip><QChip T={T}>New</QChip><QChip T={T}>High growth</QChip><QChip T={T}>Priority sale</QChip><QChip T={T}>Discounted</QChip><span style={{ flex: 1 }} /><span style={{ fontSize: 12, color: T.ink3 }}>Sort · Demand score</span></div>
  </div>;
}
function WebTagGrid({ T, pane = 'sheet' }) {
  const list = GRID8.map(c => XD.byCode[c]);
  const sheet = <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}><div style={{ flex: 1, minHeight: 0, overflow: 'hidden', padding: '10px 16px 0', position: 'relative' }}><SheetBody T={T} wide /><div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 40, background: `linear-gradient(180deg, transparent, ${T.surface})`, pointerEvents: 'none' }} /></div><div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 12px 12px', borderTop: `1px solid ${T.line}` }}><T.Btn kind="ghost" small>Clear all</T.Btn><T.Btn kind="outline" small icon="bookmark">Save</T.Btn><span style={{ flex: 1 }} /><T.Btn icon="check" small style={{ height: 38 }}>Show 126</T.Btn></div></div>;
  return <WebShell T={T} title="Catalogue" crumb="Products · All · 4 filters" paneTitle={pane === 'sheet' ? 'Sort & filter' : 'Cart A'} pane={pane === 'sheet' ? sheet : <CartPane T={T} />} overlay={pane === 'why' && <WhyPanel T={T} wide style={{ position: 'absolute', left: 262, top: 176, width: 420 }} />}>
    <WebTagLists T={T} />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: '18px 14px', padding: '14px 24px 24px' }}>{list.map(d => <TagCard key={d.code} d={d} qty={QTY[d.code]} T={T} why={pane === 'why' && d.code === '2798'} />)}</div>
  </WebShell>;
}
const WebTagGridSheet = ({ T }) => <WebTagGrid T={T} pane="sheet" />;
const WebTagGridWhy = ({ T }) => <WebTagGrid T={T} pane="why" />;


/* ── product page · salesperson view: the tag rail and the why panel ── */
const COLOUR_STATE = { Sky: [18, 3, 30, 'Low'], Purple: [0, 0, 0, 'OOS'], Seagreen: [5, 1, 10, ''], Peach: [15, 0, 0, ''] };
const DESC = ['Plazo set', 'Zari work', 'Surat base', 'Wedding ’26', 'AW-26', '₹3,301–5,600', 'Mid cohort', 'Haldi'];
/* Colour state pill: colour bar · name · free pcs · state */
const ColourState = ({ T, n, big }) => { const [f, r, p, st] = COLOUR_STATE[n]; const c = st === 'OOS' ? T.danger : st === 'Low' ? T.warn : T.ink3; return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: big ? 32 : 28, padding: '0 10px 0 8px', borderRadius: 999, border: `1px solid ${T.line2}`, fontFamily: T.fontUI, fontSize: big ? 12.5 : 12, color: T.ink, whiteSpace: 'nowrap' }}><span style={{ width: 4, height: 16, borderRadius: 2, background: XD.cols[n] }} />{n}<span style={{ color: T.ink3 }}>· {f} free{p ? ` · ${p} prod` : ''}</span>{st && <span style={{ fontSize: 10, letterSpacing: '.06em', textTransform: 'uppercase', fontWeight: 600, color: c }}>{st}</span>}</span>; };
const Desc = ({ T, children }) => <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, border: `1px solid ${T.line}`, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink3, whiteSpace: 'nowrap' }}>{children}</span>;
/* The rail: action row (all that fire, each with a why?), colour state row, descriptive row */
function TagRail({ T, pad = 20, big, whyOn }) {
  const Lbl = ({ children }) => <span style={{ fontFamily: T.fontUI, fontSize: 10.5, letterSpacing: '.08em', textTransform: 'uppercase', color: T.ink3, width: big ? 64 : 52, flex: 'none' }}>{children}</span>;
  const Row = ({ l, children, wrap }) => <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: `6px ${pad}px 0`, overflow: 'hidden' }}><Lbl>{l}</Lbl><div style={{ display: 'flex', gap: 6, flexWrap: wrap ? 'wrap' : 'nowrap', minWidth: 0 }}>{children}</div></div>;
  const Why = ({ tag, n, m, on }) => <span style={{ display: 'inline-flex', alignItems: 'center' }}><ActionChip T={T} tag={tag} on={on} style={{ borderRadius: '999px 0 0 999px', paddingRight: 8 }} /><span className="press" style={{ display: 'inline-grid', placeItems: 'center', height: 30, padding: '0 8px 0 6px', borderRadius: '0 999px 999px 0', background: on ? T.ink : T.chipBg, color: on ? T.bg : T.ink2, borderLeft: `1px solid ${on ? 'rgba(255,255,255,.18)' : T.line2}` }}><span style={{ fontFamily: T.fontUI, fontSize: 11.5, whiteSpace: 'nowrap' }}>{n != null ? `${n}/${m} · ` : ''}why?</span></span></span>;
  return <div style={{ paddingBottom: 4 }}>
    <Row l="Action"><Why tag="pp" n={2} m={4} on={whyOn} /><Why tag="rs" /></Row>
    <Row l="Colours" wrap={big}>{XD.designs[0].colours.map(n => <ColourState key={n} T={T} n={n} big={big} />)}</Row>
    <Row l="About" wrap={big}>{DESC.map(t => <Desc key={t} T={T}>{t}</Desc>)}</Row>
  </div>;
}
/* Scores block: demand ring + band + lifecycle, the score over time, rank / growth / state / buyers */
function DemandBlock({ T, web }) {
  const facts = [['Rank', '12', 'Top 20'], ['Growth', '+12%', 'week on week'], ['Most sold', 'Delhi', '38% of pcs'], ['Buyers', '14', 'last 30 d']];
  return <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 10 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Donut T={T} parts={[{ v: 78, color: T.accent }, { v: 22, color: 'transparent' }]} size={64} thick={7} center="78" />
      <span style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 10.5, color: T.ink3 }}>Demand score</div><div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 2 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 18, fontWeight: 600, color: T.ink }}>High</span><span style={{ fontSize: 11.5, color: T.ink3, whiteSpace: 'nowrap' }}>· Active</span></div><div style={{ display: 'flex', gap: 3, marginTop: 6 }}>{['Low', 'Med-low', 'Med', 'Med-high', 'High'].map((b, i) => <span key={b} style={{ flex: 1, height: 4, borderRadius: 2, background: i === 4 ? T.accent : T.chipBg }} />)}</div></span>
      <span style={{ width: web ? 150 : 92, flex: 'none' }}><LineG T={T} series={[{ pts: SERIES.demand, color: T.accent, width: 1.8 }]} w={140} h={44} area /></span>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>{facts.map(([l, v, sub]) => <div key={l} style={{ padding: '8px 10px', borderRadius: 14, background: T.surface2, border: `1px solid ${T.line}`, minWidth: 0 }}><div style={{ fontSize: 10, color: T.ink3, whiteSpace: 'nowrap' }}>{l}</div><div style={{ fontFamily: T.fontDisplay, fontSize: 19, fontWeight: 600, color: T.ink, marginTop: 1, lineHeight: 1, whiteSpace: 'nowrap' }}>{v}</div><div style={{ fontSize: 10, color: T.ink3, marginTop: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sub}</div></div>)}</div>
  </div>;
}
/* What the customer sees: promotional badges, editable by the sale manager */
const CustomerSees = ({ T, pad = 20 }) => <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: `10px ${pad}px 0`, padding: '8px 10px 8px 12px', borderRadius: 16, background: T.accentSoft, border: `1px solid ${T.accentLine}` }}><Ic name="eye" size={14} color={T.accent} /><span style={{ fontFamily: T.fontUI, fontSize: 11.5, color: T.accent, whiteSpace: 'nowrap' }}>Customer sees</span><span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, height: 24, padding: '0 9px 0 7px', borderRadius: 999, background: T.ink, color: T.bg, fontFamily: T.fontUI, fontSize: 10.5, letterSpacing: '.06em', textTransform: 'uppercase', fontWeight: 500 }}><Ic name="trending-up" size={11} sw={2} />Trending</span><span style={{ flex: 1 }} /><span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: T.fontUI, fontSize: 12, fontWeight: 600, color: T.accent }}><Ic name="pencil" size={12} />Edit</span></div>;
/* Head without the old tag row; the rail sits under it */
function TagSalesHead({ T }) {
  const d = XD.designs[0];
  return <>
    <div style={{ display: 'flex', alignItems: 'center', padding: '0 12px', height: 44, gap: 4 }}><Hit T={T} icon="chevron-left" size={40} /><span style={{ fontFamily: T.fontUI, fontSize: 12, color: T.ink3, flex: 1 }}>Salesperson view</span><span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, color: T.ink2 }}>Customer mode<span style={{ width: 34, height: 20, borderRadius: 10, background: T.chipBg, position: 'relative' }}><span style={{ position: 'absolute', left: 2, top: 2, width: 16, height: 16, borderRadius: 8, background: T.surface, boxShadow: '0 1px 2px rgba(0,0,0,.2)' }} /></span></span></div>
    <div style={{ display: 'flex', gap: 14, padding: '2px 20px 0' }}>
      <div style={{ width: 96, height: 122, borderRadius: 14, overflow: 'hidden', background: T.photoBg, flex: 'none' }}><img src={d.src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: T.fontDisplay, fontSize: 32, fontWeight: 600, color: T.ink, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{d.code}</div>
        <div style={{ fontSize: 12.5, color: T.ink3, marginTop: 4 }}>{d.cat} · <span style={{ color: T.ink2 }}>{d.name}</span></div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}><PriceF v={d.price} size={22} font={T.fontSerif} color={T.ink} dim={T.ink3} /><span style={{ fontSize: 11.5, color: T.ink3 }}>cost ₹2,610 · 40% GM</span></div>
        <div style={{ display: 'flex', gap: 6, marginTop: 10 }}><T.Btn kind="secondary" small icon="upload" style={{ height: 32, fontSize: 12 }}>Media</T.Btn><T.Btn kind="secondary" small icon="tags" style={{ height: 32, fontSize: 12 }}>Set tag</T.Btn></div>
      </div>
    </div>
  </>;
}
function SalesRailBody({ T, whyOn }) {
  const d = XD.designs[0]; const max = Math.max(...Object.values(STOCK).map(r => r[0] + r[1] + r[2]));
  return <>
    <TagSalesHead T={T} />
    <div style={{ marginTop: 8 }}><TagRail T={T} whyOn={whyOn} /></div>
    <CustomerSees T={T} />
    <T.H right={<span style={{ fontSize: 11, color: T.ink3 }}>nightly · 03:10</span>}>Demand</T.H>
    <T.Card style={{ padding: 12 }}><DemandBlock T={T} /></T.Card>
    <SalesTabs T={T} on="Stock & production" />
    <T.H right={<Legend T={T} items={[['free', T.ok], ['reserved', T.warn], ['in prod', T.blue]]} />}>Stock by colour</T.H>
    <T.Card style={{ padding: '4px 14px 8px' }}>{d.colours.map(n => { const [f, r, p] = STOCK[n]; return <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 0', borderTop: `1px solid ${T.line}`, fontSize: 12.5 }}><span style={{ width: 4, height: 18, borderRadius: 2, background: XD.cols[n] }} /><span style={{ width: 64 }}>{n}</span><Stack T={T} f={f} r={r} p={p} max={max} /><b style={{ width: 24, textAlign: 'right', color: f < 5 ? T.danger : T.ink }}>{f}</b></div>; })}</T.Card>
  </>;
}
function ScreenTagSalesRail({ T }) { return frameF(T, <SalesRailBody T={T} />, <T.Island active="Catalogue" />); }
/* Why sheet: reason, inputs, score over time, colour matrix with which colours fire, actions */
function WhySheet({ T, web }) {
  const rows = [['Sky', 18, '3 d', 30, true], ['Purple', 0, 'out', 0, true], ['Seagreen', 5, '9 d', 10, false], ['Peach', 15, '41 d', 0, false]];
  const Fact = ({ l, v, tone }) => <div style={{ padding: '8px 10px', borderRadius: 14, background: T.surface2, border: `1px solid ${T.line}`, minWidth: 0 }}><div style={{ fontSize: 10, color: T.ink3, whiteSpace: 'nowrap' }}>{l}</div><div style={{ fontFamily: T.fontUI, fontSize: 13.5, fontWeight: 600, color: tone ? toneOf(T, tone) : T.ink, marginTop: 2, whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>{v}</div></div>;
  return <>
    <div style={{ fontFamily: T.fontUI, fontSize: 12.5, color: T.ink2, lineHeight: 1.4 }}>Demand is high and the free stock will run out before a repeat can be made. Fires per colour: two of four qualify.</div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginTop: 12 }}><Fact l="Demand score" v="78 · High" tone="ok" /><Fact l="Selling" v="5.4 pcs / day" /><Fact l="Free stock" v="18 pcs" tone="warn" /><Fact l="Cover" v="3 d" tone="warn" /><Fact l="Lead time" v="31 d · recipe" /><Fact l="Rule" v="High · low cover" /></div>
    <div style={{ fontFamily: T.fontUI, fontSize: 10.5, letterSpacing: '.08em', textTransform: 'uppercase', color: T.ink3, margin: '14px 0 6px' }}>Score · last 10 weeks</div>
    <LineG T={T} series={[{ pts: SERIES.demand, color: T.accent, width: 2 }]} w={web ? 300 : 340} h={54} area />
    <div style={{ fontFamily: T.fontUI, fontSize: 10.5, letterSpacing: '.08em', textTransform: 'uppercase', color: T.ink3, margin: '12px 0 4px' }}>By colour</div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 44px 44px 44px 52px', gap: '0 6px', fontSize: 10, letterSpacing: '.06em', textTransform: 'uppercase', color: T.ink3, padding: '4px 0' }}><span /><span style={{ textAlign: 'right' }}>Free</span><span style={{ textAlign: 'right' }}>Cover</span><span style={{ textAlign: 'right' }}>Prod</span><span style={{ textAlign: 'right' }}>Fires</span></div>
    {rows.map(([n, f, c, p, on]) => <div key={n} style={{ display: 'grid', gridTemplateColumns: '1fr 44px 44px 44px 52px', gap: '0 6px', alignItems: 'center', padding: '7px 0', borderTop: `1px solid ${T.line}`, fontSize: 12.5, fontVariantNumeric: 'tabular-nums' }}><span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontWeight: 500 }}><span style={{ width: 4, height: 16, borderRadius: 2, background: XD.cols[n] }} />{n}</span><span style={{ textAlign: 'right', color: f === 0 ? T.danger : T.ink }}>{f}</span><span style={{ textAlign: 'right', color: on ? T.warn : T.ink2 }}>{c}</span><span style={{ textAlign: 'right', color: p ? T.blue : T.ink3 }}>{p || '—'}</span><span style={{ textAlign: 'right' }}>{on ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: T.warn, fontSize: 11, fontWeight: 600 }}><span style={{ width: 6, height: 6, borderRadius: 3, background: T.warn }} />yes</span> : <span style={{ color: T.ink3, fontSize: 11 }}>no</span>}</span></div>)}
    <div style={{ fontSize: 10.5, color: T.ink3, marginTop: 10 }}>Calculated 03:10 today · rule v3 · lead time from recipe + last 4 productions</div>
  </>;
}
function ScreenTagSalesWhy({ T }) {
  return frameF(T, <SalesRailBody T={T} whyOn />, <>
    {scrimF(T)}
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: 220, borderRadius: '30px 30px 0 0', background: T.surface, boxShadow: '0 -20px 60px -20px rgba(0,0,0,.5)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 16px 6px 20px' }}><span style={{ width: 8, height: 8, borderRadius: 4, background: T.warn, boxShadow: `0 0 8px ${T.warn}` }} /><span style={{ fontFamily: T.fontDisplay, fontSize: 22, fontWeight: 500, color: T.ink }}>Priority production</span><span style={{ fontFamily: T.fontUI, fontSize: 12, color: T.ink3 }}>2798 · 2/4</span><span style={{ flex: 1 }} /><Hit T={T} icon="x" size={36} iconSize={17} style={{ background: T.bg2 }} /></div>
      <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', padding: '0 20px' }}><WhySheet T={T} /></div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px 26px', borderTop: `1px solid ${T.line}` }}><T.Btn kind="outline" small icon="package-search">Out of stock</T.Btn><span style={{ flex: 1 }} /><T.Btn icon="clipboard-list" style={{ height: 44 }}>Job cards</T.Btn></div>
    </div>
  </>);
}
/* web: salesperson view with the rail, why in the right pane */
function WebTagSales({ T, why }) {
  const d = XD.designs[0]; const max = Math.max(...Object.values(STOCK).map(r => r[0] + r[1] + r[2]));
  const whyPane = <div style={{ padding: '12px 16px', height: '100%', overflow: 'hidden' }}><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}><span style={{ width: 8, height: 8, borderRadius: 4, background: T.warn, boxShadow: `0 0 8px ${T.warn}` }} /><span style={{ fontFamily: T.fontDisplay, fontSize: 20, fontWeight: 600, color: T.ink }}>Priority production</span><span style={{ fontSize: 12, color: T.ink3 }}>2/4</span></div><WhySheet T={T} web /><div style={{ display: 'flex', gap: 6, marginTop: 14 }}><T.Btn small icon="clipboard-list" style={{ height: 36 }}>Job cards</T.Btn><T.Btn kind="outline" small icon="package-search">Out of stock</T.Btn></div></div>;
  const ordersPane = <div style={{ padding: '10px 14px' }}>{ORDERS.map((o, i) => <div key={o[0]} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 0', borderTop: i ? `1px solid ${T.line}` : 0, fontSize: 12.5 }}><span style={{ fontFamily: T.fontMono, fontSize: 12, color: T.ink2 }}>{o[0]}</span><span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{o[1]}</span><StatusPill T={T} s={o[3] === 'Pending' ? 'Raised' : o[3]} /><b>×{o[4]}</b></div>)}</div>;
  return <WebShell T={T} title={d.code} crumb="Catalogue · Salesperson view" paneTitle={why ? 'Why?' : 'Sale orders · 2798'} pane={why ? whyPane : ordersPane}>
    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 20, padding: '18px 24px', height: '100%' }}>
      <div>
        <div style={{ width: 260, height: 325, borderRadius: 18, overflow: 'hidden', background: T.photoBg }}><img src={d.src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 12 }}><PriceF v={d.price} size={26} font={T.fontSerif} color={T.ink} dim={T.ink3} /><span style={{ fontSize: 12, color: T.ink3 }}>cost ₹2,610 · 40% GM</span></div>
        <div style={{ display: 'flex', gap: 6, marginTop: 12 }}><T.Btn kind="secondary" small icon="upload">Media</T.Btn><T.Btn kind="secondary" small icon="tags">Set tag</T.Btn><T.Btn small icon="plus">Add</T.Btn></div>
        <CustomerSees T={T} pad={0} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ padding: '6px 0 6px', borderRadius: 18, background: T.surface, border: `1px solid ${T.line}` }}><TagRail T={T} pad={14} big whyOn={why} /></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
          <div style={{ padding: 14, borderRadius: 18, background: T.surface, border: `1px solid ${T.line}` }}><div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 10 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 16, fontWeight: 600 }}>Demand</span><span style={{ flex: 1 }} /><span style={{ fontSize: 11, color: T.ink3 }}>nightly · 03:10</span></div><DemandBlock T={T} web /></div>
          <div style={{ padding: 14, borderRadius: 18, background: T.surface2, border: `1px solid ${T.line}` }}><div style={{ display: 'flex', alignItems: 'baseline' }}><span style={{ fontFamily: T.fontDisplay, fontSize: 16, fontWeight: 600 }}>Stock by colour</span><span style={{ flex: 1 }} /><Legend T={T} items={[['free', T.ok], ['rsv', T.warn], ['prod', T.blue]]} /></div>{d.colours.map(n => { const [f, r, p, due] = STOCK[n]; return <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 0', borderTop: `1px solid ${T.line}`, fontSize: 12 }}><span style={{ width: 4, height: 18, borderRadius: 2, background: XD.cols[n] }} /><span style={{ width: 62 }}>{n}</span><Stack T={T} f={f} r={r} p={p} max={max} /><span style={{ width: 84, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}><b style={{ color: f < 5 ? T.danger : T.ink }}>{f}</b><span style={{ color: T.ink3 }}> · {r} · {p}</span></span><span style={{ width: 40, textAlign: 'right', fontSize: 10.5, color: T.ink3 }}>{due}</span></div>; })}</div>
          <div style={{ padding: 14, borderRadius: 18, background: T.surface, border: `1px solid ${T.line}`, gridColumn: '1 / -1' }}><div style={{ display: 'flex', alignItems: 'baseline' }}><span style={{ fontFamily: T.fontDisplay, fontSize: 16, fontWeight: 600 }}>Last 12 weeks · pcs</span><span style={{ flex: 1 }} /><Legend T={T} items={[['all', T.ink], ...d.colours.map(n => [n, XD.cols[n]])]} /></div><div style={{ marginTop: 8 }}><LineG T={T} series={[{ pts: SERIES.month.all, color: T.ink, width: 2.2 }, ...d.colours.map(n => ({ pts: SERIES.month[n], color: XD.cols[n], width: 1.3 }))]} w={640} h={70} /></div></div>
        </div>
      </div>
    </div>
  </WebShell>;
}
const WebTagSalesRail = ({ T }) => <WebTagSales T={T} />;
const WebTagSalesWhy = ({ T }) => <WebTagSales T={T} why />;

/* Self-registration: the board reads window.NEW_DRAFT_MODULES, so each module file owns its own entry and
   index.html only needs the script tag. */
(window.NEW_DRAFT_MODULES = window.NEW_DRAFT_MODULES || []).push({ module: 'Catalogue · tags', note: 'one action chip + one state pill per card · quick chips · one sort & filter sheet · why panel · salesperson tag rail (8 Sep)', subs: [
  { name: 'Grid chips & sheet', flow: 'grid with chips → customer mode → why panel → sort & filter sheet', phone: [['Grid · action chip + state pill, quick chips', ScreenTagGrid], ['Grid · customer mode, promotional badges only', ScreenTagGridCustomer], ['Why? · tap an action chip', ScreenTagWhy], ['Sort & filter sheet · sort, grouped filters, save view', ScreenTagSheet]], web: [['Grid · chips, sort & filter drawer', WebTagGridSheet], ['Grid · why panel, cart pane', WebTagGridWhy]] },
  { name: 'Salesperson view · tag rail', flow: 'rail (action · colours · about) → customer sees → demand → why sheet', phone: [['Salesperson view · tag rail, customer sees, demand', ScreenTagSalesRail], ['Why sheet · inputs, score over time, by colour', ScreenTagSalesWhy]], web: [['Salesperson view · rail, demand, sale orders pane', WebTagSalesRail], ['Salesperson view · why pane open', WebTagSalesWhy]] },
] });

Object.assign(window, { TAGS, CARD_TAGS, PROMO, ActionChip, StatePill, PromoBadge, QChip, QuickRow, TagLists, TagHeader, TagCard, WhyPanel, SheetBody, SheetFoot, ScreenTagGrid, ScreenTagGridCustomer, ScreenTagWhy, ScreenTagSheet, WebTagGridSheet, WebTagGridWhy, TagRail, DemandBlock, CustomerSees, WhySheet, ScreenTagSalesRail, ScreenTagSalesWhy, WebTagSalesRail, WebTagSalesWhy });
