import { defineConfig, loadEnv } from "vite";
import { createVuePlugin as vue } from "vite-plugin-vue2";
const path = require("path");

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    define: {
      "process.env": { ...env },
    },
    plugins: [vue()],
    resolve: {
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      host: true,
      open: true,
      port: 3000,
      proxy: {
        "/api/login": {
          target: "https://ops-test.ihr360.com/",
          secure: false,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/ops-test/, ""),
        },
        "/api-v2": {
          target: "https://ops-test.ihr360.com/",
          secure: false,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/ops-test/, ""),
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData(content, loaderContext) {
            const { resourcePath, rootContext } = loaderContext;
            const relativePath = path.relative(rootContext, resourcePath);
            if (
              relativePath.replace(/\\/g, "/") !== "src/styles/variables.scss"
            ) {
              if (relativePath.replace(/\\/g, "/").match(/@formily/)) {
                return content;
              } else {
                return `@import "~@/styles/variables.scss";` + content;
              }
            }
            return content;
          },
        },
      },
    },
  });
};
