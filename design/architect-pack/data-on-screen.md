# Data on screen (13/10/26)

One table per module, one row per screen. Columns: the frame id and caption as the board shows them; what the screen
reads (business objects, in the BRD's words); what it changes (actions, in words); the role the drawing is for; whether
money is visible and to whom. Derived from the component bodies and the captions in `explorations/catalogue-v2/`, read
against the module plans. "(implied)" marks something the drawing shows that the BRD does not state. "(assumed)" marks
a role or rule the drafters chose and logged. Where the board's data is a fictional placeholder and the real source is
not obvious, the Reads cell says what it would plausibly be, flagged implied. Nothing here is a data model: the objects
are named as the business names them.

Vocabulary: design (a design number), colour, SKU (design × colour), customer, cart, sale order, invoice, shipment,
bill and payment, credit note, PO (purchase order), material and material lot (dye WIP), recipe, production order, job
card, karigar, supplier, sample, user/role, firm, gate token, stock (FG · material · WIP), packet (a WhatsApp share),
follow-up list, journey and step, track and version (Studio).

## Catalogue (finals `f-`/`w-`, drafts on page `catalogue`)

**Catalogue grid and product**

| Frame | Caption | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| `f-1` / `w-1` | Catalogue grid · active cart | designs with primary photo per colour, stock state, saved lists, quick chips, the active cart's counts | adds a piece or colour set to the active cart; switches the active cart | salesperson | catalogue price only |
| `f-2` | Catalogue grid · no active cart | same | taps start a cart | salesperson | catalogue price |
| `f-3` / `w-2` | List view | designs as rows with stock by colour | none (read) | salesperson, staff checking stock | catalogue price |
| `f-4` / `w-4` | Listening · orb pressed | the spoken query, matches | searches by voice (Hindi / Hinglish, owner 6 Oct) | any | none |
| `f-5` | Filters & sort · save as list | facets (category, colour, work, price band, stock, tags), saved lists | applies filters and sort; saves a list | salesperson | price band facet |
| `f-6` / `w-5` | Product · customer view | design, colours, pictures, price, promotional badges; no stock, no system tags | adds to cart (salesperson's cart stays his) | customer in the cabin, through Customer mode | price only |
| `f-7` | Salesperson view · stock & production | design, per-colour free · reserved · in production, open orders | none (read); the manager sets badges on the tag rail (`n-7`) | salesperson, sale manager | catalogue price |
| `f-8` | Salesperson view · recipe & media | recipe summary, media slots, "Media centre · Upload" button (button only; the Upload centre is drawn in Hub) | none | salesperson | none |
| `f-9` / `w-6` | Salesperson view · analytics & orders | demand score, pcs sold by colour, orders for this design | none | sale manager (analytics for managers, 6 Oct) | yes · sold ₹ for manager (assumed) |
| `f-10` | Scan · recognised-product pop-up | the scanned SKU, its colours, stock per colour (whether the executive sees godown stock is open R1-8e) | Add piece · Add colour set · "all carts" switch (owner 6 Oct) | salesperson | catalogue price |
| `f-11` / `w-14` | Full-screen viewer | pictures and video per colour | none | any | none |
| `n-3` / `nw-5` | Grid · action chip + state pill, quick chips | per card one recommendation chip and one stock state, resolved per surface and role (implied); quick chips per role | applies a quick chip; opens the sort & filter drawer | sale executive (chips In stock · New · High growth · Priority sale · Discounted) | catalogue price |
| `n-4` | Grid · customer mode, promotional badges only | designs with price and manual badges; system tags, stock and lists stripped | none | customer | price only |
| `n-5` / `nw-6` | Why? · tap an action chip | the inputs that produced the chip per colour, when calculated, rule version (implied) | none | sale manager (long press, review 1) | none |
| `n-6` | Sort & filter sheet | sorts, grouped filters with counts, save view | applies; saves a view | salesperson | price band |
| `n-7` / `nw-7` | Salesperson view · tag rail, customer sees, demand | action tags, colour tags, about tags, promotional badges, demand by colour, open sale orders pane | sale manager sets Trending · Bestseller · Low stock · Staff pick · Clearance | sale manager | yes · manager (sold ₹) |
| `n-8` / `nw-8` | Why sheet · inputs, score over time, by colour | the demand score history and inputs per colour | none | sale manager | none |
| `n-16`, `n-17`, `n-18` | Grid · calmer headers (compare with `f-1`) | as `f-1` | as `f-1` | salesperson | catalogue price |

**Carts and the sell flow**

| Frame | Caption | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| `f-12` / `w-7` | Carts · grouped by design, totals | the salesperson's carts, each a customer and a sale book; lines grouped by design with pcs and totals | activates a cart; opens a cart card; "New customer" and "+" open the new cart sheet; Submit for approval | salesperson | yes · the cart's own totals |
| `f-13` | Cart card · double tap on a cart chip | one cart: customer, sale book (In-cabin · WhatsApp), lines, total | edits quantities; switches the sale book; submits | salesperson | yes · cart total |
| `n-9` / `nw-9` | Carts · new cart sheet | recent customers with last order date; sale books | starts a cart for a picked customer | salesperson | none |
| `n-10` / `nw-10` | Carts · new customer sheet | name, phone, city required; broker, agency, GST optional; credit days and transport under More | creates a customer with three fields and starts the cart (B:82) | salesperson | none |
| `n-11` / `nw-11` | Cart · submit for approval | customer summary, pcs, total, design photos; due days 10 · 20 · 30 · custom (default 20); priority 1–5 (default 3); note with mic | submits the order; nothing blocks (owner 13 Oct) | salesperson | yes · this order's total only; no credit facts |
| `n-12` | Cart · sent for approval | the new SO number, "you can edit or delete until it is approved"; Share with customer · Open order | none | salesperson | yes · order total |
| `n-13` / `nw-12` | Sale orders · my order in the queue | the order with status IN QUEUE, the queue strip (who holds it, since when: implied) | Edit order; Delete | salesperson | yes · order total |
| `n-14` / `nw-13` | Sale orders · editing SO-3456 as cart A | the order reopened as a cart with live steppers | Send changes (back to the queue, flagged "edited after submit"); Discard changes | salesperson | yes · total |
| `n-15` / `nw-14` | Sale orders · delete, in words | the order | deletes; picks return to cart A (owner's wording, assumed) | salesperson | none |

**Sale orders, returns, analytics**

| Frame | Caption | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| `f-15` / `w-8` | Sale orders · cards | orders by tab Raised · Approved · Dispatched · Cancelled · Returns; customer, bill, pcs, designs, broker; order preview pane (web) | print; share | salesperson, sale manager | yes · order amounts |
| `f-16` / `w-9`, `nw-1`, `nw-2` | Sale orders · table, column filter, column chooser | the same as columns; footer totals | filters a column; chooses columns and presets | sale manager (desk) | yes |
| `f-17` | Sale orders · group by | grouped by customer / agency / status with counts and ₹ | groups | sale manager | yes |
| `f-18` / `w-10` | Sale order · opened | customer bar (payment score, credit), lines with photo and colour, total, status; customer pane (web) | Edit; Approve (decision 6 proposes removing Approve here) | sale manager | yes |
| `n-19` / `nw-15` | Sale orders · Desk density | as `f-15` / `w-9` in ruled rows; the manager's table carries the approver flags | as above | sale manager (flags); executive variant to draw | yes · manager |
| `n-1`, `n-2` / `nw-3`, `nw-4` | Returns · cards, table, credit note pane | sale returns with "back in stock" / "on approval" state, the credit note | none (returns are made in Dispatch) | sale manager, accounts | yes · credit note amounts |
| `f-19` / `w-11` | Analytics · orders vs dispatch | orders vs dispatched series, pipeline by status, weekday | range and date chips | sale manager and above (6 Oct) | yes |
| `f-20` / `w-12` | Analytics · designs (SKU) | pcs and orders per design, colour split, trend, category share | range | sale manager | yes |
| `f-21` / `w-13` | Analytics · customers | sale vs payments, tier split, city, overdue per customer | range | sale manager | yes · overdue in danger tone |

## App shell (page `appshell`)

| Frame | Caption | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| `f-14` | Side menu · all modules | the user (name, designation, firm), modules and sub-menus the role holds | navigates; theme and show/hide modules are in the user menu (not drawn) | any (drawn as a salesperson) | none |
| `w-3` | Sidebar expanded · collapsible sub-menus | the same on web, with the firm selector for admin (F:28, not drawn) | navigates | any | none |
| `nw-1` | Search · stage 1 · scope, recent, for you | scope buttons (module), recents, habits ("for you") per user (implied) | sets scope | any | none |
| `nw-2` | Search · stage 2 · matches by section | matches grouped by section (designs, customers, orders, materials) with the filter & sort chooser; results respect firm scope and money permissions (implied) | opens a match | any | per role |

## Home (page `home`, all drafts)

| Frame | Caption | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| `n-1` | Home · sale executive landing | Today tiles (orders, pcs, approvals waiting on his own orders), Needs you rows, quick links, three notifications (BAU · daily · red alert) | quick links navigate | sale executive | none (no ₹ tile for this role) |
| `nw-1` | Home · landing on the web shell | four Today tiles including Billed today, Needs you in two columns with approval counts, quick links, orders this week; notifications pane grouped red alerts / daily / BAU; Day · Month · Year | quick links | sale manager (logged-in RM) | yes · Billed today |
| `n-2` / `nw-2` | Approvals · queue | approvals by kind (Sale orders · Returns · Purchase inwards · Overages · Costing); per card: party, order no, ₹, pcs, flag chips in words, raised by, date, lead design photo; flagged first | opens a card | sale manager, accounts (approvers) | yes |
| `n-3` / `nw-2` | Approvals · sale order card | the order (lines with photo, qty, rate, stock per colour; note; due days; priority), customer standing (payment score, customer score, GR ratio, FY billing, overdue, open bills), credit line as a bar (line, open, this order, free), appetite split, last three orders with Order · Invoice · Return links, two 12-month series (customer orders vs payments, agency orders vs payments); "Look twice" strip of flags | Reject · Hold · Approve; qty steppers on lines; "Mark for inspection → owner" | sale manager within the line | yes |
| `n-4` / `nw-3` | Approvals · flagged, over the credit line (sub-admin) | as `n-3` plus the over-the-line flag and amount; the bar's last segment in danger | Reject · Hold · Send to admin | sub-admin / accounts | yes |
| `n-5` | Approvals · flagged, admin approves | as `n-4` | Approve | admin | yes |
| `n-6` | Approvals · sale return card | the return (pieces coming back, from which invoice), the bills returned from, return ratio before and after, standing tiles, "stock on approval" note, two small charts | Reject · Hold · Approve | sale manager, accounts | yes |
| `n-7` | Gate pass · tokens (Auto tab) | auto tokens made by floor entries (sale invoice, production issue, purchase inward) with Verified / Active state | Verify a token; New manual token | guard | none |
| `nw-4` | Gate pass · token list, token pane (Manual tab) | manual tokens (sale return, purchase inward without PO): party, kind, parcels, kind of stock, claimed qty, made by | makes a manual token (drop-downs over ledgers, products, materials) | guard | none |

## Hub (page `hub`, all drafts)

| Frame | Caption | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| `nw-1` | Masters · products grid, census chips, alerts | the census (count per master, ITEMS and LEDGERS), alerts (low stock, no photo, never scored, documents not linked), products grid with free · FG · in production per design, "No photo yet" state; product dossier pane (Overview · Sales · Production · BOM & materials · Stock ledger · Barcodes) | opens a dossier; alerts open pre-filtered lists; New product | accountant, analyst, sale manager | yes · price and sold ₹ with a lock mark for money roles |
| `n-1` | Masters · products list on the phone | the same as rows; alerts as chips | New product floats above the island | same | yes · with lock |
| `nw-2` | New product · master form and checklist | identity (design no, name, category, work, book / firm), colours with swatch, primary radio and photo slot, price "TBD until costing", HSN and GST (empty, open), "Active on online" switch, tags later; checklist pane | Save · Save and set recipe (→ Process setting) · Save and add photos (→ Upload centre) | accountant, analyst; price is admin's | yes · price field locked to admin |
| `n-2` | New product · master sheet on the phone | design no, category, colours with a camera each | Save and add photos | salesperson, analyst | none |
| `nw-3` | Upload centre · product 8591, checklist per colour | per colour the slots Primary (model shoot) · Side 1–4 · AI shoot · Real-world shoot (optional) · Video with state (done, uploading, empty); uploads in flight; "104 designs with no photo yet"; progress pane | uploads; sets the primary image; starts the queue | salesperson or analyst at the desk | none |
| `n-3` | Upload centre · capture per colour | the design and colour, slot being shot, "2 of 7 done" | captures; picks from gallery | salesperson on the phone | none |
| `n-4` | Upload centre · the no-photo queue | designs without a photo ordered by demand (implied), done today, Mine | opens the next design to capture | salesperson | none |
| `nw-5` / `n-5` | Import · pick the master | eight masters, recent imports; template pane with expected columns | picks; Next · fill the template; Download template | admin or owner | none |
| `nw-4` / `n-6` | Import · check the file (dry run) | the file, counts (creates · updates · errors · skipped), per-row per-field errors in words | Download errors; Write it in (admin only, desk only, disabled until errors are fixed) | admin or owner | yes · price column visible to the admin importer |
| `nw-6` / `n-7` | New material · master form and checklist | code, name, group, unit, shades with swatch, supplier, source city, purchase rate, reorder level (open U34), tags; "Already in the master" pane to stop doubles | Save | accountant, analyst | yes · purchase rate locked to money roles; not on the phone |

## Production

### Phone

**Overview**

| Frame | Caption (from the registration block) | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| n-1 ScreenPOverview | Overview · tiles, due today, arrivals, high growth | production order, job card, PO, karigar, design, sample | none (read only) | production manager (assumed) | no · note says dues live on the desk |
| n-2 ScreenPLocked | Production · locked for a sales role | user/role, approval request (implied) | asks admin for access | sales executive | no |

**Purchase**

| Frame | Caption (from the registration block) | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| n-3 ScreenPPOList | Purchase orders · list | PO, supplier, material, production order | none (read only); opens new PO | warehouse executive / merchandiser (assumed) | no |
| n-4 ScreenPNewPO | Purchase · new PO sheet | PO, supplier, material, production order | raises PO; attaches WhatsApp photos | merchandiser (assumed) | yes · money roles only (rate per line, locked) |
| n-5 ScreenPInward | Purchase · inward capture with lot photo | PO, supplier, material lot, gate token | logs inward with lot photo; sends to approval | warehouse executive | no · "rates on the desk" |
| n-6 ScreenPReturn | Purchase · return sheet | material lot (GRN), supplier, credit note | logs purchase return; prints delivery note | warehouse executive | no · credit note built by accounts on desk |

**Materials**

| Frame | Caption (from the registration block) | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| n-7 ScreenPMaterials | Materials · catalogue grid | material, material lot / dye WIP, supplier, stock (material) | none (read only) | everyone in Production (assumed) | no |
| n-8 ScreenPMaterial | Material · detail, ledger, used in | material, stock (material), design, supplier, dye WIP | adds to recipe; raises PO; adds photo | production (assumed) | no |
| n-9 ScreenPNewMaterial | Materials · new material sheet | material, supplier | creates material with shades | warehouse / merchandiser (assumed) | no · rate stays on desk |
| n-10 ScreenPDyeReceive | Dye · receive a cut order | dye WIP (cut order), karigar (dyer), material, gate token, production order | logs dye lot receive; prints lot label | dye desk / warehouse executive (assumed) | no |
| n-11 ScreenPDyers | Dye · dyer balances | karigar (dyer), material lot / dye WIP, stock (material) | none (read only); opens bulk issue | dye desk (assumed) | no |
| n-12 ScreenPBulkIssue | Dye · bulk issue sheet | karigar (dyer), material, gate token | issues undyed fabric to dyer | dye desk (assumed) | no |
| n-13 ScreenPCutOrder | Dye · new cut order sheet | karigar (dyer), material, dye WIP, production order, gate token | raises cut order | dye desk (assumed) | no · rate set on desk |

**Process setting**

| Frame | Caption (from the registration block) | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| n-14 ScreenPSetting | Process setting · sequence, steps | design, colour, recipe, material | saves recipe sequence | production manager (assumed) | no |
| n-15 ScreenPRecipe | Recipe · view per colour | design, colour, recipe, material, dye WIP, production order | none (read only) | production (assumed) | no |
| n-16 ScreenPAverages | Averages · edit | recipe, material, colour | edits averages per piece | production manager (assumed) | no |
| n-17 ScreenPBom | BOM · per process, one colour | recipe, material, dye WIP, colour | ticks BOM cells; copies colour | production manager (assumed) | no |

**Orders & lifecycle**

| Frame | Caption (from the registration block) | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| n-18 ScreenPOrders | Orders · list | production order, design, colour, job card | none (read only); orders raised on desk | production (assumed) | no |
| n-19 ScreenPNewOrder | New production order sheet | production order, design, colour, recipe, material, karigar | saves draft; submits for approval | production manager | no · rates set on desk |
| n-20 ScreenPLifecycle | Lifecycle · timeline, process accordion | production order, job card, karigar, colour | opens issue; opens assign | warehouse executive / PM (assumed) | no |
| n-21 ScreenPAssign | Assign karigar sheet | job card, karigar, production order, dye WIP | assigns karigar; sets tranches; splits job | production manager (assumed) | no · rate on desk |
| n-22 ScreenPIssue | Issue · pieces to issue for | job card, karigar, material, dye WIP, colour, stock (material) | issues material against job; scans lot | warehouse executive | no |
| n-23 ScreenPReceive | Receive · pcs by colour, loss, rejection | job card, colour, dye WIP | logs receive with rejection and loss | warehouse executive | no |
| n-24 ScreenPReceiveFG | Receive · finished goods, verification | job card, colour, stock (FG) | logs final receive as finished goods | warehouse executive | no |
| n-25 ScreenPScan | Scan a job QR → issue or receive | job card, production order, material lot | opens issue or receive | warehouse executive (floor) | no |
| n-26 ScreenPJobber | Jobber · the karigar records on his phone | job card, karigar, colour | records pieces (unverified) with lot photo | karigar (jobber) | no |
| n-27 ScreenPPrint | Print · sticker, printer, share | job card, gate token | prints job card or stickers | floor / desk (assumed) | no · floor copy prints without rate |

**Job cards**

| Frame | Caption (from the registration block) | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| n-28 ScreenPJobs | Job cards · list | job card, production order, design, karigar | none (read only) | floor roles (assumed) | no |
| n-29 ScreenPJobsFilters | Job cards · sort & filter sheet | job card filters, saved views (implied) | saves view; applies filters | floor roles (assumed) | no |
| n-30 ScreenPJob | Job card · opened, issue / receive | job card, production order, karigar, colour, gate token (history) | opens issue or receive | warehouse executive (assumed) | no |
| n-31 ScreenPSwimlanes | Job cards · swimlanes | job card, karigar | moves card by long-press (implied) | production (assumed) | no |
| n-32 ScreenPGantt | Job cards · timeline | job card, production order, karigar | none (read only) | production manager (assumed) | no |
| n-33 ScreenPCalendar | Job cards · calendar | job card, dye WIP (cut order), karigar, design | none (read only) | production (assumed) | no |

**Samples**

| Frame | Caption (from the registration block) | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| n-34 ScreenPSamples | Samples · list | sample, design, karigar | none (read only); opens new sample | design team / PM (assumed) | no · "Price TBD" chip only |
| n-35 ScreenPSample | Sample · lifecycle, moves | sample, karigar, material, dye WIP | opens new move; opens receive; adds photo | design team / PM (assumed) | no |
| n-36 ScreenPNewMove | Sample · new move sheet | sample, karigar, material, dye WIP, colour, gate token | issues a sample move | design team / floor (assumed) | no · rate set on desk |
| n-37 ScreenPSampleReceive | Sample · receive a move | sample, karigar, dye WIP, material, gate token | logs move receive; names WIP; logs loss | floor / design team (assumed) | no |
| n-38 ScreenPNewSample | Sample · new sample sheet | sample, colour, user (designer) | creates sample | design team (assumed) | no · target price on desk |
| n-39 ScreenPSampleDeployed | Sample · deployed, 15-day reading | sample, design, demand reading (implied) | re-reads; makes product | production manager (assumed) | no |
| n-40 ScreenPFinalise | Sample → product sheet | sample, design, recipe, material, dye WIP, karigar | creates product and recipe | production manager (assumed) | no · costing stays on desk |

**Costing**

| Frame | Caption (from the registration block) | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| n-41 ScreenPCosting | Costing · list (manager phone) | design, sample, production order, costing (implied) | none (read only) | manager | yes · manager only (cost, margin, price) |
| n-42 ScreenPCostBreakdown | Costing · breakdown sheet | design, material, job card rates, costing | approves price; sets own price | manager | yes · manager only |

**Karigars**

| Frame | Caption (from the registration block) | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| n-43 ScreenPKarigars | Karigars · list | karigar, job card | none (read only); opens new karigar | production manager (assumed) | no |
| n-44 ScreenPKarigar | Karigar · detail, jobs, chart | karigar, job card, material (with them), ledger | raises payment; verifies entry; WhatsApp | manager (lock glyph) | yes · manager only (dues, pay) |
| n-45 ScreenPKarigarVerify | Karigar · verify an entry | karigar, job card, colour, gate token | verifies or rejects jobber entry | floor / PM (assumed) | no |
| n-46 ScreenPNewKarigar | Karigars · new karigar sheet | karigar, firm (GST), skills (process master) | adds karigar | production manager (assumed) | no · rate card "desk", locked |

### Web

**Overview**

| Frame | Caption (from the registration block) | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| nw-1 WebPOverview | Overview · tiles, arrivals, recommendations, dues pane | production order, job card, PO, karigar, design, sample, stock (FG) | none (read only); links out | production manager | yes · money roles (karigar dues pane) |
| nw-2 WebPLocked | Production · locked for this role | user/role | asks admin for access | sales executive | no |

**Purchase**

| Frame | Caption (from the registration block) | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| nw-3 WebPPurchaseOrders | Purchase orders · calendar, PO pane | PO, supplier, material, production order | none (read only) | merchandiser (assumed) | yes · money roles (PO pane rate × qty, locked) |
| nw-4 WebPPOList | Purchase orders · list | PO, supplier, material, production order | none (read only) | merchandiser (assumed) | yes · money roles (PO pane, locked) |
| nw-5 WebPPONew | Purchase orders · new PO pane | PO, supplier, material, firm (book), production order | raises PO | merchandiser (assumed) | yes · money roles (rates) |
| nw-6 WebPInward | Purchase inward · from a PO, variance, accounts card, supplier pane | PO, supplier, material lot, firm (consignee), supplier invoice | takes inward; saves draft; sends to approval | warehouse executive; accounts approves | yes · money roles (rate, value, locked) |
| nw-7 WebPInwardPast | Purchase inward · past, GRN pane | material lot (GRN), supplier, PO, gate token | re-prints; starts return | warehouse executive / accounts (assumed) | yes · money roles (value, locked) |
| nw-8 WebPReturn | Purchase return · credit note pane | material lot (GRN), supplier, credit note, PO | raises purchase return; prints CN and delivery note | warehouse executive / accounts | yes · money roles (rate, value, credit) |

**Materials**

| Frame | Caption (from the registration block) | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| nw-9 WebPMaterials | Materials · catalogue, material pane | material, dye WIP, supplier, stock (material), design (used in) | none (read only) | production; sales view (assumed) | yes · money roles (rate avg in pane, locked) |
| nw-10 WebPMaterialNew | Materials · list, new material pane | material, supplier, stock (material) | creates material | merchandiser (assumed) | yes · money roles (rate column, purchase rate, locked) |
| nw-11 WebPDye | Dye ledger · open cut orders, new cut order pane | dye WIP (cut order), karigar (dyer), material, design, production order | raises cut order | dye desk / merchandiser (assumed) | yes · money roles (rate per m, locked) |
| nw-12 WebPDyeBulk | Dye ledger · bulk balances, movements, bulk issue pane | karigar (dyer), material lot / dye WIP, gate token | issues bulk undyed fabric | dye desk (assumed) | no |
| nw-13 WebPDyeReceived | Dye ledger · received lots as dye WIP | dye WIP, material, karigar (dyer), supplier | none (read only) | dye desk (assumed) | yes · money roles (material pane rate, locked) |
| nw-14 WebPDyeReceive | Dye ledger · receive a lot, what it unblocks | dye WIP (cut order), karigar (dyer), production order, job card, gate token | logs lot receive; unblocks job | dye desk (assumed) | yes · money roles (dyer due, locked) |

**Process setting**

| Frame | Caption (from the registration block) | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| nw-15 WebPSetting1 | Process setting · product, sequence, steps, materials pane | design, colour, recipe, material, stock (material) | sets product and sequence | production manager (assumed) | no |
| nw-16 WebPSetting2 | Process setting · materials & averages, colour scope | recipe, material, dye WIP, colour, stock (material) | edits averages and colour scope | production manager (assumed) | no |
| nw-17 WebPSetting3 | Process setting · BOM grid Sky, BOMs pane | recipe, material, dye WIP, colour | ticks BOM per process | production manager (assumed) | no |
| nw-18 WebPSetting4 | Process setting · Peach copied, locked, search pane | recipe, colour, production order (lock), other designs' recipes | copies colour; saves incomplete recipe | production manager (assumed) | no |
| nw-19 WebPSetting5 | Process setting · imported from S-0412 for review | recipe, sample, material, dye WIP, karigar, design | reviews and saves recipe | production manager (assumed) | no |

**Orders & lifecycle**

| Frame | Caption (from the registration block) | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| nw-20 WebPOrders | Orders · cards with draft and awaiting states, lifecycle pane | production order, design, colour, job card, karigar | none (read only) | production manager (assumed) | no |
| nw-21 WebPOrdersList | Orders · list | production order, design, colour, job card | none (read only); column chooser | production manager (assumed) | no |
| nw-22 WebPNewOrder | New production order · assignment, tranches, readiness pane | production order, design, recipe, material, stock (material), karigar, firm, user | saves draft; submits; previews job cards | production manager | yes · money roles (rate per pc, cost preview) |
| nw-23 WebPLifecycle | Lifecycle · head, timeline, job panels, this-job pane | production order, job card, karigar, colour, material, dye WIP, gate token | opens issue / receive; stop | production manager / warehouse (assumed) | yes · money roles (job rate, due, locked) |
| nw-24 WebPAssign | Lifecycle · assign a karigar pane | job card, karigar, dye WIP | assigns karigar; sets rate and tranches | production manager (assumed) | yes · money roles (rate per pc, locked) |
| nw-25 WebPIssue | Lifecycle · issue pane, by pieces or by material | job card, karigar, material, dye WIP, colour, stock (material), gate token | issues material against job | warehouse executive (assumed) | no |
| nw-26 WebPIssueDirect | Lifecycle · issue on a Direct order (Ready production) | production order (Direct book), karigar, colour, gate token | issues Direct order pieces | production manager (assumed) | yes · money roles (rate per pc, locked) |
| nw-27 WebPReceive | Lifecycle · receive pane, rejection, loss, over-receive | job card, karigar, colour, dye WIP, gate token | logs receive with rejection and loss | warehouse executive (assumed) | yes · money roles (karigar due, locked) |
| nw-28 WebPReceiveFG | Lifecycle · receive finished goods, verification, transfer | job card, karigar, colour, stock (FG), firm (transfer) | logs final receive as FG; verifies | warehouse executive (assumed) | yes · money roles (locked) |
| nw-29 WebPPrint | Print · job card A4, issue and receive stickers | job card, production order, karigar, gate token | prints; re-prints challan | desk | yes · job card for money roles; floor copy no rate |

**Job cards**

| Frame | Caption (from the registration block) | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| nw-30 WebPJobCards | Job cards · cards, lifecycle pane | job card, production order, design, karigar | none (read only) | production (assumed) | no |
| nw-31 WebPJobFilters | Job cards · all filters drawer, saved views | job card filters, saved views (implied) | saves view; applies filters | production (assumed) | no |
| nw-32 WebPSwimlanes | Job cards · swimlanes by journey state | job card, karigar | drags card to reassign or issue (implied) | production (assumed) | no |
| nw-33 WebPJobTable | Job cards · table, pane collapsed | job card, production order, design, karigar | exports; chooses columns | production (assumed) | no |
| nw-34 WebPGantt | Job cards · gantt, today line, tranche marks | job card, production order, karigar | drags bar end to move tranche date (implied) | production manager (assumed) | no |
| nw-35 WebPCalendar | Job cards · calendar of tranche and dye dates, day pane | job card, dye WIP (cut order), karigar, design | none (read only) | production (assumed) | no |

**Samples**

| Frame | Caption (from the registration block) | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| nw-36 WebPSamples | Samples · board, moves pane | sample, design, karigar, material | none (read only) | design team / PM (assumed) | yes · money roles (target, cost so far in pane) |
| nw-37 WebPSamplesDeployed | Samples · deployed, 15-day reading pane | sample, design, demand reading (implied) | re-reads; drops; makes product | production manager (assumed) | yes · money roles (target price) |
| nw-38 WebPSampleNew | Samples · new sample pane | sample, colour, user (designer) | creates sample | design team (assumed) | yes · money roles (target price, locked) |
| nw-39 WebPSample | Sample · lifecycle, moves, new move pane | sample, karigar, material, dye WIP, colour, gate token | issues move; deploys; sends to costing | design team / PM (assumed) | yes · money roles (rate, cost so far, locked) |
| nw-40 WebPSampleReceive | Sample · receive a move pane | sample, karigar, dye WIP, material, gate token | logs move receive | floor / design team (assumed) | yes · money roles (cost this move, locked) |
| nw-41 WebPFinalise | Sample → product · derived sequence, averages, BOM preview | sample, design, recipe, material, dye WIP, karigar | creates product and recipe | production manager (assumed) | yes · money roles (costing draft) |

**Costing**

| Frame | Caption (from the registration block) | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| nw-42 WebPCosting | Costing · cards, margins, breakdown pane | design, sample, production order, material, job card rates, costing | approves and syncs price; edits default margins (admin) | production manager / admin | yes · money roles only |

**Karigars**

| Frame | Caption (from the registration block) | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| nw-43 WebPKarigars | Karigars · list, karigar pane | karigar, job card, material (with them), ledger | none (read only) | manager | yes · manager roles (due, locked) |
| nw-44 WebPKarigarLedger | Karigars · ledger pane, payments planned | karigar, job card, ledger / vouchers, payments | raises payment voucher; prints statement | manager / accounts (assumed) | yes · manager roles |
| nw-45 WebPKarigarVerify | Karigars · unverified entries, verify pane | karigar, job card, production order, colour, gate token | verifies or rejects jobber entry | floor / PM (assumed) | no |
| nw-46 WebPKarigarNew | Karigars · new karigar pane | karigar, firm (GST), skills, rate card | adds karigar; sends app invite | production manager (assumed) | yes · money roles (rate card, locked) |
| nw-47 WebPKarigarAnalytics | Karigars · analytics | karigar, job card, material (with them) | none (read only) | production manager (assumed) | yes · money roles (material at cost KPI) |

## Dispatch

### Phone

**Ready orders**

| Frame | Caption (from the registration block) | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| n-1 ScreenDReady | Ready · customer cards, priority ring | customer, sale order, design, colour, stock (FG) | PACK (flips orders to packing) | manager on floor (assumed) | no |
| n-2 ScreenDReadyFilters | Ready · sort & filter sheet | filters (due, stock, tier, priority) | applies sort and filter | manager (assumed) | no |

**Pending orders**

| Frame | Caption (from the registration block) | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| n-3 ScreenDPending | Pending · manager (₹) | customer, sale order, design, colour, stock (FG) | none (read only) | manager | yes · manager (rate, amount, total) |
| n-4 ScreenDPendingPacker | Pending · packer (no ₹) | customer, sale order, design, colour, stock (FG) | none (read only) | packer | no |

**Packing**

| Frame | Caption (from the registration block) | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| n-5 ScreenDPicker | Packing · picker (customer → box) | customer, sale order, parcel (shipment box), invoice state | opens box; creates new box | packer | no · "no rates on this phone" |
| n-6 ScreenDScan | Packing · scan, tally, accepted | parcel, SKU (piece serial), design, colour | scans piece into box | packer | no |
| n-7 ScreenDScanRejected | Packing · scan rejected | parcel, SKU serial, customer, rejection reason | none (scan again) | packer | no |
| n-8 ScreenDReview | Packing · review box, remove confirm | parcel, design, colour | removes line; closes parcel | packer | no |
| n-9 ScreenDInvoiced | Packing · box invoiced | parcel, invoice | none (read only) | packer | no |

**Billed**

| Frame | Caption (from the registration block) | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| n-10 ScreenDBilled | Billed · invoices · manager (₹) | invoice, sale order, customer, design, colour | starts return; re-prints | manager | yes · manager (amounts, totals) |
| n-11 ScreenDBilledPacker | Billed · invoices · packer | invoice, sale order, customer, design, colour | starts return; re-prints | packer | no · "amounts hidden for your role" |
| n-12 ScreenDInvoiceSheet | Billed · invoice sheet · manager | invoice, customer (score, broker), shipment (delivered) | starts return; re-prints A4 | manager | yes · manager |
| n-13 ScreenDInvoiceSheetPacker | Billed · invoice sheet · packer | invoice, customer, shipment | starts return; re-prints A4 | packer | no |
| n-14 ScreenDShipments | Billed · shipments history | shipment, customer (consignee), transporter, broker, invoice, gate token | re-prints transport doc (implied) | manager (assumed) | no |

**Out of stock**

| Frame | Caption (from the registration block) | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| n-15 ScreenDOOS | Out of stock · order and restock cards | design, colour, sale order shortage, job card, karigar, restock suggestion | none (read only); links to Production | dispatch / production manager (assumed) | no |
| n-16 ScreenDOOSFilters | Out of stock · sort & filter sheet | filters (sourcing, karigar, production state) | applies sort and filter | same (assumed) | no |

**Warehouse stock**

| Frame | Caption (from the registration block) | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| n-17 ScreenDStockFG | Stock · finished goods | SKU (design + colour), stock (FG), production order | none (read only) | manager / warehouse (assumed) | no |
| n-18 ScreenDStockMat | Stock · material | material, stock (material), supplier, PO | none (read only) | warehouse executive (assumed) | no |
| n-19 ScreenDStockWIP | Stock · work in progress | design, colour, job card, karigar, stock (WIP) | none (read only) | production roles (assumed) | no |
| n-20 ScreenDFGInward | Stock · FG inward, verify | job card, karigar, design, colour, gate token, stock (FG) | verifies finished goods into stock | warehouse / dispatch (assumed) | no |

**Sale return**

| Frame | Caption (from the registration block) | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| n-21 ScreenDRet1 | Return · 1 customer, boxes, bills | customer, parcel count, invoice, sale order | saves draft; picks bills | manager (assumed) | no |
| n-22 ScreenDRet2 | Return · 2 pieces, scan | SKU serial, design, colour, invoice | scans or taps pieces; edits qty | manager (assumed) | yes · order price in scan toast (lines hidden) |
| n-23 ScreenDRet3 | Return · 3 preview · manager (₹) | return lines, invoice, blockers | raises credit note; adds note | manager | yes · manager |
| n-24 ScreenDRet3Packer | Return · 3 preview · packer | return lines, invoice, blockers | raises credit note; adds note | packer | no |
| n-25 ScreenDRet4 | Return · 4 credit note · manager | credit note, invoice, parcel, approval state | prints note; next return | manager | yes · manager |
| n-26 ScreenDRet4Packer | Return · 4 credit note · packer | credit note, invoice, parcel | prints note; next return | packer | no |

**Structured · Ready**

| Frame | Caption (from the registration block) | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| n-27 ScreenDsReady | Ready · rows, priority tag, PACK | customer, sale order, design, colour, stock (FG) | PACK | floor (assumed) | no |

**Structured · Pending**

| Frame | Caption (from the registration block) | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| n-28 ScreenDsPending | Pending · packer (no ₹) | customer, sale order, design, colour, stock (FG) | none (read only) | packer | no |
| n-29 ScreenDsPendingMgr | Pending · manager (₹) | customer, sale order, design, colour | none (read only) | manager | yes · manager (rate, amount) |

**Structured · Packing**

| Frame | Caption (from the registration block) | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| n-30 ScreenDsScan | Packing · scan, tally | parcel, SKU serial, sale order, design, colour | scans piece into box; types serial | packer (assumed) | no |
| n-31 ScreenDsReview | Packing · review box | parcel, design, colour | adds line; keeps; confirms and closes box | packer (assumed) | no |

### Web

**Ready orders**

| Frame | Caption (from the registration block) | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| nw-1 WebDReady | Ready · queue rail, cards, pending pane | customer, sale order, design, colour, stock (FG) | PACK; sorts and filters | dispatch manager (assumed) | yes · pending pane only (rates); none on board |

**Pending orders**

| Frame | Caption (from the registration block) | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| nw-2 WebDPending | Pending · full node, queue rail, customer pane | customer (score, open book), sale order, design, colour, stock (FG) | none (read only); links to OOS and dossier | manager | yes · manager roles (rate, amount, ₹ total) |

**Packing**

| Frame | Caption (from the registration block) | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| nw-3 WebDPacking | Packing · terminal, live invoice | customer, sale order, parcel, design, colour, invoice (live) | packs pieces; adds parcel; closes parcel | dispatch manager (desk) | yes · right pane only (live invoice) |
| nw-4 WebDPackingScan | Packing · scan armed, rejected, remove confirm | parcel, SKU serial, design, colour, invoice | scans; removes line after confirm | dispatch manager (desk) | yes · right pane only |
| nw-5 WebDInvoiceReview | Packing · invoice review (bill-to, GST) | invoice, customer (bill-to ledgers), firm (GST), parcel | edits qty and rate; confirms invoice | dispatch manager (desk) | yes · desk (editable rates, GST) |
| nw-6 WebDInvoiceDone | Packing · invoice done, select for shipment | invoice, parcel, gate token (implied) | selects parcels; creates shipment; prints | dispatch manager (desk) | yes · desk (totals) |
| nw-7 WebDShipmentSheet | Packing · close shipment sheet | shipment, customer (consignee), transporter, broker, parcel, invoice | issues transport document | dispatch manager (desk) | yes · pane dimmed under sheet; none on sheet |
| nw-8 WebDPrint | Print · A4 invoice and transport document | invoice, shipment, customer, firm, gate token | prints; shares PDF on WhatsApp | desk / accounts (assumed) | yes · full |

**Billed**

| Frame | Caption (from the registration block) | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| nw-9 WebDBilled | Billed · sale invoices, invoice pane | invoice, sale order, customer (score, broker), design, colour | starts return; opens dossier; re-prints | manager / accounts (assumed) | yes · manager roles |
| nw-10 WebDShipments | Billed · shipments history, transport doc pane | shipment, customer (consignee), transporter, broker, parcel, invoice, gate token | re-prints transport doc; shares | manager / accounts (assumed) | no |

**Out of stock**

| Frame | Caption (from the registration block) | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| nw-11 WebDOOS | Out of stock · counts, cards, who-is-waiting pane | design, colour, sale order shortage, customer, job card, karigar, restock suggestion | promises a date; calls; opens Production | dispatch / production manager (assumed) | no |

**Warehouse stock**

| Frame | Caption (from the registration block) | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| nw-12 WebDStockFG | Stock · finished goods, SKU pane | SKU (design + colour), stock (FG free / reserved / coming), production order | reserves stock for a customer (implied) | manager (assumed) | yes · list price in SKU pane (implied) |
| nw-13 WebDStockMat | Stock · material, supplier pane | material, stock (material), supplier, PO, last GRN | raises PO | warehouse executive / manager (assumed) | yes · GRN rate per m in pane (implied) |
| nw-14 WebDStockWIP | Stock · WIP, karigar pane | design, colour, job card, karigar, stock (WIP) | opens job card | production roles (assumed) | yes · karigar pane (material at cost, rate, due) |
| nw-15 WebDFGInward | Stock · FG inward, gate token pane | job card, karigar, design, colour, gate token, production order, stock (FG) | verifies finished goods into stock; opens lifecycle | warehouse / dispatch (assumed) | no |

**Sale return**

| Frame | Caption (from the registration block) | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| nw-16 WebDRet1 | Return · 1 customer at the counter | customer, parcel count, gate token (guard), invoice, sale order | saves draft; picks bills | dispatch manager (desk) | no |
| nw-17 WebDRet2 | Return · 2 pieces, desk scanner | SKU serial, design, colour, invoice, credit note (building) | scans pieces; edits qty; chooses note split | dispatch manager (desk) | yes · desk (rates at order price) |
| nw-18 WebDRet3 | Return · 3 preview, blockers, notes pane | return lines, invoice, credit note, shipment (blocker), approval | raises credit notes; saves draft; marks shipment delivered | dispatch manager (desk) | yes · desk (totals) |
| nw-19 WebDRet4 | Return · 4 credit notes raised, recent notes | credit note, invoice, parcel, approval state (accounts) | prints; shares on WhatsApp; next return | desk / accounts (assumed) | yes · desk |

**Ready & Pending (on the approved bar)**

| Frame | Caption (from the registration block) | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| nw-20 WebDReady3 | Ready · in-stock filter on, pane = all pending as a journey | customer, sale order (journey state), design, colour, stock (FG) | PACK; filters | dispatch manager (assumed) | yes · pane bill column, manager roles |
| nw-21 WebDReadySel | Ready · order picked, pane = that order, All pending goes back | customer, sale order, design, colour, stock (FG) | PACK; picks order | dispatch manager (assumed) | no · order pane without money |
| nw-22 WebDPendingGrid | Pending · four situations, grid, order pane | customer, sale order (situation), design, colour, approval state | none (read only) | manager | yes · manager (bill in order pane) |
| nw-23 WebDPendingList | Pending · list view | customer, sale order, transporter, broker, journey | none (read only) | manager | yes · manager (bill column) |

**Structured · Ready / Pending / Packing / Billed**

| Frame | Caption (from the registration block) | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| nw-24 WebDsReady | Ready · node strip, ruled table, pending pane | customer, sale order, design, colour, stock (FG) | PACK; filters | dispatch manager (assumed) | no · "no rates here"; pane without money |
| nw-25 WebDsPending | Pending · flat tabs, three-level table, order pane | customer, sale order, design, colour, stock (FG) | none (read only) | manager | yes · manager roles (rate, amount in pane) |
| nw-26 WebDsPacking | Packing · terminal, boxes, live invoice | customer, sale order, parcel, SKU serial, design, colour, invoice (live) | scans; adds box; selects for shipment; closes shipment | manager (desk) | yes · live invoice pane, manager |
| nw-27 WebDsBilled | Billed · invoices table, invoice pane | invoice, customer, sale order, shipment, firm (GST) | exports; opens invoice | manager / accounts (assumed) | yes · manager roles (totals, GST) |

## CRM

### CRM phone

| Frame | Caption (from the registration block) | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| **Follow-ups** | | | | | |
| n-1 ScreenCrFollow | Follow-ups · today, step strip, cards | Follow-up lists, journey/step counts, customers on the step (heat, score, last contact, attached designs) | None (read only); Mine chip, sort | Sales (header); sale manager / executive | No |
| n-2 ScreenCrFollowFilter | Follow-ups · sort & filter sheet | As n-1 plus the customer sort & filter sheet (assignment, geography, quality, taste) | Filters and sorts the list; saves a view | Sales | No; sort by revenue / outstanding offered |
| n-3 ScreenCrFollowNewList | Follow-ups · new saved list | As n-1 plus the saved-list sheet: base list, filters, sort, journey, owner, refresh | Creates a saved follow-up list | Sales (list owner) | No |
| n-4 ScreenCrFollowStep | Follow-ups · step sheet | As n-1 plus the step sheet: template, customer, attached designs, outcome, note | Marks step done, snoozes, skips, records outcome, WhatsApp / call / share | Sales | No |
| n-5 ScreenCrFollowStepHist | Follow-ups · step with history | As n-4 plus comms history (packets, calls, sale order raised) | Same as n-4 | Sales | No |
| n-6 ScreenCrFollowSnooze | Follow-ups · snooze | As n-1 plus the snooze sheet: periods, date, reason | Snoozes the customer 7 / 14 / 30 d with a reason | Sales | No |
| n-7 ScreenCrFollowTemplate | Follow-ups · edit message | As n-1 plus the template editor: placeholders, preview, language | Edits the message; saves as a team template | Sales | No; price placeholder only |
| n-8 ScreenCrFollowNext | Follow-ups · done, next customer | As n-1 plus a toast: customer moved to Order | Step done, next customer; undo | Sales | No |
| n-9 ScreenCrFollowToday | Follow-ups · Today tab | Today's actions grouped Overdue / Today / waking from snooze; step, journey, channel, owner | Call or WhatsApp from the row | Sales | No |
| n-10 ScreenCrFollowHistory | Follow-ups · History tab | Follow-up activity log: date, customer, step, outcome, by whom | None (read only); filter chips | Sales | No |
| **Share** | | | | | |
| n-11 ScreenCrShare | Share · customer, Recommended grid, selection tray | Customer head (scores, taste, tags, purchases), queue strip, recommended designs with match reason, packet tray | Selects designs into the packet | Sales (sale executive / manager) | Catalogue price only; packet value |
| n-12 ScreenCrSharePurch | Share · Purchased grid, time frame | As n-11 on the Purchased tab: bought designs, pcs bought / returned, time frame | Picks time frame (remembered per customer); selects | Sales | Catalogue price only |
| n-13 ScreenCrShareCat | Share · Catalogue grid | As n-11 on the Catalogue tab: all designs | Selects designs | Sales | Catalogue price only |
| n-14 ScreenCrSharePicker | Share · customer picker | As n-11 plus the customer picker sheet: customers on this step, whole list, all | Switches the customer | Sales | Catalogue price only (base) |
| n-15 ScreenCrShareSort | Share · sort menu | As n-11 plus the grid sort menu | Sorts the grid; saves default for the customer | Sales | Catalogue price only (base) |
| n-16 ScreenCrShareFilter | Share · sort & filter sheet | As n-11 plus the filter sheet with the customer-context group | Filters the grid; saves a view | Sales | Catalogue price only (base) |
| n-17 ScreenCrShareViewer | Share · picture viewer, in packet | Design: photos, price, category, stock, in production (implied), photoshoot / video counts | Adds to or removes from the packet | Sales | Catalogue price only |
| n-18 ScreenCrShareVerify | Share · verified against stock | As n-11 with stock state per selected design (out, low, ok) | Removes out-of-stock designs | Sales | Catalogue price only |
| n-19 ScreenCrPacket | Share · packet sheet (composer) | As n-11 plus the composer: send-to (WhatsApp group, contact, broker), pictures, video, logo, template, stock check, export | Sends the packet; exports | Sales | Catalogue price only |
| n-20 ScreenCrShareContacts | Share · send to | As n-11 plus the contact sheet: group, contacts, broker, e-mail | Picks recipients; remembers the default | Sales | Catalogue price only (base) |
| n-21 ScreenCrShareExport | Share · export | As n-11 plus the export sheet: zip, PDF, Excel, catalogue link, video | Downloads files; logs on packet history | Sales | Catalogue price only; show / hide toggle |
| n-22 ScreenCrShareSent | Share · sent | As n-11 plus the sent sheet: delivery per recipient, link opens | Marks step done, next customer; opens history | Sales | Catalogue price only (base) |
| n-23 ScreenCrLogo | Share · place logo | Design photo with the firm logo, selected-designs rail, position / size / opacity | Places the logo on this picture or all | Sales | No |
| n-24 ScreenCrLogoAll | Share · logo on all pictures | Selected designs (product, photoshoot, video frame) with the logo | Applies the logo to all | Sales | No |
| **Payments** | | | | | |
| n-25 ScreenCrPay | Payments · stages, bills | Bill stage strip with ₹ per stage, bills of the stage (customer, broker, days overdue, amount), weekly broker report strip | None (read only); Mine, sort | Accounts / sale manager (header says Sales) | Yes · stage totals, bill amounts · accounts and sale manager |
| n-26 ScreenCrPayFilter | Payments · sort & filter sheet | As n-25 plus the bill filter sheet (stage, bill, customer risk, broker) | Filters bills; saves a list | Accounts / sale manager | Yes · amount filters |
| n-27 ScreenCrPayBill | Payments · bill sheet | As n-25 plus the customer-at-stage sheet: payment score, credit line, bills across stages, message log | Logs payment, snoozes, escalates, calls | Accounts / sale manager | Yes · bills, credit line |
| n-28 ScreenCrPaySnooze | Payments · snooze | As n-25 plus the snooze sheet | Snoozes bills; stage and days unchanged | Accounts | Yes (base) |
| n-29 ScreenCrPayLog | Payments · log payment | As n-25 plus the log sheet: amount, mode, UTR, bills to allocate | Logs payment, allocates to bills; receipt voucher to Busy (implied) | Accounts | Yes · payment and bill amounts |
| n-30 ScreenCrPayEscalate | Payments · escalate | As n-25 plus the escalate sheet: to admin / agency / broker, bills, reason | Escalates bills to admin; pauses automation | Accounts | Yes · bill amounts |
| n-31 ScreenCrPayCleared | Payments · bill cleared, 3 stages | As n-27 with the bill cleared by number; customer stays in other stages | None (result state) | Accounts | Yes |
| n-32 ScreenCrPayBills | Payments · Bills tab | All bills grouped by stage: customer, broker, days, amount | None (read only); stage chips | Accounts / sale manager | Yes |
| n-33 ScreenCrPayCustomers | Payments · Customers tab | Customers with bill counts, worst stage, outstanding; collected / promised KPIs | None (read only); chips | Accounts / sale manager | Yes |
| n-34 ScreenCrPayBrokers | Payments · Broker / agency | Agencies with brokers, customers, due / overdue / issue split, last sent | Calls; opens the PDF | Accounts / sale manager | Yes · agency outstanding |
| n-35 ScreenCrPayReport | Payments · report preview | As n-34 plus the report sheet: bills by section, total outstanding | Sends now, pauses, PDF | Accounts | Yes |
| n-36 ScreenCrPaySchedule | Payments · report schedule | As n-34 plus the schedule sheet: day, time, channel, sections, per agency | Saves the report schedule | Accounts / sale manager | Yes (base) |
| **Customers** | | | | | |
| n-37 ScreenCrCustomers | Customers · list | Customer list: follow-up dot, heat, tier, last order, open book ₹, score | Calls; sort, filter, fields | Sale manager (₹ shown) | Yes · open book · sale manager |
| n-38 ScreenCrCustFilter | Customers · sort & filter | As n-37 plus the filter sheet | Filters; saves a view | Sale manager | Yes (base) |
| n-39 ScreenCrCustColumns | Customers · fields on the row | As n-37 plus the field chooser (identity, follow-up, money, quality, people, tags) | Picks row fields | Sale manager | Yes (base); money field group |
| n-40 ScreenCrDossier | Dossier · Info | Customer: scores, FY billing, taste, bands, colours, tags, credit line, purchases, comms; orders vs payments | Starts follow-up; opens Share | Sale manager | Yes · FY billing, credit line |
| n-41 ScreenCrDossPackets | Dossier · Packets | Packets sent: date, designs, recipient, template, logo, result | Re-sends; adds to packet | Sales | No |
| n-42 ScreenCrDossOrders | Dossier · Orders | Sale orders: number, status, pcs, amount, paid state; orders vs payments graph | None (read only) | Sale manager | Yes · order amounts |
| n-43 ScreenCrDossInvoices | Dossier · Invoices & payments | Invoices with payment state and reference; open / paid KPIs | None (read only) | Sale manager / accounts | Yes · invoice amounts |
| n-44 ScreenCrDossShipments | Dossier · Shipments | Shipments: transporter, boxes, pcs, delivered / returned | Calls transporter; opens document | Sales | No |
| n-45 ScreenCrDossReturns | Dossier · Returns & credit notes | Credit notes against invoices: pcs, reason, amount; GR ratio | None (read only) | Sale manager | Yes · credit note amounts |
| n-46 ScreenCrDossGrowth | Dossier · Growth | FY billing vs last FY, orders, share of wallet (implied), tier appetite | None (read only) | Sale manager | Yes · FY billing |
| n-47 ScreenCrCustStart | Customers · start a follow-up | As n-37 plus the start sheet: journey, start step, owner, attached designs | Adds the customer to a journey step | Sale manager | Yes (base) |
| **Journeys** | | | | | |
| n-48 ScreenCrJourney | Journeys · payments flow | Payment journey as a vertical flow: trigger, waits, steps, branch, RED | None; test, new, publish buttons | Sale manager / admin (assumed) | No |
| n-49 ScreenCrJourneyStep | Journeys · step settings | As n-48 plus the step sheet: channel, template, repeat, owner, automation, snooze, broker report | Saves or removes the step | Sale manager / admin (assumed) | No; amount placeholder only |
| n-50 ScreenCrJourneyRefill | Journeys · Refill flow | Refill customer journey: list trigger, steps, order branch, cold revival | None (read only) | Sale manager (assumed) | No |
| n-51 ScreenCrJourneyNew | Journeys · new journey | As n-48 plus the new-journey sheet: runs over, trigger, copy from, tier frequency, owner | Creates a draft journey | Sale manager / admin (assumed) | No |
| n-52 ScreenCrJourneyTest | Journeys · test run | As n-48 plus the simulation sheet: dated steps for one customer and bill | Re-runs the simulation; nothing sent | Sale manager / admin (assumed) | Yes · one bill amount |
| n-53 ScreenCrJourneyAdd | Journeys · adding a step | As n-48 with a ghost new step dropped in the flow | Adds a step | Sale manager / admin (assumed) | No |
| n-54 ScreenCrJourneyPublish | Journeys · publish | As n-48 plus the publish sheet: version diff, bills on the old version, migration choice | Publishes the journey version | Sale manager / admin (assumed) | No |

### CRM web

| Frame | Caption (from the registration block) | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| **Follow-ups** | | | | | |
| nw-1 WebCrFollow | Follow-ups · board by step, step pane | Follow-up lists, step strip, customers by step as columns; step pane (template, attached designs, outcome, note) | Step done → next, snooze, skip, WhatsApp / call / share | Sale manager / executive (plan) | No |
| nw-2 WebCrFollowFilter | Follow-ups · sort & filter | As nw-1 plus the customer sort & filter sheet | Filters; saves a view | Sale manager | No; sort by revenue / outstanding offered |
| nw-3 WebCrFollowNewList | Follow-ups · new saved list | As nw-1 plus the saved-list sheet | Creates a saved list | Sale manager (list owner) | No |
| nw-4 WebCrFollowHist | Follow-ups · step pane with history | As nw-1 with comms history in the step pane | Same as nw-1 | Sale manager / executive | No |
| nw-5 WebCrFollowSnooze | Follow-ups · snooze | As nw-1 plus the snooze popover | Snoozes the customer with a reason | Sale manager / executive | No |
| nw-6 WebCrFollowTemplate | Follow-ups · edit message | As nw-1 plus the template editor sheet | Edits message; saves template | Sale manager / executive | No; price placeholder only |
| nw-7 WebCrFollowNext | Follow-ups · done, next customer | Board after a move: card in Order, toast, next customer in the pane | Undo | Sale manager / executive | No |
| nw-8 WebCrFollowToday | Follow-ups · Today tab | Today's actions grouped; step pane; week bars and done / reached / packets KPIs | Call or WhatsApp; step actions | Sale manager / executive | No |
| nw-9 WebCrFollowHistory | Follow-ups · History tab | Activity log table (date, customer, step, outcome, by); customer pane | Download; filter chips | Sale manager (₹ in pane) | Yes · FY billing, credit line in pane |
| **Share** | | | | | |
| nw-10 WebCrShare | Share · terminal (customer · Purchased, Recommended, Catalogue grids · packet) | Customer pane (scores, FY billing, taste, tags, credit, purchases, comms), queue strip, three design grids, packet pane | Selects designs; verify stock; send | Sale manager / executive | Yes · catalogue prices, packet value, FY billing, credit · sale manager |
| nw-11 WebCrSharePicker | Share · customer picker | As nw-10 plus the customers-on-this-step popover | Switches customer | Sale manager / executive | As nw-10 (base) |
| nw-12 WebCrSharePackets | Share · customer pane · Packets tab | As nw-10 with packet history: date, designs, recipient, template, logo, result | Re-sends; adds to packet | Sale manager / executive | Catalogue price only (grids) |
| nw-13 WebCrShareOrders | Share · customer pane · Orders tab | As nw-10 with sale orders: number, status, pcs, amount, paid state, orders vs payments | None in tab | Sale manager | Yes · order amounts, catalogue prices |
| nw-14 WebCrShareSort | Share · sort menu on a grid | As nw-10 plus the sort menu | Sorts; saves default for the customer | Sale manager / executive | As nw-10 (base) |
| nw-15 WebCrShareSheet | Share · sort & filter on Recommended | As nw-10 plus the filter card anchored over the grid | Filters; saves a view | Sale manager / executive | As nw-10 (base) |
| nw-16 WebCrShareViewer | Share · picture viewer, in packet | As nw-10 plus the design viewer: photos, price, category, stock, in production (implied) | Adds to / removes from packet | Sale manager / executive | Catalogue price only (plus base) |
| nw-17 WebCrShareVerify | Share · verified against stock | As nw-10 with stock state per selected design | Removes out-of-stock | Sale manager / executive | As nw-10 (base) |
| nw-18 WebCrComposer | Share · composer | As nw-10 plus the composer sheet: send-to, pictures, video, logo, template, stock check, export | Sends packet; exports; back and edit | Sale manager / executive | Yes · packet value; template price placeholder |
| nw-19 WebCrShareContacts | Share · send to (contacts) | As nw-18 plus the contacts sheet: group, contacts, broker, e-mail | Picks recipients; remembers default | Sale manager / executive | As nw-10 (base) |
| nw-20 WebCrShareExport | Share · export | As nw-18 plus the export sheet: zip, PDF, Excel, link, video | Downloads; logs on packet history | Sale manager / executive | Prices show / hide toggle (base) |
| nw-21 WebCrShareSent | Share · sent | As nw-10 plus the sent sheet: delivery per recipient | Step done → next customer; packet history | Sale manager / executive | As nw-10 (base) |
| nw-22 WebCrLogo | Share · place logo | Design photo with the firm logo, preview as sent, designs rail; controls pane | Places logo on this picture or all | Sale manager / executive | No |
| nw-23 WebCrLogoAll | Share · logo on all pictures | Selected designs (product, photoshoot, video frame) with the logo | Applies to all; preview | Sale manager / executive | No |
| **Payments** | | | | | |
| nw-24 WebCrPay | Payments · journey map, customer pane | Stage strip with ₹, bills by customer (broker, days, amount, also-in-stage pill), total outstanding, report strip; customer pane | Snooze, escalate, log payment, call, WhatsApp | Accounts / sale manager (plan) | Yes · outstanding, bills, credit line · accounts and sale manager |
| nw-25 WebCrPayFilter | Payments · sort & filter | As nw-24 plus the bill filter sheet | Filters; saves a list | Accounts / sale manager | Yes · amount filters |
| nw-26 WebCrPaySnooze | Payments · snooze | As nw-24 plus the snooze popover | Snoozes bills | Accounts | Yes (base) |
| nw-27 WebCrPayLog | Payments · log payment | As nw-24 plus the log sheet: amount, mode, UTR, allocation | Logs payment; receipt voucher to Busy (implied) | Accounts | Yes · payment, bill amounts |
| nw-28 WebCrPayEscalate | Payments · escalate | As nw-24 plus the escalate sheet | Escalates to admin; pauses automation | Accounts | Yes · bill amounts |
| nw-29 WebCrPayCleared | Payments · bill cleared, customer in 3 stages | As nw-24 with the bill cleared by number in the pane | None (result state) | Accounts | Yes |
| nw-30 WebCrPayBills | Payments · Bills tab | Bills table: customer, broker, dates, days, stage, amount, next action; customer pane | Download; chips | Accounts / sale manager | Yes |
| nw-31 WebCrPayCustomers | Payments · Customers tab | Customers with bills, worst stage, outstanding; by-stage bars; collected / promised | Calls; chips | Accounts / sale manager | Yes |
| nw-32 WebCrPayBrokers | Payments · broker & agency weekly report | Agencies: brokers, customers, due / overdue / issue, last sent, delivered; report preview pane | Send now, pause, PDF; section toggles | Accounts / sale manager | Yes · agency outstanding, report total |
| nw-33 WebCrPaySchedule | Payments · report schedule | As nw-32 plus the schedule sheet | Saves the schedule | Accounts / sale manager | Yes (base) |
| **Customers** | | | | | |
| nw-34 WebCrCustomers | Customers · list, dossier pane | Customer table: heat, tier, score, open book, last order, FY billing, growth, broker / agency, tags; dossier pane | Call; follow up; share | Sale manager (₹) | Yes · open book, FY billing, credit line · sale manager |
| nw-35 WebCrCustFilter | Customers · sort & filter | As nw-34 plus the filter sheet | Filters; saves a view | Sale manager | Yes (base) |
| nw-36 WebCrCustColumns | Customers · column chooser | As nw-34 plus the column chooser (money group) | Picks and orders columns | Sale manager | Yes (base) |
| nw-37 WebCrDossierInvoices | Dossier · Invoices & payments | As nw-34 with invoices, payment state, open / paid KPIs in the pane | Follow up; share | Sale manager / accounts | Yes · invoice amounts |
| nw-38 WebCrDossierShipments | Dossier · Shipments | As nw-34 with shipments (transporter, boxes, pcs, delivered) in the pane | Call transporter | Sale manager | Yes (list only) |
| nw-39 WebCrDossierReturns | Dossier · Returns & credit notes | As nw-34 with credit notes, reasons, GR ratio in the pane | None in pane | Sale manager | Yes · credit note amounts |
| nw-40 WebCrDossierGrowth | Dossier · Growth | As nw-34 with FY billing trend, share of wallet (implied), tier appetite in the pane | None in pane | Sale manager | Yes · FY billing |
| nw-41 WebCrCustStart | Customers · start a follow-up | As nw-34 plus the start-follow-up sheet | Adds customer to a journey step | Sale manager | Yes (base) |
| **Journeys** | | | | | |
| nw-42 WebCrJourneys | Journey builder · payments, step pane | Payment journey node map; step settings pane; tier frequency, feeding lists, automation | Save or remove step; new journey; publish | Sale manager / admin (plan) | No |
| nw-43 WebCrJRefill | Journey builder · Refill customer journey | Refill customer journey map; Reach out step pane | Save or remove step | Sale manager | No |
| nw-44 WebCrJNew | Journey builder · new journey | As nw-42 plus the new-journey sheet | Creates a draft journey | Sale manager / admin | No |
| nw-45 WebCrJTest | Journey builder · test run | As nw-42 with the simulation pane: dated steps for one customer and bill | Re-run; nothing sent | Sale manager / admin | Yes · one bill amount |
| nw-46 WebCrJAddNode | Journey builder · adding a step | As nw-42 with a ghost node and the new-step pane | Adds a step | Sale manager / admin | No |
| nw-47 WebCrJPublish | Journey builder · publish v4 | As nw-42 plus the publish sheet: version diff, migration choice | Publishes the version | Sale manager / admin | No |

## Studio

### Studio phone

| Frame | Caption (from the registration block) | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| **Stitch · Tracks** | | | | | |
| n-1 ScreenStTracks | Tracks · categories, threads, prompt tray | Category tracks (threads, last worked, what Stitch learned), threads of a track (context, versions, state) | Starts a thread from the prompt; new track | Design (header); admin / owner (plan) | No |
| **Stitch · Designer** | | | | | |
| n-2 ScreenStChat | Designer · chat with canvas cards | Thread chat: context tray (design main, refs, material), sales-data switch, generated set and version cards | Sends a prompt; thumbs up / down; opens canvas | Design; admin / owner | No |
| n-3 ScreenStCanvas | Canvas · zone chips, version rail, Pane button | Generated version with zone overlay, zone chips, version strip | Regenerate, variants, drape; share; thumbs | Design; admin / owner | No |
| n-4 ScreenStZoneSheet | Canvas · zone pane as a half sheet | As n-3 plus the zone sheet: material, colour, work, scale, density, repeat, drape | Regenerates zone; 4 variations; changes material | Design; admin / owner | No |
| n-5 ScreenStTunerSheet | Canvas · tuner as a half sheet | As n-3 plus the tuner sheet on Models: model per template | Picks model per template for this thread | Design; admin (plan) | No; cost note is admin-only elsewhere |
| n-6 ScreenStSwipe | Swipe approval · keep, discard, save | One generated tile at a time, kept / discarded count | Keeps, discards, saves as sample (taste signal) | Design; admin / owner | No |
| **Context selector** | | | | | |
| n-7 ScreenStPicker | Context · picker sheet | Designs with demand score and pcs (sales data on); tabs for materials, samples, WIP, moodboard items | Adds up to 8 items to context; sets the main | Design; admin / owner | No; score and pcs only |
| **Moodboard** | | | | | |
| n-8 ScreenStMoodMine | Moodboard · Mine | Moodboard items by source (upload, link, WhatsApp, by Stitch) with notes | Toggles "only my uploads"; upload; paste link | Design; admin / owner | No |
| n-9 ScreenStMoodStitch | Moodboard · Stitch's | Moodboard items grouped by thread: collected, generated, kept | Replenish | Design; admin / owner | No |
| **History** | | | | | |
| n-10 ScreenStHistory | History · by day | Generated sets / versions by day with thread and result (kept, saved, shared, design content) | None (read only) | Design; admin / owner | No |
| n-11 ScreenStHistoryItem | History · an item, share or design content | As n-10 plus the item sheet: version, prompt, context | Shares (WhatsApp packet, export, moodboard); new product / material master; saves as sample | Design; admin / owner | No |
| **Memory** | | | | | |
| n-12 ScreenStWorks | Memory · what works | Saved samples from generations: activation, read state, demand trend, verdict; KPIs | None (read only); chips | Design; admin / owner | No; pcs and score only |
| **Settings** | | | | | |
| n-13 ScreenStSettings | Settings · models | Model per template with run counts; provider key state | Picks model per template | Design; admin (plan) | No |

### Studio web

| Frame | Caption (from the registration block) | Reads | Changes | Role shown | Money |
|---|---|---|---|---|---|
| **Stitch · Tracks** | | | | | |
| nw-1 WebStTracks | Tracks · category cards, threads, thread pane | Category tracks, threads of a track; thread pane (context, prompts, versions, what was sent) | Starts a thread; open, branch, archive | Admin / owner (plan) | No; score and pcs only |
| **Stitch · Designer** | | | | | |
| nw-2 WebStDesignerSet | Designer · set on the stage, set options | Chat with context tray and sales-data switch, generated set (12 tiles), version strip; set options pane | Re-run, more like cell, colourways, sketch; to moodboard, share, save picked as sample | Admin / owner | No |
| nw-3 WebStDesignerZone | Designer · zone selected, material dropped, 4 variations | Picked version with zone overlay, material dropped on a zone, 4 variations; zone pane | Regenerates zone; keeps a variation; changes material, colour, work, drape | Admin / owner | No |
| nw-4 WebStDesignerVersion | Designer · v7 against v6, version pane | Two versions compared; version pane (prompt, context, template, what was sent) | Keep, discard, make main; sketch, close-up, on model | Admin / owner | No |
| nw-5 WebStTuner | Designer · tuner pane, chat collapsed | As nw-4 plus the tuner pane on Models: model per template | Picks model per template for this thread | Admin (plan) | No; cost note is admin-only (Usage tab) |
| **Context selector** | | | | | |
| nw-6 WebStSelector | Context · Products, sales data on | Designs with demand band, score and pcs; selection tray with main and refs | Adds up to 8 to context; sets the main | Admin / owner | No; score and pcs only |
| nw-7 WebStSelectorMats | Context · Materials with sort & filter | Materials (name, code, work, stock) with the sort & filter popover | Filters materials; adds to context | Admin / owner | No |
| **Hand-off** | | | | | |
| nw-8 WebStSave | Save as sample · sheet | Generated version, new sample number, category, colours, target price, notes, reference links (designs, materials, moodboard) | Creates a sample draft; save to moodboard; share packet; design content for a new product master | Admin / owner (money role) | Yes · target price · money roles |
| **Moodboard** | | | | | |
| nw-9 WebStMoodMine | Moodboard · Mine, picked item pane | Moodboard items by source; picked item with used-in threads | Only-mine switch; upload; paste link; pin, remove, use as context | Admin / owner | No |
| nw-10 WebStMoodStitch | Moodboard · Stitch's, why this | Items grouped by thread (collected, generated, kept); Stitch's reason in the pane | Replenish; use as context | Admin / owner | No |
| **History** | | | | | |
| nw-11 WebStHistory | History · by day, item pane | Generations by day with result; item pane with prompt and context | Shares (WhatsApp packet, export, moodboard); new product / material master; reopen thread; save as sample | Admin / owner | No |
| **Memory** | | | | | |
| nw-12 WebStWorks | Memory · what works table | Saved samples: activation, read, demand, score, pcs, returns, verdict; picked row by colour | Make more like this | Admin / owner | No; pcs and score only |
| nw-13 WebStRules | Memory · taste rules, Stitch proposes | Taste rules with provenance and on / off; proposed rule; feedback KPIs | Adds, edits, removes, toggles rules; accepts a proposal | Admin / owner | No |
| **Settings** | | | | | |
| nw-14 WebStSettingsModels | Settings · models, providers pane | Model per template with runs; providers with key state; usage counts | Picks models; tests a provider key | Admin (plan) | No; cost note is admin-only |
| nw-15 WebStSettingsDefaults | Settings · defaults, what Stitch sends | Sales-data defaults and fields, generation defaults, memory retention, sharing (WhatsApp number, roles); preview of sent context | Toggles defaults; forget everything | Admin / sub-admin (plan) | No; "sold ₹ · money roles" toggle only |

## Where the drawings show money the plans say they should not

Found while reading the component bodies against the plans (13/10/26). These are observations for the money rule's
owner, not defects to fix here: either the plan's "no money" column or the drawing is wrong, and the owner decides.

- Dispatch phone, return step 2 (`dispatch` `n-22`): the scan toast reads "from SI-2271 at ₹4,995" although the lines on that screen carry no money.
- Dispatch web Ready (`nw-1`): the board shows no money but the docked pending pane defaults to showing it; the approved-bar Ready with an order picked (`nw-21`) does not, while the Pending grid and list (`nw-22`, `nw-23`) do.
- Dispatch web Stock panes (`nw-12`, `nw-13`, `nw-14`): the SKU pane shows the list price, the material pane the GRN rate per metre, the WIP pane the karigar's material at cost and due; the plan lists all three as money-free screens.
- Production web shows locked "money roles" figures on more screens than the plan's money column says, because the mounted panes carry them: PO pane on the calendar and list (`nw-3`, `nw-4`), material pane rate average (`nw-9`), cut-order rate per metre (`nw-11`), dyer due on dye receive (`nw-14`), job rate and due on the lifecycle and receive panes (`nw-23`, `nw-27`, `nw-28`), target price and cost so far on every Samples screen (`nw-36`…`nw-41`), the new karigar rate card (`nw-46`), karigar analytics "material at cost" (`nw-47`).
- Production floor phones carry no money anywhere except the three manager screens (`n-41`, `n-42`, `n-44`); several floor sheets say "rates on the desk" in words.
- CRM: Follow-ups is money-free on both devices except the History tab on the web (`nw-9`), whose pane is the full customer pane with FY billing and credit line. The Share terminal on the web (`nw-10` and its states) shows FY billing and credit line through the same pane, so it is the sale manager's view; the executive's no-money variant is not drawn.
- CRM phone headers all carry the role label "Sales", including the Payments screens the plan assigns to accounts.
- Studio: the only ₹ on any frame is the target price on the web Save as sample sheet (`nw-8`); usage cost "admin only" appears as a note with no figure.
