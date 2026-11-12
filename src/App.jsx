import { Navigate, Route, Routes } from "react-router-dom";
import Registro from "./pages/Registro.jsx";
import Videos from "./pages/Videos.jsx";
import NoEncontrada from "./pages/NoEncontrada.jsx";
import RutaProtegida from "./components/RutaProtegida.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/registro" replace />} />
      <Route path="/registro" element={<Registro />} />
      <Route
        path="/videos"
        element={
          <RutaProtegida>
            <Videos />
          </RutaProtegida>
        }
      />
      <Route path="*" element={<NoEncontrada />} />
    </Routes>
  );
}
