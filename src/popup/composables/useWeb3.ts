import { reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { ViteAPI, accountBlock } from '@vite/vitejs'
import HTTP_RPC from '@vite/vitejs-http'
import config from '@/config'
import { decryptString } from '@/services/crypto'

export interface SendTokens {
  toAddress?: string
  tokenId?: string
  amount?: string
}

const state = reactive({
  network: { ...config.networks[1], isConnected: false }
})

const { createAccountBlock } = accountBlock

export function useWeb3() {
  const store = useStore()

  const httpRPC = new HTTP_RPC(state.network.httpUrl)
  const provider = new ViteAPI(httpRPC, () => {
    return
  })

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
      .setProvider(provider)
      .setPrivateKey(privateKey)

    await newAccountBlock.autoSetPreviousAccountBlock()

    const result = await newAccountBlock.sign().send()
    return result
  }

  function handleNetworkChanged(selected: any) {
    state.network.isConnected = false
    state.network = selected
    console.log('state.network', state.network)
    const newProvider = new HTTP_RPC(state.network.httpUrl)

    provider.setProvider(
      newProvider,
      () => {
        state.network.isConnected = true
        console.log(`Network changed to ${state.network.name} ✅`)
        return
      },
      true
    )
  }

  return {
    provider,
    network: state.network,
    sendTokens,
    handleNetworkChanged
  }
}
