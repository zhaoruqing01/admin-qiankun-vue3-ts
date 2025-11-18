import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import qiankun from 'vite-plugin-qiankun';

// 子应用唯一标识（必须与 package.json 的 name 一致，且与主应用注册的 name 匹配）
const SUB_APP_NAME = 'son02-vue3-ts';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    // 1. 基础配置（独立运行时的基础路径）
    base: env.VITE_BASE_URL || '/', // 独立运行时为 '/',嵌入时由 qiankun 动态设置 publicPath
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
      extensions: ['.vue', '.ts', '.tsx', '.js', '.jsx'],
    },

    // 2. 服务器配置（开发环境：关键是跨域）
    server: {
      port: 8082, // 子应用端口（固定，与主应用注册的 entry 一致）
      strictPort: true, // 端口被占用时抛出错误
      cors: true, // 允许跨域（主应用访问子应用必需）
      headers: {
        // 强化跨域配置（兼容部分浏览器）
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
      },
      proxy: {
        // 子应用接口代理（可选）
        [env.VITE_API_BASE_URL]: {
          target: env.VITE_API_TARGET_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^${env.VITE_API_BASE_URL}`), ''),
        },
      },
    },

    // 3. 插件配置
    plugins: [
      vue(),
      qiankun(SUB_APP_NAME, {
        // 添加qiankun插件支持
        useDevMode: true,
      }),
    ],

    // 4. CSS 配置（关键：提取 CSS 为单独文件，配合 qiankun 样式隔离）
    css: {
      devSourcemap: true,
      extract: true, // 必须开启！提取 CSS 为单独文件（qiankun 样式隔离依赖此配置）
    },

    // 5. 构建配置（核心：適配 qiankun 的 UMD 格式）
    build: {
      outDir: 'dist',
      assetsDir: 'static',
      sourcemap: false,
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        // 关键 1：打包成 UMD 格式（qiankun 要求子应用必须是 UMD 模块）
        output: {
          entryFileNames: `${SUB_APP_NAME}.[hash].js`, // 入口文件名（含子应用标识，避免冲突）
          chunkFileNames: `chunk-${SUB_APP_NAME}.[hash].js`, // chunk 文件名（含标识，避免冲突）
          format: 'umd',
          name: SUB_APP_NAME, // 必须与 package.json 的 name 一致
          // 关键 2：避免不同子应用的 chunk 命名冲突（全局唯一标识）
          globals: {
            vue: 'Vue',
            'vue-router': 'VueRouter',
          },
        },
        // 可选：排除公共依赖（如 Vue、Vue Router），复用主应用的依赖（减小子应用体积）
        // 注意：开发环境不要排除依赖，避免开发时出现问题
        external: mode === 'production' ? ['vue', 'vue-router'] : [],
      },
    },

    // 6. 优化配置（可选）
    optimizeDeps: {
      include: ['vue', 'vue-router', 'pinia'], // 预构建依赖（提升开发启动速度）
    },
  };
});
