"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import Particles from "./components/ui/Particle";

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

// Feature Card Component
interface FeatureCardProps {
  icon: React.ReactNode;
  iconLabel: string;
  title: string;
  children: React.ReactNode;
}
const FeatureCard = ({ icon, iconLabel, title, children }: FeatureCardProps) => (
  <article className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 transform">
    <Icon ariaLabel={iconLabel}>{icon}</Icon>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-500 leading-relaxed">{children}</p>
  </article>
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

const App = () => {
  const [isYearly, setIsYearly] = useState(false);

  // Initialize enhanced utilities
  const { announce, announceSuccess, announceError } = useAccessibility();
  const { startTimer, endTimer, measureAsync } = usePerformanceMonitoring();
  const { handleError, wrapAsync } = useErrorHandling();

  // Animation on scroll hook
  const useOnScreen = (
    options: IntersectionObserverInit
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

      const currentRef = ref.current;
      if (currentRef) {
        observer.observe(currentRef);
      }

      return () => {
        if (currentRef) {
          observer.unobserve(currentRef);
        }
      };
    }, [ref, options]);

    return [ref, isVisible];
  };

  const [heroRef, heroVisible] = useOnScreen({ threshold: 0.3 });
  const [featuresRef, featuresVisible] = useOnScreen({ threshold: 0.2 });
  const [howItWorksRef, howItWorksVisible] = useOnScreen({ threshold: 0.2 });
  const [testimonialsRef, testimonialsVisible] = useOnScreen({
    threshold: 0.1,
  });
  const [pricingRef, pricingVisible] = useOnScreen({ threshold: 0.2 });
  const [ctaRef, ctaVisible] = useOnScreen({ threshold: 0.3 });
  const {isSignedIn}=useUser();

  // Enhanced error handling for component initialization
  useEffect(() => {
    startTimer('page-initialization');
    
    const initializePage = wrapAsync(async () => {
      try {
        // Simulate any async initialization
        await new Promise(resolve => setTimeout(resolve, 100));
        announceSuccess('Dev Pocket homepage loaded successfully');
      } catch (error) {
        announceError('Failed to initialize homepage');
        handleError(error as Error, 'error', 'Page Initialization');
      }
    }, 'Page Initialization');

    initializePage();
    endTimer('page-initialization');
  }, [startTimer, endTimer, announceSuccess, announceError, handleError, wrapAsync]);

  return (
    <main>
      {/* Skip to main content link for keyboard navigation */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-sky-600 text-white px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>
      
      {/* Hero Section */}
      <section
        id="main-content"
        ref={heroRef}
        aria-labelledby="hero-heading"
        className={`transition-all duration-700 ease-out ${
          heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
       <div className="relative bg-gradient-to-b from-sky-100 to-white py-20 sm:py-28 px-6 sm:px-10 lg:px-16 text-center overflow-hidden mt-10 mb-10">


          <div className="absolute inset-0 z-0">
            <Particles
              particleColors={["#000000", "#000000"]}
              particleCount={500}
              particleSpread={7}
              speed={0.2}
              particleBaseSize={50}
              moveParticlesOnHover={false}
              alphaParticles={false}
              disableRotation={false}
              className="w-full h-full"
            />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto">
             <h1 id="hero-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800 leading-tight mb-3">
               The AI-Powered Platform for Your Dev Career
             </h1>
             <p className="text-base sm:text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
               Dev Pocket centralizes learning, personalized roadmaps, job
               updates, and powerful resume tools—all in one smart dashboard.
             </p>
             <a
              href="/sign-in"
              className="inline-block bg-sky-600 text-white text-base font-semibold py-2.5 px-6 rounded-full shadow-2xl hover:bg-sky-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-sky-300 focus:ring-opacity-50"
              aria-describedby="pricing-section"
             >
               Get Started Free
             </a>
           </div>
          <div className="mt-8 sm:mt-12 relative w-full max-w-4xl mx-auto">
             
           </div>
         </div>
       </section>

       {/* Features */}
       <section
        ref={featuresRef}
        id="features"
        aria-labelledby="features-heading"
        className={`py-12 sm:py-16 text-center transition-all duration-700 ease-out ${
          featuresVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
         <h2 id="features-heading" className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-400 mb-4">
           All the Tools You Need, in One Place
         </h2>
         <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
           Stop juggling multiple platforms. Dev Pocket brings everything
           together to accelerate your growth.
         </p>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left" role="list">
           <Link href="/create-roadmap" className="group block">
             <FeatureCard
               title="Personalized Roadmaps"
               iconLabel="Lightning bolt icon representing personalized roadmaps"
               icon={
                 <svg
                   xmlns="http://www.w3.org/2000/svg"
                   className="h-6 w-6"
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
              level. <span className="inline-block ml-1 text-sky-600 group-hover:translate-x-1 transition-transform">→</span>
             </FeatureCard>
           </Link>
           <FeatureCard
             title="Curated Learning"
             iconLabel="Academic cap icon representing curated learning"
             icon={
               <svg
                 xmlns="http://www.w3.org/2000/svg"
                 className="h-6 w-6"
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
                 <path
                   strokeLinecap="round"
                   strokeLinejoin="round"
                   strokeWidth={2}
                   d="M9.5 4L14.5 4"
                 />
                 <path
                   strokeLinecap="round"
                   strokeLinejoin="round"
                   strokeWidth={2}
                   d="M6.5 7.5L17.5 7.5"
                 />
               </svg>
             }
           >
             Access top-tier courses, tutorials, and articles all in one place.
           </FeatureCard>
           <FeatureCard
            title="Job Search & Matching"
            iconLabel="Search icon representing job search and matching"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
            iconLabel="Document icon representing resume and portfolio tools"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
      </section>

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
        <h2 id="how-it-works-heading" className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-400 mb-4">
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

       {/* Testimonials */}
       <section
        ref={testimonialsRef}
        id="testimonials"
        aria-labelledby="testimonials-heading"
        className={`py-12 sm:py-16 bg-sky-50/70 rounded-3xl transition-all duration-700 ease-out ${
          testimonialsVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
         <div className="max-w-6xl mx-auto text-center">
           <h2 id="testimonials-heading" className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
             Loved by Developers Worldwide
           </h2>
           <p className="text-base sm:text-lg text-gray-600 mb-8">
             Don&apos;t just take our word for it. Here&apos;s what our users are
             saying.
           </p>
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             <TestimonialCard
              quote="Dev Pocket completely changed how I approach learning. The personalized roadmap was a game-changer for me."
              name="Sarah Johnson"
              title="Frontend Developer"
              avatar="https://placehold.co/100x100/E2E8F0/4A5568?text=SJ"
            />
            <TestimonialCard
              quote="The job matching feature is incredible. I found a role that was a perfect fit in less than a month."
              name="Michael Chen"
              title="Backend Engineer"
              avatar="https://placehold.co/100x100/CBD5E0/4A5568?text=MC"
            />
            <TestimonialCard
              quote="As a recent bootcamp grad, Dev Pocket gave me the structure and confidence I needed to land my first tech job."
              name="Jessica Rodriguez"
              title="Junior Full-Stack Developer"
              avatar="https://placehold.co/100x100/BEE3F8/2C5282?text=JR"
            />
          </div>
        </div>
      </section>

       {/* Pricing */}
       <section
        ref={pricingRef}
        id="pricing"
        aria-labelledby="pricing-heading"
        className={`py-12 sm:py-16 text-center transition-all duration-700 ease-out ${
          pricingVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
         <h2 id="pricing-heading" className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-400 mb-4">
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
               <span aria-label={`${isYearly ? "12" : "15"} dollars`}> {/* FIX: Add screen reader-friendly price */}
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

       {/* Call to Action */}
       <section
        ref={ctaRef}
        aria-labelledby="cta-heading"
        className={`bg-gradient-to-r from-sky-600 to-indigo-600 text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 text-center rounded-3xl mx-auto max-w-7xl mb-12 shadow-xl transition-all duration-700 ease-out ${
          ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-3xl mx-auto">
          <h2 id="cta-heading" className="text-3xl sm:text-4xl font-extrabold mb-3">
            Ready to Level Up Your Career?
          </h2>
          <p className="text-base sm:text-lg font-light mb-6 opacity-90">
            Join thousands of developers already using Dev Pocket to achieve
            their goals.
          </p>
          <Link href={isSignedIn ? "/dashboard" : "/sign-in?redirect_url=/dashboard"}>
            <button className="inline-block bg-white text-sky-600 font-bold text-base py-2.5 px-6 rounded-full shadow-lg hover:bg-gray-100 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50">
              Start Your Free Trial
            </button>
        </Link>

        </div>
      </section>
    </main>
  );
};

export default App;
