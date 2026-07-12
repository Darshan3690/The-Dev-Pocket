import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { resourceId } = body;

    if (!resourceId) {
      return NextResponse.json({ error: 'resourceId is required' }, { status: 400 });
    }

    const path = await prisma.learningPath.findUnique({ where: { userId } });

    if (!path) {
      return NextResponse.json({ error: 'No learning path found' }, { status: 404 });
    }

    const resourceIds = path.resourceIds as string[];
    const completedResourceIds = path.completedResourceIds as string[];

    if (!resourceIds.includes(resourceId)) {
      return NextResponse.json({ error: 'Resource is not part of this learning path' }, { status: 400 });
    }

    if (completedResourceIds.includes(resourceId)) {
      return NextResponse.json({ error: 'Resource already marked complete' }, { status: 409 });
    }

    // Resources unlock in sequence: only the next uncompleted resource can be marked complete.
    const nextIndex = completedResourceIds.length;
    if (resourceIds[nextIndex] !== resourceId) {
      return NextResponse.json(
        { error: 'Complete resources in sequence; this resource is not yet unlocked' },
        { status: 400 }
      );
    }

    const updatedCompleted = [...completedResourceIds, resourceId];

    const updated = await prisma.learningPath.update({
      where: { userId },
      data: { completedResourceIds: updatedCompleted },
    });

    const progress = resourceIds.length > 0
      ? Math.round((updatedCompleted.length / resourceIds.length) * 100)
      : 0;

    return NextResponse.json({ ...updated, progress });
  } catch (error) {
    console.error('Error marking resource complete:', error);
    return NextResponse.json({ error: 'Failed to mark resource complete' }, { status: 500 });
  }
}
