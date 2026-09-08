# Production module · coverage review (9 Sep 2026)

Checked against three sources: the Production section of `design-system/research/brd-final.txt` (lines 102–150: description, batch
states and rules, sub-menus, role lines 36–38), the owner's notes given with the brief (dye ledger, sampling, material catalogue,
combined order + lifecycle, job cards over all jobs), and the plan `plans/production.md` (screen list W0–W27 / P1–P16). Every
sub-menu and option named in those sources now has a web mockup and a phone mockup on the board (New drafts › Production).
Counts: 47 web screens, 46 phone screens, each rendered light and dark. Open them at `board.html?m=production`; single
frames with `&only=n-3&z=0.8` (ids count within the module page).

## 1. BRD Production scope → mockups

| BRD line / requirement | Web | Phone |
| --- | --- | --- |
| Source material: purchase order with WhatsApp/Telegram picture capture; ad-hoc inward | Purchase orders · calendar, list, **New PO pane** (photos attached, link to a production order); Inward · PO-linked / Ad hoc toggle | PO list, New PO sheet, Inward capture |
| Purchase inward form + past inwards, search past POs by vendor, material, date | Inward · new (find a PO chip row, supplier pane, accounts card for money roles); Inward · past (GRN table, gate tokens, approval) | Inward capture (photo, lines) |
| Purchase return with automated credit note | Purchase return · lines, reason, credit note pane, past returns | Return sheet |
| Material stock in the material warehouse | Materials · catalogue (pictures, sorted by last inward, reorder level, ledger, used in) and list · New material (shades) | Materials grid, Material detail, New material sheet |
| Recipes / processes per design for 1 unit, using materials or WIPs | Process setting 1–4 (product + colours, sequence with auto WIP names, materials & averages with colour scope and "same material twice", BOM grid materials × processes with WIP rows below, colour tabs, copy to other colours, locked by production) | Process setting (sequence), Recipe view, Averages, BOM per process |
| Right pane: search other products' BOMs and view current BOMs | PSPane tabs Materials · BOMs · Search (6002 preview, copy sequence / sequence + BOM) | — (phone shows the recipe read-only) |
| Production orders: one process and karigar to start, 4–5 processes | Orders · cards (Draft, Awaiting approval, Active …), list, New order (assignment table, tranches 30/30/40, readiness pane, PM approval) | Orders list, New order sheet |
| Lifecycle per product/order with issue pending per colour; job activates when a karigar is assigned | Lifecycle · head, timeline (done ok · active blue · not started grey · stuck danger), one panel per process, this-job pane; Assign karigar pane | Lifecycle accordion, Assign sheet |
| Free part-issues / part-receives; received ≤ issued; rejection, loss, excess recorded separately; next process only from received WIP; final receipt creates finished goods | Issue pane (by pieces / by material, computed lines, balances); Receive pane (by colour, rejected, loss, excess with the over-receive rule); Receive finished goods (verification, transfer to the destination firm) | Issue, Receive, Receive FG, Scan a job |
| Batch states Approved → Materials pending → Ready for issue → Process n issued / partially / fully received → Final received → FG verified → Closed | Order pills on every order (PO-1187 Process 2 partially received, PO-1192 Materials pending, PO-1201 Ready for issue, PO-1174 FG verified, PO-1155 Closed, PO-1202 Awaiting approval, PO-1203 Draft) | same pills on the phone rows |
| Job card printed with balances, dates, rate confirmation; each issue/receive a 3 × 4 in sticker | Print · A4 job card + issue sticker + receive sticker; every history row has a sticker re-print | Print · sticker, printer picker, share PDF |
| In-stock and out-of-stock material/WIP per job (what holds the job) | This-job pane (send now / holding the next jobs); inputs table "waiting on X" / "in hand · from X"; Stuck reason chip | Job card opened (inputs with balance) |
| Job cards view, project-management style, image ⅔, info bands; tabs Active, Delayed, Upcoming, Stuck, Unassigned, Finished; filters and sorts at job level; lifecycle right pane | Job cards · cards, **All filters drawer** with saved views, swimlanes by journey state, table (column picker), gantt (today line, tranche marks), calendar (tranches and dye lots) | Job cards list, Sort & filter sheet, Swimlanes, Timeline, Calendar |
| Ready production (Direct book): karigar makes the whole piece, materials sold on paper | Issue on a Direct order (PO-1163, Gulzar Ready Garments, purchase price as job rate) | Orders list shows PO-1163 · Direct book |
| Karigar dues per piece received, 30-day term | Karigars · ledger pane (dues fall per verified receive, vouchers, payments planned) | Karigar detail (Pay button, manager role) |
| Costing: accumulating cost with breakup, completed when the last job rate is set, preset gross margin, approval by PM or admin, TBD until approved, own price | Costing · cards by tab (Completed, Incomplete, Not priced, Past), default margins per category, breakdown pane (materials at avg purchase rate, job rates, unit cost ÷ (1 − margin), own price, approve · sync) | Costing list, Cost breakdown sheet (manager phone) |
| Karigars, analytics and reports: orders, status, pcs ordered vs received, category by process, graphs | Karigars · list (score, on-time, jobs, with them, dues, flags), karigar pane (jobs, chart), Analytics (reliability bars, load vs capacity, pieces received, delay reasons donut) | Karigars list, Karigar detail |
| Roles: manager all; merchandiser no delete / approve; warehouse executive issues, POs, inwards, receives, view; sales executive none | Money (rates, values, dues) only on money-role screens with the lock mark; approval buttons say who approves; **Locked** screen for a sales role | Floor phone shows no money anywhere; Locked phone with a timed access request |

