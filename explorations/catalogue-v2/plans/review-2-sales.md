# Review 2 · Sales (10 Oct 2026)

Sale orders, returns, analytics and sale-order approval.
Walked as the owner would, on phone and web, light and dark.
Review only: nothing on the board was changed.

Frames: finals f-15 to f-21 (phone), w-8 to w-13 (web).
Drafts on `board.html?m=sales`: nw-1, nw-2 (table), n-1, n-2, nw-3, nw-4 (returns).
In the app these stay under Catalogue › Sale orders (as intended).

Tap counts start from Home on phone, and from any Catalogue screen on web.

---

## 1. Flows walked

### A · Managing a sale order after submit

| # | Step | Phone | Web |
|---|---|---|---|
| 1 | Submit the cart | f-12 "Submit for approval" · 1 tap (`final.jsx:330`) | w-7 · 1 click |
| 2 | See it was sent, and to whom | NOT DRAWN (no confirmation, no "sent to accounts") | NOT DRAWN |
| 3 | Open Sale orders | Catalogue › sub-menu › Sale orders · 3 taps (the phone sub-menu drop is not drawn for this path) | Sale orders button · 1 click |
| 4 | Find the order | Raised tab is the default; search chip · 1 tap + typing (f-15) | Search chip · 1 click + typing (w-8) |
| 5 | See its status | Pill on the card · 0 taps (f-15) | Pill on the card · 0 (w-8) |
| 6 | Open it | Tap the card · 1 (f-18) | Click the card for the preview pane · 1 (w-8); full order · 1 more (w-10) |
| 7 | Edit before approval | "Edit" · 1 tap, then NOT DRAWN (f-18, `final.jsx:462`) | "Edit" · 1 click, then NOT DRAWN (w-10) |
| 8 | Cancel | NOT DRAWN (no Cancel anywhere) | NOT DRAWN |
| 9 | Raised → Approved | Only the Approve button exists (f-18); what happens after is NOT DRAWN | Same (w-8 pane, w-10 header) |
| 10 | Partly dispatched: per line, what went and what is pending | NOT DRAWN in Sales. The opened order shows only qty × rate per colour (f-18) | NOT DRAWN in Sales. The table has In stock 3/5 and Invoices, but no "dispatched / pending pcs" (nw-1). Dispatch › Pending has it ("2 of 5 pcs dispatched", `mod-topbar2.jsx:83`) |
| 11 | Which invoice and parcel a line went in | NOT DRAWN | Only as table columns: Invoice numbers, Parcels (column chooser nw-2, `mod-appshell.jsx:186`); never per line |
| 12 | Fully dispatched | Dispatched tab · 1 tap; an opened dispatched order is NOT DRAWN | Dispatched tab · 1 click; opened order NOT DRAWN |
| 13 | Held (20 days passed, waits for the customer) | NOT DRAWN (no Held status or tab) | NOT DRAWN |
| 14 | Re-raise after hold | NOT DRAWN | NOT DRAWN |
| 15 | Cancelled: who and why | Cancelled tab · 1 tap; card only, no reason | Same |

Approving an order today, phone: Home › Catalogue › sub-menu › Sale orders › card › Approve = **5 taps**,
then back + next card = 2 taps per order.
Web: card › Approve in the pane = **2 clicks** per order.

### B · Approving incoming sale orders

| # | Step | Phone | Web |
|---|---|---|---|
| 1 | Learn there is something to approve | NOT DRAWN (no Home, no bell content, no badge) | NOT DRAWN |
| 2 | Open the queue | NOT DRAWN: no Home › Approvals; the approver uses the Raised tab instead (f-15) | Raised tab (w-8) |
| 3 | See the facts for a decision | Customer bar only: score, payment score, bills open, credit days and limit (f-18, `final.jsx:437–443`) | Customer bar + recent orders + sale vs payments (w-10, `web.jsx:279`) |
| 4 | See GR ratio, FY billing, overdue ₹, pcs in stock, tier appetite, broker graph | NOT DRAWN | NOT DRAWN (only the customer graph) |
| 5 | Approve | 1 tap (f-18) | 1 click (w-8, w-10) |
| 6 | Decline with a reason | NOT DRAWN | NOT DRAWN |
| 7 | Hold | NOT DRAWN | NOT DRAWN |
| 8 | Approve part / change qty | NOT DRAWN | NOT DRAWN |
| 9 | Mark "for owner" / "for inspection" | NOT DRAWN | NOT DRAWN |
| 10 | Credit line crossed: red blocker | NOT DRAWN | NOT DRAWN |
| 11 | Next order | Back + tap · 2 | Click the next card · 1 |

