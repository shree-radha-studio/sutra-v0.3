/* NEW DRAFTS · Dispatch · design drafts · web (13 Oct 2026). Ready as a box board (Worked on · New · In packing ·
   Held) with the customer list in the right panel; Packing with three customers on the floor, parcel boxes drawn as
   photo slots, and the selected parcel's invoice and documents in the right panel. Atoms and data come from
   mod-dispatch-dd.jsx; chrome is the approved WebShell3. Pending is folded into Ready here (review 2, Q1). */

const DD_SEG = [['Ready', 15], ['Packing', 3, true], ['Billed', null, true], ['Stock', null, true], ['Out of stock', 14, true], ['Sale return', 2, true]];
const DD_TABS = (on, extra) => [{ icon: 'layout-grid', label: 'Catalogue' }, { icon: 'package', label: on, on: true }, ...(extra || [])];
const DdField = ({ T, children, w, icon = 'search', style }) => <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, height: 32, width: w, padding: '0 10px', borderRadius: 6, border: `1px solid ${T.line2}`, background: T.surface, fontFamily: T.fontUI, fontSize: 12.5, color: T.ink3, whiteSpace: 'nowrap', overflow: 'hidden', flex: 'none', boxSizing: 'border-box', ...style }}><Ic name={icon} size={14} color={T.ink2} />{children}</span>;
const DdQuick = ({ T, children, n, on, style }) => <span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 28, padding: '0 9px', borderRadius: 6, border: `1px solid ${on ? T.ink : T.line2}`, background: on ? T.ink : 'transparent', color: on ? T.bg : T.ink, fontFamily: T.fontUI, fontSize: 12, whiteSpace: 'nowrap', flex: 'none', ...style }}>{children}{n != null && <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums', opacity: on ? .85 : .6 }}>{n}</span>}</span>;

/* ── Ready · customer box: a kitchen order tile ── */
function DdCustomerBox({ T, c, sel, worked }) {
  const o = c.orders[0];
  return <div className="press" style={{ borderRadius: 8, border: sel ? `2px solid ${T.accent}` : `1px solid ${T.line2}`, background: T.surface, overflow: 'hidden', flex: 'none', boxShadow: T.dark ? 'none' : '0 8px 18px -16px rgba(36,23,18,.45)' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 46, padding: '0 10px', background: T.surface2, borderBottom: `1px solid ${T.line}` }}>
      <DdMono T={T} name={c.name} />
      <span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 16.5, fontWeight: 600, color: T.ink, lineHeight: 1.1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</div><DdMeta T={T} style={{ display: 'block', marginTop: 1 }}>{c.city} · {c.tier}</DdMeta></span>
      <span style={{ textAlign: 'right', flex: 'none' }}><div style={{ fontFamily: T.fontUI, fontSize: 12, fontWeight: 600, color: ddDueTone(T, c.due), fontVariantNumeric: 'tabular-nums' }}>{ddDue(c.due)}</div><DdTag T={T} fill={c.p === 1} tone={c.p <= 2 ? undefined : 'muted'} style={{ height: 16, fontSize: 9, marginTop: 2 }}>P{c.p}</DdTag></span>
    </div>
    <div style={{ padding: '8px 10px 2px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>{worked ? <><DdTag T={T}>Worked on ×{c.times}</DdTag><DdTag T={T} tone="muted">Partly sent {c.sent}/{c.of}</DdTag></> : <><DdTag T={T}>New</DdTag><span style={{ flex: 1 }} /><DdMeta T={T} style={{ fontSize: 10.5 }}>{c.last}</DdMeta></>}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 7, marginTop: 8 }}><span style={{ fontFamily: T.fontMono, fontSize: 11.5, fontWeight: 600, color: T.ink }}>{o.no}</span><DdMeta T={T}>{worked ? c.last : o.date}</DdMeta><span style={{ flex: 1 }} /><DdMeta T={T} style={{ color: T.ink2 }}>{o.owed} {worked ? 'owed' : 'pcs'}</DdMeta></div>
      <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>{o.lines.slice(0, 5).map(([code, q, stock], i) => <span key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}><DdPhoto T={T} code={code} qty={q} out={stock === 0} /><DdNum T={T} size={12.5} color={stock === 0 ? T.ink3 : T.ink}>{code}</DdNum></span>)}</div>
      {c.more && <div className="press" style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 6, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2 }}><Ic name="plus" size={12} />1 more order · {c.more}<Ic name="chevron-down" size={12} /></div>}
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, height: 42, padding: '0 8px 0 10px', marginTop: 6, borderTop: `1px solid ${T.line}` }}>
      <DdNum T={T} size={19}>{c.owed}</DdNum><DdMeta T={T}>pcs · {c.pack} packable</DdMeta><span style={{ flex: 1 }} />
      <Hit T={T} icon="phone" size={28} iconSize={13} style={{ background: T.chipBg, borderRadius: 6 }} />
      <DdBtn T={T} kind={sel ? 'accent' : 'line'} h={30} style={{ letterSpacing: '.06em', fontWeight: 600, padding: '0 11px', gap: 4 }}>PACK<Ic name="chevron-right" size={13} sw={2.2} /></DdBtn>
    </div>
  </div>;
}
/* In packing: compact box of a live packing */
const DdPackingBox = ({ T, k }) => <div className="press" style={{ borderRadius: 8, border: `1px solid ${T.line2}`, background: T.surface, overflow: 'hidden', flex: 'none' }}>
  <div style={{ display: 'flex', alignItems: 'center', gap: 7, height: 38, padding: '0 9px', background: T.surface2, borderBottom: `1px solid ${T.line}` }}><DdMono T={T} name={k.name} s={22} /><span style={{ flex: 1, minWidth: 0, fontFamily: T.fontDisplay, fontSize: 14.5, fontWeight: 600, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{k.name}</span><Ic name="chevron-right" size={14} color={T.ink3} /></div>
  <div style={{ padding: '7px 9px 9px' }}>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}><DdNum T={T} size={17}>{k.done}</DdNum><DdMeta T={T}>of {k.of} pcs · {k.boxes}</DdMeta></div>
    <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>{k.photos.slice(0, 6).map((p, i) => <DdPhoto key={i} T={T} code={p} w={28} h={35} r={4} />)}</div>
  </div>
</div>;
const DdColHead = ({ T, title, n, sub, right }) => <div style={{ flex: 'none', marginBottom: 8 }}>
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 7 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 19, fontWeight: 600, color: T.ink }}>{title}</span><span style={{ fontFamily: T.fontUI, fontSize: 12, fontWeight: 600, color: T.ink2, fontVariantNumeric: 'tabular-nums' }}>{n}</span><span style={{ flex: 1 }} />{right}</div>
  <DdMeta T={T} style={{ display: 'block' }}>{sub}</DdMeta>
