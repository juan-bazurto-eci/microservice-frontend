import React from "react";
import { render } from "@testing-library/react";
import BlankLayout from "@/components/templates/BlankLayout";

describe("BlankLayout Component", () => {
  it("renders BlankLayout with children", () => {
    const { getByText } = render(
      <BlankLayout>
        <div>Child Component</div>
      </BlankLayout>
    );

    expect(getByText("Child Component")).toBeInTheDocument();
  });
});
