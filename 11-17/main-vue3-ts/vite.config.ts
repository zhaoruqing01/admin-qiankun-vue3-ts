import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 开发服务器：解决跨域和端口问题（必配！）
  server: {
    port: 8080, // 固定端口，避免每次启动随机变
    strictPort: true, // 端口被占用时抛出错误而不是自动使用其他端口
    open: true, // 启动后自动打开浏览器
    proxy: {
      '/api': {
        target: 'https://api.example.com', // 后端接口地址
        changeOrigin: true, // 跨域时修改请求头的 Origin
        rewrite: (path) => path.replace(/^\/api/, ''), // 去掉路径中的 /api 前缀
      },
    },
  },
});
