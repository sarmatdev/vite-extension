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
import { useStore } from 'vuex'
import { compressAddress } from '@/helpers/string'
import { utils } from '@vite/vitejs'
import {
  THIRDPARTY_GET_ACCOUNT_SUCCESS_RESPONSE,
  GET_WALLET_SERVICE_STATE,
  THIRDPARTY_PERSONAL_SIGN_CONNECT,
  THIRDPARTY_PERSONAL_SIGN_SUCCESS_RESPONSE
} from '../../../types'
import { decryptKeyStore, decryptString } from 'src/services/CryptoService'

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
      chrome.runtime.sendMessage({
        action: THIRDPARTY_GET_ACCOUNT_SUCCESS_RESPONSE,
        payload: {
          name: account.value.name,
          address: account.value.address
        }
      })
      window.close()
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
