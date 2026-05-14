"use client";

import { useState } from "react";
import { showSuccess, showError } from "@/lib/toast";

export default function FeedbackPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) {
      showError("Please enter your feedback message.");
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      showSuccess("Thank you for your feedback! 💙");

      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      showError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 pt-28 pb-16 px-4 sm:px-6 lg:px-8">      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 border border-gray-200 dark:border-gray-800">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          We Value Your Feedback 💬
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Share your suggestions, report issues, or tell us how we can improve Dev Pocket.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <input
              type="text"
              placeholder="Your Name (Optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Your Email (Optional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
          </div>

          <div>
            <textarea
              rows={5}
              placeholder="Write your feedback here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      </div>
    </div>
  );
}