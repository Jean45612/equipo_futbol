import action from "../../utils/interfaces/actionReducer";
import { Player } from "../../utils/interfaces/player";

const reservaReducer = (state: Player[] = [], action: action) => {
  switch (action.type) {
    case "SET_RESERVA": {
      return (state = action.payload);
    }
    case "ADD_RESERVA": {
      return (state = [...state, action.payload]);
    }
    case "REMOVE_RESERVA": {
      return (state = state.filter((s) => s.id !== action.payload));
    }
    default:
      return state;
  }
};

export default reservaReducer;
