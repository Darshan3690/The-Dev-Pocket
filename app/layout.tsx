"use client";

import React, { useEffect, useState } from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import "./globals.css";

import Link from "next/link";
import { ClerkProvider, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "next-themes";
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
import { Sun, Moon, Laptop } from "lucide-react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname?.() || "";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hash, setHash] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const onHashChange = () => setHash(window.location.hash);
    onScroll();
    setHash(window.location.hash);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans text-gray-800 bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
        <ClerkProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {isDashboard ? (
              <>{children}</>
            ) : (
              <>
                {/* Header */}
                <header
                  className={`w-full max-w-7xl mx-auto py-4 sm:py-5 px-4 sm:px-6 lg:px-8 flex justify-between items-center z-10 sticky top-0 ${
                    scrolled
                      ? "bg-white/90 dark:bg-gray-800/90 shadow-md"
                      : "bg-white/70 dark:bg-gray-800/70 shadow-sm"
                  } backdrop-blur-sm rounded-b-xl border-b border-gray-200 dark:border-gray-700 transition-colors`}
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
                    <span
                      className="text-2xl font-bold"
                      style={{ color: "#FCB415" }}
                    >
                      The Dev Pocket
                    </span>
                  </Link>

                  <nav className="hidden md:flex space-x-1 items-center">
                    <Link
                      href="/#features"
                      className={`rounded-full px-3 py-1 transition-colors ${
                        hash === "#features" && pathname === "/"
                          ? "text-blue-700 bg-blue-50 dark:bg-gray-700 dark:text-blue-400"
                          : "text-gray-700 dark:text-gray-200 hover:text-blue-600"
                      }`}
                    >
                      Features
                    </Link>
                    <Link
                      href="/about"
                      className={`rounded-full px-3 py-1 transition-colors ${
                        pathname.startsWith("/about")
                          ? "text-blue-700 bg-blue-50 dark:bg-gray-700 dark:text-blue-400"
                          : "text-gray-700 dark:text-gray-200 hover:text-blue-600"
                      }`}
                    >
                      About
                    </Link>
                    <Link
                      href="/#pricing"
                      className={`rounded-full px-3 py-1 transition-colors ${
                        hash === "#pricing" && pathname === "/"
                          ? "text-blue-700 bg-blue-50 dark:bg-gray-700 dark:text-blue-400"
                          : "text-gray-700 dark:text-gray-200 hover:text-blue-600"
                      }`}
                    >
                      Pricing
                    </Link>

                    {/* 👇 Theme Toggle Button */}
                    <ThemeSwitcher />
                  </nav>

                  {/* Mobile menu button */}
                  <button
                    type="button"
                    className="md:hidden inline-flex items-center justify-center rounded-full p-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700"
                    aria-controls="mobile-menu"
                    aria-expanded={mobileOpen}
                    onClick={() => setMobileOpen((v) => !v)}
                  >
                    <span className="sr-only">Toggle main menu</span>
                    <svg
                      className={`h-6 w-6 transition-transform ${
                        mobileOpen ? "rotate-90" : "rotate-0"
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

                  {/* Auth buttons */}
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
                <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  {children}
                </main>

                {/* Footer (your existing footer code) */}
                {/* ... */}
              </>
            )}
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
