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
          <div className="flex items-center gap-4">
            {/* If NOT logged in → show Login */}
            <SignedOut>
              <Link href="/sign-in">
                <NavbarButton as="span" variant="primary">Login</NavbarButton>
              </Link>
            </SignedOut>

            {/* If logged in → show Avatar + Dashboard */}
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
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
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}

            {/* Mobile Auth Section */}
            <div className="flex w-full flex-col gap-4">
              <SignedOut>
                <Link href="/sign-in">
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
                <UserButton afterSignOutUrl="/" />
                <Link href="/dashboard">
                  <NavbarButton
                    as="span"
                    onClick={() => setIsMobileMenuOpen(false)}
                    variant="primary"
                    className="w-full"
                  >
                    Dashboard
                  </NavbarButton>
                </Link>
              </SignedIn>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </ResizableNavbar>
    </>
  );
}
