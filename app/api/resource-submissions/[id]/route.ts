import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const submission = await prisma.resourceSubmission.findUnique({
      where: { id },
      include: {
        _count: { select: { votes: true } },
      },
    });

    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    return NextResponse.json({ ...submission, voteCount: submission._count.votes });
  } catch (error) {
    console.error('Error fetching resource submission:', error);
    return NextResponse.json({ error: 'Failed to fetch submission' }, { status: 500 });
  }
}
