# Studio › AI Designer "Stitch" — plan (8 Sep 2026)

Built from `design-system/research/brd-final.txt` lines 275–287 (the Studio section) and the keyword sweep of every BRD
text (studio, designer, stitch, moodboard, inspiration, template, photoshoot, sample, in designing, wip, material
design, pinterest, insta, whatsapp, scrape, agent, memory, taste, metadata, tuner, sketch, colourway, category), the
role lines (F:26–39), the chips guideline (`design-system/guidelines/chips-filters-sorts.md` §3G, C:220–230), the
production plan's Samples section (P:266–297), the screen inventory, `design/SUTRA-SCREEN-FLOW.md`, the reference
images the owner put in the BRD (copied to `plans/refs/studio-designer/`, see §8) and the owner's brief of 8 Sep
(§6). The v1 agent study (§7) decided what the agent can do; the screens follow that scope.

Sources are cited as F:line (brd-final), M:line (brd-masters), B:line (Business Req, the older BRD), C:line (chips
guideline), P:line (plans/production.md), R:name (reference image), O (owner's brief, 8 Sep).

Nothing here is a stack or backend decision. Anything the architecture pass will need is logged in
`design/during-ui-technical-design.md`; business rules not in the BRD are in
`design/during-ui-business-requirements.md`. The BRD-style write-up of capability and scope is
`design/brd-studio-ai-designer.md`.

## 0. Shape of the module

- **Where it sits.** Studio is the rail module (the `sparkles` icon already in the rail, F:40). Its header sub-menu
  buttons are **Stitch · Moodboard · Memory · Photoshoots · Upload centre**. This plan draws the first three (the AI
  designer); Photoshoots (F:278) and Upload centre (F:277) are separate plans later and appear only as buttons. The
  agent tuner (F:279 "a module within this designer module … opens as a side pane from right of the screen with a
  translucent type background … organized tabs of its own") is not navigation: it is a glass pane opened from a
  Tune control in the header's right cluster, available on every Studio screen.
- **Web-first.** The designer is a desk terminal (laptop 1280 × 800): a Claude-Design-like chat column on the left,
  the canvas in the centre, the module's right pane as the properties and generation pane, the context selector as
  a floating glass dialog, the tuner as a translucent right overlay. The phone is the companion: chat with canvas
  cards, WhatsApp share-in to the moodboard, quick review and approval of sets, sheets for everything else.
- **One agent, one honest v1.** Stitch v1 is a context + template image generator built fully, with one region-edit
  move and a truthful memory panel (§7). It is not a pattern/3D tool: the VStitcher reference (R:editor-vstitcher)
  gives the three-pane anatomy — library left, canvas centre, properties right — not the feature set. Every render
  carries "AI render · not a fit sample".
- **Context is the firm's own catalogue** (F:3 "design-with-ai-using-business's-own-products-and-materials"): the
  context selector picks from Products · Materials · Samples · WIP · Moodboard with filters and sorts, and sends the
  house-computed metadata (demand score, pcs sold by colour, returns, read state; F:3, F:72–75) only while the
  metadata switch is on (F:279).
- **Outputs hand off, they do not become products.** A picked design is saved as a sample draft into Production ›
  Samples › In designing (F:88, P:266–281) with the sketch, references and notes pre-filled; the sample lifecycle
  and W25 finalise do the rest. Stitch never creates a product master.
- **Money.** ₹ (sold ₹ in metadata, cost so far, target price) only for admin, sub-admin, production manager and
  merchandiser when they hold Studio (M:121 "omitted, not hidden"); office manager and any view-only role see
  metadata without ₹. Drawings are the owner's view; the view-only variant is not drawn separately.
- **Roles** (F:27–39): admin/owner and sub-admin edit; office manager views; sale executive and dispatch manager have
  no Studio (F:32, F:34); production manager and merchandiser are silent in the BRD — assumed view plus "Save as
  sample" (open question 5). There is no "design team" role yet (open question 5).

## 1. Sub-menus (top bar v2 order)

1. **Stitch** (F:279) — sub-sub tabs **Tracks · Designer**. Default node. Tracks is the landing (every session is a
   named track); Designer is the terminal for the open track.
2. **Moodboard** (F:282–283) — sub-sub tabs **Mine · Stitch's**. Mine is the owner's uploads and links, enriched by
   Stitch with marked additions and a one-click "Only my uploads & links" switch (O); Stitch's is what the agent
   collected and generated, grouped by track / task / session (O).
3. **Memory** (F:279 "its own tracks/history/memory … RL'ed on taste") — sub-sub tabs **Sessions · What works ·
   Settings**. History of what was sent and made; the correlation of Stitch's choices with what sells (O); context
   and memory settings (O).
4. Photoshoots (F:278) — button only in this plan.
5. Upload centre (F:277) — button only in this plan.

Not navigation: the **Tune** control (header right cluster, `sliders-horizontal`) opens the tuner pane; the
**Context** button in the chat column opens the selector dialog; **Customer mode** does not exist in Studio.

Phone: Stitch · Moodboard · Memory · Photoshoots · Upload centre as the node scroller under the search island,
opening on Stitch › Tracks.

## 2. Screens in flow order

Format per line: purpose · who · web right pane · phone floats/sheets · money · links.

### 2.1 Stitch › Tracks

**W1 Tracks** — the landing: "Start from a category" cards across the top (Lehenga · Saree · Blouse · Choli set ·
Dupatta · Material; F:280 "design inspiration and templates according to product categories"), each showing its
template set as small icons (Cuts 4×3 · Design sheet 20 · Flat lay 6 · Colourways · Sketch); under it the tracks
list — one row per track: last render thumb, track name (auto-named from the main context, e.g. "Multicolour
floral blouse · cuts", editable), category chip, main + refs count, versions count, last worked, state pill (Open ·
Saved as sample S-0412 · Shared · Archived); quick chips Open · Saved as sample · This week · Category ▾; sort Last
worked · Newest · Most versions; a "+ New track" button and a prompt field that starts a track straight away ·
admin, sub-admin, merchandiser · right pane: the picked track's summary (context thumbs, prompts, versions strip,
"what was sent" line with the metadata state, Open · Branch · Archive) · — · none · Designer → W2, Samples › W24
when saved.

**P1 Tracks** — search island, node scroller (Stitch · Moodboard · Memory · Photoshoots · Upload centre), category
cards as a horizontal scroller, track rows in one column, the prompt field as a glass tray above the island ·
same · — · — · none · P2.

### 2.2 Stitch › Designer (the terminal)

**W2 Designer · set on the canvas** — the three-pane terminal (§4). Left, the **chat column** (300): track head
(name, category, Branch), the **context tray** (selected items as 44 px thumbs with a Main ring on one and "ref" on
the rest, the metadata switch "Send sales data · on", "+ Context" → W5), then the conversation (user bubbles as
chip-coloured pills, Stitch replies as plain text beside the orb, each reply carrying the set it made as a small
strip), and the **prompt box** at the foot: text field, attach, two caret chips **Template ▾** (Cuts grid · Design
sheet · Flat lay · Colourways · Sketch · Close-up of work · On model · Material into inspiration) and **Grid ▾**
(4×3 · 5×4 · 3×2 · 2×3 · single), a row of one-click template chips that preset both, Send. Centre, the **canvas**:
a dotted stage holding the generated set (here the 4×3 cuts grid, R:output-12-grid) with every cell a pickable tile
(number badge, tick on hover), a floating glass tool palette (select · zoom · compare · full screen), the
**version strip** under the stage (v1 … v6 thumbs, current ringed, "+" for a new generation), and the corner label
"AI render · not a fit sample". Right pane 340 = **Set options**: what was generated (template, grid, main + refs,
metadata state), one-click follow-ups on the whole set (Re-run · Re-run with metadata off · More like cell n ·
Colourways from picked · Sketch of picked), then Save picked as sample · Save to moodboard · Share (WhatsApp packet)
· admin, sub-admin, merchandiser · pane = Set options · — · none · W3 (pick a cell), W5 (context), W7 (save), W13
(tune).

**W3 Designer · tile picked, zone selected, material placed** — a cell was picked (it fills the stage, the set shrinks
to the version strip); Stitch drew the **zone overlay** on load (blouse: neckline · bodice · sleeves · hem; lehenga:
kali panels · border · waistband · dupatta; saree: pallu · border · body · blouse), zones as dashed outlines with a
label pill, the active one ringed in accent; a material tile from the context tray was dragged onto the sleeve
zone (the drop target glows) and the right pane is now the **Zone pane**: zone name, Material (the dropped catalogue
material with its photo and code, Change), Colour (catalogue colour names), Work (Zardozi · Sequins · Mirror ·
Cutdana · Thread · Plain), Scale and Density sliders, Repeat (segmented), then **Drape** for the whole garment
(Flat · Draped on mannequin · Pleated · Pallu fall · Kali flare · Dupatta over shoulder), and the buttons
**Regenerate zone** and **4 variations**; the 4 variations arrive as a strip under the stage ("Sleeve · 4 of 4",
pick one, Keep) · same · pane = Zone pane · — · none · W4 (versions), W7 (save).

**W4 Designer · re-prompt and versions** — the chat carries "same but sweetheart neck, in emerald velvet"; the stage
shows the new version with the previous one as a ghost for compare (the palette's compare tool, a 50/50 slider); the
version strip has grown to v7 with a branch mark where the zone edit forked; the right pane is the **Version pane**:
prompt that made it, context used, template, "what was sent" (metadata on · demand score band · pcs 30 d), Keep ·
Discard · Make this the main · Sketch · Close-up · On model (marked preview only) · same · pane = Version pane · — ·
none · W7.

**P2 Designer · chat with canvas cards** — the track's chat full screen: Stitch's replies carry a **canvas card**
(the set or the picked design, zone chips under it, version dots, Open); the prompt tray at the foot with the
template chips scrolling sideways and the Template ▾ / Grid ▾ carets; a context strip above the tray (thumbs, Main
ring, "+"); metadata state as a small line under the strip · same · — · P3, P5 · none · P3.

**P3 Designer · canvas full screen** — the picked design full-bleed with zone chips over it (tap to select), a
version rail at the foot like the viewer's, and a glass tray: Regenerate zone · 4 variations · Drape ▾ · Save · Share
· same · — · P4 · none · P4.

**P4 Designer · zone sheet** — the Zone pane as a sheet: material row (tap to pick from the context strip or the
Materials tab of the selector), colour, work chips, scale and density sliders, drape segmented, Regenerate · 4
variations · same · — · sheet over P3 · none · —.

### 2.3 Context selector (from the chat column, the prompt box's attach, or a category card)

**W5 Context · selector dialog, Products** — a centred glass dialog 880 × 620 over the terminal (F:279 "pop up grid
with filters and sorts"): head with the search field ("design no, material, colour, tag"), the **metadata switch**
("Send sales data" on: tiles show the small demand-score number and 30 d pcs, F:279, C:224) and Close; hard tabs
**Products · Materials · Samples · WIP · Moodboard** (C:224 plus Samples, O); the Products grid as 4-column photo
tiles with the veiled foot line (design no · category · demand score when on) and the tick + ring selection of the
CRM picker; quick chips High demand · High growth · Category ▾ · Colour ▾ · Work ▾ · Recent; sort caret (Demand score
· Newest · Best selling 30 d · Rank) and a Sort & filter button; the **selection tray** at the foot: picked thumbs (tap
one to make it Main, the rest are refs, cap 8), "Add 5 to context" · same · — (dialog over the terminal; the right
pane stays) · — · ₹ never on tiles; sold ₹ appears only in the "what was sent" line for money roles · W2.

**W6 Context · Materials tab with sort & filter** — the Materials grid (swatch photo, material name and code, shade,
group, stock word In · Low · Out, last inward) with quick chips In stock · Group ▾ · Shade ▾ · Work/finish ▾ · Used in
active jobs · Dye WIP (P:99–107); the shared sort & filter sheet open as a glass popover anchored over the grid
(sorts Last inward · Stock · Name · Used in; groups Group · Shade · Finish · Stock · Supplier · Used in); the
Samples tab (temp no, photo or "No photo yet", state chips In designing · Deployed · Activated · Reading n/15,
P:270–277, C:186) and the WIP tab (process WIPs with their lineage, "Dye WIP") are described in the plan's BRD
companion and share this drawing · same · — · — · none · W2.

**P5 Context · picker sheet** — full-height sheet: tabs row, metadata switch, 3-column photo grid (phone picker
rows of 3), quick chips, tray with Main/ref and "Add n" · same · — · sheet over P2 · none · P2.

### 2.4 Hand-off

**W7 Save as sample** — a sheet from the right pane: the picked render large, "New sample · S-0413" (temp number),
category, colours detected (editable, catalogue colour names), target price (money roles), notes ("from track
Multicolour floral blouse · cuts · v7"), reference links (the main product, refs, moodboard items, Pinterest link),
what lands where in the sample's photo strip (sketch · reference · first piece, P:279–281), and Create sample ·
Open in Samples; alternatives on the same sheet: Save to moodboard (Mine or Stitch's) · Share as WhatsApp packet
(the CRM composer, F:94, B:117) · Send to Photoshoots (v2, greyed "coming later") · admin, sub-admin, production
manager, merchandiser · sheet · — · target price for money roles · Samples › W24, CRM › W5 composer.

### 2.5 Moodboard

**W8 Moodboard · Mine** — sub-sub tab Mine; the switch **"Only my uploads & links"** at the top right (O: one-click
segregation; when on, Stitch's additions vanish and the count changes); a photo grid of uploads, pasted links
(Pinterest / Instagram thumbnail with the link mark), WhatsApp share-ins (the WhatsApp source mark, F:282 "uploaded
via whatsapp share") and Stitch's enrichments (each with a small "by Stitch" mark and a source line: "from Insta
link · 12/08", "similar to 8111"); quick chips New · Unused · Uploads · Links · WhatsApp · By Stitch · Category ▾ ·
Colour ▾ (C:225); sort Newest · Most used · Category; select mode with a tray (Use as context · Pin · Remove);
"+ Upload" and "Paste a link" · same · right pane: the picked item (large, source, when added, used in which
tracks, Use as context · Pin · Remove) · — · none · W5 (as a tab), W2.

**W9 Moodboard · Stitch's** — sub-sub tab Stitch's; the grid grouped by **track / task** ("Multicolour floral
blouse · cuts · 24 items", "Bridal lehenga · borders · 18") and, inside a group, by kind (Collected · Generated ·
Kept); a **Replenish** button that asks Stitch to add 12 items (v1: from the firm's catalogue and Mine; web
collection "coming later" in a quiet note, F:283); quick chips This week · Collected · Generated · Kept · Track ▾
(C:225); the same pane as W8 plus "Why this?" (Stitch's one-line reason) · same · pane · — · none · W2.

**P6 Moodboard · Mine** — the switch under the node scroller, 3-column grid with source marks, select-mode tray,
upload and paste-a-link chips · same · — · P7 · none · —. **P7 Moodboard · Stitch's** — grouped sections, Replenish
chip · same · — · — · none · —.

### 2.6 Memory

**W10 Memory · Sessions** — sub-sub tab Sessions; a timeline list by day: each session row = track thumb, track
name, prompts count, sets made, what was sent (context thumbs, metadata on/off, which fields), what came of it
(saved as S-0412 · shared · nothing kept); quick chips This week · Saved · Shared · Metadata on · Track ▾; sort Newest
· Longest · Most kept · admin, sub-admin · right pane: the picked session — the exact context list and the metadata
lines that were sent ("demand score 87 · 5.4 pcs/day · 3 of 4 colours free", M:45), the prompts, Reopen track ·
Forget this session · — · sold ₹ lines for money roles · W2.

**W11 Memory · What works** — sub-sub tab What works; the head says what this is ("Stitch designs that became
samples, joined to what the ERP already records; rows, not conclusions"); a table: render thumb · track · saved as
(S-no) · activated (date or —) · read (n/15, complete) · demand score with sparkline · pcs ordered · returns ·
verdict pill (Working · Weak · Too early); above it three KPIs (Designs saved · Activated · Working) and a
"Stitch's reading" card that shows one line only when there are at least 5 finished rows, else "Not enough data
yet"; under the table the **taste rules** list (each rule with its provenance: typed by you 04/09 · proposed by
Stitch from track X, an on/off switch, Edit, Remove; "prefer sweetheart over halter", "never plain net sleeves")
and "+ Add a rule"; quick chips Working · Weak · Too early · Category ▾; sort Demand score · Pcs · Newest · same ·
right pane: the picked row — the render beside the product or sample photo, the numbers by colour, "Make more like
this" (starts a track with it as Main) · — · pcs and score for everyone with Studio, ₹ never here · W2, Samples ›
W23.

**W12 Memory · Settings** — sub-sub tab Settings; groups of toggle rows: **Context sources** (Catalogue metadata ·
Moodboard Mine · Moodboard Stitch's · Previous tracks · Taste rules, each on/off; "Web collection · coming later"
greyed), **Sales data** (default for the metadata switch: on / off / ask each time; which fields: demand score ·
pcs 30 d · pcs lifetime · returns · read state · sold ₹ (money roles)), **Memory** (remember tracks: always · ask ·
never; keep sessions for 30 d · 90 d · a year; "Forget everything Stitch learned" behind a confirm), **Sharing**
(WhatsApp share-in number for the moodboard, who can see my tracks) · admin, sub-admin · right pane: "What Stitch
sends" preview — the context block as Stitch will see it for the current settings · — · — · —.

**P8 Memory** — tabs Sessions · What works · Settings under the node scroller; session rows, the what-works table as
cards (thumb, S-no, score, pcs, verdict), settings as toggle rows · same · — · — · none · —.

### 2.7 Tuner pane (not navigation)

**W13 Tuner · pane open over the designer** — the translucent right overlay 360 wide (glass, blur, the terminal
visible behind, F:279) with the orb and "Tune Stitch" in its head, tabs **Templates · Workflow · Models · Usage ·
Memory**: Templates = one row per one-click template (icon, name, the prompt behind it in an editable box, the
default grid, the reference images it follows with "+ Upload a template reference", F:286, seeded vs personal like
the report templates, M:197–198); Workflow = steps of a run (Understand context → Draft set → Pick → Refine zone →
Render) with loops ("re-run until n distinct cuts", max tries), drape defaults, cell count; Models = which image
model each template uses (named the way the BRD does: nano banana · gpt image), keys set / not set, test call; Usage
= runs per template this month, images made, failures, cost for admin; Memory = the same "what Stitch sends" preview
as W12 · admin, sub-admin · overlay over W2 · — · cost for admin only · W2.

**P9 Tuner · sheet** — the same five tabs as a full-height sheet from the header's Tune control · admin · — ·
sheet over P2 · cost for admin only · —.

## 3. Found elsewhere in the BRD

- F:3 — "design-with-ai-using-business's-own-products-and-materials hub with a dedicated designer agent" → the
  context selector is the primary input, not a blank prompt (W2, W5).
- F:3 — "we calculate a product's demand graph score …" → the metadata sent to Stitch is the house data, never
  Busy's accounting figures (W5 switch, W10 "what was sent").
- F:25, B:146 — "Samples and raw materials may exist without a final product photograph" → "No photo yet" tiles in
  the Samples and Materials tabs (W6).
- F:66–71 — required media per product (primary, side profiles, AI shoot, real shoot, video) → the selector shows a
  product's media state; a Stitch render is never dropped into a product's slots in v1 (hand-off is a sample).
- F:72–75 — recipe with live stock, demand graph, last-month and lifelong sales → the metadata fields behind the
  switch (W5, W12).
- F:82 — search "with big size pictures to actually identify, and with filterable/sortable options" → the selector
  head's search and the tile size (W5).
- F:88, F:257 — samples "in designing" and "deployed, without production order" → the state a saved design enters
  (W7 → Samples W23/W24).
- F:94, B:117 — share packet options (logo, video, message templates) → Stitch shares through the CRM composer,
  no second share flow (W7).
- F:140 — the job's primary picture can be the sample image → a saved render becomes the sample's sketch slot,
  then the job's picture downstream (noted, not drawn).
- F:147, P:290–294 — costing with a default margin, ₹ for money roles → target price on W7 for money roles;
  costing is one hop from the sample, not from Stitch.
- F:200, D:50 — the demand score is a nightly engine value → tiles say "as of last night" in the selector's foot
  (W5).
- B:36 — "primarily photos based … except for the samples module and materials module" → photo-first tiles; the
  Samples and Materials tabs may lead with text and a swatch (W6).
- B:43–44, B:110 — sample issuing against a temporary design number in any process order → W7 creates exactly
  that record; Stitch adds nothing to the process.
- B:65–66, B:101–102 — trendiness score, priority sample production, high-growth first-time samples → the High
  growth and High demand quick chips in the selector; "Make more like this" in What works (W5, W11).
- B:72 — category and "design's work" as filter axes → Category ▾ and Work ▾ chips (W5, W6); the category cards on
  Tracks (W1).
- M:26, M:46 — "Never scored" → tiles with metadata on show "Never scored" rather than a blank (W5).
- M:45, M:121 — sold ₹ is money; omitted from the payload for roles without the right → sold ₹ only in the "what
  was sent" lines for money roles (W10, W12).
- M:123, F:26 — access is a server answer; users may ask for a screen's permission for a period → locked Studio
  shows "Locked · ask for 24 h · 1 w · 1 m · 3 m" (noted for the shell, not drawn here).
- M:197–198 — report templates: seeded render plain, personal carry a star, one click restores the whole state →
  the same rule for Stitch's templates in the tuner (W13) and the one-click chips (W2).
- C:53 — chip precedence on selling surfaces including Studio (High growth > Priority sale > …) → one action chip
  per tile in the selector (W5).
- C:186 — Samples hard tabs and chips → the Samples tab of the selector uses them (W6).
- C:222–223 — sibling Studio screens' grammar (upload centre "n/m media", photoshoot Queue · Completed · Failed) →
  reserved for their own plans; the sub-menu buttons only (W1).
- C:224 — "Stitch context selector. Hard tabs: Products · Materials · WIP · Moodboard. Quick: High PDS · High
  Growth · Category ▾ · Colour ▾ · Recent · Metadata on/off. Card: photo + small PDS number when metadata is on." →
  followed; Samples added as a tab per the owner (O), logged in the business notes.
- C:225 — "Moodboard. Hard tabs: All · Pinned · Auto-scraped · Uploaded · Used. Quick: New · Unused · Category ▾ ·
  Colour ▾ · Source ▾." → reshaped into Mine · Stitch's per the owner (O); the source and use chips survive as
  quick chips (W8, W9).
- C:276 — reading state must be queryable for Samples and Studio → the Reading n/15 chip in the Samples tab (W6)
  and the read column in What works (W11).
- P:266–281 — a sample's head: temp no, photo strip (sketch · reference · first piece), category, target price,
  notes, reference links → exactly the fields W7 pre-fills.

## 4. Editor pane anatomy

Web, 1280 × 800 (rail 60 + 12 margins, tab strip 29, header 70, page padding 24):

```
┌ rail ┬───────────────────────────────────────────────────────────────────────────┐
│ 60   │ tab strip: [Studio · Stitch] [S-0412 · sample] +                           │
│      ├───────────────────────────────────────────────────────────────────────────┤
│      │ Studio › Stitch      Stitch · Moodboard · Memory · Photoshoots · Upload    │
│      │ Multicolour floral blouse · cuts                bell · search · tune · orb │
│      ├───────────────────────────────────────────────────────────────────────────┤
│      │ Tracks   Designer                                                          │
│      ├──────────────┬───────────────────────────────────────┬────────────────────┤
│      │ chat 300     │ canvas (flex ≈ 520)                    │ right pane 340     │
│      │ track head   │ ┌ tools: select zoom compare full ┐    │ Set options /      │
│      │ context tray │ │                                  │    │ Zone pane /        │
│      │  [M][r][r][+]│ │   set or picked design           │    │ Version pane       │
│      │  send data ● │ │   zone overlay when picked       │    │ (tabs at the top)  │
│      │ messages …   │ │                                  │    │ material · colour  │
│      │              │ └──────────────────────────────────┘    │ work · scale       │
│      │              │ "AI render · not a fit sample"          │ drape ▾            │
│      │ prompt box   │ version strip  v1 v2 v3 [v4] v5 +       │ Regenerate zone    │
│      │ Template▾ Grid▾ chips… Send                            │ 4 variations       │
│      └──────────────┴───────────────────────────────────────┴────────────────────┘
```

- Chat column collapses to a 56 px spine (orb + context count) to give the canvas 760 px when comparing versions.
- The tuner is an absolute glass overlay at right: 16, top: 101, bottom: 16, width 360, over the pane.
- The context selector is a centred glass dialog 880 × 620 with a scrim; the terminal stays visible behind it.

Phone (390 × 844): P2 is the chat with canvas cards and the prompt tray; P3 is the canvas full-bleed with zone
chips, version rail and a glass action tray; P4 and P5 are sheets; the island stays (Studio is under More on the
island, F:40).

## 5. Components

### Reused as they are

Phone chrome from `final.jsx` via `attachFinal(T)` (TopBar, SearchBar, Lists, Header, GridCard, Island, Dock, Btn,
Chip, Tag, PhotoTag, Kpi, Card, H), `frameF` / `scrimF`, `Orb` (Stitch's avatar), `veil`, `glass`; the web shell from
`web.jsx` (`WebShell3`, `Rail2`, `TabStrip`, `Header3`, `SubMenu`, `ViewTabs`, `RightPane`, `LaptopDevice`); the
floating right pane pattern from `mod-appshell.jsx` (`SearchPane` geometry for the tuner); the photo picker from
`mod-crm.jsx` (`PickGrid`, `PickTile`, `PickThumb`, `PickHead`, `PacketPane` for the selection tray, `Seg`,
`LogoRail` as the version strip, the `Slider` inside `LogoControls`, `Gauge`); `Sheet`, `Body`, `Meta`, `OutBtn`,
`Pill`, `Thumb`, `Sect`, `DSearch` from `mod-dispatch.jsx`; `Field`, `Tbl`, `Swatch`, `MatCard`, `MatRow` from
`mod-production.jsx`; the sample tile with "No photo yet" from `mod-production-web2.jsx`; the shared sort & filter
sheet `SheetBody` / `SheetFoot` from `mod-catalogue-tags.jsx`; viz `LineG`, `Line`, `Kpi`, `Legend`; the centred
dialog geometry of `ColumnChooser` and the composer overlay of `mod-crm-web.jsx` for W5 and W7.

### New for Studio (in `mod-studio.jsx` phone and `mod-studio-web.jsx` web, exported on `window`, all prefixed St)

- `StShell` — three-line `WebShell3` wrapper fixing module Studio, the five sub-menu buttons and the tabs.
- `StChatColumn`, `StMsg`, `StPrompt`, `StContextTray` — the chat column, a message, the prompt box with the two
  carets and the template chips, the context tray with Main ring and the metadata switch.
- `StCanvas`, `StZoneChip`, `StVersionStrip`, `StCompare` — the dotted stage with set or picked design, zone
  outlines and labels, the version rail with branch mark, the 50/50 compare.
- `StSetPane`, `StZonePane`, `StVersionPane`, `StSlider`, `StToggleRow` — the three right-pane states and their
  controls.
- `StContextPicker`, `StTile` — the selector dialog with tabs, quick chips, grid per tab, tray and foot.
- `StSaveSheet` — the hand-off sheet.
- `StMoodGrid`, `StMoodTile`, `StOnlyMine` — moodboard grids with source marks and the segregation switch.
- `StSessionRow`, `StWhatWorks`, `StTasteRule`, `StSettings` — Memory.
- `StTunerPane` — the translucent tabbed overlay.
- `StCanvasCard`, `StHeader`, `stDock`, `ST_NODES_P` — phone chrome and the canvas card in chat.
- Mock data: `ST_TRACKS`, `ST_SESSIONS`, `ST_VERSIONS`, `ST_ZONES`, `ST_TEMPLATES`, `ST_MOOD`, `ST_WORKS`.

Registration at the end of `mod-studio-web.jsx` via `window.NEW_DRAFT_MODULES.push({ module: 'Studio · AI Designer
(Stitch)', … })` with subs Stitch › Tracks · Designer · Context · Hand-off · Moodboard · Memory · Tuner, and two
script tags in `index.html` after `mod-crm-web.jsx`.

## 6. From the owner's brief of 8 Sep (not in any BRD; logged in design/during-ui-business-requirements.md)

- The context selector must pick from **Samples** as well as products, materials and WIP, with filter and sort
  options (C:224 listed Products · Materials · WIP · Moodboard only).
- Two kinds of template: **grid templates** (how many cells, which layout) and **pre-defined output templates**
  (the format: white moodboard grid, numbered design sheet, flat lay, sketch, model), selectable separately or
  through one-click chips that preset both.
- **Moodboard** is a sub-menu with two sub-sub menus: the user's (enriched by Stitch, with a one-click switch to
  see only the user's own uploads and links) and Stitch's (collected for tasks and previous sessions).
- **Memory** is a sub-menu showing how Stitch's design choices correlate with what actually works in sales, with
  settings for context and memory.
- The **designing and editing** screen follows the three-pane anatomy of the garment-CAD reference; the chat and
  editor together work like Claude Design; materials are **brought on, placed and folded** with one-click
  generation options.
- Decide **what kind of designer agent is easiest for version 1** and write capability and scope into the BRD.

## 7. Version 1 agent — the decision (summary of the study; full text in `design/brd-studio-ai-designer.md` §2)

Four archetypes were compared: A context + template generator (easiest; it is exactly the owner's own ChatGPT
usage in R:input-chatgpt-grid-prompt → R:output-12-grid), B = A plus a region editor (one more interaction, a
quality risk at the mask edge on embroidery), C a pattern/3D garment builder like the VStitcher reference (a
different product), D an autonomous web-scraping agent with memory (needs a season of ERP data first).

**V1 = A built fully + one B move + one D behaviour.** Can: pick context (Products · Materials · Samples · WIP ·
Moodboard, up to 8, one Main), metadata switch, prompt or one-click template, sets on the canvas with pickable
cells, re-prompt into versions, one zone edit (drop a material / colour / work, regenerate the zone, 4 variations,
drape as a whole-garment re-render), Colourways with catalogue colour names, Save as sample draft, Save to
moodboard, Share as WhatsApp packet, named tracks with branches, taste rules with provenance, a truthful What works
panel, the tuner. Not in v1: multi-zone or chained edits (v1.5); physics drape, 3D, pattern pieces (v3 or a partner
tool); the AI model photoshoot (Photoshoots, v2); web collection, auto-replenish, proactive proposals (v2 cloud
mode); video; comments on a sheet (v2).

## 8. Reference images (copied from the BRD docx into `plans/refs/studio-designer/`)

| File | What it is | What it decides |
|---|---|---|
| input-blouse-photo.png | the owner's real multicolour beaded blouse on a mannequin | the Main context tile |
| input-chatgpt-grid-prompt.png | the owner's ChatGPT session: main + refs → "grid of 4 by 3 different designs on a clear white moodboard" | the v1 archetype; the Cuts 4×3 template; the chat-with-set-strip pattern (P2) |
| output-12-grid-blouse-cuts.png | the 4×3 result | the set on the canvas with pickable cells (W2) |
| template-6-flatlay-corsets.png | six corsets laid flat on floor tiles | the Flat lay 6 template |
| template-numbered-design-sheet.png | DESIGN-1 … 20 sheet | the Design sheet 20 template |
| output-models-lineup.png | five models in generated garments | the On model preview (v1 single image) and Photoshoots later |
| editor-vstitcher-library-canvas-properties.png | garment CAD: fabrics left, pattern canvas centre, 3D and material properties right | the three-pane anatomy of W2/W3; not the feature set |
| editor-3d-ai-landing.png | design garments / produce faster, pattern pieces, palettes, draped swatches | the Drape options as swatches, the palette row in the Zone pane |
| editor-mannequin-callouts.png | mannequin with callouts to pieces and a growth chart | zone callouts on the canvas; the What works sparkline |
| selector-stylezone-uploads-comments.png | "My uploads / Spring jackets" grid with a comments pane | the Moodboard › Mine grid; comments wait for v2 |
| photoshoot-ai-model-library.png, photoshoot-ai-models-carousel.png | AI model library | Photoshoots plan, not this one |

## 9. Open questions for the owner

1. Is Stitch the whole of Studio's header (Stitch · Moodboard · Memory · Photoshoots · Upload centre), or should the
   designer be its own rail module? Drawn: one Studio module, Stitch first.
2. Zone regeneration will show a density seam on heavy embroidery. Keep the one zone edit in v1 with a 4-variation
   strip, or keep v1 to whole-garment re-prompts? Drawn: one zone edit.
3. Colourways: the catalogue's colour names or a free palette? Drawn: catalogue names, free entry allowed.
4. Sales data sent as raw numbers, or only the demand-score band? Drawn: fields chosen in Settings, band by default.
5. Who may open Stitch and save samples besides admin and sub-admin: production manager, merchandiser, a new design
   team role? Drawn: production manager and merchandiser as view + save.
6. Save as sample always creates an S-number, or is there an in-between "Stitch draft" shelf? Drawn: S-number
   directly, with Archive on the track.
7. Materials need a work/finish tag (sequin · zardozi · mirror · plain) for the drop to mean anything; is the
   material master tagged that way? Drawn as if yes.
8. On-model preview in v1 (one flat studio image) or wait for Photoshoots? Drawn: one image marked preview only.
9. WhatsApp share-in to the moodboard needs a firm number attached to Sutra; acceptable in v1? Drawn: yes, set in
   Memory › Settings.
10. Which templates use which image model, and does usage cost show to sub-admins or admin only? Drawn: admin only.

## 10. Screen count (superseded by section 12: 15 web, 12 phone)

Web 13 (W1–W13), phone 9 (P1–P9), each in light and dark = 44 frames. Sub-menus drawn: Stitch (Tracks · Designer),
Moodboard (Mine · Stitch's), Memory (Sessions · What works · Settings); plus the context selector, the hand-off
sheet and the tuner pane.

## 11. Build brief for the executing session (after the owner says "go")

1. Read `.claude/skills/sutra-mockups/SKILL.md`, `design/SUTRA-DESIGN-SCHEMA.md`, this plan, and
   `design/brd-studio-ai-designer.md`; view the reference images in §8.
2. Create `explorations/catalogue-v2/mod-studio.jsx` (phone: chrome, shared bits, mock data, P1–P9) and
   `mod-studio-web.jsx` (W1–W13, the registration block); add the two script tags to `index.html` after
   `mod-crm-web.jsx`; do not edit the `NEW_DRAFTS` array.
3. Reuse per §5; prefix everything `St` / `ST_`; Lucide icon names only (`sparkles`, `wand-2`, `layers`, `shirt`,
   `palette`, `brain`, `history`, `sliders-horizontal`, `panel-right`, `image-plus`, `link`, `message-circle`).
4. Draw the Designer first (W2 → W3 → W4), then the selector (W5, W6), hand-off (W7), Moodboard (W8, W9), Memory
   (W10–W12), tuner (W13), then the phone set; both themes each time.
5. Serve over http with a free launch config (`static-c` 8768 or `static-d` 8769), open `index.html?only=<id>&z=0.8`
   for each frame, read every string once, check nothing clips, no console errors; quote the final ids from
   `ND_PHONE.map(e => e[0])`.
6. Update `audit.md` and `README.md`, run `bash tools/package-explorations.sh`, and list pending decisions (§9).


## 12. Owner's "go" decisions (sent 8 Sep 2026 17:45 and 17:48; recovered from the transcript on 9 Sep. The chat never answered them because of a network error)

Verbatim: "go, one studio module, keep the zone edit. or the silences - the tracks should be per category memory, rl
feedback should be captured by thumbs and pick of grid options on webview and pick or grid and tinder type swipe
approval screen on phone view. Keep tuners tabs fixed, stored and brought up at the designer's own choice per thread
accordingly. The user should be able to recognize his editing tools from memory, having them change every time causes
inefficiency in use. Generations are stored in history sub menu, and shareable externally via whatsapp etc, or
shareable internally by making it as a 'Design Content' picture for a new product master or material master."

"For phone view, i want all options of the webview. We'll be using openrouter api for intelligence, can use multiple
for image and video gen capabilities etc. So give a model picker and settings panel to the designer as a sub menu. And
hence, on the phone, decide accordingly how and what features would work (i guess all of them), so the only conflict
should be the right side designer pane. Give that as a button and a slide-up menu with picture in screen still
visible for editing."

And on 9 Sep: "make the whole chat ui and studio ui ux, modular in design when you go for the mockups."

What changes against sections 0 to 11:

1. **Go.** Q1 = one Studio module, Stitch first. Q2 = keep the single zone edit. Q5 stays as drawn (admin and
   sub-admin edit; production manager and merchandiser view + save) until the owner says otherwise.
2. **Tracks are per-category memory.** A track is the category's memory (Lehenga, Saree, Blouse, Choli set,
   Dupatta, Material), not a per-job thread. Threads live inside a track. W1 becomes: category tracks across the
   top (each with its template set, thread count, last worked, what Stitch has learned for that category), threads
   of the picked track below. The chat column head reads "Blouse track / thread: Multicolour floral, cuts".
3. **RL feedback is explicit.** Web: thumbs up and down on every generated set and on every tile; the pick of a
   grid cell counts as a positive signal. Phone: the pick from the grid plus a new **swipe approval screen** (one
   tile at a time: swipe right keep, left discard, up save; the count under the card). Memory > What works and the
   taste rules are fed from these signals; the drawings show the thumbs and the swipe screen.
4. **Tuner tabs are fixed.** Templates, Workflow, Models, Usage, Memory, always in that order, never adaptive;
   the pane's state (open tab, expanded template, chosen model) is stored per thread and restored when the thread
   reopens, at the designer's own choice ("bring up my tuner as I left it"). The same rule applies to the zone pane
   and the version pane: the tools sit in the same place every time.
5. **History is a sub-menu.** Every generation (set, version, zone variation) is kept in History, grouped by track,
   thread and day, with the prompt, the template and grid, and the context used. From a History item: Share
   externally (WhatsApp packet via the CRM composer, export) or **Use as Design Content** internally, which attaches
   the picture to a **new product master** or a **new material master** as its design-content image (a hand-off
   into Hub > Masters, prefilled like Save as sample). Memory > Sessions becomes a reading of History (what was
   sent, what came of it) rather than a second list.
6. **Settings is a sub-menu.** A model picker and settings panel: per-template model choice for text, image and
   video, provider key state, defaults (cells, metadata switch default, retention), usage counts and cost (admin
   only). Memory > Settings (context sources, sales data, memory, sharing) moves here. The tuner pane keeps its
   Models tab as the in-thread shortcut to the same choices.
7. **Header nodes become** Stitch, Moodboard, History, Memory, Settings | Photoshoots, Upload centre. Sub-subs:
   Stitch (Tracks, Designer), Moodboard (Mine, Stitch's), History (By thread, By day), Memory (What works, Taste
   rules), Settings (Models, Defaults, Usage, Context).
8. **Phone has every web option.** Only the right-side designer pane differs: a **Pane** button on the canvas opens
   a slide-up sheet that stops at about half height so the picture stays visible and editable above it; the sheet
   carries the same three states (Set options, Zone, Version) and the tuner opens the same way. Every other
   screen (tracks, selector, moodboard, history, memory, settings) is drawn full on phone.
9. **Modular UI.** The chat UI and the whole Studio UX are drawn as independent modules that snap together: the
   chat column, the canvas, the properties pane, the version strip, the context tray, the tuner and the swipe
   card are each one self-contained block with its own header, body and foot, the same block on web and phone
   (the phone stacks or sheets what the web docks). Blocks collapse to a spine or a button, can be reordered in
   the terminal (chat left or right, pane docked or floating) and reappear unchanged in Moodboard, History and
   Memory wherever a chat or a canvas is needed. One component per block in mod-studio.jsx, no screen-specific
   copies.

Screen list changes: W1 redrawn as category tracks; **W14 History** (grid by thread with the share and design-content
actions in the pane); **W15 Settings > Models** (picker per template, keys, usage); Memory drops the Settings tab.
Phone: P1 redrawn; **P10 Swipe approval**; **P11 History**; **P12 Settings > Models**; P3 and P4 redrawn with the
Pane button and the half-height sheet. New count: 15 web, 12 phone.

Not a mockup decision, logged in design/during-ui-technical-design.md: the owner named OpenRouter as the
intelligence route with several providers for image and video. The drawings show a model picker with the model
names the BRD uses and a provider line; no vendor is a design element.
