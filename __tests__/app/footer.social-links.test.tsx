import React from "react";
import { render, screen } from "@testing-library/react";

import Footer from "@/app/components/Footer";

jest.mock("next/link", () => {
  return ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
});

jest.mock("@/lib/toast", () => ({
  showSuccess: jest.fn(),
  showError: jest.fn(),
}));

describe("Footer social links", () => {
  it("points the GitHub icon to the project repository", () => {
    render(<Footer />);

    const githubLink = screen.getByRole("link", { name: /github/i });

    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/Darshan3690/The-Dev-Pocket",
    );
  });
});
