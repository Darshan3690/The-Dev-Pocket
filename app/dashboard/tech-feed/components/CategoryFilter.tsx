"use client"

import { Button } from "@/components/ui/button"
import { TechCategory } from "../lib/types"

const CATEGORIES: { value: string; label: string }[] = [
  { value: "all", label: "All Categories" },
  { value: "AI", label: "AI & Machine Learning" },
  { value: "Web", label: "Web Development" },
  { value: "Backend", label: "Backend" },
  { value: "DevOps", label: "DevOps" },
  { value: "Cloud", label: "Cloud" },
  { value: "Open Source", label: "Open Source" },
  { value: "Mobile", label: "Mobile Development" },
  { value: "Tools & Frameworks", label: "Tools & Frameworks" },
]

interface CategoryFilterProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export default function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((category) => (
        <Button
          key={category.value}
          onClick={() => onCategoryChange(category.value)}
          variant={selectedCategory === category.value ? "default" : "outline"}
          className="rounded-full"
        >
          {category.label}
        </Button>
      ))}
    </div>
  )
}
