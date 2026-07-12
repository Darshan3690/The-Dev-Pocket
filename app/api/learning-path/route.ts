import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const path = await prisma.learningPath.findUnique({ where: { userId } });

    if (!path) {
      return NextResponse.json({ error: 'No learning path found. Complete the assessment first.' }, { status: 404 });
    }

    const resourceIds = path.resourceIds as string[];
    const completedResourceIds = path.completedResourceIds as string[];

    const resources = await prisma.resource.findMany({
      where: { id: { in: resourceIds } },
    });

    const orderedResources = resourceIds
      .map((id) => resources.find((r) => r.id === id))
      .filter((r): r is NonNullable<typeof r> => Boolean(r));

    const progress = resourceIds.length > 0
      ? Math.round((completedResourceIds.length / resourceIds.length) * 100)
      : 0;

    return NextResponse.json({
      ...path,
      resources: orderedResources,
      progress,
    });
  } catch (error) {
    console.error('Error fetching learning path:', error);
    return NextResponse.json({ error: 'Failed to fetch learning path' }, { status: 500 });
  }
}
