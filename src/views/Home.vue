<template>
  <div class="home">
    <BaseInput icon="search" placeholder="take" />
    <BaseSelect label="For Example" :options="[1, 2, 3, 4, 5]" />
    <BaseCheckBox
      label="For Example"
      placeholder="take"
      v-model="number"
      :options="['I confirm declaration']"
    />
    <BaseTextarea label="For Example" placeholder="take" class="mx-2" />
    >
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
    const number = ref(null)
    const web3 = useWeb3()
    const currentNetwork = ref(1)

    watch(currentNetwork, () => {
      web3.handleNetworkChanged(currentNetwork.value)
    })

    return {
      currentNetwork,
      number
    }
  }
})
</script>
