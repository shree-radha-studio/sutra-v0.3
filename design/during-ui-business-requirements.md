# During-UI business requirements

Things the owner said, or that surfaced while drawing mockups, that are not already in the BRDs
(`design-system/research/brd-*.txt`) and are not design-language decisions. Append; do not build. Each line names
the screen it came from so the BRD can absorb it later. Newest at the bottom.

## 8 Sep 2026 · Catalogue tag system (chips, sort & filter, salesperson tag rail)

- Card chip budget is a business rule, not a styling choice: one recommendation chip and one stock state per card,
  otherwise nobody reads them. Informatic pages (product page, dossiers, approval cards) may show every tag.
- Customer mode hides system tags, stock and the saved lists; only promotional badges and price remain. The
  salesperson keeps their own cart and role label while the customer looks on.
- The sale manager sets promotional badges (Trending, Bestseller, Low stock, Staff pick, Clearance) from the
  salesperson view ("Customer sees" strip). They never feed any calculation.
- Every recommendation chip must answer "why?" on tap with the inputs that produced it, per colour, plus when it was
  calculated and which rule version. The owner judges timing; the system explains, it does not decide.
- Quick-chip rows are role defaults: sale executives see In stock · New · High growth · Priority sale · Discounted;
  sale managers may pin Priority production and Restock. Admin decides per role.
- "Discounted" needs a discount that can be set per design or per colour, with an owner for it (old BRD: from the
  Priority Sale review). Not in the new BRD yet.
- Customer Score formula proposed by the owner: 30 % payment score, 30 % total billing, 25 % goods-return ratio
  (inverse), 15 % initial market rating. Bands Low 1–30 · Medium 30–60 · High 60–100. Payment score formula itself is
  still undefined.

## 8 Sep 2026 · Production module (owner's brief, plans/production.md §6)

- Production order and production lifecycle are one sub-menu ("Orders") with two views; the order form and the
  per-order lifecycle terminal share the head.
- Job cards are a project-management board over every job of every active order: cards, swimlanes by journey
  state, table, Gantt and calendar views, with the BRD's scope tabs (Active · Delayed · Upcoming · Stuck · Priority
  production · Restock · Finished) and saved views.
- Dye ledger (from the "Dye" sheet of the Busy Wireframe workbook): undyed fabric is issued to a dyer in bulk with no
  colour (5,000 m mono net); a cut order commissions a shade for a design or production order (200 m → shade C04);
  only the dyed lot comes back and becomes a dye WIP that is a material in any recipe; the ledger keeps the dyer's
  balance (4,800 m). Dye WIPs must be pickable in Process setting and addable after a production has started with
  another process. Single-time issue-and-order and bulk issue are separate forms; receive is against a cut order or a
  single order; shortfall is process loss, rejection is separate.
- Sampling is its own sub-menu: a temporary design number moves through any process, colour, karigar and material
  in any order and quantity without a recipe; every move is an issue with its receive; a finalise action turns the
  sample into a product master and imports the derived process sequence and averages into Process setting, editable
  before saving.
- Material catalogue: a picture-first list of materials and shades with metadata (group, unit, stock, on order,
  supplier, source, last inward), default-sorted by inward date, also the right pane of Process setting and the
  picker in Samples.
- Money rule assumed for the drawings: job rates, material rates and costing for Production manager, merchandiser
  and admin; nothing on the floor phone (warehouse executive issues and receives without ₹).

## 8 Sep 2026 · CRM module (owner's brief, plans/crm.md §6)

- The Sales CRM terminal (F:93) is drawn as two picture grids (Recommended · Catalogue), not three: the customer's
  own purchases are history in the customer pane, with pcs bought and returned per design and a "Full history"
  link to the dossier.
- Picker grids are 3 × 4 photos with one product line laid over the image (design no · price · one match reason),
  tight gutters, no card chrome; selection behaves like the phone gallery (tap to tick, ticks stack in the packet
  pane). Each grid has its own sort & filter, both open the same sheet as the catalogue with the customer-context
  group added.
- Share options, grouped: Send to (customer's WhatsApp group · a contact · both; remembered per customer) ·
  Pictures (product · photoshoot · both) · Video (none · product video · video with logo) · Logo (none · place logo
  · position per picture) · Message (templates with placeholders) · Verify against stock · Remove · Back and edit ·
  Export (zip · PDF sheet · link) · Send. Logo placement is its own screen: per picture, nine-point position, size,
  opacity, light/dark mark, apply to this or all.
- The follow-up engine is preset customer lists × journeys of steps; the user sits on a step, works the customers
  on it and moves them (Done → next, Snooze 14/30 d, Skip, Note). Seeded lists from F:8 and B:115: Today's to-do ·
  Refill due · What worked · New samples showcase · Cold revival · Hot.
- Payments follow-up uses the same step strip over the BRD's stages (Payment due · Overdue · Issue · Escalate ·
  RED); a bill clears by number from any stage; snooze never moves a bill.
- Money rule assumed for the drawings: outstanding, bill amounts and credit utilisation for Sale manager, accounts
  and admin; Sale executive sees catalogue prices only.

