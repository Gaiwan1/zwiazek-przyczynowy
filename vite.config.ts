import { defineConfig } from "vite";
import { resolve } from "node:path";
// import { viteSingleFile } from "vite-plugin-singlefile";
import { webfontDownload } from "vite-plugin-webfont-dl";

export default defineConfig({
  base: "/zwiazek-przyczynowy/",
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, "index.html"),
        boids: resolve(__dirname, "src/boids/index.html"),
        fractal: resolve(__dirname, "src/fractal/index.html"),
        lorenz: resolve(__dirname, "src/lorenz/index.html"),
      },
    },
  },

  plugins: [
    // viteSingleFile()
    webfontDownload([
      "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap",
    ]),
  ],
});
