import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home/index.vue')
  },
  {
    path: '/map',
    name: 'map',
    component: () => import('@/views/Map/index.vue')
  },
  {
    path: '/venice',
    name: 'Venice',
    component: () => import('@/views/Venice/index.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
