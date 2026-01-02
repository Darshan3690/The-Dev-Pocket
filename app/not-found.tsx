"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full text-center">
        {/* Animated 404 */}
        <div className="mb-8">
          <h1 className="text-[150px] sm:text-[200px] font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-bounce">
            404
          </h1>
          <div className="relative -mt-12">
            <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 opacity-20 animate-pulse"></div>
          </div>
        </div>

        {/* Error Message */}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          The page you&apos;re looking for seems to have wandered off into the digital void. 
          Don&apos;t worry though, we&apos;ll help you find your way back!
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-12 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for what you're looking for..."
              className="w-full px-6 py-4 pr-32 rounded-full border-2 border-purple-300 dark:border-purple-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-600 focus:border-purple-500 transition-all shadow-lg"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-xl"
            >
              Search
            </button>
          </div>
        </form>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
          <Link href="/">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 p-6 rounded-2xl border-2 border-blue-200 dark:border-blue-800 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 dark:text-gray-100">Go Home</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Back to homepage</p>
            </div>
          </Link>

          <Link href="/faq">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-6 rounded-2xl border-2 border-green-200 dark:border-green-800 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 dark:text-gray-100">Visit FAQ</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Find answers</p>
            </div>
          </Link>

          <Link href="/contact">
            <div className="bg-gradient-to-br from-orange-50 to-pink-50 dark:from-orange-950/30 dark:to-pink-950/30 p-6 rounded-2xl border-2 border-orange-200 dark:border-orange-800 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-600 text-white rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 dark:text-gray-100">Contact Us</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Get help</p>
            </div>
          </Link>
        </div>

        {/* Back Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-semibold rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </button>

          <Link href="/">
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home Page
            </button>
          </Link>
        </div>

        {/* Pro Tip */}
        <div className="mt-12 p-4 bg-blue-100 dark:bg-blue-900/30 rounded-xl border border-blue-300 dark:border-blue-700 max-w-2xl mx-auto">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-semibold">💡 Pro Tip:</span> Use <kbd className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs font-mono">Ctrl+K</kbd> to quickly search anywhere on the site!
          </p>
        </div>
      </div>
    </div>
  );
}
