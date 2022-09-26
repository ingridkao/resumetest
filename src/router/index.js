import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CalendarView from '@/views/CalendarView.vue'
import ScrollView from '@/views/ScrollView.vue'
import AjaxView from '@/views/AjaxView.vue'
import TdxView from '@/views/TdxView.vue'
import MapView from '@/views/MapView.vue'

import NotFound from '@/views/NotFound.vue'

import Featrue from '@/views/featrue/Index.vue'
import FeatrueImageZoom from '@/views/featrue/ImageZoom.vue'
import FeatrueImageImport from '@/views/featrue/ImageImport.vue'
import FeatrueElement from '@/views/featrue/Element.vue'

// import ShopView from '@/views/ShopView.vue'
import ShopView from '@/views/shop/Index.vue'
import ShopList from '@/views/shop/ShopList.vue'
import ShopInfo from '@/views/shop/ShopInfo.vue'

export const routes = [
  {
    path: '/',
    name: 'home',
    chName: '首頁',
    component: HomeView
  },
  {
    // path: '/shop',
    // path: '/shop/:productID',
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
    path: '/map',
    name: 'map',
    chName: '多筆資料顯示在地圖',
    component: MapView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
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
    path: '/:pathMatch(.*)*', name: '404', component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
