import { useEffect } from "react";
import axios from "axios";
import { Player } from "../../utils/interfaces/player";
import { failServer, setTeam } from "../../redux/actions/index";
import { useAppDispatch, useAppSelector } from "../../hooks/hooksRedux";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { PlayerItem } from "../common/PlayerItem";

const Equipo = () => {
  const players = useAppSelector((state) => state.equipo);
  const dispatch = useAppDispatch();

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
        dispatch(setTeam(results));
      })
      .catch(function (error) {
        // Swal.fire({
        //   icon: "warning",
        //   title: "Oops...",
        //   text: "Hubo un problema con nuestro servidor, pronto lo solucionaremos.",
        //   timer: 3000,
        // });

        dispatch(failServer());
      });
  }, []);

  return (
    <SortableContext items={players} strategy={rectSortingStrategy}>
      <div className="box-equipo">
        <p className="box-equipo__titulo">Equipo</p>
        <div className="box-equipo__contenedor">
          {players.map((p: Player) => (
            <PlayerItem key={p.id} player={p} />
          ))}
        </div>
      </div>
    </SortableContext>
  );
};

export default Equipo;
