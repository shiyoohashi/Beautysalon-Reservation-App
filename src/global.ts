export interface TypeOfShopCalendar {
  id: number;
  title: string | null;
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

export interface TypeOfReserve {
  date: Date;
  // time: Date;
  menu: string | null;
  amountOfMoney: number;
  treatmentTime: number;
  stylistName: string;
  customerName: string;
}

export interface TypeOfMenu {
  menu: string | null;
  amountOfMoney: number;
  treatmentTime: number;
}
