import { render, screen } from "@testing-library/react";
import { ShopCalendar } from "../../components/ShopCalendar";
import { MemoryRouter } from "react-router-dom";

describe("test Admin compornent", () => {
  test("reder form with 15 button element", () => {
    render(<ShopCalendar />, { wrapper: MemoryRouter });
    const buttonElement = screen.getAllByRole("button");
    expect(buttonElement).toHaveLength(15);
  });
  // test("reder form with 1 h1 text", () => {
  //   render(<Admin />, { wrapper: MemoryRouter });
  //   const h1Text = screen.getAllByText(/Administrator access/i);
  //   expect(h1Text).toHaveLength(1);
  // });
});
