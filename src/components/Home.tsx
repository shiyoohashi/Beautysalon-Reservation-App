import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { listReserves } from "../graphql/queries";
import awsExports from "../aws-exports";
import { TypeOfReserve } from "../global";
import { Menu } from "./Menu";
import { ReserveInfo } from "./ReserveInfo";
import "./main.css";
Amplify.configure(awsExports);

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
      if (wantToDel) {
        setLoadedScreen(<ReserveInfo />);
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

  return (
    <>
      {loadedScreen}
      {/* {(() => {
        if (sessionStorage.getItem("user") === "administrator") {
          return <Link to="/shopcalender">予約一覧</Link>;
        }
      })() */}
    </>
  );
};
