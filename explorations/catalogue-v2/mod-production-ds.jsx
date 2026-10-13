/* NEW DRAFTS · Production · review 2 exemplars (13 Oct 2026), one pair per decision, beside the current frames. Nothing
   here replaces a frame; the sweep waits for sign-off (owner's rule).
   (b) D3 · the web header capped at six: Purchase ▾ · Materials ▾ · Recipes · Orders ▾ (Job cards inside) · Samples ·
       More ▾ (Costing, Karigars); the search field never below 180 (WebShell3's own 196 for six buttons). Phone: the
       same six groups in the sub-menu scroller.
   (c) D13 · Purchase inward: the supplier's invoice number and date first, the accounts card folded to
       Freight · Discount · GST with More. Drawn in the Desk density (plans/desk-density.md §1): this is Production's
       Desk exemplar.
   (d) D14 · New production order: reason chips under the head, tranches collapsed to "default 30 / 30 / 40", one
       process opened on tap. Desk density.
   The content's one maroon line is its primary action (filled accent); the view tab's marker is chrome. Reuses the Production data and
   primitives (prMat, prMatName, prMoney, Swatch, PR_D, Thumb, Dot, OrderRowP, PrTop, DSearch, Body, SupplierPane,
   INW_TABS, ORD_TABS, Meta, Mono, Lock). Every identifier is prefixed PDk. */

/* ── header: six groups ───────────────────────────────────────────────────────────────────────────────────────────── */
const PDK_SEG = [['Purchase', null, true], ['Materials', null, true], ['Recipes'], ['Orders', null, true], ['Samples', null, true], ['More', null, true]];
const PDK_GROUPS = [['Purchase ▾', 'Purchase orders · Inward · Dye ledger'], ['Materials ▾', 'Catalogue · Stock · Shades'], ['Recipes', 'Process setting'], ['Orders ▾', 'Production orders · Job cards · Lifecycle'], ['Samples ▾', 'Samples · Moodboard'], ['More ▾', 'Costing · Karigars']];
function PDkShell({ T, section, active, crumb, tab, children, pane, paneTitle, overlay }) {
  return <WebShell3 T={T} module="Production" crumb={crumb} section={section} seg={PDK_SEG} active={active} tabs={PR_TABS(tab)} pane={pane} paneTitle={paneTitle} paneWidth={340} overlay={overlay}>{children}</WebShell3>;
}
/* the floating sub-suite for Orders ▾ (the shared SubMenuFloat only carries the sale-order groups) */
function PDkFloat({ T, left = 0 }) {
  const items = [['Production orders', 53, true, 'scroll-text'], ['Job cards', 61, false, 'layout-grid'], ['Lifecycle', null, false, 'git-commit-horizontal']];
  return <div style={{ position: 'absolute', left, top: 118, width: 248, padding: 8, zIndex: 30, borderRadius: 18, ...glass(T, { boxShadow: `inset 0 1px 0 ${T.glassHi}, 0 30px 60px -24px rgba(0,0,0,.45)` }) }}>
    {items.map(([l, n, on, ic]) => <div key={l} className="press" style={{ display: 'flex', alignItems: 'center', gap: 9, height: 34, padding: '0 10px', borderRadius: 11, background: on ? T.chipBg : 'transparent', color: T.ink, fontFamily: T.fontUI, fontSize: 13, fontWeight: on ? 600 : 400 }}><Ic name={ic} size={14} color={T.ink3} /><span style={{ flex: 1 }}>{l}</span>{n != null && <span style={{ fontSize: 11, color: T.ink3, fontVariantNumeric: 'tabular-nums' }}>{n}</span>}</div>)}
  </div>;
}
/* phone: the same six groups in the sub-menu scroller (Overview first, as today) */
const PDK_NODES = [['home', 'Overview'], ['package-check', 'Purchase', 3], ['layers', 'Materials'], ['git-branch', 'Recipes'], ['scroll-text', 'Orders', 12], ['flask-conical', 'Samples', 9], ['grip', 'More']];
function PDkHeader({ T, node, title, back }) {
  return <div style={{ background: T.header, borderBottom: `1px solid ${T.line}`, boxShadow: T.headerShadow, paddingBottom: 8, marginTop: -54, paddingTop: 54, flex: 'none' }}><PrTop T={T} title={title} back={back} /><DSearch T={T} placeholder="Design, order, job, karigar" />
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '8px 12px 0', overflow: 'hidden' }}>{PDK_NODES.map(([ic, l, n]) => { const on = l === node; return <span key={l} className="press" style={{ flex: 'none', display: 'inline-flex', alignItems: 'center', gap: 5, padding: on ? '4px 12px' : '4px 8px', borderRadius: 999, background: on ? T.ink : 'transparent', color: on ? T.bg : T.ink2, fontFamily: T.fontDisplay, fontSize: 16.5, fontWeight: 500, whiteSpace: 'nowrap' }}>{l}{n != null && <span style={{ fontFamily: T.fontUI, fontSize: 11, color: on ? T.bg : T.ink3, opacity: .8 }}>{n}</span>}</span>; })}</div>
  </div>;
}

