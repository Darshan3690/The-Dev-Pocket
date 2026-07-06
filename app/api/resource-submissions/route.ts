import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

const CATEGORIES = ['article', 'video', 'course', 'tool', 'documentation'];
const DIFFICULTIES = ['beginner', 'intermediate', 'advanced'];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sort = searchParams.get('sort') || 'newest';
    const category = searchParams.get('category') || '';
    const status = searchParams.get('status') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (category && CATEGORIES.includes(category)) {
      where.category = category;
    }

    if (status && ['PENDING', 'QUEUED', 'APPROVED', 'REJECTED'].includes(status)) {
      where.status = status;
    }

    const [submissions, total] = await Promise.all([
      prisma.resourceSubmission.findMany({
        where,
        skip,
        take: limit,
        include: {
          _count: { select: { votes: true } },
        },
      }),
      prisma.resourceSubmission.count({ where }),
    ]);

    const withScores = submissions.map((s) => {
      const votes = s._count.votes;
      const ageHours = (Date.now() - new Date(s.createdAt).getTime()) / (1000 * 60 * 60);
      const trendingScore = votes / Math.pow(ageHours + 2, 1.5);
      return { ...s, voteCount: votes, trendingScore };
    });

    if (sort === 'most-voted') {
      withScores.sort((a, b) => b.voteCount - a.voteCount);
    } else if (sort === 'trending') {
      withScores.sort((a, b) => b.trendingScore - a.trendingScore);
    } else {
      withScores.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return NextResponse.json({
      submissions: withScores,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching resource submissions:', error);
    return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { url, title, description, category, difficulty, tags } = body;

    if (!url || !title || !category || !difficulty) {
      return NextResponse.json(
        { error: 'Missing required fields: url, title, category, difficulty' },
        { status: 400 }
      );
    }

    try {
      new URL(url);
    } catch {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }

    if (!CATEGORIES.includes(category)) {
      return NextResponse.json(
        { error: `Invalid category. Supported: ${CATEGORIES.join(', ')}` },
        { status: 400 }
      );
    }

    if (!DIFFICULTIES.includes(difficulty)) {
      return NextResponse.json(
        { error: `Invalid difficulty. Supported: ${DIFFICULTIES.join(', ')}` },
        { status: 400 }
      );
    }

    const validTags = Array.isArray(tags)
      ? tags.slice(0, 5).map((t: string) => String(t).toLowerCase())
      : [];

    const submission = await prisma.resourceSubmission.create({
      data: {
        userId,
        url,
        title: title.trim(),
        description: description?.trim() || null,
        category,
        difficulty,
        tags: validTags.length > 0 ? validTags : undefined,
      },
    });

    return NextResponse.json(submission, { status: 201 });
  } catch (error) {
    console.error('Error creating resource submission:', error);
    return NextResponse.json({ error: 'Failed to create submission' }, { status: 500 });
  }
}
