import { render, screen } from "@testing-library/react";
import { Admin } from "../../components/Admin";
import { MemoryRouter } from "react-router-dom";

describe("test Admin compornent", () => {
  // test("reder form with 2 div element", () => {
  //   render(<Admin />, { wrapper: MemoryRouter });
  //   const divElement = screen.getAllByRole("aa");
  //   // console.log("divElement : ", divElement);
  //   expect(divElement).toHaveLength(1);
  // });
  test("reder form with 1 h1 element", () => {
    render(<Admin />, { wrapper: MemoryRouter });
    const h1Element = screen.getAllByRole("heading", { level: 1 });
    expect(h1Element).toHaveLength(1);
  });
  test("reder form with 1 h1 text", () => {
    render(<Admin />, { wrapper: MemoryRouter });
    const h1Text = screen.getAllByText(/Administrator access/i);
    expect(h1Text).toHaveLength(1);
  });
  test("reder form with 4 button element", () => {
    render(<Admin />, { wrapper: MemoryRouter });
    const buttonElement = screen.getAllByRole("button");
    expect(buttonElement).toHaveLength(4);
  });
  test("reder form with 4 link element", () => {
    render(<Admin />, { wrapper: MemoryRouter });
    const linkElement = screen.getAllByRole("link");
    expect(linkElement).toHaveLength(4);
  });
});
