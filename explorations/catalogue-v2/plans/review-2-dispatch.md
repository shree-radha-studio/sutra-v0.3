# Review 2 · Dispatch (10 Oct 2026)

Re-checked at extra-high effort, 10 Oct 2026.

Review only. Nothing on the board was changed.

Page: `board.html?m=dispatch` · 116 frames (58 screens, light + dark).
Every Ready and Packing frame was opened at full size (`board-check.sh`), and the JSX was read.
Frame ids as the board prints them: `n-` phone, `nw-` web.

Sources:
- D = `design-system/research/brd-dispatch.txt` · S = `dispatch-screens.txt`
- B = `design-system/uploads/Business Req.txt` · F = `brd-final.txt` · M = `brd-masters.txt`
- DP = `plans/dispatch.md` · DF = `plans/dispatch-flows.md`
- Code paths are under `explorations/catalogue-v2/` unless named.

The yardstick is the owner's direction of 10 Oct:
a box board like a McDonald's kitchen screen,
pictures in every box, very visible boxes with fine curved edges,
sort and filter, New and Worked-on sections,
an order stays on Ready until it is fully sent or cancelled,
a right panel that is a searchable, collapsible customer list with quick buttons;
Packing with 3–4 customers at once, parcel boxes on screen,
scan → the piece lands in a box, the right panel showing the invoice of the selected parcel,
and the transport slip, e-way bill and e-invoice checks beside it.

---

## 1. What exists

Three bands draw Dispatch.

- **Band A · "Dispatch" (8 Sep)** · `mod-dispatch.jsx` (phone), `mod-dispatch-web.jsx` (web).
  Web runs on the earlier bar (`DShell`, `mod-dispatch-web.jsx:7`), not the approved `WebShell3`.
  Registration `mod-dispatch-web.jsx:345–353`. Phone n-1…n-26, web nw-1…nw-19.
- **Band B · "on the approved bar" (8 Sep)** · `mod-topbar2.jsx:101–150`, registration `:155`.
  Web only, nw-20…nw-23.
- **Band C · "structured" (6 Oct)** · `mod-dispatch-s.jsx`, `mod-dispatch-s-web.jsx`, registration `:194`.
  Phone n-27…n-31, web nw-24…nw-27.
- `modules.js:31` loads band C for this page; A and B come in as shared base files (`modules.js:25`).

Keep = carry over as is. Rework = content right, layout must change to boxes.
Retire = take off once the replacement is drawn. Fold = its job moves into another screen.

| Sub-menu | Frame | What it shows | Call |
|---|---|---|---|
| Ready | n-1 | phone cards, priority ring, PACK | Rework → box (§5.3) |
| Ready | n-2 | phone sort & filter sheet | Rework (sections, sort set) |
| Ready | nw-1 | earlier bar, queue rail, 2 columns, pending pane | Retire (nw-20 is its newer twin) |
| Ready | nw-20 | approved bar, In stock on, pane = pending journey | Rework → base of the new Ready |
| Ready | nw-21 | a card picked, pane = that order | Keep the pattern |
| Ready | n-27, nw-24 | structured rows / table | Retire |
| Pending | n-3, n-4 | phone three-level book, ₹ / no ₹ | Fold → the Ready right panel |
| Pending | nw-2 | earlier bar, full node | Retire |
| Pending | nw-22, nw-23 | four situations, grid and list | Fold → Ready sections (Q1) |
| Pending | n-28, n-29, nw-25 | structured | Retire |
| Packing | n-5 | phone picker: chips → box rows | Rework (3–4 customers, box tiles with photos) |
| Packing | n-6 | phone scan, tally, accepted | Rework (slot box, box switcher) |
| Packing | n-7 | phone scan rejected, five reasons | Keep |
| Packing | n-8 | phone review box, remove confirm | Keep (+ n / 12) |
| Packing | n-9 | phone box invoiced, no ₹ | Keep (+ one documents line) |
| Packing | nw-3 | desk terminal: chips, current order, boxes, live invoice | Rework → base of the lanes |
| Packing | nw-4 | scan armed, rejected, warning, remove confirm | Keep the states, move them onto the boxes |
| Packing | nw-5 | invoice review, bill-to, GST | Rework (§5.4 panel) |
| Packing | nw-6 | invoice done, select for shipment | Keep (fix clipping) |
| Packing | nw-7 | close shipment sheet | Rework (transport slip, e-way bill Part B) |
| Packing | nw-8 | A4 invoice + transport document | Rework (IRN QR, e-way bill no, LR) |
| Packing | n-30, n-31, nw-26 | structured scan, review, terminal | Retire (keep the box "Label" button) |
| Billed | n-10…n-14, nw-9, nw-10 | invoices, invoice sheet, shipments | Keep |
| Billed | nw-27 | structured | Retire |
| Out of stock | n-15, n-16, nw-11 | order and restock cards | Keep |
| Stock | n-17…n-20, nw-12…nw-15 | FG, material, WIP, FG inward | Keep |
| Sale return | n-21…n-26, nw-16…nw-19 | four-step wizard | Keep |

