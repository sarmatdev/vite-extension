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
    <div class="flex justify-center mt-8">
      <QRCanvas :options="{ cellSize: 8, data: active.address }"></QRCanvas>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { QRCanvas } from 'qrcanvas-vue'
import { useStore } from 'vuex'
import useClipboard from '@/composables/useClipboard'

export default defineComponent({
  name: 'Recieve',
  components: {
    QRCanvas
  },
  setup() {
    const store = useStore()

    const active = computed(() => store.getters['wallets/active'])
    const options = {
      cellSize: 8,
      data: 'hello, world'
    }

    const { writeClipboard } = useClipboard()

    function copyAddress() {
      writeClipboard(active.value.address)
    }

    return {
      active,
      options,
      copyAddress
    }
  }
})
</script>

<style></style>
