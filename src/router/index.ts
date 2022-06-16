import { createRouter, createWebHistory, RouteRecordRaw,createWebHashHistory } from 'vue-router';
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
  {
    path: '/chat',
    name: 'chat',
    component: () => import('@/components/Chat/index.vue')
  },
];

const router = createRouter({
  history: createWebHashHistory (process.env.BASE_URL),
  routes
});

export default router;