Retire 11 (nw-1, nw-2, all nine band C frames). Fold 4 (n-3, n-4, nw-22, nw-23), after Q1.

Seen at full size, not visible on the contact sheet:
- Box code hidden under its tags: "P0005…" under PACKING INTO + OPEN (nw-3, nw-4);
  "P00035" and "P00036" under AWAITING SHIPMENT (nw-5, nw-6).
- Shipment bar wraps to two lines, "2 parcels · 8 / pcs · Ambika" (nw-6).
- Band C phone: the boxes table runs under the buttons and the island (n-30).
- Only 4 designs have a photo (`design-system/ui_kits/data.js:5–14`; `design-system/assets/samples/`).
  1243, 1457, 3661 and D9107 show as grey code tiles, so most "pictures" on Ready and Packing are blank.
- Sample numbers disagree: the phone tally says 12 pcs, "12 of 12 planned" (n-6),
  the same box P00059 holds 4 (n-8, nw-3); P00036 is 2 pcs on the board, 6 in the sheet (nw-6, nw-7),
  so "2 parcels · 8 pcs" is wrong; D9107 White is billed to SO-3034, which has no D9107 (nw-3);
  the phone Ready has "Due ≤ 2 d" on but shows a card due in 12 days (n-1).

---

## 2. Flows walked

Clicks on the desk (web at 1280 × 800), taps on the packer's phone.
NOT DRAWN = no frame shows it.

### (a) Ready → choose a customer or order for packing

Desk, nw-20:
1. Dispatch opens on Ready. 0 clicks.
2. Find the customer: two fixed columns, about 4 customers per screen, or the search field. 0–1.
3. PACK on the card. 1 click → Packing nw-3 with a box open (D:16).
   **Total 1–2 clicks.** Fine.
- Choose one order instead of the whole customer: NOT DRAWN. PACK takes everything (D:16).
- Which orders were worked on before: not on the cards.
  A V Creation (SO-3033) is a worked-on order on the board, but its card looks new
  and still counts all 9 pcs; only the pane says "4 of 9 pcs dispatched on 02/09/26" (nw-21).
- Worked-on orders as a group live in another sub-menu: Pending › After 1st dispatch (nw-22).
- Orders with nothing in stock are hidden: "In stock" is on by default (`mod-topbar2.jsx:42`).
- Sort and filters sit in a 44 px folded strip with vertical text (`mod-topbar2.jsx:92`).
  1 click to open, 2 to change. Easy to miss.

Phone, n-1:
1. Dispatch opens on Pending (`mod-dispatch.jsx:212`, D:4). 1 tap to Ready.
2. PACK. 1 tap → picker n-5. **2 taps.**
- One customer fills the screen; the second is cut.

### (b) Packing 3–4 customers at once

Desk, nw-3:
1. Customer chips: All parcels + 6 customers in the code (`mod-dispatch-web.jsx:72`);
   at 1280 px only 3 show, the rest are cut with no scroll cue.
2. Switch customer: 1 click, and the boxes of the first customer leave the screen.
   Two customers' boxes side by side: NOT DRAWN.
3. The active box carries PACKING INTO (P00059). Change it: click another box. 1.
4. Scan: "Scan here" claims the scanner, 1 click (nw-4); then 0 per piece.
   The piece shows as a text row with a stepper. NOT DRAWN: the piece landing in a box as a picture.
5. Box full: NOT DRAWN. No capacity anywhere; DP:422 chose a plain pcs count.
6. Close parcel. 1.

Phone, n-5 → n-6 → n-8:
1. Packing tab 1, customer chip 1 (skipped when the desk pre-picked it), box row 1 → scan.
   **2–3 taps to the first scan.**
2. Switch box mid-scan: back and pick again, **2 taps**. No switcher on n-6.
3. The tally counts the order plan, not the box (n-6 "12 of 12 planned" vs 4 pcs in n-8).
4. Box rows have no photos (n-5).

### (c) Invoice per parcel in the right panel

Desk:
1. The right pane "Live invoice" is always open (nw-3). 0 clicks.
   **It bills P00035 (packed, 2 pcs) while P00059 is being packed.**
   `mod-dispatch.jsx:122` hard-codes "P00035 · SO-3034". The owner asked for the selected parcel.
