type RateLimitMode = 'INMEM' | 'UPSTASH';

export type AppEnv = {
  NODE_ENV: string;
  DATABASE_URL?: string;
  RATE_LIMIT_MODE: RateLimitMode;
  UPSTASH_REDIS_REST_URL?: string;
  UPSTASH_REDIS_REST_TOKEN?: string;
  CSRF_PROTECTION: boolean;
  CSRF_PROTECTION_TOKEN?: string;
  SECURITY_HEADERS: boolean;
  CONTENT_SECURITY_POLICY?: string;
  CLERK_SECRET_KEY?: string;
};

function parseBool(v?: string | undefined): boolean {
  if (v === undefined) return false;
  return v.toLowerCase() === 'true';
}

/**
 * Validates environment variables used by the application and returns a typed object.
 * - Throws a descriptive Error when required variables are missing or inconsistent.
 * - In `production` the function is stricter (e.g., requires `DATABASE_URL`).
 */
export function validateEnv(opts?: { throwOnMissing?: boolean }): AppEnv {
  const throwOnMissing = opts?.throwOnMissing ?? true;
  const env = process.env;

  const rawRateLimitMode = (env.RATE_LIMIT_MODE || 'INMEM').toUpperCase();

  const parsed: AppEnv = {
    NODE_ENV: env.NODE_ENV ?? 'development',
    DATABASE_URL: env.DATABASE_URL,
    RATE_LIMIT_MODE: (rawRateLimitMode as RateLimitMode),
    UPSTASH_REDIS_REST_URL: env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: env.UPSTASH_REDIS_REST_TOKEN,
    CSRF_PROTECTION: parseBool(env.CSRF_PROTECTION),
    CSRF_PROTECTION_TOKEN: env.CSRF_PROTECTION_TOKEN,
    SECURITY_HEADERS: parseBool(env.SECURITY_HEADERS),
    CONTENT_SECURITY_POLICY: env.CONTENT_SECURITY_POLICY,
    CLERK_SECRET_KEY: env.CLERK_SECRET_KEY,
  };

  const errors: string[] = [];

  // Validate RATE_LIMIT_MODE explicitly to avoid unsafe casting
  if (!['INMEM', 'UPSTASH'].includes(rawRateLimitMode)) {
    errors.push(`RATE_LIMIT_MODE has invalid value: ${rawRateLimitMode}. Expected 'INMEM' or 'UPSTASH'.`);
  }

  // Production-only sanity checks
  if (parsed.NODE_ENV === 'production') {
    if (!parsed.DATABASE_URL) errors.push('DATABASE_URL is required in production.');
    if (!parsed.CLERK_SECRET_KEY) errors.push('CLERK_SECRET_KEY is required in production.');
  }

  // Mode-dependent checks
  if (parsed.RATE_LIMIT_MODE === 'UPSTASH') {
    if (!parsed.UPSTASH_REDIS_REST_URL) errors.push('UPSTASH_REDIS_REST_URL is required when RATE_LIMIT_MODE=UPSTASH.');
    if (!parsed.UPSTASH_REDIS_REST_TOKEN) errors.push('UPSTASH_REDIS_REST_TOKEN is required when RATE_LIMIT_MODE=UPSTASH.');
  }

  // CSRF protection token required when enabled
  if (parsed.CSRF_PROTECTION) {
    if (!parsed.CSRF_PROTECTION_TOKEN) errors.push('CSRF_PROTECTION_TOKEN is required when CSRF_PROTECTION is enabled.');
  }

  if (errors.length && throwOnMissing) {
    const message = `Invalid environment configuration:\n  - ${errors.join('\n  - ')}`;
    throw new Error(message);
  }

  return parsed;
}

export default validateEnv;
