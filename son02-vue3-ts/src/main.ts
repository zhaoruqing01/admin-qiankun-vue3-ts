import renderWithQiankun, { qiankunWindow } from 'vite-plugin-qiankun/dist/helper';
import { createApp } from 'vue';
import App from './App.vue';
import './style.css';

let app: any = null;

// 判断是否为qiankun模式
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  // 不是则渲染到自己的app
  createApp(App).mount('#app');
} else {
  renderWithQiankun({
    // 三个生命周期钩子
    bootstrap: () => {
      console.log('son02-vue3-ts bootstrap');
    },
    mount: (props: any) => {
      app = createApp(App);
      app.mount(props.container.querySelector('#app'));
      console.log('son02-vue3-ts mount', props);
    },
    unmount: () => {
      console.log('son02-vue3-ts unmount');
      app.unmount();
      app = null;
    },
    update: () => {
      console.log('son02-vue3-ts update');
    },
  });
}
