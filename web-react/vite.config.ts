import { defineConfig } from "vite";
import process from "process";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // "/api": process.env.VITE_API_TARGET || "http://localhost:3000"
            "/api": "http://localhost:8080",
    }
  }
});
