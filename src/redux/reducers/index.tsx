import { combineReducers } from "redux";
import serverReducer from "./server";
import equipoReducer from "./equipo";

const allReducers = combineReducers({
  server: serverReducer,
  equipo: equipoReducer,
});

export default allReducers;
