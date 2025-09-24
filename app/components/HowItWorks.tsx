import React, { useRef, useState, useEffect, RefObject } from 'react'

function useOnScreen(
  options: IntersectionObserverInit
): [RefObject<HTMLElement>, boolean] {
  const ref = useRef<HTMLElement>(null) as RefObject<HTMLElement>;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return [ref, isVisible];
}

function HowItWorks() {
  const [howItWorksRef, howItWorksVisible] = useOnScreen({ threshold: 0.2 });

  return (
    <>
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
        {/* Curved connector line for larger screens */}
        <div
          className="hidden sm:block absolute top-20 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent"
          style={{ zIndex: -1 }}
        ></div>
    
        {/* Step 1 */}
        <div className="relative group flex-1 min-w-[250px] max-w-[320px] bg-white rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4 sm:mb-6 ring-4 ring-indigo-100 ring-opacity-50 group-hover:ring-opacity-75 transition-all">
            1
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">Build Your Profile</h3>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Join now and define your career vision to start your tailored journey.
          </p>
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-indigo-50 to-transparent rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </div>
    
        {/* Step 2 */}
        <div className="relative group flex-1 min-w-[250px] max-w-[320px] bg-white rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4 sm:mb-6 ring-4 ring-indigo-100 ring-opacity-50 group-hover:ring-opacity-75 transition-all">
            2
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">Discover Your Path</h3>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Our AI designs a custom roadmap to guide you toward your goals.
          </p>
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-indigo-50 to-transparent rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </div>
    
        {/* Step 3 */}
        <div className="relative group flex-1 min-w-[250px] max-w-[320px] bg-white rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4 sm:mb-6 ring-4 ring-indigo-100 ring-opacity-50 group-hover:ring-opacity-75 transition-all">
            3
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">Succeed with Confidence</h3>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Track your progress and achieve your dream career with ease.
          </p>
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-indigo-50 to-transparent rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </div>
      </div>
    </section>
    </>
  )
}

export default HowItWorks