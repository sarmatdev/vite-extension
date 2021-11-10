import { find } from 'lodash-es'

export interface Account {
  name: string
  address: string
  privateKey: string
  salt: string
}

export interface WalletsState {
  active: Account | undefined
  accounts: Array<Account>
}

const state = {
  active: {},
  accounts: []
}
const mutations = {
  setWallet(state: WalletsState, account: Account): void {
    state.active = account
    state.accounts.push(account)
  },
  setActive(state: WalletsState, address: string): void {
    const active = find(state.accounts, { address: address })
    state.active = active
  }
}

const getters = {
  active: (s: WalletsState) => s.active,
  accounts: (s: WalletsState) => s.accounts,
  accountsNum: (s: WalletsState) => s.accounts.length
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}
