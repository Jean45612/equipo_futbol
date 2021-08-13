import { useEffect } from "react";
import axios from "axios";
import { Player } from "../../utils/interfaces/player";
import { failServer, setEquipo, setReserva } from "../../redux/actions/index";
import { useAppDispatch, useAppSelector } from "../../hooks/hooksRedux";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { PlayerItem } from "../common/PlayerItem";
import { useDroppable } from "@dnd-kit/core";

const Equipo = () => {
  const players = useAppSelector((state) => state.reserva);
  const dispatch = useAppDispatch();

  const id: string = "contenedorReserva";

  const { setNodeRef } = useDroppable({
    id,
  });

  useEffect(() => {
    axios
      .get("https://randomuser.me/api/?results=18&gender=male&noinfo")
      .then(function (response) {
        //SETEANDO DATOS
        const results: Player[] = response.data.results.map(
          (r: any, index: number) => {
            return {
              id: `E${index + 1}`,
              name: `${r.name.first} ${r.name.last}`,
              photo: r.picture.thumbnail,
              isSelected: false,
            };
          }
        );
        dispatch(setEquipo(results));
        dispatch(setReserva(results));
      })
      .catch(function (error) {
        dispatch(failServer());
      });
  }, []);

  return (
    <SortableContext
      id={id}
      items={players.map((p: Player) => p.id)}
      strategy={rectSortingStrategy}
    >
      <div className="box-equipo" ref={setNodeRef}>
        <p className="box-equipo__titulo">Equipo</p>
        <div className="box-equipo__contenedor" >
          {players.map((p: Player) => (
            <PlayerItem key={p.id} player={p} />
          ))}
        </div>
      </div>
    </SortableContext>
  );
};

export default Equipo;
