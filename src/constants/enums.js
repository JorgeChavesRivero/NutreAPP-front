// Los valores (value) deben coincidir EXACTAMENTE con los enums de Java.
// Las etiquetas (label) son solo para mostrar en pantalla.

export const DEPARTAMENTOS = [
  { value: "TI", label: "Tecnología de la información (TI)" },
  { value: "COMERCIAL", label: "Comercial" },
  { value: "TALENTO_HUMANO", label: "Talento humano" },
];

export const ROLES = [
  { value: "EMPLEADO", label: "Empleado" },
  { value: "SUPERVISOR", label: "Supervisor" },
  { value: "ADMINISTRADOR", label: "Administrador" },
];

export const CATEGORIAS = [
  { value: "SST", label: "Seguridad y salud en el trabajo" },
  { value: "TALENTO", label: "Talento" },
  { value: "CAPACITACION_INTERNA", label: "Capacitación interna" },
];

export const etiquetaDe = (lista, value) =>
  lista.find((i) => i.value === value)?.label ?? value;