</div>;

/* Ready · right panel: every open order, customer-wise, collapsible, searchable, with quick buttons */
function DdOrdersPanel({ T }) {
  const n = DD_WORKED[0], o = n.orders[0]; const val = o.lines.reduce((s, [c, q]) => s + q * ddD(c).price, 0);
  const rows = [[DD_WORKED[1].name, '1 order · 3 owed', 2, 'worked'], [DD_WORKED[2].name, '1 order · 5 owed', 12, 'worked'], [DD_NEW[0].name, '1 order · 11 pcs', 18, 'new'], [DD_NEW[1].name, '1 order · 6 pcs', 19, 'new'], [DD_NEW[2].name, '1 order · 7 pcs', 20, 'new'], ['Preeti Fashion Hub', 'in packing · 9 to go', 6, 'pack'], ['Rajwadi Ethnic Emporium', 'in packing · 13 to go', 9, 'pack']];
  return <div style={{ padding: '10px 12px', height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxSizing: 'border-box' }}>
    <div style={{ display: 'flex', gap: 6 }}><DdField T={T} style={{ flex: 1, width: 'auto' }}>Customer, order or design</DdField><Hit T={T} icon="chevrons-down-up" size={32} iconSize={15} style={{ background: T.chipBg, borderRadius: 6 }} /></div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 5, marginTop: 8 }}>{[['All', 15, true], ['Worked on', 6], ['New', 9], ['Packable', 11], ['Due ≤ 2 d', 3], ['Held', 2]].map(([l, k, on]) => <DdQuick key={l} T={T} n={k} on={on} style={{ justifyContent: 'center' }}>{l}</DdQuick>)}</div>
    <DdMeta T={T} style={{ display: 'block', margin: '8px 2px 4px' }}>42 orders · 15 customers · tap one to find its box</DdMeta>
    <div style={{ borderRadius: 8, border: `1px solid ${T.line2}`, background: T.surface2, padding: '6px 8px 8px', marginTop: 2 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, height: 30 }}><Ic name="chevron-down" size={14} color={T.ink2} /><span style={{ flex: 1, minWidth: 0, fontFamily: T.fontDisplay, fontSize: 16, fontWeight: 600, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{n.name}</span><span style={{ fontFamily: T.fontUI, fontSize: 11.5, fontWeight: 600, color: T.danger }}>{ddDue(n.due)}</span></div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, height: 26, borderTop: `1px solid ${T.line}` }}><span style={{ fontFamily: T.fontMono, fontSize: 11.5, fontWeight: 600, color: T.ink }}>{o.no}</span><Journey T={T} p={{ stage: 'After 1st dispatch', due: n.due }} w={64} /><DdMeta T={T}>{n.sent}/{n.of} sent</DdMeta><span style={{ flex: 1 }} /><span style={{ fontFamily: T.fontSerif, fontSize: 14, fontWeight: 600, color: T.ink, fontVariantNumeric: 'tabular-nums' }}>{money(val)}</span></div>
      {o.lines.map(([code, q, stock], i) => <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '3px 0', borderTop: `1px solid ${T.line}` }}><DdPhoto T={T} code={code} w={24} h={30} r={4} out={false} style={{ opacity: stock === 0 ? .5 : 1 }} /><span style={{ flex: 1, minWidth: 0 }}><DdNum T={T} size={13.5}>{code}</DdNum> <DdMeta T={T}>{ddD(code).name}</DdMeta>{stock === 0 && <DdMeta T={T} style={{ display: 'block', fontSize: 10 }}>0 in stock · 2 at the last step</DdMeta>}</span><span style={{ fontFamily: T.fontUI, fontSize: 12, color: T.ink, fontVariantNumeric: 'tabular-nums' }}>× {q}</span></div>)}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, height: 26, borderTop: `1px solid ${T.line}` }}><Ic name="chevron-right" size={13} color={T.ink3} /><span style={{ fontFamily: T.fontMono, fontSize: 11.5, fontWeight: 600, color: T.ink2 }}>SO-3392</span><DdMeta T={T}>04/08/26 · 7 owed</DdMeta></div>
    </div>
    <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', marginTop: 4 }}>{rows.map(([nm, sub, due, kind]) => <div key={nm} className="press" style={{ display: 'flex', alignItems: 'center', gap: 6, height: 40, padding: '0 6px', borderBottom: `1px solid ${T.line}` }}>
      <Ic name="chevron-right" size={14} color={T.ink3} />
      <span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 15, fontWeight: 600, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{nm}</div><DdMeta T={T} style={{ display: 'block' }}>{sub}</DdMeta></span>
      {kind === 'new' && <DdTag T={T} style={{ height: 17, fontSize: 8.5 }}>New</DdTag>}{kind === 'pack' && <DdTag T={T} tone="muted" style={{ height: 17, fontSize: 8.5 }}>Packing</DdTag>}
      <span style={{ width: 52, textAlign: 'right', fontFamily: T.fontUI, fontSize: 11.5, fontWeight: 600, color: ddDueTone(T, due) }}>{ddDue(due)}</span>
    </div>)}</div>
  </div>;
}

