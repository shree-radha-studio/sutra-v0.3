# Catalogue explorations — two directions

Every catalogue-module screen from the BRD, rendered twice through a theme object so the two directions can be compared like-for-like on one canvas (`index.html`, pan/zoom). Open a single phone with `index.html?only=1a-3` (row-screen).

Screens per row: 1 Catalogue grid (top bar · categories · filter chips · 2-up grid · floating cart tray · bottom bar) · 2 Product, customer view (photo, colours, price with +5% lead digit, manipulative tag, cart stepper) · 3 Product, salesperson view (colour-coded tags, stock/reserved/in-production/due by colour, process timeline, recipe with live godown stock, media + set-tag) · 4 Analytics & orders (demand score, last-month sales black + colour lines, lifelong, media centre checklist, sale orders All / Approved & pending / Dispatched) · 5 Scan-to-add pop-up (camera frame, back, green "scan to add" mode, 3/5 image card with colour bars, cart tabs, 4 quick-add buttons, per-colour qty) · 6 Carts (customer tabs, new customer, sale-book switch, lines with steppers, note, submit for approval).

**1a Gallery** — ivory, hairlines, Marcellus + Cormorant, colour *bars* instead of dots, maroon appears only as a line/active pill.
**1b Atelier** — espresso dark, tactile pills, Bodoni Moda + Outfit, captions frosted onto the photo, gold carts, staggered grid.

Files: common.jsx (icons, price, charts, data) · themes.jsx (tokens + chrome per direction) · screens.jsx (the six screens).