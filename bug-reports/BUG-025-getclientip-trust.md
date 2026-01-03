# 🐛 Bug Report

## 📌 Report Title

**`getClientIP` trusts forwarded headers without a way to opt-in trusted proxies (risk of IP spoofing)**

---

## 📋 Description

The helper `getClientIP` in `lib/rate-limit.ts` reads `cf-connecting-ip`, `x-real-ip`, and `x-forwarded-for` headers and returns the first part of `x-forwarded-for` if present. In environments where requests arrive from untrusted clients (or misconfigured proxies), the `x-forwarded-for` header can be spoofed by the client and lead to incorrect IP identification, enabling attackers to bypass per-IP rate limits.

---

## 🔄 Steps to Reproduce

1. Call an API endpoint that uses `getClientIP` and rate limiting with a request containing `x-forwarded-for: attacker-ip`.
2. Observe that the server treats the `attacker-ip` as the client IP and applies rate limiting based on that value.
3. An attacker can craft many requests with arbitrary `x-forwarded-for` values and cycle through them to evade per-IP rate limits.

---

## ✅ Expected Behavior

- By default, only platform-provided headers (like `cf-connecting-ip`) should be trusted. `x-forwarded-for` should be accepted only when the environment is known to be behind trusted proxies (and the configuration explicitly enables it).
- Provide a clear way to opt into trusting `x-forwarded-for` (e.g., an environment variable or config flag like `TRUST_PROXY_HEADERS=true`).

---

## 🚫 Actual Behavior

`getClientIP` always returns the first part of `x-forwarded-for` when present, without a way to opt-out or require a trusted proxy configuration.

---

## 🛠 Suggested Fix

- Add an environment/config flag (e.g., `TRUST_PROXY_HEADERS`) that enables using `x-forwarded-for` and `x-real-ip`. Default should be `false`.
- Prefer platform-provided headers (`cf-connecting-ip`) or direct socket IPs when the flag is not set.
- Document that trusting proxy headers should only be enabled when the app is behind a trusted reverse proxy (e.g., Vercel, Cloudflare, Load Balancer).

---

## ✅ Done

- [x] Reproduction steps included
- [x] Suggested remediation provided
- [x] Unit tests added to verify behavior

