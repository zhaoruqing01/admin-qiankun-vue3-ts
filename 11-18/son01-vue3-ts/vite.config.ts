import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';
import qiankun from 'vite-plugin-qiankun';

const appName = 'son01-vue3-ts';

// https://vite.dev/config/
export default defineConfig({
  // 1. 动态公共路径（关键！适配独立运行和主应用嵌入两种场景）
  // - 独立运行时：使用环境变量 VITE_PUBLIC_PATH（默认 '/'）
  // - 被主应用嵌入时：由 qiankun 注入 window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
  base: process.env.NODE_ENV === 'production' ? process.env.VITE_PUBLIC_PATH || '/' : '/',
  plugins: [
    vue(),
    qiankun(appName, {
      // 配置qiankun插件
      useDevMode: true,
    }),
  ],
  server: {
    port: 8081,
    open: true,
    host: '0.0.0.0',
    // 跨域允许（主应用从 8080 访问 8081，需允许跨域）
    cors: true,

    // 可选：跨域请求头增强（兼容部分浏览器）
    headers: {
      'Access-Control-Allow-Origin': '*', // 允许所有源（开发环境安全）
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  },
  // 3. 解析配置（与主应用一致，简化路径引用）
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
    // 5. 构建配置（关键：输出 umd 格式，支持 qiankun 加载）
  build: {
    // 打包目标（需兼容 umd 格式，支持浏览器全局变量）
    target: 'es2015',
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
        // 🌟 核心：打包为 umd 格式（qiankun 要求子应用必须是 umd 模块）
    lib: {
      // 子应用入口文件（默认 src/main.js）
      entry: path.resolve(__dirname, 'src/main.js'),
      // 全局变量名（需与 appName 一致，主应用通过该变量获取子应用）
      name: appName,
      // 打包格式（必须包含 umd，可选同时输出 esm/cjs）
      formats: ['umd', 'es'],
      // 输出文件名（默认：umd 格式为 [name].umd.js，es 格式为 [name].es.js）
      fileName: (format) => `${appName}.${format}.js`,
    },
        // 🌟 Rollup 打包选项（适配 umd 格式的关键配置）
    rollupOptions: {
      // 外部依赖（避免将 Vue、VueRouter 等打包进子应用，由主应用共享）
      // 注意：如果主应用未提供这些依赖，子应用需移除该配置，自行打包
      external: ['vue', 'vue-router'],
      // 全局变量映射（外部依赖在浏览器中的全局变量名）
      output: {
        globals: {
          vue: 'Vue', // 对应 window.Vue
          vue-router: 'VueRouter', // 对应 window.VueRouter
        },
        // 确保 umd 模块能在浏览器中正常运行（关键）
        globalObject: 'window',
      },
    },
      // 6. CSS 配置（与主应用一致，可选）
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`,
      },
    },
  },
  },
});
