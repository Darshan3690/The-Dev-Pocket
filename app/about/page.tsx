// pages/about.tsx

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
        <h1 className="text-5xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">
          About Dev Pocket
        </h1>

        <p className="text-xl text-gray-800 mb-8 max-w-3xl mx-auto">
          <span className="font-semibold text-indigo-700">Dev Pocket</span> is a cutting-edge AI-powered platform dedicated to empowering developers at every stage of their careers. Whether you&apos;re a beginner taking your first steps or an experienced engineer seeking new challenges, Dev Pocket provides a personalized experience tailored just for you.
        </p>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-indigo-700 mb-6">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow cursor-pointer">
              <h3 className="text-xl font-semibold text-pink-600 mb-3">Personalized Roadmaps</h3>
              <p className="text-gray-700">
                AI-driven custom learning paths designed to match your unique goals and skillset — so you learn efficiently and effectively.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow cursor-pointer">
              <h3 className="text-xl font-semibold text-pink-600 mb-3">Curated Learning</h3>
              <p className="text-gray-700">
                Access high-quality tutorials, courses, and resources vetted by experts to help you stay ahead in your development journey.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow cursor-pointer">
              <h3 className="text-xl font-semibold text-pink-600 mb-3">Job Search & Matching</h3>
              <p className="text-gray-700">
                Discover job opportunities perfectly aligned with your skills, interests, and career aspirations, powered by intelligent matching.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow cursor-pointer">
              <h3 className="text-xl font-semibold text-pink-600 mb-3">Resume & Portfolio Tools</h3>
              <p className="text-gray-700">
                Create professional resumes and portfolios effortlessly with AI-powered templates and personalized feedback.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12 bg-indigo-100 p-8 rounded-xl shadow-inner">
          <h2 className="text-3xl font-bold text-indigo-800 mb-6">Our Mission</h2>
          <p className="text-gray-900 max-w-4xl mx-auto">
            At <span className="font-semibold">Dev Pocket</span>, we believe every developer deserves a clear, guided path to success. We strive to eliminate the guesswork, providing you with structured insights, smart tools, and continuous support to help you achieve your career goals faster and with confidence.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-pink-700 mb-6">Trusted by Developers Worldwide</h2>
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
            href="/signup"
            className="inline-block bg-gradient-to-r from-pink-500 to-indigo-600 text-white px-10 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition"
          >
            Join Now
          </Link>
        </section>
      </main>
    </>
  );
};

export default AboutPage;
