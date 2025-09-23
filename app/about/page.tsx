// pages/about.tsx

import React from 'react';
import Head from 'next/head';

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

      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">About Dev Pocket</h1>

        <p className="text-lg text-gray-700 mb-6">
          Dev Pocket is an AI-powered platform designed to help developers grow their careers faster and smarter. 
          Whether you're just starting out or looking to advance, we bring all the essential tools and resources 
          together in one place.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">What We Offer</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
          <li>
            <strong>Personalized Roadmaps:</strong> Custom learning paths built by AI, tailored to your goals and current skills.
          </li>
          <li>
            <strong>Curated Learning:</strong> High-quality tutorials, courses, and resources—all hand-picked for your success.
          </li>
          <li>
            <strong>Job Search & Matching:</strong> Discover job opportunities that match your skills and interests.
          </li>
          <li>
            <strong>Resume & Portfolio Tools:</strong> Build polished, professional resumes and portfolios using intelligent templates.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
        <p className="text-gray-700 mb-6">
          We believe every developer deserves a clear path to success. Our mission is to eliminate guesswork and empower 
          you to achieve your career goals with structure, insight, and support.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Trusted by Developers Worldwide</h2>
        <p className="text-gray-700 mb-6">
          Thousands of developers around the world use Dev Pocket to learn new skills, stay updated with job opportunities, 
          and present themselves professionally in the job market.
        </p>

        <p className="text-gray-700">
          Ready to take the next step?{' '}
          <a href="/" className="text-blue-600 underline hover:text-blue-800">
            Get started for free today
          </a>{' '}
          and begin your journey with Dev Pocket.
        </p>
      </main>
    </>
  );
};

export default AboutPage;
