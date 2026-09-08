/* NEW DRAFTS · Production · web, part B (8 Sep 2026, revised after the coverage review): production orders (cards, list,
   new order, states), the lifecycle terminal (job panels, assign, issue, issue for a Direct order, receive, receive
   finished goods, print), and the job cards board in five views with the filters drawer. Part C
   (mod-production-web3.jsx) holds samples, costing, karigars, the locked state and the board registration.
   One filled maroon button per screen: the pane's action when a pane form is open; otherwise the open job panel's. */

/* ── W12 · Production orders ── */
const ORD_TABS = [['All', 53], ['Draft', 1], ['Awaiting approval', 1], ['Active', 9], ['Materials pending', 2], ['Delayed', 3], ['Closed', 41]];
const ORD_SHOW = ['PO-1203', 'PO-1202', 'PO-1187', 'PO-1192', 'PO-1201', 'PO-1174'];
const OrderCardW = ({ T, o, on }) => { const d = PR_D(o.code); const tot = prQty(o); const draft = /Draft|Awaiting/.test(o.state); return <div className="press" style={{ display: 'flex', gap: 12, padding: 12, borderRadius: 18, background: T.surface, border: `1px solid ${on ? T.accentLine : T.line}`, boxShadow: on ? `0 0 0 2px ${T.accentSoft}` : 'none', minWidth: 0, opacity: 1 }}>
  <Thumb T={T} d={d} w={64} h={80} r={14} />
  <span style={{ flex: 1, minWidth: 0 }}>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><Num T={T} size={22}>{o.code}</Num><Mono T={T} size={11.5}>{o.no}</Mono><span style={{ flex: 1 }} /><OrderPill T={T} s={o.state} small /></div>
    <Meta T={T} style={{ display: 'block', marginTop: 2 }}>{d.name} · {o.book} · {o.by} · {draft ? `planned ${o.date} → ${o.end}` : `end ${o.end}`}</Meta>
    <div style={{ marginTop: 6 }}><ColourQty T={T} o={o} /></div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>{draft ? <Meta T={T} style={{ flex: 1, minWidth: 0 }}>{o.approval ? `${o.approval} · job cards appear on approval` : `${o.jobs.filter(j => j.k).length}/${o.jobs.length} assigned · not submitted`}</Meta> : <><Progress T={T} v={o.recd / tot} w={56} tone={o.recd >= tot ? T.ok : T.accent} /><Meta T={T} style={{ flex: 1, minWidth: 0 }}>{o.recd}/{tot} pcs · {o.jobs.filter(j => j.k).length}/{o.jobs.length} assigned</Meta></>}{o.reason && <Pill T={T} tone={o.reason === 'Priority production' ? 'warn' : o.reason === 'Restock' ? 'blue' : 'ok'} small>{o.reason}</Pill>}{o.dest !== 'Shree Radha Studio' && <Pill T={T} tone="accent" small>→ {o.dest.split(' ')[0]}</Pill>}</div>
    <div style={{ marginTop: 8 }}><ProcTimeline T={T} o={o} /></div>
  </span>
</div>; };
function LifecyclePane({ T, o, back }) {
  return <PPane style={{ padding: '10px 12px 12px' }}>
    {back && <span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, height: 26, padding: '0 10px 0 6px', borderRadius: 999, background: T.chipBg, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2, alignSelf: 'flex-start', marginBottom: 8 }}><Ic name="arrow-left" size={12} />{back}</span>}
    <div style={{ display: 'flex', gap: 10 }}><Thumb T={T} d={PR_D(o.code)} w={48} h={60} r={11} /><span style={{ flex: 1, minWidth: 0 }}><div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}><Num T={T} size={20}>{o.code}</Num><Mono T={T} size={11.5}>{o.no}</Mono></div><Meta T={T} style={{ display: 'block' }}>{prQty(o)} pcs · end {o.end} · {o.dest.split(' ')[0]}</Meta><div style={{ marginTop: 4 }}><OrderPill T={T} s={o.state} small /></div></span></div>
    <div style={{ marginTop: 12 }}>{o.jobs.map((j, i) => { const k = j.k ? prK(j.k) : null; const c = j.state === 'Finished' ? T.ok : j.state === 'Stuck' ? T.danger : j.state === 'Unassigned' || j.state === 'Waiting previous' ? T.line2 : T.blue; return <div key={j.proc} style={{ display: 'flex', gap: 10, position: 'relative' }}>
      <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 18, flex: 'none' }}><span style={{ width: 14, height: 14, borderRadius: 7, background: j.state === 'Finished' ? c : T.surface, border: `2px solid ${c}`, boxSizing: 'border-box', marginTop: 4 }} />{i < o.jobs.length - 1 && <span style={{ flex: 1, width: 2, background: j.state === 'Finished' ? T.ok : T.line2, minHeight: 24 }} />}</span>
      <span style={{ flex: 1, minWidth: 0, paddingBottom: 10 }}><div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ fontFamily: T.fontUI, fontSize: 13, fontWeight: 600 }}>{i + 1} · {j.proc}</span><span style={{ flex: 1 }} /><JobChip T={T} s={j.state} small /></div><Meta T={T} style={{ display: 'block', marginTop: 2 }}>{k ? `${k.name} · ${j.recd}/${prQty(o)} back` : j.ready ? `${j.ready} pcs ready · no karigar` : 'not assigned'}{j.short ? ` · ${j.short}` : ''}</Meta><div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}><Pips T={T} tr={j.tr} />{j.next && j.state !== 'Finished' && <Meta T={T}>next {j.next.slice(0, 5)}</Meta>}</div></span>
    </div>; })}</div>
    <span style={{ flex: 1 }} />
    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}><Hit T={T} icon="arrow-up-right" size={32} iconSize={15} style={{ background: T.chipBg }} /><Hit T={T} icon="arrow-down-left" size={32} iconSize={15} style={{ background: T.chipBg }} /><Hit T={T} icon="printer" size={32} iconSize={15} style={{ background: T.chipBg }} /><span style={{ flex: 1 }} /><T.Btn small icon="chevron-right" style={{ height: 32 }}>Open lifecycle</T.Btn></div>
  </PPane>;
}
const OrdBar = ({ T, right, sort = 'Planned end · soonest', on = 2 }) => <PBar T={T} right={right}><T.Chip icon="search" outline>Design, order no, karigar</T.Chip><Caret T={T}>{sort}</Caret><Caret T={T}>Ordered · Aug–Sep</Caret>{['Unassigned', 'Tranche due', 'Delayed', 'Priority production', 'Restock', 'Other firm'].map((c, i) => <T.Chip key={c} on={i === on} outline={i !== on} x={i === on}>{c}</T.Chip>)}<AllFilters T={T} /><OutBtn T={T} small icon="plus">New order</OutBtn></PBar>;
function WebPOrders({ T }) {
  return <PShell T={T} section="Production orders" active="Orders" crumb={['Production', 'Orders', 'All']} paneTitle="PO-1187 · lifecycle" pane={<LifecyclePane T={T} o={prOrder('PO-1187')} />}>
    <ViewTabs T={T} tabs={ORD_TABS} active="All" right={<PTabs T={T} tabs={[['Cards', 'layout-grid'], ['List', 'list']]} on="Cards" />} />
    <PMain>
      <OrdBar T={T} on={null} right={<Meta T={T}>53 orders · 9 active · 1,046 pcs in production · newest first</Meta>} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>{ORD_SHOW.map(prOrder).map(o => <OrderCardW key={o.no} T={T} o={o} on={o.no === 'PO-1187'} />)}</div>
    </PMain>
  </PShell>;
}
function WebPOrdersList({ T }) {
  const rows = ['PO-1187', 'PO-1192', 'PO-1201', 'PO-1174', 'PO-1163', 'PO-1155', 'PO-1202', 'PO-1203'].map(prOrder);
  return <PShell T={T} section="Production orders" active="Orders" crumb={['Production', 'Orders', 'Active', 'List']} paneTitle="PO-1192 · lifecycle" pane={<LifecyclePane T={T} o={prOrder('PO-1192')} />}>
    <ViewTabs T={T} tabs={ORD_TABS} active="Active" right={<PTabs T={T} tabs={[['Cards', 'layout-grid'], ['List', 'list']]} on="List" />} />
    <PMain>
      <OrdBar T={T} on={2} right={<T.Chip icon="columns-3" outline>Columns · 10 of 22</T.Chip>} />
      <PCard T={T} style={{ padding: 0, overflow: 'hidden' }}><Tbl T={T} onRow={1} dense cols={[['Order', 74, 'left'], ['Design'], ['Book', 66, 'left'], ['Qty by colour', 124, 'left'], ['Recd', 52], ['Jobs', 40, 'left'], ['Ordered', 54, 'left'], ['End', 50, 'left'], ['Reason', 104, 'left'], ['State', 132, 'left']]} rows={rows.map(o => { const tot = prQty(o); return [<Mono T={T} size={11.5}>{o.no}</Mono>, <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, minWidth: 0 }}><Thumb T={T} d={PR_D(o.code)} w={24} h={30} r={6} /><span style={{ minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}><b>{o.code}</b><Meta T={T}> · {PR_D(o.code).name}</Meta></span></span>, o.book.replace(' book', ''), <span style={{ display: 'inline-flex', gap: 6, fontFamily: T.fontUI, fontSize: 11.5 }}>{Object.entries(o.qty).map(([c, q]) => <span key={c} style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}><Dot n={c} s={7} />{q}</span>)}</span>, <span style={{ color: o.recd >= tot ? T.ok : T.ink }}>{o.recd}/{tot}</span>, `${o.jobs.filter(j => j.k).length}/${o.jobs.length}`, o.date.slice(0, 5), o.end.slice(0, 5), o.reason ? <Pill T={T} tone="muted" small>{o.reason}</Pill> : <Meta T={T}>—</Meta>, <OrderPill T={T} s={o.state} small />]; })} /><div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderTop: `1px solid ${T.line}` }}><Meta T={T}>8 of 53 · click a row for the lifecycle pane · double-click opens the lifecycle</Meta></div></PCard>
    </PMain>
  </PShell>;
}
/* ── W13 · New production order ── */
function ReadinessPane({ T }) {
  const need = [['m4', 20], ['m12', 25], ['m2', 10], ['m1', 12.5], ['m6', 20 + 42.5], ['m7', 3.4], ['m5', 680], ['m8', 170], ['m9', 425], ['m10', 160], ['m11', 200], ['m3', 320]];
  return <PPane style={{ padding: '10px 12px 12px' }}>
    <Meta T={T}>for 85 pcs · Sky 20 · Purple 25 · Peach 40 · from the recipe</Meta>
    <div style={{ display: 'flex', gap: 6, margin: '8px 0' }}><T.Kpi label="Inputs" value="12" small /><T.Kpi label="Short" value="3" small tone="danger" /><T.Kpi label="On order" value="2" small /></div>
    <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>{need.map(([id, q]) => { const m = prMat(id); const short = m.stock < q; return <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', borderTop: `1px solid ${T.line}` }}><Swatch m={m} w={26} h={30} r={6} /><span style={{ flex: 1, minWidth: 0, fontFamily: T.fontUI, fontSize: 12, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{prMatName(m)}<Meta T={T} style={{ display: 'block' }}>need {q} {m.unit} · have {m.stock}{m.order ? ` · ${m.order} on order` : ''}</Meta></span>{short ? <span className="press" style={{ fontFamily: T.fontUI, fontSize: 11, fontWeight: 600, color: T.danger, whiteSpace: 'nowrap' }}>short {+(q - m.stock).toFixed(1)} · PO</span> : <Ic name="circle-check" size={15} color={T.ok} />}</div>; })}</div>
    <div style={{ marginTop: 8, padding: '8px 10px', borderRadius: 12, background: T.surface2, border: `1px solid ${T.line}`, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2 }}><div style={{ display: 'flex' }}><span style={{ flex: 1 }}>Cost preview per pc · money roles</span><b style={{ color: T.ink }}>₹2,058</b></div><div style={{ display: 'flex', marginTop: 2 }}><span style={{ flex: 1 }}>materials ₹1,498 · job rates ₹560</span><span>40 % → ₹3,430</span></div></div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}><Meta T={T}>approval: PM · not the merchandiser</Meta><span style={{ flex: 1 }} /><T.Btn small icon="send" style={{ height: 34 }}>Submit for approval</T.Btn></div>
  </PPane>;
}
function WebPNewOrder({ T }) {
  const procs = [['Touching', 'Meena Touching Works · 80', 40, ['30 %', '30 %', '40 %'], ['18/09', '21/09', '24/09']], ['Embroidery', 'Saleem Creation · 78 · 6 jobs · 340 m with him', 200, ['30 %', '30 %', '40 %'], ['26/09', '12/10', '20/10']], ['Latkan', null, null, null, null], ['Stitching', 'Noor Tailors · 84', 320, ['50 %', '50 %', '—'], ['10/10', '20/10', '—']]];
  return <PShell T={T} section="Production orders" active="Orders" crumb={['Production', 'Orders', 'New order']} tab="New production order" paneTitle="Material readiness" pane={<ReadinessPane T={T} />}>
    <ViewTabs T={T} tabs={ORD_TABS} active="Draft" back="Orders" right={<Meta T={T}>PO-1203 · saved as draft 08/09 11:40</Meta>} />
    <PMain>
      <PCard T={T}>
        <StepHead T={T} n={1} title="Order details" sub="from a suggestion, a sample, or by hand" right={<div style={{ display: 'flex', gap: 5 }}>{['Restock', 'Priority production', 'Customer shortage', 'High growth', 'By hand'].map((c, i) => <T.Chip key={c} on={i === 0} outline={i !== 0} style={{ height: 26, fontSize: 11 }}>{c}</T.Chip>)}</div>} />
        <div style={{ display: 'flex', gap: 14 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', width: 300 }}><Thumb T={T} d={PR_D('2798')} w={64} h={80} r={14} /><Field T={T} label="Product · has a complete recipe" value="2798 · Plazo set" caret /></div>
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}><Field T={T} label="Production ID" value="PO-1203 · auto" /><Field T={T} label="Book" value="Lehenga book" caret /><Field T={T} label="Date" value="08/09/26" icon="calendar" /><Field T={T} label="Planned end" value="20/10/26" icon="calendar" /><Field T={T} label="Ordered by" value="Rohan Mehta" caret /><Field T={T} label="Destination firm" value="Shree Radha Studio" caret /><Field T={T} label="Source" value="Restock suggestion · score 78" caret /><Field T={T} label="Priority" value="P2" caret /></div>
        </div>
        <div style={{ display: 'flex', gap: 14, marginTop: 12 }}>
          <div style={{ width: 300 }}><PrLab T={T}>Order qty by colour · click a cell to edit</PrLab><div style={{ borderRadius: 12, border: `1px solid ${T.line}`, overflow: 'hidden' }}><Tbl T={T} head={false} cols={[['Colour'], ['Qty', 80]]} rows={[['Sky', 20], ['Purple', 25], ['Peach', 40]].map(([c, q]) => [<span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Thumb T={T} d={PR_D('2798')} w={22} h={26} r={6} /><Dot n={c} />{c}</span>, <span style={{ display: 'inline-block', width: 64, height: 28, lineHeight: '26px', borderRadius: 8, border: `1px solid ${T.line2}`, textAlign: 'center', fontWeight: 600 }}>{q}</span>])} /><div style={{ display: 'flex', padding: '8px 10px', borderTop: `1px solid ${T.line2}`, fontFamily: T.fontUI, fontSize: 12.5, fontWeight: 600 }}><span style={{ flex: 1 }}>Total</span><span>85 pcs</span></div></div></div>
          <Field T={T} label="Remarks" ph="anything the floor should know" />
        </div>
      </PCard>
      <PCard T={T} style={{ marginTop: 12, padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '12px 14px 0' }}><StepHead T={T} n={2} title="Process assignment" sub="who makes what · a job unlocks when a karigar is assigned · assign later is fine" right={<Meta T={T}>tranches default 30 / 30 / 40 · a date per tranche · rates for money roles</Meta>} /></div>
        <Tbl T={T} cols={[['Process', 150, 'left'], ['Karigar · skill matched'], [<span>Rate ₹/pc<Lock T={T} /></span>, 96], ['Tranches', 180, 'left'], ['Due dates', 220, 'left'], ['', 90]]} rows={procs.map(([p, k, r, ratio, dates], i) => [<span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><span style={{ width: 22, height: 22, borderRadius: 11, background: T.chipBg, display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 600 }}>{i + 1}</span>{p}{i === procs.length - 1 && <Pill T={T} tone="muted" small>Final</Pill>}</span>, k ? <Field T={T} value={k} caret small /> : <Field T={T} ph="Select a karigar · Latkan · 2 available" caret small />, r ? <span style={{ display: 'inline-block', width: 70, height: 30, lineHeight: '28px', borderRadius: 8, border: `1px solid ${T.line2}`, textAlign: 'center', fontWeight: 600 }}>{r}</span> : <Meta T={T}>—</Meta>, ratio ? <span style={{ display: 'inline-flex', gap: 4 }}>{ratio.map((x, j) => <span key={j} style={{ height: 24, padding: '0 8px', borderRadius: 999, background: T.chipBg, display: 'inline-grid', placeItems: 'center', fontSize: 11 }}>{x}</span>)}<Ic name="chevron-down" size={12} color={T.ink3} style={{ alignSelf: 'center' }} /></span> : <Meta T={T}>assign later</Meta>, dates ? <span style={{ display: 'inline-flex', gap: 4 }}>{dates.map((x, j) => <span key={j} style={{ height: 24, padding: '0 8px', borderRadius: 7, border: `1px solid ${T.line2}`, display: 'inline-grid', placeItems: 'center', fontSize: 11, fontVariantNumeric: 'tabular-nums' }}>{x}</span>)}</span> : <Meta T={T}>—</Meta>, k ? <Pill T={T} tone="ok" small>assigned</Pill> : <Pill T={T} tone="blue" small>unassigned</Pill>])} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderTop: `1px solid ${T.line}` }}><Meta T={T}>2798 · 3 colours · 85 pcs · 3 of 4 processes assigned · job cards appear on approval, assigned or not · the recipe freezes for this order</Meta><span style={{ flex: 1 }} /><OutBtn T={T} small>Save draft</OutBtn><OutBtn T={T} small icon="printer">Preview job cards</OutBtn></div>
      </PCard>
    </PMain>
  </PShell>;
}
/* ── W14–W16 · Lifecycle ── */
const LIFE_TABS = o => [['Lifecycle', null, 'git-commit-horizontal'], ['Materials', 12], ['History', 9], ['Costing'], ['Documents', 3]];
function LifeHead({ T, o, active = 'Embroidery', compact }) {
  const tot = prQty(o); const d = PR_D(o.code);
  return <PCard T={T} style={{ padding: compact ? '10px 14px' : 14 }}>
    <div style={{ display: 'flex', gap: 14 }}>
      <Thumb T={T} d={d} w={compact ? 44 : 60} h={compact ? 54 : 74} r={12} />
      <span style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}><Num T={T} size={compact ? 22 : 26}>{o.code}</Num><Mono T={T} size={13}>{o.no}</Mono><OrderPill T={T} s={o.state} small={compact} /><span style={{ flex: 1 }} />{o.reason && <Pill T={T} tone="blue" small>{o.reason}</Pill>}{o.waitsOn && <Pill T={T} tone="warn" small>waits on {o.waitsOn.cut}</Pill>}<Pill T={T} tone="ok" small>Approved · RM · {o.date.slice(0, 5)}</Pill></div>
        <Meta T={T} style={{ display: 'block', marginTop: 3 }}>{d.name} · {o.book} · ordered {o.date} by {o.by} · planned end {o.end} · for {o.dest}{compact ? ' · recipe frozen' : ''}</Meta>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: compact ? 6 : 8 }}><ColourQty T={T} o={o} /><span style={{ flex: 1 }} />{!compact && <Meta T={T}>recipe v2 · frozen for this order</Meta>}</div>
        {!compact && <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}><span style={{ flex: 1, height: 10, borderRadius: 5, background: T.line, overflow: 'hidden' }}><span style={{ display: 'block', width: `${o.recd / tot * 100}%`, height: 10, background: T.accent }} /></span><span style={{ fontFamily: T.fontUI, fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap' }}>{o.recd} of {tot} pcs received</span><Meta T={T}>· all colours · counted at the last process</Meta></div>}
      </span>
    </div>
    <div style={{ marginTop: compact ? 8 : 12, padding: compact ? '6px 10px 0' : '10px 12px 4px', borderRadius: 14, background: T.surface2, border: `1px solid ${T.line}` }}><ProcTimeline T={T} o={o} wide active={active} /></div>
  </PCard>;
}
/* one process of an order · `primary` makes its main button the screen's single filled one · `brief` hides the lower grid
   so an open panel fits beside a pane form · `direct` = Ready production (nothing leaves the godown) */
function JobPanel({ T, o, j, i, open, colour = 'Sky', hist, primary, brief, direct }) {
  const k = j.k ? prK(j.k) : null; const tot = prQty(o); const last = i === o.jobs.length - 1;
  const Btn = ({ fill, icon, children }) => fill ? <T.Btn small icon={icon} style={{ height: 30 }}>{children}</T.Btn> : <OutBtn T={T} small icon={icon}>{children}</OutBtn>;
  return <PCard T={T} style={{ padding: 0, overflow: 'hidden', border: `1px solid ${open ? T.accentLine : T.line}` }} alt={!open}>
    <div className="press" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px' }}>
      <span style={{ width: 24, height: 24, borderRadius: 12, background: T.ink, color: T.bg, display: 'grid', placeItems: 'center', fontFamily: T.fontUI, fontSize: 12, fontWeight: 600 }}>{i + 1}</span><span style={{ fontFamily: T.fontDisplay, fontSize: 19, fontWeight: 600 }}>{j.proc}</span>{last && <Pill T={T} tone="accent" small>Final · finished goods</Pill>}<JobChip T={T} s={j.state} small />{j.state === 'Stuck' && j.short && <ReasonChip T={T} r={j.short} />}
      {k ? <><KarigarPill T={T} name={k.name} score={k.score} /><Meta T={T}>₹{j.rate}/pc<Lock T={T} /></Meta><Pips T={T} tr={j.tr} size={8} />{j.next && j.state !== 'Finished' && <PrNextPill T={T} j={j} />}</> : <Meta T={T} style={{ minWidth: 0 }}>{j.ready ? `${j.ready} pcs of ${prWipName(o.jobs[i - 1].proc, o.code)} ready · idle ${j.idle} d · ` : ''}locked until a karigar is assigned</Meta>}
      <span style={{ flex: 1 }} />
      {k ? <><Hit T={T} icon="printer" size={30} iconSize={14} style={{ background: T.chipBg }} /><Hit T={T} icon="user-cog" size={30} iconSize={14} style={{ background: T.chipBg }} /><Btn icon="arrow-up-right" fill={primary === 'issue'}>Issue</Btn><Btn icon="arrow-down-left" fill={primary === 'receive'}>Receive</Btn></> : <Btn icon="user-plus" fill={primary === 'assign'}>Assign karigar</Btn>}
      <Ic name={open ? 'chevron-up' : 'chevron-down'} size={16} color={T.ink3} />
    </div>
    {open && <div style={{ padding: '0 14px 14px' }}>
      <div style={{ display: 'flex', gap: 8 }}>{(j.tr || [[null, '—', 0], [null, '—', 0], [null, '—', 0]]).map((t, n) => <span key={n} style={{ flex: 1, padding: '8px 10px', borderRadius: 12, background: T.surface2, border: `1px solid ${T.line}`, fontFamily: T.fontUI, fontSize: 12 }}><Meta T={T}>Tranche {n + 1} · {t[1]}</Meta><div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 2 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 18, fontWeight: 600, color: t[0] && t[2] >= t[0] ? T.ok : T.ink }}>{t[0] ? `${t[2]}/${t[0]}` : '—'}</span><Meta T={T}>{!t[0] ? 'set on assign' : t[2] >= t[0] ? 'received' : t[2] > 0 ? 'partly · late' : 'due'}</Meta></div></span>)}<span style={{ flex: 1, padding: '8px 10px', borderRadius: 12, background: T.surface2, border: `1px solid ${T.line}`, fontFamily: T.fontUI, fontSize: 12 }}><Meta T={T}>Issued for · received · balance</Meta><div style={{ fontFamily: T.fontDisplay, fontSize: 18, fontWeight: 600, marginTop: 2 }}>{j.issued} · {j.recd} · {tot - j.recd}</div></span></div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 12 }}>{Object.keys(o.qty).map(c => <T.Chip key={c} on={c === colour} outline={c !== colour} style={{ height: 28 }}><Dot n={c} s={7} />{c} · {o.qty[c]}</T.Chip>)}<span style={{ flex: 1 }} /><Meta T={T}>output {last ? `${o.code}_${colour.toLowerCase()} · finished good` : prWipName(j.proc, o.code, colour)} · ordered {o.qty[colour]} · received {Math.round(j.recd * o.qty[colour] / tot)} · balance {o.qty[colour] - Math.round(j.recd * o.qty[colour] / tot)}</Meta></div>
      {direct ? <div style={{ marginTop: 8, padding: '10px 12px', borderRadius: 14, background: T.surface2, border: `1px solid ${T.line}`, fontFamily: T.fontUI, fontSize: 12, color: T.ink2 }}><b style={{ color: T.ink }}>Direct book · nothing leaves the godown.</b> The karigar supplies the finished pieces; the issue is the order itself, the receive counts what arrives. Job rate ₹{j.rate}/pc is the purchase price<Lock T={T} />.</div>
        : <><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}><PrLab T={T} style={{ margin: 0 }}>Inputs · {colour}</PrLab><span style={{ flex: 1 }} /><OutBtn T={T} small icon="plus" style={{ height: 26, fontSize: 11 }}>Add or swap an input · dye lot</OutBtn><OutBtn T={T} small icon="git-branch" style={{ height: 26, fontSize: 11 }}>Recipe · frozen v2</OutBtn></div>
          <div style={{ marginTop: 6, borderRadius: 14, border: `1px solid ${T.line}`, overflow: 'hidden' }}><InputsTable T={T} job={j} colour={colour} ordered={o.qty[colour]} /></div></>}
      {!brief && <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
        <div><PrLab T={T}>Colour wise</PrLab><div style={{ borderRadius: 14, border: `1px solid ${T.line}`, overflow: 'hidden' }}><ColourTable T={T} o={o} job={j} /></div></div>
        <div><PrLab T={T} right={<Meta T={T}>each row prints as a 3 × 4 in sticker · accounts voucher when synced</Meta>}>Issue / receive history</PrLab><div style={{ borderRadius: 14, border: `1px solid ${T.line}`, overflow: 'hidden' }}><HistoryRows T={T} rows={hist || PR_HIST} /></div></div>
      </div>}
    </div>}
  </PCard>;
}
function ThisJobPane({ T }) {
  return <PPane style={{ padding: '10px 12px 12px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><KarigarPill T={T} name="Saleem Creation" score={78} /><span style={{ flex: 1 }} /><Meta T={T}>6 jobs · 340 m with him</Meta></div>
    <div style={{ display: 'flex', gap: 6, marginTop: 10 }}><T.Kpi label="Due next" value="12/09" sub="tranche 2 · 26 pcs" small /><T.Kpi label="With him" value="18" sub="pcs issued, not back" small /><T.Kpi label={<span>Due ₹<Lock T={T} /></span>} value="₹5,400" sub="27 pcs × ₹200" small /></div>
    <Sect T={T}>Send now · in stock</Sect>
    {[['m1', 'Mono net · Purple', '218 m', '13 pcs worth for Purple'], ['m7', 'Zari thread · Gold', '2.4 kg', 'covers all three colours']].map(([id, n, s, w]) => <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderTop: `1px solid ${T.line}` }}><Swatch m={prMat(id)} w={28} h={32} r={7} /><span style={{ flex: 1, minWidth: 0, fontFamily: T.fontUI, fontSize: 12 }}>{n}<Meta T={T} style={{ display: 'block' }}>{w}</Meta></span><span style={{ fontFamily: T.fontUI, fontSize: 12, fontWeight: 600, color: T.ok }}>{s}</span></div>)}
    <Sect T={T}>Holding the next jobs</Sect>
    {[['m9', 'Rasgulla · Mono', 'out · PU-0345 due 10/09', true], ['m5', 'Cancan · Mono', '40 m · need 680 · PU-0342 today', true], ['m6', 'Mono net · Mono · Peach', 'dye lot DC-0035 due 15/09', false]].map(([id, n, w, bad]) => <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderTop: `1px solid ${T.line}` }}><Swatch m={prMat(id)} w={28} h={32} r={7} /><span style={{ flex: 1, minWidth: 0, fontFamily: T.fontUI, fontSize: 12 }}>{n}<Meta T={T} style={{ display: 'block', color: bad ? T.danger : T.ink3 }}>{w}</Meta></span><span className="press" style={{ fontFamily: T.fontUI, fontSize: 11, color: T.accent, whiteSpace: 'nowrap' }}>open</span></div>)}
    <span style={{ flex: 1 }} />
    <div style={{ padding: '8px 10px', borderRadius: 12, background: T.surface2, border: `1px solid ${T.line}`, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2 }}><div style={{ display: 'flex' }}><span style={{ flex: 1 }}>Cost so far per pc · money roles</span><b style={{ color: T.ink }}>₹1,738</b></div><Meta T={T}>materials ₹1,498 · touching ₹40 · embroidery ₹200 · latkan, stitching pending</Meta></div>
  </PPane>;
}
const Eyebrow = ({ children }) => <span style={{ whiteSpace: 'nowrap' }}>{children}</span>;
const LifeTabs = ({ T, o, right }) => <ViewTabs T={T} tabs={LIFE_TABS(o)} active="Lifecycle" back="Orders" eyebrow={<Eyebrow>{o.no} · {o.code}</Eyebrow>} right={right} />;
function WebPLifecycle({ T }) {
  const o = prOrder('PO-1187');
  return <PShell T={T} section="Production orders" active="Orders" crumb={['Production', 'Orders', 'PO-1187', 'Lifecycle']} tab="PO-1187 · 2798" paneTitle="This job · Embroidery" pane={<ThisJobPane T={T} />} paneWidth={320}>
    <LifeTabs T={T} o={o} right={<div style={{ display: 'flex', gap: 6, alignItems: 'center' }}><OutBtn T={T} small icon="printer">Job cards</OutBtn><OutBtn T={T} small icon="octagon-x">Stop</OutBtn></div>} />
    <PMain>
      <LifeHead T={T} o={o} />
      <div style={{ display: 'grid', gap: 10, marginTop: 10 }}>{o.jobs.map((j, i) => <JobPanel key={j.proc} T={T} o={o} j={j} i={i} open={j.proc === 'Embroidery'} primary={j.proc === 'Embroidery' ? 'receive' : null} />)}</div>
    </PMain>
  </PShell>;
}
/* W14b · assign a karigar to a locked job */
function AssignPane({ T }) {
  const cands = [['k3', 'Latkan only · 2 jobs · free from 10/09', true], ['k2', 'Embroidery + Latkan · 6 jobs · capacity risk', false]];
  return <PPane style={{ padding: '10px 12px 12px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><DesignChip T={T} code="2798" /><Meta T={T}>PO-1187 · 3 · Latkan · 27 pcs ready now, 58 to come</Meta></div>
    <PrLab T={T} style={{ marginTop: 10 }}>Karigars with the skill · by reliability</PrLab>
    {cands.map(([id, why, on]) => { const k = prK(id); return <div key={id} className="press" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 12, background: on ? T.accentSoft : 'transparent', border: `1px solid ${on ? T.accentLine : T.line}`, marginTop: 6 }}><span style={{ width: 28, height: 28, borderRadius: 8, background: T.ink, color: T.bg, display: 'grid', placeItems: 'center', fontFamily: T.fontDisplay, fontSize: 12, fontWeight: 600 }}>{k.name.split(' ').slice(0, 2).map(w => w[0]).join('')}</span><span style={{ flex: 1, minWidth: 0, fontFamily: T.fontUI, fontSize: 12.5 }}>{k.name}<Meta T={T} style={{ display: 'block' }}>{why}</Meta></span><span style={{ fontFamily: T.fontUI, fontSize: 12, fontWeight: 600, color: k.score >= 70 ? T.ok : T.warn }}>{k.score}</span><Meta T={T}>{k.onTime} %</Meta></div>; })}
    <div style={{ display: 'flex', gap: 8, marginTop: 10 }}><Field T={T} label={<span>Rate ₹/pc<Lock T={T} /></span>} value="₹60 · last paid ₹55" small /><Field T={T} label="Unit" value="pc" caret small w={70} /></div>
    <PrLab T={T} style={{ marginTop: 10 }}>Tranches · pieces and dates · order ends 20/09</PrLab>
    <div style={{ borderRadius: 12, border: `1px solid ${T.line}`, overflow: 'hidden' }}>{[[27, '12/09/26', 'ready now'], [26, '16/09/26', 'after Embroidery tranche 2'], [32, '20/09/26', 'order end']].map(([q, d, w], i) => <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', borderTop: i ? `1px solid ${T.line}` : 0, fontFamily: T.fontUI, fontSize: 12 }}><Meta T={T}>T{i + 1}</Meta><span style={{ width: 54, height: 28, borderRadius: 8, border: `1px solid ${T.line2}`, display: 'grid', placeItems: 'center', fontWeight: 600 }}>{q}</span><span style={{ width: 84, height: 28, borderRadius: 8, border: `1px solid ${T.line2}`, display: 'grid', placeItems: 'center' }}>{d.slice(0, 5)}</span><Meta T={T} style={{ flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{w}</Meta></div>)}</div>
    <Field T={T} label="Note to the karigar" ph="e.g. small latkans, match the Sky sample" small style={{ marginTop: 8 }} />
    <div style={{ marginTop: 8, padding: '8px 10px', borderRadius: 12, background: T.chipBg, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2 }}>On assign: the job turns <b>Ready to issue</b> for 27 pcs, a job card is created, the karigar gets a WhatsApp with the photo and the tranches.</div>
    <span style={{ flex: 1 }} />
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><OutBtn T={T} small icon="message-circle">Ask availability</OutBtn><span style={{ flex: 1 }} /><T.Btn small icon="user-plus" style={{ height: 34 }}>Assign Imtiaz · unlock</T.Btn></div>
  </PPane>;
}
function WebPAssign({ T }) {
  const o = prOrder('PO-1187');
  return <PShell T={T} section="Production orders" active="Orders" crumb={['Production', 'Orders', 'PO-1187', 'Assign · Latkan']} tab="PO-1187 · 2798" paneTitle="Assign karigar · Latkan" pane={<AssignPane T={T} />} paneWidth={340}>
    <LifeTabs T={T} o={o} right={<Meta T={T}>4 d idle · 27 pcs waiting on the floor</Meta>} />
    <PMain>
      <LifeHead T={T} o={o} compact active="Latkan" />
      <div style={{ display: 'grid', gap: 10, marginTop: 10 }}>{o.jobs.map((j, i) => <JobPanel key={j.proc} T={T} o={o} j={j} i={i} open={j.proc === 'Latkan'} brief primary={null} />)}</div>
    </PMain>
  </PShell>;
}
function IssuePane({ T, byMaterial }) {
  const j = PR_JOBS.find(x => x.id === 'PO-1187-J2'); const rows = prInputs(j, 'Purple', 25);
  return <PPane style={{ padding: '10px 12px 12px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><InOut T={T} t="issue" /><span style={{ fontFamily: T.fontUI, fontSize: 12.5, fontWeight: 600 }}>Embroidery · Saleem Creation</span><span style={{ flex: 1 }} /><Meta T={T}>MI-00216 · auto</Meta></div>
    <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>{['By pieces', 'By material'].map((t, i) => <T.Chip key={t} on={byMaterial ? i === 1 : i === 0} outline={byMaterial ? i !== 1 : i !== 0} style={{ height: 28 }}>{t}</T.Chip>)}<span style={{ flex: 1 }} /><Meta T={T}>{byMaterial ? 'lines typed by hand' : 'lines from the averages'}</Meta></div>
    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}><Field T={T} label="Colour" value={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Dot n="Purple" />Purple · 25</span>} caret small />{byMaterial ? <Field T={T} label="Counts as pieces" value="10 · from Mono net" small w={130} /> : <Field T={T} label="Pieces to issue for" value="10" small w={110} />}</div>
    <Meta T={T} style={{ display: 'block', margin: '6px 2px 0', whiteSpace: 'normal', lineHeight: 1.35 }}>issued for 12 · received 12 · balance 13 · WIP in hand 13 (Touching sent 25, 12 issued on)</Meta>
    <div style={{ marginTop: 8, borderRadius: 12, border: `1px solid ${T.line}`, overflow: 'hidden' }}>{rows.map((r, i) => { const q = +(r.avg * 10).toFixed(1); const short = r.out || r.stock < q; return <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 8px', borderTop: i ? `1px solid ${T.line}` : 0 }}>{r.m ? <Swatch m={r.m} w={30} h={36} r={7} /> : <span style={{ width: 30, height: 36, borderRadius: 7, background: T.chipBg, display: 'grid', placeItems: 'center' }}><Ic name="layers" size={13} color={T.ink2} /></span>}<Thumb T={T} d={j.d} w={26} h={32} r={7} /><span style={{ flex: 1, minWidth: 0, fontFamily: T.fontUI, fontSize: 12 }}><div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 500 }}>{r.name}</div><Meta T={T} style={{ color: short ? T.danger : T.ink3 }}>{r.avg} {r.unit}/pc · {r.stock} {r.unit} in hand{short ? ' · short' : ` · bal after ${+(r.stock - q).toFixed(1)}`}</Meta></span><span style={{ width: 60, height: 30, borderRadius: 8, border: `1px solid ${short ? T.danger : byMaterial ? T.accentLine : T.line2}`, display: 'grid', placeItems: 'center', fontFamily: T.fontUI, fontSize: 12, fontWeight: 600 }}>{q} {r.unit}</span></div>; })}{byMaterial && <div style={{ padding: '6px 8px', borderTop: `1px solid ${T.line}` }}><OutBtn T={T} small icon="plus" style={{ height: 26, fontSize: 11 }}>Add a material · any from the catalogue</OutBtn></div>}</div>
    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}><Field T={T} label="Material centre" value="Main godown" caret small /><Field T={T} label="Remarks" ph="short issue, balance to follow" small /></div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2 }}><Ic name="image" size={13} color={T.ink3} />every line prints with the material and the product photo · the karigar's material balance rises by each line</div>
    <span style={{ flex: 1 }} />
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><GateToken T={T} n="GT-260908-028" /><span style={{ flex: 1 }} /><T.Btn small icon="arrow-up-right" style={{ height: 34 }}>Issue · sticker</T.Btn></div>
  </PPane>;
}
function WebPIssue({ T }) {
  const o = prOrder('PO-1187');
  return <PShell T={T} section="Production orders" active="Orders" crumb={['Production', 'Orders', 'PO-1187', 'Issue · Embroidery']} tab="PO-1187 · 2798" paneTitle="Issue · Embroidery" pane={<IssuePane T={T} />} paneWidth={340}>
    <LifeTabs T={T} o={o} right={<Meta T={T}>issue in progress · Purple</Meta>} />
    <PMain>
      <LifeHead T={T} o={o} compact />
      <div style={{ display: 'grid', gap: 10, marginTop: 10 }}>{o.jobs.slice(0, 3).map((j, i) => <JobPanel key={j.proc} T={T} o={o} j={j} i={i} open={j.proc === 'Embroidery'} colour="Purple" brief primary={null} />)}</div>
    </PMain>
  </PShell>;
}
/* W15b · issue on a Direct-book order (Ready production): the order goes out, finished pieces come in */
function WebPIssueDirect({ T }) {
  const o = prOrder('PO-1163');
  return <PShell T={T} section="Production orders" active="Orders" crumb={['Production', 'Orders', 'PO-1163', 'Issue · Ready production']} tab="PO-1163 · 1457" paneTitle="Issue · Ready production" pane={<PPane style={{ padding: '10px 12px 12px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><InOut T={T} t="issue" /><span style={{ fontFamily: T.fontUI, fontSize: 12.5, fontWeight: 600 }}>Ready production · Gulzar Ready Garments</span><span style={{ flex: 1 }} /><Meta T={T}>MI-00217</Meta></div>
    <div style={{ marginTop: 10, padding: '10px 12px', borderRadius: 14, background: T.surface2, border: `1px solid ${T.line}`, fontFamily: T.fontUI, fontSize: 12, color: T.ink2 }}><b style={{ color: T.ink }}>Direct book.</b> No material leaves the godown. This issue records the order given to the karigar; the receive counts the finished pieces and creates finished-good stock.</div>
    <PrLab T={T} style={{ marginTop: 12 }}>Pieces ordered · tranche 3</PrLab>
    {[['Firozi', 40, 16], ['Bottle', 20, 8]].map(([c, ord, now]) => <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderTop: `1px solid ${T.line}` }}><Thumb T={T} d={PR_D('1457')} w={26} h={32} r={7} /><Dot n={c} /><span style={{ flex: 1, fontFamily: T.fontUI, fontSize: 12.5 }}>{c}<Meta T={T} style={{ marginLeft: 6 }}>{ord} ordered · {c === 'Firozi' ? 15 : 7} back</Meta></span><T.Step v={now} /></div>)}
    <div style={{ display: 'flex', gap: 8, marginTop: 10 }}><Field T={T} label={<span>Rate ₹/pc<Lock T={T} /></span>} value="₹900" small /><Field T={T} label="Due" value="30/08/26 · 19 d late" small tone="danger" /><Field T={T} label="Fabric" value="karigar's own" caret small /></div>
    <div style={{ marginTop: 8, padding: '8px 10px', borderRadius: 12, background: T.chipBg, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2 }}>Score effect: this tranche is already late · reminder sent 06/09 · 2 reminders in 30 d lowers the karigar score</div>
    <span style={{ flex: 1 }} />
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Meta T={T}>no gate token · nothing leaves</Meta><span style={{ flex: 1 }} /><T.Btn small icon="arrow-up-right" style={{ height: 34 }}>Record order</T.Btn></div>
  </PPane>} paneWidth={340}>
    <ViewTabs T={T} tabs={LIFE_TABS(o)} active="Lifecycle" back="Orders" eyebrow={<Eyebrow>PO-1163 · Direct</Eyebrow>} right={<Meta T={T}>1 process · the karigar makes the whole piece</Meta>} />
    <PMain>
      <LifeHead T={T} o={o} compact active="Ready production" />
      <div style={{ display: 'grid', gap: 10, marginTop: 10 }}><JobPanel T={T} o={o} j={o.jobs[0]} i={0} open colour="Firozi" brief direct primary={null} /></div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2 }}><Ic name="info" size={13} color={T.ink3} />Ready production is a normal process in Process setting with an empty BOM, so Direct designs still get a recipe, a job card and a karigar score.</div>
    </PMain>
  </PShell>;
}
function ReceivePane({ T }) {
  return <PPane style={{ padding: '10px 12px 12px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><InOut T={T} t="receive" /><span style={{ fontFamily: T.fontUI, fontSize: 12.5, fontWeight: 600 }}>Embroidery · Saleem Creation</span><span style={{ flex: 1 }} /><Meta T={T}>MR-00120 · auto</Meta></div>
    <div style={{ display: 'flex', gap: 8, marginTop: 10 }}><Field T={T} label="Settles" value="Tranche 2 · 12/09 · 26 pcs" caret small /><Field T={T} label="Brought by" value="Karigar" caret small w={110} /></div>
    <PrLab T={T} style={{ marginTop: 12 }}>Pieces by colour · lands as the WIP</PrLab>
    {[['Sky', 20, 15, 5], ['Purple', 25, 12, 10], ['Peach', 40, 0, 3]].map(([c, ord, got, now]) => <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderTop: `1px solid ${T.line}` }}><Thumb T={T} d={PR_D('2798')} w={26} h={32} r={7} /><Dot n={c} /><span style={{ flex: 1, fontFamily: T.fontUI, fontSize: 12.5 }}>{c}<Meta T={T} style={{ marginLeft: 6 }}>{got} of {ord} back{c === 'Peach' ? ' · 0 issued' : ''}</Meta></span><T.Step v={now} /></div>)}
    <div style={{ display: 'flex', gap: 8, marginTop: 10 }}><Field T={T} label="Rejected · rework" value="1" small /><Field T={T} label="Process loss" value="0" small /><Field T={T} label="Excess" value="3 · Peach" small tone="danger" /></div>
    <div style={{ marginTop: 8, padding: '8px 10px', borderRadius: 12, background: T.warn + '1F', border: `1px solid ${T.warn}55`, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink }}><b>Over-receive.</b> 3 Peach pieces were never issued. They are counted and flagged; the PM verifies before they move on. Material balance with the karigar is not reduced for them.</div>
    <div style={{ marginTop: 8, padding: '8px 10px', borderRadius: 12, background: T.surface2, border: `1px solid ${T.line}`, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2 }}><div style={{ fontWeight: 600, color: T.ink }}>Lands as wip_emb_2798 · Sky 5 · Purple 10 · Peach 3 (held)</div>Latkan gains 15 pcs Ready once a karigar is assigned · the rejected piece goes back as rework · karigar due +15 × ₹200 = ₹3,000<Lock T={T} /></div>
    <span style={{ flex: 1 }} />
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><GateToken T={T} n="GT-260908-021" /><span style={{ flex: 1 }} /><T.Btn small icon="arrow-down-left" style={{ height: 34 }}>Receive 18 · sticker</T.Btn></div>
  </PPane>;
}
function WebPReceive({ T }) {
  const o = prOrder('PO-1187');
  return <PShell T={T} section="Production orders" active="Orders" crumb={['Production', 'Orders', 'PO-1187', 'Receive · Embroidery']} tab="PO-1187 · 2798" paneTitle="Receive · Embroidery" pane={<ReceivePane T={T} />} paneWidth={340}>
    <LifeTabs T={T} o={o} right={<Meta T={T}>receive in progress · 3 colours</Meta>} />
    <PMain>
      <LifeHead T={T} o={o} compact />
      <div style={{ display: 'grid', gap: 10, marginTop: 10 }}>{o.jobs.slice(0, 3).map((j, i) => <JobPanel key={j.proc} T={T} o={o} j={j} i={i} open={j.proc === 'Embroidery'} colour="Purple" brief primary={null} />)}</div>
    </PMain>
  </PShell>;
}
/* W16b · receive at the last process: finished goods, verification, stock to the destination firm */
function WebPReceiveFG({ T }) {
  const o = prOrder('PO-1174');
  return <PShell T={T} section="Production orders" active="Orders" crumb={['Production', 'Orders', 'PO-1174', 'Receive · Stitching · finished goods']} tab="PO-1174 · 3661" paneTitle="Receive · finished goods" pane={<PPane style={{ padding: '10px 12px 12px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><InOut T={T} t="receive" /><span style={{ fontFamily: T.fontUI, fontSize: 12.5, fontWeight: 600 }}>Stitching · Noor Tailors</span><Pill T={T} tone="accent" small>Final</Pill><span style={{ flex: 1 }} /><Meta T={T}>MR-00122</Meta></div>
    <Field T={T} label="Settles" value="Tranche 3 · 12/09 · 24 pcs · 10 back so far" caret small style={{ marginTop: 10 }} />
    <PrLab T={T} style={{ marginTop: 12 }}>Finished pieces by colour</PrLab>
    {[['Peach', 30, 24, 6], ['Pista', 30, 22, 8]].map(([c, ord, got, now]) => <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderTop: `1px solid ${T.line}` }}><Thumb T={T} d={PR_D('3661')} w={26} h={32} r={7} /><Dot n={c} /><span style={{ flex: 1, fontFamily: T.fontUI, fontSize: 12.5 }}>{c}<Meta T={T} style={{ marginLeft: 6 }}>{got} of {ord} back</Meta></span><T.Step v={now} /></div>)}
    <div style={{ display: 'flex', gap: 8, marginTop: 10 }}><Field T={T} label="QC rejected · rework" value="0" small /><Field T={T} label="Loss" value="0" small /><Field T={T} label="Checked by" value="Priya S · QC" caret small /></div>
    <div style={{ marginTop: 8, padding: '8px 10px', borderRadius: 12, background: T.surface2, border: `1px solid ${T.line}`, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2 }}><div style={{ fontWeight: 600, color: T.ink }}>Lands as 3661 finished goods · Peach 6 · Pista 8 · unverified</div>The PM verifies finished goods; verified pieces enter Dispatch stock. Destination is Radhika Collection, so a stock transfer note (Channels) is drafted on verify.</div>
    <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2 }}><Ic name="camera" size={13} color={T.ink3} />photo of the lot · barcode labels print per piece · karigar due +14 × ₹180<Lock T={T} /></div>
    <span style={{ flex: 1 }} />
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><GateToken T={T} n="GT-260908-031" /><span style={{ flex: 1 }} /><T.Btn small icon="package-check" style={{ height: 34 }}>Receive 14 · labels</T.Btn></div>
  </PPane>} paneWidth={340}>
    <ViewTabs T={T} tabs={LIFE_TABS(o)} active="Lifecycle" back="Orders" eyebrow={<Eyebrow>PO-1174 · 3661</Eyebrow>} right={<Meta T={T}>46 of 60 verified · order closes when all 60 are in</Meta>} />
    <PMain>
      <LifeHead T={T} o={o} compact active="Stitching" />
      <div style={{ display: 'grid', gap: 10, marginTop: 10 }}>{o.jobs.map((j, i) => <JobPanel key={j.proc} T={T} o={o} j={j} i={i} open={j.proc === 'Stitching'} colour="Peach" brief primary={null} />)}</div>
    </PMain>
  </PShell>;
}
/* ── W17 · Print: job card A4 and challan stickers ── */
function JobCardA4({ T, w = 540 }) {
  const o = prOrder('PO-1187'); const ink = '#241712';
  const S = ({ children, style }) => <div style={{ fontFamily: '"Jost", sans-serif', fontSize: 10.5, color: ink, ...style }}>{children}</div>;
  return <div style={{ width: w, background: '#fff', color: ink, padding: 26, boxSizing: 'border-box', boxShadow: '0 30px 60px -30px rgba(0,0,0,.5)', borderRadius: 4 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderBottom: `2px solid ${ink}`, paddingBottom: 10 }}><img src={XD.A + 'clients/srs-logo.png'} style={{ height: 26 }} /><span style={{ flex: 1 }} /><S style={{ textAlign: 'right' }}><div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 20, fontWeight: 600 }}>Job card</div><div>PO-1187-J2 · Embroidery · issued 26/08/26</div></S><div style={{ width: 64, height: 64, background: `repeating-linear-gradient(0deg, ${ink} 0 2px, #fff 2px 4px), repeating-linear-gradient(90deg, ${ink} 0 2px, #fff 2px 4px)`, backgroundBlendMode: 'multiply', opacity: .85 }} /></div>
    <div style={{ display: 'flex', gap: 14, marginTop: 12 }}><img src={PR_D('2798').src} style={{ width: 84, height: 105, objectFit: 'cover', borderRadius: 6 }} /><S style={{ flex: 1 }}><div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 30, fontWeight: 600, lineHeight: 1 }}>2798</div><div style={{ marginTop: 4 }}>Plazo set · Sky 20 · Purple 25 · Peach 40 · 85 pcs</div><div style={{ marginTop: 6, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px 12px' }}><span>Karigar · <b>Saleem Creation</b></span><span>Rate · <b>₹200 / pc</b> (money roles only)</span><span>Due · 26/08 · 12/09 · 20/09</span><span>Tranches · 26 · 26 · 33 pcs</span><span>Recipe v2 · frozen</span><span>Gate · GT-260826-031</span></div></S></div>
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12, fontFamily: '"Jost", sans-serif', fontSize: 10 }}><thead><tr>{['Input', 'Colour', 'Avg', 'Required', 'Issued', 'Balance', 'Received back'].map(h => <th key={h} style={{ textAlign: 'left', borderBottom: `1px solid ${ink}`, padding: '4px 4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.05em', fontSize: 8.5 }}>{h}</th>)}</tr></thead><tbody>{[['Mono net · C04', 'Sky', '0.5 m', '10 m', '10 m', '0', ''], ['Mono net · C09', 'Purple', '0.5 m', '12.5 m', '12.5 m', '0', ''], ['Mono net · Mono', 'Peach', '0.5 m', '20 m', '0', '20 m', ''], ['Zari thread', 'all', '0.04 kg', '3.4 kg', '1.8 kg', '1.6 kg', ''], ['wip_touch_2798', 'all', '1 pc', '85', '45', '40', '27 pcs']].map((r, i) => <tr key={i}>{r.map((c, k) => <td key={k} style={{ padding: '5px 4px', borderBottom: '1px solid #ddd' }}>{c}</td>)}</tr>)}</tbody></table>
    <div style={{ display: 'flex', gap: 14, marginTop: 12 }}>{['Sticker area · issue 1', 'Sticker area · issue 2', 'Sticker area · receive'].map(s => <div key={s} style={{ flex: 1, height: 64, border: '1px dashed #999', borderRadius: 4, display: 'grid', placeItems: 'center', fontFamily: '"Jost", sans-serif', fontSize: 9, color: '#888' }}>{s}</div>)}</div>
  </div>;
}
function Sticker({ T, w = 250, kind = 'out' }) {
  const ink = '#241712'; const out = kind === 'out';
  return <div style={{ width: w, height: Math.round(w * .75), background: '#fff', color: ink, padding: 12, boxSizing: 'border-box', boxShadow: '0 30px 60px -30px rgba(0,0,0,.5)', borderRadius: 4, fontFamily: '"Jost", sans-serif', fontSize: 9.5, display: 'flex', flexDirection: 'column' }}>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}><span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 18, fontWeight: 600 }}>2798</span><span>PO-1187 · Embroidery</span><span style={{ flex: 1 }} /><b>{out ? 'MI-00216 · OUT' : 'MR-00120 · IN'}</b></div>
    <div style={{ display: 'flex', gap: 6, marginTop: 3 }}><span>Saleem Creation</span><span>·</span><span>{out ? 'Purple · for 10 pcs' : 'Sky 5 · Purple 10 · Peach 3'}</span><span style={{ flex: 1 }} /><span>08/09/26</span></div>
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 6, fontSize: 9 }}><tbody>{(out ? [['Mono net · C09 Purple', '5 m', 'bal 7.5 m'], ['Zari thread · Gold', '0.4 kg', 'bal 1.2 kg'], ['wip_touch_2798_purple', '10 pc', 'bal 3 pc']] : [['wip_emb_2798 · received', '18 pc', 'of 45'], ['rejected · rework', '1 pc', ''], ['excess · held', '3 pc', 'PM verify']]).map((r, i) => <tr key={i}>{r.map((c, k) => <td key={k} style={{ padding: '2px 2px', borderTop: '1px solid #ddd', textAlign: k ? 'right' : 'left' }}>{c}</td>)}</tr>)}</tbody></table>
    <span style={{ flex: 1 }} />
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}><span style={{ fontSize: 8.5 }}>{out ? 'issued for 22 of 25 · balance 3 pcs' : 'received 45 of 85 · tranche 2 settled'}<br />gate {out ? 'GT-260908-028' : 'GT-260908-021'}</span><span style={{ flex: 1 }} /><span style={{ width: 36, height: 36, background: `repeating-linear-gradient(0deg, ${ink} 0 2px, #fff 2px 4px), repeating-linear-gradient(90deg, ${ink} 0 2px, #fff 2px 4px)`, backgroundBlendMode: 'multiply', opacity: .85 }} /></div>
  </div>;
}
function WebPPrint({ T }) {
  return <PShell T={T} section="Production orders" active="Orders" crumb={['Production', 'Orders', 'PO-1187', 'Print']} tab="Print · PO-1187-J2" paneTitle="Print" paneWidth={300} pane={<PPane><Meta T={T}>A4 job card once per job · a sticker on every issue and receive · re-print any earlier challan</Meta><div style={{ marginTop: 10, display: 'grid', gap: 8 }}><OutBtn T={T} icon="printer" style={{ justifyContent: 'center' }}>Job card · A4</OutBtn><OutBtn T={T} icon="printer" style={{ justifyContent: 'center' }}>Issue sticker · 3 × 4 in</OutBtn><OutBtn T={T} icon="printer" style={{ justifyContent: 'center' }}>Receive sticker · 3 × 4 in</OutBtn><OutBtn T={T} icon="history" style={{ justifyContent: 'center' }}>Re-print an earlier challan</OutBtn></div><Field T={T} label="Copies" value="Floor copy · no rate" caret small style={{ marginTop: 10 }} /><span style={{ flex: 1 }} /><div style={{ padding: '8px 10px', borderRadius: 12, background: T.chipBg, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2 }}>The rate prints only on the money-roles copy; the floor copy and every sticker print without it.</div><T.Btn small icon="printer" style={{ height: 34, marginTop: 8, justifyContent: 'center' }}>Print 3 pages</T.Btn></PPane>}>
    <PMain style={{ background: T.bg2 }}><div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', justifyContent: 'center', paddingTop: 10 }}><JobCardA4 T={T} /><div style={{ display: 'grid', gap: 18 }}><div><Sticker T={T} kind="out" /><Meta T={T} style={{ display: 'block', marginTop: 6, textAlign: 'center' }}>issue sticker</Meta></div><div><Sticker T={T} kind="in" /><Meta T={T} style={{ display: 'block', marginTop: 6, textAlign: 'center' }}>receive sticker · pasted on the job card</Meta></div></div></div></PMain>
  </PShell>;
}

