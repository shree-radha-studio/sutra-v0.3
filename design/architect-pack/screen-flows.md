# Screen flows as the board draws them (13/10/26)

Two parts. Part 1 is the navigation per module: menu (the module), sub-menu, sub-sub-menu and screen, with the frame
id of every screen, phone and web, in the order a user meets them. Part 2 is the cross-module flows as numbered
steps with the frame at each step. "Button only" means the step exists as a button on a drawn screen with nothing
behind it; "not drawn" means no frame shows it. Finals are `f-`/`w-`, drafts `n-`/`nw-` (ids counted on each module's
own page; see README). Dark twins carry a `d`.

This file corrects `design/SUTRA-SCREEN-FLOW.md` (8 Sep). The differences are listed at the end; that file is left
as it was.

## Part 1 · Navigation per module

The four levels and where each lives (unchanged since 8 Sep):

| Level | Web | Phone |
|---|---|---|
| Menu (module) | rail icon; sidebar when expanded (`w-3`) | island at the foot: Home · Catalogue · CRM · Dispatch · Production · More, plus the orb (`f-1`); side menu for the rest (`f-14`) |
| Sub-menu | text buttons in the header beside the page head | the scroller under the search island, or the right-corner dropper |
| Sub-sub-menu | underline tabs at the top of the page | tab row under the page head |
| Screen | main window plus right pane | full screen, floating sheets |

Not navigation: scan, image recognition and voice live in the search field; Customer mode is a switch; LIVE is a
status chip; the Studio tuner is a pane. Review 2 proposes (decision 2) that the island shows only the role's
modules, at most four plus More and the orb; today every phone frame shows all six.

### Home (page `home`, all drafts, 13 Oct)

Web header buttons: Home · Notifications · Approvals · Gate pass. Phone: Approvals and Gate pass are reached from the
Home screen's rows; Notifications is a strip on Home, not a screen.

| Sub-menu | Sub-sub | Screen | Phone | Web |
|---|---|---|---|---|
| Home | Day · Month · Year (web tiles) | Landing by role: Today tiles, Needs you, quick links, notifications | `n-1` (sale executive) | `nw-1` (sale manager, with ₹ tile and notifications pane) |
| Approvals | Sale orders · Returns · Purchase inwards · Overages · Costing (tabs with counts) | Queue of cards with flag chips | `n-2` | `nw-2` (queue + card + facts pane) |
| Approvals | Sale orders | Sale order card: Look twice strip, standing tiles, credit bar, appetite, lines with steppers and stock, note, last three orders, two charts, Reject · Hold · Approve | `n-3` | `nw-2` |
| Approvals | Sale orders | Same card over the credit line, sub-admin: primary "Send to admin" | `n-4` | `nw-3` |
| Approvals | Sale orders | Same card over the line, admin: primary "Approve" | `n-5` | not drawn |
| Approvals | Returns | Sale return card SR-0112: bills returned from, pieces coming back, ratio before and after | `n-6` | not drawn |
| Approvals | Purchase inwards · Overages · Costing | Cards | not drawn (counts only) | not drawn |
| Gate pass | Auto · Manual | Token list, verify, new manual token; token pane | `n-7` (guard, Auto tab) | `nw-4` (Manual tab, token pane) |
| Notifications | BAU · daily · red alerts | Full feed screen | not drawn | not drawn (pane on `nw-1` only) |

### Catalogue (page `catalogue`; finals plus four draft bands)

Web header buttons: Catalogue · Carts · Sale orders. Phone: the lists bar under the search island carries the saved
lists; Carts and Sale orders are reached from the cart button and the side menu. Customer mode is a switch.

