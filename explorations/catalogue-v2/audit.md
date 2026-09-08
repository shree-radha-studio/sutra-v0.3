# Catalogue explorations: audit and directions

Design read: phone catalogue for a premium ethnic-wear wholesaler, used by a salesperson in a cabin with the customer looking over their shoulder. The photo is the product; chrome must be quiet, thumb-sized, instant and readable. Dials: variance 5, motion 5, density 5. Lenses: Apple design (fluid interfaces, materials, typography), taste-skill (anti-default discipline), frontend-design (one signature per direction), and the Sutra design-system non-negotiables. Palettes are deliberately neutral: the garments are the colour.

## What the audit found (applied to 1a′ and 1b′)

Shared by both originals

- Two floating layers at the bottom (cart tray + bottom bar) cost about 140px and read as two materials. Now one glass dock with the cart chips as its top row; content scrolls underneath.
- Six modules in a 390px bar with the label only on the active item. Now five tabs, every one labelled; the full module list moved to the side menu.
- Hit targets below 44px (top-bar icons 36, chips 28, "+" 34, stepper 28). Now 44 for icons and steppers, 32 to 36 for chips, 40 for the card control.
- No pointer-down feedback. Every tappable element now scales on press.
- Tracked caps on the role, the count, every section head and every tag at once. Section heads are now the display face in sentence case; caps are reserved for tags.
- Three control rows before the first photo. Count and view toggle join the filter row.
- Fixed letter-spacing at every size. Display tightens, small caps loosen, body stays at zero.
- Card control was add-only. Every card now carries a stepper showing the active cart's quantity (0 shows a single "+"), so the salesperson adds and edits without leaving the grid.
- Scan-armed state shown, cart button missing from the top bar. Bag with count sits next to scan; the top-right button opens the side menu.

1a Gallery: the 1.5px category rule and 15px tabs were easy to miss with a thumb; now 17px with a 2px maroon line. The card "+" was a flat circle; now dark glass on the photo.

1b Atelier: the gradient scrim darkened the hem of every garment; replaced by a frosted caption strip over the bottom fifth that also carries the stepper. Three radii collapsed to one scale (20 / 14). Bodoni never below 17px. The 34px masonry offset that left a hole is halved.

## Two new directions (both mature, both neutral)

3a Editorial. The design system's own palette taken seriously: sand canvas, espresso ink, Cormorant Garamond for anything a customer reads (names, prices, tabs), Jost for the interface, maroon exactly once per screen (active tab line, primary button, active cart chip). Rounded 18 / 22 / 14, every floating surface is glass. Search is a real field in the top bar with the single Sort & filter control inside it, as the BRD asks; the category row carries the count; filter chips share a row with the grid/list toggle. Signature: the stepper lives on the photo, so the grid is the cart.

3b Studio. A cool neutral graphite (a different room from Atelier's brown), ivory type, Manrope throughout with tabular figures, Sutra gold as the only accent. Photos are the only colour. Captions sit on frosted strips inside the photo with the stepper on the strip; the bottom island has the scan button raised in the centre (scanning is the floor's most frequent action) with the cart chips floating above it. Same search-field top bar. This is the direction closest to the photo-booth reference you sent: dark, glass, rounded, minimal.

Both keep the rules: photo beside every design number, Lucide only, no emoji, money only where the BRD allows, price with the 5% lead digit, sentence case.

## New screens on every v2 row

- Scan pop-up, redone. Camera behind a soft rounded focus frame, a "Recognised" glass chip, the scan-to-add pill with a green ring, and a rounded pop-up at about 70% height: image card 55% with the colour boxes on the image, then go-to-product, cart tabs, four quick-add actions with icons, per-colour quantities.
- Full-screen viewer, redone as dark glass: back, share, bag as glass circles; a thin position thread at the top; the caption; the thumbnail tray (colours, a divider, then media) and the cart action bar as two rounded glass islands. Real gesture: 1:1 drag, velocity projection, critically damped spring, rubber-band, reduced-motion snap.
- Cart card. Double tap on a cart chip opens that customer's cart over the catalogue at under half the screen: header with customer, sale book, pieces and total; compressed rows with a small photo, the design number highlighted, colour and rate, a stepper and a clear button per row; the list scrolls inside the card (fade at the bottom); Clear cart and Submit for approval.
- Side menu. From the top-right button: every module as a collapsible section with its sub-menus from the BRD (Home, Catalogue, CRM, Production, Dispatch, Hub, Studio, Channels), the current module open with the current screen marked, and theme, profile and sign-out in the bottom bar of the pane.

## Final rows (F light · F dark)

Built from 3a Editorial with your screen-by-screen notes, one set of screens rendered through two token sets. Dark is Atelier's espresso pushed about 15% toward black, stark white type, maroon as the only line, no gold chips (the mark keeps its gold).

