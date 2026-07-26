jest.mock('@/lib/prisma', () => ({
  prisma: {
    resource: {
      findMany: jest.fn(),
    },
    digestSubscription: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      upsert: jest.fn(),
      update: jest.fn(),
    },
  },
}));

import { prisma } from '@/lib/prisma';
import { buildDigestContent, renderDigestEmail, DIGEST_SECTIONS, DIGEST_FREQUENCIES } from '@/lib/digest';

describe('digest content builder', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('exposes the expected section and frequency options', () => {
    expect(DIGEST_SECTIONS).toEqual(['new_resources', 'top_picks', 'community_highlights']);
    expect(DIGEST_FREQUENCIES).toEqual(['weekly', 'biweekly']);
  });

  it('only fetches sections that were requested', async () => {
    (prisma.resource.findMany as jest.Mock).mockResolvedValue([]);

    await buildDigestContent(['new_resources'], 'weekly', null);

    expect(prisma.resource.findMany).toHaveBeenCalledTimes(1);
  });

  it('fetches all three sections when all are requested', async () => {
    (prisma.resource.findMany as jest.Mock).mockResolvedValue([]);

    await buildDigestContent(['new_resources', 'top_picks', 'community_highlights'], 'weekly', null);

    expect(prisma.resource.findMany).toHaveBeenCalledTimes(3);
  });

  it('applies the difficulty filter to each section query', async () => {
    (prisma.resource.findMany as jest.Mock).mockResolvedValue([]);

    await buildDigestContent(['new_resources'], 'weekly', 'beginner');

    const call = (prisma.resource.findMany as jest.Mock).mock.calls[0][0];
    expect(call.where.difficulty).toBe('beginner');
  });

  it('renders only sections with content', () => {
    const html = renderDigestEmail(
      {
        periodStart: new Date().toISOString(),
        periodEnd: new Date().toISOString(),
        newResources: [{ id: '1', title: 'Test', url: 'https://example.com', category: 'article', difficulty: 'beginner' }],
        topPicks: [],
        communityHighlights: [],
      },
      'https://example.com/unsubscribe?token=abc'
    );

    expect(html).toContain('New This Week');
    expect(html).not.toContain('Top Picks');
    expect(html).toContain('unsubscribe?token=abc');
  });
});
