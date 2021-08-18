export type containerId =
  | "contenedorTitular"
  | "contenedorReserva"
  | "contenedorSuplente";

export interface Player {
  id: string;
  name: string;
  photo: string;
  containerId: containerId;
}
