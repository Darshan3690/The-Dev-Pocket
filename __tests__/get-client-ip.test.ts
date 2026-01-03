import { getClientIP } from '@/lib/rate-limit';

describe('getClientIP', () => {
  it('prefers cf-connecting-ip if present', () => {
    const req = new Request('https://example.com', { headers: { 'cf-connecting-ip': '203.0.113.5', 'x-forwarded-for': '1.2.3.4' } });
    expect(getClientIP(req)).toBe('203.0.113.5');
  });

  it('uses x-real-ip when cf header is missing and TRUST_PROXY_HEADERS=true', () => {
    const original = process.env.TRUST_PROXY_HEADERS;
    process.env.TRUST_PROXY_HEADERS = 'true';

    const req = new Request('https://example.com', { headers: { 'x-real-ip': '198.51.100.7' } });
    expect(getClientIP(req)).toBe('198.51.100.7');

    process.env.TRUST_PROXY_HEADERS = original;
  });

  it('returns first part of x-forwarded-for when present and TRUST_PROXY_HEADERS=true', () => {
    const original = process.env.TRUST_PROXY_HEADERS;
    process.env.TRUST_PROXY_HEADERS = 'true';

    const req = new Request('https://example.com', { headers: { 'x-forwarded-for': '1.2.3.4, 5.6.7.8' } });
    expect(getClientIP(req)).toBe('1.2.3.4');

    process.env.TRUST_PROXY_HEADERS = original;
  });

  it('ignores x-forwarded-for by default and falls back to localhost', () => {
    const original = process.env.TRUST_PROXY_HEADERS;
    delete process.env.TRUST_PROXY_HEADERS;

    const req = new Request('https://example.com', { headers: { 'x-forwarded-for': '1.2.3.4, 5.6.7.8' } });
    expect(getClientIP(req)).toBe('127.0.0.1');

    process.env.TRUST_PROXY_HEADERS = original;
  });

  it('falls back to 127.0.0.1 when no headers present', () => {
    const req = new Request('https://example.com');
    expect(getClientIP(req)).toBe('127.0.0.1');
  });
});