/* ── web · Ready: the box board ── */
function WebDdReady({ T }) {
  return <WebShell3 T={T} module="Dispatch" crumb={['Dispatch', 'Ready']} section="Ready" seg={DD_SEG} active="Ready" tabs={DD_TABS('Dispatch · Ready')} stripRight={<LiveChip T={T} />} paneTitle="All orders · 42" paneWidth={310} pane={<DdOrdersPanel T={T} />}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 14px 10px', flex: 'none' }}>
      <DdField T={T} w={178}>Customer, order or design</DdField>
      <DdBtn T={T} icon="arrow-down-up" h={32} style={{ gap: 5 }}>Due · oldest first<Ic name="chevron-down" size={13} color={T.ink3} /></DdBtn>
      <DdQuick T={T} on>Packable now</DdQuick><DdQuick T={T}>Due ≤ 2 d</DdQuick><DdQuick T={T}>P1–P2</DdQuick><DdQuick T={T}>More<Ic name="chevron-down" size={12} /></DdQuick>
      <span style={{ flex: 1 }} /><DdMeta T={T} style={{ color: T.ink2 }}>15 customers · 212 pcs owed</DdMeta>
    </div>
    <div style={{ flex: 1, minHeight: 0, display: 'flex', gap: 12, padding: '0 14px', overflow: 'hidden' }}>
      <div style={{ width: 284, flex: 'none', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <DdColHead T={T} title="Worked on" n={6} sub="sent in part, still owed · until sent or cancelled" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0, overflow: 'hidden' }}>{DD_WORKED.map((c, i) => <DdCustomerBox key={c.name} T={T} c={c} worked sel={i === 0} />)}</div>
      </div>
      <div style={{ width: 284, flex: 'none', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <DdColHead T={T} title="New" n={9} sub="approved, not yet touched in dispatch" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0, overflow: 'hidden' }}>{DD_NEW.map(c => <DdCustomerBox key={c.name} T={T} c={c} />)}</div>
      </div>
      <div style={{ width: 222, flex: 'none', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <DdColHead T={T} title="In packing" n="3 of 4" sub="on the floor now · tap to open" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>{DD_PACKING.map(k => <DdPackingBox key={k.name} T={T} k={k} />)}
          <div style={{ borderRadius: 8, border: `1px dashed ${T.line2}`, padding: '10px 10px', fontFamily: T.fontUI, fontSize: 11.5, color: T.ink3, lineHeight: 1.4 }}>1 packing free · PACK a customer to start the fourth</div>
        </div>
      </div>
      <div className="press" style={{ width: 30, flex: 'none', borderRadius: 8, border: `1px solid ${T.line2}`, background: T.surface2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, paddingTop: 10, marginBottom: 14 }}>
        <Ic name="chevron-left" size={14} color={T.ink2} />
        <span style={{ writingMode: 'vertical-rl', fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2, letterSpacing: '.06em' }}>Held · 2 · past due, ask the customer</span>
      </div>
    </div>
  </WebShell3>;
}

/* ── Packing · parcel box drawn as photo slots ── */
function DdParcelBox({ T, code, pieces, status, active, inv, w = 176 }) {
  const slot = Math.floor((w - 16 - 12) / 4), done = status === 'INVOICED';
  return <div style={{ width: w, flex: 'none', borderRadius: 8, border: active ? `2px solid ${T.accent}` : `1px solid ${T.line2}`, background: T.surface, overflow: 'hidden', opacity: done ? .78 : 1, boxSizing: 'border-box' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, height: 34, padding: '0 8px', background: T.surface2, borderBottom: `1px solid ${T.line}` }}><Ic name={done ? 'package-check' : 'package-open'} size={14} color={T.ink2} /><DdNum T={T} size={16}>{code}</DdNum><span style={{ flex: 1 }} /><DdNum T={T} size={16}>{pieces.length}</DdNum><span style={{ fontFamily: T.fontUI, fontSize: 11, color: T.ink3 }}>/12</span></div>
    <div style={{ padding: '6px 8px 0' }}>{active ? <DdTag T={T} fill>Packing into</DdTag> : done ? <DdTag T={T} tone="muted">Invoiced · {inv}</DdTag> : <DdTag T={T}>Open</DdTag>}</div>
    <div style={{ padding: '6px 8px 8px' }}><DdSlots T={T} pieces={pieces} w={slot} h={Math.round(slot * 1.25)} fresh={active} /></div>
    <div style={{ padding: '0 8px 8px' }}>{done ? <DdMeta T={T} style={{ display: 'block', textAlign: 'center', lineHeight: '28px' }}>awaiting shipment</DdMeta> : <DdBtn T={T} kind={active ? 'ink' : 'line'} icon="package-check" h={28} style={{ width: '100%', boxSizing: 'border-box' }}>Close box</DdBtn>}</div>
  </div>;
}
const DdMiniBox = ({ T, code, pieces }) => <div style={{ borderRadius: 6, border: `1px solid ${T.line2}`, background: T.surface, padding: '5px 6px 6px', flex: 'none' }}>
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, marginBottom: 4 }}><DdNum T={T} size={13}>{code}</DdNum><span style={{ flex: 1 }} /><span style={{ fontFamily: T.fontUI, fontSize: 10.5, color: T.ink2, fontVariantNumeric: 'tabular-nums' }}>{pieces.length}/12</span></div>
  <DdSlots T={T} pieces={pieces} w={15} h={19} gap={2} mini />
