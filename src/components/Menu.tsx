import React from "react";
import { Link } from "react-router-dom";

export const Menu = () => {
  //選択メニューの初期化(nullになる)
  sessionStorage.removeItem("menu");

  // 一つのチェックボックスしか選べないようにする関数
  function onChangeCheck(e: any) {
    const checkBoxes = document.getElementsByClassName("menuCheck");
    const arrayCheckBoxes = Array.prototype.slice.call(checkBoxes);
    arrayCheckBoxes.forEach((checkBox: any) => {
      checkBox.checked = false;
    });
    const selectCheckBox: any = document.getElementById(e.target.value);
    selectCheckBox.checked = true;
    sessionStorage.setItem("menu", e.target.value);
  }

  function onClickButton() {
    if (sessionStorage.getItem("menu") === null) {
      alert("メニューを選択して下さい");
    } else {
      const link: any = document.getElementById("link");
      link.click();
    }
  }

  return (
    <div>
      <h1>メニューを選択して下さい</h1>
      <table className="table">
        <tbody>
          <tr>
            <th>メニュー</th>
            <th>料金（円）</th>
            <th>↓チェック！</th>
          </tr>
          <tr>
            <td>角刈り</td>
            <td>10000</td>
            <td>
              <input
                id="角刈り"
                type="checkbox"
                name="menuCheck"
                className="menuCheck"
                value="角刈り"
                onChange={(e) => onChangeCheck(e)}
              />
            </td>
          </tr>
          <tr>
            <td>カット</td>
            <td>1000</td>
            <td>
              <input
                id="カット"
                type="checkbox"
                name="menuCheck"
                className="menuCheck"
                value="カット"
                onChange={(e) => onChangeCheck(e)}
              />
            </td>
          </tr>
          <tr>
            <td>カット＋カラー</td>
            <td>20000</td>
            <td>
              <input
                id="カット＋カラー"
                type="checkbox"
                name="menuCheck"
                className="menuCheck"
                value="カット＋カラー"
                onChange={(e) => onChangeCheck(e)}
              />
            </td>
          </tr>
          <tr>
            <td>パーマ</td>
            <td>10000</td>
            <td>
              <input
                id="パーマ"
                type="checkbox"
                name="menuCheck"
                className="menuCheck"
                value="パーマ"
                onChange={(e) => onChangeCheck(e)}
              />
            </td>
          </tr>
          <tr>
            <td>縮毛矯正</td>
            <td>10000</td>
            <td>
              <input
                id="縮毛矯正"
                type="checkbox"
                name="menuCheck"
                className="menuCheck"
                value="縮毛矯正"
                onChange={(e) => onChangeCheck(e)}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <button onClick={() => onClickButton()}>予約時間選択へ</button>
      <Link id="link" to={"/menu/time"}></Link>
    </div>
  );
};
