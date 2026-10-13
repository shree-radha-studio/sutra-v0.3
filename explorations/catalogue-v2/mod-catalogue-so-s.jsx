/* NEW DRAFTS · Catalogue · sale orders in the DESK density (13 Oct 2026, review 2 §1.6, plans/sale-orders-structured.md §1–2,
   plans/desk-density.md). For the Compare view beside the finals f-15 (cards, phone) and w-9 (table, web).
   The chrome is the finals' own and is not touched: frameF + SOHeader + T.Island on the phone, WebShell + ViewTabs + the
   toolbar chips + RightPane on the web. Desk changes only the content: 4px boxes, 3px tags and thumbs, 1px rules, no
   shadow, no zebra, 44px web / 56px phone rows, 11px uppercase heads, numbers right-aligned and tabular, status as an
   outlined word, colour only for danger and warn. The one maroon line is the active view tab; content carries none.
   ₹ stays: these are salesperson / manager screens. Every identifier is prefixed SoS. */

/* ── Desk primitives (own copies: the Dispatch Ds* helpers do not load on the catalogue page) ─────────────────── */
const SoSUp = (T, extra) => ({ fontFamily: T.fontUI, fontSize: 11, letterSpacing: '.07em', textTransform: 'uppercase', color: T.ink3, whiteSpace: 'nowrap', ...extra });
const SoSNumS = (T, extra) => ({ fontFamily: T.fontUI, fontSize: 13, color: T.ink, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap', textAlign: 'right', ...extra });
/* status as a word: outlined, 3px, uppercase; tone danger / warn colours border and text only */
const SoSTag = ({ T, tone, h = 20, children, style }) => { const c = tone === 'danger' ? T.danger : tone === 'warn' ? T.warn : T.ink2; return <span style={{ display: 'inline-flex', alignItems: 'center', height: h, padding: '0 6px', borderRadius: 3, border: `1px solid ${tone ? c : T.line2}`, color: c, fontFamily: T.fontUI, fontSize: 10, fontWeight: 600, letterSpacing: '.07em', textTransform: 'uppercase', whiteSpace: 'nowrap', flex: 'none', lineHeight: 1, ...style }}>{children}</span>; };
/* square outlined icon button inside content (the chrome keeps its round Hit) */
const SoSIcon = ({ T, icon, s = 36 }) => <span className="press" style={{ width: s, height: s, borderRadius: 3, border: `1px solid ${T.line2}`, display: 'grid', placeItems: 'center', color: T.ink, flex: 'none' }}><Ic name={icon} size={15} /></span>;
const SoSBtn = ({ T, icon, children, h = 36, style }) => <span className="press" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7, height: h, padding: '0 12px', borderRadius: 3, border: `1px solid ${T.ink}`, color: T.ink, fontFamily: T.fontUI, fontSize: 12.5, fontWeight: 500, whiteSpace: 'nowrap', ...style }}>{icon && <Ic name={icon} size={14} />}{children}</span>;
/* photo beside every design number: 4:5, 3px */
const SoSThumb = ({ T, code, w = 28, h = 35 }) => <Thumb T={T} d={XD.byCode[code]} w={w} h={h} r={3} />;
const SoSDesign = ({ T, code, w, h, size = 16 }) => <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, flex: 'none' }}><SoSThumb T={T} code={code} w={w} h={h} /><span style={{ fontFamily: T.fontDisplay, fontSize: size, fontWeight: 600, color: T.ink, fontVariantNumeric: 'tabular-nums' }}>{code}</span></span>;

/* ── data: the finals' raised orders plus the rest of the Raised book, so the desk table has a desk's worth of rows ── */
const SOS_C = i => XD.customers[i % XD.customers.length];
/* no, customer, date, pcs, bill, agent-days waiting, flag [text, tone], designs (codes) */
const SOS_RAISED = [
  ['SO-3455', 0, '10/09/26', 5, 25975, 1, null, ['2798', '6002', '3661']],
  ['SO-3451', 3, '09/09/26', 9, 39955, 2, ['Over the line', 'danger'], ['2798', '1457']],
  ['SO-3448', 0, '08/09/26', 4, 19980, 3, ['Waiting 3 d', 'warn'], ['6002', '2006']],
  ['SO-3446', 2, '08/09/26', 12, 52940, 3, ['Waiting 3 d', 'warn'], ['3661', '1243', '2798', '6002']],
  ['SO-3444', 5, '07/09/26', 6, 23970, 4, ['2 bills overdue', 'danger'], ['1457', '1243']],
  ['SO-3441', 1, '07/09/26', 3, 14985, 4, null, ['2006']],
  ['SO-3438', 4, '06/09/26', 8, 33960, 5, null, ['2798', '3661', 'D9107']],
  ['SO-3436', 2, '05/09/26', 10, 44950, 5, null, ['6002', '2006', '1457']],
  ['SO-3432', 3, '04/09/26', 2, 9990, 6, null, ['2798']],
  ['SO-3429', 1, '03/09/26', 7, 29965, 7, null, ['1243', '3661']],
  ['SO-3427', 5, '03/09/26', 4, 21980, 7, null, ['3661', '2006']],
].map(([no, ci, date, pcs, bill, wait, flag, codes]) => ({ no, c: SOS_C(ci), date, pcs, bill, wait, flag, codes, designs: codes.length }));
const SOS_TABS = [['Raised', 11], ['Approved', 9], ['Dispatched', 24], ['Cancelled', 1], ['Returns', 2]];
/* SO-3455's lines: code, [colour, qty] */
const SOS_LINES = [['2798', [['Sky', 2], ['Purple', 1]]], ['6002', [['Lilac', 1]]], ['3661', [['Peach', 1]]]];

