import React from "react";
import { Link } from "react-router-dom";

type Props = {
  menu: string | null;
  setMenu: (menu: string) => void;
};

export const Menu: React.FC<Props> = (Props) => {
  function eventOnChange(e: any) {
    Props.setMenu(e.target.value);
  }

  return (
    <div>
      <select
        id="dropdown"
        onChange={(e) => {
          eventOnChange(e);
        }}
      >
        <option value="N/A">メニューを選択して下さい</option>
        <option value="角刈り">角刈り</option>
        <option value="カット">カット</option>
        <option value="カット＋カラー">カット＋カラー</option>
        <option value="パーマ">パーマ</option>
        <option value="縮毛矯正">縮毛矯正</option>
      </select>
      <button>
        <Link to={"/menu/time"}>予約時間選択へ</Link>
      </button>
    </div>
  );
};
