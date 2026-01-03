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

// Lazily initialized, shared Redis client and ratelimit instances
let redisClientPromise: Promise<any> | null = null;
const ratelimitCache = new Map<string, any>();

async function getRedisClient() {
  if (!redisClientPromise) {
    const { Redis } = await import('@upstash/redis');
    redisClientPromise = Promise.resolve(new Redis({ url: process.env.UPSTASH_REDIS_REST_URL!, token: process.env.UPSTASH_REDIS_REST_TOKEN! }));
  }
  return redisClientPromise;
}

async function getRatelimit(config: RateLimitConfig) {
  const key = `${config.maxRequests}:${config.windowMs}`;
  const cached = ratelimitCache.get(key);
  if (cached) return cached;

  const redis = await getRedisClient();
  const { Ratelimit } = await import('@upstash/ratelimit');

  // Upstash expects time windows in a human-friendly format; use seconds
  const windowSeconds = Math.max(1, Math.ceil(config.windowMs / 1000));
  const rl = new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(config.maxRequests, `${windowSeconds} s`) });

  ratelimitCache.set(key, rl);
  return rl;
}

export async function upstashLimit(identifier: string, config: RateLimitConfig): Promise<RateLimitResult> {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    throw new Error('Upstash not configured. Please set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.');
  }

  try {
    const rt = await getRatelimit(config);
    const res = await rt.limit(identifier);

    // Compute reset timestamp robustly
    let reset: number;
    const absoluteReset = (res as any).reset;
    if (typeof absoluteReset === 'number') {
      reset = absoluteReset;
    } else if (typeof res.resetAfter === 'number') {
      reset = Date.now() + res.resetAfter;
    } else {
      reset = Date.now() + config.windowMs;
    }

    const success = !!res.success;
    const remaining = typeof res.remaining === 'number' ? res.remaining : (typeof res.limit === 'number' && typeof (res as any).count === 'number' ? Math.max(0, (res.limit - (res as any).count)) : 0);

    return { success, remaining, reset };
  } catch (err) {
    const baseMessage = 'Upstash rate limiter failed or not installed';

    // In production, fail fast and do not silently fall back to in-memory limiter
    if (process.env.NODE_ENV === 'production') {
      console.error(`${baseMessage} in production with RATE_LIMIT_MODE=UPSTASH.`, err);
      throw new Error(baseMessage);
    }

    // In non-production, log a warning and re-throw so callers can decide to fall back
    console.warn(`${baseMessage}; falling back to in-memory rate limiter for development.`, err);
    throw err;
  }
}
