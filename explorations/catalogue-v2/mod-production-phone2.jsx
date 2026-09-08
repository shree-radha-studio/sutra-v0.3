/* NEW DRAFTS · Production · phone, part 2 (9 Sep 2026): the phone counterparts the coverage review found missing —
   overview, purchase orders and new PO, return, material detail and new material, cut order, process setting and BOM,
   new order, print, job cards in swimlane / timeline / calendar form, deployed sample reading, make product, costing,
   karigars (list, detail, verify, new). Floor roles see no money; manager phones show rates with the lock mark. */

const PLock = ({ T }) => <Ic name="lock" size={10} color={T.ink3} style={{ marginLeft: 3, verticalAlign: -1 }} />;
const PTile = ({ T, label, value, sub, tone, icon }) => <div className="press" style={{ padding: '10px 12px', borderRadius: 16, background: T.surface, border: `1px solid ${T.line}`, minWidth: 0 }}><div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>{icon && <Ic name={icon} size={13} color={T.ink3} />}<span style={{ fontFamily: T.fontUI, fontSize: 11, color: T.ink3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</span></div><div style={{ fontFamily: T.fontDisplay, fontSize: 24, fontWeight: 600, marginTop: 2, color: tone === 'danger' ? T.danger : tone === 'ok' ? T.ok : T.ink }}>{value}</div>{sub && <Meta T={T} style={{ display: 'block', marginTop: 1 }}>{sub}</Meta>}</div>;
const PSect = ({ T, children, right }) => <Sect T={T} style={{ margin: '14px 0 6px' }} right={right}>{children}</Sect>;
const PRow = ({ T, left, title, sub, right, on }) => <div className="press" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 8px', borderRadius: 14, background: on ? T.accentSoft : T.surface, border: `1px solid ${on ? T.accentLine : T.line}`, marginBottom: 6 }}>{left}<span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontUI, fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</div><Meta T={T} style={{ display: 'block', marginTop: 1 }}>{sub}</Meta></span>{right}</div>;

/* P24 · Overview · the phone home of Production */
function ScreenPOverview({ T }) {
  return frameF(T, <><PrHeader T={T} node="Overview" placeholder="Design, order, job, karigar" />
    <Body>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}><PTile T={T} label="Serviceable jobs" value="9" sub="inputs in stock" icon="circle-check" /><PTile T={T} label="Delayed" value="7" sub="past a tranche date" tone="danger" icon="clock" /><PTile T={T} label="Floor today" value="14 · 9" sub="issues · receives" icon="arrow-up-right" /><PTile T={T} label="To verify" value="1" sub="karigar-recorded" icon="badge-alert" /></div>
      <div style={{ display: 'flex', gap: 8, marginTop: 10 }}><OutBtn T={T} icon="qr-code" style={{ flex: 1, justifyContent: 'center', height: 42 }}>Scan a job</OutBtn><OutBtn T={T} icon="arrow-down-left" style={{ flex: 1, justifyContent: 'center', height: 42 }}>Receive</OutBtn><OutBtn T={T} icon="arrow-up-right" style={{ flex: 1, justifyContent: 'center', height: 42 }}>Issue</OutBtn></div>
      <PSect T={T} right={<Meta T={T}>tranches</Meta>}>Due today · Fri 12 Sep</PSect>
      {PR_JOBS.filter(j => j.next === '12/09/26').map(j => <JobRow key={j.id} T={T} j={j} />)}
      <PSect T={T} right={<Meta T={T}>Purchase · Dye</Meta>}>Arriving this week</PSect>
      {[['PU-0342', 'Surat Textiles', 'Santoon Peach 200 m · Cancan 500 m', 'today', 'm3'], ['DC-0034', 'Rafiq Bhai · dye', 'Mono net → C11 Lilac · 150 m', 'Fri', null, 'Lilac'], ['PU-0345', 'Bareilly Works', 'Rasgulla 300 m', 'Wed', 'm9']].map(r => <PRow key={r[0]} T={T} left={<Swatch m={r[4] ? prMat(r[4]) : { tex: 'net', shade: r[5], dye: true }} w={36} h={40} r={9} />} title={<span><Mono T={T} size={11.5}>{r[0]}</Mono> · {r[1]}</span>} sub={r[2]} right={<Pill T={T} tone={r[3] === 'today' ? 'warn' : 'muted'} small>{r[3]}</Pill>} />)}
      <PSect T={T} right={<Meta T={T}>Samples</Meta>}>High growth</PSect>
      {PR_SAMPLES.filter(s => s.chips.includes('High growth')).map(s => <PRow key={s.no} T={T} left={<Thumb T={T} d={s.d} w={36} h={44} r={9} />} title={<span>{s.no} · {s.cat}</span>} sub={s.where} right={s.read ? <ReadRing T={T} n={s.read} /> : <Pill T={T} tone="ok" small>Activated</Pill>} />)}
      <div style={{ marginTop: 10, padding: '8px 10px', borderRadius: 12, background: T.chipBg, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2 }}>Payments due and costing live on the desk · manager roles see them here under Karigars</div>
    </Body></>, prDock(T));
}

/* P25–P27 · Purchase on the phone */
const PO_P = [['PU-0342', 'Surat Textiles', ['m3', 'm5'], 'today', 'Expected today', 'warn', '2798'], ['PU-0345', 'Bareilly Works', ['m9'], 'Wed 10/09', 'Blocking', 'danger', '2798'], ['PU-0339', 'Surat Textiles', ['m7'], 'Fri 12/09', 'Open', 'muted'], ['PU-0331', 'Mumbai Fabrics', ['m6'], '02/09', 'Overdue 6 d', 'danger', '6002'], ['PU-0328', 'Surat Textiles', ['m14'], '15/09', 'Partial', 'warn'], ['PU-0346', 'Surat Textiles', ['m10'], '18/09', 'Approval', 'blue']];
function ScreenPPOList({ T }) {
  return frameF(T, <><PrHeader T={T} node="Purchase" placeholder="Supplier, material, PO" count="6 open" chips={[['Production-blocking', true], ['Due this week', false], ['Overdue', false], ['Open', false], ['Partially received', false]]} />
    <Body><div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}><T.Chip icon="arrow-down-up" outline style={{ height: 28 }}>Expected arrival</T.Chip><T.Chip icon="calendar" outline style={{ height: 28 }}>Calendar</T.Chip><span style={{ flex: 1 }} /><T.Chip icon="package-check" outline style={{ height: 28 }}>Inward</T.Chip></div>
      {PO_P.map((r, i) => <PRow key={r[0]} T={T} on={i === 0} left={<span style={{ display: 'inline-flex', gap: 3 }}>{r[2].slice(0, 2).map(id => <Swatch key={id} m={prMat(id)} w={26} h={36} r={7} />)}</span>} title={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Mono T={T} size={11.5}>{r[0]}</Mono>{r[1]}</span>} sub={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>{r[2].map(id => prMatName(prMat(id))).join(' · ')}{r[6] && <> · for <DesignChip T={T} code={r[6]} small /></>}</span>} right={<span style={{ textAlign: 'right' }}><Pill T={T} tone={r[5]} fill={r[5] === 'danger'} small>{r[4]}</Pill><Meta T={T} style={{ display: 'block', marginTop: 3 }}>{r[3]}</Meta></span>} />)}
    </Body>
    <div style={{ position: 'absolute', right: 14, bottom: 98 }}><T.Btn icon="plus" style={{ height: 44, borderRadius: 22 }}>New PO</T.Btn></div>
  </>, prDock(T));
}
function ScreenPNewPO({ T }) {
  return frameF(T, <><PrHeader T={T} node="Purchase" noSearch /><Body>{PO_P.slice(0, 2).map(r => <PRow key={r[0]} T={T} left={<Swatch m={prMat(r[2][0])} w={26} h={36} r={7} />} title={r[0] + ' · ' + r[1]} sub={r[3]} />)}</Body></>, <>{scrimF(T)}<Sheet T={T} h={690} title="New purchase order · PU-0347" foot={<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Meta T={T}>PM approves · supplier gets it on WhatsApp</Meta><span style={{ flex: 1 }} /><T.Btn style={{ height: 44 }} icon="send">Raise PO</T.Btn></div>}>
    <div style={{ display: 'flex', gap: 8 }}><Field T={T} label="Supplier" value="Surat Textiles · 81" caret /><Field T={T} label="Expected" value="18/09/26" icon="calendar" w={130} /></div>
    <Field T={T} label="Link to an order (optional)" value={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><DesignChip T={T} code="2798" small /> · PO-1187 · Stitching due 20/09</span>} caret style={{ marginTop: 8 }} />
    <PrLab T={T} style={{ marginTop: 12 }}>Lines</PrLab>
    <div style={{ borderRadius: 14, border: `1px solid ${T.line}`, background: T.surface, overflow: 'hidden' }}>{[['m10', '300 m', '₹62'], ['m5', '500 m', '₹28']].map(([id, q, r], i) => { const m = prMat(id); return <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderTop: i ? `1px solid ${T.line}` : 0 }}><Swatch m={m} w={32} h={38} r={8} /><span style={{ flex: 1, minWidth: 0, fontFamily: T.fontUI, fontSize: 12.5 }}>{prMatName(m)}<Meta T={T} style={{ display: 'block' }}>{m.stock} {m.unit} in stock · {m.code}</Meta></span><span style={{ width: 64, height: 32, borderRadius: 9, border: `1px solid ${T.line2}`, display: 'grid', placeItems: 'center', fontFamily: T.fontUI, fontSize: 12.5, fontWeight: 600 }}>{q}</span><span style={{ width: 54, height: 32, borderRadius: 9, border: `1px solid ${T.line2}`, display: 'grid', placeItems: 'center', fontFamily: T.fontUI, fontSize: 12 }}>{r}<PLock T={T} /></span></div>; })}<div style={{ padding: '6px 10px', borderTop: `1px solid ${T.line}` }}><OutBtn T={T} small icon="plus">Add a line</OutBtn></div></div>
    <div style={{ display: 'flex', gap: 8, marginTop: 10 }}><span className="press" style={{ width: 64, height: 64, borderRadius: 12, border: `1px dashed ${T.line2}`, background: T.chipBg, display: 'grid', placeItems: 'center', color: T.ink2 }}><Ic name="camera" size={18} /></span><Field T={T} label="Narration" ph="e.g. same lot as PU-0319" /></div>
    <Meta T={T} style={{ display: 'block', marginTop: 8 }}>2 photos from WhatsApp attached · rates show for money roles only</Meta>
  </Sheet></>);
}
function ScreenPReturn({ T }) {
  return frameF(T, <><PrHeader T={T} node="Purchase" noSearch /><Body><PRow T={T} on left={<Swatch m={prMat('m5')} w={32} h={38} r={8} />} title="GRN-0418 · Surat Textiles" sub="08/09 · Santoon 200 m · Cancan 480 m" right={<Pill T={T} tone="warn" small>variance</Pill>} /></Body></>, <>{scrimF(T)}<Sheet T={T} h={640} title="Purchase return · PR-0044" foot={<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><GateToken T={T} n="GT-260908-026" /><span style={{ flex: 1 }} /><T.Btn style={{ height: 44 }} icon="undo-2">Raise return</T.Btn></div>}>
    <Field T={T} label="Against inward" value="GRN-0418 · Surat Textiles · 08/09/26" caret />
    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}><Field T={T} label="Reason" value="Damaged · water marks" caret /><Field T={T} label="Through" value="Patel Parcel" caret w={130} /></div>
    <PrLab T={T} style={{ marginTop: 12 }}>What goes back</PrLab>
    {[['m3', 200, 0], ['m5', 480, 40]].map(([id, g, r]) => { const m = prMat(id); return <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderTop: `1px solid ${T.line}` }}><Swatch m={m} w={34} h={40} r={8} /><span style={{ flex: 1, fontFamily: T.fontUI, fontSize: 12.5 }}>{prMatName(m)}<Meta T={T} style={{ display: 'block' }}>received {g} {m.unit}</Meta></span><T.Step v={r} /></div>; })}
    <Field T={T} label="Photo of the damage" value="capture" icon="camera" style={{ marginTop: 10 }} />
    <div style={{ marginTop: 10, padding: '8px 10px', borderRadius: 12, background: T.chipBg, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2 }}>Credit note is built on the desk by accounts · delivery note DN-0044 prints at the gate</div>
  </Sheet></>);
}

