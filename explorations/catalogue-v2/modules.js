/* BOARD MANIFEST · which files each module page loads. Plain JS, read by board.html before anything else.

   base     files every page loads, in this order. The shared chrome plus the module files other modules borrow
            primitives from (Body, Meta, Pill, Mono, A4, Journey, SheetBody …). Add a file here only when another
            module needs something from it.
   modules  ONE LINE PER MODULE, appended at the end. Nothing else in this file is edited by module work.
              id     the page: board.html?m=<id>
              name   the hub label
              names  prefixes matched against the `module:` field of your window.NEW_DRAFT_MODULES.push({...})
                     entries; 'Catalogue' matches 'Catalogue · tags' and 'Catalogue · sale orders'
              files  your mod-*.jsx files, in load order, after base. Files already in base are not repeated.
              about  optional · one plain sentence on what the module is for, shown on its Overview card (index.html)
            Finals (finals.jsx BOARD entries) attach to a module through their own `id` field.

   Adding a module: create mod-<id>.jsx (+ mod-<id>-web.jsx), register from its END with
   (window.NEW_DRAFT_MODULES = window.NEW_DRAFT_MODULES || []).push({ module: '<Name>', note, subs: [...] }),
   then add one line below. Open board.html?m=<id>. Never edit index.html, hub.html or board.html. */
window.SUTRA_MODULES = {
  base: [
    '../../design-system/ui_kits/sutra-mobile/ios-frame.jsx',
    '../../design-system/ui_kits/catalogue-explorations/common.jsx',
    '../../design-system/ui_kits/catalogue-explorations/themes.jsx',
    '../../design-system/ui_kits/catalogue-explorations/screens.jsx',
    'themes2.jsx', 'screens2.jsx', 'final.jsx', 'web.jsx',
    'mod-appshell.jsx', 'mod-catalogue-tags.jsx', 'mod-dispatch.jsx', 'mod-dispatch-web.jsx', 'mod-topbar2.jsx',
  ],
  modules: [
    { id: 'catalogue',  name: 'Catalogue',  note: 'grid · product pages · scan · carts · tags',                                               about: "Salespeople show designs to customers in the cabin and build a cart per customer. Picture first: a design is found by its photo, scanned or spoken; Customer mode hides stock and internal tags.", names: ['Catalogue'],  files: [] },
    { id: 'sales',      name: 'Sales',      note: 'sale orders · opened order · returns · analytics (orders, designs, customers)',               about: "What happens to a cart after it is submitted: the sale orders by status, an opened order, returns with their credit notes, and sale analytics for managers. Split from Catalogue on the board only (10 Oct); in the app it is still Catalogue › Sale orders.", names: ['Sales'],      files: [] },
    { id: 'appshell',   name: 'App shell',  note: 'navigation shared by every module · search pane',                                           about: "The frame every module shares: the phone island and side menu, the web rail and sidebar, the tab strip of open screens, the header and the search pane.", names: ['App shell'],  files: [] },
    { id: 'dispatch',   name: 'Dispatch',   note: 'ready · pending · packing · billed · out of stock · warehouse stock · sale return',          about: "The warehouse: what is ready to pack, what is pending, packing pieces into boxes with a scanner, invoices and shipments, out of stock, stock and sale returns. Packers never see money.", names: ['Dispatch'],   files: ['mod-dispatch-s.jsx', 'mod-dispatch-s-web.jsx'] },
    { id: 'production', name: 'Production', note: 'purchase · materials · process setting · orders & lifecycle · job cards · samples · karigars', about: "Making the designs: buying and dyeing material, the recipe of each product, production orders and job cards with karigars, samples and costing.", names: ['Production'], files: ['mod-production.jsx', 'mod-production-phone2.jsx', 'mod-production-web.jsx', 'mod-production-web2.jsx', 'mod-production-web3.jsx'] },
    { id: 'crm',        name: 'CRM',        note: 'follow-ups · share · payments · customers · journeys',                                        about: "Keeping customers buying: the day's follow-ups, sharing designs on WhatsApp, chasing payments, the customer dossier and automated journeys.", names: ['CRM'],        files: ['mod-crm.jsx', 'mod-crm-web.jsx', 'mod-crm-more.jsx', 'mod-crm-phone.jsx'] },
    { id: 'studio',     name: 'Studio',     note: 'AI designer Stitch · tracks · designer terminal · context selector · moodboard · history · memory · settings',           about: "Stitch, the AI designer: generate and refine designs by category, with a moodboard, a memory of what works and a history of every picture.", names: ['Studio'],     files: ['mod-studio.jsx', 'mod-studio-web.jsx'] },
  ],
};
