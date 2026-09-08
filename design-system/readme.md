# Sutra Design System

**Sutra (सूत्र)** is a picture-first ERP for Indian ethnic / designer fashion manufacturers and wholesalers. Web app (desktop, 24″ dispatch desks) + phone apps (iOS/Android), one backend. Modules: Home (approvals, notifications, gate-pass hub), Catalogue & Carts, CRM (sales + payments), Production (purchase, process setting, lifecycle, job cards, costing, karigars), Dispatch (Ready → Packing → Billed | Stock, Out of stock, Sale return), Hub (Master views, Reports), Studio (media, AI shoots, "Stitch" designer agent), Channels (cross-firm). Also third-party surfaces (karigar / supplier / customer storefront).

First client: **Shree Radha Studio (SRS)** — six sister firms, women's premium ethnic wear (lehenga, saree, plazo sets, crop tops). Sutra has its own brand voice; each client firm's colour is applied as a *minimal* highlight through the `--brand-*` tokens.

This is **v0.3** — a unified new theme. v0.2 screenshots and the Dispatch / Master-views plan docs were used for *functionality only*, never for colour or structure.

## Sources given
- `uploads/Business Requirements FINAL (2).docx` → `research/brd-final.txt` (primary spec, all modules & screens)
- `uploads/Sutra-v3-BRD-Master-Views-and-Reports.docx` → `research/brd-masters.txt`
- `uploads/Sutra-v3-BRD-Dispatch-Module.docx` → `research/brd-dispatch.txt`
- `uploads/Dispatch-Module-Screen-Overview.docx` → `research/dispatch-screens.txt`
- `uploads/Business Req.txt` (older BRD, glossary, role matrix)
- v0.2 screenshots: `Dispatch Module *.png`, `Masters *.png`; Miro wireframes `Screenshot (11–18).png`
- Grok mockups (tone reference): `WhatsApp Image 2026-09-03 *.jpeg` → `research/mock-catalogue-a/b.jpeg`
- Colour / brand inspiration: sand × chocolate, burgundy × cream, coffee/espresso palettes, maroon editorial templates, warm-neutral fashion app shots
- Logos: `2.png` (सूत्र mark), `3.png` (SŪTRA wordmark), `Black Logo (2).png` + `Black Logo-White (1).png` (SRS)
- Referenced but not accessible: Tags Matrix Sheet, Busy Wireframe Sheet (Google Sheets), screenshot Drive folder, Shrey's handover prototype.

## Content fundamentals
- **Voice:** plain floor-talk. Short, factual, numbers first. *"9 orders · updated just now"*, *"n of this design is at the last production step"*, *"fix qty and rate, then confirm — nothing reaches Busy until you do."*
- **Casing:** sentence case everywhere. Uppercase only for tracked labels — node tabs (READY · PACKING), badges (PLATINUM, OPEN), overlines, and floor commands (PACK ▸).
- **Person:** the system talks to *you* implicitly; never "I". No greetings, no exclamation marks, no apologies ("Oops").
- **Prices (catalogue only):** leading digit rendered 5% larger (`PriceText`) — 3999 reads as three-thousand-something, not four. Internal screens use plain figures (`lead={false}`).
- **Numbers:** Indian grouping (₹1,78,835), tabular figures, `pcs` not "pieces", `× 4` for quantities, `-12d` / `12d left` for due days, dates dd/mm/yy.
- **Identifiers:** design number always beside its photo; codes in mono (2798, SO-2613, P00059, MAT-BKS41). Colour names are the brand's own (Mehroon, Rani, Firozi, Pista).
- **Empty states:** name the fact — "No photo yet", "Never scored", "TBD" for unpriced samples. Never "Image unavailable".
- **Hinglish** notes appear verbatim in user notes ("2018 ke red ka stock check karna hai") — never translate user content.
- **No emoji.** Ever.

## Visual foundations
- **Canvas:** warm sand (`--sand-100 #F3ECE2` page, `--sand-0 #FDFBF7` cards). Chosen so garment photos read true and pop; UI recedes. Never pure white pages, never grey.
- **Ink:** espresso ramp (`--ink-900 #241712` → `--ink-100`). No pure black.
- **Sutra gold** (`--gold-500 #C0953F`): Sutra's own accent from the logo — logo, LIVE dot, count bubbles, cart chips. Sparse.
- **Brand maroon** (`--brand-700 #561C24`, ramp 900→50): the client highlight. Used as *one sleek line* — the 2px underline under the active tab, the 3px bar beside the active nav item, the primary button, the active bottom-bar capsule, focus rings. Target ≈3–5% of any screen. Swap the whole `--brand-*` ramp per firm; nothing else changes.
- **Status:** muted warm greens/ambers/reds (`--ok/--warn/--danger/--info`), soft tints for backgrounds. Priority rings `--p1…--p5` outline dispatch cards.
- **Type:** Cormorant Garamond (display — design names, prices, headlines, module titles), Jost (all UI, 300–600, tabular numerals), IBM Plex Mono (codes). Scale 10/11/12.5/14/16/18/22/28/36/48/64. Display never below 16; UI body 14.
- **Photos:** 4:5 portrait tiles, 12px radius, on `--photo-backdrop` (sand gradient). No photo → the code in display serif on the gradient, or the SKU colour as a fill. Photo scrim only when text sits on the image. Imagery is warm, natural light, studio-neutral backgrounds.
- **Cards:** `--surface-card`, 16px radius, hairline border `--border-subtle`, `--shadow-1` (barely there, warm-tinted). No coloured left-border-only cards; a 5px colour bar is used only for parcel/customer identity on packing boards.
- **Spacing:** 4-base scale; card pad 16/20; grid gap 14–20; gutters 16 phone / 24 desktop / 32 wide. Controls 32/40/48; 44px minimum touch target.
- **Radii:** 4/8/12/16/22/28/pill. Buttons and chips are pills; cards 16; sheets 28.
- **Shadows:** four steps, all `rgba(36,23,18,…)` — never grey/blue shadows. Dark mode uses black shadows.
- **Backgrounds:** flat sand. No gradients on surfaces (the only gradient is the photo backdrop). No patterns, no illustration. Glass (`--surface-glass` + `--blur-glass`) only for controls floating over photos and the phone bottom bar.
- **Motion:** `--ease-out`, 120/200/320 ms. Fades and 8px rises only; no bounces. Hover = 1px lift + `--shadow-2` + 4% brighter; press = scale .985; focus = 2px maroon ring offset by sand. Respects reduced-motion.
- **Layout:** desktop = SideNav rail (232 / 64 collapsed) · sticky 56px top row (module title · node tabs · live chip · theme · user) · three panes (left rail 300, main, right pane 360). Phone = fixed top bar, content, floating dock (cart chips + search/scan), 64px glass bottom bar.
- **Dark mode:** `[data-theme="dark"]` — espresso room (`#1B1310`), photos stay lit, maroon shifts up to `--brand-500` for contrast.
- **Money rule:** rates/amounts appear only where the BRD allows (pending pane, packing desk, billed) — never on the Ready board or the packer's phone.

