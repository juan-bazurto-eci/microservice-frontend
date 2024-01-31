import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AlertSubmit from "@/components/atoms/alert/AlertSubmmit";

describe("AlertSubmit component", () => {
  it("renders correctly with title and severity", () => {
    render(
      <AlertSubmit
        title="Test Title"
        severity="success"
        open={true}
        handleClose={() => {}}
      />
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveClass("MuiAlert-filledSuccess");
  });

  it("renders HTML in title when dangerouslySetInnerHTML is true", () => {
    render(
      <AlertSubmit
        title="<strong>HTML Title</strong>"
        severity="info"
        open={true}
        handleClose={() => {}}
        dangerouslySetInnerHTML={true}
      />
    );

    expect(screen.getByRole("alert")).toContainHTML(
      "<strong>HTML Title</strong>"
    );
  });

  it("calls handleClose when the alert is closed", () => {
    const handleCloseMock = jest.fn();

    render(
      <AlertSubmit
        title="Test Title"
        severity="error"
        open={true}
        handleClose={handleCloseMock}
      />
    );
    fireEvent.click(screen.getByRole("button"));
    expect(handleCloseMock).toHaveBeenCalled();
  });
});
