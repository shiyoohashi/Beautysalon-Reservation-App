import React from "react";
import { render, screen } from "@testing-library/react";
import { CheckReserve } from "../../components/CheckReserve";
import { MemoryRouter } from "react-router-dom";

describe("test CheckReserve compornent", () => {
  test("reder form with 1 table element", () => {
    render(<CheckReserve />, { wrapper: MemoryRouter });
    const tableElement = screen.getAllByRole("table");
    expect(tableElement).toHaveLength(1);
  });
  test("reder form with 1 h3 element", () => {
    render(<CheckReserve />, { wrapper: MemoryRouter });
    const h3Element = screen.getAllByRole("heading", { level: 3 });
    expect(h3Element).toHaveLength(1);
  });
  test("reder form with text 予約日", () => {
    render(<CheckReserve />, { wrapper: MemoryRouter });
    const reserveText = screen.getAllByText(/予約日/i);
    expect(reserveText).toHaveLength(1);
  });
  test("reder form with text メニュー", () => {
    render(<CheckReserve />, { wrapper: MemoryRouter });
    const menuText = screen.getAllByText(/メニュー/i);
    expect(menuText).toHaveLength(1);
  });
  test("reder form with text 料金", () => {
    render(<CheckReserve />, { wrapper: MemoryRouter });
    const amountOfMonayText = screen.getAllByText(/料金/i);
    expect(amountOfMonayText).toHaveLength(1);
  });
  test("reder form with 1 button element", () => {
    render(<CheckReserve />, { wrapper: MemoryRouter });
    const buttonElement = screen.getAllByRole("button");
    expect(buttonElement).toHaveLength(1);
  });
  test("reder form with 1 link element", () => {
    render(<CheckReserve />, { wrapper: MemoryRouter });
    const linkElement = screen.getAllByRole("link");
    expect(linkElement).toHaveLength(1);
  });
});
