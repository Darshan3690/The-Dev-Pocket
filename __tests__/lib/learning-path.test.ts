import { computeSkillMatrix, scoreToBand, generatePath, TOPICS } from '@/lib/learning-path';

describe('learning-path helpers', () => {
  describe('computeSkillMatrix', () => {
    it('throws if answers length is not 12', () => {
      expect(() => computeSkillMatrix([1, 2, 3])).toThrow();
    });

    it('computes per-topic raw scores from 12 answers', () => {
      const answers = [0, 0, 0, 0, 3, 3, 3, 3, 1, 1, 1, 1];
      const scores = computeSkillMatrix(answers);
      expect(scores['web-fundamentals']).toBe(0);
      expect(scores['javascript-typescript']).toBe(12);
      expect(scores['devops-tools']).toBe(4);
    });

    it('covers all three topics', () => {
      const answers = new Array(12).fill(1);
      const scores = computeSkillMatrix(answers);
      expect(Object.keys(scores).sort()).toEqual([...TOPICS].sort());
    });
  });

  describe('scoreToBand', () => {
    it('maps low scores to beginner', () => {
      expect(scoreToBand(0)).toBe('beginner');
      expect(scoreToBand(4)).toBe('beginner');
    });

    it('maps mid scores to intermediate', () => {
      expect(scoreToBand(5)).toBe('intermediate');
      expect(scoreToBand(8)).toBe('intermediate');
    });

    it('maps high scores to advanced', () => {
      expect(scoreToBand(9)).toBe('advanced');
      expect(scoreToBand(12)).toBe('advanced');
    });
  });

  describe('generatePath', () => {
    const catalog = [
      { id: '1', category: 'web-fundamentals', difficulty: 'beginner' },
      { id: '2', category: 'web-fundamentals', difficulty: 'advanced' },
      { id: '3', category: 'javascript-typescript', difficulty: 'intermediate' },
      { id: '4', category: 'devops-tools', difficulty: 'beginner' },
    ];

    it('only includes resources matching the identified gap level per topic', () => {
      const scores = { 'web-fundamentals': 0, 'javascript-typescript': 6, 'devops-tools': 0 };
      const { resourceIds } = generatePath(scores, catalog);
      expect(resourceIds).toEqual(['1', '3', '4']);
    });

    it('estimates weeks based on resource count', () => {
      const scores = { 'web-fundamentals': 0, 'javascript-typescript': 6, 'devops-tools': 0 };
      const { estimatedWeeks } = generatePath(scores, catalog);
      expect(estimatedWeeks).toBe(1);
    });

    it('returns at least 1 week even with an empty path', () => {
      const scores = { 'web-fundamentals': 12, 'javascript-typescript': 12, 'devops-tools': 12 };
      const { resourceIds, estimatedWeeks } = generatePath(scores, catalog);
      expect(resourceIds).toEqual(['2']);
      expect(estimatedWeeks).toBe(1);
    });
  });
});
