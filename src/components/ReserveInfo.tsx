import "./css/ReserveInfo.css";
import { API, graphqlOperation } from "aws-amplify";
import { deleteReserve } from "../graphql/mutations";
import { listReserves, listShopmenus } from "../graphql/queries";
import { TypeOfReserve, TypeOfMenu } from "../global";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

export const ReserveInfo = () => {
  const [reserveInfo, setReserveInfo] = useState<TypeOfReserve>();
  const [menuInfo, setMenuInfo] = useState<TypeOfMenu>();

  useEffect(() => {
    fetch();
  }, []);

  async function fetch() {
    try {
      const listReservesGraphqlResult: any = await API.graphql(
        graphqlOperation(listReserves)
      );
      const arrayReserves: [TypeOfReserve] =
        listReservesGraphqlResult.data.listReserves.items;

      const myReserve = arrayReserves.find((element) => {
        return element.customerId === sessionStorage.getItem("user");
      });

      const listShopmenusGraphqlResult: any = await API.graphql(
        graphqlOperation(listShopmenus)
      );
      const arrayMenus: [TypeOfMenu] =
        listShopmenusGraphqlResult.data.listShopmenus.items;

      // const copyReserveInfo = JSON.parse(JSON.stringify(reserveInfo));
      setReserveInfo(myReserve);
      const resultObj = arrayMenus.find(
        (element) => element.menu === myReserve?.menu
      );

      setMenuInfo(resultObj);
    } catch (err) {
      console.log("error fetching todos");
    }
  }

  async function delReserve(delReserveObj: TypeOfReserve) {
    try {
      if (
        !delReserveObj.date ||
        !delReserveObj.menu ||
        !delReserveObj.stylistId ||
        !delReserveObj.customerId
      ) {
        console.log("====deleteReservationできてないよ=====");
        return;
      }
      console.log("====このデータ消します=====", delReserveObj);
      await API.graphql({
        query: deleteReserve,
        variables: { input: { id: delReserveObj.id } },
      });
      console.log("====このデータ消しました=====", delReserveObj);
    } catch (err) {
      console.log("error deleteReservation:", err);
    }
    alert("予約をキャンセルしました。");
    window.location.reload();
  }

  async function onClickCancelButton() {
    const result: boolean = window.confirm(`予約をキャンセルしますか？`);
    if (result) {
      const listReservesGraphqlResult: any = await API.graphql(
        graphqlOperation(listReserves)
      );
      const arrayReserves: [TypeOfReserve] =
        listReservesGraphqlResult.data.listReserves.items;

      const delReserves = arrayReserves.filter((reserveObj) => {
        console.log("====reservation.customerId====", reserveObj.customerId);
        return reserveObj.customerId === sessionStorage.getItem("user");
      });
      console.log("====wantToDel====", delReserves);
      if (delReserves) {
        delReserves.forEach((reserveObj) => delReserve(reserveObj));
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
              {dayjs(reserveInfo?.date).format("YY年MM月DD日\nHH時mm分")}
            </td>
          </tr>
          <tr className="text-center">
            <td>メニュー</td>
            <td>{reserveInfo?.menu}</td>
          </tr>
          <tr className="text-center">
            <td>料金</td>
            <td>{menuInfo?.amountOfMoney} 円</td>
          </tr>
        </tbody>
      </table>
      <div className="text-center">
        <label>
          ご予約ありがとうございます。
          <br />
          当日のご来店をお待ちしております。
        </label>
      </div>
      <div className="text-center">
        <button className="btn btn-danger" onClick={onClickCancelButton}>
          予約キャンセル
        </button>
      </div>
    </div>
  );
};
