"use client";

import {
  Navbar as ResizableNavbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const navItems = [
    { name: "Features", link: "#features" },
    { name: "Pricing", link: "#pricing" },
    { name: "About", link: "/about" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <ResizableNavbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />

          {/* Auth Section */}
          <div className="flex items-center gap-5">
            {/* If NOT logged in → show Login */}
            <SignedOut>
              <Link href="/sign-in">
                <NavbarButton as="span" variant="primary">Login</NavbarButton>
              </Link>
            </SignedOut>

            {/* If logged in → show Avatar + Dashboard */}
            <SignedIn>
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 ring-2 ring-sky-500/20 hover:ring-sky-500/40 transition-all"
                  }
                }}
              />
              <Link href="/dashboard">
                <NavbarButton as="span" variant="primary">Dashboard</NavbarButton>
              </Link>
            </SignedIn>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-gray-700 dark:text-gray-200 font-medium text-base hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-200 py-2 w-full"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}

            {/* Mobile Auth Section */}
            <div className="flex w-full flex-col gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <SignedOut>
                <Link href="/sign-in" className="w-full">
                  <NavbarButton
                    as="span"
                    onClick={() => setIsMobileMenuOpen(false)}
                    variant="primary"
                    className="w-full"
                  >
                    Login
                  </NavbarButton>
                </Link>
              </SignedOut>

              <SignedIn>
                <div className="flex items-center gap-3 w-full">
                  <UserButton afterSignOutUrl="/" />
                  <Link href="/dashboard" className="flex-1">
                    <NavbarButton
                      as="span"
                      onClick={() => setIsMobileMenuOpen(false)}
                      variant="primary"
                      className="w-full"
                    >
                      Dashboard
                    </NavbarButton>
                  </Link>
                </div>
              </SignedIn>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </ResizableNavbar>
    </>
  );
}
