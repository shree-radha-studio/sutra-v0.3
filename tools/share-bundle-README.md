# Sutra · design board · front-end pack

Built @STAMP@. Every screen of Sutra's design board as a live React mock-up, phone and web, light and dark.

## Run it

    cd @NAME@
    python -m http.server 8000
    # open http://localhost:8000/ui_kits/catalogue-explorations/index.html

Any static server works (`npx serve .` too); `file://` does not, because the screens are JSX compiled in the browser.
React 18, Babel and Lucide are in `ui_kits/catalogue-explorations/vendor/`; only the Google Fonts come from the
internet. The first open compiles the screens (a few seconds) and keeps them in the browser; later opens are instant.

## Find a screen's code

- On the board (`index.html`): open a module tab, tap a screen, press **Code**. It shows the component's JSX, the file
  and lines, the components it uses (tap one to follow it), Copy, and a GitHub link. **Open alone** opens the screen by
  itself (`board.html?m=<module>&only=<id>`) for the browser's developer tools.
- Screen ids: `f-` / `w-` are signed-off finals (phone / web), `n-` / `nw-` drafts; a `d` after the letter is the dark
  theme. Quote the id when talking about a screen.

## How the code is organised (`ui_kits/catalogue-explorations/`)

| File | What |
|---|---|
| `modules.js` | The manifest: the shared files every page loads (`base`) and one line per module with its files. |
| `mod-<module>*.jsx` | One module's screens (`Screen…` phone, `Web…` web) and their data; each file registers its screens at the end (`window.NEW_DRAFT_MODULES`). |
| `final.jsx` / `web.jsx` | The shared phone and web chrome (frame, island, header, shell, sheets, chips) and the theme objects `FINAL` / `FINALD` (light / dark). |
| `finals.jsx` | The signed-off screen lists (`FIN` phone, `WEB` web, `BOARD` by module and sub-menu). |
| `themes2.jsx`, `screens2.jsx`, `common.jsx`, `themes.jsx`, `screens.jsx` | Primitives and earlier explorations the screens build on. |
| `index.html` + `sheet.jsx` / `sheet.css` | The board you browse. `board.html` + `board.jsx` is the pannable canvas; `loader.js` loads and caches the files. |

A screen is a function `({ T }) => …`: the same component renders light (`T = FINAL`) and dark (`T = FINALD`) and uses
only `T.*` colours. All files share one global scope (they run as classic scripts), which is why every name carries a
module prefix (`Cr`, `P`, `D`, `Ds`, `St`…). The rules of the design language: `DESIGN-SCHEMA.md`; tokens:
`tokens/final.css` (`--f-*` variables, light on `:root`, dark under `[data-theme="dark"]`).

These are mock-ups: the data is fictional and sits beside the screens; there is no API, state store or routing to
reuse. What carries over to the app is the layout, the components' structure, the tokens and the copy.
