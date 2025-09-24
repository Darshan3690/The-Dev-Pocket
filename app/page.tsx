"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion"; // ✅ for animation
import { HeroWithMockup } from "@/components/hero-with-mockup";
import FeaturesSectionWithHoverEffects from "./components/FeaturedSection";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";

// const TestimonialBubble = ({ quote, name, title, avatar }: TestimonialBubbleProps) => (

//   <div className="relative bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-md max-w-sm mx-auto">
//     {/* Quote */}
//     <p className="text-gray-700 italic text-lg leading-relaxed mb-6">&quot;{quote}&quot;</p>

//     {/* User Info */}
//     <div className="flex items-center gap-4">
//       <Image
//         src={avatar}
//         alt={name}
//         width={56}
//         height={56}
//         unoptimized
//         className="w-14 h-14 rounded-full border-4 border-sky-100 shadow-md"
//       />
//       <div>
//         <p className="font-semibold text-gray-900">{name}</p>
//         <p className="text-gray-500 text-sm">{title}</p>
//       </div>
//     </div>

//     {/* Tail of bubble */}
//     <div className="absolute -bottom-4 left-10 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white/90"></div>
//   </div>
// );

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
  const [pricingRef, pricingVisible] = useOnScreen({ threshold: 0.2 });
  const [ctaRef, ctaVisible] = useOnScreen({ threshold: 0.3 });

  return (
    <>
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
          primaryCta={{
            text: "Get Started Free",
            href: "#pricing",
          }}
          secondaryCta={undefined}
          mockupImage={{
            alt: "Dev Pocket Dashboard Mockup",
            width: 1000,
            height: 600,
            src: "https://placehold.co/1000x600/e0f2fe/0c4a6e?text=Dev+Pocket+UI",
          }}
        />
      </section>

      {/* ✅ Features Section with Hover Effects */}
      <motion.section
        ref={featuresRef}
        id="features"
        initial={{ opacity: 0, y: 40 }}
        animate={featuresVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-16 sm:py-24 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <FeaturesSectionWithHoverEffects />
      </motion.section>

      {/* How It Works */}
        <HowItWorks />

      {/* Testimonials */}
        <Testimonials />
          
      {/* Pricing */}
      <section
        ref={pricingRef}
        id="pricing"
        className={`py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 text-center transition-all duration-700 ease-out ${
          pricingVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        } bg-white`}
      >
        {/* Section Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-10 sm:mb-12">
          Choose the plan that&apos;s right for you.
        </p>

        {/* Toggle */}
        <div className="flex justify-center items-center flex-wrap gap-4 mb-10 sm:mb-12">
          <span
            className={`font-medium ${
              !isYearly ? "text-sky-600" : "text-gray-400"
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
            <div className="w-12 sm:w-14 h-6 sm:h-7 bg-gray-200 rounded-full peer peer-checked:bg-sky-600 relative after:content-[''] after:absolute after:top-0.5 sm:after:top-1 after:left-0.5 sm:after:left-1 after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 sm:after:h-5 after:w-5 sm:after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
          </label>
          <span
            className={`font-medium ${
              isYearly ? "text-sky-600" : "text-gray-400"
            }`}
          >
            Yearly{" "}
            <span className="text-sm sm:text-base text-green-500 font-semibold">
              (Save 20%)
            </span>
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {/* Free Plan */}
          <div className="border rounded-3xl p-6 sm:p-8 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900">
              Hobby
            </h3>
            <p className="text-gray-500 mb-6 text-sm sm:text-base">
              For individuals getting started.
            </p>
            <p className="text-4xl sm:text-5xl font-extrabold mb-6 text-gray-900">
              $0
              <span className="text-lg sm:text-xl font-medium text-gray-500">
                /mo
              </span>
            </p>
            <a
              href="#"
              className="w-full inline-block bg-gradient-to-r from-sky-50 to-sky-100 text-sky-700 font-bold py-2.5 sm:py-3 px-6 sm:px-10 rounded-full hover:from-sky-100 hover:to-sky-200 transition-colors"
            >
              Get Started
            </a>
          </div>

          {/* Pro Plan */}
          <div className="relative rounded-3xl p-6 sm:p-8 bg-white shadow-2xl border-2 border-sky-500 hover:shadow-3xl transition-all duration-300">
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-sky-500 text-white text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded-full shadow-md">
              MOST POPULAR
            </span>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900">
              Pro
            </h3>
            <p className="text-gray-500 mb-6 text-sm sm:text-base">
              For professionals ready to accelerate.
            </p>
            <p className="text-4xl sm:text-5xl font-extrabold mb-6 text-gray-900">
              ${isYearly ? "12" : "15"}
              <span className="text-lg sm:text-xl font-medium text-gray-500">
                /mo
              </span>
            </p>
            <a
              href="#"
              className="w-full inline-block bg-gradient-to-r from-sky-600 to-sky-500 text-white font-bold py-2.5 sm:py-3 px-6 sm:px-10 rounded-full hover:from-sky-500 hover:to-sky-600 shadow-md transition-colors"
            >
              Start Free Trial
            </a>
          </div>

          {/* Teams Plan */}
          <div className="border rounded-3xl p-6 sm:p-8 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900">
              Teams
            </h3>
            <p className="text-gray-500 mb-6 text-sm sm:text-base">
              For organizations and groups.
            </p>
            <p className="text-4xl sm:text-5xl font-extrabold mb-6 text-gray-900">
              Custom
            </p>
            <a
              href="#"
              className="w-full inline-block bg-gradient-to-r from-sky-50 to-sky-100 text-sky-700 font-bold py-2.5 sm:py-3 px-6 sm:px-10 rounded-full hover:from-sky-100 hover:to-sky-200 transition-colors"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        ref={ctaRef}
        className={`w-full relative overflow-hidden text-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8 text-center mx-auto max-w-full mb-20 transition-all duration-700 ease-out ${
          ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Background overlay with geometric/grid pattern */}
        <div
          className="absolute inset-0 bg-gray-900/90"
          style={{
            backgroundImage:
              "url('https://www.transparenttextures.com/patterns/small-grid.png')",
            backgroundSize: "30px 30px",
          }}
        />

        {/* Blur effect behind text (bottom center) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-40 bg-blue-900/70 blur-3xl rounded-full" />

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-6">
            Ready to Level Up Your Career?
          </h2>
          <p className="text-lg sm:text-xl font-light mb-10 opacity-90">
            Join thousands of developers already using Dev Pocket to achieve
            their goals.
          </p>

          {/* Full width CTA button */}
          <Button
            className="bg-white text-white
             bg-gradient-to-b from-[#2581b7] to-[#0C4A6E]/90 
             dark:from-[#0C4A6E]/90 dark:to-[#0C4A6E]/80 
             hover:from-[#0C4A6E]/95 hover:to-[#0C4A6E]/85 
             dark:hover:from-[#0C4A6E]/80 dark:hover:to-[#0C4A6E]/70 
             shadow-lg transition-all duration-300"
          >
            <Link href={"#pricing"}>Start Your Free Trial</Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default App;
