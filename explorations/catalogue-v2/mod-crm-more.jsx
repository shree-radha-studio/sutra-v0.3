/* NEW DRAFTS · CRM · every remaining web state (9 Sep 2026). Loads after mod-crm-web.jsx. Covers the tabs, sub-menus
   and button activities the first pass left implied: Follow-ups Today and History tabs, saved-list sheet, customer
   sort & filter, snooze, template editor, done → next; Share customer picker, sort menu, picture viewer, contact
   picker, export, sent, logo on all pictures; Payments Bills and Customers tabs, bill sort & filter, log payment,
   escalate, snooze, report schedule; Customers sort & filter, column chooser, the four remaining dossier tabs, start
   follow-up; Journeys Refill journey, new journey, test run, add node, publish. Sheet bodies are shared with the
   phone file (mod-crm-phone.jsx) which registers the whole module in flow order. */

/* ── overlay chrome shared by the web states ── */
const Overlay = ({ T, children }) => <div style={{ position: 'absolute', inset: 0, zIndex: 30 }}>{scrimF(T)}{children}</div>;
function WSheet({ T, title, sub, w = 640, h, children, foot, back, x, top }) {
  return <div style={{ position: 'absolute', left: x != null ? x : 84 + (1196 - w) / 2, top: top != null ? top : h ? (800 - h) / 2 : 60, width: w, height: h, bottom: h ? undefined : 40, borderRadius: 24, display: 'flex', flexDirection: 'column', overflow: 'hidden', ...glass(T, { background: T.dark ? 'rgba(28,21,18,.96)' : 'rgba(252,250,246,.97)' }) }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 22px 8px' }}>{back && <span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, height: 28, padding: '0 10px 0 6px', borderRadius: 999, background: T.chipBg, fontFamily: T.fontUI, fontSize: 12, color: T.ink2 }}><Ic name="arrow-left" size={13} />{back}</span>}<span style={{ fontFamily: T.fontDisplay, fontSize: 22, fontWeight: 600, color: T.ink }}>{title}</span>{sub && <Meta T={T}>{sub}</Meta>}<span style={{ flex: 1 }} /><Hit T={T} icon="x" size={32} iconSize={15} style={{ background: T.chipBg }} /></div>
    <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', padding: '0 22px' }}>{children}</div>
    {foot && <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 22px 14px', borderTop: `1px solid ${T.line}` }}>{foot}</div>}
  </div>;
}
function Pop({ T, x, y, w = 240, title, children, right, style }) {
  return <div style={{ position: 'absolute', left: x, top: y, width: w, borderRadius: 16, padding: '10px 10px 10px', zIndex: 25, ...glass(T, { background: T.dark ? 'rgba(28,21,18,.96)' : 'rgba(252,250,246,.98)' }), ...style }}>{title && <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '2px 4px 8px' }}><span style={{ fontFamily: T.fontUI, fontSize: 12.5, fontWeight: 600, color: T.ink }}>{title}</span><span style={{ flex: 1 }} />{right}</div>}{children}</div>;
}
const MenuRow = ({ T, icon, children, on, sub, right, tone }) => <div className="press" style={{ display: 'flex', alignItems: 'center', gap: 8, height: 34, padding: '0 8px', borderRadius: 10, background: on ? T.chipBg : 'transparent', fontFamily: T.fontUI, fontSize: 12.5, color: tone === 'danger' ? T.danger : T.ink, whiteSpace: 'nowrap' }}>{icon && <Ic name={icon} size={14} color={tone === 'danger' ? T.danger : T.ink2} />}<span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>{children}{sub && <span style={{ color: T.ink3 }}> · {sub}</span>}</span>{right}{on && <Ic name="check" size={14} color={T.accent} />}</div>;
const FRow = ({ T, label, children, top = 10 }) => <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: top }}><span style={{ width: 104, fontFamily: T.fontUI, fontSize: 12, color: T.ink3, flex: 'none' }}>{label}</span><span style={{ flex: 1, minWidth: 0, display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>{children}</span></div>;
const Fld = ({ T, value, ph, w, icon, caret, style }) => <span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 32, padding: '0 10px', borderRadius: 10, border: `1px solid ${T.line2}`, background: T.surface, fontFamily: T.fontUI, fontSize: 12.5, color: value ? T.ink : T.ink3, width: w, minWidth: 0, flex: w ? 'none' : 1, ...style }}>{icon && <Ic name={icon} size={13} color={T.ink3} />}<span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{value || ph}</span>{caret && <Ic name="chevron-down" size={12} color={T.ink3} />}</span>;
const Toggle = ({ T, on, label }) => <span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: T.fontUI, fontSize: 12, color: T.ink2 }}><span style={{ width: 28, height: 16, borderRadius: 8, background: on ? T.accent : T.line2, position: 'relative' }}><span style={{ position: 'absolute', top: 2, left: on ? 14 : 2, width: 12, height: 12, borderRadius: 6, background: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,.25)' }} /></span>{label}</span>;
const Check = ({ T, on, children, sub }) => <div className="press" style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '6px 0', fontFamily: T.fontUI, fontSize: 12.5, color: T.ink }}><span style={{ width: 18, height: 18, borderRadius: 5, border: `1.5px solid ${on ? T.accent : T.line2}`, background: on ? T.accent : 'transparent', display: 'grid', placeItems: 'center', color: T.onAccent, flex: 'none' }}>{on && <Ic name="check" size={12} sw={2.6} />}</span><span style={{ flex: 1, minWidth: 0 }}>{children}</span>{sub && <Meta T={T}>{sub}</Meta>}</div>;

