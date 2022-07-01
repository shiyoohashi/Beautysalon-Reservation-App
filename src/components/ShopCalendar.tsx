import React, { Component } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { useState, useEffect } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { deleteReservation } from "../graphql/mutations";
import { listReservations } from "../graphql/queries";
import awsExports from "../aws-exports";
import { TypeOfShopCalendar, reservation, TypeOfMenu } from "../global";
Amplify.configure(awsExports);

const localizer = momentLocalizer(moment);
const eventList: TypeOfShopCalendar[] = [];

type Props = {
  userName: string;
};

export const ShopCalendar: React.FC<Props> = (Props) => {
  async function delReservation(wantToDeleteReservation: reservation) {
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

  async function deleteAllReservation() {
    reservations.forEach((reservation: reservation) => {
      delReservation(reservation);
    });
  }

  const [reservations, setReservations] = useState<reservation[]>([]);
  useEffect(() => {
    fetchReservations();
  }, []);

  async function fetchReservations() {
    try {
      const reservationData: any = await API.graphql(
        graphqlOperation(listReservations)
      );
      const reservations: [reservation] =
        reservationData.data.listReservations.items;
      console.log("fetch", reservations);
      setReservations(reservations);

      const shopMenu: TypeOfMenu[] = [
        { id: 1, menu: "角刈り", amountOfMoney: 10000, treatmentTime: 60 },
        { id: 2, menu: "カット", amountOfMoney: 1000, treatmentTime: 30 },
        {
          id: 3,
          menu: "カット＋カラー",
          amountOfMoney: 20000,
          treatmentTime: 60,
        },
        { id: 4, menu: "パーマ", amountOfMoney: 10000, treatmentTime: 60 },
        { id: 5, menu: "縮毛矯正", amountOfMoney: 10000, treatmentTime: 90 },
      ];

      eventList.splice(0); //リスト消去しないと増えるので削除
      reservations.forEach((element, index) => {
        const selectMenu: any = shopMenu.find((MenuObj) => {
          return MenuObj.menu === element.menu;
        });

        const elementDate: Date = new Date(element.date);
        const year = elementDate.getFullYear();
        const month = elementDate.getMonth() + 1;
        const date = elementDate.getDate();
        const hour = elementDate.getHours();
        const minute = elementDate.getMinutes();
        const ttmmddhhmm = `${year}-${month}-${date} ${hour}:${minute}`;

        const endDate: Date = new Date(element.date);

        if (selectMenu !== undefined) {
          const pushObj = {
            id: index,
            title: `${element.customerId}様 ${element.menu}`,
            allDay: false,
            start: new Date(ttmmddhhmm),
            end: new Date(
              endDate.setMinutes(
                endDate.getMinutes() + selectMenu.treatmentTime
              )
            ),
          };
          eventList.push(pushObj);
        }
      });
    } catch (err) {
      console.log("error fetching todos");
    }
  }

  function onClickEvent(event: any) {
    console.log(event);
    alert(`${event.title}\n来店時間：${event.start}\n退店時間：${event.end}`);
  }

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={eventList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 2000 }}
        defaultView={Views.WEEK}
        onSelectEvent={(event) => onClickEvent(event)}
      />
      <input
        type="button"
        value={"全ての予約を消去する"}
        onClick={() => deleteAllReservation()}
      />
    </div>
  );
};
