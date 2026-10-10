Re-checked at extra-high effort, 10 Oct 2026

# Review 2 · Catalogue (10 Oct 2026)

A product and UX pass over the Catalogue page (`board.html?m=catalogue`).
Finals: Catalogue + Carts. Drafts: "Catalogue · tags".
Review only. Nothing on the board was changed.

Walked as a salesperson in a cabin with three parties,
on phone and web, frame by frame at full size.

Sources:
- F = `design-system/research/brd-final.txt`
- B = `design-system/uploads/Business Req.txt` (older BRD)
- R1 = owner answers of 6 Oct (`review-1-catalogue-appshell-dispatch.md`)
- DU = `design/during-ui-business-requirements.md`

Frame ids:
- finals `f-` phone, `w-` web
- drafts on this page `n-` phone, `nw-` web
- frames on other pages are marked, e.g. "Production n-38"

Who is drawn: one user, Rohan Mehta, **sale manager**
(phone side menu `screens2.jsx:220`, web rail `web.jsx:74`).
No sale-executive variant exists anywhere on this page.

The three parties are the board's carts:
A · Ramleela Fashion (Surat), B · RL Fashion (Meerut), C · Nalli Fashion Mart (Chennai).

Counting: from app open on Home. A double tap counts as one.
Typing is not counted.

---

## 1 · Flows walked

### A · A new design reaches the catalogue

Who: designer, merchandiser or production manager, mostly at the desk.
The salesperson only meets the result.
Steps happen days apart; each starts inside Production.

| # | Step | Where | Phone | Web |
|---|---|---|---|---|
| 1 | Open Production › Samples | island or rail · Production n-34, nw-36 | 2 | 2 |
| 2 | New sample: auto number, category, sketch / reference / first-piece photos, colours, notes | Production n-38 (`mod-production.jsx:546`) · nw-38 (`mod-production-web3.jsx:65`) | 2 + typing | 2 + typing |
| 3 | Moves: issue to a karigar, receive back; the piece photo "becomes the sample photo" | Production n-35 to n-37 · nw-39, nw-40 | 4 per move | 4 per move |
| 4 | Deploy for reading (1 pc goes to the catalogue at TBD) | web button only, Production nw-39 (`mod-production-web3.jsx:118`) · phone NOT DRAWN · what it asks (pcs, colours) NOT DRAWN | — | 2 |
| 5 | The sample shows on the grid: SAMPLE tag, price TBD | f-1, f-3 (4566), w-1 · draft n-1 "Reading 9/15" | 0 | 0 |
| 6 | After 15 days: Make product · first order | Production n-39 → n-40 · nw-37 → nw-41 | 3 | 3 |
| 7 | Product master: number, category, colours, **one photo** (the sample piece as primary), tags; then sequence, averages, BOM | nw-41 step 1 (`mod-production-web3.jsx:135`) · "Create 4566" | 1 | 1 |
| 8 | Costing: approve the price and sync; until then the grid shows TBD | Production n-41, n-42 · nw-42 (`mod-production-web3.jsx:160`) | 3 | 3 |
| 9 | Open the product in Catalogue | island or rail → card · f-6, w-5 | 2 | 2 |
| 10 | Go to the salesperson view | NOT DRAWN: no control on f-6 or w-5 | ? | ? |
| 11 | Media | "Media" in the salesperson head on every tab (`final.jsx:225`, `web.jsx:223`) · f-8 "Media centre · 7 of 12 · Upload" (`final.jsx:261`) | 1 | 1 |
| 12 | Upload centre: primary per colour, 4 side profiles per colour, AI shoot, model shoot, videos, set primary | NOT DRAWN · Studio › Upload centre is a header button only (`plans/studio-designer.md:60`) | — | — |

Total: about 14 taps (phone) and 16 clicks (web), plus 4 per sample move.
It cannot finish: the product reaches the grid with one photo and no way to add the rest.

