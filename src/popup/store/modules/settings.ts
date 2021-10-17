import { Commit } from 'vuex'

export interface SettingsState {
  isLocked: boolean
  password: string
}

const state: SettingsState = {
  isLocked: false,
  password: ''
}

const mutations = {
  setLock(state: SettingsState, lock: boolean): void {
    state.isLocked = lock
  },
  setPassword(state: SettingsState, password: string): void {
    state.password = password
  }
}
const actions = {
  storePassword(
    { commit }: { commit: Commit},
    password: string
  ): void {
    commit('setPassword', password)
  },
  storeIsLocked(
{ commit }: { commit: Commit},
    isLocked: boolean
  ): void {
    commit('setLock', isLocked)
  }
}

const getters = {
  isLocked: (s: SettingsState) => s.isLocked,
  password: (s: SettingsState) => s.password
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
