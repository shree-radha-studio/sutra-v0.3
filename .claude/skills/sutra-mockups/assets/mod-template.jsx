/* NEW DRAFTS · __NAME__ (__DATE__). Plan: plans/__ID__.md. Screens render through the theme object T (FINAL light,
   FINALD dark), so one function yields both. Component names start with __PFX__ because every board file shares one
   script scope. Reuses from base: frameF, Body, Hit, OutBtn, Pill, Meta, Sheet, glass, veil, PriceF, money, Ic,
   T.Btn, T.Chip, T.Island, WebShell3, ViewTabs, RightPane (see COMPONENTS.md). */

/* ── module data (fictional; use the names and codes the board already uses) ── */
const __PFX___SEG = [['Overview'], ['List', 12, true]];               // web sub-menu buttons: [label, count, alert]
const __PFX___TABS = on => [{ icon: 'layout-grid', label: '__NAME__ · Overview', on: on === 'o' }, { icon: 'list', label: '__NAME__ · List', on: on === 'l' }].filter(t => t.on || on !== 'x');

/* ── module-only components ── */
const __PFX__Row = ({ T, title, meta, right }) => <div className="press" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 16, background: T.surface, border: `1px solid ${T.line}` }}>
  <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 16, fontWeight: 600, color: T.ink }}>{title}</div><Meta T={T}>{meta}</Meta></div>{right}
</div>;

/* ── phone: header block on the lifted surface, scrolling body, main island at the foot ── */
function Screen__PFX__Overview({ T }) {
  return frameF(T, <>
    <div style={{ padding: '54px 14px 10px', background: T.header, borderBottom: `1px solid ${T.line}`, boxShadow: T.headerShadow }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontFamily: T.fontDisplay, fontSize: 22, fontWeight: 600, color: T.ink }}>__NAME__</span><span style={{ flex: 1 }} />
        <Hit T={T} icon="search" size={36} iconSize={16} /><Hit T={T} icon="sliders-horizontal" size={36} iconSize={16} />
      </div>
      <div style={{ display: 'flex', gap: 6, marginTop: 10, overflow: 'hidden' }}>{['All', 'Today', 'Mine', 'Overdue'].map((c, i) => <T.Chip key={c} on={i === 0} outline={i !== 0}>{c}</T.Chip>)}</div>
    </div>
    <Body>
      <Meta T={T} style={{ display: 'block', margin: '4px 2px 8px' }}>9 items · updated just now</Meta>
      <div style={{ display: 'grid', gap: 8 }}>
        <__PFX__Row T={T} title="2798 · Plazo set" meta="Preeti Fashion Hub · Ludhiana · 12 d" right={<Pill T={T} tone="accent">Today</Pill>} />
        <__PFX__Row T={T} title="6002 · Lilac Court" meta="Rangoli Ethnic Wear · Lucknow · 3 d" right={<Pill T={T}>Queued</Pill>} />
      </div>
    </Body>
    <div style={{ position: 'absolute', left: 14, right: 14, bottom: 98, display: 'flex', gap: 8, padding: 8, borderRadius: 24, ...glass(T) }}>
      <OutBtn T={T} icon="filter" style={{ flex: 1, justifyContent: 'center', height: 44 }}>Filter</OutBtn><T.Btn icon="plus" style={{ flex: 1, height: 44 }}>New</T.Btn>
    </div>
  </>, <T.Island active="__NAME__" />);
}

/* ── phone: a sheet over the same screen (scrim + Sheet from base) ── */
function Screen__PFX__Sheet({ T }) {
  return frameF(T, <>
    <Screen__PFX__Overview T={T} />
    {scrimF(T)}
    <Sheet T={T} h={420} title="New item" foot={<T.Btn style={{ width: '100%', height: 46 }}>Save</T.Btn>}>
      <Meta T={T}>Fields go here, one per row, label left, value right; 44px targets.</Meta>
    </Sheet>
  </>);
}

/* ── web: the approved shell (rail · tab strip · header with sub-menu buttons · view tabs · right pane) ── */
function Web__PFX__Overview({ T }) {
  const pane = <div style={{ padding: 14 }}><Meta T={T}>What the right pane holds for this screen: the selected item, its actions, or filters and sort.</Meta></div>;
  return <WebShell3 T={T} module="__NAME__" crumb={['__NAME__', 'Overview']} section="Overview" seg={__PFX___SEG} active="Overview" tabs={__PFX___TABS('o')} paneTitle="Selected" pane={pane}>
    <ViewTabs T={T} tabs={[['All', null, 'list'], ['Today', 7, 'sun'], ['Overdue', null, 'alarm-clock']]} active="All" />  {/* tabs are [label, count, lucide icon] */}
    <div style={{ padding: '12px 24px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
      <__PFX__Row T={T} title="2798 · Plazo set" meta="Preeti Fashion Hub · Ludhiana · 12 d" right={<Pill T={T} tone="accent">Today</Pill>} />
      <__PFX__Row T={T} title="6002 · Lilac Court" meta="Rangoli Ethnic Wear · Lucknow · 3 d" right={<Pill T={T}>Queued</Pill>} />
    </div>
  </WebShell3>;
}

/* ── board registration: captions and order are what the owner reads ── */
(window.NEW_DRAFT_MODULES = window.NEW_DRAFT_MODULES || []).push({ module: '__NAME__', note: 'one line under the module head: what this band covers', subs: [
  { name: 'Overview', flow: 'list → sheet', phone: [['Overview · list', Screen__PFX__Overview], ['Overview · new item sheet', Screen__PFX__Sheet]], web: [['Overview · list, selected pane', Web__PFX__Overview]] },
] });

Object.assign(window, { __PFX___SEG, __PFX___TABS, __PFX__Row, Screen__PFX__Overview, Screen__PFX__Sheet, Web__PFX__Overview });
