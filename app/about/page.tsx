// app/about/page.tsx

"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// --- Utility Components for Visuals ---

const AmbientBackground = () => (
  <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
    {/* Grid Pattern */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
    
    {/* Glowing Orbs */}
    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-50 animate-pulse-slow"></div>
    <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-sky-500/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-50"></div>
  </div>
);

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const AboutPage = () => {
  return (
    <div className="relative min-h-screen text-gray-800 dark:text-gray-100 overflow-hidden">
      <AmbientBackground />

      <main className="max-w-7xl mx-auto px-6 py-24 sm:py-32">
        
        {/* --- Hero Section --- */}
        <div className="text-center max-w-4xl mx-auto mb-24">
          <FadeIn>
            <div className="inline-flex items-center rounded-full border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 text-sm font-medium text-indigo-600 dark:text-indigo-300 mb-6 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-indigo-500 mr-2 animate-pulse"></span>
              Our Story
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500 dark:from-indigo-400 dark:to-sky-400">Dev Pocket</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Dev Pocket is a cutting-edge AI-powered platform dedicated to empowering developers at every stage of their careers. Whether you&apos;re a beginner taking your first steps or an experienced engineer seeking new challenges, Dev Pocket provides a personalized experience tailored just for you.
            </p>
          </FadeIn>
        </div>

        {/* --- What We Offer Grid --- */}
        <section className="mb-32">
          <FadeIn delay={0.1}>
            <div className="text-center mb-12">
               <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">What We Offer</h2>
               <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-sky-500 mx-auto mt-4 rounded-full"></div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Personalized Roadmaps */}
            <FadeIn delay={0.2}>
              <Link href="/create-roadmap" className="block h-full group">
                <div className="relative h-full p-8 rounded-3xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200 dark:border-gray-800 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">Personalized Roadmaps</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                      AI-driven custom learning paths designed to match your unique goals and skillset — so you learn efficiently and effectively.
                    </p>
                    <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:translate-x-2 transition-transform">
                      <span>Explore Roadmaps</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>

            {/* Curated Learning */}
            <FadeIn delay={0.3}>
              <Link href="/dashboard" className="block h-full group">
                <div className="relative h-full p-8 rounded-3xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200 dark:border-gray-800 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors">Curated Learning</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                      Access high-quality tutorials, courses, and resources vetted by experts to help you stay ahead in your development journey.
                    </p>
                    <div className="flex items-center text-purple-600 font-semibold text-sm group-hover:translate-x-2 transition-transform">
                      <span>Start Learning</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>

            {/* Job Search & Matching */}
            <FadeIn delay={0.4}>
              <Link href="/job" className="block h-full group">
                <div className="relative h-full p-8 rounded-3xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200 dark:border-gray-800 hover:border-green-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/10 hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mb-6 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-green-600 transition-colors">Job Search & Matching</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                      Discover job opportunities perfectly aligned with your skills, interests, and career aspirations, powered by intelligent matching.
                    </p>
                    <div className="flex items-center text-green-600 font-semibold text-sm group-hover:translate-x-2 transition-transform">
                      <span>Find Jobs</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>
            
            {/* Resume Tools (Span full width on mobile or fit in grid) */}
             <div className="md:col-span-3 lg:col-span-1">
               <FadeIn delay={0.5}>
                <Link href="/dashboard/resume" className="block h-full group">
                    <div className="relative h-full p-8 rounded-3xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200 dark:border-gray-800 hover:border-orange-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
                    
                    <div className="relative z-10">
                        <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center mb-6 text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-orange-600 transition-colors">Resume & Portfolio Tools</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                        Create professional resumes and portfolios effortlessly with AI-powered templates and personalized feedback.
                        </p>
                        <div className="flex items-center text-orange-600 font-semibold text-sm group-hover:translate-x-2 transition-transform">
                        <span>Build Resume</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        </div>
                    </div>
                    </div>
                </Link>
              </FadeIn>
             </div>

          </div>
        </section>

        {/* --- Mission Section (Glass Card) --- */}
        <section className="mb-32">
          <FadeIn>
            <div className="relative p-10 md:p-16 rounded-[2.5rem] overflow-hidden">
              {/* Background Gradient for this card */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-90 dark:opacity-80"></div>
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Mission</h2>
                    <p className="text-indigo-100 text-lg md:text-xl leading-relaxed">
                        At <span className="font-bold text-white">Dev Pocket</span>, we believe every developer deserves a clear, guided path to success. We strive to eliminate the guesswork, providing you with structured insights, smart tools, and continuous support to help you achieve your career goals faster and with confidence.
                    </p>
                </div>
                <div className="flex-shrink-0 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                    <div className="text-4xl">🚀</div>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* --- Trusted By / Stats --- */}
        <section className="mb-32 text-center">
            <FadeIn>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Trusted by Developers Worldwide</h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">
                    Thousands of developers globally rely on Dev Pocket to learn new skills, connect with job opportunities, and showcase their talents professionally.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4">
                    {["🌎 Global Reach", "💡 Innovative AI", "👩‍💻 Expert Community", "🚀 Career Growth"].map((item, i) => (
                    <div key={item} className="px-6 py-3 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm text-gray-700 dark:text-gray-300 font-semibold hover:border-indigo-500 hover:text-indigo-500 transition-colors cursor-default select-none">
                        {item}
                    </div>
                    ))}
                </div>
            </FadeIn>
        </section>

        {/* --- Final CTA --- */}
        <section className="text-center pb-20">
            <FadeIn>
                <div className="relative inline-block group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-sky-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative p-8 bg-white dark:bg-gray-900 ring-1 ring-gray-900/5 rounded-2xl leading-none flex items-top justify-start space-x-6">
                        <div className="text-center">
                            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-xl">
                                Ready to take your developer career to the next level?{' '}
                                <Link href="/" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline decoration-2 underline-offset-4">
                                Get started for free today
                                </Link>{' '}
                                and join the <span className="font-semibold text-gray-900 dark:text-white">Dev Pocket</span> community.
                            </p>
                            <Link
                                href="/sign-up"
                                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-1 transition-all duration-300"
                            >
                                Join Now
                            </Link>
                        </div>
                    </div>
                </div>
            </FadeIn>
        </section>

      </main>
    </div>
  );
};

export default AboutPage;