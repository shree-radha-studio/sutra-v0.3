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
- One board, one file: every module's screens render on `explorations/catalogue-v2/index.html`. Do not create
  separate canvases, design-canvas artifacts or per-module HTML boards; do not push to Claude Design unless the user
  asks in that message.

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
- Create `explorations/catalogue-v2/mod-<module>.jsx`. Every screen is a function `({ T }) => ...` that renders
  through the theme object, so the same code yields light (`FINAL`) and dark (`FINALD`). Phone screens use
  `frameF(T, body, dock)` from final.jsx; web screens use `<WebShell T={T} ...>` from web.jsx.
- Reuse the shared chrome; do not restyle it. New components only for what the module genuinely adds (a job card, a
  parcel, a karigar row). Put them in the module file and export with `Object.assign(window, {...})`.
- Keep the rules: sand canvas, espresso ink, one maroon line, photo beside every design number, number as the head,
  Lucide only, no emoji, money only where the BRD allows, sentence case, `PriceF` on customer-facing prices.
- Load the file in `index.html` after `web.jsx`.

### 3. Place on the board
- While planning: register the module from the END of its own `mod-<module>.jsx` (do not edit the `NEW_DRAFTS`
  array in `index.html`; several chats work on the board at once and that block has been overwritten before):
  `(window.NEW_DRAFT_MODULES = window.NEW_DRAFT_MODULES || []).push({ module, note, subs: [{ name, flow, phone: [[name, Screen]], web: [[name, WebScreen]] }] })`.
  `index.html` spreads `window.NEW_DRAFT_MODULES` into `NEW_DRAFTS`, so the only shared edit is the one script tag
  after `web.jsx`. Screens are `[name, Component]` pairs in flow order, phone and web separately, grouped by
  sub-menu. They render as light + dark pairs in the "New drafts" table between Drafts and Finals. Board order =
  script-tag order; ids `n-<i>` / `nw-<i>` shift when a module above yours adds screens, so quote ids after loading
  the board (`ND_PHONE.map(e => e[0])` in the console).
- When the user signs the module off: append the screens to `FIN` (phone) and `WEB` (web) and add a `BOARD` entry
  that references their indexes; remove the module from `NEW_DRAFTS`. Never edit or reorder existing `FIN` / `WEB`
  entries (ids are used in links and the phone page).
- The stage sizes itself. Sections stay separated by `SECTION_GAP`.

### 4. Verify (every time)
- Serve the project root over http via `.claude/launch.json` (`static` 8765, `lan` 8766, `static-b` 8767; another chat
  may hold one, so pick a free config); never file://.
- Open single frames with `index.html?only=<id>&z=0.8` where ids are `n-<i>` / `nd-<i>` (new draft phone light /
  dark), `nw-<i>` / `nwd-<i>` (web), `f-<i>` / `fd-<i>` / `w-<i>` / `wd-<i>` (finals). Use Chrome (claude-in-chrome)
  for readable screenshots; the in-app pane's screenshots can fail.
- Check: no console errors, nothing clipped (captions, trays, buttons), both themes, the whole board frame count.
- Read every visible string once.

### 5. Package and hand over
- `bash tools/package-explorations.sh` rebuilds `explorations/catalogue-v2/for-claude-design/`, the drop-in for the
  Claude Design project (the user uploads it; Claude Code cannot write to Claude Design).
- Update `explorations/catalogue-v2/audit.md` (what changed and why, open questions) and the README screen lists.
- Tell the user which ids to open and what decisions are pending.

## Checklist before saying done
- [ ] Plan file exists and matches the BRD section
- [ ] Every screen renders in FINAL and FINALD, phone and web where the BRD implies both
- [ ] Reused chrome, no restyle; new components documented in audit.md
- [ ] Board section is right (New drafts vs Finals), flow order, captions correct
- [ ] Verified in the browser, frame count noted, no console errors
- [ ] Package rebuilt, docs updated