| Sub-menu | Sub-sub | Screen | Phone | Web |
|---|---|---|---|---|
| Catalogue | All · Samples · Materials · Lehenga · Saree · saved lists | Grid with an active cart | `f-1` | `w-1` (cart pane) |
| Catalogue | | Grid, no active cart | `f-2` | |
| Catalogue | | List view | `f-3` | `w-2` |
| Catalogue | | Listening (orb pressed) | `f-4` | `w-4` |
| Catalogue | | Filters & sort sheet, save as list | `f-5` | (drawer on `nw-5`) |
| Catalogue | | Product · customer view | `f-6` | `w-5` |
| Catalogue | Stock & production · Recipe & media · Analytics & orders | Product · salesperson view, three tabs | `f-7`, `f-8`, `f-9` | `w-6` (one page) |
| Catalogue | | Scan · recognised-product pop-up | `f-10` | not drawn |
| Catalogue | | Scan camera, focus mode, Scan-to-add state | not drawn (review 1 gap 1) | not drawn |
| Catalogue | | Full-screen viewer | `f-11` | `w-14` |
| Catalogue · tags (draft) | | Grid with one action chip and one state pill, quick chips | `n-3` | `nw-5` (sort & filter drawer) |
| Catalogue · tags | | Grid in customer mode: promotional badges only | `n-4` | |
| Catalogue · tags | | Why? panel on a chip | `n-5` | `nw-6` |
| Catalogue · tags | | Sort & filter sheet: sort, grouped filters, save view | `n-6` | |
| Catalogue · tags | | Salesperson view · tag rail (action · colours · about), customer sees, demand | `n-7` | `nw-7` |
| Catalogue · tags | | Why sheet: inputs, score over time, by colour | `n-8` | `nw-8` |
| Catalogue · sell flow (draft) | | Grid with a calmer header: three rows / two rows / two rows after swipe (compare with `f-1`) | `n-16`, `n-17`, `n-18` | phone only |
| Carts | | All carts grouped by design, totals | `f-12` | `w-7` |
| Carts | | Cart card (double tap on a chip), sale book switch | `f-13` | (in `w-7`) |
| Carts · sell flow (draft) | | New cart sheet: recent customers, new customer, sale book, Start cart | `n-9` | `nw-9` (pane) |
| Carts · sell flow | | New customer sheet: name, phone, city; optional broker, agency, GST; More | `n-10` | `nw-10` (pane) |
| Carts · sell flow | | Submit for approval: pcs, ₹, due days, priority, note | `n-11` | `nw-11` (pane) |
| Carts · sell flow | | Sent for approval: SO number, "you can edit or delete until approved" | `n-12` | (in `nw-12`) |
| Sale orders | Raised · Approved · Dispatched · Cancelled · Returns · Analytics | Cards | `f-15` | `w-8` (order preview pane) |
| Sale orders | | Table, column filter | `f-16` | `w-9`; full table and column chooser `nw-1`, `nw-2` |
| Sale orders | | Group-by island, grouped table | `f-17` | `w-9` |
| Sale orders | | Opened order (Edit · Approve docked) | `f-18` | `w-10` (customer pane) |
| Sale orders · sell flow (draft) | | My order in the queue: IN QUEUE tag, queue strip, Delete · Edit order | `n-13` | `nw-12` |
| Sale orders · sell flow | | Editing SO-3456 as cart A: Discard · Send changes | `n-14` | `nw-13` |
| Sale orders · sell flow | | Delete, in words | `n-15` | `nw-14` |
| Sale orders · Desk density (draft) | | Cards (phone) and table with the order pane, manager with flags (web) | `n-19` | `nw-15` |
| Sale orders | Returns | Returns as cards and as a table, credit note pane | `n-1`, `n-2` | `nw-3`, `nw-4` |
| Sale orders | Analytics: Orders · Designs (SKU) · Customers | Charts and tables (sale managers and above, 6 Oct) | `f-19`, `f-20`, `f-21` | `w-11`, `w-12`, `w-13` |

### App shell (page `appshell`)

| Element | Phone | Web |
|---|---|---|
| Module menu | Side menu, all modules `f-14`; island on every phone frame | Sidebar expanded with collapsible sub-menus `w-3`; rail, tab strip and header v2 on every web final |
| Search | The catalogue's top field (no separate screen; review 1 gap 4) | Search pane stage 1 (scope, recents, for you) `nw-1`; stage 2 (matches by section, filter & sort chooser) `nw-2` |
| Login and firm selector, user menu, permission request | not drawn | not drawn |

### CRM (page `crm`, one band, drafts of 8 and 9 Sep)

