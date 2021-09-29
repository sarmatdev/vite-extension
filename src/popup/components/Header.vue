<template>
  <div class="h-12 flex items-center justify-between px-2">
    <router-link to="/">
      <img class="h-8" src="@/assets/images/logo-blue1.svg" alt="" />
    </router-link>
    <select v-model="currentNetwork">
      <option :value="0">Mainnet</option>
      <option :value="1">Testnet</option>
    </select>
    <base-button to="/menu" color="white" circle flat>
      <base-icon name="menu" size="lg" />
    </base-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useWeb3 } from '@/composables/useWeb3'
export default defineComponent({
  name: 'Header',
  setup() {
    const web3 = useWeb3()

    const currentNetwork = ref(0)

    // watch(currentNetwork, () => {
    //   web3.handleNetworkChanged(currentNetwork.value)
    // })

    return {
      currentNetwork
    }
  }
})
</script>

<style></style>
