import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/Home.vue'),
      meta: { title: '首页' },
    },
    {
      path: '/son01-vue3-ts/*',
      name: 'son01-vue3-ts',
      component: () => import('../components/MicroAppContainer.vue'),
      meta: { title: '微应用1' },
    },
    {
      path: '/son02-vue3-ts/*',
      name: 'son02-vue3-ts',
      component: () => import('../components/MicroAppContainer.vue'),
      meta: { title: '微应用2' },
    },
  ],
});

export default router;
