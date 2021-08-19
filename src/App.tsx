import { useAppDispatch, useAppSelector } from "./hooks/hooksRedux";
import Equipo from "./components/layout/Equipo";
import {
  closestCorners,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useState } from "react";
import Alineacion from "./components/layout/Alineacion";
import { PlayerItem } from "./components/common/PlayerItem";
import { containerId, Player } from "./utils/interfaces/player";
import { setEquipo, updatePlayer } from "./redux/actions";

function App() {
  const server = useAppSelector((state) => state.server);
  const equipo = useAppSelector((state) => state.equipo);
  const reserva = useAppSelector((state) =>
    state.equipo.filter((p: Player) => p.containerId === "contenedorReserva")
  );
  const titulares = useAppSelector((state) =>
    state.equipo.filter((p: Player) => p.containerId === "contenedorTitular")
  );
  const suplentes = useAppSelector((state) =>
    state.equipo.filter((p: Player) => p.containerId === "contenedorSuplente")
  );

  const [activePlayer, setActivePlayer] = useState<Player>();

  const dispatch = useAppDispatch();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const findContainerId = (id: string): containerId => {
    // SI EL ID ES EL ID DE UNO DE LOS CONTENEDORES
    if (idIsContainer(id)) {
      return id as containerId;
    }

    // SI ESTA SIENDO SOLTADO EN UN CONTENEDOR, DEVOLVEMOS EL ID DEL CONTENEDOR

    return equipo.find((e: Player) => e.id === id).containerId;
  };

  const getItemsContainer = (id: string): Player[] => {
    switch (id) {
      case "contenedorTitular":
        return titulares;
      case "contenedorReserva":
        return reserva;
      case "contenedorSuplente":
        return suplentes;
      default:
        return [];
    }
  };

  const idIsContainer = (id: string): boolean => {
    if (
      ["contenedorTitular", "contenedorReserva", "contenedorSuplente"].some(
        (element) => element === id
      )
    ) {
      return true;
    }

    return false;
  };

  const handleDragStart = ({ active }: any) => {
    const { id } = active;

    //Mostramos el drag overlay
    setActivePlayer(equipo.find((e: Player) => e.id === id));
  };

  const handleDragOver = ({ over, active }: any) => {
    // console.log("over", over);
    // console.log("active", active);

    const overId = over?.id;

    if (!overId) {
      return;
    }

    //Obtenemos los id de los contenedores
    const overContainer = findContainerId(overId);
    const activeContainer = findContainerId(active.id);

    // console.log("over container", overContainer);
    // console.log("active contanter", activeContainer);

    if (!overContainer || !activeContainer) {
      return;
    }

    if (activeContainer !== overContainer) {
      const activeItems = getItemsContainer(activeContainer);
      const overItems = getItemsContainer(overContainer);

      // console.log("active items", activeItems);
      // console.log("over items", overItems);

      const overIndex = overItems.findIndex(
        (item: Player) => item.id === overId
      );
      const activeIndex = activeItems.findIndex(
        (item: Player) => item.id === active.id
      );

      // console.log("active index", activeIndex);
      // console.log("over index", overIndex);

      let newIndex: number;

      if (idIsContainer(overId)) {
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem =
          over &&
          overIndex === overItems.length - 1 &&
          active.rect.current.translated &&
          active.rect.current.translated.offsetTop >
            over.rect.offsetTop + over.rect.height;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      // console.log("newIndex", newIndex);

      dispatch(
        updatePlayer(activeItems[activeIndex].id, newIndex, overContainer)
      );
    }
  };

  const handleDragEnd = ({ active, over }: any) => {
    const activeContainer = findContainerId(active.id);

    if (!activeContainer) {
      setActivePlayer(undefined);
      return;
    }

    const overId = over?.id;

    // const overId = over?.id || VOID_ID;

    // if (overId === VOID_ID) {
    //   setItems((items) => ({
    //     ...(trashable && over?.id === VOID_ID ? items : clonedItems),
    //     [VOID_ID]: [],
    //   }));
    //   setActivePlayer(undefined);
    //   return;
    // }

    const overContainer = findContainerId(overId);

    if (activeContainer && overContainer) {
      const activeItems = getItemsContainer(activeContainer);
      const overItems = getItemsContainer(overContainer);

      const overIndex = overItems.findIndex(
        (item: Player) => item.id === overId
      );
      const activeIndex = activeItems.findIndex(
        (item: Player) => item.id === active.id
      );

      if (activeIndex !== overIndex) {
        dispatch(setEquipo(arrayMove(equipo, activeIndex, overIndex)));
      }
    }

    setActivePlayer(undefined);
  };

  return (
    <>
      {server ? (
        <div className="App">
          <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
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
