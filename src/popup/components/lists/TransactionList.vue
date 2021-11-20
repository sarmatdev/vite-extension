<template>
  <div v-for="(transaction, idx) in transactions" :key="idx">
    <div class="p-3 flex items-center justify-between">
      <div>
        <p class="text-left text-sm text-gray-600 mb-2">
          {{ transaction.timestamp }}
        </p>
        <div class="flex space-x-6 items-center">
          <BaseIcon
            v-if="transaction.status === 'Completed'"
            class="text-black"
            name="send"
          />
          <BaseIcon
            v-if="transaction.status === 'Pending'"
            class="text-black"
            name="clock"
          />
          <div class="text-left flex flex-col justify-between">
            <span class="font-medium text-sm text-black block">
              {{ transaction.blockType }}
            </span>
            <span class="font-medium text-sm text-gray-600 block">
              {{ transaction.status }}
            </span>
          </div>
        </div>
      </div>
      <div class="text-right">
        <p class="text-black">
          {{ transaction.amount + ' ' + transaction.token }}
        </p>
        <span class="font-medium text-sm text-gray-600 block"
          ><span class="text-black">From:</span>
          {{ compressAddress(transaction.address) }}</span
        >
        <span class="font-medium text-sm text-gray-600"
          ><span class="text-black">To:</span>
          {{ compressAddress(transaction.toAddress) }}</span
        >
      </div>
    </div>
    <hr class="bg-white border-none h-0.5" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { compressAddress } from '@/helpers/string'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'TransactionList',
  props: {
    transactions: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    const store = useStore()
    store.dispatch('account/getUtxs', store.getters['wallets/active'].address)
    console.log(store.getters['wallets/active'].address)
    return { compressAddress }
  }
})
</script>

<style></style>
