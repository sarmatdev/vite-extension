<template>
  <div id="qr-code" ref="qrCode"></div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue'
import QRCodeStyling, {
  DrawType,
  TypeNumber,
  Mode,
  ErrorCorrectionLevel,
  DotType
} from 'qr-code-styling'

export default defineComponent({
  name: 'QrCode',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const qrCode = ref(undefined)

    const options = reactive({
      width: 300,
      height: 300,
      type: 'svg' as DrawType,
      data: props.value,
      margin: 10,
      qrOptions: {
        typeNumber: 0 as TypeNumber,
        mode: 'Byte' as Mode,
        errorCorrectionLevel: 'Q' as ErrorCorrectionLevel
      },
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.4,
        margin: 20,
        crossOrigin: 'anonymous'
      },
      dotsOptions: {
        color: '#3452eb',
        type: 'rounded' as DotType
      },
      backgroundOptions: {
        color: '#ffffff'
      }
    })

    const qr = new QRCodeStyling(options)

    onMounted(() => {
      console.log('qrCode', qrCode.value)
      qr.append(qrCode.value)
    })

    return {
      qrCode
    }
  }
})
</script>

<style></style>
