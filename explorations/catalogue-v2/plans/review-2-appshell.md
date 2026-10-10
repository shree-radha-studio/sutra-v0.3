# Review 2 · App shell (10 Oct 2026)

Reviewed at extra-high effort, 10 Oct 2026

The shell is the frame every module shares.
On phone: top bar, search island, cart strip, island with the orb, side menu.
On web: rail, sidebar, tab strip, header v2, right pane.
This pass walks the owner's main flows through the mock-ups, role by role, and counts the taps.
Review only. Nothing on the board was changed.

**The headline.** The cart and dispatch flows are fast where they are drawn.
Approvals have no door: no Home › Approvals, no count on the bell, no badge anywhere.
A sale manager finds a waiting order only by opening Catalogue › Sale orders › Raised.

**How to read the ids.** Finals keep one id on every page: `f-` phone, `w-` web.
Drafts count per page: `dispatch nw-20` is frame nw-20 on `board.html?m=dispatch`.
Code is cited as `file:line` in `explorations/catalogue-v2/`.

**How taps are counted.** From the role's main screen as drawn (Catalogue grid for sales, Dispatch for the warehouse).
Add 1 if the app opens on Home; Home is not drawn.

Sources: board at `8f1d8f7`, contact sheets and frame shots of App shell, Catalogue, Sales, Dispatch, CRM, Production,
Studio; `design/SUTRA-DESIGN-SCHEMA.md`, `design/SUTRA-SCREEN-FLOW.md`, `plans/review-1-catalogue-appshell-dispatch.md`,
BRD `design-system/research/brd-final.txt` (F) and `design-system/uploads/Business Req.txt` (old BRD).

---

## 1 · Paths walked

| # | Task · role | Phone taps | Web clicks | Frames | Not drawn |
|---|---|---|---|---|---|
| 1 | Start a cart for a new customer · salesperson | 2 + sheet (swipe the strip, tap +) | 2 + sheet (Carts, +) | f-1, f-2, f-12, w-1, w-7 | NOT DRAWN: start-cart sheet (pick or add customer, sale book). NOT DRAWN: what the cart button opens. |
| 2 | Add a piece to the active cart · salesperson | 1 (+ on the photo) | 1 | f-1, w-1 | Scan route: camera and Scan-to-add NOT DRAWN (f-10 is the pop-up only). |
| 3 | Switch the active cart · salesperson | 1 in Catalogue | 1 in Catalogue | f-1, w-1 | Outside Catalogue NOT DRAWN: no strip or basket on phone in CRM, Dispatch, Production, Studio. |
| 4 | Open a party's cart, edit it from the catalogue · salesperson | 1 double tap, then 1 per change | 0 (pane shows it) or 1 (chip) | f-13, w-1 | — |
| 5 | Submit carts, 3 parties in the cabin · salesperson | 6 (double tap + Submit, per cart) | 3 to 6 | f-13, f-12, w-1, w-7 | NOT DRAWN: credit-limit block, "sent for approval" result. No "submit all". |
| 6 | **Approve an incoming sale order** · sale manager, admin, accounts | 5 (Catalogue, ⋮, Sale orders, order, Approve) | 3 to 4 (rail Catalogue, Sale orders, order, Approve) | f-14, f-15, f-18, w-8, w-10 | NOT DRAWN: Home › Approvals, a count on bell or Home, the notification. Nothing says an order is waiting. |
| 7 | Open Dispatch Ready · dispatch manager | 2 (Dispatch, Ready; Pending comes first on phone) | 1 | dispatch n-1, nw-20 | — |
| 8 | Start packing a customer, then 3 to 4 at once · dispatch manager (desk), packer (phone) | 3 to 4 (Dispatch, Packing, customer, box); switch customer 1 | 2 (Dispatch, PACK); switch customer 1 | dispatch nw-20, nw-3, n-5, n-6 | — |
| 9 | Print invoice and transport slip, e-way bill · dispatch manager | reprint 4 (Dispatch, Billed, invoice, Re-print) | from the terminal 5 (review, done, select, close shipment, print); reprint 3 to 4 | dispatch nw-5 to nw-8, nw-9, n-12 | E-way bill NOT DRAWN anywhere. |
| 10 | "Where is my order?" · salesperson (phone), sale manager (desk) | 4+ (CRM, Customers, party, Shipments) | 2 + typing (search, row) | appshell nw-2, CRM dossier | NOT DRAWN: phone search results; one order's journey (raised → approved → packed → billed → shipped, LR no). |
| 11 | Approve a sale return or credit note · accounts | NOT DRAWN | NOT DRAWN | dispatch nw-18, nw-19 say "accounts approves" | Home › Approvals. |

