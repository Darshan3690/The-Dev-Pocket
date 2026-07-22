// app/faq/page.tsx
"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQPage = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const [searchTerm, setSearchTerm] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    // General Questions
    {
      category: "General Questions",
      question: "What is Dev Pocket?",
      answer:
        "Dev Pocket is an AI-powered platform designed to help developers accelerate their careers with personalized learning roadmaps, curated resources, intelligent job matching, and professional resume & portfolio tools.",
    },
    {
      category: "General Questions",
      question: "Who is Dev Pocket for?",
      answer:
        "Dev Pocket is built for developers at all levels — from beginners and students to experienced engineers and career switchers looking to grow faster.",
    },

    // Account & Authentication
    {
      category: "Account & Authentication",
      question: "How do I create an account?",
      answer:
        "Click on 'Get Started Free' and sign up using your email or continue with GitHub/Google. The process takes less than 30 seconds.",
    },
    {
      category: "Account & Authentication",
      question: "Can I use Dev Pocket without signing up?",
      answer:
        "You can browse some features, but creating a personalized roadmap, saving progress, and using AI tools requires a free account.",
    },
    {
      category: "Account & Authentication",
      question: "How do I reset my password?",
      answer:
        "Go to the sign-in page and click 'Forgot Password'. You'll receive an email with instructions to reset it.",
    },

    // Features & Usage
    {
      category: "Features & Usage",
      question: "How does the AI Personalized Roadmap work?",
      answer:
        "Our AI analyzes your current skills, experience, goals, and learning preferences to create a tailored learning path with milestones and recommended resources.",
    },
    {
      category: "Features & Usage",
      question: "Is the Job Matching feature accurate?",
      answer:
        "Yes. It uses your skills, experience, preferences, and location to recommend highly relevant opportunities. Many users have landed jobs through our platform.",
    },
    {
      category: "Features & Usage",
      question: "Are the Resume tools free?",
      answer:
        "Basic resume building is free. Pro users get advanced AI suggestions, ATS optimization, multiple templates, and portfolio hosting.",
    },
    {
      category: "Features & Usage",
      question: "Can I track my learning progress?",
      answer:
        "Yes! The dashboard shows your progress across roadmaps, completed resources, and skill improvements over time.",
    },

    // Contributions & Community
    {
      category: "Contributions & Community",
      question: "How can I contribute to Dev Pocket?",
      answer:
        "We welcome contributions! You can suggest new features, report bugs, or contribute learning resources. Reach out via GitHub or our contact form.",
    },
    {
      category: "Contributions & Community",
      question: "Is there a community or forum?",
      answer:
        "Yes. Join our growing Discord community and developer forums to connect with others, share experiences, and get help.",
    },

    // Privacy & Security
    {
      category: "Privacy & Security",
      question: "Is my data secure?",
      answer:
        "Absolutely. We use industry-standard encryption, secure authentication, and strict data protection practices. We never sell your data.",
    },
    {
      category: "Privacy & Security",
      question: "What is your privacy policy?",
      answer:
        "You can read our full Privacy Policy [here](/privacy). We comply with GDPR and other major data protection regulations.",
    },

    // Contact & Support
    {
      category: "Contact & Support",
      question: "How can I contact support?",
      answer:
        "You can reach us through the Contact page, email support@devpocket.dev, or join our Discord community for faster help.",
    },
    {
      category: "Contact & Support",
      question: "Do you offer refunds?",
      answer:
        "Yes. We offer a 14-day money-back guarantee on all Pro subscriptions.",
    },
    {
      category: "Contact & Support",
      question: "Can I cancel my subscription anytime?",
      answer:
        "Yes. You can cancel anytime from your account settings. You'll retain access until the end of your current billing period.",
    },
  ];

  const filteredFaqs = useMemo(() => {
    if (!searchTerm) return faqs;
    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm]);

  const groupedFaqs = useMemo(() => {
    const groups: Record<string, FAQItem[]> = {};
    filteredFaqs.forEach((faq) => {
      if (!groups[faq.category]) groups[faq.category] = [];
      groups[faq.category].push(faq);
    });
    return groups;
  }, [filteredFaqs]);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen pt-24 pb-20 bg-gradient-to-br from-slate-50 to-sky-50 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Find quick answers to common questions about Dev Pocket
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-500 text-lg"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-400 absolute right-6 top-1/2 -translate-y-1/2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 01-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* FAQ Content */}
        <div className="space-y-12">
          {Object.entries(groupedFaqs).map(([category, items]) => (
            <section key={category}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                {category}
              </h2>

              <div className="space-y-4">
                <AnimatePresence>
                  {items.map((faq, idx) => {
                    const globalIndex = faqs.findIndex(
                      (f) => f.question === faq.question,
                    );
                    return (
                      <motion.div
                        key={globalIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
                      >
                        <button
                          onClick={() => toggleFAQ(globalIndex)}
                          className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all group"
                          aria-expanded={openIndex === globalIndex}
                        >
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-8">
                            {faq.question}
                          </h3>
                          <div
                            className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300 ${
                              openIndex === globalIndex
                                ? "bg-sky-600 border-sky-600 text-white rotate-180"
                                : "border-gray-300 dark:border-gray-600 group-hover:border-sky-400"
                            }`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </div>
                        </button>

                        <AnimatePresence>
                          {openIndex === globalIndex && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-8 pb-8 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-700 pt-6">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </section>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-20 bg-white dark:bg-gray-800 rounded-3xl p-12 text-center shadow-xl">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            Our team is happy to help. Reach out anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-10 py-4 rounded-full transition inline-block"
            >
              Contact Support
            </Link>
            <Link
              href="/"
              className="border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold px-10 py-4 rounded-full transition inline-block"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FAQPage;
