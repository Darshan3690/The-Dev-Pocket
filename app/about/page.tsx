// app/about/page.tsx

import React from "react";
import Head from "next/head";
import Link from "next/link";

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>About | Dev Pocket</title>
        <meta
          name="description"
          content="Learn more about Dev Pocket – the AI-powered platform that helps developers grow their careers with personalized learning, job matching, and professional tools."
        />
      </Head>

      <main className="bg-[#0A1428] text-white min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-24 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(at_top_right,#4F46E510_0%,transparent_50%)]"></div>

          <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 border border-white/20">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium tracking-widest uppercase">
                Empowering Developers Since 2024
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-none mb-6">
              Your AI-Powered
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Developer Companion
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-10">
              We help developers accelerate their growth with intelligent tools,
              personalized guidance, and career opportunities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/sign-up"
                className="inline-block bg-white text-[#0A1428] px-10 py-4 rounded-2xl font-semibold text-lg hover:bg-slate-100 transition-all active:scale-[0.985] shadow-xl shadow-indigo-500/30"
              >
                Get Started Free
              </Link>
              <Link
                href="#mission"
                className="inline-block border border-white/30 hover:border-white/60 px-8 py-4 rounded-2xl font-medium text-lg transition-all"
              >
                Learn Our Story
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="border-b border-white/10 py-8 bg-black/40">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 text-center">
              {[
                { number: "50K+", label: "Developers Empowered" },
                { number: "1,200+", label: "Roadmaps Generated" },
                { number: "85%", label: "Interview Success Rate" },
                { number: "240+", label: "Partner Companies" },
              ].map((stat, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="text-4xl font-bold text-white tracking-tighter">
                    {stat.number}
                  </div>
                  <div className="text-slate-400 text-sm mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="max-w-5xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7">
              <h2 className="text-4xl font-bold tracking-tight mb-6">
                Built for Developers, by Developers
              </h2>
              <div className="space-y-6 text-lg text-slate-300">
                <p>
                  Dev Pocket was born from the frustration of navigating a
                  developer career without clear direction. We experienced the
                  scattered resources, overwhelming choices, and lack of
                  personalized guidance firsthand.
                </p>
                <p>
                  So we built a platform that combines powerful AI with
                  real-world developer experience to give you the structure,
                  tools, and opportunities you actually need to succeed.
                </p>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="bg-gradient-to-br from-slate-900 to-zinc-900 border border-white/10 rounded-3xl p-8">
                <div className="text-sm uppercase tracking-widest text-indigo-400 mb-2">
                  OUR FOUNDATION
                </div>
                <ul className="space-y-4 text-slate-300">
                  {[
                    "Deep understanding of modern tech careers",
                    "AI that adapts to your unique journey",
                    "Focus on practical, job-ready skills",
                    "Commitment to developer privacy & ownership",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-emerald-400 mt-1.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section
          id="mission"
          className="bg-black/60 py-20 border-y border-white/10"
        >
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Mission */}
              <div className="space-y-6">
                <div className="inline-block px-4 py-2 bg-indigo-950 text-indigo-300 rounded-full text-sm font-medium">
                  MISSION
                </div>
                <h2 className="text-4xl font-bold tracking-tight">
                  Our Mission
                </h2>
                <p className="text-2xl leading-relaxed text-slate-200">
                  To democratize world-class career development for every
                  developer — regardless of background, experience, or location.
                </p>
                <p className="text-slate-400">
                  We remove guesswork and barriers by providing intelligent
                  tools, structured learning, and direct career opportunities.
                </p>
              </div>

              {/* Vision */}
              <div className="space-y-6">
                <div className="inline-block px-4 py-2 bg-purple-950 text-purple-300 rounded-full text-sm font-medium">
                  VISION
                </div>
                <h2 className="text-4xl font-bold tracking-tight">
                  Our Vision
                </h2>
                <p className="text-2xl leading-relaxed text-slate-200">
                  A world where every developer has a clear, personalized path
                  to success and fulfillment in their career.
                </p>
                <p className="text-slate-400">
                  We envision Dev Pocket as the essential companion that grows
                  with you from your first line of code to leadership roles.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <div className="uppercase tracking-[3px] text-indigo-400 text-sm font-medium mb-3">
              WHAT WE OFFER
            </div>
            <h2 className="text-4xl font-bold tracking-tight">
              Powerful Tools for Every Stage of Your Career
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/create-roadmap" className="group">
              <div className="h-full bg-zinc-900/70 hover:bg-zinc-900 border border-white/10 hover:border-indigo-500/30 rounded-3xl p-8 transition-all duration-300 flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-indigo-950 rounded-2xl group-hover:scale-110 transition-transform">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-indigo-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold">
                      Personalized Roadmaps
                    </h3>
                    <p className="text-indigo-400 text-sm">
                      AI-Driven Learning Paths
                    </p>
                  </div>
                </div>
                <p className="text-slate-300 flex-1">
                  Get custom learning journeys tailored to your goals, current
                  skill level, and preferred pace. Continuously adapts as you
                  grow.
                </p>
                <div className="mt-8 text-indigo-400 font-medium group-hover:gap-3 transition-all flex items-center">
                  Create Your Roadmap →
                </div>
              </div>
            </Link>

            <Link href="/dashboard" className="group">
              <div className="h-full bg-zinc-900/70 hover:bg-zinc-900 border border-white/10 hover:border-purple-500/30 rounded-3xl p-8 transition-all duration-300 flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-purple-950 rounded-2xl group-hover:scale-110 transition-transform">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-purple-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold">Curated Learning</h3>
                    <p className="text-purple-400 text-sm">Quality Resources</p>
                  </div>
                </div>
                <p className="text-slate-300 flex-1">
                  Access expert-curated courses, tutorials, projects, and
                  documentation. Stay up-to-date with the latest technologies
                  and best practices.
                </p>
                <div className="mt-8 text-purple-400 font-medium group-hover:gap-3 transition-all flex items-center">
                  Start Learning →
                </div>
              </div>
            </Link>

            <Link href="/job" className="group">
              <div className="h-full bg-zinc-900/70 hover:bg-zinc-900 border border-white/10 hover:border-emerald-500/30 rounded-3xl p-8 transition-all duration-300 flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-emerald-950 rounded-2xl group-hover:scale-110 transition-transform">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-emerald-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold">
                      Smart Job Matching
                    </h3>
                    <p className="text-emerald-400 text-sm">
                      Career Opportunities
                    </p>
                  </div>
                </div>
                <p className="text-slate-300 flex-1">
                  AI-powered job recommendations and matching. Prepare for
                  interviews with role-specific guidance and get noticed by top
                  companies.
                </p>
                <div className="mt-8 text-emerald-400 font-medium group-hover:gap-3 transition-all flex items-center">
                  Find Your Next Role →
                </div>
              </div>
            </Link>

            <Link href="/dashboard/resume" className="group">
              <div className="h-full bg-zinc-900/70 hover:bg-zinc-900 border border-white/10 hover:border-amber-500/30 rounded-3xl p-8 transition-all duration-300 flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-amber-950 rounded-2xl group-hover:scale-110 transition-transform">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-amber-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold">
                      Resume &amp; Portfolio Builder
                    </h3>
                    <p className="text-amber-400 text-sm">Personal Branding</p>
                  </div>
                </div>
                <p className="text-slate-300 flex-1">
                  AI-assisted resume and portfolio creation with ATS
                  optimization, design templates, and recruiter-level feedback.
                </p>
                <div className="mt-8 text-amber-400 font-medium group-hover:gap-3 transition-all flex items-center">
                  Build Your Profile →
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Core Values */}
        <section className="max-w-5xl mx-auto px-6 py-20 bg-black/40">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight">
              Our Core Values
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                title: "Clarity",
                desc: "We cut through noise and give you clear, actionable next steps.",
              },
              {
                title: "Intelligence",
                desc: "AI that truly understands developer workflows and career dynamics.",
              },
              {
                title: "Ownership",
                desc: "Your data belongs to you. Full transparency and control.",
              },
              {
                title: "Community",
                desc: "Learning and growing together with developers worldwide.",
              },
            ].map((value, i) => (
              <div
                key={i}
                className="bg-zinc-900/70 border border-white/10 rounded-3xl p-8 hover:border-white/30 transition-colors"
              >
                <div className="text-3xl mb-4">#{i + 1}</div>
                <h3 className="text-2xl font-semibold mb-3">{value.title}</h3>
                <p className="text-slate-400">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight mb-3">
              Real Developers. Real Growth.
            </h2>
            <p className="text-slate-400">
              Don&apos;t just take our word for it
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "Dev Pocket helped me go from a junior frontend dev to landing a senior role at Google in under 9 months.",
                name: "Priya Sharma",
                role: "Senior Software Engineer @ Google",
                avatar: "👩🏻‍💻",
              },
              {
                quote:
                  "The AI resume feedback and interview tools helped me break through to mid-level and land a role at Stripe.",
                name: "Marcus Chen",
                role: "Full Stack Engineer @ Stripe",
                avatar: "🧔🏻‍♂️",
              },
              {
                quote:
                  "As a self-taught developer, Dev Pocket gave me the structure I needed. Landed my first remote role in 4 months.",
                name: "Aisha Okoro",
                role: "Backend Engineer @ Remote.com",
                avatar: "👩🏾‍💻",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-zinc-900/70 border border-white/10 rounded-3xl p-8 flex flex-col"
              >
                <div className="text-4xl mb-6 opacity-70">{t.avatar}</div>
                <p className="text-slate-300 flex-1 italic">“{t.quote}”</p>
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-slate-400">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-3xl mx-auto px-6 pb-24 text-center">
          <div className="bg-gradient-to-br from-indigo-600/10 to-purple-600/10 border border-white/10 rounded-3xl p-12">
            <h2 className="text-4xl font-bold tracking-tight mb-6">
              Ready to Accelerate Your Career?
            </h2>
            <p className="text-xl text-slate-300 mb-10">
              Join thousands of developers building their future with Dev
              Pocket.
            </p>

            <Link
              href="/sign-up"
              className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-12 py-5 rounded-2xl font-semibold text-xl shadow-2xl hover:brightness-110 transition-all active:scale-95"
            >
              Create Your Free Account
            </Link>

            <p className="text-xs text-slate-500 mt-8">
              Takes less than 60 seconds • No payment required
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default AboutPage;
