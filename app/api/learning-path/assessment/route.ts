import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { computeSkillMatrix, generatePath } from '@/lib/learning-path';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { answers } = body;

    if (!Array.isArray(answers) || answers.length !== 12) {
      return NextResponse.json(
        { error: 'answers must be an array of 12 integers (0-3), 4 per topic' },
        { status: 400 }
      );
    }

    if (!answers.every((a) => Number.isInteger(a) && a >= 0 && a <= 3)) {
      return NextResponse.json(
        { error: 'Each answer must be an integer between 0 and 3' },
        { status: 400 }
      );
    }

    const scores = computeSkillMatrix(answers);

    await prisma.skillAssessment.upsert({
      where: { userId },
      create: { userId, scores },
      update: { scores },
    });

    const resourceCatalog = await prisma.resource.findMany({
      select: { id: true, category: true, difficulty: true },
    });

    const { resourceIds, estimatedWeeks } = generatePath(scores, resourceCatalog);

    const path = await prisma.learningPath.upsert({
      where: { userId },
      create: { userId, resourceIds, estimatedWeeks, completedResourceIds: [] },
      update: { resourceIds, estimatedWeeks, completedResourceIds: [] },
    });

    return NextResponse.json({ scores, path });
  } catch (error) {
    console.error('Error generating learning path:', error);
    return NextResponse.json({ error: 'Failed to generate learning path' }, { status: 500 });
  }
}
