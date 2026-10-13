# Review 2 · the template, the sell flow, the entry forms (13 Oct 2026)

A product pass one level above review 1. Review 1 and the Opus sheets that followed it (`review-1-catalogue-appshell-dispatch.md`,
`dispatch-flows.md`, `dispatch-structured.md`, `sale-orders-structured.md`, `production-coverage.md`, `crm.md` §7–8) judged
screen by screen and they stand; nothing here repeats them. This pass judges what every screen inherits (the template),
walks the sell flow as one path and names where it has no screen at all, passes the four Production entry forms for entry
speed, and ends with a prioritised backlog and the decisions waiting on the owner. The proposed screens are drawn as drafts
on the board (Home, Hub, Catalogue · sell flow) so each decision can be seen, not read.

**Who the users are (owner, 13 Oct).** About twenty thousand salaried Indian employees over time: accountants with two or
three years, fresh data-analytics engineers from tier-2 and tier-3 colleges, and (review 1) about 30 % semi-skilled floor and
cabin workers. The first two groups know Tally, Busy and Excel: ruled tables, Enter to the next field, numbers first. The
third group reads pictures and talks; it types as little as possible. The owner's own read of the board: the flow is right,
but it is "a bit crowded".

Sources: F = `design-system/research/brd-final.txt`, M = `brd-masters.txt`, B = `uploads/Business Req.txt`, DU =
`design/during-ui-business-requirements.md`, R1 = `plans/review-1-catalogue-appshell-dispatch.md`, SCH =
`design/SUTRA-DESIGN-SCHEMA.md`, code as `file:line`. The approvals reference the owner sent (Miro "SRS 8th sept", Approvals
phone, two frames) is used for its facts only, never for its look.

---

## 1 · The template: what every screen inherits

### 1.1 Phone: four rows of chrome before the first picture

The phone header block (`final.jsx:117`, `T.Header`) stacks the top bar (44), the search island (40), the lists bar and the
quick-chip row with the scroll indicator (`final.jsx:105–116`). Measured on the catalogue final f-1: the first photo starts
about 225 px down a 844 px screen; with a cart active the cart strip and the island take about 140 px at the foot. More
than 40 % of the screen is chrome. Every module copies this header (`PrHeader`, `DHeader`, `CrHeader`), so the feeling
repeats everywhere. This is the crowding the owner senses, and it is one fix, not thirty.

Two drafts are on the board for compare (Catalogue · sell flow › Calmer grid header):

- **Three rows.** The lists bar and the quick chips merge into one scrolling row (lists in the display face, a hairline, then
  the chips). The "15 designs" count moves to a meta line above the grid. Nothing is lost; one row is.
- **Two rows.** Top bar and search island only; the lists-and-chips row becomes the first row of the grid body and scrolls
  away with it. The grid starts 60 px higher.

Call: **three rows on every module** (the header must keep the sub-menu row, which is what the lists bar is on the phone,
SF "Sub-menu"), and **two rows inside the catalogue grid only**, where the lists row is a filter the user set once and does not
need pinned. Decision 1.

### 1.2 Phone: the island

Six tabs plus the orb (`final.jsx:141`, `NAVF` at `:10`) is seven targets, 48 px each, at the foot of a 390 px screen. Every
role gets all six today. Rule (R1 §2 already says it; make it the drawing): the island shows the role's modules only, never
more than four plus More and the orb. A packer sees Home · Dispatch · More; a sale executive Home · Catalogue · CRM · More;
a production hand Home · Production · More. Decision 2.

### 1.3 Web: one shell, one exception

The worry that the board carries several web shells is only half true. `PShell` (`mod-production-web.jsx:12`), `StShell`
(`mod-studio-web.jsx:9`) and the three CRM shells (`mod-crm-more.jsx:304,361,401`) all wrap `WebShell3` (`web.jsx:132`);
they add the module's sub-menu row and tabs and nothing else. The one real exception is `DShell` (`mod-dispatch-web.jsx:7`),
the 8 Sep Dispatch band, which re-implements the chrome; the structured Dispatch drafts already moved to `WebShell3`
(`dispatch-structured.md` §3). Retiring the 8 Sep Dispatch band (R1 clean-up 7) removes the exception. No decision needed;
it is in the backlog as a clean-up.

### 1.4 Web: the header overflows at eight sub-menu buttons