- Top bar: lockup, role, bag with count, menu. Search island: filters button and grid/list toggle (one button, shows the other view) on the left, outside the bar; the maroon scan button sits inside the field at the left, as large as the field allows; the right side of the field stays clear.
- Lists bar: default lists in the display face, saved lists in italic in a second colour, the current list a filled pill; the row scrolls sideways with a fade and a narrow chevron. The chips row sits directly under it with the design count on the left and a slim maroon scroll indicator. One hairlined block, less height than before.
- Grid: 8px gutters, 10px rows, photo 4:5 as the hero. Overlays are veils with no outline: smaller translucent tags, longer colour strips on a soft bottom hue, the stepper (active cart qty) bottom-right. Without an active cart the stepper disappears. Caption is two tight lines. Prices: lead digit 8% up, the rest 5% down.
- List view: 62×78 photo, name, code, category, colour strips, price, stepper.
- Dock: the cart chips are their own subtle island above the main island (the pattern for in-module activity everywhere). Main island: Home, Catalogue, ● ask, Dispatch, Production, More.
- Ask: pressing ● raises a short aura band from the island over the cart strip: listening indicator, live transcript in the display face, the filters it understood as chips, result count. On-device transcription; tap ● to stop. It does not take over the screen.
- Filters & sort sheet: recommended lists, sort segment, groups (category, colour, price, tags, stock, market), Save as list, Reset, Show n designs.
- Product page: veils only over the photo; colour thumbs without outlines, active marked by a dot; the tray has a cart selector, stepper and Add.
- Scan pop-up: veils only; the scanned colour is named under the design and on the Add pc button.
- Carts: one card per customer, designs grouped with their colours, stepper beside each colour, hairline separators, note, totals and submit.
- Cart card and side menu: approved; the module no longer appears twice, the open section has a maroon edge and its own panel, and the current module says "here".
- Second pass (5 Sep): lists are All · Samples · Materials · Lehenga · Saree plus saved lists. The agent button is an unlabelled orb at the far right of the island, a shade larger than the icons, with a spectral ring that spins while listening; listening shows a glow breathing along the bottom edge behind the island and one subtle centred dictation line, nothing else. Captions lead with the design number, then category · collection. The header block from logos to chips sits on a lifted surface with the lockup on its own pill. Search island 8% shorter with the search icon, the scan button and a recognise-by-image button inside the field; lists and chips breathe more. Island: Home, Catalogue, CRM, Dispatch, Production, More (widgets), orb. Cart icon is a real cart, highlighted. Product photo taller. Full-screen viewer is view-only with a stronger tray. Carts show per-design totals with bigger photos. Grid gutters a touch wider.
- Salesperson view, redesigned around the order conversation: number, category · collection, price with cost and margin, editable tags; three tiles (can promise now, in production with due date, demand score with rank and trend); by-colour availability as stacked bars (free, reserved, coming) with the promisable count per colour; selling chart with last month, lifelong and open orders; production timeline; recipe and media compressed to chips; tray with Media, Set tag and Add to cart.
- Sale orders sub-menu: cards (Raised, Approved, Dispatched tabs, print and share per card, table and analytics buttons), table (draggable column heads with per-column filter and sort cards, sticky first column, all ten columns), opened order (full customer bar with purchase history, lines by design and colour, totals, print, share, approve), analytics at order level and design (SKU) level with 7/30/90-day and custom date ranges, filters and sort.
- Side menu gains Recognise by image under Catalogue and a settings button in the footer.
- Third pass (5 Sep, later): lists drop Plazo and add Materials. The agent button is a hollow orb with a dark border and the agent mark, at the far right of the island; a spectral ring outside it spins and breathes while listening, and the aura behind the island is brighter and more saturated (no bottom bar). The dictation line is one subtle centred sentence. Captions lead with the design number, then category · collection. Header compressed: lockup on a tinted box, cart is a basket that glows when carts are active, search island 40px with the view toggle first, filters second, then a thin-outlined field holding the maroon scan button, an outlined camera-with-magnifier for recognise-by-image, and the search icon on the right; lists and chips breathe more. Carts show per-design totals with bigger photos. Full-screen viewer is view-only with a stronger tray. Island: Home, Catalogue, CRM, Dispatch, Production, More (widgets), orb.
- Salesperson view returns to your 3a layout in three tabs with better viz and alternating card surfaces: stock by colour as stacked bars with free · reserved · in production and a promisable total; production timeline with dates and a received-progress bar; recipe rows with stock-vs-PO bars; media centre as tiles; demand as a ring gauge; sales lines on a sparse grid; lifelong as an area; orders with status pills.
- Sale orders: tabs Raised · Approved · Dispatched · Cancelled; a labelled, outlined Analytics button; the table lives inside its own frame down to the island, with a horizontal scroll track under the heads, a vertical track, sticky first column, grips on every head and a per-column filter card; Group by opens a chaining island (Customer → Agency, tap the arrow to flip the sort, drag more columns in) and the table collapses those columns into group rows; a Columns button chooses columns. Analytics: Orders (orders vs dispatch lines, pipeline, weekday), Designs (colour split, trend sparkline, category donut), Customers (sale vs payments, tier donut, orders by city, customer list with overdue). Every chart sits on a sparse light grid.
- Web rows (W light, W dark), 1280 × 800: rail sidebar with icons, expanded text sidebar with collapsible sub-menus from the top rail button, header with title and crumb, the search island, bell, glowing cart, user chip and the orb; main content plus a collapsible right pane used for the active cart, order previews, customer info and analytics range/filters/sort. Fourteen web screens mirror the phone finals.

## Board structure (5 Sep)

Drafts on top: exploration rows by module (Catalogue: 1a, 1b, 1a′, 1b′, 3a, 3b); future module explorations go here. A wide gap, then Finals as a table: a label column (module › sub-menu, flow, counts), a phone column with three light + dark pairs per line, a web column with two pairs per line, bordered cells with spacing, a module band per module (Catalogue, App shell), a row per sub-menu (Catalogue, Carts, Sale orders, Navigation), screens in flow order with large numbered captions.

## Open questions for you

