import { Link } from "react-router-dom";
import React from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";

import { TypeOfReserveCalendar, TypeOfReserve, TypeOfMenu } from "../global";

type Props = {
  menu: string | null;
  setReserve: (typeOfReserve: TypeOfReserve[]) => void;
  reserve: TypeOfReserve[];
  setTime: (date: Date) => void;
};

export const Time: React.FC<Props> = (Props) => {
  const localizer = momentLocalizer(moment);
  const eventList: TypeOfReserveCalendar[] = [];

  const nowDate: Date = new Date();
  for (let addDay = 1; addDay <= 90; addDay++) {
    const copyNowDate: Date = new Date(nowDate.getTime());
    new Date(copyNowDate.setDate(copyNowDate.getDate() + addDay));

    const year = copyNowDate.getFullYear();
    const month = copyNowDate.getMonth() + 1;
    const date = copyNowDate.getDate();
    const ttmmdd = `${year}-${month}-${date}`;

    for (let i = 9; i <= 19; i++) {
      // date: Date;
      // menu: string | null;
      // amountOfMoney: number;
      // treatmentTime: number;
      // stylistName: string;
      // customerName: string;

      const comparisonDate = new Date(`${ttmmdd}-${i}:00`);
      console.log("comparisonDate: ", comparisonDate);

      const result = Props.reserve.find((obj) => {
        return JSON.stringify(obj.date) === JSON.stringify(comparisonDate);
      });

      if (result === undefined) {
        eventList.push({
          title: "予約可能",
          start: new Date(`${ttmmdd} ${i}:00`),
          end: new Date(`${ttmmdd} ${i}:30`),
          type: "true",
        });
        eventList.push({
          title: "予約可能",
          start: new Date(`${ttmmdd} ${i}:30`),
          end: new Date(`${ttmmdd} ${i + 1}:00`),
          type: "true",
        });
      } else {
        eventList.push({
          title: "予約不可",
          start: new Date(`${ttmmdd} ${i}:00`),
          end: new Date(`${ttmmdd} ${i}:30`),
          type: "false",
        });
        eventList.push({
          title: "予約不可",
          start: new Date(`${ttmmdd} ${i}:30`),
          end: new Date(`${ttmmdd} ${i + 1}:00`),
          type: "false",
        });
      }
    }
  }

  function link(event: any) {
    const link: any | null = document.getElementById("link");
    alert("予約完了");

    const shopMenu: TypeOfMenu[] = [
      { menu: "角刈り", amountOfMoney: 10000, treatmentTime: 60 },
      { menu: "カット", amountOfMoney: 1000, treatmentTime: 30 },
      { menu: "カット＋カラー", amountOfMoney: 20000, treatmentTime: 60 },
      { menu: "パーマ", amountOfMoney: 10000, treatmentTime: 60 },
      { menu: "縮毛矯正", amountOfMoney: 10000, treatmentTime: 90 },
    ];

    const selectMenu: any = shopMenu.find((hairMenu) => {
      return hairMenu.menu === Props.menu;
    });

    const registerObj: TypeOfReserve = {
      date: event.start,
      menu: selectMenu.menu,
      amountOfMoney: selectMenu.amountOfMoney,
      treatmentTime: selectMenu.treatmentTime,
      stylistName: "スタイリストまさし",
      customerName: "お客まさし",
    };
    const registerDB: TypeOfReserve[] = [...Props.reserve, registerObj];
    Props.setReserve(registerDB);
    link.click();
  }

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={eventList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        defaultView={Views.WEEK}
        // defaultDate={"2022-06-29 17:00"}
        onSelectEvent={(event) => link(event)}
        timeslots={2}
        views={["week"]}
        eventPropGetter={({ type }) => {
          switch (type) {
            case "true":
              return { style: { backgroundColor: "green" } };
            case "false":
              return { style: { backgroundColor: "red" } };
          }
          return {};
        }}
        resourceTitleAccessor="start"
      />
      <Link id="link" to={"/"}></Link>
    </div>
  );
};
