import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// POST /api/newsletter - Subscribe to newsletter
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, source } = body;

    // Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existing) {
      // If previously unsubscribed, reactivate
      if (existing.status === "unsubscribed") {
        await prisma.newsletterSubscriber.update({
          where: { email: email.toLowerCase() },
          data: {
            status: "active",
            unsubscribedAt: null,
            name: name || existing.name,
          },
        });

        return NextResponse.json(
          { message: "Welcome back! You've been resubscribed.", resubscribed: true },
          { status: 200 }
        );
      }

      return NextResponse.json(
        { error: "This email is already subscribed" },
        { status: 409 }
      );
    }

    // Create new subscriber
    const subscriber = await prisma.newsletterSubscriber.create({
      data: {
        email: email.toLowerCase(),
        name: name || null,
        source: source || "website-footer",
        status: "active",
        verifiedAt: new Date(), // Auto-verify for now, can add email verification later
      },
    });

    // TODO: Send welcome email here
    // await sendWelcomeEmail(subscriber.email, subscriber.name);

    return NextResponse.json(
      {
        message: "Successfully subscribed to newsletter!",
        subscriber: {
          id: subscriber.id,
          email: subscriber.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again." },
      { status: 500 }
    );
  }
}

// DELETE /api/newsletter - Unsubscribe from newsletter
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const subscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!subscriber) {
      return NextResponse.json(
        { error: "Email not found" },
        { status: 404 }
      );
    }

    if (subscriber.status === "unsubscribed") {
      return NextResponse.json(
        { message: "Already unsubscribed" },
        { status: 200 }
      );
    }

    await prisma.newsletterSubscriber.update({
      where: { email: email.toLowerCase() },
      data: {
        status: "unsubscribed",
        unsubscribedAt: new Date(),
      },
    });

    return NextResponse.json(
      { message: "Successfully unsubscribed from newsletter" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter unsubscribe error:", error);
    return NextResponse.json(
      { error: "Failed to unsubscribe. Please try again." },
      { status: 500 }
    );
  }
}

// GET /api/newsletter/stats - Get newsletter statistics (admin only)
export async function GET(request: NextRequest) {
  try {
    const totalSubscribers = await prisma.newsletterSubscriber.count({
      where: { status: "active" },
    });

    const totalUnsubscribed = await prisma.newsletterSubscriber.count({
      where: { status: "unsubscribed" },
    });

    const recentSubscribers = await prisma.newsletterSubscriber.findMany({
      where: { status: "active" },
      orderBy: { subscribedAt: "desc" },
      take: 10,
      select: {
        id: true,
        email: true,
        name: true,
        subscribedAt: true,
        source: true,
      },
    });

    return NextResponse.json(
      {
        stats: {
          totalSubscribers,
          totalUnsubscribed,
          recentSubscribers,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
