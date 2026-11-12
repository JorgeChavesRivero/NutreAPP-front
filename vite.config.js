import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// En desarrollo, todo lo que empiece con /api se envía al backend Java (Spring Boot).
// Cambia el puerto si tu backend corre en otro.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
});
