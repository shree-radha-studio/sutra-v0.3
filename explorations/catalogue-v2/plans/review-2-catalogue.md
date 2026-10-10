# Review 2 · Catalogue (10 Oct 2026)

A product and UX pass over the Catalogue page (`board.html?m=catalogue`): finals Catalogue + Carts, drafts
"Catalogue · tags". Review only; nothing on the board was changed.

Walked as the salesperson in a cabin, phone and web, against the BRD (`brd-final.txt` F), the older BRD
(`uploads/Business Req.txt` B), the owner answers of 6 Oct (`review-1`, R1) and the during-UI rules (DU).

Frames: finals `f-` phone, `w-` web (global ids). Drafts on this page `n-` phone, `nw-` web.

---

## 1 · Flows walked

Counts start from app open on Home. Typing is not counted as taps.

### A · Add a new design to the catalogue

Who: production manager or merchandiser (Production), then whoever shoots and uploads media. Not the salesperson.

| # | Step | Where | Phone | Web |
|---|---|---|---|---|
| 1 | Open Production › Samples | `ScreenPSamples`, `WebPSamples` (Production page) | 2 | 2 |
| 2 | New sample, add a sketch or photo | `WebPSampleNew` (mod-production-web3.jsx:65) · phone new-sample form NOT DRAWN | 2 + typing | 2 + typing |
| 3 | Sample moves (issue / receive) | `ScreenPSample`, `WebPSample` | many | many |
| 4 | Deploy for reading (1–2 pcs, TBD price) | `WebPSample` (mod-production-web3.jsx:118) | 1 | 1 |
| 5 | Sample shows in Catalogue as "Sample · TBD" | f-3 (4566), w-1 | — | — |
| 6 | After 15 days: Make product, first order | `ScreenPFinalise`, `WebPFinalise` (mod-production-phone2.jsx:210, web3.jsx:128) | 2 | 2 |
| 7 | Costing: approve price, sync to catalogue | `WebPFinalise` "Approve ₹3,495 · sync" | 1 | 1 |
| 8 | Open the product in Catalogue | f-6 / w-5 | 3 | 3 |
| 9 | Switch to salesperson view | NOT DRAWN (no control on f-6 or w-5) | ? | ? |
| 10 | Recipe & media tab → "Upload" | f-8 (final.jsx:261) · w-6 "Media" | 2 | 1 |
| 11 | Upload centre: primary per colour, 4 side profiles, AI shoot, model shoot, videos, set primary | NOT DRAWN (also only a button in Studio) | — | — |
| 12 | Product is live with full media | — | — | — |

Total to a fully shot product: about 16+ taps across two modules, with step 11 missing. A design bought ready
(Ready Pc Purchase book, F:16) has no drawn path into the catalogue at all; it never passes through Samples.

### B · Multi-carts in the cabin (3–4 parties)

| # | Step | Where | Phone | Web |
|---|---|---|---|---|
| 1 | Open Catalogue | island / rail · f-1, w-1 | 1 | 1 |
| 2 | Start a cart: "+" on the cart strip | `CartChips` has a dashed "+" (themes2.jsx:42) but the strip clips it on phone (f-1) and in the web pane (w-1); visible only on w-7 | hidden | 2 (Carts, then +) |
| 2a | …or header cart icon → cart menu with bold "+ new cart" (F:83) | NOT DRAWN | 2 | 2 |
| 3 | Pick a customer or create one (name, contact, city) | NOT DRAWN (only a "New customer" chip on f-12, w-7) | 2 + 3 typed fields | 2 + typing |
| 4 | Pick sale book: In-cabin / WhatsApp | after creation only, on f-12 / w-7 | 1 | 1 |
| 5 | Repeat 2–4 for each party | — | ~6 each | ~5 each |
| 6 | Switch the active cart | single tap on a chip (f-1 strip, w-1 pane) · 4th party's chip clipped on phone | 1 (+ scroll) | 1 |
| 7 | Add a piece to the active cart | "+" on the grid card (f-1, w-1) · which colour it adds is not shown | 1 | 1 |
| 8 | Add a chosen colour | card → product f-6 → colour → "Add Sky" → back | 4 | 3 (w-5) |
| 9 | Add a colour set (all colours) while browsing | NOT DRAWN (scan pop-up only) | — | — |
| 10 | Add to all carts while browsing | NOT DRAWN (scan pop-up only) | — | — |
| 11 | Edit a party's cart from the catalogue: qty per colour, remove | double tap chip → cart card f-13 → +/− or × | 2 | 1 (pane always open, w-1) |
| 12 | Scan to add: scan → camera → Scan-to-add on → pop-up | camera and focus mode NOT DRAWN · pop-up f-10 | 3 | web scan NOT DRAWN |
| 13 | In the pop-up: Add piece / Add colour set / all carts | f-10 still shows four buttons (final.jsx:284) | 1–2 | — |
| 14 | Voice search: orb → speak → results | f-4, w-4 listening · results state NOT DRAWN | 1 + speech | 1 + speech |
| 15 | Customer mode on | phone: no switch on the grid; only in the salesperson view head (f-7) or side menu (screens2.jsx:10) · web: header switch (w-1) | 3 | 1 |
| 16 | Grid in Customer mode, carts still usable | phone draft n-2 only · web NOT DRAWN | — | — |
| 17 | Customer mode off | "Exit" on the n-2 banner, one tap, no lock | 1 | NOT DRAWN |

