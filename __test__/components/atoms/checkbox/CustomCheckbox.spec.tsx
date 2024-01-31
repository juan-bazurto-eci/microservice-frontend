import React from "react";
import { render, screen } from "@testing-library/react";
import CustomCheckbox from "@/components/atoms/checkbox/CustomCheckbox";

describe("CustomCheckbox component", () => {
  it("renders correctly", () => {
    render(<CustomCheckbox />);
    expect(screen.getByLabelText("Checkbox demo")).toBeInTheDocument();
  });

  it("renders with custom color when provided", () => {
    render(<CustomCheckbox color="secondary" />);
    expect(screen.getByRole("checkbox")).toHaveStyle({
      backgroundColor: "secondary.main",
    });
  });

  it("renders with default color when not provided", () => {
    render(<CustomCheckbox />);

    expect(screen.getByRole("checkbox")).toHaveStyle({
      backgroundColor: "primary.main",
    });
  });
});
