"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Search, X, Command, ArrowRight, FileText, BookOpen, Code, User, TrendingUp } from "lucide-react";

import { useRouter } from "next/navigation";

// Search result type
interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: "page" | "resource" | "feature" | "documentation";
  url: string;
  icon?: React.ReactNode;
  type?: "static" | "resource";
  keywords?: string[];
  score?: number;
}

interface ApiResource {
  id: string | number;
  title: string;
  description?: string | null;
  category?: string | null;
  tags?: string[] | null;
}

// All searchable content
const searchableContent: SearchResult[] = [
  // Pages
  { id: "1", title: "Home", description: "Explore Dev Pocket features, resources, and roadmaps", category: "page", url: "/", icon: <FileText className="w-4 h-4" />, keywords: ["landing", "overview", "features"] },
  { id: "2", title: "Dashboard", description: "View your learning progress and stats", category: "page", url: "/dashboard", icon: <FileText className="w-4 h-4" />, keywords: ["progress", "stats", "profile"] },
  { id: "3", title: "Create Roadmap", description: "Generate AI-powered learning roadmaps", category: "page", url: "/create-roadmap", icon: <Code className="w-4 h-4" />, keywords: ["roadmap", "ai", "learning path"] },
  { id: "4", title: "Calendar", description: "Manage your study schedule", category: "page", url: "/dashboard/calendar", icon: <FileText className="w-4 h-4" />, keywords: ["schedule", "planner", "study"] },
  { id: "5", title: "Notes", description: "Take and organize learning notes", category: "page", url: "/dashboard/notes", icon: <FileText className="w-4 h-4" />, keywords: ["memo", "study notes", "writing"] },
  { id: "6", title: "Resume Builder", description: "Create professional resumes", category: "page", url: "/dashboard/resume", icon: <FileText className="w-4 h-4" />, keywords: ["cv", "career", "portfolio"] },
  { id: "7", title: "Settings", description: "Manage your account settings", category: "page", url: "/settings", icon: <User className="w-4 h-4" />, keywords: ["account", "preferences", "profile"] },
  { id: "8", title: "About", description: "Learn more about Dev Pocket", category: "page", url: "/about", icon: <BookOpen className="w-4 h-4" />, keywords: ["team", "mission", "project"] },
  { id: "9", title: "Advanced Search", description: "Find resources with filters, tags, dates, and sorting", category: "page", url: "/search", icon: <Search className="w-4 h-4" />, keywords: ["filter", "facets", "resource search"] },
  { id: "10", title: "Resources", description: "Browse tutorials, articles, videos, courses, books, and tools", category: "page", url: "/resources", icon: <BookOpen className="w-4 h-4" />, keywords: ["tutorial", "article", "video", "course", "book", "tool"] },
  { id: "11", title: "Practice Hub", description: "Practice coding and interview skills", category: "page", url: "/practice-hub", icon: <Code className="w-4 h-4" />, keywords: ["coding", "interview", "questions"] },
  { id: "12", title: "Career Guidance", description: "Explore guidance for career growth and job readiness", category: "page", url: "/career-guidance", icon: <TrendingUp className="w-4 h-4" />, keywords: ["career", "job", "placement"] },
  { id: "13", title: "Jobs", description: "Discover job opportunities and career resources", category: "page", url: "/job", icon: <TrendingUp className="w-4 h-4" />, keywords: ["jobs", "internship", "placement"] },
  { id: "14", title: "FAQ", description: "Answers to common questions", category: "documentation", url: "/faq", icon: <BookOpen className="w-4 h-4" />, keywords: ["help", "questions", "support"] },
  { id: "15", title: "Contact", description: "Contact the Dev Pocket team", category: "page", url: "/contact", icon: <User className="w-4 h-4" />, keywords: ["support", "feedback", "message"] },
  
  // Features
  { id: "16", title: "AI Study Buddy", description: "Get help from AI assistant", category: "feature", url: "/dashboard/study-buddy", icon: <Code className="w-4 h-4" />, keywords: ["assistant", "ai tutor", "help"] },
  { id: "17", title: "Progress Tracking", description: "Track your learning progress", category: "feature", url: "/dashboard", icon: <FileText className="w-4 h-4" />, keywords: ["analytics", "stats", "learning"] },
  { id: "18", title: "Bookmarks", description: "Save and revisit useful developer resources", category: "feature", url: "/dashboard/bookmarks", icon: <BookOpen className="w-4 h-4" />, keywords: ["saved", "favorites", "resources"] },
  { id: "19", title: "Quiz", description: "Test your knowledge with developer quizzes", category: "feature", url: "/dashboard/quiz", icon: <Code className="w-4 h-4" />, keywords: ["test", "questions", "practice"] },
  { id: "20", title: "Projects", description: "Organize practical projects and learning work", category: "feature", url: "/dashboard/projects", icon: <Code className="w-4 h-4" />, keywords: ["build", "portfolio", "tasks"] },
  
  // Documentation/Resources
  { id: "21", title: "Web Development", description: "Learn web development from scratch", category: "resource", url: "/web-dev", icon: <BookOpen className="w-4 h-4" />, keywords: ["frontend", "backend", "javascript", "react", "next"] },
  { id: "22", title: "Data Structures & Algorithms", description: "Master DSA concepts", category: "resource", url: "/resources?category=dsa", icon: <BookOpen className="w-4 h-4" />, keywords: ["dsa", "algorithms", "interview"] },
  { id: "23", title: "AI & Machine Learning", description: "Explore AI/ML technologies", category: "resource", url: "/resources?search=machine%20learning", icon: <BookOpen className="w-4 h-4" />, keywords: ["ai", "ml", "machine learning", "data science"] },
];

