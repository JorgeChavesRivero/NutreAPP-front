import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSesion } from "../context/SesionContext.jsx";
import { VIDEOS, CATEGORIAS_VIDEO } from "../data/videos.js";
import { DEPARTAMENTOS, ROLES, etiquetaDe } from "../constants/enums.js";

export default function Videos() {
  const { usuario, cerrar } = useSesion();
  const navigate = useNavigate();
  const [categoria, setCategoria] = useState("TODAS");

  const visibles = useMemo(
    () => (categoria === "TODAS" ? VIDEOS : VIDEOS.filter((v) => v.categoria === categoria)),
    [categoria]
  );

  const salir = () => {
    cerrar();
    navigate("/registro", { replace: true });
  };

  const opciones = [{ value: "TODAS", label: "Todos" }, ...CATEGORIAS_VIDEO];

  return (
    <div className="pagina-videos">
      <header className="barra">
        <p className="marca marca--oscura">Nutresa</p>
        <div className="barra__usuario">
          <span>
            {usuario.nombre} · {etiquetaDe(ROLES, usuario.rol)} ·{" "}
            {etiquetaDe(DEPARTAMENTOS, usuario.departamento)}
          </span>
          <button type="button" className="boton boton--texto" onClick={salir}>
            Cerrar sesión
          </button>
        </div>
      </header>

      <main className="contenido">
        <h1>Hola, {usuario.nombre.split(" ")[0]}. Estos son tus videos.</h1>

        <div className="filtros" role="group" aria-label="Filtrar por categoría">
          {opciones.map((o) => (
            <button
              key={o.value}
              type="button"
              className="filtro"
              aria-pressed={categoria === o.value}
              onClick={() => setCategoria(o.value)}
            >
              {o.label}
            </button>
          ))}
        </div>

        <ul className="lista-videos">
          {visibles.map((v) => (
            <li key={v.id} className="video">
              <div>
                <h2>{v.titulo}</h2>
                <p>
                  {CATEGORIAS_VIDEO.find((c) => c.value === v.categoria)?.label} · {v.duracion}
                </p>
              </div>
              {v.url ? (
                <a className="boton boton--chico" href={v.url} target="_blank" rel="noreferrer">
                  Ver video
                </a>
              ) : (
                <span className="pendiente">Por publicar</span>
              )}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
