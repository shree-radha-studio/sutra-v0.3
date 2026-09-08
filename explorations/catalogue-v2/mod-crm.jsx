/* NEW DRAFTS · CRM (8 Sep 2026) · shared data, components and the phone screens. Plan: plans/crm.md.
   Web screens live in mod-crm-web.jsx, which also registers the module on window.NEW_DRAFT_MODULES.
   Everything renders through the theme object T (FINAL / FINALD). Names are prefixed Cr… / CRM_ to stay clear of the
   other module files, which share one script scope. Reuses: frameF, scrimF, Hit, Ic, glass, veil, PriceF, Pill, Mono,
   Num, Meta, Thumb, Dot, CallChip, Monogram, Sect, OutBtn, Sheet, Body, DSearch, LineG, Donut, money, agencyOf.
   Photos: the project has four sample photographs; the other tiles reuse them with a colour shift and a different
   crop as stand-ins until Studio › Image upload centre has real pictures. */

/* ── customers with their CRM facts (scores, taste, tags, step on the journey) ── */
const CRM_STEPS = ['Reach out', 'Showcase', 'Order', 'Confirm', 'Done'];
const CRM_LISTS = [['Today’s to-do', 'default'], ['Refill due', 'default'], ['What worked', 'default'], ['New samples', 'default'], ['Cold revival', 'default'], ['Hot', 'default'], ['Delhi picks', 'custom'], ['Wedding ’26', 'custom']];
const CRM_C = XD.customers.map((c, i) => ({ ...c,
  heat: ['hot', 'warm', 'hot', 'warm', 'cold', 'hot'][i], seg: ['VIP', 'VIP', 'Mid', 'VIP', 'New', 'VIP'][i],
  pay: [82, 74, 61, 88, 70, 91][i], gr: [4, 6, 12, 3, 9, 2][i], taste: [[55, 35, 10], [40, 45, 15], [20, 50, 30], [60, 30, 10], [10, 45, 45], [70, 25, 5]][i],
  bands: [['₹4–6k', '₹6–9k'], ['₹4–6k', '₹3–4k'], ['₹3–4k', '₹4–6k'], ['₹6–9k', '₹9k+'], ['₹1–3k', '₹3–4k'], ['₹6–9k', '₹9k+']][i],
  cols: [['Sky', 'Peach', 'Lilac', 'Blush'], ['Lilac', 'Lavender', 'Purple', 'Rani'], ['Mehroon', 'Peach', 'Rani', 'White'], ['Firozi', 'Bottle', 'Pista', 'Sky'], ['Lavender', 'White', 'Lemon', 'Peach'], ['Blush', 'Purple', 'Rani', 'Mehroon']][i],
  cats: [['Lehenga', 'Plazo set'], ['Lehenga', 'Saree'], ['Crop top', 'Saree'], ['Crop top', 'Saree'], ['Saree', 'Blouse'], ['Lehenga', 'Plazo set']][i],
  tags: [['Refill regular', 'Bridal season', 'Delhi picks'], ['Sample first', 'Slow payer'], ['Price sensitive', 'Clearance-friendly'], ['High-tier appetite', 'Wedding ’26'], ['New this FY', 'Trial'], ['High-tier appetite', 'Bridal season', 'Direct']][i],
  step: [1, 0, 2, 0, 0, 3][i], next: [0, -2, 0, 1, -5, 3][i], snoozed: [false, false, false, false, true, false][i], chan: ['message-circle', 'phone', 'message-circle', 'phone', 'message-circle', 'message-circle'][i], att: [6, 0, 3, 4, 0, 8][i],
  fy: [1868000, 1210000, 640000, 1420000, 210000, 2140000][i], open: [24975, 31965, 17980, 39955, 26970, 58940][i], over: [0, 31965, 17980, 0, 26970, 0][i], credit: [200000, 150000, 100000, 250000, 60000, 300000][i], last: ['10/09/26', '26/08/26', '28/08/26', '09/09/26', '21/08/26', '02/09/26'][i],
  wa: ['Preeti · SRS group', 'Rangoli · SRS group', 'Ambika · SRS group', 'AV · SRS group', 'Aneri · SRS group', 'Nalli · SRS group'][i],
}));
const crC = id => CRM_C.find(c => c.id === id);
const HEAT = { hot: 'danger', warm: 'warn', cold: 'blue' };
const CRM_SUB_P = [['list-checks', 'Follow-ups', 12], ['send', 'Share', null], ['wallet', 'Payments', 9], ['users', 'Customers', 148], ['git-branch', 'Journeys', null]];

/* ── the picker catalogue: 24 tiles. Ten real photographs (four samples from the design system, six product shots
   the owner sent on 8 Sep, kept in assets/crm/); the other tiles reuse them with a colour shift and another crop. ── */
const CRM_A = 'assets/crm/';
const CRM_PH = { a: XD.byCode['2798'].src, b: XD.byCode['6002'].src, c: XD.byCode['2006'].src, d: XD.byCode['4566'].src, e: CRM_A + '8321.jpg', f: CRM_A + '8111.jpg', g: CRM_A + '8477.jpg', h: CRM_A + '8190.jpg', i: CRM_A + '8337.jpg', j: CRM_A + '8433.jpg' };
const mk = (code, price, ph, hue, pos, cat, reason, tag) => ({ code, price, src: CRM_PH[ph], hue, pos, cat, reason, tag });
const CRM_REC = [
  mk('8337', 12995, 'i', 0, '50% 12%', 'Lehenga', 'Taste match', 'High growth'), mk('2798', 4995, 'a', 0, '50% 30%', 'Plazo set', 'Refill'), mk('8111', 8995, 'f', 0, '50% 12%', 'Lehenga', 'What worked'),
  mk('6002', 4995, 'b', 0, '50% 25%', 'Lehenga', 'What worked'), mk('8190', 9495, 'h', 0, '50% 10%', 'Gown', 'Colour match', 'Priority sale'), mk('5514', 6995, 'j', 0, '50% 12%', 'Lehenga', 'State match'),
  mk('8477', 5495, 'g', 0, '50% 14%', 'Sharara', 'Price match'), mk('2006', 4995, 'c', 0, '50% 30%', 'Saree', 'State match'), mk('8321', 11495, 'e', 0, '50% 12%', 'Lehenga', 'Taste match'),
  mk('4410', 4995, 'c', -30, '50% 60%', 'Saree', 'Colour match', 'High growth'), mk('7781', 8495, 'f', 35, '50% 40%', 'Lehenga', 'Price match'), mk('3355', 5495, 'g', -40, '50% 50%', 'Sharara', 'Refill'),
];
const CRM_CAT = [
  mk('8433', 10995, 'j', 0, '50% 12%', 'Lehenga'), mk('9021', 6495, 'h', 30, '50% 40%', 'Gown'), mk('7126', 4995, 'e', 0, '50% 55%', 'Lehenga'), mk('4566', null, 'd', 0, '50% 30%', 'Lehenga'),
  mk('1188', 5995, 'i', -35, '50% 55%', 'Lehenga'), mk('6640', 8995, 'f', -30, '50% 45%', 'Lehenga'), mk('3007', 4495, 'a', 25, '50% 55%', 'Plazo set'), mk('5290', 6995, 'g', -45, '50% 45%', 'Sharara'),
  mk('2415', 3995, 'c', 40, '50% 40%', 'Saree'), mk('8130', 7995, 'j', 35, '50% 50%', 'Lehenga'), mk('4702', 4995, 'b', 45, '50% 40%', 'Lehenga'), mk('6018', 5495, 'h', -25, '50% 55%', 'Gown'),
];
const crTile = code => CRM_REC.find(t => t.code === code) || CRM_CAT.find(t => t.code === code) || { ...CRM_CAT[0], code };
const CRM_SEL = ['8337', '2798', '8111', '8190', '8433'];
const crValue = sel => sel.reduce((s, c) => s + ((crTile(c) || {}).price || 0), 0);

