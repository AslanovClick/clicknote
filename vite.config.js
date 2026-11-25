import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    vue({
      // Templates reference public/ images by plain paths (e.g. "img/logo.svg");
      // the original build left them untouched, so do the same.
      template: { transformAssetUrls: false },
    }),
  ],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
    // The original Vue CLI code imports components without the .vue extension.
    extensions: [".mjs", ".js", ".json", ".vue"],
  },
  css: {
    preprocessorOptions: {
      scss: {
        // The original vue.config.js prepended the base styles to every SCSS block;
        // the compiled CSS relies on that, so it is reproduced here.
        additionalData: '@use "@/assets/scss/base" as *;\n',
      },
    },
  },
});
