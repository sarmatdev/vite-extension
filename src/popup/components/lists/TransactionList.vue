<template>
  <div v-for="(tx, idx) in txsList" :key="idx">
    <div class="p-3 flex items-center justify-between">
      <div>
        <p class="text-left text-sm text-gray-600 mb-2">
          {{ timestampToDate(tx.timestamp) }}
        </p>
        <div class="flex space-x-6 items-center">
          <BaseIcon
            v-if="true"
            :class="{ 'transform -rotate-180': tx.blockType !== 2 }"
            class="text-black"
            name="send"
          />
          <BaseIcon v-if="false" class="text-black" name="clock" />
          <div class="text-left flex flex-col justify-between">
            <span class="font-medium text-sm text-black block">
              {{ tx.blockType == 2 ? 'Send' : 'Receive' }}
            </span>
            <span class="font-medium text-sm text-gray-600 block">
              {{ tx.unreceived ? 'Pending' : 'Completed' }}
            </span>
          </div>
        </div>
      </div>
      <div class="text-right">
        <p class="text-black">
          {{ forAmount(tx.amount) + ' ' + tx.tokenInfo.tokenSymbol }}
        </p>
        <span class="font-medium text-sm text-gray-600 block"
          ><span class="text-black">From:</span>
          {{ compressAddress(tx.address) }}</span
        >
        <span class="font-medium text-sm text-gray-600"
          ><span class="text-black">To:</span>
          {{ compressAddress(tx.toAddress) }}</span
        >
      </div>
    </div>
    <hr class="bg-white border-none h-0.5" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { compressAddress } from '@/helpers/string'
import { useStore } from 'vuex'
import { timestampToDate } from '@/helpers/date'
import usePrices from '@/composables/usePrices'

export default defineComponent({
  name: 'TransactionList',
  props: {
    txs: {
      type: Array
    }
  },
  setup(props) {
    const store = useStore()
    store.dispatch(
      'account/getTxsList',
      store.getters['wallets/active'].address
    )
    const txsList = computed(() =>
      props.txs ? props.txs : store.getters['account/txsList']
    )
    const { forAmount } = usePrices()
    return {
      compressAddress,
      txsList,
      timestampToDate,
      forAmount
    }
  }
})
</script>

<style></style>
