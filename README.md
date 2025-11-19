```
# 项目名称 : 基于qiankun的微前端模版
## 项目结构 
```

项目根目录/
├── src/ # 源代码目录
│ ├── components/ # 可复用组件
│ ├── views/ # 页面组件
│ ├── router/ # 路由配置
│ ├── store/ # 状态管理
│ ├── utils/ # 工具函数
│ ├── api/ # API 接口
│ ├── App.vue # 根组件
│ └── main.ts # 应用入口
├── public/ # 静态资源
├── dist/ # 构建输出目录
├── vite.config.ts # Vite 配置
├── tsconfig.json # TypeScript 配置
├── package.json # 依赖配置
└── README.md # 项目说明文档

plaintext

```
 ## 安装依赖 ```bash pnpm install # 或 npm install # 或 yarn install
```

## 开发运行

bash

```
pnpm run dev
```

应用将在 `http://localhost:5173` 启动（或根据配置的端口）。

## 生产构建

bash

```
pnpm run build
```

生成优化后的生产版本到 `dist` 目录。

## 预览构建结果

bash

```
pnpm run preview
```

## 项目配置

### 环境变量

创建 `.env` 和 `.env.production` 文件来配置不同环境的变量：

bash

```
# .env VITE_API_URL=http://localhost:3000 # .env.production VITE_API_URL=https://api.example.com
```

### 核心依赖

- **Vue 3** - 前端框架
- **TypeScript** - 类型系统
- **Vite** - 构建工具
- **Vue Router** - 路由管理
- **Pinia** - 状态管理（可选）

## 开发建议

1. **代码规范** - 遵循 ESLint 和 Prettier 规范
2. **组件设计** - 优先使用函数式组件和 Composition API
3. **类型安全** - 充分利用 TypeScript 的类型检查
4. **性能优化** - 合理使用代码分割和懒加载
5. **错误处理** - 完善的错误捕获和日志记录

## 目录规范

- `components/` - 可复用的 UI 组件
- `views/` - 页面级组件（对应路由）
- `api/` - API 请求相关的方法
- `utils/` - 公共工具函数
- `types/` - TypeScript 类型定义
- `assets/` - 静态资源（图片、字体等）

## Git 提交规范

plaintext

```
feat: 新功能 fix: 修复 bug docs: 文档变更 style: 代码格式变更（不影响功能） refactor: 代码重构 perf: 性能优化 test: 添加或修改测试 chore: 构建过程或依赖变更
```

## 常见问题

**Q: 如何添加新依赖？**

bash

```
pnpm add package-name
```

**Q: 如何修改开发服务器端口？**
在 [vite.config.ts](file:///D:/Project/Test/qiankun-microApps/11-18/son01-vue3-ts/vite.config.ts) 中修改：

typescript

```
export default defineConfig({  server: {    port: 3000,  }, });
```

**Q: 如何处理 API 跨域问题？**
在 [vite.config.ts](file:///D:/Project/Test/qiankun-microApps/11-18/son01-vue3-ts/vite.config.ts) 中配置代理：

typescript

```
server: {  proxy: {    '/api': {      target: 'http://localhost:3000',      changeOrigin: true,      rewrite: (path) => path.replace(/^\/api/, ''),    },  }, }
```

## 技术栈

- **前端框架**: Vue 3
- **语言**: TypeScript
- **构建工具**: Vite
- **路由**: Vue Router 4
- **包管理**: pnpm

## 相关文档

- [Vue 3 官方文档](https://vuejs.org/)
- [Vite 官方文档](https://vitejs.dev/)
- [TypeScript 文档](https://www.typescriptlang.org/)
- [Vue Router 文档](https://router.vuejs.org/)

## 许可证

MIT
