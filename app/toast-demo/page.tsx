"use client";

import React from "react";
import { 
  showSuccess, 
  showError, 
  showInfo, 
  showWarning, 
  showLoading, 
  showPremium,
  showPromise,
  dismissAll 
} from "@/lib/toast";
import { 
  CheckCircle, 
  XCircle, 
  Info, 
  AlertTriangle, 
  Loader2, 
  Sparkles,
  Trash2
} from "lucide-react";

export default function ToastDemoPage() {
  // Simulate async operation
  const simulateAsync = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.5 ? resolve("Success!") : reject("Failed!");
      }, 2000);
    });
  };

  const handlePromiseDemo = () => {
    showPromise(
      simulateAsync(),
      {
        loading: "Processing your request...",
        success: "Operation completed successfully!",
        error: "Operation failed. Please try again.",
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            🎨 Toast Notifications Demo
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Beautiful, animated toast notifications with gradient designs
          </p>
        </div>

        {/* Demo Grid */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {/* Success Toast */}
          <button
            onClick={() => showSuccess("Task completed successfully! 🎉")}
            className="group relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-green-200 dark:border-green-800 hover:border-green-400 dark:hover:border-green-600 transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Success Toast
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Show success messages with green gradient background
            </p>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs font-bold text-green-600 dark:text-green-400">Click me!</span>
            </div>
          </button>

          {/* Error Toast */}
          <button
            onClick={() => showError("Oops! Something went wrong. ❌")}
            className="group relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-red-200 dark:border-red-800 hover:border-red-400 dark:hover:border-red-600 transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl shadow-lg">
                <XCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Error Toast
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Display error messages with red gradient background
            </p>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs font-bold text-red-600 dark:text-red-400">Click me!</span>
            </div>
          </button>

          {/* Info Toast */}
          <button
            onClick={() => showInfo("Here's some helpful information! ℹ️")}
            className="group relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                <Info className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Info Toast
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Share informational messages with blue gradient
            </p>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">Click me!</span>
            </div>
          </button>

          {/* Warning Toast */}
          <button
            onClick={() => showWarning("Warning: Please review this action! ⚠️")}
            className="group relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-amber-200 dark:border-amber-800 hover:border-amber-400 dark:hover:border-amber-600 transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-lg">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Warning Toast
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Alert users with amber/orange gradient warnings
            </p>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400">Click me!</span>
            </div>
          </button>

          {/* Loading Toast */}
          <button
            onClick={() => {
              const id = showLoading("Processing, please wait...");
              setTimeout(() => {
                dismissAll();
                showSuccess("Finished loading!");
              }, 3000);
            }}
            className="group relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <Loader2 className="w-6 h-6 text-white animate-spin" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Loading Toast
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Show loading states with animated spinner
            </p>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs font-bold text-purple-600 dark:text-purple-400">Click me!</span>
            </div>
          </button>

          {/* Premium Toast */}
          <button
            onClick={() => showPremium("🎉 Premium feature unlocked! Amazing! ✨")}
            className="group relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-pink-200 dark:border-pink-800 hover:border-pink-400 dark:hover:border-pink-600 transform hover:-translate-y-1 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 animate-pulse" />
            <div className="relative flex items-center gap-4 mb-3">
              <div className="p-3 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-xl shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Premium Toast
              </h3>
            </div>
            <p className="relative text-gray-600 dark:text-gray-300 text-sm">
              Special notifications with rainbow gradient & shine effect
            </p>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs font-bold text-pink-600 dark:text-pink-400">Click me!</span>
            </div>
          </button>
        </div>

        {/* Promise/Async Demo */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Promise Toast (Async Operations)
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Automatically shows loading, success, or error based on promise result
          </p>
          <button
            onClick={handlePromiseDemo}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Trigger Async Operation (50% success rate)
          </button>
        </div>

        {/* Dismiss All */}
        <div className="text-center">
          <button
            onClick={dismissAll}
            className="inline-flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Trash2 className="w-5 h-5" />
            Dismiss All Toasts
          </button>
        </div>

        {/* Code Examples */}
        <div className="mt-12 bg-gray-900 dark:bg-gray-950 p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-4">Usage Examples</h2>
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-gray-400 mb-2">Success:</p>
              <code className="block bg-gray-800 p-3 rounded-lg text-green-400 font-mono">
                showSuccess(&quot;Task completed!&quot;)
              </code>
            </div>
            <div>
              <p className="text-gray-400 mb-2">Error:</p>
              <code className="block bg-gray-800 p-3 rounded-lg text-red-400 font-mono">
                showError(&quot;Something went wrong!&quot;)
              </code>
            </div>
            <div>
              <p className="text-gray-400 mb-2">Promise:</p>
              <code className="block bg-gray-800 p-3 rounded-lg text-blue-400 font-mono">
                showPromise(apiCall(), {`{loading: &quot;...&quot;, success: &quot;...&quot;, error: &quot;...&quot;}`})
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
