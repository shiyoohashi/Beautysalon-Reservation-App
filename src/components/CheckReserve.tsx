import { Link } from "react-router-dom";
import {
  TypeOfReserve,
  TypeOfMenu,
  TypeOfHoliday,
  TypeOfStylist,
  TypeOfCustomer,
} from "../global";
import { API, graphqlOperation } from "aws-amplify";
import {
  createReservation,
  createHoliday,
  createMenu,
  createStylist,
  createCustomer,
} from "../graphql/mutations";
import dayjs from "dayjs";

export const CheckReserve = () => {
  async function addReservation(reservation: TypeOfReserve) {
    try {
      if (
        !reservation.date ||
        !reservation.menu ||
        !reservation.stylistId ||
        !reservation.customerId
      ) {
        console.log("====addTodoできてないよ=====");
        console.log("====reservation.date=====", reservation.date);
        console.log("====reservation.menuId=====", reservation.menu);
        console.log("====reservation.stylistId=====", reservation.stylistId);
        console.log("====reservation.customerId=====", reservation.customerId);
        return;
      }
      await API.graphql(
        graphqlOperation(createReservation, { input: reservation })
      );
    } catch (err) {
      console.log("error creating reservation:", err);
    }
  }

  //holydaytest用
  async function addReservationHoliday(reservation: TypeOfHoliday) {
    try {
      if (!reservation.date) {
        console.log("====addTodoできてないよ=====");
        console.log("====reservation.date=====", reservation.date);
        return;
      }

      await API.graphql(
        graphqlOperation(createHoliday, { input: reservation })
      );
    } catch (err) {
      console.log("error creating reservation:", err);
    }
  }
  //mentest用
  async function addReservationMenu(reservation: TypeOfMenu) {
    try {
      if (
        !reservation.menu ||
        !reservation.amountOfMoney ||
        !reservation.treatmentTime
      ) {
        console.log("====addTodoできてないよ=====");
        console.log("====reservation.menu=====", reservation.menu);
        console.log(
          "====reservation.amountOfMenu=====",
          reservation.amountOfMoney
        );
        console.log(
          "====reservation.treatmentTime=====",
          reservation.treatmentTime
        );
        return;
      }

      await API.graphql(graphqlOperation(createMenu, { input: reservation }));
    } catch (err) {
      console.log("error creating reservation:", err);
    }
  }
  //stylist用
  async function addReservationStylist(reservation: TypeOfStylist) {
    try {
      if (!reservation.name) {
        console.log("====addTodoできてないよ=====");
        console.log("====reservation.name=====", reservation.name);
        return;
      }

      await API.graphql(
        graphqlOperation(createStylist, { input: reservation })
      );
    } catch (err) {
      console.log("error creating reservation:", err);
    }
  }
  //customer用
  async function addReservationCustomer(reservation: TypeOfCustomer) {
    try {
      if (!reservation.name || !reservation.mail) {
        console.log("====addTodoできてないよ=====");
        console.log("====reservation.name=====", reservation.name);
        console.log("====reservation.mail=====", reservation.mail);
        return;
      }

      await API.graphql(
        graphqlOperation(createCustomer, { input: reservation })
      );
    } catch (err) {
      console.log("error creating reservation:", err);
    }
  }
  //testここまで

  function eventOnClick() {
    const reserve: TypeOfReserve = {
      date: sessionStorage.getItem("start")!,
      menu: sessionStorage.getItem("menu")!,
      stylistId: 2,
      customerId: sessionStorage.getItem("user")!,
    };

    addReservation(reserve);

    //testdata
    const reserveTest: any = {
      date: sessionStorage.getItem("start")!,
    };
    console.log("addReservationHoliday: ", reserveTest);
    addReservationHoliday(reserveTest);

    const addReservationMenuTest: any = {
      menu: "test of 角刈り",
      amountOfMoney: 1000000000,
      treatmentTime: 60,
    };
    console.log("addReservationMenuTest: ", addReservationMenuTest);
    addReservationMenu(addReservationMenuTest);

    const addReservationStylistTest: any = {
      name: "syo san",
    };
    console.log("addReservationStylistTest: ", addReservationStylistTest);
    addReservationStylist(addReservationStylistTest);

    const addReservationCustomerTest: any = {
      name: "isaaaaaaji",
      mail: "isaaaaaaji@io",
    };
    console.log("addReservationCustomerTest: ", addReservationCustomerTest);
    addReservationCustomer(addReservationCustomerTest);

    //testdataここまで

    const homeLink: HTMLInputElement = document.getElementById(
      "home"
    ) as HTMLInputElement;
    setTimeout(function () {
      homeLink.click();
    }, 500);
  }

  return (
    <div id="check-reserve">
      <h3 className="text-center">Confirmation</h3>
      <table className="table table-striped table-dark ">
        <tbody>
          <tr>
            <td className="text-center">予約日</td>
            <td className="text-center">
              {dayjs(sessionStorage.getItem("start")).format(
                "YY年MM月DD日\nHH時mm分"
              )}
            </td>
          </tr>
          <tr>
            <td className="text-center">メニュー</td>
            <td className="text-center">{sessionStorage.getItem("menu")}</td>
          </tr>
          <tr>
            <td className="text-center">料金</td>
            <td className="text-center">
              {sessionStorage.getItem("amountOfMoney")} 円
            </td>
          </tr>
        </tbody>
      </table>
      <div className="text-center">
        <button className="btn btn-dark" onClick={eventOnClick}>
          予約確定
        </button>
      </div>
      <Link id="home" to={"/"}></Link>
    </div>
  );
};