2. Close parcel (1) → Review invoice (1) → nw-5 → Confirm (1). **3 clicks from a full box.**
3. GST block: drawn (nw-3, nw-5) as CGST 6 % + SGST 6 % (`mod-dispatch.jsx:135`).
   Band C shows a flat 5 % (nw-26).
   Neither fits today's rule (from 22 Sep 2025): garments are 5 % up to ₹2,500 a piece and 18 % above.
   D9107 at ₹1,495 is 5 %, the ₹3,995–5,995 designs 18 %: one invoice, two rates. NOT DRAWN.
4. HSN: a column with "—" on every line (`mod-dispatch.jsx:127`, A4 `mod-dispatch-web.jsx:165`).
5. Every order number: each line names its order. A parcel with pieces of two orders (B:87): NOT DRAWN.
6. IGST for a buyer in another state (most buyers): NOT DRAWN. The A4 has no place of supply.
7. Which of the six firms bills: NOT DRAWN. Always Shree Radha Studio.
8. Ship-to is picked later, in the shipment sheet (nw-7, incl. "Ludhiana branch"),
   after the A4 already printed "Goods for … Delhi". It belongs in invoice review.

Band C (nw-26) builds one invoice per **order** ("SO-3034 · builds as pieces land in boxes"),
not per parcel; its "Scanned 5 of 12" is the order's progress (`mod-dispatch-s-web.jsx:125, :140`).

### (d) Transport slip, e-way bill, e-invoice

Searched all five Dispatch files. What exists:
- Close shipment nw-7 (`mod-dispatch-web.jsx:135–151`): consignee chips, transporter "Local delivery" ▾,
  broker ▾, one field "Vehicle · LR no · DL 1C 4421 · LR 8817" ▾, gate token (auto), parcels ticked, note.
  The ▾ marks a picker, but the list (from the Transporters master, M:69) is not drawn.
- Transport document nw-8 (`:170–177`): date, consignee, transporter, vehicle · LR, broker, gate token,
  parcels with invoice numbers and pcs, guard and driver lines.
- Shipments history n-14, nw-10.

What does not exist:
- **E-way bill: nothing.** No "needed?" check, Part A, Part B, number, validity, cancel.
- **E-invoice: nothing.** No IRN, Ack no, Ack date, QR, "E inv Y/N".
  The BRD names these only as columns of the purchase-return register (F:243).
- Transport slip: no LR date, no packages or weight, no freight to pay / paid,
  no destination, no transporter GSTIN or transporter ID.
- Clicks to the truck: Select for shipment (1) → Create shipment (1) → Issue transport document (1).
  **3 clicks, and no document check on the way.**

### (e) Close shipment, print, WhatsApp

1. Issue transport document → print preview nw-8: Print A4 · 2 pages, PDF, WhatsApp PDF. 1 click each.
2. WhatsApp: one button, no choice of customer group, broker or transporter.
3. A4: "Orders SO-3034 · Parcel P00035 · Gate token" (good).
   Missing: IRN, QR, e-way bill no, LR and vehicle, place of supply
   (the transporter shows only as "via Local delivery").
4. Packer phone (n-9): the gate token only. Good, no ₹.

### (f) Partly sent → back to Ready

1. A partly sent order shows in Pending › After 1st dispatch (nw-22) and in the pane journey (nw-20).
2. Back on Ready as "worked on ×2": NOT DRAWN. Cards look the same on the first and the third pass,
   and they count sent pieces as still owed (nw-21).
3. Held after 20 days without customer approval (F:12): NOT DRAWN.
4. Cancel an order, the only way off Ready: NOT DRAWN.

---

## 3. Against the owner's direction

### Band A · "Dispatch" (8 Sep)

Matches:
- A customer card holds all their orders, every line with a photo (n-1, nw-1).
- The terminal has the three zones the owner describes: what to pack, the boxes, the invoice (nw-3).
- Scan states in words, invoice review with GST, shipment, A4 (nw-4…nw-8).
- The packer's phone never shows ₹ (n-4, n-5…n-9).

Misses:
- Earlier bar (`DShell`) beside the approved one: two headers on one page.
- Islands: radius 18–20 (`mod-dispatch.jsx:31, :62, :96`), pill tags. Not "fine".
- Six or more hues: five priority rings (`DP_P`, `:6`), green, amber and blue pills, maroon buttons on every card.
- No sections. No capacity. Boxes are lists of text rows, not boxes with pictures.
- The invoice pane does not follow the box being packed (`:122`).
- One customer's boxes at a time; chips cut at 3 (`mod-dispatch-web.jsx:72`).

### Band B · "on the approved bar" (8 Sep)

Matches:
- The approved chrome (`WebShell3`).
- The pane is already a customer-wise, searchable list with quick chips (nw-20): closest to the owner's panel.
- Journey dots (raised → approved → 1st dispatch → done) show worked-on orders in the pane.
- Pick a card, the pane shows that order, "All pending" goes back (nw-21).

