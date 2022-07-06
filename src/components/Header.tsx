import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

type Props = {
  signOut: any;
  userName: string;
};
export const Header: React.FC<Props> = (Props) => {
  function confirmReservation() {
    const link: any = document.getElementById("confirm_reservation");
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

  function clickAdmin() {
    if (
      Props.userName === "Administrater" ||
      Props.userName === "administrater"
    ) {
      const link: any = document.getElementById("admin");
      link.click();
    }
  }

  return (
    // <>
    //   <header className="header">
    //     <span className="user">
    //       {Props.userName}様
    //       <Link
    //         id="confirm_reservation"
    //         to="https://japan-crew-cut-association.github.io/Tashinami-HP/"
    //       ></Link>
    //       <button className="sign_out" onClick={Props.signOut}>
    //         Sign Out
    //       </button>
    //     </span>
    //   </header>
    // </>
    <header className="header">
      <h1 className="header__logo">
        <div className="header__logo__img" onClick={() => clickAdmin()}>
          YAJIMA HAIR
        </div>

        {/* <a href="./admin">Link</a> */}

        <Link id="admin" to={"/admin"}></Link>
      </h1>

      <div className="header__container" style={{ height: "1037px" }}>
        <span className="header__username">{Props.userName}様</span>
        {/* <span className="header__toggle">
          <span></span>
        </span> */}
        <div className="header__reserve">
          <a
            href="https://japan-crew-cut-association.github.io/Tashinami-HP/"
            onClick={Props.signOut}
            target="_blank"
            className="header__reserve__link header__reserve__ja"
          >
            SignOut
          </a>
        </div>
        <div className="header__container__inner" style={{ height: "1037px" }}>
          <div className="header__sublogo">
            <a
              href="https://Tashinami-hair.com/#"
              className="header__sublogo__link"
            ></a>
          </div>
          <div className="header__container__main">
            <nav className="header__nav">
              {/* <ul className="header__nav__list">
                <li className="header__nav__item">
                  <a
                    href="https://Tashinami-hair.com/#concept"
                    className="header__nav__link"
                  >
                    Concept
                  </a>
                </li>
                <li className="header__nav__item">
                  <a
                    href="https://Tashinami-hair.com/#features"
                    className="header__nav__link"
                  >
                    Features
                  </a>
                </li>
                <li className="header__nav__item">
                  <a
                    href="https://Tashinami-hair.com/#menu"
                    className="header__nav__link"
                  >
                    Menu
                  </a>
                </li>
                <li className="header__nav__item">
                  <a
                    href="https://Tashinami-hair.com/#staff"
                    className="header__nav__link"
                  >
                    Staff
                  </a>
                </li>
                <li className="header__nav__item">
                  <a
                    href="https://Tashinami-hair.com/#access"
                    className="header__nav__link"
                  >
                    Access
                  </a>
                </li>
              </ul> */}
            </nav>
            <div className="header__info">
              <dl className="header__info__column">
                <div className="opentime">
                  <dt>Open:</dt>
                  <dd>
                    <span>9:00 - 19:00</span>
                    最終受付：カット 19:00 / パーマ 18:00
                  </dd>
                </div>
                <div className="closetime">
                  <dt>Close:</dt>
                  <dd>月曜 / 第一,第三火曜</dd>
                </div>
              </dl>
              <dl className="header__info__column">
                <div className="tel">
                  <dt>Tel:</dt>
                  <dd>058-260-8220</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
