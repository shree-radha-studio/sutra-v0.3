# Dispatch — plan (5 Sep 2026)

Planning only. Nothing drawn, board untouched. Built from `design-system/research/brd-final.txt` lines 151–223
(the Dispatch section), `brd-dispatch.txt`, `dispatch-screens.txt` (same text as
`uploads/Dispatch-Module-Screen-Overview.docx`), the keyword sweep of `brd-masters.txt` and
`uploads/Business Req.txt`, the role lines (brd-final 26–39, Business Req 150–158), and the three v0.2 screenshots
(Ready, Packing collapsed, Packing focused) plus the Miro "To source" phone frame — for data and features only.

Sources are cited as F:line (brd-final), D:line (brd-dispatch), S:line (dispatch-screens), M:line (brd-masters),
B:line (Business Req).

## 0. Shape of the module

- Desk-first (a 24″ screen, F:154) with a phone companion for scanning on the floor. Laptop is the primary
  target; phone is for accessibility and the packer.
- Nodes in BRD order: READY · PACKING · BILLED | STOCK · OUT OF STOCK · SALE RETURN, each with a live count badge
  (F:154). Pending orders is the Ready right pane on web and the phone's default node (F:171); the phone scroller
  therefore has seven tabs (S:4).
- Web: the nodes are the "hard top bar buttons in the main window" (F:43, F:93) — a node strip under the header,
  inside `WebShell`, with the LIVE/OFFLINE chip and the counts. Phone: the nodes are a `Lists`-style scroller under
  the search island (display face, current node a filled pill), opening on Pending; the right-corner sub-menu
  dropper (F:43) is the existing side menu.
- Money: rates and amounts only on the pending pane, the packing desk (right pane) and Billed. Never on the Ready
  board, never on the packer's phone (F:219). Money is omitted server-side for roles without the right (M:121),
  so a screen either has the ₹ column or does not — nothing is greyed.
- Realtime: LIVE/OFFLINE chip on every node; a failed refresh keeps the last list behind an inline notice
  ("Showing the last loaded list") (F:171, F:220).
- Roles (F:31–39, F:222, B:152–158): Dispatch manager and Sale manager edit everything; Sale executive views and
  edits sale orders only; Dispatch packer views the floor and scans, no money; Production manager and Production
  warehouse executive view (Out of stock, material stock); Accounts approves returns and credit notes; Guard sees
  only gate tokens (Home › Gate pass hub).

## 1. Sub-menus (BRD order)

1. Ready orders (F:156)
2. All pending orders (F:170)
3. Packing terminal (F:176) — desk + phone companion + live invoice + shipment
4. Billed (F:193) — sale invoices · shipments history · A4 print
5. Out of stock (F:199)
6. Warehouse stock (F:205) — finished goods · material · work in progress
7. Sale return (F:211) — four-step wizard

The side menu already lists nine entries (Ready orders, Pending orders, Packing, Invoice review, Shipments, Billed,
Out of stock, Warehouse stock, Sale return); Invoice review and Shipments are states of Packing, kept as deep links.

## 2. Screens in flow order

Format per line: purpose · who · web right pane · phone floats/sheets · money · links.

### 2.1 Ready orders

**W1 Ready board** — one card per customer with a priority ring (P1→P5), customer head (name, tier chip, market ·
city, call chips for customer, transporter, broker), per order (order no in mono, created date, due-days pill red at
≤ 2 d, amber "n/m pcs in stock" when partial, priority disc, note strip), per line (photo 40, design no head, colour
dot, × qty, stock tick), footer "n pcs · m packable" and PACK ▸; a fully covered customer shows a "Fully planned"
tag instead. Left queue rail: sort (8: customer score, priority, total pcs ↑↓, due days ↑↓, created ↑↓; default due
days oldest first) and 6 filters (due days <, created before, in-stock only, tier, priority, total pcs <) as removable
chips with live "n orders · m pcs"; search customer or design; collapse-all / expand-all · Dispatch manager, Sale
manager · right pane: Pending orders (2.2), read-only, collapsible to a rail · — · no money anywhere on this board ·
PACK ▸ flips the customer's approved orders to PACKING, opens one empty parcel, jumps to W3 with it selected.

