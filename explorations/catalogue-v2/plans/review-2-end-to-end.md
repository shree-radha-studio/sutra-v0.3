# Review 2 · End to end (10 Oct 2026)

From a new design to a parcel on a truck:
upload → cabin multi-cart → submit → approval → Ready → Packing → invoice per parcel → e-invoice, e-way bill, transport slip → shipment.

This file merges four module reviews and adds the seams between them.
Each module file has the full walk, every frame id and the long lists:

| Module | File | P1 · P2 · P3 |
|---|---|---|
| Catalogue (upload, cabin carts, submit) | `review-2-catalogue.md` | 14 · 16 · 16 |
| Sales (sale orders, approval, history, analytics) | `review-2-sales.md` | 8 · 16 · 9 |
| App shell (doors, top bar, roles) | `review-2-appshell.md` | 8 · 16 · 12 |
| Dispatch (Ready, Packing, documents) | `review-2-dispatch.md` | 8 · 12 · 10 |

Review only. No screen was changed.

Frame ids: finals `f-` (phone) and `w-` (web) are the same on every page.
Drafts count per page, so they carry the page: "dispatch nw-20" is frame nw-20 on `board.html?m=dispatch`.

---

## 0 · How this was done

- **Board split.** Sale orders, Returns and Analytics now have their own page, `board.html?m=sales` (a Sales tab on `index.html`).
  Board grouping only: the screens still read Catalogue › Sale orders inside the mock-ups.
- **Four sessions, one per module, Opus 5.5 at extra-high effort.**
  Each opened every frame of its module at full size (`board-check.sh`) and read the JSX.
  A first pass at default effort (about 5 minutes each) was thrown away and redone.
  The redo corrected it in places, e.g. Dispatch's "5 of 12" is the order's progress, not a box capacity;
  the cart "+" that clips is the dashed "+", not a fourth chip; self-approval is drawn on w-10, not hypothetical.
- **The 6 Oct "Dispatch · structured" drafts** (band C on the Dispatch page) were made by five sub-agents on the
  Fable 5.1 model, under 6–7 minute hard caps, told not to take screenshots, about 10.5 minutes in all,
  checked with one glance at a contact sheet. No effort setting was recorded.
  Result: the table look, an invoice per order instead of per parcel, flat 5 % GST, a clipped phone frame (dispatch n-30).
  Call: retire band C; keep its counts strip and the box "Label" button.

---

## 1 · Your direct questions

**Is there an approval screen for incoming sale orders?** No.
- Only an Approve button on the opened order: f-18 dock, the w-8 pane (below the fold), the w-10 header.
- Anyone can press it, including the person who raised the order: on w-10 the logged-in sale manager, Rohan,
  approves "raised by Rohan Mehta" (`web.jsx:279–281`).
- No Home › Approvals screen, no count on the bell, no notification. Home is not on the board at all.
- The opened order shows 4 of the BRD's 10 approval facts on phone, 5 on web (F:47–56).
- A full spec (phone + web, queue, card, actions, credit-line red blocker) is in `review-2-sales.md` §2.

**What exists in Dispatch today?** Three bands on one page:
- A · 8 Sep: the whole module, on an older header (`DShell`), islands with 18–20 px corners, five priority hues.
- B · 8 Sep: Ready and Pending on the approved header. Its right pane is already close to what you asked for.
  But its model is the opposite of yours: Ready = fresh orders with "In stock" on (`mod-topbar2.jsx:42`);
  worked-on orders sit in another sub-menu (Pending › After 1st dispatch, dispatch nw-22).
- C · 6 Oct: the structured, table-like drafts (above).

**Transport slip, e-way bill, e-invoice: what is missing?**
- E-way bill: nothing anywhere on the board.
- E-invoice: nothing in Dispatch. The only IRN line on the board is Production's purchase-return credit note,
  "E-invoice · IRN pending · Ack no · date on push" (`mod-production-web.jsx:145`); the sale invoice can reuse it.