1. Which row to fold into tokens and components: 1a′, 1b′, 3a or 3b, or a mix (for example 3a grid with 3b's island bar).
2. Studio's island puts scan in the centre and drops Chat from the bar. Keep, or restore five tabs with scan in the top bar?
3. The cart card shows six lines with the rest scrolling. Is under-half-screen the right cap, or should it grow to two thirds when the cart is long?

## Catalogue · tag system (8 Sep, new drafts)

Source: `design-system/guidelines/chips-filters-sorts.md`. File: `mod-catalogue-tags.jsx`. Four phone screens and two web screens in the New drafts table under "Catalogue · tags".

- Chips on the grid: one action chip (Priority production, High growth, Restock, Priority sale) and one state pill (Low, In production, Reading 9/15, −15%) per card, both as veils top-left; the action chip carries a small coloured dot instead of a coloured fill so the photo stays the colour. A "· 2/4" suffix and ringed colour bars mark which colours matched. Sample ribbon top-right, TBD in the price slot. Designs with no action tag show nothing (Monitor is silent).
- Quick row under the lists bar: Lehenga ▾ (caret chip, shows its value) · In stock · Wine × (a sheet-only filter echoed as a removable chip) · New · High growth · Priority sale · Discounted. Active chips pin left and the row scrolls.
- Customer mode: promotional badges only (Trending, Bestseller, Low stock, Staff pick) as veils with an icon; a maroon banner "Customer mode · stock and tags hidden · Exit"; quick row reduced to Category ▾ · New · Price ▾; saved lists hidden.
- Why? panel: glass card over the grid with the tag name and dot, a one-line reason, six input rows (demand score, selling, free stock and cover, lead time, colours, calculated at and rule version) and Job cards · Product · Dismiss. Web shows it beside the outlined card with the cart pane open.
- Sort & filter sheet: search-within-filters, sort as radio chips (Demand score default, More sorts), groups collapsed with a maroon count badge (Category & work 1, Colour 1, Price, Stock 1), Action tags open with the dotted chips and the colour scope (Any / All / Selected), Demand open with the five-band chips, the 61–100 slider and Rising / Falling, then Rank & lifecycle, Production, Media, History, Channel collapsed. Footer: Clear all · Save view · Show 126 designs. On web the same body sits in the right pane titled Sort & filter.
- Departure from the plan file: the plan proposed gold for promotional badges; the schema reserves gold for the mark, so badges use the veil with an icon instead. Green is used only as a 6px dot on High growth.

New components: ActionChip, StatePill, PromoBadge, QChip, QuickRow, TagLists, TagHeader, TagCard, WhyPanel, SheetBody, SheetFoot.

Open: whether Priority production and Restock should be pinnable quick chips for the sale manager role; whether the state pill should also show on the list row; the Why panel's action buttons per role.

## App shell · web chrome and sale orders (8 Sep, new drafts)

File: `mod-appshell.jsx`. New drafts table, first two module bands: "App shell · web chrome" (6 web screens) and
"Catalogue · sale orders" (4 web, 2 phone). Finals untouched. Ids `nw-1` to `nw-10`, `n-1`, `n-2` (dark: `nwd-`, `nd-`).

- Tab strip (`TabStrip`): open screens stick like browser tabs on a sunken strip above the header. The active tab is
  drawn as the page's own sheet (surface colour, 8px top radius, a 6px flare at the base, hairline edge) and merges
  into the header, so the tab reads as "this sheet", not a floating pill. Inactive tabs are icon + label with
  hairline separators; Home is pinned as an icon; "+" opens a tab; a "5 tabs" chevron lists them. The reference shape
  (rounded deal tab) kept; the flare and the merge into the header are the improvement.
- Header (`WebHeader2`): path in small text with chevrons, page head in the display face under it, on the left.
  Right side: the search field (scan · recognise · placeholder · ⌘K · search), bell, cart, then the orb at the far
  right. The profile dropdown is gone; the user lives in the sidebar only.
- Sub-menu hard buttons (`SubBar`): the module's sub-menus as pills in one row under the header; the current one is
  a filled ink pill and shows its sub-suite ("Sale orders · Raised ▾"). Pills with sub-suites open a floating glass
  menu (`SubMenuFloat`) anchored under the pill: statuses with counts, then Analytics (Orders · Designs · Customers),
  then Views (Cards · Table). Customer mode is a pill with a hollow dot (a toggle).
- Rail / sidebar (`Rail2`, `Sidebar2`): Sutra mark 26 → 28 (8%); "RM" in white bold with "Hi Rohan!" beneath, no
  maroon disc; log-out removed; the firm's white logo (srs-dress-only) sits at the foot of the rail. Log-out moves to
  the profile's floating menu (BRD: profile, show/hide modules, track).
- Search pane (`SearchPane`): drops from the header field as its own glass sheet on the right (478 wide, distinct
  from the right pane). Stage 1: the field, a Filter & sort button, scope chips (All · Designs · Sale orders · Sale
  invoices · Production orders · Purchase invoices · Customers · Karigars · Materials), Recent, For you (habit rows),
  Quick actions, a key hint footer. Stage 2 ("27"): Designs as photo cards with stock and price, Sale orders, Sale
  invoices, Customers, each with a count and See all; matched digits in maroon; the Filter & sort chooser opens as a
  second viewer beside the pane so the matches stay visible.
- Sale orders table (`SOTable2`): columns flex to fill the main window (min widths, no dead space on the right),
  no group-by island, pane collapsed; footer with count, pieces and total. Default 13 columns: Order, Date,
  Customer, Status, Due, Pcs, In stock / total, Designs, Bill, Prod status, Prod due · pcs, Invoices, Agent.
- Column chooser (`ColumnChooser`): 13 of 34, find-a-column, presets (Default · Production · Accounts · Dispatch ·
  Mine), seven groups as cards (Order, Customer, Agent, Quantities, Money, Production, Dispatch) with grip + checkbox
  rows; a layers glyph marks multi-value columns (ship-to ledgers, invoice numbers), a lock marks money columns that
  follow the role. Footer: Reset to default · Save as preset · Apply.
- Returns tab: fifth tab after Cancelled on phone and web. Card = credit note number, stock pill ("Stock on approval"
  or "Back in stock"), customer, amount, returned of total pcs, reason, order and invoice chips. Web pane shows the
  customer bar, the note, the returned lines and "Approve to stock"; a dashed note says returns are booked in
  Dispatch › Sale return and pieces re-enter stock after accounts approve (brd-final 216–217).

Reference reading: the sidebar + small breadcrumb (Spark Pixel, OpenStatus) fits our rail; the WALLET pill row is
the sub-menu bar; the top text-link nav (NevBank, Fundraising Hex) does not fit a product with a sidebar and eight
modules; the soft gradient hero is louder than our canvas. Kept: pills, small path, paper tabs. Dropped: gradients,
top nav, coloured KPI arrows.

Open: whether the tab strip should also hold Home as a pinned tab or the rail is enough; how many tabs before they
collapse to icons; whether the sub-menu bar hides on scroll; per-role presets for the column chooser; whether the
search pane should remember the last scope.

### Salesperson view · tag rail and why sheet (8 Sep, later)

Two more phone screens and two web screens in the same module row (ids shift with the modules above; read them from `ND_PHONE` in the console).

- The old single tag line under the price is replaced by a three-row rail: Action (every action tag that fires, each chip joined to a "2/4 · why?" tail), Colours (one pill per colour with free pcs, in-production pcs and a LOW / OOS word), About (descriptive tags muted: category, work, base, collection, season, price band, cohort, general tags). Rows scroll sideways on phone and wrap on web.
- "Customer sees" strip under the rail: the promotional badge the customer view shows, with Edit for the sale manager.
- Demand block: ring 78 with the band word and lifecycle (High · Active), the five-band meter, the score over ten weeks, then Rank · Growth · Most sold · Buyers tiles. The three tabs and the stock card follow as before.
- Why sheet (phone, from the why? tail): reason sentence, six fact tiles (demand score, selling, free stock, cover, lead time, rule), score over ten weeks, a by-colour table (free · cover · prod · fires) so the "2 of 4" is traceable, the calculated-at and rule-version line, then Out of stock · Job cards. Web shows the same in the right pane titled Why?, with the chip highlighted in the rail.
- Board mechanics: the module now registers itself from the end of `mod-catalogue-tags.jsx` via `window.NEW_DRAFT_MODULES`, and `index.html` spreads that array into `NEW_DRAFTS`; the skill file documents this so concurrent chats stop overwriting each other's entries.

New components: TagRail, ColourState, DemandBlock, CustomerSees, TagSalesHead, WhySheet, ScreenTagSalesRail, ScreenTagSalesWhy, WebTagSalesRail, WebTagSalesWhy.

Revision (8 Sep, later): header cluster order is now bell, cart, search field, orb. The tab strip is page-coloured
with a light hairline base (no sunken strip, no corner against the rail), tabs are 28 tall and flush with the top
edge, the active tab has flowing S-curve sides in the surface colour, Home is not a tab. The sub-menu moved into the
header row beside the page head as plain text buttons (soft rounded rectangle when current, chevron on those with a
sub-suite), so the header is one bar: path + head, module menu, then the right cluster.

## Dispatch drafts (8 Sep) — `mod-dispatch.jsx`, `mod-dispatch-web.jsx`, plan in `plans/dispatch.md`

Built from the Dispatch section of the BRD, the dispatch BRD, the v2 screen overview, the owner's answers of 8 Sep and
the chips guideline §3E. 26 phone and 19 web screens, light and dark, on the module page `board.html?m=dispatch` (registered from the end of mod-dispatch-web.jsx since the 9 Sep board restructure; ids n-1…26, nw-1…23). The web view is the
primary terminal and every web screen has its own module pane (`RightPane`), separate from the global search pane.

What the drafts decide (owner-confirmed unless marked):
- Money only for manager and admin roles; the phone carries both variants (Pending, Billed, invoice sheet, return
  preview and credit note) so the packer's screens show pcs only, with "amounts hidden for your role" where a total
  would sit.
- Web chrome is the new app shell: `Rail2`, `TabStrip`, `WebHeader2`, `SubBar` with the six Dispatch nodes and their
  live counts, LIVE/OFFLINE chip in the header, `RightPane` for the module pane. Ready keeps the BRD's persistent
  queue rail (sort, quick chips, filter groups, "state in the URL").
- Returns are taken box-wise; one box may carry many bills and end in one credit note per bill or per box (chosen in
  the pane at step 2); the desk raises the notes itself and they go to accounts approval before Busy.
- FG inward is a fourth Stock tab: the process marked "last" in Production arrives at the warehouse with an auto gate
  token, is counted per colour and verified into stock; the karigar's due is raised on verify.
- Delivered on = dispatch + 3 days, shown as "(est.)" until the customer confirms.
- Billed carries a "still pending n pcs" chip per customer group.
- Parcel cards carry the customer monogram and an ink bar; the priority ring (`--p1…--p5`) appears only on Ready.
- Right panes designed for the moment: Pending (customer snapshot with what is short), Packing (live invoice in
  LIVE / REVIEW / DONE), Billed (the invoice with score, last broker, voucher, re-print, return), Shipments (transport
  document), Out of stock ("who is waiting" with call-and-promise), Stock FG (this SKU: stock bars, cover, last
  inward, open orders), Material (supplier and last GRN), WIP (the karigar's balance), Return step 1 (customer at the
  counter), steps 2–3 (the credit notes building), step 4 (the printed note).
- GST block with blank HSN (U33 open); restock copy "below lead time (45 d)"; scan rejections use the five BRD
  reasons and the three-step barcode guard wording; the green "flash" and "Fully planned" are ok-tone tints and a
  tag, not fills.

New components (all in mod-dispatch.jsx, on `window`): Pill (outline state pill, filled only for danger), DuePill,
PDisc / priority ring on CustomerCard, LiveChip, CallChip, GateToken, Monogram, OutBtn, Toast, Progress, ProgDisc,
PackLine, OrderHead, CustomerCard, PendingTree, CustomerChip, ParcelCard, InvoiceSheet (+ inWords), ColourMatrix,
KarigarPill, OOSCard, StockRow / StockPill / StockTabs, StepRail, ReturnLines, CreditNote, RecentNotes, FGInwardCard,
Sheet, ScanCam, BilledGroup, ShipmentRow, DHeader / DNodes / DSearch (phone chrome). Web: DShell, QueueRail,
PendingPane, CurrentOrder, PackingBoard, A4, TransportDoc, StockShell, RetShell, CounterPane.

Open for the owner: whether the packer's phone should say "amounts hidden for your role" or simply omit the line;
GST rate per design (U33) before the A4 is final; whether "Reserve for Raaslila" belongs on the Stock pane or in
Channels; the sort label on the FG inward tab.

## Rail, greeting and top bar v2 (8 Sep, later)

Rail (`Rail2`, `Sidebar2` in `mod-appshell.jsx`): foot order is now user mark → settings → firm logo, the logo lifted
22px off the foot. "RM" sits on a soft white highlight (9% white, hairline inset) and a greeting cycles above it every
2.2 s through Hi · hello (italic serif) · नमस्ते · Hola · Bonjour · Ciao · ਸਤ ਸ੍ਰੀ ਅਕਾਲ · Salaam in their own faces
(`Greet`, keyframes `hicycle` in index.html; reduced motion shows "Hi" only). The expanded sidebar lost the per-module
sub-item counts (5 · 6 · 9) — they read as notification badges and tell a new user nothing.

Sidebar audit (what I looked at, what I changed, what I left for you):
- Kept: espresso rail as the one dark anchor on the sand page; gold mark as the only gold; maroon inset bar + icon for
  the active module; expanded sidebar replaces the rail rather than stacking beside it.
- Changed: counts removed (above); footer spacing so the greeting has room; settings between user and firm logo.
- Left for you: the rail's eight icons carry no labels, so a new user learns them only by hovering — the phone island
  labels its icons at 9px and the rail could too (or open expanded by default for the first week). The collapse toggle
  sits above the mark, two unrelated things stacked; it could move beside the firm logo. The firm logo at 38px is a
  texture more than a mark; if it must stay this small, the dress mark alone would read better than the full lockup.

Top bar v2 (`mod-topbar2.jsx`, New drafts last band, ids `nw-34` … `nw-36`): the header from a new user's seat.
Problems with the previous bar: three horizontal bands (tabs, header, buttons); the module name shown three times
(rail, path, button); navigation and actions mixed in one row (Direct scan and Recognise by image beside Carts);
text buttons with no affordance; a floating count; too many controls at one size.
The fix names the levels and gives each one shape: menu = rail; sub-menu = ONE segmented control beside the page
head (eyebrow = module, head = section); sub-sub-menu = underline tabs at the top of the page, with Analytics after a
hairline; actions leave the row (scan and recognise inside the search field, Customer mode as a real switch, LIVE in
the tab strip). Sale order analytics shows the sub-sub level as Orders · Designs · Customers with an "Orders list" back
chip; Dispatch Ready shows the segmented control carrying the nodes (Ready · Pending · Packing · Billed · Stock · Out
of stock · Sale return) and no sub-sub tabs, so the page opens on its own search bar. The Dispatch drafts built in
parallel used the earlier `SubBar`; once this bar is approved they move to `WebShell3`.
The map of menus, sub-menus and sub-sub-menus now lives in `design/SUTRA-SCREEN-FLOW.md`.

Top bar v2, revised (8 Sep, evening): the screen path is back above the head (10.5px, chevrons), the head is 24px
(10% up) with 7px between them; the head block is a fixed 196px so the sub-menu buttons start at the same x on every
screen and sit centred on the head, near the separator. Buttons are the plain text kind from the earlier raised
frame (soft rounded rect on the current one, chevron on those with a sub-suite) but organised the v2 way: only
navigation in the row, Customer mode as a switch, scan and recognise inside the search field. Tabs keep naming the
object that is open ("SO-3033 · A V Creation").
Dispatch on the new bar (`nw-36` … `nw-39`): Ready and Pending are separate sub-menus. Ready = fresh orders with an
"In stock" toggle on by default; its pane is the whole pending book as a journey (customer → orders, each with a
raised → approved → 1st dispatch → done track and a red tick once past due) or, when a card is picked, that order with
an "All pending" way back. The queue rail folds to a strip so two full cards fit beside the pane. Pending = four
situations as the sub-sub-menu (Pending approval · Pending dispatch · After 1st dispatch · After due date, due day 25
by default, an order can sit in two), grid and list views, order pane with money for manager roles.
Edited frames: `nw-34`, `nw-35`, `nw-36`. New frames: `nw-37` (Ready, order picked), `nw-38` (Pending grid), `nw-39`
(Pending list). The Dispatch drafts from the parallel session (`WebDReady`, `WebDPending`) stay as they were until
this bar is approved.

## Top bar v2 approved (8 Sep, night)

The header row is lined up: the path sits at the top of the bar, the head (24px) and the sub-menu buttons share one
centre line near the separator, the right cluster on the same line. Approved, so the shell moved into the finals:
`web.jsx` now holds TabStrip, SearchField, Greet, Rail2, Sidebar2, SubMenu, ModeSwitch, Header3, ViewTabs, CAT_SEG,
DISP_SEG, SO_TABS2, WebShell3 and the `WebShell` wrapper the fourteen catalogue web finals call (it derives the
sub-menu from the title and path, names the open tab after the object, and adds the Returns tab and Analytics to the
sale-orders view tabs; analytics pages get the Orders · Designs · Customers sub-sub tabs with "Orders list" back).
The old Rail, Sidebar, WebHeader and SubBar-in-shell are gone from the finals. Drafts that used `WebShell2` render on
the approved bar through a thin wrapper; the Dispatch drafts from the parallel session keep the earlier header until
their screens are moved. New drafts now: search pane (2), sale-orders table + returns (4), tags, Dispatch, and
"Dispatch · on the approved bar" (Ready ×2, Pending ×2). Schema §5 rewritten; screen-flow brief updated.

## CRM drafts (8 Sep, night) — `mod-crm.jsx`, `mod-crm-web.jsx`, plan in `plans/crm.md`

First pass: ten phone and fourteen web screens in the New drafts table (the module now opens on its own page,
`board.html?m=crm`, where ids count within the page). Built on top bar v2 (`WebShell3`), sub-menu Follow-ups · Share · Payments · Customers ·
Journeys, the phone node scroller in the same order.

- Follow-ups is the engine: preset lists (Today's to-do · Refill due · What worked · New samples · Cold revival · Hot ·
  saved lists) × journeys of steps. The step strip along the top is the one element taken from the owner's Pinterest
  reference: circles with counts joined by a line, the current step filled in the accent, done steps in ink, an overdue
  badge in danger. Web: a four-column board by step with the step pane on the right (template, WhatsApp group / Call /
  Share, attached designs, outcome, note, Snooze / Skip / Done → next, history). Phone: cards in one column, the step
  as a sheet.
- Share is the terminal: left pane = queue strip (list · step · 3 of 12, previous / next) over the customer pane with
  three tabs: Info (scores as rings, taste bars, price bands, colours, categories, tags, credit line, purchases strip,
  comms), Packets (packet history with thumbnails, sent to, template, result, Re-send, Add to packet) and Orders
  (sale-order history with status, ₹, quick chips, orders vs payments sparkline). Main = the BRD's Purchased grid on
  top (6 × 2 tiles with pcs bought / returned, 30 d · 90 d · Lifetime remembered per customer, Repeat · Returned · In
  stock, sort, filter), then two 3 × 4 picture grids side by side (Recommended · Catalogue), 92 px tiles,
  6 px gutters, one veiled line at the foot (design no · price), a match-reason tag top-left on Recommended, gallery
  selection (tick disc + inset accent ring). Each grid has its own sort caret and Sort & filter button opening the
  catalogue sheet with a "For this customer" group on top. Right pane = the packet (thumbs with ✗, option summary
  rows, Verify stock, Send). The composer is a sheet over the main window with every share and export option grouped
  (Send to · Pictures · Video · Logo · Message · Verify against stock · Export). Logo placement is its own screen:
  the picture large with the mark and drag handles, an "as sent" preview, nine-point position, size, opacity, margin,
  mark Dark / Light / Auto, a rail of the packet's pictures, This picture / Apply to all. Phone: a compact customer
  head (about 210 px) keeps the pictures on screen; grids as tabs; a selection tray island above the main island.
- Payments is the same engine over bills: stage strip with count, overdue badge and ₹ per stage; bills of the stage
  grouped by customer with "also in Escalate" pills; customer pane with payment score, credit line, bills across
  stages, message log with "auto" marks, Snooze / Escalate / Log payment; a bill cleared by number leaves its stage
  while the customer stays in the others; the Broker / agency tab lists agencies with due · overdue · issue bars and
  the weekly report preview (sections, PDF, Pause, Send now).
- Customers: the Hub list opens sorted by follow-up due with the dossier strip in the pane; phone dossier page.
- Journeys: the payment journey as a node map (trigger → wait → step → branch → end, the default cadence from the
  BRD) with the step settings pane; not on phone.
- Photos: four samples from the design system plus six product shots the owner sent (assets/crm/8321 · 8111 · 8477
  · 8190 · 8337 · 8433); the remaining fourteen tiles are the same pictures with a gentle hue shift and another
  crop, stand-ins until Studio has real pictures. `tools/package-explorations.sh` now copies `assets/`.
- Money: the drawings are the Sale manager's view; Payments ₹ assumed for manager and accounts roles only.

New components: StepStrip, FollowCard, StepWork, PickTile, PickThumb, PickHead, PickGrid, CustPane, CustHead,
QueueStrip, PurchHead, CustTabs, PacketsPane, OrdersPane, PacketPane, Seg, Composer, LogoStage, LogoControls, LogoRail, BillRow, PayPane, Gauge, HeatDot,
NextPill, Taste, CrTag, Swatches, CreditBar, CrTop, CrNodes, CrLists, CrHeader, CrTray, CrListBar, IconBtn2, JNode,
JMap, AGENCIES.

Open questions (plan §4): journey per list or per customer; step completes per customer or per attempt; who owns a
customer's follow-up; RED as a Payments list or a Home approval; ₹ on the phone in Payments. Not drawn: the Bills and
Customers tabs of Payments as their own screens, the Sale executive's no-₹ variants on the phone.


## 9 Sep 2026 · the board split into pages

**What changed.** One `index.html` held every frame of every module (about 400 device frames, each a full screen, all compiled by Babel and rendered at once). It stopped loading and barely scrolled, and several chats were editing the same file. Now: `index.html` is a hub; `board.html?m=<id>` shows one module with three views (New drafts, Finals, Compare side by side); `drafts-archive.html` keeps the six pre-final Catalogue explorations untouched; `modules.js` is a one-line-per-module manifest; `finals.jsx` holds FIN / WEB / BOARD; `board.jsx` renders frames lazily (a frame mounts within about a viewport of the visible area and unmounts when it leaves) and opens zoomed to the phone column. React loads as the production build (same library, minified; `&dev` for readable errors). The inline Dispatch, App shell and Catalogue sale-orders registrations moved verbatim from `index.html` to the end of `mod-dispatch-web.jsx`, `mod-topbar2.jsx` and `mod-appshell.jsx`. The old single-file board is kept as `legacy-index.html`.

**Why.** Load time was Babel compiling about 1 MB of JSX per page; scroll lag was the DOM size. Splitting files alone would not have fixed the scroll, so pages and lazy frames go together. Module-scoped ids stop shifting when another module adds screens.

**Team.** The project is a git repository on github.com/shree-radha-studio/sutra-v0.3 (org members have write access); `tools/sync.sh` is the one step (pull, or commit + push). GitHub Pages needs the repo public on the org's free plan; the owner decides.

**Open.** Whether to keep `legacy-index.html`; whether `mod-dispatch.jsx` should give up its shared primitives (Body, Meta, Pill, Mono …) to a `shared.jsx` so Dispatch stops being a base file every page compiles.

## Production module (New drafts) · 8–9 Sep 2026

**What was built.** Five files (`mod-production.jsx` data, shared components and floor-phone screens; `mod-production-phone2.jsx` the phone counterparts added after the coverage review; `mod-production-web.jsx` overview, purchase, materials, dye ledger, process setting; `mod-production-web2.jsx` orders, lifecycle, job cards; `mod-production-web3.jsx` samples, costing, karigars, locked role, board registration). 47 web and 46 phone screens, all light and dark, registered under one `NEW_DRAFT_MODULES.push` at the end of web3. Plan in `plans/production.md`, coverage table in `plans/production-coverage.md`.

**Decisions taken while drawing.**
- Sub-menu row: Purchase ▾ · Materials ▾ · Process setting · Orders ▾ · Job cards ▾ · Samples ▾ · Costing · Karigars; the overview is the module root. Header3/WebShell3 gained an optional `searchWidth` so the eight buttons fit.
- One filled maroon button per screen: the pane's action when a pane form is open (New PO, Assign, Issue, Receive, New sample …), otherwise the open job panel's; toolbar "New …" buttons are outlined. Action tags filled, state pills outlined.
- Timeline colours from the BRD: done ok, active blue, not started grey, stuck danger. Order states are the BRD batch states as pills.
- Dye is not a process: the Dye ledger (bulk issue → cut orders that reserve → dyed lot received as a "dye WIP" material with lineage) feeds Process setting's Materials pane and the lifecycle's "Add or swap an input".
- Sampling: free moves (any process, karigar, material); receive a move; deploy for a 15-day reading; make product derives the sequence and the averages (issued ÷ pieces) and opens Process setting 5 for review.
- Money (rates, values, dues, costing) only on money-role screens with the lock mark; the floor phone shows none. Karigar-recorded entries (jobber phone) stay Unverified — no due, voucher or gate token — until the floor verifies them.
- Costing arithmetic corrected: materials at average purchase rate + job rates = unit cost; price = cost ÷ (1 − margin); default margin per category.
- Material photographs do not exist in the project; `Swatch` draws a fabric texture by shade and the pane says so.
- Production's `NextPill` renamed `PrNextPill` (CRM exports a `NextPill` too; the later file's export won on `window`).