**P1 Ready board** — the same cards in one column, priority ring, PACK ▸ full width; search in the island, node
scroller above · manager on the floor; packer sees it read-only · — · P2 as a sheet · no money · PACK ▸ → P4.

**P2 Ready · filters & sort sheet** — the queue rail as a sheet: sort segment, the six filters, Reset, "Show n
orders"; shared by Pending (same axes, F:173) · manager · — · sheet over P1 / P3 · — · —.

### 2.2 All pending orders

**W2 Pending orders · full node (proposed, see Q2)** — the whole approved book grouped by customer in three levels:
customer chip (name, N orders · P pcs, due-days pill) → customer (tier, market · city, call chips, total pcs and ₹)
→ order row (order no, date, red "n short" badge, priority disc) → order (lines: photo, design, colour, qty × ₹rate =
₹amount, "n of this design is at the last production step" against short lines). Queue rail with search, sort and
filters; expand-all / collapse-all; offline notice strip · manager, accounts, sales roles with the money right ·
right pane: none (the list is the pane elsewhere); or the selected customer's dossier snippet (open book, score) —
proposal · — · ₹ rates and amounts (F:174) · no actions (F:175); links to the sale order (Catalogue › Sale orders)
and the customer dossier (Hub).

The same component docked as the Ready right pane in W1 (F:169), 340 wide, search only, drag-resizable.

**P3 Pending orders · default node** — the three levels with one customer and one order expanded in the frame,
customer chips scroll, search + P2 sheet · everyone on the phone; ₹ only for roles with the money right (Q1) · — ·
P2 · ₹ per order line for manager roles, omitted for the packer · same links as W2.

### 2.3 Packing terminal

**W3 Packing terminal · live** — top: customer chips row as the master selector (name, shortfall "n OOS", parcels
"invoiced / on floor", progress bar, packed / ordered pcs) plus All parcels; roughly eight customers live at once
(B:91). Left pane Current order: customer head (name, city, call chips), the live order book collapsible order no →
design no → colour line, per line photo, colour × qty, "N in stock · M pending", progress disc ✗ / n⁄m / ✓, PACK ›
(adds one piece to the open box for unscannable items). Main: parcel cards (customer monogram bar, code AA01, status
pill OPEN / PACKED / INVOICED, PACKING INTO tag on the active box, lines with photo, design · colour × packed/planned,
stepper, remove; + Add line; CLOSE PARCEL), + Add parcel below; controls collapse/expand, sort (board order, pcs,
created), filter (open / packed-awaiting-invoice / invoiced-awaiting-shipment), Scan here toggle, Select for shipment
· Dispatch manager (desk) · right pane Live invoice: letterhead, bill-to, Title | Colour | Qty | Rate | Amount
building as pieces land, pcs and ₹ total · — · ₹ only in the right pane; none on the left pane (S:34) · order no on
every line (the invoice carries every order number the pieces came from, B:87); barcode grains SKU vs PIECE (M:114).

**W4 Packing · scan armed, rejected scan** — Scan here on (desk claims the scanner, phone cannot double-fire), a
line pulsing on accept, an accepted-with-warning strip ("stock exhausted"), and a loud rejection strip with the reason
(duplicate · not in this order · line full · parcel closed · unknown serial; the three-step SKU guard, M:114); the
remove/stepper confirm dialog ("These pieces become scannable elsewhere") · desk · right pane: live invoice · — ·
as W3 · —.

**W5 Packing · invoice review** — CLOSE PARCEL flips the box to PACKED with "Review invoice"; right pane REVIEW:
amber banner "Fix qty and rate, then confirm — nothing reaches accounts until you do", editable qty and rate, Bill-to
selector (the customer, interconnected gaddi / branch ledgers, + add new; snapshot not join, M:117), GST block
(taxable value, CGST/SGST or IGST by place of supply, rounding, grand total, amount in words; HSN column present,
U33 open), Confirm · desk · right pane: invoice REVIEW · — · ₹ editable here only · Busy push on confirm.

