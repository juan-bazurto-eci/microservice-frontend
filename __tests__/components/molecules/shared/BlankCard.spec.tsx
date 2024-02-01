import { render } from "@testing-library/react";
import BlankCard from "@/components/molecules/shared/BlankCard";

describe("BlankCard component", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <BlankCard>
        <div>Child content</div>
      </BlankCard>
    );
    const childElement = getByText("Child content");
    expect(childElement).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <BlankCard className="custom-class">
        <div>Child content</div>
      </BlankCard>
    );
    const cardElement = container.firstChild;
    expect(cardElement).toHaveClass("custom-class");
  });
});
