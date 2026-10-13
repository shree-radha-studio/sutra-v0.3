/* NEW DRAFTS · Catalogue · sell flow (13 Oct 2026, review 2). The screens the sell flow was missing: new cart with a
   customer picker, new customer sheet, submit for approval (never blocked), the order waiting in the approval queue (edit or
   delete it), and a calmer phone grid header drawn as a draft beside the final for compare. Component names start with Cs. Plan: plans/review-2-sell-flow.md. */

/* Reuses from base: frameF, scrimF, ScreenFCarts, CartGroups, groupsOf, PriceF, money, LISTS, QTY, CARTS, CartChips,
   Body-less sheets (Sheet), Meta, Mono, Pill, Thumb, Monogram, Toast, Hit, Ic, T.Btn, T.Chip, T.Island/T.Dock, T.TopBar,
   T.SearchBar, T.GridCard, WebShell3, CAT_SEG, RightPane (via WebShell3). */

/* ── data (the board's own) ── */
const CS_RECENT = [[XD.customers[0], '10/09/26'], [XD.customers[3], '09/09/26'], [XD.customers[1], '26/08/26']];   // Preeti · A V Creation · Rangoli
const CS_NEW = { name: 'Shree Vastra Collection', phone: '98765 43210', city: 'Jaipur', broker: 'Harjeet Singh · Harjeet Agency' };
const CS_NOTE = '2018 ke red ka stock check karna hai';
const CS_TABS = [{ icon: 'layout-grid', label: 'Catalogue' }, { icon: 'shopping-basket', label: 'Carts · 3 active', on: true }];
/* Cart A's customer and the order it became (SO-3456), for the queue screens */
const CS_CUST = { id: 'ca', name: 'Ramleela Fashion', city: 'Surat', market: 'Adajan', tier: 'Platinum', score: 90, phone: '98152 23366', transport: 'Patel Parcel Service', broker: 'Harjeet Singh' };
const csTotals = () => { const g = groupsOf(); return { g, pcs: g.reduce((s, x) => s + x.pcs, 0), total: g.reduce((s, x) => s + x.pcs * (x.d.price || 0), 0) }; };
const csOrder = () => { const { g, pcs, total } = csTotals(); return { no: 'SO-3456', c: CS_CUST, date: '13/10/26', pcs, designs: g.length, bill: total, status: 'In queue' }; };

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
  <span style={{ fontFamily: T.fontUI, fontSize: 13, color: T.ink2, flex: 'none' }}>{label}</span><span style={{ flex: 1 }} />
  <span style={{ fontFamily: T.fontUI, fontSize: 13, color: value ? T.ink : T.ink3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>{value || 'Add'}</span>
  <Ic name="chevron-right" size={15} color={T.ink3} />
</div>;
/* a customer in the picker: name is the head; selected = ink outline and a check, not maroon */
const CsCustRow = ({ T, c, last, sel }) => <div className="press" style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 60, boxSizing: 'border-box', padding: '0 12px', borderRadius: 16, background: sel ? T.surface : 'transparent', border: sel ? `1.5px solid ${T.ink}` : '1.5px solid transparent' }}>
  <Monogram T={T} c={c} s={38} />
  <span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 17, fontWeight: 600, color: T.ink, lineHeight: 1.1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</div><Meta T={T} style={{ display: 'block', marginTop: 3 }}>{c.city} · {c.tier} · last order {last}</Meta></span>
  {sel ? <span style={{ width: 24, height: 24, borderRadius: 12, background: T.ink, color: T.bg, display: 'grid', placeItems: 'center', flex: 'none' }}><Ic name="check" size={14} sw={2.4} /></span> : <Ic name="chevron-right" size={18} color={T.ink3} />}
</div>;
const CsLabel = ({ T, children, right, style }) => <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '0 2px 7px', ...style }}><span style={{ fontFamily: T.fontUI, fontSize: 12.5, fontWeight: 600, color: T.ink2 }}>{children}</span><span style={{ flex: 1 }} />{right}</div>;
/* design photos beside their numbers, for the summary and the sent card */
const CsDesigns = ({ T, size = 1 }) => <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>{groupsOf().map(g => <span key={g.d.code} style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Thumb T={T} d={g.d} w={Math.round(26 * size)} h={Math.round(33 * size)} r={7} /><span style={{ fontFamily: T.fontDisplay, fontSize: 16, fontWeight: 600, color: T.ink, fontVariantNumeric: 'tabular-nums' }}>{g.d.code}</span></span>)}</div>;

/* Cart chips like the final's (tap activates), plus: "+" in its pressed state, a sent cart greyed with a "sent" tag, and the
   active chip reading "SO-3456 · editing" while a queued order is being edited */
