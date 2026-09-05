# The standing loop instruction

Paste the block under **The prompt** into `/schedule`, not `/loop`.

`/loop` is session-scoped: it ends when the terminal closes and its wakeups are
capped at an hour. G6 requires four consecutive weeks of publishing history, so
no session loop can ever reach the finish line. `/schedule` runs in the cloud
and survives.

## What "finished" means

Finished is not a judgement call. It is this, and only this:

```
node scripts/seo-audit.js --live   →   exit code 0
```

That means all nine blocking gates (G1–G9) pass against **both** the committed
files and the deployed URLs. Until that command exits 0, the loop has not
finished and must not stop.

## Blocked is not finished, and it is not a reason to stop

Two gates cannot be closed by working harder:

- **G4** needs 7 more posts. They must go through the human PR review in
  `publish-blog.yml`. Generating them in bulk to clear the number would be
  scaled content abuse — a worse outcome than the original rejection, and
  forbidden by C4.
- **G6** needs no gap over 10 days across four consecutive weeks. That is
  calendar time. It cannot be compressed.

When these are the only failing gates, the loop **keeps running and waits**. It
does not declare victory and it does not stop. Each cycle it does the cadence
check below, stays quiet if nothing changed, and comes back.

## The prompt

> Read `loop-constraints.md`. Run `node scripts/seo-audit.js --live`.
>
> If it exits 0, every blocking gate passes: report that the reapply gate is
> open, list the human confirmations still outstanding from
> `.loop/state.json` `humanBlocked`, and stop. This is the only condition that
> ends the loop.
>
> Otherwise, take the highest-priority failing gate in this fixed order —
> G3, then G1/G2, then G8, G7, G9, then G4/G5/G6 — and act:
>
> **If it is mechanically fixable** (G1, G2, G3, G7, G8, G9): make the smallest
> change that moves that one gate. Re-run the audit to prove it moved and that
> nothing else regressed. Commit to `main` with the before/after gate values in
> the message and push. Update `.loop/state.json`. Then continue to the next
> failing gate in the same cycle — do not stop after one fix.
>
> **If only G4 and/or G6 remain**, run the cadence check instead:
> 1. Did the scheduled `publish-blog.yml` run since the last cycle succeed?
> 2. Did it open a PR? A green run that opened nothing is a FAILURE, not a pass
>    — that silent failure is what caused the original 88-day gap.
> 3. Is a generated-post PR older than 4 days still unreviewed? Name it and its
>    link so the human can act.
> 4. If `newestPostAgeDays > 7`, escalate loudly: the pipeline is dead again.
>
> Then report in one line and wait for the next cycle. Do not stop. Do not
> generate posts outside the workflow. Do not raise the cron above 3×/week. Do
> not merge a post PR.
>
> If two consecutive cycles move no gate **and** the cadence check is clean,
> drop to a single-line status and keep waiting.

## Guardrails that survive the "don't stop" instruction

"Do not stop until everything is finished" changes the stopping rule. It does
not relax anything else. In particular it does **not** authorise:

- bulk-generating blog posts to clear G4
- merging a post PR to make the count move
- raising the blog cadence above 3×/week
- editing a threshold in `scripts/seo-audit.js` so a gate passes
- reapplying to AdSense (C6 — the loop opens the gate, a human clicks)

A loop that clears a gate by any of these has not finished the work. It has
broken the measurement, which is worse than leaving the gate red, because the
red gate at least tells the truth.

## Expected shape

Weeks 1–4 the loop is mostly quiet: the mechanical gates are already closed, so
each cycle is a cadence check and a one-line report. G4 clears when the 20th
post lands. G6 clears about four weeks after publishing becomes regular. Then
the audit exits 0, the loop reports the open gate, and stops.
