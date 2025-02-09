import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "core",
      remotes: {
        musicLibrary: {
          external: "http://localhost:3001/assets/remoteEntry.js",
          externalType: "url",
        },
      },
      shared: ["react", "react-dom"],
    }),
  ],
  server: { port: 3000 },
  build: {
    target: "esnext",
    modulePreload: false,
  },
});
