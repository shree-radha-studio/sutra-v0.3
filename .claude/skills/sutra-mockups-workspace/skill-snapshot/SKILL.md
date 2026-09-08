---
name: sutra-mockups
description: Plan and build Sutra module mockups (phone + web, light + dark) in the final design language and place them on the catalogue design board in the right section (New drafts while planning, Finals when signed off). Use when the user asks to mock, design, draft, finalise or add screens for any Sutra module (CRM, Production, Dispatch, Hub, Studio, Channels, Home) or to change the board.
user-invocable: true
---

# Sutra mockups

One design language, one board, one workflow. Everything below happened on the Catalogue module first; repeat it for
each new module.

## Sources (read before drawing)

1. `design/SUTRA-DESIGN-SCHEMA.md` — the design language (tokens, type, shape, phone and web anatomy, viz, copy, rules).
2. `design/tokens-final.css` — tokens as CSS variables.
3. `design-system/research/brd-final.txt` (+ `brd-masters.txt`, `brd-dispatch.txt`) — the requirements. Read the
   module's section fully, including sub-menus, roles, right-pane and phone notes. The docx in `design-system/uploads/`
   is the same text.
4. `design-system/guidelines/screen-inventory.md` — the screen list per module.
5. `explorations/catalogue-v2/final.jsx` and `web.jsx` — the components to reuse: `attachFinal(T)` chrome (Btn, Chip,
   Tag, Step, Bars, PhotoTag, PhotoQty, TopBar, SearchBar, Lists, Header, GridCard, ListRow, CartStrip, Island, Dock,
   Hero, H, Card, Kpi), viz (`LineG`, `BarsV`, `Donut`, `Legend`, `Stack`), `PriceF`, `Orb`, `CartIcon`, `CamSearch`,
   `StatusPill`, `SOTable`, `GroupIsland`, `CustomerBar`, `OrderLines`, and the web shell (`WebShell`, `Rail`,
   `Sidebar`, `RightPane`, `CartPane`, `LaptopDevice`).
6. `explorations/catalogue-v2/audit.md` — decisions already taken and the user's stated taste.

Memory: the user wants mature, neutral, readable; no green, no loud colour, no novelty type; rounded and glass; the
design number is the head; every screen for phone and web, light and dark.

## Scope rule: mockups only

- This skill draws screens. It never decides backend, data model, API, framework or infrastructure. The board is
  React + JSX compiled in the browser by Babel because that is the drawing tool the finals were built with; it is not
  a product stack decision and must not be described as one.
- Anything the user says, or you notice, that the BRDs (`design-system/research/brd-*.txt`) do not already contain
  goes into one of two append-only notes files, dated, naming the screen it came from; then carry on drawing:
  - `design/during-ui-business-requirements.md` — business rules, roles, fields, copy, thresholds, owner decisions.
  - `design/during-ui-technical-design.md` — anything the architecture pass will need (grain, payload shape,
    permissions, calculation timing, sync). Notes, not designs; nothing gets built.
- One board, one page per module: `explorations/catalogue-v2/index.html` is the hub, `board.html?m=<id>` is a
  module's page (views: New drafts · Finals · Compare side by side), `drafts-archive.html` holds the old Catalogue
  explorations. Modules are one line each in `modules.js`. Do not create separate canvases, design-canvas
  artifacts or ad-hoc html pages; do not push to Claude Design unless the user asks in that message.
- The project is a git repository (github.com/shree-radha-studio/sutra-v0.3). Start every build with
  `bash tools/sync.sh` (pull) and end it with `bash tools/sync.sh "<Module> · <what changed>"` (commit + push).
  Nobody types git commands; the script is the whole step.

## Workflow

### 1. Plan the module (before any code)
- Research the whole BRD, not just the module's own section. The user's needs for one module are scattered
  through other modules' sections, the role matrix, the top-level description, the "Design references" lines and
  the dispatch and masters documents. Do this every time:
  1. Read the module's own section in `brd-final.txt` end to end.
  2. Grep every BRD text (`brd-final.txt`, `brd-masters.txt`, `brd-dispatch.txt`, `dispatch-screens.txt`,
     `uploads/Business Req.txt`) for the module name and its synonyms and sub-menu words, case-insensitive. For CRM
     that means at least: crm, customer, dossier, follow, payment, journey, broker, agency, whatsapp, score, tier,
     overdue, recommended. For Production: production, purchase, inward, recipe, bom, process, karigar, jobber, job
     card, issue, receive, costing, sample, wip. For Dispatch: dispatch, pack, parcel, invoice, gate, scan, ready,
     pending, stock, return, transporter. For Hub: master, ledger, report, column, compare. For Studio: studio,
     image, photoshoot, stitch, moodboard, upload. For Channels: channel, firm, transfer, permission. For Home:
     home, dashboard, notification, approval, gate pass, token, quick link, metric.
  3. Read every hit with its surrounding paragraph and pull out anything that adds a screen, a field, a button, a
     rule (money visibility, roles), a pane, a phone behaviour or a cross-module link (for example the catalogue's
     "double tap a cart chip" note lives in the catalogue section but shapes the cart card; the customer score
     lives in Home › Approvals but shapes CRM).
  4. Check the role matrix (lines near "Sale Executive", "Dispatch Manager", "Production Manager") for who can see
     money, approve, or edit in this module.
  5. Write these cross-mentions into the plan file under "Found elsewhere in the BRD", each with the line number
     and a one-line quote, so the user can confirm or strike them.
