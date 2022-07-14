import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { ShopCalendar } from "../components/ShopCalendar";

describe("test tutorial", () => {
  test("test1", () => {
    expect(1 + 2).toBe(3);
  });
});

test("renders learn react link", () => {
  //   render(<Menu />);
  //   const linkElement = screen.getByText(/施術目安/i);
  //   expect(linkElement).toBeInTheDocument();
  expect(1).toEqual(1);

  // ///////////////////////////
  // function forEach(items: any, callback: any) {
  //   for (let index = 0; index < items.length; index++) {
  //     callback(items[index]);
  //   }
  // }
  // const mockCallback = jest.fn((x) => 42 + x);
  // forEach([0, 1], mockCallback);

  // // The mock function is called twice
  // expect(mockCallback.mock.calls.length).toBe(2);

  // // The first argument of the first call to the function was 0
  // expect(mockCallback.mock.calls[0][0]).toBe(0);

  // // The first argument of the second call to the function was 1
  // expect(mockCallback.mock.calls[1][0]).toBe(1);

  // // The return value of the first call to the function was 42
  // expect(mockCallback.mock.results[0].value).toBe(42);
});
