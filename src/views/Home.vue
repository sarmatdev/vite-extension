<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <select v-model="currentNetwork" name="" id="">
      <option :value="0">Mainnet</option>
      <option :value="1">Testnet</option>
    </select>
    {{ currentNetwork }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useWeb3 } from '@/composables/useWeb3'

export default defineComponent({
  name: 'Home',
  setup() {
    const web3 = useWeb3()
    const currentNetwork = ref(1)

    watch(currentNetwork, () => {
      web3.handleNetworkChanged(currentNetwork.value)
    })

    return {
      currentNetwork
    }
  }
})
</script>
