# Sale orders + Analytics — structured look (6 Oct 2026)

Planning only, desk user. Rules follow `plans/dispatch-structured.md` §3. Sources: `finals.jsx:5–6,12` (FIN 15–21,
WEB 8–13), the 'Catalogue · sale orders' registration `mod-appshell.jsx:271–274`, components `final.jsx:371–516`,
`web.jsx:254–335`, `mod-appshell.jsx:166–262`.

## 1. What goes, screen-wide

- **Pills → outlined tags.** `StatusPill` is 999px with a coloured dot in `T.ok` / `T.blue` / `T.warn` (`final.jsx:48`);
  `RetPill` same (`mod-appshell.jsx:262`). Replace with `DsTag`: 3px, 1px `T.line2` border, 10.5px uppercase, `T.ink2`
  text; `T.danger` border only for Cancelled / Rejected / overdue, `T.warn` only for due-soon.
- **Radius.** Cards `T.rCard` + soft shadow (`final.jsx:375`), `SOTable` frame 18 (`final.jsx:398`), `SOTable2` 18
  (`mod-appshell.jsx:172`), `ColumnChooser` 20 (`:190`), `GroupIsland` 20 + glass + 999px chips (`final.jsx:420–425`),
  `T.Kpi` 16 (`final.jsx:155`), `WCard` 18 (`web.jsx:308`). All → 4px panes, 3px chips, no shadow, 1px `T.line`.
- **Colour.** `T.accentSoft` group rows and filter-head tint (`final.jsx:385,393`), `T.gold` headings and tier donut
  (`final.jsx:481,509`), `T.blue` pipeline bar (`:482`), `T.ok` dispatched line and KPI tone (`:479,480,507`). Gone.
- **Money.** ₹ stays: these are manager / salesperson screens, not packer screens.

## 2. Screen by screen

**Cards (FIN 15, WEB 8).** Keep order no. (mono) head, customer, bill, pcs · designs, broker chip, printer / share
hits (`final.jsx:376–380`). Card → 4px box, 1px rule between head row and body, status tag top-right, chips 3px. Web
3-column grid stays (`web.jsx:258`); the selected-card ring (`accentSoft`) becomes a 1px `T.accent` border — the one
maroon line. Preview pane content unchanged.

**Table (FIN 16, WEB 9, full table `WebSalesTableFull`).** Already a ruled grid (`final.jsx:386–387`,
`mod-appshell.jsx:169–171`). Changes: 11px uppercase heads; rows 44px web / 56px phone; numeric columns right-aligned
tabular-nums (SO_COLS2 already flags `num`, `mod-appshell.jsx:168`); drop zebra `T.bg2`, keep the 1px row rule; frame
4px; fake scroll tracks (`final.jsx:399,402`) become plain 1px rules. The column filter card (`final.jsx:403–409`):
4px, no shadow, square checkboxes 3px, "Apply" is the maroon button. Footer totals line stays (`mod-appshell.jsx:174`).

**Column chooser (`WebSalesColumns`, `mod-appshell.jsx:188–211`).** Keep the seven groups and presets. Group boxes
→ 3px outlined, group icons `T.ink2` not `T.accent`, search field 3px. One maroon: the Apply button.

**Group by (FIN 17, WEB 9).** `GroupIsland` (`final.jsx:420`) becomes `DsGroupBar`: a flat 40px bar under the header,
column chips as `T.ink` filled 3px rectangles with a sort arrow. Group rows (`final.jsx:393`) lose `T.accentSoft`:
`T.surface2`, 12.5px semibold, count and ₹ right-aligned; agency sub-rows indented 12px.

**Opened order (FIN 18, WEB 10).** `CustomerBar` (`final.jsx:437`) → 4px, facts grid stays. `OrderLines`
(`final.jsx:446`): photo 44×56 (3px) beside every design number, content unchanged; colour swatch stays (product
colour, not status). Phone dock (`final.jsx:467`) loses glass: flat 56px bar, 1px top rule, Edit outlined, Approve the
maroon button.

**Returns (phone + web, `mod-appshell.jsx:232–262`).** Same card / table treatment; `RetPill` → `DsTag`
"BACK IN STOCK" / "ON APPROVAL" in `T.ink2`; dashed note box → 1px solid `T.line` box. Credit-note pane 4px.

## 3. Analytics (FIN 19–21, WEB 11–13)

Proposed, not confirmed: sale managers and above only; **phone = cards only**, **web = tables only**.

- **Chrome.** `RangeBar` (`final.jsx:473`) and `ATabs` (`web.jsx:307`): tab underline is the one maroon line; range
  and date chips 3px outlined. `AnalyticsPane` (`web.jsx:296`) keeps its sections, all rectangular.
- **KPIs.** `T.Kpi` 16px (`final.jsx:155`) → `DsKpi`: 4px, 28px tabular value, no `tone="ok"`; `tone="danger"` only
  for Overdue.
- **Orders vs dispatch.** Phone: one `LineG` with orders solid `T.accent`, dispatched dashed `T.ink3` (not `T.ok`).
  Pipeline bars (`final.jsx:482`): all `T.ink2`, Cancelled `T.danger`, 3px squares not 5px rounded. Web: pipeline and
  weekday become a ruled table (Status | Orders | Pcs | ₹), with a right-aligned count column.
- **Designs.** Phone: keep rows (`final.jsx:490–496`), photo beside number; sparkline `T.accent`, colour split bar stays
  (product colour). Web: `WCard` list (`web.jsx:316`) → 44px table Design | Category | Pcs | Orders | Colours | Trend;
  category donut in product colours is dropped for a Category | Pcs | % table.
- **Customers.** Phone: sale `T.accent`, payments dashed `T.ink3`; tier donut (`final.jsx:509`, gold) → three-row
  table; initial circles (`:512`) → square 3px initials in `T.surface2`. Overdue ₹ stays `T.danger`. Web: tier and
  city tables; customer list 44px rows, overdue column right.

## 4. Work list (next session)

1. New file `mod-sale-orders-ds.jsx`: `DsTag`, `DsKpi`, `DsGroupBar`, `DsTable` (wraps SO_COLS2 / RET_COLS), reuse
   `ORDERS_F`, `RETURNS_F`, `XD`, `money`, `agencyOf`.
2. `ScreenDsSO{Cards,Table,Grouped,Order,Returns}`, `WebDsSO{Cards,Table,Columns,Order,Returns}` on `WebShell3`
   (`web.jsx:132`), `module="Catalogue"`.
3. `ScreenDsAn{Orders,Designs,Cust}` (cards) and `WebDsAn{Orders,Designs,Cust}` (tables).
4. Register under NEW_DRAFT_MODULES 'Catalogue · sale orders · structured'; dark pass; owner confirms the §3 rule.
