import { useStore } from 'vuex'
import { useWeb3 } from './useWeb3'
import config from '@/config'

export default function useTokens() {
  const store = useStore()
  const { provider } = useWeb3()

  async function loadNativeAssetBalance() {
    const { balanceInfoMap } = await provider.request(
      'ledger_getAccountInfoByAddress',
      'vite_8c76a644faa9979e4210e4ed9fa52df99f5c12532aca91e219'
    )

    const balance = balanceInfoMap[config.nativeAsset.tokenId].balance

    console.log(balanceInfoMap)
    store.commit('account/setBalance', balance)
  }

  async function getTokenInfoList() {
    const data = await provider.request('contract_getTokenInfoList', 0, 100)
    return data
  }

  return {
    provider,
    loadNativeAssetBalance,
    getTokenInfoList
  }
}
