import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": "http://localhost:8080", // forwards any requests starting with /api from the Vite dev server (port 5173) to the Express server (port 8080)
    },
  },
});
