<template>
  <div v-for="(tx, idx) in txsList" :key="idx">
    <div v-if="loaded" class="p-3 flex items-center justify-between">
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
    <div v-else class="p-3 w-full space-y-2 animate-pulse">
      <div class="flex justify-between">
        <div class="h-3 bg-blue-400 rounded w-1/4"></div>
        <div class="h-4 bg-blue-400 rounded w-1/4"></div>
      </div>
      <div class="flex justify-between">
        <div class="w-full flex justify-between">
          <div class="rounded-full bg-blue-400 w-24 h-10 mr-2"></div>
          <div class="w-full space-y-2">
            <div class="h-4 bg-blue-400 rounded w-1/4"></div>
            <div class="h-3 bg-blue-400 rounded w-2/4"></div>
          </div>
          <div class="w-full space-y-2 flex flex-col items-end">
            <div class="h-4 bg-blue-400 rounded w-3/4"></div>
            <div class="h-3 bg-blue-400 rounded w-2/4"></div>
          </div>
        </div>
      </div>
    </div>
    <hr class="bg-white border-none h-0.5" />
  </div>
  <div v-if="!txsList.length" class="relative w-full h-full">
    <p class="text-blue-900 absolute inset-0 top-2/4 text-center">
      You have no transactions
    </p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { compressAddress } from '@/helpers/string'
import { useStore } from 'vuex'
import { timestampToDate } from '@/helpers/date'
import { usePrices } from '@/composables/usePrices'
import { useWeb3 } from '@/composables/useWeb3'

export default defineComponent({
  name: 'TransactionList',
  props: {
    txs: {
      type: Array
    }
  },
  setup(props) {
    const store = useStore()
    const loaded = computed(() => store.getters['settings/loaded'])

    const web3 = useWeb3()
    if (store.getters['wallets/active'].address && !props.txs) {
      web3.getTxsList(store.getters['wallets/active'].address)
    }
    const txsList = computed(() =>
      props.txs ? props.txs : store.getters['account/txsList']
    )
    const { forAmount } = usePrices()
    return {
      compressAddress,
      txsList,
      timestampToDate,
      forAmount,
      loaded
    }
  }
})
</script>

<style></style>
