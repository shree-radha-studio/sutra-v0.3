# Review 2 · Sales (10 Oct 2026)

Re-checked at extra-high effort, 10 Oct 2026.

Sale orders, sale history, returns, analytics and sale-order approval.
Walked as a salesperson, sale manager, accounts and admin would, on phone and web.
Every final and draft frame was opened at full size (board-check), light and dark on contact sheets.
Review only: nothing on the board was changed.

Frames: finals f-15 to f-21 (phone), w-8 to w-13 (web).
Drafts on `board.html?m=sales`: nw-1, nw-2 (table), n-1, n-2, nw-3, nw-4 (returns).
Inside the mock-ups these still read Catalogue › Sale orders (intended).
F = `design-system/research/brd-final.txt`, B = `design-system/uploads/Business Req.txt` (older BRD).
Phone taps count from Home; web clicks from any Catalogue screen.

---

## 1. Flows walked

### A · A sale order after submit (salesperson, sale manager)

| # | Step | Phone | Web |
|---|---|---|---|
| 1 | Submit the cart | f-12 "Submit for approval" · 1 (`final.jsx:330`). "due 20 d" is read-only | w-7 · 1 (`web.jsx:239`). Has a "Note for approval" box; the phone cart has none |
| 2 | Told it was sent, and to whom | NOT DRAWN | NOT DRAWN |
| 3 | Open Sale orders | island Catalogue › sub-menu › Sale orders · 3 (menu on f-14) | header "Sale orders" · 1 |
| 4 | Find the order | Raised is the default tab, newest first · 0. Search chip · 1 + typing (f-15) | Same (w-8) |
| 5 | See its status | Pill on the card · 0 | Pill · 0 |
| 6 | Open it | Card · 1 (f-18) | Card · 1 opens the preview pane (w-8). The pane has no "Open" control for the full order (w-10): NOT DRAWN |
| 7 | Edit before approval | "Edit" · 1, then NOT DRAWN (`final.jsx:462`) | "Edit" · 1, then NOT DRAWN (`web.jsx:279`) |
| 8 | Cancel | NOT DRAWN: no Cancel anywhere. The Cancelled tab has a count (1), its list is NOT DRAWN | Same |
| 9 | Raised → Approved | Approve · 1 (f-18); what follows is NOT DRAWN. The Approved tab's own list is NOT DRAWN | w-10 header · 1; w-8 pane Approve is below the fold · scroll + 1 |
| 10 | Part dispatched: per line, what went, what is pending | NOT DRAWN. f-18 lines show qty × rate only | NOT DRAWN. nw-1 has "In stock 3 / 5" and "Prod status", not sent or pending pcs |
| 11 | Which invoice and parcel a line went in | NOT DRAWN | Per order only: "Invoices" (nw-1), "Parcels" in the chooser (nw-2, `mod-appshell.jsx:186`) |
| 12 | Fully dispatched | Dispatched tab · 1; its list and the opened order NOT DRAWN | Same |
| 13 | Held: due days passed, the customer must confirm again (F:12) | NOT DRAWN. No Held word in Sales; Dispatch calls it "After due date" (`mod-topbar2.jsx:45`) | Same |
| 14 | Customer confirms again (re-raise) | NOT DRAWN | NOT DRAWN |

The answer to "where is my order?" lives only in Dispatch:
"6 of 12 pcs dispatched on 02/09/26" for SO-3433 (`mod-topbar2.jsx:83`), which Sales shows as plain Approved.

### B · Approving incoming orders (sale manager, accounts, admin)

