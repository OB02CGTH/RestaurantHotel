import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/MenuPage'
  },
  {
    path: '/:name/:category',
    component: () => import ('../views/Menu/OptionMenu.vue'),
    name: 'option'
  },
  {
    path: '/MenuPage',
    component: () => import ('../views/Menu/MenuPage.vue')
  },
  {
    path: '/ListMenu',
    component: () => import ('../views/Menu/ListMenu.vue')
  },
  {
    path: '/Order',
    component: () => import ('../views/Order/OrderPage.vue')
  },
  {
    path: '/cheforder',
    component: () => import ('../views/Chef/ChefOrder.vue')
  },
  {
    path: '/reserveTable',
    component: () => import ('../views/reserveTable/searchTable.vue')
  },
  {
    path: '/detailsTable',
    component: () => import ('../views/reserveTable/DetailsTable.vue')
  },
  {
    path: '/summaryTable',
    component: () => import ('../views/reserveTable/SummaryTable.vue')
  },
  {
    path: '/manage',
    component: () => import ('../views/manage/MenuPageManage.vue')
  },
  {
    path: '/mnageeditmenu',
    component: () => import ('../views/manage/ManageEditMenu.vue')
  },
  {
    path: '/managelistcategory',
    component: () => import ('../views/manage/ManageListCategory.vue')
  },
  {
    path: '/manageaddcategory',
    component: () => import ('../views/manage/ManageAddCategory.vue')
  },
  {
    path: '/managelistmenu',
    component: () => import ('../views/manage/ManageListMenu.vue')
  },
  {
    path: '/managelistdetails',
    component: () => import ('../views/manage/ManageListDetails.vue')
  },
  {
    path: '/manageadddetails',
    component: () => import ('../views/manage/ManageAddDetails.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
