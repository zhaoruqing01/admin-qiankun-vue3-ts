import vue from '@vitejs/plugin-vue'; // 引入Vite的Vue插件，用于解析.vue文件
import path from 'path'; // Node.js内置模块，用于处理文件路径
import { defineConfig } from 'vite'; // 引入Vite配置定义函数，提供类型提示
import qiankun from 'vite-plugin-qiankun'; // 引入乾坤微应用Vite插件，实现微应用适配

// 微应用名称（必须与主应用注册的名称一致，作为微应用唯一标识）
const appName = 'son01-vue3-ts';

// https://vite.dev/config/
// 导出Vite配置对象，使用defineConfig函数获得类型提示
export default defineConfig({
  /**
   * 1. 动态公共路径配置（乾坤微应用关键配置）
   * 作用：适配微应用"独立运行"和"被主应用嵌入"两种场景的资源路径
   * - 独立运行时：使用环境变量VITE_PUBLIC_PATH（未配置则默认 '/'）
   * - 被主应用嵌入时：乾坤会自动注入 window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ 变量
   *   此时资源路径会基于主应用的路径动态拼接，避免资源404
   */
  base: process.env.NODE_ENV === 'production' ? process.env.VITE_PUBLIC_PATH || '/' : '/',

  /**
   * 2. 插件配置
   * 注册项目所需的Vite插件，按功能顺序排列
   */
  plugins: [
    vue(), // 注册Vue插件，支持.vue单文件组件的解析、编译（模板、样式、脚本）

    /**
     * 乾坤微应用插件配置
     * 参数1：appName - 微应用唯一标识（必须与主应用注册时的名称完全一致）
     * 参数2：配置选项
     *   - useDevMode: true - 开发环境下启用热更新、跨域等开发友好配置
     *     生产环境会自动禁用，无需手动修改
     */
    qiankun(appName, {
      useDevMode: true,
    }),
  ],

  /**
   * 3. 开发服务器配置（仅开发环境生效）
   * 用于配置本地开发时的服务参数，支持跨域、端口、自动打开等
   */
  server: {
    port: 8081, // 开发环境端口号（避免与主应用/其他微应用端口冲突）
    open: true, // 启动开发服务器后自动打开浏览器
    host: '0.0.0.0', // 允许局域网内其他设备访问（如手机调试）
    cors: true, // 启用跨域支持（微应用与主应用开发环境跨域通信必需）

    /**
     * 跨域请求头配置
     * 进一步细化CORS规则，确保主应用能正常请求微应用资源
     * - Access-Control-Allow-Origin: '*' - 允许所有来源（开发环境宽松配置，生产环境需按需限制）
     * - Access-Control-Allow-Methods: 允许的HTTP请求方法
     * - Access-Control-Allow-Headers: 允许的请求头（如Content-Type、Authorization等）
     */
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  },

  /**
   * 4. 模块解析配置
   * 用于配置Vite如何解析文件路径、扩展名等，优化开发体验
   */
  resolve: {
    /**
     * 路径别名配置
     * 简化导入路径，避免相对路径层级过深（如 ../../components/xxx）
     * - '@' 映射到项目根目录下的 src 文件夹
     * 使用示例：import Home from '@/views/Home.vue'
     */
    alias: {
      '@': path.resolve(__dirname, 'src'), // __dirname 是当前文件所在目录的绝对路径
    },

    /**
     * 自动解析的文件扩展名
     * 导入文件时可省略以下扩展名，Vite会按顺序查找
     * 优先配置常用扩展名，提升解析效率
     */
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },

  /**
   * 5. 构建配置（生产环境打包参数）
   * 控制生产环境打包的输出格式、目标浏览器、压缩方式等
   */
  build: {
    target: 'es2015', // 打包目标浏览器兼容版本（支持ES2015及以上，覆盖大部分现代浏览器）
    outDir: 'dist', // 打包输出目录（默认dist，可按需修改）
    assetsDir: 'assets', // 静态资源（图片、字体等）输出目录（相对于outDir）
    // `pnpm add -D terser` // 添加terser依赖
    minify: 'terser', // 启用代码压缩（terser是Vite默认压缩工具，支持ES6+代码压缩）

    /**
     * 库模式打包（乾坤微应用核心配置）
     * 作用：将微应用打包为UMD/ES格式的库，而非普通SPA应用
     * 主应用通过import或script标签引入该库，实现微应用加载
     */
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'), // 打包入口文件（微应用入口）
      name: appName, // 库的全局变量名称（window[appName]）
      formats: ['umd', 'es'], // 打包格式：UMD（兼容主应用各种引入方式）、ES（ES模块格式）
      fileName: (format) => `${appName}.${format}.js`, // 输出文件名格式（如 son01-vue3-ts.umd.js）
    },

    /**
     * Rollup配置（Vite底层使用Rollup打包，此处扩展Rollup配置）
     */
    rollupOptions: {
      /**
       * external - 声明外部依赖（不打包进微应用）
       * 原因：主应用通常已加载Vue、VueRouter等公共依赖，微应用无需重复打包
       * 减少微应用体积，避免版本冲突
       */
      external: ['vue', 'vue-router'],

      /**
       * output.globals - 为外部依赖指定全局变量名称
       * 作用：微应用运行时，从window对象中获取这些依赖（主应用已挂载到window）
       * 键：外部依赖名称；值：对应的全局变量名（必须与主应用暴露的一致）
       */
      output: {
        globals: {
          vue: 'Vue', // window.Vue
          'vue-router': 'VueRouter', // window.VueRouter
        },
      },
    },
  },
});
