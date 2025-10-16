"use client";

import React, { useEffect, useState } from "react";
import "./globals.css";

import Link from "next/link";
import { ClerkProvider, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "next-themes"; // 👈 Added ThemeProvider
import { ThemeSwitcher } from "./ThemeSwitcher"; // 👈 Added ThemeSwitcher
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

// Import enhanced utilities
import { AccessibilityAnnouncer, SkipLink, useAccessibility } from "../lib/accessibility";
import { usePerformanceMonitoring } from "../lib/performance";
import { ErrorBoundary, useErrorHandling } from "../lib/error-handling";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname?.() || "";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hash, setHash] = useState<string>("");

  // Initialize enhanced utilities
  const { announce, announceSuccess, announceError } = useAccessibility();
  const { startTimer, endTimer } = usePerformanceMonitoring();
  const { handleError, wrapAsync } = useErrorHandling();

  useEffect(() => {
    startTimer('layout-initialization');
    
    const onScroll = wrapAsync(() => setScrolled(window.scrollY > 8), 'Scroll Handler');
    const onHashChange = wrapAsync(() => setHash(window.location.hash), 'Hash Change Handler');
    
    onScroll();
    setHash(window.location.hash);
    
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onHashChange);
    
    // Announce successful layout initialization
    announceSuccess('Dev Pocket application loaded successfully');
    endTimer('layout-initialization');
    
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
          {/*  Wrap everything in ThemeProvider */}
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange={false}
          >
            <ErrorBoundary>
              {/* Accessibility announcements */}
              <AccessibilityAnnouncer />
              
              {/* Skip to main content link */}
              <SkipLink href="#main-content">
                Skip to main content
              </SkipLink>
              
              {isDashboard ? (
                <>{children}</>
              ) : (
                <>
                  {/* Header */}
                  <header
                    className={`w-full max-w-7xl mx-auto py-4 sm:py-5 px-4 sm:px-6 lg:px-8 flex justify-between items-center z-10 sticky top-0 ${scrolled ? "bg-white/90 shadow-md" : "bg-white/90 shadow-sm"
                      } backdrop-blur-sm rounded-b-xl border-b border-gray-200 transition-colors`}
                    role="banner"
                    aria-label="Main navigation"
                  >
                  <Link
                    href="/"
                    aria-label="Go to homepage"
                    className="flex items-center space-x-2 group"
                    onClick={(e) => {
                      if (pathname === "/") {
                        e.preventDefault();
                        setMobileOpen(false);
                        try {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        } catch {
                          window.scrollTo(0, 0);
                        }
                        setHash("");
                      } else {
                        setMobileOpen(false);
                      }
                    }}
                  >
                    <svg
                      className="w-8 h-8 text-blue-600 transition-transform group-hover:scale-105"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6h-2V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm10 16H8V8h12v12zm-3-5.5V11c0-.3-.1-.5-.4-.7l-1.5-1c-.2-.1-.5-.1-.7-.1-.2 0-.5.1-.7.2l-1.4.9-.7-.5-.7.5-1.4-.9c-.2-.1-.5-.1-.7-.1-.2 0-.5.1-.7.2L5.8 11c-.3.2-.4.4-.4.7V14h14v-2.5zM12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
                    </svg>
                    <span className="text-2xl font-bold text-yellow-500">
                      The Dev Pocket
                    </span>
                  </Link>

                  <nav className="hidden md:flex space-x-1 items-center">
                    <Link
                      href="/#features"
                      className={`rounded-full px-3 py-1 transition-colors ${hash === "#features" && pathname === "/"
                        ? "text-blue-700 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600"
                        }`}
                    >
                      Features
                    </Link>
                    <Link
                      href="/about"
                      className={`rounded-full px-3 py-1 transition-colors ${pathname.startsWith("/about")
                        ? "text-blue-700 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600"
                        }`}
                    >
                      About
                    </Link>
                    <Link
                      href="/#pricing"
                      className={`rounded-full px-3 py-1 transition-colors ${hash === "#pricing" && pathname === "/"
                        ? "text-blue-700 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600"
                        }`}
                    >
                      Pricing
                    </Link>

                    {/* 👇 Theme Switcher Added */}
                    <ThemeSwitcher />
                  </nav>

                  {/* Mobile menu button */}
                  <button
                    type="button"
                    className="md:hidden inline-flex items-center justify-center rounded-full p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
                    aria-controls="mobile-menu"
                    aria-expanded={mobileOpen ? "true" : "false"}
                    onClick={() => setMobileOpen((v) => !v)}
                  >
                    <span className="sr-only">Toggle main menu</span>
                    <svg
                      className={`h-6 w-6 transition-transform ${mobileOpen ? "rotate-90" : "rotate-0"
                        }`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {mobileOpen ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      )}
                    </svg>
                  </button>

                  {/* Mobile menu */}
                  <div
                    className={`absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg transition-all duration-300 ${mobileOpen ? 'block' : 'hidden'} md:hidden`}
                    id="mobile-menu"
                  >
                    <div className="p-4 space-y-3">
                      <Link
                        href="/#features"
                        className={`block rounded-lg px-4 py-2 text-center transition-colors ${hash === '#features' && pathname === '/' ? 'text-blue-700 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}
                        onClick={() => setMobileOpen(false)}
                      >
                        Features
                      </Link>
                      <Link
                        href="/about"
                        className={`block rounded-lg px-4 py-2 text-center transition-colors ${pathname.startsWith('/about') ? 'text-blue-700 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}
                        onClick={() => setMobileOpen(false)}
                      >
                        About
                      </Link>
                      <Link
                        href="/#pricing"
                        className={`block rounded-lg px-4 py-2 text-center transition-colors ${hash === '#pricing' && pathname === '/' ? 'text-blue-700 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}
                        onClick={() => setMobileOpen(false)}
                      >
                        Pricing
                      </Link>
                      <SignedIn>
                        <Link
                          href="/dashboard"
                          className="block rounded-lg px-4 py-2 text-center bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium"
                          onClick={() => setMobileOpen(false)}
                        >
                          Dashboard
                        </Link>
                      </SignedIn>
                      <div className="flex justify-center">
                        <ThemeSwitcher />
                      </div>
                    </div>
                  </div>

                  <SignedOut>
                    <Link href="/sign-in">
                      <button className="w-24 transform rounded-full bg-blue-600 px-6 py-2 font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-700 md:w-32">
                        Login
                      </button>
                    </Link>
                  </SignedOut>

                  <SignedIn>
                    <div className="flex items-center gap-6">
                      <UserButton afterSignOutUrl="/" />
                      <Link href="/dashboard">
                        <button className="hidden md:inline-block bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-full shadow-lg px-6 py-2 font-medium transition-all duration-300">
                          Dashboard
                        </button>
                      </Link>
                    </div>
                  </SignedIn>
                </header>

                {/* Main content */}
                <main 
                  id="main-content"
                  className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                  role="main"
                  aria-label="Main content"
                >
                  {children}
                </main>

                {/* Footer */}
                <footer
                  className="w-full bg-gray-900 text-gray-300 py-12 px-6 mt-auto"
                  role="contentinfo"
                >
                  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
                    {/* Contact Section */}
                    <div>
                      <h2 className="flex items-center justify-center md:justify-start text-lg font-semibold text-white mb-4">
                        <FaPhoneAlt className="mr-2 text-pink-400" /> Contact Us
                      </h2>
                      <p className="mb-1">
                        <FaEnvelope className="inline-block mr-2 text-sky-400" />
                        <a
                          href="mailto:info@The-Dev-Pocket.com"
                          className="hover:text-sky-400 transition"
                        >
                          info@The-Dev-Pocket.com
                        </a>
                      </p>
                    </div>

                    {/* Feedback Section */}
                    <div>
                      <h2 className="flex items-center justify-center md:justify-start text-lg font-semibold text-white mb-4">
                        <FaRegCommentDots className="mr-2 text-indigo-400" />{" "}
                        Feedback
                      </h2>
                      <form className="flex flex-col space-y-3 max-w-sm mx-auto md:mx-0">
                        <input
                          type="text"
                          placeholder="Your Feedback"
                          className="p-3 rounded-lg bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                        <button
                          type="submit"
                          className="bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-lg font-medium transition"
                        >
                          Submit
                        </button>
                      </form>
                    </div>

                    {/* Social Media Section */}
                    <div>
                      <h2 className="flex items-center justify-center md:justify-start text-lg font-semibold text-white mb-4">
                        <FaGlobe className="mr-2 text-green-400" /> Connect With
                        Us
                      </h2>
                      <div className="flex justify-center md:justify-start space-x-6">
                        <a
                          href="https://github.com/Darshan3690"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-sky-400 transition"
                          aria-label="GitHub Profile"
                        >
                          <FaGithub size={28} />
                        </a>
                        <a
                          href="https://www.linkedin.com/in/darshan-rajput-4b0b23288/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-sky-400 transition"
                          aria-label="LinkedIn Profile"
                        >
                          <FaLinkedin size={28} />
                        </a>
                        <a
                          href="https://instagram.com/yourprofile"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-sky-400 transition"
                          aria-label="Instagram Profile"
                        >
                          <FaInstagram size={28} />
                        </a>
                        <a
                          href="https://discord.com/channels/@me"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-sky-400 transition"
                          aria-label="Discord Channel"
                        >
                          <FaDiscord size={28} />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Section */}
                  <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
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
                      <Link
                        href="https://bento.me/darshan3690"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-500"
                      >
                        Contact
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
