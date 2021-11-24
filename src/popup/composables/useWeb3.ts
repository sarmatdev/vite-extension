import { reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { ViteAPI, accountBlock } from '@vite/vitejs'
import HTTP_RPC from '@vite/vitejs-http'
import config from '@/config'
import { decryptString } from '../../services/CryptoService'
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

  console.log('provider', state.provider)

  const active = computed(() => store.getters['wallets/active'])

  async function sendTokens({ toAddress, tokenId, amount }: SendTokens) {
    const privateKey = decryptString(active.value.privateKey, active.value.salt)
    console.log('privateKey', privateKey)
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

  function handleNetworkChanged(selected: any) {
    state.network.isConnected = false
    state.network = selected
    const newProvider = new HTTP_RPC(state.network.httpUrl)

    state.provider.setProvider(
      newProvider,
      () => {
        console.log('Success✅')
        state.network.isConnected = true
        return
      },
      true
    )
    console.log('state.provider', state.provider)
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
            console.log(res.balanceInfoMap[config.nativeAsset.tokenId].balance)
          } else {
            store.commit('account/setAccountBalance', [])
            store.commit('account/setBalance', 0)
          }
        })
    } catch (e) {
      console.log(e)
    }
  }

  return {
    state,
    provider: state.provider,
    network: state.network,
    sendTokens,
    handleNetworkChanged,
    getAccountBalance
  }
}
