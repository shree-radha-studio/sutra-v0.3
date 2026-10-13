/* NEW DRAFTS · Hub (13 Oct 2026, review 2). Plan: plans/hub.md. Screens render through the theme object T (FINAL light,
   FINALD dark), so one function yields both. Component names start with Hb because every board file shares one
   script scope. Reuses from base: frameF, scrimF, Body, Hit, OutBtn, Pill, Meta, Mono, Sect, Sheet, glass, veil, PriceF,
   Stack, Ic, T.Btn, T.Chip, T.Tag, T.PhotoTag, T.Bars, T.Kpi, T.Island, WebShell3, ViewTabs (see COMPONENTS.md).
   Production's Field / Swatch / PShell are not on this page (modules.js loads only base + this file), so the form
   atoms below (HbField, HbSwatch) mirror them with the same fields and the same look.
   Hub is where masters are created; Production › Process setting only links here. */

/* ── module data (fictional; the designs, colours and codes the board already uses) ── */
const HB_SEG = [['Masters'], ['Upload centre'], ['Import'], ['Reports'], ['Report builder'], ['Compare']];
const HB_ITEMS = [['Products', 612], ['Materials', 22], ['WIP', 14]];
const HB_LEDGERS = [['Customers', 318], ['Broker agencies', 12], ['Brokers', 41], ['Karigars', 27], ['Transporters', 19], ['Suppliers', 34], ['Team', 48]];
/* [count, BRD wording, short wording for the phone, icon at the end of the chip] */
const HB_ALERTS = [[102, 'SKUs at or below the low-stock mark', 'low stock', 'arrow-right'], [104, 'designs with no photo yet', 'no photo yet', 'image-up'], [113, 'designs never scored', 'never scored', 'arrow-right'], [15, 'purchase documents not linked to a supplier', 'unlinked documents', 'arrow-right']];
const HB_DOSSIER = ['Overview', 'Sales', 'Production', 'BOM & materials', 'Stock ledger', 'Barcodes'];
const HB_CATS = ['Lehenga', 'Saree', 'Crop top', 'Blouse', 'Plazo set'];
const HB_WORKS = ['Zari', 'Sequin', 'Thread', 'Mirror', 'Stone'];
/* the design being created: no photo yet. Pictures shown for it in the upload centre are the board's sample lehenga
   shots, standing in for what the user would upload */
const HB_NEW = { code: '8591', name: 'No name yet', cat: 'Lehenga', colours: ['Rani', 'Firozi', 'Mehroon'] };
const hbD = c => XD.byCode[c];
const hbPic = c => (XD.byCode[c] || {}).src;
/* the no-photo queue: designs the board knows that have no picture, then codes from the old system */
const HB_QUEUE = [
  { ...HB_NEW, fresh: true },
  { ...hbD('3661') }, { ...hbD('1457') }, { ...hbD('1243') }, { ...hbD('D9107') },
  { code: '1320', name: 'No name yet', cat: 'Crop top', colours: ['Mehroon', 'White', 'Rust'] },
];
const HB_COLS_SHADE = { Mono: '#D9D3CA' };
const hbShade = n => HB_COLS_SHADE[n] || XD.cols[n] || '#C9BFB4';
const hbTabs = (...t) => t;
const HB_T_MASTERS = { icon: 'library', label: 'Masters · Products' };

/* ── atoms ── */
const HbLab = ({ T, children, right, style }) => <div style={{ display: 'flex', alignItems: 'baseline', fontFamily: T.fontUI, fontSize: 10, letterSpacing: '.06em', textTransform: 'uppercase', color: T.ink3, marginBottom: 5, ...style }}>{children}<span style={{ flex: 1 }} />{right}</div>;
/* a form field as displayed: label, value or placeholder, optional caret / lock / right slot */
const HbField = ({ T, label, value, ph, caret, icon, right, w, mono, small, dim, lock, style }) => <div style={{ width: w, flex: w ? 'none' : 1, minWidth: 0, ...style }}>
  {label && <HbLab T={T}>{label}</HbLab>}
  <div style={{ display: 'flex', alignItems: 'center', gap: 6, height: small ? 34 : 40, padding: '0 12px', borderRadius: 12, background: dim ? T.bg2 : T.surface, border: `1px solid ${T.line2}`, fontFamily: mono ? T.fontMono : T.fontUI, fontSize: mono ? 14 : 13.5, fontWeight: mono ? 600 : 400, color: value != null ? T.ink : T.ink3, whiteSpace: 'nowrap', overflow: 'hidden' }}>
    {icon && <Ic name={icon} size={14} color={T.ink3} />}<span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>{value != null ? value : ph}</span>{lock && <Ic name="lock" size={12} color={T.ink3} />}{caret && <Ic name="chevron-down" size={14} color={T.ink3} />}{right}
  </div>
</div>;
const HbRadio = ({ T, on }) => <span style={{ width: 18, height: 18, borderRadius: 9, border: `1.5px solid ${on ? T.ink : T.line2}`, display: 'grid', placeItems: 'center', flex: 'none', boxSizing: 'border-box' }}>{on && <span style={{ width: 8, height: 8, borderRadius: 4, background: T.ink }} />}</span>;
const HbSwitch = ({ T, on }) => <span style={{ width: 40, height: 22, borderRadius: 11, background: on ? T.ok : T.line2, position: 'relative', flex: 'none' }}><span style={{ position: 'absolute', top: 2, left: on ? 20 : 2, width: 18, height: 18, borderRadius: 9, background: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,.25)' }} /></span>;
const HbTick = ({ T, done, s = 20 }) => done
  ? <span style={{ width: s, height: s, borderRadius: s / 2, background: T.ok, color: T.dark ? '#140F0C' : '#fff', display: 'grid', placeItems: 'center', flex: 'none' }}><Ic name="check" size={s - 8} sw={2.6} /></span>
  : <span style={{ width: s, height: s, borderRadius: s / 2, border: `1.5px solid ${T.ink3}`, flex: 'none', boxSizing: 'border-box' }} />;
/* a design's picture, or the grey dashed "no photo yet" box with a crossed picture */
const HbThumb = ({ T, d, src, w = 40, h = 50, r = 9 }) => { const s = src || (d && d.src); return <div style={{ width: w, height: h, borderRadius: r, overflow: 'hidden', flex: 'none', position: 'relative', boxSizing: 'border-box', background: s ? T.photoBg : T.bg2, border: s ? 0 : `1px dashed ${T.line2}` }}>
  {s ? <img src={s} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /> : <span style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: T.ink3 }}><Ic name="image-off" size={Math.max(12, Math.min(Math.round(w * .38), 22))} sw={1.5} /></span>}
