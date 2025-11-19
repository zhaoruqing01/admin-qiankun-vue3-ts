import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper';
import { createRouter, createWebHistory } from 'vue-router';

const base = qiankunWindow.__POWERED_BY_QIANKUN__ ? '/son01-vue3-ts' : '/';

const router = createRouter({
  history: createWebHistory(base),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../components/Home.vue'),
      meta: {
        title: '首页',
      },
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../components/About.vue'),
      meta: {
        title: '关于',
      },
    },
  ],
});

export default router;
