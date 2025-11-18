import { createRouter, createWebHistory } from 'vue-router';

// 在qiankun环境下，需要设置basename
const router = createRouter({
  history: createWebHistory(window.__POWERED_BY_QIANKUN__ ? '/son01-vue3-ts/' : '/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/Home.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../components/About.vue'),
    },
  ],
});

// 暴露路由实例供主应用使用
export default router;
