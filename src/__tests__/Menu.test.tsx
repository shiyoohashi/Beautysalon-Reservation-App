import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { Menu } from "../components/Menu";
import { MemoryRouter } from "react-router-dom";

describe("test tutorial", () => {
  test("test1", () => {
    expect(1 + 2).toBe(3);
  });

  // test("reder form with 1 div element", async () => {
  //   render(<Menu />, { wrapper: MemoryRouter });
  //   const divElemnt = await screen.findAllByRole("div");
  //   expect(divElemnt).toHaveLength(2);
  // });
});

test("renders learn react link", () => {
  // render(<Menu />);
  // const h3Element = screen.getByText(/Menu/i);
  // expect(h3Element).toBeInTheDocument();
  // expect(1).toEqual(1);
});
