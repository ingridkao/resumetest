import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ShopView from '../views/ShopView.vue'
import CalendarView from '../views/CalendarView.vue'
import ScrollView from '../views/ScrollView.vue'

import NotFound from '../views/NotFound.vue'

import Featrue from '../views/featrue/Index.vue'
import FeatrueImageZoom from '../views/featrue/ImageZoom.vue'
import FeatrueImageImport from '../views/featrue/ImageImport.vue'
import FeatrueElement from '../views/featrue/Element.vue'

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
    path: '/shop/:productID(\\d+)',
    name: 'shop',
    chName: '商品',
    component: ShopView
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: CalendarView
  },
  {
    path: '/scroll',
    name: 'scroll',
    component: ScrollView
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
