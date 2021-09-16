import { reactive } from 'vue'
import config from '@/config'
import { ViteAPI } from '@vite/vitejs'
import HTTP_RPC from '@vite/vitejs-http'

const state = reactive({
  network: config.networks[0]
})

export function useWeb3() {
  const httpRPC = new HTTP_RPC(state.network.httpUrl)
  const provider = new ViteAPI(httpRPC, () => {
    return
  })

  function handleNetworkChanged(chainId: number) {
    state.network = config.networks[chainId]
  }

  return {
    provider,
    handleNetworkChanged
  }
}
