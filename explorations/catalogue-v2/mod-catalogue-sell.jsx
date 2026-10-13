/* NEW DRAFTS · Catalogue · sell flow (13 Oct 2026, review 2). The screens the sell flow was missing: new cart with a
   customer picker, new customer sheet, submit for approval with the credit-line check, and a calmer phone grid header
   drawn as a draft beside the final for compare. Component names start with Cs. Plan: plans/review-2-sell-flow.md. */

/* Reuses from base: frameF, scrimF, ScreenFCarts, CartGroups, groupsOf, PriceF, money, LISTS, QTY, CARTS, CartChips,
   Body-less sheets (Sheet), Meta, Mono, Pill, Thumb, Monogram, Toast, Hit, Ic, T.Btn, T.Chip, T.Island/T.Dock, T.TopBar,
   T.SearchBar, T.GridCard, WebShell3, CAT_SEG, RightPane (via WebShell3). */

/* ── data (the board's own) ── */
const CS_RECENT = [[XD.customers[0], '10/09/26'], [XD.customers[3], '09/09/26'], [XD.customers[1], '26/08/26']];   // Preeti · A V Creation · Rangoli
const CS_NEW = { name: 'Shree Vastra Collection', phone: '98765 43210', city: 'Jaipur', broker: 'Harjeet Singh · Harjeet Agency' };
const CS_CREDIT = { line: 120000, openFits: 52000, openOver: 82000 };                                                  // credit line, open bills (fits / over)
const CS_NOTE = '2018 ke red ka stock check karna hai';
const CS_TABS = [{ icon: 'layout-grid', label: 'Catalogue' }, { icon: 'shopping-basket', label: 'Carts · 3 active', on: true }];
const csTotals = () => { const g = groupsOf(); return { g, pcs: g.reduce((s, x) => s + x.pcs, 0), total: g.reduce((s, x) => s + x.pcs * (x.d.price || 0), 0) }; };

