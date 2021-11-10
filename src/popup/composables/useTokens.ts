import { computed } from 'vue'
import { useStore } from 'vuex'
import { useWeb3 } from './useWeb3'
import config from '@/config'

export default function useTokens() {
  const store = useStore()
  const { provider } = useWeb3()

  const active = computed(() => store.getters['wallets/active'])

  async function loadNativeAssetBalance() {
    const { balanceInfoMap } = await provider.request(
      'ledger_getAccountInfoByAddress',
      'vite_9b271531e7e6505cf7f593778288709fb478b2c436c57f0605'
    )

    const balance = balanceInfoMap[config.nativeAsset.tokenId].balance

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
