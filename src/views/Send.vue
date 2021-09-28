<template>
  <div class="p-2">
    <TokenSelect label="Asset" />
    <base-input v-model="toAddress" class="mt-2" label="Address"></base-input>
    <base-input v-model="amount" type="number" class="mt-2" label="Amount" />
    <base-button @click="isOpen = true" class="mt-2" color="green" block
      >Send</base-button
    >
    <TxConfirm
      :show="isOpen"
      @close="closeModal"
      :params="{ amount, toAddress }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import TokenSelect from '@/components/TokenSelect.vue'
import TxConfirm from '@/components/modals/TxConfirm.vue'
import useNumbers from '@/composables/useNumbers'

export default defineComponent({
  name: 'Send',
  components: {
    TxConfirm,
    TokenSelect
  },
  setup() {
    const { formatUnits } = useNumbers()
    const isOpen = ref(false)
    const amount = ref('0')
    const rawAmount = ref('')
    const toAddress = ref('')

    watch(amount, () => {
      rawAmount.value = formatUnits(amount.value, 18)
    })

    function openModal() {
      isOpen.value = true
    }

    function closeModal() {
      isOpen.value = false
    }

    return {
      amount,
      toAddress,
      isOpen,
      rawAmount,
      openModal,
      closeModal
    }
  }
})
</script>

<style></style>