The header's rule (SCH §5) is a fixed 196 px head block, then the sub-menu text buttons, then bell · cart · search · orb. On
Production the row carries eight buttons (`PROD_SEG`) and the search field collapses to "Se…" on every Production frame
(nw-5, nw-6, nw-10, nw-15, nw-22, nw-38). Five buttons fit; eight do not. Rule: at most **six** sub-menu buttons in the
header; a module with more groups them (Production: Purchase ▾ · Materials ▾ · Recipes · Orders ▾ with Job cards inside ·
Samples · More ▾ holding Costing and Karigars), and the search field never drops below 180 px. Decision 3.

### 1.5 Web: where a form lives

Three Production forms sit in the 340 px right pane (New PO nw-5, New material nw-10, New sample nw-38) and two take the
main area with the pane as a helper (Purchase inward nw-6 with the supplier snapshot, New production order nw-22 with
material readiness). The pane forms are tight: eight to twelve fields in a column, 10.5 px labels, a scroll inside a scroll.
An accountant doing forty inwards a day works a main-area form with Tab and Enter, not a pane. Rule: **a form with more
than four fields takes the main area; the pane holds what helps fill it** (the supplier's last purchases, the material's
stock, the checklist). The Hub drafts (new product, new material, import) follow this. Decision 4.

### 1.6 Two design languages on the board

The finals speak one language: sand, rounded cards (22), pill chips, glass islands, soft shadows. The structured Dispatch
drafts (6 Oct) speak another: 4 px radii, 1 px rules, no shadow, 28 px counts, two colours. Both are good; both on one
product is a fork, and the next module drawn would have to pick one. The structured look is not a different brand, it is a
**density**: ruled rows for a desk that reads two hundred lines, instead of cards for a cabin that reads twelve pictures.

Call: **one language, two densities, same tokens.** *Cabin* (picture-led, rounded, generous: Catalogue, Carts, Product
pages, CRM share, Studio, Home) and *Desk* (ruled tables, 44 px rows, 4 px inside content, counts in the display face:
Dispatch, Production orders and job tables, Pending books, Hub lists, Reports, Approvals queue). The chrome never changes
between them: rail, tab strip, header, island, sheets and the right pane are identical. A desk table inside a cabin shell is
the normal case (Sale orders › table already is one). Decision 5. The schema file gets a §9 "Densities" once the owner
says yes.

### 1.7 Control rows under the header

On most web screens three rows of controls sit between the header and the first row of content: view tabs, then a toolbar
of quick chips and sorts, then column heads or a second chip row (nw-10 Materials: tabs · six chips and three menus · column
heads; nw-22 Orders: tabs · five reason chips · the form). Budget: **two rows** (view tabs, then one toolbar of search ·
Filters ▾ · one sort · at most four quick chips). The rest goes in the Filters sheet (D-0040, M:35). No decision; a rule for
the drafters, applied as modules are revisited.

### 1.8 Status by colour

Status pills on the finals use three hues (Raised accent, Approved blue, Dispatched ok on the Sale orders cards w-8), and the
structured plan already moves Dispatch to outlined tags with danger and warn only (`dispatch-structured.md` §3). Make that
the rule for the whole product: a status is a word in an outlined tag; colour only for danger (overdue, rejected, short) and
warn (due soon, low). Folds into Decision 5.

---

## 2 · The sell flow, walked as one path

The path the owner wants to sell: upload a product → create a customer → open a cart → pick in the catalogue → submit →
approval → ready → packing → history → analytics. Walked on the finals (phone f-1…f-18, web w-1…w-13) and the Dispatch
structured drafts (n-24…n-31, nw-24…nw-28).

