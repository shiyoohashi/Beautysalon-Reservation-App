import React from "react";
import "./App.css";

import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import { Home } from "./components/Home";
import { ShopCalendar } from "./components/ShopCalendar";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shopcalender" element={<ShopCalendar />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
