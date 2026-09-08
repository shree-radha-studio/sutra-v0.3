# CRM — plan (8 Sep 2026)

Built from `design-system/research/brd-final.txt` lines 91–101 (the CRM section) and the keyword sweep of every BRD
text (crm, customer, dossier, follow, payment, journey, broker, agency, whatsapp, score, tier, overdue, recommended,
share, logo, video, photoshoot), the role lines (F:26–39), the chips guideline
(`design-system/guidelines/chips-filters-sorts.md` §3C), the screen inventory and `design/SUTRA-SCREEN-FLOW.md`,
plus the owner's brief of 8 Sep (section 6). The Pinterest reference the owner sent counts only for the step-journey
strip along the top of the follow-up and payments screens; everything else is our own reading of the intent.

Sources are cited as F:line (brd-final), M:line (brd-masters), B:line (Business Req, the older BRD), C:line
(chips guideline), O (owner's brief, 8 Sep).

## 0. Shape of the module

- Two terminals and one follow-up engine, all web-first (the CRM desk), with the phone as the outreach device
  (WhatsApp lives there, F:8). Laptop screens are the primary drawings; the phone carries the same three jobs in a
  narrower frame.
- **The engine**: preset customer lists (owner-defined filters + sorts, F:96 "lists wise, which are pre-settable")
  × journeys (a chain of steps, F:96 "chaining steps together, like Mailchimp"). A customer sits on a step of a
  journey; the user works a list step by step and moves customers along (done → next step, snooze 14/30 d, skip,
  note). The step strip along the top is the map: one pill per step with its count, the current step filled.
- **The share terminal** (F:93–94, O): entered from a list or a step. Left pane = the customer (identity, scores,
  tags, taste, purchase and comms history); main = two 3 × 4 picture grids (Recommended · Catalogue), each with its
  own sort & filter opening the same sheet; right pane = the packet (selection, export and share options). Photos are
  selected like a phone gallery: tap to tick, ticks stack in the right pane.
- **Payments follow-up** (F:96–101): the same engine over bills instead of customers. Stages Payment due →
  Overdue → Issue → Escalate → RED as the strip; bills under each stage; a customer can sit in several stages at once
  (F:96) and clears bills by number from any stage; snooze never moves a bill (C:161); brokers and agencies get a
  weekly report per section (F:96–98).
- Money: bill amounts, outstanding and credit utilisation for Sale manager, accounts (sub-admin) and admin (F:31,
  F:12); Sale executive sees follow-ups and the share terminal with catalogue prices (customer-facing prices are
  allowed in the catalogue, F:62) but no outstanding. Drawings are the Sale manager's view; the executive's phone
  variant only drops the ₹ rows and is not drawn separately.
- Roles (F:31–33): Sale manager and Sale executive work Follow-ups and Share; Payments is worked by accounts
  (sub-admin) with the Sale manager reading; Admin sees the Escalate and RED stages as their own list (F:100).

## 1. Sub-menus (top bar v2 order)

1. Follow-ups (F:95) — journeys and lists; the engine. Default node.
2. Share (F:93–94, B:117) — the share & export terminal for a customer (or a list, one customer at a time).
3. Payments (F:96–101) — the bill journey.
4. Customers (M:56–58, M:79–92) — the customer list and dossier (the "complete history" button lands here, F:93).
5. Journeys (F:96 "full journey making and customizing options … mind-map style flow of nodes") — the builder.

Phone: the same five as the node scroller under the search island, opening on Follow-ups.

## 2. Screens in flow order

Format per line: purpose · who · web right pane · phone floats/sheets · money · links.

### 2.1 Follow-ups

**W1 Follow-ups · board** — list chooser (Today's to-do · Refill due · What worked · New samples showcase · Cold
revival · Hot · saved lists, F:8, B:115, C:145) as the display-face scroller; the journey strip across the top (Reach
out → Showcase → Order → Confirm → Done, with counts, current step filled, overdue count in danger); under it the
customers on the current step as cards (name, city · market, tier, Hot/Warm/Cold dot, next-action pill Overdue /
Today / Snoozed, last-contact channel, attached-products count, one score gauge; C:141, C:159). Sort & filter button
opens the sheet · Sale manager, Sale executive · right pane: the selected customer's step (script or template,
channels, attached products, outcome, Done → next, Snooze, Skip) · — · no ₹ · Share → W3, dossier → W9.

