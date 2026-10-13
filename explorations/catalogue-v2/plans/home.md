# Home — plan and screens (13 Oct 2026, review 2)

Drawn in `mod-home.jsx` (module id `home`, components `Hm…`). Sources: `design-system/research/brd-final.txt` lines 44–57
(cited F:line), F:12 and F:17 (approval flow, credit line), `design/during-ui-business-requirements.md` lines 21–23 and
131–139 (cited D:line). The board's own data (customers, designs, photos) is reused; nothing invented for images.

## Owner's rule, 13 Oct (the reason the approval card looks the way it does)

Nothing blocks a sale order at submission. The salesperson can edit or delete a submitted order while it waits in the
queue. Every reason not to approve shows on the approver's side as a flag, in words, with the fact beside it. So:

- The queue cards carry flag chips (danger: "Over credit line ₹9,950", "Overdue ₹62,400"; warn: "GR ratio 40 %",
  "New customer", "Priority 1", "Edited after submit"). Flagged orders sort first (danger count, then warn count, then
  oldest). A card with no flags shows none.
- The sale-order card opens with a "Look twice" strip: one row per flag, flag in bold, the fact after it. The credit bar
  stays the fact; no screen tells the user the order is stopped. The head says "Raised by Rohan Mehta · the salesperson can still edit or
  delete it until you act". A line the salesperson edited carries "edited · was 6" beside the colour.
- Over the credit line is a flag like the others. A sub-admin cannot approve it: the primary reads "Send to admin" with
  Reject and Hold beside it, and a line "Over-the-line flags are cleared by admin". The admin variant's primary is "Approve".

## Sub-menus (web: header buttons Home · Notifications 5 · Approvals 7 · Gate pass; phone: Home module, Approvals and
Gate pass are reached from Home)

1. Home · landing by role (F:44)
2. Approvals · one place for every approval, each with its own facts (F:46–56)
3. Gate pass · tokens, auto and manual (F:57)

Notifications (F:45) is a sub-menu in the BRD; here only its feed is drawn (phone strip on Home, web right pane).
A full Notifications screen is not in this round.

## Screens in flow order

Format: purpose · who · web right pane · phone sheets · money rule. Frame ids are the board's (light `n-` / `nw-`, dark
`nd-` / `nwd-`).

### Home

- **P1 `ScreenHmHome` (n-1)** Sale executive landing: header block (lockup, "Sales", cart, menu, search island), Today
  tiles (orders 7 · pcs 68 · approvals 3), Needs you (3 rows), six picture-free quick links, three notifications (BAU ·
  daily metric · red alert). Sale executive · no web pane on the phone · no sheets · no ₹ tile for this role.
- **W1 `WebHmHome` (nw-1)** Landing on the web shell as the sale manager (the logged-in RM): four Today tiles including
  Billed today ₹3,39,660, Needs you in two columns (six rows, seven approvals in four of them), quick links with counts,
  orders this week · right pane Notifications grouped red alerts / daily / business as usual · money shown (manager).

### Approvals

- **P2 `ScreenHmApprovals` (n-2)** Queue as cards: party (display), order no (mono), ₹ and pcs, flag chips in words,
  raised by · date, lead design photo. Tabs Sale orders 4 · Returns 1 · Purchase inwards 1 · Overages 1 · Costing 0.
  Approver (sale manager, accounts) · ₹ shown.
- **P3 `ScreenHmApproveSO` (n-3)** The core card for a role that can approve: head, Look twice, customer, standing tiles,
  credit bar, appetite bar, order lines with steppers and stock, note, last three orders (Order · Invoice · Return),
  two charts; Reject · Hold · Approve docked, "Mark for inspection → owner" above them. ₹ shown.
- **P4 `ScreenHmApproveSOFlagged` (n-4)** Same card, order over the credit line (open ₹82,000), sub-admin: the extra
  flag, the bar's last segment in danger, primary "Send to admin".
- **P4b `ScreenHmApproveSOAdmin` (n-5)** The same flagged card for admin: primary "Approve".
- **P5 `ScreenHmApproveReturn` (n-6)** Sale return SR-0112 (Nalli Fashion Mart): customer, standing tiles with the return
  ratio before and after, bills returned from (tap to open), pieces coming back with "from SI-2260", stock-on-approval
  note, two small charts. Approver · ₹ shown.
- **W2 `WebHmApprovals` (nw-2)** Queue at 300 px (picked card with a 1 px accent border), the card in the middle with the
  actions docked at its foot, Look twice across the top of the main area. Right pane (title = customer): standing tiles,
  appetite, order history, two charts.
- **W3 `WebHmApproveFlagged` (nw-3)** The over-the-line state for a sub-admin on the web.

### Gate pass

- **P6 `ScreenHmGate` (n-7)** Guard: Auto tab (sale invoice, production issue, purchase inward), "Verified by Ramesh
  14:20" or Active with a Verify button, and the one primary "New manual token". No money anywhere.
- **W4 `WebHmGate` (nw-4)** Manual tab: token table (sale return, purchase inward with no PO), picked token read-only in
  the pane (party, kind, parcels, kind of stock, claimed qty, made by), Auto tokens still to come below the table.

