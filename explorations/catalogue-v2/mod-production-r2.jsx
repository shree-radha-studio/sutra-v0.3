/* NEW DRAFTS · Production · review 2 exemplar (13 Oct 2026) · plans/review-2-production.md decision 49.
   One compare pair for the owner: the Production Overview as the review recommends, in the Desk density of
   plans/desk-density.md §1 (ruled rows, 4 px boxes, counts in the display face, status as words, colour only for danger
   and warn, more air). Five counts and one Suggestions list replace seven tiles and four strips. Chrome reused unchanged
   (PShell / WebShell3, PrHeader, frameF, the island); data from mod-production.jsx (PR_ORDERS, PR_JOBS, PR_SAMPLES,
   PR_KARIGARS, PR_MATS). Phone = the floor variant, no money. Components prefixed Pr2. Provisional, pending decision 49. */

/* ── Desk primitives (DD §1) ── */
const pr2Up = (T, extra) => ({ fontFamily: T.fontUI, fontSize: 11, letterSpacing: '.07em', textTransform: 'uppercase', color: T.ink3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', ...extra });
const Pr2Box = ({ T, title, right, children, style, flat }) => <div style={{ borderRadius: 4, border: `1px solid ${T.line2}`, background: T.surface, overflow: 'hidden', minWidth: 0, display: 'flex', flexDirection: 'column', flex: 'none', ...style }}>{title && <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: flat ? 34 : 40, padding: '0 12px', borderBottom: `1px solid ${T.line}` }}><span style={{ fontFamily: T.fontDisplay, fontSize: 16, fontWeight: 600, color: T.ink, whiteSpace: 'nowrap' }}>{title}</span><span style={{ flex: 1 }} />{right}</div>}{children}</div>;
const Pr2Head = ({ T, cols, h = 30, phone }) => <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: h, padding: '0 12px', background: T.surface2, borderBottom: `1px solid ${T.line}` }}>{cols.map(([l, w, al], i) => <span key={i} style={{ ...pr2Up(T), width: w, flex: w ? 'none' : 1, textAlign: al || (w ? 'right' : 'left'), fontSize: phone ? 10 : 11 }}>{l}</span>)}</div>;
const Pr2Row = ({ T, children, h = 44, on, last }) => <div className="press" style={{ display: 'flex', alignItems: 'center', gap: 10, height: h, flex: 'none', boxSizing: 'border-box', padding: '0 12px', borderBottom: last ? 0 : `1px solid ${T.line}`, background: on ? T.bg2 : 'transparent', boxShadow: on ? `inset 2px 0 0 ${T.ink}` : 'none', fontFamily: T.fontUI, fontSize: 12.5, color: T.ink }}>{children}</div>;
const Pr2Cell = ({ w, al, num, children, style }) => <span style={{ width: w, flex: w ? 'none' : 1, minWidth: 0, textAlign: al || (w ? 'right' : 'left'), whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontVariantNumeric: 'tabular-nums', fontWeight: num ? 600 : 400, ...style }}>{children}</span>;
/* status as a word: ink2 on line2; danger and warn only when they mean something */
const Pr2Tag = ({ T, tone, children, phone }) => { const c = tone === 'danger' ? T.danger : tone === 'warn' ? T.warn : null; return <span style={{ display: 'inline-flex', alignItems: 'center', height: phone ? 22 : 20, padding: '0 7px', borderRadius: 3, border: `1px solid ${c || T.line2}`, color: c || T.ink2, fontFamily: T.fontUI, fontSize: 10, fontWeight: 600, letterSpacing: '.05em', textTransform: 'uppercase', whiteSpace: 'nowrap', flex: 'none' }}>{children}</span>; };
/* a count cell: display 28 over an 11 px label, no tile box; cells share one ruled strip */
const Pr2Count = ({ T, n, label, sub, tone, first, size = 28, h, small }) => <div className="press" style={{ flex: 1, minWidth: 0, padding: small ? '8px 8px 7px' : '10px 14px 9px', borderLeft: first ? 0 : `1px solid ${T.line}`, height: h, boxSizing: 'border-box' }}><div style={pr2Up(T, small ? { fontSize: 9.5, letterSpacing: '.04em' } : {})}>{label}</div><div style={{ fontFamily: T.fontDisplay, fontSize: size, fontWeight: 600, lineHeight: 1.05, marginTop: 4, color: tone === 'danger' ? T.danger : tone === 'warn' ? T.warn : T.ink, fontVariantNumeric: 'tabular-nums' }}>{n}</div>{sub && <div style={{ fontFamily: T.fontUI, fontSize: 11, color: T.ink3, marginTop: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sub}</div>}</div>;
const Pr2Btn = ({ T, children, icon, primary, small, style }) => <span className="press" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, height: small ? 28 : 36, padding: small ? '0 10px' : '0 14px', borderRadius: 3, border: `1px solid ${primary ? T.accent : T.ink}`, background: primary ? T.accent : 'transparent', color: primary ? T.onAccent : T.ink, fontFamily: T.fontUI, fontSize: small ? 11.5 : 12.5, fontWeight: 500, whiteSpace: 'nowrap', flex: 'none', ...style }}>{icon && <Ic name={icon} size={small ? 12 : 14} />}{children}</span>;
/* photo beside every design number, 4:5, radius 3 */
const Pr2Design = ({ T, code, w = 32, h = 40, size = 15, sample }) => { const d = sample ? ((PR_SAMPLES.find(s => s.no === code) || {}).d || { code }) : PR_D(code); return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, minWidth: 0 }}><Thumb T={T} d={d} w={w} h={h} r={3} /><span style={{ fontFamily: T.fontDisplay, fontSize: size, fontWeight: 600, color: T.ink, whiteSpace: 'nowrap' }}>{code}</span></span>; };

