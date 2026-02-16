import type { RateLimitConfig, RateLimitResult } from './rate-limit';
import { Redis } from '@upstash/redis';
import type { Ratelimit as RatelimitClient } from '@upstash/ratelimit';
import { Ratelimit } from '@upstash/ratelimit';
import type { NextRequest } from 'next/server';

let cached: { client?: any; limiter?: any } = {};

/**
 * Extracts the client IP address from a Next.js request
 * Checks various headers that may contain the real client IP when behind proxies
 */
export function getClientIP(request: NextRequest): string {
  // Check for forwarded headers (common in production with load balancers/proxies)
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, get the first one (client IP)
    return forwarded.split(',')[0].trim();
  }

  // Check for real IP header (used by some proxies like Nginx)
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP.trim();
  }

  // Check for Vercel-specific header
  const vercelIP = request.headers.get('x-vercel-forwarded-for');
  if (vercelIP) {
    return vercelIP.split(',')[0].trim();
  }

  // Fallback to a default identifier if no IP can be determined
  return 'unknown-ip';
}

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
