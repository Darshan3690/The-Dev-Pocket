import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { buildDigestContent, renderDigestEmail, DigestFrequency, DigestSection } from '@/lib/digest';
import { sendEmail } from '@/lib/email';

const FREQUENCY_INTERVAL_MS: Record<DigestFrequency, number> = {
  weekly: 7 * 24 * 60 * 60 * 1000,
  biweekly: 14 * 24 * 60 * 60 * 1000,
};

// Triggered on a schedule (e.g. Vercel Cron hitting this route weekly) with a
// shared secret, since this app has no background job runner.
export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-cron-secret');
  if (!process.env.CRON_SECRET || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const subscriptions = await prisma.digestSubscription.findMany({
      where: { isActive: true },
    });

    const now = Date.now();
    let sentCount = 0;

    for (const sub of subscriptions) {
      const interval = FREQUENCY_INTERVAL_MS[sub.frequency as DigestFrequency];
      const dueAt = sub.lastSentAt ? new Date(sub.lastSentAt).getTime() + interval : 0;

      if (now < dueAt) continue;

      const content = await buildDigestContent(
        sub.sections as DigestSection[],
        sub.frequency as DigestFrequency,
        sub.difficultyFilter
      );

      const unsubscribeUrl = `${process.env.NEXT_PUBLIC_APP_URL || ''}/api/digest/unsubscribe?token=${sub.unsubscribeToken}`;
      const html = renderDigestEmail(content, unsubscribeUrl);

      await sendEmail({
        to: sub.email,
        subject: `Your Dev Pocket Digest - Week of ${new Date().toLocaleDateString()}`,
        html,
      });

      await prisma.digestSubscription.update({
        where: { id: sub.id },
        data: { lastSentAt: new Date() },
      });

      sentCount += 1;
    }

    return NextResponse.json({ sentCount });
  } catch (error) {
    console.error('Error sending digest emails:', error);
    return NextResponse.json({ error: 'Failed to send digest emails' }, { status: 500 });
  }
}
