"use client";

import React, { useState } from "react";
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

  const isDashboard = pathname.startsWith("/dashboard");

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
              <header className="w-full max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center z-10 sticky top-0 bg-white/80 backdrop-blur-sm rounded-b-xl border-b border-gray-200 shadow-sm">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6h-2V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm10 16H8V8h12v12zm-3-5.5V11c0-.3-.1-.5-.4-.7l-1.5-1c-.2-.1-.5-.1-.7-.1-.2 0-.5.1-.7.2l-1.4.9-.7-.5-.7.5-1.4-.9c-.2-.1-.5-.1-.7-.1-.2 0-.5.1-.7.2L5.8 11c-.3.2-.4.4-.4.7V14h14v-2.5zM12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
                  </svg>
                  <span className="text-xl font-bold text-blue-800">Dev Pocket</span>
                </div>

                <nav className="hidden md:flex space-x-6">
                  <a
                    href="#features"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Features
                  </a>
                  <a
                    href="#about"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    About
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Pricing
                  </a>
                </nav>

                {/* If NOT logged in → Show Login */}
                <SignedOut>
                  <Link href="/sign-in">
                    <button className="w-24 transform rounded-full bg-blue-600 px-6 py-2 font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-700 md:w-32">
                      Login
                    </button>
                  </Link>
                </SignedOut>

                {/* If logged in → Show Profile + Dashboard */}
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
              {/* Main content from children */}
              <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {children}
              </main>
              {/* Footer */}
              <footer className="w-full max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-gray-500 border-t">
                <p className="mb-2">&copy; {new Date().getFullYear()} Dev Pocket. All rights reserved.</p>
                <div className="flex justify-center space-x-4">
                  <a href="#" className="hover:text-sky-600 transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-sky-600 transition-colors">Terms of Service</a>
                  <a href="#" className="hover:text-sky-600 transition-colors">Contact</a>
                </div>
              </footer>
            </>
          )}
        </ClerkProvider>
      </body>
    </html>
  );
}
