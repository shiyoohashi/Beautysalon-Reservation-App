import { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import {
  listReserves,
  listHolidays,
  listMenus,
  listCustomers,
} from "../graphql/queries";
import {
  TypeOfReserve,
  TypeOfHoliday,
  TypeOfMenu,
  TypeOfCustomer,
} from "../global";
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
          setLoadedScreen(<ReserveInfo reserve={wantToDel} />);
        }, 500);
      } else {
        setLoadedScreen(<Menu />);
      }
    } catch (err) {
      console.log("error fetching todos");
    }
  }
  async function fetchHolyday() {
    try {
      const reservationData: any = await API.graphql(
        graphqlOperation(listHolidays)
      );

      const reservations: [TypeOfHoliday] =
        reservationData.data.listHolidays.items;
      console.log("holiday fetch", reservations);
    } catch (err) {
      console.log("error fetching todos");
    }
  }
  async function fetchMenu() {
    try {
      const reservationData: any = await API.graphql(
        graphqlOperation(listMenus)
      );

      const reservations: [TypeOfMenu] = reservationData.data.listMenus.items;
      console.log("menus fetch", reservations);
    } catch (err) {
      console.log("error fetching todos");
    }
  }

  async function fetchCustomer() {
    try {
      const reservationData: any = await API.graphql(
        graphqlOperation(listCustomers)
      );

      const reservations: [TypeOfCustomer] =
        reservationData.data.listCustomers.items;
      console.log("customers fetch", reservations);
    } catch (err) {
      console.log("error fetching todos");
    }
  }

  useEffect(() => {
    fetchReserves();
    fetchHolyday();
    fetchMenu();
    fetchCustomer();
  }, []);

  return <>{loadedScreen}</>;
};
