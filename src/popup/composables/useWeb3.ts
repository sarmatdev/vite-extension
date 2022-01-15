import { reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { ViteAPI, accountBlock } from '@vite/vitejs'
import HTTP_RPC from '@vite/vitejs-http'
import config from '@/config'
import { decryptKeyStore } from '../../services/CryptoService'
import { atos, tokenView, addrType } from '@/helpers/balance'

export interface SendTokens {
  toAddress?: string
  tokenId?: string
  amount?: string
  urlIcon?: string
}

const state = reactive({
  network: { ...config.networks[0], isConnected: false },
  provider: null
})

const { createAccountBlock } = accountBlock

export function useWeb3() {
  const store = useStore()

  const httpRPC = new HTTP_RPC(state.network.httpUrl)
  state.provider = new ViteAPI(httpRPC, () => {
    return
  })

  function newBlockHandler() {
    return state.provider.subscribe('newAccountBlocks')
  }

  const active = computed(() => store.getters['wallets/active'])
  const password = computed(() => store.getters['settings/password'])

  async function sendTokens({ toAddress, tokenId, amount }: SendTokens) {
    const privateKey = decryptKeyStore(active.value.keystore, password.value)

    const newAccountBlock = createAccountBlock('send', {
      address: active.value.address,
      toAddress,
      tokenId,
      amount
    })
      .setProvider(state.provider)
      .setPrivateKey(privateKey)

    await newAccountBlock.autoSetPreviousAccountBlock()

    const result = await newAccountBlock.sign().send()
    return result
  }

  async function receiveTokens() {
    const privateKey = decryptKeyStore(active.value.keystore, password.value)
    // get selected unreceived tx
    const data = await state.provider.request(
      'ledger_getUnreceivedBlocksByAddress',
      active.value.address,
      0,
      30
    )

    // create a receive tx
    if (!data.length) {
      return
    }
    data.forEach(async (tx) => {
      const ab = accountBlock
        .createAccountBlock('receive', {
          address: active.value.address,
          sendBlockHash: tx.hash
        })
        .setProvider(state.provider)
        .setPrivateKey(privateKey)

      await ab.autoSetPreviousAccountBlock()
      const result = await ab.sign().send()
      console.log('receive success', result)
    })
  }

  function handleNetworkChanged(selected: any) {
    state.network.isConnected = false
    state.network = selected
    const newProvider = new HTTP_RPC(state.network.httpUrl)

    state.provider.setProvider(
      newProvider,
      () => {
        state.network.isConnected = true
        return
      },
      true
    )
  }

  function getAccountBalance(address) {
    try {
      return state.provider
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
            store.commit(
              'account/setAccountBalance',
              Object.seal(res.balanceInfoMap)
            )
            store.commit(
              'account/setBalance',
              res.balanceInfoMap[config.nativeAsset.tokenId].balance
            )
          } else {
            store.commit('account/setAccountBalance', [])
            store.commit('account/setBalance', 0)
          }
        })
    } catch (e) {
      return e
    }
  }
  async function fetchFullTokenInfo(address) {
    try {
      await store.dispatch('account/fetchVitexTokens')
      await store.dispatch('account/fetchPrices')
      await getAccountBalance(address)

      const fullTokenInfo = []
      for (const token of store.getters['account/vitexTokens']) {
        const price = store.getters['account/prices'].find(
          (el) => el.tokenId === token.tokenId
        )
        const balance = store.getters['account/accountBalance'][token.tokenId]
        fullTokenInfo.push({
          ...token,
          price: price ? price.usdRate : 0,
          balance: balance ? balance.balance.replace(',', '') : 0
        })
      }
      store.commit('account/setFullTokenInfo', fullTokenInfo)
      if (store.getters['account/selectedTokens'].length) {
        const selectedTokens = store.getters['account/selectedTokens'].map(
          (el) => el.tokenId
        )
        const refreshSelectedTokens = store.getters[
          'account/fullTokenInfo'
        ].filter((el) => selectedTokens.find((e) => e === el.tokenId))
        store.commit('account/setSelectedTokens', refreshSelectedTokens)
      }
    } catch (e) {
      console.log(e)
    }
  }
  function getTxs(address) {
    try {
      return state.provider
        .request('ledger_getAccountBlocksByAddress', address, 0, 30)
        .then((res) => {
          res
            ? store.commit(
                'account/setTxs',
                res.map((tx) => {
                  tx.amount = atos(tx.amount, tx.tokenInfo.decimals)
                  return Object.seal(tx)
                })
              )
            : store.commit('account/setTxs', [])
        })
    } catch (e) {
      console.log(e)
    }
  }
  function getUtxs(address) {
    try {
      return state.provider
        .request('ledger_getUnreceivedBlocksByAddress', address, 0, 30)
        .then((res) => {
          res.length
            ? store.commit(
                'account/setUtxs',
                res.map((tx) => {
                  tx.amount = atos(tx.amount, tx.tokenInfo.decimals)
                  tx.unreceived = true
                  return Object.seal(tx)
                })
              )
            : store.commit('account/setUtxs', [])
        })
    } catch (e) {
      console.log(e)
    }
  }
  async function getTxsList(address) {
    try {
      await getTxs(address)
      await getUtxs(address)
      store.commit('account/setTxsList', [
        ...store.getters['account/uTxs'],
        ...store.getters['account/txs']
      ])
    } catch (e) {
      console.log(e)
    }
  }

  return {
    state,
    provider: state.provider,
    network: state.network,
    sendTokens,
    receiveTokens,
    handleNetworkChanged,
    getAccountBalance,
    fetchFullTokenInfo,
    getTxs,
    getUtxs,
    getTxsList,
    newBlockHandler
  }
}
