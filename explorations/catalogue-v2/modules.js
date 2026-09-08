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
            Finals (finals.jsx BOARD entries) attach to a module through their own `id` field.

   Adding a module: create mod-<id>.jsx (+ mod-<id>-web.jsx), register from its END with
   (window.NEW_DRAFT_MODULES = window.NEW_DRAFT_MODULES || []).push({ module: '<Name>', note, subs: [...] }),
   then add one line below. Open board.html?m=<id>. Never edit index.html or board.html. */
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
    { id: 'catalogue',  name: 'Catalogue',  note: 'grid · product pages · scan · carts · sale orders · tags · returns',                       names: ['Catalogue'],  files: [] },
    { id: 'appshell',   name: 'App shell',  note: 'navigation shared by every module · search pane',                                           names: ['App shell'],  files: [] },
    { id: 'dispatch',   name: 'Dispatch',   note: 'ready · pending · packing · billed · out of stock · warehouse stock · sale return',          names: ['Dispatch'],   files: [] },
    { id: 'production', name: 'Production', note: 'purchase · materials · process setting · orders & lifecycle · job cards · samples · karigars', names: ['Production'], files: ['mod-production.jsx', 'mod-production-phone2.jsx', 'mod-production-web.jsx', 'mod-production-web2.jsx', 'mod-production-web3.jsx'] },
    { id: 'crm',        name: 'CRM',        note: 'follow-ups · share · payments · customers · journeys',                                        names: ['CRM'],        files: ['mod-crm.jsx', 'mod-crm-web.jsx', 'mod-crm-more.jsx', 'mod-crm-phone.jsx'] },
  ],
};