/* ── small pieces ── */
/* plain text search field with a voice button (no scan: this one finds customers, not designs) */
const CsSearch = ({ T, placeholder, query, h = 48, focus }) => <div style={{ height: h, boxSizing: 'border-box', borderRadius: h / 2, background: T.surface, border: `1px solid ${focus ? T.accent : T.line2}`, display: 'flex', alignItems: 'center', gap: 10, padding: '0 8px 0 16px' }}>
  <Ic name="search" size={18} color={T.ink2} />
  <span style={{ flex: 1, minWidth: 0, fontFamily: T.fontUI, fontSize: 14.5, color: query ? T.ink : T.ink3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{query || placeholder}</span>
  <Hit T={T} icon="mic" size={34} iconSize={18} style={{ color: T.ink2 }} />
</div>;
/* full-width segmented tray (sale book) */
const CsSeg = ({ T, items, on = 0, h = 42 }) => <span style={{ display: 'flex', padding: 3, borderRadius: 999, background: T.chipBg }}>{items.map((b, i) => <span key={b} className="press" style={{ flex: 1, height: h - 6, borderRadius: 999, display: 'grid', placeItems: 'center', fontFamily: T.fontUI, fontSize: 13.5, fontWeight: i === on ? 600 : 400, background: i === on ? (T.dark ? T.surface2 : T.surface) : 'transparent', color: i === on ? T.ink : T.ink3, boxShadow: i === on && !T.dark ? '0 1px 3px rgba(36,23,18,.14)' : 'none' }}>{b}</span>)}</span>;
/* equal-width choice pills (due days, priority); the one on is ink */
const CsChoice = ({ T, items, on, h = 40, fs = 14 }) => <div style={{ display: 'flex', gap: 6 }}>{items.map(b => { const o = b === on; return <span key={b} className="press" style={{ flex: 1, height: h, borderRadius: 999, display: 'grid', placeItems: 'center', background: o ? T.ink : T.chipBg, color: o ? T.bg : T.ink, fontFamily: T.fontUI, fontSize: fs, fontWeight: o ? 600 : 400, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{b}</span>; })}</div>;
/* label above value, 48 tall */
const CsField = ({ T, label, value, mono, chevron, h = 48, focus }) => <div style={{ height: h, boxSizing: 'border-box', borderRadius: T.rCtl, background: T.surface, border: `1px solid ${focus ? T.accent : T.line2}`, display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px' }}>
  <span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontUI, fontSize: 10.5, color: T.ink3, lineHeight: 1.1 }}>{label}</div><div style={{ fontFamily: mono ? T.fontMono : T.fontUI, fontSize: mono ? 14.5 : 15.5, color: T.ink, marginTop: 3, lineHeight: 1.15, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontVariantNumeric: 'tabular-nums' }}>{value}</div></span>
  {chevron && <Ic name="chevron-down" size={18} color={T.ink2} />}
</div>;
/* optional rows: label left, value right, lighter than the required fields */
const CsOptRow = ({ T, label, value }) => <div className="press" style={{ display: 'flex', alignItems: 'center', gap: 10, height: 44, borderTop: `1px solid ${T.line}` }}>
  <span style={{ fontFamily: T.fontUI, fontSize: 13.5, color: T.ink2, flex: 'none' }}>{label}</span><span style={{ flex: 1 }} />
  <span style={{ fontFamily: T.fontUI, fontSize: 13.5, color: value ? T.ink : T.ink3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>{value || 'Add'}</span>
  <Ic name="chevron-right" size={15} color={T.ink3} />
</div>;
/* a customer in the picker: name is the head; selected = ink outline and a check, not maroon */
const CsCustRow = ({ T, c, last, sel }) => <div className="press" style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 60, boxSizing: 'border-box', padding: '0 12px', borderRadius: 16, background: sel ? T.surface : 'transparent', border: sel ? `1.5px solid ${T.ink}` : '1.5px solid transparent' }}>
  <Monogram T={T} c={c} s={38} />
  <span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 17, fontWeight: 600, color: T.ink, lineHeight: 1.1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</div><Meta T={T} style={{ display: 'block', marginTop: 3 }}>{c.city} · {c.tier} · last order {last}</Meta></span>
  {sel ? <span style={{ width: 24, height: 24, borderRadius: 12, background: T.ink, color: T.bg, display: 'grid', placeItems: 'center', flex: 'none' }}><Ic name="check" size={14} sw={2.4} /></span> : <Ic name="chevron-right" size={18} color={T.ink3} />}
</div>;
const CsLabel = ({ T, children, right, style }) => <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '0 2px 7px', ...style }}><span style={{ fontFamily: T.fontUI, fontSize: 12.5, fontWeight: 600, color: T.ink2 }}>{children}</span><span style={{ flex: 1 }} />{right}</div>;
/* label (and a hint) on the left, the choice on the right: keeps the submit sheet short */
const CsRow = ({ T, label, hint, children, lw = 88 }) => <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
  <span style={{ width: lw, flex: 'none' }}><div style={{ fontFamily: T.fontUI, fontSize: 12.5, fontWeight: 600, color: T.ink2, lineHeight: 1.2 }}>{label}</div><Meta T={T} style={{ display: 'block', marginTop: 1 }}>{hint}</Meta></span>
  <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
</div>;
/* design photos beside their numbers, for the summary and the sent card */
const CsDesigns = ({ T, size = 1 }) => <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>{groupsOf().map(g => <span key={g.d.code} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Thumb T={T} d={g.d} w={Math.round(28 * size)} h={Math.round(35 * size)} r={7} /><span style={{ fontFamily: T.fontDisplay, fontSize: 16, fontWeight: 600, color: T.ink, fontVariantNumeric: 'tabular-nums' }}>{g.d.code}</span></span>)}</div>;

/* Cart chips like the final's (tap activates), plus: "+" in its pressed state, and a sent cart greyed with a "sent" tag */
function CsCartChips({ T, cart = 'A', sent, plusOn, style }) {
  return <div style={{ display: 'flex', gap: 6, alignItems: 'center', overflow: 'hidden', ...style }}>
    {CARTS.map(c => {
      if (c.k === sent) return <span key={c.k} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, height: 34, padding: '0 10px 0 4px', borderRadius: 999, background: T.chipBg, color: T.ink3, fontFamily: T.fontUI, fontSize: 12, fontWeight: 500, flex: 'none', whiteSpace: 'nowrap' }}>
        <span style={{ width: 26, height: 26, borderRadius: 13, background: T.bg2, display: 'grid', placeItems: 'center', fontFamily: T.fontDisplay, fontSize: 13, fontWeight: 600 }}>{c.k}</span>
        <Ic name="check" size={12} sw={2.2} />sent
      </span>;
      const on = c.k === cart;
      return <span key={c.k} className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 34, padding: on ? '0 12px 0 4px' : '0 10px 0 4px', borderRadius: 999, background: on ? T.accent : T.chipBg, color: on ? T.onAccent : T.ink, fontFamily: T.fontUI, fontSize: 12.5, fontWeight: 500, flex: 'none', whiteSpace: 'nowrap' }}>
        <span style={{ width: 26, height: 26, borderRadius: 13, background: on ? 'rgba(255,255,255,.2)' : T.bg2, display: 'grid', placeItems: 'center', fontFamily: T.fontDisplay, fontSize: 13, fontWeight: 600 }}>{c.k}</span>
        {on ? c.name : c.name.split(' ')[0]}<b style={{ fontWeight: 500, opacity: .7 }}>{c.n}</b>
      </span>;
    })}
    <span className="press" style={{ width: 34, height: 34, borderRadius: 17, border: plusOn ? 0 : `1px dashed ${T.line2}`, background: plusOn ? T.ink : 'transparent', color: plusOn ? T.bg : T.ink2, display: 'grid', placeItems: 'center', flex: 'none', boxShadow: plusOn ? `0 0 0 3px ${T.chipBg}` : 'none' }}><Ic name="plus" size={15} sw={plusOn ? 2.2 : 1.6} /></span>
  </div>;
}

