import action from "../../utils/interfaces/actionReducer";
import { Player } from "../../utils/interfaces/player";

const equipoReducer = (state: Player[] = [], action: action) => {
  switch (action.type) {
    case "SET_EQUIPO": {
      return (state = action.payload);
    }
    default:
      return state;
  }
};

export default equipoReducer;