Web header buttons: Follow-ups · Share · Payments · Customers · Journeys. Phone: the same five on the scroller,
opening on Follow-ups. Drawn as the sale manager's view; the executive's phone drops the ₹ rows (not drawn separately).

| Sub-menu | Sub-sub | Screen | Phone | Web |
|---|---|---|---|---|
| Follow-ups | Journey board · Today · History | Board by step: list chooser, step strip, customers on the step | `n-1` | `nw-1` (step pane) |
| Follow-ups | | Sort & filter; new saved list | `n-2`, `n-3` | `nw-2`, `nw-3` |
| Follow-ups | | Step sheet / pane; with history | `n-4`, `n-5` | (in `nw-1`), `nw-4` |
| Follow-ups | | Snooze; edit message template; done → next customer | `n-6`, `n-7`, `n-8` | `nw-5`, `nw-6`, `nw-7` |
| Follow-ups | Today · History | The two other tabs | `n-9`, `n-10` | `nw-8`, `nw-9` |
| Share | Purchased · Recommended · Catalogue (grids) | Terminal: customer pane (Info · Packets · Orders), three picture grids, packet | `n-11`, `n-12`, `n-13` | `nw-10` |
| Share | | Customer picker | `n-14` | `nw-11` |
| Share | | Customer pane · Packets tab; Orders tab | (in dossier) | `nw-12`, `nw-13` |
| Share | | Sort menu; sort & filter on a grid | `n-15`, `n-16` | `nw-14`, `nw-15` |
| Share | | Picture viewer with "in packet" | `n-17` | `nw-16` |
| Share | | Verify against stock | `n-18` | `nw-17` |
| Share | | Composer (send to · pictures · video · logo · message · verify · export) | `n-19` | `nw-18` |
| Share | | Send to (contacts); export; sent | `n-20`, `n-21`, `n-22` | `nw-19`, `nw-20`, `nw-21` |
| Share | | Place logo; logo on all pictures | `n-23`, `n-24` | `nw-22`, `nw-23` |
| Payments | Journey map · Bills · Customers · Broker / agency | Stage strip (Payment due · Overdue · Issue · Escalate · RED) with ₹, bills by customer | `n-25` | `nw-24` (customer pane) |
| Payments | | Sort & filter | `n-26` | `nw-25` |
| Payments | | Bill sheet; snooze; log payment; escalate | `n-27`, `n-28`, `n-29`, `n-30` | (pane), `nw-26`, `nw-27`, `nw-28` |
| Payments | | Bill cleared by number, customer still in three stages | `n-31` | `nw-29` |
| Payments | Bills · Customers | The two list tabs | `n-32`, `n-33` | `nw-30`, `nw-31` |
| Payments | Broker / agency | Weekly report; preview; schedule | `n-34`, `n-35`, `n-36` | `nw-32`, (in `nw-32`), `nw-33` |
| Customers | | List sorted by follow-up due; sort & filter; fields on the row / column chooser | `n-37`, `n-38`, `n-39` | `nw-34`, `nw-35`, `nw-36` |
| Customers | Info · Packets · Orders · Invoices & payments · Shipments · Returns & credit notes · Growth | Dossier tabs | `n-40`…`n-46` | (pane on `nw-34`), `nw-37`…`nw-40` |
| Customers | | Start a follow-up from the dossier | `n-47` | `nw-41` |
| Journeys | | Node-map builder: payments journey; step settings | `n-48`, `n-49` | `nw-42` |
| Journeys | | Refill journey; new journey; test run; adding a step; publish | `n-50`…`n-54` | `nw-43`…`nw-47` |

### Dispatch (page `dispatch`; three draft bands)

Sub-menus in BRD order: Ready · Pending · Packing · Billed · Out of stock · Stock · Sale return. On the 8 Sep band
the nodes are a strip with live counts under the header and the phone opens on Pending; the structured drafts use the
shared web shell. Money: manager variants show ₹, packer variants do not; the phone has both.

