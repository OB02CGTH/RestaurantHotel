import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/folder/MenuPage'
  },
  {
    path: '/folder/:id',
    component: () => import ('../views/FolderPage.vue')
  },
  {
    path: '/folder/MenuPage',
    component: () => import ('../views/MenuPage.vue')
  },
  {
    path: '/folder/Menu1',
    component: () => import ('../views/OptionMenu.vue')
  },
  {
    path: '/folder/Order',
    component: () => import ('../views/OrderPage.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
