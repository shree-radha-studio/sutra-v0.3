# Review 2 · CRM (13 Oct 2026)

The CRM module's drafts judged as drafts, in the review-1 format and under the review-2 template (`review-2-template-and-sell-flow.md`: one language, two densities; three rows on the phone; two control rows on the web; forms rule). Decisions 1–14 of that deck are not re-opened; this review builds on them and numbers its own decisions from 15. Nothing on the board changes until the owner answers.

**How to read the stars.** As in review 1: ★★★★★ core · ★★★★ strong · ★★★ useful, keep it out of the way · ★★ marginal, later · ★ cut. Keep = as drawn. Simplify = same job, fewer choices (the change is named). Cut = leaves the board. Draw = the BRD asks for it and the board does not show it.

**Who sits in the chair.** Salespeople and sale managers; about 30 % semi-skilled (R1 answer 2) who need voice and pictures and type as little as possible. Follow-ups and Share are daily and on the phone. Payments is the accountant's and the sale manager's desk. Journeys is the manager's desk only. Money (outstanding, credit, FY billing, bill amounts) is for manager roles; the sale executive sees catalogue prices and packet value only (F:31, F:62, `plans/crm.md` §0).

Sources: the board at `board.html?m=crm` (phone n-1…54, web nw-1…47, dark nd-/nwd-, 101 frames in light and dark), rendered 13 Oct as `.board-check/sheet-crm-follow-ups.png`, `sheet-crm-share.png`, `sheet-crm-payments.png`, `sheet-crm-customers.png`, `sheet-crm-journeys.png` (scale 0.4) and `sheet-crm-frames.png` (17 key frames at 0.8). F = `design-system/research/brd-final.txt`, M = `brd-masters.txt`, B = `uploads/Business Req.txt`, C = `design-system/guidelines/chips-filters-sorts.md` §3C, DU = `design/during-ui-business-requirements.md`, P = `plans/crm.md`, R1 / R2 = the two reviews, SCH = the design schema.

---

## 1 · Verdict

