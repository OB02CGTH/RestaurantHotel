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
  {
    path: '/folder/reserveTable',
    component: () => import ('../views/reserveTable/searchTable.vue')
  },
  {
    path: '/folder/detailsTable',
    component: () => import ('../views/reserveTable/DetailsTable.vue')
  },
  {
    path: '/folder/summaryTable',
    component: () => import ('../views/reserveTable/SummaryTable.vue')
  },



  {
    path: '/folder/manage',
    component: () => import ('../views/manage/MenuPageManage.vue')
  },
  {
    path: '/folder/mnageeditmenu',
    component: () => import ('../views/manage/ManageEditMenu.vue')
  },
  {
    path: '/folder/managelistcategory',
    component: () => import ('../views/manage/ManageListCategory.vue')
  },
  {
    path: '/folder/manageaddcategory',
    component: () => import ('../views/manage/ManageAddCategory.vue')
  },
  {
    path: '/folder/managelistmenu',
    component: () => import ('../views/manage/ManageListMenu.vue')
  },
  {
    path: '/folder/managelistdetails',
    component: () => import ('../views/manage/ManageListDetails.vue')
  },
  {
    path: '/folder/manageadddetails',
    component: () => import ('../views/manage/ManageAddDetails.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
