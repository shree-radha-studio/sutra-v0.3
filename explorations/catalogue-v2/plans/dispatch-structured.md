# Dispatch — structured look (6 Oct 2026)

Planning only. Sources: the three v0.2 screenshots in `design-system/uploads/` (Ready, Packing collapsed, Packing
focused), `design-system/research/dispatch-screens.txt`, `brd-dispatch.txt`, the registration block at
`mod-dispatch-web.jsx:345–352`, and `plans/dispatch.md` §0–2. Line cites are `file:line`.

## 1. The old prototype — what it did better, what it did worse

Better (keep):
- **Structure.** One flat top bar, six nodes as rectangular buttons with live counts (Ready 9, Packing 36), a
  main window and panes with a hard edge between them (Ready Screen.png; Packing Collapsed.png left/main/right).
- **Scan-first packing.** "Scan here" sits above the parcel board; each parcel card is a code head (P00035), a
  status tag, lines "1243 Mehroon ×1" with a stepper, pcs count and CLOSE PARCEL (Packing Focused.png). The
  invoice pane builds itself on the right as a real ruled table Title | Color | Qty | Rate | Amount.
- **Visible counts.** Every customer chip carries "0/1 ▬ 4/9 Pcs", every card foots "9 pcs", the pane heads carry
  counts (PENDING ORDERS 42, CURRENT ORDER 6). A packer reads state at arm's length without opening anything.
- **Flat chrome.** Nodes, chips, inputs are 1px boxes on a sand canvas; no shadows, no soft islands.

Worse (drop):
- **Too many colours.** Ready: gold card rings, mint tier tags, green ticks, pink/amber/sage thumbs, orange PACK,
  amber note strips, pink due tags, red X. Packing: each customer chip is a different pastel (red, teal, blue, green,
  purple, brown), parcel cards are pink-outlined, CLOSE PARCEL orange, Confirm green, LIVE mint. Roughly twelve hues
  on one screen; status is carried by hue, which a packer under warehouse tube light cannot tell apart.
- Money (₹74,975) sits inside the packer-facing pending pane (Ready Screen.png, right pane).

## 2. Critique of the current drafts for a warehouse user

- **Curves.** `Card` is radius 18 (`mod-dispatch.jsx:31`), `PendingTree` rows 16 (`:72`), `ParcelCard` 18 (`:96`),
  `Sheet` 26/26 (`:208`), `Pill`/`DuePill`/`LiveChip`/`CallChip`/`KarigarPill` are 999px pills (`:20,21,26,27,155`),
  web return screens use 14–18 everywhere (`mod-dispatch-web.jsx:~310–340`). Everything reads as an island, not a
  ledger; edges blur at a distance.
- **Colour count.** `DP_P` five priority colours (`mod-dispatch.jsx:6`), `T.ok` green for ticks, toasts and the done
  tile (`:33,117`, `mod-dispatch-web.jsx` Ret4), `T.blue` tone on `Pill` (`:20`), `T.warn` amber strips, `T.accent`
  maroon on buttons and the active card, colour dots per line. Six to eight hues per screen; same failure as v0.2.
- **Density.** Cards pad 12–14 with 6–8px gaps, meta at 11.5px (`:25`), `Mono` 12.5 (`:23`); rows are not ruled, so
  the eye has nothing to track across. Node counts are 11–12px badges, not readable from a metre away.
- **Hard to see at arm's length.** Status by dot (`ProgDisc` 30px, colour dots 8px `:18,36`), tick vs cross by
  colour, due state by pill fill. Progress bars 4px (`:34`). Soft shadows flatten in daylight.
- **Chrome.** Web drafts use their own `DShell` with `WebHeader2`/`SubBar` (`mod-dispatch-web.jsx:7,14`), not
  `WebShell3`; the structured set must move to `WebShell3` (`web.jsx:132`) so Dispatch matches the other modules.

## 3. The structured spec — rules a drafter follows

Shape
- Card / pane / sheet radius **4px**; chip / button / tag / input / thumb radius **3px**. No 999px, no island
  cards inside content, no masonry. Sheets are square-topped (0/0) with a 1px top rule.
- Header bars flat, 1px bottom rule in `T.line`. Panes separated by a 1px rule, not a gap. Borders 1px `T.line`,
  active border 1px `T.accent`. No `boxShadow` anywhere. No gradients except the scan camera veil.

Colour budget (per screen)
- Canvas `T.bg`, surfaces `T.surface`/`T.surface2`, text `T.ink`, `T.ink2`, `T.ink3`.
- **One** `T.accent` line: the active node underline on web, the active tab on phone, or the single primary button —
  never both an underline and a filled button on one frame; if the frame has a primary action, the underline is ink.