### C · Finalise carts and send for approval

| # | Step | Where | Phone | Web |
|---|---|---|---|---|
| 1 | Open Carts | header cart icon or ⋮ (not drawn which) → f-12 · web sub-menu "Carts 3" → w-7 | 2 | 1 |
| 2 | Pick a party | chip row f-12 / w-7 | 1 | 1 |
| 3 | Review lines, qty per colour | f-12, w-7 | 0 | 0 |
| 4 | Sale book In-cabin / WhatsApp | f-12 head, w-7 pane | 1 | 1 |
| 5 | Due days (default 20, editable, F:12) | read-only "due 20 d" (final.jsx:330, web.jsx:162) · edit NOT DRAWN | — | — |
| 6 | Order priority 1–5 (B: Dispatch sort) | NOT DRAWN | — | — |
| 7 | Broker / agency, transport | NOT DRAWN (exist on the customer record, final.jsx:441) | — | — |
| 8 | Note for approval | web only (w-7) · phone NOT DRAWN | — | 1 + typing |
| 9 | Submit this cart | f-12 / f-13 "Submit for approval" · w-7 | 1 | 1 |
| 10 | Submit all carts | NOT DRAWN | — | — |
| 11 | Over credit line: red block in words, escalated to admin (F:17) | NOT DRAWN | — | — |
| 12 | After submit: "SO-3456 raised, awaiting approval", cart closes, next cart becomes active | NOT DRAWN | — | — |
| 13 | Hand-off to Sales › Sale orders "Raised" | Sales page | — | — |

Best case per party: phone 5 taps, web 4 clicks, but steps 5–7, 10–12 are missing, so the drawn flow cannot
produce a complete sale order.

---

## 2 · Friction found