function CsCartChips({ T, cart = 'A', sent, editing, plusOn, style }) {
  return <div style={{ display: 'flex', gap: 6, alignItems: 'center', overflow: 'hidden', ...style }}>
    {CARTS.map(c => {
      if (c.k === sent) return <span key={c.k} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, height: 34, padding: '0 10px 0 4px', borderRadius: 999, background: T.chipBg, color: T.ink3, fontFamily: T.fontUI, fontSize: 12, fontWeight: 500, flex: 'none', whiteSpace: 'nowrap' }}>
        <span style={{ width: 26, height: 26, borderRadius: 13, background: T.bg2, display: 'grid', placeItems: 'center', fontFamily: T.fontDisplay, fontSize: 13, fontWeight: 600 }}>{c.k}</span>
        <Ic name="check" size={12} sw={2.2} />sent
      </span>;
      const on = c.k === cart;
      return <span key={c.k} className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 34, padding: on ? (editing ? '0 10px 0 4px' : '0 12px 0 4px') : '0 10px 0 4px', borderRadius: 999, background: on ? T.accent : T.chipBg, color: on ? T.onAccent : T.ink, fontFamily: T.fontUI, fontSize: 12.5, fontWeight: 500, flex: 'none', whiteSpace: 'nowrap' }}>
        <span style={{ width: 26, height: 26, borderRadius: 13, background: on ? 'rgba(255,255,255,.2)' : T.bg2, display: 'grid', placeItems: 'center', fontFamily: T.fontDisplay, fontSize: 13, fontWeight: 600 }}>{c.k}</span>
        {on ? (editing || c.name) : c.name.split(' ')[0]}{!(on && editing) && <b style={{ fontWeight: 500, opacity: .7 }}>{c.n}</b>}
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
    <Meta T={T} style={{ display: 'block', whiteSpace: 'normal', marginTop: 14, lineHeight: 1.45 }}>Name, phone and city is enough to start a cart. Broker, GST number, credit days and transport can be added later in the Hub.</Meta>
  </>;
}
const CsAddBtn = ({ T }) => <T.Btn icon="user-plus" style={{ width: '100%', height: 48 }}>Add and start cart D</T.Btn>;

/* ── Submit for approval: nothing on this sheet can block. Credit and overdue reasons are flags on the approver's side. ── */
function CsSubmitBody({ T }) {
  const { pcs, g, total } = csTotals();
  return <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 15 }}>
    <div style={{ padding: '12px 14px', borderRadius: 18, background: T.surface, border: `1px solid ${T.line}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 21, fontWeight: 500, color: T.ink, lineHeight: 1.1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Ramleela Fashion</div><Meta T={T} style={{ display: 'block', marginTop: 3 }}>Surat · {pcs} pcs · {g.length} designs</Meta></span>
        <span style={{ textAlign: 'right' }}><PriceF v={total} size={26} font={T.fontSerif} color={T.ink} dim={T.ink3} /><div style={{ fontFamily: T.fontUI, fontSize: 10.5, color: T.ink3, marginTop: 3 }}>total · GST extra</div></span>
      </div>
      <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${T.line}`, overflow: 'hidden' }}><CsDesigns T={T} /></div>
    </div>
    <div>
      <CsLabel T={T} right={<Meta T={T}>default 20 d</Meta>}>Dispatch due</CsLabel>
      <CsChoice T={T} items={['10 d', '20 d', '30 d', 'custom']} on="20 d" h={44} />
    </div>
    <div>
      <CsLabel T={T} right={<Meta T={T}>1 packs first</Meta>}>Priority</CsLabel>
      <CsChoice T={T} items={['1', '2', '3', '4', '5']} on="3" h={44} />
    </div>
    <div>
      <CsLabel T={T}>Note for approval</CsLabel>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, minHeight: 46, boxSizing: 'border-box', padding: '0 6px 0 14px', borderRadius: T.rCtl, background: T.surface, border: `1px solid ${T.line2}` }}><span style={{ flex: 1, minWidth: 0, fontFamily: T.fontUI, fontSize: 14, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{CS_NOTE}</span><Hit T={T} icon="mic" size={34} iconSize={18} style={{ color: T.ink2 }} /></div>
    </div>
  </div>;
}
const CsSubmitFoot = ({ T }) => <T.Btn icon="send" style={{ width: '100%', height: 48 }}>Send for approval</T.Btn>;

/* ── In the approval queue: the order is still the salesperson's to edit or delete ── */
const CsInfoStrip = ({ T, icon, tone, children, meta }) => <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px', borderRadius: 14, background: T.surface2, border: `1px solid ${T.line2}` }}>
  <Ic name={icon} size={17} color={tone || T.ink2} style={{ marginTop: 1 }} />
  <span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontUI, fontSize: 13, lineHeight: 1.35, color: T.ink }}>{children}</div>{meta && <Meta T={T} style={{ display: 'block', whiteSpace: 'normal', marginTop: 3 }}>{meta}</Meta>}</span>
</div>;
/* IN QUEUE tag: StatusPill's shape, accent dot (the schema has no gold chips; the density decision restyles every status tag later) */
const CsQueuePill = ({ T }) => <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, height: 22, padding: '0 8px', borderRadius: 999, background: T.chipBg, fontSize: 10.5, fontWeight: 600, letterSpacing: '.04em', textTransform: 'uppercase', color: T.ink2, whiteSpace: 'nowrap' }}><span style={{ width: 6, height: 6, borderRadius: 3, background: T.accent }} />In queue</span>;
/* the sale order card of the Sale orders web screen (SOCard's markup) with the queue tag */
const CsSOCard = ({ T, x, first }) => <div style={{ padding: '12px 14px', borderRadius: 18, background: T.surface, border: `1px solid ${first ? T.accentLine : T.line}`, boxShadow: first ? `0 0 0 2px ${T.accentSoft}` : 'none' }}>
  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ fontFamily: T.fontMono, fontSize: 13, fontWeight: 600 }}>{x.no}</span>{x.status === 'In queue' ? <CsQueuePill T={T} /> : <StatusPill T={T} s={x.status} />}<span style={{ flex: 1 }} /><span style={{ fontSize: 11.5, color: T.ink3 }}>{x.date}</span></div>
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 19, fontWeight: 500, flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{x.c.name}</span><span style={{ fontFamily: T.fontSerif, fontSize: 18, fontWeight: 600 }}>{money(x.bill)}</span></div>
  <div style={{ fontSize: 11.5, color: T.ink3, marginTop: 2 }}>{x.c.city} · {x.c.tier} · {x.pcs} pcs · {x.designs} designs</div>
  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10 }}><T.Chip icon="user" style={{ height: 26, fontSize: 11 }}>{x.c.broker}</T.Chip><span style={{ flex: 1 }} /><Hit T={T} icon="printer" size={30} iconSize={14} style={{ background: T.chipBg }} /><Hit T={T} icon="share-2" size={30} iconSize={14} style={{ background: T.chipBg }} /></div>
