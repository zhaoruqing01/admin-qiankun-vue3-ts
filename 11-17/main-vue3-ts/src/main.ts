import { initGlobalState, registerMicroApps, start } from 'qiankun';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

createApp(App).use(router).mount('#app');

const userInfo = {
  name: 'user01',
  age: 18,
};
// 配置传参
const actions = initGlobalState(userInfo);

// 主应用修改全局状态
actions.setGlobalState({
  ...userInfo,
  sex: '男',
});

// 1. 注册微应用
registerMicroApps([
  {
    name: 'son01-vue3-ts', // 子应用name,需和package.json中的name一致
    entry: 'http://localhost:8081/', // 子应用入口地址
    container: '#micro-app-container', // 子应用挂载容器,需w和App.vue中的容器id一致,
    activeRule: '/son01-vue3-ts', // 子应用路由匹配规则
    props: {
      name: 'main-vue3-ts',
      url: 'www.baidu.com',
      onGlobalStateChange: actions.onGlobalStateChange, // 子应用监听全局状态变化
      setGlobalState: actions.setGlobalState, // 子应用设置全局状态
    }, // 父传子和全局状态管理
  },
  {
    name: 'son02-vue3-ts',
    entry: 'http://localhost:8082/',
    container: '#micro-app-container',
    activeRule: '/son02-vue3-ts',
    props: {
      name: 'main-vue3-ts',
      url: 'www.baidu.com',
      ...actions,
    },
  },
]);

// 确保dom元素挂载完成后再启动qiankun
setTimeout(() => {
  start({
    sandbox: {
      strictStyleIsolation: true, // 严格样式隔离（推荐，避免样式污染）
    },
  });
}, 0);
