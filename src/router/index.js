import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import FrontView from '@/views/FrontView.vue'
import BackView from '@/views/BackView.vue'

import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import AdminView from '@/views/AdminView.vue'

import SlotView from '@/views/SlotView.vue'
import CalendarView from '@/views/CalendarView.vue'
import ScrollView from '@/views/ScrollView.vue'
import AjaxView from '@/views/AjaxView.vue'
import AjaxView2 from '@/views/AjaxView2.vue'
import FilterView from '@/views/FilterView.vue'
import TdxView from '@/views/TdxView.vue'
import Tdx2View from '@/views/Tdx2View.vue'

import NotFound from '@/views/NotFound.vue'

import Featrue from '@/views/featrue/Index.vue'
import FeatrueImageZoom from '@/views/featrue/ImageZoom.vue'
import FeatrueImageImport from '@/views/featrue/ImageImport.vue'
import FeatrueElement from '@/views/featrue/Element.vue'

import Pagination from '@/views/pagination/Index.vue'
import PaginationBasic from '@/views/pagination/Basic.vue'
import PaginationAround from '@/views/pagination/Around.vue'
import PaginationTop from '@/views/pagination/Top.vue'

// import ShopView from '@/views/ShopView.vue'
import ShopView from '@/views/shop/Index.vue'
import ShopList from '@/views/shop/ShopList.vue'
import ShopInfo from '@/views/shop/ShopInfo.vue'

import Modal from '@/views/Modal.vue'

export const BackRoute = [
  {
    path: '/login',
    name: 'login',
    chName: '登入',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    chName: '註冊',
    component: RegisterView
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView
  }
]
export const FrontRoute = [
  {
    path: '/slot',
    name: 'slot',
    chName: 'Slot',
    component: SlotView
  },
  {
    path: '/shop',
    name: 'shop',
    chName: '商品',
    component: ShopView,
    children: [
      {
        path: '',
        name: 'shopList',
        component: ShopList,
        alias: ['list']
      },
      {
        path: 'info/:productID(\\d+)',
        name: 'shopInfo',
        component: ShopInfo
      }
    ]
  },
  {
    path: '/modal',
    name: 'modal',
    chName: '燈箱',
    component: Modal
  },
  {
    path: '/calendar',
    name: 'calendar',
    chName: '日曆套件',
    component: CalendarView
  },
  {
    path: '/scroll',
    name: 'scroll',
    chName: 'scroll事件',
    component: ScrollView
  },
  {
    path: '/ajax',
    name: 'ajax',
    chName: 'ajax的三種方法',
    component: AjaxView
  },
  {
    path: '/api2',
    name: 'api2',
    chName: '觀光api',
    component: AjaxView2
  },
  {
    path: '/filter',
    name: 'filter',
    chName: 'filter資料',
    component: FilterView
  },
  {
    path: '/pagination',
    name: 'pagination',
    chName: 'pagination分頁',
    component: Pagination,
    children: [
      { path: 'basic', component: PaginationBasic },
      { path: 'around', component: PaginationAround },
      { path: 'top', component: PaginationTop }
    ],
  },
  {
    path: '/tdx',
    name: 'tdx',
    chName: 'Tdx API取得並顯示在地圖',
    component: TdxView
  },
  {
    path: '/tdx2',
    name: 'tdx2',
    chName: 'Tdx API取得並顯示在地圖2',
    component: Tdx2View
  },
  {
    path: '/featrue',
    name: 'featrue',
    chName: '放大鏡&載入圖片',
    component: Featrue,
    children: [
      { path: 'imageZoom', component: FeatrueImageZoom },
      { path: 'imageImport', component: FeatrueImageImport },
      { path: 'element', component: FeatrueElement }
    ],
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

export const routes = [
  {
    path: '/',
    name: 'home',
    chName: '首頁',
    component: HomeView
  },
  {
    path: '/home',
    name: 'frontpage',
    chName: '首頁',
    component: FrontView
  },
  {
    path: '/backstage',
    name: 'backpage',
    chName: '後台首頁',
    component: BackView
  },
  ...FrontRoute,
  ...BackRoute,
  {
    path: '/:pathMatch(.*)*', name: '404', component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
