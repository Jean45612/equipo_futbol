import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { useAppSelector } from "../../hooks/hooksRedux";
import { containerId, Player } from "../../utils/interfaces/player";
import { PlayerItem } from "../common/PlayerItem";

const Titulares = () => {
  const titulares = useAppSelector((state) =>
    state.equipo.filter((r: Player) => r.containerId === "contenedorTitular")
  );

  const id: containerId = "contenedorTitular";

  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <>
      <SortableContext
        id={id}
        items={titulares.map((t: Player) => t.id)}
        strategy={rectSortingStrategy}
      >
        <div ref={setNodeRef}>
          <p className="box-equipo__titulo">Titulares</p>

          <div className="box-equipo__contenedor box-equipo__contenedor--border">
            {titulares.map((p: Player) => (
              <PlayerItem key={p.id} player={p} />
            ))}
          </div>
        </div>
      </SortableContext>
      <br />
    </>
  );
};

export default Titulares;