/* P28–P30 · Materials on the phone: detail, new material, cut order */
function ScreenPMaterial({ T }) {
  const m = prMat('m2');
  return frameF(T, <><PrHeader T={T} title="Mono net · Sky" back noSearch />
    <Body style={{ padding: '0 0 120px' }}>
      <div style={{ position: 'relative' }}><Swatch m={m} w="100%" h={230} r={0} style={{ width: '100%' }} /><span style={{ position: 'absolute', left: 14, bottom: 12, display: 'flex', gap: 6 }}><T.PhotoTag>Dye WIP</T.PhotoTag><T.PhotoTag>lot 26/08</T.PhotoTag></span><span className="press" style={{ position: 'absolute', right: 14, bottom: 12, width: 40, height: 40, borderRadius: 20, background: 'rgba(0,0,0,.45)', color: '#fff', display: 'grid', placeItems: 'center' }}><Ic name="camera" size={16} /></span></div>
      <div style={{ padding: '12px 14px 0' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 24, fontWeight: 600 }}>{m.name}</span><span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: T.fontUI, fontSize: 12.5, color: T.ink2 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: prShade(m.shade) }} />{m.shade}</span><span style={{ flex: 1 }} /><StockWord T={T} m={m} /></div>
        <Meta T={T} style={{ display: 'block', marginTop: 2 }}>{m.code} · {m.group} · {m.dye.dyer} · cut order {m.dye.cut}</Meta>
        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}><T.Kpi label="On hand" value={`${m.stock} m`} small /><T.Kpi label="On order" value="—" small /><T.Kpi label="Used · month" value="78 m" small /></div>
        <div style={{ marginTop: 8, padding: '8px 10px', borderRadius: 12, background: T.accentSoft, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2 }}><b style={{ color: T.ink }}>Lineage</b> · {m.dye.from} → {m.dye.dyer} · shade {m.dye.code} · received {m.lastIn}</div>
        <PSect T={T}>Stock ledger</PSect>
        {[[m.lastIn, 'Dye receive · ' + m.dye.cut, '+196'], ['04/09/26', 'Issue · PO-1187 · Embroidery', '−10'], ['26/08/26', 'Issue · PO-1187 · Embroidery', '−12.5']].map((r, i) => <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, height: 34, borderTop: `1px solid ${T.line}`, fontFamily: T.fontUI, fontSize: 12.5 }}><Meta T={T}>{r[0].slice(0, 5)}</Meta><span style={{ flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r[1]}</span><span style={{ fontWeight: 600, color: r[2][0] === '+' ? T.ok : T.ink }}>{r[2]} m</span></div>)}
        <PSect T={T}>Used in</PSect>
        <div style={{ display: 'flex', gap: 6 }}>{['2798', '6002'].map(c => <span key={c} className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px 3px 3px', borderRadius: 999, background: T.chipBg }}><Thumb T={T} d={PR_D(c)} w={24} h={28} r={6} /><Num T={T} size={15}>{c}</Num></span>)}</div>
      </div>
    </Body>
    <div style={{ position: 'absolute', left: 14, right: 14, bottom: 98, display: 'flex', gap: 8, padding: 8, borderRadius: 24, ...glass(T) }}><OutBtn T={T} icon="printer" style={{ flex: 1, justifyContent: 'center', height: 44 }}>Label</OutBtn><OutBtn T={T} icon="git-branch" style={{ flex: 1, justifyContent: 'center', height: 44 }}>Add to recipe</OutBtn><T.Btn icon="shopping-cart" style={{ flex: 1, height: 44 }}>Raise PO</T.Btn></div>
  </>, <T.Island active="Production" />);
}
function ScreenPNewMaterial({ T }) {
  return frameF(T, <><PrHeader T={T} node="Materials" noSearch /><Body><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>{PR_MATS.slice(0, 2).map(m => <MatCard key={m.id} T={T} m={m} />)}</div></Body></>, <>{scrimF(T)}<Sheet T={T} h={680} title="New material" foot={<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Meta T={T}>lands as "no inward yet"</Meta><span style={{ flex: 1 }} /><T.Btn style={{ height: 44 }} icon="check">Save · 3 shades</T.Btn></div>}>
    <div style={{ display: 'flex', gap: 10 }}><span className="press" style={{ width: 84, height: 96, borderRadius: 14, border: `1px dashed ${T.line2}`, background: T.chipBg, display: 'grid', placeItems: 'center', color: T.ink2 }}><span style={{ textAlign: 'center', fontFamily: T.fontUI, fontSize: 10.5 }}><Ic name="camera" size={18} /><div>photo</div></span></span><span style={{ flex: 1, display: 'grid', gap: 8 }}><Field T={T} label="Material name" value="Nidha satin" /><Field T={T} label="Group" value="Base fabric" caret /></span></div>
    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}><Field T={T} label="Supplier" value="Surat Textiles" caret /><Field T={T} label="Unit" value="m" caret w={80} /></div>
    <PrLab T={T} style={{ marginTop: 12 }}>Shades · one master each</PrLab>
    <div style={{ borderRadius: 14, border: `1px solid ${T.line}`, background: T.surface, overflow: 'hidden' }}>{[['NS01', 'Wine'], ['NS03', 'Mehroon'], ['NS04', 'Rani']].map(([c, s], i) => <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderTop: i ? `1px solid ${T.line}` : 0 }}><Swatch m={{ tex: 'satin', shade: s }} w={32} h={32} r={8} /><Mono T={T} size={11.5}>{c}</Mono><span style={{ flex: 1, fontFamily: T.fontUI, fontSize: 13 }}>{s}</span><Ic name="x" size={13} color={T.ink3} /></div>)}<div style={{ padding: '6px 10px', borderTop: `1px solid ${T.line}` }}><OutBtn T={T} small icon="plus">Add a shade</OutBtn></div></div>
    <div style={{ display: 'flex', gap: 8, marginTop: 10 }}><Field T={T} label="Reorder level" value="100 m" /><Field T={T} label="Tags" value="satin · lining" caret /></div>
    <Meta T={T} style={{ display: 'block', marginTop: 8 }}>rate, alias, tax category stay on the desk (Hub › Masters)</Meta>
  </Sheet></>);
}
function ScreenPCutOrder({ T }) {
  return frameF(T, <><PrHeader T={T} node="Dye" noSearch /><Body>{PR_CUTS.slice(0, 2).map(c => <DyeRowP key={c.no} T={T} x={c} />)}</Body></>, <>{scrimF(T)}<Sheet T={T} h={640} title="New cut order · DC-0037" foot={<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><GateToken T={T} n="on issue" /><span style={{ flex: 1 }} /><T.Btn style={{ height: 44 }} icon="scissors">Raise cut order</T.Btn></div>}>
    <Field T={T} label="Material with a dyer" value={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Swatch m={{ tex: 'net', shade: 'Mono' }} w={18} h={18} r={5} />Mono net · Mono</span>} caret />
    <Field T={T} label="Dyer" value="Raja Dyers · 2,400 m with him · 2,280 free" caret style={{ marginTop: 8 }} />
    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}><Field T={T} label="Shade code" value={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 12, height: 12, borderRadius: 3, background: prShade('Peach') }} />C07 · Peach</span>} caret /><Field T={T} label="Qty" value={<T.Step v={120} />} w={140} /></div>
    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}><Field T={T} label="Due" value="15/09/26" icon="calendar" /><Field T={T} label="For (optional)" value={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><DesignChip T={T} code="2798" small /> · PO-1187</span>} caret /></div>
    <Field T={T} label="Swatch photo to match" value="capture" icon="camera" style={{ marginTop: 8 }} />
    <div style={{ marginTop: 10, padding: '8px 10px', borderRadius: 12, background: T.chipBg, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2 }}>Reserves 120 m of Raja's 2,400 m · the lot comes back as "Mono net · C07" · rate is set on the desk</div>
  </Sheet></>);
}