/* ── New cart: picker body, shared by the phone sheet and the web pane ── */
function CsNewCartBody({ T }) {
  return <>
    <CsSearch T={T} placeholder="Customer name, city, phone" />
    <CsLabel T={T} style={{ marginTop: 14 }} right={<Meta T={T}>last orders first</Meta>}>Recent</CsLabel>
    <div style={{ display: 'grid', gap: 2 }}>{CS_RECENT.map(([c, d], i) => <CsCustRow key={c.id} T={T} c={c} last={d} sel={i === 0} />)}</div>
    <div className="press" style={{ display: 'flex', alignItems: 'center', gap: 12, height: 54, boxSizing: 'border-box', padding: '0 12px', borderRadius: 16, border: `1px solid ${T.line2}`, marginTop: 8 }}>
      <span style={{ width: 34, height: 34, borderRadius: 17, background: T.chipBg, display: 'grid', placeItems: 'center', flex: 'none', color: T.ink }}><Ic name="plus" size={18} /></span>
      <span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontUI, fontSize: 14.5, fontWeight: 500, color: T.ink }}>New customer</div><Meta T={T} style={{ display: 'block' }}>Name, phone and city is enough</Meta></span>
      <Ic name="chevron-right" size={18} color={T.ink3} />
    </div>
    <CsLabel T={T} style={{ marginTop: 16 }}>Sale book</CsLabel>
    <CsSeg T={T} items={['In-cabin', 'WhatsApp']} on={0} />
  </>;
}
const CsStartBtn = ({ T }) => <T.Btn icon="plus" style={{ width: '100%', height: 48 }}>Start cart D</T.Btn>;

