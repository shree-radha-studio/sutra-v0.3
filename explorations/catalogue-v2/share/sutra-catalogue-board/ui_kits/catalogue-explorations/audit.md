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
