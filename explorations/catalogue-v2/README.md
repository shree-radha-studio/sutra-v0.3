# Catalogue explorations v2 · the design board

**One page per module** (since 9 Sep 2026; before that one file held every frame and stopped loading).

- `index.html` — the hub: one card per module, plus the whole board and the drafts archive.
- `board.html?m=<id>` — a module's page. Three views: `&v=drafts` (New drafts, the default while a module is in planning), `&v=finals`, `&v=compare` (both tables side by side at the same height, to check a draft against the signed-off screen). Frames render lazily as you pan; the page opens zoomed to the phone column (Fit row / Fit all in the zoom bar).
- `board.html?m=all` — every module on one page. Slow to compile; for the overview only.
- `drafts-archive.html` — the six Catalogue explorations that preceded the final language (1a Gallery, 1b Atelier, 1a′, 1b′, 3a Editorial, 3b Studio). History; nobody edits these.
- `modules.js` — the manifest: `base` (files every page loads) and one line per module (`id`, `name`, `note`, `names`, `files`).
- `finals.jsx` — `FIN` (phone) and `WEB` (laptop) screen lists and `BOARD` (module → sub-menu → indexes, each entry with the module `id`).
- `board.jsx` / `board.css` / `board-pan.js` — the renderer, its styles and the pan/zoom bar. Module work never edits these.

Single frames: `board.html?m=<id>&only=<fid>&z=0.8`. Ids `n-<i>` / `nd-<i>` (draft phone light / dark) and `nw-<i>` / `nwd-<i>` (draft web) count within the module page; `f-<i>` / `fd-<i>` / `w-<i>` / `wd-<i>` are the finals and never change. `&bare` drops the device frame; `&dev` loads the React development build (readable errors); `&lazy=0` renders every frame at once.

**Adding a module**: create `mod-<id>.jsx` (+ `mod-<id>-web.jsx`), register from its END with `(window.NEW_DRAFT_MODULES = window.NEW_DRAFT_MODULES || []).push({ module: '<Name>', note, subs: [{ name, flow, phone: [[name, Screen]], web: [[name, WebScreen]] }] })`, add one line to `modules.js`. The `module` string must start with one of the line's `names`. **Signing off**: append to `FIN` / `WEB` in `finals.jsx` and add a `BOARD` entry with the module id. The workflow is the project skill `sutra-mockups`; the design language is `design/SUTRA-DESIGN-SCHEMA.md`.

**Team**: the project is a git repository (github.com/shree-radha-studio/sutra-v0.3). `bash tools/sync.sh` pulls; `bash tools/sync.sh "<Module> · <what changed>"` commits and pushes. Each module owns its files; the only shared edits are one line in `modules.js` and, at sign-off, appends to `finals.jsx`.

`legacy-index.html` is the single-file board as it stood before the split, kept for reference until the owner drops it; it no longer receives new modules.

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

Archive rows open with `drafts-archive.html?only=<row>-<n>` (rows `1a 1b 1a2 1b2 3a 3b`); finals with `board.html?m=catalogue&only=f-4` or `w-9`.

- `final.jsx`: FINAL / FINALD tokens, the final chrome, data viz helpers (LineG, BarsV, Donut, Stack), and the phone final screens.
- `web.jsx`: LaptopDevice, the approved shell (TabStrip, Rail2/Sidebar2 with the greeting, Header3 with SubMenu and ModeSwitch, ViewTabs, WebShell3 and the WebShell wrapper), RightPane, CartPane and the web screens.

Files

