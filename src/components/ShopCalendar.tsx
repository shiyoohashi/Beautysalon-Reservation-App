import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { deleteReserve } from "../graphql/mutations";
import { listReserves } from "../graphql/queries";
import { TypeOfShopCalendar, TypeOfReserve, TypeOfMenu } from "../global";

const localizer = momentLocalizer(moment);
const eventList: TypeOfShopCalendar[] = [];

export const ShopCalendar = () => {
  let reservations: any;

  useEffect(() => {
    createEventList();
  }, []);

  async function fetchReservations() {
    try {
      const reservationData: any = await API.graphql(
        graphqlOperation(listReserves)
      );
      const reservations: [TypeOfReserve] =
        reservationData.data.listReserves.items;
      return reservations;
    } catch (err) {
      console.log("error fetching todos");
    }
  }

  async function createEventList() {
    reservations = await fetchReservations();
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

    eventList.splice(0); //リスト消去しないと増えるので削除

    if (reservations) {
      reservations.forEach((element: any, index: number) => {
        const selectMenu: any = shopMenu.find((MenuObj) => {
          return MenuObj.menu === element.menu;
        });

        const elementDate: Date = new Date(element.date);
        const year = elementDate.getFullYear();
        const month = elementDate.getMonth() + 1;
        const date = elementDate.getDate();
        const hour = elementDate.getHours();
        const minute = elementDate.getMinutes();
        const ttmmddhhmm = `${year}-${month}-${date} ${hour}:${minute}`;
        const endDate: Date = new Date(element.date);

        if (selectMenu !== undefined) {
          const pushObj = {
            id: index,
            title: `${element.customerId}様 ${element.menu}`,
            allDay: false,
            start: new Date(ttmmddhhmm),
            end: new Date(
              endDate.setMinutes(
                endDate.getMinutes() + selectMenu.treatmentTime
              )
            ),
          };
          eventList.push(pushObj);
        }
      });
    }
  }

  async function delReservation(wantToDeleteReservation: TypeOfReserve) {
    try {
      if (
        !wantToDeleteReservation.date ||
        !wantToDeleteReservation.menu ||
        !wantToDeleteReservation.stylistId ||
        !wantToDeleteReservation.customerId
      ) {
        console.log("====deleteReservationできてないよ=====");
        return;
      }
      console.log("====このデータ消します=====", wantToDeleteReservation);
      await API.graphql({
        query: deleteReserve,
        variables: { input: { id: wantToDeleteReservation.id } },
      });
      console.log("====このデータ消しました=====", wantToDeleteReservation);
    } catch (err) {
      console.log("error deleteReservation:", err);
    }
  }

  function deleteAllReservation() {
    reservations.forEach((reservation: TypeOfReserve) => {
      delReservation(reservation);
    });
  }

  function onClickEvent(event: any) {
    console.log(event);
    alert(`${event.title}\n来店時間：${event.start}\n退店時間：${event.end}`);
  }

  return (
    <div id="shopcalendar">
      <Calendar
        localizer={localizer}
        events={eventList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 2000 }}
        defaultView={Views.WEEK}
        onSelectEvent={(event) => onClickEvent(event)}
      />
      <input
        type="button"
        value={"全ての予約を消去する"}
        onClick={() => deleteAllReservation()}
      />
    </div>
  );
};