## Found in the BRD

- F:44 Home is customised by role: key metrics (daily, monthly, yearly) and quick links, the same top bar, and the
  sub-menu buttons Notifications, Approvals, Gate pass hub. W1 carries Day · Month · Year.
- F:45 Notifications are custom to every role: BAU, daily metrics, red alerts.
- F:46 Approvals are one place, module by module; each card carries the facts that kind of approval needs. Sale manager
  has sale and return approvals; accounts has sale, purchase and returns; production manager has delay and overage
  approvals; approvals show for everyone above the person who holds the task; a production manager can mark an approval
  "for inspection" and escalate it to the owner or main admin. This is the link under the docked actions.
- F:47–56 The sale-order card shows: payment score, customer score, GR ratio, total FY billing, current order amount,
  current order pcs (and pcs in stock), payment overdue, high / mid / low tier appetite (of 100 %), the customer's orders
  vs payments graph and the broker agency's graph.
- F:46 also lists what a sale return needs: customer score, return order, links to the bills returned from, return
  ratio, payment vs orders graphs, the broker agency graph. P5 follows it.
- F:46 purchase inward needs supplier score and payment overdue; production overage needs karigar score, job history and
  dates, material recipe. Not drawn this round (see open questions).
- F:57 Gate pass hub: two token kinds, auto (made with a floor entry: production issues, sale invoices, purchase
  returns, job receives, PO-linked inwards; the guard only marks them verified) and manual (made by the guard for
  sale returns and no-PO purchase inwards; they stay active until the entry is made in the ERP). The guard marks party,
  kind of entry, parcels received, kind of stock and claimed qty, with drop-downs over ledgers, products and materials.
- F:12 After a sale order is made it goes to accounts (sub-admin for now) to check overdue, then to admin level.
- F:17 Credit line: set per customer in the master; an order past it is escalated to admin. The owner's 13 Oct rule turns
  the old hard stop into a flag the sub-admin cannot clear.
- D:21–23 Customer score formula as proposed by the owner: 30 % payment score, 30 % total billing, 25 % goods-return
  ratio (inverse), 15 % initial market rating; bands Low 1–30, Medium 30–60, High 60–100. The tile sub-line says "high
  band" for 68. The payment score formula itself is still undefined.
- D:131–139 About 30 % of users are semi-skilled and need pictures, big targets, few typed fields. Quick links are icon
  tiles, rows are 48 px and up, steppers instead of fields, flags in plain words.

## Open questions

1. Who approves an order raised by the approver himself? The board's logged-in user is RM (Rohan Mehta) and SO-3456 is
   raised by Rohan Mehta.
2. Does "Hold" keep the order in the queue (flagged "On hold") or move it to a Held list? The BRD only says an order
   stands "Holded" past its due days until the customer approves again (F:12 area).
3. Purchase-inward, production-overage and costing cards are not drawn (queue counts only); they follow the same anatomy.
4. A full Notifications screen (filters by BAU / daily / red alert, per-role rules) is a sub-menu in the BRD; only the
   feed is drawn here.
5. The sale executive's Home shows "3 approvals waiting". For an executive these are his own orders waiting; should the
   tap open a read-only status view of his orders (edit or delete while they wait) rather than the approver's queue?
6. The payment score formula (D:21–23 says undefined) — the tile shows a plain score out of 100.

## Assumed, not in the BRD

- **Hold** as a third action beside Reject and Approve (Reject · Hold · Approve; for a sub-admin Reject · Hold · Send to
  admin). Taken from the owner's 13 Oct brief, not from the BRD.
- **Appetite bar reading**: High 67 · Mid 25 · Low 8 of 100 %, one stacked bar in blues (dark to light), with "what they
  usually buy, by price tier" under it.
- **Who clears an over-the-line flag**: admin only; a sub-admin sends it up. A sale manager is drawn as able to approve
  the within-line card (P3); whether sale manager may approve over the line is the owner's call.
- **Flag set and tones**: danger for money facts that are already due (overdue, over the line), warn for the rest (GR
  ratio, new customer, priority 1, edited after submit). Which of these the owner wants as flags is his list; thresholds
  (GR ratio 40 % is flagged, 9 % is not) are mine.
- **Edited after submit**: the strip says "qty of 2798 Sky 6 → 4" (the order was cut from 6 to 4 so the lines on the
  card, Sky × 4, are the current state); the line carries "edited · was 6". The owner's example read "4 → 6"; that would
  make Sky × 6 and the order 12 pcs.
- **Order arithmetic**: the lines (2798 × 5 at ₹4,995, 6002 × 3 at ₹4,995, 3661 × 2 at ₹5,995) total ₹51,950, not
  ₹47,950, so the card, the credit bar and the queue all say ₹51,950 and the over-the-line amount is ₹13,950 (open
  ₹82,000 + ₹51,950 − ₹1,20,000). Every figure is derived from `HM_LINES`; setting the 3661 rate to ₹3,995 gives
  ₹47,950 and ₹9,950 everywhere with no other change.
