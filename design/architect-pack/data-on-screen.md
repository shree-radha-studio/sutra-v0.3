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

## Production and Dispatch

Tables pending; being derived from the component bodies and added in the next push.

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