**Open for the owner.** Over-receive handling, default margins and who edits them, karigar score weights, sample-reading threshold, the Ready-production material invoice (Hub side), and real material photos. Listed in `plans/production-coverage.md` §5.


## Studio · AI Designer "Stitch" (New drafts) · 9 Sep 2026 — `mod-studio.jsx`, `mod-studio-web.jsx`, plan in `plans/studio-designer.md` (§12 = the owner's go decisions)

13 phone and 15 web screens, light and dark, on the Studio page (`board.html?m=studio`). Registered from the end of
`mod-studio-web.jsx`; one line in `modules.js`. Renders on the stage are the owner's own ChatGPT output (the 12-cut grid,
the numbered design sheet, the flat lay), cut into tiles in `assets/studio/`; every render carries "AI render · not a fit
sample" on screen.

What was drawn and why

- **The Stitch window is deep space.** The owner asked for "deep space black and white contrast" so the designer reads as
  agentic. The chat column and the canvas sit on a cool near-black (`SP.bg` #0B0B0F light theme, #050507 dark), white
  type, hairlines at 8 % white; everything around it (rail, header, right pane, Tracks, Moodboard, History, Memory,
  Settings) stays sand / espresso, so the window reads as a different room inside the ERP. Maroon stays the one accent
  line inside the window: the send button, the active zone, the current version, the kept tile.
- **Stitch's personality, kept subtle.** No avatar, no emoji. Stitch speaks in the display face (Cormorant) while the
  user speaks in Jost on a chip; a spectral thread (the listening aura's colours) runs beside Stitch's words, under the
  stage while it draws, beside anything it proposed (moodboard items, taste rules) and on the AI-render mark; the orb
  breathes on the window head with a status line that cycles like the rail greeting ("Stitch is looking at 8337").
- **Modular blocks, the same on web and phone**: StChat (head · tray · conversation · prompt box; collapses to a spine),
  StCanvas (dotted stage, set or picked design, zone overlay, tool palette, compare slider), StStrip (versions with the
  branch mark), StTray (context thumbs with one Main ring and the sales-data switch), StPane in three states (Set
  options · Zone · Version; head, what was made, one-click row, buttons at the foot, always in the same place), StTuner
  (translucent pane, five fixed tabs, "as you left it" per thread), StSwipe (the phone approval card), StTile / StThumb /
  StSwatch / StSeg / StSlider / StToggle. The web docks them; the phone stacks them or opens them as sheets.
- **Tracks are per-category memory** (plan §12): category cards carry threads, last worked and one line of what Stitch
  has learned; threads sit below with their state pill. The chat head reads "Blouse track · Multicolour floral, cuts".
- **Feedback is explicit**: thumbs on every set and tile (web and phone), the picked cell counts, and the phone has a
  swipe approval screen (right keep, left discard, up save) over the listening aura at low opacity.
- **The phone has every web option.** Only the right pane differs: a Pane button on the canvas opens a half-height glass
  sheet on black with the picture still visible above it (zone pane and tuner drawn); the selector is a full sheet.
- **History and Settings are sub-menus** (plan §12): History by day with the item pane (share via WhatsApp packet,
  export, moodboard; "Use as design content" → new product master or new material master; save as sample); Settings
  with Models (one model per template, providers pane with key state, usage), Defaults (sales data fields and default,
  cells, variations, memory retention, forget) and Sharing (WhatsApp share-in number, who edits).
- **Memory** = What works (rows, not conclusions; "Not enough data yet" until five rows finish their read) and Taste
  rules with provenance (typed by you · proposed by Stitch from thread X), with the "Stitch proposes" pane.
- Money: sold ₹ never on tiles; the selector shows demand band and score with pcs when sales data is on; target price on
  the save-as-sample sheet is marked money roles; usage cost "shows for admin only".

New components (all `St…` / `ST_…`): StThread, StMood, StMark, StSwatch, StTile, StThumb, StSeg, StSlider, StToggle,
StToggleRow, StCaret, StBtn, StThumbs, StHead, StTray, StMsg, StPrompt, StChat, StZoneOverlay, StCanvas, StStrip,
StVariations, StRow, StChipRow, StPane, StTuner, StSwipe, StTop, StNodes, StHeader, StHalfSheet, StTrackCard,
StThreadRow, StMoodTile, StHistRow, StVerdict, StWorksRow, StRuleRow, StModelRow, StSelTabs, StSelGrid, StSelTray,
StCanvasCard, StCanvasScreen (phone); StShell, StMain, StBar, StCard, StPPane, TuneBtn, StStage, StSelector,
StSaveSheet, StThreadPane, StMoodPane, StHistPane, StWorksPane (web).

Known limits of the drawing

- The phone status-bar time is drawn by the device frame in dark ink on light-theme frames; over the black Stitch
  window it disappears (it shows in the dark pair). A device-frame change, not a screen change.
- Zone rectangles are hand-placed percentages over the picked render; on a real product the agent would draw them.
- Materials have no photos yet; swatches are drawn (velvet, sequin net, silk, mono net, tissue, lace, satin).
- The models are named the way the BRD names them (nano banana, gpt image 2) plus a neutral "chat model"; the
  OpenRouter route is a technical note, not a design element.

Open for the owner: the ten questions in plan §9 minus the three answered by the go message (one Studio module, keep the
zone edit, roles as drawn); whether History should also list generations that were never kept; whether the swipe screen
should offer "up = save to moodboard" instead of "save as sample".

### CRM · every tab, sheet and button, phone and web (9 Sep)

Two more files: `mod-crm-more.jsx` (the remaining web states) and `mod-crm-phone.jsx` (phone counterparts for every
web view, and the module's registration rebuilt in flow order). 47 web and 54 phone screens now; on `board.html?m=crm` they are nw-1…47 and n-1…54 (nd-/nwd- dark). Shared sheet bodies
(NewListBody, CustFilterBody, BillFilterBody, TemplateBody, SnoozeMenu, SortMenu, CustomerPickerBody, ViewerBody,
ContactBody, ExportBody, SentBody, LogPaymentBody, EscalateBody, StartFollowBody, NewJourneyBody, PublishBody,
TestRunBody, ScheduleBody, ColumnsBody, the four dossier tab bodies, LogoAllBody, TodayRows, HistoryRows,
BillsTable, PayCustomerRows) render inside a web sheet (`WSheet`) or popover (`Pop`) and inside the phone `Sheet`
via `pSheet`. Base screens took `overlayX` / `paneX` (web) and `over` (phone) hooks so states stack on the same
screen. The journey map takes `nodes` / `edges` (Refill journey) and a `ghost` node; on the phone the map is a
vertical flow (`JFlow`). New web chrome: `Overlay`, `WSheet`, `Pop`, `MenuRow`, `FRow`, `Fld`, `Toggle`, `Check`;
phone: `pSheet`, `pFoot`, `PTabs`, `PCard`. Verified light and dark in the browser, no console errors. Fixes from the
pass: snooze popovers moved up, logo grid tiles shrunk, bills table columns fit the pane, journey toolbar top-left,
phone filter sheet foot, verify tray text. Plan §8 maps every button to its screen.
