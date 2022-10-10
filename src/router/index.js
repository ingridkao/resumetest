import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import FrontView from '@/views/FrontView.vue'
import BackView from '@/views/BackView.vue'

import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import AdminView from '@/views/AdminView.vue'

import CalendarView from '@/views/CalendarView.vue'
import ScrollView from '@/views/ScrollView.vue'
import AjaxView from '@/views/AjaxView.vue'
import TdxView from '@/views/TdxView.vue'
import Tdx2View from '@/views/Tdx2View.vue'

import NotFound from '@/views/NotFound.vue'

import Featrue from '@/views/featrue/Index.vue'
import FeatrueImageZoom from '@/views/featrue/ImageZoom.vue'
import FeatrueImageImport from '@/views/featrue/ImageImport.vue'
import FeatrueElement from '@/views/featrue/Element.vue'

// import ShopView from '@/views/ShopView.vue'
import ShopView from '@/views/shop/Index.vue'
import ShopList from '@/views/shop/ShopList.vue'
import ShopInfo from '@/views/shop/ShopInfo.vue'

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
    chName: '功能',
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
