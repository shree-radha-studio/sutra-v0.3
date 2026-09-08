Heads up before you look: the "Log payment" sheet you asked for already existed.

I went to add it and found `ScreenCrPayLog` (phone) / `WebCrPayLog` (web), body
`LogPaymentBody`, already built and registered in the Payments flow — it's been on
the board since the CRM module's first full pass and is written up in
`plans/crm.md` (P7's action list, and the §8 button table). It already does exactly
what you described:

- picks a bill — an "Allocate to bills" list (Oldest first / Pick bills / On account)
- amount — "Amount received"
- mode — Cash / UPI / Cheque / a bank-transfer chip labelled "NEFT" (the term this
  board already uses for bank transfers elsewhere, e.g. the invoice history rows)
- a reference number — "Reference" (UTR) plus the paying bank
- a note — "Note"
- confirms — the footer button, "Log ₹39,955"

Light/dark came for free (every registered screen gets both), and it was already
positioned in the Payments sub-menu.

What I actually changed: on the phone, the registration order was bill sheet →
snooze → log payment, so Log payment sat two screens after the bill sheet, not
right after it as asked — and that also disagreed with the module's own plan doc,
which lists the bill sheet's actions as Log payment, then Snooze, then Escalate. I
moved the phone registration so Log payment now follows the bill sheet directly,
ahead of Snooze (one line in the CRM registration block in
`explorations/catalogue-v2/mod-crm-phone.jsx`). Web wasn't touched — it has no
separate "bill sheet" frame to be "after", bills show inline in the pane there.

New frame ids on `board.html?m=crm`: phone `n-28`/`nd-28`, web unchanged at
`nw-27`/`nwd-27` (web order didn't move). Board-check came back clean before and
after: 202 frames, console clean. I opened all four screenshots — no clipping,
correct theme colours, nothing empty.

Nothing else in CRM or any other module was touched. Committed locally only
(`9db1c84`), per this run's instructions — no push, no `tools/sync.sh`.

One thing worth a look when you get a minute: the mode chip says "NEFT" where your
ask said "bank." I kept NEFT since it's the label this board already uses for bank
transfers elsewhere (e.g. "05/08/26 · NEFT" in the invoice history) — but say the
word if you'd rather it read "Bank" generically instead.
