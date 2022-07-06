import React from "react";
import { Link } from "react-router-dom";
// import "./Admin.css";
import "./main.css";

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
    <div className="admin_page">
      <br />
      <h1>Administrator access</h1>
      <div className="menus">
        <Link id="confirm_reserve" to="/shopcalender"></Link>

        <button
          className="header__reserve__link"
          onClick={() => confirmReservation()}
        >
          <br />
          <div className="header__reserve__en">
            Confirm customer's reservation
          </div>
          <br />
        </button>
        <Link id="edit_menu" to="/shopcalender"></Link>
        <button className="header__reserve__link" onClick={() => editMenu()}>
          <br />
          <div className="header__reserve__en">Edit menus</div>
          <br />
        </button>
        <Link id="set_holidays" to="/shopcalender"></Link>
        <button className="header__reserve__link" onClick={() => setHolidays()}>
          <br />
          <div className="header__reserve__en">Set holidays</div>
          <br />
        </button>
        <Link id="edit_stylist" to="/shopcalender"></Link>
        <button className="header__reserve__link" onClick={() => editStylist()}>
          <br />
          <div className="header__reserve__en">Edit stylist's status</div>
          <br />
        </button>
      </div>
    </div>
  );
};
