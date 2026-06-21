import React from "react";
import { render, screen } from "@testing-library/react";

import Footer from "@/app/components/Footer";

jest.mock("next/link", () => {
  const MockLink = ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
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
