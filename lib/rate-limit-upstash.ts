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
    // Use sliding window with maxRequests per windowMs
    limiter: Ratelimit.slidingWindow(config.maxRequests, `${config.windowMs} ms`),
  });

  // Upstash's limit API returns different fields depending on configuration; adapt as needed.
  const res = await rt.limit(identifier);

  // Fallback mapping
  const success = !!res.success;
  const remaining = typeof res.remaining === 'number' ? res.remaining : (res.limit ? res.limit - (res.count ?? 0) : 0);
  const reset = Date.now() + (res.resetAfter ?? 0);

  return {
    success,
    remaining,
    reset,
  };
}