/* ── small shared bits ── */
/* score ring: value in the display face inside a thin ring */
const Gauge = ({ T, v, label, s = 44, tone }) => { const c = tone ? (tone === 'ok' ? T.ok : tone === 'warn' ? T.warn : T.danger) : (v >= 75 ? T.ok : v >= 50 ? T.warn : T.danger); const r = (s - 4) / 2, C = 2 * Math.PI * r; return <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 3, flex: 'none' }}><span style={{ position: 'relative', width: s, height: s, display: 'grid', placeItems: 'center' }}><svg width={s} height={s} style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}><circle cx={s / 2} cy={s / 2} r={r} fill="none" stroke={T.chipBg} strokeWidth={3} /><circle cx={s / 2} cy={s / 2} r={r} fill="none" stroke={c} strokeWidth={3} strokeDasharray={`${C * v / 100} ${C}`} strokeLinecap="round" /></svg><span style={{ fontFamily: T.fontDisplay, fontSize: s * .38, fontWeight: 600, color: T.ink, fontVariantNumeric: 'tabular-nums' }}>{v}</span></span>{label && <span style={{ fontFamily: T.fontUI, fontSize: 9.5, color: T.ink3, whiteSpace: 'nowrap' }}>{label}</span>}</span>; };
const HeatDot = ({ T, h, s = 8 }) => <span title={h} style={{ width: s, height: s, borderRadius: s / 2, background: T[HEAT[h]], boxShadow: `0 0 0 2px ${T[HEAT[h]]}33`, flex: 'none' }} />;
const NextPill = ({ T, c, small }) => c.snoozed ? <Pill T={T} tone="blue" small={small}>Snoozed · 14 d</Pill> : c.next < 0 ? <Pill T={T} tone="warn" fill small={small}>{-c.next} d overdue</Pill> : c.next === 0 ? <Pill T={T} tone="accent" small={small}>Today</Pill> : <Pill T={T} small={small}>in {c.next} d</Pill>;
/* taste vector: three independent bars High / Mid / Low tier appetite */
const Taste = ({ T, t, wide }) => <div style={{ display: 'grid', gridTemplateColumns: wide ? 'repeat(3, 1fr)' : '1fr', gap: wide ? 8 : 3 }}>{['High', 'Mid', 'Low'].map((k, i) => <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: T.fontUI, fontSize: 10.5, color: T.ink3 }}><span style={{ width: 26 }}>{k}</span><span style={{ flex: 1, height: 5, borderRadius: 3, background: T.chipBg, overflow: 'hidden' }}><span style={{ display: 'block', width: t[i] + '%', height: 5, background: i === 0 ? T.accent : i === 1 ? T.ink2 : T.ink3 }} /></span><b style={{ width: 26, textAlign: 'right', color: T.ink, fontVariantNumeric: 'tabular-nums' }}>{t[i]}%</b></div>)}</div>;
const CrTag = ({ T, children, tone }) => <span style={{ display: 'inline-flex', alignItems: 'center', height: 20, padding: '0 7px', borderRadius: 999, background: tone === 'accent' ? T.accentSoft : T.chipBg, color: tone === 'accent' ? T.accent : T.ink2, fontFamily: T.fontUI, fontSize: 10.5, whiteSpace: 'nowrap', flex: 'none' }}>{children}</span>;
const Swatches = ({ names, s = 14 }) => <span style={{ display: 'inline-flex', gap: 3 }}>{names.map(n => <span key={n} title={n} style={{ width: s, height: s, borderRadius: s / 2, background: XD.cols[n] || '#C9BFB4', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.08)' }} />)}</span>;
const CreditBar = ({ T, c, money: m = true }) => { const u = Math.min(1, c.open / c.credit); return <div><div style={{ display: 'flex', alignItems: 'baseline', fontFamily: T.fontUI, fontSize: 10.5, color: T.ink3 }}><span>Credit line</span><span style={{ flex: 1 }} />{m ? <span><b style={{ color: u > .8 ? T.danger : T.ink }}>{money(c.open)}</b> of {money(c.credit)}</span> : <span>{Math.round(u * 100)}% used</span>}</div><div style={{ height: 5, borderRadius: 3, background: T.chipBg, marginTop: 4, overflow: 'hidden' }}><span style={{ display: 'block', width: Math.round(u * 100) + '%', height: 5, background: u > .8 ? T.danger : u > .5 ? T.warn : T.ok }} /></div></div>; };

/* ── the step strip: the one element taken from the reference. Circles with counts joined by a line, the current
   step filled in the accent, done steps in ink, upcoming outlined; an overdue badge in danger. ── */
function StepStrip({ T, steps, active, phone, amounts }) {
  return <div style={{ display: 'flex', alignItems: 'flex-start', padding: phone ? '0 6px' : 0, overflow: 'hidden' }}>
    {steps.map((s, i) => { const on = i === active, done = i < active; const [name, n, over, amt] = s; return <React.Fragment key={name}>
      <div className="press" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, flex: 'none', minWidth: phone ? 66 : 92, position: 'relative' }}>
        <span style={{ width: phone ? 30 : 34, height: phone ? 30 : 34, borderRadius: '50%', display: 'grid', placeItems: 'center', background: on ? T.accent : done ? T.ink : 'transparent', border: `1.5px solid ${on ? T.accent : done ? T.ink : T.line2}`, color: on ? T.onAccent : done ? T.bg : T.ink2, fontFamily: T.fontUI, fontSize: phone ? 12 : 13, fontWeight: 600, fontVariantNumeric: 'tabular-nums', boxShadow: on ? `0 0 0 4px ${T.accentSoft}` : 'none', boxSizing: 'border-box' }}>{done ? <Ic name="check" size={14} sw={2.4} /> : n}</span>
        {over ? <span style={{ position: 'absolute', top: -4, right: phone ? 8 : 18, minWidth: 16, height: 16, padding: '0 4px', borderRadius: 8, background: T.danger, color: '#fff', fontFamily: T.fontUI, fontSize: 9.5, fontWeight: 600, display: 'grid', placeItems: 'center' }}>{over}</span> : null}
        <span style={{ fontFamily: T.fontUI, fontSize: phone ? 10.5 : 12, fontWeight: on ? 600 : 400, color: on ? T.ink : T.ink3, whiteSpace: 'nowrap' }}>{name}</span>
        {amounts && <span style={{ fontFamily: T.fontSerif, fontSize: phone ? 11 : 12.5, fontWeight: 600, color: on ? T.ink : T.ink2, fontVariantNumeric: 'tabular-nums', marginTop: -2 }}>{amt}</span>}
      </div>
      {i < steps.length - 1 && <span style={{ flex: 1, minWidth: phone ? 8 : 14, height: 1.5, background: i < active ? T.ink : T.line2, marginTop: phone ? 14 : 16 }} />}
    </React.Fragment>; })}
  </div>;
}
const FU_STEPS = [['Reach out', 5, 2], ['Showcase', 4, 1], ['Order', 3, 0], ['Confirm', 2, 0], ['Done', 18, 0]];
const PAY_STAGES = [['Payment due', 14, 0, '₹6.2L'], ['Overdue', 9, 3, '₹3.8L'], ['Issue', 4, 1, '₹1.9L'], ['Escalate', 2, 0, '₹1.1L'], ['RED', 1, 0, '₹58k']];

/* ── follow-up card: customer on a step ── */
function FollowCard({ T, c, on, phone, style }) {
  return <div className="press" style={{ padding: phone ? '11px 13px' : '10px 12px', borderRadius: 18, background: T.surface, border: `1px solid ${on ? T.accentLine : T.line}`, boxShadow: on ? `0 0 0 3px ${T.accentSoft}` : T.dark ? 'none' : '0 6px 18px -14px rgba(36,23,18,.25)', ...style }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><HeatDot T={T} h={c.heat} /><span style={{ flex: 1, minWidth: 0, fontFamily: T.fontDisplay, fontSize: phone ? 19 : 17, fontWeight: 600, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</span>{phone && <NextPill T={T} c={c} small />}</div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}><Meta T={T}>{c.market ? c.market + ' · ' : ''}{c.city} · {c.tier}</Meta><span style={{ flex: 1 }} />{phone ? <Gauge T={T} v={c.score} s={26} /> : <NextPill T={T} c={c} small />}</div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}><CallChip T={T} icon={c.chan}>{c.chan === 'phone' ? 'call · ' + c.last : 'WhatsApp · ' + c.last}</CallChip>{c.att ? <CallChip T={T} icon="images">{c.att} designs</CallChip> : null}<span style={{ flex: 1 }} /><Ic name="chevron-right" size={15} color={T.ink3} /></div>
  </div>;
}
/* the step being worked: template, channels, attached products, outcome, note, then Done → next / Snooze / Skip */
const CRM_TPL = 'Namaste {name} ji, aapke pichhle order ke 2798 aur 6002 bahut chale. Refill ke liye 6 naye designs bhej rahe hain, dekh lijiye.';
function StepWork({ T, c, phone, history }) {
  const step = CRM_STEPS[c.step];
  return <div style={{ display: 'flex', flexDirection: 'column', gap: history ? 8 : 10 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 26, height: 26, borderRadius: 13, background: T.accent, color: T.onAccent, display: 'grid', placeItems: 'center', fontFamily: T.fontUI, fontSize: 12, fontWeight: 600 }}>{c.step + 1}</span><span style={{ fontFamily: T.fontDisplay, fontSize: 18, fontWeight: 600, color: T.ink }}>{step}</span><span style={{ flex: 1 }} /><NextPill T={T} c={c} small /></div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 5, overflow: 'hidden' }}><CrTag T={T} tone="accent">Refill due</CrTag><CrTag T={T}>journey Refill <Ic name="chevron-down" size={11} /></CrTag><Meta T={T}>since 04/09 · owner Rohan</Meta></div>
    <div style={{ padding: '9px 11px', borderRadius: 14, background: T.surface2, border: `1px solid ${T.line}`, fontFamily: T.fontUI, fontSize: 12.5, color: T.ink, lineHeight: 1.4 }}><div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}><Meta T={T}>Template · Refill</Meta><span style={{ flex: 1 }} /><Ic name="pencil" size={12} color={T.ink3} /></div>{CRM_TPL.replace('{name}', c.name.split(' ')[0])}</div>
    <div style={{ display: 'flex', gap: 6 }}><T.Btn small icon="message-circle" style={{ height: 36, flex: 1 }}>WhatsApp group</T.Btn><T.Btn kind="outline" small icon="phone" style={{ height: 36 }}>Call</T.Btn><T.Btn kind="outline" small icon="send" style={{ height: 36 }}>Share</T.Btn></div>
    <div><Meta T={T} style={{ display: 'block', marginBottom: 5 }}>Attached · {c.att || 6} designs</Meta><div style={{ display: 'flex', gap: 5 }}>{CRM_REC.slice(0, 6).map(t => <PickThumb key={t.code} T={T} t={t} w={phone ? 46 : 40} />)}<span className="press" style={{ width: phone ? 46 : 40, height: phone ? 58 : 50, borderRadius: 8, border: `1px dashed ${T.line2}`, display: 'grid', placeItems: 'center', color: T.ink3 }}><Ic name="plus" size={14} /></span></div></div>
    <div><Meta T={T} style={{ display: 'block', marginBottom: 5 }}>Outcome</Meta><div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>{['Reached', 'No answer', 'Call later', 'Not interested'].map((o, i) => <T.Chip key={o} on={i === 0} outline={i !== 0} style={{ height: 28, fontSize: 12 }}>{o}</T.Chip>)}</div></div>
    {!history && <div style={{ height: 36, borderRadius: 12, border: `1px solid ${T.line2}`, display: 'flex', alignItems: 'center', padding: '0 10px', fontFamily: T.fontUI, fontSize: 12.5, color: T.ink3 }}>Note for next time · “Diwali ke liye 6002 Blush chahiye”</div>}
    {history && <div><Sect T={T} style={{ margin: '4px 0 6px' }}>History</Sect>{[['message-circle', 'Packet · 6 designs · Refill template', '02/09'], ['phone', 'Reached · asked for Blush in 6002', '28/08'], ['receipt-text', 'SO-3390 raised · 7 pcs', '26/08'], ['message-circle', 'New samples showcase · 8 designs', '12/08']].slice(0, phone ? 4 : 3).map(([ic, t, d]) => <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', borderTop: `1px solid ${T.line}`, fontFamily: T.fontUI, fontSize: 12 }}><Ic name={ic} size={13} color={T.ink3} /><span style={{ flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: T.ink2 }}>{t}</span><Meta T={T}>{d}</Meta></div>)}</div>}
    <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 2 }}><OutBtn T={T} small icon="alarm-clock">Snooze</OutBtn><OutBtn T={T} small icon="skip-forward">Skip</OutBtn><span style={{ flex: 1 }} /><T.Btn small icon="arrow-right" style={{ height: 38 }}>Done · next</T.Btn></div>
  </div>;
}

/* ── picker tiles: pure photo, one veiled line at the foot (design no · price), a match-reason tag top-left, a tick
   disc and inset ring when selected. Selection reads like the phone gallery. ── */
