import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 5173, // Render will override this with $PORT
    strictPort: true,
  },
  preview: {
    host: "0.0.0.0",
    port: 5173, // Render will override this with $PORT
    strictPort: true,
    allowedHosts: ["chatapp-0.onrender.com"], // Add your Render domain here
  },
});