const normalizeSearchText = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

const levenshteinDistance = (left: string, right: string) => {
  const previous = Array.from({ length: right.length + 1 }, (_, index) => index);

  for (let i = 0; i < left.length; i += 1) {
    let lastDiagonal = previous[0];
    previous[0] = i + 1;

    for (let j = 0; j < right.length; j += 1) {
      const oldDiagonal = previous[j + 1];
      const cost = left[i] === right[j] ? 0 : 1;
      previous[j + 1] = Math.min(
        previous[j + 1] + 1,
        previous[j] + 1,
        lastDiagonal + cost
      );
      lastDiagonal = oldDiagonal;
    }
  }

  return previous[right.length];
};

const scoreText = (query: string, target: string) => {
  const normalizedTarget = normalizeSearchText(target);
  if (!query || !normalizedTarget) return 0;
  if (normalizedTarget === query) return 120;
  if (normalizedTarget.startsWith(query)) return 100;
  if (normalizedTarget.includes(query)) return 80;

  const queryTokens = query.split(" ").filter(Boolean);
  const targetTokens = normalizedTarget.split(" ").filter(Boolean);

  return queryTokens.reduce((score, queryToken) => {
    const bestTokenScore = targetTokens.reduce((best, targetToken) => {
      if (targetToken === queryToken) return Math.max(best, 35);
      if (targetToken.startsWith(queryToken)) return Math.max(best, 28);
      if (targetToken.includes(queryToken)) return Math.max(best, 20);

      const typoDistance = levenshteinDistance(queryToken, targetToken);
      if (queryToken.length >= 6 && typoDistance <= 2) return Math.max(best, 16);
      if (queryToken.length >= 4 && typoDistance <= 1) return Math.max(best, 12);
      return best;
    }, 0);
    return score + bestTokenScore;
  }, 0);
};

