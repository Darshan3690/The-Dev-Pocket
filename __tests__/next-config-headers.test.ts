import { generateSecurityHeaders } from '@/next.config';

describe('generateSecurityHeaders', () => {
  const original = { ...process.env };

  afterEach(() => {
    process.env = { ...original };
  });

  it('returns empty array when SECURITY_HEADERS not enabled', () => {
    delete process.env.SECURITY_HEADERS;
    const headers = generateSecurityHeaders();
    expect(Array.isArray(headers)).toBe(true);
    expect(headers.length).toBe(0);
  });

  it('returns default headers when enabled and default CSP present', () => {
    process.env.SECURITY_HEADERS = 'true';
    delete process.env.CONTENT_SECURITY_POLICY;

    const headers = generateSecurityHeaders();
    const keys = headers.map(h => h.key);
    expect(keys).toContain('Content-Security-Policy');
    expect(keys).toContain('Strict-Transport-Security');
    expect(keys).toContain('X-Frame-Options');
  });

  it('respects CONTENT_SECURITY_POLICY override', () => {
    process.env.SECURITY_HEADERS = 'true';
    process.env.CONTENT_SECURITY_POLICY = "default-src 'none'";

    const headers = generateSecurityHeaders();
    const csp = headers.find(h => h.key === 'Content-Security-Policy');
    expect(csp).toBeDefined();
    expect(csp!.value).toBe("default-src 'none'");
  });
});
