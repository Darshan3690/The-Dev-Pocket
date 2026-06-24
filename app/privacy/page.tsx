"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";

const PrivacyPage = () => {
  const { theme } = useTheme();
  const [expandedSection, setExpandedSection] = useState<string | null>(
    "intro",
  );
  const [highlightColor, setHighlightColor] = useState("#22d3ee");

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const privacySections = [
    {
      id: "intro",
      title: "Introduction",
      icon: "📜",
      content:
        "Dev Pocket is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.",
    },
    {
      id: "information",
      title: "Information We Collect",
      icon: "📊",
      content:
        "We collect personal information such as name, email, GitHub profile, skills, and usage data. This includes data from forms, cookies, and analytics tools like Google Analytics.",
    },
    {
      id: "usage",
      title: "How We Use Your Information",
      icon: "⚙️",
      content:
        "We use your data to provide personalized roadmaps, improve our AI recommendations, send updates, and enhance user experience. We never sell your personal data.",
    },
    {
      id: "sharing",
      title: "Information Sharing",
      icon: "🔄",
      content:
        "We may share data with trusted service providers (e.g., Clerk for auth, Vercel for hosting) under strict confidentiality agreements. We do not share data with third parties for marketing.",
    },
    {
      id: "security",
      title: "Data Security",
      icon: "🔒",
      content:
        "We implement industry-standard security measures including encryption, secure servers, and regular audits to protect your information.",
    },
    {
      id: "cookies",
      title: "Cookies and Tracking",
      icon: "🍪",
      content:
        "We use essential cookies for functionality and analytics cookies to understand user behavior. You can manage preferences via your browser settings.",
    },
    {
      id: "rights",
      title: "Your Rights",
      icon: "🛡️",
      content:
        "You have the right to access, correct, delete, or restrict processing of your personal data. Contact us to exercise these rights.",
    },
    {
      id: "changes",
      title: "Changes to This Policy",
      icon: "📝",
      content:
        "We may update this policy from time to time. We will notify you of significant changes via email or prominent notice on our site.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-screen-2xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-xl">💼</span>
            </div>
            <span className="text-2xl font-bold tracking-tight">
              Dev Pocket
            </span>
          </Link>

          <Link
            href="/"
            className="group flex items-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all duration-300 hover:border-cyan-400"
          >
            ← Return to Home
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>
      </nav>

      <div className="pt-24 pb-20 max-w-screen-2xl mx-auto px-6">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/5 rounded-full mb-6 border border-white/10">
            <span className="text-cyan-400">🔒</span>
            <span className="uppercase tracking-[3px] text-sm font-medium">
              Legal
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-300 to-blue-400 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-400">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </motion.div>

        {/* Two Column Layout with Interactive Elements */}
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Left Sidebar - Navigation & Controls */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-8">
              {/* Theme & Highlight Controls */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                <h3 className="text-lg font-semibold mb-6">
                  Customize Experience
                </h3>

                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-gray-400 mb-3">
                      Highlight Color
                    </p>
                    <div className="flex gap-3 flex-wrap">
                      {[
                        "#22d3ee",
                        "#a855f7",
                        "#f97316",
                        "#22c55e",
                        "#ef4444",
                      ].map((color) => (
                        <button
                          key={color}
                          onClick={() => setHighlightColor(color)}
                          className={`w-10 h-10 rounded-2xl border-2 transition-all ${highlightColor === color ? "border-white scale-110" : "border-transparent"}`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                      className="w-full py-3 px-6 bg-white/10 hover:bg-white/20 rounded-2xl transition-all flex items-center justify-center gap-2"
                    >
                      Scroll to Top ↑
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Navigation */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                <h3 className="text-lg font-semibold mb-5">Quick Navigation</h3>
                <div className="space-y-2">
                  {privacySections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => {
                        toggleSection(section.id);
                        document.getElementById(section.id)?.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                      }}
                      className="w-full text-left px-5 py-3 rounded-2xl hover:bg-white/10 transition-all flex items-center gap-3 group"
                    >
                      <span className="text-xl">{section.icon}</span>
                      <span className="group-hover:text-cyan-400 transition-colors">
                        {section.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {privacySections.map((section, index) => (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <div
                  onClick={() => toggleSection(section.id)}
                  className={`bg-gradient-to-br from-white/5 to-white/10 border border-white/10 hover:border-cyan-400/50 rounded-3xl p-8 cursor-pointer transition-all duration-500 ${expandedSection === section.id ? "ring-2 ring-cyan-400/70" : ""}`}
                  style={{
                    borderColor:
                      expandedSection === section.id
                        ? highlightColor + "40"
                        : undefined,
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-5">
                      <div
                        className="text-4xl transition-transform group-hover:scale-110"
                        style={{ color: highlightColor }}
                      >
                        {section.icon}
                      </div>
                      <h2 className="text-3xl font-semibold">
                        {section.title}
                      </h2>
                    </div>
                    <motion.span
                      animate={{
                        rotate: expandedSection === section.id ? 180 : 0,
                      }}
                      className="text-3xl text-gray-400 group-hover:text-cyan-400 transition-colors"
                    >
                      ↓
                    </motion.span>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedSection === section.id ? "auto" : 0,
                      opacity: expandedSection === section.id ? 1 : 0,
                    }}
                    className="overflow-hidden"
                  >
                    <div className="pt-8 text-lg leading-relaxed text-gray-300">
                      {section.content}
                      <p className="mt-6 text-sm text-gray-500">
                        This is a comprehensive policy designed to be
                        transparent and user-friendly.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}

            {/* Final CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mt-16 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-400/20 rounded-3xl p-12 text-center"
            >
              <h3 className="text-3xl font-bold mb-4">Have Questions?</h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                If you have any concerns about your privacy, feel free to reach
                out.
              </p>
              <Link
                href="/contact"
                className="inline-block px-10 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Contact Privacy Team
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer Bar */}
      <footer className="border-t border-white/10 py-8 text-center text-sm text-gray-500">
        <div className="max-w-screen-2xl mx-auto px-6">
          © {new Date().getFullYear()} Dev Pocket. All rights reserved.
          <span className="mx-3">•</span>
          This Privacy Policy is protected by law.
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPage;
