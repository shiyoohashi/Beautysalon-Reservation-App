import { Link } from "react-router-dom";
import React from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { listReserves } from "../graphql/queries";
import { TypeOfReserveCalendar, TypeOfReserve, TypeOfMenu } from "../global";
import dayjs from "dayjs";

// const shopMenu: TypeOfMenu[] = [
//   { id: 1, menu: "角刈り", amountOfMoney: 10000, treatmentTime: 60 },
//   { id: 2, menu: "カット", amountOfMoney: 1000, treatmentTime: 30 },
//   {
//     id: 3,
//     menu: "カット＋カラー",
//     amountOfMoney: 20000,
//     treatmentTime: 60,
//   },
//   { id: 4, menu: "パーマ", amountOfMoney: 10000, treatmentTime: 60 },
//   { id: 5, menu: "縮毛矯正", amountOfMoney: 10000, treatmentTime: 90 },
// ];

type Props = {
  setReserves: (reserves: TypeOfReserve[]) => void;
  reserves: TypeOfReserve[];
};
const eventList: TypeOfReserveCalendar[] = [];

export const Time: React.FC<Props> = (Props) => {
  const [nowDate, setNowDate] = useState(new Date());
  const forCalenderDate = nowDate;
  //   const selectedMenu: string | null = sessionStorage.getItem("menu");

  //   useEffect(() => {
  //     fetchReserves();
  //   }, []);

  //   async function fetchReserves() {
  //     try {
  //       const reserveData: any = await API.graphql(
  //         graphqlOperation(listReserves)
  //       );
  //       const reserves: TypeOfReserve[] = reserveData.data.listReservations.items;
  //       console.log("fetch", reserves);
  //       Props.setReserves(reserves);

  //       const nowDate: Date = new Date();

  //       let counter: number = 0;
  //       eventList.splice(0); //リスト消去しないと増えるので削除

  //       for (let addDate = 1; addDate <= 90; addDate++) {
  //         const copyNowDate: Date = new Date(nowDate.getTime());
  //         new Date(copyNowDate.setDate(copyNowDate.getDate() + addDate));

  //         const year = copyNowDate.getFullYear();
  //         const month = copyNowDate.getMonth() + 1;
  //         const date = copyNowDate.getDate();
  //         const ttmmdd = `${year}-${month}-${date}`;

  //         let startTime: number = 540;
  //         let endTime: number = 540;
  //         for (let i = 1; i <= 20; i++) {
  //           let startHour: number = Math.floor(startTime / 60);
  //           let startMinute: number = startTime % 60;
  //           let strStartMinute: string = "";
  //           if (startMinute % 60 === 0) {
  //             strStartMinute = "00";
  //           } else {
  //             strStartMinute = "30";
  //           }

  //           const comparisonDate = new Date(
  //             `${ttmmdd}-${startHour}:${strStartMinute}`
  //           );

  //           const selectMenu: any = shopMenu.find((menuObj) => {
  //             return menuObj.menu === selectedMenu;
  //           });

  //           const result = reserves.find((reserve) => {
  //             if (reserve.date === String(comparisonDate)) {
  //               if (selectMenu.treatmentTime / 30 === 2) {
  //                 endTime += 30;
  //                 i += 1;
  //               } else {
  //                 endTime += 60;
  //                 i += 2;
  //               }
  //               return true;
  //             }
  //           });

  //           endTime += 30;
  //           let endHour: number = Math.floor(endTime / 60);
  //           let endMinute: number = endTime % 60;
  //           let strEndMinute: string = "00";
  //           if (endMinute % 60 === 0) {
  //             strEndMinute = "00";
  //           } else {
  //             strEndMinute = "30";
  //           }

  //           if (result === undefined) {
  //             eventList.push({
  //               title: "○",
  //               start: new Date(`${ttmmdd} ${startHour}:${strStartMinute}`),
  //               end: new Date(`${ttmmdd} ${endHour}:${strEndMinute}`),
  //               type: "true",
  //             });
  //           } else {
  //             if (selectedMenu === "角刈り") {
  //               startTime -= 30;
  //               startHour = Math.floor(startTime / 60);
  //               startMinute = startTime % 60;
  //               console.log("counter: ", counter);
  //               eventList.splice(counter - 1, 1);
  //             } else if (selectedMenu === "カット＋カラー") {
  //               startTime -= 30;
  //               startHour = Math.floor(startTime / 60);
  //               startMinute = startTime % 60;
  //               console.log("counter: ", counter);
  //               eventList.splice(counter - 1, 1);
  //             } else if (selectedMenu === "パーマ") {
  //               startTime -= 30;
  //               startHour = Math.floor(startTime / 60);
  //               startMinute = startTime % 60;
  //               console.log("消すやつcounter: ", counter - 1);
  //               eventList.splice(counter - 1, 1);
  //             } else if (selectedMenu === "縮毛矯正") {
  //               startTime -= 60;
  //               startHour = Math.floor(startTime / 60);
  //               startMinute = startTime % 60;
  //               console.log("counter: ", counter);
  //               eventList.splice(counter - 1, 1);
  //               eventList.splice(counter - 2, 1);
  //             }

  //             if (startMinute % 60 === 0) {
  //               strStartMinute = "00";
  //             } else {
  //               strStartMinute = "30";
  //             }

  //             eventList.push({
  //               title: "×",
  //               start: new Date(`${ttmmdd} ${startHour}:${strStartMinute}`),
  //               end: new Date(`${ttmmdd} ${endHour}:${strEndMinute}`),
  //               type: "false",
  //             });
  //           }
  //           startTime = endTime;
  //           counter++;
  //         }
  //       }
  //     } catch (err) {
  //       console.log("error fetching todos");
  //     }
  //   }

  //   //ここまで
  //   function link(event: any) {
  //     if (event.title === "○") {
  //       sessionStorage.setItem("start", event.start);

  //       const link: any | null = document.getElementById("link");
  //       link.click();
  //     } else {
  //       alert("※すでに予約されています！");
  //     }
  //   }

  function createDateAndDayOfWeek() {
    const listDay = ["日", "月", "火", "水", "木", "金", "土"];

    return listDay.map((_, index) => {
      const dayOfNumber: number = forCalenderDate.getDay();
      const tempDate = JSON.stringify(forCalenderDate.getDate());
      forCalenderDate.setDate(forCalenderDate.getDate() + 1);
      return (
        <td id={`dateAndDay${index}`} key={index}>
          {tempDate}
          <br />
          {`(${listDay[dayOfNumber]})`}
        </td>
      );
    });
  }

  const times = [
    "9:00",
    "9:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
  ];

  function createReservePropriety() {
    const marubatsu: any = [
      ["◯", "×", "◯", "◯", "◯", "◯", "◯"],
      ["◯", "◯", "◯", "◯", "◯", "◯", "◯"],
      ["◯", "◯", "◯", "◯", "◯", "◯", "◯"],
      ["◯", "◯", "◯", "◯", "◯", "◯", "◯"],
      ["◯", "◯", "◯", "◯", "◯", "◯", "◯"],
      ["◯", "◯", "◯", "◯", "◯", "◯", "◯"],
      ["◯", "◯", "◯", "◯", "◯", "◯", "◯"],
      ["◯", "◯", "◯", "◯", "◯", "◯", "◯"],
      ["◯", "◯", "◯", "◯", "◯", "◯", "◯"],
      ["◯", "◯", "◯", "◯", "◯", "◯", "◯"],
      ["◯", "◯", "◯", "◯", "◯", "◯", "◯"],
      ["◯", "◯", "◯", "◯", "◯", "◯", "◯"],
      ["◯", "◯", "◯", "◯", "◯", "◯", "◯"],
      ["◯", "◯", "◯", "◯", "◯", "◯", "◯"],
      ["◯", "◯", "◯", "◯", "◯", "◯", "◯"],
      ["◯", "◯", "◯", "◯", "◯", "◯", "◯"],
      ["◯", "◯", "◯", "◯", "◯", "◯", "◯"],
      ["◯", "◯", "◯", "◯", "◯", "◯", "◯"],
      ["◯", "◯", "◯", "◯", "◯", "◯", "◯"],
      ["◯", "◯", "◯", "◯", "◯", "◯", "◯"],
      ["◯", "◯", "◯", "◯", "◯", "◯", "◯"],
    ];

    const changeIdTime: any = {};
    for (let timeIndex = 0; timeIndex < 21; timeIndex++) {
      let initialTime = 9;

      const addHour = Math.floor(timeIndex / 2);
      let minute = "";
      if (timeIndex % 2 === 0) {
        minute = "00";
      } else {
        minute = "30";
      }
      for (let dayIndex = 0; dayIndex <= 6; dayIndex++) {
        changeIdTime[`${timeIndex}-${dayIndex}`] = `${dayIndex},${
          initialTime + addHour
        }:${minute}`;
      }
    }

    function onClickMarubaru(e: any) {
      // 選択したセルの位置を特定
      const tempSelected = changeIdTime[e.target.id];
      const [numberOfDay, time] = tempSelected.split(",");
      // 選択したセルの列の日付のテキストを取得
      const tempSelectedDate = document.getElementById(
        `dateAndDay${numberOfDay}`
      )!.innerText;
      // 取得した日付テキストから日にちを取り出す
      const [selectedDate] = tempSelectedDate.split("\n");
      // 年月を取得
      const yearMonth = document.getElementById("yearMonth")?.innerText;
      // 現在表示している週の一番最初の日のテキスト取得
      const tempLeftDate = document.getElementById("dateAndDay0")!.innerText;
      const [leftDate] = tempLeftDate.split("\n");
      // 現在表示している週の一番最後の日のテキスト取得
      const tempRightDate = document.getElementById("dateAndDay6")!.innerText;
      const [rightDate] = tempRightDate.split("\n");

      if (Number(leftDate) > Number(rightDate)) {
        if (Number(selectedDate) < 7) {
          const sliceYearMonth = yearMonth?.slice(0, -1);
          const [year, month] = sliceYearMonth!.split("年");
          console.log("year: ", year);
          console.log("Month: ", Number(month) + 1);
          console.log("selectedDate: ", selectedDate);
          console.log("time: ", time);
        } else {
          const sliceYearMonth = yearMonth?.slice(0, -1);
          const [year, month] = sliceYearMonth!.split("年");
          console.log("year: ", year);
          console.log("Month: ", Number(month));
          console.log("selectedDate: ", selectedDate);
          console.log("time: ", time);
        }
      } else {
        const sliceYearMonth = yearMonth?.slice(0, -1);
        const [year, month] = sliceYearMonth!.split("年");
        console.log("year: ", year);
        console.log("Month: ", Number(month));
        console.log("selectedDate: ", selectedDate);
        console.log("time: ", time);
      }

      /////////////
      //赤チョンに入れる
      /////////////
      const link: any | null = document.getElementById("link");
      link.click();
    }

    return times.map((time, index) => {
      return (
        <tr key={index}>
          <th scope="row">{time}</th>
          <td
            className="time-cells"
            onClick={(e) => onClickMarubaru(e)}
            id={`${index}-0`}
          >
            {marubatsu[index][0]}
          </td>
          <td
            className="time-cells"
            onClick={(e) => onClickMarubaru(e)}
            id={`${index}-1`}
          >
            {marubatsu[index][1]}
          </td>

          <td
            className="time-cells"
            onClick={(e) => onClickMarubaru(e)}
            id={`${index}-2`}
          >
            {marubatsu[index][2]}
          </td>
          <td
            className="time-cells"
            onClick={(e) => onClickMarubaru(e)}
            id={`${index}-3`}
          >
            {marubatsu[index][3]}
          </td>
          <td
            className="time-cells"
            onClick={(e) => onClickMarubaru(e)}
            id={`${index}-4`}
          >
            {marubatsu[index][4]}
          </td>
          <td
            className="time-cells"
            onClick={(e) => onClickMarubaru(e)}
            id={`${index}-5`}
          >
            {marubatsu[index][5]}
          </td>
          <td
            className="time-cells"
            onClick={(e) => onClickMarubaru(e)}
            id={`${index}-6`}
          >
            {marubatsu[index][6]}
          </td>
          <th scope="row">{time}</th>
        </tr>
      );
    });

    const reservePropriety: any = [];

    times.forEach((_, index) => {
      for (let i = 0; i < 7; i++) {
        reservePropriety.push(
          document.getElementById(`${i}-${index}`)?.innerText
        );
      }
    });
    console.log("reservePropriety: ", reservePropriety);
  }

  function onClickLastWeek() {
    setNowDate(new Date(nowDate.setDate(nowDate.getDate() - 14)));
  }
  function onClickNextWeek() {
    setNowDate(new Date(nowDate.setDate(nowDate.getDate())));
  }

  return (
    <div>
      <table className="table">
        <tbody>
          <tr>
            <th scope="row" rowSpan={2}>
              <button onClick={() => onClickLastWeek()}>前の週へ</button>
            </th>
            <th id="yearMonth" scope="col" colSpan={7}>
              {dayjs(nowDate).format("YY年MM月")}
            </th>
            <th scope="row" rowSpan={2}>
              <button onClick={() => onClickNextWeek()}>次の週へ</button>
            </th>
          </tr>
          <tr>{createDateAndDayOfWeek()}</tr>

          {createReservePropriety()}
        </tbody>
      </table>
      <Link id="link" to={"/menu/time/checkreserve"}></Link>
    </div>
  );
};
