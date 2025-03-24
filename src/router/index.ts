import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Main from './main'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    Main,
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../layouts/error.vue'),
    },
  ] as RouteRecordRaw[],
})

export default router
