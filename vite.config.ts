import { defineConfig } from "vite";
import { resolve } from "node:path";
// import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  base: "/zwiazek-przyczynowy/",
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, "index.html"),
        boids: resolve(__dirname, "boids/index.html"),
        fractal: resolve(__dirname, "fractal/index.html"),
        lorenz: resolve(__dirname, "lorenz/index.html"),
      },
    },
  },

  // plugins: [viteSingleFile()],
});
