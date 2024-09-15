import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import rewriteAll from "vite-plugin-rewrite-all";
import path from "path-browserify";

export default defineConfig({
  plugins: [react(), rewriteAll()],
  base: "/rimac-challenge/",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: path.resolve("index.html"),
        404: path.resolve("404.html"),
      },
    },
  },
});
