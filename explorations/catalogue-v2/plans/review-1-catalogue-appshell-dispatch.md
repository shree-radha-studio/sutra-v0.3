# Review 1 · Catalogue, App shell, Dispatch (6 Oct 2026)

A product pass before the screens are finalised for the developer (Shrey). For each module it lists the sub-menus and
the flow a user walks, rates every feature, makes a keep / simplify / later / cut call, lists what the BRD asks for that
is not drawn yet, and ends with the decisions waiting on the owner. Nothing on the board changes until the owner answers.

**How to read the stars.** One rating per feature: how much it earns its place once its cost to the user is
subtracted (taps, choices on screen, things to learn, mistakes it invites).
★★★★★ core, the module fails without it · ★★★★ strong · ★★★ useful, keep it out of the way · ★★ marginal, later ·
★ cut. The users are salespeople and packers working fast on phones, customers looking at pictures in a cabin, and a few
desk users on large screens. Designs are known by photo before number (BRD F:4), so pictures lead and text stays short.

**The calls.** Keep = as drawn. Simplify = same job, fewer choices or steps (the change is named). Later = phase 2,
not drawn further now. Cut = remove from the board. Gap = the BRD asks for it, the board does not show it yet.

Sources: the board as of `cb65ad9` (Catalogue 49 screens, App shell 4, Dispatch 49, each in light and dark),
`design-system/research/brd-final.txt` (F), `brd-masters.txt` (M), `design/during-ui-business-requirements.md` (DU),
`design-system/guidelines/chips-filters-sorts.md` (CF), `plans/dispatch.md` (DP), `design/SUTRA-SCREEN-FLOW.md` (SF).

---

## 1 · Catalogue

**Who:** salesperson (mostly on phone, F:58), customer in the cabin (through Customer mode, F:80), sale manager.
**Main flow:** grid → product (customer view) → add to a cart → carts → submit for approval → sale order.
**Second flow:** scan a piece → pop-up → add to cart(s).

Sub-menus: Catalogue (default) · Carts · Sale orders. Customer mode is a switch, not a page.

| Feature | ★ | Call | Why |
|---|---|---|---|
| Picture grid, active cart chips on cards | ★★★★★ | Keep | The core of the product: photo first, one tap to add. |
| List view | ★★★ | Keep | For staff checking stock. Customers never need it. |
| Filters & sort, one sheet, save as list | ★★★★ | Keep | The single sort-and-filter button (F:86) keeps the grid calm. |
| Quick-chip row under search (per role) | ★★★★ | Keep | One tap beats opening the filter sheet; per-role defaults (DU:17). |
| Product · customer view | ★★★★★ | Keep | What the customer sees in the cabin. |
| Product · salesperson view, 3 tabs | ★★★★ | Simplify | Open on *Stock & production* every time. Recipe & media and Analytics & orders sit one tab away. |
| Full-screen viewer (colours, then media) | ★★★★★ | Keep | Customers buy from pictures. |
| Scan pop-up | ★★★★★ | Simplify | The BRD's four quick-add buttons (Add pc, Add colour set, to all carts ×2) are too many under time pressure. Make it two buttons (Add piece · Add colour set) with one "all carts" switch. |
| Scan camera, focus mode + Scan-to-add toggle | ★★★★★ | Gap | Only the pop-up is drawn. The camera screen and its green persistent state (F:84) are missing. |
| Voice search (listening orb) | ★★★★★ | Keep | Owner, 6 Oct: about 30 % of users are semi-skilled workers (₹15–40k a month) who need voice search and easy browsing more than features. It must understand Hindi / Hinglish product talk. |
| Tags · one action chip + one stock pill per card | ★★★★ | Keep | The card budget (DU:9) is the right discipline. |
| "Why?" panel on a chip | ★★★ | Simplify | Managers want it; salespeople mostly don't. Show it on long-press only, not as a visible affordance. |
| Salesperson tag rail (action · colours · about) | ★★★ | Keep | Where the sale manager sets the promotional badges (DU:13). |
| Customer mode switch | ★★★★★ | Keep | Drawn across the finals. It must be impossible to miss when it is on. |
| Carts · grouped by design, totals | ★★★★ | Keep | |
| Cart chip: tap activates, double tap opens the card | ★★★★ | Keep | Owner, 6 Oct: a single tap makes that cart the active one, so what is picked in the catalogue goes into it; a double tap opens the cart card. As drawn. |
| "+ new cart" from the cart button | ★★★★ | Gap | F:83. No screen shows starting a cart for a new customer. |
| Over-credit-limit block on submit | ★★★★ | Gap | F:17. The salesperson needs to see why an order will not go through, in words, before the customer leaves. |
| Sale orders · cards | ★★★★ | Keep | Phone default. |
| Sale orders · table, column chooser, group by | ★★★ | Simplify | Desk-only. On phone keep cards and drop the table and group-by frames; tables at 390 px are hard to read. |
| Sale order · opened | ★★★★ | Keep | |
| Returns tab (cards, table, credit note pane) | ★★★ | Keep | Read-only here; the return itself is made in Dispatch. |
| Analytics · orders, designs, customers | ★★★ | Simplify | Owner, 6 Oct: sale managers and above only; the tab is hidden for sale executives. On phone, one chart per screen, no tables. |

## 2 · App shell

**Who:** every role. **Job:** get anyone to their module and back in one or two taps, and keep the role's screens
simple.