| Where | Problem | Why it matters in the cabin |
|---|---|---|
| f-1, w-1 cart strip / pane | The "+" for a new cart is clipped off; a 4th cart chip is cut too | The first thing a salesperson does when a party sits down has no visible button |
| Header cart icon (f-1, w-1) | Opens nothing drawn; BRD's cart menu with bold "+" (F:83) missing | Same; and nobody knows what the badge "8" means (pieces? carts?) |
| New customer (f-12, w-7) | Chip only; no form, no pick-existing list, no voice | Every new retailer is stuck at step one; 30 % semi-skilled users need few typed fields |
| f-1 grid card "+" | Does not say which colour it adds | Wrong colour goes into the order; found only at dispatch |
| f-6 product · customer view | One colour per add; no colour set, no "all carts" | 3–4 parties often take the same set; salesperson repeats the tap per colour per party |
| f-10 scan pop-up | Four buttons (Add pc, Add colour set, Pc to all carts, Set to all carts) | Contradicts owner answer 1 (6 Oct): two buttons + one "all carts" switch |
| f-10 scan pop-up | Shows "Godown 12 · Reserved 3"; no customer-mode version | Stock is visible to customers looking at the phone |
| Scan camera | Focus frame, Scan-to-add toggle, green outline on the top-bar scan button not drawn (F:84) | Salesperson cannot tell what a scan will do |
| f-1 phone grid | No Customer mode switch; reached through side menu or salesperson view | Turned on rarely, so stock and cost leak to the customer |
| n-2 Customer mode | "Exit" is one open tap, no lock or hold | A customer can switch it off and see stock, cost, other parties' carts |
| n-2 Customer mode | Cart chips show every party's name and count | Parties sharing a cabin see each other's orders |
| f-6 / w-5 → f-7 / w-6 | No drawn control to go from customer view to salesperson view | The salesperson view (stock, media, upload) is unreachable |
| f-7, w-6 head | "cost ₹2,610 · 40 % GM" shown to every salesperson | Breaks the money rule: sale executives see catalogue prices only (DU, CRM rule) |
| f-9 Analytics & orders tab | Shown to every salesperson | Owner, 6 Oct: analytics for sale managers and above only |
| f-7 salesperson view, phone | No "Add to cart" (web w-6 has "Add to cart A") | Salesperson looking at stock must back out to add |
| f-12, w-7 carts | Due days read-only; no priority, broker, transport | Sale order is incomplete; Dispatch sorts on priority and due days |
| f-12, w-7 carts | No "Submit all"; no over-limit block; no after-submit state | 3–4 orders at the end of a sitting go one by one, and a blocked one is found after the customer leaves |
| f-13 cart card | "Clear cart" sits beside "Submit", same size, no confirm drawn | One slip wipes a party's whole order |
| f-13 cart card | Submit goes straight from the card, skipping due days and book | Orders leave with defaults nobody looked at |
| w-7, f-12 | "30 days credit · limit ₹1.2L" to every salesperson | Credit figures are for sale manager, accounts, admin (DU CRM rule) |
| f-4, w-4 voice | Only the listening state; no results or "heard: …" chips | Semi-skilled users cannot check what was understood |
| f-5 vs n-4, f-1 vs n-1, f-7 vs n-5 | Two answers each for filters sheet, grid chips, salesperson head | The developer gets two designs for one screen |
| Web scan | No web scan pop-up (USB / camera) | Desk billing in the cabin cannot scan |

---

## 3 · Priority lists

### P1 · Must change

