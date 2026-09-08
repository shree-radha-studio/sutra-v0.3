/* NEW DRAFTS · Production (8 Sep 2026) · shared data, components and the phone screens.
   Plan: plans/production.md. Web screens live in mod-production-web.jsx and mod-production-web2.jsx.
   Everything renders through the theme object T (FINAL / FINALD). Names are prefixed Pr… to stay clear of the other
   module files, which share one script scope. Reuses: frameF, scrimF, Hit, Ic, glass, Pill, Progress, Mono, Num,
   Meta, Thumb, Dot, KarigarPill, CallChip, GateToken, Sect, OutBtn, Toast, Sheet, ScanCam, Body, LineG, BarsV. */

/* ── material "photos": the project has no material photographs yet, so a drawn fabric swatch stands in, tinted by
   the shade. Real photos come from Studio › Image upload centre. ── */
const PR_SHADE = { Mono: '#D9D3CA', Grey: '#B9B3AB', Ivory: '#EDE6D6', Gold: '#C9A44A', Wine: '#722F37', Sky: '#8FB3D9', Purple: '#8B6BAE', Peach: '#E8B99B', Lilac: '#B9A3CF', Blush: '#E9B7B7', Seagreen: '#6FA391', Lavender: '#B7A7D9', Pista: '#B7D2A0', Bottle: '#2F6B4A', Mehroon: '#7A2E3A' };
const prShade = n => PR_SHADE[n] || (XD.cols && XD.cols[n]) || '#C9BFB4';
const prTex = (kind, c) => {
  const dk = 'rgba(20,14,10,.22)', lt = 'rgba(255,255,255,.55)';
  switch (kind) {
    case 'net': return { background: `repeating-linear-gradient(0deg, ${dk} 0 1px, transparent 1px 5px), repeating-linear-gradient(90deg, ${dk} 0 1px, transparent 1px 5px), ${c}` };
    case 'cancan': return { background: `repeating-linear-gradient(0deg, ${dk} 0 1.5px, transparent 1.5px 9px), repeating-linear-gradient(90deg, ${dk} 0 1.5px, transparent 1.5px 9px), linear-gradient(180deg, ${lt}, transparent), ${c}` };
    case 'satin': return { background: `linear-gradient(112deg, ${c} 0%, ${lt} 34%, ${c} 52%, rgba(0,0,0,.18) 100%), ${c}` };
    case 'cord': return { background: `repeating-linear-gradient(45deg, ${dk} 0 3px, transparent 3px 8px), ${c}` };
    case 'sequin': return { background: `radial-gradient(circle, ${lt} 0 1.6px, transparent 2.2px) 0 0 / 8px 8px, radial-gradient(circle, ${lt} 0 1.2px, transparent 1.8px) 4px 4px / 8px 8px, ${c}` };
    case 'zari': return { background: `radial-gradient(circle, rgba(255,240,200,.9) 0 1.4px, transparent 2px) 0 0 / 7px 7px, repeating-linear-gradient(135deg, rgba(120,80,20,.25) 0 1px, transparent 1px 4px), ${c}` };
    case 'set': return { background: `linear-gradient(135deg, ${c} 0 58%, ${lt} 58% 60%, ${c} 60%), ${c}`, boxShadow: `inset -18px -18px 0 -10px rgba(0,0,0,.14)` };
    case 'lycra': return { background: `repeating-linear-gradient(90deg, ${lt} 0 1px, transparent 1px 3px), linear-gradient(180deg, transparent, rgba(0,0,0,.2)), ${c}` };
    default: return { background: c };
  }
};
const Swatch = ({ m, w = 44, h = 44, r = 10, style }) => <span style={{ width: w, height: h, borderRadius: r, flex: 'none', display: 'block', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.08)', position: 'relative', overflow: 'hidden', ...prTex(m.tex, prShade(m.shade)), ...style }}>{m.dye && <span style={{ position: 'absolute', left: 0, bottom: 0, right: 0, height: Math.min(20, Math.max(4, h * .16)), background: 'rgba(20,14,10,.55)', color: '#fff', fontFamily: '"Jost", sans-serif', fontSize: Math.min(10, Math.max(7, h * .13)), letterSpacing: '.06em', textTransform: 'uppercase', display: 'grid', placeItems: 'center' }}>dye wip</span>}</span>;

/* ── data ── */
const PR_PROC = [['Dye', 'dye', 'droplets'], ['Touching', 'touch', 'hand'], ['Embroidery', 'emb', 'sparkles'], ['Latkan', 'lat', 'gem'], ['Stitching', 'stitch', 'scissors'], ['Pleating', 'pleat', 'layers'], ['Outing', 'out', 'sun'], ['Choli stitching', 'choli', 'shirt'], ['Saree stitching', 'sar', 'shirt'], ['Ready production', 'ready', 'package-check']];
/* dye is not a sequence step: it runs in the Dye ledger and returns a dye WIP material */
const PR_SEQ_PROC = PR_PROC.filter(p => p[0] !== 'Dye');
/* materials and shades · lastIn dd/mm/yy · stock is godown on hand · dye = lineage of a dyed lot */
const PR_MATS = [
  { id: 'm1', name: 'Mono net', code: 'MN-C09', shade: 'Purple', tex: 'net', group: 'Base fabric', unit: 'm', stock: 218, order: 0, lastIn: '30/08/26', sup: 'Raja Dyers', city: 'Dye · cut order DC-0029', dye: { from: 'Mono net · Mono', dyer: 'Raja Dyers', cut: 'DC-0029', code: 'C09' }, used: 1 },
  { id: 'm2', name: 'Mono net', code: 'MN-C04', shade: 'Sky', tex: 'net', group: 'Base fabric', unit: 'm', stock: 196, order: 0, lastIn: '26/08/26', sup: 'Rafiq Bhai', city: 'Dye · cut order DC-0031', dye: { from: 'Mono net · Mono', dyer: 'Rafiq Bhai', cut: 'DC-0031', code: 'C04' }, used: 2 },
  { id: 'm3', name: 'Santoon', code: 'ST12', shade: 'Peach', tex: 'satin', group: 'Base fabric', unit: 'm', stock: 120, order: 200, lastIn: '24/08/26', sup: 'Surat Textiles', city: 'Surat', price: 62, used: 3 },
  { id: 'm4', name: 'BKS 41', code: 'BKS41-SK', shade: 'Sky', tex: 'set', group: 'Choli set', unit: 'pc', stock: 60, order: 0, lastIn: '22/08/26', sup: 'Surat Textiles', city: 'Surat', price: 480, used: 1 },
  { id: 'm5', name: 'Cancan', code: 'CN01', shade: 'Mono', tex: 'cancan', group: 'Base fabric', unit: 'm', stock: 40, order: 500, lastIn: '20/08/26', sup: 'Local market', city: 'Delhi', price: 28, low: true, reorder: 200, used: 6, consumed: 310 },
  { id: 'm6', name: 'Mono net', code: 'MN-00', shade: 'Mono', tex: 'net', group: 'Base fabric', unit: 'm', stock: 900, order: 0, lastIn: '18/08/26', sup: 'Mumbai Fabrics', city: 'Surat', price: 44, used: 9, withDyers: 3550 },
  { id: 'm7', name: 'Zari thread', code: 'ZR-11', shade: 'Gold', tex: 'zari', group: 'Accessory', unit: 'kg', stock: 2.4, order: 5, lastIn: '15/08/26', sup: 'Surat Textiles', city: 'Surat', price: 1850, used: 4 },
  { id: 'm8', name: 'Haddi', code: 'HD-02', shade: 'Grey', tex: 'cord', group: 'Accessory', unit: 'm', stock: 300, order: 0, lastIn: '12/08/26', sup: 'Local market', city: 'Delhi', price: 9, used: 5 },
  { id: 'm9', name: 'Rasgulla', code: 'RS07', shade: 'Mono', tex: 'sequin', group: 'Accessory', unit: 'm', stock: 0, order: 300, lastIn: '02/08/26', sup: 'Bareilly Works', city: 'Bareilly', price: 35, out: true, used: 4 },
  { id: 'm10', name: 'Santoon', code: 'ST03', shade: 'Sky', tex: 'satin', group: 'Base fabric', unit: 'm', stock: 260, order: 0, lastIn: '30/07/26', sup: 'Surat Textiles', city: 'Surat', price: 62, used: 2 },
  { id: 'm11', name: 'Santoon', code: 'ST06', shade: 'Purple', tex: 'satin', group: 'Base fabric', unit: 'm', stock: 210, order: 0, lastIn: '30/07/26', sup: 'Surat Textiles', city: 'Surat', price: 62, used: 2 },
  { id: 'm12', name: 'BKS 41', code: 'BKS41-PU', shade: 'Purple', tex: 'set', group: 'Choli set', unit: 'pc', stock: 45, order: 0, lastIn: '28/07/26', sup: 'Surat Textiles', city: 'Surat', price: 480, used: 1 },
  { id: 'm13', name: 'Crystal lycra', code: 'CL02', shade: 'Wine', tex: 'lycra', group: 'Designer fabric', unit: 'm', stock: 150, order: 0, lastIn: '20/07/26', sup: 'Ghonzou Imports', city: 'Guangzhou · abroad', price: 210, used: 0 },
  { id: 'm14', name: 'Butta kaam satin', code: 'BKS-01', shade: 'Ivory', tex: 'zari', group: 'Designer fabric', unit: 'pc', stock: 10, order: 40, lastIn: '10/07/26', sup: 'Surat Textiles', city: 'Surat', price: 1250, low: true, reorder: 25, used: 2, consumed: 18 },
];
const prMat = id => PR_MATS.find(m => m.id === id);
const prMatName = m => `${m.name} · ${m.shade}`;
const PR_KARIGARS = [
  { id: 'k1', name: 'Meena Touching Works', skills: ['Touching'], score: 80, onTime: 88, jobs: 4, withThem: '210 pc', bal: 18400, due: 6200, cap: 60, phone: '98110 22334' },
  { id: 'k2', name: 'Saleem Creation', skills: ['Embroidery', 'Latkan'], score: 78, onTime: 74, jobs: 6, withThem: '340 m · 118 pc', bal: 96500, due: 41000, cap: 25, phone: '98991 45210' },
  { id: 'k3', name: 'Imtiaz Latkan', skills: ['Latkan'], score: 66, onTime: 61, jobs: 2, withThem: '64 pc', bal: 9200, due: 0, cap: 40, phone: '98730 90112' },
  { id: 'k4', name: 'Noor Tailors', skills: ['Stitching', 'Choli stitching'], score: 84, onTime: 91, jobs: 5, withThem: '1,120 m · 92 pc', bal: 152000, due: 58800, cap: 30, phone: '98180 33421' },
  { id: 'k5', name: 'Rafiq Bhai', skills: ['Dye'], score: 71, onTime: 70, jobs: 3, withThem: '1,150 m', bal: 12800, due: 4400, cap: 400, phone: '98210 77820' },
  { id: 'k6', name: 'Raja Dyers', skills: ['Dye'], score: 74, onTime: 79, jobs: 2, withThem: '3,200 m', bal: 22000, due: 0, cap: 600, phone: '98680 11930' },
  { id: 'k7', name: 'Gulzar Ready Garments', skills: ['Ready production'], score: 70, onTime: 66, jobs: 1, withThem: '—', bal: 0, due: 0, cap: 20, phone: '98100 56677' },
];
const prK = id => PR_KARIGARS.find(k => k.id === id);
/* the recipe of 2798 · Plazo set (from the owner's workbook, colours Sky · Purple · Peach) */
const PR_D = code => XD.byCode[code] || { code, name: 'Design', cat: 'Lehenga', colours: ['Sky'], price: null };
const PR_RECIPE = { code: '2798', colours: ['Sky', 'Purple', 'Peach'], seq: ['Touching', 'Embroidery', 'Latkan', 'Stitching'], final: 'Stitching',
  /* rows: material id (or wip:<proc>), avg, unit, scope (colour or 'all'), processes it feeds */
  rows: [
    { m: 'm4', avg: 1, unit: 'pc', scope: 'Sky', to: ['Touching'] }, { m: 'm12', avg: 1, unit: 'pc', scope: 'Purple', to: ['Touching'] },
    { m: 'm2', avg: 0.5, unit: 'm', scope: 'Sky', to: ['Embroidery'] }, { m: 'm1', avg: 0.5, unit: 'm', scope: 'Purple', to: ['Embroidery'] }, { m: 'm6', avg: 0.5, unit: 'm', scope: 'Peach', to: ['Embroidery'] },
    { m: 'm7', avg: 0.04, unit: 'kg', scope: 'all', to: ['Embroidery'] },
    { m: 'm6', avg: 0.5, unit: 'm', scope: 'all', to: ['Stitching'], dual: true }, { m: 'm5', avg: 8, unit: 'm', scope: 'all', to: ['Stitching'] }, { m: 'm8', avg: 2, unit: 'm', scope: 'all', to: ['Stitching'] }, { m: 'm9', avg: 5, unit: 'm', scope: 'all', to: ['Stitching'] },
    { m: 'm10', avg: 8, unit: 'm', scope: 'Sky', to: ['Stitching'] }, { m: 'm11', avg: 8, unit: 'm', scope: 'Purple', to: ['Stitching'] }, { m: 'm3', avg: 8, unit: 'm', scope: 'Peach', to: ['Stitching'] },
  ],
  wips: [['Touching', 'Embroidery'], ['Embroidery', 'Latkan'], ['Latkan', 'Stitching'], ['Stitching', null]] };
const prWipName = (proc, code, colour) => `wip_${(PR_PROC.find(p => p[0] === proc) || ['', 'x'])[1]}_${code}${colour ? '_' + colour.toLowerCase() : ''}`;
/* production orders. qty per colour; jobs per process with karigar, rate, tranches [pcs, date, received] and state */
const PR_ORDERS = [
  { no: 'PO-1187', code: '2798', book: 'Lehenga book', date: '12/08/26', end: '20/09/26', by: 'Rohan Mehta', dest: 'Shree Radha Studio', reason: 'Restock', state: 'Process 2 partially received', qty: { Sky: 20, Purple: 25, Peach: 40 }, recd: 27, jobs: [
    { proc: 'Touching', k: 'k1', rate: 40, tr: [[26, '18/08/26', 26], [26, '21/08/26', 26], [33, '24/08/26', 33]], state: 'Finished', issued: 85, recd: 85 },
    { proc: 'Embroidery', k: 'k2', rate: 200, tr: [[26, '26/08/26', 27], [26, '12/09/26', 0], [33, '20/09/26', 0]], state: 'At karigar', issued: 45, recd: 27, next: '12/09/26' },
    { proc: 'Latkan', k: null, rate: null, tr: null, state: 'Waiting on floor', issued: 0, recd: 0, ready: 27, idle: 4 },
    { proc: 'Stitching', k: 'k4', rate: 320, tr: [[26, '10/09/26', 0], [26, '16/09/26', 0], [33, '20/09/26', 0]], state: 'Stuck', issued: 0, recd: 0, short: 'Rasgulla · Cancan short' },
  ] },
  { no: 'PO-1174', code: '3661', book: 'Saree book', date: '04/08/26', end: '12/09/26', by: 'Rohan Mehta', dest: 'Radhika Collection', reason: 'Priority production', state: 'Finished goods verified', qty: { Peach: 30, Pista: 30 }, recd: 46, fgVerified: '06/09/26', jobs: [
    { proc: 'Pleating', k: 'k4', rate: 60, tr: [[18, '10/08/26', 18], [18, '14/08/26', 18], [24, '18/08/26', 24]], state: 'Finished', issued: 60, recd: 60 },
    { proc: 'Stitching', k: 'k4', rate: 180, tr: [[18, '28/08/26', 18], [18, '04/09/26', 18], [24, '12/09/26', 10]], state: 'At karigar', issued: 60, recd: 46, next: '12/09/26' },
  ] },
  { no: 'PO-1192', code: '6002', book: 'Lehenga book', date: '28/08/26', end: '05/10/26', by: 'Priya S', dest: 'Shree Radha Studio', reason: null, state: 'Materials pending', qty: { Lilac: 30, Blush: 30 }, recd: 0, waitsOn: { cut: 'DC-0034', dyer: 'Rafiq Bhai', due: '12/09/26', what: 'Mono net → C11 Lilac · 150 m' }, jobs: [
    { proc: 'Embroidery', k: 'k2', rate: 240, tr: [[18, '20/09/26', 0], [18, '27/09/26', 0], [24, '05/10/26', 0]], state: 'Waiting previous', issued: 0, recd: 0, short: 'dye lot DC-0034 due 12/09' },
    { proc: 'Stitching', k: null, rate: null, tr: null, state: 'Unassigned', issued: 0, recd: 0 },
  ] },
  { no: 'PO-1201', code: '2006', book: 'Saree book', date: '02/09/26', end: '30/09/26', by: 'Rohan Mehta', dest: 'Shree Radha Studio', reason: 'High growth', state: 'Ready for issue', qty: { Lavender: 24, Sky: 24 }, recd: 0, jobs: [
    { proc: 'Embroidery', k: 'k2', rate: 240, tr: [[14, '14/09/26', 0], [14, '21/09/26', 0], [20, '30/09/26', 0]], state: 'Ready to issue', issued: 0, recd: 0, next: '14/09/26' },
    { proc: 'Saree stitching', k: null, rate: null, tr: null, state: 'Unassigned', issued: 0, recd: 0 },
  ] },
  { no: 'PO-1163', code: '1457', book: 'Direct book', date: '20/07/26', end: '30/08/26', by: 'Rohan Mehta', dest: 'Shree Radha Studio', reason: null, state: 'Process 1 issued', qty: { Firozi: 40, Bottle: 20 }, recd: 22, jobs: [
    { proc: 'Ready production', k: 'k7', rate: 900, tr: [[18, '10/08/26', 18], [18, '20/08/26', 4], [24, '30/08/26', 0]], state: 'At karigar', issued: 60, recd: 22, next: '20/08/26', late: 19 },
  ] },
  { no: 'PO-1155', code: 'D9107', book: 'Blouse book', date: '10/07/26', end: '10/08/26', by: 'Priya S', dest: 'Shree Radha Studio', reason: null, state: 'Closed', qty: { Lemon: 50, White: 50 }, recd: 100, jobs: [
    { proc: 'Stitching', k: 'k4', rate: 90, tr: [[30, '25/07/26', 30], [30, '01/08/26', 30], [40, '10/08/26', 40]], state: 'Finished', issued: 100, recd: 100 },
  ] },
  { no: 'PO-1202', code: '1243', book: 'Blouse book', date: '08/09/26', end: '08/10/26', by: 'Priya S', dest: 'Shree Radha Studio', reason: 'Customer shortage', state: 'Awaiting approval', qty: { Mehroon: 24, Rani: 12 }, recd: 0, approval: 'sent 08/09 · PM', jobs: [
    { proc: 'Stitching', k: null, rate: null, tr: null, state: 'Unassigned', issued: 0, recd: 0 },
  ] },
  { no: 'PO-1203', code: '2798', book: 'Lehenga book', date: '08/09/26', end: '20/10/26', by: 'Rohan Mehta', dest: 'Shree Radha Studio', reason: 'Restock', state: 'Draft', qty: { Sky: 20, Purple: 25, Peach: 40 }, recd: 0, jobs: [
    { proc: 'Touching', k: 'k1', rate: 40, tr: null, state: 'Unassigned', issued: 0, recd: 0 }, { proc: 'Embroidery', k: 'k2', rate: 200, tr: null, state: 'Unassigned', issued: 0, recd: 0 }, { proc: 'Latkan', k: null, rate: null, tr: null, state: 'Unassigned', issued: 0, recd: 0 }, { proc: 'Stitching', k: 'k4', rate: 320, tr: null, state: 'Unassigned', issued: 0, recd: 0 },
  ] },
];
const PR_ACTIVE = PR_ORDERS.filter(o => !/Draft|Awaiting/.test(o.state));
const prOrder = no => PR_ORDERS.find(o => o.no === no);
const prQty = o => Object.values(o.qty).reduce((a, b) => a + b, 0);
/* every job of every order as a card */
const PR_JOBS = PR_ORDERS.filter(o => !/Draft|Awaiting/.test(o.state)).flatMap(o => o.jobs.map((j, i) => ({ ...j, id: `${o.no}-J${i + 1}`, o, seqNo: i + 1, code: o.code, d: PR_D(o.code), planned: prQty(o), karigar: j.k ? prK(j.k) : null, prev: i ? o.jobs[i - 1] : null })));
const PR_STATE_TONE = { Unassigned: 'blue', 'Ready to issue': 'ok', 'Waiting on floor': 'warn', Stuck: 'danger', 'Waiting previous': 'muted', 'At karigar': 'blue', Finished: 'ok', 'Partially serviceable': 'warn', Rework: 'warn' };
/* the reason an order exists is an Action tag: filled, tag colour (chips guideline 1.4) */
const PR_REASON_TONE = { 'Priority production': 'warn', Restock: 'blue', 'High growth': 'ok', 'Customer shortage': 'accent' };
const ReasonChip = ({ T, r, small = true }) => r ? <Pill T={T} tone={PR_REASON_TONE[r] || 'muted'} fill small={small}>{r}</Pill> : null;
const JobChip = ({ T, s, small }) => <Pill T={T} tone={PR_STATE_TONE[s] || 'muted'} fill={s === 'Stuck'} small={small}>{s}</Pill>;
const PR_OSTATE_TONE = s => /Closed|verified|Draft/.test(s) ? 'muted' : /Final/.test(s) ? 'ok' : /Materials pending/.test(s) ? 'warn' : /Awaiting/.test(s) ? 'blue' : /Ready/.test(s) ? 'ok' : 'blue';
const OrderPill = ({ T, s, small }) => <Pill T={T} tone={PR_OSTATE_TONE(s)} small={small}>{s}</Pill>;
/* next tranche pill: quiet date · warn when due today or within 2 d · danger fill only when missed */
const prDays = s => { const [d, m, y] = s.split('/'); return Math.round((new Date(2000 + +y, +m - 1, +d) - new Date(2026, 8, 8)) / 864e5); };
const PrNextPill = ({ T, j }) => { if (!j.next || j.state === 'Finished') return null; const late = j.late || prDays(j.next) < 0; const soon = !late && prDays(j.next) <= 2; return <span style={{ fontFamily: T.fontUI, fontSize: 10.5, fontWeight: 600, padding: '2px 7px', borderRadius: 999, background: late ? T.danger : 'transparent', border: `1px solid ${late ? T.danger : soon ? T.warn : T.line2}`, color: late ? '#fff' : soon ? T.warn : T.ink2, whiteSpace: 'nowrap', flex: 'none' }}>{late ? `${j.late || -prDays(j.next)} d late` : soon ? (prDays(j.next) === 0 ? 'due today' : `due ${prDays(j.next)} d`) : j.next.slice(0, 5)}</span>; };
/* tranche pips ●●○ */
const Pips = ({ T, tr, size = 7 }) => <span style={{ display: 'inline-flex', gap: 3, alignItems: 'center', flex: 'none' }}>{(tr || [[], [], []]).map((t, i) => { const done = t[2] >= t[0] && t[0] > 0, part = t[2] > 0 && !done; return <span key={i} style={{ width: size, height: size, borderRadius: size / 2, background: done ? T.ok : part ? `linear-gradient(90deg, ${T.ok} 50%, transparent 50%)` : 'transparent', border: `1.5px solid ${done || part ? T.ok : T.line2}`, boxSizing: 'border-box' }} />; })}</span>;
/* the process timeline: nodes coloured done · active · locked, with the karigar under each on the wide variant */
function ProcTimeline({ T, o, w, wide, active, recipe }) {
  const jobs = recipe ? PR_RECIPE.seq.map(p => ({ proc: p, state: 'Recipe' })) : o.jobs; const n = jobs.length;
  const col = j => recipe ? T.ink2 : j.state === 'Finished' ? T.ok : j.state === 'Stuck' ? T.danger : /At karigar|Ready to issue|Waiting on floor/.test(j.state) ? T.blue : T.line2;
  return <div style={{ display: 'flex', alignItems: 'flex-start', width: w }}>
    {jobs.map((j, i) => { const c = col(j); const on = active === j.proc; return <React.Fragment key={j.proc}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, minWidth: wide ? 0 : 'auto', flex: 'none', width: wide ? undefined : 'auto' }}>
        <span style={{ width: wide ? 22 : 14, height: wide ? 22 : 14, borderRadius: '50%', background: j.state === 'Finished' ? c : T.surface, border: `2px solid ${c}`, boxShadow: on ? `0 0 0 3px ${T.accentSoft}` : 'none', display: 'grid', placeItems: 'center', color: '#fff', fontFamily: T.fontUI, fontSize: 10, fontWeight: 600, boxSizing: 'border-box' }}>{j.state === 'Finished' ? <Ic name="check" size={11} sw={3} /> : wide ? <span style={{ color: c }}>{i + 1}</span> : null}</span>
        {wide && <span style={{ fontFamily: T.fontUI, fontSize: 11.5, fontWeight: on ? 600 : 500, color: on ? T.ink : T.ink2, whiteSpace: 'nowrap' }}>{j.proc}</span>}
        {wide && !recipe && <span style={{ fontFamily: T.fontUI, fontSize: 10.5, color: T.ink3, whiteSpace: 'nowrap' }}>{j.k ? prK(j.k).name.split(' ')[0] : 'unassigned'}{j.recd ? ` · ${j.recd}/${prQty(o)}` : ''}</span>}
        {wide && recipe && <Mono T={T} size={9.5} weight={500} color={T.ink3}>{j.proc === PR_RECIPE.final ? 'finished good' : prWipName(j.proc, '2798')}</Mono>}
        {wide && !recipe && <Pips T={T} tr={j.tr} />}
      </div>
      {i < n - 1 && <span style={{ flex: 1, height: 2, background: j.state === 'Finished' ? T.ok : T.line2, marginTop: wide ? 10 : 6, minWidth: wide ? 18 : 10 }} />}
    </React.Fragment>; })}
  </div>;
}
/* the per-colour bars on order cards */
const ColourQty = ({ T, o, small }) => <span style={{ display: 'inline-flex', gap: 6, flexWrap: 'wrap' }}>{Object.entries(o.qty).map(([c, q]) => <span key={c} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: T.fontUI, fontSize: small ? 11 : 12, color: T.ink2, whiteSpace: 'nowrap' }}><Dot n={c} s={small ? 7 : 8} />{c} <b style={{ color: T.ink, fontVariantNumeric: 'tabular-nums' }}>{q}</b></span>)}</span>;
/* job card: image ⅔, top band (job no · design · karigar), bottom band (one chip, next tranche, progress, pips) */
function JobCard({ T, j, w = 200, on, compact, style }) {
  const d = j.d; const ph = typeof w === 'number' ? Math.round(w * (compact ? .78 : 1.05)) : undefined;
  return <div className="press" style={{ width: w, borderRadius: 18, overflow: 'hidden', background: T.surface, border: `1px solid ${on ? T.accentLine : T.line}`, boxShadow: on ? `0 0 0 2px ${T.accentSoft}` : T.dark ? 'none' : '0 8px 20px -14px rgba(36,23,18,.3)', flex: 'none', ...style }}>
    <div style={{ position: 'relative', height: ph, aspectRatio: ph ? undefined : (compact ? '1 / 0.78' : '1 / 1.05'), background: T.photoBg }}>
      {d.src ? <img src={d.src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /> : <span style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontFamily: T.fontDisplay, fontSize: 26, color: T.ink3 }}>{d.code}</span>}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, padding: '7px 9px', display: 'flex', alignItems: 'center', gap: 6, background: 'linear-gradient(180deg, rgba(20,18,17,.5), rgba(20,18,17,0))', color: '#fff' }}><span style={{ fontFamily: T.fontMono, fontSize: 10.5, fontWeight: 600 }}>{j.id}</span><span style={{ flex: 1 }} /><span style={{ fontFamily: T.fontUI, fontSize: 10.5, letterSpacing: '.06em', textTransform: 'uppercase' }}>{j.proc}</span></div>
      <div style={{ position: 'absolute', left: 8, bottom: 8, display: 'flex', alignItems: 'center', gap: 6, padding: '4px 8px 4px 5px', borderRadius: 999, ...veil(), fontFamily: T.fontUI, fontSize: 11 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 15, fontWeight: 600 }}>{d.code}</span><span style={{ opacity: .85 }}>{j.karigar ? j.karigar.name.split(' ').slice(0, 2).join(' ') : 'no karigar'}</span></div>
    </div>
    <div style={{ padding: '8px 10px 10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><JobChip T={T} s={j.state} small /><span style={{ flex: 1 }} /><PrNextPill T={T} j={j} /></div>
      {(j.short || j.state === 'Waiting on floor') && <Meta T={T} style={{ display: 'block', marginTop: 5, color: j.state === 'Stuck' ? T.danger : T.ink2 }}>{j.state === 'Waiting on floor' ? `${j.ready} pcs back · idle ${j.idle} d · no karigar` : `waits on ${j.short}`}</Meta>}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 7 }}><Progress T={T} v={j.planned ? j.recd / j.planned : 0} w={compact ? 60 : 80} tone={j.state === 'Finished' ? T.ok : T.blue} /><Meta T={T} style={{ flex: 1 }}>{j.issued ? `out ${j.issued} · back ${j.recd}` : `0/${j.planned}`}{j.shortFor ? ` · ${j.shortFor} for customers` : ''}</Meta><Pips T={T} tr={j.tr} /></div>
    </div>
  </div>;
}
/* material rows and cards for the catalogue and the process-setting pane */
const StockWord = ({ T, m }) => m.out ? <Pill T={T} tone="danger" fill small>Out</Pill> : m.low && m.reorder ? <Pill T={T} tone="warn" small>Low · below {m.reorder} {m.unit}</Pill> : null;
function MatRow({ T, m, right, compact, on, added, tick }) {
  return <div className="press" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: compact ? '6px 6px' : '8px 8px', borderRadius: 14, background: on ? T.accentSoft : 'transparent', borderTop: compact ? `1px solid ${T.line}` : 0 }}>
    <Swatch m={m} w={compact ? 38 : 46} h={compact ? 46 : 56} r={9} />
    <span style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}><span style={{ fontFamily: T.fontDisplay, fontSize: compact ? 15 : 17, fontWeight: 600, color: T.ink, whiteSpace: 'nowrap' }}>{m.name}</span><span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: prShade(m.shade) }} />{m.shade}</span><StockWord T={T} m={m} /></div>
      <Meta T={T} style={{ display: 'block', marginTop: 2 }}>{m.code} · {m.group} · in {m.lastIn}{m.dye ? ` · ${m.dye.dyer}` : ` · ${m.sup}`}</Meta>
    </span>
    {right || <span style={{ textAlign: 'right', flex: 'none' }}><div style={{ fontFamily: T.fontDisplay, fontSize: 16, fontWeight: 600, color: m.out ? T.danger : T.ink, fontVariantNumeric: 'tabular-nums' }}>{m.stock} {m.unit}</div>{m.order ? <Meta T={T}>{m.order} {m.unit} on order</Meta> : <Meta T={T}>in godown</Meta>}</span>}
    {tick && <span style={{ width: 24, height: 24, borderRadius: 12, background: added ? T.ink : 'transparent', border: `1.5px solid ${added ? T.ink : T.line2}`, color: T.bg, display: 'grid', placeItems: 'center', flex: 'none' }}>{added ? <Ic name="check" size={12} sw={3} /> : <Ic name="plus" size={12} sw={2} color={T.ink2} />}</span>}
  </div>;
}
function MatCard({ T, m, w, on }) {
  return <div className="press" style={{ borderRadius: 18, overflow: 'hidden', background: T.surface, border: `1px solid ${on ? T.accentLine : T.line}`, boxShadow: on ? `0 0 0 2px ${T.accentSoft}` : 'none', width: w, minWidth: 0 }}>
    <div style={{ position: 'relative' }}><Swatch m={m} w="100%" h={w ? Math.round(w * .78) : 120} r={0} style={{ width: '100%' }} /><span style={{ position: 'absolute', top: 8, left: 8, display: 'flex', gap: 4 }}>{(m.out || (m.low && m.reorder)) && <T.PhotoTag tone={m.out ? 'danger' : undefined}>{m.out ? 'Out' : 'Low'}</T.PhotoTag>}</span></div>
    <div style={{ padding: '8px 10px 10px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 17, fontWeight: 600, color: T.ink, flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.name}</span><span style={{ fontFamily: T.fontDisplay, fontSize: 15, fontWeight: 600, color: m.out ? T.danger : T.ink, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{m.stock} {m.unit}</span></div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink3, whiteSpace: 'nowrap', overflow: 'hidden' }}><span style={{ width: 8, height: 8, borderRadius: 2, background: prShade(m.shade), flex: 'none' }} /><span style={{ color: T.ink2 }}>{m.shade}</span><span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>· {m.code} · in {m.lastIn}</span></div>
      <Meta T={T} style={{ display: 'block', marginTop: 2, fontSize: 11 }}>{m.group} · {m.dye ? m.dye.dyer : m.sup}{m.order ? ` · ${m.order} ${m.unit} on order` : ''}</Meta>
    </div>
  </div>;
}
/* dye ledger data */
const PR_DYERS = [{ k: 'k6', bal: [['Mono net · Mono', 2400, 'm'], ['Santoon · Mono', 800, 'm']] }, { k: 'k5', bal: [['Mono net · Mono', 1150, 'm']] }];
const PR_CUTS = [
  { no: 'DC-0035', mat: 'Mono net · Mono', dyer: 'k6', code: 'C07', shade: 'Peach', qty: 120, recd: 0, due: '15/09/26', for: '2798 · PO-1187 · Peach', forCode: '2798', state: 'With dyer' },
  { no: 'DS-0007', mat: 'Mono net · Mono', dyer: 'k5', code: 'b4', shade: 'Bottle', qty: 60, recd: 0, due: '14/09/26', for: '1457 · restock', forCode: '1457', state: 'With dyer', single: true },
  { no: 'DC-0034', mat: 'Mono net · Mono', dyer: 'k5', code: 'C11', shade: 'Lilac', qty: 150, recd: 0, due: '12/09/26', for: '6002 · PO-1192', forCode: '6002', state: 'With dyer' },
  { no: 'DC-0036', mat: 'Mono net · Mono', dyer: 'k6', code: 'C22', shade: 'Blush', qty: 3, recd: 2.9, due: '02/09/26', for: 'Sample S-0412', forCode: '4566', state: 'Received' },
  { no: 'DC-0031', mat: 'Mono net · Mono', dyer: 'k5', code: 'C04', shade: 'Sky', qty: 200, recd: 196, due: '25/08/26', for: '2798 · PO-1187 · Sky', forCode: '2798', state: 'Received' },
  { no: 'DC-0029', mat: 'Mono net · Mono', dyer: 'k6', code: 'C09', shade: 'Purple', qty: 220, recd: 218, due: '28/08/26', for: '2798 · PO-1187 · Purple', forCode: '2798', state: 'Received' },
];
/* samples */
const PR_SAMPLES = [
  { no: 'S-0412', d: PR_D('4566'), cat: 'Lehenga · cape', colours: ['Blush'], where: 'Stitching · Noor Tailors · 3 d', moves: 3, cost: 4120, tab: 'In designing', started: '20/08/26', target: 12995, chips: ['Costing pending'] },
  { no: 'S-0418', d: { code: 'S-0418', name: 'Organza kali', cat: 'Lehenga', colours: ['Pista'] }, cat: 'Lehenga', colours: ['Pista', 'Lemon'], where: 'Dye · Rafiq Bhai · 6 d', moves: 1, cost: 640, tab: 'In designing', started: '31/08/26', target: null, chips: [] },
  { no: 'S-0409', d: { code: 'S-0409', name: 'Lavender drape', cat: 'Saree', colours: ['Lavender'] }, cat: 'Saree', colours: ['Lavender'], where: 'Back in hand · 1 pc', moves: 4, cost: 2860, tab: 'Deployed, no production', started: '02/08/26', target: 4995, read: 9, chips: ['Reading 9/15', 'High growth'] },
  { no: 'S-0401', d: PR_D('6002'), cat: 'Lehenga', colours: ['Lilac', 'Blush'], where: 'Made into 6002 · PO-1192', moves: 5, cost: 6210, tab: 'Production started', started: '12/07/26', target: 4995, chips: [] },
  { no: 'S-0415', d: { code: 'S-0415', name: 'Mirror kali', cat: 'Lehenga', colours: ['Wine'] }, cat: 'Lehenga', colours: ['Wine'], where: 'Embroidery · Saleem Creation · 9 d', moves: 2, cost: 2240, tab: 'In designing', started: '26/08/26', target: null, chips: [] },
  { no: 'S-0416', d: PR_D('2798'), cat: 'Plazo set · variant', colours: ['Peach'], where: 'Latkan · Imtiaz Latkan · 2 d', moves: 3, cost: 1980, tab: 'In designing', started: '28/08/26', target: 5495, chips: ['Costing pending'] },
  { no: 'S-0405', d: PR_D('3661'), cat: 'Saree', colours: ['Pista'], where: 'Back in hand · 2 pc', moves: 3, cost: 1720, tab: 'Deployed, no production', started: '10/08/26', target: 5995, read: 12, chips: ['Reading 12/15'] },
  { no: 'S-0398', d: { code: 'S-0398', name: 'Cape blouse', cat: 'Blouse', colours: ['Lemon'] }, cat: 'Blouse', colours: ['Lemon'], where: 'Back in hand · 1 pc · re-reading', moves: 4, cost: 940, tab: 'Deployed, no production', started: '20/07/26', target: 1495, read: 15, chips: ['Re-reading'] },
  { no: 'S-0411', d: { code: 'S-0411', name: 'Net anarkali', cat: 'Anarkali', colours: ['Seagreen'] }, cat: 'Anarkali', colours: ['Seagreen'], where: 'Activated · 2 pc in Catalogue', moves: 5, cost: 3310, tab: 'Activated', started: '30/07/26', target: 7995, chips: ['High growth'] },
];
const PR_MOVES = [
  { n: 1, proc: 'Dye', k: 'k5', colour: 'Blush', out: [['m6', 3, 'm']], date: '20/08/26', ch: 'SI-0412-1', gt: 'GT-260820-004', back: 'Mono net · C22 Blush · 2.9 m', backDate: '24/08/26', loss: '0.1 m', rej: 0, rate: '₹18/m', cost: 54, state: 'Received' },
  { n: 2, proc: 'Embroidery', k: 'k2', colour: 'Blush', out: [['dye', 2.9, 'm'], ['m7', 0.05, 'kg']], date: '25/08/26', ch: 'SI-0412-2', gt: 'GT-260825-011', back: 'wip_emb_S0412 · 1 pc', backDate: '02/09/26', loss: '0', rej: 0, rate: '₹1,800/pc', cost: 1800, state: 'Received' },
  { n: 3, proc: 'Stitching', k: 'k4', colour: 'Blush', out: [['wip', 1, 'pc'], ['m3', 8, 'm'], ['m5', 8, 'm']], date: '05/09/26', ch: 'SI-0412-3', gt: 'GT-260905-018', back: null, backDate: null, rate: '₹2,200/pc', cost: 2200, due: '10/09/26', state: 'With karigar · due 10/09/26' },
];
const prMoveLine = ([id, q, u]) => id === 'dye' ? { name: 'Mono net · C22 Blush', tex: 'net', shade: 'Blush', dye: true, q, u } : id === 'wip' ? { name: 'wip_emb_S0412', tex: 'sequin', shade: 'Blush', q, u } : { ...prMat(id), name: prMatName(prMat(id)), q, u };
/* one move of a sample: process · karigar · what went out · what came back · the rate only for money roles */
function MoveCard({ T, mv, phone, on, money = !phone }) {
  const k = prK(mv.k); const lines = mv.out.map(prMoveLine);
  return <div className="press" style={{ padding: phone ? 10 : 12, borderRadius: 16, background: T.surface, border: `1px solid ${on ? T.accentLine : T.line}`, boxShadow: on ? `0 0 0 2px ${T.accentSoft}` : 'none', minWidth: 0 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 22, height: 22, borderRadius: 11, background: T.ink, color: T.bg, display: 'grid', placeItems: 'center', fontFamily: T.fontUI, fontSize: 11, fontWeight: 600, flex: 'none' }}>{mv.n}</span><span style={{ fontFamily: T.fontDisplay, fontSize: 17, fontWeight: 600 }}>{mv.proc}</span><Dot n={mv.colour} s={7} /><span style={{ flex: 1 }} /><Pill T={T} tone={mv.back ? 'ok' : 'blue'} small>{mv.back ? 'Received' : 'With karigar'}</Pill></div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6, flexWrap: 'wrap' }}><KarigarPill T={T} name={k.name} score={k.score} /><Meta T={T}>{mv.date} · {mv.ch}</Meta>{!phone && mv.gt && <GateToken T={T} n={mv.gt} done />}</div>
    <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>{lines.map((l, i) => <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 8px 3px 3px', borderRadius: 999, background: T.chipBg, fontFamily: T.fontUI, fontSize: 11.5, whiteSpace: 'nowrap' }}><Swatch m={l} w={20} h={20} r={6} />{l.name} <b>{l.q} {l.u}</b></span>)}</div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, fontFamily: T.fontUI, fontSize: 12 }}><Ic name="corner-down-left" size={13} color={T.ink3} />{mv.back ? <span style={{ flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{mv.back} <Meta T={T}>· {mv.backDate}{mv.loss && mv.loss !== '0' ? ` · loss ${mv.loss}` : ''}{mv.rej ? <span style={{ color: T.danger }}> · rejected {mv.rej}</span> : ''}</Meta></span> : <Meta T={T}>{mv.state}</Meta>}<span style={{ flex: 1 }} />{money ? <Meta T={T}>{mv.rate}</Meta> : mv.due ? <Meta T={T}>due {mv.due.slice(0, 5)}</Meta> : null}</div>
  </div>;
}

/* ── phone chrome: top bar with the role, search island, sub-menu scroller ── */
const PR_NODES_P = [['home', 'Overview', null], ['layout-grid', 'Job cards', 61], ['scroll-text', 'Orders', 12], ['flask-conical', 'Samples', 9], ['droplets', 'Dye', 2], ['layers', 'Materials', null], ['git-branch', 'Process setting', null], ['package-check', 'Purchase', 3], ['hammer', 'Karigars', null], ['calculator', 'Costing', null]];
function PrTop({ T, title, back, role = 'Production' }) {
  return <div style={{ display: 'flex', alignItems: 'center', padding: '0 10px 0 12px', height: 44, gap: 4 }}>{back ? <Hit T={T} icon="chevron-left" size={40} /> : null}{title ? <span style={{ fontFamily: T.fontDisplay, fontSize: 22, fontWeight: 500, color: T.ink, marginLeft: back ? 0 : 6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</span> : <T.Lockup compact />}<span style={{ flex: 1 }} /><span style={{ fontFamily: T.fontUI, fontSize: 12, color: T.ink3, marginRight: 4 }}>{role}</span><Hit T={T} icon="qr-code" size={40} iconSize={18} /><Hit T={T} icon="ellipsis-vertical" size={40} /></div>;
}
function PrNodes({ T, active }) {
  return <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 4, padding: '8px 36px 0 12px', overflow: 'hidden' }}>{PR_NODES_P.map(([ic, l, n]) => { const on = l === active; return <span key={l} className="press" style={{ flex: 'none', display: 'inline-flex', alignItems: 'center', gap: 5, padding: on ? '4px 12px' : '4px 8px', borderRadius: 999, background: on ? T.ink : 'transparent', color: on ? T.bg : T.ink2, fontFamily: T.fontDisplay, fontSize: 16.5, fontWeight: 500, whiteSpace: 'nowrap' }}>{l}{n != null && <span style={{ fontFamily: T.fontUI, fontSize: 10.5, fontWeight: 600, padding: '1px 6px', borderRadius: 999, background: on ? 'rgba(255,255,255,.18)' : T.chipBg, color: on ? T.bg : T.ink2 }}>{n}</span>}</span>; })}<span style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 60, background: `linear-gradient(90deg, transparent, ${T.bg} 60%)`, pointerEvents: 'none' }} /><span className="press" style={{ position: 'absolute', right: 10, top: 12, width: 24, height: 24, borderRadius: 12, background: T.chipBg, color: T.ink2, display: 'grid', placeItems: 'center' }}><Ic name="chevron-right" size={13} sw={2.2} /></span></div>;
}
function PrHeader({ T, node, chips, count, placeholder = 'Design, order, job, karigar', title, back, noSearch }) {
  return <div style={{ background: T.header, borderBottom: `1px solid ${T.line}`, boxShadow: T.headerShadow, paddingBottom: 8, marginTop: -54, paddingTop: 54, flex: 'none' }}><PrTop T={T} title={title} back={back} />{!noSearch && <DSearch T={T} placeholder={placeholder} />}{node && <PrNodes T={T} active={node} />}{chips && <><div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 12px 0', overflow: 'hidden' }}>{count && <span style={{ fontFamily: T.fontUI, fontSize: 12, color: T.ink3, whiteSpace: 'nowrap', flex: 'none', marginRight: 2 }}>{count}</span>}{[...chips.filter(c => c[1]), ...chips.filter(c => !c[1])].map(([l, on, x, caret]) => <T.Chip key={l} on={on} outline={!on} x={on && !caret} style={{ height: 28 }}>{l}{caret && <Ic name="chevron-down" size={12} />}</T.Chip>)}</div><div style={{ margin: '6px 12px 0', height: 2, borderRadius: 1, background: T.line }}><span style={{ display: 'block', width: '38%', height: 2, borderRadius: 1, background: T.accent }} /></div></>}</div>;
}
const prDock = T => <T.Dock active="Production" noCart />;
const PrLab = ({ T, children, right, style }) => <div style={{ display: 'flex', alignItems: 'baseline', fontFamily: T.fontUI, fontSize: 10, letterSpacing: '.06em', textTransform: 'uppercase', color: T.ink3, marginBottom: 5, ...style }}>{children}<span style={{ flex: 1 }} />{right}</div>;
/* form field as displayed (mockup): label, value or placeholder, optional caret */
const Field = ({ T, label, value, ph, caret, icon, w, style, small, tone }) => <div style={{ width: w, flex: w ? 'none' : 1, minWidth: 0, ...style }}>{label && <PrLab T={T}>{label}</PrLab>}<div style={{ display: 'flex', alignItems: 'center', gap: 6, height: small ? 32 : 38, padding: '0 10px', borderRadius: 11, background: T.surface, border: `1px solid ${tone === 'danger' ? T.danger : T.line2}`, fontFamily: T.fontUI, fontSize: small ? 12 : 13, color: value != null ? T.ink : T.ink3, whiteSpace: 'nowrap', overflow: 'hidden' }}>{icon && <Ic name={icon} size={13} color={T.ink3} />}<span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>{value != null ? value : ph}</span>{caret && <Ic name="chevron-down" size={13} color={T.ink3} />}</div></div>;
/* a light table: cols = [label, width | null, align] · rows = arrays of nodes */
function Tbl({ T, cols, rows, lead = 0, pad = '7px 10px', onRow, dense, head = true }) {
  const cell = (c, v, k) => <span key={k} style={{ width: c[1], flex: c[1] ? 'none' : 1, minWidth: 0, textAlign: c[2] || (c[1] && k > 0 ? 'right' : 'left'), whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontVariantNumeric: 'tabular-nums' }}>{v}</span>;
  return <div style={{ fontFamily: T.fontUI, fontSize: dense ? 11.5 : 12.5, color: T.ink }}>
    {head && <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: dense ? '3px 10px' : '4px 10px' }}>{lead ? <span style={{ width: lead, flex: 'none' }} /> : null}{cols.map((c, k) => <span key={k} style={{ width: c[1], flex: c[1] ? 'none' : 1, textAlign: c[2] || (c[1] && k > 0 ? 'right' : 'left'), fontSize: 10, letterSpacing: '.06em', textTransform: 'uppercase', color: T.ink3, whiteSpace: 'nowrap', overflow: 'hidden' }}>{c[0]}</span>)}</div>}
    {rows.map((r, i) => <div key={i} className={onRow ? 'press' : undefined} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: dense ? '5px 10px' : pad, borderTop: `1px solid ${T.line}`, background: onRow === i ? T.accentSoft : 'transparent', borderRadius: onRow === i ? 10 : 0 }}>{lead ? <span style={{ width: lead, flex: 'none' }} /> : null}{r.map((v, k) => cell(cols[k], v, k))}</div>)}
  </div>;
}
const prMoney = n => '₹' + n.toLocaleString('en-IN');

