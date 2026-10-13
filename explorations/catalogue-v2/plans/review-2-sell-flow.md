# Review 2 · Catalogue sell flow (13 Oct 2026)

Gap 2 of `review-1-catalogue-appshell-dispatch.md` ("+ new cart"), the BRD's new-customer rule (name, contact, city only; two
sale books), the order in the approval queue, and two calmer phone grid headers drawn beside the final for compare.
File: `mod-catalogue-sell.jsx` (module page `catalogue`, registered as "Catalogue · sell flow"). Drafts only; `finals.jsx`
is untouched. Users: salespeople in the cabin with the customer beside them, about 30 % semi-skilled (few typed fields,
big targets, pictures, a voice button on the typed fields).

## Owner's rule, 13 Oct 2026 (why the Submit sub-menu changed)
Submission is never blocked, and a submitted order can be edited or deleted by the salesperson while it waits in the approval
queue. The reasons not to approve (credit line, overdue bills) become flags on the approver's side, not gates on the
salesperson's side. So the first draft of this sub-menu (credit-line bar, "over the line" block, "Send to admin", "Trim cart")
is gone. Nothing on the submit sheet can block, and the three new screens show the order while it waits. The approver's flags
belong to Home › Approvals and are not drawn here; there is no Approve button on any screen of this file.

## Screens in flow order (frame ids on the catalogue page; add `d` after the prefix for dark)

New cart & customer
1. n-9 `ScreenCsNewCart` · Carts · new cart sheet: search (no keyboard), three recent customers, "New customer" row, sale book In-cabin · WhatsApp, "Start cart D".
2. n-10 `ScreenCsNewCustomer` · Carts · new customer sheet: name, phone, city (48 px, label above value), optional group, note, "Add and start cart D".
3. nw-9 `WebCsNewCart` · the same picker in the right pane, "+" chip pressed in the chips row.
4. nw-10 `WebCsNewCustomer` · the new-customer fields in the pane, with a "Customers" back chip.

