import { listReserves } from "../../graphql/queries";
import { createReserve, deleteReserve } from "../../graphql/mutations";
import { TypeOfReserve } from "../../global";
import { fetchReserveObj } from "../../components/Home";
import awsmobile from "../../aws-exports";
import Amplify, { API, graphqlOperation } from "aws-amplify";
Amplify.configure(awsmobile);

const testReserveObj: TypeOfReserve = {
  date: String(new Date()),
  menu: "テストカット",
  stylistId: 777,
  customerId: "テストさん",
};

async function fetchReserves() {
  const graphqlListReserves: any = await API.graphql(
    graphqlOperation(listReserves)
  );
  const reserves: [TypeOfReserve] = graphqlListReserves.data.listReserves.items;
  return reserves;
}

async function fncCreateReserve() {
  await API.graphql({
    query: createReserve,
    variables: { input: testReserveObj },
  });
}

async function fncDeleteReserve(reserveObj: TypeOfReserve) {
  await API.graphql({
    query: deleteReserve,
    variables: { input: { id: reserveObj.id } },
  });
}

async function fncDeleteReserves() {
  const graphqlResult: any = await API.graphql(graphqlOperation(listReserves));
  const reserves: [TypeOfReserve] = graphqlResult.data.listReserves.items;
  for (const reserveObj of reserves) {
    await fncDeleteReserve(reserveObj);
  }
}

describe("test Backend Home", () => {
  test("fetchReserves test and fncCreateReserve test", async () => {
    await fncCreateReserve();
    const reserveObj: TypeOfReserve | undefined = await fetchReserveObj(
      testReserveObj.customerId
    );
    expect(reserveObj?.customerId).toEqual("テストさん");
    // テーブルを空にする処理
    await fncDeleteReserves();
    console.log("fetchReserves(): ", await fetchReserves());
  });
});
