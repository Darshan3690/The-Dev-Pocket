import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { query, resultsCount, userId, category } = await request.json();

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    // Save search to database for analytics
    const searchEntry = await prisma.searchHistory.create({
      data: {
        query: query.trim(),
        resultsCount: resultsCount || 0,
        isZeroResult: resultsCount === 0,
        userId: userId || null,
        category: category || null,
      },
    });

    console.log(`Search analytics: "${query}" -> ${resultsCount} results`);

    return NextResponse.json({ success: true, id: searchEntry.id });
  } catch (error) {
    console.error('Error tracking search:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'popular'; // popular, recent, zeroresults
    const limit = parseInt(searchParams.get('limit') || '10');
    const userId = searchParams.get('userId');

    let result;

    if (type === 'popular') {
      // Get popular searches (most frequent queries)
      const popularSearches = await prisma.searchHistory.groupBy({
        by: ['query'],
        where: {
          query: {
            not: '',
          },
        },
        _count: {
          query: true,
        },
        orderBy: {
          _count: {
            query: 'desc',
          },
        },
        take: limit,
      });

      result = popularSearches.map((item) => ({
        query: item.query,
        count: item._count.query,
      }));

      // If no data yet, return fallback popular searches
      if (result.length === 0) {
        result = [
          { query: 'javascript', count: 150 },
          { query: 'react', count: 120 },
          { query: 'python', count: 100 },
          { query: 'tutorial', count: 80 },
          { query: 'web development', count: 70 },
        ];
      }
    } else if (type === 'recent' && userId) {
      // Get recent searches for a specific user
      const recentSearches = await prisma.searchHistory.findMany({
        where: {
          userId: userId,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: limit,
        distinct: ['query'], // Only return unique queries
      });

      result = recentSearches.map((item) => ({
        query: item.query,
        resultsCount: item.resultsCount,
        createdAt: item.createdAt,
      }));
    } else if (type === 'zeroresults') {
      // Get queries that returned no results (helps identify content gaps)
      const zeroResultSearches = await prisma.searchHistory.findMany({
        where: {
          isZeroResult: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: limit,
      });

      result = zeroResultSearches.map((item) => ({
        query: item.query,
        createdAt: item.createdAt,
      }));
    } else {
      // Default: return popular searches
      const popularSearches = await prisma.searchHistory.groupBy({
        by: ['query'],
        where: {
          query: {
            not: '',
          },
        },
        _count: {
          query: true,
        },
        orderBy: {
          _count: {
            query: 'desc',
          },
        },
        take: limit,
      });

      result = popularSearches.map((item) => ({
        query: item.query,
        count: item._count.query,
      }));

      // Fallback if no data
      if (result.length === 0) {
        result = [
          { query: 'javascript', count: 150 },
          { query: 'react', count: 120 },
          { query: 'python', count: 100 },
          { query: 'tutorial', count: 80 },
          { query: 'web development', count: 70 },
        ];
      }
    }

    return NextResponse.json({ 
      type,
      searches: result 
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE endpoint to clear search history (for a user or all)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const clearAll = searchParams.get('clearAll') === 'true';

    if (clearAll) {
      // Clear all search history (admin function)
      await prisma.searchHistory.deleteMany({});
      return NextResponse.json({ success: true, message: 'All search history cleared' });
    } else if (userId) {
      // Clear search history for specific user
      await prisma.searchHistory.deleteMany({
        where: { userId },
      });
      return NextResponse.json({ success: true, message: 'User search history cleared' });
    } else {
      return NextResponse.json({ error: 'userId or clearAll required' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error clearing search history:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
