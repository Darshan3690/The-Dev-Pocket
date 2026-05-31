import React from "react";
import { render, screen } from "@testing-library/react";

import Testimonials from "@/app/components/Testimonials";

jest.mock("framer-motion", () => {
  const passthrough = ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <div {...props}>{children}</div>
  );

  return {
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    motion: {
      div: passthrough,
      p: passthrough,
      span: passthrough,
    },
  };
});

jest.mock("@tabler/icons-react", () => ({
  IconArrowLeft: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />,
  IconArrowRight: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />,
}));

describe("Testimonials accessibility", () => {
  it("keeps the dark-mode contrast classes, labeled controls, and decorative wave semantics", () => {
    const { container } = render(<Testimonials />);

    const previous = screen.getByRole("button", { name: /previous testimonial/i });
    const next = screen.getByRole("button", { name: /next testimonial/i });

    expect(previous).toHaveClass("dark:border-slate-700", "dark:bg-neutral-800");
    expect(next).toHaveClass("dark:border-slate-700", "dark:bg-neutral-800");

    const darkPanel = container.querySelector(".dark\\:bg-slate-900\\/90");
    expect(darkPanel).not.toBeNull();
    expect(darkPanel).toHaveClass("dark:ring-slate-700");

    const decorativeWave = container.querySelector("svg[aria-hidden='true']");
    expect(decorativeWave).not.toBeNull();
    expect(decorativeWave).toHaveAttribute("focusable", "false");
  });
});
