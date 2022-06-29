import React, { useState } from "react";
import "./App.css";

import { Route, Routes } from "react-router-dom";

import { Home } from "./components/Home";
import { ShopCalendar } from "./components/ShopCalendar";
import { Menu } from "./components/Menu";
import { Time } from "./components/Time";

function App() {
  const [menu, setMenu] = useState<string | null>(null);
  console.log("menu: ", menu);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shopcalender" element={<ShopCalendar />} />
        <Route path="/menu" element={<Menu menu={menu} setMenu={setMenu} />} />
        <Route path="/menu/time" element={<Time menu={menu} />} />
      </Routes>
    </div>
  );
}

export default App;
