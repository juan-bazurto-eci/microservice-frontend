import React from "react";
import { render } from "@testing-library/react";
import CustomSwitch from "@/components/atoms/switch/CustomSwitch";

describe("CustomSwitch component", () => {
  it("renders correctly", () => {
    render(<CustomSwitch />);
  });
});
