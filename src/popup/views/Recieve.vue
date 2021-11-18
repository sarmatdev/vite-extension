<template>
  <div class="p-2">
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

    function copyAddress() {
      navigator.clipboard.writeText(active.value.address)
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