- `themes2.jsx`: refined themes (GALLERY2, ATELIER2), new themes (EDITORIAL, STUDIO), shared Dock, Island, CardQty, CartChips, Hit, glass, smoke, track.
- `screens2.jsx`: ScreenGrid2, ScreenProductCustomer2, ScreenScan2, ScreenViewer, ScreenCartCard, ScreenSideMenu, plus the side-menu module list (MENU) from the BRD. Salesperson view, analytics and carts are reused from the snapshot and pick up each theme's chrome.
- `audit.md`: findings, what changed, rationale, open questions.
- `mod-appshell.jsx`: New drafts (8 Sep) — web chrome revisions (tab strip, path + head header, sub-menu hard buttons with floating sub-sub menus, search beside the orb, rail/sidebar footer), the search pane (two stages), the full-width sale-orders table and grouped column chooser, and the Returns tab (phone + web). Ids `nw-1`…`nw-10`, `n-1`, `n-2`.
- `mod-topbar2.jsx`: New drafts (8 Sep) — top bar v2: eyebrow + head, segmented sub-menu, underline sub-sub tabs, actions out of the nav row; sale orders, sale order analytics, dispatch ready (two pane states) and pending (grid, list) (`nw-34`…`nw-39`). Levels are mapped in `design/SUTRA-SCREEN-FLOW.md`.
- `mod-crm.jsx` / `mod-crm-web.jsx` / `mod-crm-more.jsx` / `mod-crm-phone.jsx`: CRM module for the New drafts table (8–9 Sep) — 54 phone and 47 web screens (every tab, sheet and button state on both devices; plan §8 maps them): Follow-ups (lists × journeys, step strip, board by step, step pane), Share (queue strip and customer pane with Info · Packets · Orders tabs · Purchased grid with a saved time frame · two 3 × 4 picture grids with gallery selection · packet pane · sort & filter · verify against stock · composer · logo placement), Payments (stage strip with ₹, bills by customer, customer across stages, bill cleared, broker & agency weekly report), Customers (list with dossier pane, phone dossier), Journeys (node-map builder). Product photos in `assets/crm/`. Plan: `plans/crm.md`. Registers itself via `window.NEW_DRAFT_MODULES`; ids `n-55…108`, `nw-58…104` on 9 Sep (shift if a module above adds screens; the board split into per-module pages will fix them).
- `mod-catalogue-tags.jsx`: Catalogue tag system for the New drafts table — grid chips (action chip + state pill), customer mode, Why? panel, sort & filter sheet, salesperson-view tag rail and why sheet; phone and web. Registers itself via `window.NEW_DRAFT_MODULES`.
- `mod-dispatch.jsx` / `mod-dispatch-web.jsx`: Dispatch module for the New drafts table (8 Sep) — 26 phone and 19 web screens: Ready board with queue rail and priority ring, Pending book (manager ₹ / packer variants), Packing terminal with live invoice → review → done → shipment → A4, phone scan companion, Billed invoices and shipments history, Out of stock (order and restock cards, who-is-waiting pane), Warehouse stock (FG · material · WIP · FG inward), Sale return wizard (box-wise, credit notes to accounts). Plan: `plans/dispatch.md`. Ids `n-9…34`, `nw-15…33` (shift if other modules are added above).
- `mod-production.jsx` / `mod-production-phone2.jsx` / `mod-production-web.jsx` / `-web2.jsx` / `-web3.jsx`: Production module for the New drafts table (8–9 Sep) — 46 phone and 47 web screens, light and dark: overview and the locked role; purchase (PO calendar, list, new PO, inward, past inwards, return); picture-first materials catalogue with a new-material form; dye ledger (cut orders, bulk balances and bulk issue, received lots as dye WIP, receive a lot); process setting (sequence, materials & averages, BOM grid per colour, locked by production, imported from a sample); orders (cards with draft and awaiting states, list, new order with readiness) and the lifecycle terminal (job panels, assign, issue by pieces or material, issue on a Direct order, receive with over-receive, finished-goods receive, print A4 + stickers); job cards in five views plus the filters drawer; samples (board, 15-day reading, new sample, free moves, receive a move, make product); costing with default margins; karigars (list, ledger, verification of karigar-recorded entries, new karigar, analytics). The phone carries every sub-menu and option (floor roles see no money; manager phones show costing and dues). Plan: `plans/production.md`; coverage review: `plans/production-coverage.md`. The module registers itself from the end of `mod-production-web3.jsx`.

- `mod-studio.jsx` / `mod-studio-web.jsx`: Studio › AI Designer "Stitch" for the New drafts table (9 Sep) — 13 phone and 15 web screens, light and dark, on `board.html?m=studio`: category tracks and threads; the designer terminal (chat column on deep space with Stitch speaking in the display face beside a spectral thread, the stage with the 12-cut set or the picked design, zone overlay, compare slider, version strip; the pane in three states: set options, zone with a dropped material and 4 variations, version); the context selector as a glass dialog (Products · Materials with sort & filter · Samples · WIP · Moodboard, sales-data switch, Main / ref tray); save as sample; Moodboard Mine (with the "Only my uploads & links" switch) and Stitch's (by thread, Replenish, why this); History by day with share and "Use as design content"; Memory (what works, taste rules with provenance, Stitch proposes); Settings (models per template, providers, defaults, sharing); the fixed five-tab tuner as a translucent pane; on the phone every option, the pane as a half-height sheet with the picture visible, the tuner the same way, and a swipe approval screen. Renders are the owner's own ChatGPT output cut into tiles in `assets/studio/`. Plan: `plans/studio-designer.md` (§12 = the go decisions). Registers itself from the end of `mod-studio-web.jsx`.


Serving: the JSX is compiled in the browser, so open it over http (any static server at the project root), not `file://`.

Sharing with a developer: `bash tools/share-bundle.sh` builds `share/sutra-catalogue-board.zip`, a self-contained copy (styles, tokens, assets, data, device frames, the board, the design schema) with a README on how to serve it. Rebuild after any change.

Sending back to Claude Design: `for-claude-design/catalogue-explorations/` is a ready drop-in that **replaces** the project's existing `ui_kits/catalogue-explorations/` folder, so Claude Design keeps one canvas (same path, same card) with all six rows. Drop that folder onto the file browser at `ui_kits/` and let it overwrite. Paths inside are already the Claude Design ones. Rebuild it after any change here with `bash tools/package-explorations.sh`.
