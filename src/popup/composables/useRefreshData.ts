import { watch, computed } from 'vue'
import store from '@/store'
import { useWeb3 } from '@/composables/useWeb3'

const active = computed(() => store.getters['wallets/active'].address)
const web3 = useWeb3()

export function useRefreshData() {
  function changeActive() {
    return watch(
      () => active.value,
      (newAccount, oldAccount) => {
        if (oldAccount === newAccount) return
        store.commit('settings/setLoaded', false)
        web3.fetchFullTokenInfo(active.value.address)
        web3.getTxsList(active.value.address)
        setTimeout(() => {
          store.commit('settings/setLoaded', true)
        }, 1000)
      }
    )
  }

  return {
    changeActive
  }
}
