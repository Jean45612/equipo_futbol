import { useAppDispatch, useAppSelector } from "./hooks/hooksRedux";
import Equipo from "./components/layout/Equipo";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useState } from "react";
import Alineacion from "./components/layout/Alineacion";
import { PlayerItem } from "./components/common/PlayerItem";
import { Player } from "./utils/interfaces/player";

function App() {
  const server = useAppSelector((state) => state.server);
  const equipo = useAppSelector((state) => state.equipo);
  const reserva = useAppSelector((state) =>
    state.equipo.filter((r: Player) => r.containerId === "contenedorReserva")
  );
  const titulares = useAppSelector((state) =>
    state.equipo.filter((r: Player) => r.containerId === "contenedorTitular")
  );

  const [activePlayer, setActivePlayer] = useState<Player>();

  const dispatch = useAppDispatch();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const findContainerId = (id: string) => {
    // SI EL ID ES EL ID DE UNO DE LOS CONTENEDORES
    if (
      ["contenedorTitular", "contenedorReserva", "contenedorSuplente"].some(
        (element) => element === id
      )
    ) {
      return id;
    }

    // SI ESTA SIENDO SOLTADO EN UN CONTENEDOR, DEVOLVEMOS EL ID DEL CONTENEDOR

    return equipo.find((e: Player) => e.id === id).containerId;
  };

  const handleDragStart = (event: any) => {
    const { active } = event;
    const { id } = active;

    setActivePlayer(equipo.find((e: Player) => e.id === id));
  };

  const handleDragOver = (event: any) => {
    console.log("event", event);

    const { active, over } = event;

    if (!over) return;

    const { id } = active;

    const { id: overId } = over;

    const activeContainer = findContainerId(id);
    const overContainer = findContainerId(overId);

    // console.log("active", activeContainer);
    // console.log("over", overContainer);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    // setItems((prev) => {
    //   const activeContainerItems = prev[activeContainer];
    //   const overContainerItems = prev[overContainer];

    //   // Find the indexes for the items
    //   const activeIndex = activeContainerItems.findIndex(
    //     (item) => item.code === id
    //   );
    //   const overIndex = overContainerItems.findIndex(
    //     (item) => item.code === overId
    //   );

    //   let newIndex; // new index of dragging item

    //   if (overId in prev) {
    //     // TODO: check here
    //     // We're at the root droppable of a container
    //     newIndex = overContainerItems.length + 1;
    //   } else {
    //     const isBelowLastItem =
    //       over &&
    //       overIndex === overContainerItems.length - 1 &&
    //       draggingRect.offsetTop > over.rect.offsetTop + over.rect.height;

    //     const modifier = isBelowLastItem ? 1 : 0;

    //     newIndex =
    //       overIndex >= 0 ? overIndex + modifier : overContainerItems.length + 1;
    //   }

    //   return {
    //     ...prev,
    //     [activeContainer]: [
    //       ...prev[activeContainer].filter((item) => item.code !== active.id),
    //     ],
    //     [overContainer]: [
    //       ...prev[overContainer].slice(0, newIndex),
    //       items[activeContainer][activeIndex],
    //       ...prev[overContainer].slice(newIndex, prev[overContainer].length),
    //     ],
    //   };
    // });
  };

  return (
    <>
      {server ? (
        <div className="App">
          <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            // onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
          >
            <Equipo />
            <Alineacion />
            <DragOverlay
              dropAnimation={{
                dragSourceOpacity: 0.8,
                duration: 800,
                easing: "ease",
              }}
            >
              {activePlayer ? <PlayerItem player={activePlayer} /> : null}
            </DragOverlay>
          </DndContext>
        </div>
      ) : (
        <h1>HAY UN PROBLEMA EN EL SERVIDOR</h1>
      )}
    </>
  );
}

export default App;
