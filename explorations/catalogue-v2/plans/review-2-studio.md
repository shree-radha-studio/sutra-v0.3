# Review 2 · Studio (13 Oct 2026)

The Studio module's drafts (Stitch, the AI designer) judged as drafts, in the review-1 format and one level under
`review-2-template-and-sell-flow.md` (the template, the "one language, two densities" thesis and decisions 1 to 14 stand;
nothing here reopens them). Nothing on the board changes until the owner answers the decisions in §5.

Sources: the board at `887296c` (Studio, 56 frames: 13 phone and 15 web, each light and dark; ids as on
`board.html?m=studio`), `design/brd-studio-ai-designer.md` (BRD, cited as S:§), `plans/studio-designer.md` (the plan; §12
carries the owner's go decisions of 8 Sep, cited as O), the reference images in `plans/refs/studio-designer/` (R), the
schema (SCH), review 2 (R2). Renders: `.board-check/sheet-studio.png` (every frame) and one sheet per sub-menu
`.board-check/sheet-studio-{tracks,designer,context,hand,moodboard,history,memory,settings}.png`. Judged from the pictures
first, the code second.

**Who sits in the chair.** The designer and the owner, at a desk, iterating on pictures for an hour at a time; the phone
for a review in the car (approve a set, forward a render, drop a WhatsApp picture into the moodboard). Admin and sub-admin
edit; production manager and merchandiser view and save; office manager views (S:1.8).

**How to read the stars.** As in review 1: ★★★★★ core · ★★★★ strong · ★★★ useful, keep it out of the way · ★★ marginal,
later · ★ cut. Keep = as drawn. Simplify = same job, fewer things on screen (the change is named). Cut = off the board. Draw =
the BRD asks for it and no frame shows it.

---

## 1 · Verdict

1. The drafts cover the BRD and the owner's 8 Sep go almost completely: every track, control and output S:1.2–1.6 names is
   on a frame, and the honest v1 scope (S:1.7) is respected; nothing is drawn that the BRD does not ask for, except three
   small things named below (a feedback chart, an "Or" row on the sample sheet, a chat-side switch).
2. The designer terminal (nw-2 … nw-5) is the best screen in Studio and the one that most breaks the language: a third
   look (deep-space black, a pink-blue-orange thread, coloured glows) inside one product that has just agreed on two
   densities. The owner asked for it on 8 Sep; it now needs a line in the schema or a retreat. Decision 30.
3. The controls win the terminal today. Three panes plus the tuner leave the picture 520 px of 1280; the chat column and
   the right pane should give way to the stage once a set lands. Decision 33.
4. The header carries seven sub-menu buttons and the search field collapses to "Se…" on every Studio frame, the same
   overflow review 2 §1.4 capped at six. Decision 31.
5. Duplicates to fold, no owner needed: thumbs drawn three times on one screen, the sales-data switch in two places,
   template chips and the Template ▾ caret doing one job, "Save as sample" reachable from four surfaces with two forms,
   History › By thread repeating Tracks. Status colour (Open · Saved · Shared · Working in four hues) waits on D5.

---

## 2 · Feature tables

### 2.0 Crowding, counted on the web frames

Rows = control rows between the header and the first row of content (the view-tabs row counts; a content head does not).
R2 §1.7 budgets two. Panes = main area, chat column, right pane, floating pane.

| Frame | Rows | Panes | What to remove or fold |
|---|---|---|---|
| nw-1 Tracks | 1, then 1 more between the cards and the threads | 2 | Drop the Tracks · Designer tab row (§2.1). |
| nw-2 Designer · set | 1, plus 4 stacked in the chat column and 1 on the stage | 3 | Chat to the spine once a set lands; pane on pick only; one thumbs; one template control (D33). |
| nw-3 Designer · zone | as nw-2, plus the variations strip | 3 | Same; the zone pane's seven rows are the ceiling. |
| nw-5 Designer · tuner | as nw-2 | 4 | The tuner replaces the pane while open. |
| nw-6 Selector | 3 inside the dialog (head, tabs, chips) | dialog over 3 | Cut the head's sales-data switch; the rest is the BRD's. |
| nw-8 Sample sheet | 0 | sheet over 3 | Cut the "Or" row. |
| nw-9 Moodboard · Mine | 2 | 2 | Cut "By Stitch" (the switch does it). |
| nw-10 Moodboard · Stitch's | 3 (tabs, bar, group head with its own three chips) | 2 | Cut the bar's Collected · Generated · Kept. |
| nw-11 History | 2 | 2 | By day only; cut the tiles strip at the foot. |
| nw-12 Memory · What works | 3 (tabs, chips, column heads; the KPI row is content) | 2 | Once D5 lands, the table takes the Desk density: filters on the column heads, the chip row goes. |
| nw-13 Memory · Taste rules | 2 | 2 | Cut the chart; counts as one line. |
| nw-14 Settings · Models | 1 | 2 | Cut the per-model bars and the Usage KPIs. |
| nw-15 Settings · Defaults | 1 | 2 | Nothing. |

Phone: every Studio list screen (n-1, n-8 … n-13) carries three or four rows of chrome (top bar, search, node scroller,
and on most a tabs row) before the first picture, the same stack review 2 §1.1 measured on the catalogue; D1 fixes it in `T.Header` for every
module and Studio inherits it. The terminal screens (n-2 … n-6) have two rows and the picture wins; nothing to fold.

### 2.1 Stitch › Tracks

**Frames:** n-1 (nd-1) · nw-1 (nwd-1). **Flow:** category cards → the category's threads → start a thread from the
prompt bar. Per-category memory as the owner asked (O:2).

| Feature | Frames | ★ | Call | Why |
|---|---|---|---|---|
| Six category cards with the last render, thread count, last worked and the one line Stitch has learned | nw-1, n-1 | ★★★★★ | Keep | The landing is the category's memory (O:2). The "learned" line is the only place the taste rules show up without opening Memory; keep it one line. |
| Thread rows (render, name, context count, versions, last worked, state) | nw-1, n-1 | ★★★★★ | Simplify | State pills use four hues (Open accent, Saved ok, Shared blue, Archived muted). Outlined words once D5 lands; the render thumb is already the identifier. |
| Quick chips Open · Saved as sample · Shared · This week, sort, "+ New thread" | nw-1 | ★★★ | Keep | One control row under the heads; inside the R2 §1.7 budget. |
| Prompt bar at the foot that starts a thread (Cuts grid ▾ · 4 × 3 ▾) | nw-1, n-1 | ★★★★ | Keep | One field, two carets, send. On the phone it floats above the island like the cart strip; right. |
| Right pane: the picked thread (context tray, prompts, version strip, "sent" line, Branch · Archive · Open) | nw-1 | ★★★★ | Keep | S:1.2.1 exactly. |
| Tracks · Designer as a sub-sub tab row | nw-1, nw-2 | ★★ | Simplify | Two tabs cost a 30 px row on every Stitch frame. Make Designer the opened thread (a tab in the tab strip, which already shows "Stitch · Multicolour floral") and drop the ViewTabs row; Tracks is the Stitch landing. |

### 2.2 Stitch › Designer (the terminal)

**Frames:** n-2 … n-6 (nd-2 … nd-6) · nw-2 … nw-5 (nwd-2 … nwd-5). **Flow:** set on the stage → pick a cell → zone
selected, material dropped → re-prompt and compare versions → the tuner as I left it; swipe approval on the phone.

Panes and rows on nw-2 (set on the stage): rail · tab strip · header · view tabs row · chat column (head, context tray,
messages, template chip row, prompt box with two carets) · stage (head row with thumbs and Share, canvas with a four-tool
palette, version strip) · right pane (head with thumbs, Made with, Sent, five follow-up chips, picked cell with thumbs,
three buttons). Four panes when the tuner is open (nw-5). The canvas is 520 × 354 of a 1280 × 800 screen: the controls
win. Target after Decision 33: the stage 780 wide with the chat as a spine and the pane opening on a pick.

| Feature | Frames | ★ | Call | Why |
|---|---|---|---|---|
| Chat column: thread head, context tray (Main ring, refs, "+"), conversation, prompt box | nw-2, n-2 | ★★★★★ | Keep | The owner's own ChatGPT session (R:input-chatgpt-grid-prompt) made into a block. Stitch's replies carry the set as a strip; the prompt box is one field. |
| Context tray "Sales data" switch | nw-2, n-2 | ★★★★ | Keep | Per-track, visible, one tap (S:1.3). This is the one place for it; see the selector row below. |
| Template chips row (eight) above the prompt box | nw-2, n-2 | ★★★★ | Simplify | The chips and the Template ▾ caret preset the same thing. Keep the chips (one tap, S:1.4), keep the Grid ▾ caret, drop the Template ▾ caret; the chosen chip reads as the template. |
| Stage: dotted deep-space canvas, the set with numbered pickable cells, the picked cell ringed | nw-2 | ★★★★★ | Keep | R:output-12-grid on a stage. The white set on the dark stage reads better than on sand. Look of the stage itself: Decision 30. |
| "AI render · not a fit sample" corner mark on every stage, tile and card | all | ★★★★★ | Keep | S:1.1. Never drop it. |
| Tool palette (select · zoom · compare · full screen) | nw-2 … nw-4, n-3 | ★★★ | Keep | Four tools, same place every time (O:4). |
| Version strip with branch mark and "+" | nw-2 … nw-5, n-3 | ★★★★★ | Keep | |
| Thumbs up / down | nw-2 (stage head, pane head, picked cell), n-3 | ★★★★ | Simplify | Owner's RL signal (O:3), but drawn three times on nw-2. Once per set (stage head) and once per tile on hover; the pane repeats nothing. |
| Right pane · Set options (Made with, Sent, Re-run · Re-run data off · More like cell n · Colourways from picked · Sketch of picked, To moodboard · Share · Save picked as sample) | nw-2 | ★★★★ | Simplify | S:1.2.1. Fold "Made with" and "Sent" into one meta line under the head; the five follow-ups stay. The pane opens when a cell is picked, not before (Decision 33). |
| Zone overlay drawn by Stitch on a picked design (Neckline · Bodice · Sleeve L · Sleeve R · Hem) | nw-3, n-3 | ★★★★ | Keep | The one zone edit the owner kept (O:1). Labels are pills on the picture, no outlines: SCH §3. |
| Zone pane: Material (dropped from the tray, Change), Colour, Work, Scale, Density, Repeat, Drape, 4 variations · Regenerate zone | nw-3, n-4 | ★★★★ | Keep | Every row is S:1.2.1; seven rows is the ceiling. The variations strip under the stage with "Keep 2" is right. |
| Compare v7 against v6 (50/50 slider) and the Version pane (prompt, context, template, sent, Views of v7, Discard · Make this the main · Keep v7) | nw-4 | ★★★★ | Keep | |
| "Chat left · Chat right" segment on the view tabs row | nw-2 … nw-4 | ★ | Cut | The owner's rule: the user recognises the editing tools from memory, moving them "causes inefficiency" (O:4). A movable chat column contradicts it; the plan's §12.9 reading of "modular" is the drafter's, not the owner's. |
| Tuner as a translucent pane (Templates · Workflow · Models · Usage · Memory), chat collapsed | nw-5, n-5 | ★★★★ | Simplify | S:1.5, tabs fixed (O:4). On nw-5 the tuner floats beside the Version pane: two panes. The tuner replaces the right pane while open (slides over it), so the stage never loses width twice. |
| Chat head with the cycling italic mood ("Stitch is drawing · looking at 8337 …") and the coloured glow under the stage while working | nw-2, n-2, n-6 | ★★ | Simplify | The glow is the listening aura of SCH §4 reused, defensible only while Stitch is working. The cycling mood line is a flourish; keep the orb breathing, drop the words. Decision 30. |
| Phone chat with canvas cards, context strip, template chips, prompt tray | n-2 | ★★★★ | Keep | The phone's chat is the review surface: read the set, open the canvas, answer. The island is absent on n-2 … n-6, as on the full-screen viewer; acceptable for a tool screen, with a back chevron on every one. |
| Phone canvas full screen with zone chips, version rail, Regenerate · Variants · Pane | n-3 | ★★★★ | Keep | |
| Phone zone pane as a half sheet with the picture still visible | n-4 | ★★★ | Keep | The owner's phone rule (O:8); drawn as asked. Ships after the web terminal (Decision 32). |
| Phone tuner as a half sheet | n-5 | ★★ | Later | Admin tunes at the desk. Keep the frame for reference; not in the phone's v1 (Decision 32). |
| Swipe approval (right keep, left discard, up save), count, dots | n-6 | ★★★★ | Simplify | The owner's phone signal (O:3). Keep the card, the three buttons and the count; drop the rotated "KEEP" stamp and the coloured blobs under the card (Decision 30). |

### 2.3 Context selector

**Frames:** n-7 (nd-7) · nw-6, nw-7 (nwd-6, nwd-7). **Flow:** Products → Materials with sort & filter → Samples · WIP ·
Moodboard → "Add n to context".

| Feature | Frames | ★ | Call | Why |
|---|---|---|---|---|
| Glass dialog over the terminal, 900 × 640, the terminal visible behind | nw-6 | ★★★★★ | Keep | S:1.3 "pop up grid with filters and sorts". |
| Hard tabs Products · Materials · Samples · WIP · Moodboard with counts | nw-6, n-7 | ★★★★★ | Keep | Samples added per the owner (O). The Samples, WIP and Moodboard grids exist in the code (`mod-studio.jsx` StSelGrid) but no frame shows them: register one frame each (gap 2). |
| Product tiles: photo, band tag, code · score · 30 d pcs when sales data is on | nw-6, n-7 | ★★★★ | Keep | S:1.3; ₹ never on a tile (S:1.8), as drawn. "Never scored" and "as of last night" (S:1.3) are not shown on any tile: add one tile of each. |
| Quick chips High demand · High growth · Category ▾ · Colour ▾ · Work · Recent; sort; Sort & filter | nw-6 | ★★★ | Keep | One row. |
| Materials tab: swatches, name, code, finish, stock word; the sort & filter popover with Sort · Group · Finish · Stock · Supplier | nw-7 | ★★★★ | Keep | The shared sheet (D-0040) as a popover, right. |
| "Send sales data" switch in the dialog head | nw-6, nw-7, n-7 | ★★ | Cut | The same switch sits in the context tray and is per-track (S:1.3). Two switches for one state. The dialog shows "sales data on" as a word; the tray owns the switch. |
| Selection tray: picked thumbs, "n of 8 · 8337 is the main", tap a thumb to make it Main, "Add n to context" | nw-6, n-7 | ★★★★★ | Keep | |
| Phone picker sheet, three columns | n-7 | ★★★★ | Keep | |

### 2.4 Hand-off

**Frames:** nw-8 (nwd-8). No phone frame. **Flow:** Save picked as sample → S-0413 in Production › Samples › In designing.

| Feature | Frames | ★ | Call | Why |
|---|---|---|---|---|
| Sample sheet: the render large with the photo-strip slots (sketch · reference · first piece), Category, Colours detected, Target price (money roles), From, Notes for the karigar, Reference links, Open in Samples · Create sample | nw-8 | ★★★★★ | Keep | S:1.6 and the production plan's sample head, field for field. "Stitch never creates a product · the sample flow does" on the foot is the right sentence. |
| "Or" row on the same sheet: Save to moodboard · Share as WhatsApp packet · Design content · new product master · Send to Photoshoots (greyed) | nw-8 | ★★ | Cut | Four unrelated exits inside the sample form. To moodboard and Share already sit on the pane foot (nw-2); Design content lives in History by the owner's word (O:5); Photoshoots is v2. The sheet does one thing. |
| Save as sample reached from the pane, the version pane, the History item, the swipe "up" | nw-2, nw-4, nw-11, n-11, n-6 | ★★★★ | Simplify | One sheet, four doors is fine; today the History sheet (n-11) shows a button with no form behind it. Every door opens nw-8; draw the phone sheet (gap 3). |

### 2.5 Moodboard

**Frames:** n-8, n-9 (nd-8, nd-9) · nw-9, nw-10 (nwd-9, nwd-10). **Flow:** Mine with the one-click switch → Stitch's by
thread with Replenish.

| Feature | Frames | ★ | Call | Why |
|---|---|---|---|---|
| Mine: grid of uploads, links, WhatsApp share-ins, Stitch's enrichments with the "by Stitch" mark and a source line | nw-9, n-8 | ★★★★★ | Keep | S:1.2.2; the source line is the provenance the owner asked for. |
| "Only my uploads & links" switch on the tabs row | nw-9, n-8 | ★★★★★ | Keep | The one-click segregation (O). Right place, right size. |
| Quick chips New · Uploads · Links · WhatsApp · By Stitch · Category ▾, sort, Upload, Paste a link | nw-9 | ★★★ | Simplify | Eight controls on one row. "By Stitch" duplicates the switch (off = by Stitch visible): cut the chip. |
| Picked item pane: large, source, Used in, Pin · Remove · Use as context | nw-9 | ★★★★ | Keep | |
| Stitch's: grouped by thread, Collected · Generated · Kept inside a group, Replenish "12 from the catalogue and Mine" | nw-10, n-9 | ★★★★ | Simplify | The Collected · Generated · Kept chips appear on the bar and again on every group head: keep the group-head set (it is a filter per group), cut the bar's three. Replenish's v1 wording is honest (S:1.2.2). |
| "Why this?" in the pane | nw-10 | ★★★ | Keep | One line in the display face; the thread mark beside it is the only Stitch styling that belongs on a sand screen. |
| Phone Mine and Stitch's, three columns, select-mode tray | n-8, n-9 | ★★★★ | Keep | The phone's real Studio job: a picture arrives on WhatsApp, it lands here. |

### 2.6 History

**Frames:** n-10, n-11 (nd-10, nd-11) · nw-11 (nwd-11). **Flow:** every generation by day → share externally or use as
design content. The owner made this a sub-menu (O:5); Memory › Sessions folded into it.

| Feature | Frames | ★ | Call | Why |
|---|---|---|---|---|
| Rows by day: time, render, what was made, thread, outcome (Kept · Picked 6 · Shared · Saved · S-0412 · Design content · 8111) | nw-11, n-10 | ★★★★★ | Keep | Every set, version and zone variation (O:5). Outcome pills in four hues wait on D5. |
| Tabs By thread · By day | nw-11, n-10 | ★★ | Simplify | By thread repeats the thread rows of Tracks and the version strip. Keep By day as the only view; the Track ▾ chip already filters by thread. |
| Item pane: render, prompt, Share (WhatsApp packet · Export · To moodboard), Use as design content (New product master · New material master), Reopen thread · Save as sample | nw-11, n-11 | ★★★★★ | Keep | O:5 verbatim. The sentence "Hub › Masters completes the rest" keeps Stitch out of the master. |
| "Sent" block in the item pane (the exact context list and metadata lines) | nw-11 | ★★★★ | Draw | S:1.2.3 Sessions: "what was sent is always visible afterwards". The pane says "sales data on" and nothing more. Add the context thumbs and the three metadata lines (as in the Tracks pane). |
| "Today · the tiles" strip at the foot | nw-11 | ★ | Cut | A second view of the rows above it. |

### 2.7 Memory

**Frames:** n-12 (nd-12) · nw-12, nw-13 (nwd-12, nwd-13). **Flow:** What works (rows, not conclusions) → taste rules with
provenance.

| Feature | Frames | ★ | Call | Why |
|---|---|---|---|---|
| What works: three KPIs, the "Not enough data yet · 3 of 5 rows" card, the table (render, thread · sample, activated, read n/15, demand sparkline, score, pcs, back, verdict) | nw-12, n-12 | ★★★★★ | Keep | S:1.2.3 exactly, and honest. The one truthful AI panel on the board. |
| Verdict pills Working · Weak · Too early | nw-12, n-12 | ★★★★ | Simplify | Working in ok green, Weak in danger. Under D5 Working becomes an outlined word; Weak keeps danger. |
| Row pane: render beside the first piece, Demand · Pcs · Returns, By colour, Make more like this | nw-12 | ★★★★★ | Keep | The photo beside the number, the hand back into a track. |
| Taste rules list with provenance, on/off, edit, remove; Add a rule | nw-13 | ★★★★★ | Keep | S:1.2.3. |
| "Stitch proposes" pane with the three tiles behind the proposal, Not this · Add the rule | nw-13 | ★★★★ | Keep | O:3 made visible. |
| "Feedback this month" card: thumbs up, thumbs down, swipes, a two-series line chart | nw-13 | ★★ | Simplify | Not in the BRD. Keep the three counts as one meta line under the rules ("61 up · 14 down · 132 swipes this month"); cut the chart. |
| Phone What works as cards | n-12 | ★★★ | Keep | Read-only on the phone; no table. |

### 2.8 Settings

**Frames:** n-13 (nd-13) · nw-14, nw-15 (nwd-14, nwd-15). **Flow:** models per template → defaults · memory · sharing.
The owner's sub-menu (O:6); Memory › Settings moved here.

| Feature | Frames | ★ | Call | Why |
|---|---|---|---|---|
| Models: one row per template with the model caret (names as the BRD names them), runs this month | nw-14, n-13 | ★★★★ | Keep | O:6. No vendor is a design element; "provider A / B" is right. |
| "Per model · Sep" bars beside the list | nw-14 | ★★ | Cut | Usage has its own tab; the Models screen shows the choice, not the bill. |
| Providers pane: key state, images this month, Test | nw-14 | ★★★★ | Keep | S:1.5 Models tab, here as the pane. Usage KPIs under it: cut (same reason). |
| Defaults: Sales data (switch default On · Off · Ask, the six fields, sold ₹ for money roles), Generation (cells, variations, mark every render), Memory (remember threads, keep history, Forget everything), Sharing (WhatsApp share-in number, who can edit) | nw-15 | ★★★★★ | Keep | S:1.2.3 Settings, every row. Four cards in two columns: within budget. |
| "What Stitch sends" pane: the metadata block as text | nw-15 | ★★★★★ | Keep | The single most reassuring line in Studio: the owner sees exactly what leaves the house. |
| Usage and Context tabs | nw-14 | ★★★ | Draw | Named on the tab row, not drawn (gap 4). Usage carries cost, admin only (S:1.8). |
| Phone Settings › Models | n-13 | ★★★ | Keep | |

---

## 3 · Final candidates

Per sub-menu: the frames that become the final (phone light / dark, web light / dark) and the edits each needs before
sign-off. Edits marked D-nn wait on that decision; the rest are drafter's work.

| Sub-menu | Phone | Web | Edits before sign-off |
|---|---|---|---|
| Tracks | n-1 / nd-1 | nw-1 / nwd-1 | Drop the Tracks · Designer tab row (Designer opens as a tab). State pills to outlined words (D5). Header to six buttons (D31). |
| Designer | n-2, n-3, n-4, n-6 / nd-2, nd-3, nd-4, nd-6 (n-5 kept for reference, not final) | nw-2, nw-3, nw-4, nw-5 / nwd-… | Cut "Chat left · right". Thumbs once per set, once per tile on hover. Drop the Template ▾ caret, keep the chips and Grid ▾. Fold Made with + Sent into one line. Pane opens on pick, chat to the spine when a set lands, tuner replaces the pane (D33). The look of the stage, the thread and the glows per D30. Swipe: no stamp, no blobs. |
| Context selector | n-7 / nd-7 | nw-6, nw-7 / nwd-6, nwd-7 | Cut the dialog's sales-data switch (word instead). Add one "Never scored" tile and the "as of last night" foot. Draw the Samples, WIP and Moodboard tabs (gap 2). |
| Hand-off | draw (gap 3) | nw-8 / nwd-8 | Cut the "Or" row. Every Save as sample door opens this sheet. |
| Moodboard | n-8, n-9 / nd-8, nd-9 | nw-9, nw-10 / nwd-9, nwd-10 | Cut the "By Stitch" chip on Mine. Cut the bar's Collected · Generated · Kept on Stitch's (group heads keep them). |
| History | n-10, n-11 / nd-10, nd-11 | nw-11 / nwd-11 | By day only. Cut "Today · the tiles". Add the Sent block to the item pane. Outcome pills per D5. |
| Memory | n-12 / nd-12 | nw-12, nw-13 / nwd-12, nwd-13 | Working as an outlined word (D5). Feedback: counts as one line, no chart. |
| Settings | n-13 / nd-13 | nw-14, nw-15 / nwd-14, nwd-15 | Cut the per-model bars and the Usage KPIs from Models. Draw Usage and Context (gap 4). |

One language, checked on every frame: sand and espresso outside the terminal, Cormorant heads, Jost UI, Lucide only, no
emoji, money only on the sample sheet for money roles and never on a tile. Departures, all inside Stitch's own styling:
the deep-space window (nw-2 … nw-5, n-2 … n-6), the three-colour thread (also on Tracks cards, Moodboard group heads,
Memory cards, the "Added by Stitch" line), the coloured glows (stage while working, swipe card), the italic mood line, and
the maroon count on nw-2 (picked cell, version ring, Main ring, send, thumbs fill, Save button: six marks against the one
line of SCH §8). Decision 30 settles the first four; the maroon count is a drafter's edit: the picked cell and the primary
button keep it, the rings go to ink.

---

## 4 · Gaps to draw (from the BRD), in draw order

1. Designer · a second template on the stage: Design sheet 20 (5 × 4) and Colourways (2 × 3), web only. Only Cuts 4×3 is
   ever on the stage; the grid template (S:1.4) is unproven on the board.
2. Context selector · Samples, WIP and Moodboard tabs (S:1.3), one web frame each (the grids are coded, only the
   registration is missing); the phone sheet shares them.
3. Hand-off · Save as sample on the phone, as a sheet reached from the swipe "up" and the History item (S:1.6, O:8).
4. Settings · Usage (runs, images, failures, cost for admin) and Context (the five sources, web collection greyed) (S:1.2.3,
   S:1.5).
5. Designer · the states between: a new thread before its first set (empty stage, the prompt box focused), Stitch drawing
   (the loop "re-run until n distinct cuts", S:1.5), and a failed run (Usage counts failures; the user must see one).
6. Studio · the locked state "Locked · ask for 24 h · 1 w · 1 m · 3 m" (S:1.8, F:26) and the view-only variant (office
   manager: no target price, no Regenerate; Save as sample for production manager and merchandiser).
7. History · the Sent block in the item pane (S:1.2.3), an edit on nw-11 rather than a new frame.
8. Designer · "Material into inspiration" as an output (S:1.4): the Material card on Tracks leads to it and nothing shows
   it.

---

## 5 · Decisions for the owner

Numbered from 30 (the deck uses 1 to 14, CRM 15 upward). Each one changes what gets drawn; the recommended option is
marked ◀.

30. **The Stitch window.** The terminal (chat column and stage) is drawn on deep-space black with a pink-blue-orange
    thread and coloured glows, per the 8 Sep brief "deep space black and white contrast". Options: (a) keep it as drawn,
    everywhere Stitch appears; (b) ◀ keep the dark stage and chat inside the terminal only, as Studio's one named exception
    in the schema (a "stage" beside cabin and desk); the thread becomes Stitch's single mark at 2 px and never a fill or a
    glow; glows only while Stitch is drawing; nothing of it on Tracks, Moodboard, Memory, History or the swipe screen;
    (c) retreat to sand and espresso like every other screen, the stage a sunken bg2 panel. Compare nw-2 against the
    Catalogue final w-1.
31. **The Studio header.** Seven sub-menu buttons (Stitch · Moodboard · History · Memory · Settings · Photoshoots · Upload
    centre) collapse the search field on every frame; D3 caps the row at six. Options: (a) ◀ Memory ▾ holds Memory and
    Settings (both are "how Stitch thinks"); (b) Photoshoots and Upload centre leave for a second rail module ("Pictures");
    (c) keep seven and accept the collapsed search.
32. **The phone's scope.** The 8 Sep brief asked for every web option on the phone; the 13 Oct user profile puts the
    designer at a desk and the phone in the car. Options: (a) everything as drawn, all thirteen phone frames final;
    (b) ◀ the phone is the review companion in v1: chat with canvas cards, the full canvas, swipe approval, History,
    Moodboard, Save as sample; the zone sheet (n-4) ships second and the tuner sheet (n-5) stays a reference frame; (c)
    phone = review and approve only, no chat.
33. **Picture or controls in the terminal.** Today three panes are always open and the picture is 520 px of 1280.
    Options: (a) as drawn; (b) ◀ the chat column collapses to its spine when a set lands (the stage grows to 780, nw-5
    already shows the spine), the right pane opens only when a cell or a zone is picked, and the tuner slides over the
    pane instead of beside it; (c) the chat column becomes a bottom bar under the stage (the ChatGPT reference), no left
    column.
34. **Names.** The BRD companion calls a session a "track"; the owner's 8 Sep go and the drawings call the category the
    track and the session a thread. Options: (a) ◀ keep the drawn names (track = category, thread = session) and correct
    S:1.2.1 and S:1.2.3 to match; (b) rename the drawings to the BRD (category · track). Every caption in Studio changes
    with the answer.
35. **The designer's island.** D2 gives each role its modules; Studio sits under More on every phone frame today.
    Options: (a) ◀ the design chair (admin, sub-admin, merchandiser) gets Home · Studio · Catalogue · More and the orb;
    (b) Studio stays under More for everyone.
36. **Save as sample and the number.** S:1.9 Q6 is still open: (a) ◀ Create sample mints S-0413 at once and the thread's
    Archive is the only shelf (as drawn, nw-8); (b) a "Stitch drafts" shelf before Samples, which would add a sub-menu
    and a state to every row.

---

## 6 · Notes for the architect (one line each, for the Shrey pack)

- **A generation is a job.** One run = thread id, template, grid, model, the context ids with one marked Main, the
  metadata snapshot that was sent, the prompt; states queued · drawing · done · failed, retries up to the tuner's "max
  tries"; every output is an immutable version with its parent (a zone edit forks a branch, nw-4 shows it).
- **History is the run log, not a gallery.** Every set, version and zone variation is stored with its run; retention
  30 d · 90 d · a year from Settings; "Forget everything" deletes runs, versions, feedback and derived memory, and asks
  twice.
- **What was sent is stored verbatim.** The server builds the metadata block per role (sold ₹ omitted, never masked, M:121)
  and keeps the exact text with the run; History and Settings › "What Stitch sends" read it back.
- **Feedback is an event stream.** Thumbs on a set or tile, the pick of a cell, a swipe (keep · discard · save), each with
  thread, version, cell and time; the taste rules are records with provenance (typed · proposed-from-thread), on/off, and
  the per-category "learned" line is derived from them.
- **What works is a join, not a table of its own.** Stitch version → sample S-no → product → the ERP's demand score, read
  state, pcs, returns; it needs the "from track · vN" lineage carried through the sample's finalise step (production plan
  W25) or the rows stop at the sample.
