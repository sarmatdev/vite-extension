import useTokens from '@/composables/useTokens'
import { Commit } from 'vuex'
import { IToken, IMarket } from '@/types'

export interface AccountState {
  balance: string
  tokens: Array<IToken>
  selectedTokens: Array<IToken>
  markets: Array<IMarket>
}

const state: AccountState = {
  balance: '',
  tokens: [],
  selectedTokens: [],
  markets: []
}
const mutations = {
  setBalance(state: AccountState, balance: string) {
    console.log(balance)
    state.balance = balance
  },
  setTokens(state: AccountState, tokens: Array<IToken>) {
    state.tokens = tokens
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
  }
}
const getters = {
  balance: (s: AccountState) => s.balance,
  tokens: (s: AccountState) => s.tokens,
  selectedTokens: (s: AccountState) => s.selectedTokens
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
