# Dispatch — structured look (6 Oct 2026)

Planning only. Sources: the three v0.2 screenshots in `design-system/uploads/` (Ready, Packing collapsed, Packing
focused), `design-system/research/dispatch-screens.txt`, `brd-dispatch.txt`, the registration block at
`mod-dispatch-web.jsx:345–352`, `plans/dispatch.md` §0–2. Cites are `file:line`.

## 1. The old prototype — better and worse

Better (keep):
- **Structure.** Flat top bar, six rectangular node buttons with live counts (Ready 9, Packing 36), main window and
  panes split by hard edges (Ready Screen.png; Packing Collapsed.png left / main / right).
- **Scan-first packing.** "Scan here" above the parcel board; each parcel is a code head (P00035), a status tag, lines
  "1243 Mehroon ×1" with a stepper, pcs and CLOSE PARCEL (Packing Focused.png). The invoice builds on the right as a
  ruled table Title | Color | Qty | Rate | Amount.
- **Visible counts.** Every chip "0/1 ▬ 4/9 Pcs", every card "9 pcs", pane heads PENDING ORDERS 42 / CURRENT ORDER 6.

Worse (drop):
- **Too many colours.** Ready: gold rings, mint tier tags, green ticks, tinted thumbs, orange PACK, amber notes, pink
  due tags, red X. Packing: every customer chip a different pastel, pink parcel outlines, orange CLOSE PARCEL, green
  Confirm, mint LIVE. About twelve hues per screen; status carried by hue, unreadable under tube light.
- ₹ in the packer-facing pending pane (Ready Screen.png).

## 2. Critique of the current drafts for a warehouse user

- **Curves.** `Card` radius 18 (`mod-dispatch.jsx:31`), `PendingTree` rows 16 (`:72`), `ParcelCard` 18 (`:96`),
  `Sheet` 26 (`:208`); `Pill`, `DuePill`, `LiveChip`, `CallChip`, `KarigarPill` are 999px (`:20,21,26,27,155`); web
  return screens 14–18 throughout (`mod-dispatch-web.jsx` Ret1–4). Islands, not a ledger; edges blur at a metre.
- **Colour count.** `DP_P` five priority hues (`:6`), `T.ok` ticks, toasts and done tile (`:33,117`), `T.blue` tone
  on `Pill` (`:20`), `T.warn` strips, `T.accent` buttons and active cards, colour dots per line. Six to eight hues.
- **Density.** 12–14 padding, 11.5px meta (`:25`), unruled rows; node counts are 11px badges.
- **Hard at arm's length.** Status by dot (`ProgDisc`, `Dot` `:18,36`), tick vs cross by colour, 4px progress bars
  (`:34`), soft shadows that flatten in daylight.
- **Chrome.** Web drafts use their own `DShell` with `WebHeader2`/`SubBar` (`mod-dispatch-web.jsx:7,14`), not
  `WebShell3` (`web.jsx:132`); the structured set must move to `WebShell3`.

## 3. Structured spec — rules a drafter follows

Shape
- Card / pane / sheet radius **4px**; chip / button / tag / input / thumb **3px**. No 999px, no islands in content.
  Sheets square-topped with a 1px top rule.
- Header bars flat, 1px bottom rule `T.line`. Panes split by a 1px rule, not a gap. Borders 1px `T.line`; active
  border 1px `T.accent`. No `boxShadow`, no gradients except the scan camera veil.

Colour budget per screen
- `T.bg`, `T.surface`, `T.surface2`; text `T.ink`, `T.ink2`, `T.ink3`.
- **One** `T.accent` line: the active node underline (web), active tab (phone), or the single primary button. If a
  frame has a primary button, the underline is ink.
- `T.danger` only for blocked / rejected / overdue (due < 0, scan rejected, OUT, Nil). `T.warn` only for due ≤ 2 d
  and LOW. `T.ok`, `T.gold`, `T.blue` never appear.
- Priority is text "P1"…"P5" in a tag. Customer identity is a 2-letter ink monogram. Photos keep their real image.

Status tag `DsTag`
- Rectangular, 3px, 1px outline `T.line2`, 10px uppercase, letter-spacing .06em, height 20 web / 24 phone, `T.ink2`
  text; `tone="danger"` / `"warn"` colour border and text only. Filled (ink on bg) only for the one active state on
  a frame (PACKING INTO). Replaces `Pill`, `DuePill`, `StockPill`, `ProgDisc`.

Type and sizes
- Column heads 11px uppercase `T.ink3`. Body 13 web / 15 phone. Design number 14 / 16 semibold, the head. Meta
  11.5 / 12.5 `T.ink3`. Numbers tabular-nums, right-aligned. Node-strip counts **28px** `T.fontDisplay` 600 with an
  11px uppercase label under. Phone scan tally 56px+.
- Rows **44px web / 56px phone**, 1px rule between, no zebra. Touch targets ≥ 48px on phone; primary button 52.
- Buttons: primary `T.accent` fill, secondary 1px `T.ink` outline; height 36 web / 48 phone. 3px.
- Progress as text "12 / 20", never a bar.

Still holds (`design/SUTRA-DESIGN-SCHEMA.md`): photo beside every design number, design no is the head, Lucide via
`Ic`, no emoji, sentence case, floor talk, dd/mm/yy, `en-IN` grouping, ₹ only on manager variants. `({ T }) => …`
with `T.*` only; phone `frameF(T, body, <T.Island active="Dispatch" />)` (`final.jsx:160`); web `<WebShell3 T={T}
module="Dispatch" crumb section seg active tabs pane paneTitle>` (`web.jsx:132`). All identifiers prefixed `Ds`;
reuse `DC`, `dOf`, `XD.parcels`, `FG_ROWS`, `MAT_ROWS`, `WIP_ROWS`, `RET_BILLS`, `OOS_ROWS` (`mod-dispatch.jsx`).

