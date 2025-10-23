"use client";

import { useEffect, useRef, useState } from "react";

// ✅ Custom Hook: useOnScreen
export function useOnScreen(
  options: IntersectionObserverInit
): [React.RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
    }, options);

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [options]);

  return [ref, visible];
}

// ✅ Component: HowItWorks
function HowItWorks() {
  const [howItWorksRef, howItWorksVisible] = useOnScreen({ threshold: 0.2 });

  return (
    <section
      ref={howItWorksRef}
      id="how-it-works"
      className={`py-12 sm:py-20 lg:py-28 text-center transition-all max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 duration-700 ease-out ${
        howItWorksVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } bg-gradient-to-b from-white to-gray-50`}
    >
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4 sm:mb-6 tracking-tight">
        Launch Your Career in Three Bold Steps
      </h2>

      <p className="text-base sm:text-lg text-gray-600 mb-10 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
        Transform your ambitions into reality with our dynamic, AI-driven process designed for success.
      </p>

      <div className="relative flex flex-col sm:flex-row sm:flex-wrap justify-center gap-6 sm:gap-8 lg:gap-10">
        {/* Decorative connector line */}
        <div
          className="hidden sm:block absolute top-20 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent"
          style={{ zIndex: -1 }}
        ></div>

        {/* Step 1 */}
        <StepCard
          number="1"
          title="Build Your Profile"
          description="Join now and define your career vision to start your tailored journey."
        />

        {/* Step 2 */}
        <StepCard
          number="2"
          title="Discover Your Path"
          description="Our AI designs a custom roadmap to guide you toward your goals."
        />

        {/* Step 3 */}
        <StepCard
          number="3"
          title="Succeed with Confidence"
          description="Track your progress and achieve your dream career with ease."
        />
      </div>
    </section>
  );
}

// ✅ Extracted StepCard component for reusability
function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="relative group flex-1 min-w-[250px] max-w-[320px] bg-white rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4 sm:mb-6 ring-4 ring-indigo-100 ring-opacity-50 group-hover:ring-opacity-75 transition-all">
        {number}
      </div>
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">{title}</h3>
      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{description}</p>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-indigo-50 to-transparent rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
    </div>
  );
}

export default HowItWorks;
