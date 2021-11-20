import { Commit } from 'vuex'
import { IVitexToken, AccountBalance, tokenPrices, ITxs } from '@/types'
import { getTokens } from '@/api/tokens.api'
import { getExchangeRate } from '@/api/exchange-rate.api'
import { atos, tokenView, addrType } from '@/helpers/balance'
import { useWeb3 } from '@/composables/useWeb3'

const { provider } = useWeb3()

export interface AccountState {
  balance: string
  prices: Array<tokenPrices>
  accountBalance: Array<AccountBalance>
  vitexTokens: Array<IVitexToken>
  selectedTokens: Array<IVitexToken>
  fullTokenInfo: Array<IVitexToken>
  txs: Array<ITxs>
  uTxs: Array<ITxs>
  txsList: Array<ITxs>
}

const state: AccountState = {
  balance: '',
  prices: [],
  accountBalance: [],
  vitexTokens: [],
  selectedTokens: [],
  fullTokenInfo: [],
  txs: [],
  uTxs: [],
  txsList: []
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
  setTxs(state: AccountState, txs: Array<ITxs>) {
    state.txs = txs
  },
  setUtxs(state: AccountState, uTxs: Array<ITxs>) {
    state.uTxs = uTxs
  },
  setTxsList(state: AccountState, txsList: Array<ITxs>) {
    state.txsList = txsList
  }
}
const actions = {
  async fetchVitexTokens({ commit }) {
    const vitexTokens = await getTokens()
    commit('setVitexTokens', vitexTokens)
  },
  async fetchPrices({ commit, getters }) {
    const tokens = getters.vitexTokens
    const tokenIds = tokens.map((el) => el.tokenId)
    const pricesData = await getExchangeRate(tokenIds.join())
    //@ts-ignore
    const priceList = pricesData.data.data
    commit('setPrices', priceList)
  },
  getAccountBalance({ commit }: { commit: Commit }, address) {
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
        commit('setAccountBalance', Object.seal(res.balanceInfoMap))
      })
  },
  async fetchFullTokenInfo({ dispatch, state, getters, commit }, address) {
    dispatch('fetchVitexTokens')
    dispatch('fetchPrices')
    if (address) {
      dispatch('getAccountBalance', address)
    }
    const tokens = getters.vitexTokens
    const prices = getters.prices
    const balances = getters.accountBalance

    const fullTokenInfo = []
    for (const token of tokens) {
      const price = getters.prices.find((el) => el.tokenId === token.tokenId)
      const balance = balances[token.tokenId]
      fullTokenInfo.push({
        ...token,
        price: price ? price.usdRate : 0,
        balance: balance ? balance.balance * 1 : 0
      })
    }
    commit('setFullTokenInfo', fullTokenInfo)
  },
  getTxs({ commit }, address) {
    return provider
      .request('ledger_getAccountBlocksByAddress', address, 0, 30)
      .then((res) => {
        commit(
          'setTxs',
          res.map((tx) => {
            tx.amount = atos(tx.amount, tx.tokenInfo.decimals)
            return Object.seal(tx)
          })
        )
      })
  },
  getUtxs({ commit }, address) {
    return provider
      .request('ledger_getUnreceivedBlocksByAddress', address, 0, 30)
      .then((res) => {
        commit(
          'setUtxs',
          res.map((tx) => {
            tx.amount = atos(tx.amount, tx.tokenInfo.decimals)
            tx.unreceived = true
            return Object.seal(tx)
          })
        )
      })
  },
  getTxsList({ commit, dispatch, getters }, address) {
    dispatch('getTxs', address)
    dispatch('getUtxs', address)
    const txs = getters.txs
    const uTxs = getters.uTxs
    commit('setTxsList', [...uTxs, ...txs])
  }
}
const getters = {
  balance: (s: AccountState) => s.balance,
  prices: (s: AccountState) => s.prices,
  accountBalance: (s: AccountState) => s.accountBalance,
  vitexTokens: (s: AccountState) => s.vitexTokens,
  selectedTokens: (s: AccountState) => s.selectedTokens,
  fullTokenInfo: (s: AccountState) => s.fullTokenInfo,
  txs: (s: AccountState) => s.txs,
  uTxs: (s: AccountState) => s.uTxs,
  txsList: (s: AccountState) => s.txsList,
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
