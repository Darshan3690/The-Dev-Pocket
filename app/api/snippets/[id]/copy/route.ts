import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const snippet = await prisma.snippet.findUnique({
      where: { id },
    });

    if (!snippet) {
      return NextResponse.json({ error: 'Snippet not found' }, { status: 404 });
    }

    const updated = await prisma.snippet.update({
      where: { id },
      data: { copyCount: { increment: 1 } },
      select: {
        id: true,
        copyCount: true,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error tracking snippet copy:', error);
    return NextResponse.json({ error: 'Failed to track copy' }, { status: 500 });
  }
}
