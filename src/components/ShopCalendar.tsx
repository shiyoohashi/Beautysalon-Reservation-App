import React, { Component } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

import { TypeOfShopCalendar } from "../global";

const localizer = momentLocalizer(moment);
const eventList: TypeOfShopCalendar[] = [
  {
    id: 0,
    title: "角刈り/伊佐次",
    allDay: false,
    start: new Date("2022-06-29 10:00"),
    end: new Date("2022-06-29 11:00"),
  },
  {
    id: 1,
    title: "角刈り/えり子",
    allDay: false,
    start: new Date("2022-06-29 15:00"),
    end: new Date("2022-06-29 17:00"),
  },
];

export const ShopCalendar = () => {
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={eventList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};
