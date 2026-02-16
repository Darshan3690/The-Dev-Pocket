import { NextResponse } from "next/server";

/**
 * GET /api/progress
 * Returns user progress (mock response)
 */
export async function GET() {
  return NextResponse.json({
    userId: "mock-user",
    completedMilestones: [],
    progressPercentage: 0,
  });
}

/**
 * POST /api/progress
 * Toggles milestone completion (mock)
 */
export async function POST() {
  return NextResponse.json({
    success: true,
    message: "Progress updated successfully (mock)",
  });
}