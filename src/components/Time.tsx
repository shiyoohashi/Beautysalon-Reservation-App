import { Link } from "react-router-dom";
import React from "react";

type Props = {
  menu: string | null;
};

export const Time: React.FC<Props> = (Props) => {
  return (
    <div>
      <h1>{Props.menu}</h1>
      <Link to="/shopcalender">予約一覧</Link>
      <br />
      <Link to="/menu">予約する</Link>
    </div>
  );
};
