/* NEW DRAFTS · CRM · web screens (8 Sep 2026). Loads after mod-crm.jsx. Built on top bar v2 (WebShell3, Header3,
   ViewTabs from mod-topbar2.jsx): module CRM on the rail, sub-menu Follow-ups · Share · Payments · Customers ·
   Journeys beside the head, sub-sub tabs in the page. Registers the module on window.NEW_DRAFT_MODULES at the end. */

const CRM_SEG = [['Follow-ups', 12, true], ['Share'], ['Payments', 9, true], ['Customers', 148], ['Journeys']];
const CRM_TABS = (on) => [{ icon: 'list-checks', label: 'Follow-ups · Today’s to-do', on: on === 'f' }, { icon: 'send', label: 'Share · Preeti Fashion Hub', on: on === 's' }, { icon: 'wallet', label: 'Payments · Overdue', on: on === 'p' }, { icon: 'users', label: 'Customers', on: on === 'c' }, { icon: 'git-branch', label: 'Journeys · Payments', on: on === 'j' }].filter(t => t.on || on !== 'j' || t.icon !== 'send');
const IconBtn2 = ({ T, icon, on, n }) => <span className="press" style={{ position: 'relative', width: 34, height: 34, borderRadius: 10, display: 'grid', placeItems: 'center', background: on ? T.ink : T.chipBg, color: on ? T.bg : T.ink }}><Ic name={icon} size={16} />{n ? <span style={{ position: 'absolute', top: -5, right: -5, minWidth: 16, height: 16, padding: '0 4px', borderRadius: 8, background: T.accent, color: T.onAccent, fontFamily: T.fontUI, fontSize: 9.5, fontWeight: 600, display: 'grid', placeItems: 'center' }}>{n}</span> : null}</span>;
/* list chooser: the display-face scroller from the phone, laid flat */
function CrListBar({ T, active = 'Today’s to-do', lists = CRM_LISTS, right }) {
  return <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '10px 24px 0' }}>{lists.map(([l, k]) => { const on = l === active; return <span key={l} className="press" style={{ padding: on ? '4px 12px' : '4px 8px', borderRadius: 999, background: on ? T.ink : 'transparent', color: on ? T.bg : k === 'custom' ? T.custom : T.ink2, fontFamily: T.fontDisplay, fontSize: 16, fontWeight: 500, fontStyle: k === 'custom' ? 'italic' : 'normal', whiteSpace: 'nowrap' }}>{l}</span>; })}<span className="press" style={{ width: 26, height: 26, borderRadius: 13, background: T.chipBg, color: T.ink2, display: 'grid', placeItems: 'center', marginLeft: 4 }}><Ic name="plus" size={13} /></span><span style={{ flex: 1 }} />{right}</div>;
}

/* ── W1 · W2 Follow-ups · board ── */
function WebCrFollow({ T, history, overlayX }) {
  const cols = [[CRM_C[1], CRM_C[3], CRM_C[4]], [CRM_C[0], CRM_C[2]], [CRM_C[5]], []];
  const pane = <div style={{ padding: '10px 12px', height: '100%', overflow: 'hidden' }}><StepWork T={T} c={CRM_C[0]} history={history} /></div>;
  return <WebShell3 T={T} module="CRM" crumb={['CRM', 'Follow-ups', 'Today’s to-do']} section="Follow-ups" seg={CRM_SEG} active="Follow-ups" tabs={CRM_TABS('f')} paneTitle={history ? 'Preeti Fashion Hub · history' : 'Preeti Fashion Hub'} pane={pane} overlay={overlayX}>
    <ViewTabs T={T} tabs={[['Journey board', null, 'kanban'], ['Today', 7, 'sun'], ['History', null, 'history']]} active="Journey board" right={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><T.Chip on style={{ height: 26, fontSize: 11.5 }}>Mine</T.Chip><T.Chip outline style={{ height: 26, fontSize: 11.5 }}>Due today</T.Chip><T.Chip outline style={{ height: 26, fontSize: 11.5 }}>Overdue</T.Chip><T.Chip outline style={{ height: 26, fontSize: 11.5 }}>Snoozed</T.Chip></span>} />
    <CrListBar T={T} right={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Meta T={T}>journey · Refill · 32 customers</Meta><T.Chip outline icon="arrow-down-up" style={{ height: 28 }}>Next action</T.Chip><IconBtn2 T={T} icon="sliders-horizontal" n={2} /></span>} />
    <div style={{ padding: '14px 24px 0' }}><StepStrip T={T} steps={FU_STEPS} active={1} /></div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 10, padding: '12px 24px 0', flex: 1, minHeight: 0, overflow: 'hidden' }}>
      {CRM_STEPS.slice(0, 4).map((s, i) => <div key={s} style={{ borderRadius: 18, background: i === 1 ? T.surface2 : 'transparent', border: `1px solid ${i === 1 ? T.line : 'transparent'}`, padding: 8, minHeight: 0, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '2px 4px 8px' }}><span style={{ fontFamily: T.fontUI, fontSize: 12, fontWeight: 600, color: i === 1 ? T.ink : T.ink3 }}>{s}</span><Meta T={T}>{FU_STEPS[i][1]}</Meta><span style={{ flex: 1 }} />{FU_STEPS[i][2] ? <Meta T={T} style={{ color: T.danger }}>{FU_STEPS[i][2]} overdue</Meta> : null}</div>
        {cols[i].map((c, k) => <FollowCard key={c.id} T={T} c={{ ...c, step: i }} on={i === 1 && k === 0} style={{ marginBottom: 8 }} />)}
        {!cols[i].length && <div style={{ padding: '18px 8px', borderRadius: 14, border: `1px dashed ${T.line2}`, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink3, textAlign: 'center' }}>Nobody waiting on Confirm</div>}
      </div>)}
    </div>
  </WebShell3>;
}
const WebCrFollowHist = ({ T }) => <WebCrFollow T={T} history />;

