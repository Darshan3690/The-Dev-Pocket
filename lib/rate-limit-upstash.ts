import type { RateLimitConfig, RateLimitResult } from './rate-limit';
import { Redis } from '@upstash/redis';
import type { Ratelimit as RatelimitClient } from '@upstash/ratelimit';
import { Ratelimit } from '@upstash/ratelimit';

let cached: { client?: any; limiter?: any } = {};

export async function upstashLimit(identifier: string, config: RateLimitConfig): Promise<RateLimitResult> {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    throw new Error('Missing Upstash configuration');
  }

  if (!cached.limiter) {
    const client = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });

    const limiter = new Ratelimit({
      redis: client,
      // sliding window expects a string like "60s"; convert from ms
      slidingWindow: Math.max(1, Math.floor(config.windowMs / 1000)) + 's',
      limit: config.maxRequests,
    } as any) as unknown as RatelimitClient;

    cached = { client, limiter };
  }

  const res = await cached.limiter.limit(identifier);

  // map upstash result to RateLimitResult
  const now = Date.now();
  const resetAfter = (res.resetAfter && typeof res.resetAfter === 'number') ? res.resetAfter : 0;

  return {
    success: !!res.success,
    remaining: typeof res.remaining === 'number' ? res.remaining : 0,
    reset: now + resetAfter,
  };
}
