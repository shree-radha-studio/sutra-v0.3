# Sutra design schema (final rows, 5 Sep 2026)

The design language every new Sutra screen follows, on phone and web, light and dark. It is the language of the
Final rows on the catalogue board (`explorations/catalogue-v2`, themes `FINAL` and `FINALD`, files `final.jsx`,
`web.jsx`). Tokens as CSS variables are in `design/tokens-final.css`. Code components live in the board files and
are reused by every new module.

## 1. Tokens

| Token | Light | Dark |
|---|---|---|
| bg (page) | #F4EFE8 | #140F0C |
| bg2 (sunken) | #ECE6DE | #1C1512 |
| surface (cards) | #FCFAF6 | #221A16 |
| surface2 (alternate card) | #F6F2EC | #2C221D |
| line (hairline) | rgba(36,23,18,.08) | rgba(250,247,242,.08) |
| line2 (outline) | rgba(36,23,18,.16) | rgba(250,247,242,.16) |
| ink | #241712 | #FAF7F2 |
| ink2 | #65524A | #C8BDB3 |
| ink3 | #9C8B80 | #8A7D74 |
| accent (the one line) | #561C24 | #B24A5A |
| accentSoft | rgba(86,28,36,.09) | rgba(178,74,90,.18) |
| accentLine | rgba(86,28,36,.28) | rgba(178,74,90,.45) |
| gold (logo only) | #C0953F | #C0953F |
| onAccent | #FDFBF7 | #FAF7F2 |
| custom (saved lists) | #8F6A2B | #C8BDB3 |
| ok / warn / danger / blue | #3F7D5A / #B8862B / #B23A3A / #5B6C7A | #6FB58C / #D8B15A / #E48383 / #8FB0D6 |
| glass | rgba(252,250,246,.78) + blur 22 | rgba(28,21,18,.62) + blur 22 |
| strip (cart island) | rgba(252,250,246,.55) | rgba(28,21,18,.45) |
| chipBg | rgba(36,23,18,.06) | rgba(250,247,242,.08) |
| header block | rgba(255,255,255,.55) | rgba(250,247,242,.035) |
| rail (web sidebar) | #241712 | #0D0908 |
| depth | top-light gradient, 5% darker foot | faint top radial light |

Dark is Atelier's espresso pushed toward black with stark white type. Maroon is the only accent line in both.
Gold appears in the Sutra mark and nowhere else. No yellow or gold chips.

## 2. Type

- Display: Cormorant Garamond 500/600. Design numbers, prices, names, section heads, page titles.
- UI: Jost 400/500/600. Everything else. Sentence case. Tabular figures on numbers.
- Mono: IBM Plex Mono. Order numbers, phone numbers, codes inside tables.
- Tracking: large display tightens (-.02em at 28+), small caps loosen (.08em), body 0.
- Caps are reserved for tags and tiny meta labels. Section heads are sentence case in the display face.
- Price: the leading digit is 8% larger and the rest 5% smaller (`PriceF`), ₹ small and quiet. TBD for unpriced samples.

## 3. Shape and material

- Radii: photo 16, card 22, control 14, dock 33, chips and buttons pill. Rounded everywhere, never sharp.
- Anything floating is glass: `glass(T)` (theme glass + blur 22 + bright top edge). Anything over a photo is a veil:
  `veil()` (dark smoke, blur 14, no outline, white type).
- No outlines on photo overlays. Cards use hairline + soft shadow (light) or hairline only (dark).
- Depth: a faint top light and slightly darker foot on every page (`T.depth`).

## 4. Phone anatomy

- Header block (from logos to chips) sits on a lifted surface with a hairline and soft shadow.
  - Top bar 44: lockup on a tinted maroon box (mark · hairline · client logo), role, cart basket that glows when
    carts are active (count bubble), menu.
  - Search island 40: [view toggle][filters] outlined, then the field with a thin outline holding the maroon scan
    button, an outlined camera-with-magnifier (recognise by image), the placeholder, and the search icon at the right.
  - Lists bar: default lists in the display face, saved lists in italic in the custom colour, the current list a
    filled ink pill; scrolls sideways with a fade and a narrow chevron.
  - Chips row: count on the left, filter chips, a slim maroon scroll indicator beneath.
- Grid: 2 columns, 12 × 10 gutters, photo 4:5 as hero. Overlays: translucent tag pills top-left, colour strips
  4 × 20 (active 26) on a soft bottom hue, stepper on the photo (veil) when a cart is active, a single + when not.
  Caption: design number as the head (display 19/600), price right; second line "category · collection".
- List row: 62 × 78 photo, number head, category · collection, strips, price, stepper.
- Cart strip: its own subtle island above the main island, the pattern for in-module activity everywhere.
- Island (main): Home, Catalogue, CRM, Dispatch, Production, More (grip icon) and, at the far right, the agent orb:
  a hollow ring with a dark border and the agent mark, a spectral ring that spins and breathes while listening.
- Listening: aura of blurred lights behind the island, one subtle centred dictation line above it, nothing else.
- Product page: photo 548 tall with veils; number head, category · collection · colours, price; outline-free colour
  thumbs with a dot under the active one; tray with cart selector, stepper, Add.
- Salesperson view: three tabs (stock & production, recipe & media, analytics & orders), alternating card surfaces,
  section heads with an accent tick.
- Sheets: filters & sort, cart card (under half the screen), side menu (right sheet, collapsible modules, current
  module marked "here", settings and theme in the footer).
- Tables: inside a rounded frame to the island, horizontal scroll track under the heads, vertical track at the
  right, sticky first column, grip + filter icon on every head, per-column filter card, group-by island above.

## 5. Web anatomy (1280 × 800 and up)

- Rail sidebar 60 wide, dark, floating with 12px margin: sidebar toggle, mark, module icons (active in accent with
  a left bar), settings, avatar, sign out. Expanded text sidebar 262 wide with collapsible sub-menus.
- Header 64: page title in the display face with a crumb; search island (scan · recognise · placeholder · ⌘K · search);
  bell; glowing cart; user chip; the orb.
- Main content with 24px padding. Right pane 340 with a title and a collapse button; collapsed it is a 30px handle.
  The pane carries the active cart, an order preview, customer info, or analytics range / filters / sort.
- Grid 4 columns; cards identical to the phone. Tables fill the main area with the same anatomy as the phone.

## 6. Data viz

- Every chart sits on a sparse light grid (`LineG`, `BarsV`). Lines 2px, dashed for the comparison series, area
  fill at 8% under the first series, end dot.
- Two-series comparisons: orders vs dispatch, sale vs payments. Colours: accent vs ok.
- Stacked availability bars: free (ok) · reserved (warn) · coming (blue at 60%).
- Donuts for shares (tier, category) with a display-face centre value. Bars for weekday and city.
- KPI tiles: label 10.5, value display 24/600, sub 10.5. Danger and ok tones only when they mean something.

## 7. Copy

Plain floor talk, numbers first. Sentence case. No emoji, no exclamation marks, no "I". Indian grouping (₹1,78,835),
`pcs`, `× 4`, `12 d`, dd/mm/yy. Hinglish notes verbatim. Empty states name the fact ("No photo yet").

## 8. Rules that do not bend

Sand canvas, espresso ink, one maroon line per screen, photo beside every design number, design number is the head,
Lucide icons only, money only where the BRD allows, every screen ships for phone and web, light and dark.