</div>;
const CsQueueStrip = ({ T }) => <CsInfoStrip T={T} icon="clock" meta="You can edit or delete it until it is approved."><div style={{ fontWeight: 600 }}>In the approval queue</div><div style={{ color: T.ink2, fontSize: 12.5, marginTop: 1 }}>Nalini (accounts) · since 10:42</div></CsInfoStrip>;
/* Decision 6, approvals in one place: the sale-order page only shows the state and links to Home › Approvals. No Approve, no Reject.
   viewer 'sales' (the salesperson who raised it): who sees it next, Edit and Delete while it waits. viewer 'manager': the same state plus the
   approver's flags in words (CsFlags, same words as Home's "Look twice"); the manager acts in Approvals, so no buttons here. */
/* the approver's flags, same words as Home's "Look twice" card (copied, not imported: the catalogue page does not load mod-home) */
const CS_FLAGS = () => [['danger', 'Overdue ₹62,400', '2 bills, oldest 41 d'], ['warn', 'GR ratio 40 %', 'goods returned, last 12 months'], ['warn', 'Edited after submit', '2 min ago · qty of 2798 Sky 6 → 4']];
function CsFlags({ T, flags }) {
  const c = flags.some(f => f[0] === 'danger') ? T.danger : T.warn;
  return <div style={{ padding: '10px 12px 8px', borderRadius: 18, background: c + '14', border: `1px solid ${c}55` }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}><Ic name="eye" size={16} color={c} /><span style={{ fontFamily: T.fontDisplay, fontSize: 17, fontWeight: 600, color: T.ink }}>Look twice</span><span style={{ fontFamily: T.fontUI, fontSize: 11, fontWeight: 600, color: c, fontVariantNumeric: 'tabular-nums' }}>{flags.length}</span></div>
    {flags.map(([tone, label, fact]) => <div key={label} style={{ display: 'flex', gap: 9, alignItems: 'flex-start', padding: '4px 0' }}><span style={{ width: 7, height: 7, borderRadius: 4, background: tone === 'danger' ? T.danger : T.warn, flex: 'none', marginTop: 6 }} /><span style={{ fontFamily: T.fontUI, fontSize: 12.5, color: T.ink2, lineHeight: 1.4 }}><b style={{ color: T.ink, fontWeight: 600 }}>{label}</b> · {fact}</span></div>)}
  </div>;
}
function CsStateCard({ T, viewer = 'sales' }) {
  return <div style={{ padding: '12px 14px', borderRadius: 16, background: T.surface2, border: `1px solid ${T.line2}` }}>
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
      <Ic name="clock" size={17} color={T.ink2} style={{ marginTop: 1 }} />
      <span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontUI, fontSize: 14, fontWeight: 600, color: T.ink }}>Waiting for approval</div><div style={{ fontFamily: T.fontUI, fontSize: 12.5, color: T.ink2, marginTop: 1 }}>The sale manager sees it next · since 10:42</div></span>
    </div>
    {viewer === 'manager' && <div style={{ marginTop: 10 }}><CsFlags T={T} flags={CS_FLAGS()} /></div>}
    {viewer === 'sales' && <div style={{ fontFamily: T.fontUI, fontSize: 12.5, color: T.ink3, marginTop: 8, lineHeight: 1.4 }}>You can edit or delete it until it is approved.</div>}
    <div className="press" style={{ display: 'flex', alignItems: 'center', gap: 8, height: 44, marginTop: 10, padding: '0 12px', borderRadius: 12, background: T.surface, border: `1px solid ${T.line2}`, fontFamily: T.fontUI, fontSize: 14, fontWeight: 500, color: T.ink }}><Ic name="clipboard-check" size={17} color={T.ink2} />See in Approvals<span style={{ flex: 1 }} /><Ic name="chevron-right" size={17} color={T.ink3} /></div>
  </div>;
}
const csLines = () => groupsOf().map(g => ({ d: g.d, cols: g.cols }));
const CsQueueButtons = ({ T }) => <div style={{ display: 'flex', gap: 8 }}><T.Btn kind="secondary" icon="trash-2" style={{ height: 48 }}>Delete</T.Btn><T.Btn icon="pencil" style={{ flex: 1, height: 48 }}>Edit order</T.Btn></div>;

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
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginTop: 12, fontFamily: T.fontUI, fontSize: 12.5, lineHeight: 1.4, color: T.ink2 }}><Ic name="clock" size={14} color={T.ink3} style={{ marginTop: 2 }} />In the queue. You can edit or delete it until it is approved.</div>
    <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
      <T.Btn kind="secondary" icon="share-2" small style={{ flex: 1, height: 44, fontSize: 13 }}>Share with customer</T.Btn>
      <T.Btn kind="secondary" icon="receipt-text" small style={{ flex: 1, height: 44, fontSize: 13 }}>Open order</T.Btn>
    </div>
  </div>;
}

/* ── Calmer grid header: one scrolling row merges the lists and the quick chips ── */
const CS_QUICK = ['Top 30', 'Delhi', 'Zari work', 'Wine'];
/* One row: the current list stays pinned at the left (as QuickRow pins active chips), the other lists, a 1 px hairline
   and the quick chips scroll beneath it. `side` = the row has been swiped sideways to the saved lists, so the hairline and the quick chips show. */