</div>; };
const HbDot = ({ n, s = 12 }) => <span style={{ width: s, height: s, borderRadius: s / 2, background: hbShade(n), flex: 'none', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.1)' }} />;
/* a swatch with a little weave for materials (net), plain otherwise */
const HbSwatch = ({ n, tex, w = 34, h = 34, r = 9 }) => { const c = hbShade(n), dk = 'rgba(20,14,10,.22)'; return <span style={{ width: w, height: h, borderRadius: r, flex: 'none', display: 'block', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.08)', background: tex === 'net' ? `repeating-linear-gradient(0deg, ${dk} 0 1px, transparent 1px 5px), repeating-linear-gradient(90deg, ${dk} 0 1px, transparent 1px 5px), ${c}` : c }} />; };
const HbLock = ({ T }) => <Ic name="lock" size={10} color={T.ink3} style={{ marginLeft: 3, verticalAlign: -1 }} />;
const hbCardStyle = T => ({ borderRadius: 22, background: T.surface, border: `1px solid ${T.line}`, boxShadow: T.dark ? 'none' : '0 6px 18px -14px rgba(36,23,18,.25)' });
/* the facts a master row carries: free · FG · in prod, a tiny ruled row */
const HbFacts = ({ T, d, size = 'm' }) => { const low = d.note === 'Low stock', sm = size === 's';
  const cell = (l, v, tone, k) => <span key={l} style={{ flex: 1, minWidth: 0, textAlign: 'center', padding: sm ? '2px 0 3px' : '4px 0 5px', borderLeft: k ? `1px solid ${T.line}` : 0 }}><div style={{ fontFamily: T.fontUI, fontSize: sm ? 8.5 : 9, letterSpacing: '.08em', textTransform: 'uppercase', color: T.ink3, lineHeight: 1.2, whiteSpace: 'nowrap' }}>{l}</div><div style={{ fontFamily: T.fontUI, fontSize: sm ? 13 : 14, fontWeight: 600, color: tone || (v ? T.ink : T.ink3), fontVariantNumeric: 'tabular-nums', lineHeight: 1.2 }}>{v}</div></span>;
  return <div style={{ display: 'flex', borderRadius: 10, border: `1px solid ${T.line}`, background: T.surface }}>{cell('free', d.free, low ? T.danger : null, 0)}{cell('FG', d.fg, null, 1)}{cell('in prod', d.prod, null, 2)}</div>; };
/* the Hub web shell: the approved WebShell3 with the Hub sub-menu */
const HbShell = ({ T, section = 'Masters', active, crumb, tabs, paneTitle, pane, children }) => <WebShell3 T={T} module="Hub" crumb={crumb || ['Hub', section]} section={section} seg={HB_SEG} active={active || section} tabs={tabs} paneTitle={paneTitle} pane={pane}>{children}</WebShell3>;

/* ── Masters shell: the census is the navigation (family switch, entity chips with live counts), then the alerts ── */
const HbFam = ({ T, on = 0, w }) => <span style={{ display: 'inline-flex', padding: 3, borderRadius: 999, background: T.bg2, border: `1px solid ${T.line}`, width: w, flex: 'none', boxSizing: 'border-box' }}>{['Items', 'Ledgers'].map((l, i) => <span key={l} className="press" style={{ flex: w ? 1 : 'none', height: 28, padding: '0 14px', display: 'grid', placeItems: 'center', borderRadius: 999, background: i === on ? T.surface : 'transparent', boxShadow: i === on ? (T.dark ? `inset 0 0 0 1px ${T.line2}` : `0 1px 3px rgba(36,23,18,.18), inset 0 0 0 1px ${T.line}`) : 'none', color: i === on ? T.ink : T.ink3, fontFamily: T.fontUI, fontSize: 11, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase' }}>{l}</span>)}</span>;
const HbEnt = ({ T, label, n, on, h = 32 }) => <span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, height: h, padding: '0 12px', borderRadius: 999, background: on ? T.ink : T.chipBg, color: on ? T.bg : T.ink, fontFamily: T.fontUI, fontSize: 13, fontWeight: on ? 600 : 400, whiteSpace: 'nowrap', flex: 'none' }}>{label}<span style={{ fontSize: 12, fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: on ? T.bg : T.ink3, opacity: on ? .75 : 1 }}>{n}</span></span>;
function HbCensus({ T, fam = 0, ent = 'Products' }) {
  const list = fam === 0 ? HB_ITEMS : HB_LEDGERS;
  return <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 24px', borderBottom: `1px solid ${T.line}`, flex: 'none' }}>
    <HbFam T={T} on={fam} /><span style={{ width: 1, height: 22, background: T.line2, margin: '0 2px' }} />
    {list.map(([l, n]) => <HbEnt key={l} T={T} label={l} n={n} on={l === ent} />)}
  </div>;
}
function HbAlerts({ T }) {
  return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 8, padding: '12px 24px 0' }}>
    {HB_ALERTS.map(([n, l, , ic]) => <span key={l} className="press" style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0, padding: '7px 12px 7px 14px', borderRadius: 16, border: `1px solid ${T.line2}`, background: T.surface }}>
      <span style={{ fontFamily: T.fontDisplay, fontSize: 27, fontWeight: 600, color: T.ink, lineHeight: 1, fontVariantNumeric: 'lining-nums tabular-nums' }}>{n}</span>
      <span style={{ flex: 1, minWidth: 0, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2, lineHeight: 1.22 }}>{l}</span>
      <Ic name={ic} size={14} color={T.ink3} />
    </span>)}
  </div>;
}
const HbTool = ({ T, children, icon, caret, style }) => <span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, height: 34, padding: '0 12px', borderRadius: 999, border: `1px solid ${T.line2}`, background: T.surface, color: T.ink, fontFamily: T.fontUI, fontSize: 12.5, fontWeight: 500, whiteSpace: 'nowrap', flex: 'none', ...style }}>{icon && <Ic name={icon} size={14} />}{children}{caret && <Ic name="chevron-down" size={12} color={T.ink3} />}</span>;
function HbToolbar({ T, view = 'grid', newLabel = 'New product', ph = 'Design no, name or colour' }) {
  return <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 24px 0' }}>
    <span style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 8, height: 34, padding: '0 12px', borderRadius: 999, border: `1px solid ${T.line2}`, background: T.surface, fontFamily: T.fontUI, fontSize: 12.5, color: T.ink3, whiteSpace: 'nowrap', overflow: 'hidden' }}><Ic name="search" size={14} color={T.ink2} /><span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{ph}</span></span>
    <HbTool T={T} caret>Filters</HbTool><HbTool T={T} caret>Views</HbTool><HbTool T={T}>Columns 8/12</HbTool>
    <span style={{ display: 'inline-flex', padding: 2, borderRadius: 999, border: `1px solid ${T.line2}`, background: T.surface, flex: 'none' }}>{[['layout-grid', 'grid'], ['list', 'list']].map(([ic, k]) => <span key={k} className="press" style={{ width: 30, height: 28, borderRadius: 999, display: 'grid', placeItems: 'center', background: view === k ? T.ink : 'transparent', color: view === k ? T.bg : T.ink2 }}><Ic name={ic} size={14} /></span>)}</span>
    <HbTool T={T}>Export</HbTool><HbTool T={T}>Import</HbTool>
    <T.Btn small icon="plus" style={{ height: 34 }}>{newLabel}</T.Btn>
  </div>;
}

/* a design card as the catalogue draws it, plus the master facts under it and a "No photo yet" state */
function HbCard({ T, d, on }) {
  return <div className="press" style={{ minWidth: 0 }}>
    <div style={{ position: 'relative', aspectRatio: '4/5', borderRadius: T.rPhoto, background: d.src ? T.photoBg : T.bg2, boxShadow: on ? `0 0 0 2px ${T.bg}, 0 0 0 3.5px ${T.ink}` : d.src && !T.dark ? '0 6px 18px -10px rgba(36,23,18,.35)' : 'none', overflow: 'hidden' }}>
      {d.src ? <>
        <img src={d.src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '30%', background: 'linear-gradient(180deg, rgba(20,18,17,0), rgba(20,18,17,.42))', pointerEvents: 'none' }} />
        {(d.tag || d.note) && <div style={{ position: 'absolute', top: 7, left: 7, display: 'flex', gap: 4, flexWrap: 'wrap' }}>{d.tag && <T.PhotoTag>{d.tag}</T.PhotoTag>}{d.note && <T.PhotoTag tone="danger">{d.note}</T.PhotoTag>}</div>}
      </> : <div style={{ position: 'absolute', inset: 0, border: `1px dashed ${T.line2}`, borderRadius: T.rPhoto, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 9 }}>
        <span style={{ width: 46, height: 46, borderRadius: 23, background: T.chipBg, display: 'grid', placeItems: 'center', color: T.ink2 }}><Ic name="image-off" size={21} sw={1.5} /></span>
        <span style={{ fontFamily: T.fontUI, fontSize: 12.5, color: T.ink2 }}>No photo yet</span>
      </div>}
      <span style={{ position: 'absolute', left: 9, bottom: 9, display: 'flex' }}><T.Bars names={d.colours} light={!!d.src} /></span>
    </div>
    <div style={{ padding: '6px 3px 0' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 19, fontWeight: 600, color: T.ink, letterSpacing: '.01em', fontVariantNumeric: 'tabular-nums', lineHeight: 1.1 }}>{d.code}</span><span style={{ flex: 1 }} /><PriceF v={d.price} size={16} font={T.fontSerif} color={T.ink} dim={T.ink3} /></div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, marginTop: 2, lineHeight: 1.15, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.cat}<span style={{ opacity: .6 }}>·</span><span style={{ color: T.ink2 }}>{d.name}</span></div>
      <div style={{ marginTop: 6 }}><HbFacts T={T} d={d} /></div>
    </div>
  </div>;
}

/* the dossier of one product in the right pane: tabs as chips, then the overview facts */
function HbProductPane({ T, d }) {
  const cols = [['Sky', 9, 10, 30], ['Purple', 2, 2, 0], ['Seagreen', 5, 6, 0], ['Peach', 4, 4, 0]];   /* free · FG · in production; they add up to the card */
  const facts = [['Category', d.cat], [<span>Price<HbLock T={T} /></span>, <PriceF v={d.price} size={15} font={T.fontSerif} color={T.ink} dim={T.ink3} />], ['HSN and GST', <span style={{ color: T.ink3 }}>not set · open U33</span>], ['Demand score', '78 · rank 12 of 612'], [<span>Sold<HbLock T={T} /></span>, '360 pcs · ₹17.9L']];
  return <div style={{ padding: '14px 16px 14px', display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <HbThumb T={T} d={d} w={56} h={70} r={12} />
      <span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 28, fontWeight: 600, color: T.ink, lineHeight: 1.05, fontVariantNumeric: 'tabular-nums' }}>{d.code}</div><Meta T={T} style={{ display: 'block', marginTop: 3 }}>{d.cat} · {d.name} · {d.colours.length} colours</Meta><div style={{ display: 'flex', gap: 8, marginTop: 5 }}><T.Tag>{d.tag}</T.Tag><T.Tag tone="danger">{d.note}</T.Tag></div></span>
    </div>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>{HB_DOSSIER.map((t, i) => <T.Chip key={t} on={i === 0} style={{ height: 26, padding: '0 10px', fontSize: 11.5 }}>{t}</T.Chip>)}</div>
    <div style={{ display: 'flex', gap: 6, marginTop: 12 }}><T.Kpi small label="Free" value={d.free} /><T.Kpi small label="FG" value={d.fg} sub="2 reserved" /><T.Kpi small label="In production" value={d.prod} /></div>
    <HbLab T={T} style={{ marginTop: 14, marginBottom: 4 }} right={<span style={{ letterSpacing: 0, textTransform: 'none', fontSize: 10.5 }}>free · reserved · coming</span>}>Stock by colour</HbLab>
    {cols.map(([n, f, g, p]) => <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 9, height: 26 }}><HbDot n={n} /><span style={{ width: 62, fontFamily: T.fontUI, fontSize: 12.5, color: T.ink }}>{n}</span><Stack T={T} f={f} r={g - f} p={p} max={40} /><span style={{ width: 26, textAlign: 'right', fontFamily: T.fontUI, fontSize: 12.5, fontWeight: 600, color: T.ink, fontVariantNumeric: 'tabular-nums' }}>{f}</span></div>)}
    <div style={{ marginTop: 10, borderTop: `1px solid ${T.line}` }}>{facts.map(([l, v], i) => <div key={i} style={{ display: 'flex', alignItems: 'center', height: 30, borderBottom: `1px solid ${T.line}`, fontFamily: T.fontUI, fontSize: 12.5 }}><span style={{ flex: 1, color: T.ink3 }}>{l}</span><span style={{ color: T.ink, fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>{v}</span></div>)}</div>
    <span style={{ flex: 1 }} />
    <div style={{ display: 'flex', gap: 8, paddingTop: 10 }}><OutBtn T={T} icon="folder-open" style={{ flex: 1, justifyContent: 'center' }}>Open dossier</OutBtn><OutBtn T={T} icon="image-up" style={{ flex: 1, justifyContent: 'center' }}>Add photos</OutBtn></div>
  </div>;
}

/* ── W1 · Masters, products grid ── */
function WebHbMasters({ T }) {
  const list = ['2798', '1457', '6002', '2006', '4566', '3661', '1243', 'D9107'].map(hbD);
  return <HbShell T={T} crumb={['Hub', 'Masters', 'Products']} tabs={hbTabs({ ...HB_T_MASTERS, on: true }, { icon: 'shirt', label: '2798 · Plazo set' })} paneTitle="Product · 2798" pane={<HbProductPane T={T} d={hbD('2798')} />}>
    <HbCensus T={T} />
    <HbAlerts T={T} />
    <HbToolbar T={T} />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: '16px 14px', padding: '14px 24px 24px', alignItems: 'start' }}>{list.map(d => <HbCard key={d.code} T={T} d={d} on={d.code === '2798'} />)}</div>
  </HbShell>;
}

