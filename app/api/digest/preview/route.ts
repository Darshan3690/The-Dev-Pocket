import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { buildDigestContent, DIGEST_SECTIONS, DIGEST_FREQUENCIES, DigestSection, DigestFrequency } from '@/lib/digest';

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const sectionsParam = searchParams.get('sections');
    const frequencyParam = searchParams.get('frequency') || 'weekly';
    const difficultyFilter = searchParams.get('difficulty');

    const sections = (sectionsParam ? sectionsParam.split(',') : [...DIGEST_SECTIONS]).filter((s) =>
      DIGEST_SECTIONS.includes(s as DigestSection)
    ) as DigestSection[];

    if (!DIGEST_FREQUENCIES.includes(frequencyParam as DigestFrequency)) {
      return NextResponse.json(
        { error: `frequency must be one of: ${DIGEST_FREQUENCIES.join(', ')}` },
        { status: 400 }
      );
    }

    const content = await buildDigestContent(sections, frequencyParam as DigestFrequency, difficultyFilter);

    return NextResponse.json({ content });
  } catch (error) {
    console.error('Error building digest preview:', error);
    return NextResponse.json({ error: 'Failed to build preview' }, { status: 500 });
  }
}
