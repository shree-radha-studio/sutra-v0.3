# During-UI technical design notes

Observations made while drawing mockups that the architecture pass will need, and that the BRDs do not state.
These are notes for later, not decisions and not build instructions. Nothing here is implemented. Append; newest at
the bottom. The mockup board itself (React + JSX compiled in the browser by Babel) is a drawing tool only and says
nothing about the product's stack.

## 8 Sep 2026 · Catalogue tag system

Full hand-off is in `design-system/guidelines/chips-filters-sorts.md` section 5. Extra points from drawing the screens:

- A grid card needs its chip already resolved by the server for the requesting surface and role
  (`primary_action_tag`, `stock_state`, matched colour count and matched colour ids), because precedence differs
  between selling and making surfaces and the client should not compute it.
- The "why?" payload must be per colour, not per design: the by-colour table on the product page (free · cover ·
  in production · fires) is what makes "2 of 4 colours" traceable.
- Lifecycle read state must be queryable for the Samples and Studio screens: activation date, read day n/15, read
  complete, re-reading, stockout-censored days.
- Promotional badges are a separate manual table on design or colour; the server strips system tags in customer
  mode, never the client.
- Quick chips are stored as admin-pinned role defaults per screen (the same mechanism as saved views), not code.
- The sort & filter sheet needs server facet counts and a debounced "Show N" count that respect firm scope and money
  permissions.
- Board ids on the mockup canvas are positional (`n-<i>`, `nw-<i>`) and shift when a module above adds screens; this
  matters only for the mockup workflow, not the product.

## 8 Sep 2026 · Production module

- A recipe is per design per colour: process sequence (ordered, one marked final) plus a BOM per process for 1 pc;
  a WIP row can feed exactly one later process; a material may appear in two processes with two averages. Orders
  freeze the recipe version they started with.
- Job = order × process (× karigar when split). Quantities are derived: required = ordered pcs × average; issue is
  entered as "pieces to issue for" and materialised per input line; receives settle tranches and may be lower than
  issued (loss, rejection, excess are separate quantities). The last process's receive is an FG inward in Dispatch.
- Dye WIP is a material lot with lineage (dyer, cut order, source material, shade code, received qty); the dyer's
  balance is source material issued in bulk minus cut orders received (plus loss).
- Samples need moves without a recipe: each move stores process, karigar, colour, issued lines (material or a WIP
  born from an earlier move) and its receive; finalise derives sequence and averages (issued qty ÷ pieces) as a
  draft recipe the user edits.
- Job cards board needs server-side scopes and sorts (urgency, waiting on floor, serviceable now, oldest
  unassigned, no-activity days, customer shortage impact) and per-job serviceability resolved server-side.
- Gate tokens and challan numbers per issue / receive; karigar dues accrue per piece received with a 30-day term.

## 8 Sep 2026 · CRM module

- A customer's position is (list, journey, step, since, snoozed-until, owner); the step strip needs per-step counts
  and the overdue count per list, server-side, respecting "Mine".
- The Recommended grid is a ranked list per customer with a per-tile match reason (state · colour · price · taste
  · what-worked) and one action tag; the ranking inputs (purchase history, taste vector, preferred bands and
  colours, product demand score, priority-sale and clearance flags) need a "why" like the catalogue chips.
- The packet is its own record: customer, send-to memory, tiles (design, colour, picture kind, logo placement per
  picture), video choice, template and rendered message, stock verification snapshot at send time, channel result;
  the Hub report table (M:305) reuses it.
- Logo placement stores a normalised position, scale, opacity and mark variant per picture; rendering happens
  server-side for the exported files.
- Payments: a bill's stage is derived from dates (due, grace, stage waits from the journey), never stored by the
  snooze; a customer's stage list is the set of stages of their open bills; weekly broker and agency reports are
  scheduled per section.
- Journey builder needs a node graph (trigger, step, wait, branch, snooze, end) with versioning; a customer keeps
  the journey version they entered on.

