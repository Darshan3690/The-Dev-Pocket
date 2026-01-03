Summary:

- Adds opt-in security HTTP headers via `next.config.ts` using `generateSecurityHeaders()`.
- Enable by setting `SECURITY_HEADERS=true`. Customize CSP via `CONTENT_SECURITY_POLICY` env var.
- Adds unit tests (`__tests__/next-config-headers.test.ts`) that verify header generation and overrides.

Files changed:
- `next.config.ts` - exports `generateSecurityHeaders()` and adds headers() config which returns generated headers when `SECURITY_HEADERS=true`.
- `bug-reports/BUG-028-security-headers.md` - Documentation and remediation guidance.
- `__tests__/next-config-headers.test.ts` - Unit tests for header generation.

How to verify locally:
1. Run `npm test` (tests included).
2. Enable `SECURITY_HEADERS=true` and start the app, then inspect response headers to see the security headers applied.

Notes:
- This is opt-in to minimize surprises for existing deployments. We can turn on by default in a follow-up if desired.
- If maintainers prefer a stricter CSP, set `CONTENT_SECURITY_POLICY` appropriately in environment or repo secrets.

Refs: BUG-028 (Security headers)
