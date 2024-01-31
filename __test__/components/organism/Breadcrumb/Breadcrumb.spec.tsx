import { render, screen } from "@testing-library/react";
import Breadcrumb from "@/components/organisms/Breadcrumb/Breadcrumb";

describe("Breadcrumb component", () => {
  it("renders title and subtitle correctly", () => {
    render(<Breadcrumb title="Test Title" subtitle="Test Subtitle" />);

    const titleElement = screen.getByText("Test Title");
    const subtitleElement = screen.getByText("Test Subtitle");

    expect(titleElement).toBeInTheDocument();
    expect(subtitleElement).toBeInTheDocument();
  });

  it("renders breadcrumb items correctly", () => {
    const items = [
      { title: "Home", to: "/" },
      { title: "Category", to: "/category" },
      { title: "Current Page" },
    ];

    render(
      <Breadcrumb title="Test Title" subtitle="Test Subtitle" items={items} />
    );

    for (const item of items) {
      const breadcrumbItem = screen.getByText(item.title);

      if (item.to) {
        expect(breadcrumbItem.closest("a")).toHaveAttribute("href", item.to);
      }
    }
  });

  it("renders children correctly", () => {
    const customChildren = (
      <div data-testid="custom-children">Custom Children</div>
    );

    render(
      <Breadcrumb title="Test Title" subtitle="Test Subtitle">
        {customChildren}
      </Breadcrumb>
    );

    const customChildrenElement = screen.getByTestId("custom-children");

    expect(customChildrenElement).toBeInTheDocument();
  });
});
