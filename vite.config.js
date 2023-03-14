import { defineConfig, loadEnv } from "vite";
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { createVuePlugin as vue } from "vite-plugin-vue2";
import dayjs from 'dayjs'
const path = require("path");
const { version, author } = require("./package.json");

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const time = dayjs().format("YYYY-M-D HH:mm:ss");
  return defineConfig({
    base: "./",
    optimizeDeps: {
      include: ["screenfull"],
    },
    define: {
      "process.env": {
        ...env,
        VUE_APP_AUTHOR: "1204505056@qq.com",
        VUE_APP_VERSION: version,
        VUE_APP_UPDATE_TIME: time,
      },
    },
    plugins: [vue()],
    resolve: {
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
      alias: [
        {
          find: "@",
          replacement: path.resolve(__dirname, "./src"),
        },{
          find:'~element-ui',
          replacement: path.resolve(__dirname, "./node_modules/element-ui"),
        }
      ]
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData(content, loaderPath) {
            const relativePath = path.relative(__dirname, loaderPath);
            if (
              relativePath.replace(/\\/g, "/") !== "src/styles/variables.scss"
            ) {
              // if (relativePath.replace(/\\/g, "/").match(/@formily\/element/)) {
              //   return content
              // } else {
                if(!content.includes(`@use`)) {
                  return `@import "/src/styles/variables.scss";` + content;
                }
                return content
              // }
            }
            return content;
          },
        },
      },
    },
    server: {
      host: true,
      open: true,
      port: 80,
      hmr: true,
      force: true,
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
    //打包配置
    build: {
      //浏览器兼容性  "esnext"|"modules"
      target: "modules",
      //指定输出路径
      outDir: "dist",
      //生成静态资源的存放路径
      assetsDir: "assets",
      //小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
      assetsInlineLimit: 4096,
      //启用/禁用 CSS 代码拆分
      cssCodeSplit: true,
      //构建后是否生成 source map 文件
      sourcemap: false,
      //自定义底层的 Rollup 打包配置
      rollupOptions: {},
      //@rollup/plugin-commonjs 插件的选项
      commonjsOptions: {},
      //构建的库
      // lib: {},
      //当设置为 true，构建后将会生成 manifest.json 文件
      manifest: false,
      // 设置为 false 可以禁用最小化混淆，
      // 或是用来指定使用哪种混淆器
      // boolean | 'terser' | 'esbuild'
      minify: "terser", //terser 构建后文件体积更小
      //传递给 Terser 的更多 minify 选项。
      terserOptions: {},
      //设置为 false 来禁用将构建后的文件写入磁盘
      write: true,
      //默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录。
      emptyOutDir: true,
      //启用/禁用 brotli 压缩大小报告
      brotliSize: true,
      //chunk 大小警告的限制
      chunkSizeWarningLimit: 500,
    },
  });
};
