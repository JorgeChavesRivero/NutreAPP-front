import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Campo from "../components/Campo.jsx";
import { DEPARTAMENTOS, ROLES, CATEGORIAS } from "../constants/enums.js";
import { LIMITES, validadores, validarTodo } from "../utils/validadores.js";
import { registrarUsuario } from "../services/usuarioService.js";
import { useSesion } from "../context/SesionContext.jsx";

const INICIAL = {
  nombre: "",
  correo: "",
  departamento: "",
  rol: "",
  contrasena: "",
  confirmacion: "",
};

export default function Registro() {
  const navigate = useNavigate();
  const { iniciar } = useSesion();
  const [valores, setValores] = useState(INICIAL);
  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [errorServidor, setErrorServidor] = useState("");
  const [verClave, setVerClave] = useState(false);

  const cambiar = (e) => {
    const { name, value } = e.target;
    const siguientes = { ...valores, [name]: value };
    setValores(siguientes);
    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: validadores[name](value, siguientes) }));
    }
    if (name === "contrasena" && errores.confirmacion) {
      setErrores((prev) => ({
        ...prev,
        confirmacion: validadores.confirmacion(siguientes.confirmacion, siguientes),
      }));
    }
  };

  const salir = (e) => {
    const { name, value } = e.target;
    setErrores((prev) => ({ ...prev, [name]: validadores[name](value, valores) }));
  };

  const enviar = async (e) => {
    e.preventDefault();
    setErrorServidor("");
    const encontrados = validarTodo(valores);
    setErrores(encontrados);
    if (Object.keys(encontrados).length > 0) {
      document.getElementById(Object.keys(encontrados)[0])?.focus();
      return;
    }

    setEnviando(true);
    try {
      await registrarUsuario(valores);
      iniciar({
        nombre: valores.nombre.trim(),
        correo: valores.correo.trim().toLowerCase(),
        departamento: valores.departamento,
        rol: valores.rol,
      });
      navigate("/videos", { replace: true });
    } catch (err) {
      setErrorServidor(err.message);
      if (err.status === 409) {
        setErrores((prev) => ({ ...prev, correo: "Este correo ya está registrado." }));
        document.getElementById("correo")?.focus();
      }
    } finally {
      setEnviando(false);
    }
  };

  const aria = (campo) => ({
    "aria-invalid": errores[campo] ? "true" : undefined,
    "aria-describedby":
      errores[campo] || campo === "correo" || campo === "contrasena" ? `${campo}-msg` : undefined,
  });

  const nombresCategorias = CATEGORIAS.map((c) => c.label.toLowerCase());

  return (
    <div className="pagina-registro">
      <aside className="portada">
        <p className="marca">Nutresa</p>
        <div className="portada__texto">
          <h1>Todos los videos de la compañía, en un solo lugar.</h1>
          <p>
            Crea tu cuenta con tu correo de trabajo para ver los videos de{" "}
            {nombresCategorias.slice(0, -1).join(", ")} y {nombresCategorias[nombresCategorias.length - 1]}.
          </p>
        </div>
      </aside>

      <main className="panel-formulario">
        <form className="formulario" onSubmit={enviar} noValidate>
          <header>
            <h2>Crea tu cuenta</h2>
            <p className="sub">Te toma menos de un minuto.</p>
          </header>

          {errorServidor && (
            <div className="alerta" role="alert">
              {errorServidor}
            </div>
          )}

          <Campo id="nombre" etiqueta="Nombre completo" error={errores.nombre}>
            <input
              id="nombre"
              name="nombre"
              type="text"
              autoComplete="name"
              maxLength={LIMITES.nombre}
              value={valores.nombre}
              onChange={cambiar}
              onBlur={salir}
              {...aria("nombre")}
            />
          </Campo>

          <Campo id="correo" etiqueta="Correo" ayuda="Será tu usuario para ingresar." error={errores.correo}>
            <input
              id="correo"
              name="correo"
              type="email"
              autoComplete="email"
              maxLength={LIMITES.correo}
              value={valores.correo}
              onChange={cambiar}
              onBlur={salir}
              {...aria("correo")}
            />
          </Campo>

          <div className="fila">
            <Campo id="departamento" etiqueta="Departamento" error={errores.departamento}>
              <select
                id="departamento"
                name="departamento"
                value={valores.departamento}
                onChange={cambiar}
                onBlur={salir}
                {...aria("departamento")}
              >
                <option value="">Selecciona…</option>
                {DEPARTAMENTOS.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </Campo>

            <Campo id="rol" etiqueta="Rol" error={errores.rol}>
              <select
                id="rol"
                name="rol"
                value={valores.rol}
                onChange={cambiar}
                onBlur={salir}
                {...aria("rol")}
              >
                <option value="">Selecciona…</option>
                {ROLES.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </Campo>
          </div>

          <Campo
            id="contrasena"
            etiqueta="Contraseña"
            ayuda="Mínimo 8 caracteres, con letras y números."
            error={errores.contrasena}
          >
            <div className="clave">
              <input
                id="contrasena"
                name="contrasena"
                type={verClave ? "text" : "password"}
                autoComplete="new-password"
                maxLength={LIMITES.contrasena}
                value={valores.contrasena}
                onChange={cambiar}
                onBlur={salir}
                {...aria("contrasena")}
              />
              <button
                type="button"
                className="clave__ver"
                onClick={() => setVerClave((v) => !v)}
                aria-pressed={verClave}
              >
                {verClave ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </Campo>

          <Campo id="confirmacion" etiqueta="Confirma tu contraseña" error={errores.confirmacion}>
            <input
              id="confirmacion"
              name="confirmacion"
              type={verClave ? "text" : "password"}
              autoComplete="new-password"
              maxLength={LIMITES.contrasena}
              value={valores.confirmacion}
              onChange={cambiar}
              onBlur={salir}
              {...aria("confirmacion")}
            />
          </Campo>

          <button type="submit" className="boton" disabled={enviando}>
            {enviando ? "Creando cuenta…" : "Crear cuenta"}
          </button>
        </form>
      </main>
    </div>
  );
}
