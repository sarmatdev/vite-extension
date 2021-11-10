<template>
  <div class="p-2">
    <h1 class="text-2xl text-gray-600 text-center font-bold">Import wallet</h1>
    <section>
      <BaseInput v-model="name" label="Wallet Name"></BaseInput>
      <select v-model="importWay">
        <option :value="0">Private key</option>
        <option :value="1">Mnemonic</option>
      </select>
      <BaseTextarea
        class="mt-2"
        :label="sourceLabel"
        v-model.trim="source"
      ></BaseTextarea>
    </section>

    <section class="w-full p-2 fixed bottom-0 right-0 rounded-md bg-blue-300">
      <BaseButton @click="importWallet" color="blue" block>Import</BaseButton>
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

export default defineComponent({
  name: 'Import wallet',
  setup() {
    const store = useStore()
    const router = useRouter()
    const { notify } = useNotifications()

    const importWay = ref(0)
    const source = ref('')
    const isWalletGenerated = ref(false)

    const sourceLabel = computed(() => {
      return importWay.value === 0 ? 'Your private key' : 'Your mnemonic'
    })

    const password = computed(() => store.getters['settings/password'])
    const accountsNum = computed(() => store.getters['wallets/accountsNum'])
    const name = ref(`Wallet ${accountsNum.value + 1}`)

    function checkSource() {
      const res =
        importWay.value === 0
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

    return {
      name,
      source,
      sourceLabel,
      importWay,
      isWalletGenerated,
      accountsNum,
      importWallet
    }
  }
})
</script>
