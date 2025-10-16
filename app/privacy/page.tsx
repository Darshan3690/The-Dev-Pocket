import React from "react";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <article className="prose prose-lg">
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600">
            Privacy Policy
          </h1>
        </header>

        <section className="mt-6">
          <p style={{ color: '#0F0E0E' }} className="leading-relaxed">
            How The-Dev-Pocket collects, uses, and protects your personal information when you use our educational platform and services.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold text-blue-600">1. Information We Collect</h2>
          <p style={{ color: '#0F0E0E' }} className="mt-3 leading-relaxed">
            <strong>Account Information:</strong> We collect information you provide when registering, including name, email address, username, and profile details.
          </p>
          <p style={{ color: '#0F0E0E' }} className="mt-3 leading-relaxed">
            <strong>Usage Data:</strong> We automatically collect information about how you use our platform, including pages visited, features used, learning progress, time spent, and interaction patterns.
          </p>
          <p style={{ color: '#0F0E0E' }} className="mt-3 leading-relaxed">
            <strong>Community Contributions:</strong> Content you submit to open-source repositories, community discussions, forums, and educational materials.
          </p>
          <p style={{ color: '#0F0E0E' }} className="mt-3 leading-relaxed">
            <strong>Technical Information:</strong> Device information, IP address, browser type, operating system, and cookies for platform functionality and analytics.
          </p>
          <p style={{ color: '#0F0E0E' }} className="mt-3 leading-relaxed">
            <strong>Payment Information:</strong> Billing details for premium services, processed securely through third-party payment processors. We do not store complete payment card information.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold text-blue-600">2. How We Use Your Information</h2>
          <p style={{ color: '#0F0E0E' }} className="mt-3 leading-relaxed">We use collected information to:</p>
          <ul className="list-disc pl-6 mt-3" style={{ color: '#0F0E0E' }}>
            <li>Provide and improve our educational services and tools</li>
            <li>Personalize learning experiences and content recommendations</li>
            <li>Process payments and manage premium subscriptions</li>
            <li>Facilitate community interactions and open-source contributions</li>
            <li>Send important updates, security alerts, and educational content</li>
            <li>Analyze platform usage to enhance features and performance</li>
            <li>Ensure platform security and prevent fraudulent activities</li>
          </ul>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold text-blue-600">3. Information Sharing and Disclosure</h2>
          <p style={{ color: '#0F0E0E' }} className="mt-3 leading-relaxed">
            <strong>Community Content:</strong> Your contributions to open-source projects, forums, and community sections are publicly visible and may be shared under applicable open-source licenses.
          </p>
          <p style={{ color: '#0F0E0E' }} className="mt-3 leading-relaxed">
            <strong>Service Providers:</strong> We share information with trusted third-party service providers who assist in platform operations, payment processing, analytics, and customer support.
          </p>
          <p style={{ color: '#0F0E0E' }} className="mt-3 leading-relaxed">
            <strong>Legal Requirements:</strong> We may disclose information when required by law, court orders, or to protect our rights and user safety.
          </p>
          <p style={{ color: '#0F0E0E' }} className="mt-3 leading-relaxed">
            <strong>Business Transfers:</strong> In the event of merger, acquisition, or sale, user information may be transferred as part of business assets.
          </p>
          <p style={{ color: '#0F0E0E' }} className="mt-3 leading-relaxed">
            We do not sell personal information to third parties for marketing purposes.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold text-blue-600">4. Data Security and Protection</h2>
          <p style={{ color: '#0F0E0E' }} className="mt-3 leading-relaxed">We implement industry-standard security measures to protect your information, including:</p>
          <ul className="list-disc pl-6 mt-3" style={{ color: '#0F0E0E' }}>
            <li>Encryption of data in transit and at rest</li>
            <li>Secure authentication and access controls</li>
            <li>Regular security assessments and updates</li>
            <li>Limited access to personal information on a need-to-know basis</li>
          </ul>
          <p style={{ color: '#0F0E0E' }} className="mt-3 leading-relaxed">
            However, no internet transmission is completely secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold text-blue-600">5. Your Privacy Rights and Choices</h2>
          <p style={{ color: '#0F0E0E' }} className="mt-3 leading-relaxed">
            <strong>Account Management:</strong> You can update, correct, or delete your account information through your profile settings.
          </p>
          <p style={{ color: '#0F0E0E' }} className="mt-3 leading-relaxed">
            <strong>Communication Preferences:</strong> You may opt-out of promotional emails while continuing to receive essential service communications.
          </p>
          <p style={{ color: '#0F0E0E' }} className="mt-3 leading-relaxed">
            <strong>Data Access:</strong> You can request access to personal information we hold about you.
          </p>
          <p style={{ color: '#0F0E0E' }} className="mt-3 leading-relaxed">
            <strong>Data Deletion:</strong> You may request deletion of your account and associated personal information, subject to legal and operational requirements.
          </p>
          <p style={{ color: '#0F0E0E' }} className="mt-3 leading-relaxed">
            <strong>Cookie Control:</strong> Most browsers allow you to control cookie settings, though this may affect platform functionality.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold text-blue-600">6. Children&apos;s Privacy</h2>
          <p style={{ color: '#0F0E0E' }} className="mt-3 leading-relaxed">
            Our platform is not intended for users under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware of such collection, we will delete the information promptly.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold text-blue-600">7. International Data Transfers</h2>
          <p style={{ color: '#0F0E0E' }} className="mt-3 leading-relaxed">
            Your information may be processed and stored in countries other than your residence. We ensure appropriate safeguards are in place for international data transfers in compliance with applicable privacy laws.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold text-blue-600">8. Third-Party Services and Links</h2>
          <p style={{ color: '#0F0E0E' }} className="mt-3 leading-relaxed">
            Our platform may contain links to external websites or integrate with third-party services. This Privacy Policy does not apply to third-party sites, and we encourage you to review their privacy practices.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold text-blue-600">9. Data Retention</h2>
          <p style={{ color: '#0F0E0E' }} className="mt-3 leading-relaxed">
            We retain personal information for as long as necessary to provide services, comply with legal obligations, and resolve disputes. Account information is typically retained until account deletion, while community contributions may remain publicly available under open-source licenses.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold text-blue-600">10. Analytics and Tracking</h2>
          <p style={{ color: '#0F0E0E' }} className="mt-3 leading-relaxed">
            We use analytics tools to understand platform usage and improve user experience. These tools may collect information about your interactions, which is used in aggregate form for analysis purposes.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold text-blue-600">11. Updates to Privacy Policy</h2>
          <p style={{ color: '#0F0E0E' }} className="mt-3 leading-relaxed">
            We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. Material changes will be communicated through email or platform notifications. Continued use after updates constitutes acceptance of the revised policy.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold text-blue-600">12. Regional Privacy Rights</h2>
          <p style={{ color: '#0F0E0E' }} className="mt-3 leading-relaxed">
            <strong>European Users:</strong> Under GDPR, you have rights to access, rectify, erase, restrict processing, data portability, and object to processing of your personal information.
          </p>
          <p style={{ color: '#0F0E0E' }} className="mt-3 leading-relaxed">
            <strong>California Users:</strong> Under CCPA, you have rights to know what personal information is collected, request deletion, and opt-out of sale of personal information.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold text-blue-600">13. Contact Information</h2>
          <p style={{ color: '#0F0E0E' }} className="mt-3 leading-relaxed">
            For privacy-related questions, requests, or concerns:
          </p>
          <p style={{ color: '#0F0E0E' }} className="mt-3 leading-relaxed">
            <a href="https://bento.me/darshan3690" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              https://bento.me/darshan3690
            </a>
          </p>
        </section>

        <footer className="mt-10">
          <p style={{ color: '#0F0E0E' }} className="text-sm">By using The-Dev-Pocket, you acknowledge that you have read and understood this Privacy Policy and consent to our privacy practices as described herein.</p>
        </footer>
      </article>
    </main>
  );
}