- Transport slip: partly. The shipment sheet has a transporter picker, one merged "Vehicle · LR no" field and a gate token (dispatch nw-7);
  the transport document prints them (dispatch nw-8). Missing: LR date, packages, weight, freight, destination,
  transporter ID, the e-way bill number.
- The invoice under all three is not right yet: 12 % GST (CGST 6 + SGST 6, `mod-dispatch.jsx:135`),
  HSN "—" on every line, no IGST, no firm choice, ship-to picked after printing. Details in §5.

---

## 2 · The walk, end to end

Taps on phone, clicks on web, as drawn. NOT DRAWN = the step has no frame.

| # | Step | Where | Phone · web | What stops it |
|---|---|---|---|---|
| 1 | New design: sample → deploy for reading → make product → costing | Production n-38…n-42, nw-36…nw-42 | ~14 · ~16 | Deploy is web only; Make product sets **one photo**; a ready-bought design has no way in |
| 2 | Upload pictures per colour (primary, 4 side profiles, AI, model, video) | Catalogue f-8 "Upload" | — | Upload centre NOT DRAWN; no control opens the salesperson view from the product (f-6, w-5) |
| 3 | Party sits down: start a cart | Catalogue f-1, f-2, w-1 | hidden | The dashed "+" sits past the edge; no strip on f-2; the basket's cart menu and the new-cart sheet NOT DRAWN |
| 4 | Show pieces, add to the active cart | f-1, w-1 | 1 · 1 | The grid "+" does not say which colour it adds |
| 5 | Add a colour set / add to all carts | scan pop-up f-10 only | — | Not on the grid or product page; pop-up still has four buttons, not the two + switch you chose on 6 Oct |
| 6 | Edit a party's cart from the catalogue | double tap chip → f-13; web pane w-1 | 1 + 1 each · 1 each | Works. Keep |
| 7 | Customer mode while parties look | phone ⋮ → side menu (2), web header switch (1) | 2 · 1 | Exit is one open tap; the island still offers CRM, Dispatch, Production; parties see each other's carts (catalogue n-2) |
| 8 | Finalise: due days, priority, broker, transport, note | Carts f-12, w-7 | — | Due days read-only; priority, broker, transport NOT DRAWN; note web only; no way back to the grid on phone |
| 9 | Credit-line check before the party leaves | — | — | NOT DRAWN (F:17) |
| 10 | Submit 3 carts, see that it went | f-12, f-13, w-7 | 6 · 3–6 | No "Submit all"; no "SO-3455 sent to Accounts" |
| 11 | Approver learns an order waits | — | — | NOT DRAWN: no Home, bell count, badge, notification |
| 12 | Approve with the facts | Catalogue › Sale orders › Raised → order → Approve (f-15, f-18, w-8, w-10) | 5, then 3 per order · 3–4, then 2 + scroll | No queue; 4–5 of 10 facts; no decline, wait, approve part, send to owner, red blocker; self-approval |
| 13 | Approved order reaches Ready | dispatch nw-20, n-1 | 0 | Only if something is in stock; Ready and Sales disagree on states (§3) |
| 14 | Ready: see new and worked-on orders, sort, filter | dispatch nw-20, nw-22 | 1–2 · 1 | Worked-on orders live in Pending; sort and filters folded in a 44 px strip; about 4 customers per screen |
| 15 | PACK a customer | dispatch nw-20 → nw-3; phone n-1 → n-5 | 2 · 1 | PACK takes every order; no way to choose one |
| 16 | Pack 3–4 customers at once | dispatch nw-3, n-5, n-6 | 1 per switch | One customer's boxes on screen at a time; chips cut at 3 |
| 17 | Scan → piece lands in a box | dispatch nw-4, n-6 | 0 per piece | The piece is a text row; no box capacity, no "box full"; phone tally counts the order, not the box |
| 18 | Invoice of the selected parcel builds on the right | dispatch nw-3, nw-5 | 0 | The pane bills P00035 while P00059 is being packed (`mod-dispatch.jsx:122`); GST, HSN, IGST, firm wrong or missing |
| 19 | Confirm invoice | dispatch nw-5 | 3 from a full box | Ship-to comes later, in the shipment sheet |
| 20 | E-invoice IRN | — | — | NOT DRAWN |
| 21 | E-way bill (Part A, Part B, valid till) | — | — | NOT DRAWN |
| 22 | Transport slip / LR, shipment, gate | dispatch nw-6, nw-7 | 3 | Vehicle and LR in one field; no packages, weight, freight, transporter ID |
| 23 | Print, WhatsApp | dispatch nw-8 | 1 each | A4 lacks IRN QR, e-way bill no, LR, place of supply; WhatsApp has no recipient choice |
| 24 | Order part sent → back on Ready as worked on | — | — | NOT DRAWN; cards count sent pieces as still owed (dispatch nw-21) |
| 25 | Held after the due days, cancel | — | — | NOT DRAWN in Sales or Dispatch |
| 26 | "Where is my order?" | Sales f-18 / w-10; Dispatch pane | 4+ · 2 + typing | The answer ("6 of 12 sent") lives only in Dispatch; Sales shows plain Approved |

