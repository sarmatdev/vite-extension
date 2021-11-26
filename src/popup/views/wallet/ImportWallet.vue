<template>
  <div class="fixed inset-x-0 top-0 z-50 flex p-2 items-center">
    <BaseToggle icon="chevron-left" to="/" />
    <h1 class="ml-14">Import wallet</h1>
  </div>
  <div class="p-2 pt-24">
    <section class="flex flex-col space-y-6">
      <BaseInput
        v-model="name"
        @input="requiedV$.validator.$touch"
        :errors="requiedError"
        label="Wallet Name"
        class="mb-5"
      ></BaseInput>
      <BaseSelect
        v-model="importWay"
        label="Import with"
        placeholder="Select way to import"
        :options="['Mnemonic', 'Private key']"
      />
      <BaseTextarea
        :label="`Write or paste your ${importWay ? importWay : 'data'}`"
        icon="clipboard"
        @input="importTextareaV$.validator.$touch"
        :errors="importTextareaError"
        @iconEvent="pasteSource"
        v-model.trim="source"
      ></BaseTextarea>
    </section>

    <section
      class="w-full px-4 py-8 fixed bottom-0 right-0 rounded-t-md bg-blue-300"
    >
      <BaseButton
        @click="importWallet"
        :disabled="!name || !importWay || !source || importTextareaError.length"
        color="blue"
        block
      >
        Import</BaseButton
      >
    </section>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useNotifications } from '@/composables/useNotifications'

import {
  createFromMnemonic,
  createFromPrivateKey,
  createAccount
} from '../../../services/AccountService'
import { decryptString } from '../../../services/CryptoService'
import { useClipboard } from '@/composables/useClipboard'
import { useValidate } from '@/composables/useValidate'

export default defineComponent({
  name: 'Import wallet',
  setup() {
    const store = useStore()
    const router = useRouter()
    const { notify } = useNotifications()

    const importWay = ref('')
    console.log(importWay)
    const source = ref('')

    const { readClipboard } = useClipboard()

    async function pasteSource() {
      importTextareaV$.value.$touch()
      const clipboard = await readClipboard()
      source.value = clipboard
    }
    const isWalletGenerated = ref(false)

    const password = computed(() => store.getters['settings/password'])
    const accountsNum = computed(() => store.getters['wallets/accountsNum'])
    const name = ref(`Wallet ${accountsNum.value + 1}`)

    function checkSource() {
      const res =
        importWay.value === 'Private key'
          ? createFromPrivateKey(source.value)
          : createFromMnemonic(source.value)

      if (res.code) {
        notify({ message: res.message, type: 'red' })
      }

      return res
    }

    function importWallet() {
      const account = checkSource()

      const wallet = createAccount(
        name.value,
        account.privateKey,
        password.value
      )
      console.log('account', account)
      console.log('wallet', wallet)
      if (wallet) {
        store.commit('wallets/setWallet', wallet)
        router.push('/')
      }
    }

    const { requiedV$, requiedError } = useValidate({
      validator: name
    })
    const { importTextareaV$, importTextareaError } = useValidate({
      validator: source,
      type: importWay
    })

    return {
      name,
      source,
      pasteSource,
      importWay,
      isWalletGenerated,
      accountsNum,
      importWallet,
      requiedV$,
      requiedError,
      importTextareaV$,
      importTextareaError
    }
  }
})
</script>
