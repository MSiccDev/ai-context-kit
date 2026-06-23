---
description: 'Human in the loop — present a commit-readiness summary and checklist; do not commit until the user gives explicit go-ahead.'
---

# Human in the Loop

Do not commit yet.

Check the self-review report for its status line before doing anything else:
- If the report opens with `STATUS: BLOCKED`, stop immediately. Tell the user:
  "The self-review is blocked. Resolve the findings listed in the review report,
  then re-run the implementation step before committing."
- If the report opens with `STATUS: PASS`, proceed.

Summarize the current state of the branch for the user:

1. What was implemented (from the implementation report)
2. What the self-review found (PASS, or any non-blocking notes)
3. What tests were added or updated
4. What docs or ADRs were updated
5. Whether a learning report was produced this loop (yes / no / skipped)

Then present this checklist:

---
**Ready to commit?**

- [ ] Self-review status is PASS
- [ ] The implementation matches the slice approved in the readiness report
- [ ] Tests cover the change adequately
- [ ] Docs and ADRs reflect the change
- [ ] No deferred decisions or open tasks should block this commit
- [ ] You have reviewed the summary above and agree with it

Reply with explicit go-ahead to commit, or name what still needs resolving.
---

Do not commit, stage files, or run any git command until the user replies
with an explicit go-ahead.
