import "./EditStylist.css";
import { useState, useEffect } from "react";
import { listStylists } from "../graphql/queries";
import { deleteStylist, createStylist } from "../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import { TypeOfStylist } from "../global";

export const EditStylist = () => {
  const [stylist, setStylist] = useState<JSX.Element[]>();
  const [stylistName, setStylistName] = useState();

  async function fetchStylists() {
    try {
      const graphqlResult: any = await API.graphql(
        graphqlOperation(listStylists)
      );
      const stylists: [TypeOfStylist] = graphqlResult.data.listStylists.items;
      return stylists;
    } catch (err) {
      console.log("error fetching todos");
    }
  }

  async function delstylist(deleteStylistObj: TypeOfStylist) {
    try {
      if (
        !deleteStylistObj.id ||
        !deleteStylistObj.name ||
        !deleteStylistObj.createdAt ||
        !deleteStylistObj.updatedAt
      ) {
        console.log("====deleteStylistできてないよ=====");
        return;
      }
      await API.graphql({
        query: deleteStylist,
        variables: { input: { id: deleteStylistObj.id } },
      });
      console.log("====このデータ消しました=====", deleteStylistObj);
    } catch (err) {
      console.log("error deleteStylist:", err);
    }
    alert(`スタイリスト「${deleteStylistObj.name}」を破門しました。`);
    window.location.reload();
  }

  async function onClickDeleteButton(index: number) {
    const result: boolean = window.confirm(`スタイリストを破門しますか？`);
    if (result) {
      const deleteStylistObj: [TypeOfStylist] | undefined =
        await fetchStylists();
      if (deleteStylistObj) {
        delstylist(deleteStylistObj[index]);
      }
    }
  }

  async function createTableElement() {
    try {
      const graphqlResult: any = await API.graphql(
        graphqlOperation(listStylists)
      );
      const stylists: [TypeOfStylist] = graphqlResult.data.listStylists.items;
      console.log("fetchStylists", stylists);
      const result: JSX.Element[] = stylists.map(
        (stylistObj: any, index: number) => {
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
      console.log("error fetching todos");
    }
  }

  function onChangeInput(e: any) {
    setStylistName(e.target.value);
  }

  async function addStylist() {
    const stylistsObj = {
      name: stylistName,
    };

    console.log("stylistsObj: ", stylistsObj);
    try {
      if (!stylistsObj.name) {
        console.log("====addStylistできてないよ=====");
        return;
      }
      await API.graphql({
        query: createStylist,
        variables: { input: stylistsObj },
      });
      console.log("====このデータ追加しました=====", stylistsObj);
    } catch (err) {
      console.log("error addStylist:", err);
    }
    alert(`スタイリスト「${stylistsObj.name}」と盃を交わしました。`);
    window.location.reload();
  }

  useEffect(() => {
    createTableElement();
  }, []);

  return (
    <div id="div-stylist">
      <table className="table table-striped table-dark ">
        <tbody>
          <tr key={0}>
            <th className="text-center">スタイリスチョ</th>
            <th className="text-center">操作</th>
          </tr>
          {stylist}
        </tbody>
      </table>
      <div className="text-center">
        <input
          type="text"
          id="stylistName"
          onChange={(e) => onChangeInput(e)}
        />
        <button className="btn btn-dark" onClick={addStylist}>
          スタイリスト追加
        </button>
      </div>
    </div>
  );
};
