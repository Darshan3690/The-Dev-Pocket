"use client";

import { cn } from "@/lib/utils";
import {
  IconRouteAltLeft,
  IconBook,
  IconSearch,
  IconFileText,
} from "@tabler/icons-react";

export default function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "Personalized Roadmaps",
      description:
        "Our AI crafts a custom learning path based on your goals and skill level.",
      icon: <IconRouteAltLeft />,
    },
    {
      title: "Curated Learning",
      description:
        "Access top-tier courses, tutorials, and articles all in one place.",
      icon: <IconBook />,
    },
    {
      title: "Job Search & Matching",
      description: "Find roles perfectly matched to your skills and interests.",
      icon: <IconSearch />,
    },
    {
      title: "Resume & Portfolio Tools",
      description:
        "Build professional resumes and portfolios with AI-powered templates.",
      icon: <IconFileText />,
    },
  ];

  return (
    <section
      id="features"
      className="py-16 sm:py-24 text-center transition-all duration-700 ease-out"
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
        All the Tools You Need, in One Place
      </h2>
      <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
        Stop juggling multiple platforms. Dev Pocket brings everything together
        to accelerate your growth.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <Feature key={feature.title} {...feature} index={index} />
        ))}
      </div>
    </section>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-linear-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-linear-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
