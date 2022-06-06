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
  },
  {
    path: '/florence',
    name: 'florence',
    component: () => import('@/views/Florence/index.vue')
  },
  {
    path: '/palermo',
    name: 'palermo',
    component: () => import('@/views/Palermo/index.vue')
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
