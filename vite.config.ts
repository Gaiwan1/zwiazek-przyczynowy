import { defineConfig } from "vite";
import { resolve } from "node:path";
// import { viteSingleFile } from "vite-plugin-singlefile";
import { webfontDownload } from "vite-plugin-webfont-dl";

// const __dirname = dirname(fileURLToPath(import.meta.url))

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

  plugins: [
    // viteSingleFile()
    webfontDownload([
      "https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&display=swap",
    ]),
  ],
});
