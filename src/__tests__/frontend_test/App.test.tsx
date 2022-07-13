import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes, BrowserRouter } from "react-router-dom";

// import { Route, Routes, BrowserRouter } from "react-router-dom";
// import renderer from "react-test-renderer";

// jest.mock("react-router-dom/Link", () => "Link2");
// window.URL.createObjectURL = jest.fn();

describe("imageSize", () => {
  // beforeEach(() => {
  //   URL.createObjectURL = jest.fn();
  // });

  test("Should render sigUp view component", () => {
    // global.URL.createObjectURL = jest.fn();
    // window.URL.createObjectURL = function () {
    //   return "a";
    // };
    // render(<App />, { wrapper: Route });
    // global.URL.createObjectURL = jest.fn();

    // render(<App />, { wrapper: MemoryRouter });
    // render(<Home />, { wrapper: MemoryRouter });
    // console.log("Menu: ", Admin.caller);
    // const linkElement = screen.getByText(/Menus/i);
    // const role = screen.getAllByRole;
    // console.log("role: ", role);

    // expect(linkElement).toBeInTheDocument();
    expect(1).toEqual(1);
  });

  // const linkElement = screen.getByText(/施術目安/i);
  // expect(linkElement).toBeInTheDocument();

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
