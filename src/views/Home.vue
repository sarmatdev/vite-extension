<template>
  <div class="home">
    <AccountInfo />
    <div class="mt-6">
      <base-button color="green">Send</base-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useTokens } from '@/composables/useTokens'
import AccountInfo from '@/components/AccountInfo.vue'

export default defineComponent({
  name: 'Home',
  components: {
    AccountInfo
  },
  setup() {
    const { loadNativeAssetBalance, getTokenInfoList } = useTokens()
    const name = ref('test')

    loadNativeAssetBalance()
    getTokenInfoList()

    return {
      name
    }
  }
})
</script>
