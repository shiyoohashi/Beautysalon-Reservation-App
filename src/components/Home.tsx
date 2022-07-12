import { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { listReserves } from "../graphql/queries";
import { TypeOfReserve } from "../global";
import { Menu } from "./Menu";
import { ReserveInfo } from "./ReserveInfo";
import { Admin } from "./Admin";
import "./main.css";

export const Home = () => {
  const [loadedScreen, setLoadedScreen] = useState(<></>);

  async function fetchReserves() {
    try {
      const graphqlListReserves: any = await API.graphql(
        graphqlOperation(listReserves)
      );
      const reserves: [TypeOfReserve] =
        graphqlListReserves.data.listReserves.items;
      console.log("fetch", reserves);
      const reserveObj = reserves.find((reservation) => {
        return reservation.customerId === sessionStorage.getItem("user");
      });

      console.log("====reserveObj====", reserveObj);
      if (sessionStorage.getItem("user") === "administrator") {
        setLoadedScreen(<Admin />);
      } else if (reserveObj) {
        setTimeout(function () {
          setLoadedScreen(<ReserveInfo />);
        }, 500);
      } else {
        setLoadedScreen(<Menu />);
      }
    } catch (err) {
      console.log("error fetching todos", err);
    }
  }

  useEffect(() => {
    fetchReserves();
  }, []);

  return <>{loadedScreen}</>;
};
