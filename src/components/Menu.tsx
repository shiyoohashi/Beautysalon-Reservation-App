import { TypeOfMenuDetail, TypeOfMenu } from "../global";
// import "@aws-amplify/ui-react/styles.css";
import { FooterNavbar } from "../components/FooterNavbar";
import { listShopmenus } from "../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Menu = () => {
  const [stateMenus, setStateMenus] = useState<JSX.Element[]>([]);

  //選択メニューの初期化(nullになる)
  sessionStorage.removeItem("menu");

  useEffect(() => {
    createMenuList();
  }, []);

  function onClickArButton() {
    window.location.href =
      "https://japan-crew-cut-association.github.io/photoedit-web-js/";
    // const link: HTMLElement | null = document.getElementById("ar");
    // if (link) {
    //   link.click();
    // }
  }

  async function createMenuList() {
    try {
      const graphqlResult: any = await API.graphql(
        graphqlOperation(listShopmenus)
      );
      const menus: TypeOfMenu[] = graphqlResult.data.listShopmenus.items;
      const result: JSX.Element[] = menus.map((menuObj: any) => {
        return (
          <div
            key={menuObj.menu}
            className="list-unstyled border-bottom"
            onClick={() => onChangeCheck(menuObj.menu, menuObj.amountOfMoney)}
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
            <div>
              <button onClick={() => onClickArButton()}>
                ARで角刈りを試す
              </button>
            </div>
          </div>
        );
      });

      setStateMenus(result);
    } catch (err) {
      console.log("error fetching todos");
    }
  }

  // 一つのチェックボックスしか選べないようにする関数
  function onChangeCheck(menu: string, amountOfMoney: number) {
    const checkBoxes = document.getElementsByClassName("menuCheck");
    const arrayCheckBoxes = Array.prototype.slice.call(checkBoxes);
    arrayCheckBoxes.forEach((checkBox: any) => {
      checkBox.checked = false;
    });
    const selectCheckBox: any = document.getElementById(menu);
    selectCheckBox.checked = true;
    sessionStorage.setItem("menu", menu);

    // const menuObj = menus.find((obj) => obj.menu === menu);
    // if (menuObj !== undefined) {
    sessionStorage.setItem(
      "amountOfMoney",
      String(amountOfMoney.toLocaleString())
    );
    // }
  }

  return (
    <div id="menu">
      <br />
      <br />
      <h3 className="text-center">Menu</h3>
      <div className="border p-3 border m-5">
        <>{stateMenus}</>
      </div>
      <FooterNavbar />
      <Link id="ar" to="ar/"></Link>
    </div>
  );
};