- **Open ₹64,000 on the within-line card** (instead of ₹52,000): the customer's overdue ₹62,400 cannot be more than what
  is open, and ₹64,000 + ₹51,950 still fits the ₹1,20,000 line with ₹4,050 free.
- **P2 queue flags on other orders**: Preeti Fashion Hub "Over credit line ₹9,950" and "Priority 1" (priority 1 is
  hers in the board data), Kavya Silks "New customer" (a customer invented for this queue), A V Creation none.
- **3661 Drape Saree has no photo** in the board's data (only 2798, 6002, 2006, 4566 have one), so its photo box shows
  the code; the queue and lines use the board's own photos elsewhere.
- **Web landing role**: W1 is the sale manager (₹ tile, 7 approvals); P1 is the sale executive (no ₹ tile, his own 3).
- **Gate pass**: guard header says "Guard"; tokens numbered `GT-YYMMDD-nnn` like the Dispatch module; "8 tokens today" =
  5 auto + 3 manual (one manual token is from yesterday and still active, so Manual counts 4).
- **Web card head**: on the web the over-the-line strip's second sentence ("Reject, hold, or send to admin.") is left to
  the buttons, because the main area has no room; the phone card keeps the full words.
- **Sale return facts** (SR-0112 lines at the bill rates ₹4,495 and ₹4,000, bills SI-2260 and SI-2263, GR ratio 9 % → 11 %)
  are invented to total ₹12,990.

## What changed in this round

New module file. Nothing in `design/`, `finals.jsx` or other modules was touched. Verified with
`board-check.sh home` (22 frames, console clean) and `contact-sheet.sh --s 0.9 home`.

## Round 2 (13 Oct, review-2 first job)

- One story end to end: the card and the queue's first row are now **SO-3456 · Ramleela Fashion · In-cabin · raised by
  Rohan Mehta · 13/10/26 · 10 pcs · 4 designs · ₹47,950**, the order the sell flow submitted. Lines: 2798 Sky × 2,
  Purple × 1 at ₹4,995; 6002 Lilac × 1 at ₹4,995; 3661 Peach × 2 at ₹5,995; 1457 Firozi × 3, Bottle × 1 at ₹3,995;
  note "2018 ke red ka stock check karna hai". Within the line (n-3, nw-2): open ₹64,000. Over the line (n-4, n-5, nw-3):
  line ₹1,20,000, open ₹82,000, this order ₹47,950, over by ₹9,950. "Edited after submit" reads "qty of 2798 Sky 4 → 2".
  The queue's second row (SO-3451) now says over by ₹14,200 so two rows do not share one figure.
- Web nw-2 / nw-3: the Look twice band moved into the card column, above the card head, card width. The queue keeps
  its own flag chips.
- Appetite bar (web pane, phone card): High ink, Mid ink2, Low line2, with the legend. No blue.
- Kept: Hold, admin and sub-admin variants, "Mark for inspection → owner". Dark twins checked at --w 2700.
- Frames: n-3, n-4, n-5 (phone); nw-2, nw-3 (web). Console clean.
- Assumed: order date 13/10/26 (the sell flow's), stock figures for 1457 (9 Firozi, 6 Bottle) invented; 3661 Peach keeps
  0 in stock so the "8 of 10 in stock" pill stays.

## Round 3 (13 Oct 15:30) · the owner's rule for the approvals card, provisional

Owner (via the lead, from the deck): an admin or accounts admin landing on any sale order sees, on the first screen, the
customer's analytics and the flags, highlighted; the order itself is one tap away. Flags are not written as text: a failed
rule tints the tile itself ("red flags over the same template").
- Supersedes: the "Look twice" prose band is gone (no free-text reasons anywhere); the Graphs-tab idea for the phone is
  dropped, the two charts sit inline on the first screen.
- Card, top to bottom (phone n-3, n-4, n-5; web nw-2, nw-3): head (order no, date, who raised it, pcs and ₹ on one line)
  → customer → eight fixed tiles in one order (Payment score · Overdue · GR ratio · Credit line used with a bar · FY
  billing · Total pcs · Customer score · Appetite) → flag chips (OVERDUE ₹ · GR RATIO % · OVER CREDIT LINE ₹ · EDITED
  AFTER SUBMIT; the queue uses the same set) → the two charts → folds: Order · 10 pcs · 4 designs · ₹47,950, Note,
  History. On the web the order lines sit in the right pane; Note and History are folds in the main column.
- Tile rules drawn (HM_RULES): overdue > 0 · GR ratio above 25 % · credit used above 100 % · score under 60. A failing tile:
  danger tint, value in danger, a flag icon in the corner. Within the line only Overdue and GR ratio fail; over the line
  Credit line used (108 %) fails too.
- n-5 (admin) shows the Order fold expanded to show what one tap opens; footer note "Approving clears the over-the-line
  flag". n-4 (sub-admin) shows the flag and "Send to admin", no clear action.
- Waits, not drawn: role variants of the landing, the notifications screen, the user menu; the fold open states other than
  n-5; Hold behaviour (kept as the third action).
- Assumed: Total pcs 92, limit 25 % and floor 60 are mine; web tile label reads "Credit used" for width.
