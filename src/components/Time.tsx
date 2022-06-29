import { Link } from "react-router-dom";
import React from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";

import moment from "moment";

import { TypeOfReserveCalendar } from "../global";

type Props = {
  menu: string | null;
};

export const Time: React.FC<Props> = (Props) => {
  const localizer = momentLocalizer(moment);
  //   const eventList: TypeOfShopCalendar[] = [
  //     {
  //       id: 0,
  //       title: "角刈り/伊佐次",
  //       allDay: false,
  //       start: new Date("2022-06-29 10:00"),
  //       end: new Date("2022-06-29 11:00"),
  //     },
  //     {
  //       id: 1,
  //       title: "角刈り/えり子",
  //       allDay: false,
  //       start: new Date("2022-06-29 15:00"),
  //       end: new Date("2022-06-29 17:00"),
  //     },
  //   ];
  const eventList: TypeOfReserveCalendar[] = [];

  for (let i = 9; i <= 19; i++) {
    eventList.push({
      title: "予約可能",
      start: new Date(`2022-06-29 ${i}:00`),
      end: new Date(`2022-06-29 ${i}:30`),
      type: "record",
    });
    eventList.push({
      title: "予約可能",
      start: new Date(`2022-06-29 ${i}:30`),
      end: new Date(`2022-06-29 ${i + 1}:00`),
      type: "schedule",
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
        defaultView={Views.WEEK}
        // defaultDate={"2022-06-29 17:00"}
        onSelectEvent={(event) => alert(event.title)}
        timeslots={2}
        views={["week"]}
        eventPropGetter={({ type }) => {
          switch (type) {
            case "record":
              return {};
            case "schedule":
              return { style: { backgroundColor: "skyblue" } };
          }
          return {};
        }}
        resourceTitleAccessor="start"
      />
    </div>
  );
};
