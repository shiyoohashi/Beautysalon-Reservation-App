import React, { Component } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { useState, useEffect } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { createReservation } from "../graphql/mutations";
import { listReservations } from "../graphql/queries";
import awsExports from "../aws-exports";
import { TypeOfShopCalendar, reservation, TypeOfMenu } from "../global";

const localizer = momentLocalizer(moment);
const eventList: TypeOfShopCalendar[] = [];

type Props = {
  userName: string;
};

export const ShopCalendar: React.FC<Props> = (Props) => {
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
            title: `${Props.userName}様 ${element.menu}`,
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

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={eventList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};