/* ── Desk primitives for Production content (4px boxes, 3px fields, 1px rules, air) ─────────────────────────────── */
const PDkUp = (T, extra) => ({ fontFamily: T.fontUI, fontSize: 11, letterSpacing: '.07em', textTransform: 'uppercase', color: T.ink3, whiteSpace: 'nowrap', ...extra });
const PDkBox = ({ T, children, style }) => <div style={{ flex: 'none', borderRadius: 4, border: `1px solid ${T.line2}`, background: T.surface, minWidth: 0, ...style }}>{children}</div>;
const PDkBoxHead = ({ T, n, title, sub, right }) => <div style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 44, padding: '0 20px', borderBottom: `1px solid ${T.line}` }}>{n && <span style={{ width: 22, height: 22, borderRadius: 3, border: `1px solid ${T.ink}`, display: 'grid', placeItems: 'center', fontFamily: T.fontUI, fontSize: 11.5, fontWeight: 600, color: T.ink, flex: 'none' }}>{n}</span>}<span style={{ fontFamily: T.fontDisplay, fontSize: 18, fontWeight: 600, color: T.ink, whiteSpace: 'nowrap' }}>{title}</span>{sub && <Meta T={T}>{sub}</Meta>}<span style={{ flex: 1 }} />{right}</div>;
const PDkField = ({ T, label, value, ph, caret, icon, w, focus, num, style }) => <div style={{ width: w, flex: w ? 'none' : 1, minWidth: 0, ...style }}><div style={{ ...PDkUp(T), marginBottom: 6 }}>{label}</div><div style={{ display: 'flex', alignItems: 'center', gap: 6, height: 40, padding: '0 12px', borderRadius: 3, background: T.bg, border: `1px solid ${focus ? T.ink : T.line2}`, boxShadow: focus ? `inset 0 0 0 1px ${T.ink}` : 'none', fontFamily: T.fontUI, fontSize: 13.5, color: value != null ? T.ink : T.ink3, justifyContent: num ? 'flex-end' : 'flex-start', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap', overflow: 'hidden' }}>{icon && <Ic name={icon} size={14} color={T.ink3} />}<span style={{ flex: num ? 'none' : 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>{value != null ? value : ph}</span>{caret && <Ic name="chevron-down" size={13} color={T.ink3} />}</div></div>;
const PDkTag = ({ T, tone, children, fill }) => { const c = tone === 'danger' ? T.danger : tone === 'warn' ? T.warn : T.ink2; return <span style={{ display: 'inline-flex', alignItems: 'center', height: 22, padding: '0 7px', borderRadius: 3, border: `1px solid ${tone ? c : fill ? T.ink : T.line2}`, background: fill ? T.ink : 'transparent', color: fill ? T.bg : c, fontFamily: T.fontUI, fontSize: 10, fontWeight: 600, letterSpacing: '.07em', textTransform: 'uppercase', whiteSpace: 'nowrap', flex: 'none' }}>{children}</span>; };
const PDkChip = ({ T, on, children }) => <span className="press" style={{ display: 'inline-flex', alignItems: 'center', height: 30, padding: '0 12px', borderRadius: 3, border: `1px solid ${on ? T.ink : T.line2}`, background: on ? T.ink : 'transparent', color: on ? T.bg : T.ink2, fontFamily: T.fontUI, fontSize: 12.5, fontWeight: on ? 600 : 400, whiteSpace: 'nowrap' }}>{children}</span>;
const PDkBtn = ({ T, icon, children, fill, h = 40, style }) => <span className="press" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7, height: h, padding: '0 16px', borderRadius: 3, border: `1px solid ${fill ? T.accent : T.ink}`, background: fill ? T.accent : 'transparent', color: fill ? T.onAccent : T.ink, fontFamily: T.fontUI, fontSize: 13, fontWeight: fill ? 600 : 500, whiteSpace: 'nowrap', ...style }}>{icon && <Ic name={icon} size={15} />}{children}</span>;
const PDkCols = ({ T, cols }) => <div style={{ display: 'flex', alignItems: 'center', gap: 24, height: 36, padding: '0 20px', background: T.surface2, borderBottom: `1px solid ${T.line}` }}>{cols.map(([l, w, r], i) => <span key={i} style={{ ...PDkUp(T), width: w, flex: w ? 'none' : 1, textAlign: r ? 'right' : 'left' }}>{l}</span>)}</div>;
const PDkNum = (T, w, extra) => ({ width: w, flex: 'none', textAlign: 'right', fontFamily: T.fontUI, fontSize: 13.5, color: T.ink, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap', ...extra });
const PDkMain = ({ children }) => <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', padding: '14px 24px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>{children}</div>;

/* ── (c) Purchase inward · web ────────────────────────────────────────────────────────────────────────────────────── */
const PDK_INW = [['m3', 200, 200, 62], ['m5', 500, 480, 28]];
function PDkInwardMain({ T }) {
  const value = PDK_INW.reduce((s, [, , g, r]) => s + g * r, 0);
  return <>
    <ViewTabs T={T} tabs={INW_TABS} active="New" />
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 24px 0' }}><T.Chip icon="search" outline>Find a purchase order · supplier, material, date</T.Chip><T.Chip on>PO-linked</T.Chip><T.Chip outline>Ad hoc</T.Chip><span style={{ flex: 1 }} /><Meta T={T}>PU-0342 picked · lines pre-filled</Meta></div>
    <PDkMain>
      <PDkBox T={T}>
        <PDkBoxHead T={T} n="1" title="From the supplier's paper" sub="copy these first" right={<Meta T={T}>Inward GRN-0418 · 08/09/26 · auto</Meta>} />
        <div style={{ display: 'flex', gap: 16, padding: '12px 20px 14px' }}><PDkField T={T} label="Supplier invoice no" value="ST/26-27/0891" focus /><PDkField T={T} label="Invoice date" value="08/09/26" icon="calendar" w={150} /><PDkField T={T} label="Supplier" value="Surat Textiles" caret /><PDkField T={T} label="Book" value="Surat purchase" caret w={180} /></div>
      </PDkBox>
      <PDkBox T={T} style={{ overflow: 'hidden' }}>
        <PDkBoxHead T={T} n="2" title="What came in" sub="received is the only number you type" right={<Meta T={T}>consignee Shree Radha Studio</Meta>} />
        <PDkCols T={T} cols={[['Material'], ['Ordered', 70, true], ['Received', 96, true], ['Rate ₹', 70, true], ['Value ₹', 90, true], ['Variance', 120]]} />
        {PDK_INW.map(([id, o, g, r]) => { const m = prMat(id); return <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 24, height: 54, padding: '0 20px', borderBottom: `1px solid ${T.line}`, fontFamily: T.fontUI, fontSize: 13.5 }}>
          <span style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 10 }}><Swatch m={m} w={32} h={40} r={3} /><span style={{ minWidth: 0 }}><div style={{ color: T.ink, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{prMatName(m)}</div><Meta T={T}>{m.code} · {m.group}</Meta></span></span>
          <span style={PDkNum(T, 70, { color: T.ink2 })}>{o} {m.unit}</span>
          <span style={{ width: 96, flex: 'none', display: 'flex', justifyContent: 'flex-end' }}><span style={{ width: 80, height: 36, lineHeight: '34px', borderRadius: 3, border: `1px solid ${g < o ? T.warn : T.line2}`, background: T.bg, textAlign: 'right', padding: '0 10px', fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: T.ink }}>{g}</span></span>
          <span style={PDkNum(T, 70)}>{r}</span><span style={PDkNum(T, 90, { fontWeight: 600 })}>{prMoney(g * r)}</span>
          <span style={{ width: 120, flex: 'none' }}>{g < o ? <PDkTag T={T} tone="warn">Short {o - g} {m.unit}</PDkTag> : <Meta T={T}>none</Meta>}</span>
        </div>; })}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, height: 48, padding: '0 20px' }}><PDkBtn T={T} icon="plus" h={34}>Add a line</PDkBtn><PDkBtn T={T} icon="plus" h={34}>New material · from the lot</PDkBtn><span style={{ flex: 1 }} /><Meta T={T}>2 lines · 680 units</Meta><span style={PDkNum(T, 110, { fontWeight: 600, fontSize: 15 })}>{prMoney(value)}</span></div>
      </PDkBox>
      <PDkBox T={T}>
        <PDkBoxHead T={T} n="3" title="Accounts" sub="money roles · pushed to accounts on approval" right={<span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: T.fontUI, fontSize: 12.5, color: T.ink }}>More · terms, additional cost, broker<Ic name="chevron-down" size={13} /></span>} />
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, padding: '12px 20px 14px' }}><PDkField T={T} label="Freight inward ₹" value="800" num w={150} /><PDkField T={T} label="Discount" value="0 %" num w={110} /><PDkField T={T} label="GST · place of supply" value="IGST 5 % · Gujarat" caret w={220} /><span style={{ flex: 1 }} />
          <span style={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: '3px 16px', fontFamily: T.fontUI, fontSize: 12.5, color: T.ink2, fontVariantNumeric: 'tabular-nums', textAlign: 'right' }}><span>Taxable</span><span>₹26,640</span><span>IGST</span><span>₹1,332</span><b style={{ color: T.ink }}>Gross total</b><b style={{ color: T.ink }}>₹27,972</b></span></div>
      </PDkBox>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 'none' }}><div style={{ flex: 1, display: 'flex', alignItems: 'center', height: 40, padding: '0 12px', borderRadius: 3, border: `1px solid ${T.line2}`, background: T.bg, fontFamily: T.fontUI, fontSize: 13.5, color: T.ink3 }}>Narration · e.g. 20 m Cancan short, credit note to follow</div><PDkBtn T={T}>Save draft</PDkBtn><PDkBtn T={T} fill icon="check">Take inward · send to approval</PDkBtn></div>
    </PDkMain>
  </>;
}
function WebPDkInward({ T }) {
  return <PDkShell T={T} section="Purchase inward" active="Purchase" crumb={['Production', 'Purchase', 'Inward', 'New']} tab="Purchase · Inward · new" paneTitle="Surat Textiles" pane={<SupplierPane T={T} />}><PDkInwardMain T={T} /></PDkShell>;
}
/* (c) phone · the warehouse executive: paper first, received qty, no money (accounts sit on the desk) */
function ScreenPDkInward({ T }) {
  return frameF(T, <><PDkHeader T={T} node="Purchase" /><Body style={{ padding: '14px 16px 110px' }}>
    <PDkBox T={T}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, padding: '12px 16px', borderBottom: `1px solid ${T.line}` }}><Mono T={T}>PU-0342</Mono><span style={{ fontFamily: T.fontDisplay, fontSize: 18, fontWeight: 600, color: T.ink, flex: 1 }}>Surat Textiles</span><Meta T={T}>expected today</Meta></div>
      <div style={{ padding: '12px 16px 14px', borderBottom: `1px solid ${T.line}` }}><div style={{ ...PDkUp(T), marginBottom: 8 }}>From the supplier's paper</div><div style={{ display: 'flex', gap: 10 }}><PDkField T={T} label="Invoice no" value="ST/26-27/0891" focus /><PDkField T={T} label="Date" value="08/09/26" w={104} /></div></div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: 30, padding: '0 16px', background: T.surface2, borderBottom: `1px solid ${T.line}` }}><span style={{ ...PDkUp(T), flex: 1 }}>Material</span><span style={{ ...PDkUp(T), width: 52, textAlign: 'right' }}>Ordered</span><span style={{ ...PDkUp(T), width: 72, textAlign: 'right' }}>Received</span></div>
      {PDK_INW.map(([id, o, g]) => { const m = prMat(id); return <div key={id} style={{ borderBottom: `1px solid ${T.line}`, padding: '0 16px' }}><div style={{ display: 'flex', alignItems: 'center', gap: 10, height: 60 }}><Swatch m={m} w={36} h={45} r={3} /><span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontUI, fontSize: 14.5, fontWeight: 500, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{prMatName(m)}</div><Meta T={T}>{m.code}</Meta></span><span style={PDkNum(T, 52, { color: T.ink2 })}>{o}</span><span style={{ width: 72, height: 44, lineHeight: '42px', borderRadius: 3, border: `1px solid ${g < o ? T.warn : T.line2}`, background: T.bg, textAlign: 'right', padding: '0 10px', fontFamily: T.fontUI, fontSize: 15, fontWeight: 600, color: T.ink, fontVariantNumeric: 'tabular-nums', boxSizing: 'border-box' }}>{g}</span></div>{g < o && <div style={{ paddingBottom: 10 }}><PDkTag T={T} tone="warn">Short {o - g} {m.unit}</PDkTag></div>}</div>; })}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px' }}><span className="press" style={{ width: 48, height: 48, borderRadius: 3, border: `1px dashed ${T.line2}`, display: 'grid', placeItems: 'center', color: T.ink2 }}><Ic name="camera" size={18} /></span><span style={{ flex: 1, fontFamily: T.fontUI, fontSize: 12.5, color: T.ink2 }}>Lot photo · and the invoice photo for accounts</span></div>
    </PDkBox>
    <Meta T={T} style={{ display: 'block', margin: '12px 2px 0' }}>Rates, freight, discount and GST are filled on the desk.</Meta>
    <PDkBtn T={T} fill icon="package-check" h={52} style={{ width: '100%', marginTop: 14, boxSizing: 'border-box' }}>Take inward · to approval</PDkBtn>
  </Body></>, prDock(T));
}