const PickPhoto = ({ t, style }) => <img src={t.src} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: t.pos, display: 'block', filter: t.hue ? `hue-rotate(${t.hue}deg)` : 'none', ...style }} />;
function PickTile({ T, t, on, w, gap, phone, verify }) {
  const h = Math.round(w * 1.25);
  return <div className="press" style={{ position: 'relative', width: w, height: h, borderRadius: phone ? 12 : 10, overflow: 'hidden', background: T.photoBg, flex: 'none', boxShadow: on ? `inset 0 0 0 ${phone ? 3 : 2.5}px ${T.accent}` : 'none' }}>
    <PickPhoto t={t} style={{ opacity: verify === 'out' ? .45 : 1 }} />
    {on && <span style={{ position: 'absolute', inset: 0, boxShadow: `inset 0 0 0 ${phone ? 3 : 2.5}px ${T.accent}`, borderRadius: 'inherit', pointerEvents: 'none' }} />}
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '40%', background: 'linear-gradient(180deg, rgba(20,18,17,0), rgba(20,18,17,.55))', pointerEvents: 'none' }} />
    {t.reason && <span style={{ position: 'absolute', top: 5, left: 5, padding: '2px 6px', borderRadius: 999, ...veil({ background: 'rgba(20,18,17,.28)' }), fontFamily: T.fontUI, fontSize: phone ? 9 : 8.5, letterSpacing: '.04em', fontWeight: 500, whiteSpace: 'nowrap', maxWidth: w - 34, overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.reason}</span>}
    {t.tag && <span style={{ position: 'absolute', top: 5, right: on ? 28 : 5, width: 7, height: 7, borderRadius: 4, background: t.tag === 'Priority sale' ? T.warn : T.ok, boxShadow: '0 0 0 2px rgba(255,255,255,.6)' }} title={t.tag} />}
    {on && <span style={{ position: 'absolute', top: 5, right: 5, width: phone ? 22 : 20, height: phone ? 22 : 20, borderRadius: '50%', background: T.accent, color: T.onAccent, display: 'grid', placeItems: 'center', boxShadow: '0 1px 4px rgba(0,0,0,.35), 0 0 0 1.5px rgba(255,255,255,.85)' }}><Ic name="check" size={phone ? 13 : 12} sw={2.6} /></span>}
    {verify && <span style={{ position: 'absolute', top: 5, right: 5, height: 18, padding: '0 6px', borderRadius: 9, background: verify === 'out' ? T.danger : verify === 'low' ? T.warn : T.ok, color: '#fff', fontFamily: T.fontUI, fontSize: 9.5, fontWeight: 600, display: 'grid', placeItems: 'center' }}>{verify === 'out' ? '✗ out' : verify === 'low' ? '2 left' : '✓'}</span>}
    <div style={{ position: 'absolute', left: 6, right: 6, bottom: 5, display: 'flex', alignItems: 'baseline', gap: 5, color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,.5)', whiteSpace: 'nowrap', overflow: 'hidden' }}><span style={{ fontFamily: T.fontDisplay, fontSize: phone ? 15 : 13.5, fontWeight: 600, letterSpacing: '.01em', fontVariantNumeric: 'tabular-nums' }}>{t.code}</span><span style={{ flex: 1 }} /><span style={{ fontFamily: T.fontSerif, fontSize: phone ? 12 : 11, fontWeight: 600, fontVariantNumeric: 'tabular-nums', opacity: .95 }}>{t.price ? '₹' + t.price.toLocaleString('en-IN') : 'TBD'}</span></div>
  </div>;
}
const PickThumb = ({ T, t, w = 40, x, verify }) => <span style={{ position: 'relative', width: w, height: Math.round(w * 1.25), borderRadius: 8, overflow: 'hidden', background: T.photoBg, flex: 'none', display: 'block' }}><PickPhoto t={t} />{x && <span className="press" style={{ position: 'absolute', top: 3, right: 3, width: 16, height: 16, borderRadius: 8, background: 'rgba(20,18,17,.6)', color: '#fff', display: 'grid', placeItems: 'center' }}><Ic name="x" size={10} sw={2.4} /></span>}{verify && <span style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 14, background: verify === 'out' ? T.danger : verify === 'low' ? T.warn : T.ok, color: '#fff', fontFamily: T.fontUI, fontSize: 8.5, fontWeight: 600, display: 'grid', placeItems: 'center' }}>{verify === 'out' ? 'out' : verify === 'low' ? '2 left' : 'ok'}</span>}<span style={{ position: 'absolute', left: 4, bottom: verify ? 16 : 3, fontFamily: T.fontDisplay, fontSize: 10.5, fontWeight: 600, color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,.6)' }}>{t.code}</span></span>;
/* grid head: title · count · sort caret · sort & filter button (both grids open the same sheet) */
function PickHead({ T, title, n, of, sort = 'Match', filters, phone, on }) {
  return <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}><span style={{ fontFamily: T.fontDisplay, fontSize: phone ? 17 : 16, fontWeight: 600, color: T.ink, whiteSpace: 'nowrap' }}>{title}</span><Meta T={T}>{n} of {of}</Meta><span style={{ flex: 1 }} /><span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2, whiteSpace: 'nowrap' }}>{sort}<Ic name="chevron-down" size={12} /></span><span className="press" style={{ width: 28, height: 28, borderRadius: 9, border: `1px solid ${on ? T.ink : T.line2}`, background: on ? T.ink : 'transparent', color: on ? T.bg : T.ink, display: 'grid', placeItems: 'center', position: 'relative' }}><Ic name="sliders-horizontal" size={14} />{filters ? <span style={{ position: 'absolute', top: -4, right: -4, width: 14, height: 14, borderRadius: 7, background: T.accent, color: T.onAccent, fontSize: 8.5, fontWeight: 600, display: 'grid', placeItems: 'center', fontFamily: T.fontUI }}>{filters}</span> : null}</span></div>;
}
function PickGrid({ T, tiles, sel, w, gap = 6, cols = 3, rows, phone, verify }) {
  const list = rows ? tiles.slice(0, cols * rows) : tiles;
  return <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, ${w}px)`, gap }}>{list.map(t => <PickTile key={t.code} T={T} t={t} w={w} on={sel.includes(t.code)} phone={phone} verify={verify && sel.includes(t.code) ? (t.code === '8190' ? 'out' : t.code === '8111' ? 'low' : 'ok') : null} />)}</div>;
}

/* ── the customer pane: identity, scores, what they buy (taste, bands, colours, categories, tags), purchases,
   comms. Left pane of the share terminal on web; the head of the share screen and the dossier on the phone. ── */
const CRM_PURCH = [['2798', 12, 0], ['6002', 8, 1], ['8111', 6, 0], ['2006', 4, 0], ['8477', 3, 1], ['4410', 2, 0]];
const CRM_COMMS = [['message-circle', 'Packet · 6 designs · Refill', '02/09'], ['phone', 'Reached · asked for Blush 6002', '28/08'], ['receipt-text', 'SO-3390 · 7 pcs dispatched', '26/08'], ['message-circle', 'New samples · 8 designs', '12/08']];
function CustPane({ T, c, phone, moneyOn = true, compact }) {
  const Row = ({ label, children, style }) => <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6, ...style }}><span style={{ width: 54, fontFamily: T.fontUI, fontSize: 10.5, color: T.ink3, flex: 'none' }}>{label}</span><span style={{ flex: 1, minWidth: 0, display: 'flex', gap: 4, overflow: 'hidden' }}>{children}</span></div>;
  return <div style={{ padding: phone ? '10px 14px' : '12px 14px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}><span style={{ flex: 1, minWidth: 0 }}><div style={{ display: 'flex', alignItems: 'center', gap: 7 }}><HeatDot T={T} h={c.heat} /><span style={{ fontFamily: T.fontDisplay, fontSize: phone ? 21 : 19, fontWeight: 600, color: T.ink, lineHeight: 1.1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</span></div><Meta T={T} style={{ display: 'block', marginTop: 3 }}>{c.market ? c.market + ' · ' : ''}{c.city} · {c.seg}</Meta></span><T.Tag tone={c.tier === 'Platinum' ? 'accent' : 'muted'}>{c.tier}</T.Tag></div>
    <div style={{ display: 'flex', gap: 5, marginTop: 8, overflow: 'hidden' }}><CallChip T={T}>{c.phone}</CallChip><CallChip T={T} icon="message-circle">{c.wa}</CallChip></div>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', marginTop: 10, padding: '8px 4px', borderRadius: 14, background: T.surface2, border: `1px solid ${T.line}` }}><Gauge T={T} v={c.score} label="Customer" s={40} /><Gauge T={T} v={c.pay} label="Payment" s={40} /><Gauge T={T} v={100 - c.gr * 5} label={`GR ${c.gr}%`} s={40} /><span style={{ textAlign: 'center' }}><div style={{ fontFamily: T.fontDisplay, fontSize: 16, fontWeight: 600, color: T.ink, fontVariantNumeric: 'tabular-nums' }}>{moneyOn ? lakh(c.fy) : '—'}</div><div style={{ fontFamily: T.fontUI, fontSize: 9.5, color: T.ink3 }}>FY billing</div></span></div>
    <Sect T={T} style={{ margin: '10px 0 2px' }} right={<Meta T={T}>from 38 orders</Meta>}>Buys</Sect>
    <Taste T={T} t={c.taste} wide={!phone && !compact} />
    <Row label="Price bands">{c.bands.map(b => <CrTag key={b} T={T} tone="accent">{b}</CrTag>)}</Row>
    <Row label="Colours"><Swatches names={c.cols} s={16} /></Row>
    <Row label="Categories">{c.cats.map(b => <CrTag key={b} T={T}>{b}</CrTag>)}</Row>
    <Row label="Tags">{c.tags.map(b => <CrTag key={b} T={T}>{b}</CrTag>)}</Row>
    {moneyOn && !compact && <div style={{ marginTop: 10 }}><CreditBar T={T} c={c} /></div>}
    <Sect T={T} style={{ margin: '10px 0 6px' }} right={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 2, fontFamily: T.fontUI, fontSize: 11, color: T.ink2 }}>Lifetime<Ic name="chevron-down" size={12} /></span><span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontFamily: T.fontUI, fontSize: 11, color: T.accent }}>Full history<Ic name="chevron-right" size={12} /></span></span>}>Purchases</Sect>
    <div style={{ display: 'flex', gap: 5, overflow: 'hidden' }}>{CRM_PURCH.map(([code, b, r]) => { const t = crTile(code); return <span key={code} style={{ flex: 'none', width: phone ? 50 : 36 }}><PickThumb T={T} t={t} w={phone ? 50 : 36} /><div style={{ fontFamily: T.fontUI, fontSize: 9.5, color: T.ink3, textAlign: 'center', marginTop: 2, whiteSpace: 'nowrap' }}>{b} pcs{r ? <span style={{ color: T.warn }}> · {r}↩</span> : ''}</div></span>; })}</div>
    {!compact && <><Sect T={T} style={{ margin: '8px 0 2px' }}>Comms</Sect>{CRM_COMMS.slice(0, phone ? 4 : 3).map(([ic, t, d]) => <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '5px 0', borderTop: `1px solid ${T.line}`, fontFamily: T.fontUI, fontSize: 11.5 }}><Ic name={ic} size={12} color={T.ink3} /><span style={{ flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: T.ink2 }}>{t}</span><Meta T={T}>{d}</Meta></div>)}</>}
  </div>;
}

/* phone share screen: the customer in ~210 px so the pictures stay on screen; "More" opens the full pane */
function CustHead({ T, c }) {
  return <div style={{ padding: '10px 12px 10px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}><HeatDot T={T} h={c.heat} /><span style={{ flex: 1, minWidth: 0, fontFamily: T.fontDisplay, fontSize: 19, fontWeight: 600, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</span><T.Tag tone="accent">{c.tier}</T.Tag><span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 2, fontFamily: T.fontUI, fontSize: 11, color: T.accent }}>More<Ic name="chevron-down" size={12} /></span></div>
    <Meta T={T} style={{ display: 'block', marginTop: 2 }}>{c.market} · {c.city} · {c.seg} · {c.wa}</Meta>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
      <Gauge T={T} v={c.score} label="Customer" s={36} /><Gauge T={T} v={c.pay} label="Payment" s={36} /><Gauge T={T} v={100 - c.gr * 5} label={`GR ${c.gr}%`} s={36} />
      <span style={{ flex: 1, minWidth: 0 }}><Taste T={T} t={c.taste} /></span>
    </div>
    <div style={{ display: 'flex', gap: 4, marginTop: 8, overflow: 'hidden' }}>{c.bands.map(b => <CrTag key={b} T={T} tone="accent">{b}</CrTag>)}<CrTag T={T}><Swatches names={c.cols} s={11} /></CrTag>{c.cats.map(b => <CrTag key={b} T={T}>{b}</CrTag>)}{c.tags.map(b => <CrTag key={b} T={T}>{b}</CrTag>)}</div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 8, overflow: 'hidden' }}><Meta T={T} style={{ width: 52, whiteSpace: 'normal', lineHeight: 1.2 }}>Bought 38 orders</Meta>{CRM_PURCH.map(([code, b, r]) => <span key={code} style={{ flex: 'none', position: 'relative' }}><PickThumb T={T} t={crTile(code)} w={34} /><span style={{ position: 'absolute', right: -2, top: -4, minWidth: 14, height: 14, padding: '0 3px', borderRadius: 7, background: r ? T.warn : T.ink, color: '#fff', fontFamily: T.fontUI, fontSize: 8.5, fontWeight: 600, display: 'grid', placeItems: 'center' }}>{b}</span></span>)}<span className="press" style={{ marginLeft: 'auto', fontFamily: T.fontUI, fontSize: 11, color: T.accent, whiteSpace: 'nowrap' }}>All ›</span></div>
  </div>;
}

/* ── the purchased grid (BRD F:93): the customer's own bought designs with pcs bought and returned, a time frame
   remembered per customer, its own filters and sort ── */
const CRM_BOUGHT = [['2798', 12, 0, '10/09/26'], ['6002', 8, 1, '26/08/26'], ['8111', 6, 0, '26/08/26'], ['2006', 4, 0, '12/08/26'], ['8477', 3, 1, '30/07/26'], ['4410', 2, 0, '30/07/26'], ['8433', 2, 0, '14/07/26'], ['3007', 5, 0, '02/07/26'], ['1188', 1, 1, '02/07/26'], ['5290', 3, 0, '18/06/26'], ['7126', 2, 0, '05/06/26'], ['2415', 4, 0, '22/05/26']];
const crBought = () => CRM_BOUGHT.map(([code, b, r, last]) => ({ ...crTile(code), reason: `${b} pcs${r ? ' · ' + r + ' back' : ''}`, tag: undefined, last }));
function PurchHead({ T, phone, frame = 'Lifetime' }) {
  return <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6, flexWrap: 'nowrap', overflow: 'hidden' }}><span style={{ fontFamily: T.fontDisplay, fontSize: phone ? 17 : 16, fontWeight: 600, color: T.ink, whiteSpace: 'nowrap' }}>Purchased</span><Meta T={T}>38 · 3 back</Meta><Seg T={T} items={['30 d', '90 d', 'Lifetime']} on={frame} small /><Meta T={T} title="time frame remembered for this customer">saved</Meta><span style={{ flex: 1 }} />{!phone && <span style={{ display: 'inline-flex', gap: 4 }}><T.Chip on style={{ height: 24, fontSize: 11, padding: '0 8px' }}>Repeat</T.Chip><T.Chip outline style={{ height: 24, fontSize: 11, padding: '0 8px' }}>Returned</T.Chip><T.Chip outline style={{ height: 24, fontSize: 11, padding: '0 8px' }}>In stock</T.Chip></span>}<span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2, whiteSpace: 'nowrap' }}>Last bought<Ic name="chevron-down" size={12} /></span><span className="press" style={{ width: 28, height: 28, borderRadius: 9, border: `1px solid ${T.line2}`, display: 'grid', placeItems: 'center', color: T.ink }}><Ic name="sliders-horizontal" size={14} /></span></div>;
}
/* packet history and sale-order history: the other two tabs of the customer pane */
const CRM_PACKETS = [['02/09/26', 6, 'WhatsApp group', 'replied', 'Refill', true], ['12/08/26', 8, 'WhatsApp group', 'opened', 'New samples', false], ['28/07/26', 4, 'Preeti ji · direct', 'ordered 2', 'Follow-up on samples', false], ['10/07/26', 12, 'WhatsApp group', 'opened', 'New arrivals', true], ['21/06/26', 5, 'Broker · Harjeet', 'no reply', 'Clearance', false]];
const CRM_ORDERS = [['SO-3455', '10/09/26', 5, 24975, 'Raised'], ['SO-3448', '08/09/26', 4, 19980, 'Raised'], ['SO-3390', '26/08/26', 7, 31965, 'Dispatched'], ['SO-3301', '02/08/26', 9, 41955, 'Dispatched'], ['SO-3210', '10/07/26', 12, 55940, 'Dispatched'], ['SO-3102', '21/06/26', 6, 26970, 'Dispatched'], ['SO-2987', '30/05/26', 3, 11985, 'Cancelled']];
const CustTabs = ({ T, tab = 'Info' }) => <div style={{ display: 'flex', alignItems: 'center', padding: '0 10px', borderBottom: `1px solid ${T.line}`, flex: 'none' }}>{[['Info', null], ['Packets', 5], ['Orders', 7]].map(([t, n]) => { const on = t === tab; return <span key={t} className="press" style={{ position: 'relative', flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 5, padding: '9px 4px 10px', fontFamily: T.fontUI, fontSize: 12.5, fontWeight: on ? 600 : 400, color: on ? T.ink : T.ink3 }}>{t}{n != null && <span style={{ fontSize: 10.5, color: T.ink3, fontVariantNumeric: 'tabular-nums' }}>{n}</span>}{on && <span style={{ position: 'absolute', left: 10, right: 10, bottom: 0, height: 2, background: T.accent, borderRadius: 1 }} />}</span>; })}</div>;
function PacketsPane({ T, phone }) {
  return <div style={{ padding: phone ? 0 : '10px 12px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Meta T={T}>5 packets · 35 designs · 2 orders came from them</Meta><span style={{ flex: 1 }} /><T.Chip outline icon="arrow-down-up" style={{ height: 24, fontSize: 11, padding: '0 8px' }}>Newest</T.Chip></div>
    {CRM_PACKETS.map(([d, n, to, res, tpl, logo], i) => <div key={d} className="press" style={{ padding: '9px 0', borderTop: i ? `1px solid ${T.line}` : 0, marginTop: i ? 0 : 6 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}><Mono T={T} size={11}>{d}</Mono><span style={{ fontFamily: T.fontUI, fontSize: 12, fontWeight: 600, color: T.ink, flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>{n} designs</span><Pill T={T} small tone={res.includes('ordered') ? 'ok' : res.includes('no reply') ? 'warn' : 'muted'}>{res}</Pill></div>
      <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>{CRM_REC.slice(i, i + 6).map(t => <PickThumb key={t.code} T={T} t={t} w={30} />)}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 5 }}><Meta T={T}>{to} · {tpl}{logo ? ' · logo' : ''}</Meta><span style={{ flex: 1 }} /><span className="press" style={{ fontFamily: T.fontUI, fontSize: 11, color: T.accent, whiteSpace: 'nowrap' }}>Re-send</span><span className="press" style={{ fontFamily: T.fontUI, fontSize: 11, color: T.accent, whiteSpace: 'nowrap' }}>Add to packet</span></div>
    </div>)}
  </div>;
}
function OrdersPane({ T, phone, moneyOn = true }) {
  return <div style={{ padding: phone ? 0 : '10px 12px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Meta T={T}>7 orders this FY · 46 pcs{moneyOn ? ' · ₹2.1L' : ''}</Meta><span style={{ flex: 1 }} /><T.Chip outline icon="arrow-down-up" style={{ height: 24, fontSize: 11, padding: '0 8px' }}>Newest</T.Chip></div>
    <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>{['All', 'Open', 'Dispatched', 'Returns'].map((q, i) => <T.Chip key={q} on={i === 0} outline={i !== 0} style={{ height: 24, fontSize: 11, padding: '0 8px' }}>{q}</T.Chip>)}</div>
    {CRM_ORDERS.map(([no, d, pcs, amt, st], i) => <div key={no} className="press" style={{ padding: '7px 0', borderTop: i ? `1px solid ${T.line}` : 0, marginTop: i ? 0 : 8 }}><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Mono T={T} size={11.5}>{no}</Mono><span style={{ flex: 1 }} /><StatusPill T={T} s={st} />{moneyOn && <span style={{ width: 62, textAlign: 'right', fontFamily: T.fontSerif, fontSize: 13.5, fontWeight: 600, color: T.ink, fontVariantNumeric: 'tabular-nums' }}>{money(amt)}</span>}</div><Meta T={T} style={{ display: 'block', marginTop: 2 }}>{d} · {pcs} pcs · {st === 'Dispatched' ? 'paid' : st === 'Raised' ? 'awaiting approval' : st.toLowerCase()}</Meta></div>)}
    <div style={{ marginTop: 10, padding: '8px 10px', borderRadius: 12, background: T.surface2, border: `1px solid ${T.line}` }}><div style={{ display: 'flex', alignItems: 'baseline' }}><Meta T={T}>Orders vs payments · 12 months</Meta><span style={{ flex: 1 }} /><Legend T={T} items={[['orders', T.accent], ['paid', T.ok]]} /></div><div style={{ marginTop: 6 }}><LineG T={T} series={[{ pts: [8, 12, 10, 14, 13, 18, 16, 21, 19, 24, 22, 26], color: T.accent, width: 2 }, { pts: [6, 10, 9, 12, 12, 15, 15, 19, 18, 21, 21, 23], color: T.ok, width: 1.8, dash: true }]} w={220} h={56} area /></div></div>
  </div>;
}

/* queue strip over the customer pane: the list and step the terminal was entered from, previous / next customer */
function QueueStrip({ T, phone }) {
  return <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: phone ? '0 2px' : '8px 8px 8px 10px', borderBottom: phone ? 0 : `1px solid ${T.line}` }}>
    <Hit T={T} icon="chevron-left" size={28} iconSize={14} style={{ background: T.chipBg }} />
    <span style={{ flex: 1, minWidth: 0, textAlign: 'center' }}><div style={{ fontFamily: T.fontUI, fontSize: 11.5, fontWeight: 600, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Refill due · Showcase · 3 of 12</div><Meta T={T} style={{ display: 'block' }}>next · Ambika Enterprises</Meta></span>
    <Hit T={T} icon="chevron-right" size={28} iconSize={14} style={{ background: T.chipBg }} />
    <Hit T={T} icon="search" size={28} iconSize={14} style={{ background: T.chipBg }} />
  </div>;
}

/* ── the packet pane: selection as thumbnails, the option summary, verify and send ── */
const OPT_ROWS = (c) => [['send', 'Send to', c.wa], ['images', 'Pictures', 'Product · 2 photoshoot'], ['video', 'Video', 'None'], ['stamp', 'Logo', 'Bottom right · 3 of 5 placed'], ['message-square-text', 'Message', 'Refill template']];
function PacketPane({ T, c, sel = CRM_SEL, phone, verify, thumbW = 78 }) {
  return <div style={{ padding: phone ? '4px 0 0' : '10px 12px', display: 'flex', flexDirection: 'column', minHeight: 0, height: '100%' }}>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}><Num T={T} size={22}>{sel.length}</Num><Meta T={T}>designs · {money(crValue(sel))} · to {c.name.split(' ')[0]}</Meta><span style={{ flex: 1 }} /><span className="press" style={{ fontFamily: T.fontUI, fontSize: 11, color: T.ink3 }}>Clear</span></div>
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(3, ${thumbW}px)`, gap: 6, marginTop: 8 }}>{sel.map(code => <PickThumb key={code} T={T} t={crTile(code)} w={thumbW} x verify={verify ? (code === '8190' ? 'out' : code === '8111' ? 'low' : 'ok') : null} />)}<span className="press" style={{ width: thumbW, height: Math.round(thumbW * 1.25), borderRadius: 8, border: `1px dashed ${T.line2}`, display: 'grid', placeItems: 'center', color: T.ink3, fontFamily: T.fontUI, fontSize: 10.5 }}>+ pick</span></div>
    {verify && <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, padding: '6px 9px', borderRadius: 10, background: T.warn + '1F', border: `1px solid ${T.warn}55`, fontFamily: T.fontUI, fontSize: 11, color: T.ink }}><Ic name="triangle-alert" size={12} color={T.warn} />1 out of stock · 1 low · remove 8190?<span style={{ flex: 1 }} /><b style={{ color: T.accent }}>Remove</b></div>}
    <div style={{ marginTop: 10, borderRadius: 14, border: `1px solid ${T.line}`, background: T.surface2, overflow: 'hidden' }}>{OPT_ROWS(c).map(([ic, k, v], i) => <div key={k} className="press" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', borderTop: i ? `1px solid ${T.line}` : 0 }}><Ic name={ic} size={13} color={T.ink3} /><span style={{ width: 54, fontFamily: T.fontUI, fontSize: 11, color: T.ink3 }}>{k}</span><span style={{ flex: 1, minWidth: 0, fontFamily: T.fontUI, fontSize: 12, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v}</span><Ic name="chevron-right" size={13} color={T.ink3} /></div>)}</div>
    <span style={{ flex: 1 }} />
    <div style={{ display: 'flex', gap: 6, marginTop: 10 }}><OutBtn T={T} icon="package-search" style={{ flex: 1, justifyContent: 'center' }}>Verify stock</OutBtn><OutBtn T={T} icon="download" style={{ width: 40, padding: 0, justifyContent: 'center' }} /></div>
    <T.Btn icon="send" style={{ width: '100%', height: 44, marginTop: 6 }}>Send · WhatsApp</T.Btn>
  </div>;
}
/* segmented option control */
const Seg = ({ T, items, on, small }) => <span style={{ display: 'inline-flex', padding: 3, borderRadius: 999, background: T.bg2, flex: 'none', maxWidth: '100%', overflow: 'hidden' }}>{items.map(s => <span key={s} className="press" style={{ height: small ? 24 : 28, padding: small ? '0 9px' : '0 12px', borderRadius: 999, display: 'grid', placeItems: 'center', fontFamily: T.fontUI, fontSize: small ? 11 : 12, background: s === on ? T.surface : 'transparent', color: s === on ? T.ink : T.ink3, boxShadow: s === on ? '0 1px 3px rgba(0,0,0,.12)' : 'none', whiteSpace: 'nowrap' }}>{s}</span>)}</span>;
/* the composer: every share and export option grouped; the same on web (a sheet over the main window) and phone */
function Composer({ T, c, phone, sel = CRM_SEL }) {
  const G = ({ icon, title, sub, children }) => <div style={{ padding: phone ? '8px 0' : '9px 0', borderTop: `1px solid ${T.line}` }}><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}><Ic name={icon} size={14} color={T.ink3} /><span style={{ fontFamily: T.fontUI, fontSize: 13, fontWeight: 600, color: T.ink }}>{title}</span>{sub && <Meta T={T}>{sub}</Meta>}</div>{children}</div>;
  const wrap = { display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' };
  return <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
    <G icon="send" title="Send to" sub="remembered for this customer"><div style={wrap}><T.Chip on icon="users">{c.wa}</T.Chip><T.Chip outline icon="user">Preeti ji · {c.phone}</T.Chip><T.Chip outline icon="user">Broker · {c.broker}</T.Chip><T.Chip outline icon="plus">Contact</T.Chip></div></G>
    <G icon="images" title="Pictures"><div style={wrap}><Seg T={T} items={['Product photos', 'Photoshoot', 'Both']} on="Both" small={phone} /><Meta T={T}>photoshoot exists for 2 of {sel.length}</Meta></div></G>
    <G icon="video" title="Video"><div style={wrap}><Seg T={T} items={['None', 'Product video', 'Video with logo', 'Only video']} on="None" small={phone} /><Meta T={T}>video for 1 of {sel.length}</Meta></div></G>
    <G icon="stamp" title="Logo"><div style={wrap}><Seg T={T} items={['Without logo', 'Place logo']} on="Place logo" small={phone} /><T.Chip outline icon="move">Position per picture</T.Chip><Meta T={T}>bottom right · 3 of 5 placed</Meta></div></G>
    <G icon="message-square-text" title="Message"><div style={wrap}>{['Refill', 'New arrivals', 'Follow-up on samples', 'Clearance', 'Custom'].map((t, i) => <T.Chip key={t} on={i === 0} outline={i !== 0} style={{ height: 28 }}>{t}</T.Chip>)}</div><div style={{ marginTop: 8, padding: '8px 10px', borderRadius: 12, background: T.surface2, border: `1px solid ${T.line}`, fontFamily: T.fontUI, fontSize: 12, color: T.ink, lineHeight: 1.4 }}>{CRM_TPL.replace('{name}', c.name.split(' ')[0])} <span style={{ color: T.ink3 }}>· prices {'{price}'} · {'{catalogue link}'}</span></div></G>
    <G icon="package-search" title="Verify against stock" sub="checked 2 min ago"><div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: phone ? 'wrap' : 'nowrap' }}>{sel.map(code => <PickThumb key={code} T={T} t={crTile(code)} w={phone ? 46 : 44} verify={code === '8190' ? 'out' : code === '8111' ? 'low' : 'ok'} />)}<span style={{ flex: 1 }} /><OutBtn T={T} small icon="x" style={phone ? { width: '100%', justifyContent: 'center' } : {}}>Remove out of stock</OutBtn></div></G>
    <G icon="download" title="Export"><div style={wrap}><T.Chip outline icon="folder-archive">Pictures zip</T.Chip><T.Chip outline icon="file-text">PDF sheet</T.Chip><T.Chip outline icon="link">Catalogue link</T.Chip><T.Chip outline icon="table-2">Excel with images</T.Chip></div></G>
  </div>;
}

