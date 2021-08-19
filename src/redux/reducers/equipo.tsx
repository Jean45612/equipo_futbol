import { arrayMove } from "@dnd-kit/sortable";
import action from "../../utils/interfaces/actionReducer";
import { Player } from "../../utils/interfaces/player";

const equipoReducer = (state: Player[] = [], action: action) => {
  switch (action.type) {
    case "SET_EQUIPO": {
      return (state = action.payload);
    }
    case "UPDATE_PLAYER": {
      const index = state.findIndex((p: Player) => p.id === action.payload.id);

      state[index].containerId = action.payload.containerId;

      return arrayMove(state, index, action.payload.newIndex);
    }
    default:
      return state;
  }
};

export default equipoReducer;