/* ── phone: header block on the lifted surface (title, search and filter, then whatever the screen puts in it) ── */
function HbHeaderP({ T, title, back, right, children }) {
  return <div style={{ background: T.header, borderBottom: `1px solid ${T.line}`, boxShadow: T.headerShadow, marginTop: -54, paddingTop: 54, paddingBottom: 10, flex: 'none' }}>
    <div style={{ display: 'flex', alignItems: 'center', height: 44, padding: '0 8px 0 14px', gap: 4 }}>
      {back && <Hit T={T} icon="chevron-left" size={38} iconSize={21} style={{ marginLeft: -8 }} />}
      <span style={{ fontFamily: T.fontDisplay, fontSize: 24, fontWeight: 500, color: T.ink, letterSpacing: '-.01em', whiteSpace: 'nowrap' }}>{title}</span>
      <span style={{ flex: 1 }} />{right}
    </div>
    {children}
  </div>;
}
const HbAlertP = ({ T, n, label, ic }) => <span className="press" style={{ display: 'inline-flex', alignItems: 'baseline', gap: 6, height: 32, padding: '0 11px', borderRadius: 999, border: `1px solid ${T.line2}`, background: T.surface, flex: 'none', whiteSpace: 'nowrap', alignSelf: 'flex-start', lineHeight: '30px' }}><span style={{ fontFamily: T.fontDisplay, fontSize: 18, fontWeight: 600, color: T.ink, fontVariantNumeric: 'lining-nums tabular-nums' }}>{n}</span><span style={{ fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2 }}>{label}</span></span>;
const HbRowP = ({ T, d, i }) => <div className="press" style={{ display: 'flex', gap: 12, padding: '10px 0', borderTop: i ? `1px solid ${T.line}` : 0 }}>
  <HbThumb T={T} d={d} w={62} h={78} r={12} />
  <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 20, fontWeight: 600, color: T.ink, fontVariantNumeric: 'tabular-nums' }}>{d.code}</span>{!d.src ? <T.Tag tone="muted">No photo yet</T.Tag> : d.tag && <T.Tag tone={d.tagTone === 'gold' ? 'gold' : 'accent'}>{d.tag}</T.Tag>}<span style={{ flex: 1 }} /><PriceF v={d.price} size={15} font={T.fontSerif} color={T.ink} dim={T.ink3} /></div>
    <div style={{ marginTop: 2, fontFamily: T.fontUI, fontSize: 12, color: T.ink3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.cat} · <span style={{ color: T.ink2 }}>{d.name}</span> · {d.colours.length} {d.colours.length === 1 ? 'colour' : 'colours'}</div>
    <div style={{ marginTop: 'auto', paddingTop: 5 }}><HbFacts T={T} d={d} size="s" /></div>
  </div>
</div>;
const HbFab = ({ T, label = 'New product', icon = 'plus' }) => <div style={{ position: 'absolute', right: 14, bottom: 98 }}><T.Btn icon={icon} style={{ height: 46, boxShadow: T.dark ? '0 10px 30px -10px rgba(0,0,0,.7)' : '0 12px 28px -12px rgba(36,23,18,.5)' }}>{label}</T.Btn></div>;
function HbMastersBodyP({ T }) {
  const list = ['2798', '6002', '2006', '4566', '3661', '1457'].map(hbD);
  return <>
    <HbHeaderP T={T} title="Master views" right={<><Hit T={T} icon="search" size={38} iconSize={18} /><Hit T={T} icon="sliders-horizontal" size={38} iconSize={18} /></>}>
      <div style={{ padding: '2px 14px 0' }}><HbFam T={T} on={0} w="100%" /></div>
      <div style={{ display: 'flex', gap: 6, padding: '10px 14px 0', overflow: 'hidden' }}>{HB_ITEMS.map(([l, n]) => <HbEnt key={l} T={T} label={l} n={n} on={l === 'Products'} />)}</div>
      <div style={{ display: 'flex', gap: 6, padding: '10px 0 0 14px', overflow: 'hidden', WebkitMaskImage: 'linear-gradient(90deg, #000 86%, transparent)', maskImage: 'linear-gradient(90deg, #000 86%, transparent)' }}>{HB_ALERTS.map(([n, , l, ic]) => <HbAlertP key={l} T={T} n={n} label={l} ic={ic} />)}</div>
    </HbHeaderP>
    <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', padding: '8px 14px 130px' }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '0 2px 2px' }}><Meta T={T}>50 of 612 designs · last edited first</Meta><span style={{ flex: 1 }} /><Meta T={T}>Columns 8/12</Meta></div>
      {list.map((d, i) => <HbRowP key={d.code} T={T} d={d} i={i} />)}
    </div>
  </>;
}
/* ── P1 · Masters, products list ── */
function ScreenHbMasters({ T }) { return frameF(T, <HbMastersBodyP T={T} />, <><HbFab T={T} /><T.Island active="More" /></>); }

/* ── P2 · new product sheet: the phone's job is the photo, so every colour has a camera ── */
function ScreenHbNewProduct({ T }) {
  return frameF(T, <HbMastersBodyP T={T} />, <>{scrimF(T)}<Sheet T={T} h={640} title="New product" foot={<div style={{ display: 'flex', gap: 8 }}><OutBtn T={T} style={{ height: 46, padding: '0 20px' }}>Save</OutBtn><T.Btn icon="camera" style={{ flex: 1, height: 46 }}>Save and add photos</T.Btn></div>}>
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', paddingTop: 2 }}>
      <HbThumb T={T} d={{}} w={64} h={80} r={12} />
      <div style={{ flex: 1, minWidth: 0 }}><HbField T={T} label="Design no" value="8591" mono /><Meta T={T} style={{ display: 'block', marginTop: 6 }}>next in the Lehenga series</Meta></div>
    </div>
    <HbLab T={T} style={{ marginTop: 14 }}>Category</HbLab>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{HB_CATS.map(c => <T.Chip key={c} on={c === 'Lehenga'} style={{ height: 34, padding: '0 14px', fontSize: 13 }}>{c}</T.Chip>)}</div>
    <HbLab T={T} style={{ marginTop: 14 }} right={<span style={{ letterSpacing: 0, textTransform: 'none', fontSize: 10.5 }}>one design + one colour = one SKU</span>}>Colours</HbLab>
    <div style={{ borderRadius: 16, border: `1px solid ${T.line}`, background: T.surface, overflow: 'hidden' }}>{HB_NEW.colours.map((n, i) => <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '7px 8px 7px 12px', borderTop: i ? `1px solid ${T.line}` : 0 }}>
      <HbSwatch n={n} w={34} h={34} r={10} /><span style={{ flex: 1, minWidth: 0, fontFamily: T.fontUI, fontSize: 14.5, color: T.ink }}>{n}</span>
      <span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: T.fontUI, fontSize: 12, color: i === 0 ? T.ink : T.ink3 }}><HbRadio T={T} on={i === 0} />Primary</span>
      <Hit T={T} icon="camera" size={44} iconSize={20} style={{ border: `1px solid ${T.line2}`, background: T.surface2 }} />
    </div>)}</div>
    <OutBtn T={T} small icon="plus" style={{ marginTop: 8 }}>Add colour</OutBtn>
    <Meta T={T} style={{ display: 'block', marginTop: 12, whiteSpace: 'normal' }}>Work, price, HSN and GST are filled on the desk; price is admin's.</Meta>
  </Sheet></>);
}

/* ── W2 · new product master ── */
const HbSlotAdd = ({ T, w = 104, label = 'Add photo' }) => <span className="press" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, width: w, height: 38, borderRadius: 10, border: `1px dashed ${T.line2}`, color: T.ink2, fontFamily: T.fontUI, fontSize: 12.5, flex: 'none', boxSizing: 'border-box' }}><Ic name="camera" size={15} />{label}</span>;
const HbColourRow = ({ T, name, primary, first, src }) => <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '6px 12px', borderTop: first ? 0 : `1px solid ${T.line}` }}>
  <HbSwatch n={name} w={34} h={34} r={10} /><span style={{ flex: 1, minWidth: 0, fontFamily: T.fontUI, fontSize: 14, color: T.ink }}>{name}</span>
  <span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: T.fontUI, fontSize: 12.5, color: primary ? T.ink : T.ink3 }}><HbRadio T={T} on={primary} />Primary</span>
  {src ? <HbThumb T={T} src={src} w={38} h={38} r={9} /> : <HbSlotAdd T={T} />}
  <Ic name="x" size={14} color={T.ink3} />
