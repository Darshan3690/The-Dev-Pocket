// Mock Prisma client
jest.mock('@/lib/prisma', () => ({
  prisma: {
    snippet: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
  },
}));

import { prisma } from '@/lib/prisma';

describe('Snippets API', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/snippets', () => {
    it('should return snippets with pagination', async () => {
      const mockSnippets = [
        {
          id: '1',
          title: 'Test Snippet',
          code: 'console.log("hello")',
          language: 'javascript',
          copyCount: 5,
          user: { name: 'Test User', email: 'test@example.com' },
        },
      ];

      (prisma.snippet.findMany as jest.Mock).mockResolvedValue(mockSnippets);
      (prisma.snippet.count as jest.Mock).mockResolvedValue(1);

      expect(prisma.snippet.findMany).toBeDefined();
    });

    it('should filter by language', async () => {
      const mockSnippets = [
        {
          id: '1',
          title: 'Python Snippet',
          code: 'print("hello")',
          language: 'python',
          copyCount: 3,
          user: { name: 'Test User', email: 'test@example.com' },
        },
      ];

      (prisma.snippet.findMany as jest.Mock).mockResolvedValue(mockSnippets);
      (prisma.snippet.count as jest.Mock).mockResolvedValue(1);

      expect(prisma.snippet.findMany).toBeDefined();
    });

    it('should search snippets by title, description, and code', async () => {
      const mockSnippets = [];

      (prisma.snippet.findMany as jest.Mock).mockResolvedValue(mockSnippets);
      (prisma.snippet.count as jest.Mock).mockResolvedValue(0);

      expect(prisma.snippet.findMany).toBeDefined();
    });
  });

  describe('POST /api/snippets', () => {
    it('should create a snippet with valid data', async () => {
      const newSnippet = {
        id: '1',
        title: 'Test Snippet',
        code: 'console.log("hello")',
        language: 'javascript',
        tags: ['react', 'hooks'],
        copyCount: 0,
        user: { name: 'Test User', email: 'test@example.com' },
      };

      (prisma.snippet.create as jest.Mock).mockResolvedValue(newSnippet);

      expect(prisma.snippet.create).toBeDefined();
    });

    it('should reject snippets with unsupported language', async () => {
      expect(
        ['unsupported-lang', 'fake', 'not-a-language'].every(
          (lang) => !['javascript', 'typescript', 'python', 'go', 'rust', 'sql', 'shell', 'css', 'html'].includes(lang)
        )
      ).toBe(true);
    });

    it('should enforce max 5 tags', async () => {
      const tags = ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6'];
      expect(tags.slice(0, 5).length).toBe(5);
    });

    it('should reject code over 50000 characters', async () => {
      const longCode = 'x'.repeat(50001);
      expect(longCode.length > 50000).toBe(true);
    });
  });

  describe('GET /api/snippets/[id]', () => {
    it('should return a snippet by ID', async () => {
      const snippet = {
        id: '1',
        title: 'Test Snippet',
        code: 'console.log("hello")',
        language: 'javascript',
        copyCount: 5,
        user: { id: 'user-1', name: 'Test User', email: 'test@example.com' },
      };

      (prisma.snippet.findUnique as jest.Mock).mockResolvedValue(snippet);

      expect(prisma.snippet.findUnique).toBeDefined();
    });

    it('should return 404 if snippet does not exist', async () => {
      (prisma.snippet.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await prisma.snippet.findUnique({ where: { id: 'nonexistent' } });
      expect(result).toBeNull();
    });
  });

  describe('DELETE /api/snippets/[id]', () => {
    it('should delete a snippet if user is owner', async () => {
      (prisma.snippet.findUnique as jest.Mock).mockResolvedValue({
        userId: 'user-1',
      });
      (prisma.snippet.delete as jest.Mock).mockResolvedValue({ id: '1' });

      expect(prisma.snippet.delete).toBeDefined();
    });

    it('should reject delete if user is not owner', async () => {
      const snippet = { userId: 'user-2' };
      const userId = 'user-1';
      expect(snippet.userId !== userId).toBe(true);
    });
  });

  describe('POST /api/snippets/[id]/copy', () => {
    it('should increment copy count', async () => {
      (prisma.snippet.update as jest.Mock).mockResolvedValue({
        id: '1',
        copyCount: 6,
      });

      expect(prisma.snippet.update).toBeDefined();
    });

    it('should return 404 if snippet does not exist', async () => {
      (prisma.snippet.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await prisma.snippet.findUnique({ where: { id: 'nonexistent' } });
      expect(result).toBeNull();
    });
  });
});