/* ── logo placement: nine-point position, size, opacity, mark variant; per picture or all ── */
const LOGO = (T, dark) => XD.A + (dark ? 'clients/srs-dress-only.png' : 'clients/srs-logo.png');
function LogoStage({ T, t, w, h, pos = 'br', size = .22, dark, handles }) {
  const P = { tl: [0, 0], tc: [.5, 0], tr: [1, 0], ml: [0, .5], mc: [.5, .5], mr: [1, .5], bl: [0, 1], bc: [.5, 1], br: [1, 1] }[pos];
  const lw = Math.round(w * size), m = Math.round(w * .05);
  const left = P[0] === 0 ? m : P[0] === 1 ? w - lw - m : (w - lw) / 2, top = P[1] === 0 ? m : P[1] === 1 ? h - lw * .45 - m : (h - lw * .45) / 2;
  return <div style={{ position: 'relative', width: w, height: h, borderRadius: 16, overflow: 'hidden', background: T.photoBg }}>
    <PickPhoto t={t} />
    <div style={{ position: 'absolute', left, top, width: lw, height: lw * .45, display: 'grid', placeItems: 'center', padding: 4, borderRadius: 6, outline: handles ? `1.5px dashed ${T.onAccent}` : 'none', outlineOffset: 3, cursor: 'move' }}><img src={LOGO(T, dark)} style={{ maxWidth: '100%', maxHeight: '100%', opacity: .92, filter: dark ? 'drop-shadow(0 1px 3px rgba(0,0,0,.5))' : 'drop-shadow(0 1px 2px rgba(255,255,255,.6))' }} />{handles && ['tl', 'tr', 'bl', 'br'].map(k => <span key={k} style={{ position: 'absolute', width: 8, height: 8, borderRadius: 4, background: '#fff', boxShadow: '0 0 0 1.5px rgba(0,0,0,.35)', [k[0] === 't' ? 'top' : 'bottom']: -7, [k[1] === 'l' ? 'left' : 'right']: -7 }} />)}</div>
    {handles && <><span style={{ position: 'absolute', left: '33.3%', top: 0, bottom: 0, width: 1, background: 'rgba(255,255,255,.25)' }} /><span style={{ position: 'absolute', left: '66.6%', top: 0, bottom: 0, width: 1, background: 'rgba(255,255,255,.25)' }} /><span style={{ position: 'absolute', top: '33.3%', left: 0, right: 0, height: 1, background: 'rgba(255,255,255,.25)' }} /><span style={{ position: 'absolute', top: '66.6%', left: 0, right: 0, height: 1, background: 'rgba(255,255,255,.25)' }} /></>}
  </div>;
}
function LogoControls({ T, phone, pos = 'br' }) {
  const Slider = ({ label, v, txt }) => <div style={{ marginTop: 10 }}><div style={{ display: 'flex', fontFamily: T.fontUI, fontSize: 11, color: T.ink3 }}><span>{label}</span><span style={{ flex: 1 }} /><b style={{ color: T.ink }}>{txt}</b></div><div style={{ position: 'relative', height: 4, borderRadius: 2, background: T.chipBg, marginTop: 8 }}><span style={{ position: 'absolute', left: 0, width: v + '%', top: 0, bottom: 0, borderRadius: 2, background: T.accent }} /><span style={{ position: 'absolute', left: v + '%', top: '50%', width: 18, height: 18, borderRadius: 9, background: T.surface, border: `1.5px solid ${T.ink}`, transform: 'translate(-50%,-50%)', boxShadow: '0 2px 6px rgba(0,0,0,.2)' }} /></div></div>;
  return <div style={{ display: phone ? 'grid' : 'block', gridTemplateColumns: phone ? '92px 1fr' : 'none', gap: phone ? 14 : 0, alignItems: 'start' }}>
    <div><Meta T={T} style={{ display: 'block', marginBottom: 6 }}>Position</Meta><div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 26px)', gap: 4 }}>{['tl', 'tc', 'tr', 'ml', 'mc', 'mr', 'bl', 'bc', 'br'].map(k => <span key={k} className="press" style={{ width: 26, height: 26, borderRadius: 7, border: `1px solid ${k === pos ? T.accent : T.line2}`, background: k === pos ? T.accent : 'transparent', display: 'grid', placeItems: 'center' }}><span style={{ width: 6, height: 6, borderRadius: 3, background: k === pos ? T.onAccent : T.ink3 }} /></span>)}</div></div>
    <div><Slider label="Size" v={44} txt="22% of width" /><Slider label="Opacity" v={88} txt="92%" /><Slider label="Margin" v={30} txt="5%" />
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 12 }}><Meta T={T}>Mark</Meta><Seg T={T} items={['Dark', 'Light', 'Auto']} on="Auto" small /></div></div>
  </div>;
}
function LogoRail({ T, sel = CRM_SEL, cur = 0, w = 44 }) {
  return <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>{sel.map((code, i) => <span key={code} style={{ position: 'relative', flex: 'none', borderRadius: 10, padding: 2, boxShadow: i === cur ? `0 0 0 2px ${T.accent}` : 'none' }}><PickThumb T={T} t={crTile(code)} w={w} />{i < 3 && i !== cur && <span style={{ position: 'absolute', top: 5, right: 5, width: 16, height: 16, borderRadius: 8, background: T.ok, color: '#fff', display: 'grid', placeItems: 'center' }}><Ic name="check" size={10} sw={2.6} /></span>}</span>)}</div>;
}

