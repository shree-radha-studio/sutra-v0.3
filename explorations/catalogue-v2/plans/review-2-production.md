# Review 2 · Production (13 Oct 2026)

A judgment pass on the Production drafts, one level above the coverage review of 9 Sep (`production-coverage.md`, which
proved every BRD field exists and stands). Scope: Overview, Orders and the lifecycle, Job cards, the floor and karigar phone,
Samples, Costing, Karigars, Materials and the stock views. Not re-opened: the entry forms passed this morning
(`review-2-template-and-sell-flow.md` §3, decisions 3, 4, 13, 14: New PO nw-5, Inward nw-6, New material nw-10, New order
nw-22, New sample nw-38, Process setting step 1 nw-15). Not reviewed here: Purchase calendar / list / past / return and Process
setting steps 2–5; they wait for the density call. Nothing on the board changes until the owner answers.

**Who sits in the chair.** The production manager and merchandiser at a desk, from Tally and Excel: tables, numbers first,
Enter to the next field, two hundred active orders. The warehouse executive and the karigar on a phone: pictures, big targets,
one typed number, no money. The owner's words today: everything is a draft; final recommendations, no bold changes before the
core screens are final.

**How to read.** Stars as in review 1 (★★★★★ core · ★★★★ strong · ★★★ useful, out of the way · ★★ marginal, later · ★ cut).
Keep = as drawn · Simplify = same job, fewer choices (named) · Cut = off the board · Draw = the BRD asks, the board lacks it.
Frame ids count within `board.html?m=production` (`n-` phone light, `nd-` dark, `nw-` web light, `nwd-` dark; registration
order, `mod-production-web3.jsx:281`). Judged from the renders: `.board-check/sheet-production-<sub>.png` (one per sub-menu)
and `.board-check/production-<id>.png` (38 single frames, light and dark). Sources: F = `design-system/research/brd-final.txt`,
M = `brd-masters.txt`, B = `uploads/Business Req.txt`, X = the owner's Busy Wireframe workbook, DU = `design/during-ui-*.md`,
R1 = review 1, R2 = this morning's review, DD = `plans/desk-density.md`, P = `plans/production.md`.

---

## 1 · Verdict

1. The module is complete against the BRD and the 8 Sep brief; the lifecycle terminal (nw-23) and the floor phone (n-20, n-22,
   n-23, n-26, n-30) are the best desk-and-floor pair on the board and should become the reference for Dispatch.
2. It is over-drawn, not under-drawn: 93 screens where about 60 carry the product. Five phone frames and three web frames answer a
   question another frame already answers; retire them before sign-off, nothing is lost.
3. The desk screens are a cabin frame around a desk table: rounded 18 cards, coloured pills, 46 px rows. They become Desk density
   (R2 decision 5) by restyle, not redraw; the information architecture holds.
4. Crowding is in the toolbars and the Overview, not the pages: every web list keeps the two-row budget, but the second row carries
   two sorts and five chips where one sort and four chips fit; the Overview has seven tiles and five boxes.
5. Colour is spent on status: four hues for job states, four for order reasons, two for scores. Status as words, danger and warn only
   (R2 §1.8), fixes it everywhere in one pass.

---

## 2 · Feature tables

### 2.1 Overview (n-1, n-2, nw-1, nw-2)

**Who:** manager, merchandiser; the floor opens on Job cards. **Job:** what needs me today.