## 8 Sep 2026 · Studio › AI Designer "Stitch" (owner's brief, plans/studio-designer.md §6–7)

- Version-1 scope decided at product level: a context + template image generator built fully, one zone edit
  (drop a material / colour / work on a zone, regenerate it, four variations; drape is a whole-garment re-render
  option), and a truthful memory panel. No pattern/3D tool, no web collection, no proactive proposals in v1.
  Written up in `design/brd-studio-ai-designer.md` §1.7.
- The context selector picks from Samples as well as Products, Materials and WIP (the chips guideline C:224 had
  no Samples tab); every tab has quick chips, the shared sort & filter sheet and sorts; up to 8 picks, one Main.
- Two template kinds: the output template (format: cuts grid, numbered design sheet, flat lay, colourways,
  sketch, close-up of work, on-model preview, material into inspiration) and the grid template (cells: 4×3, 5×4,
  3×2, 2×3, single). One-click chips preset both. Seeded templates plain, personal starred (same rule as reports).
- Moodboard is Mine · Stitch's (the guideline C:225 had All · Pinned · Auto-scraped · Uploaded · Used): Mine holds
  uploads, links, WhatsApp share-ins and Stitch's marked enrichments with a one-click "Only my uploads & links"
  switch; Stitch's is grouped by track / task with Replenish (v1 from the firm's own pictures).
- Memory is a sub-menu: Sessions (what was sent, what came of it), What works (Stitch designs → samples →
  activated → read → demand score → pcs → returns; rows, not conclusions; a reading only with ≥ 5 finished rows),
  Settings (context sources, sales-data fields and default, retention, forget, share-in number).
- Every render carries "AI render · not a fit sample". Stitch never creates a product; Save as sample creates a
  temporary design number in Production › Samples › In designing with the sketch, references and notes pre-filled.
- Roles assumed for the drawings: admin and sub-admin edit; production manager and merchandiser view + save as
  sample; office manager views; ₹ (sold ₹ in metadata, target price, cost) only for money roles; usage cost admin
  only. The BRD has no design-team role yet (open question).
- Sharing from Stitch reuses the CRM WhatsApp packet; no second share flow.
- Late on 8 Sep the owner restored the BRD's purchase grid as a third grid on the Share terminal (above the two
  pickers, with the per-customer remembered time frame) and asked for packet history and sale-order history as tabs
  on the customer info pane (Info · Packets · Orders).


## 9 Sep 2026 · Studio > Stitch (owner's go messages of 8 Sep 17:45 and 17:48, recovered from the transcript; plan section 12)

- Tracks are per-category memory (one track per product category; threads inside a track). Stitch's learning is
  kept per category.
- RL feedback is captured explicitly: thumbs up and down on sets and tiles and the pick of a grid cell on web; pick of
  a grid cell and a swipe approval screen (right keep, left discard, up save) on phone.
- The tuner's tabs are fixed (Templates, Workflow, Models, Usage, Memory) and the pane state is stored per thread
  and restored on the designer's choice; editing tools never move between sessions.
- Generations are kept in a History sub-menu; from it a picture is shareable externally (WhatsApp packet, export) or
  used internally as the "Design Content" picture of a new product master or a new material master.
- A Settings sub-menu holds the model picker per template (text, image, video), defaults, usage and cost (admin
  only); Memory > Settings moves there.
- Phone carries every web option; only the right designer pane becomes a button and a half-height slide-up sheet
  with the picture still visible for editing.
- 9 Sep: the chat UI and the Studio UX are modular blocks (chat column, canvas, pane, version strip, context tray,
  tuner, swipe card) reused unchanged across Studio screens and across web and phone.

## 9 Sep 2026 · Production module, coverage review (plans/production-coverage.md)

- Every Production sub-menu and option has a phone counterpart; floor roles (warehouse executive, karigar app) see no
  money anywhere, manager phones show costing, dues and rates with the lock mark. From ScreenPCosting / ScreenPKarigar.
- Over-receive: pieces received that were never issued are counted, flagged "held", and wait for PM verification; the
  karigar's material balance is not reduced for them. From the Receive pane (WebPReceive) and the jobber verification.
- Karigar-recorded entries (the karigar's own phone) raise no due, no accounts voucher and no gate token until the floor
  verifies; the job shows an Unverified pill meanwhile. From WebPKarigarVerify / ScreenPKarigarVerify.
- Sample reading: 15 days after deployment; views, cart adds and waitlisted orders are counted daily; "high growth"
  suggests a first production order sized from waitlist + growth; a flat reading can be re-read once or dropped.
  From WebPSamplesDeployed.
- Costing: unit cost = materials at average purchase rate + job rates per pc; recommended price = cost ÷ (1 − margin);
  default margin per category (Lehenga 40 %, Saree 35 %, Blouse 45 % as placeholders), editable by admin.
- Ready production (Direct book): the issue records the order, nothing leaves the godown; the receive counts finished
  pieces; the job rate is the purchase price. The on-paper material invoice to the karigar lives in Hub/accounts.