| # | Step | Phone | Web |
|---|---|---|---|
| 1 | Learn there is something to approve | NOT DRAWN: no bell on the phone finals, no badge | Bell in the header; its feed NOT DRAWN |
| 2 | Open the queue | Home › Approvals is listed in the side menu (f-14, `screens2.jsx:9`), NOT DRAWN. In practice: Sale orders › Raised · 3 (f-15) | Raised tab · 1 (w-8), which also shows Approved and Dispatched cards |
| 3 | Triage | Cards show no raiser, no waiting time, no flags (f-15) | Same (w-8) |
| 4 | See the facts (F:47–56 lists 10) | 4 of 10 on f-18: customer score, payment score, order ₹, order pcs | 5 of 10 on w-10: the same plus the customer sale vs payments graph |
| 5 | Facts missing | GR ratio, FY billing, overdue ₹ ("2 bills open" is not an amount), pcs in stock, tier appetite, broker agency graph, customer graph | Same, minus the customer graph |
| 6 | Approve | 1 (f-18) | 1 (w-10), or scroll + 1 (w-8) |
| 7 | Decline with a reason | NOT DRAWN | NOT DRAWN |
| 8 | Hold / wait for payment | NOT DRAWN | NOT DRAWN |
| 9 | Approve part, lower qty | NOT DRAWN ("Edit" leads nowhere) | NOT DRAWN |
| 10 | Send "for owner" (F:29) or "for inspection" (F:46) | NOT DRAWN | NOT DRAWN |
| 11 | Over the credit line: red blocker (F:17) | NOT DRAWN | NOT DRAWN |
| 12 | Next order | back + card + Approve · 3 | next card + scroll + Approve · 2 |

Approving one order today: phone 5 taps from Home, then 3 per order. Web 3 clicks and a scroll, then 2 and a scroll.
With the spec in section 2: phone 2 taps from a notification, then 1 per order. Web 1 click (or the A key) per order.

Who can press Approve today: everyone, on every frame.
w-10 is logged in as RM, Rohan Mehta, sale manager (f-14), and reads "raised by Rohan Mehta · awaiting approval"
beside his own Approve button (`web.jsx:279,281`).

### C · Sale history, returns, analytics

| # | Step | Phone | Web |
|---|---|---|---|
| 1 | Find a past order for a customer | 3 to reach Sale orders + guess the tab (no All) 1 + clear "This month" 1 + search 1 + typing + card 1 = 7 + typing | 5 + typing (w-8). Or the header search pane: 2 + typing (App shell draft, `mod-appshell.jsx:147`). Phone search NOT DRAWN (review 1, gap 4) |
| 2 | All of that customer's orders | "Purchase history" · 1, then NOT DRAWN (f-18) | Pane "Recent orders", 3 rows (w-10), one of them another customer's; "Purchase history" NOT DRAWN. The CRM dossier has a full Orders tab (`mod-crm-web.jsx:63`) |
| 3 | Order again | NOT DRAWN anywhere on the board | NOT DRAWN |
| 4 | Returns and credit notes | Not on the phone finals (f-15 has four tabs). Drafts: scroll the tab row + Returns · 2 (n-1, n-2) | Returns tab · 1 (count on w-8; list on drafts nw-3, nw-4). Print the credit note · 1 |
| 5 | Analytics | "Analytics" · 1 (f-19); Designs, Customers · 1 each (f-20, f-21) | Analytics tab · 1 (w-11); · 1 each (w-12, w-13); "Orders list" goes back |
| 6 | Analytics for managers only (owner, 6 Oct) | NOT DRAWN: shown on every frame | NOT DRAWN |
| 7 | From analytics to a customer or a design | Rows are not links | Same |

### D · Tabs, phone tables, roles

Status tabs against the BRD. The Word file confirms F:76–79 is the Sale orders sub-menu (same level as Carts).

| Where | Words for the same order |
|---|---|
| BRD, Sale orders (F:76–79) | All · Approved and pending · Dispatched |
| BRD, Hub report (F:245) | All · Approved and pending · Invoiced |
| Sales phone (f-15, `final.jsx:358`) | Raised · Approved · Dispatched · Cancelled + Analytics button |
| Sales web (w-8, `web.jsx:123`) | Raised · Approved · Dispatched · Cancelled · Returns │ Analytics |
| Product page (f-9, `final.jsx:277`) | All · Approved & pending · Dispatched |
| Dispatch › Pending (`mod-topbar2.jsx:45`) | Pending approval · Pending dispatch · After 1st dispatch · After due date |
| CRM dossier orders (`mod-crm.jsx:188`) | All · Open · Dispatched · Returns |

