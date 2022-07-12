import "./EditMenu.css";
import { useState, useEffect } from "react";
import { listShopmenus } from "../graphql/queries";
import { deleteShopmenu, createShopmenu } from "../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import { TypeOfMenuDetail } from "../global";

export const EditMenu = () => {
  const [menu, setMenu] = useState<JSX.Element[]>();
  const [menuStateObj, setmenuStateObj] = useState({
    menu: "",
    amountOfMoney: 0,
    treatmentTime: 0,
    detail: "",
  });

  async function fetchMenus() {
    try {
      const graphqlResult: any = await API.graphql(
        graphqlOperation(listShopmenus)
      );
      const menus: [TypeOfMenuDetail] = graphqlResult.data.listShopmenus.items;
      return menus;
    } catch (err) {
      console.log("error fetching todos");
    }
  }

  async function delMenu(deleteMenuObj: TypeOfMenuDetail) {
    try {
      if (
        !deleteMenuObj.menu ||
        !deleteMenuObj.detail ||
        !deleteMenuObj.amountOfMoney ||
        !deleteMenuObj.treatmentTime
      ) {
        console.log("====deletemenuできてないよ=====");
        return;
      }
      await API.graphql({
        query: deleteShopmenu,
        variables: { input: { id: deleteMenuObj.id } },
      });
      console.log("====このデータ消しました=====", deleteMenuObj);
    } catch (err) {
      console.log("error delmenu:", err);
    }
    alert(`メニュー「${deleteMenuObj.menu}」を封印しました。`);
    window.location.reload();
  }

  async function onClickDeleteButton(index: number) {
    const result: boolean = window.confirm(`メニューを封印しますか？`);
    if (result) {
      const deleteMenuObj: [TypeOfMenuDetail] | undefined = await fetchMenus();
      if (deleteMenuObj) {
        delMenu(deleteMenuObj[index]);
      }
    }
  }

  async function createTableElement() {
    try {
      const graphqlResult: any = await API.graphql(
        graphqlOperation(listShopmenus)
      );
      const menus: [TypeOfMenuDetail] = graphqlResult.data.listShopmenus.items;
      console.log("fetchMenus", menus);
      const result: JSX.Element[] = menus.map((menuObj: any, index: number) => {
        return (
          <tr key={index}>
            <td className="text-center">{menuObj.menu}</td>
            <td className="text-center">
              {menuObj.amountOfMoney.toLocaleString()}円
            </td>
            <td className="text-center">{menuObj.treatmentTime}分</td>
            <td className="text-center">{menuObj.detail}</td>
            <td className="text-center">
              <button onClick={() => onClickDeleteButton(index)}>封印</button>
            </td>
          </tr>
        );
      });
      setMenu(result);
    } catch (err) {
      console.log("error fetching todos");
    }
  }

  function onChangeInputMenu(e: any) {
    const copyMenuStateObj = JSON.parse(JSON.stringify(menuStateObj));
    copyMenuStateObj["menu"] = e.target.value;
    setmenuStateObj(copyMenuStateObj);
  }
  function onChangeInputAmountOfMoney(e: any) {
    const copyMenuStateObj = JSON.parse(JSON.stringify(menuStateObj));
    copyMenuStateObj["amountOfMoney"] = e.target.value;
    setmenuStateObj(copyMenuStateObj);
  }
  function onChangeInputTreatmentTime(e: any) {
    const copyMenuStateObj = JSON.parse(JSON.stringify(menuStateObj));
    copyMenuStateObj["treatmentTime"] = e.target.value;
    setmenuStateObj(copyMenuStateObj);
  }
  function onChangeInputDetail(e: any) {
    const copyMenuStateObj = JSON.parse(JSON.stringify(menuStateObj));
    copyMenuStateObj["detail"] = e.target.value;
    setmenuStateObj(copyMenuStateObj);
  }

  async function addmenu() {
    const menuObj = {
      menu: menuStateObj.menu,
      detail: menuStateObj.detail,
      amountOfMoney: menuStateObj.amountOfMoney,
      treatmentTime: menuStateObj.treatmentTime,
    };

    console.log("menuObj: ", menuObj);
    try {
      if (!menuObj.menu) {
        console.log("====addmenuできてないよ=====");
        return;
      }
      await API.graphql({
        query: createShopmenu,
        variables: { input: menuObj },
      });
      console.log("====このデータ追加しました=====", menuObj);
    } catch (err) {
      console.log("error addmenu:", err);
    }
    alert(`メニュー「${menuObj.menu}」を提供できるようになりました。`);
    window.location.reload();
  }

  useEffect(() => {
    createTableElement();
  }, []);

  return (
    <div id="div-menu">
      <table className="table table-striped table-dark ">
        <tbody>
          <tr key={0}>
            <th className="text-center">めにゅ〜</th>
            <th className="text-center">料金</th>
            <th className="text-center">施術時間</th>
            <th className="text-center">詳細</th>
            <th className="text-center">操作</th>
          </tr>
          {menu}
        </tbody>
      </table>
      <div className="inputtext-center">
        <div className="text-center">
          <label>メニュー名</label>
          <input type="text" id="menu" onChange={(e) => onChangeInputMenu(e)} />
        </div>
        <div className="text-center">
          <label>　料金　　</label>
          <input
            type="text"
            placeholder="円"
            id="amountOfMoney"
            onChange={(e) => onChangeInputAmountOfMoney(e)}
          />
        </div>
        <div className="text-center">
          <label>施術時間　</label>
          <input
            type="text"
            placeholder="分"
            id="treatmentTime"
            onChange={(e) => onChangeInputTreatmentTime(e)}
          />
        </div>
        <div className="text-center">
          <label> 　詳細　　</label>
          <input
            type="text"
            placeholder="説明を入力"
            id="detail"
            onChange={(e) => onChangeInputDetail(e)}
          />
        </div>
        <div className="text-center">
          <button className="btn btn-dark" onClick={addmenu}>
            メニュー追加
          </button>
        </div>
      </div>
    </div>
  );
};