## 8 Sep 2026 · Studio › AI Designer "Stitch"

- A track is the unit of memory: name, category, context list (item refs with Main/ref role, moodboard refs,
  pasted links), the metadata switch state per run, every prompt, every generated set and version with the
  template and grid used, branches, picks, saves (sample no, moodboard item, packet). Sessions are slices of a
  track by day. "What was sent" must be reproducible verbatim later (Memory › Sessions shows it).
- The metadata payload is text derived from house data only (demand score and band, pcs by colour 30 d and
  lifetime, returns, read state, recipe consumption where a recipe exists); sold ₹ is included only for money
  roles and omitted, not masked, otherwise; the field list is a per-user setting with an on/off/ask default.
- A generated set is one image plus per-cell crops addressable as tiles; a picked tile becomes a version. A zone
  edit needs a mask per zone on the picked image (zones proposed by the agent per category: blouse, lehenga,
  saree lists in the plan) and a material-to-prompt mapping (material photo + work/finish tag + colour name), so
  materials need a work/finish tag in the master.
- Templates are a registry (seeded and personal) storing prompt, output format, grid, reference images and the
  image model chosen in the tuner; applying one restores its whole state; usage is counted per template.
- Save as sample creates the same record as a manual new sample (temp number, category, colours, target price,
  notes, reference links) with the render in the sketch slot, plus a provenance link back to the track and version
  so "Imported from S-no" can carry through finalise into the product for the What works correlation.
- What works joins Stitch versions → sample → activation → read state → demand score → pcs → returns; it is a
  read layer over existing modules, with a minimum-rows guard before any generated reading.
- Moodboard items carry provenance (upload, link with thumbnail, WhatsApp share-in from a firm number, added by
  Stitch with a source and reason) and a used-in list; the "Only my uploads & links" switch is a filter on
  provenance. WhatsApp share-in needs a firm number and a capture path like purchase-order picture capture.
- Renders are firm-scoped assets with the same tiering as product images; every render carries the "AI render"
  mark in its metadata as well as on screen.
- The tuner's Models tab holds per-template model choice, key state and a test call; Usage counts runs, images and
  failures per template and month; cost visible to admin only.


## 9 Sep 2026 · Studio > Stitch (owner's go message of 8 Sep 17:48, recovered from the transcript)

- The owner intends OpenRouter as the intelligence route, with several providers behind it for image and video
  generation; the Settings sub-menu therefore needs a per-template model choice for text, image and video, a
  provider key state per provider, and a usage ledger per template and month. Not a design element.
- Feedback events are their own records: thumbs up or down on a set or tile, tile pick, swipe right, left or up,
  each with track, thread, version, template, context hash and user; What works and the taste rules read them.
- Tuner, zone and version pane state (open tab, expanded template, chosen model) is stored per thread and
  restored on open.
- "Use as Design Content" creates a draft product master or material master with the render in the design-content
  image slot and a provenance link to the History item; the master flow (Hub > Masters) completes the rest.
- Modular UI blocks imply one component contract per block (header, body, foot, collapsed state) shared by web
  and phone; layout preferences (chat side, pane docked or floating) are per-user settings.

## 9 Sep 2026 · Production module, coverage review

- Board: global component names collide across module files (both CRM and Production exported `NextPill`); the
  per-module board pages remove the risk, but module files should still prefix shared-sounding names.
- Verification state on issue/receive rows: recorded-by (floor / karigar app), verified-by, verified-at; dues, vouchers
  and gate tokens are created at verification time, not at recording time.
- Over-receive needs a held quantity per colour on the job, separate from received, released by PM approval.
- Dye lots are materials with lineage (source material, dyer, cut order, shade code, loss) and appear in recipes and in
  a running order's inputs; the recipe frozen on an order must allow an input swap without changing the recipe version.
- Sample reading metrics per day (views, cart adds, waitlist orders) for 15 days after deployment; the suggestion
  needs a growth threshold constant.
