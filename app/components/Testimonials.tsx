import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import React from "react";

const testimonials = [
  {
    quote:
      "Dev Pocket completely changed how I approach learning. The personalized roadmap was a game-changer for me.",
    name: "Sarah Johnson",
    designation: "Frontend Developer at Vercel",
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 5,
  },
  {
    quote:
      "The job matching feature is incredible. I found a role that was a perfect fit in less than a month.",
    name: "Michael Chen",
    designation: "Backend Engineer at Stripe",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 5,
  },
  {
    quote:
      "As a recent bootcamp grad, Dev Pocket gave me the structure and confidence I needed to land my first tech job.",
    name: "Jessica Rodriguez",
    designation: "Junior Full-Stack Developer at Shopify",
    src: "https://images.unsplash.com/photo-1580489944761-09be1ec59862?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 5,
  },
];

function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#0a0f1c] py-16 sm:py-20"
    >
      {/* Top wave divider - dark theme */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
          className="h-16 w-full fill-slate-950"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(14,165,233,0.08),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(129,140,248,0.06),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-900/50 bg-sky-950/50 px-4 py-1.5 text-sm font-medium text-sky-400 mb-4">
            ✨ Community Love
          </div>

          <h2 className="mb-4 text-4xl font-extrabold leading-tight tracking-tighter text-white sm:text-5xl">
            Loved by Developers
            <span className="block bg-gradient-to-r from-sky-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Worldwide
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Real stories from developers who leveled up their careers with{" "}
            <span className="font-semibold text-white">Dev Pocket</span>
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-slate-800/80 bg-slate-950/70 p-2 shadow-2xl shadow-black/60 backdrop-blur-xl sm:p-3">
            <AnimatedTestimonials testimonials={testimonials} />
          </div>
        </div>

        {/* Trust signals */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <div className="text-emerald-400">★ ★ ★ ★ ★</div>
            <span>4.98 average rating</span>
          </div>
          <div>✓ Verified testimonials</div>
          <div>10,000+ developers helped</div>
        </div>
      </div>

      {/* Bottom wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
          className="h-20 w-full fill-slate-950"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
}

export default Testimonials;
