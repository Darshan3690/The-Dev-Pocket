"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import Particles from "./components/ui/Particle";
import { useTheme } from "next-themes";
import { useUser } from "@clerk/nextjs";
import { useAccessibility } from "../lib/accessibility";
import { usePerformanceMonitoring } from "../lib/performance";
import { useErrorHandling } from "../lib/error-handling";
const Icon = ({
  children,
  ariaLabel,
}: {
  children: React.ReactNode;
  ariaLabel: string;
}) => (
  <div
    className="flex-shrink-0 w-12 h-12 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center mb-4"
    role="img"
    aria-label={ariaLabel}
  >
    {children}
  </div>
);
interface FeatureCardProps {
  icon: React.ReactNode;
  iconLabel: string;
  title: string;
  children: React.ReactNode;
  href: string;
}
const FeatureCard = ({
  icon,
  iconLabel,
  title,
  children,
  href,
}: FeatureCardProps) => (
  <Link href={href}>
    <article
      className="h-full flex flex-col justify-between bg-white dark:bg-gray-800 p-6 rounded-2xl
                 shadow-lg border border-gray-100 dark:border-gray-700
                 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2
                 transform cursor-pointer group"
    >
      <div>
        <div
          className="flex-shrink-0 w-12 h-12 bg-sky-100 dark:bg-sky-900 text-sky-600
                     rounded-full flex items-center justify-center mb-4
                     group-hover:scale-110 group-hover:bg-sky-200 transition-all"
          role="img"
          aria-label={iconLabel}
        >
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-sky-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
          {children}
        </p>
      </div>
      <div className="flex items-center text-sky-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity mt-auto">
        <span className="text-sm">Learn more</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 ml-1 transform group-hover:translate-x-2 transition-transform"
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
interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  avatar: string;
}
const TestimonialCard = ({
  quote,
  name,
  title,
  avatar,
}: TestimonialCardProps) => (
  <blockquote className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-200 text-left">
    <p className="text-gray-600 italic mb-4">&quot;{quote}&quot;</p>
    <footer className="flex items-center">
      <Image
        src={avatar}
        alt={`Profile photo of ${name}`}
        width={48}
        height={48}
        unoptimized
        className="w-12 h-12 rounded-full mr-4 border-2 border-sky-200"
      />
      <div>
        <cite className="font-bold text-gray-800 not-italic">{name}</cite>
        <p className="text-gray-500 text-sm">{title}</p>
      </div>
    </footer>
  </blockquote>
);
import { Button } from "@/components/ui/button";
import { HeroWithMockup } from "@/components/hero-with-mockup";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
const App = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [isYearly, setIsYearly] = useState(false);
  const { isSignedIn } = useUser();
  const useOnScreen = (
    options: IntersectionObserverInit,
  ): [React.RefObject<HTMLElement | null>, boolean] => {
    const ref = useRef<HTMLElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      }, options);
      if (ref.current) observer.observe(ref.current);
      return () => {
        if (ref.current) observer.unobserve(ref.current);
      };
    }, [ref, options]);
    return [ref, isVisible];
  };
  const [heroRef, heroVisible] = useOnScreen({ threshold: 0.3 });
  const [featuresRef, featuresVisible] = useOnScreen({ threshold: 0.2 });
  const [ctaRef, ctaVisible] = useOnScreen({ threshold: 0.3 });
  const [howItWorksRef, howItWorksVisible] = useOnScreen({ threshold: 0.25 });
  const [pricingRef, pricingVisible] = useOnScreen({ threshold: 0.25 });
  const [currentDate, setCurrentDate] = useState<string>("");
  useEffect(() => {
    const today = new Date();
    setCurrentDate(today.toDateString());
  }, []);
  return (
    <main className="pt-24">
      <section
        ref={heroRef}
        className={`transition-all duration-700 ease-out max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 ${
          heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <HeroWithMockup
          title="The AI-Powered Platform for Your Dev Career"
          description="Dev Pocket centralizes learning, personalized roadmaps, job updates, and powerful resume tools—all in one smart dashboard."
          primaryCta={{ text: "Get Started Free", href: "#pricing" }}
          mockupImage={{
            alt: "Dev Pocket Dashboard Mockup",
            width: 1000,
            height: 600,
            src: "https://placehold.co/1000x600/e0f2fe/0c4a6e?text=Dev+Pocket+UI",
          }}
        />
      </section>
      <motion.section
        ref={featuresRef}
        id="features"
        initial={{ opacity: 0, y: 40 }}
        animate={featuresVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-16 sm:py-24 text-center max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 max-w-4xl mx-auto leading-tight ${isDark ? "text-white" : "text-slate-900"}`}
        >
          <span className="text-sky-500 block mt-2 sm:mt-3">
            Everything You Need in One Place
          </span>
        </h2>
        <p
          className={`text-base sm:text-lg mb-8 max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}
        >
          Stop juggling multiple platforms. Dev Pocket brings everything
          together to accelerate your growth.
        </p>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-left items-stretch"
          role="list"
        >
          <FeatureCard
            title="Personalized Roadmaps"
            href="/create-roadmap"
            iconLabel="Lightning bolt icon representing personalized roadmaps"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
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
            iconLabel="Academic cap icon representing curated learning"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
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
            iconLabel="Search icon representing job search and matching"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
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
            iconLabel="Document icon representing resume and portfolio tools"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
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
      </motion.section>
      <section
        ref={howItWorksRef}
        id="how-it-works"
        aria-labelledby="how-it-works-heading"
        className={`py-10 sm:py-14 text-center transition-all duration-700 ease-out ${
          howItWorksVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <h2
          id="how-it-works-heading"
          className={`text-3xl sm:text-4xl font-bold mb-3 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Get Started in <span className="text-sky-500">3 Simple Steps</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-10">
          From signup to growth — your journey starts here.
        </p>
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 max-w-screen-xl mx-auto px-4 sm:px-6">
          {/* connector line */}
          <div className="hidden md:block absolute top-6 left-1/2 w-[70%] h-px bg-sky-500/20 -translate-x-1/2" />
          {/* Step 1 */}
          <div className="group relative text-center">
            <div className="w-12 h-12 bg-sky-500/10 border border-sky-500 rounded-full flex items-center justify-center text-lg font-bold text-sky-400 mx-auto mb-3 group-hover:scale-105 transition">
              1
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Sign Up
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs mx-auto">
              Create your free account and tell us about your career goals.
            </p>
          </div>
          {/* Step 2 */}
          <div className="group relative text-center">
            <div className="w-12 h-12 bg-sky-500/10 border border-sky-500 rounded-full flex items-center justify-center text-lg font-bold text-sky-400 mx-auto mb-3 group-hover:scale-105 transition">
              2
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Get Your Roadmap
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs mx-auto">
              Our AI analyzes your profile and generates a personalized plan.
            </p>
          </div>
          {/* Step 3 */}
          <div className="group relative text-center">
            <div className="w-12 h-12 bg-sky-500/10 border border-sky-500 rounded-full flex items-center justify-center text-lg font-bold text-sky-400 mx-auto mb-3 group-hover:scale-105 transition">
              3
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Start Growing
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs mx-auto">
              Follow your plan, track progress, and land your dream job.
            </p>
          </div>
        </div>
      </section>
      <HowItWorks />
      <Testimonials /> {/* Support & Help Section - NEW */}
      <section
        id="support"
        aria-labelledby="support-heading"
        className="bg-white py-12 text-center dark:bg-slate-950/40 sm:py-16"
      >
        <div className="max-w-screen-2xl mx-auto">
          <h2
            id="support-heading"
            className="mb-4 text-3xl font-bold text-slate-900 dark:text-slate-100 sm:text-4xl"
          >
            Need Help? We&apos;re Here for You
          </h2>
          <p className="mb-10 text-base text-slate-700 dark:text-slate-300 sm:text-lg">
            Get quick answers or reach out to our support team
          </p>
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4 sm:px-6 lg:px-8">
            {/* FAQ Card */}
            <Link
              href="/faq"
              className="flex h-full rounded-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 dark:focus-visible:ring-blue-900/70"
            >
              <article className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 p-8 rounded-2xl shadow-lg border-2 border-blue-200 dark:border-blue-800 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 transform cursor-pointer group flex flex-col w-full h-full">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-all">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
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
                </div>
                <h3 className="mb-3 text-2xl font-bold text-slate-900 transition-colors group-hover:text-blue-700 dark:text-slate-50 dark:group-hover:text-blue-300">
                  FAQ
                </h3>
                <p className="mb-4 text-slate-700 dark:text-slate-200">
                  Find quick answers to common questions and support
                </p>
                <div className="flex items-center justify-center text-blue-700 font-semibold opacity-0 transition-opacity group-hover:opacity-100 dark:text-blue-300">
                  <span className="text-sm">Browse FAQs</span>
                  <svg
                    className="h-4 w-4 ml-2 transform group-hover:translate-x-2 transition-transform"
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
            </Link>
            {/* Contact Card */}
            <Link
              href="/contact"
              className="flex h-full rounded-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200 dark:focus-visible:ring-green-900/70"
            >
              <article className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-8 rounded-2xl shadow-lg border-2 border-green-200 dark:border-green-800 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 transform cursor-pointer group flex flex-col w-full h-full">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-all">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
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
                </div>
                <h3 className="mb-3 text-2xl font-bold text-slate-900 transition-colors group-hover:text-green-700 dark:text-slate-50 dark:group-hover:text-green-300">
                  Contact Us
                </h3>
                <p className="mb-4 text-slate-700 dark:text-slate-200">
                  Get in touch with our support team for help
                </p>
                <div className="flex items-center justify-center text-green-700 font-semibold opacity-0 transition-opacity group-hover:opacity-100 dark:text-green-300">
                  <span className="text-sm">Send a Message</span>
                  <svg
                    className="h-4 w-4 ml-2 transform group-hover:translate-x-2 transition-transform"
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
            </Link>
            {/* Loading States Demo Card */}
            <Link
              href="/loading-demo"
              className="flex h-full rounded-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-200 dark:focus-visible:ring-orange-900/70"
            >
              <article className="bg-gradient-to-br from-orange-50 to-pink-50 dark:from-orange-950/30 dark:to-pink-950/30 p-8 rounded-2xl shadow-lg border-2 border-orange-200 dark:border-orange-800 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 transform cursor-pointer group flex flex-col w-full h-full">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-600 text-white rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-all">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 animate-spin"
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
                </div>
                <h3 className="mb-3 text-2xl font-bold text-slate-900 transition-colors group-hover:text-orange-700 dark:text-slate-50 dark:group-hover:text-orange-300">
                  Loading States
                </h3>
                <p className="mb-4 text-slate-700 dark:text-slate-200">
                  Explore beautiful loading components and skeletons
                </p>
                <div className="flex items-center justify-center text-orange-700 font-semibold opacity-0 transition-opacity group-hover:opacity-100 dark:text-orange-300">
                  <span className="text-sm">View Demo</span>
                  <svg
                    className="h-4 w-4 ml-2 transform group-hover:translate-x-2 transition-transform"
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
            </Link>
            {/* Keyboard Shortcuts Card */}
            <Link
              href="/shortcuts"
              className="flex h-full rounded-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose-200 dark:focus-visible:ring-rose-900/70"
            >
              <article className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 p-8 rounded-2xl shadow-lg border-2 border-rose-200 dark:border-rose-800 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 transform cursor-pointer group flex flex-col w-full h-full">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 text-white rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-all">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
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
                </div>
                <h3 className="mb-3 text-2xl font-bold text-slate-900 transition-colors group-hover:text-rose-700 dark:text-slate-50 dark:group-hover:text-rose-300">
                  Shortcuts
                </h3>
                <p className="mb-4 text-slate-700 dark:text-slate-200">
                  Master keyboard shortcuts to navigate like pro
                </p>
                <div className="flex items-center justify-center text-rose-700 font-semibold opacity-0 transition-opacity group-hover:opacity-100 dark:text-rose-300">
                  <span className="text-sm">View Shortcuts</span>
                  <svg
                    className="h-4 w-4 ml-2 transform group-hover:translate-x-2 transition-transform"
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
            </Link>
            {/* 404 Page Demo Card */}
            <Link
              href="/this-page-does-not-exist"
              className="flex h-full rounded-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-200 dark:focus-visible:ring-violet-900/70"
            >
              <article className="bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-950/30 dark:to-indigo-950/30 p-8 rounded-2xl shadow-lg border-2 border-violet-200 dark:border-violet-800 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 transform cursor-pointer group flex flex-col w-full h-full">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-violet-500 to-indigo-600 text-white rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-all">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
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
                </div>
                <h3 className="mb-3 text-2xl font-bold text-slate-900 transition-colors group-hover:text-violet-700 dark:text-slate-50 dark:group-hover:text-violet-300">
                  404 Page
                </h3>
                <p className="mb-4 text-slate-700 dark:text-slate-200">
                  See our beautiful custom error page design
                </p>
                <div className="flex items-center justify-center text-violet-700 font-semibold opacity-0 transition-opacity group-hover:opacity-100 dark:text-violet-300">
                  <span className="text-sm">View Demo</span>
                  <svg
                    className="h-4 w-4 ml-2 transform group-hover:translate-x-2 transition-transform"
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
            </Link>
            {/* Enhanced Footer Card */}
            <a
              href="#footer"
              className="flex h-full rounded-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 dark:focus-visible:ring-emerald-900/70"
            >
              <article className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 p-8 rounded-2xl shadow-lg border-2 border-emerald-200 dark:border-emerald-800 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 transform cursor-pointer group flex flex-col w-full h-full">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-all">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
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
                </div>
                <h3 className="mb-3 text-2xl font-bold text-slate-900 transition-colors group-hover:text-emerald-700 dark:text-slate-50 dark:group-hover:text-emerald-300">
                  Enhanced Footer
                </h3>
                <p className="mb-4 text-slate-700 dark:text-slate-200">
                  Beautiful footer with social links and newsletter
                </p>
                <div className="flex items-center justify-center text-emerald-700 font-semibold opacity-0 transition-opacity group-hover:opacity-100 dark:text-emerald-300">
                  <span className="text-sm">Scroll Down</span>
                  <svg
                    className="h-4 w-4 ml-2 transform group-hover:translate-x-2 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </div>
              </article>
            </a>
            {/* Onboarding Tutorial Card */}
            <button
              onClick={() => {
                localStorage.removeItem("onboarding-completed");
                window.dispatchEvent(new Event("restart-onboarding"));
              }}
              className="text-left w-full flex h-full justify-self-center"
            >
              <article className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 p-8 rounded-2xl shadow-lg border-2 border-amber-200 dark:border-amber-800 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 transform cursor-pointer group flex flex-col w-full items-center text-center">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-amber-500 to-yellow-600 text-white rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-all">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
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
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  Tutorial
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Take an interactive tour to discover features
                </p>
                <div className="flex items-center justify-center text-amber-600 dark:text-amber-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm">Start Tour</span>
                  <svg
                    className="h-4 w-4 ml-2 transform group-hover:translate-x-2 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </article>
            </button>
            {/* Newsletter Card */}
            <a href="#footer" className="flex h-full">
              <article className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 p-8 rounded-2xl shadow-lg border-2 border-cyan-200 dark:border-cyan-800 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 transform cursor-pointer group flex flex-col w-full h-full">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-all">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
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
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  Newsletter
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Subscribe to get updates and developer tips
                </p>
                <div className="flex items-center justify-center text-cyan-600 dark:text-cyan-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm">Subscribe Now</span>
                  <svg
                    className="h-4 w-4 ml-2 transform group-hover:translate-x-2 transition-transform"
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
            </a>
          </div>
        </div>
      </section>
      {/* Pricing */}
      <section
        ref={pricingRef}
        id="pricing"
        aria-labelledby="pricing-heading"
        className={`py-12 sm:py-10 text-center transition-all duration-700 ease-out ${
          pricingVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <h2
          id="pricing-heading"
          className="text-4xl sm:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white"
        >
          <span className="relative">
            Simple
            <span className="absolute left-0 -bottom-1 w-full h-1 bg-sky-500/30 rounded-full"></span>
          </span>
          , <span className="text-sky-500">Transparent</span> Pricing
        </h2>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-8">
          Choose the plan that&apos;s right for you.
        </p>
        <div className="flex justify-center items-center space-x-4 mb-10">
          <span
            className={`font-medium ${
              !isYearly ? "text-sky-600" : "text-gray-500 dark:text-gray-400"
            }`}
            id="monthly-label"
          >
            Monthly
          </span>
          <label
            className="relative inline-flex items-center cursor-pointer"
            htmlFor="billing-toggle"
          >
            <input
              id="billing-toggle"
              type="checkbox"
              checked={isYearly}
              onChange={() => setIsYearly(!isYearly)}
              className="sr-only peer"
              aria-describedby="yearly-label"
              aria-label="Toggle between monthly and yearly billing"
            />
            <div className="w-14 h-7 bg-gray-200 dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
          </label>
          <span
            className={`font-medium ${
              isYearly ? "text-sky-600" : "text-gray-500 dark:text-gray-400"
            }`}
            id="yearly-label"
          >
            Yearly{" "}
            <span className="text-sm text-green-500 font-semibold">
              (Save 20%)
            </span>
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-screen-2xl mx-auto px-4 sm:px-6">
          <div
            className="border border-gray-200 dark:border-gray-750 bg-white dark:bg-gray-800/60 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 transform group"
            role="article"
            aria-labelledby="hobby-plan"
          >
            <h3
              id="hobby-plan"
              className="text-xl font-bold mb-2 text-gray-900 dark:text-white"
            >
              Hobby
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              For individuals getting started.
            </p>
            <p className="text-4xl font-extrabold mb-5 text-gray-900 dark:text-white">
              <span aria-label="0 dollars">$0</span>
              <span className="text-base font-medium text-gray-550 dark:text-gray-400">
                /mo
              </span>
            </p>
            <ul className="space-y-3 mb-8 text-left text-sm">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Basic Portfolio
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Limited Resources
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Community Access
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Email Support
              </li>
            </ul>
            <Link
              href="/sign-in?plan=hobby"
              className="w-full inline-block bg-gray-100 hover:bg-gray-200 dark:bg-sky-600 dark:hover:bg-sky-700 text-gray-700 dark:text-white font-bold py-2.5 px-6 rounded-full transition-colors focus:outline-none focus:ring-4 focus:ring-gray-300 focus:ring-opacity-50 cursor-pointer"
              aria-describedby="hobby-plan"
            >
              Get Started Free
            </Link>
          </div>
          <div
            className="border-2 border-sky-500 bg-white dark:bg-gray-800/60 rounded-2xl p-6 relative shadow-2xl transition-all duration-300 hover:shadow-sky-500/10 hover:-translate-y-1 transform group"
            role="article"
            aria-labelledby="pro-plan"
          >
            <span className="absolute top-0 -translate-y-1/2 bg-gradient-to-r from-sky-500 to-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md">
              MOST POPULAR
            </span>
            <h3
              id="pro-plan"
              className="text-xl font-bold mb-2 text-gray-900 dark:text-white"
            >
              Pro
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              For professionals ready to accelerate.
            </p>
            <motion.p
              className="text-4xl font-extrabold mb-5 text-gray-900 dark:text-white"
              key={isYearly ? "yearly" : "monthly"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span aria-label={`${isYearly ? "12" : "15"} dollars`}>
                ${isYearly ? "12" : "15"}
              </span>
              <span className="text-base font-medium text-gray-550 dark:text-gray-400">
                /mo
              </span>
              {isYearly && (
                <span className="block text-sm text-green-500 font-medium">
                  Billed yearly • Save $36/year
                </span>
              )}
            </motion.p>
            <ul className="space-y-3 mb-8 text-left text-sm">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Unlimited Resources
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Advanced Features
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Priority Support
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Customization Options
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Analytics Dashboard
              </li>
            </ul>
            {isSignedIn ? (
              <Link href="/checkout/pro" className="w-full block">
                <button className="w-full bg-sky-600 text-white font-bold py-2.5 px-6 rounded-full hover:bg-sky-700 transition-colors focus:outline-none focus:ring-4 focus:ring-sky-300 focus:ring-opacity-50 cursor-pointer">
                  Start 14-Day Free Trial
                </button>
              </Link>
            ) : (
              <Link
                href="/sign-in?redirect_url=/checkout/pro"
                className="w-full block"
              >
                <button className="w-full bg-sky-600 text-white font-bold py-2.5 px-6 rounded-full hover:bg-sky-700 transition-colors focus:outline-none focus:ring-4 focus:ring-sky-300 focus:ring-opacity-50 cursor-pointer">
                  Start 14-Day Free Trial
                </button>
              </Link>
            )}
          </div>
          <div
            className="border border-gray-200 dark:border-gray-750 bg-white dark:bg-gray-800/60 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 transform group"
            role="article"
            aria-labelledby="teams-plan"
          >
            <h3
              id="teams-plan"
              className="text-xl font-bold mb-2 text-gray-900 dark:text-white"
            >
              Teams
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              For organizations and groups.
            </p>
            <p
              className="text-3xl font-extrabold mb-5 text-gray-900 dark:text-white"
              aria-label="Custom pricing"
            >
              Custom
            </p>
            <ul className="space-y-3 mb-8 text-left text-sm">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Team Collaboration
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Shared Workspaces
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Role Management
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Dedicated Support
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Enterprise Features
              </li>
            </ul>
            <a
              href="https://bento.me/darshan3690"
              className="w-full inline-block bg-gray-100 hover:bg-gray-200 dark:bg-sky-600 dark:hover:bg-sky-700 text-gray-700 dark:text-white font-bold py-2.5 px-6 rounded-full transition-colors focus:outline-none focus:ring-4 focus:ring-gray-300 focus:ring-opacity-50 cursor-pointer"
              aria-describedby="teams-plan"
            >
              Contact Sales Team
            </a>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span> No hidden fees
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span> Cancel anytime
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span> Secure payments
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span> Trusted by developers
            worldwide
          </div>
        </div>

        {/* Feature Comparison Section */}
        <div className="mt-16 max-w-5xl mx-auto px-4">
          <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
            Compare Plans
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-4 pr-6 font-medium text-gray-500 dark:text-gray-400">
                    Features
                  </th>
                  <th className="py-4 px-6 text-center font-semibold text-gray-900 dark:text-white">
                    Hobby
                  </th>
                  <th className="py-4 px-6 text-center font-semibold text-sky-600 border-x border-gray-200 dark:border-gray-700">
                    Pro
                  </th>
                  <th className="py-4 px-6 text-center font-semibold text-gray-900 dark:text-white">
                    Teams
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                <tr>
                  <td className="py-4 pr-6 font-medium">
                    Personalized Roadmaps
                  </td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                  <td className="py-4 px-6 text-center text-green-500 border-x">
                    ✓
                  </td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                </tr>
                <tr>
                  <td className="py-4 pr-6 font-medium">Unlimited Resources</td>
                  <td className="py-4 px-6 text-center text-gray-400">—</td>
                  <td className="py-4 px-6 text-center text-green-500 border-x">
                    ✓
                  </td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                </tr>
                <tr>
                  <td className="py-4 pr-6 font-medium">Priority Support</td>
                  <td className="py-4 px-6 text-center text-gray-400">—</td>
                  <td className="py-4 px-6 text-center text-green-500 border-x">
                    ✓
                  </td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                </tr>
                <tr>
                  <td className="py-4 pr-6 font-medium">Team Collaboration</td>
                  <td className="py-4 px-6 text-center text-gray-400">—</td>
                  <td className="py-4 px-6 text-center text-gray-400 border-x">
                    —
                  </td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                </tr>
                <tr>
                  <td className="py-4 pr-6 font-medium">Analytics Dashboard</td>
                  <td className="py-4 px-6 text-center text-gray-400">—</td>
                  <td className="py-4 px-6 text-center text-green-500 border-x">
                    ✓
                  </td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-2xl mx-auto px-4">
          <h3 className="text-2xl font-semibold mb-8 text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h3>
          <div className="space-y-6 text-left">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Can I cancel anytime?
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Yes, you can cancel your subscription at any time with no
                penalties.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Do you offer refunds?
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                We offer a 14-day money-back guarantee on all paid plans.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Can I upgrade later?
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Absolutely. You can upgrade or downgrade your plan anytime from
                your dashboard.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Is there a free trial?
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Yes, Pro plan includes a 14-day free trial. No credit card
                required to start.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="py-15 flex flex-col items-center gap-4">
        <p className="text-xs text-gray-500 dark:text-gray-400 italic tracking-wide">
          Prices last updated on {currentDate}
        </p>
        <Button
          asChild
          className="bg-sky-600 text-white px-8 py-4 rounded-full hover:bg-sky-700 transition text-lg sm:text-xl whitespace-nowrap"
        >
          <Link href="#demo">Schedule My Free Demo Now</Link>
        </Button>
      </div>
    </main>
  );
};
export default App;
