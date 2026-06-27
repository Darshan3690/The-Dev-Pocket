import React from "react";
import { render, screen } from "@testing-library/react";

import HomePage from "@/app/page";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} alt={props.alt || ""} />,
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

jest.mock("framer-motion", () => ({
  motion: {
    section: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => <section {...props}>{children}</section>,
  },
}));

jest.mock("next-themes", () => ({
  useTheme: () => ({ resolvedTheme: "dark" }),
}));

jest.mock("@clerk/nextjs", () => ({
  useUser: () => ({ isSignedIn: false }),
}));

jest.mock("@/components/ui/button", () => ({
  Button: ({ children, asChild, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) => <button {...props}>{children}</button>,
}));

jest.mock("@/components/hero-with-mockup", () => ({
  HeroWithMockup: ({ title, description }: { title: string; description: string }) => (
    <section>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  ),
}));

jest.mock("@/app/components/ui/Particle", () => ({
  __esModule: true,
  default: () => null,
}));

jest.mock("@/app/components/HowItWorks", () => ({
  __esModule: true,
  default: () => <section>How it works</section>,
}));

jest.mock("@/app/components/Testimonials", () => ({
  __esModule: true,
  default: () => <section>Testimonials</section>,
}));

jest.mock("@/lib/accessibility", () => ({
  useAccessibility: () => ({}),
}));

jest.mock("@/lib/performance", () => ({
  usePerformanceMonitoring: () => ({}),
}));

jest.mock("@/lib/error-handling", () => ({
  useErrorHandling: () => ({}),
}));

beforeAll(() => {
  class MockIntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  Object.defineProperty(global, "IntersectionObserver", {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  });
});

describe("HomePage support section", () => {
  it("uses stronger dark-mode contrast and visible focus rings in the help cards", () => {
    render(<HomePage />);

    const heading = screen.getByRole("heading", { name: /need help\? we're here for you/i });
    expect(heading).toHaveClass("text-slate-900", "dark:text-slate-100");

    const intro = screen.getByText(/get quick answers or reach out to our support team/i);
    expect(intro).toHaveClass("text-slate-700", "dark:text-slate-300");

    const faqLink = screen.getByRole("link", { name: /faq/i });
    expect(faqLink).toHaveClass("focus-visible:ring-4", "dark:focus-visible:ring-blue-900/70");

    const faqDescription = screen.getByText(/find quick answers to common questions and support/i);
    expect(faqDescription).toHaveClass("text-slate-700", "dark:text-slate-200");
  });
});
