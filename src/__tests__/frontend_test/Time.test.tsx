import React from "react";
import { render, screen } from "@testing-library/react";
import { Time } from "../../components/Time";
import { MemoryRouter } from "react-router-dom";

describe("test Time compornent", () => {
  test("reder form with 1 table element", () => {
    render(<Time />, { wrapper: MemoryRouter });
    const tableElement = screen.getAllByRole("table");
    expect(tableElement).toHaveLength(1);
  });
  test("reder form with 1 link element", () => {
    render(<Time />, { wrapper: MemoryRouter });
    const linkElement = screen.getAllByRole("link");
    expect(linkElement).toHaveLength(1);
  });
});
