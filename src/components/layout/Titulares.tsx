import React from "react";
import { useAppSelector } from "../../hooks/hooksRedux";
import { Player } from "../../utils/interfaces/player";

const Titulares = () => {
  const titulares = useAppSelector((state) => state.titular);
  return (
    <>
      <p className="box-equipo__titulo">Equipo</p>
      {titulares.length > 0 && (
        <div className="box-equipo__contenedor box-equipo__contenedor--border">
          {titulares.map((p: Player) => (
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
      )}

      <br />
    </>
  );
};

export default Titulares;
