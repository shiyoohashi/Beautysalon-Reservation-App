import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { FooterNavbar } from "../../components/FooterNavbar";

describe("App", () => {
  test("reder form with 1 button element", () => {
    render(<FooterNavbar />, { wrapper: MemoryRouter });
    const buttonElement = screen.getAllByRole("button");
    expect(buttonElement).toHaveLength(1);
  });
  test("reder form with 1 link element", () => {
    render(<FooterNavbar />, { wrapper: MemoryRouter });
    const linkElement = screen.getAllByRole("link");
    expect(linkElement).toHaveLength(1);
  });
});
