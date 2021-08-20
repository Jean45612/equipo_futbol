import action from "../../utils/interfaces/actionReducer";
import { contenedorPlayers } from "../../utils/interfaces/contenedorPlayers";

const equipoReducer = (
  state: contenedorPlayers = { reserva: [], titulares: [], suplentes: [] },
  action: action
) => {
  switch (action.type) {
    case "SET_EQUIPO": {
      return (state = action.payload);
    }
    default:
      return state;
  }
};

export default equipoReducer;