/* ── shared sheet bodies (web and phone) ── */
/* saved list: name, base, filters, sort, default journey, sharing */
function NewListBody({ T, phone }) {
  return <div>
    <FRow T={T} label="Name" top={4}><Fld T={T} value="Delhi refill · Platinum" /></FRow>
    <FRow T={T} label="Built from"><Fld T={T} value="Refill due" caret w={150} /><Meta T={T}>+ the filters below</Meta></FRow>
    <FRow T={T} label="Filters"><T.Chip x style={{ height: 28 }}>City · Delhi</T.Chip><T.Chip x style={{ height: 28 }}>Tier · Platinum</T.Chip><T.Chip x style={{ height: 28 }}>Last order &gt; 45 d</T.Chip><T.Chip outline icon="plus" style={{ height: 28 }}>Filter</T.Chip></FRow>
    <FRow T={T} label="Sort"><Fld T={T} value="Next action, then customer score" caret /></FRow>
    <FRow T={T} label="Journey"><Fld T={T} value="Refill" caret w={130} /><Meta T={T}>new customers start on</Meta><Fld T={T} value="Reach out" caret w={120} /></FRow>
    <FRow T={T} label="Owner"><Fld T={T} value="Rohan Mehta" icon="user" caret w={170} /><Toggle T={T} on label="share with the sales team" /></FRow>
    <FRow T={T} label="Refresh"><Seg T={T} items={['Live', 'Daily 07:00', 'Manual']} on="Live" small /><Meta T={T}>12 customers match now</Meta></FRow>
  </div>;
}
/* customers sort & filter (chips guideline 3C): assignment, identity, quality, taste, activity, credit */
function CustFilterBody({ T, phone }) {
  const Head = ({ title, n, open, children }) => <div style={{ borderTop: `1px solid ${T.line}` }}><div className="press" style={{ display: 'flex', alignItems: 'center', gap: 8, height: 42 }}><span style={{ fontFamily: T.fontUI, fontSize: 13.5, fontWeight: 500, color: T.ink }}>{title}</span>{n ? <span style={{ minWidth: 18, height: 18, padding: '0 5px', borderRadius: 9, background: T.accent, color: T.onAccent, fontFamily: T.fontUI, fontSize: 10.5, fontWeight: 600, display: 'grid', placeItems: 'center' }}>{n}</span> : null}<span style={{ flex: 1 }} /><Ic name={open ? 'chevron-up' : 'chevron-down'} size={15} color={T.ink3} /></div>{open && <div style={{ paddingBottom: 12 }}>{children}</div>}</div>;
  const wrap = { display: 'flex', gap: 6, flexWrap: 'wrap' };
  return <>
    <div style={{ paddingBottom: 10 }}><Meta T={T} style={{ display: 'block', marginBottom: 6, letterSpacing: '.08em', textTransform: 'uppercase' }}>Sort</Meta><div style={wrap}>{['Next follow-up', 'Last order', 'Customer score', 'Revenue', 'Outstanding', 'Low-taste %', 'High-taste %'].map((s, i) => <T.Chip key={s} on={i === 0} outline={i !== 0} style={{ height: 28 }}>{s}</T.Chip>)}</div></div>
    <Head title="Assignment & follow-up" n={1} open><div style={wrap}><T.Chip on>Mine</T.Chip><T.Chip outline>Unassigned</T.Chip><T.Chip outline>Due today</T.Chip><T.Chip outline>Overdue</T.Chip><T.Chip outline>Snoozed</T.Chip><T.Chip outline>No next action</T.Chip></div></Head>
    <Head title="Identity & geography" n={1} open><div style={wrap}><T.Chip x>Delhi</T.Chip><T.Chip outline icon="plus">State</T.Chip><T.Chip outline icon="plus">City</T.Chip><T.Chip outline icon="plus">Market</T.Chip><T.Chip outline icon="plus">Broker</T.Chip><T.Chip outline icon="plus">Agency</T.Chip><T.Chip outline>Direct</T.Chip></div></Head>
    <Head title="Quality" open><div style={wrap}>{['Platinum', 'Gold', 'Silver'].map(t => <T.Chip key={t} outline>{t}</T.Chip>)}<T.Chip outline>Customer score ≥ 75</T.Chip><T.Chip outline>Payment score ≥ 70</T.Chip><T.Chip outline>GR ≤ 5 %</T.Chip></div></Head>
    <Head title="Taste" open><div style={{ display: 'grid', gridTemplateColumns: phone ? '1fr' : '1fr 1fr 1fr', gap: 10 }}>{[['High tier', 55], ['Mid tier', 30], ['Low tier', 10]].map(([k, v]) => <div key={k}><div style={{ display: 'flex', fontFamily: T.fontUI, fontSize: 11.5, color: T.ink3 }}><span>{k}</span><span style={{ flex: 1 }} /><b style={{ color: T.ink }}>≥ {v} %</b></div><div style={{ position: 'relative', height: 4, borderRadius: 2, background: T.chipBg, marginTop: 8 }}><span style={{ position: 'absolute', left: v + '%', right: 0, top: 0, bottom: 0, borderRadius: 2, background: T.accent }} /><span style={{ position: 'absolute', left: v + '%', top: '50%', width: 18, height: 18, borderRadius: 9, background: T.surface, border: `1.5px solid ${T.ink}`, transform: 'translate(-50%,-50%)' }} /></div></div>)}</div><Meta T={T} style={{ display: 'block', marginTop: 8 }}>confidence: at least 5 orders</Meta></Head>
    <Head title="Activity" /><Head title="Credit" />
  </>;
}
/* bills sort & filter (chips guideline 3C payments) */
function BillFilterBody({ T, phone }) {
  const Head = ({ title, n, open, children }) => <div style={{ borderTop: `1px solid ${T.line}` }}><div className="press" style={{ display: 'flex', alignItems: 'center', gap: 8, height: 42 }}><span style={{ fontFamily: T.fontUI, fontSize: 13.5, fontWeight: 500, color: T.ink }}>{title}</span>{n ? <span style={{ minWidth: 18, height: 18, padding: '0 5px', borderRadius: 9, background: T.accent, color: T.onAccent, fontFamily: T.fontUI, fontSize: 10.5, fontWeight: 600, display: 'grid', placeItems: 'center' }}>{n}</span> : null}<span style={{ flex: 1 }} /><Ic name={open ? 'chevron-up' : 'chevron-down'} size={15} color={T.ink3} /></div>{open && <div style={{ paddingBottom: 12 }}>{children}</div>}</div>;
  const wrap = { display: 'flex', gap: 6, flexWrap: 'wrap' };
  return <>
    <div style={{ paddingBottom: 10 }}><Meta T={T} style={{ display: 'block', marginBottom: 6, letterSpacing: '.08em', textTransform: 'uppercase' }}>Sort</Meta><div style={wrap}>{['Days overdue', 'Amount outstanding', 'Next action', 'Payment score'].map((s, i) => <T.Chip key={s} on={i === 0} outline={i !== 0} style={{ height: 28 }}>{s}</T.Chip>)}</div></div>
    <Head title="Stage" n={1} open><div style={wrap}>{PAY_STAGES.map(([s], i) => <T.Chip key={s} on={i === 1} outline={i !== 1}>{s}</T.Chip>)}<T.Chip outline>Snoozed</T.Chip></div></Head>
    <Head title="Bill" open><div style={wrap}><T.Chip outline>Over ₹50k</T.Chip><T.Chip outline>Due this week</T.Chip><T.Chip outline icon="calendar">Invoice date</T.Chip><T.Chip outline icon="book">Book · In-cabin</T.Chip></div></Head>
    <Head title="Customer risk" open><div style={wrap}><T.Chip outline>Payment score &lt; 60</T.Chip><T.Chip outline>Credit over 80 %</T.Chip><T.Chip outline>Also in Issue or worse</T.Chip><T.Chip outline>Platinum</T.Chip></div></Head>
    <Head title="Follow-up task" /><Head title="Automation" /><Head title="Broker / agency" n={1} />
  </>;
}
/* template editor: placeholders, preview, save as */
function TemplateBody({ T, phone }) {
  return <div>
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>{['Refill', 'New arrivals', 'Follow-up on samples', 'Clearance', 'Overdue reminder', 'Custom'].map((t, i) => <T.Chip key={t} on={i === 0} outline={i !== 0} style={{ height: 28 }}>{t}</T.Chip>)}</div>
    <div style={{ marginTop: 10, borderRadius: 14, border: `1px solid ${T.line2}`, background: T.surface, padding: '10px 12px', fontFamily: T.fontUI, fontSize: 13, color: T.ink, lineHeight: 1.5, minHeight: phone ? 110 : 130 }}>Namaste <span style={{ background: T.accentSoft, color: T.accent, borderRadius: 6, padding: '0 5px' }}>{'{first name}'}</span> ji, aapke pichhle order ke <span style={{ background: T.accentSoft, color: T.accent, borderRadius: 6, padding: '0 5px' }}>{'{what worked}'}</span> bahut chale. Refill ke liye <span style={{ background: T.accentSoft, color: T.accent, borderRadius: 6, padding: '0 5px' }}>{'{count}'}</span> naye designs bhej rahe hain, dekh lijiye.<span style={{ display: 'inline-block', width: 1.5, height: 14, background: T.accent, marginLeft: 1, verticalAlign: 'middle' }} /></div>
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}><Meta T={T} style={{ alignSelf: 'center' }}>Insert</Meta>{['{first name}', '{what worked}', '{count}', '{price}', '{catalogue link}', '{bill}', '{amount}', '{days}'].map(p => <CrTag key={p} T={T} tone="accent">{p}</CrTag>)}</div>
    <Sect T={T} style={{ margin: '12px 0 4px' }} right={<Meta T={T}>as Preeti sees it</Meta>}>Preview</Sect>
    <div style={{ padding: '8px 12px', borderRadius: '14px 14px 14px 4px', background: T.ok + '1A', border: `1px solid ${T.ok}44`, fontFamily: T.fontUI, fontSize: 12.5, color: T.ink, lineHeight: 1.45 }}>Namaste Preeti ji, aapke pichhle order ke 2798 aur 6002 bahut chale. Refill ke liye 6 naye designs bhej rahe hain, dekh lijiye.</div>
    <FRow T={T} label="Language"><Seg T={T} items={['Hinglish', 'Hindi', 'English']} on="Hinglish" small /></FRow>
    <FRow T={T} label="Save as"><Fld T={T} value="Refill · v2" w={160} /><Toggle T={T} on label="team template" /></FRow>
  </div>;
}
/* snooze menu: fixed periods, a date, a reason */
function SnoozeMenu({ T, phone }) {
  return <>
    {[['7 days', 'Mon 15/09'], ['14 days', 'Mon 22/09'], ['30 days', 'Wed 08/10'], ['Till next order', 'auto wakes']].map(([l, s], i) => <MenuRow key={l} T={T} icon="alarm-clock" on={i === 1} sub={s}>{l}</MenuRow>)}
    <MenuRow T={T} icon="calendar">Pick a date…</MenuRow>
    <div style={{ borderTop: `1px solid ${T.line}`, margin: '6px 0' }} />
    <Meta T={T} style={{ display: 'block', padding: '0 8px 4px' }}>Reason</Meta>
    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', padding: '0 6px 6px' }}>{['Asked to call later', 'Travelling', 'Stock on the way', 'Season over'].map((r, i) => <T.Chip key={r} on={i === 0} outline={i !== 0} style={{ height: 26, fontSize: 11.5 }}>{r}</T.Chip>)}</div>
    <Meta T={T} style={{ display: 'block', padding: '2px 8px 4px' }}>Snooze never changes days overdue or the stage.</Meta>
    <div style={{ display: 'flex', gap: 6, padding: '4px 6px 0' }}><span style={{ flex: 1 }} /><T.Btn small icon="alarm-clock" style={{ height: 32 }}>Snooze 14 d</T.Btn></div>
  </>;
}
/* grid sort menu */
const SortMenu = ({ T, on = 'Match strength', items = ['Match strength', 'Newest', 'Price ↑', 'Price ↓', 'Demand score', 'Best selling 30 d', 'Priority sale first'] }) => <>{items.map(s => <MenuRow key={s} T={T} on={s === on}>{s}</MenuRow>)}<div style={{ borderTop: `1px solid ${T.line}`, margin: '6px 0' }} /><MenuRow T={T} icon="bookmark">Save as the default for Preeti</MenuRow></>;
/* customer picker from the queue strip: the customers of this list step */
function CustomerPickerBody({ T, phone }) {
  const rows = [CRM_C[3], CRM_C[0], CRM_C[2], CRM_C[5], CRM_C[1], CRM_C[4]];
  return <div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 36, borderRadius: 18, background: T.bg2, padding: '0 12px' }}><Ic name="search" size={14} color={T.ink3} /><span style={{ fontFamily: T.fontUI, fontSize: 12.5, color: T.ink3, flex: 1 }}>Customer, city, broker</span><Meta T={T}>Refill due · Showcase</Meta></div>
    <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>{['This step', 'Whole list', 'All customers'].map((s, i) => <T.Chip key={s} on={i === 0} outline={i !== 0} style={{ height: 26, fontSize: 11.5 }}>{s}</T.Chip>)}</div>
    {rows.map((c, i) => <div key={c.id} className="press" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 4px', borderTop: i ? `1px solid ${T.line}` : 0, marginTop: i ? 0 : 6, background: i === 1 ? T.accentSoft : 'transparent', borderRadius: 8 }}><span style={{ width: 18, fontFamily: T.fontUI, fontSize: 11, color: T.ink3, fontVariantNumeric: 'tabular-nums' }}>{i + 2}</span><HeatDot T={T} h={c.heat} /><span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontUI, fontSize: 13, fontWeight: i === 1 ? 600 : 500, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</div><Meta T={T} style={{ display: 'block' }}>{c.city} · {c.tier}</Meta></span><NextPill T={T} c={c} small />{i === 1 && <Ic name="check" size={14} color={T.accent} />}</div>)}
  </div>;
}
/* picture viewer with add-to-packet */
function ViewerBody({ T, phone, code = '8337' }) {
  const t = crTile(code); const w = phone ? 362 : 420, h = phone ? 452 : 525;
  return <div style={{ display: 'flex', gap: phone ? 0 : 24, flexDirection: phone ? 'column' : 'row', alignItems: phone ? 'stretch' : 'flex-start' }}>
    <div style={{ position: 'relative', width: w, height: h, borderRadius: 18, overflow: 'hidden', background: T.photoBg, margin: phone ? '0 auto' : 0 }}><PickPhoto t={t} /><div style={{ position: 'absolute', left: 10, right: 10, top: 10, display: 'flex', gap: 6 }}><Hit T={T} icon="chevron-left" size={36} iconSize={16} style={veil()} /><span style={{ flex: 1 }} /><Hit T={T} icon="maximize-2" size={36} iconSize={16} style={veil()} /><Hit T={T} icon="chevron-right" size={36} iconSize={16} style={veil()} /></div><div style={{ position: 'absolute', left: 10, bottom: 10, display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', borderRadius: 14, ...veil(), fontFamily: T.fontUI, fontSize: 12 }}>Product photo · 2 of 5<span style={{ opacity: .6 }}>·</span>photoshoot 1 · video 1</div></div>
    <div style={{ flex: 1, minWidth: 0, marginTop: phone ? 12 : 0 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}><Num T={T} size={28}>{t.code}</Num><span style={{ flex: 1 }} /><PriceF v={t.price} size={22} font={T.fontSerif} color={T.ink} dim={T.ink3} /></div>
      <Meta T={T} style={{ display: 'block', marginTop: 2 }}>{t.cat} · Bridal · 3 colours · 8 in stock · 6 in production</Meta>
      <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>{t.reason && <CrTag T={T} tone="accent">{t.reason}</CrTag>}{t.tag && <CrTag T={T}>{t.tag}</CrTag>}<CrTag T={T}>Preeti bought 2798 in this range</CrTag></div>
      <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>{[['8337', '50% 12%'], ['8337', '50% 45%'], ['8337', '50% 75%'], ['8111', '50% 12%'], ['8433', '50% 12%']].map(([c, pos], i) => <span key={i} style={{ width: 52, height: 65, borderRadius: 8, overflow: 'hidden', background: T.photoBg, boxShadow: i === 1 ? `0 0 0 2px ${T.accent}` : 'none' }}><PickPhoto t={{ ...crTile(c), pos }} /></span>)}</div>
      <div style={{ display: 'flex', gap: 8, marginTop: 14, alignItems: 'center' }}><OutBtn T={T} icon="arrow-up-right">Product page</OutBtn><span style={{ flex: 1 }} /><T.Btn icon="check" style={{ height: 40 }}>In packet · remove</T.Btn></div>
    </div>
  </div>;
}
/* contact picker for Send to */
function ContactBody({ T, phone }) {
  const rows = [['users', 'Preeti · SRS group', 'WhatsApp group · 4 members', true], ['user', 'Preeti ji', '98152 23366 · owner', true], ['user', 'Manish', '98152 44121 · buyer', false], ['user', 'Harjeet Singh', 'broker · Harjeet Agency', false], ['mail', 'preeti.hub@gmail.com', 'e-mail · PDF sheet', false]];
  return <div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 36, borderRadius: 18, background: T.bg2, padding: '0 12px' }}><Ic name="search" size={14} color={T.ink3} /><span style={{ fontFamily: T.fontUI, fontSize: 12.5, color: T.ink3, flex: 1 }}>Name or number</span></div>
    <Meta T={T} style={{ display: 'block', margin: '10px 0 2px' }}>Saved for Preeti Fashion Hub · the tick remembers for next time</Meta>
    {rows.map(([ic, n, s, on], i) => <div key={n} style={{ borderTop: i ? `1px solid ${T.line}` : 0 }}><Check T={T} on={on}><span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Ic name={ic} size={14} color={T.ink3} />{n}<Meta T={T}>{s}</Meta></span></Check></div>)}
    <div style={{ display: 'flex', gap: 8, marginTop: 10 }}><Fld T={T} ph="Add a number or pick from the phone" icon="plus" /><OutBtn T={T} small icon="contact">Phone book</OutBtn></div>
    <FRow T={T} label="Default"><Seg T={T} items={['Group', 'Direct', 'Both']} on="Both" small /><Meta T={T}>for this customer</Meta></FRow>
  </div>;
}
/* export formats */
function ExportBody({ T, phone }) {
  return <div>
    {[['folder-archive', 'Pictures zip', '5 designs · 12 pictures · with logo · 8.4 MB', true], ['file-text', 'PDF sheet', 'A4 · 2 per row · prices on · design no · WhatsApp number', true], ['table-2', 'Excel with images', 'design no · price · colours · stock · picture column', false], ['link', 'Catalogue link', 'opens in customer mode · expires in 7 days · tracks opens', true], ['video', 'Video reel', '1 video · logo bottom right · 22 s', false]].map(([ic, n, s, on], i) => <div key={n} style={{ borderTop: i ? `1px solid ${T.line}` : 0 }}><Check T={T} on={on}><span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Ic name={ic} size={15} color={T.ink2} /><span><div>{n}</div><Meta T={T} style={{ display: 'block' }}>{s}</Meta></span></span></Check></div>)}
    <FRow T={T} label="Prices"><Seg T={T} items={['Show', 'Hide', 'Customer mode']} on="Show" small /></FRow>
    <FRow T={T} label="Picture size"><Seg T={T} items={['WhatsApp', 'Full', 'Print']} on="WhatsApp" small /></FRow>
    <div style={{ marginTop: 12, padding: '8px 10px', borderRadius: 12, background: T.surface2, border: `1px solid ${T.line}`, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2 }}>Downloads are logged on the packet history; the catalogue link keeps counting opens after sending.</div>
  </div>;
}
/* sent confirmation */
function SentBody({ T, phone }) {
  return <div style={{ textAlign: 'center', paddingTop: phone ? 6 : 10 }}>
    <span style={{ width: 56, height: 56, borderRadius: 28, background: T.ok + '22', color: T.ok, display: 'inline-grid', placeItems: 'center' }}><Ic name="check" size={28} sw={2.4} /></span>
    <div style={{ fontFamily: T.fontDisplay, fontSize: 22, fontWeight: 600, color: T.ink, marginTop: 10 }}>Packet sent · 5 designs</div>
    <Meta T={T} style={{ display: 'block', marginTop: 2 }}>09/09/26 · 11:42 · Refill template · logo bottom right</Meta>
    <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 12 }}>{CRM_SEL.map(code => <PickThumb key={code} T={T} t={crTile(code)} w={46} />)}</div>
    <div style={{ marginTop: 14, borderRadius: 14, border: `1px solid ${T.line}`, background: T.surface2, textAlign: 'left' }}>{[['Preeti · SRS group', 'delivered · 2 ticks', 'ok'], ['Preeti ji · 98152 23366', 'delivered', 'ok'], ['Catalogue link', 'not opened yet', 'muted']].map(([n, s, tone], i) => <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderTop: i ? `1px solid ${T.line}` : 0, fontFamily: T.fontUI, fontSize: 12.5 }}><Ic name={tone === 'ok' ? 'check-check' : 'clock'} size={14} color={tone === 'ok' ? T.ok : T.ink3} /><span style={{ flex: 1 }}>{n}</span><Meta T={T}>{s}</Meta></div>)}</div>
    <div style={{ marginTop: 12, padding: '10px 12px', borderRadius: 14, background: T.accentSoft, border: `1px solid ${T.accentLine}`, textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ flex: 1, fontFamily: T.fontUI, fontSize: 12.5, color: T.ink }}>Mark the Showcase step done for Preeti? Next up: Ambika Enterprises.</span><OutBtn T={T} small>Not yet</OutBtn><T.Btn small icon="arrow-right" style={{ height: 32 }}>Done · next</T.Btn></div>
  </div>;
}
/* log payment */
function LogPaymentBody({ T, phone }) {
  const bills = CRM_BILLS.filter(b => b.c === 'c3');
  return <div>
    <FRow T={T} label="Amount received" top={4}><Fld T={T} value="₹ 39,955" w={140} /><Meta T={T}>of ₹1,19,235 open</Meta></FRow>
    <FRow T={T} label="On"><Fld T={T} value="05/09/26" icon="calendar" w={130} /><Seg T={T} items={['NEFT', 'UPI', 'Cheque', 'Cash']} on="NEFT" small /></FRow>
    <FRow T={T} label="Reference"><Fld T={T} value="UTR 6231…9" w={160} /><Fld T={T} ph="Bank · HDFC current" caret /></FRow>
    <Sect T={T} style={{ margin: '12px 0 4px' }} right={<Seg T={T} items={['Oldest first', 'Pick bills', 'On account']} on="Pick bills" small />}>Allocate to bills</Sect>
    <div style={{ borderRadius: 12, border: `1px solid ${T.line}`, background: T.surface2, padding: '0 10px' }}>{bills.map((b, i) => <div key={b.no} style={{ borderTop: i ? `1px solid ${T.line}` : 0 }}><Check T={T} on={i === 0} sub={money(b.amt)}><span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Mono T={T} size={11.5}>{b.no}</Mono><Pill T={T} small tone={b.stage >= 3 ? 'danger' : 'warn'}>{PAY_STAGES[b.stage][0]}</Pill><Meta T={T}>{b.over} d</Meta></span></Check></div>)}</div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10, padding: '8px 10px', borderRadius: 12, background: T.ok + '1A', border: `1px solid ${T.ok}44`, fontFamily: T.fontUI, fontSize: 12, color: T.ink }}><Ic name="info" size={13} color={T.ok} />SI-2240 clears and leaves Overdue · ₹0 stays on account · Busy receipt voucher is raised on save</div>
    <FRow T={T} label="Note"><Fld T={T} ph="cheque by Friday for SI-2231" /></FRow>
  </div>;
}
/* escalate */
function EscalateBody({ T, phone }) {
  return <div>
    <FRow T={T} label="Escalate to" top={4}><T.Chip on icon="user">Admin · Shubham</T.Chip><T.Chip outline icon="briefcase">Suman Agency</T.Chip><T.Chip outline icon="user">Broker · Suman Traders</T.Chip></FRow>
    <FRow T={T} label="Bills"><T.Chip on>SI-2240 · ₹39,955</T.Chip><T.Chip on>SI-2231 · ₹17,980</T.Chip><T.Chip outline>SI-2170 · already in Escalate</T.Chip></FRow>
    <FRow T={T} label="Reason"><Seg T={T} items={['No response', 'Disputed', 'Promised, not paid', 'Other']} on="Promised, not paid" small={phone} /></FRow>
    <FRow T={T} label="Note"><Fld T={T} value="cheque promised by Friday twice · no reply since 03/09" /></FRow>
    <Sect T={T} style={{ margin: '12px 0 4px' }}>What happens</Sect>
    {[['Both bills move to Escalate now', 'the 45-day wait is skipped'], ['Admin gets the customer card with scores, bills, calls and messages', 'Home › Approvals'], ['Weekly reminders pause until admin acts', 'automation off on these bills'], ['Broker report shows the escalation in its Issue section', 'next Monday 08:00']].map(([a, b]) => <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderTop: `1px solid ${T.line}`, fontFamily: T.fontUI, fontSize: 12.5 }}><Ic name="corner-down-right" size={13} color={T.ink3} /><span style={{ flex: 1 }}>{a}</span><Meta T={T}>{b}</Meta></div>)}
  </div>;
}
/* start a follow-up for a customer */
function StartFollowBody({ T, phone }) {
  return <div>
    <FRow T={T} label="Customer" top={4}><Fld T={T} value="Preeti Fashion Hub" icon="user" w={220} /><Meta T={T}>already on Refill · Showcase</Meta></FRow>
    <FRow T={T} label="Journey"><Seg T={T} items={['Refill', 'New samples', 'Cold revival', 'Custom']} on="New samples" small={phone} /></FRow>
    <FRow T={T} label="Start on"><Fld T={T} value="Reach out" caret w={140} /><Fld T={T} value="Today" icon="calendar" caret w={120} /></FRow>
    <FRow T={T} label="Owner"><Fld T={T} value="Rohan Mehta" icon="user" caret w={170} /></FRow>
    <FRow T={T} label="Attach"><T.Chip outline icon="images">8 new samples</T.Chip><T.Chip outline icon="plus">Pick designs</T.Chip></FRow>
    <FRow T={T} label="Note"><Fld T={T} ph="why now · what to say" /></FRow>
    <div style={{ marginTop: 12, padding: '8px 10px', borderRadius: 12, background: T.surface2, border: `1px solid ${T.line}`, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2 }}>A customer can be on two journeys at once; the Today list shows both actions, oldest first.</div>
  </div>;
}
/* new journey */
function NewJourneyBody({ T, phone }) {
  return <div>
    <FRow T={T} label="Name" top={4}><Fld T={T} value="Wedding season showcase" /></FRow>
    <FRow T={T} label="Runs over"><Seg T={T} items={['Customers', 'Bills', 'Sale orders']} on="Customers" small /></FRow>
    <FRow T={T} label="Trigger"><Fld T={T} value="Added to a list" caret w={170} /><Fld T={T} value="Wedding ’26" caret w={140} /></FRow>
    <FRow T={T} label="Start from"><Seg T={T} items={['Blank', 'Copy Refill', 'Copy Payments']} on="Copy Refill" small /></FRow>
    <FRow T={T} label="Tier frequency"><Fld T={T} value="Platinum 14 d" w={120} /><Fld T={T} value="Gold 21 d" w={110} /><Fld T={T} value="Silver 30 d" w={110} /></FRow>
    <FRow T={T} label="Owner"><Fld T={T} value="Sales team" icon="users" caret w={160} /><Toggle T={T} label="automation on" /></FRow>
  </div>;
}
/* publish a journey version */
function PublishBody({ T, phone }) {
  return <div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}><CrTag T={T}>v3 · live</CrTag><Ic name="arrow-right" size={14} color={T.ink3} /><CrTag T={T} tone="accent">v4 · draft</CrTag><span style={{ flex: 1 }} /><Meta T={T}>edited today by Rohan</Meta></div>
    <Sect T={T} style={{ margin: '12px 0 4px' }}>Changes</Sect>
    {[['Overdue', 'call after 7 d → 5 d'], ['Issue', 'two calls a week → three'], ['Escalate', 'wait 14 d → 10 d'], ['Broker report', 'Issue section now includes the note']].map(([a, b]) => <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderTop: `1px solid ${T.line}`, fontFamily: T.fontUI, fontSize: 12.5 }}><span style={{ width: 90, fontWeight: 600 }}>{a}</span><span style={{ flex: 1, color: T.ink2 }}>{b}</span></div>)}
    <Sect T={T} style={{ margin: '12px 0 4px' }}>30 bills on v3</Sect>
    <Seg T={T} items={['Move to v4 now', 'Finish on v3', 'Ask per stage']} on="Finish on v3" small={phone} />
    <div style={{ marginTop: 10, padding: '8px 10px', borderRadius: 12, background: T.surface2, border: `1px solid ${T.line}`, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2 }}>New bills enter v4 from the next dispatch confirmation. v3 stays readable in History.</div>
  </div>;
}
/* test run: what would fire when, for one customer */
function TestRunBody({ T, phone }) {
  const rows = [['12/07', 'Dispatch confirmed', 'SI-2240 · ₹39,955', 'zap'], ['11/08', 'Payment due · WhatsApp', 'auto · bill pdf', 'message-circle'], ['11/08', 'Paid?', 'no', 'git-fork'], ['18/08', 'Overdue · WhatsApp reminder', 'auto · weekly from here', 'message-circle'], ['25/08', 'Overdue · call', 'task for Accounts · Neha', 'phone'], ['10/09', 'Issue · 2 calls a week', 'task', 'phone'], ['24/09', 'Escalate · admin', 'approval card', 'user'], ['09/10', 'RED · hard approach list', '', 'flag']];
  return <div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Fld T={T} value="Ambika Enterprises · SI-2240" icon="user" caret w={260} /><Meta T={T}>paid on: never (simulation)</Meta></div>
    <div style={{ marginTop: 10 }}>{rows.map(([d, a, s, ic], i) => <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderTop: i ? `1px solid ${T.line}` : 0 }}><Mono T={T} size={11.5}>{d}</Mono><span style={{ width: 24, height: 24, borderRadius: 7, background: i === 7 ? T.danger : T.chipBg, color: i === 7 ? '#fff' : T.ink2, display: 'grid', placeItems: 'center' }}><Ic name={ic} size={12} /></span><span style={{ flex: 1, fontFamily: T.fontUI, fontSize: 12.5, color: T.ink }}>{a}</span><Meta T={T}>{s}</Meta></div>)}</div>
  </div>;
}
/* report schedule */
function ScheduleBody({ T, phone }) {
  return <div>
    <FRow T={T} label="Every" top={4}><Seg T={T} items={['Mon', 'Tue', 'Wed', 'Thu', 'Fri']} on="Mon" small /><Fld T={T} value="08:00" icon="clock" w={90} /></FRow>
    <FRow T={T} label="Channel"><Seg T={T} items={['WhatsApp', 'E-mail', 'Both']} on="WhatsApp" small /><Meta T={T}>PDF attached</Meta></FRow>
    <FRow T={T} label="Sections"><Toggle T={T} on label="Payment due" /><Toggle T={T} on label="Overdue" /><Toggle T={T} on label="Issue" /><Toggle T={T} label="Escalate" /></FRow>
    <FRow T={T} label="Per agency"><Fld T={T} value="Suman Agency · also cc broker" caret /></FRow>
    <FRow T={T} label="Skip when"><Toggle T={T} on label="nothing outstanding" /><Toggle T={T} label="agency paused" /></FRow>
  </div>;
}
/* follow-up history rows and today rows */
const FU_HIST = [['09/09', 'Preeti Fashion Hub', 'Showcase', 'message-circle', 'Packet · 5 designs', 'Rohan'], ['09/09', 'Ambika Enterprises', 'Reach out', 'phone', 'No answer · retry tomorrow', 'Rohan'], ['08/09', 'Nalli Fashion Mart', 'Order', 'receipt-text', 'SO-3455 raised · 5 pcs', 'Neha'], ['08/09', 'A V Creation', 'Reach out', 'message-circle', 'Refill message · opened', 'Rohan'], ['06/09', 'Rangoli Ethnic Wear', 'Reach out', 'phone', 'Reached · call later', 'Rohan'], ['05/09', 'Aneri Boutique', 'Reach out', 'alarm-clock', 'Snoozed 14 d · travelling', 'Neha'], ['04/09', 'Preeti Fashion Hub', 'Reach out', 'phone', 'Reached · asked for Blush 6002', 'Rohan'], ['02/09', 'Nalli Fashion Mart', 'Showcase', 'message-circle', 'Packet · 8 designs · replied', 'Neha']];
function HistoryRows({ T, phone, n }) {
  return <div>{FU_HIST.slice(0, n).map((r, i) => <div key={i} className="press" style={{ display: 'grid', gridTemplateColumns: phone ? '44px 1fr auto' : '56px 190px 90px 1fr 70px', gap: 8, alignItems: 'center', padding: '8px 10px', borderTop: i ? `1px solid ${T.line}` : 0, fontFamily: T.fontUI, fontSize: 12.5, color: T.ink }}><Mono T={T} size={11.5}>{r[0]}</Mono>{phone ? <span style={{ minWidth: 0 }}><div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 500 }}>{r[1]}</div><Meta T={T} style={{ display: 'block' }}><Ic name={r[3]} size={11} /> {r[4]} · {r[2]}</Meta></span> : <><span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 500 }}>{r[1]}</span><CrTag T={T}>{r[2]}</CrTag><span style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}><Ic name={r[3]} size={13} color={T.ink3} /><span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: T.ink2 }}>{r[4]}</span></span></>}<Meta T={T}>{r[5]}</Meta></div>)}</div>;
}
function TodayRows({ T, phone }) {
  const groups = [['Overdue', [CRM_C[1], CRM_C[4]], 'danger'], ['Today', [CRM_C[0], CRM_C[2]], 'accent'], ['Coming back from snooze', [CRM_C[4]], 'blue']];
  return <div>{groups.map(([g, cs, tone]) => <div key={g}><div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 4px 4px' }}><span style={{ width: 8, height: 8, borderRadius: 4, background: T[tone] }} /><span style={{ fontFamily: T.fontUI, fontSize: 12, fontWeight: 600, color: T.ink }}>{g}</span><Meta T={T}>{cs.length}</Meta></div>{cs.map(c => <div key={c.id + g} className="press" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 14, background: T.surface, border: `1px solid ${T.line}`, marginBottom: 6 }}><HeatDot T={T} h={c.heat} /><span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontUI, fontSize: 13, fontWeight: 500, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</div><Meta T={T} style={{ display: 'block' }}>{CRM_STEPS[c.step]} · Refill · {c.chan === 'phone' ? 'call' : 'WhatsApp'} · owner Rohan</Meta></span>{!phone && <CrTag T={T}>{c.att || 3} designs</CrTag>}<NextPill T={T} c={c} small /><Hit T={T} icon={c.chan} size={30} iconSize={14} style={{ background: T.chipBg }} /></div>)}</div>)}</div>;
}
/* bills table and payments customers list */
function BillsTable({ T }) {
  const cols = ['Bill', 'Customer · broker', 'Date', 'Due', 'Days', 'Stage', 'Amount', 'Next action'];
  return <div style={{ borderRadius: 18, border: `1px solid ${T.line}`, background: T.surface, overflow: 'hidden' }}>
    <div style={{ display: 'grid', gridTemplateColumns: '76px 150px 66px 66px 44px 150px 76px 1fr', gap: 8, padding: '8px 12px', borderBottom: `1px solid ${T.line2}`, background: T.surface2 }}>{cols.map(h => <span key={h} style={{ fontFamily: T.fontUI, fontSize: 10.5, letterSpacing: '.06em', textTransform: 'uppercase', color: T.ink3 }}>{h}</span>)}</div>
    {CRM_BILLS.map((b, i) => { const c = crC(b.c); return <div key={b.no} className="press" style={{ display: 'grid', gridTemplateColumns: '76px 150px 66px 66px 44px 150px 76px 1fr', gap: 8, alignItems: 'center', padding: '7px 12px', borderTop: i ? `1px solid ${T.line}` : 0, background: b.no === 'SI-2240' ? T.accentSoft : 'transparent', fontFamily: T.fontUI, fontSize: 12.5, color: T.ink }}><Mono T={T} size={11.5}>{b.no}</Mono><span style={{ minWidth: 0 }}><div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</div><Meta T={T} style={{ display: 'block' }}>{b.broker}</Meta></span><Meta T={T}>{b.date}</Meta><Meta T={T}>{b.due}</Meta><span style={{ fontWeight: 600, color: overTone(T, b.over), fontVariantNumeric: 'tabular-nums' }}>{b.over || '—'}</span><span style={{ display: 'flex', gap: 4 }}><Pill T={T} small tone={b.stage >= 3 ? 'danger' : b.stage >= 1 ? 'warn' : 'muted'} fill={b.stage === 4}>{PAY_STAGES[b.stage][0]}</Pill>{b.snooze && <Pill T={T} small tone="blue">Snoozed</Pill>}</span><span style={{ fontFamily: T.fontSerif, fontSize: 14, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{money(b.amt)}</span><Meta T={T}>{b.stage === 0 ? 'auto message on due' : b.stage === 1 ? 'weekly reminder · call Thu' : b.stage === 2 ? 'call Tue · Fri' : b.stage === 3 ? 'admin call' : 'hard approach list'}</Meta></div>; })}
  </div>;
}
function PayCustomerRows({ T, phone }) {
  const rows = [[CRM_C[2], 3, 'Escalate', '2 Overdue · 1 Escalate'], [CRM_C[4], 3, 'RED', '1 Due · 1 Issue · 1 RED'], [CRM_C[1], 2, 'Overdue', '1 Due · 1 Overdue'], [CRM_C[0], 1, 'Payment due', '1 Due'], [CRM_C[5], 1, 'Payment due', '1 Due'], [CRM_C[3], 1, 'Payment due', '1 Due']];
  return <div style={{ borderRadius: 18, border: `1px solid ${T.line}`, background: T.surface, overflow: 'hidden' }}>{rows.map(([c, n, worst, split], i) => { const bills = CRM_BILLS.filter(b => b.c === c.id); const amt = bills.reduce((s, b) => s + b.amt, 0) || c.open; return <div key={c.id} className="press" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: phone ? '9px 12px' : '9px 14px', borderTop: i ? `1px solid ${T.line}` : 0, background: i === 0 ? T.accentSoft : 'transparent' }}><Monogram T={T} c={c} s={26} /><span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontUI, fontSize: 13, fontWeight: 500, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</div><Meta T={T} style={{ display: 'block' }}>{n} bills · {split}{phone ? '' : ' · ' + c.broker}</Meta></span>{!phone && <Gauge T={T} v={c.pay} s={28} />}<Pill T={T} small tone={worst === 'RED' || worst === 'Escalate' ? 'danger' : worst === 'Overdue' ? 'warn' : 'muted'} fill={worst === 'RED'}>{worst}</Pill><span style={{ width: phone ? 64 : 76, textAlign: 'right', fontFamily: T.fontSerif, fontSize: 14, fontWeight: 600, color: T.ink, fontVariantNumeric: 'tabular-nums' }}>{money(amt)}</span>{!phone && <Hit T={T} icon="phone" size={30} iconSize={14} style={{ background: T.chipBg }} />}</div>; })}</div>;
}
/* column chooser for the customers list */
function ColumnsBody({ T, phone }) {
  const groups = [['Identity', ['Customer', 'City · market', 'Tier', 'Heat', 'Segment', 'GST category']], ['Follow-up', ['Next action', 'Step', 'Owner', 'Last contact']], ['Money', ['Open book', 'FY billing', 'Δ %', 'Outstanding', 'Credit used']], ['Quality', ['Score', 'Payment score', 'GR ratio', 'Market rating']], ['People', ['Broker · agency', 'Phone', 'WhatsApp group']], ['Tags', ['Tags', 'Taste', 'Price bands', 'Colours']]];
  const on = ['Customer', 'City · market', 'Tier', 'Score', 'Heat', 'Open book', 'Last order', 'FY billing', 'Δ %', 'Broker · agency', 'Tags', 'Next action'];
  return <div style={{ display: 'grid', gridTemplateColumns: phone ? '1fr' : '1fr 1fr 1fr', gap: phone ? 4 : 12 }}>{groups.map(([g, cols]) => <div key={g} style={{ padding: '8px 12px', borderRadius: 14, background: T.surface2, border: `1px solid ${T.line}` }}><div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}><Ic name="grip-vertical" size={13} color={T.ink3} /><span style={{ fontFamily: T.fontUI, fontSize: 12.5, fontWeight: 600, color: T.ink }}>{g}</span></div>{cols.map(c => <Check key={c} T={T} on={on.includes(c)}>{c}</Check>)}</div>)}</div>;
}
/* dossier tabs: invoices & payments, shipments, returns, growth */
function DossierInvoices({ T, phone, moneyOn = true }) {
  const rows = [['SI-2301', '10/09/26', 24975, 'Payment due', '04/10/26'], ['SI-2288', '26/08/26', 31965, 'Paid', '03/09/26 · UTR 6231'], ['SI-2265', '02/08/26', 41955, 'Paid', '30/08/26 · cheque'], ['SI-2231', '10/07/26', 55940, 'Paid', '05/08/26 · NEFT'], ['SI-2196', '21/06/26', 26970, 'Paid', '18/07/26 · NEFT']];
  return <div style={{ padding: phone ? 0 : '10px 12px' }}>
    <div style={{ display: 'flex', gap: 8 }}><T.Kpi small label="Open" value={moneyOn ? '₹24,975' : '1 bill'} sub="due 04/10" /><T.Kpi small label="Paid this FY" value={moneyOn ? '₹18.4L' : '38 bills'} sub="avg 26 d to pay" tone="ok" /><T.Kpi small label="Overdue days" value="0" sub="last 12 months" /></div>
    <div style={{ marginTop: 10, borderRadius: 12, border: `1px solid ${T.line}`, background: T.surface2, overflow: 'hidden' }}>{rows.map((r, i) => <div key={r[0]} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', borderTop: i ? `1px solid ${T.line}` : 0, fontFamily: T.fontUI, fontSize: 12 }}><Mono T={T} size={11.5}>{r[0]}</Mono><span style={{ flex: 1, minWidth: 0 }}><Meta T={T} style={{ display: 'block' }}>{r[1]} · {r[4]}</Meta></span><Pill T={T} small tone={r[3] === 'Paid' ? 'ok' : 'muted'}>{r[3]}</Pill>{moneyOn && <span style={{ width: 62, textAlign: 'right', fontFamily: T.fontSerif, fontSize: 13.5, fontWeight: 600, color: T.ink }}>{money(r[2])}</span>}</div>)}</div>
    <div style={{ marginTop: 10, padding: '8px 10px', borderRadius: 12, background: T.surface2, border: `1px solid ${T.line}` }}><div style={{ display: 'flex', alignItems: 'baseline' }}><Meta T={T}>Sale vs payments · 12 months</Meta><span style={{ flex: 1 }} /><Legend T={T} items={[['sale', T.accent], ['paid', T.ok]]} /></div><div style={{ marginTop: 6 }}><LineG T={T} series={[{ pts: [8, 12, 10, 14, 13, 18, 16, 21, 19, 24, 22, 26], color: T.accent, width: 2 }, { pts: [6, 10, 9, 12, 12, 15, 15, 19, 18, 21, 21, 23], color: T.ok, width: 1.8, dash: true }]} w={220} h={56} area /></div></div>
  </div>;
}
function DossierShipments({ T, phone }) {
  const rows = [['SH-0412', '27/08/26', 'Punjab Freight', 2, 7, 'delivered 30/08', 'ok'], ['SH-0388', '03/08/26', 'Punjab Freight', 3, 9, 'delivered 06/08', 'ok'], ['SH-0350', '11/07/26', 'Punjab Freight', 4, 12, 'delivered 14/07', 'ok'], ['SH-0301', '22/06/26', 'Delhivery', 2, 6, 'returned 1 box', 'warn']];
  return <div style={{ padding: phone ? 0 : '10px 12px' }}>
    <div style={{ display: 'flex', gap: 8 }}><T.Kpi small label="Shipments" value="14" sub="this FY" /><T.Kpi small label="Avg delivery" value="3.2 d" sub="Punjab Freight" tone="ok" /><T.Kpi small label="Boxes" value="34" sub="0 lost" /></div>
    <div style={{ marginTop: 10, borderRadius: 12, border: `1px solid ${T.line}`, background: T.surface2, overflow: 'hidden' }}>{rows.map((r, i) => <div key={r[0]} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', borderTop: i ? `1px solid ${T.line}` : 0, fontFamily: T.fontUI, fontSize: 12 }}><Mono T={T} size={11.5}>{r[0]}</Mono><span style={{ flex: 1, minWidth: 0 }}><div style={{ color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r[2]} · {r[3]} boxes · {r[4]} pcs</div><Meta T={T} style={{ display: 'block' }}>{r[1]} · {r[5]}</Meta></span><Ic name={r[6] === 'ok' ? 'circle-check' : 'triangle-alert'} size={15} color={r[6] === 'ok' ? T.ok : T.warn} /><Hit T={T} icon="file-text" size={28} iconSize={13} style={{ background: T.chipBg }} /></div>)}</div>
    <FRow T={T} label="Transport"><Fld T={T} value="Punjab Freight · default" caret /><OutBtn T={T} small icon="phone">Call</OutBtn></FRow>
  </div>;
}
function DossierReturns({ T, phone, moneyOn = true }) {
  const rows = [['CN-0112', '04/09/26', 'SI-2288', 2, 7, 9990, 'Colour mismatch · Lilac', 'Approved'], ['CN-0088', '02/07/26', 'SI-2231', 1, 12, 4995, 'Damaged in transit', 'Approved'], ['CN-0061', '14/05/26', 'SI-2170', 1, 8, 5495, 'Wrong size', 'Approved']];
  return <div style={{ padding: phone ? 0 : '10px 12px' }}>
    <div style={{ display: 'flex', gap: 8 }}><T.Kpi small label="GR ratio" value="4 %" sub="4 of 96 pcs" tone="ok" /><T.Kpi small label="Credit notes" value="3" sub={moneyOn ? '₹20,480' : 'this FY'} /><T.Kpi small label="Top reason" value="Colour" sub="2 of 3" /></div>
    <div style={{ marginTop: 10, borderRadius: 12, border: `1px solid ${T.line}`, background: T.surface2, overflow: 'hidden' }}>{rows.map((r, i) => <div key={r[0]} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', borderTop: i ? `1px solid ${T.line}` : 0, fontFamily: T.fontUI, fontSize: 12 }}><Mono T={T} size={11.5}>{r[0]}</Mono><span style={{ flex: 1, minWidth: 0 }}><div style={{ color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r[3]} of {r[4]} pcs · {r[6]}</div><Meta T={T} style={{ display: 'block' }}>{r[1]} · against {r[2]}</Meta></span><Pill T={T} small tone="ok">{r[7]}</Pill>{moneyOn && <span style={{ width: 58, textAlign: 'right', fontFamily: T.fontSerif, fontSize: 13.5, fontWeight: 600, color: T.ink }}>{money(r[5])}</span>}</div>)}</div>
    <div style={{ marginTop: 10, padding: '8px 10px', borderRadius: 12, background: T.surface2, border: `1px solid ${T.line}`, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2 }}>Returned designs are excluded from Recommended for 90 days unless the reason was transit damage.</div>
  </div>;
}
function DossierGrowth({ T, phone, moneyOn = true }) {
  return <div style={{ padding: phone ? 0 : '10px 12px' }}>
    <div style={{ display: 'flex', gap: 8 }}><T.Kpi small label="FY billing" value={moneyOn ? '₹18.7L' : '96 pcs'} sub="+22 % vs last FY" tone="ok" /><T.Kpi small label="Orders" value="38" sub="avg 26 d apart" /><T.Kpi small label="Share of wallet" value="34 %" sub="est. · 3 suppliers" /></div>
    <div style={{ marginTop: 10, padding: '8px 10px', borderRadius: 12, background: T.surface2, border: `1px solid ${T.line}` }}><div style={{ display: 'flex', alignItems: 'baseline' }}><Meta T={T}>Monthly billing · this FY vs last</Meta><span style={{ flex: 1 }} /><Legend T={T} items={[['this FY', T.accent], ['last FY', T.ink3]]} /></div><div style={{ marginTop: 6 }}><LineG T={T} series={[{ pts: [9, 14, 12, 16, 15, 20, 18, 24, 21, 26, 24, 28], color: T.accent, width: 2 }, { pts: [8, 11, 10, 12, 12, 15, 14, 17, 16, 19, 18, 21], color: T.ink3, width: 1.6, dash: true }]} w={220} h={64} area /></div></div>
    <div style={{ display: 'flex', gap: 10, marginTop: 10, alignItems: 'center', padding: '8px 10px', borderRadius: 12, background: T.surface2, border: `1px solid ${T.line}` }}><Donut T={T} parts={[{ v: 55, color: T.accent }, { v: 35, color: T.ink2 }, { v: 10, color: T.ink3 }]} size={64} thick={9} center="55" /><span style={{ flex: 1 }}><Meta T={T} style={{ display: 'block' }}>Tier appetite · moving up</Meta><Legend T={T} items={[['high', T.accent, '55 %'], ['mid', T.ink2, '35 %'], ['low', T.ink3, '10 %']]} /><Meta T={T} style={{ display: 'block', marginTop: 4 }}>high tier was 38 % last FY</Meta></span></div>
    <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}><CrTag T={T} tone="accent">Bridal season buyer</CrTag><CrTag T={T}>Lehenga 62 %</CrTag><CrTag T={T}>₹6–9k rising</CrTag><CrTag T={T}>Repeat on 2798 · 6002</CrTag></div>
  </div>;
}
/* logo on all pictures */
function LogoAllBody({ T, phone }) {
  const pics = [['8337', 'br', 'product'], ['2798', 'br', 'product'], ['8111', 'br', 'photoshoot'], ['8190', 'bl', 'photoshoot'], ['8433', 'br', 'product'], ['8337', 'tr', 'video frame']];
  return <div style={{ display: 'grid', gridTemplateColumns: phone ? 'repeat(3, 1fr)' : 'repeat(6, 1fr)', gap: 10 }}>{pics.map(([c, pos, kind], i) => <div key={i}><LogoStage T={T} t={crTile(c)} w={phone ? 112 : 118} h={phone ? 140 : 148} pos={pos} dark={c !== '8321'} /><div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 5 }}><Meta T={T} style={{ flex: 1 }}>{c} · {kind}</Meta>{i < 3 ? <Ic name="circle-check" size={13} color={T.ok} /> : <Ic name="circle" size={13} color={T.ink3} />}</div></div>)}</div>;
}
/* the Refill customer journey for the builder's second tab */
const JN2 = [
  { id: 't', x: 18, y: 140, kind: 'trigger', title: 'Added to list', sub: 'Refill due · 45 d since last order' },
  { id: 's1', x: 188, y: 140, kind: 'step', title: 'Reach out', sub: 'WhatsApp · Refill template', chan: 'message-circle', on: true },
  { id: 'w1', x: 358, y: 140, kind: 'wait', title: 'Wait 3 d', sub: 'or reply' },
  { id: 's2', x: 488, y: 140, kind: 'step', title: 'Showcase', sub: 'packet · 6 designs · call', chan: 'send' },
  { id: 'b1', x: 658, y: 140, kind: 'branch', title: 'Ordered?', sub: 'sale order raised' },
  { id: 'e', x: 658, y: 18, kind: 'end', title: 'Done', sub: 'back in 45 d' },
  { id: 's3', x: 658, y: 280, kind: 'step', title: 'Order', sub: 'cart with them · in-cabin or WhatsApp book', chan: 'receipt-text' },
  { id: 'w2', x: 488, y: 280, kind: 'wait', title: 'Wait 7 d', sub: 'then Confirm' },
  { id: 's4', x: 318, y: 280, kind: 'step', title: 'Confirm', sub: 'dispatch done · ask what worked', chan: 'phone' },
  { id: 's5', x: 148, y: 280, kind: 'step', title: 'Cold revival', sub: 'no reply twice · 30 d', chan: 'snowflake' },
];
const JE2 = [['t', 's1'], ['s1', 'w1'], ['w1', 's2'], ['s2', 'b1'], ['b1', 'e', 'yes'], ['b1', 's3', 'no'], ['s3', 'w2'], ['w2', 's4'], ['s4', 's5']];

/* ── web screens ── */
const CRM_FU_TABS = [['Journey board', null, 'kanban'], ['Today', 7, 'sun'], ['History', null, 'history']];
const fuRight = (T) => <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><T.Chip on style={{ height: 26, fontSize: 11.5 }}>Mine</T.Chip><T.Chip outline style={{ height: 26, fontSize: 11.5 }}>Due today</T.Chip><T.Chip outline style={{ height: 26, fontSize: 11.5 }}>Overdue</T.Chip><T.Chip outline style={{ height: 26, fontSize: 11.5 }}>Snoozed</T.Chip></span>;
function WebCrFollowShell({ T, active = 'Journey board', pane, paneTitle, overlay, children, crumb }) {
  return <WebShell3 T={T} module="CRM" crumb={crumb || ['CRM', 'Follow-ups', active]} section="Follow-ups" seg={CRM_SEG} active="Follow-ups" tabs={CRM_TABS('f')} paneTitle={paneTitle} pane={pane} overlay={overlay}>
    <ViewTabs T={T} tabs={CRM_FU_TABS} active={active} right={fuRight(T)} />
    {children}
  </WebShell3>;
}
/* Today tab */
function WebCrFollowToday({ T }) {
  return <WebCrFollowShell T={T} active="Today" paneTitle="Preeti Fashion Hub" pane={<div style={{ padding: '10px 12px', height: '100%', overflow: 'hidden' }}><StepWork T={T} c={CRM_C[0]} /></div>}>
    <CrListBar T={T} active="Today’s to-do" right={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Meta T={T}>7 actions · 2 overdue · 1 waking from snooze</Meta><T.Chip outline icon="arrow-down-up" style={{ height: 28 }}>Oldest first</T.Chip><IconBtn2 T={T} icon="sliders-horizontal" /></span>} />
    <div style={{ padding: '4px 24px 0', flex: 1, minHeight: 0, overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}><div><TodayRows T={T} /></div><div style={{ paddingTop: 10 }}><div style={{ padding: 12, borderRadius: 18, background: T.surface2, border: `1px solid ${T.line}` }}><div style={{ display: 'flex', alignItems: 'baseline' }}><span style={{ fontFamily: T.fontDisplay, fontSize: 16, fontWeight: 600 }}>This week</span><span style={{ flex: 1 }} /><Meta T={T}>Mon–Sat</Meta></div><BarsV T={T} data={[9, 7, 8, 7, 6, 4]} w={300} h={70} color={[T.accent, T.accentLine, T.accentLine, T.accentLine, T.accentLine, T.accentLine]} labels={['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Mon']} /></div><div style={{ display: 'flex', gap: 8, marginTop: 10 }}><T.Kpi small label="Done today" value="3" sub="of 7" tone="ok" /><T.Kpi small label="Reached" value="2" sub="1 no answer" /><T.Kpi small label="Packets" value="1" sub="5 designs" /></div></div></div>
  </WebCrFollowShell>;
}
/* History tab */
function WebCrFollowHistory({ T }) {
  return <WebCrFollowShell T={T} active="History" paneTitle="Preeti Fashion Hub" pane={<div style={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}><CustTabs T={T} tab="Info" /><div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}><CustPane T={T} c={CRM_C[0]} /></div></div>}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 24px 0' }}><T.Chip icon="search" outline>Customer, step, outcome</T.Chip><T.Chip icon="calendar" x outline>Last 30 days</T.Chip>{['All', 'Calls', 'WhatsApp', 'Packets', 'Orders', 'Snoozes'].map((q, i) => <T.Chip key={q} on={i === 0} outline={i !== 0} style={{ height: 28 }}>{q}</T.Chip>)}<span style={{ flex: 1 }} /><Meta T={T}>118 activities · 2 people</Meta><IconBtn2 T={T} icon="download" /></div>
    <div style={{ margin: '12px 24px 0', borderRadius: 18, border: `1px solid ${T.line}`, background: T.surface, overflow: 'hidden' }}><div style={{ display: 'grid', gridTemplateColumns: '56px 190px 90px 1fr 70px', gap: 8, padding: '8px 10px', borderBottom: `1px solid ${T.line2}`, background: T.surface2 }}>{['Date', 'Customer', 'Step', 'What happened', 'By'].map(h => <span key={h} style={{ fontFamily: T.fontUI, fontSize: 10.5, letterSpacing: '.06em', textTransform: 'uppercase', color: T.ink3 }}>{h}</span>)}</div><HistoryRows T={T} n={8} /></div>
  </WebCrFollowShell>;
}
/* saved list sheet */
const WebCrFollowNewList = ({ T }) => <WebCrFollow T={T} overlayX={<Overlay T={T}><WSheet T={T} title="New saved list" sub="from Refill due + filters" w={620} h={520} foot={<><OutBtn T={T} small icon="eye">Preview 12</OutBtn><span style={{ flex: 1 }} /><OutBtn T={T} small>Cancel</OutBtn><T.Btn small icon="bookmark" style={{ height: 36 }}>Save list</T.Btn></>}><NewListBody T={T} /></WSheet></Overlay>} />;
/* customers sort & filter sheet */
const WebCrFollowFilter = ({ T }) => <WebCrFollow T={T} overlayX={<Overlay T={T}><WSheet T={T} title="Sort & filter" sub="Today’s to-do · customers" w={720} foot={<><T.Btn kind="ghost" small>Clear all</T.Btn><OutBtn T={T} small icon="bookmark">Save view</OutBtn><span style={{ flex: 1 }} /><T.Btn icon="check" style={{ height: 42 }}>Show 12 customers</T.Btn></>}><CustFilterBody T={T} /></WSheet></Overlay>} />;
/* snooze popover on the step pane */
const WebCrFollowSnooze = ({ T }) => <WebCrFollow T={T} overlayX={<Pop T={T} x={1280 - 340 - 4} y={370} w={300} title="Snooze Preeti" right={<Meta T={T}>step Showcase</Meta>}><SnoozeMenu T={T} /></Pop>} />;
/* template editor */
const WebCrFollowTemplate = ({ T }) => <WebCrFollow T={T} overlayX={<Overlay T={T}><WSheet T={T} title="Edit message" sub="Refill · Preeti Fashion Hub" w={640} h={600} foot={<><OutBtn T={T} small icon="rotate-ccw">Reset to template</OutBtn><span style={{ flex: 1 }} /><OutBtn T={T} small>Cancel</OutBtn><T.Btn small icon="check" style={{ height: 36 }}>Use this message</T.Btn></>}><TemplateBody T={T} /></WSheet></Overlay>} />;
/* done → next: the card moved, toast, next customer in the pane */
function WebCrFollowNext({ T }) {
  const cols = [[CRM_C[1], CRM_C[3], CRM_C[4]], [CRM_C[2]], [CRM_C[0], CRM_C[5]], []];
  const pane = <div style={{ padding: '10px 12px', height: '100%', overflow: 'hidden' }}><StepWork T={T} c={{ ...CRM_C[2], step: 1 }} /></div>;
  return <WebCrFollowShell T={T} active="Journey board" paneTitle="Ambika Enterprises · next" pane={pane} overlay={<div style={{ position: 'absolute', left: 84 + 24, bottom: 22, zIndex: 20, display: 'flex', alignItems: 'center', gap: 10 }}><Toast T={T} title="Preeti Fashion Hub moved to Order" sub="Showcase done · packet sent · next: Ambika Enterprises" style={{ width: 420 }} /><OutBtn T={T} small icon="undo-2">Undo</OutBtn></div>}>
    <CrListBar T={T} right={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Meta T={T}>journey · Refill · 32 customers</Meta><T.Chip outline icon="arrow-down-up" style={{ height: 28 }}>Next action</T.Chip><IconBtn2 T={T} icon="sliders-horizontal" n={2} /></span>} />
    <div style={{ padding: '14px 24px 0' }}><StepStrip T={T} steps={[['Reach out', 5, 2], ['Showcase', 3, 0], ['Order', 4, 0], ['Confirm', 2, 0], ['Done', 18, 0]]} active={1} /></div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 10, padding: '12px 24px 0', flex: 1, minHeight: 0, overflow: 'hidden' }}>{CRM_STEPS.slice(0, 4).map((s, i) => <div key={s} style={{ borderRadius: 18, background: i === 1 ? T.surface2 : 'transparent', border: `1px solid ${i === 1 ? T.line : 'transparent'}`, padding: 8, minHeight: 0, overflow: 'hidden' }}><div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '2px 4px 8px' }}><span style={{ fontFamily: T.fontUI, fontSize: 12, fontWeight: 600, color: i === 1 ? T.ink : T.ink3 }}>{s}</span><Meta T={T}>{cols[i].length}</Meta></div>{cols[i].map((c, k) => <FollowCard key={c.id} T={T} c={{ ...c, step: i }} on={(i === 1 && k === 0) || (i === 2 && k === 0)} style={{ marginBottom: 8, boxShadow: i === 2 && k === 0 ? `0 0 0 3px ${T.ok}44` : undefined }} />)}{!cols[i].length && <div style={{ padding: '18px 8px', borderRadius: 14, border: `1px dashed ${T.line2}`, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink3, textAlign: 'center' }}>Nobody waiting on Confirm</div>}</div>)}</div>
  </WebCrFollowShell>;
}