1. New cart start · f-1, w-1, header cart icon · show the "+" always (pin it at the strip's left) and draw the cart menu with bold "+ new cart" (F:83).
2. Pick / create customer sheet · new · name, contact, city only, pick-existing by search or voice, then sale book In-cabin / WhatsApp (B:79–81).
3. Scan pop-up · f-10 · cut to Add piece · Add colour set + one "All carts" switch (owner 6 Oct); hide godown / reserved in Customer mode.
4. Cart finalise fields · f-12, w-7 · editable due days (default 20), priority 1–5 (default 3), broker / agency, transport, note on phone too.
5. Credit-line block · f-12, f-13, w-7 · red block in words on submit, "sent to admin", before the customer leaves (F:17).
6. Submit all + submitted state · f-12, w-7 · one "Submit all 3" and a done screen listing SO numbers and next active cart.
7. Customer view → salesperson view switch · f-6, w-5 · draw the control (hidden in Customer mode).
8. Money and analytics by role · f-7, w-6, f-9 · sale executive variant: no cost / GM, no Analytics tab.
9. Customer mode on phone · f-1 · a one-tap switch in the top bar (where "Sales" sits) and a locked exit (hold or PIN).
10. Upload centre · from f-8 "Upload" and w-6 "Media" · draw it (F:66–71); it is the only way a design gets its pictures.
11. Scan camera · new · focus frame, Scan-to-add toggle, green state on the top-bar scan (F:84).

### P2 · Good to change

1. Grid "+" · f-1, w-1 · show the colour it adds (long-press for a colour picker).
2. Colour set and "all carts" from the product page · f-6, w-5 · same two buttons + switch as the scan pop-up.
3. Customer mode cart strip · n-2 · show letters only (A · B · C), not party names.
4. Clear cart · f-13, w-7 · move to a ⋮ or ask to confirm; keep Submit alone as the strong button.
5. Cart card submit · f-13 · send to the Carts review instead of submitting straight from the card.
6. Add to cart on phone salesperson view · f-7 · match w-6.
7. Voice results · f-4, w-4 · draw "heard: wine · lehenga · under ₹5,000" as removable chips over the grid.
8. Header cart badge · f-1 · say what it counts (carts or pieces).
9. Credit and limit on carts · f-12, w-7 · role variant: sale executive sees "credit OK / over limit" in words, no ₹.
10. Merge or retire drafts · n-1/nw-1, n-4, n-5/nw-3 vs f-1, f-5, f-7 · pick one each.
11. Cart strip with 4+ carts · f-1 · show "+1" overflow instead of a cut chip.
12. Web Customer mode state · w-1 · draw it.
13. Phone new-sample form · Production · photo first, so a sample has a picture before it reaches the catalogue.

### P3 · Keep as is

1. Picture grid with photo, number, price, colour bars · f-1, w-1.
2. Active cart chip: single tap activates, double tap opens the card · f-1, f-13 (owner 6 Oct).
3. Cart card over the catalogue, qty per colour, × per line · f-13.
4. Web cart pane always open beside the grid · w-1, w-5.
5. Carts grouped by design with colour lines and totals · f-12, w-7.
6. Sale book switch on the cart · f-12, w-7.
7. Voice orb in the island and header · f-4, w-4 (owner 6 Oct).
8. Full-screen viewer, colours first then media · f-11, w-14.
9. Single filters & sort button, save as list · f-5.
10. Salesperson view opening on Stock & production · f-7.
11. Sample on the grid with "TBD" price · f-3 (matches Production's deploy for reading).
12. Customer mode banner on the grid · n-2 (the banner itself; fix the exit).

---

## 4 · Missing screens (draw order, phone + web)

1. Cart menu from the header cart icon, with "+ new cart" (phone sheet · web popover).
2. New cart: pick or create customer (name, contact, city), sale book (phone sheet · web pane).
3. Scan camera, focus mode, Scan-to-add on (phone) · web scan entry (USB / camera) with the pop-up.
4. Scan pop-up v2: two buttons + "All carts" switch, plus its Customer-mode version (phone · web).
5. Product page: colour set and all-carts add (phone f-6 · web w-5 update).
6. Grid in Customer mode with locked exit (phone n-2 promoted · web new).
7. Cart finalise: due days, priority, broker / agency, transport, note (phone · web).
8. Submit blocked: over credit line, in words (phone · web).
9. Submit all + submitted state (phone · web).
10. Salesperson view, sale executive variant (no cost, no Analytics tab) (phone · web).
11. Upload centre for a product: slots per colour, side profiles 4, AI shoot, model shoot, videos, set primary (phone · web).
12. Voice results over the grid (phone · web).

---

## 5 · Hand-offs

**In (other modules must show):**
- Production › Samples: a phone new-sample form with "Add photo"; "Deploy for reading" makes the Catalogue sample card; "Make product" + Costing "Approve · sync" sets the price the grid shows.
- Studio › Upload centre (only a button now): either it is the same screen as the product's upload centre, or the product's "Upload" opens it. One screen, two doors.
- Hub / masters (no page yet): customer master with credit line, broker, agency, transport (feeds the cart); product master for a ready-bought design (no sample).
- App shell: the cart strip carries across modules (B:78); top-bar role label and Customer mode switch on phone; login decides sale executive vs manager variants.

**Out (Catalogue gives to others):**
- Sales › Sale orders "Raised": a new order with book, due days, priority, broker, transport, note, raised by. The Sales page must show these on the opened order.
- Home › Approvals: the sale order approval card, and the over-limit escalation in red.
- Dispatch: priority 1–5 and due days drive Ready / Pending sort; "Held" after due days lapse (F:12).

---

## 6 · Questions for the owner

1. **Customer mode exit** · lock it (hold 2 s, or PIN), or is one tap fine?
2. **Party names in Customer mode** · when 3–4 parties share a cabin, should the cart strip show letters only?
3. **New cart from a scan or voice** · can the salesperson say "new cart, Ramleela, Surat" and skip typing, with the phone filled in later?
4. **Cost and credit on screen** · sale executives see neither cost / GM nor credit ₹ (only "over limit" in words)? Confirm.
5. **Submit from the cart card** · allow it straight from the floating card, or always through the Carts review (due days, priority)?
6. **Media upload** · who uploads a product's pictures: production, a studio person, or the salesperson from the product page?
