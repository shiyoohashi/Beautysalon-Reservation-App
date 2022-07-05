import { Link } from "react-router-dom";
import { TypeOfReserve } from "../global";
import { API, graphqlOperation } from "aws-amplify";
import { createReservation } from "../graphql/mutations";
import dayjs from "dayjs";

export const CheckReserve = () => {
  // const location = useLocation();
  // const { reservations } = location.state as State;

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

  function eventOnClick() {
    const reserve: TypeOfReserve = {
      date: sessionStorage.getItem("start")!,
      menu: sessionStorage.getItem("menu")!,
      stylistId: 2,
      customerId: sessionStorage.getItem("user")!,
    };

    addReservation(reserve);

    alert(`予約が完了しました。`);

    const homeLink: any | null = document.getElementById("home");
    homeLink.click();
  }

  return (
    <>
      <h3>予約内容確認</h3>
      <table className="table table-dark table-bordered ">
        <tbody>
          <tr>
            <td>予約日</td>
            <td>
              {dayjs(sessionStorage.getItem("start")).format(
                "YY年MM月DD日\nHH時mm分"
              )}
            </td>
          </tr>
          <tr>
            <td>メニュー</td>
            <td>{sessionStorage.getItem("menu")}</td>
          </tr>
          <tr>
            <td>料金</td>
            <td>{sessionStorage.getItem("amountOfMoney")} 円</td>
          </tr>
        </tbody>
      </table>
      <button className="btn btn-success" onClick={eventOnClick}>
        予約確定
      </button>
      <Link id="home" to={"/"}></Link>
    </>
  );
};