### C · Sale history and analytics

| # | Step | Phone | Web |
|---|---|---|---|
| 1 | Find a past order for a customer | Sale orders › search › clear the "This month" chip › pick the right tab · 4+ taps (f-15). There is no All tab, so you guess the status first | Same, 3+ clicks (w-8). The table has filters per column (w-9) |
| 2 | See the customer's past orders | "Purchase history" chip · 1 tap, then NOT DRAWN (dead end, f-18) | Recent orders, 3 rows, in the pane (w-10); "Purchase history" leads nowhere |
| 3 | Re-order | NOT DRAWN anywhere on the board | NOT DRAWN |
| 4 | See returns and credit notes | Returns tab · 1 tap (n-1 cards, n-2 table) | Returns tab · 1 click (nw-3 cards + credit note pane, nw-4 table) |
| 5 | Analytics | "Analytics" button · 1 tap (f-19 orders, f-20 designs, f-21 customers) | Analytics tab · 1 click (w-11 to w-13) |
| 6 | Analytics hidden for sale executives | NOT DRAWN (the button is on every frame) | NOT DRAWN |

---

## 2. Is there an approval screen?

**No.** `grep -i approv` over every `.jsx` finds only the Approve button on the opened order
(f-18, `final.jsx:462`; w-8 pane, `web.jsx:256`; w-10 header, `web.jsx:279`).
Home › Approvals is listed in the side menu (`screens2.jsx:9`) and in the screen flow
(`SUTRA-SCREEN-FLOW.md:22`) but has no frame. There is no Home module on the board at all.
Dispatch says "approval happens upstream" (`mod-dispatch-web.jsx:66`, `mod-dispatch-s-web.jsx:45`), and
analytics even measures "time to approve · 2.1 d" (f-19, w-11), but the screen that does it does not exist.

### Approval screen spec · sale orders

Source: BRD lines 12, 17, 32, 44–56; old BRD ~59–63 ("tinder type view without the swipe";
all facts about one order on one page; approve or decline).

**Where it lives.** Home › Approvals. One module for every approval kind.
Sub-sub tabs: Sale orders · Sale returns · Purchase inwards · Production overages · Costing (`SUTRA-SCREEN-FLOW.md:22`).
Each role sees only its own kinds:
sale manager (sale orders, sale returns), accounts (sale, purchase, both returns), production manager (overages, delays).
Everyone above the assignee also sees the card, with a line "assigned to Accounts · you can act as Admin".

**Entry points.**
1. Home › Approvals (side menu on phone, rail on web).
2. A count badge on the Home icon of the phone island and the web rail ("7").
3. The bell: one row per new order, "SO-3455 · Preeti Fashion Hub · ₹24,975 · to approve". Tap opens that card.
4. A push notification with the same text.
5. Shortcut: the Approve button on the opened order (f-18, w-10) stays, for roles that may approve.

**Queue order.**
1. Red blockers (over the credit line) and cards sent "for owner" at the top, for admin.
2. Then oldest first, so no order waits past its due days.
Filter chips: All · Flagged · Over credit line · For owner · By broker.
A count line: "7 to approve · oldest 2 d".

**One card = one order, one screen** (picture first). Top to bottom on phone:
1. Head: SO-3455 · raised by Rohan Mehta · in-cabin · 10/09/26 · waiting 6 h · "2 of 7" with ‹ › arrows.
2. Flag band, only when something is wrong:
   amber "Customer overdue ₹31,000 · 2 bills"; amber "Broker Harjeet Agency overdue ₹2.4L";
   red "Over credit line by ₹38,000" (see the red blocker below).
