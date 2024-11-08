import { defineConfig } from "vite";
import { resolve } from "node:path";
// import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  base: "/zwiazek-przyczynowy/",
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, "src/index.html"),
        boids: resolve(__dirname, "src/boids/index.html"),
        fractal: resolve(__dirname, "src/fractal/index.html"),
        lorenz: resolve(__dirname, "src/lorenz/index.html"),
      },
    },
  },

  // plugins: [viteSingleFile()],
});
