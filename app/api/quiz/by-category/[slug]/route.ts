import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { upstashLimit } from "@/lib/rate-limit-upstash"
import { getClientIP } from "@/lib/rate-limit"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  // Rate limiting: 100 requests per hour per IP
  const clientIP = getClientIP(request);
  const rateLimitKey = `${clientIP}:quiz-by-category`;
  const rateLimitResult = await upstashLimit(rateLimitKey, {
    maxRequests: 100,
    windowMs: 60 * 60 * 1000, // 1 hour
  });

  if (!rateLimitResult.success) {
    return NextResponse.json(
      {
        error: "Too many requests. Please try again later.",
        resetAt: new Date(rateLimitResult.reset).toISOString()
      },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': '100',
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': rateLimitResult.reset.toString(),
        }
      }
    );
  }

  try {
    const { slug } = await params

    const category = await prisma.quizCategory.findUnique({
      where: { slug },
      include: {
        quizzes: {
          select: {
            id: true,
            title: true,
            description: true,
            difficulty: true,
            totalQuestions: true,
          },
        },
      },
    })

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(category, {
      headers: {
        'X-RateLimit-Limit': '100',
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        'X-RateLimit-Reset': rateLimitResult.reset.toString(),
      },
    })
  } catch (error) {
    console.error("Failed to fetch category:", error)
    return NextResponse.json(
      { error: "Failed to fetch category" },
      { status: 500 }
    )
  }
}
