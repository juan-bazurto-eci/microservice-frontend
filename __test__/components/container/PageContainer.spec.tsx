import React from "react";
import { render, screen } from "@testing-library/react";
import PageContainer from "@/components/container/PageContainer";

describe("PageContainer component", () => {
  it("renders children correctly", () => {
    const childElement = <div data-testid="child-element">Child Element</div>;

    render(<PageContainer>{childElement}</PageContainer>);

    // Verifica que el componente PageContainer renderice correctamente los hijos
    const renderedChild = screen.getByTestId("child-element");
    expect(renderedChild).toBeInTheDocument();
    expect(renderedChild.textContent).toEqual("Child Element");
  });

  it("renders multiple children correctly", () => {
    const childElement1 = (
      <div data-testid="child-element-1">Child Element 1</div>
    );
    const childElement2 = (
      <div data-testid="child-element-2">Child Element 2</div>
    );

    render(
      <PageContainer>
        {childElement1}
        {childElement2}
      </PageContainer>
    );

    // Verifica que el componente PageContainer renderice múltiples hijos correctamente
    const renderedChild1 = screen.getByTestId("child-element-1");
    const renderedChild2 = screen.getByTestId("child-element-2");

    expect(renderedChild1).toBeInTheDocument();
    expect(renderedChild1.textContent).toEqual("Child Element 1");

    expect(renderedChild2).toBeInTheDocument();
    expect(renderedChild2.textContent).toEqual("Child Element 2");
  });
});
