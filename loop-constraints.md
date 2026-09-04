# Loop constraints

Binding rules for every loop defined in `adsense-loop-plan.txt`.
Read this file at the **start of every iteration**, before triage, before any
action. These are constraints, not suggestions. A loop that cannot satisfy the
task within them stops and escalates rather than relaxing one.

## C1 — Never push to main
Every change opens a pull request. No auto-merge, ever, for any loop, at any
confidence level. The human review step is the deliverable, not an obstacle.

## C2 — Verify the git identity before any push
Run `gh auth status` before any `gh` or `git push` command. If the account is
`recruitonlineallan`, **stop and escalate** — that is the wrong identity for
this repository.

## C3 — Free services only
No new paid dependency, no `npm install`, no `package.json`, no build
toolchain. This site is GitHub Pages plus GitHub Actions and stays that way.
`scripts/seo-audit.js` uses only Node built-ins; keep it that way.

## C4 — Do not touch the blog review gate
Never modify the human PR-review step in `.github/workflows/publish-blog.yml`.
Never raise the cron above 3×/week. This is the guardrail against Google's
Scaled Content Abuse policy and against a repeat of the original rejection.
It is not negotiable and not subject to a "just this once" exception.

## C5 — No gate passes without evidence
A gate is satisfied only by the line in `.loop/audit.json` that proves it.
Narration is not evidence. Every PR that claims to move a gate must quote the
before and after audit values, and must state that no other gate regressed.

## C6 — Never reapply to AdSense
Loop D produces a verdict with evidence attached. A human clicks the button.
No loop performs, simulates, or advises on gaming the review.

## C7 — One concern per PR
B1 does not arrive in the same PR as B5. A reviewer must be able to accept or
reject one idea at a time.

## C8 — Content edits stay factual
Never invent an author name, a credential, a testimonial, a statistic, a
review, or a claim about what the product does. If a fix requires a fact you
do not have, that is an escalation, not a guess.

## C9 — Two dead iterations means stop
If two consecutive iterations produce no measurable gate movement, stop and
escalate. Do not iterate on a stuck problem.

## C10 — Respect the budget ceiling
Each loop states a per-iteration token budget in `adsense-loop-plan.txt`.
Over budget means stop and report. Never "one more try".

## C11 — Never weaken a gate to pass it
The thresholds in `scripts/seo-audit.js` (600 words, 300-word ad floor, 20
posts, 7-day freshness, 30% prose overlap) are the definition of done. If a
loop finds itself proposing to edit them, that is the signal to stop and ask.
Gate definitions change by human decision only.

## C12 — noindex and Disallow are not interchangeable
`login.html`, `dashboard.html` and `test-pwa.html` already carry
`<meta name="robots" content="noindex, nofollow">` and are already absent from
`sitemap.xml`. **Do not add `Disallow:` entries for them in `robots.txt`** — a
disallowed page cannot be crawled, so Google never sees the `noindex` and the
page can persist in the index. Use one or the other, and here `noindex` is
already the right one.

---

## Never — at any confidence, in any loop

- Push to main, merge a PR, or enable auto-merge
- Raise the blog cron above 3×/week, or remove the review gate
- Reapply to AdSense, or advise on gaming the review
- Add an ad unit to any page under 300 crawlable words
- Fabricate an author, testimonial, or statistic
- Add a paid dependency, an npm install, or a build toolchain
- Claim a gate passed without the audit line that proves it
- Edit gate thresholds to make a failing gate pass
