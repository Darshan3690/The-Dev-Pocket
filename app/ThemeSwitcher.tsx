"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";

export const ThemeSwitcher = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="w-16 h-8 bg-gray-200/50 dark:bg-gray-800/50 rounded-full animate-pulse" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-16 h-8 bg-gray-100/90 dark:bg-gray-800/90 rounded-full p-1 cursor-pointer flex items-center border border-gray-300/40 dark:border-gray-700/40 shadow-inner select-none outline-none focus-visible:ring-2 focus-visible:ring-sky-500 transition-all duration-300 ml-4 shrink-0"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      {/* Background Icon Indicators */}
      <div className="absolute left-2.5 text-amber-500/40 dark:text-amber-500/20 text-xs flex items-center pointer-events-none">
        <FaSun size={11} />
      </div>
      <div className="absolute right-2.5 text-gray-400/40 dark:text-gray-400/20 text-xs flex items-center pointer-events-none">
        <FaMoon size={11} />
      </div>

      {/* Animated Sliding Knob */}
      <motion.div
        className="w-6 h-6 rounded-full bg-white dark:bg-gray-900 shadow-md flex items-center justify-center z-10"
        animate={{
          x: isDark ? 32 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
      >
        {isDark ? (
          <motion.div
            initial={{ rotate: -90, scale: 0.5 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
          >
            <FaMoon size={12} className="text-yellow-400" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ rotate: 90, scale: 0.5 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
          >
            <FaSun size={12} className="text-amber-500" />
          </motion.div>
        )}
      </motion.div>
    </button>
  );
};

