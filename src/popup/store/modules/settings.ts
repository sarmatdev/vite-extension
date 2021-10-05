export interface SettingsState {
  isLocked: boolean
}

const state: SettingsState = {
  isLocked: false
}

const mutations = {
  setLock(state: SettingsState, lock: boolean): void {
    state.isLocked = lock
  }
}
const actions = {}
const getters = {
  isLocked: (s: SettingsState) => s.isLocked
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
