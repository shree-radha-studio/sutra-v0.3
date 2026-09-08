/* FINALS · the signed-off screens. FIN = phone, WEB = laptop; BOARD groups them by module → sub-menu in flow order and
   points at 1-based indexes (ids f-<i> / fd-<i> / w-<i> / wd-<i> never change). Each BOARD entry carries the id of the
   module page it belongs to (modules.js). Never edit or reorder existing FIN / WEB entries; append. Moved out of
   index.html on 9 Sep 2026 when the board was split into per-module pages. */
const FIN = [['Catalogue grid · active cart', ScreenFGrid], ['Catalogue grid · no active cart', ScreenFGridNoCart], ['List view', ScreenFList], ['Listening · orb pressed', ScreenFVoice], ['Filters & sort · save as list', ScreenFFilters], ['Product · customer view', ScreenFProduct], ['Salesperson view · stock & production', ScreenFSales1], ['Salesperson view · recipe & media', ScreenFSales2], ['Salesperson view · analytics & orders', ScreenFSales3], ['Scan · recognised-product pop-up', ScreenFScan], ['Full-screen viewer · view only', ScreenViewer], ['Carts · grouped by design, totals', ScreenFCarts], ['Cart card · double tap on a cart chip', ScreenCartCard], ['Side menu · all modules', ScreenSideMenu], ['Sale orders · cards', ScreenFSalesOrders], ['Sale orders · table in its frame, column filter', ScreenFSalesTable], ['Sale orders · group by island, grouped table', ScreenFSalesGrouped], ['Sale order · opened', ScreenFSalesOrder], ['Analytics · orders vs dispatch', ScreenFSOAnalytics], ['Analytics · designs (SKU)', ScreenFSKUAnalytics], ['Analytics · customers', ScreenFCustAnalytics]];
const WEB = [['Catalogue · grid, cart pane', WebGridS], ['Catalogue · list view', WebListS], ['Sidebar expanded · collapsible sub-menus', WebSidebarS], ['Listening · orb pressed', WebVoiceS], ['Product · customer view', WebProduct], ['Product · salesperson view', WebSales], ['Carts', WebCarts], ['Sale orders · cards, order preview pane', WebSalesOrders], ['Sale orders · grouped table, column filter, pane collapsed', WebSalesTable], ['Sale order · opened, customer pane', WebSalesOrder], ['Analytics · orders', WebAnalyticsOrders], ['Analytics · designs (SKU)', WebAnalyticsSKU], ['Analytics · customers', WebAnalyticsCust], ['Full-screen viewer', WebViewer]];
/* module → sub-menu → screens. `id` = module id in modules.js. */
const BOARD = [
  { id: 'catalogue', module: 'Catalogue', note: 'picture-first grid · product pages · scan · carts · sale orders', subs: [
    { name: 'Catalogue', flow: 'grid → list → filters → listening → product, customer → salesperson (3) → scan → full-screen viewer', phone: [1, 2, 3, 5, 4, 6, 7, 8, 9, 10, 11], web: [1, 2, 4, 5, 6, 14] },
    { name: 'Carts', flow: 'carts → cart card over the catalogue', phone: [12, 13], web: [7] },
    { name: 'Sale orders', flow: 'cards → table → group by → opened order → analytics (orders, designs, customers)', phone: [15, 16, 17, 18, 19, 20, 21], web: [8, 9, 10, 11, 12, 13] },
  ] },
  { id: 'appshell', module: 'App shell', note: 'navigation shared by every module', subs: [
    { name: 'Navigation', flow: 'phone side menu · web sidebar expanded (rail, tab strip and header v2 are on every web final)', phone: [14], web: [3] },
  ] },
];
Object.assign(window, { FIN, WEB, BOARD });
