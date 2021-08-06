import action from "../../utils/interfaces/actionReducer";

const serverReducer = (state: boolean = true, action: action) => {
  switch (action.type) {
    case "FAILSERVER":
      return !state;
    default:
      return state;
  }
};

export default serverReducer;