Submit for approval (summary → sent → in the queue → editing → delete, in words)
5. n-11 `ScreenCsSubmit` · Cart · submit for approval sheet: customer summary with total and design photos, Dispatch due chips, Priority pills, note with mic, "Send for approval".
6. n-12 `ScreenCsSubmitted` · Cart · sent for approval: A greyed "sent", B active, confirmation card with SO-3456, "In the queue. You can edit or delete it until it is approved.", Share with customer · Open order, toast.
7. n-13 `ScreenCsInQueue` · Sale orders · my order in the queue, edit or delete: the opened order anatomy of `ScreenFSalesOrder` (head with IN QUEUE tag, customer bar, lines with photos, total) with the queue strip under the head; docked Delete (outline) and Edit order (primary).
8. n-14 `ScreenCsEditing` · Sale orders · editing SO-3456 as cart A: the Carts screen, A's chip reading "SO-3456 · editing", strip above the cart card, steppers live, Discard changes (outline) · Send changes (primary).
9. n-15 `ScreenCsDeleteConfirm` · Sale orders · delete, in words: short sheet over n-13, "Delete SO-3456?", Keep it · Delete.
10. nw-11 `WebCsSubmit` · Cart · submit for approval in the pane.
11. nw-12 `WebCsInQueue` · Sale orders · my order in the queue, Edit and Delete in the pane: the Sale orders web screen (WebSO3's anatomy) with SO-3456 picked, status tag IN QUEUE, pane with the strip, the order and the two buttons.

12. nw-13 `WebCsEditing` · Sale orders · editing SO-3456 as cart A: the Carts web screen, chip "SO-3456 · editing"; the pane carries the editing strip, customer, total, design photos, Discard changes (outline) · Send changes (primary).
13. nw-14 `WebCsDelete` · Sale orders · delete, in words: centred dialog (the dispatch web drafts' pattern) over nw-12, "Delete SO-3456?", Keep it · Delete.
(nw-12, nw-13, nw-14 are in that order in the sub-menu; the grid frames below keep their numbers on phone.)

Calmer grid header (phone only, compare with final f-1)
12. n-16 `ScreenCsGrid3` · three rows: top bar, search island, one row (lists, hairline, quick chips); count as a Meta line in the body. About 10 px more grid than f-1.
13. n-17 `ScreenCsGrid2` · two rows at rest: identity and search only; the lists-and-chips row is the first row of the grid body and the grid starts right under it (level with n-16).
14. n-18 `ScreenCsGrid2Swiped` · two rows after the first swipe: the row has scrolled away with the grid, so the grid starts about 55 px higher than f-1.
15. n-19 `ScreenCsRoleIsland` · Grid · island for a sale executive (decision 2 exemplar): the two-row header of n-17 with `CsRoleIsland` (Home · Catalogue · CRM · More, then the voice orb); a packer's would be Home · Dispatch · More (`CS_ROLE_NAV`). T.Island in final.jsx is untouched.
All three grid frames carry a count bubble ("4", ink on bg, like the cart count) on the filters button of the search island.

## Components reused unchanged
`frameF`, `scrimF`, `ScreenFCarts` (the screen under the new-cart, new-customer and submit sheets), `CartGroups`, `groupsOf`,
`CustomerBar`, `OrderLines`, `StatusPill`, `ORDERS_F`, `SO_TABS2`, `SOCard`, `PriceF`, `money`, `LISTS`, `QTY`, `CARTS`, `Sheet`,
`Meta`, `Mono`, `Thumb`, `Monogram`, `Toast`, `Hit`, `Ic`, `glass`, `T.Btn`, `T.Chip`, `T.Dock` / `T.Island`, `T.TopBar`,
`T.SearchBar`, `T.GridCard`, `WebShell3`, `CAT_SEG`, `ViewTabs`, `RightPane` (through `WebShell3`). The web Carts main area is
`WebCarts`' own markup (`CsWebCartsMain`) so the pane is the only change.

New, prefixed `Cs`: `CsSearch`, `CsSeg`, `CsChoice`, `CsField`, `CsOptRow`, `CsCustRow`, `CsLabel`, `CsDesigns`, `CsCartChips` (the
final's chips plus a pressed "+", a sent state and an editing state), `CsNewCartBody`, `CsNewCustBody`, `CsSubmitBody`,
`CsSubmitFoot`, `CsInfoStrip`, `CsQueueStrip`, `CsQueueButtons`, `CsSentCard`, `CsMergedRow`, `CsFilterCount`, `CsHeader`, `CsCount`,
`CsGridCards`, `CsGrid2Frame`, `CsOverCarts`, `CsWebCartsMain`, `CsPane`, `CsBack`, `CsWebShell`.

## Assumed, not in the BRD
- **Edit and delete until approved** is the owner's rule of 13 Oct; the BRD does not say it. "Edit order" re-opens the order as
  cart A (chip "SO-3456 · editing"); "Send changes" puts it back in the queue; "Discard changes" leaves it as it was.
- **Delete** returns the customer's picks to cart A (the owner's wording), so nothing the customer chose is lost.
- **The queue strip** names Nalini (accounts), the board's accounts person, and a time ("since 10:42"). Who sees the order first
  and what the strip says when it goes to admin are not decided.
- **Due-days chip set** 10 d · 20 d · 30 d · custom, 20 d default (BRD F:12 gives the 20 d default and "adjustable at the time
  of noting"; the three steps and "custom" are drawn here).
- **Priority 1–5**, 3 chosen, "1 packs first": taken from the Dispatch priority filter (P1–P5); whether the salesperson sets it
  at submit time, and the default, are not decided.
- **SO-3456** is the next number after SO-3455 on the board. The order number is assigned on submit. Order date 13/10/26.
- **Ramleela Fashion** is not in the board's customer list; its customer card on the order uses sample values (Adajan, Surat;
  Patel Parcel Service; broker Harjeet Singh). The "Payment score" and "Credit" lines are the final's own `CustomerBar` text.
- **Recent customers**: three of the five, last order dates from the board's orders; customers who already have an open cart
  (Ramleela Fashion, RL Fashion, Nalli) are left out. Search finds the rest. The first row is drawn picked (ink outline and a
  check, not maroon) so "Start cart D" has something to start.
- **New customer**: three fields only (name, phone, city); broker, GST, credit days and transport are added later in the Hub. Phone is the contact (BRD: "contact").
- **Voice button** on the customer search and on the approval note (the 30 % semi-skilled users need voice, review 1 answer 2).
- **Sale book** stays In-cabin · WhatsApp (BRD "two books") and is chosen when the cart is started, as in the final's cart card.
- **Carts screen entry points**: the final's "New customer" chip on the phone Carts screen and the "+" chip both open the new
  cart sheet; the chip would read "New cart" in the final (not changed here, the final is untouched).
- **Calmer header, row 3**: the current list ("All") stays pinned at the left while the other lists, the hairline and the quick
  chips scroll, so the active list is always visible. The frames are drawn swiped sideways to the saved lists so the hairline
  and the chips are visible; at rest only the lists show and the chips are one swipe away.
- **Filter count bubble**: counts the applied chips (4: Top 30, Delhi, Zari work, Wine), so it matches the row; the owner's note
  said "3" as the example. It is laid over the final's unchanged search island, not part of `T.SearchBar`.

## Changed 13 Oct (lead's judgment notes)
- Web counterparts added: nw-13 (editing) and nw-14 (delete dialog), registered after nw-12.
- IN QUEUE tag no longer gold: `CsQueuePill` has StatusPill's shape with an accent dot and ink2 text; the queue strip's clock is ink2 too. Note: final.jsx's `StatusPill` draws RAISED in `T.warn` (gold) itself, so "the finals' RAISED tone" is gold; I followed the stated intent (no gold, accent dot). On nw-12 the other cards still show the final's gold RAISED/APPROVED tags until the density decision restyles them.
- `CsSOCard` copies SOCard's markup (mod-appshell.jsx, not mine) only to carry the queue pill.
- Filter count bubble stays "4"; grid frames untouched. Dark twins checked at --w 2700; console clean.

## Provisional answers (lead, for the owner, 13 Oct; owner may overturn on the deck; nothing goes into final.jsx this hour)
1 Phone header: three rows everywhere, two inside the catalogue grid (n-16, n-17 and n-18 stay as the exemplars). 2 Island per role: yes (n-19). 8 New customer: name, phone, city only; the rest later in the Hub (applied: n-10 and nw-10 now show the three fields and a line saying the rest is added later in the Hub; the optional group is gone). 9 Submit sheet: as drawn (n-11, nw-11).

## Trade-offs for the owner
- n-16 saves only about 10 px (the Meta line takes back most of the chips row). n-17 at rest is level with n-16; n-18 saves
  about 55 px but only after the first swipe.
- While editing, the A chip shows no piece count (the row would not fit the "+"); the strip under it says what is happening.
- Design photos: 3661 and 1457 have no photo in the board's data, so their thumbs show the code, as the final's cart rows do.