/* ── New customer: three required fields, a light optional group, a note ── */
function CsNewCustBody({ T }) {
  return <>
    <div style={{ display: 'grid', gap: 10 }}>
      <CsField T={T} label="Name" value={CS_NEW.name} />
      <CsField T={T} label="Phone" value={CS_NEW.phone} mono />
      <CsField T={T} label="City" value={CS_NEW.city} chevron />
    </div>
    <div style={{ borderTop: `1px solid ${T.line}`, marginTop: 14 }}>
      <div className="press" style={{ display: 'flex', alignItems: 'center', gap: 8, height: 38 }}><span style={{ fontFamily: T.fontUI, fontSize: 12.5, fontWeight: 600, color: T.ink2 }}>Optional</span><Meta T={T}>can wait</Meta><span style={{ flex: 1 }} /><Ic name="chevron-up" size={16} color={T.ink3} /></div>
      <CsOptRow T={T} label="Broker · Agency" value={CS_NEW.broker} />
      <CsOptRow T={T} label="GST number" />
      <div className="press" style={{ display: 'flex', alignItems: 'center', gap: 6, height: 40, borderTop: `1px solid ${T.line}`, fontFamily: T.fontUI, fontSize: 13, fontWeight: 600, color: T.ink2 }}>More<span style={{ fontWeight: 400, color: T.ink3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>· credit days (30 default), transport</span></div>
    </div>
    <Meta T={T} style={{ display: 'block', whiteSpace: 'normal', marginTop: 6, lineHeight: 1.4 }}>Required for the cart: name, phone, city. The rest can wait.</Meta>
  </>;
}
const CsAddBtn = ({ T }) => <T.Btn icon="user-plus" style={{ width: '100%', height: 48 }}>Add and start cart D</T.Btn>;

/* ── Submit for approval: summary, due and priority, the credit-line check, a note ── */
function CsCredit({ T, blocked }) {
  const { line, openFits, openOver } = CS_CREDIT, { total: cart } = csTotals();
  const used = blocked ? openOver : openFits, tot = used + cart, scale = Math.max(line, tot);
  const segs = blocked ? [[used, T.ink2], [line - used, T.accent], [tot - line, T.danger]] : [[used, T.ink2], [cart, T.accent], [line - tot, T.line2]];
  const keys = blocked ? [['Open bills', T.ink2, used], ['This cart', T.accent, cart], ['Over', T.danger, tot - line]] : [['Open bills', T.ink2, used], ['This cart', T.accent, cart], ['Free', T.line2, line - tot]];
  const at = line / scale * 100;
  return <div style={{ padding: '10px 14px 11px', borderRadius: 16, background: T.surface2, border: `1px solid ${blocked ? T.danger + '66' : T.line}` }}>
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 8, height: 18, marginBottom: 8 }}><Ic name="banknote" size={15} color={T.ink2} /><span style={{ fontFamily: T.fontUI, fontSize: 12.5, fontWeight: 600, color: T.ink2 }}>Credit line</span>
      {blocked && <span style={{ position: 'absolute', right: `calc(${100 - at}% + 5px)`, top: 2, fontFamily: T.fontUI, fontSize: 10.5, color: T.ink3, whiteSpace: 'nowrap' }}>line {money(line)}</span>}</div>
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', gap: 2, height: 12, borderRadius: 6, overflow: 'hidden', background: T.chipBg }}>{segs.map(([v, c], i) => <span key={i} style={{ flex: `${v} 0 0`, minWidth: 0, background: c }} />)}</div>
      {blocked && <span style={{ position: 'absolute', left: `${at}%`, top: -4, width: 2, height: 20, marginLeft: -1, borderRadius: 1, background: T.ink }} />}
    </div>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 9px', marginTop: 8, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink3 }}>{keys.map(([l, c, v]) => <span key={l} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' }}><span style={{ width: 8, height: 8, borderRadius: 4, background: c, boxShadow: c === T.line2 ? 'inset 0 0 0 1px rgba(128,128,128,.4)' : 'none' }} />{l}<b style={{ color: T.ink, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{money(v)}</b></span>)}</div>
    <div style={{ marginTop: 6, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink3, fontVariantNumeric: 'tabular-nums' }}>{blocked ? <span style={{ color: T.danger, fontWeight: 600 }}>Over the line by {money(tot - line)} · admin must approve</span> : <>{money(line)} line · {money(used)} open · <span style={{ color: T.ok, fontWeight: 600 }}>fits</span></>}</div>
  </div>;
}
function CsSubmitBody({ T, blocked, tight }) {
  const { pcs, g, total } = csTotals();
  return <div style={{ display: 'grid', gap: tight ? 10 : 12 }}>
    <div style={{ padding: tight ? '10px 12px' : '11px 14px', borderRadius: 18, background: T.surface, border: `1px solid ${T.line}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 21, fontWeight: 500, color: T.ink, lineHeight: 1.1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Ramleela Fashion</div><Meta T={T} style={{ display: 'block', marginTop: 3 }}>Surat · {pcs} pcs · {g.length} designs</Meta></span>
        <span style={{ textAlign: 'right' }}><PriceF v={total} size={26} font={T.fontSerif} color={T.ink} dim={T.ink3} /><div style={{ fontFamily: T.fontUI, fontSize: 10.5, color: T.ink3, marginTop: 3 }}>total · GST extra</div></span>
      </div>
      <div style={{ marginTop: 9, paddingTop: 9, borderTop: `1px solid ${T.line}`, overflow: 'hidden' }}><CsDesigns T={T} /></div>
    </div>
    <CsRow T={T} label="Dispatch due" hint="default 20 d" lw={tight ? 80 : 88}><CsChoice T={T} items={['10 d', '20 d', '30 d', 'custom']} on="20 d" fs={tight ? 13 : 14} /></CsRow>
    <CsRow T={T} label="Priority" hint="1 packs first" lw={tight ? 80 : 88}><CsChoice T={T} items={['1', '2', '3', '4', '5']} on="3" fs={tight ? 13 : 14} /></CsRow>
    <CsCredit T={T} blocked={blocked} />
    <div>
      <CsLabel T={T}>Note for approval</CsLabel>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, minHeight: 44, boxSizing: 'border-box', padding: '0 6px 0 14px', borderRadius: T.rCtl, background: T.surface, border: `1px solid ${T.line2}` }}><span style={{ flex: 1, minWidth: 0, fontFamily: T.fontUI, fontSize: 14, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{CS_NOTE}</span><Hit T={T} icon="mic" size={34} iconSize={18} style={{ color: T.ink2 }} /></div>
    </div>
  </div>;
}
const CsStrip = ({ T }) => <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px', borderRadius: 14, background: T.danger + '1F', border: `1px solid ${T.danger}66`, marginBottom: 10 }}>
  <Ic name="octagon-alert" size={18} color={T.danger} style={{ marginTop: 1 }} />
  <span style={{ fontFamily: T.fontUI, fontSize: 12.5, lineHeight: 1.4, color: T.ink }}>This cart crosses Ramleela Fashion’s credit line. It will go to admin, not to accounts.</span>
</div>;
function CsSubmitFoot({ T, blocked }) {
  return blocked ? <><CsStrip T={T} /><div style={{ display: 'flex', gap: 8 }}><T.Btn kind="secondary" icon="list-minus" style={{ height: 48 }}>Trim cart</T.Btn><T.Btn icon="send" style={{ flex: 1, height: 48 }}>Send to admin</T.Btn></div></>
    : <T.Btn icon="send" style={{ width: '100%', height: 48 }}>Send for approval</T.Btn>;
}

/* ── Sent: the card that replaces cart A's card ── */
function CsSentCard({ T, wide }) {
  const { pcs, g, total } = csTotals();
  return <div style={{ margin: wide ? '14px 24px 0' : '14px 14px 0', padding: '18px 16px 16px', borderRadius: T.rCard, background: T.surface, border: `1px solid ${T.line}`, boxShadow: T.dark ? 'none' : '0 6px 18px -12px rgba(36,23,18,.25)' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ width: 46, height: 46, borderRadius: 23, background: T.ok + '24', color: T.ok, display: 'grid', placeItems: 'center', flex: 'none' }}><Ic name="check" size={24} sw={2.2} /></span>
      <span style={{ minWidth: 0 }}><div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}><Mono T={T} size={17}>SO-3456</Mono><span style={{ fontFamily: T.fontDisplay, fontSize: 21, fontWeight: 500, color: T.ink }}>sent for approval</span></div></span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14 }}>
      <span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 18, fontWeight: 500, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Ramleela Fashion</div><Meta T={T} style={{ display: 'block', marginTop: 2 }}>Surat · {pcs} pcs · {g.length} designs · due 20 d</Meta></span>
      <PriceF v={total} size={22} font={T.fontSerif} color={T.ink} dim={T.ink3} />
    </div>
    <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${T.line}`, overflow: 'hidden' }}><CsDesigns T={T} /></div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, fontFamily: T.fontUI, fontSize: 12.5, color: T.ink2 }}><Ic name="clock" size={14} color={T.ink3} />Nalini (accounts) will see it now · usually within 2 h</div>
    <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
      <T.Btn kind="secondary" icon="share-2" small style={{ flex: 1, height: 44, fontSize: 13 }}>Share with customer</T.Btn>
      <T.Btn kind="secondary" icon="receipt-text" small style={{ flex: 1, height: 44, fontSize: 13 }}>Open order</T.Btn>
    </div>
  </div>;
}

