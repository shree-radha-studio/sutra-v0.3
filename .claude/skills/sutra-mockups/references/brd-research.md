# Mining the BRD for a module · reference

The requirements are spread across five texts in `design-system/research/` (and `design-system/uploads/Business Req.txt`, the older BRD with the glossary and role matrix). A module's needs are never only in its own section: the catalogue section holds the cart card's "double tap" rule, Home › Approvals holds the customer score that shapes CRM, the role matrix says who sees money. Read wide once, so the plan is right the first time.

## Steps

1. Read the module's own section in `brd-final.txt` end to end, including sub-menus, roles, right-pane and phone notes.
2. Grep every text, case-insensitive, for the module name, its sub-menu words and the synonyms below. Read each hit with its surrounding paragraph.
3. Check the role matrix (lines near "Sale Executive", "Dispatch Manager", "Production Manager") for who can see money, approve or edit in this module.
4. Write what you found into `explorations/catalogue-v2/plans/<id>.md` under "Found elsewhere in the BRD", each with the line number and a one-line quote, so the owner can confirm or strike it.

## Synonyms per module

| Module | Grep at least |
|---|---|
| CRM | crm, customer, dossier, follow, payment, journey, broker, agency, whatsapp, score, tier, overdue, recommended |
| Production | production, purchase, inward, recipe, bom, process, karigar, jobber, job card, issue, receive, costing, sample, wip |
| Dispatch | dispatch, pack, parcel, invoice, gate, scan, ready, pending, stock, return, transporter |
| Hub | master, ledger, report, column, compare |
| Studio | studio, image, photoshoot, stitch, moodboard, upload |
| Channels | channel, firm, transfer, permission |
| Home | home, dashboard, notification, approval, gate pass, token, quick link, metric |

## The plan file

`explorations/catalogue-v2/plans/<id>.md`, short sections: sub-menus; per sub-menu the screens in the order a user meets them, one line each (purpose, who uses it, what the right pane holds on web, what floats on phone, money rule); "Found elsewhere in the BRD"; open questions. Show it to the owner before drawing. If they said "just build", state the assumptions at the top and go.

## Notes that are not in the BRD

Anything the owner says, or you notice, that the BRDs do not contain goes into one of two append-only files, dated and naming the screen; then keep drawing:

- `design/during-ui-business-requirements.md` for business rules, roles, fields, copy, thresholds, owner decisions.
- `design/during-ui-technical-design.md` for what the architecture pass will need (grain, payload shape, permissions, timing, sync).

Notes, not designs. Nothing gets built from them here.
