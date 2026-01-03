# 🐛 Bug Report

## 📌 Report Title

**Missing database indexes on frequently queried fields — causes slow queries and high load**

---

## 📋 Description

Some frequently executed queries lack appropriate database indexes. This leads to slower queries, higher CPU usage, and increased load on the database, particularly for endpoints that list or filter records (e.g., `newsletter/stats`, contact submission queries). Adding targeted indexes (including composite indexes for common filter/sort combinations) will improve performance and reduce production load.

---

## 🔄 Steps to Reproduce

1. Deploy the app and seed the database with realistic volume (10k+ subscribers and contact submissions).
2. Query endpoints that fetch recent subscribers or contact submissions (e.g., `GET /api/newsletter/stats`, or list recent subscribers in admin UI).
3. Observe slow queries or high CPU on the DB when queries scan tables without indexes.

Sample slow query (from logs or explain analyze):
```sql
SELECT "id", "email", "name", "subscribedAt" FROM "NewsletterSubscriber" WHERE "status" = 'active' ORDER BY "subscribedAt" DESC LIMIT 10;
-- Without an index on status + subscribedAt this requires a sequential scan.
```

---

## ✅ Expected Behavior

Add composite indexes to optimize these queries. Recommended indexes:

- NewsletterSubscriber
  - @@index([status, subscribedAt])
  - @@index([status, email]) // optional to speed lookups by status+email

- ContactSubmission
  - @@index([status, createdAt])
  - @@index([email, createdAt]) // optional for lookups by email

These indexes reduce query scan size and improve ordering performance.

---

## 🚫 Actual Behavior

No composite indexes exist for the common query patterns, causing full-table scans or expensive sorts in the database.

---

## 🛠 Suggested Fix

1. Update `prisma/schema.prisma` to add the recommended @@index() annotations.
2. Create a Prisma migration: `npx prisma migrate dev --name add-db-indexes` (run locally and in CI environments where DB access is available).
3. Add a static test that asserts index annotations exist in `prisma/schema.prisma` (useful for repo-level validation) and an optional integration test that runs only when a real DB is available.
4. Document the changes and the expected performance improvements in this report.

**Example Prisma schema additions:**
```prisma
model NewsletterSubscriber {
  id           String   @id @default(uuid())
  email        String   @unique
  status       String
  subscribedAt DateTime

  @@index([status, subscribedAt])
  @@index([status, email])
}

model ContactSubmission {
  id        String   @id @default(uuid())
  email     String
  status    String
  createdAt DateTime @default(now())

  @@index([status, createdAt])
  @@index([email, createdAt])
}
```

---

## ✅ Checklist

- [x] Repro steps included
- [x] Recommended indexes provided
- [x] Migration and testing plan included

---

**Severity:** 🟠 High — Performance & stability impact under load

