<template>
  <div class="p-2">
    <div class="mb-12 flex items-center">
      <BaseToggle icon="chevron-left" to="/" />
      <h1 class="ml-24">Recieve</h1>
    </div>
    <base-input
      v-model="active.address"
      label="Address"
      disabled
      icon="copy"
      @iconEvent="copyAddress"
    />
    <div class="flex justify-center mt-2">
      <QRCanvas :options="{ cellSize: 4, data: active.address }"></QRCanvas>
    </div>

    <div class="fixed inset-x-0 bottom-0 rounded-t-2xl bg-blue-200">
      <BaseLink active>Unreceived transactions</BaseLink>
      <div class="overflow-y-scroll h-56">
        <TransactionList @receive="receiveTokens" :txs="uTxs" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import TransactionList from '@/components/lists/TransactionList.vue'
import { QRCanvas } from 'qrcanvas-vue'
import { useStore } from 'vuex'
import { useClipboard } from '@/composables/useClipboard'
import { useWeb3 } from '@/composables/useWeb3'

export default defineComponent({
  name: 'Recieve',
  components: {
    TransactionList,
    QRCanvas
  },
  setup() {
    const store = useStore()
    const web3 = useWeb3()

    const active = computed(() => store.getters['wallets/active'])
    web3.getUtxs(active.value.address)
    const uTxs = computed(() => store.getters['account/uTxs'])
    const options = {
      cellSize: 8,
      data: 'hello, world'
    }

    const { writeClipboard } = useClipboard()

    function copyAddress() {
      writeClipboard(active.value.address)
    }

    function receiveTokens(txId) {
      web3.receiveTokens(txId)
    }

    return {
      active,
      options,
      copyAddress,
      uTxs,
      receiveTokens
    }
  }
})
</script>

<style></style>