Misses:
- **The model is the opposite of the owner's.** Ready = fresh orders, In stock on (`mod-topbar2.jsx:42`);
  worked-on orders sit in another sub-menu (nw-22).
- Pane chips include "Approval": orders not yet approved do not belong in Dispatch (`:66`).
- Pane rows do not collapse; the list stops at 5 customers (`:68`).
- Two fixed columns, about 4 customers per screen. A kitchen board needs 8–10.
- Sort and filters folded into a 44 px strip (`:92`).
- Still five priority hues, red due pills, a green "Fully planned", maroon PACK on every card.
- "Due day 25 by default" (`:137`, `design/SUTRA-SCREEN-FLOW.md:52`); the BRD says 20 (F:12).
- Phone not drawn.

### Band C · "structured" (6 Oct)

Matches:
- The counts strip reads fast (nw-24).
- All six packing customers fit across the top (nw-26).
- A "Label" button on each box (`mod-dispatch-s-web.jsx:119`): the only packing slip print on the board.

Misses:
- The table look the owner does not like; 4 px corners read hard.
- No photos on the Ready rows (nw-24).
- Invoice per order, not per parcel; flat GST 5 % (`:122–131`).
- Drawn under a 7-minute cap with no full-size check: n-30 clips.

### Inaccessible, deep or lost

- Sort and filters on web Ready: folded strip, 2 clicks (nw-20).
- Worked-on orders: one sub-menu away (nw-22), or one click into the pane (nw-21).
- Orders with no stock: hidden by the default toggle.
- Another customer's boxes: 1 click, and the current ones leave the screen (nw-3).
- Switching box on the phone: 2 taps (n-6 → n-5).
- Ship-to: only in the shipment sheet, after the invoice (nw-7).
- Call chips (customer, transport, broker) take a full row on every card (nw-20).
- Five badges on one card: priority disc, due pill, tier, stock tag, "Fully planned".
- "Fully planned" means "all in stock" on the board (`mod-dispatch.jsx:66`),
  but "already in packing, no PACK" in the BRD (D:15).

### Money

- Ready board: no ₹. Correct.
- Ready pane (nw-20) and Pending (nw-22) show ₹: allowed for the desk (D:24); a packer variant is not drawn on web.
- Packing desk pane shows ₹: allowed. A packer at the desk needs a no-₹ variant (not drawn).
- Packer phone: clean everywhere, band C too (n-5…n-9, n-30, n-31).

---

## 4. Priority lists

### P1 · Must change

1. **Ready holds every open approved order until it is fully sent or cancelled** · nw-20, nw-22, n-1, n-3.
   Drop "Ready = fresh, In stock on" (`mod-topbar2.jsx:42`). Fold Pending into it:
   its situations become sections and tags, its book becomes the right panel (Q1).
2. **Ready as a box board with sections Worked on · New · In packing** · nw-20, n-1.
   Customer boxes with photo strips, owed pieces only, state tags, fine corners,
   one maroon line, priority as text. Spec §5.2–5.3.
3. **Right panel = searchable, collapsible customer list with dispatch quick buttons** · nw-20 pane.
   No "Approval". Sort and filters move from the 44 px strip to the board bar.
4. **Packing shows 3–4 customers at once as lanes** · nw-3, n-5.
   Parcel boxes drawn as boxes with 12 photo slots, "9 / 12", box full. Cap at 4 live. Spec §5.4–5.5.
5. **Scan → the piece visibly lands in the active box** · nw-4, n-6.
   Photo drops into the next slot; switch box by click, by scanning the box label, or with a phone switcher.
6. **The right panel follows the selected parcel** · nw-3, nw-5.
   Fix the P00059 / P00035 mismatch. Firm, bill-to and ship-to before Confirm,
   orders in the parcel (draw two), HSN, GST by price slab, IGST.
7. **A documents checklist per parcel, with one next step** · new frames.
   Packing slip · invoice · e-invoice IRN · e-way bill (needed? Part A, Part B, valid till) · transport slip.
8. **Shipment and print carry the documents** · nw-7, nw-8.
   Transporter from the master, LR no and date (or "add later"), vehicle, packages, weight, freight,
   e-way bill Part B and a consolidated bill per vehicle; A4 with IRN QR, e-way bill no, LR, place of supply;
   WhatsApp to a chosen list.

### P2 · Good to change

1. Retire band C and nw-1, nw-2 once P1 1–5 are drawn. Keep band C's counts strip and box "Label".
2. Fix what clips at full size: box codes under tags (nw-3…nw-6), the shipment bar (nw-6), n-30.
3. Fix the sample data: a photo for every design (borrow from `assets/studio/` or `design-system/uploads/`),
   boxes of 9–12 pcs, tally = box contents, P00036 one count, D9107 on its own order.
