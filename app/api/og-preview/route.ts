import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import dns from 'node:dns/promises';
import net from 'node:net';

const BLOCKED_HOSTNAMES = new Set(['localhost']);

function isPrivateIp(ip: string): boolean {
  if (net.isIP(ip) === 4) {
    const parts = ip.split('.').map(Number);
    if (parts[0] === 10) return true;
    if (parts[0] === 127) return true;
    if (parts[0] === 169 && parts[1] === 254) return true;
    if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;
    if (parts[0] === 192 && parts[1] === 168) return true;
    if (parts[0] === 0) return true;
    return false;
  }
  // Block IPv6 loopback and unique local addresses
  return ip === '::1' || ip.startsWith('fc') || ip.startsWith('fd') || ip.startsWith('fe80');
}

async function isSafeHost(hostname: string): Promise<boolean> {
  if (BLOCKED_HOSTNAMES.has(hostname.toLowerCase())) return false;
  if (net.isIP(hostname)) return !isPrivateIp(hostname);

  try {
    const records = await dns.lookup(hostname, { all: true });
    return records.every((r) => !isPrivateIp(r.address));
  } catch {
    return false;
  }
}

function extractMeta(html: string, property: string): string | null {
  const ogRegex = new RegExp(
    `<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']*)["']`,
    'i'
  );
  const ogMatch = html.match(ogRegex);
  if (ogMatch) return ogMatch[1];

  const reversedRegex = new RegExp(
    `<meta[^>]+content=["']([^"']*)["'][^>]+property=["']${property}["']`,
    'i'
  );
  const reversedMatch = html.match(reversedRegex);
  return reversedMatch ? reversedMatch[1] : null;
}

function extractTitleTag(html: string): string | null {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return match ? match[1].trim() : null;
}

export async function GET(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(targetUrl);
  } catch {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return NextResponse.json({ error: 'Only http/https URLs are supported' }, { status: 400 });
  }

  if (!(await isSafeHost(parsed.hostname))) {
    return NextResponse.json({ error: 'URL host is not allowed' }, { status: 400 });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(parsed.toString(), {
      signal: controller.signal,
      headers: { 'User-Agent': 'DevPocketBot/1.0 (+resource-preview)' },
    });
    clearTimeout(timeout);

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch URL' }, { status: 502 });
    }

    const html = await res.text();

    const title = extractMeta(html, 'og:title') || extractTitleTag(html);
    const description = extractMeta(html, 'og:description') || extractMeta(html, 'description');

    return NextResponse.json({ title, description });
  } catch (error) {
    console.error('Error fetching OG preview:', error);
    return NextResponse.json({ error: 'Failed to fetch preview' }, { status: 500 });
  }
}
