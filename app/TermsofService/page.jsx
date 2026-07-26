// app/terms/page.tsx
import React from "react";
import Link from "next/link";

const TermsOfService = () => {
  return (
    <main className="min-h-screen pt-24 pb-20 bg-gradient-to-br from-slate-50 to-sky-50 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Last Updated: June 23, 2026
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-10 md:p-16">
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Please read these Terms of Service carefully before using Dev
            Pocket.
          </p>

          {/* 1. Introduction */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              1. Introduction and Acceptance of Terms
            </h2>
            <p>
              Welcome to <strong>Dev Pocket</strong> ("we", "us", or "our"). By
              accessing or using our website, platform, and services
              (collectively, the "Service"), you agree to be bound by these
              Terms of Service ("Terms").
            </p>
            <p className="mt-4">
              If you do not agree to these Terms, you must not use the Service.
              These Terms constitute a legally binding agreement between you and
              Dev Pocket.
            </p>
          </section>

          {/* 2. User Responsibilities */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              2. User Responsibilities and Acceptable Use
            </h2>
            <p>You agree to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700 dark:text-gray-300">
              <li>
                Provide accurate and complete information when creating an
                account
              </li>
              <li>Maintain the security of your account credentials</li>
              <li>Use the Service only for lawful purposes</li>
              <li>
                Not engage in any activity that disrupts or interferes with the
                Service
              </li>
              <li>
                Not attempt to gain unauthorized access to any part of the
                Service
              </li>
            </ul>
            <p className="mt-4 font-semibold">You are prohibited from:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-700 dark:text-gray-300">
              <li>Sharing or selling accounts</li>
              <li>Uploading harmful code, viruses, or malicious content</li>
              <li>Harassing, threatening, or impersonating others</li>
              <li>Scraping or extracting data without permission</li>
            </ul>
          </section>

          {/* 3. Intellectual Property */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              3. Intellectual Property Rights
            </h2>
            <p>
              All content, features, and functionality on Dev Pocket (including
              but not limited to text, graphics, logos, icons, and software) are
              the exclusive property of Dev Pocket and are protected by
              copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          {/* 4. Content Ownership */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              4. Content Ownership and Licensing
            </h2>
            <p>
              You retain ownership of any content you upload or create on the
              platform (such as resumes, portfolios, or roadmaps). By using the
              Service, you grant us a worldwide, non-exclusive, royalty-free
              license to host, store, and display your content solely for the
              purpose of providing the Service.
            </p>
          </section>

          {/* 5. Third-Party Links */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              5. Third-Party Links and Services
            </h2>
            <p>
              The Service may contain links to third-party websites or services.
              We are not responsible for the content, policies, or practices of
              any third-party sites. Your interactions with such third parties
              are solely between you and them.
            </p>
          </section>

          {/* 6. Disclaimer of Warranties */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              6. Disclaimer of Warranties
            </h2>
            <p>
              The Service is provided "AS IS" and "AS AVAILABLE" without any
              warranties of any kind, either express or implied, including but
              not limited to implied warranties of merchantability, fitness for
              a particular purpose, or non-infringement.
            </p>
            <p className="mt-4">
              We do not guarantee that the Service will be uninterrupted,
              error-free, or secure.
            </p>
          </section>

          {/* 7. Limitation of Liability */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              7. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by law, Dev Pocket shall not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages arising out of or related to your use of the
              Service.
            </p>
          </section>

          {/* 8. Privacy */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              8. Privacy
            </h2>
            <p>
              Your privacy is important to us. Please review our{" "}
              <Link href="/privacy" className="text-sky-600 hover:underline">
                Privacy Policy
              </Link>
              , which explains how we collect, use, and protect your
              information.
            </p>
          </section>

          {/* 9. Changes to Terms */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              9. Changes to Terms
            </h2>
            <p>
              We reserve the right to modify these Terms at any time. We will
              notify you of significant changes by posting the new Terms on this
              page and updating the "Last Updated" date. Your continued use of
              the Service after such changes constitutes your acceptance of the
              new Terms.
            </p>
          </section>

          {/* 10. Contact */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              10. Contact Information
            </h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="mt-6 p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl">
              <p>
                <strong>Email:</strong> legal@devpocket.dev
              </p>
              <p>
                <strong>Support:</strong>{" "}
                <Link href="/contact" className="text-sky-600 hover:underline">
                  Contact Page
                </Link>
              </p>
            </div>
          </section>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            By using Dev Pocket, you acknowledge that you have read, understood,
            and agree to be bound by these Terms of Service.
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Link
            href="/"
            className="inline-block bg-gray-900 hover:bg-black dark:bg-white dark:text-gray-900 text-white font-semibold px-10 py-4 rounded-full transition text-center"
          >
            Back to Home
          </Link>
          <Link
            href="/faq"
            className="inline-block border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 font-semibold px-10 py-4 rounded-full transition text-center"
          >
            View FAQ
          </Link>
        </div>
      </div>
    </main>
  );
};

export default TermsOfService;