- **Hand-off writes one record.** Save as sample creates a sample draft in Production (sketch slot = the render, reference
  slot = the Main and refs, notes, target price for money roles, links back to the version); Stitch never writes a product
  master or a product's media slots; "Use as design content" only prefills a new master in Hub.
- **Moodboard inputs are three feeds.** Uploads, pasted links (thumbnail fetched server-side), and a WhatsApp share-in
  number attached to the firm (inbound media → Mine); Stitch's enrichments carry by_stitch and a one-line reason.
- **The tuner's state is per thread.** Open tab, expanded template, chosen model per template, stored with the thread and
  restored on open (O:4); templates are records (prompt text, default grid, reference images, seeded vs personal).
- **Models route through one gateway.** OpenRouter per the owner; one model per template with a per-thread override, keys
  per provider with a test call, usage and cost per run (cost visible to admin only).
- **Permissions are the server's answer.** Studio edit (admin, sub-admin), view + save (production manager, merchandiser),
  view (office manager), none (sales, dispatch); a locked screen offers the time-boxed request of F:26.

---

## 7 · Exemplar drawn (13 Oct, after the lead's ask)

One compare pair so the owner judges decisions 30 to 33 from a picture: the designer terminal in the house language with
the picture first, and the phone review companion of the same state. File `mod-studio-r2.jsx`, registered as the Studio
band "Review 2 · exemplar"; the lead adds it to `modules.js` at merge. Nothing else on the board changed.

