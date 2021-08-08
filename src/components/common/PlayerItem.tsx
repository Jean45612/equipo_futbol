import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Player } from "../../utils/interfaces/player";

interface IProps {
  player: Player;
}

export function PlayerItem({ player }: IProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: player.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  } as React.CSSProperties;

  return (
    <div
      className="box-equipo__contenedor__jugador"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <img
        className="box-equipo__contenedor__jugador__img"
        src={player.photo}
        alt=""
      />
      <span className="box-equipo__contenedor__jugador__tooltip tooltip tooltip--top">
        {player.name}
      </span>
    </div>
  );
}