---

## 2 · Friction found

| Where | Problem | Why it matters |
|---|---|---|
| Approvals · f-15, f-18, w-8, w-10 | The only path is Catalogue › Sale orders › Raised. No count anywhere. | Accounts and admin never open Catalogue. Orders wait unseen. BRD F:46 asks for one Approvals button on Home. |
| Bell · `web.jsx:104`, every web frame | Bell has no count and opens nothing drawn. Phone has no bell at all. | Red alerts and approvals get missed. |
| Cart basket outside Catalogue · crm n-1, production n-1, studio n-1, dispatch n-1 | Phone top bars in other modules drop the basket and the cart strip. Web keeps the basket, but what it opens is not drawn. | Old BRD line 78: open carts carry along in all modules. A salesperson checking stock in Production loses the carts. |
| "+ new cart" · f-1, f-13, w-1 | The dashed + is last in the chip row and sits past the edge (`themes2.jsx:42`). With no cart (f-2) there is no strip at all. | Starting a cart is the first step of every sale. It is hidden. |
| Cart badge · `final.jsx:45`, f-2 | Badge says 8 while there are 3 carts. It glows even when no cart is active (f-2). | A wrong number teaches people to ignore the glow. |
| Header overflow · sales w-10, dispatch nw-20, production nw-1, studio nw-1 | Edit, Approve, print and share, or 7 to 8 sub-menus, or Tune, push search to "Se…" and the orb off the edge. | The orb is required (owner, 6 Oct). Voice users lose it on desk screens. |
| Customer mode on · catalogue n-2, `web.jsx:101` | Web switch is never drawn on (`ModeSwitch` never gets `on`). Phone on-state is a thin banner with a one-tap Exit, while the island still offers CRM, Dispatch, Production. | A customer holding the phone can leave the catalogue or switch the mode off. |
| Roles · dispatch n-5, every frame | Every phone shows all five modules + More. The rail shows all eight. Dispatch web headers glow the cart basket. | BRD F:26–39: packer sees Dispatch and scanning only; customer sees catalogue and carts only. |
| Firm · rail foot, appshell nw-1 footer | Firm logo sits on the rail. No selector. Search says "Searches this firm", but no screen shows how to change firm. | Admin works across 6 firms and needs a selector at the top left (F:28). |
| Catalogue sub-menus on phone · f-1, f-14 | Carts and Sale orders sit behind ⋮ → side menu. The per-module dropper is not drawn. | The sale manager's two most used screens are the deepest. |
| Sale orders on phone · f-15, f-18 | These screens drop the top bar (logo, basket, search) and the cart strip. | No way to reach a cart while checking an order. |
| Side menu lists · `screens2.jsx:8` | Sub-menu names differ from the web header and phone scroller in five modules. Catalogue lists Direct scan, Recognise and Customer mode as sub-menus. | The developer gets three answers. SCREEN-FLOW says actions are not navigation. |
| Dispatch web shell · dispatch nw-1 to nw-19 | Older `DShell` + `WebHeader2` (`mod-dispatch-web.jsx:7`): 56 px header, head reads "Dispatch", no Pending button (nw-2 marks Ready while showing Pending, line 57), LIVE in the header. | Two shells for one module. The developer may build the wrong one. |
| Rail, light theme · w-1, every light web frame | Active module is a maroon icon on the espresso rail, about 1.3 : 1. | People cannot see which module they are in. |
| Module order · `final.jsx:10` vs `web.jsx:12` | Island: Dispatch before Production. Rail and side menu: Production before Dispatch. | Muscle memory breaks between phone and desk. |
| Role label · `final.jsx:88`, `mod-dispatch.jsx:213`, `mod-production.jsx:222`, `mod-studio.jsx:244` | Top bar reads Sales, Dispatch, Production or Design by module. The side menu says Sale manager. | It looks like the user's role but changes with the module. |
| Scan state · `final.jsx:95` search bar, `web.jsx:40` | Scan is always maroon. The Scan-to-add green state (F:84) is not drawn. | The user cannot tell whether a scan opens the page or adds to carts. |
| LIVE / offline · dispatch nw-1, nw-20, n-1 | LIVE sits in three places (header, tab strip, top bar). OFFLINE exists in code (`mod-dispatch.jsx:227`) but on no frame. | Warehouse Wi-Fi drops. Packers need to know what still works. |
| Two orbs · studio nw-1 | Tune uses the orb mark (`mod-studio-web.jsx:17`) beside the real orb. | Which one listens? |
| Three scan doors · production n-1 | QR button in the top bar, maroon scan in the field, "Scan a job" in the page. | Too many same-weight doors for one job. |

