---
name: sutra-mockups
description: Draw, edit or plan Sutra screens on the shared design board (phone + web, light + dark, one design language). Use this whenever the user wants a mockup, screen, sheet, pane, flow, draft or variant for any Sutra module (Home, Catalogue, CRM, Production, Dispatch, Hub, Studio, Channels), wants an existing mockup changed, wants a module planned from the BRD, wants something signed off into finals, or asks how the board, its pages or its files work, even if they never say "mockup" or "board".
user-invocable: true
---

# Sutra mockups

You are adding to one shared design board that four people draw on at once. The board already has a design language and a shell; the owner judges every screen against them, so the win is a screen that looks like it was always there, not a new idea about buttons. Screens are React drawn in the browser; that is the pencil, not a product decision, so never discuss stack, data model or API here.

## Before drawing

1. `bash tools/sync.sh` pulls the team's latest files. Do this first; someone drew an hour ago.
2. Read `design/SUTRA-DESIGN-SCHEMA.md` once (the tokens, type, phone and web anatomy, copy rules). Its last section is the list of rules that do not bend: sand canvas, espresso ink, one maroon line per screen, photo beside every design number, the design number is the head, Lucide icons only, no emoji, money only where the BRD allows, every screen for phone and web, light and dark.
3. Skim `explorations/catalogue-v2/COMPONENTS.md` to find the chrome to reuse (`frameF`, `Body`, `Sheet`, `WebShell3`, `ViewTabs`, `RightPane`, `T.Btn`, `T.Chip`, `T.Island` and the rest). Reuse it unchanged; new components only for what the module genuinely adds, prefixed with the module's letters (`Cr`, `P`, `D`, `St`, `Hm`) because every file shares one scope.
4. Look at what exists for the module: `board.html?m=<id>` and `plans/<id>.md`. A changed screen is edited in place; a new take on a final is a draft registered beside it, so the owner can use the Compare view.

## Pick the path

| The ask | Do |
|---|---|
| Change or add screens in a module that has files | Edit its `mod-<id>*.jsx`; add the `[caption, Component]` pair to the existing registration in flow order. No plan file needed. |
| New module, or a sub-menu the plan never covered | Plan first (`references/brd-research.md`), show the plan, wait for "go". Then `bash .claude/skills/sutra-mockups/scripts/new-module.sh <id> "<Name>" "<Pfx>"` scaffolds the file and its manifest line. |
| A variant of a signed-off screen | Register it as a draft under the module's name; never edit `finals.jsx` for a variant. |
| Owner says a module is final | Follow "Sign-off" in `references/board.md`. |

## Draw

- A screen is `({ T }) => …`; the same function renders light (`FINAL`) and dark (`FINALD`). Phone: `frameF(T, body, <T.Island active="<Module>" />)`. Web: `<WebShell3 T={T} module crumb section seg active tabs pane paneTitle>…</WebShell3>`. The template in `assets/mod-template.jsx` is a working example of both plus a sheet.
- Content is fictional but real-looking: the customers, designs and codes the board already uses (data.js, the module files), Indian grouping for money, `PriceF` on customer-facing prices, sentence case, plain floor talk, dd/mm/yy.
- Roles matter: where the BRD hides money from a role, draw that variant too ("manager (₹)" / "packer").
- Captions are what the owner reads on the board: "Sub-menu · what the frame shows", in the order a user meets the screens.
- Anything the owner says, or you notice, that is not in the BRD goes into `design/during-ui-business-requirements.md` or `design/during-ui-technical-design.md`, dated, naming the screen. Then keep drawing.

## Verify, then hand over

```bash
bash .claude/skills/sutra-mockups/scripts/board-check.sh <id> n-3 nwd-7   # mount time, frame count, console errors, screenshots
```

Open every screenshot you asked for and look: clipped captions, a tray covering content, wrong theme colours, an empty pane, a string that reads wrong. Fix, re-run. Only the script's output counts as verification; the in-app browser pane times out on the board, and ad-hoc html pages are not made.

Then update `plans/<id>.md` (what changed, open questions), run `bash tools/sync.sh "<Module> · <what changed>"`, and tell the owner the page (`board.html?m=<id>`), the frame ids to look at, and the decisions waiting on them. If they asked for the Claude Design drop, `bash tools/package-explorations.sh` rebuilds it.

## Shared files, so the team does not collide

Yours: `mod-<id>*.jsx`, `plans/<id>.md`, `assets/<id>/`. One appended line in `modules.js`. Appends in `finals.jsx` only at sign-off. Never `index.html`, `board.html`, `board.jsx`, `board.css`, other modules' files. Full mechanics, ids, views and the registration shape: `references/board.md`.
