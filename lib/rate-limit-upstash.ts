/**
 * Upstash-backed rate limiter adapter (scaffold)
 *
 * Notes:
 * - This module is intentionally dynamic-imported to avoid forcing the dependency on devs
 *   who only want the in-memory implementation.
 * - To enable, set RATE_LIMIT_MODE=UPSTASH and provide UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.
 * - This is a scaffold: install `@upstash/ratelimit` and `@upstash/redis` and run tests / CI.
 */

import type { RateLimitConfig, RateLimitResult } from './rate-limit';

export async function upstashLimit(identifier: string, config: RateLimitConfig): Promise<RateLimitResult> {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    throw new Error('Upstash not configured. Please set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.');
  }

  // Dynamic import so the package is optional
  const { Redis } = await import('@upstash/redis');
  const { Ratelimit } = await import('@upstash/ratelimit');

  const redis = new Redis({ url: process.env.UPSTASH_REDIS_REST_URL!, token: process.env.UPSTASH_REDIS_REST_TOKEN! });
  const rt = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(config.maxRequests, `${Math.ceil(config.windowMs / 1000)} s`),
  });

  // Use Upstash's rate limiter
  const res = await rt.limit(identifier);

  // Upstash returns properties like `success`, `limit`, `remaining`, and `resetAfter` (ms)
  const success = !!res.success;
  const remaining = typeof res.remaining === 'number' ? res.remaining : (typeof res.limit === 'number' && typeof res.count === 'number' ? Math.max(0, (res.limit - res.count)) : 0);
  const reset = Date.now() + (typeof res.resetAfter === 'number' ? res.resetAfter : 0);

  return {
    success,
    remaining,
    reset,
  };
}
