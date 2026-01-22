import { NextRequest, NextResponse } from "next/server"
import { TechNewsResponse, TechNews, TechCategory } from "@/app/dashboard/tech-feed/lib/types"
import { upstashLimit, getClientIP } from "@/lib/rate-limit-upstash"

// Mock data - Replace with real API calls to tech news sources
const MOCK_TECH_NEWS: TechNews[] = [
  {
    id: "1",
    title: "Next.js 15 Released with New Features",
    description: "The latest version of Next.js brings improved performance and new development features.",
    category: "Web" as TechCategory,
    source: "Vercel Blog",
    sourceUrl: "https://vercel.com",
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    link: "https://nextjs.org/blog/next-15",
  },
  {
    id: "2",
    title: "OpenAI Releases New GPT Model",
    description: "A groundbreaking new language model with improved reasoning capabilities.",
    category: "AI" as TechCategory,
    source: "OpenAI",
    sourceUrl: "https://openai.com",
    publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    link: "https://openai.com/news",
  },
  {
    id: "3",
    title: "Kubernetes 1.30 Stable Release",
    description: "New features for cloud-native applications and container orchestration.",
    category: "DevOps" as TechCategory,
    source: "Kubernetes Blog",
    sourceUrl: "https://kubernetes.io",
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    link: "https://kubernetes.io/blog",
  },
  {
    id: "4",
    title: "AWS Announces New Cloud Services",
    description: "Enhanced services for data analytics and machine learning workloads.",
    category: "Cloud" as TechCategory,
    source: "AWS News",
    sourceUrl: "https://aws.amazon.com",
    publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    link: "https://aws.amazon.com/news",
  },
  {
    id: "5",
    title: "React 19 Canary Update",
    description: "Experimental features for building interactive user interfaces.",
    category: "Web" as TechCategory,
    source: "React",
    sourceUrl: "https://react.dev",
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    link: "https://react.dev/blog",
  },
  {
    id: "6",
    title: "Linux Kernel 6.8 Released",
    description: "Performance improvements and new hardware support.",
    category: "Open Source" as TechCategory,
    source: "Linux Kernel",
    sourceUrl: "https://kernel.org",
    publishedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    link: "https://kernel.org/releases",
  },
]

export async function GET(request: NextRequest) {
  // Rate limiting: 100 requests per hour per IP
  const clientIP = getClientIP(request);
  const rateLimitKey = `${clientIP}:tech-feed`;
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
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")

    let news = MOCK_TECH_NEWS

    // Filter by category if specified
    if (category && category !== "all") {
      news = news.filter(
        (item) => item.category.toLowerCase() === category.toLowerCase()
      )
    }

    const response: TechNewsResponse = {
      news,
      total: news.length,
      category: category === "all" ? undefined : (category as any),
    }

    return NextResponse.json(response, {
      headers: {
        'X-RateLimit-Limit': '100',
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        'X-RateLimit-Reset': rateLimitResult.reset.toString(),
      },
    })
  } catch (error) {
    console.error("Error fetching tech news:", error)
    return NextResponse.json(
      { error: "Failed to fetch tech news" },
      { status: 500 }
    )
  }
}
