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
    <div style={{ marginTop: 2, fontFamily: T.fontUI, fontSize: 12, color: T.ink3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.cat} · <span style={{ color: T.ink2 }}>{d.name}</span> · {d.colours.length} colours</div>
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
      <div style={{ position: 'relative', display: 'flex', gap: 6, padding: '10px 0 0 14px', overflow: 'hidden' }}>{HB_ALERTS.map(([n, , l, ic]) => <HbAlertP key={l} T={T} n={n} label={l} ic={ic} />)}<span style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 48, background: `linear-gradient(90deg, transparent, ${T.dark ? '#1b1411' : '#f7f3ee'} 70%)`, pointerEvents: 'none' }} /></div>
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
const HbColourRow = ({ T, name, primary, first, src }) => <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 12px', borderTop: first ? 0 : `1px solid ${T.line}` }}>
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
        <div style={{ flex: 1, minHeight: 0, display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 30, padding: '16px 22px 0' }}>
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
            <HbField T={T} label="Book / firm" value="SRS" caret w={200} style={{ marginTop: 12 }} />
            <Sect T={T} style={{ margin: '16px 0 8px' }} right={<Meta T={T}>one design + one colour = one SKU</Meta>}>Colours</Sect>
            <div style={{ borderRadius: 16, border: `1px solid ${T.line}`, background: T.surface2, overflow: 'hidden' }}>
              {HB_NEW.colours.map((n, i) => <HbColourRow key={n} T={T} name={n} primary={i === 0} first={i === 0} />)}
              <div style={{ padding: '7px 12px', borderTop: `1px solid ${T.line}` }}><OutBtn T={T} small icon="plus">Add colour</OutBtn></div>
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
/*TEMP*/ (window.NEW_DRAFT_MODULES = window.NEW_DRAFT_MODULES || []).push({ module: 'Hub', note: 'tmp', subs: [{ name: 'Masters', flow: 'x', phone: [['Masters · list', ScreenHbMasters], ['New product · sheet', ScreenHbNewProduct]], web: [['Masters · products grid', WebHbMasters], ['New product · form', WebHbNewProduct]] }] });
/*TEMP*/ Object.assign(window, { WebHbMasters, ScreenHbMasters, ScreenHbNewProduct, WebHbNewProduct });
