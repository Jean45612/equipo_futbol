import { containerId, Player } from "../../utils/interfaces/player";

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

export const updatePlayer = (id: string, index: number, c: containerId) => {
  return {
    type: "UPDATE_PLAYER",
    payload: { id: id, newIndex: index, containerId: c },
  };
};