/* ── (d) New production order · web ──────────────────────────────────────────────────────────────────────────────── */
const PDK_PROCS = [['Touching', 'Meena Touching Works · 80', 40, ['18/09', '21/09', '24/09']], ['Embroidery', 'Saleem Creation · 78', 200, ['26/09', '12/10', '20/10'], true], ['Latkan', null, null, null], ['Stitching', 'Noor Tailors · 84', 320, ['10/10', '20/10', '24/10']]];
const PDK_NEED = [['m3', 60], ['m5', 120], ['m1', 90], ['m14', 12], ['m8', 40]];
function PDkReadyPane({ T }) {
  return <div style={{ padding: '14px 16px', height: '100%', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
    <Meta T={T}>for 85 pcs · Sky 20 · Purple 25 · Peach 40</Meta>
    <div style={{ display: 'flex', margin: '12px 0 8px', borderTop: `1px solid ${T.line}`, borderBottom: `1px solid ${T.line}` }}>{[['Inputs', 12], ['Short', 3, T.danger], ['On order', 2]].map(([l, n, c], i) => <span key={l} style={{ flex: 1, padding: '10px 0 8px 10px', borderLeft: i ? `1px solid ${T.line}` : 'none' }}><div style={{ fontFamily: T.fontDisplay, fontSize: 28, fontWeight: 600, lineHeight: 1, color: c || T.ink }}>{n}</div><div style={{ ...PDkUp(T), marginTop: 4 }}>{l}</div></span>)}</div>
    <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>{PDK_NEED.map(([id, q]) => { const m = prMat(id); const short = m.stock < q; return <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 10, height: 50, borderBottom: `1px solid ${T.line}` }}><Swatch m={m} w={28} h={35} r={3} /><span style={{ flex: 1, minWidth: 0, fontFamily: T.fontUI, fontSize: 12.5, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{prMatName(m)}<Meta T={T} style={{ display: 'block' }}>need {q} {m.unit} · have {m.stock}</Meta></span>{short ? <PDkTag T={T} tone="danger">Short · PO</PDkTag> : <PDkTag T={T}>In stock</PDkTag>}</div>; })}</div>
    <div style={{ display: 'flex', alignItems: 'baseline', fontFamily: T.fontUI, fontSize: 12.5, color: T.ink2, padding: '10px 0', borderBottom: `1px solid ${T.line}` }}><span style={{ flex: 1 }}>Cost per pc · money roles</span><b style={{ color: T.ink }}>₹2,058</b></div>
    <PDkBtn T={T} fill icon="send" style={{ marginTop: 12 }}>Submit for approval</PDkBtn>
  </div>;
}
function PDkNewOrderMain({ T }) {
  const tr = ['30 %', '30 %', '40 %'];
  return <>
    <ViewTabs T={T} tabs={ORD_TABS} active="Draft" back="Orders" right={<Meta T={T}>PO-1203 · draft saved 11:40</Meta>} />
    <PDkMain>
      <PDkBox T={T}>
        <PDkBoxHead T={T} n="1" title="Order details" right={<Meta T={T}>PO-1203 · auto · 08/09/26 · for Shree Radha Studio</Meta>} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 20px 0' }}><span style={{ ...PDkUp(T), marginRight: 4 }}>Reason</span>{['Restock · score 78', 'Priority production', 'Customer shortage', 'High growth', 'By hand'].map((c, i) => <PDkChip key={c} T={T} on={i === 0}>{c}</PDkChip>)}</div>
        <div style={{ display: 'flex', gap: 24, padding: '14px 20px 18px' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', width: 300, flex: 'none' }}><Thumb T={T} d={PR_D('2798')} w={52} h={65} r={3} /><PDkField T={T} label="Product · complete recipe" value="2798 · Plazo set" caret /></div>
          <div style={{ flex: 1, display: 'flex', gap: 16 }}><PDkField T={T} label="Planned end" value="20/10/26" icon="calendar" /><PDkField T={T} label="Priority" value="P2" caret w={90} /><PDkField T={T} label="Qty · Sky / Purple / Peach" value="20 / 25 / 40 · 85 pcs" /></div>
        </div>
      </PDkBox>
      <PDkBox T={T} style={{ overflow: 'hidden' }}>
        <PDkBoxHead T={T} n="2" title="Process assignment" sub="assign later is fine" right={<Meta T={T}>tranches default 30 / 30 / 40 · open a row to change</Meta>} />
        <PDkCols T={T} cols={[['Process', 130], ['Karigar'], ['Rate ₹/pc', 80, true], ['Tranches', 230]]} />
        {PDK_PROCS.map(([p, k, r, dates, open], i) => <div key={p} style={{ borderBottom: `1px solid ${T.line}`, background: open ? T.bg2 : 'transparent' }}>
          <div className="press" style={{ display: 'flex', alignItems: 'center', gap: 24, height: 48, padding: '0 20px', fontFamily: T.fontUI, fontSize: 13.5, color: T.ink }}>
            <span style={{ width: 130, flex: 'none', display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ fontVariantNumeric: 'tabular-nums', color: T.ink3, width: 12 }}>{i + 1}</span>{p}</span>
            <span style={{ flex: 1, minWidth: 0, color: k ? T.ink : T.ink3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{k || 'Assign later · 2 Latkan karigars free'}</span>
            <span style={PDkNum(T, 80)}>{r || '—'}</span>
            <span style={{ width: 230, flex: 'none', display: 'flex', alignItems: 'center', gap: 8, color: dates ? T.ink2 : T.ink3 }}>{dates ? <>{i === 3 ? '50 / 50 · changed' : '30 / 30 / 40'} · ends {dates[2]}</> : '—'}<span style={{ flex: 1 }} />{dates && <Ic name={open ? 'chevron-up' : 'chevron-down'} size={14} color={T.ink3} />}</span>
          </div>
          {open && <div style={{ padding: '0 20px 12px 172px' }}>{tr.map((x, j) => <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 24, height: 36, borderTop: `1px solid ${T.line}`, fontFamily: T.fontUI, fontSize: 12.5, color: T.ink2, fontVariantNumeric: 'tabular-nums' }}><span style={{ width: 80 }}>Tranche {j + 1}</span><span style={{ width: 50, textAlign: 'right' }}>{x}</span><span style={{ width: 60, textAlign: 'right', color: T.ink }}>{[26, 25, 34][j]} pcs</span><span style={{ flex: 1 }}>due {dates[j]}/26</span></div>)}</div>}
        </div>)}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 56, padding: '0 20px' }}><Meta T={T}>3 of 4 processes assigned · job cards appear on approval</Meta><span style={{ flex: 1 }} /><PDkBtn T={T} h={36}>Save draft</PDkBtn><PDkBtn T={T} icon="printer" h={36}>Preview job cards</PDkBtn></div>
      </PDkBox>
    </PDkMain>
  </>;
}
function WebPDkNewOrder({ T }) {
  return <PDkShell T={T} section="Production orders" active="Orders" crumb={['Production', 'Orders', 'New order']} tab="New production order" paneTitle="Material readiness" pane={<PDkReadyPane T={T} />}><PDkNewOrderMain T={T} /></PDkShell>;
}
/* (b) web · the same frame with Orders ▾ open: Job cards now live inside Orders */
function WebPDkHeaderOpen({ T }) {
  return <PDkShell T={T} section="Production orders" active="Orders" crumb={['Production', 'Orders', 'New order']} tab="New production order" paneTitle="Material readiness" pane={<PDkReadyPane T={T} />} overlay={<PDkFloat T={T} left={PDK_FLOAT_X} />}><PDkNewOrderMain T={T} /></PDkShell>;
}
const PDK_FLOAT_X = 572;
/* (d) phone · the sheet: reason chips under the head, one collapsed tranche line per process */
function ScreenPDkNewOrder({ T }) {
  return frameF(T, <><PDkHeader T={T} node="Orders" /><Body>{[PR_ORDERS[0], PR_ORDERS[1]].map(o => <OrderRowP key={o.no} T={T} o={o} />)}</Body></>, <>{scrimF(T)}<Sheet T={T} h={700} title="New production order · PO-1203" foot={<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><PDkBtn T={T} h={48}>Save draft</PDkBtn><span style={{ flex: 1 }} /><PDkBtn T={T} fill h={48} icon="send">Submit for approval</PDkBtn></div>}>
    <div style={{ display: 'flex', gap: 6, overflow: 'hidden' }}>{['Restock', 'Priority', 'Shortage', 'By hand'].map((c, i) => <PDkChip key={c} T={T} on={i === 0}>{c}</PDkChip>)}</div>
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', marginTop: 14 }}><Thumb T={T} d={PR_D('2798')} w={44} h={55} r={3} /><PDkField T={T} label="Product · complete recipe" value="2798 · Plazo set" caret /></div>
    <div style={{ display: 'flex', gap: 10, marginTop: 12 }}><PDkField T={T} label="Planned end" value="20/10/26" icon="calendar" /><PDkField T={T} label="Priority" value="P2" caret w={90} /></div>
    <div style={{ ...PDkUp(T), margin: '16px 0 4px' }}>Qty by colour · 85 pcs</div>
    {[['Sky', 20], ['Purple', 25], ['Peach', 40]].map(([c, q]) => <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 10, height: 52, borderTop: `1px solid ${T.line}` }}><Thumb T={T} d={PR_D('2798')} w={28} h={35} r={3} /><Dot n={c} /><span style={{ flex: 1, fontFamily: T.fontUI, fontSize: 14 }}>{c}</span><span style={{ width: 72, height: 40, lineHeight: '38px', borderRadius: 3, border: `1px solid ${T.line2}`, textAlign: 'right', padding: '0 10px', fontFamily: T.fontUI, fontSize: 15, fontWeight: 600, fontVariantNumeric: 'tabular-nums', boxSizing: 'border-box' }}>{q}</span></div>)}
    <div style={{ ...PDkUp(T), margin: '16px 0 4px' }}>Processes · assign now or later</div>
    {PDK_PROCS.map(([p, k, r, dates], i) => <div key={p} className="press" style={{ display: 'flex', alignItems: 'center', gap: 10, height: 52, borderTop: `1px solid ${T.line}`, fontFamily: T.fontUI, fontSize: 13.5 }}><span style={{ width: 14, color: T.ink3, fontVariantNumeric: 'tabular-nums' }}>{i + 1}</span><span style={{ flex: 1, minWidth: 0 }}><div style={{ color: T.ink }}>{p}</div><Meta T={T}>{k ? k.split(' · ')[0] : 'assign later'}{dates ? ` · ${i === 3 ? '50 / 50' : '30 / 30 / 40'} · ends ${dates[2]}` : ''}</Meta></span><Ic name="chevron-right" size={15} color={T.ink3} /></div>)}
  </Sheet></>);
}
/* (b) phone · the six groups in the scroller over the orders list */
function ScreenPDkGroups({ T }) {
  return frameF(T, <><PDkHeader T={T} node="Orders" /><Body>
    <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>{[['Production orders', true], ['Job cards'], ['Lifecycle']].map(([l, on]) => <T.Chip key={l} on={on} outline={!on} style={{ height: 30 }}>{l}</T.Chip>)}</div>
    {PR_ORDERS.slice(0, 4).map(o => <OrderRowP key={o.no} T={T} o={o} />)}
  </Body></>, prDock(T));
}

