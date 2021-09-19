import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import modules from './modules'
console.log(Object.keys(modules))
export default createStore({
  modules,
  plugins: [
    createPersistedState({
      paths: Object.keys(modules)
    })
  ]
})
