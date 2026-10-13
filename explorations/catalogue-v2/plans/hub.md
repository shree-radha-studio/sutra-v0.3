# Hub — plan (13 Oct 2026, review 2)

Drawn in `mod-hub.jsx` (module id `hub`, components `Hb…`). Page: `board.html?m=hub` (index.html?m=hub to review).
Sources: M:line = `design-system/research/brd-masters.txt`, F:line = `brd-final.txt`, B:line = `uploads/Business Req.txt`.
Frame ids are 1-based and count within the page: phone `n-1…n-7` (dark `nd-…`), web `nw-1…nw-6` (dark `nwd-…`).
Phone order: n-1 Masters · n-2 New product · n-3 capture · n-4 no-photo queue · n-5 Import pick · n-6 Import check · n-7 New material.
Web order: nw-1 Masters · nw-2 New product · nw-3 Upload centre · nw-4 Import check · nw-5 Import pick · nw-6 New material.
Second pass (13 Oct, 15:25, branch `claude/kind-goldberg-txzrb5-hub2`): decisions 4, 10, 11, 12 applied as provisional drafts, see §2.7.
Everything stays a draft; nothing in finals.jsx.

## 0. Shape of the module

- Hub is where masters are created and looked at. The census is the navigation: the family switch ITEMS | LEDGERS, then
  one chip per master with its live count (M:11–12). Alerts sit directly under it, each one a question to answer today (M:15–31).
- Header sub-menu on every Hub frame, in this order: Masters · Upload centre · Import · Reports · Report builder · Compare.
  The last three are not drawn here. The bar never changes between screens; the active button and the 24px head name the sub-menu.
- Phone: the Hub sits under "More" on the island. Web: WebShell3 (rail · tab strip · header · main · right pane 340).
- Money: price and "sold ₹" show for roles with the money right (marked with a small lock); the packer or a floor role would
  see the same screens without those columns (M:108). The price field on a new master is admin's.

## 1. Sub-menus (board bands)

1. Masters (M:4–47): census, alerts, products grid, product dossier in the right pane.
2. New product: the product master form with its checklist; phone sheet with a camera per colour.
3. Upload centre (F:66–71, F:277, M:296): per-colour checklist of required pictures; phone capture; the no-photo queue.
4. Import (M:103–106): four steps, dry run by default.
5. New material: the material master form, a sibling of the product form.

## 2. Screens in flow order

Per line: purpose · who · web right pane · phone sheets · money.

### 2.1 Masters

- **nw-1 · Masters · products grid, census chips, alerts** — find a design, see how many of each master exist, jump from an alert. Accountant, analyst, sale manager. Right pane "Product · 2798": dossier tabs as chips (Overview · Sales · Production · BOM & materials · Stock ledger · Barcodes), free · FG · in production, stock by colour, facts. Cards are the catalogue's, plus free · FG · in prod under each, and a "No photo yet" card state (1457, 3661, 1243, D9107). Price and sold ₹ with the lock.
- **n-1 · Masters · products list on the phone** — same facts in list rows (photo 62×78, design no head, category · name, free · FG · in prod). Alerts scroll sideways as small chips; "New product" floats above the island. Sheet: n-2.

### 2.2 New product

