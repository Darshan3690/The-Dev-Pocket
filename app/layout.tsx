"use client";

import React, { useEffect, useState } from "react";
import "./globals.css";
import Link from "next/link";
import { ClerkProvider } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "next-themes";

// Import your components
// Ensure these paths exist in your project, or comment them out if testing
import { ThemeSwitcher } from "./ThemeSwitcher";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import GlobalSearch from "./components/GlobalSearch";
import ToastProvider from "./components/ToastProvider";
import KeyboardShortcuts from "./components/KeyboardShortcuts";
import OnboardingTutorial from "./components/OnboardingTutorial";

// --- Inner Component to handle Logic ---
// We need this separation so that usePathname and other hooks
// have access to the Providers wrapped in RootLayout
const MainContent = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname() || "";
  const [scrolled, setScrolled] = useState(false);
  const [hash, setHash] = useState<string>("");

  useEffect(() => {
    // Simple Scroll Handler
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    // Simple Hash Handler
    const onHashChange = () => {
      setHash(window.location.hash);
    };

    // Initial check
    onScroll();
    setHash(window.location.hash);

    // Add Listeners
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onHashChange);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <>
      <ToastProvider />
      <KeyboardShortcuts />
      <OnboardingTutorial />
      
      {/* Skip Link for Accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white p-4 rounded-md z-50"
      >
        Skip to main content
      </a>

      {isDashboard ? (
        <>{children}</>
      ) : (
        <>
          <Navbar />
          <main
            id="main-content"
            className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen"
          >
            {children}
          </main>
          <Footer />
        </>
      )}
    </>
  );
};

// --- Main Root Layout ---
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <ClerkProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            {/* We render MainContent here so it is INSIDE the providers.
               This prevents "Context Undefined" errors.
            */}
            <MainContent>{children}</MainContent>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}