</div>;
function DdLaneCompact({ T, name, city, done, of, note, boxes, bring }) {
  return <div className="press" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 10px', borderRadius: 8, border: `1px solid ${T.line2}`, background: T.dark ? T.bg2 : 'rgba(252,250,246,.6)', flex: 'none' }}>
    <span style={{ width: 172, flex: 'none', display: 'flex', alignItems: 'center', gap: 8 }}><DdMono T={T} name={name} s={26} /><span style={{ minWidth: 0 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 14.5, fontWeight: 600, color: T.ink, lineHeight: 1.1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</div><DdMeta T={T} style={{ display: 'block' }}>{city} · {done} of {of} packed</DdMeta></span></span>
    {boxes.map(([c, p]) => <DdMiniBox key={c} T={T} code={c} pieces={p} />)}
    <span style={{ flex: 1, minWidth: 0, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2, lineHeight: 1.35 }}>{note}</span>
    <DdBtn T={T} h={28} style={{ gap: 5 }}>To bring · {bring}<Ic name="chevron-right" size={12} /></DdBtn>
  </div>;
}
const DdDocRow = ({ T, n, title, state, text, sub }) => { const ic = state === 'done' ? 'circle-check' : state === 'now' ? 'circle-dot' : 'circle'; return <div style={{ display: 'flex', gap: 8, padding: '5px 0', borderTop: `1px solid ${T.line}` }}>
  <Ic name={ic} size={16} color={state === 'next' ? T.ink3 : T.ink} style={{ flex: 'none', marginTop: 1 }} />
  <span style={{ flex: 1, minWidth: 0 }}><div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}><span style={{ fontFamily: T.fontUI, fontSize: 12.5, fontWeight: 600, color: T.ink }}>{n} · {title}</span><span style={{ flex: 1 }} /><span style={{ fontFamily: T.fontUI, fontSize: 10.5, color: state === 'next' ? T.ink3 : T.ink2, whiteSpace: 'nowrap' }}>{sub}</span></div>{text && <div style={{ fontFamily: T.fontUI, fontSize: 11, color: T.ink2, lineHeight: 1.3, marginTop: 1 }}>{text}</div>}</span>
</div>; };

/* Packing · right panel: the selected parcel's invoice building live, with its documents */
function DdParcelPanel({ T }) {
  const v = ddInvoice(); const cell = { fontFamily: T.fontUI, fontSize: 11.5, color: T.ink, fontVariantNumeric: 'tabular-nums' };
  const kv = (k, val, sub) => <span style={{ minWidth: 0 }}><DdMeta T={T} style={{ display: 'block', fontSize: 9.5, letterSpacing: '.07em', textTransform: 'uppercase' }}>{k}</DdMeta><span style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: T.fontUI, fontSize: 12, fontWeight: 500, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{val}</span>{sub && <DdMeta T={T} style={{ display: 'block', fontSize: 10 }}>{sub}</DdMeta>}</span>;
  return <div style={{ padding: '8px 14px 10px', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 10px', marginTop: 2, padding: '7px 9px', borderRadius: 8, background: T.surface2, border: `1px solid ${T.line}` }}>
      {kv('Billed by', <>Shree Radha Studio<Ic name="chevron-down" size={11} color={T.ink3} /></>, 'GSTIN 07AEZPA2938L2ZX')}
      {kv('Bill to · ship to', <>Preeti Fashion Hub<Ic name="chevron-down" size={11} color={T.ink3} /></>, 'GSTIN 03AAKFP4417M1ZQ')}
      {kv('Place of supply', 'Punjab (03) · IGST')}
      {kv('Orders in this box', <span style={{ fontFamily: T.fontMono, fontSize: 11 }}>SO-3472 · SO-3480</span>)}
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 44px 26px 64px', gap: 6, marginTop: 8, paddingBottom: 3, borderBottom: `1px solid ${T.line2}` }}>{['Design · order', 'HSN', 'Qty', 'Amount'].map((h, i) => <DdMeta key={h} T={T} style={{ fontSize: 9.5, letterSpacing: '.07em', textTransform: 'uppercase', textAlign: i > 1 ? 'right' : 'left' }}>{h}</DdMeta>)}</div>
    {v.rows.map((r, i) => <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 44px 26px 64px', gap: 6, alignItems: 'center', height: 21, borderBottom: `1px solid ${T.line}` }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}><DdPhoto T={T} code={r.code} w={15} h={19} r={3} /><DdNum T={T} size={13}>{r.code}</DdNum><DdMeta T={T} style={{ fontSize: 10 }}>{r.so} · {r.rate} %</DdMeta></span>
      <span style={{ ...cell, fontFamily: T.fontMono, fontSize: 10.5, color: T.ink2 }}>{r.d.hsn}</span><span style={{ ...cell, textAlign: 'right' }}>{r.q}</span><span style={{ ...cell, textAlign: 'right', fontWeight: 600 }}>{r.amt.toLocaleString('en-IN')}</span>
    </div>)}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '2px 10px', marginTop: 6, fontFamily: T.fontUI, fontSize: 11, color: T.ink2, fontVariantNumeric: 'tabular-nums' }}>
      <span>Taxable value</span><span style={{ textAlign: 'right' }}>{ddRs(v.taxable)}</span>
      <span>IGST 18 % {ddRs(v.t18, true)} · 5 % on blouses {ddRs(v.t5, true)}</span><span style={{ textAlign: 'right' }}>{ddRs(v.t18 + v.t5, true)}</span>
      <span style={{ color: T.ink, fontWeight: 600, paddingTop: 3, borderTop: `1px solid ${T.line2}` }}>{v.pcs} pcs · total so far, rounded</span><span style={{ textAlign: 'right', paddingTop: 3, borderTop: `1px solid ${T.line2}` }}><PriceF v={v.grand} size={19} font={T.fontSerif} color={T.ink} dim={T.ink3} /></span>
    </div>
    <div style={{ display: 'flex', alignItems: 'baseline', marginTop: 8, marginBottom: 1 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 16, fontWeight: 600, color: T.ink }}>Documents for this box</span><span style={{ flex: 1 }} /><DdMeta T={T}>1 of 5 done</DdMeta></div>
    <DdDocRow T={T} n={1} title="Packing slip" state="done" sub="10 pcs · label printed" />
    <DdDocRow T={T} n={2} title="Invoice" state="now" sub="building" text="Review and confirm when the box closes" />
    <DdDocRow T={T} n={3} title="E-invoice · IRN" state="next" sub="needed: firm over ₹5 cr · on confirm" />
    <DdDocRow T={T} n={4} title="E-way bill" state="next" sub="needed" text={`${ddRs(v.grand)} with tax is over ₹50,000 · Delhi → Ludhiana, 312 km, valid 2 days · Part A on confirm, B at shipment`} />
    <DdDocRow T={T} n={5} title="Transport slip · LR" state="next" sub="Punjab Freight · LR at pick-up" />
    <DdBtn T={T} kind="ink" icon="package-check" h={36} style={{ width: '100%', boxSizing: 'border-box', marginTop: 8, flex: 'none' }}>Close box P00081 · then review</DdBtn>
  </div>;
}

/* ── web · Packing: three customers on the floor ── */
function WebDdPacking({ T }) {
  return <WebShell3 T={T} module="Dispatch" crumb={['Dispatch', 'Packing', 'Preeti Fashion Hub']} section="Packing" seg={DD_SEG} active="Packing" tabs={DD_TABS('Dispatch · Packing', [{ icon: 'file-text', label: 'P00081 · Preeti Fashion Hub' }])} stripRight={<LiveChip T={T} />} paneTitle="Box P00081 · live invoice" paneWidth={360} pane={<DdParcelPanel T={T} />}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 14px', flex: 'none' }}>
      <DdBtn T={T} kind="ink" icon="scan-line" h={32}>Scanning here · desk holds the scanner</DdBtn>
      <DdMeta T={T} style={{ marginLeft: 4 }}>scan a box label to switch box</DdMeta>
      <span style={{ flex: 1 }} /><DdMeta T={T} style={{ color: T.ink2, marginRight: 4 }}>3 of 4 packings</DdMeta>
      <DdBtn T={T} icon="boxes" h={32}>Select for shipment</DdBtn><DdBtn T={T} icon="truck" h={32}>Close shipment</DdBtn>
    </div>
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: 10, padding: '0 14px 14px', overflow: 'hidden' }}>
      <div style={{ display: 'flex', gap: 12, padding: 10, borderRadius: 8, border: `1px solid ${T.line2}`, background: T.surface, flex: 'none', boxShadow: T.dark ? 'none' : '0 10px 22px -18px rgba(36,23,18,.45)' }}>
        <div style={{ width: 168, flex: 'none', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><DdMono T={T} name="Preeti Fashion Hub" s={32} /><DdTag T={T} tone="muted">Packing now</DdTag></div>
          <div style={{ fontFamily: T.fontDisplay, fontSize: 19, fontWeight: 600, color: T.ink, lineHeight: 1.1, marginTop: 8 }}>Preeti Fashion Hub</div>
          <DdMeta T={T} style={{ display: 'block', marginTop: 2 }}>Ludhiana · Punjab · P1</DdMeta>
          <DdMeta T={T} style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 6, color: T.ink2 }}><Ic name="truck" size={12} />Punjab Freight</DdMeta>
          <span style={{ fontFamily: T.fontMono, fontSize: 11, fontWeight: 600, color: T.ink, marginTop: 4 }}>SO-3472 · SO-3480</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, marginTop: 10 }}><DdNum T={T} size={26}>17</DdNum><DdMeta T={T}>of 26 pcs packed</DdMeta></div>
          <span style={{ flex: 1 }} />
          <div className="press" style={{ borderRadius: 6, border: `1px solid ${T.line2}`, padding: '6px 7px' }}>
            <div style={{ display: 'flex', alignItems: 'center', fontFamily: T.fontUI, fontSize: 11.5, fontWeight: 600, color: T.ink }}>To bring · 9 pcs<span style={{ flex: 1 }} /><Ic name="chevron-right" size={13} color={T.ink3} /></div>
            <div style={{ display: 'flex', gap: 4, marginTop: 5 }}>{[['8433', 1], ['8321', 2], ['D9124', 1], ['2798', 2]].map(([c, q]) => <DdPhoto key={c} T={T} code={c} w={33} h={41} r={4} qty={q} />)}</div>
          </div>
        </div>
        <DdParcelBox T={T} code="P00080" status="INVOICED" inv="SI-2296" pieces={['8477', 'D9121', 'D9121', '8111', '8433', 'D9124', '2798', '2798', '8190', 'D9128', 'D9128', '8477']} />
        <DdParcelBox T={T} code="P00081" status="OPEN" active pieces={DD_BOX} />
        <DdParcelBox T={T} code="P00082" status="OPEN" pieces={['8433', 'D9124', '8477']} />
        <div className="press" style={{ width: 42, flex: 'none', borderRadius: 8, border: `1px dashed ${T.line2}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, color: T.ink2 }}><Ic name="plus" size={16} /><span style={{ writingMode: 'vertical-rl', fontFamily: T.fontUI, fontSize: 11.5 }}>New box</span></div>
      </div>
      <DdLaneCompact T={T} name="Rajwadi Ethnic Emporium" city="Jaipur" done={6} of={19} bring={13} boxes={[['P00078', ['8433', '8190', 'D9130', 'D9130', '8190', '8433']]]} note="Waiting for 2798 Sky · 6 at the last step, due 15/10. Tap to pack this customer." />
      <DdLaneCompact T={T} name="Meenakshi Silk House" city="Madurai" done={3} of={8} bring={5} boxes={[['P00083', ['2006', 'D9128', '2006']]]} note="Stock boy fetching 5 pcs from aisle C." />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: 44, padding: '0 12px', borderRadius: 8, border: `1px dashed ${T.line2}`, flex: 'none' }}><Ic name="plus" size={15} color={T.ink3} /><span style={{ flex: 1, fontFamily: T.fontUI, fontSize: 12, color: T.ink3 }}>1 packing free · PACK a customer on Ready to start the fourth</span><DdBtn T={T} h={28}>Open Ready</DdBtn></div>
    </div>
  </WebShell3>;
}

Object.assign(window, { DD_SEG, DD_TABS, DdField, DdQuick, DdCustomerBox, DdPackingBox, DdColHead, DdOrdersPanel, WebDdReady, DdParcelBox, DdMiniBox, DdLaneCompact, DdDocRow, DdParcelPanel, WebDdPacking });

/* Board registration: a new section on the Dispatch page, "Design drafts" (owner, 13 Oct). */
(window.NEW_DRAFT_MODULES = window.NEW_DRAFT_MODULES || []).push({ module: 'Dispatch · design drafts', note: 'review 2 drawn (13 Oct): Ready as a box board with sections and the customer list in the panel; Packing with three customers on the floor, boxes as photo slots, the box invoice with its documents · 8 px corners, one maroon line, a photo in every box', subs: [
  { name: 'Design drafts', flow: 'ready board → PACK → packing lanes, box invoice + documents · phone: scan drops the piece into the box', phone: [['Packing · packer scans, the piece drops into slot 10 of the box', ScreenDdScan]], web: [['Ready · box board: worked on, new, in packing · customer list panel', WebDdReady], ['Packing · three customers on the floor, boxes as photo slots · panel = box invoice and documents', WebDdPacking]] },
] });
