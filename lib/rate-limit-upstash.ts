import type { RateLimitConfig, RateLimitResult } from './rate-limit';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import type { NextRequest } from 'next/server';
import validateEnv from './env';

type RedisClient = InstanceType<typeof Redis>;
type UpstashLimiter = InstanceType<typeof Ratelimit>;

const MAX_CACHED_POLICIES = 50;

let redisClient: RedisClient | undefined;
const limiterCache = new Map<string, UpstashLimiter>();

if (process.env.NODE_ENV !== 'test') validateEnv();

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

  if (!redisClient) {
    redisClient = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  }

  const windowSeconds = Math.max(1, Math.ceil(config.windowMs / 1000));
  const policyKey = `${config.maxRequests}:${config.windowMs}:${windowSeconds}`;
  let limiter = limiterCache.get(policyKey);

  if (!limiter) {
    limiter = new Ratelimit({
      redis: redisClient,
      limiter: Ratelimit.slidingWindow(config.maxRequests, `${windowSeconds} s`),
    });

    if (limiterCache.size >= MAX_CACHED_POLICIES) {
      const oldestKey = limiterCache.keys().next().value;
      if (oldestKey) limiterCache.delete(oldestKey);
    }

    limiterCache.set(policyKey, limiter);
  }

  const res = await limiter.limit(identifier);

  return {
    success: res.success,
    remaining: res.remaining,
    reset: res.reset,
  };
}

export function __resetUpstashLimitCacheForTests(): void {
  redisClient = undefined;
  limiterCache.clear();
}
