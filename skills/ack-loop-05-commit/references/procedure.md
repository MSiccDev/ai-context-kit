# Human in the Loop

Do not commit yet.

Check the self-review report for its status line before doing anything else:
- If the report opens with `STATUS: BLOCKED`, stop immediately. Tell the user:
  "The self-review is blocked. Re-run the implementation step: it reopens the
  tasks the findings affect (or adds corrective tasks), fixes them, and re-ticks
  them after tests pass. Then run the self-review again before committing."
- If the report opens with `STATUS: PASS`, proceed.

Run `openspec instructions apply --change <id> --json` to get the current
task progress and `state`.

Summarize the current state of the branch for the user:

1. The OpenSpec change id, the task group implemented, and the task progress
2. What was implemented (from the implementation report)
3. What the self-review found on each axis (PASS, or any non-blocking notes),
   and the `openspec validate --strict` result
4. What tests were added or updated
5. What docs or ADRs were updated
6. **Door type:** one-way (hard to reverse, such as a data migration, a public
   API or a deleted capability) or two-way (easy to revert), with one line on why
7. **Blast radius:** what could break if this is wrong, and who or what it reaches
8. Whether a learning report was produced this loop (yes / no / skipped)

Then present this checklist:

---
**Ready to commit?**

- [ ] Self-review status is PASS on both axes
- [ ] `openspec validate --strict` passes for the change
- [ ] The implementation matches the task group approved in the readiness report
- [ ] Every ticked task in `tasks.md` is implemented and tested
- [ ] Tests cover the change adequately
- [ ] Docs and ADRs reflect the change
- [ ] Door type and blast radius are acceptable
- [ ] No deferred decisions or open tasks should block this commit
- [ ] You have reviewed the summary above and agree with it

Reply with explicit go-ahead to commit, or name what still needs resolving.
---

Do not commit, stage files, or run any git command until the user replies
with an explicit go-ahead.

## After the commit

- If `state` is `ready` (tasks remain), the next loop starts at the readiness
  step with the next task group. Do not archive.
- If `state` is `all_done`, the change is complete but not yet archived.
  Archiving is the **last commit on the feature branch, after review approval**
  (spec section 11.7). Tell the user so, and wait.

When the user confirms that the review is approved:
1. List the arc42 sections and ADRs the change affects, and update them on this
   branch first (use the project's arc42 skills where available). Promote any
   decision from `design.md` that is hard to reverse, would surprise a newcomer,
   and is a real trade-off to `docs/adr/`.
2. Run `openspec archive <id> --yes --json` and report `archivedAs`,
   `specsUpdated` and the totals.
3. Present the archive diff (the moved change folder and the updated main specs)
   and wait for explicit go-ahead before committing it as the last commit on
   the branch.