/* ── bills for the payments journey ── */
const CRM_BILLS = [
  { no: 'SI-2288', c: 'c2', date: '04/09/26', due: '04/10/26', over: 0, amt: 31965, stage: 0, broker: 'Imran Khan' },
  { no: 'SI-2271', c: 'c5', date: '24/08/26', due: '23/09/26', over: 0, amt: 26970, stage: 0, broker: 'Kishore Nathani' },
  { no: 'SI-2240', c: 'c3', date: '12/07/26', due: '11/08/26', over: 28, amt: 39955, stage: 1, broker: 'Suman Traders' },
  { no: 'SI-2231', c: 'c3', date: '05/07/26', due: '04/08/26', over: 35, amt: 17980, stage: 1, broker: 'Suman Traders', snooze: true },
  { no: 'SI-2219', c: 'c2', date: '28/06/26', due: '28/07/26', over: 42, amt: 48200, stage: 1, broker: 'Imran Khan' },
  { no: 'SI-2196', c: 'c5', date: '10/06/26', due: '10/07/26', over: 60, amt: 22400, stage: 2, broker: 'Kishore Nathani' },
  { no: 'SI-2170', c: 'c3', date: '22/05/26', due: '21/06/26', over: 79, amt: 61300, stage: 3, broker: 'Suman Traders' },
  { no: 'SI-2151', c: 'c5', date: '02/05/26', due: '01/06/26', over: 99, amt: 58000, stage: 4, broker: 'Kishore Nathani' },
];
const overTone = (T, d) => d >= 60 ? T.danger : d >= 30 ? T.warn : T.ink2;
function BillRow({ T, b, phone, on, moneyOn = true, first }) {
  const c = crC(b.c);
  return <div className="press" style={{ display: 'flex', alignItems: 'center', gap: phone ? 8 : 10, padding: phone ? '9px 0' : '8px 10px', borderTop: first ? 0 : `1px solid ${T.line}`, background: on ? T.accentSoft : 'transparent' }}>
    <Mono T={T} size={phone ? 11.5 : 12}>{b.no}</Mono>
    <span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontUI, fontSize: 12.5, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</div><Meta T={T} style={{ display: 'block' }}>{b.date} · due {b.due} · {b.broker}</Meta></span>
    {b.snooze && <Pill T={T} tone="blue" small>Snoozed</Pill>}
    <span style={{ width: phone ? 46 : 58, textAlign: 'right', fontFamily: T.fontUI, fontSize: 12, fontWeight: 600, color: overTone(T, b.over), fontVariantNumeric: 'tabular-nums' }}>{b.over ? b.over + ' d' : 'due'}</span>
    {moneyOn && <span style={{ width: phone ? 62 : 72, textAlign: 'right', fontFamily: T.fontSerif, fontSize: 14, fontWeight: 600, color: T.ink, fontVariantNumeric: 'tabular-nums' }}>{money(b.amt)}</span>}
    {!phone && <><Hit T={T} icon="phone" size={30} iconSize={14} style={{ background: T.chipBg }} /><Hit T={T} icon="message-circle" size={30} iconSize={14} style={{ background: T.chipBg }} /></>}
  </div>;
}
/* the customer at this stage: score, credit, bills across stages, log payment, snooze */
function PayPane({ T, c, phone, cleared }) {
  const bills = CRM_BILLS.filter(b => b.c === c.id);
  return <div style={{ padding: phone ? 0 : '10px 12px', display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 19, fontWeight: 600, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</div><Meta T={T} style={{ display: 'block' }}>{c.city} · {c.tier} · {c.broker} · {agencyOf(c)}</Meta></span><Gauge T={T} v={c.pay} label="Payment" s={40} /></div>
    <div style={{ display: 'flex', gap: 5, marginTop: 8 }}><CallChip T={T}>{c.phone}</CallChip><CallChip T={T} icon="message-circle">WhatsApp</CallChip><CallChip T={T} icon="user">broker</CallChip></div>
    <div style={{ marginTop: 10 }}><CreditBar T={T} c={c} /></div>
    <Sect T={T} style={{ margin: '10px 0 4px' }} right={<Meta T={T}>{bills.length} open · {money(bills.reduce((s, b) => s + b.amt, 0))}</Meta>}>Bills by stage</Sect>
    <div style={{ borderRadius: 12, border: `1px solid ${T.line}`, background: T.surface2, overflow: 'hidden' }}>{bills.map((b, i) => <div key={b.no} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 9px', borderTop: i ? `1px solid ${T.line}` : 0, opacity: cleared === b.no ? .5 : 1 }}><Mono T={T} size={11.5}>{b.no}</Mono><Pill T={T} small tone={b.stage >= 3 ? 'danger' : b.stage === 2 ? 'warn' : b.stage === 1 ? 'warn' : 'muted'} fill={b.stage === 4}>{PAY_STAGES[b.stage][0]}</Pill><span style={{ flex: 1 }} /><span style={{ fontFamily: T.fontUI, fontSize: 11, color: overTone(T, b.over), fontWeight: 600 }}>{b.over ? b.over + ' d' : ''}</span><span style={{ fontFamily: T.fontSerif, fontSize: 13.5, fontWeight: 600, color: T.ink, textDecoration: cleared === b.no ? 'line-through' : 'none' }}>{money(b.amt)}</span></div>)}</div>
    {cleared && <div style={{ marginTop: 8, padding: '8px 10px', borderRadius: 12, background: T.ok + '1A', border: `1px solid ${T.ok}55`, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink }}><b>{cleared}</b> cleared · ₹39,955 · received 05/09 · UTR 6231…9 · leaves Overdue; Ambika stays in Overdue for SI-2231 and Escalate for SI-2170</div>}
    <Sect T={T} style={{ margin: '10px 0 4px' }}>Message log</Sect>
    {[['message-circle', 'Weekly reminder · SI-2240, SI-2231 · ₹57,935', 'Mon 08:00', true], ['phone', 'Reached · “cheque by Friday”', '03/09', false], ['message-circle', 'Payment due · SI-2240 · pdf', '12/07', true]].map(([ic, t, d, auto]) => <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '5px 0', borderTop: `1px solid ${T.line}`, fontFamily: T.fontUI, fontSize: 11.5 }}><Ic name={ic} size={12} color={T.ink3} /><span style={{ flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: T.ink2 }}>{t}</span>{auto && <CrTag T={T}>auto</CrTag>}<Meta T={T}>{d}</Meta></div>)}
    <span style={{ flex: 1 }} />
    <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 8 }}><OutBtn T={T} small icon="alarm-clock">Snooze</OutBtn><OutBtn T={T} small icon="arrow-up-right">Escalate</OutBtn><span style={{ flex: 1 }} /><T.Btn small icon="banknote" style={{ height: 36 }}>Log payment</T.Btn></div>
  </div>;
}