/* Share states */
const WebCrSharePicker = ({ T }) => <WebCrShare T={T} overlayX={<Pop T={T} x={84 + 14} y={140} w={320} title="Customers on this step" right={<Meta T={T}>12</Meta>}><CustomerPickerBody T={T} /></Pop>} />;
const WebCrShareSort = ({ T }) => <WebCrShare T={T} overlayX={<Pop T={T} x={84 + 262 + 16 + 120} y={330} w={230} title="Sort Recommended"><SortMenu T={T} /></Pop>} />;
const WebCrShareViewer = ({ T }) => <WebCrShare T={T} overlayX={<Overlay T={T}><WSheet T={T} title="8337" sub="Recommended · 1 of 12 · ← → to move" w={780} h={640}><ViewerBody T={T} /></WSheet></Overlay>} />;
const WebCrShareContacts = ({ T }) => <WebCrShare T={T} composer overlayX={<div style={{ position: 'absolute', inset: 0, zIndex: 40 }}><WSheet T={T} title="Send to" sub="Preeti Fashion Hub" w={520} h={520} back="Packet" foot={<><span style={{ flex: 1 }} /><T.Btn small icon="check" style={{ height: 36 }}>Use 2 recipients</T.Btn></>}><ContactBody T={T} /></WSheet></div>} />;
const WebCrShareExport = ({ T }) => <WebCrShare T={T} composer overlayX={<div style={{ position: 'absolute', inset: 0, zIndex: 40 }}><WSheet T={T} title="Export" sub="5 designs · 12 pictures" w={560} h={560} back="Packet" foot={<><Meta T={T}>saved to the packet history</Meta><span style={{ flex: 1 }} /><T.Btn small icon="download" style={{ height: 36 }}>Download 3 files</T.Btn></>}><ExportBody T={T} /></WSheet></div>} />;
const WebCrShareSent = ({ T }) => <WebCrShare T={T} overlayX={<Overlay T={T}><WSheet T={T} title="Sent" w={560} h={560} foot={<><OutBtn T={T} small icon="history">Packet history</OutBtn><span style={{ flex: 1 }} /><T.Btn small icon="arrow-right" style={{ height: 36 }}>Next customer · Ambika</T.Btn></>}><SentBody T={T} /></WSheet></Overlay>} />;
function WebCrLogoAll({ T }) {
  const pane = <div style={{ padding: '12px 14px', height: '100%', display: 'flex', flexDirection: 'column' }}><LogoControls T={T} /><Meta T={T} style={{ display: 'block', marginTop: 12, whiteSpace: 'normal', lineHeight: 1.4 }}>Applied to 3 of 6 pictures. Pictures with a light hem get the dark mark automatically.</Meta><span style={{ flex: 1 }} /><T.Btn icon="check-check" style={{ width: '100%', height: 42 }}>Apply to all 6</T.Btn></div>;
  return <WebShell3 T={T} module="CRM" crumb={['CRM', 'Share', 'Preeti Fashion Hub', 'Place logo']} section="Share" seg={CRM_SEG} active="Share" tabs={CRM_TABS('s')} paneTitle="Logo" pane={pane}>
    <ViewTabs T={T} back="Packet" eyebrow="Place logo" tabs={[['Picture 2 of 5', null, 'image'], ['All pictures', null, 'images']]} active="All pictures" right={<Meta T={T}>product · photoshoot · video frame</Meta>} />
    <div style={{ padding: '16px 24px 0' }}><LogoAllBody T={T} /></div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 24px 0' }}><Seg T={T} items={['All', 'Product photos', 'Photoshoot', 'Video frames']} on="All" small /><span style={{ flex: 1 }} /><OutBtn T={T} small icon="eye">Preview as sent</OutBtn></div>
  </WebShell3>;
}