Verdict: four word sets for one order. No All tab. No home for part-sent, Held or declined orders.
"Raised" is not a BRD word but is clear; it equals Dispatch's "Pending approval".

Phone tables at 390 px: f-16 shows 3½ columns and no Status column (`final.jsx:359`); the filter card covers the rows.
f-17's group-by island takes about 110 px. Cards (f-15) read better; review 1 Q4 is still open.

Roles today: Approve, Edit, Analytics, credit and payment facts, and "Approve to stock" (nw-3) show to every role.
The BRD and the owner say: sale manager all of Sales (F:31); sale executive views and makes or edits orders (F:32);
dispatch manager views and edits sale orders (F:34); production manager views only (F:36);
accounts approve (F:12); over the credit line, admin (F:17); analytics for sale managers and above (owner, 6 Oct);
outstanding and credit for manager, accounts, admin only (`design/during-ui-business-requirements.md:67`).

---

## 2. Is there an approval screen?

**No.** The only sale-order approval is an Approve button on the opened order.

- Approve on f-18's dock (`final.jsx:462`), in w-8's pane (`web.jsx:256`, cut off below the fold) and in w-10's header (`web.jsx:279`).
  Unregistered copies sit in WebSO2 / WebSO3 panes (`mod-appshell.jsx:64`).
- Home › Approvals is only a name: the side menu (f-14, `screens2.jsx:9`) and the screen flow (`design/SUTRA-SCREEN-FLOW.md:22`).
  There is no Home module on the board (`modules.js`).
- Dispatch says "approval happens upstream" (`mod-dispatch-web.jsx:66`) and has a "Pending approval" tab it cannot act on.
- Analytics measures "To approve · 2.1 d" (f-19, `final.jsx:477`; w-11) for a step no screen performs.
- Other modules approve in place: Production costing "Approve ₹3,495 · sync" (`mod-production-web3.jsx:160`),
  purchase inward "what the approver sees" (`mod-production-web.jsx:98`), sale returns "Approve to stock" (nw-3, `mod-appshell.jsx:249`).
- Studio has a swipe approval card (`mod-studio.jsx:230`). The old BRD asks for "a tinder type view (without the swipe)",
  one transaction per page, approve or decline (B:63). So: one card per screen, buttons, no swipe.

### Approval screen spec · sale orders (phone + web)

Sources: F:12, F:17, F:29, F:46–56; B:63, B:157. Nothing below is drawn yet.