- `T.danger` only for blocked / rejected / overdue (due < 0, scan rejected, OUT, Nil cells, P1 only as a text tag).
  `T.warn` only for due-soon (≤ 2 d) and LOW. Nothing green, gold or blue — `T.ok`, `T.gold`, `T.blue` do not appear.
- Priority is text "P1"…"P5" in the tag, not five colours. Customer identity is a 2-letter ink monogram, not a hue.
- Photo thumbs keep their real image; no tinted placeholder blocks.

Status tag `DsTag`
- Rectangular, 3px, 1px outline `T.line2`, 10px uppercase, letter-spacing .06em, height 20 (web) / 24 (phone),
  `T.ink2` text; `tone="danger"` → border + text `T.danger`; `tone="warn"` → `T.warn`. Filled only for the one active
  state on a frame (e.g. PACKING INTO) and then ink on bg. Replaces `Pill`, `DuePill`, `StockPill`, `ProgDisc`.

Type and sizes
- Column heads 11px uppercase `T.ink3`. Body 13px web / 15px phone. Design number 14/16px semibold (the head). Meta
  11.5/12.5px `T.ink3`. Numbers `fontVariantNumeric: tabular-nums`, right-aligned. Node-strip counts **28px**
  (`T.fontDisplay`, 600), node label 11px uppercase under them. Phone tally on scan stays 56px+.
- Rows: **44px web, 56px phone**, 1px rule `T.line` between rows; no zebra. Touch targets ≥ 48px on phone (row
  buttons 48×48, primary button height 52).
- Buttons: primary = `T.accent` fill, bg text, 3px; secondary = 1px `T.ink` outline, ink text; height 36 web / 48 phone.
- Progress: "12 / 20" as text, never a bar; or a 2px ink rule under the number when a bar is unavoidable.

Still holds from `design/SUTRA-DESIGN-SCHEMA.md`
- Photo beside every design number; design no is the head; Lucide via `Ic`; no emoji; sentence case; plain floor
  talk; dd/mm/yy; `toLocaleString('en-IN')` grouping; ₹ only on manager variants, never on the packer's frames.
- `({ T }) => …`, `T.*` only; phone = `frameF(T, body, <T.Island active="Dispatch" />)` (`final.jsx:160`); web =
  `<WebShell3 T={T} module="Dispatch" crumb section seg active tabs pane paneTitle>` (`web.jsx:132`).
- All identifiers prefixed `Ds` (`ScreenDs…`, `WebDs…`, `DsRow`, `DsTag`, `DsHead`, `DsNodeStrip`); reuse `DC`,
  `dOf`, `XD.parcels`, `FG_ROWS`, `MAT_ROWS`, `WIP_ROWS`, `RET_BILLS`, `OOS_ROWS` from `mod-dispatch.jsx` unchanged.