| Sub-menu | Sub-sub | Screen | Phone (8 Sep band) | Web (8 Sep band) | Structured drafts (6 and 13 Oct) |
|---|---|---|---|---|---|
| Ready orders | | Board of fresh orders, priority, PACK; pending book as the pane | `n-1`; sort & filter `n-2` | `nw-1`; on the approved bar: in-stock filter on `nw-20`, order picked `nw-21` | `n-27` (rows), `nw-24` (ruled table, pending pane) |
| Pending orders | Pending approval · Pending dispatch · After 1st dispatch · After due date | Three-level book (customer → order → lines) | manager `n-3`, packer `n-4` | `nw-2`; approved bar: grid `nw-22`, list `nw-23` | packer `n-28`, manager `n-29`, `nw-25` |
| Pending orders | Held | "Held" as a situation | not drawn (review 1 gap 6) | not drawn | not drawn |
| Packing | Terminal · Invoice review · Shipment sheet | Phone companion: picker → scan → rejected → review → invoiced | `n-5`…`n-9` | | scan `n-30`, review `n-31` |
| Packing | | Desk terminal with live invoice; scan armed and rejected | | `nw-3`, `nw-4` | `nw-26` |
| Packing | | Invoice review (bill-to, GST); invoice done, select for shipment; close shipment; A4 print and transport document | | `nw-5`, `nw-6`, `nw-7`, `nw-8` | not yet (planned) |
| Billed | Invoices · Shipments | Sale invoices; invoice sheet; shipments history | manager `n-10`, packer `n-11`; sheet `n-12`, `n-13`; shipments `n-14` | `nw-9`, `nw-10` | `nw-27` |
| Out of stock | Order · Restock | Shortage and restock cards, colour matrix, who is waiting | `n-15`; sort & filter `n-16` | `nw-11` | not yet |
| Stock | Finished goods · Material · Work in progress | Stock lists with pane | `n-17`, `n-18`, `n-19` | `nw-12`, `nw-13`, `nw-14` | not yet |
| Stock | | FG inward (last process receive), verify, gate token | `n-20` | `nw-15` | not yet |
| Sale return | 1 Customer · 2 Pieces · 3 Preview · 4 Credit note | Four wizard steps; recent credit notes | `n-21`, `n-22`, preview manager `n-23` / packer `n-24`, credit note manager `n-25` / packer `n-26` | `nw-16`…`nw-19` | not yet |

### Production (page `production`, one band)

Web header buttons today (eight; review 2 decision 3 proposes six): Purchase ▾ · Materials ▾ · Process setting ·
Orders ▾ · Job cards ▾ · Samples ▾ · Costing · Karigars. The module root is the Overview. Phone: scroller under the
search island, floor users open on Job cards. Floor phones carry no ₹.

