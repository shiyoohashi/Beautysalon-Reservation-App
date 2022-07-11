import React from "react";
import { Link } from "react-router-dom";
import "./Admin.css";
// import "./main.css";

export const Admin: React.FC = () => {
  function confirmReservation() {
    const link: HTMLElement | null = document.getElementById("confirm_reserve");
    if (link) {
      link.click();
    }
  }
  function editMenu() {
    const link: HTMLElement | null = document.getElementById("edit_menu");
    if (link) {
      link.click();
    }
  }

  function setHolidays() {
    const link: HTMLElement | null = document.getElementById("set_holidays");
    if (link) {
      link.click();
    }
  }

  function editStylist() {
    const link: HTMLElement | null = document.getElementById("edit_stylist");
    if (link) {
      link.click();
    }
  }

  return (
    <div id="admin_page">
      <br />
      <h1>Administrator access</h1>
      <div className="menus">
        <Link id="confirm_reserve" to="shopcalendar"></Link>

        <button className="adminButton" onClick={() => confirmReservation()}>
          Reservations
        </button>
        <Link id="edit_menu" to="shopcalendar"></Link>
        <button className="adminButton" onClick={() => editMenu()}>
          Menus
        </button>
        <Link id="set_holidays" to="shopcalendar"></Link>
        <button className="adminButton" onClick={() => setHolidays()}>
          Holidays
        </button>
        <Link id="edit_stylist" to="editstylist"></Link>
        <button className="adminButton" onClick={() => editStylist()}>
          Stylists
        </button>
      </div>
    </div>
  );
};
