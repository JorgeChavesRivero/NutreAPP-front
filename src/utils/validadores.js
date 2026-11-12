// Límites tomados de las columnas del modelo Java.
export const LIMITES = {
  nombre: 100, // @Column(length = 100)
  correo: 80, // @Column(length = 80, unique = true)
  contrasena: 72, // BCrypt solo usa los primeros 72 bytes
};

const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const validadores = {
  nombre: (v) => {
    const t = v.trim();
    if (!t) return "Escribe tu nombre completo.";
    if (t.length > LIMITES.nombre)
      return `El nombre no puede superar ${LIMITES.nombre} caracteres.`;
    return "";
  },
  correo: (v) => {
    const t = v.trim();
    if (!t) return "Escribe tu correo.";
    if (t.length > LIMITES.correo)
      return `El correo no puede superar ${LIMITES.correo} caracteres.`;
    if (!REGEX_CORREO.test(t)) return "Escribe un correo válido, por ejemplo nombre@empresa.com.";
    return "";
  },
  departamento: (v) => (v ? "" : "Selecciona tu departamento."),
  rol: (v) => (v ? "" : "Selecciona tu rol."),
  contrasena: (v) => {
    if (!v) return "Crea una contraseña.";
    if (v.length < 8) return "Usa al menos 8 caracteres.";
    if (!/[A-Za-z]/.test(v) || !/\d/.test(v)) return "Incluye letras y números.";
    return "";
  },
  confirmacion: (v, todos) =>
    v !== todos.contrasena ? "Las contraseñas no coinciden." : "",
};

export function validarTodo(valores) {
  const errores = {};
  for (const campo of Object.keys(validadores)) {
    const msg = validadores[campo](valores[campo], valores);
    if (msg) errores[campo] = msg;
  }
  return errores;
}
