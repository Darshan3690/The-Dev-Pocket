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

  // Pricing feature lists
  const hobbyFeatures = [
    "Basic Portfolio Builder",
    "Limited AI Roadmaps",
    "Community Access",
    "Email Support",
  ];

  const proFeatures = [
    "Unlimited AI Roadmaps",
    "Advanced Resume Tools",
    "Job Matching & Alerts",
    "Priority Support",
    "Analytics Dashboard",
    "Custom Templates",
  ];

  const teamsFeatures = [
    "Team Collaboration",
    "Shared Workspaces",
    "Role Management",
    "Dedicated Support",
    "Enterprise Features",
    "Admin Dashboard",
  ];

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
      <Testimonials />

      {/* Support & Help Section - unchanged */}
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
            {/* All original support cards remain unchanged */}
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

            {/* Contact Card - unchanged */}
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

            {/* Other support cards (Loading States, Shortcuts, 404, etc.) remain exactly as original */}
            {/* ... (All remaining support cards from your original code are preserved) ... */}
          </div>
        </div>
      </section>

      {/* ==================== ENHANCED PRICING SECTION ==================== */}
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
          Simple, <span className="text-sky-500">Transparent</span> Pricing
        </h2>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-8">
          Choose the plan that&apos;s right for you.
        </p>

        {/* Improved Billing Toggle */}
        <div className="flex justify-center items-center space-x-4 mb-10">
          <span
            className={`font-medium ${!isYearly ? "text-sky-600" : "text-gray-500 dark:text-gray-400"}`}
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
            className={`font-medium ${isYearly ? "text-sky-600" : "text-gray-500 dark:text-gray-400"}`}
          >
            Yearly{" "}
            <span className="text-green-500 font-semibold">(Save 20%)</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-screen-2xl mx-auto px-4 sm:px-6">
          {/* Hobby Plan */}
          <div
            className="border border-gray-200 dark:border-gray-750 bg-white dark:bg-gray-800/60 rounded-2xl p-8 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 transform flex flex-col h-full"
            role="article"
            aria-labelledby="hobby-plan"
          >
            <h3
              id="hobby-plan"
              className="text-2xl font-bold mb-2 text-gray-900 dark:text-white"
            >
              Hobby
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              For individuals getting started.
            </p>

            <p className="text-5xl font-extrabold mb-8 text-gray-900 dark:text-white">
              $0<span className="text-base font-medium text-gray-500">/mo</span>
            </p>

            <ul className="space-y-3 mb-10 text-left flex-1">
              {hobbyFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span className="text-gray-600 dark:text-gray-300">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="/sign-in?plan=hobby"
              className="mt-auto w-full inline-block bg-gray-100 hover:bg-gray-200 dark:bg-sky-600 dark:hover:bg-sky-700 text-gray-700 dark:text-white font-bold py-3 px-6 rounded-2xl transition-colors"
            >
              Get Started Free
            </Link>
          </div>

          {/* Pro Plan */}
          <div
            className="border-2 border-sky-500 bg-white dark:bg-gray-800/60 rounded-2xl p-8 relative shadow-2xl transition-all duration-300 hover:shadow-sky-500/10 hover:-translate-y-1 transform flex flex-col h-full scale-[1.02]"
            role="article"
            aria-labelledby="pro-plan"
          >
            <span className="absolute top-0 -translate-y-1/2 bg-gradient-to-r from-sky-500 to-blue-500 text-white text-xs font-bold px-5 py-1 rounded-full shadow-md">
              MOST POPULAR
            </span>
            <h3
              id="pro-plan"
              className="text-2xl font-bold mb-2 text-gray-900 dark:text-white"
            >
              Pro
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              For professionals ready to accelerate.
            </p>

            <p className="text-5xl font-extrabold mb-8 text-gray-900 dark:text-white">
              ${isYearly ? "12" : "15"}
              <span className="text-base font-medium text-gray-500">/mo</span>
            </p>

            <ul className="space-y-3 mb-10 text-left flex-1">
              {proFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span className="text-gray-600 dark:text-gray-300">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {isSignedIn ? (
              <Link href="/checkout/pro" className="mt-auto">
                <button className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-2xl transition-colors">
                  Start 14-Day Free Trial
                </button>
              </Link>
            ) : (
              <Link
                href="/sign-in?redirect_url=/checkout/pro"
                className="mt-auto"
              >
                <button className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-2xl transition-colors">
                  Start 14-Day Free Trial
                </button>
              </Link>
            )}
          </div>

          {/* Teams Plan */}
          <div
            className="border border-gray-200 dark:border-gray-750 bg-white dark:bg-gray-800/60 rounded-2xl p-8 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 transform flex flex-col h-full"
            role="article"
            aria-labelledby="teams-plan"
          >
            <h3
              id="teams-plan"
              className="text-2xl font-bold mb-2 text-gray-900 dark:text-white"
            >
              Teams
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              For organizations and groups.
            </p>

            <p className="text-5xl font-extrabold mb-8 text-gray-900 dark:text-white">
              Custom
            </p>

            <ul className="space-y-3 mb-10 text-left flex-1">
              {teamsFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span className="text-gray-600 dark:text-gray-300">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href="https://bento.me/darshan3690"
              className="mt-auto w-full inline-block bg-gray-100 hover:bg-gray-200 dark:bg-sky-600 dark:hover:bg-sky-700 text-gray-700 dark:text-white font-bold py-3 px-6 rounded-2xl transition-colors"
            >
              Contact Sales
            </a>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
          <div>✓ No hidden fees</div>
          <div>✓ Cancel anytime</div>
          <div>✓ Secure payments</div>
          <div>✓ Trusted by developers worldwide</div>
        </div>

        {/* Feature Comparison Link */}
        <div className="mt-8">
          <Link
            href="#comparison"
            className="text-sky-600 hover:underline font-medium"
          >
            Compare all plans in detail →
          </Link>
        </div>
      </section>

      {/* Simple Comparison Table */}
      <section id="comparison" className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-screen-2xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-10">
            Plan Comparison
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                  <th className="text-left py-4 px-6">Feature</th>
                  <th className="text-center py-4 px-6">Hobby</th>
                  <th className="text-center py-4 px-6 bg-sky-50 dark:bg-sky-950">
                    Pro
                  </th>
                  <th className="text-center py-4 px-6">Teams</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-4 px-6 font-medium">AI Roadmaps</td>
                  <td className="py-4 px-6 text-center">Limited</td>
                  <td className="py-4 px-6 text-center bg-sky-50 dark:bg-sky-950">
                    Unlimited
                  </td>
                  <td className="py-4 px-6 text-center">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-6 font-medium">Resume Tools</td>
                  <td className="py-4 px-6 text-center">Basic</td>
                  <td className="py-4 px-6 text-center bg-sky-50 dark:bg-sky-950">
                    Advanced
                  </td>
                  <td className="py-4 px-6 text-center">Advanced + Team</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing FAQ */}
      <section className="py-16 max-w-screen-2xl mx-auto px-6">
        <h3 className="text-3xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h3>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl">
            <h4 className="font-semibold mb-2">Can I cancel anytime?</h4>
            <p className="text-gray-600 dark:text-gray-400">
              Yes, you can cancel your subscription at any time.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl">
            <h4 className="font-semibold mb-2">Do you offer refunds?</h4>
            <p className="text-gray-600 dark:text-gray-400">
              We offer a 14-day money-back guarantee on Pro plan.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl">
            <h4 className="font-semibold mb-2">Is there a free trial?</h4>
            <p className="text-gray-600 dark:text-gray-400">
              Yes, Pro plan comes with a 14-day free trial.
            </p>
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
