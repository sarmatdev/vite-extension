import { Commit } from 'vuex'
import { IVitexToken} from '@/types'
import { getTokens } from '@/api/tokens.api'
import { getExchangeRate } from '@/api/exchange-rate.api'


export interface AccountState {
  balance: string
  vitexTokens: Array<IVitexToken>
  selectedTokens: Array<IVitexToken>
  prices: Array<any>
}

const state: AccountState = {
  balance: '',
  vitexTokens: [],
  selectedTokens: [],
  prices: []
}
const mutations = {
  setBalance(state: AccountState, balance: string) {
    console.log(balance)
    state.balance = balance
  },
  setVitexTokens(state: AccountState, vitexTokens: Array<IVitexToken>) {
    state.vitexTokens = vitexTokens
  },
  addSelectedTokens(state: AccountState, selectedToken: IVitexToken) {
    state.selectedTokens.push(selectedToken)
  },
  removeSelectedTokens(state: AccountState, selectedToken: IVitexToken) {
    state.selectedTokens = state.selectedTokens.filter(
      (el) => el.tokenId !== selectedToken.tokenId
    )
  },
  setPrices(state: AccountState, prices) {
    state.prices = prices
  }
}
const actions = {
  async fetchVitexTokens({ commit }: { commit: Commit }) {
    const vitexTokens = await getTokens()
    commit('setVitexTokens', vitexTokens)
  },
 async fetchPrices(context) {
  const prices = []
  await context.getters.vitexTokens.forEach( async (el) => {
    const res = await getExchangeRate(el.tokenId)
    //@ts-ignore
    if(res.data.data.length) {
    //@ts-ignore
      prices.push(res.data.data[0])
    }
  })
  context.commit('setPrices', prices)
  }
}
const getters = {
  balance: (s: AccountState) => s.balance,
  vitexTokens: (s: AccountState) => s.vitexTokens,
  selectedTokens: (s: AccountState) => s.selectedTokens,
  prices: (s: AccountState) => s.prices,

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
