<template>
  <div class="p-2">
    <h1 class="my-4">Import wallet</h1>
    <section class="flex flex-col">
      <BaseInput
        v-model="name"
        @input="requiedV$.validator.$touch"
        :errors="requiedError"
        label="Wallet Name"
        class="mb-8"
      ></BaseInput>
      <BaseSelect
        v-model="importWay"
        label="Import with"
        class="mb-20"
        placeholder="Select way to import"
        :options="['Private key', 'Mnemonic']"
      />
      <BaseTextarea
        :label="`Write or paste your ${importWay}`"
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
        :disabled="!name || !importWay || !source"
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
import { nanoid } from 'nanoid'

import {
  createFromMnemonic,
  createFromPrivateKey,
  createAccount
} from '../../../services/AccountService'
import { decryptString } from '../../../services/CryptoService'
import useClipboard from '@/composables/useClipboard'
import useValidate from '@/composables/useValidate'

export default defineComponent({
  name: 'Import wallet',
  setup() {
    const store = useStore()
    const router = useRouter()
    const { notify } = useNotifications()

    const importWay = ref('')
    const source = ref('')

    const { readClipboard } = useClipboard()

    async function pasteSource() {
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

    function decryptPassword(): string {
      return decryptString(password.value.payload, password.value.salt)
    }

    function importWallet() {
      const account = checkSource()
      const decrypt = decryptPassword()

      const wallet = createAccount(name.value, account.privateKey, decrypt)
      console.log('wallet', wallet)
      if (wallet) {
        store.commit('wallets/setWallet', wallet)
        router.push('/')
      }
    }

    const { requiedV$, requiedError } = useValidate({ validator: name })
    const { importTextareaV$, importTextareaError } = useValidate({
      validator: source
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
