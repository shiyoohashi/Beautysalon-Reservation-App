import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <h1>Welcome YAJIMA !</h1>
      <Link to="/shopcalender">予約一覧</Link>
      <br />
      <Link to="/menu">予約する</Link>
    </div>
  );
};
