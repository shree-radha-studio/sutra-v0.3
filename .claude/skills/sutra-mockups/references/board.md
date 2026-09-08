# The board · reference

Everything lives in `explorations/catalogue-v2/`. Serve the repository root over http; never open files with `file://`.

## Pages

| Page | What |
|---|---|
| `index.html` | Hub: one card per module. Never edited by module work. |
| `board.html?m=<id>` | One module. Views `&v=drafts` (default while drafting), `&v=finals`, `&v=compare` (both tables side by side). |
| `board.html?m=all` | Every module; slow, overview only. |
| `drafts-archive.html` | The six pre-final Catalogue explorations. History; never edited. |
| `legacy-index.html` | The old single-file board. Reference only; receives nothing new. |

Flags: `&only=<frame id>&z=0.8` one frame · `&bare` no device frame · `&dev` React development build (readable errors) · `&lazy=0` mount every frame.

Frame ids on a module page: `n-<i>` / `nd-<i>` draft phone light / dark, `nw-<i>` / `nwd-<i>` draft web; they count within the page, in registration order, and each caption shows its id. Finals use `f-` / `fd-` / `w-` / `wd-` with fixed global indexes.

## Files a module touches

| File | Rule |
|---|---|
| `mod-<id>.jsx`, `mod-<id>-web.jsx` | Yours. Phone screens, web screens, module data, module-only components. |
| `modules.js` | One line per module, appended: `{ id, name, note, names: ['<Name>'], files: [...] }`. `files` in load order; a later file may use anything an earlier one defines. |
| `finals.jsx` | Only at sign-off: append to `FIN` / `WEB`, add a `BOARD` entry with `id: '<id>'`. Never reorder existing entries. |
| `board.html`, `board.jsx`, `board.css`, `board-pan.js`, `index.html` | Renderer. Not touched by module work. |

`base` in `modules.js` lists the files every page loads (device frames, tokens, final chrome, web shell, and the module files others borrow from: appshell, catalogue-tags, dispatch, topbar2). Add a file to `base` only when another module needs something from it.

## Registration

At the end of the last file in your `files` list:

```js
(window.NEW_DRAFT_MODULES = window.NEW_DRAFT_MODULES || []).push({
  module: 'CRM',                                   // must start with a name from your modules.js line
  note: 'one line the board shows under the module head',
  subs: [
    { name: 'Follow-ups', flow: 'list → step → history',
      phone: [['Follow-ups · today', ScreenCrFollow], ['Follow-ups · step sheet', ScreenCrFollowStep]],
      web:   [['Follow-ups · board by step, step pane', WebCrFollow]] },
  ],
});
```

Screens are `[caption, Component]` pairs in the order a user meets them. A second registration for the same module adds a second band; to grow the first one instead, find it (`NEW_DRAFT_MODULES.find(m => m.module === 'CRM')`) and push into its `subs`.

## Globals

Every file shares one script scope, so a `const NextPill` in two files is a collision and the later file silently wins. Prefix module components (`Cr…` CRM, `P…` Production, `D…` Dispatch, `St…` Studio, `Hm…` Home). `COMPONENTS.md` lists what every file exports; `bash .claude/skills/sutra-mockups/scripts/components-index.sh` rebuilds it.

## Sign-off

When the owner signs a module off: append its screens to `FIN` (phone) and `WEB` (web) in `finals.jsx`, add a `BOARD` entry with the module `id` pointing at the new 1-based indexes, delete the drafts registration. Existing `FIN` / `WEB` entries never move; links and the phone page use their indexes.

## Verify

```bash
bash .claude/skills/sutra-mockups/scripts/board-check.sh crm            # whole page: mount time, frames, console errors
bash .claude/skills/sutra-mockups/scripts/board-check.sh crm n-3 nwd-7  # plus a screenshot of each frame id
```

The script starts its own server on a free port and runs headless Chrome; screenshots land in `.board-check/`. The in-app Browser pane and browser extensions time out on the board, so use the script. Look at every screenshot you took: clipped captions, trays over content, wrong theme colours, an empty pane.