- Then list the module's sub-menus and, per sub-menu, the screens in the order a user meets them (the flow).
  Note per screen: purpose, who uses it, what the right pane holds on web, what floats on phone, money rules.
- Write the plan into `explorations/catalogue-v2/plans/<module>.md`: sub-menus, flow, screen list with one line each,
  open questions. Show it to the user before building; if they said "just build", state assumptions and go.

### 2. Build the screens
- `bash tools/sync.sh` first, so you draw on top of the others' latest files.
- Create `explorations/catalogue-v2/mod-<module>.jsx`. Every screen is a function `({ T }) => ...` that renders
  through the theme object, so the same code yields light (`FINAL`) and dark (`FINALD`). Phone screens use
  `frameF(T, body, dock)` from final.jsx; web screens use `<WebShell T={T} ...>` from web.jsx.
- Reuse the shared chrome; do not restyle it. New components only for what the module genuinely adds (a job card, a
  parcel, a karigar row). Put them in the module file and export with `Object.assign(window, {...})`.
- Keep the rules: sand canvas, espresso ink, one maroon line, photo beside every design number, number as the head,
  Lucide only, no emoji, money only where the BRD allows, sentence case, `PriceF` on customer-facing prices.
- Add ONE line for the module to `modules.js` (`{ id, name, note, names: ['<Module>'], files: [your files in load
  order] }`). Files every module borrows from (final, web, appshell, tags, dispatch, topbar2) are in `base` there and
  load on every page; put a file in `base` only when another module needs something from it. Never edit
  `index.html`, `board.html` or `board.jsx` for module work.

### 3. Place on the board
- While planning: register the module from the END of its own `mod-<module>.jsx` (several chats work on the board
  at once; nobody edits a shared array):
  `(window.NEW_DRAFT_MODULES = window.NEW_DRAFT_MODULES || []).push({ module, note, subs: [{ name, flow, phone: [[name, Screen]], web: [[name, WebScreen]] }] })`.
  The `module` string must start with one of the `names` in your `modules.js` line ('CRM', 'CRM · payments' both
  land on the CRM page). Screens are `[name, Component]` pairs in flow order, phone and web separately, grouped by
  sub-menu. They render as light + dark pairs in the module page's "New drafts" view. Ids `n-<i>` / `nw-<i>` count
  within the module page only, so they no longer shift when another module adds screens; each caption shows its id.
- When the user signs the module off: append the screens to `FIN` (phone) and `WEB` (web) in `finals.jsx` and add
  a `BOARD` entry there with `id: '<module id>'` referencing their indexes; remove the drafts registration. Never
  edit or reorder existing `FIN` / `WEB` entries (ids are used in links and the phone page).
- The stage sizes itself. Sections stay separated by `SECTION_GAP`.

### 4. Verify (every time)
- Serve the project root over http via `.claude/launch.json` (`static` 8765 … `static-board` 8790; another chat
  may hold one, so pick a free config; the pane allows five servers per folder); never file://. Any chat's server
  serves the same files, so `http://127.0.0.1:<port>/explorations/catalogue-v2/board.html?m=<id>` works from a new
  tab even when you cannot start your own.
- Open the module page `board.html?m=<id>` (views `&v=drafts|finals|compare`) and single frames with
  `board.html?m=<id>&only=<id>&z=0.8` where ids are `n-<i>` / `nd-<i>` (draft phone light / dark), `nw-<i>` /
  `nwd-<i>` (web), `f-<i>` / `fd-<i>` / `w-<i>` / `wd-<i>` (finals). `&dev` loads the React development build for
  readable errors; `&lazy=0` renders every frame at once. Use Playwright or Chrome for screenshots; the in-app pane
  times out on the board.
- Check: no console errors, nothing clipped (captions, trays, buttons), both themes, the page's frame count
  (`COUNTS` in the console).
- Read every visible string once.

### 5. Package and hand over
- `bash tools/package-explorations.sh` rebuilds `explorations/catalogue-v2/for-claude-design/`, the drop-in for the
  Claude Design project (the user uploads it; Claude Code cannot write to Claude Design).
- Update `explorations/catalogue-v2/audit.md` (what changed and why, open questions) and the README screen lists.
- `bash tools/sync.sh "<Module> · <what changed>"` commits and pushes; GitHub Pages serves the hub to the team.
- Tell the user which page and ids to open (`board.html?m=<id>&only=…`) and what decisions are pending.

## Checklist before saying done
- [ ] Plan file exists and matches the BRD section
- [ ] Every screen renders in FINAL and FINALD, phone and web where the BRD implies both
- [ ] Reused chrome, no restyle; new components documented in audit.md
- [ ] Board section is right (New drafts vs Finals), flow order, captions correct
- [ ] Verified in the browser on the module page, frame count noted, no console errors
- [ ] Package rebuilt, docs updated, `tools/sync.sh` run (committed and pushed)