/* ── Calmer grid header: one scrolling row merges the lists and the quick chips ── */
const CS_QUICK = ['Top 30', 'Delhi', 'Zari work', 'Wine'];
/* One row: the current list stays pinned at the left (as QuickRow pins active chips), the other lists, a 1 px hairline
   and the quick chips scroll beneath it. `swiped` = the row has been swiped sideways to the saved lists, so the hairline and the quick chips show. */
const CS_ROW_H = 46;   // 8 margin + 30 row + 6 gap + 2 indicator
function CsMergedRow({ T, swiped }) {
  const snap = el => { const t = el && swiped && el.querySelector('[data-snap]'); if (t) el.scrollLeft = t.offsetLeft - 6; };
  const pill = (l, k, on, first) => <span key={l} data-snap={first ? '1' : undefined} className="press" style={{ flex: 'none', padding: on ? '3px 12px' : '3px 7px', borderRadius: 999, background: on ? T.ink : 'transparent', color: on ? T.bg : k === 'custom' ? T.custom : T.ink2, fontFamily: T.fontDisplay, fontSize: 17, fontWeight: 500, fontStyle: k === 'custom' ? 'italic' : 'normal', whiteSpace: 'nowrap', lineHeight: 1.25 }}>{l}</span>;
  return <div style={{ marginTop: 8 }}>
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 6, padding: '0 12px', height: 30 }}>
      {pill('All', 'default', true)}
      <div ref={snap} style={{ flex: 1, minWidth: 0, overflow: 'hidden', WebkitMaskImage: 'linear-gradient(90deg, transparent 0, #000 8px, #000 calc(100% - 56px), transparent 100%)', maskImage: 'linear-gradient(90deg, transparent 0, #000 8px, #000 calc(100% - 56px), transparent 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, width: 'max-content', position: 'relative' }}>
          {LISTS.filter(([l]) => l !== 'All').map(([l, k]) => pill(l, k, false, l === 'Delhi picks'))}
          <span style={{ flex: 'none', width: 1, height: 20, background: T.line2, margin: '0 4px' }} />
          {CS_QUICK.map(c => <T.Chip key={c} outline x>{c}</T.Chip>)}
        </div>
      </div>
      <span className="press" style={{ position: 'absolute', right: 10, top: 3, width: 24, height: 24, borderRadius: 12, background: T.chipBg, color: T.ink2, display: 'grid', placeItems: 'center' }}><Ic name="chevron-right" size={13} sw={2.2} /></span>
    </div>
    <div style={{ margin: '6px 12px 0', height: 2, borderRadius: 1, background: T.line }}><span style={{ display: 'block', width: '34%', height: 2, borderRadius: 1, background: T.accent, marginLeft: swiped ? '32%' : 0 }} /></div>
  </div>;
}
const CsHeader = ({ T, children }) => <div style={{ background: T.header, borderBottom: `1px solid ${T.line}`, boxShadow: T.headerShadow, paddingBottom: 6, marginTop: -54, paddingTop: 54, flex: 'none' }}><T.TopBar /><T.SearchBar view="grid" />{children}</div>;
const CsCount = ({ T }) => <div style={{ padding: '8px 16px 0' }}><Meta T={T}>15 designs · sorted by featured</Meta></div>;
function CsGridCards({ T }) {
  const list = XD.designs.slice(0, 6);
  return <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '12px 10px', padding: '8px 12px 270px', alignItems: 'start' }}>{list.map(d => <T.GridCard key={d.code} d={d} qty={QTY[d.code]} mode="cart" />)}</div>;
}

