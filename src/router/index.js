import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ShopView from '../views/ShopView.vue'
import CalendarView from '../views/CalendarView.vue'
import ScrollView from '../views/ScrollView.vue'

import Featrue from '../views/FeatrueView.vue'
import FeatrueImageZoom from '../views/featrue/ImageZoom.vue'
import FeatrueImageZoomLib from '../views/featrue/ImageZoomLib.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/shop',
    name: 'shop',
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
      { path: 'imageZoomLib', component: FeatrueImageZoomLib }
    ],
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
