import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/MenuPage'
  },
  {
    path: '/MenuPage',
    component: () => import ('../views/Menu/MenuPage.vue'),
  },
  {
    path: '/MenuPage/:id',
    component: () => import ('../views/Menu/MenuPage.vue'),
    name: 'menu2'
  },
  {
    path: '/option/:id/:name/:category',
    component: () => import ('../views/Menu/OptionMenu.vue'),
    name: 'option'
  },
  {
    path: '/option/:id/:name/:category/:idorder',
    component: () => import ('../views/Menu/OptionMenu.vue'),
    name: 'option2'
  },
  {
    path: '/Order',
    component: () => import ('../views/Order/OrderPage.vue')
  },
  {
    path: '/ListMenu/:id',
    component: () => import ('../views/Menu/ListMenu.vue'),
    name: 'listmenu'
  },
  {
    path: '/room',
    component: () => import ('../views/Order/OrderRoomPage.vue')
  },
  {
    path: '/delivery',
    component: () => import ('../views/FolderPage.vue')
  },
  {
    path: '/Cheforder',
    component: () => import ('../views/Chef/ChefOrder.vue')
  },
  {
    path: '/folder/room',
    component: () => import ('../views/room/OrderRoomPage.vue')
  },
  {
    path: '/folder/delivery',
    component: () => import ('../views/delivery/OrderDeliveryPage.vue')
  },

  // จ้องห้อง
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

  // จัดการร้าน
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
  {
    path: '/folder/manageeditdetails',
    component: () => import ('../views/manage/ManageEditDetails.vue')
  },
  {
    path: '/folder/managemenuincategory',
    component: () => import ('../views/manage/ManageMenuInCategory.vue')
  },

  {
    path: '/folder/managemenuincategory',
    component: () => import ('../views/manage/ManageMenuInCategory.vue')
  },
  {
    path: '/folder/setupshop',
    component: () => import ('../views/set/SetUpShop.vue')
  },
  {
    path: '/folder/record',
    component: () => import ('../views/record/RecordMenu.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
