import { Link } from "react-router-dom";
import "./Header.css";
import "./FooterNavbar.css";

export const FooterNavbar = () => {
  function onClickButton() {
    if (sessionStorage.getItem("menu") === null) {
      alert("メニューを選択して下さい");
    } else {
      const link: any = document.getElementById("link");
      link.click();
    }
  }

  return (
    <div className="footer_navbar">
      <button className="btn btn-dark btn-next" onClick={() => onClickButton()}>
        予約時間選択へ
      </button>
      <Link id="link" to={"selecttime"}></Link>
    </div>
  );
};
