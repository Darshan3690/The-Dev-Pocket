# BUG-030: Environment variable validation

Severity: Medium

## Summary

The application currently reads many environment variables at runtime without consistent validation. Missing or misconfigured variables (e.g., Upstash credentials when the app is configured to use Upstash rate limiting, or missing CSRF token when CSRF protection is enabled) can cause runtime errors or unsafe behavior.

## Reproduction

- Set `RATE_LIMIT_MODE=UPSTASH` without `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` and start the app — the Upstash client will throw at the moment it's used.
- Enable `CSRF_PROTECTION=true` without `CSRF_PROTECTION_TOKEN` and certain POST endpoints will reject requests at runtime.

## Fix

- Add a `lib/env.ts` module that validates environment variables at startup and returns typed values.
- Enforce mode-dependent requirements (e.g., require Upstash creds when `RATE_LIMIT_MODE=UPSTASH`) and stricter production-only checks (e.g., `DATABASE_URL` and `CLERK_SECRET_KEY` required in production).
- Add unit tests covering expected failure modes and correct parsing.
- (Optional) Wire `validateEnv()` into server startup/middleware to fail-fast in CI and production. Example:

```ts
import validateEnv from '@/lib/env';
if (process.env.NODE_ENV !== 'test') validateEnv();
```

## Tests

Added `__tests__/lib/env.test.ts` covering:
- Missing CSRF token when CSRF protection is enabled
- Missing Upstash creds when `RATE_LIMIT_MODE=UPSTASH`
- Production-only requirements for `DATABASE_URL` and `CLERK_SECRET_KEY`
- Successful parse when required vars are present

## Notes

This change is intentionally conservative and non-breaking for development; production enforcements are enabled when `NODE_ENV=production`. Recommend calling `validateEnv()` in a place that runs early (e.g., `middleware.ts` or an explicit server bootstrap) so misconfiguration is detected early.
