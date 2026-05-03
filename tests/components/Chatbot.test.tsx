import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Chatbot } from "../../src/components/chatbot/Chatbot";

// Mock fetch API
global.fetch = jest.fn() as jest.Mock;

// Mock window.HTMLElement.prototype.scrollIntoView
window.HTMLElement.prototype.scrollIntoView = jest.fn();

describe("Chatbot Component", () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
    (window.HTMLElement.prototype.scrollIntoView as jest.Mock).mockClear();
  });

  it("renders the initial welcome message", () => {
    render(<Chatbot />);
    expect(screen.getByText(/Hello! I'm your Election Assistant/i)).toBeInTheDocument();
  });

  it("allows user to type and send a message", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "AI response" }),
    });

    render(<Chatbot />);
    
    const input = screen.getByPlaceholderText("Ask a question about the election...");
    const sendButton = screen.getByRole("button", { name: "Send message" });

    // Type a message
    fireEvent.change(input, { target: { value: "Am I eligible to vote?" } });
    expect(input).toHaveValue("Am I eligible to vote?");

    // Send message
    fireEvent.click(sendButton);

    // Optimistic UI updates
    expect(screen.getByText("Am I eligible to vote?")).toBeInTheDocument();
    expect(input).toHaveValue(""); // Input should clear

    // Wait for AI response
    await waitFor(() => {
      expect(screen.getByText("AI response")).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith("/api/chat", expect.any(Object));
  });

  it("handles API errors gracefully", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Server error" }),
    });

    render(<Chatbot />);
    
    const input = screen.getByPlaceholderText("Ask a question about the election...");
    const sendButton = screen.getByRole("button", { name: "Send message" });

    fireEvent.change(input, { target: { value: "Test error" } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText("Server error")).toBeInTheDocument();
    });
  });
});