const CS_ROW_H = 46;   // 8 margin + 30 row + 6 gap + 2 indicator
function CsMergedRow({ T, side }) {
  const snap = el => { const t = el && side && el.querySelector('[data-snap]'); if (t) el.scrollLeft = t.offsetLeft - 6; };
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
    <div style={{ margin: '6px 12px 0', height: 2, borderRadius: 1, background: T.line }}><span style={{ display: 'block', width: '34%', height: 2, borderRadius: 1, background: T.accent, marginLeft: side ? '32%' : 0 }} /></div>
  </div>;
}
/* filters button count: the final's search island, with a small bubble (ink on bg, like the cart count) on its filters button */
const CsFilterCount = ({ T, n = 4 }) => <span style={{ position: 'absolute', left: 82, top: -2, minWidth: 16, height: 16, padding: '0 4px', boxSizing: 'border-box', borderRadius: 8, background: T.ink, color: T.bg, fontFamily: T.fontUI, fontSize: 9.5, fontWeight: 600, display: 'grid', placeItems: 'center', pointerEvents: 'none' }}>{n}</span>;
const CsHeader = ({ T, children }) => <div style={{ background: T.header, borderBottom: `1px solid ${T.line}`, boxShadow: T.headerShadow, paddingBottom: 6, marginTop: -54, paddingTop: 54, flex: 'none' }}><T.TopBar /><div style={{ position: 'relative' }}><T.SearchBar view="grid" /><CsFilterCount T={T} /></div>{children}</div>;
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
  return <CsOverCarts T={T} sheet={<Sheet T={T} h={410} title="New customer" foot={<CsAddBtn T={T} />}><CsNewCustBody T={T} /></Sheet>} />;
}
/* P3 · submit: summary, due, priority, note. Nothing here can block. */
function ScreenCsSubmit({ T }) {
  return <CsOverCarts T={T} sheet={<Sheet T={T} h={540} title="Submit cart A" foot={<CsSubmitFoot T={T} />}><CsSubmitBody T={T} /></Sheet>} />;
}
/* P4 · sent: A greyed with "sent", B active, confirmation card in A's place, toast */
function ScreenCsSubmitted({ T }) {
  return frameF(T, <>
    <div style={{ display: 'flex', alignItems: 'center', padding: '0 20px', height: 44 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 26, fontWeight: 500, color: T.ink }}>Carts</span><span style={{ flex: 1 }} /><T.Chip icon="user-plus">New customer</T.Chip></div>
    <div style={{ padding: '6px 16px 0' }}><CsCartChips T={T} cart="B" sent="A" /></div>
    <CsSentCard T={T} />
    <div style={{ padding: '12px 22px 0' }}><Meta T={T} style={{ display: 'block', whiteSpace: 'normal' }}>Cart B · RL Fashion is active now. Designs you pick in the catalogue go into it.</Meta></div>
  </>, <Toast T={T} title="Cart A became SO-3456" sub="Sent to accounts" style={{ position: 'absolute', left: 14, right: 14, bottom: 22 }} />);
}
/* P5 · my order in the queue: the final's opened sale order, with the queue strip and Delete · Edit order, no Approve */
function ScreenCsInQueue({ T }) {
  const o = csOrder();
  return frameF(T, <>
    <div style={{ display: 'flex', alignItems: 'center', padding: '0 12px', height: 44, gap: 6 }}><Hit T={T} icon="chevron-left" size={40} /><span style={{ fontFamily: T.fontMono, fontSize: 15, fontWeight: 600, color: T.ink }}>{o.no}</span><CsQueuePill T={T} /><span style={{ flex: 1 }} /><span style={{ fontSize: 12, color: T.ink3 }}>{o.date}</span></div>
    <div style={{ margin: '4px 14px 0' }}><CsQueueStrip T={T} /></div>
    <div style={{ margin: '10px 14px 0' }}><CustomerBar T={T} c={o.c} compact /></div>
    <div style={{ margin: '10px 14px 0' }}><OrderLines T={T} o={o} lines={csLines()} /></div>
  </>, <div style={{ position: 'absolute', left: 14, right: 14, bottom: 22, display: 'flex', alignItems: 'center', gap: 10, padding: 10, borderRadius: T.rDock, ...glass(T) }}>
    <span style={{ paddingLeft: 6 }}><div style={{ fontSize: 11, color: T.ink3, whiteSpace: 'nowrap' }}>{o.pcs} pcs · due 20 d</div><PriceF v={o.bill} size={21} font={T.fontSerif} color={T.ink} dim={T.ink3} style={{ marginTop: 2 }} /></span><span style={{ flex: 1 }} />
    <T.Btn kind="secondary" icon="trash-2" small style={{ height: 44 }}>Delete</T.Btn><T.Btn icon="pencil" small style={{ height: 44, padding: '0 16px', fontSize: 13.5 }}>Edit order</T.Btn>
  </div>);
}
/* P5b · decision 6, compare with final f-18: the opened order shows the state and the link to Approvals; its own Approve is gone */
function CsOrderStateScreen({ T, viewer }) {
  const o = csOrder();
  return frameF(T, <>
    <div style={{ display: 'flex', alignItems: 'center', padding: '0 12px', height: 44, gap: 6 }}><Hit T={T} icon="chevron-left" size={40} /><span style={{ fontFamily: T.fontMono, fontSize: 15, fontWeight: 600, color: T.ink }}>{o.no}</span><CsQueuePill T={T} /><span style={{ flex: 1 }} /><span style={{ fontSize: 12, color: T.ink3 }}>{o.date}</span></div>
    <div style={{ margin: '4px 14px 0' }}><CsStateCard T={T} viewer={viewer} /></div>
    <div style={{ margin: '10px 14px 0' }}><CustomerBar T={T} c={o.c} compact /></div>
    <div style={{ margin: '10px 14px 0' }}><OrderLines T={T} o={o} lines={csLines()} /></div>
  </>, <div style={{ position: 'absolute', left: 14, right: 14, bottom: 22, display: 'flex', alignItems: 'center', gap: 8, padding: 8, borderRadius: T.rDock, ...glass(T) }}>
    <Hit T={T} icon="printer" size={40} iconSize={18} style={{ background: T.chipBg }} /><Hit T={T} icon="share-2" size={40} iconSize={18} style={{ background: T.chipBg }} /><span style={{ flex: 1 }} />{viewer === 'manager' ? <span style={{ fontSize: 12, color: T.ink3, paddingRight: 8 }}>{o.pcs} pcs · {money(o.bill)}</span> : <><T.Btn kind="secondary" icon="trash-2" small style={{ height: 44 }}>Delete</T.Btn><T.Btn icon="pencil" small style={{ height: 44, padding: '0 16px', fontSize: 13.5 }}>Edit order</T.Btn></>}
  </div>);
}
const ScreenCsOrderState = ({ T }) => <CsOrderStateScreen T={T} />;
/* P5b2 · the same page for the sale manager: flags in words, the link to Approvals, nothing to press here but print and share */
const ScreenCsOrderStateMgr = ({ T }) => <CsOrderStateScreen T={T} viewer="manager" />;
/* P5c · the sale executive's queue list: RAISED and IN QUEUE only, no flags (flags are the approver's) */
function ScreenCsQueueList({ T }) {
  const list = [csOrder(), ...ORDERS_F.filter(x => x.status === 'Raised')];
  return frameF(T, <>
    <SOHeader T={T} tab="Raised" view="cards" />
    <div style={{ padding: '12px 14px 120px', display: 'flex', flexDirection: 'column', gap: 10 }}>{list.map((x, i) => <CsSOCard key={x.no} T={T} x={x} first={i === 0} />)}</div>
  </>, <T.Island active="Catalogue" />);
}
/* P6 · editing SO-3456 as cart A: the Carts screen, steppers live, the order goes back to the queue on send */
function ScreenCsEditing({ T }) {
  const { g, pcs, total } = csTotals();
  return frameF(T, <>
    <div style={{ display: 'flex', alignItems: 'center', padding: '0 20px', height: 44 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 26, fontWeight: 500, color: T.ink }}>Carts</span><span style={{ flex: 1 }} /><T.Chip icon="user-plus">New customer</T.Chip></div>
    <div style={{ padding: '6px 12px 0' }}><CsCartChips T={T} cart="A" editing="SO-3456 · editing" /></div>
    <div style={{ margin: '10px 14px 0' }}><CsInfoStrip T={T} icon="pencil"><div style={{ fontWeight: 600 }}>Editing SO-3456</div><div style={{ color: T.ink2, fontSize: 12.5, marginTop: 1 }}>It goes back to the queue when you send</div></CsInfoStrip></div>
    <div style={{ margin: '10px 14px 0', borderRadius: T.rCard, background: T.surface, border: `1px solid ${T.line}`, overflow: 'hidden', boxShadow: T.dark ? 'none' : '0 6px 18px -12px rgba(36,23,18,.25)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px 12px' }}><span style={{ minWidth: 0 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 20, fontWeight: 500, color: T.ink, whiteSpace: 'nowrap' }}>Ramleela Fashion</div><div style={{ fontSize: 12, color: T.ink3, marginTop: 2 }}>Surat · 30 days credit · {g.length} designs · {pcs} pcs</div></span><span style={{ flex: 1 }} /><span style={{ display: 'inline-flex', padding: 3, borderRadius: 999, background: T.bg2, flex: 'none' }}>{['In-cabin', 'WhatsApp'].map((b, i) => <span key={b} className="press" style={{ height: 26, padding: '0 10px', borderRadius: 999, display: 'grid', placeItems: 'center', fontSize: 11.5, background: i === 0 ? T.surface : 'transparent', color: i === 0 ? T.ink : T.ink3 }}>{b}</span>)}</span></div>
      <CartGroups T={T} groups={g} />
    </div>
  </>, <div style={{ position: 'absolute', left: 14, right: 14, bottom: 22, padding: 10, borderRadius: T.rDock, ...glass(T), display: 'flex', alignItems: 'center', gap: 8 }}>
    <span style={{ paddingLeft: 6 }}><div style={{ fontSize: 11, color: T.ink3, whiteSpace: 'nowrap' }}>{pcs} pcs</div><PriceF v={total} size={21} font={T.fontSerif} color={T.ink} dim={T.ink3} style={{ marginTop: 2 }} /></span><span style={{ flex: 1 }} />
    <T.Btn kind="secondary" small style={{ height: 44, padding: '0 13px', fontSize: 13 }}>Discard changes</T.Btn><T.Btn icon="send" small style={{ height: 44, padding: '0 14px', fontSize: 13 }}>Send changes</T.Btn>
  </div>);
}
/* P7 · delete, in words: a short sheet over the queue screen */
function ScreenCsDeleteConfirm({ T }) {
  return <div style={{ position: 'relative', height: '100%' }}><ScreenCsInQueue T={T} />{scrimF(T)}
    <Sheet T={T} h={252} title="Delete SO-3456?" foot={<div style={{ display: 'flex', gap: 8 }}><T.Btn kind="secondary" style={{ flex: 1, height: 48 }}>Keep it</T.Btn><T.Btn icon="trash-2" style={{ flex: 1, height: 48 }}>Delete</T.Btn></div>}>
      <div style={{ fontFamily: T.fontUI, fontSize: 15, lineHeight: 1.5, color: T.ink, padding: '4px 2px 0' }}>It leaves the queue. The customer’s picks come back as cart A, so you can start again.</div>
    </Sheet>
  </div>;
}
/* P8 · three-row header: one scrolling row for lists and quick chips (swiped sideways so the chips show), count as a Meta line in the body */
function ScreenCsGrid3({ T }) {
  return frameF(T, <>
    <CsHeader T={T}><CsMergedRow T={T} side /></CsHeader>
    <CsCount T={T} />
    <CsGridCards T={T} />
  </>, <T.Dock active="Catalogue" cart="A" />);
}
/* P9 · two-row header at rest: identity and search only; the lists-and-chips row is the first row of the grid body.
   P10 · after the first swipe: the row has scrolled away with the grid, so the grid starts about 55 px higher than f-1. */
