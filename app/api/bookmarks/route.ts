import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    const bookmarks = await prisma.bookmark.findMany({
      where: {
        userId,
        ...(category && category !== 'all' ? { category } : {})
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ bookmarks })
  } catch (error) {
    console.error('Error fetching bookmarks:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { title, url, description, category = 'General', tags = [] } = await request.json()

    if (!title || !url) {
      return NextResponse.json({ error: 'Title and URL are required' }, { status: 400 })
    }

    const bookmark = await prisma.bookmark.create({
      data: {
        userId,
        title,
        url,
        description,
        category,
        tags
      }
    })

    return NextResponse.json({ bookmark }, { status: 201 })
  } catch (error: unknown) {
    console.error('Error creating bookmark:', error)
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      return NextResponse.json({ error: 'Bookmark already exists' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}