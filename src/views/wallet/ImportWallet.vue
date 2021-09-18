<template>
  <section class="grid grid-cols-1 gap-y-8">
    <h1 class="text-2xl text-gray-600 text-center font-bold">Import wallet</h1>
    <BaseInput v-model="name" label="Wallet Name"></BaseInput>
    <BaseTextarea label="Private key" v-model="source"></BaseTextarea>
    <BaseButton color="gradient" @click="importWallet">Import</BaseButton>
  </section>
  {{ isValidSource }}
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { validatePrivateKey, createFromPrivateKey } from '@/services/account'
export default defineComponent({
  name: 'Import wallet',
  setup() {
    const store = useStore()
    const router = useRouter()

    const name = ref('')
    const source = ref('')
    const isValidSource = computed(() => {
      return validatePrivateKey(source.value)
    })

    const importedWallet = computed(() => {
      return createFromPrivateKey(source.value)
    })

    function importWallet() {
      if (isValidSource.value) {
        createFromPrivateKey(source.value)
        store.dispatch('wallets/storeWallet', {
          name: name.value,
          address: importedWallet.value.address,
          privateKey: importedWallet.value.privateKey
        })

        router.push('/')
      }
    }

    return {
      name,
      source,
      isValidSource,
      importWallet
    }
  }
})
</script>
