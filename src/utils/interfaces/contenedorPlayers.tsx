import { Player } from "./player";

export interface contenedorPlayers {
  reserva: Player[];
  titulares: Player[];
  suplentes: Player[];
}
