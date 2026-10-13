# Desk density (13 Oct 2026)

Workstream of review 2 (`plans/review-2-template-and-sell-flow.md` §1.6, §1.8, decision 5). Proposes the schema's §9, audits
every sub-menu on the board for its density, checks the structured Dispatch drafts against the chrome rule, and lists
what they still miss. Proposed text only: the schema changes when the owner answers decision 5 and the lead lands it.
Compare pair on the board: Catalogue · sale orders · structured › Sale orders · Desk (n-19, nw-15 on the review branch)
against f-15 and w-9. Decision 5 answered yes, provisionally, by the lead for the owner (13 Oct); the owner may overturn.

---

## 1. Proposed SCH §9 · Densities

One language, two densities, the same tokens. *Cabin* shows the product the way a buyer meets it: picture first, rounded,
generous. *Desk* shows the business the way an accountant trusts it: ruled and boxed, numbers right-aligned, status as
words, **and with air**. Desk is not denser: it is more ordered. The owner likes the rectangular, ruled boxes and finds
the first structured drafts crowded, so Desk never buys order with more rows per screen. A screen picks a density for
its **content area** only. A desk table inside a cabin shell is the normal case.

**Never changes between densities.** The tokens of §1 (both themes), the three type faces of §2, and the chrome:
rail, sidebar, tab strip, web header, view tabs (`ViewTabs`) and the toolbar row under them, right pane (frame, width,
title), the phone frame (`frameF`), the module's phone header, the island, the cart strip, sheets. Also the rules of §8:
one maroon line, photo beside every design number, the design number as the head in the display face, Lucide, money only
where the BRD allows, phone and web, light and dark.

**What changes, inside the content area only.**

| | Cabin | Desk |
|---|---|---|
| Card, pane box, table frame | 22, hairline + soft shadow (light) | 4, 1px `line2`, no shadow |
| Photo | 16 (grid 4:5 hero), 8 in list rows | 3, always 4:5: 32 × 40 web, 36 × 45 phone, 28 × 35 in a card strip |
| Tag, chip, button, input inside content | pill (999) | 3 |
| Rules | gaps between cards | 1px `line` between rows; no zebra, no gradient |
| Row height | list row 78 (photo 62 × 78) | 44 web (never 36), 56 phone (48 for a nested row); heads 38 web / 30 phone |
| Air | card gaps 10–12 | cell gutter 24 web, side padding 20 in a table, 16 in a phone box; 14 between boxes |
| First view | — | at most six columns (the rest behind Columns); about eight rows, then a foot with the count and totals |
| Column heads | — | 11 px uppercase, .07em, `ink3` on `surface2`; numeric heads right-aligned |
| Numbers | display face, `PriceF` | UI face, tabular, right-aligned in columns; `PriceF` only for the one total of a card or pane |
| Counts | KPI tile, value display 24 | count cell, display 28 web / 30 phone over an 11 px uppercase label; no tile box |
| Status | outlined word in a pill tag | outlined word in a 3px tag, 20 web / 24 phone, 10 px uppercase |
| Colour in content | danger and warn only for status; ok / blue allowed in charts (§6) | danger and warn only; ok, blue, gold never |
| Progress | bar allowed (stacked availability) | text "12 / 20", never a bar |
| Buttons in content | `T.Btn`, primary maroon | 36 web / 48 phone; secondary 1px ink outline; primary maroon only when the frame has no maroon yet |
| Selection | accent ring | 2px ink bar at the row's left edge on `bg2` |

**Status for both densities (§1.8).** A status is a word in an outlined tag (`ink2` on `line2`). Colour only for danger
(overdue, rejected, short, over the credit line, OUT, Nil) and warn (due ≤ 2 d, waiting, LOW). Filled only for the one
live state on a frame (PACKING INTO).

**The maroon line.** The chrome spends it first: the active view tab underline on web and on the phone's module header.
When the chrome has spent it, Desk content carries none (selection is ink, actions are outlined). When it has not, the
content's single primary button takes it.

**The air budget (Desk).** Two control rows under the header, never three: view tabs, then one toolbar (search ·
Filters ▾ · one sort · at most four quick chips). No third pane: main area plus the one right pane. One table per
main area on first view; a second list goes behind a tab. A form takes the main area at more than four fields (D4).

**Which density.** Desk where the user reads more than about twenty rows, compares numbers down a column, or works a
form with Tab and Enter. Cabin where the user finds by picture, shows a customer, or works with one hand on the floor.
Mixed is allowed per frame region (a Desk order table, Cabin approval lines with photos), never per row.

---

## 2. Audit · every sub-menu on the board

