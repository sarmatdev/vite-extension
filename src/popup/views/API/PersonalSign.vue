<template>
  <div class="mt-2 p-2">
    <div class="text-center">
      <h1 class="text-2xl">Personal Sign</h1>
      <p class="text-blue-400">{{ host }}</p>
    </div>
    <p>Data: {{ signData }}</p>
    <footer class="fixed inset-x-0 bottom-0 p-2 bg-blue-100">
      <div class="flex gap-4 justify-between">
        <BaseButton block @click="deny" outline> Deny </BaseButton>
        <BaseButton block @click="sign"> Accept </BaseButton>
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
  THIRDPARTY_PERSONAL_SIGN_CONNECT,
  THIRDPARTY_PERSONAL_SIGN_SUCCESS_RESPONSE
} from '../../../types'

export default defineComponent({
  setup() {
    const store = useStore()
    const host = ref('')
    const signData = ref('')

    const account = computed(() => store.getters['wallets/active'])
    const password = computed(() => store.getters['settings/password'])

    function sign() {
      const decryptedPassword = decryptString(
        password.value.payload,
        password.value.salt
      )
      const privateKey = decryptKeyStore(
        account.value.keystore,
        decryptedPassword
      )
      const hexPaylod = utils._Buffer.from('value').toString('hex')
      const sign = utils.ed25519.sign(hexPaylod, privateKey)

      console.log(utils.ed25519.sign(hexPaylod, privateKey))

      chrome.runtime.sendMessage({
        action: THIRDPARTY_PERSONAL_SIGN_SUCCESS_RESPONSE,
        payload: {
          data: sign
        }
      })
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
      sign,
      signData,
      compressAddress
    }
  }
})
</script>

<style></style>
