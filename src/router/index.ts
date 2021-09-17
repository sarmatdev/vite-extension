import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { getStorageItem } from '@/services/storage'
import Home from '../views/Home.vue'

async function checkAuth(to: any, from: any, next: any) {
  const isAuth = await getStorageItem('isAuth')
  console.log(isAuth)
  if (isAuth) {
    next()
  } else {
    next('/')
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    beforeEnter: checkAuth
  },
  {
    path: '/menu',
    name: 'Menu',
    component: () => import('../views/Menu.vue'),
    beforeEnter: checkAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
