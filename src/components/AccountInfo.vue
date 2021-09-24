<template>
  <div class="px-6 border text-center flex flex-col justify-center space-y-3">
    <img class="h-8" src="@/assets/images/logo-blue1.svg" alt="" />
    <div class="font-bold text-blue-900">
      <span class="text-3xl">{{
        Math.trunc(toNum(balance, 18)) + (frac(toNum(balance, 18)) ? '.' : '')
      }}</span
      ><span class="text-xl">{{ frac(toNum(balance, 18)) }} VITE</span>
    </div>
    <BaseTooltip>
      <template v-slot:activator>
        <div
          @click="copyAddress"
          class="
            p-2
            rounded-xl
            cursor-pointer
            hover:shadow-xl
            active:bg-blue-100
            transition
            duration-100
            ease-in-out
          "
        >
          <p class="font-black text-blue-900 text-xl">
            {{ active.name }}
          </p>
          <p class="font-bold">
            {{ active.address ? compressAddress(active.address, 10, 5) : '' }}
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
    const { toNum, frac } = useNumbers()

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
      frac,
      compressAddress,
      copyAddress
    }
  }
})
</script>

<style></style>
