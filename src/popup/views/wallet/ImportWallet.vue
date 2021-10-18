<template>
  <div class="p-2">
    <h1 class="text-2xl text-gray-600 text-center font-bold">Import wallet</h1>
    <section>
      <BaseInput v-model="name" label="Wallet Name"></BaseInput>
      <BaseTextarea
        class="mt-2"
        label="Mnemonic phrase"
        v-model.trim="source"
      ></BaseTextarea>
    </section>

    <section class="w-full p-2 fixed bottom-0 right-0">
      <BaseButton @click="importWallet" size="lg" color="blue"
        >Import</BaseButton
      >
    </section>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { createFromMnemonic } from '@/services/account'

export default defineComponent({
  name: 'Import wallet',
  setup() {
    const store = useStore()
    const router = useRouter()

    const source = ref('')

    const accountsNum = computed(() => store.getters['wallets/accountsNum'])
    const name = ref(`Wallet ${accountsNum.value + 1}`)

    const importedWallet = computed(() => {
      return createFromMnemonic(source.value)
    })

    function importWallet() {
      if (importedWallet.value) {
        store.dispatch('wallets/storeWallet', {
          name: name.value,
          ...importedWallet.value
        })

        router.push('/home')
      }
    }

    return {
      name,
      source,
      importedWallet,
      accountsNum,
      importWallet
    }
  }
})
</script>