3. Customer: name, city · market, tier, broker · agency, phone and call chips.
4. Scores, as three small gauges (reuse `Gauge`, `mod-crm.jsx:49,136`): customer score · payment score · GR ratio.
   Beside them: FY billing ₹18.7L.
5. Money line: this order ₹24,975 · overdue ₹31,000 · credit line bar "₹0.9L of ₹1.2L used, ₹1.15L after this order"
   (reuse `CreditBar`, `mod-crm.jsx:56`).
6. Pieces: 5 pcs · 3 in stock now · 2 to make.
7. Tier appetite: one bar, high / mid / low share of past buying, with a tick showing where this order sits.
8. Order lines, picture first: photo beside every design number, colours × qty, a stock tick per colour
   (the `OrderPane` pattern, `mod-topbar2.jsx:85`), rate and line total.
9. Two small graphs side by side, tap to enlarge:
   customer orders vs payments, and broker agency orders vs payments (reuse `DossierInvoices`, `mod-crm-more.jsx:254`).
10. Note from the salesperson, due days (default 20).

**Actions** (a fixed dock; one tap per decision):
- **Approve** (the maroon button) · one tap, no confirm. A 5-second "Undo" toast, then the next card slides in.
- **Decline** · opens a short sheet: reason chips (overdue, credit line, customer cancelled, stock, other) + note · 2 taps.
- **Hold** · sheet: "till the customer confirms" / "till payment" / a date · 2 taps.
- **More (…)**: Approve part (untick lines, the button reads "Approve 3 of 5 pcs") · Edit qty · Call customer · Call broker ·
  Send "for owner" (sub-admin) / "for inspection" (manager), with a note.
- Rate is not editable here (see question 2).

**Credit line red blocker** (BRD line 17).
When open bills + this order exceed the customer's credit line:
- The card head turns red (`T.danger` band and border; this is the danger token, not the maroon line).
- Text: "Over credit line by ₹38,000 · blocked · goes to admin".
- For everyone below admin, Approve is replaced by "Send to owner"; Decline and Hold stay.
- Admin sees "Approve over limit", which needs a reason (one line) before it works.
- The order already waits in admin's queue, at the top, without anyone sending it.

**What happens next.**
- Approved → status Approved, the salesperson gets a bell row, the order appears in Dispatch › Ready
  and in Dispatch › Pending › Pending dispatch. It leaves the approval queue.
- Declined → status Declined (shown in the Cancelled tab with the reason); the salesperson is told.
- Held → status Held; its due-day clock stops; "Re-raise" on the opened order sends it back to the queue.
- For owner / for inspection → stays in the queue, moves to admin, with a "sent by Accounts · note" line.

**Web layout** (WebShell3, Home › Approvals › Sale orders):
- Left: the queue as a narrow list (photo strip of the order, customer, ₹, flag icons, waiting time).
- Centre: the same card as phone, two columns (lines with photos left, scores, money and graphs right).
- Right pane: the CRM customer pane (`CustPane`, `mod-crm.jsx:131`) with Orders and Returns tabs.
- Approve / Decline / Hold in the page header; keys A · D · H, J / K for next and previous.

Frames this needs, phone + web, light + dark:
queue · card · card with the red blocker · decline sheet · hold sheet · "for owner" sheet · approve-part state.

---

## 3. Friction found

