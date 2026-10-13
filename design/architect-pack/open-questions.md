# Open questions that block architecture (13/10/26)

Everything undecided, grouped by module, with the screen each one gates. The first block is the fourteen decisions
of review 2 (`plans/review-2-template-and-sell-flow.md` §6), one line each: the question, the recommended option as
the review states it, and what changes for the build if the owner says yes. Then the unanswered items of review 1
(6 Oct), then what the module plans and the during-UI notes still hold open. "Gates" names the frame on the board
(module page id in brackets).

Nothing here is decided by this pack. The owner answers by number in the review files.

## 1 · The fourteen decisions of review 2 (13 Oct)

| # | Decision | Recommended | What changes if yes | Gates |
|---|---|---|---|---|
| 1 | Phone header rows | Three rows on every module, two inside the catalogue grid | Every phone screen inherits one header block; the lists row is a filter the grid scrolls away, not chrome | `catalogue` `n-16`, `n-17`, `n-18` against `f-1`; every phone frame |
| 2 | Island per role | Show only the role's modules, at most four tabs plus More and the orb | Module visibility becomes a per-role fact the shell reads before it draws navigation | every phone frame; `home` `n-1` |
| 3 | Web header cap | At most six sub-menu buttons; Production regrouped (Purchase ▾ · Materials ▾ · Recipes · Orders ▾ with Job cards · Samples · More ▾ with Costing and Karigars); search never below 180 px | Production's sub-menu tree changes; Job cards becomes a view under Orders | `production` `nw-5`, `nw-6`, `nw-10`, `nw-15`, `nw-22`, `nw-38` |
| 4 | Where a form lives | More than four fields takes the main area; the pane helps (supplier snapshot, stock, checklist). New PO, New material and New sample move; New material lives in the Hub with a quick door from the inward | Three entry forms are redrawn; the Hub owns the material master, Production links to it | `production` `nw-5`, `nw-10`, `nw-38`; `hub` `nw-6` |
| 5 | One language, two densities | Cabin (picture-led) and Desk (ruled rows) on the same tokens and chrome; the structured Dispatch look becomes the Desk density for Dispatch, Production tables, pending books, Hub lists, Reports and the Approvals queue; status as outlined words, colour only for danger and warn | Component library carries a density variant on content primitives, not two shells; the 8 Sep Dispatch band and its shell retire | `catalogue` `n-19`, `nw-15` against `f-15`, `w-9`; `dispatch` `n-27`…`n-31`, `nw-24`…`nw-27`; `plans/desk-density.md` §1 |
| 6 | Approvals in one place | Every approval is a card on Home › Approvals with the BRD's facts; the sale order page shows the state and a link, its own Approve button goes | One approvals queue across modules; sale order pages are read plus link | `home` `n-2`, `n-3`, `nw-2`; `catalogue` `f-18`, `w-10` |
| 7 | The approval card | Keep Hold as a third action; keep or move the two charts behind a Graphs tab on the phone; who clears an over-the-line flag: admin only (F:17) or sub-admin too (F:29) | Order states gain Held; the over-the-line clearance right is a role fact | `home` `n-3`, `n-4`, `n-5`, `nw-3` |
| 8 | New customer from the cart | Name, phone, city only (B:82); broker, agency, GST and credit days later in the Hub | A customer master can exist with three fields and be completed later | `catalogue` `n-10`, `nw-10` |
| 9 | Submit sheet | Due days as chips 10 · 20 · 30 · custom (default 20, F:12), priority 1–5 (default 3, B:90), the note; no credit check and nothing blocks (owner, 13 Oct); Edit and Delete while in the queue | Sale order carries due days, priority and note at submit; an in-queue order is editable by its salesperson | `catalogue` `n-11`…`n-15`, `nw-11`…`nw-14` |
| 10 | Product master | Created in the Hub (M:5) with "Save and set recipe" (Process setting pre-filled) and "Save and add photos" (Upload centre); price TBD until costing (F:103). Or created inside Process setting step 1 | Where a design is born, and what the minimum to save is (design no, category, one colour, as drawn) | `hub` `nw-2`, `n-2`; `production` `nw-15` |
| 11 | Upload centre slots | Primary per colour · side profiles × 4 · AI shoot · real-world shoot · video (F:66–71), primary image settable (F:21); phone capture per colour | Per-colour slot list and a primary flag the catalogue reads; "designs with no photo yet" queue | `hub` `nw-3`, `n-3`, `n-4` |
| 12 | xlsx import | Admin-only commit after a dry run (M:106), eight masters, products & SKUs first | Import is two acts with per-row, per-field errors between them; who may run the dry run is open (hub plan Q5) | `hub` `nw-4`, `nw-5`, `n-5`, `n-6` |
| 13 | Inward form | Supplier invoice number and date first; accounts card folded to Freight · Discount · GST with More | Field order and grouping of the inward; nothing structural | `production` `nw-6`, `n-5` |
| 14 | New production order | Tranches collapsed to "default 30 / 30 / 40" per process, opened on tap | Tranche defaults exist per process (or per order, production plan Q5) | `production` `nw-22`, `n-19` |

