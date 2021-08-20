import { contenedorPlayers } from "../../utils/interfaces/contenedorPlayers";

export const failServer = () => {
  return {
    type: "FAILSERVER",
  };
};

export const setEquipo = (t: contenedorPlayers) => {
  return {
    type: "SET_EQUIPO",
    payload: t,
  };
};
