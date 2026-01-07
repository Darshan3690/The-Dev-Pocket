"use client";

import React, { useEffect, useState } from "react";

import { calculateReadingTime } from '@/utils/readingTime';

import "./globals.css";

import Link from "next/link";
import { ClerkProvider, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { ThemeSwitcher } from "./ThemeSwitcher";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaRegCommentDots,
  FaGlobe,
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaDiscord,
} from "react-icons/fa";

import { AccessibilityAnnouncer, SkipLink, useAccessibility } from "../lib/accessibility";
import { usePerformanceMonitoring } from "../lib/performance";
import { ErrorBoundary, useErrorHandling } from "../lib/error-handling";
import GlobalSearch from "./components/GlobalSearch";
import ToastProvider from "./components/ToastProvider";
import KeyboardShortcuts from "./components/KeyboardShortcuts";
import ScrollToTop from "./components/ScrollToTop";
import OnboardingTutorial from "./components/OnboardingTutorial";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname?.() || "";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hash, setHash] = useState<string>("");

  const { announceSuccess } = useAccessibility();
  const { startTimer, endTimer } = usePerformanceMonitoring();
  const { wrapSync } = useErrorHandling();

  useEffect(() => {
    startTimer("layout-initialization");

    const onScroll = wrapSync(() => setScrolled(window.scrollY > 8), "Scroll Handler");
    const onHashChange = wrapSync(() => setHash(window.location.hash), "Hash Change Handler");

    onScroll();
    setHash(window.location.hash);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onHashChange);

    announceSuccess("Dev Pocket loaded successfully");
    endTimer("layout-initialization");

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [startTimer, endTimer, announceSuccess, wrapSync]);

  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-gray-900">
        <ClerkProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <ErrorBoundary>
              <ToastProvider />
              <KeyboardShortcuts />
              <ScrollToTop />
              <OnboardingTutorial />
              <AccessibilityAnnouncer />
              <SkipLink href="#main-content">Skip to main content</SkipLink>

              {isDashboard ? (
                <>{children}</>
              ) : (
                <>
                  {/* Navbar */}
                  <Navbar />

                  {/* Main content */}
                  <main id="main-content" className="w-full px-2 sm:px-4 md:px-6 lg:px-8">
                    {children}
                  </main>

                  {/* Footer */}
                  <Footer />
                </>
              )}
            </ErrorBoundary>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}