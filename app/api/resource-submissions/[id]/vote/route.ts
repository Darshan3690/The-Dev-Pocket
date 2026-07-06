import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

const REVIEW_QUEUE_THRESHOLD = 10;

export async function POST(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const submission = await prisma.resourceSubmission.findUnique({ where: { id } });

    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    // The unique constraint on [submissionId, userId] guarantees one vote per user
    // even under concurrent double-clicks.
    try {
      await prisma.resourceSubmissionVote.create({
        data: { submissionId: id, userId },
      });
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2002') {
        return NextResponse.json({ error: 'You have already voted on this submission' }, { status: 409 });
      }
      throw error;
    }

    const voteCount = await prisma.resourceSubmissionVote.count({ where: { submissionId: id } });

    if (voteCount >= REVIEW_QUEUE_THRESHOLD && submission.status === 'PENDING') {
      await prisma.resourceSubmission.update({
        where: { id },
        data: { status: 'QUEUED' },
      });
    }

    return NextResponse.json({ id, voteCount });
  } catch (error) {
    console.error('Error voting on resource submission:', error);
    return NextResponse.json({ error: 'Failed to register vote' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.resourceSubmissionVote.deleteMany({
      where: { submissionId: id, userId },
    });

    const voteCount = await prisma.resourceSubmissionVote.count({ where: { submissionId: id } });

    return NextResponse.json({ id, voteCount });
  } catch (error) {
    console.error('Error removing vote:', error);
    return NextResponse.json({ error: 'Failed to remove vote' }, { status: 500 });
  }
}
