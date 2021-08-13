import { useAppDispatch, useAppSelector } from "./hooks/hooksRedux";
import Equipo from "./components/layout/Equipo";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useState } from "react";
import Titulares from "./components/layout/Titulares";
import Suplentes from "./components/layout/Suplentes";

function App() {
  const server = useAppSelector((state) => state.server);
  const equipo = useAppSelector((state) => state.equipo);

  const [activePlayer, setActivePlayer] = useState();

  const dispatch = useAppDispatch();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <>
      {server ? (
        <div className="App">
          <DndContext
            sensors={sensors}
            // onDragEnd={handleDragEnd}
            // onDragOver={handleDragOver}
          >
            <Equipo />
            <Titulares/>
            <Suplentes />
            {/* <Alineacion /> */}
          </DndContext>
        </div>
      ) : (
        <h1>HAY UN PROBLEMA EN EL SERVIDOR</h1>
      )}
    </>
  );
}

export default App;
