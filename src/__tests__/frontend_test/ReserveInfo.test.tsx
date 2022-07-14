import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ReserveInfo } from "../../components/ReserveInfo";

describe("App", () => {
  // test("reder form with 2 div element", () => {
  //   render(<Admin />, { wrapper: MemoryRouter });
  //   const divElement = screen.getAllByRole("aa");
  //   // console.log("divElement : ", divElement);
  //   expect(divElement).toHaveLength(1);
  // });
  // test("mocktest", () => {
  // const mockCallback = jest.fn(() => {
  //   return
  //     {
  //       date: new Date(),
  //       menu: "角刈り",
  //       amountOfMonay: 200000,
  //     }
  // });
  // ReserveInfo.
  // console.log("mockkkk : ", mockCallback.mock.calls.keys);
  // });

  //   expect(mockCallback.mock.calls[0]).tobe({
  //     test1: 1,
  //     test2: 2,
  //     test3: 3,
  //   });
  // });
  test("reder form with 1 h3 element", () => {
    render(<ReserveInfo />, { wrapper: MemoryRouter });
    const h1Element = screen.getAllByRole("heading", { level: 3 });
    expect(h1Element).toHaveLength(1);
  });
  test("reder form with 1 table element", () => {
    render(<ReserveInfo />, { wrapper: MemoryRouter });
    const tableText = screen.getAllByRole("table");
    expect(tableText).toHaveLength(1);
  });
  test("reder form with text 予約日", () => {
    render(<ReserveInfo />, { wrapper: MemoryRouter });
    const reserveDateText = screen.getAllByText(/予約日/i);
    expect(reserveDateText).toHaveLength(1);
  });
  test("reder form with text メニュー", () => {
    render(<ReserveInfo />, { wrapper: MemoryRouter });
    const menuText = screen.getAllByText(/メニュー/i);
    expect(menuText).toHaveLength(1);
  });
  test("reder form with text 料金", () => {
    render(<ReserveInfo />, { wrapper: MemoryRouter });
    const amountOfMonayText = screen.getAllByText(/料金/i);
    expect(amountOfMonayText).toHaveLength(1);
  });
  test("reder form with text 円", () => {
    render(<ReserveInfo />, { wrapper: MemoryRouter });
    const enText = screen.getAllByText(/円/i);
    expect(enText).toHaveLength(1);
  });
  test("reder form with text massage", () => {
    render(<ReserveInfo />, { wrapper: MemoryRouter });
    const massegeText = screen.getAllByText(
      /ご予約ありがとうございます。当日のご来店をお待ちしております。/i
    );
    expect(massegeText).toHaveLength(1);
  });
  test("reder form with 1 button element", () => {
    render(<ReserveInfo />, { wrapper: MemoryRouter });
    const buttonElement = screen.getAllByRole("button");
    expect(buttonElement).toHaveLength(1);
  });
});
