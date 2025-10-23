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
          Contributions are welcome! Check out the <Link href="/CONTRIBUTING.md">contributing guide</Link> and open a PR on GitHub.
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
    return FAQ_ITEMS.filter((it) => it.question.toLowerCase().includes(q) || String(it.answer).toLowerCase().includes(q));
  }, [query]);

  return (
    <main id="main-content" className="max-w-5xl mx-auto py-16 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">Frequently Asked Questions</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Common questions about using The Dev Pocket.</p>
      </header>

      <div className="mb-6 flex items-center gap-3">
        <label htmlFor="faq-search" className="sr-only">Search FAQs</label>
        <input
          id="faq-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search FAQs..."
          className="flex-1 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        />
        <Link href="/" className="text-sm text-blue-600 hover:underline">Back to Home</Link>
      </div>

      <section>
        {filtered.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">
            No results for "{query}". Try different keywords.
          </div>
        ) : (
          <Accordion items={filtered.map((f) => ({ id: f.id, question: f.question, answer: f.answer }))} />
        )}
      </section>
    </main>
  );
}
