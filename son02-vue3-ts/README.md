# 微应用 2 (Son02) - Qiankun 微前端子应用

这是一个基于 **Qiankun 微前端框架**的 Vue 3 + TypeScript + Vite 微应用。该应用被主应用动态加载和卸载，支持路由隔离和应用级别的独立部署。

## 项目特性

- 🚀 **Vue 3 + TypeScript + Vite** - 现代化的前端技术栈
- 🎯 **Qiankun 微应用** - 由主应用动态加载的独立应用
- 📱 **独立路由系统** - 拥有自己的 Vue Router
- 🎨 **应用隔离** - 样式和脚本相互隔离
- 📦 **库模式打包** - 打包为 UMD 格式供主应用加载
- 🔧 **简化配置** - 相比 son01 的最小化配置

## 项目结构

```
son02-vue3-ts/
├── src/
│   ├── components/           # 组件目录
│   │   └── HelloWorld.vue   # 示例组件
│   ├── App.vue              # 应用根组件
│   ├── main.ts              # 应用入口（微应用特殊配置）
│   └── style.css            # 全局样式
├── vite.config.ts           # Vite 配置（微应用专用）
├── tsconfig.json            # TypeScript 配置
└── package.json             # 依赖配置
```

## 安装依赖

```bash
pnpm install
```

## 开发运行

### 独立运行

```bash
pnpm run dev
```

应用将在 `http://localhost:8082` 启动。可以独立测试本应用的功能。

### 集成到主应用

1. 确保主应用正在运行：`pnpm run dev`（在 main-vue3-ts 目录）
2. 启动本微应用：`pnpm run dev`（在本目录）
3. 访问主应用 `http://localhost:8080`
4. 点击导航进入 `/son02-vue3-ts` 路由，主应用将加载此微应用

## 生产构建

```bash
pnpm run build
```

生成 UMD 格式的库文件，供主应用加载：

- `dist/son02-vue3-ts.umd.js` - UMD 格式（兼容各种导入方式）
- `dist/son02-vue3-ts.es.js` - ES 模块格式

## 关键配置

### 1. Vite 配置（微应用特有）

在 `vite.config.ts` 中配置：

```typescript
// 动态公共路径（适配独立运行和被主应用加载两种场景）
base: process.env.NODE_ENV === 'production' ? process.env.VITE_PUBLIC_PATH || '/' : '/',

// 注册 Qiankun 微应用插件
plugins: [
  vue(),
  qiankun('son02-vue3-ts', { useDevMode: true }),
],

// 库模式打包（重要！）
build: {
  lib: {
    entry: path.resolve(__dirname, 'src/main.ts'),
    name: 'son02-vue3-ts',
    formats: ['umd', 'es'],
    fileName: (format) => `son02-vue3-ts.${format}.js`,
  },
  rollupOptions: {
    // 声明外部依赖（不打包进微应用）
    external: ['vue'],
    output: {
      globals: {
        vue: 'Vue',
      },
    },
  },
},
```

### 2. 应用入口配置（main.ts）

微应用需要导出特定的生命周期函数供 Qiankun 调用：

```typescript
// 微应用导出的生命周期钩子
export async function bootstrap() {
  console.log('son02-vue3-ts bootstrap');
}

export async function mount(props: any) {
  console.log('son02-vue3-ts mount', props);
  app.mount('#app');
}

export async function unmount() {
  console.log('son02-vue3-ts unmount');
  app.unmount();
}
```

### 3. 跨域和 CORS 配置

在 `vite.config.ts` 的开发服务器配置中已启用 CORS：

```typescript
server: {
  port: 8082,
  cors: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  },
},
```

### 4. 与 son01 的区别

相比 **son01** 应用，**son02** 应用具有以下特点：

| 特性            | son01    | son02        |
| --------------- | -------- | ------------ |
| 依赖 vue-router | ✅       | ❌           |
| 全局状态通信    | ✅       | ❌           |
| 样式预处理      | Sass     | CSS          |
| 配置详细度      | 详细注解 | 简化配置     |
| 适用场景        | 复杂应用 | 简单功能模块 |

## 开发建议

1. **独立运行** - 微应用可以独立运行以便调试，无需依赖主应用
2. **端口配置** - 确保微应用端口与其他应用不冲突（本应用使用 8082）
3. **容器元素** - 确保根组件挂载到 `#app` 元素
4. **依赖声明** - 仅声明 Vue 为外部依赖，由主应用统一提供
5. **生命周期** - 实现 `bootstrap`、`mount`、`unmount` 三个生命周期方法
6. **轻量化** - 适合作为简单功能模块集成到主应用

## 技术栈

- **框架**: Vue 3 (Composition API)
- **微应用支持**: vite-plugin-qiankun 1.0.15
- **构建工具**: Vite 7.2.2
- **语言**: TypeScript 5.9.3
- **压缩**: Terser 5.44.1

## 相关文档

- [Qiankun 官方文档](https://qiankun.umijs.org/)
- [vite-plugin-qiankun 文档](https://github.com/c2cn/vite-plugin-qiankun)
- [Vue 3 官方文档](https://vuejs.org/)
- [Vite 官方文档](https://vitejs.dev/)