/* Payments states */
const PAY_TABS = [['Journey map', null, 'route'], ['Bills', 30, 'receipt-text'], ['Customers', 14, 'users'], ['Broker / agency', null, 'briefcase']];
function WebCrPayShell({ T, active, pane, paneTitle, overlay, children, right }) {
  return <WebShell3 T={T} module="CRM" crumb={['CRM', 'Payments', active]} section="Payments" seg={CRM_SEG} active="Payments" tabs={CRM_TABS('p')} paneTitle={paneTitle} pane={pane} overlay={overlay}>
    <ViewTabs T={T} tabs={PAY_TABS} active={active} right={right || <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><T.Chip on style={{ height: 26, fontSize: 11.5 }}>Mine</T.Chip><T.Chip outline style={{ height: 26, fontSize: 11.5 }}>Snoozed</T.Chip><Meta T={T}>₹13.1L outstanding · 30 bills</Meta></span>} />
    {children}
  </WebShell3>;
}
function WebCrPayBills({ T }) {
  return <WebCrPayShell T={T} active="Bills" paneTitle="Ambika Enterprises" pane={<PayPane T={T} c={CRM_C[2]} />}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 24px 0' }}><T.Chip icon="search" outline>Bill no, customer, broker</T.Chip>{['Due', 'Overdue', 'Issue', 'Escalate', 'RED', 'Snoozed', 'Mine'].map((q, i) => <T.Chip key={q} on={i === 1} outline={i !== 1} style={{ height: 28 }}>{q}</T.Chip>)}<span style={{ flex: 1 }} /><T.Chip outline icon="arrow-down-up" style={{ height: 28 }}>Days overdue</T.Chip><IconBtn2 T={T} icon="sliders-horizontal" n={1} /><IconBtn2 T={T} icon="download" /></div>
    <div style={{ padding: '12px 24px 0' }}><BillsTable T={T} /></div>
  </WebCrPayShell>;
}
function WebCrPayCustomers({ T }) {
  return <WebCrPayShell T={T} active="Customers" paneTitle="Ambika Enterprises · 3 stages" pane={<PayPane T={T} c={CRM_C[2]} />}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 24px 0' }}><T.Chip icon="search" outline>Customer, broker, city</T.Chip>{['Worst stage', 'Payment risk', 'Over credit', 'Platinum', 'Mine'].map((q, i) => <T.Chip key={q} on={i === 0} outline={i !== 0} style={{ height: 28 }}>{q}</T.Chip>)}<span style={{ flex: 1 }} /><Meta T={T}>14 customers · 30 bills</Meta><T.Chip outline icon="arrow-down-up" style={{ height: 28 }}>Outstanding</T.Chip><IconBtn2 T={T} icon="sliders-horizontal" /></div>
    <div style={{ padding: '12px 24px 0', display: 'grid', gridTemplateColumns: '1fr 300px', gap: 16 }}><PayCustomerRows T={T} /><div><div style={{ padding: 12, borderRadius: 18, background: T.surface2, border: `1px solid ${T.line}` }}><div style={{ display: 'flex', alignItems: 'baseline' }}><span style={{ fontFamily: T.fontDisplay, fontSize: 16, fontWeight: 600 }}>By stage</span><span style={{ flex: 1 }} /><Meta T={T}>₹</Meta></div>{PAY_STAGES.map(([s, n, o, a], i) => <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', fontFamily: T.fontUI, fontSize: 12 }}><span style={{ width: 84, color: T.ink2 }}>{s}</span><span style={{ flex: 1, height: 8, borderRadius: 4, background: T.chipBg }}><span style={{ display: 'block', width: [100, 61, 31, 18, 9][i] + '%', height: 8, borderRadius: 4, background: i >= 3 ? T.danger : i >= 1 ? T.warn : T.ink3 }} /></span><b style={{ width: 44, textAlign: 'right' }}>{a}</b></div>)}</div><div style={{ display: 'flex', gap: 8, marginTop: 10 }}><T.Kpi small label="Collected this week" value="₹2.4L" sub="6 bills" tone="ok" /><T.Kpi small label="Promised" value="₹1.1L" sub="3 by Friday" /></div></div></div>
  </WebCrPayShell>;
}
const WebCrPayFilter = ({ T }) => <WebCrPay T={T} overlayX={<Overlay T={T}><WSheet T={T} title="Sort & filter" sub="Payments · bills" w={720} foot={<><T.Btn kind="ghost" small>Clear all</T.Btn><OutBtn T={T} small icon="bookmark">Save list</OutBtn><span style={{ flex: 1 }} /><T.Btn icon="check" style={{ height: 42 }}>Show 9 bills</T.Btn></>}><BillFilterBody T={T} /></WSheet></Overlay>} />;
const WebCrPayLog = ({ T }) => <WebCrPay T={T} overlayX={<Overlay T={T}><WSheet T={T} title="Log payment" sub="Ambika Enterprises" w={640} h={600} foot={<><Meta T={T}>receipt voucher → Busy on save</Meta><span style={{ flex: 1 }} /><OutBtn T={T} small>Cancel</OutBtn><T.Btn small icon="banknote" style={{ height: 36 }}>Log ₹39,955</T.Btn></>}><LogPaymentBody T={T} /></WSheet></Overlay>} />;
const WebCrPayEscalate = ({ T }) => <WebCrPay T={T} overlayX={<Overlay T={T}><WSheet T={T} title="Escalate" sub="Ambika Enterprises · 2 bills" w={640} h={560} foot={<><span style={{ flex: 1 }} /><OutBtn T={T} small>Cancel</OutBtn><T.Btn small icon="arrow-up-right" style={{ height: 36 }}>Escalate to admin</T.Btn></>}><EscalateBody T={T} /></WSheet></Overlay>} />;
const WebCrPaySnooze = ({ T }) => <WebCrPay T={T} overlayX={<Pop T={T} x={1280 - 340 - 4} y={370} w={300} title="Snooze Ambika" right={<Meta T={T}>2 bills in Overdue</Meta>}><SnoozeMenu T={T} /></Pop>} />;
const WebCrPaySchedule = ({ T }) => <WebCrPayBrokers T={T} overlayX={<Overlay T={T}><WSheet T={T} title="Report schedule" sub="all agencies" w={600} h={420} foot={<><Meta T={T}>next run Mon 15/09 · 08:00</Meta><span style={{ flex: 1 }} /><OutBtn T={T} small>Cancel</OutBtn><T.Btn small icon="check" style={{ height: 36 }}>Save schedule</T.Btn></>}><ScheduleBody T={T} /></WSheet></Overlay>} />;

/* Customers states */
const WebCrCustFilter = ({ T }) => <WebCrCustomers T={T} overlayX={<Overlay T={T}><WSheet T={T} title="Sort & filter" sub="Customers" w={720} foot={<><T.Btn kind="ghost" small>Clear all</T.Btn><OutBtn T={T} small icon="bookmark">Save view</OutBtn><span style={{ flex: 1 }} /><T.Btn icon="check" style={{ height: 42 }}>Show 41 customers</T.Btn></>}><CustFilterBody T={T} /></WSheet></Overlay>} />;
const WebCrCustColumns = ({ T }) => <WebCrCustomers T={T} overlayX={<Overlay T={T}><WSheet T={T} title="Columns" sub="12 of 24 · drag to order" w={760} h={520} foot={<><OutBtn T={T} small icon="rotate-ccw">Default set</OutBtn><span style={{ flex: 1 }} /><T.Btn small icon="check" style={{ height: 36 }}>Apply</T.Btn></>}><ColumnsBody T={T} /></WSheet></Overlay>} />;
const WebCrCustStart = ({ T }) => <WebCrCustomers T={T} overlayX={<Overlay T={T}><WSheet T={T} title="Start a follow-up" sub="Preeti Fashion Hub" w={620} h={500} foot={<><span style={{ flex: 1 }} /><OutBtn T={T} small>Cancel</OutBtn><T.Btn small icon="list-checks" style={{ height: 36 }}>Add to Reach out</T.Btn></>}><StartFollowBody T={T} /></WSheet></Overlay>} />;
function WebCrDossierTab({ T, tab }) {
  const Body = tab === 'Invoices' ? DossierInvoices : tab === 'Shipments' ? DossierShipments : tab === 'Returns' ? DossierReturns : DossierGrowth;
  const pane = <div style={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}><div style={{ display: 'flex', alignItems: 'center', padding: '0 6px', borderBottom: `1px solid ${T.line}`, flex: 'none', overflow: 'hidden' }}>{[['Info'], ['Packets', 5], ['Orders', 7], ['Invoices'], ['Shipments'], ['Returns'], ['Growth']].map(([t, n]) => { const on = t === tab; return <span key={t} className="press" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 4, padding: '9px 6px 10px', fontFamily: T.fontUI, fontSize: 11.5, fontWeight: on ? 600 : 400, color: on ? T.ink : T.ink3, whiteSpace: 'nowrap' }}>{t}{on && <span style={{ position: 'absolute', left: 6, right: 6, bottom: 0, height: 2, background: T.accent, borderRadius: 1 }} />}</span>; })}</div><div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}><Body T={T} /></div><div style={{ display: 'flex', gap: 6, padding: '8px 12px 12px', borderTop: `1px solid ${T.line}` }}><OutBtn T={T} icon="list-checks" style={{ flex: 1, justifyContent: 'center' }}>Follow up</OutBtn><T.Btn small icon="send" style={{ flex: 1, height: 36 }}>Share</T.Btn></div></div>;
  return <WebCrCustomers T={T} paneX={pane} paneTitleX={'Dossier · ' + tab} />;
}
const WebCrDossierInvoices = ({ T }) => <WebCrDossierTab T={T} tab="Invoices" />;
const WebCrDossierShipments = ({ T }) => <WebCrDossierTab T={T} tab="Shipments" />;
const WebCrDossierReturns = ({ T }) => <WebCrDossierTab T={T} tab="Returns" />;
const WebCrDossierGrowth = ({ T }) => <WebCrDossierTab T={T} tab="Growth" />;