Fast where drawn: adding a piece (1), editing a cart from the catalogue (1 each), PACK (1), scanning (0 per piece).
Broken at the doors: starting a cart, the approver's queue, the documents.

---

## 3 · Where the modules disagree

The seams no single module owns. Each needs one answer before drawing.

1. **Order status words.** Four sets for one order:
   Sales Raised · Approved · Dispatched · Cancelled; BRD All · Approved and pending · Dispatched;
   Dispatch Pending approval · Pending dispatch · After 1st dispatch · After due date; CRM All · Open · Dispatched · Returns.
   And the Raised tab also lists Approved and Dispatched orders (f-16, f-17, w-8).
2. **The same order, two states.** SO-3433 is "6 of 12 sent" in Dispatch, plain Approved in Sales;
   SO-3448 and SO-3451 approved in Dispatch, Raised in Sales; SO-3455 Raised in Sales, already invoiced in the CRM dossier.
3. **Due days.** 20 (BRD F:12, carts) vs "due day 25 by default" (dispatch nw-22, `SUTRA-SCREEN-FLOW.md:52`). Held depends on it.
4. **Unapproved orders in Dispatch.** Dispatch has a "Pending approval" tab and an "Approval" chip it cannot act on.
   Proposal: approval lives in Home › Approvals; Dispatch shows only approved orders.
5. **Held vs Wait.** BRD Held = past due, the customer must confirm again. The approver's "Wait till payment" is new.
   Keep two names.
6. **Credit notes.** CN-0112 in Sales, CN-260908-0003 in Dispatch. One format.
7. **Return approval.** "Approve to stock" sits in Sales › Returns for anyone; the BRD gives it to accounts (F:217). Move it to Home › Approvals.
8. **Carts outside Catalogue.** Production, Dispatch and Studio phone docks drop the basket (`noCart`);
   the old BRD says open carts carry across modules. Dispatch desk headers show a glowing basket where there are no carts.
9. **Counts.** The cart badge says 8 with 3 carts; a cart is "4", "4 pcs", "10 pcs" and "14 pcs" on four screens.
10. **Two Dispatch shells.** Band A on `DShell`, B and C on `WebShell3`. Module order also differs: phone island Dispatch → Production, rail Production → Dispatch.
11. **Photos.** Only 4 designs in the sample data have a photo; 1243, 1457, 3661 and D9107 are grey tiles,
    so most "pictures" on Ready and Packing are blank. The box board stands on photos; fix the data first.

---

## 4 · Priority lists

In the order a sale walks. [C] Catalogue · [S] Sales · [A] App shell · [D] Dispatch.

### P1 · Must change

**Design to catalogue**
1. [C] Upload centre per colour (primary, 4 side profiles, AI shoot, model shoot, videos, set primary), opened from "Media" and f-8; and one control from the product page to the salesperson view (f-6, w-5).

**In the cabin**