---

## 3 · Priority lists

### P1 · Must change

1. **Approvals door** · f-15, f-18, w-8, w-10 · Draw Home › Approvals (phone + web); show its count on the Home island item, the Home rail icon and the bell.
2. **Carts travel** · crm n-1, production n-1, studio n-1, dispatch n-1 · Keep the basket in every top bar for sales roles; draw its drop (open carts, bold + New cart) on phone and web.
3. **Start a cart** · f-1, f-2, f-13, w-1 · Put "+ New cart" first in the strip and the pane so it never clips; draw the start-cart sheet (customer pick or new: name, contact, city; sale book In-cabin / WhatsApp).
4. **Header fits** · sales w-10, dispatch nw-20, production nw-1, studio nw-1 · Pin the orb; move Edit, Approve, print, share into the page or pane; fold sub-menus past six into "More ▾"; search shrinks to an icon first.
5. **Customer mode on** · catalogue n-2, w-1 · Draw the on-state on phone and web: tinted band under the header, island and rail cut to Catalogue + Carts, exit by PIN or long-press.
6. **Role shells** · dispatch n-5, every frame · Draw the packer phone (Home + Dispatch, no basket), the customer and the sale executive; hide the basket for non-sales roles.
7. **One Dispatch shell** · dispatch nw-1 to nw-19 · Move the 8 Sep band onto `WebShell3`, as nw-20 to nw-23 already are; add Pending; LIVE in the tab strip.
8. **Login and firm selector** · not on the board · Draw sign-in → firm pick (admin: all firms) and a top-left firm switch for admins.

### P2 · Good to change