Added: the node strip is a ruled table head (six cells, count over label, active cell underlined). Every list is a
table on phone too: a 56px group row (monogram, customer, "n orders · p pcs", due tag) then ruled line rows. One
primary action per frame. LIVE / OFFLINE is a tag (OFFLINE in danger), not a dot.

## 4. Per-sub-menu change list

Frames as registered at `mod-dispatch-web.jsx:346–352`. "→" new structured frame; "stays" unchanged.

1. **Ready** — `ScreenDReady` → `ScreenDsReady`: group rows + ruled lines, ring → "P2" tag, ticks → "IN STOCK" /
   "SHORT", PACK ▸ full-width. `ScreenDReadyFilters` → `ScreenDsReadyFilters` (square sheet). `WebDReady` →
   `WebDsReady` on WebShell3: ruled queue rail, 3-column ruled cards, pending pane as ruled tree.
2. **Pending** — `ScreenDPending` / `ScreenDPendingPacker` → `ScreenDsPending` / `ScreenDsPendingPacker`: three
   levels as indented 56px rows, "n short" danger tag. `WebDPending` → `WebDsPending`. Flow stays (§2.2 of dispatch.md).
3. **Packing** — `ScreenDPicker` → `ScreenDsPicker` ("12 / 20" text). `ScreenDScan` → `ScreenDsScan` (camera
   stays, 56px tally, "ACCEPTED" tag, warn tag). `ScreenDScanRejected` → `ScreenDsScanRejected` (1px danger box,
   reason 15px). `ScreenDReview`, `ScreenDInvoiced` → `ScreenDsReview`, `ScreenDsInvoiced`. `WebDPacking` →
   `WebDsPacking` (chip row → ruled customer strip, parcel cards 4px, invoice pane table). `WebDPackingScan`,
   `WebDInvoiceReview`, `WebDInvoiceDone`, `WebDShipmentSheet` → `WebDs…`. `WebDPrint` **stays**.
4. **Billed** — `ScreenDBilled`, `ScreenDBilledPacker`, `ScreenDInvoiceSheet`, `ScreenDInvoiceSheetPacker`,
   `ScreenDShipments` → `ScreenDs…`: date-grouped ruled rows. `WebDBilled`, `WebDShipments` → `WebDs…`: 11px heads,
   right-aligned pcs / ₹.
5. **Out of stock** — `ScreenDOOS` → `ScreenDsOOS`: 28px counts strip, rows, ruled colour matrix with danger "Nil",
   karigar as a row with score text and 48px call. `ScreenDOOSFilters`, `WebDOOS` → `ScreenDsOOSFilters`, `WebDsOOS`.
6. **Stock** — `ScreenDStockFG` / `Mat` / `WIP` / `FGInward` → `ScreenDs…`: `StockPill` → `DsTag` (OUT danger, LOW
   warn, OK plain). `WebDStockFG` / `Mat` / `WIP` / `FGInward` → `WebDs…`: tiles → 28px count strip.
7. **Sale return** — `ScreenDRet1–4`, `Ret3Packer`, `Ret4Packer` → `ScreenDs…`: step rail as four ruled cells, bills
   as 3px checkbox rows, green done disc → "RAISED" tag. `WebDRet1–4` → `WebDsRet1–4`. `CreditNote` **stays**.

## 5. Next session plan

`modules.js:29` already points Dispatch at `mod-dispatch-s.jsx` and `mod-dispatch-s-web.jsx` (neither exists yet);
`mod-dispatch.jsx` / `-web.jsx` stay loaded as shared files (`modules.js:24`), so their helpers are in scope.

1. Read this file, `design/SUTRA-DESIGN-SCHEMA.md`, `web.jsx:132–180` (WebShell3 props), `final.jsx:160`.
2. Write `explorations/catalogue-v2/mod-dispatch-s.jsx`: `DsTag`, `DsRow`, `DsHead`, `DsNodeStrip`, `DsGroup`, then
   `ScreenDsReady` … `ScreenDsRet4Packer` in §4 order; `bash .claude/skills/sutra-mockups/scripts/board-check.sh`
   after each sub-menu.
3. Write `mod-dispatch-s-web.jsx`: `WebDsReady` … `WebDsRet4` on `WebShell3`, ending with
   `(window.NEW_DRAFT_MODULES ||= []).push({ module: 'Dispatch', note: 'structured …', subs: [...] })` for the seven
   sub-menus, `WebDPrint` reused.
4. Verify: `bash .claude/skills/sutra-mockups/scripts/board-check.sh`, then
   `bash .claude/skills/sutra-mockups/scripts/contact-sheet.sh dispatch "structured"`; review `.board-check/*.png`;
   `grep -n "T.ok\|T.gold\|T.blue\|borderRadius: 999" explorations/catalogue-v2/mod-dispatch-s*.jsx` expects no hits.
5. Dark pass: `contact-sheet.sh --finals dispatch`; fix any `T.*` undefined in dark.
6. Catalogue › Sale orders: `plans/sale-orders-structured.md` (same §3 rules), then `mod-catalogue-so-s.jsx` /
   `-web.jsx` (`So` prefix), add to the catalogue `files` in `modules.js`, `contact-sheet.sh catalogue "sale orders"`.
7. Analytics: `plans/analytics-structured.md` (charts per `dataviz` skill: ink + one accent, ruled axes), then
   `mod-analytics-s.jsx` / `-web.jsx` (`An` prefix), register, `contact-sheet.sh analytics "structured"`.
8. Point `plans/dispatch.md` §0 at this file; never edit existing draft files.
