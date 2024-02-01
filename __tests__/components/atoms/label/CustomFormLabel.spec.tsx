import React from "react";
import { render, screen } from "@testing-library/react";
import CustomFormLabel from "@/components/atoms/label/CustomFormLabel";

describe("CustomFormLabel component", () => {
  it("renders correctly", () => {
    render(<CustomFormLabel htmlFor="testId">Test Label</CustomFormLabel>);

    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("applies custom styles", () => {
    render(<CustomFormLabel htmlFor="testId">Test Label</CustomFormLabel>);

    const label = screen.getByText("Test Label");
    expect(label).toHaveStyle({
      marginBottom: "5px",
      marginTop: "25px",
      display: "block",
    });
  });

  it("sets htmlFor attribute correctly", () => {
    render(<CustomFormLabel htmlFor="testId">Test Label</CustomFormLabel>);

    const label = screen.getByText("Test Label");
    expect(label).toHaveAttribute("for", "testId");
  });
});
