<template>
  <div class="mt-2 p-2">
    <h1 class="text-2xl text-center">Personal Sign</h1>
    <p>Data: {{ signData }}</p>
    <p>{{ host }}</p>
    <footer class="fixed inset-x-0 bottom-0 p-2">
      <div class="flex gap-4 justify-between">
        <BaseButton block @click="deny" outline> Deny </BaseButton>
        <BaseButton block @click="accept"> Accept </BaseButton>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import * as crypto from 'crypto-js'
import { useStore } from 'vuex'
import { utils } from '@vite/vitejs'
import { compressAddress } from '@/helpers/string'
import { decryptKeyStore, decryptString } from 'src/services/CryptoService'
import {
  THIRDPARTY_GET_ACCOUNT_SUCCESS_RESPONSE,
  GET_WALLET_SERVICE_STATE,
  THIRDPARTY_PERSONAL_SIGN_CONNECT
} from '../../../types'

export default defineComponent({
  setup() {
    const store = useStore()
    const host = ref('')
    const signData = ref('')

    const account = computed(() => store.getters['wallets/active'])
    const password = computed(() => store.getters['settings/password'])

    function sign() {
      return
    }

    function accept() {
      console.log(account.value)
      const decryptedPassword = decryptString(
        password.value.payload,
        password.value.salt
      )
      console.log(decryptedPassword)
      const decrypted = decryptKeyStore(
        decryptedPassword,
        account.value.keystore
      )
      const plain = decrypted.toString(crypto.enc.Utf8)
      console.log(plain)
    }

    function deny() {
      window.close()
    }

    onMounted(() => {
      chrome.runtime.sendMessage(
        { action: GET_WALLET_SERVICE_STATE },
        // @ts-ignore
        async ({ state } = {}) => {
          if (state) {
            try {
              const { signData, session } = state
              console.log('state', state)
              signData.value = signData.msgData
              host.value = session.host
            } catch (err) {
              console.error(err)
            }
          } else {
            // window.close();
          }
        }
      )
      chrome.runtime.connect({ name: THIRDPARTY_PERSONAL_SIGN_CONNECT })
    })

    return {
      accept,
      deny,
      account,
      host,
      signData,
      compressAddress
    }
  }
})
</script>

<style></style>