</div>;
function HbChecklist({ T, items, foot, extra }) {
  const done = items.filter(i => i[0]).length;
  return <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box' }}>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 32, fontWeight: 600, color: T.ink, lineHeight: 1, fontVariantNumeric: 'lining-nums' }}>{done}</span><span style={{ fontFamily: T.fontUI, fontSize: 13.5, color: T.ink3 }}>of {items.length} done · what the master still needs</span></div>
    <div style={{ marginTop: 10, height: 5, borderRadius: 3, background: T.chipBg }}><span style={{ display: 'block', width: Math.round(done / items.length * 100) + '%', height: 5, borderRadius: 3, background: T.ok }} /></div>
    <div style={{ marginTop: 8 }}>{items.map(([ok, t, m], i) => <div key={t} className="press" style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '10px 0', borderTop: i ? `1px solid ${T.line}` : 0 }}><HbTick T={T} done={ok} /><span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontUI, fontSize: 13.5, fontWeight: 500, color: ok ? T.ink2 : T.ink }}>{t}</div><Meta T={T} style={{ display: 'block', marginTop: 1 }}>{m}</Meta></span>{!ok && <Ic name="chevron-right" size={15} color={T.ink3} />}</div>)}</div>
    {extra}
    <span style={{ flex: 1 }} />
    <Meta T={T} style={{ display: 'block', whiteSpace: 'normal', lineHeight: 1.35 }}>{foot}</Meta>
  </div>;
}
function HbFormTabs({ T, on }) { return <ViewTabs T={T} back="Products" tabs={[['New product', null, 'shirt'], ['New material', null, 'layers']]} active={on} />; }
function WebHbNewProduct({ T }) {
  const items = [[true, 'Design no and category', '8591 · Lehenga'], [true, '3 colours', 'Rani · Firozi · Mehroon'], [false, '0 photos', 'a primary photo per colour comes first'], [false, 'Recipe not set', 'Production › Process setting'], [false, 'Price TBD', 'admin sets it after costing'], [false, 'HSN and GST', 'to be decided · open U33']];
  return <HbShell T={T} crumb={['Hub', 'Masters', 'Products', 'New product']} tabs={hbTabs(HB_T_MASTERS, { icon: 'plus', label: 'New product · 8591', on: true })} paneTitle="Checklist" pane={<HbChecklist T={T} items={items} foot="A master can be saved with gaps. Only design no, category and one colour are needed; the rest stays on this list until it is closed." />}>
    <HbFormTabs T={T} on="New product" />
    <div style={{ flex: 1, minHeight: 0, padding: '14px 24px 16px', display: 'flex' }}>
      <div style={{ ...hbCardStyle(T), flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ flex: 1, minHeight: 0, display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 30, padding: '14px 22px 0' }}>
          <div style={{ minWidth: 0 }}>
            <Sect T={T} style={{ margin: '0 0 10px' }}>Identity</Sect>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <HbThumb T={T} d={{}} w={64} h={80} r={12} />
              <div style={{ width: 150, flex: 'none' }}><HbField T={T} label="Design no" value="8591" mono /><Meta T={T} style={{ display: 'block', marginTop: 5 }}>next in the Lehenga series</Meta></div>
              <HbField T={T} label="Name · optional" ph="No name yet" />
            </div>
            <HbLab T={T} style={{ marginTop: 12 }}>Category</HbLab>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{HB_CATS.map(c => <T.Chip key={c} on={c === 'Lehenga'}>{c}</T.Chip>)}</div>
            <HbLab T={T} style={{ marginTop: 12 }}>Work</HbLab>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{HB_WORKS.map(c => <T.Chip key={c} on={c === 'Zari'}>{c}</T.Chip>)}</div>
            <HbField T={T} label="Book / firm" value="SRS" caret small w={200} style={{ marginTop: 12 }} />
            <Sect T={T} style={{ margin: '14px 0 8px' }} right={<><Meta T={T}>one colour = one SKU</Meta><OutBtn T={T} small icon="plus" style={{ marginLeft: 6 }}>Add colour</OutBtn></>}>Colours</Sect>
            <div style={{ borderRadius: 16, border: `1px solid ${T.line}`, background: T.surface2, overflow: 'hidden' }}>
              {HB_NEW.colours.map((n, i) => <HbColourRow key={n} T={T} name={n} primary={i === 0} first={i === 0} />)}
            </div>
          </div>
          <div style={{ minWidth: 0 }}>
            <Sect T={T} style={{ margin: '0 0 10px' }}>Price and tax</Sect>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}><HbField T={T} label={<span>Price<HbLock T={T} /></span>} ph="TBD until costing" dim /><OutBtn T={T} icon="lock" style={{ height: 40 }}>Set price</OutBtn></div>
            <Meta T={T} style={{ display: 'block', marginTop: 5 }}>admin only · costing comes first</Meta>
            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}><HbField T={T} label="HSN code" ph="not set" /><HbField T={T} label="GST %" ph="not set" caret w={110} /></div>
            <Meta T={T} style={{ display: 'block', marginTop: 5 }}>To be decided (open U33)</Meta>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 18, padding: '10px 14px', borderRadius: 14, background: T.surface2, border: `1px solid ${T.line}` }}><span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontUI, fontSize: 13.5, color: T.ink }}>Active on online (Raaslila)</div><Meta T={T} style={{ display: 'block', marginTop: 1 }}>off until photos and price are in</Meta></span><HbSwitch T={T} on={false} /></div>
            <HbLab T={T} style={{ marginTop: 18 }}>Tags</HbLab>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderRadius: 12, border: `1px dashed ${T.line2}`, color: T.ink3, fontFamily: T.fontUI, fontSize: 12 }}><Ic name="tags" size={14} />Promotional badges: set later by the sale manager</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 22px', borderTop: `1px solid ${T.line}`, background: T.surface2 }}>
          <Meta T={T}>Draft master · not in the catalogue yet</Meta><span style={{ flex: 1 }} />
          <OutBtn T={T} style={{ height: 42 }}>Save</OutBtn>
          <OutBtn T={T} style={{ height: 42 }}>Save and set recipe<Ic name="arrow-right" size={14} />Production</OutBtn>
          <T.Btn icon="camera" style={{ height: 42 }}>Save and add photos</T.Btn>
        </div>
      </div>
    </div>
  </HbShell>;
}

/* ── Upload centre · the per-colour checklist of required pictures (BRD F:66–71) ──
   required: Primary (in-house model shoot) · Side profiles × 4 · AI shoot · Video = 7; Real-world shoot is optional */
