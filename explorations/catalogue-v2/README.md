# Catalogue explorations v2

One pannable design board (`index.html`) in two sections.

**Drafts (top)**: explorations by module, as rows. Catalogue so far: 1a, 1b, 1a′, 1b′, 3a, 3b. New module explorations are appended here (add a row to `DRAFTS` in index.html).

**New drafts (middle)**: modules in planning, drawn in the final design language as light + dark pairs in the same table layout as Finals. Defined by `NEW_DRAFTS` in index.html (screens as `[name, Component]`); ids `n-<i>`, `nd-<i>`, `nw-<i>`, `nwd-<i>`. Empty when nothing is in planning. The workflow is the project skill `sutra-mockups`; the design language is `design/SUTRA-DESIGN-SCHEMA.md`.

**Finals (bottom, after a wide gap)**: a table. Header cells: Module › sub-menu · Phone · Web. Each module is a row band; each sub-menu is a table row with a label cell (module, sub-menu name, flow, counts), a phone cell (three light + dark pairs per line) and a web cell (two pairs per line). Screens run in flow order with large numbered captions. Defined by `BOARD` in index.html, which points into the `FIN` (phone) and `WEB` (laptop) screen lists, so `?only=` ids are unchanged. To add a module or sub-menu, add an entry to `BOARD`; the stage resizes itself.

The draft rows:

| Row | What | Screens |
|---|---|---|
| 1a, 1b | Originals from Claude Design, loaded unchanged from the snapshot | 6 |
| 1a′, 1b′ | Duplicates with the audit fixes (see `audit.md`) | 9 |
| 3a Editorial, 3b Studio | New directions built from the ground up, neutral palettes | 9 |
| F light, F dark | Final screens, from 3a with the screen-by-screen notes, two token sets | 21 |
| W light, W dark | The same finals on a laptop: rail with greeting, tab strip, header v2 (path · head · sub-menu buttons · switch · bell · cart · search · orb), collapsible right pane | 14 |

Screens on the v2 rows: 1 grid (stepper on every card) · 2 product, customer · 3 product, salesperson · 4 analytics & orders · 5 scan pop-up · 6 carts · 7 full-screen viewer (colours, then media) · 8 cart card (double tap on a cart chip) · 9 side menu (all modules).

Final rows (21): 1 grid (active cart) · 2 grid (no cart) · 3 list · 4 listening · 5 filters & sort · 6 product, customer · 7-9 salesperson view (stock & production, recipe & media, analytics & orders) · 10 scan · 11 viewer · 12 carts · 13 cart card · 14 side menu · 15 sale orders cards · 16 table with column filter · 17 group-by island and grouped table · 18 order opened · 19-21 analytics (orders, designs, customers).

Web rows (14, laptop 1280 × 800): 1 grid · 2 list · 3 sidebar expanded · 4 listening · 5 product customer · 6 product salesperson · 7 carts · 8 sale orders cards · 9 grouped table · 10 order opened · 11-13 analytics · 14 viewer.

Open a single frame with `index.html?only=<row>-<n>`, e.g. `?only=f-4` or `?only=w-9`. Row ids: `1a 1b 1a2 1b2 3a 3b f fd w wd`. Add `&bare` for a frameless full-viewport render, `&z=0.8` to scale.

- `final.jsx`: FINAL / FINALD tokens, the final chrome, data viz helpers (LineG, BarsV, Donut, Stack), and the phone final screens.
- `web.jsx`: LaptopDevice, the approved shell (TabStrip, Rail2/Sidebar2 with the greeting, Header3 with SubMenu and ModeSwitch, ViewTabs, WebShell3 and the WebShell wrapper), RightPane, CartPane and the web screens.

Files