/* P31–P32 · Process setting on the phone: the sequence, and one colour's BOM */
function ScreenPSetting({ T }) {
  const seq = PR_RECIPE.seq;
  return frameF(T, <><PrHeader T={T} title="Process setting" back noSearch />
    <Body>
      <div style={{ display: 'flex', gap: 12 }}><Thumb T={T} d={PR_D('2798')} w={56} h={70} r={12} /><span style={{ flex: 1, minWidth: 0 }}><div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><Num T={T} size={24}>2798</Num><Meta T={T}>Plazo set · Lehenga</Meta></div><div style={{ display: 'flex', gap: 5, marginTop: 6, flexWrap: 'wrap' }}>{PR_RECIPE.colours.map(c => <span key={c} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, height: 24, padding: '0 8px', borderRadius: 999, background: T.chipBg, fontFamily: T.fontUI, fontSize: 11.5 }}><Dot n={c} s={7} />{c}</span>)}<Pill T={T} tone="warn" small>BOM incomplete · 1</Pill></div></span></div>
      <div style={{ display: 'flex', gap: 4, marginTop: 12 }}>{['Product', 'Sequence', 'Averages', 'BOM'].map((s, i) => <span key={s} style={{ flex: 1, textAlign: 'center' }}><span style={{ display: 'block', height: 3, borderRadius: 2, background: i < 3 ? T.ok : T.warn }} /><Meta T={T} style={{ display: 'block', marginTop: 3, fontSize: 10.5 }}>{i + 1} · {s}</Meta></span>)}</div>
      <PSect T={T} right={<Meta T={T}>hold and drag to reorder</Meta>}>Processes in sequence</PSect>
      {seq.map((p, i) => { const last = i === seq.length - 1; return <div key={p} className="press" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 10px', borderRadius: 14, background: T.surface, border: `1px solid ${last ? T.accentLine : T.line}`, marginBottom: 6 }}><Ic name="grip-vertical" size={14} color={T.ink3} /><span style={{ width: 24, height: 24, borderRadius: 12, background: T.ink, color: T.bg, display: 'grid', placeItems: 'center', fontFamily: T.fontUI, fontSize: 12, fontWeight: 600 }}>{i + 1}</span><span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontUI, fontSize: 14, fontWeight: 500 }}>{p}</div><Mono T={T} size={10.5} color={T.ink3}>{last ? '2798 · finished good' : prWipName(p, '2798')}</Mono></span>{last && <Pill T={T} tone="muted" small>Final</Pill>}<Ic name="chevron-right" size={14} color={T.ink3} /></div>; })}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}><Meta T={T} style={{ alignSelf: 'center' }}>Add:</Meta>{PR_SEQ_PROC.filter(p => !seq.includes(p[0])).slice(0, 4).map(([p, , ic]) => <T.Chip key={p} outline icon={ic} style={{ height: 28 }}>{p}</T.Chip>)}<T.Chip outline icon="plus" style={{ height: 28 }}>New process</T.Chip></div>
      <div style={{ marginTop: 12, padding: '8px 10px', borderRadius: 12, background: T.chipBg, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2 }}>Dye is not a step: dyed fabric comes from the Dye ledger as a material. Averages and the BOM grid open per process below.</div>
    </Body>
    <div style={{ position: 'absolute', left: 14, right: 14, bottom: 98, display: 'flex', gap: 8, padding: 8, borderRadius: 24, ...glass(T) }}><OutBtn T={T} icon="layers" style={{ flex: 1, justifyContent: 'center', height: 44 }}>Averages</OutBtn><T.Btn icon="check" style={{ flex: 1, height: 44 }}>Save recipe</T.Btn></div>
  </>, <T.Island active="Production" />);
}
function ScreenPBom({ T }) {
  const colour = 'Peach'; const rows = PR_RECIPE.rows.filter(r => r.scope === 'all' || r.scope === colour);
  return frameF(T, <><PrHeader T={T} title="BOM · 2798" back noSearch />
    <Body>
      <div style={{ display: 'flex', gap: 6 }}>{PR_RECIPE.colours.map(c => <T.Chip key={c} on={c === colour} outline={c !== colour} style={{ height: 30 }}><Dot n={c} s={7} />{c}</T.Chip>)}<span style={{ flex: 1 }} /><T.Chip outline icon="copy" style={{ height: 30 }}>Copy Sky</T.Chip></div>
      {PR_RECIPE.seq.map((p, i) => { const mine = rows.filter(r => r.to.includes(p)); const w = PR_RECIPE.wips.find(x => x[1] === p); const missing = p === 'Stitching' || (mine.length + (w ? 1 : 0)) === 0; return <div key={p} style={{ marginTop: 10, borderRadius: 16, background: T.surface, border: `1px solid ${missing ? T.warn + '88' : T.line}`, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', borderBottom: `1px solid ${T.line}` }}><span style={{ width: 22, height: 22, borderRadius: 11, background: T.ink, color: T.bg, display: 'grid', placeItems: 'center', fontFamily: T.fontUI, fontSize: 11, fontWeight: 600 }}>{i + 1}</span><span style={{ fontFamily: T.fontUI, fontSize: 14, fontWeight: 600, flex: 1 }}>{p}</span>{missing ? <Pill T={T} tone="warn" small>nothing ticked</Pill> : <Pill T={T} tone="ok" small>BOM set · {mine.length + (w ? 1 : 0)}</Pill>}</div>
        {w && <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 12px', fontFamily: T.fontUI, fontSize: 12.5 }}><span style={{ width: 30, height: 30, borderRadius: 8, background: T.chipBg, display: 'grid', placeItems: 'center' }}><Ic name="layers" size={13} color={T.ink2} /></span><span style={{ flex: 1 }}><Mono T={T} size={11.5} weight={500}>{prWipName(w[0], '2798', colour)}</Mono></span><b>1 pc</b><span style={{ width: 20, height: 20, borderRadius: 6, background: T.ink, color: T.bg, display: 'grid', placeItems: 'center' }}><Ic name="check" size={12} sw={3} /></span></div>}
        {mine.map((r, k) => { const m = prMat(r.m); const on = !missing; return <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 12px', borderTop: `1px solid ${T.line}`, fontFamily: T.fontUI, fontSize: 12.5 }}><Swatch m={m} w={30} h={30} r={8} /><span style={{ flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{prMatName(m)}</span><b>{r.avg} {r.unit}</b><span className="press" style={{ width: 20, height: 20, borderRadius: 6, background: on ? T.ink : 'transparent', border: `1.5px solid ${on ? T.ink : T.line2}`, color: T.bg, display: 'grid', placeItems: 'center' }}>{on && <Ic name="check" size={12} sw={3} />}</span></div>; })}
      </div>; })}
      <Meta T={T} style={{ display: 'block', marginTop: 10 }}>a tick sets the BOM · Peach saves as incomplete until Stitching has one</Meta>
    </Body></>, prDock(T));
}

/* P33–P34 · New order · print on the phone */
function ScreenPNewOrder({ T }) {
  return frameF(T, <><PrHeader T={T} node="Orders" noSearch /><Body>{[PR_ORDERS[0], PR_ORDERS[1]].map(o => <OrderRowP key={o.no} T={T} o={o} />)}</Body></>, <>{scrimF(T)}<Sheet T={T} h={700} title="New production order · PO-1203" foot={<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><OutBtn T={T} style={{ height: 44 }}>Save draft</OutBtn><span style={{ flex: 1 }} /><T.Btn style={{ height: 44 }} icon="send">Submit for approval</T.Btn></div>}>
    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}><Thumb T={T} d={PR_D('2798')} w={52} h={64} r={12} /><Field T={T} label="Product · complete recipe" value="2798 · Plazo set" caret /></div>
    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}><Field T={T} label="Planned end" value="20/10/26" icon="calendar" /><Field T={T} label="Reason" value="Restock · score 78" caret /></div>
    <PrLab T={T} style={{ marginTop: 12 }}>Qty by colour</PrLab>
    {[['Sky', 20], ['Purple', 25], ['Peach', 40]].map(([c, q]) => <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', borderTop: `1px solid ${T.line}` }}><Thumb T={T} d={PR_D('2798')} w={26} h={32} r={7} /><Dot n={c} /><span style={{ flex: 1, fontFamily: T.fontUI, fontSize: 13 }}>{c}</span><T.Step v={q} /></div>)}
    <div style={{ display: 'flex', fontFamily: T.fontUI, fontSize: 13, fontWeight: 600, padding: '8px 0', borderTop: `1px solid ${T.line2}` }}><span style={{ flex: 1 }}>Total</span><span>85 pcs</span></div>
    <PrLab T={T} style={{ marginTop: 6 }}>Processes · assign now or later</PrLab>
    {PR_RECIPE.seq.map((p, i) => { const k = [null, 'k1', 'k2', null, 'k4'][i + 1]; return <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderTop: `1px solid ${T.line}`, fontFamily: T.fontUI, fontSize: 12.5 }}><span style={{ width: 22, height: 22, borderRadius: 11, background: T.chipBg, display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 600 }}>{i + 1}</span><span style={{ width: 84 }}>{p}</span><span style={{ flex: 1, minWidth: 0 }}>{k ? <Field T={T} value={prK(k).name} caret small /> : <Field T={T} ph="assign later" caret small />}</span></div>; })}
    <div style={{ marginTop: 8, padding: '8px 10px', borderRadius: 12, background: T.chipBg, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2 }}>Readiness: 3 inputs short (Rasgulla, Cancan, Santoon Sky) · rates and tranches are set on the desk</div>
  </Sheet></>);
}
function ScreenPPrint({ T }) {
  return frameF(T, <><PrHeader T={T} title="Print · PO-1187-J2" back noSearch />
    <Body style={{ padding: '12px 14px 130px', background: T.bg2 }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>{['Job card · A4', 'Issue sticker', 'Receive sticker'].map((t, i) => <T.Chip key={t} on={i === 1} outline={i !== 1} style={{ height: 30 }}>{t}</T.Chip>)}</div>
      <div style={{ display: 'grid', placeItems: 'center' }}><Sticker T={T} w={330} kind="out" /></div>
      <Meta T={T} style={{ display: 'block', marginTop: 10, textAlign: 'center' }}>3 × 4 in · the floor copy prints without the rate</Meta>
      <PSect T={T}>Printer</PSect>
      {[['Godown label printer', 'Bluetooth · ready', true], ['Office A4 · HP', 'Wi-Fi · ready', false], ['Share as PDF', 'WhatsApp · Drive', false]].map(([n, s, on]) => <PRow key={n} T={T} on={on} left={<span style={{ width: 36, height: 36, borderRadius: 10, background: T.chipBg, display: 'grid', placeItems: 'center' }}><Ic name={n.startsWith('Share') ? 'share-2' : 'printer'} size={15} color={T.ink2} /></span>} title={n} sub={s} right={on ? <Ic name="circle-check" size={16} color={T.ok} /> : null} />)}
    </Body>
    <div style={{ position: 'absolute', left: 14, right: 14, bottom: 98, display: 'flex', gap: 8, padding: 8, borderRadius: 24, ...glass(T) }}><OutBtn T={T} icon="history" style={{ flex: 1, justifyContent: 'center', height: 44 }}>Re-print earlier</OutBtn><T.Btn icon="printer" style={{ flex: 1, height: 44 }}>Print 1 sticker</T.Btn></div>
  </>, <T.Island active="Production" />);
}

/* P35–P37 · Job cards on the phone: swimlanes, timeline, calendar */
function ScreenPSwimlanes({ T }) {
  const cols = [['Unassigned', ['Unassigned']], ['Ready to issue', ['Ready to issue']], ['At karigar', ['At karigar']], ['Waiting · stuck', ['Stuck', 'Waiting previous', 'Waiting on floor']]];
  return frameF(T, <><PrHeader T={T} node="Job cards" count="61 jobs" chips={[['Swimlanes', true, false, true], ['Cards', false], ['Timeline', false], ['Calendar', false]]} />
    <Body style={{ padding: '10px 0 120px' }}>
      <div style={{ display: 'flex', gap: 10, padding: '0 14px', overflow: 'hidden' }}>{cols.slice(0, 3).map(([name, st], ci) => { const list = PR_JOBS.filter(j => st.includes(j.state)); return <div key={name} style={{ width: 236, flex: 'none', borderRadius: 16, background: T.bg2, padding: 8, marginRight: ci === 2 ? -120 : 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '2px 4px 6px' }}><span style={{ width: 8, height: 8, borderRadius: 4, background: name === 'Unassigned' ? T.line2 : T.blue }} /><span style={{ fontFamily: T.fontUI, fontSize: 12.5, fontWeight: 600 }}>{name}</span><Meta T={T}>{list.length}</Meta></div>
        {list.slice(0, 4).map(j => <div key={j.id} className="press" style={{ display: 'flex', gap: 8, padding: 8, borderRadius: 12, background: T.surface, border: `1px solid ${T.line}`, marginBottom: 8 }}><Thumb T={T} d={j.d} w={40} h={50} r={9} /><span style={{ flex: 1, minWidth: 0 }}><div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}><Num T={T} size={16}>{j.code}</Num><Meta T={T}>{j.proc}</Meta></div><Meta T={T} style={{ display: 'block', marginTop: 2 }}>{j.karigar ? j.karigar.name.split(' ')[0] : 'no karigar'} · {j.recd}/{j.planned}</Meta><div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 5 }}><Pips T={T} tr={j.tr} size={6} /><PrNextPill T={T} j={j} />{j.idle && <Meta T={T} style={{ color: T.warn }}>idle {j.idle} d</Meta>}</div></span></div>)}
      </div>; })}</div>
      <Meta T={T} style={{ display: 'block', margin: '8px 14px 0' }}>swipe across the columns · long-press a card to move it</Meta>
    </Body></>, prDock(T));
}
function ScreenPGantt({ T }) {
  const day0 = new Date(2026, 8, 1); const px = 10.5; const toX = s => { const [d, m, y] = s.split('/'); return Math.round((new Date(2000 + +y, +m - 1, +d) - day0) / 864e5) * px; }; const today = toX('08/09/26');
  return frameF(T, <><PrHeader T={T} node="Job cards" count="September" chips={[['Timeline', true, false, true], ['Cards', false], ['Swimlanes', false], ['Calendar', false]]} />
    <Body style={{ padding: '10px 14px 120px' }}>
      <div style={{ borderRadius: 16, border: `1px solid ${T.line}`, background: T.surface, overflow: 'hidden' }}>
        <div style={{ display: 'flex', height: 26, borderBottom: `1px solid ${T.line}`, paddingLeft: 118, position: 'relative' }}>{[1, 5, 10, 15, 20, 25, 30].map(d => <span key={d} style={{ position: 'absolute', left: 118 + (d - 1) * px, top: 7, fontFamily: T.fontUI, fontSize: 9.5, color: T.ink3 }}>{d}</span>)}</div>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: 118 + today + px / 2, top: 0, bottom: 0, width: 1.5, background: T.accent, zIndex: 2 }} />
          {PR_ACTIVE.slice(0, 4).map(o => <React.Fragment key={o.no}><div style={{ display: 'flex', alignItems: 'center', gap: 6, height: 28, padding: '0 10px', background: T.bg2, borderTop: `1px solid ${T.line}` }}><Thumb T={T} d={PR_D(o.code)} w={18} h={22} r={5} /><Num T={T} size={13}>{o.code}</Num><Mono T={T} size={10}>{o.no}</Mono><span style={{ flex: 1 }} /><Meta T={T}>end {o.end.slice(0, 5)}</Meta></div>{o.jobs.map((j, i) => { const end = j.tr ? toX(j.tr[j.tr.length - 1][1]) : null; const start = j.tr ? Math.max(0, toX(o.date) + (i ? 60 : 0)) : 0; const c = j.state === 'Finished' ? T.ok : j.state === 'Stuck' ? T.danger : j.state === 'Waiting previous' ? T.line2 : T.blue; return <div key={j.proc} style={{ display: 'flex', alignItems: 'center', height: 28, borderTop: `1px solid ${T.line}`, position: 'relative' }}><span style={{ width: 118, flex: 'none', padding: '0 10px', fontFamily: T.fontUI, fontSize: 11.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{j.proc}<Meta T={T}> · {j.k ? prK(j.k).name.split(' ')[0] : '—'}</Meta></span><span style={{ flex: 1, position: 'relative', height: 28 }}>{j.tr ? <><span style={{ position: 'absolute', left: start, width: Math.max(px, end - start + px), top: 8, height: 12, borderRadius: 6, background: c + '33', border: `1px solid ${c}66` }}><span style={{ display: 'block', width: `${Math.min(100, j.recd / prQty(o) * 100)}%`, height: '100%', borderRadius: 6, background: c }} /></span>{j.tr.map((t, k) => <span key={k} style={{ position: 'absolute', left: toX(t[1]) + px / 2 - 2, top: 9, width: 5, height: 10, borderRadius: 2, background: t[2] >= t[0] ? T.ok : toX(t[1]) < today ? T.danger : T.ink2 }} />)}</> : <span style={{ position: 'absolute', left: 80, width: 70, top: 10, height: 8, borderRadius: 4, background: `repeating-linear-gradient(45deg, ${T.line2} 0 3px, transparent 3px 6px)` }} />}</span></div>; })}</React.Fragment>)}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10, marginTop: 8, fontFamily: T.fontUI, fontSize: 10.5, color: T.ink2, flexWrap: 'wrap' }}>{[[T.blue, 'active · fill = received'], [T.ok, 'done'], [T.danger, 'stuck · missed'], [T.line2, 'not started']].map(([c, l]) => <span key={l} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><span style={{ width: 12, height: 7, borderRadius: 4, background: c }} />{l}</span>)}</div>
    </Body></>, prDock(T));
}
function ScreenPCalendar({ T }) {
  const ev = { 4: ['3661', true], 8: ['1457', true], 10: ['3661'], 12: ['2798', false, 2], 14: ['2006'], 16: ['2798'], 20: ['2798', false, 2], 21: ['2006'], 30: ['2006'] };
  return frameF(T, <><PrHeader T={T} node="Job cards" count="September 2026" chips={[['Calendar', true, false, true], ['Cards', false], ['Swimlanes', false], ['Timeline', false]]} />
    <Body>
      <div style={{ borderRadius: 16, border: `1px solid ${T.line}`, background: T.surface, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', borderBottom: `1px solid ${T.line}` }}>{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <span key={i} style={{ padding: '6px 0', textAlign: 'center', fontFamily: T.fontUI, fontSize: 10, color: T.ink3 }}>{d}</span>)}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)' }}>{Array.from({ length: 35 }, (_, i) => i - 1).map((d, i) => { const inM = d >= 1 && d <= 30; const e = inM ? ev[d] : null; const pick = d === 12; return <div key={i} style={{ height: 52, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 5, borderTop: i >= 7 ? `1px solid ${T.line}` : 0, background: pick ? T.accentSoft : 'transparent' }}><span style={{ fontFamily: T.fontUI, fontSize: 12, fontWeight: d === 8 || pick ? 600 : 400, color: inM ? T.ink : T.ink3 }}>{inM ? d : ''}</span>{e && <span style={{ marginTop: 3, position: 'relative' }}><Thumb T={T} d={PR_D(e[0])} w={18} h={22} r={5} />{e[1] && <span style={{ position: 'absolute', right: -3, top: -3, width: 8, height: 8, borderRadius: 4, background: T.danger, border: `1.5px solid ${T.surface}` }} />}{e[2] && <span style={{ position: 'absolute', right: -6, bottom: -4, fontFamily: T.fontUI, fontSize: 9, fontWeight: 600, padding: '0 4px', borderRadius: 999, background: T.ink, color: T.bg }}>{e[2]}</span>}</span>}</div>; })}</div>
      </div>
      <PSect T={T} right={<Meta T={T}>2 tranches · 1 dye lot</Meta>}>Fri 12 Sep</PSect>
      {PR_JOBS.filter(j => j.next === '12/09/26').map(j => <JobRow key={j.id} T={T} j={j} />)}
      <PRow T={T} left={<Swatch m={{ tex: 'net', shade: 'Lilac', dye: true }} w={40} h={48} r={9} />} title="DC-0034 · dye lot" sub="Rafiq Bhai · Mono net → C11 Lilac · 150 m · unblocks PO-1192" right={<Pill T={T} tone="blue" small>with dyer</Pill>} />
    </Body></>, prDock(T));
}

/* P38–P39 · Samples on the phone: deployed reading, make product */
function ScreenPSampleDeployed({ T }) {
  const s = PR_SAMPLES.find(x => x.no === 'S-0409');
  return frameF(T, <><PrHeader T={T} title="S-0409" back noSearch />
    <Body style={{ padding: '10px 14px 130px' }}>
      <div style={{ display: 'flex', gap: 12 }}><Thumb T={T} d={s.d} w={64} h={80} r={14} /><span style={{ flex: 1, minWidth: 0 }}><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Num T={T} size={22}>S-0409</Num><ReadRing T={T} n={9} size={30} /></div><Meta T={T} style={{ display: 'block', marginTop: 2 }}>Saree · Lavender · deployed 30/08 · 1 pc in Catalogue</Meta><div style={{ marginTop: 6, display: 'flex', gap: 5 }}><Pill T={T} tone="ok" small>High growth</Pill><Pill T={T} tone="blue" small>Reading 9/15</Pill></div></span></div>
      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}><T.Kpi label="Views" value="212" sub="48 customers" small /><T.Kpi label="Cart adds" value="14" sub="6.6 %" small /><T.Kpi label="Orders" value="6" sub="waitlisted" small tone="ok" /></div>
      <PSect T={T} right={<Meta T={T}>daily · 15 days</Meta>}>Interest curve</PSect>
      <LineG T={T} series={[{ pts: [2, 5, 9, 14, 22, 31, 38, 47, 60], color: T.blue, width: 2 }]} w={334} h={80} area />
      <div style={{ marginTop: 12, padding: '10px 12px', borderRadius: 14, background: T.surface2, border: `1px solid ${T.line}`, fontFamily: T.fontUI, fontSize: 12, color: T.ink2 }}><div style={{ fontWeight: 600, color: T.ink }}>Suggestion · start production · 24 pcs</div>6 waitlisted + growth rate · Lavender 16 · Sky 8 · recipe imports from the 4 moves</div>
      <PSect T={T}>Moves</PSect>
      {[['Dye', 'Rafiq Bhai'], ['Embroidery', 'Saleem Creation'], ['Saree stitching', 'Noor Tailors'], ['Outing', 'Meena Touching Works']].map((m, i) => <div key={m[0]} style={{ display: 'flex', alignItems: 'center', gap: 8, height: 34, borderTop: `1px solid ${T.line}`, fontFamily: T.fontUI, fontSize: 12.5 }}><span style={{ width: 20, height: 20, borderRadius: 10, background: T.ink, color: T.bg, display: 'grid', placeItems: 'center', fontSize: 10, fontWeight: 600 }}>{i + 1}</span><span style={{ flex: 1 }}>{m[0]} · <Meta T={T}>{m[1]}</Meta></span><Pill T={T} tone="ok" small>back</Pill></div>)}
    </Body>
    <div style={{ position: 'absolute', left: 14, right: 14, bottom: 98, display: 'flex', gap: 8, padding: 8, borderRadius: 24, ...glass(T) }}><OutBtn T={T} icon="rotate-ccw" style={{ flex: 1, justifyContent: 'center', height: 44 }}>Re-read</OutBtn><T.Btn icon="package-check" style={{ flex: 1.4, height: 44 }}>Make product · first order</T.Btn></div>
  </>, <T.Island active="Production" />);
}
function ScreenPFinalise({ T }) {
  return frameF(T, <><PrHeader T={T} title="S-0412" back noSearch /><Body><MoveCard T={T} mv={PR_MOVES[2]} phone /></Body></>, <>{scrimF(T)}<Sheet T={T} h={700} title="Make product from S-0412" foot={<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Meta T={T}>opens Process setting for review</Meta><span style={{ flex: 1 }} /><T.Btn style={{ height: 44 }} icon="git-branch">Create 4566</T.Btn></div>}>
    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}><Thumb T={T} d={PR_D('4566')} w={52} h={64} r={12} /><span style={{ flex: 1, display: 'grid', gap: 8 }}><Field T={T} label="Design number" value="4566 · next free" small /><Field T={T} label="Category · colours" value="Lehenga · Blush · + add" caret small /></span></div>
    <PrLab T={T} style={{ marginTop: 12 }}>Sequence · from the moves</PrLab>
    {[['Embroidery', 'Saleem Creation', 'wip_emb_4566'], ['Stitching', 'Noor Tailors', '4566 · finished good']].map(([p, k, w], i) => <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 14, background: T.surface, border: `1px solid ${i === 1 ? T.accentLine : T.line}`, marginBottom: 6 }}><Ic name="grip-vertical" size={14} color={T.ink3} /><span style={{ width: 22, height: 22, borderRadius: 11, background: T.ink, color: T.bg, display: 'grid', placeItems: 'center', fontFamily: T.fontUI, fontSize: 11, fontWeight: 600 }}>{i + 1}</span><span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontUI, fontSize: 13.5, fontWeight: 500 }}>{p}</div><Meta T={T}>{k} · {w}</Meta></span>{i === 1 && <Pill T={T} tone="muted" small>Final</Pill>}</div>)}
    <Meta T={T} style={{ display: 'block' }}>move 1 (Dye) becomes the cut order in the recipe · Mono net → C22 Blush</Meta>
    <PrLab T={T} style={{ marginTop: 12 }}>Averages · issued ÷ 1 pc · edit</PrLab>
    {[[{ tex: 'net', shade: 'Blush', dye: true, name: 'Mono net · C22' }, 2.9, 'm'], [{ ...prMat('m7'), name: 'Zari thread · Gold' }, 0.05, 'kg'], [{ ...prMat('m3'), name: 'Santoon · Peach' }, 8, 'm'], [{ ...prMat('m5'), name: 'Cancan · Mono' }, 8, 'm']].map(([m, q, u], i) => <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', borderTop: `1px solid ${T.line}` }}><Swatch m={m} w={30} h={34} r={8} /><span style={{ flex: 1, fontFamily: T.fontUI, fontSize: 12.5 }}>{m.name}</span><span style={{ width: 70, height: 30, borderRadius: 9, border: `1px solid ${T.accentLine}`, display: 'grid', placeItems: 'center', fontFamily: T.fontUI, fontSize: 12.5, fontWeight: 600 }}>{q} {u}</span></div>)}
    <Meta T={T} style={{ display: 'block', marginTop: 8 }}>costing draft and the price stay on the desk · money roles</Meta>
  </Sheet></>);
}