const HB_REQ = 7;
const HbPicStyle = k => k === 'flip' ? { transform: 'scaleX(-1)' } : k === 'zoom' ? { transform: 'scale(1.6)', transformOrigin: '80% 30%' } : {};
function HbSlot({ T, label, sub, src, pic, star, busy, optional }) {
  return <div style={{ minWidth: 0 }}>
    <div className="press" style={{ position: 'relative', aspectRatio: '5/6', borderRadius: 14, overflow: 'hidden', boxSizing: 'border-box', background: src ? T.photoBg : T.surface2, border: src || busy ? 0 : `1.5px dashed ${T.line2}`, boxShadow: src && !T.dark ? '0 6px 16px -10px rgba(36,23,18,.35)' : 'none' }}>
      {src && <img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', ...HbPicStyle(pic) }} />}
      {star && <span style={{ position: 'absolute', left: 7, top: 7, display: 'inline-flex', alignItems: 'center', gap: 4, height: 22, padding: '0 9px 0 7px', borderRadius: 11, fontFamily: T.fontUI, fontSize: 10.5, fontWeight: 500, ...veil({ background: 'rgba(20,18,17,.46)' }) }}><Ic name="star" size={11} style={{ fill: '#fff' }} />Primary</span>}
      {busy && <><img src={busy.src} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: .3, filter: 'grayscale(1)', ...HbPicStyle(busy.pic) }} /><span style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontFamily: T.fontDisplay, fontSize: 26, fontWeight: 600, color: T.ink, fontVariantNumeric: 'lining-nums' }}>{busy.pct}%</span><span style={{ position: 'absolute', left: 10, right: 10, bottom: 10, height: 4, borderRadius: 2, background: T.chipBg }}><span style={{ display: 'block', width: busy.pct + '%', height: 4, borderRadius: 2, background: T.ink }} /></span></>}
      {!src && !busy && <span style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, color: T.ink2, fontFamily: T.fontUI, fontSize: 12 }}><span style={{ width: 30, height: 30, borderRadius: 15, background: T.chipBg, display: 'grid', placeItems: 'center' }}><Ic name="plus" size={16} /></span>Add</span>}
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 5, fontFamily: T.fontUI, fontSize: 11.5, color: src ? T.ink2 : T.ink3 }}>{src && <Ic name="check" size={12} color={T.ok} sw={2.4} />}{label}{sub && <span style={{ color: T.ink3 }}>· {sub}</span>}</div>
  </div>;
}
const HbSlotWide = ({ T, ic, title, meta, tag }) => <div className="press" style={{ display: 'flex', alignItems: 'center', gap: 11, height: 56, padding: '0 12px', borderRadius: 14, border: `1.5px dashed ${T.line2}`, background: T.surface2, boxSizing: 'border-box', minWidth: 0 }}>
  <span style={{ width: 38, height: 38, borderRadius: 19, background: T.chipBg, display: 'grid', placeItems: 'center', color: T.ink2, flex: 'none' }}><Ic name={ic} size={18} /></span>
  <span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontUI, fontSize: 13, color: T.ink, whiteSpace: 'nowrap' }}>{title}{tag && <span style={{ marginLeft: 6, fontSize: 10.5, color: T.ink3 }}>{tag}</span>}</div><Meta T={T} style={{ display: 'block', marginTop: 1 }}>{meta}</Meta></span>
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: T.fontUI, fontSize: 12, color: T.ink2, flex: 'none' }}><Ic name="plus" size={14} />Add</span>
</div>;
const HbColourTabs = ({ T, tabs, on }) => <div style={{ display: 'flex', alignItems: 'center', gap: 2, padding: '4px 24px 0', borderBottom: `1px solid ${T.line}`, flex: 'none' }}>
  <span style={{ fontFamily: T.fontUI, fontSize: 10.5, letterSpacing: '.09em', textTransform: 'uppercase', color: T.ink3, marginRight: 6 }}>Colour</span>
  {tabs.map(([n, d]) => { const o = n === on; return <span key={n} className="press" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 12px 12px', fontFamily: T.fontUI, fontSize: 14, fontWeight: o ? 600 : 400, color: o ? T.ink : T.ink3, whiteSpace: 'nowrap' }}><HbDot n={n} s={11} />{n}<span style={{ fontSize: 11.5, color: T.ink3, fontVariantNumeric: 'tabular-nums', fontWeight: 400 }}>{d} of {HB_REQ}</span>{o && <span style={{ position: 'absolute', left: 12, right: 12, bottom: 0, height: 2, background: T.accent, borderRadius: 1 }} />}</span>; })}
</div>;
const HbUp = ({ T, name, pct, pic }) => <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9, height: 36, padding: '0 11px 0 5px', borderRadius: 999, border: `1px solid ${T.line2}`, background: T.surface, fontFamily: T.fontUI, fontSize: 12, color: T.ink, whiteSpace: 'nowrap' }}>
  <HbThumb T={T} src={hbPic('6002')} w={24} h={28} r={7} /><span style={{ fontFamily: T.fontMono, fontSize: 11.5 }}>{name}</span>
  <span style={{ width: 60, height: 4, borderRadius: 2, background: T.chipBg }}><span style={{ display: 'block', width: pct + '%', height: 4, borderRadius: 2, background: T.ink }} /></span>
  <b style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums', minWidth: 28 }}>{pct}%</b><Ic name="x" size={12} color={T.ink3} />
</span>;
function HbProgressPane({ T }) {
  const rows = [['Rani', 3, 2], ['Firozi', 0, 0], ['Mehroon', 0, 0]];
  return <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box' }}>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 32, fontWeight: 600, color: T.ink, lineHeight: 1, fontVariantNumeric: 'lining-nums' }}>3</span><span style={{ fontFamily: T.fontUI, fontSize: 13.5, color: T.ink3 }}>of 21 required pictures · 2 uploading</span></div>
    <HbLab T={T} style={{ marginTop: 16, marginBottom: 2 }}>Per colour</HbLab>
    {rows.map(([n, d, u], i) => <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderTop: i ? `1px solid ${T.line}` : 0 }}>
      <HbDot n={n} s={12} /><span style={{ width: 62, fontFamily: T.fontUI, fontSize: 13, color: T.ink, fontWeight: n === 'Rani' ? 600 : 400 }}>{n}</span>
      <span style={{ flex: 1, height: 5, borderRadius: 3, background: T.chipBg, display: 'flex' }}><span style={{ width: Math.round(d / HB_REQ * 100) + '%', background: T.ok, borderRadius: 3 }} /></span>
      <span style={{ minWidth: 86, textAlign: 'right', fontFamily: T.fontUI, fontSize: 12, color: T.ink3 }}><b style={{ color: T.ink, fontWeight: 600 }}>{d}</b> done · <span style={{ color: d < HB_REQ ? T.danger : T.ink3 }}>{HB_REQ - d} missing</span></span>
    </div>)}
    <HbLab T={T} style={{ marginTop: 18 }}>Primary image</HbLab>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 10, borderRadius: 16, background: T.surface2, border: `1px solid ${T.line}` }}>
      <HbThumb T={T} src={hbPic('6002')} w={50} h={62} r={11} />
      <span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontUI, fontSize: 13.5, color: T.ink, fontWeight: 500 }}>Rani · model shoot</div><Meta T={T} style={{ display: 'block', whiteSpace: 'normal', lineHeight: 1.35, marginTop: 2 }}>leads search, the grid and batch cards for 8591</Meta></span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}><OutBtn T={T} icon="star" small>Set as primary</OutBtn><Meta T={T} style={{ whiteSpace: 'normal', lineHeight: 1.3 }}>open another picture first</Meta></div>
    <span style={{ flex: 1 }} />
    <Meta T={T} style={{ display: 'block', whiteSpace: 'normal', lineHeight: 1.35 }}>8591 stays in "no photo yet" until its primary picture is in.</Meta>
  </div>;
}
function WebHbUpload({ T }) {
  const side = [['Side 1', { src: hbPic('6002'), pic: 'flip' }], ['Side 2', { src: hbPic('6002'), pic: 'zoom' }], ['Side 3', { busy: { src: hbPic('6002'), pic: 'flip', pct: 62 } }], ['Side 4', { busy: { src: hbPic('6002'), pic: 'zoom', pct: 18 } }]];
  return <HbShell T={T} section="Upload centre" crumb={['Hub', 'Upload centre', '8591', 'Rani']} tabs={hbTabs(HB_T_MASTERS, { icon: 'shirt', label: '8591 · Lehenga' }, { icon: 'image-up', label: 'Upload centre · 8591', on: true })} paneTitle="Progress" pane={<HbProgressPane T={T} />}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 24px 8px', flex: 'none' }}>
      <HbThumb T={T} src={hbPic('6002')} w={44} h={54} r={11} />
      <span style={{ minWidth: 0 }}><div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 30, fontWeight: 600, color: T.ink, lineHeight: 1.05, fontVariantNumeric: 'tabular-nums' }}>8591</span><span style={{ fontFamily: T.fontUI, fontSize: 13.5, color: T.ink3 }}>Lehenga · No name yet</span></div><Meta T={T} style={{ display: 'block', marginTop: 2 }}>3 colours · Zari · SRS · created 13/10/26</Meta></span>
      <span style={{ flex: 1 }} /><OutBtn T={T} icon="shirt">Open product</OutBtn>
    </div>
    <HbColourTabs T={T} tabs={[['Rani', 3], ['Firozi', 0], ['Mehroon', 0]]} on="Rani" />
    <div style={{ flex: 1, minHeight: 0, padding: '12px 24px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ ...hbCardStyle(T), padding: '10px 18px 14px', flex: 'none' }}>
        <Sect T={T} style={{ margin: '0 0 8px' }} right={<Meta T={T}>3 of 7 done · real-world shoot is optional</Meta>}>Required pictures · Rani</Sect>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: '0 12px' }}>
          <HbLab T={T} style={{ gridColumn: '1' }}>Primary · model shoot</HbLab>
          <HbLab T={T} style={{ gridColumn: '2 / span 4' }} right={<span style={{ letterSpacing: 0, textTransform: 'none', fontSize: 10.5 }}>2 of 4 · 2 uploading</span>}>Side profiles × 4</HbLab>
          <HbSlot T={T} label="Primary" src={hbPic('6002')} star />
          {side.map(([l, o]) => <HbSlot key={l} T={T} label={l} {...o} />)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12, marginTop: 10 }}>
          <HbSlotWide T={T} ic="sparkles" title="AI shoot" meta="from Studio, or add one" />
          <HbSlotWide T={T} ic="camera" title="Real-world shoot" tag="optional" meta="if one exists" />
          <HbSlotWide T={T} ic="video" title="Video" meta="any video shot for it" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 52, padding: '0 14px', borderRadius: 16, border: `1.5px dashed ${T.line2}`, background: T.chipBg, marginTop: 10, boxSizing: 'border-box' }}>
          <Ic name="upload-cloud" size={22} color={T.ink2} /><span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontUI, fontSize: 13.5, color: T.ink }}>Drop pictures here or press Upload</div><Meta T={T} style={{ display: 'block' }}>they fill the next empty slot of Rani, in order; drag one to move it</Meta></span><OutBtn T={T} icon="upload">Upload</OutBtn>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}><HbUp T={T} name="rani-side-3.jpg" pct={62} /><HbUp T={T} name="rani-side-4.jpg" pct={18} /></div>
      </div>
      <div style={{ ...hbCardStyle(T), background: T.surface2, display: 'flex', alignItems: 'center', gap: 16, padding: '10px 18px', flex: 'none' }}>
        <span style={{ fontFamily: T.fontDisplay, fontSize: 36, fontWeight: 600, color: T.ink, lineHeight: 1, fontVariantNumeric: 'lining-nums' }}>104</span>
        <span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 19, fontWeight: 600, color: T.ink }}>designs with no photo yet</div><Meta T={T} style={{ display: 'block', marginTop: 1 }}>Bulk · 12 done today · the queue opens each design and its colours one after another</Meta></span>
        <T.Btn icon="play">Start the queue</T.Btn>
      </div>
    </div>
  </HbShell>;
}

