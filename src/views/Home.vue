<template>
  <div class="home">
    <h1>Home</h1>
    <base-input v-model="name" placeholder="Wallet Name" />
    <base-button @click="saveWallet">save</base-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { createRandom } from '@/services/account'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Home',
  setup() {
    const store = useStore()
    const name = ref('test')

    const wallet = createRandom()
    console.log(wallet)
    function saveWallet() {
      store.dispatch('wallets/storeWallet', {
        name: name.value,
        ...wallet
      })

      store.dispatch('auth/storePassword', 'xaliudzyx')
      store.commit('auth/setAuth', true)
    }

    return {
      name,
      saveWallet
    }
  }
})
</script>
