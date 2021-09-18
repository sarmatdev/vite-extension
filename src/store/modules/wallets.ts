import { setStorageItem } from '@/services/storage'
import { encryptString } from '@/services/crypto'
import { v4 as uuidv4 } from 'uuid'

interface Account {
  name: string
  address: string
  privateKey: string
  salt: string
}

export interface WalletsState {
  selectedWallet: Account
  accounts: Array<Account>
}

const state = {
  selectedWallet: {},
  accounts: []
}
const mutations = {
  setWallet(state: WalletsState, account: Account): void {
    state.selectedWallet = account
    state.accounts.push(account)
  }
}
const actions = {
  //@ts-ignore
  storeWallet({ commit }, wallet) {
    const salt = uuidv4().replace(/-/g, '')
    const encryptedWallet = {
      ...wallet,
      privateKey: encryptString(wallet.privateKey, salt),
      salt
    }

    commit('setWallet', encryptedWallet)
    setStorageItem(wallet.name, encryptedWallet)
  },
  //@ts-ignore
  sendTransaction(_, { web3, tx }) {
    return web3.sendTransaction(tx)
  }
}
const getters = {
  selectedWallet: (s: WalletsState) => s.selectedWallet,
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
