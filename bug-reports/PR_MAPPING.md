# PR ↔ Bug Report Mapping

This file lists each documented bug/feature report and the associated pull request (if created), with links to the PR and short status.

- BUG-001: Prisma connection pool — PR: #180 (https://github.com/Darshan3690/The-Dev-Pocket/pull/180) — Status: changes pushed; awaiting review/merge.
- BUG-002: XSS vulnerability — PR: #180 (https://github.com/Darshan3690/The-Dev-Pocket/pull/180) — Status: fixed; tests & docs added.
- BUG-003: JSON.parse localStorage crashes — PR: #180 (https://github.com/Darshan3690/The-Dev-Pocket/pull/180) — Status: fixed; tests added.
- BUG-018: No rate limiting — PR: #180 (https://github.com/Darshan3690/The-Dev-Pocket/pull/180) & #190 (Upstash scaffold) — Status: applied in PR #180 (in-memory) and PR #190 (Upstash adapter TODO: integration).
- BUG-021: Resume syntax error — PR: #180 (https://github.com/Darshan3690/The-Dev-Pocket/pull/180) — Status: fixed.
- BUG-022: Resume save localStorage errors — PR: #194 (https://github.com/Darshan3690/The-Dev-Pocket/pull/194) — Status: fixed; tests added.
- BUG-023: Job save localStorage errors — PR: #193 (https://github.com/Darshan3690/The-Dev-Pocket/pull/193) — Status: fixed; tests added.
- BUG-024: Rate limiter concurrency — PR: #195 (https://github.com/Darshan3690/The-Dev-Pocket/pull/195) — Status: fixed; concurrency test added.
- BUG-025: getClientIP trust headers — PR: #195 (https://github.com/Darshan3690/The-Dev-Pocket/pull/195) — Status: fixed; opt-in via TRUST_PROXY_HEADERS and tests.
- BUG-026: Newsletter stats auth — PR: #195 (https://github.com/Darshan3690/The-Dev-Pocket/pull/195) — Status: fixed; optional NEWSLETTER_STATS_TOKEN implemented with tests.


Other items / feature requests:
- FEATURE-020: Test Suite docs & suggestions — PR: #181 (https://github.com/Darshan3690/The-Dev-Pocket/pull/181) — Status: documentation added; CI snippets included.
- Upstash production adapter scaffold — PR: #190 (https://github.com/Darshan3690/The-Dev-Pocket/pull/190) — Status: scaffold + mocked tests; integration tests gated behind secrets.

If you'd like, I can open a separate PR for any remaining items (e.g., add Upstash integration tests & CI, add security headers in Next config, add OpenAPI docs) — tell me which ones to prioritize and I will create separate branches/PRs with documentation and tests for each.
