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
      const reservationData: any = await API.graphql(
        graphqlOperation(listReserves)
      );
      const reservations: [TypeOfReserve] =
        reservationData.data.listReservations.items;
      console.log("fetch", reservations);
      const wantToDel = reservations.find((reservation) => {
        return reservation.customerId === sessionStorage.getItem("user");
      });

      console.log("====wantToDel====", wantToDel);
      if (sessionStorage.getItem("user") === "administrator") {
        setLoadedScreen(<Admin />);
      } else if (wantToDel) {
        setTimeout(function () {
          setLoadedScreen(<ReserveInfo />);
        }, 500);
      } else {
        setLoadedScreen(<Menu />);
      }
    } catch (err) {
      console.log("error fetching todos");
    }
  }

  useEffect(() => {
    fetchReserves();
  }, []);

  return <>{loadedScreen}</>;
};
