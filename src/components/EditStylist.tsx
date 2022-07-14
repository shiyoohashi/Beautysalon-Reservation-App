import "./css/EditStylist.css";
import { useState, useEffect } from "react";
import { listStylists } from "../graphql/queries";
import { deleteStylist, createStylist } from "../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import { TypeOfStylist } from "../global";

export const EditStylist = () => {
  const [stylist, setStylist] = useState<JSX.Element[]>();
  const [stylistName, setStylistName] = useState();

  useEffect(() => {
    createTableElement();
  }, []);

  async function fetchStylists() {
    try {
      const graphqlResult: any = await API.graphql(
        graphqlOperation(listStylists)
      );
      const stylists: [TypeOfStylist] = graphqlResult.data.listStylists.items;
      return stylists;
    } catch (err) {
      console.log("error fetching todos");
      return [];
    }
  }

  async function delstylist(deleteStylistObj: TypeOfStylist) {
    try {
      await API.graphql({
        query: deleteStylist,
        variables: { input: { id: deleteStylistObj.id } },
      });
      console.log("====deleted=====", deleteStylistObj);
      alert(`スタイリスト「${deleteStylistObj.name}」を破門しました。`);
      window.location.reload();
    } catch (err) {
      console.log("error deleteStylist:", err);
    }
  }

  async function onClickDeleteButton(index: number) {
    const result: boolean = window.confirm(`スタイリストを破門しますか？`);
    if (result) {
      const deleteStylistObj: [TypeOfStylist] | never[] = await fetchStylists();
      if (deleteStylistObj === []) {
        console.log("削除対象がなかったため処理失敗");
      } else {
        delstylist(deleteStylistObj[index]);
      }
    }
  }

  async function createTableElement() {
    try {
      const stylists: [TypeOfStylist] | never[] = await fetchStylists();
      const result: JSX.Element[] = stylists.map(
        (stylistObj: TypeOfStylist, index: number) => {
          return (
            <tr key={index}>
              <td className="text-center">{stylistObj.name}</td>
              <td className="text-center">
                <button onClick={() => onClickDeleteButton(index)}>破門</button>
              </td>
            </tr>
          );
        }
      );
      setStylist(result);
    } catch (err) {
      console.log("error createTableElement todos", err);
    }
  }

  function onChangeInput(e: any) {
    setStylistName(e.target.value);
  }

  async function addStylist() {
    const stylistsObj = {
      name: stylistName,
    };
    try {
      await API.graphql({
        query: createStylist,
        variables: { input: stylistsObj },
      });
      console.log("====stylist added====", stylistsObj);
      alert(`スタイリスト「${stylistsObj.name}」と盃を交わしました。`);
      window.location.reload();
    } catch (err) {
      console.log("error addStylist:", err);
    }
  }

  return (
    <div id="div-stylist">
      <table className="table table-striped table-dark ">
        <tbody>
          <tr key={0}>
            <th className="text-center">スタイリスト名</th>
            <th className="text-center">操作</th>
          </tr>
          {stylist}
        </tbody>
      </table>
      <div className="inputtext-center">
        <input
          type="text"
          id="stylistName"
          placeholder="スタイリスト名をここに入力"
          onChange={(e) => onChangeInput(e)}
        />
        <button className="btn btn-dark" onClick={addStylist}>
          スタイリスト追加
        </button>
      </div>
    </div>
  );
};