2. [C][A] Start a cart in one tap: the basket opens open carts and a bold "+ New cart"; "+" pinned first in the strip; a new-cart sheet: pick a customer (search or voice) or new with name, contact, city, plus the sale book (f-1, f-2, w-1).
3. [C] Colour set and all carts: the scan pop-up becomes Add piece · Add colour set + one "All carts" switch (your 6 Oct answer), with "+ new cart"; the same on the product page (f-10, f-6, w-5).
4. [C] Scan camera: focus frame, back, Scan-to-add toggle, the green scan state in the top bar (F:84); a web scan entry.
5. [C][A] Customer mode that holds: one tap on from the phone grid; exit by PIN or long-press; island, rail and side menu cut to Catalogue + Carts; parties as letters (catalogue n-2, w-1).
6. [C] Voice results: "heard: wine · lehenga · under ₹5,000" as chips over the results (f-4, w-4). Voice is required (6 Oct).
7. [A][C] Carts travel: the basket and its menu in every module's top bar for sales roles; Carts on phone gets a way back to the grid (f-12).

**Finalise and submit**

8. [C] Finalise fields on the cart: due days editable (default 20), priority 1–5 (default 3), broker / agency and transport prefilled, a note on phone too (f-12, w-7).
9. [C][S] Credit-line red block in words at the cart, before the party leaves, "sent to admin" (F:17).
10. [C] "Submit all 3" and a submitted state: SO numbers, "waiting for Accounts", chips cleared.

**Approval**

11. [S][A] Home › Approvals with a door: counts on the Home island item, the Home rail icon and the bell; a notification that opens the card.
12. [S] The sale-order approval card and queue: one order per screen, all ten BRD facts, line photos; Approve 1 tap, Decline and Wait 1 tap + reason, ⋯ Approve part · Lower qty · Send to owner; red blocker = admin only, with a reason (spec in `review-2-sales.md` §2).
13. [S][A] Who may act: never on your own order; Approve for approver roles only; Edit only while Raised; Analytics hidden below sale manager; a sale-executive variant without cost, GM, credit or godown stock.

**Sale order after approval**

14. [S] One status model and word set for Sales, Dispatch, CRM and the product page; each tab lists only its own orders (§3.1).
15. [S] The opened order for every state: per line in stock, sent, pending, invoice, parcel; the journey track; edit before approval, cancel with a reason, Held with "Customer confirmed" or "Cancel the rest".
16. [S][D] One due rule: 20 days, editable at the cart, the same in Dispatch.

**Ready**

17. [D] Ready holds every approved order until it is fully sent or cancelled; Pending folds in (its situations become sections and tags, its book becomes the right panel).
18. [D] Ready as a box board: columns Worked on · New · In packing · Held; customer boxes with photo strips of owed pieces only, tags NEW / WORKED ON ×2 / PARTLY SENT 4/9 / HELD, "last sent 02/09 · 8 d ago"; about 10 boxes at 1920 px.
19. [D] Right panel: searchable, collapsible customer → order → lines list with quick buttons (All · Worked on · New · Packable now · Due ≤ 2 d · Held); sort and filters on the board bar, not a folded strip.

**Packing and documents**

20. [D] Packing shows 3–4 customers as lanes; parcel boxes drawn as boxes with 12 photo slots and "9 / 12"; one active box; a fifth packing asks first.
21. [D] Scan → the photo drops into the next slot; box full asks "close and open the next"; scanning a box label makes it active; a box switcher on the phone.
22. [D] The right panel follows the selected parcel: firm (one of six) with GSTIN and series, bill-to, ship-to before Confirm, orders in the parcel (draw a two-order parcel), HSN, GST by price slab, IGST to another state.
23. [D] A documents checklist per parcel with one next-step button: packing slip · invoice · e-invoice IRN · e-way bill (needed? Part A, Part B, valid till) · transport slip.
24. [D] Shipment and print carry the documents: transporter from the master, LR now or later, vehicle, packages, weight, freight, e-way bill Part B and a consolidated bill per vehicle; A4 with IRN QR, e-way bill no, LR, place of supply; WhatsApp to a chosen list.

