# Review 2 · Dispatch (10 Oct 2026)

Review only. Nothing on the board was changed.

Page: `board.html?m=dispatch` · 116 frames (58 screens, light + dark).
Frame ids as the board prints them: `n-` phone, `nw-` web.

Sources:
- D = `design-system/research/brd-dispatch.txt`
- S = `design-system/research/dispatch-screens.txt`
- B = `design-system/uploads/Business Req.txt`
- F = `design-system/research/brd-final.txt`
- M = `design-system/research/brd-masters.txt`
- DF = `plans/dispatch-flows.md`, DS = `plans/dispatch-structured.md`

The owner's direction (today) is the yardstick:
a box board like a McDonald's kitchen screen,
pictures in every box, fine curved edges,
New and Worked-on sections, a customer box holding all their orders,
a right panel that is a searchable customer list with quick buttons;
Packing with 3–4 customers at once, parcel boxes on screen,
scan → piece lands in a box, the right panel showing the invoice for that parcel,
and the transport slip, e-way bill and e-invoice checks beside it.

---

## 1. What exists

Three bands draw Dispatch.

- **Band A · "Dispatch" (8 Sep)** · `mod-dispatch.jsx` (phone), `mod-dispatch-web.jsx` (web, own `DShell`).
  Registration `mod-dispatch-web.jsx:346–354`. Phone n-1…n-26, web nw-1…nw-19.
- **Band B · "on the approved bar" (8 Sep)** · `mod-topbar2.jsx:102–154`, registration `:155`.
  Web only, nw-20…nw-23.
- **Band C · "structured" (6 Oct)** · `mod-dispatch-s.jsx`, `mod-dispatch-s-web.jsx`, registration `:194`.
  Phone n-27…n-31, web nw-24…nw-27. `modules.js:31` loads only these two files for the page;
  bands A and B come in as shared files (`modules.js:25`).

Keep = carry into the box redesign as it is or nearly.
Rework = the content is right, the layout must change to boxes.
Retire = take off the board once its replacement is drawn.

