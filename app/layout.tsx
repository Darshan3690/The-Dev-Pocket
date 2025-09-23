"use client";

import React from "react";
import "./globals.css";

import Link from "next/link";
import { ClerkProvider, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

// Import your new Navbar
import Navbar from "./components/Navbar";

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
              {/* Modern Navbar */}
              <Navbar />

              {/* Main content from children */}
              <main className="w-full ">
                {children}
              </main>

              {/* Footer */}
              <footer className="w-full max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-gray-500 border-t">
                <p className="mb-2">
                  &copy; {new Date().getFullYear()} Dev Pocket. All rights
                  reserved.
                </p>
                <div className="flex justify-center space-x-4">
                  <a href="#" className="hover:text-sky-600 transition-colors">
                    Privacy Policy
                  </a>
                  <a href="#" className="hover:text-sky-600 transition-colors">
                    Terms of Service
                  </a>
                  <a href="#" className="hover:text-sky-600 transition-colors">
                    Contact
                  </a>
                </div>
              </footer>
            </>
          )}
        </ClerkProvider>
      </body>
    </html>
  );
}