**Shell**

25. [A] One Dispatch shell (`WebShell3` for band A's screens); headers that fit (orb pinned, page actions out of the header, "More ▾" past six sub-menus); sign in and firm selector; role shells (packer: Home + Dispatch; customer; sale executive).
26. [S] Two clipped finals: w-10's header pushes search and the orb off; w-8's Approve sits below the fold.

### P2 · Good to change (the ones that cross modules; full lists in the module files)

1. Fix the sample data before redrawing: a photo for every design; boxes of 9–12 pcs; totals that add up (f-18 lines add to ₹25,975, the total says ₹24,975; f-19 pipeline 49 vs tile 46). [all]
2. Retire Dispatch band C and dispatch nw-1, nw-2 once the box board is drawn. [D]
3. A pick list for the stock boy: photos, qty to bring, ticked as pieces scan (phone and print). [D]
4. Phone opens on Packing for the packer, on Ready for the manager. [D][A]
5. PACK lets the manager untick an order; Cancel order from Ready, manager only, with a reason. [D]
6. "Purchase history" opens the CRM dossier's Orders tab; "Order again" on a dispatched order. [S]
7. Sale orders on phone: cards only; table and group-by on web. [S]
8. Label cart counts one way ("4 designs · 10 pcs"); the badge counts carts, no glow with none open. [C][A]
9. The grid "+" names its colour. [C]
10. Bell with a count and a notifications feed; LIVE in one place, OFFLINE drawn with what still works. [A][D]
11. One module order on island, rail and side menu; side-menu names match the headers. [A]
12. Returns in Sales read-only; return approval moves to Home › Approvals; one credit-note format. [S][D]

### P3 · Keep as is

1. Picture grid with the design number as head, price and colour bars (f-1, w-1).
2. Cart chip: tap = active, double tap = cart card; ± per colour from the catalogue (f-1, f-13).
3. Web cart pane always open beside grid and product (w-1, w-5).
4. Carts grouped by design with colour lines and totals; sale book on the cart (f-12, w-7).
5. Voice orb in the island and the header; agent orb on every module.
6. One filters & sort button, save as list (f-5).
7. Sale order cards on phone; order lines with a photo beside every design (f-15, f-18).
8. Web full table with the grouped column chooser and money locks (sales nw-1, nw-2).
9. Dispatch: scan rejected in words with the serial; remove behind "becomes scannable elsewhere"; "Scan here" hand-over between desk and phone; invoice review with "nothing reaches accounts before Confirm"; select for shipment; gate token on every document; no ₹ on the packer's phone.
10. Dispatch: Billed, Out of stock, Stock, FG inward and the Sale return wizard as drawn.
11. Header v2 on `WebShell3`, the rail and sidebar, the tab strip, the right pane, the search pane.
12. Production's new sample with photos first, and Make product carrying number, colours and tags.

---

## 5 · The documents, per parcel

One invoice per parcel (old BRD line 87), so one IRN per parcel, and an e-way bill per parcel invoice over ₹50,000.
One LR and one shipment per consignee per trip.

| Document | On the board | Missing |
|---|---|---|
| Pick list (what the stock boy brings) | desk only, dispatch nw-3 left pane | the stock boy's phone view and print |
| Packing slip / box label | lines on dispatch nw-3, n-8; "Label" on band C only | the printed slip and label with a barcode |
| Invoice | dispatch nw-3, nw-5, nw-6, nw-8, n-9 | firm, HSN, GST by slab, IGST, two-order parcel, ship-to before Confirm |
| E-invoice IRN | nothing | turnover flag per firm, IRN + Ack + QR on the A4, retry, cancel within 24 h |
| E-way bill | nothing | needed check, Part A, Part B, number, valid till, extend, cancel, consolidated bill |
| Transport slip / LR | dispatch nw-7, nw-8 | LR no and date (or later), vehicle on its own, packages, weight, freight, destination, transporter ID |
| Shipment, gate, print, WhatsApp | dispatch nw-6…nw-8, n-14, nw-10 | Part B and LR tied to the trip, the guard's check, recipients |

Rules the screens must follow (from the Dispatch review; **confirm each with your CA**):
- Garments: 5 % GST up to ₹2,500 a piece, 18 % above (since 22 Sep 2025). One parcel can carry both rates.
  Sarees may be taxed as fabric at 5 % at any price.
- E-way bill when a consignment to another state is over ₹50,000 with tax; in-state limits differ by state.
  A full parcel of 10–12 pieces at ₹4,995 is ₹58,900–70,700 with tax: **most full parcels to another state need one.**
- Valid one day per 200 km; Part B (vehicle) can wait when parcels go to a transporter's office within 50 km in the same state.
- E-invoice for a firm whose turnover crossed ₹5 crore in any year since 2017-18, for registered buyers only; 6-digit HSN then.
- Blocked today by data: HSN and GST per design (an open BRD item), the customer's PIN and state code,
  the transporter's ID, each firm's turnover flag.

---

## 6 · What to draw, in order

1. Dispatch · Ready box board, web: Worked on · New · In packing · Held, right panel with quick buttons. Then phone.
2. Dispatch · Packing lanes, web: 3–4 customers, parcel boxes with photo slots, the parcel panel with the documents checklist. Then the scan states, then phone (my packing, to bring, scan with the slot box).
3. Dispatch · Shipment v2 and the print set (A4 with IRN QR and e-way bill no, the e-way bill page, LR copy).
4. Home › Approvals · sale-order card and queue (red blocker, decline, wait, approve part, empty queue); phone + web.
   Home is not on the board; draw it as a draft band on the Sales page until Home is planned.
5. Catalogue · cart menu from the basket and the new-cart sheet; finalise fields, credit block, Submit all, submitted state.
6. Sales · opened order for approved and part sent, Held, cancelled; status tabs with the agreed words.
7. Catalogue · scan camera and pop-up v2; product page add with colour set and all carts.
8. App shell · Customer mode locked, role shells (packer, customer, sale executive), sign in and firm selector.
9. Catalogue · upload centre; voice results.
10. App shell · Home dashboard, notifications feed, user menu, phone search.

Before any of it: the sample-data fixes (P2 1), so the new boxes have photos and numbers that add up.

---

## 7 · Decisions for you

Answer by number. Each one changes what gets drawn. The module files carry the rest (6 each).

1. **Ready** shows every approved order until it is fully sent or cancelled, even with nothing in stock,
   and the Pending sub-menu becomes Ready's right panel. Agree?
2. **Corners**: 8 px on Dispatch boxes, 6 px on photos and buttons (the design schema's cards are 22 px). Agree, for Dispatch only or everywhere?
3. **Packing**: one customer packed at a time while 2–3 wait, or pieces for several customers mixed? Is 4 the cap, and is a box always 12 pieces?
4. **Who approves a sale order**: Accounts by default, the sale manager for clean orders, admin only over the credit line, never the person who raised it?
   May the approver approve part, or lower a qty? (Proposal: yes and yes; never change the rate.)
5. **Due days**: 20 (BRD) or 25 (the Dispatch drafts)? And is the approver's "Wait till payment" wanted, kept apart from Held?
6. **Status words**, everywhere: All · To approve · Approved and pending · Dispatched · Cancelled, with Part sent, Held, Waiting, Declined as tags?
7. **IRN and e-way bills**: made in Sutra (through a GST service provider) or in Busy after the push? Which of the six firms are over ₹5 crore?
8. **HSN and GST per design**: who fills them in, and does the rate follow the piece price (5 % / 18 %)?
9. **LR / bilty**: given at pick-up or later? Do you weigh boxes? Freight paid or to pay?
10. **Customer mode**: exit by PIN or long-press; parties shown as letters only (A · B · C) while it is on?
11. **Sale executive**: sees the bill of their own orders, but not the customer's credit line, overdue or payment score?
12. **Pictures**: who uploads a product's photos: production, a studio person, or the salesperson from the product page?
