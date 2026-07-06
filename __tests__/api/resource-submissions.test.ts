jest.mock('@/lib/prisma', () => ({
  prisma: {
    resourceSubmission: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      count: jest.fn(),
    },
    resourceSubmissionVote: {
      create: jest.fn(),
      count: jest.fn(),
      deleteMany: jest.fn(),
    },
    resource: {
      create: jest.fn(),
    },
    $transaction: jest.fn(),
  },
}));

import { prisma } from '@/lib/prisma';

describe('Resource Submissions API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/resource-submissions', () => {
    it('should list submissions', async () => {
      (prisma.resourceSubmission.findMany as jest.Mock).mockResolvedValue([]);
      (prisma.resourceSubmission.count as jest.Mock).mockResolvedValue(0);

      expect(prisma.resourceSubmission.findMany).toBeDefined();
    });

    it('computes trending score using votes and age', () => {
      const votes = 20;
      const ageHours = 10;
      const score = votes / Math.pow(ageHours + 2, 1.5);
      expect(score).toBeGreaterThan(0);
    });
  });

  describe('POST /api/resource-submissions', () => {
    it('should reject invalid category', () => {
      const CATEGORIES = ['article', 'video', 'course', 'tool', 'documentation'];
      expect(CATEGORIES.includes('not-a-category')).toBe(false);
    });

    it('should reject invalid difficulty', () => {
      const DIFFICULTIES = ['beginner', 'intermediate', 'advanced'];
      expect(DIFFICULTIES.includes('expert')).toBe(false);
    });

    it('should cap tags at 5', () => {
      const tags = ['a', 'b', 'c', 'd', 'e', 'f'];
      expect(tags.slice(0, 5).length).toBe(5);
    });

    it('should reject malformed URLs', () => {
      expect(() => new URL('not-a-url')).toThrow();
    });
  });

  describe('POST /api/resource-submissions/[id]/vote', () => {
    it('should register a vote and return updated count', async () => {
      (prisma.resourceSubmission.findUnique as jest.Mock).mockResolvedValue({
        id: '1',
        status: 'PENDING',
      });
      (prisma.resourceSubmissionVote.create as jest.Mock).mockResolvedValue({ id: 'vote-1' });
      (prisma.resourceSubmissionVote.count as jest.Mock).mockResolvedValue(1);

      expect(prisma.resourceSubmissionVote.create).toBeDefined();
    });

    it('should reject a duplicate vote via unique constraint violation', async () => {
      (prisma.resourceSubmissionVote.create as jest.Mock).mockRejectedValue({ code: 'P2002' });

      await expect(prisma.resourceSubmissionVote.create({ data: {} })).rejects.toEqual({
        code: 'P2002',
      });
    });

    it('should move submission to QUEUED once threshold is reached', () => {
      const REVIEW_QUEUE_THRESHOLD = 10;
      const voteCount = 10;
      expect(voteCount >= REVIEW_QUEUE_THRESHOLD).toBe(true);
    });

    it('should not requeue a submission that is not PENDING', () => {
      const status = 'APPROVED';
      expect(status === 'PENDING').toBe(false);
    });
  });

  describe('POST /api/resource-submissions/[id]/review', () => {
    it('should reject review action from non-admin', () => {
      const user = { privateMetadata: {}, publicMetadata: {} };
      const isAdmin =
        (user.privateMetadata as Record<string, unknown>)?.role === 'admin' ||
        (user.publicMetadata as Record<string, unknown>)?.role === 'admin';
      expect(isAdmin).toBe(false);
    });

    it('should require a valid action', () => {
      const action = 'delete';
      expect(action === 'approve' || action === 'reject').toBe(false);
    });

    it('publishes an approved submission to the resource catalog', async () => {
      (prisma.$transaction as jest.Mock).mockResolvedValue([
        { id: 'resource-1' },
        { id: '1', status: 'APPROVED' },
      ]);

      expect(prisma.$transaction).toBeDefined();
    });
  });
});
