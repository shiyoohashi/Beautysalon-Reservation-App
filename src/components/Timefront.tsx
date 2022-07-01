import { Link } from "react-router-dom";
import React from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { useState, useEffect } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { createReservation } from "../graphql/mutations";
import { listReservations } from "../graphql/queries";
import awsExports from "../aws-exports";
import {
  TypeOfReserveCalendar,
  TypeOfReserve,
  TypeOfMenu,
  reservation,
} from "../global";
Amplify.configure(awsExports);

type Props = {
  menu: string;
  setReserve: (typeOfReserve: TypeOfReserve[]) => void;
  reserve: TypeOfReserve[];
  setTime: (date: Date) => void;
  userName: string;
};

export const Time: React.FC<Props> = (Props) => {
  //ここから
  console.log("=====Props=====", Props);

  // const [formState, setFormState] = useState(initialState);
  const [reservations, setReservations] = useState<reservation[]>([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  // function setInput(key: any, value: any) {
  //   setFormState({ ...formState, [key]: value });
  // }

  async function fetchReservations() {
    try {
      const reservationData: any = await API.graphql(
        graphqlOperation(listReservations)
      );
      const reservations: [reservation] =
        reservationData.data.listReservations.items;
      console.log("fetch", reservations);
      setReservations(reservations);
    } catch (err) {
      console.log("error fetching todos");
    }
  }

  async function addTodo(reservation: reservation) {
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
      // const todo: any = { ...formState };
      // console.log(todo);
      // setReservations([...todos, todo]);
      // setFormState(initialState);
      await API.graphql(
        graphqlOperation(createReservation, { input: reservation })
      );
    } catch (err) {
      console.log("error creating reservation:", err);
    }
  }
  //ここまで

  const localizer = momentLocalizer(moment);
  const eventList: TypeOfReserveCalendar[] = [];

  const nowDate: Date = new Date();

  let counter: number = 0;
  for (let addDate = 1; addDate <= 90; addDate++) {
    const copyNowDate: Date = new Date(nowDate.getTime());
    new Date(copyNowDate.setDate(copyNowDate.getDate() + addDate));

    const year = copyNowDate.getFullYear();
    const month = copyNowDate.getMonth() + 1;
    const date = copyNowDate.getDate();
    const ttmmdd = `${year}-${month}-${date}`;

    let startTime: number = 540;
    let endTime: number = 540;
    for (let i = 1; i <= 20; i++) {
      let startHour: number = Math.floor(startTime / 60);
      let startMinute: number = startTime % 60;
      let strStartMinute: string = "";
      if (startMinute % 60 === 0) {
        strStartMinute = "00";
      } else {
        strStartMinute = "30";
      }

      const comparisonDate = new Date(
        `${ttmmdd}-${startHour}:${strStartMinute}`
      );

      const result = Props.reserve.find((obj) => {
        if (JSON.stringify(obj.date) === JSON.stringify(comparisonDate)) {
          if (obj.treatmentTime / 30 === 1) {
            return true;
          } else if (obj.treatmentTime / 30 === 2) {
            endTime += 30;
            i += 1;
            return true;
          } else {
            endTime += 60;
            i += 2;
            return true;
          }
        }
      });

      endTime += 30;
      let endHour: number = Math.floor(endTime / 60);
      let endMinute: number = endTime % 60;
      let strEndMinute: string = "00";
      if (endMinute % 60 === 0) {
        strEndMinute = "00";
      } else {
        strEndMinute = "30";
      }

      if (result === undefined) {
        eventList.push({
          title: "○",
          start: new Date(`${ttmmdd} ${startHour}:${strStartMinute}`),
          end: new Date(`${ttmmdd} ${endHour}:${strEndMinute}`),
          type: "true",
        });
      } else {
        if (Props.menu === "角刈り") {
          startTime -= 30;
          startHour = Math.floor(startTime / 60);
          startMinute = startTime % 60;
          console.log("counter: ", counter);
          eventList.splice(counter - 1, 1);
        } else if (Props.menu === "カット＋カラー") {
          startTime -= 30;
          startHour = Math.floor(startTime / 60);
          startMinute = startTime % 60;
          console.log("counter: ", counter);
          eventList.splice(counter - 1, 1);
        } else if (Props.menu === "パーマ") {
          startTime -= 30;
          startHour = Math.floor(startTime / 60);
          startMinute = startTime % 60;
          console.log("消すやつcounter: ", counter - 1);
          eventList.splice(counter - 1, 1);
        } else if (Props.menu === "縮毛矯正") {
          startTime -= 60;
          startHour = Math.floor(startTime / 60);
          startMinute = startTime % 60;
          console.log("counter: ", counter);
          eventList.splice(counter - 1, 1);
          eventList.splice(counter - 2, 1);
        }

        if (startMinute % 60 === 0) {
          strStartMinute = "00";
        } else {
          strStartMinute = "30";
        }

        eventList.push({
          title: "×",
          start: new Date(`${ttmmdd} ${startHour}:${strStartMinute}`),
          end: new Date(`${ttmmdd} ${endHour}:${strEndMinute}`),
          type: "false",
        });
      }
      startTime = endTime;
      counter++;
    }
  }

  function link(event: any) {
    const link: any | null = document.getElementById("link");
    alert("予約完了");

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

    const reservation: reservation = {
      date: event.start,
      menu: Props.menu,
      stylistId: 2,
      customerId: Props.userName,
    };

    const registerDB: TypeOfReserve[] = [...Props.reserve, registerObj];
    Props.setReserve(registerDB);
    addTodo(reservation);
    link.click();
  }

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={eventList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 2800 }}
        defaultView={Views.WEEK}
        // defaultDate={"2022-06-29 17:00"}
        onSelectEvent={(event) => link(event)}
        timeslots={2}
        views={["week", "day"]}
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
