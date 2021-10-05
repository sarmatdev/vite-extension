import { Commit, Dispatch } from 'vuex'
import { setStorageItem } from '@/services/storage'

export interface AuthState {
  isAuth: boolean
  password: string
}

const state = {
  isAuth: false,
  password: ''
}
const mutations = {
  setPassword(state: AuthState, password: string): void {
    state.password = password
  },
  setAuth(state: AuthState, auth: boolean): void {
    state.isAuth = auth
  }
}
const actions = {
  storePassword(
    { commit, dispatch }: { commit: Commit; dispatch: Dispatch },
    password: string
  ): void {
    commit('setPassword', password)
    setStorageItem('password', password)
    dispatch('storeAuth', true)
  },
  storeAuth({ commit }: { commit: Commit }, auth: boolean): void {
    console.log('storeAuth')
    commit('setAuth', auth)
    setStorageItem('isAuth', auth)
  }
}
const getters = {
  isAuth: (s: AuthState): boolean => s.isAuth,
  hasPassword: (s: AuthState): boolean => !!s.password
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
