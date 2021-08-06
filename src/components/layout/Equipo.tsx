import React, { useEffect } from "react";
import axios from "axios";
import { Player } from "../../utils/interfaces/player";
import { failServer, setTeam } from "../../redux/actions/index";
import { useAppDispatch, useAppSelector } from "../../hooks/hooksRedux";

const Equipo = () => {
  const players = useAppSelector((state) => state.equipo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    axios
      .get("https://randomuser.me/api/?results=18&gender=male&noinfo")
      .then(function (response) {
        // console.log("res", response);

        //SETEANDO DATOS
        const results: Player[] = response.data.results.map(
          (r: any, index: number) => {
            return {
              id: index + 1,
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
    <div className="box-equipo">
      <p className="box-equipo__titulo">Equipo</p>
      <div className="box-equipo__contenedor">
        {players.map((p: Player) => (
          <div className="box-equipo__contenedor__jugador" key={p.id}>
            <img
              className="box-equipo__contenedor__jugador__img"
              src={p.photo}
              alt=""
            />
            <span className="box-equipo__contenedor__jugador__tooltip tooltip tooltip--top">
              {p.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Equipo;
