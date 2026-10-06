# Dispatch — flows and simplification (6 Oct 2026)

Sources: D = `brd-dispatch.txt`, S = `dispatch-screens.txt`, DP = `plans/dispatch.md`, R = `plans/review-1-catalogue-appshell-dispatch.md`, J = `mod-dispatch-web.jsx` (registration J:345–353). Uncited = proposal.

## 1. The two roles

**Dispatch manager** (desk, 24″, sees money — D:4, D:69). Morning: sees what is ready, what is short, who has waited longest; presses PACK ▸ for the day's customers (D:16); at CLOSE PARCEL fixes qty and rate, picks bill-to, confirms the invoice (D:39); groups boxes into a shipment, prints A4 and transport document (D:42, D:48); answers "where is my order"; books returns to a credit note (D:62). Does most: PACK ▸, confirm invoice, close shipment, print, answer the phone. Must never: scan while a phone holds the scanner (D:33), approve returns (accounts, D:72).

**Dispatch worker / packer** (phone, Bluetooth scanner, no money — D:69, D:72; semi-skilled, pictures and voice over text — R:121, R:127). Day: sees which box is open, scans until the tally matches, closes the box, next box; counts finished goods in from the last job (DP:361); tells the desk when a piece is missing. Does most: scan, close box, FG inward, "is it in stock?". Must never: see ₹, choose bill-to, invoice, ship, filter a 200-customer book (S:28), touch Material / WIP (R:95).

## 2. Open the app

- **Worker phone → Packing · picker** (NEW default; BRD says Pending, D:4). Pending is a read-only book with no action (D:25); a packer's only action is a box. Taps: scan a piece 2 (customer → box); close box 1; FG inward 2 (tab › job); in stock? 1 (voice/scan on Stock).
- **Manager web → Ready board** with the Pending pane docked (D:19). Clicks: PACK ▸ 1; invoice review 0 (arrives in the right pane on CLOSE PARCEL, D:39); close shipment 2; print 1; return wizard 1; "where is my order" 1 (search island).

## 3. Whole flows (captions from J:346–352; NEW = not drawn)

**(a) Worker packs an order**
1. Open → "Packing · picker (customer → box)": customer rows, progress bar, packed/ordered; the open box pre-selected when the desk pressed PACK ▸ (D:16).
2. Tap the box → "Packing · scan, tally, accepted": giant tally, green flash, last line photo (D:36).
3. Scanner fires piece by piece; no tap.
4. Bad scan → "Packing · scan rejected": reason in words, serial, "Scan again" (D:33).
5. No barcode → NEW "Packing · add by picture": photo grid of the order's lines, tap one = PACK › (D:30).
6. Tally full or "Review" → "Packing · review box, remove confirm".
7. CLOSE PARCEL → NEW state "Waiting for desk", then "Packing · box invoiced" once the desk confirms. Back to 1.

**(b) Worker finds an order's pieces**
1. Picker row "n short" → NEW "Packing · what is short": the order's lines as photos, each a tick or a red "0" with "at last step: n" (D:22). No typing; voice "2006 lavender" searches.
2. Tap a short line → "Stock · finished goods" row for that SKU (photo, FG stock, in production, pill, D:57).

**(c) Worker receives finished goods (FG inward)**
1. Receive tab → "Stock · FG inward, verify" (DP:361): today's last-step jobs as cards (job, karigar, expected pcs).
2. Tap job → NEW "FG inward · count": colour chips with steppers, or scan each piece.
3. "Verify" → NEW "FG inward · gate token": token chip, received vs expected, mismatch in red (D:71).

**(d) Manager morning**
1. "Ready · queue rail, cards, pending pane": cards due-days oldest first (D:9), red due pills, "n/m in stock".
2. Pending pane: who is waiting, how long, red "n short" (D:22).
3. "Out of stock · counts, cards, who-is-waiting pane": nothing-in-production in red → Production (D:52).
4. PACK ▸ → "Packing · terminal, live invoice", parcel pre-opened (D:16).

**(e) Manager invoices, closes, prints**
1. "Packing · terminal, live invoice": box turns PACKED when the phone closes it (D:36).
2. Right pane → "Packing · invoice review (bill-to, GST)": qty/rate, bill-to, Confirm (D:39–40).
3. "Packing · invoice done, select for shipment": invoice no, Print A4 (D:41).
4. Tick boxes → "Packing · close shipment sheet": consignee, pre-ticked parcels, Issue (D:42).
5. "Print · A4 invoice and transport document"; row appears in "Billed · shipments history".

**(f) Manager sale return**
1. "Return · 1 customer at the counter": customer, parcels accepted, bills ticked (D:63; J:304).
2. "Return · 2 pieces, desk scanner": scan or search + colour chip (D:64; J:314).
3. "Return · 3 preview, blockers, notes pane": blockers in words with fix buttons (D:65; J:323).
4. "Return · 4 credit notes raised, recent notes": print / WhatsApp, "Stock on approval" (D:67; J:332).