| Feature | ★ | Call | Why |
|---|---|---|---|
| Phone island (Home · Catalogue · CRM · Dispatch · Production · More) | ★★★★★ | Keep | Drawn on every phone final. Show each role only its modules; a packer sees Dispatch and Home only. |
| Phone side menu, all modules | ★★★ | Keep | A fallback for the "More" modules. |
| Web rail + expanded sidebar with sub-menus | ★★★★ | Keep | |
| Web tab strip of open screens | ★★★ | Keep | Good for desk power users. It should start empty and never be required. |
| Web search pane (scope, recents, matches by section) | ★★★★ | Keep | |
| Phone search | ★★★★★ | Gap | Search is drawn on web only. On phone it is the catalogue's top field (F:82), where people will use it most. |
| Login and firm selector (admin sees all firms) | ★★★★ | Gap | F:28. Needed for the developer even if it is plain. |
| User menu (profile, theme, show / hide modules) | ★★★ | Gap | F:289. One small sheet. |
| Agent orb in the header | ★★★★★ | Keep | Owner, 6 Oct: required, for the same 30 % of users as voice search. |
| Permission requests (24 h · 1 w · 1 m · 3 m) | ★★★ | Later | It belongs with Home › Approvals and Channels; draw it with those modules. |

## 3 · Dispatch

**Who:** desk operator on a 24″ screen, packer on a phone with a Bluetooth scanner, dispatch / sale manager, accounts for
returns. **Main flow:** ready orders → PACK → scan pieces into boxes → invoice review → done → close shipment → print.
Money shows only to the desk and managers, never on the floor phone (F:164, F:219).

Sub-menus: Ready · Pending · Packing · Billed · Out of stock · Stock · Sale return.

| Feature | ★ | Call | Why |
|---|---|---|---|
| Ready · customer cards, priority ring, PACK ▸ | ★★★★★ | Simplify | Two versions are on the board: the first Dispatch band, and "Dispatch · on the approved bar" (8 Sep). Keep the approved-bar version and retire the older Ready and Pending frames, so the developer sees one answer. |
| Pending · grid, list, order pane, four situations | ★★★★ | Simplify | Same as above. Put "Held" (F:12) in as one of the situations; it is not drawn. |
| Pending · manager (₹) / packer (no ₹) variants | ★★★★★ | Keep | The money rule made visible. |
| Packing · desk terminal with live invoice | ★★★★★ | Keep | |
| Packing · scan armed, rejected (with reason), remove confirm | ★★★★★ | Keep | Rejections are in words; keep it that way. |
| Packing · "Scan here" toggle between desk and phone | ★★★★ | Keep | Avoids two devices fighting for one scanner. |
| Packing · phone picker → scan → review → invoiced | ★★★★★ | Keep | Large tally, green flash, no money. |
| Packing · invoice review, done, close shipment, A4 print | ★★★★ | Keep | The HSN column stays empty until HSN and GST per design are decided (M:394). |
| Billed · invoices, invoice sheet, shipments history | ★★★★ | Keep | Packer variant without ₹ stays. |
| Out of stock · order and restock cards, who-is-waiting | ★★★★ | Keep | Restock lead time is assumed at 45 days until the owner sets it (DP:295). |
| Stock · finished goods | ★★★★ | Keep | |
| Stock · material and work in progress | ★★ | Simplify | Not dispatch's job day to day; Production owns them. Keep them as read-only tabs for managers and hide them from packers. |
| Stock · FG inward with verify and gate token | ★★★★ | Keep | FG inward lives in Dispatch by decision (DP:361). |
| Sale return, 4 steps, blockers in words | ★★★★ | Keep | Stock returns to FG only after accounts approve (F:216). |
| LIVE / offline chip | ★★★ | Keep | Drawn in Dispatch. It must say what still works offline. |

---

## Gaps to draw (from the BRD, not on the board)

1. Catalogue · scan camera, focus mode with the Scan-to-add state (phone).
2. Catalogue · "+ new cart" from the cart button (phone and web).
3. Catalogue · over-credit-limit block when an order is submitted (phone and web).
4. App shell · search on phone.
5. App shell · login and firm selector; user menu.
6. Dispatch · "Held" in Pending.

## Clean-up (no new design)

7. Dispatch · retire the older Ready and Pending frames once the approved-bar versions are confirmed.
8. Catalogue · Sale orders on phone keep cards only; the table and group-by frames move to web only.

## Owner answers (6 Oct 2026)

| # | Answer |
|---|---|
| 1 | Scan pop-up: accepted. Two buttons (Add piece · Add colour set) and one "all carts" switch. |
| 2 | Voice search and the agent orb stay. About 30 % of users are semi-skilled workers who need voice search and easy browsing across the app; they use few features. |
| 3 | Cart chip: single tap activates the cart (catalogue picks go into it), double tap opens the cart card. Stays as drawn. |
| 4 | Not answered yet. |
| 5 | Analytics: sale managers and above. |
| 6–8 | Not answered yet. |

A product rule follows from answer 2, for every module: the screens a semi-skilled worker uses must work by
voice and by browsing pictures, with as few typed fields and choices as possible.

## Decisions for the owner

Answer by number. Each one changes what gets drawn.

1. **Scan pop-up** · cut the four quick-add buttons to two (Add piece · Add colour set) plus an "all carts" switch?
2. **Voice search and the agent orb** · move them to *Later* and keep the frames only for reference?
3. **Cart card** · open on a single tap instead of a double tap?
4. **Sale orders on phone** · cards only, table and group-by on web only?
5. **Analytics** · visible to sale managers and above only?
6. **Dispatch Ready / Pending** · is the "approved bar" version (8 Sep) the one to keep? The older frames would leave the board.
7. **Stock · material and WIP in Dispatch** · managers only, read-only?
8. **Open BRD items** that block final screens: HSN code and GST rate per design · the discount (who sets it, per design or per colour, expiry) · the FG low-stock rule · restock lead time (45 days assumed) · whether a sale executive sees godown stock in the scan pop-up (F:85 reads both ways).