/* ── W3 · W4 · W5 Share · terminal ── left customer pane · two picker grids · packet pane ── */
const TILE_W = 92, PURCH_W = 76;
function ShareBody({ T, sheetOn, verify, custTab = 'Info' }) {
  const c = CRM_C[0];
  return <div style={{ display: 'flex', height: '100%', minHeight: 0 }}>
    <div style={{ width: 262, flex: 'none', borderRight: `1px solid ${T.line}`, background: T.surface, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}><QueueStrip T={T} /><CustTabs T={T} tab={custTab} /><div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>{custTab === 'Packets' ? <PacketsPane T={T} /> : custTab === 'Orders' ? <OrdersPane T={T} /> : <CustPane T={T} c={c} />}</div></div>
    <div style={{ flex: 1, minWidth: 0, minHeight: 0, padding: '12px 16px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 30, padding: '0 10px 0 8px', borderRadius: 999, background: T.accentSoft, border: `1px solid ${T.accentLine}`, fontFamily: T.fontUI, fontSize: 12, color: T.accent }}><Ic name="square-check" size={14} />Select mode · tap a picture</span><Meta T={T}>from Refill due · step Showcase</Meta><span style={{ flex: 1 }} /><Meta T={T}>5 selected · {money(crValue(CRM_SEL))}</Meta></div>
      <div style={{ marginBottom: 10 }}><PurchHead T={T} /><PickGrid T={T} tiles={crBought()} sel={CRM_SEL} w={PURCH_W} cols={6} rows={2} verify={verify} /></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ position: 'relative' }}><PickHead T={T} title="Recommended" n={12} of={48} sort="Match" filters={2} on={sheetOn} /><PickGrid T={T} tiles={CRM_REC} sel={CRM_SEL} w={TILE_W} verify={verify} />
          {sheetOn && <div style={{ position: 'absolute', top: 36, left: -8, width: 396, maxHeight: 540, borderRadius: 20, padding: '10px 16px 0', overflow: 'hidden', zIndex: 4, display: 'flex', flexDirection: 'column', ...glass(T, { background: T.dark ? 'rgba(28,21,18,.94)' : 'rgba(252,250,246,.96)' }) }}><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 18, fontWeight: 600, color: T.ink }}>Sort & filter</span><Meta T={T}>Recommended</Meta><span style={{ flex: 1 }} /><Hit T={T} icon="x" size={28} iconSize={14} style={{ background: T.chipBg }} /></div><div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}><div style={{ borderTop: `1px solid ${T.line}`, padding: '10px 0 8px' }}><div style={{ fontFamily: T.fontUI, fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', color: T.ink3, marginBottom: 6 }}>For this customer</div><div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{[['Bought before', false], ['Never bought', true], ['Price match', true], ['Colour match', false], ['State match', false], ['What worked', false]].map(([l, on]) => <T.Chip key={l} on={on} outline={!on} style={{ height: 28 }}>{l}</T.Chip>)}</div></div><SheetBody T={T} wide /></div><SheetFoot T={T} n={31} /></div>}
        </div>
        <div><PickHead T={T} title="Catalogue" n={12} of={612} sort="Newest" /><PickGrid T={T} tiles={CRM_CAT} sel={CRM_SEL} w={TILE_W} verify={verify} /></div>
      </div>
    </div>
  </div>;
}
function WebCrShare({ T, sheetOn, verify, composer, custTab, overlayX }) {
  const c = CRM_C[0];
  return <WebShell3 T={T} module="CRM" crumb={['CRM', 'Share', c.name]} section="Share" seg={CRM_SEG} active="Share" tabs={CRM_TABS('s')} paneTitle="Packet" paneWidth={300} pane={<PacketPane T={T} c={c} verify={verify} />}
    overlay={<>{composer && <div style={{ position: 'absolute', inset: 0, zIndex: 30 }}>{scrimF(T)}<div style={{ position: 'absolute', left: 84 + 170, top: 28, width: 700, bottom: 16, borderRadius: 24, display: 'flex', flexDirection: 'column', overflow: 'hidden', ...glass(T, { background: T.dark ? 'rgba(28,21,18,.96)' : 'rgba(252,250,246,.97)' }) }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 22px 8px' }}><span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, height: 28, padding: '0 10px 0 6px', borderRadius: 999, background: T.chipBg, fontFamily: T.fontUI, fontSize: 12, color: T.ink2 }}><Ic name="arrow-left" size={13} />Back and edit</span><span style={{ fontFamily: T.fontDisplay, fontSize: 22, fontWeight: 600, color: T.ink }}>Packet · 5 designs · {money(crValue(CRM_SEL))}</span><span style={{ flex: 1 }} /><Meta T={T}>to {c.name}</Meta><Hit T={T} icon="x" size={32} iconSize={15} style={{ background: T.chipBg }} /></div>
      <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', padding: '0 22px' }}><Composer T={T} c={c} /></div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 22px 12px', borderTop: `1px solid ${T.line}` }}><OutBtn T={T} icon="stamp">Place logo</OutBtn><OutBtn T={T} icon="download">Export</OutBtn><span style={{ flex: 1 }} /><Meta T={T}>1 out of stock will be removed</Meta><T.Btn icon="send" style={{ height: 44 }}>Send · WhatsApp group</T.Btn></div>
    </div></div>}{overlayX}</>}>
    <ShareBody T={T} sheetOn={sheetOn} verify={verify} custTab={custTab} />
  </WebShell3>;
}
const WebCrShareSheet = ({ T }) => <WebCrShare T={T} sheetOn />;
const WebCrSharePackets = ({ T }) => <WebCrShare T={T} custTab="Packets" />;
const WebCrShareOrders = ({ T }) => <WebCrShare T={T} custTab="Orders" />;
const WebCrShareVerify = ({ T }) => <WebCrShare T={T} verify />;
const WebCrComposer = ({ T }) => <WebCrShare T={T} composer />;