4. A pick list for the stock boy: photos, qty to bring, ticks as pieces scan (phone, and a print).
5. The phone opens on Packing for the packer, on Ready for the manager (DF §5.1; changes D:4).
6. "Pending approval" leaves Dispatch (Sales owns it). "After due date" becomes Held with "Ask customer". Hand-off to Sales.
7. One due rule: 20 days (F:12) or 25 (the board). Then fix `mod-topbar2.jsx:137` and SCREEN-FLOW:52.
8. Rename or drop "Fully planned"; the BRD meaning is "already in packing" (D:15).
9. PACK lets the manager untick an order (the owner "chooses an order").
10. Cancel order from Ready: manager only, with a reason.
11. No-₹ variants for a packer at the desk (Packing pane) and for the Ready panel.
12. Call chips fold into one phone icon with a menu (customer, transport, broker).

Hand-offs for the lead: Sales (approval feeds Ready; nothing unapproved in Dispatch),
App shell (Pending leaves `DISP_SEG` in `web.jsx:122` and the phone node list), Catalogue (photos for every design in `data.js`).

### P3 · Keep as is

1. Scan rejected in words, with the serial and the five reasons (n-7, nw-4).
2. Remove a piece behind "becomes scannable elsewhere" (n-8, nw-4).
3. "Scan here" hands the scanner between desk and phone (nw-4, n-6).
4. Invoice review: fix qty and rate, pick bill-to, nothing reaches accounts before Confirm (nw-5).
5. Select for shipment; unticked parcels stay for the next trip (nw-6, nw-7).
6. Gate token on the invoice, the shipment and the transport document (nw-6…nw-8).
7. No ₹ on the packer's phone (n-4, n-5…n-9).
8. A picked order in the pane with a way back (nw-21).
9. Journey dots per order (nw-20 pane): reuse them inside the new boxes and panel.
10. Billed, Out of stock, Stock, Sale return as drawn (n-10…n-26, nw-9…nw-19).

Counts: P1 8 · P2 12 · P3 10.

---

## 5. Spec · the box layout

No drawing here; these are the numbers a drawer follows.

### 5.1 Shared rules

- **Corners: 8 px** on customer boxes, parcel boxes, panel cards. **6 px** on photos, slots, buttons and tags.
  No pills inside boxes. Phone sheets 12 px at the top.
  (Today: 18–22 islands in band A, 4 px in band C. 8 reads curved at a metre and keeps the grid tight.)
  The schema's cards are 22 px (`design/SUTRA-DESIGN-SCHEMA.md` §3), not a rule that never bends; 8 px for Dispatch needs the owner's OK (Q6).
- **Very visible boxes:** 1 px `T.line2` border (16 % ink), body `T.surface`,
  a 44 px head band in `T.surface2`, no shadow in dark, a faint one in light. Gap 12 px.
- **Colour: one maroon line per screen = the one thing being worked on.**
  Ready: the selected box (2 px maroon outline, its PACK filled maroon).
  Packing: the active parcel box (2 px maroon outline).
  Everything else is ink on sand. Buttons are ink outline or ink fill.
  `T.danger` only for overdue and a rejected scan; `T.warn` only for due ≤ 2 d and "stock exhausted".
  No green, blue or priority hues. Priority is text: P1 filled ink, P2–P5 outline.
- **Photos lead.** Photo beside every design number; the number is the caption head (display face).
  Out-of-stock lines: photo dimmed to 55 % with "0" on it (dimming alone vanishes in dark).
- Lucide icons, no emoji, sentence case, dd/mm/yy, Indian grouping.

### 5.2 Ready · desk web (`WebShell3`)

Board bar (one row, 48 px):
- Counts "15 customers · 41 orders · 212 pcs owed".
- Search "Customer, order or design".
- Sort ▾ "Due · oldest first".
- Quick filters: Packable now · Due ≤ 2 d · Overdue · P1–P2 · Tier ▾ · Transport ▾ · City ▾ · More ▾.
- Saved views ▾: the owner's default sorts (e.g. "Morning: due first", "Packable first", "Big orders first").
- Expand all / collapse all.

Sections as board columns, like a project board (owner: "project-management kind of board"):

| Column | Holds | Width at 1920 · 1440 · 1280 |
|---|---|---|
| Worked on · 6 | been through dispatch at least once, still owed | 2 boxes · 1 · 1 |
| New · 9 | approved, never touched in dispatch | 2 boxes · 1 · 1 |
| In packing · 3 of 4 | the live packings, compact, "Open ▸" | 260 · 240 · 230 px |
| Held · 2 | past due, waiting on the customer | a 30 px handle with the count |

