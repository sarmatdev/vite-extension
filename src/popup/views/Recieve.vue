<template>
  <div class="p-2">
    <base-input
      v-model="active.address"
      label="Address"
      disabled
      icon="copy"
      @iconEvent="copyAddress"
    />
    <QrCode :value="active.address" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import QrCode from '@/components/QrCode.vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Recieve',
  components: {
    QrCode
  },
  setup() {
    const store = useStore()

    const active = computed(() => store.getters['wallets/active'])

    function copyAddress() {
      navigator.clipboard.writeText(active.value.address)
    }

    return {
      active,
      copyAddress
    }
  }
})
</script>

<style></style>
