<template>
  <div class="home">
    <h1>Home</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useWeb3 } from '@/composables/useWeb3'
import { createRandom } from '@/services/account'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Home',
  setup() {
    const store = useStore()
    const web3 = useWeb3()
    const number = ref(null)
    const name = ref('')
    const currentNetwork = ref(1)

    // const wallet = createRandom()
    // console.log(wallet)

    // function saveWallet() {
    //   store.dispatch('wallets/storeWallet', {
    //     name: name.value,
    //     ...wallet
    //   })

    //   store.commit('auth/setAuth', true)
    // }

    watch(currentNetwork, () => {
      web3.handleNetworkChanged(currentNetwork.value)
    })

    return {
      currentNetwork,
      number,
      name
      // saveWallet
    }
  }
})
</script>
