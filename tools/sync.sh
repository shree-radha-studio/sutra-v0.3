#!/usr/bin/env bash
# Sync this machine's board work with the team repository, in one step.
#   bash tools/sync.sh "CRM · payments phone screens"      commit everything and push (pulls first, rebasing)
#   bash tools/sync.sh                                     just pull (run before drawing)
# Nobody types git commands: the sutra-mockups skill runs this at the start (pull) and end (commit + push) of a build.
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."
MSG="${1:-}"
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || { echo "not a git repository; see README"; exit 1; }
if [[ -n "$MSG" ]]; then
  git add -A
  if ! git diff --cached --quiet; then
    git commit -q -m "$MSG" -m "Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
    echo "committed: $MSG"
  else
    echo "nothing to commit"
  fi
fi
# bring in the others' work; local commits are replayed on top
git pull --rebase --autostash -q origin main || { echo "pull failed: resolve the conflict, then run this again"; exit 1; }
if [[ -n "$MSG" ]]; then git push -q origin main && echo "pushed"; fi
git log --oneline -5
