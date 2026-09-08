# Sutra screen flow (light brief, 8 Sep 2026)

The whole app as three navigation levels plus the screens under them. Keep this file current whenever a module is
planned or a screen is added; it is the map the top bar, the phone island and the tab strip are built from.

Levels, and where each one lives on web and phone:

| Level | What it is | Web | Phone |
|---|---|---|---|
| Menu | the module | rail icon (sidebar when expanded) | island (Home · Catalogue · CRM · Dispatch · Production · More) |
| Sub-menu | a section of the module | text buttons in the header beside the page head, starting at a fixed x | right-corner sub-menu dropper, or the lists scroller under the search island |
| Sub-sub-menu | a view inside a section | underline tabs at the top of the page | tab row under the page head |
| Screen | what the view shows, plus its sheets and panes | main window + right pane | full screen, floating sheets |

Actions are not navigation: scan, recognise by image and search live in the search field; Customer mode is a switch;
LIVE is a status chip. Sources: brd-final.txt (Main tabs, lines 43–95, 151–223, 291), screen-inventory.md,
plans/dispatch.md, the side-menu list in screens2.jsx.

## Home
- Dashboard (role metrics · quick links) — screens: role dashboard, quick-link picker
- Notifications — screens: feed (BAU · daily metrics · red alerts)
- Approvals — sub-sub: Sale orders · Sale returns · Purchase inwards · Production overages · Costing — screens: approval card with the role-relevant info, "for inspection" escalation
- Gate pass hub — sub-sub: Auto tokens · Manual tokens — screens: token list, token detail, manual token form (guard)

## Catalogue
- Catalogue (default) — sub-sub: All · Samples · Materials · Lehenga · Saree · saved lists — screens: grid, list, filters & sort sheet, listening, product (customer view), product (salesperson view: stock & production · recipe & media · analytics & orders), scan focus mode, scan pop-up, full-screen viewer
- Carts — screens: all carts grouped by design with totals, cart card (double tap on a chip), sale book switch, submit for approval
- Sale orders — sub-sub: Raised · Approved · Dispatched · Cancelled · Returns · Analytics — screens: cards, table (column chooser, group by), opened order, returns card with credit note; Analytics has its own sub-sub: Orders · Designs (SKU) · Customers
- Customer mode — a switch, not a page: hides stock, tags and the salesperson view until switched off