/* ── W6 Share · logo placement ── */
function WebCrLogo({ T }) {
  const pane = <div style={{ padding: '12px 14px', height: '100%', display: 'flex', flexDirection: 'column' }}><LogoControls T={T} /><div style={{ marginTop: 14, padding: '8px 10px', borderRadius: 12, background: T.surface2, border: `1px solid ${T.line}`, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2 }}>Auto picks the light mark on dark pictures and the dark mark on light ones. Snaps to the corners; drag for anything else.</div><span style={{ flex: 1 }} /><div style={{ display: 'flex', gap: 6, alignItems: 'center' }}><OutBtn T={T} small icon="rotate-ccw">Reset</OutBtn><span style={{ flex: 1 }} /><OutBtn T={T} small icon="check">This picture</OutBtn></div><T.Btn icon="check-check" style={{ width: '100%', height: 42, marginTop: 6 }}>Apply to all 5</T.Btn></div>;
  return <WebShell3 T={T} module="CRM" crumb={['CRM', 'Share', 'Preeti Fashion Hub', 'Place logo']} section="Share" seg={CRM_SEG} active="Share" tabs={CRM_TABS('s')} paneTitle="Logo" pane={pane}>
    <ViewTabs T={T} back="Packet" eyebrow="Place logo" tabs={[['Picture 2 of 5', null, 'image'], ['All pictures', null, 'images']]} active="Picture 2 of 5" right={<Meta T={T}>8111 · Lehenga · photoshoot picture</Meta>} />
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '14px 24px 0', flex: 1, minHeight: 0 }}>
      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <LogoStage T={T} t={crTile('8111')} w={380} h={475} pos="br" dark handles />
        <div style={{ width: 200 }}><Meta T={T} style={{ display: 'block', marginBottom: 6 }}>Preview · as sent</Meta><LogoStage T={T} t={crTile('8111')} w={200} h={250} pos="br" dark /><Meta T={T} style={{ display: 'block', marginTop: 10, whiteSpace: 'normal', lineHeight: 1.4 }}>Product photos get the mark; photoshoot pictures and video frames use the same placement unless changed here.</Meta></div>
      </div>
      <div style={{ marginTop: 14 }}><LogoRail T={T} cur={1} w={52} /></div>
    </div>
  </WebShell3>;
}

