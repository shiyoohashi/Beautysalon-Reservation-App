import "./css/Time.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { listReserves, listShopmenus, listHolidays } from "../graphql/queries";
import { TypeOfReserve, TypeOfMenu, TypeOfHoliday } from "../global";
import dayjs from "dayjs";

export const Time = () => {
  const [nowDate, setNowDate] = useState(new Date());

  const initialMarubatsu: String[][] = [
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
      const reserves: TypeOfReserve[] = reserveData.data.listReserves.items;
      console.log("fetch", reserves);
      changeReservePropriety(reserves);
    } catch (err) {
      console.log("error fetching todos");
    }
  }

  async function fetchHolydays() {
    try {
      const graphqlData: any = await API.graphql(
        graphqlOperation(listHolidays)
      );
      const holidays: [TypeOfHoliday] = graphqlData.data.listHolidays.items;
      console.log("holiday fetch", holidays);
      return holidays;
    } catch (err) {
      console.log("error fetchHolydays", err);
    }
  }

  function createDateAndDayOfWeek() {
    const listDay = ["日", "月", "火", "水", "木", "金", "土"];

    return listDay.map((_, index) => {
      const dayOfNumber: number = forCalenderDate.getDay();
      const tempDate = JSON.stringify(forCalenderDate.getDate());
      forCalenderDate.setDate(forCalenderDate.getDate() + 1);

      return (
        <td className="table-font" id={`dateAndDay${index}`} key={index}>
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
    marubatsuDate.setDate(marubatsuDate.getDate() + col);
    marubatsuDate.setMinutes(marubatsuDate.getMinutes() + 30 * row);
    return marubatsuDate;
  }

  const maru = "◯";
  const batsu = "✖️";

  async function changeReservePropriety(reserves: TypeOfReserve[]) {
    let result: [string[]] = JSON.parse(JSON.stringify(initialMarubatsu));
    let selectedMenuObj: TypeOfMenu = {
      id: 0,
      menu: "error",
      detail: "error",
      amountOfMoney: 0,
      treatmentTime: 0,
    };
    let arrayOfShopMenuObj: TypeOfMenu[];

    try {
      const graphqlListShopmenus: any = await API.graphql(
        graphqlOperation(listShopmenus)
      );
      arrayOfShopMenuObj = graphqlListShopmenus.data.listShopmenus.items;
      console.log("arrayOfShopMenuObj-fetch", arrayOfShopMenuObj);
      const result: TypeOfMenu | undefined = arrayOfShopMenuObj.find(
        (menuObj) => {
          return menuObj.menu === sessionStorage.getItem("menu");
        }
      );
      if (result) {
        selectedMenuObj = result;
      }
    } catch (err) {
      console.log("error arrayOfShopMenuObj-fetching todos", err);
    }

    for (let row = 0; row < 21; row++) {
      for (let col = 0; col < 7; col++) {
        reserves.forEach((reserve: TypeOfReserve) => {
          let reserveMenuObj: TypeOfMenu = {
            id: 0,
            menu: "error",
            detail: "error",
            amountOfMoney: 0,
            treatmentTime: 0,
          };

          const tempReserveMenuObj = arrayOfShopMenuObj.find((shpoMenuObj) => {
            return shpoMenuObj.menu === reserve.menu;
          });
          if (tempReserveMenuObj) {
            reserveMenuObj = tempReserveMenuObj;
          }

          if (
            new Date(reserve.date).setMinutes(
              new Date(reserve.date).getMinutes() -
                (selectedMenuObj.treatmentTime - 30)
            ) <= compairDate(col, row).getTime() &&
            compairDate(col, row).getTime() <
              new Date(reserve.date).setMinutes(
                new Date(reserve.date).getMinutes() +
                  reserveMenuObj.treatmentTime
              )
          ) {
            if ((result[row][col] = maru)) {
              result[row][col] = batsu;
            }
          }
        });
      }
    }

    const nowDate: string = dayjs(new Date()).format("DD");
    const nowMonth: string = dayjs(new Date()).format("MM");
    // 月を取得
    const yearMonth = document.getElementById("yearMonth")?.innerText;
    const sliceYearMonth = yearMonth?.slice(0, -1);
    const [year, month] = sliceYearMonth!.split("年");
    // 日を取得
    const tempLeftDate = document.getElementById("dateAndDay0")!.innerText;
    const [leftDate] = tempLeftDate.split("\n");
    if (nowDate === leftDate && nowMonth === month) {
      for (let i: number = 0; i < 21; i++) {
        result[i][0] = "TEL";
      }
    }

    // 定休日をDBから持ってきて、その日は全て「休」表示とする
    const holidays: TypeOfHoliday[] | undefined = await fetchHolydays();
    const dayCounter: Date = new Date(`20${year}/${month}/${leftDate}`);
    for (let col = 0; col < 7; col++) {
      console.log("dayCounter: ", dayCounter);
      const duplicateHoliday = holidays?.find(
        (holidayObj) =>
          dayjs(holidayObj.date).format("YYYY/MM/DD") ===
          dayjs(dayCounter).format("YYYY/MM/DD")
      );
      if (duplicateHoliday) {
        for (let row = 0; row < 21; row++) {
          result[row][col] = "休";
        }
      }
      dayCounter.setDate(dayCounter.getDate() + 1);
    }
    setMarubatsu(result);
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
    return times.map((time, index) => {
      return (
        <tr key={index}>
          <th scope="row">{time}</th>
          <td
            className="time-cells"
            onClick={(e) => onClickMarubatsu(e)}
            id={`${index}-0`}
          >
            {marubatsu[index][0]}
          </td>
          <td
            className="time-cells"
            onClick={(e) => onClickMarubatsu(e)}
            id={`${index}-1`}
          >
            {marubatsu[index][1]}
          </td>

          <td
            className="time-cells"
            onClick={(e) => onClickMarubatsu(e)}
            id={`${index}-2`}
          >
            {marubatsu[index][2]}
          </td>
          <td
            className="time-cells"
            onClick={(e) => onClickMarubatsu(e)}
            id={`${index}-3`}
          >
            {marubatsu[index][3]}
          </td>
          <td
            className="time-cells"
            onClick={(e) => onClickMarubatsu(e)}
            id={`${index}-4`}
          >
            {marubatsu[index][4]}
          </td>
          <td
            className="time-cells"
            onClick={(e) => onClickMarubatsu(e)}
            id={`${index}-5`}
          >
            {marubatsu[index][5]}
          </td>
          <td
            className="time-cells"
            onClick={(e) => onClickMarubatsu(e)}
            id={`${index}-6`}
          >
            {marubatsu[index][6]}
          </td>
          <th scope="row">{time}</th>
        </tr>
      );
    });
  }

  function onClickMarubatsu(e: any) {
    if (document.getElementById(e.target.id)?.innerText === maru) {
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
            `20${year}/${Number(month) + 1}/${selectedDate} ${time}`
          );
          sessionStorage.setItem("start", String(saveDate));
        } else {
          const sliceYearMonth = yearMonth?.slice(0, -1);
          const [year, month] = sliceYearMonth!.split("年");
          const saveDate: Date = new Date(
            `20${year}/${month}/${selectedDate} ${time}`
          );
          sessionStorage.setItem("start", String(saveDate));
        }
      } else {
        const sliceYearMonth = yearMonth?.slice(0, -1);
        const [year, month] = sliceYearMonth!.split("年");
        const saveDate: Date = new Date(
          `20${year}/${month}/${selectedDate} ${time}`
        );
        sessionStorage.setItem("start", String(saveDate));
      }

      const link: HTMLElement | null = document.getElementById("link");
      if (link) {
        link.click();
      }
    }
  }

  function onClickPreviousWeek() {
    setNowDate(new Date(nowDate.setDate(nowDate.getDate() - 7)));
    fetchReserves();
    console.log("nowDate: ", nowDate);
  }
  function onClickNextWeek() {
    setNowDate(new Date(nowDate.setDate(nowDate.getDate() + 7)));
    fetchReserves();
  }

  function returnPreviousWeekTh() {
    if (
      dayjs(nowDate).format("YYYYMMDD") === dayjs(new Date()).format("YYYYMMDD")
    ) {
      return <th scope="row" rowSpan={2}></th>;
    } else {
      return (
        <th
          className="week-button"
          onClick={() => onClickPreviousWeek()}
          scope="row"
          rowSpan={2}
        >
          ◀︎◀︎
        </th>
      );
    }
  }

  return (
    <div id="time">
      <table className="table table-bordered text-center table-font-color">
        <tbody>
          <tr>
            {returnPreviousWeekTh()}
            <th id="yearMonth" scope="col" colSpan={7}>
              {dayjs(nowDate).format("YY年MM月")}
            </th>
            <th
              className="week-button"
              onClick={() => onClickNextWeek()}
              scope="row"
              rowSpan={2}
            >
              ▶︎▶︎
            </th>
          </tr>
          <tr>{createDateAndDayOfWeek()}</tr>

          {createReservePropriety()}
        </tbody>
      </table>
      <Link id="link" to={"checkreserve/"}></Link>
    </div>
  );
};
