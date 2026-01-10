"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bookmark, ExternalLink } from "lucide-react"
import { TechNews } from "../lib/types"

interface TechFeedCardProps {
  news: TechNews
}

export default function TechFeedCard({ news }: TechFeedCardProps) {
  const [isSaved, setIsSaved] = useState(news.saved || false)

  const handleSaveArticle = async () => {
    try {
      const response = await fetch("/api/tech-feed/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newsId: news.id }),
      })

      if (response.ok) {
        setIsSaved(true)
      }
    } catch (error) {
      console.error("Error saving article:", error)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
      {news.imageUrl && (
        <div className="w-full h-40 overflow-hidden rounded-t-lg bg-muted">
          <img
            src={news.imageUrl}
            alt={news.title}
            className="w-full h-full object-cover"
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              (e.target as HTMLImageElement).style.display = "none"
            }}
          />
        </div>
      )}

      <CardHeader className="flex-grow">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-input">
              {news.category}
            </div>
            <button
              onClick={handleSaveArticle}
              className={`p-1 rounded-lg transition-colors ${
                isSaved
                  ? "bg-primary text-white"
                  : "bg-muted hover:bg-muted-foreground/20"
              }`}
              title={isSaved ? "Saved" : "Save for later"}
            >
              <Bookmark className="w-4 h-4" fill={isSaved ? "currentColor" : "none"} />
            </button>
          </div>
          <CardTitle className="line-clamp-2 text-lg">{news.title}</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <CardDescription className="line-clamp-3">
          {news.description}
        </CardDescription>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{news.source}</span>
          <span>{formatDate(news.publishedAt)}</span>
        </div>

        <Button
          asChild
          className="w-full"
          variant="default"
        >
          <Link href={news.link} target="_blank" rel="noopener noreferrer">
            Read Full Article
            <ExternalLink className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