/* P40–P41 · Costing on a manager's phone (money role) */
function ScreenPCosting({ T }) {
  return frameF(T, <><PrHeader T={T} node="Costing" placeholder="Design, sample, order" count="3 complete · 2 incomplete" chips={[['Pending approval', true], ['Completed', false], ['Incomplete', false], ['Not priced', false]]} />
    <Body>
      <Meta T={T} style={{ display: 'block', marginBottom: 8 }}>manager role · unit cost = materials at average rate + job rates · price = cost ÷ (1 − margin)</Meta>
      {COSTS.map(([c, ref, cost, mg, price, chips, tab], i) => <PRow key={c} T={T} on={i === 0} left={<Thumb T={T} d={c.startsWith('S-') ? (PR_SAMPLES.find(s => s.no === c) || {}).d : PR_D(c)} w={44} h={54} r={10} />} title={<span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 6 }}><Num T={T} size={18}>{c}</Num>{ref && <Mono T={T} size={11}>{ref}</Mono>}</span>} sub={<span>{prMoney(cost)} · {mg} % → <b style={{ color: T.ink }}>{price ? prMoney(price) : 'TBD'}</b></span>} right={<span style={{ textAlign: 'right' }}>{chips[0] ? <Pill T={T} tone={/Sync/.test(chips[0]) ? 'danger' : /Pending/.test(chips[0]) ? 'blue' : 'warn'} fill={/Sync/.test(chips[0])} small>{chips[0]}</Pill> : <Pill T={T} tone="ok" small>{tab}</Pill>}</span>} />)}
    </Body></>, prDock(T));
}
function ScreenPCostBreakdown({ T }) {
  return frameF(T, <><PrHeader T={T} node="Costing" noSearch /><Body><PRow T={T} on left={<Thumb T={T} d={PR_D('2798')} w={44} h={54} r={10} />} title={<Num T={T} size={18}>2798</Num>} sub="cost ₹2,058 · 40 % → ₹3,430" right={<Pill T={T} tone="blue" small>Pending approval</Pill>} /></Body></>, <>{scrimF(T)}<Sheet T={T} h={690} title="2798 · cost breakdown" foot={<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><OutBtn T={T} style={{ height: 44 }} icon="history">Past prices</OutBtn><span style={{ flex: 1 }} /><T.Btn style={{ height: 44 }} icon="check">Approve ₹3,495</T.Btn></div>}>
    <PrLab T={T}>Materials · ₹1,498 · avg × purchase-rate avg</PrLab>
    {[['Mono net · dye lot', '0.5 m × ₹62 + dye', 40], ['Zari thread', '0.04 kg × ₹1,850', 74], ['Cancan', '8 m × ₹28', 224], ['Haddi', '2 m × ₹9', 18], ['Rasgulla', '5 m × ₹35', 175], ['Santoon', '8 m × ₹62', 496], ['BKS 41 choli set', '1 pc × ₹471', 471]].map(r => <div key={r[0]} style={{ display: 'flex', alignItems: 'center', gap: 8, height: 30, borderTop: `1px solid ${T.line}`, fontFamily: T.fontUI, fontSize: 12.5 }}><span style={{ flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r[0]}<Meta T={T}> · {r[1]}</Meta></span><span>₹{r[2]}</span></div>)}
    <PrLab T={T} style={{ marginTop: 10 }}>Job rates per pc · ₹560</PrLab>
    {[['Touching', 40], ['Embroidery', 200], ['Latkan', 0], ['Stitching', 320]].map(r => <div key={r[0]} style={{ display: 'flex', alignItems: 'center', gap: 8, height: 28, borderTop: `1px solid ${T.line}`, fontFamily: T.fontUI, fontSize: 12.5 }}><span style={{ flex: 1 }}>{r[0]}</span>{r[1] ? <span>₹{r[1]}</span> : <Pill T={T} tone="warn" small>not assigned</Pill>}</div>)}
    <div style={{ marginTop: 10, padding: '10px 12px', borderRadius: 14, background: T.surface2, border: `1px solid ${T.line}`, fontFamily: T.fontUI, fontSize: 13 }}><div style={{ display: 'flex' }}><span style={{ flex: 1 }}>Unit cost</span><b>₹2,058</b></div><div style={{ display: 'flex', marginTop: 4 }}><span style={{ flex: 1 }}>Margin · Lehenga default</span><span>40 %</span></div><div style={{ display: 'flex', marginTop: 4, alignItems: 'baseline' }}><span style={{ flex: 1 }}>Recommended</span><span style={{ fontFamily: T.fontSerif, fontSize: 22, fontWeight: 600 }}>₹3,430</span></div></div>
    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}><Field T={T} label="Your price" value="₹3,495" /><Field T={T} label="Margin at that" value="41.1 %" /></div>
  </Sheet></>);
}

