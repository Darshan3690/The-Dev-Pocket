# 🐛 Bug Report

## 📌 Report Title

**`GET /api/newsletter/stats` is labelled "admin only" but has no authentication (privacy leak)**

---

## 📋 Description

The endpoint `GET /api/newsletter/stats` is documented as "admin only" in code comments, but it does not enforce any authentication or authorization. It returns subscriber statistics and a list of recent subscribers (including email addresses), which could be sensitive. This endpoint is accessible to any client that can reach the API and may leak user data.

---

## 🔄 Steps to Reproduce

1. Send a GET request to `/api/newsletter/stats`.
2. Observe that the response contains `recentSubscribers` with email addresses and other fields without requiring any authentication.

---

## ✅ Expected Behavior

- The endpoint should be protected by authentication and authorization checks (e.g., server-only environment variable token, proper admin middleware, or Clerk role check).
- If the request is not authorized, return 401 or 403 and do not include subscriber emails in the response.

---

## 🚫 Actual Behavior

The endpoint returns full stats and recent subscriber emails to any unauthenticated request.

---

## 🛠 Suggested Fix

- Require an admin token header (e.g., `x-admin-token`) that is validated against a secret (e.g., `NEWSLETTER_STATS_TOKEN`) OR
- Use Clerk/other auth to validate the caller has the appropriate role OR
- Limit the returned `recentSubscribers` to anonymized data (e.g., show only counts or hashed emails) if the endpoint must be public.

I implemented a minimal, opt-in fix: require `x-admin-token` header matching `process.env.NEWSLETTER_STATS_TOKEN` for the endpoint. If unset, the endpoint will behave as before; if set, the token is enforced. This keeps compatibility for projects that don't set the secret, while enabling immediate protection when the secret is configured.

---

## ✅ Done

- [x] Repro steps included
- [x] Suggested remediation provided
- [x] Unit tests added to verify unauthenticated access is rejected when token is set

