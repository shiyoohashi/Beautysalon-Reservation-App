import { Link } from "react-router-dom";
import { TypeOfMenuDetail } from "../global";
// import "@aws-amplify/ui-react/styles.css";

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
    console.log("e: ", e);
    const menuObj = shopMenu.find((obj) => obj.menu === e.target.value);
    if (menuObj !== undefined) {
      sessionStorage.setItem(
        "amountOfMoney",
        String(menuObj.amountOfMoney.toLocaleString())
      );
    }
  }

  function onClickButton() {
    if (sessionStorage.getItem("menu") === null) {
      alert("メニューを選択して下さい");
    } else {
      const link: any = document.getElementById("link");
      link.click();
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
    return shopMenu.map((menuObj, index) => {
      return (
        <div key={index} className="list-unstyled border-bottom ">
          <div>
            <input
              id={menuObj.menu}
              type="checkbox"
              name="menuCheck"
              className="menuCheck "
              value={menuObj.menu}
              onChange={(e) => onChangeCheck(e)}
            />
            <label>
              <b>{menuObj.menu}</b>
              {` (施術目安：${menuObj.treatmentTime}分）`}
            </label>
          </div>

          <div>
            <label className="row justify-content-end">
              {Number(menuObj.amountOfMoney).toLocaleString()}円
            </label>
          </div>

          <div>
            <label className="small text-left">{menuObj.detail}</label>
          </div>
        </div>
      );
    });
  }

  return (
    <div>
      <br />
      <br />
      <h3 className="text-center">Menu</h3>

      {/* 予約がある場合 */}
      <div className="border p-3 border m-5">{menuList()}</div>

      <div className="text-center">
        <button className="btn btn-dark" onClick={() => onClickButton()}>
          予約時間選択へ
        </button>
      </div>
      <Link id="link" to={"/menu/time"}></Link>
    </div>
    // 予約がある場合
  );
};

// {
//    <div class="menu_box">
// 					<ul>
// 					<div class="menu">
// 					<li>
// 					<input type="checkbox" name="menu_id[]" value="72" id="menu_id72">
// 					<label for="menu_id72"><b>縮毛矯正、髪質改善ストレート</b></label>
// 					</li>
// 					</div>
// 												<div class="price">
// 							<li>
// 							<label for="menu_id72">18,700円～</label>
// 							</li>
// 							</div>

// 					<div class="text fs12 pB10">
// 					<li class="pT10">
// 											<label for="menu_id72">
// 						ナチュラルに仕上げるものから板のように真っ直ぐ<br>
// サラサラにするストレートまでご要望にお応え致します。BIKAKUを使用しています。<br>
// 部分矯正<br>
// 前髪や根元のクセの矯正に、ふくらみや<br>
// 部分的なクセの矯正に。
// 						</label>
// 					</li>
// 					</div>
// 					</ul>
// 					</div>
// }
