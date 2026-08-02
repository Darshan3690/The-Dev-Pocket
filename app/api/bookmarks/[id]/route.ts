import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth()
    const { id } = await params

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const bookmark = await prisma.bookmark.findFirst({
      where: { id, userId }
    })

    if (!bookmark) {
      return NextResponse.json({ error: 'Bookmark not found' }, { status: 404 })
    }

    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    if (typeof body !== 'object' || body === null) {
      return NextResponse.json({ error: 'Request body must be an object' }, { status: 400 })
    }

    const { title, url, description, category, tags } = body as {
      title?: unknown
      url?: unknown
      description?: unknown
      category?: unknown
      tags?: unknown
    }

    if (title !== undefined && (typeof title !== 'string' || !title.trim())) {
      return NextResponse.json({ error: 'Title cannot be empty' }, { status: 400 })
    }

    if (url !== undefined && (typeof url !== 'string' || !url.trim())) {
      return NextResponse.json({ error: 'URL cannot be empty' }, { status: 400 })
    }

    if (
      tags !== undefined &&
      (!Array.isArray(tags) || !tags.every((tag) => typeof tag === 'string'))
    ) {
      return NextResponse.json({ error: 'Tags must be an array of strings' }, { status: 400 })
    }

    const updated = await prisma.bookmark.update({
      where: { id },
      data: {
        ...(title !== undefined ? { title: (title as string).trim() } : {}),
        ...(url !== undefined ? { url: (url as string).trim() } : {}),
        ...(description !== undefined ? { description } : {}),
        ...(category !== undefined ? { category } : {}),
        ...(tags !== undefined ? { tags } : {})
      }
    })

    return NextResponse.json({ bookmark: updated })
  } catch (error: unknown) {
    console.error('Error updating bookmark:', error)
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      return NextResponse.json({ error: 'Bookmark already exists' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth()
    const { id } = await params
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const bookmark = await prisma.bookmark.findFirst({
      where: {
        id,
        userId
      }
    })

    if (!bookmark) {
      return NextResponse.json({ error: 'Bookmark not found' }, { status: 404 })
    }

    await prisma.bookmark.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting bookmark:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}