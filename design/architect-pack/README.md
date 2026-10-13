# Architect pack · Sutra design board (13/10/26)

For Shrey, technical architect. This folder is a reading guide to the design board: what has been drawn for every
module, how the screens connect, what each screen shows and changes, who may see what, and what is still undecided.
It is observations from the drawings and the business requirement documents (BRDs). It is not a technical design:
nothing here chooses a stack, a data model or an API, and nothing here is a build instruction. Where the drawings
imply something the BRD does not state, the pack says "implied by the screen"; treat those as questions, not
requirements.

## Files in this pack

| File | What it answers |
|---|---|
| `README.md` | How to open the board, how screen ids work, what is final and what is draft today. |
| `screen-flows.md` | Per module: menu, sub-menu, sub-sub-menu and screen as the board draws them, with frame ids; then the cross-module flows (sell, production, CRM follow-up, sale return, Studio) as numbered steps. Corrects the 8 Sep map in `design/SUTRA-SCREEN-FLOW.md`. |
| `data-on-screen.md` | One table per module, one row per screen: what it reads, what it changes, which role it is drawn for, whether money shows. |
| `roles-and-money.md` | The role matrix as the BRD and the drawings state it, and the money rule per role. |
| `open-questions.md` | Everything undecided that blocks architecture, grouped by module, with the screen each one gates. |
| `sheets/` | Contact sheets (one PNG per sub-menu) if they were generated; see the note at the end. |

## How to open the board

The board is a set of React mock-ups compiled in the browser. It is a drawing tool, not an app, and says nothing
about the product's stack. Serve the repository root over http (`python -m http.server 8000` from the repo root, or
any static server) and open `explorations/catalogue-v2/index.html`. `file://` does not work. The developer pack zip
(`explorations/catalogue-v2/share/sutra-design-board.zip`) is the same board runnable from a folder; its README
(`tools/share-bundle-README.md`) explains the file layout and the Code view, so that is not repeated here.

| Page | Use |
|---|---|
| `index.html` | The landing page. Overview card per module, then a tab per module with its sub-menus, Finals / Drafts, Phone / Web, light / dark, zoom. Deep link: `index.html?m=<module>&sub=<name>&v=finals`. |
| `index.html?m=<module>` | Browse one module. Tap a screen, then **Code** to see its JSX, file and lines and the components it uses; **Open alone** opens the one frame for the browser's developer tools. |
| `board.html?m=<module>` | The pannable canvas of one module. `&v=drafts` (default), `&v=finals`, `&v=compare` (both side by side). `&only=<frame id>&z=0.8` shows one frame. |
| `board.html?m=all` | Every module on one canvas. Slow; overview only. |

Module ids: `catalogue`, `appshell`, `dispatch`, `production`, `crm`, `studio`, `home`, `hub`. The manifest
`explorations/catalogue-v2/modules.js` lists which files each page loads.

## How screen ids work

Every frame caption on the board shows its id. Quote the id when talking about a screen.

| Prefix | Meaning |
|---|---|
| `f-<i>` / `w-<i>` | Signed-off final, phone / web. Global 1-based index into the `FIN` / `WEB` lists in `finals.jsx`. These never change. |
| `n-<i>` / `nw-<i>` | Draft, phone / web. Counted within one module page, in registration order (file load order, then sub-menu order, then screen order). They shift when a screen is added above them, so a draft id is only valid against today's board. |
| `d` after the letter (`fd-`, `wd-`, `nd-`, `nwd-`) | The same screen in the dark theme. |

The draft ids quoted in this pack were computed from the registration blocks on 13/10/26 at the lead's merge
(`887296c`). Where a plan file quotes a different id for the same screen, the plan predates a screen added above it;
the caption is the stable name.

## What is final and what is draft today

Only the Catalogue module and the App shell navigation are signed off. Everything else is a draft awaiting the
owner's decisions in `open-questions.md`.

| Module | Final (phone / web) | Draft bands on the board (13/10/26) |
|---|---|---|
| Catalogue | Grid, list, filters, listening, product (customer and salesperson views), scan pop-up, viewer, carts, cart card, sale orders (cards, table, grouped, opened), analytics: `f-1`…`f-13`, `f-15`…`f-21`; `w-1`, `w-2`, `w-4`…`w-14` | Sale orders · full table and Returns tab (8 Sep); Tags (chips, sort & filter sheet, why panel, tag rail, 8 Sep); Sell flow (new cart, new customer, submit, in queue, edit, delete, calmer grid headers, 13 Oct); Sale orders · Desk density (13 Oct) |
| App shell | Side menu `f-14`; sidebar expanded `w-3`; the rail, tab strip and header v2 on every web final | Search pane (web, two stages) |
| Dispatch | none | 8 Sep band (seven sub-menus, 26 phone and 19 web screens, its own shell); "On the approved bar" (four web screens, 8 Sep); Structured drafts (Ready, Pending, Packing, Billed; the Desk density proposal, 6 and 13 Oct) |
| Production | none | One band, nine sub-menus, 46 phone and 47 web screens (8 and 9 Sep) |
| CRM | none | One band, five sub-menus, 54 phone and 47 web screens (8 and 9 Sep) |
| Studio | none | One band, eight sub-menus, 13 phone and 15 web screens (8 and 9 Sep) |
| Home | none | One band, three sub-menus, 7 phone and 4 web screens (13 Oct) |
| Hub | none | One band, five sub-menus, 7 phone and 6 web screens (13 Oct) |
| Channels | none | Not drawn. Listed in the BRD and the 8 Sep map only. |

Two bands are candidates for retirement, not for building: the 8 Sep Dispatch band (its shell is the one exception
to the shared web shell; review 2 §1.3) and the older Ready and Pending frames (review 1 clean-up 7). Until the owner
answers decision 5 of review 2 (one language, two densities), the structured Dispatch drafts are a proposal.

## The one rule

Nothing in this pack or on the board is a build instruction. The board shows layout, component structure, copy and
the business rules the drafters found; the plans under `explorations/catalogue-v2/plans/` record what the owner said
and what the drafters assumed. Decisions on the owner's behalf are not made here. Where this pack and a BRD disagree,
the BRD and the owner's dated answers (`design/during-ui-business-requirements.md`) win.

## Read in this order

1. `screen-flows.md`, the sell flow section, with `index.html?m=catalogue`, `?m=home` and `?m=hub` open.
2. `roles-and-money.md`.
3. `open-questions.md`, then the source reviews `plans/review-2-template-and-sell-flow.md` and
   `plans/review-1-catalogue-appshell-dispatch.md`.
4. `data-on-screen.md` as a reference while reading screens.
5. `design/during-ui-technical-design.md`: the drafters' dated notes left for exactly this hand-over.

## Contact sheets

If `sheets/` exists it holds one PNG per sub-menu from `.claude/skills/sutra-mockups/scripts/contact-sheet.sh`.
If it is missing, the script was not run in time; the board itself is the source.
