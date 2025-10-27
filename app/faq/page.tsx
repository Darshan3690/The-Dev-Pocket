"use client";

import React, { useMemo, useState } from "react";
import Accordion from "../components/Accordion";
import Link from "next/link";

const FAQ_ITEMS = [
  {
    id: "getting-started",
    question: "How do I get started with The Dev Pocket?",
    answer: (
      <>
        <p>Welcome! To get started:</p>
        <ol>
          <li>Sign up or sign in using the top-right authentication controls.</li>
          <li>Visit your dashboard to create a roadmap or explore curated resources.</li>
          <li>Use the AI Study Buddy to get help with study plans and code explanations.</li>
        </ol>
      </>
    ),
  },
  {
    id: "dashboard-features",
    question: "What can I do in the dashboard?",
    answer: (
      <>
        <p>
          The dashboard provides quick access to stats, your learning roadmap, calendar,
          notes, resume builder, and AI features to help you learn efficiently.
        </p>
      </>
    ),
  },
  {
    id: "privacy",
    question: "How is my data stored and used?",
    answer: (
      <>
        <p>
          We use Supabase/PostgreSQL as the primary data store. Sensitive information is
          encrypted in transit and at rest where applicable. See the <Link href="/privacy">privacy page</Link> for full details.
        </p>
      </>
    ),
  },
  {
    id: "roadmap-ai",
    question: "How does the AI Roadmap Generator work?",
    answer: (
      <>
        <p>
          The AI Roadmap Generator uses heuristics and AI models to recommend a personalized
          learning path based on your background, goals, and time commitment. It suggests
          resources, tasks, and estimated durations.
        </p>
      </>
    ),
  },
  {
    id: "contributing",
    question: "How can I contribute to The Dev Pocket?",
    answer: (
      <>
        <p>
          Contributions are welcome! Check out the <Link href="https://github.com/Darshan3690/The-Dev-Pocket/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">contributing guide</Link> and open a PR on GitHub.
        </p>
      </>
    ),
  },
];

export default function FAQPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQ_ITEMS;
    // Only search in question text since answer contains JSX elements
    return FAQ_ITEMS.filter((it) => it.question.toLowerCase().includes(q));
  }, [query]);

  return (
    <main id="main-content" className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-950/20 dark:to-purple-950/20">
      <div className="max-w-4xl mx-auto py-16 px-4">
        <header className="mb-10 text-center">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Find answers to common questions about using The Dev Pocket
          </p>
        </header>

        <div className="mb-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex-1 relative">
            <label htmlFor="faq-search" className="sr-only">Search FAQs</label>
            <input
              id="faq-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search FAQs..."
              className="w-full px-5 py-3 pl-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 focus-visible:border-blue-500 dark:focus-visible:border-blue-400 shadow-sm transition-all"
            />
            <svg 
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <Link 
            href="/" 
            className="px-5 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-xl shadow-sm hover:shadow-md transition-all text-center"
          >
            Back to Home
          </Link>
        </div>

        <section>
          {filtered.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 text-center">
              <div className="text-gray-400 dark:text-gray-500 mb-3">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">
                No results found for &quot;{query}&quot;
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Try different keywords or check your spelling
              </p>
            </div>
          ) : (
            <Accordion items={filtered.map((f) => ({ id: f.id, question: f.question, answer: f.answer }))} />
          )}
        </section>
      </div>
    </main>
  );
}
