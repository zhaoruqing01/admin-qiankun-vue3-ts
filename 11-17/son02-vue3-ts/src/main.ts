/// <reference path="./types/qiankun.d.ts" />

import { createApp } from 'vue';
import App from './App.vue';
import './style.css';

// 1. 动态设置publicPath(解决子应用静态资源路径问题)
if (window.__POWERED_BY_QIANKUN__) {
  // 嵌入主应用时，用 qiankun 注入的路径
  window.__vite_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

let app: any = null;
let mountedContainer: any = null; // 保存挂载容器引用

// 2. 创建vue实例函数
const createVueApp = (container: HTMLElement | string | any) => {
  // 如果已经有应用实例，先卸载
  if (app) {
    try {
      app.unmount();
    } catch (error) {
      console.warn('Warning unmounting app:', error);
    }
    app = null;
  }
  
  // 清理之前的 DOM
  if (mountedContainer) {
    try {
      // 使用 textContent 而不是 innerHTML，更安全
      mountedContainer.textContent = '';
    } catch (error) {
      console.warn('Warning cleaning container:', error);
    }
  }

  app = createApp(App);
  
  // 判断是否有container，有则挂载到主应用的container上，没有则挂载到自己的#app上
  if (typeof container === 'string') {
    // 独立运行时，container 是选择器字符串
    const el = document.querySelector(container);
    if (el) {
      el.textContent = '';
      mountedContainer = el;
      app.mount(el);
    }
  } else if (container instanceof HTMLElement) {
    // qiankun 环境，container 是 DOM 元素，直接挂载到该元素上
    container.textContent = '';
    mountedContainer = container;
    app.mount(container);
  } else {
    // 其他情况，默认挂载到 #app
    const el = document.querySelector('#app');
    if (el) {
      el.textContent = '';
      mountedContainer = el;
      app.mount(el);
    }
  }
};

// 3. 独立运行时（非qiankun环境）的挂载逻辑
if (!window.__POWERED_BY_QIANKUN__) {
  createVueApp('#app');
}

// 4. 暴露三个生命周期针騩给qiankun

// 4.1 第一次初始化时调用 - bootstrap
export const bootstrap = () => {
  console.log('son02 bootstrap');
};

// 4.2 每次应用激活时调用 - mount
export const mount = (props: any) => {
  console.log('son02 mount');
  // 延迟挂载，给 HMR 系统时间清理
  setTimeout(() => {
    createVueApp(props.container);
  }, 50);
};

// 4.3 卸载时调用 - unmount
export const unmount = () => {
  console.log('son02 unmount');
  if (app) {
    try {
      app.unmount();
    } catch (error) {
      console.error('Error unmounting app:', error);
    }
    app = null;
  }
};