/* ── content (the orders, jobs, samples and karigars the module already uses) ── */
const PR2_COUNTS = [['Active orders', '12', '9 with a job running'], ['Pcs in production', '1,046', 'across 12 orders'], ['FG received today', '46', '3661 · PO-1174'], ['Serviceable jobs', '9', 'inputs in stock, not issued'], ['Delayed jobs', '7', 'past a tranche date', 'danger']];
const PR2_ARRIVALS = [['PU-0342', 'Surat Textiles', 'Santoon Peach 200 m · Cancan 500 m', 'today', ['PO-1187 waits', 'warn'], 'm3'], ['PU-0345', 'Bareilly Works', 'Rasgulla 300 m', 'Wed 10/09', ['PO-1187 stuck on it', 'danger'], 'm9'], ['DC-0034', 'Rafiq Bhai · dye', 'Mono net → C11 Lilac · 150 m', 'Fri 12/09', ['PO-1192 waits', 'warn'], null, 'Lilac'], ['DC-0035', 'Raja Dyers · dye', 'Mono net → C07 Peach · 120 m', 'Mon 15/09', ['PO-1187 Peach', null], null, 'Peach']];
/* kind · design · why · the number that decides · action */
const PR2_SUGGEST = [
  ['High growth', 'S-0409', 'reading 9/15 · high growth · 1 pc back', '14 waitlisted', 'Raise first order', true],
  ['High growth', 'S-0411', 'activated · 2 pc in Catalogue', '14 orders', 'Raise first order', true],
  ['Priority', '2798', 'score 78 · 4 d cover · PO-1187 running', '12 free', 'Open PO-1187'],
  ['Priority', '6002', 'score 84 · out of stock · PO-1192 on dye lot', '0 free', 'Open PO-1192'],
  ['Priority', '3661', 'score 71 · 9 d cover', '8 free', 'Raise order'],
  ['Reorder', '2006', 'selling 3/day · runs out in 11 d', '33 free', 'Raise order'],
  ['Reorder', '1243', 'selling 2/day · 14 d cover', '28 free', 'Raise order'],
  ['Stop', 'D9107', 'sell-through 18 % · score 20', '0 running', 'Mark stop'],
  ['Stop', '1457', 'score 33 · PO-1163 running', '47 free', 'Stop PO-1163'],
];
const PR2_KINDS = [['High growth', 2], ['Priority', 3], ['Reorder', 2], ['Stop', 2]];

