import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { useAppSelector } from "../../hooks/hooksRedux";
import { Player } from "../../utils/interfaces/player";
import { PlayerItem } from "../common/PlayerItem";

const Titulares = () => {
  const titulares = useAppSelector((state) => state.titular);
  return (
    <>
      <SortableContext items={titulares} strategy={rectSortingStrategy}>
        <p className="box-equipo__titulo">Titulares</p>

        <div className="box-equipo__contenedor box-equipo__contenedor--border">
          {titulares.map((p: Player) => (
            <PlayerItem key={p.id} player={p} />
          ))}
        </div>
      </SortableContext>
      <br />
    </>
  );
};

export default Titulares;
