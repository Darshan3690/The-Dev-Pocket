export type TechCategory = 
  | "AI" 
  | "Web" 
  | "Backend" 
  | "DevOps" 
  | "Cloud" 
  | "Open Source" 
  | "Mobile" 
  | "Tools & Frameworks"

export interface TechNews {
  id: string
  title: string
  description: string
  category: TechCategory
  source: string
  sourceUrl: string
  imageUrl?: string
  publishedAt: string
  link: string
  saved?: boolean
}

export interface TechNewsResponse {
  news: TechNews[]
  total: number
  category?: TechCategory
}