- A customer with a new and a worked-on order sits in Worked on; each order carries its own tag.
- Boxes with nothing packable sit at the foot of their column, dimmed, "nothing in stock · 4 at last step".
- Each column scrolls on its own; its head shows the count and the pcs.

Customer box (like a kitchen order tile):
- Width 270–340 px (two per column at 1920 px). Height follows content, up to two orders, then "+1 more order".
  About 330 px with two orders, 230 with one.
- Head band 44: monogram 28 · name (display 17) · city · tier as text; right: worst due
  ("3 d over" danger · "2 d left" warn · "12 d left" ink) and "P2".
- Tags (max two, 10 px caps, outline): **NEW** · **WORKED ON ×2** · **PARTLY SENT 4/9** · **HELD**.
  Worked on also shows "last sent 02/09 · 8 d ago" (the kitchen timer).
- Per order: order no (mono) · date · due · "5 owed of 9" · optional note (one line).
  Then a photo strip: thumbs 44 × 55, design no under each, "×3" on the photo, 5 per row, "+3" tile.
  Only owed pieces show; sent pieces never count again.
- Foot 44: "12 pcs owed · 9 packable" · **PACK** (ink outline; maroon fill only on the selected box).
  PACK opens a small tick list of the orders when there are two or more (all ticked).
- One phone icon in the head opens customer, transport, broker.
- Fits about **10 boxes at 1920 × 1080** plus the In packing column (today about 4–5), about 5 at 1440.

Right panel "All orders · 42" (340 px, collapses to a 30 px handle):
- Search on top.
- Quick buttons (6 px, two rows): All · Worked on · New · Packable now · Due ≤ 2 d · Held. Expand all / collapse all.
- List: customer row (name, "3 orders · 36 pcs owed", worst due) ▸ order rows
  (order no, date, sent / ordered, due, tag, journey dots) ▸ lines with photos (₹ for the manager only).
- Tap a customer: the board scrolls to its box and selects it (maroon outline).
- PACK from the panel too, on the customer row.

PACK → Packing with that customer as a new lane and a fresh box open (D:16).
A fifth packing asks: "4 packings open · add anyway or pause one".

### 5.3 Ready · phone

- Header as today; under it a segment "Worked on 6 · New 9 · Packing 3".
- One box per row, full width, 8 px. Same content; thumbs 56 × 70, 5 per row.
  About 2 boxes per screen (today 1.3).
- PACK 48 px tall. Sort and filter sheet as n-2 with the new sort set.
- The right panel becomes the search: typing opens the collapsible customer list as a sheet.

Sort set (B:90, D:9): Due days (oldest first, default) · Priority · Customer score · Packable pcs ·
Total pcs high/low · Created old/new · Waiting since last dispatch (new, for Worked on).

### 5.4 Packing · desk web

Main area: **one lane per live customer, 3–4 stacked** (owner: 3–4 mostly; BRD said 7–8, B:91).
- Lane head (200 px): monogram, name, city, transporter; "SO-3034 · SO-3041"; "14 of 31 pcs packed";
  **To bring ▸** opens the pick list with photos (what the stock boy fetches).
- Then the customer's parcel boxes left to right, then a dashed "+ New box".
- The active lane is full size (about 270 px tall); the others are compact (about 130 px, mini slots).
  Click a compact lane to make it active. All 3–4 stay on screen; nothing hides behind a chip.

Parcel box (drawn as a box, not a list):
- 196 px wide, 8 px corners. Head: box code (display 17) · OPEN / PACKED / INVOICED as text · **"9 / 12"**.
- Body: **4 × 3 slots**, 40 × 50 each. A filled slot is the piece photo with its design no;
  an empty slot is a 1 px dashed outline. A box set to 10 shows two slots crossed out.
- Foot: Close box. A packed box keeps its slots, greyed, with the invoice no.
- The active box: 2 px maroon outline and a filled ink "PACKING INTO" tag. One only.
- Fits 5 boxes per lane at 1920, 2 at 1280 with the panel open.

Scan feedback (on the box, not in a toast):
- Accepted: the photo drops into the next slot, the slot rings in ink for 1 s, "8 → 9 / 12",
  the line ticks in the pick list.
- Stock exhausted: a warn line under the box.
- Rejected: a danger strip across the lane, the reason in words and the serial (as nw-4); nothing moves.
- Box full: the 13th scan asks "P00059 is full · Close it and open P00061" or "Put in P00060". 1 click.
- The piece is owed to another live customer, not this one: "Put in Preeti's P00071?" 1 click.
- Scanning a box label makes that box active. 0 clicks.

Right panel "Parcel P00059" (380 px, follows the selected box):
- Firm (one of six, its GSTIN, its invoice series) · bill-to ▾ · ship-to ▾ (here, before Confirm) ·
  place of supply and state code.
