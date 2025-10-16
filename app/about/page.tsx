// app/about/page.tsx

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

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

      <main className="max-w-5xl mx-auto px-6 py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-lg shadow-lg">
        <h1 id="hero-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800 leading-tight mb-3">
          About Dev Pocket
        </h1>

        <p className="text-xl text-gray-800 mb-8 max-w-3xl mx-auto">
          Dev Pocket is a cutting-edge AI-powered platform dedicated to empowering developers at every stage of their careers. Whether you&apos;re a beginner taking your first steps or an experienced engineer seeking new challenges, Dev Pocket provides a personalized experience tailored just for you.
        </p>

        <section className="mb-12">
          <h2 id="hero-heading" className="text-3xl sm:text-md lg:text-md font-extrabold text-gray-800 leading-tight mb-3">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personalized Roadmaps - Clickable */}
            <Link href="/create-roadmap">
              <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-2 hover:scale-105 duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-blue-600">Personalized Roadmaps</h3>
                </div>
                <p className="text-gray-700">
                  AI-driven custom learning paths designed to match your unique goals and skillset — so you learn efficiently and effectively.
                </p>
                <div className="mt-4 flex items-center text-blue-600 font-semibold group">
                  <span>Explore Roadmaps</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Curated Learning - Clickable */}
            <Link href="/dashboard">
              <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-2 hover:scale-105 duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-blue-600">Curated Learning</h3>
                </div>
                <p className="text-gray-700">
                  Access high-quality tutorials, courses, and resources vetted by experts to help you stay ahead in your development journey.
                </p>
                <div className="mt-4 flex items-center text-blue-600 font-semibold group">
                  <span>Start Learning</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Job Search & Matching - Clickable */}
            <Link href="/job">
              <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-2 hover:scale-105 duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-blue-600">Job Search & Matching</h3>
                </div>
                <p className="text-gray-700">
                  Discover job opportunities perfectly aligned with your skills, interests, and career aspirations, powered by intelligent matching.
                </p>
                <div className="mt-4 flex items-center text-blue-600 font-semibold group">
                  <span>Find Jobs</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Resume & Portfolio Tools - Clickable */}
            <Link href="/dashboard/resume">
              <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-2 hover:scale-105 duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-blue-600">Resume & Portfolio Tools</h3>
                </div>
                <p className="text-gray-700">
                  Create professional resumes and portfolios effortlessly with AI-powered templates and personalized feedback.
                </p>
                <div className="mt-4 flex items-center text-blue-600 font-semibold group">
                  <span>Build Resume</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </section>

        <section className="mb-12 bg-indigo-100 p-8 rounded-xl shadow-inner">
          <h2 className="text-3xl font-bold text-blue-700 mb-6">Our Mission</h2>
          <p className="text-gray-900 max-w-4xl mx-auto">
            At <span className="font-semibold">Dev Pocket</span>, we believe every developer deserves a clear, guided path to success. We strive to eliminate the guesswork, providing you with structured insights, smart tools, and continuous support to help you achieve your career goals faster and with confidence.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-700 mb-6">Trusted by Developers Worldwide</h2>
          <p className="text-gray-800 max-w-4xl mx-auto mb-6">
            Thousands of developers globally rely on Dev Pocket to learn new skills, connect with job opportunities, and showcase their talents professionally.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {["🌎 Global Reach", "💡 Innovative AI", "👩‍💻 Expert Community", "🚀 Career Growth"].map((item) => (
              <div key={item} className="bg-white rounded-full px-6 py-3 shadow-md text-indigo-600 font-semibold text-lg hover:bg-indigo-50 transition cursor-default">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="text-center">
          <p className="text-gray-700 text-lg mb-8">
            Ready to take your developer career to the next level?{' '}
            <Link href="/" className="text-indigo-700 underline font-bold hover:text-indigo-900">
              Get started for free today
            </Link>{' '}
            and join the <span className="font-semibold">Dev Pocket</span> community.
          </p>
          <Link
            href="/sign-up"
            className="inline-block bg-gradient-to-r from-blue-600 to-blue-400 text-white px-10 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition"
          >
            Join Now
          </Link>
        </section>
      </main>
    </>
  );
};

export default AboutPage;