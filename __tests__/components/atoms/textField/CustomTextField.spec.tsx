import React from "react";
import { render } from "@testing-library/react";
import CustomTextField from "@/components/atoms/textField/CustomTextField";

describe("CustomTextField component", () => {
  it("renders correctly", () => {
    render(<CustomTextField />);
  });
});
