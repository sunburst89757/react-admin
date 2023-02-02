import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";
import { serverPlugin } from "./vite.server.plugin";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "build"
  },
  server: {
    open: true
  },
  plugins: [
    react(),
    viteTsconfigPaths(),
    svgrPlugin(),
    serverPlugin({
      host: "47.98.204.143",
      serverPath: "/root/nginx/html",
      username: "root",
      password: "yourpassword"
    })
  ]
});
