import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const resource = await prisma.resource.findUnique({
      where: { id: params.id },
    });

    if (!resource) {
      return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
    }

    return NextResponse.json(resource);
  } catch (error) {
    console.error('Error fetching resource:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title, description, url, category, tags, author, difficulty, readingTime, rating } = body;

    const resource = await prisma.resource.update({
      where: { id: params.id },
      data: {
        title,
        description,
        url,
        category,
        tags,
        author,
        difficulty,
        readingTime,
        rating,
      },
    });

    return NextResponse.json(resource);
  } catch (error) {
    console.error('Error updating resource:', error);
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.resource.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    console.error('Error deleting resource:', error);
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
