import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Mockup } from "@/components/ui/mockup";
import { Glow } from "@/components/ui/glow";
import { GithubIcon, ArrowRight } from "lucide-react";

interface HeroWithMockupProps {
  title: React.ReactNode;
  description: string;
  primaryCta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
    icon?: React.ReactNode;
  };
  mockupImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  className?: string;
}

export function HeroWithMockup({
  title,
  description,
  primaryCta = {
    text: "Get Started",
    href: "/get-started",
  },
  secondaryCta = {
    text: "GitHub",
    href: "https://github.com/your-repo",
    icon: <GithubIcon className="mr-2 h-4 w-4" />,
  },
  mockupImage,
  className,
}: HeroWithMockupProps) {
  return (
    <section
      className={cn(
        "relative text-foreground",
        "pt-20 pb-24 px-4 sm:px-6 lg:px-8", // Increased spacing for modern look
        "overflow-visible", // Changed to visible to allow glows to bleed
        className
      )}
    >
      <div className="relative mx-auto max-w-7xl flex flex-col gap-16 lg:gap-24">
        <div className="relative z-10 flex flex-col items-center gap-8 pt-8 text-center">
          
          {/* Version Badge (Optional aesthetic touch) */}
          <div className="inline-flex items-center rounded-full border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-900/30 px-3 py-1 text-sm font-medium text-sky-600 dark:text-sky-300 backdrop-blur-sm animate-appear">
            <span className="flex h-2 w-2 rounded-full bg-sky-500 mr-2 animate-pulse"></span>
            v2.0 is now live
          </div>

          {/* Heading */}
          <h1
            className={cn(
              "inline-block animate-appear",
              "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-400",
              "bg-clip-text text-transparent",
              "text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl",
              "leading-[1.1] sm:leading-[1.1]",
              "drop-shadow-sm"
            )}
          >
            {title}
          </h1>

          {/* Description */}
          <p
            className={cn(
              "max-w-2xl animate-appear opacity-0 [animation-delay:150ms]",
              "text-lg sm:text-xl md:text-2xl",
              "text-gray-600 dark:text-gray-300",
              "leading-relaxed font-normal"
            )}
          >
            {description}
          </p>

          {/* CTAs */}
          <div
            className="relative z-10 flex flex-wrap justify-center gap-4 animate-appear opacity-0 [animation-delay:300ms] mt-4"
          >
            <Button
              asChild
              size="lg"
              className={cn(
                "h-14 px-8 rounded-full text-lg", // Larger pill button
                "bg-sky-600 hover:bg-sky-500 text-white shadow-xl shadow-sky-500/20",
                "transition-all duration-300 hover:scale-105"
              )}
            >
              <a href={primaryCta.href}>
                {primaryCta.text} <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="ghost"
              className={cn(
                "h-14 px-8 rounded-full text-lg",
                "text-gray-700 dark:text-gray-200 hover:bg-gray-100/50 dark:hover:bg-slate-800/50",
                "transition-all duration-300"
              )}
            >
              <a href={secondaryCta.href}>
                {secondaryCta.icon}
                {secondaryCta.text}
              </a>
            </Button>
          </div>

          {/* Glassmorphic Browser Mockup */}
          <div className="relative w-full mt-12 sm:mt-20 animate-appear opacity-0 [animation-delay:500ms]">
            
            {/* Ambient Glow behind the mockup */}
            <div className="absolute -inset-4 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-[2rem] blur-3xl opacity-20 dark:opacity-30 -z-10" />

            {/* The Browser Frame */}
            <div className="relative rounded-xl md:rounded-2xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-2xl overflow-hidden">
              
              {/* Browser Header */}
              <div className="h-10 border-b border-gray-200 dark:border-slate-800 flex items-center px-4 space-x-2 bg-gray-50/50 dark:bg-slate-900/50">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                  <div className="w-3 h-3 rounded-full bg-green-400/80" />
                </div>
                {/* Fake URL Bar */}
                <div className="hidden sm:flex mx-auto w-full max-w-sm h-6 items-center justify-center rounded-md bg-gray-100 dark:bg-slate-800 text-[10px] text-gray-400 font-medium font-mono">
                  devpocket.io
                </div>
              </div>

              {/* Inner Image Wrapper */}
              <div className="relative bg-gray-100 dark:bg-slate-900">
                <Mockup>
                  <img
                    {...mockupImage}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </Mockup>
                
                {/* Subtle Reflection Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Background Glow Component */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <Glow
          variant="above"
          className="animate-appear-zoom opacity-0 [animation-delay:1000ms]"
        />
      </div>
    </section>
  );
}