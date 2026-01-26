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
    { name: "Resources", link: "/resources" },
    { name: "Practice Hub", link: "/practice-hub" },
    { name: "Pricing", link: "#pricing" },
    { name: "About", link: "/about" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <ResizableNavbar>
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />

        {/* Auth Section */}
        <div className="flex items-center gap-5">
          <SignedOut>
            <NavbarButton as={Link} href="/sign-in" variant="primary">
              Login
            </NavbarButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox:
                    "w-10 h-10 ring-2 ring-sky-500/20 hover:ring-sky-500/40 transition-all",
                },
              }}
            />
            <NavbarButton as={Link} href="/dashboard" variant="primary">
              Dashboard
            </NavbarButton>
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
              className="relative text-gray-700 dark:text-gray-200 font-medium text-base hover:text-sky-600 dark:hover:text-sky-400 transition-colors py-2 w-full"
            >
              {item.name}
            </a>
          ))}

          {/* Mobile Auth Section */}
          <div className="flex w-full flex-col gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <SignedOut>
              <NavbarButton
                as={Link}
                href="/sign-in"
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Login
              </NavbarButton>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center gap-3 w-full">
                <UserButton afterSignOutUrl="/" />
                <NavbarButton
                  as={Link}
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="primary"
                  className="w-full"
                >
                  Dashboard
                </NavbarButton>
              </div>
            </SignedIn>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </ResizableNavbar>
  );
}
