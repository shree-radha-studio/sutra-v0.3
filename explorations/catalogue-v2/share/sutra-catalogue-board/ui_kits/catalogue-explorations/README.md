# Catalogue explorations — one design board

`index.html` is the single pannable board. Top: **Drafts**, explorations by module as rows. Bottom: **Finals**, modules as rows with dividers, sub-menus as blocks, screens in flow order, each a light + dark pair, phones on the left and web on the right. Rows on the board:

| Row | What | Screens |
|---|---|---|
| 1a Gallery, 1b Atelier | The two original directions, untouched | 6 |
| 1a′, 1b′ | The same two with the audit applied (see `audit.md`) | 9 |
| 3a Editorial, 3b Studio | Two directions built from the ground up, neutral palettes | 9 |
| F light, F dark | Final phone screens: grid, list, listening, filters, product (customer, salesperson ×3), scan, viewer, carts, cart card, side menu, sale orders (cards, table, grouped, opened), analytics (orders, designs, customers) | 21 |
| W light, W dark | The same finals on a laptop (1280 × 800): rail sidebar, expanded sidebar, header, collapsible right pane | 14 |

Screens on every v2 row: 1 grid (stepper on every card) · 2 product, customer · 3 product, salesperson · 4 analytics & orders · 5 scan pop-up · 6 carts · 7 full-screen viewer (colours, then media) · 8 cart card (double tap on a cart chip) · 9 side menu (all modules from the BRD).

Open a single phone with `index.html?only=<row>-<n>` (rows `1a 1b 1a2 1b2 3a 3b`).

Files: `common.jsx` (icons, price, charts, data) · `themes.jsx` (original tokens + chrome) · `screens.jsx` (the six original screens) · `themes2.jsx` (refined + new themes, dock, island, card stepper) · `screens2.jsx` (grid, product page, scan pop-up, viewer, cart card, side menu) · `audit.md` (findings, rationale, open questions).
