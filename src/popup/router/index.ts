import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { saveValue, getValue } from '../../services/storage'
import { computed } from 'vue'
//? with useStore dont work
import store from '../store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      requiredAccount: true,
      authenticate: true
    }
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: () => import('../views/Welcome.vue'),
    meta: {
      authenticate: true
    }
  },
  {
    path: '/create-password',
    name: 'CreatePassword',
    component: () => import('../views/CreatePassword.vue')
  },
  {
    path: '/lock',
    name: 'Lock',
    component: () => import('../views/Lock.vue')
  },
  {
    path: '/create-wallet',
    name: 'CreateWallet',
    component: () => import('../views/wallet/CreateWallet.vue'),
    meta: {
      authenticate: true
    }
  },
  {
    path: '/import-wallet',
    name: 'ImportWallet',
    component: () => import('../views/wallet/ImportWallet.vue'),
    meta: {
      authenticate: true
    }
  },
  {
    path: '/manage-assets',
    name: 'ManageAssets',
    component: () => import('../views/ManageAssets.vue'),
    meta: {
      requiredAccount: true,
      authenticate: true
    }
  },
  {
    path: '/menu',
    name: 'Menu',
    component: () => import('../views/Menu.vue'),
    meta: {
      requiredAccount: true,
      authenticate: true
    }
  },
  {
    path: '/send',
    name: 'Send',
    component: () => import('../views/Send.vue'),
    meta: {
      requiredAccount: true,
      authenticate: true
    }
  },
  {
    path: '/recieve',
    name: 'Recieve',
    component: () => import('../views/Recieve.vue'),
    meta: {
      requiredAccount: true,
      authenticate: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/API/Login.vue')
  },
  {
    path: '/personal-sign',
    name: 'PersonalSign',
    component: () => import('../views/API/PersonalSign.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const isLocked = computed(() => store.getters['settings/isLocked'])
const accounts = computed(() => store.getters['wallets/accounts'])
const password = computed(() => store.getters['settings/password'])
const timeout = computed(() => store.getters['settings/timeout'])
const AppState = getValue('AppState')

router.beforeEach(async (to: any, from: any, next: any) => {
  if (to.matched.some((record) => record.meta.authenticate)) {
    if (!password.value) {
      next({ path: '/create-password' })
    } else if (isLocked.value) {
      next({ path: '/lock' })
    } else if (AppState) {
      const lastClosed = AppState
      if (lastClosed && accounts.value.length && password.value) {
        const now = Date.now()
        //@ts-ignore
        const offset = now - lastClosed
        if (offset >= timeout.value) {
          store.dispatch('settings/storeIsLocked', true)
          next({ path: '/lock' })
        }
      }
      saveValue({ ...AppState, lastOpened: Date.now() })
      next()
    }
  }
  if (to.matched.some((record) => record.meta.requiredAccount)) {
    if (!accounts.value.length) {
      next({ path: '/welcome' })
    }
  }
  next()
})

export default router
