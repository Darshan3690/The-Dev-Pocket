import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { query, resultsCount } = await request.json();

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    // For now, store in a simple way. In production, you'd want a proper analytics table
    // For this demo, we'll just log it. You can extend the schema later.

    console.log(`Search analytics: "${query}" -> ${resultsCount} results`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking search:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    // Return mock popular searches for now
    const popularSearches = [
      { query: 'javascript', count: 150 },
      { query: 'react', count: 120 },
      { query: 'python', count: 100 },
      { query: 'tutorial', count: 80 },
      { query: 'web development', count: 70 },
    ];

    return NextResponse.json({ popularSearches });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