/* ── W7 · W8 Payments · journey ── */
function WebCrPay({ T, cleared, overlayX }) {
  const c = CRM_C[2]; const bills = CRM_BILLS.filter(b => b.stage === 1);
  const byC = []; bills.forEach(b => { let g = byC.find(x => x.c === b.c); if (!g) byC.push(g = { c: b.c, bs: [] }); g.bs.push(b); });
  return <WebShell3 T={T} module="CRM" crumb={['CRM', 'Payments', 'Overdue']} section="Payments" seg={CRM_SEG} active="Payments" tabs={CRM_TABS('p')} paneTitle={cleared ? c.name + ' · 3 stages' : c.name} pane={<PayPane T={T} c={c} cleared={cleared} />} overlay={overlayX}>
    <ViewTabs T={T} tabs={[['Journey map', null, 'route'], ['Bills', 30, 'receipt-text'], ['Customers', 14, 'users'], ['Broker / agency', null, 'briefcase']]} active="Journey map" right={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><T.Chip on style={{ height: 26, fontSize: 11.5 }}>Mine</T.Chip><T.Chip outline style={{ height: 26, fontSize: 11.5 }}>Snoozed</T.Chip><Meta T={T}>₹13.1L outstanding · 30 bills</Meta></span>} />
    <CrListBar T={T} active="All bills" lists={[['All bills', 'default'], ['Platinum', 'default'], ['Over ₹50k', 'default'], ['Agency · Suman', 'custom'], ['Direct', 'default']]} right={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><T.Chip outline icon="arrow-down-up" style={{ height: 28 }}>Days overdue</T.Chip><IconBtn2 T={T} icon="sliders-horizontal" /></span>} />
    <div style={{ padding: '14px 24px 0' }}><StepStrip T={T} steps={PAY_STAGES} active={1} amounts /></div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px 0' }}><Meta T={T}>Overdue · past the 30 d grace · weekly WhatsApp reminder, a call after the first week</Meta><span style={{ flex: 1 }} /><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 10, background: T.surface2, border: `1px solid ${T.line}`, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2 }}><Ic name="calendar-clock" size={13} color={T.ink3} />Broker report · sent Mon 08:00 · next Mon<b style={{ color: T.accent, marginLeft: 4 }}>Preview</b></span></div>
    <div style={{ padding: '10px 24px 0', flex: 1, minHeight: 0, overflow: 'hidden' }}>{byC.map(g => { const cc = crC(g.c); return <div key={g.c} style={{ borderRadius: 18, background: T.surface, border: `1px solid ${cc.id === c.id ? T.accentLine : T.line}`, marginBottom: 10, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: T.surface2, borderBottom: `1px solid ${T.line}` }}><Monogram T={T} c={cc} s={24} /><span style={{ fontFamily: T.fontDisplay, fontSize: 16, fontWeight: 600, color: T.ink }}>{cc.name}</span><Meta T={T}>{cc.city} · {cc.tier} · payment {cc.pay}</Meta><span style={{ flex: 1 }} />{CRM_BILLS.filter(b => b.c === g.c).length > g.bs.length && <Pill T={T} small tone="danger">also in {CRM_BILLS.filter(b => b.c === g.c && b.stage > 1).map(b => PAY_STAGES[b.stage][0]).join(' · ')}</Pill>}<Meta T={T}>{g.bs.length} bills here · {money(g.bs.reduce((s, b) => s + b.amt, 0))}</Meta></div>
      <div style={{ padding: '0 4px' }}>{g.bs.map((b, i) => <BillRow key={b.no} T={T} b={b} first={i === 0} on={b.no === 'SI-2240' && !cleared} />)}</div>
    </div>; })}</div>
  </WebShell3>;
}
const WebCrPayCleared = ({ T }) => <WebCrPay T={T} cleared="SI-2240" />;

