import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // Vite's default build output dir is "assets" — our own static
    // files (fonts, og-image) already live at /assets/* in `public/`.
    // Route JS/CSS chunks elsewhere so they don't collide.
    assetsDir: "app",
  },
});
