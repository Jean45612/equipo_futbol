import { Player } from "../../utils/interfaces/player";

export const failServer = () => {
  return {
    type: "FAILSERVER",
  };
};

export const setEquipo = (t: Player[]) => {
  return {
    type: "SET_EQUIPO",
    payload: t,
  };
};

export const setReserva = (t: Player[]) => {
  return {
    type: "SET_RESERVA",
    payload: t,
  };
};

export const addReserva = (p: Player) => {
  return {
    type: "ADD_RESERVA",
    payload: p,
  };
};

export const removeReserva = (p: Player) => {
  return {
    type: "REMOVE_RESERVA",
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
