import React, { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import { TypeOfReserve } from "./global";

import { Home } from "./components/Home";
import { ShopCalendar } from "./components/ShopCalendar";
import { Menu } from "./components/Menu";
import { Time } from "./components/Time";

import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

function App() {
  const [menu, setMenu] = useState<string | null>(null);
  const [time, setTime] = useState<Date | null>(null);
  const [reserve, setReserve] = useState<TypeOfReserve[] | []>([]);
  console.log("reserve: ", reserve);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/shopcalender"
          element={<ShopCalendar reserve={reserve} />}
        />
        <Route path="/menu" element={<Menu menu={menu} setMenu={setMenu} />} />
        <Route
          path="/menu/time"
          element={
            <Time
              menu={menu}
              reserve={reserve}
              setReserve={setReserve}
              setTime={setTime}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
