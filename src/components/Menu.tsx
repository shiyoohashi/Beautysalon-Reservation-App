import React from "react";
import { Link } from "react-router-dom";

type Props = {
  menu: string | null;
  setMenu: (menu: string) => void;
};

export const Menu: React.FC<Props> = (Props) => {
  const header = ["name", "description", "value"];
  const data = [
    ["Okayu", "cat", 10],
    ["Korone", "dog", -1],
  ];

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
        <option value="N/A">N/A</option>
        <option value="角刈り">1</option>
        <option value="丸刈り">2</option>
        <option value="三角刈り">3</option>
        <option value="五角刈り">4</option>
      </select>
      <button>
        <Link to={"/menu/time"}>予約時間選択へ</Link>
      </button>
    </div>
  );
};
