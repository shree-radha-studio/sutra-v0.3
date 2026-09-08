# sutra-mockups · skill audit (9 Sep 2026)

Basis: the skill text of 8 Sep, the owner's original brief (Global skills installation session, 5 Sep: "make what we did in this chat a skill to plan and create mockups, light and dark, phone and web, for all future modules, structured on the same board: New drafts while planning, Finals after; find scattered BRD mentions; future screens in the same design language"), and what five sessions actually did with the skill on 8 and 9 Sep.

## Intent vs text

| Intent | Old skill | Finding |
|---|---|---|
| Plan first, drafts on "go", finals screen by screen | Present, but the plan step ran for every task, including a one-screen edit | Three entry paths were needed: edit, new module, variant |
| Same design language | 60-word memory paragraph restating the schema | Duplicate of the schema's own "rules that do not bend"; point at the schema instead |
| Same board layout | Written for the single file; updated to pages in the afternoon | Board mechanics belong in a reference, the body keeps the rules |
| Team use on lighter models | Prose only; no template, no scripts | Sessions each re-invented verification pages and scaffolding |

## Token efficiency

Old: 1,558 words loaded on every trigger. About 40% was reference material read rarely: a stale component list (Sources 5), per-module BRD grep vocabularies, id schemes and flags, port lists. New: 762 words in the body; 1,000 words in two references loaded only when needed; a generated `COMPONENTS.md` replaces the hand-kept list (the old list named 30 components, the board exports 518).

## Drag removed

- "Everything below happened on the Catalogue module first" and other narrative.
- Component inventory naming `attachFinal(T)` chrome and `Rail`, `Sidebar` (deleted on 8 Sep when the approved bar landed).
- "The stage sizes itself. Sections stay separated by SECTION_GAP" (renderer internals).
- The docx mention, the 5-server limit, port numbers, Playwright and Chrome extension notes (both time out on the board).
- A checklist that repeated the workflow.

## Usability signals from the sessions

- CRM made ten `crm-*.html` check pages, Production made `_verify.html`: the skill said "verify" but the tools it pointed at (in-app pane, Chrome) hang on the board. Now `scripts/board-check.sh` renders headless and screenshots frames by id.
- Ports 8765 to 8769 and 8781 to 8790 were all claimed by sessions adding launch configs. The check script picks a free port itself.
- Production and CRM both defined `NextPill` and `HistoryRows`; the later file won silently. The prefix rule is now explicit and the template applies it.
- Ids shifted when another module registered above; sessions quoted stale ids in docs. Per-page ids fix the cause; captions show ids.
- Every session wrote the same shape of registration block by hand. `scripts/new-module.sh` writes it from `assets/mod-template.jsx`, which renders clean in both themes (checked 9 Sep).

## Result and intent checks

- Owner's taste (mature, readable, premium, better UX organisation, no gimmicks) is carried by the schema and by "a screen that looks like it was always there", not by adjectives in the skill.
- Money-by-role variants, captions in flow order, during-ui notes files: kept, one line each.
- Sync is the skill's step at start and end (`tools/sync.sh`), matching the owner's "no added step".

## Open

- `mod-dispatch.jsx` still carries the shared phone primitives (Body, Sheet, Pill …) so it sits in `base`; a `shared.jsx` would make Dispatch a normal module and shorten every page's compile.
- Description optimisation (trigger eval) not yet run.
