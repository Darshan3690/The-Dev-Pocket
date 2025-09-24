"use client";

import React from "react";
import "./globals.css";
import { ClerkProvider, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname?.() || "";
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <html lang="en">
      <body className="font-poppins text-gray-800 bg-gray-50/50">
        <ClerkProvider>
          {isDashboard ? (
            <>{children}</>
          ) : (
            <>
              {/* Navbar */}
              <Navbar />

              {/* children */}
              <main className="w-full ">
                {children}
              </main>

              {/* Footer */}
             <Footer />
            </>
          )}
        </ClerkProvider>
      </body>
    </html>
  );
}