/* ── phone: capture per colour ── */
const HbCorner = ({ pos }) => { const [v, h] = pos; return <span style={{ position: 'absolute', [v]: 16, [h]: 16, width: 22, height: 22, [`border${v === 'top' ? 'Top' : 'Bottom'}`]: '2px solid rgba(255,255,255,.85)', [`border${h === 'left' ? 'Left' : 'Right'}`]: '2px solid rgba(255,255,255,.85)', borderRadius: v === 'top' ? (h === 'left' ? '8px 0 0 0' : '0 8px 0 0') : (h === 'left' ? '0 0 0 8px' : '0 0 8px 0') }} />; };
function ScreenHbUploadPhone({ T }) {
  const pb = T.dark ? T.ink : T.accent, pf = T.dark ? T.bg : T.onAccent;
  const slots = [['Primary', 'cur'], ['Side 1', 'done', 'flip'], ['Side 2', 'done', 'zoom'], ['Side 3'], ['Side 4'], ['AI'], ['Video']];
  return frameF(T, <>
    <HbHeaderP T={T} title="Upload centre" back right={<Meta T={T}>Lehenga · 3 colours</Meta>}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px 14px 0' }}>
        <HbThumb T={T} src={hbPic('6002')} w={40} h={50} r={10} />
        <span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 22, fontWeight: 600, color: T.ink, lineHeight: 1.1, fontVariantNumeric: 'tabular-nums' }}>8591 · Rani</div><Meta T={T} style={{ display: 'block', marginTop: 1 }}>colour 1 of 3 · 3 of 7 pictures done</Meta></span>
      </div>
      <div style={{ display: 'flex', gap: 6, padding: '10px 14px 0' }}>{['Rani', 'Firozi', 'Mehroon'].map((n, i) => <T.Chip key={n} on={i === 0} style={{ height: 30 }}><span style={{ width: 9, height: 9, borderRadius: 5, background: hbShade(n), boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.35)' }} />{n}</T.Chip>)}</div>
    </HbHeaderP>
    <div style={{ flex: 1, minHeight: 0, margin: '12px 14px 0', borderRadius: 26, position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #2b221e 0%, #15100d 100%)' }}>
      {[33, 66].map(p => <span key={'v' + p} style={{ position: 'absolute', left: p + '%', top: 0, bottom: 0, width: 1, background: 'rgba(255,255,255,.08)' }} />)}{[33, 66].map(p => <span key={'h' + p} style={{ position: 'absolute', top: p + '%', left: 0, right: 0, height: 1, background: 'rgba(255,255,255,.08)' }} />)}
      <HbCorner pos={['top', 'left']} /><HbCorner pos={['top', 'right']} /><HbCorner pos={['bottom', 'left']} /><HbCorner pos={['bottom', 'right']} />
      <span style={{ position: 'absolute', left: 14, top: 14, display: 'inline-flex', alignItems: 'center', gap: 7, height: 32, padding: '0 13px 0 11px', borderRadius: 16, fontFamily: T.fontUI, fontSize: 13, fontWeight: 500, ...veil({ background: 'rgba(20,18,17,.5)' }) }}><Ic name="camera" size={15} />Primary · model shoot</span>
      <span style={{ position: 'absolute', right: 14, top: 14, display: 'inline-flex', alignItems: 'center', height: 32, padding: '0 12px', borderRadius: 16, fontFamily: T.fontUI, fontSize: 12.5, fontWeight: 600, color: T.ink, ...glass(T) }}>2 of 7 done</span>
      <span style={{ position: 'absolute', left: 0, right: 0, bottom: 22, display: 'flex', justifyContent: 'center' }}><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 28, padding: '0 12px', borderRadius: 14, fontFamily: T.fontUI, fontSize: 12, ...veil({ background: 'rgba(20,18,17,.45)' }) }}>Whole piece in the frame, plain wall behind</span></span>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 14px 0' }}>{slots.map(([l, st, pic]) => <div key={l} style={{ width: 44, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ position: 'relative', width: 44, height: 56, borderRadius: 11, boxSizing: 'border-box', overflow: 'hidden', background: st === 'done' ? T.photoBg : T.surface2, border: st === 'done' ? 0 : `${st === 'cur' ? 2 : 1.5}px ${st === 'cur' ? 'solid' : 'dashed'} ${st === 'cur' ? T.ink : T.line2}`, display: 'grid', placeItems: 'center', color: st === 'cur' ? T.ink : T.ink3 }}>
        {st === 'done' ? <><img src={hbPic('6002')} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', ...HbPicStyle(pic) }} /><span style={{ position: 'absolute', right: 3, bottom: 3, width: 16, height: 16, borderRadius: 8, background: T.ok, color: T.dark ? '#140F0C' : '#fff', display: 'grid', placeItems: 'center' }}><Ic name="check" size={10} sw={3} /></span></> : <Ic name={st === 'cur' ? 'camera' : l === 'AI' ? 'sparkles' : l === 'Video' ? 'video' : 'plus'} size={st === 'cur' ? 18 : 15} />}
      </div>
      <span style={{ marginTop: 4, fontFamily: T.fontUI, fontSize: 9.5, color: st === 'cur' ? T.ink : T.ink3, fontWeight: st === 'cur' ? 600 : 400, whiteSpace: 'nowrap' }}>{l}</span>
    </div>)}</div>
    <div style={{ display: 'flex', alignItems: 'center', padding: '12px 14px 22px', gap: 12 }}>
      <OutBtn T={T} icon="image" style={{ height: 46, flex: 1, justifyContent: 'center' }}>Pick from gallery</OutBtn>
      <span className="press" style={{ width: 78, height: 78, borderRadius: 39, border: `3px solid ${pb}`, display: 'grid', placeItems: 'center', flex: 'none', boxSizing: 'border-box' }}><span style={{ width: 58, height: 58, borderRadius: 29, background: pb, color: pf, display: 'grid', placeItems: 'center' }}><Ic name="camera" size={24} /></span></span>
      <span style={{ flex: 1, display: 'flex', justifyContent: 'center' }}><Hit T={T} icon="switch-camera" size={46} iconSize={21} style={{ border: `1px solid ${T.line2}` }} /></span>
    </div>
  </>);
}

/* ── phone: the no-photo queue ── */
function HbQueueRow({ T, d, next }) {
  return <div className="press" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 10, marginBottom: 8, borderRadius: 18, background: T.surface2, border: `1px solid ${next ? T.ink : T.line}`, boxShadow: next ? `inset 0 0 0 .5px ${T.ink}` : 'none' }}>
    <HbThumb T={T} d={d} w={62} h={78} r={12} />
    <span style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 22, fontWeight: 600, color: T.ink, fontVariantNumeric: 'tabular-nums' }}>{d.code}</span>{next && <T.Tag tone="muted">{d.fresh ? 'New today' : 'Next'}</T.Tag>}</div>
      <div style={{ marginTop: 2, fontFamily: T.fontUI, fontSize: 12, color: T.ink3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.cat} · {d.name}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 7 }}>{d.colours.map(n => <HbDot key={n} n={n} s={11} />)}<span style={{ fontFamily: T.fontUI, fontSize: 11.5, color: T.ink3, marginLeft: 3 }}>{d.colours.length} colours · no photo yet</span></div>
    </span>
    <Hit T={T} icon="camera" size={44} iconSize={20} style={{ border: `1px solid ${next ? T.ink : T.line2}`, background: T.surface }} />
  </div>;
}
function ScreenHbUploadQueue({ T }) {
  return frameF(T, <>
    <HbHeaderP T={T} title="No photo yet" back right={<Hit T={T} icon="sliders-horizontal" size={38} iconSize={18} />}>
      <div style={{ padding: '4px 14px 0' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 30, fontWeight: 600, color: T.ink, lineHeight: 1, fontVariantNumeric: 'lining-nums' }}>104</span><span style={{ fontFamily: T.fontUI, fontSize: 13.5, color: T.ink2 }}>designs</span><span style={{ fontFamily: T.fontUI, fontSize: 13.5, color: T.ink3 }}>·</span><span style={{ fontFamily: T.fontUI, fontSize: 13.5, color: T.ink2 }}>12 done today</span></div>
        <div style={{ marginTop: 9, height: 5, borderRadius: 3, background: T.chipBg }}><span style={{ display: 'block', width: '10%', height: 5, borderRadius: 3, background: T.ok }} /></div>
        <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>{[['All', 104], ['Mine', 31], ['New today', 3]].map(([l, n], i) => <T.Chip key={l} on={i === 0} style={{ height: 30 }}>{l}<span style={{ opacity: .7, fontWeight: 600, fontSize: 12 }}>{n}</span></T.Chip>)}</div>
      </div>
    </HbHeaderP>
    <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', padding: '12px 14px 0' }}>{HB_QUEUE.map((d, i) => <HbQueueRow key={d.code} T={T} d={d} next={i === 0} />)}</div>
  </>, <><HbFab T={T} label="Start with 8591" icon="camera" /><T.Island active="More" /></>);
}

/* ── Import · four steps, dry run by default; writing it in is a second, deliberate act for admin and owner ── */
const HB_STEPS = ['Pick the master', 'Fill the template', 'Check the file', 'Write it in'];
const HbSteps = ({ T, on }) => <div style={{ display: 'flex', alignItems: 'center', padding: '14px 24px 12px', borderBottom: `1px solid ${T.line}`, flex: 'none' }}>
  {HB_STEPS.map((s, i) => { const n = i + 1, done = n < on, cur = n === on; return <React.Fragment key={s}>
    {i > 0 && <span style={{ flex: 1, height: 1.5, margin: '0 12px', borderRadius: 1, background: n <= on ? T.ink : T.line2 }} />}
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9, flex: 'none' }}>
      <span style={{ width: 26, height: 26, borderRadius: 13, display: 'grid', placeItems: 'center', boxSizing: 'border-box', fontFamily: T.fontUI, fontSize: 12.5, fontWeight: 600, background: cur ? T.ink : 'transparent', color: cur ? T.bg : done ? T.ink : T.ink3, border: cur ? 0 : `1.5px solid ${done ? T.ink : T.line2}` }}>{done ? <Ic name="check" size={14} sw={2.4} /> : n}</span>
      <span style={{ fontFamily: T.fontUI, fontSize: 13.5, fontWeight: cur ? 600 : 400, color: cur ? T.ink : done ? T.ink2 : T.ink3, whiteSpace: 'nowrap' }}>{n} · {s}</span>
    </span>
  </React.Fragment>; })}