- Orders in this parcel: "SO-3034 · SO-3041".
- Lines: photo · design · HSN · colour · order no · qty · rate · amount.
- GST block by rate: 5 % lines and 18 % lines; CGST + SGST inside the state, IGST outside; rounding; words.
- **Documents**, one row each, state in words, ink icons (danger only when blocked):
  1. Packing slip · "9 pcs · label printed".
  2. Invoice · "building" → "review" → "SI-2291 confirmed".
  3. E-invoice · "needed: firm over ₹5 crore, buyer registered" → "IRN · Ack 1123… · 10/10 14:02",
     or "not needed: buyer unregistered".
  4. E-way bill · "needed: ₹62,890 with tax, over ₹50,000, to another state" → "Part A ready" →
     "Part B at shipment" → "EWB 1812 3456 7890 · valid till 12/10/26".
  5. Transport slip · "Patel Parcel Service · at shipment" → "LR 8817 · 3 packages · 42 kg".
- **One button = the next missing step:** Close box → Confirm invoice → Get IRN → Add to shipment.
- ₹ for the desk role only.

### 5.5 Packing · packer phone

1. **My packing** (opens here): the 3–4 live customers stacked; each shows its boxes as tiles
   (code, "9 / 12", 4 mini photos). Tap a box → scan. **1 tap.**
2. **Scan**: camera band 180 px (today 470); under it the active box drawn with its 12 slots,
   64 × 80, filling with photos as pieces scan; "9 / 12" in 48 px; the last piece.
   A row of box codes switches the box: 1 tap. Scanning a box label: 0.
3. **To bring**: the pick list as photos, qty to fetch, ticked as pieces scan.
4. Box full: a sheet "Close box" · "Open new box". 1 tap each.
5. Close box → "With the desk" → invoiced: the invoice no and one line,
   "Desk: invoice done · e-way bill pending". No ₹, no documents panel.

---

## 6. Document chain per parcel

One invoice per parcel (B:87), so one IRN per parcel, and one e-way bill per parcel whose invoice is over ₹50,000.
One LR and one shipment per consignee per trip.

| # | Document | Per | On the board | Data it needs | Missing |
|---|---|---|---|---|---|
| 0 | Pick list (what to bring) | customer | Partly · nw-3 left pane (desk only) | owed lines, photos, stock | the stock boy's view or print |
| 1 | Packing slip / box label | parcel | Partly · nw-3, n-8 lines; "Label" nw-26 only | box code, customer, lines, pcs, order nos, a barcode | the printed slip and label |
| 2 | Invoice | parcel | Drawn · nw-3, nw-5, nw-6, nw-8, n-9 | firm, GSTIN, series, bill-to, ship-to, place of supply, orders, HSN, rate, GST | firm, HSN, 5 / 18 % slabs, IGST, two orders, ship-to before Confirm |
| 3 | E-invoice IRN | invoice (B2B) | **Missing** | firm's turnover flag, buyer GSTIN, 6-digit HSN, values | everything: check, generate, retry, IRN + Ack + QR on the A4, cancel |
| 4 | E-way bill | invoice over ₹50,000 | **Missing** | Part A: GSTINs, from and to PIN, invoice no and date, HSN, value and tax, distance, transporter ID · Part B: vehicle no | everything: check, Part A, Part B, number, validity, extend, cancel, consolidated bill |
| 5 | Transport slip / LR (bilty) | consignee per trip | Partly · nw-7, nw-8, n-14, nw-10 | transporter from master (GSTIN or transporter ID), LR no and date, vehicle, packages, weight, freight, destination, invoice and e-way bill nos | all but the transporter name, vehicle · LR in one field, and the parcel list |
| 6 | Shipment and gate | trip | Drawn · nw-6, nw-7, n-14, nw-10; gate token | parcels, consignee, transporter, gate token | e-way bill Part B and LR tied to the trip; the guard's check (F:57) |
| 7 | Print and WhatsApp | parcel and trip | Partly · nw-8, nw-6 | A4, transport document, e-way bill print, LR copy | IRN QR, e-way bill page, LR copy later, recipients |

### Transport slip · what is missing

- Transporter picked from the Transporters master (M:69). The master has GSTIN only;
  an unregistered transporter needs its 15-character transporter ID.
- LR / bilty no and date. Often known only after pick-up: allow "add later" and a photo of the bilty.
- Vehicle no as its own field (today merged with the LR, nw-7).
- Packages (= parcels), weight, freight to pay / paid, destination city and PIN, declared value.
- The invoice nos and e-way bill nos it carries.

### E-way bill · what is missing (GST, goods by road)

- **Needed check per invoice:** value with tax over ₹50,000 for a move to another state.
  Inside one state each state sets its own limit; Delhi's to confirm with the CA.
