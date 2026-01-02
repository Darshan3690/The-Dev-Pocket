"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";

// UI Components
import { Button } from "@/components/ui/button";
import { HeroWithMockup } from "@/components/hero-with-mockup";
import FeaturesSectionWithHoverEffects from "./components/FeaturedSection";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";

// Utils
import { cn } from "@/lib/utils";

// --- Sub-Components ---

// A background component to give the page texture
const AmbientBackground = () => (
  <div className="fixed inset-0 z-[-1] pointer-events-none">
    <div className="absolute inset-0 bg-white dark:bg-slate-950 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-sky-400 opacity-20 blur-[100px]"></div>
    <div className="absolute right-0 bottom-0 -z-10 h-[310px] w-[310px] rounded-full bg-indigo-500 opacity-10 blur-[100px]"></div>
  </div>
);

const FadeInSection = ({
  children,
  className,
  id,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, ease: "easeOut", delay }}
    className={className}
  >
    {children}
  </motion.section>
);

const FeatureCard = ({
  icon,
  title,
  children,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  href: string;
}) => (
  <Link href={href} className="block h-full group">
    <article className="h-full flex flex-col justify-between bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-gray-200 dark:border-slate-800 transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/10 hover:-translate-y-1 hover:border-sky-200 dark:hover:border-sky-800">
      <div>
        <div className="w-12 h-12 bg-gradient-to-br from-sky-100 to-indigo-100 dark:from-sky-900/30 dark:to-indigo-900/30 text-sky-600 rounded-xl flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-sky-600 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          {children}
        </p>
      </div>
      <div className="flex items-center text-sky-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
        <span>Learn more</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 ml-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </div>
    </article>
  </Link>
);

interface SupportItemProps {
  title: string;
  desc: string;
  href: string;
  icon: React.ReactNode;
  gradient: string;
  border: string;
  text: string;
  cta: string;
  onClick?: () => void;
}

const SupportCard = ({ item }: { item: SupportItemProps }) => {
  const CardContent = () => (
    <article
      className={cn(
        "relative h-full p-8 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group flex flex-col w-full border bg-opacity-40 backdrop-blur-sm",
        item.border,
        "bg-white dark:bg-slate-900"
      )}
    >
      {/* Decorative Gradient Background (Low Opacity) */}
      <div
        className={cn(
          "absolute inset-0 opacity-[0.08] dark:opacity-[0.15] transition-opacity group-hover:opacity-20 bg-gradient-to-br",
          item.gradient
        )}
      />

      <div
        className={cn(
          "relative flex-shrink-0 w-14 h-14 text-white rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-all shadow-md bg-gradient-to-br",
          item.text
            .replace("text-", "from-")
            .replace("600", "500")
            .replace("400", "500") + " to-gray-400" // Quick hack to generate icon bg from text color or just use inline styles
        )}
        style={{ backgroundImage: `var(--tw-gradient-stops)` }} // Rely on the passed classes mostly, but icon bg needs pop
      >
        {/* We can re-use the item.gradient for the icon background to match perfectly */}
        <div
          className={cn(
            "absolute inset-0 rounded-2xl opacity-100 bg-gradient-to-br",
            item.gradient
          )}
        />
        <div className="relative z-10 text-gray-700 dark:text-white">
          {item.icon}
        </div>
      </div>

      <h3
        className={cn(
          "relative text-xl font-bold mb-2 transition-colors text-gray-900 dark:text-gray-100",
          `group-hover:${item.text.split(" ")[0]}`
        )}
      >
        {item.title}
      </h3>
      <p className="relative text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
        {item.desc}
      </p>

      <div
        className={cn(
          "relative flex items-center font-semibold text-sm mt-auto transition-all",
          item.text
        )}
      >
        <span className="group-hover:mr-2 transition-all">{item.cta}</span>
        <svg
          className="h-4 w-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </div>
    </article>
  );

  if (item.onClick) {
    return (
      <button onClick={item.onClick} className="text-left w-full h-full">
        <CardContent />
      </button>
    );
  }
  return (
    <Link href={item.href} className="flex h-full">
      <CardContent />
    </Link>
  );
};