/* P42–P45 · Karigars on the phone (manager role for money) */
function ScreenPKarigars({ T }) {
  return frameF(T, <><PrHeader T={T} node="Karigars" placeholder="Name, skill, phone" count="27 karigars" chips={[['Delayed jobs', true], ['Payment due', false], ['Capacity risk', false], ['Material balance', false], ['Unverified', false]]} />
    <Body><div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}><T.Chip icon="arrow-down-up" outline style={{ height: 28 }}>Reliability</T.Chip><span style={{ flex: 1 }} /><T.Chip icon="bar-chart-3" outline style={{ height: 28 }}>Analytics</T.Chip></div>
      {PR_KARIGARS.map((k, i) => <PRow key={k.id} T={T} on={i === 1} left={<span style={{ width: 40, height: 40, borderRadius: 12, background: T.ink, color: T.bg, display: 'grid', placeItems: 'center', fontFamily: T.fontDisplay, fontSize: 14, fontWeight: 600 }}>{k.name.split(' ').slice(0, 2).map(w => w[0]).join('')}</span>} title={k.name} sub={`${k.skills.join(' · ')} · ${k.jobs} jobs · ${k.withThem} with them`} right={<span style={{ textAlign: 'right' }}><span style={{ fontFamily: T.fontUI, fontSize: 14, fontWeight: 600, color: k.score >= 70 ? T.ok : T.warn }}>{k.score}</span><Meta T={T} style={{ display: 'block' }}>{k.onTime} % on time</Meta></span>} />)}
    </Body>
    <div style={{ position: 'absolute', right: 14, bottom: 98 }}><T.Btn icon="user-plus" style={{ height: 44, borderRadius: 22 }}>New karigar</T.Btn></div>
  </>, prDock(T));
}
function ScreenPKarigar({ T }) {
  const k = prK('k2');
  return frameF(T, <><PrHeader T={T} title={k.name} back noSearch />
    <Body style={{ padding: '10px 14px 130px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ width: 52, height: 52, borderRadius: 16, background: T.ink, color: T.bg, display: 'grid', placeItems: 'center', fontFamily: T.fontDisplay, fontSize: 18, fontWeight: 600 }}>SC</span><span style={{ flex: 1, minWidth: 0 }}><div style={{ display: 'flex', gap: 5 }}>{k.skills.map(s => <Pill key={s} T={T} tone="muted" small>{s}</Pill>)}</div><Meta T={T} style={{ display: 'block', marginTop: 4 }}>Delhi · since 2019 · capacity {k.cap}/d</Meta></span><CallChip T={T}>{k.phone}</CallChip></div>
      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}><T.Kpi label="Score" value={k.score} small tone="ok" /><T.Kpi label="On time" value={k.onTime + ' %'} small /><T.Kpi label={<span>Due<PLock T={T} /></span>} value={prMoney(k.due)} small /></div>
      <div style={{ display: 'flex', gap: 4, marginTop: 12, padding: 3, borderRadius: 999, background: T.bg2 }}>{['Jobs', 'Material', 'Ledger', 'Verify · 1'].map((t, i) => <span key={t} className="press" style={{ flex: 1, textAlign: 'center', height: 30, lineHeight: '30px', borderRadius: 999, background: i === 0 ? T.surface : 'transparent', fontFamily: T.fontUI, fontSize: 12.5, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? T.ink : T.ink3 }}>{t}</span>)}</div>
      <div style={{ marginTop: 8 }}>{PR_JOBS.filter(j => j.k === k.id).map(j => <JobRow key={j.id} T={T} j={j} />)}</div>
      <PSect T={T} right={<Meta T={T}>speed · reliability</Meta>}>Last 12 weeks</PSect>
      <LineG T={T} series={[{ pts: [60, 64, 58, 70, 72, 68, 75, 74, 80, 78, 82, 78], color: T.accent, width: 2 }, { pts: [70, 70, 66, 72, 74, 71, 76, 78, 80, 79, 81, 80], color: T.ok, width: 2, dash: true }]} w={334} h={70} area />
    </Body>
    <div style={{ position: 'absolute', left: 14, right: 14, bottom: 98, display: 'flex', gap: 8, padding: 8, borderRadius: 24, ...glass(T) }}><OutBtn T={T} icon="message-circle" style={{ flex: 1, justifyContent: 'center', height: 44 }}>WhatsApp</OutBtn><OutBtn T={T} icon="badge-check" style={{ flex: 1, justifyContent: 'center', height: 44 }}>Verify 1</OutBtn><T.Btn icon="wallet" style={{ flex: 1, height: 44 }}>Pay ₹41,000</T.Btn></div>
  </>, <T.Island active="Production" />);
}
function ScreenPKarigarVerify({ T }) {
  return frameF(T, <><PrHeader T={T} node="Karigars" noSearch /><Body><PRow T={T} on left={<Thumb T={T} d={PR_D('2798')} w={44} h={54} r={10} />} title="MR-00121 · Saleem Creation" sub="receive · 3 pcs Peach · recorded on his phone 08/09 11:20" right={<Pill T={T} tone="warn" small>Unverified</Pill>} /></Body></>, <>{scrimF(T)}<Sheet T={T} h={620} title="Verify · MR-00121" foot={<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><OutBtn T={T} style={{ height: 44 }} icon="x">Reject</OutBtn><span style={{ flex: 1 }} /><T.Btn style={{ height: 44 }} icon="badge-check">Verify · gate token</T.Btn></div>}>
    <div style={{ display: 'flex', gap: 10 }}><Thumb T={T} d={PR_D('2798')} w={52} h={64} r={12} /><span style={{ flex: 1 }}><div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}><Num T={T} size={20}>2798</Num><Mono T={T} size={11.5}>PO-1187 · Embroidery</Mono></div><Meta T={T} style={{ display: 'block' }}>Saleem Creation says: received 3 pcs Peach</Meta><div style={{ marginTop: 4 }}><KarigarPill T={T} name="Saleem Creation" score={78} /></div></span></div>
    <div style={{ marginTop: 10, height: 150, borderRadius: 14, background: T.chipBg, display: 'grid', placeItems: 'center', fontFamily: T.fontUI, fontSize: 12, color: T.ink3 }}>his photo · 3 pcs Peach</div>
    <div style={{ display: 'flex', gap: 8, marginTop: 10 }}><Field T={T} label="Counted" value={<T.Step v={3} />} w={140} /><Field T={T} label="Settles" value="none · over-receive" caret /></div>
    <div style={{ marginTop: 10, padding: '8px 10px', borderRadius: 12, background: T.warn + '1F', border: `1px solid ${T.warn}55`, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink }}>Peach was never issued to Saleem. Verify books the pieces as excess for the PM; reject messages him and changes nothing.</div>
  </Sheet></>);
}
function ScreenPNewKarigar({ T }) {
  return frameF(T, <><PrHeader T={T} node="Karigars" noSearch /><Body>{PR_KARIGARS.slice(0, 2).map(k => <PRow key={k.id} T={T} left={<span style={{ width: 40, height: 40, borderRadius: 12, background: T.ink, color: T.bg, display: 'grid', placeItems: 'center', fontFamily: T.fontDisplay, fontSize: 14, fontWeight: 600 }}>{k.name.split(' ').slice(0, 2).map(w => w[0]).join('')}</span>} title={k.name} sub={k.skills.join(' · ')} />)}</Body></>, <>{scrimF(T)}<Sheet T={T} h={660} title="New karigar" foot={<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><OutBtn T={T} style={{ height: 44 }} icon="message-circle">Send invite</OutBtn><span style={{ flex: 1 }} /><T.Btn style={{ height: 44 }} icon="user-plus">Add karigar</T.Btn></div>}>
    <div style={{ display: 'flex', gap: 10 }}><span className="press" style={{ width: 64, height: 64, borderRadius: 16, border: `1px dashed ${T.line2}`, background: T.chipBg, display: 'grid', placeItems: 'center', color: T.ink2 }}><Ic name="camera" size={18} /></span><span style={{ flex: 1, display: 'grid', gap: 8 }}><Field T={T} label="Name · firm" value="Farhan Zari Works" /><Field T={T} label="Phone · WhatsApp" value="98xxx xxxxx" /></span></div>
    <PrLab T={T} style={{ marginTop: 12 }}>Skills</PrLab>
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{PR_SEQ_PROC.map(([p]) => <T.Chip key={p} on={p === 'Embroidery' || p === 'Latkan'} outline={!(p === 'Embroidery' || p === 'Latkan')} style={{ height: 30 }}>{p}</T.Chip>)}</div>
    <div style={{ display: 'flex', gap: 8, marginTop: 10 }}><Field T={T} label="Capacity · pcs/day" value="30" /><Field T={T} label="Area" value="Delhi · Seelampur" caret /></div>
    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}><Field T={T} label="Payment terms" value="30 days" caret /><Field T={T} label={<span>Rate card<PLock T={T} /></span>} value="desk" caret /></div>
    <Meta T={T} style={{ display: 'block', marginTop: 8 }}>bank details are entered by accounts · the score starts at 70 and moves with tranches</Meta>
  </Sheet></>);
}

Object.assign(window, { PLock, PTile, PSect, PRow, ScreenPOverview, PO_P, ScreenPPOList, ScreenPNewPO, ScreenPReturn, ScreenPMaterial, ScreenPNewMaterial, ScreenPCutOrder, ScreenPSetting, ScreenPBom, ScreenPNewOrder, ScreenPPrint, ScreenPSwimlanes, ScreenPGantt, ScreenPCalendar, ScreenPSampleDeployed, ScreenPFinalise, ScreenPCosting, ScreenPCostBreakdown, ScreenPKarigars, ScreenPKarigar, ScreenPKarigarVerify, ScreenPNewKarigar });
