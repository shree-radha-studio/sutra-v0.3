# Review 2 · Catalogue sell flow (13 Oct 2026)

Gaps 2 and 3 of `review-1-catalogue-appshell-dispatch.md` ("+ new cart", over-credit-limit block), the BRD's new-customer
rule (name, contact, city only; two sale books) and two calmer phone grid headers drawn beside the final for compare.
File: `mod-catalogue-sell.jsx` (module page `catalogue`, registered as "Catalogue · sell flow"). Drafts only; `finals.jsx`
is untouched. Users: salespeople in the cabin with the customer beside them, about 30 % semi-skilled (few typed fields,
big targets, pictures, a voice button on the two typed fields).

## Screens in flow order

New cart & customer
1. n-9 / nd-9 · `ScreenCsNewCart` · Carts · new cart sheet: search (no keyboard), three recent customers, "New customer" row, sale book In-cabin · WhatsApp, "Start cart D".
2. n-10 / nd-10 · `ScreenCsNewCustomer` · Carts · new customer sheet: name, phone, city (48 px, label above value), optional group, note, "Add and start cart D".
3. nw-9 / nwd-9 · `WebCsNewCart` · the same picker in the right pane, "+" chip pressed in the chips row.
4. nw-10 / nwd-10 · `WebCsNewCustomer` · the new-customer fields in the pane, with a "Customers" back chip.

Submit for approval
5. n-11 / nd-11 · `ScreenCsSubmit` · Cart · submit for approval sheet: summary with photos, due days, priority, credit line fits, note, "Send for approval".
6. n-12 / nd-12 · `ScreenCsSubmitBlocked` · Cart · over the credit line: bar over the line, danger strip in words, "Send to admin" + "Trim cart".
7. n-13 / nd-13 · `ScreenCsSubmitted` · Cart · sent for approval: A greyed "sent", B active, confirmation card with SO-3456, toast.
8. nw-11 / nwd-11 · `WebCsSubmit` · submit in the pane (credit line fits).
9. nw-12 / nwd-12 · `WebCsSubmitBlocked` · over the credit line in the pane.

Calmer grid header (phone only, compare with final f-1)
10. n-14 / nd-14 · `ScreenCsGrid3` · three rows: top bar, search island, one row (lists, hairline, quick chips); count as a Meta line in the body. About 10 px more grid than f-1 at rest.
11. n-15 / nd-15 · `ScreenCsGrid2` · two rows: identity and search only; the lists-and-chips row is the first row of the grid body. Drawn after the first swipe (the row has scrolled away), so the grid starts about 55 px higher than f-1. At rest the row sits under the search island and the grid starts level with n-14.

## Components reused unchanged
`frameF`, `scrimF`, `ScreenFCarts` (the screen under every sheet), `CartGroups`, `groupsOf`, `PriceF`, `money`, `LISTS`, `QTY`,
`CARTS`, `Sheet`, `Meta`, `Mono`, `Thumb`, `Monogram`, `Toast`, `Hit`, `Ic`, `glass`, `T.Btn`, `T.Chip`, `T.Dock` / `T.Island`,
`T.TopBar`, `T.SearchBar`, `T.GridCard`, `WebShell3`, `CAT_SEG`, `RightPane` (through `WebShell3`). The web Carts main area is
`WebCarts`' own markup (`CsWebCartsMain`) so the pane is the only change.

New, prefixed `Cs` (genuinely new to these screens): `CsSearch`, `CsSeg`, `CsChoice`, `CsRow`, `CsField`, `CsOptRow`, `CsCustRow`,
`CsLabel`, `CsDesigns`, `CsCartChips` (the final's chips plus a pressed "+" and a sent state), `CsNewCartBody`, `CsNewCustBody`,
`CsCredit` (stacked credit bar), `CsSubmitBody`, `CsSubmitFoot`, `CsStrip`, `CsSentCard`, `CsMergedRow`, `CsHeader`, `CsCount`,
`CsGridCards`, `CsOverCarts`, `CsWebCartsMain`, `CsPane`, `CsBack`, `CsWebShell`.

## Assumed, not in the BRD
- **Credit facts** (line ₹1,20,000, open bills ₹52,000 fits / ₹82,000 over) are sample numbers. In the product the line comes
  from the customer master (BRD F:17) and open bills from the ledger / CRM payments; the cart total from the cart.
- **Over the line goes to admin, not accounts** (BRD F:17: blocked and escalated to admin with a red blocker). The sale is not
  stopped on the phone: it is sent to admin and the salesperson is told so in words. "Send to admin" keeps the one maroon button.
- **Trim cart**: a secondary action that returns to the cart so pieces can be taken out. Not in the BRD.
- **Due-days chip set** 10 d · 20 d · 30 d · custom, 20 d default (BRD F:12 gives the 20 d default and "adjustable at the time
  of noting"; the three steps and "custom" are drawn here).
- **Priority 1–5**, 3 chosen, "1 packs first": taken from the Dispatch priority filter (P1–P5); whether the salesperson sets it
  at submit time, and what the default is, is not decided.
- **"Nalini (accounts) will see it now · usually within 2 h"**: the name is the board's accounts person; the 2 h expectation is
  invented and should come from a measured median once it exists.
- **SO-3456** is the next number after SO-3455 on the board. The order number is assigned on submit.
- **Recent customers**: three of the five customers, last order dates from the board's orders; customers who already have an
  open cart (Ramleela Fashion, RL Fashion, Nalli) are left out of the list. Search finds the rest. The first row is drawn picked
  (ink outline and a check, not maroon) so "Start cart D" has something to start.
- **New customer**: "Optional" shows Broker · Agency and GST number; credit days (30 default) and transport sit behind "More".
  Phone is the contact (BRD: "contact"). A credit line for a new customer is not asked here.
- **Voice button** on the customer search and on the approval note (the 30 % semi-skilled users need voice, review 1 answer 2).
- **Sale book** stays In-cabin · WhatsApp (BRD "two books") and is chosen when the cart is started, as in the final's cart card.
- **Carts screen entry points**: the final's "New customer" chip on the phone Carts screen and the "+" chip both open the new
  cart sheet; the chip would read "New cart" in the final (not changed here, the final is untouched).
- **Credit bar uses accent for "this cart"** as briefed; on the dark theme the primary button is ink, so the bar is then the
  only maroon on screen. The bar is the one place a second maroon appears on the light theme.
- **Calmer header, row 3**: the current list ("All") stays pinned at the left while the other lists, the hairline and the quick
  chips scroll, so the active list is always visible. The first frame is drawn swiped to the saved lists so the hairline and the
  chips are visible; at rest only the lists show and the chips are one swipe away.

## Trade-offs for the owner
- In the merged row the applied chips (Top 30, Delhi, Zari work, Wine) are no longer visible at rest. A count dot on the filters
  button in the search island would show "4 applied" (the island is unchanged here as briefed).
- n-14 saves only about 10 px (the Meta line takes back most of the chips row). n-15 saves about 55 px but only after the first swipe.
- Design photos: 3661 and 1457 have no photo in the board's data, so their thumbs show the code, as the final's cart rows do.
