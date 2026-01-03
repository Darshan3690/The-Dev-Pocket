Summary:

- Adds opt-in CSRF protection for state-changing API endpoints (contact POST, newsletter POST and DELETE) controlled by `CSRF_PROTECTION` and `CSRF_PROTECTION_TOKEN` environment variables.
- Adds unit tests verifying that requests without/with incorrect tokens are rejected (403) and valid tokens allow requests.
- Adds `bug-reports/BUG-027-csrf-protection.md` documenting the issue, reproduction steps, and remediation guidance.

How to verify locally:
1. Set `CSRF_PROTECTION=true` and `CSRF_PROTECTION_TOKEN=yourtoken`
2. Run `npm test` to run unit tests

Notes:
- This is opt-in to avoid breaking existing deployments; projects should enable CSRF protection and set the token via environment variables.
- For stronger protections, we can add double-submit cookie flow or integrate a CSRF library in a follow-up PR.
