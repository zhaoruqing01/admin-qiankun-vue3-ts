import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';
import qiankun from 'vite-plugin-qiankun';

const appName = 'son02-vue3-ts';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? process.env.VITE_PUBLIC_PATH || '/' : '/',
  plugins: [
    vue(),
    qiankun(appName, {
      useDevMode: true,
    }),
  ],
  server: {
    port: 8082,
    open: true,
    host: '0.0.0.0',
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  build: {
    target: 'es2015',
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: appName,
      formats: ['umd', 'es'],
      fileName: (format) => `${appName}.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
