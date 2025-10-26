"use client";

import React, { useEffect, useState } from "react";
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname?.() || "";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hash, setHash] = useState<string>("");

  const { announceSuccess } = useAccessibility();
  const { startTimer, endTimer } = usePerformanceMonitoring();
  const { wrapAsync } = useErrorHandling();

  useEffect(() => {
    startTimer("layout-initialization");

    const onScroll = wrapAsync(() => setScrolled(window.scrollY > 8), "Scroll Handler");
    const onHashChange = wrapAsync(() => setHash(window.location.hash), "Hash Change Handler");

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
  }, [startTimer, endTimer, announceSuccess, wrapAsync]);

   const isDashboard = pathname.startsWith("/dashboard");

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-gray-900">
        <ClerkProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <ErrorBoundary>
              <ToastProvider />
              <AccessibilityAnnouncer />
              <SkipLink href="#main-content">Skip to main content</SkipLink>

              {isDashboard ? (
                <>{children}</>
              ) : (
                <>
                  {/* Navbar */}
                  <Navbar />

                  {/* Main content */}
                  <main id="main-content" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {children}
                  </main>

                  {/* Footer */}
                  <footer className="border-t border-gray-700 mt-10 pt-6">
                    <div className="text-center text-sm text-gray-400">
                      <p className="mb-2">
                        &copy; {new Date().getFullYear()} Dev Pocket. All rights
                        reserved.
                      </p>
                      <div className="flex justify-center space-x-6">
                        <Link href="/privacy" className="hover:text-blue-500">
                          Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-blue-500">
                          Terms of Service
                        </Link>
                        <Link href="/faq" className="hover:text-blue-500">
                          FAQ
                        </Link>
                        <Link href="/contact" className="hover:text-blue-500">
                          Contact
                        </Link>
                        <Link
                          href="https://bento.me/darshan3690"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-500"
                        >
                          Developer
                        </Link>
                      </div>
                    </div>
                  </footer>
                </>
              )}
            </ErrorBoundary>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}