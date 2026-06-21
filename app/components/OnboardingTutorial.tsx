"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { X, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TutorialStep {
  title: string;
  description: string;
  target?: string;
  position?: "top" | "bottom" | "left" | "right" | "center";
  highlight?: boolean;
}

interface SpotlightRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface TooltipPos {
  top: number;
  left: number;
  transformOrigin: string;
}

const PADDING = 12; // px padding around the spotlight cutout
const TOOLTIP_GAP = 18; // px gap between spotlight and tooltip

const tutorialSteps: TutorialStep[] = [
  {
    title: "👋 Welcome to Dev Pocket!",
    description:
      "Your all-in-one platform for career development. Let's take a quick tour to get you started!",
    position: "center",
  },
  {
    title: "🔍 Global Search",
    description:
      "Press Ctrl+K (or Cmd+K on Mac) anytime to quickly search across the platform. Try it now!",
    target: "#global-search",
    position: "bottom",
    highlight: true,
  },
  {
    title: "🎯 Explore Features",
    description:
      "Discover our comprehensive toolkit including roadmaps, resources, and AI-powered insights.",
    target: "#features",
    position: "top",
    highlight: true,
  },
  {
    title: "⌨️ Keyboard Shortcuts",
    description:
      "Press Ctrl+? to view all keyboard shortcuts. Navigate like a pro with Ctrl+H (Home), Ctrl+S (Settings), and more!",
    position: "center",
  },
  {
    title: "📊 Your Dashboard",
    description:
      "Track your progress, manage goals, and access personalized recommendations from your dashboard.",
    target: "#dashboard-link",
    position: "bottom",
    highlight: true,
  },
  {
    title: "🎨 Dark Mode",
    description:
      "Toggle between light and dark themes using Ctrl+T or the theme switcher in the header.",
    position: "center",
  },
  {
    title: "❓ Need Help?",
    description:
      "Visit our FAQ page or contact support anytime. We're here to help you succeed!",
    target: "#support",
    position: "top",
    highlight: true,
  },
  {
    title: "🚀 You're All Set!",
    description:
      "Start exploring and building your career. You can restart this tutorial anytime from Settings.",
    position: "center",
  },
];

/** Compute a rect that includes generous padding around the target element */
function getSpotlightRect(target: string): SpotlightRect | null {
  const el = document.querySelector(target);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return {
    x: r.left - PADDING,
    y: r.top - PADDING,
    width: r.width + PADDING * 2,
    height: r.height + PADDING * 2,
  };
}

/**
 * Decide where to anchor the tooltip card relative to the spotlight rect.
 * Falls back to center-of-viewport if no target.
 * FIX (P1): Uses actual rendered tooltip dimensions instead of hardcoded values,
 * and clamps left/top so the card never goes off-screen on narrow viewports.
 */
function computeTooltipPosition(
  rect: SpotlightRect | null,
  position: TutorialStep["position"],
  tooltipW: number,
  tooltipH: number
): TooltipPos {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // FIX (P1): Clamp helpers that account for actual viewport width
  const clampX = (v: number) => Math.max(8, Math.min(v, vw - tooltipW - 8));
  const clampY = (v: number) => Math.max(8, Math.min(v, vh - tooltipH - 8));

  if (!rect || position === "center") {
    return {
      // FIX (P1): clamp centered position so it never produces negative offset
      // on viewports narrower than tooltipW (e.g. mobile < 400px)
      top: clampY(vh / 2 - tooltipH / 2),
      left: clampX(vw / 2 - tooltipW / 2),
      transformOrigin: "center center",
    };
  }

  const spaceBelow = vh - (rect.y + rect.height);
  const spaceAbove = rect.y;
  const spaceRight = vw - (rect.x + rect.width);
  const spaceLeft = rect.x;

  let top = 0;
  let left = 0;
  let transformOrigin = "top center";

  const centeredX = rect.x + rect.width / 2 - tooltipW / 2;

  if (position === "bottom" && spaceBelow >= tooltipH + TOOLTIP_GAP) {
    top = rect.y + rect.height + TOOLTIP_GAP;
    left = centeredX;
    transformOrigin = "top center";
  } else if (position === "top" && spaceAbove >= tooltipH + TOOLTIP_GAP) {
    top = rect.y - tooltipH - TOOLTIP_GAP;
    left = centeredX;
    transformOrigin = "bottom center";
  } else if (position === "right" && spaceRight >= tooltipW + TOOLTIP_GAP) {
    top = rect.y + rect.height / 2 - tooltipH / 2;
    left = rect.x + rect.width + TOOLTIP_GAP;
    transformOrigin = "left center";
  } else if (position === "left" && spaceLeft >= tooltipW + TOOLTIP_GAP) {
    top = rect.y + rect.height / 2 - tooltipH / 2;
    left = rect.x - tooltipW - TOOLTIP_GAP;
    transformOrigin = "right center";
  } else if (spaceBelow >= tooltipH + TOOLTIP_GAP) {
    top = rect.y + rect.height + TOOLTIP_GAP;
    left = centeredX;
    transformOrigin = "top center";
  } else {
    top = rect.y - tooltipH - TOOLTIP_GAP;
    left = centeredX;
    transformOrigin = "bottom center";
  }

  return { top: clampY(top), left: clampX(left), transformOrigin };
}