## CRM
- Follow-ups (default) — sub-sub: Journey board · Today · History — screens: list chooser (Today's to-do · Refill due · What worked · New samples · Cold revival · Hot · saved lists), step strip, customers on the step, step pane (template, channels, attached designs, outcome, note, Done → next / Snooze / Skip, history); phone: cards, step sheet
- Share — screens: terminal (queue strip · customer pane with Info · Packets · Orders tabs · Purchased grid with a per-customer time frame · Recommended and Catalogue picture grids, each with its own sort & filter · packet pane), sort & filter sheet with the customer-context group, verify against stock, composer (send to · pictures · video · logo · message · verify · export), logo placement; phone: customer head + grids as tabs, selection tray, packet sheet, logo placement
- Payments — sub-sub: Journey map · Bills · Customers · Broker / agency — screens: stage strip (Payment due · Overdue · Issue · Escalate · RED) with ₹, bills of the stage by customer, customer pane (bills across stages, log payment, snooze, escalate, message log), broker & agency weekly report; phone: stages, bill sheet
- Customers — screens: list sorted by follow-up due with the dossier pane; dossier (Overview · Orders & book · Invoices & payments · Shipments · Returns & credit notes · Purchase grid · Growth)
- Journeys — screens: node-map builder (trigger · wait · step · branch · snooze · end) with the step settings pane; desk only

## Production
Web sub-menu row (8 buttons beside the head): Purchase ▾ · Materials ▾ · Process setting · Orders ▾ · Job cards ▾ · Samples ▾ · Costing · Karigars. The module root (rail icon) is the Overview. Phone: the sub-menus are the scroller under the search island (Job cards first) and the right-corner dropper. Plan: `explorations/catalogue-v2/plans/production.md`.
- Overview (module root) — screens: tiles (active orders, FG today, serviceable, delayed, unassigned, waiting on floor), recommendation strips (priority production · low-stock reorder · stop production), arrivals, karigar dues pane
- Purchase — sub-sub: Orders (Calendar · List · Past) · Inward (New · Past) · Return (New · Past) — screens: PO calendar with the picked PO pane, inward from a PO with variance and the supplier pane, return with the credit note pane; phone: inward capture with lot photo
- Materials — sub-sub: Catalogue · Dye ledger (Open cut orders · Bulk balances · Received dye WIP · History) — screens: picture-first catalogue sorted by last inward with the material pane, dye board with dyer rail and cut-order pane, bulk issue and single issue & order, receive a dyed lot; phone: catalogue, dye receive, dyer balances
- Process setting — steps on one page: 1 product and colours · 2 processes in sequence (last marked Final) · 3 materials & averages with colour scope · 4 BOM grid per colour (materials rows, WIP rows, process columns, Set BOM) — right pane tabs Materials (catalogue, newest inward) · BOMs · Search other products; lock once an order started; phone: recipe view, averages edit
- Orders — sub-sub: All · Active · Materials pending · Delayed · Closed · Lifecycle — screens: order cards with the lifecycle pane, new order (qty per colour, process assignment with karigar, job rate, 30/30/40 tranches) with the material-readiness pane, lifecycle terminal (head, timeline, one panel per process with tranches, inputs per colour, colour-wise table, issue/receive history) with the this-job pane, issue pane, receive pane (rejection, loss, excess, karigar due), print (job card A4 + 3×4 in sticker); phone: orders, lifecycle, issue sheet, receive sheet, scan a job QR
- Job cards — sub-sub (scopes): Active · Delayed · Upcoming · Stuck · Priority production · Restock · Finished; views: Cards · Swimlanes · Table · Gantt · Calendar — right pane: the picked order's lifecycle; phone: list, sort & filter sheet, opened card
- Samples — sub-sub: In designing · Deployed, no production · Activated · Production started — screens: board with the moves pane, sample lifecycle (free moves: any process, karigar, colour, material) with the new-move / receive pane, sample → product (derived sequence and averages into Process setting); phone: list, lifecycle, new move sheet
- Costing — sub-sub: Completed · Incomplete · Past · Not priced — screens: cost cards, breakdown pane (materials × purchase-rate avg, job rates, margin, recommended price, own price, approval, sync)
- Karigars — sub-sub: All · Delayed jobs · Payment due · Capacity risk — screens: rows with score, balances and dues, karigar pane (jobs, material with them, ledger, verification, charts), new karigar

## Dispatch
- Ready orders — screens: board of fresh orders, "In stock" filter on by default (toggle), priority ring, sort & filter, PACK; right pane = the pending book as a journey, or the picked order with "All pending" back
- Pending orders — sub-sub: Pending approval · Pending dispatch · After 1st dispatch · After due date (due day 25 default; an order can sit in two) — screens: grid, list, order pane with the customer; manager sees rates, packer does not
- Packing — sub-sub: Terminal · Invoice review · Shipment sheet — screens: terminal (order · parcels · live invoice), scan armed, rejected scan, invoice review and A4 print, shipment sheet and transport document; phone companion: picker → scan → review → invoiced
- Billed — sub-sub: Invoices · Shipments — screens: sale invoices, invoice sheet, shipments history
- Stock — sub-sub: Finished goods · Material · Work in progress — screens: stock lists with pane, FG inward (last process receive)
- Out of stock — sub-sub: Order · Restock — screens: shortage cards, colour matrix, who is waiting pane
- Sale return — sub-sub: 1 Customer · 2 Pieces · 3 Preview · 4 Credit note — screens: the four wizard steps, recent credit notes

## Hub
- Master views — sub-sub: Items (Products · Materials · WIP) · Ledgers (Customers · Broker agencies · Brokers · Karigars · Transporters · Suppliers · Team) — screens: list or grid per entity, dossier tiers
- Reports — sub-sub: Purchase · Sale · Production · Karigar · Dispatch · Commissions · Payments — screens: report tables with the BRD column sets
- Report builder — screens: column chooser, saved views
- Product compare — screens: compare grid

## Studio (planned 8 Sep 2026, plans/studio-designer.md; Stitch · Moodboard · Memory drawn first)
- Stitch — sub-sub: Tracks · Designer — screens: tracks landing with category cards, the designer terminal (chat column · canvas with zone overlay and version strip · set / zone / version pane), context selector dialog (Products · Materials · Samples · WIP · Moodboard, metadata switch), save-as-sample sheet; phone: chat with canvas cards, full-screen canvas, zone sheet, picker sheet
- Moodboard — sub-sub: Mine · Stitch's — screens: Mine grid with the "Only my uploads & links" switch and source marks, Stitch's grid grouped by track with Replenish, item pane
- Memory — sub-sub: Sessions · What works · Settings — screens: session timeline with "what was sent", what-works table with taste rules, settings toggles with the "what Stitch sends" preview
- Photoshoots — screens: shoot centre (Queue · Completed · Failed) — own plan later
- Upload centre — screens: upload and manage, checklist — own plan later
- Tune (not navigation) — the translucent tuner pane on every Studio screen: Templates · Workflow · Models · Usage · Memory

## Channels
- Cross-firm transfers — screens: transfer packets (inbound · outbound), history
- Active permissions — screens: permission list, grant (24 h · 1 w · 1 m · 3 m)

## Shell (shared)
- Login and firm selector · side menu / rail · tab strip of open screens · user menu (profile, show/hide modules, theme, log out) · search pane · agent orb (listening)
