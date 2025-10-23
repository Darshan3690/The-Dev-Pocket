import { AnimatedTestimonials } from '@/components/ui/animated-testimonials'
import React from 'react'

const testimonials = [
  {
    quote:
      "Dev Pocket completely changed how I approach learning. The personalized roadmap was a game-changer for me.",
    name: "Sarah Johnson",
    designation: "Frontend Developer",
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "The job matching feature is incredible. I found a role that was a perfect fit in less than a month.",
    name: "Michael Chen",
    designation: "Backend Engineer",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "As a recent bootcamp grad, Dev Pocket gave me the structure and confidence I needed to land my first tech job.",
    name: "Jessica Rodriguez",
    designation: "Junior Full-Stack Developer",
    src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];


function Testimonials() {
  return (
    <>
    <section
        id="testimonials"
        className="relative py-20 sm:py-28 bg-gradient-to-r from-sky-50 via-[#135b85]/10 to-sky-50"
      >
        {/* 🔹 Top Wave Divider */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-20 fill-white"
          >
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>

        {/* 🔹 Content */}
        <div className="relative max-w-6xl mx-auto text-center z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Loved by Developers Worldwide
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Here’s how Dev Pocket is transforming careers across the globe.
          </p>

          {/* ✅ Animated Testimonials */}
          <AnimatedTestimonials testimonials={testimonials} />
        </div>
      </section>

    </>
  )
}

export default Testimonials