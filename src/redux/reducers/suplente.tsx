import action from "../../utils/interfaces/actionReducer";
import { Player } from "../../utils/interfaces/player";

const suplenteReducer = (state: Player[] = [], action: action) => {
  switch (action.type) {
    case "ADD_SUPLENTE": {
      return (state = [...state, action.payload]);
    }
    case "REMOVE_SUPLENTE": {
      return (state = state.filter((s) => s.id !== action.payload));
    }
    default:
      return state;
  }
};

export default suplenteReducer;
