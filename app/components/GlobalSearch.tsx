"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Search, X, Command, ArrowRight, FileText, BookOpen, Code, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Search result type
interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: "page" | "resource" | "feature" | "documentation";
  url: string;
  icon?: React.ReactNode;
}

// All searchable content
const searchableContent: SearchResult[] = [
  // Pages
  { id: "1", title: "Dashboard", description: "View your learning progress and stats", category: "page", url: "/dashboard", icon: <FileText className="w-4 h-4" /> },
  { id: "2", title: "Create Roadmap", description: "Generate AI-powered learning roadmaps", category: "page", url: "/create-roadmap", icon: <Code className="w-4 h-4" /> },
  { id: "3", title: "Calendar", description: "Manage your study schedule", category: "page", url: "/dashboard/calendar", icon: <FileText className="w-4 h-4" /> },
  { id: "4", title: "Notes", description: "Take and organize learning notes", category: "page", url: "/dashboard/notes", icon: <FileText className="w-4 h-4" /> },
  { id: "5", title: "Resume Builder", description: "Create professional resumes", category: "page", url: "/dashboard/resume", icon: <FileText className="w-4 h-4" /> },
  { id: "6", title: "Settings", description: "Manage your account settings", category: "page", url: "/settings", icon: <User className="w-4 h-4" /> },
  { id: "7", title: "About", description: "Learn more about Dev Pocket", category: "page", url: "/about", icon: <BookOpen className="w-4 h-4" /> },
  
  // Features
  { id: "8", title: "AI Study Buddy", description: "Get help from AI assistant", category: "feature", url: "/dashboard", icon: <Code className="w-4 h-4" /> },
  { id: "9", title: "Progress Tracking", description: "Track your learning progress", category: "feature", url: "/dashboard", icon: <FileText className="w-4 h-4" /> },
  { id: "10", title: "Streak Counter", description: "Maintain your learning streak", category: "feature", url: "/dashboard", icon: <FileText className="w-4 h-4" /> },
  
  // Documentation/Resources
  { id: "11", title: "Web Development", description: "Learn web development from scratch", category: "resource", url: "/", icon: <BookOpen className="w-4 h-4" /> },
  { id: "12", title: "Data Structures & Algorithms", description: "Master DSA concepts", category: "resource", url: "/", icon: <BookOpen className="w-4 h-4" /> },
  { id: "13", title: "AI & Machine Learning", description: "Explore AI/ML technologies", category: "resource", url: "/", icon: <BookOpen className="w-4 h-4" /> },
];

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Search function with fuzzy matching
  const performSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const lowercaseQuery = searchQuery.toLowerCase();
    const filtered = searchableContent.filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(lowercaseQuery);
      const descMatch = item.description.toLowerCase().includes(lowercaseQuery);
      const categoryMatch = item.category.toLowerCase().includes(lowercaseQuery);
      return titleMatch || descMatch || categoryMatch;
    });

    // Sort by relevance (title matches first)
    filtered.sort((a, b) => {
      const aTitle = a.title.toLowerCase().startsWith(lowercaseQuery) ? 1 : 0;
      const bTitle = b.title.toLowerCase().startsWith(lowercaseQuery) ? 1 : 0;
      return bTitle - aTitle;
    });

    setResults(filtered.slice(0, 8)); // Limit to 8 results
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
        return "bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30";
      case "resource":
        return "bg-linear-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30";
      case "feature":
        return "bg-linear-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/30";
      case "documentation":
        return "bg-linear-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/30";
      default:
        return "bg-linear-to-r from-gray-500 to-gray-600 text-white shadow-lg shadow-gray-500/30";
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
        className="group relative flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 rounded-xl hover:bg-linear-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all duration-300 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 shadow-sm hover:shadow-lg transform hover:scale-105"
        aria-label="Open search"
      >
        <Search className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
        <span className="hidden sm:inline text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
          Search...
        </span>
        <kbd className="hidden lg:inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-gray-600 dark:text-gray-400 bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-inner group-hover:from-blue-100 group-hover:to-purple-100 dark:group-hover:from-blue-900/40 dark:group-hover:to-purple-900/40 transition-all">
          <Command className="w-3 h-3" />
          <span>K</span>
        </kbd>
        {/* Shine effect on hover */}
        <div className="absolute inset-0 rounded-xl bg-linear-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shine pointer-events-none" />
      </button>

      {/* Search Modal - Enhanced Design */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-32 px-4 bg-black/60 backdrop-blur-md animate-fade-in">
          <div
            ref={searchRef}
            className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden animate-slide-up"
          >
            {/* Search Input - Enhanced */}
            <div className="relative flex items-center gap-3 px-5 py-4 bg-linear-to-r from-blue-50/50 via-purple-50/50 to-pink-50/50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30 border-b-2 border-gray-200 dark:border-gray-700">
              <div className="relative shrink-0">
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
                <div className="px-6 py-12 text-center">
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
