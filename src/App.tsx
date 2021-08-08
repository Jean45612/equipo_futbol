import { useAppDispatch, useAppSelector } from "./hooks/hooksRedux";
import Alineacion from "./components/layout/Alineacion";
import Equipo from "./components/layout/Equipo";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";

import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { setTeam } from "./redux/actions";
import { Player } from "./utils/interfaces/player";
import { PlayerItem } from "./components/common/PlayerItem";
import { useState } from "react";

function App() {
  const server = useAppSelector((state) => state.server);
  const equipo = useAppSelector((state) => state.equipo);
  const [activeId, setActiveId] = useState();
  const dispatch = useAppDispatch();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: any) => {
    const { active } = event;
    const { id } = active;

    setActiveId(equipo.findIndex((i: Player) => i.id === id));
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = equipo.findIndex((i: Player) => i.id === active.id);
      const newIndex = equipo.findIndex((i: Player) => i.id === over.id);

      dispatch(setTeam(arrayMove(equipo, oldIndex, newIndex)));
    }
  };

  // const findContainer = (id: any) => {
  //   if (id in items) {
  //     return id;
  //   }

  //   return Object.keys(items).find((key) => items[key].includes(id));
  // };

  // const handleDragOver = (event: any) => {
  //   console.log("e", event);
  //   const { active, over, draggingRect } = event;
  //   const { id } = active;
  //   const { id: overId } = over;

  //   // Find the containers
  //   const activeContainer = findContainer(id);
  //   const overContainer = findContainer(overId);

  //   if (
  //     !activeContainer ||
  //     !overContainer ||
  //     activeContainer === overContainer
  //   ) {
  //     return;
  //   }

  //   setItems((prev) => {
  //     const activeItems = prev[activeContainer];
  //     const overItems = prev[overContainer];

  //     // Find the indexes for the items
  //     const activeIndex = activeItems.indexOf(id);
  //     const overIndex = overItems.indexOf(overId);

  //     let newIndex;
  //     if (overId in prev) {
  //       // We're at the root droppable of a container
  //       newIndex = overItems.length + 1;
  //     } else {
  //       const isBelowLastItem =
  //         over &&
  //         overIndex === overItems.length - 1 &&
  //         draggingRect.offsetTop > over.rect.offsetTop + over.rect.height;

  //       const modifier = isBelowLastItem ? 1 : 0;

  //       newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
  //     }

  //     return {
  //       ...prev,
  //       [activeContainer]: [
  //         ...prev[activeContainer].filter((item) => item !== active.id),
  //       ],
  //       [overContainer]: [
  //         ...prev[overContainer].slice(0, newIndex),
  //         items[activeContainer][activeIndex],
  //         ...prev[overContainer].slice(newIndex, prev[overContainer].length),
  //       ],
  //     };
  //   });
  // };

  return (
    <>
      {server ? (
        <div className="App">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            // onDragOver={handleDragOver}
          >
            <Equipo />
            <Alineacion />
            {/* <DragOverlay>{activeId ? <PlayerItem player={activeId} /> : null}</DragOverlay> */}
          </DndContext>
        </div>
      ) : (
        <h1>HAY UN PROBLEMA EN EL SERVIDOR</h1>
      )}
    </>
  );
}

export default App;
