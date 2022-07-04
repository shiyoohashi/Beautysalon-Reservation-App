import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { createReservation, deleteReservation } from "../graphql/mutations";
import { listReservations } from "../graphql/queries";
import awsExports from "../aws-exports";
import { TypeOfReserve } from "../global";
import { userInfo } from "os";
Amplify.configure(awsExports);

type Props = {
  user: any;
};

export const Home: React.FC<Props> = (Props) => {
  async function fetchReservations() {
    try {
      const reservationData: any = await API.graphql(
        graphqlOperation(listReservations)
      );
      const reservations: [TypeOfReserve] =
        reservationData.data.listReservations.items;
      console.log("fetch", reservations);
      // setReservations(reservations);
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
      // await API.graphql(
      //   graphqlOperation(deleteReservation, {
      //     input: { id: wantToDeleteReservation.id },
      //   })
      // );

      console.log("====このデータ消しました=====", wantToDeleteReservation);
    } catch (err) {
      console.log("error deleteReservation:", err);
    }
  }

  async function onClickCancelButton() {
    const result: boolean = window.confirm(`予約日をキャンセルしますか？`);
    if (result) {
      const wantToDel = await fetchReservations().then((res) =>
        res?.filter((reservation) => {
          console.log("====reservation.customerId====", reservation.customerId);
          return reservation.customerId === Props.user.attributes.name;
        })
      );
      console.log("====wantToDel====", wantToDel);
      if (wantToDel) {
        wantToDel.forEach((reservation) => delReservation(reservation));
        alert("予約をキャンセルしました。");
      }
    }
  }

  function onClickReserveButton() {
    const reserveLink: any = document.getElementById("reserve");
    reserveLink.click();
  }

  return (
    <div>
      <h1>ビューティー矢島へようこそ💓</h1>

      <br />
      <Link id="reserve" to="/menu"></Link>
      <button
        className="btn btn-primary btn-sm"
        onClick={() => onClickReserveButton()}
      >
        予約する
      </button>

      <button
        className="btn btn-secondary btn-sm"
        onClick={() => onClickCancelButton()}
      >
        予約をキャンセルする
      </button>
      <br />
      <img
        src="https://eiga.k-img.com/images/buzz/20943/yajima1-480_large.jpg"
        width="400"
        height="300"
        alt="フリー画像"
      />
      <br />
      {(() => {
        if (Props.user.attributes.name === "administrator") {
          return <Link to="/shopcalender">予約一覧</Link>;
        }
      })()}
    </div>
  );
};
