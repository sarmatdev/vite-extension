<template>
  <div class="home">
    <h1>Home</h1>
    <AccountInfo />
    <base-input v-model="name" placeholder="Wallet Name" />
    <base-button @click="saveWallet">save</base-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useTokens } from '@/composables/useTokens'
import { createRandom } from '@/services/account'
import { useStore } from 'vuex'
import AccountInfo from '@/components/AccountInfo.vue'

export default defineComponent({
  name: 'Home',
  components: {
    AccountInfo
  },
  setup() {
    const store = useStore()
    const { loadNativeAssetBalance } = useTokens()
    const name = ref('test')

    loadNativeAssetBalance()

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
