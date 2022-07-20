import React from "react";
import { Link } from "react-router-dom";

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
      <h1>管理者画面</h1>
      <div className="menus">
        <Link id="confirm_reserve" to="shopcalendar/"></Link>

        <button className="adminButton" onClick={() => confirmReservation()}>
          予約を確認する
        </button>
        <Link id="edit_menu" to="editmenu/"></Link>
        <button className="adminButton" onClick={() => editMenu()}>
          メニューの編集
        </button>
        <Link id="set_holidays" to="holiday/"></Link>
        <button className="adminButton" onClick={() => setHolidays()}>
          定休日の設定
        </button>
        <Link id="edit_stylist" to="editstylist/"></Link>
        <button className="adminButton" onClick={() => editStylist()}>
          スタイリストの管理
        </button>
      </div>
    </div>
  );
};