| Feature | Frames | ★ | Call | Why |
|---|---|---|---|---|
| KPI tiles (active orders · pcs in production · FG today · serviceable · delayed · unassigned · floor today) | nw-1 | ★★★★ | Simplify | B:101 asks for four; the draft shows seven at 110 px each and the subtitles clip ("9 with a job run…"). Five: Active orders · Pcs in production · FG received today · Serviceable jobs · Delayed. Unassigned is a Job cards scope; Floor today is the floor's number, not the manager's. |
| Arriving this week (POs and dye lots, what each unblocks) | nw-1, n-1 | ★★★★★ | Keep | The one list that joins Purchase, Dye and Orders (F:124, F:139). "PO-1187 waits" is the right word. |
| Four recommendation strips (High growth · Priority · Low-stock reorder · Stop) | nw-1 | ★★★ | Simplify | B:102–104 asks for them; four boxes of two cards each is where the crowding is. One ruled list "Suggestions · 9" with a reason column (High growth · Priority · Reorder · Stop) and the photo beside each number; filter chips for the four kinds. Decision 49. |
| Payments due this week pane (₹, money roles) | nw-1 | ★★★★ | Keep | F:5 dues, 30-day term; the right thing for the manager's pane. |
| Phone: four tiles + Scan · Receive · Issue + Due today + Arriving + High growth | n-1 | ★★★★★ | Keep | The floor's landing. The three buttons are the floor's three verbs; the first job row sits at 520 px because the tiles come first, which is right here. |
| Locked for a sales role, timed access request | n-2, nw-2 | ★★★ | Keep | F:26; drawn once, reused by every module. |

### 2.2 Orders and the lifecycle (n-18 … n-27, nw-20 … nw-29)

**Who:** manager, merchandiser (desk); warehouse executive (phone, issue and receive). **Main flow:** order → approval → lifecycle →
assign → issue → receive … → finished goods → Dispatch inward.