| Step | Screen today | Verdict |
|---|---|---|
| Upload a product | None. The salesperson view has a "Media" button (f-8 recipe & media, `final.jsx:261` "Media centre · Upload"); Process setting step 1 says "pick or add a product master" (nw-15); the Hub, where masters are created (M:5, M:119), has no screen. | **Gap, P0.** Drawn: Hub › New product (web form, phone sheet), Upload centre (per-colour checklist of F:66–71, the no-photo queue of M:296), xlsx Import (M:103–106). |
| Create a customer | A "New customer" button on Carts (f-12, w-7) with no sheet behind it. B:82: required fields are name, contact, city only. | **Gap, P0.** Drawn: New cart sheet (recent customers · new customer · sale book) and New customer sheet (three required fields, the rest folded). |
| Open a cart, pick, cart card | f-1, f-12, f-13, w-1, w-7. Single tap activates, double tap opens (DU:138). | Keep. The best part of the product. |
| Submit for approval | A button (f-12, f-13, w-7). No summary, no due days (F:12: default 20, adjustable at noting), no priority (B:90: 1–5, default 3), no note. F:17 asks for a red block over the credit line; the owner overruled it on 13 Oct: submission is never blocked (the people submitting are blue-collar), a submitted order can be edited or deleted by its salesperson while it sits in the queue, and every reason not to approve is a flag on the approver's side. | **Gap, P0.** Drawn: Submit sheet (pcs · ₹ · due days · priority · note, nothing that blocks), the sent state with the SO number, the order in the queue with Edit and Delete, the editing state, the delete confirm in words. |
| Approval | None. F:46–56 lists the card's facts; the owner's Miro reference adds order lines with qty steppers, the note, order history with order / invoice / return links, and the two time-series graphs. The SO page's "Approve" (f-18, w-10) is a shortcut without the facts. | **Gap, P0.** Drawn: Home › Approvals queue, the sale-order card (standing tiles, credit bar, appetite, lines with steppers and stock, note, history, two charts, Reject · Hold · Approve, "for inspection → owner"), the over-the-line variant, the sale-return card. Rule: approval happens in one place; the SO page shows the state and links there. Decision 6. |
| Ready, packing | Dispatch structured drafts n-27, nw-24 (Ready), n-28/29, nw-25 (Pending), n-30/31, nw-28 (Packing). | Keep the structured set as the Desk density of one language (§1.6). Finish Billed · Out of stock · Stock · Return in the same set; retire the 8 Sep band (R1 clean-up 7). |
| Sale order history | Sale orders tabs Raised · Approved · Dispatched · Cancelled · Returns (f-15, w-8). | Keep. R1 decision 4 (cards only on the phone) still open. |
| Analytics | f-19–21, w-11–13. R1 answer 5: sale managers and above. | Keep; `sale-orders-structured.md` §3 restyles it when the density call lands. |

Three screens in the path exist only as a button, and the one the owner sent a reference for does not exist. Everything
else holds. The flow can be sold once those four are on the board, which is what the drafts do.

### 2.1 The approvals card, checked against the owner's reference and the BRD

What the Miro frame shows and where it lands on the draft (Home › Approvals · sale order card):

| Reference | BRD | Draft |
|---|---|---|
| Customer name, city, agency, agent, customer since | F:46 | Customer block, head |
| Payment score 78 · GR ratio 40 % · Total FY billing · Total pcs | F:47, F:49, F:50 | Standing tiles (pcs moved into the order footer where it means something) |
| Customer score 68 · High / Mid / Low tier appetite 67 · 25 · 8 | F:48, F:54 | Standing tile; one stacked appetite bar with legend |
| Top 30 · Hot tags | DU:9 (informatic pages may show every tag) | Chips under the customer block |
| Order no · design photo · colours with + / − qty · rate | F:51–52 | Lines with photo, stepper, "n in stock" beside each colour (F:52 "+ pcs in stock") |
| Order history with Sale order · Invoice · Return links | — (reference only) | Last three orders, three outline chips |
| Note with this order (Hinglish) | SCH §7 | Verbatim, soft box |
| Orders vs payments graph; broker's billing vs payments | F:55–56 | Two `LineG` charts, accent vs ok |
| Reject · Approve | F:12 | Reject · Hold · Approve; "Mark for inspection → owner" (F:46 escalation) |
| Payment overdue for the account | F:53 | Overdue tile in danger tone |
| Credit line | F:17, owner 13 Oct | Credit bar as a fact, and an "over the credit line" flag in the queue and on the card; never a block at submission. Flagged orders sort first; the card opens with a "Look twice" strip of the flags in words |

Not in the reference, added from the BRD: current order amount and pcs (F:51–52), overdue (F:53), the credit line (F:17),
the escalation (F:46). Not in either, assumed: a Hold action (the BRD has approve and reject only); the drafter's
assumptions are listed in `plans/home.md`.

---

## 3 · The Production entry forms, passed for entry speed

Judged on the web frames nw-5, nw-6, nw-10, nw-22, nw-38, nw-15 and the phone sheets n-5, n-9, n-19, n-38. The coverage
review (9 Sep) proved every field exists; this pass asks how fast an accountant fills it.

