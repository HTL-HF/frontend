import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  
    port: Number(process.env.VITE_PORT) || 5173, 
    strictPort: true,
    watch: {
      usePolling: true
    }
  },
  preview:{
    host: true,  
    port: Number(process.env.VITE_PORT) || 5173, 
    strictPort: true
  }
});
