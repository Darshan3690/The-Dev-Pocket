/**
 * Simple in-memory rate limiter
 * For production, consider using @upstash/ratelimit with Redis
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// NOTE: Avoid background intervals in serverless environments (module scope).
// Instead, expired entries are handled lazily inside `checkRateLimit` to prevent
// memory leaks when functions are short-lived or run in multiple instances.
// For production use, prefer a Redis-backed rate limiter (e.g., Upstash) with TTLs.

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  reset: number;
}

/**
 * Check if a request should be rate limited
 * @param identifier - Unique identifier (IP address, user ID, etc.)
 * @param config - Rate limit configuration
 * @returns Rate limit result
 */
// Per-identifier promise queue to serialize in-memory updates and avoid lost increments
const rateLimitLocks = new Map<string, Promise<void>>();
let lastCleanup = 0;

export async function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  // Allow selecting a different backend via environment variable (INMEM or UPSTASH)
  const mode = (process.env.RATE_LIMIT_MODE || 'INMEM').toUpperCase();

  if (mode === 'UPSTASH') {
    // Delegate to Upstash adapter (dynamic import)
    try {
      const { upstashLimit } = await import('./rate-limit-upstash');
      return await upstashLimit(identifier, config);
    } catch (err) {
      // In production, fail fast and do not silently fall back to the in-memory limiter
      if (process.env.NODE_ENV === 'production') {
        console.error('Upstash rate limiter failed in production:', err);
        throw err;
      }

      console.warn('Upstash rate limiter failed or not installed; falling back to in-memory limiter for development.', err);
      // Fall back to in-memory behavior for non-production
    }
  }

  // Serialize operations for the same identifier to avoid race conditions
  const prev = rateLimitLocks.get(identifier) || Promise.resolve();
  let release: () => void;
  const gate = new Promise<void>(res => (release = res));
  // Store the holder promise so we can compare it later for cleanup
  const holder = prev.then(() => gate);
  rateLimitLocks.set(identifier, holder);

  try {
    await prev;

    const now = Date.now();

    // Periodic lazy cleanup to avoid unbounded Map growth (run every 5 minutes)
    if (now - lastCleanup > 5 * 60 * 1000) {
      lastCleanup = now;
      for (const [key, entry] of rateLimitStore.entries()) {
        if (now > entry.resetTime) rateLimitStore.delete(key);
      }
    }

    const entry = rateLimitStore.get(identifier);

    // No existing entry or expired entry
    if (!entry || now > entry.resetTime) {
      rateLimitStore.set(identifier, {
        count: 1,
        resetTime: now + config.windowMs,
      });

      return {
        success: true,
        remaining: config.maxRequests - 1,
        reset: now + config.windowMs,
      };
    }

    // Check if limit exceeded
    if (entry.count >= config.maxRequests) {
      return {
        success: false,
        remaining: 0,
        reset: entry.resetTime,
      };
    }

    // Increment counter
    const newCount = entry.count + 1;
    rateLimitStore.set(identifier, { count: newCount, resetTime: entry.resetTime });

    return {
      success: true,
      remaining: config.maxRequests - newCount,
      reset: entry.resetTime,
    };
  } finally {
    // Release the gate for next waiter
    release!();
    // Clean up lock if it points to the holder we set earlier
    if (rateLimitLocks.get(identifier) === holder) {
      rateLimitLocks.delete(identifier);
    }
  }
}

// Test helper to reset in-memory state (used in unit tests)
export function __testResetRateLimit() {
  rateLimitStore.clear();
  rateLimitLocks.clear();
  lastCleanup = 0;
}

/**
 * Get client IP address from request
 *
 * Note: In production behind proxies (Vercel, Cloudflare, etc.) headers like
 * `cf-connecting-ip`, `x-real-ip`, or `x-forwarded-for` are provided by trusted
 * proxies. Accepting values from these headers assumes the platform terminates
 * TLS and sets these headers. Do not trust arbitrary `x-forwarded-for` values
 * from untrusted sources.
 */
export function getClientIP(request: Request): string {
  // Prefer platform-specific headers when available
  const cfIp = request.headers.get('cf-connecting-ip');
  if (cfIp) return cfIp;

  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp;

  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    // x-forwarded-for can contain a list: client, proxy1, proxy2
    const parts = forwarded.split(',').map(p => p.trim()).filter(Boolean);
    if (parts.length > 0) return parts[0];
  }

  // Fallback to localhost as a safe default for local dev
  return '127.0.0.1';
}
