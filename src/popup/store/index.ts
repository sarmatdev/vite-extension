import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import modules from './modules'

export default createStore({
  modules,
  plugins: [
    createPersistedState({
      paths: Object.keys(modules)
    })
  ]
})
