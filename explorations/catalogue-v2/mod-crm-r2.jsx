/* NEW DRAFTS · CRM · review 2 exemplar (13 Oct 2026). One pair for decision 15 of plans/review-2-crm.md: the Follow-ups
   opening screen as the Today list, picture-first, with the three-row header of review-2 decision 1 on the phone and no
   more than two control rows on the web twin. Loads after mod-crm-phone.jsx and reuses its chrome and data unchanged
   (CrTop, DSearch, CrNodes, Body, PickThumb, NextPill, StepWork, CRM_C, CRM_REC, CRM_PURCH, crTile). A compare draft,
   not a restyle: the sale executive's view, so no money anywhere. */

/* the day's actions: Overdue · Today · Waking from snooze, oldest first; every row leads with the pictures it is about
   (attached designs, or the customer's last-bought designs when the step has none attached yet) */
const CRM_R2_GROUPS = [['Overdue', 'danger', [CRM_C[1], CRM_C[4]]], ['Today', 'accent', [CRM_C[0], CRM_C[2], CRM_C[5]]], ['Waking from snooze', 'blue', [CRM_C[3]]]];
const crR2Pics = (c, i, n = 3) => c.att ? CRM_REC.slice(i, i + n).map(t => t.code) : CRM_PURCH.slice(i, i + n).map(([code]) => code);
const crR2Line = (c, phone) => `${CRM_STEPS[c.step]} · ${c.chan === 'phone' ? 'call' : 'WhatsApp'} · ${c.att ? c.att + ' designs' + (phone ? '' : ' attached') : 'what worked' + (phone ? '' : ' last time')}`;

/* one action row: three thumbs with their numbers, the customer, the step line, the due pill, the channel */
function CrR2Row({ T, c, i, phone, on }) {
  const w = phone ? 50 : 36;
  return <div className="press" style={{ display: 'flex', alignItems: 'center', gap: phone ? 10 : 12, padding: phone ? '8px 10px' : '8px 12px', borderRadius: phone ? 16 : 0, background: on ? T.accentSoft : phone ? T.surface : 'transparent', border: phone ? `1px solid ${on ? T.accentLine : T.line}` : 0, borderTop: phone ? undefined : (i ? `1px solid ${T.line}` : 0), marginBottom: phone ? 6 : 0 }}>
    <span style={{ display: 'flex', gap: 3, flex: 'none' }}>{crR2Pics(c, i, phone ? 2 : 3).map(code => <PickThumb key={code} T={T} t={crTile(code)} w={w} />)}</span>
    <span style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ flex: 1, minWidth: 0, fontFamily: T.fontDisplay, fontSize: phone ? 17 : 15.5, fontWeight: 600, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</span></div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>{phone && <NextPill T={T} c={c} small />}<Meta T={T}>{c.city} · {c.tier}</Meta></div>
      <Meta T={T} style={{ display: 'block', marginTop: 1, color: T.ink2 }}>{crR2Line(c, phone)}</Meta>
    </span>
    {!phone && <NextPill T={T} c={c} small />}
    <Hit T={T} icon={c.chan} size={phone ? 34 : 30} iconSize={14} style={{ background: T.chipBg }} />
  </div>;
}
const CrR2Group = ({ T, g, tone, n, children }) => <div><div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 4px 6px' }}><span style={{ width: 8, height: 8, borderRadius: 4, background: T[tone] }} /><span style={{ fontFamily: T.fontUI, fontSize: 12.5, fontWeight: 600, color: T.ink }}>{g}</span><Meta T={T}>{n}</Meta></div>{children}</div>;

