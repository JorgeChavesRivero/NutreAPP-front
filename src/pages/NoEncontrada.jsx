import { Link } from "react-router-dom";

export default function NoEncontrada() {
  return (
    <main className="contenido contenido--centrado">
      <h1>No encontramos esa página.</h1>
      <p>Revisa la dirección o vuelve al registro.</p>
      <Link className="boton boton--chico" to="/registro">
        Ir al registro
      </Link>
    </main>
  );
}
