import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

const SUPPORTED_LANGUAGES = ['javascript', 'typescript', 'python', 'go', 'rust', 'sql', 'shell', 'css', 'html'];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const language = searchParams.get('language') || '';
    const tag = searchParams.get('tag') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { code: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (language && SUPPORTED_LANGUAGES.includes(language)) {
      where.language = language;
    }

    if (tag) {
      where.tags = { hasSome: [tag] };
    }

    const [snippets, total] = await Promise.all([
      prisma.snippet.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          description: true,
          language: true,
          code: true,
          tags: true,
          copyCount: true,
          createdAt: true,
          user: { select: { name: true, email: true } },
        },
      }),
      prisma.snippet.count({ where }),
    ]);

    return NextResponse.json({
      snippets,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching snippets:', error);
    return NextResponse.json({ error: 'Failed to fetch snippets' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, code, language, tags } = body;

    if (!title || !code || !language) {
      return NextResponse.json(
        { error: 'Missing required fields: title, code, language' },
        { status: 400 }
      );
    }

    if (!SUPPORTED_LANGUAGES.includes(language)) {
      return NextResponse.json(
        { error: `Unsupported language. Supported: ${SUPPORTED_LANGUAGES.join(', ')}` },
        { status: 400 }
      );
    }

    if (code.length > 50000) {
      return NextResponse.json(
        { error: 'Code snippet too large (max 50,000 characters)' },
        { status: 400 }
      );
    }

    const validTags = Array.isArray(tags)
      ? tags.slice(0, 5).map((t: string) => String(t).toLowerCase())
      : [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tagsData: any = validTags.length > 0 ? validTags : null;

    const snippet = await prisma.snippet.create({
      data: {
        userId,
        title: title.trim(),
        description: description?.trim() || null,
        code,
        language,
        tags: tagsData,
      },
      select: {
        id: true,
        title: true,
        description: true,
        language: true,
        code: true,
        tags: true,
        copyCount: true,
        createdAt: true,
        user: { select: { name: true, email: true } },
      },
    });

    return NextResponse.json(snippet, { status: 201 });
  } catch (error) {
    console.error('Error creating snippet:', error);
    return NextResponse.json({ error: 'Failed to create snippet' }, { status: 500 });
  }
}
