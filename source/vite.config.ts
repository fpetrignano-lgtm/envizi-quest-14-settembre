import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reportRefreshPlugin } from "./vite-plugin-report-refresh";

export default defineConfig(({ command }) => ({
  base: command === "build" ? (process.env.VITE_BASE_PATH || "/envizi-quest-14-settembre/") : "/",
  server: { port: 5175, strictPort: true },
  plugins: [react(), reportRefreshPlugin()],
  build: {
    chunkSizeWarningLimit: 700,
    assetsInlineLimit: 65536, // 64KB — inline le icone obiettivo (~57-61KB) come base64
  },
}));