/* ── phone: three rows of chrome (top bar · search island · sub-menu scroller), then the tabs scroll with the list ── */
function ScreenCrR2Today({ T }) {
  return frameF(T, <>
    <div style={{ background: T.header, borderBottom: `1px solid ${T.line}`, boxShadow: T.headerShadow, paddingBottom: 8, marginTop: -54, paddingTop: 54, flex: 'none' }}><CrTop T={T} /><DSearch T={T} placeholder="Customer, city, design" /><CrNodes T={T} active="Follow-ups" /></div>
    <Body style={{ padding: '0 14px 110px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 2, padding: '6px 0 0', borderBottom: `1px solid ${T.line}` }}>{[['Today', 6], ['Journey board'], ['History']].map(([t, n]) => { const on = t === 'Today'; return <span key={t} className="press" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 5, padding: '6px 10px 9px', fontFamily: T.fontUI, fontSize: 13.5, fontWeight: on ? 600 : 400, color: on ? T.ink : T.ink3, whiteSpace: 'nowrap' }}>{t}{n != null && <span style={{ fontSize: 10.5, color: T.ink3 }}>{n}</span>}{on && <span style={{ position: 'absolute', left: 10, right: 10, bottom: -1, height: 2, background: T.accent, borderRadius: 1 }} />}</span>; })}<span style={{ flex: 1 }} /><T.Chip on style={{ height: 26, fontSize: 11 }}>Mine</T.Chip></div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 2px 0' }}><Meta T={T}>6 actions · 2 overdue · oldest first</Meta><span style={{ flex: 1 }} /><Hit T={T} icon="sliders-horizontal" size={26} iconSize={13} style={{ background: T.chipBg, borderRadius: 8 }} /></div>
      {CRM_R2_GROUPS.map(([g, tone, cs]) => <CrR2Group key={g} T={T} g={g} tone={tone} n={cs.length}>{cs.map((c, i) => <CrR2Row key={c.id} T={T} c={c} i={i} phone />)}</CrR2Group>)}
    </Body>
  </>, crDock(T));
}

/* ── web: the same list with the step pane; one control row (tabs · Mine · sort · filters), then the content ── */
function WebCrR2Today({ T }) {
  const pane = <div style={{ padding: '10px 12px', height: '100%', overflow: 'hidden' }}><StepWork T={T} c={CRM_C[0]} /></div>;
  return <WebShell3 T={T} module="CRM" crumb={['CRM', 'Follow-ups', 'Today']} section="Follow-ups" seg={CRM_SEG} active="Follow-ups" tabs={CRM_TABS('f')} paneTitle="Preeti Fashion Hub" pane={pane}>
    <ViewTabs T={T} tabs={[['Today', 6, 'sun'], ['Journey board', null, 'kanban'], ['History', null, 'history']]} active="Today" right={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><T.Chip on style={{ height: 26, fontSize: 11.5 }}>Mine</T.Chip><T.Chip outline icon="arrow-down-up" style={{ height: 26, fontSize: 11.5 }}>Oldest first</T.Chip><IconBtn2 T={T} icon="sliders-horizontal" /></span>} />
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px 0' }}><Meta T={T}>6 actions · 2 overdue · 1 waking from snooze · Refill 5 · New samples 1</Meta></div>
    <div style={{ margin: '8px 24px 0', borderRadius: 18, border: `1px solid ${T.line}`, background: T.surface, overflow: 'hidden', flex: 1, minHeight: 0 }}>
      {CRM_R2_GROUPS.map(([g, tone, cs]) => <div key={g}><div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', background: T.surface2, borderBottom: `1px solid ${T.line}`, borderTop: g === 'Overdue' ? 0 : `1px solid ${T.line}` }}><span style={{ width: 8, height: 8, borderRadius: 4, background: T[tone] }} /><span style={{ fontFamily: T.fontUI, fontSize: 12, fontWeight: 600, color: T.ink }}>{g}</span><Meta T={T}>{cs.length}</Meta></div>{cs.map((c, i) => <CrR2Row key={c.id} T={T} c={c} i={i} on={c.id === CRM_C[0].id} />)}</div>)}
    </div>
  </WebShell3>;
}

/* ── registration: a second CRM band on the board, beside the 8–9 Sep drafts, for the Compare view ── */
(window.NEW_DRAFT_MODULES = window.NEW_DRAFT_MODULES || []).push({ module: 'CRM', note: 'review 2 exemplar', subs: [
  { name: 'Review 2 exemplar', flow: 'Follow-ups opens on Today, picture-first, three-row header on the phone → the same list on web with the step pane and one control row (decision 15; compare with n-1, n-9, nw-1, nw-8)',
    phone: [['Follow-ups · Today, picture-first, three-row header (decision 15 · compare n-1 and n-9)', ScreenCrR2Today]],
    web: [['Follow-ups · Today with the step pane, one control row (decision 15 · compare nw-1 and nw-8)', WebCrR2Today]] },
] });

Object.assign(window, { CRM_R2_GROUPS, crR2Pics, crR2Line, CrR2Row, CrR2Group, ScreenCrR2Today, WebCrR2Today });
