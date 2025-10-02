"use client";

import React, { useEffect, useState } from "react";
import "./globals.css";

import Link from "next/link";
import { ClerkProvider, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname?.() || "";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  // Initialize with empty string to match server output; update after mount
  const [hash, setHash] = useState<string>("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      setShowScrollTop(window.scrollY > 300);
    };
    const onHashChange = () => setHash(window.location.hash);
    onScroll();
    // Set initial hash after mount to avoid SSR/CSR mismatch
    setHash(window.location.hash);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  const isDashboard = pathname.startsWith("/dashboard");

  const scrollToTop = () => {
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      window.scrollTo(0, 0);
    }
  };

  return (
    <html lang="en">
      <body className="font-sans text-gray-800 bg-gray-50/50">
        <ClerkProvider>
          {/* If we're on dashboard routes, render children directly so dashboard layout controls the shell */}
          {isDashboard ? (
            <>{children}</>
          ) : (
            <>
              {/* Header */}
              <header 
                className={`w-full max-w-7xl mx-auto my-4 py-5 sm:py-6 px-6 sm:px-8 lg:px-10 flex justify-between items-center z-10 sticky top-4 ${scrolled ? "bg-white/70 shadow-2xl shadow-blue-500/10" : "bg-white/60 shadow-xl shadow-gray-200/50"
                } backdrop-blur-xl rounded-3xl border border-gray-200/60 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20`}
                role="banner"
                aria-label="Main navigation"
              >
                <Link
                  href="/"
                  aria-label="The Dev Pocket - Go to homepage"
                  className="flex items-center space-x-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg px-2 py-1 -mx-2 -my-1 transition-all duration-200"
                  onClick={(e) => {
                    // If already on homepage, just scroll to top smoothly and don't re-navigate
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
                    className="w-10 h-10 sm:w-11 sm:h-11 text-blue-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 drop-shadow-md"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M20 6h-2V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm10 16H8V8h12v12zm-3-5.5V11c0-.3-.1-.5-.4-.7l-1.5-1c-.2-.1-.5-.1-.7-.1-.2 0-.5.1-.7.2l-1.4.9-.7-.5-.7.5-1.4-.9c-.2-.1-.5-.1-.7-.1-.2 0-.5.1-.7.2L5.8 11c-.3.2-.4.4-.4.7V14h14v-2.5zM12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
                  </svg>
                  <span
                    className="text-2xl sm:text-3xl font-extrabold transition-colors duration-200 group-hover:opacity-90 drop-shadow-sm"
                    style={{ color: "#FCB415" }}
                  >
                    The Dev Pocket
                  </span>
                </Link>

                <nav className="hidden md:flex space-x-2" role="navigation" aria-label="Primary navigation">
                  <Link
                    href="/#features"
                    className={`rounded-2xl px-5 py-2.5 text-lg font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-300 ${hash === "#features" && pathname === "/" ? "text-white bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/40 scale-105" : "text-gray-700 hover:text-blue-600 hover:bg-blue-50/70 hover:backdrop-blur-sm hover:scale-105"
                      }`}
                    aria-current={hash === "#features" && pathname === "/" ? "page" : undefined}
                  >
                    Features
                  </Link>
                  <Link
                    href="/about"
                    className={`rounded-2xl px-5 py-2.5 text-lg font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-300 ${pathname.startsWith("/about") ? "text-white bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/40 scale-105" : "text-gray-700 hover:text-blue-600 hover:bg-blue-50/70 hover:backdrop-blur-sm hover:scale-105"
                      }`}
                    aria-current={pathname.startsWith("/about") ? "page" : undefined}
                  >
                    About
                  </Link>
                  <Link
                    href="/#pricing"
                    className={`rounded-2xl px-5 py-2.5 text-lg font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-300 ${hash === "#pricing" && pathname === "/" ? "text-white bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/40 scale-105" : "text-gray-700 hover:text-blue-600 hover:bg-blue-50/70 hover:backdrop-blur-sm hover:scale-105"
                      }`}
                    aria-current={hash === "#pricing" && pathname === "/" ? "page" : undefined}
                  >
                    Pricing
                  </Link>
                </nav>

                {/* Mobile menu button */}
                <button
                  type="button"
                  className="md:hidden inline-flex items-center justify-center rounded-2xl p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50/70 backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-300 hover:scale-105"
                  aria-controls="mobile-menu"
                  aria-expanded={mobileOpen}
                  aria-label={mobileOpen ? "Close menu" : "Open menu"}
                  onClick={() => setMobileOpen((v) => !v)}
                >
                  <span className="sr-only">{mobileOpen ? "Close" : "Open"} main menu</span>
                  <svg
                    className={`h-6 w-6 transition-all duration-300 ${mobileOpen ? "rotate-90 scale-95" : "rotate-0 scale-100"}`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  >
                    {mobileOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>

                {mobileOpen && (
                  <div 
                    id="mobile-menu"
                    className="absolute top-full left-0 right-0 mt-2 mx-4 bg-white rounded-xl shadow-lg border border-gray-200 md:hidden overflow-hidden"
                  >
                    <nav className="flex flex-col p-2">
                      <Link
                        href="/#features"
                        className="rounded-lg px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        Features
                      </Link>
                      <Link
                        href="/about"
                        className="rounded-lg px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        About
                      </Link>
                      <Link
                        href="/#pricing"
                        className="rounded-lg px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        Pricing
                      </Link>
                    </nav>
                  </div>
                )}


                {/* If NOT logged in → Show Login */}
                <SignedOut>
                  <Link 
                    href="/sign-in"
                    className="hidden md:inline-block"
                    aria-label="Sign in to your account"
                  >
                    <button 
                      className="min-w-28 transform rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-7 py-3 text-base font-bold text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-110 hover:from-blue-700 hover:to-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 md:min-w-36"
                      type="button"
                    >
                      Login
                    </button>
                  </Link>
                </SignedOut>

                {/* If logged in → Show Profile + Dashboard */}
                <SignedIn>
                  <div className="hidden md:flex items-center gap-5">
                    <div aria-label="User profile menu" className="scale-110">
                      <UserButton afterSignOutUrl="/" />
                    </div>
                    <Link 
                      href="/dashboard"
                      aria-label="Go to dashboard"
                    >
                      <button 
                        className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-2xl shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 px-7 py-3 text-base font-bold transition-all duration-300 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                        type="button"
                      >
                        Dashboard
                      </button>
                    </Link>
                  </div>
                </SignedIn>
              </header>
              
              {/* Mobile Menu */}
              {mobileOpen && (
                <div 
                  className="md:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-md"
                  onClick={() => setMobileOpen(false)}
                  aria-hidden="true"
                >
                  <div 
                    className="absolute top-24 right-4 left-4 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/60 overflow-hidden animate-slideDown"
                    onClick={(e) => e.stopPropagation()}
                    id="mobile-menu"
                    role="dialog"
                    aria-label="Mobile navigation menu"
                  >
                    <nav className="p-5 space-y-2" role="navigation" aria-label="Mobile navigation">
                      <Link
                        href="/#features"
                        className={`block rounded-2xl px-5 py-3.5 text-lg font-bold transition-all duration-300 ${hash === "#features" && pathname === "/" ? "text-white bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/30" : "text-gray-700 hover:bg-blue-50/70 hover:text-blue-600 hover:scale-105"
                          }`}
                        onClick={() => setMobileOpen(false)}
                        aria-current={hash === "#features" && pathname === "/" ? "page" : undefined}
                      >
                        Features
                      </Link>
                      <Link
                        href="/about"
                        className={`block rounded-2xl px-5 py-3.5 text-lg font-bold transition-all duration-300 ${pathname.startsWith("/about") ? "text-white bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/30" : "text-gray-700 hover:bg-blue-50/70 hover:text-blue-600 hover:scale-105"
                          }`}
                        onClick={() => setMobileOpen(false)}
                        aria-current={pathname.startsWith("/about") ? "page" : undefined}
                      >
                        About
                      </Link>
                      <Link
                        href="/#pricing"
                        className={`block rounded-2xl px-5 py-3.5 text-lg font-bold transition-all duration-300 ${hash === "#pricing" && pathname === "/" ? "text-white bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/30" : "text-gray-700 hover:bg-blue-50/70 hover:text-blue-600 hover:scale-105"
                          }`}
                        onClick={() => setMobileOpen(false)}
                        aria-current={hash === "#pricing" && pathname === "/" ? "page" : undefined}
                      >
                        Pricing
                      </Link>
                      
                      <div className="pt-4 border-t border-gray-200/60 space-y-3">
                        <SignedOut>
                          <Link
                            href="/sign-in"
                            className="block"
                            onClick={() => setMobileOpen(false)}
                            aria-label="Sign in to your account"
                          >
                            <button className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-3.5 text-base font-bold text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:from-blue-700 hover:to-blue-600 transition-all duration-300 hover:scale-105">
                              Login
                            </button>
                          </Link>
                        </SignedOut>
                        <SignedIn>
                          <Link
                            href="/dashboard"
                            className="block"
                            onClick={() => setMobileOpen(false)}
                            aria-label="Go to dashboard"
                          >
                            <button className="w-full rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 px-5 py-3.5 text-base font-bold text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:from-purple-700 hover:to-pink-600 transition-all duration-300 hover:scale-105">
                              Dashboard
                            </button>
                          </Link>
                        </SignedIn>
                      </div>
                    </nav>
                  </div>
                </div>
              )}
              
              {/* Main content from children */}
              <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" role="main">
                {children}
              </main>
              {/* Footer */}
              <footer className="w-full max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-gray-500 border-t border-gray-200 mt-auto" role="contentinfo">
                <p className="mb-3 text-sm">
                  &copy; {new Date().getFullYear()} Dev Pocket. All rights reserved.
                </p>
                <nav className="flex justify-center space-x-6" role="navigation" aria-label="Footer navigation">
                  <Link 
                    href="/privacy" 
                    className="text-sm hover:text-blue-600 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded px-2 py-1"
                  >
                    Privacy Policy
                  </Link>
                  <Link 
                    href="/terms" 
                    className="text-sm hover:text-blue-600 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded px-2 py-1"
                  >
                    Terms of Service
                  </Link>
                  <Link 
                    href="https://bento.me/darshan3690" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm hover:text-blue-600 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded px-2 py-1"
                    aria-label="Contact (opens in new tab)"
                  >
                    Contact
                  </Link>
                </nav>
              </footer>
            </>
          )}
          
          {/* Scroll to Top Button */}
          {!isDashboard && (
            <button
              onClick={scrollToTop}
              className={`scroll-to-top ${showScrollTop ? "visible" : "hidden"}`}
              aria-label="Scroll to top"
              type="button"
            >
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </button>
          )}
        </ClerkProvider>
      </body>
    </html>
  );
}