const CsGrid2Frame = ({ T, away, dock }) => frameF(T, <>
  <CsHeader T={T} />
  <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
    <div style={{ marginTop: away ? -CS_ROW_H : 0 }}><CsMergedRow T={T} side /></div>
    <CsCount T={T} />
    <CsGridCards T={T} />
  </div>
</>, dock || <T.Dock active="Catalogue" cart="A" />);
/* Island per role (decision 2): T.Island's markup with the role's own tabs. Exemplar only; T.Island in final.jsx is untouched. */
const CS_ROLE_NAV = { 'Sale executive': [['house', 'Home'], ['layout-grid', 'Catalogue'], ['users', 'CRM'], ['grip', 'More']], 'Packer': [['house', 'Home'], ['package', 'Dispatch'], ['grip', 'More']] };
const CsRoleIsland = ({ T, role = 'Sale executive', active = 'Catalogue', voice }) => <div style={{ position: 'absolute', left: 14, right: 14, bottom: 22, height: 66, borderRadius: 33, display: 'flex', alignItems: 'center', padding: '0 8px 0 2px', ...glass(T) }}>
  {CS_ROLE_NAV[role].map(([i, l]) => { const on = l === active; return <span key={l} className="press" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, flex: 1, height: 52, borderRadius: T.rCtl, background: on ? T.accentSoft : 'transparent', color: on ? T.accent : T.ink2 }}><Ic name={i} size={20} sw={on ? 1.9 : 1.6} /><span style={{ fontFamily: T.fontUI, fontSize: 10, fontWeight: on ? 600 : 400 }}>{l}</span></span>; })}
  <span className="press" style={{ width: 48, height: 52, display: 'grid', placeItems: 'center', flex: 'none' }}><Orb T={T} on={voice} size={34} /></span>