// --- Main Component ---

const App = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [isYearly, setIsYearly] = useState(false);
  const { isSignedIn } = useUser();
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    setCurrentDate(new Date().toDateString());
  }, []);

  // Support Data
  const supportItems: SupportItemProps[] = [
    {
      title: "FAQ",
      desc: "Find quick answers to common questions and support",
      href: "/faq",
      cta: "Browse FAQs",
      gradient:
        "from-blue-50 to-purple-50 dark:from-blue-900/40 dark:to-purple-900/40",
      border: "border-blue-100 dark:border-blue-900/50",
      text: "text-blue-600 dark:text-blue-400",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Contact Us",
      desc: "Get in touch with our support team for help",
      href: "/contact",
      cta: "Send a Message",
      gradient:
        "from-green-50 to-emerald-50 dark:from-green-900/40 dark:to-emerald-900/40",
      border: "border-green-100 dark:border-green-900/50",
      text: "text-green-600 dark:text-green-400",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: "Loading States",
      desc: "Explore beautiful loading components and skeletons",
      href: "/loading-demo",
      cta: "View Demo",
      gradient:
        "from-orange-50 to-pink-50 dark:from-orange-900/40 dark:to-pink-900/40",
      border: "border-orange-100 dark:border-orange-900/50",
      text: "text-orange-600 dark:text-orange-400",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 animate-spin"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      ),
    },
    {
      title: "Shortcuts",
      desc: "Master keyboard shortcuts to navigate like pro",
      href: "/shortcuts",
      cta: "View Shortcuts",
      gradient:
        "from-rose-50 to-pink-50 dark:from-rose-900/40 dark:to-pink-900/40",
      border: "border-rose-100 dark:border-rose-900/50",
      text: "text-rose-600 dark:text-rose-400",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
      ),
    },
    {
      title: "404 Page",
      desc: "See our beautiful custom error page design",
      href: "/this-page-does-not-exist",
      cta: "View Demo",
      gradient:
        "from-violet-50 to-indigo-50 dark:from-violet-900/40 dark:to-indigo-900/40",
      border: "border-violet-100 dark:border-violet-900/50",
      text: "text-violet-600 dark:text-violet-400",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Enhanced Footer",
      desc: "Beautiful footer with social links and newsletter",
      href: "#footer",
      cta: "Scroll Down",
      gradient:
        "from-emerald-50 to-teal-50 dark:from-emerald-900/40 dark:to-teal-900/40",
      border: "border-emerald-100 dark:border-emerald-900/50",
      text: "text-emerald-600 dark:text-emerald-400",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
      ),
    },
    {
      title: "Tutorial",
      desc: "Take an interactive tour to discover features",
      href: "#",
      cta: "Start Tour",
      onClick: () => {
        localStorage.removeItem("onboarding-completed");
        window.dispatchEvent(new Event("restart-onboarding"));
      },
      gradient:
        "from-amber-50 to-yellow-50 dark:from-amber-900/40 dark:to-yellow-900/40",
      border: "border-amber-100 dark:border-amber-900/50",
      text: "text-amber-600 dark:text-amber-400",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },
    {
      title: "Newsletter",
      desc: "Subscribe to get updates and developer tips",
      href: "#footer",
      cta: "Subscribe Now",
      gradient:
        "from-cyan-50 to-blue-50 dark:from-cyan-900/40 dark:to-blue-900/40",
      border: "border-cyan-100 dark:border-cyan-900/50",
      text: "text-cyan-600 dark:text-cyan-400",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <main className="relative min-h-screen">
      <AmbientBackground />

      {/* Hero Section */}
      <FadeInSection className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible pt-20 pb-12 text-center">
        {/* 1. The Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-sm font-medium mb-8 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
          </span>
          Future of Dev is Here
        </div>

        {/* 2. The Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-gray-900 dark:text-white leading-[1.1]">
          The{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 dark:from-sky-400 dark:via-blue-500 dark:to-indigo-500 animate-gradient-x">
            AI-Powered
          </span>
          <br className="hidden sm:block" /> Platform for Your{" "}
          <br className="hidden sm:block" />
          <span className="relative inline-block">
            <span className="relative text-gray-900 dark:text-white">
              Dev Career
            </span>
          </span>
        </h1>

        {/* 3. The Subtitle */}
        <p className="mt-8 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Centralize your learning, automate your roadmap, and land your dream
          job with the only dashboard built for modern developers.
        </p>
      </FadeInSection>

      {/* Features Grid */}
      <FadeInSection
        id="features"
        className="py-20 sm:py-28 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 text-sm font-semibold tracking-wide">
          FEATURES
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white tracking-tight">
          All the Tools You Need,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600 dark:from-sky-400 dark:to-indigo-400">
            in One Place
          </span>
        </h2>
        <p className="text-lg sm:text-xl mb-16 max-w-2xl mx-auto text-gray-600 dark:text-gray-400 leading-relaxed">
          Stop juggling multiple platforms. Dev Pocket brings everything
          together to accelerate your growth.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <FeatureCard
            title="Personalized Roadmaps"
            href="/create-roadmap"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            }
          >
            Our AI crafts a custom learning path based on your goals and skill
            level.
          </FeatureCard>

          <FeatureCard
            title="Curated Learning"
            href="/dashboard"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v11.494m-5.22-8.485l10.44 0M17.22 6.253L6.78 17.747M6.78 6.253l10.44 11.494"
                />
              </svg>
            }
          >
            Access top-tier courses, tutorials, and articles all in one place.
          </FeatureCard>

          <FeatureCard
            title="Job Search & Matching"
            href="/job"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            }
          >
            Find roles perfectly matched to your skills and interests.
          </FeatureCard>

          <FeatureCard
            title="Resume & Portfolio Tools"
            href="/dashboard/resume"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            }
          >
            Build professional resumes and portfolios with AI-powered templates.
          </FeatureCard>
        </div>
      </FadeInSection>

      {/* How It Works */}
      <FadeInSection
        id="how-it-works"
        className="py-16 sm:py-24 text-center max-w-7xl mx-auto px-4"
      >
        <h2 className="text-3xl sm:text-5xl font-extrabold mb-16 text-gray-900 dark:text-white tracking-tight">
          Get Started in 3 Simple Steps
        </h2>
        <div className="relative mt-12 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-sky-300 dark:via-sky-700 to-transparent" />

          {[
            {
              step: 1,
              title: "Sign Up",
              desc: "Create your free account and tell us about your career goals.",
            },
            {
              step: 2,
              title: "Get Your Roadmap",
              desc: "Our AI analyzes your profile and generates a personalized plan.",
            },
            {
              step: 3,
              title: "Start Growing",
              desc: "Follow your plan, track progress, and land your dream job.",
            },
          ].map((item) => (
            <div key={item.step} className="relative group z-10">
              <div className="w-16 h-16 bg-white dark:bg-slate-900 border-4 border-sky-50 dark:border-sky-900/50 rounded-full flex items-center justify-center text-2xl font-bold text-sky-600 mx-auto mb-6 shadow-xl shadow-sky-500/10 group-hover:scale-110 group-hover:border-sky-200 transition-all duration-300">
                {item.step}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-xs mx-auto leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </FadeInSection>

      {/* Complex Components */}
      <div className="space-y-12 sm:space-y-24">
        <FeaturesSectionWithHoverEffects />
        <HowItWorks />
        <Testimonials />
      </div>

      {/* Support Section */}
      <FadeInSection id="support" className="py-20 sm:py-32 text-center px-4">
        <div className="max-w-7xl mx-auto">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-semibold tracking-wide">
            SUPPORT
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
            Need Help? We&apos;re Here for You
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto">
            Get quick answers or reach out to our support team
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {supportItems.map((item, idx) => (
              <SupportCard key={idx} item={item} />
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* Pricing Section */}
      <FadeInSection
        id="pricing"
        className="py-20 sm:py-28 text-center max-w-7xl mx-auto px-4"
      >
        <h2 className="text-3xl sm:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white tracking-tight">
          Simple, Transparent Pricing
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-xl mx-auto">
          Choose the plan that&apos;s right for you. No hidden fees.
        </p>

        {/* Billing Toggle */}
        <div className="flex justify-center items-center space-x-4 mb-14 bg-white dark:bg-slate-900 w-fit mx-auto px-6 py-2 rounded-full border border-gray-200 dark:border-slate-800 shadow-sm">
          <span
            className={`font-medium transition-colors cursor-pointer ${
              !isYearly ? "text-sky-600" : "text-gray-500"
            }`}
            onClick={() => setIsYearly(false)}
          >
            Monthly
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isYearly}
              onChange={() => setIsYearly(!isYearly)}
              className="sr-only peer"
            />
            <div className="w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer peer-focus:ring-2 peer-focus:ring-sky-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
          </label>
          <span
            className={`font-medium transition-colors cursor-pointer ${
              isYearly ? "text-sky-600" : "text-gray-500"
            }`}
            onClick={() => setIsYearly(true)}
          >
            Yearly{" "}
            <span className="text-xs text-emerald-600 font-bold ml-1 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full">
              -20%
            </span>
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {/* Hobby */}
          <div className="group relative border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 rounded-3xl p-8 flex flex-col hover:border-gray-300 dark:hover:border-slate-700 transition-all duration-300">
            <h3 className="text-xl font-bold mb-2">Hobby</h3>
            <p className="text-gray-500 mb-6 text-sm">
              For individuals getting started.
            </p>
            <p className="text-4xl font-extrabold mb-8 text-gray-900 dark:text-white">
              $0<span className="text-base font-medium text-gray-500">/mo</span>
            </p>
            <Link
              href="/sign-in?plan=hobby"
              className="mt-auto w-full inline-block bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white font-bold py-3 px-6 rounded-xl hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Pro */}
          <div className="relative border-2 border-sky-500 bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-2xl shadow-sky-500/10 transform md:-translate-y-4 flex flex-col z-10">
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
              Most Popular
            </span>
            <h3 className="text-xl font-bold mb-2">Pro</h3>
            <p className="text-gray-500 mb-6 text-sm">
              For professionals ready to accelerate.
            </p>
            <p className="text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600">
              ${isYearly ? "12" : "15"}
              <span className="text-base font-medium text-gray-500 text-foreground">
                /mo
              </span>
            </p>
            <Link
              href={
                isSignedIn
                  ? "/checkout/pro"
                  : "/sign-in?redirect_url=/checkout/pro"
              }
              className="mt-auto w-full bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-sky-500/30 transition-all duration-300"
            >
              Start Free Trial
            </Link>
          </div>

          {/* Teams */}
          <div className="group border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 rounded-3xl p-8 flex flex-col hover:border-gray-300 dark:hover:border-slate-700 transition-all duration-300">
            <h3 className="text-xl font-bold mb-2">Teams</h3>
            <p className="text-gray-500 mb-6 text-sm">
              For organizations and groups.
            </p>
            <p className="text-4xl font-extrabold mb-8 text-gray-900 dark:text-white">
              Custom
            </p>
            <a
              href="https://bento.me/darshan3690"
              className="mt-auto w-full inline-block bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white font-bold py-3 px-6 rounded-xl hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </FadeInSection>

      <div className="text-center text-gray-400 text-sm mt-12 mb-6 font-medium">
        <p>📅 Today’s Date: {currentDate}</p>
      </div>

      <FadeInSection className="text-center py-24 px-4">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-sky-500 blur-[60px] opacity-20 rounded-full"></div>
          <Button
            asChild
            className="relative bg-sky-600 text-white px-10 py-8 rounded-full hover:bg-sky-500 transition-all duration-300 text-lg sm:text-xl font-bold shadow-2xl shadow-sky-500/40 hover:scale-105 hover:shadow-sky-500/60"
          >
            <Link href="#demo" className="flex items-center gap-2">
              Schedule My Free{" "}
              <span className="hidden sm:inline mx-1">Discovery</span> Demo Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </Button>
        </div>
      </FadeInSection>
    </main>
  );
};

export default App;
