import { combineReducers } from "redux";
import serverReducer from "./server";
import equipoReducer from "./equipo";
import titularReducer from "./titular";
import suplenteReducer from "./suplente";
import reservaReducer from "./reserva";

const allReducers = combineReducers({
  server: serverReducer,
  equipo: equipoReducer,
  titular: titularReducer,
  suplente: suplenteReducer,
  reserva: reservaReducer
});

export default allReducers;
