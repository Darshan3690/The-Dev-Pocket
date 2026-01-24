import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { upstashLimit } from "@/lib/rate-limit-upstash"
import { getClientIP } from "@/lib/rate-limit"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ categorySlug: string }> }
) {
  try {
    const { categorySlug } = await params

    // First, find the category by slug
    const category = await prisma.quizCategory.findUnique({
      where: { slug: categorySlug },
    })

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      )
    }

    // Then fetch quizzes for this category
    const quizzes = await prisma.quiz.findMany({
      where: {
        categoryId: category.id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        difficulty: true,
        totalQuestions: true,
      },
    })

    return NextResponse.json(quizzes)
  } catch (error) {
    console.error("Failed to fetch quizzes:", error)
    return NextResponse.json(
      { error: "Failed to fetch quizzes" },
      { status: 500 }
    )
  }
}