**W6 Packing · invoice done, select for shipment** — right pane DONE: invoice no, totals, "Pushed to accounts ·
print flagged", Print A4; the box greyed "Awaiting shipment"; Select for shipment mode ticking invoiced boxes with the
floating bar "3 parcels · 28 pcs → Create shipment" · desk · right pane: invoice DONE · — · totals visible · A4 →
W8; gate token auto-generated on the invoice (F:57).

**W7 Packing · close shipment sheet** — consignee selector (ship-to ledgers interconnected to the customer, + add
new), transporter (first-class master, M:69) and broker read from the customer, pre-ticked list of invoiced-unshipped
parcels with pcs and invoice numbers, optional note, "Issue transport document"; unticked parcels stay for the next
trip · desk · right pane: dimmed under the sheet · — · no ₹ on the sheet (parcels and pcs) · transport document
→ W8; gate token; Billed › Shipments history.

**W8 Print · A4 sale invoice and transport document** — the A4: letterhead, bill-to vs goods-for split, order
numbers carried, lines, GST block, amount in words, gate token line; beside it the transport document for one
shipment (consignee, transporter, parcel list, pcs, invoice numbers) · desk, accounts · full-window preview with Print
and Re-print · — · full money · re-printable from Billed (F:197, F:195).

**P4 Packing · picker** — the customer chips as rows (name, shortfall, parcels, progress, packed / ordered), then
that customer's boxes (open ones with pcs, + New box); wake lock notice · packer, manager · — · — · no money ·
picks the box, → P5.

**P5 Packing · scan** — camera in the scan chrome (focus frame, back), the box code and customer on a glass chip,
a giant tally "12 pcs" that tints ok on accept, the last scanned line (photo, design · colour × packed/planned), an
accepted-with-warning strip identical to the desk's · packer · — · rejection sheet P6 · no money · same server
validation as the desk.

**P6 Packing · scan rejected** — the loud state: danger strip with the reason in words, the tally unchanged, the
offending serial shown, "Scan again" · packer · — · — · no money · —.

**P7 Packing · review box** — the box's lines with photo, design · colour × packed/planned, stepper and remove
behind the confirm, + Add line, CLOSE PARCEL "hands the box to the desk for review" · packer · — · confirm sheet ·
no money · → desk W5.

**P8 Packing · invoiced** — the box after the desk confirms: code, INVOICED pill, invoice no, pcs, "Awaiting
shipment", back to the picker · packer · — · — · no ₹ (invoice number and pcs only) · —.

### 2.4 Billed

**W9 Billed · sale invoices** — invoiced orders grouped by customer; per order: order no, created on, delivered on,
delivered in n days, lines design · colour · qty × rate = amount, order total; customer total and a "still pending
n pcs" chip (B:92); filters date range (today), tier, transporter, URL-persisted · accounts, manager · right pane
Invoice: customer score, last broker, last purchase, voucher no, totals, Return ▸ (→ W15 pre-filled), Re-print A4 ·
— · full money · customer dossier (Hub › Invoices & payments); Payments CRM trigger on delivery (F:97).

**W10 Billed · shipments history** — one row per shipment: shipment no, date, consignee, transporter, broker,
parcels, pcs, invoice numbers carried, gate token; expandable to the parcel list · accounts, manager · right pane:
the transport document for the selected shipment with Re-print · — · no ₹ (parcels and pcs; invoice numbers) ·
transporter dossier (Hub › Transporters › Shipments).

**P9 Billed · sale invoices** — customer groups → orders → lines, the same filters as a sheet, "still pending"
chip · manager, accounts on the phone; packer read-only without ₹ · — · filters sheet, P10 · ₹ by role (Q1) · —.

**P10 Billed · invoice view sheet** — score, last broker, last purchase, voucher no, totals, Return ▸, Re-print ·
manager, accounts · — · sheet over P9 · ₹ by role · → P17.

**P11 Billed · shipments history** — rows expanding to parcels, Re-print transport doc · manager · — · — · none ·
—.

### 2.5 Out of stock

