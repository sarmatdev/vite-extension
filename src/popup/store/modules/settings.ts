import { Commit } from 'vuex'

export interface SettingsState {
  isLocked: boolean
  password: string,
  timeout: number
}

const state: SettingsState = {
  isLocked: true,
  password: '',
  timeout: 30 * 60 * 1000
}

const mutations = {
  setLock(state: SettingsState, lock: boolean): void {
    state.isLocked = lock
  },
  setPassword(state: SettingsState, password: string): void {
    state.password = password
  },
  setTimeout(state: SettingsState, timeout: number) {
    state.timeout = timeout;
  },
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
  password: (s: SettingsState) => s.password,
  timeout: (s: SettingsState) => s.timeout
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
