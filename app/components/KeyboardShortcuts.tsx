"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export default function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const router = useRouter();
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    // Detect if user is on Mac
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent shortcuts when typing in input fields
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      // Ctrl+? or Cmd+? - Show shortcuts modal
      if ((e.ctrlKey || e.metaKey) && e.key === '?') {
        e.preventDefault();
        setIsOpen(true);
      }

      // Ctrl+H or Cmd+H - Go to Home
      if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
        e.preventDefault();
        router.push('/');
      }

      // Ctrl+S or Cmd+S - Go to Settings
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        router.push('/settings');
      }

      // Ctrl+M or Cmd+M - Go to Contact
      if ((e.ctrlKey || e.metaKey) && e.key === 'm') {
        e.preventDefault();
        router.push('/contact');
      }

      // Ctrl+T or Cmd+T - Toggle Theme
      if ((e.ctrlKey || e.metaKey) && e.key === 't') {
        e.preventDefault();
        setTheme(theme === 'dark' ? 'light' : 'dark');
      }

      // ESC - Close modal
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router, setTheme, theme]);

  const modKey = isMac ? '⌘' : 'Ctrl';

  const shortcuts = [
    { category: "Navigation", items: [
      { keys: [modKey, 'H'], description: "Go to Home" },
      { keys: [modKey, 'S'], description: "Go to Settings" },
      { keys: [modKey, 'M'], description: "Go to Contact" },
    ]},
    { category: "Search & Help", items: [
      { keys: [modKey, 'K'], description: "Open Search" },
      { keys: [modKey, '?'], description: "Show Keyboard Shortcuts" },
    ]},
    { category: "Appearance", items: [
      { keys: [modKey, 'T'], description: "Toggle Dark/Light Mode" },
    ]},
    { category: "General", items: [
      { keys: ['ESC'], description: "Close Modals" },
    ]},
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl mx-4 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-h-[80vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Keyboard Shortcuts
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Speed up your workflow with these handy shortcuts
          </p>
        </div>

        {/* Shortcuts List */}
        <div className="space-y-6">
          {shortcuts.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
                {section.category}
              </h3>
              <div className="space-y-2">
                {section.items.map((shortcut, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <span className="text-gray-700 dark:text-gray-200">
                      {shortcut.description}
                    </span>
                    <div className="flex items-center gap-1">
                      {shortcut.keys.map((key, keyIdx) => (
                        <span key={keyIdx} className="flex items-center gap-1">
                          <kbd className="px-3 py-1.5 text-sm font-semibold text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm">
                            {key}
                          </kbd>
                          {keyIdx < shortcut.keys.length - 1 && (
                            <span className="text-gray-400">+</span>
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

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Press <kbd className="px-2 py-1 text-xs font-semibold bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded">ESC</kbd> or click outside to close
          </p>
        </div>
      </div>
    </div>
  );
}
