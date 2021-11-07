<template>
  <div class="mt-2 p-2">
    <h1 class="text-2xl text-center">Sign in Request</h1>
    <div>
      <div class="card" v-for="(account, index) in accounts" :key="index">
        <div class="rounded-lg shadow p-2">
          <div class="">
            <div>{{ account.name }}</div>
          </div>
          <div class="">
            {{ compressAddress(account.address, 15) }}
          </div>
        </div>
      </div>
    </div>
    <footer class="fixed inset-x-0 bottom-0 flex gap-4 p-2 justify-between">
      <BaseButton block @click="deny" outline> Deny </BaseButton>
      <BaseButton block @click="accept"> Accept </BaseButton>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { compressAddress } from '@/helpers/string'
import {
  THIRDPARTY_GET_ACCOUNT_SUCCESS_RESPONSE,
  GET_WALLET_SERVICE_STATE,
  THIRDPARTY_GET_ACCOUNT_CONNECT
} from '../../../types'

export default defineComponent({
  setup() {
    const store = useStore()
    const host = ref('')

    const account = computed(() => store.getters['wallets/active'])
    const accounts = computed(() => store.getters['wallets/accounts'])

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
        ({ state } = {}) => {
          if (state && state.host) {
            host.value = state.host
          } else {
            // window.close()
          }
        }
      )
      chrome.runtime.connect({ name: THIRDPARTY_GET_ACCOUNT_CONNECT })
    })

    return {
      accept,
      deny,
      accounts,
      compressAddress
    }
  }
})
</script>

<style></style>
