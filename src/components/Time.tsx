import { Link } from "react-router-dom";
import React from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { listReserves } from "../graphql/queries";
import { TypeOfReserveCalendar, TypeOfReserve, TypeOfMenu } from "../global";
import dayjs from "dayjs";

type Props = {
  setReserves: (reserves: TypeOfReserve[]) => void;
  reserves: TypeOfReserve[];
};
const eventList: TypeOfReserveCalendar[] = [];

export const Time: React.FC<Props> = (Props) => {
  const [nowDate, setNowDate] = useState(new Date());

  const initialMarubatsu: any = [
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
    ["◯", "◯", "◯", "◯", "◯", "◯", "◯"],
  ];

  const [marubatsu, setMarubatsu] = useState(initialMarubatsu);
  const forCalenderDate = new Date(nowDate);

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
      changeReservePropriety(reserves);
    } catch (err) {
      console.log("error fetching todos");
    }
  }

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

  function compairDate(col: number, row: number): Date {
    const marubatsuDate = new Date(nowDate);
    marubatsuDate.setHours(9);
    marubatsuDate.setMinutes(0);
    marubatsuDate.setSeconds(0);
    marubatsuDate.setMilliseconds(0);
    console.log("marubatsuDate", marubatsuDate);
    marubatsuDate.setDate(marubatsuDate.getDate() + col);
    marubatsuDate.setMinutes(marubatsuDate.getMinutes() + 30 * row);
    return marubatsuDate;
  }

  const menu_treatmentTime: any = {
    角刈り: 30,
    カット: 0,
    "カット＋カラー": 30,
    パーマ: 30,
    縮毛矯正: 60,
  };

  function changeReservePropriety(reserves: any) {
    let result: any = JSON.parse(JSON.stringify(initialMarubatsu));

    for (let row = 0; row < 21; row++) {
      for (let col = 0; col < 7; col++) {
        console.log("reserves", reserves);
        console.log(
          "compairDate(col, row).getTime() : ",
          compairDate(col, row).getTime()
        );
        console.log(
          "new Date(reserves[0].date).getTime(): ",
          new Date(reserves[0].date).getTime()
        );

        reserves.forEach((reserve: any) => {
          if (
            new Date(reserve.date).setMinutes(
              new Date(reserve.date).getMinutes() -
                menu_treatmentTime[sessionStorage.getItem("menu")!]
            ) <= compairDate(col, row).getTime() &&
            compairDate(col, row).getTime() <
              new Date(reserve.date).setMinutes(
                new Date(reserve.date).getMinutes() +
                  menu_treatmentTime[reserve.menu] +
                  30
              )
          ) {
            console.log("eriko");
            if ((result[row][col] = "◯")) {
              result[row][col] = "✖️";
            }
          }
        });
      }
    }
    setMarubatsu(result);
    console.log("result: ", result);
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
    console.log("nankai");
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
  }

  function onClickMarubaru(e: any) {
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
        const saveDate: Date = new Date(
          `20${year}-${Number(month) + 1}-${selectedDate} ${time}`
        );
        sessionStorage.setItem("start", String(saveDate));
      } else {
        const sliceYearMonth = yearMonth?.slice(0, -1);
        const [year, month] = sliceYearMonth!.split("年");
        const saveDate: Date = new Date(
          `20${year}-${month}-${selectedDate} ${time}`
        );
        sessionStorage.setItem("start", String(saveDate));
      }
    } else {
      const sliceYearMonth = yearMonth?.slice(0, -1);
      const [year, month] = sliceYearMonth!.split("年");
      const saveDate: Date = new Date(
        `20${year}-${month}-${selectedDate} ${time}`
      );
      sessionStorage.setItem("start", String(saveDate));
    }

    const link: any | null = document.getElementById("link");
    link.click();
  }

  function onClickLastWeek() {
    setNowDate(new Date(nowDate.setDate(nowDate.getDate() - 7)));
    fetchReserves();
    console.log("nowDate: ", nowDate);
  }
  function onClickNextWeek() {
    setNowDate(new Date(nowDate.setDate(nowDate.getDate() + 7)));
    fetchReserves();
  }

  return (
    <div>
      <table className="table">
        <tbody>
          <tr>
            <th scope="row" rowSpan={2}>
              {(() => {
                if (
                  dayjs(nowDate).format("YYYYMMDD") ===
                  dayjs(new Date()).format("YYYYMMDD")
                ) {
                  return <></>;
                } else {
                  return (
                    <button onClick={() => onClickLastWeek()}>前の週へ</button>
                  );
                }
              })()}
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
