import { watch, computed } from 'vue'
import store from '@/store'
import { useWeb3 } from '@/composables/useWeb3'

const active = computed(() => store.getters['wallets/active'].address)
const { state } = useWeb3()

export function useRefreshData() {
  function loadData(address: string) {
    store.dispatch('account/fetchFullTokenInfo', address)
    store.dispatch('account/getTxsList', address)
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

  function changeNetwork() {
    return watch(
      () => state.network,
      () => {
        loadData(active.value)
      }
    )
  }

  return {
    changeActive,
    changeNetwork
  }
}
