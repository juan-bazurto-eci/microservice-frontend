import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "@/components/organisms/HeaderLayout/Header";
import { useDispatch, useSelector } from "react-redux";
import { toggleMobileSidebar } from "@/store/customizer/CustomizerSlice";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("Header Component", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useSelector as any).mockReturnValue({ customizer: { TopbarHeight: 64 } });
    (useDispatch as any).mockReturnValue(mockDispatch);
  });

  it("renders Header component", () => {
    render(
      <ThemeProvider theme={createTheme()}>
        <Header />
      </ThemeProvider>
    );
  });

  it("toggles Mobile Sidebar on IconButton click for lgDown", () => {
    const lgDownMock = jest.fn();
    (useSelector as any).mockReturnValueOnce({
      customizer: { TopbarHeight: 64 },
    });
    (useSelector as any).mockReturnValueOnce(lgDownMock);

    const { getByLabelText } = render(
      <ThemeProvider theme={createTheme()}>
        <Header />
      </ThemeProvider>
    );

    fireEvent.click(getByLabelText("menu"));
    expect(mockDispatch).toHaveBeenCalledWith(toggleMobileSidebar());
  });

  it("does not render Navigation when lgUp is false", () => {
    (useSelector as any).mockReturnValueOnce({
      customizer: { TopbarHeight: 64 },
    });
    (useSelector as any).mockReturnValueOnce(false);

    const { queryByTestId } = render(
      <ThemeProvider theme={createTheme()}>
        <Header />
      </ThemeProvider>
    );

    expect(queryByTestId("navigation")).not.toBeInTheDocument();
  });
});