/* Journeys states */
const J_TABS = [['Payments', null, 'wallet'], ['Refill', null, 'refresh-cw'], ['New samples', null, 'sparkles'], ['Cold revival', null, 'snowflake'], ['Sale order', null, 'receipt-text']];
function WebCrJShell({ T, active = 'Payments', pane, paneTitle, overlay, children, sub }) {
  return <WebShell3 T={T} module="CRM" crumb={['CRM', 'Journeys', active]} section="Journeys" seg={CRM_SEG} active="Journeys" tabs={CRM_TABS('j')} paneTitle={paneTitle} pane={pane} overlay={overlay}>
    <ViewTabs T={T} tabs={J_TABS} active={active} right={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Meta T={T}>{sub}</Meta><OutBtn T={T} small icon="plus">New journey</OutBtn><T.Btn small icon="upload" style={{ height: 30 }}>Publish</T.Btn></span>} />
    {children}
  </WebShell3>;
}
function WebCrJRefill({ T }) {
  const pane = <div style={{ padding: '10px 12px', height: '100%', display: 'flex', flexDirection: 'column' }}><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 26, height: 26, borderRadius: 8, background: T.chipBg, display: 'grid', placeItems: 'center' }}><Ic name="message-circle" size={13} /></span><span style={{ fontFamily: T.fontDisplay, fontSize: 18, fontWeight: 600, color: T.ink }}>Reach out</span><span style={{ flex: 1 }} /><Pill T={T} small tone="ok">Active</Pill></div><StepSettings T={T} /><span style={{ flex: 1 }} /><div style={{ display: 'flex', gap: 6, alignItems: 'center' }}><OutBtn T={T} small icon="trash-2">Remove</OutBtn><span style={{ flex: 1 }} /><T.Btn small icon="check" style={{ height: 36 }}>Save step</T.Btn></div></div>;
  return <WebCrJShell T={T} active="Refill" sub="v2 · 32 customers on it · tier frequency 14 · 21 · 30 d" paneTitle="Step · Reach out" pane={pane}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px 0' }}><Meta T={T}>A customer journey: customers join from the Refill due list and leave on Done or when they order. Snooze pauses the customer, not the list.</Meta><span style={{ flex: 1 }} /><T.Chip outline icon="play" style={{ height: 28 }}>Test with Preeti</T.Chip></div>
    <div style={{ padding: '12px 24px 0' }}><JMap T={T} nodes={JN2} edges={JE2} /></div>
    <div style={{ display: 'flex', gap: 10, padding: '12px 24px 0' }}>{[['Tier frequency', 'Platinum every 14 d · Gold 21 d · Silver 30 d'], ['Lists feeding this journey', 'Refill due · What worked · Delhi refill · Platinum'], ['Automation', '1 auto message · 2 manual steps · packets by hand']].map(([k, v]) => <div key={k} style={{ flex: 1, padding: '8px 12px', borderRadius: 14, background: T.surface2, border: `1px solid ${T.line}` }}><Meta T={T} style={{ display: 'block' }}>{k}</Meta><div style={{ fontFamily: T.fontUI, fontSize: 12.5, color: T.ink, marginTop: 2 }}>{v}</div></div>)}</div>
  </WebCrJShell>;
}
const WebCrJNew = ({ T }) => <WebCrJourneys T={T} overlayX={<Overlay T={T}><WSheet T={T} title="New journey" w={620} h={460} foot={<><span style={{ flex: 1 }} /><OutBtn T={T} small>Cancel</OutBtn><T.Btn small icon="git-branch" style={{ height: 36 }}>Create draft</T.Btn></>}><NewJourneyBody T={T} /></WSheet></Overlay>} />;
const WebCrJTest = ({ T }) => <WebCrJourneys T={T} paneX={<div style={{ padding: '10px 12px', height: '100%', display: 'flex', flexDirection: 'column' }}><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 18, fontWeight: 600, color: T.ink }}>Test run</span><Pill T={T} small tone="blue">simulation</Pill><span style={{ flex: 1 }} /><OutBtn T={T} small icon="rotate-ccw">Re-run</OutBtn></div><div style={{ flex: 1, minHeight: 0, overflow: 'hidden', marginTop: 6 }}><TestRunBody T={T} /></div><Meta T={T} style={{ whiteSpace: 'normal', lineHeight: 1.4 }}>Nothing is sent. Dates use v4's waits; paid on any date ends the run at that step.</Meta></div>} paneTitleX="Test with Ambika" />;
const WebCrJPublish = ({ T }) => <WebCrJourneys T={T} overlayX={<Overlay T={T}><WSheet T={T} title="Publish v4" sub="Payments journey" w={600} h={520} foot={<><span style={{ flex: 1 }} /><OutBtn T={T} small>Keep as draft</OutBtn><T.Btn small icon="upload" style={{ height: 36 }}>Publish v4</T.Btn></>}><PublishBody T={T} /></WSheet></Overlay>} />;
const WebCrJAddNode = ({ T }) => <WebCrJourneys T={T} ghost paneX={<div style={{ padding: '10px 12px', height: '100%', display: 'flex', flexDirection: 'column' }}><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 26, height: 26, borderRadius: 8, background: T.chipBg, display: 'grid', placeItems: 'center' }}><Ic name="phone" size={13} /></span><span style={{ fontFamily: T.fontDisplay, fontSize: 18, fontWeight: 600, color: T.ink }}>New step</span><span style={{ flex: 1 }} /><Pill T={T} small tone="warn">Draft</Pill></div><Meta T={T} style={{ display: 'block', marginTop: 4, whiteSpace: 'normal', lineHeight: 1.4 }}>Dropped between Overdue and Wait 30 d. Name it and pick a channel; the waits either side keep their days.</Meta><FRow T={T} label="Name"><Fld T={T} value="Broker nudge" /></FRow><FRow T={T} label="Channel"><Seg T={T} items={['WhatsApp', 'Call', 'Both']} on="Call" small /></FRow><FRow T={T} label="Who"><Fld T={T} value="Broker of the bill" icon="user" caret /></FRow><FRow T={T} label="Template"><Fld T={T} value="Broker reminder · v1" icon="message-square-text" caret /></FRow><FRow T={T} label="Wait before"><Fld T={T} value="7 days" w={100} /><Toggle T={T} on label="automation" /></FRow><span style={{ flex: 1 }} /><div style={{ display: 'flex', gap: 6 }}><OutBtn T={T} small icon="trash-2">Discard</OutBtn><span style={{ flex: 1 }} /><T.Btn small icon="check" style={{ height: 36 }}>Add step</T.Btn></div></div>} paneTitleX="Adding a step" />;

