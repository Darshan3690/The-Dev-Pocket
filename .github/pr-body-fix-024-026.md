Summary:
- Add serialization for in-memory rate limiter to avoid race conditions (BUG-024)
- Add concurrency test to ensure limit is respected
- Add `getClientIP` trust guidance and tests (BUG-025)
- Require optional `NEWSLETTER_STATS_TOKEN` for `/api/newsletter/stats` when configured; add tests (BUG-026)

Files changed: lib/rate-limit.ts, app/api/newsletter/route.ts, jest config, tests, and bug report markdown files

Tests: Added unit tests for concurrency and auth; run `npm install` then `npm test` to run test suite