| Where | Problem | Why it matters |
|---|---|---|
| f-16, f-17, w-9, nw-1 | Tab says "Raised" but the table lists Approved, Dispatched and even Cancelled rows | The tab lies; a manager counts the wrong orders |
| f-16 at 390 px | Only Order and a bit of Customer show; Bill, Status and photos are off screen; the filter card covers the rows | Hard to read on a phone; review 1 Q4 already proposed web only |
| f-17 | The group-by island takes a quarter of the screen above a 4-column table | Little left to read |
| f-15, w-8 tabs | Raised · Approved · Dispatched · Cancelled (+ Returns) vs BRD All · Approved and pending · Dispatched (line 76–79) and the report's All / Approved and pending / Invoiced (~245). No All tab, no Held, no part-dispatched | Finding a past order means guessing its status; Held and pending orders have no home |
| f-9 vs f-15 | The product page's sale orders use the BRD tabs (`final.jsx:277`); the Sale orders page uses another set | Two words for the same thing |
| f-18, w-10 | Opened order is drawn only for a Raised order | No view of an approved, part-dispatched, dispatched, held or cancelled order |
| f-18 | Lines show qty × rate only; no stock, no dispatched or pending pcs, no invoice | The customer calls "where is my order?" and the answer is in Dispatch, not here |
| f-18, w-8, w-10 | Approve shows to everyone, including the salesperson who raised it | A sale executive could approve their own order; the role matrix does not allow it |
| f-18, w-10 | "Edit" leads nowhere | Edit before approval is a daily need |
| f-18, w-10 | "Purchase history" chip leads nowhere | Dead end; the CRM dossier already has the Orders tab |
| f-15 | "This month" date chip is on by default | A search for an older order shows nothing until the chip is cleared |
| f-15 | Print and share icons on every card | Crowd; printing from a phone is rare; they fit on the opened order |
| f-19 to f-21, w-11 to w-13 | Analytics button and tab show on every frame | Owner, 6 Oct: sale managers and above only |
| f-18, f-15 | Credit limit, payment score, bills open and bill ₹ show with no role variant | Money rule (`during-ui-business-requirements.md:67`): sale executive sees catalogue prices only |
| w-10 "due 20 d" vs Dispatch "due day 25" (`SUTRA-SCREEN-FLOW.md:52`) | Two different default due days | BRD line 12 says 20; Held depends on it |
| nw-1, nw-2 | No "dispatched pcs / pending pcs" column in the chooser (`mod-appshell.jsx:186`) | The one number a manager wants for a part-dispatched order |
| nw-3 | "Approve to stock" button inside Sales › Returns | Return approval belongs to accounts in Home › Approvals › Sale returns |
| nw-3 vs Dispatch | Credit notes CN-0112 here, CN-260908-0003 in Dispatch (`mod-dispatch-web.jsx:324`) | Two numbering styles for one document |
| w-8 to w-13 | Customer mode switch in the header of Sale orders and Analytics | It does nothing useful here; one slip shows a customer the analytics |
| f-19 | Three charts and a pipeline on one phone screen | Review 1 asked for one chart per screen on phone |
| `mod-topbar2.jsx:17,27` | WebSO3 and WebAnalytics3 are defined but never registered | Near copies of w-8 and w-11; confusing for developers |
| n-1, n-2 | Five tabs plus Analytics on phone; the row scrolls and Raised falls off the left | The default tab is hidden |

---

## 4. Priority lists

### P1 · Must change
1. Approval screen · draw Home › Approvals › Sale orders, phone + web, as specified in section 2.
2. Credit-line red blocker · draw the blocked card and the admin override (BRD line 17).
3. Order states · add Held, Part-dispatched and Declined; an All tab first; align tabs with the BRD (f-15, w-8; question 6).
4. Opened order per state · per line: in stock, dispatched pcs, pending pcs, invoice and parcel; reuse `Journey` (`mod-topbar2.jsx:52`) for raised → approved → 1st dispatch → done (f-18, w-10).
5. Cancel, Hold, Re-raise and Edit · draw the actions and their sheets on the opened order (f-18, w-10).
6. Roles · hide Approve from the salesperson who raised it and from sale executives; hide Analytics below sale manager (f-15 to f-21, w-8 to w-13).
7. Tables · rows must follow the tab (f-16, f-17, w-9, nw-1).

### P2 · Good to change
1. Phone keeps cards only; table and group-by on web only (f-16, f-17; question 4).
2. "Purchase history" opens the CRM dossier Orders tab (f-18, w-10).
3. Re-order: "Order again" on an opened dispatched order, into a new cart (NOT DRAWN).
4. Date chip off by default when searching (f-15, w-8).
5. Sale executive money variant of cards and opened order (f-15, f-18; question 5).
6. Add "Dispatched pcs" and "Pending pcs" columns to the chooser (nw-2).
7. Move "Approve to stock" out of Sales › Returns; Sales shows returns read-only (nw-3).
8. One credit-note number format, shared with Dispatch (nw-3, nw-4).
9. One default due day: 20, as the BRD says (w-10, Dispatch Pending).
10. Drop print and share from each phone card; keep them on the opened order (f-15).
11. Hide the Customer mode switch on Sale orders and Analytics (w-8 to w-13).
12. Phone analytics: one chart per screen (f-19 to f-21).
13. Register or delete WebSO3 and WebAnalytics3 (`mod-topbar2.jsx:17,27`).
14. Submit confirmation: "SO-3455 sent to Accounts for approval" toast with a link (after f-12).