</div>;
/* P11 · island for a sale executive on the catalogue grid (two-row header, decision 1): Home · Catalogue · CRM · More, bigger targets, no Dispatch or Production */
const ScreenCsRoleIsland = ({ T }) => <CsGrid2Frame T={T} dock={<><T.CartStrip cart="A" /><CsRoleIsland T={T} /></>} />;
const ScreenCsGrid2 = ({ T }) => <CsGrid2Frame T={T} />;
const ScreenCsGrid2Swiped = ({ T }) => <CsGrid2Frame T={T} away />;

/* ═══════════════ web screens ═══════════════ */
/* the Carts main area exactly as WebCarts draws it, with the chips row taking the pressed "+" */
function CsWebCartsMain({ T, plusOn, editing }) {
  const groups = groupsOf(); const pcs = groups.reduce((s, g) => s + g.pcs, 0);
  return <>
    <div style={{ padding: '16px 24px 0' }}><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CsCartChips T={T} cart="A" plusOn={plusOn} editing={editing} /><span style={{ flex: 1 }} /><T.Chip icon="user-plus" outline>New customer</T.Chip></div></div>
    <div style={{ margin: '14px 24px 0', borderRadius: 20, background: T.surface, border: `1px solid ${T.line}`, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px 12px' }}><span><div style={{ fontFamily: T.fontDisplay, fontSize: 22, fontWeight: 500 }}>Ramleela Fashion</div><div style={{ fontSize: 12, color: T.ink3, marginTop: 2 }}>Surat · Platinum · 30 days credit · {groups.length} designs · {pcs} pcs</div></span><span style={{ flex: 1 }} /><T.Chip icon="phone" outline>98152 23366</T.Chip><T.Chip icon="history" outline>Purchase history</T.Chip></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>{groups.map((g, i) => <div key={g.d.code} style={{ borderRight: i % 2 === 0 ? `1px solid ${T.line}` : 0 }}><CartGroups T={T} groups={[g]} photo={64} /></div>)}</div>
    </div>
  </>;
}
const CsPane = ({ T, children, foot, fade }) => <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
  <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', padding: '14px 16px 0', position: 'relative' }}>{children}{fade && <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 44, background: `linear-gradient(180deg, transparent, ${T.surface})`, pointerEvents: 'none' }} />}</div>
  {foot && <div style={{ padding: '12px 16px 16px', borderTop: `1px solid ${T.line}` }}>{foot}</div>}
</div>;
const CsBack = ({ T, children }) => <span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, height: 28, padding: '0 10px 0 6px', borderRadius: 999, background: T.chipBg, fontFamily: T.fontUI, fontSize: 12, color: T.ink2, marginBottom: 12 }}><Ic name="arrow-left" size={13} />{children}</span>;
const CsWebShell = ({ T, plusOn, editing, title, pane }) => <WebShell3 T={T} module="Catalogue" crumb={['Catalogue', 'Carts']} section="Carts" seg={CAT_SEG} active="Carts" mode="Customer mode" tabs={CS_TABS} paneTitle={title} pane={pane}><CsWebCartsMain T={T} plusOn={plusOn} editing={editing} /></WebShell3>;

