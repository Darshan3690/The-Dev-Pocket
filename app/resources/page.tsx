"use client"

import { ExternalLink, Code, Book, Video, FileText } from 'lucide-react'
import BookmarkButton from '@/app/components/BookmarkButton'

const resources = [
  {
    id: 1,
    title: "React Documentation",
    description: "The official React documentation with guides, API reference, and tutorials.",
    url: "https://react.dev",
    category: "Frontend" as const,
    type: "Documentation",
    icon: FileText
  },
  {
    id: 2,
    title: "MDN Web Docs",
    description: "Comprehensive web development documentation and learning resources.",
    url: "https://developer.mozilla.org",
    category: "Frontend" as const,
    type: "Documentation",
    icon: Book
  },
  {
    id: 3,
    title: "Node.js Documentation",
    description: "Official Node.js documentation and guides for server-side JavaScript.",
    url: "https://nodejs.org/docs",
    category: "Backend" as const,
    type: "Documentation",
    icon: FileText
  },
  {
    id: 4,
    title: "JavaScript.info",
    description: "Modern JavaScript tutorial covering everything from basics to advanced topics.",
    url: "https://javascript.info",
    category: "Learning" as const,
    type: "Tutorial",
    icon: Book
  },
  {
    id: 5,
    title: "CSS-Tricks",
    description: "Tips, tricks, and techniques on using CSS for web development.",
    url: "https://css-tricks.com",
    category: "Frontend" as const,
    type: "Blog",
    icon: Code
  },
  {
    id: 6,
    title: "Docker Documentation",
    description: "Complete guide to containerization with Docker.",
    url: "https://docs.docker.com",
    category: "DevOps" as const,
    type: "Documentation",
    icon: FileText
  }
]

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Developer Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Curated collection of essential tools, documentation, and learning materials for developers.
            Save your favorites with the bookmark button!
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => {
            const Icon = resource.icon
            return (
              <div
                key={resource.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-6">
                  {/* Header with icon and bookmark */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {resource.title}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {resource.type}
                        </span>
                      </div>
                    </div>
                    <BookmarkButton
                      title={resource.title}
                      url={resource.url}
                      description={resource.description}
                      category={resource.category}
                      size="md"
                    />
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {resource.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {resource.category}
                    </span>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                    >
                      Visit Resource
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Save Your Favorite Resources
            </h2>
            <p className="text-gray-600 mb-6">
              Click the bookmark icon on any resource to save it to your personal collection. 
              Access all your saved resources anytime from your dashboard.
            </p>
            <a
              href="/dashboard/bookmarks"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              View My Bookmarks
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}