# 微前端项目架构 (qiankun-microApps)

这是一个基于 [qiankun](https://qiankun.umijs.org/) 微前端框架的多应用项目架构，包含一个主应用和两个子应用，所有应用均采用 Vue3 + TypeScript + Vite 技术栈。

## 项目结构

```
admin-qiankun-vue3-ts/
├── main-vue3-ts/        # 主应用 (qiankun 基座应用)
├── son01-vue3-ts/       # 子应用 1
├── son02-vue3-ts/       # 子应用 2
├── .gitignore          # Git 忽略配置
└── README.md           # 项目说明文档
```

## 应用说明

### 主应用 (main-vue3-ts)

主应用作为 qiankun 的基座应用，负责：
- 应用注册和管理
- 路由分发和导航
- 子应用容器渲染
- 全局状态管理（可选）
- 公共资源共享

### 子应用 1 (son01-vue3-ts)

功能模块子应用，包含基本的 About 和 Home 组件，可独立开发和部署。

### 子应用 2 (son02-vue3-ts)

功能模块子应用，包含基础组件，可根据业务需求扩展。

## 技术栈

- **主框架**：Vue 3 + Composition API
- **类型系统**：TypeScript
- **构建工具**：Vite
- **微前端框架**：qiankun
- **路由**：Vue Router 4
- **状态管理**：可根据需要添加 Vuex 或 Pinia

## 快速开始

### 前置要求

- Node.js >= 16.x
- pnpm（推荐）或 npm/yarn

### 安装依赖

分别在各个应用目录下安装依赖：

```bash
# 安装主应用依赖
cd main-vue3-ts
pnpm install

# 安装子应用 1 依赖
cd ../son01-vue3-ts
pnpm install

# 安装子应用 2 依赖
cd ../son02-vue3-ts
pnpm install
```

### 开发运行

#### 方式 1：分别启动（推荐开发时使用）

1. 启动子应用 1：
```bash
cd son01-vue3-ts
pnpm dev
```

2. 启动子应用 2：
```bash
cd son02-vue3-ts
pnpm dev
```

3. 启动主应用：
```bash
cd main-vue3-ts
pnpm dev
```

#### 方式 2：使用统一脚本（需要配置）

未来可添加统一启动脚本，同时启动所有应用。

### 构建部署

分别构建各个应用：

```bash
# 构建主应用
cd main-vue3-ts
pnpm build

# 构建子应用 1
cd ../son01-vue3-ts
pnpm build

# 构建子应用 2
cd ../son02-vue3-ts
pnpm build
```

## 微前端配置说明

### 主应用配置

主应用需在 `main.ts` 中注册子应用，并配置路由。主要配置包括：

1. 注册子应用信息（名称、入口、容器、激活规则等）
2. 设置全局状态管理（如有）
3. 配置微应用生命周期钩子

### 子应用配置

子应用需导出 qiankun 要求的生命周期钩子：

1. `bootstrap` - 子应用初始化
2. `mount` - 子应用挂载
3. `unmount` - 子应用卸载
4. `update` - 子应用更新（可选）

同时需要修改 Vite 配置以支持微前端模式。

## 开发注意事项

1. **样式隔离**：qiankun 默认提供样式隔离，避免样式冲突
2. **路由配置**：主应用和子应用路由需协调，避免路径冲突
3. **通信方式**：
   - props 传递
   - 全局状态管理
   - 事件总线
4. **资源加载**：子应用静态资源需使用绝对路径
5. **跨域问题**：部署时需注意配置跨域访问

## 添加新的子应用

1. 创建新的 Vue3 + TypeScript + Vite 项目
2. 配置子应用导出生命周期钩子
3. 在主应用中注册新子应用
4. 配置路由和激活规则

## 调试技巧

1. 使用 Chrome DevTools 的 Network 面板监控微应用加载情况
2. 使用 Console 面板查看微应用生命周期日志
3. 使用 Vue DevTools 调试 Vue 组件

## 性能优化

1. 按需加载子应用
2. 预加载常用子应用
3. 合理配置缓存策略
4. 优化子应用体积

## License

MIT