| Sub-menu | Sub-sub | Screen | Phone | Web |
|---|---|---|---|---|
| Overview (root) | | Tiles, arrivals, recommendation strips, karigar dues pane | `n-1` | `nw-1` |
| (any) | | Locked for a role without Production rights | `n-2` | `nw-2` |
| Purchase | Orders (Calendar · List · Past) | PO calendar with PO pane; PO list; new PO | `n-3`, `n-4` | `nw-3`, `nw-4`, `nw-5` (pane form) |
| Purchase | Inward (New · Past) | Inward from a PO with variance, accounts card, supplier pane; past inwards with GRN pane | `n-5` (capture with lot photo) | `nw-6`, `nw-7` |
| Purchase | Return | Return with credit note pane | `n-6` | `nw-8` |
| Materials | Catalogue | Picture-first catalogue, material pane; material detail; new material | `n-7`, `n-8`, `n-9` | `nw-9`, `nw-10` |
| Materials | Dye ledger (Open cut orders · Bulk balances · Received dye WIP · History) | Cut orders and new cut order; bulk balances and bulk issue; received lots; receive a lot | `n-13`, `n-12`, `n-11`, `n-10` | `nw-11`, `nw-12`, `nw-13`, `nw-14` |
| Process setting | steps 1–4 on one page | Product and sequence; materials & averages; BOM grid per colour; copied and locked; imported from a sample | `n-14`, `n-15`, `n-16`, `n-17` | `nw-15`, `nw-16`, `nw-17`, `nw-18`, `nw-19` |
| Orders | All · Active · Materials pending · Delayed · Closed · Lifecycle | Order cards and list; new order with readiness pane | `n-18`, `n-19` | `nw-20`, `nw-21`, `nw-22` |
| Orders | Lifecycle | Lifecycle terminal; assign karigar; issue; issue on a Direct order; receive; receive finished goods; print | `n-20`, `n-21`, `n-22`, `n-23`, `n-24`, `n-27` | `nw-23`…`nw-29` |
| Orders | | Scan a job QR → issue or receive; jobber records on his phone | `n-25`, `n-26` | phone only |
| Job cards | Active · Delayed · Upcoming · Stuck · Priority production · Restock · Finished; views Cards · Swimlanes · Table · Gantt · Calendar | Cards with lifecycle pane; filters and saved views; swimlanes; table; gantt; calendar | `n-28`, `n-29`, `n-30` (opened card), `n-31`, `n-32`, `n-33` | `nw-30`…`nw-35` |
| Samples | In designing · Deployed, no production · Activated · Production started | Board; deployed on the 15-day reading; new sample; lifecycle with free moves; receive a move; sample → product | `n-34`, `n-39`, `n-38`, `n-35`, `n-36`, `n-37`, `n-40` | `nw-36`…`nw-41` |
| Costing | Completed · Incomplete · Past · Not priced | Cost cards, margins, breakdown pane | `n-41`, `n-42` (manager phone) | `nw-42` |
| Karigars | All · Delayed jobs · Payment due · Capacity risk | List with score and dues; karigar pane; ledger; verify karigar-recorded entries; new karigar; analytics | `n-43`, `n-44`, `n-45`, `n-46` | `nw-43`…`nw-47` |

### Studio (page `studio`, one band)

Web header buttons: Stitch · Moodboard · History · Memory · Settings (Photoshoots and Upload centre are buttons only;
Upload centre is drawn under Hub). Tune is a pane, not navigation.

| Sub-menu | Sub-sub | Screen | Phone | Web |
|---|---|---|---|---|
| Stitch | Tracks | Category tracks, threads, prompt tray | `n-1` | `nw-1` |
| Stitch | Designer | Chat with canvas cards; canvas with zone chips and version rail; zone pane; tuner; swipe approval | `n-2`, `n-3`, `n-4`, `n-5`, `n-6` | set on the stage `nw-2`; zone edit `nw-3`; versions compared `nw-4`; tuner `nw-5` |
| (dialog) | Products · Materials · Samples · WIP · Moodboard | Context selector | `n-7` | `nw-6`, `nw-7` |
| (sheet) | | Save as sample → Production › Samples › In designing | not drawn | `nw-8` |
| Moodboard | Mine · Stitch's | Grids with the "Only my uploads & links" switch; item pane | `n-8`, `n-9` | `nw-9`, `nw-10` |
| History | | Every generation by day; an item: share or use as design content | `n-10`, `n-11` | `nw-11` |
| Memory | What works · Taste rules | Rows, not conclusions; rules with provenance | `n-12` | `nw-12`, `nw-13` |
| Settings | Models · Defaults | Model per template, providers; defaults and "what Stitch sends" | `n-13` | `nw-14`, `nw-15` |

### Hub (page `hub`, one band, 13 Oct)

Web header buttons: Masters · Upload centre · Import · Reports · Report builder · Compare (last three not drawn).
Phone: under More on the island.

| Sub-menu | Sub-sub | Screen | Phone | Web |
|---|---|---|---|---|
| Masters | ITEMS (Products · Materials · WIP) / LEDGERS (Customers · Broker agencies · Brokers · Karigars · Transporters · Suppliers · Team) | Census chips, alerts, products grid, product dossier pane | `n-1` | `nw-1` |
| New product | | Master form with checklist; Save · Save and set recipe · Save and add photos | `n-2` | `nw-2` |
| Upload centre | per colour | Checklist of slots per colour, drop zone, no-photo queue; phone capture | `n-3` (capture), `n-4` (queue) | `nw-3` |
| Import | steps 1–4 | Pick the master; check the file (dry run); write it in (admin, desk only) | `n-5`, `n-6` | `nw-5`, `nw-4` |
| New material | | Master form with checklist | `n-7` | `nw-6` |
| Reports · Report builder · Compare | | | not drawn | not drawn |

