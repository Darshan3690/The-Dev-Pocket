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
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  const now = Date.now();
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

  // Increment counter (in-memory store is best-effort and is not atomic across
  // concurrent requests in multi-process deployments). For robust guarantees,
  // use a centralized store with atomic commands (Redis).
  const newCount = entry.count + 1;
  rateLimitStore.set(identifier, { count: newCount, resetTime: entry.resetTime });

  return {
    success: true,
    remaining: config.maxRequests - newCount,
    reset: entry.resetTime,
  };
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
