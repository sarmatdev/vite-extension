import useTokens from '@/composables/useTokens'
import { Commit } from 'vuex'
import { IToken, IVitexToken } from '@/types'
import { getTokens } from '@/api/tokens.api'

export interface AccountState {
  balance: string
  tokens: Array<IToken>
  vitexTokens: Array<IVitexToken>
  selectedTokens: Array<IToken>
}

const state: AccountState = {
  balance: '',
  tokens: [],
  vitexTokens: [],
  selectedTokens: []
}
const mutations = {
  setBalance(state: AccountState, balance: string) {
    console.log(balance)
    state.balance = balance
  },
  setTokens(state: AccountState, tokens: Array<IToken>) {
    state.tokens = tokens
  },
  setVitexTokens(state: AccountState, vitexTokens: Array<IVitexToken>) {
    state.vitexTokens = vitexTokens
  },
  addSelectedTokens(state: AccountState, selectedToken: IToken) {
    state.selectedTokens.push(selectedToken)
  },
  removeSelectedTokens(state: AccountState, selectedToken: IToken) {
    state.selectedTokens = state.selectedTokens.filter(
      (el) => el.tokenId !== selectedToken.tokenId
    )
  }
}
const actions = {
  async fetchTokens({ commit }: { commit: Commit }) {
    const { getTokenInfoList } = useTokens()
    const tokens = await getTokenInfoList()
    commit('setTokens', tokens.tokenInfoList)
  },
  async fetchVitexTokens({ commit }: { commit: Commit }) {
    const vitexTokens = await getTokens()
    commit('setVitexTokens', vitexTokens.data)
  }
}
const getters = {
  balance: (s: AccountState) => s.balance,
  tokens: (s: AccountState) => s.tokens,
  vitexTokens: (s: AccountState) => s.vitexTokens,
  selectedTokens: (s: AccountState) => s.selectedTokens
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
