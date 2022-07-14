import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { EditStylist } from "../../components/EditStylist";

describe("App", () => {
  test("reder form with 1 table element", () => {
    render(<EditStylist />, { wrapper: MemoryRouter });
    const tableElement = screen.getAllByRole("table");
    expect(tableElement).toHaveLength(1);
  });
  test("reder form with text スタイリスト名", () => {
    render(<EditStylist />, { wrapper: MemoryRouter });
    const text = screen.getAllByText(/スタイリスト名/i);
    expect(text).toHaveLength(1);
  });
  test("reder form with text 操作", () => {
    render(<EditStylist />, { wrapper: MemoryRouter });
    const text = screen.getAllByText(/操作/i);
    expect(text).toHaveLength(1);
  });
  test("reder form with 1 button element", () => {
    render(<EditStylist />, { wrapper: MemoryRouter });
    const buttonElement = screen.getAllByRole("button");
    expect(buttonElement).toHaveLength(1);
  });
});
