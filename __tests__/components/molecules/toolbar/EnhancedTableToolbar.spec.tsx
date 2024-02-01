import { render, screen, fireEvent } from "@testing-library/react";
import EnhancedTableToolbar from "@/components/molecules/toolbar/EnhancedTableToolbar";

describe("EnhancedTableToolbar component", () => {
  it("renders toolbar with search input", () => {
    render(<EnhancedTableToolbar />);
    const searchInput = screen.getByPlaceholderText("Buscador");
    expect(searchInput).toBeInTheDocument();
  });

  it("calls handleSearch when search input changes", () => {
    const handleSearch = jest.fn();
    render(<EnhancedTableToolbar handleSearch={handleSearch} />);
    const searchInput = screen.getByPlaceholderText("Buscador");
    fireEvent.change(searchInput, { target: { value: "test" } });
    expect(handleSearch).toHaveBeenCalledWith(expect.anything());
  });

  it("calls handleKeyDown when a key is pressed in the search input", () => {
    const handleKeyDown = jest.fn();
    render(<EnhancedTableToolbar handleKeyDown={handleKeyDown} />);
    const searchInput = screen.getByPlaceholderText("Buscador");
    fireEvent.keyDown(searchInput, { key: "Enter" });
    expect(handleKeyDown).toHaveBeenCalledWith(expect.anything());
  });

  it("calls handleBlur when the search input loses focus", () => {
    const handleBlur = jest.fn();
    render(<EnhancedTableToolbar handleBlur={handleBlur} />);
    const searchInput = screen.getByPlaceholderText("Buscador");
    fireEvent.blur(searchInput);
    expect(handleBlur).toHaveBeenCalledWith(expect.anything());
  });

  it("renders toolbar with search input and button when handleButtonClick is provided", () => {
    const handleButtonClick = jest.fn();
    render(<EnhancedTableToolbar handleButtonClick={handleButtonClick} />);
    const searchInput = screen.getByPlaceholderText("Post Id");
    const searchButton = screen.getByText("Buscar");
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  it("calls handleButtonClick when search button is clicked", () => {
    const handleButtonClick = jest.fn();
    render(<EnhancedTableToolbar handleButtonClick={handleButtonClick} />);
    const searchButton = screen.getByText("Buscar");
    fireEvent.click(searchButton);
    expect(handleButtonClick).toHaveBeenCalledWith(expect.anything());
  });
});