/* ── web · Overview · Desk density ── */
function WebPr2Overview({ T }) {
  const pane = <PPane style={{ padding: 0 }}>
    <div style={{ padding: '10px 14px 0' }}><Meta T={T} style={{ whiteSpace: 'normal', display: 'block' }}>karigar dues fall per piece received · 30-day term · money roles</Meta></div>
    <div style={{ margin: '10px 14px 0', borderRadius: 4, border: `1px solid ${T.line2}` }}>
      <Pr2Head T={T} cols={[['Karigar'], ['Due ₹', 84]]} />
      {PR_KARIGARS.filter(k => k.due).map((k, i, a) => <Pr2Row key={k.id} T={T} h={40} last={i === a.length - 1}><Pr2Cell>{k.name}</Pr2Cell><Pr2Cell w={84} num>{prMoney(k.due)}</Pr2Cell></Pr2Row>)}
    </div>
    <div style={{ display: 'flex', alignItems: 'baseline', margin: '10px 14px 0', padding: '8px 12px', borderRadius: 4, background: T.surface2, fontFamily: T.fontUI, fontSize: 12.5, fontWeight: 600 }}><span style={{ flex: 1 }}>Due this week</span><span style={{ fontFamily: T.fontDisplay, fontSize: 22, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>₹1,10,400</span></div>
    <div style={{ padding: '12px 14px 14px', display: 'flex', gap: 8 }}><Pr2Btn T={T} icon="book-open" style={{ flex: 1 }}>Ledger</Pr2Btn><Pr2Btn T={T} icon="wallet" primary style={{ flex: 1 }}>Raise vouchers</Pr2Btn></div>
  </PPane>;
  return <PShell T={T} section="Overview" crumb={['Production']} tab="Production · Overview" paneTitle="Payments due this week" pane={pane}>
    <PMain pad="14px 24px 20px" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', borderRadius: 4, border: `1px solid ${T.line2}`, background: T.surface }}>{PR2_COUNTS.map(([l, n, s, tone], i) => <Pr2Count key={l} T={T} first={i === 0} label={l} n={n} sub={s} tone={tone} />)}</div>
      <Pr2Box T={T} flat title="Arriving this week" right={<><Meta T={T}>purchases and dye lots · what each unblocks</Meta><Pr2Btn T={T} small icon="calendar">PO calendar</Pr2Btn><Pr2Btn T={T} small icon="droplets">Dye ledger</Pr2Btn></>}>
        <Pr2Head T={T} cols={[['Lot', 92, 'left'], ['From', 150, 'left'], ['What'], ['Unblocks', 170, 'left'], ['When', 80]]} />
        {PR2_ARRIVALS.map((r, i) => <Pr2Row key={r[0]} T={T} h={40} last={i === PR2_ARRIVALS.length - 1}><Pr2Cell w={92} al="left"><span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Swatch m={r[5] ? prMat(r[5]) : { tex: 'net', shade: r[6], dye: true }} w={22} h={22} r={3} /><Mono T={T} size={11.5}>{r[0]}</Mono></span></Pr2Cell><Pr2Cell w={150} al="left">{r[1]}</Pr2Cell><Pr2Cell style={{ color: T.ink2 }}>{r[2]}</Pr2Cell><Pr2Cell w={170} al="left">{r[4][0] && <Pr2Tag T={T} tone={r[4][1]}>{r[4][0]}</Pr2Tag>}</Pr2Cell><Pr2Cell w={80} style={{ color: T.ink2 }}>{r[3]}</Pr2Cell></Pr2Row>)}
      </Pr2Box>
      <Pr2Box T={T} title="Suggestions · 9" right={<><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><T.Chip icon="sliders-horizontal" outline style={{ height: 28 }}>Filters<Ic name="chevron-down" size={12} /></T.Chip>{PR2_KINDS.map(([k, n], i) => <T.Chip key={k} on={i === 0} outline={i !== 0} style={{ height: 28 }}>{k} <span style={{ opacity: .6 }}>{n}</span></T.Chip>)}</span><Meta T={T}>demand says</Meta></>} style={{ flex: 1, minHeight: 0 }}>
        <Pr2Head T={T} cols={[['Design', 150, 'left'], ['Kind', 112, 'left'], ['Why'], ['Decides', 110], ['', 132, 'right']]} />
        {PR2_SUGGEST.map((r, i) => <Pr2Row key={r[1]} T={T} on={i === 0} last={i === PR2_SUGGEST.length - 1}><Pr2Cell w={150} al="left"><Pr2Design T={T} code={r[1]} sample={!!r[5]} /></Pr2Cell><Pr2Cell w={112} al="left"><Pr2Tag T={T}>{r[0]}</Pr2Tag></Pr2Cell><Pr2Cell style={{ color: T.ink2 }}>{r[2]}</Pr2Cell><Pr2Cell w={110} num>{r[3]}</Pr2Cell><Pr2Cell w={132} al="right"><Pr2Btn T={T} small>{r[4]}</Pr2Btn></Pr2Cell></Pr2Row>)}
      </Pr2Box>
    </PMain>
  </PShell>;
}

/* ── phone · Overview · the floor variant, no money · shared header and island, Desk rows in the body ── */
function ScreenPr2Overview({ T }) {
  const due = PR_JOBS.filter(j => j.next === '12/09/26');
  const counts = [['Orders', '12'], ['Pcs', '1,046'], ['FG today', '46'], ['Ready', '9'], ['Late', '7', 'danger']];
  return frameF(T, <><PrHeader T={T} node="Overview" placeholder="Design, order, job, karigar" />
    <Body style={{ padding: '10px 14px 110px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', borderRadius: 4, border: `1px solid ${T.line2}`, background: T.surface }}>{counts.map(([l, n, tone], i) => <Pr2Count key={l} T={T} first={i === 0} label={l} n={n} tone={tone} size={24} small />)}</div>
      <div style={{ display: 'flex', gap: 8 }}><Pr2Btn T={T} icon="qr-code" primary style={{ flex: 1.2, height: 48, fontSize: 13.5 }}>Scan a job</Pr2Btn><Pr2Btn T={T} icon="arrow-down-left" style={{ flex: 1, height: 48, fontSize: 13.5 }}>Receive</Pr2Btn><Pr2Btn T={T} icon="arrow-up-right" style={{ flex: 1, height: 48, fontSize: 13.5 }}>Issue</Pr2Btn></div>
      <Pr2Box T={T} flat title="Due today · Fri 12 Sep" right={<Meta T={T}>tranches</Meta>}>
        {due.map((j, i) => <Pr2Row key={j.id} T={T} h={56} last={i === due.length - 1}><Thumb T={T} d={j.d} w={36} h={45} r={3} /><span style={{ flex: 1, minWidth: 0 }}><div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 16, fontWeight: 600 }}>{j.code}</span><Mono T={T} size={11}>{j.id}</Mono></div><div style={{ fontFamily: T.fontUI, fontSize: 12, color: T.ink2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: 2 }}>{j.proc} · {j.karigar.name.split(' ')[0]} · {j.recd}/{j.planned} back</div></span><Pr2Tag T={T} phone>{j.state}</Pr2Tag></Pr2Row>)}
      </Pr2Box>
      <Pr2Box T={T} flat title="Arriving this week" right={<Meta T={T}>purchase · dye</Meta>}>
        {PR2_ARRIVALS.slice(0, 3).map((r, i) => <Pr2Row key={r[0]} T={T} h={48} last={i === 2}><Swatch m={r[5] ? prMat(r[5]) : { tex: 'net', shade: r[6], dye: true }} w={28} h={35} r={3} /><span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontUI, fontSize: 12.5, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r[2]}</div><div style={{ fontFamily: T.fontUI, fontSize: 11, color: T.ink3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: 1 }}>{r[0]} · {r[1]}</div></span>{r[4][1] ? <Pr2Tag T={T} phone tone={r[4][1]}>{r[4][1] === 'danger' ? 'stuck' : 'waits'}</Pr2Tag> : null}<span style={{ fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2, width: 56, textAlign: 'right', flex: 'none' }}>{r[3]}</span></Pr2Row>)}
      </Pr2Box>
      <Pr2Box T={T} flat title="Suggestions · 9" right={<Meta T={T}>desk decides · you see them</Meta>}>
        {[PR2_SUGGEST[0], PR2_SUGGEST[2], PR2_SUGGEST[5]].map((r, i) => <Pr2Row key={r[1]} T={T} h={56} last={i === 2}><Pr2Design T={T} code={r[1]} sample={!!r[5]} w={36} h={45} size={16} /><span style={{ flex: 1, minWidth: 0, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r[2]}</span><Pr2Tag T={T} phone>{r[0]}</Pr2Tag></Pr2Row>)}
      </Pr2Box>
    </Body></>, prDock(T));
}

Object.assign(window, { WebPr2Overview, ScreenPr2Overview, Pr2Box, Pr2Row, Pr2Cell, Pr2Tag, Pr2Count, Pr2Btn, Pr2Design });

(window.NEW_DRAFT_MODULES = window.NEW_DRAFT_MODULES || []).push({ module: 'Production', note: 'review 2 exemplar', subs: [
  { name: 'review 2', flow: 'the Overview as decision 49 recommends: five counts, arrivals, one Suggestions list · Desk density · phone floor variant, no money', phone: [['Overview · floor phone, five counts, due today, suggestions · provisional, pending decision 49', ScreenPr2Overview]], web: [['Overview · five counts, arrivals, Suggestions list, dues pane · Desk density · provisional, pending decision 49', WebPr2Overview]] },
] });