/* ═══════════════ phone screens ═══════════════ */
const CsOverCarts = ({ T, sheet }) => <div style={{ position: 'relative', height: '100%' }}><ScreenFCarts T={T} />{scrimF(T)}{sheet}</div>;

/* P1 · new cart sheet over Carts */
function ScreenCsNewCart({ T }) {
  return <CsOverCarts T={T} sheet={<Sheet T={T} h={580} title="New cart" foot={<CsStartBtn T={T} />}><CsNewCartBody T={T} /></Sheet>} />;
}
/* P2 · new customer sheet */
function ScreenCsNewCustomer({ T }) {
  return <CsOverCarts T={T} sheet={<Sheet T={T} h={580} title="New customer" foot={<CsAddBtn T={T} />}><CsNewCustBody T={T} /></Sheet>} />;
}
/* P3 · submit, it fits */
function ScreenCsSubmit({ T }) {
  return <CsOverCarts T={T} sheet={<Sheet T={T} h={590} title="Submit cart A" foot={<CsSubmitFoot T={T} />}><CsSubmitBody T={T} /></Sheet>} />;
}
/* P4 · submit, over the credit line */
function ScreenCsSubmitBlocked({ T }) {
  return <CsOverCarts T={T} sheet={<Sheet T={T} h={632} title="Submit cart A" foot={<CsSubmitFoot T={T} blocked />}><CsSubmitBody T={T} blocked /></Sheet>} />;
}
/* P5 · sent: A greyed with "sent", B active, confirmation card in A's place, toast */
function ScreenCsSubmitted({ T }) {
  return frameF(T, <>
    <div style={{ display: 'flex', alignItems: 'center', padding: '0 20px', height: 44 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 26, fontWeight: 500, color: T.ink }}>Carts</span><span style={{ flex: 1 }} /><T.Chip icon="user-plus">New customer</T.Chip></div>
    <div style={{ padding: '6px 16px 0' }}><CsCartChips T={T} cart="B" sent="A" /></div>
    <CsSentCard T={T} />
    <div style={{ padding: '12px 22px 0' }}><Meta T={T} style={{ display: 'block', whiteSpace: 'normal' }}>Cart B · RL Fashion is active now. Designs you pick in the catalogue go into it.</Meta></div>
  </>, <Toast T={T} title="Cart A became SO-3456" sub="Sent to accounts" style={{ position: 'absolute', left: 14, right: 14, bottom: 22 }} />);
}
/* P6 · three-row header: one scrolling row for lists and quick chips (swiped sideways so the chips show), count as a Meta line in the body */
function ScreenCsGrid3({ T }) {
  return frameF(T, <>
    <CsHeader T={T}><CsMergedRow T={T} swiped /></CsHeader>
    <CsCount T={T} />
    <CsGridCards T={T} />
  </>, <T.Dock active="Catalogue" cart="A" />);
}
/* P7 · two-row header: identity and search only; the lists-and-chips row is the first row of the grid body and has
   scrolled away with the grid (at rest it sits right under the search island, level with P6) */
