# Roles and money as the BRD and the drawings state them (13/10/26)

Sources: the role list in the BRD (`design-system/research/brd-final.txt` lines 26–39, cited F:line), the masters BRD
(`brd-masters.txt`, M:line), the module plans under `explorations/catalogue-v2/plans/`, and the owner's dated answers in
`design/during-ui-business-requirements.md` (DU). "Drawn" means a frame on the board shows that role's variant;
"assumed" means the drafters chose it and logged it as not in the BRD. Nothing here is a permission design; it is what
the documents and the screens say today.

## The BRD's role list (F:27–39)

| Role | BRD text, condensed |
|---|---|
| Super dev admin | Dev team; the only role that creates firms. |
| Admin / owner | User-level administrator; may hold several firms under one user; the only role that signs in to all firms together (firm selector top left). |
| Sub-admin (VP) | All owner-level rights in one firm; can escalate and mark any approval "for owner". Accounts is "sub-admin for now" (F:12). |
| Office manager | All view permissions. |
| Sale manager | All permissions in Sale and Dispatch; view only in Production and Hub. |
| Sale executive | All view permissions; makes and edits sale orders in Catalogue and Dispatch; no Production, Hub or Studio. |
| Customer | Catalogue and Carts view and edit only (what Customer mode shows). |
| Dispatch manager | View and edit Catalogue, Sale orders and Dispatch; view only Production and Hub; no Studio. |
| Dispatch packer | View Dispatch and scan only. |
| Production manager | All permissions in Production, Carts, Catalogue; view only on Sale orders; the Out of stock tab. |
| Production merchandiser | All Production permissions except deleting entries or approving overages, production orders or purchase orders. |
| Production warehouse executive | View Production; make production issues, purchase orders, purchase inwards, production receives; view Catalogue and material stock. |
| Guard | View and make entries in the gate pass module only; no edit or delete. |

Permissions are to be screen-level within a module, at View only / Edit / Back-date edit / Delete, and anyone may ask
for a permission for 24 h, 1 week, 1 month or 3 months, approved by the owner and documented; a locked module shows as
locked (F:26). The board draws the lock as Production › "locked for this role" (`production` `n-2`, `nw-2`); the request
sheet itself is not drawn (review 1: later, with Home › Approvals).

