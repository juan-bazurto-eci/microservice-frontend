import React from "react";
import { render, screen } from "@testing-library/react";
import Scrollbar from "@/components/molecules/scrollbar/Scrollbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";

describe("Scrollbar component", () => {
  it("renders children without SimpleBar on small screens", () => {
    const isSmallScreen = true;
    render(
      <ThemeProvider theme={createTheme()}>
        <Scrollbar sx={{}}>
          <div>Child Component</div>
        </Scrollbar>
      </ThemeProvider>
    );

    if (isSmallScreen) {
      // Verifica que la barra de desplazamiento SimpleBar no esté presente
      const simpleBar = screen.queryByRole("presentation");
      expect(simpleBar).not.toBeInTheDocument();

      // Verifica que el contenido esté presente
      const childComponent = screen.getByText(/Child Component/i);
      expect(childComponent).toBeInTheDocument();
    }
  });
});