/* ── inputs table of one job for one colour (lifecycle) ── */
const prInputs = (job, colour, ordered) => {
  const rows = [];
  PR_RECIPE.rows.filter(r => r.to.includes(job.proc) && (r.scope === 'all' || r.scope === colour)).forEach(r => { const m = prMat(r.m); rows.push({ kind: 'MAT', m, name: prMatName(m), avg: r.avg, unit: r.unit, stock: m.stock, low: m.low, out: m.out }); });
  const w = PR_RECIPE.wips.find(x => x[1] === job.proc);
  const issuedPcs = job.proc === 'Touching' ? ordered : job.proc === 'Embroidery' ? Math.round(45 * ordered / 85) : 0;
  if (w) { const prev = PR_ORDERS.find(o => o.no === 'PO-1187').jobs.find(j => j.proc === w[0]); const prevBack = prev ? Math.round(prev.recd * ordered / 85) : 0; rows.push({ kind: 'WIP', name: prWipName(w[0], '2798', colour), avg: 1, unit: 'pc', stock: Math.max(0, prevBack - issuedPcs), wip: true, from: w[0], prevBack }); }
  return rows.map(r => { const req = +(r.avg * ordered).toFixed(1); const issued = +(r.avg * issuedPcs).toFixed(1); return { ...r, req, issued, bal: +(req - issued).toFixed(1) }; });
};
function InputsTable({ T, job, colour, ordered, phone, withStock = true }) {
  const rows = prInputs(job, colour, ordered);
  const cols = phone ? [['Input'], ['Avg', 40], ['Req', 46], ['Issued', 50], ['Bal', 44]] : [['Input (material / wip)'], ['Avg/pc', 52], ['Required', 70], ['Unit', 40, 'left'], ['Issued', 60], ['Balance', 62], ['Progress', 90, 'left'], ...(withStock ? [['Stock', 120, 'left']] : [])];
  return <Tbl T={T} cols={cols} dense={phone} rows={rows.map(r => [
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, minWidth: 0 }}>{r.m ? <Swatch m={r.m} w={phone ? 26 : 30} h={phone ? 30 : 36} r={7} /> : <span style={{ width: phone ? 26 : 30, height: phone ? 30 : 36, borderRadius: 7, background: T.chipBg, display: 'grid', placeItems: 'center', flex: 'none' }}><Ic name="layers" size={13} color={T.ink2} /></span>}<span style={{ minWidth: 0 }}><div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ fontFamily: T.fontUI, fontSize: 9.5, letterSpacing: '.06em', textTransform: 'uppercase', color: r.wip ? T.blue : T.ink3, fontWeight: 600 }}>{r.kind}</span><span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 500 }}>{r.name}</span></div>{!phone && r.m && r.m.dye && <Meta T={T} style={{ fontSize: 10.5 }}>dye wip · {r.m.dye.cut}</Meta>}</span></span>,
    r.avg, r.req, ...(phone ? [r.issued, <span style={{ color: r.bal > 0 && r.out ? T.danger : T.ink }}>{r.bal}</span>] : [r.unit, r.issued, r.bal, <Progress T={T} v={r.req ? r.issued / r.req : 0} w={80} tone={r.issued >= r.req ? T.ok : T.accent} />, ...(withStock ? [r.bal <= 0 ? <Meta T={T}>done</Meta> : r.wip && r.stock <= 0 ? <span style={{ color: T.ink3, fontFamily: T.fontUI, fontSize: 11.5 }}>waiting on {r.from}</span> : r.out || r.stock < r.bal ? <span style={{ color: T.danger, fontFamily: T.fontUI, fontSize: 11.5, fontWeight: 600 }}>{r.stock} {r.unit} · short {+(r.bal - r.stock).toFixed(1)}</span> : <span style={{ color: T.ok, fontFamily: T.fontUI, fontSize: 11.5 }}>{r.stock} {r.unit} {r.wip ? `in hand · from ${r.from}` : 'in stock'}</span>] : [])]),
  ])} />;
}
/* colour-wise table: ordered · issued for · balance · R1 R2 R3 · total */
function ColourTable({ T, o, job, phone }) {
  const tot = prQty(o); const share = c => o.qty[c] / tot;
  const rej = { Sky: 1, Purple: 0, Peach: 0 };
  const mk = c => { const ord = o.qty[c]; const iss = Math.round(job.issued * share(c)); const r = (job.tr || []).map(t => Math.round((t[2] || 0) * share(c))); const tot = r.reduce((a, b) => a + b, 0); return { ord, iss, r, tot, rj: rej[c] || 0 }; };
  const rows = Object.keys(o.qty).map(c => { const x = mk(c); return [<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Dot n={c} />{c}<span className="press" style={{ marginLeft: 4, color: T.ink3 }}><Ic name="history" size={11} /></span></span>, x.ord, x.iss, x.ord - x.iss, ...(phone ? [x.tot + (x.rj ? ` +${x.rj} rej` : '')] : [x.r[0] || 0, x.r[1] || 0, x.r[2] || 0, x.tot, x.rj ? <span style={{ color: T.danger }}>{x.rj} · 0</span> : '0 · 0'])]; });
  const all = Object.keys(o.qty).map(mk); const sum = f => all.reduce((a, x) => a + f(x), 0);
  rows.push([<b>Totals · all colours</b>, <b>{sum(x => x.ord)}</b>, <b>{sum(x => x.iss)}</b>, <b>{sum(x => x.ord - x.iss)}</b>, ...(phone ? [<b>{sum(x => x.tot)}</b>] : [<b>{sum(x => x.r[0] || 0)}</b>, <b>{sum(x => x.r[1] || 0)}</b>, <b>{sum(x => x.r[2] || 0)}</b>, <b>{sum(x => x.tot)}</b>, <b>{sum(x => x.rj)} · 0</b>])]);
  const cols = phone ? [['Colour'], ['Ordered', 56], ['Issued for', 64], ['Bal', 40], ['Recd', 60]] : [['Colour'], ['Ordered', 62], ['Issued for', 72], ['Balance pcs', 78], [(job.tr && job.tr[0] ? 'R1 · ' + job.tr[0][1].slice(0, 5) : 'R1'), 74], [(job.tr && job.tr[1] ? 'R2 · ' + job.tr[1][1].slice(0, 5) : 'R2'), 74], [(job.tr && job.tr[2] ? 'R3 · ' + job.tr[2][1].slice(0, 5) : 'R3'), 74], ['Received', 66], ['Rej · loss', 64]];
  return <Tbl T={T} cols={cols} dense={phone} rows={rows} />;
}
const PR_HIST = [['MI-00214', 'issue', 'Sky', 20, 'k2', 'GT-260826-031', '26/08/26 10:40', 'OE/MI/58/26-27'], ['MI-00215', 'issue', 'Purple', 25, 'k2', 'GT-260826-032', '26/08/26 10:52', 'OE/MI/59/26-27'], ['MR-00118', 'receive', 'Sky', 15, 'k2', 'GT-260904-012', '04/09/26 16:10', 'OE/MR/31/26-27'], ['MR-00119', 'receive', 'Purple', 12, 'k2', 'GT-260906-007', '06/09/26 11:25', 'OE/MR/33/26-27'], ['MR-00121', 'receive', 'Peach', 3, 'k2', null, '08/09/26 11:20', null, 'unverified']];
const InOut = ({ T, t }) => <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: T.fontUI, fontSize: 10.5, fontWeight: 600, letterSpacing: '.05em', color: T.ink }}><Ic name={t === 'issue' ? 'arrow-up-right' : 'arrow-down-left'} size={12} color={t === 'issue' ? T.ink2 : T.ok} />{t === 'issue' ? 'OUT' : 'IN'}</span>;
function HistoryRows({ T, rows = PR_HIST, phone }) {
  return <Tbl T={T} dense={phone} cols={phone ? [['Challan'], ['Type', 44, 'left'], ['Colour', 58, 'left'], ['Pcs', 30], ['When', 52, 'left'], ['', 62, 'left']] : [['Challan', 78, 'left'], ['Type', 50, 'left'], ['Colour', 72, 'left'], ['Pcs', 36], ['Karigar'], ['Accounts voucher', 116, 'left'], ['Gate token', 122, 'left'], ['When', 100, 'left'], ['', 64]]} rows={rows.map(r => { const unv = r[8] === 'unverified'; return [<Mono T={T} size={11.5}>{r[0]}</Mono>, <InOut T={T} t={r[1]} />, <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Dot n={r[2]} />{r[2]}</span>, r[3], ...(phone ? [r[6].slice(0, 5), unv ? <span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 3, color: T.warn, fontFamily: T.fontUI, fontSize: 10.5, fontWeight: 600 }}><Ic name="badge-alert" size={11} />verify</span> : null] : [unv ? <span>{prK(r[4]).name}<Meta T={T}> · recorded by the karigar</Meta></span> : prK(r[4]).name, r[7] ? <Mono T={T} size={10.5} weight={500} color={T.ink2}>{r[7]}</Mono> : unv ? <Pill T={T} tone="warn" small>Unverified</Pill> : <Meta T={T}>syncing…</Meta>, r[5] ? <GateToken T={T} n={r[5]} done /> : <Meta T={T}>on verify</Meta>, r[6], unv ? <span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: T.accent, fontSize: 11.5, fontWeight: 600 }}><Ic name="badge-check" size={13} />Verify</span> : <span className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: T.ink2, fontSize: 11 }}><Ic name="printer" size={12} />sticker</span>])]; })} />;
}