**W11 Out of stock** — counts strip (pcs to produce · sourceable now · in production, not at the last step · nothing
in production in danger tone, linking to Production); toggle Sourceable now / Everything short, Restock suggestions
on/off, three sorts, karigar filter; two card kinds: ORDER (photo, design no head, colour matrix pcs needed · at last
step · in order · received · six due dates with "Nil" cells in danger tone, karigar pills with score and call, link to
the product page) and RESTOCK ("selling 4/day · 22 d cover · 18 free · score 61", rule: velocity > 0, cover below the
lead time, not flagged priority sale) · Dispatch manager, Production manager (F:36) · right pane (proposed, Q8): the
selected design's production summary — jobs by step with karigar and due dates, and the pending orders wanting it ·
— · no money · Production › Lifecycle and Job cards; Catalogue product page; the nightly demand engine (Hub tags).

**P12 Out of stock** — the Miro frame redrawn: design no head with photo, the colour matrix scrolling sideways
inside the card, karigar pill with score and call, one ORDER and one RESTOCK card in the list · production manager,
dispatch manager · — · P13 · no money · same links.

**P13 Out of stock · filters sheet** — Sourceable now / Everything short, Restock on/off, three sorts, karigar
picker, Reset, Show · same · — · sheet · — · —.

### 2.6 Warehouse stock

**W12 Stock · finished goods** — tabs Finished goods · Material · Work in progress; stat tiles over the whole
filtered set (SKUs, pcs in stock, low, out); rows per design + colour: photo, design no (→ catalogue), colour, FG
stock, in production, status pill OUT OF STOCK / LOW / OK; search, sorts (scarcity first), filters low only, out only,
in production only; paged without truncating totals · manager; production warehouse executive views · right pane
(proposed, Q8): the selected SKU's stock bars free · reserved · coming (the salesperson-view `Stack`) and the last
inward · — · no money · Catalogue product page; Hub › Items.

**W13 Stock · material** — rows per material + shade with photo: on hand, on order, consumed this month, reorder
level, supplier · production warehouse executive, manager · right pane: supplier and last GRN (proposed) · — · no
money · Production › Purchase; Hub › Materials (no reorder level exists yet, M:50, U34).

**W14 Stock · work in progress** — pcs by design and colour at each step, the karigar holding them, days at that
step · production roles view · right pane: karigar balance (proposed) · — · no money · Production › Lifecycle; Hub ›
WIP.

**P14 Stock · finished goods** · **P15 Stock · material** · **P16 Stock · WIP** — the three tabs as a pill row, stat
tiles as a 2×2, list rows, filters sheet reused · same roles · — · filters sheet · no money · same links.

### 2.7 Sale return

**W15 Return · 1 Customer** — step rail always visible (Customer → Pieces → Preview → Credit note); pick the
customer, enter parcels accepted (the first count), multi-select the dispatched / invoiced orders being credited ·
desk (dispatch manager); accounts approves later · right pane (proposed, Q8): customer snapshot — score, return
ratio, payment overdue, recent invoices (the facts the approver sees, F:46) · — · none at this step · Home ›
Approvals (sale return); Gate pass hub (manual token by the guard, F:57).

**W16 Return · 2 Pieces** — scan to resolve design + colour at the order's price, or search a design and tap a
colour chip; repeat scans bump the line; qty editable, zero removes · desk · right pane: running lines with rate,
amount and total · — · ₹ on the desk · —.

