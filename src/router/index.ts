import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/folder/MenuPage'
  },
  {
    path: '/folder/:id',
    component: () => import ('../views/Menu/OptionMenu.vue')
  },
  {
    path: '/folder/MenuPage',
    component: () => import ('../views/Menu/MenuPage.vue')
  },
  {
    path: '/folder/ListMenu',
    component: () => import ('../views/Menu/ListMenu.vue')
  },
  {
    path: '/folder/Order',
    component: () => import ('../views/Order/OrderPage.vue')
  },
  {
    path: '/folder/cheforder',
    component: () => import ('../views/Chef/ChefOrder.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