- **nw-2 · New product · master form and checklist** — create a design. Accountant, analyst. Two columns: Identity (design no 8591, name optional, category, work, book / firm) and Colours (swatch, primary radio, photo slot); Price and tax (price "TBD until costing" with admin's "Set price", HSN and GST empty, "Active on online (Raaslila)" off, tags set later by the sale manager). Foot: Save · Save and set recipe → Production · Save and add photos (the one primary). Right pane "Checklist": 3 colours · 0 photos · recipe not set · price TBD, plus design no and HSN/GST. Money: price is admin's and locked here.
- **n-2 · New product · master sheet on the phone** — design no, category chips, colours with a camera each (the phone's job is the photo), foot "Save and add photos". Work, price, HSN and GST stay on the desk.

### 2.3 Upload centre

- **nw-3 · Upload centre · product 8591, checklist per colour** — add every required picture for a design, colour by colour. Salesperson or analyst on the desk. Head with the photo beside "8591 · Lehenga", colour tabs Rani · Firozi · Mehroon. Slots: Primary (model shoot) · Side profiles × 4 · AI shoot · Real-world shoot (optional) · Video; a thumb with a "Primary" star, an uploading slot with its percent, or a dashed "Add". Drop zone, two uploads in flight as chips. Bulk card "104 designs with no photo yet" with the primary "Start the queue". Right pane "Progress": done and missing per colour, the primary image, "Set as primary". No money.
- **n-3 · Upload centre · capture per colour** — salesperson on the phone, "8591 · Rani" with the design photo, viewfinder labelled "Primary · model shoot", "2 of 7 done", slot thumbs with checks, the maroon shutter, "Pick from gallery". No money.
- **n-4 · Upload centre · the no-photo queue** — the alert opened as a list: "104 designs · 12 done today", grey cards with the design no as head, tap goes to n-3. No money.

### 2.4 Import

- **nw-4 · Import · check the file (dry run)** — step 3 of 4. Admin or owner. File chip "products-oct.xlsx · 212 rows", four counts (180 creates · 30 updates · 2 errors · 0 skipped), a ruled table with the two error rows in danger tone and the error in words, "Download errors", "Write it in" drawn disabled (ink3 outline) with "fix 2 rows first · admin only". Right pane "Template": the picked master, "Download template", the columns expected. Price column visible because the importer is admin.
- **nw-5 · Import · pick the master** — step 1 of 4: eight master tiles, one picked, recent imports, primary "Next · fill the template". Same right pane.

### 2.5 New material

- **nw-6 · New material · master form and checklist** — the fields Production's new-material form already has (code, name, group, unit, shades with swatch, supplier, source city, purchase rate, reorder level), laid out like nw-2. Accountant, analyst. Right pane "Checklist" plus "Already in the master" (Santoon, BKS 41 beads kali set) to stop doubles. Money: purchase rate is for money roles, locked.

### 2.6 Review-2 changes (13 Oct 2026, first pass)

- One maroon line per screen: `HbViewTabs` (ink marker) replaces the shared `ViewTabs` on nw-2 and nw-6; the upload centre colour tabs (nw-3) are ink too; `HbSect` (ink tick) replaces the shared `Sect`, whose tick is maroon. The primary button keeps the maroon. What is still maroon on the web frames is shared shell chrome (active rail icon, header scan button), not Hub's.
- Phone head reads "Masters" (n-1, n-2, n-7), as the web. "Master views" is the BRD's name for the reporting twin, not drawn.
- **n-5 · Import · pick the master** — eight masters as rows, Products & SKUs picked, "Next" in the glass bar; step bar of four.
- **n-6 · Import · check the file** — products-oct.xlsx from WhatsApp, four counts (180 · 30 · 2 · 0), the two error rows in words with the design photo, "Download errors" primary, "New file"; a note that writing it in is the desk's, admin or owner.
- **n-7 · New material · master sheet on the phone** — Production's field order (photo, name, group, supplier, unit, shades with codes, reorder level, tags); rate, alias and tax category stay on the desk.

### 2.7 Review-2 second pass (13 Oct 2026): decisions 4, 10, 11, 12 applied as provisional drafts

The lead's provisional answers (plans/review-2-template-and-sell-flow.md §8) applied to this module's drafts only, no sweep
across screens, every changed caption ending "· provisional, pending decision n". Frame ids did not move.

Captions as they are now:

- n-1 · Masters · products list on the phone (unchanged) · nw-1 · Masters · products grid, census chips, alerts (unchanged).
- n-2 · New product · master sheet on the phone; Save and set recipe · Save and add photos, price TBD until costing · provisional, pending decision 10.
- nw-2 · New product · the Hub creates, Production links; Save and set recipe (Process setting, pre-filled) · Save and add photos (Upload centre), price TBD until costing · provisional, pending decision 10.
- n-3 · Upload centre · capture per colour, slots as drawn · provisional, pending decision 11.
- n-4 · Upload centre · the no-photo queue, list fades above the button · provisional, pending decision 11.
- nw-3 · Upload centre · product 8591, slots per colour: primary · side profiles × 4 · AI shoot · real-world shoot · video · provisional, pending decision 11.
- n-5 · Import · pick the master; the check is a dry run · provisional, pending decision 12 · nw-5 the same.
- n-6 · Import · check the file: dry run said in words, Write it in · admin · provisional, pending decision 12 · nw-4 the same.
- n-7 · New material · master sheet on the phone (unchanged, as the lead asked).
- nw-6 · New material · form in the main area; pane with the checklist, stock and last purchases · provisional, pending decision 4.

What changed per decision:

- **10 · Product master: the Hub creates, Production links.** nw-2's foot is two actions, not three: "Save and set recipe → Process setting" (ink outline) and "Save and add photos" (the one maroon line); the plain "Save" went, since a master saved with gaps is what both do. The foot note says in words that set recipe opens Production › Process setting pre-filled with 8591 and its 3 colours, and add photos opens the Upload centre; price reads "TBD until costing". n-2 gets the same two buttons, a locked, dimmed price line "TBD until costing" and the note; the sheet grew to 736 so the price line sits above the foot.
- **4 · Forms: more than four fields takes the main area; the pane helps.** nw-6 was already a main-area form, so it was not moved. The pane now helps the way the decision says: under the checklist, "Stock · last purchases" shows the new material's stock (0 m · no inward yet) and the last two purchases from the same supplier (Santoon 120 m · 02/10/26, BKS 41 beads kali set 40 pc · 28/09/26) as quantity and date only, no rate, so the block is safe for every role. n-7 left as it was.
- **11 · Upload centre slots: as drawn.** nw-3 / nwd-3, n-3 and n-4 checked in light and dark: primary · side profiles × 4 · AI shoot · real-world shoot (optional) · video, the per-colour counts, the uploading slots and the "104 designs with no photo yet" queue card all read; nothing was broken, so nothing changed but the captions.
- **12 · xlsx import: dry run first; commit by admin only.** `HbDryRow`, one ruled row under the four counts on both nw-4 and n-6: "Dry run · 212 rows read · 180 would be created · 30 updated · 2 need fixing · 0 written" (web adds "writing it in is a second step, admin only"). The button reads "Write it in · admin" with a lock, drawn disabled (ink3 outline) because 2 rows still need fixing; on the phone it joins the glass bar beside "Download errors", and "New file" moved to the header as a refresh icon. On nw-4 "Download errors" is now the frame's one maroon line (as it already was on n-6); the table shows five rows on first view (the two errors, two of 8591's creates, one update) so the button row stays in the frame.
- **n-4 FAB overlap fixed.** The queue list fades out over its last 175 px (a mask), so "Start with 8591" floats over a fading row instead of a hard one. n-1 was not touched (no sweep).

What waits:

- The owner's answers on the deck for 4, 10, 11, 12; any of them can overturn the above, which is why nothing moved into finals.jsx.
- Decision 10 on the Production side: Process setting opening pre-filled from the Hub is a caption note here, not drawn in Production.
- The import dry-run count row and "Write it in · admin" on frames of other modules that import (none drawn yet).
- Whether the phone should show "Write it in · admin" at all (drawn disabled on n-6, since the earlier note said writing it in is the desk's); and open questions 1 to 7 below still stand.

## 3. Found in the BRD

- Census as navigation, family switch, entity chips with live counts, deep link per entity: M:8–14. Counts used: Products 612 · Materials 22 · WIP 14 | Customers 318 · Broker agencies 12 · Brokers 41 · Karigars 27 · Transporters 19 · Suppliers 34 · Team 48.
- Alerts strip (102 low stock · 104 no photo · 113 never scored · 15 documents not linked to a supplier), each deep-linking into a pre-filtered list: M:15–31.
- Toolbar: search "Design no, name or colour", Filters, Views, Columns n/m, list ⇄ grid, Export, Import: M:33–40.
- Products columns (photo · design no · category · price · FG · reserved · free · in production …) and "No photo yet" as the false value of has-photo: M:45–46. Stock-health strip: M:47.
- Materials: columns, unit chips m / pc / kg, no reorder level exists yet (U34): M:48–50.
- Product dossier tabs: M:84 (Overview · Sales · Production · BOM & materials · Stock ledger · Barcodes).
- Import: four steps, a template per master (eight), dry run by default, commit limited to admin / super admin / owner: M:103–106. Barcodes as a master: M:115.
- The photo push: 104 designs have no photograph; the alert opens a bulk upload queue: M:295–296.
- HSN and GST per design still open (U33): M:394.
- Photo beside every design number; primary image settable and editable within the product's images; raw materials may have no photo: F:18–25.
- Required images: primary per colour (usually in-house model shoot), side profiles set of 4 per colour, AI shoot, real-world model photoshoot if it exists, videos; opens from the product's "Adding/Uploading image" as an upload centre: F:62–71.
- Hub masters list (Items: Products, Material, WIP; Ledgers …): F:224–238. Image upload centre with button sets per category: F:277.
- Masters with multiple picture uploads and easy tagging; one design + one colour = one SKU, grouped by design: B:51, B:69.

## 4. Open questions

1. Upload centre sits under Studio in the BRD (F:275–277) and under Hub here. Does Studio keep a thin entry (AI photoshoots) that links to this screen?
2. Per-colour primary vs the design's primary image: F:21 asks for one settable primary; F:67 asks for a primary per colour. Drawn as: each colour has a Primary slot, and the star marks the one that leads search, grid and batch cards.
3. HSN code and GST % per design, per category, or one house default (U33). Fields are drawn empty with "To be decided".
4. Reorder level for materials (U34): drawn empty with "open U34"; the checklist keeps it open.
5. Who may run an import: only "Write it in" is limited to admin / super admin / owner in the BRD (M:106). Should the dry run be open to everyone who can open the Hub?
6. Is the real-world shoot optional per product (F:70 says "if that exists")? Drawn optional, so a colour needs 7 pictures, not 8.
7. Which slots does a saree or a blouse need (F:277 asks for button sets per category)? Only the lehenga set is drawn.

## 5. Assumed, not in the BRD

- The Hub creates product and material masters; Production › Process setting and Production › Materials only link to them ("recipe not set" on the checklist points to Process setting).
- The header sub-menu is six buttons on every Hub frame (the brief listed four for the Masters frame). Reports, Report builder and Compare are shown but not drawn.
- The family switch is drawn next to the chips, not wrapped around them (M:11 says it brackets them).
- Required to save a product: design no, category and one colour; everything else can wait on the checklist. "Active on online (Raaslila)" starts off, "until photos and price are in".
- Slot names: Primary · model shoot, Side 1–4, AI shoot, Real-world shoot (optional), Video. Uploads fill the next empty slot of the colour in order; a picture can be dragged to another slot.
- "Set as primary" works from an opened picture; the hint says so.
- The no-photo queue opens the next design and its colours one after another; the queue count (104), "12 done today", "Mine 31" and "New today 3" are made up to fit the alert.
- Photos of 8591 are stand-ins: the board's own lehenga shot (6002), flipped and cropped. 3661, 1457, 1243 and D9107 have no photo in the board data and show as "No photo yet"; 1320 comes from the v0.2 screenshot.
- Per-colour stock for 2798 (free 9 / 2 / 5 / 4) is made up so it adds up to the card (20 free · 22 FG · 30 in production); demand score and sold are from the Catalogue sales view.
- Import template columns (nine) and the "Recent imports" list are drawn from the products master, not from a BRD list.
- Import and New material now have phone frames (n-5, n-6, n-7); the phone picks, checks and reads results. "Write it in · admin" is drawn on n-6 since the second pass, disabled with a lock until the rows are fixed.
- n-7 uses Production's sample material (Nidha satin) so the two sheets match; the desk frame nw-6 uses Mono net.
- Phone Import: the file reaching the phone from WhatsApp or the drive is assumed.
- The viewfinder hint "Whole piece in the frame, plain wall behind" is placeholder guidance.
- `modules.js` loads only base and `mod-hub.jsx` for this page, so Production's `Field`, `Swatch` and `PShell` are not available; `HbField` and `HbSwatch` mirror them. Add the Production files to the `hub` line if the owner wants the originals reused.