| Sub-menu | Frame | What it shows | Call |
|---|---|---|---|
| Ready | n-1 | phone customer cards, priority ring, PACK | Rework (box layout, sections) |
| Ready | n-2 | phone sort & filter sheet | Rework (owner's sort set, sections) |
| Ready | nw-1 | web, old `DShell` bar, queue rail, cards, pending pane | Retire (nw-20 replaces it) |
| Ready | nw-20 | approved bar, cards, pane = pending book as a journey | Rework · the base for the new Ready |
| Ready | nw-21 | a card picked, pane = that order | Keep the idea (pane drills into one order) |
| Ready | n-27, nw-24 | structured ruled table | Retire (owner dislikes tables here) |
| Pending | n-3, n-4 | phone three-level book, ₹ / no ₹ | Keep for now · fold into Ready "Worked on" later |
| Pending | nw-2 | web full node, old bar | Retire |
| Pending | nw-22, nw-23 | four situations, grid and list | Keep (manager's book view) |
| Pending | n-28, n-29, nw-25 | structured | Retire |
| Packing | n-5 | phone picker: customer chips → boxes | Rework (3–4 customers, box tiles with photos) |
| Packing | n-6, n-7 | phone scan, tally; scan rejected in words | Keep (add a box switcher) |
| Packing | n-8 | phone review box, remove confirm | Keep |
| Packing | n-9 | phone box invoiced | Keep |
| Packing | nw-3 | desk terminal: chips, current order, parcel cards, live invoice | Rework · the base for the new Packing |
| Packing | nw-4 | scan armed, accepted with warning, rejected, remove confirm | Keep (states move onto the new boxes) |
| Packing | nw-5 | invoice review: bill-to, GST block, Confirm | Keep · add documents checks |
| Packing | nw-6 | invoice done, select for shipment | Keep |
| Packing | nw-7 | close shipment sheet: consignee, transporter, vehicle · LR, gate token | Rework (transport slip and e-way bill fields) |
| Packing | nw-8 | print: A4 invoice + transport document, WhatsApp PDF | Rework (IRN, QR, e-way bill no, LR) |
| Packing | n-30, n-31, nw-26 | structured scan, review, terminal | Retire (keep the "5 of 12" box count idea) |
| Billed | n-10…n-14, nw-9, nw-10 | invoices, invoice sheet, shipments | Keep (out of today's scope) |
| Billed | nw-27 | structured | Retire |
| Out of stock | n-15, n-16, nw-11 | order and restock cards | Keep |
| Stock | n-17…n-20, nw-12…nw-15 | FG, material, WIP, FG inward | Keep |
| Sale return | n-21…n-26, nw-16…nw-19 | four-step wizard | Keep |

Totals: Ready 9 frames, Pending 8, Packing 17.
Retire 11 (nw-1, nw-2, and all nine band C frames).

---

## 2. Flows walked

Clicks on the desk (web), taps on the packer's phone.
NOT DRAWN = no frame shows it.

### (a) Ready → choose a customer for packing

Desk:
1. Open Dispatch → Ready, nw-20. 0 clicks (it is the default node).
2. Find the customer: scan the 2×n card grid, or type in the search field. 0–1.
3. PACK on the card. 1 click. Lands on Packing nw-3 with a box open (D:16).
   Total: **1–2 clicks.** Good.
- New vs worked-on: NOT DRAWN on the board. The pane has an "After 1st" chip
  (`mod-topbar2.jsx:66`) and "4/9 sent" text, but the cards themselves do not say
  an order was already worked on.
- Choosing one order of a customer instead of the whole customer: NOT DRAWN.
  PACK moves the whole customer (D:16).
- Sort: one default "due days" in the folded rail (`QueueRailMini`, `mod-topbar2.jsx:92`).
  Opening it is 1 click, choosing a sort 2. The rail is a 44 px strip with vertical text: easy to miss.

Phone (manager):
1. Dispatch tab opens on Pending (n-3), not Ready. 1 tap to Ready (n-1).
2. PACK on a card. 1 tap. Packing on the phone is the picker, n-5.
   Total: **2 taps.**

### (b) Packing 3–4 customers at once

Desk, nw-3:
1. Customer chips across the top: All parcels + 8 customers (nw-3 shows "8"; plan says 7–8, B:91).
   The owner now runs 3–4. Switch customer: 1 click.
2. Open box P00059 carries the "Packing into" tag. Change the active box: click another card (1).
3. Scan a piece: 0 clicks once "Scan here" is on (1 click to arm, nw-4).
   The piece shows as a line with a stepper. NOT DRAWN: the piece visibly landing in the box.
4. Box full: NOT DRAWN. No capacity anywhere on the desk; the plan chose "plain pcs count,
   no capacity mark" (`plans/dispatch.md` last lines). Band C has "5 of 12" (nw-26).
5. Close parcel: 1 click → box turns PACKED, "Review invoice".
- Only one customer's boxes are on screen at a time. With 3–4 customers live,
  seeing all open boxes needs the "All parcels" chip (1 click), which mixes customers.

Phone (packer), n-5 → n-6:
1. Packing tab: 1 tap (opens on Pending, DF §2 proposes Packing).
2. Customer chip: 1 tap. Box row: 1 tap → scan screen n-6.
3. Scan: 0 taps. Tally "12 pcs" and last piece shown.
4. Switch box mid-scan: back to picker and pick again, **2 taps**. No switcher on n-6.
5. Box full: NOT DRAWN. Close: Review box (1) → Close parcel (1).
- Box rows in n-5 carry no photos of what is inside.

### (c) Invoice per parcel in the right panel

Desk:
1. The live invoice is always in the right pane of nw-3. 0 clicks.
2. **Mismatch:** the active box is P00059 (4 pcs) but the pane bills P00035 (2 pcs)
   (`InvoiceSheet`, `mod-dispatch.jsx:120–125`, nw-3). The pane does not follow the selected box.
   The owner asked for exactly that link.
3. Review: Close parcel → Review invoice (1) → nw-5. Qty and rate editable, bill-to, Confirm (1).
   Total from a full box: **3 clicks.**
- GST block: drawn (nw-5, nw-3): taxable, CGST 6 % + SGST 6 %, rounding, words.
  Band C shows "GST 5 %" (nw-26). Two different rates on one board.
- HSN: column present but "—" on every line (`mod-dispatch.jsx:121`, A4 `mod-dispatch-web.jsx:164`).
- Every order number: each line carries its order no (SO-3034). The sample has one order only;
  a parcel mixing two orders (B:87) is NOT DRAWN.
- Place of supply: text only, Delhi. IGST case (customer in another state, most of them) NOT DRAWN.

### (d) Transport slip, e-way bill, e-invoice

What the board has (searched all five Dispatch files):
- Close shipment sheet nw-7: consignee (ship-to ledgers), transporter "Local delivery",
  broker, "Vehicle · LR no" as one read-only box "DL 1C 4421 · LR 8817", gate token,
  parcels ticked, note (`mod-dispatch-web.jsx:136–150`).
- Transport document nw-8: date, consignee, transporter, vehicle · LR, broker, gate token,
  parcel list with invoice nos and pcs (`:170–177`).
- Billed › shipments history n-14, nw-10.

What it does not have:
- **E-way bill: nothing.** No field, status, threshold check, Part A, Part B, validity or cancel.
- **E-invoice: nothing.** No IRN, Ack no, Ack date, QR, "E inv Y/N" (the report wants them, F:259).
- Transport slip: no weight, no number of packages field (only the parcel list), no freight
  (to pay / paid), no LR date, no transporter GSTIN or transporter ID, no destination / distance.
- Transporter picked from the master: NOT DRAWN. It reads the customer's default.
- The flow into the sheet: select boxes (1) → Create shipment (1) → Issue transport document (1).
  **3 clicks**, but nothing between invoice and shipment checks the e-way bill.

### (e) Close shipment, print, WhatsApp

1. Issue transport document (nw-7) → print preview nw-8: Print A4 · 2 pages, PDF, WhatsApp PDF. 1 click each.
2. WhatsApp: one button, no recipient. Customer, broker and transporter: NOT DRAWN.
3. The A4 carries "Reference · Orders SO-3034 · Parcel P00035 · Gate token" (good)
   but no IRN, no QR, no e-way bill no, no LR on the invoice.

### (f) Partial dispatch → back to Ready

1. A customer's order half sent: the Pending journey shows "After 1st dispatch" and
   "4/9 sent" (nw-20 pane, nw-22, `mod-topbar2.jsx:45–58`).
2. The order's return to the Ready board as "worked on": NOT DRAWN.
   n-1 / nw-20 cards look the same whether the order is new or the third pass.
3. "Held" after 20 days (F:12): NOT DRAWN (open since review 1, R §gaps 6).
4. Cancel an order (the only thing that removes it from Ready, per owner): NOT DRAWN.

---

## 3. Against the owner's direction

### Band A · "Dispatch" (8 Sep)

Matches:
- Customer cards hold all their orders, every line with a photo (n-1, nw-1).
- Packing terminal has the three zones the owner wants: what to pack, the boxes, the invoice (nw-3).
- Scan states in words, invoice review with GST, shipment, A4 (nw-4…nw-8).
- Packer phone never shows ₹ (n-4, n-5…n-9).

Does not match:
- Old chrome: `DShell` with its own bar, not `WebShell3` (`mod-dispatch-web.jsx:7`). Two bars on one page.
- Corners 18–20 px islands (`Card` `mod-dispatch.jsx:31`, `CustomerCard` `:62`, `ParcelCard` `:96`).
  Soft, but not "fine" and wastes room on a 24″ board.
- Colour: five priority ring hues (`DP_P`, `:6`), green ticks, amber, blue pills, orange warn.
  Breaks one maroon line per screen.
- No New / Worked-on split. No capacity on boxes. Invoice pane not tied to the selected box.
- 8 customer chips on Packing; owner wants 3–4 with room for each.

### Band B · "on the approved bar" (8 Sep)

Matches:
- Right chrome (`WebShell3`), right pane is already a customer-wise, searchable list
  with quick chips All · Approval · Dispatch · After 1st · After due (nw-20). Closest to the owner's panel.
- Order journey dots make "worked on" visible per order in the pane.
- nw-21: pick a card, the pane shows that order. Good drill-down.

Does not match:
- The pane's quick chips are about approval stages, not dispatch work
  ("Approval" orders do not belong in a dispatch panel).
- Pane rows are not collapsible; 5 customers and the list is cut.
- Board cards are 2 across with large photos: about 4 customers per screen. A kitchen board needs 6–9.
- Sorting hidden in a 44 px vertical strip.
- Priority rings in red / amber / grey and a "7/9 pcs in stock" amber tag: still many colours.
- Phone not drawn in this band.

### Band C · "structured" (6 Oct)

Matches:
- Big counts strip (Ready 6 · Pending 42 · Packing 8 …) on nw-24…27: quick to read.
- "Scanned 5 of 12" on Packing (nw-26): the only box capacity on the board.
- Ruled invoice table is easy to check.

Does not match:
- Tables, 4 px corners, no pictures on Ready rows (nw-24): the opposite of the owner's ask.
- Pending book duplicated as tables (nw-25).
- Not verified at full size (DS §5). Retire.

### Inaccessible, deep or lost

- Sort / filter on Ready web: behind the folded rail, 2 clicks, easy to miss (nw-20).
- Switching the box on the phone: 2 taps back through the picker (n-6 → n-5).
- Choosing bill-to: only inside invoice review (nw-5), not visible before.
- Transporter: read-only in the sheet; no way to change it (nw-7).
- Call chips (customer, transport, broker) take a full row on every card: the crowd that
  hides the photos (nw-20).
- The "Fully planned" pill, priority disc, due pill, tier tag and stock tag on one card: 5 badges.

### Money

- Ready board: no ₹. Correct.
- Pending pane on Ready shows ₹ (nw-20). Allowed for the desk (D:24), but the same pane on a
  packer's screen must hide it. Role variant not drawn on web.
- Packing desk right pane shows ₹. Allowed for the desk. If a packer uses the desk, a no-₹
  variant is needed (not drawn).
- Packer phone: clean everywhere (n-5…n-9, n-30, n-31).

---

## 4. Priority lists

### P1 · Must change

1. **Ready as a box board** · nw-20, n-1 · customer boxes, 8 px corners, 3 across on web,
   one maroon line, photos on every line, priority as text. Spec §5.
2. **New and Worked-on sections** · nw-20, n-1 · two bands on the board; a box shows
   "Worked on ×2 · partly sent 4/9". An order stays until fully sent or cancelled.
3. **Right panel = customer list** · nw-20 pane · collapsible per customer, searchable,
   dispatch quick buttons (Due ≤ 2 d · Partly sent · Fully packable · Held · P1–P2),
   expand / collapse all.
4. **Sort and filter on the surface** · nw-20 · a visible "Sort: due, oldest first" button
   and filter chips in the board header, not in the folded rail.
5. **Packing shows 3–4 customers side by side** · nw-3 · one lane per active customer,
   each with its parcel boxes; more than 4 go to an overflow chip.
6. **Parcel boxes as boxes with photos** · nw-3, n-5 · 12 slots per box, a photo in every
   filled slot, empty slots dashed, capacity "8 / 12".
7. **Scan → piece lands in the active box** · nw-4, n-6 · the photo drops into the next slot,
   the slot pulses, the box count steps up; box full at 12 asks "Close box?".
8. **Right panel follows the selected box** · nw-3 · fix the P00059 / P00035 mismatch;
   panel title "Invoice · P00059".
9. **Document checks in the right panel** · nw-3, nw-5 · invoice, e-invoice IRN,
   e-way bill needed?, transport slip, each with a state and a next step. Spec §5, §6.
10. **E-way bill and e-invoice drawn** · new frames · Part A from the invoice with HSN,
    Part B at the shipment, validity, cancel window; IRN, Ack no, QR on the A4.
11. **Transport slip fields** · nw-7, nw-8 · transporter from the master, LR no and date,
    vehicle no, packages, weight, freight to pay / paid, destination.
12. **Parcel with two orders** · nw-5, nw-8 · draw a box holding pieces of SO-3034 and SO-3041
    so the invoice shows both order numbers (B:87).
13. **One GST rule** · nw-3 (12 %) vs nw-26 (5 %) · show the rate from the design's HSN;
    draw IGST for an out-of-state customer.
14. **Retire band C and nw-1, nw-2** once the new Ready and Packing are drawn.

### P2 · Good to change

1. Phone Dispatch opens on Packing for the packer, Ready for the manager (DF §5.1) · n-3, n-5.
2. Box switcher on the phone scan screen: box codes as a row of tabs · n-6.
3. Call chips into a single "Call ▾" menu on the box · nw-20, n-1.
4. Held orders as a third, collapsed section on Ready · not drawn (F:12).
5. Cancel order from Ready (manager, with reason) · not drawn.
6. Desk Packing no-₹ variant for a packer at the desk · nw-3.
7. Pending pane no-₹ variant · nw-20.
8. WhatsApp sends to a chosen list: customer, broker, transporter · nw-8.
9. "Choose orders" on PACK when a customer has several orders and only one should go · nw-20.
10. Big counts strip from band C kept as the Dispatch header counts · nw-24.

### P3 · Keep as is

1. Scan rejected in words with the serial (n-7, nw-4).
2. Remove-piece confirm "becomes scannable elsewhere" (n-8, nw-4).
3. "Scan here" claims the scanner between desk and phone (nw-4).
4. Invoice review: fix qty and rate, bill-to, nothing reaches accounts before Confirm (nw-5).
5. Invoice done, select boxes for one shipment, unticked stay for the next trip (nw-6, nw-7).
6. Gate token on invoice, shipment and transport document (nw-7, nw-8).
7. Packer phone without ₹ (n-4, n-5…n-9).
8. Order drill-down in the pane with "All pending" back (nw-21).
9. Pending four situations, grid and list (nw-22, nw-23).
10. Billed, Out of stock, Stock, Sale return as drawn (n-10…n-26, nw-9…nw-19).

Counts: P1 14 · P2 10 · P3 10.

---

## 5. Spec · the box layout

Shared rules:
- Corners: **8 px** on customer boxes, parcel boxes, the panel and sheets.
  **6 px** on thumbs, chips, buttons, slots. No 999 px pills inside boxes.
  (Band A uses 18–20, band C 4. 8 reads "fine curved" at a metre and keeps the grid tight.)
- Border 1 px `T.line`; box background `T.surface` on the sand canvas; no shadow;
  gap 12 px between boxes.
- Colour budget: ink and sand only. **One maroon line per screen** = the active thing:
  the selected customer box on Ready, the "Packing into" box on Packing.
  `T.danger` only for overdue and rejected; `T.warn` only for due ≤ 2 days.
  No priority hues: priority is the text "P1"…"P5".
- Photo beside every design number. Design number is the head (display font).
- Lucide icons, no emoji, sentence case, dd/mm/yy.

### Ready · desk web (`WebShell3`)

Board header (one row):
- Title "Ready" · counts "18 customers · 41 orders · 212 pcs".
- Search "Customer, order or design".
- Sort button "Due · oldest first ▾".
- Filter chips: In stock only (on) · Due ≤ 2 d · P1–P2 · Partly sent · Fully packable ·
  Tier ▾ · Transporter ▾ · City ▾ · Held.
- Expand all / collapse all.

Two sections, each with a heading and count:
1. **New** · "approved, never touched in dispatch" · 9 customers.
2. **Worked on** · "been through packing at least once, still owed" · 6 customers.
   (Held, collapsed, sits below when the filter is on.)
A customer with one new and one worked-on order sits in Worked on, with each order tagged.

Customer box:
- Width 340–380 px; 3 across at 1440 px with the panel open; 4 across with it closed.
- Height grows with lines; at most 6 line rows shown, then "+4 more lines" (opens in place).
- Head: 32 px ink monogram · name (display 18) · city · tier as text.
  Right: priority "P2" tag and the worst due ("3 d over" danger / "2 d left" warn / "12 d left" ink).
- State tags (outline, 10 px caps): **NEW** · **WORKED ON ×2** · **PARTLY SENT 4/9**.
- Per order: order no · date · due · "7 of 9 in stock" · optional note (one line).
- Per line: thumb 40×50 · design no · colour dot and name · × qty · stock mark
  (tick in ink, or "0 in stock" in danger).
- Foot: "12 pcs · 9 packable" and **PACK** (ink outline; maroon only on the selected box).
- One "Call ▾" icon in the head for customer, transport, broker.

Default sort: worked-on before new, then due days oldest first, then priority.
Sort set (D:9, F:160): due days ↑↓ · priority · customer score · total pcs ↑↓ ·
packable pcs · created on ↑↓.

Right panel · "All orders" (330 px, collapsible to a rail):
- Search field on top.
- Quick buttons: All · New · Worked on · Due ≤ 2 d · Fully packable · Held.
- List: one row per customer (name, n orders · p pcs, worst due), chevron to expand →
  order rows (order no, date, sent / ordered, short) → lines with photo.
- Expand all / collapse all. Tapping a customer scrolls the board to its box and outlines it.
- ₹ only for the manager role; packer variant hides it.

### Ready · phone

- Top: search · sort · filter. Segmented "New 9 · Worked on 6".
- One box per row, full width, 8 px. Same content as web; 4 line rows then "+n".
- Thumbs 52×64. PACK 48 px tall.
- The right panel becomes the search: typing shows the collapsible customer list.

### Packing · desk web

Top strip: **3–4 customer lanes** (selector and summary in one):
- Each lane head: monogram, name, "2 of 3 boxes open · 14 / 31 pcs", short count.
- 5th and later customers: "+2 more" chip. Add customer = from Ready.

Main area: the selected customer's boxes as visual boxes, 3 across:
- Box 220–260 px wide, 8 px corners.
- Head: box code (P00059, display) · status OPEN / PACKED / INVOICED (text tag) · "8 / 12".
- Body: **4×3 grid of slots** (capacity 12; 10 shown as two dimmed slots when the box is set to 10).
  Filled slot = piece photo with design no under it. Empty slot = dashed outline.
- The active box: maroon 1.5 px border and a filled "PACKING INTO" tag. One only.
- Foot: Close box. Packed boxes collapse to a strip with 12 mini thumbs.
- "+ New box" as an empty dashed box at the end.

Left column (260 px): "Still to pack" for this customer:
- Grouped by order no; each line photo, design, colour, packed / ordered, stock;
  "Add" for an unscannable piece (D:30).

Scan feedback:
- Accept: the photo appears in the next empty slot, the slot rings in ink for 1 s,
  the count steps "8 → 9 / 12". The line in "Still to pack" ticks.
- Warning (stock exhausted): text strip under the box, warn colour.
- Reject: danger strip with the reason in words and the serial (as nw-4); nothing moves.
- Box full: the 12th scan closes nothing on its own; a bar "Box full · Close P00059 and
  open P00061?" with two buttons.

Right panel (360 px) · "Parcel P00059" (follows the selected box):
- Head: firm (one of six, its GSTIN) · bill-to ▾ · goods for · place of supply.
- Orders in this parcel: "SO-3034 · SO-3041".
- Lines: photo · design · HSN · colour · qty · rate · amount; every line names its order.
- GST block: taxable, CGST + SGST or IGST, rounding, total, words.
- **Documents** checklist, one row each, state + next step:
  1. Packing slip · 9 pcs · ready (prints the box label).
  2. Invoice · draft → "Review and confirm".
  3. E-invoice IRN · "needed for this firm" or "not needed" · not generated / IRN + Ack no.
  4. E-way bill · "needed · ₹58,420 over ₹50,000" or "not needed" · Part A ready / missing
     HSN / Part B at shipment / generated, valid till dd/mm hh:mm.
  5. Transport slip · transporter · LR no · weight · "at shipment".
- One primary button = the next missing step (Close box → Confirm invoice →
  Generate IRN → Add to shipment).
- ₹ for the desk role only.

### Packing · packer phone

1. **My packing** (opens here): 3–4 customer boxes stacked, each with its boxes as
   small tiles (code, 8 / 12, 4 mini photos). Tap a box tile → scan. 1 tap.
2. **Scan**: camera on top; under it the active box drawn with its 12 slots
   (photos fill as pieces scan), giant count "9 / 12", last piece photo.
   A row of box codes to switch the active box: 1 tap.
3. Box full at 12: sheet "Box full · Close box" 1 tap · "Open new box" 1 tap.
4. Close box hands it to the desk ("Waiting for desk"). Invoiced shows the invoice no, no ₹.
5. No ₹, no documents panel. A small line "Desk: invoice ready · e-way bill pending" is enough.

---

## 6. Document chain per parcel

| # | Document | On the board | Frames | Data it needs | Missing |
|---|---|---|---|---|---|
| 1 | Packing slip (what is in the box) | Partly | nw-3 box lines, n-8 | box code, customer, lines, pcs | printed box label / slip not drawn; "Label" button only in band C (nw-26) |
| 2 | Invoice per parcel | Drawn | nw-3, nw-5, nw-6, nw-8 | firm and GSTIN, invoice series per firm, bill-to, goods for, place of supply, orders, HSN, rate, GST | HSN blank; GST rate inconsistent; IGST not drawn; two-order parcel not drawn; firm choice not drawn |
| 3 | E-invoice IRN | Missing | — | firm's turnover flag, buyer GSTIN, HSN, values; returns IRN, Ack no, Ack date, signed QR | everything: status, generate, retry on failure, IRN and QR on the A4, cancel |
| 4 | E-way bill | Missing | — | Part A: invoice no and date, GSTINs, from and to PIN, HSN, value, tax; Part B: vehicle no, or transporter ID, LR no and date; distance | everything: needed check (₹50,000), Part A, Part B, number, validity, extend, cancel within 24 h, consolidated bill for one vehicle |
| 5 | Transport slip / LR (bilty) | Partly | nw-7, nw-8, n-14, nw-10 | transporter from master (name, GSTIN or transporter ID), LR no and date, vehicle, packages, weight, freight to pay / paid, destination | LR as one read-only text; no weight, packages, freight, date, destination; transporter not chosen from the master |
| 6 | Shipment | Drawn | nw-6, nw-7, n-14, nw-10 | parcels ticked, consignee, transporter, gate token | e-way bill Part B and LR tied to the shipment |
| 7 | Print / WhatsApp | Partly | nw-8, nw-6 | A4 invoice, transport document, e-way bill print | e-way bill page, IRN QR, recipient choice (customer, broker, transporter) |

### What is missing, by document

**Transport slip**
- Transporter picked from the Transporters master (M:68–69), with GSTIN or transporter ID.
  The master has GSTIN only; unregistered transporters need the 15-digit transporter ID.
- LR / bilty no and date (often known only after pick-up: allow "add later").
- Vehicle no; packages (= parcels); weight per box or total; freight to pay / paid;
  destination city and PIN.
- One LR per shipment per consignee, listing the invoices.

**E-way bill** (GST, goods by road)
- Needed when the consignment value is over ₹50,000. A parcel of 10–12 pieces at ₹4,995
  is about ₹50,000–60,000 before tax, so **most parcel invoices will need their own e-way bill**.
  (Within one state the threshold can differ by state; Delhi's own rule needs checking.)
- Part A from the invoice: GSTINs, PINs, invoice no and date, HSN, taxable value, tax.
  Blocked today by the blank HSN.
- Part B at the shipment: vehicle no, or the transporter ID so the transporter fills it.
- Several parcel invoices on one truck: one consolidated e-way bill for the vehicle.
- Validity by distance (about 1 day per 200 km by road); expiry shown on the shipment.
- Cancel within 24 hours if the trip is called off; extend before expiry.
- Distance needs the customer's PIN in the master.

**E-invoice**
- Only for firms over the turnover limit (₹5 crore today); each of the six firms needs a flag.
- After Confirm: generate IRN → Ack no, Ack date, signed QR on the A4.
- If the e-invoice exists, the e-way bill Part A can come from it.
- Cancel within 24 hours; after that only a credit note.
- Report columns IRN · Ack No. · Ack Date · E inv Y/N already exist in the BRD (F:259).

**Open data items that block these**
- HSN and GST rate per design (open since `plans/dispatch.md` U33).
  Since the September 2025 GST change, garment rates depend on the piece price
  (5 % up to ₹2,500, 18 % above), so the rate comes from price, not only HSN. To confirm with accounts.
- Customer PIN and state code; transporter ID; firm turnover flag; who generates (Sutra or Busy).

---

## 7. Missing screens, in draw order

1. Ready · web · box board, New / Worked on sections, right panel customer list (light, dark).
2. Ready · web · a box selected, panel scrolled to that customer; filter chips on.
3. Ready · phone · New / Worked on segments, customer boxes; sort & filter sheet.
4. Packing · web · 3–4 customer lanes, boxes with 12 photo slots, active box, right panel = parcel invoice + documents.
5. Packing · web · scan accepted (photo in slot), rejected, box full bar.
6. Packing · web · invoice review for a two-order parcel, IGST, HSN filled; documents after Confirm.
7. Packing · phone · My packing (3–4 customers, box tiles), scan with slot box and box switcher, box full sheet.
8. Documents · e-invoice IRN generated / failed; e-way bill needed / not needed / Part A ready.
9. Close shipment v2 · transporter from master, LR no and date, vehicle, packages, weight, freight,
   e-way bill Part B, consolidated bill.
10. Print / send · A4 with IRN QR and e-way bill no, e-way bill page, LR copy; WhatsApp recipients.
11. Partly sent · order returns to Ready "Worked on ×2"; Held; cancel order.
12. Cancel within 24 h · invoice, IRN, e-way bill.

---

## 8. Questions for the owner

1. Ready shows **every open order** until cancelled, even ones with nothing in stock?
   Or "In stock only" on by default with a switch (BRD: D:7)?
2. Which of the six firms are over ₹5 crore (e-invoice)? Do we make IRN and e-way bills
   from Sutra, or does Busy do it after the push?
3. HSN and GST rate per design: who fills them, and does the rate follow the piece price?
4. LR / bilty: does the transporter give the LR at pick-up, or do you write it?
   Do you weigh boxes?
5. Packing: hard limit of 4 customers at once, or 4 shown and the rest in "+n more"?
6. Box size: always 12, or 10 for some designs (choose per box)?