### Channels

Not drawn. The 8 Sep map lists cross-firm transfers and active permissions; review 1 moved the permission request to
"later", with Home › Approvals.

## Part 2 · Cross-module flows

### A · The sell flow

The path the owner wants to sell (review 2 §2). Approval happens in one place, Home › Approvals (decision 6, proposed).

1. Create the product master: Hub › New product `nw-2` / `n-2`. Save and add photos → step 2; Save and set recipe → Production › Process setting `nw-15`. Price shows TBD until costing.
2. Add the pictures per colour: Hub › Upload centre `nw-3`; phone capture `n-3`; the no-photo queue `n-4`. Primary image set here.
3. (Alternative to 1) Bulk import of masters: Hub › Import pick `nw-5` / `n-5`, dry run `nw-4` / `n-6`; "Write it in" is admin only and desk only.
4. Find the design in the cabin: Catalogue grid `f-1` (voice `f-4`, filters `f-5`, scan pop-up `f-10`); show the customer the product `f-6` and the viewer `f-11`; Customer mode hides stock and tags (`n-4`).
5. Start a cart: Carts `f-12` → New cart sheet `n-9` / `nw-9`; pick a recent customer or → New customer `n-10` / `nw-10` (name, phone, city only; the rest later in the Hub). Choose the sale book (In-cabin · WhatsApp).
6. Pick into the cart: tap on grid cards `f-1`; scan pop-up quick-add `f-10`; cart card on double tap `f-13`.
7. Submit: Submit sheet `n-11` / `nw-11` (pcs, ₹, due days 10 · 20 · 30 · custom, priority 1–5, note). Nothing blocks (owner, 13 Oct). Sent state with the SO number `n-12`.
8. While it waits: Sale orders › my order in the queue `n-13` / `nw-12`; Edit reopens it as a cart `n-14` / `nw-13`; Delete in words `n-15` / `nw-14`.
9. Approve: Home › Approvals queue `n-2` / `nw-2` (flagged orders first); sale order card `n-3`; over the credit line a sub-admin sends to admin `n-4` / `nw-3`, admin approves `n-5`. Reject · Hold · Approve; "Mark for inspection → owner". The SO page `f-18` / `w-10` still carries its own Approve button today; decision 6 proposes removing it.
10. Ready to pack: Dispatch › Ready `n-27` / `nw-24` (structured) or `n-1` / `nw-1` (8 Sep band); PACK. The pending book shows what is still owed `n-29` / `nw-25`.
11. Pack: desk terminal `nw-26` (or `nw-3`); phone scan `n-30` (or `n-5`…`n-9`); review box `n-31`; invoice review with bill-to and GST `nw-5`; invoice done `nw-6`; close shipment `nw-7`; print A4 invoice and transport document `nw-8`. Gate token raised automatically (Home › Gate pass `n-7`).
12. History: Billed `nw-9` / `n-10`; shipments `nw-10` / `n-14`; Sale orders tabs `f-15` / `w-8`; the customer's dossier in CRM `n-40`…`n-46`.
13. Analytics: Sale orders › Analytics `f-19`…`f-21` / `w-11`…`w-13`, sale managers and above only.
14. Payment follow-up after delivery: CRM › Payments `n-25` / `nw-24` (see flow C).

Not drawn in this path: the scan camera and focus mode (only the pop-up exists), a "Held" order in Pending, the phone's own search, login and firm selector, the Notifications screen, a full approver card for purchase inwards, overages and costing.

### B · The production flow

