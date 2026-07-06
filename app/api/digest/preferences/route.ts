import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { DIGEST_SECTIONS, DIGEST_FREQUENCIES } from '@/lib/digest';

const DIFFICULTIES = ['beginner', 'intermediate', 'advanced'];

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const subscription = await prisma.digestSubscription.findUnique({ where: { userId } });

    return NextResponse.json({ subscription });
  } catch (error) {
    console.error('Error fetching digest preferences:', error);
    return NextResponse.json({ error: 'Failed to fetch preferences' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { frequency, sections, difficultyFilter } = body;

    if (!DIGEST_FREQUENCIES.includes(frequency)) {
      return NextResponse.json(
        { error: `frequency must be one of: ${DIGEST_FREQUENCIES.join(', ')}` },
        { status: 400 }
      );
    }

    if (!Array.isArray(sections) || sections.length === 0 || !sections.every((s) => DIGEST_SECTIONS.includes(s))) {
      return NextResponse.json(
        { error: `sections must be a non-empty array from: ${DIGEST_SECTIONS.join(', ')}` },
        { status: 400 }
      );
    }

    if (difficultyFilter && !DIFFICULTIES.includes(difficultyFilter)) {
      return NextResponse.json(
        { error: `difficultyFilter must be one of: ${DIFFICULTIES.join(', ')}` },
        { status: 400 }
      );
    }

    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const email = user.primaryEmailAddress?.emailAddress;

    if (!email) {
      return NextResponse.json({ error: 'No verified email found on your account' }, { status: 400 });
    }

    const subscription = await prisma.digestSubscription.upsert({
      where: { userId },
      create: {
        userId,
        email,
        frequency,
        sections,
        difficultyFilter: difficultyFilter || null,
        isActive: true,
      },
      update: {
        email,
        frequency,
        sections,
        difficultyFilter: difficultyFilter || null,
        isActive: true,
      },
    });

    return NextResponse.json({ subscription });
  } catch (error) {
    console.error('Error saving digest preferences:', error);
    return NextResponse.json({ error: 'Failed to save preferences' }, { status: 500 });
  }
}