- `themes2.jsx`: refined themes (GALLERY2, ATELIER2), new themes (EDITORIAL, STUDIO), shared Dock, Island, CardQty, CartChips, Hit, glass, smoke, track.
- `screens2.jsx`: ScreenGrid2, ScreenProductCustomer2, ScreenScan2, ScreenViewer, ScreenCartCard, ScreenSideMenu, plus the side-menu module list (MENU) from the BRD. Salesperson view, analytics and carts are reused from the snapshot and pick up each theme's chrome.
- `audit.md`: findings, what changed, rationale, open questions.
- `mod-appshell.jsx`: New drafts (8 Sep) — web chrome revisions (tab strip, path + head header, sub-menu hard buttons with floating sub-sub menus, search beside the orb, rail/sidebar footer), the search pane (two stages), the full-width sale-orders table and grouped column chooser, and the Returns tab (phone + web). Ids `nw-1`…`nw-10`, `n-1`, `n-2`.
- `mod-topbar2.jsx`: New drafts (8 Sep) — top bar v2: eyebrow + head, segmented sub-menu, underline sub-sub tabs, actions out of the nav row; sale orders, sale order analytics, dispatch ready (two pane states) and pending (grid, list) (`nw-34`…`nw-39`). Levels are mapped in `design/SUTRA-SCREEN-FLOW.md`.
- `mod-crm.jsx` / `mod-crm-web.jsx`: CRM module for the New drafts table (8 Sep) — 10 phone and 14 web screens: Follow-ups (lists × journeys, step strip, board by step, step pane), Share (queue strip and customer pane with Info · Packets · Orders tabs · Purchased grid with a saved time frame · two 3 × 4 picture grids with gallery selection · packet pane · sort & filter · verify against stock · composer · logo placement), Payments (stage strip with ₹, bills by customer, customer across stages, bill cleared, broker & agency weekly report), Customers (list with dossier pane, phone dossier), Journeys (node-map builder). Product photos in `assets/crm/`. Plan: `plans/crm.md`. Registers itself via `window.NEW_DRAFT_MODULES`; ids `n-33…42`, `nw-58…71` late on 8 Sep (shift if a module above adds screens).
- `mod-catalogue-tags.jsx`: Catalogue tag system for the New drafts table — grid chips (action chip + state pill), customer mode, Why? panel, sort & filter sheet, salesperson-view tag rail and why sheet; phone and web. Registers itself via `window.NEW_DRAFT_MODULES`.
- `mod-dispatch.jsx` / `mod-dispatch-web.jsx`: Dispatch module for the New drafts table (8 Sep) — 26 phone and 19 web screens: Ready board with queue rail and priority ring, Pending book (manager ₹ / packer variants), Packing terminal with live invoice → review → done → shipment → A4, phone scan companion, Billed invoices and shipments history, Out of stock (order and restock cards, who-is-waiting pane), Warehouse stock (FG · material · WIP · FG inward), Sale return wizard (box-wise, credit notes to accounts). Plan: `plans/dispatch.md`. Ids `n-9…34`, `nw-15…33` (shift if other modules are added above).
- `mod-production.jsx` / `mod-production-web.jsx` / `mod-production-web2.jsx`: Production module for the New drafts table (8 Sep) — 17 phone and 28 web screens: overview, purchase (PO calendar, inward, return), picture-first materials catalogue and the dye ledger (bulk issue → cut orders → dyed lot as a dye WIP material), process setting (sequence, materials & averages, BOM grid per colour, lock, right pane with materials / BOMs / search), orders with the lifecycle terminal (job panels, tranches, inputs per colour, issue and receive panes, job card and sticker print), job cards in five views (cards, swimlanes, table, gantt, calendar), samples with free moves and sample → product, costing, karigars. Plan: `plans/production.md`; coverage: `plans/production-coverage.md`. Ids follow the modules above (read `ND_PHONE` / `ND_WEB` in the console).


Serving: the JSX is compiled in the browser, so open it over http (any static server at the project root), not `file://`.

Sharing with a developer: `bash tools/share-bundle.sh` builds `share/sutra-catalogue-board.zip`, a self-contained copy (styles, tokens, assets, data, device frames, the board, the design schema) with a README on how to serve it. Rebuild after any change.

Sending back to Claude Design: `for-claude-design/catalogue-explorations/` is a ready drop-in that **replaces** the project's existing `ui_kits/catalogue-explorations/` folder, so Claude Design keeps one canvas (same path, same card) with all six rows. Drop that folder onto the file browser at `ui_kits/` and let it overwrite. Paths inside are already the Claude Design ones. Rebuild it after any change here with `bash tools/package-explorations.sh`.