**W17 Return · 3 Preview** — design · colour · qty · rate · amount, totals, note; blockers listed in words ("Order
SO-2607 is not invoiced yet") above a Submit that stays visible · desk · right pane: the note and the blockers · —
· ₹ · —.

**W18 Return · 4 Credit note** — CN number, return no, parcels, orders, total, "Stock on approval" badge, Print;
recent notes list as the audit trail · desk, accounts · right pane: the printed note preview · — · ₹ · pieces
re-enter FG only on accounts approval (F:217); commission claw-back open (M:385).

**P17 Return · 1 Customer** · **P18 Return · 2 Pieces (scan)** · **P19 Return · 3 Preview** · **P20 Return · 4
Credit note** — the wizard on the phone with the step rail as a top strip; scan uses the scan chrome; money by role
(Q1, Q3) · manager; packer scans only · — · confirm sheets · ₹ by role · same links.

Counts: 7 sub-menus · 20 phone screens · 18 web screens (each in light and dark).

## 3. Found elsewhere in the BRD

Each line: source, one-line quote, what it changes.

- F:5 and F:103 — "the last 'Final' process … is always received in the Finished Goods Warehouse (Dispatch Module)".
  FG inward belongs to Dispatch (Q4).
- F:12 — "All ready orders (i.e. 'Pending Orders') are checked against in-stock items … Default due days … is 20
  days, or the order stands 'Holded'". Due-days pill counts from the order's own due date; a held order needs a
  state on the pending row.
- F:13 — "Once the dispatch is done, the payment gets due on customer confirmation that they have received." Billed
  needs a delivered-on source (Q5).
- F:16 — "sale, purchase, dispatch … in separate books … with its own number-with-letter code series". Invoice,
  shipment and credit-note numbers carry a book prefix; the review pane shows the book.
- F:31–39 — the role list: "Dispatch Packer - View dispatch module and scanning ability only." "Production Manager -
  … and OUT of Stock tab." "Guard - … gate pass module only".
- F:43 and F:93 — "hard top bar buttons in the main window in webview … dispatch has Ready, Packing, Billed etc.";
  phone "right side menu dropper button on the right corner". Node strip on web, scroller + side menu on phone.
- F:46 — "sale return is approved by seeing customer score, return order, links to actual bills they have returned
  from, return ratio…". The return wizard's customer pane shows these; approval itself is Home › Approvals.
- F:52 — approval card shows "Current Order Pcs (+ Pcs in stock)". Cross-link only.
- F:57 — "Sale Dispatches/Invoices … generate a 'Gate Pass Token' … Manual ones are the ones created by the guard
  … like sale returns". Token number on the invoice, shipment row, transport document and credit note.
- F:79 — Catalogue › Sale orders has a "Dispatched Orders" tab. Billed rows link back to the sale order.
- F:97–98 — "Payment Due … a sale has been made and dispatch has been confirmed". Delivery confirmation triggers the
  Payments CRM journey.
- F:121 — "the final one arrives as 'Finished Good', entry for which is taken in the dispatch module, where FG
  stock is affected". Same as Q4.
- F:263–267 — Hub reports for Dispatch: "Pending Orders · Invoiced and Shipped · Warehouse Stock · Movement
  Metrics". Report views live in Hub; Dispatch screens link out, nothing duplicated.
- F:272 — "Sale Invoice Pending Payments (with overdue filter)". Not a Dispatch screen; Billed links to it.
- F:292 — "Dispatch Ready Order Cards and Packing Cards View reference". The reference images are not in the text;
  the v0.2 screenshots stand in.
- M:69 — Transporters: "name · Call · city / state · shipments · parcels · pcs · value · customers · last shipment".
  Shipment rows link to the transporter dossier; the consignee sheet picks a real transporter master.
- M:88 — Customer dossier tabs "Invoices & payments · Shipments · Returns & credit notes". Billed and Return link
  there.
- M:114 — "SKU barcodes may scan many times into many parcels; PIECE barcodes are globally unique … three specific,
  loud errors: is the serial known, is that SKU actually in stock, is it eligible for THIS parcel's customer". The
  rejection copy on W4 and P6.
- M:115 — PIECE serials are minted from the product dossier "restricted to accounts and admin". Not a Dispatch screen.
- M:117 — "The invoice bill-to and the shipment ship-to selectors offer the ledgers previously interconnected to that
  order's customer, plus 'add new'. What lands on the document is a SNAPSHOT". Shapes W5 and W7.
- M:121 and M:126 — "a user without the money right does not receive rupee figures in the payload at all";
  "Salespeople … never see money". Columns are absent, not hidden.
- M:385 — RATIFY-1 "does a credit note claw it back?" Open in Hub; the credit note screen makes no claim.
- M:394 — U33 "HSN code and GST rate per design … The columns exist and are empty". The GST block shows HSN blank.
- M:400 — U30/U32 "whose ledger is the party when a bill goes to a branch or agency? … gaddi invoicing". Bill-to is
  drawn as the BRD describes; the rule stays open.
- B:47–50 — "packing slips from pending orders · invoices of packed boxes · sale returns · finished goods inwards
  (from last step of production)". The fourth item again (Q4).
- B:87 — "packed in parcel boxes of capacity of 10-12 pcs and an invoice is generated per parcel. Not per order …
  The invoice format has to contain all the order numbers the pcs are from". Order numbers on every invoice line.
- B:90 — the eight sorts and six filters, quoted in W1.
- B:91 — "usually has 7-8 packing programs going on at once. Another customer is picked only after 1 of the 7-8 is
  closed, billed and sent." Chips row sized for eight live customers.
- B:92 — "Total Billed Today - list of all invoiced pending orders today and the state of pending still left for
  those customers." The "still pending n pcs" chip on Billed (Q6).
- B:93 — "To source view … production progress (with due dates of incoming stock, and the jobbers calling number on
  the click of a button)". Covered by the karigar pill with call.
