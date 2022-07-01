import React, { Component } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

import { TypeOfShopCalendar, TypeOfReserve } from "../global";

type Props = {
  reserve: TypeOfReserve[];
};

const localizer = momentLocalizer(moment);
const eventList: TypeOfShopCalendar[] = [];

export const ShopCalendar: React.FC<Props> = (Props) => {
  if (Props.reserve.length !== 0) {
    eventList.splice(0);
    Props.reserve.forEach((element, index) => {
      const endDate: Date = new Date(element.date.getTime());
      const pushObj = {
        id: index,
        title: element.menu,
        allDay: false,
        start: element.date,
        end: new Date(
          endDate.setMinutes(endDate.getMinutes() + element.treatmentTime)
        ),
      };
      eventList.push(pushObj);
    });
  }

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
