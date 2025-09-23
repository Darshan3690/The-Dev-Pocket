import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Mockup } from "@/components/ui/mockup"
import { Glow } from "@/components/ui/glow"
import { GithubIcon } from "lucide-react"

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
        "relative bg-background text-foreground",
        "py-12 px-4 ",
        "overflow-hidden",
        className,
      )}
    >
      <div className="relative mx-auto max-w-[1280px] flex flex-col gap-12 lg:gap-24">
        <div className="relative z-10 flex flex-col items-center gap-6 pt-8 md:pt-16 text-center lg:gap-12">
          {/* Heading */}
          <h1
            className={cn(
              "inline-block animate-appear",
              "bg-gradient-to-b from-foreground via-foreground/90 to-muted-foreground",
              "bg-clip-text text-transparent",
              "text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl",
              "leading-[1.1] sm:leading-[1.1]",
              "drop-shadow-sm dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]",
            )}
          >
            {title}
          </h1>

          {/* Description */}
          <p
            className={cn(
              "max-w-[550px] animate-appear opacity-0 [animation-delay:150ms]",
              "text-base sm:text-lg md:text-xl",
              "text-muted-foreground",
              "font-medium",
            )}
          >
            {description}
          </p>

          {/* CTAs */}
          <div
            className="relative z-10 flex flex-wrap justify-center gap-4 
            animate-appear opacity-0 [animation-delay:300ms]"
          >
            <Button
              asChild
              size="lg"
            className={cn(
  "bg-gradient-to-b from-[#0C4A6E] to-[#0C4A6E]/90 dark:from-[#0C4A6E]/90 dark:to-[#0C4A6E]/80",
  "hover:from-[#0C4A6E]/95 hover:to-[#0C4A6E]/85 dark:hover:from-[#0C4A6E]/80 dark:hover:to-[#0C4A6E]/70",
  "text-white shadow-lg",
  "transition-all duration-300"
)}

            >
              <a href={primaryCta.href}>{primaryCta.text}</a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="ghost"
              className={cn(
                "text-foreground/80 dark:text-foreground/70",
                "transition-all duration-300",
              )}
            >
              <a href={secondaryCta.href}>
                {secondaryCta.icon}
                {secondaryCta.text}
              </a>
            </Button>
          </div>

          {/* Mockup */}
<div className="relative w-full pt-12 px-4 sm:px-6 lg:px-8 flex justify-center">
  {/* Border wrapper */}
  <div className="relative rounded-3xl p-[3px] sm:p-[4px] md:p-[6px] overflow-hidden">
    {/* Animated gradient border (line moving around) */}
    <div
      className="absolute inset-0 rounded-3xl
        bg-[conic-gradient(from_0deg,#0C4A6E_0%_20%,transparent_25%_75%,#0C4A6E_80%_100%)]
        animate-spin-slow"
    ></div>

    {/* Soft glowing aura */}
    <div className="absolute inset-0 rounded-3xl blur-md bg-[#0C4A6E]/10 animate-pulse-glow"></div>

    {/* Inner card (plain white background) */}
    <div className="relative rounded-2xl overflow-hidden bg-white">
      <Mockup className="rounded-2xl shadow-xl bg-white">
        <img
          {...mockupImage}
          className="w-full h-auto rounded-2xl"
          loading="lazy"
          decoding="async"
        />
      </Mockup>
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