### P3 · Keep as is
1. Sale order cards as the phone default (f-15).
2. Order lines with a photo beside every design number (f-18, w-10).
3. Customer bar facts grid (f-18, w-8 pane).
4. Web cards with the order preview pane (w-8).
5. Web full table and the grouped column chooser (nw-1, nw-2).
6. Web analytics for managers: orders, designs, customers with the range pane (w-11 to w-13).
7. Returns cards with order and invoice chips (n-1, nw-3 without the approve button).

---

## 5. Missing screens, in draw order (phone + web, light + dark)

1. Home › Approvals · sale-order queue.
2. Approval card · sale order (the spec in section 2).
3. Approval card · over credit line, red blocker; admin override.
4. Decline, Hold and "for owner / for inspection" sheets; approve-part state.
5. Opened order · approved and part-dispatched (lines with dispatched / pending, invoice, parcel, journey).
6. Opened order · held, with Re-raise; cancelled / declined with the reason.
7. Edit order before approval.
8. Cancel order sheet (reason).
9. Opened order · dispatched, with "Order again" (re-order).
10. Sale executive variants: no Approve, no Analytics, no credit or payment facts.
11. Submit confirmation after the cart (toast + bell row for the approver).

---

## 6. Hand-offs

**From Catalogue (in).**
Carts f-12 "Submit for approval" (`final.jsx:330`) creates a Raised order.
Due days (default 20) should be editable on the cart, as the BRD asks; f-12 only prints "due 20 d".
The approver gets a bell row and a badge; the salesperson gets a confirmation.

**To Dispatch (out).**
Approved orders go to Dispatch › Ready and Pending (`mod-topbar2.jsx:45–90`).
Dispatch already lists a "Pending approval" stage it cannot act on; the approval screen feeds it.
Partial dispatch is recorded in Dispatch ("2 of 5 pcs dispatched"); Sales must show the same numbers per line.
Held = Dispatch's "After due date"? Agree one name and one due day (question 3).
Returns are booked in Dispatch › Sale return and approved by accounts in Home › Approvals › Sale returns;
Sales › Returns only shows them.

**CRM dossier (reuse).**
The approval card and the opened order can borrow, unchanged:
`Gauge` scores and FY billing (`mod-crm.jsx:136`), `CreditBar` (`mod-crm.jsx:56`),
`OrdersPane` with orders vs payments (`mod-crm.jsx:185`), `DossierInvoices` (`mod-crm-more.jsx:249`),
`DossierReturns` with GR ratio (`mod-crm-more.jsx:265`), `CustPane` for the web right pane (`mod-crm.jsx:131`).
The Dispatch return card already shows customer score for accounts (`mod-dispatch-web.jsx:299`).
"Purchase history" should open the dossier, not a new screen.

---

## 7. Questions for the owner

1. **Who approves a sale order?** Accounts (sub-admin) first and then admin only when flagged, or the sale manager too? (BRD line 12 says accounts; the old role table says Sales: yes.)
2. **What can the approver change?** Approve part of an order and lower qty: yes or no? Change the rate: yes or no?
3. **Held.** After 20 days (BRD) or 25 (Dispatch frames)? Does a held order keep its number when re-raised, and who re-raises it?
4. **Sale orders on phone** · cards only, table and group-by on web only? (review 1, Q4, still open)
5. **Sale executive** · may they see the bill ₹ of their own orders, and the customer's credit limit and payment score?
6. **Status tabs** · switch to All · Raised · Approved (incl. part-dispatched) · Dispatched · Held · Cancelled, with Returns and Analytics after?
