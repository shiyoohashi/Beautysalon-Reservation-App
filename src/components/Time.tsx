import { Link } from "react-router-dom";
import React from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { useState, useEffect } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { createTodo } from "../graphql/mutations";
import { listTodos } from "../graphql/queries";
import awsExports from "../aws-exports";
import { TypeOfReserveCalendar, TypeOfReserve, TypeOfMenu } from "../global";
Amplify.configure(awsExports);

type Props = {
  menu: string | null;
  setReserve: (typeOfReserve: TypeOfReserve[]) => void;
  reserve: TypeOfReserve[];
  setTime: (date: Date) => void;
};

type todo = {
  id: number;
  name: string;
  description: string;
};
const initialState: todo = { id: 0, name: "", description: "" };

export const Time: React.FC<Props> = (Props) => {
  //ここから
  const [formState, setFormState] = useState(initialState);
  const [todos, setTodos] = useState<todo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);
  function setInput(key: any, value: any) {
    setFormState({ ...formState, [key]: value });
  }

  async function fetchTodos() {
    try {
      const todoData: any = await API.graphql(graphqlOperation(listTodos));
      const todos: [todo] = todoData.data.listTodos.items;
      setTodos(todos);
    } catch (err) {
      console.log("error fetching todos");
    }
  }

  async function addTodo() {
    try {
      if (!formState.name || !formState.description) return;
      const todo: any = { ...formState };
      setTodos([...todos, todo]);
      setFormState(initialState);
      await API.graphql(graphqlOperation(createTodo, { input: todo }));
    } catch (err) {
      console.log("error creating todo:", err);
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
      <div style={styles.container}>
        <h2>Amplify Todos</h2>
        <input
          onChange={(event) => setInput("name", event.target.value)}
          style={styles.input}
          value={formState.name}
          placeholder="Name"
        />
        <input
          onChange={(event) => setInput("description", event.target.value)}
          style={styles.input}
          value={formState.description}
          placeholder="Description"
        />
        <button style={styles.button} onClick={addTodo}>
          Create Todo
        </button>
        {todos.map((todo, index) => (
          <div key={todo.id ? todo.id : index} style={styles.todo}>
            <p style={styles.todoName}>{todo.name}</p>
            <p style={styles.todoDescription}>{todo.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

type style = {
  container: any;
  todo: any;
  input: any;
  todoName: any;
  todoDescription: any;
  button: any;
};

const styles: style = {
  container: {
    width: 400,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
  },
  todo: { marginBottom: 15 },
  input: {
    border: "none",
    backgroundColor: "#ddd",
    marginBottom: 10,
    padding: 8,
    fontSize: 18,
  },
  todoName: { fontSize: 20, fontWeight: "bold" },
  todoDescription: { marginBottom: 0 },
  button: {
    backgroundColor: "black",
    color: "white",
    outline: "none",
    fontSize: 18,
    padding: "12px 0px",
  },
};
