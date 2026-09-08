# Production — plan (8 Sep 2026)

Planning only, written before looking at the agency prototype or its screenshots. Built from
`design-system/research/brd-final.txt` lines 102–150 (the Production section) and the keyword sweep of the whole
file, `brd-masters.txt`, `brd-dispatch.txt`, `uploads/Business Req.txt` (the older BRD, lines 33–53, 96–110,
152–183), the role lines (brd-final 26–39, Business Req 152–158), the chips guideline
(`design-system/guidelines/chips-filters-sorts.md` §3D) and the owner's planning workbook `Busy Wireframe (1).xlsx`
(sheets "Product and Prod v2", "Dye", "Material Master", "Rough"). Section 6 holds what the owner said in the
brief of 8 Sep that no BRD contains.

Sources are cited as F:line (brd-final), M:line (brd-masters), D:line (brd-dispatch), B:line (Business Req),
X:sheet!cell (the workbook), C:line (chips guideline).

## 0. Shape of the module

- Web-first terminal. The production office plans, assigns and costs at a desk; the floor issues, receives and
  scans on the phone. Laptop screens are the primary drawings; phone screens cover the floor actions and reading.
- One idea holds the module together: **a product's recipe is set once per colour (process sequence + bill of
  material per process for 1 pc), a production order multiplies it by the ordered pieces per colour, and every
  process of every order is a job card** (F:121, F:132, F:135). Issue and receive always happen against a job; the
  user types pieces, the system computes material (F:121, X:Prod v2!P188 "open pop up for pcs by colour, then
  calculate with averages").
- States of a production order (F:104–114, B:163–176): Draft → Approved → Materials pending → Ready for issue →
  Process n issued → partially received → fully received → … → Final process received → Finished goods verified →
  Closed. Rules (F:116–120): partial issue and receipt allowed; received may be lower than issued; rejection,
  process loss and excess receipt recorded separately; the next process issues only from received WIP; the last
  process receipt makes finished goods (taken in Dispatch › Stock › FG inward, F:121, plans/dispatch.md answer 4).
- Job states (C:172–175): Unassigned · Ready to issue · Partially serviceable · Waiting on floor · Stuck (input out
  of stock) · Waiting previous process · At karigar · Finished; plus delayed (past a tranche date, F:103).
- Karigar payment falls due per piece received, paid within 30 days (F:5, F:103); job rate ₹/pc is set when the
  karigar is assigned, with three due tranches defaulting to 30 % + 30 % + 40 % (F:135).
- Money: job rates, material rates and costing are visible to Production manager, Production merchandiser and admin
  roles (F:36–37); the Production warehouse executive issues and receives but the BRD gives no money right (F:38),
  so floor screens on the phone carry no ₹. Money is omitted server-side for roles without the right (M:121).
- Photo-first (F:19–25, B:140–146): the design photo sits beside every design number and on every batch card; a
  material issue shows the material photo and the destination product photo; samples and materials may have no
  photo yet ("No photo yet").
- Gate pass: every issue and receive raises an auto gate token (F:57); it prints on the challan sticker.
- Books (F:16, F:234): production orders sit in category books; ready-made purchases from karigars go in a
  "Direct" book with the "Ready production" process (F:103, F:234).
- Approvals live in Home › Approvals (F:46): production order approval, overage approval (karigar score, job
  history, due dates, recipe), costing approval (PM or admin). Production screens show the state and link out.

## 1. Sub-menus (web header buttons, in flow order)

The BRD lists Purchase · Job process setting · Production lifecycle · Job cards · Costing · Karigars (F:122–150).
The older BRD adds an Overview and Samples (B:101, B:110). The owner's brief of 8 Sep adds a dye ledger, a
material catalogue with pictures, and folds the production order into the lifecycle. Proposed row (eight buttons,
short labels so they fit beside the head; the module root is the Overview):

1. Purchase ▾ — Orders · Inward · Return (F:123–126)
2. Materials ▾ — Catalogue · Dye ledger (owner brief; X:Dye; X:Material Master)
3. Process setting (F:127–133; X:Prod v2 rows 51–145)
4. Orders ▾ — Production orders · Lifecycle (F:134–139; X:Prod v2 rows 156–295) — one sub-menu, two views
5. Job cards ▾ — Cards · Swimlanes · Table · Gantt · Calendar (F:140–145, B:107, owner brief)
6. Samples ▾ — Board · Lifecycle (B:43–44, B:110, F:257, owner brief)
7. Costing (F:147–149)
8. Karigars (F:150)

Phone: Production is an island tab; the sub-menus are the right-corner dropper (side menu) and a scroller under the
search island, as Dispatch does. Floor users open on Job cards.

## 2. Screens in flow order

Format per line: purpose · who · web right pane (the module pane, distinct from the global search pane) · phone
floats/sheets · money · links.

### 2.0 Overview (module root)

**W0 Production overview** — KPI tiles: active orders, pcs in production, FG received today, serviceable jobs
(inputs in stock, not issued), delayed jobs, unassigned jobs (B:101); three recommendation strips with photo cards
and a "why" line: Priority production, Low-stock reorder, Stop further production (B:102–104, F:14); materials
arriving this week from the PO calendar (F:124); karigar payments due this week · Production manager, merchandiser
· pane: none (tiles link out) · — · ₹ only on the payments-due strip · Job cards, Orders, Purchase, Karigars.

### 2.1 Purchase

**W1 Purchase orders · calendar** — month calendar of expected arrivals; each PO a chip with supplier and material
thumb; a PO linked to a production order shows that order's due date beside it (F:124); list view toggle; cards
carry state pill, Production-blocking, Overdue, Partially received (C:166); New PO opens the form: supplier, book,
lines (material with photo, shade, qty, unit, rate for money roles), expected date, capture a photo from WhatsApp /
Telegram (F:103), link to a production order · merchandiser, warehouse executive · pane: New PO form, or the picked
PO with its inwards and linked production due · — · rate for money roles · Inward (take inward of this PO), Hub ›
Suppliers.

**W2 Purchase inward** — tabs New · Past (C:168); New: pick a PO by supplier, material or date (F:125) or ad hoc;
lines pre-filled from the PO with received qty, variance flagged, rate, supplier invoice no and date; photo of the
lot; "Pushed to accounts on approval" note; manual gate token by the guard when unlinked (F:57) · warehouse
executive; approval by accounts (F:46) · pane: the supplier snapshot (score, overdue, last purchases) the approver
sees (F:46) · — · rate and value for money roles · Materials catalogue (the lot appears, sorted by inward date).

**W3 Purchase return** — pick the inward, lines with return qty and reason, automated credit note preview
(F:103, F:126) · warehouse executive, accounts · pane: the credit note building · — · ₹ · Hub › Purchase return
report.

Phone: **P1 Inward capture** — photo of the lot, supplier, material, qty; the rest on the desk (F:103 "whatsapp/
telegram linked for picture capture").

### 2.2 Materials

**W4 Materials catalogue** — a picture-first grid of every material and shade (owner brief): photo, material name
as the head with its code, shade swatch and name, group (base fabric · designer fabric · accessory · kali set ·
choli set, X:Material Master!E5), unit, stock on hand, on order, last inward date, supplier, source city
(X:Material Master!E9); default sort **last inward, newest first**; other sorts stock, name, used-in; quick chips
Low · Out · On order · Used in active jobs · Dye WIP · Group ▾ · Supplier ▾ (C:211, C:200); list view; the dye
WIPs (dyed lots that came back) appear here as materials tagged "Dye WIP" with their lineage · everyone in
Production; sales roles view · pane: the picked material — photos, stock ledger (last inwards and issues),
where-used (designs), supplier and last GRN, price for money roles (M:86) · — · price for money roles · Purchase,
Process setting (add to recipe), Dispatch › Stock › Material.

**W5 Dye ledger · board** — the dyer's running account (owner brief, X:Dye). Left rail: dyers with balances by
material (Raja · net 2,400 m, Nazeem · net 1,150 m, X:Dye!I13–14); tabs Open cut orders · Bulk balances · Received
(dye WIP) · History; open cut orders table: order no, material, target shade (swatch + code C04), qty ordered,
received, balance, due date, for design / production order, state; actions Bulk issue · Cut order · Single issue &
order · Receive · dye desk (warehouse executive), merchandiser · pane: the New cut order form — by material or by
karigar (X:Dye!D21, D28), material from the dyer's balance, shade code, qty, due, narration, optional link to a
design or production order · — · no ₹ (dye job rate belongs to costing later) · Process setting (the WIP becomes a
material).

**W6 Dye ledger · bulk issue** — issue a lot of undyed fabric to a dyer without a colour (X:Dye!B10–17): karigar,
materials with qty and unit, narration, gate token; the balance table updates; the "single time issue & order"
variant on the same form with a shade code and due (X:Dye!B38–44) · dye desk · pane: the dyer's balance ledger ·
— · none · Karigars.

**W7 Dye ledger · receive** — pick the cut order (or the single order), receive qty against ordered, shortfall
recorded as process loss, rejection separate (F:118), shade photo, "lands as material Mono net · C04 · 196 m",
the dyer's balance after (4,800 m), gate token; the received lot is now selectable in Process setting and in
Samples · dye desk · pane: the cut order card with the production order waiting for it · — · none · Materials
catalogue, Lifecycle (the job that was waiting turns Ready to issue).

Phone: **P2 Dye · receive** — scan or pick the cut order, qty, shade photo, done; **P3 Dye · dyer balances**.

### 2.3 Process setting

The owner's workbook (X:Prod v2 rows 51–145) is the source: Step 1 product, Step 2 averages, Step 3 the BOM grid per
colour with WIPs listed under the materials and "SET BOM" per process, and the BOM interfaces as a side view. The
BRD adds the sequence of processes with masters, "same material twice for two processes", colour-wise copy, the
right pane with Search and View tabs, and the lock once production has started (F:129–133).

**W8 Process setting · product & sequence** — Step 1 Product: pick or add a product master (photo beside the
design number, category, colours as chips with colour thumbs, add a colour); status chips BOM incomplete · Colour
override · Locked by production (C:170); "Copy recipe from…" opens the pane's Search tab; "Imported from sample
S-0412" when it came from Samples. Step 2 Processes in sequence: process chips from the process master (Dye ·
Touching · Embroidery · Latkan · Stitching · Pleating · Choli stitching · Saree stitching · Ready production,
X:Prod v2!W20–26), drag to order, the number is the step, each shows its auto WIP name (wip_touch_2018,
X:Prod v2!Y20–26), the last one marked Final → finished goods (F:121) · production manager, merchandiser · pane
tabs: **Materials** (the catalogue of W4 compressed: photo, name, shade, stock, last inward, "Add" — owner brief) ·
**BOMs** (the interfaces being built) · **Search** (other products' recipes to copy from; filters category,
material used, process used, completeness, C:170) · — · none · Product master, Samples.

**W9 Process setting · materials & averages** — Step 3: the recipe rows for all colours in one go (F:130): photo,
material · shade, group, unit, stock now, average per pc (editable; "final averages are set in the BOM grid",
X:Prod v2!B62), colour scope per row (All · Red · Green · Blue — Santoon Red only for the red colour,
X:Prod v2!D66–68), a duplicate button for the same material in a second process (X:Prod v2!D72 "dual process
consumption"), remove; dye WIP rows tagged; "+ Add materials" from the pane · same · pane: Materials tab with the
added ones ticked · — · none · Materials catalogue.

**W10 Process setting · BOM grid (Red)** — Step 4: colour tabs Red · Green · Blue with "Copy from Red"
(F:132); rows = materials (photo, name · shade, average editable, unit) then a WIPs section (one auto row per
process, X:Prod v2!D96–100); columns = processes in the sequence set above, never sortable (C:170); a tick in a
cell puts that input into that process's BOM; a WIP row may be ticked in one later process only (X:Prod v2!O80);
quick chips Current colour ▾ · Missing assignments · Selected only · Materials | WIPs (C:170); completeness strip
"Red: 4 of 4 processes have a BOM · Green: Stitching missing" · same · pane: BOMs tab — one card per process
(wip_emb_2018_red ← Mono net 0.5 m · wip_touch 1 pc …, X:Prod v2!R83–U99) · — · none · Lifecycle (once an order
starts, the recipe it started with stays fixed; edits apply to new orders, F:132).

**W11 Process setting · copy to Green, lock** — the Green tab after Copy from Red with the colour-specific rows
swapped (Santoon Green), the "Locked by PO-1187 · edits apply to new orders" banner, and the Search tab open in
the pane with another product's recipe and a "Copy sequence + BOM" button · same · pane: Search tab · — · none · —.

Phone: **P4 Recipe · view** (processes as a timeline, BOM per process as cards, per colour) and **P5 Averages ·
edit** (rows with steppers). The BOM grid itself stays on the web.

### 2.4 Orders (production order + lifecycle)

**W12 Production orders · list** — cards or rows: photo, design no head, PO no in mono, book, qty per colour as
colour bars with numbers, total pcs, ordered by, planned end, destination firm chip ("Send to Radhika", F:288),
reason chip (Priority production / Restock / High growth, C:172), state pill (BRD states), "1 of 4 assigned",
progress bar received of ordered; quick chips Unassigned · Materials pending · Delayed · Tranche due · Priority
production · Restock; sorts due, created, pcs; sub-sub tabs All · Active · Materials pending · Delayed · Closed
· production manager, merchandiser, warehouse executive (view) · pane: the picked order's lifecycle in brief —
process timeline with state colours and each job's karigar, tranche pips, next due (F:145, F:293) with "Open
lifecycle" · — · none on the list · Lifecycle, Job cards.

**W13 New production order** — Order details: product with photo, colours × qty table with total
(X:Prod v2!D164–167), production ID auto from the book series (F:16), book (category or Direct), date, planned end
date, ordered by (X:Prod v2!B169–171), destination firm, priority, source (restock suggestion, sale-order
shortage, sample), remarks. Process assignment: one row per process in the recipe — karigar (matched by skill,
with score, load and material balance, M:67), job rate ₹/pc, due tranches 30 / 30 / 40 % with dates (ratio
selector, F:135), "assign later" allowed; Submit for approval (F:26 approvals; B:154 create batch = admin, PM) ·
production manager · pane: **Material readiness** — every input the recipe needs for this qty per colour: required
vs in stock vs on order, shortfall in danger tone, "Raise PO" links; below it the cost preview per pc for money
roles (F:147) · — · job rate and cost preview for money roles · Purchase orders, Approvals.

**W14 Lifecycle** — the terminal (F:134–139, X:Prod v2 rows 175–295). Head card: photo, design no, PO no, qty per
colour, state pill, planned end, destination, book, approval state, long progress bar "received of ordered
(all colours)" (X:Prod v2!N203). Timeline strip: processes 1..n as nodes coloured done · active · locked
(F:85, F:293), each with tranche pips ●●○ and next due. Then one panel per process (the active one open): header
with process name, karigar pill (score, call), job rate ₹/pc, the three tranches (pcs · date · received · state),
Split job / add karigar (X:Prod v2!C205), Print job card, the job QR (X:Prod v2!C196); an unassigned process shows
its quantities but sits locked behind "Assign karigar" (F:135). Per colour: the inputs table — thumb, MAT / WIP
tag, name · shade, avg/pc, total required, unit, issued, balance, progress, stock (in stock / short — the
"in queue for issue" and "out of stock but pending issue" lists of X:Prod v2!R186–S221 become the stock column
and the pane); the colour-wise table — ordered, issue complete for pcs, balance pcs, received R1 · R2 · R3 with
dates, totals (X:Prod v2!D194–M201); Issue / receive history with challan no, gate token, karigar, when,
re-print sticker. Buttons Make issue · Receive · production manager, merchandiser, warehouse executive · pane:
default **This job** — karigar, dues, what is in stock to send now and what is short with the PO or dye order it
waits on (F:139) · — · job rate for money roles · Job cards, Karigars, Materials catalogue, Dispatch › Stock ›
FG inward for the last process.

**W15 Lifecycle · issue** — the pane becomes the Issue form: colour, order qty · received · balance, **pieces to
issue for**, the inputs computed from the averages with editable qty, stock beside each (short lines flagged, a
short issue allowed with the balance to follow), material centre, remarks; photos of the material and of the
destination product on every line (F:22, B:142); Issue → challan sticker 3 × 4 in and gate token (F:121, F:138)
· warehouse executive · pane: Issue · — · none · Print.

**W16 Lifecycle · receive** — the pane becomes the Receive form: pcs by colour, tranche it settles, rejection,
process loss and excess as separate fields (F:118), what it lands as (WIP wip_emb_2018_red, or finished goods →
Dispatch inward for the last process), the karigar's payment that falls due (pcs × rate, for money roles, F:5),
gate token; Receive → sticker · warehouse executive; jobber may record unverified, floor verifies (B:155–156)
· pane: Receive · — · payment due for money roles · Dispatch › Stock › FG inward, Karigars.

**W17 Print · job card and challan sticker** — the A4 job card (F:121): design photo, PO, job, karigar, rate
confirmation, per-colour inputs with balances, due tranches, QR; beside it the 3 × 4 in sticker for one issue or
receive: challan no, job, colour, pcs, lines with qty, balances after, gate token · desk · full-window preview
with Print and Re-print · — · rate on the job card for money roles · —.

Phone: **P6 Orders · list**, **P7 Lifecycle** (head, timeline, process accordion with the colour table),
**P8 Issue sheet** (pieces to issue for → computed lines), **P9 Receive sheet** (pcs by colour, rejection, loss),
**P10 Scan job QR** (the job opens with its balances, X:Prod v2!B196). No ₹ on P8–P9.

### 2.5 Job cards

Every process of every approved order is a card, assigned or not (F:103, B:107). Sub-sub tabs are the scopes
(C:174): Active · Delayed · Upcoming · Stuck · Priority production · Restock · Finished; a view switch on the
toolbar: Cards · Swimlanes · Table · Gantt · Calendar (owner brief).

**W18 Job cards · cards** — card = image ⅔ (design, or the material / WIP image if set primary, F:140), top band
job no · design no · karigar, bottom band one serviceability chip (Ready to issue · Waiting on floor · Stuck ·
Unassigned · At karigar), next tranche pill (warn → danger when missed), progress received/planned, tranche pips
(C:175); quick chips Ready to issue · Waiting on floor · Unassigned · Tranche due today · At karigar; sorts
Urgency · Waiting on floor first · Serviceable now first · Oldest unassigned · Oldest no-activity · Pending pcs ·
Customer shortage impact · Demand score (C:178); saved views Urgent today · Unassigned neglect · Issue now ·
Waiting on karigar · Customer shortage (C:179); group by karigar / process / product · production manager,
merchandiser, warehouse executive · pane: the lifecycle of the picked card's order — timeline with state colours,
each job with its karigar and pips (F:145, F:293), Make issue / Receive shortcuts · — · none · Lifecycle.

**W19 Job cards · swimlanes** — columns by journey state (Unassigned → Ready to issue → At karigar → Partially
received → Fully received → Closed), lanes optional by process; column heads carry count and pcs; cards compact
· same · pane: same · — · none · —.

**W20 Job cards · table** — the column set: job, PO, design (photo), colour split, process, karigar, state, issued
/ received / balance, tranche 1–3 dates, days to due (negative allowed, B:107), no activity for n days, customer
shortage pcs; column chooser · same · pane: same · — · rate column for money roles · —.

**W21 Job cards · gantt** — rows grouped by order, one bar per job from first issue to tranche 3, tranche marks,
today line, overdue tail in danger tone, unassigned rows hatched; zoom week / month · production manager · pane:
same · — · none · —.

**W22 Job cards · calendar** — month with tranche due dates as photo chips (design, pcs, karigar), day cell counts,
a day picked lists its jobs · same · pane: the picked day · — · none · —.

Phone: **P11 Job cards · list** (cards one per row with the same chip budget), **P12 Job cards · filters & sort
sheet**, **P13 Job card · opened** (the card's job with Issue / Receive).

### 2.6 Samples

A sample is a temporary design number moved through any process, in any order, to any karigar, with any material
and quantity, until it is either dropped or made into a product (B:43–44, B:110, owner brief). It still shows in
the catalogue as a Sample with price TBD (F:103, F:257).

**W23 Samples · board** — sub-sub tabs In designing · Deployed, no production · Activated · Production started
(C:186); cards: photo or "No photo yet" (F:25), temp no S-0412 as the head, category, colours tried, where it is
now (process · karigar · days), moves count, cost so far for money roles, chips Costing pending · High growth ·
Reading 9/15 · Re-reading (C:186); quick chips Price TBD · Costing pending · High growth · 15-day read ·
Re-reading; sorts Newest activation · Oldest undeployed · Read completion · Demand score · Pcs ordered · design
team, production manager · pane: the picked sample's moves in brief · — · cost for money roles · Sample
lifecycle, Costing, Catalogue › Samples.

**W24 Sample lifecycle** — head: temp no, photo strip (sketch, reference, first piece), category, target price,
notes, reference links; **Moves** — a numbered list, each move a card: process (any), karigar (any), colour (any),
what went out (materials from the catalogue with photos, or a WIP that came back from an earlier move) with qty,
date, challan and gate token, and what came back (pcs or a WIP named on the fly, with the received date, loss,
rejection), rate × pcs for money roles; "+ New move" always available, in any order; **In hand** strip: what is
out with whom and what is back; the derived sequence (the order the moves happened) shown as a light timeline ·
design team, production manager, warehouse executive · pane: **New move** form — process → karigar → send
(materials tab with photos, this sample's WIPs tab) with qty → optional rate and due → Issue; and Receive for an
open move · — · rate for money roles · Materials catalogue, Dye ledger (dye WIPs pickable), Karigars.

**W25 Sample → product** — the finalise sheet: derived process sequence from the moves (reorder, remove, merge,
mark the final one), derived materials and averages (issued qty ÷ pieces, editable), colours, the new design number
and category, a preview of the BOM grid to be created, "Create product and open Process setting" (lands on W8
pre-filled with an "Imported from S-0412" chip) and "Send to costing" · production manager · pane: the sample's
moves for reference · — · cost so far for money roles · Process setting, Costing, Product master.

Phone: **P14 Samples · list**, **P15 Sample lifecycle** (moves), **P16 New move sheet**.

### 2.7 Costing

**W26 Costing** — sub-sub tabs Completed · Incomplete · Past · Not priced (F:147, C:182); cards: photo, design or
sample no, unit cost so far, margin %, recommended price, chips Pending approval · Missing rate · Below target
margin · Sync failed; a costing is Complete when the last process's job rate is set (F:103) · production manager,
admin · pane: the breakdown — material lines (average × purchase-rate average), job rates per process per pc, unit
cost, gross margin (40 % default, settable by category, F:147), recommended price, an own-price field, Send for
approval / Approve (PM or admin, either), sync to accounts; until approved the catalogue shows TBD (F:103) · — ·
full money · Approvals, Catalogue.

### 2.8 Karigars

**W27 Karigars** — rows: name, skills as muted tags, score gauge, on-time %, active jobs, pcs ordered vs
received, material and WIP with them, balance ₹, payment due (per piece received, 30 days, F:5), capacity/day
(M:67, B:109); chips Delayed jobs · Missed tranches · Material balance · Capacity risk · Payment due (C:184);
sorts Reliability · Average delay · Material balance · Payment due; "+ New karigar" (B:53) · production manager,
accounts · pane: the karigar — jobs active and history, material / WIP balances against jobs and ad hoc
(B:109), payments due and paid, small charts speed · reliability · capacity (F:150), call · — · balance and dues
for money roles · Hub › Karigars dossier (M:93–94), Lifecycle.

Counts: 8 sub-menus (+ overview) · 28 web screens · 16 phone screens (each light and dark).

## 3. Found elsewhere in the BRD

Each line: source, one-line quote, what it changes.

- F:5 / F:103 — "The firms should be able to source material … set consumption recipes … make production orders …
  view the whole lifecycle and job cards pending … even if the job has not been assigned a karigar". Job cards
  exist from approval, unassigned included (W18 Unassigned chip, scope tabs).
- F:5 / F:103 — "almost 200 production orders in active status … a lot of filtering and sorting views for the job
  cards page … 'that day'". The Job cards toolbar carries saved views and the eight sorts.
- F:5 / F:103 — "The karigar's are paid 30 days after their payment gets due … only … uptill the pcs submitted".
  Receive shows the due raised; Karigars pane lists dues.
- F:5 / F:103 — "'Ready Production' … the firm 'officially-on-paper' sells the materials … generates an invoice
  against those karigars". A process master flag; the Direct book (F:234); the issue for that process shows
  "billed to karigar" instead of a challan (open, Q6).
- F:5 / F:103 — "costing module … Costs per product … accumulates (with breakup) … 'complete' with a pre-set gross
  margin … approval to the production manager and admin (either's approval works) … shows price as 'TBD'". W26.
- F:14 — "restock suggestion module which forecasts demand basis the first 15 day demand graph". Reason chips on
  orders and job cards; Overview strips.
- F:16 — "production orders can be recorded in category books". Book field on the new order; PO number carries
  the book series.
- F:21–25 — "Batch cards must show the primary product image … Material issues must show both material and
  destination-product images … Samples and raw materials may exist without a final product photograph". Card
  image rules; the issue form's two photos; "No photo yet" on samples and materials.
- F:36–38 — the three production roles; only the manager and merchandiser have every permission, the merchandiser
  cannot delete, approve overages, orders or POs; the warehouse executive issues, receives, inwards and raises POs.
- F:46 — "production overage approvals would include karigar score, job history and dates (including due dates),
  material recipe". Overage (receive more than issued for) goes to Home › Approvals; the receive form warns.
- F:57 — "Production Issues … Production Job receives … generate a 'Gate Pass Token'". Token on every challan.
- F:72 — the salesperson view shows "Material Recipe for that product (with real time stocks available)". The
  recipe set here feeds the catalogue.
- F:85 — the scan pop-up shows "actual step its at in a sequence of processes … timeline bar with green on done
  processes, blue on active and grey on not started". The lifecycle timeline colours (ok · accent/blue · grey).
- F:121 — "a main job card printed … then each issue and receive is a challan printed in the form of a sticker to
  paste onto that job card". W17.
- F:121 — "WIP of dye will be used with 2 other materials in embroidery process, and then WIP of embroidery with 4
  other materials will be used in stitching". The BOM grid's WIP rows and the dye WIP as a material.
- F:121 — "anything 'waiting' on our floor or warehouse is money being lost". Job cards "Waiting on floor" chip
  and sort; the Overview's serviceable-jobs tile.
- F:135 — "3 production due dates … default … 30%+30%+40%". Tranche editor on assignment; pips everywhere.
- F:139 — "In-Stock Material/WIP per job that are issue-ready, and Out-of-Stock … holding the job". The stock
  column and the This job pane (W14).
- F:144–145 — card anatomy and "Right Pane: With lifecycle view of that product or production order … status by
  color". W18 pane.
- F:200–204 (Dispatch › Out of stock) — "nothing in production — the last in red, linking to Production"; "six
  due dates; karigar pills with score and call". Job cards and Lifecycle are the link targets; the same karigar pill.
- F:207–209 — Dispatch › Stock tabs read FG, Material and WIP; Production never duplicates those lists, it links.
- F:234 — "Direct Purchase Vendors/Jobbers … these orders are to be shown in Production Orders but have to be
  noted in a seperate 'Direct' book". Book selector on W13.
- F:248–262 — Hub reports for Production: Issues · Receives · WIPs · Jobs · Production orders and status ·
  Samples · Karigar analytics · Floor analytics. Read surfaces live in Hub; Production screens link out.
- F:288 — "send for production order in SRS, marked with 'Send to Radhika', and the receive should show inbound
  at radhika's terminal". Destination firm on the order; the last receive lands in that firm's FG inward.
- F:292–293 — "Production Job Card View Right Side pane: Lifecycle view of the production order … each job (with
  status colors) presented as timeline … and a common view of relevant fields … in the Busy Wireframe Sheet". W18
  pane content = the wireframe's job columns.
- M:51–54 — Hub WIP rows "design · colour · balance · open jobs · with karigar · received · consumed". Linked from
  the Lifecycle inputs table.
- M:65–67 — Karigar columns "skills · score · deadlines · QA · open jobs · with them · balance ₹ · capacity/day ·
  last job". W27 columns.
- M:84, M:86 — product dossier tab "BOM & materials"; material dossier "Purchases · Consumption · Where-used ·
  Stock ledger". The Materials pane mirrors the material dossier.
- M:93–94 — karigar dossier tabs "Overview · Jobs · Ledger · Material with them · Verification". W27 pane.
- M:181–182 — report columns "In Production Qty · Nearest Due Date · Karigar(s) · Blocked At". Blocked-at is a
  placeholder proxy (D-0042, M:377); the job state chip is the real thing.
- M:50, M:397 — "no reorder level exists for materials yet (U34)". Materials catalogue shows Low only where a
  level exists; otherwise nothing.
- B:33 — "we'll send the dyed net directly to stitching if it has come, even if embroidery process hasn't started
  yet". A material can be ticked in a later process independently of WIP flow; the Lifecycle allows issuing a
  later job's materials while an earlier job is open.
- B:52, B:155–156 — "karigar to karigar external entries, which will be recorded on app and punched when our floor
  verified"; "Record jobber receipt · Jobber · Yes, unverified". Receive rows carry Unverified until the floor
  verifies (W16, P9).
- B:101 — "Production Overview: … total production batches active, total pcs in production, total fg pcs rcvd
  today, total serviceable jobs". W0 tiles.
- B:105–106 — "grid view of production batches with minimal important info … each product opens up to their own
  lifecycle view … overview screen for that batch … diff tabs for all processes". W12 → W14.
- B:107 — Job card filters "In progress / not started / to-be-issued in-stock, Assigned / Not Assigned … Design
  Number, Category, Job Type"; sorts "pieces … date of production order … time to due date (can go in negative)".
  In the sheet and sorts of W18–W22.
- B:109 — "fabric or material balances with karigars against active job orders or ad hoc material balance". W27
  pane; the dye ledger is the ad hoc balance for dyers.
- D:52, D:59 — Dispatch counts strip links to Production; WIP stock shows "the karigar holding them and days at that
  step". Same data as the Lifecycle inputs and the Karigars pane.

## 4. Components

### Reused as they are

- Phone chrome: `frameF`, `T.TopBar`, `T.SearchBar`, `T.Lists` (sub-menu scroller), `T.Chip`, `T.Tag`, `T.Btn`,
  `T.Step`, `T.Bars`, `T.H`, `T.Card`, `T.Kpi`, `T.Dock` (Production active), the filters sheet pattern, the scan
  chrome (`ScanCam`), `Sheet`.
- Data: `PriceF`, `Pill`, `DuePill`, `Progress`, `ProgDisc`, `Mono`, `Num`, `Meta`, `Thumb`, `Dot`, `KarigarPill`,
  `CallChip`, `GateToken`, `Toast`, `Sect`, `DCard`, `OutBtn`, `LineG`, `BarsV`, `Donut`, `Legend`, `Stack`.
- Web: `WebShell3` (rail, tab strip, header with the sub-menu buttons, `RightPane`), `ViewTabs`, `SOTable2`
  (tables), `ColumnChooser`, `LaptopDevice`.

### New for Production (in `mod-production.jsx` and `mod-production-web.jsx`, exported on `window`)

- `ProcessTimeline` — the sequence as nodes with state colours, tranche pips, next due; sizes for head, pane, card.
- `TranchePips` — ●●○ with dates on hover; `TrancheEditor` — ratio chips and three date fields.
- `JobStateChip` — the one serviceability chip; `OrderStatePill` — the BRD batch states.
- `MaterialCard`, `MaterialRow` — photo, name · shade swatch, group, unit, stock, last inward; `MaterialPane` — the
  compact catalogue used in Process setting and Samples; `DyeWipTag`.
- `RecipeRow` (average, colour scope, duplicate), `BomGrid` (colour tabs, material and WIP rows, process columns,
  tick cells), `BomCard` (the interface per process), `Completeness` strip, `LockBanner`.
- `OrderCard`, `OrderHead` (lifecycle head with the long progress bar), `JobPanel` (per process), `InputsTable`,
  `ColourTable` (R1 · R2 · R3), `HistoryRows`, `IssueForm`, `ReceiveForm`, `JobQR`.
- `JobCard` (image ⅔, bands), `Swimlane`, `GanttRow`, `CalendarMonth`, `JobTable` columns.
- `SampleCard`, `MoveCard`, `InHandStrip`, `NewMoveForm`, `FinaliseSheet`.
- `DyerRail`, `CutOrderRow`, `CutOrderForm`, `BulkIssueForm`, `DyeReceiveForm`, `ShadeSwatch`.
- `CostBreakdown`, `KarigarRow`, `KarigarPane`, `POCalendar`, `InwardForm`.
- `JobCardA4`, `ChallanSticker` — print previews.

Language notes: the process timeline's "green / blue / grey" (F:85) becomes ok · accent · line2 in our tokens;
danger only for missed tranches and stuck jobs; one maroon line per screen stays the primary button (Issue,
Receive, Set BOM, Create order).

## 5. Open questions for the owner

1. **Approval of a production order.** F:5 says job cards appear "after a production order is approved"; who
   approves (PM for merchandiser-raised orders, admin for PM-raised)? Drawn as Submit for approval → Approved
   state, approver in Home › Approvals.
2. **Job rate visibility for the warehouse executive.** F:38 lists no money right; the job card print carries the
   rate confirmation (F:121). Drawn: rate on the A4 for money roles only; the floor phone never shows ₹.
3. **Split jobs.** X:Prod v2!C205 "Add karigar to split order" — split by pieces per colour, or by colour? Drawn
   as pieces per colour with the same tranche editor.
4. **Overage.** F:46 mentions overage approvals; is an overage "received more than issued for" or "issued more
   material than the average"? Drawn as both flagged on the forms, approval in Home.
5. **Tranche defaults per process** or per order? Drawn per job at assignment, 30 / 30 / 40 default.
6. **Ready production.** The material "sold" to the karigar — does the issue raise a sale invoice from Dispatch's
   invoice flow, or an accounts entry only? Drawn as a note on the issue: "billed to karigar · invoice SI-…".
7. **Dye job rate.** Dye is a process with a cost per metre, not per piece; where does it enter costing? Drawn:
   the cut order carries an optional rate per metre for money roles, and costing spreads it by average.
8. **Sample numbers.** Series for temp design numbers (S-0412) and whether a sample keeps its number as the
   product's design number or gets a new one. Drawn: new design number chosen at finalise, sample number kept as
   "from S-0412".
9. **Upcoming window** for Job cards (days before the next tranche, C:292). Drawn as 7 days.
10. **Material low-stock** rule (U34). Drawn: Low only where a reorder level exists.
11. **Phone scope this pass.** Phone screens drawn for the floor actions (job cards, lifecycle, issue, receive,
    scan, dye receive, samples, materials); Purchase, Costing, Karigars and the BOM grid stay web-only until asked.

## 6. From the owner's brief of 8 Sep (not in any BRD; logged in design/during-ui-business-requirements.md)

- Production order and lifecycle are one sub-menu (Orders) with two views.
- Job cards get project-management views: swimlanes by journey state, Gantt, calendar, table, besides cards.
- **Dye ledger.** Undyed fabric goes to the dyer in bulk without a colour (5,000 m mono net); a cut order commissions
  a shade for a design or production order (200 m → C04); the dyer returns only the dyed lot, which becomes a dye
  WIP usable as a material in any recipe; the ledger keeps the dyer's balance (4,800 m). Dye WIPs must be selectable
  in Process setting and addable later, because a production may start with another process before the dye is back.
- **Sampling** is a separate sub-menu: free movement of a temporary design number through any process, colour,
  karigar and material without a recipe; a finalise action turns the sample into a product, importing (and editing)
  the derived process sequence and averages into Process setting.
- **Material catalogue** with pictures and metadata, default-sorted by inward date, also as the right pane of
  Process setting (and used by Samples).

## 7. Prototype comparison (8 Sep 2026, from the 18 screenshots; the live walk was blocked at the sign-in page)

The agency prototype ("Job Work Solution", Excellent Softwares) covers one thread: Product design setting → Production
order → Production job (issue / receive). Its screens, in order: Product Design Setting with Step 1 product selection
(item search, colour multi-select, a Create Item modal with name, alias, print name, parent group, tax category, unit,
prices, material type, item type), processes as click-to-add chips that drag into order with the step number and an
auto WIP name (wip_embo, wip_touch), Step 2 Averages Setting (Add materials modal by input kind, a table of name ·
unit · average with duplicate and delete), Step 3 Process BOMs Setting (colour tabs with "Copy to other colours", a
materials-list grid with a Finish-good column, average, unit and one checkbox per process, a WIPs list beneath it with
earlier processes greyed, BOM-interface cards per process and a footer "3 colours × 4 processes = 12 WIP BOMs · saved
in one request"); a Production Orders list (date range, search, table of date · production id · product · order by ·
planned end · remarks); a Production Order form (date, auto id PO-0016/26-27, product, order qty per colour with a
total, planned end date, order by, remarks, and a Process assignment table of karigar · job rate ₹/pc · deliveries ·
due date); a Production Job page (product and production id selectors, tiles for design, id, ordered pcs per colour
and routing, then one accordion per process with karigar · job rate · due, "assign a karigar to unlock", per-colour
input tables of input · colour · avg/pc · total required · unit · issued · balance · progress · stock, an
issue/receive history table with the Busy voucher number, and a Finish-good tag on the last process); a Make Issue
modal (colour with pcs ordered, order qty · received · balance, pieces to issue for, material centre, remarks, inputs
with avg · computed · unit · balance · issue qty · stock) and the resulting history row (MI-00012, OUT, 3 pcs, voucher
OE/MI/58/26-27).

What it does well, and what the mockups keep: the three-step recipe with auto WIP names and the number as the step;
the BOM grid with WIP rows under the materials and one tick per process; "Copy to other colours"; the
"n colours × m processes = k BOMs" footer; "pieces to issue for" with computed material lines and stock beside each;
the per-colour output · ordered · received · balance line; the history log per process; the karigar-unlocks-the-job
rule; a Process setting shortcut from the job.

What it lacks or gets wrong, and what the mockups do instead: no photograph anywhere (ours: design photo beside every
number, material swatches, product photo on issue lines); units drift ("70 Box" for pieces); the routing tile shows a
different order from the one set (Touching before Embroidery); a single due date and a "deliveries" dropdown instead
of three tranches with pieces and dates; no job cards board, no filters or sorts, no saved views; no right pane
anywhere, one long scroll; no lock once production starts; no stock or shortage reasoning beyond "Short (0/70)"; no
gate token, only a Busy voucher; no dye ledger, no samples, no costing, no karigar view, no purchase; no phone. The
mockups add all of these plus the material-readiness check on a new order, the this-job pane, the print job card and
challan sticker, the dye WIP lineage into the recipe, and the sample → product import.

## 8. Build notes (8 Sep 2026)

Files: `mod-production.jsx` (data, components, phone), `mod-production-web.jsx` (part A), `mod-production-web2.jsx`
(part B and the board registration). Loaded after `mod-topbar2.jsx`. Header3 / WebShell3 in `web.jsx` gained an
optional `searchWidth` prop (default unchanged) so the eight-button sub-menu fits. Material photographs do not exist in
the project yet; `Swatch` draws a fabric texture tinted by the shade as a stand-in and says so on the material pane.
Coverage review and the resulting work items: `plans/production-coverage.md`.