const AGENCIES = [
  { name: 'Suman Agency', brokers: ['Suman Traders'], customers: 6, due: 142000, over: 57935, issue: 61300, sent: 'Mon 08:00', to: 'Suman Traders · 98105 11223' },
  { name: 'Imran Agency', brokers: ['Imran Khan'], customers: 4, due: 96000, over: 48200, issue: 0, sent: 'Mon 08:00', to: 'Imran Khan · 98395 56688' },
  { name: 'Kishore Agency', brokers: ['Kishore Nathani'], customers: 3, due: 26970, over: 0, issue: 80400, sent: 'Mon 08:05', to: 'Kishore Nathani · 98982 73380' },
  { name: 'Shubham Marketing', brokers: ['Shubham', 'Rakesh'], customers: 5, due: 210000, over: 0, issue: 0, sent: 'Mon 08:05', to: 'Shubham · 93558 79111' },
  { name: 'Harjeet Agency', brokers: ['Harjeet Singh'], customers: 4, due: 168000, over: 0, issue: 0, sent: 'Mon 08:05', to: 'Harjeet Singh · 98152 23366' },
];
/* the weekly broker / agency report, as the pane preview on web and a sheet on the phone */
function ReportBody({ T, a }) {
  return <>
  <div style={{ marginTop: 10, borderRadius: 14, border: `1px solid ${T.line}`, background: T.surface2, padding: '10px 12px', fontFamily: T.fontUI, fontSize: 12, color: T.ink, lineHeight: 1.45 }}>
    <div style={{ fontFamily: T.fontDisplay, fontSize: 15, fontWeight: 600 }}>Payment report · week 37 · Shree Radha Studio</div>
    {[['Payment due', [['Ambika Enterprises', 'SI-2288', '04/10/26', 31965], ['Ambika Enterprises', 'SI-2295', '09/10/26', 22400]]], ['Overdue', [['Ambika Enterprises', 'SI-2240', '28 d', 39955], ['Ambika Enterprises', 'SI-2231', '35 d', 17980]]], ['Issue · calls this week', [['Ambika Enterprises', 'SI-2170', '79 d', 61300]]]].map(([sec, rows]) => <div key={sec} style={{ marginTop: 8 }}><div style={{ fontFamily: T.fontUI, fontSize: 10.5, letterSpacing: '.08em', textTransform: 'uppercase', color: T.ink3 }}>{sec}</div>{rows.map(r => <div key={r[1]} style={{ display: 'flex', gap: 8, padding: '3px 0', borderTop: `1px solid ${T.line}` }}><span style={{ flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r[0]}</span><Mono T={T} size={11}>{r[1]}</Mono><Meta T={T} style={{ width: 52, textAlign: 'right' }}>{r[2]}</Meta><span style={{ width: 60, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{money(r[3])}</span></div>)}</div>)}
    <div style={{ marginTop: 8, paddingTop: 6, borderTop: `1px solid ${T.line2}`, display: 'flex' }}><span>Total outstanding</span><span style={{ flex: 1 }} /><b>{money(a.due + a.over + a.issue)}</b></div>
  </div>
  </>;
}
/* a journey step's settings: channel, template, repeat, owner, automation, snooze, broker report */
function StepSettings({ T }) {
  return <>
  {[['Channel', <Seg T={T} items={['WhatsApp', 'Call', 'Both']} on="Both" small />], ['Template', <T.Chip outline icon="message-square-text" style={{ height: 28 }}>Overdue reminder · v3</T.Chip>], ['Repeat', <Seg T={T} items={['Weekly', 'Twice a week', 'Daily']} on="Weekly" small />], ['Call after', <T.Chip outline style={{ height: 28 }}>7 days</T.Chip>], ['Owner', <T.Chip outline icon="user" style={{ height: 28 }}>Accounts · Neha</T.Chip>], ['Automation', <Seg T={T} items={['On', 'Off']} on="On" small />], ['Snooze options', <T.Chip outline style={{ height: 28 }}>14 · 30 days</T.Chip>], ['Broker report', <Seg T={T} items={['Section', 'None']} on="Section" small />]].map(([k, v]) => <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}><span style={{ width: 88, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink3 }}>{k}</span><span style={{ flex: 1, minWidth: 0, display: 'flex', overflow: 'hidden' }}>{v}</span></div>)}
  <div style={{ marginTop: 12, padding: '8px 10px', borderRadius: 12, background: T.surface2, border: `1px solid ${T.line}`, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2, lineHeight: 1.4 }}>Namaste {'{name}'} ji, {'{bill}'} ka {'{amount}'} {'{days}'} din se overdue hai. Payment details: {'{link}'}</div>
  </>;
}

/* ── phone chrome: top bar, search island, node scroller (Follow-ups · Share · Payments · Customers · Journeys) ── */
function CrTop({ T, title, back, right }) {
  return <div style={{ display: 'flex', alignItems: 'center', padding: '0 10px 0 12px', height: 44, gap: 4 }}>{back ? <Hit T={T} icon="chevron-left" size={40} /> : null}{title ? <span style={{ fontFamily: T.fontDisplay, fontSize: 22, fontWeight: 500, color: T.ink, marginLeft: back ? 0 : 6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 }}>{title}</span> : <><T.Lockup compact /><span style={{ flex: 1 }} /></>}<span style={{ fontFamily: T.fontUI, fontSize: 12, color: T.ink3, marginRight: 4 }}>Sales</span>{right}<Hit T={T} icon="ellipsis-vertical" size={40} /></div>;
}
function CrNodes({ T, active }) {
  return <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 4, padding: '8px 36px 0 12px', overflow: 'hidden' }}>{CRM_SUB_P.map(([ic, l, n]) => { const on = l === active; return <span key={l} className="press" style={{ flex: 'none', display: 'inline-flex', alignItems: 'center', gap: 5, padding: on ? '4px 12px' : '4px 8px', borderRadius: 999, background: on ? T.ink : 'transparent', color: on ? T.bg : T.ink2, fontFamily: T.fontDisplay, fontSize: 16.5, fontWeight: 500, whiteSpace: 'nowrap' }}>{l}{n != null && <span style={{ fontFamily: T.fontUI, fontSize: 10.5, fontWeight: 600, padding: '1px 6px', borderRadius: 999, background: on ? 'rgba(255,255,255,.18)' : T.chipBg, color: on ? T.bg : T.ink2 }}>{n}</span>}</span>; })}<span style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 60, background: `linear-gradient(90deg, transparent, ${T.bg} 60%)`, pointerEvents: 'none' }} /><span className="press" style={{ position: 'absolute', right: 10, top: 12, width: 24, height: 24, borderRadius: 12, background: T.chipBg, color: T.ink2, display: 'grid', placeItems: 'center' }}><Ic name="chevron-right" size={13} sw={2.2} /></span></div>;
}
function CrLists({ T, active = 'Today’s to-do', lists = CRM_LISTS }) {
  return <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 6, padding: '8px 36px 0 12px', overflow: 'hidden' }}>{lists.map(([l, k]) => { const on = l === active; return <span key={l} className="press" style={{ flex: 'none', padding: on ? '3px 12px' : '3px 7px', borderRadius: 999, background: on ? T.accentSoft : 'transparent', color: on ? T.accent : k === 'custom' ? T.custom : T.ink2, fontFamily: T.fontUI, fontSize: 13, fontWeight: on ? 600 : 400, fontStyle: k === 'custom' ? 'italic' : 'normal', whiteSpace: 'nowrap' }}>{l}</span>; })}<span style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 60, background: `linear-gradient(90deg, transparent, ${T.bg} 60%)`, pointerEvents: 'none' }} /><span className="press" style={{ position: 'absolute', right: 10, top: 10, width: 24, height: 24, borderRadius: 12, background: T.chipBg, color: T.ink2, display: 'grid', placeItems: 'center' }}><Ic name="chevron-right" size={13} sw={2.2} /></span></div>;
}
function CrHeader({ T, node, title, back, placeholder = 'Customer, city, design', lists, list, right, children, noSearch }) {
  return <div style={{ background: T.header, borderBottom: `1px solid ${T.line}`, boxShadow: T.headerShadow, paddingBottom: 8, marginTop: -54, paddingTop: 54, flex: 'none' }}><CrTop T={T} title={title} back={back} right={right} />{!noSearch && <DSearch T={T} placeholder={placeholder} />}{node && <CrNodes T={T} active={node} />}{lists && <CrLists T={T} active={list} />}{children}</div>;
}
const crDock = T => <T.Island active="CRM" />;