| Form | What holds | What slows it |
|---|---|---|
| Purchase order (nw-5, n-4) | Supplier · book · expected · link to a production order · lines with stock beside each · photo from WhatsApp · PM approves | Lives in the pane (§1.5). Rates "money roles" meta repeats on every line. |
| Purchase inward (nw-6, n-5) | The right shape: find a PO, lines pre-filled, received qty is the only typed number, variance in words, the accounts card for money roles with the M:242 fields, supplier snapshot in the pane, "pushed to accounts on approval" | The accounts card shows seven fields at once (terms, freight, additional cost, discount, broker, GST); fold to "Freight · Discount · GST" with "More". Supplier invoice number and date must sit first, before the lines: that is what the accountant copies from the paper. |
| New material (nw-10, n-9) | Name · group · unit · supplier · shades with swatch · reorder level · "one master per shade" | Pane form, twelve fields. Belongs in the Hub as a main-area form (drawn: Hub › New material); Production keeps "+ New material · from the lot" on the inward as the quick door. |
| New production order (nw-22, n-19) | Two numbered steps, qty per colour as the only typed numbers, readiness pane with shortfalls and "raise PO", cost preview for money roles | Five reason chips above the form compete with step 1. Assign-later is right; the tranche editor (30/30/40 and three dates) per process is heavy for a draft order: show it collapsed, "default tranches", open on tap. |
| New sample (nw-38, n-38) | Auto number · category · colours to try · target price or TBD · references · first move optional | Pane form. Move to the main area; the pane shows the moodboard or the last three samples of the category. |
| Process setting (nw-15) | Four numbered steps on one page, the recipe helpers pane, "3 colours × 4 processes = 12 BOMs" | Step 1's product line carries nine chips and two buttons on one row; keep the design number, colours and the status chips, move "Copy recipe from" and "Recipe option" into the pane's Search tab. |

Rule that comes out of it, for every form in the product: **the typed numbers are the form; everything else is pre-filled,
picked, or scanned.** Inward already does this (received qty only). Carry it to Issue (pieces to issue for, n-22 does),
Receive, New order (qty per colour), and the sale order (qty per colour).

---

## 4 · What Sutra should look like

One sentence: **a picture-first ledger.** The cabin side shows the product the way a buyer meets it (photo first, the number
as the head, price in the display face, one maroon line); the desk side shows the business the way an accountant trusts it
(ruled rows, counts in the display face, status as words, money only where allowed). Same canvas, same ink, same type, same
chrome. The split is density, not style.

What this means for the people in the chairs:

- **The fresher at the desk** lands on Home with four numbers and a "needs you" list, not a dashboard of charts. Every list
  is a ruled table with a search field and a Filters ▾ sheet. Enter moves to the next field. The right pane tells them what
  they are looking at (the supplier, the customer, the checklist) so they never leave the form to check.
- **The salesperson in the cabin** sees the grid, two rows of chrome, the cart strip and the island. New customer is three
  fields. Submit is one sheet. The approval answer comes back as a card on Home with the SO number.
- **The semi-skilled worker** gets three island tabs, the orb, pictures to tap, and never a table.
- **The approver** gets one card per decision with every fact the BRD names, and the two actions the BRD names, plus Hold.

Three things to protect: the photo beside every design number (it is the identifier, F:19); one maroon line per screen (the
eye finds the action); money omitted server-side for roles without the right (M:121), so a screen never greys a number.

---

## 5 · Priorities, as a PM would set them

**P0 · sell the flow (this sprint).** Without these the demo has holes.
1. Home › Approvals: queue, sale-order card, over-the-line variant, sale-return card. *Drawn.*
2. Catalogue: new cart, new customer, submit, sent state, the order in the queue with Edit and Delete. *Drawn.*
3. Hub: new product master, upload centre with the per-colour checklist and the no-photo queue, xlsx import. *Drawn.*
4. Home landing per role (what the fresher sees first). *Drawn (sale executive).*
5. The phone header: three rows everywhere, two inside the catalogue grid. *Drawn for compare.*

**P1 · one product, not two (next sprint).**
6. Decide the density rule (§1.6); restyle Sale orders and Analytics per `sale-orders-structured.md`; finish the Dispatch
   structured set (Billed · Out of stock · Stock · Return · packer phone); retire the 8 Sep Dispatch band and `DShell`.
7. Web header: six sub-menu buttons max; regroup Production; search never below 180 px.
8. Forms with more than four fields take the main area: New PO, New material, New sample move; inward's accounts card folds.
9. Island per role (three to four tabs).
10. Status as outlined words; colour for danger and warn only.

**P2 · later.**
11. Control-row budget of two on every web screen, applied as modules are revisited.
12. Sale orders on the phone: cards only (R1 decision 4, still open).
13. Gate pass hub (drawn small), Notifications feed, user menu and login (R1 gaps 5).
14. Report builder and Master views beyond the shell (M §1–2) once the Hub forms are agreed.

---

## 6 · Decisions for the owner

