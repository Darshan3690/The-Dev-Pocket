import { prisma } from '@/lib/prisma';

export const DIGEST_SECTIONS = ['new_resources', 'top_picks', 'community_highlights'] as const;
export type DigestSection = (typeof DIGEST_SECTIONS)[number];

export const DIGEST_FREQUENCIES = ['weekly', 'biweekly'] as const;
export type DigestFrequency = (typeof DIGEST_FREQUENCIES)[number];

const FREQUENCY_TO_DAYS: Record<DigestFrequency, number> = {
  weekly: 7,
  biweekly: 14,
};

export interface DigestContent {
  periodStart: string;
  periodEnd: string;
  newResources: Array<{ id: string; title: string; url: string; category: string; difficulty: string | null }>;
  topPicks: Array<{ id: string; title: string; url: string; rating: number | null }>;
  communityHighlights: Array<{ id: string; title: string; url: string; author: string | null }>;
}

// Builds digest content from the resource catalog. "top_picks" and
// "community_highlights" are adapted to the resources already available in
// this codebase (issue #397/#398's Snippet and ResourceSubmission models
// are not yet merged into main) rather than left unimplemented.
export async function buildDigestContent(
  sections: DigestSection[],
  frequency: DigestFrequency,
  difficultyFilter: string | null
): Promise<DigestContent> {
  const days = FREQUENCY_TO_DAYS[frequency];
  const periodEnd = new Date();
  const periodStart = new Date(periodEnd.getTime() - days * 24 * 60 * 60 * 1000);

  const difficultyWhere = difficultyFilter ? { difficulty: difficultyFilter } : {};

  const content: DigestContent = {
    periodStart: periodStart.toISOString(),
    periodEnd: periodEnd.toISOString(),
    newResources: [],
    topPicks: [],
    communityHighlights: [],
  };

  if (sections.includes('new_resources')) {
    const resources = await prisma.resource.findMany({
      where: { createdAt: { gte: periodStart }, ...difficultyWhere },
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: { id: true, title: true, url: true, category: true, difficulty: true },
    });
    content.newResources = resources;
  }

  if (sections.includes('top_picks')) {
    const resources = await prisma.resource.findMany({
      where: { rating: { not: null }, ...difficultyWhere },
      orderBy: { rating: 'desc' },
      take: 5,
      select: { id: true, title: true, url: true, rating: true },
    });
    content.topPicks = resources;
  }

  if (sections.includes('community_highlights')) {
    const resources = await prisma.resource.findMany({
      where: { author: { not: null }, createdAt: { gte: periodStart }, ...difficultyWhere },
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: { id: true, title: true, url: true, author: true },
    });
    content.communityHighlights = resources;
  }

  return content;
}

export function renderDigestEmail(content: DigestContent, unsubscribeUrl: string): string {
  const section = (title: string, rows: string[]) =>
    rows.length ? `<h2>${title}</h2><ul>${rows.join('')}</ul>` : '';

  const newResourcesHtml = section(
    'New This Week',
    content.newResources.map((r) => `<li><a href="${r.url}">${r.title}</a> (${r.difficulty ?? 'any level'}, ${r.category})</li>`)
  );

  const topPicksHtml = section(
    'Top Picks',
    content.topPicks.map((r) => `<li><a href="${r.url}">${r.title}</a> — rated ${r.rating?.toFixed(1)}</li>`)
  );

  const communityHtml = section(
    'Community Highlights',
    content.communityHighlights.map((r) => `<li><a href="${r.url}">${r.title}</a> by ${r.author}</li>`)
  );

  return `
    <div>
      <h1>Your Dev Pocket Digest</h1>
      ${newResourcesHtml}
      ${topPicksHtml}
      ${communityHtml}
      <p><a href="${unsubscribeUrl}">Unsubscribe</a></p>
    </div>
  `.trim();
}
