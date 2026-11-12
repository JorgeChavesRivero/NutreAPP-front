import { CATEGORIAS } from "../constants/enums.js";

// Contenido de ejemplo. Cuando el backend exponga los videos, reemplaza este
// archivo por una llamada a la API (misma forma de objeto).
// `url` vacío = video por publicar.
export const VIDEOS = [
  { id: 1, categoria: "SST", titulo: "Pausas activas en el puesto de trabajo", duracion: "6 min", url: "" },
  { id: 2, categoria: "SST", titulo: "Qué hacer en una evacuación", duracion: "9 min", url: "" },
  { id: 3, categoria: "TALENTO", titulo: "Tu primer mes en la compañía", duracion: "12 min", url: "" },
  { id: 4, categoria: "TALENTO", titulo: "Rutas de crecimiento y movilidad interna", duracion: "8 min", url: "" },
  { id: 5, categoria: "CAPACITACION_INTERNA", titulo: "Cómo usar las herramientas internas", duracion: "15 min", url: "" },
  { id: 6, categoria: "CAPACITACION_INTERNA", titulo: "Seguridad de la información para todos", duracion: "10 min", url: "" },
];

export const CATEGORIAS_VIDEO = CATEGORIAS;