## Iconography
- **Lucide** (CDN `lucide@0.460.0` UMD) via the `Icon` component, 1.6px stroke, 15–20px. One set, no fills, no emoji, no unicode glyphs as icons (▸ in "PACK ▸" is rendered by `Icon name="chevron-right"`).
- v0.2 used FontAwesome-style filled icons; **substituted** with Lucide to match the thin, quiet UI. Flag if the team wants a different set.
- Module icons: house · layout-grid · shopping-bag · package · scissors · users · library · bar-chart-3 · sparkles · git-branch. Scan = `scan-line`; call chips = `phone`; stock tick = `check-circle-2` / `circle-dashed`.
- Logos in `assets/logo/` (PNG, transparent): mark and wordmark in gold / espresso / cream; a maroon mark for brand moments. Client logos in `assets/clients/` — SRS original (never recoloured in product) and an **optional** tonal variant (`srs-logo-tonal-OPTIONAL.png`) for the owner to approve.
- Sample product photos (`assets/samples/`) are crops of the user's own Grok mockups; placeholders only.

## Components (`components/`)
core/ — `Button`, `IconButton`, `Badge`, `Tag`, `Tabs`, `SegmentedControl`, `Card`, `StatTile`, `Tooltip`, `Icon`
forms/ — `Input`, `SearchBar`, `Select`, `Checkbox`, `Radio`, `Switch`, `Stepper`
feedback/ — `Dialog`, `Toast`
catalogue/ — `ProductCard`, `PriceText`, `ColourDots`, `Thumb`
navigation/ — `SideNav`, `BottomBar`

No source library defined an inventory, so this is a standard set sized to the BRD. **Intentional additions:** `Icon` (Lucide wrapper), `Stepper` (qty ± is the floor's most-tapped control), `SearchBar` (search + scan pill is on every screen), `Thumb`/`ProductCard`/`ColourDots` (picture-first requirement), `StatTile`, `SegmentedControl` (grid ⇄ list is mandated), `SideNav`/`BottomBar` (shell). Each has `.jsx` + `.d.ts` + `.prompt.md`; cards: `*.card.html` per directory.

## Screens
Every screen in the BRD ships for **web and phone** — none is single-device. Full list: `guidelines/screen-inventory.md` (card: *Screen map*). Kits below are the mocked subset so far.

## UI kits (`ui_kits/`)
- `sutra-web/` — desktop shell; Catalogue (grid + cart pane), Dispatch Ready → Packing, Master views Products grid ⇄ list. `index.html`, `Shell.jsx`, `WebCatalogue.jsx`, `DispatchReady.jsx`, `DispatchPacking.jsx`, `MastersProducts.jsx`, `WebApp.jsx`.
- `sutra-mobile/` — three phones: Catalogue, Product page (customer ⇄ salesperson), Approvals. `index.html`, `Catalogue.jsx`, `ProductPage.jsx`, `Approvals.jsx`, `MobileApp.jsx`, `ios-frame.jsx`.
- `catalogue-explorations/` — two full aesthetic directions (Gallery · Atelier) for every catalogue-module screen, on one canvas. Not yet folded into tokens/components — pick one first.
- `data.js` — shared fictional mock data.

## Index
- `styles.css` — entry; imports `tokens/` (fonts, colors, typography, spacing, shape, motion, dark, base)
- `guidelines/` — 22 specimen cards (Colors, Type, Spacing, Brand, Motion)
- `assets/logo/`, `assets/clients/`, `assets/samples/`
- `components/`, `ui_kits/`, `research/` (extracted BRDs)
- `thumbnail.html`, `SKILL.md`

## Caveats
- Fonts are loaded from Google Fonts (`tokens/fonts.css` @import) — no local files, so the compiler lists 0 fonts. Provide licensed TTF/WOFF2 (or confirm Google Fonts) and `@font-face` will be added.
- Screens not yet in kits: Home, Carts, CRM, Production (lifecycle, job cards, process setting), Stock, Out of stock, Sale return, Studio, Channels — patterns exist to build them.