function ScreenCsGrid2({ T }) {
  return frameF(T, <>
    <CsHeader T={T} />
    <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
      <div style={{ marginTop: -CS_ROW_H }}><CsMergedRow T={T} /></div>
      <CsCount T={T} />
      <CsGridCards T={T} />
    </div>
  </>, <T.Dock active="Catalogue" cart="A" />);
}

/* ═══════════════ web screens ═══════════════ */
/* the Carts main area exactly as WebCarts draws it, with the chips row taking the pressed "+" */
function CsWebCartsMain({ T, plusOn }) {
  const groups = groupsOf(); const pcs = groups.reduce((s, g) => s + g.pcs, 0);
  return <>
    <div style={{ padding: '16px 24px 0' }}><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CsCartChips T={T} cart="A" plusOn={plusOn} /><span style={{ flex: 1 }} /><T.Chip icon="user-plus" outline>New customer</T.Chip></div></div>
    <div style={{ margin: '14px 24px 0', borderRadius: 20, background: T.surface, border: `1px solid ${T.line}`, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px 12px' }}><span><div style={{ fontFamily: T.fontDisplay, fontSize: 22, fontWeight: 500 }}>Ramleela Fashion</div><div style={{ fontSize: 12, color: T.ink3, marginTop: 2 }}>Surat · Platinum · 30 days credit · {groups.length} designs · {pcs} pcs</div></span><span style={{ flex: 1 }} /><T.Chip icon="phone" outline>98152 23366</T.Chip><T.Chip icon="history" outline>Purchase history</T.Chip></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>{groups.map((g, i) => <div key={g.d.code} style={{ borderRight: i % 2 === 0 ? `1px solid ${T.line}` : 0 }}><CartGroups T={T} groups={[g]} photo={64} /></div>)}</div>
    </div>
  </>;
}
const CsPane = ({ T, children, foot }) => <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
  <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', padding: '14px 16px 0' }}>{children}</div>
  {foot && <div style={{ padding: '12px 16px 16px', borderTop: `1px solid ${T.line}` }}>{foot}</div>}
</div>;
const CsBack = ({ T, children }) => <span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, height: 28, padding: '0 10px 0 6px', borderRadius: 999, background: T.chipBg, fontFamily: T.fontUI, fontSize: 12, color: T.ink2, marginBottom: 12 }}><Ic name="arrow-left" size={13} />{children}</span>;
const CsWebShell = ({ T, plusOn, title, pane }) => <WebShell3 T={T} module="Catalogue" crumb={['Catalogue', 'Carts']} section="Carts" seg={CAT_SEG} active="Carts" mode="Customer mode" tabs={CS_TABS} paneTitle={title} pane={pane}><CsWebCartsMain T={T} plusOn={plusOn} /></WebShell3>;

