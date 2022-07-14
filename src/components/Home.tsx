import "./css/Home.css";
import { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { listReserves } from "../graphql/queries";
import { TypeOfReserve } from "../global";
import { Menu } from "./Menu";
import { ReserveInfo } from "./ReserveInfo";
import { Admin } from "./Admin";

export async function fetchReserveObj(userName: string | null) {
  try {
    const graphqlListReserves: any = await API.graphql(
      graphqlOperation(listReserves)
    );
    const reserves: [TypeOfReserve] =
      graphqlListReserves.data.listReserves.items;
    const reserveObj: TypeOfReserve | undefined = reserves.find(
      (reservation) => {
        return reservation.customerId === userName;
      }
    );
    return reserveObj;
  } catch (err) {
    console.log("error fetchReserveObj", err);
    return undefined;
  }
}

export const Home = () => {
  const [showComponent, setShowComponent] = useState(<></>);

  useEffect(() => {
    displayComponent();
  }, []);

  async function displayComponent() {
    const reserveObj: TypeOfReserve | undefined = await fetchReserveObj(
      sessionStorage.getItem("user")
    );
    if (sessionStorage.getItem("user") === "administrator") {
      setShowComponent(<Admin />);
    } else if (reserveObj) {
      setTimeout(function () {
        setShowComponent(<ReserveInfo />);
      }, 500);
    } else {
      console.log("else: ");
      setShowComponent(<Menu />);
    }
  }
  return <>{showComponent}</>;
};
