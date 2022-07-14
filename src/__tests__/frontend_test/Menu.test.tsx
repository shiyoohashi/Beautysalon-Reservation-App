import { render, screen } from "@testing-library/react";
import { Menu } from "../../components/Menu";
import { MemoryRouter } from "react-router-dom";

describe("test Menu compornent", () => {
  test("reder form with 1 h3 element", () => {
    render(<Menu />, { wrapper: MemoryRouter });
    const h3Element = screen.getAllByRole("heading", { level: 3 });
    expect(h3Element).toHaveLength(1);
  });
  // test("reder form with 1 h1 text", () => {
  //   render(<Menu />, { wrapper: MemoryRouter });
  //   const h1Text = screen.getAllByText(/Administrator access/i);
  //   expect(h1Text).toHaveLength(1);
  // });
  test("reder form with 1 link element", () => {
    render(<Menu />, { wrapper: MemoryRouter });
    const linkElement = screen.getAllByRole("link");
    expect(linkElement).toHaveLength(2);
  });
});