- B:158 — "Generate packing slip | Admin Yes | Sales Yes | Packing Yes". Packers can close a parcel; only the desk
  invoices (F:222).
- S:46 — v2 had "No GST / tax computation anywhere on the invoice"; v3 adds the GST block (F:190). Drawn.
- S:52 — v2 had "no shipments-history list". W10 / P11 add it.
- S:59 and S:78 — "Cover is measured against lead time (45 days), not the 'one month' in the original brief". The
  restock card prints "below lead time (45 d)" until told otherwise.
- S:75 — "decide whether Material and WIP are tabs here or their own node". v3 says three tabs (F:206); drawn as
  tabs.

## 4. Components

### Reused as they are

- Phone chrome: `frameF`, `T.TopBar`, `T.SearchBar` (scan button doubles as the floor scanner entry), `T.Lists`
  (as the node scroller), `T.Chip`, `T.Tag`, `T.Btn`, `T.Step`, `T.Bars`, `T.PhotoTag`, `T.H`, `T.Card`, `T.Kpi`,
  `T.Island` / `T.Dock` (Dispatch active; no cart strip on the floor), `scrimF` for sheets, the filters sheet
  pattern from `ScreenFFilters`, the scan chrome from `ScreenFScan`.
- Data: `PriceF` on every ₹, `StatusPill`, `CustomerBar` (customer head with tier, city, call chips — from Sale
  orders), `OrderLines` (order → design → colour lines), `SOTable` + `GroupIsland` (Billed and Stock tables),
  `Stack` (stock bars in the Stock pane), `Kpi` tiles for count strips.
- Web: `WebShell`, `Rail`, `Sidebar`, `WebHeader` (`headerRight` slot for the LIVE chip), `RightPane` (invoice,
  pending, transport doc), `LaptopDevice`.

### New for Dispatch (in `mod-dispatch.jsx`, exported on `window`)

- `NodeBar` — the six nodes with count badges; web strip under the header, phone scroller variant.
- `LiveChip` — LIVE / OFFLINE with a dot; `OfflineNotice` strip ("Showing the last loaded list").
- `QueueRail` — web left rail: sort segment, filter groups, active chips, "n orders · m pcs".
- `PriorityRing` — 2px ring in `--p1`…`--p5`; `PriorityDisc` — the small disc on order rows.
- `CustomerCard` — the Ready card; `OrderRow` (mono order no, date, `DueDaysPill`, partial tag, disc, note strip);
  `PackLine` (photo 40, design no head, colour dot, × qty, stock tick or `ProgressDisc` ✗ / n⁄m / ✓, PACK ›).
- `PendingTree` — the three-level collapsible list (chip → customer → order → lines).
- `CustomerChip` — packing master selector (name, shortfall, parcels, progress bar, packed / ordered).
- `ParcelCard` with `ParcelLine` — monogram bar, code, status pill, PACKING INTO tag, stepper + remove, Add line,
  Close parcel; greyed "Awaiting shipment" state.
- `ScanToggle`, `ScanStrip` (accepted · warning · rejected, same on desk and phone), `Tally` (phone giant count).
- `InvoiceSheet` — letterhead, bill-to, lines table Title | Colour | Qty | Rate | Amount, GST block, totals, in three
  states LIVE / REVIEW / DONE; `BillToSelector`.