| Feature | Frames | ★ | Call | Why |
|---|---|---|---|---|
| Orders · cards (photo, colours × qty, state, progress, timeline dots) | nw-20 | ★★★ | Keep | The browse view. Not the default (decision 45). |
| Orders · list (ruled rows, lifecycle pane on click) | nw-21 | ★★★★★ | Simplify | The manager's book: 53 orders read by number. Default view. **The render has no Design column** (photo and number, F:19) between Order and Book: fix before sign-off. Restyle to Desk. |
| Order states as the BRD's words (Draft → Awaiting approval → … → Closed) | nw-20, nw-21, n-18 | ★★★★★ | Keep | F:104–114, outlined words already. |
| Reason tag (Restock · Priority · High growth · Customer shortage) | nw-20, n-18 | ★★★★ | Simplify | Filled in four hues on the phone (n-18), outlined on web: one outlined tag, no fill, same on both. |
| Lifecycle pane (timeline, karigar, pips, Issue / Receive / Print shortcuts) | nw-20, nw-21, nw-30 … nw-35 | ★★★★★ | Keep | F:145, F:293. The same pane on Orders and Job cards is the right economy. |
| Lifecycle terminal: head, progress, timeline, one panel per process, This-job pane | nw-23 | ★★★★★ | Keep | The core of the module; F:134–139 and the workbook in one screen. Two edits: the progress bar in the head is a second maroon line (make it ink); the "Stop" button needs a confirm in words. |
| Product → its production orders (F:134 "select a product and view all its orders from dropdown") | — | ★★★ | Draw | The lifecycle opens from an order only. One switch in the eyebrow: "2798 · 3 orders ▾". Gap 1. |
| Assign karigar pane (skill match, score, rate, tranches 30/30/40, note, WhatsApp) | nw-24, n-21 | ★★★★★ | Keep | F:135, M:67. "Assign Imtiaz · unlock" says the rule. |
| Issue pane: by pieces / by material, lines computed, stock beside each, sticker | nw-25, n-22 | ★★★★★ | Simplify | The typed number is "Pieces to issue for" and nothing else: right (R2 §3 rule). On web the line qty fields overlap the "bal after" meta; on the phone sheet "computed 0.4" overlaps the line. Drop the third chip "Materials only · WIP follows" into the By material mode. |
| Issue on a Direct order (Ready production) | nw-26 | ★★★★ | Keep | F:103, F:234. One variant frame is enough; the sale invoice stays in Hub (coverage Q5). |
| Receive pane: pcs by colour, settles tranche, rejected · loss · excess, over-receive held, lands as | nw-27, n-23 | ★★★★★ | Simplify | F:118 made visible. On the phone sheet (n-23) the Peach stepper overflows the sheet edge; the three number fields under it are the only typed ones: right. "Brought by · his app entry MR-00121" ties the karigar app in. |
| Receive finished goods → Dispatch inward at the destination firm | nw-28, n-24 | ★★★★ | Keep | F:121, F:288; the hand-over to Dispatch is said in words. |
| Print: A4 job card, issue and receive stickers | nw-29, n-27 | ★★★★ | Keep | F:121. Rate on the A4 for money roles only (P Q2). Phone print stays: the floor pastes stickers. |
| Phone Orders list (read only, "orders are raised at the desk") | n-18 | ★★★ | Simplify | Five rows of chrome before the first photo (310 px). Fold the sort row into the filter sheet. |
| Phone Lifecycle (head, timeline, accordion per process with tranches, inputs, Issue / Receive) | n-20 | ★★★★★ | Keep | The floor reads an order here. The inputs table at 11.5 px is a desk table on a phone: show Input · Balance only, the rest on tap. |
| Phone Scan a job (camera band → the job with inputs and the tray) | n-25 | ★★★★ | Simplify | Same body as n-30. Scan is a way in, not a second page: the camera lands on n-30. Decision 48. |
| Phone Jobber · record pieces (the karigar's own phone) | n-26 | ★★★★★ | Keep | The best floor screen on the board: photo per colour, steppers, one button, no money, "unverified until the floor checks". Needs its list (gap 2). |

### 2.3 Job cards (n-28 … n-33, nw-30 … nw-35)

**Who:** manager, merchandiser, warehouse executive. **Job:** which of 200 jobs today (F:103).

| Feature | Frames | ★ | Call | Why |
|---|---|---|---|---|
| Cards (image ⅔, job · process band, karigar, one state chip, next tranche, progress, pips) | nw-30 | ★★★★★ | Keep | F:140–145 exactly; the card budget of one chip holds. Cabin density is right for this view (pictures lead). |
| Scopes as view tabs (Active · Delayed · Upcoming · Stuck · Unassigned · Finished) | nw-30 | ★★★★★ | Keep | B:107, C:174. |
| Toolbar: search · Urgency ▾ · Group ▾ · three chips · All filters · saved view | nw-30 | ★★★★ | Simplify | Overflows at 1280 (the saved-view chip clips). Group by and the saved view live in the drawer already; the row becomes search · Urgency ▾ · Ready to issue · Waiting on floor · Tranche due today · All filters ▾. |
| All filters drawer with saved views, live count | nw-31, n-29 | ★★★★★ | Keep | The "lot of filtering and sorting views" of F:103 in one pane; the eight sorts of C:178 on the phone sheet. |
| Swimlanes by journey state | nw-32, n-31 | ★★ | Later | Owner brief (8 Sep). Six columns of 140 px; the journey state is already the chip and the scope tab. On the phone two columns, 60 % empty. Decision 46, 47. |
| Table (14 of 26 columns, pane collapsed) | nw-33 | ★★★★ | Simplify | The Tally user's view. Restyle to Desk (44 px rules, 11 px heads, status words); Export into the column menu. |
| Gantt (today line, tranche marks, overdue tail) | nw-34, n-32 | ★★ | Later | Owner brief. Half the frame is empty bars; the calendar answers "when" with the pictures. Decision 46. |
| Calendar of tranche and dye dates, day pane | nw-35, n-33 | ★★★ | Keep (web) / Cut (phone) | F:124's "calendar-project-management view", here for tranches and dye lots. On the phone the cells are blank; the Overview's Due today list does the job. |
| Phone list (one job per row, the same chip budget) | n-28 | ★★★★★ | Simplify | First photo at 310 px under five rows of chrome; fold the sort row into the sheet (D1 lands three rows). |
| Phone job opened (verification card for karigar-recorded pieces, inputs, colour-wise, history, tray) | n-30 | ★★★★★ | Simplify | The floor's page. The glass tray covers the Colour-wise table; give the body a 110 px foot. The title clips ("Embroidery · PO-…"): job number first. |

### 2.4 Samples (n-34 … n-40, nw-36 … nw-41)

**Who:** design team, manager, floor (moves). **Job:** a temporary number through any process until it is a product or dropped.

| Feature | Frames | ★ | Call | Why |
|---|---|---|---|---|
| Board: four states as tabs, cards with "No photo yet", where it is now, TBD | nw-36, n-34 | ★★★★ | Keep | B:43–44, F:25, F:257. The phone grid at 270 px is the right first picture. |
| Deployed · 15-day reading pane (day n/15, demand curve, first-order suggestion) | nw-37, n-39 | ★★★★ | Keep | F:14. The threshold is a placeholder (coverage Q4); say so on the frame until set. |
| Sample lifecycle: moves as numbered cards, in-hand strip, derived sequence | nw-39, n-35 | ★★★★★ | Keep | Owner brief; "any process, any order" is in words on the frame. On the phone the tray covers move 3: same 110 px foot. |
| New move / Receive a move pane | nw-39, nw-40, n-36, n-37 | ★★★★ | Keep | One form, two tabs; rate for money roles only. |
| Sample → product (derived sequence, averages issued ÷ 1 pc, BOM and costing preview) | nw-41, n-40 | ★★★★★ | Keep (web) / Cut (phone) | The hand-off into Process setting step 5 (nw-19). A desk decision; the phone sheet (n-40) goes. Decision 52. |

### 2.5 Costing (n-41, n-42, nw-42)

**Who:** manager, admin. Full money.

| Feature | Frames | ★ | Call | Why |
|---|---|---|---|---|
| Tabs Completed · Incomplete · Not priced · Past; cards with unit cost · margin → recommended | nw-42 | ★★★★ | Simplify | F:147. Six cards and empty space below: this is a money book, read as a ruled table (photo 32 × 40 beside the number, cost, margin, price, flag word). Decision 50. |
| Breakdown pane: materials at average rate, job rates, unit cost, margin, own price, approve, sync | nw-42, n-42 | ★★★★★ | Keep | The arithmetic is on the frame (coverage Q2). "Not assigned · ₹0" on Latkan is the right incompleteness signal. |
| Default margins per category on the toolbar, "Edit · admin" | nw-42 | ★★ | Simplify | A setting, not a filter: move to a Settings sheet off the ⋯; the toolbar keeps search · sort · four chips. |
| Phone list and breakdown (manager phone) | n-41, n-42 | ★★★ | Keep | ₹ with the lock mark; nothing for the floor. |

### 2.6 Karigars (n-43 … n-46, nw-43 … nw-47)

**Who:** manager, accounts. **Job:** who is reliable, who holds material, who is owed.

| Feature | Frames | ★ | Call | Why |
|---|---|---|---|---|
| List: skills, score, on-time, jobs, with them, due ₹, flags; karigar pane with jobs and chart | nw-43, n-43 | ★★★★★ | Simplify | M:65–67, F:150. Seven rows in a card with half the page empty; Desk rows. Score bars in ok / warn colour: numbers only, warn below 70. |
| Ledger pane, payments planned by day, "Raise payment" | nw-44, n-44 | ★★★★★ | Keep | F:5: dues per piece received, 30 days. The phone detail's tray covers the chart (same foot). |
| Unverified entries, verify pane (gate token and due on verify) | nw-45, n-45 | ★★★★★ | Keep | B:52, B:155–156. The one place karigar-recorded pieces are punched. |
| New karigar pane (eight fields) | nw-46, n-46 | ★★★ | Simplify | B:53. Follows decision 4 when it lands (main area); phone sheet goes (decision 52). |
| Analytics: reliability, load vs capacity, pieces received, delay reasons | nw-47 | ★★★ | Keep | F:150, managers. The delay-reasons donut needs a reason captured somewhere (gap 4, decision 53). |

### 2.7 Materials and the stock views (n-7 … n-13, nw-9 … nw-14)

**Who:** everyone in Production; sales roles view. Stock views: Dispatch owns FG · Material · WIP (F:207–209, R1 decision 7);
Production shows stock inline (catalogue, readiness pane, inputs table, This-job pane) and links out. No stock list to draw here.

| Feature | Frames | ★ | Call | Why |
|---|---|---|---|---|
| Catalogue grid (swatch, name, shade, stock, last inward, Low / Out) sorted newest inward | nw-9, n-7 | ★★★★★ | Keep | Owner brief; the material "photo" is a drawn swatch until photos exist (coverage Q6). Say so on the frame. |
| Material pane: ledger, where-used, supplier, price (money roles) | nw-9, n-8 | ★★★★ | Keep | M:86. |
| List view (the Desk table of the same) | nw-10 | ★★★★ | Keep | The pane form on it moves to the Hub (decision 4, decided). |
| Dye ledger: open cut orders + cut-order pane · bulk balances + bulk issue · receive a lot | nw-11, nw-12, nw-14 | ★★★★ | Keep | Owner brief, X:Dye. "What it unblocks" on receive is the right link. |
| Received lots as dye WIP | nw-13 | ★★ | Cut | It is the catalogue (nw-9) with the Dye WIP chip on; n-7 shows that chip already. |
| Phone: dye receive, dyer balances | n-10, n-11 | ★★★★ | Keep | Floor actions and a read. |
| Phone: bulk issue sheet, new cut order sheet | n-12, n-13 | ★★ | Cut | Desk decisions (merchandiser). Bulk issue at the gate is a gate-pass entry, not a Production sheet. Decision 52. |

### 2.8 The floor phone, as one set

Read together: n-1 (land), n-28 (jobs), n-30 (job), n-25 (scan in), n-22 (issue), n-23 (receive), n-24 (finished goods), n-20
(lifecycle read), n-10 (dye receive), n-26 (karigar's own phone). No ₹ anywhere on these: holds. Cabin density: holds (rounded
cards, big steppers, photo per line). What breaks the set: three tables at 11.5 px (inputs, colour-wise, history) on n-20, n-25,
n-30; the glass tray over content on n-25, n-30, n-35, n-44; a sort row under the chips on n-18, n-28, n-43. Voice: the orb is on
the island; no floor screen shows a dictated entry ("Saleem se 10 purple aaye") although R1 answer 2 makes it the rule for this
30 %. One frame of the receive sheet in its listening state would settle it.

---

## 3 · Final candidates per sub-menu

Light and dark are the same index (`n-` / `nd-`, `nw-` / `nwd-`); dark checked on nd-20, nd-28, nwd-23, nwd-30: tokens hold, no
stray hue. Edits are the ones each frame needs before sign-off; the Desk restyle (decision 5) applies to every web list and is
not repeated per line.

| Sub-menu | Phone | Web | Edits before sign-off | Retire |
|---|---|---|---|---|
| Overview | n-1 | nw-1 | Five tiles; four strips → one ruled Suggestions list (D49); the search field at 180 px (D3) | — |
| Orders & lifecycle | n-18, n-20, n-21, n-22, n-23, n-24, n-26, n-27 | nw-21 (default), nw-20, nw-23, nw-24, nw-25, nw-26, nw-27, nw-28, nw-29 | nw-21 Design column; head progress bar ink; issue-line overlap; receive stepper overflow; tray foot 110 px; reason tag outlined; phone inputs two columns; product switch in the eyebrow (gap 1) | n-25 (folds into n-30, D48) |
| Job cards | n-28, n-29, n-30 | nw-30, nw-31, nw-33, nw-35 | Toolbar to one sort and three chips; table to Desk; title order on n-30; sort row into the sheet | n-31, n-32, n-33; nw-32, nw-34 to Later (D46, D47) |
| Samples | n-34, n-35, n-36, n-37, n-39 | nw-36, nw-37, nw-39, nw-40, nw-41 | Tray foot on n-35; placeholder note on the reading threshold | n-40 (D52) |
| Costing | n-41, n-42 | nw-42 | Cards → ruled table (D50); margins to a Settings sheet | — |
| Karigars | n-43, n-44, n-45 | nw-43, nw-44, nw-45, nw-46, nw-47 | Score as a number; FAB "New karigar" off the phone; tray foot on n-44; nw-46 follows D4 | n-46 (D52) |
| Materials | n-7, n-8, n-10, n-11 | nw-9, nw-10, nw-11, nw-12, nw-14 | Swatch stand-in note; chip row to four | nw-13; n-12, n-13 (D52) |
| Floor phone | n-1, n-28, n-30, n-22, n-23, n-24, n-20, n-10, n-26 | — | Tables to two columns; tray foot; one listening-state frame (gap 3) | — |

Count after retiring: 46 → 37 phone, 47 → 42 web (nw-32, nw-34 kept on the board under Later).

### 3.1 Crowding, counted

| Web screen | Control rows | Boxes in the content area | Fold into Filters ▾ or elsewhere |
|---|---|---|---|
| nw-1 Overview | 0 | 7 tiles + 5 boxes + pane | Tiles to 5; strips to one list |
| nw-20 / nw-21 Orders | 2 | 1 + pane | Second caret (Ordered · Aug–Sep) and the fifth chip (Priority) → Filters |
| nw-23 Lifecycle | 1 | head + timeline + n panels + pane | nothing; dense but ruled |
| nw-30 Job cards | 2 | grid + pane | Group ▾ and the saved-view chip → the drawer (it has both) |
| nw-33 Table | 2 | 1 + handle | Export → the column menu |
| nw-36 Samples | 2 | grid + pane | nothing |
| nw-42 Costing | 2 | grid + pane | Margins trio + Edit → Settings |
| nw-43 Karigars | 2 | 1 + pane | Fifth chip (Unverified is a tab already) |

Phone, first picture from the top of a 844 px screen: n-1 520 (tiles first, right) · n-7 270 · n-34 270 · n-18 310 · n-28 310 ·
n-43 320 (no picture: initials) · n-20 150 · n-30 150. The lists sit one row too low because of the sort row under the chips.

### 3.2 Density, flagged

Neither Cabin nor Desk today: nw-21 Orders list, nw-33 Job table, nw-43 Karigars, nw-44 ledger, nw-45 verify (a ruled table inside
an 18 px card with a soft shadow, coloured pills, 46 px rows) and nw-42 Costing (cabin cards for a money book). All go Desk by
restyle. Cabin and right: nw-30 cards, nw-36 Samples, nw-9 catalogue, every floor phone frame. Mixed and right: nw-23 Lifecycle
(cabin head, ruled inputs), nw-1 Overview (tiles and lists), nw-39 Sample lifecycle.

---

## 4 · Gaps to draw (from the BRD), in draw order

1. **Lifecycle · product switch** (F:134): "2798 · 3 orders ▾" in the eyebrow of nw-23, listing the product's orders by state. Web only.
2. **Karigar app · my jobs**, before n-26 (B:52, B:155–156): the jobs with this karigar as photo rows (pcs with you, next due), tap →
   Record pieces; the "verified" state of a recorded entry; hand-over to another karigar as a chosen name. No ₹. Phone only.
3. **Floor phone · listening state** (R1 answer 2): the receive sheet (n-23) with the orb active and the dictated line "10 purple, 3
   rejected" filling the steppers. One frame.
4. **Late receive · delay reason** (F:150 analytics implies it; decision 53): one chip row on the receive pane when a tranche is late:
   Material short · Karigar late · Previous job late · Rework.
5. **Rework** (F:118): the rejected pieces re-issued to the same karigar as a line on the issue pane ("1 pc rework · no due raised");
   the receive pane says it, no frame shows it. Web and phone sheet.
6. **Overage approval card** for Home › Approvals (F:46): karigar score, job history, due dates, recipe, the held pieces. For the Home
   drafter, not this module.

Clean-up (no new design): retire the frames in §3; restyle the §3.2 list to Desk when decision 5 lands; add the Design column to nw-21.

---

## 5 · Decisions for the owner

Answer by number. Each one changes what gets drawn or retired. Recommended option marked ◆.

45. **Orders · default view on web.** ◆ List (nw-21, the manager's book, with the lifecycle pane), cards one click away · or cards
    first as drawn.
46. **Job cards · how many views.** ◆ Three: Cards · Table · Calendar; Swimlanes and Gantt stay on the board under Later · or all
    five as the 8 Sep brief asked.
47. **Job cards on the phone.** ◆ List, filter sheet and the opened card only; retire phone swimlanes, timeline and calendar (n-31,
    n-32, n-33) · or keep them.
48. **Scan a job.** ◆ Scan is a way in: the camera lands on the job page (n-30); n-25 retires · or keep a separate scan page.
49. **Overview.** ◆ Five tiles and one ruled Suggestions list with a reason column instead of four strips · or seven tiles and four
    strips as drawn.
50. **Costing.** ◆ A ruled table (photo beside the number, cost, margin, price, flag word) with the breakdown pane; default margins
    in a Settings sheet · or cards as drawn with margins on the toolbar.
51. **Karigar app scope.** ◆ Record pieces, my jobs, hand-over to another karigar, verified state; nothing else and no ₹ · or record
    pieces only (n-26 as drawn) · or no karigar app in phase 1 (the floor records for him).
52. **What the phone creates.** ◆ Floor entries only: issue, receive, finished-goods receive, dye receive, sample move, inward capture
    (decided); new karigar (n-46), new cut order (n-13), bulk issue (n-12), sample → product (n-40) are desk only · or keep every
    sheet on the phone.
53. **Delay reason.** ◆ Capture one reason chip when a tranche is received late, so the Karigars analytics donut is real · or drop
    the donut.

Already decided this morning and applied here without re-opening: decision 3 (Production header regroup, six buttons, search at 180
px; every Production frame shows "Se…" today), decision 4 (New PO, New material, New sample out of the pane), decision 5 (Desk
density for the lists), decisions 13 and 14 (inward card, tranches collapsed).

---

## 6 · Notes for the architect (Shrey pack)

- **Order lifecycle.** State is derived, never set: Draft · Awaiting approval · Approved · Materials pending · Ready for issue ·
  Process n issued / partially received / fully received · Final process received · FG verified · Closed; the recipe version freezes on
  approval and an input swap on a running order does not bump it (DU 9 Sep).
- **Job = order × process (× karigar when split).** Serviceability resolved server-side: Unassigned · Ready to issue · Partially
  serviceable · Waiting on floor · Waiting previous · Stuck · At karigar · Rework · Finished, plus "delayed" as a flag from tranche
  dates; required = ordered × average, issue is entered as pieces and materialised per line.
- **Tranches.** Three per job, pieces and dates, default 30 / 30 / 40 of the job's pieces, set at assignment; a receive settles the
  earliest open tranche; late = today past the tranche date with pieces open.
- **Karigar dues.** Accrue per piece at verification (not at recording), rate × pieces, 30-day term; held over-receive pieces accrue
  nothing until the PM releases them; karigar-recorded entries carry recorded-by, verified-by, verified-at; gate token and voucher are
  created at verification.
- **Material averages.** Per recipe row: material (or WIP) · average per pc · unit · colour scope (all or one colour) · process it
  feeds; the same material may appear twice with two averages; dye WIP is a material lot with lineage (dyer, cut order, source,
  shade code, loss).
- **Material stock.** On hand per shade, on order from open POs, with karigars from issues minus receives; Low only where a reorder
  level exists (M:50); the phone never receives a rate.
- **Sample read-days.** Deployment date starts a 15-day read; views, cart adds and waitlist orders per day; "high growth" is a
  threshold constant the owner sets; re-read allowed once; finalise derives sequence and averages (issued ÷ pieces) as an editable draft.
- **Costing.** Unit cost = Σ(average × average purchase rate) + Σ job rates; complete when the final process has a rate; price =
  cost ÷ (1 − margin), margin per category, admin-set; TBD in the catalogue until approved by PM or admin.
- **Gate tokens.** One per issue and receive, printed on the sticker; manual by the guard for unlinked inwards (F:57).