1. Bell · every web frame · Add a count; on phone add a bell (or the Home badge); draw the notifications feed.
2. Side menu · `screens2.jsx:8` · Use the SCREEN-FLOW lists; drop Direct scan, Recognise and Customer mode as sub-menus; add Catalogue itself.
3. Phone dropper · f-1 · Draw ⋮ as the module's floating sub-menu (Catalogue · Carts · Sale orders); keep the all-modules sheet (f-14) for Home and More.
4. Sale orders on phone · f-15 to f-18 · Keep the top bar and the cart strip.
5. Cart badge · f-2, `final.jsx:45` · Count open carts; no glow when none is open.
6. Module order · island, rail, side menu · One order everywhere.
7. Dispatch phone scroller · dispatch n-1, `mod-dispatch.jsx:212` · Start with Ready, as on web.
8. Role label · phone top bars · Show the user's role on every module, or drop it; a tap opens the user menu.
9. Rail active state · w-1, `web.jsx:54` · White icon on a maroon tile, or a lighter accent, in light theme.
10. Scan button · phone and web headers · Green ring while Scan-to-add is on (draw with Catalogue's camera screen).
11. LIVE · Dispatch · One place (tab strip right on web, top bar on phone); draw OFFLINE with what still works.
12. Studio Tune · studio nw-1 · A sliders icon, not the orb mark.
13. Production phone · production n-1 · One scan door, not three.
14. Web sidebar top · w-3 · Name, designation and firm under the logo (F:41), as the phone side menu does.
15. Customer mode on the phone grid · f-1 · A one-tap switch in the header, not only in the side menu and salesperson view.
16. Approval card · f-18, w-10 · When the queue is drawn, add what F:46 lists: GR ratio, FY billing, overdue, pcs in stock, tier appetite, orders vs payments, broker agency graph.

### P3 · Keep as is

1. Agent orb at the right end of the island and the header, on every module.
2. Rail + expanded sidebar with collapsible sub-menus (w-3).
3. Phone side menu: user on top, "here" marker, theme · profile · settings · sign out at the foot (f-14).
4. Header v2 on `WebShell3`: path above the head, sub-menu at a fixed x, `ViewTabs` for sub-sub.
5. Tab strip naming the open object, with + and a count.
6. Right pane with a title and a collapse handle.
7. Phone module scroller under the search (CRM, Dispatch, Production, Studio).
8. Cart chip: tap makes it active, double tap opens the cart card (f-13).
9. Search pane: scopes, recent, for you, quick actions, matches by section (appshell nw-1, nw-2).
10. Packing customer strip on phone and desk (dispatch n-5, nw-3).
11. Approve inside the order pane (w-8), one click once the queue sends people there.
12. Full-screen packer scan without the island (dispatch n-6).

---

## 4 · Missing shell screens

In draw order. Each one phone + web, light + dark.

1. **Sign in and firm selector** · admin sees "All firms".
2. **Home dashboard per role** · quick links with counts. The island's first item opens nothing today.
3. **Home › Approvals** · queue (sale orders · sale returns · purchase inward · overages · costing) and the sale-order approval card, with "for inspection" escalation.
4. **Notifications feed** from the bell · BAU · daily metrics · red alerts.
5. **Cart button drop and start-cart sheet** · open carts, bold + New cart; draw it over a Dispatch screen to prove carts carry along.
6. **Customer mode on, locked** · the grid with the band, the cut island and rail, the exit step.
7. **Role shells** · packer phone, customer phone, sale executive island and rail.
8. **Header with long sub-menus** · "More ▾" overflow and actions moved into the page (Dispatch Ready, Production Overview, opened sale order).
9. **User menu** · profile, show / hide modules, theme, firm, sign out; web from "RM" on the rail, phone from Profile.
10. **Phone search** · typing → matches by section (designs with photos, orders with status, customers); voice lands in the same sheet.
11. **Phone module dropper (⋮)** for Catalogue.
12. **Offline state** · OFFLINE chip and what still works (packer scan first).
13. **Scan-to-add armed** · green scan button in the header.
14. **More** on the phone island · Hub, Studio, Channels.

---

## 5 · Consistency breaks by module

**Catalogue**
- Phone Sale orders (f-15 to f-18) drop the top bar and cart strip.
- Side menu lists actions as sub-menus and leaves out Catalogue (`screens2.jsx:10`).
- Customer mode switch only on Catalogue headers; its on-state never drawn on web.
- Opened order (sales w-10) puts actions in the header and pushes search and orb off.
- Sales board page: inside the mock-ups it still reads Catalogue › Sale orders, as intended.

**CRM**
- Web on `WebShell3`, fits.
- Phone top bar has no basket (`mod-crm.jsx:324`); role label "Sales".
- Side menu names (Sales CRM, Customer dossier, Share packets, Follow-ups & journeys, Payments CRM, Journey builder) differ from the header and scroller (Follow-ups · Share · Payments · Customers · Journeys).

**Dispatch**
- Three web shells: `DShell` + `WebHeader2` (nw-1 to nw-19), approved bar (nw-20 to nw-23), structured (nw-24 on, `WebShell3`).
- `DShell` has no Pending button (`mod-dispatch-web.jsx:6`); LIVE in the header, not the tab strip.
- Approved bar: 6 of 7 sub-menus carry ▾; the orb is pushed off (nw-20).
- Sub-menu order: web Ready first, phone Pending first (`mod-dispatch.jsx:212`); side menu has 9 items including Invoice review and Shipments.
- Pending count reads 7 on phone, 42 on web.
- Cart basket glows on every Dispatch desk header, a screen with no carts.

**Production**
- Web on `WebShell3` with search squeezed to 132 px (`mod-production-web.jsx:12`); orb half off (nw-1).
- Web sub-menus: Purchase · Materials · Process setting · Orders · Job cards · Samples · Costing · Karigars.
- Phone scroller: Overview · Job cards · Orders · Samples · Dye · Materials · Process setting · Purchase · Karigars · Costing.
- Side menu: a third list (Purchase orders · Purchase inward · Purchase return · Process setting · Production lifecycle · Job cards · Costing · Karigar analytics · Samples).
- Phone top bar adds a QR button; no basket.

**Studio**
- Web on `WebShell3`, search 132 px, Tune carries the orb mark, orb pushed off (nw-1).
- Phone island marks More (`mod-studio.jsx:254`); role label "Design".
- Side menu has 3 items; header and scroller have 7.

**Home, Hub, Channels**
- On the island, rail and side menu, but no screens.

**Across the shell**
- Island order Dispatch → Production; rail and side menu Production → Dispatch.
- Phone side menu shows how many sub-menus each module has (5, 6, 9); the web sidebar shows none.
- Phone side menu puts the user on top; web sidebar puts the user at the foot.

---

## 6 · Questions for the owner

1. **Landing.** Does every role open on Home, or on its main screen (salesperson → Catalogue, packer → Dispatch › Packing)?
2. **Approvals.** One Home › Approvals queue for every kind (sale orders, returns, purchase inward, overages, costing)? Should Sale orders › Raised keep its own Approve too?
3. **Customer mode.** How does it switch off: PIN, long-press, or fingerprint? While on, should the island show only Catalogue and Carts?
4. **Firm.** Where does an admin switch firm: top of the side menu and sidebar, or the firm logo on the rail? Can one cart or one search span firms?
5. **Carts outside Catalogue.** On phone, should Dispatch, CRM and Production show the basket and the cart strip, or only the basket?
6. **Long sub-menus.** Dispatch has 7 and Production 8. Fold the extra ones into "More ▾", or keep them all and shrink search to an icon?
