# 🐛 Bug Report

## 📌 Report Title

**Missing Security HTTP Headers (CSP, HSTS, X-Frame-Options, etc.) — Hardening Needed**

---

## 📋 Description

The application lacks a standardized set of security HTTP response headers (CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, etc.). Without these headers, the site is more exposed to: content injection, clickjacking, MIME-type confusion, unsafe referrer leaks, and other browser-level attacks.

---

## 🔄 Steps to Reproduce

1. Deploy the site to any environment (local or production).
2. Inspect response headers of any page or API route (e.g., via browser devtools or curl):

```bash
curl -I https://the-dev-pocket.com
```

3. Observe the lack of security headers such as `Strict-Transport-Security`, `Content-Security-Policy`, `X-Frame-Options`, etc.

---

## ✅ Expected Behavior

- Application should set secure headers by default or via an opt-in configuration.
- Recommended headers:
  - Strict-Transport-Security: `max-age=63072000; includeSubDomains; preload`
  - X-Frame-Options: `SAMEORIGIN`
  - X-Content-Type-Options: `nosniff`
  - Referrer-Policy: `origin-when-cross-origin`
  - Permissions-Policy: `camera=(), microphone=(), geolocation=()`
  - Content-Security-Policy: conservative default allowing self and well-known CDNs; configurable via environment variable.

- Headers should be configurable (opt-in) and documented in README.

---

## 🚫 Actual Behavior

No security headers are set by the Next.js app responses, leaving the site more vulnerable to common web attacks.

---

## 🛠 Suggested Fix

1. Add an opt-in configuration to `next.config.ts` that injects security headers when `SECURITY_HEADERS=true` (helpful to avoid breaking existing deployments while encouraging adoption).
2. Provide sensible defaults for CSP and other headers, and allow overrides via environment variables (e.g., `CONTENT_SECURITY_POLICY`, `HSTS_MAX_AGE`).
3. Add unit tests verifying header generation logic.
4. Document the feature in `bug-reports/BUG-028-security-headers.md` and `docs/Security.md`.

---

## ✅ Checklist

- [x] Repro steps provided
- [x] Suggested remediation provided
- [x] Tests will be added to verify behavior

---

**Severity:** 🟠 High — Improves security posture and mitigates several browser-level attack vectors

