import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ quizId: string }> }
) {
  try {
    const { quizId } = await params
    const questions = await prisma.question.findMany({
      where: { quizId },
      select: {
        id: true,
        text: true,
        options: true,
        correct: true, // frontend will NOT use this yet
      },
    })

    return NextResponse.json(questions)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 }
    )
  }
}