- `ShipmentBar` (floating "N parcels · M pcs → Create shipment"), `ShipmentSheet`, `ShipmentRow` (history).
- `A4Invoice`, `TransportDoc` — print previews.
- `BilledGroup` — customer group with order rows, totals, "still pending" chip.
- `CountsStrip` (Out of stock), `ColourMatrix` (needed · last step · in order · received · six due dates, Nil cells),
  `KarigarPill` (score + call), `RestockCard`.
- `StockTabs`, `StockRow` (SKU / material / WIP variants).
- `StepRail` (wizard), `ReturnLine`, `BlockerList`, `CreditNoteCard` with the "Stock on approval" badge.
- `GateTokenChip` — the auto token reference on invoice, shipment and credit note.

Language notes carried into the build: the "green Fully planned pill" becomes a `Tag` in ok tone; the "green
flash" becomes an ok-tone tint on the tally; the parcel's "customer-colour bar" becomes a customer monogram and an
ink-tone bar (Q7); "Nil" cells and red pills use `danger`; one maroon line per screen stays the primary button
(PACK ▸, Close parcel, Confirm).

## 5a. Answers (8 Sep 2026) and what they change

Sources verified: the uploaded `Downloads/Business Requirements FINAL (2).docx` is byte-identical (md5
d19783ed…) to both copies in `design-system/uploads/`, and its text equals `research/brd-final.txt` apart from HTML
entity escaping (`&lt;`, `&gt;`, `&amp;`). `brd-masters.txt` is the extraction of
`uploads/Sutra-v3-BRD-Master-Views-and-Reports.docx`; `brd-dispatch.txt` of `uploads/Sutra-v3-BRD-Dispatch-Module.docx`.

1. **Money on the phone.** Both variants are drawn: manager (dispatch manager, sales manager, admin) with ₹, and
   packer without. Pending, Billed and the return preview / credit note each get the two frames.
2. **Right panes.** The search pane (mod-appshell.jsx `SearchPane`, dropping from the header field) is the common
   right-side pane for every module; each screen has its own module pane in `RightPane`, separate from it. So Pending
   stays the Ready screen's module pane, and the full Pending node opens with the queue rail; sort & filter and
   column choosers open as right drawers (chips guideline §2), never in the search pane. Web screens use the new
   chrome (`Rail2`, `TabStrip`, `WebHeader2`, `SubBar` with the Dispatch nodes, `RightPane`).
3. **Sale return.** Full wizard on the phone too. Returns are taken parcel-box-wise: one customer may send many
   boxes, one box may carry pieces from many bills, and a box may end in one credit note or several. The wizard's
   step 1 counts boxes and picks the bills; step 2 scans per box; step 4 raises the credit note(s) automatically and
   sends them to accounts approval before the Busy push. The return desk raises the note itself.
4. **FG inward.** A "last process" is marked in Production (lifecycle or process setting). That process's inward is
   the finished-goods inward at the warehouse, taken in Dispatch › Warehouse stock, not as a production receive:
   this is where pieces are counted into stock accounting. Adds screens W15 / P17 (FG inward: job → pcs by colour
   → verify → gate token) before the return wizard.
5. **Delivered on** = dispatch date + 3 days by default; Billed shows it as "delivered on (est.)" until edited.
6. **Billed** keeps the "still pending n pcs" chip per customer.
7. **Parcel colour** = customer monogram + ink bar; priority ring only on Ready, tokens `--p1…--p5`.
8. **Right panes, designed for the moment:** Out of stock → "Who is waiting" (the pending orders wanting this
   design, due soonest first, with the karigar who can serve it and a call button, so the desk can call a jobber
   and promise a date in one go). Stock FG → "This SKU" (stock bars free · reserved · coming, last inward, last
   sale, open orders wanting it, Move to Out of stock / Reserve for firm). Stock material → supplier and last GRN,
   used-in-active-jobs. Stock WIP → karigar balance and days at step. Return step 1 → "Customer at the counter"
   (score, return ratio, payment overdue, credit line, last three bills with quick-pick). Return steps 2–3 → the
   running credit note. Return step 4 → the printed note with its approval status.