**Rules it keeps**
- One order per screen, every fact on it, buttons not swipes.
- One tap per decision. Approve is one tap; Decline and Wait are one tap plus a reason chip.
- All ten BRD facts on one card (F:47–56). Money is fine here: every approver is a money role.
- A blocker is said in words, never only a greyed button (the BRD's own rule for Sale return, F:215).

**Who sees it** (proposal, question 1)
- Assigned to Accounts (sub-admin), as F:12 says. The sale manager may approve clean orders (F:46, B:157).
- Everyone above the assignee sees the same card (F:46), with a line "Assigned to Accounts · you can act as Admin".
- Nobody approves an order they raised. Their own orders read "Raised by you · waits for Accounts".
- Over the credit line, only admin approves (F:17).
- Sale executive, dispatch and production roles do not get sale-order approvals.

**Entry points**
Phone:
1. A count badge on Home in the island; Home › Approvals (already in the side menu, f-14).
2. Push and the notifications feed: "SO-3455 · Preeti Fashion Hub · ₹24,975 · raised by Rohan · to approve". Opens that card.
3. From Sale orders: the opened order's Approve becomes "Review", which opens the same card. No blind approving.

Web:
1. Rail Home, then the header sub-menu "Approvals 9" (Dashboard · Notifications · Approvals · Gate pass hub).
2. A bell row with the same text; it opens the card in a tab ("Approvals · SO-3455").
3. From Sale orders, as on phone.

**Queue order**
1. Sent to me ("for owner" or "for inspection"), then red blockers (admin only).
2. Then oldest first, so nothing waits past its due day.
Filter chips: All · Flagged · Over credit line · Sent up · Waiting.
Count line: "7 to approve · oldest 2 d".
Phone opens straight on the first card, "1 of 7". Tapping the counter opens the queue as a list sheet.

**One card** (phone, top to bottom; the dock stays fixed)
1. Head: SO-3455 · Preeti Fashion Hub · "1 of 7" with ‹ ›.
   Under it: raised by Rohan Mehta · in-cabin · 10/09/26 · waiting 6 h · due 30/09 (20 d).
2. Flag band, only when something is off. Amber: "Overdue ₹12,000 · 1 bill". Amber: "Suman Agency overdue ₹57,935"
   (when the broker's agency owes). Red: the credit-line blocker, below.
3. Order lines, picture first: photo beside every design number, colours × qty, a stock tick per colour, line ₹.
   Reuse `OrderLines` (`final.jsx:446`) with the tick from Dispatch's `OrderPane` (`mod-topbar2.jsx:85`).
   Total: "5 pcs · 3 in stock · 2 in production · ₹24,975".
4. The salesperson's note from the cart, verbatim ("2018 ke red ka stock check karna hai", w-7).
5. Customer: city · market · tier · broker · agency, with Call customer and Call broker chips.
6. Scores: Customer 92 · Payment 82 · GR 4 % as three gauges, FY billing ₹18.7L beside them (the CRM row, `mod-crm.jsx:136`).
7. Money: overdue ₹12,000 · credit line "₹0.9L of ₹1.2L · ₹1.15L after this order" (`CreditBar`, `mod-crm.jsx:56`).
8. Tier appetite: High 55 · Mid 35 · Low 10 (`Taste`, `mod-crm.jsx:53`), with "this order: mid".
9. Two small graphs, tap to enlarge: customer orders vs payments; broker agency orders vs payments (`LineG`).
Above the fold at 390 px: 1 to 3 and the dock. 4 to 9 scroll.
The ten BRD facts: payment score, customer score, GR ratio, FY billing (6) · order ₹, pcs and pcs in stock (3) ·
overdue (7) · tier appetite (8) · both graphs (9).

**Actions** (dock: Decline · Wait · ⋯ · Approve)
- Approve, the maroon button: 1 tap, no confirm. A toast "Approved · to Dispatch Ready · Undo" for 5 s; the next card slides in.
- Decline: a sheet of reason chips: Overdue · Over credit line · Customer cancelled · Cannot make · Duplicate · Other, plus a note.
  Tapping a chip declines. 2 taps.
- Wait: a sheet: Till payment · Till a date · Till the customer calls. 2 taps.
  Not in the BRD; named Wait so it is not mixed up with the BRD's Held (question 3).
- ⋯ More: Approve part (untick lines or colours; the button reads "Approve 3 of 5 pcs") · Lower qty ·
  Send to owner, with a note (covers "for-owner", F:29, and "for inspection", F:46) · Open order · Open dossier.
- The rate never changes here (question 2).

**Credit-line red blocker** (F:17)
When open bills plus this order pass the customer's credit line:
- The card head turns red: a danger band, "Over credit line by ₹38,000 · blocked · admin decides". The credit bar's overshoot is red.
  Red is the danger token (`T.danger`), not the maroon accent, so the one-maroon-line rule holds.
- It lands in admin's queue at once, at the top, without anyone sending it.
- Below admin there is no Approve. The dock says "Only admin approves over the credit line"; Decline, Wait and a note stay.
- Admin sees "Approve over line", which asks for a one-line reason (2 taps and a few words),
  and "Approve part", with the lines that fit under the line already ticked.
- The salesperson saw the same warning at the cart (hand-off to Catalogue, review 1 gap 3).

**What happens next**
- Approved: leaves the queue; the raiser gets a bell row "SO-3455 approved by Accounts · SK".
  It shows in Dispatch › Ready when anything is in stock, and in Dispatch › Pending › Pending dispatch.
  In Sales it moves to Approved and pending.
- Declined: listed under Cancelled with the reason and who. The raiser is told.
  "Edit and resubmit" on the opened order sends it back to the queue under the same number.
- Wait: stays Raised with a "Waiting · till payment" pill, under the Waiting chip.
  It comes back by itself when CRM logs a payment (`mod-crm-more.jsx:146`) or on the date.
- Sent to owner: moves to admin with "sent by Accounts · note". The sender sees it under Sent up, read-only.
- Approve part: the ticked lines go on; the rest is declined as "Not approved" (question 2).

**Web** (`WebShell3`; Home › Approvals; sub-sub tabs from the screen flow:
Sale orders 7 · Sale returns 2 · Purchase inwards · Production overages · Costing)
- Main: the same card in two columns. Left: the lines with photos, totals and the note.
  Right: flags, scores, money, appetite and the two graphs.
- An action bar fixed at the foot of main: Decline · Wait · Send to owner · Approve part · Approve.
  Keys A, D, W; J and K for next and previous.
- Right pane (340): the queue. Filter chips, then rows with the first line's photo, order no, customer, ₹, flag icons and waiting time;
  the current row ringed.
- One click or one key per order; the next order loads in place.

**Frames to draw** (phone + web, light + dark)
1 first card with a flag · 2 red blocker, accounts view · 3 red blocker, admin view with the reason ·
4 decline sheet · 5 wait sheet · 6 approve part · 7 send to owner · 8 approved toast with the next card ·
9 queue list (phone sheet, web pane) · 10 empty queue, "Nothing to approve · last approved 10:42".
The board has no Home page yet; the lead decides where these frames live
(suggestion: a draft band on the Sales page until Home is planned).

---

## 3. Friction found

| Where | Problem | Why it matters |
|---|---|---|
| f-16, f-17, w-8, w-9, nw-1 | The Raised tab (count 3) also lists Approved and Dispatched orders; f-16 and nw-1 add the Cancelled one (`final.jsx:415,434`, `web.jsx:258`) | The tab lies; a manager counts the wrong orders |
| f-16, f-17 | Phone tables have no Status column (`final.jsx:359`) | With the wrong rows in, nothing tells them apart |
| f-15, w-8 | Raised cards show no raiser, no waiting time, no flags | The approver cannot triage |
| f-18, w-10 | Approve is a blind tap: 4 of 10 BRD facts on phone, 5 on web | Credit risk approved without the facts the BRD lists |
| w-10 | RM, the logged-in sale manager, sees Approve on his own order (`web.jsx:279,281`) | Self-approval; no control |
| f-18, w-8, w-10 | Approve and Edit show for every role and every state | Production manager is view-only on sale orders (F:36) |
| f-18, w-10 | "Edit" and "Purchase history" lead nowhere; no Cancel, Decline, Hold or re-confirm anywhere | Daily actions with no screen |
| f-18, w-10 | Opened order drawn only for a Raised order; lines show no stock, sent, pending, invoice or parcel | "Where is my order?" is answered in Dispatch, not here |
| Sales vs Dispatch | SO-3448 and SO-3451 are approved in Dispatch but Raised in Sales; SO-3433 is 6 of 12 sent in Dispatch, plain Approved in Sales (`mod-topbar2.jsx:48`) | Two answers to one question |
| f-15, w-8 | Four word sets for one order (table in 1D); no All, no Held, no part sent | Finding an old order means guessing its status |
| w-10, f-12 vs Dispatch | "due 20 d" (F:12, carts) vs "due day 25 by default" (`mod-topbar2.jsx:137`, screen flow :52); nw-1's Due column says 24/09/26 for every order, cancelled too (`mod-appshell.jsx:168`) | Held depends on the due day |
| f-12, w-7 | Due days are read-only on the cart (F:12: set at noting). The "Note for approval" is web-only and never reaches the order | The approver misses what the salesperson knew |
| f-15, w-8 | "This month" is on by default; w-8 under it shows August orders | A search for an older order finds nothing until cleared |
| f-16, f-17 at 390 px | 3½ columns; the filter card covers the rows; the island takes ~110 px | Hard to read on a phone (review 1 Q4) |
| w-10 | Print, Share, Edit, Approve in the header push the search field half out and the orb off the frame | A signed-off final is clipped |
| w-8 | The pane is cut at the order total; its Approve is below the fold | The web approval path is hidden |
| f-19 to f-21, w-11 to w-13 | Analytics on every frame for every role | Owner, 6 Oct: sale managers and above only |
| f-15, f-18, w-10 | Credit limit, payment score, bills open and the payments graph show to every role | Money rule: outstanding and credit for manager, accounts, admin |
| w-8 to w-13 | Customer mode switch sits on Sale orders and Analytics; switched on, nothing changes | F:80 + F:33: Customer mode drops to customer rights, which have no sale orders |
| nw-3 | "Approve to stock" inside Sales › Returns, for anyone | Return approval is accounts' (F:46, F:217, F:222) |
| f-15 vs n-1, w-8 | Phone finals have no Returns tab; phone drafts and web do | One module, two tab rows |
| nw-3 vs Dispatch | CN-0112 here, CN-260908-0003 in Dispatch (`mod-dispatch-web.jsx:324`) | Two formats for one document |
| w-8 vs nw-1 | Finals put Analytics as a tab after a hairline (`web.jsx:250`); drafts as an outlined button (`mod-appshell.jsx:54`) | Two answers for developers |
| f-19 | A line chart, the pipeline and weekday bars stacked; KPI subtitles cut ("+18% vs pr…"; "ordered twi…" on f-21) | Review 1 proposed one chart per screen on phone |
| f-20, f-21, w-12, w-13 | Customer and design rows are not links | Dead end; the dossier and product page exist |
| Sample numbers | See the list below | Developers copy the sample data |
| Code | WebSO2, WebAnalytics2 (`mod-appshell.jsx:66,86`), WebSO3, WebAnalytics3 (`mod-topbar2.jsx:17,27`) defined, never registered | Near copies of w-8 and w-11 |

Numbers that do not add up:
- f-18, w-8, w-10: the lines add to ₹25,975 (14,985 + 4,995 + 5,995); the total says ₹24,975 (`final.jsx:452` prints the stored bill).
- f-19, w-11: the pipeline adds to 49 (9 + 14 + 23 + 3); the Orders tile says 46.
- Analytics: filters Delhi and Lehenga are on, yet the lists show Chennai, Ludhiana, Plazo set and Saree.
- w-10: "Recent orders" for Preeti lists SO-3390, which is Rangoli's, and the open order itself (`web.jsx:279`).
- nw-1: invoices SI-2277 and SI-2276; Returns and search give SI-2288 and SI-2271 for the same orders.
- `CustomerBar` prints "82 · 2 bills open" and "30 days · ₹1.2L limit" for every customer (`final.jsx:441`); CRM has Rangoli at 74 (nw-3).
- The CRM dossier shows SO-3455's ₹24,975 already invoiced (SI-2301, `mod-crm-more.jsx:250`) while Sales has it Raised.
- f-17 "1 orders" (`final.jsx:393`). Agencies read "Shubham Agency", "Karthik Agency" (`agencyOf`); CRM says "Shubham Marketing".
- 3661 shows an empty photo tile (f-18, w-8, w-10); the copy rule asks for "No photo yet".
  nw-3 cuts the first card's date ("04/09,"). nw-4 says "Columns · 13 of 34" on a 10-column returns table.

---

## 4. Priority lists

### P1 · Must change
1. Approval screen · draw Home › Approvals › Sale orders, phone + web, as in section 2; the opened order's Approve becomes Review (f-18, w-8, w-10).
2. Credit-line red blocker · on the approval card, admin-only approve with a reason (F:17); the warning at the cart is a Catalogue hand-off.
3. Who may act · never approve your own order (w-10); Approve for approver roles only; Edit only while Raised and only for sale roles; Analytics hidden below sale manager (f-15 to f-21, w-8 to w-13).
4. One status model, one word set for Sales, Dispatch, CRM and the product page: All · To approve · Approved and pending · Dispatched · Cancelled, with Part sent, Held, Waiting and Declined as pills; each tab lists only its own orders (f-16, f-17, w-8, w-9, nw-1; question 4).
5. Opened order for every state · per line: in stock, sent, pending, invoice, parcel; the journey track (`Journey`, `mod-topbar2.jsx:52`); actions that change with the state (f-18, w-10).
6. Edit, Cancel and Held · edit before approval, cancel with a reason, and Held after the due days with "Customer confirmed" or "Cancel the rest" (F:12).
7. Due days · one default, 20 d (F:12), editable on the cart and the same in Dispatch (w-10, nw-1, Dispatch Pending; question 3).
8. Two clipped finals · the w-10 header (search and orb pushed out) and the w-8 pane (Approve below the fold).

### P2 · Good to change
1. Phone keeps cards; table and group-by on web only (f-16, f-17; question 5).
2. Raised cards show the raiser, waiting time and flag icons (f-15, w-8).
3. "Purchase history" opens the CRM dossier's Orders tab (f-18, w-10; `mod-crm-phone.jsx:81`, `mod-crm-web.jsx:63`).
4. "Order again" on a dispatched order, into a new cart for that customer (NOT DRAWN).
5. The date chip turns off once a search term is typed; "All time" in its menu (f-15, w-8).
6. "Sent pcs" and "Pending pcs" in the column chooser and the default table (nw-1, nw-2).
7. Sales › Returns read-only (status and who approved); the approval moves to Home › Approvals › Sale returns; phone finals get the Returns tab (nw-3, f-15).
8. One credit-note number format, shared with Dispatch (nw-3, nw-4).
9. Customer mode on: Sale orders and Analytics locked, with a line saying why (w-8 to w-13, F:80).
10. Sale executive variant: no credit line, overdue, payment score or payments graph (f-15, f-18, w-10; question 6).
11. Analytics: one placement on web (the tab, as in the finals); one chart per phone screen; rows link to the dossier and product; shorter KPI subtitles (f-19 to f-21, w-11 to w-13).
12. The cart's note for approval on phone too, shown on the order and the approval card (w-7, f-12, f-18).
13. Print and share leave the phone cards; they stay on the opened order (f-15).
14. Fix the sample numbers listed in section 3, and the empty photo tile.
15. Register or delete WebSO2, WebSO3, WebAnalytics2 and WebAnalytics3.
16. A confirmation after submit: "SO-3455 sent to Accounts for approval" with a link (after f-12; Catalogue hand-off).

### P3 · Keep as is
1. Sale order cards as the phone default (f-15).
2. Order lines with a photo beside every design number and colour bars (f-18, w-10).
3. The customer facts grid on the opened order, fed with each customer's own data (f-18, w-8 pane).
4. Web cards with the order preview pane (w-8).
5. The web full table and the grouped column chooser with presets and money locks (nw-1, nw-2).
6. The status line "raised by · in-cabin · awaiting approval · due · transport" (w-10).
7. Analytics for managers: orders, designs, customers with the range pane (w-11 to w-13).
8. Returns cards with order and invoice chips and the "Stock on approval" pill (n-1, nw-3).
9. The product page's sale orders with the BRD's tab words (f-9), as the model for the words.

---

## 5. Missing screens, in draw order (phone + web, light + dark)

1. Approvals · first card with a flag; the queue (phone list sheet, web pane).
2. Approvals · red blocker: accounts view, admin view with the reason.
3. Approvals · decline, wait and send-to-owner sheets; approve part; approved toast with the next card; empty queue.
4. Sale orders · To approve cards with raiser, waiting time and flags.
5. Opened order · approved and part sent: per line sent and pending, invoice, parcel, the journey.
6. Opened order · Held after the due days: "Customer confirmed" (new due date) or "Cancel the rest".
7. Opened order · declined or cancelled, with the reason and who; "Edit and resubmit".
8. Edit order before approval; the Cancel sheet with reasons.
9. Opened order · dispatched, with its returns linked and "Order again".
10. Sale executive variants: no Approve, no Analytics, no credit or payment facts.
11. Customer mode on: Sale orders locked.
12. Sales › Returns read-only, and the Sale returns card in Home › Approvals (with the Dispatch reviewer).

Catalogue's side of the same flow: the confirmation after submit, the credit warning at the cart, editable due days.

---

## 6. Hand-offs

**Catalogue carts, in** (f-12, w-7)
- Submit creates a Raised order (`final.jsx:330`, `web.jsx:239`).
- Missing at the cart: editable due days (F:12); the credit-line warning before submit (F:17, review 1 gap 3);
  the note box on phone; a confirmation naming who approves.
- The cart shows the sale executive the order total; the money rule on sale orders must agree (question 6).

**Dispatch Ready, out**
- Approved orders go to Ready (in-stock lines) and to Pending › Pending dispatch.
  Dispatch's "Pending approval" tab is the same list as To approve, read-only there.
- Part-dispatch numbers per line must match in both modules ("6 of 12", `mod-topbar2.jsx:83`).
- Held is Dispatch's "After due date". Agree one name and one due day (20 vs 25).
- The sample states of SO-3448, SO-3451 and SO-3433 disagree between the two modules.
- Returns are booked in Dispatch › Sale return. Its "Pending accounts" chip (`mod-dispatch-web.jsx:337`)
  needs the Sale returns card in Home › Approvals. One credit-note format.

**CRM dossier, reused unchanged**
- Gauges for customer, payment, GR and FY billing (`mod-crm.jsx:136`); `Taste` (`:53`); `CreditBar` (`:56`);
  `OrdersPane` with orders vs payments (`:185`); `DossierInvoices`, `DossierReturns` with the GR ratio, `DossierGrowth`
  with tier appetite (`mod-crm-more.jsx:249,265,273`); agency figures (`mod-crm.jsx:298`).
- "Purchase history" opens the dossier's Orders tab; its chips (All · Open · Dispatched · Returns) take the Sales words.
- "Wait till payment" ends when CRM logs a payment (`mod-crm-more.jsx:146`).

**Home, not on the board yet**
- Approvals belongs to Home. Production already approves in place (costing, purchase inward);
  those move into the same card frame when Home is planned.

---

## 7. Questions for the owner

1. **Who approves a sale order?** Proposal: Accounts (sub-admin) by default, the sale manager for clean orders, admin only over the credit line, never the person who raised it. (F:12 says accounts; F:46 and the old role table say sales too.)
2. **What may the approver change?** Approve part: yes or no. Lower the qty: yes or no. Change the rate: proposal no.
3. **Due days and holds.** 20 days (F:12) or 25 (Dispatch frames), counted from the order date? And do you want the approver's "Wait till payment" (not in the BRD), kept apart from Held?
4. **Status tabs.** All · To approve · Approved and pending · Dispatched · Cancelled, then Returns and Analytics, with the same words in Dispatch, CRM and the product page?
5. **Sale orders on phone.** Cards only; table and group-by on web only? (Review 1 Q4, still open.)
6. **Sale executive.** May they see the bill of their own orders (the cart already shows it), but not the customer's credit line, overdue or payment score?

---

## 8. What changed from the first draft

- Every frame opened at full size. Tap counts corrected: the next order costs 3 taps on phone, not 2; w-8's Approve is below the fold.
- Self-approval is on the board, not hypothetical: w-10 shows RM approving his own order.
- "Hold" split in two: the BRD's Held (past due, the customer confirms again) and the approver's Wait (new, question 3). The draft mixed them.
- Added: w-8 and the phone tables also mislist Raised; the ₹1,000 gap on the opened order; the clipped w-10 header; Sales vs Dispatch state clashes; the lost cart note; Customer mode must lock Sales (F:80, F:33); the BRD facts counted (4 of 10 phone, 5 of 10 web).
- Corrected: f-19 is one line chart, the pipeline and weekday bars, and "one chart per screen" was review 1's proposal, not an owner answer. The web approval layout now keeps the card in main and the queue in the right pane, as the shell does elsewhere.
- Confirmed in the BRD's Word file that F:76–79 is the Sale orders sub-menu's tab set; the text copy loses the indent.
