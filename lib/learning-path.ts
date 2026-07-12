export const TOPICS = ['web-fundamentals', 'javascript-typescript', 'devops-tools'] as const;
export type Topic = (typeof TOPICS)[number];

export type SkillMatrix = Record<Topic, number>;

const RESOURCES_PER_WEEK = 5;

// Each topic has 4 questions, each answered 0 (Beginner) - 3 (Advanced).
// A topic's raw score is the sum of its 4 answers, ranging 0-12.
export function scoreToBand(rawScore: number): 'beginner' | 'intermediate' | 'advanced' {
  if (rawScore <= 4) return 'beginner';
  if (rawScore <= 8) return 'intermediate';
  return 'advanced';
}

export function computeSkillMatrix(answers: number[]): SkillMatrix {
  if (answers.length !== 12) {
    throw new Error('Expected exactly 12 answers (4 per topic across 3 topics)');
  }

  const matrix = {} as SkillMatrix;
  TOPICS.forEach((topic, index) => {
    const topicAnswers = answers.slice(index * 4, index * 4 + 4);
    matrix[topic] = topicAnswers.reduce((sum, a) => sum + a, 0);
  });

  return matrix;
}

export interface ResourceLike {
  id: string;
  category: string;
  difficulty: string | null;
}

export function generatePath(
  scores: SkillMatrix,
  resourceCatalog: ResourceLike[]
): { resourceIds: string[]; estimatedWeeks: number } {
  const resourceIds: string[] = [];

  for (const topic of TOPICS) {
    const level = scoreToBand(scores[topic]);
    const matches = resourceCatalog.filter((r) => r.category === topic && r.difficulty === level);
    resourceIds.push(...matches.map((r) => r.id));
  }

  const estimatedWeeks = Math.max(1, Math.ceil(resourceIds.length / RESOURCES_PER_WEEK));

  return { resourceIds, estimatedWeeks };
}
