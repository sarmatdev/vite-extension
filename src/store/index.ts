import { createStore } from 'vuex'
import wallets from './modules/wallets'
import auth from './modules/auth'

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: { wallets, auth }
})