/* ── W18–W22 · Job cards ── */
const JC_SCOPES = [['Active', 61], ['Delayed', 7], ['Upcoming', 9], ['Stuck', 3], ['Unassigned', 11], ['Finished', 212]];
const JC_VIEWS = [['Cards', 'layout-grid'], ['Swimlanes', 'kanban'], ['Table', 'table-2'], ['Gantt', 'gantt-chart'], ['Calendar', 'calendar']];
function JCBar({ T, view, right, scope = 'Active', filtersOn }) {
  return <><ViewTabs T={T} tabs={JC_SCOPES} active={scope} right={<PTabs T={T} tabs={JC_VIEWS} on={view} iconOnly />} />
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 24px 0', overflow: 'hidden' }}><T.Chip icon="search" outline>Job, design, karigar</T.Chip><Caret T={T}>Urgency</Caret><Caret T={T}>Group · karigar</Caret>{['Ready to issue', 'Waiting on floor', 'Tranche due today'].map((c, i) => <T.Chip key={c} on={i === 0} outline={i !== 0} x={i === 0}>{c}</T.Chip>)}<T.Chip icon="sliders-horizontal" on={filtersOn} outline={!filtersOn}>All filters{filtersOn ? ' · 3' : ''}</T.Chip><Caret T={T}><Ic name="bookmark" size={12} />Urgent today</Caret><span style={{ flex: 1 }} />{right}</div></>;
}
function WebPJobCards({ T }) {
  const jobs = PR_JOBS.filter(j => j.state !== 'Finished');
  return <PShell T={T} section="Job cards" active="Job cards" crumb={['Production', 'Job cards', 'Active', 'Cards']} paneTitle="PO-1187 · lifecycle" pane={<LifecyclePane T={T} o={prOrder('PO-1187')} />} paneWidth={300}>
    <JCBar T={T} view="Cards" right={<Meta T={T}>61 jobs · 18 urgent · 483 pcs pending</Meta>} />
    <PMain>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 12 }}>{jobs.slice(0, 8).map((j, i) => <JobCard key={j.id} T={T} j={j} w="100%" compact on={i === 0} />)}</div>
    </PMain>
  </PShell>;
}
/* W18b · the filters drawer: every dimension the BRD names, saved views */
function FiltersPane({ T }) {
  const G = ({ title, items, on = [], right }) => <div style={{ marginTop: 10 }}><PrLab T={T} right={right}>{title}</PrLab><div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>{items.map(c => <T.Chip key={c} on={on.includes(c)} outline={!on.includes(c)} style={{ height: 26, fontSize: 11 }}>{c}</T.Chip>)}</div></div>;
  return <PPane style={{ padding: '8px 12px 12px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Caret T={T} on><Ic name="bookmark" size={12} />Urgent today</Caret><OutBtn T={T} small icon="save" style={{ height: 30 }}>Save as view</OutBtn><span style={{ flex: 1 }} /><span className="press" style={{ fontFamily: T.fontUI, fontSize: 11.5, color: T.accent }}>Clear 3</span></div>
    <G title="Journey state" items={['Unassigned', 'Ready to issue', 'At karigar', 'Waiting on floor', 'Waiting previous', 'Stuck', 'Rework', 'Finished']} on={['Ready to issue', 'Waiting on floor']} />
    <G title="Process" items={PR_SEQ_PROC.slice(0, 7).map(p => p[0])} />
    <G title="Karigar" items={['Saleem Creation', 'Noor Tailors', 'Imtiaz Latkan', '+ 24']} />
    <G title="Design · category" items={['2798', '3661', '6002', 'Lehenga', 'Saree', 'Blouse']} right={<Meta T={T}>type a number</Meta>} />
    <G title="Due window" items={['Overdue', 'Today', 'This week', 'Next week', 'Custom…']} on={['Today']} />
    <G title="Order reason" items={['Restock', 'Priority production', 'Customer shortage', 'High growth', 'By hand']} />
    <G title="Tranche · idle" items={['Missed one', 'All met', 'idle > 2 d', 'idle > 5 d']} />
    <span style={{ flex: 1 }} />
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Meta T={T}>18 jobs match</Meta><span style={{ flex: 1 }} /><T.Btn small icon="check" style={{ height: 34 }}>Apply</T.Btn></div>
  </PPane>;
}
function WebPJobFilters({ T }) {
  const jobs = PR_JOBS.filter(j => ['Ready to issue', 'Waiting on floor'].includes(j.state) || j.next === '12/09/26'); const rest = PR_JOBS.filter(j => j.state === 'At karigar' && !jobs.includes(j));
  return <PShell T={T} section="Job cards" active="Job cards" crumb={['Production', 'Job cards', 'Active', 'Cards', 'Filters']} paneTitle="All filters" pane={<FiltersPane T={T} />} paneWidth={320}>
    <JCBar T={T} view="Cards" filtersOn right={<Meta T={T}>18 of 61 · live as you tick</Meta>} />
    <PMain>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 12 }}>{[...jobs, ...rest].slice(0, 8).map((j, i) => <JobCard key={j.id} T={T} j={j} w="100%" compact />)}</div>
    </PMain>
  </PShell>;
}
function WebPSwimlanes({ T }) {
  const cols = [['Unassigned', ['Unassigned']], ['Ready to issue', ['Ready to issue']], ['At karigar', ['At karigar']], ['Waiting · stuck', ['Stuck', 'Waiting previous', 'Waiting on floor']], ['Finished', ['Finished']]];
  return <PShell T={T} section="Job cards" active="Job cards" crumb={['Production', 'Job cards', 'Active', 'Swimlanes']} paneTitle="PO-1192 · lifecycle" pane={<LifecyclePane T={T} o={prOrder('PO-1192')} />} paneWidth={290}>
    <JCBar T={T} view="Swimlanes" right={<Meta T={T}>columns = journey state · drag a card to reassign or issue</Meta>} />
    <PMain pad="12px 24px 12px">
      <div style={{ display: 'flex', gap: 10, height: '100%', overflow: 'hidden' }}>{cols.map(([name, st]) => { const list = PR_JOBS.filter(j => st.includes(j.state)); return <div key={name} style={{ flex: 1, minWidth: 0, borderRadius: 16, background: T.bg2, padding: 8, display: 'flex', flexDirection: 'column', gap: 8, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '2px 4px' }}><span style={{ width: 8, height: 8, borderRadius: 4, background: name === 'Finished' ? T.ok : name.startsWith('Waiting') ? T.danger : name === 'Unassigned' ? T.line2 : T.blue }} /><span style={{ fontFamily: T.fontUI, fontSize: 12, fontWeight: 600 }}>{name}</span><span style={{ fontFamily: T.fontUI, fontSize: 11, color: T.ink3 }}>{list.length} · {list.reduce((s, j) => s + j.planned - j.recd, 0)} pcs</span><span style={{ flex: 1 }} /><Ic name="ellipsis" size={14} color={T.ink3} /></div>
        {list.slice(0, 3).map(j => <div key={j.id} className="press" style={{ display: 'flex', gap: 8, padding: 8, borderRadius: 12, background: T.surface, border: `1px solid ${T.line}` }}><Thumb T={T} d={j.d} w={36} h={44} r={8} /><span style={{ flex: 1, minWidth: 0 }}><div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}><Num T={T} size={15}>{j.code}</Num><Meta T={T}>{j.proc}</Meta></div><Meta T={T} style={{ display: 'block', marginTop: 2 }}>{j.karigar ? j.karigar.name.split(' ')[0] : 'no karigar'} · {j.recd}/{j.planned}{j.short ? ' · ' + j.short.split(' · ')[0] : ''}</Meta><div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}><Pips T={T} tr={j.tr} size={6} />{j.next && j.state !== 'Finished' && <span style={{ fontFamily: T.fontUI, fontSize: 10, fontWeight: 600, color: j.late ? T.danger : T.ink3 }}>{j.late ? `${j.late} d late` : j.next.slice(0, 5)}</span>}{j.idle && <span style={{ fontFamily: T.fontUI, fontSize: 10, color: T.warn, fontWeight: 600 }}>idle {j.idle} d</span>}</div></span></div>)}
        {list.length > 3 && <Meta T={T} style={{ textAlign: 'center' }}>+{list.length - 3} more</Meta>}
        {list.length === 0 && <Meta T={T} style={{ textAlign: 'center', padding: 12 }}>nothing here</Meta>}
      </div>; })}</div>
    </PMain>
  </PShell>;
}
function WebPJobTable({ T }) {
  const cols = [['Job', 84, j => <Mono T={T} size={11.5}>{j.id}</Mono>, 'node'], ['Design', 96, j => <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Thumb T={T} d={j.d} w={22} h={28} r={6} /><b>{j.code}</b></span>, 'node'], ['Process', null, j => j.proc], ['Karigar', 120, j => j.karigar ? j.karigar.name : <Meta T={T}>—</Meta>], ['State', 118, j => <JobChip T={T} s={j.state} small />, 'node'], ['Planned', 56, j => j.planned, 'num'], ['Issued', 52, j => j.issued, 'num'], ['Recd', 48, j => j.recd, 'num'], ['Bal', 44, j => j.planned - j.recd, 'num'], ['Tranches', 64, j => <Pips T={T} tr={j.tr} />, 'node'], ['Next due', 66, j => j.next ? j.next.slice(0, 5) : '—'], ['To due', 54, j => j.late ? <span style={{ color: T.danger }}>−{j.late}</span> : j.next ? prDays(j.next) : '—', 'num'], ['Idle', 44, j => j.idle ? `${j.idle} d` : j.state === 'Unassigned' ? '11 d' : '—'], ['End', 60, j => j.o.end.slice(0, 5)]];
  return <PShell T={T} section="Job cards" active="Job cards" crumb={['Production', 'Job cards', 'Active', 'Table']} paneTitle="PO-1187 · lifecycle" pane={<LifecyclePane T={T} o={prOrder('PO-1187')} />} paneCollapsed>
    <JCBar T={T} view="Table" right={<div style={{ display: 'flex', gap: 6 }}><T.Chip icon="columns-3" outline>Columns · 14 of 26</T.Chip><T.Chip icon="download" outline>Export</T.Chip></div>} />
    <PMain><PCard T={T} style={{ padding: 0, overflow: 'hidden' }}><Tbl T={T} dense onRow={0} cols={cols.map(c => [c[0], c[1], c[3] === 'num' ? 'right' : 'left'])} rows={PR_JOBS.filter(j => j.state !== 'Finished').map(j => cols.map(c => c[2](j)))} /><div style={{ display: 'flex', alignItems: 'center', padding: '8px 12px', borderTop: `1px solid ${T.line}` }}><Meta T={T}>10 of 61 jobs · 483 pcs pending · sorted by urgency · Hub › Production report has every column</Meta></div></PCard></PMain>
  </PShell>;
}
function WebPGantt({ T }) {
  const days = 42; const day0 = new Date(2026, 7, 10); const px = 22; const toX = s => { const [d, m, y] = s.split('/'); const dt = new Date(2000 + +y, +m - 1, +d); return Math.round((dt - day0) / 864e5) * px; };
  const today = toX('08/09/26');
  return <PShell T={T} section="Job cards" active="Job cards" crumb={['Production', 'Job cards', 'Active', 'Gantt']} paneTitle="PO-1187 · lifecycle" pane={<LifecyclePane T={T} o={prOrder('PO-1187')} />} paneWidth={290}>
    <JCBar T={T} view="Gantt" right={<PTabs T={T} tabs={['Week', 'Month']} on="Month" />} />
    <PMain>
      <div style={{ borderRadius: 16, border: `1px solid ${T.line}`, background: T.surface, overflow: 'hidden', display: 'flex' }}>
        <div style={{ width: 220, flex: 'none', borderRight: `1px solid ${T.line}` }}>
          <div style={{ height: 34, borderBottom: `1px solid ${T.line}`, padding: '0 12px', display: 'flex', alignItems: 'center', fontFamily: T.fontUI, fontSize: 10, letterSpacing: '.06em', textTransform: 'uppercase', color: T.ink3 }}>Order · job</div>
          {PR_ACTIVE.slice(0, 4).map(o => <React.Fragment key={o.no}><div style={{ height: 30, display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px', background: T.bg2, borderTop: `1px solid ${T.line}` }}><Thumb T={T} d={PR_D(o.code)} w={20} h={24} r={5} /><Num T={T} size={14}>{o.code}</Num><Mono T={T} size={10.5}>{o.no}</Mono></div>{o.jobs.map(j => <div key={j.proc} style={{ height: 30, display: 'flex', alignItems: 'center', gap: 6, padding: '0 12px 0 40px', borderTop: `1px solid ${T.line}`, fontFamily: T.fontUI, fontSize: 12 }}><span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{j.proc}</span><Meta T={T}>{j.k ? prK(j.k).name.split(' ')[0] : '—'}</Meta></div>)}</React.Fragment>)}
        </div>
        <div style={{ flex: 1, minWidth: 0, overflow: 'hidden', position: 'relative' }}>
          <div style={{ height: 34, borderBottom: `1px solid ${T.line}`, display: 'flex', position: 'relative' }}>{Array.from({ length: days }, (_, i) => { const d = new Date(day0.getTime() + i * 864e5); return <span key={i} style={{ width: px, flex: 'none', textAlign: 'center', fontFamily: T.fontUI, fontSize: 9.5, color: d.getDay() === 0 ? T.ink3 : T.ink2, borderLeft: d.getDate() === 1 ? `1px solid ${T.line2}` : 0, paddingTop: 10, boxSizing: 'border-box' }}>{d.getDate() === 1 || i === 0 ? <b style={{ display: 'block', fontSize: 9 }}>{['Aug', 'Sep', 'Oct'][d.getMonth() - 7]}</b> : null}{d.getDate()}</span>; })}</div>
          <div style={{ position: 'absolute', left: today + px / 2, top: 0, bottom: 0, width: 1.5, background: T.accent, zIndex: 2 }}><span style={{ position: 'absolute', top: 2, left: 4, fontFamily: T.fontUI, fontSize: 9, color: T.accent, fontWeight: 600 }}>today</span></div>
          {PR_ACTIVE.slice(0, 4).map(o => <React.Fragment key={o.no}><div style={{ height: 30, borderTop: `1px solid ${T.line}`, background: T.bg2, position: 'relative' }}><span style={{ position: 'absolute', left: toX(o.date), width: Math.max(px, toX(o.end) - toX(o.date)), top: 12, height: 6, borderRadius: 3, background: T.line2 }} /></div>{o.jobs.map((j, i) => { const start = j.tr ? toX(o.date) + (i === 0 ? 0 : px * 8) : null; const end = j.tr ? toX(j.tr[j.tr.length - 1][1]) : null; const c = j.state === 'Finished' ? T.ok : j.state === 'Stuck' ? T.danger : j.state === 'Waiting previous' ? T.line2 : T.blue; return <div key={j.proc} style={{ height: 30, borderTop: `1px solid ${T.line}`, position: 'relative' }}>{j.tr ? <><span style={{ position: 'absolute', left: start, width: Math.max(px, end - start + px), top: 8, height: 14, borderRadius: 7, background: c + '33', border: `1px solid ${c}66` }}><span style={{ display: 'block', width: `${Math.min(100, j.recd / prQty(o) * 100)}%`, height: '100%', borderRadius: 7, background: c }} /></span>{j.tr.map((t, k) => <span key={k} style={{ position: 'absolute', left: toX(t[1]) + px / 2 - 3, top: 10, width: 6, height: 10, borderRadius: 2, background: t[2] >= t[0] ? T.ok : toX(t[1]) < today ? T.danger : T.ink2 }} />)}{j.late && <span style={{ position: 'absolute', left: end + px, top: 9, fontFamily: T.fontUI, fontSize: 10, color: T.danger, fontWeight: 600, whiteSpace: 'nowrap' }}>{j.late} d late</span>}</> : <span style={{ position: 'absolute', left: toX(o.date) + px * 10, width: px * 8, top: 10, height: 10, borderRadius: 5, background: `repeating-linear-gradient(45deg, ${T.line2} 0 3px, transparent 3px 7px)` }} />}</div>; })}</React.Fragment>)}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 14, marginTop: 8, fontFamily: T.fontUI, fontSize: 11, color: T.ink2 }}>{[[T.blue, 'active · fill = received'], [T.ok, 'finished / tranche met'], [T.danger, 'stuck · tranche missed'], [T.line2, 'not started · unassigned (hatched)']].map(([c, l]) => <span key={l} style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><span style={{ width: 14, height: 8, borderRadius: 4, background: c }} />{l}</span>)}<span style={{ flex: 1 }} /><Meta T={T}>drag a bar end to move a tranche date · the karigar is told</Meta></div>
    </PMain>
  </PShell>;
}
function WebPCalendar({ T }) {
  const ev = { 10: [['3661', 'Stitching · 24 pcs', 'Noor']], 12: [['2798', 'Embroidery · 26', 'Saleem'], ['6002', 'dye lot DC-0034', 'Rafiq']], 14: [['2006', 'Embroidery · 14', 'Saleem']], 16: [['2798', 'Stitching · 26', 'Noor']], 20: [['2798', 'Embroidery · 33', 'Saleem'], ['2798', 'Stitching · 33', 'Noor']], 21: [['2006', 'Embroidery · 14', 'Saleem']], 30: [['2006', 'Embroidery · 20', 'Saleem']], 4: [['3661', 'Stitching · 18', 'Noor', true]], 8: [['1457', 'Ready prod · 24', 'Gulzar', true]] };
  return <PShell T={T} section="Job cards" active="Job cards" crumb={['Production', 'Job cards', 'Active', 'Calendar']} paneTitle="Fri 12 Sep · 2 tranches due" pane={<PPane><Meta T={T}>tranches and dye lots falling due on the picked day</Meta>{PR_JOBS.filter(j => j.next === '12/09/26').map(j => <div key={j.id} className="press" style={{ display: 'flex', gap: 10, marginTop: 10, padding: 8, borderRadius: 14, background: T.surface2, border: `1px solid ${T.line}` }}><Thumb T={T} d={j.d} w={44} h={54} r={10} /><span style={{ flex: 1, minWidth: 0 }}><div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}><Num T={T} size={17}>{j.code}</Num><Meta T={T}>{j.proc}</Meta></div><Meta T={T} style={{ display: 'block', marginTop: 2 }}>{j.karigar ? j.karigar.name : '—'} · {j.recd}/{j.planned}</Meta><div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 5 }}><JobChip T={T} s={j.state} small /><Pips T={T} tr={j.tr} /></div></span></div>)}<div className="press" style={{ display: 'flex', gap: 10, marginTop: 10, padding: 8, borderRadius: 14, background: T.surface2, border: `1px solid ${T.line}` }}><Swatch m={{ tex: 'net', shade: 'Lilac', dye: true }} w={44} h={54} r={10} /><span style={{ flex: 1, minWidth: 0 }}><div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}><Mono T={T}>DC-0034</Mono><Meta T={T}>dye lot</Meta></div><Meta T={T} style={{ display: 'block', marginTop: 2 }}>Rafiq Bhai · Mono net → C11 Lilac · 150 m · unblocks PO-1192</Meta></span></div><span style={{ flex: 1 }} /><OutBtn T={T} icon="message-circle" style={{ justifyContent: 'center' }}>Remind the karigars</OutBtn></PPane>} paneWidth={290}>
    <JCBar T={T} view="Calendar" right={<div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Hit T={T} icon="chevron-left" size={28} iconSize={14} style={{ background: T.chipBg }} /><span style={{ fontFamily: T.fontDisplay, fontSize: 16, fontWeight: 600 }}>September 2026</span><Hit T={T} icon="chevron-right" size={28} iconSize={14} style={{ background: T.chipBg }} /></div>} />
    <PMain>
      <div style={{ borderRadius: 16, border: `1px solid ${T.line}`, background: T.surface, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', borderBottom: `1px solid ${T.line}` }}>{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <span key={d} style={{ padding: '6px 8px', fontFamily: T.fontUI, fontSize: 10, letterSpacing: '.06em', textTransform: 'uppercase', color: T.ink3 }}>{d}</span>)}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)' }}>{Array.from({ length: 35 }, (_, i) => i - 1).map((d, i) => { const inM = d >= 1 && d <= 30; const e = inM ? ev[d] : null; const pick = d === 12; return <div key={i} style={{ height: 104, padding: 6, borderRight: i % 7 < 6 ? `1px solid ${T.line}` : 0, borderBottom: i < 28 ? `1px solid ${T.line}` : 0, background: pick ? T.accentSoft : 'transparent', boxSizing: 'border-box', overflow: 'hidden' }}><div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ fontFamily: T.fontUI, fontSize: 11, color: inM ? T.ink2 : T.ink3, fontWeight: d === 8 || pick ? 600 : 400 }}>{inM ? d : ''}</span>{d === 8 && <span style={{ width: 5, height: 5, borderRadius: 3, background: T.accent }} />}{e && e.length > 1 && <Meta T={T} style={{ marginLeft: 'auto', fontSize: 10 }}>{e.length} due</Meta>}</div>{e && e.map((x, k) => <div key={k} className="press" style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 4, padding: '3px 5px', borderRadius: 7, background: x[3] ? T.danger + '22' : T.chipBg }}>{x[1].startsWith('dye') ? <Swatch m={{ tex: 'net', shade: 'Lilac', dye: true }} w={16} h={20} r={4} /> : <Thumb T={T} d={PR_D(x[0])} w={16} h={20} r={4} />}<span style={{ minWidth: 0, fontFamily: T.fontUI, fontSize: 10, color: x[3] ? T.danger : T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}><b>{x[0]}</b> {x[1]}</span></div>)}</div>; })}</div>
      </div>
    </PMain>
  </PShell>;
}

Object.assign(window, { ORD_TABS, OrderCardW, LifecyclePane, OrdBar, WebPOrders, WebPOrdersList, ReadinessPane, WebPNewOrder, LIFE_TABS, LifeHead, JobPanel, ThisJobPane, LifeTabs, WebPLifecycle, AssignPane, WebPAssign, IssuePane, WebPIssue, WebPIssueDirect, ReceivePane, WebPReceive, WebPReceiveFG, JobCardA4, Sticker, WebPPrint, JC_SCOPES, JC_VIEWS, JCBar, WebPJobCards, FiltersPane, WebPJobFilters, WebPSwimlanes, WebPJobTable, WebPGantt, WebPCalendar });
