"use client";

import { UserProfile } from "@clerk/nextjs";
import { BookOpen } from "lucide-react";
import { showSuccess } from "@/lib/toast";

const SettingsPage = () => {
  const handleRestartTutorial = () => {
    localStorage.removeItem("onboarding-completed");
    window.dispatchEvent(new Event("restart-onboarding"));
    showSuccess("Tutorial restarted! The onboarding tour will begin shortly.");
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Custom Settings Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          App Settings
        </h2>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  Onboarding Tutorial
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Need a refresher? Restart the interactive onboarding tour to learn about all features.
                </p>
              </div>
            </div>
            <button
              onClick={handleRestartTutorial}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
            >
              Restart Tour
            </button>
          </div>
        </div>
      </div>

      {/* Clerk User Profile */}
      <div className="flex items-center justify-center w-full">
        <UserProfile path="/settings" routing="path" />
      </div>
    </div>
  );
};

export default SettingsPage;