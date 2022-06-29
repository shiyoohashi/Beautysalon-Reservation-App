export interface TypeOfShopCalendar {
  id: number;
  title: string;
  allDay: boolean;
  start: Date;
  end: Date;
}

export interface TypeOfReserveCalendar {
  start: Date;
  end: Date;
  title: string;
  type: string;
}
