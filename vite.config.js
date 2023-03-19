import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
const resolveAlias = Object.fromEntries(
  Object.entries({
    "@stores": "./src/stores",
    "@scss": "./src/assets/scss",
    "@components": "./src/components",
    "@composable": "./src/composable",
  }).map(([key, value]) => [key, path.resolve(__dirname, value)])
);

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: resolveAlias,
  },
});
