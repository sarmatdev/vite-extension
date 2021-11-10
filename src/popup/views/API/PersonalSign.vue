<template>
  <div class="mt-2 p-2">
    <h1 class="text-2xl text-center">Personal Sign</h1>
    <p>Data: {{ signData }}</p>
    <p>{{ host }}</p>
    <footer class="fixed inset-x-0 bottom-0 p-2">
      <div class="mb-2">
        <BaseInput label="Password" placeholder="Input your password" />
      </div>
      <div class="flex gap-4 justify-between">
        <BaseButton block @click="deny" outline> Deny </BaseButton>
        <BaseButton block @click="accept"> Accept </BaseButton>
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
  THIRDPARTY_PERSONAL_SIGN_CONNECT
} from '../../../types'

export default defineComponent({
  setup() {
    const store = useStore()
    const host = ref('')
    const signData = ref('')

    const account = computed(() => store.getters['wallets/active'])

    function sign() {
      return
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

    console.log(utils.ed25519)

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
