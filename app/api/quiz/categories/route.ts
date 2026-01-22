import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { upstashLimit } from "@/lib/rate-limit-upstash"
import { getClientIP } from "@/lib/rate-limit"

export async function GET(request: NextRequest) {
  try {
    const categories = await prisma.quizCategory.findMany({
      select: {
        id: true,
        slug: true,
        name: true,
        iconUrl: true,
        totalQuestions: true,
      },
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error("Failed to fetch categories:", error)
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    )
  }
}