/* ── phone screens ── */
/* a job as one row for the floor list: photo left, bands right */
function JobRow({ T, j, on }) {
  const d = j.d;
  return <div className="press" style={{ display: 'flex', gap: 10, padding: 8, borderRadius: 18, background: T.surface, border: `1px solid ${on ? T.accentLine : T.line}`, marginBottom: 8 }}>
    <div style={{ position: 'relative', width: 88, height: 110, borderRadius: 14, overflow: 'hidden', background: T.photoBg, flex: 'none' }}>{d.src ? <img src={d.src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /> : <span style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontFamily: T.fontDisplay, fontSize: 20, color: T.ink3 }}>{d.code}</span>}<span style={{ position: 'absolute', left: 6, bottom: 6, padding: '2px 6px', borderRadius: 999, ...veil(), fontFamily: T.fontDisplay, fontSize: 13, fontWeight: 600 }}>{d.code}</span></div>
    <span style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Mono T={T} size={11}>{j.id}</Mono><span style={{ flex: 1 }} /><span style={{ fontFamily: T.fontUI, fontSize: 10.5, letterSpacing: '.06em', textTransform: 'uppercase', color: T.ink3 }}>{j.proc}</span></div>
      <div style={{ fontFamily: T.fontUI, fontSize: 13, fontWeight: 500, marginTop: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{j.karigar ? j.karigar.name : 'no karigar yet'}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}><JobChip T={T} s={j.state} small /><span style={{ flex: 1 }} /><PrNextPill T={T} j={j} /></div>
      {(j.short || j.state === 'Waiting on floor') && <Meta T={T} style={{ display: 'block', marginTop: 4, color: j.state === 'Stuck' ? T.danger : T.ink2 }}>{j.state === 'Waiting on floor' ? `${j.ready} pcs back · idle ${j.idle} d` : `waits on ${j.short}`}</Meta>}
      <span style={{ flex: 1 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Progress T={T} v={j.planned ? j.recd / j.planned : 0} w={80} tone={j.state === 'Finished' ? T.ok : T.blue} /><Meta T={T} style={{ flex: 1 }}>out {j.issued} · back {j.recd} · of {j.planned}</Meta><Pips T={T} tr={j.tr} /></div>
    </span>
  </div>;
}
/* P11 Job cards · list */
function ScreenPJobs({ T }) {
  const jobs = PR_JOBS.filter(j => j.state !== 'Finished').slice(0, 4);
  return frameF(T, <><PrHeader T={T} node="Job cards" count="61 jobs · 18 urgent" chips={[['Active', true, false, true], ['Unassigned', true], ['Ready to issue', false], ['Waiting on floor', false], ['Tranche due today', false], ['At karigar', false]]} />
    <Body><div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}><T.Chip icon="arrow-down-up" outline style={{ height: 28 }}>Urgency</T.Chip><T.Chip icon="bookmark" outline style={{ height: 28 }}>Urgent today<Ic name="chevron-down" size={12} /></T.Chip><span style={{ flex: 1 }} /><T.Chip icon="badge-alert" outline style={{ height: 28 }}>To verify · 1</T.Chip></div>
      {jobs.map((j, i) => <JobRow key={j.id} T={T} j={j} on={i === 0} />)}
    </Body></>, prDock(T));
}
/* P12 Job cards · sort & filter sheet — the shared sheet: search, sort radios, groups collapsed with counts */
function ScreenPJobsFilters({ T }) {
  const Radio = ({ on, children }) => <span className="press" style={{ display: 'flex', alignItems: 'center', gap: 8, height: 28, fontFamily: T.fontUI, fontSize: 12.5, color: on ? T.ink : T.ink2, fontWeight: on ? 600 : 400 }}><span style={{ width: 14, height: 14, borderRadius: 7, border: `1.5px solid ${on ? T.accent : T.line2}`, display: 'grid', placeItems: 'center' }}>{on && <span style={{ width: 7, height: 7, borderRadius: 4, background: T.accent }} />}</span>{children}</span>;
  const Group = ({ t, n, open, children }) => <div style={{ borderTop: `1px solid ${T.line}`, padding: '9px 0' }}><div className="press" style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ fontFamily: T.fontUI, fontSize: 12.5, fontWeight: 600, flex: 1 }}>{t}</span>{n ? <span style={{ minWidth: 18, height: 18, padding: '0 6px', borderRadius: 9, background: T.accent, color: T.onAccent, fontSize: 10.5, fontWeight: 600, display: 'grid', placeItems: 'center' }}>{n}</span> : null}<Ic name={open ? 'chevron-up' : 'chevron-down'} size={14} color={T.ink3} /></div>{open && <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>{children}</div>}</div>;
  const C = ({ on, children }) => <T.Chip on={on} outline={!on} style={{ height: 28 }}>{children}</T.Chip>;
  return frameF(T, <><PrHeader T={T} node="Job cards" /><Body>{PR_JOBS.slice(1, 3).map(j => <JobRow key={j.id} T={T} j={j} />)}</Body></>, <>{scrimF(T)}<Sheet T={T} h={700} title="Sort & filter" foot={<div style={{ display: 'flex', gap: 6, alignItems: 'center' }}><OutBtn T={T} small>Reset group</OutBtn><OutBtn T={T} small>Clear all</OutBtn><span style={{ flex: 1 }} /><OutBtn T={T} small icon="bookmark">Save view</OutBtn><T.Btn style={{ height: 44 }}>Show 18 jobs</T.Btn></div>}>
    <T.Chip icon="search" outline style={{ height: 32, width: '100%' }}>Search within filters</T.Chip>
    <PrLab T={T} style={{ marginTop: 12 }}>Sort · then by</PrLab>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 10px' }}>{['Urgency · most overdue tranche', 'Waiting on floor first', 'Serviceable now first', 'Oldest unassigned', 'Oldest no-activity', 'Pending pcs · more first', 'Order date · newest planned', 'Order date · oldest planned', 'Days to due · most overdue', 'Customer shortage impact', 'Demand score'].map((s, i) => <Radio key={s} on={i === 0}>{s}</Radio>)}</div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '4px 0 8px' }}><Meta T={T}>then by</Meta><T.Chip outline style={{ height: 26, fontSize: 11 }}>Pending pcs<Ic name="chevron-down" size={11} /></T.Chip></div>
    <Group t="Job state" n={1} open><C on>Unassigned</C><C>Ready to issue</C><C>Waiting on floor</C><C>At karigar</C><C>Partially serviceable</C><C>Stuck</C><C>Waiting previous</C><C>Rework</C><C>Tranche missed</C></Group>
    <Group t="Deadlines" n={0} open><C>Tranche 1 due</C><C>Tranche 2 due</C><C>Tranche 3 due</C><C>Overdue 1–7 d</C><C>Overdue 7 d +</C><C>Missed 2 +</C><C>No activity 7 d</C></Group>
    <Group t="Serviceability" n={0} />
    <Group t="Quantities · planned · issued · back · balance" n={0} />
    <Group t="Product · design · category · demand · reason" n={0} />
    <Group t="Karigar · name · score · on time · delays" n={0} />
    <Group t="Customer impact · linked order · shortage pcs · dispatch due" n={0} />
    <Group t="Scope · book · firm · idle days" n={0} />
  </Sheet></>);
}
const ColourChipsP = ({ T, o, on }) => <div style={{ display: 'flex', gap: 6, overflow: 'hidden' }}>{Object.keys(o.qty).map(c => <T.Chip key={c} on={c === on} outline={c !== on} style={{ height: 26, fontSize: 11.5 }}><Dot n={c} s={7} />{c} · {o.qty[c]}</T.Chip>)}</div>;
/* P13 Job card · opened */
function ScreenPJob({ T }) {
  const o = prOrder('PO-1187'), j = PR_JOBS.find(x => x.id === 'PO-1187-J2');
  return frameF(T, <><PrHeader T={T} title="Embroidery · PO-1187" back noSearch />
    <Body style={{ padding: '10px 14px 130px' }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}><Thumb T={T} d={j.d} w={56} h={70} r={12} /><span style={{ flex: 1, minWidth: 0 }}><div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><Num T={T} size={22}>2798</Num><Mono T={T} size={11.5}>{j.id}</Mono></div><Meta T={T} style={{ display: 'block', marginTop: 3 }}>Plazo set · 85 pcs · Sky 20 · Purple 25 · Peach 40</Meta><div style={{ display: 'flex', gap: 6, marginTop: 6, alignItems: 'center' }}><JobChip T={T} s={j.state} small /><Pips T={T} tr={j.tr} /><PrNextPill T={T} j={j} /></div></span></div>
      <div style={{ marginTop: 10 }}><ProcTimeline T={T} o={o} active="Embroidery" /></div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, padding: '8px 10px', borderRadius: 14, background: T.surface2, border: `1px solid ${T.line}` }}><KarigarPill T={T} name="Saleem Creation" score={78} /><span style={{ flex: 1 }} /><Meta T={T}>45 out · 27 back</Meta></div>
      <div style={{ marginTop: 10, padding: '10px 12px', borderRadius: 14, background: T.warn + '14', border: `1px solid ${T.warn}55` }}><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Ic name="badge-alert" size={15} color={T.warn} /><span style={{ fontFamily: T.fontUI, fontSize: 12.5, fontWeight: 600, flex: 1 }}>Saleem recorded 3 pcs · Peach · 08/09 11:20</span><span style={{ width: 34, height: 40, borderRadius: 8, background: T.chipBg, display: 'grid', placeItems: 'center' }}><Ic name="image" size={14} color={T.ink3} /></span></div><Meta T={T} style={{ display: 'block', marginTop: 3 }}>unverified · gate token and his due are raised when you verify</Meta><div style={{ display: 'flex', gap: 6, marginTop: 8 }}><T.Btn small icon="badge-check" style={{ height: 32 }}>Verify 3 pcs</T.Btn><OutBtn T={T} small>Correct pcs</OutBtn><OutBtn T={T} small>Reject</OutBtn></div></div>
      <Sect T={T} right={<Meta T={T}>Sky · 20 ordered</Meta>}>Inputs</Sect>
      <div style={{ marginBottom: 8 }}><ColourChipsP T={T} o={o} on="Sky" /></div>
      <div style={{ borderRadius: 14, background: T.surface, border: `1px solid ${T.line}`, overflow: 'hidden' }}><InputsTable T={T} job={j} colour="Sky" ordered={20} phone /></div>
      <Sect T={T}>Colour wise</Sect>
      <div style={{ borderRadius: 14, background: T.surface, border: `1px solid ${T.line}`, overflow: 'hidden' }}><ColourTable T={T} o={o} job={j} phone /></div>
      <Sect T={T}>History</Sect>
      <div style={{ borderRadius: 14, background: T.surface, border: `1px solid ${T.line}`, overflow: 'hidden' }}><HistoryRows T={T} phone /></div>
    </Body>
    <div style={{ position: 'absolute', left: 14, right: 14, bottom: 98, display: 'flex', gap: 8, padding: 8, borderRadius: 24, ...glass(T) }}><Hit T={T} icon="printer" size={44} iconSize={18} style={{ background: T.chipBg }} /><Hit T={T} icon="phone" size={44} iconSize={18} style={{ background: T.chipBg }} /><OutBtn T={T} icon="arrow-up-right" style={{ flex: 1, justifyContent: 'center', height: 44 }}>Issue</OutBtn><T.Btn icon="arrow-down-left" style={{ flex: 1, height: 44 }}>Receive</T.Btn></div>
  </>, <T.Island active="Production" />);
}
/* P6 Orders · list (floor phone: read, no order creation) */
function OrderRowP({ T, o, on }) {
  const d = PR_D(o.code); const tot = prQty(o); const pend = /Draft|Awaiting/.test(o.state);
  return <div className="press" style={{ display: 'flex', gap: 10, padding: 10, borderRadius: 18, background: T.surface, border: `1px solid ${on ? T.accentLine : T.line}`, marginBottom: 8, opacity: pend ? .85 : 1 }}>
    <Thumb T={T} d={d} w={54} h={68} r={12} />
    <span style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><Num T={T} size={20}>{o.code}</Num><Mono T={T} size={11.5}>{o.no}</Mono><span style={{ flex: 1 }} /><OrderPill T={T} s={o.state} small /></div>
      <div style={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 6 }}><ColourQty T={T} o={o} small /><ReasonChip T={T} r={o.reason} /></div>
      {pend ? <Meta T={T} style={{ display: 'block', marginTop: 7 }}>{o.state === 'Draft' ? 'draft · not sent' : `approval ${o.approval} · job cards appear on approval`}</Meta> : <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 7 }}><Progress T={T} v={o.recd / tot} w={70} tone={o.recd >= tot ? T.ok : T.blue} /><Meta T={T}>{o.recd}/{tot} pcs · {o.jobs.filter(j => j.k).length}/{o.jobs.length} assigned · end {o.end.slice(0, 5)}</Meta></div>}
    </span>
  </div>;
}
function ScreenPOrders({ T }) {
  return frameF(T, <><PrHeader T={T} node="Orders" count="12 active" chips={[['Delayed', true], ['Unassigned', false], ['Materials pending', false], ['Awaiting approval', false], ['Tranche due', false]]} />
    <Body><div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}><T.Chip icon="arrow-down-up" outline style={{ height: 28 }}>Planned end</T.Chip><T.Chip icon="calendar" outline style={{ height: 28 }}>Sep – Oct<Ic name="chevron-down" size={12} /></T.Chip><span style={{ flex: 1 }} /><Meta T={T}>orders are raised at the desk</Meta></div>{[PR_ORDERS[0], PR_ORDERS[1], PR_ORDERS[6], PR_ORDERS[2], PR_ORDERS[3]].map((o, i) => <OrderRowP key={o.no} T={T} o={o} on={i === 0} />)}</Body></>, prDock(T));
}
/* P7 Lifecycle */
function ScreenPLifecycle({ T }) {
  const o = prOrder('PO-1187'); const tot = prQty(o); const d = PR_D(o.code);
  return frameF(T, <><PrHeader T={T} title="PO-1187 · 2798" back noSearch />
    <Body style={{ padding: '10px 14px 110px' }}>
      <div style={{ display: 'flex', gap: 12 }}><Thumb T={T} d={d} w={64} h={80} r={14} /><span style={{ flex: 1, minWidth: 0 }}><div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><Num T={T} size={24}>2798</Num><OrderPill T={T} s={o.state} small /></div><Meta T={T} style={{ display: 'block', marginTop: 2 }}>Plazo set · {o.book} · end {o.end} · {o.by} · 3 of 4 assigned</Meta><div style={{ marginTop: 5, display: 'flex', gap: 6, alignItems: 'center' }}><ColourQty T={T} o={o} small /><ReasonChip T={T} r={o.reason} /></div><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}><Progress T={T} v={o.recd / tot} w={110} tone={T.blue} /><Meta T={T}>{o.recd} of {tot} pcs received</Meta></div></span></div>
      <div style={{ marginTop: 14, padding: '12px 10px 8px', borderRadius: 16, background: T.surface, border: `1px solid ${T.line}`, overflow: 'hidden' }}><ProcTimeline T={T} o={o} wide active="Embroidery" /></div>
      <div style={{ display: 'flex', gap: 6, marginTop: 8, overflow: 'hidden' }}>{['Unassigned', 'Ready to issue', 'Waiting on floor', 'Stuck', 'Tranche due'].map(c => <T.Chip key={c} outline style={{ height: 26, fontSize: 11 }}>{c}</T.Chip>)}</div>
      {o.jobs.map((j, i) => { const open = j.proc === 'Embroidery'; return <div key={j.proc} style={{ marginTop: 8, borderRadius: 16, background: open ? T.surface : T.surface2, border: `1px solid ${open ? T.accentLine : T.line}`, overflow: 'hidden' }}>
        <div className="press" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px' }}><span style={{ width: 22, height: 22, borderRadius: 11, background: T.chipBg, display: 'grid', placeItems: 'center', fontFamily: T.fontUI, fontSize: 11, fontWeight: 600 }}>{i + 1}</span><span style={{ fontFamily: T.fontDisplay, fontSize: 17, fontWeight: 600, flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{j.proc}<Meta T={T}> · {o.no}-J{i + 1}</Meta></span><JobChip T={T} s={j.state} small /><Ic name={open ? 'chevron-up' : 'chevron-down'} size={15} color={T.ink3} /></div>
        {open && <div style={{ padding: '0 12px 12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><KarigarPill T={T} name="Saleem Creation" score={78} /><span style={{ flex: 1 }} /><Pips T={T} tr={j.tr} size={8} /></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}><span style={{ flex: 1, height: 8, borderRadius: 4, background: T.line, overflow: 'hidden' }}><span style={{ display: 'block', width: `${j.recd / tot * 100}%`, height: 8, background: T.blue }} /></span><Meta T={T}>{j.recd} of {tot} back · this process</Meta></div>
          <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>{j.tr.map((t, k) => <span key={k} style={{ flex: 1, padding: '6px 8px', borderRadius: 10, background: T.surface2, border: `1px solid ${T.line}`, fontFamily: T.fontUI, fontSize: 11 }}><div style={{ color: T.ink3 }}>R{k + 1} · {t[1].slice(0, 5)}</div><div style={{ fontWeight: 600, color: t[2] >= t[0] ? T.ok : T.ink }}>{t[2]}/{t[0]} pcs</div></span>)}</div>
          <div style={{ marginTop: 8 }}><ColourChipsP T={T} o={o} on="Sky" /></div>
          <div style={{ marginTop: 8, borderRadius: 12, border: `1px solid ${T.line}`, overflow: 'hidden' }}><InputsTable T={T} job={j} colour="Sky" ordered={20} phone /></div>
          <div style={{ marginTop: 8, borderRadius: 12, border: `1px solid ${T.line}`, overflow: 'hidden' }}><ColourTable T={T} o={o} job={j} phone /></div>
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}><OutBtn T={T} icon="arrow-up-right" style={{ flex: 1, justifyContent: 'center', height: 40 }}>Issue</OutBtn><T.Btn icon="arrow-down-left" small style={{ flex: 1, height: 40 }}>Receive</T.Btn></div>
        </div>}
        {!open && j.state === 'Waiting on floor' && <div style={{ padding: '0 12px 10px', display: 'flex', alignItems: 'center', gap: 8 }}><Meta T={T} style={{ flex: 1, color: T.warn }}>{j.ready} pcs of wip_emb back · idle {j.idle} d · no karigar</Meta><OutBtn T={T} small icon="user-plus">Assign</OutBtn></div>}
        {!open && j.state === 'Stuck' && <div style={{ padding: '0 12px 10px' }}><Meta T={T} style={{ color: T.danger }}>waits on {j.short} · PU-0345 due 10/09</Meta></div>}
      </div>; })}
    </Body></>, prDock(T));
}
/* P8 Issue sheet · by pieces or by material · balance per line · WIP may follow */
function ScreenPIssue({ T }) {
  const o = prOrder('PO-1187'), j = PR_JOBS.find(x => x.id === 'PO-1187-J2'); const rows = prInputs(j, 'Purple', 25);
  return frameF(T, <><PrHeader T={T} title="PO-1187 · 2798" back noSearch /><Body><div style={{ padding: '12px 10px 8px', borderRadius: 16, background: T.surface, border: `1px solid ${T.line}` }}><ProcTimeline T={T} o={o} wide active="Embroidery" /></div></Body></>, <>{scrimF(T)}<Sheet T={T} h={720} title="Issue · Embroidery" foot={<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Meta T={T}>3 lines · 5 m · 0.4 kg · 10 pc wip</Meta><span style={{ flex: 1 }} /><T.Btn style={{ height: 44 }} icon="arrow-up-right">Issue for 10 pcs</T.Btn></div>}>
    <div style={{ display: 'flex', gap: 6 }}>{['By pieces', 'By material'].map((t, i) => <T.Chip key={t} on={i === 0} outline={i !== 0} style={{ height: 30 }}>{t}</T.Chip>)}<span style={{ flex: 1 }} /><T.Chip outline style={{ height: 30 }}>Materials only · WIP follows</T.Chip></div>
    <div style={{ display: 'flex', gap: 8, marginTop: 10 }}><Field T={T} label="Colour" value={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Dot n="Purple" />Purple · 25 ordered</span>} caret /><Field T={T} label="Pieces to issue for" value={<T.Step v={10} />} w={130} /></div>
    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}><Field T={T} label="Karigar" value="Saleem Creation" /><Field T={T} label="Material centre" value="Main godown" caret w={140} /></div>
    <Meta T={T} style={{ display: 'block', margin: '8px 2px 0' }}>issued for 12 · received 12 · balance 13 pcs · computed from the averages, edit any line</Meta>
    <div style={{ marginTop: 8, borderRadius: 14, border: `1px solid ${T.line}`, background: T.surface, overflow: 'hidden' }}>
      {rows.map((r, i) => { const q = +(r.avg * 10).toFixed(1); const short = !r.wip && (r.out || r.stock < q); const later = r.wip && false; return <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderTop: i ? `1px solid ${T.line}` : 0, opacity: later ? .6 : 1 }}>{r.m ? <Swatch m={r.m} w={34} h={40} r={8} /> : <span style={{ width: 34, height: 40, borderRadius: 8, background: T.chipBg, display: 'grid', placeItems: 'center' }}><Ic name="layers" size={14} color={T.ink2} /></span>}<Thumb T={T} d={j.d} w={30} h={38} r={8} /><span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontUI, fontSize: 12.5, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.name}</div><Meta T={T}>{r.avg} {r.unit}/pc · bal {r.bal} {r.unit} · {short ? <span style={{ color: T.danger }}>{r.stock} {r.unit} · short</span> : `${r.stock} ${r.unit} ${r.wip ? 'in hand' : 'in stock'}`}</Meta></span><span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}><span style={{ width: 66, height: 34, borderRadius: 10, border: `1px solid ${short ? T.danger : T.line2}`, display: 'grid', placeItems: 'center', fontFamily: T.fontUI, fontSize: 13, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{q} {r.unit}</span><Meta T={T} style={{ fontSize: 10 }}>computed {q}</Meta></span></div>; })}
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}><T.Chip outline icon="scan-line" style={{ height: 28 }}>Scan the lot picked</T.Chip><Meta T={T}>ticks the line when it matches</Meta></div>
    <Field T={T} label="Remarks" ph="e.g. short issue, balance to follow" style={{ marginTop: 10 }} />
  </Sheet></>);
}
/* P9 Receive sheet · pieces by colour · rejection, loss, excess separate · overage warns */
function ReceiveSheetBody({ T, fg }) {
  return <>
    <div style={{ display: 'flex', gap: 8 }}><Field T={T} label="From" value={fg ? 'Noor Tailors' : 'Saleem Creation'} /><Field T={T} label="Settles" value={fg ? 'R3 · 12/09' : 'R2 · 12/09'} caret w={120} /></div>
    <PrLab T={T} style={{ marginTop: 10 }}>Brought by</PrLab>
    <div style={{ display: 'flex', gap: 6 }}>{['Karigar', 'Karigar to karigar', 'His app entry MR-00121'].map((t, i) => <T.Chip key={t} on={i === 0} outline={i !== 0} style={{ height: 28, fontSize: 11.5 }}>{t}</T.Chip>)}</div>
    <PrLab T={T} style={{ marginTop: 12 }}>Pieces by colour</PrLab>
    {(fg ? [['Peach', 30, 18, 8, false], ['Pista', 30, 28, 6, true]] : [['Sky', 20, 15, 8, false], ['Purple', 25, 12, 10, false], ['Peach', 40, 0, 3, true]]).map(([c, ord, got, now, over]) => <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderTop: `1px solid ${T.line}` }}><Thumb T={T} d={PR_D(fg ? '3661' : '2798')} w={26} h={32} r={7} /><Dot n={c} /><span style={{ flex: 1, fontFamily: T.fontUI, fontSize: 13 }}>{c}<Meta T={T} style={{ display: 'block' }}>{got} of {ord} back{over ? <span style={{ color: T.warn }}> · {fg ? '4 more than ordered' : 'more than issued for'} · overage to approval</span> : ''}</Meta></span><T.Step v={now} /></div>)}
    <div style={{ display: 'flex', gap: 8, marginTop: 12 }}><Field T={T} label="Rejected" value="0" small /><Field T={T} label="Process loss" value="0" small /><Field T={T} label="Excess" value={fg ? '4' : '3'} small tone="danger" /></div>
    {fg ? <div style={{ marginTop: 12, padding: '8px 10px', borderRadius: 12, background: T.accentSoft, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2 }}><b style={{ color: T.ink }}>Lands as finished goods · 3661 · Peach 8 · Pista 6</b><br />→ FG inward at Radhika Collection · Dispatch › Stock · counted into stock there · pieces get barcodes at inward</div>
      : <div style={{ marginTop: 12, padding: '8px 10px', borderRadius: 12, background: T.chipBg, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2 }}><b style={{ color: T.ink }}>Lands as wip_emb_2798 · Sky 8 · Purple 10 · Peach 3</b><br />Latkan gets 21 more pcs to issue · rejected pieces go back as rework</div>}
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2 }}><Ic name="badge-check" size={14} color={T.ok} />Karigar's due is raised per piece on verify · rates on the desk</div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}><GateToken T={T} n={fg ? 'GT-260908-029' : 'GT-260908-021'} /><Meta T={T}>auto token for the gate · sticker prints</Meta></div>
  </>;
}
function ScreenPReceive({ T }) {
  const o = prOrder('PO-1187');
  return frameF(T, <><PrHeader T={T} title="PO-1187 · 2798" back noSearch /><Body><div style={{ padding: '12px 10px 8px', borderRadius: 16, background: T.surface, border: `1px solid ${T.line}` }}><ProcTimeline T={T} o={o} wide active="Embroidery" /></div></Body></>, <>{scrimF(T)}<Sheet T={T} h={720} title="Receive · Embroidery" foot={<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Meta T={T}>lands as wip_emb_2798</Meta><span style={{ flex: 1 }} /><T.Btn style={{ height: 44 }} icon="arrow-down-left">Receive 21 · 3 on approval</T.Btn></div>}><ReceiveSheetBody T={T} /></Sheet></>);
}
function ScreenPReceiveFG({ T }) {
  const o = prOrder('PO-1174');
  return frameF(T, <><PrHeader T={T} title="PO-1174 · 3661" back noSearch /><Body><div style={{ padding: '12px 10px 8px', borderRadius: 16, background: T.surface, border: `1px solid ${T.line}` }}><ProcTimeline T={T} o={o} wide active="Stitching" /></div></Body></>, <>{scrimF(T)}<Sheet T={T} h={720} title={<span>Receive · Stitching <Pill T={T} tone="ok" small>Final · finished goods</Pill></span>} foot={<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Meta T={T}>→ FG inward · Radhika</Meta><span style={{ flex: 1 }} /><T.Btn style={{ height: 44 }} icon="arrow-down-left">Receive 14 as FG</T.Btn></div>}><ReceiveSheetBody T={T} fg /></Sheet></>);
}
/* P10 Scan job QR → the job with every input and its progress */
function ScreenPScan({ T }) {
  const o = prOrder('PO-1187'), j = PR_JOBS.find(x => x.id === 'PO-1187-J2');
  return frameF(T, <><PrHeader T={T} title="Scan a job" back noSearch /><ScanCam T={T} h={210}><div style={{ position: 'absolute', left: 16, right: 16, top: 14, display: 'flex', gap: 8 }}><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 30, padding: '0 10px', borderRadius: 999, ...veil(), fontFamily: T.fontUI, fontSize: 12 }}><Ic name="qr-code" size={13} />job card QR · or a material label</span></div></ScanCam>
    <Body style={{ padding: '10px 14px 130px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}><Pill T={T} tone="ok" fill small>Recognised</Pill><Meta T={T}>PO-1187-J2 · Embroidery</Meta></div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}><Thumb T={T} d={j.d} w={48} h={60} r={11} /><span style={{ flex: 1, minWidth: 0 }}><div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><Num T={T} size={20}>2798</Num><JobChip T={T} s={j.state} small /></div><div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}><KarigarPill T={T} name="Saleem Creation" score={78} /><Meta T={T}>45 out · 27 back</Meta></div></span></div>
      <div style={{ marginTop: 10 }}><ColourChipsP T={T} o={o} on="Sky" /></div>
      <div style={{ marginTop: 8, borderRadius: 14, background: T.surface, border: `1px solid ${T.line}`, overflow: 'hidden' }}><InputsTable T={T} job={j} colour="Sky" ordered={20} phone /></div>
      <div style={{ marginTop: 8, borderRadius: 14, background: T.surface, border: `1px solid ${T.line}`, overflow: 'hidden' }}><ColourTable T={T} o={o} job={j} phone /></div>
    </Body>
    <div style={{ position: 'absolute', left: 14, right: 14, bottom: 98, display: 'flex', gap: 8, padding: 8, borderRadius: 24, ...glass(T) }}><OutBtn T={T} icon="arrow-up-right" style={{ flex: 1, justifyContent: 'center', height: 44 }}>Issue</OutBtn><T.Btn icon="arrow-down-left" style={{ flex: 1, height: 44 }}>Receive</T.Btn></div>
  </>, <T.Island active="Production" />);
}
/* P17 Materials catalogue */
function ScreenPMaterials({ T }) {
  return frameF(T, <><PrHeader T={T} node="Materials" placeholder="Material, shade, code, supplier" count="14 · newest inward first" chips={[['Dye WIP', true], ['Low', false], ['Out', false], ['On order', false], ['Group', false, false, true], ['Supplier', false, false, true]]} />
    <Body><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>{PR_MATS.slice(0, 6).map(m => <MatCard key={m.id} T={T} m={m} />)}</div></Body></>, prDock(T));
}
/* P4 Recipe · view (the recipe, not an order) */
const RecipeFlags = ({ T, phone }) => <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}><Pill T={T} tone="warn" small>BOM incomplete · 1</Pill><Pill T={T} tone="blue" small>Colour override · 3 rows</Pill><Pill T={T} tone="warn" small>Locked by PO-1187</Pill></div>;
function ScreenPRecipe({ T }) {
  return frameF(T, <><PrHeader T={T} title="Recipe · 2798" back noSearch />
    <Body style={{ padding: '10px 14px 110px' }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}><Thumb T={T} d={PR_D('2798')} w={56} h={70} r={12} /><span style={{ flex: 1, minWidth: 0 }}><div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><Num T={T} size={22}>2798</Num><Meta T={T}>Plazo set · v2</Meta></div><Meta T={T} style={{ display: 'block', marginTop: 3 }}>Sky · Purple · Peach · 4 processes · 13 material rows</Meta><div style={{ marginTop: 6 }}><RecipeFlags T={T} phone /></div></span></div>
      <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>{['Sky', 'Purple', 'Peach'].map((c, i) => <T.Chip key={c} on={i === 0} outline={i !== 0} style={{ height: 30 }}><Dot n={c} />{c}</T.Chip>)}<span style={{ flex: 1 }} /><T.Chip outline icon="pencil" style={{ height: 30 }}>Averages</T.Chip></div>
      <div style={{ marginTop: 10, padding: '12px 10px 8px', borderRadius: 16, background: T.surface, border: `1px solid ${T.line}`, overflow: 'hidden' }}><ProcTimeline T={T} o={prOrder('PO-1187')} wide recipe /></div>
      {PR_RECIPE.seq.map((p, i) => { const rows = PR_RECIPE.rows.filter(r => r.to.includes(p) && (r.scope === 'all' || r.scope === 'Sky')); const w = PR_RECIPE.wips.find(x => x[1] === p); return <div key={p} style={{ marginTop: 8, borderRadius: 16, background: i % 2 ? T.surface2 : T.surface, border: `1px solid ${T.line}`, padding: '10px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><span style={{ fontFamily: T.fontDisplay, fontSize: 17, fontWeight: 600 }}>{i + 1} · {p}</span><Meta T={T}>pcs</Meta><span style={{ flex: 1 }} /><Mono T={T} size={11} color={T.ink3}>{p === 'Stitching' ? '2798_sky · finished good' : prWipName(p, '2798', 'Sky')}</Mono></div>
        {w && <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}><span style={{ width: 30, height: 36, borderRadius: 7, background: T.chipBg, display: 'grid', placeItems: 'center' }}><Ic name="layers" size={13} color={T.ink2} /></span><span style={{ flex: 1, fontFamily: T.fontUI, fontSize: 12.5 }}>{prWipName(w[0], '2798', 'Sky')}</span><Meta T={T}>1 pc</Meta></div>}
        {rows.map((r, k) => { const m = prMat(r.m); return <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}><Swatch m={m} w={30} h={36} r={7} /><span style={{ flex: 1, fontFamily: T.fontUI, fontSize: 12.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{prMatName(m)}<Meta T={T}> · {m.code}{m.dye ? ' · dye wip' : ''}</Meta></span><Meta T={T} style={{ color: T.ink }}>{r.avg} {r.unit}</Meta></div>; })}
      </div>; })}
    </Body></>, prDock(T));
}
/* P5 Averages · edit with steppers */
function ScreenPAverages({ T }) {
  const rows = PR_RECIPE.rows.filter(r => r.scope !== 'Purple' && r.scope !== 'Peach');
  return frameF(T, <><PrHeader T={T} title="Averages · 2798" back noSearch />
    <Body style={{ padding: '10px 14px 130px' }}>
      <div style={{ display: 'flex', gap: 6 }}>{['Sky', 'Purple', 'Peach'].map((c, i) => <T.Chip key={c} on={i === 0} outline={i !== 0} style={{ height: 30 }}><Dot n={c} />{c}</T.Chip>)}<span style={{ flex: 1 }} /><T.Chip outline icon="plus" style={{ height: 30 }}>Add material</T.Chip></div>
      <Meta T={T} style={{ display: 'block', margin: '10px 2px 4px' }}>per pc · steps of 0.5 m · 0.01 kg · 1 pc · the BOM grid on the web decides which process consumes it</Meta>
      <div style={{ borderRadius: 16, background: T.surface, border: `1px solid ${T.line}`, overflow: 'hidden' }}>{rows.map((r, i) => { const m = prMat(r.m); return <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderTop: i ? `1px solid ${T.line}` : 0 }}><Swatch m={m} w={36} h={44} r={8} /><span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontUI, fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{prMatName(m)}</div><Meta T={T}>{r.to.join(' · ')}{r.dual ? ' · 2nd use' : ''}{r.scope !== 'all' ? ' · Sky only' : ''}</Meta></span><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><T.Step v={r.avg} /><Meta T={T} style={{ width: 20 }}>{r.unit}</Meta></span></div>; })}</div>
    </Body>
    <div style={{ position: 'absolute', left: 14, right: 14, bottom: 98, display: 'flex', gap: 8, padding: 8, borderRadius: 24, ...glass(T) }}><OutBtn T={T} style={{ height: 44 }}>Reset</OutBtn><span style={{ flex: 1 }} /><T.Btn icon="check" style={{ height: 44 }}>Save averages · 8 rows</T.Btn></div>
  </>, <T.Island active="Production" />);
}
/* P2 Dye · receive a cut order or a single order */
const DesignChip = ({ T, code, label, small }) => <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, verticalAlign: 'middle' }}><Thumb T={T} d={PR_D(code)} w={small ? 16 : 20} h={small ? 20 : 24} r={5} /><span style={{ fontFamily: T.fontDisplay, fontSize: small ? 13 : 14, fontWeight: 600, color: T.ink }}>{label || code}</span></span>;
function DyeRowP({ T, x, on }) {
  return <div className="press" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 10, borderRadius: 16, background: T.surface, border: `1px solid ${on ? T.accentLine : T.line}`, marginBottom: 8 }}><Swatch m={{ tex: 'net', shade: x.shade, dye: x.state === 'Received' }} w={44} h={52} r={10} /><span style={{ flex: 1, minWidth: 0 }}><div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><Mono T={T}>{x.no}</Mono>{x.single && <Pill T={T} tone="muted" small>single</Pill>}<Meta T={T}>{prK(x.dyer).name}</Meta></div><div style={{ fontFamily: T.fontUI, fontSize: 12.5, marginTop: 2 }}>{x.mat} → <b>{x.code} {x.shade}</b> · {x.qty} m</div><div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 3 }}><Meta T={T}>for</Meta><DesignChip T={T} code={x.forCode} small /><Meta T={T}>· {x.for.split(' · ').slice(1).join(' · ') || x.for} · due {x.due.slice(0, 5)}</Meta></div></span><Ic name="chevron-right" size={16} color={T.ink3} /></div>;
}
function ScreenPDyeReceive({ T }) {
  return frameF(T, <><PrHeader T={T} node="Dye" placeholder="Cut order, dyer, shade" count="3 open" chips={[['With dyer', true], ['Due this week', false], ['Received', false], ['Bulk balances', false, false, true]]} />
    <Body>{PR_CUTS.slice(0, 3).map((x, i) => <DyeRowP key={x.no} T={T} x={x} on={i === 2} />)}</Body></>,
    <>{scrimF(T)}<Sheet T={T} h={600} title="Receive a dye lot" foot={<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><GateToken T={T} n="GT-260908-025" /><span style={{ flex: 1 }} /><T.Btn style={{ height: 44 }} icon="arrow-down-left">Receive 147 m</T.Btn></div>}>
      <div style={{ display: 'flex', gap: 6 }}>{['Cut order', 'Single order'].map((t, i) => <T.Chip key={t} on={i === 0} outline={i !== 0} style={{ height: 28 }}>{t}</T.Chip>)}<Field T={T} value="DC-0034" caret small w={120} /></div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 12 }}><Swatch m={{ tex: 'net', shade: 'Lilac', dye: true }} w={64} h={72} r={12} /><span style={{ flex: 1 }}><div style={{ fontFamily: T.fontDisplay, fontSize: 18, fontWeight: 600 }}>Mono net → C11 Lilac</div><div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 3 }}><Meta T={T}>Rafiq Bhai · 150 m ordered · for</Meta><DesignChip T={T} code="6002" small /><Meta T={T}>· PO-1192</Meta></div></span></div>
      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}><Field T={T} label="Received" value="147 m" /><Field T={T} label="Process loss" value="3 m" /><Field T={T} label="Rejected" value="0 m" /></div>
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}><Field T={T} label="Shade photo" value="tap to capture" icon="camera" /><Field T={T} label="Lands as" value="Mono net · C11 · 147 m" /></div>
      <div style={{ marginTop: 12, padding: '8px 10px', borderRadius: 12, background: T.chipBg, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2 }}>Rafiq Bhai's balance after: Mono net · Mono <b style={{ color: T.ink }}>1,000 m</b> (1,150 − 150) · PO-1192 Embroidery turns Ready to issue · print the lot label</div>
    </Sheet></>);
}
/* P3 Dye · dyer balances (bulk) */
function ScreenPDyers({ T }) {
  return frameF(T, <><PrHeader T={T} node="Dye" placeholder="Cut order, dyer, shade" count="2 dyers · 4,350 m out" chips={[['Bulk balances', true, false, true], ['With dyer', false], ['Due this week', false], ['Received', false]]} />
    <Body>{PR_DYERS.map(dy => { const k = prK(dy.k); return <div key={dy.k} style={{ padding: 12, borderRadius: 16, background: T.surface, border: `1px solid ${T.line}`, marginBottom: 8 }}><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><KarigarPill T={T} name={k.name} score={k.score} /><span style={{ flex: 1 }} /><Meta T={T}>{PR_CUTS.filter(c => c.dyer === dy.k && c.state !== 'Received').length} open</Meta></div>{dy.bal.map(([m, q, u]) => <div key={m} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0 0', fontFamily: T.fontUI, fontSize: 12.5 }}><Swatch m={{ tex: m.startsWith('Mono') ? 'net' : 'satin', shade: 'Mono' }} w={30} h={34} r={7} /><span style={{ flex: 1 }}>{m}<Meta T={T} style={{ display: 'block' }}>reserved {m.startsWith('Mono') ? (dy.k === 'k6' ? 120 : 150) : 0} {u} by open cut orders</Meta></span><span style={{ textAlign: 'right' }}><div style={{ fontFamily: T.fontDisplay, fontSize: 17, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{q.toLocaleString('en-IN')} {u}</div><Meta T={T}>free {(q - (m.startsWith('Mono') ? (dy.k === 'k6' ? 120 : 150) : 0)).toLocaleString('en-IN')} {u}</Meta></span></div>)}<div style={{ display: 'flex', gap: 8, marginTop: 10 }}><OutBtn T={T} small icon="plus">Bulk issue</OutBtn><Meta T={T} style={{ alignSelf: 'center' }}>cut orders are raised at the desk</Meta></div></div>; })}</Body></>, prDock(T));
}
/* P22 Dye · bulk issue sheet */
function ScreenPBulkIssue({ T }) {
  return frameF(T, <><PrHeader T={T} node="Dye" placeholder="Cut order, dyer, shade" count="2 dyers · 4,350 m out" chips={[['Bulk balances', true, false, true], ['With dyer', false]]} /><Body>{PR_DYERS.slice(0, 1).map(dy => <div key={dy.k} style={{ padding: 12, borderRadius: 16, background: T.surface, border: `1px solid ${T.line}` }}><KarigarPill T={T} name="Raja Dyers" score={74} /></div>)}</Body></>, <>{scrimF(T)}<Sheet T={T} h={560} title="Bulk issue · Raja Dyers" foot={<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><GateToken T={T} n="GT-260908-027" /><span style={{ flex: 1 }} /><T.Btn style={{ height: 44 }} icon="arrow-up-right">Issue 1,000 m</T.Btn></div>}>
    <Meta T={T}>undyed fabric, no colour yet · comes back shade by shade against cut orders</Meta>
    <div style={{ marginTop: 10, borderRadius: 14, border: `1px solid ${T.line}`, background: T.surface, overflow: 'hidden' }}>{[['m6', 1000], ['m3', 0]].map(([id, q], i) => { const m = prMat(id); return <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderTop: i ? `1px solid ${T.line}` : 0 }}><Swatch m={m} w={34} h={40} r={8} /><span style={{ flex: 1, minWidth: 0, fontFamily: T.fontUI, fontSize: 12.5 }}>{prMatName(m)}<Meta T={T} style={{ display: 'block' }}>{m.stock} {m.unit} in godown</Meta></span><span style={{ width: 84, height: 34, borderRadius: 10, border: `1px solid ${q ? T.accentLine : T.line2}`, display: 'grid', placeItems: 'center', fontFamily: T.fontUI, fontSize: 13, fontWeight: 600, color: q ? T.ink : T.ink3 }}>{q ? `${q} ${m.unit}` : `0 ${m.unit}`}</span></div>; })}</div>
    <OutBtn T={T} small icon="plus" style={{ marginTop: 8 }}>Add material</OutBtn>
    <Field T={T} label="Narration" ph="bale numbers, lorry" style={{ marginTop: 10 }} />
    <Field T={T} label="Lot photo" value="tap to capture" icon="camera" style={{ marginTop: 8 }} />
  </Sheet></>);
}
/* P14 Samples · list (floor phone: no prices) */
const ReadRing = ({ T, n, size = 26 }) => <span title={`reading day ${n}/15`} style={{ width: size, height: size, borderRadius: '50%', background: `conic-gradient(${T.blue} ${n / 15 * 360}deg, ${T.line2} 0)`, display: 'grid', placeItems: 'center', flex: 'none' }}><span style={{ width: size - 8, height: size - 8, borderRadius: '50%', background: T.surface, display: 'grid', placeItems: 'center', fontFamily: T.fontUI, fontSize: 8.5, fontWeight: 600, color: T.ink2 }}>{n}</span></span>;
function ScreenPSamples({ T }) {
  return frameF(T, <><PrHeader T={T} node="Samples" placeholder="Sample no, category, karigar" count="9 samples" chips={[['In designing', true, false, true], ['Price TBD', false], ['Costing pending', false], ['High growth', false], ['15-day read', false], ['Re-reading', false]]} />
    <Body><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>{PR_SAMPLES.slice(0, 6).map(s => <div key={s.no} className="press" style={{ borderRadius: 18, overflow: 'hidden', background: T.surface, border: `1px solid ${T.line}` }}><div style={{ position: 'relative', height: 150, background: T.photoBg }}>{s.d.src ? <img src={s.d.src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /> : <span style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontFamily: T.fontUI, fontSize: 12, color: T.ink3 }}>No photo yet</span>}<span style={{ position: 'absolute', top: 7, left: 7 }}><T.PhotoTag>Sample</T.PhotoTag></span>{s.read && <span style={{ position: 'absolute', right: 7, bottom: 7 }}><ReadRing T={T} n={s.read} /></span>}</div><div style={{ padding: '8px 10px 10px' }}><div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}><Num T={T} size={17}>{s.no}</Num><span style={{ flex: 1 }} /><Meta T={T}>TBD</Meta></div><Meta T={T} style={{ display: 'block', marginTop: 2 }}>{s.cat}</Meta><Meta T={T} style={{ display: 'block', marginTop: 4, color: T.ink2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.where}</Meta></div></div>)}</div><div style={{ height: 8 }} /><OutBtn T={T} icon="plus" style={{ width: '100%', justifyContent: 'center', height: 44 }}>New sample</OutBtn></Body></>, prDock(T));
}
/* P15 Sample lifecycle · moves (floor phone: no rates) */
function ScreenPSample({ T }) {
  const s = PR_SAMPLES[0];
  return frameF(T, <><PrHeader T={T} title="S-0412" back noSearch />
    <Body style={{ padding: '10px 14px 130px' }}>
      <div style={{ display: 'flex', gap: 12 }}><Thumb T={T} d={s.d} w={64} h={80} r={14} /><span style={{ flex: 1, minWidth: 0 }}><div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><Num T={T} size={22}>S-0412</Num><Pill T={T} tone="warn" small>In designing</Pill></div><Meta T={T} style={{ display: 'block', marginTop: 2 }}>{s.cat} · Blush · started {s.started} · price TBD</Meta><div style={{ display: 'flex', gap: 6, marginTop: 6 }}><T.Chip outline icon="camera" style={{ height: 26, fontSize: 11 }}>Add photo</T.Chip><T.Chip outline icon="link" style={{ height: 26, fontSize: 11 }}>2 references</T.Chip></div></span></div>
      <div style={{ display: 'flex', gap: 6, marginTop: 10, padding: '8px 10px', borderRadius: 14, background: T.surface2, border: `1px solid ${T.line}`, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2, alignItems: 'center' }}><Ic name="map-pin" size={13} />Now: Stitching · Noor Tailors · 3 d · in hand: 0.1 m net C22 · 0.05 kg zari back</div>
      <Sect T={T} right={<Meta T={T}>any process, any order</Meta>}>Moves</Sect>
      <div style={{ display: 'grid', gap: 8 }}>{PR_MOVES.map((mv, i) => <MoveCard key={mv.n} T={T} mv={mv} phone on={i === 2} />)}</div>
    </Body>
    <div style={{ position: 'absolute', left: 14, right: 14, bottom: 98, display: 'flex', gap: 8, padding: 8, borderRadius: 24, ...glass(T) }}><Hit T={T} icon="package-check" size={44} iconSize={18} style={{ background: T.chipBg }} /><OutBtn T={T} icon="arrow-down-left" style={{ flex: 1, justifyContent: 'center', height: 44 }}>Receive</OutBtn><T.Btn icon="plus" style={{ flex: 1, height: 44 }}>New move</T.Btn></div>
  </>, <T.Island active="Production" />);
}
/* P16 New move sheet · per-line quantities · no rate on the floor */
function ScreenPNewMove({ T }) {
  return frameF(T, <><PrHeader T={T} title="S-0412" back noSearch /><Body><MoveCard T={T} mv={PR_MOVES[2]} phone /></Body></>, <>{scrimF(T)}<Sheet T={T} h={700} title="New move · 4" foot={<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Meta T={T}>2 lines · challan + gate token</Meta><span style={{ flex: 1 }} /><T.Btn style={{ height: 44 }} icon="arrow-up-right">Issue move 4</T.Btn></div>}>
    <div style={{ display: 'flex', gap: 8 }}><Field T={T} label="Process · any" value="Latkan" caret /><Field T={T} label="Colour" value={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Dot n="Blush" />Blush</span>} caret w={120} /></div>
    <Field T={T} label="Karigar · any" value="Imtiaz Latkan · 66 · 2 jobs" caret style={{ marginTop: 8 }} />
    <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>{['Materials', 'This sample’s WIPs', 'Dye WIPs'].map((t, i) => <T.Chip key={t} on={i === 1} outline={i !== 1} style={{ height: 28 }}>{t}</T.Chip>)}</div>
    <div style={{ marginTop: 8, borderRadius: 14, border: `1px solid ${T.line}`, background: T.surface, overflow: 'hidden' }}>
      {[['wip_stitch_S0412', 'sequin', 'Blush', 'expected back 10/09', true, '1 pc'], ['wip_emb_S0412', 'sequin', 'Blush', 'consumed in move 3', false, null], ['Mono net · C22 Blush', 'net', 'Blush', '0.1 m in hand', true, '0.1 m']].map(([n, tex, sh, meta, on, q]) => <MatRow key={n} T={T} m={{ name: n, shade: sh, tex, code: 'S-0412', group: 'WIP', lastIn: '02/09/26', sup: 'in hand', unit: 'pc', stock: on ? 1 : 0 }} compact tick added={on} right={on ? <span style={{ width: 60, height: 30, borderRadius: 9, border: `1px solid ${T.accentLine}`, display: 'grid', placeItems: 'center', fontFamily: T.fontUI, fontSize: 12, fontWeight: 600 }}>{q}</span> : <Meta T={T}>{meta}</Meta>} />)}
    </div>
    <div style={{ display: 'flex', gap: 8, marginTop: 10 }}><Field T={T} label="Due" value="14/09/26" icon="calendar" /><Field T={T} label="Note to karigar" ph="e.g. small latkans, match the sample" /></div>
    <Meta T={T} style={{ display: 'block', marginTop: 8 }}>rate is set on the desk · money roles</Meta>
  </Sheet></>);
}
/* P19 Sample · receive move 3 */
function ScreenPSampleReceive({ T }) {
  return frameF(T, <><PrHeader T={T} title="S-0412" back noSearch /><Body><MoveCard T={T} mv={PR_MOVES[2]} phone on /></Body></>, <>{scrimF(T)}<Sheet T={T} h={680} title="Receive · move 3 · Stitching" foot={<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><GateToken T={T} n="GT-260908-030" /><span style={{ flex: 1 }} /><T.Btn style={{ height: 44 }} icon="arrow-down-left">Receive move 3</T.Btn></div>}>
    <Meta T={T}>Noor Tailors · out since 05/09 · due 10/09</Meta>
    <PrLab T={T} style={{ marginTop: 10 }}>What came back</PrLab>
    <div style={{ display: 'flex', gap: 6 }}>{['Pieces', 'A WIP · name it'].map((t, i) => <T.Chip key={t} on={i === 0} outline={i !== 0} style={{ height: 28 }}>{t}</T.Chip>)}</div>
    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}><Field T={T} label="Pieces" value={<T.Step v={1} />} w={140} /><Field T={T} label="Lands as" value="wip_stitch_S0412 · finished sample piece" /></div>
    <PrLab T={T} style={{ marginTop: 12 }}>Materials back to hand</PrLab>
    {[['m3', '0.4 m', 'of 8 m'], ['m5', '0 m', 'of 8 m']].map(([id, q, of]) => { const m = prMat(id); return <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderTop: `1px solid ${T.line}` }}><Swatch m={m} w={30} h={36} r={7} /><span style={{ flex: 1, fontFamily: T.fontUI, fontSize: 12.5 }}>{prMatName(m)}<Meta T={T}> · {of}</Meta></span><span style={{ width: 66, height: 32, borderRadius: 9, border: `1px solid ${T.line2}`, display: 'grid', placeItems: 'center', fontFamily: T.fontUI, fontSize: 12.5, fontWeight: 600 }}>{q}</span></div>; })}
    <div style={{ display: 'flex', gap: 8, marginTop: 10 }}><Field T={T} label="Loss" value="0" small /><Field T={T} label="Rejected" value="0" small /><Field T={T} label="Received on" value="08/09/26" small icon="calendar" /></div>
    <Field T={T} label="Photo of the piece" value="tap to capture · first!" icon="camera" style={{ marginTop: 8 }} />
    <Meta T={T} style={{ display: 'block', marginTop: 8 }}>the move turns Received · the piece appears in In hand and as a WIP for the next move</Meta>
  </Sheet></>);
}
/* P21 New sample sheet */
function ScreenPNewSample({ T }) {
  return frameF(T, <><PrHeader T={T} node="Samples" placeholder="Sample no, category, karigar" count="9 samples" chips={[['In designing', true, false, true]]} /><Body><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>{PR_SAMPLES.slice(0, 2).map(s => <div key={s.no} style={{ height: 120, borderRadius: 18, background: T.surface, border: `1px solid ${T.line}` }} />)}</div></Body></>, <>{scrimF(T)}<Sheet T={T} h={640} title="New sample" foot={<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Meta T={T}>S-0419 · from the sample series</Meta><span style={{ flex: 1 }} /><T.Btn style={{ height: 44 }} icon="plus">Create · add first move</T.Btn></div>}>
    <div style={{ display: 'flex', gap: 8 }}><Field T={T} label="Sample no" value="S-0419 · auto" /><Field T={T} label="Category" value="Lehenga" caret w={140} /></div>
    <PrLab T={T} style={{ marginTop: 12 }}>Photos · sketch, reference, first piece</PrLab>
    <div style={{ display: 'flex', gap: 8 }}>{['Sketch', 'Reference', 'First piece'].map((t, i) => <span key={t} className="press" style={{ flex: 1, height: 84, borderRadius: 14, border: `1px dashed ${T.line2}`, background: i === 0 ? T.chipBg : 'transparent', display: 'grid', placeItems: 'center', color: T.ink2, fontFamily: T.fontUI, fontSize: 11 }}><span style={{ textAlign: 'center' }}><Ic name={i === 0 ? 'pen-tool' : 'camera'} size={18} /><div>{t}</div></span></span>)}</div>
    <div style={{ display: 'flex', gap: 8, marginTop: 10 }}><Field T={T} label="Colours to try" value={<span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}><Dot n="Wine" />Wine <Dot n="Bottle" />Bottle <Ic name="plus" size={12} /></span>} /><Field T={T} label="Designer" value="Priya S" caret w={120} /></div>
    <Field T={T} label="References" ph="Pinterest board · client photo · WhatsApp" icon="link" style={{ marginTop: 8 }} />
    <Field T={T} label="Notes" ph="what to try first, what to avoid" style={{ marginTop: 8 }} />
    <Meta T={T} style={{ display: 'block', marginTop: 8 }}>target price is set on the desk · shows in the catalogue as TBD once deployed</Meta>
  </Sheet></>);
}
/* P18 Assign karigar sheet (no rate on the floor · the desk sets it) */
function ScreenPAssign({ T }) {
  const o = prOrder('PO-1187');
  return frameF(T, <><PrHeader T={T} title="PO-1187 · 2798" back noSearch /><Body><div style={{ padding: '12px 10px 8px', borderRadius: 16, background: T.surface, border: `1px solid ${T.line}` }}><ProcTimeline T={T} o={o} wide active="Latkan" /></div></Body></>, <>{scrimF(T)}<Sheet T={T} h={700} title="Assign · Latkan · PO-1187" foot={<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Meta T={T}>job card prints · rate on the desk</Meta><span style={{ flex: 1 }} /><T.Btn style={{ height: 44 }} icon="user-plus">Assign · unlock job</T.Btn></div>}>
    <Meta T={T}>27 pcs of wip_emb waiting on the floor · 4 d idle · skill Latkan</Meta>
    <div style={{ marginTop: 8, borderRadius: 14, border: `1px solid ${T.line}`, background: T.surface, overflow: 'hidden' }}>{[['k3', true], ['k2', false]].map(([id, on], i) => { const k = prK(id); return <div key={id} className="press" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', borderTop: i ? `1px solid ${T.line}` : 0, background: on ? T.accentSoft : 'transparent' }}><span style={{ width: 34, height: 34, borderRadius: 10, background: T.ink, color: T.bg, display: 'grid', placeItems: 'center', fontFamily: T.fontDisplay, fontSize: 13, fontWeight: 600 }}>{k.name.split(' ').slice(0, 2).map(w => w[0]).join('')}</span><span style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.fontUI, fontSize: 13, fontWeight: 600 }}>{k.name}</div><Meta T={T}>score {k.score} · on time {k.onTime} % · {k.jobs} jobs · {k.withThem} with him · {k.cap} pcs/day</Meta></span><span style={{ width: 22, height: 22, borderRadius: 11, border: `1.5px solid ${on ? T.accent : T.line2}`, display: 'grid', placeItems: 'center' }}>{on && <span style={{ width: 10, height: 10, borderRadius: 5, background: T.accent }} />}</span></div>; })}</div>
    <PrLab T={T} style={{ marginTop: 12 }}>Tranches · 85 pcs</PrLab>
    <div style={{ display: 'flex', gap: 6 }}>{['30 / 30 / 40', '50 / 50', '100', 'Custom'].map((t, i) => <T.Chip key={t} on={i === 0} outline={i !== 0} style={{ height: 28 }}>{t}</T.Chip>)}</div>
    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>{[['R1 · 26 pcs', '16/09/26'], ['R2 · 26 pcs', '23/09/26'], ['R3 · 33 pcs', '30/09/26']].map(([l, d]) => <Field key={l} T={T} label={l} value={d} icon="calendar" small />)}</div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}><T.Chip outline icon="users" style={{ height: 28 }}>Split · add a second karigar</T.Chip><Meta T={T}>pieces per colour each</Meta></div>
    <div style={{ marginTop: 10, padding: '8px 10px', borderRadius: 12, background: T.chipBg, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2 }}>Latkan turns Ready to issue for 27 pcs · job card PO-1187-J3 prints with its balances</div>
  </Sheet></>);
}
/* P20 Jobber entry · the karigar records a receive or a hand-over on his phone, unverified until the floor checks */
function ScreenPJobber({ T }) {
  const j = PR_JOBS.find(x => x.id === 'PO-1187-J2');
  return frameF(T, <><div style={{ background: T.header, borderBottom: `1px solid ${T.line}`, boxShadow: T.headerShadow, paddingBottom: 8, marginTop: -54, paddingTop: 54, flex: 'none' }}><PrTop T={T} title="Record pieces" back role="Jobber · Saleem" /></div>
    <Body style={{ padding: '10px 14px 130px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Pill T={T} tone="ok" fill small>Scanned</Pill><Meta T={T}>PO-1187-J2 · Embroidery · your job</Meta></div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 8 }}><Thumb T={T} d={j.d} w={56} h={70} r={12} /><span style={{ flex: 1 }}><Num T={T} size={22}>2798</Num><Meta T={T} style={{ display: 'block', marginTop: 3 }}>with you 18 pcs · Sky 5 · Purple 13</Meta></span></div>
      <PrLab T={T} style={{ marginTop: 14 }}>Sending to</PrLab>
      <div style={{ display: 'flex', gap: 6 }}>{['Floor godown', 'Another karigar'].map((t, i) => <T.Chip key={t} on={i === 0} outline={i !== 0} style={{ height: 30 }}>{t}{i === 1 && <Ic name="chevron-down" size={12} />}</T.Chip>)}</div>
      <PrLab T={T} style={{ marginTop: 12 }}>Pieces by colour</PrLab>
      {[['Sky', 5, 5], ['Purple', 13, 10], ['Peach', 0, 3]].map(([c, w, n]) => <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderTop: `1px solid ${T.line}` }}><Thumb T={T} d={j.d} w={26} h={32} r={7} /><Dot n={c} /><span style={{ flex: 1, fontFamily: T.fontUI, fontSize: 13 }}>{c}<Meta T={T} style={{ marginLeft: 6 }}>{w} with you</Meta></span><T.Step v={n} /></div>)}
      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}><span className="press" style={{ width: 96, height: 96, borderRadius: 14, border: `1px dashed ${T.line2}`, background: T.chipBg, display: 'grid', placeItems: 'center', color: T.ink2 }}><span style={{ textAlign: 'center', fontFamily: T.fontUI, fontSize: 11 }}><Ic name="camera" size={20} /><div>Lot photo</div></span></span><Field T={T} label="Note" ph="e.g. 3 Peach from the extra net" /></div>
      <div style={{ marginTop: 12, padding: '8px 10px', borderRadius: 12, background: T.warn + '14', border: `1px solid ${T.warn}55`, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2 }}><b style={{ color: T.ink }}>Unverified until the floor checks it</b> · no gate token, no due yet · you will see "verified" here once punched</div>
    </Body>
    <div style={{ position: 'absolute', left: 14, right: 14, bottom: 22, display: 'flex', gap: 8, padding: 8, borderRadius: 24, ...glass(T) }}><T.Btn icon="send" style={{ flex: 1, height: 48 }}>Record 18 pcs</T.Btn></div>
  </>, null);
}
/* P23 Production · locked for this role · ask for access */
function ScreenPLocked({ T }) {
  return frameF(T, <><PrHeader T={T} noSearch title="Production" />
    <Body style={{ padding: '30px 22px 110px', textAlign: 'center' }}>
      <span style={{ width: 64, height: 64, borderRadius: 20, background: T.chipBg, display: 'inline-grid', placeItems: 'center', color: T.ink2 }}><Ic name="lock" size={26} /></span>
      <div style={{ fontFamily: T.fontDisplay, fontSize: 24, fontWeight: 600, marginTop: 14 }}>Production is locked for your role</div>
      <Meta T={T} style={{ display: 'block', marginTop: 6, whiteSpace: 'normal', lineHeight: 1.4 }}>Sale executive · you can ask the owner for access for a fixed time. Approved access shows here and in Home › Approvals.</Meta>
      <PrLab T={T} style={{ marginTop: 22, textAlign: 'left' }}>Ask for access</PrLab>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>{['24 hours', '1 week', '1 month', '3 months'].map((t, i) => <T.Chip key={t} on={i === 1} outline={i !== 1} style={{ height: 40, justifyContent: 'center' }}>{t}</T.Chip>)}</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>{['View only', 'Edit'].map((t, i) => <T.Chip key={t} on={i === 0} outline={i !== 0} style={{ height: 36, justifyContent: 'center' }}>{t}</T.Chip>)}</div>
      <Field T={T} label="Why" ph="e.g. checking delivery dates for Nalli's order" style={{ marginTop: 10, textAlign: 'left' }} />
      <T.Btn icon="send" style={{ width: '100%', height: 44, marginTop: 12 }}>Ask the owner · 1 week, view only</T.Btn>
      <div style={{ marginTop: 14, padding: '8px 10px', borderRadius: 12, background: T.chipBg, fontFamily: T.fontUI, fontSize: 11.5, color: T.ink2, textAlign: 'left' }}>Last request · 1 month view only · approved by Rohan Mehta · expired 31/08/26</div>
    </Body></>, prDock(T));
}
/* P1 Purchase inward · capture */
function ScreenPInward({ T }) {
  return frameF(T, <><PrHeader T={T} node="Purchase" placeholder="PO, supplier, material" count="3 arriving this week" chips={[['PO-linked', true], ['Ad hoc', false], ['Today', false], ['Pending approval', false]]} />
    <Body>
      <div style={{ padding: 12, borderRadius: 18, background: T.surface, border: `1px solid ${T.line}` }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><Mono T={T}>PU-0342</Mono><span style={{ fontFamily: T.fontDisplay, fontSize: 17, fontWeight: 600, flex: 1 }}>Surat Textiles</span><Meta T={T}>expected today</Meta></div>
        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}><span className="press" style={{ width: 96, height: 96, borderRadius: 14, background: T.chipBg, display: 'grid', placeItems: 'center', color: T.ink2, border: `1px dashed ${T.line2}` }}><span style={{ textAlign: 'center', fontFamily: T.fontUI, fontSize: 11 }}><Ic name="camera" size={20} /><div>Lot photo</div></span></span><span style={{ flex: 1 }}>{[['m3', 200, 200], ['m5', 500, 480]].map(([id, ord, got]) => { const m = prMat(id); return <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0' }}><Swatch m={m} w={30} h={34} r={7} /><span style={{ flex: 1, minWidth: 0, fontFamily: T.fontUI, fontSize: 12.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{prMatName(m)}<Meta T={T}> · {ord} {m.unit} ordered</Meta></span><span style={{ width: 62, height: 32, borderRadius: 9, border: `1px solid ${got < ord ? T.warn : T.line2}`, display: 'grid', placeItems: 'center', fontFamily: T.fontUI, fontSize: 12.5, fontWeight: 600 }}>{got}</span></div>; })}<Meta T={T} style={{ display: 'block', marginTop: 4 }}><span className="press" style={{ color: T.accent }}>Material not on the order? add it</span> · a new shade lands as a draft master</Meta></span></div>
        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}><Field T={T} label="Supplier invoice" value="ST/26-27/0891" small /><Field T={T} label="Date" value="08/09/26" small w={100} /></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}><Pill T={T} tone="warn" small>Variance · Cancan −20 m</Pill><span style={{ flex: 1 }} /><Meta T={T}>rates on the desk</Meta></div>
        <T.Btn icon="package-check" style={{ width: '100%', height: 44, marginTop: 10 }}>Take inward · to approval</T.Btn>
      </div>
      <Meta T={T} style={{ display: 'block', margin: '10px 4px 0' }}>Pictures shared to the WhatsApp / Telegram number attach here automatically.</Meta>
    </Body></>, prDock(T));
}

Object.assign(window, { PR_SHADE, prShade, prTex, Swatch, PR_PROC, PR_SEQ_PROC, PR_ACTIVE, PR_REASON_TONE, ReasonChip, prDays, PrNextPill, InOut, JobRow, ColourChipsP, ReceiveSheetBody, ScreenPReceiveFG, RecipeFlags, DesignChip, DyeRowP, ScreenPBulkIssue, ReadRing, ScreenPSampleReceive, ScreenPNewSample, ScreenPAssign, ScreenPJobber, ScreenPLocked, PR_MATS, prMat, prMatName, PR_KARIGARS, prK, PR_D, PR_RECIPE, prWipName, PR_ORDERS, prOrder, prQty, PR_JOBS, PR_STATE_TONE, JobChip, OrderPill, Pips, ProcTimeline, ColourQty, JobCard, StockWord, MatRow, MatCard, PR_DYERS, PR_CUTS, PR_SAMPLES, PR_MOVES, prMoveLine, PR_NODES_P, PrTop, PrNodes, PrHeader, prDock, PrLab, Field, Tbl, prMoney, prInputs, InputsTable, ColourTable, PR_HIST, HistoryRows, OrderRowP, MoveCard,
  ScreenPJobs, ScreenPJobsFilters, ScreenPJob, ScreenPOrders, ScreenPLifecycle, ScreenPIssue, ScreenPReceive, ScreenPScan, ScreenPMaterials, ScreenPRecipe, ScreenPAverages, ScreenPDyeReceive, ScreenPDyers, ScreenPSamples, ScreenPSample, ScreenPNewMove, ScreenPInward });
