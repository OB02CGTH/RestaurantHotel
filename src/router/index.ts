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
    path: '/folder/Favorites',
    component: () => import ('../views/FolderPage.vue')
  },
  {
    path: '/folder/Menu1',
    component: () => import ('../views/selectMenu.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
