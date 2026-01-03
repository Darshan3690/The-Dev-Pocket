# 🐛 Bug Report

## 📌 Report Title

**No Rate Limiting on API Routes - Vulnerable to Abuse and DoS Attacks**

---

## 📋 Description

All API endpoints (`/api/contact`, `/api/newsletter`, `/api/user-stats`) have zero rate limiting implemented. This allows unlimited requests from a single source, making the application vulnerable to:
- Denial of Service (DoS) attacks
- Spam submissions
- Database overload
- Resource exhaustion
- API abuse

A malicious actor could send thousands of requests per second, overwhelming the database and causing service outages for legitimate users.

---

## 🔄 Steps to Reproduce

**Steps to reproduce the behavior:**

1. Create a simple script to spam API endpoints:
```javascript
// spam-test.js
for (let i = 0; i < 10000; i++) {
  fetch('https://the-dev-pocket.com/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: `Spam ${i}`,
      email: `spam${i}@test.com`,
      message: 'Automated spam message'
    })
  });
}
```

2. Run the script
3. Observe all 10,000 requests succeed
4. Database fills with spam entries
5. Legitimate users may experience slowdowns or errors

---

## ✅ Expected Behavior

API routes should implement rate limiting to prevent abuse:

**Example implementation using Vercel Rate Limiting:**
```typescript
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "1 h"), // 10 requests per hour
});

export async function POST(request: NextRequest) {
  // Get client IP
  const ip = request.ip ?? "127.0.0.1";
  
  // Check rate limit
  const { success } = await ratelimit.limit(ip);
  
  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }
  
  // ... rest of handler
}
```

**Expected limits:**
- Contact form: 5 submissions per hour per IP
- Newsletter: 3 subscriptions per hour per IP
- User stats: 60 requests per minute per user

---

## 🚫 Actual Behavior

Currently, all API routes have ZERO rate limiting:

**app/api/contact/route.ts:**
```typescript
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // ❌ No rate limit check
    // ... process request without any limits
  }
}
```

**app/api/newsletter/route.ts:**
```typescript
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // ❌ No rate limit check
    // ... process request without any limits
  }
}
```

**app/api/user-stats/route.ts:**
```typescript
export async function GET() {
  try {
    // ❌ No rate limit check
    // ... process request without any limits
  }
}
```

**Result:**
- Unlimited API requests possible
- Database spam
- Potential DoS attacks
- No protection against abuse

---

## 📸 Screenshots / Logs

**Attack scenario:**
```bash
# Attacker runs automated script
$ node spam-api.js

Sending request 1...
Sending request 2...
Sending request 3...
...
Sending request 10000...

✓ All 10000 requests succeeded
✓ Database now has 10000 spam entries
✓ Legitimate users experiencing slowdowns
```

**Database impact:**
- Thousands of spam entries
- Database bloat
- Slower queries
- Increased hosting costs

---

## 💻 Environment

| Item | Value |
|------|-------|
| **OS** | Any (Server-side issue) |
| **Browser** | N/A |
| **Node.js version** | 20.11.1 |
| **The Dev Pocket version** | Current main branch |
| **Severity** | 🟠 High - Security & Availability Risk |
| **Attack Vector** | Network - Remote |
| **CVSS Score** | 6.5 (Medium-High) |

---

## 📝 Additional Context

- **Frequency:** Always exploitable
- **Impact:** 
  - Service disruption
  - Database spam
  - Increased costs
  - Poor user experience for legitimate users
  
- **Affected endpoints:**
  - `/api/contact` - Most vulnerable (database writes)
  - `/api/newsletter` - Vulnerable to spam subscriptions
  - `/api/user-stats` - Can be abused to overload database

**Real-world examples:**
- Competitor sends 100k contact form submissions
- Attacker spams newsletter with fake emails
- Bot continuously queries user stats endpoint

**Recommended rate limits:**

| Endpoint | Limit | Window | Identifier |
|----------|-------|---------|------------|
| `/api/contact` | 5 requests | 1 hour | IP address |
| `/api/newsletter` POST | 3 requests | 1 hour | IP address |
| `/api/newsletter` DELETE | 5 requests | 1 hour | IP address |
| `/api/user-stats` | 60 requests | 1 minute | User ID |

**Implementation options:**
1. **Vercel/Next.js Middleware** (Recommended)
   - Use `@upstash/ratelimit` with Redis
   - Integrates seamlessly with Vercel
   
2. **Custom middleware**
   - Use in-memory store (not recommended for production)
   - Implement sliding window algorithm
   
3. **Third-party services**
   - Cloudflare Rate Limiting
   - AWS WAF
   - Upstash Redis

**Additional security measures:**
- CAPTCHA on contact form after failed attempts
- Email verification for newsletter
- Honeypot fields to catch bots
- Request signature validation

---

## ✨ Checklist

- [x] I have searched for existing issues and this is not a duplicate
- [x] I have provided clear, reproducible steps
- [x] I have included relevant environment information
- [x] I have attached screenshots/logs if applicable
- [x] I am using the latest version of The Dev Pocket

---

🙏 **URGENT:** This is a high-priority security issue that could lead to service outages and abuse. Recommend implementing rate limiting before production deployment.