Answer by number. Each one changes what the next session draws or retires. The board frames are named by caption; ids are in
`plans/home.md`, `plans/hub.md`, `plans/review-2-sell-flow.md`.

1. **Phone header.** Three rows on every module and two inside the catalogue grid (proposed), three everywhere, or keep four?
   Compare: Catalogue · sell flow › "Grid · three-row header" and "Grid · two-row header" against the final f-1.
2. **Island per role.** Show only the role's modules, at most four tabs plus More and the orb?
3. **Web header.** Cap at six sub-menu buttons; Production regrouped as Purchase ▾ · Materials ▾ · Recipes · Orders ▾ (with
   Job cards) · Samples · More ▾ (Costing, Karigars)?
4. **Forms.** A form with more than four fields takes the main area, the pane helps. New PO, New material and New sample move
   out of the pane; New material lives in the Hub with a quick door from the inward?
5. **One language, two densities.** Cabin and Desk on the same tokens and chrome; the structured Dispatch look becomes the
   Desk density for Dispatch, Production tables, Pending books, Hub lists, Reports and the Approvals queue; status as outlined
   words, colour for danger and warn only? (If no: pick one of the two looks for the whole product.)
6. **Approvals in one place.** Every approval is a card on Home › Approvals with the BRD's facts; the sale order page shows
   the state and a link, its own Approve button goes?
7. **The approval card itself.** Keep Hold as a third action? Keep the two charts on the phone card (long scroll) or move them
   behind a "Graphs" tab? Who may clear an "over the credit line" flag in the queue: admin only (F:17) or sub-admin too (F:29)?
8. **New customer from the cart.** Name, phone, city only (B:82); broker, agency, GST and credit days later in the Hub?
9. **Submit.** Due days as chips 10 · 20 · 30 · custom (default 20, F:12), priority 1–5 (default 3, B:90) and the note for
   approval on the submit sheet; no credit check and nothing that blocks (owner, 13 Oct); Edit and Delete on the order while it
   is in the queue?
10. **Product master.** Created in the Hub (M:5), with "Save and set recipe" opening Production › Process setting pre-filled,
    and "Save and add photos" opening the Upload centre; price TBD until costing (F:103)? Or created inside Process setting
    step 1 as the Production team does today?
11. **Upload centre slots.** Primary per colour · side profiles × 4 · AI shoot · real-world shoot · video (F:66–71) as the
    checklist, with the primary image settable (F:21)? Phone capture per colour as drawn?
12. **xlsx import.** Admin-only commit after a dry run (M:106), eight masters, products & SKUs first?
13. **Inward form.** Supplier invoice number and date first; accounts card folded to Freight · Discount · GST with More?
14. **New order.** Tranches collapsed to "default 30 / 30 / 40" per process, opened on tap?

---

## 7 · Execution, staged

Each decision maps to one session that a lower-cost model can run from a brief; the briefs are queued as task cards after
the owner answers, one per decision, so they start with one click. The judgment stays here: every session's screenshots
come back to this review before anything is marked final.

| Session | Needs | Does |
|---|---|---|
| A · Phone header | D1 | Apply the chosen header to `T.Header` in `final.jsx` (every phone final inherits it), re-render the sampler, fix clipping on every module |
| B · Island per role | D2 | Add a role prop to `T.Island`; draw packer, sale executive, production hand variants on Home |
| C · Web header cap | D3 | Regroup `PROD_SEG`, add the search minimum, re-render Production |
| D · Forms to the main area | D4, D13, D14 | Redraw New PO, New material (Hub), New sample; fold the inward accounts card; collapse tranches |
| E · Density rule | D5 | Write SCH §9; restyle Sale orders and Analytics; finish Dispatch structured; retire the 8 Sep band and `DShell` |
| F · Approvals | D6, D7 | Finalise the Home drafts; remove Approve from the SO page; link the SO state to the card |
| G · Sell-flow sheets | D8, D9 | Finalise new cart, new customer, submit, sent; add the web pane states to the Carts final |
| H · Hub masters | D10–D12 | Finalise new product, upload centre, import; link Process setting step 1 to the Hub form |

Sign-off follows `references/board.md`: finals appended, drafts registration removed, never reordered.

---

## 8 · Logged for the BRD (not in it today)

Appended to `design/during-ui-business-requirements.md` under 13 Oct: the user profile; the two densities; the header
budgets (three rows phone, six buttons web, two control rows); the forms rule (typed numbers are the form; more than four
fields takes the main area); Hold as an approval action and the escalation path; new customer's three required fields;
submit sheet contents and the no-block rule; the upload-centre slot list and the no-photo queue; import admin-only commit.
