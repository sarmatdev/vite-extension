import { Commit } from 'vuex'
import { saveValue } from '../../../services/storage'

export interface AuthState {
  isAuth: boolean
}

const state = {
  isAuth: false
}
const mutations = {
  setAuth(state: AuthState, auth: boolean): void {
    state.isAuth = auth
  }
}
const actions = {
  storeAuth({ commit }: { commit: Commit }, auth: boolean): void {
    commit('setAuth', auth)
    // setStorageItem('isAuth', auth)
  }
}
const getters = {
  isAuth: (s: AuthState): boolean => s.isAuth
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
