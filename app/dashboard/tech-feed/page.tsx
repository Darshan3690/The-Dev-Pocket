"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import TechFeedCard from "./components/TechFeedCard"
import CategoryFilter from "./components/CategoryFilter"
import { TechNews } from "./lib/types"

export default function TechFeedPage() {
  const [techNews, setTechNews] = useState<TechNews[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTechNews()
  }, [selectedCategory])

  const fetchTechNews = async () => {
    setLoading(true)
    setError(null)
    try {
      const query = selectedCategory === "all" ? "" : `?category=${selectedCategory}`
      const response = await fetch(`/api/tech-feed${query}`)
      
      if (!response.ok) {
        throw new Error("Failed to fetch tech news")
      }
      
      const data = await response.json()
      setTechNews(data.news || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      console.error("Error fetching tech news:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Tech Feed</h1>
        <p className="text-muted-foreground mt-2">
          Stay updated with the latest trends in software development, AI, Web, Cloud, and Open Source
        </p>
      </div>

      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-800">{error}</p>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_: unknown, i: number) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-300 rounded"></div>
                  <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : techNews.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              No tech news available for this category. Check back soon!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {techNews.map((news: TechNews) => (
            <TechFeedCard key={news.id} news={news} />
          ))}
        </div>
      )}
    </div>
  )
}
