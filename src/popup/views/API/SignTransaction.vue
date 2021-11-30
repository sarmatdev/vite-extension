<template>
  <div class="mt-2 p-2 break-words">
    <div class="text-center">
      <h1 class="text-2xl">Sign Transaction</h1>
      <p class="text-blue-400">{{ host }}</p>
    </div>
    <div>
      <p class="text-sm">From: {{ account.address }}</p>
      <p class="text-sm">To: {{ tx.toAddress }}</p>
      <p class="text-sm">Token: {{ tx.tokenId }}</p>
      <p class="text-sm">Amount: {{ tx.amount }}</p>
    </div>
    <footer class="fixed inset-x-0 bottom-0 p-2 bg-blue-100">
      <div class="flex gap-4 justify-between">
        <BaseButton block @click="deny" outline> Deny </BaseButton>
        <BaseButton block @click="accept"> Send </BaseButton>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useWeb3 } from '@/composables/useWeb3'
import { decryptKeyStore } from 'src/services/CryptoService'
import {
  signAccountBlock,
  createFromPrivateKey
} from 'src/services/AccountService'
import { accountBlock } from '@vite/vitejs'
import {
  GET_WALLET_SERVICE_STATE,
  THIRDPARTY_PERSONAL_SIGN_CONNECT,
  THIRDPARTY_PERSONAL_SIGN_SUCCESS_RESPONSE,
  THIRDPARTY_PERSONAL_SIGN_REJECT_RESPONSE,
  PERSONAL_SIGN_REJECT
} from '../../../types'

export default defineComponent({
  setup() {
    const store = useStore()
    const { provider } = useWeb3()
    const host = ref(null)
    const tx = ref({})

    const account = computed(() => store.getters['wallets/active'])
    const password = computed(() => store.getters['settings/password'])
    const privateKey = computed(() =>
      decryptKeyStore(account.value.keystore, password.value)
    )

    async function accept() {
      const privateKey = decryptKeyStore(account.value.keystore, password.value)
      console.log(
        'createFromPrivateKey',
        createFromPrivateKey(
          'ff5937534f6b3b31f3deae3626d3f42808bafc6fcab490c243e9fd8e4546c509378fa915b78a0e06fc9630a4e0287b41f3fb0f91bd6a7458c9bd502bcb529798'
        )
      )
      const myAccountBlock = accountBlock
        .createAccountBlock('send', {
          address: tx.value.address,
          toAddress: tx.value.toAddress,
          tokenId: tx.value.tokenId,
          amount: tx.value.amount
        })
        .setProvider(provider)
        .setPrivateKey(
          'ff5937534f6b3b31f3deae3626d3f42808bafc6fcab490c243e9fd8e4546c509378fa915b78a0e06fc9630a4e0287b41f3fb0f91bd6a7458c9bd502bcb529798'
        )

      await myAccountBlock.autoSetProperty()

      const result = await myAccountBlock.sign()
      console.log('result', result)
      return result
      // console.log('privateKey.value', privateKey.value)
      // const accountBlock = signAccountBlock(
      //   tx.value,
      //   provider,
      //   privateKey.value
      // )
      // console.log('accountBlock', accountBlock)
      // chrome.runtime.sendMessage({
      //   action: THIRDPARTY_PERSONAL_SIGN_SUCCESS_RESPONSE,
      //   payload: {
      //     data: 'asd'
      //   }
      // })
    }

    function deny() {
      chrome.runtime.sendMessage({
        action: THIRDPARTY_PERSONAL_SIGN_REJECT_RESPONSE,
        payload: {
          message: PERSONAL_SIGN_REJECT
        }
      })
      window.close()
    }

    chrome.runtime.sendMessage(
      { action: GET_WALLET_SERVICE_STATE },
      // @ts-ignore
      async ({ state } = {}) => {
        if (state) {
          try {
            console.log('state✅', state.txnInfo)
            tx.value = state.txnInfo
          } catch (err) {
            console.error(err)
          }
        } else {
          // window.close();
        }
      }
    )
    chrome.runtime.connect({ name: THIRDPARTY_PERSONAL_SIGN_CONNECT })

    return {
      account,
      deny,
      host,
      accept,
      tx
    }
  }
})
</script>

<style></style>
