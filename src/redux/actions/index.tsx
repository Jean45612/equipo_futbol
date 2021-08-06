import { Player } from "../../utils/interfaces/player";

export const failServer = () => {
  return {
    type: "FAILSERVER",
  };
};

export const setTeam = (t: Player[]) => {
  return {
    type: "SET_TEAM",
    payload: t,
  };
};

export const addJugador = (p: Player) => {
  return {
    type: "ADD_JUGADOR",
    payload: p,
  };
};

export const removeJugador = (p: Player) => {
  return {
    type: "REMOVE_JUGADOR",
    payload: p,
  };
};

export const addTitular = (p: Player) => {
  return {
    type: "ADD_TITULAR",
    payload: p,
  };
};

export const removeTitular = (p: Player) => {
  return {
    type: "REMOVE_TITULAR",
    payload: p,
  };
};

export const addSuplente = (p: Player) => {
  return {
    type: "ADD_SUPLENTE",
    payload: p,
  };
};

export const removeSuplente = (p: Player) => {
  return {
    type: "REMOVE_SUPLENTE",
    payload: p,
  };
};
