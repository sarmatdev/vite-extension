<template>
  <div class="p-8 border text-center m-auto inline-block">
    <img class="h-8" src="@/assets/images/logo-blue1.svg" alt="" />
    <div>{{ toNum(balance, 18) }} — VITE</div>
    <BaseTooltip>
      <template v-slot:activator>
        <div
          @click="copyAddress"
          class="
            p-4
            rounded-xl
            cursor-pointer
            hover:shadow-xl
            active:bg-blue-100
            transition
            duration-100
            ease-in-out
          "
        >
          <p>
            {{ active.name }}
          </p>
          <p class="font-bold">
            {{ compressAddress(active.address) }}
          </p>
        </div>
      </template>
      <div
        v-text="copiedAddress ? 'Copied' : 'Copy address'"
        class="w-20 text-center"
      />
    </BaseTooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import useNumbers from '@/composables/useNumbers'
import { compressAddress } from '@/helpers/string'

export default defineComponent({
  name: 'AccountInfo',
  setup() {
    const store = useStore()
    const { toNum } = useNumbers()

    const copiedAddress = ref(false)

    const balance = computed(() => store.getters['account/balance'])
    const active = computed(() => store.getters['wallets/active'])

    function copyAddress() {
      navigator.clipboard.writeText(active.value.address)
      copiedAddress.value = true
      setTimeout(() => {
        copiedAddress.value = false
      }, 2 * 1000)
    }

    return {
      copiedAddress,
      balance,
      active,
      toNum,
      compressAddress,
      copyAddress
    }
  }
})
</script>

<style></style>
