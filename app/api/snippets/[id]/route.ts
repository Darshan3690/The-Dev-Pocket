import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const snippet = await prisma.snippet.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        language: true,
        code: true,
        tags: true,
        copyCount: true,
        createdAt: true,
        user: { select: { id: true, name: true, email: true } },
      },
    });

    if (!snippet) {
      return NextResponse.json({ error: 'Snippet not found' }, { status: 404 });
    }

    return NextResponse.json(snippet);
  } catch (error) {
    console.error('Error fetching snippet:', error);
    return NextResponse.json({ error: 'Failed to fetch snippet' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const snippet = await prisma.snippet.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!snippet) {
      return NextResponse.json({ error: 'Snippet not found' }, { status: 404 });
    }

    if (snippet.userId !== userId) {
      return NextResponse.json({ error: 'Forbidden: You can only delete your own snippets' }, { status: 403 });
    }

    await prisma.snippet.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting snippet:', error);
    return NextResponse.json({ error: 'Failed to delete snippet' }, { status: 500 });
  }
}