export default function OnboardingTutorial() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [spotlightRect, setSpotlightRect] = useState<SpotlightRect | null>(null);
  const [tooltipPos, setTooltipPos] = useState<TooltipPos>({
    top: 0,
    left: 0,
    transformOrigin: "center center",
  });

  const tooltipRef = useRef<HTMLDivElement>(null);
  const TOOLTIP_H_FALLBACK = 260;

  /** Recalculate spotlight + tooltip positions for the given step.
   *  FIX (P1): reads actual rendered width from tooltipRef instead of
   *  using a hardcoded 400px constant, preventing negative left offset
   *  on viewports narrower than the hardcoded value.
   */
  const recalcLayout = useCallback((stepIndex: number) => {
    const step = tutorialSteps[stepIndex];
    const rect = step.target && step.highlight ? getSpotlightRect(step.target) : null;
    setSpotlightRect(rect);

    // Use actual rendered dimensions; fall back to estimates if ref not ready
    const actualW = tooltipRef.current?.offsetWidth ?? 400;
    const actualH = tooltipRef.current?.offsetHeight ?? TOOLTIP_H_FALLBACK;
    const pos = computeTooltipPosition(rect, step.position, actualW, actualH);
    setTooltipPos(pos);
  }, []);

  // FIX (P2): Wait for smooth scrolling to finish before recalculating layout.
  // Uses the `scrollend` event (supported in modern browsers) so getBoundingClientRect()
  // is never captured mid-scroll. Falls back to a 600ms timeout for older browsers.
  // A `settled` guard prevents double-firing when both fire.
  useEffect(() => {
    if (!isOpen) return;

    const step = tutorialSteps[currentStep];

    // If no scroll needed, recalc immediately after a short DOM-settle delay
    if (!step.target) {
      const t = setTimeout(() => recalcLayout(currentStep), 50);
      return () => clearTimeout(t);
    }

    let settled = false;

    const onScrollEnd = () => {
      if (settled) return;
      settled = true;
      recalcLayout(currentStep);
    };

    // Primary: fire as soon as scrolling stops
    window.addEventListener("scrollend", onScrollEnd, { once: true });

    // Fallback: for browsers that don't support `scrollend` (e.g. Safari < 17)
    const fallbackTimer = setTimeout(onScrollEnd, 600);

    return () => {
      clearTimeout(fallbackTimer);
      window.removeEventListener("scrollend", onScrollEnd);
    };
  }, [isOpen, currentStep, recalcLayout]);

  // Recalc on window resize
  useEffect(() => {
    if (!isOpen) return;
    const onResize = () => recalcLayout(currentStep);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isOpen, currentStep, recalcLayout]);

  useEffect(() => {
    const seen = localStorage.getItem("onboarding-completed");
    if (!seen) {
      const timer = setTimeout(() => {
        setCurrentStep(0);
        setIsOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const scrollToTarget = (target?: string) => {
    if (target) {
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      const next = currentStep + 1;
      scrollToTarget(tutorialSteps[next].target);
      setCurrentStep(next);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      const prev = currentStep - 1;
      scrollToTarget(tutorialSteps[prev].target);
      setCurrentStep(prev);
    }
  };

  const handleSkip = () => {
    localStorage.setItem("onboarding-completed", "true");
    setIsOpen(false);
    setSpotlightRect(null);
  };

  const handleComplete = () => {
    localStorage.setItem("onboarding-completed", "true");
    setIsOpen(false);
    setSpotlightRect(null);
  };

  useEffect(() => {
    const handleRestart = () => {
      setCurrentStep(0);
      setIsOpen(true);
    };
    window.addEventListener("restart-onboarding", handleRestart);
    return () => window.removeEventListener("restart-onboarding", handleRestart);
  }, []);

  if (!isOpen) return null;

  const step = tutorialSteps[currentStep];
  const progress = ((currentStep + 1) / tutorialSteps.length) * 100;
  const vw = typeof window !== "undefined" ? window.innerWidth : 1440;
  const vh = typeof window !== "undefined" ? window.innerHeight : 900;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── SVG Spotlight Overlay ── */}
          <motion.svg
            key="spotlight-svg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] pointer-events-none"
            width={vw}
            height={vh}
            style={{ width: "100vw", height: "100vh" }}
          >
            <defs>
              <mask id="spotlight-mask">
                {/* White = visible (dark overlay shows) */}
                <rect x="0" y="0" width="100%" height="100%" fill="white" />
                {/* Black cutout = transparent (target element shows through) */}
                {spotlightRect && (
                  <motion.rect
                    x={spotlightRect.x}
                    y={spotlightRect.y}
                    width={spotlightRect.width}
                    height={spotlightRect.height}
                    rx="12"
                    ry="12"
                    fill="black"
                    initial={false}
                    animate={{
                      x: spotlightRect.x,
                      y: spotlightRect.y,
                      width: spotlightRect.width,
                      height: spotlightRect.height,
                    }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                  />
                )}
              </mask>
            </defs>

            {/* Dark overlay with cutout */}
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="rgba(0,0,0,0.60)"
              mask="url(#spotlight-mask)"
            />

            {/* Glowing border ring around the spotlight */}
            {spotlightRect && (
              <motion.rect
                x={spotlightRect.x - 2}
                y={spotlightRect.y - 2}
                width={spotlightRect.width + 4}
                height={spotlightRect.height + 4}
                rx="13"
                ry="13"
                fill="none"
                stroke="rgba(99,179,237,0.75)"
                strokeWidth="2"
                initial={false}
                animate={{
                  x: spotlightRect.x - 2,
                  y: spotlightRect.y - 2,
                  width: spotlightRect.width + 4,
                  height: spotlightRect.height + 4,
                }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              />
            )}
          </motion.svg>

          {/* Clickable backdrop (outside SVG so pointer-events work) */}
          <div
            className="fixed inset-0 z-[100]"
            onClick={handleSkip}
            aria-label="Close tutorial"
          />

          {/* ── Tooltip Card ── */}
          <motion.div
            ref={tooltipRef}
            key={`tooltip-${currentStep}`}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="fixed z-[103] w-full"
            style={{
              top: tooltipPos.top,
              left: tooltipPos.left,
              maxWidth: `min(400px, calc(100vw - 16px))`, // FIX (P1): never exceed viewport width
              transformOrigin: tooltipPos.transformOrigin,
              pointerEvents: "auto",
            }}
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border-2 border-blue-500 dark:border-blue-500 overflow-hidden">
              {/* Progress Bar */}
              <div className="h-1.5 bg-gray-200 dark:bg-gray-700">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.35 }}
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                />
              </div>

              {/* Content */}
              <div className="p-6 relative">
                {/* Close Button */}
                <button
                  onClick={handleSkip}
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Close tutorial"
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>

                {/* Step Counter */}
                <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
                  Step {currentStep + 1} of {tutorialSteps.length}
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 pr-8">
                  {step.title}
                </h2>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 mb-5 leading-relaxed text-sm">
                  {step.description}
                </p>

                {/* Navigation */}
                <div className="flex items-center justify-between gap-3">
                  <button
                    onClick={handleSkip}
                    className="px-3 py-1.5 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                  >
                    Skip Tour
                  </button>

                  <div className="flex items-center gap-2">
                    {currentStep > 0 && (
                      <button
                        onClick={handlePrevious}
                        className="px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all flex items-center gap-1.5 text-sm"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </button>
                    )}

                    <button
                      onClick={handleNext}
                      className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-1.5 text-sm"
                    >
                      {currentStep === tutorialSteps.length - 1 ? (
                        <>
                          <Check className="w-4 h-4" />
                          Get Started
                        </>
                      ) : (
                        <>
                          Next
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Step Dots */}
                <div className="flex items-center justify-center gap-1.5 mt-5">
                  {tutorialSteps.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        scrollToTarget(tutorialSteps[index].target);
                        setCurrentStep(index);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === currentStep
                          ? "w-6 bg-blue-600 dark:bg-blue-500"
                          : index < currentStep
                          ? "w-1.5 bg-blue-400 dark:bg-blue-600"
                          : "w-1.5 bg-gray-300 dark:bg-gray-600"
                      }`}
                      aria-label={`Go to step ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Export function to restart tutorial from anywhere
export const restartOnboarding = () => {
  localStorage.removeItem("onboarding-completed");
  window.dispatchEvent(new Event("restart-onboarding"));
};