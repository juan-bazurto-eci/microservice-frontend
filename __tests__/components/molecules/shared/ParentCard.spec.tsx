import { render } from "@testing-library/react";
import ParentCard from "@/components/molecules/shared/ParentCard";

describe("ParentCard component", () => {
  it("renders title and children correctly", () => {
    const { getByText } = render(
      <ParentCard title="Test Title">
        <div>Child content</div>
      </ParentCard>
    );
    const titleElement = getByText("Test Title");
    const childElement = getByText("Child content");

    expect(titleElement).toBeInTheDocument();
    expect(childElement).toBeInTheDocument();
  });

  it("renders footer correctly", () => {
    const { getByText } = render(
      <ParentCard title="Test Title" footer="Test Footer">
        <div>Child content</div>
      </ParentCard>
    );
    const footerElement = getByText("Test Footer");
    expect(footerElement).toBeInTheDocument();
  });

  it("does not render footer if not provided", () => {
    const { queryByText } = render(
      <ParentCard title="Test Title">
        <div>Child content</div>
      </ParentCard>
    );
    const footerElement = queryByText("Test Footer");
    expect(footerElement).toBeNull();
  });
});