/* ── W8b Payments · broker & agency weekly report ── */
function WebCrPayBrokers({ T, overlayX }) {
  const a = AGENCIES[0]; const max = 300000;
  const pane = <div style={{ padding: '10px 12px', height: '100%', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
    <div style={{ fontFamily: T.fontDisplay, fontSize: 19, fontWeight: 600, color: T.ink }}>{a.name}</div><Meta T={T} style={{ display: 'block' }}>weekly · WhatsApp to {a.to} · PDF attached</Meta>
    <ReportBody T={T} a={a} />
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}><Meta T={T}>Sections</Meta><Seg T={T} items={['Due', 'Overdue', 'Issue']} on="Due" small /><Meta T={T}>all on</Meta></div>
    <span style={{ flex: 1 }} />
    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}><OutBtn T={T} small icon="file-text">PDF</OutBtn><OutBtn T={T} small icon="pause">Pause</OutBtn><span style={{ flex: 1 }} /><T.Btn small icon="send" style={{ height: 36 }}>Send now</T.Btn></div>
  </div>;
  return <WebShell3 T={T} module="CRM" crumb={['CRM', 'Payments', 'Broker / agency']} section="Payments" seg={CRM_SEG} active="Payments" tabs={CRM_TABS('p')} paneTitle="Report preview" pane={pane} overlay={overlayX}>
    <ViewTabs T={T} tabs={[['Journey map', null, 'route'], ['Bills', 30, 'receipt-text'], ['Customers', 14, 'users'], ['Broker / agency', null, 'briefcase']]} active="Broker / agency" right={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Meta T={T}>weekly report · Mondays 08:00 · sections: due · overdue · issue</Meta><T.Chip outline icon="calendar-clock" style={{ height: 26, fontSize: 11.5 }}>Schedule</T.Chip></span>} />
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 24px 0' }}><T.Chip icon="search" outline>Agency, broker, customer</T.Chip><T.Chip on style={{ height: 28 }}>Agencies</T.Chip><T.Chip outline style={{ height: 28 }}>Brokers</T.Chip><T.Chip outline style={{ height: 28 }}>With overdue</T.Chip><span style={{ flex: 1 }} /><Meta T={T}>5 agencies · 7 brokers · ₹13.1L outstanding</Meta></div>
    <div style={{ padding: '12px 24px 0', display: 'grid', gap: 10 }}>{AGENCIES.map((g, i) => <div key={g.name} className="press" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 14px', borderRadius: 18, background: T.surface, border: `1px solid ${i === 0 ? T.accentLine : T.line}` }}>
      <span style={{ width: 200, minWidth: 0 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 17, fontWeight: 600, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{g.name}</div><Meta T={T} style={{ display: 'block' }}>{g.brokers.join(' · ')} · {g.customers} customers</Meta></span>
      <span style={{ flex: 1, minWidth: 0 }}><div style={{ display: 'flex', height: 10, borderRadius: 5, overflow: 'hidden', background: T.chipBg }}><span style={{ width: Math.round(g.due / max * 100) + '%', background: T.ink3 }} /><span style={{ width: Math.round(g.over / max * 100) + '%', background: T.warn }} /><span style={{ width: Math.round(g.issue / max * 100) + '%', background: T.danger }} /></div><div style={{ display: 'flex', gap: 14, marginTop: 4, fontFamily: T.fontUI, fontSize: 11, color: T.ink3 }}><span>due <b style={{ color: T.ink }}>{money(g.due)}</b></span><span>overdue <b style={{ color: g.over ? T.warn : T.ink }}>{money(g.over)}</b></span><span>issue <b style={{ color: g.issue ? T.danger : T.ink }}>{money(g.issue)}</b></span></div></span>
      <span style={{ width: 150 }}><Meta T={T} style={{ display: 'block' }}>last sent {g.sent}</Meta><Meta T={T} style={{ display: 'block', color: T.ok }}>delivered · read</Meta></span>
      <CallChip T={T}>{g.to.split(' · ')[1]}</CallChip><Hit T={T} icon="file-text" size={30} iconSize={14} style={{ background: T.chipBg }} /><Ic name="chevron-right" size={15} color={T.ink3} />
    </div>)}</div>
  </WebShell3>;
}

/* ── W9 Customers · list with the dossier pane ── */
const CUST_COLS = ['Customer', 'Call', 'City · market', 'Tier', 'Score', 'Heat', 'Open book', 'Last order', 'FY billing', 'Δ%', 'Broker · agency', 'Tags'];
function WebCrCustomers({ T, overlayX, paneX, paneTitleX }) {
  const c = CRM_C[0];
  const pane = <div style={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}><div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}><CustPane T={T} c={c} /></div><div style={{ display: 'flex', gap: 6, padding: '8px 12px 12px', borderTop: `1px solid ${T.line}` }}><OutBtn T={T} icon="list-checks" style={{ flex: 1, justifyContent: 'center' }}>Follow up</OutBtn><T.Btn small icon="send" style={{ flex: 1, height: 36 }}>Share</T.Btn></div></div>;
  const rows = [CRM_C[0], CRM_C[1], CRM_C[4], CRM_C[2], CRM_C[5], CRM_C[3], CRM_C[1], CRM_C[3]];
  return <WebShell3 T={T} module="CRM" crumb={['CRM', 'Customers']} section="Customers" seg={CRM_SEG} active="Customers" tabs={CRM_TABS('c')} paneTitle={paneTitleX || 'Dossier'} pane={paneX || pane} overlay={overlayX}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 24px 0' }}><T.Chip icon="search" outline>Name, city, broker, tag</T.Chip>{['Follow-up today', 'Overdue', 'Hot', 'Warm', 'Cold', 'Mine'].map((q, i) => <T.Chip key={q} on={i === 0} outline={i !== 0} style={{ height: 28 }}>{q}</T.Chip>)}<span style={{ flex: 1 }} /><Meta T={T}>148 customers · sorted by follow-up due</Meta><IconBtn2 T={T} icon="sliders-horizontal" /><IconBtn2 T={T} icon="columns-3" /></div>
    <div style={{ margin: '12px 24px 0', borderRadius: 18, border: `1px solid ${T.line}`, background: T.surface, overflow: 'hidden', flex: 1, minHeight: 0 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '170px 40px 120px 60px 48px 44px 80px 72px 84px 44px 130px 1fr', gap: 8, padding: '8px 12px', borderBottom: `1px solid ${T.line2}`, background: T.surface2 }}>{CUST_COLS.map(h => <span key={h} style={{ fontFamily: T.fontUI, fontSize: 10.5, letterSpacing: '.06em', textTransform: 'uppercase', color: T.ink3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{h}</span>)}</div>
      {rows.map((r, i) => <div key={i} className="press" style={{ display: 'grid', gridTemplateColumns: '170px 40px 120px 60px 48px 44px 80px 72px 84px 44px 130px 1fr', gap: 8, alignItems: 'center', padding: '7px 12px', borderTop: i ? `1px solid ${T.line}` : 0, background: i === 0 ? T.accentSoft : 'transparent', fontFamily: T.fontUI, fontSize: 12.5, color: T.ink }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}><span style={{ width: 7, height: 7, borderRadius: 4, background: r.next < 0 ? T.danger : r.next === 0 ? T.accent : 'transparent', border: `1px solid ${r.next > 0 ? T.line2 : 'transparent'}`, flex: 'none' }} /><span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 500 }}>{r.name}</span>{r.tags.includes('Direct') && <T.Tag tone="muted">Direct</T.Tag>}</span>
        <Hit T={T} icon="phone" size={26} iconSize={12} style={{ background: T.chipBg }} />
        <Meta T={T}>{r.city}{r.market ? ' · ' + r.market : ''}</Meta><T.Tag tone={r.tier === 'Platinum' ? 'accent' : 'muted'}>{r.tier}</T.Tag><Gauge T={T} v={r.score} s={26} /><HeatDot T={T} h={r.heat} />
        <span style={{ fontVariantNumeric: 'tabular-nums' }}>{money(r.open)}</span><Meta T={T}>{r.last}</Meta><span style={{ fontVariantNumeric: 'tabular-nums' }}>{lakh(r.fy)}</span><span style={{ color: i % 3 === 2 ? T.danger : T.ok, fontVariantNumeric: 'tabular-nums' }}>{i % 3 === 2 ? '−8' : '+' + (12 + i * 3)}</span><Meta T={T}>{r.broker} · {agencyOf(r)}</Meta>
        <span style={{ display: 'flex', gap: 4, overflow: 'hidden' }}>{r.tags.slice(0, 2).map(t => <CrTag key={t} T={T}>{t}</CrTag>)}</span>
      </div>)}
    </div>
  </WebShell3>;
}

/* ── W10 Journey builder · the mind-map ── */
const JW = k => k === 'step' || k === 'trigger' ? 148 : 108;
const JN = [
  { id: 't', x: 18, y: 140, kind: 'trigger', title: 'Dispatched', sub: 'customer confirms receipt' },
  { id: 'w1', x: 188, y: 140, kind: 'wait', title: 'Wait 30 d', sub: 'grace · per customer' },
  { id: 's1', x: 318, y: 140, kind: 'step', title: 'Payment due', sub: 'WhatsApp · bill pdf · auto', chan: 'message-circle' },
  { id: 'b1', x: 488, y: 140, kind: 'branch', title: 'Paid?', sub: 'cleared by bill no' },
  { id: 'e', x: 488, y: 18, kind: 'end', title: 'Done', sub: 'leaves the journey' },
  { id: 's2', x: 618, y: 140, kind: 'step', title: 'Overdue', sub: 'weekly WhatsApp · call after 1 wk', chan: 'phone', on: true },
  { id: 'w2', x: 638, y: 280, kind: 'wait', title: 'Wait 30 d', sub: 'then Issue' },
  { id: 's3', x: 468, y: 280, kind: 'step', title: 'Issue', sub: '2 calls a week · broker weekly', chan: 'phone' },
  { id: 'w3', x: 338, y: 280, kind: 'wait', title: 'Wait 14 d', sub: 'then Escalate' },
  { id: 's4', x: 168, y: 280, kind: 'step', title: 'Escalate', sub: 'admin talks to customer or broker', chan: 'user' },
  { id: 's5', x: 18, y: 280, kind: 'step', title: 'RED', sub: 'hard approach · 60 d', chan: 'flag', red: true },
];
const JE = [['t', 'w1'], ['w1', 's1'], ['s1', 'b1'], ['b1', 'e', 'yes'], ['b1', 's2', 'no'], ['s2', 'w2'], ['w2', 's3'], ['s3', 'w3'], ['w3', 's4'], ['s4', 's5']];
function JNode({ T, n }) {
  const ic = n.kind === 'trigger' ? 'zap' : n.kind === 'wait' ? 'hourglass' : n.kind === 'branch' ? 'git-fork' : n.kind === 'end' ? 'circle-check' : n.chan;
  const w = JW(n.kind);
  return <div className="press" style={{ position: 'absolute', left: n.x, top: n.y, width: w, padding: '7px 9px', borderRadius: 14, background: n.kind === 'step' ? T.surface : T.surface2, border: `1px solid ${n.on ? T.accent : n.red ? T.danger : T.line2}`, boxShadow: n.on ? `0 0 0 3px ${T.accentSoft}` : 'none', boxSizing: 'border-box' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 20, height: 20, borderRadius: 6, background: n.kind === 'trigger' ? T.accent : n.red ? T.danger : T.chipBg, color: n.kind === 'trigger' || n.red ? '#fff' : T.ink2, display: 'grid', placeItems: 'center', flex: 'none' }}><Ic name={ic} size={11} sw={2} /></span><span style={{ fontFamily: T.fontUI, fontSize: 12.5, fontWeight: 600, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{n.title}</span></div>
    <Meta T={T} style={{ display: 'block', marginTop: 3, whiteSpace: 'normal', lineHeight: 1.3 }}>{n.sub}</Meta>
    {n.kind === 'step' && <div style={{ display: 'flex', gap: 4, marginTop: 6 }}><CrTag T={T}>snooze 14 · 30</CrTag>{n.chan === 'message-circle' && <CrTag T={T} tone="accent">auto</CrTag>}</div>}
  </div>;
}
function JMap({ T, nodes = JN, edges = JE, ghost }) {
  const box = id => { const n = nodes.find(x => x.id === id); const w = JW(n.kind), h = n.kind === 'step' ? 78 : 50; return { ...n, w, h, cx: n.x + w / 2, cy: n.y + h / 2 }; };
  return <div style={{ position: 'relative', height: 400, borderRadius: 20, border: `1px solid ${T.line}`, background: T.dark ? 'radial-gradient(rgba(250,247,242,.06) 1px, transparent 1px) 0 0 / 22px 22px' : 'radial-gradient(rgba(36,23,18,.09) 1px, transparent 1px) 0 0 / 22px 22px', overflow: 'hidden' }}>
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>{edges.map(([a, b, lbl]) => { const A = box(a), B = box(b); let x1, y1, x2, y2; if (Math.abs(A.cy - B.cy) < 10) { x1 = A.x + A.w; y1 = A.cy; x2 = B.x; y2 = B.cy; if (B.x < A.x) { x1 = A.x; x2 = B.x + B.w; } } else { x1 = A.cx; y1 = B.cy < A.cy ? A.y : A.y + A.h; x2 = B.cx; y2 = B.cy < A.cy ? B.y + B.h : B.y; } const mx = (x1 + x2) / 2, my = (y1 + y2) / 2; const d = Math.abs(A.cy - B.cy) < 10 ? `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}` : `M${x1},${y1} C${x1},${my} ${x2},${my} ${x2},${y2}`; return <g key={a + b}><path d={d} fill="none" stroke={T.ink3} strokeWidth="1.5" /><circle cx={x2} cy={y2} r="3" fill={T.ink3} />{lbl && <text x={mx + 6} y={my - 4} fontSize="10" fontFamily="Jost" fill={T.ink2}>{lbl}</text>}</g>; })}</svg>
    {nodes.map(n => <JNode key={n.id} T={T} n={n} />)}{ghost && <div style={{ position: 'absolute', left: 636, top: 214, width: 148, padding: '7px 9px', borderRadius: 14, border: `1.5px dashed ${T.accent}`, background: T.accentSoft, boxSizing: 'border-box', zIndex: 3 }}><div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 20, height: 20, borderRadius: 6, background: T.accent, color: T.onAccent, display: 'grid', placeItems: 'center' }}><Ic name="phone" size={11} sw={2} /></span><span style={{ fontFamily: T.fontUI, fontSize: 12.5, fontWeight: 600, color: T.accent }}>New step</span></div><Meta T={T} style={{ display: 'block', marginTop: 3 }}>drop here · between Overdue and Wait</Meta></div>}
    <div style={{ position: 'absolute', right: 12, top: 12, display: 'flex', gap: 4, padding: 4, borderRadius: 999, ...glass(T) }}>{['zap', 'message-circle', 'phone', 'hourglass', 'git-fork', 'alarm-clock', 'circle-check'].map(i => <span key={i} className="press" style={{ width: 30, height: 30, borderRadius: 15, display: 'grid', placeItems: 'center', color: T.ink2 }}><Ic name={i} size={14} /></span>)}</div>
  </div>;
}
function WebCrJourneys({ T, overlayX, paneX, paneTitleX, ghost }) {
  const pane = <div style={{ padding: '10px 12px', height: '100%', display: 'flex', flexDirection: 'column' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 26, height: 26, borderRadius: 8, background: T.chipBg, display: 'grid', placeItems: 'center' }}><Ic name="phone" size={13} /></span><span style={{ fontFamily: T.fontDisplay, fontSize: 18, fontWeight: 600, color: T.ink }}>Overdue</span><span style={{ flex: 1 }} /><Pill T={T} small tone="ok">Active</Pill></div>
    <StepSettings T={T} />
    <span style={{ flex: 1 }} /><div style={{ display: 'flex', gap: 6, alignItems: 'center' }}><OutBtn T={T} small icon="trash-2">Remove</OutBtn><span style={{ flex: 1 }} /><T.Btn small icon="check" style={{ height: 36 }}>Save step</T.Btn></div>
  </div>;
  return <WebShell3 T={T} module="CRM" crumb={['CRM', 'Journeys', 'Payments']} section="Journeys" seg={CRM_SEG} active="Journeys" tabs={CRM_TABS('j')} paneTitle={paneTitleX || 'Step · Overdue'} pane={paneX || pane} overlay={overlayX}>
    <ViewTabs T={T} tabs={[['Payments', null, 'wallet'], ['Refill', null, 'refresh-cw'], ['New samples', null, 'sparkles'], ['Cold revival', null, 'snowflake'], ['Sale order', null, 'receipt-text']]} active="Payments" right={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Meta T={T}>v3 · 30 bills on it · edited 02/09 by Rohan</Meta><OutBtn T={T} small icon="plus">New journey</OutBtn><T.Btn small icon="upload" style={{ height: 30 }}>Publish v4</T.Btn></span>} />
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px 0' }}><Meta T={T}>Trigger → wait → step → branch. Customers join on the trigger and leave when the bill clears. A customer can be on several bills at once.</Meta><span style={{ flex: 1 }} /><T.Chip outline icon="play" style={{ height: 28 }}>Test with Ambika</T.Chip></div>
    <div style={{ padding: '12px 24px 0' }}><JMap T={T} ghost={ghost} /></div>
    <div style={{ display: 'flex', gap: 10, padding: '12px 24px 0' }}>{[['Tier frequency', 'Platinum every 14 d · Gold 21 d · Silver 30 d'], ['Lists feeding this journey', 'All bills · Platinum · Direct'], ['Automation', '3 auto messages · 2 manual calls · 1 report']].map(([k, v]) => <div key={k} style={{ flex: 1, padding: '8px 12px', borderRadius: 14, background: T.surface2, border: `1px solid ${T.line}` }}><Meta T={T} style={{ display: 'block' }}>{k}</Meta><div style={{ fontFamily: T.fontUI, fontSize: 12.5, color: T.ink, marginTop: 2 }}>{v}</div></div>)}</div>
  </WebShell3>;
}

/* Self-registration: the board reads window.NEW_DRAFT_MODULES; index.html only needs the two script tags. */
(window.NEW_DRAFT_MODULES = window.NEW_DRAFT_MODULES || []).push({ module: 'CRM', note: 'follow-up engine (lists × journeys, step strip) · share terminal (customer pane · two 3 × 4 picture grids · packet pane · composer · logo placement) · payments journey · customers · journey builder (8 Sep). ₹ for manager roles', subs: [
  { name: 'Follow-ups', flow: 'list → step strip → customers on the step → a step opened (template, channels, attached designs, outcome) → history', phone: [['Follow-ups · today, step strip, cards', ScreenCrFollow], ['Follow-ups · step sheet', ScreenCrFollowStep]], web: [['Follow-ups · board by step, step pane', WebCrFollow], ['Follow-ups · step pane with history', WebCrFollowHist]] },
  { name: 'Share', flow: 'customer pane (Info · Packets · Orders) · Purchased grid with time frame · Recommended and Catalogue grids (3 × 4, gallery selection) · packet pane → sort & filter on a grid → verify against stock → composer (send to, pictures, video, logo, message, export) → place logo', phone: [['Share · customer, Recommended grid, selection tray', ScreenCrShare], ['Share · Purchased grid, time frame', ScreenCrSharePurch], ['Share · Catalogue grid', ScreenCrShareCat], ['Share · packet sheet', ScreenCrPacket], ['Share · place logo', ScreenCrLogo]], web: [['Share · terminal (customer · Purchased, Recommended, Catalogue grids · packet)', WebCrShare], ['Share · customer pane · Packets tab', WebCrSharePackets], ['Share · customer pane · Orders tab', WebCrShareOrders], ['Share · sort & filter on Recommended', WebCrShareSheet], ['Share · verified against stock', WebCrShareVerify], ['Share · composer', WebCrComposer], ['Share · place logo', WebCrLogo]] },
  { name: 'Payments', flow: 'stage strip with ₹ → bills of the stage by customer → customer pane (bills across stages, log payment, snooze) → a bill cleared by number → broker & agency weekly report', phone: [['Payments · stages, bills', ScreenCrPay], ['Payments · bill sheet', ScreenCrPayBill]], web: [['Payments · journey map, customer pane', WebCrPay], ['Payments · bill cleared, customer in 3 stages', WebCrPayCleared], ['Payments · broker & agency weekly report', WebCrPayBrokers]] },
  { name: 'Customers', flow: 'list sorted by follow-up due → dossier pane → dossier', phone: [['Customer dossier', ScreenCrDossier]], web: [['Customers · list, dossier pane', WebCrCustomers]] },
  { name: 'Journeys', flow: 'the payment journey as a node map → step settings pane', phone: [], web: [['Journey builder · payments, step pane', WebCrJourneys]] },
] });

Object.assign(window, { CRM_SEG, CRM_TABS, IconBtn2, CrListBar, WebCrFollow, WebCrFollowHist, ShareBody, WebCrShare, WebCrShareSheet, WebCrSharePackets, WebCrShareOrders, WebCrShareVerify, WebCrComposer, WebCrLogo, WebCrPay, WebCrPayCleared, WebCrPayBrokers, WebCrCustomers, JN, JE, JNode, JMap, WebCrJourneys });