/* ── phone screens ── */
/* P1 Follow-ups · today */
function ScreenCrFollow({ T, sheet, over }) {
  const list = [CRM_C[0], CRM_C[2], CRM_C[5], CRM_C[3], CRM_C[1], CRM_C[4]];
  return frameF(T, <><CrHeader T={T} node="Follow-ups" lists list="Today’s to-do"><div style={{ padding: '12px 6px 0' }}><StepStrip T={T} steps={FU_STEPS} active={1} phone /></div></CrHeader>
    <Body><div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}><Meta T={T}>4 on Showcase · 1 overdue</Meta><span style={{ flex: 1 }} /><T.Chip outline icon="arrow-down-up" style={{ height: 26, fontSize: 11 }}>Next action</T.Chip><T.Chip on style={{ height: 26, fontSize: 11 }}>Mine</T.Chip></div>{list.map((c, i) => <FollowCard key={c.id} T={T} c={c} phone on={sheet && i === 0} style={{ marginBottom: 8 }} />)}</Body></>,
    over ? over : sheet ? <>{scrimF(T)}<Sheet T={T} h={700} title={CRM_C[0].name}><div style={{ height: '100%', overflow: 'hidden' }}><StepWork T={T} c={CRM_C[0]} phone /></div></Sheet></> : crDock(T));
}
const ScreenCrFollowStep = ({ T }) => <ScreenCrFollow T={T} sheet />;
/* P3 Share · customer + grids */
function CrTray({ T, n = 5, verify }) {
  return <div style={{ position: 'absolute', left: 14, right: 14, bottom: 98, display: 'flex', alignItems: 'center', gap: 8, padding: '6px 6px 6px 10px', borderRadius: 24, background: T.strip, backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: `1px solid ${T.glassEdge}` }}><span style={{ display: 'flex' }}>{CRM_SEL.slice(0, 4).map((code, i) => <span key={code} style={{ width: 26, height: 32, borderRadius: 6, overflow: 'hidden', marginLeft: i ? -8 : 0, boxShadow: `0 0 0 1.5px ${T.bg}`, background: T.photoBg }}><PickPhoto t={crTile(code)} /></span>)}</span><span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontUI, fontSize: 12.5, fontWeight: 600, color: T.ink }}>{n} selected · {money(crValue(CRM_SEL))}</div>{verify ? <Meta T={T} style={{ display: 'block', color: T.warn }}>1 out of stock · 1 low · remove 8190?</Meta> : <Meta T={T} style={{ display: 'block' }}>to Preeti Fashion Hub · SRS group</Meta>}</span><T.Btn small icon={verify ? 'x' : 'send'} style={{ height: 36 }}>{verify ? 'Remove' : 'Packet'}</T.Btn></div>;
}
function ScreenCrShare({ T, sheet, tab = 'Recommended', over, verify }) {
  const c = CRM_C[0]; const tiles = tab === 'Recommended' ? CRM_REC : tab === 'Purchased' ? crBought() : CRM_CAT;
  return frameF(T, <><CrHeader T={T} title="Share" back placeholder="Design no, category, colour" right={<Hit T={T} icon="user-round" size={40} iconSize={18} />} />
    <Body style={{ padding: '0 0 110px' }}>
      <div style={{ margin: '8px 14px 0' }}><QueueStrip T={T} phone /></div>
      <div style={{ margin: '6px 14px 0', borderRadius: 20, background: T.surface, border: `1px solid ${T.line}`, overflow: 'hidden' }}><CustHead T={T} c={c} /></div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 14px 0' }}>{[['Purchased', 38], ['Recommended', 48], ['Catalogue', 612]].map(([t, n]) => { const on = t === tab; return <span key={t} className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: on ? '4px 12px' : '4px 8px', borderRadius: 999, background: on ? T.ink : 'transparent', color: on ? T.bg : T.ink2, fontFamily: T.fontDisplay, fontSize: 17, fontWeight: 500 }}>{t}<span style={{ fontFamily: T.fontUI, fontSize: 10.5, fontWeight: 600, padding: '1px 6px', borderRadius: 999, background: on ? 'rgba(255,255,255,.18)' : T.chipBg, color: on ? T.bg : T.ink2 }}>{n}</span></span>; })}<span style={{ flex: 1 }} /><span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2 }}>{tab === 'Purchased' ? 'Last bought' : 'Match'}<Ic name="chevron-down" size={12} /></span><Hit T={T} icon="sliders-horizontal" size={30} iconSize={14} style={{ background: T.surface, border: `1px solid ${T.line2}`, borderRadius: 9 }} /></div>
      {tab === 'Purchased' && <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px 0', overflow: 'hidden' }}><Seg T={T} items={['30 d', '90 d', 'Lifetime']} on="Lifetime" small /><Meta T={T}>remembered</Meta><span style={{ flex: 1 }} /><T.Chip on style={{ height: 24, fontSize: 11, padding: '0 8px' }}>Repeat</T.Chip><T.Chip outline style={{ height: 24, fontSize: 11, padding: '0 8px' }}>Returned</T.Chip></div>}
      <div style={{ padding: '8px 14px 0' }}><PickGrid T={T} tiles={tiles} sel={CRM_SEL} w={116} gap={7} phone rows={3} verify={verify} /></div>
    </Body></>,
    over ? over : sheet ? <>{scrimF(T)}<Sheet T={T} h={760} title="Packet · 5 designs" foot={<div style={{ display: 'flex', gap: 8 }}><OutBtn T={T} icon="download" style={{ height: 44 }}>Export</OutBtn><T.Btn icon="send" style={{ flex: 1, height: 44 }}>Send · WhatsApp group</T.Btn></div>}><div style={{ height: '100%', overflow: 'hidden' }}><Composer T={T} c={c} phone /></div></Sheet></> : <><CrTray T={T} verify={verify} /><T.Island active="CRM" /></>);
}
const ScreenCrShareCat = ({ T }) => <ScreenCrShare T={T} tab="Catalogue" />;
const ScreenCrSharePurch = ({ T }) => <ScreenCrShare T={T} tab="Purchased" />;
const ScreenCrPacket = ({ T }) => <ScreenCrShare T={T} sheet />;
/* P5 Share · logo placement */
function ScreenCrLogo({ T }) {
  return frameF(T, <><CrHeader T={T} title="Place logo · 2 of 5" back noSearch right={<T.Chip on style={{ height: 30 }}>Done</T.Chip>} />
    <Body style={{ padding: '10px 14px 0' }}>
      <LogoStage T={T} t={crTile('8111')} w={362} h={400} pos="br" dark={true} handles />
      <div style={{ marginTop: 10 }}><LogoRail T={T} cur={1} w={44} /></div>
    </Body>
    <div style={{ position: 'absolute', left: 14, right: 14, bottom: 22, padding: '12px 14px 14px', borderRadius: 24, ...glass(T) }}><LogoControls T={T} phone /><div style={{ display: 'flex', gap: 6, marginTop: 12 }}><OutBtn T={T} small icon="rotate-ccw">Reset</OutBtn><span style={{ flex: 1 }} /><OutBtn T={T} small icon="check">This picture</OutBtn><T.Btn small icon="check-check" style={{ height: 32 }}>Apply to all 5</T.Btn></div></div>
  </>, null);
}
/* P6 Payments · stages */
function ScreenCrPay({ T, sheet, over, cleared }) {
  const bills = CRM_BILLS.filter(b => b.stage === 1);
  return frameF(T, <><CrHeader T={T} node="Payments" placeholder="Bill no, customer, broker" lists list="All bills" ><div style={{ padding: '12px 6px 0' }}><StepStrip T={T} steps={PAY_STAGES} active={1} phone amounts /></div></CrHeader>
    <Body><div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}><Meta T={T}>9 bills · 4 customers · ₹3.8L</Meta><span style={{ flex: 1 }} /><T.Chip outline icon="arrow-down-up" style={{ height: 26, fontSize: 11 }}>Days overdue</T.Chip><T.Chip on style={{ height: 26, fontSize: 11 }}>Mine</T.Chip></div>
      <div style={{ borderRadius: 16, background: T.surface, border: `1px solid ${T.line}`, padding: '0 12px' }}>{bills.map((b, i) => <BillRow key={b.no} T={T} b={b} phone first={i === 0} on={sheet && i === 0} />)}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10, padding: '8px 10px', borderRadius: 12, background: T.surface2, border: `1px solid ${T.line}`, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2 }}><Ic name="calendar-clock" size={13} color={T.ink3} />Weekly broker report · sent Mon 08:00 · 3 agencies<span style={{ flex: 1 }} /><b style={{ color: T.accent }}>Preview</b></div>
    </Body></>,
    over ? over : sheet ? <>{scrimF(T)}<Sheet T={T} h={690} title={cleared ? 'SI-2240 · payment logged' : 'SI-2240 · Overdue 28 d'}><div style={{ height: '100%', overflow: 'hidden' }}><PayPane T={T} c={CRM_C[2]} phone cleared={cleared} /></div></Sheet></> : crDock(T));
}
const ScreenCrPayBill = ({ T }) => <ScreenCrPay T={T} sheet />;
/* P8 Customer dossier */
function ScreenCrDossier({ T }) {
  const c = CRM_C[0];
  return frameF(T, <><CrHeader T={T} title={c.name} back noSearch right={<Hit T={T} icon="phone" size={40} iconSize={18} />} />
    <Body style={{ padding: '0 0 130px' }}>
      <div style={{ display: 'flex', gap: 4, padding: '10px 14px 0', overflow: 'hidden' }}>{['Info', 'Packets', 'Orders', 'Invoices & payments', 'Shipments', 'Returns', 'Growth'].map((t, i) => <span key={t} style={{ flex: 'none', padding: '6px 10px', fontFamily: T.fontUI, fontSize: 12.5, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? T.ink : T.ink3, borderBottom: i === 0 ? `2px solid ${T.accent}` : '2px solid transparent', whiteSpace: 'nowrap' }}>{t}</span>)}</div>
      <div style={{ margin: '8px 14px 0', borderRadius: 20, background: T.surface, border: `1px solid ${T.line}` }}><CustPane T={T} c={c} phone /></div>
      <div style={{ margin: '8px 14px 0', padding: 12, borderRadius: 20, background: T.surface2, border: `1px solid ${T.line}` }}><div style={{ display: 'flex', alignItems: 'baseline' }}><span style={{ fontFamily: T.fontDisplay, fontSize: 16, fontWeight: 600 }}>Orders vs payments · 12 months</span><span style={{ flex: 1 }} /><Legend T={T} items={[['orders', T.accent], ['payments', T.ok]]} /></div><div style={{ marginTop: 8 }}><LineG T={T} series={[{ pts: [8, 12, 10, 14, 13, 18, 16, 21, 19, 24, 22, 26], color: T.accent, width: 2.2 }, { pts: [6, 10, 9, 12, 12, 15, 15, 19, 18, 21, 21, 23], color: T.ok, width: 2, dash: true }]} w={330} h={80} area /></div></div>
    </Body>
    <div style={{ position: 'absolute', left: 14, right: 14, bottom: 98, display: 'flex', gap: 8, padding: 8, borderRadius: 24, ...glass(T) }}><OutBtn T={T} icon="list-checks" style={{ flex: 1, justifyContent: 'center', height: 44 }}>Follow up</OutBtn><T.Btn icon="send" style={{ flex: 1, height: 44 }}>Share</T.Btn></div>
  </>, <T.Island active="CRM" />);
}

Object.assign(window, { AGENCIES, ReportBody, StepSettings, CustHead, QueueStrip, CRM_BOUGHT, crBought, PurchHead, CRM_PACKETS, CRM_ORDERS, CustTabs, PacketsPane, OrdersPane, ScreenCrSharePurch, CRM_STEPS, CRM_LISTS, CRM_C, crC, HEAT, CRM_SUB_P, CRM_REC, CRM_CAT, crTile, CRM_SEL, crValue, Gauge, HeatDot, NextPill, Taste, CrTag, Swatches, CreditBar, StepStrip, FU_STEPS, PAY_STAGES, FollowCard, StepWork, PickPhoto, PickTile, PickThumb, PickHead, PickGrid, CRM_PURCH, CustPane, PacketPane, Seg, Composer, LogoStage, LogoControls, LogoRail, CRM_BILLS, overTone, BillRow, PayPane, CrTop, CrNodes, CrLists, CrHeader, crDock, CrTray,
  ScreenCrFollow, ScreenCrFollowStep, ScreenCrShare, ScreenCrShareCat, ScreenCrPacket, ScreenCrLogo, ScreenCrPay, ScreenCrPayBill, ScreenCrDossier });
