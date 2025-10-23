"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import Particles from "./components/ui/Particle";
import { useTheme } from "next-themes";

// Import enhanced utilities
import { useAccessibility } from "../lib/accessibility";
import { usePerformanceMonitoring } from "../lib/performance";
import { useErrorHandling } from "../lib/error-handling";

 

// Page components — authentication UI is provided by root `ClerkProvider` and header.

// Helper component for Icons
const Icon = ({ children, ariaLabel }: { children: React.ReactNode; ariaLabel: string }) => (
  <div 
    className="flex-shrink-0 w-12 h-12 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center mb-4"
    role="img"
    aria-label={ariaLabel}
  >
    {children}
  </div>
);

// Updated Feature Card Component with clickable functionality
interface FeatureCardProps {
  icon: React.ReactNode;
  iconLabel: string;
  title: string;
  children: React.ReactNode;
  href: string;
}

const FeatureCard = ({ icon, iconLabel, title, children, href }: FeatureCardProps) => (
  <Link href={href}>
    <article
      className="h-full flex flex-col justify-between bg-white dark:bg-gray-800 p-6 rounded-2xl 
                 shadow-lg border border-gray-100 dark:border-gray-700 
                 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 
                 transform cursor-pointer group"
    >
      {/* Top content */}
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

      {/* Bottom “Learn more” */}
      <div className="flex items-center text-sky-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity mt-auto">
        <span className="text-sm">Learn more</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 ml-1 transform group-hover:translate-x-2 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </div>
    </article>
  </Link>
);


// Testimonial Card Component
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
import FeaturesSectionWithHoverEffects from "./components/FeaturedSection";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";