const WebCsNewCart = ({ T }) => <CsWebShell T={T} plusOn title="New cart" pane={<CsPane T={T} foot={<CsStartBtn T={T} />}><CsNewCartBody T={T} /></CsPane>} />;
const WebCsNewCustomer = ({ T }) => <CsWebShell T={T} plusOn title="New customer" pane={<CsPane T={T} foot={<CsAddBtn T={T} />}><CsBack T={T}>Customers</CsBack><CsNewCustBody T={T} /></CsPane>} />;
const WebCsSubmit = ({ T }) => <CsWebShell T={T} title="Submit cart A" pane={<CsPane T={T} foot={<CsSubmitFoot T={T} />}><CsSubmitBody T={T} tight /></CsPane>} />;
const WebCsSubmitBlocked = ({ T }) => <CsWebShell T={T} title="Submit cart A" pane={<CsPane T={T} foot={<CsSubmitFoot T={T} blocked />}><CsSubmitBody T={T} blocked tight /></CsPane>} />;

/* ═══════════════ registration ═══════════════ */
(window.NEW_DRAFT_MODULES = window.NEW_DRAFT_MODULES || []).push({ module: 'Catalogue · sell flow', note: 'the screens the sell flow was missing: new cart and customer, submit with the credit-line check, sent state; two calmer grid headers for compare (13 Oct, review 2)', subs: [
  { name: 'New cart & customer', flow: 'new cart → recent or new customer → start',
    phone: [['New cart & customer · new cart sheet', ScreenCsNewCart], ['New cart & customer · new customer sheet', ScreenCsNewCustomer]],
    web: [['New cart & customer · new cart, customer picker in the pane', WebCsNewCart], ['New cart & customer · new customer in the pane', WebCsNewCustomer]] },
  { name: 'Submit for approval', flow: 'summary with credit line → fits / over the line → sent',
    phone: [['Submit for approval · summary, credit line fits', ScreenCsSubmit], ['Submit for approval · over the credit line', ScreenCsSubmitBlocked], ['Submit for approval · sent', ScreenCsSubmitted]],
    web: [['Submit for approval · summary in the pane', WebCsSubmit], ['Submit for approval · over the credit line in the pane', WebCsSubmitBlocked]] },
  { name: 'Calmer grid header', flow: 'three rows → two rows, compare with the final',
    phone: [['Grid · three-row header (compare with final f-1)', ScreenCsGrid3], ['Grid · two-row header, lists scroll with the grid (compare with f-1)', ScreenCsGrid2]],
    web: [] },
] });

Object.assign(window, { CS_RECENT, CS_NEW, CS_CREDIT, CS_NOTE, CS_TABS, CS_QUICK, CS_ROW_H, csTotals, CsSearch, CsSeg, CsChoice, CsField, CsOptRow, CsCustRow, CsLabel, CsRow, CsDesigns, CsCartChips, CsNewCartBody, CsStartBtn, CsNewCustBody, CsAddBtn, CsCredit, CsSubmitBody, CsStrip, CsSubmitFoot, CsSentCard, CsMergedRow, CsHeader, CsCount, CsGridCards, CsOverCarts, CsWebCartsMain, CsPane, CsBack, CsWebShell,
  ScreenCsNewCart, ScreenCsNewCustomer, ScreenCsSubmit, ScreenCsSubmitBlocked, ScreenCsSubmitted, ScreenCsGrid3, ScreenCsGrid2, WebCsNewCart, WebCsNewCustomer, WebCsSubmit, WebCsSubmitBlocked });
