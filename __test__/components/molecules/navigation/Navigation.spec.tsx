import React from "react";
import { render, screen } from "@testing-library/react";
import Navigation from "@/components/molecules/navigation/Navigation";

describe("Navigation component", () => {
  it("renders navigation links correctly", () => {
    render(<Navigation />);

    // Verifica que los enlaces de navegación se rendericen correctamente
    const inicioLink = screen.getByText("Inicio");
    const postsLink = screen.getByText("Posts");

    expect(inicioLink).toBeInTheDocument();
    expect(postsLink).toBeInTheDocument();
  });
});