1. Buy material: Production › Purchase › new PO `nw-5` / `n-4` (supplier, book, expected date, link to a production order, lines; photo from WhatsApp). PM approves (Home › Approvals, card not drawn).
2. Take the inward: Purchase inward from a PO `nw-6` / `n-5` (received qty is the typed number; variance in words; accounts card for money roles; supplier pane). Past inwards with GRN and gate token `nw-7`. Return with credit note `nw-8` / `n-6`.
3. Dye if needed: Dye ledger: bulk issue to the dyer `nw-12` / `n-12`; new cut order for a shade `nw-11` / `n-13`; receive the dyed lot as a dye WIP `nw-14` / `n-10`; dyer balances `n-11`.
4. Set the recipe once per design per colour: Process setting `nw-15` (product and sequence, last process marked Final) → `nw-16` (materials & averages, colour scope) → `nw-17` (BOM grid per colour, Set BOM); copied and locked once an order started `nw-18`. Phone reads the recipe `n-15` and edits averages `n-16`.
5. Raise the production order: Orders › new order `nw-22` / `n-19` (qty per colour, process assignment with karigar, job rate, 30/30/40 tranches, readiness pane with shortfalls and "raise PO"). Submit for approval → approver in Home › Approvals (card not drawn).
6. Work the jobs: Job cards board `nw-30`…`nw-35` / `n-28`…`n-33`; lifecycle terminal per order `nw-23` / `n-20`; assign a karigar `nw-24` / `n-21`.
7. Issue: issue pane "pieces to issue for" `nw-25` / `n-22`; on a Direct (Ready production) order `nw-26`. Scan a job QR on the floor `n-25`. Challan sticker and gate token printed `nw-29` / `n-27`.
8. Receive: receive pane with rejection, loss, over-receive held for PM verification `nw-27` / `n-23`. Karigar-recorded entries wait for floor verification `nw-45` / `n-45`, `n-26`. Karigar dues accrue per piece received `nw-44`.
9. Last process: receive finished goods with verification and transfer `nw-28` / `n-24`; the stock count happens as FG inward in Dispatch › Stock `nw-15` / `n-20`.
10. Cost and price: Costing `nw-42` / `n-41`, `n-42` (materials at average purchase rate plus job rates, margin, recommended price, own price, approval). Price on the catalogue stays TBD until this.
11. Samples run beside the recipe: new sample `nw-38` / `n-38` (also from Studio, flow E); free moves `nw-39` / `n-35`, `n-36`; receive a move `nw-40` / `n-37`; deployed sample on its 15-day reading `nw-37` / `n-39`; sample → product derives sequence and averages into Process setting `nw-41` / `n-40`, `nw-19`.

Not drawn: the approver cards for PO, production order, overage and costing (Home › Approvals shows counts only); the material invoice to a karigar on Ready production (referenced on `nw-26`, lives in Hub/accounts).

### C · The CRM follow-up flow

1. Open the day's list: CRM › Follow-ups `n-1` / `nw-1` (list chooser: Today's to-do · Refill due · What worked · New samples · Cold revival · Hot · saved lists; the step strip with counts).
2. Pick a step and a customer: step sheet / pane `n-4` / (in `nw-1`); history `n-5` / `nw-4`.
3. Work the step: edit the message template `n-7` / `nw-6`; attach designs → Share terminal `n-11` / `nw-10` (customer pane with Info · Packets · Orders, Purchased grid with a time frame `n-12`, Recommended and Catalogue grids `n-13`); sort & filter per grid `n-16` / `nw-15`; verify against stock `n-18` / `nw-17`.
4. Compose and send: composer `n-19` / `nw-18` (send to `n-20` / `nw-19`, pictures, video, logo `n-23`, `n-24` / `nw-22`, `nw-23`, message, export `n-21` / `nw-20`); sent `n-22` / `nw-21`. The packet appears on the customer's Packets tab `nw-12` / `n-41`.
5. Record the outcome: Done → next customer `n-8` / `nw-7`; Snooze 14/30 d `n-6` / `nw-5`; Skip; note.
6. Orders that result enter the sell flow at step 5 (WhatsApp sale book).
7. After dispatch and delivery, the bill enters Payments: stage strip `n-25` / `nw-24`; bill sheet `n-27`; log payment `n-29` / `nw-27`; snooze `n-28` / `nw-26`; escalate `n-30` / `nw-28`; cleared by number `n-31` / `nw-29`; weekly broker and agency report `n-34`…`n-36` / `nw-32`, `nw-33`.
8. Journeys are built and published in Journeys `n-48`…`n-54` / `nw-42`…`nw-47`; a customer keeps the journey version they entered on (implied by the screen).