**W2 Follow-ups · step opened, history tab** — the same board with the pane on a customer whose step is being
completed: template text, a Call and a WhatsApp chip, attached products strip, outcome chips (Reached · No answer ·
Asked to call later · Not interested), note field, the comms history under it (F:95 "messages recorded for
next-time") · same · pane · — · — · Share.

**P1 Follow-ups · today** — search island, node scroller (Follow-ups · Share · Payments · Customers · Journeys),
list scroller, the step strip (scrolls sideways), customer cards in one column, sort & filter sheet · everyone ·
— · P2 · — · P3.

**P2 Follow-ups · step sheet** — the card's step as a sheet: template, Call / WhatsApp, attached products, outcome,
note, Done → next / Snooze / Skip · same · — · sheet over P1 · — · Share → P3.

### 2.2 Share

**W3 Share · terminal** — left pane 300: customer head (name, city · market, tier, scores as small gauges: customer,
payment, GR ratio; F:47–49), the tags row (Hot/Warm/Cold, segment, taste bars High / Mid / Low %, preferred price
bands, preferred colours as swatches, categories; C:148, F:54), purchase history strip (last 6 designs with pcs bought
/ returned, "Full history" → W9) and the comms history (last messages and packets). Main: two 3 × 4 grids stacked,
"Recommended · 12 of 48" and "Catalogue · 12 of 612", each with a Sort & filter button and a sort caret; tiles are
pure photos with one veiled info line at the foot (design no · price · one match-reason chip, C:151), no card chrome,
6 px gutters so it reads as a picture picker; selected tiles carry a tick disc and a thin accent ring, like the
iPhone gallery. Right pane 340: the packet — count and value, selected tiles as thumbnails in a scrolling grid with a
remove ✗ each, then the option groups (2.2 options), then Verify against stock and Send · Sale manager, Sale
executive · right pane = the packet · — · catalogue prices only · logo tool → W5, options → W4.

**W3b Share · Purchased grid (added 8 Sep, late)** — the BRD's first grid (F:93): the customer's own bought designs
as a 6 × 2 picture grid above the two pickers, each tile carrying pcs bought and pcs returned; a 30 d · 90 d ·
Lifetime time frame that is remembered per customer ("saved"), quick chips Repeat · Returned · In stock, sort Last
bought, its own Sort & filter. Phone: a Purchased tab beside Recommended and Catalogue with the same time frame row.

**W3c Share · customer pane tabs (added 8 Sep, late)** — the left pane has Info · Packets · Orders. Packets = the
packet history (date, designs, thumbnails, sent to, template, logo, result opened / replied / ordered / no reply,
Re-send, Add to packet). Orders = the sale-order history (order no, status, ₹ for manager roles, date · pcs · paid /
awaiting approval, quick chips All · Open · Dispatched · Returns, orders vs payments sparkline). The phone dossier
carries the same three tabs first.

**W4 Share · sort & filter sheet open on a grid** — the same sheet as the catalogue (C:154 "identical to Catalogue
plus a customer-context group": Bought before · Never bought · Price match · Colour match · State match), opened
from the Recommended grid's button as a floating card anchored over that grid; the other grid keeps its own state ·
same · packet pane · — · — · —.

**W5 Share · packet options** — the right pane expanded into a composer over the main window (a sheet 640 wide):
Send to (the customer's WhatsApp group, a named contact, both; memory from the customer master, F:94), Pictures
(product photos · photoshoot pictures · both), Video (none · product video · video with logo), Logo (none · place
logo · position → W6), Message (template chips: New arrivals · Refill · Follow-up on samples; the text with
placeholders), Verify against stock (✓ / ✗ / n left per tile, C:157), Remove products, Back and edit, Export
(download zip · PDF sheet · share link) and Send · same · — · — · — · W6.

**W6 Share · logo placement** — a new frame: the picture large in the centre with the logo on it (draggable, corner
snaps), a thumbnail rail of every selected picture at the foot (the current one ringed, done ones ticked), controls
on the right: position (nine-point grid), size, opacity, light / dark logo, margin; Apply to this picture · Apply to
all · Reset; Done back to W5 · same · — · — · — · —.

**P3 Share · customer + grids** — the customer head as a compact card (name, tier, scores, taste bars, tags, last
purchases strip), then the two grids as tabs (Recommended · Catalogue) so the picker keeps 3 columns; a selection
tray island above the main island (n selected · value · Options) · same · — · P4 · — · —.

**P4 Share · packet sheet** — the selection as thumbnails, the option groups compressed to segmented rows, Verify,
Send · same · — · sheet over P3 · — · P5.

**P5 Share · logo placement** — the picture full-bleed, logo draggable with corner snaps, size and opacity sliders in
a tray, thumbnail rail, Apply to all · same · — · — · — · —.

### 2.3 Payments

**W7 Payments · journey** — the stage strip across the top (Payment due · Overdue · Issue · Escalate · RED) with count
and outstanding ₹ per stage, current stage filled; list chooser (All bills · Mine · Platinum · Agency: Shubham
Marketing · saved lists); bills of the current stage as rows grouped by customer (bill no, date, due date, days
overdue with the warn → danger ramp, amount, broker, snoozed pill, call chip, WhatsApp chip; C:161); "Weekly broker
report · sent Mon 08:00 · next Mon" strip · accounts, Sale manager · right pane: the customer at this stage (payment
score, credit line bar, bills across stages, last payment, broker and agency, call and message, Log payment, Snooze
14 / 30 d) · — · ₹ for manager roles · dossier → W9.

**W8b Payments · broker & agency report** — the Broker / agency tab: one row per agency (brokers, customers, outstanding
split due · overdue · issue as a bar, last sent, delivered / read), filters Agencies · Brokers · With overdue; right
pane = the report preview for the picked agency (sections Payment due · Overdue · Issue with bill rows, total,
section toggles, PDF, Pause, Send now); schedule Mondays 08:00 (F:96–98 "sent their automated reports … weekly with
each of these sections differently") · accounts, Sale manager · pane · not on phone · ₹ · —.

**W8 Payments · customer across stages** — the pane on a customer with bills in three stages at once; a bill being
cleared by number ("SI-2240 · ₹39,955 · received 05/09 · UTR") and the stage it leaves; the message log with the
automated weekly reminder marked "auto" · same · pane · — · ₹ · —.

**P6 Payments · stages** — node scroller, the stage strip, bill rows grouped by customer, call chips · accounts on
the move · — · P7 · ₹ for manager roles · —.

**P7 Payments · bill sheet** — the bill: customer, amount, days overdue, broker, actions (Call, WhatsApp, Log
payment, Snooze 14 / 30, Escalate) · same · — · sheet over P6 · ₹ · —.

### 2.4 Customers

**W9 Customers · list with dossier pane** — the list opens sorted by follow-up due (M:56): name with follow-up dot
and DIRECT badge, Call, city / market, tier, score gauge, engagement, open book pcs, book ₹, last order, FY billing,
growth Δ %, orders, broker / agency, tags (M:57); quick chips Follow-up today · Overdue · Hot · Warm · Cold · Mine
(C:142); right pane = the dossier strip (scores, taste, price bands, colours, credit bar, bills by stage, recent
purchases with "Full history" opening the dossier tabs Overview · Orders & book · Invoices & payments · Shipments ·
Returns & credit notes · Purchase grid · Growth, M:86) · Sale manager (₹), Sale executive (no ₹) · pane · — · ₹ for
manager roles · Share → W3, Follow-ups → W1.

**P8 Customer dossier** — the strip as a page: head, scores, taste, tags, credit bar, bills by stage, purchases grid,
comms history; Share and Follow up buttons in a glass tray · everyone · — · — · ₹ for manager roles · P3.

### 2.5 Journeys

**W10 Journey builder** — the mind-map: nodes for Trigger (dispatch confirmed / list entry / manual), Step (message
template, channel, wait n days, owner), Branch (paid? / reached?), Snooze, End; the default payment journey drawn
(due → 30 d → overdue message weekly → 30 d → issue: two calls a week + broker call weekly → 14 d → escalate to admin
→ 15 d → RED); right pane = the selected node's settings (template, channel, wait, who, automation on/off) ·
Sale manager, admin · pane · not on phone (desk-only; the phone reads journeys, it does not build them) · — · —.

## 3. Found elsewhere in the BRD

- F:8 — "outreach to customers on customer groups about what previous ordered designs worked for them, what they
  need to refill, what they need in general, and new sample showcasing" → the seeded lists: What worked · Refill
  due · New samples showcase; and the customer's WhatsApp group as the default send-to.
- F:13 — the follow-up cadence: "message on the customer whatsapp group on 30th day, call after 1 week, per week
  calls till 1 month, then 2 times a week till two more weeks, then escalate to broking agency and founder/admin"
  → the default payment journey in W10 and the stage waits in W7.
- F:17 — "Credit Line … Any sale order after this limit is to be blocked" → the credit-line bar in the customer
  pane and dossier; a Credit blocked pill on the list (C:141).
- F:11–12 — brokers and agencies guarantee credit; approvals check the broker's overdue → broker and agency on
  every bill row and in the weekly report strip.
- F:47–56 — the approval card's customer facts (payment score, customer score, GR ratio, FY billing, overdue,
  high / mid / low tier appetite ratios, orders vs payments graph) → the same facts are the customer pane in W3 and
  the dossier strip in W9.
- F:272–274 — Reports › Payments: "Sale Invoice Pending Payments (with overdue filter) customerwise and sale orders
  wise · Payments to Brokers · Overdue Metrics and Customer Level follow up info" → W7's Bills / Customers views
  and the report link; the report tables themselves belong to Hub.
- M:56–58 — the customers list "opens sorted by follow-up due", columns and filters → W9.
- M:79–92 — dossier tabs per master; Customer: Overview · Orders & book · Invoices & payments · Shipments ·
  Returns & credit notes · Purchase grid · Growth → W9 pane and P8.
- M:246–249, M:305 — "WhatsApp share packet … needs a row-selection UI on the result table, which was never
  built" → the Hub report table reuses W5's composer; noted, not drawn.
- B:115–117 — "colour coded follow up system where each tier of parties can be set for different frequencies of
  follow ups, and the 'Today's To-do' tab"; "download a packet of selected images … Make basic easy logo putting
  and placement options per share"; desktop reference SS32 → tier frequency as a journey setting (W10), Today's
  to-do as the default list, W5/W6.
- C:141–161 — the chip budgets for CRM rows, the three grids, the composer's verify chips, the follow-up and
  payments hard tabs and sorts; the rule "snooze never changes days overdue or stage".

## 4. Open questions

1. Follow-up journeys are per list or per customer? Drawn: a list has a default journey; a customer can be moved to
   another journey from the pane.
2. Does a step complete per customer or per contact attempt? Drawn: per customer; attempts are logged under the
   step.
3. Who owns a customer's follow-up: the assigned executive (M:58 "Mine") or whoever picks the list? Drawn: the
   assigned executive, Mine as a quick chip.
4. Photoshoot pictures and videos come from Studio; if a design has none, the option is greyed with "no photoshoot
   yet" (drawn that way).
5. Payment RED "hard approach list" (F:101): is it a list in Payments or a Home › Approvals item for the admin?
   Drawn as the RED stage with an admin owner.
6. Which roles see ₹ on the phone in Payments? Assumed manager roles only (memory rule).

## 5. Screen count

Web 14 (W1–W10 plus W3b's grid on W3, W3c as two screens, W8b), phone 10 (P1–P8 with the Share screen drawn on all
three grids), each in light and dark = 48 frames. The module opens on its own page, `board.html?m=crm`; ids count within that page (phone n-1…54, web nw-1…47, nd-/nwd-
for dark) and no longer shift. Single frame: `board.html?m=crm&only=nw-10&z=0.8`. Components new to the board: the step
strip (`StepStrip`), the picker tile (`PickTile`), thumb (`PickThumb`) and grid (`PickGrid`), the customer pane
(`CustPane`) and its phone head (`CustHead`), the queue strip (`QueueStrip`), the packet pane (`PacketPane`), the
composer (`Composer`), the logo tool (`LogoStage`, `LogoControls`, `LogoRail`), follow-up card and step pane
(`FollowCard`, `StepWork`), bill rows and the customer-at-stage pane (`BillRow`, `PayPane`), the journey map
(`JNode`, `JMap`), the score ring (`Gauge`), taste bars (`Taste`), credit bar (`CreditBar`).

## 6. From the owner's brief (8 Sep), not in any BRD

- The share terminal has two grids, not three: the customer's own purchases move into the left pane as history.
- Grids are 3 × 4 photos with one product line over the image (never a separate caption), close together, "a
  picture selection screen, not a product card selection screen"; selection works like the iPhone gallery.
- Both grids have their own filters and sorts, opening the same pop-up.
- Share options named: place logo · send with video · send photoshoot pictures · send without logo · send a video
  with logo; grouped in the composer, plus a logo placement tool in its own frame that positions the logo per picture.
- The customer info panel must show the tags, categories and price ranges the customer buys, and the purchase
  history, in one view together with the recommendation grid, the pick-your-own grid and the export options.
- The follow-up engine works preset lists of customers by journey and step; the user "sits on" a step and moves
  customers through; the top step strip is the one element taken from the reference.
- Payments follow-up uses the same step strip.

## 7. Coverage audit (8 Sep, after drawing)

Every BRD line for CRM checked against the drawings. ✓ covered · ± partly · ✗ not drawn.

| Source | Requirement | State | Where |
|---|---|---|---|
| F:93 | Main terminal: customer lists, tagging and filtering on the customer side and the product side | ✓ | Follow-ups list chooser and sort & filter; Share grids' sheet with the customer-context group |
| F:93 | Select a customer on a left pane through filters or lists | ± | Entry is from a list or step; the queue strip (previous / next / search) switches customers inside Share. A customer picker as a full left-pane list is not drawn |
| F:93 | Customer infos, tags, scores, recent purchase history with a button to complete history | ✓ | CustPane, Full history → Customers |
| F:93 | Quick sub-module buttons | ✓ | top bar v2 sub-menu; phone node scroller |
| F:93 | Grid of own bought products with time frame, per-customer default memory, filtering, pcs bought and returned | ✓ | Purchased grid above the pickers (6 × 2, pcs bought / returned on the tile, 30 d · 90 d · Lifetime saved per customer, Repeat · Returned · In stock, sort, filter); phone Purchased tab |
| F:93 | Recommended grid with filtering and filter-set saving | ✓ | Recommended grid, sheet with Save view |
| F:93 | Total catalogue grid with sorting and filtering | ✓ | Catalogue grid |
| F:93 | Select mode across grids, even after filters | ✓ | Select mode chip, gallery selection, selection kept across the sheet |
| F:94 | Packet pop-up with channels and memory of who to send to | ✓ | Composer › Send to |
| F:94 | With / without logo, with / without / only video, logo re-positioning | ✓ | Composer › Logo, Video; logo placement screen |
| F:94 | Send-with message and templates | ✓ | Composer › Message |
| F:94 | Remove certain products, go back and edit | ✓ | ✗ on thumbs, Back and edit |
| F:94 | Verify packet against stock in one go | ✓ | Verify against stock (✓ / ✗ / n left) |
| F:95 | Follow-up terminal and journey tracking with messages recorded for next time | ✓ | Step pane history, note for next time |
| F:95 | Customisable customer-wise, product attachments, journey-wise | ✓ | journey ▾ per customer, attached designs |
| F:96 | Payments: 4-step journey, editable and addable steps | ✓ | Stage strip (5 stages), journey builder |
| F:96 | Lists pre-settable with filters and sorts; track customers list-wise and step-wise | ✓ | Payments list chooser, stage strip, Customers tab (tab only) |
| F:96 | Journey builder with rules, chaining, mind-map | ✓ | Journeys |
| F:96 | Automated WhatsApp steps with templates | ✓ | "auto" marks, step automation On / Off |
| F:96 | Customers added trigger-wise, removed when the bill clears; several stages at once; clear by bill number | ✓ | Bill cleared screen |
| F:96 | Snooze per step (14 / 30 d) | ✓ | Snooze on both engines |
| F:96–98 | Weekly broker and agency reports per section | ✓ | Broker / agency screen and report preview |
| F:97 | Payment due message with due date, bill reference, pdf | ✓ | Message log |
| F:98 | Overdue: call with all customer details and scores; weekly reminder | ✓ | PayPane |
| F:99–101 | Issue, Escalate, RED cadences | ✓ | Stages and the journey's waits; RED as a stage (open question 5) |
| B:115 | Colour-coded follow-up by tier frequency; Today's to-do | ✓ | Heat dot, tier frequency card in Journeys, Today's to-do list |
| B:117 | Download packet, easy logo placement | ✓ | Export group, logo screen |
| M:56–58 | Customers list columns and sort by follow-up due | ✓ | Customers |
| M:86 | Dossier tabs | ± | Tab row drawn on the phone dossier; only Overview content drawn |
| C:141–161 | Chip budgets, hard tabs, snooze rule | ✓ | as specified |
| Screen-flow | Share packets sub-menu (packet history) | ✓ | Packets tab of the customer pane (owner's call, 8 Sep late); sale-order history as the Orders tab beside it |

Adjustments made after the audit: the queue strip on Share (web and phone), the journey ▾ chip in the step pane, the
new Payments › Broker / agency screen, then on the owner's word the Purchased grid (BRD grid 1) and the Packets and
Orders tabs on the customer pane. Screens still worth adding if the owner agrees: the Payments Bills and Customers
tabs as their own screens, the Customers picker as a left-pane list inside Share, and the Sale executive's no-₹ phone
variants.

## 8. Every tab, sub-menu and button, on both devices (9 Sep)

The owner asked for every web view to exist on the phone and for every tab, sub-menu and button activity to be
drawn. The module now has 47 web and 54 phone screens (light and dark each), registered in flow order per sub-menu
from `mod-crm-phone.jsx`; ids on the module page: phone n-1…54, web nw-1…47. What each interactive element opens:

| Sub-menu | Tabs and buttons | Screen (web · phone) |
|---|---|---|
| Follow-ups | Journey board · Today · History tabs | board · Today tab · History tab |
| | list chooser "+" | new saved list sheet |
| | sort & filter | customers sort & filter (assignment, geography, quality, taste, activity, credit) |
| | step pane: pencil, Snooze, Skip, Done → next | edit message · snooze menu · (skip is a confirm toast on Done) · done, next customer |
| | WhatsApp group / Call / Share / + | sent state on Share · call is the phone's dialler · Share terminal · picture picker = Share grids |
| Share | queue strip ‹ › and search | customer picker |
| | customer pane tabs | Info · Packets · Orders |
| | grid sort caret, Sort & filter | sort menu · sort & filter sheet |
| | picture tap (long press on the phone) | picture viewer with in-packet toggle |
| | Verify stock | verified grid and tray |
| | packet rows, Send | composer · sent |
| | composer: + Contact, Export, Place logo, Position per picture | send to · export · place logo · logo on all pictures |
| Payments | Journey map · Bills · Customers · Broker / agency tabs | journey map · Bills · Customers · Broker / agency |
| | sort & filter | bills sort & filter (stage, bill, customer risk, follow-up task, automation, broker) |
| | pane: Snooze, Escalate, Log payment | snooze · escalate · log payment · bill cleared |
| | report: Preview, Schedule, PDF, Pause, Send now | report preview · schedule (PDF, Pause, Send now are actions on the preview) |
| Customers | search chips, sort & filter, columns | list · sort & filter · column chooser (fields on the phone) |
| | dossier tabs | Info · Packets · Orders · Invoices & payments · Shipments · Returns & credit notes · Growth |
| | Follow up, Share | start a follow-up sheet · Share terminal |
| Journeys | journey tabs | Payments map · Refill customer journey (New samples, Cold revival, Sale order share the layout) |
| | node tap, toolbar drop, New journey, Test, Publish | step settings · adding a step · new journey · test run · publish |

Not drawn as separate frames because they are system or trivial: the phone dialler on Call, the "Add to packet"
increment on the Packets tab, Clear on the packet pane (a confirm toast), Reset on the logo tool, Discard / Remove
confirms (a toast), the Cold revival, New samples and Sale order journey maps (same layout as Refill).
