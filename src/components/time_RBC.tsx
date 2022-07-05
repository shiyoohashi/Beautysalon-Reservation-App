import { Link } from "react-router-dom";
import React from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { listReserves } from "../graphql/queries";
import { TypeOfReserveCalendar, TypeOfReserve, TypeOfMenu } from "../global";

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

type Props = {
  setReserves: (reserves: TypeOfReserve[]) => void;
  reserves: TypeOfReserve[];
};
const eventList: TypeOfReserveCalendar[] = [];

export const Time: React.FC<Props> = (Props) => {
  const selectedMenu: string | null = sessionStorage.getItem("menu");

  useEffect(() => {
    fetchReserves();
  }, []);

  async function fetchReserves() {
    try {
      const reserveData: any = await API.graphql(
        graphqlOperation(listReserves)
      );
      const reserves: TypeOfReserve[] = reserveData.data.listReservations.items;
      console.log("fetch", reserves);
      Props.setReserves(reserves);

      const nowDate: Date = new Date();

      let counter: number = 0;
      eventList.splice(0); //リスト消去しないと増えるので削除

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

          const selectMenu: any = shopMenu.find((menuObj) => {
            return menuObj.menu === selectedMenu;
          });

          const result = reserves.find((reserve) => {
            if (reserve.date === String(comparisonDate)) {
              if (selectMenu.treatmentTime / 30 === 2) {
                endTime += 30;
                i += 1;
              } else {
                endTime += 60;
                i += 2;
              }
              return true;
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
            if (selectedMenu === "角刈り") {
              startTime -= 30;
              startHour = Math.floor(startTime / 60);
              startMinute = startTime % 60;
              console.log("counter: ", counter);
              eventList.splice(counter - 1, 1);
            } else if (selectedMenu === "カット＋カラー") {
              startTime -= 30;
              startHour = Math.floor(startTime / 60);
              startMinute = startTime % 60;
              console.log("counter: ", counter);
              eventList.splice(counter - 1, 1);
            } else if (selectedMenu === "パーマ") {
              startTime -= 30;
              startHour = Math.floor(startTime / 60);
              startMinute = startTime % 60;
              console.log("消すやつcounter: ", counter - 1);
              eventList.splice(counter - 1, 1);
            } else if (selectedMenu === "縮毛矯正") {
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
    } catch (err) {
      console.log("error fetching todos");
    }
  }

  //ここまで
  function link(event: any) {
    if (event.title === "○") {
      sessionStorage.setItem("start", event.start);

      const link: any | null = document.getElementById("link");
      link.click();
    } else {
      alert("※すでに予約されています！");
    }
  }

  const localizer = momentLocalizer(moment);
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={eventList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 2800 }}
        defaultView={Views.WEEK}
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

      <Link id="link" to={"/menu/time/checkreserve"}></Link>
    </div>
  );
};
