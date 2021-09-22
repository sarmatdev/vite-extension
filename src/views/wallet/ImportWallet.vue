<template>
  <section class="grid grid-cols-1 gap-y-16 p-3">
    <h1 class="text-2xl text-gray-600 text-center font-bold">Import wallet</h1>
    <img
      class="mx-auto"
      src="@/assets/images/vite-logo.png"
      width="120"
      alt="Welcome Image"
    />
    <BaseInput v-model="name" label="Wallet Name"></BaseInput>
    <BaseTextarea label="Private key" v-model="source"></BaseTextarea>
    <BaseButton size="lg" color="blue" @click="importWallet">Import</BaseButton>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, ref, unref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { createFromMnemonic } from '@/services/account'
export default defineComponent({
  name: 'Import wallet',
  setup() {
    const store = useStore()
    const router = useRouter()

    const name = ref('')
    const source = ref('')

    // const importedWallet = computed(() => {
    //   return createFromMnemonic(source.value)
    // })

    // console.log(unref(importedWallet))

    function importWallet() {
      store.dispatch('wallets/storeWallet', {
        name: name.value,
        // @ts-ignore
        ...createFromMnemonic(source.value)
      })

      router.push('/')
    }

    return {
      name,
      source,
      importWallet
    }
  }
})
</script>
