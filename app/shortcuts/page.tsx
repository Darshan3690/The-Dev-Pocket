"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ShortcutsPage() {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
  }, []);

  const modKey = isMac ? '⌘' : 'Ctrl';

  const shortcuts = [
    {
      category: "Navigation",
      icon: "🧭",
      items: [
        { keys: [modKey, 'H'], description: "Go to Home page" },
        { keys: [modKey, 'S'], description: "Go to Settings" },
        { keys: [modKey, 'M'], description: "Go to Contact page" },
      ]
    },
    {
      category: "Search & Help",
      icon: "🔍",
      items: [
        { keys: [modKey, 'K'], description: "Open Global Search" },
        { keys: [modKey, '?'], description: "Show Keyboard Shortcuts Modal" },
      ]
    },
    {
      category: "Appearance",
      icon: "🎨",
      items: [
        { keys: [modKey, 'T'], description: "Toggle Dark/Light Mode" },
      ]
    },
    {
      category: "General",
      icon: "⚡",
      items: [
        { keys: ['ESC'], description: "Close open modals and dialogs" },
        { keys: ['↑', '↓'], description: "Navigate search results" },
        { keys: ['Enter'], description: "Select highlighted search result" },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            ⌨️ Keyboard Shortcuts
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Master these shortcuts to navigate The Dev Pocket like a pro
          </p>
        </div>

        {/* Shortcuts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {shortcuts.map((section, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-100 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                <span className="text-3xl">{section.icon}</span>
                {section.category}
              </h2>
              <div className="space-y-3">
                {section.items.map((shortcut, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="flex items-center justify-between py-3 px-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="text-gray-700 dark:text-gray-200 font-medium">
                      {shortcut.description}
                    </span>
                    <div className="flex items-center gap-1">
                      {shortcut.keys.map((key, keyIdx) => (
                        <span key={keyIdx} className="flex items-center gap-1">
                          <kbd className="px-3 py-2 text-sm font-bold text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg shadow-sm">
                            {key}
                          </kbd>
                          {keyIdx < shortcut.keys.length - 1 && (
                            <span className="text-gray-400 font-bold">+</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl p-8 text-white mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            💡 Pro Tips
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-2xl">✨</span>
              <span>Shortcuts work from anywhere on the site (except when typing in input fields)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🚀</span>
              <span>Press <kbd className="px-2 py-1 bg-white/20 rounded">{ modKey}+?</kbd> anytime to see this list in a quick modal</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">⚡</span>
              <span>More shortcuts are coming soon as we add new features!</span>
            </li>
          </ul>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
