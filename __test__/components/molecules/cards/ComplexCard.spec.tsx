import React from "react";
import { render, screen } from "@testing-library/react";
import ComplexCard from "@/components/molecules/cards/ComplexCard";

describe("ComplexCard component", () => {
  const mockComplexCard = [
    { title: "Card 1", href: "/card1" },
    { title: "Card 2", href: "/card2" },
  ];

  it("renders cards correctly", () => {
    render(<ComplexCard complexCard={mockComplexCard} />);

    // Verifica que los elementos de tarjeta se rendericen correctamente
    const card1 = screen.getByText("Card 1");
    const card2 = screen.getByText("Card 2");

    expect(card1).toBeInTheDocument();
    expect(card2).toBeInTheDocument();
  });
});
