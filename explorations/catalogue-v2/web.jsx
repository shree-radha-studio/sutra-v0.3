/* WEB rows: the final screens on a laptop (1280×800), light and dark, same tokens as the phone final rows.
   Shell (approved 8 Sep 2026) = rail (greeting · RM · settings · firm logo) · tab strip of open screens · header v2
   (path · head · sub-menu buttons · Customer mode · bell · cart · search · orb) · main · collapsible right pane.
   One frame shows the expanded text sidebar with collapsible sub-menus. */

function LaptopDevice({ width = 1280, height = 800, dark, children }) {
  return <div style={{ width: width + 28, borderRadius: 22, background: '#1B1715', padding: 14, boxShadow: '0 40px 80px rgba(0,0,0,.28), 0 0 0 1px rgba(0,0,0,.2)', fontFamily: '-apple-system, system-ui, sans-serif' }}>
    <div style={{ width, height, borderRadius: 10, overflow: 'hidden', background: dark ? '#000' : '#F2F2F7', position: 'relative' }}>{children}</div>
    <div style={{ height: 10, margin: '12px -14px -14px', borderRadius: '0 0 22px 22px', background: 'linear-gradient(180deg,#2A2523,#161312)' }} />
  </div>;
}
const WEB_NAV = [['house', 'Home'], ['layout-grid', 'Catalogue'], ['users', 'CRM'], ['scissors', 'Production'], ['package', 'Dispatch'], ['library', 'Hub'], ['sparkles', 'Studio'], ['git-branch', 'Channels']];
const SRS_WHITE = XD.A + 'clients/srs-dress-only.png';
/* ── 1. Tab strip: open screens stick like browser tabs, as a quiet element: page colour, no strip, a hairline base.
   The active tab is the page's sheet: surface fill, flowing S-curves down to the base, flush with the top edge. ── */
const TAB_H = 28, CAP_W = 16;
const TabCap = ({ T, side }) => { const L = side === 'l', h = TAB_H, w = CAP_W;
  const fill = L ? `M0 ${h} C${w * .55} ${h} ${w * .45} 0 ${w} 0 L${w} ${h} Z` : `M0 0 C${w * .55} 0 ${w * .45} ${h} ${w} ${h} L0 ${h} Z`;
  const edge = L ? `M0 ${h} C${w * .55} ${h} ${w * .45} 0 ${w} 0` : `M0 0 C${w * .55} 0 ${w * .45} ${h} ${w} ${h}`;
  return <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ flex: 'none', display: 'block', overflow: 'visible' }}><path d={fill} fill={T.surface} /><path d={edge} fill="none" stroke={T.line2} strokeWidth="1" /></svg>; };
function TabStrip({ T, tabs, right }) {
  const list = tabs.filter(t => !t.pinned);
  return <div style={{ height: TAB_H + 1, flex: 'none', background: T.bg, borderBottom: `1px solid ${T.line2}`, display: 'flex', alignItems: 'flex-end', padding: '0 14px 0 4px', gap: 0, position: 'relative', zIndex: 4 }}>
    {list.map((t, i) => {
      if (t.on) return <div key={i} className="press" style={{ display: 'flex', alignItems: 'stretch', height: TAB_H, position: 'relative', zIndex: 2, marginBottom: -1 }}>
        <TabCap T={T} side="l" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0, maxWidth: 190, padding: '0 2px 0 0', background: T.surface, borderTop: `1px solid ${T.line2}`, fontFamily: T.fontUI, fontSize: 12, fontWeight: 500, color: T.ink, whiteSpace: 'nowrap' }}><Ic name={t.icon} size={12} sw={1.8} color={T.ink2} /><span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.label}</span><span style={{ width: 16, height: 16, borderRadius: 8, display: 'grid', placeItems: 'center', color: T.ink3, marginLeft: 2 }}><Ic name="x" size={10} sw={2} /></span></div>
        <TabCap T={T} side="r" />
      </div>;
      return <React.Fragment key={i}>
        <div className="press" style={{ display: 'flex', alignItems: 'center', gap: 6, height: TAB_H - 4, padding: '0 14px', maxWidth: 170, fontFamily: T.fontUI, fontSize: 12, color: T.ink3, whiteSpace: 'nowrap', marginBottom: 2 }}><Ic name={t.icon} size={12} sw={1.6} color={T.ink3} /><span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.label}</span></div>
        {!(list[i + 1] && list[i + 1].on) && i < list.length - 1 && <span style={{ width: 1, height: 12, background: T.line, marginBottom: 8, flex: 'none' }} />}
      </React.Fragment>;
    })}
    <span className="press" style={{ width: 22, height: 22, borderRadius: 11, display: 'grid', placeItems: 'center', color: T.ink3, marginLeft: 6, marginBottom: 3 }}><Ic name="plus" size={13} sw={2} /></span>
    <span style={{ flex: 1 }} />{right && <span style={{ marginBottom: 3, marginRight: 10 }}>{right}</span>}
    <span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, height: 20, fontFamily: T.fontUI, fontSize: 10.5, color: T.ink3, marginBottom: 5 }}>{list.length} tabs<Ic name="chevron-down" size={11} /></span>
  </div>;
}
function SearchField({ T, on, query, width = 300 }) {
  return <div style={{ width, height: 36, borderRadius: 18, background: T.surface, border: `1px solid ${on ? T.accent : T.line2}`, boxShadow: on ? `0 0 0 3px ${T.accentSoft}` : 'none', display: 'flex', alignItems: 'center', gap: 5, padding: '0 10px 0 3px', flex: 'none' }}>
    <span className="press" style={{ width: 29, height: 29, borderRadius: 15, background: T.accent, color: T.onAccent, display: 'grid', placeItems: 'center', flex: 'none' }}><Ic name="scan-line" size={15} sw={1.9} /></span>
    <span className="press" style={{ width: 29, height: 29, borderRadius: 15, border: `1.5px solid ${T.accentLine}`, color: T.accent, display: 'grid', placeItems: 'center', flex: 'none' }}><CamSearch size={14} color={T.accent} /></span>
    <span style={{ flex: 1, minWidth: 0, fontFamily: T.fontUI, fontSize: 12.5, color: query ? T.ink : T.ink3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingLeft: 3 }}>{query || 'Search'}{on && <span className="aura-dot" style={{ display: 'inline-block', width: 1.5, height: 14, background: T.accent, marginLeft: 2, verticalAlign: -2 }} />}</span>
    {!on && width >= 220 && <span style={{ fontFamily: T.fontMono, fontSize: 10, color: T.ink3, padding: '1px 5px', borderRadius: 5, background: T.chipBg }}>⌘K</span>}<Ic name="search" size={15} color={T.ink2} />
  </div>;
}
/* ── 4. Rail and sidebar: mark 8% larger · greeting cycling above "RM" on a soft highlight · settings between the user and
   the firm's white logo, which sits lifted off the foot. ── */