Added rules
- Node strip = a ruled table head: six cells, count 28px, label under, 1px rules between, active cell underlined.
- Every list is a table even on phone: the card becomes a group head row (customer, 56px, monogram, name, "n orders
  · p pcs", due tag) followed by ruled line rows. No nested boxes.
- One primary action per frame, bottom-right on web, full-width bottom on phone.
- LIVE / OFFLINE is a tag, not a dot: "LIVE" ink outline, "OFFLINE" danger outline.

## 4. Per-sub-menu change list

Frames named as registered at `mod-dispatch-web.jsx:346–352`. "→" = new structured frame; "stays" = content and
flow unchanged, only re-drawn under §3.

1. **Ready** — `ScreenDReady` → `ScreenDsReady`: cards become customer group rows + ruled lines, priority ring →
   "P2" tag, due pill → tag, ticks → "IN STOCK"/"SHORT" text, PACK ▸ full-width primary. `ScreenDReadyFilters` →
   `ScreenDsReadyFilters`: square sheet, chips 3px. `WebDReady` → `WebDsReady`: WebShell3, queue rail as a ruled
   list, 3-column ruled cards, pending pane as a ruled tree, no ₹ in the pane for packer; manager variant adds ₹.
2. **Pending** — `ScreenDPending` / `ScreenDPendingPacker` → `ScreenDsPending` / `ScreenDsPendingPacker`: three
   levels as indented ruled rows (56px), "n short" as danger tag. `WebDPending` → `WebDsPending`: full node table,
   customer pane with totals. Flow stays (`plans/dispatch.md` §2.2).
3. **Packing** — `ScreenDPicker` → `ScreenDsPicker` (customer rows with "12 / 20" text, box rows). `ScreenDScan`
   → `ScreenDsScan`: camera stays, glass chip → 3px, tally 56px, accept = ink tag "ACCEPTED", warning = warn tag.
   `ScreenDScanRejected` → `ScreenDsScanRejected`: danger strip is a 1px danger box with the reason in 15px.
   `ScreenDReview`, `ScreenDInvoiced` → `ScreenDsReview`, `ScreenDsInvoiced`. Web: `WebDPacking` → `WebDsPacking`
   (chip row → ruled customer strip with counts, parcel cards 4px, status tags, invoice pane as table);
   `WebDPackingScan` → `WebDsPackingScan`; `WebDInvoiceReview` → `WebDsInvoiceReview` (warn banner as 1px box, GST
   block ruled); `WebDInvoiceDone` → `WebDsInvoiceDone`; `WebDShipmentSheet` → `WebDsShipmentSheet`;
   `WebDPrint` **stays** (A4 and transport doc are print documents, already ruled).
4. **Billed** — `ScreenDBilled`, `ScreenDBilledPacker`, `ScreenDInvoiceSheet`, `ScreenDInvoiceSheetPacker`,
   `ScreenDShipments` → `ScreenDs…` same five; invoices as date-grouped ruled rows. `WebDBilled`, `WebDShipments` →
   `WebDsBilled`, `WebDsShipments`: tables with 11px heads, right-aligned pcs/₹, invoice pane ruled.
5. **Out of stock** — `ScreenDOOS` → `ScreenDsOOS`: counts strip 28px, order/restock as rows, colour matrix ruled
   with "Nil" in danger text, karigar pill → row with score text and a 48px call button. `ScreenDOOSFilters` →
   `ScreenDsOOSFilters`. `WebDOOS` → `WebDsOOS`.
6. **Stock** — `ScreenDStockFG`/`Mat`/`WIP` → `ScreenDsStockFG`/`Mat`/`WIP`: already row-based; `StockPill` → `DsTag`
   (OUT danger, LOW warn, OK plain). `ScreenDFGInward` → `ScreenDsFGInward` (verify as ruled rows, counted vs expected
   right-aligned). `WebDStockFG`/`Mat`/`WIP`/`FGInward` → `WebDs…`: tiles become a 28px count strip.
7. **Sale return** — `ScreenDRet1–4` (+ `Ret3Packer`, `Ret4Packer`) → `ScreenDsRet1–4…`: step rail as four ruled
   cells, bills as checkbox rows (3px box), done tile loses the green disc → "RAISED" tag. `WebDRet1–4` → `WebDsRet1–4`.
   `CreditNote` print **stays**.

Stays everywhere: data arrays, copy, flow order, money split, `ScanCam`, `A4`, `TransportDoc`, `CreditNote`.

## 5. Next session plan

`modules.js:29` already points Dispatch at `mod-dispatch-s.jsx` and `mod-dispatch-s-web.jsx` (neither exists);
`mod-dispatch.jsx`/`-web.jsx` stay loaded as shared files (`modules.js:24`), so their arrays and helpers are in scope.

1. Read this file, `design/SUTRA-DESIGN-SCHEMA.md`, `web.jsx:132–180` (WebShell3 props), `final.jsx:160`.
2. Write `explorations/catalogue-v2/mod-dispatch-s.jsx`: `DsTag`, `DsRow`, `DsHead`, `DsNodeStrip`, `DsGroup`, then
   `ScreenDsReady` … `ScreenDsRet4Packer` in §4 order; compile-safe after each sub-menu
   (`node -e "require('@babel/core')"` is not available — use `bash .claude/skills/sutra-mockups/scripts/board-check.sh`).
3. Write `mod-dispatch-s-web.jsx`: `WebDsReady` … `WebDsRet4` on `WebShell3`, with the registration block
   `(window.NEW_DRAFT_MODULES ||= []).push({ module: 'Dispatch', note: 'structured …', subs: [...] })` listing the
   seven sub-menus, `WebDPrint` reused.
4. Verify: `bash .claude/skills/sutra-mockups/scripts/board-check.sh` then
   `bash .claude/skills/sutra-mockups/scripts/contact-sheet.sh dispatch "structured"`; check every PNG in
   `.board-check/` for stray `T.ok`/999px with `grep -n "T.ok\|T.gold\|T.blue\|borderRadius: 999" mod-dispatch-s*.jsx`
   (expect no hits).
5. Dark pass: `contact-sheet.sh --finals dispatch`; fix any `T.*` that is not defined in dark.
6. Catalogue › Sale orders: write `plans/sale-orders-structured.md` (same §3 rules), then `mod-catalogue-so-s.jsx` /
   `-web.jsx` (`So` prefix), add to `modules.js` catalogue `files`, run `contact-sheet.sh catalogue "sale orders"`.
7. Analytics: `plans/analytics-structured.md` (charts per `dataviz` skill, ink + one accent, ruled axes), then
   `mod-analytics-s.jsx` / `-web.jsx` (`An` prefix), register, `contact-sheet.sh analytics "structured"`.
8. Hand-off: update `plans/dispatch.md` §0 with a one-line pointer to this file; do not edit existing draft files.
