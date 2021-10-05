import { setStorageItem, removeStorageItem } from '@/services/storage'
import { encryptString } from '@/services/crypto'
import { nanoid } from 'nanoid'
import { Commit } from 'vuex'
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
const actions = {
  storeWallet({ commit }: { commit: Commit }, wallet: any) {
    const salt = nanoid(24)

    const encryptedWallet = {
      ...wallet,
      privateKey: encryptString(wallet.privateKey, salt),
      salt
    }

    commit('setWallet', encryptedWallet)
    setStorageItem(wallet.name, encryptedWallet)
  },
  deleteWallet(_, key: string) {
    removeStorageItem(key)
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
  actions,
  getters
}
