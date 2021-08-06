import { combineReducers } from "redux";
import serverReducer from "./server";
import equipoReducer from "./equipo";
import titularReducer from "./titular";
import suplenteReducer from "./suplente";

const allReducers = combineReducers({
  server: serverReducer,
  equipo: equipoReducer,
  titular: titularReducer,
  suplente: suplenteReducer,
});

export default allReducers;
