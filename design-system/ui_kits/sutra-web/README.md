# Sutra web app kit

Desktop ERP shell (1440 wide): SideNav rail → sticky top row (module title in Cormorant · node Tabs with the maroon underline · Live chip · theme toggle) → three-pane body.

Screens
- **Catalogue** (default, or `#catalogue`) — search + scan pill, Products | Materials | WIP switch, category tabs (maroon underline), filter chips, picture-first grid ⇄ list; click a card for the web product page (customer view, *Salesperson view* toggle for stock/reserved/production matrix). Right pane: live carts A/B/C with steppers and *Submit for approval*. *Customer mode* (top right) hides money and staff controls.
- **Dispatch › Ready** (`#dispatch`) — customer cards with P1–P5 priority ring, call chips, per-order rows, photo line rows (no money), PACK ▸. Right pane: Pending orders (money visible here only).
- **Dispatch › Packing** — Current-order pane · parcel board (colour bar, OPEN/PACKED/INVOICED, qty steppers, Close parcel) · Live/Review invoice pane. Close parcel flips the invoice into REVIEW.
- **Master views › Products** — family switch (Items | Ledgers), entity chips with live counts, alerts strip, toolbar, grid ⇄ list.

Interactions: change module in the SideNav, switch nodes, PACK ▸ jumps into Packing with that customer, grid/list toggle, dark-mode toggle (data-theme="dark").
Built from: research/brd-final.txt (Dispatch, Hub sections), research/dispatch-screens.txt, research/brd-masters.txt; v0.2 screenshots used for functionality only.