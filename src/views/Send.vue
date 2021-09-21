<template>
  <div class="p-2">
    <base-input class="mt-2" label="Asset"></base-input>
    <base-input v-model="toAddress" class="mt-2" label="Address"></base-input>
    <base-input
      v-model="amount"
      type="number"
      class="mt-2"
      label="Amount"
    ></base-input>
    <base-button @click="openModal" class="mt-2" color="green" block
      >Send</base-button
    >
    <TxConfirm :show="isOpen" @close="closeModal" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import TxConfirm from '@/components/modals/TxConfirm.vue'

export default defineComponent({
  name: 'Send',
  components: {
    TxConfirm
  },
  setup() {
    const isOpen = ref(false)
    const amount = ref('0')
    const toAddress = ref('')

    function openModal() {
      isOpen.value = true
    }

    function closeModal() {
      console.log('closeModal')
      isOpen.value = false
    }

    return {
      amount,
      toAddress,
      isOpen,
      openModal,
      closeModal
    }
  }
})
</script>

<style></style>
