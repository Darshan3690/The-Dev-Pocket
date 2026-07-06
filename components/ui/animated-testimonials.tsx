"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};
export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  /**
   * Calculate deterministic rotation angle for a testimonial card.
   * Uses a fixed multiplier (12345) to ensure consistent rotation values across server/client renders,
   * preventing hydration mismatch while distributing cards at slightly different angles.
   * @param index - The testimonial index in the array
   * @returns Rotation in degrees, range -10 to 10
   */
  const getRotationForIndex = (index: number) => {
    const seed = index * 12345;
    return ((seed % 21) - 10);
  };
  return (
    <div className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: getRotationForIndex(index),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : getRotationForIndex(index),
                    zIndex: isActive(index)
                      ? 40
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: getRotationForIndex(index),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col justify-between rounded-[28px] bg-white/90 px-6 py-8 shadow-[0_18px_48px_rgba(15,23,42,0.08)] ring-1 ring-slate-100 dark:bg-slate-900/90 dark:ring-slate-700 md:px-8">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {testimonials[active].name}
            </h3>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-sky-700 dark:text-sky-300">
              {testimonials[active].designation}
            </p>
            <motion.p className="mt-8 text-lg font-medium leading-8 text-slate-700 dark:text-neutral-200">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="group/button flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-sm transition-colors hover:border-sky-200 hover:bg-sky-50 dark:border-slate-700 dark:bg-neutral-800 dark:text-slate-100 dark:hover:border-sky-500/60 dark:hover:bg-slate-800"
            >
              <IconArrowLeft className="h-5 w-5 text-slate-800 transition-transform duration-300 group-hover/button:rotate-12 dark:text-slate-100" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="group/button flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-sm transition-colors hover:border-sky-200 hover:bg-sky-50 dark:border-slate-700 dark:bg-neutral-800 dark:text-slate-100 dark:hover:border-sky-500/60 dark:hover:bg-slate-800"
            >
              <IconArrowRight className="h-5 w-5 text-slate-800 transition-transform duration-300 group-hover/button:-rotate-12 dark:text-slate-100" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
