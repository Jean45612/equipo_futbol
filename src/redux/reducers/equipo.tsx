import action from "../../utils/interfaces/actionReducer";
import { Player } from "../../utils/interfaces/player";

const equipoReducer = (state: Player[] = [], action: action) => {
  switch (action.type) {
    case "SET_TEAM": {
      return (state = action.payload);
    }
    case "ADD_JUGADOR": {
      return (state = [...state, action.payload]);
    }
    case "REMOVE_JUGADOR": {
      return (state = state.filter((s) => s.id !== action.payload));
    }
    default:
      return state;
  }
};

export default equipoReducer;