/* ── phone · cards, Desk ───────────────────────────────────────────────────────────────────────────────────────────── */
function SoSCard({ T, o }) {
  const row = { display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px' };
  return <div style={{ borderRadius: 4, border: `1px solid ${T.line2}`, background: T.surface }}>
    <div style={{ ...row, height: 44, borderBottom: `1px solid ${T.line}` }}><span style={{ fontFamily: T.fontMono, fontSize: 13, fontWeight: 600, color: T.ink }}>{o.no}</span><span style={{ fontSize: 11.5, color: T.ink3, fontVariantNumeric: 'tabular-nums' }}>{o.date}</span><span style={{ flex: 1 }} />{o.flag && <SoSTag T={T} tone={o.flag[1]} h={24}>{o.flag[0]}</SoSTag>}<SoSTag T={T} h={24}>Raised</SoSTag></div>
    <div style={{ padding: '14px 16px 14px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 19, fontWeight: 600, color: T.ink, flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{o.c.name}</span><PriceF v={o.bill} size={19} font={T.fontSerif} color={T.ink} dim={T.ink3} weight={600} /></div>
      <div style={{ fontSize: 12.5, color: T.ink3, marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{o.c.city}{o.c.market ? ' · ' + o.c.market : ''} · {o.c.tier} · <span style={{ color: T.ink2, fontVariantNumeric: 'tabular-nums' }}>{o.pcs} pcs · {o.designs} designs</span></div>
      <div style={{ display: 'flex', gap: 14, marginTop: 12, overflow: 'hidden' }}>{o.codes.map(code => <SoSDesign key={code} T={T} code={code} w={28} h={35} size={15} />)}</div>
    </div>
    <div style={{ ...row, height: 52, borderTop: `1px solid ${T.line}` }}><Ic name="phone" size={13} color={T.ink3} /><span style={{ fontFamily: T.fontMono, fontSize: 12, color: T.ink2, whiteSpace: 'nowrap', flex: 'none' }}>{o.c.phone}</span><span style={{ width: 1, height: 14, background: T.line2 }} /><Ic name="user" size={13} color={T.ink3} /><span style={{ fontSize: 12.5, color: T.ink2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>{o.c.broker}</span><span style={{ flex: 1 }} /><SoSIcon T={T} icon="printer" /><SoSIcon T={T} icon="share-2" /></div>
  </div>;
}
function ScreenSoSCards({ T }) {
  const list = SOS_RAISED.slice(0, 3);
  return frameF(T, <>
    <div style={{ flex: 'none' }}><SOHeader T={T} tab="Raised" view="cards" /></div>
    <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, padding: '14px 16px 10px' }}><span style={SoSUp(T)}>Raised</span><span style={{ fontSize: 12, color: T.ink2, fontVariantNumeric: 'tabular-nums' }}>3 orders · 18 pcs · ₹85,910</span><span style={{ flex: 1 }} /><span style={{ fontSize: 11.5, color: T.ink3 }}>newest first</span></div>
    <div style={{ padding: '0 16px 120px', display: 'flex', flexDirection: 'column', gap: 14 }}>{list.map(o => <SoSCard key={o.no} T={T} o={o} />)}</div>
    </div>
  </>, <T.Island active="Catalogue" />);
}

/* ── web · table with the order pane, Desk ─────────────────────────────────────────────────────────────────────────── */
/* same ViewTabs and toolbar chips as SOWebHead (the chrome stays Cabin); only the counts are this book's */
function SoSWebHead({ T }) {
  return <>
    <ViewTabs T={T} tabs={SOS_TABS} active="Raised" extra={[['Analytics', null, 'bar-chart-3']]} right={<span style={{ display: 'inline-flex', padding: 3, borderRadius: 999, background: T.bg2 }}>{[['layout-list', 'cards'], ['table-2', 'table']].map(([ic, v]) => <span key={v} className="press" style={{ width: 34, height: 26, borderRadius: 999, display: 'grid', placeItems: 'center', background: v === 'table' ? T.surface : 'transparent', color: v === 'table' ? T.ink : T.ink3 }}><Ic name={ic} size={15} /></span>)}</span>} />
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 24px 0' }}><T.Chip icon="search" outline>Order, customer, agent</T.Chip><T.Chip icon="calendar" x outline>This month</T.Chip><T.Chip icon="group" outline>Group by</T.Chip><T.Chip icon="columns-3" outline>Columns</T.Chip><span style={{ flex: 1 }} /><Hit T={T} icon="printer" size={34} iconSize={16} style={{ background: T.chipBg }} /><Hit T={T} icon="download" size={34} iconSize={16} style={{ background: T.chipBg }} /></div>
  </>;
}
const SOS_COLS = [['Order', 90], ['Customer', null], ['Date', 64, true], ['Pcs', 48, true], ['Bill', 100, true], ['Status', 200]];
function SoSTable({ T, rows, on, more = 0 }) {
  const cell = (w, right, extra) => ({ width: w || undefined, flex: w ? 'none' : 1, minWidth: 0, textAlign: right ? 'right' : 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', ...extra });
  const pcs = SOS_RAISED.reduce((s, o) => s + o.pcs, 0), bill = SOS_RAISED.reduce((s, o) => s + o.bill, 0);
  return <div style={{ borderRadius: 4, border: `1px solid ${T.line2}`, background: T.surface, overflow: 'hidden' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 24, height: 38, padding: '0 20px 0 20px', background: T.surface2, borderBottom: `1px solid ${T.line2}` }}>{SOS_COLS.map(([l, w, r]) => <span key={l} style={{ ...cell(w, r), ...SoSUp(T), display: 'inline-flex', alignItems: 'center', justifyContent: r ? 'flex-end' : 'flex-start', gap: 4 }}>{l}{l === 'Date' && <Ic name="arrow-down" size={11} />}</span>)}</div>
    {rows.map(o => { const sel = o.no === on; return <div key={o.no} className="press" style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 24, height: 44, padding: '0 20px 0 20px', borderBottom: `1px solid ${T.line}`, background: sel ? T.bg2 : 'transparent', fontFamily: T.fontUI, fontSize: 13, color: T.ink2 }}>
      {sel && <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2, background: T.ink }} />}
      <span style={cell(90, false, { fontFamily: T.fontMono, fontSize: 12.5, fontWeight: 600, color: T.ink })}>{o.no}</span>
      <span style={cell(null, false, { color: T.ink, fontWeight: sel ? 600 : 500 })}>{o.c.name}</span>
      <span style={cell(64, true, { fontVariantNumeric: 'tabular-nums' })}>{o.date.slice(0, 5)}</span>
      <span style={{ ...cell(48, true), ...SoSNumS(T) }}>{o.pcs}</span>
      <span style={{ ...cell(100, true), ...SoSNumS(T, { fontWeight: 600 }) }}>{money(o.bill)}</span>
      <span style={{ ...cell(200), display: 'flex', gap: 6, alignItems: 'center' }}><SoSTag T={T}>Raised</SoSTag>{o.flag && <SoSTag T={T} tone={o.flag[1]}>{o.flag[0]}</SoSTag>}</span>
    </div>; })}
    <div style={{ display: 'flex', alignItems: 'center', gap: 24, height: 44, padding: '0 20px 0 20px', background: T.surface2 }}><span style={{ flex: 1, fontSize: 12, color: T.ink3 }}>{rows.length + more} orders{more ? ` · ${more} more below` : ''} · 2 flagged, 2 waiting</span><span style={{ ...SoSNumS(T, { fontWeight: 600 }), width: 48 }}>{pcs}</span><span style={{ ...SoSNumS(T, { fontWeight: 600 }), width: 100 }}>{money(bill)}</span><span style={{ width: 200 }} /></div>
  </div>;
}
/* the order pane: ruled facts, lines with the photo beside every design number, total, quiet actions */
function SoSOrderPane({ T, o }) {
  const fact = (k, v, tone) => <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 10, height: 34, borderTop: `1px solid ${T.line}`, fontSize: 12.5 }}><span style={{ width: 96, flex: 'none', color: T.ink3 }}>{k}</span><span style={{ flex: 1, minWidth: 0, color: tone || T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontVariantNumeric: 'tabular-nums' }}>{v}</span></div>;
  const lines = SOS_LINES.flatMap(([code, cols]) => cols.map(([col, q], i) => ({ code, col, q, first: i === 0, d: XD.byCode[code] })));
  const total = lines.reduce((s, l) => s + l.q * l.d.price, 0);
  return <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
    <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', padding: '16px 20px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><SoSTag T={T}>Raised</SoSTag><span style={{ fontSize: 12, color: T.ink3 }}>{o.date} · waiting {o.wait} d</span></div>
      <div style={{ fontFamily: T.fontDisplay, fontSize: 21, fontWeight: 600, color: T.ink, marginTop: 8, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{o.c.name}</div>
      <div style={{ fontSize: 12, color: T.ink3, marginTop: 1 }}>{o.c.city} · {o.c.market} · {o.c.tier} · score {o.c.score}</div>
      <div style={{ marginTop: 10, borderBottom: `1px solid ${T.line}` }}>{[['Phone', o.c.phone], ['Agent', `${o.c.broker} · ${agencyOf(o.c)}`], ['Credit', '30 days · ₹1.2L limit · due 20 d']].map(([k, v]) => fact(k, v))}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 30, marginTop: 14, ...SoSUp(T) }}><span style={{ flex: 1 }}>Design · colour</span><span style={{ width: 30, textAlign: 'right' }}>Qty</span><span style={{ width: 70, textAlign: 'right' }}>Amount</span></div>
      {lines.map((l, i) => <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, height: l.first ? 52 : 28, borderTop: `1px solid ${l.first ? T.line : 'transparent'}`, fontSize: 12.5 }}>
        {l.first ? <SoSDesign T={T} code={l.code} w={32} h={40} /> : <span style={{ width: 32 }} />}
        <span style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 6, color: T.ink2, paddingLeft: l.first ? 2 : 0 }}><span style={{ width: 3, height: 12, borderRadius: 1, background: XD.cols[l.col] }} />{l.col}</span>
        <span style={{ ...SoSNumS(T, { fontSize: 12.5 }), width: 30 }}>{l.q}</span><span style={{ ...SoSNumS(T, { fontSize: 12.5 }), width: 70 }}>{money(l.q * l.d.price)}</span>
      </div>)}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, height: 44, paddingTop: 10, borderTop: `1px solid ${T.line2}` }}><span style={{ fontSize: 12, color: T.ink3, fontVariantNumeric: 'tabular-nums' }}>{o.pcs} pcs · {o.designs} designs · GST extra</span><span style={{ flex: 1 }} /><PriceF v={total} size={21} font={T.fontSerif} color={T.ink} dim={T.ink3} weight={600} /></div>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 20px 16px', borderTop: `1px solid ${T.line}` }}><SoSIcon T={T} icon="printer" /><SoSIcon T={T} icon="share-2" /><span style={{ flex: 1 }} /><SoSBtn T={T} icon="pencil">Edit</SoSBtn><SoSBtn T={T} icon="arrow-up-right">Approval card</SoSBtn></div>
  </div>;
}
function WebSoSTable({ T }) {
  const o = SOS_RAISED[0];
  return <WebShell T={T} title="Sale orders" crumb="Catalogue · Sale orders · Raised · Table" tab="Sale orders · Raised · table" paneTitle={o.no} pane={<SoSOrderPane T={T} o={o} />}>
    <SoSWebHead T={T} />
    <div style={{ padding: '16px 24px 20px', minHeight: 0, overflow: 'hidden' }}><SoSTable T={T} rows={SOS_RAISED.slice(0, 8)} more={SOS_RAISED.length - 8} on={o.no} /></div>
  </WebShell>;
}

Object.assign(window, { SoSUp, SoSNumS, SoSTag, SoSIcon, SoSBtn, SoSThumb, SoSDesign, SOS_RAISED, SOS_TABS, SOS_LINES, SOS_COLS, SoSCard, ScreenSoSCards, SoSWebHead, SoSTable, SoSOrderPane, WebSoSTable });

(window.NEW_DRAFT_MODULES = window.NEW_DRAFT_MODULES || []).push({ module: 'Catalogue · sale orders · structured', note: 'the Desk density for compare with f-15 / w-9: same chrome, ruled content, status as words (review 2 §1.6, 13 Oct)', subs: [
  { name: 'Sale orders · Desk', flow: 'cards (phone) → table with the order pane (web)', phone: [['Sale orders · cards, Desk density (more air)', ScreenSoSCards]], web: [['Sale orders · table with the order pane, Desk density, more air · manager (flags)', WebSoSTable]] },
] });
