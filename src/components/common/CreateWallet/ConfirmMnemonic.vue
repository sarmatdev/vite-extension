<template>
  <section class="text-center grid grid-cols-1 gap-y-8 p-3">
    <BaseInput
      v-model="walletName"
      placeholder="Name"
      label="Set the wallet name"
    ></BaseInput>
    <BaseTextarea
      label="You must write the phrase in the correct order"
      v-model.trim="mnemonicForConfirm"
    ></BaseTextarea>
    <ul class="grid grid-cols-3 gap-2">
      <li
        class="
          border
          text-gray-600
          rounded-xl
          cursor-pointer
          hover:border-blue-300
        "
        v-for="(mnemonicItem, idx) in mnemonicForConfirm
          .split(' ')
          .sort(() => Math.round(Math.random() * 100) - 50)"
        :key="idx"
        @click="mnemonicForConfirm.split(' ').push(mnemonicItem).join(' ')"
      >
        {{ mnemonicItem }}
      </li>
    </ul>
    <BaseButton
      @click="saveWallet"
      color="blue"
      size="lg"
      :disabled="!mnemonicConfirmed"
      >Create Wallet</BaseButton
    >
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { validateMnemonic } from '@/services/account'
export default defineComponent({
  name: 'ConfirmMnemonic',
  setup() {
    const store = useStore()
    const router = useRouter()
    const mnemonicForConfirm = ref(
      'life equip reform inch author human lizard spray huge capable volume tenant'
    )

    const mnemonicConfirmed = computed(() => {
      return validateMnemonic(mnemonicForConfirm.value)
    })

    const nextWalletName = computed(() => {
      return `Wallet ${store.getters['wallets/accountsNum']}`
    })
    const walletName = ref(nextWalletName.value)

    function saveWallet() {
      store.dispatch('wallets/storeWallet', {
        name: walletName.value,
        address: mnemonicConfirmed.value.address,
        privateKey: mnemonicConfirmed.value.privateKey
      })

      router.push('/')
    }

    return {
      store,
      router,
      walletName,
      mnemonicForConfirm,
      mnemonicConfirmed,
      saveWallet
    }
  }
})
</script>
