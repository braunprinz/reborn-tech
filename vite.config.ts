import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig(async () => {
  const isProd = process.env.NODE_ENV === "production";
  const isReplit = process.env.REPL_ID !== undefined;

  return {
    base: "/", // wichtig für korrekte Asset-Pfade in Prod
    plugins: [
      react(),
      runtimeErrorOverlay(),
      ...(!isProd && isReplit
        ? [
            await import("@replit/vite-plugin-cartographer").then((m) =>
              m.cartographer(),
            ),
            await import("@replit/vite-plugin-dev-banner").then((m) =>
              m.devBanner(),
            ),
          ]
        : []),
    ],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "client", "src"),
        "@shared": path.resolve(import.meta.dirname, "shared"),
        "@assets": path.resolve(import.meta.dirname, "attached_assets"),
      },
    },
    // root muss auf client zeigen, weil dort index.html liegt
    root: path.resolve(import.meta.dirname, "client"),
    build: {
      // Vite Output in dist/public, damit Express es serven kann
      outDir: path.resolve(import.meta.dirname, "dist", "public"),
      assetsDir: "assets",
      // NICHT leeren, weil Server-Build ebenfalls dist/ nutzt
      emptyOutDir: false,
    },
    server: {
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
      // optional, nur Dev
      // port: 5173,
    },
  };
});