- A full parcel of 10–12 pieces at ₹4,995 is ₹58,900–70,700 with 18 % tax
  (at ₹3,995 it crosses from 11 pieces): **most full parcels to another state need their own e-way bill.**
  A box of 12 blouses at ₹1,495 (₹18,800 with 5 %) does not.
- Part A from the invoice: GSTINs, PINs, invoice no and date, HSN, taxable value and tax.
  Blocked today by the blank HSN (M:394).
- Part B at the shipment: the vehicle no, or the transporter ID so the transporter fills it.
  When parcels go to a transporter's office within 50 km in the same state, Part B can wait for the transporter.
- Several parcel bills on one truck: one consolidated e-way bill for the vehicle.
- Validity by distance: 1 day per 200 km. Show "valid till" on the shipment; extend within 8 h of expiry.
- Cancel within 24 hours if the trip is called off.
- Distance comes from the PINs: the customer's PIN must be in the master.

### E-invoice · what is missing

- Needed for a firm whose turnover crossed ₹5 crore in any year since 2017-18 (counted per PAN).
  Each of the six firms needs that flag.
- Only for registered buyers (B2B). The customer master already has REGISTER / UN-REGISTER / CONSUMER (M:58).
- On Confirm: get the IRN → Ack no, Ack date and a signed QR on the A4.
  Firms over ₹10 crore must report within 30 days of the invoice date.
- HSN: 6 digits for firms over ₹5 crore, 4 below.
- The e-way bill Part A can be filled from the e-invoice.
- Cancel within 24 hours; after that only a credit note.

### Open data that blocks all three

- HSN and GST rate per design (U33, M:394). The rate follows the piece price (5 % up to ₹2,500, 18 % above).
  Sarees may be taxed as fabric at 5 % at any price. Confirm with accounts.
- Customer PIN and state code; transporter ID; each firm's turnover flag.
- Who generates IRN and e-way bills: Sutra (through a GST service provider) or Busy after the push (Q2).

---

## 7. Missing screens, in draw order

1. Ready · web · board with Worked on · New · In packing · Held; right panel customer list with quick buttons. Light and dark.
2. Ready · web · a box selected, panel on that customer; PACK with the order tick list; a 5th-packing warning.
3. Ready · phone · sections, boxes with photo strips; search = the customer list sheet; sort and filter sheet.
4. Packing · web · 3–4 lanes, parcel boxes with 12 photo slots, the active box; right panel = parcel invoice + documents.
5. Packing · web · scan states on the boxes: accepted, rejected, box full, "put in Preeti's box?".
6. Packing · web · review of a two-order parcel: IGST, 5 % and 18 % lines, HSN, firm, ship-to; documents after Confirm.
7. Packing · phone · my packing, to bring, scan with the slot box and switcher, box full sheet.
8. Shipment v2 · web · transporter from the master, LR now or later, vehicle, packages, weight, freight,
   e-way bill Part B, consolidated bill.
9. Print and send · A4 with IRN QR and e-way bill no, the e-way bill page, LR copy; WhatsApp recipients.
10. Ready · worked on ×2 after a partial dispatch; Held with "Ask customer"; Cancel order.

---

## 8. Questions for the owner

1. Ready shows every approved order until fully sent or cancelled, even with nothing in stock?
   Then the Pending sub-menu goes away and becomes the right panel. Agree?
2. Who makes the IRN and e-way bills: Sutra, or Busy after the push?
   Which of the six firms are over ₹5 crore?
3. HSN and GST rate per design: who fills them in, and does the rate follow the piece price?
4. The LR / bilty: does the transporter give it at pick-up or later? Do you weigh boxes? Freight to pay or paid?
5. Packing: one customer packed at a time while 2–3 wait, or pieces for several customers mixed?
   Is 4 the cap? Is a box always 12 pieces?
6. Corners: 8 px boxes for Dispatch (the schema's cards are 22 px). Agree?

---

## 9. What changed from the first draft

- Band C's "5 of 12" is the order's progress, not box capacity: no box capacity exists anywhere.
  Band C also invoices per order, not per parcel.
- Worked-on orders are drawn, but in Pending (nw-22) and in the pane (nw-21), not on Ready;
  band B's model (Ready = fresh, In stock on) is the opposite of the owner's.
- The packing chips are All + 6 customers, 3 visible, not 8. The nw-7 transporter fields are pickers, not read-only.
- IRN and "E inv" columns sit in the purchase-return register at F:243, not F:259.
- GST: the board's 12 % fits neither of today's slabs; at 18 % most full parcels need an e-way bill.
- Added: full-size clipping and sample-data faults, ship-to before Confirm, a pick list,
  the board-column layout and lane numbers, the documents checklist; P1 cut from 14 to 8.
