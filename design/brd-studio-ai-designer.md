Studio › AI Designer ("Stitch") — Business Requirements
Sutra v3 BRD companion · written 8 Sep 2026 from brd-final.txt lines 275–287, the owner's brief of 8 Sep and the
reference images in the BRD docx · Users: owner/admin, sub-admin, production manager and merchandiser (samples
hand-off), office manager (view). Sale executive and dispatch manager have no Studio (F:32, F:34).

This companion sits beside brd-masters.txt and brd-dispatch.txt. It says what the designer can do and where it
stops; it does not decide models, hosting, data model or framework. Image models are named only the way the main
BRD names them (F:279: "api model calls like nano banana or gpt image 2 in specific pre-defined workflows in the
beginning … agent in cloud mode later"). Mockup plan: explorations/catalogue-v2/plans/studio-designer.md.

1.  Studio
Studio is the firm's picture workshop: the image upload and management centre (F:277), the AI photoshoots centre
(F:278) and the AI designer "Stitch" (F:279). This companion covers Stitch. Desktop-first (the designer is a desk
terminal beside the sampling desk) with the phone as a companion for WhatsApp uploads, quick reviews and
approvals. Header nodes — STITCH, MOODBOARD, MEMORY | PHOTOSHOOTS, UPLOAD CENTRE. A Tune control in the header
opens the agent tuner as a translucent right-side pane on every Studio screen (F:279).

1.1  What Stitch is
A design agent that works only from the firm's own products, materials, samples, work-in-progress and moodboard
(F:3 "design-with-ai-using-business's-own-products-and-materials hub with a dedicated designer agent"), talks in a
chat beside an editable design canvas ("like lovable or claude design", F:279), keeps its own tracks, history and
memory, and produces outputs in fixed formats from one-click template buttons (F:279 "outputs in specific formats
… when clicked on these format quick-buttons - like hand drawing of a design, or a grid of design inspire
options"). Every render is marked "AI render · not a fit sample". Stitch never creates a product master; a design
leaves Stitch as a sample draft (1.6).

1.2  Sub Menus
1.2.1  Stitch
Tracks (landing) — every design session is a named track (auto-named from the main context, editable). Category
cards across the top start a track from a category with its template set (F:280 "design inspiration and
templates according to product categories": Lehenga · Saree · Blouse · Choli set · Dupatta · Material). Track rows
show the last render, category, context count, versions, last worked and state (Open · Saved as sample S-no ·
Shared · Archived). A prompt field starts a track straight away. Right pane: the picked track's summary — context,
prompts, versions, what was sent (metadata on/off), Open · Branch · Archive.
Designer (the terminal) — three panes.
Left Pane — Chat column the track head; the context tray (selected items as thumbs, one marked Main, the rest
refs; "+ Context" opens the selector; the metadata switch "Send sales data"); the conversation (user prompts,
Stitch replies with the set they produced as a strip); the prompt box with two carets — Template ▾ (the output
format) and Grid ▾ (the cell layout) — a row of one-click template chips that preset both, and Send. The column
collapses to a spine to widen the canvas.
Main Window — Canvas a stage holding the generated set or the picked design; every cell of a set is a pickable
tile; a picked design gets a zone overlay drawn by Stitch (blouse: neckline · bodice · sleeves · hem; lehenga: kali
panels · border · waistband · dupatta; saree: pallu · border · body · blouse); a tool palette (select · zoom ·
compare · full screen); the version strip under the stage (v1 … vn, branch marks where a zone edit forked, "+");
the corner label "AI render · not a fit sample".
Right Pane — one of three states. Set options: what was generated (template, grid, context, metadata state),
one-click follow-ups on the whole set (Re-run · Re-run with metadata off · More like cell n · Colourways from
picked · Sketch of picked), Save picked as sample · Save to moodboard · Share. Zone pane (a zone is selected):
Material (a catalogue material dropped from the context tray, with photo and code), Colour (catalogue colour
names), Work (Zardozi · Sequins · Mirror · Cutdana · Thread · Plain), Scale and Density, Repeat, Drape for the
whole garment (Flat · Draped on mannequin · Pleated · Pallu fall · Kali flare · Dupatta over shoulder), Regenerate
zone, 4 variations (arrive as a strip under the stage; Keep one). Version pane (a version is selected): the prompt
that made it, the context used, the template, what was sent, Keep · Discard · Make this the main · Sketch ·
Close-up · On model (preview only).
Phone chat with canvas cards (the set or picked design, zone chips, version dots, Open); a full-screen canvas with
zone chips, a version rail and an action tray (Regenerate zone · 4 variations · Drape ▾ · Save · Share); the zone
pane and the selector as sheets.

1.2.2  Moodboard (F:282 "a common ground for designer agent and chachu (user) … used at any place within the agent")
Mine — the user's uploads, pasted Pinterest / Instagram links (thumbnail + link mark) and WhatsApp share-ins
(F:282 "uploaded via whatsapp share"), plus Stitch's enrichments, each carrying a "by Stitch" mark and a source
line. A one-click switch "Only my uploads & links" hides everything Stitch added. Quick chips New · Unused ·
Uploads · Links · WhatsApp · By Stitch · Category ▾ · Colour ▾; sort Newest · Most used · Category. Select mode: Use
as context · Pin · Remove. Upload and Paste a link. Right pane: the picked item — source, when added, used in which
tracks, Use as context · Pin · Remove.
Stitch's — what the agent collected, generated and kept, grouped by track / task and, inside a group, by kind
(Collected · Generated · Kept). Replenish asks Stitch to add 12 items (v1: from the firm's catalogue and Mine;
F:283 "replenishing and auto-scraping from moodboard" — web collection and auto-replenish come with cloud mode,
1.7). Quick chips This week · Collected · Generated · Kept · Track ▾. Right pane adds "Why this?" (Stitch's one-line
reason).
Any moodboard item is pickable wherever the context selector opens (the Moodboard tab).

1.2.3  Memory (F:279 "an agent with its own tracks/history/memory, design formats, RL'ed on taste, and skills")
Sessions — a timeline by day: track, prompts, sets made, what was sent (context thumbs, metadata on/off, which
fields), what came of it (saved as S-no · shared · nothing kept). Right pane: the exact context list and metadata
lines that were sent, the prompts, Reopen track · Forget this session.
What works — Stitch designs that became samples, joined to what the ERP already records: activated, read (n/15,
complete), demand score with sparkline, pcs ordered, returns, and a verdict pill (Working · Weak · Too early). Rows,
not conclusions: Stitch adds a one-line reading only when at least five rows have finished their read; otherwise
"Not enough data yet". Under the table, the taste rules — short editable rules with provenance (typed by the user
· proposed by Stitch from a track), each on/off. Right pane: the row's render beside the sample or product photo,
numbers by colour, Make more like this (starts a track with it as Main). Correlation to full product sales
arrives when the "Imported from S-no" chip is carried through the sample's finalise step (production plan W25).
Settings — Context sources (Catalogue metadata · Moodboard Mine · Moodboard Stitch's · Previous tracks · Taste
rules, each on/off; Web collection greyed "coming later"); Sales data (the metadata switch default: on · off · ask
each time; which fields: demand score · pcs 30 d · pcs lifetime · returns · read state · sold ₹ for money roles);
Memory (remember tracks always · ask · never; keep sessions 30 d · 90 d · a year; Forget everything Stitch learned,
behind a confirm); Sharing (the WhatsApp share-in number, who can see my tracks). Right pane: "What Stitch sends" —
the context block as Stitch will see it under the current settings.

1.3  The context selector (F:279 "choose an existing product/wip/material image or multiple as context from a pop
up grid with filters and sorts options")
A centred glass dialog over the terminal (a sheet on the phone), opened from "+ Context", the prompt box's attach,
or a category card. Head: search (design no, material, colour, tag), the metadata switch, Close. Hard tabs
Products · Materials · Samples · WIP · Moodboard. Tiles are photo-first with a veiled foot line; when the
metadata switch is on the tile also shows the demand score and 30 d pcs ("Never scored" when the engine has not
scored it, "as of last night" in the foot). Selection: tap to tick; the tray at the foot holds the picks (up to 8),
one tapped as Main, the rest refs; "Add n to context".
Products — quick chips High demand · High growth · Category ▾ · Colour ▾ · Work ▾ · Recent; sorts Demand score ·
Newest · Best selling 30 d · Rank; the shared sort & filter sheet with the catalogue's groups.
Materials — swatch photo, name and code, shade, group, stock word (In · Low · Out), last inward; quick chips In
stock · Group ▾ · Shade ▾ · Work/finish ▾ · Used in active jobs · Dye WIP; sorts Last inward · Stock · Name · Used in.
Samples — temp number, photo or "No photo yet", state chips In designing · Deployed · Activated · Reading n/15; quick
chips In designing · Deployed · High growth · Reading · Price TBD; sorts Newest activation · Read completion · Demand
score.
WIP — process WIPs with their lineage (dye WIP, embroidery WIP), the design and process they belong to; quick chips
Process ▾ · In stock · Dye WIP; sorts Newest · Stock.
Moodboard — Mine and Stitch's items with source marks; quick chips Mine · Stitch's · Pinned · Unused.
Metadata (F:279 "actual sale and consumption data sent as metadata … give an option to turn off metadata"): with
the switch on, the house-computed fields chosen in Memory › Settings ride along as text context (demand score and
band, pcs by colour for 30 d and lifetime, returns, read state, recipe consumption where a recipe exists; sold ₹ only
for money roles). Off = pictures and descriptive tags only. What was sent is always visible afterwards in Memory ›
Sessions.

1.4  Templates and one-click generation (F:279, F:280–281, F:285–286)
Two kinds of template: the output template (the format) and the grid template (the cells). The prompt box carries
both as carets; the one-click chips preset both. Seeded templates render plain; personal ones carry a star and can
be deleted; applying one restores its whole state (the same rule as report templates, brd-masters 197–198).
Button · input · output · reference in the BRD docx
Cuts 4×3 · main + refs, category · one 4×3 white-background grid of twelve distinct necklines, sleeves and hemlines
in the same work and colour story, every cell pickable · the owner's own result (output-12-grid-blouse-cuts).
Design sheet 20 · main · a 5×4 sheet labelled DESIGN-1 … 20, front view · template-numbered-design-sheet.
Flat lay 6 · main + up to two materials · a 3×2 flat lay on a plain floor so borders, hem scallops and tassels
read · template-6-flatlay-corsets.
Colourways · a picked design + optional colour names · a 2×3 grid in six colours, labelled with catalogue colour
names where they match.
Sketch · a picked design · one hand-drawn fashion sketch, pencil and wash, for the karigar and the sample's sketch
slot (F:279 "hand drawing of a design").
Close-up of work · a picked design + a zone · a macro of the zardozi, sequin or mirror region for bead scale.
On model · a picked design · one front-facing studio image marked "preview only"; real shoots belong to the
Photoshoots centre (F:278).
Material into inspiration · one material + category or "all categories" · a 2×2 sheet showing that material as a
lehenga, blouse, saree border and dupatta (F:281 "create a material design into any or all category of
inspirations").
Every output is editable and re-promptable (F:285): pick a cell, re-prompt, keep the result as a version.
Templates are edited, and new template references uploaded, in the tuner (F:286).

1.5  The tuner pane (F:279)
A translucent glass pane from the right, over any Studio screen, with the orb and "Tune Stitch" in its head and
tabs of its own: Templates (one row per template: the prompt behind it, editable; default grid; the reference
images it follows; upload a template reference; seeded vs personal), Workflow (the steps of a run — understand
context → draft set → pick → refine zone → render — with loops such as "re-run until n distinct cuts" and a maximum
number of tries, drape defaults, cell count), Models (which image model each template uses, named as in F:279; keys
set or not; a test call), Usage (runs per template this month, images made, failures; cost for admin only), Memory
(the "what Stitch sends" preview). Admin and sub-admin only.

1.6  Hand-off (F:88, F:257, brd Business Req 43–44, production plan §2.6)
Save as sample — creates a temporary design number in Production › Samples › In designing, pre-filling the
sample's head: the render in the sketch slot of the photo strip, category, colours (editable, catalogue names),
target price (money roles), notes ("from track … v7"), reference links (the main product, refs, moodboard items,
pasted links). From there the normal sample lifecycle applies: moves, costing, finalise into a product master.
Stitch adds nothing to the process and never creates a product.
Save to moodboard — into Mine or Stitch's, with provenance.
Share — through the CRM share packet (logo, video, message templates; F:94, Business Req 117); no second share flow.
Send to Photoshoots — greyed "coming later" in v1.

1.7  Capability and scope — version 1
Why this v1. Four kinds of designer agent were compared: (A) a context + template image generator; (B) A plus a
region editor; (C) a pattern / 3D garment builder like the CAD reference in the docx; (D) an autonomous agent that
collects from the web, runs multi-step workflows and proposes designs from sales. A is exactly how the owner already
works (the ChatGPT session in the docx: one main photo, other blouses as creative references, "a grid of 4 by 3
different designs on a clear white moodboard") and is the easiest to build well; B adds one interaction and a
quality risk at the edge of a regenerated zone on heavy embroidery; C is a different product (zardozi is a stiff
relief, not a texture, and no other Sutra screen shares its interface); D needs a season of ERP data before its
memory and sales correlation mean anything. V1 is A built fully, one B move, one D behaviour.
V1 can
1  Select context from Products · Materials · Samples · WIP · Moodboard in the selector with filters and sorts,
   up to eight items, one marked Main, the rest refs.
2  Switch sales metadata on or off per track (default from Settings); see afterwards exactly what was sent.
3  Type a prompt, press a one-click template, or both; choose the output template and the grid template
   separately.
4  Get a set on the canvas with every cell pickable; pick a cell and re-prompt it; every result is a version in
   the strip; branch a track.
5  One zone edit: select a zone, drop a material, colour or work from the context tray, regenerate that zone, get
   four variations; choose a drape for the whole garment as a re-render.
6  Colourways in catalogue colour names; Sketch; Close-up of work; one On-model preview; Material into inspiration.
7  Save a picked design as a sample draft (1.6); save to a moodboard; share as a WhatsApp packet.
8  Tracks: named, reopened, branched, archived; every session recorded with its context and outputs.
9  Memory: taste rules with provenance and on/off; What works as rows from the ERP's own sample lineage; context
   and memory settings; Forget a session or everything.
10 Moodboard Mine with WhatsApp share-in, links, uploads, Stitch's marked enrichments and the "Only my uploads &
   links" switch; Stitch's moodboard grouped by track with Replenish from the firm's own pictures.
11 The tuner: template prompts and references, workflow loops, model per template, usage.
Not in v1 (and where it goes)
—  Editing more than one zone at once, or chaining zone edits across versions — v1.5.
—  Physics drape, 3D avatar, pattern pieces, seams, real fabric mapping — v3, or a partner CAD tool.
—  AI model photoshoot with the firm's model library, video — the Photoshoots centre, v2; v1 hands a saved design
   to it later.
—  Web collection into Stitch's moodboard, auto-replenish, proactive "make this next" proposals — v2 cloud mode
   (F:279 "agent in cloud mode later … other tools and connector calls like higgsfield").
—  Comments and multi-user review on a design sheet — v2, when a design-team role exists.
—  Any write into a product's media slots — never from Stitch; the upload centre owns product media (F:66–71).

1.8  Roles and money
Edit: admin/owner, sub-admin (F:28–29). View, plus Save as sample: production manager and merchandiser (assumed;
the BRD is silent, F:36–37). View only: office manager (F:30). None: sale executive (F:32), dispatch manager (F:34),
packer, guard, customer. Studio screens a user cannot open show "Locked · ask for 24 h · 1 w · 1 m · 3 m" (F:26).
Money is omitted, not hidden (brd-masters 121): sold ₹ in metadata lines, cost so far and target price appear only
for admin, sub-admin, production manager and merchandiser; tiles in the selector never carry ₹; usage cost in the
tuner is admin only.

1.9  Open questions
1  One Studio module with Stitch first, or the designer as its own rail module?
2  Keep the one zone edit in v1 (density seam risk on heavy embroidery) or whole-garment re-prompts only?
3  Colourways in catalogue colour names, a free palette, or both?
4  Sales metadata as raw numbers or the demand-score band only?
5  Who edits in Stitch besides admin and sub-admin — production manager, merchandiser, a new design-team role?
6  Save as sample always creates an S-number, or is there a "Stitch draft" shelf before Samples?
7  Do materials carry a work/finish tag today (sequin · zardozi · mirror · plain) so a drop means something?
8  On-model preview in v1, or wait for Photoshoots?
9  WhatsApp share-in to the moodboard needs a firm number attached to Sutra — acceptable in v1?
10 Which templates use which image model, and who sees usage cost?
