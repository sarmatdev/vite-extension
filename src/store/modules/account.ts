export interface AccountState {
  balance: string
}

const state: AccountState = {
  balance: ''
}
const mutations = {
  setBalance(state: AccountState, balance: string) {
    console.log(balance)
    state.balance = balance
  }
}
const actions = {}
const getters = {
  balance: (s: AccountState) => s.balance
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
