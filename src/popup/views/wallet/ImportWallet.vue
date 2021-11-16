<template>
  <div class="p-2">
    <h1 class="my-4">Import wallet</h1>
    <section class="flex flex-col space-y-8">
      <BaseInput v-model="name" label="Wallet Name"></BaseInput>
      <BaseSelect
        v-model="importWay"
        label="Import with"
        :options="['Private key', 'Mnemonic']"
      />
      <BaseTextarea :label="importWay" v-model.trim="source"></BaseTextarea>
      <BaseButton color="gradient" rounded size="s" class="mx-auto">
        <BaseIcon class="mr-0.5" size="s" name="copy" />
        Paste
      </BaseButton>
    </section>

    <section
      class="w-full px-4 py-8 fixed bottom-0 right-0 rounded-t-md bg-blue-300"
    >
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

    const importWay = ref('')
    const source = ref('')
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

    return {
      name,
      source,
      importWay,
      isWalletGenerated,
      accountsNum,
      importWallet
    }
  }
})
</script>
