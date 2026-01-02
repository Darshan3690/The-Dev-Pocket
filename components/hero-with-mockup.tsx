import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Mockup } from "@/components/ui/mockup"
import { Glow } from "@/components/ui/glow"
import { GithubIcon } from "lucide-react"
import { motion } from "framer-motion"

interface HeroWithMockupProps {
  title: React.ReactNode;
  description: string
  primaryCta?: {
    text: string
    href: string
  }
  secondaryCta?: {
    text: string
    href: string
    icon?: React.ReactNode
  }
  mockupImage: {
    src: string
    alt: string
    width: number
    height: number
  }
  className?: string
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
        "relative bg-white dark:bg-gray-950",
        "py-4 sm:py-6 md:py-8 lg:py-10 px-4 sm:px-6 lg:px-8",
        "overflow-hidden",
        className,
      )}
    >
      {/* Minimal Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="relative mx-auto max-w-7xl z-10">
        {/* Hero Content - Takes 60% of viewport */}
        <div className="relative z-10 flex flex-col items-start max-w-4xl mx-auto min-h-[60vh] justify-center pb-16 sm:pb-20 pt-12 sm:pt-16 md:pt-20">

          {/* Small Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-5"
          >
            <div className="h-px w-8 bg-gradient-to-r from-sky-600 to-transparent"></div>
            <span className="text-xs sm:text-sm font-medium tracking-wider text-gray-600 dark:text-gray-400 uppercase">
              Developer Platform
            </span>
          </motion.div>

          {/* Main Heading - Left Aligned, Better Typography */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-2 mb-6"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-left">
              <span className="block text-gray-900 dark:text-white leading-[1.15]">
                The AI-Powered
              </span>
              <span className="block text-gray-900 dark:text-white leading-[1.15] text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                Platform for
              </span>
              <span className="block bg-gradient-to-r from-sky-600 via-blue-600 to-purple-600 dark:from-sky-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent leading-[1.15] text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                Your Dev Career
              </span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed mb-8 text-left"
          >
            Centralize learning, personalized roadmaps, job updates, and powerful resume tools—all in one smart dashboard.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
          >
            <Button
              asChild
              size="lg"
              className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 px-6 py-3 text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <a href={primaryCta.href}>{primaryCta.text}</a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="ghost"
              className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-300"
            >
              <a href={secondaryCta.href} className="flex items-center gap-2">
                {secondaryCta.icon}
                {secondaryCta.text}
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Mockup Section - Starts below hero content, visible in same viewport */}
        <div className="relative w-full px-4 sm:px-6 lg:px-8 flex justify-center pb-8 sm:pb-12 md:pb-16">
          {/* Border wrapper - Smaller size */}
          <div className="relative rounded-xl sm:rounded-2xl p-[2px] sm:p-[3px] overflow-hidden max-w-4xl w-full group">
            {/* Animated gradient border */}
            <div
              className="absolute inset-0 rounded-xl sm:rounded-2xl
        bg-[conic-gradient(from_0deg,#0ea5e9_0%_20%,transparent_25%_75%,#0ea5e9_80%_100%)]
        animate-spin-slow opacity-70 group-hover:opacity-100 transition-opacity duration-500"
            ></div>

            {/* Soft glowing aura */}
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl blur-lg bg-sky-500/20 dark:bg-sky-400/20 animate-pulse-glow"></div>

            {/* Inner card with browser-like frame */}
            <div className="relative rounded-lg sm:rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-2xl">
              {/* Browser Header Bar - Smaller */}
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                {/* Traffic Lights */}
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer"></div>
                </div>

                {/* URL Bar */}
                <div className="flex-1 ml-3 bg-white dark:bg-gray-700 rounded px-3 py-1 flex items-center gap-2 shadow-inner">
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-xs text-gray-600 dark:text-gray-300 font-mono">devpocket.app/dashboard</span>
                </div>

                {/* Action Icons */}
                <div className="flex gap-1 ml-2">
                  <div className="w-5 h-5 rounded flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                    <svg className="w-3 h-3 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Mockup Content */}
              <Mockup className="rounded-none shadow-none">
                <img
                  {...mockupImage}
                  className="w-full h-auto"
                  loading="lazy"
                  decoding="async"
                />
              </Mockup>

              {/* Status Badge - Floating - Smaller */}
              <div className="absolute bottom-4 right-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-full px-3 py-1.5 shadow-lg border border-gray-200/50 dark:border-gray-700/50 flex items-center gap-1.5 animate-bounce-slow">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">Live Preview</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Glow
          variant="above"
          className="animate-appear-zoom opacity-0 [animation-delay:1000ms]"
        />
      </div>
    </section>
  )
}