Roles the brief names that the BRD does not: "karigar" as a user of the jobber phone (Production `n-26`, the karigar
records on his own phone; entries wait for floor verification), "accounts" (the BRD's sub-admin), and "semi-skilled
worker", which is not a role but a profile: about 30 % of users (owner, 6 Oct, DU) who need voice, pictures and few
typed fields across every role they hold. The Studio plan notes there is no design-team role yet (open).

## Module and sub-menu access as drawn

Rows are roles, columns are modules. "Edit" and "view" follow the BRD; the sub-menu notes come from the plans.

| Role | Home | Catalogue | CRM | Dispatch | Production | Hub | Studio |
|---|---|---|---|---|---|---|---|
| Admin / owner | all; approves over-the-line orders; "for inspection" lands here | all | all; Escalate and RED stages as own list (F:100) | all | all; approves orders, overages, costing | all, including import commit (M:106) | edit; usage cost admin only (assumed) |
| Sub-admin / accounts | approvals: sale orders, purchase inwards, returns (F:46); cannot clear an over-the-line flag, sends to admin (assumed, DU 13 Oct) | all | Payments worked by accounts; sale manager reads | approves returns and credit notes (F:216, F:222) | view | all; import commit (M:106) | edit (assumed) |
| Office manager | view | view | view | view | view | view | view |
| Sale manager | approvals: sale orders and returns (F:46); Analytics (6 Oct) | all; sets promotional badges on the tag rail (DU) | Follow-ups, Share, Payments read | all | view | view | none (BRD silent) |
| Sale executive | own landing (`home` `n-1`); own orders in the queue with Edit and Delete | all, makes and edits sale orders; no Analytics (6 Oct); quick chips In stock · New · High growth · Priority sale · Discounted | Follow-ups and Share; no outstanding | view, edits sale orders | none (locked) | hub list lookup without money (M:126) | none (F:32) |
| Dispatch manager | gate tokens auto | edit | none stated | all seven sub-menus; invoices, ships, prints, returns | view | view | none (F:34) |
| Dispatch packer | none drawn | none | none | Packing, Pending (read), Billed and Return in packer variants; FG inward; proposal: three tabs To pack · Stock · Receive (dispatch-flows §5, open) | none | none | none |
| Production manager | approvals: delay and overage (F:46); costing approval | Carts, Catalogue | none stated | Out of stock tab | all | view | view and save as sample (assumed, open) |
| Production merchandiser | none | | | | all but delete and approvals | view | view and save as sample (assumed) |
| Production warehouse executive | none | view | none | view material stock | issue, receive, PO, inward; floor phone | none | none |
| Karigar (jobber phone) | none | none | none | none | records issue and receive on his own phone (`n-26`), unverified until the floor confirms | none | none |
| Guard | Gate pass only (`n-7`, `nw-4`) | none | none | none | none | none | none |
| Customer (Customer mode) | none | grid and product without stock, system tags or saved lists; promotional badges and price only | none | none | none | none | none |

Review 2 decision 2 proposes the phone island per role (packer: Home · Dispatch · More; sale executive: Home ·
Catalogue · CRM · More; production hand: Home · Production · More). Not drawn yet.

## The money rule

The one rule every plan repeats: money is omitted server-side for a role without the money right, never hidden in
the client (M:121, M:207); a screen either has the ₹ column or does not, and the cell distinguishes "hidden for your
role" from "not computed yet" (M:121). The money right is a permission row an admin grants or revokes (M:206), and a
role default can be revoked per employee (M:165).

| Role | Money shown | Where the board draws it |
|---|---|---|
| Admin / owner, sub-admin / accounts | everything: rates, amounts, outstanding, costing, credit lines; usage cost in Studio admin only (assumed) | Home approvals card (`home` `n-3`…`n-6`, `nw-2`, `nw-3`), Import with price column (`hub` `nw-4`) |
| Sale manager | order and bill amounts, outstanding, credit utilisation, catalogue prices, analytics ₹ | Home web landing "Billed today" (`home` `nw-1`), CRM Payments (`crm` `n-25`, `nw-24`), Sale orders table with flags (`catalogue` `nw-15`), Dispatch manager variants |
| Sale executive | catalogue prices and the order's own total only; no outstanding, no credit facts, no analytics | Home phone landing without a ₹ tile (`home` `n-1`); submit sheet shows pcs and ₹ of this order (`catalogue` `n-11`); CRM executive variant not drawn |
| Dispatch manager (desk) | rates and amounts on the pending pane, the packing desk and Billed; never on the Ready board (F:164, F:219) | `dispatch` `n-3`, `n-10`, `n-12`, `n-23`, `n-25`; `nw-5` invoice review |
| Dispatch packer (floor phone) | none, ever (F:219, F:222) | packer variants `dispatch` `n-4`, `n-11`, `n-13`, `n-24`, `n-26`, `n-28` |
| Production manager, merchandiser | job rates, material rates, costing, karigar dues (F:36–37), with the lock mark on manager phones | `production` `nw-22`, `nw-42`, `n-41`, `n-42`, `nw-44` |
| Production warehouse executive, karigar | none on the floor phone (F:38 gives no money right) | issue and receive sheets `production` `n-22`, `n-23`, `n-26` |
| Guard | none | `home` `n-7` |
| Customer mode | price only | `catalogue` `f-6`, `n-4` |
| Hub users (admin, super admin, owner, accounts admin, production manager, salesperson open the Hub, M:126) | money columns omitted per column for anyone without the right; exports follow the same rule (M:108); Team is the exception and says so | `hub` `nw-1` price and sold ₹ with a lock mark |
| Studio | sold ₹ in metadata, target price and cost only for money roles; omitted, not masked, otherwise | `studio` `nw-6` metadata switch; `nw-14` usage |

## Two dated owner rules that shape approvals

- **6 Oct (review 1, answer 5):** Analytics under Sale orders is for sale managers and above; hidden for sale
  executives. Drawn: `catalogue` `f-19`…`f-21`, `w-11`…`w-13` are manager screens.
- **13 Oct (review 2):** a sale order is never blocked at submission, because the people submitting are blue-collar
  salespeople. The salesperson can edit or delete a submitted order while it sits in the queue. Every reason not to
  approve (over the credit line, overdue bills, high return ratio, new customer, edited after submit) is a flag on the
  approver's side, in words, with the fact beside it, and flagged orders sort first. This overrules the BRD's F:17
  ("blocked and escalated to admin with a red blocker theme"). The credit facts (open book, this order, free) travel to
  the approver's card (`home` `n-3`, `n-4`), not to the salesperson's submit sheet. Who clears an over-the-line flag,
  admin only or sub-admin too, is open (review 2 decision 7). Flags are approver-side only: a sale executive sees
  RAISED / IN QUEUE and no flag column (desk-density ruling 3; the executive variant of the table is still to draw).

## Approvals by role (F:46, as drawn)

| Approval kind | Who the BRD names | Card drawn |
|---|---|---|
| Sale order | sale manager, accounts; everyone above the task holder; over the line goes to admin | `home` `n-3` (within line), `n-4` sub-admin, `n-5` admin, `nw-2`, `nw-3` |
| Sale return | sale manager, accounts | `home` `n-6` |
| Purchase inward | accounts (supplier score, payment overdue) | not drawn, queue count only |
| Production order, overage | production manager (karigar score, job history, dates, recipe); merchandiser may not approve | not drawn |
| Costing | PM or admin | not drawn |
| Any | a production manager can mark "for inspection" and escalate to owner or main admin | link under the actions on `n-3` |
| Hold | not in the BRD; owner's 13 Oct brief | `n-3`…`n-5` (assumed) |
