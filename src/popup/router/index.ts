import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { getStorageItem } from '@/services/storage'
import Home from '../views/Home.vue'

async function checkAuth(to: any, from: any, next: any) {
  const isAuth = await getStorageItem('isAuth')

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
    path: '/welcome',
    name: 'Welcome',
    component: () => import('../views/Welcome.vue')
  },
  {
    path: '/create-wallet',
    name: 'CreateWallet',
    component: () => import('../views/wallet/CreateWallet.vue')
  },
  {
    path: '/import-wallet',
    name: 'ImportWallet',
    component: () => import('../views/wallet/ImportWallet.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    beforeEnter: checkAuth
  },
  {
    path: '/manage-assets',
    name: 'ManageAssets',
    component: () => import('../views/ManageAssets.vue')
  },
  {
    path: '/menu',
    name: 'Menu',
    component: () => import('../views/Menu.vue'),
    beforeEnter: checkAuth
  },
  {
    path: '/send',
    name: 'Send',
    component: () => import('../views/Send.vue'),
    beforeEnter: checkAuth
  },
  {
    path: '/recieve',
    name: 'Recieve',
    component: () => import('../views/Recieve.vue'),
    beforeEnter: checkAuth
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
