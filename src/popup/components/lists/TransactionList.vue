<template>
  <div v-for="(transaction, idx) in transactions" :key="idx">
    <div class="p-3">
      <span class="text-left">
        {{ transaction.timestamp }}
      </span>
      <div class="flex justify-between items-center">
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
        <div class="text-left flex flex-col">
          <span class="text-black font-semibold">
            {{ transaction.blockType }}
          </span>
          <span>
            {{ transaction.status }}
          </span>
        </div>
        <div class="text-right">
          <p class="text-black font-semibold">
            {{ transaction.amount + ' ' + transactions.token }}
          </p>
          <p>From: {{ compressAddress(transaction.address) }}</p>
          <p>To: {{ compressAddress(transaction.toAddress) }}</p>
        </div>
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
    return { compressAddress }
  }
})
</script>

<style></style>