const scoreResult = (query: string, item: SearchResult) => {
  const keywordText = item.keywords?.join(" ") ?? "";
  return (
    scoreText(query, item.title) * 3 +
    scoreText(query, item.description) * 1.5 +
    scoreText(query, item.category) +
    scoreText(query, keywordText) * 1.25
  );
};

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  
  const popularSearches = [
    { query: "dashboard", count: 1024 },
    { query: "learning path", count: 856 },
    { query: "resources", count: 742 },
  ];
  // Search function with fuzzy matching and API integration
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const normalizedQuery = normalizeSearchText(searchQuery);

    // Static content search
    const staticResults = searchableContent
      .map((item) => ({ ...item, score: scoreResult(normalizedQuery, item), type: "static" as const }))
      .filter((item) => item.score > 0);

    let combinedResults: (SearchResult & { type: "static" | "resource" })[] = [...staticResults];
    // Fetch resources from API if query is at least 2 characters
    if (searchQuery.length >= 2) {
      try {
        const response = await fetch(`/api/resources?search=${encodeURIComponent(searchQuery)}&limit=5`);
        const data = await response.json();
        const apiResources: ApiResource[] = Array.isArray(data.resources) ? data.resources : [];
        const resourceResults = apiResources.map((resource) => {
          const result: SearchResult & { type: "resource" } = {
            id: `resource-${resource.id}`,
            title: resource.title,
            description: resource.description || resource.category || "Learning resource",
            category: "resource" as const,
            url: `/resources/${resource.id}`,
            icon: <BookOpen className="w-4 h-4" />,
            type: "resource" as const,
            keywords: resource.tags ?? [],
          };
          return { ...result, score: scoreResult(normalizedQuery, result) };
        });
        combinedResults = [...staticResults, ...resourceResults];
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    }

    // Sort by fuzzy relevance, then keep static navigation targets above equal API results.
    combinedResults.sort((a, b) => {
      if ((b.score ?? 0) !== (a.score ?? 0)) return (b.score ?? 0) - (a.score ?? 0);
      if (a.type === "static" && b.type === "resource") return -1;
      if (a.type === "resource" && b.type === "static") return 1;
      return 0;
    });

    setResults(combinedResults.slice(0, 8)); // Limit to 8 results
    setSelectedIndex(0);
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      }

      // ESC to close
      if (e.key === "Escape") {
        setIsOpen(false);
        setQuery("");
        setResults([]);
      }

      // Arrow navigation when search is open
      if (isOpen && results.length > 0) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % results.length);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
        } else if (e.key === "Enter") {
          e.preventDefault();
          const selected = results[selectedIndex];
          if (selected) {
            router.push(selected.url);
            setIsOpen(false);
            setQuery("");
            setResults([]);
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, router]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    performSearch(value);
  };

  // Clear search
  const clearSearch = () => {
    setQuery("");
    setResults([]);
    inputRef.current?.focus();
  };

  // Handle result click
  const handleResultClick = (url: string) => {
    router.push(url);
    setIsOpen(false);
    setQuery("");
    setResults([]);
  };

  // Get category badge color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "page":
        return "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30";
      case "resource":
        return "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30";
      case "feature":
        return "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/30";
      case "documentation":
        return "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/30";
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg shadow-gray-500/30";
    }
  };

  return (
    <>
      {/* Search Trigger Button - Enhanced Design */}
      <button
        onClick={() => {
          setIsOpen(true);
          setTimeout(() => inputRef.current?.focus(), 100);
        }}
        className="group relative flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all duration-300 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 shadow-sm hover:shadow-lg transform hover:scale-105"
        aria-label="Open search"
      >
        <Search className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
        <span className="hidden sm:inline text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
          Search...
        </span>
        <kbd className="hidden lg:inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-gray-600 dark:text-gray-400 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-inner group-hover:from-blue-100 group-hover:to-purple-100 dark:group-hover:from-blue-900/40 dark:group-hover:to-purple-900/40 transition-all">
          <Command className="w-3 h-3" />
          <span>K</span>
        </kbd>
        {/* Shine effect on hover */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shine pointer-events-none" />
      </button>

      {/* Search Modal - Enhanced Design */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-32 px-4 bg-black/60 backdrop-blur-md animate-fade-in">
          <div
            ref={searchRef}
            className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden animate-slide-up"
          >
            {/* Search Input - Enhanced */}
            <div className="relative flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-blue-50/50 via-purple-50/50 to-pink-50/50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30 border-b-2 border-gray-200 dark:border-gray-700">
              <div className="relative flex-shrink-0">
                <Search className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <div className="absolute -inset-1 bg-blue-500/20 dark:bg-blue-500/30 rounded-full blur-md" />
              </div>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search pages, resources, features..."
                className="flex-1 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 outline-none text-lg font-medium"
                autoComplete="off"
              />
              {query && (
                <button
                  onClick={clearSearch}
                  className="p-2 hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-all transform hover:rotate-90 duration-300"
                  aria-label="Clear search"
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              )}
              <kbd className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg shadow-sm">
                ESC
              </kbd>
            </div>

            {/* Search Results - Enhanced */}
            <div className="max-h-[28rem] overflow-y-auto custom-scrollbar">
              {query && results.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <div className="relative inline-flex mb-4">
                    <Search className="w-16 h-16 text-gray-300 dark:text-gray-600" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-2xl" />
                  </div>
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                    No results found for &quot;{query}&quot;
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Try different keywords or check your spelling
                  </p>
                </div>
              ) : results.length > 0 ? (
                <div className="py-2">
                  {results.map((result, index) => (
                    <button
                      key={result.id}
                      onClick={() => handleResultClick(result.url)}
                      className={`w-full group flex items-center gap-4 px-5 py-4 text-left transition-all duration-200 ${
                        index === selectedIndex
                          ? "bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/40 dark:via-purple-950/40 dark:to-pink-950/40 border-l-4 border-blue-500 dark:border-blue-400"
                          : "hover:bg-gray-50 dark:hover:bg-gray-800/50 border-l-4 border-transparent"
                      }`}
                    >
                      <div className={`relative flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        index === selectedIndex
                          ? "bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg scale-110"
                          : "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 group-hover:from-blue-100 group-hover:to-purple-100 dark:group-hover:from-blue-900/30 dark:group-hover:to-purple-900/30"
                      }`}>
                        <div className={`transition-colors ${
                          index === selectedIndex
                            ? "text-white"
                            : "text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                        }`}>
                          {result.icon}
                        </div>
                        {index === selectedIndex && (
                          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-lg opacity-50" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <h4 className={`text-base font-bold truncate transition-colors ${
                            index === selectedIndex
                              ? "text-blue-700 dark:text-blue-300"
                              : "text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                          }`}>
                            {result.title}
                          </h4>
                          <span
                            className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${getCategoryColor(
                              result.category
                            )}`}
                          >
                            {result.category}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {result.description}
                        </p>
                      </div>
                      <ArrowRight
                        className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${
                          index === selectedIndex
                            ? "text-blue-600 dark:text-blue-400 translate-x-1"
                            : "text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="px-6 py-8 text-center">
                  <div className="relative inline-flex mb-4">
                    <Search className="w-16 h-16 text-gray-300 dark:text-gray-600" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse" />
                  </div>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                    Quick Search
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    Search for pages, resources, or features
                  </p>
                  
                  {/* Popular Searches */}
                  {popularSearches.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center justify-center gap-2">
                        <TrendingUp className="h-4 w-4 text-orange-500" />
                        Popular Searches
                      </h3>
                      <div className="flex flex-wrap justify-center gap-2">
                        {popularSearches.map((search) => (
                          <button
                            key={search.query}
                            onClick={() => {
                              setQuery(search.query);
                              performSearch(search.query);
                            }}
                            className="px-3 py-1.5 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 
                                     border border-orange-200 dark:border-orange-800 rounded-full text-sm 
                                     hover:from-orange-100 hover:to-red-100 dark:hover:from-orange-900/30 dark:hover:to-red-900/30 
                                     transition-all duration-200 flex items-center gap-2"
                          >
                            <span className="text-orange-700 dark:text-orange-300">{search.query}</span>
                            <span className="text-xs text-orange-500 dark:text-orange-400">({search.count})</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap justify-center gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 shadow-sm">
                      <kbd className="px-2.5 py-1 text-xs font-bold bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded border border-gray-300 dark:border-gray-600">
                        ↑ ↓
                      </kbd>
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Navigate</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 shadow-sm">
                      <kbd className="px-2.5 py-1 text-xs font-bold bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded border border-gray-300 dark:border-gray-600">
                        ↵
                      </kbd>
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Select</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 shadow-sm">
                      <kbd className="px-2.5 py-1 text-xs font-bold bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded border border-gray-300 dark:border-gray-600">
                        ESC
                      </kbd>
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Close</span>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* Add animations and custom styles CSS */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }

        .animate-shine {
          animation: shine 1s ease-in-out;
        }

        /* Custom Scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #3b82f6, #8b5cf6);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #2563eb, #7c3aed);
        }
      `}</style>
    </>
  );
}
