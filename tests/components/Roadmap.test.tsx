import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Roadmap } from "../../src/components/roadmap/Roadmap";

describe("Roadmap Component", () => {
  it("renders the main heading", () => {
    render(<Roadmap />);
    expect(screen.getByText("The Voting Process")).toBeInTheDocument();
  });

  it("renders all four steps", () => {
    render(<Roadmap />);
    // Step titles might appear multiple times
    expect(screen.getAllByText("Registration")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Verification")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Polling")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Counting")[0]).toBeInTheDocument();
  });

  it("changes active step on click", () => {
    render(<Roadmap />);
    // Registration description is visible initially (might be in multiple places due to responsive design)
    expect(screen.getAllByText(/Ensure you are registered to vote before the deadline/i)[0]).toBeInTheDocument();

    // Click on Verification step (using the first one found which should be the clickable item)
    const verificationStep = screen.getAllByText("Verification")[0];
    fireEvent.click(verificationStep);

    // Now Verification description should be visible
    expect(screen.getAllByText(/Verify your voter status and polling location online/i)[0]).toBeInTheDocument();
  });
});
