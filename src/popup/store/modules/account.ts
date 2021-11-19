import { Commit } from 'vuex'
import { IVitexToken, AccountBalance, tokenPrices } from '@/types'
import { getTokens } from '@/api/tokens.api'
import { getExchangeRate } from '@/api/exchange-rate.api'
import { atos, tokenView, addrType } from '@/helpers/balance'
import { useWeb3 } from '@/composables/useWeb3'

export interface AccountState {
  balance: string
  prices: Array<tokenPrices>
  accountBalance: Array<AccountBalance>
  vitexTokens: Array<IVitexToken>
  selectedTokens: Array<IVitexToken>
  fullTokenInfo: Array<IVitexToken>
  txs: Array<any>
}

const state: AccountState = {
  balance: '',
  prices: [],
  accountBalance: [],
  vitexTokens: [],
  selectedTokens: [],
  fullTokenInfo: [],
  txs: []
}
const mutations = {
  setBalance(state: AccountState, balance: string) {
    state.balance = balance
  },
  setPrices(state: AccountState, prices: Array<tokenPrices>) {
    state.prices = prices
  },
  setAccountBalance(
    state: AccountState,
    accountBalance: Array<AccountBalance>
  ) {
    state.accountBalance = accountBalance
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
  setFullTokenInfo(state: AccountState, fullTokenInfo: Array<IVitexToken>) {
    state.fullTokenInfo = fullTokenInfo
  },
  setTxs(state: AccountState, txs: Array<any>) {
    state.txs = txs
  }
}
const actions = {
  async fetchVitexTokens({ commit }) {
    const vitexTokens = await getTokens()
    commit('setVitexTokens', vitexTokens)
  },
  async fetchPrices({ commit, state }) {
    const tokenIds = state.vitexTokens.map((el) => el.tokenId)
    const getPrice = await getExchangeRate(tokenIds.join())
    //@ts-ignore
    const priceList = getPrice.data.data
    commit('setPrices', priceList)
  },
  getAccountBalance({ commit }: { commit: Commit }, address) {
    const { provider } = useWeb3()
    return provider
      .request('ledger_getAccountInfoByAddress', address)
      .then((res) => {
        if (res.balanceInfoMap) {
          Object.entries(res.balanceInfoMap).forEach(
            //@ts-ignore
            ([tti, { tokenInfo, balance }]) => {
              res.balanceInfoMap[tti].balance = atos(
                balance,
                tokenInfo.decimals
              )
              tokenInfo.tokenId = tti
              tokenInfo.tokenSymbolView = tokenView(
                tokenInfo.tokenSymbol,
                tokenInfo.index
              )
            }
          )
        }
        res.accountType = addrType(res.address)
        commit('setAccountBalance', Object.seal(res).balanceInfoMap)
      })
  },
  async fetchFullTokenInfo({ dispatch, state, commit, getters }) {
    dispatch('fetchVitexTokens')
    dispatch('fetchPrices')
    if (getters.active.address) {
      dispatch('getAccountBalance', getters.active.address)
    }
    const fullTokenInfo = []
    for (const token of state.vitexTokens) {
      const price = state.prices.find((el) => el.tokenId === token.tokenId)
      const balance = state.accountBalance[token.tokenId]
      fullTokenInfo.push({
        ...token,
        price: price ? price.usdRate : 0,
        balance: balance ? balance.balance.replace(',', '') * 1 : 0
      })
    }
    commit('setFullTokenInfo', fullTokenInfo)
  },
  getUtxs({ commit }, address, pageNum = 1) {
    const { provider } = useWeb3()
    return provider
      .request('ledger_getUnreceivedBlocksByAddress', address, pageNum, 10)
      .then((res) => {
        commit(
          'setTxs',
          res.map((tx) => {
            tx.amount = atos(tx.amount, tx.tokenInfo.decimals)
            return Object.seal(tx)
          })
        )
      })
  }
}
const getters = {
  balance: (s: AccountState) => s.balance,
  accountBalance: (s: AccountState) => s.accountBalance,
  vitexTokens: (s: AccountState) => s.vitexTokens,
  selectedTokens: (s: AccountState) => s.selectedTokens,
  fullTokenInfo: (s: AccountState) => s.fullTokenInfo,
  active: (state, getters, rootState, rootGetters) => {
    return rootGetters['wallets/active']
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
