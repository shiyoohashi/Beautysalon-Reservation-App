import { listReserves } from "../../graphql/queries";
import {
  createReserve,
  updateReserve,
  deleteReserve,
} from "../../graphql/mutations";
import { TypeOfReserve } from "../../global";
// import { Menu } from "../../components/Menu";
// import { ReserveInfo } from "../../components/ReserveInfo";
// import { Admin } from "../../components/Admin";

import awsmobile from "../../aws-exports";
import Amplify, { API, graphqlOperation } from "aws-amplify";
Amplify.configure(awsmobile);

describe("test BShop", () => {
  test("renders learn react link", async () => {
    async function fetchReserves() {
      const graphqlListReserves: any = await API.graphql(
        graphqlOperation(listReserves)
      );
      const reserves: [TypeOfReserve] =
        graphqlListReserves.data.listReserves.items;
      console.log("fetch", reserves);
      const reserveObj = reserves.find((reservation) => {
        return reservation.customerId === sessionStorage.getItem("user");
      });
    }
  });
});
