import { setStorageItem } from '@/services/storage'
import { encryptString } from '@/services/crypto'
import { v4 as uuidv4 } from 'uuid'
import { Commit } from 'vuex'
import { find } from 'lodash-es'
import { Account } from '@/types'

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
    // @ts-ignore
    console.log(address)
    const active = find(state.accounts, { address: address })
    state.active = active
  }
}
const actions = {
  storeWallet({ commit }: { commit: Commit }, wallet: any) {
    const salt = uuidv4().replace(/-/g, '')

    const encryptedWallet = {
      ...wallet,
      privateKey: encryptString(wallet.privateKey, salt),
      salt
    }

    console.log('salt', salt)
    console.log('encryptedWallet', encryptedWallet)

    commit('setWallet', encryptedWallet)
    setStorageItem(wallet.name, encryptedWallet)
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
