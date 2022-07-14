import { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { listHolidays } from "../graphql/queries";
import { TypeOfHoliday } from "../global";
import { createHoliday, deleteHoliday } from "../graphql/mutations";
import dayjs from "dayjs";
import "./css/Holidays.css";

export const Holidays = () => {
  const [holidays, setHolidays] = useState<string[]>();
  const [holidayElements, setHolidayElements] = useState<JSX.Element[]>();
  const [calendar, setCalendar] = useState("");
  const [day, setDay] = useState<string[]>([]);
  let arrayHolidays: string[] = [];

  useEffect(() => {
    indicateHoliday();
  }, []);

  const onChangeCheckBox = (e: any) => {
    let defaultValue: string = e.target.defaultValue;
    if (day.includes(defaultValue)) {
      setDay(day.filter((item: any) => item !== e.target.defaultValue));
    } else {
      setDay([...day, e.target.defaultValue]);
    }
  };

  async function fetchHolydays() {
    try {
      const graphqlData: any = await API.graphql(
        graphqlOperation(listHolidays)
      );
      const holidays: [TypeOfHoliday] = graphqlData.data.listHolidays.items;
      console.log("holiday fetch", holidays);
      setHolidays(holidays.map((holiday) => holiday.date));
      return holidays;
    } catch (err) {
      console.log("error fetchHolydays", err);
    }
  }

  async function indicateHoliday() {
    const getFetchHolidays: any = await fetchHolydays();
    let elementDate: Date;
    let year: number;
    let month: number;
    let date: number;
    let ttmmdd: string;
    // 文字列の日付の配列にする
    arrayHolidays = getFetchHolidays.map((holidayObj: any, index: number) => {
      elementDate = new Date(holidayObj.date);
      year = elementDate.getFullYear();
      month = elementDate.getMonth() + 1;
      date = elementDate.getDate();
      let dateString: string = "";
      let monthString: string = "";
      date < 10 ? (dateString = "0" + date) : (dateString = String(date));
      month < 10 ? (monthString = "0" + month) : (monthString = String(month));
      ttmmdd = `${year}-${monthString}-${dateString}`;
      return ttmmdd;
    });
    // 配列を並び替える
    arrayHolidays.sort(function (a: string, b: string) {
      return a > b ? 1 : -1;
    });
    // 表示する休日要素を作成
    const holidayCalendarElements: JSX.Element[] = arrayHolidays.map(
      (holiday: string, index: number) => {
        return (
          <>
            <label key={index} htmlFor={"String(index)"}>
              {holiday}
            </label>
            <br></br>
          </>
        );
      }
    );
    setHolidayElements(holidayCalendarElements);
  }

  function setAddHoliday() {
    const holidayObj: TypeOfHoliday = {
      date: calendar,
    };
    {
      // 選択した日と同じ日付が既に休日として入っているか確認
      const duplicateHoliday = holidays?.filter((holiday) => {
        return holiday === calendar;
      });
      if (duplicateHoliday) {
        window.alert("既に休日予定です。");
      } else {
        addHoliday(holidayObj);
        setTimeout(() => window.location.reload(), 500);
      }
    }
  }

  async function addHoliday(holidayObj: TypeOfHoliday) {
    try {
      await API.graphql(graphqlOperation(createHoliday, { input: holidayObj }));
    } catch (err) {
      console.log("error addHoliday:", err);
    }
  }

  async function onClickCancelButton() {
    const duplicateHoliday = holidays?.find((holiday) => {
      return (
        dayjs(holiday).format("YYYY年MM月DD日") ===
        dayjs(calendar).format("YYYY年MM月DD日")
      );
    });
    if (duplicateHoliday) {
      const arrayHoliday = await fetchHolydays();
      // 選択した日付と一致する日付のあるオブジェクト取得
      const canncelHolidayObj = arrayHoliday!.find(
        (holidayObj: TypeOfHoliday) =>
          dayjs(holidayObj.date).format("YYYY年MM月DD日") ===
          dayjs(calendar).format("YYYY年MM月DD日")
      );
      delHoliday(canncelHolidayObj!);
    } else {
      window.alert("指定した日付は登録されていません");
    }
  }

  async function delHoliday(wantToDeleteReservation: TypeOfHoliday) {
    try {
      await API.graphql({
        query: deleteHoliday,
        variables: { input: { id: wantToDeleteReservation.id } },
      });
      alert("休日予定を削除しました。");
      setTimeout(() => window.location.reload(), 500);
    } catch (err) {
      console.log("error deleteReservation:", err);
    }
  }

  function weekHoliday(num: number) {
    const oneYearDate: string[] = [];
    for (let i = 0; i < num; i++) {
      let today = new Date();
      today.setDate(today.getDate() + i);
      oneYearDate.push(String(today));
    }
    const getFillterDate = oneYearDate.filter((date) => {
      return date.indexOf(day[0]) !== -1;
    });
    getFillterDate.map((ele) => {
      const reserveTest: any = {
        date: ele,
      };
      addHoliday(reserveTest);
    });
    setTimeout(() => window.location.reload(), 500);
  }
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <h2>臨時定休日</h2>
      {holidayElements}
      <input
        type="date"
        onChange={(e: any) => {
          setCalendar(e.target.valueAsDate);
        }}
      />
      <button onClick={() => setAddHoliday()}>追加</button>
      <button onClick={() => onClickCancelButton()}>削除</button>

      <h2>定休日選択</h2>
      <div>
        <input
          id="sun"
          type="checkbox"
          onChange={onChangeCheckBox}
          value="Sun"
        />
        <label htmlFor="sun">日</label>

        <input
          id="sun"
          type="checkbox"
          onChange={onChangeCheckBox}
          value="Mon"
        />
        <label htmlFor="mon">月</label>

        <input
          id="sun"
          type="checkbox"
          onChange={onChangeCheckBox}
          value="Tue"
        />
        <label htmlFor="tue">火</label>

        <input
          id="sun"
          type="checkbox"
          onChange={onChangeCheckBox}
          value="Wed"
        />
        <label htmlFor="wed">水</label>

        <input
          id="sun"
          type="checkbox"
          onChange={onChangeCheckBox}
          value="Thu"
        />
        <label htmlFor="tho">木</label>

        <input
          id="sun"
          type="checkbox"
          onChange={onChangeCheckBox}
          value="Fri"
        />
        <label htmlFor="fri">金</label>

        <input
          id="sun"
          type="checkbox"
          onClick={onChangeCheckBox}
          value="Sat"
        />
        <label htmlFor="sat">土</label>
      </div>
      <button onClick={() => weekHoliday(50)}>定休日決定</button>
    </>
  );
};
