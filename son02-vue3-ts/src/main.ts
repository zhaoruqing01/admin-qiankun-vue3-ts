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
      console.error('Error pre-unmounting app:', error);
    }
    app = null;
  }

  // 清理之前的 DOM
  if (mountedContainer) {
    try {
      mountedContainer.innerHTML = '';
    } catch (error) {
      console.error('Error cleaning container:', error);
    }
  }

  app = createApp(App);

  // 判断是否有container，有则挂载到主应用的container上，没有则挂载到自己的#app上
  if (typeof container === 'string') {
    // 独立运行时，container 是选择器字符串
    const el = document.querySelector(container);
    if (el) {
      el.innerHTML = '<div id="app"></div>';
      mountedContainer = el.firstChild;
      app.mount(mountedContainer);
    }
  } else if (container instanceof HTMLElement) {
    // qiankun 环境，container 是 DOM 元素
    let mountPoint = container.querySelector('#app');
    if (!mountPoint) {
      container.innerHTML = '<div id="app"></div>';
      mountPoint = container.firstChild as Element;
    } else {
      mountPoint.innerHTML = '';
    }
    mountedContainer = mountPoint;
    app.mount(mountPoint);
  } else {
    // 其他情况，默认挂载到 #app
    const el = document.querySelector('#app');
    if (el) {
      el.innerHTML = '';
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
  createVueApp(props.container);
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