| Frame | What it shows | Compare against |
|---|---|---|
| nw-16 / nwd-16 · "Review 2 · terminal in the house language · spine, stage, pane as a handle" | Six header buttons (Memory ▾ holds Settings, D31) and the search field intact; the chat as a 56 px spine with the orb, the thread's name and the context thumbs (D33); the set on a white card 640 wide on the sunken sand stage; one thumbs pair, Compare · Full screen · Share; the version strip; the prompt box with the template chips and Grid ▾; the right pane a 30 px handle "Set options · pick a cell" until a cell is picked; the tuner would slide over that pane. One maroon line: Send. No deep space, no coloured thread, no glow (D30 option b or c). | nw-2 / nwd-2 |
| n-14 / nd-14 · "Review 2 · phone review companion · the set as a card, keep / discard / save" | The thread as a chat on sand: the prompt in one line, Stitch's reply in the display face, the set as a card with quiet cell numbers and the AI-render mark, "Open on the canvas", then Discard · Save · Keep (Keep the one maroon line); the prompt tray with four template chips above the island (D32). | n-2 / nd-2 and n-6 / nd-6 |

Renders: `.board-check/sheet-studio-review-2.png` (the four frames at scale 0.8) and `.board-check/sheet-studio-frames.png`
(n-14, nd-14 at scale 1). Board check on Studio after the addition: 60 frames, console clean.
