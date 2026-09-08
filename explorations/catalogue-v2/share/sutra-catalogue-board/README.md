# Sutra · catalogue design board

Open `ui_kits/catalogue-explorations/index.html` over http (the screens are JSX compiled in the browser, so file:// will not work):

    cd sutra-catalogue-board
    python -m http.server 8000
    # then open http://localhost:8000/ui_kits/catalogue-explorations/index.html

Any static server works (`npx serve .` too). Internet is needed once for fonts and React from CDNs.

- Board: Drafts (explorations) → New drafts (modules in planning) → Finals (table by module and sub-menu, light + dark pairs, phone and web).
- Single screens: `index.html?only=f-1` (phone, light), `fd-1` (dark), `w-1` / `wd-1` (web). Add `&bare` for a frameless render on a phone.
- On a phone: `phone.html` lists every screen.
- Design language: `DESIGN-SCHEMA.md`; tokens: `tokens/final.css`. Screen code: `ui_kits/catalogue-explorations/final.jsx` (phone) and `web.jsx` (laptop); shared chrome and theme objects are in those files.
