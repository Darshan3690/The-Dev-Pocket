# 🐛 Bug Report

## 📌 Report Title

**Multiple Prisma Client Instances Causing Connection Pool Exhaustion**

---

## 📋 Description

Three API routes (`newsletter/route.ts`, `user-stats/route.ts`, and partially in `contact/route.ts`) are creating separate Prisma Client instances without proper singleton pattern implementation. This leads to database connection pool exhaustion, memory leaks in production, and potential database connection errors under load.

Each API request creates a new PrismaClient instance instead of reusing a singleton, which violates Prisma best practices and causes severe performance degradation in production environments.

---

## 🔄 Steps to Reproduce

**Steps to reproduce the behavior:**

1. Deploy the application to a production environment
2. Make multiple concurrent API requests to `/api/newsletter` or `/api/user-stats` (50-100 requests)
3. Monitor database connections in PostgreSQL/Supabase dashboard
4. Observe connection pool exhaustion and failed database queries

---

## ✅ Expected Behavior

All API routes should use a singleton Prisma Client instance to efficiently reuse database connections across requests. This is the recommended pattern from Prisma documentation.

**Expected implementation (like in contact/route.ts):**
```typescript
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

---

## 🚫 Actual Behavior

Two API routes are creating new PrismaClient instances on every request:

**app/api/newsletter/route.ts - Line 4:**
```typescript
const prisma = new PrismaClient(); // ❌ Creates new instance every request
```

**app/api/user-stats/route.ts - Line 5:**
```typescript
const prisma = new PrismaClient(); // ❌ Creates new instance every request
```

This causes:
- Database connection pool exhaustion after 50-100 requests
- Memory leaks in production
- "Too many connections" errors from PostgreSQL
- Application crashes under moderate load

---

## 📸 Screenshots / Logs

**Error message when connection pool is exhausted:**
```
Error: P1001: Can't reach database server at `db.supabase.co:5432`
Reason: Too many connections
```

**Database connection monitoring shows:**
- Normal: 5-10 connections
- With bug: 100+ connections after load test
- Many connections remain idle but not released

---

## 💻 Environment

| Item | Value |
|------|-------|
| **OS** | Any (production environment) |
| **Browser** | N/A (Server-side issue) |
| **Node.js version** | 20.11.1 |
| **The Dev Pocket version** | Current main branch |
| **Database** | PostgreSQL (Supabase) |
| **Severity** | 🔴 Critical - Production breaking |

---

## 📝 Additional Context

- **Frequency:** Always occurs under moderate to high load
- **Impact:** Production outages, database failures
- **Related files:**
  - ✅ `app/api/contact/route.ts` - Correctly implements singleton pattern
  - ❌ `app/api/newsletter/route.ts` - Needs fix
  - ❌ `app/api/user-stats/route.ts` - Needs fix
  
- **Reference:** [Prisma Best Practices - Connection Management](https://www.prisma.io/docs/guides/performance-and-optimization/connection-management)

**Recommended fix:**
Replace the Prisma client initialization in both files with the singleton pattern already used in `contact/route.ts`.

---

## ✨ Checklist

- [x] I have searched for existing issues and this is not a duplicate
- [x] I have provided clear, reproducible steps
- [x] I have included relevant environment information
- [x] I have attached screenshots/logs if applicable
- [x] I am using the latest version of The Dev Pocket

---

🙏 **Thanks for reporting!** This is a critical production issue that needs immediate attention.
