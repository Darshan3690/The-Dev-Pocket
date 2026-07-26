import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ error: 'Missing token' }, { status: 400 });
    }

    const subscription = await prisma.digestSubscription.findUnique({
      where: { unsubscribeToken: token },
    });

    if (!subscription) {
      return NextResponse.json({ error: 'Invalid or expired unsubscribe link' }, { status: 404 });
    }

    if (!subscription.isActive) {
      return NextResponse.json({ message: 'Already unsubscribed' }, { status: 200 });
    }

    await prisma.digestSubscription.update({
      where: { unsubscribeToken: token },
      data: { isActive: false },
    });

    return NextResponse.json({ message: 'Successfully unsubscribed from the weekly digest' }, { status: 200 });
  } catch (error) {
    console.error('Error unsubscribing from digest:', error);
    return NextResponse.json({ error: 'Failed to unsubscribe' }, { status: 500 });
  }
}
