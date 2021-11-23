import { Commit } from 'vuex'
import { IVitexToken, AccountBalance, tokenPrices, ITxs } from '@/types'
import { getTokens } from '@/api/tokens.api'
import { getExchangeRate } from '@/api/exchange-rate.api'
import { atos, tokenView, addrType } from '@/helpers/balance'
import { useWeb3 } from '@/composables/useWeb3'
import config from '@/config'

const { provider } = useWeb3()

export interface AccountState {
  balance: number
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
  balance: 0,
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
  setBalance(state: AccountState, balance: number) {
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
  setSelectedTokens(state: AccountState, selectedTokens: Array<IVitexToken>) {
    state.selectedTokens = selectedTokens
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
    try {
      const vitexTokens = await getTokens()
      commit('setVitexTokens', vitexTokens)
    } catch (e) {
      console.log(e)
    }
  },
  async fetchPrices({ commit, state }) {
    try {
      const tokenIds = state.vitexTokens.map((el) => el.tokenId)
      const pricesData = await getExchangeRate(tokenIds.join())
      //@ts-ignore
      const priceList = pricesData.data.data
      commit('setPrices', priceList)
    } catch (e) {
      console.log(e)
    }
  },
  getAccountBalance({ commit }: { commit: Commit }, address) {
    try {
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
            res.accountType = addrType(res.address)
            commit('setAccountBalance', Object.seal(res.balanceInfoMap))
            commit(
              'setBalance',
              res.balanceInfoMap[config.nativeAsset.tokenId].balance
            )
            console.log(res.balanceInfoMap[config.nativeAsset.tokenId].balance)
          } else {
            commit('setAccountBalance', [])
            commit('setBalance', 0)
          }
        })
    } catch (e) {
      console.log(e)
    }
  },
  async fetchFullTokenInfo({ dispatch, state, commit }, address) {
    try {
      await dispatch('fetchVitexTokens')
      await dispatch('fetchPrices')
      await dispatch('getAccountBalance', address)

      const fullTokenInfo = []
      for (const token of state.vitexTokens) {
        const price = state.prices.find((el) => el.tokenId === token.tokenId)
        const balance = state.accountBalance[token.tokenId]
        fullTokenInfo.push({
          ...token,
          price: price ? price.usdRate : 0,
          balance: balance ? balance.balance * 1 : 0
        })
      }
      commit('setFullTokenInfo', fullTokenInfo)
      if (state.selectedTokens.length) {
        const selectedTokens = state.selectedTokens.map((el) => el.tokenId)
        const refreshSelectedTokens = state.fullTokenInfo.filter((el) =>
          selectedTokens.find((e) => e === el.tokenId)
        )
        commit('setSelectedTokens', refreshSelectedTokens)
      }
    } catch (e) {
      console.log(e)
    }
  },
  getTxs({ commit }, address) {
    try {
      return provider
        .request('ledger_getAccountBlocksByAddress', address, 0, 30)
        .then((res) => {
          res
            ? commit(
                'setTxs',
                res.map((tx) => {
                  tx.amount = atos(tx.amount, tx.tokenInfo.decimals)
                  return Object.seal(tx)
                })
              )
            : commit('setTxs', [])
        })
    } catch (e) {
      console.log(e)
    }
  },
  getUtxs({ commit }, address) {
    try {
      return provider
        .request('ledger_getUnreceivedBlocksByAddress', address, 0, 30)
        .then((res) => {
          res.length
            ? commit(
                'setUtxs',
                res.map((tx) => {
                  tx.amount = atos(tx.amount, tx.tokenInfo.decimals)
                  tx.unreceived = true
                  return Object.seal(tx)
                })
              )
            : commit('setUtxs', [])
        })
    } catch (e) {
      console.log(e)
    }
  },
  async getTxsList({ commit, dispatch, state }, address) {
    try {
      await dispatch('getTxs', address)
      await dispatch('getUtxs', address)
      commit('setTxsList', [...state.txs, ...state.uTxs])
    } catch (e) {
      console.log(e)
    }
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
  txsList: (s: AccountState) => s.txsList
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
