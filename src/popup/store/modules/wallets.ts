import { last } from 'lodash-es'

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
    state.accounts = [...state.accounts, account]
    state.active = account
  },
  deleteWallet(state: WalletsState, address: string): void {
    state.accounts = state.accounts.filter((el) => el.address !== address)
    state.active = last(state.accounts)
  },
  setActive(state: WalletsState, address: string): void {
    state.active = state.accounts.find((el) => el.address === address)
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
