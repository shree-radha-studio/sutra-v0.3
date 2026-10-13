/* NEW DRAFTS · Home (13 Oct 2026). Plan: plans/home.md. Screens render through the theme object T (FINAL light,
   FINALD dark), so one function yields both. Component names start with Hm because every board file shares one
   script scope. Reuses from base: frameF, Body, Hit, OutBtn, Pill, Meta, Sheet, glass, veil, PriceF, money, Ic,
   T.Btn, T.Chip, T.Island, WebShell3, ViewTabs, RightPane (see COMPONENTS.md). */

/* ── module data (fictional; use the names and codes the board already uses) ── */
const Hm_SEG = [['Overview'], ['List', 12, true]];               // web sub-menu buttons: [label, count, alert]
const Hm_TABS = on => [{ icon: 'layout-grid', label: 'Home · Overview', on: on === 'o' }, { icon: 'list', label: 'Home · List', on: on === 'l' }].filter(t => t.on || on !== 'x');

/* ── module-only components ── */
const HmRow = ({ T, title, meta, right }) => <div className="press" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 16, background: T.surface, border: `1px solid ${T.line}` }}>
  <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 16, fontWeight: 600, color: T.ink }}>{title}</div><Meta T={T}>{meta}</Meta></div>{right}
</div>;

/* ── phone: header block on the lifted surface, scrolling body, main island at the foot ── */
function ScreenHmOverview({ T }) {
  return frameF(T, <>
    <div style={{ padding: '54px 14px 10px', background: T.header, borderBottom: `1px solid ${T.line}`, boxShadow: T.headerShadow }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontFamily: T.fontDisplay, fontSize: 22, fontWeight: 600, color: T.ink }}>Home</span><span style={{ flex: 1 }} />
        <Hit T={T} icon="search" size={36} iconSize={16} /><Hit T={T} icon="sliders-horizontal" size={36} iconSize={16} />
      </div>
      <div style={{ display: 'flex', gap: 6, marginTop: 10, overflow: 'hidden' }}>{['All', 'Today', 'Mine', 'Overdue'].map((c, i) => <T.Chip key={c} on={i === 0} outline={i !== 0}>{c}</T.Chip>)}</div>
    </div>
    <Body>
      <Meta T={T} style={{ display: 'block', margin: '4px 2px 8px' }}>9 items · updated just now</Meta>
      <div style={{ display: 'grid', gap: 8 }}>
        <HmRow T={T} title="2798 · Plazo set" meta="Preeti Fashion Hub · Ludhiana · 12 d" right={<Pill T={T} tone="accent">Today</Pill>} />
        <HmRow T={T} title="6002 · Lilac Court" meta="Rangoli Ethnic Wear · Lucknow · 3 d" right={<Pill T={T}>Queued</Pill>} />
      </div>
    </Body>
    <div style={{ position: 'absolute', left: 14, right: 14, bottom: 98, display: 'flex', gap: 8, padding: 8, borderRadius: 24, ...glass(T) }}>
      <OutBtn T={T} icon="filter" style={{ flex: 1, justifyContent: 'center', height: 44 }}>Filter</OutBtn><T.Btn icon="plus" style={{ flex: 1, height: 44 }}>New</T.Btn>
    </div>
  </>, <T.Island active="Home" />);
}

/* ── phone: a sheet over the same screen (scrim + Sheet from base) ── */
function ScreenHmSheet({ T }) {
  return frameF(T, <>
    <ScreenHmOverview T={T} />
    {scrimF(T)}
    <Sheet T={T} h={420} title="New item" foot={<T.Btn style={{ width: '100%', height: 46 }}>Save</T.Btn>}>
      <Meta T={T}>Fields go here, one per row, label left, value right; 44px targets.</Meta>
    </Sheet>
  </>);
}

/* ── web: the approved shell (rail · tab strip · header with sub-menu buttons · view tabs · right pane) ── */
function WebHmOverview({ T }) {
  const pane = <div style={{ padding: 14 }}><Meta T={T}>What the right pane holds for this screen: the selected item, its actions, or filters and sort.</Meta></div>;
  return <WebShell3 T={T} module="Home" crumb={['Home', 'Overview']} section="Overview" seg={Hm_SEG} active="Overview" tabs={Hm_TABS('o')} paneTitle="Selected" pane={pane}>
    <ViewTabs T={T} tabs={[['All', null, 'list'], ['Today', 7, 'sun'], ['Overdue', null, 'alarm-clock']]} active="All" />  {/* tabs are [label, count, lucide icon] */}
    <div style={{ padding: '12px 24px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
      <HmRow T={T} title="2798 · Plazo set" meta="Preeti Fashion Hub · Ludhiana · 12 d" right={<Pill T={T} tone="accent">Today</Pill>} />
      <HmRow T={T} title="6002 · Lilac Court" meta="Rangoli Ethnic Wear · Lucknow · 3 d" right={<Pill T={T}>Queued</Pill>} />
    </div>
  </WebShell3>;
}

/* ── board registration: captions and order are what the owner reads ── */
(window.NEW_DRAFT_MODULES = window.NEW_DRAFT_MODULES || []).push({ module: 'Home', note: 'one line under the module head: what this band covers', subs: [
  { name: 'Overview', flow: 'list → sheet', phone: [['Overview · list', ScreenHmOverview], ['Overview · new item sheet', ScreenHmSheet]], web: [['Overview · list, selected pane', WebHmOverview]] },
] });

Object.assign(window, { Hm_SEG, Hm_TABS, HmRow, ScreenHmOverview, ScreenHmSheet, WebHmOverview });