A ready-bought design (Ready pc purchase book, F:16):
Production draws a Direct-book order for an existing design (1457, `mod-production-web2.jsx:204`).
Making the product master for a design that was never a sample (Hub › Master views) is NOT DRAWN.
So a bought design has no drawn way onto the grid.

### B · Multi-carts in the cabin

Three parties sit down. The salesperson starts a cart for each,
then shows pieces one by one.

| # | Step | Where | Phone | Web |
|---|---|---|---|---|
| 1 | Open Catalogue | island · rail → f-2 (no cart yet) · w-1 | 1 | 1 |
| 2a | Start a cart from the header basket (F:83: carts + bold "+") | basket drawn on f-1, f-2, w-1 · its menu NOT DRAWN | — | — |
| 2b | …or the "+" at the end of the cart strip | phone: cut off the strip (f-1, `themes2.jsx:42`) · f-2 has no strip at all · web pane: cut off (w-1) | hidden | hidden |
| 2c | …or the drawn door: Carts → "New customer" | phone ⋮ → side menu Carts → f-12 chip · web Carts → "+" or "New customer" (w-7) | 3 | 2 |
| 3 | Pick an existing customer, or new with name, contact, city (B:82) | NOT DRAWN | 2 + 3 fields | 2 + typing |
| 4 | Sale book: In-cabin or WhatsApp | on the cart in Carts · f-12 head, w-7 pane | 0–1 | 0–1 |
| 5 | Back to the grid | phone: f-12 has no back and no island · NOT DRAWN · web: Catalogue sub-menu | — | 1 |
| 6 | Repeat 2–5 for B and C | — | 5–6 + typing each | 5–6 + typing each |
| 7 | Make a party's cart active | single tap on its chip · f-1 strip, w-1 pane | 1 | 1 |
| 8 | Add a piece from the grid | "+" or stepper on the photo · f-1, w-1 · colour not shown | 1 | 1 |
| 9 | Add a chosen colour | card → product f-6 / w-5 → colour → "Add Sky" → back | 4 | 4 |
| 10 | Switch cart while on the product | picker "A Ramleela ⇕" on the f-6 tray, w-5 · the list it opens NOT DRAWN | 2 | 2 |
| 11 | Add a colour set | scan pop-up f-10 only · grid and product NOT DRAWN | — | — |
| 12 | Add to all carts | scan pop-up f-10 only · grid and product NOT DRAWN | — | — |
| 13 | Edit a party's cart from the catalogue: ± per colour, × a line | phone: double tap chip → cart card f-13 → ± or × → close · web: pane always open (w-1) | 1 + 1 each + 1 | 1 each |
| 14 | Scan a piece (Scan to add on) | scan in the search island (f-1) → camera, focus frame NOT DRAWN → pop-up f-10 → Add → back | 3 per piece | header scan (`web.jsx:42`) → NOT DRAWN |
| 15 | Pop-up buttons | four: Add pc · Add colour set · Pc to all carts · Set to all carts (`final.jsx:284`) | 1 | — |
| 16 | Voice search | orb · f-4 (island), w-4 (header) → listening line → results NOT DRAWN | 1 + speech | 1 + speech |
| 17 | Customer mode on | phone: ⋮ → side menu "Customer mode" (`screens2.jsx:10`), or the switch in the salesperson head (f-7) · web: header switch | 2 | 1 |
| 18 | Grid in Customer mode, carts still in hand | phone draft n-2 (strip and steppers stay) · web NOT DRAWN | — | — |
| 19 | Customer mode off | "Exit" on the n-2 banner (`mod-catalogue-tags.jsx:153`), one tap, no lock | 1 | NOT DRAWN |

First party, first piece in, as drawn: about 8 taps (phone) and 7–8 clicks (web),
plus a customer form that is not drawn, plus a missing way back on phone.
Each further party: 5–6 taps or clicks, plus typing.

### C · Finalise carts and send for approval

