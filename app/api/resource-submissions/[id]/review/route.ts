import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth, clerkClient } from '@clerk/nextjs/server';

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = await clerkClient();
    const user = await client.users.getUser(userId);

    // Adjust this condition depending on how your codebase marks metadata admins
    const isAdmin = user.privateMetadata?.role === 'admin' || user.publicMetadata?.role === 'admin';
    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden: Maintainers only' }, { status: 403 });
    }

    const body = await request.json();
    const { action, rejectionReason } = body;

    if (action !== 'approve' && action !== 'reject') {
      return NextResponse.json({ error: 'action must be "approve" or "reject"' }, { status: 400 });
    }

    const submission = await prisma.resourceSubmission.findUnique({ where: { id } });

    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    if (action === 'reject') {
      const updated = await prisma.resourceSubmission.update({
        where: { id },
        data: { status: 'REJECTED', rejectionReason: rejectionReason?.trim() || null },
      });
      return NextResponse.json(updated);
    }

    const [resource, updatedSubmission] = await prisma.$transaction([
      prisma.resource.create({
        data: {
          title: submission.title,
          description: submission.description,
          url: submission.url,
          category: submission.category,
          difficulty: submission.difficulty,
          tags: submission.tags ?? undefined,
          author: submission.userId,
        },
      }),
      prisma.resourceSubmission.update({
        where: { id },
        data: { status: 'APPROVED' },
      }),
    ]);

    await prisma.resourceSubmission.update({
      where: { id },
      data: { approvedResourceId: resource.id },
    });

    return NextResponse.json({ ...updatedSubmission, approvedResourceId: resource.id });
  } catch (error) {
    console.error('Error reviewing resource submission:', error);
    return NextResponse.json({ error: 'Failed to review submission' }, { status: 500 });
  }
}