Object.assign(window, { PDK_SEG, PDK_GROUPS, PDkShell, PDkFloat, PDK_NODES, PDkHeader, PDkUp, PDkBox, PDkBoxHead, PDkField, PDkTag, PDkChip, PDkBtn, PDkCols, PDkNum, PDkMain, PDK_INW, PDkInwardMain, WebPDkInward, ScreenPDkInward, PDK_PROCS, PDK_NEED, PDkReadyPane, PDkNewOrderMain, WebPDkNewOrder, WebPDkHeaderOpen, ScreenPDkNewOrder, ScreenPDkGroups });

(window.NEW_DRAFT_MODULES = window.NEW_DRAFT_MODULES || []).push({ module: 'Production · review 2 exemplars', note: 'one pair per decision for compare (13 Oct): D3 header of six · D13 inward, paper first, accounts folded · D14 tranches collapsed · Desk density', subs: [
  { name: 'Header · six groups (D3)', flow: 'phone scroller of six → web header with Orders ▾ open', phone: [['Header · six groups in the scroller, Orders · provisional, pending decision 3', ScreenPDkGroups]], web: [['Header · six buttons, Orders ▾ open (Job cards inside), search 196 · provisional, pending decision 3', WebPDkHeaderOpen]] },
  { name: 'Purchase inward · paper first (D13)', flow: 'invoice no and date first → received qty → accounts folded', phone: [['Inward · paper first, no money (warehouse) · provisional, pending decision 13', ScreenPDkInward]], web: [['Inward · paper first, accounts folded to Freight · Discount · GST, Desk density · provisional, pending decision 13', WebPDkInward]] },
  { name: 'New order · tranches collapsed (D14)', flow: 'reason chips under the head → processes with default tranches → one opened', phone: [['New order · sheet, reason chips, tranches as one line · provisional, pending decision 14', ScreenPDkNewOrder]], web: [['New order · tranches collapsed, Embroidery opened, Desk density · provisional, pending decision 14', WebPDkNewOrder]] },
] });