**(g) "Where is my order" on the phone**
1. Type or say the customer name in the search island.
2. NEW "Customer · order trail" sheet: one line per order, stepper Approved → Packing → Invoiced → Shipped → Delivered, shipment no, transporter call chip, "n short, at last step m". Replaces Pending → Packing → Billed › shipments.

## 4. See at once vs on a tap

**Worker (phone)**

| Screen | At a glance (≤5) | On a tap | Removed / hidden |
|---|---|---|---|
| Packing · picker | customer, open box code, progress bar, packed/ordered, "n short" | box list, + New box | OOS/PLS codes, invoiced-parcel counts (D:27) |
| Packing · scan | tally, last piece photo, design · colour, box code, LIVE chip | review, torch, add by picture | order book, long warning text |
| Packing · scan rejected | reason in words, serial, Scan again | call desk | everything else |
| Packing · review box | lines as photos with n/m, CLOSE PARCEL | stepper / remove (confirm) | typed + Add line |
| What is short (NEW) | line photo, tick or red 0, "at last step n" | the SKU stock row | ₹, karigar, due dates |
| Stock · finished goods | photo, design, colour, FG count, pill | in production | Material, WIP (R:95), stat tiles, sorts |
| FG inward | job card, expected pcs, Verify | colour steppers, gate token | karigar score |

**Manager (web)**

| Screen | At a glance (≤5) | On a click | Removed / hidden |
|---|---|---|---|
| Ready board | customer, due pill, n/m in stock, line photos, PACK ▸ | call chips, note, filters rail | 8 visible sorts (D:17) → one default + menu |
| Pending pane | customer, n orders · pcs, due pill, "n short" | ₹ per line, order detail | sort/filter in the pane (S:28) |
| Packing terminal | customer chips, boxes with status pill, live ₹ total | order book, Scan here, select for shipment | box sorts (D:35) → one "awaiting" filter |
| Invoice review | amber banner, qty/rate grid, bill-to, Confirm | GST block, HSN | — (the money screen) |
| Invoice done / shipment | invoice no, Print, ticked boxes, floating bar | consignee sheet, note | — |
| Out of stock | 4 counts, design photo, red Nil cells, who-is-waiting | karigar pills, restock score, sorts | restock formula (D:51) → tooltip |
| Billed | customer, invoice no, pcs, ₹, delivered-in-days | invoice view, Return ▸, Re-print, shipments | date filters, default today (D:46) |
| Sale return 1–4 | step rail, the current step's one job | counter pane, recent notes | — |

## 5. Simplification calls

1. **Worker phone opens on Packing, not Pending** — Pending has no action (D:25); the packer's work is a box. Changes D:4.
2. **Hide Stock › Material and WIP from the worker** — Production owns them (R:95); manager keeps them read-only.
3. **Merge Ready and Pending into one worker list, "To pack"** — the worker never chooses; the desk's PACK ▸ decides (D:16). They become the picker's customer rows with "n short".
4. **Worker gets 3 tabs: To pack · Stock · Receive (FG inward)** — Billed, Out of stock and Sale return are the desk's; the packer variants of Billed and Return (J:349, J:352) drop. Manager keeps 7 (DP:35–41).
5. **"Add by picture" replaces + Add line** on the phone — few typed fields (R:127).
6. **Ready board: one default sort, filters behind the rail toggle** — 8 sorts and 6 filters (D:17) are noise for a 20-customer morning.
7. **Packing board: drop sort, keep one filter "awaiting invoice / awaiting shipment"** (D:35).
8. **Retire the older Ready and Pending frames** (R:84, R:113).
9. **Order trail sheet (new)** — one screen for the phone call instead of three.
10. **Voice on every worker screen** — "2006 lavender" jumps to the SKU (R:121).

## 6. Decisions for the owner

1. Worker phone default: Packing picker (proposed) or Pending (BRD)?
2. Worker tabs cut to three; packer variants of Billed and Return dropped?
3. Material / WIP: managers only, read-only (R:140)?
4. "Add by picture" allowed, or scan-only?
5. Order-trail sheet: Dispatch, or Hub › customer dossier?
6. FG inward: worker verifies alone, or the desk (DP:405)?

## 7. Next session — draw order (mod-dispatch-s.jsx / mod-dispatch-s-web.jsx, phone + web, one caption each)

1. Worker: picker (new default, 3 tabs) → scan → rejected → add by picture → review → waiting for desk / invoiced.
2. Worker: What is short → Stock · FG row.
3. Worker: FG inward cards → count → gate token.
4. Manager: Ready board (one sort, rail collapsed) + Pending pane → Out of stock.
5. Manager: terminal → invoice review → done → close shipment → print.
6. Manager: order trail sheet.
7. Return 1–4 only if time remains (complete, J:303–340).