| Module · sub-menu | Call | Why |
|---|---|---|
| Catalogue · Catalogue (grid, list, product, scan, viewer) | Cabin | Find by picture; customer in the cabin |
| Catalogue · Carts, cart card | Cabin | Picture list in front of the customer |
| Catalogue · Sale orders (cards, table, group by) | Desk | A book of orders read by number and ₹; drawn n-16 / nw-13 |
| Catalogue · Sale orders · opened order | Mixed | Desk facts and totals, order lines keep photo 44 × 56 |
| Catalogue · Sale orders · Returns | Desk | Same book as the orders |
| Catalogue · Sale orders · Analytics | Mixed | Web tables (Desk); phone cards with charts (Cabin box, Desk tags) per `sale-orders-structured.md` §3 |
| Catalogue · tags (chips, sheet, tag rail) | Cabin | Merchandising on the picture |
| Catalogue · sell flow (header, new cart, new customer, submit) | Cabin | Short sheets in the cabin; three to five fields |
| App shell · navigation, search pane | Chrome | Never takes a density |
| Dispatch · Ready, Pending, Billed, Stock, Out of stock, Sale return | Desk | Ledgers read at a desk and at arm's length |
| Dispatch · Packing (web terminal) | Desk | Boxes and invoice as ruled tables |
| Dispatch · Packing (phone scan, add by picture) | Mixed | Camera band and 56 px tally for the packer; rows ruled |
| Dispatch · FG inward (worker) | Mixed | Cards to count by picture, then a ruled gate token |
| Production · Overview | Mixed | Desk counts and lists; Cabin for the sample strip |
| Production · Purchase, Materials, Orders & lifecycle, Costing | Desk | Lines, quantities, rates, forms with Enter |
| Production · Process setting | Mixed | Desk steps and BOMs; the design keeps its Cabin photo head |
| Production · Job cards | Mixed | Desk on web; the karigar's phone card stays Cabin |
| Production · Samples | Cabin | Picture-led trials, moodboard |
| Production · Karigars | Mixed | Person cards (Cabin), score table (Desk) |
| CRM · Follow-ups | Mixed | Salesperson phone list Cabin; web day book Desk |
| CRM · Share | Cabin | Designs sent as pictures |
| CRM · Payments | Desk | Bills, ageing, ₹ columns |
| CRM · Customers | Mixed | List Desk; dossier head Cabin |
| CRM · Journeys | Cabin | A builder of steps, few rows |
| Studio · every sub-menu | Cabin | Generation is pictures |
| Home · landing | Cabin | Four numbers and a needs-you list |
| Home · Approvals queue | Desk | A queue sorted by flags |
| Home · Approvals card | Mixed | Desk facts, tiles and history; order lines with photos |
| Home · Gate pass | Desk | Tokens and counts |
| Hub · New product, New material, Import, Masters | Desk | Main-area forms and master tables (decision 4) |
| Hub · Upload centre | Cabin | A per-colour photo checklist |

---

## 3. Structured Dispatch drafts against the chrome rule

Checked on `contact-sheet.sh dispatch "Structured"` (n-27…n-31, nw-24…nw-27 on 13 Oct).

| Check | Web (`mod-dispatch-s-web.jsx`) | Phone (`mod-dispatch-s.jsx`) |
|---|---|---|
| Shell | `WebShell3`, `DISP_SEG`, `D_TABS3`, LIVE in the strip: holds | `frameF` + `T.Island active="Dispatch"`: holds |
| Header | `Header3` untouched: holds | **Breaks.** `DsHeader` is its own flat bar: no lockup, cart or menu; a 3px square search; a role tag. The module phone header must be the shared one (three rows if decision 1 lands), with the node row as its sub-menu row |
| Navigation | **Duplicates.** The 28 px count strip (`DsWCount`, Ready · Pending · … · Sale return) repeats the header's sub-menu buttons; as content it should count the situations inside the node (Overdue · Due soon · Short · Packable), as `ScreenDsPending` already does | The node row (`DsNodes`) carries the maroon underline; under the shared header it stays, Desk counts move into content |
| Right pane | **Width.** 330 on Ready / Pending / Billed, 340 on Packing; SCH §5 says 310 on Dispatch | — |
| Sheets | none drawn yet; `dispatch-structured.md` §3 asks for square-topped sheets, which the chrome rule overrides: sheets stay as the finals draw them | same |
| Tokens | no `T.ok`, `T.gold`, `T.blue`, no 999 radius: holds | same: holds |

Fix with the next Dispatch pass (my files): phone header → shared header; web count strip → situation counts; pane 310.

---

## 4. Still missing from `dispatch-structured.md` §4 (not drawn yet)