| # | Step | Where | Phone | Web |
|---|---|---|---|---|
| 1 | Open Carts | ⋮ → Carts → f-12 · Carts sub-menu → w-7 | 2 | 1 |
| 2 | Pick the party | chip row · f-12, w-7 | 1 | 1 |
| 3 | Review lines, ± per colour, × a line | f-12 by design · w-7 two columns | 0 | 0 |
| 4 | Sale book | f-12 card head · w-7 Summary pane | 0–1 | 0–1 |
| 5 | Due days (default 20, editable at noting, F:12) | read-only "due 20 d" (`final.jsx:330`, `web.jsx:162`, `web.jsx:239`) · edit NOT DRAWN | — | — |
| 6 | Priority 1–5, 3 neutral (B:90) | NOT DRAWN | — | — |
| 7 | Broker / agency, transport | NOT DRAWN on the cart (they sit on the Sales order's customer bar, `final.jsx:441`) | — | — |
| 8 | Note for approval | web only, w-7 pane · phone NOT DRAWN | — | 1 + typing |
| 9 | Submit this cart | f-12 "Submit for approval" · w-7 · w-1 pane "Submit" | 1 | 1 |
| 10 | Over the credit line: blocked in words, sent to admin in red (F:17) | NOT DRAWN | — | — |
| 11 | Submit all carts | NOT DRAWN | — | — |
| 12 | After submit: SO number, "awaiting approval", what happens to the chip | NOT DRAWN | — | — |
| 13 | Hand-off: Sales › Sale orders › Raised | Sales page (another review) | — | — |

Per party as drawn: phone 4 taps for the first, 2 for each next one.
Web 3 clicks, then 2.
The fastest drawn path skips the review: double tap chip → f-13 → Submit, 2 taps.
Either way steps 5–8 and 10–12 are missing,
so no drawn path produces a complete sale order.

---

## 2 · Friction found

| Where | Problem | Why it matters in the cabin |
|---|---|---|
| f-2 no active cart | No visible way to start a cart: no strip, no "+", and the basket opens nothing drawn | The first thing done when a party sits down has no button |
| f-1 strip, w-1 pane | The dashed "+" is cut off; in the w-1 pane the third chip (C · Nalli) is cut too | Same; a fourth party's chip will be hidden |
| f-1, w-1 header basket | Drawn with a count, but the BRD's menu of carts with a bold "+" (F:83) is not | The one-tap door to carts leads nowhere |
| f-12, w-7 "New customer" | A chip only: no pick-existing list, no 3-field form, no voice | Every new party stalls; ~30 % semi-skilled staff need few typed fields (R1) |
| f-12 phone Carts | No back and no island; the submit bar replaces the dock (`final.jsx:320`) | After checking a cart the salesperson cannot get back to browsing |
| Cart counts | Chip "4", product tray "4 pcs" (`final.jsx:206`), Carts "4 designs · 10 pcs", cart card "14 pcs", basket "8" | Nobody can tell what a number counts; the developer will copy one at random |
| f-1, w-1 grid "+" | Does not say which colour it adds; 2798 shows 2 while cart A holds Sky 2 + Purple 1 | The wrong colour goes in, found at dispatch |
| f-6, w-5 product | One colour per add; no colour set, no all carts; stepper and "Add Sky" both add | Parties often take the same set; taps repeat per colour per party |
| f-6, w-5 | No control opens the salesperson view (f-7, w-6) | Stock, Media and Set tag are unreachable in the drawn flow |
| f-7 phone | No add-to-cart and no cart strip (w-6 has "Add to cart A") | Checking stock means backing out to add |
| f-10 scan pop-up | Four add buttons | Owner, 6 Oct: two buttons + one "all carts" switch |
| f-10 | No "+ new cart" in its cart tabs; "Godown 12 · Reserved 3" with no customer-mode version (`final.jsx:301`); no production timeline for managers (F:85) | A scan for a new party dead-ends; stock shows to whoever looks at the phone |
| Scan camera | Focus frame, back, Scan-to-add toggle and the green top-bar scan state (F:84) not drawn; the toggle shows only behind f-10 (`final.jsx:291`) | The salesperson cannot see what a scan will do |
| Web scan | Scan button in the header field leads to nothing drawn | Desk scanning in the cabin has no screen |
| f-4, w-4 voice | Listening only: no "heard: …" chips, no results, no voice-to-cart | The 30 % who rely on voice cannot check what was understood |
| Phone Customer mode switch | Not on the grid; 2 taps via ⋮, or inside the salesperson view | It gets left off, so stock and internal tags show |
| n-2 Customer mode | "Exit" is one open tap; island keeps Home · CRM · Dispatch · Production; ⋮ opens every module | F:80: customer-role rights until switched off; a customer can walk into stock |
| n-2 Customer mode | Strip shows every party's name and count; "Materials" list still shows | Parties sharing a cabin see each other's orders |
| Role variants | Only a sale manager is drawn | A sale executive must not see cost / GM (f-7, w-6), credit ₹ (w-7), Analytics (f-9, R1) or godown stock in the pop-up (F:85) |
| f-12, w-7 finalise | Due days read-only; no priority, broker / agency, transport; no note on phone | The order leaves incomplete; Dispatch sorts on priority and due days |
| f-12, w-7, f-13 submit | No over-limit block, no "Submit all", no done state | 3 orders go one by one; a blocked one is found after the party leaves |
| f-13 cart card | Submit straight from the card skips book, due days, note; "Clear cart" beside it, no confirm drawn | One slip sends defaults or wipes a party's order |
| Other modules | Production, Dispatch and Studio docks set `noCart` (`mod-production.jsx:231`, `mod-dispatch.jsx:226`, `mod-studio.jsx:254`) | B:78: open carts should carry across modules |
| Finals vs drafts | f-1 vs n-1 chips row · f-5 vs n-4 filter sheet · f-7 vs n-5 salesperson head · w-1 vs nw-1 | Two answers for one screen |
| w-14 web viewer | Close, share, title and left arrow sit under the header (`web.jsx:341`, header `zIndex 5` at `web.jsx:97`) | On web the viewer has no visible way out |
| f-8 media centre | Side profiles counted per product (2 / 4), BRD asks 4 per colour (F:68); "7 of 12" sums to 7 of 11 (`final.jsx:252`) | The checklist under-asks: 4 colours need 16 side profiles |
| Make product (Production nw-41) | Sets one photo, the sample piece, as primary | New products reach the grid with one picture |

---

## 3 · Priority lists

### P1 · Must change

1. **Start a cart in one tap** · f-1, f-2, w-1 · draw the basket's cart menu with a bold "+ new cart" (F:83); pin "+" at the strip's left so it never clips; show it on f-2 too.
2. **New-cart sheet** · new · pick existing (search or voice) or new with name, contact, city only; sale book on the same sheet; land back on the grid with the cart active.
3. **Finalise fields** · f-12, w-7 · editable due days (default 20, F:12), priority 1–5 (default 3, B:90), broker / agency and transport prefilled from the customer, note on phone too.
4. **Credit-line block** · f-12, f-13, w-7 · red block in words before submit, "sent to admin" (F:17), while the party is still in the cabin.
5. **Submit all + submitted state** · f-12, w-7 · "Submit all 3", then SO numbers, "awaiting approval", chips cleared.
6. **Scan pop-up v2** · f-10 · Add piece · Add colour set + one "All carts" switch (R1); "+ new cart" in its tabs; a customer-mode version with no stock.
7. **Scan camera** · new · focus frame, back, Scan-to-add toggle, green top-bar scan when on (F:84); a web scan entry.
8. **Colour set and all carts off the scan** · f-6, w-5 · the same two buttons + switch on the product page.
9. **Customer mode that holds** · f-1, n-2 · a one-tap switch on the phone grid; a locked exit; island modules and ⋮ hidden while on (F:80).
10. **Sale-executive variant** · f-7, w-6, f-9, f-10, w-7 · no cost / GM, no Analytics tab, no godown stock in the pop-up, credit in words only.
11. **Door to the salesperson view** · f-6, w-5 · one control, hidden in Customer mode.
12. **Carts way back** · f-12 · a back button, or keep the island, so Carts returns to the grid.
13. **Upload centre** · from "Media" (f-7, w-6) and f-8 "Upload" · slots per colour, 4 side profiles per colour, AI shoot, model shoot, videos, set primary (F:66–71).
14. **Voice results** · f-4, w-4 · "heard: wine · lehenga · under ₹5,000" as removable chips over the results (R1: voice is required).

### P2 · Good to change

1. Grid "+" names its colour · f-1, w-1 · show the colour it adds; long-press for the others.
2. Label the cart counts · chips, f-6 tray, f-12, f-13, basket · "4 designs · 10 pcs" one way everywhere; the badge counts carts.
3. Cart card submit · f-13 · open the Carts review instead of submitting; put "Clear cart" behind ⋮ or a confirm.
4. Add on the phone salesperson view · f-7 · "Add to cart A" as on w-6, and keep the cart strip.
5. Letters only in Customer mode · n-2 · A · B · C on the strip (owner to confirm, Q1).
6. Drop "Materials" from the customer's lists · n-2.
7. Web Customer mode state · w-1 · draw it.
8. Carts across modules · Production, Dispatch, Studio docks · show the strip (B:78; App shell to decide).
9. One answer per screen · f-1/n-1, f-5/n-4, f-7/n-5, w-1/nw-1 · pick one, retire the other.
10. Web viewer close · w-14 · lift the viewer above the header, or move close and title below it.
11. Media checklist per colour · f-8 · 4 side profiles per colour; fix "7 of 12".
12. Material pictures in the recipe · f-8 shows "MAT" boxes (`final.jsx:257`) · show the swatch as Production does.
13. Viewer head · f-11 · the name is large and the number small (`screens2.jsx:155`); the design number is the head.
14. Basket with no cart · f-2 · no glow and no count when no cart is active (`final.jsx:45` defaults to 8).
15. Empty photo boxes · f-12, w-7 (3661, 1457) · say "No photo yet".
16. Deploy for reading on phone · Production n-35 · a labelled button and a deploy sheet (pcs, colours).

### P3 · Keep as is

1. Picture grid: photo, number as head, price, colour bars · f-1, w-1.
2. Chip: single tap makes it active, double tap opens the cart card · f-1, f-13 (R1).
3. Cart card over the catalogue, ± per colour, × per line · f-13.
4. Web cart pane always open beside grid and product · w-1, w-5.
5. Carts grouped by design with colour lines and totals · f-12, w-7.
6. Sale book switch on the cart · f-12, w-7.
7. Hinglish note for approval · w-7.
8. Voice orb in the island and the header · f-4, w-4 (R1).
9. Full-screen viewer, colours first then media · f-11.
10. One filters & sort button, save as list · f-5.
11. Salesperson view opens on Stock & production, with Media and Set tag in the head of every tab · f-7.
12. Sample on the grid at TBD · f-1 (4566), matching Production's deploy for reading.
13. Customer mode banner · n-2 (keep the banner; fix the exit).
14. Web Customer mode as a header switch · w-1.
15. New sample with sketch, reference and first-piece photos · Production n-38, nw-38.
16. Make product carries number, colours, photo and tags into the master · Production nw-41.

---

## 4 · Missing screens, in draw order (phone + web)

1. Cart menu from the header basket: carts with counts, bold "+ new cart" (phone sheet · web popover).
2. New cart: pick a customer (search, voice) or new (name, contact, city), sale book (phone sheet · web pane).
3. Scan camera: focus mode, back, Scan-to-add on, green top-bar scan (phone) · web scan entry (USB or camera).
4. Scan pop-up v2: two buttons + "All carts" switch + "+ new cart", and its customer-mode version (phone · web).
5. Product page add: colour set, all carts, and the door to the salesperson view (f-6, w-5 updates).
6. Customer mode: grid with a locked exit and hidden modules (phone n-2 promoted · web new).
7. Voice results over the grid with "heard: …" chips (phone · web).
8. Cart finalise: due days, priority, broker / agency, transport, note (phone · web).
9. Submit blocked: over the credit line, in words, sent to admin (phone · web).
10. Submit all + submitted state (phone · web).
11. Sale-executive variants of the salesperson view, scan pop-up and carts (phone · web).
12. Upload centre for a product, shared with Studio › Upload centre (phone · web).

---

## 5 · Hand-offs

**In (other modules must give Catalogue):**
- Production › Samples: new sample with photos (n-38, nw-38) → "Deploy for reading" (web only) makes the SAMPLE · TBD card → "Make product" (n-40, nw-41) makes the product with one photo → Costing "Approve · sync" (n-42, nw-42) sets the grid price.
- Studio › Upload centre and Photoshoots (buttons only today): one upload screen with two doors, the product's "Media" and Studio's header.
- Hub › Master views (not on the board): the customer master (credit line, broker, agency, transport) feeds the cart; a product master for a ready-bought design.
- App shell: the cart strip across modules; who is logged in decides sale executive vs manager; the phone side menu is today the only door to Carts and Customer mode; the web search pane's "New sale order" and "New customer" (`mod-appshell.jsx:142`) should open the same new-cart sheet.

**Out (Catalogue gives to others):**
- Sales › Sale orders › Raised: book, due days, priority, broker, agency, transport, note, raised by. The opened order w-10 shows book, due days, broker and transport; f-18 shows broker and transport only; neither shows priority or the note.
- Home › Approvals (not on the board): the sale order card, and the over-limit escalation in red to admin.
- Dispatch: priority and due days sort Ready and Pending; "Held" after due days lapse (F:12).
- CRM / Hub: a customer made in the cabin with name, contact, city needs completing later (broker, transport, credit line).

---

## 6 · Questions for the owner

1. **Customer mode** · lock the exit (hold 2 s or a PIN), hide the module island and side menu, and show parties as letters only (A · B · C)?
2. **Sale executive** · confirm: no cost / GM, no Analytics, no godown stock in the scan pop-up, credit in words only, never ₹?
3. **New customer in the cabin** · name, contact, city only, spoken if possible ("new cart, Ramleela, Surat")? Who fills broker, transport and credit line later?
4. **Submit from the cart card** · allow it straight from the floating card, or always through the Carts review?
5. **Media upload** · who uploads a product's pictures: production, a studio person, or the salesperson from the product page?
6. **Scan loop** · after "Add", does the camera stay open for the next piece, or go back to the grid as F:84 says?

---

## 7 · What changed from the first draft

- Wrong: "a 4th cart chip is cut". The board has three carts; what is cut is the dashed "+" (f-1) and, in the w-1 pane, the third chip.
- Wrong: "phone new-sample form NOT DRAWN". Production n-38 draws it, with photos first.
- Wrong: "Upload is 2 taps (f-8)". "Media" sits in the salesperson head on every tab, 1 tap; the real block is that the salesperson view has no door.
- Reframed: cost / GM and Analytics are not shown "to every salesperson"; the board draws a sale manager, and the gap is the missing sale-executive variant. Customer mode on phone is 2 taps, not 3; every count was redone.
- Added: Carts has no way back (f-12); f-2 has no start-cart control; cart counts disagree; carts don't carry across modules; the web viewer hides its close (w-14); the media checklist under-asks; Make product sets one photo; no phone "Deploy for reading"; voice results moved to P1.
- Checked: no Catalogue screen that matters is defined but unregistered (only older copies: `ScreenGrid2`, `ScreenScan2` in the archive; `WebCarts2` at `mod-appshell.jsx:74`).
