import { initGlobalState, registerMicroApps, start } from 'qiankun';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style.css';

// 初始化全局状态
const userInfo = {
  name: '张三',
  age: 18,
};
const actions = initGlobalState(userInfo);

// 导出actions以便在其他组件中更新全局状态
export { actions };
// 创建Vue应用实例
const app = createApp(App);
app.config.globalProperties.$microActions = actions;

// 注册路由
app.use(router);

// 挂载应用
app.mount('#app');

// 注册微应用
registerMicroApps([
  {
    name: 'son01-vue3-ts',
    entry: '//localhost:8081/',
    container: '#micro-app-container',
    activeRule: '/son01-vue3-ts',
    props: {
      theme: 'light',
      onGlobalStateChange: actions.onGlobalStateChange,
      setGlobalState: actions.setGlobalState,
    },
  },
  {
    name: 'son02-vue3-ts',
    entry: '//localhost:8082/',
    container: '#micro-app-container',
    activeRule: '/son02-vue3-ts',
  },
]);

// 启动qiankun
start({
  sandbox: {
    experimentalStyleIsolation: true, // 使用实验性样式隔离
  },
});
