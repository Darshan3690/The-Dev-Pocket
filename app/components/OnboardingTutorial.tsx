"use client";

import { useState, useEffect } from "react";
import { X, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TutorialStep {
  title: string;
  description: string;
  target?: string;
  position?: "top" | "bottom" | "left" | "right" | "center";
  highlight?: boolean;
}

const tutorialSteps: TutorialStep[] = [
  {
    title: "👋 Welcome to Dev Pocket!",
    description: "Your all-in-one platform for career development. Let's take a quick tour to get you started!",
    position: "center",
  },
  {
    title: "🔍 Global Search",
    description: "Press Ctrl+K (or Cmd+K on Mac) anytime to quickly search across the platform. Try it now!",
    target: "#global-search",
    position: "bottom",
    highlight: true,
  },
  {
    title: "🎯 Explore Features",
    description: "Discover our comprehensive toolkit including roadmaps, resources, and AI-powered insights.",
    target: "#features",
    position: "top",
    highlight: true,
  },
  {
    title: "⌨️ Keyboard Shortcuts",
    description: "Press Ctrl+? to view all keyboard shortcuts. Navigate like a pro with Ctrl+H (Home), Ctrl+S (Settings), and more!",
    position: "center",
  },
  {
    title: "📊 Your Dashboard",
    description: "Track your progress, manage goals, and access personalized recommendations from your dashboard.",
    target: "#dashboard-link",
    position: "bottom",
    highlight: true,
  },
  {
    title: "🎨 Dark Mode",
    description: "Toggle between light and dark themes using Ctrl+T or the theme switcher in the header.",
    position: "center",
  },
  {
    title: "❓ Need Help?",
    description: "Visit our FAQ page or contact support anytime. We're here to help you succeed!",
    target: "#support",
    position: "top",
    highlight: true,
  },
  {
    title: "🚀 You're All Set!",
    description: "Start exploring and building your career. You can restart this tutorial anytime from Settings.",
    position: "center",
  },
];

export default function OnboardingTutorial() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasSeenTutorial, setHasSeenTutorial] = useState(true);

  useEffect(() => {
    // Check if user has seen the tutorial
    const seen = localStorage.getItem("onboarding-completed");
    if (!seen) {
      // Delay showing tutorial to let page load
      const timer = setTimeout(() => {
        setHasSeenTutorial(false);
        setIsOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      scrollToTarget(tutorialSteps[currentStep + 1].target);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      scrollToTarget(tutorialSteps[currentStep - 1].target);
    }
  };

  const handleSkip = () => {
    localStorage.setItem("onboarding-completed", "true");
    setIsOpen(false);
    setHasSeenTutorial(true);
  };

  const handleComplete = () => {
    localStorage.setItem("onboarding-completed", "true");
    setIsOpen(false);
    setHasSeenTutorial(true);
  };

  const scrollToTarget = (target?: string) => {
    if (target) {
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const currentStepData = tutorialSteps[currentStep];
  const progress = ((currentStep + 1) / tutorialSteps.length) * 100;

  // Restart tutorial function (can be called from settings)
  useEffect(() => {
    const handleRestartTutorial = () => {
      setCurrentStep(0);
      setIsOpen(true);
    };

    window.addEventListener("restart-onboarding", handleRestartTutorial);
    return () => window.removeEventListener("restart-onboarding", handleRestartTutorial);
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100]"
            onClick={handleSkip}
          />

          {/* Highlight Target Element */}
          {currentStepData.target && currentStepData.highlight && (
            <div
              className="fixed z-[101] pointer-events-none"
              style={{
                boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.2)",
                borderRadius: "12px",
              }}
            />
          )}

          {/* Tutorial Card */}
          <div
            className={`fixed z-[102] w-full max-w-md mx-auto ${
              currentStepData.position === "center"
                ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                : currentStepData.position === "top"
                ? "top-24 left-1/2 -translate-x-1/2"
                : currentStepData.position === "bottom"
                ? "bottom-24 left-1/2 -translate-x-1/2"
                : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            }`}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-2 border-blue-500 dark:border-blue-600 overflow-hidden">
              {/* Progress Bar */}
              <div className="h-1.5 bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Close Button */}
                <button
                  onClick={handleSkip}
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Close tutorial"
                >
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>

                {/* Step Counter */}
                <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3">
                  Step {currentStep + 1} of {tutorialSteps.length}
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 pr-8">
                  {currentStepData.title}
                </h2>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {currentStepData.description}
                </p>

                {/* Navigation */}
                <div className="flex items-center justify-between gap-3">
                  <button
                    onClick={handleSkip}
                    className="px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                  >
                    Skip Tour
                  </button>

                  <div className="flex items-center gap-3">
                    {currentStep > 0 && (
                      <button
                        onClick={handlePrevious}
                        className="px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all flex items-center gap-2"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </button>
                    )}

                    <button
                      onClick={handleNext}
                      className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
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

                {/* Step Indicators */}
                <div className="flex items-center justify-center gap-2 mt-6">
                  {tutorialSteps.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentStep(index);
                        scrollToTarget(tutorialSteps[index].target);
                      }}
                      className={`h-2 rounded-full transition-all ${
                        index === currentStep
                          ? "w-8 bg-blue-600 dark:bg-blue-500"
                          : index < currentStep
                          ? "w-2 bg-blue-400 dark:bg-blue-600"
                          : "w-2 bg-gray-300 dark:bg-gray-600"
                      }`}
                      aria-label={`Go to step ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
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
