import action from "../../utils/interfaces/actionReducer";
import { Player } from "../../utils/interfaces/player";

const titularReducer = (state: Player[] = [], action: action) => {
  switch (action.type) {
    case "ADD_TITULAR": {
      return (state = [...state, action.payload]);
    }
    case "REMOVE_TITULAR": {
      return (state = state.filter((s) => s.id !== action.payload));
    }
    default:
      return state;
  }
};

export default titularReducer;
