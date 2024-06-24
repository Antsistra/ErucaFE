import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@Fragments": path.resolve(
        __dirname,
        "./src/components/Fragments"
      ),
      "@pages": path.resolve(
        __dirname,
        "./src/components/pages"
      ),
    },
  },
});
