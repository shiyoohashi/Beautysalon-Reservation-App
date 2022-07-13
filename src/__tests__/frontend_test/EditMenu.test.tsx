import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { EditMenu } from "../../components/EditMenu";

describe("App", () => {
  test("reder form with 1 table element", () => {
    render(<EditMenu />, { wrapper: MemoryRouter });
    const tableElement = screen.getAllByRole("table");
    expect(tableElement).toHaveLength(1);
  });
  test("reder form with text めにゅ〜", () => {
    render(<EditMenu />, { wrapper: MemoryRouter });
    const text = screen.getAllByText(/めにゅ〜/i);
    expect(text).toHaveLength(1);
  });
  test("reder form with text 料金", () => {
    render(<EditMenu />, { wrapper: MemoryRouter });
    const text = screen.getAllByText(/料金/i);
    expect(text).toHaveLength(2);
  });
  test("reder form with text 施術時間", () => {
    render(<EditMenu />, { wrapper: MemoryRouter });
    const text = screen.getAllByText(/施術時間/i);
    expect(text).toHaveLength(2);
  });
  test("reder form with text 詳細", () => {
    render(<EditMenu />, { wrapper: MemoryRouter });
    const text = screen.getAllByText(/詳細/i);
    expect(text).toHaveLength(2);
  });
  test("reder form with text 操作", () => {
    render(<EditMenu />, { wrapper: MemoryRouter });
    const text = screen.getAllByText(/操作/i);
    expect(text).toHaveLength(1);
  });
  test("reder form with text メニュー名", () => {
    render(<EditMenu />, { wrapper: MemoryRouter });
    const text = screen.getAllByText(/メニュー名/i);
    expect(text).toHaveLength(1);
  });
  test("reder form with text メニュー追加", () => {
    render(<EditMenu />, { wrapper: MemoryRouter });
    const text = screen.getAllByText(/メニュー追加/i);
    expect(text).toHaveLength(1);
  });

  test("reder form with 1 button element", () => {
    render(<EditMenu />, { wrapper: MemoryRouter });
    const buttonElement = screen.getAllByRole("button");
    expect(buttonElement).toHaveLength(1);
  });
});
