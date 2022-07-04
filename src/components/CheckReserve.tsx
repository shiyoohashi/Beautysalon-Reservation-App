import { useLocation } from "react-router-dom";
import { TypeOfReserve } from "../global";

interface State {
  reservations: TypeOfReserve[];
}
export const CheckReserve = () => {
  const location = useLocation();
  const { reservations } = location.state as State;

  return <div>{reservations[0].menu}</div>;
};
