"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Laptop } from "lucide-react";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setTheme("light")}
        className={`p-2 rounded-full ${
          theme === "light" ? "bg-blue-100 dark:bg-gray-700" : ""
        }`}
      >
        <Sun className="w-5 h-5" />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`p-2 rounded-full ${
          theme === "dark" ? "bg-blue-100 dark:bg-gray-700" : ""
        }`}
      >
        <Moon className="w-5 h-5" />
      </button>
    </div>
  );
}
