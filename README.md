# Nutresa – Registro y videos (React + Vite)

Formulario de registro de usuarios que consume el backend Java y da acceso a la página de videos de la empresa.

## Ejecutar

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # genera /dist
```

## Conexión con el backend

`POST {VITE_API_URL | /api}/usuarios` con este JSON:

```json
{
  "nombre": "Ana Pérez",
  "correo": "ana@empresa.com",
  "rol": "EMPLEADO",
  "departamento": "TI",
  "contrasena": "texto-plano-por-HTTPS"
}
```

- `id` (UUID) lo genera el backend (`GenerationType.UUID`); el frontend no lo envía.
- La contraseña viaja en texto plano por HTTPS y el backend la convierte a hash (BCrypt) para guardarla en `contrasena_hash`.
- Respuestas manejadas: `200/201` ok, `409` correo duplicado, `400` datos inválidos, `5xx` error del servidor.
- En desarrollo, `vite.config.js` redirige `/api` a `http://localhost:8080`. Ajusta el puerto si hace falta.
- CORS: si no usas el proxy, habilita el origen del frontend en el backend.

## Estructura

```
src/
  App.jsx                      rutas: /registro, /videos, 404
  pages/                       Registro, Videos, NoEncontrada
  components/                  Campo (etiqueta + error accesible), RutaProtegida
  constants/enums.js           Departamento, Rol, Categoria (mismos valores que Java)
  utils/validadores.js         validaciones con los límites del modelo (100 / 80)
  services/usuarioService.js   llamada HTTP + mapeo del payload
  context/SesionContext.jsx    sesión mínima (sessionStorage)
  data/videos.js               videos de ejemplo por categoría
```

## Pendientes para el merge

1. Si tu DTO usa otros nombres (p. ej. `contrasenaHash`), cambia solo `aPayload` en `usuarioService.js`.
2. Reemplaza `SesionContext` por login/JWT real cuando el backend lo tenga.
3. Reemplaza `data/videos.js` por el endpoint de videos y agrega los `url`.
4. Cambia el texto "Nutresa" por el logo oficial.
5. Decide si el registro público debe permitir elegir `ADMINISTRADOR` (ver nota).

## Nota de seguridad

El formulario deja elegir cualquier rol porque el modelo lo pide. Si el registro es abierto, cualquiera podría crearse como `ADMINISTRADOR`. Lo recomendable es que el backend valide o ignore el rol en el registro público y que los roles elevados los asigne un administrador.
