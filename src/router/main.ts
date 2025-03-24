import type { RouteRecordRaw } from 'vue-router'
import { MainRouteNames } from '@/router/types/route-names'
import MainRouterView from '../pages/main/main-router-view.vue'
import mainMiddleware from '@/middleware/main-middleware'

const mainRoutes: RouteRecordRaw = {
  path: '/',
  name: MainRouteNames.MAIN,
  component: MainRouterView,
  beforeEnter: mainMiddleware,
  children: [
    {
      path: 'categories',
      name: MainRouteNames.CATEGORIES,
      component: () => import('../pages/main/categories/index.vue'),
      meta: { title: 'Categories' }
    },
    {
      path: 'category/:id',
      name: MainRouteNames.CATEGORY_DETAILS,
      component: () => import('../pages/main/categories/_id.vue'),
      meta: { title: 'Category Details' },
      props: true
    },
    {
      path: 'category/:id/:productId',
      name: MainRouteNames.PRODUCT_DETAILS,
      component: () => import('../pages/main/categories/_product.vue'),
      meta: { title: 'Product Details' },
      props: true
    },
    {
      path: 'cart',
      name: MainRouteNames.CART,
      component: () => import('../pages/main/cart/index.vue'),
      meta: { title: 'Shopping Cart' }
    }
  ]
}

export default mainRoutes
