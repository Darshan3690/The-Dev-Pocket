"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { HeroWithMockup } from "@/components/hero-with-mockup";
import FeaturesSectionWithHoverEffects from "./components/FeaturedSection";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";

const App = () => {
  const [isYearly, setIsYearly] = useState(false);

  // Hook to detect when element appears on screen
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
  const [pricingRef, pricingVisible] = useOnScreen({ threshold: 0.2 });
  const [ctaRef, ctaVisible] = useOnScreen({ threshold: 0.3 });

  // ✅ Add date example
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    const today = new Date();
    setCurrentDate(today.toDateString()); // e.g., "Sun Oct 19 2025"
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
        <FeaturesSectionWithHoverEffects />
      </motion.section>

      {/* How It Works */}
      <HowItWorks />

      {/* Testimonials */}
      <Testimonials />

      {/* Current Date */}
      <div className="text-center text-gray-600 mt-10">
        <p>📅 Today’s Date: {currentDate}</p>
      </div>

      {/* CTA */}
      <section
        ref={ctaRef}
        className={`text-center py-20 transition-all duration-700 ease-out ${
          ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <Button className="bg-sky-600 text-white px-8 py-4 rounded-full hover:bg-sky-700 transition">
          <Link href="#pricing">Start Your Free Trial</Link>
        </Button>
      </section>
    </main>
  );
};

export default App;