const GREETS = [['Hi', '"Jost", sans-serif', 'normal', 400], ['hello', '"Cormorant Garamond", serif', 'italic', 500], ['नमस्ते', 'system-ui, "Noto Sans Devanagari", sans-serif', 'normal', 500], ['Hola', '"Jost", sans-serif', 'normal', 300], ['Bonjour', '"Cormorant Garamond", serif', 'italic', 500], ['Ciao', '"Jost", sans-serif', 'normal', 500], ['ਸਤ ਸ੍ਰੀ ਅਕਾਲ', 'system-ui, sans-serif', 'normal', 500], ['Salaam', '"Cormorant Garamond", serif', 'italic', 500]];
const Greet = ({ size = 10.5, color = 'rgba(255,255,255,.8)', width = 56 }) => <span className="hi" style={{ position: 'relative', display: 'block', height: size + 6, width, textAlign: 'center', lineHeight: 1 }}>{GREETS.map(([w, f, st, wt], i) => <span key={w} style={{ position: 'absolute', left: 0, right: 0, top: 2, fontFamily: f, fontStyle: st, fontWeight: wt, fontSize: st === 'italic' ? size + 2 : size, color, whiteSpace: 'nowrap', animationDelay: (i * 2.2) + 's', animationDuration: (GREETS.length * 2.2) + 's' }}>{w}</span>)}</span>;
const UserMark = ({ T, big }) => <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, lineHeight: 1, flex: 'none' }}><Greet size={big ? 11 : 10} /><span style={{ width: big ? 40 : 36, height: big ? 40 : 36, borderRadius: 11, background: 'rgba(255,255,255,.09)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.08)', display: 'grid', placeItems: 'center', fontFamily: T.fontDisplay, fontSize: big ? 17 : 15, fontWeight: 700, color: '#FFFFFF', letterSpacing: '.02em' }}>RM</span></span>;
function Rail2({ T, active = 'Catalogue' }) {
  const it = ([i, l]) => { const on = l === active; return <span key={l} className="press" title={l} style={{ width: 44, height: 44, borderRadius: 14, display: 'grid', placeItems: 'center', color: on ? T.accent : T.railInk2, background: on ? 'rgba(255,255,255,.10)' : 'transparent', boxShadow: on ? `inset 3px 0 0 ${T.accent}` : 'none' }}><Ic name={i} size={20} sw={on ? 1.9 : 1.6} /></span>; };
  return <div style={{ position: 'absolute', left: 12, top: 12, bottom: 12, width: 60, borderRadius: 22, background: T.rail, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 0 22px', gap: 4, zIndex: 5 }}>
    <span className="press" style={{ width: 40, height: 40, borderRadius: 12, display: 'grid', placeItems: 'center', color: T.railInk2 }}><Ic name="panel-left" size={19} /></span>
    <img src={XD.A + 'logo/sutra-mark-gold.png'} style={{ height: 28, margin: '5px 0 9px' }} />
    {WEB_NAV.map(it)}
    <span style={{ flex: 1 }} />
    <span className="press" style={{ padding: '0 0 4px' }}><UserMark T={T} /></span>
    <span className="press" style={{ width: 40, height: 40, borderRadius: 12, display: 'grid', placeItems: 'center', color: T.railInk2 }}><Ic name="settings" size={19} /></span>
    <img src={SRS_WHITE} style={{ width: 38, opacity: .92, marginTop: 6 }} title="Shree Radha Studio" />
  </div>;
}
function Sidebar2({ T, active = 'Catalogue', here = 'Catalogue' }) {
  return <div style={{ position: 'absolute', left: 12, top: 12, bottom: 12, width: 262, borderRadius: 22, background: T.rail, color: T.railInk, display: 'flex', flexDirection: 'column', zIndex: 6, boxShadow: '20px 0 60px -20px rgba(0,0,0,.5)' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 12px 10px 16px' }}><img src={XD.A + 'logo/sutra-mark-gold.png'} style={{ height: 28 }} /><span style={{ width: 1, height: 16, background: 'rgba(255,255,255,.2)' }} /><img src={SRS_WHITE} style={{ height: 20 }} /><span style={{ flex: 1 }} /><span className="press" style={{ width: 34, height: 34, borderRadius: 10, display: 'grid', placeItems: 'center', color: T.railInk2 }}><Ic name="panel-left-close" size={18} /></span></div>
    <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', padding: '4px 10px' }}>
      {MENU.map(([ic, m, subs]) => { const open = m === active; return <div key={m} style={{ borderRadius: 14, background: open ? 'rgba(255,255,255,.07)' : 'transparent', marginBottom: 2 }}>
        <div className="press" style={{ display: 'flex', alignItems: 'center', gap: 12, height: 40, padding: '0 10px', color: open ? T.railInk : T.railInk2 }}><Ic name={ic} size={18} sw={open ? 1.9 : 1.6} color={open ? T.accent : undefined} /><span style={{ flex: 1, fontFamily: T.fontUI, fontSize: 13.5, fontWeight: open ? 600 : 500 }}>{m}</span><Ic name={open ? 'chevron-up' : 'chevron-down'} size={14} style={{ opacity: .7 }} /></div>
        {open && <div style={{ padding: '0 8px 8px 40px' }}>{subs.map(s => { const on = s === here; return <div key={s} className="press" style={{ display: 'flex', alignItems: 'center', gap: 8, height: 32, fontFamily: T.fontUI, fontSize: 13, color: on ? T.railInk : T.railInk2, fontWeight: on ? 600 : 400 }}><span style={{ width: 5, height: 5, borderRadius: 3, background: on ? T.accent : 'transparent', marginLeft: -13 }} />{s}</div>; })}</div>}
      </div>; })}
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px 16px 16px', borderTop: '1px solid rgba(255,255,255,.08)' }}><span className="press"><UserMark T={T} big /></span><span style={{ flex: 1, minWidth: 0, paddingTop: 12 }}><div style={{ fontFamily: T.fontUI, fontSize: 12.5, fontWeight: 600 }}>Rohan Mehta</div><div style={{ fontFamily: T.fontUI, fontSize: 10.5, color: T.railInk2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Sale manager · Shree Radha Studio</div></span><span className="press" style={{ color: T.railInk2, paddingTop: 12 }}><Ic name="sun" size={16} /></span><span className="press" style={{ color: T.railInk2, paddingTop: 12 }}><Ic name="settings" size={16} /></span></div>
  </div>;
}
function SubMenuFloat({ T, groups }) {
  return <div style={{ position: 'absolute', left: 0, top: 'calc(100% + 10px)', width: 268, borderRadius: 18, padding: 8, zIndex: 30, transformOrigin: 'top left', ...glass(T, { boxShadow: `inset 0 1px 0 ${T.glassHi}, 0 30px 60px -24px rgba(0,0,0,.45)` }) }}>
    {groups.map(([title, items], g) => <div key={g} style={{ borderTop: g ? `1px solid ${T.line}` : 0, marginTop: g ? 6 : 0, paddingTop: g ? 6 : 0 }}>
      {title && <div style={{ fontFamily: T.fontUI, fontSize: 10.5, letterSpacing: '.08em', textTransform: 'uppercase', color: T.ink3, padding: '6px 10px 4px' }}>{title}</div>}
      {items.map(([l, n, on, ic]) => <div key={l} className="press" style={{ display: 'flex', alignItems: 'center', gap: 9, height: 34, padding: '0 10px', borderRadius: 11, background: on ? T.accentSoft : 'transparent', color: on ? T.accent : T.ink, fontFamily: T.fontUI, fontSize: 13, fontWeight: on ? 600 : 400 }}>{ic && <Ic name={ic} size={14} color={on ? T.accent : T.ink3} />}<span style={{ flex: 1 }}>{l}</span>{n != null && <span style={{ fontSize: 11, color: T.ink3, fontVariantNumeric: 'tabular-nums' }}>{n}</span>}{on && <Ic name="check" size={13} />}</div>)}
    </div>)}
  </div>;
}
const SO_FLOAT = [[null, [['Raised', 3, true], ['Approved', 2], ['Dispatched', 2], ['Cancelled', 1], ['Returns', 2]]], ['Analytics', [['Orders', null, false, 'bar-chart-3'], ['Designs (SKU)', null, false, 'shirt'], ['Customers', null, false, 'users']]], ['Views', [['Cards', null, false, 'layout-list'], ['Table', null, false, 'table-2']]]];
/* ── header v2 (approved 8 Sep 2026): path above a 24px head, a fixed head block, the sub-menu as text buttons centred
   on the head, Customer mode as a switch, then bell · cart · search · orb. Three levels: menu = rail, sub-menu = these
   buttons, sub-sub-menu = ViewTabs at the top of the page. Map: design/SUTRA-SCREEN-FLOW.md ── */
const LEFT_W = 196;
function SubMenu({ T, items, active, open }) {
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, flex: 'none' }}>
    {items.map(([l, n, suite]) => { const on = l === active; return <span key={l} style={{ position: 'relative' }}><span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 34, padding: '0 10px', borderRadius: 10, background: on || open === l ? T.chipBg : 'transparent', color: on ? T.ink : T.ink2, fontFamily: T.fontUI, fontSize: 13.5, fontWeight: on ? 600 : 400, whiteSpace: 'nowrap' }}>{l}{n != null && <span style={{ fontSize: 11, color: on ? T.accent : T.ink3, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{n}</span>}{suite && <Ic name="chevron-down" size={12} color={T.ink3} style={{ marginLeft: -2 }} />}</span>{open === l && <SubMenuFloat T={T} groups={SO_FLOAT} />}</span>; })}
  </span>;
}
const ModeSwitch = ({ T, label = 'Customer mode', on }) => <span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 34, padding: '0 10px 0 8px', borderRadius: 10, color: on ? T.accent : T.ink2, fontFamily: T.fontUI, fontSize: 12.5, whiteSpace: 'nowrap', flex: 'none', marginLeft: 8 }}><span style={{ width: 28, height: 16, borderRadius: 8, background: on ? T.accent : T.line2, position: 'relative', flex: 'none' }}><span style={{ position: 'absolute', top: 2, left: on ? 14 : 2, width: 12, height: 12, borderRadius: 6, background: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,.25)' }} /></span>{label}</span>;
function Header3({ T, crumb = [], section, seg, active, open, mode, voice, searchOn, query, right, searchWidth }) {
  return <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 8, height: 70, padding: '18px 16px 0 22px', boxSizing: 'border-box', borderBottom: `1px solid ${T.line}`, background: T.surface, flex: 'none', zIndex: 5 }}>
    <div style={{ position: 'absolute', left: 22, top: 9, display: 'flex', alignItems: 'center', gap: 3, fontFamily: T.fontUI, fontSize: 10.5, color: T.ink3, whiteSpace: 'nowrap' }}>{crumb.map((c, i) => <React.Fragment key={i}>{i > 0 && <Ic name="chevron-right" size={9} color={T.ink3} />}<span className="press" style={{ color: i === crumb.length - 1 ? T.ink2 : T.ink3 }}>{c}</span></React.Fragment>)}</div>
    <span style={{ width: LEFT_W, minWidth: 0, flex: 'none', marginRight: 12, fontFamily: T.fontDisplay, fontSize: 24, fontWeight: 500, color: T.ink, lineHeight: 1.05, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{section}</span>
    <SubMenu T={T} items={seg} active={active} open={open} />
    {mode && <ModeSwitch T={T} label={mode} />}
    <span style={{ flex: 1 }} />
    {right}
    <Hit T={T} icon="bell" size={36} iconSize={17} /><CartIcon T={T} size={36} />
    <SearchField T={T} on={searchOn} query={query} width={searchWidth || (seg.length > 5 ? 196 : 236)} />
    <span className="press" style={{ width: 40, height: 40, display: 'grid', placeItems: 'center' }}><Orb T={T} on={voice} size={32} /></span>
  </div>;
}
/* sub-sub-menu: underline tabs at the top of the page; `extra` tabs sit after a hairline (Analytics) */
function ViewTabs({ T, tabs, active, extra = [], right, eyebrow, back }) {
  const tab = ([t, n, ic]) => { const on = t === active; return <span key={t} className="press" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 12px 12px', fontFamily: T.fontUI, fontSize: 14, fontWeight: on ? 600 : 400, color: on ? T.ink : T.ink3, whiteSpace: 'nowrap' }}>{ic && <Ic name={ic} size={14} />}{t}{n != null && <span style={{ fontSize: 11.5, color: T.ink3, fontVariantNumeric: 'tabular-nums' }}>{n}</span>}{on && <span style={{ position: 'absolute', left: 12, right: 12, bottom: 0, height: 2, background: T.accent, borderRadius: 1 }} />}</span>; };
  return <div style={{ display: 'flex', alignItems: 'center', gap: 2, padding: '4px 24px 0', borderBottom: `1px solid ${T.line}`, flex: 'none' }}>
    {back && <span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, height: 30, padding: '0 10px 0 6px', borderRadius: 999, background: T.chipBg, fontFamily: T.fontUI, fontSize: 12, color: T.ink2, marginRight: 8 }}><Ic name="arrow-left" size={13} />{back}</span>}
    {eyebrow && <span style={{ fontFamily: T.fontUI, fontSize: 10.5, letterSpacing: '.09em', textTransform: 'uppercase', color: T.ink3, marginRight: 6 }}>{eyebrow}</span>}
    {tabs.map(tab)}
    {extra.length > 0 && <span style={{ width: 1, height: 18, background: T.line2, margin: '0 8px' }} />}
    {extra.map(tab)}
    <span style={{ flex: 1 }} />{right}
  </div>;
}
const CAT_SEG = [['Catalogue'], ['Carts', 3], ['Sale orders', null, true]];
const DISP_SEG = [['Ready', 6], ['Pending', 42, true], ['Packing', 8, true], ['Billed', null, true], ['Stock', null, true], ['Out of stock', 14, true], ['Sale return', 2, true]];
const SO_TABS2 = [['Raised', 3], ['Approved', 2], ['Dispatched', 2], ['Cancelled', 1], ['Returns', 2]];
function RightPane({ T, title, children, collapsed, width = 340 }) {
  if (collapsed) return <div style={{ width: 30, flex: 'none', borderLeft: `1px solid ${T.line}`, background: T.surface, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 12, gap: 10 }}><span className="press" style={{ width: 24, height: 24, borderRadius: 8, background: T.chipBg, display: 'grid', placeItems: 'center', color: T.ink2 }}><Ic name="chevron-left" size={14} /></span><span style={{ writingMode: 'vertical-rl', fontFamily: T.fontUI, fontSize: 11, color: T.ink3, letterSpacing: '.08em' }}>{title}</span></div>;
  return <div style={{ width, flex: 'none', borderLeft: `1px solid ${T.line}`, background: T.surface, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 12px 10px 16px', borderBottom: `1px solid ${T.line}` }}><span style={{ fontFamily: T.fontDisplay, fontSize: 18, fontWeight: 600, color: T.ink, flex: 1 }}>{title}</span><span className="press" style={{ width: 28, height: 28, borderRadius: 8, background: T.chipBg, display: 'grid', placeItems: 'center', color: T.ink2 }}><Ic name="panel-right-close" size={15} /></span></div>
    <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>{children}</div>
  </div>;
}
/* the shell: rail (or expanded sidebar) · tab strip · header v2 · main + collapsible right pane */
function WebShell3({ T, module, crumb, section, seg, active, subOpen, mode, tabs, stripRight, children, pane, paneTitle, paneCollapsed, paneWidth, sidebar, voice, searchOn, query, headerRight, overlay, railActive, searchWidth }) {
  return <div style={{ position: 'relative', height: '100%', background: T.bg, color: T.ink, fontFamily: T.fontUI, overflow: 'hidden' }}>
    <div style={{ position: 'absolute', inset: 0, background: T.depth, pointerEvents: 'none' }} />
    {sidebar ? <Sidebar2 T={T} active={railActive || module} here={active} /> : <Rail2 T={T} active={railActive || module} />}
    <div style={{ position: 'absolute', left: 84, top: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column' }}>
      <TabStrip T={T} tabs={tabs} right={stripRight} />
      <Header3 T={T} crumb={crumb || [module, section]} section={section} seg={seg} active={active} open={subOpen} mode={mode} voice={voice} searchOn={searchOn} query={query} right={headerRight} searchWidth={searchWidth} />
      <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>
        <div style={{ flex: 1, minWidth: 0, minHeight: 0, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column' }}>{children}</div>
        {pane && <RightPane T={T} title={paneTitle} collapsed={paneCollapsed} width={paneWidth}>{pane}</RightPane>}
      </div>
    </div>
    {overlay}
  </div>;
}
/* Catalogue finals call this: title = the head, crumb = "a · b · c" path, tab = what the open tab says */
function WebShell({ T, title, crumb, active = 'Catalogue', tab, sub, subOpen, children, pane, paneTitle, paneCollapsed, paneWidth, sidebar, voice, headerRight, overlay, searchOn, query }) {
  const path = crumb ? crumb.split(' · ') : [title]; if (path[0] !== active) path.unshift(active);
  const s = sub || (title === 'Carts' ? 'Carts' : (/sale order/i.test(title) || /^SO-/.test(title) || path.includes('Sale orders')) ? 'Sale orders' : 'Catalogue');
  const label = tab || title; const icon = s === 'Carts' ? 'shopping-basket' : s === 'Sale orders' ? 'receipt-text' : /^\d/.test(title) ? 'shirt' : 'layout-grid';
  const tabs = label === 'Catalogue' || label.startsWith('Catalogue') ? [{ icon: 'layout-grid', label, on: true }, { icon: 'receipt-text', label: 'Sale orders · Raised' }] : [{ icon: 'layout-grid', label: 'Catalogue' }, { icon, label, on: true }];
  return <WebShell3 T={T} module={active} crumb={path} section={title} seg={CAT_SEG} active={s} subOpen={subOpen} mode="Customer mode" tabs={tabs} sidebar={sidebar} voice={voice} searchOn={searchOn} query={query} headerRight={headerRight} pane={pane} paneTitle={paneTitle} paneCollapsed={paneCollapsed} paneWidth={paneWidth} overlay={overlay}>{children}</WebShell3>;
}
/* Cart pane: the phone cart card, docked */
function CartPane({ T }) {
  const groups = groupsOf(); const pcs = groups.reduce((s, g) => s + g.pcs, 0), total = groups.reduce((s, g) => s + g.pcs * (g.d.price || 0), 0);
  return <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
    <div style={{ padding: '10px 12px 0' }}><CartChips T={T} cart="A" /></div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px 8px' }}><span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 18, fontWeight: 500, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Ramleela Fashion</div><div style={{ fontSize: 11.5, color: T.ink3 }}>Surat · In-cabin · {pcs} pcs</div></span><span style={{ display: 'inline-flex', padding: 3, borderRadius: 999, background: T.bg2 }}>{['In-cabin', 'WhatsApp'].map((b, i) => <span key={b} style={{ height: 24, padding: '0 9px', borderRadius: 999, display: 'grid', placeItems: 'center', fontSize: 11, background: i === 0 ? T.surface : 'transparent', color: i === 0 ? T.ink : T.ink3 }}>{b}</span>)}</span></div>
    <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}><CartGroups T={T} groups={groups} photo={40} /></div>
    <div style={{ padding: '10px 16px 14px', borderTop: `1px solid ${T.line}`, display: 'flex', alignItems: 'center', gap: 10 }}><span><div style={{ fontSize: 11, color: T.ink3 }}>{pcs} pcs · due 20 d</div><PriceF v={total} size={22} font={T.fontSerif} color={T.ink} dim={T.ink3} /></span><span style={{ flex: 1 }} /><T.Btn icon="check" small style={{ height: 38 }}>Submit</T.Btn></div>
  </div>;
}
function WebLists({ T, count = 612, view = 'grid' }) {
  return <div style={{ padding: '14px 24px 0' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      {LISTS.map(([l, k]) => { const on = l === 'All'; return <span key={l} className="press" style={{ padding: on ? '4px 14px' : '4px 9px', borderRadius: 999, background: on ? T.ink : 'transparent', color: on ? T.bg : k === 'custom' ? T.custom : T.ink2, fontFamily: T.fontDisplay, fontSize: 18, fontWeight: 500, fontStyle: k === 'custom' ? 'italic' : 'normal', whiteSpace: 'nowrap' }}>{l}</span>; })}
      <span className="press" style={{ width: 26, height: 26, borderRadius: 13, background: T.chipBg, display: 'grid', placeItems: 'center', color: T.ink2 }}><Ic name="plus" size={13} /></span>
      <span style={{ flex: 1 }} />
      <Hit T={T} icon={view === 'grid' ? 'list' : 'layout-grid'} size={36} iconSize={16} style={{ background: T.surface, border: `1px solid ${T.line2}` }} /><Hit T={T} icon="sliders-horizontal" size={36} iconSize={16} style={{ background: T.surface, border: `1px solid ${T.line2}` }} />
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10 }}><span style={{ fontSize: 12, color: T.ink3, marginRight: 4 }}>{count} designs</span><T.Chip x>Top 30</T.Chip><T.Chip x>Delhi</T.Chip><T.Chip x>Zari work</T.Chip><T.Chip x>Wine</T.Chip><span style={{ flex: 1 }} /><span style={{ fontSize: 12, color: T.ink3 }}>Sort · Featured</span></div>
  </div>;
}
/* 1 · catalogue grid, cart pane */
function WebGrid({ T, mode = 'grid', sidebar, voice, paneCollapsed }) {
  const list = XD.designs.slice(0, 8);
  return <WebShell T={T} title="Catalogue" crumb="Products · All" tab="Catalogue · All" sidebar={sidebar} voice={voice} paneCollapsed={paneCollapsed} paneTitle="Cart A" pane={<CartPane T={T} />} overlay={voice && <>
    <div style={{ position: 'absolute', left: 84, right: 340, bottom: 0, height: 220, pointerEvents: 'none', overflow: 'hidden' }}><span className="glow-a" style={{ position: 'absolute', left: '5%', bottom: -30, width: 320, height: 180, borderRadius: '50%', background: '#E0507A', filter: 'blur(40px)', opacity: .85 }} /><span className="glow-b" style={{ position: 'absolute', left: '40%', bottom: -50, width: 300, height: 180, borderRadius: '50%', background: '#6E7BFF', filter: 'blur(40px)', opacity: .8 }} /><span className="glow-c" style={{ position: 'absolute', left: '68%', bottom: -20, width: 280, height: 170, borderRadius: '50%', background: '#FFB347', filter: 'blur(40px)', opacity: .8 }} /></div>
    <div style={{ position: 'absolute', left: '50%', bottom: 28, transform: 'translateX(-50%)', height: 44, padding: '0 26px', borderRadius: 22, display: 'flex', alignItems: 'center', ...glass(T) }}><span style={{ fontFamily: T.fontUI, fontWeight: 300, fontSize: 17, color: T.ink, whiteSpace: 'nowrap' }}>wine lehenga under five thousand</span><span className="aura-dot" style={{ width: 2, height: 18, background: T.accent, marginLeft: 4 }} /></div>
  </>}>
    <WebLists T={T} view={mode} />
    {mode === 'list' ? <div style={{ margin: '12px 24px 0', padding: '0 16px', borderRadius: 18, background: T.surface, border: `1px solid ${T.line}` }}>{list.map(d => <T.ListRow key={d.code} d={d} qty={QTY[d.code]} />)}</div>
      : <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: '18px 14px', padding: '14px 24px 24px' }}>{list.map(d => <T.GridCard key={d.code} d={d} qty={QTY[d.code]} />)}</div>}
  </WebShell>;
}
const WebGridS = ({ T }) => <WebGrid T={T} />;
const WebListS = ({ T }) => <WebGrid T={T} mode="list" />;
const WebSidebarS = ({ T }) => <WebGrid T={T} sidebar paneCollapsed />;
const WebVoiceS = ({ T }) => <WebGrid T={T} voice />;
/* 3 · product, customer view */
function WebProduct({ T }) {
  const d = XD.designs[0]; const colour = 'Sky';
  return <WebShell T={T} title={d.code} crumb={`Catalogue · ${d.cat} · ${d.name}`} tab={`${d.code} · ${d.name}`} paneTitle="Cart A" pane={<CartPane T={T} />}>
    <div style={{ display: 'flex', gap: 24, padding: '20px 24px', height: '100%' }}>
      <div style={{ display: 'flex', gap: 10, flex: 'none' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{d.colours.map(n => { const on = n === colour; return <div key={n} className="press" style={{ width: 56, height: 70, borderRadius: 10, overflow: 'hidden', background: n === d.colours[0] ? T.photoBg : XD.cols[n], boxShadow: on ? `0 0 0 2px ${T.bg}, 0 0 0 3.5px ${T.accent}` : 'none' }}>{n === d.colours[0] && <img src={d.src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}</div>; })}<div className="press" style={{ width: 56, height: 70, borderRadius: 10, background: T.chipBg, display: 'grid', placeItems: 'center', color: T.ink3 }}><Ic name="play" size={16} /></div></div>
        <div style={{ position: 'relative', width: 430, height: 560, borderRadius: 20, overflow: 'hidden', background: T.photoBg }}><img src={d.src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /><div style={{ position: 'absolute', right: 12, top: 12, display: 'flex', gap: 6 }}><Hit T={T} icon="maximize-2" style={veil()} /><Hit T={T} icon="share-2" style={veil()} /></div><div style={{ position: 'absolute', left: 12, bottom: 12, display: 'flex', gap: 10, alignItems: 'center', padding: '7px 12px 7px 10px', borderRadius: 16, ...veil(), fontSize: 12.5 }}><T.Bars names={d.colours} active={colour} light />{colour} · 1 of {d.colours.length}</div>{d.tag && <span style={{ position: 'absolute', right: 12, bottom: 14 }}><T.PhotoTag>{d.tag}</T.PhotoTag></span>}</div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: T.fontDisplay, fontSize: 44, fontWeight: 600, color: T.ink, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{d.code}</div>
        <div style={{ fontSize: 14, color: T.ink3, marginTop: 6 }}>{d.cat} · <span style={{ color: T.ink2 }}>{d.name}</span> · {d.colours.length} colours</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 14 }}><PriceF v={d.price} size={34} font={T.fontSerif} color={T.ink} dim={T.ink3} /><T.Tag tone="danger">{d.note}</T.Tag><T.Tag>{d.tag}</T.Tag></div>
        <div style={{ marginTop: 22, fontSize: 12, color: T.ink3 }}>Colour</div>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>{d.colours.map(n => <T.Chip key={n} on={n === colour}><span style={{ width: 10, height: 10, borderRadius: 5, background: XD.cols[n] }} />{n}</T.Chip>)}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 24, padding: 10, borderRadius: 20, background: T.surface, border: `1px solid ${T.line}`, flexWrap: 'wrap', maxWidth: 360 }}><span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 40, padding: '0 10px 0 4px', borderRadius: 20, background: T.chipBg }}><span style={{ width: 30, height: 30, borderRadius: 15, background: T.accent, color: T.onAccent, display: 'grid', placeItems: 'center', fontFamily: T.fontDisplay, fontSize: 14, fontWeight: 600 }}>A</span><span style={{ fontSize: 12.5 }}>Ramleela</span><Ic name="chevrons-up-down" size={12} color={T.ink3} /></span><T.Step v={2} big /><T.Btn icon="plus">Add {colour}</T.Btn></div>
        <div style={{ marginTop: 26, fontSize: 12, color: T.ink3 }}>Also in this collection</div>
        <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>{XD.designs.slice(1, 4).map(x => <div key={x.code} className="press" style={{ width: 84 }}><div style={{ width: 84, height: 105, borderRadius: 12, overflow: 'hidden', background: T.photoBg }}>{x.src && <img src={x.src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}</div><div style={{ fontFamily: T.fontDisplay, fontSize: 15, fontWeight: 600, marginTop: 5 }}>{x.code}</div></div>)}</div>
      </div>
    </div>
  </WebShell>;
}
/* 4 · product, salesperson view */
function WebSales({ T }) {
  const d = XD.designs[0]; const max = Math.max(...Object.values(STOCK).map(r => r[0] + r[1] + r[2]));
  return <WebShell T={T} title={d.code} crumb="Catalogue · Salesperson view" tab={`${d.code} · salesperson view`} paneTitle="Sale orders · 2798" pane={<div style={{ padding: '10px 14px' }}>{ORDERS.map((o, i) => <div key={o[0]} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 0', borderTop: i ? `1px solid ${T.line}` : 0, fontSize: 12.5 }}><span style={{ fontFamily: T.fontMono, fontSize: 12, color: T.ink2 }}>{o[0]}</span><span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{o[1]}</span><StatusPill T={T} s={o[3] === 'Pending' ? 'Raised' : o[3]} /><b>×{o[4]}</b></div>)}<T.H>Lifelong</T.H><div style={{ padding: '8px 0' }}><LineG T={T} series={[{ pts: SERIES.life, color: T.gold, width: 2 }]} h={60} area /></div></div>}>
    <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 20, padding: '20px 24px', height: '100%' }}>
      <div>
        <div style={{ width: 300, height: 375, borderRadius: 18, overflow: 'hidden', background: T.photoBg }}><img src={d.src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 12 }}><PriceF v={d.price} size={26} font={T.fontSerif} color={T.ink} dim={T.ink3} /><span style={{ fontSize: 12, color: T.ink3 }}>cost ₹2,610 · 40% GM</span></div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}><T.Tag>Top 30</T.Tag><T.Tag tone="danger">Low stock</T.Tag><T.Tag tone="gold">Priority sell</T.Tag><T.Tag tone="muted">Zari work</T.Tag><T.Tag tone="ok">Rank 12</T.Tag></div>
        <div style={{ display: 'flex', gap: 6, marginTop: 12 }}><T.Btn kind="secondary" small icon="upload">Media</T.Btn><T.Btn kind="secondary" small icon="tags">Set tag</T.Btn><T.Btn small icon="plus">Add to cart A</T.Btn></div>
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ display: 'flex', gap: 10 }}><T.Kpi label="Can promise now" value="37" sub="42 free · 5 reserved" tone="ok" /><T.Kpi label="In production" value="40" sub="PO-1187 · due 30/07" /><T.Kpi label="Demand score" value="78" sub="rank 12 · +12%" /><T.Kpi label="Last month" value="28" sub="pcs · 3 open orders" /></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
          <div style={{ padding: 14, borderRadius: 18, background: T.surface, border: `1px solid ${T.line}` }}><div style={{ display: 'flex', alignItems: 'baseline' }}><span style={{ fontFamily: T.fontDisplay, fontSize: 16, fontWeight: 600 }}>Stock by colour</span><span style={{ flex: 1 }} /><Legend T={T} items={[['free', T.ok], ['rsv', T.warn], ['prod', T.blue]]} /></div>{d.colours.map(n => { const [f, r, p, due] = STOCK[n]; return <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 0', borderTop: `1px solid ${T.line}`, fontSize: 12 }}><span style={{ width: 4, height: 18, borderRadius: 2, background: XD.cols[n] }} /><span style={{ width: 62 }}>{n}</span><Stack T={T} f={f} r={r} p={p} max={max} /><span style={{ width: 84, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}><b style={{ color: f < 5 ? T.danger : T.ink }}>{f}</b><span style={{ color: T.ink3 }}> · {r} · {p}</span></span><span style={{ width: 40, textAlign: 'right', fontSize: 10.5, color: T.ink3 }}>{due}</span></div>; })}</div>
          <div style={{ padding: 14, borderRadius: 18, background: T.surface2, border: `1px solid ${T.line}` }}><div style={{ fontFamily: T.fontDisplay, fontSize: 16, fontWeight: 600 }}>Production · PO-1187 · 40 pcs</div><div style={{ marginTop: 12 }}><Timeline steps={['Dye', 'Embroidery', 'Stitching', 'Finishing']} done={2} active={2} T={T} /></div><div style={{ marginTop: 12, height: 6, borderRadius: 3, background: T.chipBg }}><span style={{ display: 'block', width: '60%', height: 6, borderRadius: 3, background: T.ok }} /></div><div style={{ display: 'flex', gap: 14, marginTop: 8, fontSize: 11.5, color: T.ink3 }}><span><b style={{ color: T.ink }}>24</b> received</span><span><b style={{ color: T.ink }}>16</b> with karigar</span><span><b style={{ color: T.warn }}>3 d</b> to due</span></div><div style={{ fontFamily: T.fontDisplay, fontSize: 16, fontWeight: 600, marginTop: 14 }}>Recipe · per pc</div><div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>{RECIPE.map(([m, q, st, ok]) => <span key={m} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 26, padding: '0 9px', borderRadius: 999, background: T.chipBg, fontSize: 11.5, color: ok ? T.ink : T.danger }}>{m} <b style={{ color: T.ink3, fontWeight: 500 }}>{q}</b></span>)}</div></div>
          <div style={{ padding: 14, borderRadius: 18, background: T.surface, border: `1px solid ${T.line}`, gridColumn: '1 / -1' }}><div style={{ display: 'flex', alignItems: 'baseline' }}><span style={{ fontFamily: T.fontDisplay, fontSize: 16, fontWeight: 600 }}>Last 12 weeks · pcs</span><span style={{ flex: 1 }} /><Legend T={T} items={[['all', T.ink], ...d.colours.map(n => [n, XD.cols[n]])]} /></div><div style={{ marginTop: 8 }}><LineG T={T} series={[{ pts: SERIES.month.all, color: T.ink, width: 2.2 }, ...d.colours.map(n => ({ pts: SERIES.month[n], color: XD.cols[n], width: 1.3 }))]} w={640} h={90} /></div></div>
        </div>
      </div>
    </div>
  </WebShell>;
}
/* 5 · carts */
function WebCarts({ T }) {
  const groups = groupsOf(); const pcs = groups.reduce((s, g) => s + g.pcs, 0), total = groups.reduce((s, g) => s + g.pcs * (g.d.price || 0), 0);
  return <WebShell T={T} title="Carts" crumb="Catalogue · Carts" tab="Carts · 3 active" paneTitle="Summary" pane={<div style={{ padding: 16 }}><div style={{ display: 'flex', gap: 8 }}><T.Kpi label="Pieces" value={pcs} small /><T.Kpi label="Designs" value={groups.length} small /></div><div style={{ marginTop: 12, padding: 14, borderRadius: 16, background: T.surface2, border: `1px solid ${T.line}` }}><div style={{ fontSize: 11, color: T.ink3 }}>Total · GST extra</div><PriceF v={total} size={30} font={T.fontSerif} color={T.ink} dim={T.ink3} style={{ marginTop: 4 }} /><div style={{ fontSize: 11.5, color: T.ink3, marginTop: 6 }}>due 20 d · credit 30 d · limit ₹1.2L</div></div><div style={{ marginTop: 12, fontSize: 12, color: T.ink3 }}>Sale book</div><span style={{ display: 'inline-flex', padding: 3, borderRadius: 999, background: T.bg2, marginTop: 6 }}>{['In-cabin', 'WhatsApp'].map((b, i) => <span key={b} style={{ height: 28, padding: '0 12px', borderRadius: 999, display: 'grid', placeItems: 'center', fontSize: 12, background: i === 0 ? T.surface : 'transparent', color: i === 0 ? T.ink : T.ink3 }}>{b}</span>)}</span><div style={{ marginTop: 12, padding: '10px 12px', borderRadius: 14, border: `1px dashed ${T.line2}`, fontSize: 12, color: T.ink3 }}>Note for approval · “2018 ke red ka stock check karna hai”</div><div style={{ marginTop: 14, display: 'flex', gap: 8 }}><T.Btn kind="secondary" small icon="trash-2">Clear</T.Btn><T.Btn icon="check" style={{ flex: 1, height: 44 }}>Submit for approval</T.Btn></div></div>}>
    <div style={{ padding: '16px 24px 0' }}><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CartChips T={T} cart="A" /><span style={{ flex: 1 }} /><T.Chip icon="user-plus" outline>New customer</T.Chip></div></div>
    <div style={{ margin: '14px 24px 0', borderRadius: 20, background: T.surface, border: `1px solid ${T.line}`, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px 12px' }}><span><div style={{ fontFamily: T.fontDisplay, fontSize: 22, fontWeight: 500 }}>Ramleela Fashion</div><div style={{ fontSize: 12, color: T.ink3, marginTop: 2 }}>Surat · Platinum · 30 days credit · {groups.length} designs · {pcs} pcs</div></span><span style={{ flex: 1 }} /><T.Chip icon="phone" outline>98152 23366</T.Chip><T.Chip icon="history" outline>Purchase history</T.Chip></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>{groups.map((g, i) => <div key={g.d.code} style={{ borderRight: i % 2 === 0 ? `1px solid ${T.line}` : 0 }}><CartGroups T={T} groups={[g]} photo={64} /></div>)}</div>
    </div>
  </WebShell>;
}
/* 6 · sale orders cards */
function SOWebHead({ T, tab = 'Raised', view = 'cards', grouping }) {
  return <>
    <ViewTabs T={T} tabs={SO_TABS2} active={tab} extra={[['Analytics', null, 'bar-chart-3']]} right={<span style={{ display: 'inline-flex', padding: 3, borderRadius: 999, background: T.bg2 }}>{[['layout-list', 'cards'], ['table-2', 'table']].map(([ic, v]) => <span key={v} className="press" style={{ width: 34, height: 26, borderRadius: 999, display: 'grid', placeItems: 'center', background: v === view ? T.surface : 'transparent', color: v === view ? T.ink : T.ink3 }}><Ic name={ic} size={15} /></span>)}</span>} />
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 24px 0' }}><T.Chip icon="search" outline>Order, customer, agent</T.Chip><T.Chip icon="calendar" x outline>This month</T.Chip>{view === 'table' ? <><T.Chip icon="group" on={grouping} outline={!grouping}>Group by</T.Chip><T.Chip icon="columns-3" outline>Columns</T.Chip></> : <T.Chip icon="arrow-down-up" outline>Newest</T.Chip>}<span style={{ flex: 1 }} /><Hit T={T} icon="printer" size={34} iconSize={16} style={{ background: T.chipBg }} /><Hit T={T} icon="download" size={34} iconSize={16} style={{ background: T.chipBg }} /></div>
  </>;
}
function WebSalesOrders({ T }) {
  const o = ORDERS_F[0];
  return <WebShell T={T} title="Sale orders" crumb="Catalogue · Sale orders · Raised" tab="Sale orders · Raised" paneTitle={o.no} pane={<div style={{ padding: 12 }}><CustomerBar T={T} c={o.c} compact /><div style={{ marginTop: 10 }}><OrderLines T={T} o={o} lines={ORDER_LINES()} /></div><div style={{ display: 'flex', gap: 6, marginTop: 10 }}><Hit T={T} icon="printer" size={36} iconSize={16} style={{ background: T.chipBg }} /><Hit T={T} icon="share-2" size={36} iconSize={16} style={{ background: T.chipBg }} /><span style={{ flex: 1 }} /><T.Btn small icon="check" style={{ height: 36 }}>Approve</T.Btn></div></div>}>
    <SOWebHead T={T} />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 12, padding: '14px 24px' }}>{ORDERS_F.filter(x => x.status !== 'Cancelled').map((x, i) => <div key={x.no} style={{ padding: '12px 14px', borderRadius: 18, background: T.surface, border: `1px solid ${i === 0 ? T.accentLine : T.line}`, boxShadow: i === 0 ? `0 0 0 2px ${T.accentSoft}` : 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ fontFamily: T.fontMono, fontSize: 13, fontWeight: 600 }}>{x.no}</span><StatusPill T={T} s={x.status} /><span style={{ flex: 1 }} /><span style={{ fontSize: 11.5, color: T.ink3 }}>{x.date}</span></div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 19, fontWeight: 500, flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{x.c.name}</span><span style={{ fontFamily: T.fontSerif, fontSize: 18, fontWeight: 600 }}>{money(x.bill)}</span></div>
      <div style={{ fontSize: 11.5, color: T.ink3, marginTop: 2 }}>{x.c.city} · {x.c.tier} · {x.pcs} pcs · {x.designs} designs</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10 }}><T.Chip icon="user" style={{ height: 26, fontSize: 11 }}>{x.c.broker}</T.Chip><span style={{ flex: 1 }} /><Hit T={T} icon="printer" size={30} iconSize={14} style={{ background: T.chipBg }} /><Hit T={T} icon="share-2" size={30} iconSize={14} style={{ background: T.chipBg }} /></div>
    </div>)}</div>
  </WebShell>;
}
/* 7 · table with the grouping island and a column filter */
function WebSalesTable({ T }) {
  return <WebShell T={T} title="Sale orders" crumb="Catalogue · Sale orders · Raised · Table" tab="Sale orders · Raised · table" paneTitle="Order" paneCollapsed pane={<span />}>
    <SOWebHead T={T} view="table" grouping />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '12px 24px 20px', height: '100%', minHeight: 0 }}>
      <GroupIsland T={T} style={{ flex: 'none' }} />
      <div style={{ flex: 1, minHeight: 0 }}><SOTable T={T} rows={ORDERS_F.filter(o => o.status !== 'Cancelled')} grouped filterCard height="100%" /></div>
    </div>
  </WebShell>;
}
/* 8 · opened order */
function WebSalesOrder({ T }) {
  const o = ORDERS_F[0];
  return <WebShell T={T} title={o.no} crumb={`Catalogue · Sale orders · Raised · ${o.no}`} tab={`${o.no} · ${o.c.name}`} headerRight={<><Hit T={T} icon="printer" size={40} iconSize={18} style={{ background: T.chipBg }} /><Hit T={T} icon="share-2" size={40} iconSize={18} style={{ background: T.chipBg }} /><T.Btn kind="secondary" small style={{ height: 38 }}>Edit</T.Btn><T.Btn icon="check" style={{ height: 38, padding: '0 16px' }}>Approve</T.Btn></>} paneTitle="Customer" pane={<div style={{ padding: 12 }}><CustomerBar T={T} c={o.c} compact /><T.H>Recent orders</T.H><div style={{ padding: '4px 4px 0' }}>{ORDERS_F.filter(x => x.c === o.c || x.status === 'Dispatched').slice(0, 3).map((x, i) => <div key={x.no} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderTop: i ? `1px solid ${T.line}` : 0, fontSize: 12.5 }}><span style={{ fontFamily: T.fontMono, fontSize: 12 }}>{x.no}</span><span style={{ flex: 1, color: T.ink3 }}>{x.date}</span><StatusPill T={T} s={x.status} /><b>{money(x.bill)}</b></div>)}</div><T.H>Sale vs payments</T.H><div style={{ padding: '8px 4px 0' }}><LineG T={T} series={[{ pts: A.sale, color: T.accent, width: 2 }, { pts: A.pay, color: T.ok, width: 1.8, dash: true }]} h={60} /></div></div>}>
    <div style={{ padding: '18px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><StatusPill T={T} s={o.status} /><span style={{ fontSize: 12.5, color: T.ink3 }}>raised by Rohan Mehta · in-cabin · awaiting approval</span><span style={{ flex: 1 }} /><span style={{ fontSize: 12.5, color: T.ink3 }}>due 20 d · transport {o.c.transport}</span></div>
      <div style={{ marginTop: 12 }}><OrderLines T={T} o={o} lines={ORDER_LINES()} /></div>
    </div>
  </WebShell>;
}
/* 9 to 11 · analytics dashboards; the range, filters and sort live in the right pane */
function AnalyticsPane({ T, level }) {
  return <div style={{ padding: '12px 14px' }}>
    <div style={{ fontSize: 11, color: T.ink3 }}>Range</div><div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>{['7 d', '30 d', '90 d', 'YTD'].map(r => <T.Chip key={r} on={r === '30 d'} style={{ height: 28, fontSize: 12 }}>{r}</T.Chip>)}</div>
    <div className="press" style={{ display: 'flex', alignItems: 'center', gap: 8, height: 36, padding: '0 12px', borderRadius: 12, border: `1px dashed ${T.line2}`, fontSize: 12.5, marginTop: 8 }}><Ic name="calendar" size={14} />01/08/26 – 05/09/26<span style={{ flex: 1 }} /><Ic name="chevron-down" size={13} color={T.ink3} /></div>
    <div style={{ fontSize: 11, color: T.ink3, marginTop: 14 }}>Compare with</div><div style={{ display: 'flex', gap: 6, marginTop: 6 }}><T.Chip on style={{ height: 28, fontSize: 12 }}>Prior period</T.Chip><T.Chip style={{ height: 28, fontSize: 12 }}>Last year</T.Chip></div>
    <div style={{ fontSize: 11, color: T.ink3, marginTop: 14 }}>Filters</div><div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}><T.Chip x style={{ height: 28, fontSize: 12 }}>Delhi</T.Chip><T.Chip x style={{ height: 28, fontSize: 12 }}>Lehenga</T.Chip><T.Chip icon="plus" outline style={{ height: 28, fontSize: 12 }}>Add</T.Chip></div>
    <div style={{ fontSize: 11, color: T.ink3, marginTop: 14 }}>Sort</div><div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>{(level === 'sku' ? ['Pcs', 'Orders', 'Bill', 'Trend'] : level === 'cust' ? ['Bill', 'Orders', 'Overdue', 'Score'] : ['Bill', 'Pcs', 'Date']).map((s, i) => <T.Chip key={s} on={i === 0} style={{ height: 28, fontSize: 12 }}>{s}</T.Chip>)}</div>
    <div style={{ marginTop: 18, display: 'flex', gap: 6 }}><T.Btn kind="secondary" small icon="download">Export</T.Btn><T.Btn kind="secondary" small icon="bookmark">Save view</T.Btn></div>
  </div>;
}
const ATabs = ({ T, on }) => <ViewTabs T={T} back="Orders list" eyebrow="Analytics" tabs={[['Orders', null, 'receipt-text'], ['Designs (SKU)', null, 'shirt'], ['Customers', null, 'users']]} active={on === 'orders' ? 'Orders' : on === 'sku' ? 'Designs (SKU)' : 'Customers'} right={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: T.ink3 }}><Ic name="calendar" size={13} />01/08/26 – 05/09/26 · vs prior period</span>} />;
const WCard = ({ T, title, right, children, alt, span }) => <div style={{ padding: 14, borderRadius: 18, background: alt ? T.surface2 : T.surface, border: `1px solid ${T.line}`, gridColumn: span ? `span ${span}` : 'auto', minWidth: 0 }}><div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}><span style={{ width: 3, height: 13, borderRadius: 2, background: T.accent, alignSelf: 'center' }} /><span style={{ fontFamily: T.fontDisplay, fontSize: 16, fontWeight: 600, color: T.ink }}>{title}</span><span style={{ flex: 1 }} />{right}</div>{children}</div>;
function WebAnalyticsOrders({ T }) {
  return <WebShell T={T} title="Sale orders" crumb="Catalogue · Sale orders · Analytics · Orders" tab="Sale orders · Analytics · Orders" paneTitle="Range & filters" pane={<AnalyticsPane T={T} level="orders" />}>
    <ATabs T={T} on="orders" />
    <div style={{ display: 'flex', gap: 10, padding: '14px 24px 0' }}><T.Kpi label="Orders" value="46" sub="+18% vs prior" tone="ok" /><T.Kpi label="Pieces" value="312" sub="6.8 per order" /><T.Kpi label="Billed" value="₹14.2L" sub="avg ₹30.9k" /><T.Kpi label="Time to approve" value="2.1 d" sub="median" /><T.Kpi label="Cancelled" value="3" sub="6.5%" tone="danger" /></div>
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12, padding: '12px 24px 20px' }}>
      <WCard T={T} title="Orders vs dispatch · per day" right={<Legend T={T} items={[['orders', T.accent], ['dispatched', T.ok]]} />}><LineG T={T} series={[{ pts: A.days, color: T.accent, width: 2.2 }, { pts: A.disp, color: T.ok, width: 2, dash: true }]} w={520} h={150} area /></WCard>
      <WCard T={T} title="Pipeline" alt>{[['Raised', 9, T.warn], ['Approved', 14, T.blue], ['Dispatched', 23, T.ok], ['Cancelled', 3, T.ink3]].map(([s, n, c]) => <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', fontSize: 12.5 }}><span style={{ width: 78, color: T.ink2 }}>{s}</span><span style={{ flex: 1, height: 10, borderRadius: 5, background: T.chipBg }}><span style={{ display: 'block', width: Math.round(n / 23 * 100) + '%', height: 10, borderRadius: 5, background: c }} /></span><b style={{ width: 24, textAlign: 'right' }}>{n}</b></div>)}</WCard>
      <WCard T={T} title="By weekday"><BarsV T={T} data={A.week} w={520} h={90} color={A.week.map((v, i) => i === 4 ? T.accent : T.accentLine)} labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']} /></WCard>
      <WCard T={T} title="Top customers · bill">{[[XD.customers[5], 214000, 14], [XD.customers[0], 168000, 11], [XD.customers[3], 121000, 8], [XD.customers[2], 96000, 6]].map(([c, v, n], i) => <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', fontSize: 12 }}><span style={{ width: 16, color: T.ink3 }}>{i + 1}</span><span style={{ flex: 1, minWidth: 0 }}><div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</div><div style={{ height: 4, borderRadius: 2, background: T.chipBg, marginTop: 4 }}><span style={{ display: 'block', width: Math.round(v / 214000 * 100) + '%', height: 4, borderRadius: 2, background: T.accent }} /></div></span><b style={{ fontVariantNumeric: 'tabular-nums' }}>{money(v)}</b></div>)}</WCard>
    </div>
  </WebShell>;
}
function WebAnalyticsSKU({ T }) {
  const rows = [['2798', 64, 11, [22, 18, 14, 10], [4, 6, 5, 8, 7, 9, 12]], ['6002', 41, 9, [26, 15], [2, 3, 5, 4, 6, 7, 8]], ['3661', 33, 7, [20, 13], [3, 4, 4, 5, 6, 5, 7]], ['1457', 29, 6, [9, 8, 7, 5], [5, 4, 4, 3, 4, 5, 4]], ['2006', 18, 4, [8, 6, 4], [1, 2, 2, 3, 3, 4, 3]], ['D9107', 12, 3, [8, 4], [1, 1, 2, 2, 2, 3, 2]]].map(([c, pcs, n, split, tr]) => ({ d: XD.byCode[c], pcs, n, split, tr }));
  return <WebShell T={T} title="Sale orders" crumb="Catalogue · Sale orders · Analytics · Designs" tab="Sale orders · Analytics · Designs" paneTitle="Range & filters" pane={<AnalyticsPane T={T} level="sku" />}>
    <ATabs T={T} on="sku" />
    <div style={{ display: 'flex', gap: 10, padding: '14px 24px 0' }}><T.Kpi label="Designs ordered" value="38" sub="of 612 · 6%" /><T.Kpi label="Top design" value="2798" sub="64 pcs · 11 orders" /><T.Kpi label="Colour leader" value="Sky" sub="22% of pieces" /><T.Kpi label="Samples ordered" value="7" sub="pre-production" tone="ok" /></div>
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12, padding: '12px 24px 20px' }}>
      <WCard T={T} title="Designs · pcs · orders · colours · trend" span={1}>{rows.map((r, i) => <div key={r.d.code} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderTop: i ? `1px solid ${T.line}` : 0 }}><div style={{ width: 36, height: 45, borderRadius: 8, overflow: 'hidden', background: T.photoBg, flex: 'none' }}>{r.d.src && <img src={r.d.src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}</div><span style={{ width: 150, minWidth: 0 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 17, fontWeight: 600 }}>{r.d.code}</div><div style={{ fontSize: 11, color: T.ink3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.d.cat} · {r.d.name}</div></span><span style={{ flex: 1, display: 'flex', height: 8, borderRadius: 4, overflow: 'hidden', background: T.chipBg }}>{r.split.map((s, k) => <span key={k} style={{ width: Math.round(s / r.pcs * 100) + '%', background: XD.cols[r.d.colours[k]] }} />)}</span><span style={{ width: 80 }}><Line series={[{ pts: r.tr, color: T.accent, width: 1.6 }]} w={80} h={24} /></span><span style={{ width: 60, textAlign: 'right' }}><b style={{ fontFamily: T.fontSerif, fontSize: 18 }}>{r.pcs}</b><div style={{ fontSize: 10.5, color: T.ink3 }}>{r.n} orders</div></span></div>)}</WCard>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}><WCard T={T} title="By category" alt><div style={{ display: 'flex', alignItems: 'center', gap: 14 }}><Donut T={T} parts={[{ v: 46, color: XD.cols.Lilac }, { v: 28, color: XD.cols.Sky }, { v: 16, color: XD.cols.Peach }, { v: 10, color: XD.cols.Firozi }]} size={96} thick={12} center="312" /><Legend T={T} items={[['Lehenga', XD.cols.Lilac, '46%'], ['Saree', XD.cols.Sky, '28%'], ['Plazo set', XD.cols.Peach, '16%'], ['Crop top', XD.cols.Firozi, '10%']]} /></div></WCard><WCard T={T} title="Colour leaders · pcs"><BarsV T={T} data={[68, 52, 41, 30, 24]} w={280} h={90} color={[XD.cols.Sky, XD.cols.Lilac, XD.cols.Peach, XD.cols.Firozi, XD.cols.Mehroon]} labels={['Sky', 'Lilac', 'Peach', 'Firozi', 'Mehroon']} /></WCard></div>
    </div>
  </WebShell>;
}
function WebAnalyticsCust({ T }) {
  const top = [[XD.customers[5], 214000, 14, 0], [XD.customers[0], 168000, 11, 12000], [XD.customers[3], 121000, 8, 0], [XD.customers[2], 96000, 6, 31000], [XD.customers[1], 74000, 5, 0], [XD.customers[4], 52000, 4, 8000]];
  return <WebShell T={T} title="Sale orders" crumb="Catalogue · Sale orders · Analytics · Customers" tab="Sale orders · Analytics · Customers" paneTitle="Range & filters" pane={<AnalyticsPane T={T} level="cust" />}>
    <ATabs T={T} on="cust" />
    <div style={{ display: 'flex', gap: 10, padding: '14px 24px 0' }}><T.Kpi label="Active customers" value="38" sub="6 new this range" /><T.Kpi label="Repeat rate" value="71%" sub="ordered twice or more" /><T.Kpi label="Avg bill" value="₹30.9k" sub="+4% vs prior" tone="ok" /><T.Kpi label="Overdue" value="₹1.8L" sub="4 customers" tone="danger" /></div>
    <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 12, padding: '12px 24px 20px' }}>
      <WCard T={T} title="Sale vs payments · ₹k" right={<Legend T={T} items={[['sale', T.accent], ['payments', T.ok]]} />}><LineG T={T} series={[{ pts: A.sale, color: T.accent, width: 2.2 }, { pts: A.pay, color: T.ok, width: 2, dash: true }]} w={360} h={130} area /></WCard>
      <WCard T={T} title="By tier" alt><div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><Donut T={T} parts={[{ v: 52, color: T.accent }, { v: 30, color: T.gold }, { v: 18, color: T.ink3 }]} size={96} thick={12} center="38" /><Legend T={T} items={[['Platinum', T.accent, '52%'], ['Gold', T.gold, '30%'], ['Silver', T.ink3, '18%']]} /></div></WCard>
      <WCard T={T} title="Orders by city"><BarsV T={T} data={[14, 9, 8, 6, 5, 4]} w={240} h={100} color={T.accentLine} labels={['Delhi', 'Surat', 'Ldh', 'Chn', 'Amb', 'Lko']} /></WCard>
      <WCard T={T} title="Customers · bill · orders · overdue" span={3}><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>{top.map(([c, v, n, od], i) => <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderTop: i > 1 ? `1px solid ${T.line}` : 0 }}><span style={{ width: 28, height: 28, borderRadius: 14, background: T.accentSoft, color: T.accent, display: 'grid', placeItems: 'center', fontFamily: T.fontDisplay, fontSize: 12, fontWeight: 600 }}>{c.name[0]}</span><span style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</div><div style={{ fontSize: 10.5, color: T.ink3 }}>{c.tier} · {c.city} · score {c.score} · {n} orders</div></span><span style={{ width: 90 }}><Line series={[{ pts: [2, 3, 2, 4, 5, 4, 6].map(x => x * (i + 1)), color: T.accent, width: 1.5 }]} w={90} h={22} /></span><span style={{ textAlign: 'right', fontSize: 12.5, fontVariantNumeric: 'tabular-nums' }}>{money(v)}<div style={{ fontSize: 10.5, color: od ? T.danger : T.ink3 }}>{od ? 'overdue ' + money(od) : 'clear'}</div></span></div>)}</div></WCard>
    </div>
  </WebShell>;
}
/* 13 · full-screen viewer on the web: overlay over the catalogue */
function WebViewer({ T }) {
  const d = XD.designs[0];
  const slides = [...d.colours.map(n => ({ name: n, src: n === d.colours[0] ? d.src : null, fill: XD.cols[n] })), { name: 'Video', src: XD.A + 'samples/2006-lavender.jpg', icon: 'play' }, { name: 'Photoshoot', src: XD.A + 'samples/6002-lilac.jpg', icon: 'camera' }];
  return <WebShell T={T} title="Catalogue" crumb="Products · All" tab="2798 · Plazo Set · viewer" paneTitle="Cart A" pane={<CartPane T={T} />} overlay={<div style={{ position: 'absolute', inset: 0, background: 'rgba(8,6,5,.94)', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <div style={{ position: 'absolute', left: 20, top: 16, display: 'flex', alignItems: 'baseline', gap: 10 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 26, fontWeight: 600 }}>{d.code}</span><span style={{ fontSize: 13, opacity: .7 }}>{d.cat} · {d.name}</span></div>
    <div style={{ position: 'absolute', right: 16, top: 12, display: 'flex', gap: 8 }}><Hit T={T} icon="share-2" style={smoke()} /><Hit T={T} icon="x" style={smoke()} /></div>
    <div style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }}><Hit T={T} icon="chevron-left" style={smoke()} /></div><div style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)' }}><Hit T={T} icon="chevron-right" style={smoke()} /></div>
    <img src={d.src} style={{ height: 640, marginTop: 60, borderRadius: 14, objectFit: 'cover' }} />
    <div style={{ position: 'absolute', bottom: 18, left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 8, padding: 8, borderRadius: 22, ...smoke({ background: 'rgba(20,18,17,.62)', border: '1px solid rgba(255,255,255,.14)' }) }}>{slides.map((s, k) => <span key={k} className="press" style={{ position: 'relative', width: k === 0 ? 52 : 40, height: k === 0 ? 64 : 50, borderRadius: 10, overflow: 'hidden', background: s.fill || '#333', boxShadow: k === 0 ? '0 0 0 1.5px rgba(255,255,255,.95)' : 'none', opacity: k === 0 ? 1 : .8 }}>{s.src && <img src={s.src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}{s.icon && <span style={{ position: 'absolute', right: 3, bottom: 3, width: 16, height: 16, borderRadius: 8, background: 'rgba(0,0,0,.6)', display: 'grid', placeItems: 'center' }}><Ic name={s.icon} size={9} sw={2.2} /></span>}</span>)}<span style={{ fontSize: 12, opacity: .85, padding: '0 10px', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: 5 }}><Ic name="check" size={12} sw={2.4} color="#8FD3A7" />Sky · 1 of 4 colours · full quality</span></div>
  </div>}>
    <WebLists T={T} /><div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: '18px 14px', padding: '14px 24px' }}>{XD.designs.slice(0, 4).map(d => <T.GridCard key={d.code} d={d} qty={QTY[d.code]} />)}</div>
  </WebShell>;
}
Object.assign(window, { TabStrip, SearchField, Greet, GREETS, UserMark, Rail2, Sidebar2, SubMenuFloat, SO_FLOAT, SubMenu, ModeSwitch, Header3, ViewTabs, CAT_SEG, DISP_SEG, SO_TABS2, WebShell3, SRS_WHITE, LaptopDevice, WebShell, RightPane, CartPane, WebGridS, WebListS, WebSidebarS, WebVoiceS, WebProduct, WebSales, WebCarts, WebSalesOrders, WebSalesTable, WebSalesOrder, WebAnalyticsOrders, WebAnalyticsSKU, WebAnalyticsCust, WebViewer });
