<template>
  <div class="flex flex-col justify-between h-full">
    <div class="flex flex-col space-y-8">
      <div class="flex items-center p-2">
        <BaseToggle icon="chevron-left" to="/" />
        <h1 class="ml-24">Send</h1>
      </div>
      <div class="pt-4 space-y-4 px-2">
        <TokenSelect v-model="token" />
        <BaseInput v-model="toAddress" class="mt-2" label="Address" />
        <BaseInput v-model="amount" type="number" class="mt-2" label="Amount" />
      </div>
    </div>
    <div class="w-full py-8 px-2">
      <BaseButton @click="isOpen = true" color="gradient" block>
        Send
      </BaseButton>
    </div>
  </div>
  <TxConfirm
    :show="isOpen"
    @close="closeModal"
    :params="{ amount, toAddress, urlIcon: token?.urlIcon }"
  />
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
    const token = ref(null)
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
      token,
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
