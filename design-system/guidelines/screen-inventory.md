# Screen inventory — Sutra v0.3

Every screen ships for **web app and phone** — there is no single-device screen. Web = SideNav shell with three panes; phone = bottom bar, right-corner sub-menu, panes become tier-2 screens or floating sheets.

Source: research/brd-final.txt (Business Requirements FINAL). Legend: W = web mock built · P = phone mock built · — = not yet mocked.

## Shell
- Login & firm selector
- Side menu / bottom bar  ·  W P
- User menu & theme
- Permission request (24h · 1w · 1m · 3m)

## Home
- Role dashboard & quick links
- Notifications
- Approvals — sale order  ·  P
- Approvals — sale return
- Approvals — purchase inward
- Approvals — production overage
- Approvals — costing
- Gate pass hub
- Manual gate token

## Catalogue
- Catalogue grid (products · materials · WIP · samples)  ·  W P
- Product page — customer view  ·  P (2 directions)
- Product page — salesperson view  ·  P (2 directions)
- Image upload centre  ·  P (checklist, in analytics screen)
- Scan (focus mode)  ·  P
- Scan pop-up & quick add  ·  P (2 directions)
- Full-screen image viewer
- Carts (all carts by customer)  ·  P (2 directions)
- Cart detail (floating)  ·  W 
- Sale orders — all / approved & pending / dispatched  ·  P (per product)
- Sort & filter sheet
- Customer mode

## CRM
- Sales CRM terminal (customer pane · 3 grids)
- Customer dossier
- Share packet composer (WhatsApp)
- Follow-up terminal & journey
- Payments CRM — stages
- Payments journey flow builder

## Production
- Overview (module root)  ·  W
- Purchase order (calendar · list · form · PO pane)  ·  W
- Purchase inward (from a PO · ad hoc · variance · supplier pane)  ·  W P
- Purchase return (credit note pane)  ·  W
- Materials catalogue (picture-first, sorted by inward · material pane)  ·  W P
- Dye ledger (cut orders · bulk issue · single issue & order · receive · dyer balances)  ·  W P
- Process setting (product · sequence · materials & averages · BOM grid per colour · lock · right pane materials / BOMs / search)  ·  W P (recipe view, averages)
- Production orders (cards · lifecycle pane · new order with readiness pane)  ·  W P
- Production lifecycle (per order · job panels · issue · receive · this-job pane)  ·  W P
- Challan sticker & job card print  ·  W
- Job cards board (cards · swimlanes · table · gantt · calendar; scopes active · delayed · upcoming · stuck · priority · restock · finished)  ·  W P
- Lifecycle right pane  ·  W
- Samples (board · lifecycle with free moves · new move · sample → product)  ·  W P
- Costing (cards · breakdown pane)  ·  W
- Karigars (list · karigar pane)  ·  W
- Scan a job QR (phone)  ·  P

## Dispatch
- Ready orders  ·  W 
- All pending orders
- Packing terminal (order · parcels · live invoice)  ·  W 
- Phone scan companion
- Invoice review & A4 print
- Shipment sheet & transport doc
- Billed — sale invoices
- Billed — shipments history
- Out of stock (order · restock)
- Warehouse stock — FG · material · WIP
- Sale return wizard (4 steps)

## Hub
- Master views shell (census chips)  ·  W 
- Items — products · materials · WIP  ·  W 
- Ledgers — customers · suppliers · direct vendors · karigars · agencies · brokers · transporters · misc · team
- Master dossier (tier 2 / 3)
- Reports — purchase · sale · production · karigar · dispatch · commissions · payments
- Report builder · column chooser · saved views
- Product compare hub

## Studio
- Image upload & management centre
- AI photoshoots centre
- AI designer “Stitch” (chat · design pane)
- Agent tuner side pane
- Moodboard
- Product / material selector pop-up

## Channels
- Connections & permissions
- Transfer history
- Inbound / outbound packets

