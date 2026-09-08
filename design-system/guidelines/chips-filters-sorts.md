# Chips, filters & sorts — screen plan (Sutra v0.3)

Planning input for UI mockups. Business-logic and user-POV only; no architecture. Sources: Tags Matrix (1).xlsx (owner's original plan), SUTRA_ERP_Filters_Sorts_Tag_Engine_BRD_Companion_FINAL_v2, SUTRA_Canonical_Tag_Band_Calculation_Dictionary, Business Requirements FINAL (brd-final.txt, brd-masters.txt, brd-dispatch.txt), screen-inventory.md. Where this plan trims or reorders the companion doc, the trim is deliberate: the companion lists everything that *can* be filtered; this file decides what a user *sees first*.

Status: draft for sign-off · 6 Sep 2026.

---

## 0. The rules (read this if nothing else)

1. **Five tag families, five treatments.** Action · State · Descriptive · Score · Promotional. Only Action and exceptional State render as chips on cards. Descriptive facts are filters, never card chips (the photo already says "lehenga, zari"). Scores are numbers with a band word, never chips. Promotional badges are the only thing a customer ever sees.
2. **Card budget: 1 action chip + 1 state pill, max.** A grid card is a photo with a price. If two action tags fire, precedence picks one (section 1.3) and the rest live on the product page. Design-Group cards carry a count suffix ("Priority Sale · 2/3") when only some colours qualify.
3. **Quick-chip budget: 4–6 per list screen.** Phone shows ~4 in one line plus horizontal scroll; active chips pin to the left. Web shows all 6. Category/Colour/Price are *caret chips* (open a mini-sheet), not tag chips, so they don't eat the budget.
4. **Four layers everywhere:** hard tabs (scope) → quick chips (today's decisions) → All-filters sheet (everything, grouped, collapsed, counted) → saved views (named combinations; admin pins role defaults). Quick chips *are* a role default that admin can re-pin from the same mechanism.
5. **OK is silent.** In-stock, on-time, Monitor, normal credit, media complete: no chip. Only exceptions and recommendations draw ink.
6. **Customer mode = zero system chips.** Price, colours, promotional badges, cart qty. Sorts limited to Newest and Price.
7. **Engine internals never appear on a list.** P(d), S(d), P(s), EWMA alpha, cohort median, effective lead time, dormancy counter, baseline history: only in the "Why?" panel of an action chip and in the Hub product dossier "Engine" tab.
8. **Informatic pages show everything.** Product page (salesperson view), customer dossier, approval card, master dossiers: all five families, grouped, with "Why?" on every action chip.

---

## 1. Tag families

### 1.1 Family table

| Family | Members | Set by | Visual | Where it shows | Filter form |
|---|---|---|---|---|---|
| **Action** (recommendation) | Priority Production · High Growth (new sample) · Restock · Priority Sale · Re-reading marker · (Monitor = nothing) | Engine, nightly | Filled chip, tag colour, tap → "Why?" | 1 per card; all on product page; Job Cards / OOS as the reason line; Hub | Quick chips + tag multi-select in sheet |
| **State** (live fact) | Product: OOS · Low · In production · At final step · Sample · Price TBD · Reading day n/15 · Dormant/Reawakening. Order: Pending approval · Held · Credit blocked · Due ≤2d · n/m in stock. Job: Unassigned · Ready to issue · Partially serviceable · Waiting on floor · Stuck (input OOS) · Waiting previous process · At jobber · Tranche missed · Rework. Bill: Due · Overdue · Issue · Escalate · RED · Snoozed. Parcel: Open · Packed · Invoiced · Awaiting shipment. Return: Stock on approval. Data: Media incomplete · BOM incomplete · Costing pending · Sync failed. Gate: Waiting ERP entry · Variance | System, realtime | Outline pill or icon + number; only exceptional states render | The screen that owns the state; product page per colour | Quick chips on owning screen |
| **Descriptive** (master fact) | Category · Design work (Zari, Resham, Appliqué, Patchwork) · Colour · Collection · Season · Base material source · Price band (6) · Analytical cohort (3) · General tags (Haldi, Net, Shiny…) · Item type | Master / auto-derived | Muted outline tag row; never on cards | Product page "About" row; Hub dossier; filter sheet | Caret chips (Category, Colour, Price) + sheet groups |
| **Score** (calculated) | Product: Demand score (PDS 0–100 + band + sparkline) · Rank band (Top 20/50/100/100+/Bottom 150) · Growth WoW · Percentile · State with most sale · Distinct buyers. Customer: Customer score · Payment score · Market rating · GR ratio · Hot/Warm/Cold · Taste vector (High/Mid/Low %) + confidence · Credit utilisation · Preferred price bands (top 2) · Preferred colours (top 4). Karigar: reliability score · on-time %. | Engine | Number + band word; gauge; three mini-bars; sparkline | Product page, customer dossier, approval card, CRM customer row (gauge only), karigar row | Bucket chips + range slider in sheet; sorts |
| **Promotional** (manual, customer-facing) | Trending · Bestseller · Low stock · Staff pick · Clearance | Sales manager, from salesperson view | Gold badge on the image corner | Customer view + customer mode only. Salesperson view shows a "Customer sees:" strip with edit | Admin-only filter in Hub |

Hard rule from the dictionary, kept: promotional tags never feed any calculation, and system tags never leak into customer mode.

### 1.2 Chip anatomy (four variants for the kit)

| Variant | Use | Shape |
|---|---|---|
| **Action chip** | Priority Production etc. | Filled, tag colour, white text, optional "n/m" suffix, tap opens "Why?" |
| **State pill** | OOS, Low, Held, Stuck… | Outline, semantic colour text/border, no fill (RED / OOS / Stuck get filled danger) |
| **Caret chip** | Category ▾ · Colour ▾ · Price ▾ · 30d ▾ | Neutral outline with caret; shows selected value when set ("Lehenga ▾") |
| **Active-filter chip** | Applied filters row under header | Neutral filled ink-100, × to remove; never wraps to two lines on phone |

Micro-markers (not chips): ↻ re-reading beside the score · "Sample" corner ribbon · "TBD" in the price slot · tranche pips ●●○ on job cards · priority ring P1–P5 on dispatch cards · Hot/Warm/Cold as a coloured dot on customer rows.

### 1.3 Precedence when several action tags fire (one chip per card)

Mutual exclusions already in the rules: Priority Production (PDS ≥ 61) and Priority Sale (PDS ≤ 40) never co-fire; Restock excludes Priority Sale. Real conflicts are only Priority Production / High Growth / Restock.

| Surface | Order | Why |
|---|---|---|
| Catalogue, CRM grids, Samples, Studio (selling surfaces) | High Growth > Priority Sale > Priority Production > Restock | Sales wants "what's rising" and "what to push". Priority Production always implies a Low/OOS pill anyway, so scarcity is still visible. |
| Job Cards, Lifecycle, OOS/Restock, Purchase, Hub product list (making surfaces) | Priority Production > Restock > High Growth > Priority Sale | Make-more urgency first; clearance is irrelevant to the floor. |

Design Group roll-up: chip label gains "· 2/3" and the matching colour dots on the card are ringed. Never imply all colours qualify.

### 1.4 Colour mapping (design-system tokens)

| Tag | Token | Note |
|---|---|---|
| Priority Production | `--warn-500` amber, filled | Tags Matrix "orange" accent |
| Priority Sale | `--brand-500` maroon, filled | Tags Matrix "pink" accent |
| High Growth | `--ok-500` green, filled | |
| Restock | `--info-500` slate, filled | Operational, calmer than PP |
| Re-reading | ink-400 ↻ marker | Not a chip |
| OOS / Stuck / RED / Credit blocked | `--danger-500` filled | The only red fills |
| Low / Waiting on floor / Overdue / Held / Due ≤2d | `--warn-600` outline | |
| Ready to issue / Fully packable / Cleared | `--ok-600` outline | |
| Unassigned / At jobber / Snoozed / Pending | `--info-600` outline | |
| Descriptive tags | ink-400 text, `--border-subtle` | |
| Promotional badges | `--gold-500` | Design-system decision: gold is Sutra's sparse accent; using it only for customer-facing merchandising keeps it sparse and makes "customer sees" visually distinct from system truth. Needs sign-off. |
| Priority ring | `--p1…--p5` | Already defined |

---

## 2. The shared Sort & Filter sheet (one component, every list)

Opens from a single "Sort & filter" button. Phone: full-height bottom sheet. Web: right drawer.

1. **Sort** at the top: radio list, default marked. Web adds a secondary sort. Sorts are a short list (5–7) with "More sorts" for the long tail.
2. **Groups**, collapsed, each with a selected-count badge ("Stock · 2"). Search-within-filters box above the groups.
3. **Field forms** per companion 4.2: state chips, checkbox multi-select (OR within a field), colour swatches with the scope selector (Any colour / All colours / Selected colours; default Any) inside the Colour group, min–max with operator shortcuts, bucket chips + slider for scores, relative date presets, entity autocomplete with thumbnails.
4. **Footer**: Reset group · Clear all · **Show 126 designs** (live count, debounced) · Save view.
5. Applied filters echo as removable active-filter chips under the header. Facet counts come from the server and respect permissions.

---

## 3. Screen-by-screen

Format: **Card/row carries** → **Quick chips** (ordered; phone shows first ~4) → **Sheet groups** (ordered) → **Sorts** (default first) → **Hidden** (never on this screen).

### 3A. Home & utility

**Home dashboard.** No filter chips. Scope: [Today | Week | Month | FY] segment + Firm caret (admin only). Widgets own their ranking. Priority tiles ("Priority Production 14 · Priority Sale 31 · Restock 9 · Follow-ups due 6") deep-link into the owning screen with that chip pre-applied. That is the only place a tag count is a tile.

**Notifications.** Row: severity dot, module icon, age. Quick: Unread · Action required · Critical · Mine. Sheet: Module · Entity · Time. Sort: Critical first, newest.

**Approvals — sale order card (informatic).** Shows in full: Payment score, Customer score, GR ratio, FY billing, order amount + pcs (+ in stock), overdue amount, taste vector mini-bars with confidence, credit-line bar, order-vs-payment sparkline, broker/agency sparkline. Chips on card: Credit blocked (red) · Overdue balance (warn) · Escalated / For inspection · New customer (low-confidence taste). Quick: Pending · Mine · Escalated · Credit blockers · Overdue. Sort: Oldest pending, highest value, highest risk, newest.
Other approval types (sale return, purchase inward, overage, costing) reuse the card with their own relevant scores (customer score + return ratio; supplier score + overdue; karigar score + job history; margin + variance).

**Gate pass hub.** Token row: Auto/Manual pill, Inward/Outward arrow, party, parcels claimed/actual, Variance (red). Quick: Active · Waiting ERP entry · Manual · Variance · Today. Sort: Oldest active, longest waiting, highest variance.

**Global search overlay.** Entity type chips: Products · Materials · WIP · Samples · Customers · Orders. Result rows: big thumbnail, ID, price, colours, OOS/Low pill. Sort: relevance; in-stock first for products. No demand chips in search.

### 3B. Catalogue & sale orders

**Catalogue grid (salesperson).** *Hard tabs:* Catalogue · Samples · Materials · WIP.
Card: photo, design no, price (or TBD), colour dots, **one** action chip, **one** state pill only if Low/OOS/In production, "Sample" ribbon on samples.
Quick: **Category ▾** · In Stock · New · High Growth · Priority Sale · Discounted. (Restock and Priority Production drop to the sheet; a sales manager can pin them.)
Sheet: Category & Work · Colour (swatches + scope) · Price (6 bands + range + Price TBD) · Stock (In/Low/OOS, free qty, DOC, stock age, godown) · Demand (PDS band chips + slider, growth +/−, rank band, State top sellers picker) · Action tags (all five + Dormant/Reawakening) · Production (in production, at final step, ETA) · Media (complete/incomplete, missing primary, no AI shoot) · History (activated within X, last sale, sold in period) · Channel (Active online, reserved for firm).
Sorts: Demand score (default for staff) · Newest · Price ↑ / ↓ · Best selling 30d (pcs) · Discount % · More: revenue, growth WoW, rank, DOC lowest, free stock, stock age, last sale, selected-state pcs.
Saved views seeded: Top 20 · State top sellers · High Growth samples · Priority Sale · Priority Production · New arrivals.
Hidden: Restock/Priority Production as chips for sales-executive role (still filterable), engine numbers.

**Catalogue grid (customer mode / customer role).** Card: photo, price, colour dots, promotional badge (max 2). Quick: Category ▾ · New · Price ▾. Sort: Newest · Price. Nothing else.

**Product page — salesperson view (informatic).** Local selectors as caret chips: Colour ▾ · 30d / 60d / Lifetime · Group | Colour · Godown ▾.
Tag rail, three rows:
1. Action chips, all that fire, each with "Why?" (e.g. "PDS 87 · 5.4/day · 18 free · 3.3 d cover · lead 31 d · calculated 03:10"). If none: quiet "Monitoring" text.
2. Per-colour state: colour chip + free/reserved qty + OOS/Low pill + in-production qty.
3. Descriptive row (muted): Category · Work · Source · Collection · Season · Price band · Cohort · general tags.
Scores block: Demand score number + band word + 5-band meter + sparkline, ↻ if re-reading; lifecycle word (New / Active / Dormant / Reawakening); rank band; growth WoW; state with most sale; distinct buyers 30d.
"Customer sees" strip: gold promotional badges with an edit control (sales manager).
Graphs: Demand score over time; last-month sales (bold group line + colour lines); lifetime sales.
Recipe panel: material rows with live stock and OOS/Low pill, sorted by process sequence then shortage first.
Production panel: order dropdown, process timeline (done/active/not started), next tranche date.

**Product page — customer view.** Images, colours, price, category, promotional badges, cart qty. No chips.

**Scan pop-up / quick add.** Colour bars on image. Below: price, category; for staff roles a stock line (godown · reserved) and production timeline. One pill per colour only if OOS/Low. No action chips (this is an add screen, not a decision screen).

**Carts.** Customer tabs. Cart card: customer, book caret (In-Cabin / WhatsApp), pcs, value (role), Credit blocked (red) if the customer is over line — the one chip that matters before submitting. Quick: Active · Recently updated · In-Cabin · WhatsApp. Sort: Recently updated · Oldest open · Pcs · Value.

**Sale orders.** *Hard tabs:* All · Approved & Pending · Dispatched.
Row: order no, customer, priority disc P1–P5, due-days pill (red ≤ 2d), status pill (Pending approval / Held / Packing / Partially dispatched), amber "n/m in stock", Credit blocked (red).
Quick: Pending approval · Held · Due ≤2d · Fully dispatchable · Credit blocker. Sheet: Book & channel · Customer (tier, score, state, broker) · Priority & due · Qty/value · Availability · Credit. Sort: Earliest due · Priority · Newest · Customer score · Pcs · Value · Dispatchable %.

### 3C. CRM

**Sales CRM — customer list (left pane).** Row: name, city · state, tier chip, Hot/Warm/Cold dot, follow-up dot, score gauge. Max **one** pill: Follow-up overdue (warn) > Due today > Credit blocked (red) > worst bill stage if ≥ Issue.
Quick: Follow-up today · Overdue · Hot · Warm · Cold · Mine.
Sheet: Assignment & follow-up · Identity & geography (state, city, country, market, broker, agency) · Quality (Customer score, Payment score, Market rating, GR ratio, tier) · Taste (three independent sliders High/Mid/Low % + confidence) · Activity (last order, revenue, pcs, frequency, preferred price bands, preferred colours) · Credit (outstanding, overdue, utilisation, worst stage).
Sorts: Next follow-up · Last order · Customer score · Revenue · Outstanding · Low-taste % · High-taste %.
Saved views seeded: Today's to-do · Overdue follow-ups · Hot · Clearance-friendly (Low taste ≥ 30 %) · High-PDS taste · Payment risk.
Hidden: taste chips on rows (they're bars in the dossier, sliders in the sheet).

**Customer dossier / CRM top strip (informatic).** All customer scores as gauges/numbers with band words; taste vector as three bars with "n orders · low confidence" caption; preferred price bands (top 2) and colours (4 swatches) as muted tags; credit-line bar; bills by stage counts; broker/agency; Hot/Warm/Cold; recent purchases strip with "full history" link.

**CRM grid 1 — Purchased.** Card: photo, pcs bought / returned numbers, Repeat chip, Returned (warn) if any. Quick: 30d | 90d | Lifetime segment · Repeat · Returned · In stock. Sheet: Product facets · Then-vs-now (pds_at_order band, current PDS, current action tag). Sort: Last purchased · Pcs · Value · Return qty.

**CRM grid 2 — Recommended.** Card: photo, price, **one match-reason chip** (State match / Colour match / Price match / Taste match, whichever is strongest) + **one** action chip (High Growth or Priority Sale). Quick: In stock · Never bought · High Growth · Priority Sale · Colour match · Price match. Sort: Match strength (once formula exists; until then PDS) · Newest · Priority Sale first.
Saved views: Clearance for this customer · New high-growth · Refill/repeat · Never bought.

**CRM grid 3 — Total catalogue.** Identical to Catalogue plus a customer-context group: Bought before · Never bought · Price match · Colour match · State match. Quick chip row adds "Bought before" and "Price match" in place of Discounted.

**Select mode → share packet composer.** After "Verify against stock", each product gets ✓ / ✗ / "n left" — the only chip in the composer.

**Follow-up terminal & journey.** *Hard tabs:* Journey board · Today · History. Board columns = journey steps (so no step chip on cards). Card: customer, next-action date pill (Overdue warn / Today / Snoozed info), last-contact channel icon, product-attached icon. Quick: Due today · Overdue · Mine · Snoozed · No next action. Sheet: Journey & step · Task state · Ownership · Customer facets · Interaction (channel, outcome, attempts) · Product context. Sort: Next action due · Most overdue · Last contacted · Customer score.

**Payments CRM — bill journey.** *Hard tabs:* Journey map · Bills · Customers · Broker/Agency. In Journey map, stage is the column; bill card shows amount, days overdue (number with warn→danger ramp), Snoozed pill, broker, call button. In Customers tab, row shows worst-stage pill + "3 bills · 2 Overdue · 1 Issue" counts. Quick (Bills/Customers tabs): Due · Overdue · Issue · Escalate · RED · Snoozed · Mine. Sheet: Stage · Bill (invoice no, dates, amount) · Customer risk (payment score, credit) · Follow-up task · Automation · Broker/agency. Sort: Days overdue · Amount outstanding · Next action · Payment score.
Rule kept: snooze never changes days overdue or stage.

### 3D. Production

**Purchase order (calendar / list / past).** Card: supplier, material thumb, expected date, PO state pill, Production-blocking (red), Overdue (red), Partially received (warn). Quick: Due this week · Overdue · Production-blocking · Open · Partially received. Sheet: Supplier & book · Material · Arrival dates · Production link · Value. Sort (list only): Expected arrival · Most overdue · Linked production due · Open qty.

**Purchase inward / return.** *Hard tabs:* New · Past. Quick: PO-linked · Ad-hoc · Pending approval · Variance · Today. Sort: Newest · Variance. Minimal by design: these are entry forms.

**Job process setting / BOM.** *Hard tabs:* Edit current · Search other products · View BOM. Chips on screen header: BOM incomplete (with missing-reason list) · Colour override · Locked by production. Quick: Current colour ▾ · Missing assignments · Selected only · Materials | WIPs. Process columns are never sortable (sequence is business logic). Right-pane search: category, material used, process used, completeness.

**Production lifecycle (per order).** Header: order no, product thumb, qty, destination firm, reason chip if the order came from Priority Production / Restock / High Growth. Timeline per process with one job-state chip each: Unassigned (info outline) · Ready to issue (ok) · Partially serviceable · Waiting on floor (warn) · Stuck — input OOS (danger) · Waiting previous process · At jobber · Finished; plus tranche pips ●●○ and next-due date. Quick: Unassigned · Ready to issue · Waiting on floor · Stuck · Tranche due. Sort fixed to process sequence.

**Job cards board (daily terminal).** *Hard tabs:* Active · Delayed · Upcoming · Stuck · Priority Production · Restock · Finished. Because the tab already says *why*, the card chip says *what to do*:
Card: image ⅔, top band (job no · product · karigar), bottom band with **one** serviceability chip (Ready to issue / Waiting on floor / Stuck / Unassigned / At jobber), next tranche date pill (warn → danger when missed), progress "received/planned", tranche pips. No demand chip on the card (tab carries it).
Quick: Ready to issue · Waiting on floor · Unassigned · Tranche due today · At jobber. (Rework → sheet.)
Sheet: Canonical job state · Serviceability · Deadlines (tranche 1/2/3, overdue days, missed count) · Product (design, category, PDS band, action tags) · Karigar (name, score, on-time %, delayed history) · Quantities · Customer impact (linked pending order, shortage pcs, earliest dispatch due) · Scope (book, firm, no activity X days).
Sorts: Urgency (most overdue tranche) · Waiting on floor first · Serviceable now first · Oldest unassigned · Oldest no-activity · Pending pcs · Customer shortage impact · PDS.
Saved views seeded: Urgent today · Unassigned neglect · Issue now · Waiting on karigar · Customer shortage.
Right pane: lifecycle of the selected order (same chips as above).

**Costing.** *Hard tabs:* Completed · Incomplete · Past · Not priced. Card: product thumb, unit cost, margin %, recommended price, chips: Pending approval · Missing rate (warn) · Below target margin (warn) · Sync failed (red). Quick: same four. Sort: Oldest unpriced · Pending age · Margin · Unit cost.

**Karigar analytics.** Row: name, speciality tags (muted), score gauge, on-time %, active jobs, chips: Delayed jobs (n) · Material balance ₹ · Capacity risk · Payment due. Quick: Delayed jobs · Missed tranches · Material balance · Capacity risk · Payment due. Sort: Reliability · Average delay · Material balance · Payment due.

**Samples lifecycle.** *Hard tabs:* In designing · Deployed, no production · Activated · Production started. Card: photo, temp design no, "TBD" price, Reading day n/15 progress ring while reading, chips: High Growth · Costing pending · Re-reading ↻. Quick: Price TBD · Costing pending · High Growth · 15-day read · Re-reading. Sort: Newest activation · Oldest undeployed · Read completion · PDS · Pcs ordered.

### 3E. Dispatch (floor: no money on Ready or phone)

**Ready orders.** Customer card: priority ring, tier chip, due-days pill (red ≤ 2d), amber "n/m pcs in stock" or green "Fully planned". That is the whole chip budget. Left rail quick chips: Due ≤2d · Fully packable · Partial · P1/P2 · In-stock only. Rail filters: created before, tier, priority, total pcs. Sort: Due days oldest first · Priority · Packable pcs · Total pcs · Customer score.

**All pending orders.** Same axes plus: Fully short · Has final-step qty. Red "n short" badge per order; "n at last step" per short line. Money visible for desk roles. Sort adds Short pcs · Pending value.

**Packing terminal.** Customer chip strip is the selector (shortfall, parcels, progress). Parcel card status pill: Open · Packed · Invoiced · Awaiting shipment; "Packing into" tag on the active box. Scan results as toasts (accepted / warning / rejected + reason). Filter: Open · Packed, awaiting invoice · Invoiced, awaiting shipment · Scan exceptions. Sort: board order · pcs · created.

**Billed — invoices / shipments.** Quick: Today · Tier ▾ · Transport ▾ · Return initiated · Unshipped parcels. Sort: Newest · Value · Delivered-in-days.

**Out of stock / Restock.** *Hard tabs:* Order shortages · Restock suggestions. Counts strip: pcs to produce · sourceable now · in production, not last step · nothing in production (red). Card: photo, colour matrix (needed / at last step / in order / received / due dates with red "Nil"), the metrics line "selling 4/day · 22 d cover · 18 free · score 61" (this *is* the Why), **one** sourcing chip (Sourceable now ok / In production, not last step info / Nothing in production danger), Priority Production accent when it also fires, karigar pills with score + call. Quick: Sourceable now · Nothing in production · At last step · Priority Production · Restock on/off. Sorts, three prominent: Customer due soonest · Short qty highest · Demand priority; more: sourceable first, production ETA. Sheet: Shortage · Demand (velocity, DOC, PDS) · Production · Product facets · Karigar.

**Warehouse stock — FG.** Row per colour SKU: photo, design, colour, FG, reserved, free, in production, status pill OOS / LOW (OK silent). Quick: Out · Low · In production · Reserved · Free > 0. Sort: Scarcity first · Free · DOC · Stock age · Last movement. Stat tiles over the full filtered set.
**Material.** Quick: Low · Out · On order · Used by active job. Sort: Scarcity · Available · On order · Consumption this month.
**WIP.** Row: design, colour, process, holder, days at step. Quick: Waiting on floor · With karigar · Aged · Next process ready · Stuck. Sort: Days at step oldest · Available qty · Next due.

**Sale return wizard.** Step rail is the only chrome; credit note carries a "Stock on approval" badge. Recent-notes list quick chips: Pending accounts · Stock on approval · Approved · Recent.

### 3F. Hub

**Master views shell.** Census chips with live counts are the navigation (Products 4 010 · Materials · WIP | Customers · Agencies · Brokers · Karigars · Transporters · Suppliers · Team). Alerts strip = exception counts that deep-link: SKUs low stock · Designs with no photo · Never scored · Unlinked purchases · (add) BOM incomplete · Unpriced. One Filters ▾ sheet, applied filters echoed as chips, Views, Columns, list/grid, Export.

**Products list.** Tags column shows up to 2 chips + "+n" (precedence: making-surface order). Filters: category · tag (five action tags + rank band + Dormant) · has stock · low stock · in production · has photo (false = "No photo yet") · scored (false = "Never scored") · price. Sort: Design no · Modified · PDS · Stock · Sales · Completeness severity · Sync failures. Quick: Active · Missing media · Missing BOM · Unpriced · Sync issue · Priority tags.
**Materials / WIP.** Quick: Low/Out · Used in active production · Missing image/data.
**Customers.** Opens on follow-up due. Quick: Hot/Warm/Cold ▾ · Payment risk · Taste ▾ · Credit utilisation · Follow-up due. Filters: segment, tier, GST category, city/state/market, broker, agency, direct, has open book.
**Other ledgers.** Quick: Active · Outstanding · Recent activity. Default sorts stay non-alphabetical (commission overdue, material with karigar, etc.).
**Master dossier (tier 2/3).** Full five-family display; product dossier gets an "Engine" tab holding P(d), S(d), P(s), cohort, velocity, lead time, baseline history, dormancy counter; this is the one place those numbers live.

**Reports / builder.** Template chip rail (seeded: Stock health · Aged pool · Season bestsellers · Customer purchases). Filter-scope sheet reuses the catalogue sheet verbatim; chip labels inside it: category pills · tag chips (Top 20, Hot, state chips, work, Priority Sale, Discounted, Low stock) · in production · price. Tag-group columns render with the same chips as the app (rank tier chip, score pill), not plain text. Column-header sort, multi-sort stack.

**Product compare hub.** Quick: Category ▾ · Price cohort ▾ · PDS band ▾ · Priority tags ▾ · In stock · State ▾. Columns = chosen metrics; sort by any.

### 3G. Studio & Channels

**Image upload centre.** Card: "n/m media" progress + missing-type icons (primary · sides · AI · real · video). Quick: Missing primary · Missing side profiles · No AI shoot · Media incomplete · Recently uploaded. Sort: Missing-media severity · Newest sample · PDS.
**AI photoshoot centre.** *Hard tabs:* Queue · Completed · Failed. Quick: No AI shoot · New samples · High PDS · Failed · Video needed.
**Stitch context selector.** *Hard tabs:* Products · Materials · WIP · Moodboard. Quick: High PDS · High Growth · Category ▾ · Colour ▾ · Recent · Metadata on/off. Card: photo + small PDS number when metadata is on.
**Moodboard.** *Hard tabs:* All · Pinned · Auto-scraped · Uploaded · Used. Quick: New · Unused · Category ▾ · Colour ▾ · Source ▾.
**Channels hub.** *Hard tabs:* Transfers · Active permissions · History. Row: direction arrow, firms, packet type chip, status pill (Pending / Accepted / Failed / Expiring). Quick: Incoming · Outgoing · Pending · Expiring · Failed.

---

## 4. Budget summary (for the mockup kit)

| Screen | Chips on card/row (max) | Quick chips | Sheet groups | Sorts (short list) |
|---|---|---|---|---|
| Catalogue grid (staff) | 1 action + 1 state | 6 (1 caret) | 10 | 6 + more |
| Catalogue (customer mode) | promotional ×2 | 3 | 0 | 2 |
| Product page (staff) | all, grouped in 3 rows | 4 local carets | — | fixed |
| Scan pop-up | 1 state per colour | — | — | — |
| Carts | 1 (credit) | 4 | 3 | 4 |
| Sale orders | priority disc + due pill + 1 status + 1 credit | 5 | 6 | 7 |
| Approvals card | 4 flags + full scores | 5 | 5 | 4 |
| CRM customer list | dot ×2 + gauge + 1 pill | 6 | 6 | 7 |
| CRM purchased grid | 2 numbers + 1 chip | 4 (1 segment) | 2 | 4 |
| CRM recommended grid | 1 match + 1 action | 6 | 4 | 3 |
| Follow-up terminal | 1 due pill + 2 icons | 5 | 6 | 4 |
| Payments CRM | days-overdue number + snoozed | 7 | 6 | 4 |
| Purchase order | 1 state + up to 2 flags | 5 | 5 | 4 |
| Process setting | 3 header flags | 4 | — | none |
| Lifecycle | 1 job-state per process + pips | 5 | — | fixed |
| Job cards | 1 serviceability + due pill + pips | 5 | 8 | 8 |
| Costing | up to 2 flags | 4 | 5 | 4 |
| Karigar analytics | up to 2 flags + gauge | 5 | 5 | 4 |
| Samples | ring + up to 2 chips | 5 | 5 | 5 |
| Dispatch Ready | ring + tier + due pill + 1 stock tag | 5 | 4 | 5 |
| Pending orders | + short badge | 6 | 5 | 6 |
| Packing | parcel status pill | 4 | — | 3 |
| Out of stock | 1 sourcing chip + metrics line | 5 | 5 | 3 + more |
| Warehouse FG / Material / WIP | 1 status pill | 4–5 | 4–5 | 4 |
| Hub products list | 2 chips + "+n" | 6 | via sheet | 7 |
| Hub customers | as CRM list | 5 | sheet | 7 |
| Studio upload | progress + icons | 5 | 4 | 3 |

---

## 5. Hand-off notes for the technical-architecture agent

Findings from this pass that the architecture should absorb. Not a design; pointers.

1. **One tag registry, five families, per-surface precedence.** Every tag needs: family, grain (colour SKU / Design Group / customer / bill / job / parcel), colour token, roles that may see it, whether it is card-eligible, and a precedence rank *per surface* (selling vs making, section 1.3). The client should never compute precedence.
2. **List payloads must carry the resolved card chip.** Grid cards need `primary_action_tag` (already precedence-resolved for the requesting surface + role), `stock_state`, the roll-up count ("2 of 3 colours") and the matched colour IDs, plus the full tag list for the sheet. No per-card follow-up calls.
3. **"Why?" payload on every action tag** (companion 4.4): inputs, calculated_at, rule version, effective lead time used. The product page and the OOS metrics line both render from it.
4. **Quick chips are role defaults, not code.** Treat the quick-chip row as an admin-pinned saved view per role and screen; my orders in section 3 are the seed. This removes the "sales manager wants Restock on the catalogue bar" debate from the codebase.
5. **Customer Score is still TBD in the dictionary (T081) and Payment Score too (T082).** Owner's proposed weights: 30 % payment score, 30 % total billing, 25 % goods-return ratio (inverse), 15 % initial market rating. Open before build: (a) Payment score formula itself (days-late weighted by amount? share of bills cleared within grace?), (b) how total billing is normalised (percentile within the firm's active customers over trailing FY is the natural choice; absolute rupees breaks across firms), (c) GR ratio basis (value or pcs, trailing window), (d) band cut-offs for Low/Medium/High (matrix says 1–30 / 30–60 / 60–100). Store the weights as config with a version, same as tag rules.
6. **Design Group vs colour SKU.** Selling surfaces default to Design Group with "Any colour" scope; making/warehouse/scan surfaces are colour-SKU only. Every dual-grain field needs an explicit roll-up rule (sum / max / any / all); DOC for a group must be summed stock ÷ summed velocity, never an average.
7. **Two things that look like tags but aren't.** Rank bands (Top 20 / 50 / 100 / Bottom 150) and "State top sellers" are derived filters and saved views, not stored tags; the ranking metric and window are config (dictionary T038 flags this).
8. **Promotional tags** are a separate manual table on design or colour, editable by sales manager, never read by the engine, and the only tag family served to the customer role or in customer mode. Server must strip system tags in customer mode, not the client.
9. **Reading state must be queryable:** activation date, read day n/15, read complete, re-reading, stockout-censored days; Samples and Studio filter on it.
10. **Sheet needs server facet counts and a debounced "Show N" count** honouring permissions and firm scope; counts must never leak cross-firm or money.
11. **Sorts are server parameters** with a stable secondary and ID tie-break; operational grids need primary + secondary, reports a stack. Velocity/PDS sort must handle floats (the masters BRD records this as a live defect).
12. **URL-persisted filter state** on Dispatch and Hub/Reports; saved views user+screen scoped with admin publish to role.
13. **"Discounted"** needs a discount field on design and colour (old BRD: discount assignable product- or colour-wise from the Priority Sale review) and a rule for who sets it; it is a State, not an Action tag.
14. **FG Low definition** is still configurable (free > 0 and DOC < effective lead time is the recommended default). Material Low uses reorder level, which does not exist yet (masters BRD U34).

---

## 6. Decisions still needed from the owner

- Customer Score and Payment Score formulas and bands (see 5.5).
- Gold for promotional badges: accept or pick another token.
- Which role sees Priority Production / Restock as quick chips in Catalogue (proposed: sales manager and above; executives find them in the sheet).
- Discount field: who sets it, design or colour grain, expiry.
- FG Low-stock rule (DOC-based vs reorder level).
- Upcoming-job window (days before next tranche) for the Job Cards "Upcoming" tab.
