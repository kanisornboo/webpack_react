import React from "react";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";
import App from "../components/App";

describe("App component", () => {
  beforeAll(() => {
    render(<App />);
  });

  it("should have the right message in the dom", () => {
    const message = "Hello from App component";

    expect(screen.getByText(message)).toBeInTheDocument();
  });

  afterAll(cleanup);
});

describe("Sample test", () => {
  test("should be equal to 1", () => {
    expect(1).toBe(1);
  });
});
