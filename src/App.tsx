import { useAppSelector } from "./hooks/hooksRedux";
import Alineacion from "./components/layout/Alineacion";
import Equipo from "./components/layout/Equipo";

function App() {
  const server = useAppSelector((state) => state.server);

  return (
    <>
      {server ? (
        <div className="App">
          <Equipo />
          <Alineacion />
        </div>
      ) : (
        <h1>HAY UN PROBLEMA EN EL SERVIDOR</h1>
      )}
    </>
  );
}

export default App;
