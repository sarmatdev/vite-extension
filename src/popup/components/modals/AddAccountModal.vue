<template>
  <BaseModal :open="open" @close="closeModal">
    <template v-slot:header> Add Account </template>
    <template v-slot:default>
      <BaseInput placeholder="Account name" v-model="name" />
    </template>
    <template v-slot:footer>
      <div class="flex gap-4 justify-between">
        <BaseButton block outline> Cancel </BaseButton>
        <BaseButton block @click="create"> Confirm </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { wallet } from '@vite/vitejs'

export default defineComponent({
  name: 'Menu',
  components: {},
  setup() {
    const open = ref(false)
    const name = ref('')

    function closeModal(state) {
      open.value = false
    }

    function create() {
      const seed = wallet.createSeed(128)
    }

    return {
      open,
      name,
      closeModal,
      create
    }
  }
})
</script>

<style></style>
