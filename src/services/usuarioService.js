const BASE_URL = import.meta.env.VITE_API_URL ?? "/api";

/**
 * Convierte los datos del formulario al JSON que espera el backend.
 *
 * IMPORTANTE: el frontend envía la contraseña en texto plano (siempre por HTTPS)
 * y el backend debe aplicar el hash (p. ej. BCrypt) antes de guardarla en
 * `contrasena_hash`. No hashees en el navegador: el "hash" pasaría a ser la
 * contraseña real y no protegería nada.
 *
 * Si tu DTO usa otros nombres de campo, es el único lugar que hay que ajustar.
 */
function aPayload({ nombre, correo, rol, departamento, contrasena }) {
  return {
    nombre: nombre.trim(),
    correo: correo.trim().toLowerCase(),
    rol,
    departamento,
    contrasena,
  };
}

export async function registrarUsuario(datos) {
  let res;
  try {
    res = await fetch(`${BASE_URL}/usuarios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(aPayload(datos)),
    });
  } catch {
    const e = new Error("No pudimos conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.");
    e.status = 0;
    throw e;
  }

  if (!res.ok) {
    let detalle = "";
    try {
      const cuerpo = await res.json();
      detalle = cuerpo.message || cuerpo.mensaje || "";
    } catch {
      /* el backend no devolvió JSON */
    }
    const e = new Error(mensajeDeError(res.status, detalle));
    e.status = res.status;
    throw e;
  }

  return res.json().catch(() => ({}));
}

function mensajeDeError(status, detalle) {
  if (status === 409) return "Ese correo ya está registrado. Usa otro o inicia sesión.";
  if (status === 400) return detalle || "Revisa los datos del formulario.";
  if (status >= 500) return "El servidor tuvo un problema. Inténtalo de nuevo en unos minutos.";
  return detalle || "No se pudo completar el registro.";
}