1. The shape holds: lists × journeys with the step strip, the three picture grids with gallery selection, the packet composer, the bill stages, the dossier. Every BRD line for CRM (F:93–101, B:115–117, M:56–58, M:86) has a frame; nothing core is missing and the coverage audit in `plans/crm.md` §7 stands.
2. It is crowded in the same way the rest of the board is, plus one of its own: the phone header stacks five rows (top bar · search · sub-menu scroller · lists · step strip) before the first card, and three of the five web screens carry four control rows under the header where the budget is two.
3. The phone is not picture-first where it matters: Follow-ups shows no picture until the step sheet; on Share the customer card pushes the first grid to 52 % of the screen.
4. Three pairs of frames answer the same question (Journey board vs Today; Journey map vs Bills vs Customers tabs; packet pane vs composer) and two colour systems (heat dots, score rings in three hues) sit beside the one maroon line.
5. Missing from the BRD's intent, not its lines: the sale executive's no-₹ variants, a voice-dictated note after a call, and the WhatsApp channel decision (API with automation, or the phone's WhatsApp) that the "auto" and "delivered · read" marks already assume.

Frame counts worth knowing: 54 phone and 47 web drafts, each in two themes. The recommendation below keeps 36 phone and 40 web as final candidates and cuts or folds the rest.

---

## 2 · Feature tables

### 2.1 Follow-ups

**Who:** sale executive on the phone, sale manager on both. **Main flow:** Today → step sheet (template, WhatsApp / Call / Share, outcome, note) → Done → next.

| Feature | Frames | ★ | Call | Why |
|---|---|---|---|---|
| Step strip (Reach out → Showcase → Order → Confirm → Done) with counts and overdue badge | n-1, nw-1 | ★★★★★ | Keep | The owner's one element from the reference; the map of the journey. On web the four columns already are the steps, so the strip repeats the column heads: on web drop the strip and put the counts and overdue in the column heads. |
| Journey board (web columns by step, selected customer in the pane) | nw-1 | ★★★★ | Keep | The manager's desk view. |
| Customers on the current step as cards (phone) | n-1 | ★★★★ | Simplify | No picture on the screen. Replace the "6 designs" chip with the first three attached thumbs (34 px, number under each) so the card leads with pictures. |
| Today tab (actions across lists, Overdue · Today · Waking) | n-9, nw-8 | ★★★★★ | Keep | What the BRD names ("Today's To-do", B:115) and the screen a salesperson opens first. Phone opens here (decision 15). Cut the "This week" bar-chart tile on nw-8: a chart on a to-do list. The "Today's to-do" entry in the list chooser is this tab: remove it from the chooser. |
| List chooser (Refill due · What worked · New samples · Cold revival · Hot · saved) | n-1, nw-1 | ★★★★ | Keep | F:8, F:96. Per D1 the lists row scrolls with the body on the phone, it is not pinned. |
| Step sheet / pane: template, WhatsApp group · Call · Share, attached designs, outcome chips, note, Snooze · Skip · Done → next | n-4, nw-1 | ★★★★★ | Simplify | The daily screen. Outcome chips to three (Reached · No answer · Not interested; "Call later" is Snooze). The note after a call is dictated, not typed (gap 1). |
| Step with history (comms under the step) | n-5, nw-4 | ★★★★ | Keep | F:95 "messages recorded for next-time". |
| Done → next toast with Undo | n-8, nw-7 | ★★★★ | Keep | |
| Snooze menu (7 · 14 · 30 d · till next order · pick a date · 4 reasons) | n-6, nw-5 | ★★★ | Simplify | F:96 names 14 and 30 days. Two periods, a date, one optional reason line. |
| Edit message (6 templates, placeholders, preview, language, save as team template) | n-7, nw-6 | ★★★ | Simplify | A manager's screen. The salesperson picks a template chip on the step sheet and never opens this. Keep on web; on the phone keep only the text with the placeholder chips and "Use this message". |
| Sort & filter · customers (7 sorts, 6 groups incl. taste sliders) | n-2, nw-2 | ★★★ | Simplify | Taste sliders belong to the list builder, not a daily filter. Sheet keeps Assignment · Geography · Quality · Activity · Credit. |
| New saved list (name, base, filters, sort, journey, owner, refresh) | n-3, nw-3 | ★★★ | Simplify | F:96 "pre-settable". A desk form, web only; n-3 leaves the phone. |
| History tab (module-wide log with channel chips) | n-10, nw-9 | ★★ | Simplify | A report. Keep nw-9 for the manager; n-10 leaves the phone (n-5 is the phone's history, per customer). |
| Quick chips in the tabs row (Mine · Due today · Overdue · Snoozed) | nw-1 | ★★ | Simplify | The control-row budget. Mine stays; the rest live in the Filters sheet. |

### 2.2 Share

**Who:** sale executive on the phone, daily; sale manager on web. **Main flow:** customer (from a step or the picker) → tick pictures in the three grids → packet → send to the WhatsApp group.

| Feature | Frames | ★ | Call | Why |
|---|---|---|---|---|
| Three picture grids: Purchased (pcs bought · returned, time frame remembered), Recommended (match reason), Catalogue | n-11, n-12, n-13, nw-10 | ★★★★★ | Keep | F:93 to the letter, including the owner's 8 Sep restore of the purchase grid. Tiles are pure photos with the number as the head: right. |
| Gallery selection (tick disc, accent ring, tray) | n-11, nw-10 | ★★★★★ | Keep | The owner's call: a picture picker, not a product-card picker. |
| Per-grid sort caret and Sort & filter button | n-11, nw-10 | ★★★★ | Keep | F:93 "sorts and filters should be an option in each of grids". The Purchased quick chips (Repeat · Returned · In stock) go into its sheet: the web screen then carries one toolbar line, not three. |
| "Select mode · tap a picture" banner | nw-10 | ★★ | Cut | Selection is always on in the terminal; the banner is a fourth control row. The BRD's select-mode button (F:93) is satisfied by the tray. |
| Tile overlays: reason pill + action dot + tick + number · price line | n-11, nw-10 | ★★★ | Simplify | The card budget (DU:9) is one chip. Keep the reason pill on Recommended, the pcs pill on Purchased; drop the action-tag dot. |
| Customer card (phone): name, tier, three gauges, taste bars, bands, colours, categories, tags, purchases strip | n-11 | ★★★★ | Simplify | 210 px of facts above the pictures; the grid starts at 52 % of the screen. Collapse to one line (name · tier · Customer 92 · Payment 82) with "More" opening the full card; the grid then starts near 300 px. |
| Customer pane (web, 262 px) with Info · Packets · Orders tabs | nw-10, nw-12, nw-13 | ★★★★ | Keep | F:93 "customer infos, tags, scores, recent purchase history" plus the owner's 8 Sep tabs. The Orders tab's sparkline goes (the dossier has the chart). |
| Queue strip (list · step · 3 of 12, ‹ ›) and customer picker (This step · Whole list · All customers) | n-14, nw-11 | ★★★★ | Keep | Covers F:93's "select a customer on a left pane" without a second list pane. Draw the one missing state: Share opened from the sub-menu with no customer yet (gap 4). |
| Picture viewer with "In packet" | n-17, nw-16 | ★★★★ | Keep | Customers buy from pictures; the salesperson checks the big picture before sending. |
| Verify against stock (✓ · n left · out) | n-18, nw-17 | ★★★★★ | Keep | F:94. Use the Lucide check and x, not the ✓ ✗ glyphs. |
| Packet pane (web right pane): thumbs, five option rows, Verify, Send | nw-10 | ★★★★ | Simplify | The option rows repeat the composer. The pane keeps count · value · thumbs with ✗ · Verify · "Open packet"; options are edited in one place. |
| Composer (Send to · Pictures · Video · Logo · Message · Verify · Export) | n-19, nw-18 | ★★★★★ | Keep | The BRD's packet pop-up (F:94) and the owner's option list, grouped. On the phone it is the packet sheet. |
| Send to (group, contact, broker, + contact, default per customer) | n-20, nw-19 | ★★★★ | Keep | F:94 "memory of who to send to". |
| Export (zip · PDF sheet · Excel with images · link · video reel, prices, size) | n-21, nw-20 | ★★★ | Simplify | B:117 and the owner's brief name zip · PDF · link. Excel with images and the video reel are invented: cut them. Prices Show · Hide · Customer mode stays. |
| Sent (ticks per recipient, link not opened, "mark Showcase done?") | n-22, nw-21 | ★★★★ | Keep | Closes the loop to the step. Delivery ticks assume the API (decision 22). |
| Place logo (stage, nine-point grid, size, opacity, mark, rail, apply to all) | n-23, nw-22 | ★★★★ | Keep | B:117 "easy logo putting and placement". |
| Logo on all pictures (grid of every picture with the mark) | n-24, nw-23 | ★★ | Cut | "Apply to all" on the logo screen does the job; the second frame is a preview of the first. |
| Sort menu pop | n-15, nw-14 | ★★ | Cut | The sort chips live in the Sort & filter sheet (n-16, nw-15); one door. |

### 2.3 Payments

**Who:** accounts (sub-admin) working, sale manager reading, admin on Escalate and RED. Desk first; the phone is for the call on the move.

| Feature | Frames | ★ | Call | Why |
|---|---|---|---|---|
| Stage strip (Payment due · Overdue · Issue · Escalate · RED) with count and ₹ per stage | n-25, nw-24 | ★★★★★ | Keep | F:96–101 as the map, the same element as Follow-ups. |
| Bills of the stage grouped by customer, days overdue warn → danger, "also in Escalate" pill | nw-24, n-25 | ★★★★★ | Keep | F:96 "a customer can be in multiple stages at once". |
| Customer pane / bill sheet: payment score, credit bar, bills by stage, message log with "auto", Snooze · Escalate · Log payment | n-27, nw-24 | ★★★★★ | Simplify | F:98 asks for "all relevant customer details and scores" on the call: add the Customer score and GR ratio gauges beside Payment (the dossier's row). |
| Log payment (amount, date, mode, UTR, bank, allocate oldest · pick · on account, Busy voucher note) | n-29, nw-27 | ★★★★★ | Keep | F:96 "clear bill payments bill number reference wise at random from any stage". The accountant's form; the typed number is the amount, the rest is picked. |
| Bill cleared, customer stays in two stages | n-31, nw-29 | ★★★★ | Keep | Shows the rule. |
| Escalate (to admin · agency · broker, bills, reason, note, "what happens") | n-30, nw-28 | ★★★★ | Simplify | F:13, F:100. The four-line "What happens" list becomes two lines (moves to Escalate now; admin gets the card). |
| Snooze | n-28, nw-26 | ★★★ | Simplify | As in Follow-ups: 14 · 30 d, a date. "Snooze never changes days overdue or stage" stays on the menu. |
| Bills tab (flat list with stage chips) | n-32, nw-30 | ★★ | Cut | The Journey map with group-by = customer is this screen (decision 16). |
| Customers tab (worst stage per customer, KPI tiles Collected · Promised) | n-33, nw-31 | ★★ | Cut | The Customers sub-menu with the "With overdue" chip is this screen; the KPI tiles are invented (decision 16). |
| List chooser (All bills · Platinum · Over ₹50k · Agency · Direct) | nw-24 | ★★ | Simplify | These are saved filters; they move into the Filters sheet's "Saved lists" and the row goes. One control row saved. |
| Explainer sentence row ("Overdue · past the 30 d grace · weekly WhatsApp…") with the broker-report strip | nw-24, n-25 | ★★ | Cut | The stage's rule is in Journeys; the broker-report strip is the Broker / agency tab. Second control row saved. |
| Broker / agency weekly report (rows per agency with due · overdue · issue bar, report preview, PDF, Pause, Send now) | n-34, n-35, nw-32 | ★★★★ | Keep | F:96–98. Web first; the phone keeps the list and the preview. |
| Report schedule (day, time, channel, sections, per agency, skip when) | n-36, nw-33 | ★★★ | Simplify | Web only; n-36 leaves the phone. |
| Sort & filter · bills (stage, bill, customer risk, task, automation, broker) | n-26, nw-25 | ★★★ | Keep | C:161. |

### 2.4 Customers

**Who:** sale manager on web; the salesperson opens a dossier from Follow-ups or Share.

| Feature | Frames | ★ | Call | Why |
|---|---|---|---|---|
| List sorted by follow-up due, quick chips, dossier pane, Follow up · Share | n-37, nw-34 | ★★★★ | Keep | M:56–58. Within the two-row budget on web. Chips to four (Follow-up today · Overdue · Hot · Mine); Warm and Cold to the sheet. |
| Score gauge and heat dot on every row | n-37, nw-34 | ★★★ | Simplify | Two colour systems beside the maroon line (decision 17). |
| Column chooser (24 columns) | nw-36 | ★★★ | Keep | Web only. The phone "Fields on the row" (n-39) is cut: phone rows are fixed. |
| Sort & filter · customers | n-38, nw-35 | ★★★ | Keep | Shared with Follow-ups. |
| Dossier · Info (scores, taste, bands, colours, categories, tags, credit, purchases, comms, orders vs payments chart) | n-40, nw-34 | ★★★★★ | Keep | F:47–56 as the customer's standing; the same component as the Share pane, which is right. |
| Dossier · Packets and Orders | n-41, n-42, nw-12, nw-13 | ★★★★ | Keep | The owner's 8 Sep tabs. Orders is a read-only list that links to Catalogue › Sale orders. |
| Dossier · Invoices & payments · Shipments · Returns & credit notes · Growth | n-43…46, nw-37…40 | ★★★ | Simplify | M:86 names them; they are the manager's desk. Web keeps all seven tabs; the phone keeps Info · Packets · Orders (decision 21). |
| Start a follow-up (journey, step, owner, attach, note) | n-47, nw-41 | ★★★★ | Keep | The door from a dossier into the engine. |

### 2.5 Journeys

**Who:** sale manager and admin, desk only (P §2.5; the owner's brief, 13 Oct).

| Feature | Frames | ★ | Call | Why |
|---|---|---|---|---|
| Node map (trigger · wait · step · branch · snooze · end), the default payment journey drawn, step pane with channel, template, repeat, owner, automation, snooze, broker report | nw-42 | ★★★★★ | Keep | F:96 "mind-map style flow of nodes", F:13 cadence, B:115 tier frequency. The explainer sentence under the tabs is a tooltip: cut the row. |
| Refill customer journey (same layout) | nw-43 | ★★★★ | Keep | Shows the engine runs over customers too. |
| New journey (runs over customers · bills · sale orders, trigger, copy from, tier frequency) | nw-44 | ★★★ | Keep | |
| Test run (what fires when, for one customer, nothing sent) | nw-45 | ★★★ | Keep | Cheap insurance against an automation mistake. |
| Adding a step (drop target) | nw-46 | ★★★ | Keep | |
| Publish v4 (changes, what happens to the 30 bills on v3) | nw-47 | ★★★ | Keep | Versioning is implied by "customers keep the version they entered on" (DU technical, 8 Sep). |
| Phone journey flow, read-only | n-48, n-50 | ★★★ | Keep | A manager checks the map from the phone. |
| Phone step settings · new · test · add · publish | n-49, n-51…54 | ★ | Cut | Desk work on a 390 px screen (decision 18; drawn on the owner's 9 Sep "every web view on the phone"). |

---

## 3 · Final candidates

Per sub-menu, the frames that become the final (light and dark, same numbers with nd-/nwd-) and the edits each needs before sign-off.

**Follow-ups.** Phone n-9 (opens here), n-1, n-4, n-5, n-6, n-8. Web nw-1 (opens here), nw-4, nw-5, nw-7, nw-8, nw-2, nw-3, nw-6, nw-9. Edits: three-row header per D1 (lists and strip scroll with the body); attached thumbs on the card; strip off the web board, counts into the column heads; Mine only in the tabs row; outcome chips to three; snooze to 14 · 30 · date; "This week" tile off nw-8; "Today's to-do" out of the chooser.

**Share.** Phone n-11, n-12, n-13, n-14, n-16, n-17, n-18, n-19, n-20, n-21, n-22, n-23. Web nw-10, nw-11, nw-12, nw-13, nw-15, nw-16, nw-17, nw-18, nw-19, nw-20, nw-21, nw-22. Edits: customer card collapsed to one line on the phone; select-mode banner off; Purchased chips into its sheet; action dot off the tiles; pane options folded to "Open packet"; export to zip · PDF · link; Lucide check and x on verify.

**Payments.** Phone n-25, n-26, n-27, n-28, n-29, n-30, n-31, n-34, n-35. Web nw-24, nw-25, nw-26, nw-27, nw-28, nw-29, nw-32, nw-33. Edits: list chooser and explainer rows off nw-24 (group-by chip stage · customer in the tabs row); Customer and GR gauges on the pane; escalate's "what happens" to two lines; snooze to 14 · 30 · date.

**Customers.** Phone n-37, n-38, n-40, n-41, n-42, n-47. Web nw-34, nw-35, nw-36, nw-37, nw-38, nw-39, nw-40, nw-41. Edits: chips to four; heat and score per decision 17; "Fields on the row" off the phone.

**Journeys.** Phone n-48, n-50 (read-only). Web nw-42…47. Edits: explainer row off; the phone tray keeps "Test" and loses "+", "New journey" and "Publish".

Across the module: the phone top bar follows the final's (lockup · role · cart · menu); CRM's drops the cart, and a salesperson in Share may want the cart within reach. Status stays a word in an outlined tag (R2 §1.8); the stage pills already do this.

Seen in the pictures, to fix on the way to final: the Payments (n-25…36) and Journeys (n-48…54) phone headers show the Follow-ups list row (Today's to-do · Refill due · What worked …) instead of their own lists (`CrLists` falls back to `CRM_LISTS`); the Share phone's grid tabs clip "Catalogue 612" at the right edge (n-11…13); dark frames match light throughout, no clipped captions or empty panes otherwise.

---

## 4 · Gaps to draw

In draw order, each for phone and web unless said.

1. **Follow-ups · voice note after a call** (phone). The step sheet with the orb listening and the Hinglish note dictated ("Diwali ke liye 6002 Blush chahiye"), then the outcome chip. R1 answer 2; F:95.
2. **Sale executive's no-₹ variants**: Share (phone and web customer pane without FY billing and credit), Customers list without Open book and FY billing, Dossier Info without the credit bar and the chart. F:31, M:121, the Dispatch precedent (R1 §3). Decision 19.
3. **Payments · the WhatsApp messages as the customer sees them**: the Payment due message (due date, bill, pdf link, F:97) and the Overdue reminder (amounts, bill references, F:98), as a preview on the step pane in Journeys and on the bill sheet. One frame each on web; one on the phone.
4. **Share · opened from the sub-menu with no customer**: the picker as the first thing on screen (F:93 "select a customer … through the filters or lists").
5. **Payments · RED list for the admin** if decision 20 keeps it in Payments: the RED stage opened with the hard-approach actions (admin call, broker call, legal note); if the answer is Home › Approvals, an approval card for the escalation instead (R2 D6).
6. **Follow-ups · Journey board group-by** (web): the one chip stage · customer that replaces the Bills and Customers tabs in Payments, drawn once so both engines share it (decision 16).

Clean-up (no new design): the sixteen frames cut in §2 leave the module page; `plans/crm.md` §8 is updated with the final list.

---

## 5 · Decisions for the owner

Answer by number. Each one changes what gets drawn. (1–14 are in `review-2-template-and-sell-flow.md` §6.)

15. **Follow-ups opening screen.** Phone opens on the Today tab (every action across lists, oldest first) and the Journey board sits one tab away; web opens on the board. "Today's to-do" leaves the list chooser because it is the tab. Or: both open on the board, as drawn. **Recommended: Today on the phone, board on web.**
16. **Payments tabs.** Journey map and Broker / agency only, with a group-by chip (stage · customer) on the map; the Bills and Customers tabs leave (the chips guideline C:161 names four tabs; the BRD names stages and lists). Or keep the four tabs. **Recommended: two tabs and group-by.**
17. **Heat and score colour.** Hot / Warm / Cold as a word in an outlined tag and the score ring in ink, colour only when a score is failing (danger); or the three-hue dots and rings as drawn (B:115 asks for colour-coded tiers, and a red dot on a hot customer reads as a problem). **Recommended: words and ink; colour for danger and warn only, per R2 §1.8.**
18. **Journeys on the phone.** Read-only map only (n-48, n-50); the step settings, new journey, test run, add step and publish frames leave the phone. Or keep every web state on the phone as asked on 9 Sep. **Recommended: read-only.**
19. **The sale executive's view.** Draw the no-₹ variants (gap 2) as finals beside the manager's: the executive sees catalogue prices and the packet value, never FY billing, credit line, open book or bill amounts. Or one drawing with the note "₹ for manager roles" as today. **Recommended: draw them; the developer builds from what is drawn.**
20. **RED.** A stage and list inside Payments owned by the admin (as drawn, F:101 "hard approach list"), with Escalate raising the Home › Approvals card; or RED itself as an approval item on Home. **Recommended: stage in Payments; Escalate is the approval.**
21. **Dossier on the phone.** Info · Packets · Orders only; Invoices & payments, Shipments, Returns & credit notes and Growth are web only. Or all seven tabs on the phone as drawn. **Recommended: three on the phone.**
22. **WhatsApp channel.** The WhatsApp Business API (automated journey steps, approved templates, delivery and read ticks, catalogue-link opens, as the drafts assume), or the phone's own WhatsApp through the share sheet (no automation, no ticks; the salesperson sends by hand). The API carries template approval and a per-message cost. **Recommended: API for the Payments journey and the packet's delivery state; until it is live, the packet goes out through the phone's WhatsApp and the Sent screen shows "handed to WhatsApp" without ticks.**

---

## 6 · Notes for the architect (for the Shrey pack)

Each line is something the screens imply that the BRD does not state.

- Journeys are an automation engine, not a diagram: a versioned node graph (trigger · wait · step · branch · snooze · end), customers and bills keep the version they entered on, a test run simulates one customer without sending, publish migrates or holds the ones in flight.
- A customer's position is (list, journey, step, since, snoozed-until, owner); a customer can be on two journeys at once and the Today list merges both.
- Payment stages are derived from dates (due date, grace per customer, the journey's waits), never stored; a bill moves stage with no user action, and snooze changes neither days overdue nor stage.
- WhatsApp automation needs the Business API with pre-approved templates (placeholders {first name} {bill} {amount} {days} {link}); the Sent screen's ticks and the catalogue link's open count need delivery webhooks and a tracked link.
- The packet is its own record: customer, send-to memory, tiles with picture kind, per-picture logo placement (normalised position, scale, opacity, mark), template, exports, and the result (opened · replied · ordered · no reply) that the Packets tab shows.
- Verify against stock reads live FG stock per design and colour at send time, the same call the scan pop-up makes.
- Log payment raises a Busy receipt voucher and allocates to bills (oldest first · picked · on account); Busy stays the money source of truth and the stage recomputes from the cleared bill.
- Escalate creates a Home › Approvals card for the admin, pauses the automated reminders on those bills and marks the broker report's Issue section.
- The weekly broker and agency report is a scheduled job per agency (day, time, channel, sections, skip-when rules) producing a PDF and a WhatsApp message to the agency's remembered number.
- The Recommended grid needs a match formula (state · colour · price · taste); until it exists the sort falls back to the demand score (C §3C).
- Every gauge on the board uses the Customer score formula in DU (30 % payment, 30 % billing, 25 % GR inverse, 15 % market rating) and a Payment score formula that is still open.
- Money is omitted server-side for the sale executive (M:121): FY billing, credit line, open book ₹ and bill amounts never reach the client for that role.
- The credit line is a fact on the pane, never a block (owner, 13 Oct): over-the-line is a flag on the approver's card, not a pill on the CRM list.

---

## 7 · Exemplar drawn (13 Oct, at the lead's request)

One compare pair for decision 15's recommended option, in `mod-crm-r2.jsx` (a second CRM band, "Review 2 exemplar"; the file is wired into `modules.js` at merge). Nothing else on the board changes.

- **n-55 / nd-55 · Follow-ups · Today, picture-first, three-row header.** Three rows of chrome (top bar · search island · sub-menu scroller, decision 1), then the Today · Journey board · History tabs scroll with the list. Actions grouped Overdue · Today · Waking from snooze, oldest first; every row leads with two design thumbs (the attached designs, or the customer's last-bought designs when the step has none), then the customer, the due pill and the step line, and the channel button. The first picture sits at about 250 px of 844, against none on n-1 and n-9. Sale executive's view: no money anywhere. Compare with n-1 and n-9.
- **nw-48 / nwd-48 · Follow-ups · Today with the step pane, one control row.** The same list on `WebShell3` with the view tabs carrying Mine · sort · filters as the only control row, a meta line, the grouped rows with three thumbs each, and the selected customer's step in the right pane (`StepWork`, unchanged). Compare with nw-1 (four control rows) and nw-8.

Rendered as `.board-check/sheet-crm-review-2.png`; `board-check.sh crm` mounts 206 frames with a clean console.
