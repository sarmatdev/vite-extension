import { watch, computed } from 'vue'
import store from '@/store'
import { useWeb3 } from '@/composables/useWeb3'

const active = computed(() => store.getters['wallets/active'].address)
const web3 = useWeb3()

export function useRefreshData() {
  function loadData(address: string) {
    web3.fetchFullTokenInfo(active.value)
    web3.getTxsList(active.value)
  }

  function changeActive() {
    return watch(
      () => active.value,
      (newAccount, oldAccount) => {
        if (oldAccount === newAccount) return
        loadData(newAccount)
      }
    )
  }

  return {
    changeActive
  }
}
