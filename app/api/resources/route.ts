import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const tags = searchParams.get('tags')?.split(',').filter(Boolean) || [];
    const difficulty = searchParams.get('difficulty') || '';
    const author = searchParams.get('author') || '';
    const dateFrom = searchParams.get('dateFrom') || '';
    const dateTo = searchParams.get('dateTo') || '';
    const sortBy = searchParams.get('sortBy') || 'date'; // relevance, date, popularity, rating
    const sortOrder = searchParams.get('sortOrder') || 'desc'; // asc, desc
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { author: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (category) {
      where.category = category;
    }

    if (tags.length > 0) {
      where.tags = {
        not: null,
        // For JSON array, check if any tag is in the array
        // Prisma doesn't support array contains directly, so use raw query or filter in JS
      };
    }

    if (difficulty) {
      where.difficulty = difficulty;
    }

    if (author) {
      where.author = { contains: author, mode: 'insensitive' };
    }

    if (dateFrom || dateTo) {
      where.createdAt = {};
      if (dateFrom) where.createdAt.gte = new Date(dateFrom);
      if (dateTo) where.createdAt.lte = new Date(dateTo);
    }

    let orderBy: any = { createdAt: 'desc' };
    if (sortBy === 'date') {
      orderBy = { createdAt: sortOrder };
    } else if (sortBy === 'rating') {
      orderBy = { rating: sortOrder };
    } else if (sortBy === 'popularity') {
      // Assuming popularity is based on rating or some field, for now use rating
      orderBy = { rating: sortOrder };
    } else if (sortBy === 'relevance' && search) {
      // For relevance, keep default or add score, but for now keep date
      orderBy = { createdAt: 'desc' };
    }

    // Fetch all resources for facets (optimize later with aggregation)
    const allResources = await prisma.resource.findMany({ where });

    // Filter by tags in JS since Prisma JSON array is tricky
    let filteredResources = allResources;
    if (tags.length > 0) {
      filteredResources = allResources.filter(resource => {
        if (!resource.tags) return false;
        const resourceTags = Array.isArray(resource.tags) ? resource.tags : [];
        return tags.some(tag => resourceTags.includes(tag));
      });
    }

    // Compute facets
    const facets = {
      categories: {} as Record<string, number>,
      tags: {} as Record<string, number>,
      difficulties: {} as Record<string, number>,
    };

    filteredResources.forEach(resource => {
      // Categories
      facets.categories[resource.category] = (facets.categories[resource.category] || 0) + 1;

      // Tags
      if (resource.tags && Array.isArray(resource.tags)) {
        resource.tags.forEach((tag) => {
          if (typeof tag === 'string') {
            facets.tags[tag] = (facets.tags[tag] || 0) + 1;
          }
        });
      }

      // Difficulties
      if (resource.difficulty) {
        facets.difficulties[resource.difficulty] = (facets.difficulties[resource.difficulty] || 0) + 1;
      }
    });

    // Sort filtered resources
    filteredResources.sort((a, b) => {
      let aVal: any, bVal: any;
      if (sortBy === 'date') {
        aVal = new Date(a.createdAt);
        bVal = new Date(b.createdAt);
      } else if (sortBy === 'rating') {
        aVal = a.rating || 0;
        bVal = b.rating || 0;
      } else if (sortBy === 'popularity') {
        aVal = a.rating || 0; // Placeholder
        bVal = b.rating || 0;
      } else {
        aVal = new Date(a.createdAt);
        bVal = new Date(b.createdAt);
      }
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    // Paginate
    const total = filteredResources.length;
    const resources = filteredResources.slice(skip, skip + limit);

    return NextResponse.json({
      resources,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      facets,
    });
  } catch (error) {
    console.error('Error fetching resources:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, url, category, tags, author, difficulty, readingTime, rating } = body;

    if (!title || !url || !category) {
      return NextResponse.json({ error: 'Title, URL, and category are required' }, { status: 400 });
    }

    const resource = await prisma.resource.create({
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

    return NextResponse.json(resource, { status: 201 });
  } catch (error) {
    console.error('Error creating resource:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
