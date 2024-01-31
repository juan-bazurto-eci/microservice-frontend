import React from "react";
import { render, screen } from "@testing-library/react";
import QuickLinks from "@/components/atoms/Links/QuickLinks";

jest.mock(
  "next/link",
  () =>
    ({ children }: any) =>
      children
);

jest.mock("./data", () => ({
  pageLinks: [
    { title: "Inicio", href: "/dashboard" },
    { title: "Publicar", href: "/posts/publicar" },
    { title: "Actualizar", href: "/posts/actualizar" },
  ],
}));

describe("QuickLinks component", () => {
  it("renders correctly", () => {
    render(<QuickLinks />);

    expect(screen.getByText("Enlaces rápidos")).toBeInTheDocument();
    expect(screen.getByText("Inicio")).toBeInTheDocument();
    expect(screen.getByText("Publicar")).toBeInTheDocument();
    expect(screen.getByText("Actualizar")).toBeInTheDocument();
  });
});
