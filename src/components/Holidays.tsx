import { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { listHolidays } from "../graphql/queries";
import { TypeOfHoliday } from "../global";
import { createHoliday, deleteHoliday } from "../graphql/mutations";
import "./main.css";

export const Holidays = () => {
  const [holiday, setHoliday] = useState<Element[]>();
  const [calendar, setCalendar] = useState("");
  const [day, setDay] = useState<string[]>([]);
  const holidayCalendar: any[] = [];

  const handleChange = (e: any) => {
    let defaultValue: string = e.target.defaultValue;
    if (day.includes(defaultValue)) {
      setDay(day.filter((item: any) => item !== e.target.defaultValue));
    } else {
      setDay([...day, e.target.defaultValue]);
    }
  };

  // async function fetchHolyday() {
  //   try {
  //     const reservationData: any = await API.graphql(
  //       graphqlOperation(listHolidays)
  //     );

  //     const reservations: [TypeOfHoliday] =
  //       reservationData.data.listHolidays.items;
  //     console.log("holiday fetch", reservations);
  //     let elementDate: Date;
  //     let year: number;
  //     let month: number;
  //     let date: number;
  //     let ttmmdd: string;

  //     reservations.map((ele: any, index) => {
  //       elementDate = new Date(ele.date);
  //       year = elementDate.getFullYear();
  //       month = elementDate.getMonth() + 1;
  //       date = elementDate.getDate();
  //       let dateString: string = "";
  //       let monthString: string = "";
  //       date < 10 ? (dateString = "0" + date) : (dateString = String(date));
  //       month < 10
  //         ? (monthString = "0" + month)
  //         : (monthString = String(month));

  //       ttmmdd = `${year}-${monthString}-${dateString}`;
  //       holidayCalendar.push([
  //         <div>
  //           <label key={index} htmlFor={"String(index)"}>
  //             {ttmmdd}
  //           </label>
  //         </div>,
  //       ]);
  //     });
  //     holidayCalendar.sort(function (a, b) {
  //       return a[0].props.children.props.children >
  //         b[0].props.children.props.children
  //         ? 1
  //         : -1;
  //     });
  //     setHoliday(holidayCalendar);
  //     console.log("reservations :", reservations);
  //     return reservations;
  //   } catch (err) {
  //     console.log("error fetching todos");
  //   }
  // }
  async function fetchHolyday() {
    try {
      const reservationData: any = await API.graphql(
        graphqlOperation(listHolidays)
      );

      const reservations: [TypeOfHoliday] =
        reservationData.data.listHolidays.items;
      console.log("holiday fetch", reservations);

      return reservations;
    } catch (err) {
      console.log("error fetching todos");
    }
  }

  async function indicateHoliday() {
    const getFetchHoliday: any = await fetchHolyday();
    let elementDate: Date;
    let year: number;
    let month: number;
    let date: number;
    let ttmmdd: string;

    getFetchHoliday.map((ele: any, index: number) => {
      elementDate = new Date(ele.date);
      year = elementDate.getFullYear();
      month = elementDate.getMonth() + 1;
      date = elementDate.getDate();
      let dateString: string = "";
      let monthString: string = "";
      date < 10 ? (dateString = "0" + date) : (dateString = String(date));
      month < 10 ? (monthString = "0" + month) : (monthString = String(month));

      ttmmdd = `${year}-${monthString}-${dateString}`;
      holidayCalendar.push([
        <div>
          <label key={index} htmlFor={"String(index)"}>
            {ttmmdd}
          </label>
        </div>,
      ]);
    });
    holidayCalendar.sort(function (a, b) {
      return a[0].props.children.props.children >
        b[0].props.children.props.children
        ? 1
        : -1;
    });
    setHoliday(holidayCalendar);
  }

  async function setAddHoliday() {
    const reserveTest: any = {
      date: calendar,
    };
    {
      const wantToDel = await fetchHolyday().then((res) =>
        res?.filter((reservation) => {
          console.log("calender : ", calendar);
          let test: any = new Date(reservation.date);
          return String(test) === String(calendar);
        })
      );
      console.log("====wantToDel====", wantToDel);
      if (wantToDel!.length > 0) {
        window.alert("既に休日予定です。");
      } else {
        addReservationHoliday(reserveTest);
        setTimeout(() => window.location.reload(), 500);
      }
    }
  }
  async function addReservationHoliday(reservation: TypeOfHoliday) {
    console.log("reservation : ", reservation);
    try {
      if (!reservation.date) {
        console.log("====addTodoできてないよ=====");
        console.log("====reservation.date=====", reservation.date);
        return;
      }
      await API.graphql(
        graphqlOperation(createHoliday, { input: reservation })
      );
    } catch (err) {
      console.log("error creating reservation:", err);
    }
  }

  useEffect(() => {
    fetchHolyday();
  }, []);

  async function onClickCancelButton() {
    const result: boolean = window.confirm(`休みをキャンセルしますか？`);
    if (result) {
      const wantToDel = await fetchHolyday().then((res) =>
        res?.filter((reservation) => {
          console.log("calender : ", calendar);
          let reservationDate: any = new Date(reservation.date);
          return String(reservationDate) === String(calendar);
        })
      );
      console.log("====wantToDel====", wantToDel);
      if (wantToDel) {
        wantToDel.forEach((reservation) => delHoliday(reservation));
      }
    }
  }

  async function delHoliday(wantToDeleteReservation: TypeOfHoliday) {
    try {
      if (!wantToDeleteReservation.date) {
        console.log("====deleteReservationできてないよ=====");
        console.log(
          "====wantToDeleteReservation.date=====",
          wantToDeleteReservation.date
        );
        return;
      }
      await API.graphql({
        query: deleteHoliday,
        variables: { input: { id: wantToDeleteReservation.id } },
      });
    } catch (err) {
      console.log("error deleteReservation:", err);
    }
    alert("カレンダーをキャンセルしました。");
    window.location.reload();
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
      addReservationHoliday(reserveTest);
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
      {holiday}
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
        <input id="sun" type="checkbox" onChange={handleChange} value="Sun" />
        <label htmlFor="sun">日</label>

        <input id="sun" type="checkbox" onChange={handleChange} value="Mon" />
        <label htmlFor="mon">月</label>

        <input id="sun" type="checkbox" onChange={handleChange} value="Tue" />
        <label htmlFor="tue">火</label>

        <input id="sun" type="checkbox" onChange={handleChange} value="Wed" />
        <label htmlFor="wed">水</label>

        <input id="sun" type="checkbox" onChange={handleChange} value="Thu" />
        <label htmlFor="tho">木</label>

        <input id="sun" type="checkbox" onChange={handleChange} value="Fri" />
        <label htmlFor="fri">金</label>

        <input id="sun" type="checkbox" onChange={handleChange} value="Sat" />
        <label htmlFor="sat">土</label>
      </div>
      <button onClick={() => weekHoliday(50)}>定休日決定</button>
    </>
  );
};
