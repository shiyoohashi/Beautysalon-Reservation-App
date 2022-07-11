import { TypeOfMenuDetail } from "../global";
// import "@aws-amplify/ui-react/styles.css";
import { FooterNavbar } from "../components/FooterNavbar";

export const Menu = () => {
  //選択メニューの初期化(nullになる)
  sessionStorage.removeItem("menu");

  // 一つのチェックボックスしか選べないようにする関数
  function onChangeCheck(menu: string) {
    const checkBoxes = document.getElementsByClassName("menuCheck");
    const arrayCheckBoxes = Array.prototype.slice.call(checkBoxes);
    arrayCheckBoxes.forEach((checkBox: any) => {
      checkBox.checked = false;
    });
    const selectCheckBox: any = document.getElementById(menu);
    selectCheckBox.checked = true;
    sessionStorage.setItem("menu", menu);
    const menuObj = shopMenu.find((obj) => obj.menu === menu);
    if (menuObj !== undefined) {
      sessionStorage.setItem(
        "amountOfMoney",
        String(menuObj.amountOfMoney.toLocaleString())
      );
    }
  }

  const shopMenu: TypeOfMenuDetail[] = [
    {
      id: 1,
      menu: "角刈り",
      detail:
        "「イケメンすぎる角刈り」がTwitterで話題になっている。角刈りにサングラスと、ワイルドなファッションに身を包んだ角刈り男性。フォロワーからは「イケメンすぎる」などの声が寄せられている。",
      amountOfMoney: 1000000,
      treatmentTime: 60,
    },
    {
      id: 2,
      menu: "カット",
      detail: "こんなただのカット選んで楽しいんかぇ？",
      amountOfMoney: 1000,
      treatmentTime: 30,
    },
    {
      id: 3,
      menu: "カット＋カラー",
      detail:
        "儂はこんな浮ついたメニューやらんど？絶対丸刈りにしちゃるけぇの。",
      amountOfMoney: 20000,
      treatmentTime: 60,
    },
    {
      id: 4,
      menu: "パーマ",
      detail:
        "パーマの微妙な仕上がりにキレた女性のエピソードを紹介。パーマをかけに行ったが、担当した美容師に「パーマはかけられない」と言われたそう。その美容師は、以前別の客にも「パーマは微妙だからかけない」と言っていたらしい。",
      amountOfMoney: 10000,
      treatmentTime: 60,
    },
    {
      id: 5,
      menu: "縮毛矯正",
      detail:
        "「縮毛矯正」「デジタルパーマ」の違いを解説する。縮毛矯正はクセを伸ばすのに対し、デジタルパーマはクセを活かす。どちらにもメリット・デメリットがあり、満足できる方を選ぶのがよい。",
      amountOfMoney: 10000,
      treatmentTime: 90,
    },
  ];

  function menuList() {
    return shopMenu.map((menuObj) => {
      return (
        <div
          key={menuObj.menu}
          className="list-unstyled border-bottom"
          onClick={() => onChangeCheck(menuObj.menu)}
        >
          <div>
            <input
              id={menuObj.menu}
              type="checkbox"
              name="menuCheck"
              className="menuCheck"
              value={menuObj.menu}
            />
            <span>
              <b>{menuObj.menu}</b>
              {` (施術目安：${menuObj.treatmentTime}分）`}
            </span>
          </div>

          <div>
            <p className="row justify-content-end">
              {Number(menuObj.amountOfMoney).toLocaleString()}円
            </p>
          </div>

          <div>
            <p className="small text-left">{menuObj.detail}</p>
          </div>
        </div>
      );
    });
  }

  return (
    <div id="menu">
      <br />
      <br />
      <h3 className="text-center">Menu</h3>
      <div className="border p-3 border m-5">{menuList()}</div>
      <FooterNavbar />
    </div>
  );
};