</div>;
const HbDisabledBtn = ({ T, icon, children }) => <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 48, padding: '0 22px', borderRadius: 999, border: `1px solid ${T.ink3}`, color: T.ink3, fontFamily: T.fontUI, fontSize: 14, fontWeight: 500, whiteSpace: 'nowrap', boxSizing: 'border-box' }}>{icon && <Ic name={icon} size={16} />}{children}</span>;
const HB_TEMPLATE_COLS = [['Design no', 'required'], ['Colour', 'required · from the colour master'], ['Category', 'required'], ['Name', ''], ['Work', ''], ['Price', 'admin only'], ['HSN code', 'open U33'], ['GST %', 'open U33'], ['Book / firm', '']];
function HbTemplatePane({ T }) {
  return <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 16, background: T.surface2, border: `1px solid ${T.line}` }}>
      <span style={{ width: 40, height: 40, borderRadius: 12, background: T.ink, color: T.bg, display: 'grid', placeItems: 'center', flex: 'none' }}><Ic name="shirt" size={20} /></span>
      <span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 19, fontWeight: 600, color: T.ink, lineHeight: 1.1 }}>Products & SKUs</div><Meta T={T} style={{ display: 'block', marginTop: 2 }}>one row per design and colour</Meta></span>
      <Pill T={T} small>Picked</Pill>
    </div>
    <div className="press" style={{ display: 'flex', alignItems: 'center', gap: 11, marginTop: 10, padding: '10px 12px', borderRadius: 14, border: `1px solid ${T.line2}`, background: T.surface }}>
      <Ic name="file-down" size={18} color={T.ink2} /><span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontUI, fontSize: 13.5, color: T.ink, fontWeight: 500 }}>Download template</div><Meta T={T} style={{ display: 'block' }}>products-template.xlsx · pre-set</Meta></span><Ic name="download" size={16} color={T.ink3} />
    </div>
    <HbLab T={T} style={{ marginTop: 16, marginBottom: 2 }} right={<span style={{ letterSpacing: 0, textTransform: 'none', fontSize: 10.5 }}>9 columns</span>}>Columns the template expects</HbLab>
    {HB_TEMPLATE_COLS.map(([c, m], i) => <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 8, height: 32, borderTop: i ? `1px solid ${T.line}` : 0, fontFamily: T.fontUI, fontSize: 13 }}><span style={{ color: T.ink, flex: 1 }}>{c}</span>{m && <span style={{ fontSize: 11, color: m.startsWith('required') ? T.ink2 : T.ink3 }}>{m}</span>}{m === 'admin only' && <Ic name="lock" size={11} color={T.ink3} />}</div>)}
    <span style={{ flex: 1 }} />
    <Meta T={T} style={{ display: 'block', whiteSpace: 'normal', lineHeight: 1.35 }}>The check is a dry run: nothing is written until step 4. Writing it in is for admin and owner.</Meta>
  </div>;
}
const HB_IMPORT_ROWS = [
  { row: 14, code: '1457', colour: 'Firoji', cat: 'Crop top', price: 3995, err: "Colour 'Firoji' not in the colour master" },
  { row: 88, code: '2006', colour: 'Lavender', cat: 'Saree', price: '49 95', err: "Price '49 95' is not a number" },
  { row: 2, code: '8591', colour: 'Rani', cat: 'Lehenga', price: null, kind: 'Create' },
  { row: 3, code: '8591', colour: 'Firozi', cat: 'Lehenga', price: null, kind: 'Create' },
  { row: 4, code: '8591', colour: 'Mehroon', cat: 'Lehenga', price: null, kind: 'Create' },
  { row: 5, code: '2798', colour: 'Sky', cat: 'Plazo set', price: 4995, kind: 'Update' },
  { row: 9, code: '6002', colour: 'Lilac', cat: 'Lehenga', price: 4995, kind: 'Update' },
];
const HB_IMP_GRID = '44px 168px 128px 104px 84px minmax(0, 1fr)';
function WebHbImport({ T }) {
  const tile = (n, l, tone) => <span key={l} style={{ flex: 1, minWidth: 0, padding: '10px 16px', borderRadius: 16, background: T.surface2, border: `1px solid ${tone === 'danger' ? T.danger + '66' : T.line}` }}><div style={{ fontFamily: T.fontDisplay, fontSize: 34, fontWeight: 600, lineHeight: 1, color: tone === 'danger' ? T.danger : tone === 'dim' ? T.ink3 : T.ink, fontVariantNumeric: 'lining-nums' }}>{n}</div><div style={{ fontFamily: T.fontUI, fontSize: 12, color: T.ink3, marginTop: 4 }}>{l}</div></span>;
  return <HbShell T={T} section="Import" crumb={['Hub', 'Import', 'Products & SKUs', 'Check the file']} tabs={hbTabs(HB_T_MASTERS, { icon: 'file-spreadsheet', label: 'Import · products-oct.xlsx', on: true })} paneTitle="Template" pane={<HbTemplatePane T={T} />}>
    <HbSteps T={T} on={3} />
    <div style={{ flex: 1, minHeight: 0, padding: '12px 24px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9, height: 38, padding: '0 14px 0 11px', borderRadius: 12, border: `1px solid ${T.line2}`, background: T.surface, fontFamily: T.fontUI, fontSize: 13.5, color: T.ink }}><Ic name="file-spreadsheet" size={17} color={T.ok} /><b style={{ fontWeight: 500 }}>products-oct.xlsx</b><span style={{ color: T.ink3 }}>· 212 rows</span></span>
        <OutBtn T={T} icon="refresh-cw">Replace file</OutBtn><span style={{ flex: 1 }} /><Pill T={T} tone="blue">Dry run · nothing written yet</Pill>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>{tile(180, 'creates')}{tile(30, 'updates')}{tile(2, 'errors', 'danger')}{tile(0, 'skipped', 'dim')}</div>
      <div style={{ ...hbCardStyle(T), borderRadius: 18, overflow: 'hidden', flex: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 14px' }}>{[['All', 212, 0], ['Errors', 2, 1], ['Creates', 180, 0], ['Updates', 30, 0]].map(([l, n], i) => <T.Chip key={l} on={i === 1 ? false : i === 0} outline={i !== 0} style={{ height: 28 }}>{l}<span style={{ opacity: l === 'Errors' ? 1 : .7, fontWeight: 600, fontSize: 12, color: l === 'Errors' ? T.danger : undefined }}>{n}</span></T.Chip>)}<span style={{ flex: 1 }} /><Meta T={T}>7 of 212 shown · errors first</Meta></div>
        <div style={{ display: 'grid', gridTemplateColumns: HB_IMP_GRID, gap: 10, padding: '6px 14px', borderTop: `1px solid ${T.line}`, fontFamily: T.fontUI, fontSize: 10, letterSpacing: '.06em', textTransform: 'uppercase', color: T.ink3 }}><span>Row</span><span>Design no</span><span>Colour</span><span>Category</span><span>Price</span><span>Result</span></div>
        {HB_IMPORT_ROWS.map(r => { const bad = !!r.err, d = hbD(r.code), cell = { minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' };
          return <div key={r.row + r.colour} style={{ position: 'relative', display: 'grid', gridTemplateColumns: HB_IMP_GRID, gap: 10, alignItems: 'center', padding: '5px 14px', minHeight: 44, boxSizing: 'border-box', borderTop: `1px solid ${T.line}`, background: bad ? T.danger + '12' : 'transparent', fontFamily: T.fontUI, fontSize: 13, color: T.ink }}>
            {bad && <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: T.danger }} />}
            <span style={{ ...cell, fontFamily: T.fontMono, fontSize: 11.5, color: T.ink3 }}>{r.row}</span>
            <span style={{ ...cell, display: 'flex', alignItems: 'center', gap: 9 }}><HbThumb T={T} d={d} w={26} h={32} r={7} /><span style={{ fontFamily: T.fontDisplay, fontSize: 18, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{r.code}</span>{!(d && d.src) && <span style={{ fontSize: 10.5, color: T.ink3 }}>no photo</span>}</span>
            <span style={{ ...cell, display: 'flex', alignItems: 'center', gap: 8, color: r.err && r.err.startsWith('Colour') ? T.danger : T.ink }}><HbDot n={r.colour} s={11} />{r.colour}</span>
            <span style={{ ...cell, color: T.ink2 }}>{r.cat}</span>
            <span style={{ ...cell, color: r.err && r.err.startsWith('Price') ? T.danger : T.ink, fontVariantNumeric: 'tabular-nums' }}>{typeof r.price === 'string' ? r.price : r.price == null ? <span style={{ color: T.ink3 }}>TBD</span> : '₹' + r.price.toLocaleString('en-IN')}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>{bad ? <><Pill T={T} tone="danger" fill small>Error</Pill><span style={{ fontSize: 12, color: T.danger, lineHeight: 1.25 }}>{r.err}</span></> : <Pill T={T} tone={r.kind === 'Create' ? 'ok' : 'blue'} small>{r.kind}</Pill>}</span>
          </div>; })}
      </div>
      <span style={{ flex: 1 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <OutBtn T={T} icon="file-down" style={{ height: 42 }}>Download errors</OutBtn><Meta T={T}>2 rows, each with the error in words</Meta><span style={{ flex: 1 }} />
        <Meta T={T} style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Ic name="lock" size={12} color={T.ink3} />fix 2 rows first · admin only</Meta><HbDisabledBtn T={T}>Write it in</HbDisabledBtn>
      </div>
    </div>
  </HbShell>;
}

/* ── W5 · pick the master: eight templates, one picked ── */
const HB_MASTERS = [['users', 'Customers', 'name, city, GSTIN, broker'], ['handshake', 'Brokers & agencies', 'rates, agency, city'], ['store', 'Suppliers', 'name, city, GSTIN'], ['scissors', 'Karigars', 'skills, capacity per day'], ['truck', 'Transporters', 'name, city, GSTIN'], ['shirt', 'Products & SKUs', 'design, colour, category, price'], ['layers', 'Materials', 'code, group, unit, shades'], ['scan-barcode', 'Barcodes', 'SKU and piece serials']];
function WebHbImportPick({ T }) {
  const recent = [['Products & SKUs', 'products-sep.xlsx', '02/10/26', '140 created · 12 updated'], ['Materials', 'materials-sep.xlsx', '28/09/26', '6 created · 3 updated'], ['Customers', 'customers-aug.xlsx', '30/08/26', '41 created · 0 updated']];
  return <HbShell T={T} section="Import" crumb={['Hub', 'Import', 'Pick the master']} tabs={hbTabs(HB_T_MASTERS, { icon: 'file-spreadsheet', label: 'Import · pick the master', on: true })} paneTitle="Template" pane={<HbTemplatePane T={T} />}>
    <HbSteps T={T} on={1} />
    <div style={{ flex: 1, minHeight: 0, padding: '16px 24px 14px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontFamily: T.fontDisplay, fontSize: 26, fontWeight: 600, color: T.ink, lineHeight: 1.1 }}>Which master are you bringing in?</div>
      <Meta T={T} style={{ display: 'block', marginTop: 3 }}>Each master has its own template. The check in step 3 is a dry run.</Meta>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 12, marginTop: 14 }}>{HB_MASTERS.map(([ic, l, m]) => { const on = l === 'Products & SKUs'; return <div key={l} className="press" style={{ position: 'relative', height: 116, padding: '14px 14px 12px', borderRadius: 18, boxSizing: 'border-box', background: on ? T.surface : T.surface2, border: on ? `2px solid ${T.ink}` : `1px solid ${T.line}`, display: 'flex', flexDirection: 'column' }}>
        <span style={{ width: 38, height: 38, borderRadius: 12, background: on ? T.ink : T.chipBg, color: on ? T.bg : T.ink2, display: 'grid', placeItems: 'center' }}><Ic name={ic} size={19} /></span>
        {on && <span style={{ position: 'absolute', right: 12, top: 12 }}><HbTick T={T} done /></span>}
        <span style={{ flex: 1 }} /><div style={{ fontFamily: T.fontDisplay, fontSize: 19, fontWeight: 600, color: T.ink, lineHeight: 1.1 }}>{l}</div><Meta T={T} style={{ display: 'block', marginTop: 2 }}>{m}</Meta>
      </div>; })}</div>
      <HbLab T={T} style={{ marginTop: 22 }}>Recent imports</HbLab>
      <div style={{ ...hbCardStyle(T), borderRadius: 16, overflow: 'hidden' }}>{recent.map(([m, f, d, r], i) => <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 14px', borderTop: i ? `1px solid ${T.line}` : 0, fontFamily: T.fontUI, fontSize: 13, color: T.ink }}><Ic name="file-spreadsheet" size={16} color={T.ink3} /><span style={{ width: 130 }}>{m}</span><span style={{ fontFamily: T.fontMono, fontSize: 11.5, color: T.ink2, width: 150 }}>{f}</span><span style={{ color: T.ink3, width: 70 }}>{d}</span><span style={{ flex: 1, color: T.ink2 }}>{r}</span><span style={{ color: T.ink3, fontSize: 12 }}>RM · admin</span></div>)}</div>
      <span style={{ flex: 1 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Meta T={T}>Products & SKUs picked · 9 columns</Meta><span style={{ flex: 1 }} /><T.Btn icon="arrow-right" style={{ height: 46 }}>Next · fill the template</T.Btn></div>
    </div>
  </HbShell>;
}

/* ── W6 · new material, a sibling of the new product form ── */
function WebHbNewMaterial({ T }) {
  const items = [[true, 'Code, name, group and unit', 'MAT-MONONET · Mono net · m'], [true, '3 shades', 'Mono · Sky · Purple'], [true, 'Supplier and source city', 'Surat Textiles · Surat'], [true, 'Purchase rate', '₹120 a metre · money roles only'], [false, 'Photo', 'optional · a raw material can have none'], [false, 'Reorder level not set', 'open U34 · none in the BRD yet']];
  const exist = [['Santoon', 'Peach', 'm'], ['BKS 41 beads kali set', 'Sky', 'pc']];
  const shades = [['MN01', 'Mono'], ['MN02', 'Sky'], ['MN03', 'Purple']];
  return <HbShell T={T} crumb={['Hub', 'Masters', 'Materials', 'New material']} tabs={hbTabs({ icon: 'library', label: 'Masters · Materials' }, { icon: 'plus', label: 'New material', on: true })} paneTitle="Checklist" pane={<HbChecklist T={T} items={items} foot="A material can be saved with gaps. It lands in the catalogue as 'no inward yet' until the first purchase is received." extra={<><HbLab T={T} style={{ marginTop: 16, marginBottom: 2 }}>Already in the master · check before you add</HbLab>{exist.map(([n, c, u], i) => <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderTop: i ? `1px solid ${T.line}` : 0 }}><HbSwatch n={c} w={28} h={28} r={8} /><span style={{ flex: 1, fontFamily: T.fontUI, fontSize: 13, color: T.ink }}>{n}</span><Meta T={T}>{u}</Meta></div>)}</>} />}>
    <HbFormTabs T={T} on="New material" />
    <div style={{ flex: 1, minHeight: 0, padding: '14px 24px 16px', display: 'flex' }}>
      <div style={{ ...hbCardStyle(T), flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ flex: 1, minHeight: 0, display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 30, padding: '14px 22px 0' }}>
          <div style={{ minWidth: 0 }}>
            <Sect T={T} style={{ margin: '0 0 10px' }}>Identity</Sect>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span className="press" style={{ width: 64, height: 80, borderRadius: 12, border: `1px dashed ${T.line2}`, background: T.bg2, display: 'grid', placeItems: 'center', color: T.ink2, flex: 'none', boxSizing: 'border-box' }}><span style={{ textAlign: 'center', fontFamily: T.fontUI, fontSize: 10 }}><Ic name="camera" size={18} /><div>photo</div></span></span>
              <div style={{ width: 176, flex: 'none' }}><HbField T={T} label="Code" value="MAT-MONONET" mono /><Meta T={T} style={{ display: 'block', marginTop: 5 }}>made from the name · editable</Meta></div>
              <HbField T={T} label="Name" value="Mono net" />
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
              <HbField T={T} label="Group" value="Base fabric" caret />
              <div style={{ flex: 'none' }}><HbLab T={T}>Unit</HbLab><div style={{ display: 'flex', gap: 6, height: 40, alignItems: 'center' }}>{['m', 'pc', 'kg'].map(u => <T.Chip key={u} on={u === 'm'} style={{ height: 34, minWidth: 42, justifyContent: 'center' }}>{u}</T.Chip>)}</div></div>
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 12 }}><HbField T={T} label="Supplier" value="Surat Textiles" caret /><HbField T={T} label="Source city" value="Surat" caret w={150} /></div>
            <Sect T={T} style={{ margin: '14px 0 8px' }} right={<><Meta T={T}>code is automatic</Meta><OutBtn T={T} small icon="plus" style={{ marginLeft: 6 }}>Add a shade</OutBtn></>}>Shades</Sect>
            <div style={{ borderRadius: 16, border: `1px solid ${T.line}`, background: T.surface2, overflow: 'hidden' }}>{shades.map(([c, n], i) => <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '6px 12px', borderTop: i ? `1px solid ${T.line}` : 0 }}><HbSwatch n={n} tex="net" w={34} h={34} r={10} /><Mono T={T} size={12}>{c}</Mono><span style={{ flex: 1, minWidth: 0, fontFamily: T.fontUI, fontSize: 14, color: T.ink }}>{n}</span><Ic name="x" size={14} color={T.ink3} /></div>)}</div>
          </div>
          <div style={{ minWidth: 0 }}>
            <Sect T={T} style={{ margin: '0 0 10px' }}>Price and stock</Sect>
            <HbField T={T} label={<span>Purchase rate<HbLock T={T} /></span>} value="₹120" right={<span style={{ fontSize: 12, color: T.ink3 }}>a metre</span>} />
            <Meta T={T} style={{ display: 'block', marginTop: 5 }}>money roles only · the floor never sees it</Meta>
            <HbField T={T} label="Reorder level" ph="not set" right={<span style={{ fontSize: 12, color: T.ink3 }}>m</span>} style={{ marginTop: 14 }} />
            <Meta T={T} style={{ display: 'block', marginTop: 5 }}>No reorder level in the BRD yet (open U34)</Meta>
            <HbField T={T} label="Tags" value="net · base fabric" caret style={{ marginTop: 14 }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16, padding: '10px 12px', borderRadius: 12, border: `1px dashed ${T.line2}`, color: T.ink3, fontFamily: T.fontUI, fontSize: 12 }}><Ic name="info" size={14} />Alias, print name and tax category are filled here, on the desk.</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 22px', borderTop: `1px solid ${T.line}`, background: T.surface2 }}>
          <Meta T={T}>Draft master · no inward yet</Meta><span style={{ flex: 1 }} />
          <OutBtn T={T} style={{ height: 42 }}>Save</OutBtn><OutBtn T={T} style={{ height: 42 }}>Save and add another</OutBtn><T.Btn icon="check" style={{ height: 42 }}>Save material</T.Btn>
        </div>
      </div>
    </div>
  </HbShell>;
}

/* ── board registration: captions and order are what the owner reads ── */
(window.NEW_DRAFT_MODULES = window.NEW_DRAFT_MODULES || []).push({ module: 'Hub', note: 'masters shell with the census · new product master · image upload centre with the per-colour checklist and the no-photo queue · xlsx import with a dry run · new material (13 Oct, review 2)', subs: [
  { name: 'Masters', flow: 'census → alerts → grid → dossier', phone: [['Masters · products list on the phone', ScreenHbMasters]], web: [['Masters · products grid, census chips, alerts', WebHbMasters]] },
  { name: 'New product', flow: 'form → checklist → photos', phone: [['New product · master sheet on the phone', ScreenHbNewProduct]], web: [['New product · master form and checklist', WebHbNewProduct]] },
  { name: 'Upload centre', flow: 'queue → capture → checklist', phone: [['Upload centre · capture per colour', ScreenHbUploadPhone], ['Upload centre · the no-photo queue', ScreenHbUploadQueue]], web: [['Upload centre · product 8591, checklist per colour', WebHbUpload]] },
  { name: 'Import', flow: 'pick the master → fill → check the file → write it in', web: [['Import · check the file (dry run)', WebHbImport], ['Import · pick the master', WebHbImportPick]], phone: [] },
  { name: 'New material', flow: 'form → checklist', web: [['New material · master form and checklist', WebHbNewMaterial]], phone: [] },
] });

Object.assign(window, { HB_SEG, HB_ITEMS, HB_LEDGERS, HB_ALERTS, HB_DOSSIER, HB_CATS, HB_WORKS, HB_NEW, HB_QUEUE, HB_REQ, HB_STEPS, HB_MASTERS, HB_TEMPLATE_COLS, HB_IMPORT_ROWS, hbD, hbPic, hbShade, hbTabs, hbCardStyle,
  HbLab, HbField, HbRadio, HbSwitch, HbTick, HbThumb, HbDot, HbSwatch, HbLock, HbFacts, HbShell, HbFam, HbEnt, HbCensus, HbAlerts, HbTool, HbToolbar, HbCard, HbProductPane, HbHeaderP, HbAlertP, HbRowP, HbFab, HbMastersBodyP,
  HbSlotAdd, HbColourRow, HbChecklist, HbFormTabs, HbPicStyle, HbSlot, HbSlotWide, HbColourTabs, HbUp, HbProgressPane, HbCorner, HbQueueRow, HbSteps, HbDisabledBtn, HbTemplatePane,
  ScreenHbMasters, ScreenHbNewProduct, ScreenHbUploadPhone, ScreenHbUploadQueue, WebHbMasters, WebHbNewProduct, WebHbUpload, WebHbImport, WebHbImportPick, WebHbNewMaterial });