const WebCsNewCart = ({ T }) => <CsWebShell T={T} plusOn title="New cart" pane={<CsPane T={T} foot={<CsStartBtn T={T} />}><CsNewCartBody T={T} /></CsPane>} />;
const WebCsNewCustomer = ({ T }) => <CsWebShell T={T} plusOn title="New customer" pane={<CsPane T={T} foot={<CsAddBtn T={T} />}><CsBack T={T}>Customers</CsBack><CsNewCustBody T={T} /></CsPane>} />;
const WebCsSubmit = ({ T }) => <CsWebShell T={T} title="Submit cart A" pane={<CsPane T={T} foot={<CsSubmitFoot T={T} />}><CsSubmitBody T={T} /></CsPane>} />;
/* the Sale orders web screen (WebSO3's anatomy) with my queued order picked; the pane holds the strip, the order and Delete · Edit order */
function WebCsInQueue({ T, dialog, state, viewer }) {
  const o = csOrder(); const list = [o, ...ORDERS_F.filter(x => x.status !== 'Cancelled')]; const sum = list.reduce((a, x) => a + x.bill, 0);
  const tabs = [{ icon: 'layout-grid', label: 'Catalogue' }, { icon: 'receipt-text', label: 'Sale orders · Raised', on: true }];
  const pane = <CsPane T={T} fade foot={viewer === 'manager' ? <div style={{ display: 'flex', gap: 8 }}><Hit T={T} icon="printer" size={40} iconSize={18} style={{ background: T.chipBg }} /><Hit T={T} icon="share-2" size={40} iconSize={18} style={{ background: T.chipBg }} /></div> : <CsQueueButtons T={T} />}>{state ? <CsStateCard T={T} viewer={viewer} /> : <CsQueueStrip T={T} />}<div style={{ margin: '12px 2px 10px' }}><div style={{ fontFamily: T.fontDisplay, fontSize: 21, fontWeight: 500, color: T.ink, lineHeight: 1.1 }}>{o.c.name}</div><Meta T={T} style={{ display: 'block', marginTop: 3 }}>{o.c.city} · {o.c.tier} · {o.pcs} pcs · {o.designs} designs</Meta></div><OrderLines T={T} o={o} lines={csLines()} /></CsPane>;
  return <WebShell3 T={T} module="Catalogue" crumb={['Catalogue', 'Sale orders', 'Raised']} section="Sale orders" seg={CAT_SEG} active="Sale orders" mode="Customer mode" tabs={tabs} paneTitle={o.no} pane={pane}>
    <ViewTabs T={T} tabs={SO_TABS2.map(([t, n]) => t === 'Raised' ? [t, n + 1] : [t, n])} active="Raised" extra={[['Analytics', null, 'bar-chart-3']]} right={<span style={{ display: 'inline-flex', padding: 3, borderRadius: 999, background: T.bg2 }}>{[['layout-list', 'cards'], ['table-2', 'table']].map(([ic, v]) => <span key={v} className="press" style={{ width: 34, height: 26, borderRadius: 999, display: 'grid', placeItems: 'center', background: v === 'cards' ? T.surface : 'transparent', color: v === 'cards' ? T.ink : T.ink3 }}><Ic name={ic} size={15} /></span>)}</span>} />
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 24px 0' }}><T.Chip icon="search" outline>Order, customer, agent</T.Chip><T.Chip icon="calendar" x outline>This month</T.Chip><T.Chip icon="arrow-down-up" outline>Newest</T.Chip><span style={{ flex: 1 }} /><span style={{ fontSize: 12, color: T.ink3 }}>{list.length} orders · {money(sum)}</span><Hit T={T} icon="printer" size={34} iconSize={16} style={{ background: T.chipBg }} /><Hit T={T} icon="download" size={34} iconSize={16} style={{ background: T.chipBg }} /></div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 12, padding: '14px 24px' }}>{list.map((x, i) => <CsSOCard key={x.no} T={T} x={x} first={i === 0} />)}</div>
    {dialog && <><div style={{ position: 'absolute', inset: 0, background: T.dark ? 'rgba(0,0,0,.5)' : 'rgba(36,23,18,.30)', backdropFilter: 'blur(3px)', zIndex: 5 }} />{dialog}</>}
  </WebShell3>;
}
const WebCsOrderState = ({ T }) => <WebCsInQueue T={T} state />;
const WebCsOrderStateMgr = ({ T }) => <WebCsInQueue T={T} state viewer="manager" />;
/* delete, in words: a centred dialog over nw-12 (the Dialog pattern of the dispatch web drafts) */
const WebCsDelete = ({ T }) => <WebCsInQueue T={T} dialog={<div style={{ position: 'absolute', left: '50%', top: '42%', transform: 'translate(-50%,-50%)', width: 380, padding: 18, borderRadius: 18, background: T.surface, border: `1px solid ${T.line2}`, boxShadow: '0 30px 60px -20px rgba(0,0,0,.5)', zIndex: 6 }}>
  <div style={{ fontFamily: T.fontDisplay, fontSize: 22, fontWeight: 500, color: T.ink }}>Delete SO-3456?</div>
  <div style={{ fontFamily: T.fontUI, fontSize: 14, lineHeight: 1.5, color: T.ink2, marginTop: 6 }}>It leaves the queue. The customer’s picks come back as cart A, so you can start again.</div>
  <div style={{ display: 'flex', gap: 8, marginTop: 16, justifyContent: 'flex-end' }}><T.Btn kind="secondary" style={{ height: 44 }}>Keep it</T.Btn><T.Btn icon="trash-2" style={{ height: 44 }}>Delete</T.Btn></div>
</div>} />;
/* editing SO-3456 as cart A: the Carts screen with the chip reading "SO-3456 · editing"; the pane carries the strip, the total and Discard changes · Send changes */
function WebCsEditing({ T }) {
  const { pcs, total } = csTotals();
  const pane = <CsPane T={T} foot={<div style={{ display: 'flex', gap: 8 }}><T.Btn kind="secondary" style={{ height: 48 }}>Discard changes</T.Btn><T.Btn icon="send" style={{ flex: 1, height: 48 }}>Send changes</T.Btn></div>}>
    <CsInfoStrip T={T} icon="pencil"><div style={{ fontWeight: 600 }}>Editing SO-3456</div><div style={{ color: T.ink2, fontSize: 12.5, marginTop: 1 }}>It goes back to the queue when you send</div></CsInfoStrip>
    <div style={{ margin: '14px 2px 0' }}><div style={{ fontFamily: T.fontDisplay, fontSize: 21, fontWeight: 500, color: T.ink, lineHeight: 1.1 }}>Ramleela Fashion</div><Meta T={T} style={{ display: 'block', marginTop: 3 }}>Surat · {pcs} pcs · due 20 d</Meta><div style={{ marginTop: 10 }}><PriceF v={total} size={26} font={T.fontSerif} color={T.ink} dim={T.ink3} /></div></div>
    <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${T.line}`, overflow: 'hidden' }}><CsDesigns T={T} /></div>
  </CsPane>;
  return <CsWebShell T={T} editing="SO-3456 · editing" title="SO-3456 · editing" pane={pane} />;
}

/* ═══════════════ registration ═══════════════ */
(window.NEW_DRAFT_MODULES = window.NEW_DRAFT_MODULES || []).push({ module: 'Catalogue · sell flow', note: 'the screens the sell flow was missing: new cart and customer, submit (never blocked), the order in the approval queue with edit and delete; two calmer grid headers for compare (13 Oct, review 2)', subs: [
  { name: 'New cart & customer', flow: 'new cart → recent or new customer → start',
    phone: [['Carts · new cart sheet', ScreenCsNewCart], ['Carts · new customer sheet', ScreenCsNewCustomer]],
    web: [['Carts · new cart, customer picker in the pane', WebCsNewCart], ['Carts · new customer in the pane', WebCsNewCustomer]] },
  { name: 'Submit for approval', flow: 'summary → sent → in the queue → editing → delete, in words',
    phone: [['Cart · submit for approval sheet', ScreenCsSubmit], ['Cart · sent for approval', ScreenCsSubmitted], ['Sale orders · my order in the queue, edit or delete', ScreenCsInQueue], ['Sale orders · editing SO-3456 as cart A', ScreenCsEditing], ['Sale orders · delete, in words', ScreenCsDeleteConfirm], ['Sale orders · opened, in the queue: state and the link to Approvals (compare final f-18)', ScreenCsOrderState], ['Sale orders · opened, in the queue · manager (flags, link to Approvals)', ScreenCsOrderStateMgr], ['Sale executive · queue list, RAISED and IN QUEUE, no flags', ScreenCsQueueList]],
    web: [['Cart · submit for approval in the pane', WebCsSubmit], ['Sale orders · my order in the queue, Edit and Delete in the pane', WebCsInQueue], ['Sale orders · editing SO-3456 as cart A', WebCsEditing], ['Sale orders · delete, in words', WebCsDelete], ['Sale orders · opened, in the queue: state and the link to Approvals (compare final f-18 twin)', WebCsOrderState], ['Sale orders · opened, in the queue · manager (flags, link to Approvals)', WebCsOrderStateMgr]] },
  { name: 'Calmer grid header', flow: 'three rows → two rows → two rows after the first swipe, compare with the final',
    phone: [['Grid · three-row header (compare with final f-1)', ScreenCsGrid3], ['Grid · two-row header, lists scroll with the grid (compare with f-1)', ScreenCsGrid2], ['Grid · two-row header, after the first swipe', ScreenCsGrid2Swiped], ['Grid · island for a sale executive: Home · Catalogue · CRM · More (decision 2 exemplar)', ScreenCsRoleIsland]],
    web: [] },
] });

Object.assign(window, { CS_RECENT, CS_NEW, CS_CUST, CS_NOTE, CS_TABS, CS_QUICK, CS_ROW_H, csTotals, csOrder, csLines, CsSearch, CsSeg, CsChoice, CsField, CsOptRow, CsCustRow, CsLabel, CsDesigns, CsCartChips, CsNewCartBody, CsStartBtn, CsNewCustBody, CsAddBtn, CsSubmitBody, CsSubmitFoot, CsInfoStrip, CsQueueStrip, CsQueueButtons, CsSentCard, CsMergedRow, CsFilterCount, CsHeader, CsCount, CsGridCards, CsGrid2Frame, CsOverCarts, CsWebCartsMain, CsPane, CsBack, CsWebShell,
  ScreenCsNewCart, ScreenCsNewCustomer, ScreenCsSubmit, ScreenCsSubmitted, ScreenCsInQueue, ScreenCsEditing, ScreenCsDeleteConfirm, ScreenCsOrderState, ScreenCsOrderStateMgr, CsOrderStateScreen, ScreenCsQueueList, WebCsOrderState, WebCsOrderStateMgr, CsStateCard, CsFlags, CS_FLAGS, ScreenCsGrid3, ScreenCsGrid2, ScreenCsGrid2Swiped, ScreenCsRoleIsland, CsRoleIsland, CS_ROLE_NAV, WebCsNewCart, WebCsNewCustomer, WebCsSubmit, WebCsInQueue, WebCsDelete, WebCsEditing, CsQueuePill, CsSOCard });
