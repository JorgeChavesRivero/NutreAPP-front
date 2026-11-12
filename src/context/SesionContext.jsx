import { createContext, useCallback, useContext, useMemo, useState } from "react";

// Sesión mínima para que la pantalla de videos solo se vea tras registrarse.
// Cuando el backend tenga login/JWT, reemplaza esto por el token real.
const CLAVE = "nutresa.sesion";

function leer() {
  try {
    return JSON.parse(sessionStorage.getItem(CLAVE));
  } catch {
    return null;
  }
}

const SesionContext = createContext(null);

export function SesionProvider({ children }) {
  const [usuario, setUsuario] = useState(leer);

  const iniciar = useCallback((datos) => {
    sessionStorage.setItem(CLAVE, JSON.stringify(datos));
    setUsuario(datos);
  }, []);

  const cerrar = useCallback(() => {
    sessionStorage.removeItem(CLAVE);
    setUsuario(null);
  }, []);

  const valor = useMemo(() => ({ usuario, iniciar, cerrar }), [usuario, iniciar, cerrar]);
  return <SesionContext.Provider value={valor}>{children}</SesionContext.Provider>;
}

export function useSesion() {
  const ctx = useContext(SesionContext);
  if (!ctx) throw new Error("useSesion debe usarse dentro de <SesionProvider>");
  return ctx;
}