Rulings the lead already made on 13 Oct (`plans/desk-density.md` §6), pending the owner: toolbar chips stay pills
in both densities; Dispatch phone screens move onto the shared module header; flags are approver-side only; mixed
density per frame region, never per row; the Dispatch pane is 310 px.

## 2 · Review 1 items still unanswered (6 Oct)

| # | Question | Gates |
|---|---|---|
| R1-4 | Sale orders on the phone: cards only, table and group-by on web only? | `catalogue` `f-16`, `f-17` |
| R1-6 | Dispatch Ready and Pending: is the approved-bar version (8 Sep) the one to keep, so the older frames leave the board? Partly superseded by decision 5 | `dispatch` `nw-1`, `nw-2`, `nw-20`…`nw-23` |
| R1-7 | Stock › Material and WIP in Dispatch: managers only, read-only? | `dispatch` `n-18`, `n-19`, `nw-13`, `nw-14` |
| R1-8a | HSN code and GST rate per design, per category, or one house default (M:394, U33) | invoice review `dispatch` `nw-5`; A4 print `nw-8`; `hub` `nw-2` fields drawn empty |
| R1-8b | The discount: who sets it, per design or per colour, expiry (the "Discounted" quick chip needs it) | `catalogue` `n-3` quick chips; tag rail `n-7` |
| R1-8c | The FG low-stock rule | `dispatch` `n-17`, `nw-12`; the "Low stock" badge |
| R1-8d | Restock lead time (45 days assumed) | `dispatch` `n-15`, `nw-11` |
| R1-8e | Whether a sale executive sees godown stock in the scan pop-up (F:85 reads both ways) | `catalogue` `f-10` |

Gaps review 1 asked to draw and still not drawn: the scan camera with focus mode and Scan-to-add, search on the phone,
login and firm selector, the user menu, "Held" in Pending.

## 3 · Home

