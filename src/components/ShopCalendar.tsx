import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { deleteReserve } from "../graphql/mutations";
import { listReserves, listShopmenus } from "../graphql/queries";
import {
  TypeOfShopCalendar,
  TypeOfReserve,
  TypeOfShopCalendarEvent,
  TypeOfMenu,
} from "../global";

const localizer = momentLocalizer(moment);
const eventList: TypeOfShopCalendar[] = [];

export const ShopCalendar = () => {
  useEffect(() => {
    createEventList();
  }, []);

  async function fetchReserves() {
    try {
      const graphqlResult: any = await API.graphql(
        graphqlOperation(listReserves)
      );
      const reserves: [TypeOfReserve] = graphqlResult.data.listReserves.items;
      return reserves;
    } catch (err) {
      console.log("error fetchReserves todos", err);
    }
  }

  async function fetchMenus() {
    try {
      const graphqlResult: any = await API.graphql(
        graphqlOperation(listShopmenus)
      );
      const menus: [TypeOfMenu] = graphqlResult.data.listShopmenus.items;
      return menus;
    } catch (err) {
      console.log("error fetchMenus todos", err);
    }
  }

  async function createEventList() {
    const reserves: TypeOfReserve[] | undefined = await fetchReserves();
    const shopMenu: TypeOfMenu[] | undefined = await fetchMenus();

    eventList.splice(0); //リスト消去しないと増えるので削除

    if (reserves) {
      reserves.forEach((element: any, index: number) => {
        const selectMenu: any = shopMenu!.find((MenuObj) => {
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

  async function delReserve(reserveObj: TypeOfReserve) {
    try {
      if (
        !reserveObj.date ||
        !reserveObj.menu ||
        !reserveObj.stylistId ||
        !reserveObj.customerId
      ) {
        console.log("====function:delReserve失敗=====");
        return;
      }
      await API.graphql({
        query: deleteReserve,
        variables: { input: { id: reserveObj.id } },
      });
      console.log("====このデータ消しました=====", reserveObj);
    } catch (err) {
      console.log("error function:delReserve:", err);
    }
  }

  async function delReserves() {
    const reserves: any = await fetchReserves();
    reserves.forEach((reserveObj: TypeOfReserve) => {
      delReserve(reserveObj);
    });
  }

  function onClickReserve(event: TypeOfShopCalendarEvent) {
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
        onSelectEvent={(event) => onClickReserve(event)}
      />
      <input
        type="button"
        value={"全ての予約を消去する"}
        onClick={() => delReserves()}
      />
    </div>
  );
};
