import Amplify, { API, graphqlOperation } from "aws-amplify";
import { deleteReservation } from "../graphql/mutations";
import { listReserves } from "../graphql/queries";
import awsExports from "../aws-exports";
import { TypeOfReserve } from "../global";
import dayjs from "dayjs";

Amplify.configure(awsExports);

export const ReserveInfo = () => {
  async function fetchReservations() {
    try {
      const reservationData: any = await API.graphql(
        graphqlOperation(listReserves)
      );
      const reservations: [TypeOfReserve] =
        reservationData.data.listReservations.items;
      console.log("fetch", reservations);
      return reservations;
    } catch (err) {
      console.log("error fetching todos");
    }
  }

  async function delReservation(wantToDeleteReservation: TypeOfReserve) {
    try {
      if (
        !wantToDeleteReservation.date ||
        !wantToDeleteReservation.menu ||
        !wantToDeleteReservation.stylistId ||
        !wantToDeleteReservation.customerId
      ) {
        console.log("====deleteReservationできてないよ=====");
        console.log(
          "====wantToDeleteReservation.date=====",
          wantToDeleteReservation.date
        );
        console.log(
          "====wantToDeleteReservation.menuId=====",
          wantToDeleteReservation.menu
        );
        console.log(
          "====wantToDeleteReservation.stylistId=====",
          wantToDeleteReservation.stylistId
        );
        console.log(
          "====wantToDeleteReservation.customerId=====",
          wantToDeleteReservation.customerId
        );
        return;
      }
      console.log("====このデータ消します=====", wantToDeleteReservation);
      await API.graphql({
        query: deleteReservation,
        variables: { input: { id: wantToDeleteReservation.id } },
      });

      console.log("====このデータ消しました=====", wantToDeleteReservation);
    } catch (err) {
      console.log("error deleteReservation:", err);
    }
    alert("予約をキャンセルしました。");
    window.location.reload();
  }

  async function onClickCancelButton() {
    const result: boolean = window.confirm(`予約日をキャンセルしますか？`);
    if (result) {
      const wantToDel = await fetchReservations().then((res) =>
        res?.filter((reservation) => {
          console.log("====reservation.customerId====", reservation.customerId);
          return reservation.customerId === sessionStorage.getItem("user");
        })
      );
      console.log("====wantToDel====", wantToDel);
      if (wantToDel) {
        wantToDel.forEach((reservation) => delReservation(reservation));
      }
    }
  }

  return (
    <div id="reserveInfo">
      <h3 className="text-center">Reserve Information</h3>
      <table className="table table-dark table-bordered ">
        <tbody>
          <tr>
            <td className="text-center">予約日</td>
            <td className="text-center">
              {dayjs(sessionStorage.getItem("start")).format(
                "YY年MM月DD日\nHH時mm分"
              )}
            </td>
          </tr>
          <tr className="text-center">
            <td>メニュー</td>
            <td>{sessionStorage.getItem("menu")}</td>
          </tr>
          <tr className="text-center">
            <td>料金</td>
            <td>{sessionStorage.getItem("amountOfMoney")} 円</td>
          </tr>
        </tbody>
      </table>
      <div className="text-center">
        <button className="btn btn-danger" onClick={onClickCancelButton}>
          キャンセル
        </button>
      </div>
    </div>
  );
};
