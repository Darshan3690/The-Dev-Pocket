"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

// Page components — authentication UI is provided by root `ClerkProvider` and header.

// Helper component for Icons
const Icon = ({ children }: { children: React.ReactNode }) => (
  <div className="flex-shrink-0 w-12 h-12 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center mb-4">
    {children}
  </div>
);

// Feature Card Component
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}
const FeatureCard = ({ icon, title, children }: FeatureCardProps) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 transform">
    {icon}
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-500 leading-relaxed">{children}</p>
  </div>
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
  <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-200 text-left">
    <p className="text-gray-600 italic mb-4">&quot;{quote}&quot;</p>
    <div className="flex items-center">
      <Image
        src={avatar}
        alt={name}
        width={48}
        height={48}
        unoptimized
        className="w-12 h-12 rounded-full mr-4 border-2 border-sky-200"
      />
      <div>
        <p className="font-bold text-gray-800">{name}</p>
        <p className="text-gray-500 text-sm">{title}</p>
      </div>
    </div>
  </div>
);

const App = () => {
  const [isYearly, setIsYearly] = useState(false);

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

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className={`transition-all duration-700 ease-out ${
          heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="bg-gradient-to-b from-sky-100 to-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8 text-center rounded-3xl mt-6 border border-sky-200 shadow-xl overflow-hidden">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-800 leading-tight mb-4">
              The AI-Powered Platform for Your Dev Career
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Dev Pocket centralizes learning, personalized roadmaps, job
              updates, and powerful resume tools—all in one smart dashboard.
            </p>
            <a
              href="#pricing"
              className="inline-block bg-sky-600 text-white text-lg font-semibold py-3 px-8 rounded-full shadow-2xl hover:bg-sky-700 transition-transform transform hover:scale-105"
            >
              Get Started Free
            </a>
          </div>
          <div className="mt-12 sm:mt-16 relative w-full max-w-5xl mx-auto">
            <Image
              src="https://placehold.co/1000x600/e0f2fe/0c4a6e?text=Dev+Pocket+UI"
              alt="Dev Pocket Dashboard Mockup"
              width={1000}
              height={600}
              unoptimized
              className="w-full h-auto rounded-xl shadow-2xl border-2 border-white transition-transform transform hover:scale-105 duration-300"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        ref={featuresRef}
        id="features"
        className={`py-16 sm:py-24 text-center transition-all duration-700 ease-out ${
          featuresVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          All the Tools You Need, in One Place
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
          Stop juggling multiple platforms. Dev Pocket brings everything
          together to accelerate your growth.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          <FeatureCard
            title="Personalized Roadmaps"
            icon={
              <Icon>
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
              </Icon>
            }
          >
            Our AI crafts a custom learning path based on your goals and skill
            level.
          </FeatureCard>
          <FeatureCard
            title="Curated Learning"
            icon={
              <Icon>
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
              </Icon>
            }
          >
            Access top-tier courses, tutorials, and articles all in one place.
          </FeatureCard>
          <FeatureCard
            title="Job Search & Matching"
            icon={
              <Icon>
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
              </Icon>
            }
          >
            Find roles perfectly matched to your skills and interests.
          </FeatureCard>
          <FeatureCard
            title="Resume & Portfolio Tools"
            icon={
              <Icon>
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
              </Icon>
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
        className={`py-16 sm:py-24 text-center transition-all duration-700 ease-out ${
          howItWorksVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Get Started in 3 Simple Steps
        </h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Dotted line for desktop */}
          <div
            className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-sky-300"
            style={{ transform: "translateY(-50%)", zIndex: -1 }}
          ></div>
          <div className="relative">
            <div className="w-16 h-16 bg-white border-2 border-sky-200 rounded-full flex items-center justify-center text-2xl font-bold text-sky-600 mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-bold mb-2">Sign Up</h3>
            <p className="text-gray-500">
              Create your free account and tell us about your career goals.
            </p>
          </div>
          <div className="relative">
            <div className="w-16 h-16 bg-white border-2 border-sky-200 rounded-full flex items-center justify-center text-2xl font-bold text-sky-600 mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-bold mb-2">Get Your Roadmap</h3>
            <p className="text-gray-500">
              Our AI analyzes your profile and generates a personalized plan.
            </p>
          </div>
          <div className="relative">
            <div className="w-16 h-16 bg-white border-2 border-sky-200 rounded-full flex items-center justify-center text-2xl font-bold text-sky-600 mx-auto mb-4">
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
        className={`py-16 sm:py-24 bg-sky-50/70 rounded-3xl transition-all duration-700 ease-out ${
          testimonialsVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Loved by Developers Worldwide
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Don&apos;t just take our word for it. Here&apos;s what our users are
            saying.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
        className={`py-16 sm:py-24 text-center transition-all duration-700 ease-out ${
          pricingVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Choose the plan that&apos;s right for you.
        </p>
        <div className="flex justify-center items-center space-x-4 mb-10">
          <span
            className={`font-medium ${
              !isYearly ? "text-sky-600" : "text-gray-500"
            }`}
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
            <div className="w-14 h-7 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
          </label>
          <span
            className={`font-medium ${
              isYearly ? "text-sky-600" : "text-gray-500"
            }`}
          >
            Yearly{" "}
            <span className="text-sm text-green-500 font-semibold">
              (Save 20%)
            </span>
          </span>
        </div>
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="border border-gray-200 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-2">Hobby</h3>
            <p className="text-gray-500 mb-6">
              For individuals getting started.
            </p>
            <p className="text-5xl font-extrabold mb-6">
              $0<span className="text-lg font-medium text-gray-500">/mo</span>
            </p>
            <a
              href="#"
              className="w-full inline-block bg-gray-100 text-gray-700 font-bold py-3 px-10 rounded-full hover:bg-gray-200 transition-colors"
            >
              Get Started
            </a>
          </div>
          {/* Pro Plan */}
          <div className="border-2 border-sky-500 rounded-2xl p-8 relative shadow-2xl">
            <span className="absolute top-0 -translate-y-1/2 bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              MOST POPULAR
            </span>
            <h3 className="text-2xl font-bold mb-2">Pro</h3>
            <p className="text-gray-500 mb-6">
              For professionals ready to accelerate.
            </p>
            <p className="text-5xl font-extrabold mb-6">
              ${isYearly ? "12" : "15"}
              <span className="text-lg font-medium text-gray-500">/mo</span>
            </p>
            <a
              href="#"
              className="w-full inline-block bg-sky-600 text-white font-bold py-3 px-10 rounded-full hover:bg-sky-700 transition-colors"
            >
              Start Free Trial
            </a>
          </div>
          {/* Teams Plan */}
          <div className="border border-gray-200 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-2">Teams</h3>
            <p className="text-gray-500 mb-6">For organizations and groups.</p>
            <p className="text-5xl font-extrabold mb-6">Custom</p>
            <a
              href="#"
              className="w-full inline-block bg-gray-100 text-gray-700 font-bold py-3 px-10 rounded-full hover:bg-gray-200 transition-colors"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        ref={ctaRef}
        className={`bg-gradient-to-r from-sky-600 to-indigo-600 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 text-center rounded-3xl mx-auto max-w-7xl mb-16 shadow-xl transition-all duration-700 ease-out ${
          ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Ready to Level Up Your Career?
          </h2>
          <p className="text-lg sm:text-xl font-light mb-8 opacity-90">
            Join thousands of developers already using Dev Pocket to achieve
            their goals.
          </p>
          <a
            href="#"
            className="inline-block bg-white text-sky-600 font-bold text-lg py-3 px-10 rounded-full shadow-lg hover:bg-gray-100 transition-transform transform hover:scale-105"
          >
            Start Your Free Trial
          </a>
        </div>
      </section>
    </>
  );
};

export default App;
