import useTokens from '@/composables/useTokens'
import { Commit } from 'vuex'

export interface IToken {
  decimals: number
  index: number
  isOwnerBurnOnly: boolean
  isReIssuable: boolean
  maxSupply: string
  owner: string
  ownerBurnOnly: boolean
  tokenId: string
  tokenName: string
  tokenSymbol: string
  totalSupply: string
}
export interface AccountState {
  balance: string
  tokens: Array<IToken>
  selectedTokens: Array<IToken>
}

const state: AccountState = {
  balance: '',
  tokens: [],
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
