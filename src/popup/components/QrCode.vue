<template>
  <qrcode-vue :value="value" level="H" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import QrcodeVue from 'qrcode.vue'

export default defineComponent({
  name: 'QrCode',
  components: {
    QrcodeVue
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style></style>
