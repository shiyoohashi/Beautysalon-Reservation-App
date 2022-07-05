import React, { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { TypeOfReserve } from "./global";
import { Home } from "./components/Home";
import { ShopCalendar } from "./components/ShopCalendar";
import { CheckReserve } from "./components/CheckReserve";
import { Menu } from "./components/Menu";
import { Time } from "./components/Time";
import { withAuthenticator, Button, Heading } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";

Amplify.configure(awsExports);

function App({ signOut, user }: any) {
  const [reserves, setReserves] = useState<TypeOfReserve[] | []>([]);
  sessionStorage.setItem("user", user.attributes.name);

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/shopcalender"
            element={
              <ShopCalendar reserves={reserves} setReserves={setReserves} />
            }
          />
          <Route path="/menu" element={<Menu />} />
          <Route
            path="/menu/time"
            element={<Time reserves={reserves} setReserves={setReserves} />}
          />
          <Route path="/menu/time/checkreserve" element={<CheckReserve />} />
        </Routes>
      </div>
      <Heading level={4}>ログインユーザー：{user.attributes.name} さん</Heading>
      <Button onClick={signOut}>Sign out</Button>
    </>
  );
}

export default withAuthenticator(App);
