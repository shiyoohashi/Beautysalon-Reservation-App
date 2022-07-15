import React from "react";
import { Link } from "react-router-dom";
import "./css/Header.css";

type Props = {
  signOut: VoidFunction;
  userName: string;
};
export const Header: React.FC<Props> = (Props) => {
  function returnHomePage() {
    window.location.href =
      "https://japan-crew-cut-association.github.io/Tashinami-HP/";
  }

  function onClickSignout() {
    // setTimeout(function () {
    //   window.location.href =
    //     "https://japan-crew-cut-association.github.io/Tashinami-HP/";
    // }, 900);
    Props.signOut();
  }

  return (
    <header className="header">
      <div className="header__container" style={{ height: "1037px" }}>
        <h1 className="header__logo">
          <div className="header__logo__img" onClick={returnHomePage}>
            YAJIMA HAIR
          </div>
          <Link id="logo" to={"/"}></Link>
        </h1>
        <span className="header__username">{Props.userName}様</span>
        <div className="header__reserve">
          <div
            onClick={onClickSignout}
            className="header__reserve__link header__reserve__ja"
          >
            SignOut
          </div>
        </div>
        <div className="header__container__inner" style={{ height: "1037px" }}>
          <div className="header__container__main">
            <nav className="header__nav"></nav>
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
