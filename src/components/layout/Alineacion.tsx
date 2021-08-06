import React from "react";
import Suplentes from "./Suplentes";
import Titulares from "./Titulares";

const Alineacion = () => {
  return (
    <div className="box-equipo">
      <Titulares />
      <Suplentes />
    </div>
  );
};

export default Alineacion;
