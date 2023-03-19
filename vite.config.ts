import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import dotenv from 'dotenv';
import path from 'path';
import vue from "@vitejs/plugin-vue";

dotenv.config({ path: path.resolve(process.cwd(), '.env.production') })

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL ?? 'http://localhost:7008'
      }
    }
  }
});