Chips and filters (from `design-system/guidelines/chips-filters-sorts.md` §3E, the other chat's plan): Ready card
budget = priority ring + tier + due pill + one stock tag; rail quick chips Due ≤2d · Fully packable · Partial ·
P1/P2 · In-stock only; sorts Due days oldest first · Priority · Packable pcs · Total pcs · Customer score. Pending
adds Fully short · Has final-step qty, sorts Short pcs · Pending value. Packing filter Open · Packed, awaiting invoice
· Invoiced, awaiting shipment · Scan exceptions; scan results as toasts. Billed quick Today · Tier ▾ · Transport ▾ ·
Return initiated · Unshipped parcels. Out of stock: hard tabs Order shortages · Restock suggestions, one sourcing chip
per card (Sourceable now ok · In production, not last step info · Nothing in production danger), quick Sourceable
now · Nothing in production · At last step · Priority Production · Restock on/off. Stock FG quick Out · Low · In
production · Reserved · Free > 0 (OK is silent). Material quick Low · Out · On order · Used by active job. WIP quick
Waiting on floor · With karigar · Aged · Next process ready · Stuck. Return recent-notes quick Pending accounts ·
Stock on approval · Approved · Recent.

Revised counts: 7 sub-menus · 26 phone screens · 19 web screens. Files: `mod-dispatch.jsx` (shared components and
phone) and `mod-dispatch-web.jsx` (web). Since the board restructure of 9 Sep the module registers itself from the
end of `mod-dispatch-web.jsx` (`window.NEW_DRAFT_MODULES.push({...})`) and is listed in `modules.js`; it opens on its
own page `board.html?m=dispatch`. Single frames: `board.html?m=dispatch&only=n-1…26` (phone light), `nd-` (phone
dark), `nw-1…23` / `nwd-` (web; the 19 Dispatch screens come first, the four "on the approved bar" screens from
mod-topbar2.jsx after). Never edit index.html or board.html to register a module.

## 5. Open questions (answered above, kept for the record)

1. **Money on the phone.** F:219 says never on the phone; F:171–174 make Pending (with ₹) the phone's default
   node. I propose role-gating: the packer never gets ₹ (omitted server-side), manager and accounts roles see ₹ on
   Pending and Billed on the phone. Draw the manager variant, or the packer variant, for P3, P9, P10?
2. **Pending on web.** The BRD makes it the Ready right pane only, but asks for sort and filter "navigable without
   scrolling" (F:173), and the side menu lists it. I propose both: the docked pane on Ready, plus a seventh node
   button opening W2 full-width with the queue rail. Keep W2?
3. **Sale return on the phone.** Full four-step wizard (P17–P20), or a scan companion like packing (customer + pieces
   on the phone, preview and credit note on the desk)? I lean to the companion; it keeps money off the floor.
4. **Finished-goods inward.** F:5, F:121 and B:50 put the FG inward entry (last-step receive) in Dispatch, but the
   v3 Dispatch section has no such screen. Add "FG inward" under Warehouse stock (receive from the last job, verify,
   gate token), or is it Production's receive with Dispatch only viewing?
5. **Delivered on.** Billed shows delivered on and delivered-in-days (F:194) and the payment journey starts on
   customer confirmation (F:13, F:97). Where is delivery recorded — a "Mark delivered" action on the Billed row, the
   transporter, or CRM?
6. **Billed today.** B:92 wants "the state of pending still left for those customers" on Billed; the v3 text omits
   it. Keep the "still pending n pcs" chip per customer group?
7. **Parcel colour.** v0.2 gave every customer a random pastel bar and ring. In our language I propose the
   customer's monogram plus an ink-tone bar on parcels, and the priority ring (design-system `--p1`…`--p5`: red,
   orange, amber, taupe, sand) only on Ready cards. Agree, or keep a per-customer colour?
8. **Proposed right panes** where the BRD is silent: Out of stock (selected design's production summary), Stock
   (selected SKU stock bars), Return step 1 (customer snapshot with score and return ratio). Keep, or collapse the
   pane on those nodes?

Assumptions I will build on unless told otherwise: GST block drawn with a blank HSN column (U33 open); restock copy
says "below lead time (45 d)"; the gate token appears as a chip on invoice DONE, shipment rows, the transport
document and the credit note; parcel cards show a plain pcs count (no capacity mark, boxes vary); Warehouse stock is
three tabs, not three nodes.
