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
      "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap",
    ]),
  ],
});