| Question | Source | Gates |
|---|---|---|
| Who approves an order raised by the approver himself (the board's logged-in user raised SO-3456)? | home plan Q1 | `home` `n-3` |
| Does Hold keep the order in the queue flagged "On hold" or move it to a Held list? The BRD only has "Holded" past due days (F:12) | home plan Q2 | `home` `n-3`; `dispatch` Pending |
| Purchase inward, production overage and costing cards: not drawn; same anatomy assumed | home plan Q3 | `home` `n-2` tabs |
| A full Notifications screen (BAU · daily · red alert, per role) | home plan Q4 | not drawn |
| The sale executive's "3 approvals waiting": a read-only view of his own orders, or the approver's queue? | home plan Q5 | `home` `n-1` |
| Payment score formula (undefined); customer score formula proposed by the owner (30 % payment, 30 % billing, 25 % return ratio inverse, 15 % initial rating; bands 1–30, 30–60, 60–100) | DU 8 Sep, home plan Q6 | standing tiles on `home` `n-3`, CRM dossier |
| Which flags the owner wants and their thresholds (GR ratio 40 % flagged, 9 % not, are the drafter's) | home plan assumptions | `home` `n-2`, `n-3` |
| Appetite split (High · Mid · Low of 100 %) definition | F:54, drawn as a stacked bar | `home` `n-3`, `nw-2` |

## 4 · Catalogue and sell flow

| Question | Source | Gates |
|---|---|---|
| Who sees a submitted order first and what the queue strip says when it goes to admin (drawn: Nalini, accounts, "since 10:42") | review-2-sell-flow assumptions | `catalogue` `n-13`, `nw-12` |
| Does the salesperson set priority at submit, and the default | same | `catalogue` `n-11` |
| Delete returns the customer's picks to cart A (owner's wording); confirm | same | `catalogue` `n-15` |
| Sale book chosen when the cart starts (In-cabin · WhatsApp); two books only? | F:16 | `catalogue` `n-9`, `f-13` |
| Promotional badges: a separate manual table per design or colour set by the sale manager; never feed a calculation | DU 8 Sep | `catalogue` `n-4`, `n-7` |
| Every recommendation chip must answer "why?" per colour with inputs, time calculated and rule version; the owner judges timing | DU 8 Sep | `catalogue` `n-5`, `n-8` |
| Quick-chip rows are admin-pinned per role per screen | DU 8 Sep | `catalogue` `n-3` |
| Executive variant of the Desk sale orders table (no flag column) still to draw | desk-density ruling 3 | `catalogue` `nw-15` |

## 5 · Dispatch

| Question | Source | Gates |
|---|---|---|
| Worker phone default: Packing picker (proposed) or Pending (BRD D:4)? | dispatch-flows Q1 | `dispatch` `n-5`, `n-3` |
| Worker tabs cut to three (To pack · Stock · Receive); packer variants of Billed and Return dropped? | dispatch-flows Q2 | `dispatch` `n-11`, `n-13`, `n-24`, `n-26` |
| "Add by picture" on the phone, or scan only? | dispatch-flows Q4 | `dispatch` `n-6` |
| Order-trail sheet (one screen for the phone call): Dispatch or Hub › customer dossier? | dispatch-flows Q5 | not drawn |
| FG inward: the worker verifies alone, or the desk? | dispatch-flows Q6, dispatch plan 5a-4 | `dispatch` `n-20`, `nw-15` |
| Where "delivered" is recorded (dispatch date + 3 days assumed; the payment journey starts on customer confirmation) | dispatch plan Q5 | `dispatch` `nw-9`; `crm` `n-25` |
| Structured set still to draw: Billed phone, Out of stock, Stock, Return, packer phone; then retire the 8 Sep band | review 2 P1-6 | `dispatch` band 1 |
| Returns taken box-wise, one box may end in several credit notes; the return desk raises the note, accounts approve | dispatch plan 5a-3 | `dispatch` `n-21`…`n-26` |

## 6 · Production

| Question | Source | Gates |
|---|---|---|
| Who approves a production order (PM for merchandiser-raised, admin for PM-raised)? | production plan Q1 | `production` `nw-22`; `home` approvals |
| Job rate on the printed job card for money roles only; the floor never sees ₹; confirm | production plan Q2 | `production` `nw-29`, `n-27` |
| Split jobs: by pieces per colour or by colour? | production plan Q3 | `production` `nw-24`, `n-21` |
| Overage: "received more than issued for" or "issued more material than the average"? Both flagged as drawn | production plan Q4 | `production` `nw-27`, `nw-25` |
| Tranche defaults per process or per order (links to decision 14) | production plan Q5 | `production` `nw-22` |
| Ready production (Direct book): does the material issue to a karigar raise a sale invoice or an accounts entry only? | production plan Q6, coverage Q5 | `production` `nw-26` |
| Dye job rate per metre: where it enters costing | production plan Q7 | `production` `nw-11`, `nw-42` |
| Sample number series, and whether a finalised sample keeps its number as the design number | production plan Q8 | `production` `nw-41`, `n-40` |
| Upcoming window for Job cards (7 days drawn) | production plan Q9 | `production` `nw-30` |
| Material low-stock rule and reorder level (U34; none exists yet) | production plan Q10, hub plan Q4 | `production` `nw-9`; `hub` `nw-6` |
| Over-receive held for PM verification, karigar balance not reduced; confirm | coverage Q1 | `production` `nw-27` |
| Costing arithmetic and default margins (Lehenga 40 %, Saree 35 %, Blouse 45 % as placeholders), who edits (admin) | coverage Q2 | `production` `nw-42` |
| Karigar score weights (starts at 70, placeholders) | coverage Q3 | `production` `nw-43` |
| Sample reading threshold for "high growth" (15 days; views, cart adds, waitlist; placeholder) | coverage Q4 | `production` `nw-37` |
| Karigar-recorded entries raise no due, voucher or gate token until verified; confirm | DU 9 Sep | `production` `n-26`, `nw-45` |

## 7 · CRM

| Question | Source | Gates |
|---|---|---|
| Follow-up journeys per list or per customer (drawn: list default, customer movable) | crm plan Q1 | `crm` `n-1`, `nw-1` |
| A step completes per customer or per contact attempt | crm plan Q2 | `crm` `n-4` |
| Who owns a customer's follow-up: the assigned executive ("Mine") or whoever picks the list | crm plan Q3 | `crm` `n-1` |
| Payment RED "hard approach list": a Payments list or a Home › Approvals item for admin? | crm plan Q5 | `crm` `n-25`; `home` |
| Which roles see ₹ on the phone in Payments (assumed manager roles) | crm plan Q6 | `crm` `n-25`…`n-36` |
| Weekly broker and agency report: per section schedule; who receives | F:96–98 | `crm` `nw-32`, `nw-33` |
| Send-to memory per customer (group, contact, both) and the packet as its own record | DU 8 Sep | `crm` `n-20`, `nw-19` |

## 8 · Studio

| Question | Source | Gates |
|---|---|---|
| Is Stitch the whole of Studio's header, or its own rail module | studio plan Q1 | `studio` header |
| One zone edit in v1 with four variations, or whole-garment re-prompts only | studio plan Q2 | `studio` `nw-3` |
| Colourways: catalogue colour names or a free palette | studio plan Q3 | `studio` `nw-2` |
| Sales data sent as raw numbers or only the demand-score band | studio plan Q4 | `studio` `nw-6`, `nw-15` |
| Who may open Stitch and save samples beyond admin and sub-admin; a design-team role does not exist | studio plan Q5 | all Studio frames |
| Save as sample always creates an S-number, or an in-between "Stitch draft" shelf | studio plan Q6 | `studio` `nw-8` |
| Materials need a work/finish tag for the zone drop; is the material master tagged | studio plan Q7 | `studio` `nw-3`, `nw-7`; `hub` `nw-6` |
| On-model preview in v1 or wait for Photoshoots | studio plan Q8 | `studio` `nw-2` |
| WhatsApp share-in to the moodboard needs a firm number attached | studio plan Q9 | `studio` `n-8`, `nw-15` |
| Which templates use which image model; usage cost to sub-admins or admin only | studio plan Q10 | `studio` `nw-14` |
| Upload centre sits under Studio in the BRD (F:275–277) and under Hub on the board; does Studio keep a thin entry | hub plan Q1 | `hub` `nw-3` |

## 9 · Hub

| Question | Source | Gates |
|---|---|---|
| Per-colour primary vs one primary per design (F:21 vs F:67); drawn as a Primary slot per colour with a star for the one that leads | hub plan Q2 | `hub` `nw-3` |
| Who may run an import dry run (only "Write it in" is restricted in M:106) | hub plan Q5 | `hub` `nw-4`, `n-6` |
| Is the real-world shoot optional per product (F:70 "if that exists"); drawn optional | hub plan Q6 | `hub` `nw-3` |
| Which slots a saree or a blouse needs (F:277 asks for button sets per category); only the lehenga set is drawn | hub plan Q7 | `hub` `nw-3` |
| Minimum to save a product: design no, category, one colour (assumed) | hub plan assumptions | `hub` `nw-2` |
| Master views, Reports, Report builder, Compare beyond the shell (M §1–2) once the forms are agreed | review 2 P2-14 | not drawn |

## 10 · Shell and cross-cutting

| Question | Source | Gates |
|---|---|---|
| Login and firm selector (admin sees all firms, F:28); user menu (F:289); permission request sheet (24 h · 1 w · 1 m · 3 m, F:26) | review 1 gaps 5, later | not drawn |
| Search on the phone (the catalogue's top field, F:82) | review 1 gap 4 | `catalogue` `f-1` |
| Voice search and the agent orb must understand Hindi / Hinglish product talk; required, not phase 2 | owner 6 Oct | `catalogue` `f-4`, `w-4` |
| Offline: what still works when LIVE goes OFFLINE ("Showing the last loaded list") | dispatch plan §0 | `dispatch` every node |
| Multi-firm: six separate firms with their own GST and accounting under one owner (F:4); the cross-firm transfer module (Channels) is not drawn | F:4, 8 Sep map | not drawn |
| Busy ERP push: credit notes and invoices go to Busy after approval (dispatch plan 5a-3); the scope of the Busy link is not drawn anywhere | dispatch plan | `dispatch` `nw-19` |
| Direct purchase vendors: designs bought whole as pieces for trading; the firm may "sell" material to them (F:234) | F:234 | `production` `nw-26` |

## 11 · From the during-UI technical notes (`design/during-ui-technical-design.md`)

These are the drafters' observations about what the screens need that the BRD does not state. They are notes, not
requirements, and the architect should read them in the original with their dates. In short: the catalogue card
chip and its "why?" must be resolved per colour for the requesting surface and role; lifecycle read state must be
queryable; promotional badges are a separate manual table; facet counts respect firm scope and money permissions. A
recipe is per design per colour with a frozen version per order, and a job is order × process (× karigar when
split). Dye WIP is a material lot with lineage. Samples move without a recipe. CRM positions are (list, journey,
step, since, snoozed-until, owner); the packet is its own record; bill stage is derived from dates, never stored by a
snooze; journeys are versioned. Stitch tracks are the unit of memory; "what was sent" must be reproducible verbatim;
renders carry the "AI render" mark in metadata. Verification state on issue/receive rows creates dues, vouchers and
gate tokens at verification time. The approvals card is one payload per approval kind resolved for the approver's
role. Upload centre needs per-colour slot state and a primary flag. Import needs a dry run returning per-row, per-field
errors before a separate commit.