Object.assign(window, { Overlay, WSheet, Pop, MenuRow, FRow, Fld, Toggle, Check, NewListBody, CustFilterBody, BillFilterBody, TemplateBody, SnoozeMenu, SortMenu, CustomerPickerBody, ViewerBody, ContactBody, ExportBody, SentBody, LogPaymentBody, EscalateBody, StartFollowBody, NewJourneyBody, PublishBody, TestRunBody, ScheduleBody, FU_HIST, HistoryRows, TodayRows, BillsTable, PayCustomerRows, ColumnsBody, DossierInvoices, DossierShipments, DossierReturns, DossierGrowth, LogoAllBody, JN2, JE2, CRM_FU_TABS, WebCrFollowShell, WebCrFollowToday, WebCrFollowHistory, WebCrFollowNewList, WebCrFollowFilter, WebCrFollowSnooze, WebCrFollowTemplate, WebCrFollowNext, WebCrSharePicker, WebCrShareSort, WebCrShareViewer, WebCrShareContacts, WebCrShareExport, WebCrShareSent, WebCrLogoAll, PAY_TABS, WebCrPayShell, WebCrPayBills, WebCrPayCustomers, WebCrPayFilter, WebCrPayLog, WebCrPayEscalate, WebCrPaySnooze, WebCrPaySchedule, WebCrCustFilter, WebCrCustColumns, WebCrCustStart, WebCrDossierTab, WebCrDossierInvoices, WebCrDossierShipments, WebCrDossierReturns, WebCrDossierGrowth, J_TABS, WebCrJShell, WebCrJRefill, WebCrJNew, WebCrJTest, WebCrJPublish, WebCrJAddNode });