- **Ready** · `ScreenDsReadyFilters` (filters sheet, finals' sheet shape).
- **Packing** · phone picker (`ScreenDsPicker`, the packer's new default, three tabs), scan rejected, add by picture,
  waiting for desk / invoiced; web `WebDsPackingScan`, `WebDsInvoiceReview`, `WebDsInvoiceDone`, `WebDsShipmentSheet`
  (`WebDPrint` stays).
- **Billed on the phone** · `ScreenDsBilled`, `ScreenDsBilledPacker` (no ₹), `ScreenDsInvoiceSheet` and its packer
  variant, `ScreenDsShipments`; web `WebDsShipments`.
- **Out of stock** · `ScreenDsOOS`, `ScreenDsOOSFilters`, `WebDsOOS` (counts strip, ruled colour matrix with danger
  "Nil", karigar row with a 48 px call).
- **Stock** · FG, Materials, WIP, FG inward on phone and web (`StockPill` → status word: OUT danger, LOW warn).
- **Sale return** · Ret 1–4 phone and web, Ret 3 / Ret 4 packer variants (step rail as four ruled cells, RAISED as a word).
- **Packer phone flows of `dispatch-flows.md` §7** · 1 picker → scan → rejected → add by picture → review → invoiced;
  2 what is short → Stock · FG row; 3 FG inward cards → count → gate token; 6 the order trail sheet. Manager flows 4–5
  are partly covered by nw-24…nw-28 (Ready board with one sort, terminal); invoice review → done → close shipment are not.

---

## 5. The compare pair (drawn 13 Oct)

`mod-catalogue-so-s.jsx`, registered as 'Catalogue · sale orders · structured' › Sale orders · Desk.

- **n-16 · Sale orders · cards, Desk density** (beside f-15). The finals' `SOHeader` and island untouched. A count line
  (3 orders · 18 pcs · ₹85,910); cards as 4px boxes with a ruled head (order no, date, RAISED, a flag word: OVER THE LINE
  danger, WAITING 3 D warn), customer and ₹ in the display face, a strip of the order's designs with the photo beside each
  number, a ruled foot with phone, agent and square print / share.
- **nw-13 · Sale orders · table with the order pane, Desk density** (beside w-9). The finals' `WebShell`, `ViewTabs` and
  toolbar untouched. Ruled table, 44 px rows, 11 px heads, ₹ and pcs right-aligned, the selected row an ink bar, status
  RAISED plus a flag word; a totals foot. The pane: ruled facts, lines with photo beside each design number and colour
  swatch, the total in `PriceF`, Edit and "Approval card" outlined (decision 6: approval lives on Home).
- The one maroon line on both is the active view tab. Content carries none.

---

## 6. Rulings (lead, 13 Oct; the owner's decisions 3, 4, 5, 13, 14 still to come)

1. **Toolbar chips are chrome:** pill in both densities. `sale-orders-structured.md` §1 is superseded on this point.
2. **Dispatch phone screens move onto the shared module header** (lockup, role, cart, menu, search island, sub-menu
   scroller); the row count follows decision 1. A lighter packer header only if decision 2 asks for role variants.
3. **Flags are approver-side only** (owner, 13 Oct). Sale managers and accounts see them on the book (nw-13 is captioned
   as the manager view); a sale executive sees RAISED / IN QUEUE and no flag column. Executive variant: to draw.
4. **Mixed density per frame region, never per row.** The content area picks one density; a pane may carry the other.
5. **Dispatch pane 310**, per SCH §5.

Board ids after the lead's merge (review branch): cards n-19 / nd-19, table nw-13 / nwd-13.

---

## 7. Exemplars drawn on the provisional answers (13 Oct; all drafts, nothing in finals)

Pictures for the owner to compare, not decisions applied: decisions 3, 4, 5, 13 and 14 are unanswered on the deck.
Every caption ends "· provisional, pending decision n". The two Production screens are copies in my own file;
`mod-production-web.jsx` is untouched.

Owner's scope rule: one exemplar pair per decision for compare, no sweep before the core screens are final.

| Decision | File | Frames (ids on my branch with the file loaded; the review branch may shift them) | What it shows |
|---|---|---|---|
| D5 · Desk with air | `mod-catalogue-so-s.jsx` (revised) | n-19 / nw-15 on the review branch | Six columns on first view, 44 px rows, 24 gutters, 8 rows then a foot, two control rows, pane facts cut to three |
| D3 · header of six | `mod-production-ds.jsx` | n-47 · nw-48 | Phone scroller of six groups; web header Purchase ▾ · Materials ▾ · Recipes · Orders ▾ · Samples · More ▾, Orders ▾ open with Job cards inside, search 196 |
| D13 · inward | `mod-production-ds.jsx` | n-48 · nw-49 | Supplier invoice no and date first (box 1), received the only typed number, accounts folded to Freight · Discount · GST with More; phone has no money |
| D14 · tranches | `mod-production-ds.jsx` | n-49 · nw-50 | Reason chips under the head, "30 / 30 / 40 · ends dd/mm" per process, Embroidery opened to three tranches; fields cut to four, the rest as meta |

`mod-production-ds.jsx` needs one line in `modules.js`: production `files`, after `mod-production-web3.jsx` (the lead adds it).
D4 (forms to the main area) has no separate exemplar: the inward and new-order frames are main-area forms with a helping
pane; New PO, New material and New sample wait for the sweep.

**Waits.** Dispatch phone onto the shared header and pane 310 (ruling 2, 5); the sale-executive Sale orders variant
without flags (ruling 3); the Dispatch gaps of §4; the D4 moves of New PO, New material, New sample; folding §1 into the
schema (the lead lands it). Content primaries in Desk frames are filled ink, so the active view tab stays the one maroon
line; the owner may want the maroon on the form's submit instead.