Not drawn: where "delivered" is recorded (the payment journey starts on customer confirmation); the executive's phone variant without ₹.

### D · The sale-return flow

1. Customer at the counter: Dispatch › Sale return step 1 `n-21` / `nw-16` (customer, boxes, the bills returned from; customer snapshot pane).
2. Pieces: step 2 scan per box `n-22` / `nw-17`.
3. Preview with blockers in words: step 3 manager `n-23` / packer `n-24` / `nw-18`.
4. Credit note raised, sent to accounts approval: step 4 manager `n-25` / packer `n-26` / `nw-19`.
5. Approve: Home › Approvals › Returns, sale return card `n-6` (web not drawn). Pieces re-enter finished goods only on approval ("stock on approval").
6. Read later: Sale orders › Returns `n-1`, `n-2` / `nw-3`, `nw-4`; customer dossier › Returns & credit notes `n-45` / `nw-39`.

### E · The Studio generate-and-adopt flow

1. Open a track: Studio › Stitch › Tracks `n-1` / `nw-1` (one track per category; threads inside).
2. Choose context: context selector `n-7` / `nw-6`, `nw-7` (Products · Materials · Samples · WIP · Moodboard; up to 8 picks, one Main; the metadata switch sends house data, sold ₹ only for money roles).
3. Generate: designer `n-2` / `nw-2` (template and grid); pick a tile → version; zone edit with a material dropped, four variations `nw-3` / `n-4`; compare versions `nw-4` / `n-3`; tune `nw-5` / `n-5`; swipe approval on the phone `n-6`. Feedback (thumbs, picks, swipes) feeds Memory.
4. Adopt: Save as sample `nw-8` → Production › Samples › In designing `nw-36` / `n-34` with the render as the sketch and provenance "from the track". Then flow B step 11.
5. Or share: History item `n-11` / `nw-11` → the CRM WhatsApp packet (flow C step 4); or "Use as design content" → a draft product or material master in the Hub (`nw-2`, `nw-6`), implied by the screen.
6. Learn: Memory › What works `n-12` / `nw-12` joins Stitch versions → sample → activation → reading → demand → pcs → returns; taste rules `nw-13`. Settings `n-13` / `nw-14`, `nw-15`.

Not drawn: Photoshoots; the phone's Save as sample; a design-team role.

## Differences from the 8 Sep map (`design/SUTRA-SCREEN-FLOW.md`)

- Home: Approvals now has drawn screens (queue, sale order card in three states, sale return card, gate pass). Notifications is a strip on Home, not a screen. Hold is a third action beside Reject and Approve (owner's 13 Oct brief, not in the BRD).
- Catalogue: Carts gained the new-cart, new-customer, submit, sent, in-queue, editing and delete screens; the over-credit-line block of the 8 Sep map and the BRD (F:17) is gone, replaced by approver-side flags (owner, 13 Oct). Two calmer grid headers are drafts for compare. A Desk-density pair exists for Sale orders.
- Dispatch: three bands now exist (8 Sep, approved bar, structured). The map's "In stock filter on by default" and the pending book as pane are on the approved-bar frames. "Held" is still not drawn.
- Production: as mapped; the header has eight buttons and review 2 proposes six (Purchase ▾ · Materials ▾ · Recipes · Orders ▾ with Job cards · Samples · More ▾). Phone screens exist for every sub-menu.
- CRM: as mapped, with the phone counterpart of every web view and the Purchased grid restored as a third grid.
- Studio: the sub-menus are Stitch · Moodboard · History · Memory · Settings; the map's Memory › Sessions and Memory › Settings moved to History and Settings. Photoshoots and Upload centre are buttons; Upload centre is drawn under Hub.
- Hub: the map's Master views, Reports, Report builder and Compare are not drawn; instead Masters (census, dossier pane), New product, Upload centre, Import and New material are.
- Channels: still not drawn.
- Shell: login, firm selector, user menu and phone search remain gaps (review 1).
