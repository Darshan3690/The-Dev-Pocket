# 🐛 Bug Report

## 📌 Report Title

**Missing CSRF protection on state-changing API endpoints**

---

## 📋 Description

Several state-changing API endpoints (e.g., `POST /api/contact`, `POST /api/newsletter`, `DELETE /api/newsletter`) do not validate any CSRF token or verify the request origin. Without CSRF protection, a malicious website can make a victim's browser perform unwanted actions such as submitting contact forms or unsubscribing/resubscribing users.

---

## 🔄 Steps to Reproduce

1. Deploy the application.
2. Host a malicious page that issues a cross-origin POST to `https://your-app.com/api/contact` with a form submission.
3. Trick an authenticated or casual user into visiting the malicious page.
4. The browser will submit the request using the user's credentials (cookies) and the API will accept the request.

Example attacker HTML (simplified):
```html
<form action="https://the-dev-pocket.com/api/contact" method="POST">
  <input name="name" value="Bad Actor" />
  <input name="email" value="attacker@example.com" />
  <textarea name="message">Spam from malicious page</textarea>
</form>
<script>document.forms[0].submit()</script>
```

---

## ✅ Expected Behavior

State-changing endpoints must enforce anti-CSRF protections. Options include:
- Require a header-based token (`x-csrf-token`) that front-end code fetches from a safe source (server-set cookie or endpoint) and includes with requests.
- Validate Origin/Referer headers for same-origin requests.
- Use library-based solutions for CSRF protection.

Suggested opt-in implementation: use environment variables `CSRF_PROTECTION=true` and `CSRF_PROTECTION_TOKEN` to enable, so projects can adopt the protection without breaking existing deployments.

---

## 🚫 Actual Behavior

Currently, the endpoints accept POST/DELETE requests without CSRF checks.

---

## 🛠 Suggested Fix

- Add an opt-in guard in `app/api/contact/route.ts` and `app/api/newsletter/route.ts` that when `CSRF_PROTECTION=true` requires header `x-csrf-token` to match `CSRF_PROTECTION_TOKEN`.

**Limitations & recommendations:**
- The current implementation uses a static token in an environment variable for simplicity and to make it testable from forks without secrets. This is intentionally opt-in and not recommended for high-security production environments. Recommend a follow-up to implement a per-session CSRF token (double-submit cookie or server-side session token) if stronger guarantees are required.
- Add unit tests that set `CSRF_PROTECTION=true` and ensure missing/invalid token returns 403.
- Document the change in `bug-reports/BUG-027-csrf-protection.md`.

---

## ✅ Checklist

- [x] Repro steps provided
- [x] Suggested remediation provided
- [x] Unit tests to be added to verify behavior