const App = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [isYearly, setIsYearly] = useState(false);

  // Intersection Observer Hook
  const useOnScreen = (options: IntersectionObserverInit): [React.RefObject<HTMLElement | null>, boolean] => {
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

  // Refs for sections
  const [heroRef, heroVisible] = useOnScreen({ threshold: 0.3 });
  const [featuresRef, featuresVisible] = useOnScreen({ threshold: 0.2 });
  const [ctaRef, ctaVisible] = useOnScreen({ threshold: 0.3 });

  // Current Date
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    const today = new Date();
    setCurrentDate(today.toDateString());
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className={`transition-all duration-700 ease-out max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${
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

      {/* Features */}
      <motion.section
        ref={featuresRef}
        id="features"
        initial={{ opacity: 0, y: 40 }}
        animate={featuresVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-16 sm:py-24 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
<h2
  className={`text-3xl sm:text-4xl font-bold mb-4 ${
    isDark ? "text-white" : "text-gray-900"
  }`}
>
  All the Tools You Need, in One Place
</h2>

         <p className={`text-base sm:text-lg mb-8 max-w-3xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>
           Stop juggling multiple platforms. Dev Pocket brings everything
           together to accelerate your growth.
         </p>
        <div
  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left items-stretch"
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
    Our AI crafts a custom learning path based on your goals and skill level.
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

      {/* How It Works */}
      <section
        ref={howItWorksRef}
        id="how-it-works"
        aria-labelledby="how-it-works-heading"
        className={`py-12 sm:py-16 text-center transition-all duration-700 ease-out ${
          howItWorksVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <h2 id="how-it-works-heading" className={`text-3xl sm:text-4xl font-bold mb-4 ${
    isDark ? "text-white" : "text-gray-900"
  }`}>
          Get Started in 3 Simple Steps
        </h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="relative">
            <div className="w-12 h-12 bg-white border-2 border-sky-200 rounded-full flex items-center justify-center text-xl font-bold text-sky-600 mx-auto mb-3"
              aria-label="Step 1"
            >
              1
            </div>
            <h3 className="text-xl font-bold mb-2">Sign Up</h3>
            <p className="text-gray-500">
              Create your free account and tell us about your career goals.
            </p>
          </div>
          <div className="relative">
            <div className="w-12 h-12 bg-white border-2 border-sky-200 rounded-full flex items-center justify-center text-xl font-bold text-sky-600 mx-auto mb-3"
               aria-label="Step 2"
             >
               2
             </div>
             <h3 className="text-xl font-bold mb-2">Get Your Roadmap</h3>
             <p className="text-gray-500">
               Our AI analyzes your profile and generates a personalized plan.
             </p>
           </div>
           <div className="relative">
             <div className="w-12 h-12 bg-white border-2 border-sky-200 rounded-full flex items-center justify-center text-xl font-bold text-sky-600 mx-auto mb-3"
               aria-label="Step 3"
             >
               3
             </div>
             <h3 className="text-xl font-bold mb-2">Start Growing</h3>
             <p className="text-gray-500">
               Follow your plan, track progress, and land your dream job.
             </p>
           </div>
         </div>
       </section>
        <FeaturesSectionWithHoverEffects />
      
      {/* How It Works */}
      <HowItWorks />

      {/* Testimonials */}
      <Testimonials />

       {/* Pricing */}
       <section
        ref={pricingRef}
        id="pricing"
        aria-labelledby="pricing-heading"
        className={`py-12 sm:py-16 text-center transition-all duration-700 ease-out ${
          pricingVisible
            ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
         <h2 id="pricing-heading" className={`text-3xl sm:text-4xl font-bold mb-4 ${
    isDark ? "text-white" : "text-gray-900"
  }`}>
           Simple, Transparent Pricing
         </h2>
         <p className="text-base sm:text-lg text-gray-600 mb-6">
           Choose the plan that&apos;s right for you.
         </p>
         <div className="flex justify-center items-center space-x-3 mb-8">
           <span
            className={`font-medium ${
              !isYearly ? "text-sky-600" : "text-gray-500"
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
             <div className="w-14 h-7 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
           </label>
           <span
            className={`font-medium ${
              isYearly ? "text-sky-600" : "text-gray-500"
            }`}
            id="yearly-label"
          >
            Yearly{" "}
            <span className="text-sm text-green-500 font-semibold">
              (Save 20%)
            </span>
          </span>
        </div>
         {/* Pricing Cards */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
           {/* Free Plan */}
           <div className="border border-gray-200 rounded-2xl p-6" role="article" aria-labelledby="hobby-plan">
             <h3 id="hobby-plan" className="text-xl font-bold mb-2">Hobby</h3>
             <p className="text-gray-500 mb-6">
               For individuals getting started.
             </p>
             <p className="text-4xl font-extrabold mb-5">
               <span aria-label="0 dollars">$0</span>
               <span className="text-base font-medium text-gray-500">/mo</span>
             </p>
             <a
              href="/sign-in?plan=hobby"
              className="w-full inline-block bg-gray-100 text-gray-700 font-bold py-2.5 px-6 rounded-full hover:bg-gray-200 transition-colors focus:outline-none focus:ring-4 focus:ring-gray-300 focus:ring-opacity-50"
              aria-describedby="hobby-plan"
            >
              Get Started
            </a>
          </div>
           {/* Pro Plan */}
           <div className="border-2 border-sky-500 rounded-2xl p-6 relative shadow-2xl" role="article" aria-labelledby="pro-plan">
             <span className="absolute top-0 -translate-y-1/2 bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-full" aria-label="Most popular plan">
               MOST POPULAR
             </span>
             <h3 id="pro-plan" className="text-xl font-bold mb-2">Pro</h3>
             <p className="text-gray-500 mb-6">
               For professionals ready to accelerate.
             </p>
             <p className="text-4xl font-extrabold mb-5">
               <span aria-label={`${isYearly ? "12" : "15"} dollars`}>
                 ${isYearly ? "12" : "15"}
               </span>
               <span className="text-base font-medium text-gray-500">/mo</span>
             </p>

             {isSignedIn ? (
                <Link href="/checkout/pro">
                  <button className="w-full bg-sky-600 text-white font-bold py-2.5 px-6 rounded-full hover:bg-sky-700 transition-colors focus:outline-none focus:ring-4 focus:ring-sky-300 focus:ring-opacity-50">
                    Start Free Trial
                  </button>
                </Link>
              ) : (
                <Link href="/sign-in?redirect_url=/checkout/pro">
                  <button className="w-full bg-sky-600 text-white font-bold py-2.5 px-6 rounded-full hover:bg-sky-700 transition-colors focus:outline-none focus:ring-4 focus:ring-sky-300 focus:ring-opacity-50">
                    Start Free Trial
                  </button>
                </Link>
            )}
          </div>
           {/* Teams Plan */}
           <div className="border border-gray-200 rounded-2xl p-6" role="article" aria-labelledby="teams-plan">
             <h3 id="teams-plan" className="text-xl font-bold mb-2">Teams</h3>
             <p className="text-gray-500 mb-6">For organizations and groups.</p>
             <p className="text-4xl font-extrabold mb-5" aria-label="Custom pricing">Custom</p>
             <a
              href="https://bento.me/darshan3690"
              className="w-full inline-block bg-gray-100 text-gray-700 font-bold py-2.5 px-6 rounded-full hover:bg-gray-200 transition-colors focus:outline-none focus:ring-4 focus:ring-gray-300 focus:ring-opacity-50"
              aria-describedby="teams-plan"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </section>
      {/* Current Date */}
      <div className="text-center text-gray-600 mt-10">
        <p>📅 Today’s Date: {currentDate}</p>
      </div>

      {/* CTA Section */}
      <section
        ref={ctaRef}
        className={`text-center py-20 transition-all duration-700 ease-out ${
          ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <Button
          asChild
          className="bg-sky-600 text-white px-8 py-4 rounded-full hover:bg-sky-700 transition text-lg sm:text-xl whitespace-nowrap"
        >
          <Link href="#demo">
            Schedule My Free <span className="hidden sm:inline">Discovery</span> Demo Now
          </Link>
        </Button>
      </section>
    </main>
  );
};

export default App;
