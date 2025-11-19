import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: '首页',
      },
    },
    {
      path: '/son01-vue3-ts/:pathMatch(.*)*',
      name: 'son01-vue3-ts',
      component: () => import('../components/micro-apps-container.vue'),
      meta: {
        title: 'vue3-ts子应用01',
      },
    },
    {
      path: '/son02-vue3-ts/:pathMatch(.*)*',
      name: 'son02-vue3-ts',
      component: () => import('../components/micro-apps-container.vue'),
      meta: {
        title: 'vue3子应用02',
      },
    },
  ],
});

export default router;