## 2. Owner notes → mockups

| Note | Where |
| --- | --- |
| Dye sheet: bulk issue 5,000 m → cut orders per shade 200 m → lot returns as dye WIP, balance 4,800 m | Dye ledger · open cut orders (reserve), bulk balances (issued − returned − loss = balance, free = balance − reserved), receive a lot (lands as "Mono net · C11 · 147 m", unblocks PO-1192), **Received (dye WIP)** cards with lineage; phone: dyer balances, bulk issue, cut order, receive |
| Dye WIPs selectable in Process setting, addable to a running order later | Materials pane filter "Dye WIP"; Peach grid row "undyed · dye lot DC-0035 due 15/09"; job panel "Add or swap an input · dye lot"; locked banner explains new orders vs running orders |
| Sampling as its own sub-menu: free moves (any process, colour, karigar, material), issue + receive per move, finalise → product with the process imported into Process setting | Samples board, **Deployed · 15-day reading**, New sample, Sample lifecycle with move cards and the new-move pane, **Receive a move**, Make product (derived sequence, averages issued ÷ 1 pc, BOM and costing preview) → Process setting 5 "Imported from S-0412 · review" |
| Material catalogue with pictures and metadata, default-sorted by inward date, also on the process-setting right pane | Materials catalogue (Swatch stand-ins until photos exist), list, material pane; Materials pane tab in Process setting sorted "Newest inward" |
| Combined production order + lifecycle; most important screens | Orders and lifecycle share one sub-menu; the lifecycle pane opens from any order card, job card or calendar day |
| Job cards board over all jobs with swimlanes, gantt, calendar | Five views plus the filters drawer; phone has cards, swimlanes, timeline, calendar |

## 3. Plan (W0–W27 / P1–P16) → built, and what was added after the review

All planned screens exist. Added after the coverage review (they were sub-menus or options named in the BRD without a screen):
PO list, New PO, Inward past, New material, Received dye WIP, Process setting 5 (imported), Orders list, Assign karigar,
Issue on a Direct order, Receive finished goods, Filters drawer, Deployed samples reading, New sample, Receive a move,
Karigar ledger, Verification of karigar-recorded entries, New karigar, Analytics, Locked role; and on the phone: overview,
PO list, new PO, return, material detail, new material, cut order, process setting, BOM, new order, print, swimlanes,
timeline, calendar, deployed reading, make product, costing list and breakdown, karigars list, karigar detail, verify,
new karigar.

## 4. Prototype comparison

Unchanged from `plans/production.md` §7: the agency prototype covers Product design setting → Production order → Production
job only; its good ideas are kept (auto WIP names, BOM grid with WIP rows, copy to other colours, "n colours × m processes =
k BOMs", pieces to issue for, history log per process, karigar-unlocks-the-job). The live walkthrough was blocked at the
sign-in page; no credentials were entered.

## 5. Decisions still open for the owner

1. Over-receive: the mockups hold excess pieces for PM verification and do not reduce the karigar's material balance. Confirm.
2. Costing arithmetic: unit cost = materials at average purchase rate + job rates; recommended price = cost ÷ (1 − margin).
   Default margins shown per category (Lehenga 40 %, Saree 35 %, Blouse 45 %); who may edit them (admin) — confirm.
3. Karigar score: starts at 70, moves with tranches met and reminders; the weights are placeholders.
4. Sample reading: 15 days, "high growth" from views, cart adds and waitlist orders; the threshold is a placeholder.
5. Ready production: the karigar's material invoice is described in the BRD but only referenced on the Direct issue screen
   (accounts side lives in Hub); confirm that is enough for the mockups.
6. Material photographs do not exist in the project; the swatch textures are stand-ins.
