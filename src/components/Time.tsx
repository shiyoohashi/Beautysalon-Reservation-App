import { Link } from "react-router-dom";
import React from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { useState, useEffect } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { createReservation } from "../graphql/mutations";
import { listReservations } from "../graphql/queries";
import awsExports from "../aws-exports";
import { TypeOfReserveCalendar, TypeOfReserve, TypeOfMenu } from "../global";
Amplify.configure(awsExports);

type Props = {
  reserve: TypeOfReserve[];
  setReserve: (typeOfReserve: TypeOfReserve[]) => void;
  setTime: (date: Date) => void;
  userName: string;
};

type reservation = {
  id?: number;
  date: string;
  menuId: number;
  stylistId: number;
  customerId: string;
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
        !reservation.menuId ||
        !reservation.stylistId ||
        !reservation.customerId
      ) {
        console.log("====addTodoできてないよ=====");
        console.log("====reservation.date=====", reservation.date);
        console.log("====reservation.menuId=====", reservation.menuId);
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
      // console.log("comparisonDate: ", comparisonDate);

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
      return hairMenu.menu === sessionStorage.getItem("menu");
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
      menuId: 1031,
      stylistId: 2,
      customerId: Props.userName,
    };

    const registerDB: TypeOfReserve[] = [...Props.reserve, registerObj];
    Props.setReserve(registerDB);
    addTodo(reservation);

    // const reserve: any = {
    //   id: 1,
    //   name: "masashi",
    //   menu: "角刈り",
    //   date: "2022-06-22",
    //   time: "60",
    // };

    link.click();
  }

  return (
    <>
      <div>
        <Calendar
          localizer={localizer}
          events={eventList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 2000 }}
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
      <div style={styles.container}>
        <h2>DB内の予約情報</h2>
        {/* <input
          // onChange={(event) => setInput("name", event.target.value)}
          // style={styles.input}
          // value={formState.name}
          // placeholder="Name"
        /> */}
        {/* <input
          // onChange={(event) => setInput("description", event.target.value)}
          // style={styles.input}
          // value={formState.description}
          // placeholder="Description"
        /> */}
        {/* <button style={styles.button}>Create Todo</button> */}
        {reservations.map((reservation, index) => (
          <div
            key={reservation.id ? reservation.id : index}
            style={styles.reservation}
          >
            {/* <p style={styles.todo}>{todo.id}</p> */}
            <p style={styles.reservationName}>
              {"予約日時 : " + reservation.date}
            </p>
            <p style={styles.reservationName}>
              {"メニューId : " + reservation.menuId}
            </p>
            <p style={styles.reservationName}>
              {"スタイリストId : " + reservation.stylistId}
            </p>
            <p style={styles.reservationName}>
              {"カスタマーId : " + reservation.customerId}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

type style = {
  container: any;
  reservation: any;
  input: any;
  reservationName: any;
  reservationDescription: any;
  button: any;
};

const styles: style = {
  container: {
    width: 600,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
  },
  reservation: { marginBottom: 15 },
  input: {
    border: "none",
    backgroundColor: "#ddd",
    marginBottom: 10,
    padding: 8,
    fontSize: 18,
  },
  reservationName: { fontSize: 15, fontWeight: "bold" },
  reservationDescription: { marginBottom: 0 },
  button: {
    backgroundColor: "black",
    color: "white",
    outline: "none",
    fontSize: 18,
    padding: "12px 0px",
  },
};
