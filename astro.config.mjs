import { defineConfig } from "astro/config";

export default defineConfig({
  build: {
    // Astro bettet kleine Skripte und Styles sonst direkt ins HTML ein. Die
    // Content-Security-Policy in `public/_headers` erlaubt kein `unsafe-inline`,
    // wodurch diese Skripte im Browser blockiert werden. Externe Dateien
    // erfüllen `script-src 'self'` und bleiben cachebar.
    inlineStylesheets: "never",
  },
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
});
