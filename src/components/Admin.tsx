import React from "react";
import { Link } from "react-router-dom";
import "./Admin.css";
// import "./main.css";

export const Admin: React.FC = () => {
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
    <div id="admin_page">
      <br />
      <h1>Administrator access</h1>
      <div className="menus">
        <Link id="confirm_reserve" to="shopcalender"></Link>

        <button className="adminButton" onClick={() => confirmReservation()}>
          Reservations
          {/* <br />
          <div className="header__reserve__en">
            Confirm customer's reservation
          </div>
          <br /> */}
        </button>
        <Link id="edit_menu" to="shopcalender"></Link>
        <button className="adminButton" onClick={() => editMenu()}>
          Menus
        </button>
        <Link id="set_holidays" to="shopcalender"></Link>
        <button className="adminButton" onClick={() => setHolidays()}>
          {/* <br />
          <div className="header__reserve__en">Set holidays</div>
          <br /> */}
          Holidays
        </button>
        <Link id="edit_stylist" to="shopcalender"></Link>
        <button className="adminButton" onClick={() => editStylist()}>
          {/* <br />
          <div className="header__reserve__en">Edit stylist's status</div>
          <br /> */}
          Stylists
        </button>
      </div>
    </div>
  );
};
