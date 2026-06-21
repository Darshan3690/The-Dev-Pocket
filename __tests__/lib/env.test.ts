import validateEnv from '../../lib/env';

describe('env validation', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  test('throws when CSRF enabled but token missing', () => {
    process.env.CSRF_PROTECTION = 'true';
    delete process.env.CSRF_PROTECTION_TOKEN;

    expect(() => validateEnv()).toThrow(/CSRF_PROTECTION_TOKEN/);
  });

  test('throws when RATE_LIMIT_MODE=UPSTASH but Upstash creds missing', () => {
    process.env.RATE_LIMIT_MODE = 'UPSTASH';
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;

    expect(() => validateEnv()).toThrow(/UPSTASH_REDIS_REST_URL/);
  });

  test('requires DATABASE_URL and CLERK_SECRET_KEY in production', () => {
    Object.assign(process.env, { NODE_ENV: 'production' });
    delete process.env.DATABASE_URL;
    delete process.env.CLERK_SECRET_KEY;

    try {
      validateEnv();
      fail('validateEnv should throw when DATABASE_URL and CLERK_SECRET_KEY are missing in production');
    } catch (error) {
      const message = String(error);
      expect(message).toMatch(/DATABASE_URL/);
      expect(message).toMatch(/CLERK_SECRET_KEY/);
    }
  });

  test('allows GitHub Actions production builds without runtime secrets', () => {
    Object.assign(process.env, {
      NODE_ENV: 'production',
      CI: 'true',
      GITHUB_ACTIONS: 'true',
    });
    delete process.env.DATABASE_URL;
    delete process.env.CLERK_SECRET_KEY;

    expect(() => validateEnv()).not.toThrow();
  });

  test('returns typed env when everything is provided', () => {
    Object.assign(process.env, { NODE_ENV: 'production' });
    process.env.DATABASE_URL = 'postgresql://user:pass@localhost/testdb';
    process.env.CLERK_SECRET_KEY = 'secret';
    process.env.RATE_LIMIT_MODE = 'INMEM';
    process.env.CSRF_PROTECTION = 'false';

    const parsed = validateEnv();

    expect(parsed.NODE_ENV).toBe('production');
    expect(parsed.DATABASE_URL).toBeDefined();
    expect(parsed.CSRF_PROTECTION).toBe(false);
  });
});
