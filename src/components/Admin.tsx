import React from "react";
import { Link } from "react-router-dom";
import "./Admin.css";

export const Admin: React.FC = () => {
  function sayHello() {
    console.log("hello");
  }
  function confirmReservation() {
    const link: any = document.getElementById("confirm_reserve");
    link.click();
  }
  function editMenu() {
    const link: any = document.getElementById("edit_menu");
    link.click();
  }

  function setHolidays() {
    const link: any = document.getElementById("set_holidays");
    link.click();
  }

  function editStylist() {
    const link: any = document.getElementById("edit_stylist");
    link.click();
  }

  return (
    <div className="admin_page">
      <h1>Administrator access</h1>
      <div className="menus">
        <Link id="confirm_reserve" to="/shopcalender"></Link>
        <button
          className="header__reserve__link"
          onClick={() => confirmReservation()}
        >
          Confirm customer's reservations
        </button>
        <Link id="edit_menu" to="/shopcalender"></Link>
        <button className="header__reserve__link" onClick={() => editMenu()}>
          Edit the menu
        </button>
        <Link id="set_holidays" to="/shopcalender"></Link>
        <button className="header__reserve__link" onClick={() => setHolidays()}>
          Set holidays
        </button>
        <Link id="edit_stylist" to="/shopcalender"></Link>
        <button className="header__reserve__link" onClick={() => editStylist()}>
          Edit stylist's status
        </button>
      </div>
    </div>
  );
};
