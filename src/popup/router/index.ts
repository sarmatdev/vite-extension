import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { computed } from 'vue';
//? with useStore dont work
import store from '../store'

const isLocked = computed(() => store.getters['settings/isLocked'])
const accounts = computed(() => store.getters['wallets/accounts'])
const password = computed(() => store.getters['settings/password'])

async function checkAuth(to: any, from: any, next: any) {
  if (isLocked.value) {
    next({ path: "/lock" });
  } else if (!password.value) {
    next({ path: "/create-password" });
  } else if (!accounts.value.length) {
    next({ path: "/welcome" });
  }
  next()
}

async function checkLock(to: any, from: any, next: any) {
  if(!isLocked.value) {
    next(false)
  }
  next()
}

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "AuthRoute",
    component: () => import('../AuthRoute.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    beforeEnter: checkAuth
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: () => import('../views/Welcome.vue'),
    beforeEnter: checkAuth
  },
  {
    path: '/create-password',
    name: 'CreatePassword',
    component: () => import('../views/CreatePassword.vue'),
    beforeEnter: checkLock
  },
  {
    path: '/lock',
    name: 'Lock',
    component: () => import('../views/Lock.vue'),
    beforeEnter: checkLock
  },
  {
    path: '/create-wallet',
    name: 'CreateWallet',
    component: () => import('../views/wallet/CreateWallet.vue'),
    beforeEnter: checkAuth
  },
  {
    path: '/import-wallet',
    name: 'ImportWallet',
    component: () => import('../views/wallet/ImportWallet.vue'),
    beforeEnter: checkAuth
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
    component: () => import('../views/ManageAssets.vue'),
    beforeEnter: checkAuth
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
