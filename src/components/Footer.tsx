import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

// type Props = {
//   signOut: any;
//   userName: string;
// };

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__logo">YAJIMA HAIR</div>
      <div className="footer__main">
        <dl className="footer__main__column">
          <dt>Open:</dt>
          <dd>
            9:00 - 19:00
            <br />
            最終受付：カット 19:00 / パーマ 18:00
          </dd>
          <dt>Close:</dt>
          <dd>月曜 / 第一,第三火曜</dd>
        </dl>
        <dl className="footer__main__column">
          <dt>Access:</dt>
          <dd>
            〒450-0002
            <br />
            名古屋市中村区名駅４丁目７番１号
            <br />
            ミッドランドスクウェア35階
          </dd>
          <dd>
            <a href="https://goo.gl/maps/NxH656Hdhb2V9fhU6" target="_blank">
              View on Google Map
            </a>
          </dd>
        </dl>
        <dl className="footer__main__column">
          <dt>Tel:</dt>
          <dd>000-000-0000</dd>
        </dl>
      </div>
      <small className="footer__small">© YAJIMA HAIR</small>
    </footer>
  );
};
