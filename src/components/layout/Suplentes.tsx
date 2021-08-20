import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { useAppSelector } from "../../hooks/hooksRedux";
import { containerId, Player } from "../../utils/interfaces/player";
import { PlayerItem } from "../common/PlayerItem";

const Suplentes = () => {
  const suplentes = useAppSelector((state) => state.equipo.suplentes);

  const id: containerId = "suplentes";

  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <SortableContext
      id={id}
      items={suplentes.map((p: Player) => p.id)}
      strategy={rectSortingStrategy}
    >
      <div ref={setNodeRef}>
        <p className="box-equipo__titulo">Suplentes</p>

        <div className="box-equipo__contenedor box-equipo__contenedor--border">
          {suplentes.map((p: Player) => (
            <PlayerItem key={p.id} player={p} />
          ))}
        </div>
      </div>
    </SortableContext>
  );
};

export default Suplentes;
