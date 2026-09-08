Drew the alternative you asked for and put it on the Catalogue board as a draft, next to the signed-off final so you can flip between them in Compare.

**What it is:** the "opened order" screen (`SO-3455`) with the right customer pane collapsed to a strip, and the order lines redrawn as a full-width table (Design · Colour · Qty · Rate · Amount) instead of the pane's photo-card list. Everything else — header, tabs, status row, Edit/Approve — is untouched from the final, so the comparison is really just pane-vs-table.

**Where:** `board.html?m=catalogue`, frame `nw-5` (light) / `nwd-5` (dark), captioned "Sale order · opened, customer pane collapsed, lines as table", under the "Catalogue · sale orders" draft band → "Opened order · compare".

**How it was built:** added `OrderLinesTable` and `WebSalesOrderCollapsed` to `explorations/catalogue-v2/mod-appshell.jsx` (the file that already carries the other Catalogue · sale-orders drafts), reusing the same tokens, header and shell as the final `WebSalesOrder`. Registered as a new sub under the existing draft band, per the board's rule that a variant of a signed-off screen goes in as a draft, never edits `finals.jsx`.

**Verified:** `board-check.sh catalogue nw-5 nwd-5` — page mounts clean (34 frames, no console errors), both screenshots checked by eye: no clipped captions, colours correct in both themes, table totals match the final's ₹24,975 / 5 pcs / 3 designs.

**Open question for you:** the table is only as tall as its rows (matches how the final's card list behaves), so there's a lot of empty canvas below it once the pane is gone — worth deciding if that space should carry something (e.g. notes, activity) if this direction is picked, or if the emptiness itself is fine for a sparse order.

Committed locally only (evaluation worktree — no push, no `tools/sync.sh`):
`Catalogue · sale orders — draft: opened order, customer pane collapsed, lines as full-width table`
