# 🐛 Bug Report

## 📌 Report Title

**Race condition in in-memory rate limiter may allow extra requests under concurrency**

---

## 📋 Description

The in-memory rate limiter (`lib/rate-limit.ts`) previously incremented counters in a non-serialized way which could allow multiple concurrent requests to read the same count before any writes occur, permitting more requests than the configured limit. This is especially relevant when `checkRateLimit` is called concurrently for the same identifier.

---

## 🔄 Steps to Reproduce

1. Use the in-memory limiter (default mode) and configure a low limit (e.g., maxRequests=3).
2. Fire multiple requests in parallel (e.g., 10 concurrent requests) against an endpoint using the same identifier (IP or user ID).
3. Observe that more than the allowed number of requests may succeed if increments were not serialized.

Example test (simulating concurrency):
```ts
const key = `test:${Date.now()}`;
const config = { maxRequests: 3, windowMs: 60 * 1000 };
const results = await Promise.all(Array.from({ length: 10 }).map(() => checkRateLimit(key, config)));
const successes = results.filter(r => r.success).length;
// successes may be > 3 if race condition exists
```

---

## ✅ Expected Behavior

At most `maxRequests` concurrent requests should succeed; subsequent concurrent requests should be rate-limited.

---

## 🚫 Actual Behavior

Concurrent operations could read the same counter and increment independently, allowing more requests than intended.

---

## 💻 Proof / Code Excerpt

Previous implementation:
```ts
const entry = rateLimitStore.get(identifier);
// ...
const newCount = entry.count + 1;
rateLimitStore.set(identifier, { count: newCount, resetTime: entry.resetTime });
```
This read-increment-write sequence is vulnerable if parallel calls interleave.

Fix implemented: serializing operations per identifier using a small promise queue to ensure increments are applied atomically in the same process.

---

## 🛠 Suggested Fix

Serialize operations per identifier (implemented here using a Map of promise gates) or use a centralized atomic store (Redis) for production.

---

## ✨ Checklist

- [x] Repro steps provided
- [x] Suggested remediation provided
- [x] Unit test added verifying concurrent behavior

